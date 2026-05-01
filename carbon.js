// carbon.js

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModule1();
  initModule2();
  initModule3();
  initModule4();
  initModule5();
  initScumActivity();
  initQuizzes();
});

// Navigation & Hamburger
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// ==========================================
// Module 1: Versatile Nature (Drag & Drop)
// ==========================================
function initModule1() {
  const workspace = document.getElementById('m1Workspace');
  const atoms = document.querySelectorAll('.draggable-atom');
  const resetBtn = document.getElementById('resetM1');

  if (!workspace) return;

  let atomId = 0;
  let placedAtoms = [];

  atoms.forEach(atom => {
    atom.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.dataset.type);
    });
  });

  workspace.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  workspace.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    if (!type) return;

    const rect = workspace.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    placeAtom(type, x, y);
  });

  function placeAtom(type, x, y) {
    const el = document.createElement('div');
    el.className = `placed-atom placed-${type.toLowerCase()}`;
    el.innerText = type;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.dataset.id = atomId++;
    
    workspace.appendChild(el);
    placedAtoms.push({ id: el.dataset.id, type, x, y, el });

    drawBonds();
  }

  function drawBonds() {
    // Remove old bonds
    document.querySelectorAll('.bond-line').forEach(b => b.remove());

    // Simple proximity bonding
    for (let i = 0; i < placedAtoms.length; i++) {
      for (let j = i + 1; j < placedAtoms.length; j++) {
        const a = placedAtoms[i];
        const b = placedAtoms[j];
        
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        // Max bond distance
        if (dist < 120) {
          const bond = document.createElement('div');
          bond.className = 'bond-line';
          bond.style.width = `${dist}px`;
          bond.style.left = `${a.x}px`;
          bond.style.top = `${a.y}px`;
          
          const angle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
          bond.style.transform = `rotate(${angle}deg)`;
          
          workspace.insertBefore(bond, workspace.firstChild);
        }
      }
    }
  }

  resetBtn.addEventListener('click', () => {
    workspace.innerHTML = '';
    placedAtoms = [];
    atomId = 0;
  });
}

// ==========================================
// Module 2: Electron Dot Structures
// ==========================================
function initModule2() {
  const display = document.getElementById('m2Display');
  const btns = document.querySelectorAll('.mol-btn');
  if(!display) return;

  const structures = {
    "H2": `<svg viewBox="0 0 200 100">
            <circle cx="70" cy="50" r="40" fill="none" stroke="#00e5ff" stroke-width="2" stroke-dasharray="4"/>
            <text x="40" y="55" fill="#fff" font-size="20">H</text>
            <circle cx="130" cy="50" r="40" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="4"/>
            <text x="150" y="55" fill="#fff" font-size="20">H</text>
            <g class="electron-pair">
              <circle cx="90" cy="40" r="4" fill="#ff3366"/>
              <circle cx="110" cy="60" r="4" fill="#ff3366"/>
            </g>
           </svg>`,
    "O2": `<svg viewBox="0 0 200 100">
            <circle cx="70" cy="50" r="45" fill="none" stroke="#00e5ff" stroke-width="2"/>
            <text x="35" y="55" fill="#fff" font-size="20">O</text>
            <circle cx="130" cy="50" r="45" fill="none" stroke="#00ff88" stroke-width="2"/>
            <text x="155" y="55" fill="#fff" font-size="20">O</text>
            <g class="electron-pair">
              <circle cx="95" cy="35" r="4" fill="#ff3366"/><circle cx="105" cy="35" r="4" fill="#ff3366"/>
              <circle cx="95" cy="65" r="4" fill="#ff3366"/><circle cx="105" cy="65" r="4" fill="#ff3366"/>
            </g>
           </svg>`,
    "CH4": `<svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="50" fill="none" stroke="#00e5ff" stroke-width="2"/>
              <text x="92" y="105" fill="#fff" font-size="20">C</text>
              <circle cx="100" cy="30" r="30" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="4"/>
              <circle cx="100" cy="170" r="30" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="4"/>
              <circle cx="30" cy="100" r="30" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="4"/>
              <circle cx="170" cy="100" r="30" fill="none" stroke="#00ff88" stroke-width="2" stroke-dasharray="4"/>
              <text x="95" y="25" fill="#fff" font-size="14">H</text>
              <text x="95" y="185" fill="#fff" font-size="14">H</text>
              <text x="15" y="105" fill="#fff" font-size="14">H</text>
              <text x="175" y="105" fill="#fff" font-size="14">H</text>
              <g class="electron-pair"><circle cx="90" cy="55" r="4" fill="#ff3366"/><circle cx="110" cy="55" r="4" fill="#ff3366"/></g>
              <g class="electron-pair"><circle cx="90" cy="145" r="4" fill="#ff3366"/><circle cx="110" cy="145" r="4" fill="#ff3366"/></g>
              <g class="electron-pair"><circle cx="55" cy="90" r="4" fill="#ff3366"/><circle cx="55" cy="110" r="4" fill="#ff3366"/></g>
              <g class="electron-pair"><circle cx="145" cy="90" r="4" fill="#ff3366"/><circle cx="145" cy="110" r="4" fill="#ff3366"/></g>
            </svg>`
  };

  function renderMol(mol) {
    if(structures[mol]) {
      display.innerHTML = `<div class="svg-container">${structures[mol]}</div><p style="margin-top:1rem;color:#aaa;">Hover over red dots to see shared electron pairs.</p>`;
    } else {
      display.innerHTML = `<p>Structure for ${mol} coming soon.</p>`;
    }
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMol(btn.dataset.mol);
    });
  });

  // Default
  renderMol("H2");
}

