/**
 * I AM HERE, MI REINA - Interactive Story Engine
 * Modular Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientEnvironment();
  initClickHearts();
});

/* ==========================================================================
   STATE MANAGEMENT
   ========================================================================== */
const state = {
  currentScene: 0,
  isAnimating: false,
  girlEmotion: 'sad' // 'sad', 'surprised', 'calm', 'happy'
};

/* ==========================================================================
   AMBIENT PARTICLES & RAIN SYSTEM
   ========================================================================== */
function initAmbientEnvironment() {
  const rainContainer = document.getElementById('rain-layer');
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
    // Prevent heart spawns on direct button clicks to avoid clutter
    if (e.target.tagName === 'BUTTON') return;

    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '♥';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;

    document.getElementById('ambient-container').appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 3000);
  });
}

/* ==========================================================================
   SCENE NAVIGATION & FLOW
   ========================================================================== */
function startExperience() {
  goToScene(1);
}

function goToScene(sceneNumber) {
  if (state.isAnimating) return;
  state.isAnimating = true;

  // Deactivate all scenes
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => scene.classList.remove('active'));

  // Activate target scene
  const targetScene = document.getElementById(`scene-${sceneNumber}`);
  if (targetScene) {
    targetScene.classList.add('active');
  }

  state.currentScene = sceneNumber;

  // Execute Scene Specific Logic
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

/* ==========================================================================
   SCENE SPECIFIC LOGIC
   ========================================================================== */

// SCENE 1
function setupScene1() {
  triggerTearAnimation();
  
  setTimeout(() => {
    showElement('s1-text-2');
  }, 2500);

  setTimeout(() => {
    showElement('s1-btn');
  }, 4500);
}

// SCENE 2
function setupScene2() {
  spawnThoughtTags();

  setTimeout(() => {
    showElement('s2-text-2');
  }, 2500);

  setTimeout(() => {
    showElement('s2-btn');
  }, 4800);
}

function spawnThoughtTags() {
  const container = document.getElementById('thoughts-container');
  container.innerHTML = ''; // Clear previous

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
    }, index * 800);
  });
}

// SCENE 3
function setupScene3() {
  // Animate Boy Approaching in Background
  const boy = document.getElementById('boy-group');
  boy.style.opacity = '1';
  boy.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease';
  boy.style.transform = 'translate(220px, 210px)'; // Walk closer

  setTimeout(() => {
    showElement('s3-text-1');
  }, 1800);

  setTimeout(() => {
    showElement('s3-text-2');
  }, 3800);

  setTimeout(() => {
    showElement('s3-btn');
  }, 5500);
}

// SCENE 4
function setupScene4() {
  // Boy Sits Down Beside Her
  const boy = document.getElementById('boy-group');
  boy.style.transform = 'translate(270px, 210px)';
  
  document.getElementById('boy-legs-walk').classList.add('hidden-element');
  document.getElementById('boy-legs-sit').classList.remove('hidden-element');

  // Change Girl Emotion to Noticing
  setGirlEmotion('surprised');

  const dialogueContainer = document.getElementById('s4-dialogue');
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
    }, index * 2200);
  });

  setTimeout(() => {
    showElement('s4-btn');
  }, lines.length * 2200 + 800);
}

// SCENE 5
function setupScene5() {
  setGirlEmotion('calm');
}

function makeChoice(type) {
  const responseBox = document.getElementById('s5-response');
  const choicesGrid = document.getElementById('s5-choices');

  choicesGrid.style.display = 'none';
  responseBox.classList.remove('hidden-element');

  if (type === 'hand') {
    responseBox.innerText = '“You don\'t have to carry everything alone.”';
  } else if (type === 'quiet') {
    responseBox.innerText = '“Sometimes staying is enough.”';
  } else if (type === 'hug') {
    responseBox.innerText = '“Come here...”';
  }

  setTimeout(() => {
    showElement('s5-btn');
  }, 1500);
}

// SCENE 6 - HUG EMBRACE
function setupScene6() {
  startHugAnimation();

  setTimeout(() => {
    showElement('s6-text-2');
  }, 2200);

  setTimeout(() => {
    showElement('s6-text-3');
  }, 4200);

  setTimeout(() => {
    showElement('s6-text-4');
  }, 6200);

  setTimeout(() => {
    showElement('s6-btn');
  }, 8200);
}

function startHugAnimation() {
  document.body.classList.add('warm-mode');

  // Move Boy into Full Embrace
  const boy = document.getElementById('boy-group');
  boy.style.transition = 'transform 2s ease';
  boy.style.transform = 'translate(315px, 210px)';

  // Switch Arm Visuals to Hugging
  document.getElementById('boy-arms-normal').classList.add('hidden-element');
  document.getElementById('boy-arms-hug').classList.remove('hidden-element');

  document.getElementById('girl-arms-slumped').classList.add('hidden-element');
  document.getElementById('girl-arms-hug').classList.remove('hidden-element');

  setGirlEmotion('happy');

  // Reduce Rain Intensity
  const rain = document.getElementById('rain-layer');
  rain.style.opacity = '0.2';
}

function showPersonalCard() {
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => scene.classList.remove('active'));

  document.getElementById('personal-card').classList.add('active');
}

/* ==========================================================================
   CHARACTER ANIMATION HELPERS
   ========================================================================== */
function setGirlEmotion(emotion) {
  state.girlEmotion = emotion;
  const eyesSad = document.getElementById('girl-eyes-sad');
  const eyesOpen = document.getElementById('girl-eyes-open');
  const mouthSad = document.getElementById('girl-mouth-sad');
  const mouthSmile = document.getElementById('girl-mouth-smile');

  if (emotion === 'surprised' || emotion === 'calm') {
    eyesSad.classList.add('hidden-element');
    eyesOpen.classList.remove('hidden-element');
  } else if (emotion === 'happy') {
    eyesSad.classList.remove('hidden-element');
    eyesOpen.classList.add('hidden-element');
    mouthSad.classList.add('hidden-element');
    mouthSmile.classList.remove('hidden-element');
  } else {
    // Sad default
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

/* ==========================================================================
   UTILITY HELPERS
   ========================================================================== */
function showElement(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden-element');
    el.classList.add('fade-in');
  }
}

function resetExperience() {
  // Reset Theme
  document.body.classList.remove('warm-mode');
  document.getElementById('rain-layer').style.opacity = '1';

  // Reset Characters
  const boy = document.getElementById('boy-group');
  boy.style.opacity = '0';
  boy.style.transform = 'translate(100px, 210px)';

  document.getElementById('boy-legs-walk').classList.remove('hidden-element');
  document.getElementById('boy-legs-sit').classList.add('hidden-element');
  document.getElementById('boy-arms-normal').classList.remove('hidden-element');
  document.getElementById('boy-arms-hug').classList.add('hidden-element');

  document.getElementById('girl-arms-slumped').classList.remove('hidden-element');
  document.getElementById('girl-arms-hug').classList.add('hidden-element');

  setGirlEmotion('sad');

  // Reset Thoughts Container
  document.getElementById('thoughts-container').innerHTML = '';

  // Return to Scene 0 (Start Screen)
  const scenes = document.querySelectorAll('.scene');
  scenes.forEach(scene => scene.classList.remove('active'));

  document.getElementById('start-screen').classList.add('active');
  state.currentScene = 0;
        }
  
