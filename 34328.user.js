// ==UserScript==
// @name Facebook Status
// @description Set Status on Facebook
// @include http*://*
// ==/UserScript==



var noun_type_song = {
  _name: "song name",
  suggest: function( text, html ) {
    var suggestions  = [CmdUtils.makeSugg(text)];
    if(window.foxytunesGetCurrentTrackTitle){
  	  suggestions.push(CmdUtils.makeSugg(window.foxytunesGetCurrentTrackTitle()));
  	}
    return suggestions;
  }
}


CmdUtils.CreateCommand({
  name: "fb-status",
  takes: {status: noun_type_song},
  locale: "en-US",
  homepage: "http://mushex.antaranian.name",
  author: {name: "Mushex Antaranian", email: "jesirobendebua@gmail.com"},
  icon: "ttp://static.ak.fbcdn.net/favicon.ico",
  preview: function(pblock, directObject) {
    
    searchText = jQuery.trim(directObject.text);
    
    var previewTemplate = "Set Facebook status <b>${query}</b>";
    var previewData = {query: searchText};
    pblock.innerHTML = CmdUtils.renderTemplate(previewTemplate, previewData);

  },

  execute: function(directObject) {
    var query ="listening " + directObject.text;
    jQuery.ajax({
			type: "GET",
			url: "http://new.facebook.com/",
			data: {},
			success: function(fb) {
				var re = /name="post_form_id" value="([a-z0-9]+)"/;
				var res = re.exec(fb);
				if (!res) { displayMessage('Error updating Facebook status.'); return; }
				var pfi = res[1];
				jQuery.post("http://new.facebook.com/updatestatus.php", {'post_form_id': pfi, 'status': query},  function(t) { displayMessage('Facebook status updated'); });
			},
			error: function() {
				displayMessage("Error updating Facebook status.")
			}
		});
  }
});