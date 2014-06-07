// ==UserScript==
// @name           Follow5 140 Characters
// @namespace      http://heymu.com/
// @description     将Follow5的微博字符数限制在140以内，并以最常用的纯字符计数方式计算。
// @include        http://www.follow5.com/*
// @author          myheimu
// @homepage        http://heymu.com/
// ==/UserScript==

//windows.stopObserving("load");

function f5start() {
	var count = document.getElementById("noteCount");
	count.innerHTML = "140";
	var targets = document.getElementsByName("noteContent");
	var att = document.createAttribute("onkeyup");
	//att.value = "getCountValue4Me(this.value,140,'noteContent','noteCount');noteinput.getAtName(this.value);FM.TextAreaString.savePos(this)";
	att.value = "G(\"#noteCount\").text(''.concat(140 - this.value.length,'/',this.value.length));;noteinput.getAtName(this.value);FM.TextAreaString.savePos(this)";
	targets[0].attributes.setNamedItem(att);
};

window.addEventListener("load", f5start, false);