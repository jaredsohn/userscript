// ==UserScript==
// @name           eParaguay
// @namespace      Azaret
// @include        http://*.erepublik.com/*
// ==/UserScript==
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://azaret.erepfrance.com/socialidad.html',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = null;
            	var order_string = response.responseText.match('#@#.*?#@#');
            	order_string = order_string.join("");
            	order_string = order_string.substring(order_string.indexOf('#')+4,order_string.length-3);
            	var tags = order_string.split('|');
            	var CURVERS = "1.0";
				var version = tags[0];
				var orders = tags[1];
				var link = tags[2];
				var update = tags[3];
				var defcon = tags[4];
            
var currURL = location.href;
var arrURL = currURL.split('/');
//alert(arrURL[4]);


latest=document.getElementById("content").childNodes[1];
divdod = document.createElement("div");
divdod.id = "eParaguay";

var cssmarg = "";
regex = /extended/gi;
if(document.getElementById("content").attributes[0].value.search(regex)>=0) cssmarg = "margin-left:30px;";

divdod.innerHTML = "<div id=\"ePyINNER\" style=\""+cssmarg+"padding:2px;margin-bottom:20px;width:686px;background:no-repeat center right #e9f5fa url(http://img.skitch.com/20100705-r6d4ish48f2k2yffiqxuip5mpr.png);-moz-border-radius:4px;\"></div>";
latest.parentNode.insertBefore(divdod, latest);

document.getElementById("ePyINNER").innerHTML = "<div id=\"ePySOL\" style=\"float:right;width:250px;margin-right:175px;height:84px;\"></div><div id=\"ePyMENU\" style=\"float:left\"></div><div id=\"ePyGOB\" style=\"margin-left:62px;width:200px;\"></div>";

//---------- MENU
var txtMENU  = "";
	txtMENU += "<a href=\"http://economy.erepublik.com/"+arrURL[3]+"/work\"      style=\"display:block;-moz-border-radius:2px;background:#86cee5;color:white;text-shadow:0 -1px 1px #58BEDB;padding:2px;margin:2px;text-align:center;width:56px;\" >Trabajo</a>";
	txtMENU += "<a href=\"http://economy.erepublik.com/"+arrURL[3]+"/train\"     style=\"display:block;-moz-border-radius:2px;background:#7ebd55;color:white;text-shadow:0 -1px 1px #519620;padding:2px;margin:2px;text-align:center;width:56px;\" >Entreno</a>";
	txtMENU += "<a href=\"http://economy.erepublik.com/"+arrURL[3]+"/study\"     style=\"display:block;-moz-border-radius:2px;background:#d99f64;color:white;text-shadow:0 -1px 1px #D58A2E;padding:2px;margin:2px;text-align:center;width:56px;\" >Estudio</a>";
	txtMENU += "<a href=\"http://economy.erepublik.com/"+arrURL[3]+"/entertain\" style=\"display:block;-moz-border-radius:2px;background:#bb8ec3;color:white;text-shadow:0 -1px 1px #B962D0;padding:2px;margin:2px;text-align:center;width:56px;\" >Salir</a>";
document.getElementById("ePyMENU").innerHTML = txtMENU;

//---------- GOB
var txtGOB  = "";
	txtGOB += "<div style=\"margin:2px 3px;max-height:38px;\">					<img src=\"http://www.erepublik.com/images/parts/icon_military_36.gif\"/>	<div style=\"float:right;\"> <h2 style=\"text-align:left;width:143px;\">Ordenes del Ejercito</h2>   <div style=\"max-width:142px;font-size:11px;max-height:28px;line-height:13px;margin-top:-2px;\"><a id=\"ePyEJE\" href=\""+tags[1]+"\">"+tags[2]+"</a></div> </div></div>";
	txtGOB += "<div style=\"margin:4px 3px;max-height:38px;margin-bottom:2px;\"><img src=\"http://www.erepublik.com/images/icons/alerts/political_96.gif\"/><div style=\"float:right;\"> <h2 style=\"text-align:left;width:143px;\">Mensaje del Presidente</h2> <div style=\"max-width:142px;font-size:11px;max-height:28px;line-height:13px;margin-top:-2px;\"><a id=\"ePyGOB\" href=\""+tags[3]+"\">"+tags[4]+"</a></div> </div></div>";
document.getElementById("ePyGOB").innerHTML = txtGOB;

//---------- SOL
var txtSOL  = "";
    txtSOL += "<div style=\"margin:2px 0px; background:no-repeat center right url(http://img.skitch.com/20100707-me3ghwpg1ge4umud7k7xi29pu7.png); width:250px; height:81px; position:relative;\">";
    txtSOL += "		<div style=\"position:absolute; top:1px; right:2px; background:no-repeat center center url("+tags[5]+"); width:48px; height:38px; -moz-border-radius:2px;\">";
    txtSOL += "		</div>";
    txtSOL += "		<div style=\"position:absolute; top:1px; left:62px;\">";
    txtSOL += "			"+tags[6]+"";
    txtSOL += "		</div>";
    txtSOL += "";
    txtSOL += "		<div style=\"position:absolute; top:1px; left:2px; background:no-repeat center center url("+tags[7]+"); width:48px; height:38px; -moz-border-radius:2px;\">";
    txtSOL += "		</div>";
    txtSOL += "		<div style=\"position:absolute; top:24px; left:52px;\">";
    txtSOL += "			"+tags[8]+"";
    txtSOL += "		</div>";
    txtSOL += "";
    txtSOL += "		<div style=\"position:absolute; bottom:1px; left:2px; background:no-repeat center center url("+tags[9]+"); width:48px; height:38px; -moz-border-radius:2px;\">";
    txtSOL += "		</div>";
    txtSOL += "		<div style=\"position:absolute; bottom:24px; left:62px;\">";
    txtSOL += "			"+tags[10]+"";
    txtSOL += "		</div>";
    txtSOL += "";
    txtSOL += "		<div style=\"position:absolute; bottom:1px; right:2px; background:no-repeat center center url("+tags[11]+"); width:48px; height:38px; -moz-border-radius:2px;\">";
    txtSOL += "		</div>";
    txtSOL += "		<div style=\"position:absolute; bottom:1px; left:52px;\">";
    txtSOL += "			"+tags[12]+"";
    txtSOL += "		</div>";
    txtSOL += "";
    txtSOL += "</div>";
document.getElementById("ePySOL").innerHTML = txtSOL;


		}	
		}
	);