// ==========================================
// Module 3: Hydrocarbons (3D)
// ==========================================
function initModule3() {
  const viewer = document.getElementById('m3Viewer');
  const select = document.getElementById('hcSelect');
  const toggle = document.getElementById('viewToggle');
  if(!viewer) return;

  function build2D(name, nC, type) {
    if (type === 'alkane') {
      if(nC===1) return `&nbsp;&nbsp;H<br/>&nbsp;&nbsp;|<br/>H-C-H<br/>&nbsp;&nbsp;|<br/>&nbsp;&nbsp;H`;
      let top = "&nbsp;".repeat(nC) + "H ".repeat(nC);
      let mid = "H-" + "C-".repeat(nC-1) + "C-H";
      let bot = "&nbsp;".repeat(nC) + "| ".repeat(nC);
      let bot2 = "&nbsp;".repeat(nC) + "H ".repeat(nC);
      return `${top}<br/>${bot}<br/>${mid}<br/>${bot}<br/>${bot2}`;
    } else if (type === 'alkene') {
      let top = "&nbsp;H&nbsp;&nbsp;&nbsp;H" + (nC>2 ? " ".repeat(nC-2) + "H ".repeat(nC-2) : "");
      let bot = "&nbsp;|&nbsp;&nbsp;&nbsp;|" + (nC>2 ? " ".repeat(nC-2) + "| ".repeat(nC-2) : "");
      let mid = "H-C=C-" + (nC>2 ? "C-".repeat(nC-3) + "C-H" : "H").replace("--","-");
      return `${top}<br/>${bot}<br/>${mid}<br/>${bot}<br/>${top}`; // Simplified 2D
    } else {
      let mid = "H-C≡C-" + (nC>2 ? "C-".repeat(nC-3) + "C-H" : "H").replace("--","-");
      return mid;
    }
  }

  function build3D(nC, type) {
    let html = `<div class="scene-3d">`;
    let startX = -((nC-1) * 30);
    
    // Draw Carbon Chain
    for(let i=0; i<nC; i++) {
      let x = startX + i*60;
      let y = (i%2===0) ? -20 : 20; // Zigzag
      if (type==='alkyne') y = 0; // Linear
      
      html += `<div class="atom-3d atom-3d-c" style="transform:translate(${x}px, ${y}px)"></div>`;
      
      // Bond to next C
      if(i < nC-1) {
        let nextY = ((i+1)%2===0) ? -20 : 20;
        if (type==='alkyne') nextY = 0;
        let angle = Math.atan2(nextY-y, 60) * 180 / Math.PI;
        let bHeight = (i===0 && type==='alkene') ? 20 : ((i===0 && type==='alkyne') ? 30 : 10); // Thicker for double/triple
        let color = (i===0 && type!=='alkane') ? "linear-gradient(to bottom, #ff3366, #ff0000)" : "linear-gradient(to bottom, #ccc, #777)";
        
        html += `<div class="bond-3d" style="width:70px; height:${bHeight}px; background:${color}; transform:translate(${x+20}px, ${y}px) rotate(${angle}deg);"></div>`;
      }
      
      // Draw Hydrogens (simplified abstraction)
      let hCount = (type==='alkane') ? 2 : (type==='alkene' && i<2 ? 1 : (type==='alkyne' && i<2 ? 0 : 2));
      if (i===0 || i===nC-1) hCount++;
      if (type==='alkyne' && i<2 && (i===0 || i===nC-1)) hCount = 1;

      for(let j=0; j<hCount; j++) {
        let hAngle = (j * (360/hCount)) + (i*45);
        let hX = x + Math.cos(hAngle * Math.PI/180) * 50;
        let hY = y + Math.sin(hAngle * Math.PI/180) * 50;
        let hZ = (j%2===0) ? 30 : -30;
        html += `<div class="atom-3d atom-3d-h" style="transform:translate3d(${hX+10}px, ${hY-10}px, ${hZ}px)"></div>`;
        html += `<div class="bond-3d" style="width:50px; height:4px; transform:translate(${x+10}px, ${y-10}px) rotate(${hAngle}deg);"></div>`;
      }
    }
    
    html += `</div>`;
    return html;
  }

  const carbons = {
    methane: [1, 'alkane'], ethane: [2, 'alkane'], propane: [3, 'alkane'], butane: [4, 'alkane'], pentane: [5, 'alkane'],
    ethene: [2, 'alkene'], propene: [3, 'alkene'], butene: [4, 'alkene'], pentene: [5, 'alkene'],
    ethyne: [2, 'alkyne'], propyne: [3, 'alkyne'], butyne: [4, 'alkyne'], pentyne: [5, 'alkyne']
  };

  function updateView() {
    const val = select.value;
    const is3D = toggle.checked;
    const [nC, type] = carbons[val] || [1, 'alkane'];
    
    if (is3D) {
      viewer.innerHTML = build3D(nC, type);
    } else {
      viewer.innerHTML = `<div style="font-size:1.5rem;font-family:monospace;text-align:center;">${build2D(val, nC, type)}</div>`;
    }
  }

  select.addEventListener('change', updateView);
  toggle.addEventListener('change', updateView);
  
  updateView();
}

