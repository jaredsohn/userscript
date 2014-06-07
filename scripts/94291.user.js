// ==UserScript==
// @name           SVZ - Alles ablehnen
// @namespace      *
// @description    Alle Einladungen (Freunde, Gruppen) mit einem Klick ablehnen
// @include        http://www.*vz.net/Home/NetworkNews
// ==/UserScript==


//scr=document.createElement("script");

function alleAblehnenFnc(){
	alleLinks=document.getElementsByTagName("a");
	for(i=0;i<alleLinks.length;i++){
		if(alleLinks[i].innerHTML=="ablehnen"){
			GM_xmlhttpRequest({
				method: "GET",
				url: alleLinks[i].href,
				onload: function(response) {
					ergebnis=/<form name="refuseInvite" [^>]*action="([^"]+)">(([^<]|<[^\/]|<\/[^f]|<\/f[^o]|\n)+)/.exec(response.responseText);
					//alert(ergebnis[0])
					POSTURL=ergebnis[1];
					FRMHTML=ergebnis[2].replace(/\s+/g," ");
					FRMHTML1="";
					POSTDATA="";
					while(FRMHTML=FRMHTML.replace(/<input[^>]+name=['"]?([^"' >]+)['"]?[^>]*value=['"]?([^'">]+)/, "")){
					  if(FRMHTML1==FRMHTML)break;
					  POSTDATA+="&"+RegExp.$1+"="+RegExp.$2;
					  FRMHTML1=FRMHTML;
					}
					POSTDATA=POSTDATA.substr(1)
					GM_xmlhttpRequest({
						method: "POST",
						url: POSTURL,
					  data: POSTDATA,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						}
					});
				}
			});
		}else if(alleLinks[i].innerHTML.match(/^Anfrage l.+schen$/)){
//		  alleLinks[i].click();
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent("click", true, true);
			alleLinks[i].dispatchEvent(evt);
		}
	}
	//die einladungen werden unsichtbar abgelehnt. dass sie abgelehnt wurden sieht man erst nach einem reload.
	window.setTimeout("location.reload()", 1500);
}

//document.body.appendChild(scr);
tmp=document.createElement("div");
tmp.innerHTML="<a id='alleAblehnen'>alle Ablehnen</a>";
with(document.getElementById("Mod-Home-Networknews-Pagelet"))insertBefore(tmp, firstChild);
document.getElementById("alleAblehnen").addEventListener("click", alleAblehnenFnc, false);