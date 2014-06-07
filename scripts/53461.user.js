// ==UserScript==
// @name           eRep Romanian Opt
// @namespace      dummy_dahlan copy from Aria Radmand
// @description    Optimizes the erepublik new world for indonesian users.
// @include        *erepublik.com*
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

addGlobalStyle('#menubar input.field {background:transparent url(/images/parts/bg-search.gif) no-repeat scroll left center;border:medium none;color:#808080;display:block;float:left;height:21px;padding:6px 0 0 6px;width:157px;} .commentscontent .smallholder {direction:rtl; text-align:left; background:#f0f0f0; padding-right:5px !important;padding-top:5px !important;margin-top:5px;}  body {background:#fdfdfd;} .information {line-height:1.4em;font-size: 8pt ! important; font-family:Tahoma !important; direction:rtl !important; text-align:left !important;} p.preview, #article_comment , .writearticle textarea {font-size: 8pt ! important; font-family:Tahoma !important; direction:rtl !important; text-align:left !important;} body {font-family:calibri !important;} .smallholder {font-family:tahoma; font-size:8pt;} li #id{visibility:none;} div#menubar.seperator {color:#216e8a;} div#menubar {padding-right:5px; color:#eaf9ff !important; text-align:center; width:940px;margin: 0 auto 0 auto;border-radius:4px;-moz-border-radius: 4px;-webkit-border-radius: 4px; border: 1px solid #000000; margin-bottom: 5px; margin-top:2px;background-color: #48878A; padding-left:10px; padding-bottom:5px;} .menubar{font-size:11pt;} div#menubar a{font-weight:bold;color:#eaf9ff !important;} div#menubar a:hover{text-decoration:underline !important;}');

var livetime = document.getElementById('live_time');

//var searchholder = document.getElementById('searchholder');



var adSidebar = document.getElementById('promo');
if (adSidebar)	adSidebar.parentNode.removeChild(adSidebar);

var footer = document.getElementById('footer');
if (footer)	footer.parentNode.removeChild(footer);

date = detectFirst("/html/body/div/div/div[2]/div[3]/div/span[2]");
dateCount = detectFirst("/html/body/div/div/div[2]/div[3]/div/span[3]/strong");
if ( date )		{} else date = detectFirst("/html/body/div/div/div[2]/div[2]/div/span[2]");
if ( dateCount )	{} else dateCount = detectFirst("/html/body/div/div/div[2]/div[2]/div/span[3]/strong");


var header = document.getElementById('header');
if  (header) 
{
	var quicklinks = document.createElement("div");
	quicklinks.innerHTML = '<div class="menubar" id="menubar"><p style="margin: 2px 0 1px 0; padding-top:1px; padding-bottom:7px;">' +
	'<div style="float:left;"><a href="http://www.erepublik.com/en/citizen/profile/1282406">Profil</a> | <a href="http://www.erepublik.com/en/company/air-tickets-180538">Work</a> |  <a href="http://www.erepublik.com/en/my-places/army">Train</a> | <a href="http://www.erepublik.com/en/market/country-1-industry-1-quality-0-citizen_account-9235788">Food Q1 Market</a></div> ' +
	'<div style="float:right;"><a href="http://www.ecetateni.com">Forum eRomania</a> | <a href="http://embed.mibbit.com/?server=irc.rizon.net&channel=%23ero">Chat eRo</a> | <a href="http://embed.mibbit.com/?server=irc.rizon.net&channel=%23erepublikair">Chat AIR</a></div>' +
	'</p><br>' + '<div style="float:right;" dir="rtl"><div class="information"><br>eRep Time ' + livetime.innerHTML + '<br>' + date + ' - Ziua nr ' + dateCount+' a lumii noi </div></div>' + '<br><div align="left">' + searchholder.innerHTML + '</div></div>';
	document.body.insertBefore(quicklinks, document.body.firstChild);
	header.parentNode.removeChild(header); 
}

//=======================


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://lowrider.go.ro/',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var parancs = tags[0];
			var link = tags[1]
			

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h3")
			parancs_el.textContent=parancs

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			ido_el=document.createElement("h3")
			

			
			latest.parentNode.insertBefore(parancs_el, latest)
			latest.parentNode.insertBefore(link_el, latest)
		}	
		}
	);