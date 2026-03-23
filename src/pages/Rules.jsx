export default function Rules() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="font-bebas text-5xl text-white tracking-wider mb-2">
          REGULAMENTO DO <span className="text-accent">CAMPEONATO</span>
        </h1>
        <p className="text-text-secondary font-medium">
          Normas fundamentais para o bom andamento da competição AABB 2026.
        </p>
      </div>

      <div className="glass-card rounded-3xl p-10 shadow-2xl space-y-12 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
        {/* Section 1 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">1. DISPOSIÇÕES GERAIS</h2>
          <p className="text-text-primary/80 leading-relaxed font-medium">
            O Campeonato AABB de Futsal é uma competição amadora realizada anualmente, 
            reunindo equipes formadas por associados e seus convidados. O objetivo é 
            promover a integração, o esporte e a camaradagem entre os participantes.
          </p>
        </section>

        {/* Section 2 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">2. DOS PARTICIPANTES</h2>
          <p className="text-text-primary/80 leading-relaxed mb-6 font-medium">
            Cada equipe deve ser composta por no mínimo 10 e no máximo 15 jogadores, 
            sendo obrigatoriamente um goleiro. Podem participar associados e seus 
            dependentes, respeitando as regras de elegibilidade.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold">01</div>
              <p className="text-sm text-text-secondary leading-tight">Cada jogador pode defender apenas uma equipe durante o campeonato.</p>
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 text-accent font-bold">02</div>
              <p className="text-sm text-text-secondary leading-tight">É obrigatória a apresentação de documento oficial no momento da partida.</p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">3. DO SISTEMA DE DISPUTA</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-primary/50 border border-white/10 rounded-2xl p-6 shadow-inner">
              <h3 className="font-bebas text-xl text-accent mb-3 tracking-widest">FASE DE GRUPOS</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                As 14 equipes serão divididas em 2 grupos (A e B) de 7 equipes cada. 
                Serão 10 rodadas, garantindo que todas as equipes se enfrentem.
              </p>
            </div>
            <div className="bg-primary/50 border border-white/10 rounded-2xl p-6 shadow-inner">
              <h3 className="font-bebas text-xl text-accent mb-3 tracking-widest">FASE FINAL</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                As 4 melhores equipes de cada grupo se classificam para as quartas de final, 
                seguindo com semi-finais e final.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">4. DA PONTUAÇÃO</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-success/10 border border-success/20 rounded-2xl text-center group hover:bg-success/20 transition-all">
              <span className="font-bebas text-5xl text-success block leading-none mb-2">3</span>
              <span className="text-[10px] uppercase font-bold text-success/70 tracking-widest">Pontos / Vitória</span>
            </div>
            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl text-center group hover:bg-accent/20 transition-all">
              <span className="font-bebas text-5xl text-accent block leading-none mb-2">1</span>
              <span className="text-[10px] uppercase font-bold text-accent/70 tracking-widest">Ponto / Empate</span>
            </div>
            <div className="p-6 bg-error/10 border border-error/20 rounded-2xl text-center group hover:bg-error/20 transition-all">
              <span className="font-bebas text-5xl text-error block leading-none mb-2">0</span>
              <span className="text-[10px] uppercase font-bold text-error/70 tracking-widest">Pontos / Derrota</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">5. CRITÉRIOS DE DESEMPATE</h2>
          <div className="space-y-3">
            {[
              { label: 'Confronto Direto', desc: 'Resultado entre as equipes empatadas' },
              { label: 'Número de Vitórias', desc: 'Maior quantidade de jogos ganhos' },
              { label: 'Saldo de Gols', desc: 'Diferença entre GP e GC' },
              { label: 'Gols Marcados', desc: 'Quantidade de GP total' },
              { label: 'Sorteio', desc: 'Caso a igualdade persista' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl group hover:border-accent/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm font-bold text-text-primary uppercase tracking-tight">{item.label}</span>
                </div>
                <span className="text-xs text-text-secondary italic">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">6. DAS PENALIDADES</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-6 p-6 bg-warning/10 border border-warning/20 rounded-2xl">
              <div className="w-12 h-16 bg-warning rounded-lg shadow-lg rotate-12" />
              <div>
                <h4 className="font-bebas text-xl text-white leading-none mb-2">AMARELO</h4>
                <p className="text-xs text-text-secondary font-medium">Advertência e punição pecuniária conforme tabela.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-6 bg-error/10 border border-error/20 rounded-2xl">
              <div className="w-12 h-16 bg-error rounded-lg shadow-lg -rotate-12" />
              <div>
                <h4 className="font-bebas text-xl text-white leading-none mb-2">VERMELHO</h4>
                <p className="text-xs text-text-secondary font-medium">Expulsão e suspensão automática de 01 jogo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="relative">
          <div className="absolute -left-6 top-1 w-1 h-8 bg-accent rounded-full" />
          <h2 className="font-bebas text-3xl text-white mb-6 uppercase tracking-widest">7. DISPOSIÇÕES FINAIS</h2>
          <div className="p-8 bg-primary/30 border border-white/5 rounded-3xl text-center italic text-text-secondary text-sm">
            "A participação no campeonato implica na aceitação incondicional de todas as regras estabelecidas. 
            Casos omissos serão resolvidos exclusivamente pela diretoria da AABB."
          </div>
        </section>

        {/* Footer */}
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-text-secondary text-[10px] font-bold uppercase tracking-[0.3em]">
            Associação Atlética Banco do Brasil • Gestão 2026
          </p>
        </div>
      </div>
    </div>
  )
}
