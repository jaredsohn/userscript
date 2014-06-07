// ==UserScript==
// @name           Grepolis Night Style(Subscript)
// @namespace      Grepolis Night Style(Subscript)
// @description    
// @include        http://*.grepolis.*/game*
// ==/UserScript==


var grepoNightStyle = {
	
	world: (typeof Game.world == "undefined") ? document.URL.match(/http:\/\/(ro\d+).grepolis.com/)[1] : Game.world,
	
	nightBonus: {
		ro1: [23, 9],
		ro2: [24, 8],
		ro3: [23, 7],
		ro4: [23, 6],
		ro5: [23, 7],
		ro6: [23, 5],
		ro7: [24, 8],
		ro8: [24, 6],
		ro9: [24, 6],
		ro10: [24, 6],
		ro11: [23, 8]
	},
	
	date: new Date(Game.server_time * 1000),
	
	isNight: function() {
		if (this.date.getHours() >= this.nightBonus[this.world][0] || this.date.getHours() < this.nightBonus[this.world][1]) return true;
		return false;
	},
	
	addStyle: function() {
		$("head").append("<link id=\"grepoNightStyle_style\" rel=\"stylesheet\" type=\"text/css\" href=\"http://www.grepotools.de/tonda/grepoNightStyle/grepoNightStyle.css\">");
	},
	
	getFileName: function(file) {
		return file.substring(file.lastIndexOf("/") + 1, file.lastIndexOf("."));
	},
	
	addImages: function() {
		var that = this;
		$("#town_background img").each(function() {
			if ($(this).hasClass("empty") || this.id == "index_place") return;
			
			$("#town_background .empty").before("<img class=\"grepoNightStyleImage\" src=\"http://www.grepotools.de/tonda/grepoNightStyle/images/"+that.getFileName(this.src)+".png\"");
		});
		
		$("#town_background .grepoNightStyleImage:first").before("<img class=\"grepoNightStyleTransparentLayer\" src=\"http://www.grepotools.de/tonda/grepoNightStyle/images/transparent_layer.png\"");
		$("#town_background .grepoNightStyleImage:first").before("<img class=\"grepoNightStyleImage\" src=\"http://www.grepotools.de/tonda/grepoNightStyle/images/background.png\"");
	},
	
	timeLeft: function() {
		return 3600*(this.nightBonus[this.world][0]-1-this.date.getHours()) + 60*(60-1-this.date.getMinutes()) + (60-this.date.getSeconds());
	},
	
	startNightModus: function() {
		this.addStyle();
		this.addImages();
	},
	
	init: function() {
		if (this.isNight()) {
			this.startNightModus();
		} else {
			setTimeout("grepoNightStyle.startNightModus()", this.timeLeft() * 1000);
		}
	}
	
}

grepoNightStyle.init();