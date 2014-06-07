// ==UserScript==
// @name       eRepublik Battle Master
// @version    1.2.2
// @ori author   eCitizen Scyld
// @edit author  eCitizen Kompa3
// @grant       GM_getValue
// @grant       GM_setValue
// @include    http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

var multiHitRunning = false;
var multiHitCount = 0;
var multiHitDone = 0;
var multiHitEnemyKill = 0;
var multiHitLastKilled = false;
var multiHitLoopId = 0;
var foodUrl = "";
var currentHealth = (location.href.match(/citizen\/profile\/(\d+)$/) ? 0 : unsafeWindow.SERVER_DATA.health);
var top5ABH = new Array(4);
var top5DBH = new Array(4);

// replace all @oldstr to @replacestr in string @str
function str_replace(str, oldstr, replacestr) {
  return str.split(oldstr).join(replacestr);
}

function bhStats(att, def) {
	
  $j('#BHTableL').remove();
  $j('div#myStatBoxL').html('<div id="BHTableL">' + '<div class="BHTable" style="float:left"><table class="BHTable"><tr style="border-bottom:1px solid #FFF;"><th>Citizen</th><th>Kills</th><th style="text-align:right;">Influence</th></tr>' + att + '</table></div>' + '</div>');
  $j('#BHTableR').remove();
  $j('div#myStatBoxR').html('<div id="BHTableR">' + '<div class="BHTable" style="float:right"><table class="BHTable"><tr style="border-bottom:1px solid #FFF;"><th>Citizen</th><th>Kills</th><th style="text-align:right;">Influence</th></tr>' + def + '</table></div>' + '</div>');

}

function histStats(hist) {

  $j('#OOTable').remove();
  $j('div#myOverBox').html('<div id="OOTable">' + '<div class="CHTable" style="float:left"><table class="BHTable"><tr style="border-bottom:1px solid #FFF;"><th>Citizen</th><th>Kills</th><th style="text-align:right;">Influence</th></tr>' + hist + '</table></div>' + '<div style="clear:both;line-height:0px;height:0px;"></div></div>');

}

function canGetWell() {

  var h = $j('#heal_btn');
  var trigger = $j('#DailyConsumtionTrigger');

  // can use hospital?
  if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled')) {
    return true;
  }

  // can eat food?
  if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy') && !trigger.hasClass('energy')) {
    return true;
  }

  // can use energy bar?
  if ($j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') && trigger.hasClass('energy')) {
    return true;
  }

  // can use healt kit?
  if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {
    return true;
  }

  return false;

}

var rank = new Array;

rank['Recruit'] = 1;
rank['Private'] = 2;
rank['Private *'] = 3;
rank['Private **'] = 4;
rank['Private ***'] = 5;
rank['Corporal'] = 6;
rank['Corporal *'] = 7;
rank['Corporal **'] = 8;
rank['Corporal ***'] = 9;
rank['Sergeant'] = 10;
rank['Sergeant *'] = 11;
rank['Sergeant **'] = 12;
rank['Sergeant ***'] = 13;
rank['Lieutenant'] = 14;
rank['Lieutenant *'] = 15;
rank['Lieutenant **'] = 16;
rank['Lieutenant ***'] = 17;
rank['Captain'] = 18;
rank['Captain *'] = 19;
rank['Captain **'] = 20;
rank['Captain ***'] = 21;
rank['Major'] = 22;
rank['Major *'] = 23;
rank['Major **'] = 24;
rank['Major ***'] = 25;
rank['Commander'] = 26;
rank['Commander *'] = 27;
rank['Commander **'] = 28;
rank['Commander ***'] = 29;
rank['Lt Colonel'] = 30;
rank['Lt Colonel *'] = 31;
rank['Lt Colonel **'] = 32;
rank['Lt Colonel ***'] = 33;
rank['Colonel'] = 34;
rank['Colonel *'] = 35;
rank['Colonel **'] = 36;
rank['Colonel ***'] = 37;
rank['General'] = 38;
rank['General *'] = 39;
rank['General **'] = 40;
rank['General ***'] = 41;
rank['Field Marshal'] = 42;
rank['Field Marshal *'] = 43;
rank['Field Marshal **'] = 44;
rank['Field Marshal ***'] = 45;
rank['Supreme Marshal'] = 46;
rank['Supreme Marshal *'] = 47;
rank['Supreme Marshal **'] = 48;
rank['Supreme Marshal ***'] = 49;
rank['National Force'] = 50;
rank['National Force *'] = 51;
rank['National Force **'] = 52;
rank['National Force ***'] = 53;
rank['World Class Force'] = 54;
rank['World Class Force *'] = 55;
rank['World Class Force **'] = 56;
rank['World Class Force ***'] = 57;
rank['Legendary Force'] = 58;
rank['Legendary Force *'] = 59;
rank['Legendary Force **'] = 60;
rank['Legendary Force ***'] = 61;
rank['God of War'] = 62;
rank['God of War *'] = 63;
rank['God of War **'] = 64;
rank['God of War ***'] = 65;

