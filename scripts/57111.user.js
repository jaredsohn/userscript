// ==UserScript==
// @name           Pennergame Profil
// @namespace      Fügt ins Profil Informationsreiche daten ein
// @description    Fügt ins Profil Informationsreiche daten ein
// @include        *pennergame.de/profil*
// @exclude        *berlin.pennergame.de/profil*
// ==/UserScript==
var iid = window.location.pathname.split("/id:")[1];
var id = iid.split("/")[0];
var url = "http://pennergame.de/dev/api/user."+id+".xml"
GM_xmlhttpRequest({
    method:'GET',
    url:url,
    headers: {
        'User-agent':'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept':'application/atom+xml,application/xml,text/xml',
    },
    onload:function(responseDetails) {
var text = responseDetails.responseText;
//profildaten auslesen
var id1 = text.split("id>")[1];
var id2 = id1.split("</")[0];
var name1 = text.split("name>")[1];
var name2 = name1.split("</")[0];
var cash1 = text.split("cash>")[1];
var cash2 = cash1.split("</")[0];
var points1 = text.split("points>")[1];
var points2 = points1.split("</")[0];
var rankingpoints1 = text.split("rankingpoints>")[1];
var rankingpoints2 = rankingpoints1.split("</")[0];
var city1 = text.split("city>")[1];
var city2 = city1.split("</")[0];
var reg_since1 = text.split("reg_since>")[1];
var reg_since2 = reg_since1.split("</")[0];
//bandeninfos auslesen
var gid1 = text.split("id>")[3];
var gid2 = gid1.split("</")[0];
var gname1 = text.split("name>")[3];
var gname2 = gname1.split("</")[0];
var gstatus1 = text.split("status>")[1];
var gstatus2 = gstatus1.split("</")[0];
var gjoined1 = text.split("joined>")[1];
var gjoined2 = gjoined1.split("</")[0];

//mehr bandenifos
var gurl = "http://pennergame.de/dev/api/gang."+gid2+".xml"
GM_xmlhttpRequest({
    method:'GET',
    url:gurl,
    headers: {
        'User-agent':'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept':'application/atom+xml,application/xml,text/xml',
    },
    onload:function(qresponseDetails) {
var text = qresponseDetails.responseText;
var gpoints1 = text.split("points>")[1];
var gpoints2 = gpoints1.split("</")[0];
var gposition1 = text.split("position>")[1];
var gposition2 = gposition1.split("</")[0];
var gmember_count1 = text.split("member_count>")[1];
var gmember_count2 = gmember_count1.split("</")[0];
//ausgeben
var all = "<h1>Profil</h1><br>ID: "+id2+"<br>Name: "+name2+"<br>Geld: "+cash2+"€<br>Punkte: "+points2+"<br>Rang Punkte: "+rankingpoints2+"<br>Stadt: "+city2+"<br>Registrierung: "+reg_since2+"<br><h1>Bande</h1><br>Banden-Id: "+gid2+"<br>Bandenname: "+gname2+"<br>Status dieses Users: "+gstatus2+"<br>Erstellungsdatum: "+gjoined2+"<br>Punkte: "+gpoints2+"<br>Platzierung: "+gposition2+"<br>Mitglieder: "+gmember_count2;
 var div = document.createElement("div");
div.setAttribute('style', 'z-index:1;position:fixed;top:200px;right:30px;background:black;color:white;heilght: 100px;width:170px;border-width:12px; border-color:#66CC66; border-style:ridge; padding:5px;font-weight:bold');
document.body.insertBefore(div, document.body.firstChild);
div.innerHTML= "<center>"+all+"</center>";  
  }
});
//
  }
});