// ==UserScript==
// @name          Currency Converter
// @namespace     http://www.mrated.com/
// @description	  Select a numeric value while holding down the Alt key to trigger the currency conversion.  Convert to and from any currency you like using Yahoo! Finance.
// @include       *
// ==/UserScript==

// Author: Michael Soutar, m@mrated.com - 28 December 2005
// Version: 1.1

// ~~~~~~~~~~~~~~~
// Version History
// ~~~~~~~~~~~~~~~
// ------------------------------------------------------------------------------------------------------------------------------------
// Version Date        Who      Change(s)
// ======= =========== ======== =======================================================================================================
// 1.0     28 Dec 2005 MSoutar  Initial release
// 1.1     29 Dec 2005 MSoutar  Restyled UI (blue-based theme, aligned objects)
//                              The "from" and "to" figures are shown as the title of the result (hover over)
//                              Made the titles of other objects more descriptive (e.g. the Convert button tells you where the result is from.
//                              Simple "IsNumeric" check on the source figure to ensure valid results 
// ------------------------------------------------------------------------------------------------------------------------------------

//
// Based heavily on Babel Mousish (http://www.cigno5.5.org/)... THANKS!!!!!
//

window.setCurrencyRuleF = function() {

	var exampleLangs = 'Examples:\n"AUD" - Australian Dollar\n"GBP" - British Pound\n"CAD" - Canadian Dollar\n"EUR" - Euro\n"JPY" - Japanese Yen\n"USD" - US Dollar';

	var from, to;

	while(true) {
		from = prompt(
			'Current conversion preference is ' + window.currencyConvert.translationFrom + " to " + currencyConvert.translationTo + '.'
			+ '\n\nPlease enter the source currency code.\n\n' + exampleLangs, window.currencyConvert.translationFrom);

		to = prompt('You chose "' + from + '" as the source currency. \n\nPlease enter the target currency code.\n\n' + exampleLangs, window.currencyConvert.translationTo);
		if (to == from) {
			alert('You chose the same source and destination currencies.');
		}

		if (from != null && to != null) {
			var defaultTranslation = from + "_" + to;
			GM_setValue("currencyConvert.translation.from", from);
			GM_setValue("currencyConvert.translation.to", to);
			window.currencyConvert.translationFrom = from;
			window.currencyConvert.translationTo = to;
			window.currencyConvert.currencyLangLabel.refreshData();
			alert('Conversion settings saved!\n\nSource Currency: ' + from + '\nTarget Currency: ' + to);
			break;
		} else {
			break;
		}
	}
}

//register command into menÃ½
GM_registerMenuCommand("Currency Convert Preferences", window.setCurrencyRuleF);

//provides to make visible currency convert box only when mouse up and alt key pressed
//or provides to hide currency convert box when user click out of box
window.addEventListener('mouseup', function(mouseEvent) {
	var boxLeft = window.currencyConvert.offsetLeft;
	var boxRight = boxLeft + window.currencyConvert.offsetWidth;
	var boxTop = window.currencyConvert.offsetTop;
	var boxBottom = boxTop + window.currencyConvert.offsetHeight;

	if (window.currencyConvert.style.display == "inline"
			&& (mouseEvent.pageX < boxLeft
					|| mouseEvent.pageX > boxRight
					|| mouseEvent.pageY < boxTop
					|| mouseEvent.pageY > boxBottom)) {
		window.currencyConvert.stopCapture();
	} else if (window.getSelection() != '' && mouseEvent.altKey) {
		window.currencyConvert.psychicalWavesCapture(mouseEvent, window.getSelection());
	}
}, true);

