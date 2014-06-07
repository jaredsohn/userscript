// ==UserScript==
// @name           eRepublik Brazilian translate
// @namespace      created by Missurunha
// @description    
// @version        0.1
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// translations
	"+
	"Level 2" : "Razina 2",
	"Level 3" : "Razina 3",
	"Level 4" : "Razina 4",
	"Level 5" : "Razina 5",
	"Lithuania" : "Litvanija",
	"Lieutenant" : "Tenente",
	"Location" : "Prebivalište",
	"Login" : "Prijavi se",
	"Logout" : "Odjavi se",
	"log
	"You cannot trade with this country as you are at war with it" : "Ne možeš trgovati sa ovom državom jer ste u ratu",
	"You didn't specify the amount of products you wish to buy" : "Nisi naveo kolicinu koju želiš kupiti",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "Nemaš kartu. Kartu možeš kupiti na Tržnici.",
	"You do not have a newspaper" : "Nemaš novine",
	"You don't have a newspaper" : "Nemaš novine",
	"You don't have any active job offers" : "Nema otvorenih radnih mjesta",
	"You do not have any active job offers" : "Nema otvorenih radnih mjesta",
	"You have already worked today." : "Vec si radio danas.",
	"You have not trained today" : "Nisi trenirao danas",
	"You have succesfully edited your profile" : "Profil uspešno izmjenjen",
	"You have trained today. You can train again tomorrow." : "Trenirao si danas. Sutra možeš opet trenirati",
	"Your account" : "Moj racun",
	"Your accounts" : "Moja imovina",
	"Your birthday" : "Moj rodendan",
	"Your comment" : "Moj komentar",
	"Your companies" : "Moje kompanije",
	"Your email here" : "Tvoj e-mail",
	"Your inventory" : "Inventar",
	"Your offer has been updated" : "Vaša ponuda je obnovljena",


};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 saveznika";
regexps["^Active wars in (.*)$"] = "Aktivni ratovi u $1:";
regexps["^Active resistance wars in (.*)$"] = "Aktivni pobunjenicki ratovi u $1:";
regexps["(\\s*)Expires in (\\d*) days"] = "istice za $2 dana";
regexps["^(\\d*) comments$"] = "$1 komentari";
regexps["^(\\d*) hours ago$"] = "prije $1 sati";
regexps["^(\\d*) minutes ago$"] = "prije $1 minuta";
regexps["^(\\d*) days ago$"] = "prije $1 dana";
regexps["^(\\d*) months ago$"] = "prije $1 mjeseca";
regexps["^Regions \\((\\d*)\\)"] = "Regije ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Prijatelji ($1)";
regexps["^(\\d*) months"] = "$1 mjeseca";
regexps["^Comments(.*)"] = "?omentari$1";
regexps["^Trackbacks(.*)"] = "Linkovano$1";


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