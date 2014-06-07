// ==UserScript==
// @name     	Hide/Show FB sidebar and chat
// @namespace	http://userscripts.org/users/413570
// @description	Adds buttons to top-left of page for hiding/showing the sidebar and chat from view in FB
// @include     *.facebook.com/*
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.0.5.1
// @copyright   AskNetGuy
// ==/UserScript==
/*
Version 1.0.5.1 added bugfix for Firefox 18 not accepting GMaddstyle properly
*/
//--- Add the button (position later with css).
$('div h1:first-child').append (
      '<div class="gmButtons" title="SideBar?">'
    + '<button id="gmHideBtn" ><img src="data:image/gif,GIF87a%14%00%0A%00%F7%FF%00%00%00%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%01%00%2C%00%00%00%00%14%00%0A%00%07%086%00%03%08%1CH%B0%A0%C1%83%08%0D%02%10%B8%B0!%80%85%01%1E%3E%24%08%B1a%C4%88%16%15J%BCX%11%E3%C4%81%1D-N%84X0%A4G%86%1B%13%AA%5C%C9%B2%A5%C1%80%00%3B"></button><br><button id="gmLikeBtn"><img src="data:image/gif,GIF87a%14%00%0A%00%F7%FF%00%00%00%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%01%00%2C%00%00%00%00%14%00%0A%00%07%088%00%03%08%1CH%B0%A0%C1%83%08%0B%02X%18%00%80%40%87%0B!%0Et%D8p%E2%C3%8A%12%2F6d%18Q%A2%C7%8A%16)~%DCH%91%24H%88%0C1%26%5C%C9%B2%A5%CB%83%01%01%00%3B"></button></div>'
);
//-functions definition
function stuffHide()
{
var annoy1 = document.getElementById('pagelet_dock');
if(annoy1)
	annoy1.style.display = 'none';
var annoy2 = document.getElementById('pagelet_sidebar');
if(annoy2)
	annoy2.style.display = 'none';
var annoy3 = document.getElementById('rightCol');
if(annoy3)
	annoy3.style.display = 'none';
};
function stuffLike()
{
body.appendChild(div);unsafeWindow.AutoLike = function() {
var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("span");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("id")!=null&&prepare[i].getAttribute("id").indexOf(".reactRoot")>=0&&(prepare[i].innerHTML=="Me gusta"||prepare[i].innerHTML=="Like"||prepare[i].innerHTML=="Suka"||prepare[i].innerHTML=="Beğen"||prepare[i].innerHTML=="أعجبني"||prepare[i].innerHTML=="いいね！"||prepare[i].innerHTML=="讚"||prepare[i].innerHTML=="Seneng"||prepare[i].innerHTML=="좋아요"||prepare[i].innerHTML=="J’aime")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like2').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
};
//-event listeners
var btone = document.getElementById('gmHideBtn');
	btone.addEventListener("click", stuffHide, true);
var bttwo = document.getElementById('gmLikeBtn');
	bttwo.addEventListener("click", stuffLike, true);	
//basic GM css stuff
GM_addStyle('.gmButtons { background:red; color:black; position:fixed; top:0px; left:0px;'
	+'z-index:999; padding:0px; font-size:.5em;text-align:center;'
	);
/*GM_addStyle ( (<><![CDATA[
    .gmButtons { background:red; color:black; position:fixed; top:0px; left:0px;
		z-index:999; padding:0px; font-size:.5em;text-align:center;
    }
 ]]></>).toString () );*/
 
//- pretty stuffs like fade button when not being hovered.
var zDisplayPanel   = $('div.gmButtons');
zDisplayPanel.hover (
    function () { $(this).stop (true, false).fadeTo (50,  1  ); },
    function () { $(this).stop (true, false).fadeTo (600, 0.5); },
	function () { $(this).stop (true, false).fadeTo (1200, 0.1); }
);
zDisplayPanel.fadeTo (2000, 0.1);