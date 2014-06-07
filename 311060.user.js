// ==UserScript==
// @name           YabanciDiziIzle Favori Diziler
// @namespace      yabancidiziizle1.com
// @description    favori diziler listesi ekler
// @include        http://www.yabancidiziizle1.com/*
// @author         cenksanal
// ==/UserScript==


var MyClass = document.getElementsByClassName('bloklm');
if (MyClass.length < 1) {



var kontrol=document.getElementsByClassName("avlink")[0].getAttribute("href");
uye=kontrol.match('/uye/(.+)')[1]
div=document.getElementsByTagName("div");

for (i=0;i<div.length;i++)
	if(div[i].parentNode.getAttribute("class")=="right") budiv=div[i];

window.ana=budiv.parentNode.parentNode;

divright=document.createElement("div");
divright.setAttribute("class","right");

divblokyap=document.createElement("div");
divblokyap.setAttribute("class","blokyap");

divsagust=document.createElement("div");
divsagust.setAttribute("class","sag-ust");

divsagorta=document.createElement("div");
divsagorta.setAttribute("class","sag-orta");

divsagalt=document.createElement("div");
divsagalt.setAttribute("class","sag-alt");

ul=document.createElement("ul");
ul.setAttribute("class","diziler");

li=document.createElement("li");
a=document.createElement("a");

ana.insertBefore(divright,budiv.parentNode);
    divright.appendChild(divblokyap);
        divsagust.innerHTML="<h4>FAVORİ DİZİLER</h4>";
        divblokyap.appendChild(divsagust);
            divblokyap.appendChild(divsagorta);
                divsagorta.appendChild(ul);
            divblokyap.appendChild(divsagalt);
                
                

                   
                        
GM_xmlhttpRequest(
{
  method: "GET",
  url: "http://www.yabancidiziizle1.com/uye/"+uye+"/favduzenle",
  headers: 
  {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': 'application/atom+xml,application/xml,text/xml',
  },
  onload: function(responseDetails) 
  {
  dizi=responseDetails.responseText.split('images/sil.png');

	for(i=1;i<dizi.length;i++)
	{
	diziadi=dizi[i].split('<div style="clear:both">')
	 dizietiket=diziadi[1].match(/<a href="(.+)">(.+)<\/a>/)[2]
	 sonizlenen=diziadi[2].match(/<a href="(.+)">(.+)<\/a>/)[1]
	 yenibolum=diziadi[3].match(/<a href="(.+)">(.+)<\/a>/)[1]
	 if(sonizlenen == yenibolum){
	   sonn=""
	   }
	 else{
	   sonn="(Yeni Bölüm)"};
		li=document.createElement("li");
		a=document.createElement("a");
		li.appendChild(a);
		ul.appendChild(li);
		a.setAttribute("href",sonizlenen);
		a.setAttribute("title",diziadi[2].match(/<a href="(.+)">(.+)<\/a>/)[2]);
		a.innerHTML=dizietiket+" <font color=red>"+sonn+"</font>";
		
	}

  }
});
 }