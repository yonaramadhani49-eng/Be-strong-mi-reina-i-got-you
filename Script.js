document.addEventListener('DOMContentLoaded', () => {
  initAmbientEnvironment();
  initClickHearts();
});

const state = {
  currentScene: 0,
  isAnimating: false,
  girlEmotion: 'sad'
};

function initAmbientEnvironment() {
  const rainContainer = document.getElementById('rain-layer');
  if (!rainContainer) return;

  const dropCount = 35;
  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${0.8 + Math.random() * 0.6}s`;
    drop.style.animationDelay = `${Math.random() * 2}s`;
    rainContainer.appendChild(drop);
  }
}

function initClickHearts() {
  document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '♥';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;

    const container = document.getElementById('ambient-container');
    if (container) {
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }
  });
}

// SAUTI NA SCENE SWITCHING SALAMA
function startExperience() {
  const audio = document.getElementById('bg-music');
  if (audio) {
    audio.volume = 0.4;
    // Tumia catch kuzuia error ya Playback isiharibu transition
    let playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Audio autoplay was blocked by browser, moving forward anyway.");
      });
    }
  }
  
  // Hakikisha inakwenda Scene 1 moja kwa moja
  goToScene(1);
}

function goToScene(sceneNumber) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  // Ondoa active kwenye zote
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => {
    scene.classList.remove('active');
  });

  // Weka active kwenye inayotakiwa
  const targetScene = document.getElementById(`scene-${sceneNumber}`);
  if (targetScene) {
    targetScene.classList.add('active');
  }

  state.currentScene = sceneNumber;

  setTimeout(() => {
    handleSceneInit(sceneNumber);
    state.isAnimating = false;
  }, 400);
}

function handleSceneInit(sceneNumber) {
  switch (sceneNumber) {
    case 1:
      setupScene1();
      break;
    case 2:
      setupScene2();
      break;
    case 3:
      setupScene3();
      break;
    case 4:
      setupScene4();
      break;
    case 5:
      setupScene5();
      break;
    case 6:
      setupScene6();
      break;
  }
}

function setupScene1() {
  triggerTearAnimation();
  
  setTimeout(() => {
    showElement('s1-text-2');
  }, 2000);

  setTimeout(() => {
    showElement('s1-btn');
  }, 4000);
}

function setupScene2() {
  spawnThoughtTags();

  setTimeout(() => {
    showElement('s2-text-2');
  }, 2000);

  setTimeout(() => {
    showElement('s2-btn');
  }, 4000);
}

function spawnThoughtTags() {
  const container = document.getElementById('thoughts-container');
  if (!container) return;
  container.innerHTML = '';

  const thoughts = [
    "Too much to think about...",
    "Too much to handle...",
    "Too many feelings...",
    "Too little rest..."
  ];

  thoughts.forEach((text, index) => {
    setTimeout(() => {
      const tag = document.createElement('div');
      tag.className = 'thought-tag';
      tag.innerText = text;
      tag.style.top = `${20 + index * 18}%`;
      tag.style.left = index % 2 === 0 ? '10%' : '55%';
      container.appendChild(tag);
    }, index * 600);
  });
}

function setupScene3() {
  const boy = document.getElementById('boy-group');
  if (boy) {
    boy.style.opacity = '1';
    boy.style.transition = 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease';
    boy.style.transform = 'translate(220px, 210px)';
  }

  setTimeout(() => {
    showElement('s3-text-1');
  }, 1500);

  setTimeout(() => {
    showElement('s3-text-2');
  }, 3000);

  setTimeout(() => {
    showElement('s3-btn');
  }, 4500);
}

function setupScene4() {
  const boy = document.getElementById('boy-group');
  if (boy) {
    boy.style.transform = 'translate(270px, 210px)';
  }
  
  const boyLegsWalk = document.getElementById('boy-legs-walk');
  const boyLegsSit = document.getElementById('boy-legs-sit');
  if (boyLegsWalk) boyLegsWalk.classList.add('hidden-element');
  if (boyLegsSit) boyLegsSit.classList.remove('hidden-element');

  setGirlEmotion('surprised');

  const dialogueContainer = document.getElementById('s4-dialogue');
  if (!dialogueContainer) return;
  dialogueContainer.innerHTML = '';

  const lines = [
    { speaker: 'boy', text: '“You don\'t have to be strong right now.”' },
    { speaker: 'girl', text: '“I\'m just tired...”' },
    { speaker: 'boy', text: '“Then rest.”' },
    { speaker: 'girl', text: '“Everything feels like too much.”' },
    { speaker: 'boy', text: '“Then let me stay beside you while it feels heavy.”' }
  ];

  lines.forEach((line, index) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = `dialogue-line ${line.speaker}`;
      p.innerText = line.text;
      dialogueContainer.appendChild(p);

      setTimeout(() => p.classList.add('visible'), 50);
    }, index * 1800);
  });

  setTimeout(() => {
    showElement('s4-btn');
  }, lines.length * 1800 + 500);
}

function setupScene5() {
  setGirlEmotion('calm');
}

function makeChoice(type) {
  const responseBox = document.getElementById('s5-response');
  const choicesGrid = document.getElementById('s5-choices');

  if (choicesGrid) choicesGrid.style.display = 'none';
  if (responseBox) {
    responseBox.classList.remove('hidden-element');
    if (type === 'hand') {
      responseBox.innerText = '“You don\'t have to carry everything alone.”';
    } else if (type === 'quiet') {
      responseBox.innerText = '“Sometimes staying is enough.”';
    } else if (type === 'hug') {
      responseBox.innerText = '“Come here...”';
    }
  }

  setTimeout(() => {
    showElement('s5-btn');
  }, 1000);
}

function setupScene6() {
  startHugAnimation();

  setTimeout(() => {
    showElement('s6-text-2');
  }, 2000);

  setTimeout(() => {
    showElement('s6-text-3');
  }, 3800);

  setTimeout(() => {
    showElement('s6-text-4');
  }, 5500);

  setTimeout(() => {
    showElement('s6-btn');
  }, 7000);
}

function startHugAnimation() {
  document.body.classList.add('warm-mode');

  const boy = document.getElementById('boy-group');
  if (boy) {
    boy.style.transition = 'transform 2s ease';
    boy.style.transform = 'translate(315px, 210px)';
  }

  const boyArmsNorm = document.getElementById('boy-arms-normal');
  const boyArmsHug = document.getElementById('boy-arms-hug');
  if (boyArmsNorm) boyArmsNorm.classList.add('hidden-element');
  if (boyArmsHug) boyArmsHug.classList.remove('hidden-element');

  const girlArmsSlump = document.getElementById('girl-arms-slumped');
  const girlArmsHug = document.getElementById('girl-arms-hug');
  if (girlArmsSlump) girlArmsSlump.classList.add('hidden-element');
  if (girlArmsHug) girlArmsHug.classList.remove('hidden-element');

  setGirlEmotion('happy');

  const rain = document.getElementById('rain-layer');
  if (rain) rain.style.opacity = '0.2';
}

function showPersonalCard() {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => scene.classList.remove('active'));

  const card = document.getElementById('personal-card');
  if (card) card.classList.add('active');
}

function setGirlEmotion(emotion) {
  state.girlEmotion = emotion;
  const eyesSad = document.getElementById('girl-eyes-sad');
  const eyesOpen = document.getElementById('girl-eyes-open');
  const mouthSad = document.getElementById('girl-mouth-sad');
  const mouthSmile = document.getElementById('girl-mouth-smile');

  if (!eyesSad || !eyesOpen || !mouthSad || !mouthSmile) return;

  if (emotion === 'surprised' || emotion === 'calm') {
    eyesSad.classList.add('hidden-element');
    eyesOpen.classList.remove('hidden-element');
  } else if (emotion === 'happy') {
    eyesSad.classList.remove('hidden-element');
    eyesOpen.classList.add('hidden-element');
    mouthSad.classList.add('hidden-element');
    mouthSmile.classList.remove('hidden-element');
  } else {
    eyesSad.classList.remove('hidden-element');
    eyesOpen.classList.add('hidden-element');
    mouthSad.classList.remove('hidden-element');
    mouthSmile.classList.add('hidden-element');
  }
}

function triggerTearAnimation() {
  const tear = document.getElementById('girl-tear');
  if (!tear) return;

  tear.style.opacity = '1';
  tear.style.transform = 'translateY(0)';
  tear.style.transition = 'transform 2.5s linear, opacity 2.5s ease';

  setTimeout(() => {
    tear.style.transform = 'translateY(12px)';
    tear.style.opacity = '0';
  }, 100);
}

function showElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden-element');
    el.classList.add('fade-in');
  }
}

function resetExperience() {
  document.body.classList.remove('warm-mode');
  const rain = document.getElementById('rain-layer');
  if (rain) rain.style.opacity = '1';

  const boy = document.getElementById('boy-group');
  if (boy) {
    boy.style.opacity = '0';
    boy.style.transform = 'translate(100px, 210px)';
  }

  const boyLegsWalk = document.getElementById('boy-legs-walk');
  const boyLegsSit = document.getElementById('boy-legs-sit');
  if (boyLegsWalk) boyLegsWalk.classList.remove('hidden-element');
  if (boyLegsSit) boyLegsSit.classList.add('hidden-element');

  const boyArmsNorm = document.getElementById('boy-arms-normal');
  const boyArmsHug = document.getElementById('boy-arms-hug');
  if (boyArmsNorm) boyArmsNorm.classList.remove('hidden-element');
  if (boyArmsHug) boyArmsHug.classList.add('hidden-element');

  const girlArmsSlump = document.getElementById('girl-arms-slumped');
  const girlArmsHug = document.getElementById('girl-arms-hug');
  if (girlArmsSlump) girlArmsSlump.classList.remove('hidden-element');
  if (girlArmsHug) girlArmsHug.classList.add('hidden-element');

  setGirlEmotion('sad');

  const thoughts = document.getElementById('thoughts-container');
  if (thoughts) thoughts.innerHTML = '';

  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => scene.classList.remove('active'));

  const startScreen = document.getElementById('start-screen');
  if (startScreen) startScreen.classList.add('active');
  
  state.currentScene = 0;
}
