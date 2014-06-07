// ==UserScript==
// @name           Auto Unframe MW
// @namespace      http://userscripts.org/scripts/show/95226
// @include        http://apps.facebook.com/inthemafia/*
// @exclude        http://facebook.mafiawars.com/mwfb/*

// ==/UserScript==

function checkLoadIframe() {
  var iFrameCanvas = document.evaluate("//iframe[@name='mafiawars']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
  if (iFrameCanvas) {
    if (/m.mafiawars.com/.test(document.location)) {
        window.location.href = document.location + '?iframe=1';
    } else if (/apps.facebook.com.inthemafia/.test(document.location)) {
        for (var i = 0; i < document.forms.length; i++) {
            if (document.forms[i].getAttribute("target") == "mafiawars") {
                document.forms[i].target = '';
                document.forms[i].submit();
                return true;
            }
        }
    } else if (document.getElementById('some_mwiframe')) {
        window.location.href = document.getElementById('some_mwiframe').src;
        return true;
    }
  } else {
	document.body.parentNode.style.overflowY = "scroll";
	document.body.style.overflowX = "auto";
	document.body.style.overflowY = "auto";
	try {
		document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
		if (typeof FB != 'undefined') {
			FB.CanvasClient.stopTimerToSizeToContent;
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer = -1;
		}
		document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
	} catch (fberr) {}
	$('#LoadingBackground').hide();
	$('#LoadingOverlay').hide();
	$('#LoadingRefresh').hide();
  }
  return false;
}

checkLoadIframe();
