// ==UserScript==
// @name                NW Profile Calculator
// @namespace           
// @description         Calculates vital statistics and combat statistics
// @include             http://www.nexuswar.com/characters/view.do?characterID=*
// @include             http://nexuswar.com/characters/view.do?characterID=*
// ==/UserScript==

if(!document.getElementById("profilevitals")) return;

var targettd1 = document.getElementById("profilevitals")
                  .childNodes[1]  // 1 table
                  .childNodes[1]  // 1 tbody
                  .childNodes[0]  // 0 tr
                  .childNodes[3]; // 3 td

var targettd3 = document.getElementById("profilevitals")
                  .childNodes[1]  // 1 table
                  .childNodes[1]  // 1 tbody
                  .childNodes[0]  // 0 tr
                  .childNodes[7]; // 7 td

var targetinit = targettd1.firstChild.nextSibling.firstChild.data;
targetinit = targetinit.split(" ");
// fetch level
targetlevel = parseInt(targetinit[1]);
// fetch class
if (targetinit.length>3) {
  targetclass = targetinit[2] + " " + targetinit[3];
}
else {
  targetclass = targetinit[2];
}

var targetlevel;
var targetclass;
var targetmaxhp   = 50;
var targetmaxmp   = 20;
var targetdef1    = 0;
var targetdef2    = 0;
var targetatk     = new Array(10);
var targetsoak1   = new Array(14);
var targetsoak2   = new Array(14);
var targetsoak3   = new Array(14);

var targetimmune9 = false;

targetatk[0] = 0;
for (var i=1;i<targetatk.length;i++) {
  targetatk[i] = 10;
}

for (var i=0;i<targetsoak1.length;i++) {
  targetsoak1[i] = 0;
  targetsoak2[i] = 0;
  targetsoak3[i] = 0;
}

// calc basics
if (targetlevel>=10) {
  targetmaxhp += targetlevel - 9;
}
targetmaxmp += targetlevel - 1;
targetdef1 += 2*Math.floor((targetlevel)/5);
targetdef2 += targetdef1;

// parse skills
var skillitems = document.evaluate(
                 ".//td[@class='sn']/a",
                 targettd3,
                 null,
                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                 null);
if (!skillitems.snapshotLength) return;