//create currency convert object and box instance. make it unvisible on start
function engagecurrencyConvert() {
	//set global css
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { alert('ugh'); }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "span.gmcurrencyConvertToolBar {margin: 1px; border: 1px dotted gray; padding: 0px 5px 0px 5px;}";
	head.appendChild(style);


	var currencyConvert = document.createElement("div");
	currencyConvert.id = "gmcurrencyConvert";
	currencyConvert.translationFrom = GM_getValue("currencyConvert.translation.from", "USD");
	currencyConvert.translationTo = GM_getValue("currencyConvert.translation.to", "AUD");
	currencyConvert.spinner_imgSrc = "data:image/gif;base64,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";
	currencyConvert.yahoo_imgSrc = "http://quote.yahoo.com/favicon.ico";

	//hides the currencyConvert box
	currencyConvert.stopCapture = function() {
		this.style.display = "none";
	}

	//capture selected text and show the currencyConvert box near the pointer
	currencyConvert.psychicalWavesCapture = function(mouseEvent, selectedText) {
		if (this.style.display == "none") {
			this.style.display = "inline";
			this.currencyConvertImage.style.display = "inline";
			this.style.left = (mouseEvent.pageX + 5).toString(10) + 'px';
			this.style.top  = (mouseEvent.pageY + 5).toString(10) + 'px';
			this.currencyTextDiv.innerHTML = selectedText;
		}
	}

	//translate the code and after set box properties
	currencyConvert.defecates = function () {
	    if(!isNaN(parseFloat(this.currencyTextDiv.innerHTML))){
		    this.currencyConvertImage.src = this.spinner_imgSrc;
		    this.currencyTextDiv.style.backgroundColor = "#FFD";
		    this.currencyTextDiv.style.color = "#AAA";
	    GM_xmlhttpRequest({
	        method: 'GET',
	        url: 'http://quote.yahoo.com/m5?a=' + this.currencyTextDiv.innerHTML
	    			    + '&s=' + window.currencyConvert.translationFrom
	    			    + '&t=' + window.currencyConvert.translationTo,
	        onload: function(responseDetails) {
	    	    var t = responseDetails.responseText;
	    	    //Got to parse the HTML to find the right table cell *sigh*
	    	    var ndx1 = t.search('<th nowrap>');
	    	    t = t.substring(ndx1, t.length);
	    	    ndx1 = t.search('</td><td><b>') + 12;
	    	    var ndx2 = t.search('</b>');
	    	    window.currencyConvert.currencyTextDiv.title = window.currencyConvert.currencyTextDiv.innerHTML + " " + window.currencyConvert.translationFrom + " = " + t.substring(ndx1, ndx2) + " " + window.currencyConvert.translationTo;
	    	    window.currencyConvert.currencyTextDiv.innerHTML = t.substring(ndx1, ndx2);
			    window.currencyConvert.currencyConvertImage.src = window.currencyConvert.yahoo_imgSrc;
			    window.currencyConvert.currencyTextDiv.style.backgroundColor = "#FFF";
			    window.currencyConvert.currencyTextDiv.style.color = "#000";
	        }
          });
	  	 }else{
	     alert("The selected value '" + this.currencyTextDiv.innerHTML + "' is not a valid number.\n\nPlease only select numeric values for conversion.");
	    }

	}

	/* --- currency convert box style properties --- */
	currencyConvert.style.display = "none";
	currencyConvert.style.position = "absolute";
	currencyConvert.style.border = "1px solid #888888";
	currencyConvert.style.backgroundColor = "#EBE9ED";
	currencyConvert.style.padding = "2px";
	currencyConvert.style.paddingBottom = "0px";
	currencyConvert.style.MozBorderRadius = "5px";
	currencyConvert.style.fontFamily = "Arial";
	currencyConvert.style.fontSize = "12px";
	currencyConvert.style.color = "#444444";
	currencyConvert.style.textAlign = "center";
	currencyConvert.style.zIndex = "100";

	//close button
	var closeButton = document.createElement("span");
	closeButton.innerHTML = "X";
	closeButton.style.color = "White";
	closeButton.style.verticalAlign = "middle";
	closeButton.style.cursor = "pointer";
	closeButton.style.fontFamily = "Arial";
	closeButton.style.fontWeight = "Bold";
	closeButton.style.fontSize = "6pt";
	closeButton.style.paddingTop = "2px";
	closeButton.style.paddingBottom = "2px";
	closeButton.className = "gmcurrencyConvertToolBar";
	closeButton.title = "Close";
	closeButton.style.marginLeft = "26px";
	closeButton.style.border = "1px solid #000";
	closeButton.style.MozBorderRadius = "3px";
	closeButton.style.backgroundColor = "#e33";
	closeButton.addEventListener('click', function() {currencyConvert.stopCapture();}, true);

	//translation configuration
	var configButton = document.createElement("span");
	configButton.innerHTML = " &nbsp; &nbsp; &nbsp;";
	configButton.style.padding = "5px";
	configButton.style.paddingLeft = "7px";
	configButton.style.paddingRight = "7px";
	configButton.style.background = "url('http://www.gofastbits.com.au/images/spanner_icon.gif') no-repeat center";
	configButton.style.verticalAlign = "middle";
	configButton.style.cursor = "pointer";
	configButton.className = "gmcurrencyConvertToolBar";
	configButton.title = "Configure Currency Converter";
	configButton.style.border = "1px outset";
	configButton.style.backgroundColor = "#ffffff";
	configButton.addEventListener('click', function() {window.setCurrencyRuleF();}, true);

	//translation from and to source
	var langsSpan = document.createElement("span");
	langsSpan.refreshData = function() {
		langsSpan.innerHTML = currencyConvert.translationFrom + " > " + currencyConvert.translationTo;
		langsSpan.title = "Convert from " + currencyConvert.translationFrom + " to " + currencyConvert.translationTo + " - Click to switch conversion";
	}
	langsSpan.className = "gmcurrencyConvertToolBar";
	langsSpan.style.cursor = "default";
	langsSpan.style.fontFamily = "Courier New";
	langsSpan.style.fontWeight = "Bold";
	langsSpan.style.border = "1px inset";
	//langsSpan.style.backgroundColor = "#FFF";
	langsSpan.style.cursor = "pointer";
	langsSpan.style.verticalAlign = "middle";
	langsSpan.style.marginLeft = "15px";
	langsSpan.style.marginRight = "15px";
	langsSpan.addEventListener('click', function() {
		var temp = currencyConvert.translationTo;
		currencyConvert.translationTo = currencyConvert.translationFrom;
		currencyConvert.translationFrom = temp;
		langsSpan.refreshData();
	}, true);
	langsSpan.refreshData();

	//image button to convert currency
	var currencyConvertImg = document.createElement("img");
	currencyConvertImg.src = currencyConvert.yahoo_imgSrc;
	currencyConvertImg.title = "Click to convert using Yahoo! Finance";
	currencyConvertImg.style.border = "1px outset";
	currencyConvertImg.style.backgroundColor = "#ffffff";
	currencyConvertImg.style.padding = "5px";
	currencyConvertImg.style.paddingLeft = "8px";
	currencyConvertImg.style.paddingRight = "8px";
	currencyConvertImg.style.marginRight = "2px";
	currencyConvertImg.align = "absmiddle";
	currencyConvertImg.style.cursor = "pointer";
	currencyConvertImg.addEventListener('click', function() {currencyConvert.defecates();}, true);
    
	//text to convert currency span
	var currencyTextDiv = document.createElement("div");
	//currencyTextDiv.style.width = "100%";
	currencyTextDiv.style.color = "#000";
	currencyTextDiv.style.border = "1px inset";
	currencyTextDiv.style.margin = "2px";
	currencyTextDiv.style.backgroundColor = "#fff";
	currencyTextDiv.style.fontSize = "12pt";
	currencyTextDiv.style.fontWeight = "Bold";

	//toolbar
	var toolBarDiv = document.createElement("div");
	toolBarDiv.style.paddingBottom = "2px";
	toolBarDiv.style.paddingTop = "2px";
	
	//title bar
	var titleDiv = document.createElement("div");
	titleDiv.style.MozBorderRadius = "2px";
	titleDiv.style.fontWeight = "Bold";
	titleDiv.style.fontSize = "10pt";
	titleDiv.style.paddingLeft = "2px";
	titleDiv.style.paddingRight = "2px";
	titleDiv.style.paddingBottom = "4px";
	titleDiv.style.paddingTop = "0px";
	titleDiv.style.color = "#FFF";
	titleDiv.style.backgroundColor = "#3779CD";
	titleDiv.innerHTML = "Currency Converter";
	titleDiv.appendChild(closeButton);
	
	//append objects to toolbar
	toolBarDiv.appendChild(configButton);
	toolBarDiv.appendChild(langsSpan);
	toolBarDiv.appendChild(currencyConvertImg);

	//put html objects into currencyConvert box
	currencyConvert.appendChild(titleDiv);
	currencyConvert.appendChild(toolBarDiv);
	currencyConvert.appendChild(currencyTextDiv);

	//set objects into currencyConvert instance
	currencyConvert.currencyConvertImage = currencyConvertImg
	currencyConvert.currencyTextDiv = currencyTextDiv;
	currencyConvert.currencyLangLabel = langsSpan;

	window.currencyConvert = currencyConvert;
	document.body.insertBefore(window.currencyConvert, document.body.firstChild);
}

engagecurrencyConvert();



