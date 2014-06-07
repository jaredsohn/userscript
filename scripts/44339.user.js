// ==UserScript==
// @name           twitter from camouflage
// @namespace      http://twitter.com/rokudenashi
// @include        http://twitter.com/*
// ==/UserScript==

var JSONP_URL='http://wedata.net/databases/TwitterSources/items.json?callback=addSourceSelect'

function insertScript() {
var scriptObj=document.createElement("script")
scriptObj.setAttribute("type", "text/javascript");
scriptObj.setAttribute("charset", "utf-8");
scriptObj.textContent='var addSourceSelect='+addSourceSelect.toString()
var headLoc = document.getElementsByTagName("head").item(0);
headLoc.appendChild(scriptObj)
}
insertScript()

function jsonp() {
var scriptObj=document.createElement("script")
scriptObj.setAttribute("type", "text/javascript");
scriptObj.setAttribute("charset", "utf-8");
scriptObj.setAttribute("src", JSONP_URL);
var headLoc = document.getElementsByTagName("head").item(0);
headLoc.appendChild(scriptObj)
}
jsonp()

function addSourceSelect(clients) {
	var cmpByName=function (aa,bb) {
		var a=aa.name.toLowerCase()
		var b=bb.name.toLowerCase()
		if (a>b) return 1
		if (a<b) return -1
		return 0
	}
	var old=document.getElementById('source')
	if (old) {
		clients.sort(cmpByName)
		var r=Math.floor(Math.random()*clients.length)

		var select='from<select name="source" id="source">'
		select+='<option value="">web</option>'
		for (var i=0;i<clients.length;i++) {
			select+='<option value="'+clients[i].data.source+'" '+((i==r)?'selected':'')+'>'+clients[i].name+'</option>'
		}
		select+='</select>'

		var elm=document.createElement('div')
		elm.innerHTML=select
		old.parentNode.replaceChild(elm,old)
	}
}

