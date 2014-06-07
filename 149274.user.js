// ==UserScript==
// @name        spoki plus gallery
// @namespace   spoki+
// @description spoki+
// @author		jang
// @include     http://*.spoki.lv/profils/*
// @include     http://spoki.tvnet.lv/profils/*
// @version     0.2
// ==/UserScript==


var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + init.toString() + ")(jQuery)";
document.body.appendChild(script);
		
		var headID = document.getElementsByTagName("head")[0];

		var cssNode = document.createElement('style');
		cssNode.type = 'text/css';		
		cssNode.media = 'screen, projection';
		cssNode.innerHTML='#galleryLargePicturePrev { background-image: url("http://ifrype.com/i/px.gif"); cursor: pointer; height: 100%; position: absolute; right: 50%; top: 0; width: 490px;} #galleryLargePictureNext { background-image: url("http://ifrype.com/i/px.gif"); cursor: pointer;    height: 100%; left: 50%; position: absolute; top: 0; width: 490px; } #galleryLargePicture {    background-position: center center;    background-repeat: no-repeat;    position: relative; } #galleryLargePictureNext div {    background-image: url("http://ifrype.com/gallery/img/v1/next.png");    display: none;    height: 41px;    margin-top: -25px;    position: absolute;    right: 20px;    top: 50%;    width: 25px;} #galleryLargePictureNext:hover div {    display: block;} #galleryLargePicturePrev div {    background-image: url("http://ifrype.com/gallery/img/v1/prev.png");    display: none;    height: 41px;    left: 20px;    margin-top: -25px;    position: absolute;    top: 50%;    width: 25px;} #galleryLargePicturePrev:hover div {    display: block;}';
		headID.appendChild(cssNode);


function init() {
	var next=false;
	$(".galleryLinkDiv").next().attr("id","thumblist");

	var pic_count = $('#thumblist').children().length;
	var cur_index = 0;

	if (pic_count>1){
		$('.articleBody').prepend('<div id="galleryLargePicture"><a href="javascript:" id="galleryLargePicturePrev"><div></div></a><a href="javascript:" id="galleryLargePictureNext"><div></div></a></div>');

		$('#thumblist').children().each(function(index){		
			b = $(this).find("img").attr("style");
			if (typeof $(this).find("img").attr("style") != 'undefined') cur_index = index;			
		});

		$('#thumblist').children().each(function(index){
			var link = $('a:eq(0)',this).attr('href');	
			if (index < cur_index){
				$('#galleryLargePicturePrev').attr('href',link);
			}
			if (index > cur_index && !next){
				next=true;
				$('#galleryLargePictureNext').attr('href',link);
			}			
		});

		var w;
		$('.articleBody').each(function(){	
			$('img:eq(0)',this).each(function() {		
				$(this).clone().appendTo('#galleryLargePicture');
				$(this).remove();
				w = $(this).attr('width');
				var actual_w= w/2;			
				$('#galleryLargePicture').css('width',w);
				$('#galleryLargePicturePrev').css('width',actual_w);
				$('#galleryLargePictureNext').css('width',actual_w);			
			});
		});	
	}
}