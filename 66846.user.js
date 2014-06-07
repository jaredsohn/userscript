// ==UserScript==
// @name           IMDB Turkce Ozet ve Altyazi
// @namespace      imdb.com
// @description    IMDB'ye Türkçe özet ve film adi destegi sunar. Bunun yaninda Divxplanet, TürkçeAltyazi, YedinciGemi, All4DivX gibi sitelerden direk altyazi indirme imkani sunar.
// @include        http://www.imdb.com/title
// @include        http://www.imdb.com/title/*
// @author         Cüneyt Aliustaoğlu
// ==/UserScript==

//window.ana= document.getElementById('overview-top');
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
window.lnk_divxplanet.title= "DivxPlanet altyazisini indir";
window.lnk_divxplanet.style.cursor='pointer';

window.lnk_divxplanet.target="_blank";

//window.spn_form= document.createElement('span');
//window.spn_form.innerHTML='<form target="_blank" action="http://divxplanet.com/index.php?page=arama" method="post" name="srcform"><input size="20" maxlength="64" name="arama" value="' + filmid + '" type="hidden">';
//window.ana.appendChild(spn_form);
//window.lnk_divxplanet.addEventListener('click',submitdivxplanet,false)

window.ana.appendChild(lnk_divxplanet);

//----------------------------------------------------
// 	divxplanet türkçe özet
//----------------------------------------------------
getDivxPlanetAdres();


//----------------------------------------------------
// 	turkcealtyazi
//----------------------------------------------------

