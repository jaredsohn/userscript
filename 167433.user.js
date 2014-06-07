// ==UserScript==
// @name       eRepublik Battle Master
// @version    1.0.8
// @ori author   eCitizen Scyld
// @edit author  eCitizen syusyou
// @link       http://userscripts.org/scripts/review/135994
// @include    http://www.erepublik.com/*/citizen/profile/*
// @include    http://www.erepublik.com/*/military/battlefield/*
// @grant       unsafeWindow
// ==/UserScript==

// replace all @oldstr to @replacestr in string @str
function str_replace(str, oldstr, replacestr) {
  return str.split(oldstr).join(replacestr);
}

function bhStats(att, def) {

  $j('#BHTableL').remove();
  $j('div#myStatBoxL').html('<div id="BHTableL">' + '<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Damage</th></tr>' + att + '</table></div>' + '</div>');
  $j('#BHTableR').remove();
  $j('div#myStatBoxR').html('<div id="BHTableR">' + '<div class="BHTable" style="float:right"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Damage</th></tr>' + def + '</table></div>' + '</div>');

}

function histStats(hist) {

  $j('#OOTable').remove();
  $j('div#myOverBox').html('<div id="OOTable">' + '<div class="CHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Damage</th></tr>' + hist + '</table></div>' + '</div>');

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

// Main()
function letsJQuery() {

  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }

  if (location.href.match(/citizen\/profile\/(\d+)$/)) {

    var str = parseFloat(str_replace($j('div.citizen_military:eq(0) h4').text().trim(), ',', ''));
    var Rank = rank[$j('div.citizen_military:eq(1) img').attr('src').split('/')[6].split('.')[0]];

    $j('div.citizen_military:last').after('<h3>Damage statistics</h3>' + '<div class="citizen_military">' + '<strong>Max hit: </strong>' + '<h4 style="margin-left:45px">' + dmgCalc(Rank, str, 200, 1, 1) + '</h4>' + '<div class="stat"><small>' + ' q0: ' + dmgCalc(Rank, str, 0, 1, 1) + ' q1: ' + dmgCalc(Rank, str, 20, 1, 1) + ' q2: ' + dmgCalc(Rank, str, 40, 1, 1) + '<br />q3: ' + dmgCalc(Rank, str, 60, 1, 1) + ' q4: ' + dmgCalc(Rank, str, 80, 1, 1) + ' q5: ' + dmgCalc(Rank, str, 100, 1, 1) + '<br />q6: ' + dmgCalc(Rank, str, 120, 1, 1) + ' q7: ' + dmgCalc(Rank, str, 200, 1, 1) + '</small></div></div>' + '<h3>Damage calculator' + '<span style="float:right">Weapon: <select id="dmgWeapon" size="1">' + '<option value="0">Q0</option><option value="20">Q1</option><option value="40">Q2</option><option value="60">Q3</option>' + '<option value="80">Q4</option><option value="100">Q5</option><option value="120">Q6</option><option value="200" selected="selected">Q7</option>' + '</select>&nbsp;&nbsp;&nbsp;&nbsp;# of fights: <input id="dmgFights" name="dmgFights" value="0" size="4" maxlength="4" />' + '&nbsp;<button id="dmgCalc">go!</button>' + '</span></h3><div class="citizen_military" style="margin-bottom:2px">' + '<div id="dmgResults"><strong>0 fights: </strong>' + '<h4 style="margin-left:37px">' + dmgCalc(Rank, str, 200, 0, 1) + '</h4>' + '<div class="stat"><small>With NE bonus: <strong><span style="font-size:12px;margin-right:15px">' + dmgCalc(Rank, str, 200, 0, 1.1) + '</span></strong></small></div></div></div>');

    $j('button#dmgCalc').click(function () {

      var fights = $j('input#dmgFights').val();

      $j('div#dmgResults').html('<strong>' + fights + ' fights: </strong>' + '<h4 style="margin-left:37px">' + dmgCalc(Rank, str, $j('select#dmgWeapon').val(), fights, 1) + '</h4>' + '<div class="stat"><small>With NE bonus: <strong><span style="font-size:12px;margin-right:15px">' + dmgCalc(Rank, str, $j('select#dmgWeapon').val(), fights, 1.1) + '</span></strong></small></div>');

    });

    $j('select#dmgWeapon').change(function () {

      $j('button#dmgCalc').click();

    });

    return;

  }

  unsafeWindow.jQuery.fx.off = true;

  foodUrl = 'http://www.erepublik.com/en/main/eat?format=json&_token=' + $j('#' + $j('div.user_health input[type=hidden]').attr('id')).val() + '&jsoncallback=?';

  var styles = '<style type="text/css"> ' + 'div.BHTable { width: 180px; height: 85px; border: 1px solid #777; border-radius: 5px; padding: 6px; background-color: #333; } ' + 'div.CHTable { width: 180px; height: 105px; border: 1px solid #777; border-radius: 5px; padding: 6px; background-color: #333; } ' + 'table.BHTable { margin: 0; padding: 2px; width: 100%; font-size: 10px; text-align: left; } ' + 'table.BHTable tr { height: 10px; line-height: 12px; } ' + '#myStatBoxL, #myStatBoxR, #myOverBox { color: #fff; } ' + '#myStatBoxL a, #myStatBoxR a, #myOverBox a { color: #abc; } ' + '#multihit_start {margin-top: 0px; margin-left: 0px; margin-bottom: 0px; position: relative;}' + '</style>';

  $j('head').append(styles);

  var content = $j('div#pvp');
  content.prepend('<div id="myStatBoxL" style="z-index:1; position: absolute; top: 430px; left: 18px; width: 200px; opacity: 0.8;"></div>' + '<div id="myOverBox" style="z-index:1; position: absolute; top: 280px; left: 285px; width: 200px; opacity: 0.8;"></div>');
  content.append('<div id="myStatBoxR" style="z-index:1; position: absolute; top: 405px; left: 540px; width: 200px; opacity: 0.8;"></div>');

  $j('div#enemy_defeated').before('<div id="MHP" style="position:relative;width:836px;float:left;clear:both;padding:3px;margin:5px 0;font-weight:bold;color:#000;text-align:center">' + '<big>Expect Energy Consumed:&nbsp;</big>' + '<input id="multihit_count" style="text-align:right;" type="text" size="3" maxlength="4" value="1" />' + '&nbsp;X 10 Energy&nbsp;' + '<button id="multihit_start">HIT!</button><br />' + '&nbsp;&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food when needed</label>' + '&nbsp;&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;Not use Bazooka</label><br />' + '<input type="checkbox" id="multihit_energy" name="multihit_energy"><label for="multihit_energy">&nbsp;Use Energy Bars if no more food</label>' + '&nbsp;&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use First Aid Kit if no more food</label><br /><br />' + '<button id="heros_update">Update</button>&nbsp;&nbsp;Hero Lists updated automatically, but you can still update them here' + '<div id="multihit_message" style="padding:2px;color:#ff0000"></div></div>');

  $j(".player").css("margin-top", "30px")
  $j("#myStatBoxL").css("top", "385px")
  $j("#myStatBoxR").css("top", "385px")
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

      multiHitDone = multiHitDone + (currentHealth - unsafeWindow.SERVER_DATA.health) / 10;
      currentHealth = unsafeWindow.SERVER_DATA.health;
      $j('div#multihit_message').html('Energy consumed: ' + multiHitDone * 10 + '&nbsp;&nbsp;Kills: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'Last Enemy killed!' : 'Last Enemy alive!') + ')');
      multiHitLastKilled = false;
      clearTimeout(multiHitLoopId);
      multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 1001); //1001

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
      h.removeClass('hospital_btn');
      h.attr('title', 'Consume Food');
      unsafeWindow.ERPK.disableHealButton();
      $j('#DailyConsumtionTrigger').addClass('load');
      $j.getJSON(foodUrl, {}, function (data) {

        $j('#DailyConsumtionTrigger').removeClass('load');
        data.health = parseFloat(data.health);
        var wellInc = data.health - unsafeWindow.SERVER_DATA.health;
        currentHealth = data.health;
        unsafeWindow.energy.processResponse(data);

        clearTimeout(multiHitLoopId);
        multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);

      });

    } else if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {

      $j('.health_kit_btn').click();

    }

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
        $j('button#multihit_start').html('HIT!');
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
      $j('button#multihit_start').html('HIT!');
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
      $j('button#multihit_start').html('HIT!');
      return;

    }

  };

  $j('button#multihit_start').click(function () {

    if (multiHitRunning) {

      clearTimeout(multiHitLoopId);
      multiHitRunning = false;
      $j('button#multihit_start').html('HIT!');

    } else {

      multiHitCount = $j('input#multihit_count').val();

      if (multiHitCount > 0) {

        currentHealth = Number($j('strong#current_health').text().split('/')[0]);

        multiHitDone = 0;
        multiHitEnemyKill = 0;
        multiHitLastKilled = false;
        multiHitRunning = true;
        $j('button#multihit_start').html('<strong>STOP!</strong>');

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
      var top5HIST = 'Division: <select id="BHdivision" size="1">' + '<option value="1" ' + (unsafeWindow.SERVER_DATA.division == 1 ? 'selected="selected"' : '') + '>Division I</option><option value="2" ' + (unsafeWindow.SERVER_DATA.division == 2 ? 'selected="selected"' : '') + '>Division II</option><option value="3" ' + (unsafeWindow.SERVER_DATA.division == 3 ? 'selected="selected"' : '') + '>Division III</option><option value="4" ' + (unsafeWindow.SERVER_DATA.division == 4 ? 'selected="selected"' : '') + '>Division IV</option>' + '</select>';

      for (var i = 0; i < history.length; i++) {

        top5HIST += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[history[i].citizen_id].id + '">' + bh.fightersData[history[i].citizen_id].name + '</a></td><td>' + history[i].kills + '</td><td><strong>' + history[i].damage + '</strong></td></tr>';

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

            top5ABH[i] += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[bh['stats']['current'][zone][division][att][j].citizen_id].id + '">' + bh.fightersData[bh['stats']['current'][zone][division][att][j].citizen_id].name + '</a></td><td>' + bh['stats']['current'][zone][division][att][j].kills + '</td><td><strong>' + bh['stats']['current'][zone][division][att][j].damage + '</strong></td></tr>';
            aBHTotal += Number(bh['stats']['current'][zone][division][att][j].damage);
          }

          top5ABH[i] += '<tr><td>Total Damage</td><td>--</td><td><strong>' + aBHTotal + '</strong></td></tr>';
        }

        if (typeof bh['stats']['current'][zone][division][def] != 'undefined') {

          for (var j = 0; j < bh['stats']['current'][zone][division][def].length; j++) {

            top5DBH[i] += '<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/' + bh.fightersData[bh['stats']['current'][zone][division][def][j].citizen_id].id + '">' + bh.fightersData[bh['stats']['current'][zone][division][def][j].citizen_id].name + '</a></td><td>' + bh['stats']['current'][zone][division][def][j].kills + '</td><td><strong>' + bh['stats']['current'][zone][division][def][j].damage + '</strong></td></tr>';
            dBHTotal += Number(bh['stats']['current'][zone][division][def][j].damage);
          }

          top5DBH[i] += '<tr><td>Total Damage</td><td>--</td><td><strong>' + dBHTotal + '</strong></td></tr>';
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
var rank = new Array;
rank['recruit_0'] = 1;
rank['private_0'] = 2;
rank['private_1'] = 3;
rank['private_2'] = 4;
rank['private_3'] = 5;
rank['corporal_0'] = 6;
rank['corporal_1'] = 7;
rank['corporal_2'] = 8;
rank['corporal_3'] = 9;
rank['sergeant_0'] = 10;
rank['sergeant_1'] = 11;
rank['sergeant_2'] = 12;
rank['sergeant_3'] = 13;
rank['lieutenant_0'] = 14;
rank['lieutenant_1'] = 15;
rank['lieutenant_2'] = 16;
rank['lieutenant_3'] = 17;
rank['captain_0'] = 18;
rank['captain_1'] = 19;
rank['captain_2'] = 20;
rank['captain_3'] = 21;
rank['major_0'] = 22;
rank['major_1'] = 23;
rank['major_2'] = 24;
rank['major_3'] = 25;
rank['commander_0'] = 26;
rank['commander_1'] = 27;
rank['commander_2'] = 28;
rank['commander_3'] = 29;
rank['lt_colonel_0'] = 30;
rank['lt_colonel_1'] = 31;
rank['lt_colonel_2'] = 32;
rank['lt_colonel_3'] = 33;
rank['colonel_0'] = 34;
rank['colonel_1'] = 35;
rank['colonel_2'] = 36;
rank['colonel_3'] = 37;
rank['general_0'] = 38;
rank['general_1'] = 39;
rank['general_2'] = 40;
rank['general_3'] = 41;
rank['field_marshal_0'] = 42;
rank['field_marshal_1'] = 43;
rank['field_marshal_2'] = 44;
rank['field_marshal_3'] = 45;
rank['supreme_marshal_0'] = 46;
rank['supreme_marshal_1'] = 47;
rank['supreme_marshal_2'] = 48;
rank['supreme_marshal_3'] = 49;
rank['national_force_0'] = 50;
rank['national_force_1'] = 51;
rank['national_force_2'] = 52;
rank['national_force_3'] = 53;
rank['world_class_force_0'] = 54;
rank['world_class_force_1'] = 55;
rank['world_class_force_2'] = 56;
rank['world_class_force_3'] = 57;
rank['legendary_force_0'] = 58;
rank['legendary_force_1'] = 59;
rank['legendary_force_2'] = 60;
rank['legendary_force_3'] = 61;
rank['god_of_war_0'] = 62;
rank['god_of_war_1'] = 63;
rank['god_of_war_2'] = 64;
rank['god_of_war_3'] = 65;
rank['titan_0'] = 66;
rank['titan_1'] = 67;
rank['titan_2'] = 68;
rank['titan_3'] = 69;
GM_wait();