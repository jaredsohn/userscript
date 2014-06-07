// ==UserScript==
// @name         Chat do gry goalunited
// @namespace    http://gu.rlip.linuxpl.info/
// @version      1.4
// @description  Dodaje chat do gry goalunited. Chrome + Opera + Firefox v15 
// @include      http://game.global.goalunited.org/*
// @match        http://game.global.goalunited.org/*
// @grant        none
// @copyright    2012, rlip
// ==/UserScript==


function addJQuery(mainScript) {
  if(!(window.jQuery && window.jQuery.fn.jquery == '1.7.2')) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', function() {
      var script = document.createElement("script");
      script.textContent = "(" + mainScript.toString() + ")();";
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  } else {
    mainScript();
  }
}


function dodajChat() {

$("embed").attr("wmode", "transparent");
var embed = $('#gu').html();
$('#fgame').children(':first-child').html('<div style="height:100%; z-index:2">'+embed+'</div>');

$('body').append('<div id="widget_social" style="float:right; width:451px; height:345px; background: url(http://gu.rlip.linuxpl.info/css/img/chat2.png); display:block; right:-407px; padding:0; position:absolute; top:170px; z-index:100;"><div id="srodek" style="color:#FFF; padding:35px 0 0 23px; z-index:101"><embed wmode="transparent" width="425" height="300" src="http://gu.rlip.linuxpl.info/chat/chat.swf" type="application/x-shockwave-flash" /></div></div>');


$("#widget_social").click(function (event) {
	if($(event.target).is("div"))
	{
		if($(this).css('right')=="0px")
			$(this).animate({ right: "-408" }, {queue:false, duration:"normal"} );
		else
			$(this).animate({ right: "0" }, {queue:false, duration:"normal"} );
	}
});

}	

addJQuery(dodajChat);