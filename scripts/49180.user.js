// ==UserScript==
// @name    Facebook Mafia Wars Autoplayer
// @namespace   mafiawars
// @description   autoplayer for the mafia wars game I modified code from Blannies Vampire Wars script http://userscripts.org/scripts/show/36917
// @include   http://apps.facebook.com/inthemafia/*
// @include   http://apps.new.facebook.com/inthemafia/*
// @version 0.7
// @contributor StevenD
// @contributor CharlesD
// @contributor Eric Ortego
// @contributor Jeremy
// @contributor Liquidor
// @contributor AK17710N
// @contributor Fragger
// @contributor <x51>
// ==/UserScript==



if (!initialized) {
  var settingsOpen = false;
  var delay = 3000;
  var defaultClans = ['TFMG', 'MMA', 'LCN', 'MIA', 'SBG', 'ICE', 'EXCELSIOR', 'J.I'];

  if (GM_getValue('enableDebug', '') == 'checked') {
    var debug = true;
  } else {
    var debug = false;
  }

  var propertyId = new Array(
    ['Mega Casino', 12],
    ['5-Star Hotel', 11],
    ['Office Building', 10],
    ['Marina Tourist Shops', 9],
    ['Valu-Mart', 8],
    ['Appartment Complex', 7],
    ['Italian Restaurant', 6]
    );

  var SCRIPT = {
    url: 'http://userscripts.org/scripts/source/43573.user.js',
    version: '0.7',
    name: 'inthemafia',
    appID: 'app10979261223',
    presentationurl: 'http://userscripts.org/scripts/show/43573',
    controller: '/remote/html_server.php?&xw_controller=',
    action: '&xw_action=',
    opponent: '&opponent_id=',
    user: '&user_id='
  };

  // job description, energy cost, job number, tab number
  var missions = new Array(
    ['Mugging',1,1,1],
    ['Corner Store Hold-up',3,2,1],
    ['Warehouse Robbery',5,3,1],
    ['Auto Theft',7,4,1],
    ['Beat Up Rival Gangster',2,5,1],
    ['Rob a Pimp',3,8,1],
    ['Collect on a Loan',2,37,1],
    ['Collect Protection Money',2,6,2],
    ['Rough Up Dealers',2,7,2],
    ['Take Out a Rogue Cop',3,9,2],
    ['Perform a Hit',3,10,2],
    ['Bank Heist',10,11,2],
    ['Jewelry Store Job',15,12,2],
    ['Hijack a Semi',8,38,2],
    ['Destroy Enemy Mob Hideout',5,13,3],
    ['Kill a Protected Snitch',5,14,3],
    ['Bust a Made Man Out of Prison',5,15,3],
    ['Museum Break-in',18,16,3],
    ['Fight a Haitian Gang',6,17,3],
    ['Clip the Irish Mob\'s Local Enforcer',10,39,3],
    ['Steal a Tanker Truck',8,40,3],
    ['Federal Reserve Raid',25,18,4],
    ['Smuggle Across the Border',7,19,4],
    ['Liquor Smuggling',30,22,4],
    ['Run Illegal Poker Game',20,26,4],
    ['Wiretap the Cops',30,28,4],
    ['Rob an Electronics Store',24,41,4],
    ['Burn Down a Tenement',18,42,4],
    ['Distill Some Liquor',10,23,4],
    ['Manufacture Tokens',10,24,4],
    ['Get Cheating Deck',10,25,4],
    ['Overtake Phone Central',10,27,4],
    ['Repel the Yakuza',13,29,5],
    ['Disrupt Rival Smuggling Ring',15,30,5],
    ['Invade Tong-controlled Neighborhood',25,31,5],
    ['Sell Guns to the Russian Mob',25,32,5],
    ['Protect your City against a Rival Family',35,33,5],
    ['Assassinate a Political Figure',35,34,5],
    ['Exterminate a Rival Family',40,35,5],
    ['Obtain Compromising Photos',28,43,5],
    ['Frame a Rival Capo',26,44,5],
    ['Steal an Air Freight Delivery',32,45,6],
    ['Run a Biker Gang Out of Town',35,46,6],
    ['Flip a Snitch',25,47,6],
    ['Steal Bank Records',30,48,6],
    ['Loot the Police Impound Lot',60,49,6],
    ['Recruit a Rival Crew Member',30,50,6],
    ['Dodge an FBI Tail',20,51,6],
    ['Whack a Rival Crew Leader',28,52,6],
    ['Influence a Harbor Official',50,53,7],
    ['Move Stolen Merchandise',36,54,7],
    ['Snuff a Rat',44,55,7],
    ['Help a Fugitive Flee the Country',40,56,7],
    ['Dispose of a Body',25,57,7],
    ['Ransom a Businessman\'s Kids',60,58,7],
    ['Fix the Big Game',50,59,7],
    ['Steal an Arms Shipment',45,60,7],
    ['Extort a Corrupt Judge',24,61,8],
    ['Embezzle Funds Through a Phony Company',50,62,8],
    ['Break Into the Armory',50,63,8],
    ['Rip Off the Armenian Mob',50,64,8],
    ['Muscle in on a Triad Operation',45,65,8],
    ['Ambush a Rival at a Sit Down',55,66,8],
    ['Order a Hit on a Public Official',35,67,8],
    ['Take Over an Identity Theft Ring',36,68,8],
    ['"Settle" a Beef... Permanently',40,69,9],
    ['Buy Off a Federal Agent',35,70,9],
    ['Make a Deal with the Mexican Cartel',40,71,9],
    ['Blackmail the District Attorney',44,72,9],
    ['Shake Down a City Council Member',85,73,9],
    ['Make Arrangements for a Visiting Don',40,74,9],
    ['Take Control of a Casino',70,75,9],
    ['Travel to the Old Country',52,76,9]
  );

  var itemCost = new Array(
    ['Baseball Bat',300],
    ['Crowbar',700],
    ['Colt Pistol',1000],
    ['Sawed-off Shotgun',2000],
    ['Grenade',3000],
    ['Machine Pistol',5500],
    ['Hacksaw',10000],
    ['Tommy Gun',120000],
    ['Chain Gun',200000],
    ['Bullet Proof Vest',6000],
    ['Body Armor',16000],
    ['Motorcycle',15000],
    ['Delivery Truck',20000],
    ['Sedan',40000],
    ['Armored Sedan',60000],
    ['Getaway Cruiser',90000],
    ['Town Car',400000],
    ['Speed Boat',400000]
  );

  var requirementJob = new Array(
    ['Liquor', 'Distill Some Liquor'],
    ['Tokens', 'Manufacture Tokens'],
    ['Wiretap Device', 'Overtake Phone Central'],
    ['1 Wiretap Device', 'Overtake Phone Central'],
    ['Cards', 'Get Cheating Deck'],
    ['Untraceable Cell Phone', 'Rob an Electronics Store'],
    ['Concealable Camera', 'Rob an Electronics Store'],
    ['Computer Set-Up', 'Rob an Electronics Store'],
    ['Blackmail Photos', 'Obtain Compromising Photos'],
    ['Illegal Transaction Records', 'Steal Bank Records'],
    ['.22 Pistol', 'Beat Up Rival Gangster'],
    ['Revolver', 'Beat Up Rival Gangster'],
    ['.9mm Semi-Automatic', 'Rob a Pimp'],
    ['Butterfly Knife', 'Collect Protection Money'],
    ['Rough Up Dealers', 'Brass Knuckles'],
    ['Tactical Shotgun', 'Perform a Hit'],
    ['.45 Revolver', 'Take Out a Rogue Cop'],
    ['C4', 'Destroy Enemy Mob Hideout'],
    ['Stab- Proof Vest', 'Kill a Protected Snitch'],
    ['Automatic Rifle', 'Bust a Made Man Out of Prison'],
    ['Lucky Shamrock Medallion', 'Clip the Irish Mob\'s Local Enforcer'],
    ['Semi-Automatic Shotgun', 'Fight a Haitian Gang'],
    ['Firebomb', 'Steal a Tanker Truck'],
    ['Armored Truck', 'Smuggle Across the Border'],
    ['Grenade Launcher', 'Repel the Yakuza'],
    ['.50 Caliber Rifle', 'Disrupt Rival Smuggling Ring'],
    ['Armored Car', 'Invade Tong-Controlled Neighborhood'],
    ['RPG Launcher', 'Sell Guns to the Russian Mob'],
    ['Bodyguards', 'Protect your City against a Rival Family'],
    ['Night Vision Goggles', 'Assassinate a Political Figure'],
    ['Napalm', 'Exterminate a Rival Family'],
    ['Prop Plane', 'Steal an Air Freight Delivery'],
    ['Harley Davidson', 'Run a Biker Gang Out of Town'],
    ['Luxury Yacht', 'Influence a Harbor Official'],
    ['Porsche 911', 'Ransom a Businessman\'s Kids'],
    ['Bookie\'s Holdout Pistol', 'Fix the Big Game'],
    ['AR-15 Assault Rifle', 'Rip Off the Armenian Mob'],
    ['Falsified Documents', 'Take Over an Identity Theft Ring'],
    ['Federal Agent', 'Buy Off a Federal Agent'],
    ['Private Jet', 'Make a Deal with the Mexican Cartel'],
    ['Police Cruiser', 'Blackmail the District Attorney'],
    ['Armoured Limousine', 'Shake Down a City Council Member']
  );

  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,'');
  }
  String.prototype.ltrim = function() {
    return this.replace(/^\s+/,'');
  }
  String.prototype.rtrim = function() {
    return this.replace(/\s+$/,'');
  }

  Array.prototype.searchArray = function(searchStr,index) {
    // searches a multidimensional array
    // searchStr can be a regex
    var returnArray = false;
    for (i=0; i<this.length; i++) {
      if (typeof(searchStr) == 'function') {
        if (searchStr.test(this[i][index])) {
          if (!returnArray) { returnArray = [] }
          returnArray.push(i);
        }
      } else {
        if (this[i][index]===searchStr) {
          if (!returnArray) { returnArray = [] }
          returnArray.push(i);
        }
      }
    }
    return returnArray;
  }

  // Array.unique() - Remove duplicate values
  Array.prototype.unique = function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

  //Check if isRunning is not set and then initialise it if so
  if (GM_getValue('isRunning') === '') {
    GM_setValue('isRunning', true);
  }


  //store isRunning so we can access it from the event call
  var isRunningStore = makeElement('div', document.body, {'style':'display:none;', 'id':'isRunningStore'}).appendChild(document.createTextNode(GM_getValue('isRunning', false)));;

  document.addEventListener('DOMNodeInserted', nodeInserted, false);

  Autoplay = new Animate();
  Autoplay.running = GM_getValue('isRunning', false);
  DEBUG('setting document.location');
  Autoplay.fx = function(){document.location = 'http://apps.facebook.com/inthemafia/index.php'};

  var initialized = true;
  DEBUG('Completed initialize.');
}

function Animate() {
  this.TOUT = null;
  this.fx = null;
  this.delay = null;
}

Animate.prototype.pause = function() {
//  this part still doesn't seem to work
  window.clearTimeout(this.TOUT);
  GM_setValue('isRunning', false);
  alert('Pausing autoplayer...');
  addToLog('Autoplayer is paused...  (Stats can\'t track manual activity)');
  location.reload();
}

Animate.prototype.setTimeout = function(fx, delay) {
  this.fx = fx;
  this.delay = delay;
  this.TOUT = window.setTimeout(fx, delay);
}

Animate.prototype.start = function() {
  if (GM_getValue('isRunning', false) === true) {
    DEBUG('Loading another page in: '+this.delay/1000 + ' seconds');
    this.TOUT = this.setTimeout(this.fx, this.delay);
  } else {
    DEBUG('autoplayer paused not reloading');
  }
}

//create data uris for mini icon usage
var healthIcon = '<img src="' + 'data:image/gif,GIF89a%10%00%10%00%C4%1F%00%A9%00%13%8A%00%10%B6%00' +
                   '%15%AC%00%14%91%00%11%86%00%0F%FF%FF%FF%B5%00%15%97%00%11%92%00%11%A0%00%12%9D%' +
                   '00%12%8E%00%10%B2%00%15%B0%00%14%9B%00%12%B9%00%15%9A%00%12%94%00%11%B1%00%14%9' +
                   '8%00%12%AE%00%14%AB%00%14%8C%00%10%A4%00%13%B8%00%15%A6%00%13%A3%00%13%BB%00%15' +
                   '%BB%00%16%BC%00%16%00%00%00!%F9%04%01%00%00%1F%00%2C%00%00%00%00%10%00%10%00%00' +
                   "%05f%E0'%8Edi%1Ahj%92%86%C7e%82%B1%8E%06%24%1C%8D%3C%7F%06%EE%0C%3AV%CA0%A9X%00C" +
                   '%9D%A1%939%FC%00%9A%8DbAUB%0E%93%01%003%8DP%10%08%A5%A0Q%D9*%1E%08I%82%40P%3A-%9' +
                   'A3%22%C1%B8%04%02%CA%E1b%CEH%9E%22%12%0Cx%3B%3C%14%09%17%05A%2B%06%08%04%01%89%8' +
                   '4I%8A%84%2B!%00%3B' + '" />';

var bankIcon = '<img src="' + 'data:image/gif,GIF89a%10%00%10%00%D5%3F%00t%B7%93u%B4%3B%12%1B%12%D5%' +
                  'BC%053%7BK%D5%EA%B9%89%C3%95R%924S%9B%5CJsVg%A5p%F5%E4%01p%8D%5E%9C%D4%A5l%A8D%F6' +
                  '%DB%00(m%11%C7%C5%26%A9%BDs%B8%DA%8Ac%97%7B%98%A2%19l%AA%89V%87n%87%B7c%88%BD%93H' +
                  "x%60e%93h%AD%D6wEy%13'B%25%9C%CAl%3Cd%22%5B%8Fs%E2%F1%CF%A9%D4ob%5B%0F%EC%CC%03%9" +
                  '5%C2%5C%91%BDr%3F%8C%5Bz%C0%9Ap%B1%85P%7FfO%9Br%40SH%DE%DB%02%CA%C3%04%C6%BF%13%D' +
                  "5%C3%0FS%5C.Kv'%AB%B9%3C%CA%E5%A8c%8Eh%84%BBW%A4%CEl%A8%C8%7Fm%8D%0B%82%BANc%87(%" +
                  '9E%ABA%F2%CF%00%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%8' +
                  'C%C0%9FpH%2C%1A%8F%C8dQp%600%04JP%A0%26%FA%60x%1D%99%F1%10%98%8889%09%04%B2%A0%81' +
                  '%3CC%02%02%B33%F5%3A%10WD%F2%B9%9Df%9E%D5%8A%40%A8%0Ct%2Fs%5E%05%23%07%04!%88%2B0' +
                  '%0B%0F%15%0E8%05%05%1C%0E%0A6%09%14%14%170%0F%0B%09(%08%0E%26%01%08%0D%09%3F%02%1' +
                  'E%1A1%3E%0F%1B%16%16%2C%08%0A%0D%06PC%24%03%25%0A%00%BC%00%06%19hF%02-%14%00))%19' +
                  '%1BJ%A7%09%00*%B6%CB%D1IA%00%3B' + '" />';

var attackIcon = '<img src ="' + 'data:image/gif,GIF89a%0D%00%0D%00%D5%3F%00%A2Q%00%FF%CB4%FF%DD4%FF' +
                     '%CA%22%FD%AE%00%C9%87%00%EC%97%00%FF%E9%7C%FF%DEC%B5d%01%F8%AC%00%40%3C%2C%E5%' +
                     '8D%00%FF%BD%0AH%24%0D%E7%A3%00%88H%03%DD%8E%00%FF%CE%0EkD%0D%FF%C4%01%FF%BD%00' +
                     "1%2B%1C%5D6%0D%FF%CF%13%FC%B7%00%B5k%00c2%0A%FF%E6%86OK%2F'%1C%16%1B%18%19%FF%" +
                     'D3%25%A7%91%3B%D3%C2j%FF%DFb%A7%96%2C%FF%D4%13%FF%E1F%FF%B4%0E%F0%BAB%A7%83%0E' +
                     '%B5%A2%1C%F7%9C%00%FF%C6%0A%D1%9E%02%85W%0A%F0%DC%5C%A7%9BI%D3%B0X%B1w%08%FF%E' +
                     '2s%FF%ECv%F5%A7%00%84n%0Dc-%07%7Bh%0Dv.%02u%3F%0A%A2%60%02oJ%0DpY%0D%7Bk-%FF%F' +
                     'F%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%0D%00%0D%00%00%06w%C0%9F%B0%03%13%FE' +
                     '%16*%A3%92F%3A%BEpJ%E3%C1%E4%13%09z%C6%8E%14!%40%94lBKh%C6%E1%8C%40%12L%1A%DD%' +
                     'FA%A5%06%81%01%8BB%CF%14%20%1E%A1o%D0%A8%F8%2B%0F%3B%1FB%0B1%01%0D%19%89%0A%0F' +
                     "%05%3CG('55%04%045%11%1A%3B%1A.2%13%17%3C%06%06%0C%11%097%0E%0E%1BJ%2B%09%10%0" +
                     '9%00%0EQB%0C9%1F%17%AE%B0%16%09y%3F%3A%A8BA%00%3B' + '" />';

var defenseIcon = '<img src = "' + 'data:image/gif,GIF89a%0D%00%0D%00%D5%3F%00Qs%AC%7D%A6%EBEt%BAHk%A' +
                      "5%AC%C7%FC%244M%8B%AF%F1M%7D%C9W%8A%DC'%3BZ_%90%E0%5D%8E%DD-L%7CP%80%CC%18%1D%" +
                      '25%1B%232%3Bb%9E%3Fe%A1Zx%AFm%9A%E7f%85%BF9Ot%81%98%C2M%80%CEw%94%CDS%7F%C7h%8' +
                      '3%B7%C8%DA%FD%94%B6%F6c%80%B5%3F%5D%8F%D3%E2%FE1R%84%8E%A1%C4w%9F%E8m%8D%C7E%5' +
                      'D%889Ki%E3%EC%FE%BA%D1%FD%2CDi%A5%B0%C5%80%A1%E2U%87%D7_%7C%B2Z%89%D6cy%A2%A2%' +
                      'C0%F7%7B%92%BFNb%85Bd%9BBn%B0_%88%CB4%5D%9Bm%9B%E87_%9Ce%95%E4t%A0%ED%82%AA%F4' +
                      '%7B%A5%F0%88%AF%F8%AF%C9%FC%CD%DE%FE%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%0' +
                      '0%00%0D%00%0D%00%00%06x%C0%94%E9%E3%2B%1A%8B%04Lhs%EA9%9FN%95%C6B%E0%F0%AE%D8%' +
                      "EB%A8%03%7Bqt%E00%98%C2rq%0C%BB%B4z'%92Hb%06CnN%CF%E1%00%A4R%200%B1%F9%FD%134%" +
                      '00%15%0E8%86%87%86%0A%00%03%05%3F%1E-%0B%0A%92%0A%0B%19%032%3F%3F%0F%07%0D%2B%' +
                      '08%9F%0D%11%11%09%99%3F(3%02%07%17%02%10%10%0C%A5%99%097%B3%B3%0C%0E%B0%99%0F%' +
                      '0C5%20%8D%A5A%00%3B' + '" />';

