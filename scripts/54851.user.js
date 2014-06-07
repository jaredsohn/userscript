// ==UserScript==
// @name           jc_mycould_fix_link
// @namespace      http://localhost/jc/
// @include        http://www.mycould.com/discuz/forum*
// @include        http://www.lalulalu.com/forum*
// @include        http://www.hk-pub.com/forum/forum*
// @include        http://sexinsex.net/luntan/forum*
// ==/UserScript==

// 將 http://www.mycould.com/discuz/thread-692443-1-2.html 修改成 http://www.mycould.com/discuz/thread-692443-1-1.html
// 方便得知看過了沒
// http://www.lalulalu.com/thread-820427-1-2.html
//var re_w1 = new RegExp('((http.*?thread.*?\d-)(\d)(\.htm(l|)$))', "");
// 

var count = document.links.length;

var re_w1 = new RegExp('(http(.*?)thread(.*?)\.htm(l|)$)', "g");
//var re_w2 = new RegExp('((http.*?thread\-\d+\-\d+\-)(\d+)(\.htm(l|)$))', "g");
var mat = new RegExp('(^<img(.*?)gif\"([^>]*?)>$)', "g");
var mat2 = new RegExp('(.{3,200})', "g");
//var tt2 = '$2aaa$4';

// http://www.akiba-online.com/forum/showthread.php?t=6761
// http://www.tw-p2p.com/D-C-P2P/thread-617433-1-1.html

var re_link1 = new RegExp('((http.*?viewthread.php.tid.[0-9]+).*$)', "g");
var re_link2 = new RegExp('((http.*?viewthread.php.tid.[0-9]+).*$)', "");
var tt_link1 = '$2';
var loop = 0;

for (i = 0; i < count; i++) {
	var link = document.links.item(i);
	var ihtml = link.innerHTML;
	var href = link.href;

	//if ( href.match( re_link2 ) && (loop < 2) ) {		alert(href);		loop++;	}
	link.href = href.replace(re_link1, tt_link1);
	href = link.href;

	if ( href.match(re_w1) ) {
		if (!ihtml.match(mat)) {
			if (ihtml.match(mat2)) {
				
				// http://www.mycould.com/discuz/viewthread.php?tid=985947&extra=page=1&amp%3Bfilter%3Dtype%26amp%3Btypeid%3D9
				
				//link.href = href.replace(re_w2, tt2);
				link.href = href.replace(/((http.*?thread\-\d+\-\d+\-)(\d+)(\.htm(l|)$))/g, "$21$4");
				//link.innerHTML = link.innerHTML + ' [URL2]';
				link.target = '_blank';
			}
		}
	}
}






// Add jQuery
if (!GM_JQ) {
	//alert('1apple:1');
	var GM_JQ = document.createElement('script');
	//GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.min.js';
	//GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.min.js';
	GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
	//GM_JQ.src = 'http://127.0.0.1:100/jquery-1.3.2.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	//alert('1apple:2');
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

//if (!$) {	GM_wait(); } 

// All your GM code must be inside this function
function restoreSourceImage() {

	var did = 100;	
	$('a[href*=thread]').each(function() {
			if ($(this).text().length > 3) {
				$(this).addClass('jc_open8_link')
						.attr('jc_did' , did)
						.before('<a href="#" class="jc_open8_btn">(o6)</a>');
				did++;
			}
	});
	
	$('.jc_open8_btn').click(function() {
		
		var cc = 0;
		var can_open = false;
		var next_did = $(this).next().attr('jc_did');
		
		//alert(next_did);
		
		$('.jc_open8_link').each(function() {

			if ($(this).attr('jc_did') == next_did) {
				can_open = true;
			}
			if (can_open) {
				window.open( $(this).attr('href') , '_blank');
				cc++;
				if (cc > 5) { return false; }
			}
		});
		
		return false;
	});
	
}

function letsJQuery() {
	
	//alert($);
	window.setTimeout(restoreSourceImage , 10);
	
}


//GM_log('GM_run_jc_piring_add_url' + document.documentElement.innerHTML.match(re));
