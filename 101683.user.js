// ==UserScript==
// @name           eRepublik GARDA naredjena - redesigned
// @namespace      Garda
// @version        1.66
// @date           2011-05-12
// @description    Skripta za GARDU eRepublike.
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

addGlobalStyle('#menubar input.field {background:transparent url(/images/parts/bg-search.gif) no-repeat scroll right center;border:medium none;color:#808080;display:block;float:left;height:21px;padding:6px 0 0 6px;width:157px;} .commentscontent .smallholder {direction:ltr; text-align:left; background:#f0f0f0; padding-right:5px !important;padding-top:5px !important;margin-top:5px;}  body {background:#fdfdfd;} .information {line-height:1.4em;font-size: 9pt ! important; font-family:Arial !important; direction:ltr !important; text-align:left !important;} p.preview, #article_comment, .writearticle textarea {font-size: 9pt ! important; font-family:Arial !important; direction:ltr !important; text-align:left !important;} body {font-family:Arial !important;} .smallholder {font-family:Arial; font-size:9pt;} li #id{visibility:none;} div#menubar.seperator {color:#216e8a;} div#menubar {padding-right:5px; color:#eaf9ff !important; text-align:center; width:940px;margin: 0 auto 0 auto;border-radius:4px;-moz-border-radius: 4px;-webkit-border-radius: 4px; border: 1px solid #000000; margin-bottom: 5px; margin-top:2px;background-color: #699fb2; padding-left:10px; padding-bottom:5px;} .menubar{font-size:11pt;} div#menubar a{font-weight:normal;color:#eaf9ff !important;} div#menubar a:hover{text-decoration:underline !important;}');

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

var header = document.getElementById('header');
if  (header) {
	var quicklinks = document.createElement("div");
	quicklinks.innerHTML = '<div class="menubar" id="menubar"><p style="margin: 2px 0 1px 0; padding-top:1px; padding-bottom:7px;">' + 
        '<div style="float:left;">' + 
		      '<a href="http://economy.erepublik.com/en/market/65" title="Pijaca"><font face="Georgia, Arial">Marketpace</font></a> | ' + 
              '<a href="http://economy.erepublik.com/en/market/65/1/1/citizen/0/price_asc/1" title="Hleb"><font face="Georgia, Arial">Food (Q1)</font></a> | ' + 
			  '<a href="http://economy.erepublik.com/en/market/65/2/5/citizen/0/price_asc/1" title="Tenk"><font face="Georgia, Arial">Weapon (Q5)</font></a> | ' + 
			  '<a href="http://economy.erepublik.com/en/market/65/4/5/citizen/0/price_asc/1" title="Kuca"><font face="Georgia, Arial">House (Q5)</font></a> | ' + 
			  '<a href="http://economy.erepublik.com/en/market/65/12/1/citizen/0/price_asc/1" title="Iron"><font face="Georgia, Arial">Iron</font></a> | ' + 
              '<a href="http://economy.erepublik.com/en/market/65/7/1/citizen/0/price_asc/1" title="Grain"><font face="Georgia, Arial">Grain</font></a></div>' + 
	'<div style="float:right;">' + 
		'<a href="http://www.erepublik.com/en/news" title="Novosti"><font face="Georgia, Arial">News</font></a> | ' +  
		'<a href="http://www.erepublik.com/en/exchange" title="Trziste novca"><font face="Georgia, Arial">Monetary market</font></a> | ' + 
		'<a href="http://www.erepublik.com/en/economy/inventory" title="Inventory"><font face="Georgia, Arial">Storage</font></a> | ' + 
		'<a href="http://chat.mibbit.com" target="_blank" title="Rizzon"><font face="Georgia, Arial">Chat</font></a>&nbsp;&nbsp;&nbsp;&nbsp;</div></p><br>' +
          '<div style="float:right;" dir="ltr">' + 
		'<div class="information"><br><a href="ADRESA_SAJTA_SA_NAREDJENJIMA" target="_blank" title="Ako se ne vidi naredjenje ispod, kliknite na ovaj link"><small><font face="Georgia, Arial" color=blue>[ THE ULTIMATE ORDER ]</font></a></small> | <a href="ADRESA_SAJTA_SA_NAREDJENJIMA/downloads" target="_blank" title="Downloads"><small><font face="Georgia, Arial" color=blue>[ DOWNLOADS ]</font></a><br></small><iframe src="ADRESA_SAJTA_SA_NAREDJENJIMA" width="680" height="25" frameborder="0" allowTransparency="true"></iframe><small><a href="COSTUM_LINK_1" title="COSTUM_LINK_1_POP-UP"><font face="Georgia, Arial" color=blue>LINK 1</font></a></small> | <small><a href="COSTUM_LINK_2" title="COSTUM_LINK_2_POP-UP"><font face="Georgia, Arial" color=blue>LINK 2</font></a></small> | <small><a href="COSTUM_LINK_3" title="COSTUM_LINK_3_POP-UP"><font face="Georgia, Arial"color=blue>LINK 3</font></a></small></div></div>' + '</div></div>';
	document.body.insertBefore(quicklinks, document.body.firstChild);
        
}