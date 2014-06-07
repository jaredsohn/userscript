// ==UserScript==
// @name           eRepublik Optimizer - Hungarian v2
// @namespace      Nemvagyok Itthon
// @description    Useful links, removed ads. For hungarian users. Based on Aria Radmand's and Idham Dahlan's script.
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

// GM menu berakasa, a munkahely URL beallitasahoz
GM_registerMenuCommand("Munkahely URL megadása", function(){ GM_setValue('COMPANY',prompt("Másold ide a Munkahelyed URL-jét:") ) } );
GM_registerMenuCommand("Országkód megadása", function(){ GM_setValue('COUNTRY',prompt("Az aktuális országod kódja:") ) } );
GM_registerMenuCommand("Adatok mutatása", function(){ co_url = GM_getValue('COMPANY'); nat=GM_getValue('COUNTRY'); alert('Munkahelyed: '+co_url+'\nOrszágkód: '+nat) } );

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
company_URL = GM_getValue('COMPANY');
nat_code = GM_getValue('COUNTRY');
var header = document.getElementById('header');
if  (header) {
	var quicklinks = document.createElement("div");
	quicklinks.innerHTML = '<div class="menubar" id="menubar"><p style="margin: 2px 0 1px 0; padding-top:1px; padding-bottom:7px;">' + 
	'<div style="float:left;">' + 
		'<a href="'+company_URL+'">Munkahelyem</a> | ' + 
		'<a href="http://www.erepublik.com/en/my-places/army">Hadsereg</a> | ' + 
		'<a href="http://www.erepublik.com/en/wars/1">Háborúk</a> | ' + 
		'<strong><u>Piac:</u> </strong><a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-1-quality-0">kaja</a>, ' + 
			'<a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-2-quality-0">gift</a>, ' + 
			'<a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-4-quality-0">repjegy</a>, ' + 
			'<a href="http://www.erepublik.com/en/market/country-'+nat_code+'-industry-3-quality-0">fegyver</a></div>' + 
	'<div style="float:right;">' + 
		'<a href="http://erepublik.blog.hu">Kormány Blog</a> | ' + 
		'<a href="http://erepublikhu.info">Info Portál</a> | ' + 
		'<a href="http://z8.invisionfree.com/EHungary/">eHungary Fórum</a> | ' + 
		'<a href="http://erepmarket.co.cc">Segédprogramok</a> | ' + 
		'<a href="http://widget.mibbit.com/?channel=%23erep">Mibbit Chat</a></div></p><br>' +
	'<div style="float:right;" dir="ltr">' + 
		'<div class="information"><br>eRep idő: ' + livetime.innerHTML + ' @ ' + date + 
					'<br>Ma, az Új Világ <b>' + dateCount + '</b>. napja van.</div></div>' + 	'<br><div align="left">' + searchholder.innerHTML + '</div></div>';
	document.body.insertBefore(quicklinks, document.body.firstChild);
	header.parentNode.removeChild(header);
}