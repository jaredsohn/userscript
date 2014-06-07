// ==UserScript==
// @name        developer info bar
// @namespace   developer info bar
// @include     *
// @version     1.2
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
/*
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100); 
		}else { 
			$ = unsafeWindow.jQuery;
				main(); 
		}
    }
		GM_wait();
*/

function main() {
if (top == self){
$.getScript('http://www.duralabel.com/js/960.gridder.js');
	// var setup
	var MainWrap = $('body').children(),
		WrapID = MainWrap.attr('id'),
		WrapWidth = MainWrap.width(),
		WrapSelector = 'ID',
		winWidth = $(window).width(),
		winHeight = $(window).height(),
		nine6O = (winWidth - 960)/2,
		tagList = '',
		Styles = '#classinfo {height: 300px;list-style: none outside none;margin: 0;overflow: scroll;padding: 0;text-align: left;width: 150px;}';
		Styles += '#topgrade {overflow:hidden;font-size: 12px;background: none repeat scroll 0 0 #FFFFFF;box-shadow: 0 0 5px 1px lime;color: black;display: block;padding: 3px;position: fixed;right: 10px;top: 10px;z-index: 99999;}';
		Styles += '#classinfo li {padding:0;}.sizeGrid {display:none;}#theGrid {float:right;}';
		Styles += '#topgradeHide {text-align:center;font-weight:bold;border:1px solid pink;background:yellow;height:20px;}';
	$('*').hover(function(){
		var checktag = $(this);
	});
	$('*').each(function() { 
		var Theobj = $(this).attr('class'),
			TagType = '.';
		if(Theobj === undefined){
		Theobj = $(this).attr('id');
		TagType = '#';
		}
		if(Theobj === undefined){
		Theobj = $(this).attr('tagName');
		TagType = '';
		}
		if(Theobj != undefined && Theobj.length > 0){
		tagList +='<li data="'+TagType+Theobj+'">'+TagType+Theobj+'</li>';
		}		
	});
	
	$('body').prepend('<div id="topgrade"><div id="topgradeHide">Hide</div><div id="SSwindow"></div><div id="wrapInfo"></div><ul id="classinfo">HTML Class and ID'+tagList+'</ul></div>');
	$('head').append('<style>'+Styles+'</style>');
	$('#topgrade').hide();
	if(WrapID === undefined){
	WrapID = MainWrap.attr('class');
	WrapSelector = 'Class';
	}
	
	if(WrapID != undefined){
	$('#wrapInfo').append('-Wrapper-<br>'+WrapSelector+': '+WrapID+'<br>Width: '+WrapWidth+'px');
	}
	
	$('#SSwindow').append('-Window-<br>W: '+winWidth+'px<br>H: '+winHeight+'px');
	$('#topgrade').fadeIn(1000);
	  // toggle tag highlight
	var topgradeheight = $('#topgrade').height();
	$("#topgradeHide").toggle(
      function () {
        $('#topgrade').animate({'height':'20px'});
		$(this).empty().text('Show');
      },
      function () {
		$('#topgrade').animate({'height':topgradeheight});
		$(this).empty().text('Hide');
      });
	  // toggle tag highlight
	$("#classinfo li").toggle(
      function () {
		var tagdata = $(this).attr('data');
		$(this).css('color','red');
        $(tagdata).css({"border":"1px dotted red"});
		//,'box-sizing': 'border-box','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box'
      },
      function () {
		$(this).css('color','black');
        var tagdata = $(this).attr('data');
        $(tagdata).css({"border":"none"});
      });
	// change things on window resize //
	window.onresize = function(event) {
	winWidth = $(window).width();
	winHeight = $(window).height();
	WrapWidth = MainWrap.width(),
	nine6O = (winWidth - 960)/2;
	$('#SSwindow,#wrapInfo').empty();
	if(WrapID != undefined){
	$('#wrapInfo').append('-Wrapper-<br>'+WrapSelector+': '+WrapID+'<br>Width: '+WrapWidth+'px');
	}
	$('#SSwindow').append('-Window-<br>W: '+winWidth+'px<br>H: '+winHeight+'px');
}
}
}
// load jQuery and execute the main function
addJQuery(main);