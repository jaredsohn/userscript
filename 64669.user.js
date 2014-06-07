// ==UserScript==
// @name           Facebook Tycoon$ Harvester
// @namespace      Facebook
// @description    Autoharvest business resources periodically.
// @description    Original idea swiped from HiddenChilli
// @include        http://tycoons.fb.crunchyroll.com/businesses*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         Kevin L. Sitze
// ==/UserScript==

var interval = 250;
var duration = parseInt( GM_getValue( 'duration', String( 5 * 60 * 1000 ) ) ); // 5 minutes
var variance = parseInt( GM_getValue( 'variance', String( 1 * 60 * 1000 ) ) ); // 1 minute
var lastHarvestTime = parseInt( GM_getValue( 'lastHarvestTime', '0' ) );
var nextHarvestTime = parseInt( GM_getValue( 'nextHarvestTime', '0' ) );
if ( nextHarvestTime > lastHarvestTime + duration + variance ) {
    nextHarvestTime = lastHarvestTime; // harvest resources
}

// The following div was taken from HiddenChilli's script...
var harvest = $('.mogul-header');
$('<div class="business-progress-meter">\
  <div class="business-total-stock-meter clearfix" id="autoharvest-total" style="width: 96%;">\
    <div class="business-current-stock-meter" id="autoharvest-meter" style="width: 0%; height: 10px; position: absolute;"/>\
    <div style="font-size: 10px; position: absolute; width: 96%; text-align: center; color: black;" id="autoharvest-title"/>\
  </div>\
</div>').insertAfter( harvest );

// Allow user to configure period
$('<span>Harvest every </span>\
<input id="autoharvest-wait" type="text" name="duration" style="width: 5em;"/>\
<span> seconds with a variance of </span>\
<input id="autoharvest-vary" type="text" name="duration" style="width: 5em;"/>\
<span> seconds.</span>').insertAfter( harvest );
var durationInput = document.getElementById('autoharvest-wait');
var varianceInput = document.getElementById('autoharvest-vary');
durationInput.value = String( duration / 1000 );
varianceInput.value = String( variance / 1000 );

durationInput.addEventListener( 'change', changeDuration, false );
varianceInput.addEventListener( 'change', changeVariance, false );

function changeDuration()
{
    duration = parseInt( durationInput.value ) * 1000;
    GM_setValue( 'duration', duration.toString() );
}

function changeVariance()
{
    variance = parseInt( varianceInput.value ) * 1000;
    GM_setValue( 'variance', variance.toString() );
}

function autoHarvest()
{
    var now = new Date().getTime();
    var next = now + duration + Math.floor( Math.random() * variance );
    GM_setValue( 'lastHarvestTime', now.toString() );
    GM_setValue( 'nextHarvestTime', next.toString() );

    var title = 'Harvesting...';
    $('#autoharvest-meter').css( 'width', '96%' );
    $('#autoharvest-total').attr( 'title', title );
    $('#autoharvest-title').text( title );

    setTimeout( function() { GM_log( 'Tycoon$ AutoHarvest: performed page refresh' ); window.location.reload(); }, 10000 );

    $('.businesses-harvest-all-form').submit();
}

function formatTime( seconds )
{
    var minutes = seconds / 60;
    if ( minutes >= 0 ) {
        minutes = Math.floor( minutes );
    } else {                    // negative
        minutes = Math.ceil( minutes );
    }
    seconds %= 60;
    if ( minutes != 0 ) {
        return minutes + 'm ' + seconds + 's';
    } else {
        return seconds + 's';
    }
}

function countdown()
{
    var currentTime = new Date().getTime();
    if ( currentTime < nextHarvestTime ) {
        var totalPeriod = nextHarvestTime - lastHarvestTime;
        var meterPeriod = currentTime - lastHarvestTime;
        var secondsLeft = Math.floor( ( nextHarvestTime - currentTime ) / 1000 );
        var title = 'Harvest in ' + formatTime( secondsLeft );
        $('#autoharvest-meter').css( 'width', 96 * meterPeriod / totalPeriod + '%' );
        $('#autoharvest-total').attr( 'title', title );
        $('#autoharvest-title').text( title );
        setTimeout( countdown, interval );
    } else {
        autoHarvest();
    }
}

countdown();
