# Manual Interativo — Como ser um bom pai

Protótipo profissional do índice interativo com 8 capítulos, perguntas de múltipla escolha, validação rigorosa e fluxo completo com resultado final.

## Como usar

1. Abra o arquivo `index.html` em um navegador moderno (Chrome, Edge, Firefox).
2. Faça onboarding obrigatório (pai/mãe? dados pessoais, renda, etc).
3. Acesse o índice com 8 capítulos temáticos.
4. Abra cada capítulo, leia conteúdo e escolha uma opção (4 respostas cada).
5. Sistema sugere próximo capítulo automaticamente.
6. Após responder todos os capítulos, vá para página final com resumo de dicas personalizadas.
7. Use "Editar perfil", "Reiniciar caminho" ou "Exportar escolhas" conforme necessário.

## Capítulos disponíveis

1. **Relação Afetiva** — Vínculo, presença emocional, contato físico
2. **Disciplina Positiva** — Limites, rotinas, alternativas à punição
3. **Comunicação e Escuta** — Diálogos, validação, nomeação de emoções
4. **Saúde e Segurança** — Sono, alimentação, segurança, atividade física
5. **Cuidando de Si** — Autocuidado, gestão de stress, redes de apoio
6. **Atividades e Presentes** — Ideias econômicas e criativas
7. **Educação Financeira** — Mesada, poupança, consumo consciente
8. **Apoio Escolar** — Rotinas de estudo, reforço, comunicação com professores

## Funcionalidades principais

✅ **Onboarding obrigatório** com perfil completo (nome, idade, renda, envolvimento)
✅ **Validação de idades** (filho não pode ser mais velho ou 7+ anos mais novo)
✅ **8 capítulos** com 4 opções de resposta cada
✅ **Fluxo automático** sugerindo próximo capítulo recomendado
✅ **Página final** com resumo de dicas personalizadas
✅ **Tema escuro moderno** e responsivo
✅ **Prevenção** conteúdo com vídeo para não-pais
✅ **Botões para editar perfil, reiniciar e exportar escolhas**

## Testes rápidos

- Abra `index.html`, preencha onboarding (marque "Sim" para pai).
- Navegue pelos capítulos, escolha opções e veja recomendações automáticas.
- Após capítulo 8, você será levado à página de resultado com dicas agregadas.
- Clique "Editar perfil" para recomeçar onboarding, ou "Reiniciar caminho" para apagar histórico.

## Tecnologia

- HTML5, CSS3, JavaScript vanilla
- `localStorage` para persistência de dados
- Sem dependências externas
- Arquivo local (nenhum envio a servidores)

## Próximos passos

- Gerar versão PDF do plano personalizado
- Adicionar Analytics local (debug apenas)
- Integração com e-mail para enviar resumo
- Versão mobile app (React Native / Flutter)