function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {

  return Math.floor(((militaryRank - 1) / 20 + 0.3) * ((strength / 10) + 40) * (1 + weaponPower / 100) * bonus) * fights;

}

function GM_wait() {

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $j = unsafeWindow.jQuery;
    letsJQuery();
  }

}
GM_wait();

// Seperate Numbers
function digits (number) { 
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); 
}

// Main()
function letsJQuery() {

  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }

  unsafeWindow.jQuery.fx.off = true;

  foodUrl = 'http://www.erepublik.com/en/main/eat?format=json&_token=' + $j('#' + $j('div.user_health input[type=hidden]').attr('id')).val() + '&jsoncallback=?';

  var styles = '<style type="text/css"> ' + 'div.BHTable { width: 180px; border: 1px solid #000; border-radius: 5px; padding: 5px; background-color: #262620; } ' + 'div.CHTable { width: 180px; border: 1px solid #000; border-radius: 5px; background-color: #262620; padding:5px; } ' + 'div.CHTable button { float:right; height:23px; }' + '#multihit_start { height:23px; float:right: margin: 0;}' + '#BHdivision { float:left; width:100px; margin:2px 0 0; }' + 'table.BHTable { margin: 0; width: 100%; font-size: 10px; text-align: left;} ' + 'table.BHTable tr { height: 10px; line-height: 12px;} ' + '#myStatBoxL, #myStatBoxR, #myOverBox { color: #fff; } ' + '#myStatBoxL a, #myStatBoxR a, #myOverBox a { color: #fff; }' + '#myStatBoxL a:hover, #myStatBoxR a:hover, #myOverBox a:hover { color: #0dd1ff; } ' + '#multihit_count { float:left; display:block; margin:0 !important; text-align:center;}' + '#MHP big { float:left; }' + '#multihit_start {margin: -2px 0 0; position: relative;}' + /*'#change_weapon{top:90px !important; left:150px !important;}' + */'#myStatBoxL strong,#myStatBoxR strong{float:right !important;}' + '.allies_tooltip{z-index:22 !important;}' + '</style>' ;

  $j('head').append(styles);

  var content = $j('div#pvp');
  content.prepend('<div id="myStatBoxL" style="z-index:21; position: absolute; top: 285px; left: 18px; width: 200px; opacity: 0.9;"></div>' + '<div id="myOverBox" style="z-index:1; position: absolute; top: 280px; left: 285px; width: 200px; opacity: 0.8;"></div>');
  content.append('<div id="myStatBoxR" style="z-index:21; position: absolute; top: 285px; left: 540px; width: 200px; opacity: 0.9;"></div>');

  content.append('<div id="MHP" style="position:relative; margin:-255px 0 0 311px; float:left; clear:both ;padding:5px; background-color:#262620; border-radius:5px; opacity:0.8; font-weight:bold; border:1px solid #000; color:#FFF; text-align:left; z-index:11; font-size:10px;">' + '<big>Kills:&nbsp;</big>' + '<input id="multihit_count"  type="text" size="3" maxlength="4" value="1"></input>' + '&nbsp;' + '<button id="multihit_start">KILL</button><br/>' + '&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food</label><br/>' + '&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;DO Not use Bazooka</label><br/>' + '&nbsp;<input type="checkbox" id="multihit_energy" name="multihit_energy"><label for="multihit_energy">&nbsp;Use EnergyBars</label><br/>' + /*'&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use HealthKits</label>' + '<button id="heros_update">Update</button>&nbsp;&nbsp;Hero Lists updated automatically, but you can still update them here' + '<div id="multihit_message" style="padding:2px;color:#ff0000"></div>*/'</div>');
  
  if (unsafeWindow.SERVER_DATA.battleFinished != 0) {

    $j('div#MHP').hide();

  }

  // always show domination
  $j('#blue_domination').css({
    'opacity': '1',
    'color': '#fff'
  });
  $j('#red_domination').css({
    'opacity': '1',
    'color': '#fff'
  });
  $j('b.pdomi_left').css({
    'width': '67px'
  });
  $j('b.pdomi_right').css({
    'width': '67px'
  });
  $j('b.pdomi_left em').css({
    'right': '5px',
    'opacity': '1',
    'color': '#fff'
  });
  $j('b.pdomi_right em').css({
    'left': '5px',
    'opacity': '1',
    'color': '#fff'
  });
  
  // show bazooka parts
  $j('#drop_part').css({
    'z-index': '3'
  });

  // remove idle timer
  $j(document).ready(function () {
    clearInterval(unsafeWindow.globalSleepInterval);
    unsafeWindow.shootLockout = 1;
  });

  // check hospital
  setInterval(function () {

    var h = $j('#heal_btn');

    if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

      unsafeWindow.useHospital();

    }

  }, 250);

  unsafeWindow.battleFX.hit = function () {

    if (multiHitRunning) {

      multiHitDone = multiHitDone + 1;
      currentHealth = unsafeWindow.SERVER_DATA.health;
     // $j('div#multihit_message').html('Health consumed: ' + multiHitDone * 10 + '&nbsp;&nbsp;Kills: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'Last Enemy killed!' : 'Last Enemy alive!') + ')');
      multiHitLastKilled = false;
      clearTimeout(multiHitLoopId);
      multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 1001);

    }

    return false;

  };

  unsafeWindow.battleFX.blow = function () {

    if (multiHitRunning) {

      multiHitEnemyKill++;
      multiHitLastKilled = true;

    }

    return false;

  };

  unsafeWindow.battleFX.pop = function (target, width) {

    if (target == 'enemy_defeated') {

      unsafeWindow.closeAddDamagePopup();

    } else if (target == 'rank_up') {

      unsafeWindow.closeAddRankPopup();

    } else {

      if (typeof (width) == 'undefined' || typeof (width) == undefined) width = '396px';

      var useTarget = $j('#' + target)[0]; // cache it
      $j('#pvp').block({
        message: useTarget,
        overlayCSS: {
          backgroundColor: '#000207',
          opacity: 0.5
        },
        css: {
          width: width
        }
      });

    }

    return false;

  };

  unsafeWindow.battleFX.countNextBattle = function (time) {
    // if we enter the next battle too fast, this function may be called again
    // with an invalid date() object, just refesh once more
    if (isNaN(time.getMonth())) {
      setTimeout(function () {
        top.location.href = document.location.href;
      }, 1000);
      return false;
    }

    $j('#time_until').countdown({
      until: time,
      format: 'MS',
      compact: true,
      description: '',
      onTick: checkTime
    });

    function checkTime(periods) {
      if ($j.countdown.periodsToSeconds(periods) == 0) {
        $j('#waiting').fadeOut('fast');
        $j('#waiting').removeClass('clock');
        $j('#notify_link').fadeIn('fast');
        $j('#notify_link').click();

        // wait a few seconds before refresh
        setTimeout(function () {
          top.location.href = document.location.href;
        }, 2000);
      }
    }

    return false;

  };

  unsafeWindow.jQuery.fn.getWell = function () {

    var h = $j('#heal_btn');
    var trigger = $j('#DailyConsumtionTrigger');

    if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

      unsafeWindow.useHospital();

    } else if (($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy') && !trigger.hasClass('energy')) || ($j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') && trigger.hasClass('energy'))) {

      $j('#heal_btn small').hide();
	  // NEW NEW NEW
	  $j('#DailyConsumtionTrigger').click();
	  clearTimeout(multiHitLoopId);
      multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);
	  //////////////////////////////////
    }/* else if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {
      $j('.health_kit_btn').click();
    }
*/
  };

  unsafeWindow.jQuery.fn.changeWeapon = function () {

    var url = "/en/military/change-weapon";
    unsafeWindow.ERPK.disableAllButtons();

    $j.post(url, {
      _token: unsafeWindow.SERVER_DATA.csrfToken,
      battleId: unsafeWindow.SERVER_DATA.battleId
    }, function (response) {

      unsafeWindow.updateFighterWeapon($j("#scroller").data("scrollable"), response);
      unsafeWindow.ERPK.enableAllButtons();

      if ($j(".listing span img").eq(-1).attr("src").indexOf("q10") !== -1) {

        multiHitRunning = false;
        $j('button#multihit_start').html('KILL');
        return;

      } else {

        clearTimeout(multiHitLoopId);
        multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);
        return;

      }

    }, 'json');

  };


  unsafeWindow.jQuery.fn.multiHIT = function () {

    if (unsafeWindow.globalStop || multiHitCount <= multiHitDone) {

      multiHitRunning = false;
      $j('button#multihit_start').html('KILL');
      return;

    }

    if (unsafeWindow.ERPK.canFire()) {

      // When changing, new one is added to the scroller, not replacing old one,
      // so must check the latest one.
      if ($j('input#multihit_bazooka').is(':checked') && $j(".listing span img").eq(-1).attr("src").indexOf("q10") !== -1) {

        unsafeWindow.jQuery.fn.changeWeapon();

      } else {

        unsafeWindow.shoot();

      }

    } else if (canGetWell()) {

      unsafeWindow.jQuery.fn.getWell();

    } else {

      multiHitRunning = false;
      $j('button#multihit_start').html('KILL');
      return;

    }

  };

  $j('button#multihit_start').click(function () {

    if (multiHitRunning) {

      clearTimeout(multiHitLoopId);
      multiHitRunning = false;
      $j('button#multihit_start').html('KILL');

    } else {

      multiHitCount = $j('input#multihit_count').val();

      if (multiHitCount > 0) {

        currentHealth = Number($j('strong#current_health').text());

        multiHitDone = 0;
        multiHitEnemyKill = 0;
        multiHitLastKilled = false;
        multiHitRunning = true;
        $j('button#multihit_start').html('<small>STOP</small>');

        unsafeWindow.jQuery.fn.multiHIT();

      }

    }

  });

  $j('button#heros_update').click(function () {

    $j.getJSON("/en/military/battle-stats/" + unsafeWindow.SERVER_DATA.battleId + "/" + unsafeWindow.SERVER_DATA.division, function (data) {});

  });

  $j("body").ajaxSuccess(function (e, res, opt) {

    if (opt.url.indexOf('/battle-stats/') > -1 && unsafeWindow.SERVER_DATA.onlySpectator != 1) {

      var att = unsafeWindow.SERVER_DATA.invaderId;
      var def = unsafeWindow.SERVER_DATA.defenderId;

      if (unsafeWindow.SERVER_DATA.mustInvert) {

        att = unsafeWindow.SERVER_DATA.defenderId;
        def = unsafeWindow.SERVER_DATA.invaderId;

      }

      var zone = unsafeWindow.SERVER_DATA.zoneId;
      var bh = eval("(" + res.responseText + ")");
      var history = bh['stats']['overall'][0][unsafeWindow.SERVER_DATA.countryId];

      // for BH Division select
      var top5HIST = '<select id="BHdivision" size="1">' + '<option value="1" ' + (unsafeWindow.SERVER_DATA.division == 1 ? 'selected="selected"' : '') + '>Division I</option><option value="2" ' + (unsafeWindow.SERVER_DATA.division == 2 ? 'selected="selected"' : '') + '>Division II</option><option value="3" ' + (unsafeWindow.SERVER_DATA.division == 3 ? 'selected="selected"' : '') + '>Division III</option><option value="4" ' + (unsafeWindow.SERVER_DATA.division == 4 ? 'selected="selected"' : '') + '>Division IV</option>' + '</select><button id="heros_update">Refresh</button>';

      for (var i = 0; i < history.length; i++) {

        top5HIST += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[history[i].citizen_id].id + '">' + bh.fightersData[history[i].citizen_id].name + '</a></td><td>' + history[i].kills + '</td><td style="text-align:right;"><strong>' + digits(history[i].damage) + '</strong></td></tr>';

      }

      // Calculate Wall Difference
      /* */
      
      histStats(top5HIST);

      top5ABH[0] = ''; top5ABH[1] = ''; top5ABH[2] = ''; top5ABH[3] = '';
      top5DBH[0] = ''; top5DBH[1] = ''; top5DBH[2] = ''; top5DBH[3] = '';

      var myDivision = $j('select#BHdivision').val(); // for BH Division select
      
      if (typeof bh['stats']['current'] == 'undefined') {
        return;
      }
      if (typeof bh['stats']['current'][zone] == 'undefined') {
        return;
      }

      for (var i = 0; i < 4; i++) {

        var division = (i + 1).toString();
        var aBHTotal = 0;
        var dBHTotal = 0;

        if (typeof bh['stats']['current'][zone][division][att] != 'undefined') {

          for (var j = 0; j < bh['stats']['current'][zone][division][att].length; j++) {

            top5ABH[i] += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[bh['stats']['current'][zone][division][att][j].citizen_id].id + '">' + bh.fightersData[bh['stats']['current'][zone][division][att][j].citizen_id].name + '</a></td><td>' + bh['stats']['current'][zone][division][att][j].kills + '</td><td><strong>' + digits(bh['stats']['current'][zone][division][att][j].damage) + '</strong></td></tr>';
            aBHTotal += Number(bh['stats']['current'][zone][division][att][j].damage);
          }

          top5ABH[i] += '<tr style="height:3px;"></tr><tr style="border-top:1px solid #FFF;"><td>Total Damage</td><td></td><td><strong>' + digits(aBHTotal) + '</strong></td></tr>';
        }

        if (typeof bh['stats']['current'][zone][division][def] != 'undefined') {

          for (var j = 0; j < bh['stats']['current'][zone][division][def].length; j++) {

            top5DBH[i] += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[bh['stats']['current'][zone][division][def][j].citizen_id].id + '">' + bh.fightersData[bh['stats']['current'][zone][division][def][j].citizen_id].name + '</a></td><td>' + bh['stats']['current'][zone][division][def][j].kills + '</td><td><strong>' + digits(bh['stats']['current'][zone][division][def][j].damage) + '</strong></td></tr>';
            dBHTotal += Number(bh['stats']['current'][zone][division][def][j].damage);
          }

          top5DBH[i] += '<tr style="height:3px;"></tr><tr style="border-top:1px solid #FFF;"><td>Total Damage</td><td></td><td><strong>' + digits(dBHTotal) + '</strong></td></tr>';
        }
      }

      if (unsafeWindow.SERVER_DATA.mustInvert == false)
        bhStats(top5DBH[Number(myDivision) - 1], top5ABH[Number(myDivision) - 1]);
      else
        bhStats(top5ABH[Number(myDivision) - 1], top5DBH[Number(myDivision) - 1]);

    }

    $j('select#BHdivision').change(function () {

      var myDivision = $j('select#BHdivision').val();

      if (unsafeWindow.SERVER_DATA.mustInvert == false)
        bhStats(top5DBH[Number(myDivision) - 1], top5ABH[Number(myDivision) - 1]);
      else
        bhStats(top5ABH[Number(myDivision) - 1], top5DBH[Number(myDivision) - 1]);

    });

  });
}