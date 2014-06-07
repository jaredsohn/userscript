// ==UserScript==
// @name           Better mo.hu
// @namespace      tewe
// @description    scripts for mo.hu
// @include        https://*magyarorszag.hu/*
// @version			1.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//---iWiw like button
if (document.getElementById("sidebar") != null) {
	var jobbhasab = document.getElementById('sidebar');	
	var doboz = jobbhasab.getElementsByClassName('box');
	var iwiw_like = document.createElement('iframe');
	var pageurl = location.href;
		iwiw_like.src ="http://iwiw.hu/like.jsp?u="+encodeURIComponent(document.location)+"&title="+encodeURIComponent(document.title)+"&t=ajanlom&s=white";
		iwiw_like.scrolling="no";
		iwiw_like.frameborder="0";
		iwiw_like.style.border = "none";
		iwiw_like.style.width = "220px";
		iwiw_like.style.height = "21px";
		iwiw_like.style.allowTransparency = "true";

doboz[0].parentNode.insertBefore(iwiw_like, doboz[3]);	
}

//---Facebook like button
if (document.getElementById("sidebar") != null) {
	var jobbhasab = document.getElementById('sidebar');	
	var doboz = jobbhasab.getElementsByClassName('box');
	var fb_like = document.createElement('iframe');
	var pageurl = location.href;
		fb_like.src ="http://www.facebook.com/plugins/like.php?href="+pageurl+"&amp;layout=standard&amp;show_faces=true&amp;width=234&amp;action=like&amp;colorscheme=light&amp;height=80";
		fb_like.scrolling="no";
		fb_like.frameborder="0";
		fb_like.style.border = "none";
		fb_like.style.width = "234px";
		fb_like.style.height = "80px";
		fb_like.style.allowTransparency = "true";
		fb_like.style.overflow = "hidden";

doboz[0].parentNode.insertBefore(fb_like, doboz[3]);	
}

//---Terkepek

//maps az intezmenyekbe
if (typeof(document.getElementsByClassName("infoText2")[0]) != 'undefined') {

	if (document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.search("<br>") != '-1') {
		var int_cim = document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.substr(document.getElementsByClassName("infoText2")[0].	getElementsByTagName("span")[0].innerHTML.search("<br>")+4, document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.search("</strong>")-document.getElementsByClassName("infoText2")[0].getElementsByTagName("span")[0].innerHTML.search("<br>")-4);
		
		var gmap = document.createElement("img");
		gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+int_cim+'&zoom=15&size=224x224&markers=color:blue|'+int_cim+'&sensor=false';
		gmap.alt = int_cim;
		document.getElementsByClassName("infoText2")[0].appendChild(gmap);
		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		gmap.addEventListener("click", goGmap, false);
	} 
		
}

//maps a hivatalkeresobe
if (document.getElementById("fld1a") != null) {
  if (document.getElementById("fld1a").name == 'instituteId' && document.getElementsByClassName("list")[0] != null) {
	var lista = document.getElementsByClassName("list")[0].getElementsByTagName("li");
	for (var i=0; i<lista.length; i++) {
		var hkereso_cim = lista[i].getElementsByTagName("p")[0].getElementsByTagName("strong")[0].textContent;

		var hkereso_gmap = document.createElement("img");
		hkereso_gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+hkereso_cim+'&zoom=15&size=424x224&markers=color:blue|'+hkereso_cim+'&sensor=false';
		hkereso_gmap.alt = hkereso_cim;
		lista[i].getElementsByTagName("p")[0].appendChild(hkereso_gmap);
		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		hkereso_gmap.addEventListener("click", goGmap, false);
	}
  }	
}

//maps az onkormanyzati kapcsolatokba

if (document.getElementById("citySearchForm") != null && document.getElementsByClassName("list")[0] != null) {
	var lista = document.getElementsByClassName("list")[0].getElementsByTagName("li");
	for (var i=0; i<lista.length; i++) {
		var hkereso_cim = lista[i].getElementsByTagName("p")[0].innerHTML.split("<br>", 1);
		var hkereso_gmap = document.createElement("img");
		hkereso_gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+hkereso_cim+'&zoom=15&size=424x224&markers=color:blue|'+hkereso_cim+'&sensor=false';
		hkereso_gmap.alt = hkereso_cim;
		lista[i].getElementsByTagName("p")[0].appendChild(hkereso_gmap);
		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		hkereso_gmap.addEventListener("click", goGmap, false);		
	}
}
//maps a bal oldali hivatakeresobe
if (document.getElementById("frmOfficeSearch") != null) {
  if (typeof(document.getElementById("frmOfficeSearch").getElementsByClassName("infoText")[0]) != "undefined") {
	var hivatallista = document.getElementById("frmOfficeSearch").getElementsByClassName("infoText");
	for (var i=0; i<hivatallista.length; i++) {
		var balhivatalkereso_cim = hivatallista[i].innerHTML.split("<br>", 3);
		var balhivatalkereso_cim_gmap = document.createElement("img");
		balhivatalkereso_cim_gmap.src = 'http://maps.google.hu/maps/api/staticmap?center='+balhivatalkereso_cim[1]+'&zoom=15&size=224x224&markers=color:blue|'+balhivatalkereso_cim[1]+'&sensor=false';
		balhivatalkereso_cim_gmap.alt = balhivatalkereso_cim[1];
		balhivatalkereso_cim_gmap.class = "gmap";

		function goGmap() {
			location.href='http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='+this.alt;
		}
		balhivatalkereso_cim_gmap.addEventListener("click", goGmap, false);
		
		hivatallista[i].appendChild(balhivatalkereso_cim_gmap);		
	}
  }
}

