// ==UserScript==
// @name           Pokec.sk - Integrovana RP
// @namespace      Pokec.sk, nove, sklo, azet, skin, template, stare, dizajn, redizajn, styl, RP, rychla posta
// @include        http://www-pokec.azet.sk/2/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2010-07-08
// @author         MerlinSVK
// @version        1.0
// ==/UserScript==

var RPOn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAB3RJTUUH2gcBCCkDprGxdQAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAJTv/3Cvud8AAAABdFJOUwBA5thmAAAAPElEQVR42mWNwQ0AMAgCcQTZQPcfspTGJk3x4QVFgaPAhUgrwLYSNFFQ6rWdlkVDqdqjZD3LE78H/18DCzFPB8cQQyebAAAAAElFTkSuQmCC';	// obrazok zapnuteho RP okna
var RPOff = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAB3RJTUUH2gcBCCoYB/krWgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAAMUExURQAAAP8AAAAAAJTv/3JYK18AAAABdFJOUwBA5thmAAAATklEQVR42j2N2xXAIAhDIxM0OoEyQWH/3Rq0bX645/ICTgzt+oCrYnCOVBZ8UtUFIRVlUso3BPueCand8kyOGtbOTRmrc+x2PjW+gB9gDyvcC1Zr7lIeAAAAAElFTkSuQmCC';	// obrazok vypnuteho RP okna

// if Opera then create unsafeWindow
if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
var curUID = unsafeWindow.curUID;
var betapokec = unsafeWindow.betapokec;
var useOldRp = unsafeWindow.useOldRp;

function toggleRP() {
	el = document.getElementById('RPwindow');
	pic = document.getElementById('RPicon');
	el.style.visibility = (el.style.visibility != 'visible' ? 'visible' : 'hidden' );
	pic.src = (el.style.visibility != 'hidden' ? RPOn : RPOff );
}

function makeDIV() { 
   divRP = document.createElement("IFRAME");
   divRP.setAttribute("id", "RPwindow");
   divRP.setAttribute("src", "http://pokec.azet.sk/sluzby/rp/start?i9="+curUID);
   divRP.setAttribute("frameborder", "0"); 
   divRP.setAttribute("style", "visibility:hidden;z-index:200;position:absolute;left:0;bottom:0;width:704px;height:404px;background:#fff");
   document.getElementById('body').appendChild(divRP);
}

if (betapokec==1&&useOldRp!=1) {
	window.addEventListener("load", makeDIV, false);
	document.getElementById('head').innerHTML += '<a href="#" style="border:0;position:absolute;top:2px;left:170px"><img id="RPicon" src='+RPOff+' border="0" width="15" height="15"></a>';
	RPtoggler = document.getElementById('RPicon'); RPtoggler.addEventListener("click", toggleRP, true);
}
else {}
