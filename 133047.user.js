// ==UserScript==
// @name       flickr photoset list
// @namespace  http://tsuyoikaze.allcx.com/
// @version    0.1
// @description  none
// @match      http://www.flickr.com/photos/*
// @copyright  2012+, tsuyoikaze
// ==/UserScript==


var script=document.createElement("script");
script.type="text/javascript";
script.src="http://code.jquery.com/jquery-1.7.2.min.js";
document.body.appendChild(script);

var div=document.createElement("div");
div.id="userscript";
document.body.appendChild(div);

var sw=document.createElement("div");
sw.id="switch";
sw.innerHTML="<a>展开</a>";
document.body.appendChild(sw);

var url=location.href;
var set_ID=url.split('/')[6];

$(document).ready(function() {
	$("#userscript").empty();
	$("#switch").css({"right":"20px","top":"20px","position":"fixed","background":"url(http://i.imgur.com/j1aUf.png)","width":"32px","height":"16px"});
    $.getJSON("http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id="+set_ID+"&api_key=a0861dfe697cfc3d8ccc3924eb3d6a73&format=json&extras=original_format&page=1",function jsonFlickrApi(rsp){
		if(rep.stats=="OK"){
			var html=" ";
			var img_num=rsp.photoset.total;
			alert(img_num);
			var img_arr=rsp.photoset.photo;
			$.each(rsp,function(photoIndex,photo){  
                    link="http://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.originalsecret+"."+rsp.originalformat;  
                    html +='<a href="'+link+'" target="_blank">'+link+'</a>';
                });               
			
		}
		else{var html="出错啦>_<";};
		$('#userscript').html(html);
		})
});