//---mo.hu google search
if (document.getElementById("findWhere") != null) {
	var newdropdown = document.createElement("option");
	newdropdown.id = "googledd";
	newdropdown.text = "Google keresés";
	document.getElementById("findWhere").appendChild(newdropdown);
	
	var Ginput = document.createElement("input");
	Ginput.type = "hidden";
	Ginput.name = "q";
	document.getElementById("findWhere").appendChild(Ginput);
	
	var holnemkeres = ["edemokracia", "forum", "kozlony", "hirdetmeny"];
	holnemkeres.unshift(" ");
	var holnemkeres = holnemkeres.join(" -");
	
	function GG() {
		if(newdropdown.selected == true) {
			var googlebutton = document.getElementById("frmMain_0");
			
			function GGsearch() {
				var searchtext = document.getElementById("findWhat").value;
				Ginput.value = searchtext+holnemkeres+" site:magyarorszag.hu";
				document.getElementById("frmMain").method="get";
				document.getElementById("frmMain").action="https://www.google.com/search";
				}
			googlebutton.addEventListener("click", GGsearch ,false)
			}
		}
	document.getElementById("findWhere").addEventListener("change", GG, false);
}
/*
//--mohu google osszkormanyzati kereso
if (window.location.host == "kereses.magyarorszag.hu" || window.location.host == "www.kereses.magyarorszag.hu") {
	if (document.getElementById("navigationLevel2") != null) {
		var osszkereso = document.createElement("li");
		osszkereso.innerHTML = "<a title=\"kormányzati kereső\">kormányzati kereső</a>"
		document.getElementById("navigationLevel2").appendChild(osszkereso);
		function loadOsszkereso() {
			document.getElementById("contentRight").innerHTML = "<script src=\"http://www.gmodules.com/ig/ifr?url=http://www.google.com/cse/api/016879067033444206012/cse/7dvk1w9kmp8/gadget&amp;synd=open&amp;w=350&amp;h=75&amp;title=Magyar+korm%C3%A1nyzati+keres%C5%91&amp;border=%23ffffff%7C0px%2C1px+solid+%23993333%7C0px%2C1px+solid+%23bb5555%7C0px%2C1px+solid+%23DD7777%7C0px%2C2px+solid+%23EE8888&amp;output=js\"></script>"}
		osszkereso.addEventListener("click", loadOsszkereso, false);
	}
}
*/

//---Sajat adatok 

//Sajat adatok rendezese
if (window.location.pathname.split('/')[2] == "sajatadatok") {
	addGlobalStyle('.formbody div.item span, div.item span  { clear:none !important; display: inline !important; margin: 0 2px !important; float: left;}');
	addGlobalStyle('.formbody div.item span label { clear:none !important; display: inline !important; float:none !important;}');
	addGlobalStyle('.catalogsectionbox  { clear:right ! important;}');
	addGlobalStyle('.formbody  { float:right ! important; width: 50%; margin: 6px 0 !important;}');
	addGlobalStyle('.formbody h3 { float:left !important; margin: 2px 6px 2px 0;}');
	addGlobalStyle('#formitem-nev-29 { width:230% !important;}');	
	addGlobalStyle('.actionbuttons-xenix { margin-top:20px !important;}');
	}
//Sajat adatok/beallitasok dizajn modositas	
if ((window.location.pathname.split('/')[2] == "sajatadatok") && (window.location.pathname.split('/')[3] == "beallitasok")) {	
	addGlobalStyle('#formHolder .formSection .section ul li {background-color:gainsboro; border:1px solid #CCCCCC; margin:5px; padding:5px; text-align:center; width:200px;-moz-border-radius:8px;-webkit-border-radius: 8px;}');
	addGlobalStyle('#formHolder .formSection .section ul li a {display: block; text-decoration:none !important;}');
	addGlobalStyle('#formHolder .formSection .section ul li:hover {display: block;background-color: #ccc; border: 1px solid gainsboro;}');
	}