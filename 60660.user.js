// ==UserScript==
// @name        eJahan Napiparancs
// @version     0.1
// @description eJahan Magyar Napiparancs
// @author      Jackneill
// @namespace   IM
// @include     http://*ejahan.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var orderObj = {};
var thisVersion = 9;
var lastVersion = -1;
var now = new Date().getTime();
var HOUR = 3600000; // óránként ellenőrizni

function showRefresh() {
	if (thisVersion != lastVersion) {
		if (thisVersion > lastVersion) {
			$('#eHUNOrderRefresh').html('<a style="color:red;" href="http://ereptoolkit.googlecode.com/svn/order/erep_orders.v'+lastVersion+'.user.js">Ez a hivatalosnál ('+lastVersion+') frissebb verzió. Innen visszatérhetsz a hivatalosra</a>' );
		} else { 
			$('#eHUNOrderRefresh').html('<a style="color:red;" href="http://ereptoolkit.googlecode.com/svn/order/erep_orders.v'+lastVersion+'.user.js">Telepítsd az új verziót: '+lastVersion +' (Jelenleg:'+thisVersion+')</a>' );
		}
	}
}

function refresh() {
	lastRefresh = GM_getValue('eHunOrderScriptTime',0)*1;
	lastVersion = GM_getValue('eHunOrderScriptVersion',1);
	GM_log('refresh '+now +' vs ' + (lastRefresh+HOUR) +',' + lastRefresh +',' + (now > lastRefresh+HOUR));
	if (now > lastRefresh+HOUR) {
        GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ereptoolkit.googlecode.com/svn/order/version.json?time='+now,
			onload:function(responseDetails){
				var versionObj = eval('('+unescape(responseDetails.responseText)+')');
				showVersion(versionObj);
			}
		});
	}
	
	showRefresh();
}

function showVersion(versionObj) {
	GM_log('refresh ok:'+versionObj+","+lastVersion);
	lastVersion = versionObj.GM_version*1;
	showRefresh();
	GM_setValue('eHunOrderScriptTime',''+now);
	GM_setValue('eHunOrderScriptVersion',''+lastVersion);
}

function Main(e) {
	try {
		cID = $("div.core div.avatarholder a").attr("href").split('/')[4];
	} catch (e) {}
	isCitizen = $('#wellnessvalue').size()>0;
	nick = $('div.nameholder a:first').html();
	if (nick) {
		nick = nick.replace(/ /g,"_");
	}
	if (isCitizen && nick) {
		GM_setValue('eHunOrderNick',nick);
		GM_setValue('eHunOrderID',cID);
	} else {
		nick = GM_getValue('eHunOrderNick',nick);
		cID = GM_getValue('eHunOrderID',cID);
	}

	$('#latestnews').before(
		'<div style="background-color:#e9f5fa; border: 1px solid #c6dde6; padding:0px; margin:0px;"\
		><img width="330" height="30" src="http://ereptoolkit.googlecode.com/svn/order/fejlec.png"\
		/><div id="eHUNOrder"><img src="/images/parts/ajax-loader.gif"/></div><div id="eHUNOrderRefresh" ></div\
		><table width="333"><tr height="30" style="background-image:url(\'http://ereptoolkit.googlecode.com/svn/order/hatter.png\'); background-repeat:repeat-x;">\
		<td><a href="http://www.erepublik.com/en/newspaper/hadugyi-kozlony-177586/1" title="Hadügyi közlöny" target="_blank">\
		   <img src="http://ereptoolkit.googlecode.com/svn/order/kozlony.png"/>\
		</a></td>\
		<td><a href="http://widget.mibbit.com?channel=%23erep&nick='+(nick?nick:'Ide a nevedet')+'" title="Erep csatorna a Mibbiten" target="_blank">\
		   <img src="http://ereptoolkit.googlecode.com/svn/order/mibbit.png"/>\
		</a></td>\
		<td><a href="http://widget.mibbit.com?channel=%23hadtap&nick='+(nick?nick:'Ide a nevedet')+'" title="Fegyverosztás csatorna a Mibbiten" target="_blank">\
		   <img src="http://ereptoolkit.googlecode.com/svn/order/osztas.png" />\
		</a></td>\
		<td><a href="http://www.erepublik.com/en/citizen/donate/items/'+cID+'" title="Saját donate link" target="_blank">\
		   <img src="http://ereptoolkit.googlecode.com/svn/order/donate.png" />\
		</a></td>\
		<td width="100%"></td>\
		</tr></table></div>');

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://erepmarket.com/ehungary/parancs/parancs.json?time='+now,
		onload:function(responseDetails){
			var responseText = responseDetails.responseText;
			var orderObj = eval('('+unescape(responseText)+')');
			showOrder(orderObj);
		}
	});

	refresh();
}

function showOrder(orderObj) {
	$('#eHUNOrder').html(
	'<a style="font-size:14px; font-family:Verdana; color:black;"'
	+' href="http://www.erepublik.com/en/battlefield/'
	+orderObj.battleid+'"><table><tr><td valign="top"><IMG style="padding-right:5px;" SRC="http://ereptoolkit.googlecode.com/svn/order/fight.jpg"\
	></td><td valign="top" style="font-size:14px; font-family:Verdana; color:black;">'+orderObj.text+'   (' + orderObj.region 
	+ ') <br/><font  style="font-size:8px; font-family:Verdana;  padding-top:6px">Vége: '+orderObj.endtime 
	+'</font></td></tr></table></a>'
	+'<p align="right" style=" font-style: italic; padding-top:8px; padding-right:5px;">Kiadva: '+orderObj.timestamp +' by '+ orderObj.editor+' </p>'
	);
}

window.addEventListener('load', function(){var checker=setInterval(function(){
        if(typeof ($ = jQuery.noConflict()) != "undefined") {
                clearInterval(checker);
                Main();
        }
},100);}, false);
