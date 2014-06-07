// ==UserScript==
// @name       Above the frame
// @namespace   Above the frame
// @description Free daily links
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
// @version     2.5
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
		divGX.innerHTML = '<center><div style="background-image: url(https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/map_based_jobs/expert_view/expertview_nav_mid.gif);border:2px solid black;padding:10px;"><span style="font-weight: bold; font-size: 12px; color:#FFF;>'+
			'<span style="font-weight: bold; font-size: 14px;"><a style="color:#FFF;" target="_blank" href="http://mwscripts.com/dailylinks/bonuslinks.php?get=point">Daily Point<img src="http://screepts.com/dailybonus_image.php" height="20px" width="18px"></a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://screepts.com/bonuslinks.php?get=email">Email Bonus<img src="http://rwysc.t15.org/fight/email.png" height="20px" width="18px"></a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://screepts.com/toolbar-bonus\">Toolbar Bonus<img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/achievements/mwach_gottools_75x75_01-1.gif" height="20px" width="18px"></a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://tinyurl.com/zynga-live-chat">Zynga live Chat<img src="http://rwysc.t15.org/fight/Contact Zynga.PNG" height="20px" width="20px"></a>&nbsp;|&nbsp;'+			
'<a style="color:#FFF;"  href="http://www.facebook.com/groups/MafriaWarsScripts666/" target="_blank" title="Lucifers help group">Mafia Wars Scripts | MOD</a>&nbsp;|<br/>'+
'<a style="color:#FFF;"  href="http://unlockedmw.com/" target="_blank" title="UnlockedMW">UnlockedMW</a>&nbsp;&nbsp;<img src="http://rwysc.t15.org/fight/unl.jpg" height="20px" width="18px">&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://screepts.com">Lucifers Scripts</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="https://www.facebook.com/mafiademonscript" title"Mafia demon on facebook">Mafia Demon (FB)</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://mafiademon.com/" title"Mafia demon website">Mafia Demon</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://mrsimy0.net/Mafia/">Guessx</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://www.spockholm.com/mafia/bookmarklets.php">Spockholm</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://www.facebook.com/groups/173236399415354/">Spocklets </a>&nbsp;|&nbsp;'+
'</span>';
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