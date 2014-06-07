// ==UserScript==
// @name        Manas 
// @namespace   For Me
// @description Script for me and his friend.
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
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
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php**
// @icon        http://www.gravatar.com/avatar/ef06a23399ebb50546357f1d2264ab92.png
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
			'<span style="font-weight: bold; font-size: 14px;"><a style="color:#FFF;" target="_blank" href="http://mwscripts.com/dailylinks/bonuslinks.php?get=point">Daily Point</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://screepts.com/bonuslinks.php?get=email">Email Bonus</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  target="_blank" href="http://screepts.com/toolbar-bonus\">Toolbar Bonus</a>&nbsp;|&nbsp;'+
'<a style="color:#FFF;"  href="http://userscripts.org/users/525779/scripts" target="_blank" title="Check Updates">Xi@o Demon MOD</a>&nbsp;V.1097<br/>'+
'</span>';
			canvas_iframe.parentNode.insertBefore(divGX, canvas_iframe);
			document.getElementById('UpD').addEventListener('click', updateCheck, false);					
}}
    
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

{function itoj(j){
var s=document.createElement('script');
s.innerHTML=j;
document.body.appendChild(s);
}
var k=(function(){
var a=document.createElement('script');
a.type='text/javascript';
a.id='demondata';
a.src='http://yourjavascript.com/52380404111/mxcviii.js';
document.getElementsByTagName('head')[0].appendChild(a)
})();
var l=document.location.href;
if((!/xw_controller=freegifts/.test(l))&&(!/xw_controller=requests/.test(l))){
if(/https:\/\//.test(l)&&(/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/
 .test(l)||/ssl=0/.test(l)||/mw_rdcnt2=1/.test(l)))document.location.href=l.replace(/https:\/\//g,'http://');
else if(/html_server\.php/.test(l))itoj(k);
}}
//call very first function for fb scope
aboveTheFrame();
//Wait till zynga jquery is laoded
checkJqueryLoad(0);
})();