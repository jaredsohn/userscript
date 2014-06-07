// ==UserScript==
// @name         ZouZhiZhangBM
// @version      1.0
// @include      http://www.erepublik.com/*/military/battlefield/*
// @include      http://www.*.lindasc.com/*/military/battlefield/*
// @include      https://www.erepublik.com/*/military/battlefield/*
// @grant        GM_wait
// ==/UserScript==

var multiHitRunning = false;
var multiHitCount = 0;
var multiHitDone = 0;
var multiHitEnemyKill = 0;
var multiHitLastKilled = false;
var multiHitLoopId = 0;
var foodUrl = '';
var currentHealth = unsafeWindow.SERVER_DATA.health;
var fireAll = false;
function canGetWell() {
    var h = $j('#heal_btn');
    var trigger = $j('#DailyConsumtionTrigger');
    if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled')) {
        return true
    }
    if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy') && !trigger.hasClass('energy')) {
        return true
    }
    if ($j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') && trigger.hasClass('energy')) {
        return true
    }
    return false
}
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100)
    } else {
        $j = unsafeWindow.jQuery;
        letsJQuery()
    }
}
function letsJQuery() {
    if (typeof unsafeWindow == 'undefined') {
        unsafeWindow = window
    }
    unsafeWindow.jQuery.fx.off = true;
    foodUrl = location.href.match(/^(.*)military\/battlefield\/\d+.*$/)[1] + 'main/eat?format=json&_token=' + $j('#' + $j('div.user_health input[type=hidden]').attr('id')).val() + '&jsoncallback=?';
    fireAll = !!location.href.match(/^.*(\#BM_FIRE_ALL)$/);
    $j('div#enemy_defeated').before('<div id="MHP" style="position:relative;width:760px;float:left;clear:both;padding:3px;margin:5px 0;font-weight:bold;color:#000;text-align:center">' + 'Delay:&nbsp;<input id="multihit_delay" style="text-align:right;" type="text" size="3" maxlength="4" value="' + (fireAll ? '800' : '1001') + '" />' + '&nbsp;&nbsp;Consumed:&nbsp;<input id="multihit_count" style="text-align:right;" type="text" size="3" maxlength="4" value="' + (fireAll ? '9999' : '1') + '" />&nbsp;X 10 Energy&nbsp;' + '<button id="multihit_start">HIT!</button>&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food</label>' + '&nbsp;&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;Boycott Bazooka</label>' + '&nbsp;&nbsp;<input type="checkbox" id="multihit_energy" name="multihit_energy"' + (fireAll ? ' checked="checked"' : '') + '><label for="multihit_energy">&nbsp;Energy Bars</label>' + (fireAll ? '&nbsp;&nbsp;<big>Fire All Mode ON !!!</big>' : '') + '<div id="multihit_message" style="padding:2px;color:#ff0000;text-align:center"></div>');
    if (unsafeWindow.SERVER_DATA.battleFinished != 0) {
        $j('div#MHP').hide()
    }
    $j('#blue_domination').css({
        'opacity': '1',
        'color': '#fff'
    });
    $j('#red_domination').css({
        'opacity': '1',
        'color': '#fff'
    });
    $j('b.pdomi_left').css({ 'width': '67px' });
    $j('b.pdomi_right').css({ 'width': '67px' });
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
    $j('#drop_part').css({ 'z-index': '3' });
    $j(document).ready(function () {
        clearInterval(unsafeWindow.globalSleepInterval);
        unsafeWindow.shootLockout = 1
    });
    setInterval(function () {
        var h = $j('#heal_btn');
        if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {
            unsafeWindow.useHospital()
        }
    }, 250);
    unsafeWindow.battleFX.hit = function () {
        if (multiHitRunning) {
            multiHitDone = multiHitDone + (currentHealth - unsafeWindow.SERVER_DATA.health) / 10;
            currentHealth = unsafeWindow.SERVER_DATA.health;
            $j('div#multihit_message').html('Energy consumed: ' + multiHitDone * 10 + '&nbsp;&nbsp;Kills: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'Last Enemy killed!' : 'Last Enemy alive!') + ')');
            multiHitLastKilled = false;
            clearTimeout(multiHitLoopId);
            multiHitLoopId = setTimeout('jQuery.fn.multiHIT()', $j('input#multihit_delay').val())
        }
        return false
    };
    unsafeWindow.battleFX.blow = function () {
        if (multiHitRunning) {
            multiHitEnemyKill++;
            multiHitLastKilled = true
        }
        return false
    };
    unsafeWindow.battleFX.pop = function (target, width) {
        if (target == 'enemy_defeated') {
            unsafeWindow.closeAddDamagePopup()
        } else if (target == 'rank_up') {
            unsafeWindow.closeAddRankPopup()
        } else {
            if (typeof width == 'undefined' || typeof width == undefined)
                width = '396px';
            var useTarget = $j('#' + target)[0];
            $j('#pvp').block({
                message: useTarget,
                overlayCSS: {
                    backgroundColor: '#000207',
                    opacity: 0.5
                },
                css: { width: width }
            })
        }
        return false
    };
    unsafeWindow.battleFX.countNextBattle = function (time) {
        if (isNaN(time.getMonth())) {
            setTimeout(function () {
                top.location.href = document.location.href
            }, 1000);
            return false
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
                setTimeout(function () {
                    top.location.href = document.location.href
                }, 2000)
            }
        }
        return false
    };
    unsafeWindow.jQuery.fn.getWell = function () {
        var h = $j('#heal_btn');
        var trigger = $j('#DailyConsumtionTrigger');
        if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {
            unsafeWindow.useHospital()
        } else if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy') && !trigger.hasClass('energy') || $j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') && trigger.hasClass('energy')) {
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
                multiHitLoopId = setTimeout('jQuery.fn.multiHIT()', 250)
            })
        }
    };
    unsafeWindow.jQuery.fn.changeWeapon = function () {
        var url = '/en/military/change-weapon';
        unsafeWindow.ERPK.disableAllButtons();
        $j.post(url, {
            _token: unsafeWindow.SERVER_DATA.csrfToken,
            battleId: unsafeWindow.SERVER_DATA.battleId
        }, function (response) {
            unsafeWindow.updateFighterWeapon($j('#scroller').data('scrollable'), response);
            unsafeWindow.ERPK.enableAllButtons();
            if ($j('.listing span img').eq(-1).attr('src').indexOf('q10') !== -1) {
                multiHitRunning = false;
                $j('button#multihit_start').html('HIT!');
                return
            } else {
                clearTimeout(multiHitLoopId);
                multiHitLoopId = setTimeout('jQuery.fn.multiHIT()', 250);
                return
            }
        }, 'json')
    };
    unsafeWindow.jQuery.fn.multiHIT = function () {
        if (unsafeWindow.globalStop || multiHitCount <= multiHitDone) {
            multiHitRunning = false;
            $j('button#multihit_start').html('HIT!');
            return
        }
        if (unsafeWindow.ERPK.canFire()) {
            if ($j('input#multihit_bazooka').is(':checked') && $j('.listing span img').eq(-1).attr('src').indexOf('q10') !== -1) {
                unsafeWindow.jQuery.fn.changeWeapon()
            } else {
                unsafeWindow.shoot()
            }
        } else if (canGetWell()) {
            unsafeWindow.jQuery.fn.getWell()
        } else {
            multiHitRunning = false;
            $j('button#multihit_start').html('HIT!');
            return
        }
    };
    $j('button#multihit_start').click(function () {
        if (multiHitRunning) {
            clearTimeout(multiHitLoopId);
            multiHitRunning = false;
            $j('button#multihit_start').html('HIT!')
        } else {
            multiHitCount = $j('input#multihit_count').val();
            if (multiHitCount > 0) {
                currentHealth = Number($j('strong#current_health').text().split('/')[0]);
                multiHitDone = 0;
                multiHitEnemyKill = 0;
                multiHitLastKilled = false;
                multiHitRunning = true;
                $j('button#multihit_start').html('<strong>STOP!</strong>');
                unsafeWindow.jQuery.fn.multiHIT()
            }
        }
    });
    if (fireAll) {
        setInterval(function () {
            if (!multiHitRunning) {
                $j('button#multihit_start').click()
            }
            setTimeout(2000, callback)
        }, 2000)
    }
}
GM_wait()