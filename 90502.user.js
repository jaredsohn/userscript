// ==UserScript==
// @name           FurryFlagger
// @namespace      furryflagger
// @description    flags furries on facepunch
// @include        http://www.facepunch.com/threads/*
// @include        http://facepunch.com/threads/*
// ==/UserScript==

(function($,window,document,undefined) {

	function blockPost(post)
	{		

		var userinfo = post.find(".userinfo");
		userinfo.find("a.username").removeClass("online").css("color", "#473519");
		var title = userinfo.find(".usertitle");
		title.text("Furry").css("font-weight","bold").css("font-size","24px").css("color","red");
		$("<img src='http://www.facepunch.com/fp/emoot/siren.gif'>").prependTo(title);
		$("<img src='http://www.facepunch.com/fp/emoot/siren.gif'>").appendTo(title);
		
		post.find(".postdetails, .postfoot").css("background","#f0e5d4");
	}
	
	/*
	$.getJSON("http://charlie.bz/furryflagger/definitions.txt", function(data) {
		furries.splice(data);
	});
	*/
	
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://charlie.bz/furryflagger/definitions.txt',
		onload: function(resp) {
		
			var furries = $.parseJSON(resp.responseText);
			
			$("#posts li").each(function() {
				var $this = $(this);
				var username = $this.find("a.username").text();
				
				if($.inArray(username, furries) > -1) {
					blockPost($this);
				}
			});
		}
	});
	
	
})(unsafeWindow.jQuery, window, window.document);