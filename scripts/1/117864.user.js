// ==UserScript==
// @id             Youtube_Ratings
// @name           Youtube Ratings
// @version        1.0
// @namespace      Youtube_Ratings
// @author         SEGnosis
// @description    Adds youtube rating bars to thumbnails
// @include        *.youtube.*
// @run-at         document-end
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){
	$("head").first().append("<style type=\"text/css\">.segnosis_bar{background-color: red;bottom: 100px;left: 100px;height: 4px;position: absolute;z-index: 103;}</style>");
});

setTimeout(function(){
	var thumbnails = $(".clip").toArray();

	for(i = 0; i < thumbnails.length; i++){
		var temp = $(thumbnails[i]).parents("a").first().attr("href");
		
		if(temp == undefined || temp.indexOf("/watch?v=") == -1){
			temp = $(thumbnails[i]).parents(".video-list-item-link").first().attr("href");
			
			if(temp == undefined){
				thumbnails.remove(thumbnails[i--]);
				continue;
			}
		}
		
		if($(thumbnails[i]).children(".segnosis_bar").length != 0){
			thumbnails.remove(thumbnails[i--]);
			continue;
		}

		temp = temp.replace("/watch?v=", "").replace("&feature=feedu", "").split("&")[0];

		if(temp.indexOf("/user/") != -1)
			thumbnails.remove(thumbnails[i--]);

	}
		
	for(i = 0; i < thumbnails.length; i++){
		var temp = $(thumbnails[i]).parents("a").first().attr("href");
		
		if(temp == undefined)
			temp = $(thumbnails[i]).parents(".video-list-item-link").first().attr("href");
		
		$.get("https://gdata.youtube.com/feeds/api/videos/" + temp.replace("/watch?v=", "").replace("&feature=feedu", "").replace("_more", "").split("&")[0] + "?v=2&alt=json-in-script", function(data){
			data = data.substr("gdata.io.handleScriptLoaded(".length, data.length - "gdata.io.handleScriptLoaded(".length - 2);
			data = $.parseJSON(data);
			
			var video_id = data.entry.id.$t.split(":")[3];
			var rateDenied = false;
			
			for(var i = 0; i < data.entry.yt$accessControl.length; i++){
				if(data.entry.yt$accessControl[i].action == "rate" && data.entry.yt$accessControl[i].permission == "denied")
					rateDenied = true;
			}
			
			average = 0;
			if(rateDenied == true)
				average = 100;
			else {
				average = data.entry.gd$rating.average; 
				average *= 18;
				average = 100 - average - 10;
			}
			
			for(k = 0; k < thumbnails.length; k++){
				var temp = $(thumbnails[k]).parents("a").first().attr("href");
				
				if(temp == undefined)
					temp = $(thumbnails[k]).parents(".video-list-item-link").first().attr("href");
				
				if(temp.indexOf(video_id) != -1)
					$(thumbnails[k]).append("<div class=\"segnosis_bar\" style=\"width:" + average.toString() + "%\"></div>");
			}
		});
	}

}, 1000);

Array.prototype.remove= function(){
    var what, a= arguments, L= a.length, ax;
    while(L && this.length){
        what= a[--L];
        while((ax= this.indexOf(what))!= -1){
            this.splice(ax, 1);
        }
    }
    return this;
}


function getStringBetween(input, start, end){
    var index = input.indexOf(start);

    if(index != -1){
        index += start.length;
        var endIndex = input.indexOf(end, index + 1);

        if(endIndex != -1)
            return input.substr(index, endIndex - index);
    }
    return false;
}
