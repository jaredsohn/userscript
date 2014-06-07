// ==UserScript==
// @name           HidePromo and Refill Auto
// @namespace      eRepublik.om
// @include        http*://*.erepublik.com/*
// @version        1.40
// @description    eRep Summit remove
// @description    1.37 add checkbox to remove all achievments from wall
// @description    1.39 fix for removing achievments including PVP info
// ==/UserScript==


// Upewniamy siÄ™ czy wymagana eRepowa jQuery jest zaĹ‚adowana
var interval;  //interval handler
var refreshTime;  //time left to refill
var where; //location where we are current


function GM_wait() {

    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        $j = unsafeWindow.jQuery;
        letsJQuery();
    }

}
GM_wait();


function letsJQuery() {
    where = location.href;
    addCheckbox();
    interval = setInterval(check,361000);
    intervalA = setInterval(checkA,1000);
    hidePromo();
    if(where.search("exchange-market") != -1) buyAll();
}

function check() {
    //1 not full
    //2 not energy bar
    //3 have something to eat
    if(isEnabledCheckBox() && canRecover() && hasFood() && isEnabledFoodButton()  ) {
        eatFood();
    }
}

function checkA() {
    if(isEnabledCheckBoxA()) removeAchievmentsOnPostWall();
}
function isEnabledFoodButton() {
    
    if($j('#current_health').text() != "650 / 650") {
        return true;
    }
    clearInterval(interval);
    $j('#auto_eat').attr("checked",false);
    return false;
}
function isEnabledCheckBox() {
    return $j("#checkbox input").is(":checked");
}
function isEnabledCheckBoxA() {
    return $j("#hide_achievments").is(":checked");
}

function eatFood() {
    window.document.getElementById("DailyConsumtionTrigger").click();
}
function canRecover() {
    if(Number($j(".tooltip_health_limit").text()) > 0) {
        log('can recover');
        return true;
    }
    return false;
}
function hidePromo() {
    $j(".damage_booster").delay(2000).hide('slow');
    $j(".cheaper_30").delay(2000).hide('slow');
    $j(".off30gold").delay(2000).hide('slow');
    $j(".t3").delay(2000).hide('slow');
    $j(".company44").delay(2000).hide('slow');
    $j(".company44All").delay(2000).hide('slow');
    $j(".energy_promo").delay(2000).hide('slow');
    $j(".damage_booster_new").delay(2000).hide('slow');
    $j(".bazooka_parts").delay(2000).hide('slow');
    $j(".mass_banner").delay(2000).hide('slow');
    $j(".rocket_factory_banner").delay(2000).hide('slow');
    $j(".companyq7").delay(2000).hide('slow');
    $j(".banner_alliances").delay(2000).hide('slow');
    $j(".eos_sales").delay(2000).hide('slow');
    $j(".matomyBanner").delay(2000).hide('slow');
    $j(".t4").delay(2000).hide('slow');
    $j(".rocket_factory_banner_2in1").delay(2000).hide('slow');
    $j(".halloween_banner").delay(2000).hide('slow');
    $j(".batzooka_parts").delay(2000).hide('slow');
    $j(".homepage_5years_promo").delay(2000).hide('slow');
    $j(".banner_place").delay(2000).hide('slow');
    $j(".off50gold").delay(2000).hide('slow');
    $j(".black_friday_banner").delay(2000).hide('slow');
    $j(".anniversary_feed_advert").delay(2000).hide('slow');
    $j('a').each(function() { if($j(this).attr('title') == 'Summit Confirmation') $j(this).delay(2000).hide('slow');});
    
}
function addCheckbox() {
    value = GM_getValue("checkboxState",false);
    hideAchievmentsCheckbox = GM_getValue("checkboxStateA",false);
    log(value + ' ' + hideAchievmentsCheckbox);
    $j("#foodResetHoursContainer").css('padding-top','5px');
    $j('<div id="checkbox" style="margin-top: 35px; padding: 0 0 0 15px; clear: left;"><input type="checkbox"  id="auto_eat" />  Check to auto eat<div>').insertBefore('#DailyConsumtionTrigger');
    $j('<div id="checkboxA" style="margin-top:20px;padding: 0 0 0 5px; float: right;"><input type="checkbox"  id="hide_achievments"/> Hide medals</div>').insertBefore('#wall_master');
    $j('#auto_eat').attr("checked",value);
    $j("#auto_eat").click(changeState);
    $j('#hide_achievments').attr("checked",hideAchievmentsCheckbox);
    $j("#hide_achievments").click(changeStateA);
}

function changeState() {
    setTimeout(function() {
        GM_setValue("checkboxState",$j('#auto_eat').is(":checked"))
    },0);
}
function changeStateA() {
    setTimeout(function() {
        GM_setValue("checkboxStateA",$j('#hide_achievments').is(":checked"))
    },0);
}
function buyAll() {
    setInterval(function(){
        $j('.ex_buy input').each(function() {
            amount = $j(this).parents('tr').children('.ex_amount').children().children('span').text();
            if(amount > 10) amount = '10.00';
            $j(this).val(amount);
        });
    }, 1000);
    
}
function log(value) {
    unsafeWindow.console.log(value);
}
function hasFood() {
    if($j('#foodText').text() == "Energy Bar") {
        log('has not food');
        return false;
    }
    log('has food');
    return true;
}

function removeAchievmentsOnPostWall() {
    $j('img[src^="/images/achievements/"]').parents('.wall_post').hide();
    $j('img[src^="/images/modules/pvpgame/weapons/"]').parents('.wall_post').hide();
    $j('.auto_text').parents('.wall_post').hide();
}