// ==========================================
// Module 4: Reactions
// ==========================================
function initModule4() {
  const stage = document.getElementById('m4Stage');
  const btns = document.querySelectorAll('.rxn-btn');
  if(!stage || !carbonData) return;

  function renderReaction(key) {
    const rxn = carbonData.reactions[key];
    stage.innerHTML = `
      <div class="anim-box center-content">
        ${rxn.animHtml}
      </div>
      <div class="equation-display" style="margin-top:2rem;">
        ${rxn.eq}
      </div>
    `;
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderReaction(btn.dataset.rxn);
    });
  });

  renderReaction('combustion');
}

// ==========================================
// Module 5: Soap Cleansing
// ==========================================
function initModule5() {
  const stage = document.getElementById('m5Stage');
  const btn = document.getElementById('soapStepBtn');
  const status = document.getElementById('soapStatus');
  if(!stage) return;

  let step = 0;

  // Center coordinates for micelle
  const centerX = 200;
  const centerY = 200;

  // Make oil drop precisely centered initially
  const oilDrop = stage.querySelector('.oil-drop');
  oilDrop.style.left = `${centerX}px`;
  oilDrop.style.top = `${centerY}px`;

  // Add 12 soap molecules
  for(let i=0; i<12; i++) {
    const mol = document.createElement('div');
    mol.className = 'soap-mol';
    mol.innerHTML = `<div class="soap-tail"></div><div class="soap-head"></div>`;
    // Distribute around edges initially (outside the visible area)
    const angle = (i * 30) * Math.PI / 180;
    const x = centerX + Math.cos(angle) * 180 - 50; // offset for molecule width
    const y = centerY + Math.sin(angle) * 180 - 7;
    
    mol.style.left = `${x}px`;
    mol.style.top = `${y}px`;
    mol.style.transform = `rotate(${i * 30}deg)`;
    stage.appendChild(mol);
  }

  btn.addEventListener('click', () => {
    step++;
    const mols = document.querySelectorAll('.soap-mol');
    
    if(step === 1) {
      status.innerText = "Step 2: Soap added. Hydrophobic tails point towards oil.";
      mols.forEach((m, i) => {
        m.style.opacity = '1';
        // Move slightly closer
        const angle = (i * 30) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * 130 - 50;
        const y = centerY + Math.sin(angle) * 130 - 7;
        m.style.left = `${x}px`;
        m.style.top = `${y}px`;
      });
    } else if (step === 2) {
      status.innerText = "Step 3: Micelle formation! Tails embed in oil perfectly.";
      mols.forEach((m, i) => {
        const angle = (i * 30) * Math.PI / 180;
        // Move so tails touch the 80px oil drop (radius 40)
        // 50px is the length of the tail. So radius should be ~40 for the tail tip to hit center, 
        // but wait, tail origin is right edge? No, transform-origin is right center.
        // We will just place them in a tight circle around the center point.
        const x = centerX + Math.cos(angle) * 40 - 50; 
        const y = centerY + Math.sin(angle) * 40 - 7;
        m.style.left = `${x}px`;
        m.style.top = `${y}px`;
        // Rotate so head faces outward (add 180deg)
        m.style.transform = `rotate(${i * 30 + 180}deg)`;
      });
    } else if (step === 3) {
      status.innerText = "Step 4: Emulsion. Dirt is lifted away in water.";
      // Move whole micelle up together (oil + soap)
      oilDrop.style.top = '20%';
      mols.forEach((m, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * 40 - 50;
        const y = 80 + Math.sin(angle) * 40 - 7; // Top is 80 (20% of 400)
        m.style.left = `${x}px`;
        m.style.top = `${y}px`;
      });
      btn.innerText = "Reset";
    } else {
      // Reset
      step = 0;
      status.innerText = "Step 1: Oil droplet in water.";
      oilDrop.style.top = '50%';
      mols.forEach((m, i) => {
        m.style.opacity = '0';
        const angle = (i * 30) * Math.PI / 180;
        const x = centerX + Math.cos(angle) * 180 - 50;
        const y = centerY + Math.sin(angle) * 180 - 7;
        m.style.left = `${x}px`;
        m.style.top = `${y}px`;
        m.style.transform = `rotate(${i * 30}deg)`;
      });
      btn.innerText = "Next Step ➔";
    }
  });
}