var energyIcon = '<img src = "' + 'data:image/gif,GIF89a%0D%00%0D%00%D5%3F%00K%3E%20%F7%C7%1E%3D3%20%' +
                      'F7%AC%1E%F7%AA%1EhO%20%F7%C2%1E%F7%C0%1E%2F.!%F7%B1%1E%F7%B8%1EKD%20%F7%BD%1E%' +
                      'F7%C4%1E%F7%BB%1E%F7%A8%1E%F7%C5%1E%20%22!hY%20%F7%AE%1E%20%20!%2F0!%DA%9F%1E%' +
                      'A1%81%1F%F7%D6%1E%F7%E2%1E%F7%BA%1EZV%20%CC%98%1F%F7%C9%1E%F7%B7%1E%CC%97%1F%E' +
                      '9%C6%1E%BE%92%1F%F7%DB%1E%3D9%20%E9%9F%1E%85t%1F%F7%B3%1EZD%20ZO%20%AF%A1%1F%F' +
                      '7%CC%1E%F7%B4%1E%CC%B4%1F%DA%B4%1EhT%20%A1%92%1F%A1%96%1F%F7%CA%1E%F7%D4%1E%F7' +
                      '%AF%1E%DA%AA%1E%F7%B9%1E%F7%CF%1E%F7%A9%1E%F7%C8%1E%F7%BE%1E%F7%B6%1E%85%7D%1F' +
                      '%3D1%20hX%20K%3D%20%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%0D%00%0D%00%' +
                      '00%06%60%C0%9F%B00%20%DC%1E%0F%12O%C8%B4%24f%93%E2%89)t)t%2BS%A2%40%15%D2%18%0' +
                      'E%8D%82%03%00%F8%04%C2%5E%C3p8%80k%9E%0F%FA%D7%EA%04%20%EBC.Da.%16(18w%17%5DB%' +
                      '2566*%12%86%3F%08%182%20%23%8D%3F%2F%22%2C%08%94%15%19)%11%94%3F0%3B%9FB%1B%A3%' +
                      '3FA%00%3B' + '" />';

var staminaIcon = '<img src = "' + 'data:image/gif,GIF89a%10%00%10%00%D5%3F%00%D5%5Bl%99%99%9AEGF)))U' +
                      'yZ%AD%9F%9E%ECx%8A%D0%B1%B7%C7%C8%C7%BE%96%9C%16%16%16555%8C%8D%8D%A5px%93%92%' +
                      '94%DCjw%2B%15%17%7Bz~%07%06%06ttu%A3%A1%A7%BE%BF%BEvs%7B%B9%5Cd%E6%8C%9A%AE%81' +
                      '%87%B2%AD%AE%93%7C%84%82BI%A0%97%98%81%85%8B%AA%AE%AEecbmcdhij%93%8B%8CthkQ).r' +
                      'ov%DFJQ%EC%90%A1%9F%9F%A0%B2%89%91%E0i%7CNPP%EF%F0%F0TIL%E2S%5E%94%95%9A%E7Ud%' +
                      'D1%D1%D2%C7do%DDp%7C%80%80%80%84tw%BBw%83e%5Ee%A9%A7%AB%B3V%5C%F2n%80dV%5C%7FA' +
                      'G%80_%5C%00%00%00!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%89%C0' +
                      '%9FpH%2C%1A%8FC%89PPS%88%1C%81%40%8A!X%0CR%15%E1%00%F1!TZ2D%C4%E2%81E%26B%05%8' +
                      '9%40%18%15%3A%1D%0B%C5A%C9E%84%9BW%88%C5%40h4%26%03E%03%00%3B%09%02%20%3C.8%01' +
                      "%0AE%09'1%3E%22%0B%22%0A%03%13JC%034%06%00%04%97%03%0A%04%0E%9AB6%2B%06%0D%82%" +
                      '0B%02%2C%8EE%19%0F(*%B0%A6E7%0F%18%07%B7G%0D%173%BCHC%25%3D%1C%3A%C3C%10%CB%BD' +
                      '%C9%CEBA%00%3B' + '" />';

var experienceIcon = '<img src = "' + 'data:image/gif,GIF89a%10%00%10%00%E6r%00%00%01%01%00%40P%00%11' +
                       '%15%00%05%06%00%14%19%00%0D%10%7B%E5%FF%03%09%0B%00H%5B%00K%5E%00%19%20%00K%5' +
                       'D%00%2B4%05%0E%10%3F%D9%FFD%DA%FF%00%1B%22%00CT%00%2B5)%D7%FF%00y%97%00%5EuJ%' +
                       'DB%FF%11%D0%FF%00x%96%06%10%13%007E%04%C2%F2%00%84%A6%00%B2%DE%13%C4%F0%87%E6' +
                       '%FF%00%60x%16~%95%86%E7%FF%00%2F%3B(R%5C%00%BF%EF%00_w%00%8F%B3%25%3A%40S%92%' +
                       'A2%00%22*)%D4%FF%00%C6%F8%00%5Br%00%06%08%24%D3%FF%04%CE%FF%01%9B%C2%40%D9%FF' +
                       'y%E4%FF%00%C2%F2%03%05%05_%E1%FF9%D8%FF%00%11%161%D5%FF%5E%8F%9B%2Cv%88%00%0A' +
                       '%0C%00%0A%0D%00I%5B%00%08%0A%00f%7F%158%40%01%03%04G%CA%EA%00%A2%CB%00%3BI%00' +
                       'g%81%11DQ%0D%CF%FF%25%C4%E9!%3CB%00t%92%03%A3%CB.%D7%FF%18%D1%FF(%3B%40%1D.2%' +
                       '1CBK%15%3DG%1Bo%84%02%3AH%0E%D0%FFy%CC%E1%00n%8A%00z%99%178%40%0A7A%00b%7B%00' +
                       '4A%02%9F%C7I%DB%FF%00w%95%05%12%15%00e%7F%01%A0%C8%03%8D%B0%00%02%03%00%96%BD' +
                       ')%3B%40%00*5%1A%D1%FD%04%C1%F1%1B%CE%FBS%DC%FF%02%09%0B%08%D0%FF%1A%CB%F8%00%' +
                       '3CK%08%9D%C2%00%85%A8%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
                       '0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04' +
                       '%01%00%00r%00%2C%00%00%00%00%10%00%10%00%00%07%9A%80r%82%83r%0D%19%84%88%88%2' +
                       '4%3B%89%8Dr)CB%8E%845V%16T%93%83P%22%5Ec%89%60QJ(Of%3A3%0FnGYAZE%04%07S26%06%' +
                       "1F%06k9%2FM%13%1E%5D%15%05%82%23Lj7%0E%2BNH%1Be%20*%88%05K%2C%17U0%25'%088%8E" +
                       'pm4%1DDX%5C%8ElIiqW%18%14a%3C%8DRh%1C%01%0C%3EF_%1A%8D!1%01%02r%02%0B%40%26%0' +
                       '0%88db%12%F4%18%F4%E3M%0B%08%88%24lq%91%E8L%04%7F%83%14%0CpD%60b%20%00%3B' + '" />';

var energypackIcon = '<img src = "' + 'data:image/gif,GIF89a%18%00%18%00%E6%7F%00W*%00%EFz%00%F2%E9%CC' +
                        '%F5%C72%FD%F4%D7h6%00%86Q%02%F9%E2%92%C4%B7%9E%E7%BADvB%00%FB%E8%A9%F8%D7k%D2' +
                        '%9D%00%EFi%00%F3%BE%11%B0%89)%E3%D7%C3%9Dh%01%B1%95e%2F(%0Fa%5BG%FE%FA%EC%DB%' +
                        'AB%17%F6%D2%5D%EF%94%00%F3%C4-%D3%ACC%EF%87%00%D0%BF%AB%AD%8FM%0C%08%02%E7%C4' +
                        'Wr%5B%12%B1%7C%00%E5%BD7%8Fa!%F4%C1%1B%F6%D9x%DB%C4%8A%E6%D3%97%F4%C4%26%FC%E' +
                        'C%BB%F0%CBR%D5%BDp%A5r%01%A2w0%B8%84%02%DA%B9U%F5%DC%8D%C6x1%BC%89%00%E2%AD%0' +
                        '1%D9%A5%00%EE%B9%0D%DD%A8%00%F9%F8%F8%F5%CB%3F%F2%BF%15%25%14%00%ED%BE%22%D6%' +
                        'A2%00%F2%EE%EB%EB%B6%09th%3F%E3%C9x%E7%C9f%FC%F0%CA%CA%95%00%EF%C9K%A3n%04E%1' +
                        'D%00%FE%F8%E6%FD%FD%FD%FE%FB%F0%B5%80%00%EB%E6%E1%ABv%00%F0%C5A%F1%BC%10%E6%B' +
                        '1%04%C4%91%00%F5%F2%F0%EF_%00%A4r%0E72!%B4%81%0B%FF%FF%FF%EF%A4%00%B3%84%1A%D' +
                        'B%CC%B7%E8%B3%06%E2%B60%E5%DB%B7%ED%E2%C9%9En%1B%F9%F7%F6%DF%AD%0C%F1%CF_%ED%' +
                        'C0-%F0%A3%0C%B3%A5v%EB%C6M%C0%8D%00%F6%E1%9C%CB%9E%0FXJ%1D%DD%C0d%D5M%00%C2%8' +
                        '5%23%E3%B2%0F%EF%BA%00%E5%CF%86%BF%A7%8C%DD%D2%C9%B8%86%0C%EF%C8%00%8D%60%00%' +
                        'FE%F7%E1%F0%BE%1A%CF%A0%1F%A2%7C%00%EF%AC%00%E3%C0M%EB%D2%7F%E3%DA%D2%E1%B4!%' +
                        '00%00%00!%F9%04%01%00%00%7F%00%2C%00%00%00%00%18%00%18%00%00%07%FF%80%7F%82%8' +
                        '3%7F%1FU%40e(p%13%40U%1F%84%90%83%1F%15%11%16J%97%16H%04%0Bkj%8F%91%82%14%08%' +
                        '16%16%9B%18%039%26%0BCC%07%10%14%A0U%02IC%2Bn7%3D%B955%17k(%7C~%B0%84%14%02J1' +
                        "%3C53M%12%CC%CD-3%2CB%5B%3B%92%08J%07w7K%11W%DD%DE%DE'ANy%9F%15%04%04%03%3FD." +
                        '%DD%0ES%EFSl8%11%2F%09%26i%00%85%5D%16%0C%3A4Kq%AE%C8p%40%F0%1D%0E)%24%5E%841' +
                        '%C1%A5%85!%3B%04r%D8h%20AJ%92%00%01%1Cd%C4%91%E4%88%81%177V%98%11%B1%03%88%9D' +
                        '%05)%A0%CC%98%90D%06%07%8C%01%BA%25%99%E9%A5%C7%181%22%00x%B0%60%E2I%8D%16r%A' +
                        'Ed%E0%40%F4%25%C6%2BZ%E6%D4%B8%C3%60I%81%3D%160L%84p%A5M%86%ABC%89%5EA%60%84%' +
                        '08%14%1D%18D(%18a%87%C1%C4%13Wp%A8M%80%F5J%1C%23%0D%EC%A0%3C)Q%C4H%01%08%04%0' +
                        'E%F0%A0ADB%81%248%B0%60!%93dB%93%06%5B%9E%E8H%C1%A5%CE%91%10*T%A4%BB!%F6%8A%1' +
                        '3%3DW%C0x%10%D1%E3%C7%93%07%0F4%5C0%B0%83%02%03%15%18%FC%BD%E8%C0%E4%CD%15%1F' +
                        '.%ACt%FE%FC%A0%84%06%2B%05%3E%7CHs%00M%8A%1BM%7C%D0%B9%C2%C4%C5%8C%1B%9EA%3FH' +
                        '1%1A%C0%23%00%23%D0%60%00%DE%AD%CF%9737l%D0%AE%CD%A3%05%00j%85%EAl%88%91%E0L%' +
                        '92%08T%A2%D0%D0%0EZG%09%1E%B8%8F%7C%FA%B3%A3%C5%86%200%D2Di%B0%FE%81%FB%12)%C' +
                        '0W%80s%90%ECPG%160%08%01%82%13%1A%A4%90%C2%00%03%88f%04%00%04F%B2C%01%06%40%B' +
                        '0%01%08b%88Q%04%17xP%A1%00%00%F2%81%22%C8%07%3B%00P%80%02%06%B48%20%85%3B%CCg' +
                        'b!(%1EA%E1%111%CA8H%20%00%3B' + '" />';

var lootbagIcon = '<img src = "' + "data:image/gif,GIF89a%0F%00%10%00%F7%00%00%00%00%00%80%00%00%00%8" +
                      "0%00%80%80%00%00%00%80%80%00%80%00%80%80%80%80%80%C0%C0%C0%FF%00%00%00%FF%00%F" +
                      "F%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%0" +
                      "0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
                      "0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0" +
                      "0%00%00%00%00%00%00%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%00" +
                      "3%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%9" +
                      "9%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%" +
                      "00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%00" +
                      "33%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%F" +
                      "F3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3" +
                      "%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%" +
                      "00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%" +
                      "CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CC" +
                      "f%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993" +
                      "%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f" +
                      "%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%" +
                      "99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00" +
                      "%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%C" +
                      "Cf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00" +
                      "%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%F" +
                      "F%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF" +
                      "3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%" +
                      "FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%" +
                      "CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF%2C%00%00%00%00%0F%00%1" +
                      "0%00%00%08%D5%00%01%F0%A1%17%CD%5D%B4z%D0%E8ACH%90%1E%16P.%00%B8%90B%A8%CF%94%" +
                      "3B%13%F9%D8%D9%E7%0E%80G%8A%C7R5%D3%C6L%8A%9D%81%FB%3C2%01p'%8B%9Dl%A7%B4%00x%" +
                      "B8%A0%A3%C4%95%A2%5C%C5c%C2D%8A%26P%F5%ACy%F4%C8%CC%DF4%7F%A8%A4H%01eg%01%BD%A" +
                      "1R%FC%DD%A36-%1B%B3%3B%9A%FA%D0%AB7%F4%D5%B4%AF%AF%A4%A5%0A%85%85%CF%BE%A7%1E%" +
                      "9D%19%A5%D6%0C%153%3Fp%EC%2C%1C%8Ao%1AUX%A8%A6%F51%E9%94%EE%B4f%AF%98%11b%D6%8" +
                      "7%89%9Dz%0B%3C%8A%D2%F6%B5%D9%B4%BC%7B%EDDS%06%60J!Qn%03%B7%FD%C3%C4%85%B2hC%0" +
                      "1H%C9r%C7%8F%14-%7D%5E0%89v2t%E8%95%9D)%0FT%06%AD%B62V%D0%94%D1%D6%1D%10%00%3B" +
                      '" />';

var plussignIcon = '<img src = "' + "data:image/gif,GIF89a%10%00%10%00%B3%0F%00%ED%EB%EB%0CS%00i%AFf%" +
                      "A8%D0%A6%91%C5%8F%83%BC%80%03h%00%00%82%00%9D%C9%9AJ%A2G0%97-%00w%00%11%8E%12%" +
                      "5E%A9Z%FD%FC%FC%FF%FF%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%10%00%10%00%00%0" +
                      "4S%F0%C9I%AB%05.%3B%60%A9%1BH!8%DD%F4%85%0DY%3Eg%91%A8%14%A6%0D%84%F0j%1C%5B%1" +
                      "0%3CQ4%8C%83p%A1r%08%8E%C7%04c%C14%18%8A%8A(%23%B8p%1A%02%81%A2%F0%D0%C4z%B3%1" +
                      "2Y%C6%89%D5l%2C%8Eky%C5%FA%C2%3A%0E7%5B%7Cf%B3%23%00%3B" + '" />';

var mafiaHatIcon = '<img src="' + "data:image/gif,GIF89a%18%00%12%00%D5%3F%00%AC%AC%AC888%94%94%94" +
                      "%8B%8B%8B%5B%5B%5Brrr%7C%7D%7DKLL%AD'2%A2%A2%A2BBB%A8jp%C6%C6%C6%15%15%15M%2" +
                      "0%24%A5%A5%A5b48%24%23%23%9BFNM%0F%14%5EIJ%97fjlllfee%88-4%9F%9F%9F%86%86%86" +
                      "%99%99%99%82%82%82%89y%7B%07%07%07%B3%B3%B2%B6%B6%B6QQP%98%8B%8Cjjj%60%60%60" +
                      "UVV%3D%26'%8F%90%90%5BSSSTT%60bbMGH%9A%A3%A2noo%96%5B_%AF%AF%AFggg6%07%0B%B8" +
                      "KT101xuu%A8%A9%A9l%5E_o%17%1EGGG%98%7F%81%B6%20%2C%BF%BF%BF%A1%A7%A7%92%98%9" +
                      "8%9C%9C%9C%00%00%00!%F9%04%01%00%00%3F%00%2C%00%00%00%00%18%00%12%00%00%06%F" +
                      "F%C0%9Fp%F8%F3%18%8FH%23q)4%064%8FG%ED%B1%E1%94%22%0D%25%B3%D8(0%1E%1C%9AF%E" +
                      "0%03%80%3E%A3%88g%FBk%84%18%BE%02%81%D0%E2%08%12%2F%80%40%D1%D8z%1A%03%1Fr%2" +
                      "5*%1A%09%0F%02%06%24%25WYD%7F%0D%19%20%06b%1B%09%89%17!8%25%230%0AX%5C%0D%04" +
                      "%09%0C%0C%2F%0F%97%06-%24%9A%0A!%04%07*%17%01%1E%11%11%02%20%00%3B%20%2F%09'" +
                      "%06%16%24%04%AD%0A)%078%07!%0D%11%3E%BD%92%2F5%19%03%AA%17%24%07%0A%01%01%2B" +
                      "%25%9A0%11%05%00%19dy%0F%3E%BF%050%048%0133%0E(%C3-3%02%E2'%22R%09%1B%D3%05%" +
                      "17%25%EB3%26%26%84(q%C0%40%00%01%02N%F4p%B1%80%07%8B%1E%D3Z%A8(%A1%00%E0%04%" +
                      "13%FEHh%C0%C1%81%C3%00%01%15t%C8X%90%A3%03%0D%1B%14%20L%98%10%C3D%88b%19%08%" +
                      "04%B0%A0%CA%C0%00%17%08t%20%40%80%E1%C6%CAU%8B8R%04%20Q%C3%C2%9F%11%1CZ%10%8" +
                      "0a%A0%83%0B%09%180%40%80%40%01%1E%0E%05%1A%00%10X%D3%E6%C2%00%0D%99J%10P%A1B" +
                      "%18A%05%05%01%9C%98%B1%C4%C3%0C%0B%085%A0%83q%01F%01%0D%19%5EhP%C0uK%83%00%9" +
                      "CZ%14%18%3C%A2D%80%3EL%82%00%00%3B" + '" />';

