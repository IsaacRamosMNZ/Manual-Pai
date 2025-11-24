// Script com onboarding, perfil e funcionalidades do manual
(function(){
  const onboardingWrapper = document.getElementById('onboardingWrapper');
  const tocPanel = document.getElementById('toc');
  const advicePanel = document.getElementById('advice');
  const nonParentPanel = document.getElementById('nonParent');
  const suggestionsEl = document.getElementById('suggestions');
  const greetingEl = document.getElementById('greeting');
  const editProfileBtn = document.getElementById('editProfileBtn');
  const resetBtn = document.getElementById('resetBtn');

  const PROFILE_KEY = 'manual-pai-profile';
  const PATH_KEY = 'manual-pai-path';

  const mapping = {
    1: { 
      A: {advice:'Contato físico gradual: abraços, beijos na testa, mão na mão.', recommend:[3,5]}, 
      B: {advice:'Mantenha rituais diários (leitura, conversa antes de dormir).', recommend:[4]}, 
      C: {advice:'Pratique validar emoções da criança antes de corrigir.', recommend:[3]},
      D: {advice:'Reserve momentos exclusivos sem telas, mesmo que breves.', recommend:[2]}
    },
    2: { 
      A: {advice:'Técnicas de disciplina positiva: escolhas limitadas.', recommend:[3,5]}, 
      B: {advice:'Rotinas visuais com quadros e horários claros.', recommend:[4]}, 
      C: {advice:'Redirecionamento e espaços de calma para birras.', recommend:[3]},
      D: {advice:'Consequências naturais ligadas ao comportamento.', recommend:[1]}
    },
    3: { 
      A: {advice:'Perguntas abertas e silêncio intencional.', recommend:[1,2]}, 
      B: {advice:'Feedbacks sem julgamento e validação de sentimentos.', recommend:[2]}, 
      C: {advice:'Atividades para nomear emoções (desenhos, cartões).', recommend:[1,5]},
      D: {advice:'Criar rituais de conversa diária (café da manhã, antes de dormir).', recommend:[4]}
    },
    4: { 
      A: {advice:'Rotina de sono: hora fixa, ritual de relaxamento, sem telas.', recommend:[1]}, 
      B: {advice:'Refeições em família e introdução gradual de novos alimentos.', recommend:[1]}, 
      C: {advice:'Checklist de segurança doméstica e atividades seguras.', recommend:[2]},
      D: {advice:'Exercício físico regular e atividades ao ar livre.', recommend:[3]}
    },
    5: { 
      A: {advice:'Priorize descanso, pequenas pausas e sono.', recommend:[1,3]}, 
      B: {advice:'Negocie horários com trabalho, estabeleça limites.', recommend:[1,4]}, 
      C: {advice:'Procure grupos de apoio ou profissionais (psicólogo).', recommend:[3]},
      D: {advice:'Crie rede de apoio: família, amigos, comunidade.', recommend:[2]}
    },
    6: {
      A: {advice:'Atividades gratuitas: parques, praias, trilhas, museus livres.', recommend:[1,3]},
      B: {advice:'Atividades de baixo custo: jogos de tabuleiro, cinema com pipoca caseira.', recommend:[2,4]},
      C: {advice:'Presente pensado e feito em casa, com tempo de qualidade.', recommend:[1,5]},
      D: {advice:'Experiências: acampamento, piquenique, astronomia caseira.', recommend:[3]}
    },
    7: {
      A: {advice:'Educação financeira básica: mesada, poupar, consumo consciente.', recommend:[2,4]},
      B: {advice:'Ensine a importância do trabalho e valor do dinheiro.', recommend:[3,5]},
      C: {advice:'Planeje metas financeiras juntos (viagem, brinquedo especial).', recommend:[1,6]},
      D: {advice:'Mostre exemplos de consumo responsável e sustentável.', recommend:[2]}
    },
    8: {
      A: {advice:'Estude com criança regularmente, crie espaço tranquilo.', recommend:[1,4]},
      B: {advice:'Procure reforço escolar ou professor particular se necessário.', recommend:[3,5]},
      C: {advice:'Converse com professores sobre progresso e dificuldades.', recommend:[2]},
      D: {advice:'Faça leitura diária para estimular interesse por aprendizado.', recommend:[1,3]}
    }
  };

  function saveProfile(p){ localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }
  function loadProfile(){ const raw = localStorage.getItem(PROFILE_KEY); return raw? JSON.parse(raw):null; }

  function loadPath(){ const raw = localStorage.getItem(PATH_KEY); return raw? JSON.parse(raw):[]; }
  function savePath(path){ localStorage.setItem(PATH_KEY, JSON.stringify(path)); renderPath(path); }

  function clearPath(){ localStorage.removeItem(PATH_KEY); renderPath([]); }

  function showOnboarding(existing){
    tocPanel.classList.add('hidden');
    advicePanel.classList.add('hidden');
    nonParentPanel.classList.add('hidden');
    onboardingWrapper.innerHTML = '';

    const container = document.createElement('div'); container.className='onboarding-container';
    container.innerHTML = `
      <div class="onboard-modal">
        <div class="onboard-header">
          <h2>Seu Perfil</h2>
          <p>Informações necessárias para personalizar o guia.</p>
        </div>

        <div class="onboard-section">
          <h3>Você é pai/mãe?</h3>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="isParent" value="yes">
              <span class="radio-text">Sim, sou pai/mãe</span>
            </label>
            <label class="radio-label">
              <input type="radio" name="isParent" value="no">
              <span class="radio-text">Não, quero aprender sobre prevenção</span>
            </label>
          </div>
        </div>

        <div id="parentForm" class="onboard-section hidden">
          <h3>Informações Pessoais</h3>
          <div class="form-grid">
            <div class="form-field">
              <label>Seu Nome *</label>
              <input id="inpParentName" type="text" placeholder="Digite seu nome" required>
            </div>
            <div class="form-field">
              <label>Sua Idade *</label>
              <input id="inpParentAge" type="number" min="18" max="120" placeholder="Ex: 35" required>
            </div>
            <div class="form-field">
              <label>Nome do Filho(a) *</label>
              <input id="inpChildName" type="text" placeholder="Digite o nome" required>
            </div>
            <div class="form-field">
              <label>Idade do Filho(a) *</label>
              <input id="inpChildAge" type="number" min="0" max="25" placeholder="Ex: 8" required>
              <small id="ageError" class="error-msg hidden">Idade inválida (filho não pode ser mais velho que pai ou 7+ anos mais novo)</small>
            </div>
          </div>

          <h3>Seu Envolvimento</h3>
          <div class="form-grid">
            <div class="form-field full">
              <label>Tem saído com seu filho(a)? *</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="radio" name="q-activity" value="Não">
                  <span>Não</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-activity" value="Sim, porém pouco">
                  <span>Sim, porém pouco</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-activity" value="Sim">
                  <span>Sim</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-activity" value="Sim, saio bastante">
                  <span>Sim, saio bastante</span>
                </label>
              </div>
            </div>
            <div class="form-field full">
              <label>Qualidade de tempo juntos? *</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="radio" name="q-quality" value="Pouco">
                  <span>Pouco</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-quality" value="Razoável">
                  <span>Razoável</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-quality" value="Bom">
                  <span>Bom</span>
                </label>
              </div>
            </div>
            <div class="form-field full">
              <label>Renda mensal aproximada? *</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="radio" name="q-income" value="Até 1.5 SM">
                  <span>Até 1.5 salário mínimo</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-income" value="1.5 a 3 SM">
                  <span>1.5 a 3 salários mínimos</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-income" value="3 a 5 SM">
                  <span>3 a 5 salários mínimos</span>
                </label>
                <label class="checkbox-label">
                  <input type="radio" name="q-income" value="Acima de 5 SM">
                  <span>Acima de 5 salários mínimos</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="onboard-actions">
          <button id="btnSaveProfile" class="btn btn-primary">Salvar e Continuar</button>
        </div>
      </div>
    `;
    onboardingWrapper.appendChild(container);

    const parentForm = document.getElementById('parentForm');
    const ageError = document.getElementById('ageError');
    const parentNameInp = document.getElementById('inpParentName');
    const parentAgeInp = document.getElementById('inpParentAge');
    const childNameInp = document.getElementById('inpChildName');
    const childAgeInp = document.getElementById('inpChildAge');

    // preenche com existentes
    if(existing){
      if(existing.isParent) container.querySelector('input[name=isParent][value="yes"]').checked = true;
      else container.querySelector('input[name=isParent][value="no"]').checked = true;
      if(existing.parentName) parentNameInp.value = existing.parentName;
      if(existing.parentAge) parentAgeInp.value = existing.parentAge;
      if(existing.childName) childNameInp.value = existing.childName;
      if(existing.childAge) childAgeInp.value = existing.childAge;
      if(existing.qActivity) container.querySelector(`input[name="q-activity"][value="${existing.qActivity}"]`)?.click();
      if(existing.qQuality) container.querySelector(`input[name="q-quality"][value="${existing.qQuality}"]`)?.click();
      if(existing.isParent) parentForm.classList.remove('hidden');
    }

    // listeners para radio isParent
    container.querySelectorAll('input[name=isParent]').forEach(r=>r.addEventListener('change', ()=>{
      const isParent = container.querySelector('input[name=isParent]:checked').value === 'yes';
      if(isParent) parentForm.classList.remove('hidden');
      else parentForm.classList.add('hidden');
    }));

    // validar idades em tempo real
    const validateAges = ()=>{
      const pAge = Number(parentAgeInp.value);
      const cAge = Number(childAgeInp.value);
      if(!pAge || !cAge) { ageError.classList.add('hidden'); return true; }
      const isValid = (cAge <= pAge && (pAge - cAge) >= 7);
      if(isValid) ageError.classList.add('hidden');
      else ageError.classList.remove('hidden');
      return isValid;
    };

    parentAgeInp.addEventListener('change', validateAges);
    childAgeInp.addEventListener('change', validateAges);
    childAgeInp.addEventListener('input', validateAges);

    // save button
    document.getElementById('btnSaveProfile').addEventListener('click', ()=>{
      const isParentRadio = container.querySelector('input[name=isParent]:checked');
      if(!isParentRadio){ alert('Selecione se é pai/mãe ou não.'); return; }
      const isParent = isParentRadio.value === 'yes';
      const profile = { isParent };
      if(isParent){
        const pName = parentNameInp.value.trim();
        const pAge = Number(parentAgeInp.value);
        const cName = childNameInp.value.trim();
        const cAge = Number(childAgeInp.value);
        const qAct = container.querySelector('input[name="q-activity"]:checked')?.value || '';
        const qQua = container.querySelector('input[name="q-quality"]:checked')?.value || '';
        const qInc = container.querySelector('input[name="q-income"]:checked')?.value || '';
        if(!pName || !pAge || !cName || !cAge || !qAct || !qQua || !qInc){ alert('Preencha todos os campos obrigatoriamente.'); return; }
        if(!validateAges()){ alert('Idade do filho inválida.'); return; }
        profile.parentName = pName;
        profile.parentAge = pAge;
        profile.childName = cName;
        profile.childAge = cAge;
        profile.qActivity = qAct;
        profile.qQuality = qQua;
        profile.qIncome = qInc;
      }
      saveProfile(profile);
      onboardingWrapper.innerHTML = '';
      renderForProfile(profile);
      // Se é pai/mãe (não é prevenção), redireciona para capitulo-1.html
      if(profile.isParent){
        setTimeout(()=>{ window.location.href = 'capitulo-1.html'; }, 500);
      }
    });
  }

  function renderForProfile(profile){
    onboardingWrapper.innerHTML = '';
    if(!profile) return showOnboarding(null);
    greetingEl.textContent = profile.isParent
      ? `Olá ${profile.parentName||'pai/mãe'} — veja as sugestões para ${profile.childName||'seu filho(a)'}`
      : 'Prevenção e Saúde Sexual';

    if(profile.isParent){
      tocPanel.classList.remove('hidden');
      advicePanel.classList.remove('hidden');
      nonParentPanel.classList.add('hidden');
      renderPath(loadPath());
    } else {
      tocPanel.classList.add('hidden');
      advicePanel.classList.add('hidden');
      nonParentPanel.classList.remove('hidden');
    }
  }

  function aggregateSuggestions(path){
    const adv = [];
    const recSet = new Set();
    path.forEach(p=>{
      const m = mapping[p.chapter] && mapping[p.chapter][p.choice];
      if(m && m.advice) adv.push(m.advice);
      if(m && Array.isArray(m.recommend)) m.recommend.forEach(r=>recSet.add(r));
    });
    return {advices: adv, recommended: Array.from(recSet)};
  }

  function renderPath(path){
    // mostra sugestões agregadas
    if(!suggestionsEl) return;
    if(!path || path.length===0){
      suggestionsEl.textContent = 'Faça escolhas no índice para ver recomendações.';
      document.querySelectorAll('.chapter.recommended').forEach(el=>el.classList.remove('recommended'));
      return;
    }
    const agg = aggregateSuggestions(path);
    suggestionsEl.innerHTML = '';
    agg.advices.forEach((a,i)=>{
      const p = document.createElement('p'); p.textContent = (i+1)+'. '+a; suggestionsEl.appendChild(p);
    });
    // destacar
    const chosenChapters = new Set(path.map(p=>p.chapter));
    const recFiltered = agg.recommended.filter(r=>!chosenChapters.has(r));
    document.querySelectorAll('.chapter').forEach(chEl=>chEl.classList.remove('recommended'));
    recFiltered.forEach(id=>{ const el = document.querySelector(`.chapter[data-id='${id}']`); if(el) el.classList.add('recommended'); });
  }

  // attach choice listeners (works on index and chapter pages)
  function suggestNextChapter(chapter, choice, path){
    const m = mapping[chapter] && mapping[chapter][choice];
    if(!m || !Array.isArray(m.recommend) || m.recommend.length===0) return null;
    const chosen = new Set(path.map(p=>p.chapter));
    for(const r of m.recommend){ if(!chosen.has(r)) return r; }
    // se todos os capítulos foram respondidos, ir para resultado
    if(chosen.size === 8) return 'resultado';
    return null;
  }

  function attachChoiceListeners(){
    document.querySelectorAll('.choices button').forEach(btn=>{
      // remove existing stored listener if any
      if(btn._cp_listener) btn.removeEventListener('click', btn._cp_listener);
      const listener = ()=>{
        // determine chapter id: data-chapter on button or nearest ancestor with data-id
        let chapterId = btn.getAttribute('data-chapter');
        if(!chapterId){
          const ancestor = btn.closest('[data-id]');
          if(ancestor) chapterId = ancestor.getAttribute('data-id');
        }
        if(!chapterId) return;
        
        // Bloqueia se já respondeu este capítulo
        const path = loadPath();
        if(path.some(p => p.chapter === Number(chapterId))){
          alert('Você já respondeu este capítulo!');
          return;
        }
        
        const choice = btn.getAttribute('data-choice') || btn.textContent.trim().slice(0,1);
        path.push({chapter: Number(chapterId), choice});
        savePath(path);
        
        // Destaca a resposta escolhida
        const choicesContainer = btn.closest('.choices');
        if(choicesContainer){
          choicesContainer.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));
          btn.classList.add('selected');
          // Desabilita todos os botões após responder
          choicesContainer.querySelectorAll('button').forEach(b => b.disabled = true);
        }
        
        // Determina próximo capítulo (linear: 1→2→3...→8→resultado)
        const currentChapter = Number(chapterId);
        let nextChapter = currentChapter + 1;
        if(nextChapter > 8) nextChapter = 'resultado';
        
        // Mostra botão próximo capítulo
        const onChapterPage = /capitulo-\d+\.html$/.test(window.location.pathname);
        if(onChapterPage){
          showNextButton(nextChapter);
        }
      };
      btn._cp_listener = listener;
      btn.addEventListener('click', listener);
    });
  }
  
  function showNextButton(nextChapter){
    // Remove botão anterior se existir
    const existingBtn = document.getElementById('nextChapterBtn');
    if(existingBtn) existingBtn.remove();
    
    // Cria botão próximo
    const nextBtn = document.createElement('button');
    nextBtn.id = 'nextChapterBtn';
    nextBtn.className = 'btn btn-primary';
    
    if(nextChapter === 'resultado'){
      nextBtn.textContent = 'Ver Resultados';
    } else {
      nextBtn.textContent = `Próximo Capítulo (${nextChapter})`;
    }
    
    nextBtn.addEventListener('click', ()=>{
      if(nextChapter === 'resultado'){
        window.location.href = 'resultado.html';
      } else {
        window.location.href = `capitulo-${nextChapter}.html`;
      }
    });
    
    // Insere após as escolhas
    const choicesContainer = document.getElementById('choices');
    if(choicesContainer){
      choicesContainer.parentElement.insertBefore(nextBtn, choicesContainer.nextSibling);
    }
  }

  editProfileBtn.addEventListener('click', ()=>{ const p = loadProfile(); showOnboarding(p); });
  resetBtn.addEventListener('click', ()=>{ clearPath(); });

  // botão para voltar ao perfil na seção de não-pais
  const backToProfileBtn = document.getElementById('backToProfileBtn');
  if(backToProfileBtn) backToProfileBtn.addEventListener('click', ()=>{ 
    // muda perfil para pai (acesso aos capítulos)
    const fakeParentProfile = { isParent: true, parentName: 'Visitante', parentAge: 30, childName: 'Criança', childAge: 10, qActivity: 'Sim', qQuality: 'Bom' };
    saveProfile(fakeParentProfile);
    renderForProfile(fakeParentProfile);
  });

  // página de resultado: mostrar dicas agregadas
  if(window.location.pathname.includes('resultado.html')){
    const finalAdviceEl = document.getElementById('finalAdvice');
    const restartBtn = document.getElementById('restartBtn');
    if(finalAdviceEl){
      const path = loadPath();
      const agg = aggregateSuggestions(path);
      finalAdviceEl.innerHTML = '<h3>Suas recomendações personalizadas:</h3><div>';
      if(agg.advices.length === 0){
        finalAdviceEl.innerHTML += '<p>Responda os capítulos para receber dicas personalizadas.</p>';
      } else {
        agg.advices.forEach((a,i)=>{
          const p = document.createElement('p');
          p.innerHTML = `<strong>${i+1}.</strong> ${a}`;
          finalAdviceEl.appendChild(p);
        });
      }
      finalAdviceEl.innerHTML += '</div>';
    }
    if(restartBtn){
      restartBtn.addEventListener('click', ()=>{
        localStorage.removeItem(PATH_KEY);
        localStorage.removeItem(PROFILE_KEY);
        window.location.href = 'index.html';
      });
    }
  }


  // inicialização: se perfil existe, ir para apresentação; senão, fazer onboarding
  attachChoiceListeners();
  const existingProfile = loadProfile();
  if(existingProfile){
    renderForProfile(existingProfile);
  } else {
    showOnboarding(null);
  }

})();
