// ==UserScript==
// @name                Redlid Generator
// @description	        carbage propaply learned moran! 
// @include             http://omgcheesecake.net/*
// @include             http://*.omgcheesecake.net/*
// ==/UserScript==

var text;

function setCookie(c_name,value,exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name) {
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name) return unescape(y);
  }
}

var text = getCookie("redlid_motd");

if ((text == null) || (text == "") || (document.location.hash == "#redlid_generate")) {
 


  var intro_array = ["You're so idiot, you think that ",
                                "Chrome Dickhead says, ",
                                "Diesel Dickhead says, ",
                                "",
                                "",
                                "",
                                "",
                                ""];
                               
  var noun_array = ["AmigaOS ",
                                "Fuduntu",
                                "car",
                                "carbage",
                                "netbook",
                                "cpu",
                                "gpu",
                                "Windows 2000",
                                "Boing ball",
                                "decade of Linux",
                                "Haiku",
                                "shit",
                                "viewing Distances",
                                "movie theater",
                                "Ubuntu Fuduntu OS",
                                "Raeg",
                                "freetards",
                                "space shuttle OS",
                                "dickhead",
                                "moran",
                                "icehole",
                                "lanax",
                                "Android Desktop",
                                "Tablets",
                                "Joe Monco",
                                "Fusion Linux",
                                "Firefox",
                                "Mosaic browser",
                                "black hole generator",
                                "Windows 8",
                                "Windows 9",
                                "aeroplanes",
                                "houseparty",
                                "desktops",
                                "poo",
                                "<strike>Red</strike>Blue Hat Offices",
                                "ShitOS ",
                                "diesel engine",
                                "RedBull Renault",
                                "gas mileage"];
 
  var verb_array = [" beats ",
                                " beated ",
                                " beating ",
                                " boinc ",
                                " builded ",
                                " farg ",
                                " build ",
                                " cocking ",
                                " fuck ",
                                " plays ",
                                " played ",
                                " learns ",
                                " poo ",
                                " give ",
                                " learned "];
 
  var adverb_array = [" propaply",
                                " absolute",
                                "",
                                "",
                                ""];
 
  var adj_array = ["red ",
                                "blue ",
                                "",
                                "farging ",
                                "1377 ",
                                "",
                                "glueless ",
                                "",
                                "virtual ",
                                "",
                                "stupid ",
                                "nutser ",
                                "",
                                "butthurt ",
                                ""];
 
  var prep_array = [" for 10 years",
                                " for 100 years",
                                " for 1000 years",
                                " instead of 64 bit",
                                "",
                                " instead of 128 bit",
                                " in game of Rage",    
                                "",
                                " with 1% marketshare",
                                " with 99% marketshare",
                                " with 110% marketshare",
                                " with 50% marketshare",
                                "",
                                " with -10% marketshare",
                                "",
                                "",
                                "",
                                "",
                                " in year 1985",
                                " in year 2001",
                                " in year 2012",
                                "",
                                " in year 3015",
                                " out from the sky",
                                " with my GF",
                                "",
                                " in your ass",
                                "",
                                " for somebody",
                                "",
                                " with a shotgun in neighbourhood",
                                " without hassle",
                                "",
                                " from internet",
                                "",
                                " by past 3 years",
                                ""];
  var punct_array = ["!", "!", "!", "!", ".", ".", "?"];

  var intro = Math.floor(Math.random() * intro_array.length);
  var subj = Math.floor(Math.random() * noun_array.length);
  var verb = Math.floor(Math.random() * verb_array.length);
  var obj = Math.floor(Math.random() * noun_array.length );
  var adv = Math.floor(Math.random() * adverb_array.length);
  var adj = Math.floor(Math.random() * adj_array.length);
  var prep = Math.floor(Math.random() * prep_array.length);
  var punct = Math.floor(Math.random() * punct_array.length);

  text = intro_array[intro] + noun_array[subj] + adverb_array[adv] + verb_array[verb] + adj_array[adj] + noun_array[obj] + prep_array[prep] + punct_array[punct];


   setCookie("redlid_motd", text, 1);
}



var yownoncement = getCookie("yownoncement");


var elem = document.getElementsByTagName('div');
for (var i = 0; i < elem.length; i++) {
  if (elem[i].className == "message error") {
    if ((elem[i].innerHTML != yownoncement) || (document.location.hash == "#yownoncement")) {
	  yownoncement = elem[i].innerHTML;
	  alert(yownoncement);
	  setCookie("yownoncement", yownoncement, 365);
	}
    elem[i].innerHTML = text;
    break;
  }
}
