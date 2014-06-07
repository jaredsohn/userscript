// ==UserScript==
// @name           Ordine Ministerul Apararii
// @namespace      www.erepublik.com
// @description    Ordine Ministerul Apararii
// @version        0.06
// @include        http://ww*.erepublik.com/*

// ==/UserScript==
var scriptName = "Ordinele Ministerului Apararii"
var scriptID = 75841;
var thisVersion="0.06";
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
	if (needsUpdate) { innerHTML += scriptName + ' <b>versiune noua '+newestVersion+'! UPDATE!!!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.ministerulapararii.000a.biz/data/ordineMA.txt',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var ziua = tags[0];
                        var comanda = tags[1]
			var link = tags[2]
			var ido = tags[3]
                        var hour = tags[4]
                        var footer

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h3")
			parancs_el.textContent='Ordine ziua'+ziua+':'+comanda
                        

			titlu_el=document.createElement("div")
			titlu_el.setAttribute('class', 'title, box');
			titlu_el.setAttribute('style', 'float: left;');
			titlu_el.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=Ordine Oficiale Ministerul Apararii:&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>'



			link_el=document.createElement("div")
			link_el.setAttribute('class', 'latest_events, box');
			link_el.setAttribute('style', 'float: left;');
			link_el.innerHTML='<div class=\"item elem\"><div class=\"iconholder\"><img class=\"test\" src=\"/images/parts/icon_military_135.gif\" alt=\"Ordine Oficiale\"/></div><div class=\"holder\"><p><a href=\"http://www.erepublik.com/en/battles/show/'+link+'\" target="_blank">Ordine ziua '+ziua+':<br>'+comanda+'</a></p><p>'+ ido +'</p><p>Ultimul Update: '+ hour +'</p></div></div>'

                        poze_el=document.createElement("div")
                        poze_el.setAttribute('class', 'footer, box');
			poze_el.setAttribute('style', 'float: left;');
                        poze_el.innerHTML='<div style=\"background-color:#000000; border: 1px solid #c6dde6; padding:0px; margin:0px;\"\
		><table width=\"330\"><tr height=\"30\" style=\"background-image:url(\'http://img121.imageshack.us/img121/1765/backgroundrje.png\'); background-repeat:repeat-x;\">\
		<td><a href=\"http://www.erepublik.com/en/newspaper/ministerul-apararii-185153/1\" title=\"Ziarul Ministerului Apararii\" target=\"_blank\">\
		   <img src=\"http://img20.imageshack.us/img20/299/newspaperj.jpg\"/>\
		</a></td>\
                <td><a href=\"http://www.erepublik.com/en/organization/donate/items/3204545\" title=\"Donati pentru Fondul de Razboi\" target=\"_blank\">\
		   <img src=\"http://img52.imageshack.us/img52/8039/donatex.gif\"/>\
		</a></td>\
                <td><a href=\"http://www.erepublik.com/ro/newspaper/spltalul-crucea-rosie-182256/1\" title=\"Ai nevoie de gift?\" target=\"_blank\">\
		   <img src=\"http://img7.imageshack.us/img7/9223/giftj.jpg\"/>\
		</a></td>\
                <td><a href=\"http://tinyurl.com/n5xu7p\" title=\"Chat-ul eRomaniei\" target=\"_blank\">\
		   <img src=\"http://img340.imageshack.us/img340/3360/chatxg.jpg\"/>\
		</a></td>\
		<td width=\"100%\"></td>\
		</tr></table></div>'

			ido_el=document.createElement("div")
			//ido_el.textContent ='Data publicarii: ' + ido
                        ido_el.setAttribute('class', 'latest_events, box');
			ido_el.setAttribute('style', 'float: left;');
			ido_el.innerHTML='<p align="right">'+linkForUpdate()+"</p>";
			latest.parentNode.insertBefore(titlu_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
			latest.parentNode.insertBefore(ido_el, latest)
                       latest.parentNode.insertBefore(poze_el, latest)


			}
		}
	);