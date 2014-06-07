// ==UserScript==
// @name        SDU qingongzhuxue js fix/山东大学资助中心列表显示
// @namespace   tag:liuyc,20140203:1
// @description Shandong University QinGongZhuXue javascripts fixes/山东大学资助中心列表显示/ http://202.194.15.34:8000
// @include     http://202.194.15.34:8000/*
// @version     0.2
// @grant       none
// ==/UserScript==
// TODO rewrite using newer version of ActiveWidgets
if(window.location.href.indexOf('http://202.194.15.34:8000/jiajiao.gg.do')>=0||window.location.href.indexOf('http://202.194.15.34:8000/xnqgzx.xn_dwzpxx.do')>=0||window.location.href.indexOf('http://202.194.15.34:8000/xnqgzx.xn_sqb.do')>=0){
	g='<tr style="border:1px solid;">';
	for (i=0;i<gridColumns.length;i++) g+='<th style="border:1px solid;">'+gridColumns[i]+'</th>';
	g+='</tr>';
	for(j=0;j<gridData.length;j++) {
		g+='<tr style="border:1px solid;">';
		for (i=0;i<gridData[j].length;i++) g+='<td style="border:1px solid;">'+gridData[j][i]+'</td>';
		g+='</tr>'
	}
	var otab= document.getElementsByTagName('table')[1];
	var gtab = document.createElement('table');
	gtab.innerHTML = g;
	gtab.style='border:1px solid;';
	otab.parentNode.insertBefore(gtab,otab);
}
