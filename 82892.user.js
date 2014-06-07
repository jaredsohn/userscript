// ==UserScript==
// @name           eFootball - Prevod v slovenščino
// @namespace      
// @description    Prevod 
// @version        V2 BETA
// @include        http://*efootball.webege.com/*
// ==/UserScript==

var strings = {
// translations
	"Register" : "registracija",
	"Login" : "Prijava",
	"About Us" : "O nas",
	"Player name:" : "Ime igralca:",
	"eRepublik name:" : "eRepublik ime:",
	"Your e-mail:" : "Tvoja e-pošta",
	"Your password:" : "Tvoje geslo",
	"Retype password:" : "Tvoje geslo:",
	"Singin" : "Registracija",
	"Home" : "Domov",
	"Password:" : "Geslo:",
	"Training" : "Trening",
	"Clubs" : "Klubi",
	"Statistics" : "Statistika",
	"Stadion" : "Stadion",
	"Your profile" : "Tvoj profil",
	"Logout" : "Odjava",
	"Player" : "Igralec",
	"Player skill" : "Igralčeva sposobnost",
	"Trainer skill" : "Trenerjeva sposobnost",
	"There are some statistics!" : "Tukaj je nekaj statistike!",
        "Club" : "Klub
        "Gold" : "Zlato",
        "Silver" : "Srebro",
        "Bronze" : "Bron",
        "Players" : "Igralci",
        "Clubs" : "Klubi",
        "Best club and player" : "Najboljši klub in igralec",
        "Welcome *" : "Dobrodošel *",
        "You can train today!" : "Danes lahko treniraš!",
        "Train" : "Treniraj",
        "Tommorow" : "Jutri",
        "You alredy trained!" : "Danes si že treniral/a!",
        "You can join to club or create club!" : "Lahko se v članiš ali naerdiš klub!",
        "Create club" : "Naredi klub",
        "Club name" : "Ime kluba",
        "Club owner" : "Lastnik kluba",
        "Desing by: eFootball Corporation and partners" : "Oblikovali: eFootball Corporation in partnerji",
        "Here you can login!" : "Tukaj se lahko prijaviš!",
        "Your club:" : "Tvoj klub:",
        "Your skill:" : "Tvoja sposobnost:",
        

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 zaveznikov";
regexps["^Active wars in (.*)$"] = "Aktivne vojne v $1:";
regexps["^Active resistance wars in (.*)$"] = "Aktivnodporniške vojne v $1:";
regexps["(\\s*)Expires in (\\d*) days"] = "poteče čez $2 dni";
regexps["^(\\d*) comments$"] = "$1 komentarjev";
regexps["^(\\d*) hours ago$"] = "pred $1 urami";
regexps["^(\\d*) minutes ago$"] = "pred $1 minutami";
regexps["^(\\d*) days ago$"] = "pred $1 dnevi";
regexps["^(\\d*) months ago$"] = "pred $1 meseci";
regexps["^Regions \\((\\d*)\\)"] = "Regije ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Prijatelji ($1)";
regexps["^(\\d*) months"] = "$1 mesecev";
regexps["^Comments(.*)"] = "Кomentarji$1";
regexps["^Trackbacks(.*)"] = "Povezano$1";


matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);