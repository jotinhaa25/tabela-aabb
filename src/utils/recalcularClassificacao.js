/**
 * Recalcular Classificação
 * Calcula a tabela de classificação com base nos jogos
 * 
 * Regras:
 * - Vitória = 3 pontos
 * - Empate = 1 ponto
 * - Derrota = 0 pontos
 * 
 * Critérios de desempate:
 * 1. Pontos
 * 2. Confronto direto
 * 3. Vitórias
 * 4. Saldo de gols
 * 5. Gols pró
 */

export function recalcularClassificacao(matches, teams) {
  // Criar estrutura inicial dos times
  const tabela = {};

  teams.forEach(team => {
    tabela[team.name] = {
      name: team.name,
      group: team.group,
      points: 0,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0
    };
  });

  // Processar jogos
  matches.forEach(match => {
    const home = match.home || match.home_team;
    const away = match.away || match.away_team;
    const { home_score, away_score } = match;

    // Ignorar jogos sem resultado
    if (home_score === null || away_score === null) return;

    const homeTeam = tabela[home];
    const awayTeam = tabela[away];

    // Ignorar se um dos times não faz parte da lista sendo processada
    if (!homeTeam || !awayTeam) return;

    // Jogos
    homeTeam.played++;
    awayTeam.played++;

    // Gols
    homeTeam.goalsFor += home_score;
    homeTeam.goalsAgainst += away_score;

    awayTeam.goalsFor += away_score;
    awayTeam.goalsAgainst += home_score;

    // Saldo
    homeTeam.goalDiff = homeTeam.goalsFor - homeTeam.goalsAgainst;
    awayTeam.goalDiff = awayTeam.goalsFor - awayTeam.goalsAgainst;

    // Resultado
    if (home_score > away_score) {
      homeTeam.wins++;
      homeTeam.points += 3;
      awayTeam.losses++;
    } else if (home_score < away_score) {
      awayTeam.wins++;
      awayTeam.points += 3;
      homeTeam.losses++;
    } else {
      homeTeam.draws++;
      awayTeam.draws++;
      homeTeam.points += 1;
      awayTeam.points += 1;
    }
  });

  // Converter para array
  const lista = Object.values(tabela);
  const groupAList = lista.filter(t => t.group === 'A');
  const groupBList = lista.filter(t => t.group === 'B');

  // Função de confronto direto
  function confrontoDireto(a, b) {
    const jogosEntre = matches.filter(m => {
      const h = m.home || m.home_team;
      const a_name = m.away || m.away_team;
      return (h === a.name && a_name === b.name) ||
             (h === b.name && a_name === a.name);
    });

    let pontosA = 0;
    let pontosB = 0;

    jogosEntre.forEach(m => {
      if (m.home_score === null || m.away_score === null) return;

      const h = m.home || m.home_team;

      if (h === a.name) {
        if (m.home_score > m.away_score) pontosA += 3;
        else if (m.home_score < m.away_score) pontosB += 3;
        else {
          pontosA += 1;
          pontosB += 1;
        }
      } else {
        if (m.home_score > m.away_score) pontosB += 3;
        else if (m.home_score < m.away_score) pontosA += 3;
        else {
          pontosA += 1;
          pontosB += 1;
        }
      }
    });

    return pontosB - pontosA;
  }

  // Função de Ordenação
  const sortFn = (a, b) => {
    return (
      b.points - a.points ||                 // Pontos
      confrontoDireto(a, b) ||               // Confronto direto
      b.wins - a.wins ||                     // Vitórias
      b.goalDiff - a.goalDiff ||             // Saldo
      b.goalsFor - a.goalsFor                // Gols pró
    );
  };

  // Ordenar dentro dos grupos
  groupAList.sort(sortFn);
  groupBList.sort(sortFn);

  // Atribuir posições dentro do grupo
  groupAList.forEach((team, index) => team.position = index + 1);
  groupBList.forEach((team, index) => team.position = index + 1);

  // Determinar Ouro vs Prata (Top 3 de cada + melhor 4º)
  const groupA4th = groupAList[3];
  const groupB4th = groupBList[3];

  let best4th = null;
  if (groupA4th && groupB4th) {
    const cmp = sortFn(groupA4th, groupB4th);
    best4th = cmp <= 0 ? groupA4th : groupB4th;
  } else if (groupA4th) {
    best4th = groupA4th;
  } else if (groupB4th) {
    best4th = groupB4th;
  }

  // Atribuir as taças
  lista.forEach(team => {
    if (team.position <= 3) {
      team.taca = 'Ouro';
    } else if (team.position === 4 && team === best4th) {
      team.taca = 'Ouro';
    } else {
      team.taca = 'Prata';
    }
  });

  return [...groupAList, ...groupBList];

  return lista;
}
