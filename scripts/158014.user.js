// ==UserScript==
// @name       Kalozos scriptem
// @namespace  http://ikariam.org
// @version    0.3
// @description  Két és fél perces küldetés
// @match      http://s*.ikariam.hu/index.php*
// @copyright  Tomatomi

// @include			http://s*.ikariam.com/index.php*
// @exclude			http://board.ikariam.*/
// @exclude			http://support.ikariam.*/*
// @exclude			http://support.*.ikariam.*/*

// ==/UserScript==

var szamlalo=0;

function varos_mutatas()
{
	var townView=document.evaluate("//a[@title='Kijelölt város megszemlélése']", document.body, null, 9, null).singleNodeValue;   
	if ( townView )
	{
		delay = getRandomInt (1000, 2000);
		townView.click();
	}
}

function kaloz_mutatas()
{
	var kalozos=document.evaluate("//a[contains(@title,'Kalóz erőd')]", document.body, null, 9, null).singleNodeValue;   
	if ( kalozos )
	{
		kalozos.click();
                
            
	}
	else
	{
		delay = getRandomInt (1000, 2000); varos_mutatas();
	}
} 

function kattint()
{
	var Gomb=document.evaluate("//a[contains(@class,'button capture')]", document.body, null, 9, null).singleNodeValue;   
	if ( Gomb  )
	{
		Gomb.click();
                szamlalo++;
                if( szamlalo == 19 )
                {
                     var zene = document.createElement("video");
                     zene.setAttribute('src', 'http://kakiclan.cportal.eu/images/perfect.wav');
                     zene.play();
        }
		window.clearInterval(int1); //int1 nullázása
		setTimeout( myPause, 151000 ); // 151 másodperc várakozás
	} 
	else
	{
		delay = getRandomInt (1000, 2000); kaloz_mutatas();
	}
}

var delay = getRandomInt (1000, 3000);

function myPause()
{
	int1=setInterval( kattint, delay);
}

var int1=setInterval( kattint, delay);

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}