// ==========================================
// Scum Formation Activity
// ==========================================
function initScumActivity() {
  const btnSoft = document.getElementById('btnSoftWater');
  const btnHard = document.getElementById('btnHardWater');
  const btnReset = document.getElementById('btnResetBeaker');
  const waterLevel = document.getElementById('waterLevel');
  const latherLayer = document.getElementById('latherLayer');
  const scumLayer = document.getElementById('scumLayer');
  const resultText = document.getElementById('scumResult');

  if (!btnSoft) return;

  btnSoft.addEventListener('click', () => {
    waterLevel.style.background = "rgba(0, 229, 255, 0.2)"; // clear water
    latherLayer.style.height = "25%"; // rich lather
    scumLayer.style.height = "0%";
    scumLayer.innerHTML = ""; // no precipitate
    resultText.innerHTML = "<strong>Soft Water + Soap:</strong><br/> Rich lather forms easily. Dirt would be cleaned effectively.";
    resultText.style.color = "var(--c-secondary)";
  });

  btnHard.addEventListener('click', () => {
    waterLevel.style.background = "rgba(100, 100, 100, 0.4)"; // cloudy water
    latherLayer.style.height = "2%"; // almost no lather
    scumLayer.style.height = "15%"; // scum precipitate at bottom
    // add some chunky bits
    scumLayer.innerHTML = "<div style='width:80%; height:5px; background:#eee; margin:2px; border-radius:2px;'></div><div style='width:60%; height:8px; background:#fff; margin:2px; border-radius:2px;'></div>";
    resultText.innerHTML = "<strong>Hard Water + Soap:</strong><br/> Ca²⁺/Mg²⁺ ions react with soap to form insoluble <strong>scum</strong> (white precipitate). Very little lather forms.";
    resultText.style.color = "var(--c-accent)";
  });

  btnReset.addEventListener('click', () => {
    waterLevel.style.background = "rgba(0, 229, 255, 0.2)";
    latherLayer.style.height = "0%";
    scumLayer.style.height = "0%";
    scumLayer.innerHTML = "";
    resultText.innerHTML = "Select a water type to observe the reaction.";
    resultText.style.color = "var(--c-primary)";
  });
}

