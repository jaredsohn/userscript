// ==UserScript==
// @id             vk.com-3cccf9b9-a6a4-4527-8cc8-929ebcf2d202@scriptish
// @name           VK Album Downloader
// @version        1.0
// @namespace      http://userscripts.org/users/DirectLinker
// @author         Direct Linker
// @description    Creates direct links to the full size images. Download full VK albums using downthemall!
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include        http://*vk.com/*
// @include        https://*vk.com/*
// @run-at         document-end
// ==/UserScript==

var dl_bcolor='red'						//	#567, #010101 	Hexadecimal values for color are also accepted
var	dl_bsize=1							//	Border size ONLY NUMBER
var dl_vertical_position='bottom'		//	Link vertical position 'top' OR 'bottom'
var dl_horizontal_position='right'		//	Link horizontal position 'left' OR 'right'


$(function(){
	fstyle();
		
	function fstyle(){
		var style='<style type="text/css" id="istyle">\n';
		style+='.dlb{border:'+dl_bsize+'px solid '+dl_bcolor+';}\n';
		style+='.dlc{position: relative;}\n';
		style+='.dll{height: 30px;position: absolute;'+dl_vertical_position+': 0;'+dl_horizontal_position+': 0;}\n';
		style+='</style>';
		
		$(style).appendTo('head');
		selector().live('mouseover',linkify);
		
		$(window).keydown(function(e){
			switch(e.keyCode){
				case 192:	if($('a.dla').hasClass('dlb')){
								$('a.dla').removeClass('dlb');
								selector().die();
								$('.dll').hide();
								GM_setValue("auto_link", false);
							}else{
								$('a.dla').addClass('dlb');
								$('.dll').show();
								selector().live('mouseover',linkify);
								GM_setValue("auto_link", true);
								linkify();
							}
							break;
			}
		});
	}

	function linkify(){
		var auto_link = GM_getValue("auto_link", true);
		if(!auto_link){
			return;
		}
		selector()
		.addClass('dla dlb')
		.wrap('<div class="dlc"/>')
		.after('<a class="dll"/>')
		.each(function(){
			  var s = /\{.*\}/.exec($(this).attr('onClick'))[0];
			  var o = eval("("+s+")");
			  var m;
			  if(o.temp.z_ != undefined) {
				  m = o.temp.z_;
			  } else if(o.temp.y_ != undefined) {
				  m = o.temp.y_;
			  } else {
				  m = o.temp.x_;
			  }
			  var u = o.temp.base + m[0] + ".jpg";
			  var w = $(this).width() / 2;
			  $(this).next().css({"width":w}).attr("href", u);
		})
		return;
	}
	
	function selector(){
            return $('.pva_photo_link:not(.dla)');
	}

})