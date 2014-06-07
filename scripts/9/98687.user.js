// ==UserScript==
// @name           Highlight Text (PRO)
// @description    Highlights text you want, in 3 different colors of your choice. To change highlighted words and color, use the user script command menu.
// @include        http://*
// @include        https://*
// @include        file:///*
// @copyright      Tony White
// @version        1.0.3 (PRO)
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://usocheckup.dune.net/56520.js?maxage=2
// ==/UserScript==

if(!GM_config) {return;}

// prepareRegex by Tony White
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\*\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
}

GM_config.init("Highlight Text Options", {
red: {
		label:"Red Words (separate by new line)",
		type:"textarea",
		cols:40,
		rows:5
		},
green: {
		label:"Green Words (separate by new line)",
		type:"textarea",
		cols:40,
		rows:5
		},
blue: {
		label:"Blue Words (separate by new line)",
		type:"textarea",
		cols:40,
		rows:5
		}
}, "#config_header {margin-bottom: 50px !important;} #words {display:block;}");
GM_registerMenuCommand("Highlight Text Options", GM_config.open);

var strip=/^\n+|\n+$/g, onen=/\n{2,}/g;
var words = {
red : GM_config.get("red").replace(strip,"").replace(onen, "\n").prepareRegex(),
green : GM_config.get("green").replace(strip,"").replace(onen, "\n").prepareRegex(),
blue : GM_config.get("blue").replace(strip,"").replace(onen, "\n").prepareRegex()
};
if(words['red']=="" && words['green']=="" && words['blue']=="") return;

// Define GM_addStyle if it's not Firefox
if(typeof GM_addStyle==='undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }

// Created by avg, modified by Tony White
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

function whichColor(w) {
for(var color in words) if(words[color].toLowerCase().indexOf(w.toLowerCase())!=-1) return color;
}

GM_addStyle(
".red {background-color:#FF0000; color:#000000; padding:0;}\n"+
".green {background-color: #3CC92C; color:#000000; padding:0;}\n"+
".blue {background-color: #30B6FE; color:#000000; padding:0;}"
);

var regex = new RegExp("([\\s\\S]*)("+words['red'].split("\n").join("|")+"|"+words['green'].split("\n").join("|")+"|"+words['blue'].split("\n").join("|")+")([\\s\\S]*)", "i");

function highlight(e) {
var node=e||document, re=regex,
	text=document.evaluate(".//text()",node,null,6,null);

for(var i=0,item; (item=text.snapshotItem(i)); i++) {
if(item.parentNode.tagName.toLowerCase()!="textarea" && item.parentNode.id.indexOf("highlighter_")==-1 && re.test(item.nodeValue)) {
		var id=item.nodeValue.match(re);
		item.parentNode.replaceChild(create("span", {}, new Array(
		document.createTextNode(id[1]),
		create("span", {className:whichColor(id[2]),id:"highlighter_"+i}, new Array(document.createTextNode(id[2]))),
		document.createTextNode(id[3])
		)), item);
}
}
}

highlight();
window.addEventListener('load', function(){
window.addEventListener('DOMNodeInserted', function(e){highlight(e.currentTarget.parentNode);}, false);
}, false);