filmAdiLower=filmtitle.toLowerCase();
filmAdiLower=filmAdiLower.replace(/ /g,"-");
filmAdiLower=filmAdiLower.replace(/'/g,"");
filmAdiLower=filmAdiLower.replace(/:/g,"");
filmIdLower=filmid.replace("tt","");

metatags = document.getElementsByTagName("meta");
metatags[1].content="text/html; charset=UTF-8";

turkcealtyaziadres="http://www.turkcealtyazi.org/mov/" + filmIdLower + "/" + filmAdiLower + ".html";

window.lnk_turkcealtyazi=document.createElement('a');
window.lnk_turkcealtyazi.innerHTML= "<img src='http://www.turkcealtyazi.org/images/favicon.ico' /> ";
window.lnk_turkcealtyazi.style.cursor='pointer';
window.lnk_turkcealtyazi.href=turkcealtyaziadres;
window.lnk_turkcealtyazi.title= 'TurkceAltyazi altyazisini indir';
window.lnk_turkcealtyazi.target= '_blank';
window.ana.appendChild(lnk_turkcealtyazi);

//----------------------------------------------------
// 	torrentz
//----------------------------------------------------
window.lnk_torrentz=document.createElement('a');
window.lnk_torrentz.innerHTML= "<img src='http://www.bittorrent.com/sites/default/files/bittorrent2_favicon.ico' /> ";
window.lnk_torrentz.style.cursor='pointer';
window.lnk_torrentz.href= 'http://www.torrentz.com/search?q=' + filmtitle;
window.lnk_torrentz.title= 'Torrentz linkini indir';
window.lnk_torrentz.target= '_blank';
window.ana.appendChild(lnk_torrentz);


//----------------------------------------------------
// 	divxforever
//----------------------------------------------------
window.frm_divxforever= document.createElement('span');
window.frm_divxforever.innerHTML='<form style="display:inline;" target="_blank" action="http://www.divxforevertr.com/index.php?act=subz&aka=on&CODE=06" method="post" name="form_divxforever"><input size="20" maxlength="64" name="imdb_id" value="' + filmid + '" type="hidden" /></form>';
window.ana.appendChild(frm_divxforever);
window.lnk_divxforever= document.createElement('a');
window.lnk_divxforever.title="DivxForever altyazisini indir";
window.lnk_divxforever.innerHTML= "<img src='http://www.divxforevertr.com/favicon.ico' /> ";
window.lnk_divxforever.style.cursor='pointer';
window.lnk_divxforever.addEventListener('click',submitdivxforever,false)
window.ana.appendChild(lnk_divxforever);
//----------------------------------------------------
// 	yedincigemi
//----------------------------------------------------

window.lnk_yedincigemi=document.createElement('a');
window.lnk_yedincigemi.innerHTML= "<img src='http://sinema.yedincigemi.com/favicon.ico' /> ";
window.lnk_yedincigemi.style.cursor='pointer';
window.lnk_yedincigemi.href='http://sinema.yedincigemi.com/search.php?qopt=subtitle&q=' + filmtitle;
window.lnk_yedincigemi.title= 'Yedincigemi.com üzerinde altyazi ara';
window.lnk_yedincigemi.target= '_blank';
window.ana.appendChild(lnk_yedincigemi);

//----------------------------------------------------
// 	all4divx
//----------------------------------------------------

window.lnk_all4divx=document.createElement('a');
window.lnk_all4divx.innerHTML= "<img src='http://www.all4divx.com/favicon.ico' /> ";
window.lnk_all4divx.style.cursor='pointer';
window.lnk_all4divx.href="http://www.all4divx.com/subtitles/" + filmtitle + "/English+Turkish/1";
window.lnk_all4divx.title= 'all4divx.com üzerinde coklu altyazi ara';
window.lnk_all4divx.target= '_blank';
window.ana.appendChild(lnk_all4divx);

//----------------------------------------------------
// 	subscene
//----------------------------------------------------

window.lnk_subscene=document.createElement('a');
window.lnk_subscene.innerHTML= "<img src='http://subscene.com/favicon.png' /> ";
window.lnk_subscene.style.cursor='pointer';
window.lnk_subscene.href='http://subscene.com/filmsearch.aspx?q=' + filmtitle;
window.lnk_subscene.title= 'Subscene.com üzerinde altyazi ara';
window.lnk_subscene.target= '_blank';
window.ana.appendChild(lnk_subscene);
//----------------------------------------------------
// 	opensubtitles
//----------------------------------------------------

window.lnk_opensubtitles=document.createElement('a');
window.lnk_opensubtitles.innerHTML= "<img src='http://static.opensubtitles.org/favicon.ico' /> ";
window.lnk_opensubtitles.style.cursor='pointer';
window.lnk_opensubtitles.href="http://www.opensubtitles.org/tr/search/imdbid-" + filmid.replace("tt","") + "/sublanguageid-tur";
window.lnk_opensubtitles.title= 'OpenSubtitles Türkçe altyazilarini indir ';
window.lnk_opensubtitles.target= '_blank';
window.ana.appendChild(lnk_opensubtitles);
//----------------------------------------------------
// 	podnapisi
//----------------------------------------------------

window.lnk_podnapisi=document.createElement('a');
window.lnk_podnapisi.innerHTML= "<img src='http://www.podnapisi.net/favicon.ico' /> ";
window.lnk_podnapisi.style.cursor='pointer';
window.lnk_podnapisi.href='http://www.podnapisi.net/ppodnapisi/search?tbsl=1&asdp=&sJ=0&sY=&sAKA=1&sK=' + filmtitle;
window.lnk_podnapisi.title= 'Podnapisi.com üzerinde altyazi ara';
window.lnk_podnapisi.target= '_blank';
window.ana.appendChild(lnk_podnapisi);
//----------------------------------------------------
// 	ekşisözlük
//----------------------------------------------------

window.lnk_sozluk=document.createElement('a');
window.lnk_sozluk.innerHTML= "<img src='http://static.sourtimes.org/favicon.ico' /> ";
window.lnk_sozluk.style.cursor='pointer';
window.lnk_sozluk.href='http://sozluk.sourtimes.org/show.asp?t=' + filmtitle;
window.lnk_sozluk.title= 'Eksi sözlükte film hakkinda ne söylemisler';
window.lnk_sozluk.target= '_blank';
window.ana.appendChild(lnk_sozluk);
//----------------------------------------------------
// 	movieposterdb
//----------------------------------------------------

window.lnk_moviepostersdb=document.createElement('a');
window.lnk_moviepostersdb.innerHTML= "<img src='http://www.movieposterdb.com/favicon.ico' /> ";
window.lnk_moviepostersdb.style.cursor='pointer';
window.lnk_moviepostersdb.href= "http://www.movieposterdb.com/movie/" + filmIdLower + "/" + filmAdiLower + ".html";
window.lnk_moviepostersdb.title= 'Film afislerini göster';
window.lnk_moviepostersdb.target= '_blank';
window.ana.appendChild(lnk_moviepostersdb);
//----------------------------------------------------
// 	demonoid
//----------------------------------------------------

window.lnk_demonoid=document.createElement('a');
window.lnk_demonoid.innerHTML= "<img src='http://www.demonoid.com/favicon.ico' /> ";
window.lnk_demonoid.style.cursor='pointer';
window.lnk_demonoid.href= "http://www.demonoid.com/files/?category=1&subcategory=All&language=0&quality=All&seeded=0&external=2&query=" + filmtitle + "&uid=0&sort=";
window.lnk_demonoid.title= 'Demonoid üzerinden torrent indir';
window.lnk_demonoid.target= '_blank';
window.ana.appendChild(lnk_demonoid);
//----------------------------------------------------
// 	katz
//----------------------------------------------------

window.lnk_katz=document.createElement('a');
window.lnk_katz.innerHTML= "<img src='http://movies.katz.cd/favicon.ico' /> ";
window.lnk_katz.style.cursor='pointer';
window.lnk_katz.href= "http://movies.katz.cd/search/" + filmtitle;
window.lnk_katz.title= 'Katz.cd linklerini göster';
window.lnk_katz.target= '_blank';
window.ana.appendChild(lnk_katz);


function submitdivxforever()
{
	for (i=0;i<document.forms.length;i++)
		if(document.forms[i].name=="form_divxforever") document.forms[i].submit();
}


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