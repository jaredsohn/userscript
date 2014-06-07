// ==UserScript==
// @name			IMDb Torent Search
// @description		Searches torrents of movies from IMDb - Mencari File Torent Film dari IMDb.
// @version			1.0.1
// @date			13-08-2012
// @author			Phate Holloway
// @include			www.imdb.com/title/tt*
// @include			http://www.imdb.com/title/tt*
// ==/UserScript==
//Title variable
var ad = document.getElementsByTagName("h1")[0].innerHTML.split('<')[0].replace("'", "&#39;");

//The function to get elements by class
document.gln = function(cl){
   var gln = new Array;
   var elements = document.getElementsByTagName("*");
   for(var i=0;i<elements.length;i++){
      if(elements[i].className == cl){
         gln.push(elements[i]);
      }
   }
   return gln;
}

//Checks for the ads and removes if exist.
if(document.getElementById("top_rhs_wrapper")!=null){
	var s1 = document.getElementById("maindetails_sidebar_top");
	var s2 = document.getElementById("supertab");
	var s3 = document.getElementById("root");
	var s4 = document.gln("top-rhs")[0];
	var u1 = document.gln("top-rhs")[0];
	var u2 = document.gln("aux-content-widget-5")[0];
	var u3 = document.getElementById("top_ad_wrapper");
	var u4 = document.getElementById("bottom_ad_wrapper");
	var u5 = document.getElementById("top_rhs_wrapper");
	if(u5!=null){s4.removeChild(u5);}
	if(u1!=null){s1.removeChild(u1);}
	if(u2!=null){s1.removeChild(u2);}
	if(u3!=null){s2.removeChild(u3);}
	if(u4!=null){s3.removeChild(u4);}
}

//Creates our div called "torrent"
	var torrent = document.createElement("div");
	torrent.setAttribute("id","torrent");
	s1.appendChild(torrent);
	
//Filling inside the "torrent"
document.getElementById("torrent").innerHTML = 
"<style>"+
"#torrent{text-align:center; margin:auto; margin-bottom: 15px;}"+
"#torrent li{list-style-type:none; float:left; position:relative;}"+
"#torrent li:hover ul{display: block;}"+
"#torrent ul{padding:0; margin:0; margin-top:10px; list-style-type:none;}"+
"#torrent li ul {display: none;position: absolute;top: 1em;left: 0;}"+
"#torrent li > ul {top: auto;left: auto;}"+
".p {border:solid 1px #aaa;}"+
"a.aux-content-widget-3{font-size:11px !important;margin-right:4px;text-decoration:none}"+
"</style>"+
"<li>"+
"<a class='aux-content-widget-3' target='_blank' href='http://thepiratebay.se/search/"+ad+"/0/7/0'>PirateBay</a>"+
"<ul><li>"+
"<a class='aux-content-widget-3 iki' style='position:absolute; z-index:1;' target='_blank' href='http://thepiratebay.ee/search/"+ad+"/0/7/0'>.ee</a>"+
"</li></ul></li>"+
"<li>"+
"<a class='aux-content-widget-3' target='_blank' href='http://kat.ph/usearch/"+ad+"/?field=seeders&sorder=desc'>KAT</a>"+
"</li>"+
"<li>"+
"<a class='aux-content-widget-3' target='_blank' href='http://isohunt.com/torrents/?ihq="+ad+"'>IsoHunt</a>"+
"</li>"+
"<li>"+
"<a class='aux-content-widget-3' href='#' onclick='document.yify.submit()'>YIFY</a>"+
"</li>"+
"<form target='_blank' action='http://www.yify-torrents.com/browse-movie' name='yify' class='searchForm' accept-charset='utf-8' method='post'><input type='text' style='display: none;' name='Keywords' id='keywords' value='"+ad+"'></form></br>";
// ==Homepage==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.opacity= 0.75;
	div.style.position = "fixed";
	div.style.bottom = "+25px";
	div.style.left = "+15px";
	div.style.backgroundColor = "#0000ff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "3px";
	div.style.zIndex= "500";
	div.innerHTML = "<a style=\"font-weight:bold;color:#cccccc\" href=\"http://www.idlohulhaq.com\" title=\"KompuTechno Tutorials &amp; News\">[ idlohulhaqDOTcom ]</a>"

	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
