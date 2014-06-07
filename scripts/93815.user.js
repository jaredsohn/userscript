// ==UserScript==
// @name           Parallel Universe
// @namespace      ParallelUniverse
// @description    One click extension to show the Unicode and Zawgyi texts in the same page with appropriate fonts.
// @details        This extension will help the users to read Myanmar Unicode on the Chrome with Sans-Serif Font set to Zawgyi. The user must install one of the following font on the computer to read Unicode font. Myanmar3, Parabaik, Padauk, Masterpiece Uni Sans, MyMyanmar The Unicode texts will automatically change for the installed Unicode font after page loading is completed. The user may click the extension icon to trigger the font conversion manually when the extension is not triggering automatically after page load or some text appear after page load (e.g. show more comment in Facebook) It might not work for the HTML tags in which both Zawgyi and Unicode text coexist. This extension is still in beta stage. The name of the extension "Parallel Universe" goes to Ko Nyein Chan Htwe who gave us the idea of coexisting both fonts.
// @include        http://*
// @include        https://*
// @include        file:///*
// @version        1.0.7
// ==/UserScript==

/*
Developer:  Mad Computerist
Contributor: Saturngod
Credit: Ravi Chhabra (for encoding detection)

v1.0.7
- Added Gmail Inject module to work in Gmail Iframe
- Improved existing font family declaration to avoid overwriting

v1.0.6
- Updated the script to work in Chrome Extension, Greasemonkey and Firefox Add-on

v1.0.5
- Encoding detection was replaced by the method from Font Busters http://userscripts.org/scripts/show/42941 (Credit goes to Ravi Chhabra)

v1.0.4
- Added file:///*

v1.0.3
- Remove "\u101A\u103A" from the Unicode Char Pairs as that is such words as "ya pa let ya pinn" in "oo yin" in Zawgyi

v1.0.2
- Remove "\u1005\u103A" from the Unicode Char Pairs as that is used as "za myin zwal" in Zawgyi

v1.0.1
- Change to Zawgyi font only for Myanmar Unicodes
*/