// ==========================================
// Quiz System
// ==========================================
function initQuizzes() {
  if(!carbonData || !carbonData.quizzes) return;
  
  const modules = ['m1', 'm2', 'm3', 'm4', 'm5'];
  
  modules.forEach(m => {
    const container = document.getElementById(`quiz-${m}`);
    if(!container) return;
    
    const quiz = carbonData.quizzes[m];
    
    let html = `<h3 class="quiz-title">${quiz.title}</h3>`;
    
    quiz.questions.forEach((q, qIndex) => {
      html += `<div class="q-box" id="${m}-q${qIndex}">
        <p><strong>Q${qIndex+1}:</strong> ${q.q}</p>
        <div class="q-options">`;
      
      q.options.forEach((opt, oIndex) => {
        html += `<button class="q-opt-btn" onclick="checkAnswer('${m}', ${qIndex}, ${oIndex}, this)">${opt}</button>`;
      });
      
      html += `</div>
        <div class="q-feedback" id="feedback-${m}-${qIndex}"></div>
      </div>`;
    });
    
    container.innerHTML = html;
  });
}

// Global function for quiz buttons
window.checkAnswer = function(moduleId, qIndex, selectedOpt, btnEl) {
  const qData = carbonData.quizzes[moduleId].questions[qIndex];
  const box = document.getElementById(`${moduleId}-q${qIndex}`);
  const feedback = document.getElementById(`feedback-${moduleId}-${qIndex}`);
  
  // Disable all buttons in this question
  const btns = box.querySelectorAll('.q-opt-btn');
  btns.forEach(b => b.disabled = true);
  
  if (selectedOpt === qData.answer) {
    btnEl.classList.add('correct');
    feedback.innerHTML = `✅ <strong>Correct!</strong> ${qData.explanation}`;
    feedback.style.color = '#00ff88';
  } else {
    btnEl.classList.add('wrong');
    // highlight correct
    btns[qData.answer].classList.add('correct');
    feedback.innerHTML = `❌ <strong>Incorrect.</strong> ${qData.explanation}`;
    feedback.style.color = '#ff3366';
  }
  feedback.style.display = 'block';
};
