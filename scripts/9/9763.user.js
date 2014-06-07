// ==UserScript==
// @name           Snipshot Utilities
// @namespace      http://userscripts.org/users/7010
// @include        http://services.snipshot.com/edit/*
// ==/UserScript==

// 2007/07/27
// 2007/07/21
// 2007/07/17
// 2007/06/16

GM_registerMenuCommand('Original Size', function(){with(unsafeWindow){
	var pos = snipshot.image.pos;
	var cropPos = snipshot.image.cropPos;
	var cropSize = snipshot.image.cropSize;
	
	var lastSize = snipshot.image.size;
	// var originalSize = m.originalSize;
	var originalSize = typeof(m)!='undefined' ? {
		h : m.originalSize.height, 
		w : m.originalSize.width, 
	} : snipshot.state.server.original.size;
	
	var ratio = originalSize.h / lastSize.h;
	
	snipshot.image.setImageBox(
		new Coordinates(
			cropPos.x + pos.x, 
			cropPos.y + pos.y), 
		new Dimensions(
			Math.ceil(cropSize.w * ratio), 
			Math.ceil(cropSize.h * ratio)));
	snipshot.load.loadImage();
}})

GM_registerMenuCommand('Drop Frame', function(){
	with(unsafeWindow){
		var input = (prompt('size')).split(',');
		if(!input[0])
			return;
		
		var width = 1*input[0];
		var height = input[1] ? 1*input[1] : width;
		
		var lastPos = snipshot.image.getImageBoxPos();
		var lastSize = snipshot.image.cropSize;
		
		snipshot.image.setCropBox(
			new Coordinates(
				lastPos.x + width, 
				lastPos.y + height), 
			new Dimensions(
				lastSize.w - (width*2), 
				lastSize.h - (height*2)));
		
		setTimeout(function(){
			with(unsafeWindow){
				typeof(m)!='undefined' ? 
					m.save() : 
					snipshot.state.save();
			}
		}, 0);
	}
})
