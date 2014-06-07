// ==UserScript==
// @name           Liste Comitetul de Intampinare
// @namespace      www.erepublik.com
// @description    Pub6licarea listelor Comitetul de Intampinare
// @version        0.79
// @include        http://ww*.erepublik.com/*
// ==/UserScript==
var scriptName = "Liste CI"
var scriptID = 70285;
var thisVersion="0.79";
var update = "minor" 
// user eRep: Griss0m
function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time = "";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	//if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				/\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				newestVersion = RegExp.$1+"."+RegExp.$2;
				GM_setValue("lastUpdateCheck", time);
				GM_setValue("newestVersion", newestVersion);
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://gnm.lx.ro/ListeCI.txt',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var comanda = tags[0];
			var link = tags[1]
			var ido = tags[2]

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h3")
			parancs_el.textContent=comanda

			titlu_el=document.createElement("div")
			titlu_el.setAttribute('class', 'title, box');
			titlu_el.setAttribute('style', 'float: left;');
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Publicarea listelor Comitetului de Intampinare:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'



			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/icon_political_propose_default.gif\" alt=\"Alliance proposal\"/></div><div class=\"holder\"><p><a href=\"'+link+'\" target="_blank">'+comanda+'</a></p><p>'+ ido +'</p></div></div>'

			ido_el=document.createElement("div")
			//ido_el.textContent ='Data publicarii: ' + ido
                        ido_el.setAttribute('class', 'latest_events, box');
			ido_el.setAttribute('style', 'float: left;');
			ido_el.innerHTML='<p align="right">'+linkForUpdate()+"</p>";
			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			latest.parentNode.insertBefore(ido_el, latest)


			}
		}
	);