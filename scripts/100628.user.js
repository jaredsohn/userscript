// ==UserScript==
// @name           SadzarkaWF PL s5
// @namespace      http://s5.wolnifarmerzy.pl/main.php?ref=gomffpl
// @description    SadzarkaWF PL s5
// @include        http://s5.wolnifarmerzy.pl/main.php?ref=gomffpl
// ==/UserScript==


(function () {

function $(ID) {return document.getElementById(ID)}
function getRandom( min, max ) {
	if( min > max ) {return( -1 );	}
	if( min == max ) {return( min );}
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}

function auto(v){
	if (v<121) {
	if (!unsafeWindow.garten_kategorie[v] || unsafeWindow.garten_kategorie[v]=="v") { 
		window.setTimeout(function(){unsafeWindow.cache_me(gartenNr,v,unsafeWindow.garten_prod[v],unsafeWindow.garten_kategorie[v]);auto(v+1);},getRandom(tmin,tmax));
	} else auto(v+1);
	}
}

var keygarten = /parent.cache_me\((.*?),/;
all  = document.getElementsByTagName("body")[0];

window.setInterval(function () {
cand = keygarten.exec($("gardenarea").innerHTML);
if (cand && $("gardenmaincontainer").style.display=="block"){
	gartenNr = parseInt(cand[1],10);
	if($("gardencancel").childNodes.length==1){
		newimg = document.createElement("img");
		newimg.setAttribute("style","width: 25px; height: 25px;");
		newimg.setAttribute("id","autoplantbutton");
		newimg.setAttribute("class","link");
		newimg.setAttribute("title","Sadzarka");
		newimg.setAttribute("src","http://upjers.de.ipercast.net/mff/autoplant_off.png");
		newimg.addEventListener("mouseover",function(){this.src="http://upjers.de.ipercast.net/mff/autoplant_on.png"},false);
		newimg.addEventListener("mouseout",function(){this.src="http://upjers.de.ipercast.net/mff/autoplant_off.png"},false);
		newimg.addEventListener("click",function(){auto(1)},false);
		$("gardencancel").appendChild(newimg);
	}
}},500);

tmin = parseInt(GM_getValue("myFreeFarm_tmin"),10);
if(tmin==undefined) {tmin=300;GM_setValue("myFreeFarm_tmin", tmin);}
tmax = parseInt(GM_getValue("myFreeFarm_tmax"),10);
if(tmin==undefined) {tmax=700;GM_setValue("myFreeFarm_tmax", tmax);}

inp = document.createElement("input");
inp.size="5";
inp.value=tmin;
inp.id = "inputtmin";
inp.title = "Minimalny czas klikania w milisekundach";
inp.addEventListener("change",function(){tmin=this.value;GM_setValue("myFreeFarm_tmin", tmin);},false);
all.appendChild(inp);

inp = document.createElement("input");
inp.size="5";
inp.value=tmax;
inp.id = "inputtmax";
inp.title = "Maksymalny czas klikania w milisekundach";
inp.addEventListener("change",function(){tmax=this.value;GM_setValue("myFreeFarm_tmax", tmax);},false);
all.appendChild(inp);

})();