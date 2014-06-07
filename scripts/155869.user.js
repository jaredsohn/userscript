// ==UserScript==
// @name		eRepublik AutoHit
// @author		phist
// @version		0.3
// @grant       GM_getValue
// @grant       GM_setValue
// @include		http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

var multiHitRunning = false;
var multiHitCount = 0;
var multiHitDone = 0;
var multiHitEnemyKill = 0;
var multiHitLastKilled = false;
var multiHitLoopId = 0;
var foodUrl = "";
var currentHealth = (location.href.match(/citizen\/profile\/(\d+)$/) ? 0 : unsafeWindow.SERVER_DATA.health);

// replace all @oldstr to @replacestr in string @str
function str_replace(str, oldstr, replacestr) {
  return str.split(oldstr).join(replacestr);
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
  return false;
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

// Main()
function letsJQuery() {
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
  unsafeWindow.jQuery.fx.off = true;
  var styles = '<style type="text/css"> ' + '#multihit_start {margin-top: 0px; margin-left: 0px; margin-bottom: 0px; position: relative;}' + '</style>' ;
  $j('head').append(styles);
  $j('div#enemy_defeated').before('<div id="MHP" style="position:relative;margin:-352px 0 0 317px;float:left;clear:both;padding:5px;background-color:#262620;border-radius:4px;opacity:0.6;font-weight:bold;border:1px solid #000;color:#FFF;text-align:left;z-index:11;font-size:10px;">' + '<big>Hits:&nbsp;</big>' + '<input id="multihit_count" style="text-align:right;" type="text" size="3" maxlength="4" value="1" />' + '&nbsp;' + '<button id="multihit_start">Hit</button><br />' + '&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food</label><br/>' + '&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;Dont use Bazooka</label><br/>' + '&nbsp;<input type="checkbox" id="multihit_energy" name="multihit_energy"><label for="multihit_energy">&nbsp;Use EnergyBars</label><br/></div>');
  
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
  
  // show bazooka parts
  $j('#drop_part').css({
    'z-index': '3'
  });
    
  // remove idle timer
  $j(document).ready(function () {
    clearInterval(unsafeWindow.globalSleepInterval);
    unsafeWindow.shootLockout = 1;
  });
  unsafeWindow.battleFX.hit = function () {
    if (multiHitRunning) {
      multiHitDone = multiHitDone + 1;
      currentHealth = unsafeWindow.SERVER_DATA.health;
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
	  $j('#DailyConsumtionTrigger').click();
	  clearTimeout(multiHitLoopId);
      multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);
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
        $j('button#multihit_start').html('Hit');
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
      $j('button#multihit_start').html('Hit');
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
      $j('button#multihit_start').html('Hit');
      return;
    }
  };
  $j('button#multihit_start').click(function () {
    if (multiHitRunning) {
      clearTimeout(multiHitLoopId);
      multiHitRunning = false;
      $j('button#multihit_start').html('Hit');
    } else {
      multiHitCount = $j('input#multihit_count').val();
      if (multiHitCount > 0) {
        currentHealth = Number($j('strong#current_health').text());
        multiHitDone = 0;
        multiHitEnemyKill = 0;
        multiHitLastKilled = false;
        multiHitRunning = true;
        $j('button#multihit_start').html('Stop');
        unsafeWindow.jQuery.fn.multiHIT();
      }
    }
  });
}