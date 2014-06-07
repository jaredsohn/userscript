// ==UserScript==
// @name           jc_google_image
// @namespace      http://localhost/jc/
// @include        http://images.google.*/*
// @include        http://www.google.*/images?*
// @include		   http://www.google.*/search?*
// ==/UserScript==




// Add jQuery
function loadjQuery() {
	
	if('undefined' == typeof unsafeWindow.jQuery) { 
		if (!GM_JQ) {
			//alert('1apple:1');
			var GM_JQ = document.createElement('script');
			//GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
			//GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.min.js';
			//GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
			//GM_JQ.src = 'http://127.0.0.1:100/jquery-1.3.2.min.js';
			GM_JQ.src = 'http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.4.4.min.js';
			//GM_JQ.src = 'http://192.168.10.15/files/jquery-1.4.2.min.js';
			GM_JQ.type = 'text/javascript';
			document.getElementsByTagName('head')[0].appendChild(GM_JQ);
			//alert('1apple:2');
		}
	}
}

if ( ( 'undefined' == typeof unsafeWindow.jQuery ) || ( 'undefined' == typeof unsafeWindow.jQuery.noConflict ) ) {
	loadjQuery();
}

// Check if jQuery's loaded
function GM_wait() {

	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100); 
	} else { 
		$ = unsafeWindow.jQuery;
		//var $ = unsafeWindow.jQuery.noConflict(true); 
		letsJQuery(); 
	}
}

GM_wait();

GM_addStyle(".jcGoogleBigImageL { position:fixed; z-index:5100; left:5px; top:5px; width:auto; height:auto; border:3px solid blue; display:none; }");
GM_addStyle(".jcGoogleBigImageR { position:fixed; z-index:5100; right:5px; top:5px; width:auto; height:auto; border:3px solid blue; display:none; }");


// All your GM code must be inside this function
function restoreSourceImage() {

	doJcMainWork();
	
}

function doJcMainWork() {
	
	// 將 Google Image 恢復成 舊的顯示方式
	var standardUrl = window.location.href;
	if (-1 == standardUrl.indexOf("&sout")) {
		var addToUrl = '&sout=1';
		var basicUrl = standardUrl+addToUrl;

		window.location.replace(basicUrl);
		return false;
	}
	
	
	$('img').live('mouseover' , function(e) {
		var aObj = $(this).parents('a').eq(0);
		var url = aObj.attr('href');
		var url2 = url;
		var default_url = unescape(url);
		//GM_log('IMG url = ' + default_url);
		
		var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        
        
        // http://www.google.com.tw/imgres?q=%E9%BB%91%E9%B1%BC&um=1&hl=zh-TW&newwindow=1&safe=off&client=firefox&sa=N&rls=org.mozilla:zh-TW:official&tbm=isch&tbnid=iPC5mMpXMRjLJM:&imgrefurl=http://www.scp.cc/seller/offerdetail/5-41-197-218.html&docid=p95wa8DwUyxFaM&w=800&h=600&ei=qu00Trb6IqaJmQX54KjwCg&zoom=1&biw=1879&bih=892
        if (url.match(/imgurl\=/)) {
			url2 = url.replace(/^(.*?)imgurl\=(.*?)&(.*?)$/ , '$2');
			
		}
		
		aObj.attr('href' , url2);
		
		if (!aObj.hasClass("close_lk")) {
			aObj.attr('target' , '_blank');
		}
		
		$('#jcGoogleBigImage img').remove();
		$('#jcGoogleBigImage').removeClass();
		
		if (x > parseInt($('body').width()/2) ) {
			$('#jcGoogleBigImage').addClass('jcGoogleBigImageL');
		} else {
			$('#jcGoogleBigImage').addClass('jcGoogleBigImageR');
		}
			
			
		$('#jcGoogleBigImage').append('<img src="" />');
		
		$('#jcGoogleBigImage img').unbind();
		$('#jcGoogleBigImage img').bind('load readystatechange', function(e) {
		  if (this.complete || (this.readyState == 'complete' && e.type == 'readystatechange')) {
		     resizeGBImg(x,y);
		  }
		});
		
		
		try {
			url2 = unescape(url2);
			//GM_log('IMG url = ' + url2);
			//$('#jcGoogleBigImage div.url').text(url2);
			$('#jcGoogleBigImage img').attr('src' , url2);
			
			$('#jcGoogleBigImage').show();
			
			if (!aObj.attr('jcIn')) {
				/*
				aObj.attr('jcIn' , 'true')
					.after('<br /><a href="' + default_url + '" target="_blank">[URL]</a>');
				*/
				aObj.attr('jcIn' , 'true')
					.attr('target' , '_blank');
			}
		} catch (e) {
		}
		
	});
	
	$('img').live('mouseout' , function() {
		$('#jcGoogleBigImage').hide();
	});
	
	
	
	
	$('body').append('<div id="jcGoogleBigImage"><img src="" /></div>');
	
	// TODO: 
	//	1. 要適當的縮小圖
	//	2. 要有左右區分
	
	// window.setTimeout( resizeGBImg , 2000 );
	
	
	
}

function resizeGBImg(x,y) {

	var w = $('#jcGoogleBigImage img').width();
	var h = $('#jcGoogleBigImage img').height();
	
	if ( (0 != w) && (0 != h) ) {
	
		var body_width = $('body').width();
		//var x = e.pageX - this.offsetLeft;
		
		//var allow_w = parseInt(body_width/2);
		
		if (x > parseInt(body_width/2) ) {
			var allow_w = x-5-15;
		} else {
			var allow_w = body_width - x - 25;
		}
		
		/*
		if ( w > allow_w ) {
			$('#jcGoogleBigImage img').width( allow_w );
			$('#jcGoogleBigImage img').height( h*(allow_w/w) );
		}
		*/
		
		
		var view_w = allow_w;
		var view_h = h*(allow_w/w);
		var win_h = parseInt($(window).height()) - 15;
		
		if (view_h > win_h) {
			view_w = view_w * (win_h / view_h);
			view_h = win_h;
		}
		
		// GM_log("win_h vs view_h = " + win_h + " : " + view_h + " : " + view_w);
		
		$('#jcGoogleBigImage img').width( view_w );
		$('#jcGoogleBigImage img').height( view_h );
		
	}
}

function letsJQuery() {
	
	window.setTimeout(restoreSourceImage , 300);
	
}


// GM_log('jQuery version: ' + $().jquery );
