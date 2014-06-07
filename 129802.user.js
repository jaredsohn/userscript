// ==UserScript==
// @id             7653
// @name           Filehippo Direct Links
// @version        1.0
// @namespace      http://update.filehippo.com/update/*
// @author         Gavin Borg
// @description    Changes Filehippo Updater results page links from redirects to direct links, to work happily with DownThemAll!.
// @include        http://update.filehippo.com/update/*
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
$(document).ready(
	function() {
		
		// All download links.
		$("[title='Download Now!']").each(
			function() {
				
				// Special storage of this - inside the GM_ stuff, 'this' refers to the object, not the link element we've captured above.
				var self = this;
				
				// Use greasemonkey's object, since jquery can't get cross-domain easily.
				GM_xmlhttpRequest({
					method: "GET",
					url: $(self).attr("href"),
					onload: function(data) {
						
						// Get text of response (html of redirecting page)
						data2 = data.responseText;
						
                        // Parse html from redirecting page.
                        pos = data2.indexOf('href="/download/file');
                        tempURL = "http://www.filehippo.com" + data2.substring(pos + 6);
						newURL = tempURL.substring(0, tempURL.indexOf('"'));
                        
						// Set the new url to the link we pulled the redirecting page from.
						$(self).attr("href", newURL);
					}
				});
			}
		);
	}
);