for (var i=0;i<skillitems.snapshotLength;i++) {
  temp = skillitems.snapshotItem(i).firstChild.data;
  switch (temp) {
    case "Dodge":
      targetdef1 += 5;
      break;
    case "Hand to Hand Combat":
      targetatk[3] += 20;
      break;
    case "Martial Arts":
      targetdef1 += 2;
      targetatk[3] += 15;
      break;
    case "Advanced Martial Arts":
      targetdef1 += 5;
      targetatk[3] += 15;
      break;
    case "Melee Combat":
      targetatk[1] += 20;
      targetatk[2] += 20;
      break;
    case "Advanced Melee Combat":
      targetatk[1] += 15;
      targetatk[2] += 15;
      break;
    case "Fencing":
      targetatk[2] += 10;
      break;
    case "Ranged Combat":
      targetatk[4] += 25;
      targetatk[5] += 25;
      targetatk[6] += 25;
      targetatk[7] += 25;
      targetatk[8] += 25;
      targetatk[9] += 25;
      break;
    case "Archery":
      targetatk[8] += 20;
      break;
    case "Advanced Archery":
      targetatk[8] += 10;
      break;
    case "Long Arms":
      targetatk[6] += 20;
      break;
    case "Advanced Long Arms":
      targetatk[6] += 10;
      break;
    case "Small Arms":
      targetatk[5] += 20;
      break;
    case "Advanced Small Arms":
      targetatk[5] += 10;
      break;
    case "Thrown Weapons":
      targetatk[7] += 20;
      break;
    case "Advanced Thrown Weapons":
      targetatk[7] += 10;
      break;
    case "Stamina":
      targetmaxhp += 10;
      break;
    case "Spell Combat":
      targetatk[9] += 20;
      break;
    case "Battle Magic":
      targetatk[9] += 10;
      break;
    case "Super Reflexes":
      targetdef1 += 5;
      targetdef2 += 5;
      break;
    case "Weapon Mastery":
      targetatk[1] += 5;
      targetatk[2] += 5;
      targetatk[4] += 5;
      targetatk[5] += 5;
      targetatk[6] += 5;
      targetatk[7] += 5;
      targetatk[8] += 5;
      break;
    case "Spring of the Enhanced Capacitor":
      targetmaxhp += 10;
      targetmaxmp += 10;
      break;
    case "Cosmic Affinity":
      targetmaxmp += 15;
      break;
    case "Cosmic Mastery":
      targetmaxmp += 15;
      break;
    case "Cosmic Oneness":
      targetmaxmp += 15;
      break;
    case "Fiendish Bulk":
      targetmaxhp += 15;
      break;
    case "Grace of Blood":
      targetmaxhp += 15;
      break;
    case "Stygian Bloodletting":
      targetatk[0] += 5;
      break;
    case "Terrifying Aspect":
      targetdef1 += 10;
      targetdef2 += 10;
      break;
    case "Translucency":
      targetdef1 += 5;
      targetdef2 += 5;
      break;
    case "The Way of Air":
      targetatk[0] += 5;
      break;
    case "The Way of the Accurate Hand":
      targetatk[7] += 5;
      break;
    case "The Way of Water":
      targetdef1 += 5;
      targetdef2 += 5;
      break;

    // aura
    case "Acid Blood":
      break;
    case "Burning Aura":
      break;
    case "Clockwork Cloud":
      break;
    case "Aura of the Crypt":
      break;

    // armor
    case "Divine Armor":
      if (targetlevel>=10&&targetlevel<14) {
        targetsoak1[1]=5;targetsoak1[2]=5;targetsoak1[3]=5;targetsoak1[4]=5;targetsoak1[5]=3;targetsoak1[6]=2;targetsoak1[7]=2;targetsoak1[8]=2;targetsoak1[9]=2;targetsoak1[10]=3;targetsoak1[11]=2;targetsoak1[12]=2;
      }
      else if (targetlevel>=14&&targetlevel<18) {
        targetsoak1[1]=6;targetsoak1[2]=6;targetsoak1[3]=6;targetsoak1[4]=6;targetsoak1[5]=3;targetsoak1[6]=3;targetsoak1[7]=3;targetsoak1[8]=3;targetsoak1[9]=3;targetsoak1[10]=4;targetsoak1[11]=2;targetsoak1[12]=2;targetsoak1[13]=1;
      }
      else if (targetlevel>=18&&targetlevel<22) {
        targetsoak1[1]=6;targetsoak1[2]=6;targetsoak1[3]=6;targetsoak1[4]=6;targetsoak1[5]=4;targetsoak1[6]=4;targetsoak1[7]=4;targetsoak1[8]=4;targetsoak1[9]=4;targetsoak1[10]=5;targetsoak1[11]=3;targetsoak1[12]=3;targetsoak1[13]=2;
      }
      else if (targetlevel>=22&&targetlevel<26) {
        targetsoak1[1]=7;targetsoak1[2]=7;targetsoak1[3]=7;targetsoak1[4]=7;targetsoak1[5]=4;targetsoak1[6]=5;targetsoak1[7]=5;targetsoak1[8]=4;targetsoak1[9]=5;targetsoak1[10]=5;targetsoak1[11]=4;targetsoak1[12]=4;targetsoak1[13]=3;
      }
      else if (targetlevel>=26&&targetlevel<30) {
        targetsoak1[1]=7;targetsoak1[2]=7;targetsoak1[3]=7;targetsoak1[4]=7;targetsoak1[5]=5;targetsoak1[6]=6;targetsoak1[7]=6;targetsoak1[8]=5;targetsoak1[9]=6;targetsoak1[10]=6;targetsoak1[11]=5;targetsoak1[12]=5;targetsoak1[13]=4;
      }
      else if (targetlevel==30) {
        targetsoak1[1]=8;targetsoak1[2]=8;targetsoak1[3]=8;targetsoak1[4]=8;targetsoak1[5]=6;targetsoak1[6]=7;targetsoak1[7]=7;targetsoak1[8]=6;targetsoak1[9]=7;targetsoak1[10]=7;targetsoak1[11]=5;targetsoak1[12]=5;targetsoak1[13]=5;
      }
      break;
    case "Chitinous Armor":
      targetsoak1[1]=6;targetsoak1[2]=6;targetsoak1[3]=6;targetsoak1[4]=6;targetsoak1[5]=4;targetsoak1[7]=5;targetsoak1[8]=5;targetsoak1[9]=5;targetsoak1[10]=6;targetsoak1[11]=4;targetsoak1[12]=5;targetsoak1[13]=4;
      break;
    case "Exoskeletal Armor":
      targetsoak1[1]=6;targetsoak1[2]=6;targetsoak1[3]=6;targetsoak1[4]=6;targetsoak1[5]=8;targetsoak1[6]=4;targetsoak1[9]=4;
      break;
    case "Tattoo of Resilience":
      targetsoak1[1]=4;targetsoak1[2]=4;targetsoak1[3]=4;targetsoak1[4]=4;targetsoak1[5]=5;targetsoak1[6]=7;targetsoak1[7]=6;targetsoak1[8]=5;targetsoak1[9]=7;targetsoak1[10]=3;targetsoak1[11]=6;targetsoak1[12]=5;targetsoak1[13]=3;
      break;
    case "The Way of Earth":
      targetsoak1[1]=6;targetsoak1[2]=7;targetsoak1[3]=7;targetsoak1[4]=7;targetsoak1[5]=3;targetsoak1[6]=6;targetsoak1[7]=4;targetsoak1[8]=2;targetsoak1[9]=6;targetsoak1[10]=5;targetsoak1[11]=3;targetsoak1[12]=5;targetsoak1[13]=5;
      break;

    // elementalist
    case "Earthquake":
      targetsoak3[2] += 1;
      targetsoak3[8] += -1;
      break;
    case "Summon Homonculus":
      targetsoak3[2] += 1;
      targetsoak3[8] += -1;
      break;
    case "Summon Rocky Servitor":
      targetsoak3[2] += 1;
      targetsoak3[8] += -1;
      break;
    case "Summon Stone Champion":
      targetsoak3[2] += 1;
      targetsoak3[8] += -1;
      break;

    case "Summon Ember":
      targetsoak3[9] += 1;
      targetsoak3[6] += -1;
      break;
    case "Summon Fiery Servitor":
      targetsoak3[9] += 1;
      targetsoak3[6] += -1;
      break;
    case "Summon Holocaust":
      targetsoak3[9] += 1;
      targetsoak3[6] += -1;
      break;

    case "Fly":
      targetsoak3[8] += 1;
      targetsoak3[2] += -1;
      break;
    case "Summon Cirri":
      targetsoak3[8] += 1;
      targetsoak3[2] += -1;
      break;
    case "Summon Aerial Servitor":
      targetsoak3[8] += 1;
      targetsoak3[2] += -1;
      break;
    case "Summon Hurricane":
      targetsoak3[8] += 1;
      targetsoak3[2] += -1;
      break;

    case "Water Breathing":
      targetsoak3[6] += 1;
      targetsoak3[9] += -1;
      break;
    case "Summon Naiad":
      targetsoak3[6] += 1;
      targetsoak3[9] += -1;
      break;
    case "Summon Aquatic Servitor":
      targetsoak3[6] += 1;
      targetsoak3[9] += -1;
      break;
    case "Summon Hydrodragon":
      targetsoak3[6] += 1;
      targetsoak3[9] += -1;
      break;

    // immunities
    case "Fire Resistance":
      if (targetclass=="Elementalist") {
        targetsoak3[9] += 1;
        targetsoak3[6] += -1;
      }
      targetimmune9 = true;
      break;
    case "The Stepping of the Asssassin":
      break;
    case "The Way of Antitoxin":
      break;

    default:
      break;
  }
}

