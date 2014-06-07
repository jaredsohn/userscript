// ==UserScript==
// @name          Feed Me Google
// @namespace     http://feedmelinks.com/greasemonkey
// @description	  Feed Me Google : Like Google Desktop, but for Feed Me Links
// @include       http://google.*
// @include       http://www.google.*
// ==/UserScript==

(function() {

	var f = "";
	var fields = document.getElementsByTagName("input");
	for( var i = 0; i < fields.length; i++ ) {
		if( fields[i].name == "q" ) {
			f = fields[i].value;
			break;
		}
	}
	if( f ) {
	
		function get_url( f ) {
			return "http://feedmelinks.com/search-as-xml?q=" + escape(f);
		}

		var url = get_url( f );

		GM_xmlhttpRequest({
			method:"GET",
			url:get_url( f ),
			onload:function(details) {
				var match = details.responseText.match(/\d+ matches from \d*,?\d*/);

				if( match == null )
					return;
				var zero_match = details.responseText.match(/0 matches/);
				if( zero_match != null)
					return;

				link = document.createElement("A");
				link.innerHTML = "Also found " + match[0] + " links on Feed Me Links!";
				link.href = "http://feedmelinks.com/search?q=" + escape(f);
				link.style.color = "red";
				link.style.fontWeight = "bold";
				link.style.padding = "15px 0px 0px 0px";
				link.style.textDecoration = "underline";
				body = document.getElementsByTagName("div")[0];
				body.insertBefore(link, body.firstChild); 

    }
  })

	}

})();
