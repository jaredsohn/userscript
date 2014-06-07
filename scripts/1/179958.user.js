// ==UserScript==
// @name        LoungePremium
// @namespace   http://dota2lounge.com/
// @description http://dota2lounge.com/
// @include     http://dota2lounge.com/*
// @include     http://*.dota2lounge.com/*
// @version     1.7
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @require     http://cdn.dota2lounge.com/script/trades.js?v=07
// @require 	http://cdn.dota2lounge.com/script/jquery.quick.pagination.min.js
// @grant       none
// ==/UserScript==

var intID = 0;
var URI = window.location.toString();
var postID = URI.replace(/http:\/\/dota2lounge\.com\/trade\?t=/gim, '');
var newElementUp = '<div style="border-radius: 0 100% 0 0; position: fixed; left: 0; top: 30%; height: 20%; width: 10px;background: #334; cursor: pointer" id="upButton" onMouseLeave="$(\'#upButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#upButton\').css(\'background\', \'#888\');" title="Go on top" onClick="$(\'html,body\').animate({\'scrollTop\':0},\'slow\');"></div>';
var newElementDown = '<div style="border-radius: 0 0 100% 0; position: fixed; left: 0; bottom: 31%; height: 20%; width: 10px;background: #334; cursor: pointer" id="downButton" onMouseLeave="$(\'#downButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#downButton\').css(\'background\', \'#888\');" title="Go on top" onClick="var height=document.body.scrollHeight;$(\'html,body\').animate({\'scrollTop\':height},\'slow\');"></div>';
var newElementTrades = '<div style="text-align:center; position: fixed; right: 0; bottom: 0; height: 139px; width: 30px;background: #334; cursor: pointer" id="tradeButton" onMouseLeave="$(\'#tradeButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#tradeButton\').css(\'background\', \'#444\');" title="Go on top" onClick="location.href=\'/mytrades\';"><font color="white"><br />T<br />r<br />a<br />d<br />e<br />s</font></div>';
var addReplyForm = '<div id="offer"><textarea placeholder="Enter your message here..." id="notes" class="message"></textarea><form id="replyTo" style="display: none; min-height: 30px;"></form><form class="left" style="display: none;width: 98%;margin: 8px 1%;""></form><a class="button" onclick="postReplay(\'' + postID + '\');$(this).hide();">Add reply</a><a class="button" onclick="showBackpack();$(this).remove()">My items</a><img src="http://cdn.dota2lounge.com/img/load.gif" id="loading" style="display: none; margin: 0.75em 2%" /></div>';
var selectEffect = '<div id="selectEffect" style="position: fixed; bottom: 0; right: 0;"><select style="padding: 5px; font-family: Tahoma"><option value="">All effects</option><option value="Burning Animus">Burning Animus</option><option value="Affliction of Vermin">Affliction of Vermin</option><option value="Trail of the Amanita">Trail of the Amanita</option><option value="Trail of the Lotus Blossom">Trail of the Lotus Blossom</option><option value="Sunfire">Sunfire</option><option value="Searing Essence">Searing Essence</option><option value="Cursed Essence">Cursed Essence</option><option value="Resonant Energy">Resonant Energy</option><option value="Luminous Gaze">Luminous Gaze</option><option value="Piercing Beams">Piercing Beams</option><option value="Ethereal Flame">Ethereal Flame</option><option value="Diretide Corruption">Diretide Corruption</option><option value="Frostivus Frost">Frostivus Frost</option><option value="Felicity\'s Blessing">Felicity\'s Blessing</option><option value="Crystal Rift">Crystal Rift</option><option value="Divine Essence">Divine Essence</option></select></div>';

var profID = 0;

var reloadNotifications = function() {
    var sss;
    $.get("http://dota2lounge.com/", function(data){
        data = data.toString().replace(/\n/gim, " ");
        sss = data.match(/<ul id="menu">(.*)<\/ul>/gim);
        sss = sss.toString().replace(/<ul id="menu">/gim, " ");
        sss = sss.toString().replace(/<\/ul>/gim, " ");
        $('#menu').html(sss);
        if (/notification/gim.test(sss)) {
            clearInterval(intID);
            $('body').html($('body').html() + '<audio src="http://texting.zz.mu/ICQ.mp3" autoplay></audio>');
            $('#tradeButton').css('background', 'red');
        }
    });
}

var PluginAutoBump = function() {
    var bumps = [];
    $.get("http://dota2lounge.com/mytrades", function(data){
        bumps = data.match(/bumpTrade\('([0-9]+)','(.+)'\)/gim);
        if (/bump/gim.test(data)){
            for (var i = 0; i < 6; i++) {
                eval(bumps[i]);
            }
        }
    });
}


var oScrl = function() {
    if ($(window).scrollTop() > 100) $('header').css('position', 'fixed');
        else $('header').css('position', 'relative');
}

intID = setInterval(reloadNotifications, 3000);
$('body').html($('body').html() + newElementUp + newElementDown);
    
if (/result/gim.test(document.location.href)) $('body').html($('body').html() + selectEffect);

if (!(/postReplay/gim.test($('body').html())) && !(/lounge/gim.test(postID))) {
    $('body').html($('body').html().replace(/<\/article>/, addReplyForm + '</article>'));
}

PluginAutoBump();
setInterval(PluginAutoBump, 5000);
$(window).on('scroll', oScrl);
$('header').css('z-index', '999999');
$("#tradelist").quickPagination({ pageSize: "9999999"});

var searchEffect = function(effect) {
    removeSearchEffect();
    $.each($(".tradepoll").get(), function() {
    		if (!(this.innerHTML.match('Effect: ' + effect))) this.style.display = "none";
		});
}

var removeSearchEffect = function() {
    $.each($(".tradepoll").get(), function() {
    		 this.style.display = "block";
		});
}

$('#selectEffect').on('change', function() {
 	if ($('#selectEffect option:selected').val() != '') searchEffect($('#selectEffect option:selected').val());   
    	else removeSearchEffect();
})

$('#tradelist').html($('#tradelist').html().replace(/simplepagerpage/, ''));