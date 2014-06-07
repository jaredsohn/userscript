// ==UserScript==
// @name           eRepublik Optimizer - Romania
// @namespace      Cristy2005ro
// @description    eRepublik Romania
// @include        *.erepublik.com/*
// ==/UserScript==

		function addGlobalStyle(css) {
			var head, style;
			head = document.getElementsByTagName('head')[0];
			if (!head) { return; }
			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			head.appendChild(style);
		}
		
		function detectAll(xpath) {
			var headings = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE,null); 	
			var thisHeading = headings.iterateNext();
			var alertText = "\n"
		
			while (thisHeading) {
				alertText += thisHeading.textContent + "\n"
				thisHeading = headings.iterateNext();
			}
			return (alertText);
		}
		
		function detectFirst(xpath) {
			var headings = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE,null); 	
			var thisHeading = headings.iterateNext();
			var alertText = "\n"
		
			while (thisHeading) {
				alertText += thisHeading.textContent + "\n"
				thisHeading = headings.iterateNext();
				return (alertText);
			}
		}

GM_registerMenuCommand("URL loc de muncă", function(){ GM_setValue('COMPANY',prompt("Copiaţi URL de la compania la care lucraţi:") ) } );
GM_registerMenuCommand("Ţara", function(){ GM_setValue('COUNTRY',prompt("Codul de ţară:") ) } );
GM_registerMenuCommand("1. meniu", function(){ GM_setValue('OPT1_NAME',prompt("1. meniu nou:") ) } );
GM_registerMenuCommand("1. meniu URL", function(){ GM_setValue('OPT1_URL',prompt("1. meniu URL:") ) } );
GM_registerMenuCommand("2. meniu", function(){ GM_setValue('OPT2_NAME',prompt("2. meniu nou:") ) } );
GM_registerMenuCommand("2. meniu URL", function(){ GM_setValue('OPT2_URL',prompt("2. meniu URL:") ) } );
GM_registerMenuCommand("3. meniu", function(){ GM_setValue('OPT3_NAME',prompt("3. meniu nou:") ) } );
GM_registerMenuCommand("3. meniu URL", function(){ GM_setValue('OPT3_URL',prompt("3. meniu URL:") ) } );
GM_registerMenuCommand("4. meniu", function(){ GM_setValue('OPT4_NAME',prompt("4. meniu nou:") ) } );
GM_registerMenuCommand("4. meniu URL", function(){ GM_setValue('OPT4_URL',prompt("4. meniu URL:") ) } );

addGlobalStyle('#menubar input.field {background:transparent url(/images/parts/bg-search.gif) no-repeat scroll right center;border:medium none;color:#808080;display:block;float:left;height:21px;padding:6px 0 0 6px;width:157px;} .commentscontent .smallholder {direction:ltr; text-align:left; background:#f0f0f0; padding-right:5px !important;padding-top:5px !important;margin-top:5px;}  body {background:#fdfdfd;} .information {line-height:1.4em;font-size: 9pt ! important; font-family:Tahoma !important; direction:ltr !important; text-align:left !important;} p.preview, #article_comment, .writearticle textarea {font-size: 9pt ! important; font-family:Tahoma !important; direction:ltr !important; text-align:left !important;} body {font-family:calibri !important;} .smallholder {font-family:tahoma; font-size:9pt;} li #id{visibility:none;} div#menubar.seperator {color:#216e8a;} div#menubar {padding-right:5px; color:#eaf9ff !important; text-align:center; width:940px;margin: 0 auto 0 auto;border-radius:4px;-moz-border-radius: 4px;-webkit-border-radius: 4px; border: 1px solid #000000; margin-bottom: 5px; margin-top:2px;background-color: #699fb2; padding-left:10px; padding-bottom:5px;} .menubar{font-size:11pt;} div#menubar a{font-weight:normal;color:#eaf9ff !important;} div#menubar a:hover{text-decoration:underline !important;}');

var livetime = document.getElementById('live_time');
var searchholder = document.getElementById('searchholder');

var adSidebar = document.getElementById('promo');
if (adSidebar)	adSidebar.parentNode.removeChild(adSidebar);

var footer = document.getElementById('footer');
if (footer)	footer.parentNode.removeChild(footer);

date = detectFirst("/html/body/div/div/div[2]/div[3]/div/span[2]");
dateCount = detectFirst("/html/body/div/div/div[2]/div[3]/div/span[3]/strong");
if ( date )		{} else date = detectFirst("/html/body/div/div/div[2]/div[2]/div/span[2]");
if ( dateCount )	{} else dateCount = detectFirst("/html/body/div/div/div[2]/div[2]/div/span[3]/strong");

var company_URL;
var nat_code;
var menu1_name, menu2_name, menu3_name, menu4_name;
var menu1_url, menu2_url, menu3_url, menu4_url;

company_URL = GM_getValue('COMPANY');
nat_code = GM_getValue('COUNTRY');

menu1_name = GM_getValue('OPT1_NAME');
menu1_url = GM_getValue('OPT1_URL');
menu2_name = GM_getValue('OPT2_NAME');
menu2_url = GM_getValue('OPT2_URL');
menu3_name = GM_getValue('OPT3_NAME');
menu3_url = GM_getValue('OPT3_URL');
menu4_name = GM_getValue('OPT4_NAME');
menu4_url = GM_getValue('OPT4_URL');

var header = document.getElementById('header');
if  (header) {
	var quicklinks = document.createElement("div");
	quicklinks.innerHTML = '<div class="menubar" id="menubar"><p style="margin: 2px 0 1px 0; padding-top:1px; padding-bottom:7px;">' + 
	'<div style="float:left;">' + 
		'<a href="'+company_URL+'">Locul de muncă </a> | ' + 
		'<a href="http://www.erepublik.com/en/my-places/army">Armată </a> | ' + 
		'<a href="http://www.erepublik.com/en/wars/1">Războaie </a> | ' + 
		'<strong><u>Piaţă:</u> </strong><a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-1-quality-0"> Pâine </a>, ' + 
			'<a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-2-quality-0">Cadou </a>, ' + 
			'<a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-4-quality-0">Bilet </a>, ' + 
			'<a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-3-quality-0">Arme </a></div>' + 
	'<div style="float:right;">' + 
		'<a href="'+menu1_url+'">'+menu1_name+'</a> | ' + 
		'<a href="'+menu2_url+'">'+menu2_name+'</a> | ' + 
		'<a href="'+menu3_url+'">'+menu3_name+'</a> | ' + 
		'<a href="'+menu4_url+'">'+menu4_name+'</a> | ' + 
		'<a href="http://widget.mibbit.com/?channel=%23eRepRo">Romanian Chat</a></div></p><br>' +
	'<div style="float:right;" dir="ltr">' + 
		'<div class="information"><br>Ora: ' + livetime.innerHTML + ' @ ' + date + 
					'<br>Ziua <b>' + dateCount + '</b>a Noii Lumi.</div></div>' + 	'<br><div align="left">' + 

searchholder.innerHTML + '</div></div>';
	document.body.insertBefore(quicklinks, document.body.firstChild);
	header.parentNode.removeChild(header);
}