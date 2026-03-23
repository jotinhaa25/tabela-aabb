import os
try:
    from pypdf import PdfReader
except ImportError:
    try:
        from PyPDF2 import PdfReader
    except ImportError:
        pass

def main():
    pdf_path = os.path.join("directives", "tabela de jogos.pdf")
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
        
    out_path = os.path.join(".tmp", "tabela_raw.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Salvo em {out_path}")

if __name__ == "__main__":
    main()
