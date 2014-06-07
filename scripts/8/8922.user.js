// ==/UserScript==

(function() {	function createFrag(html, after) {
		var range = document.createRange();
		range.setStartAfter(after);
		var frag = range.createContextualFragment(html);
		return frag;
	}	if (/game\.php\?.*screen=place.*try=confirm/.test(document.location)) {
		if (confirm("Attack?")) {
			var form = null;
			
			for (k in document.forms) {				if (/game\.php\?.*h=/.test(document.forms[k].action)) {					form = document.forms[k];					break;				}			}
		
			if (form == null) {
				alert("some shit happened.")
				return;
			}
			
			form.submit();
		}
		else {
			history.back();
		}
	}
})();