var killedMobsterIcon = '<img src="' + "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%" +
                       "00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0" +
                       "B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01" +
                       "444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222" +
                       "222222222222222222222222222222222222222222%FF%C0%00%11%08%00(%00)%03%01%22%00" +
                       "%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%0" +
                       "0%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%" +
                       "03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%9" +
                       "1%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3AC" +
                       "DEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%" +
                       "99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7" +
                       "%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F" +
                       "4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%" +
                       "00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03" +
                       "%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14" +
                       "B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3" +
                       "ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%9" +
                       "7%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%" +
                       "C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4" +
                       "%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%F2%DDBy%D3P%95Ri" +
                       "%15F0%03%10%3A%0A%B4l%EFE%AC%12Gu%2C%B2%CAG%EEQX%B6%0A%86%CE%7D%00e%CFO%BC%3A" +
                       "%F3%8A%B7%EB%9DB_%5E%3F%90%ADx%2F%A2%D4M%D4%26%01%F6e%8AYZ%3F%3D%C8F%11%E18%0" +
                       "4%0E%08A%C8%3D)P%A7%17J%1A-%97%E4zY%96*%BA%C6%D6Jn%DC%F2%EA%FB%B1%88%F0B%1A%1" +
                       "9%A7%88H-%F9%91%A4%91%C7%9AOL%A1%23%E5%07%3D%0F%23%15%0F%D9.Z%19%24%8BPIJFe%D" +
                       "8%BEh%2C%A0%8C%91%B9%408%CEO%3D%01%A7%E8%B6%E2%5D%7BM%8C%F4%7B%B8%94%FF%00%DF" +
                       "b%B5%B4Y%FE%D8%86%5B%FB%B5%2B%0D%DAH%C6y%C0%26)%11%D6%607%1C%9C%AA%A0%C0%C9%E" +
                       "9%5B%7B(%2F%B2%BE%E3%8B%EBx%8F%F9%F9%2F%BD%9C%EC3Ng%8C4%CEAa%90%5B%DE%B6k9%AD" +
                       "%E1%8A%FBm%BC%CD4*%E3d%AC%9B%0B%0C%F5%2B%CE%0F%B5h%D7%91%9AEFQ%B2%B1%F7%9C!V%" +
                       "A5J5y%E4%DE%ABw~%86%3D%E4%26K%D9%00%0CK%10%A0%2FRH%03%8Cw%AD%3B%1D6%2BT%B9%B2" +
                       "%B7%F2%C4%F2*%A5%E4%CA7%2C%2B%B80%8Cc%25%DC%95%19%03'%82%07F5%BB%A3j%DE%17%D1" +
                       "%CF%DA%2F%B4%E7%BC%D4GM%90%96%D8y%EA%5D%82t%C7%DD%1F%ADhM%E2Kx-%AD%AEm4%A9%1B" +
                       "J%9AL%3A%8B%AD%82%16%E7t~Z(%00%ED%24%8F%9B%04%60%8E%87n%94qu%DCT)%D1n%C9j%EC%" +
                       "93%F4%3EC2%A7%0F%AE%D6n_n_%FAS3%2C%7C%3F%A8%3D%E6%9Fw%A2%E9%B7)s%0C%BB%9A%0B%" +
                       "F7H%99%8A%10%CB%26%D6%C7%CA%C3%82%06pT%F2r%0D%5C%9F%E1%D5%EC%3A%94%90%99%FC%B" +
                       "Bv%25%A1%10%40%F3%B2%C7%93%8D%E7%E5Pq%8C%E0%9AIu%DB%CD%3A%FE%C6%E1%AE%AC%97M%" +
                       "B9WU%96%C2%D4%A4%C9%1EJ%16%1Ef%5C%10I%20%02T%95%23%24f%B3%E7%FBM%D5%CD%D6%83%" +
                       "E2%0DBI%A4%F37%5B%DD%CF%3B%3A%24%98%E0%92O%FA%A9%069%ED%95n%9B%81%DB%97%1FQ%E" +
                       "A%E3%15%F7%BF%F28oEtl%B3%3E%81%A0i%F6%F2%1B%8DI%9A%F5c%CCqIw%1F%2F%81%80c%8F%" +
                       "2C%0EI%EAq%C7%A5cR%B6%8Buan'xa%10%EF%08d%86x%E5P%C4%12%01(%C7%04%85%3D%7D%0D%" +
                       "25pc%E9N%9C%A3%CF%3Ef%CF%BC%E0%F9)Q%ABemW%E4R%96%09%1E%E1%D8%26T%E3%07%23%D2%" +
                       "B6%B4E%B6%16Z%8D%BD%F5%D3%5B%A4%C2%20%40R%C6DV.%C1p%08%0F%C2%85-%81%F36H%EEQN" +
                       "%19%95X%C1A%25%A7%AF%F9%9DU%F8O%07%5E%AC%EBJr%BC%9BoU%D5%DF%F9JW%D3%CB%A8%5D%" +
                       "BC%EF%12%C6%08%0A%91)%CA%C6%80aP%7B%00%00%FDO%26%AE%FF%00i%A3%5B%DB%2C%DAE%9D" +
                       "%C4%F6%F0%88D%F3%BC%84%B2%82v%E5U%D4p%08%5EA%E1E%14U%FF%00j%D6%FEU%F8%FF%00%9" +
                       "9%8F%FA%9D%81%FEy%FD%F1%FF%00%E4H%E6%D5%2F.-%DA%D8%8Bxm%99%95%8CV%F6%F1%C4%AC" +
                       "FpN%D5%05%B1%93%D4%9E%B5Z%8A%2B%93%11%8A%96!%A7%24%95%BB%1E%CEW%94%D1%CBc(Qm%" +
                       "F3k%AD%BFD%8F%FF%D9" + '" />';

// reload logic
if (GM_getValue('autoClick', '') == 'checked') {
  var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
  Autoplay.delay = timeWait;
  Autoplay.start();
}

// Get the cash amount. If the element doesn't exist, then we haven't
// reached a Mafia Wars page and we'll have to reload.
var cash = document.getElementById( SCRIPT.appID+'_user_cash');
if (!cash) {
  if (document.body.innerHTML.indexOf('Error while loading page') != -1) {
    DEBUG('Error loading page.');
  } else {
    DEBUG('Cash element not found. Possible white out?');
  }
  // Start the reload timer.
  Autoplay.delay = 10000;
  Autoplay.start();
  // Stop the script. (The timer will still go off and reload.)
  return;
}
cash = cash.innerHTML.replace('$', '');
cash = cash.replace(/,/g, '');
cash = parseInt(cash);

// Get the mafia size and invites (if any).
var mafia = xpath('//div[@class=\'mafia_link\']/a');
var invites = mafia.snapshotItem(2);
mafia = parseInt(mafia.snapshotItem(1).innerHTML);
if (mafia < 1) {
  addToLog('BUG DETECTED: Unable to read mafia size.');
}
if (invites) {
  invites = invites.innerHTML.split('+')[1];
  if (invites) {
    invites = parseInt(invites);
    if (invites > 0) {
      // Accept the invites.
      addToLog('Accepting ' + invites + (invites > 1 ? ' invites.' : ' invite.'));
      window.location = 'http://apps.facebook.com/' + SCRIPT.name +
                        SCRIPT.controller + 'recruit' +
                        SCRIPT.action + 'accept' +
                        SCRIPT.user + 'all';
    }
  }
}

// Get the rest of the player's information.
var health = parseInt(document.getElementById( SCRIPT.appID+'_user_health').innerHTML);
var energy = parseInt(document.getElementById( SCRIPT.appID+'_user_energy').innerHTML);
var maxEnergy = parseInt(document.getElementById( SCRIPT.appID+'_user_max_energy').innerHTML);
var stamina = parseInt(document.getElementById( SCRIPT.appID+'_user_stamina').innerHTML);
var maxStamina = parseInt(document.getElementById( SCRIPT.appID+'_user_max_stamina').innerHTML);
var level = parseInt(document.getElementById( SCRIPT.appID+'_user_level').innerHTML);
var curExp = parseInt(document.getElementById( SCRIPT.appID+'_user_experience').innerHTML);
var lvlExp = parseInt(document.getElementById( SCRIPT.appID+'_exp_for_next_level').innerHTML);
var energyPack = (xpath('//span[@class=\'sexy_pack_use\' and contains(text(),\'Use Energy Pack\')]').snapshotLength > 0);
var statx = xpath('//a[@class=\'alert_number\' and contains(text(),\'+\')]');
var ptsToNextLevel = parseInt(lvlExp - curExp);
var staminaFloor = ((maxStamina * (1 - parseInt(GM_getValue('selectStaminaKeep', 0)) * .10)).toFixed(0) == 0) ? 1 : (maxStamina * (1 - parseInt(GM_getValue('selectStaminaKeep', 0)) * .10)).toFixed(0) - 1;
var autoMissionif = (GM_getValue('autoMission', '') == 'checked' && ((energy >= calcEnergyCost() && GM_getValue('waitForFull', '') != 'checked')  || (energy >= maxEnergy && GM_getValue('waitForFull', '') == 'checked')) && GM_getValue('isRunning', false) === true);
var autoFightRobif = ((GM_getValue('autoFight', '') == 'checked' || GM_getValue('autoRob', '') == 'checked') && (stamina > staminaFloor || (GM_getValue('allowStaminaToLevelUp', '') == 'checked' && stamina >= (ptsToNextLevel / (GM_getValue('totalExpInt', 0) / ((GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) + (GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0))))).toFixed(0)))&& health>28 && GM_getValue('isRunning', false) === true);
var autoStamBurnif = GM_getValue('allowStaminaToLevelUp', '') == 'checked' && stamina >= (ptsToNextLevel / (GM_getValue('totalExpInt', 0) / ((GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) + (GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0))))).toFixed(0);
var pUpdates = $x("//div[@class='update_item']");

if (GM_getValue('selectStaminaKeepOld', 0) != GM_getValue('selectStaminaKeep', 0) && (GM_getValue('autoFight', '') == 'checked' || GM_getValue('autoRob', '') == 'checked')) {
  GM_setValue('selectStaminaKeepOld', GM_getValue('selectStaminaKeep', 0));
  addToLog(staminaIcon + '<font style="color:#04B4AE;";> Stamina is set to keep above <strong>' + staminaFloor + '</strong> for auto-fight/rob </font>');
}

if (GM_getValue('allowStaminaToLevelUp')== 'checked' && GM_getValue('currentStamBurn') != GM_getValue('autoStamBurn')) {
   GM_setValue('currentStamBurn', GM_getValue('autoStamBurn'));
   addToLog('<font style="color:#009966;">Auto-burn stamina for level up is currently: <strong>' + GM_getValue('autoStamBurn') + '</strong></font>');
}

if ( statx.snapshotItem(0) != null ) {
  var stats = statx.snapshotItem(0).innerHTML.split('+')[1];
} else {
  var stats = 0;
}

if (GM_getValue('logOpen', '') == 'open') {
  showMafiaLogBox();
}

if (GM_getValue('currentLevel', 0) < level) {
  GM_setValue('currentLevel', level);
  addToLog(experienceIcon + '<font style="color:#00FFCC;"> Congratulations on reaching level <strong>' + level + '</strong></font>');
}


//autoPause reset
if (GM_getValue('autoPauseActivated', false) === true && GM_getValue('autoPauseBefore', '') == 'checked' && GM_getValue('autoPauselvlExp') < lvlExp) {
  GM_setValue('autoPauselvlExp', lvlExp);
  GM_setValue('autoPauseActivated', false);
}

// auto-repair
if (GM_getValue('autoRepair', '') == 'checked' && GM_getValue('isRunning', false) === true && GM_getValue('propertyDamage', 0) == 2 ) {
  if (GM_getValue('propertyDamageCost', 0) > cash) {
    withdrawFromBank(GM_getValue('propertyDamageCost', 0) - cash);
  } else {
    var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'property' + SCRIPT.action + 'repair_all';
    takeAction(link, 'repair');
    Autoplay.delay = delay;
    Autoplay.start();
  }

// auto-protect
} else if (GM_getValue('autoProtect', '') == 'checked' && GM_getValue('isRunning', false) === true && GM_getValue('propertyDamage', 0) == 1 ) {
  if (GM_getValue('propertyDamageCost', 0) > cash) {
    withdrawFromBank(GM_getValue('propertyDamageCost', 0) - cash);
  } else {
    var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'property' + SCRIPT.action + 'protect_all';
    takeAction(link, 'protect');
    Autoplay.delay = delay;
    Autoplay.start();
  }

// autoheal
} else if (GM_getValue('autoHeal', '') == 'checked' && health<GM_getValue('healthLevel', '') && GM_getValue('isRunning', false) === true) {
  var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'hospital' + SCRIPT.action + 'heal';
  takeAction(link,'heal');
  Autoplay.delay = delay;
  Autoplay.start();

// bank logic here
} else if (GM_getValue('autoBank', '') == 'checked' && cash>parseInt(GM_getValue('bankConfig', 100000))-1 && GM_getValue('isRunning', false) === true) {
  if (document.body.innerHTML.indexOf('title">The Bank') != -1) {
    bankClickDeposit();
  } else {
    window.location = 'http://apps.facebook.com/'+SCRIPT.name+SCRIPT.controller+'bank'+SCRIPT.action+'view'
    DEBUG('Entering the bank');
  }

// autostat
} else if (GM_getValue('autoStat', '') == 'checked' && stats>0 && GM_getValue('isRunning', false) === true &&
  (GM_getValue('autoStatAttack', '') == 'checked' ||
  GM_getValue('autoStatDefense', '') == 'checked' ||
  GM_getValue('autoStatHealth', '') == 'checked' ||
  GM_getValue('autoStatEnergy', '') == 'checked' ||
  (GM_getValue('autoStatStamina', '') == 'checked' && stats >= 2))) {

  DEBUG('stats available');

  switch (GM_getValue('autoStatAdd','')) {
    case 'attack':
      var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'stats' + SCRIPT.action + 'upgrade' + '&upgrade_key=attack';
      break;
    case 'defense':
      var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'stats' + SCRIPT.action + 'upgrade' + '&upgrade_key=defense';
      break;
    case 'health':
      var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'stats' + SCRIPT.action + 'upgrade' + '&upgrade_key=max_health';
      break;
    case 'energy':
      var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'stats' + SCRIPT.action + 'upgrade' + '&upgrade_key=max_energy';
      break;
    case 'stamina':
      var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'stats' + SCRIPT.action + 'upgrade' + '&upgrade_key=max_stamina';
    default:
      addToLog('This should never happen - select a stat to increment or disable auto-stat');
  }
  takeAction(link, 'stats');
  Autoplay.delay = delay;
  Autoplay.start();

//autoPause logic
} else if (GM_getValue('autoPause', '') == 'checked' && ((GM_getValue('autoPauseBefore', '') == 'checked' && GM_getValue('autoPauseExp', '') >= lvlExp - curExp && GM_getValue('autoPauseActivated', false) === false) || (GM_getValue('autoPauseAfter', '') == 'checked' && GM_getValue('autoPauselvlExp', '') < lvlExp)) && GM_getValue('isRunning', false) === true) {
  if (GM_getValue('autoPauseBefore', '') == 'checked') {
    addToLog('autoPause in effect.  Experience threshold reached.');
    GM_setValue('autoPauseActivated', true);
    Autoplay.pause();
  } else {
    addToLog('autoPause in effect.  Leveled up.');
    GM_setValue('autoPauselvlExp', lvlExp);
    Autoplay.pause();
  }

//Decide wether stamina or energy is higher in % and then do the according action on the fullest one
//  as to try to not waste any refill time.
//If they are both not ready to run then just move on and check each one like normal.
} else if (autoMissionif && autoFightRobif) {
  if((energy/maxEnergy) >= (stamina/maxStamina)) {
    autoMission();
  } else {
    autoFightRob();
  }

//autoMission logic
} else if (autoMissionif) {
  autoMission();

// autofight or autorob
} else if (autoFightRobif) {
  autoFightRob();

// auto-energypack
} else if (GM_getValue('autoEnergyPack', '') == 'checked' && GM_getValue('isRunning', false) === true && energy <= 1 && energyPack === true) {
  var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'index' + SCRIPT.action + 'use_and_energy_all';
  takeAction(link, 'energypack');
  Autoplay.delay = delay;
  Autoplay.start();

// auto-playerUpdates
} else if (pUpdates.length > 0 ) {
  DEBUG('Parsing Player Updates');
  for (i=pUpdates.length-1;i>=0;i--) {
    parsePlayerUpdates(pUpdates[i]);
  }
  var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'index' + SCRIPT.action + 'deletenews';
  takeAction(link,'deletenews');
  Autoplay.delay = delay;
  Autoplay.start();

//check for property damage, this way we are not adding any overhead, except on pages that we are not doing anything anyways.
} else if ((GM_getValue('autoProtect', '') == 'checked' || GM_getValue('autoProtect', '') == 'checked') && GM_getValue('propertyDamage', 0) == 0 && GM_getValue('isRunning', false) === true) {
  var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'property' + SCRIPT.action + 'view';
  takeAction(link, 'propDmgChk');
}

function autoMission() {
  var jobno = missions[GM_getValue('selectMission', 1)][2];
  var tabno = missions[GM_getValue('selectMission', 1)][3];
  DEBUG('switching tab to job tab');
  if (tabno < 6) {
    window.location = 'http://apps.facebook.com/'+SCRIPT.name+SCRIPT.controller+'job'+SCRIPT.action+'view'+'&tab='+tabno+'&barno=0';
  } else {
    window.location = 'http://apps.facebook.com/'+SCRIPT.name+SCRIPT.controller+'job'+SCRIPT.action+'view'+'&tab='+tabno+'&barno=1';
  }
  var link = 'http://apps.facebook.com/'+SCRIPT.name+SCRIPT.controller+'job'+SCRIPT.action+'dojob&job='+jobno+'&tab='+tabno;
  takeAction(link, 'job');
  Autoplay.delay = delay;
  Autoplay.start();
}

function autoFightRob() {
  var id = 0;

  if (autoStamBurnif) {
    GM_setValue('autoStamBurn', 'Running');
  } else {
    GM_setValue('autoStamBurn', 'Stopped');
  }

  // Get an opponent.
  if (GM_getValue('fightRandom', '') == 'checked') {
    id = findFightOpponent();
  }
  if (GM_getValue('rFightList', '') == 'checked') {
    id = parseInt(GM_getValue('fightList', ''));
  }

  if (id) {
    GM_setValue('fightOpponent', String(id));
    if (GM_getValue('autoRob', '') == 'checked') {
      // Rob the filthy animal
      DEBUG('Rob the filthy animal ' + id);
      var link = 'http://apps.facebook.com/'+ SCRIPT.name +
        SCRIPT.controller + 'racket' +
        SCRIPT.action + 'attack' +
        SCRIPT.opponent + id +
        '&property_id=' +
        parseInt(GM_getValue('propertyId', '')); // will only rob casinos...
      takeAction(link, 'rob');
      setFightOpponentRobbed();
      Autoplay.delay = delay;
      Autoplay.start();
    } else {
      // Attack!
      var link = 'http://apps.facebook.com/' + SCRIPT.name +
        SCRIPT.controller + 'fight' +
        SCRIPT.action + 'attack' +
        SCRIPT.opponent + id;
      takeAction(link, 'fight');
      Autoplay.delay = delay;
      Autoplay.start();
    }
  }
}

function bankClickDeposit() {
  var sform = xpath('//input[@value=\'Deposit\' and @type=\'submit\']');
  if(sform.snapshotItem(0) == null ) {
    window.setTimeout(bankClickDeposit,1000);
  } else {
    sform.snapshotItem(0).click();
    bankDepositCheck();
  }
}

function bankDepositCheck() {
  if ( xpath('//td[@class=\'message_body\' and contains(text(),\'was deposited\')]').snapshotItem(0) == null ) {
    window.setTimeout(bankDepositCheck,1000);
  } else {
    addToLog(bankIcon + '<span style="color:#885588;"> Deposited <span style="color:#52E259; font-weight:bold;">$'+makeCommaValue(cash-parseInt(cash*.1))+'</span> into bank</span>');
    Autoplay.delay = delay;
    Autoplay.start();
  }
}

function placeBounty () {
  var depositBox = xpath('//input[@name="amount"]');
  depositBox.snapshotItem(0).value = GM_getValue('bountyAmount',10000);
  var sform = xpath('//input[@type="submit"]');
  sform.snapshotItem(0).click();
  placeBountyCheck();
}

function placeBountyCheck () {
  if ( xpath('//td[@class=\'message_body\' and contains(text(),\'You just set a\')]').snapshotItem(0) != null ) {
    DEBUG('Bounty set successfully');
  } else {
    DEBUG('Bount not set');
  }
}

