// ==UserScript==
// @name       eRepublik Battle xOx
// @version    Beta 0.1
// @ori author   eCitizen Scyld
// @edit author  
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
  $j('div#myStatBoxL').html('<div id="BHTableL">' + '<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + att + '</table></div>' + 

'</div>');
  $j('#BHTableR').remove();
  $j('div#myStatBoxR').html('<div id="BHTableR">' + '<div class="BHTable" style="float:right"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + def + '</table></div>' + 

'</div>');

}

function histStats(hist) {

  $j('#OOTable').remove();
  $j('div#myOverBox').html('<div id="OOTable">' + '<div class="CHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + hist + '</table></div>' + 

'<div style="clear:both;line-height:0px;height:0px;"></div></div>');

}

function canGetWell() {

  var h = $j('#heal_btn');
  var trigger = $j('#DailyConsumtionTrigger');

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

rank['Rekrut'] = 1;
rank['Prajurit tiga'] = 2;
rank['Prajurit dua *'] = 3;
rank['Prajurit satu **'] = 4;
rank['Prajurit kepala ***'] = 5;
rank['Kopral tiga'] = 6;
rank['Kopral dua *'] = 7;
rank['Kopral satu **'] = 8;
rank['Kopral kepala ***'] = 9;
rank['Sersan Dua'] = 10;
rank['Sersan satu *'] = 11;
rank['sersan kepala **'] = 12;
rank['sersan mayor ***'] = 13;
rank['Letnan empat'] = 14;
rank['Letnan tiga *'] = 15;
rank['Letnan dua **'] = 16;
rank['Letnan Satu ***'] = 17;
rank['Kapten Empat'] = 18;
rank['Kapten Tiga *'] = 19;
rank['Kapten Dua **'] = 20;
rank['Kapten Satu ***'] = 21;
rank['Mayor Empat'] = 22;
rank['Mayor Tiga *'] = 23;
rank['Mayor Dua **'] = 24;
rank['Mayor Satu ***'] = 25;
rank['Komandan Empat'] = 26;
rank['Komandan Tiga *'] = 27;
rank['Komandan Dua **'] = 28;
rank['Komandan Satu ***'] = 29;
rank['Letkol Empat'] = 30;
rank['Letkol Tiga *'] = 31;
rank['Letkol Dua **'] = 32;
rank['Letkol Satu ***'] = 33;
rank['Kolonel Empat'] = 34;
rank['Kolonel Tiga *'] = 35;
rank['Kolonel Dua **'] = 36;
rank['Kolonel Satu ***'] = 37;
rank['Jendral Empat'] = 38;
rank['Jendral Tiga *'] = 39;
rank['Jendral Dua **'] = 40;
rank['Jendral Satu ***'] = 41;
rank['Marsekal Pertama'] = 42;
rank['Marsekal Pertama *'] = 43;
rank['Marsekal Pertama **'] = 44;
rank['Marsekal Pertama ***'] = 45;
rank['Marsekal Muda'] = 46;
rank['Marsekal Muda *'] = 47;
rank['Marsekal Muda **'] = 48;
rank['Marsekal Muda ***'] = 49;
rank['Marsekal Madya'] = 50;
rank['Marsekal Madya *'] = 51;
rank['Marsekal Madya **'] = 52;
rank['Marsekal Madya ***'] = 53;
rank['Marsekal'] = 54;
rank['Marsekal *'] = 55;
rank['Marsekal **'] = 56;
rank['Marsekal ***'] = 57;
rank['Jendral Besar'] = 58;
rank['Jendral Besar *'] = 59;
rank['Jendral Besar **'] = 60;
rank['Jendral Besar ***'] = 61;
rank['God of Waria'] = 62;
rank['God of Waria *'] = 63;
rank['God of Waria **'] = 64;
rank['God of Waria ***'] = 65;

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

  var styles = '<style type="text/css"> ' + 'div.BHTable { width: 180px; height: 85px; border: 1px solid #000; border-radius: 5px; padding: 6px; background-color: #262620; } ' + 'div.CHTable { width: 180px; 

height: 92px; border: 1px solid #000; border-radius: 5px; padding: 1px 3px 3px; background-color: #262620; } ' + 'table.BHTable { margin: 0; padding: 2px; width: 100%; font-size: 10px; text-align: left; } ' + 

'table.BHTable tr { height: 10px; line-height: 12px;} ' + '#myStatBoxL, #myStatBoxR, #myOverBox { color: #fff; } ' + '#myStatBoxL a, #myStatBoxR a, #myOverBox a { color: #fff; }' + '#myStatBoxL a:hover, 

#myStatBoxR a:hover, #myOverBox a:hover { color: #0dd1ff; } ' + '#multihit_start {margin-top: 0px; margin-left: 0px; margin-bottom: 0px; position: relative;}' + '#change_weapon{top:90px !important; 

left:150px !important;}' + '#myStatBoxL strong,#myStatBoxR strong{float:right !important; margin:0px;}' + '.allies_tooltip{z-index:22 !important;}' + '</style>' ;

  $j('head').append(styles);

  var content = $j('div#pvp');
  content.prepend('<div id="myStatBoxL" style="z-index:21; position: absolute; top: 375px; left: 18px; width: 200px; opacity: 0.9;"></div>' + '<div id="myOverBox" style="z-index:1; position: absolute; top: 

280px; left: 285px; width: 200px; opacity: 0.8;"></div>');
  content.append('<div id="myStatBoxR" style="z-index:21; position: absolute; top: 375px; left: 540px; width: 200px; opacity: 0.9;"></div>');

  $j('div#enemy_defeated').before('<div id="MHP" style="position:relative;margin:-370px 0 0 308px;float:left;clear:both;padding:5px;background-color:#262620;border-radius:5px;opacity:0.8;font-

weight:bold;border:1px solid #000;color:#FFF;text-align:left;z-index:11;font-size:10px;">' + '<big>Kills:&nbsp;</big>' + '<input id="multihit_count" style="text-align:right;" type="text" size="3" maxlength="4" 

value="1" />' + '&nbsp;' + '<button id="multihit_start">KILL</button><br />' + '&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label 

for="multihit_food">&nbsp;Eat food</label><br/>' + '&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;DO Not use 

Bazooka</label><br/>' + '&nbsp;<input type="checkbox" id="multihit_energy" name="multihit_energy"><label for="multihit_energy">&nbsp;Use EnergyBars</label><br/>' + /*'&nbsp;<input 

type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use HealthKits</label>' + '<button id="heros_update">Update</button>&nbsp;&nbsp;Hero Lists updated 

automatically, but you can still update them here' + '<div id="multihit_message" style="padding:2px;color:#ff0000"></div>*/'</div>');
  
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

    } else if (($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy') && !trigger.hasClass('energy')) || ($j('input#multihit_energy').is(':checked') && !trigger.hasClass

('disabled') && trigger.hasClass('energy'))) {

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
      var top5HIST = 'Division: <select id="BHdivision" size="1">' + '<option value="1" ' + (unsafeWindow.SERVER_DATA.division == 1 ? 'selected="selected"' : '') + '>Division I</option><option value="2" ' + 

(unsafeWindow.SERVER_DATA.division == 2 ? 'selected="selected"' : '') + '>Division II</option><option value="3" ' + (unsafeWindow.SERVER_DATA.division == 3 ? 'selected="selected"' : '') + '>Division 

III</option><option value="4" ' + (unsafeWindow.SERVER_DATA.division == 4 ? 'selected="selected"' : '') + '>Division IV</option>' + '</select>';

      for (var i = 0; i < history.length; i++) {

        top5HIST += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[history[i].citizen_id].id + '">' + bh.fightersData[history[i].citizen_id].name + 

'</a></td><td>' + history[i].kills + '</td><td><strong>' + digits(history[i].damage) + '</strong></td></tr>';

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

            top5ABH[i] += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[bh['stats']['current'][zone][division][att][j].citizen_id].id + '">' + bh.fightersData[bh

['stats']['current'][zone][division][att][j].citizen_id].name + '</a></td><td>' + bh['stats']['current'][zone][division][att][j].kills + '</td><td><strong>' + digits(bh['stats']['current'][zone][division][att][j].damage) + 

'</strong></td></tr>';
            aBHTotal += Number(bh['stats']['current'][zone][division][att][j].damage);
          }

          top5ABH[i] += '<tr><td>Total Damage</td><td>--</td><td><strong>' + digits(aBHTotal) + '</strong></td></tr>';
        }

        if (typeof bh['stats']['current'][zone][division][def] != 'undefined') {

          for (var j = 0; j < bh['stats']['current'][zone][division][def].length; j++) {

            top5DBH[i] += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[bh['stats']['current'][zone][division][def][j].citizen_id].id + '">' + bh.fightersData[bh

['stats']['current'][zone][division][def][j].citizen_id].name + '</a></td><td>' + bh['stats']['current'][zone][division][def][j].kills + '</td><td><strong>' + digits(bh['stats']['current'][zone][division][def][j].damage) 

+ '</strong></td></tr>';
            dBHTotal += Number(bh['stats']['current'][zone][division][def][j].damage);
          }

          top5DBH[i] += '<tr><td>Total Damage</td><td>--</td><td><strong>' + digits(dBHTotal) + '</strong></td></tr>';
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