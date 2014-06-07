// ==UserScript==
// @name           Pokec.sk - zvyraznovanie sprav
// @namespace      http://
// @description    Vylepšené zvýrazňovanie správ na skle
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @include        http://www-pokec.azet.sk/miestnost/*
// @date           2014-May-04
// @author         Marvin-HOG (MaxSVK)
// @version        2.1
// ==/UserScript==


/* ************************************************************************** */
/* ********** Color definitions ********************************************* */
/* ************************************************************************** */


var colors = new Array();
	colors["preVsetkych"]  = "#222222";
	colors["odTeba"]       = "#4C8CD4";
	colors["preTeba"]      = "#1A5AA2";
	colors["tajneOdTeba"]  = "#D53B41";
	colors["tajnePreTeba"] = "#A3090F";
	colors["oTebe"]        = "#115511";
	colors["text"]         = "#EDEDED";
	colors["meno"]         = "#FFFFFF";
	colors["link"]         = "#777777";


/* ************************************************************************** */
/* ********** Get list of friends ******************************************* */
/* ************************************************************************** */


/* this is not recommended way to get global variables out of userscript */
var myWindow = null;

if(typeof unsafeWindow == "undefined") {
	myWindow = window;
} else {
	myWindow = unsafeWindow;
}

if(typeof $ == "undefined") {
	var $ = myWindow.jQuery;
}
/* end of comment */

var friends = null;

function setFriends(arrayOfFriends) {
	friends = arrayOfFriends;
}

function getUserIdentification() {
	return myWindow.i9;
}

$.getFriends = function(i9, args) {
	args = $.extend({
		url: "/moji-priatelia?i9=" + i9,
		type: 'GET',
		data: null,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		async: false,
		success: function(result) {
			var arrayOfFriendObjects = result.friends;
			var arrayOfFriends = new Array();
			for(var i = 0; i < arrayOfFriendObjects.length; i++)
			{
				arrayOfFriends.push(arrayOfFriendObjects[i][1]);
			}
			setFriends(arrayOfFriends);
		}
	}, args);
	return $.ajax(args);
};

var userIdentification = getUserIdentification();

$.getFriends(userIdentification);

/* ************************************************************************** */
/* ********** Get user name ************************************************* */
/* ************************************************************************** */


var nickBull = document.getElementById("nickBull");
var userName = nickBull.innerHTML;


/* ************************************************************************** */
/* ********** Add new CSS *************************************************** */
/* ************************************************************************** */


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head) {
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle(
	'.dd {border: 0px !important; padding-left: 177px !important;}\n' +
	'.dt {width: 169px !important; margin-left: 0px !important;}\n' +
	'.cas {color: #EDEDED !important;}\n' +
	'.sprava {color: #EDEDED !important; border-bottom: 1px solid rgba(17, 17, 17, 0.3) !important;}\n' +
	'.prispevok {border-left: 1px solid rgba(17, 17, 17, 0.3) !important; padding-left: 5px !important;}\n' +
	'.pre {font-weight: bold !important;}\n' +
	'#sklo #dl .hover {background-color: transparent !important;}\n' +
	'#sklo #dl .prispevok a {color: ' + colors["link"] + ';}\n' +
	'.pre .meno {color: ' + colors["meno"] + ' !important;}\n' +
	'.pre.vsetkych {background-color: transparent !important; display: none !important;}\n' +
	'.pre.teba {background-color: transparent !important;}\n' +
	'.pre.teba.tajne {background-color: transparent !important;}\n' +
	'#sklo .jehoPrispevky .jehoPrispevok {background-color: transparent !important;}\n' +
	'#sklo .jehoPrispevky .jehoPrispevok * {color: ' + colors["text"] + ';}\n' +
	'#sklo .jehoPrispevky .jehoPrispevok .cas {color: ' + colors["text"] + ' !important;}\n' +
	'#sklo .jehoPrispevky .jehoPrispevok .meno {color: ' + colors["meno"] + ' !important;}\n' +
	'#sklo .jehoPrispevok a[href], #sklo .jehoPrispevky .jehoPrispevok a[href], #sklo .jehoPrispevky .jehoPrispevok .pre a {color: ' + colors["meno"] + ' !important;}\n' +
	'#sklo .jehoPrispevok .c_bublitka *, #sklo .jehoPrispevky .jehoPrispevok .c_bublitka * {color: #1E2830 !important;}\n' +
	'#sklo .jehoPrispevok .c_bublitka a[href], #sklo .jehoPrispevky .jehoPrispevok .c_bublitka a[href] {color: #3878C0 !important;}\n' +
	''
);

var style = '';
for(var i = 0; i < friends.length; i++) {
	style += 'div[data-azetid="' + friends[i] + '"] .cas';
	if (i + 1 < friends.length) {
		style += ', ';
	}
}
style += '\n{text-align:left !important; width: 100% !important; height: 16px !important; background: rgba(0, 0, 0, 0) -30px -3908px no-repeat scroll url("http://s.aimg.sk/pokec_base/css/kabaty/kabat1/sprite_32px.gif?v=4") !important;}';
addGlobalStyle(style);

/* ************************************************************************** */
/* ********** Register new event listener *********************************** */
/* ************************************************************************** */

function setMessageColor(currentNode, colorToSet) {
	currentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'position: relative; background-color: ' + colors[colorToSet] + ' !important;');
}

var sklo = document.getElementById("sklo");
sklo.addEventListener('DOMNodeInserted', function(event) {
	var nodes;
	var node;
	var text;

	nodes = event.relatedNode.getElementsByClassName("pre vsetkych");
	for(var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		setMessageColor(node, "preVsetkych");
	}

	// This have to be first before detecting message for you and from you.
	nodes = event.relatedNode.getElementsByClassName("prispevok");
	for(var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		text = node.innerHTML;
		if(text.indexOf(userName) > -1) {
			node.parentNode.parentNode.setAttribute('style','position: relative; background-color: '+colors["oTebe"]+' !important;');
		}
	}

	nodes = event.relatedNode.getElementsByClassName("pre teba");
	for(var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(node.innerHTML == "pre Teba ") {
			setMessageColor(node, "preTeba");
		} else {
			setMessageColor(node, "odTeba");
		}
	}

	nodes = event.relatedNode.getElementsByClassName("pre teba tajne");
	for(var i = 0; i < nodes.length; i++) {
		node = nodes[i];
		if(node.innerHTML == "tajne pre Teba ") {
			setMessageColor(node, "tajnePreTeba");
		} else {
			setMessageColor(node, "tajneOdTeba");
		}
	}



}, true);

