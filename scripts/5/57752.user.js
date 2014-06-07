// ==UserScript==
// @name           twitter_ua
// @description    twitter Ukrainian translation
// @include        http://twitter.com/*
// ==/UserScript==
var link = document.createElement('li');
	link.innerHTML = '@<a href=\"http://twitter.com/Zlojkashtan\">zlojkashtan</div>';
	document.getElementById("header").getElementsByTagName('ul')[0].appendChild(link);
var strings = {
// menu
	"Home" : "Головна",
	"Profile": "Профайл",
	"Find People" : "Пошук людей",
	"Settings" : "Налаштування",
	"Help" : "Допомога",
	"Sign out" : "Вийти",
	"Latest" : "Останнє",
	"Favorites" : "Обранне",
	"Your Favorites" : "Твоє обранне",
	"Search" : "Пошук",
// post message
	"Name" : "Ім'я",
	"Updates" : "Оновлення",
// menu	
	"About Us" : "Про нас",
	"Find on Twitter" : "Пошук на твітері",
	"Who are you looking for? " : "Кого шукаємо?",
	"Password" : "Пароль",
	"Username" : "Користувач",
	"Tips" : "Підказки",
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["(\\s*)Expires in (\\d*) days"] = "Закінчиться за $2 днів";
regexps["^(\\d*) comments$"] = "$1 коментарі";

regexps["^(\\d*) hours ago$"] = "$1 годин тому";
regexps["^(\\d*) minutes ago$"] = "$1 хвилин тому";

regexps["^(\\d*) days ago$"] = "$1 днів тому";
regexps["^Regions \\((\\d*)\\)"] = "Регіони ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Друзі ($1)";
regexps["^(\\d*) months"] = "$1 місяців";
regexps["^Comments(.*)"] = "Коментарі $1";


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

translateWholePage = function(e) {
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
  setTimeout(1, translateWholePage)
}, false);