// Searches the fight table in the given element for new
// random targets. Returns a new opponent, or undefined.
function findNewFightOpponent(element) {
  // Use fight semantics?
  var fight = (GM_getValue('autoFight', '') == 'checked');
  if (!fight && GM_getValue('autoRob', '') != 'checked') {
    addToLog('BUG DETECTED: reached findNewFightOpponent() without fight or rob');
    return;
  }

  // Don't bother searching if we still have plenty.
  var newOpponents = getSavedList('fightListNew');
  var len = newOpponents.length;
  if (len >= 50) {
    return newOpponents[Math.floor(Math.random() * len)];
  }

  // Check for a fight table within the element.
  if (!element || element.innerHTML.indexOf('main_table fight_table') == -1) {
    return newOpponents[Math.floor(Math.random() * len)];
  }

  var opponents  = xpath('//a[contains(@href,\'opponent_id\') and not(contains(@href,\'property\'))]', element);
  var opponentMafiaMax = parseInt(GM_getValue('fightmafiaSize', '502'));
  var opponentLevelMax = parseInt(GM_getValue('fightLevel', '100'));
  // If the relative checkbox is checked, add the player's level.
  if (GM_getValue('fightLevelRelative', false)) {
    opponentLevelMax = opponentLevelMax + level;
  }

  // Make a blacklist of opponents.
  var avoidList = getSavedList('fightListAvoid');
  DEBUG('new=' + newOpponents);
  DEBUG('avoid=' + avoidList);
  var blacklist = newOpponents.concat(avoidList);
  if (!fight) {
    var robList = getSavedList('fightListRobbed');
    blacklist = blacklist.concat(robList);
    DEBUG('robbed=' + robList);
  } else if (GM_getValue('fightStealth', '') == 'checked' || newOpponents.length) {
    var activeList   = getSavedList('fightListActive');
    var inactiveList = getSavedList('fightListInactive');
    blacklist = blacklist.concat(activeList, inactiveList);
    DEBUG('inactive=' + inactiveList);
    DEBUG('active=' + activeList);
  }
  DEBUG('Looking for new opponents.');

  // Thanks Liquidor for the loop code
  // Examine each potential opponent in the displayed list.
  for (tmp = 0; tmp < opponents.snapshotLength; tmp++) {
    var row           = opponents.snapshotItem(tmp).parentNode.parentNode;
    var rowData       = row.getElementsByTagName('td');
    // We need this for robbing to go to the previous tr that contains the name and
    //   level, unlike in the fight list it is all on one line
    if(!fight) {
      var nameAndLevel = row.previousSibling;
      while ( nameAndLevel.nodeType != 1 ) {
        nameAndLevel = nameAndLevel.previousSibling;
      }
    } else {
      nameAndLevel = row;
    }
    var opponentMafia = rowData[1] ? parseInt(rowData[1].innerHTML) : 0;
    var opponentLevel = parseInt(nameAndLevel.innerHTML.split('Level ')[1]);
    var userTmp       = nameAndLevel.innerHTML.split('true;">');
    var username      = userTmp[1]? userTmp[1].split('</a>')[0] : '';

    if (opponentLevel && opponentLevel <= opponentLevelMax &&
        opponentMafia && opponentMafia <= opponentMafiaMax &&
        username && notFamily(username)) {
      // This opponent is acceptable. Save the ID (if new).
      var link = opponents.snapshotItem(tmp).toString();
      var id = parseInt(link.split(SCRIPT.opponent)[1]);

      if (id) {
        var idString = id.toString();

        if (blacklist.indexOf(idString) == -1) {
          newOpponents.push(idString);
          DEBUG('<span style="color:#BCD2EA;">'+'Found new opponent ' + username + ' (' + idString + ')'+ '</span>');
        }
      }
    }
  }
  if (newOpponents.length > len) {
    setSavedList('fightListNew', newOpponents);
  }

  return newOpponents[Math.floor(Math.random() * newOpponents.length)];
}

// Finds a fight opponent.
//
// Returns an opponent if one is found. Otherwise, nothing
// is returned and the fight page will soon be loaded.
function findFightOpponent() {
  // To be stealthy, we try to only attack inactive opponents.
  // If we have enough acceptable opponents, attack them randomly.
  // If not, try any new opponents first and move them into the
  // the appropriate list: active, inactive, or avoid.

  // Check for any new opponents.
  var opponent = findNewFightOpponent(document.body);
  var opponentList;
  var len;

  // For stealth mode fights, if we don't have a new opponent then
  // choose one of the inactive opponents we've already fought.
  if (!opponent &&
      GM_getValue('autoFight', '') == 'checked' &&
      GM_getValue('fightStealth', '') == 'checked') {
    opponentList = getSavedList('fightListInactive');
    len = opponentList.length;
    opponent = opponentList[Math.floor(Math.random() * len)];
  }

  if (!opponent) {
    // Go to the fight or rob page to find opponents.
    if (GM_getValue('autoRob', '') == 'checked') {
      addToLog('<span style="color:#BCD2EA;">'+ 'No opponents. Going to rob list.' + '</span>');
      Autoplay.fx = function(){document.location = 'http://apps.facebook.com/inthemafia/remote/html_server.php?&xw_controller=racket&xw_action=view'}
      Autoplay.delay = delay;
      Autoplay.start();
    } else {
      addToLog('<span style="color:#BCD2EA;">'+ 'No opponents. Going to fight list.' + '</span>');
      Autoplay.fx = function(){document.location = 'http://apps.facebook.com/inthemafia/remote/html_server.php?&xw_controller=fight&xw_action=view'}
      Autoplay.delay = delay;
      Autoplay.start();
    }
    return;
  }

  return opponent;
}

function setFightOpponentActive() {
  var opponent = GM_getValue('fightOpponent', '');
  if (!opponent) {
    return;
  }

  // Add the opponent to the active list.
  DEBUG('Marking opponent ' + opponent + ' active.');
  addSavedListItem('fightListActive', opponent, 10);

  // Remove the opponent from the other fight lists.
  removeSavedListItem('fightListInactive', opponent);
  removeSavedListItem('fightListNew', opponent);
  removeSavedListItem('fightListAvoid', opponent);
}

function setFightOpponentInactive() {
  var opponent = GM_getValue('fightOpponent', '');
  if (!opponent) {
    return;
  }

  // Add the opponent to the inactive list.
  DEBUG('Marking opponent ' + opponent + ' inactive.');
  addSavedListItem('fightListInactive', opponent, 10);

  // Remove the opponent from the other fight lists.
  removeSavedListItem('fightListActive', opponent);
  removeSavedListItem('fightListNew', opponent);
  removeSavedListItem('fightListAvoid', opponent);
}

function setFightOpponentRobbed() {
  var opponent = GM_getValue('fightOpponent', '');
  if (!opponent) {
    return;
  }

  // Add the opponent to the robbed list.
  DEBUG('Marking opponent ' + opponent + ' robbed.');
  addSavedListItem('fightListRobbed', opponent, 10);

  // Remove the opponent from the other fight lists.
  removeSavedListItem('fightListNew', opponent);
}

function setFightOpponentAvoid() {
  var opponent = GM_getValue('fightOpponent', '');
  if (!opponent) {
    return;
  }

  // Add the opponent to the avoid list.
  DEBUG('Marking opponent ' + opponent + ' avoid.');
  addSavedListItem('fightListAvoid', opponent, 50);

  // Remove the opponent from all other fight lists.
  removeSavedListItem('fightListActive', opponent);
  removeSavedListItem('fightListInactive', opponent);
  removeSavedListItem('fightListNew', opponent);
  removeSavedListItem('fightList', opponent);
}

function toggleSettings() {
  if (settingsOpen === false) {
    settingsOpen = true;
    if(!document.getElementById('settingsBoxBg') && !document.getElementById('settingsBox')) {
      //setup menu
      createMenu();
    } else {
      showSettingsBox();
    }
  } else {
    settingsOpen = false;
    if(document.getElementById('settingsBoxBg') && document.getElementById('settingsBox')) {
      hideSettingsBox();
    }
  }
}

function showSettingsBox() {
  var settingsBgDiv = document.getElementById('settingsBoxBg');
  var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
  settingsBgDiv.style.display = 'block';
  settingsBoxContainer.style.display = 'block';
}

function showMafiaLogBox() {
  if(!document.getElementById('mafiaLogBox')) {
    createLogBox();
  } else {
    var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
    mafiaLogBoxDiv.style.display = 'block';
  }
  GM_setValue('logOpen', 'open');
}

function hideSettingsBox() {
  if(document.getElementById('settingsBoxBg')) {
    var settingsBgDiv = document.getElementById('settingsBoxBg');
    var settingsBoxContainer = document.getElementById('GenDialogPopDialog');
    settingsBoxContainer.style.display = 'none';
    settingsBgDiv.style.display = 'none';
  }
}

function hideMafiaLogBox() {
  var mafiaLogBoxDiv = document.getElementById('mafiaLogBox');
  mafiaLogBoxDiv.style.display = 'none';
  GM_setValue('logOpen', 'closed');
}

function saveSettings() {
  if (document.getElementById('autoClick').checked === true) {
    GM_setValue('autoClick', 'checked');
  } else {
    GM_setValue('autoClick', 0);
  }

  if (document.getElementById('autoLog').checked === true) {
    GM_setValue('autoLog', 'checked');
  } else {
    GM_setValue('autoLog', 0);
  }

  if (document.getElementById('rideHitlist').checked === true) {
    GM_setValue('rideHitlist', 'checked');
  } else {
    GM_setValue('rideHitlist', 0);
  }

  if (document.getElementById('autoHitlist').checked === true) {
    GM_setValue('autoHitlist', 'checked');
  } else {
    GM_setValue('autoHitlist', 0);
  }

  if (document.getElementById('clanMember').checked === true) {
    GM_setValue('clanMember', 'checked');
  } else {
    GM_setValue('clanMember', 0);
  }

  if (document.getElementById('autoMission').checked === true) {
    GM_setValue('autoMission', 'checked');
  } else {
    GM_setValue('autoMission', 0);
  }

  if (document.getElementById('repeatJob').checked === true) {
    GM_setValue('repeatJob', 'checked');
  } else {
    GM_setValue('repeatJob', 0);
  }

  if (document.getElementById('autoBank').checked === true) {
    GM_setValue('autoBank', 'checked');
  } else {
    GM_setValue('autoBank', 0);
  }

  if (document.getElementById('autoHeal').checked === true) {
    GM_setValue('autoHeal', 'checked');
  } else {
    GM_setValue('autoHeal', 0);
  }

  if (document.getElementById('autoStat').checked === true) {
    GM_setValue('autoStat', 'checked');
  } else {
    GM_setValue('autoStat', 0);
  }

  if (document.getElementById('autoStatAttack').checked === true) {
    GM_setValue('autoStatAttack', 'checked');
    GM_setValue('autoStatAdd', 'attack');
  } else {
    GM_setValue('autoStatAttack', 0);
  }

  if (document.getElementById('autoStatDefense').checked === true) {
    GM_setValue('autoStatDefense', 'checked');
    GM_setValue('autoStatAdd', 'defense');
  } else {
    GM_setValue('autoStatDefense', 0);
  }

  if (document.getElementById('autoStatHealth').checked === true) {
    GM_setValue('autoStatHealth', 'checked');
    GM_setValue('autoStatAdd', 'health');
  } else {
    GM_setValue('autoStatHealth', 0);
  }

  if (document.getElementById('autoStatEnergy').checked === true) {
    GM_setValue('autoStatEnergy', 'checked');
    GM_setValue('autoStatAdd', 'energy');
   } else {
    GM_setValue('autoStatEnergy', 0);
  }

  if (document.getElementById('autoStatStamina').checked === true) {
    GM_setValue('autoStatStamina', 'checked');
    GM_setValue('autoStatAdd', 'stamina');
  } else {
    GM_setValue('autoStatStamina', 0);
  }

  if(document.getElementById('autoRepair').checked === true ) {
    GM_setValue('autoRepair', 'checked');
  } else { GM_setValue('autoRepair', 0); }

  if(document.getElementById('autoProtect').checked === true ) {
    GM_setValue('autoProtect', 'checked');
  } else { GM_setValue('autoProtect', 0); }

  if(document.getElementById('autoEnergyPack').checked === true ) {
    GM_setValue('autoEnergyPack', 'checked');
  } else { GM_setValue('autoEnergyPack', 0); }

  if (document.getElementById('autoPause').checked === true) {
    GM_setValue('autoPause', 'checked');
  } else {
    GM_setValue('autoPause', 0);
  }

  if (document.getElementById('autoPauseBefore').checked === true) {
    GM_setValue('autoPauseBefore', 'checked');
    GM_setValue('autoPauselvlExp', lvlExp);
    GM_setValue('autoPauseActivated', false);
  } else {
    GM_setValue('autoPauseBefore', 0);
  }

  if (document.getElementById('autoPauseAfter').checked === true) {
    GM_setValue('autoPauseAfter', 'checked');
    GM_setValue('autoPauselvlExp', lvlExp);
  } else {
    GM_setValue('autoPauseAfter', 0);
  }

  if (document.getElementById('waitForFull').checked === true) {
    GM_setValue('waitForFull', 'checked');
  } else {
    GM_setValue('waitForFull', 0);
  }

  //two stamina burners won't work so autofight will take priority
  if (document.getElementById('autoRob').checked === true ) {
    GM_setValue('autoRob', 'checked');
  } else {
    GM_setValue('autoRob', 0);
  }

  if (document.getElementById('autoFight').checked === true) {
    GM_setValue('autoFight', 'checked');
    GM_setValue('autoRob', 0);
  } else {
    GM_setValue('autoFight', 0);
  }

  if (document.getElementById('fightRandom').checked === true) {
    GM_setValue('fightRandom', 'checked');
  } else {
    GM_setValue('fightRandom', 0);
  }

  if (document.getElementById('fightStealth').checked === true) {
    GM_setValue('fightStealth', 'checked');
  } else {
    GM_setValue('fightStealth', 0);
  }

  if (document.getElementById('fightLevelRelative').checked === true) {
    GM_setValue('fightLevelRelative', 'checked');
  } else {
    GM_setValue('fightLevelRelative', 0);
  }

  if (document.getElementById('rFightList').checked === true) {
    GM_setValue('rFightList', 'checked');
  } else {
    GM_setValue('rFightList', 0);
  }

  if (document.getElementById('allowStaminaToLevelUp').checked === true) {
    GM_setValue('allowStaminaToLevelUp', 'checked');
  } else {
    GM_setValue('allowStaminaToLevelUp', 0);
  }

  GM_setValue('clanName', document.getElementById('clanName').value);
  GM_setValue('selectMission', document.getElementById('selectMission').selectedIndex );
  GM_setValue('bankConfig', document.getElementById('bankConfig').value);
  GM_setValue('r1', document.getElementById('r1').value);
  GM_setValue('r2', document.getElementById('r2').value);
  GM_setValue('fightList', document.getElementById('fightList').value);
  GM_setValue('propertyId', '12');
  GM_setValue('healthLevel', document.getElementById('healthLevel').value);
  GM_setValue('fightLevel', document.getElementById('fightLevel').value);
  GM_setValue('fightmafiaSize', document.getElementById('fightmafiaSize').value);
  GM_setValue('selectEnergyBonus', document.getElementById('selectEnergyBonus').selectedIndex );
  GM_setValue('selectStaminaKeep', document.getElementById('selectStaminaKeep').selectedIndex );
  GM_setValue('autoPauseExp', document.getElementById('autoPauseExp').value);
  GM_setValue('autoLogLength', document.getElementById('autoLogLength').value);
  GM_setValue('bountyAmount', document.getElementById('bountyAmount').value);

  // Clear any new random opponents.
  setSavedList('fightListNew', []);
  setSavedList('jobsToDo', []);
  setSavedList('itemList', []);

  alert('settings saved');

  // Reload the main page.
  location.reload();
}

function unPause() {
  if (GM_getValue('isRunning', false) === false) {
    GM_setValue('isRunning', true);
    addToLog('Autoplayer resuming...');
  }
  Autoplay.delay = 150;
  Autoplay.start();
  location.reload();
}

function calcEnergyCost() {
  if (missions[GM_getValue('selectMission', 1)][1] > 5) {
    return Math.floor(missions[GM_getValue('selectMission', 1)][1] * (1 - GM_getValue('selectEnergyBonus',0)/100));
  } else {
    return missions[GM_getValue('selectMission', 1)][1];
  }
}

function notFamily(username) {
  if (GM_getValue('clanMember', '') == 'checked') {
    var clans = GM_getValue('clanName', '').split('\n');
    for (var i=0;i<clans.length;i++) {
      if (clans[i] && username.indexOf(clans[i]) != -1) {
        return false;
      }
    }
  }
  return true;
}

function addToLog(line) {
  if (GM_getValue('autoLog', '') == 'checked') {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    if (hours > 12) {
      hours = hours - 12;
      var ampm = 'PM';
    } else {
      var ampm = 'AM';
    }
    if (hours == 0) {
      hours = 12;
    }
    var timestamp = '<span style="color:#666666; font-size: 11px">' + currentTime.toDateString() + ' ' +
      hours + ':' +
      (currentTime.getMinutes() < 10 ? 0 : '') +
      currentTime.getMinutes() + ':' +
      (currentTime.getSeconds() < 10 ? 0 : '') +
      currentTime.getSeconds() + ' ' +
      ampm + '</span><br/>';
    var lineToAdd = '<div class="logEvent">' + timestamp + line + '</div>';
    var itemLog = document.createElement('div');
    itemLog.innerHTML = lineToAdd + GM_getValue('itemLog', '');
    var itemLogForm = xpath('//div[@class=\'logEvent\']', itemLog);
    for (var i = itemLogForm.snapshotLength - 1; i >= GM_getValue('autoLogLength', 300); i--) {
      itemLog.removeChild(itemLogForm.snapshotItem(i));
    }
    //make sure log is cleaned when this new code is run, so we can actually detect the log length
    if ( itemLogForm.snapshotLength == 0 ) {
      itemLog.innerHTML = '';
    }
    GM_setValue('itemLog', itemLog.innerHTML);
    if (!debug && document.getElementById('logBox')) {
      var logBoxVar = document.getElementById('logBox');
        logBoxVar.innerHTML = itemLog.innerHTML;
    }
  }
}

