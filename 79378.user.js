// ==UserScript==
// @name           IMDB DivxPlanet Zamunda Sharebus
// @namespace      http://userscripts.org/users/hasankoroglu
// @description    IMDB'de filmin divxplanet altyazısı, zamunda'da arama, sharebus'ta arama imkanı sunar. Cüneyt Aliustaoğlu nun kodları kullanılmıştır.
// @include        http://www.imdb.com/title
// @include        http://www.imdb.com/title/*
// @author         Hasan Köroğlu
// ==/UserScript==

window.ana= document.getElementById('overview-top');


adres=(window.location.href);
filmid=adres.substr(adres.lastIndexOf("title")+6).replace("/","");
filmtitle= document.title.substr(0,document.title.lastIndexOf("(")-1);

window.bosluk=document.createElement('div');
bosluk.style.height="4px";
bosluk.innerHTML="&nbsp;";
window.ana.appendChild(bosluk);


//----------------------------------------------------
// 	divxplanet
//----------------------------------------------------

window.lnk_divxplanet= document.createElement('a');
window.lnk_divxplanet.title= "DivxPlanet";
window.lnk_divxplanet.style.cursor='pointer';
window.lnk_divxplanet.style.textDecoration='none';
window.lnk_divxplanet.style.margin='5px';
window.lnk_divxplanet.target="_blank";
window.lnk_divxplanet.innerHTML= "<img src='http://divxplanet.com/favicon.ico' width='32' height='32'/>";
window.ana.appendChild(lnk_divxplanet);



//----------------------------------------------------
// 	zamunda
//----------------------------------------------------

window.lnk_zamunda= document.createElement('a');
window.lnk_zamunda.title= "Zamunda";
window.lnk_zamunda.style.cursor='pointer';
window.lnk_zamunda.style.textDecoration='none';
window.lnk_zamunda.style.margin='5px';
window.lnk_zamunda.target="_blank";
window.lnk_zamunda.innerHTML= "<img src='http://img.zamunda.net/pic/favicon.png' width='32' height='32'/>";
window.lnk_zamunda.href= 'http://zamunda.net/browse.php?search=' + filmtitle + '&cat=0&incldead=1';
window.ana.appendChild(lnk_zamunda);




//----------------------------------------------------
// 	sharebus
//----------------------------------------------------

window.lnk_sharebus= document.createElement('a');
window.lnk_sharebus.title= "Sharebus";
window.lnk_sharebus.style.cursor='pointer';
window.lnk_sharebus.style.textDecoration='none';
window.lnk_sharebus.style.margin='5px';
window.lnk_sharebus.target="_blank";
window.lnk_sharebus.innerHTML= "<img src='http://sharebus.com/favicon.ico' width='32' height='32'/>";
window.lnk_sharebus.href= 'http://sharebus.com/index.php?act=search&CODE=01&forums=all&search_in=imdbid&keywords=' + filmid;
window.ana.appendChild(lnk_sharebus);


//----------------------------------------------------
// 	divxplanet türkçe özet
//----------------------------------------------------
getDivxPlanetAdres();




function getDivxPlanetAdres()
{


	GM_xmlhttpRequest(
	{
		method: "POST",
		url: "http://divxplanet.com/index.php?page=arama",
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data: "arama=" + filmid,
		onload: function(adresibul) 
			{ 
			    if(adresibul.responseText.indexOf('window.location.href')>0)
				{
				tamadres=adresibul.responseText;
				tamadres=tamadres.substr(tamadres.indexOf('"')+1,tamadres.lastIndexOf('"')-tamadres.indexOf('"')-1);
				tamadres= "http://divxplanet.com" + tamadres;
				lnk_divxplanet.href=tamadres; lnk_divxplanet.innerHTML="<img src='http://divxplanet.com/favicon.ico' /> ";
				GM_xmlhttpRequest(
				{
					method: "GET", url: tamadres, headers:{'Content-type':'text/html'},
					overrideMimeType: "text/plain; charset=ISO-8859-9",
					onload: function(turkceozet) 
						{
							bas=turkceozet.responseText.indexOf("<strong>Bilgi </strong>");
							son=turkceozet.responseText.indexOf('</td></tr><tr><td colspan="3" height="7" class="title_orange">');
							icerik=turkceozet.responseText.substr(bas+24,son-bas-24);
							bas=turkceozet.responseText.indexOf("</h1>"); son=turkceozet.responseText.indexOf("/td>",bas);
							filmturkceadi="";
							adBas=turkceozet.responseText.indexOf("<b>Türkçe Adı </b>");
							if(adBas>0)
							{
								adSon=turkceozet.responseText.indexOf("<br><br>",adBas);
								filmturkceadi =turkceozet.responseText.substr(adBas+22,adSon-adBas-22);
							}
							document.getElementsByTagName("h3")[0].innerHTML+= ": " + filmturkceadi ;
							window.plot= document.documentElement.getElementsByTagName("table").item(2); //document.getElementById('warplink');
							plotTR=document.createElement("tr");
							plotTD=document.createElement("td");
							plotTD.colSpan=4;
							plotTR.appendChild(plotTD);
							plot.appendChild(plotTR);
							if(window.plot!=null)
							{
							ozetBaslik=document.createElement('h2');
							ozetBaslik.innerHTML='Özet: ' + filmturkceadi + "<br>" ; 
							//ozetBaslik.style.margin= "10px 0 0 0";
							plotTD.appendChild(ozetBaslik);
							ozetIcerik=document.createElement('div');
							ozetIcerik.innerHTML=icerik;
							plotTD.appendChild(ozetIcerik);
							}

						}
					
				});
			    }

			}
	});
}