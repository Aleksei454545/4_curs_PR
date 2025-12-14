const $ = (id) => document.getElementById(id);

const $btn = $('btn-kick');
const $btnUlt = $('btn-ult');
const $logs = $('logs');

const $kickLeft = $('kick-left');
const $ultLeft  = $('ult-left');

const KICK_LIMIT = 6;
const ULT_LIMIT  = 3;

if ($kickLeft) $kickLeft.textContent = KICK_LIMIT;
if ($ultLeft)  $ultLeft.textContent  = ULT_LIMIT;

function makeLogLine({ attacker, target, damage, left, total }) {
  const template = logs[random(logs.length) - 1];
  return (
    template
      .replace('[ПЕРСОНАЖ №1]', attacker)
      .replace('[ПЕРСОНАЖ №2]', target) +
    ` — −${damage} HP, залишок ${target}: ${left} / ${total}`
  );
}

function printLog(data) {
  const p = document.createElement('p');
  p.innerText = makeLogLine(data);
  $logs.prepend(p);
}

let mainHero, enemy1, enemy2;
let enemies = [];

function disableButtons() {
  if ($btn) $btn.disabled = true;
  if ($btnUlt) $btnUlt.disabled = true;
}

function checkEnd() {
  if (enemies.every(p => !p.isAlive)) {
    disableButtons();
    alert('Перемога! Всі вороги повержені!');
  }
}

function onPokemonDead(pokemon) {
  if (pokemon === mainHero) {
    disableButtons();
  } else {
    checkEnd();
  }
}

function initPokemons() {
  mainHero = new Pokemon({
    name: 'Pikachu',
    maxHP: 100,
    hpId: 'health-character',
    barId: 'progressbar-character',
    logger: printLog,
    onDead: onPokemonDead,
  });

  enemy1 = new Pokemon({
    name: 'Charmander',
    maxHP: 100,
    hpId: 'health-enemy',
    barId: 'progressbar-enemy',
    logger: printLog,
    onDead: onPokemonDead,
  });

  enemy2 = new Pokemon({
    name: 'Bulbasaur',
    maxHP: 100,
    hpId: 'health-enemy2',
    barId: 'progressbar-enemy2',
    logger: printLog,
    onDead: onPokemonDead,
  });

  enemies = [enemy1, enemy2];

  mainHero.render();
  enemy1.render();
  enemy2.render();
}

function enemyCounterAttack() {
  if (!mainHero.isAlive) return;

  enemies.filter(p => p.isAlive).forEach(enemy => {
    if (!mainHero.isAlive) return;
    const dmg = random(15);
    mainHero.takeDamage(dmg, enemy.name);
  });
}

const kickCounter = createClickCounter(KICK_LIMIT, (left) => {
  if ($kickLeft) $kickLeft.textContent = left;
});

const ultCounter = createClickCounter(ULT_LIMIT, (left) => {
  if ($ultLeft) $ultLeft.textContent = left;
});

// ---------------- ОБРОБНИКИ КНОПОК ----------------

if ($btn) {
  $btn.addEventListener('click', () => {
    if (!mainHero.isAlive) return;

    const canClick = kickCounter('Thunder Jolt');
    if (!canClick) {
      $btn.disabled = true;
      return;
    }

    enemies.filter(p => p.isAlive).forEach(enemy => {
      const dmg = random(20);
      enemy.takeDamage(dmg, mainHero.name);
    });

    if ($btn.disabled) return;

    enemyCounterAttack();
  });
}

if ($btnUlt) {
  $btnUlt.addEventListener('click', () => {
    if (!mainHero.isAlive) return;

    const canClick = ultCounter('Ult Kick');
    if (!canClick) {
      $btnUlt.disabled = true;
      return;
    }

    enemies.filter(p => p.isAlive).forEach(enemy => {
      const dmg = random(35);
      enemy.takeDamage(dmg, mainHero.name);
    });

    if ($btn.disabled) return;

    enemyCounterAttack();
  });
}


initPokemons();
