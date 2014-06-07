// ==UserScript==
// @name          Direct FB
// @version       3.5.1
// @date          09-09-2012
// @description   Facebook oneclick download links on all pages!!DOWNTHEMALL Supported
// @namespace     http://userscripts.org/users/DirectLinker
// @require 	  http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @include       http://*facebook.com/*
// @include       https://*facebook.com/*
// ==/UserScript==

//	MAKE SURE THAT ALL THE VARIABLES HAVE PROPER VALUES				//

//						 SETTINGS									//
var fb_bcolor='red'			//	#567, #010101 	Hexadecimal values for color are also accepted
var	ff_bsize=1				//	Border size ONLY NUMBER
var link_position='bottom'	//	top/bottom

//					USER SETTINGS END HERE							//

//	DO NOT EDIT BELOW THIS LINE IF YOU DO NOT WHAT YOU ARE DOING	//

$(function(){
	var auto_link = GM_getValue("auto_link", true);
	fstyle();
	if(auto_link){
            fblinkify();
            selector().live('mouseover',fblinkify);
        }
	
	function fstyle(){
		var style='<style type="text/css" id="istyle">\n';
		style+='.fbdlb {border:'+ff_bsize+'px solid '+fb_bcolor+';}\n';
		style+='.fbdlh {display:none;}\n';
		style+='#fbc {position:relative; float:left;}\n';
		style+='#fbdl {z-index:100;position:absolute;'+link_position+':0;}';
		style+='</style>';
		
		$(style).appendTo('head');
		
		$(window).keydown(function(e){
			switch(e.keyCode){
				case 192:	if($('a.fbdla').hasClass('fbdlb')){
								$('a.fbdla').removeClass('fbdlb');
								selector().die();
								$('a#fbdl').hide();
								GM_setValue("auto_link", false);
							}else{
								$('a.fbdla').addClass('fbdlb');
								$('a#fbdl').show();
								fblinkify();
								selector().live('mouseover',fblinkify);
								GM_setValue("auto_link", true);
							}
							break;
			}
		});
	}
	
	function fblinkify(){
		selector().addClass('fbdla fbdlb').wrap('<div id="fbc"/>').after('<a id="fbdl"/>')
		.parent().each(function(){
			var ih=$(this).outerHeight()/3;
			var iw=$(this).outerWidth()/2;
			try{
				var il=$(this).find('i')[0].style.backgroundImage;
			}catch(e){
				var il=$(this).find('img')[0].src;
			}
			
			var fullLink = il.replace(/url\(['"]?(.*)\/([\d_]+)[aqstn]\.jpg['"]?\)/, "$1/$2o.jpg")
						.replace(/\/p\d+x\d+\//, "/")
			$(this).append("<a href='" + fullLink + "' />");
			
			$('a#fbdl',this).css({width:iw,height:ih,"float":"right",left:iw})
				.attr("href",fullLink.replace(/jpg$/, "jpg?dl=1"));
		})
	}
	
	function selector(){
            return $('a[href*="photo"]:not(.fbdla):has(i[style*="fbcdn"]),a[href*="photo"]:not(.fbdla):has(img[src*="photos"])').not(':has(img[src*="gif"])');
	}
});