for (var i=1;i<targetatk.length-1;i++) {
  targetatk[i] += targetatk[0];
}

if (targetimmune9) {
  targetsoak1[9] = "*";
}

if (targetclass=="Void Walker") {
  targetdef2 += 5;
  targetdef1 += 5;
}
if (targetclass=="Advocate") {
  targetsoak1[13] = "*";
}
if (targetclass=="Lich"||targetclass=="Revenant") {
  targetsoak1[7] = "*";
}

// parse armor
var equipitems = document.evaluate(
                 ".//div[@class='pd']",
                 targettd1,
                 null,
                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                 null);
if (!equipitems.snapshotLength) return;

equipitems = equipitems.snapshotItem(0).firstChild.data;

if (equipitems.indexOf(" is wearing a")!=-1) {
  // bracelet of the elements
  if (equipitems.indexOf(" bracelet of the elements")!=-1) {
    if (targetsoak2[6]<4) {
      targetsoak2[6] = 4;
    }
    if (targetsoak2[8]<4) {
      targetsoak2[8] = 4;
    }
    if (targetsoak2[9]<4) {
      targetsoak2[9] = 4;
    }
  }

  // lesser ring of fire protection
  if (equipitems.indexOf(" lesser ring of fire protection")!=-1) {
    if (targetsoak2[9]<4) {
      targetsoak2[9] = 4;
    }
  }

  // greater ring of fire protection
  if (equipitems.indexOf(" greater ring of fire protection")!=-1) {
    if (targetsoak2[9]<7) {
      targetsoak2[9] = 7;
    }
  }

  // lesser protection ring
  if (equipitems.indexOf(" lesser protection ring")!=-1) {
    if (targetsoak2[0]<2) {
      targetsoak2[0] = 2;
    }
  }

  // greater protection ring
  if (equipitems.indexOf(" greater protection ring")!=-1) {
    if (targetsoak2[0]<4) {
      targetsoak2[0] = 4;
    }
  }

  // chainmail shirt
  if (equipitems.indexOf(" chaimail shirt")!=-1) {
    if (targetsoak2[2]<2) {
      targetsoak2[2] = 2;
    }
    if (targetsoak2[3]<2) {
      targetsoak2[3] = 2;
    }
    if (targetsoak2[4]<3) {
      targetsoak2[4] = 3;
    }
  }

  // fireman's jacket
  if (equipitems.indexOf(" fireman's jacket")!=-1) {
    if (targetsoak2[2]<1) {
      targetsoak2[2] = 1;
    }
    if (targetsoak2[4]<2) {
      targetsoak2[4] = 2;
    }
    if (targetsoak2[9]<3) {
      targetsoak2[9] = 3;
    }
  }

  // leather cuirass
  if (equipitems.indexOf(" leather cuirass")!=-1) {
    if (targetsoak2[3]<3) {
      targetsoak2[3] = 3;
    }
    if (targetsoak2[4]<4) {
      targetsoak2[4] = 4;
    }
  }

  // leather jacket
  if (equipitems.indexOf(" leather jacket")!=-1) {
    if (targetsoak2[3]<2) {
      targetsoak2[3] = 2;
    }
    if (targetsoak2[4]<2) {
      targetsoak2[4] = 2;
    }
  }

  // plate cuirass
  if (equipitems.indexOf(" plate cuirass")!=-1) {
    if (targetsoak2[2]<2) {
      targetsoak2[2] = 2;
    }
    if (targetsoak2[3]<4) {
      targetsoak2[3] = 4;
    }
    if (targetsoak2[4]<4) {
      targetsoak2[4] = 4;
    }
  }

  // suit of light body armor
  if (equipitems.indexOf(" suit of light body armor")!=-1) {
    if (targetsoak2[1]<2) {
      targetsoak2[1] = 2;
    }
    if (targetsoak2[3]<4) {
      targetsoak2[3] = 4;
    }
    if (targetsoak2[4]<2) {
      targetsoak2[4] = 2;
    }
  }

  // suit of military encounter armor
  if (equipitems.indexOf(" suit of military encounter armor")!=-1) {
    if (targetsoak2[1]<3) {
      targetsoak2[1] = 3;
    }
    if (targetsoak2[3]<5) {
      targetsoak2[3] = 5;
    }
    if (targetsoak2[4]<3) {
      targetsoak2[4] = 3;
    }
  }

  // suit of police riot armor
  if (equipitems.indexOf(" suit of police riot armor")!=-1) {
    if (targetsoak2[2]<4) {
      targetsoak2[2] = 4;
    }
    if (targetsoak2[4]<3) {
      targetsoak2[4] = 3;
    }
  }

  if (targetsoak2[0]>0) {
    for (var i=1;i<targetsoak2.length;i++) {
      if (targetsoak2[i]<targetsoak2[0]) {
        targetsoak2[i] = targetsoak2[0];
      }
    }
  }
}