function updateLogStats() {
  var fightCount = document.getElementById('fightCount');
  if (!fightCount) return;
    fightCount.firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0));

  document.getElementById('fightWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightWinCountInt', 0));

  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('fightWinPct').firstChild.nodeValue =  (isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%';

  document.getElementById('fightLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('fightLossCountInt', 0));

  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1)
    document.getElementById('fightLossPct').firstChild.nodeValue =  (isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%';

  document.getElementById('robCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0));

  document.getElementById('robWinCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robWinCountInt', 0));

  var robWinPct = (GM_getValue('robWinCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('robWinPct').firstChild.nodeValue =  (isNaN(robWinPct)) ? '0.0%' : robWinPct + '%';

  document.getElementById('robLossCount').firstChild.nodeValue = makeCommaValue(GM_getValue('robLossCountInt', 0));

  var robLossPct = (GM_getValue('robLossCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    document.getElementById('robLossPct').firstChild.nodeValue =  (isNaN(robLossPct)) ? '0.0%' : robLossPct + '%';

  document.getElementById('totalWinDollars').firstChild.nodeValue = '$' + makeCommaValue(GM_getValue('totalWinDollarsInt', 0));  //Accomodates up to $999,999,999,999

  document.getElementById('totalLossDollars').firstChild.nodeValue = '$' + makeCommaValue(GM_getValue('totalLossDollarsInt', 0));

  document.getElementById('totalExp').firstChild.nodeValue = makeCommaValue(GM_getValue('totalExpInt', 0));

  var expRate = (GM_getValue('totalExpInt', 0) / ((GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) + (GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)))).toFixed(2);
    document.getElementById('expRate').firstChild.nodeValue = (isNaN(expRate)) ? 0 : expRate;

  document.getElementById('expToNext').firstChild.nodeValue = makeCommaValue(ptsToNextLevel);

  var stamToNext = (ptsToNextLevel / (GM_getValue('totalExpInt', 0) / ((GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) + (GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0))))).toFixed(0);
    document.getElementById('stamToNext').firstChild.nodeValue = (isNaN(stamToNext)) ? 0 : stamToNext;
}

function debugOnOff() {
  if (GM_getValue('enableDebug') == 'checked') {
    GM_setValue('enableDebug', 0);
    debug = false;
    addToLog('Debug Logging disabled');
    GM_setValue('debugSettingsDump', 'false');
    GM_setValue('autoLog', GM_getValue('priorLogSetting'));
  } else {
    GM_setValue('enableDebug', 'checked');
    debug = true;
    GM_setValue('priorLogSetting', GM_getValue('autoLog'));
    GM_setValue('autoLog', 'checked');
    addToLog('Debug Logging enabled');
    if (GM_getValue('debugSettingsDump') != 'true') {
      debugDumpSettings();
      GM_setValue('debugSettingsDump', 'true');
    }
  }
  location.reload();
}

function DEBUG(line, level) {
  var level = (level == null) ? 0 : level;
  if (debug) {
    addToLog(line);
    GM_log(line, level);
  }
}

function makeCommaValue(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

// Save an array of strings. The strings must not contain "\n".
function setSavedList(listName, list) {
  GM_setValue(listName, list.join('\n'));
}

// Get an array of strings that was saved with setSavedList().
function getSavedList(listName) {
  var savedList = GM_getValue(listName, '');
  return savedList? savedList.split('\n') : [];
}

// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the first item in the list is removed.
function addSavedListItem(listName, item, max) {
  var savedList = getSavedList(listName);

  // Only add if it isn't already there.
  if (savedList.indexOf(item) != -1) {
    return;
  }

  savedList.push(item);
  if (max > 0) {
    while (max < savedList.length) {
      var item = savedList.shift();
      DEBUG('Removing ' + item + ' from ' + listName);
    }
  }
  setSavedList(listName, savedList);
}

// Remove an item from a list saved with setSavedList().
function removeSavedListItem(listName, item) {
  var savedList = getSavedList(listName);
  var idx = savedList.indexOf(item);
  if (idx != -1) {
    savedList.splice(idx, 1);
    setSavedList(listName, savedList);
  }
}

function CycleFightList() {
  // Move the first opponent to the end of the list.
  var opponents = GM_getValue('fightList', '').split('\n');
  var first = opponents.shift();
  if (first) {
    opponents.push(first);
  }
  GM_setValue('fightList', opponents.join('\n'));
}

function CyclePropertyList() {
  DEBUG('CyclePropertyList(): '+ GM_getValue('propertyId', ''));
  if (GM_getValue('propertyId') <= 6) {
    CycleRobList();
    var i = 12; //back to casinos
  } else {
    var i = GM_getValue('propertyId') - 1;
  }
  GM_setValue('propertyId', i);
}

function clearLog() {
  GM_setValue('itemLog', '');

  //reset the log box
  var logBox = document.getElementById('logBox');
    logBox.innerHTML = '';
}

function clearSettings() {
  if(typeof GM_listValues == 'function' && typeof GM_deleteValue == 'function') {
    var values = GM_listValues();
    for (var i in values) {
      GM_deleteValue(i);
    }
  } else {
    alert('Error! In order to do this you need at least GreaseMonkey version: 0.8.20090123.1, please upgrade and try again.');
  }

  clearLog();
  clearStats();
}

function clearStats() {
  //reset log statistics
  GM_setValue('fightWinCountInt', 0);

  GM_setValue('fightLossCountInt', 0);

  GM_setValue('robWinCountInt', 0);

  GM_setValue('robLossCountInt', 0);

  GM_setValue('totalExpInt', 0);

  GM_setValue('totalWinDollarsInt', 0);

  GM_setValue('totalLossDollarsInt', 0);

  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp',0);

  updateLogStats();
}

function clearHitStats () {
  GM_setValue('lastHitXp', 0);
  GM_setValue('totalHits', 0);
  GM_setValue('totalXp', 0);
  GM_setValue('currentHitXp',0);
}

function maxLevelCheck() {
  //if the relative box is checked don't bug about the level entered being lower then the players level
  if (level > document.getElementById('fightLevel').value && document.getElementById('fightLevelRelative').checked === false) {
    alert('Max level must be higher than your current level');
    document.getElementById('fightLevel').focus();
  }
}

function minBankCheck() {
  //don't allow zero value in autobank setting.
  if (document.getElementById('bankConfig').value < 1) {
    alert('Minimum auto-bank amount must be 1 or higher');
    document.getElementById('bankConfig').focus();
  }
}

//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
  try {
    if (!GM_getValue) {
      return;
    }
    GM_xmlhttpRequest({
      method: 'GET',
      url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
      onload: function(result) {
        if (result.status != 200) {
          return;
        }
        if (!result.responseText.match(/@version\s+([\d.]+)/)) {
          return;
        }
        var theOtherVersion = RegExp.$1;
        if (theOtherVersion == SCRIPT.version) {
          alert('you have the latest version' + ' (v ' + SCRIPT.version + ') !');
          return;
        } else if (theOtherVersion < SCRIPT.version) {
          alert('Beta version' + ' (v ' + SCRIPT.version + ') installed ?!');
          return;
        } else {
          if (window.confirm('new version ' + ' (v ' + theOtherVersion + ') available!\n\n' + 'Do you want to update?' + '\n')) {
            window.location.href = SCRIPT.url;
          }
        }
      }
    });
  } catch (ex) {
    DEBUG(ex);
  }
}

function takeAction(link,action) {
  GM_setValue('actionType',action);
  DEBUG('action set to: '+ action);
  GM_xmlhttpRequest({ method: 'GET',
    url: link,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    onload: function(responseDetails) { logResponse(responseDetails, action); },
    onerror: function(responseDetails) { addToLog('error status '+ responseDetails.status); }
  });
}

function withdrawFromBank(withdrawcash) {
  if (document.body.innerHTML.indexOf('title">The Bank') != -1) {
    GM_setValue('withdrawcash', withdrawcash);
    bankClickWithdraw();
  } else {
    window.location = 'http://apps.facebook.com/'+SCRIPT.name+SCRIPT.controller+'bank'+SCRIPT.action+'view'
    DEBUG('Entering the bank');
  }
}

function bankClickWithdraw() {
  DEBUG('Withdrawing:'+GM_getValue('withdrawcash'));
  var sform = xpath('//input[@value=\'Withdraw\' and @type=\'submit\']');
  if(sform.snapshotItem(0) == null ) {
    DEBUG('sform null');
    window.setTimeout(bankClickWithdraw,1000);
  } else {
    DEBUG('setting amount to take out');
    xpath('//form[@id=\''+SCRIPT.appID+'_bank_withdraw\']/table/tbody/tr/td/input[@name=\'amount\']').snapshotItem(0).value = GM_getValue('withdrawcash');
    sform.snapshotItem(0).click();
    bankWithdrawCheck();
  }
}

function bankWithdrawCheck() {
  if ( xpath('//td[@class=\'message_body\' and contains(text(),\'You withdrew\')]').snapshotItem(0) == null ) {
    window.setTimeout(bankWithdrawCheck,1000);
  } else {
    addToLog('<span style="color:#885588;">Withdrew <span style="color:#52E259; font-weight:bold;">$'+makeCommaValue(GM_getValue('withdrawcash'))+'</span> from bank</span>');
    Autoplay.delay = delay;
    Autoplay.start();
  }
}

function logResponse (responseDetails, action) {
//  DEBUG('logResponse: status='+ responseDetails.status);
//  DEBUG('logResponse: statusText='+ responseDetails.statusText);
//  DEBUG('logResponse: responseHeaders='+ responseDetails.responseHeaders);
//  DEBUG('logResponse: responseText='+ responseDetails.responseText);

  // Check for error pages.
  if (responseDetails.responseText.indexOf('Error while loading page') != -1) {
    DEBUG('Error loading response page.');
    return;
  }
  if (responseDetails.responseText.indexOf('request was not processed') != -1) {
    addToLog('Request was not processed.');
    return;
  }
  if (responseDetails.responseText.indexOf('Sign up and use Mafia Wars') != -1) {
    addToLog('<span style="color:#EC2D2D">WARNING:</span> Reached the Mafia Wars login page.');
    addToLog('<span style="color:#EC2D2D">Please adjust your browser\'s settings to allow third-party cookies.</span>');
    addToLog('<span style="color:#EC2D2D">Or is this Facebook user logged in on another computer?</span>');
    return;
  }

  var doc = document.createElement('div');
  doc.innerHTML = responseDetails.responseText;
  var results = xpath('//table[@class=\'messages\']', doc);
  var messagebox = results.snapshotItem(0);
  if (!messagebox && action != 'propDmgChk') {
    DEBUG('logResponse: responseText='+ responseDetails.responseText);
    DEBUG('Unexpected response page: no message box found!');
    return;
  }
  var xw_time = doc.innerHTML.match(/xw_time=[^&]*/i);
  var xw_exp_sig = doc.innerHTML.match(/xw_exp_sig=[^&]*/i);

  switch (action) {
    case 'fight':   //fight
      if (messagebox.innerHTML.indexOf('fought against') != -1) {
        // First, look for any new opponents in the displayed list.
        // NOTE: This is at the top because putting it lower would risk
        //       it not getting called at all if an error occurs. This
        //       can lead to fighting the same opponents over and over.
        if (GM_getValue('fightRandom', '') == 'checked') {
          findNewFightOpponent(doc);
        }

        var user = messagebox.innerHTML.split('href="')[1];
        if (user) {
          user = user.split('"')[0];
        }
        var username = messagebox.innerHTML.split('true;">')[1];
        if (username) {
          username = username.split('</a>')[0];
        }

        // If fighting from the user-specified list, cycle it.
        if (GM_getValue('rFightList', '') == 'checked') {
          CycleFightList();
        }

        // Determine whether the opponent is alive and may see future attacks.
        if (messagebox.innerHTML.indexOf('Attack Again') != -1) {
          setFightOpponentActive();
        } else {
          setFightOpponentInactive();
        }

        if (messagebox.innerHTML.indexOf('WON') > 0 && messagebox.innerHTML.indexOf('$') > 0) {
          // The fight was won.
          user = '<a style="color:#FFD927" href="'+user+'">'+username+'</a>';
          var cost = parseInt(messagebox.innerHTML.split('$')[1].replace(/,/g, ''));
          var experience = parseInt(messagebox.innerHTML.match(/\d+ experience points/g));
          var result = 'Fought ' + user + '<span style="color:#52E259; font-weight:bold;">' +
                       ' WON $' + makeCommaValue(cost) + '</span>' + ' and ' +
                       '<span style="color:#52E259; font-weight:bold;">' + experience + ' experience</span>';

          // Check for a lucky win.
          if (messagebox.innerHTML.indexOf('against all odds') != -1) {
            result += '<span style="color:#EC2D2D;">' + ' (against all odds)' + '</span>';
            setFightOpponentAvoid();
          }

          addToLog(result);

          GM_setValue('fightWinCountInt', (GM_getValue('fightWinCountInt', 0) + 1));
          GM_setValue('totalExpInt', (GM_getValue('totalExpInt', 0) + parseInt(experience)));
          GM_setValue('totalWinDollarsInt', (GM_getValue('totalWinDollarsInt', 0) + cost));
        } else {
          // The fight was lost.
          user = '<a style="color:#FFD927" href="'+user+'">'+username+'</a>';
          var cost = messagebox.innerHTML.split('$')[1];
          cost = cost.replace(/,/g, '');
          var result = 'Fought ' + user + '<span style="color:#EC2D2D; font-weight:bold;">' + ' LOST $' + makeCommaValue(parseInt(cost) + '</span>');

          GM_setValue('fightLossCountInt', (GM_getValue('fightLossCountInt', 0) + 1));
          GM_setValue('totalLossDollarsInt', (GM_getValue('totalLossDollarsInt', 0) + parseInt(cost)));

          // Check for a critical hit.
          if (messagebox.innerHTML.indexOf('critical hit') != -1) {
            if (messagebox.innerHTML.indexOf('Top Mafia Bodyguard') != -1) {
              result += '<span style="color:#EC2D2D;">' + ' (bodyguard critical hit)' + '</span>';
            } else {
              result += '<span style="color:#EC2D2D;">' + ' (critical hit)' + '</span>';
            }
          } else {
            // Don't fight this opponent again.
            result += ' Too strong! Avoiding.';
            setFightOpponentAvoid();
          }

          addToLog(result);
        }

        // Check for any fatalities.
        if (messagebox.innerHTML.indexOf('took out your opponent') != -1) {
          addToLog(killedMobsterIcon + ' You <span style="color:#EC2D2D;">' + 'KILLED' + '</span> ' + user);
        }
        // FIXME: This search string needs to be verified. Delete this
        //        comment if it is working.
        if (messagebox.innerHTML.indexOf('You were snuffed') != -1) {
          addToLog('You <span style="color:#EC2D2D;">' + 'DIED' + '</span> in the fight.');
        }

        // Look for any loot.
        var loot = messagebox.innerHTML.split('found a ')[1];
        if (loot) {
          addToLog(lootbagIcon + '<span style="color:#FF6633;">'+' Found '+ loot.split(' while fighting ')[0] + '</span>');
        }

        // Update fight log tracking statistics.
        updateLogStats();
      } else if (messagebox.innerHTML.indexOf('too weak to fight') != -1) {
        addToLog('<span style="color:#FF9999;">' + 'Too weak to fight.'+ '</span>');
      } else if (messagebox.innerHTML.indexOf('You cannot fight') != -1) {
        setFightOpponentAvoid();
      } else {
        DEBUG('Unrecognized fight response.');
      }
      break;
    case 'heal':    //heal
      if (messagebox.innerHTML.indexOf('doctor healed') != -1) {
        var addHealth = messagebox.innerHTML.split('doctor healed <strong>')[1].split('health')[0];
        var cost = 0;
        if (messagebox.innerHTML.indexOf('$') != -1) {
          cost = messagebox.innerHTML.split('$')[1];
        }
        cost = cost.replace(/,/g, '');
        cost   = parseInt(cost  );
        addToLog(healthIcon + '<span style="color:#FF9999;">' + ' Health +'+ addHealth + ' for $' + makeCommaValue(cost)+ '</span>');
      } else if (messagebox.innerHTML.indexOf('You cannot heal so fast') != -1) {
        addToLog('<span style="color:#FF9999;">' + 'Attempted to heal too quickly'+ '</span>');
      }
      break;
    case 'job':
     xp_gained = $x('//dd[@class=\'message_experience\']', messagebox);
      if ( xp_gained[0] != undefined ) {
        addToLog('You performed ' + '<font style="color:#52E259; font-weight:bold;">' + missions[GM_getValue('selectMission')][0] + '</font> earning <font style="color:#52E259; font-weight:bold;">' + xp_gained[0].innerHTML + '</font>');
      }
      jobProgress(doc);
      if (messagebox.innerHTML.indexOf('You gained ') != -1) {
        jobLoot(doc);
      }
      if (messagebox.innerHTML.indexOf('You don\'t have the necessary items to perform this job') != -1) {
        addToLog('You don\'t have the items necessary to do ' + missions[GM_getValue('selectMission', 1)][0] );
        jobReqs(doc);
      }
      if (messagebox.innerHTML.indexOf('You are not high enough level to do this job') != -1) {
        addToLog('You are not high enough level to ' + missions[GM_getValue('selectMission', 1)][0] );
        addToLog('Job processing will stop');
        GM_setValue('autoMission', 0);
      }
      break;
    case 'rob':
      // NOTE: This is at the top because putting it lower would risk
      //       it not getting called at all if an error occurs. This
      //       can lead to robbing the same opponent over and over.
      if (GM_getValue('rFightList', '') == 'checked') {
          CycleFightList();
      }

      if (messagebox != null) {
        if (messagebox.innerHTML.indexOf('You <strong>successfully</strong> robbed') != -1) {
          robbed_user = messagebox.innerHTML.split('href=')[1].split('</a>')[0];
          tmpMsg = messagebox.innerHTML.split('true;">')[3].split('</tr>')[0];
          damage_taken = tmpMsg.split('taking ')[1].split('damage')[0] + ' damage';
          damage_dealt = tmpMsg.split('dealing ')[1].split('damage')[0] + ' damage';
          gained = tmpMsg.split('gained ')[1].split('and')[0];
          experience = tmpMsg.split('</span> and ')[1].split(' experience')[0] + ' experience';
          addToLog('<strong>Robbed </strong>' + '<a style="color:#FFD927" href="' + robbed_user + '</a>' +
                   ' taking ' + '<font style="color:#EC2D2D; font-weight:bold;">' + damage_taken + '</font><br>' +
                   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; dealing ' + '<font style="color:#52E259; font-weight:bold;">' + damage_dealt + '</font><br>' +
                   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; gaining ' + '<font style="color:#52E259; font-weight:bold;">' + gained + '</font>'+
                   ' and ' + '<font style="color:#52E259; font-weight:bold;">' + experience + '</font>');

          gained = parseInt(gained.split('$')[1].replace(/,/g, ''));
          experience = parseInt(experience.split('<span class="good">')[1].split(' experience')[0]);

          GM_setValue('robWinCountInt', (GM_getValue('robWinCountInt', 0) + 1));
          GM_setValue('totalExpInt', (GM_getValue('totalExpInt', 0) + parseInt(experience)));
          GM_setValue('totalWinDollarsInt', (GM_getValue('totalWinDollarsInt', 0) + parseInt(gained)));
          setFightOpponentRobbed();
        } else if (messagebox.innerHTML.indexOf('police investigation') != -1) {
          addToLog('Police investigation. Moving on quietly...');
          setFightOpponentRobbed();
        } else if (messagebox.innerHTML.indexOf('You <strong>failed</strong> to rob') != -1) {
          robbed_user = messagebox.innerHTML.split('href=')[1].split('</a>')[0];
          tmpMsg = messagebox.innerHTML.split('true;">')[3].split('</tr>')[0];
          damage_taken = tmpMsg.split('taking ')[1].split('damage')[0] + ' damage';
          loss = tmpMsg.split('losing ')[1].split('.')[0];
          addToLog('<strong>Failed</strong> to rob ' + '<a style="color:#FFD927" href="' + robbed_user +
                   '</a>, taking ' + '<font style="color:#EC2D2D; font-weight:bold;">' + damage_taken + '</font><br>' +
                   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; losing <font style="color:#EC2D2D; font-weight:bold;">' + loss + '</font>.' +
                   ' >>Deleting Opponent');

          loss = parseInt(loss.split('$')[1].replace(/,/g, ''));

          GM_setValue('robLossCountInt', (GM_getValue('robLossCountInt', 0) + 1));
          GM_setValue('totalLossDollarsInt', (GM_getValue('totalLossDollarsInt', 0) + parseInt(loss)));

          setFightOpponentAvoid();
        } else if (messagebox.innerHTML.indexOf('You cannot rob') != -1) {
          addToLog('Removing family member from target list');
          setFightOpponentAvoid();
        } else {// not enough stam or health
          DEBUG('stam or health maybe too low or robbing a non existent casino ');
        }
      } else {
        addToLog('nothing to rob?');
      }

      //Update Rob Statistics
      updateLogStats();
      break;
    case 'stats':
      if (messagebox.innerHTML.indexOf('You just upgraded your') != -1) {
        switch (GM_getValue('autoStatAdd','')) {
          case 'attack':
            addToLog('<span style="color:#885588;">'+'You upgraded '+ attackIcon + ' attack</span>');
            break;
          case 'defense':
            addToLog('<span style="color:#885588;">'+'You upgraded '+ defenseIcon + ' defense</span>');
            break;
          case 'health':
            addToLog('<span style="color:#885588;">'+'You upgraded '+ healthIcon + ' health</span>');
            break;
          case 'energy':
            addToLog('<span style="color:#885588;">'+'You upgraded '+ energyIcon + ' energy</span>');
            break;
          case 'stamina':
            addToLog('<span style="color:#885588;">'+'You upgraded '+ staminaIcon + ' stamina</span>');
          default:
            addToLog('<span style="color:#885588;">'+'You upgraded '+GM_getValue('autoStatAdd')+ '</span>');
        }
      } else {
        DEBUG('Failed to increment stat: '+ GM_getValue('autoStatAdd'));
      }
      break;
    case 'repair':
      var repairCost = GM_getValue('propertyDamageCost');
      GM_setValue('propertyDamage', 0);
      GM_setValue('propertyDamageCost', 0);
      if ( messagebox.innerHTML.indexOf('You need more cash') != -1) {
        addToLog('Someone must have robbed you again before we could repair...');
        var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'property' + SCRIPT.action + 'view';
        takeAction(link, 'propDmgChk');
      } else {
        addToLog('For <font style="color:#52E259; font-weight:bold;">$'+makeCommaValue(repairCost)+'</font>, you repaired all of your properties.');
        DEBUG(messagebox.innerHTML);
      }
      break;
    case 'protect':
      var protectCost = GM_getValue('propertyDamageCost');
      GM_setValue('propertyDamage', 0);
      GM_setValue('propertyDamageCost', 0);
      if ( messagebox.innerHTML.indexOf('You need more cash') != -1) {
        addToLog('Someone must have robbed you again before we could protect...');
      } else {
        addToLog('For <font style="color:#52E259; font-weight:bold;">$'+makeCommaValue(protectCost)+'</font>, you protected all of your properties.');
        DEBUG(messagebox.innerHTML);
      }
      var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'property' + SCRIPT.action + 'view';
      takeAction(link, 'propDmgChk');
      break;
    case 'energypack':
      addToLog(energypackIcon + ' Used an <font style="color:#52E259; font-weight:bold;">Energy Pack</font>.');
      DEBUG(messagebox.innerHTML);
      break;
    case 'propDmgChk':
      // Set GM Value propertyDamage: 0 - no damage, 1 - needs protect, 2 - needs repair & protect
      var protect = xpath('//span[@class=\'sexy_protect\' and contains(text(), \'Protect all properties\')]', doc).snapshotItem(0);
      var repair = xpath('//span[@class=\'sexy_repair\' and contains(text(), \'Repair all properties\')]', doc).snapshotItem(0);
      if ( protect !== null ) {
        dmg = 1;
        cost = parseInt(protect.innerHTML.split('$')[1].replace(/,/g, ''));
        DEBUG('Property is not fully protected, need $'+makeCommaValue(cost));
        GM_setValue('propertyDamage', dmg);
        GM_setValue('propertyDamageCost', cost);
        Autoplay.delay = delay;
        Autoplay.start();
      } else if ( repair !== null ) {
        dmg = 2;
        cost = parseInt(repair.innerHTML.split('$')[1].replace(/,/g, ''));
        DEBUG('Property is not fully repaired, need $'+makeCommaValue(cost));
        GM_setValue('propertyDamage', dmg);
        GM_setValue('propertyDamageCost', cost);
        Autoplay.delay = delay;
        Autoplay.start();
      } else {
        GM_setValue('propertyDamage', 0);
        GM_setValue('propertyDamageCost', 0);
      }
      break;
    case 'deletenews':
      DEBUG('Deleted newsfeed');
      break;
    case 'help':
      DEBUG('Parsing job help');
      var user = messagebox.innerHTML.split('href="')[1];
      if (user) {
        user = user.split('"')[0];
      }
      var username = messagebox.innerHTML.split('true;">')[1];
      if (username) {
        username = username.split('</a>')[0];
      }
      user = '<a style="color:#FFD927" href="'+user+'">'+username+'</a>';
      if ( messagebox.innerHTML.indexOf('You need to be friends') != -1) {
        addToLog('Failed to help ' + user + ' with job.  Reason: Not Friends');
      } else if ( messagebox.innerHTML.indexOf('You are too late') != -1) {
          addToLog('You are too late to help with this job!');
      } else if ( messagebox.innerHTML.indexOf('Not Again') != -1) {
          addToLog('Already helped ' + user + ' with this job.');
      } else if ( messagebox.innerHTML.indexOf('You received') != -1) {
          var cost = parseInt(messagebox.innerHTML.split('$')[1].replace(/,/g, ''));
          var experience = parseInt(messagebox.innerHTML.match(/\d+ experience points/g));
          if ( messagebox.innerHTML.indexOf('Special Bonus') != -1) {
            var loot = messagebox.innerHTML.split('gained a ')[1];
            addToLog(lootbagIcon + '<span style="color:#FF6633;">'+' Found a '+ loot.split('.<span')[0] + ' while helping on a job!</span>');
          }
          var result = 'You received ' + '<span style="color:#52E259; font-weight:bold;">' +
                   '$' + makeCommaValue(cost) + '</span>' + ' and ' +
                   '<span style="color:#52E259; font-weight:bold;">' + experience + ' experience</span>' +
                   ' for helping ' + user + ' complete the job.';
          addToLog(result);
      }
      GM_setValue('helpUser','');
      GM_setValue('helpUsername','');
      break;
    default:
      DEBUG('Neither Fight nor Heal');
  }
  GM_setValue('actionType','');
}

function createLogBox() {
  var mafiaLogBox = makeElement('div', document.body, {'id':'mafiaLogBox', 'style':'position: fixed; right: 5px; bottom: 30px; width: 427px; height: 505px; background: black url(http://mwdirectfb3.static.zynga.com/mwfb/graphics/MW_FB_Background_760.gif); text-align: left; padding: 5px; border: 1px solid; border-color: #FFFFFF; z-index: 98; font-size: 10pt;'});

  var logClrButton = makeElement('div', mafiaLogBox, {'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; left: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrButton.appendChild(document.createTextNode('clear log'));
    logClrButton.addEventListener('click', clearLog, false);

  var logClrStatsButton = makeElement('div', mafiaLogBox, {'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; left: 85px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    logClrStatsButton.appendChild(document.createTextNode('clear stats'));
    logClrStatsButton.addEventListener('click', clearStats, false);

  var closeLogButton = makeElement('div', mafiaLogBox, {'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; right: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
    closeLogButton.appendChild(document.createTextNode('close mafia log'));
    closeLogButton.addEventListener('click', hideMafiaLogBox, false);

  if ( debug ) {
    makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 180px; top: 0px; font-weight: 600;color: rgb(255, 0, 0);'}).appendChild(document.createTextNode('Debug Log'));
  }

  var logBox = makeElement('div', mafiaLogBox, {'id':'logBox', 'style':'position: absolute; overflow: scroll; right: 0px; top: 20px; width: 425px; height: 415px; background-color: #111111; color: #BCD2EA; text-align: left; padding: 5px; border: 1px solid;'});
    logBox.innerHTML = GM_getValue('itemLog', '');

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; top: 465px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fights:'));

  makeElement('div', mafiaLogBox, {'id':'fightCount', 'style':'position: absolute; right: 335px; top: 465px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; top: 480px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Won:'));

  makeElement('div', mafiaLogBox, {'id':'fightWinCount', 'style':'position: absolute; right: 335px; top: 480px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightWinCountInt', 0))));

  var fightWinPct = (GM_getValue('fightWinCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'fightWinPct', 'style':'position: absolute; right: 280px; top: 480px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(fightWinPct)) ? '0.0%' : fightWinPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; top: 495px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Lost:'));

  makeElement('div', mafiaLogBox, {'id':'fightLossCount', 'style':'position: absolute; right: 335px; top: 495px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('fightLossCountInt', 0))));

  var fightLossPct = (GM_getValue('fightLossCountInt', 0)/(GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'fightLossPct', 'style':'position: absolute; right: 280px; top: 495px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(fightLossPct)) ? '0.0%' : fightLossPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 165px; top: 465px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Robs:'));

  makeElement('div', mafiaLogBox, {'id':'robCount', 'style':'position: absolute; right: 185px; top: 465px; font-weight: 600;color: #BCD2EA;'}).appendChild(document.createTextNode(makeCommaValue((GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 165px; top: 480px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Succ:'));

  makeElement('div', mafiaLogBox, {'id':'robWinCount', 'style':'position: absolute; right: 185px; top: 480px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robWinCountInt', 0))));

  var robWinPct = (GM_getValue('robWinCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'robWinPct', 'style':'position: absolute; right: 130px; top: 480px; font-weight: 100;color: #52E259;'}).appendChild(document.createTextNode((isNaN(robWinPct)) ? '0.0%' : robWinPct + '%'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 165px; top: 495px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Fail:'));

  makeElement('div', mafiaLogBox, {'id':'robLossCount', 'style':'position: absolute; right: 185px; top: 495px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('robLossCountInt', 0))));

  var robLossPct = (GM_getValue('robLossCountInt', 0)/(GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)) * 100).toFixed(1);
    makeElement('div', mafiaLogBox, {'id':'robLossPct', 'style':'position: absolute; right: 130px; top: 495px; font-weight: 100;color: #EC2D2D;'}).appendChild(document.createTextNode((isNaN(robLossPct)) ? '0.0%' : robLossPct + '%'));

  makeElement('div', mafiaLogBox, {'id':'totalWinDollars', 'style':'position: absolute; right: 5px; top: 480px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode('$' + makeCommaValue(GM_getValue('totalWinDollarsInt', 0))));  //Accomodates up to $999,999,999,999

  makeElement('div', mafiaLogBox, {'id':'totalLossDollars', 'style':'position: absolute; right: 5px; top: 495px; font-weight: 600;color: #EC2D2D;'}).appendChild(document.createTextNode('$' + makeCommaValue(GM_getValue('totalLossDollarsInt', 0))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 5px; top: 450px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Exp Gained:'));

  makeElement('div', mafiaLogBox, {'id':'totalExp', 'style':'position: absolute; right: 329px; top: 450px; font-size: 11px; font-weight: 600;color: #52E259;'}).appendChild(document.createTextNode(makeCommaValue(GM_getValue('totalExpInt', 0))));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; left: 7px; top: 453px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('______________________________________________________________________'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 5px; top: 465px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Total $ Won/Lost'));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 267px; top: 450px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Gain Rate:'));

  var expRate = (GM_getValue('totalExpInt', 0) / ((GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) + (GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0)))).toFixed(2);
    makeElement('div', mafiaLogBox, {'id':'expRate', 'style':'position: absolute; right: 240px; top: 450px; font-size: 11px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode((isNaN(expRate)) ? 0 : expRate));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 175px; top: 450px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Nxt Lvl In:'));

  makeElement('div', mafiaLogBox, {'id':'expToNext', 'style':'position: absolute; right: 141px; top: 450px; font-size: 11px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode(makeCommaValue(ptsToNextLevel)));

  makeElement('div', mafiaLogBox, {'style':'position: absolute; right: 36px; top: 450px; font-size: 11px; font-weight: 100;color: #666666;'}).appendChild(document.createTextNode('Stam Req\'d to Lvl:'));

  var stamToNext = (ptsToNextLevel / (GM_getValue('totalExpInt', 0) / ((GM_getValue('fightWinCountInt', 0) + GM_getValue('fightLossCountInt', 0)) + (GM_getValue('robWinCountInt', 0) + GM_getValue('robLossCountInt', 0))))).toFixed(0);
    makeElement('div', mafiaLogBox, {'id':'stamToNext', 'style':'position: absolute; right: 2px; top: 450px; font-size: 11px; font-weight: 600;color: #04B4AE;'}).appendChild(document.createTextNode((isNaN(stamToNext)) ? 0 : stamToNext));
}

function createMenu() {
  // trying to make settings box appear like popup in MW
  // This will fade the background when the settings box is up, just like facebook popups
  makeElement('div', document.body, {'style':'height: 100%; position: fixed; display:block; left:0; top:0; width:100%; z-index:100;', 'class':'dark_dialog_overlay', 'id':'settingsBoxBg'});

  // This creates the settings box just like a facebook popup
  var sBoxGenDialogPopDialog = makeElement('div', document.body, {'class':'generic_dialog pop_dialog', 'id':'GenDialogPopDialog'});
    var sBoxGenDialogPopup = makeElement('div', sBoxGenDialogPopDialog, {'class':'generic_dialog_popup', 'style':'top: 40px;'});
      var sBoxPopDialogTable = makeElement('table', sBoxGenDialogPopup, {'class':'pop_dialog_table', 'id':'pop_dialog_table', 'style':'width: 620px;'});
        var sBoxTableTR = makeElement('tr', sBoxPopDialogTable);
          makeElement('td', sBoxTableTR, {'class':'pop_topleft'});
          makeElement('td', sBoxTableTR, {'class':'pop_border pop_top'});
          makeElement('td', sBoxTableTR, {'class':'pop_topright'});
        var sBoxTableTR2 = makeElement('tr', sBoxPopDialogTable);
          makeElement('td', sBoxTableTR2, {'class':'pop_border pop_side'});
          var sBoxTDPopContent = makeElement('td', sBoxTableTR2, {'class':'pop_content', 'id':'pop_content'});
            // This creates the settings container
            var settingsBox = makeElement('div', sBoxTDPopContent, {'style':'position: relative; width: 600px; height: 650px; font-size: 14px;', 'id':'settingsBox'});
          makeElement('td', sBoxTableTR2, {'class':'pop_border pop_side'});
        var sBoxTableTR3 = makeElement('tr', sBoxPopDialogTable, {'id':'pop_tr3'});
          makeElement('td', sBoxTableTR3, {'class':'pop_bottomleft'});
          makeElement('td', sBoxTableTR3, {'class':'pop_border pop_bottom'});
          makeElement('td', sBoxTableTR3, {'class':'pop_bottomright'});
  //End settings box

  var settingsBoxTitle = makeElement('div', settingsBox, {'style':'font-size: 18px; font-weight: bold;'});
    settingsBoxTitle.appendChild(document.createTextNode('Facebook Mafia Wars Autoplayer'));
    makeElement('br', settingsBoxTitle);
    settingsBoxTitle.appendChild(document.createTextNode('Version '+SCRIPT.version));

  makeElement('img', settingsBox, {'src':'http://www.zynga.com/images/games/gameSmall_mafiawars.jpg', 'style':'position: absolute; top: 0px; right: 30px;'});

  makeElement('img', settingsBox, {'src':'http://mwdirectfb3.static.zynga.com/mwfb/graphics/popup_close_button.png', 'style':'position: absolute; top: 0px; right: 0px; cursor: pointer;'}).addEventListener('click', toggleSettings, false);

  var autoHitlist = makeElement('div', settingsBox, {'style':'position: absolute; top: 50px; display:none;'});
    makeElement('input', autoHitlist, {'type':'checkbox', 'id':'autoHitlist', 'value':'checked'}, 'autoHitlist');
    autoHitlist.appendChild(document.createTextNode('Enable auto-hitlist '));

  var bountyAmount = makeElement('div', settingsBox, {'style':'position: absolute; top: 75px; left: 20px; display:none;'});
    bountyAmount.appendChild(document.createTextNode('Bounty Amount: '));
    makeElement('input', bountyAmount, {'type':'text', 'style':'border: 2px solid #ffd461; width: 80px; text-align: center;', 'value':GM_getValue('bountyAmount', '10000'), 'id':'bountyAmount', 'size':'1'});

  var autoClick = makeElement('div', settingsBox, {'style':'position: absolute; top: 100px;'});
    makeElement('input', autoClick, {'type':'checkbox', 'id':'autoClick', 'value':'checked'}, 'autoClick');
    autoClick.appendChild(document.createTextNode('Enable auto-refresh '));
    makeElement('img', autoClick, {'style':'position: absolute; top: 5px; left: 200px', 'src':stripURI(energyIcon)});

  var autoStats = makeElement('div', settingsBox, {'style':'text-align: right; position: absolute; top: 130px; right: 90px;'});
    makeElement('input', autoStats, {'type':'checkbox', 'id':'autoStat', 'value':'checked'}, 'autoStat');
    autoStats.appendChild(document.createTextNode('Enable auto-stat '));
    makeElement('img', autoStats, {'src':stripURI(plussignIcon)});

  var autoStatAttack = makeElement('div', settingsBox, {'style':'position: absolute; top: 150px; right: 200px;'});
    makeElement('input', autoStatAttack, {'type':'radio', 'name':'r2', 'id':'autoStatAttack', 'value':'checked'}, 'autoStatAttack');
    autoStatAttack.appendChild(document.createTextNode('Attack'));

  var autoStatDefense = makeElement('div', settingsBox, {'style':'position: absolute; top: 170px; right: 110px;'});
    makeElement('input', autoStatDefense, {'type':'radio', 'name':'r2', 'id':'autoStatDefense', 'value':'checked'}, 'autoStatDefense');
    autoStatDefense.appendChild(document.createTextNode('Defense'));

  var autoStatHealth = makeElement('div', settingsBox, {'style':'position: absolute; top: 150px; right: 120px;'});
    makeElement('input', autoStatHealth, {'type':'radio', 'name':'r2', 'id':'autoStatHealth', 'value':'checked'}, 'autoStatHealth');
    autoStatHealth.appendChild(document.createTextNode('Health'));

  var autoStatEnergy = makeElement('div', settingsBox, {'style':'position: absolute; top: 150px; right: 40px;'});
    makeElement('input', autoStatEnergy, {'type':'radio', 'name':'r2', 'id':'autoStatEnergy', 'value':'checked'}, 'autoStatEnergy');
    autoStatEnergy.appendChild(document.createTextNode('Energy'));

  var autoStatStamina = makeElement('div', settingsBox, {'style':'position: absolute; top: 170px; right: 30px;'});
    makeElement('input', autoStatStamina, {'type':'radio', 'name':'r2', 'id':'autoStatStamina', 'value':'checked'}, 'autoStatStamina');
    autoStatStamina.appendChild(document.createTextNode('Stamina'));

  var autoPause = makeElement('div', settingsBox, {'style':'position: absolute; top: 210px; right: 90px;'});
    makeElement('input', autoPause, {'type':'checkbox', 'id':'autoPause', 'value':'checked'}, 'autoPause');
    autoPause.appendChild(document.createTextNode('Enable auto-pause'));

  var autoPauseBefore = makeElement('div', settingsBox, {'style':'position: absolute; top: 230px; right: 20px;'});
    makeElement('input', autoPauseBefore, {'type':'radio', 'name':'r3', 'id':'autoPauseBefore', 'value':'checked'}, 'autoPauseBefore');
    autoPauseBefore.appendChild(document.createTextNode('Before level up'));

  var autoPauseAfter = makeElement('div', settingsBox, {'style':'position: absolute; top: 230px; right: 150px;'});
    makeElement('input', autoPauseAfter, {'type':'radio', 'name':'r3', 'id':'autoPauseAfter', 'value':'checked'}, 'autoPauseAfter');
    autoPauseAfter.appendChild(document.createTextNode('After level up'));

  var autoPauseExp = makeElement('div', settingsBox, {'style':'position: absolute; right: 30px; top: 250px;'});
    autoPauseExp.appendChild(document.createTextNode('Experience left to pause at '));
    makeElement('input', autoPauseExp, {'type':'text', 'style':'border: 2px solid #ffd461; text-align: center; ', 'value':GM_getValue('autoPauseExp', '50'), 'id':'autoPauseExp', 'size':'2'});

  var waitForFull = makeElement('div', settingsBox, {'style':'position: absolute; top: 275px; right: 10px;'});
    makeElement('input', waitForFull, {'type':'checkbox', 'id':'waitForFull', 'value':'checked'}, 'waitForFull');
    waitForFull.appendChild(document.createTextNode('Wait until energy is full to run jobs'));

  var autoProtect = makeElement('div', settingsBox, {'style':'position: absolute; top: 295px; right: 10px;'});
    makeElement('input', autoProtect, {'type':'checkbox', 'id':'autoProtect', 'value':'checked'}, 'autoProtect');
    autoProtect.appendChild(document.createTextNode('Enable auto-protect property'));

  var autoRepair = makeElement('div', settingsBox, {'style':'position: absolute; top: 315px; right: 10px;'});
    makeElement('input', autoRepair, {'type':'checkbox', 'id':'autoRepair', 'value':'checked'}, 'autoRepair');
    autoRepair.appendChild(document.createTextNode('Enable auto-repair property'));

  var autoEnergyPack = makeElement('div', settingsBox, {'style':'position: absolute; top: 335px; right: 10px;'});
    makeElement('input', autoEnergyPack, {'type':'checkbox', 'id':'autoEnergyPack', 'value':'checked'}, 'autoEnergyPack');
    autoEnergyPack.appendChild(document.createTextNode('Enable auto-energy pack'));

  var autoLog = makeElement('div', settingsBox, {'style':'position: absolute; top: 100px; right: 10px;'});
    makeElement('input', autoLog, {'type':'checkbox', 'id':'autoLog', 'value':'checked'}, 'autoLog');
    autoLog.appendChild(document.createTextNode('Enable logging '));
    makeElement('input', autoLog, {'type':'text', 'id':'autoLogLength', 'value':GM_getValue('autoLogLength', '300'), 'style':'border: 2px solid #ffd461; text-align: center; ', 'size':'2'});
    autoLog.appendChild(document.createTextNode('Max Log Length'));

  var refreshTimes = makeElement('div', settingsBox, {'style':'position: absolute; left: 10px; top: 125px;'});
    refreshTimes.appendChild(document.createTextNode('Refresh every '));
    makeElement('input', refreshTimes, {'type':'text', 'style':'border: 2px solid #ffd461; text-align: center;', 'value':GM_getValue('r1', '30'), 'id':'r1', 'size':'2'});
    refreshTimes.appendChild(document.createTextNode(' to '));
    makeElement('input', refreshTimes, {'type':'text', 'style':'border: 2px solid #ffd461; text-align: center;', 'value':GM_getValue('r2', '110'), 'id':'r2', 'size':'2'});
    refreshTimes.appendChild(document.createTextNode(' seconds'));

  var autoMission = makeElement('div', settingsBox, {'style':'position: absolute; top: 150px;'});
    makeElement('input', autoMission, {'type':'checkbox', 'id':'autoMission', 'value':'checked'}, 'autoMission', 'checked');
    autoMission.appendChild(document.createTextNode('Enable auto-mission '));
    makeElement('img', autoMission, {'src':stripURI(experienceIcon)});

  var selectMission = makeElement('select', settingsBox, {'style':'position: absolute; top: 175px;', 'id':'selectMission'});
    for each (var mission in missions ) {
      var choice = document.createElement('option');
      if (mission[0] != undefined) {
        choice.value = mission[0];
        choice.appendChild(document.createTextNode(mission[0]));
        selectMission.appendChild(choice);
      }
    }
    selectMission.selectedIndex = GM_getValue('selectMission', 1);

  var repeatJob = makeElement('div', settingsBox, {'style':'position: absolute; top: 200px;'});
    makeElement('input', repeatJob, {'type':'checkbox', 'id':'repeatJob', 'value':'checked'}, 'repeatJob');
    repeatJob.appendChild(document.createTextNode('Repeat Job'));

  var selectText = makeElement('div', settingsBox, {'style':'position: absolute; left: 20px; top: 225px;'});
    makeElement('img', selectText, {'src':stripURI(energyIcon)});
    selectText.appendChild(document.createTextNode(' Wheelman Energy Savings %'));


  var selectEnergyBonus = makeElement('select', settingsBox, {'style':'position: absolute; left: 270px; top: 220px;', 'id':'selectEnergyBonus'});
    for (i=0;i<12;i++) {
      var choice = document.createElement('option');
      choice.value = i;
      choice.appendChild(document.createTextNode(i));
      selectEnergyBonus.appendChild(choice);
    }
    selectEnergyBonus.selectedIndex = (GM_getValue('selectEnergyBonus', 0)>11) ? 0 : GM_getValue('selectEnergyBonus', 0);

  var autoHeal = makeElement('div', settingsBox, {'style':'position: absolute; top:260px;'});
    makeElement('input', autoHeal, {'type':'checkbox', 'id':'autoHeal', 'value':'checked'}, 'autoHeal', 'checked');
    autoHeal.appendChild(document.createTextNode('Enable auto-heal '));
    makeElement('img', autoHeal, {'src':stripURI(healthIcon)});

  var healthLevel = makeElement('div', settingsBox, {'style':'position: absolute; top: 285px; left: 20px;'});
    healthLevel.appendChild(document.createTextNode('Minimum health: '));
    makeElement('input', healthLevel, {'type':'text', 'style':'border: 2px solid #ffd461; width: 30px; text-align: center;', 'value':GM_getValue('healthLevel', '50'), 'id':'healthLevel', 'size':'1'});

  var autoBank = makeElement('div', settingsBox, {'style':'position: absolute; top: 310px;'});
     makeElement('input', autoBank, {'type':'checkbox', 'id':'autoBank', 'value':'checked'}, 'autoBank');
     autoBank.appendChild(document.createTextNode('Enable auto-bank '));
     makeElement('img', autoBank, {'src':stripURI(bankIcon)});

  var bankConfig = makeElement('div', settingsBox, {'style':'position: absolute; top: 335px;left: 20px;'});
    bankConfig.appendChild(document.createTextNode('Minimum amount: '));
    makeElement('input', bankConfig, {'type':'text', 'style':'border: 2px solid #ffd461; width: 80px; text-align: center; color: #AA0000;', 'value':GM_getValue('bankConfig', '50000'), 'id':'bankConfig', 'size':'5'});
    bankConfig.addEventListener('change', minBankCheck, false);

  var autoFight = makeElement('div', settingsBox, {'style':'position: absolute; top: 360px;'});
    makeElement('input', autoFight, {'type':'checkbox', 'id':'autoFight', 'value':'checked'}, 'autoFight');
    autoFight.appendChild(document.createTextNode('Enable auto-fight'));

  var autoRob = makeElement('div', settingsBox, {'style':'position: absolute; top: 360px; left: 150px;'});
    makeElement('input', autoRob, {'type':'checkbox', 'id':'autoRob', 'value':'checked'}, 'autoRob');
    autoRob.appendChild(document.createTextNode('Enable auto-rob'));

  //Stamina Preservation Options
  makeElement('div', settingsBox, {'style':'position: absolute; left: 357px; top: 362px;'}).appendChild(document.createTextNode('% Stamina to keep on hand (±1)'));

  var selectStaminaKeep = makeElement('select', settingsBox, {'style':'position: absolute; left: 300px; top: 357px;', 'id':'selectStaminaKeep'});
    for (i=100;i>-1;i=i-10) {
      var choice = document.createElement('option');
      choice.value = i;
      choice.appendChild(document.createTextNode(i));
      selectStaminaKeep.appendChild(choice);
    }
    if (GM_getValue('selectStaminaKeep', 'NotSet') == 'NotSet' || GM_getValue('selectStaminaKeep', 0) > selectStaminaKeep.length - 1) {
      GM_setValue('selectStaminaKeep', selectStaminaKeep.length - 1);
    }
    selectStaminaKeep.selectedIndex = GM_getValue('selectStaminaKeep', 0);

  var allowStaminaToLevelUp = makeElement('div', settingsBox, {'style':'position: absolute; left: 280px; top: 385px;'});
    makeElement('input', allowStaminaToLevelUp, {'type':'checkbox', 'id':'allowStaminaToLevelUp', 'value':'checked'}, 'allowStaminaToLevelUp');
    allowStaminaToLevelUp.appendChild(document.createTextNode('Use all stamina if Level-up within reach'));

  var clanMember = makeElement('div', settingsBox, {'style':'position: absolute; right: 50px; top: 475px;'});
    makeElement('input', clanMember, {'type':'checkbox', 'id':'clanMember', 'value':'checked'}, 'clanMember', 0);
    clanMember.appendChild(document.createTextNode('Avoid fighting mafia families '));
    makeElement('img', clanMember, {'src':stripURI(mafiaHatIcon)});

  makeElement('textarea', settingsBox, {'style':'position: absolute; top: 495px; right: 80px; border: 3px solid #ffd461; width: 180px; height: 105px;', 'id':'clanName'}).appendChild(document.createTextNode(GM_getValue('clanName', defaultClans.join('\n'))));;

  var fightRandom = makeElement('div', settingsBox, {'style':'position: absolute; left: 10px; top: 385px;'});
    makeElement('input', fightRandom, {'type':'radio', 'name':'r1', 'id':'fightRandom', 'value':'checked'}, 'fightRandom');
    fightRandom.appendChild(document.createTextNode(' Fight / Rob random mafia'));

  //check to make sure that max level is above current level
  var fightLevel = makeElement('div', settingsBox, {'style':'position: absolute; left: 36px; top: 410px;'});
    fightLevel.appendChild(document.createTextNode('Maximum level: '));
    makeElement('input', fightLevel, {'type':'text', 'id':'fightLevel', 'style':'border: 2px solid #ffd461; width: 45px; text-align: center;', 'value':GM_getValue('fightLevel', '100'), 'size':'1'});
    fightLevel.addEventListener('change', maxLevelCheck, false);

  var fightLevelRelative = makeElement('div', settingsBox, {'style':'position: absolute; left: 200px; top: 410px;'});
    makeElement('input', fightLevelRelative, {'type':'checkbox', 'id':'fightLevelRelative', 'value':'checked'}, 'fightLevelRelative');
    fightLevelRelative.appendChild(document.createTextNode('Make maximum level relative'));

  var fightmafiaSize = makeElement('div', settingsBox, {'style':'position: absolute; left: 36px; top: 430px;'});
    fightmafiaSize.appendChild(document.createTextNode('Maximum mafia: '));
    makeElement('input', fightmafiaSize, {'type':'text', 'style':'border: 2px solid #ffd461; width: 30px; text-align: center;', 'value':GM_getValue('fightmafiaSize', '502'), 'id':'fightmafiaSize', 'size':'1'});

  var fightStealth = makeElement('div', settingsBox, {'style':'position: absolute; left: 32px; top: 450px;'});
    makeElement('input', fightStealth, {'type':'checkbox', 'id':'fightStealth', 'title':'Prefer opponents who won\'t be notified of your attacks.', 'value':'checked'}, 'fightStealth', 'checked');
    fightStealth.appendChild(document.createTextNode('Use fight stealth'));

  var rideHitlist = makeElement('div', settingsBox, {'style':'position: absolute; left: 200px; top: 450px;'});
    makeElement('input', rideHitlist, {'type':'checkbox', 'id':'rideHitlist', 'value':'checked'}, 'rideHitlist');
    rideHitlist.appendChild(document.createTextNode('Ride Hitlist'));

  var fightList = makeElement('div', settingsBox, {'style':'position: absolute; left: 10px; top: 475px;'});
    makeElement('input', fightList, {'type':'radio', 'name':'r1', 'id':'rFightList', 'value':'checked'}, 'rFightList');
    fightList.appendChild(document.createTextNode(' Fight / Rob list:'));
    makeElement('br', fightList);
    makeElement('textarea', fightList, {'style':'border: 3px solid #ffd461; width: 180px; height: 105px;', 'id':'fightList'}).appendChild(document.createTextNode(GM_getValue('fightList', '')));

  var saveButton = makeElement('button', settingsBox, {'style':'position: absolute; left: 10px; top: 620px;'});
    saveButton.appendChild(document.createTextNode('save settings'));
    saveButton.addEventListener('click', saveSettings, false);

  var updateButton = makeElement('button', settingsBox, {'style':'position: absolute; left: 200px; top: 30px;'});
    updateButton.appendChild(document.createTextNode('Check for Updates'));
    updateButton.addEventListener('click', updateScript, false);

  DEBUG('Menu Created');
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  appendto.appendChild(element);
  return element;
}

function stripURI(img) {
  img = img.split('"')[1];
  return img.replace('" />', '');
}

function xpath(query, element) {
  var element = (element == null) ? document : element;
  return document.evaluate(query, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function $x(p,c) {
  var i, r = [], x=document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i=x.iterateNext()) r.push(i);
  return r;
}

window.addEventListener( 'load', function( e ) {

  if (document.body.innerHTML.indexOf('Try Again')>=0) {
    // error
    window.setTimeout(function() {
      window.history.go(0);
    }, 2*60*1000);
    DEBUG('Reloading from Try Again Error');
    return;
  }
},false);

function nodeInserted() {

  if (!document.getElementById('autoPlay') && document.getElementById('app10979261223_mw_masthead')) {
    try {
      var lobjTitleRow = document.getElementById('app10979261223_mw_masthead');
      // Settings Link
      var lobjAutoPlay = makeElement('span', lobjTitleRow, {'id':'autoPlay', 'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; left: 320px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600;cursor: pointer; color: rgb(255, 217, 39);'});
        lobjAutoPlay.appendChild(document.createTextNode('AutoPlay settings'));
        lobjAutoPlay.addEventListener('click', toggleSettings, false);

      //show resume or paused based on if we are running or not (we are checking a string here pulled from the inside of a div not a bool, so compare it like a string.
        //If we compare like a bool it will always be true as long as the div contains something, and it does.)
      if (document.getElementById('isRunningStore').innerHTML == 'true') {
        var lobjpauseButton = makeElement('span', lobjTitleRow, {'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; left: 320px; top: 18px; font-family: tahoma; font-size: 10pt; font-weight: 600;cursor: pointer; color: rgb(255, 217, 39);'});
          lobjpauseButton.appendChild(document.createTextNode('pause'));
          lobjpauseButton.addEventListener('click', Autoplay.pause, false);
      } else {
        var lobjplayButton = makeElement('span', lobjTitleRow, {'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; left: 320px; top: 18px; font-family: tahoma; font-size: 10pt; font-weight: 600;cursor: pointer; color: rgb(255, 217, 39);'});
          lobjplayButton.appendChild(document.createTextNode('resume'));
          lobjplayButton.addEventListener('click', unPause, false);

        var lobjpauseTitle = document.createElement('div');
          lobjpauseTitle.appendChild(document.createTextNode('AutoPlayer Paused'));
          lobjpauseTitle.setAttribute('style', 'font-family: tahoma; font-size: 12pt; font-weight: 600;color: rgb(255, 0, 0); text-align: center;');
          lobjTitleRow.parentNode.insertBefore(lobjpauseTitle,lobjTitleRow);
      }

      var lobjViewLogButton = makeElement('div', lobjTitleRow, {'onmouseover':'this.style.textDecoration=\'underline\'', 'onmouseout':'this.style.textDecoration=\'none\'', 'style':'position: absolute; left: 320px; top: 35px; font-family: tahoma; font-size: 10pt; font-weight: 600;cursor: pointer;color: rgb(255, 217, 39);'});
        lobjViewLogButton.appendChild(document.createTextNode('view mafia log'));
        lobjViewLogButton.addEventListener('click', showMafiaLogBox, false);

     var expBox = xpath('//span[@class=\'stat_title\' and contains(text(),\'Experience\')]');
       expBox.snapshotItem(0).innerHTML = 'Experience (' + (parseInt(document.getElementById( SCRIPT.appID+'_user_experience').innerHTML) - parseInt(document.getElementById( SCRIPT.appID+'_exp_for_next_level').innerHTML)) + ')';

    } catch(ex) {
      DEBUG(ex);
    }
  }
}

function jobReqs (element) {
  addToLog('Getting Job Requirements');
  var currentJob = missions[GM_getValue('selectMission', 1)][0];
  var currentJobEsc = currentJob.replace(/"/g,'\\"');
  currentJobEsc.replace(/'/g,"\\'");
  var necessaryItems = $x('//tr[contains(.,\'' + currentJobEsc + '\')]/td/div[@class=\'req_item need_item\']/a/img',element);
  var necessaryItemsNoLink = $x('//tr[contains(.,\'' + currentJobEsc + '\')]/td/div[@class=\'req_item need_item\']/img',element);
  var items = getSavedList('itemList');
  var jobs = getSavedList('jobsToDo', '');
  var jobno = missions[GM_getValue('selectMission', 1)][2];
  var tabno = missions[GM_getValue('selectMission', 1)][3];
  var buyLink = $x('//a[contains(@href, \'buyJob\')]', element);
  // if we are here then we have already failed the job. Save the current job for later.
  // the currentJob should not already exist in the list so check first
  if (jobs.indexOf(currentJob) == -1) {
    jobs.push(currentJob);
    DEBUG('Saving ' +currentJob+ ' for later');
    setSavedList('jobsToDo', jobs);
  } else {
    DEBUG(currentJob + " is already in the jobsToDo list");
  }

  if ( buyLink[0] != undefined ) {
    DEBUG ('do link: ' + buyLink[0]);
    addToLog('Attempting to purchase job requirement items');
    Autoplay.fx = function(){document.location = buyLink[0];}
    Autoplay.start();
  } else {
    DEBUG ('Nothing to buy moving on to prerequsite job');
    if ( necessaryItems.length > 0 ) {
      necessaryItems.forEach(
        function(i){
          DEBUG('Missing : ' +i.alt);
          requirementJob.forEach(
            function(j){
              if(j[0] == i.alt) {
                jobs.push(j[1]);
                items.push(i.alt);
              }
            }
          );
        }
      );
    } else if ( necessaryItemsNoLink.length > 0) {
      necessaryItemsNoLink.forEach(
        function(i){
          DEBUG('Missing : ' +i.alt);
          requirementJob.forEach(
            function(j){
              if(j[0] == i.alt) {
                jobs.push(j[1]);
                items.push(i.alt);
              }
            }
          );
        }
      );
    } else { DEBUG('Broken item detection please report'); }
    var doJob = jobs.pop();
    setSavedList('jobsToDo', jobs);
    setSavedList('itemList', items.unique());
    var i = 0;
    DEBUG('do job: ' + doJob + ' next');

    missions.forEach(
      function(f) {
          // help locate name miss matches
          //DEBUG(f[0] +'  :<<f>>: ' + missions[i][0]);
        if(f[0] == doJob ) {
          GM_setValue('selectMission', i);
          addToLog('Switching job to ' + doJob);
        }
        i++;
      }
    );
  }
  return;
}

function jobProgress(element) {
  if (GM_getValue('repeatJob', '') == 'checked' ) {
    DEBUG('Exiting jobProgress function, repeatJob is checked');
    return;
  }

  var currentJob = missions[GM_getValue('selectMission', 1)][0];
  DEBUG('Calculating Progress for ' + currentJob);
  var currentJobEsc = currentJob.replace(/"/g,'\\"');
  currentJobEsc.replace(/'/g,"\\'");
  var currentJobRow = xpath('//tr[contains(.,\'' + currentJobEsc + '\') and contains(.,\'Do Job\')]',element);
  var jobno = missions[GM_getValue('selectMission', 1)][2];
  var tabno = missions[GM_getValue('selectMission', 1)][3];
  if (currentJobRow.snapshotLength == 0 || typeof(currentJobRow.snapshotLength) == 'undefined') {
    addToLog('Unable to find Job Row for ' + currentJob);
    var tierJobs = $x('//tr/td[@class=\'job_name\']', element);
    if (typeof(tierJobs[0]) == 'undefined') {
      addToLog("No Jobs found in result.  Checking page contents");
      if (element.innerHTML.indexOf('Try Again')>0) {
        addToLog("We are on the 'Try Again' error page");
      }
    } else {
      addToLog(tierJobs.length + " jobs were found in result page");
      tierJobs.forEach(
        function(i) {
          var jobName = f.innerHTML.split('job_name">')[1].split('<br>')[0];
          DEBUG("Found job, " + jobName.trim());
        });
    }
    return;
  }
  var currentJobRowIndex = currentJobRow.snapshotLength - 1;
  var tierLevel = currentJobRow.snapshotItem(currentJobRowIndex).innerHTML.split('Level ')[1].match(/\d+/);
  var tierJobs = $x('//tr/td[@class=\'job_name\']', element);
  var tierPercent = 0;
  DEBUG("checking mastery level for each job");
  tierJobs.forEach(
    function(f) {
      if (f.innerHTML.indexOf('Mastered') != -1) {
        tierPercent += 100;
      } else {
        tierPercent += parseInt(f.innerHTML.split('Mastery ')[1].split('%')[0]);
      }
    }
  );

  if (tierJobs.length != 0) {
    tierPercent = Math.floor(tierPercent / tierJobs.length);
  }
  tierPercent = tierPercent + '';  //convert to string
  GM_setValue('tierPercentComplete', tierPercent);
  addToLog('Job Tier level ' + tierLevel + ' is ' + tierPercent + '% complete');

  DEBUG("checking current job mastery");
  var currentJobMastered = currentJobRow.snapshotItem(currentJobRowIndex).innerHTML.indexOf('Mastered');
  if (currentJobMastered > 0) {
    var jobs = getSavedList('jobsToDo');
    if (jobs.length == 0 || typeof(jobs.length) == 'undefined') {
      addToLog('You have mastered the ' + currentJob + ' job');
      DEBUG('Checking jobTier Mastery');
      if (tierPercent == '100' ) {
        addToLog('Current job tier is mastered.  Will move to next tier');
        var nextTierJobs = missions.searchArray(tabno + 1,3);
        if (typeof(nextTierJobs[0]) == 'undefined') {
          DEBUG('You have mastered the final tier');
        } else {
          GM_setValue('selectMission', nextTierJobs[0]) + '';
          addToLog('Current job switched to ' + missions[GM_getValue('selectMission', 1)][0]);
        }
      } else {
          var findMastery = function(v,i,a) { return (a[i].innerHTML.indexOf('Mastery') > 0)? 1:0; };
          var nonMasteredJobs = tierJobs.filter(findMastery);
          var missionName = nonMasteredJobs[0].innerHTML.split('<br>')[0];
          GM_setValue('selectMission', missions.searchArray(missionName.trim(),0) + '');
          addToLog('Current job switched to ' + missions[GM_getValue('selectMission', 1)][0]);
      }
    } else {
      DEBUG("There are jobs in the ToDo list");
    }
  } else {
    DEBUG("Job is not mastered.  Checking percent of mastery");
    var jobPercentComplete = currentJobRow.snapshotItem(currentJobRowIndex).innerHTML.split('Mastery ')[1].split('%')[0];
    GM_setValue('jobPercentComplete', jobPercentComplete + '');
    addToLog('Job "' + currentJob + '" is ' + jobPercentComplete + '% complete');
  }
  return;
}

function jobLoot(element) {
  var lootbag = [];
  var lootItems = xpath('//td[@class=\'message_body\']/img', element);
  var numLootItems = lootItems.snapshotLength;
  for (i=0;i < numLootItems; i++) {
    var loot = lootItems.snapshotItem(i).alt;
    addToLog(lootbagIcon + '<span style="color:#FF6633;">'+' Found ' + loot + ' in a job.' + '</span>');
    lootbag.push(loot);
  }
  var items = getSavedList('itemList');
  if (typeof(items[0]) == 'undefined' || items.length == 0) {
    DEBUG('No items in required item list');
    return;
  }
  var itemFound = false;
  addToLog('We found ' + lootbag.length + ' item(s) on this job.');
  for (i=0; i < lootbag.length; i++) {
    var itemIndex = 0;
    var itemName = lootbag.pop();
    DEBUG('Looking for ' + itemName + ' in needed itemList');
    DEBUG('We need ' + items.length + ' item(s)');
    for (i=0; i < items.length; i++) {
      if (itemName.indexOf(items[i]) != -1 ) {
        // we found some needed loot
        itemFound = true;
        addToLog(itemName + ' is the item we were looking for!');
        items.splice(i,1);
        var jobList = getSavedList('jobsToDo');
        var doJob = jobList.pop();
        setSavedList('jobsToDo', jobList);


        for (i=0; i < missions.length; i++) {
          if (missions[i][0] == doJob)
            GM_setValue('selectMission', i);
        }
        addToLog('Switching job to ' + doJob);

      } else DEBUG(items[i] + ' not found in ' + itemName);
    }
  }
  if (!itemFound) {
    var jobResult;
    for (i=0; i < items.length; i++) {
      jobResult = requirementJob.searchArray(items[i],0);
      if (jobResult === false) {
        addToLog('ERROR - ' + items[i] + ' not found in requirementJob Array');
      } else {
        if (missions[GM_getValue('selectMission', 1)][0] != requirementJob[jobResult][1]) {
          addToLog('ERROR - ' + items[i] + ' cannot be found doing this job');
        }
      }
      addToLog(items[i] + ' not found');
    }
  }
}

function debugDumpSettings() {
  DEBUG('  >  >  >  >  >  BEGIN SETTINGS DUMP  <  <  <  <  <   <br>' +
        'Script Version: <strong>' + SCRIPT.version + '</strong><br>' +
        'Player current level: <strong>' + level + '</strong><br>' +
        'Player points to next level: <strong>' + ptsToNextLevel + '</strong><br>' +
        'Player mafia size: <strong>' + mafia + '</strong><br>' +
        'Player current health: <strong>' + health + '</strong><br>' +
        'Player max energy: <strong>' + maxEnergy + '</strong><br>' +
        'Player max stamina: <strong>' + maxStamina + '</strong><br>' +
        '------------------------------------------------<br>' +
        'Enable auto-refresh: <strong>' + GM_getValue('autoClick')+ '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate low: <strong>'+ GM_getValue('r1') + '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate high: <strong>' + GM_getValue('r2') + '</strong><br>' +
        'Enable logging: <strong>' + GM_getValue('priorLogSetting') + '</strong><br>' +
        '&nbsp;&nbsp;-Logging length: <strong>' + GM_getValue('autoLogLength') + '</strong><br>' +
        'Enable auto-mission: <strong>' + GM_getValue('autoMission') + '</strong><br>' +
        '&nbsp;&nbsp;-Job selected: <strong>' + missions[GM_getValue('selectMission')][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Repeat Job: <strong>' + GM_getValue('repeatJob') + '</strong><br>' +
        'Wheelman savings: <strong>' + GM_getValue('selectEnergyBonus') + '%</strong><br>' +
        'Enable auto-stat: <strong>' + GM_getValue('autoStat') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack: <strong>' + GM_getValue('autoStatAttack') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense: <strong>' + GM_getValue('autoStatDefense') + '</strong><br>' +
        '&nbsp;&nbsp;-Health: <strong>' + GM_getValue('autoStatHealth') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy: <strong>' + GM_getValue('autoStatEnergy') + '</strong><br>' +
        '&nbsp;&nbsp;-Stamina: <strong>' + GM_getValue('autoStatStamina') + '</strong><br>' +
        'Enable auto-pause: <strong>' + GM_getValue('autoPause') + '</strong><br>' +
        '&nbsp;&nbsp;-After level up: <strong>' + GM_getValue('autoPauseAfter') + '</strong><br>' +
        '&nbsp;&nbsp;-Before level up: <strong>' + GM_getValue('autoPauseBefore') + '</strong><br>' +
        '&nbsp;&nbsp;-Exp to pause at: <strong>'+ GM_getValue('autoPauseExp') + '</strong><br>' +
        'Enable auto-heal: <strong>' + GM_getValue('autoHeal') + '</strong><br>' +
        '&nbsp;&nbsp;-Minimum health: <strong>' + GM_getValue('healthLevel') + '</strong><br>' +
        'Wait until energy full for jobs: <strong>' + GM_getValue('waitForFull') + '</strong><br>' +
        'Enable auto-bank: <strong>' + GM_getValue('autoBank') + '</strong><br>' +
        '&nbsp;&nbsp;-Min bank amount: $<strong>' + GM_getValue('bankConfig') + '</strong><br>' +
        'Enable auto-protect property <strong>' + GM_getValue('autoProtect') + '</strong><br>' +
        'Enable auto-repair property <strong>' + GM_getValue('autoRepair') + '</strong><br>' +
        'Enable auto-energy pack: <strong>' + GM_getValue('autoEnergyPack') + '</strong><br>' +
        'Enable auto-fight: <strong>' + GM_getValue('autoFight') + '</strong><br>' +
        'Enable auto-rob: <strong>' + GM_getValue('autoRob') + '</strong><br>' +
        '&nbsp;&nbsp;-Fight/Rob random mafia: <strong>' + GM_getValue('fightRandom') + '</strong><br>' +
        '&nbsp;&nbsp;-Max level: <strong>' + GM_getValue('fightLevel') + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Make max level relative: <strong>' + GM_getValue('fightLevelRelative') + '</strong><br>' +
        '&nbsp;&nbsp;-Max mafia: <strong>' + GM_getValue('fightmafiaSize') + '</strong><br>' +
        '&nbsp;&nbsp;-Use fight stealth: <strong>' + GM_getValue('fightStealth') + '</strong><br>' +
        '&nbsp;&nbsp;-Fight/Rob list: <strong>' + GM_getValue('rFightList') + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-List: <strong>' + GM_getValue('fightList') + '</strong><br>' +
        'Stamina to keep on hand: <strong>' + (100-(GM_getValue('selectStaminaKeep')*10)) + '% (' + staminaFloor + ')</strong><br>' +
        'Use stamina to level-up: <strong>' + GM_getValue('allowStaminaToLevelUp') + '</strong><br>' +
        'Avoid fighting mafia families: <strong>' + GM_getValue('clanMember') + '</strong><br>' +
        '&nbsp;&nbsp;-Avoid List: <strong>' + GM_getValue('clanName') + '</strong><br>' +
        '  >  >  >  >  >  END SETTINGS DUMP  <  <  <  <  <   ');
}

function parsePlayerUpdates (messagebox) {

  var xw_time = messagebox.innerHTML.match(/xw_time=[^&]*/i);
  var xw_exp_sig = messagebox.innerHTML.match(/xw_exp_sig=[^&]*/i);

  if (messagebox.innerHTML.indexOf('attacked by') != -1) {
    var user = messagebox.innerHTML.split('href="')[1];
    if (user) {
      user = user.split('"')[0];
    }
    var username = messagebox.innerHTML.split('true;">')[1];
    if (username) {
      username = username.split('</a>')[0];
    }

    if (messagebox.innerHTML.indexOf('won') > 0 && messagebox.innerHTML.indexOf('$') > 0) {
      // The fight was won.
      user = '<a style="color:#FFD927" href="'+user+'">'+username+'</a>';
      var cost = parseInt(messagebox.innerHTML.split('$')[1].replace(/,/g, ''));
      var experience = parseInt(messagebox.innerHTML.match(/\d+ experience points/g));
      var result = 'Attacked by ' + user + '<span style="color:#52E259; font-weight:bold;">' +
                   ' WON $' + makeCommaValue(cost) + '</span>' + ' and ' +
                   '<span style="color:#52E259; font-weight:bold;">' + experience + ' experience</span>';

      if (GM_getValue('rideHitlist', '') == 'checked') {
        DEBUG('Riding Hitlist Fight Won');
        GM_setValue('currentHitXp', parseInt((GM_getValue('currentHitXp', 0)) + parseInt(experience)));
        GM_setValue('currentHitDollars', parseInt((GM_getValue('currentHitDollars', 0)) + cost));
        DEBUG(result);
        if (experience == 0) {
          DEBUG('Zero experience detected; turning off autoHeal');
          GM_setValue('autoHeal', 0);
        }
      } else {
        addToLog(result);
      }

      GM_setValue('fightWinCountInt', (GM_getValue('fightWinCountInt',1) + 1));
      GM_setValue('fightWinCountDisp', makeCommaValue(GM_getValue('fightWinCountInt',1)));
      GM_setValue('totalExpInt', (GM_getValue('totalExpInt', 1) + parseInt(experience)));
      GM_setValue('totalExpDisp', makeCommaValue(GM_getValue('totalExpInt', 1)));
      GM_setValue('totalWinDollarsInt', (GM_getValue('totalWinDollarsInt', 1) + cost));
      GM_setValue('totalWinDollarsDisp', '$' + makeCommaValue(GM_getValue('totalWinDollarsInt', 1)));
    } else {
        // The fight was lost.
        user = '<a style="color:#FFD927" href="'+user+'">'+username+'</a>';
        var cost = messagebox.innerHTML.split('$')[1];
        cost = cost.replace(/,/g, '');
        var result = 'Attacked by '+ user + '<span style="color:#EC2D2D; font-weight:bold;">' +
                     ' LOST $' + makeCommaValue(parseInt(cost) + '</span>');

        if (GM_getValue('rideHitlist', '') == 'checked') {
          DEBUG('Ride Hitlist Fight Lost');
          GM_setValue('currentHitDollars', parseInt((GM_getValue('currentHitDollars', 0)) - parseInt(cost)));
          DEBUG(result);
        } else {
          addToLog(result);
        }

        GM_setValue('fightLossCountInt', (GM_getValue('fightLossCountInt',1) + 1));
        GM_setValue('fightLossCountDisp', makeCommaValue(GM_getValue('fightLossCountInt',1)));
        GM_setValue('totalLossDollarsInt', (GM_getValue('totalLossDollarsInt', 1) + parseInt(cost)));
        GM_setValue('totalLossDollarsDisp', '$' + makeCommaValue(GM_getValue('totalLossDollarsInt', 1)));
    }

  } else if (messagebox.innerHTML.indexOf('You were snuffed') != -1) {
      addToLog('You <span style="color:#EC2D2D;">' + 'DIED' + '</span>.');

  } else if (messagebox.innerHTML.indexOf('You were knocked out') != -1) {
      var hitman = messagebox.innerHTML.split('href="')[1];
      if (hitman) {
        hitman = hitman.split('"')[0];
      }
      var hitmanName = messagebox.innerHTML.split('true;">')[1];
      if (hitmanName) {
        hitmanName = hitmanName.split('</a>')[0];
      }
      var bounty = parseInt(messagebox.innerHTML.split('$')[1].replace(/,/g, ''));
      var user = messagebox.innerHTML.split('href="')[2];
      if (user) {
        user = user.split('"')[0];
      }
      var username = messagebox.innerHTML.split('true;">')[2];
      if (username) {
        username = username.split('</a>')[0];
      }
      hitman = '<a style="color:#FFD927" href="'+hitman+'">'+hitmanName+'</a>';
      user = '<a style="color:#EC2D2D" href="'+user+'">'+username+'</a>';
      var result = 'Whacked by '+ hitman + ' who claimed the $' + makeCommaValue(parseInt(bounty)) +
                   ' bounty set by ' + user;

      if (GM_getValue('rideHitlist', '') == 'checked') {
        DEBUG('Whacked Riding Hitlist');
        GM_setValue('currentHitXp', parseInt((GM_getValue('currentHitXp', 0) - 6)));
        GM_setValue('totalHits', parseInt(GM_getValue('totalHits', 0)) + 1);
        GM_setValue('totalXp', parseInt(GM_getValue('totalXp', 0)) + parseInt(GM_getValue('currentHitXp',0)));
        GM_setValue('lastHitXp', parseInt(GM_getValue('currentHitXp',0)));
        GM_setValue('totalHitDollars', parseInt((GM_getValue('currentHitDollars', 0)) + parseInt(GM_getValue('totalHitDollars', 0))));
        if (GM_getValue('currentHitXp', 0) < 0) {
          var currentHitXp = '<span style="color:#EC2D2D; font-weight:bold;">LOST ' + GM_getValue('currentHitXp', 0) + '</span>';
        } else {
          var currentHitXp = '<span style="color:#52E259; font-weight:bold;">GAINED ' + GM_getValue('currentHitXp', 0) + '</span>';
        }
        if (GM_getValue('currentHitDollars',0) < 0) {
          var currentHitDollars = '<span style="color:#EC2D2D; font-weight:bold;">' +
                                  ' LOST $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars',0))) + '</span>';
        } else {
          var currentHitDollars = '<span style="color:#52E259; font-weight:bold;">' +
                                  ' WON $' + makeCommaValue(parseInt(GM_getValue('currentHitDollars',0))) + '</span>';
        }
        var hitlistResult = currentHitXp + ' experience and ' + currentHitDollars + ' on the hitlist.';

        DEBUG('Hitlist total values set; now clearing current values');
        GM_setValue('currentHitXp', 0);
        GM_setValue('currentHitDollars',0);
        DEBUG('Ensure that autoHeal is enabled');
        GM_setValue('autoHeal', 'checked');

        addToLog(hitlistResult);
      }
      addToLog(result);

  } else if (messagebox.innerHTML.indexOf('You were punched') != -1) {
      var user = messagebox.innerHTML.split('href="')[1];
      if (user) {
        user = user.split('"')[0];
      }
      var username = messagebox.innerHTML.split('true;">')[1];
      if (username) {
        username = username.split('</a>')[0];
      }
      user = '<a style="color:#EC2D2D" href="'+user+'">'+username+'</a>';
      var result = 'You were punched in the face by ' + user;
      addToLog(result);

  } else if (messagebox.innerHTML.indexOf('You fought as') != -1) {
      var capo = messagebox.innerHTML.split('href="')[1];
      if (capo) {
        capo = capo.split('"')[0];
      }
      var caponame = messagebox.innerHTML.split('true;">')[1];
      if (caponame) {
        caponame = caponame.split('</a>')[0];
      }
      var user = messagebox.innerHTML.split('href="')[2];
      if (user) {
        user = user.split('"')[0];
      }
      var username = messagebox.innerHTML.split('true;">')[2];
      if (username) {
        username = username.split('</a>')[0];
      }
      var cost = parseInt(messagebox.innerHTML.split('$')[1].replace(/,/g, ''));
      capo = '<a style="color:#FFD927" href="'+capo+'">'+caponame+'</a>';
      user = '<a style="color:#EC2D2D" href="'+user+'">'+username+'</a>';
      var result = 'You fought as ' + capo + "'s Capo and defeated " + user +
                   ' receiving' + '<span style="color:#52E259; font-weight:bold;">' +
                   ' $' + makeCommaValue(cost) + '</span> for your efforts.';
      addToLog(result);

  } else if (messagebox.innerHTML.indexOf('needs your help on a job') != -1) {
      var targetId = messagebox.innerHTML.split(/target_id=/)[1].split('"')[0];
      var link = 'http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id=' +
                 targetId + '&skip_interstitial=1';
      takeAction(link,'help');
      Autoplay.delay = delay;
      Autoplay.start();

  } else if (messagebox.innerHTML.indexOf('claimed your $') != -1) {
      var hitman = messagebox.innerHTML.split('href="')[1];
      if (hitman) {
        hitman = hitman.split('"')[0];
      }
      var hitmanName = messagebox.innerHTML.split('true;">')[1];
      if (hitmanName) {
        hitmanName = hitmanName.split('</a>')[0];
      }
      var bounty = parseInt(messagebox.innerHTML.split('$')[1].replace(/,/g, ''));
      var user = messagebox.innerHTML.split('href="')[2];
      if (user) {
        user = user.split('"')[0];
      }
      var username = messagebox.innerHTML.split('true;">')[2];
      if (username) {
        username = username.split('</a>')[0];
      }
      hitman = '<a style="color:#FFD927" href="'+hitman+'">'+hitmanName+'</a>';
      user = '<a style="color:#EC2D2D" href="'+user+'">'+username+'</a>';
      var result = hitman + ' claimed your $' + makeCommaValue(parseInt(bounty)) +
                   ' bounty on ' + user;
      addToLog(result);

  } else if (messagebox.innerHTML.indexOf('tried to rob you!') != -1) {
      var thief = messagebox.innerHTML.split('href="')[1];
      if (thief) {
        thief = thief.split('"')[0];
      }
      var thiefName = messagebox.innerHTML.split('true;">')[1];
      if (thiefName) {
        thiefName = thiefName.split('</a>')[0];
      }
      var damage = messagebox.innerHTML.split('dealing ')[1].replace(/,/g, '');
      thief = '<a style="color:#EC2D2D" href="'+thief+'">'+thiefName+'</a>';
      var result = thief + ' tried to rob you!<br>You taught \'em a lesson and spanked \'em for ' + damage + ' damage.';
      addToLog(result);

  } else {
    result = messagebox.innerHTML.split('update_txt">')[1].split('</div>')[0];
    addToLog(result);
  }
  return;
}

// Register debugOnOff with Greasemonkey
GM_registerMenuCommand( 'FB Mafia Wars Autoplayer - Turn Debug Log '+(GM_getValue('enableDebug')  == 'checked' ? 'off' : 'on'), debugOnOff);
GM_registerMenuCommand( 'FB Mafia Wars Autoplayer - Clear Saved Values', clearSettings);

