# Manual Interativo — Como ser um bom pai

Protótipo do índice interativo com perguntas de múltipla escolha que sugerem capítulos.

Como usar

- Abra o arquivo `index.html` em um navegador moderno (Chrome, Edge, Firefox).
- Clique nas opções dentro de cada capítulo para registrar seu caminho.
- O painel "Sugestões" mostrará orientação baseada na última escolha.
- Use "Reiniciar caminho" para apagar a sequência; "Exportar escolhas" abre um popup com JSON.

Novas funcionalidades (onboarding)

- Ao abrir o site, uma tela de onboarding perguntará se você é pai/mãe.
- Se você não for pai/mãe, o site mostrará conteúdo de conscientização sobre prevenção (uso de preservativos e cuidados de saúde sexual).
- Se for pai/mãe, o formulário coleta: `nome do pai/mãe`, `idade do pai`, `nome do(a) filho(a)`, `idade do(a) filho(a)` e perguntas rápidas como "Tem saído muito com seu filho(a)?".
- O perfil é salvo em `localStorage` e pode ser editado pelo botão "Editar perfil" na barra lateral.

Funcionalidades existentes

- O painel de sugestões agrega recomendações baseadas em todo o histórico de escolhas.
- Capítulos recomendados são destacados para orientar a leitura seguinte.

Como testar

1. Abra `index.html` no navegador.
2. Preencha o onboarding (seja pai ou não) e salve.
3. Se for pai, o índice e as sugestões aparecerão. Faça escolhas e veja o painel de sugestões atualizar.
4. Edite o perfil com o botão "Editar perfil"; use "Reiniciar caminho" para apagar o histórico e "Exportar escolhas" para ver o JSON.

Próximos passos que posso implementar

- Criar páginas separadas completas para cada capítulo e links diretos.
- Adicionar analytics local (apenas para debug) ou export mais robusto.
- Gerar versão imprimível / PDF do manual.


Observações

- Este é um protótipo local: nenhuma informação é enviada para servidores.
- O conteúdo é um modelo para ampliar: você pode adicionar capítulos, mais caminhos e páginas separadas.

Precisa que eu gere páginas de conteúdo completas para cada capítulo ou que eu adapte o design?
