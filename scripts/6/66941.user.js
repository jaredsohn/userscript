// ==UserScript==
// @name           DivxPlanet Son Cikan DivX Filmler
// @namespace      divxplanet.com
// @description    DivxPlanet'e P2P sitelerinde son yayinlanan DivX filmlerin oldugu bir menü ekler.
// @include        http://divxplanet.com/
// @include        http://divxplanet.com/*
// @author         Cüneyt Aliustaoğlu

// ==/UserScript==

// Oltayı DivxPlanet'te <em> etiketli "Sonuçlar haftalıktır" yazısının olduğu yere at.
oltadakiler=document.getElementsByTagName("em");

// bir kaç tane <em> etiketi daha var. Doğru olanı bulduğundan emin ol
for (i=0;i<oltadakiler.length;i++)
	if(oltadakiler[i].parentNode.getAttribute("class")=="tlbxr") olta=oltadakiler[i];

// daha sonra eklentileri bu oltanın altına at. Daha sonra oltayı sil, en sona eklemek için de append et.
window.ana=olta.parentNode.parentNode;

//<img src='http://divxplanet.com/site_themes/tr/images/divxplanet_r7_c27.jpg' alt=' height='21' width='29'></span>

divyavan=document.createElement("div");
divyavan.setAttribute("class","sag_blok_top");
divyavan.style.height="21px";
divyavan.style.paddingTop="4px";
divyavan.innerHTML="<span style='float:left;'><img src='http://divxplanet.com/site_themes/tr/images/divxplanet_r7_c27.jpg' alt=' height='21' width='29' style='margin:-4px;'></span>SON ÇIKAN DIVX FİLMLER&nbsp;&nbsp;";
divyavan.style.marginBottom="8px";
div_rip=document.createElement("div");
div_rip.setAttribute("id","div_rip");
div_rip.style.marginTop="5px";

div_links=document.createElement("div");


// DVDRIP
linkdvdrip=document.createElement("a");
linkdvdrip.title="Son DVDRIP filmleri göster";
linkdvdrip.innerHTML="DvdRip";
linkdvdrip.style.color="#FFFFFF";
linkdvdrip.style.padding= "4px";
linkdvdrip.style.marginRight= "10px";
linkdvdrip.style.cursor='pointer';
linkdvdrip.setAttribute("id","linkdvdrip");
linkdvdrip.addEventListener('click',function() { showRip("linkdvdrip","http://scenereleases.info/category/movies/movies-dvd-rip");},false);
div_links.appendChild(linkdvdrip);

// BLURAYRIP
linkbrrip=document.createElement("a");
linkbrrip.title="Son Blu-Ray Rip filmleri göster";
linkbrrip.innerHTML="Blu-Ray";
linkbrrip.style.color="#FFFFFF";
linkbrrip.style.padding= "4px";
linkbrrip.style.marginRight= "10px";
linkbrrip.style.cursor='pointer';
linkbrrip.setAttribute("id","linkbrrip");
linkbrrip.addEventListener('click',function() { showRip("linkbrrip","http://scenereleases.info/category/movies/movies-bluray-rip");},false);
div_links.appendChild(linkbrrip);

// DVDSCR
linkdvdscr=document.createElement("a");
linkdvdscr.title="Son Dvd Screener filmleri göster";
linkdvdscr.innerHTML="DvdScr";
linkdvdscr.style.color="#FFFFFF";
linkdvdscr.style.padding= "4px";
linkdvdscr.style.marginRight= "10px";
linkdvdscr.style.cursor='pointer';
linkdvdscr.setAttribute("id","linkdvdscr");
linkdvdscr.addEventListener('click',function() { showRip("linkdvdscr","http://scenereleases.info/category/movies/movies-screener");},false)
div_links.appendChild(linkdvdscr);

//R5
linkr5=document.createElement("a");
linkr5.title="Son R5 filmleri göster"
linkr5.innerHTML="R5";
linkr5.style.color="#FFFFFF";
linkr5.style.padding= "4px";
linkr5.style.marginRight= "10px";
linkr5.style.cursor='pointer';
linkr5.setAttribute("id","linkr5");
linkr5.addEventListener('click',function() { showRip("linkr5","http://scenereleases.info/category/movies/movies-r5");},false)
div_links.appendChild(linkr5);

//TS
linkts=document.createElement("a");
linkts.title="Son Telesync filmleri göster"
linkts.innerHTML="TS";
linkts.style.color="#FFFFFF";
linkts.style.padding= "4px";
linkts.style.marginRight= "10px";
linkts.style.cursor='pointer';
linkts.setAttribute("id","linkts");
linkts.addEventListener('click',function() { showRip("linkts","http://scenereleases.info/category/movies/movies-telesync");},false)
div_links.appendChild(linkts);

//CAM
linkcam=document.createElement("a");
linkcam.title="Son CamRip filmleri göster";
linkcam.innerHTML="Cam";
linkcam.style.color="#FFFFFF";
linkcam.style.padding= "4px";
linkcam.style.cursor='pointer';
linkcam.setAttribute("id","linkcam");
linkcam.addEventListener('click',function() { showRip("linkcam","http://scenereleases.info/category/movies/movies-cam");},false)
div_links.appendChild(linkcam);

ana.insertBefore(divyavan,olta.parentNode);
ana.insertBefore(div_rip,olta.parentNode);
ana.removeChild(olta.parentNode);
ana.insertBefore(div_links,div_rip);

