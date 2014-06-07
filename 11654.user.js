// ==UserScript==
// @name           deviantSTATS
// @namespace      http://solitude12.deviantart.com/
// @description    Adds deviant stats to the userpage of any deviant!
// @include        http://*.deviantart.com/
// ==/UserScript==

/* 
(c) Solitude12 - http://solitude12.deviantart.com/
or in other words...
RAWR MY CODE, NO TOUCHY!!!!!!!!!!!!
*/

/* This is from a site... I don't know which one D: */
function getElementsByClassName(oElm, strTagName, oClassNames){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var arrRegExpClassNames = new Array();
	if(typeof oClassNames == "object"){
		for(var i=0; i<oClassNames.length; i++){
			arrRegExpClassNames.push(new RegExp("(^|\s)" + oClassNames[i].replace(/-/g, "\-") + "(\s|$)"));
		}
	}
	else{
		arrRegExpClassNames.push(new RegExp("(^|\s)" + oClassNames.replace(/-/g, "\-") + "(\s|$)"));
	}
	var oElement;
	var bMatchesAll;
	for(var j=0; j<arrElements.length; j++){
		oElement = arrElements[j];
		bMatchesAll = true;
		for(var k=0; k<arrRegExpClassNames.length; k++){
			if(!arrRegExpClassNames[k].test(oElement.className)){
				bMatchesAll = false;
				break;
			}
		}
		if(bMatchesAll){
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}
const deviantNAME = window.location.host.substring(0, window.location.host.indexOf(".")).toLowerCase();
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://' + deviantNAME + '.deviantart.com/stats/gallery/script.js.php/gallerystats.js',
    onload: function(responseDetails) {
    	var data = responseDetails.responseText;
	eval(data);
var ll = getElementsByClassName(document, "div", "ll")[0];
var box = document.createElement("div");
box.setAttribute("class","box");
box.setAttribute("id","dstatsbox");
ll.appendChild(box);

var boxtop = document.createElement("div");
boxtop.setAttribute("class","boxtop");
boxtop.setAttribute("id","dstatsboxtop");
document.getElementById('dstatsbox').appendChild(boxtop);

var liky = document.createElement("a");
liky.setAttribute("style","float: right; position: relative; top: 8px; opacity: 0.5;");
liky.setAttribute("href","http://"+deviantNAME+".deviantart.com/stats/gallery/");
liky.innerHTML="More";
document.getElementById('dstatsboxtop').appendChild(liky);

var h2 = document.createElement("h2");
h2.setAttribute("class","c");
h2.setAttribute("id","dstatsh2");
document.getElementById('dstatsboxtop').appendChild(h2);

var icon = document.createElement("i");
icon.setAttribute("class","icon i23");
document.getElementById('dstatsh2').appendChild(icon);

document.getElementById('dstatsh2').appendChild(document.createTextNode(" Stats"));

var ul = document.createElement("ul");
ul.setAttribute("class","f h list");
ul.setAttribute("id","dstatsul");
document.getElementById('dstatsbox').appendChild(ul);

function filterNum(str) {
	re = /\$|\s|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
	return str.replace(re, "");
}

function addStat(name, value, color){
var idd = filterNum(name);
if (!color){color='';} else {color=' a';}
var li = document.createElement("li");
li.setAttribute("class","f"+color);
li.setAttribute("id",idd);
document.getElementById('dstatsul').appendChild(li);
var divvy = document.createElement("div");
divvy.setAttribute("style","float: right;");
divvy.innerHTML = value;
document.getElementById(idd).appendChild(divvy);
var bbb= document.createElement("b");
bbb.innerHTML = name;
document.getElementById(idd).appendChild(bbb);
}


	addStat('Friends', _GF.friends, false);
	addStat('Watchers',  _GF.friendswatching, true);
	addStat('Comments Given',  _GF.comments, false);
	addStat('Comments Received',  _GF.comments_received, true);
	addStat('Favourites',  _GF.favourites, false);
	var mostvn=0;var mostv;var mostvt;
	var mostfn=0;var mostf;var mostft;
	var mostcn=0;var mostc;var mostct;
	for (var i in _GF.deviations){
		if (_GF.deviations[i].views>=mostvn){
			mostvn = _GF.deviations[i].views;
			mostv = _GF.deviations[i].id;
			mostvt = _GF.deviations[i].title;
		}
		if (_GF.deviations[i].favourites>=mostfn){
			mostfn = _GF.deviations[i].favourites;
			mostf = _GF.deviations[i].id;
			mostft = _GF.deviations[i].title;
		}
		if (_GF.deviations[i].comments>=mostcn){
			mostcn = _GF.deviations[i].comments;
			mostc = _GF.deviations[i].id;
			mostct = _GF.deviations[i].title;
		}
	}
	if (_GF.deviations.length!=0){
	addStat('Most Viewed Dev.', '<u><a href="http://www.deviantart.com/deviation/'+mostv+'/">'+mostvt+'</a></u>', true);
	addStat('Most Favourited Dev.', '<u><a href="http://www.deviantart.com/deviation/'+mostf+'/">'+mostft+'</a></u>', false);
	addStat('Most Commented Dev.', '<u><a href="http://www.deviantart.com/deviation/'+mostc+'/">'+mostct+'</a></u>', true);
	}
    }
});