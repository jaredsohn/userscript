// ==UserScript==
// @name           Sort SU Groups by Alpha
// @namespace      http://mywebsite.com/myscripts
// @description    Sorts SU Groups by Alpha
// @include        *.stumbleupon.com/groups/*
// ==/UserScript==

var obj=document.links[13];
while (obj.nodeType != 1){
	obj = obj.parentNode;
}
var x  = document.createElement('span');
var z = obj.parentNode;
z.insertBefore(x,obj);
void(x.innerHTML="<a href=\"#\" id=\"atag\"><b>Sort by Alpha</b></a> &#183; ");
var bckup = document.getElementsByTagName("table")[6].innerHTML;



document.getElementById("atag").addEventListener("click",function(e) {
	if (document.getElementById("atag").innerHTML=="<b>Sort by Activity</b>") {
		//document.getElementsByTagName("table")[6].border =6;
		//document.getElementsByTagName("table")[6].innerHTML = "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"5\"><tbody>"+bckup;
		//document.getElementsByTagName("table")[6].border =0;
		//document.getElementById("atag").innerHTML="<b>Sort by Alpha</b>";
		window.location.reload(false);
	} else {
		bckup = document.getElementsByTagName("table")[6].innerHTML;
		var a = document.getElementsByTagName("table")[6].innerHTML;
		var n = "<a href=\"$1\"><img alt=\"$2\" src=\"$3\" border=\"0\"><br>$4</a> &#183; ";
		a = a.replace( /\<a\shref="([^\s"]*)"\>\<img\salt="(\S[^"]*.)"\ssrc="(\S[^"]*.)"\sborder=\"0\"\>\<br\>(.[^\<]*)/gi,n);
		void(n="");
		void(a = a.replace(/(\<[\/]?[t][^\>]*\>)/gi,n));
		a=a.split("</span></font><span class=\"mini\">");
		a[0]=a[0].replace("<span class=\"mini\">","");
		a=a.sort();
		var wrt="<table width=\"100%\" cellspacing=\"0\" cellpadding=\"5\"><tbody>";
		var i;
		for (i=0;i<a.length;i=i+5) {
			wrt=wrt+"<tr>";
			var j;
			for (j=0;j<5;j++) {
				if (a[i+j]) {
					wrt=wrt+"<td width=\"20%\" valign=\"bottom\" align=\"center\"><table cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td nowrap=\"true\" align=\"center\"><span class=\"mini\">";
					wrt=wrt+"<span class=\"mini\">" + a[i+j] + "</span>";wrt=wrt+"</td></tr></tbody></table></td>";
				}
			}
			wrt=wrt+"</tr>";
		}
		void(document.getElementsByTagName("table")[6].innerHTML="<center><span class=\"mini\">"+wrt+"</center>");
		document.getElementById("atag").innerHTML="<b>Sort by Activity</b>";
	}
}, false);