//default olarak DvdRip paneli gözüksün
showRip("linkdvdrip","http://scenereleases.info/category/movies/movies-dvd-rip");

div_button_links=document.createElement("div");
div_button_links.style.marginTop="8px";
div_button_links.style.marginBottom="8px";
div_button_links.innerHTML="<hr /> Sayfa: ";
ana.appendChild(div_button_links);

butonYarat("1","buton1","");
butonYarat("2","buton2","/page/2");
butonYarat("3","buton3","/page/3");
butonYarat("4","buton4","/page/4");
butonYarat("5","buton5","/page/5");
butonYarat("6","buton6","/page/6");
butonYarat("7","buton7","/page/7");
butonYarat("8","buton8","/page/8");
butonYarat("9","buton9","/page/9");

function butonYarat(caption,id,url)
{
	linknumaralar=document.createElement("a");
	linknumaralar.style.backgroundColor="#3399CC";
	linknumaralar.title= caption + ". sayfayı göster";
	linknumaralar.innerHTML=caption;
	linknumaralar.style.color="#FFFFFF";
	linknumaralar.style.padding= "4px";
	linknumaralar.style.marginRight= "4px";
	linknumaralar.style.cursor='pointer';
	linknumaralar.setAttribute("id",id);
	linknumaralar.addEventListener('click',function() { showRipPages(id,url,id);},false);
	div_button_links.appendChild(linknumaralar);
}
function butonStilleriniSifila()
{
	for (i=1;i<10;i++) document.getElementById("buton" + i).style.backgroundColor="#3399CC";
}

function stilleriSifirla()
{
	linkdvdrip.style.backgroundColor="#3399CC";
	linkbrrip.style.backgroundColor="#3399CC";
	linkdvdscr.style.backgroundColor="#3399CC";
	linkr5.style.backgroundColor="#3399CC";
	linkts.style.backgroundColor="#3399CC";
	linkcam.style.backgroundColor="#3399CC";
}


function showRip(riptype,url)
{
	window.gosterilenRipURL=url;
	window.sonTiklanan="rip";
	stilleriSifirla();
	document.getElementById(riptype).style.backgroundColor="#FF6C0A";
	div_rip.innerHTML="";
	loadMovies(url,riptype);
}

function showRipPages(riptype,url,pageid)
{
	butonStilleriniSifila();
	document.getElementById(pageid).style.backgroundColor="#FF6C0A";
	div_rip.innerHTML="";
	loadMovies(window.gosterilenRipURL+url,riptype);
}



function loadMovies(movieurl,riptype)
{
GM_xmlhttpRequest(
{
  method: "GET",
  url: movieurl,
  headers: 
  {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': 'application/atom+xml,application/xml,text/xml',
  },
  onload: function(responseDetails) 
  {
	dizi=responseDetails.responseText.split("<h2");
	table= document.createElement("table");
	table.setAttribute("id","table"+riptype)

	window.toplamLinkSayisi=(dizi.length-1)*3;  //bütün yüklememeler tamamlandı mı kontrol için
	window.tamamlananLinkSayisi=0;

	for(i=1;i<dizi.length;i++)
	{
		fbas=dizi[i].indexOf('">',50);
		fson=dizi[i].indexOf("</a>");
		filmadi= dizi[i].substr(fbas+2,fson-fbas-2);
		tr=document.createElement("tr");
		td=document.createElement("td");
		a=document.createElement("a");
		a.setAttribute("id","link"+riptype+i)
		td.appendChild(a);
		tr.appendChild(td);
		table.appendChild(tr);
		a.innerHTML=filmadi;

		ibas=dizi[i].indexOf('http://www.imdb.com/title/');
		imdbid=dizi[i].substr(ibas+26,9);
		writeDivxPlanetAdres(imdbid,riptype+i);
		
	}
	
	div_rip.appendChild(table);
	//eğer sayfa değil de ana menü butonlarından biri basılmışsa aktif sayfayı 1 yap
	//aslında ana menüye basıldığında aktif sayfa daima 1 olur ancak, style bilgileri atanmıyor
	if(riptype.indexOf("buton")<0) {butonStilleriniSifila(); document.getElementById("buton1").style.backgroundColor="#FF6C0A";}

	ana.appendChild(olta.parentNode);	//Sonuçlar haftalıktır'ı tekrar yapıştır en sonda olsun
  }
});
//-------------------writeDivxPlanetAdress---------------------------
function writeDivxPlanetAdres(imdbid,linkid)
{
GM_xmlhttpRequest(
{
	method: "POST",
	url: "http://divxplanet.com/index.php?page=arama",
	headers:{'Content-type':'application/x-www-form-urlencoded'},
	data: "arama=" + imdbid,
	onload: function(adresibul) 
		{
		    if(adresibul.responseText.indexOf('window.location.href')>0)
			{
			tamadres=adresibul.responseText;
			tamadres=tamadres.substr(tamadres.indexOf('"')+1,tamadres.lastIndexOf('"')-tamadres.indexOf('"')-1);
			if(document.getElementById("link"+linkid)) document.getElementById("link"+linkid).setAttribute("href",tamadres);
			}
		    else {document.getElementById("link"+linkid).setAttribute("title","Bu filme ait hiçbir altyazi yoktur.");}
		}
});

}

}