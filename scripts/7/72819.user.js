// ==UserScript==
// @name	Wretch Popup Picture
// @version	1.2
// @namespace  http://blog.dg-space.com/js/wretch-popup-picture
// @description	 wretch無名快速檢視照片(v1.2)
// @homepage	http://blog.dg-space.com/
// @include	http://www.wretch.cc/album/album.php*
// ==/UserScript==


// ********** Main Script ***********
var GM_JQ = document.createElement('script');
GM_JQ.src		= 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type	= 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100);
	}else{ $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {

		$.noConflict()
		$('<div>jQuery is running!</div>').css({padding: '10px', background: '#ffc', position: 'absolute',top: '0', width: '100%'}).prependTo('body').fadeIn('fast').animate({opacity: 1.0}, 300).fadeOut('fast', function() {
		      $(this).remove();
		});

		// ~~~~ start scripting.  ~~~~~~~~~~~~
		$('<div>').attr('id','image_overlay').css({'display':'none','position':'absolute','text-align':'center','z-index':'90002','overflow':'auto','width':'100%','left':'0'}).appendTo('body'); 
		$('<div>').attr('id','black_overlay').css({'display':'none','background-color':'black','z-index':'90001','-moz-opacity':'0.8','opacity':'.80','filter':'alpha(opacity=80)'}).appendTo('body');
		$('#image_overlay').html('<table width="100%"><tr><td align="center"><img id="ShowMe" src="http://web.tmjh.tp.edu.tw/doc2/1170_files/resserver_027.gif"></td></tr></table>');
		$('#ShowMe').css({'border':'10px solid #FFF','-moz-border-radius':'8px'});

		$('.side > a').click(function(){

				setModalOverlay();
				var img = $(this).children().attr('src');
				var imgNewUrl = img.replace(/\/thumbs\/t?/, '/');
				
				$('#image_overlay').show();
				$('#ShowMe').attr('src',imgNewUrl).load(function(){
						$('#image_overlay').css({'top':$(window).scrollTop()+20});
						if ($(this).height()+40 > $(window).height() )
						{
							$('#ShowMe').attr('height',$(window).height()-60);
						}
				});
				
				$('#ShowMe').click(function(){
					 $('#image_overlay').hide();
					 $('#black_overlay').hide();
					 $('#ShowMe').removeAttr('height').attr('src','http://web.tmjh.tp.edu.tw/doc2/1170_files/resserver_027.gif');
				});	
				return false;
		});
		
		function setModalOverlay(){
			$('#black_overlay').css({"position":"absolute", width:$(window).width(), height:$(window).height(), top:$(window).scrollTop(), left:$(window).scrollLeft()}).show();
		}


}