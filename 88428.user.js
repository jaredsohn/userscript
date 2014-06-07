// ==UserScript==
// @name           Phase Win Chance
// @namespace      None
// @description    Informs player of their chance of beating a phase.
// @include        http://*animecubed.com/billy/bvs/villager00t.html
// ==/UserScript==


function main()
 {var snap = document.evaluate('//center/table/tbody/tr/td[@width=250]', document, null, 7, null);
  var node = snap.snapshotItem(0);
  
  var drain = 0;
  var drainStrength = 0;
  var deathChance = 0;
  var maxDeathChance = 0;
  var drainEdge = 0;
  var hacks = 0;
  var phasesBeaten = 0;
  var damageBonuses = 0;
  var drainSuccesses = 0;
  var drainRange = 0;
  var season = 0;
  var phaseDifficulty = 0;
  var phaseHealth = 0;
  
  // Lives Left
  var livesLeft = node.childNodes[1].innerHTML;
  
  // Death Chance
  deathChance = parseInt(node.innerHTML.slice(node.innerHTML.indexOf('Base chance of death: ') + 22, node.innerHTML.indexOf('%')));
  if(node.innerHTML.indexOf('Phases defeated today: ') != -1)
    phasesBeaten = parseInt(node.innerHTML.slice(node.innerHTML.indexOf('Phases defeated today: ') + 23));
  deathChance += phasesBeaten;
  
  //Max Push Death Chance
  maxDeathChance = deathChance + 4;
  if(node.innerHTML.indexOf('Spear of Wotan!') != -1)
    maxDeathChance--;
  if(node.innerHTML.indexOf('Bullet Time!') != -1)
    maxDeathChance--;
  
  // Drain  
  drain = parseInt(node.innerHTML.slice(node.innerHTML.indexOf('Drain: ') + 7, node.innerHTML.indexOf('<br>')));
  season = drain;
  if(node.innerHTML.indexOf('Lycoris!') != -1)
    drain += 5;
  if(node.innerHTML.indexOf('555 Phone!') != -1)
    drain++;
  if(node.innerHTML.indexOf('Boomstick!') != -1)
    drain += 2;
  if(node.innerHTML.indexOf('Core Bonus! +5 Drain!') != -1)
    drain += 5;
  if(node.innerHTML.indexOf('Drain Amplifier!') != -1)
    drain += 2;
  if(node.innerHTML.indexOf('Tsukasa Lvl. 2') != -1)
    drain += 2;
  if(node.innerHTML.indexOf('Stalkergirl Lvl. 3') != -1)
    drain += 2;
  if(node.innerHTML.indexOf('Overclock Elixir!') != -1)
    drain += 5;
  if(node.innerHTML.indexOf('Drain &amp; Tonic!') != -1)
    drain += parseInt(node.innerHTML.slice(node.innerHTML.indexOf('Drain &amp; Tonic!') + 20));
  
  // Drain Strength
  if(node.innerHTML.indexOf('R00t!') != -1)
    drainStrength += 2;
  if(node.innerHTML.indexOf('Epitaph!') != -1)
    drainStrength += 2;
  if(node.innerHTML.indexOf('Skull Throne!') != -1)
    drainStrength++;
    
  // Drain Edge
  if(node.innerHTML.indexOf('Aromatic Grass! ') != -1)
    drainEdge += 5;
  if(node.innerHTML.indexOf('Wired Reflexes!') != -1)
    drainEdge += 10;
  if(node.innerHTML.indexOf('Core Bonus! +10 Edge!') != -1)
    drainEdge += 10;
  if(node.innerHTML.indexOf('Sporty Lvl. 2!') != -1)
    drainEdge += 5;
  if(node.innerHTML.indexOf('Tempest Kitsune!') != -1)
    drainEdge += 5;
  
    
  // Damage Bonuses
  if(node.innerHTML.indexOf('Smokey the Bear Lvl. 2!') != -1)
    damageBonuses += 50;
  if(node.innerHTML.indexOf('Tri-Edge!') != -1)
    damageBonuses += 50;
  if(node.innerHTML.indexOf('Season Four Collection!') != -1)
    damageBonuses += 11;
  if(node.innerHTML.indexOf('Detective Duo!') != -1)
    damageBonuses += 200;
  if(node.innerHTML.indexOf('Crazy Like a Fox 2!') != -1)
    damageBonuses += 100;
  if(node.innerHTML.indexOf('Crazy Like a Fox 3!') != -1)
    damageBonuses += 150;
  if(node.innerHTML.indexOf('Multi-Threaded Paths!') != -1)
    damageBonuses += 100;
  
  // Drain Successes
  if(node.innerHTML.indexOf('R00t Fu Bonus!') != -1)
    drainSuccesses += 2;
  
  // Drain Range
  drainRange = season + 10;
  
  // Phase Difficulty
  var node = snap.snapshotItem(1);
  phaseDifficulty = parseInt(node.childNodes[10].innerHTML.slice(11));
  
  // Phase Health
  phaseHealth = parseInt(node.childNodes[10].innerHTML.slice(node.childNodes[10].innerHTML.indexOf('&nbsp;&nbsp;&nbsp;') + 18));
  
  // Phase Average Damage Dealt
  var failChance = phaseDifficulty - drainStrength - 1;
  var numerator = drainRange - failChance;
  var successChance = numerator / drainRange;
  if(successChance > 1)
    successChance = 1;
  var edgeChance = drainEdge / 100;
  var edgeBonus = drain * edgeChance;
  var drainPlusEdge = Math.round(drain + edgeBonus);
  var estDamage = Math.round(successChance * drainPlusEdge);
  
  
  // Min Swing Win Chance
  var damageMultiplier = damageBonuses + 100 
  damageMultiplier /= 100
  var minEstDamage = Math.round(estDamage * damageMultiplier);
  var minSwingAttacksLeft = Math.ceil(phaseHealth / minEstDamage);
  var minLiveChance = 100 - deathChance;
  minLiveChance /= 100;
  minWinChance = Math.round(Math.pow(minLiveChance, minSwingAttacksLeft) * 10000) / 10000;
  for (i = 1; i < livesLeft; i++)
   {minLoseChance = 1 - minWinChance;
    minWinChance += minLoseChance * minWinChance;
    }
  minWinChance = Math.round(minWinChance * 10000) / 100;
  
  // Max Swing Win Chance
  var damageMultiplier = damageBonuses + 500
  damageMultiplier /= 100
  var maxEstDamage = Math.round(estDamage * damageMultiplier);
  var maxSwingAttacksLeft = Math.ceil(phaseHealth / maxEstDamage);
  var maxLiveChance = 100 - maxDeathChance;
  maxLiveChance /= 100;
  maxWinChance = Math.round(Math.pow(maxLiveChance, maxSwingAttacksLeft) * 10000) / 10000;
  for (i = 1; i < livesLeft; i++)
   {maxLoseChance = 1 - maxWinChance;
    maxWinChance += maxLoseChance * maxWinChance;
    }
  maxWinChance = Math.round(maxWinChance * 10000) / 100;
  
  var message = 'Drain: ' + drain + '\nDrain Strength: ' + drainStrength + '\nDrain Edge: ' + drainEdge + '\nDrain Range: ' + drainRange + '\nDrain Successes: ' + drainSuccesses + '\nDamage Bonuses: ' + damageBonuses + '\n\nPhase Health: ' + phaseHealth + '\nPhase Difficulty: ' + phaseDifficulty + '\n\nMin Estimated Average Damage: ' + minEstDamage + '\nMax Estimated Average Damage: ' + maxEstDamage + '\n\nLives Remaining: ' + livesLeft + '\nMin Death Chance: ' + deathChance + '%\nMax Death Chance: ' + maxDeathChance + '%\n\nMin Push Win Chance: ' + minWinChance + '%\nMax Push Win Chance: ' + maxWinChance + '%'; 
  
  var node = snap.snapshotItem(0);
  node.childNodes[8].innerHTML += '<br>Min Push Win Chance: ' + minWinChance + '%<br>Max Push Win Chance: ' + maxWinChance + '%';
  }
  
main();