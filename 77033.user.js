// ==UserScript==
// @name           Gmail: Auto Edit Subject
// @version        1.0
// @namespace      com.tim-jarrett.gaes
// @description    Auto edit a subject in gmail when replying
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==


window.addEventListener('load', function() {
	var iframe = document.getElementById('canvas_frame');
	if ( iframe ) {
		iframe.addEventListener("change", searchForSubject, true);
		iframe.contentDocument.addEventListener("DOMSubtreeModified", searchForSubject, true);
			
	}

	function searchForSubject()
	{
		try {
			var forms = iframe.contentDocument.getElementsByTagName('form');
			for ( var i=0; i<forms.length; i++ ) {
				var spans = forms[i].getElementsByTagName('span');
				for ( var j=0; j<spans.length; j++ ) {
					var span = spans[j];
					if ( span.innerHTML == "Edit Subject" ) {
						var evt = iframe.contentDocument.createEvent("MouseEvents");
						evt.initEvent('click', true, true);
						span.dispatchEvent(evt);
					}

				}//end for j

			}//end for i

		} catch ( e ) {
			GM_log(e);
		}

		
	}//end searchForSubject

}, true);