// write
var targettable = "<table width=\"100%\">";
targettable += "<tr class=\"ph\"><td colspan=\"2\">Basics</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Max Hit Points:</span></td><td>" + targetmaxhp + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Max Magic Points:</span></td><td>" + targetmaxmp + "</td></tr>";
targettable += "<tr class=\"ph\"><td colspan=\"2\">Defense</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Melee Defense:</span></td><td>" + targetdef1 + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Ranged Defense:</span></td><td>" + targetdef2 + "</td></tr>";
targettable += "<tr class=\"ph\"><td colspan=\"2\">Attack</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Melee Weapons:</span></td><td>" + targetatk[1] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Sword:</span></td><td>" + targetatk[2] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Hand-to-Hand:</span></td><td>" + targetatk[3] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Ranged Weapons:</span></td><td>" + targetatk[4] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Small Arms:</span></td><td>" + targetatk[5] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Long Arms:</span></td><td>" + targetatk[6] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Thrown Weapons:</span></td><td>" + targetatk[7] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Archery:</span></td><td>" + targetatk[8] + "</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Ranged Spells:</span></td><td>" + targetatk[9] + "</td></tr>";
targettable += "</table>";

targettable += "<table width=\"100%\">";
targettable += "<tr class=\"ph\"><td colspan=\"4\">Soak</td></tr>";
targettable += "<tr><td> </td><td>Innate</td><td>Equip</td><td>Bonus</td></tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Ballistic:</span></td><td>" + targetsoak1[1] + "</td><td>" + targetsoak2[1] + " &plusmn; 2</td><td>" + targetsoak3[1] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Bludgeon:</span></td><td>" + targetsoak1[2] + "</td><td>" + targetsoak2[2] + " &plusmn; 2</td><td>" + targetsoak3[2] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Piercing:</span></td><td>" + targetsoak1[3] + "</td><td>" + targetsoak2[3] + " &plusmn; 2</td><td>" + targetsoak3[3] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Slashing:</span></td><td>" + targetsoak1[4] + "</td><td>" + targetsoak2[4] + " &plusmn; 2</td><td>" + targetsoak3[4] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Acid:</span></td><td>" + targetsoak1[5] + "</td><td>" + targetsoak2[5] + " &plusmn; 2</td><td>" + targetsoak3[5] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Cold:</span></td><td>" + targetsoak1[6] + "</td><td>" + targetsoak2[6] + " &plusmn; 2</td><td>" + targetsoak3[6] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Death:</span></td><td>" + targetsoak1[7] + "</td><td>" + targetsoak2[7] + " &plusmn; 2</td><td>" + targetsoak3[7] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Electrical:</span></td><td>" + targetsoak1[8] + "</td><td>" + targetsoak2[8] + " &plusmn; 2</td><td>" + targetsoak3[8] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Fire:</span></td><td>" + targetsoak1[9] + "</td><td>" + targetsoak2[9] + " &plusmn; 2</td><td>" + targetsoak3[9] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Holy:</span></td><td>" + targetsoak1[10] + "</td><td>" + targetsoak2[10] + " &plusmn; 2</td><td>" + targetsoak3[10] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Magical:</span></td><td>" + targetsoak1[11] + "</td><td>" + targetsoak2[11] + " &plusmn; 2</td><td>" + targetsoak3[11] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Nexal:</span></td><td>" + targetsoak1[12] + "</td><td>" + targetsoak2[12] + " &plusmn; 2</td><td>" + targetsoak3[12] + "</tr>";
targettable += "<tr><td class=\"nowrap\"><span class=\"il\">Unholy:</span></td><td>" + targetsoak1[13] + "</td><td>" + targetsoak2[13] + " &plusmn; 2</td><td>" + targetsoak3[13] + "</tr>";
targettable += "</table>";

targettable += "<div style=\"clear:both;margin-bottom:10px;\"> </div>";

targettd3.innerHTML = targettable + targettd3.innerHTML;