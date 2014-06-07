// ==UserScript==
// @name           Intuit Reader
// @namespace      KullDox - http://kulldox.atwetbpages.com
// @description    Removes adds from the site and sets a grey background on the page, making reading more comfortable.
// @include        http://www.intuit.ru/*
// @exclude        http://www.intuit.ru/user/*
// @version        0.1.0
// @date           2009-10-01
// ==/UserScript==

// set up jQuery variable
  var $;

// Add jQuery
    var GM_JQ = document.createElement('script');
//    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
//    GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.min.js';
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
    GM_JQ.type = 'text/javascript';
  // Check if jQuery's loaded
  var loadFlag = 0;// a flag to check if the jquery file has been inserted into <head>
  var checker=setInterval(function(){
    $ = unsafeWindow.jQuery;
	if(typeof ($) == "function" ) {
			clearInterval(checker);
          if(loadFlag ==1){
			clearInterval(checker);
			letsJQuery();
			return;
		  }
     } else {
		    if(loadFlag ==0){
				document.getElementsByTagName('head')[0].appendChild(GM_JQ);
				loadFlag = 1;
			}
	 }
   },100);

// Do the magik
    function letsJQuery() {
			$.noConflict();//avoid conflicts with other libraries
		var $int_head = $('head'),
			$int_head_style = $int_head.find('style'),
			page = window.location.href,// get the location href to find out what page is loaded
			page_uri = window.location.pathname.substr(10)+window.location.search;//grab the page URI
		if($int_head_style.length <1)
		{
			$int_head.append('<style/>');
			$int_head_style = $int_head.find('style');
		}
        	$('.la_lecture_body').css('background','lightgrey');
        	$('.lecture_container').css('background','lightgrey');
        	$('.bannere240x400').remove();
        	$('.google160x600').remove();
        	$('.topbanner').remove();
        	$('#last_qa').parent().parent().parent().parent().parent().remove();
        	//$('body table:nth-child(4)').remove();
        	//$('body center table').remove();
        	$('#y5_direct1').parent().parent().next().remove();
        	$('#y5_direct1').parent().parent().remove();
        	$('body').css('background','lightgrey');
			$('pre').css({
							'background':'#000',
							'color':'#D3D3D3',
							'border':' 8px solid #000',
							//'-moz-border-bottom-colors':'#ccc #033 #039 #777 #888 #999 #aaa #bbb ',
							'-moz-border-bottom-colors':'#033 #039 #777 #888 #999 #aaa #bbb #ccc',
							'-moz-border-top-colors':'#033 #039 #777 #888 #999 #aaa #bbb #ccc',
							'-moz-border-left-colors':'#033 #039 #777 #888 #999 #aaa #bbb #ccc',
							'-moz-border-right-colors':'#033 #039 #777 #888 #999 #aaa #bbb #ccc',
							'-moz-border-radius':'10px',
							'padding':'5px'
							});
			var prettify_css = '.str{color:#080}.kwd{color:#008}.com{color:#800}.typ{color:#606}.lit{color:#066}.pun{color:#660}.pln{color:#000}.tag{color:#008}.atn{color:#606}.atv{color:#080}.dec{color:#606}pre.prettyprint{padding:2px;border:1px solid #888}@media print{.str{color:#060}.kwd{color:#006;font-weight:bold}.com{color:#600;font-style:italic}.typ{color:#404;font-weight:bold}.lit{color:#044}.pun{color:#440}.pln{color:#000}.tag{color:#006;font-weight:bold}.atn{color:#404}.atv{color:#060}}';
    }