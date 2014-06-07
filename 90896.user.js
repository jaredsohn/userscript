// ==UserScript==
// @name           TrollFlagger v1.0
// @namespace      lol
// @description    Flags the Trolls of Facepunch
// @include        http://www.facepunch.com/threads/*
// @include		   http://facepunch.com/threads/*
// ==/UserScript==

(function($,window,document,undefined) {






	$("li").each(function() {
			var $this = $(this);
			var username = $this.find("a.username").text();

			//BEGIN USER TITLE AREA
			if(username == "^-^"){
				titlePost($this, "TROLL", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "Red", "18px", "bold");
			}
			
			if(username == "BigHeaded B"){
			titlePost($this, "TROLL", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "Red", "18px", "bold");
			}
			
			if(username == "Mister_Jack"){
			titlePost($this, "TROLL", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "Red", "18px", "Bold");
			}
			
			if(username == "rawr >:3"){
			titlePost($this, "TROLL", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "Red", "18px", "Bold");
			}
			
			if(username == "MrOwn1"){
			titlePost($this, "TROLL", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "Red", "18px", "Bold");
			}
			
		});
		
		/*Default title settings for copypasta
		if(username == ""){
			titlePost($this, "TROLL", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "<img src='http://www.facepunch.com/fp/emoot/siren.gif'>", "Red", "18px", "Bold");
			}                               */

	function titlePost(post, UserTitle, append, prepend, color, size, weight)
	{		
		var userinfo = post.find(".userinfo");
		var title = userinfo.find(".usertitle");	
		var FW;
		if(weight == ""){
			FW = "normal";
		}
		else{
			FW = weight;
		}
		title.text(UserTitle).css("font-weight", FW).css("font-size", size).css("color", color);
		$(prepend).prependTo(title);
		$(append).appendTo(title);
	}

})(unsafeWindow.jQuery, window, window.document);