// Basement Spoiler by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Basement Spoiler
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.0 - Spoils Fernswarthy's Basement
// @include        http://*kingdomofloathing.com/basement.php*
// @include        http://*kingdomofloathing.com/charsheet.php*
// ==/UserScript==

// Version 0.0	07/23/2012	IT BEGINS!
// Version 0.9	07/25/2012	Basics done
// Version 1.0	08/06/2012	Added 10% buffer

/*
Adds spoiler boxes to Fernswarthy's Basement.  Lists average damage/stat req with a 10% buffer built in.  Hover mouse over text box to see base damage/stat without buffer.  For elemental resistance tests, calculates damage based on resistances seen last time the character sheet was loaded.  (At some point I'll probably have it load charsheet.php from basement.php, but not today.)
 */

function basementElemental(level, elem1, elem2, item) {
  var doBigBox = false;
  var buffer = GM_getValue("buffer", 1.1);
  var baseDamagePer = Math.floor(4.48*(Math.pow(level, 1.4))+8);
  var damagePer = Math.floor(buffer*4.48*(Math.pow(level, 1.4))+8);

  var newElement = document.createElement("CENTER");
  newElement.id = "basementSpoilerBox";

  var html = '<table><tr align="center" style="font-size:small" title="Base damage: ' + baseDamagePer + '"><td>Inflicts ' + damagePer + ' damage each ' + elem1 + ' and ' + elem2 + '. ' + item + ', ' + elem1 + 'form best.</td></tr>';

  var res1 = GM_getValue("lastSeen" + elem1 + "Resist", 0);
  var dmg1m = Math.floor(damagePer * .05);
  var dmg1n = Math.floor(damagePer * .1);
  var bDmg1m = Math.floor(baseDamagePer * .05);
  var bDmg1n = Math.floor(baseDamagePer * .1);
  try {
    dmg1m = Math.floor(damagePer * resistance[res1][1]);
    dmg1n = Math.floor(damagePer * resistance[res1][0]);
    bDmg1m = Math.floor(baseDamagePer * resistance[res1][1]);
    bDmg1n = Math.floor(baseDamagePer * resistance[res1][0]);
  } catch (err) {
    // more than 60 resistance defaults to 5%/10% because, seriously, dude, come on
  }
  var res2 = GM_getValue("lastSeen" + elem2 + "Resist", 0);
  var dmg2m = Math.floor(damagePer * .05);
  var dmg2n = Math.floor(damagePer * .1);
  var bDmg2m = Math.floor(baseDamagePer * .05);
  var bDmg2n = Math.floor(baseDamagePer * .1);
  try {
    dmg2m = Math.floor(damagePer * resistance[res2][1]);
    dmg2n = Math.floor(damagePer * resistance[res2][0]);
    bDmg2m = Math.floor(baseDamagePer * resistance[res2][1]);
    bDmg2n = Math.floor(baseDamagePer * resistance[res2][0]);
  } catch (err) {
    // see above
  }
  //  alert(res1 + ", " + res2 + ", " + dmg1m + ", " + dmg2m + ", " + dmg1n + ", " + dmg2n);
  html = html + '<tr align="center" style="font-size:x-small" title="Non-myst, ' + bDmg1n + ' + ' + bDmg2n + ' = ' + (bDmg1n+bDmg2n) + '; Myst, ' + bDmg1m + ' + ' + bDmg2m + ' = ' + (bDmg1m+bDmg2m) + '"><td>With last seen resistances, that\'s <font color="#ff0000">' +(dmg1n+dmg2n) + '</font> damage (' + dmg1n + ' ' + elem1 + ', ' + dmg2n + ' ' + elem2 + ') for non-myst, or <font color="#ff0000">' + (dmg1m+dmg2m) + '</font> damage (' + dmg1m + ' ' + elem1 + ', ' + dmg2m + ' ' + elem2 + ') for myst.</td></tr>';

  if (doBigBox) {
    html = html + '<tr align="center"><td><table border="1"><tr>';
    
    for (var i=0; i<3; i++) {
      html = html + '<td><table><tr style="font-size:small"><td>Resist</td><td>Non-myst</td><td>Myst</td></tr>';
      for (var j=2; j<=10; j+=2) {
	html = html + '<tr style="font-size:x-small"><td>' + (i*10+j) + '</td><td>' + Math.floor(damagePer * resistance[i*10+j][0]) + ' <font color="#808080">(' + 2*Math.floor(damagePer * resistance[i*10+j][0]) + ')</font></td><td>' + Math.floor(damagePer * resistance[i*10+j][1]) + ' <font color="#808080">(' + 2*Math.floor(damagePer * resistance[i*10+j][1]) + ')</font></td></tr>';
      }
      html = html + '</table></td>';
    }
    
    html = html + '</tr></table></td></tr>';
  }
 
  html = html + '</table>';
  newElement.innerHTML = html;

  var x = document.evaluate("//form//input[@class='button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //  alert(x + ", " + x.singleNodeValue.innerHTML);
  x.singleNodeValue.parentNode.insertBefore(newElement, x.singleNodeValue);
}

function basementStat(level, stat) {
  //alert("basement stat " + level + ", " + stat);
  var buffer = GM_getValue("buffer", 1.1);
  var baseStatReq = Math.floor(1*(Math.pow(level, 1.4))+2);
  var statReq = Math.floor(buffer*1*(Math.pow(level, 1.4))+2);

  var newElement = document.createElement("CENTER");
  newElement.id = "basementSpoilerBox";
  newElement.innerHTML = '<div style="font-size:small" title="Base ' + baseStatReq + '">Requires ' + statReq + ' ' + stat + '.</div>';

  var x = document.evaluate("//form//input[@class='button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //  alert(x + ", " + x.singleNodeValue.innerHTML);
  x.singleNodeValue.parentNode.insertBefore(newElement, x.singleNodeValue);
}

function basementHP(level, stat) {
  //alert("basement hp " + level);
  var buffer = GM_getValue("buffer", 1.1);
  var baseHpReq = Math.floor(10*(Math.pow(level, 1.4)));
  var hpReq = Math.floor(buffer*10*(Math.pow(level, 1.4)));

  var newElement = document.createElement("CENTER");
  newElement.id = "basementSpoilerBox";
  newElement.innerHTML = '<div style="font-size:small" title="Base ' + baseHpReq + ', or ' + Math.floor(baseHpReq/10) + '">Requires ' + hpReq + ' HP, ' + Math.floor(hpReq/10) + ' HP with 1000 DA.</div>';

  var x = document.evaluate("//form//input[@class='button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //  alert(x + ", " + x.singleNodeValue.innerHTML);
  x.singleNodeValue.parentNode.insertBefore(newElement, x.singleNodeValue);
}

function basementMP(level, stat) {
  //alert("basement mp " + level);
  var buffer = GM_getValue("buffer", 1.1);
  var baseMpReq = Math.floor(1.67*(Math.pow(level, 1.4)));
  var mpReq = Math.floor(buffer*1.67*(Math.pow(level, 1.4)));

  var newElement = document.createElement("CENTER");
  newElement.id = "basementSpoilerBox";
  newElement.innerHTML = '<div style="font-size:small" title="Base ' + baseMpReq + '">Requires ' + mpReq + ' MP.</div>';

  var x = document.evaluate("//form//input[@class='button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //  alert(x + ", " + x.singleNodeValue.innerHTML);
  x.singleNodeValue.parentNode.insertBefore(newElement, x.singleNodeValue);
}

function basementReward() {
  var x = document.evaluate("//form//input[@class='button']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i=0; i<x.snapshotLength; i++) {
    var button = x.snapshotItem(i);
    //alert(button.value);
    switch (button.value) {
    case 'Leather is Betther (1)':
    case 'Take the Red Pill (1)':
      button.value = button.value.replace('(1)', '(Musc) (1)');
      break;
    case 'Save the Dolls (1)':
    case 'Take the Blue Pill (1)':
      button.value = button.value.replace('(1)', '(Myst) (1)');
      break;
    case 'Got Silk? (1)':
    case 'Save the Cardboard (1)':
      button.value = button.value.replace('(1)', '(Mox) (1)');
      break;
    default:
      alert("Huh? " + button.value);
      break;
    }
  }
}

function basementMonster(level, hpMult, comments) {
  var factor = Math.floor(1*(Math.pow(level, 1.4)));
  var hp = Math.floor(hpMult * factor);
  var ml = 2 * factor;

  var newElement = document.createElement("CENTER");
  newElement.id = "basementSpoilerBox";
  newElement.innerHTML = '<div style="font-size:small">ML ' + ml + '. ' + hp + ' HP.' + comments + '</div>';

  var x = document.evaluate("//form//input[@class='button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //  alert(x + ", " + x.singleNodeValue.innerHTML);
  x.singleNodeValue.parentNode.insertBefore(newElement, x.singleNodeValue);
}

function spoilBasement() {
  var regex = /<b>Fernswarthy.s Basement, Level ([0-9]+)/;
  var items = document.body.innerHTML.match(regex);
  var level = new Number(items[0].replace(regex, '$1'));
  //alert (level);

  var button = document.evaluate("//form//input[@class='button']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //alert(button);
  //alert(button.singleNodeValue);
  var buttonTxt = button.singleNodeValue.value;
  //alert("{"+buttonTxt+"}");

  //Round 49...  Fight! (1)
  buttonTxt = buttonTxt.replace(/Round [0-9]+...  Fight!/, "Round X...  Fight!");
  buttonTxt = buttonTxt.replace(/Take [0-9]+ Down/, "Take X Down");

  switch (buttonTxt) {
  case 'Drink the Drunk\'s Drink (1)':
    basementElemental(level, 'Cold', 'Sleaze', 'Unspeakable Earring');
    break;
  case 'Hold your nose and watch your back (1)':
    basementElemental(level, 'Sleaze', 'Stench', 'Ice-Cold Beerring');
    break;
  case 'Pwn the Cone (1)':
    basementElemental(level, 'Stench', 'Hot', 'Mudflap-Girl Earring');
    break;
  case 'What\'s a Typewriter, Again? (1)':
    basementElemental(level, 'Hot', 'Spooky', 'Nose Ring of Putrescence');
    break;
  case 'Evade the Vampsicle (1)':
    basementElemental(level, 'Spooky', 'Cold', 'Earring of Fire');
    break;
  case 'Lift \'em! (1)':
  case 'Push it Real Good (1)':
  case 'Ring that Bell! (1)':
    basementStat(level, 'Muscle');
    break;
  case 'Gathering:  The Magic (1)':
  case 'Mop the Floor with the Mops (1)':
  case 'Do away with the \'doo (1)':
    basementStat(level, 'Mysticality');
    break;
  case 'Don\'t Wake the Baby (1)':
  case 'Grab a cue (1)':
  case 'Put on the Smooth Moves (1)':
    basementStat(level, 'Moxie');
    break;
  case 'Run the Gauntlet Gauntlet (1)':
    basementHP(level);
    break;
  case 'Grab the Handles (1)':
    basementMP(level);
    break;
  case 'Got Silk? (1)':
  case 'Save the Dolls (1)':
  case 'Take the Red Pill (1)':
    basementReward();
    break;
  case 'Don\'t Fear the Ear (1)': // ears
  case 'Round X...  Fight! (1)': // hydra
    basementMonster(level, 1.7, '');
    break;
  case 'Commence to Pokin\' (1)': // eyes
    basementMonster(level, 1.7, ' Wins initiative.');
    break;
  case 'Take X Down (1)': // beer golem
    basementMonster(level, 1.7, ' <b>BLOCKS SPELLS.</b>');
    break;
  case 'Collapse That Waveform (1)': // horror
    basementMonster(level, 1.7, ' Blocks attacks.');
    break;
  case 'It\'s Stone Bashin\' Time (1)': //stone golem
    basementMonster(level, .85, ' Some phys resist.');
    break;
  case 'Toast that Ghost (1)': // ghost
    basementMonster(level, .425, ' 100% phys resist.');
    break;
  case 'Take the Sandwich (1)':
  case 'Doo Doo Doo Doo (1)':
  case 'Grab one! (1)':
  case 'Help Him Out (1)':
  case 'Open the Chest (1)':
    // do nothing
    break;
  default:
    alert('Huh?' + "{"+buttonTxt+"}");
    break;
  }
  /*
  var newElement = document.getElementById("basementSpoilerBox");
  if (newElement!=null) {
    newElement.innerHTML = newElement.innerHTML + '<a href="inv_use.php?pwd=' + GM_getValue("pwdHash") + '&amp;ajax=1&amp;whichitem=3485">[use]</a>';
    //    newElement.innerHTML = newElement.innerHTML + '<a href="inv_use.php?pwd=' + GM_getValue("pwdHash") + '&amp;which=3&amp;whichitem=420">[use]</a>';
    //"inv_use.php?ajax=1&amp;whichitem=IID&amp;itemquantity=NUM&amp;quantity=NUM&amp;pwd=4da462fd929edd515c157162a2a7ee24"
  }
  */
  return true;
}


var resistance = [
[1, 1], 

[0.9, 0.85], 
[0.8, 0.75], 
[0.7, 0.65], 
[0.6, 0.55], 
[0.516666666666667, 0.466666666666667], 
[0.447222222222222, 0.397222222222222], 
[0.389351851851852, 0.339351851851852], 
[0.341126543209877, 0.291126543209877], 
[0.30093878600823, 0.25093878600823], 
[0.267448988340192, 0.217448988340192], 

[0.239540823616827, 0.189540823616827], 
[0.216284019680689, 0.166284019680689], 
[0.196903349733907, 0.146903349733907], 
[0.180752791444923, 0.130752791444923], 
[0.167293992870769, 0.117293992870769], 
[0.156078327392308, 0.106078327392307], 
[0.14673193949359, 0.0967319394935896], 
[0.138943282911325, 0.0889432829113247], 
[0.132452735759437, 0.0824527357594372], 
[0.127043946466198, 0.0770439464661976], 

[0.122536622055165, 0.0725366220551648], 
[0.118780518379304, 0.0687805183793039], 
[0.115650431982753, 0.0656504319827532], 
[0.113042026652294, 0.0630420266522944], 
[0.110868355543579, 0.0608683555435786], 
[0.109056962952982, 0.0590569629529821], 
[0.107547469127485, 0.0575474691274851], 
[0.106289557606238, 0.0562895576062377], 
[0.105241298005198, 0.0552412980051979], 
[0.104367748337665, 0.054367748337665], 

[0.103639790281387, 0.0536397902813874], 
[0.103033158567823, 0.0530331585678229], 
[0.102527632139852, 0.0525276321398523], 
[0.102106360116544, 0.0521063601165437], 
[0.10175530009712, 0.0517553000971197], 
[0.101462750080933, 0.051462750080933], 
[0.101218958400778, 0.0512189584007775], 
[0.101015798667315, 0.0510157986673146], 
[0.100846498889429, 0.0508464988894288], 
[0.100705415741191, 0.0507054157411907], 

[0.100587846450992, 0.0505878464509922], 
[0.100489872042494, 0.0504898720424936], 
[0.100408226702078, 0.0504082267020779], 
[0.100340188918398, 0.0503401889183982], 
[0.100283490765332, 0.0502834907653319], 
[0.100236242304443, 0.0502362423044432], 
[0.100196868587036, 0.050196868587036], 
[0.100164057155863, 0.0501640571558634], 
[0.100136714296553, 0.0501367142965528], 
[0.100113928580461, 0.0501139285804606], 

[0.100094940483717, 0.0500949404837172], 
[0.100079117069764, 0.0500791170697643], 
[0.10006593089147, 0.0500659308914703], 
[0.100054942409559, 0.0500549424095585], 
[0.100045785341299, 0.0500457853412988], 
[0.100038154451082, 0.0500381544510823], 
[0.100031795375902, 0.0500317953759019], 
[0.100026496146585, 0.0500264961465849], 
[0.100022080122154, 0.050022080122154], 
[0.100018400101795, 0.050018400101795], 
];

function doCharPane() {
  /*
  var pwdHash = unsafeWindow.pwdhash;
  if (pwdHash==undefined || pwdHash==null) return false;
  //  alert("Hash: " + pwdHash);
  GM_setValue("pwdHash", pwdHash);
  */
}

function doCharSheet() {
  //alert("check char sheet");

  var currValues = GM_listValues();
  for (var i=0; i<currValues.length; i++) {
    //alert(currValues[i] + ", " + currValues[i].match(/lastSeen.*Resist/));
    if (currValues[i].match(/lastSeen.*Resist/)!=null) GM_deleteValue(currValues[i]);
  }

  //alert("check resists");
  var regex = /<tr><td align="right">([^ ]*?) Protection:<.td><td><b>(.*?) \((.*?)\)<.b>/g;
  var resist = document.body.innerHTML.match(regex);

  var txt = "resist: " + resist.length + "\n";
  //alert(txt);
  for (var i=0; i<resist.length; i++) {
    var element = resist[i].replace(regex, "$1");
    var string = resist[i].replace(regex, "$2");
    var level = resist[i].replace(regex, "$3");
    txt = txt + (i + ", " + element + ", " + string + ", [" + level + "]") + "\n";
    var valName = "lastSeen" + element + "Resist";
    var valNum = parseInt(level);
    //alert("{" + valName + "}, {" +  valNum + "}");
    GM_setValue(valName, valNum);
  }
  //  alert (txt);
}

if (document.location.pathname.indexOf("basement.php") > 0 ) {
  spoilBasement();
} else if ( document.location.pathname.indexOf("charpane.php") > 0 ) {
  doCharPane();
} else if ( document.location.pathname.indexOf("charsheet.php") > 0 ) {
  doCharSheet();
}
