// ==UserScript==
// @name           jcNextPic
// @namespace      http://localhost/jc/
// @require		   https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js
// @include        http://*/discuz/thread*
// @include        http://*/viewthread*
// @include        http://*/thread-*
// @include        http://blog.xuite.net/*
// @include        http://*/viewtopic.php*
// @include        http://www.cecet.cn/*
// @include        http://*.77tuba.com/*
// @include        http://77tuba.com/*
// @include        http://*.blogspot.com/*
// @include        http://www.mobile01.com/*
// @include        http://*/forum.php*viewthread*tid*
// @include        http://*.pixnet.net/*
// @include        http://*.mop.com/*
// @include        http://*.sina.com.cn/*
// @include        http://*/*/archives/*
// @include        http://*.stockstar.com/*html
// @include        http://*.soso.com/*
// @include        http://*.pixnet.net/blog/post/*
// @downloadURL    https://userscripts.org/scripts/source/82324.user.js 
// @updateURL      https://userscripts.org/scripts/source/82324.meta.js
// @copyright  	   2013+, JC
// @version	       2013.03.16.00h.00m
// ==/UserScript==


GM_addStyle("div#jcNextPic { position:fixed; cursor:pointer; top:10px; right:10px; border:1px solid #66CCFF; background-color:yellow; padding:2px; font-size:11px; z-index:100; }");
GM_addStyle("span.jcButton { cursor:pointer; border:1px solid #66CCFF; background-color:yellow; padding:2px; font-size:11px; z-index:100; }");

var jc_nextpic_mark = 'NP';

$(document).ready(function() {
    
	letsJQuery();
    
});


// All your GM code must be inside this function
function letsJQuery() {
    //alert($); // check if the dollar (jquery) function works
    //alert($().jquery); // check jQuery version
    
    if ( ($(document).width() >= 500) && ($(window).width() >= 500) ) {
    	window.setTimeout(function() {
				doJCNextPic(); 
			} , 100);
    }
    
    
}



var created_array = false;
var array_imgs = [];
var imgs_count = 0;

function create_img_array() {
	// create img array
	//$(document).scrollTop(0);
	if (!created_array) {
		$('img').each(function() {
			if ( ($(this).width() > 200) && ($(this).height() > 200) ) {
				array_imgs.push(this);
				imgs_count++;
			}
		});
		
		
		try {
			$('iframe').each(function() {
				
				var iframe_imgs = this.contentWindow.document.images;
				
				for (i = 0; i < iframe_imgs.length; i++) {
					if ( (iframe_imgs[i].width > 200) && (iframe_imgs[i].height > 200) ) {
						array_imgs.push(iframe_imgs[i]);
						imgs_count++;
					}
				}
				
			});
		} catch (e) {
		}		
		
		created_array = true;
		
	}
}

// All your GM code must be inside this function
function doJCNextPic() {
	
	var html = '';
	
	var link_id = 10000;
	
	var goto_top = false;

	// View Next Pic
	//next_pic_html = '<span id="jcNextPic" style="position:fixed; cursor:pointer; top:10px; right:10px; border:1px solid #66CCFF; background-color:yellow; padding:2px; font-size:11px; z-index:10;">Next Pic</span>';
	next_pic_html = '<div id="jcNextPic" class="jcArea">' + 
					'<input type="button" id="jcNextPicBtn" value="Next Pic" />' + 
					'<input type="button" id="jcNextPicHideBtn" value="-" title="Hide" /><br />' + 
					'<span id="jcAutoWidthBtn" class="jcButton">auto</span>' + 
					'<span id="jc100WidthBtn" class="jcButton">100%</span>' + 
					'<span id="jcCrossImagesBtn" class="jcButton">排</span>' + 
					'<span id="jcEasyViewBtn" class="jcButton">易讀</span>' + 
					'</div>';
	
	
	$('body').prepend( next_pic_html );
	
	//$(document).scroll(function() {		$('#jcNextPic').text( $(document).scrollTop() );	});
	
	$('#jcNextPicHideBtn').click(function() {
		// Hide All jc area
		//$('#jcNextPic').hide();
		$('.jcArea').hide();
	});
	
	$('#jcNextPicBtn').click(function() {
		
		create_img_array();
		
		if (goto_top) {
			$(document).scrollTop(0);
			//$('#jcNextPic').text('Next Pic');
			$('#jcNextPicBtn').val('Next Pic');
			goto_top = false;
		}
		
		var doc_top = $(document).scrollTop();
		var oked = false;
		var jump_nexted = true;
		
		$.map(array_imgs , function(elm , idx) {
			//$('body').append( idx + ': ' + $(document).scrollTop() + ' ;;; ' + doc_top + '<br />' );
			if (!oked) {
				elm.scrollIntoView();
				if ($(document).scrollTop() >= (doc_top+1)) {
					oked = true;
				}
			}
		});
		
		if (doc_top == $(document).scrollTop()) {
			jump_nexted = false;
		}
		
		if (!jump_nexted) {
			//$('#jcNextPic').text('Goto First');
			$('#jcNextPicBtn').val('Goto First');
			goto_top = true;
		}
		
	});
	
	
	$('#jcAutoWidthBtn').click(function() {
		$('img').filter(function() {
			return (parseInt($(this).height()) >= 120);
		}).each(function() {
			$(this).css('width' , 'auto')
					.css('height' , 'auto');
		});
	});
	
	$('#jc100WidthBtn').click(function() {
		$('img').filter(function() {
			return (parseInt($(this).height()) >= 120);
		}).each(function() {
			$(this).css('width' , '100%')
					.css('height' , '100%');
		});
	});
	
	$('#jcCrossImagesBtn').click(function() {
		doJcNextPicCrossImages();
	});
	
	$('#jcEasyViewBtn').click(function() {
		doJcEasyView();
	});
	
}





function doJcNextPicCrossImages() {
	// 排列圖片
	var container = $('body:eq(0)');
	var cw = container.width();
	var container2 = $('<div></div>');
	
	container.prepend(container2);
	
	container.find('img').each(function() {
		if ( ($(this).width() > 200) && ($(this).height() > 200) ) {
			container2.append($(this));
			$(this).css('vertical-align' , 'top');
		}
	});
}

function doJcEasyView() {
	// 易讀性
	(function(){
		var newSS, styles='* {background:white !important; color:black !important; line-height: 180% !important; font-size: 0.85cm !important; width:auto !important; margin: 0 0 0 0 !important; position:static !important;} :link, :link * { color: #0000EE !important;} :visited, :visited * { color: #551A8B !important;}'; 
		if(document.createStyleSheet) { 
			document.createStyleSheet("javascript:'"+styles+"'"); 
		} else { 
			newSS=document.createElement('link'); 
			newSS.rel='stylesheet'; 
			newSS.href='data:text/css,'+escape(styles); 
			document.getElementsByTagName("head")[0].appendChild(newSS);
		}})();
}
