// ==UserScript==
// @name            Greek/Hellenic Translation
// @author          Δημιουργήθηκε από τον TEObest1
// @version         0.1
// @homepage        http://userscripts.org/scripts/show/88023
// @include         http://www.cyberrepublik.com/en/*
// @require         http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

ScriptUpdater.check(88023, '0.1');  

var strings = {
// translations
"Search: " : "Αναζήτηση: ",
"Search:" : "Αναζήτηση:",
"Country Events" : "Εγχώρια Γεγονότα",
"Ranking" : "Κατάταξη",
"Country" : "Χώρα",
"Name" : "Όνομα",
	
	
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 σύμμαχοι";
regexps["^Active wars in (.*)$"] = "Ενεργοί πολέμοι σε $1:";
regexps["^Active resistance wars in (.*)$"] = "Ενεργοί πόλεμοι αντίστασης στην $1:";
regexps["(\\s*)Expires in (\\d*) days"] = "Λήγει σε $2 μέρες";
regexps["(\\s*)Expires in (\\d*) hours"] = "Λήγει σε $2 ώρες";
regexps["^(\\d*) comments$"] = "$1 σχόλια";
regexps["^(\\d*) hours ago$"] = "$1 ώρες πρίν";
regexps["^(\\d*) minutes ago$"] = "$1 λεπτά πρίν";
regexps["^(\\d*) days ago$"] = "$1 μέρες πρίν";
regexps["^(\\d*) months ago$"] = "$1 μήνες πρίν";
regexps["^Regions \\((\\d*)\\)"] = "Περιοχές ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Φίλοι ($1)";
regexps["^(\\d*) months"] = "$1 μήνες";
regexps["^Comments(.*)"] = "Σχόλια $1";
regexps["^Trackbacks(.*)"] = "Συνδέεται $1";
regexps["^Resistance Force of(.*)"] = "Επανάσταση της/του/το $1";

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