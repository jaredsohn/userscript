// ==UserScript==
// @name           AutoCookie
// @namespace      http://drewmcdermott.net
// @version        1.6
// @include        http://orteil.dashnet.org/cookieclicker/*
// ==/UserScript==




//Clicker



//Upgrades

//run funcs on intv



function start()
{
	JQuery(autoclick);
	JQuery(productBuy);
	JQuery(upgradeBuy);
	//JQuery(goldenClick);

}







function autoclick()
{
	var elementID="bigCookie";
	var goldID="goldenCookie";
	var clickthis = document.getElementById(elementID);
	var goldclick = document.getElementById(goldID);
	var click_time = 100;
	var tim;
	tim = setInterval(function()
	{
	var c = 0;
	var jgc = jQ("div[style*='/img/goldCookie.png']");
	if(jgc.length)
	{
		if(jgc.css('opacity') != "0" && jgc.css('display') != "none")
		{
		var re = true;
		var x = 0;

			while(c<10000)
			{
				//gc.click();
				Game.goldenCookie.click();
				clickthis.click();
				//goldclick.click();
				c=c+1;
			}

		
		}
	}
	clickthis.click();
	},click_time);
	
}

function JQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}// Note, jQ replaces $ to avoid conflicts.

function addScript(sFunc)
{
	var script = document.createElement("script");
    script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = sFunc.toString();
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}






function goldenClick()
{
	var gc_time = 1;
	var gctim = setInterval(function() { jQ("#goldenCookie").find("div[style*='/img/goldCookie.png']").click();   },gc_time);

}

function productBuy()
{

	var buy_time = 1000;
	var ptim= setInterval(function() { jQ( "span[style='color: rgb(0, 255, 0);']" ).parent().click();   },buy_time);

}


function upgradeBuy()
{
	var up_time = 1000;
	var utim= setInterval(function() { jQ( ".crate.upgrade.enabled").not("div[onmouseover*='%5BSwitch%5D']").not("div[onmouseover*='One%20mind']").click(); },up_time);
}

//http://cookieclicker.wikia.com/wiki/Cookie_Monster_%28JavaScript_Add-on%29
function loadCookieMonster() {
 var jA = document.createElement('script');
    jA.setAttribute('type', 'text/javascript');
    jA.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
    jA.onload = function() {
        var jB = document.createElement('script');
        jB.setAttribute('type', 'text/javascript');
        jB.setAttribute('src', 'http://pastebin.com/raw.php?i=2KRNm8Gm');
        document.body.appendChild(jB);
    };
    document.body.appendChild(jA);	
}

setTimeout(function() {
    loadCookieMonster();
    start();
}, 2000);
