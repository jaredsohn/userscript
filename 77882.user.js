// ==UserScript==
// @name           Calculateur+
// @description    Permet a l'utilisateur de connaitre le prix de vente des tickets ainsi que de specifier un prix pour que le script calcule le nombre de tickets (ok sur: paris marseille munich)
// @include        http://*clodogame.fr/stock/bottle/*
// @include        http://*pennergame.de/stock/bottle/*
// ==/UserScript==

/* Update proc */
var SCRIPT={SCRIPTED:"Calculateur+",VERSION:"1.7",SCRIPT_URL:"http://userscripts.org/scripts/source/77882.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */

function refresh(){
	var res = document.getElementById("wirkung").innerHTML.match(/€?0(,|\.)([0-9]{2}) ?€?/);
	if(res[1] != -1){ 	document.getElementById("chkval").value = res[2];	}
}


function color(){
	if(parseInt(document.getElementById("menge_verkauf").value) > parseInt(document.getElementById("max").value)){
		document.getElementById("menge_verkauf").style.color = "#FF0000";
	}
	else{
		document.getElementById("menge_verkauf").style.color = "#FFFFFF";
	}
}

function trigger(){
	document.getElementById("amount").value = document.getElementById("chkval").value*document.getElementById("menge_verkauf").value/100;
	color();
}

function trigger2(){
	document.getElementById("menge_verkauf").value = Math.ceil(document.getElementById("amount").value/document.getElementById("chkval").value*100);
	color();
}

var addEvent = function(obj_, event_, fct_)
{
    if (obj_.addEventListener) {
        obj_.addEventListener(event_, fct_, true);
    }
    else if (obj_.attachEvent && !(/this\./g.test(fct_.valueOf()))) {
        obj_.attachEvent('on' + event_, fct_);
    }
    else {
        obj_['on' + event_] = fct_;
    }
};

refresh();

document.getElementById("menge_verkauf").size = "6";
var prix = document.getElementById("chkval").value;
var nombre = document.getElementById("menge_verkauf").value;

var inputAmount = document.createElement("input");
inputAmount.value = prix*nombre/100;
inputAmount.type = "text";
inputAmount.id = "amount";
addEvent(inputAmount, 'keyup', function() {trigger2()});

var parent = document.getElementById("menge_verkauf").parentNode;
parent.appendChild(inputAmount);


addEvent(document.getElementById("menge_verkauf"), 'keyup', function(){trigger()});
addEvent(document.getElementById("menge_verkauf").parentNode.getElementsByTagName("input")[3], 'click', function(){trigger()});