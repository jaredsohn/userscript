// ==UserScript==
// @name          Illuminati Script (original version: IHA)
// @version       1.0
// @relesadate    20090919
// @description	  eRepublik script for eIlluminati 
// @author        daniferi (
// @namespace     indohun.host22.com
// @include       http://www.erepublik.com/*
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://darquibancada.freehostia.com/cavalcanti.html',

	onload:function(responseDetails){

	var eillu_logo = '<img width="70px" height="70px" src="http://i36.tinypic.com/24odr15.png"/>';

		var responseText = responseDetails.responseText;
		var tags = responseText.split('|');
		var order = tags[0];
		var region = tags[1];
		var lnk = tags[2];
		var ido = tags[3];
		var author = tags[4];
					
		latest=document.getElementById('maildisplay');

		var ihaLogo_div = document.createElement("div");
		ihaLogo_div.style.height="70px";
		ihaLogo_div.style.position="relative";
		ihaLogo_div.style.float="left";
		ihaLogo_div.style.clear="both";
		ihaLogo_div.style.marginBottom="5px";
		ihaLogo_div.style.backgroundColor="#FFFFFF";
		ihaLogo_div.innerHTML = '<a href="http://z6.invisionfree.com/eillu/index.php" target="_blank">' + eillu_logo +'</a>';

		var iha_div = document.createElement("div");
		iha_div.style.position="relative";
		iha_div.style.float="left";
		iha_div.style.clear="both";
		iha_div.style.marginBottom="0px";
		iha_div.style.backgroundColor="#ADD8E6";
		iha_div.innerHTML = '<font size="0.3em"><center>INSTRUÇÕES</center></font>';

		var ihaOrder_div = document.createElement("div");
		ihaOrder_div.style.position="relative";
		ihaOrder_div.style.float="left";
		ihaOrder_div.style.clear="both";
		ihaOrder_div.style.paddingBottom="15px";
		ihaOrder_div.style.marginBottom="10px";
		ihaOrder_div.style.backgroundColor="#F0F8FF";

		var ihaOrderHtml = '<font size="1px"><center><strong>' + order + '</strong></center></font></br> ';
		var ihaOrderHtml = ihaOrderHtml + '<center><hr size="1" color="blue"><font color="blue" size="1px"><strong>' + region + '</strong></center></font>';
		var ihaOrderHtml = ihaOrderHtml + '<div id="ihafight" style="position: relative; float: left; ';
		var ihaOrderHtml = ihaOrderHtml + 'margin-left: 15%; margin-right: 15%; width: 70%; ';
		var ihaOrderHtml = ihaOrderHtml + 'text-align: center; margin-top: 5px; ';
		var ihaOrderHtml = ihaOrderHtml + 'padding: 2px; background-color: #87CEEB;"> ';
		var ihaOrderHtml = ihaOrderHtml + '<a href="' + lnk + '"> ';
		var ihaOrderHtml = ihaOrderHtml + '<center><font color="#006400" face="Verdana"><strong>Fight!</strong></font></center>';
		var ihaOrderHtml = ihaOrderHtml + '</a></div>';
		var ihaOrderHtml = ihaOrderHtml + '<font size="1px"><center>' + author + " (" + ido +')</center></font> ';
			
		ihaOrder_div.innerHTML = ihaOrderHtml;
	
		latest.parentNode.insertBefore(ihaLogo_div, latest.nextSibling);
		latest.parentNode.insertBefore(iha_div, ihaLogo_div.nextSibling);
		latest.parentNode.insertBefore(ihaOrder_div, iha_div.nextSibling);
		latest.parentNode.insertBefore(iha_logo, ihaLogo_div);
		}	
		}
	);