// ==UserScript==
// @name           _@/ scalora uriencoder
// @author         Chris Porter
// @version        0.2
// @date           2008-07-16
// @namespace      http://www.crazysnailboy.net/greasemonkey/
// @include        http://www.scalora.org/projects/uriencoder/
// ==/UserScript==

document.createStyleSheet = function(sValue) { var o = this.createElement("style"); o.type = "text/css"; o.innerHTML = sValue; this.getElementsByTagName("head")[0].appendChild(o); };
document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};

String.prototype.left = function(iLen) { return this.substr(0, iLen); };
String.prototype.right = function(iLen) { return this.substr( this.length - iLen, iLen ); };
String.prototype.trim = function() { return this.replace(/^\s*|\s*$/g,""); }


// =================================================================================================
// URIEncoder
// -------------------------------------------------------------------------------------------------
//
//
// =================================================================================================

var URIEncoder = {

// -------------------------------------------------------------------------------------------------
// formData

	formData: {

		get dataWidth() { return GM_getValue("form-datawidth", 100); },
		set dataWidth(iValue) { GM_setValue("form-datawidth", parseInt(iValue)); },

		get lang() { return GM_getValue("form-lang", "javascript"); },
		set lang(sValue) { GM_setValue("form-lang", sValue); },

		get encoding() { return GM_getValue("form-encoding", "base64"); },
		set encoding(sValue) { GM_setValue("form-encoding", sValue); }

	},


// -------------------------------------------------------------------------------------------------
// formElements

	formElements: {

		radOutputLanguage: {

			get checked() { return document.getElementByXPath("//input[@name='lang' and @type='radio' and @checked]") },
			get saved() { return document.getElementByXPath("//input[@name='lang' and @type='radio' and @value='" + URIEncoder.formData.lang + "']"); }

		},

		radEncodingMethod: {

			get checked() { return document.getElementByXPath("//input[@name='encoding' and @type='radio' and @checked]") },
			get saved() { return document.getElementByXPath("//input[@name='encoding' and @type='radio' and @value='" + URIEncoder.formData.encoding + "']"); }

		},

		get dataWidthTextbox() { return document.getElementByXPath("//input[@name='data_width']"); }

	},


// -------------------------------------------------------------------------------------------------
// formatDocument

	formatDocument: function()
	{
	document.createStyleSheet(
	"body, html, input, select, table, td { font-family:Calibri; font-size:small; }" +
	"");


	// set id attributes for the language radio buttons
	var elementIDs = [
		{ id:"radLang_Javascript" , xpath:"//input[@name='lang' and @type='radio' and @value='javascript']" },
		{ id:"radLang_HTML" , xpath:"//input[@name='lang' and @type='radio' and @value='HTML']" },
		{ id:"radLang_CSS" , xpath:"//input[@name='lang' and @type='radio' and @value='CSS']" },

		{ id:"radEncoding_Base64" , xpath:"//input[@name='encoding' and @type='radio' and @value='base64']" },
		{ id:"radLang_RFC1738" , xpath:"//input[@name='encoding' and @type='radio' and @value='rfc1738']" }
	];
	elementIDs.forEach(function(oArgs){ var oElement = document.getElementByXPath(oArgs.xpath); if (oElement != undefined) { oElement.id = oArgs.id; } });

	// replace the descriptive text node next to each language radio button with a label.
	var aRadio = document.getElementsByXPath("//input[@name='lang' and @type='radio']");
	for ( var i = 0 ; i < aRadio.length ; i++ )
		{
		var oRadio = aRadio[i];
		var oTextNode = oRadio.nextSibling;
		var sNodeText = oTextNode.nodeValue.trim();
		oTextNode.nodeValue = sNodeText.right(sNodeText.length - oRadio.value.length);
		var oLabel = document.createElement("label");
		oLabel.setAttribute("for", oRadio.id);
		oLabel.innerHTML = sNodeText.left(oRadio.value.length);
		oRadio.parentNode.insertBefore(oLabel, oRadio.nextSibling);
		}

	// replace the descriptive text node next to each encoding type radio button with a label.
	var aRadio = document.getElementsByXPath("//input[@name='encoding' and @type='radio']");
	for ( var i = 0 ; i < aRadio.length ; i++ )
		{
		var oRadio = aRadio[i];
		var oTextNode = oRadio.nextSibling; var sNodeText = "";
		while ((oTextNode != undefined) && (oTextNode.nodeValue != undefined))
			{
			sNodeText += oTextNode.nodeValue.trim();
			oTextNode.parentNode.removeChild(oTextNode);
			oTextNode = oLabel.nextSibling;
			}
		var oLabel = document.createElement("label");
		oLabel.setAttribute("for", oRadio.id);
		oLabel.innerHTML = sNodeText;
		oRadio.parentNode.insertBefore(oLabel, oRadio.nextSibling);
		}

	// load our saved preferences into the form
	this.formElements.radOutputLanguage.saved.checked = true;
	this.formElements.radEncodingMethod.saved.checked = true;
	this.formElements.dataWidthTextbox.value = this.formData.dataWidth;


	// determine whether we have return data to format by checking for the presence of a pre element.
	var oPre = document.getElementByXPath("//pre"); //  if (!oPre) return;
	var bHaveData = (oPre != undefined);
	if (bHaveData)
		{
		// get the encoded data from the pre element, and remove the pre element from the page.
		var sData = oPre.innerHTML.replace(/\xA/g, "").trim();
		var jsTab = String.fromCharCode(9);
		var jsCRLF = String.fromCharCode(13) + String.fromCharCode(10);
		var jsCR = String.fromCharCode(13);
		var jsLF = String.fromCharCode(10);

		oPre.parentNode.removeChild(oPre);

		// create a second cell in the image table, and insert a textarea control containing the encoded data
		var oTable = document.getElementByXPath("//table[@id='image_table']");
		oTable.style.borderWidth = "0px";
		oTable.style.marginTop = "0px";
		var oTD = document.createElement("oTD");
		with (oTable.getElementsByTagName("tr")[0].getElementsByTagName("td")[0])
			{
			setAttribute("valign", "top");
			style.paddingRight = "20px";
			parentNode.appendChild(oTD);
			}

		// create a textarea to store the resultant encoded image
		var oTextarea = document.createElement("textarea");
		oTextarea.id = "txaResult";
		oTextarea.setAttribute("style", "height:150px; width:650px;");

		oTextarea.value = "";
		// wrap html data to the same chars per line value as javascript
		if (this.formData.lang == "CSS")
			{
			sData = sData.substring(13, sData.length-14);
			sData = sData.split(jsTab + jsTab).join(jsCRLF);
			sData = sData.split(jsTab).join(jsCRLF);
			sData = "<style>" + sData + jsCRLF + "</style>";
			}
		if (this.formData.lang == "HTML")
			{
			sData = "<img src=\"" + sData.substring(13, sData.length-6) + "\" />";
			var iDataLength = sData.length;
			while (iDataLength > this.formData.dataWidth)
				{
				oTextarea.value += sData.substr(0, this.formData.dataWidth) + jsCRLF;
				sData = sData.substring(this.formData.dataWidth, sData.length);
				iDataLength -= this.formData.dataWidth;
				}
			}
		if (this.formData.lang == "javascript")
			{
			sData = sData.split(jsTab).join("");
			sData = sData.split(";").join(";" + jsCRLF);
			sData = sData.split("' +'").join("\" +" + jsCRLF + "\"");
			sData = sData.replace(":;" + jsCRLF, ":;");
			sData = sData.replace(";" + jsCRLF + "base64", ";base64");
			sData = sData.replace("var img_src = '", "var img_src = \"");
			sData = sData.replace("';" + jsCRLF, "\";" + jsCRLF);
			}

		oTextarea.value += sData;
		oTD.appendChild(oTextarea);

		// move the image table to the bottom of the page
		var oTarget = document.getElementByXPath("//body/hr");
		oTarget.parentNode.insertBefore(oTable, oTarget.nextSibling);
		oTarget.parentNode.removeChild(oTable.nextSibling);
		}
	},


// ---------------------------------------------------------------------------------------------
// addEventListeners

	addEventListeners: function()
	{
	// add an onclick listener to the submit button to save the current form settings
	var oSubmitButton = document.getElementByXPath("//input[@type='submit' and @name='submit' and @value='Encode File']");
	oSubmitButton.addEventListener("click",
		function(event)
		{
		URIEncoder.formData.lang = URIEncoder.formElements.radOutputLanguage.checked.value;
		URIEncoder.formData.encoding = URIEncoder.formElements.radEncodingMethod.checked.value;
		URIEncoder.formData.dataWidth = URIEncoder.formElements.dataWidthTextbox.value;
		}
	, true);
	},


// ---------------------------------------------------------------------------------------------
// onCreate

	onCreate: function()
	{
	this.formatDocument();
	this.addEventListeners();
	}

};
URIEncoder.onCreate();
