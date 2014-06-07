// ==UserScript==
// @name           KRUG13 - OBAVIJESTI
// @namespace      Drvinjez
// @version        1.01
// @date           2012-04-06
// @description    KRUG13 , obavjesti
// @include        *.erepublik.com/*
// @exclude        http://www.erepublik.com/en/military/battlefield/*
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

var address = 'asdklan.dyndns.org';

var footer = document.getElementById('footer');
if (footer)    footer.parentNode.removeChild(footer);

var menu = document.getElementById('menu');
if  (menu) {
    var obavijest = document.createElement("div");
    obavijest.innerHTML = '<div class="menubar" id="container"><p style="margin: 0px 0 0px 0; height="17" ;padding-top:0px; padding-bottom:0px;font-family:Arial;font-size:6px">' + 
    '<div style="float:center;position:absolute;z-index:99999999;">' + 
        '<iframe src="http://' + address + '/obavijesti.html" width="954" height="41" frameborder="0" allowTransparency="true"></iframe>' + 
    '<div style="float:right;">' + 
	'<div style="float:right;" dir="ltr">' + 
		'</div></div>';
	document.body.insertBefore(obavijest, document.body.firstChild);

}