var ParallelUniverse = function(docObj) 
{
	var excludedTags = new Array("CODE", "NOSCRIPT", "PRE", "SCRIPT", "STYLE", "TIME", "TITLE");
	var includedTags = new Array("A", "ABBR", "B", "CITE", "DEL", "DIV", "EM", "H1", "H2", "H3", "H4", "H5", "I", "LABEL", "LI", "NOBR", "OPTION", "P", "SMALL", "SPAN", "STRONG", "STYLE", "TD", "TEXTAREA", "TH", "U");
	var childTags = new Array("A", "B", "EM", "I", "SMALL", "STRONG", "U");
	var unicodeCharPairs = new Array("\u1004\u103A", "\u100A\u103A", "\u1010\u103A", "\u1014\u103A");
	if(docObj == null)
		docObj = document;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// From Font Busters
	var IS_MYANMAR_RANGE = "[က-အ]+";
	var IS_UNICODE_MY = "[ဃငဆဇဈဉညတဋဌဍဎဏဒဓနဘရဝဟဠအ]်|ျ[က-အ]ါ|ျ[ါ-း]|[^\1031]စ် |\u103e|\u103f|\u1031[^\u1000-\u1021\u103b\u1040\u106a\u106b\u107e-\u1084\u108f\u1090]|\u1031$|\u100b\u1039|\u1031[က-အ]\u1032|\u1025\u102f|\u103c\u103d[\u1000-\u1001]";
	var IS_ZAWGYI = "\u0020[\u103b\u107e-\u1084][က-အ]|\u0020\u1031[က-အ\u1040]|\u1031\u1005\u103A";
	var reMyanmar = [new RegExp(IS_MYANMAR_RANGE)];
	var reUnicode_my = [new RegExp(IS_UNICODE_MY)];
	var reZawgyi = [new RegExp(IS_ZAWGYI)];
	var fixedObjects = new Array();
	var fixedStyles = new Array();
	var myanmarFonts = ["Masterpiece Uni Sans", "Myanmar2", "Myanmar3", "MyMyanmar Unicode", "Padauk", "Parabaik", "Win Uni Innwa", "WinUni Innwa", "Yunghkio", "Zawgyi1", "Zawgyi-One"];
	var default_font = " ";
	var bToggled = false;

	function isMyanmar (obj)
	{
		for(var i=0; i < reMyanmar.length; i++)
		{
			if(reMyanmar[i].test(obj.innerHTML))
				return true;
		}
		return false;
	}

	function isUnicode_my(obj)
	{
		for(var i=0; i<reUnicode_my.length; i++)
		{
			if(reUnicode_my[i].test(obj.innerHTML))
				return true;
		}
		return;
	}

	function isZawgyi(obj)
	{
		for(var i=0; i<reZawgyi.length; i++)
		{
			if(reZawgyi[i].test(obj.innerHTML))
				return true;
		}
		return false;
	}

	function isDeclared(obj)
	{
		var declared_fonts = obj.style.fontFamily.split(",");
		for(var i = 0; i < myanmarFonts.length; i++)
		{
			if(declared_fonts[0].replace("'", "").replace("'", "") == myanmarFonts[i])
				return true;
		}
		return false;
	}
	// From Font Busters
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function changeFont(docObject)
	{
		var htmlTags = docObject.getElementsByTagName("body")[0].getElementsByTagName("*");
		for(var i = 0; i < htmlTags.length; i++) 
		{
			if(htmlTags[i].hasChildNodes() && htmlTags[i].childNodes.length == 1 && !htmlTags[i].childNodes[0].hasChildNodes())
			{
				if (isExistInArray(htmlTags[i].tagName, childTags))
				{
					if (!isExistInArray(htmlTags[i].parentNode.tagName, excludedTags))
					{
						changeFontFamily(htmlTags[i].parentNode);
					}
				}
				if (!isExistInArray(htmlTags[i].tagName, excludedTags))
				{
					changeFontFamily(htmlTags[i]);
				}
			}
		}
	}

	function changeFontFamily(htmlNode)
	{
		if(!isMyanmar(htmlNode))
			return;
		if(isDeclared(htmlNode) || isDeclared(htmlNode.parentNode))
			return;
		var textOnly = "";
		if (htmlNode.innerText != null)
			textOnly = htmlNode.innerText;
		else if (htmlNode.textContent != null)
			textOnly = htmlNode.textContent;
		if (textOnly == "")
			return;

		//if(isIncludeRang(textOnly))
		////Replaced with Font Busters
		if(!isUnicode_my(htmlNode) || isZawgyi(htmlNode))
			htmlNode.style.fontFamily = "Zawgyi1, 'Zawgyi-One'";
			
		//if(isMatchWithItemInArray(textOnly, unicodeCharPairs))
		////Replaced with Font Busters
		if(isUnicode_my(htmlNode))
		{
			htmlNode.style.fontFamily =  "'WinUni Innwa', 'Win Uni Innwa', Yunghkio, Myanmar3, Parabaik, 'Masterpiece Uni Sans', Padauk, 'MyMyanmar Unicode', Myanmar2";
		}
	}

	function isIncludeRang(text) //by Saturngod
	{
		if(text.match(/[\u1000-\u109F]/g))
		{	
			return true;
		}
		else
		{
			return false;
		}
	}

	function isExistInArray(text, textArray)
	{
		for (var j = 0; j < textArray.length; j++)
		{
			if(text == textArray[j])
				return true;
			else if (textArray[j] > text)
				return false;
		}
		return false;
	}

	function isMatchWithItemInArray(text, textArray)
	{
		for (var k = 0; k < excludedTags.length; k++)
		{
			if(text.indexOf(textArray[k]) != -1)
				return true;
		}
		return false;
	}

	function onPageLoad(aEvent)
	{
		if(document.readyState == "complete" && isTopLevelDocument(aEvent.originalTarget))
			changeFont(content.document);
	}

	function isTopLevelDocument(aDocument)
	{
		var browsers = gBrowser.browsers;

		for (var i = 0; i < browsers.length; i++)
		if (aDocument == browsers[i].contentDocument)
			return true;

		return false;
	}

	function gmailInject()
	{
		var iframe = docObj.getElementById('canvas_frame');
		var doc = null;
		if(iframe)
			doc = iframe.contentDocument;
		else
			return;

		if(doc)
		{
			var code = "(" + ParallelUniverse + ")();"
			doc.body.appendChild(doc.createElement('script')).innerHTML=code;
		}
		else
			return;
	}
	
	try
	{
		if(docObj.location.hostname == "mail.google.com" && docObj.location.href.indexOf("//mail.google.com/mail/?ui=2&view=bsp&ver=") == -1)
			gmailInject();
		else
		{
			if(docObj != null)
				changeFont(docObj);
			else
				changeFont(document);
		}
	}
	catch(err)
	{
		var appcontent = document.getElementById("appcontent");
		appcontent.addEventListener("DOMContentLoaded", onPageLoad, false);
	}
}
ParallelUniverse();