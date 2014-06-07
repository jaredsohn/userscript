// ==UserScript==
// @name grades4gdst
// @description javascripts for input grades in gdst
// @match			http://61.142.33.204/*
// @match			http://172.16.1.8//*
// @include			http://61.142.33.204/*
// @include			http://172.16.1.8/*
// @updateURL		https://userscripts.org/scripts/source/156424.meta.js
// @downloadURL		https://userscripts.org/scripts/source/156424.user.js
// ==/UserScript==

window.$=function (id){
	if(!id) return null;
	if(id[0] == '#') return document.getElementsByClassName(id.substr(1));
	if(id[0] == '.') return document.getElementsByTagName(id.substr(1));
	else return document.getElementById(id);
}

window.get_input = function (p) {
	var a = $('user_input');
	var tails=["ps", "qm"]
	if(!a) return;
	if(p<0 || p > 1) return;
	a = a.value.split('\n');
	var i = 2;
	var j = 0;
	var input = $('DataGrid1__ctl'+i+'_' + tails[p]);
	while(input && j<a.length && a[j]!="") {
		input.value = a[j];
		i  = i + 1; j = j + 1; 
		input = $('DataGrid1__ctl'+i+ '_' + tails[p]);
	}
	alert(j);
	//alert(a.value.split('\n').length);
}

function fast_input() {
	var html = '<textarea spellcheck="false" id="user_input" style="height: 200px;"></textarea>';
	html = html + '<input id="fast_input" value="平时成绩" type="button" onclick="get_input(0)" />';
	html = html + '<input id="fast_input" value="期末成绩" type="button" onclick="get_input(1)" />';
	var obj = $('.body')[0];
	var f = document.createElement("div"); 
	f.innerHTML = html;
	obj.appendChild(f);
}

if(window.location.href.indexOf("/cjlr1.aspx") >= 0) fast_input();
