// ==UserScript==
// @name       	Indofighter Menu Bar
// @namespace   IF-MenuBar
// @description Navigation Links
// @thanks      Special thanks to http://screepts.com/ to revieuw my script
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @icon        http://i46.tinypic.com/dyvcit.jpg
// @update		http://userscripts.org/scripts/source/150579.user.js
// @version     1.0
// ==/UserScript==


javascript:(function (){
/*notes :
 *removed injectscript wasn't used nor is it really needed for this script.  injectscript is parsing js to dom not eval js.
 *aboveTheFrame fuction , updateCheck is not defined
 */
    var getWindow = function() {
        //Get current window for multi browser support
        var elt = document.createElement("div");
        elt.setAttribute("onclick", "return window;");
        return elt.onclick();
    }
    
unsafeWindow = getWindow();    



function x$(selector, context) {
        context = context || document;
        return document.evaluate(selector, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }

function aboveTheFrame() {
		var canvas_iframe = x$('//iframe[@class="canvas_iframe_util"]');
			if (canvas_iframe !== null) {
			var divGX = document.createElement('div');
		divGX.innerHTML = 
			'<center><div style="background-image: url(https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_mid.gif);border:2px solid black;padding:10px;"><font color="white"><span style="font-weight: bold; font-size: 12px; color=red">'+
			'<img border="0" src="http://i46.tinypic.com/281sac8.png" width="110" height="22">&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://screepts.com/bonuslinks.php?get=point">Daily Point <img border="0" src="http://lh5.ggpht.com/-C4u1RM9QAT4/UIJI_b5xVgI/AAAAAAABIuo/zcMOVZtMoYo/healthpoint%25255B5%25255D.gif?imgmax=800" width="16" height="16"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://screepts.com/bonuslinks.php?get=email">Email Bonus <img border="0" src="http://lh6.ggpht.com/-4OspBMJ4xGg/T1MISEVa-PI/AAAAAAAAoA8/a5akX4yU4mo/emailbonus_thumb%25255B78%25255D.gif?imgmax=800" width="15" height="15"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://tinyurl.com/free-spins-slot-machine\">3 Free Spins <img border="0" src="https://zynga1-a.akamaihd.net/mwfb/mwfb/content/graphics/en_US/PromoIcons/slots_icon.png" width="16" height="18"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://www.facebook.com/groups/171833526935\">Battlefield <img border="0" src="http://icons.iconseeker.com/png/fullsize/game/gears-war-skull-2.png" width="20" height="20"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://www.facebook.com/groups/indofighters\">Headquarter <img border="0" src="http://files.softicons.com/download/internet-icons/web-icon-button-set-by-digital-delight/png/48/redstyle-11-home.png" width="16" height="16"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://www.facebook.com/groups/indofighters/doc/248581005225844\">Script Update <img border="0" src="http://images1.wikia.nocookie.net/__cb20120505015226/fairytail/images/6/6a/Alert_Icon.png" width="16" height="16"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://tinyurl.com/zynga-live-chat\">Zynga Live Chat <img border="0" src="http://www.file-extensions.org/imgs/company-logo/4550/zynga-game-network-inc.png" width="77" height="15"></a>&nbsp;|&nbsp;'+
			'<a style="color:#FFF;" target="_blank" href="http://indofighter.tk\">Website <img border="0" src="http://www.iconhot.com/icon/png/rss-1/512/red-47.png" width="16" height="16"></a>&nbsp;|&nbsp;'+
			'</span>';+
			'</font></div></center>';
			canvas_iframe.parentNode.insertBefore(divGX, canvas_iframe);
			document.getElementById('UpD').addEventListener('click', updateCheck, false);					
			}

	}
    
function AddKiller(){
 /*
 * Remove the ads from mw frame only called once jquery is loaded
 */

  $(document).ready(function() {
    $('#popup_fodder_zmc #pop_zmc').remove();
    $('#mw_like_button').remove(); 
    $('iframe[name="mafiawars_zbar"]').parent().remove();
    $('#snapi_zbar').parent().remove();
    $('#zbar').parent().remove();
    $('#mafia_two_banner').remove();
    //Fix mw resize issue
    unsafeWindow.resizeIframe = function() {};
    unsafeWindow.iframeResizePipe = function () {};
  })
}   

function checkJqueryLoad(n) {
    if (n >= 10){
        //jquery failed to load kill userscript
        return false
    }
    if (typeof($ = unsafeWindow.$) !== 'undefined'){
        setTimeout(AddKiller,10000);
        return true;
    } else {
        n++;
        unsafeWindow.setTimeout(function(){checkJqueryLoad(n)}, 5500);
    }
}

//call very first function for fb scope
aboveTheFrame();
//Wait till zynga jquery is laoded
checkJqueryLoad(0);



})();