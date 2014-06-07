// ==UserScript==
// @name          ebay refresher
// @namespace     http://ebaydoorbusterrefresher.blogspot.com/
// @description  
// @include    http://*shop.ebay.com/*
// @include    http://cgi.ebay.com/*
// @include    http://offer.ebay.com/*
// ==/UserScript==


(function(){

    var refreshRate = 1000; // defaulted to 1000 ms
    var refreshTimeoutId = 0; // id of timeout
    var refreshEnabled = false;
    var refreshCounter = 0;
    var thisUrl ="#"   
	var autoBIN = false;
	
    function processContent(response) {
        var tableNodeText = response.responseText.match(/<table class="nol">(.*?)<\/table>/i);
        var isFound = false;
        if (tableNodeText) {
            var itemURL = tableNodeText[0].match(/http:(.*?)"/i);
            var sellerFeedbackStr = tableNodeText[0].match(/Feedback:(.*?)<\/span>/i)
           
            if (sellerFeedbackStr) {
                var sellerFeedback = sellerFeedbackStr[0].match(/\d+/)[0];
            }
           
            if (itemURL && (!sellerFeedbackStr || parseInt(sellerFeedback) <= 5 ) ) {
                var itemNum = itemURL[0].match(/\d{12}/);
                var binURL = "http://offer.ebay.com/ws/eBayISAPI.dll?BinConfirm&item=" + itemNum;
                clearTimeout(refreshTimeoutId);
                toggler.innerHTML = 'Enable Refreshing';
                isFound = true;
                refreshEnabled = false;
				GM_setValue ('redirected', true);
                window.open(binURL, "ebayPopupWin");
            }
        }
        if (!isFound) {
            statusLine.innerHTML = "Not Found";
            if (refreshEnabled) {
                refreshTimeoutId = setTimeout(getContent,  refreshRate);
            }
        }
    }
  
    function getContent() {
        counterLine.innerHTML = 'Counter: ' + ++refreshCounter;
        statusLine.innerHTML = "......";

        GM_xmlhttpRequest ({
            'method' : 'GET',
            'url'    : thisUrl,
            'onload' : processContent
        });
    }

    if (window.location.href.match(/^http:\/\/offer.ebay.com\/(.*?)/i)) {
		if ( GM_getValue ('autoBIN', false) && GM_getValue('redirected', false) ) {
			var inputElements = document.getElementsByTagName("input");
			for ( var i = inputElements.length-1; i = 0; i--) {
				if (inputElements[i].getAttribute("type").toLowerCase() == "submit") {
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					inputElements[i].dispatchEvent(evt);
					GM_setValue ('redirected', false);
					GM_setValue ('autoBIN', false);
					break;
				}
			}
		}
        return false;
    }
	
	var toggler = unsafeWindow.document.createElement('a');
    toggler.style.position   = 'fixed';
    toggler.style.top        = '2.4em';
    toggler.style.right      = '0.8em';
    toggler.style.background = '#ffe';
    toggler.style.padding    = '0.6em';
    toggler.style.border     = '1px solid #000';
    toggler.style.font       = 'bold 1em Verdana, "Bitstream Vera Sans", Helvetica, sans-serif';
    toggler.style.color      = '#00f';
    toggler.href = '#';
    toggler.innerHTML = 'Enable Refreshing';
    toggler.onclick = function() {
        clearTimeout(refreshTimeoutId);
        toggler.innerHTML = 'Enable Refreshing';
        refreshEnabled = !refreshEnabled;
        if (refreshEnabled) {
            thisUrl = window.location.href;
            refreshTimeoutId = setTimeout(getContent,  refreshRate);
            toggler.innerHTML = 'Disable Refresing';
        }
    };
    document.body.appendChild (toggler);
  
    var timerSetting = unsafeWindow.document.createElement('div');
    timerSetting.style.position   = 'fixed';
    timerSetting.style.top        = '8.4em';
    timerSetting.style.right      = '0.8em';
    timerSetting.style.background = '#ffe';
    timerSetting.style.padding    = '0.3em';
    timerSetting.style.border     = '1px solid #000';
    timerSetting.style.font       = '0.75em Verdana, "Bitstream Vera Sans", Helvetica, sans-serif';
    timerSetting.style.color      = '#00f';

    var frm = unsafeWindow.document.createElement('form');
    frm.name = 'frm';
    frm.innerHTML = 'Refresh every:&nbsp';
    var intervalDrp = unsafeWindow.document.createElement('select');
    intervalDrp.name = 'intervalDrp';
    intervalDrp.onchange = function() {
        refreshRate = this.value;
    };
	
    intervalDrp.innerHTML = '<option value="500">0.5s</option><option selected value="1000">1s</option><option value="2000">2s</option><option value="3000">3s</option><option value="4000">4s</option><option value="5000">5s</option><option value="10000">10s</option>';
    frm.appendChild(intervalDrp);
    timerSetting.appendChild(frm);
    document.body.appendChild (timerSetting);

	var autoBINBtn = unsafeWindow.document.createElement('a');
    autoBINBtn.style.position   = 'fixed';
    autoBINBtn.style.top        = '8.7em';
    autoBINBtn.style.right      = '0.8em';
    autoBINBtn.style.background = '#c00';
    autoBINBtn.style.padding    = '0.6em';
    autoBINBtn.style.border     = '1px solid #000';
    autoBINBtn.style.font       = 'bold 1em Verdana, "Bitstream Vera Sans", Helvetica, sans-serif';
    autoBINBtn.style.color      = '#fff';
    autoBINBtn.href = '#';
    autoBINBtn.innerHTML = 'Auto Buy It Now';
    autoBINBtn.onclick = function() {
        autoBIN = !autoBIN;
		autoBINBtn.style.background = '#c00';
		GM_setValue ('autoBIN', false);
		if (autoBIN) {
			autoBINBtn.style.background = '#093';
			GM_setValue ('autoBIN', true);
        }
    };
    document.body.appendChild (autoBINBtn);

	
    var counterLine = unsafeWindow.document.createElement('div')
    counterLine.style.position   = 'fixed';
    counterLine.style.top        = '15.4em';
    counterLine.style.right      = '0.8em';
    counterLine.style.background = '#ffe';
    counterLine.style.padding    = '0.6em';
    counterLine.style.border     = '1px solid #000';
    counterLine.style.font       = '0.75em Verdana, "Bitstream Vera Sans", Helvetica, sans-serif';
    counterLine.style.color      = '#00f';
    counterLine.innerHTML = 'Counter: 0';
    document.body.appendChild (counterLine);   
   
    var statusLine = unsafeWindow.document.createElement('div')
    statusLine.style.position   = 'fixed';
    statusLine.style.top        = '18.4em';
    statusLine.style.right      = '0.8em';
    statusLine.style.background = '#ffe';
    statusLine.style.padding    = '0.6em';
    statusLine.style.border     = '1px solid #000';
    statusLine.style.font       = '0.75em Verdana, "Bitstream Vera Sans", Helvetica, sans-serif';
    statusLine.style.color      = '#00f';
    document.body.appendChild (statusLine);
}) ();