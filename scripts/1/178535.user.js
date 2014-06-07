// ==UserScript==
// @name        SkepticalOb Layout Fixer
// @namespace   http://userscripts.org/*
// @include     http://www.skepticalob.com/*
// @grant	GM_addStyle
// @grant	GM_log
// @grant	GM_xmlhttpRequest
// @require		http://code.jquery.com/jquery-latest.min.js
// @version     1.1
// @run-at document-start
// ==/UserScript==

GM_addStyle("#content { background-color: #FFFFFF!important; overflow: hidden; position: relative;} #sidebar, #main {height: auto!important;} #main {margin-bottom: 0!important; padding-bottom:0!important;}");
GM_addStyle("#content #header {width: 100%; height:auto!important; }");
GM_addStyle("#footer-out {display: none!important;} #wpstats { display: none;}");
GM_addStyle("#sidebar {left:0px!important; background-color: white!important;}");
GM_addStyle("#content img, #content iframe { max-width:100%!important; }");
GM_addStyle("#sidebar #slide-nav img { max-width:100%!important; }");
GM_addStyle("#content > div { -moz-box-sizing: border-box; box-sizing: border-box; } ");
GM_addStyle("#logo { margin:0!important; } #logo img { max-height: 9em!important; height:auto!important; width:100%!important; } #sidebar, #main { display: inline-block!important;}");
GM_addStyle("#sidebar { width:30%!important; } #main { width: 69.5%; }");

target_ids = ['dsq1', 'sidebar', 'main'];
observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if(target_ids.indexOf(mutation.target.id)<0)
			return;
		target_ids.splice(target_ids.indexOf(mutation.target.id), 1);
		if(target_ids.length==0)
			observer.disconnect();
		mutation.target.style.height = "100%";
	});   
});
observer.observe(document.documentElement, { attributes: true, subtree: true } );

$("<link href='http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css' rel='stylesheet' type='text/css'/>").appendTo(document.head);

$(document).ready(function(){
	main = document.getElementById('main');
	Content = document.getElementById('content');
	sidebar = document.getElementById('sidebar');
	wrapper = document.getElementById('wrapper');
	
	$main = $(main);
	$content = $(Content);
	$sidebar = $(sidebar);
	
	$('#header, #slides').prependTo(Content);
	
	
	$('#content img, #content iframe, #slides img').css({height: 'auto'});
	$('#slide-nav').prependTo($sidebar);
	GM_addStyle("#sidebar #slide-nav { width: 100%!important; height: auto!important;} #sidebar #slide-nav a { display: inline-block!important; background-color: black!important; width: auto!important; height: auto!important; float: right;} #sidebar #slide-nav a img {position: relative;} #sidebar #slide-nav span.info {top:50%; left:0;} #slide-nav {background-color: transparent!important}");

	(function(){
		if(typeof unsafeWindow.jQuery !== 'undefined') {
			unsafeWindow.jQuery = $;
			if(typeof unsafeWindow.jQuery.fn.resizable !== 'undefined'){
				GM_addStyle("#main {vertical-align: top;}");
				$sidebar.resizable({ handles: "w",
					start: function(){
						wmain0 = $("#main").width();
					},
					resize: function( event, ui ) {
						var dx = ui.size.width - ui.originalSize.width;
						$main.width( wmain0 - dx );
				} });
				$content.resizable({ handles: "e, w",
					start: function(){
						wmain0 = $main.width();
					},
					resize: function( event, ui ) {
						var dx = 2 * (ui.size.width - ui.originalSize.width);
						$content.width(ui.originalSize.width + dx);
						// Content.style.width = ui.originalSize.width + dx + 'px';
						$main.width(wmain0 + dx);
						// main.style.width =  wmain0 + dx + 'px';
				} } );
				return;
			}
			else 
				jqui = typeof jqui === 'undefined' ? $("<script src='http://code.jquery.com/ui/1.10.2/jquery-ui.js'></script>").appendTo(document.head) : true;
		}
		window.setTimeout(arguments.callee, 200);
	})();

	initControls();
});
function szMain(){
	var mx = main.offsetWidth - $main.width();
	console.log("mx = " + mx);
	// main.style.width = Content.offsetWidth - sidebar.offsetWidth - mx + 'px';
	$main.width(Content.offsetWidth - sidebar.offsetWidth - mx);
}

$.fn.Hide = function(){
	this.each(function(){
		this.style.display = 'none';
	});
	return this;
}

function initControls(){
	GM_addStyle("#btnBox { opacity: 0.5; position:absolute; right: 1em; font: 600 1em Helvetica; color: #AAAAAA; z-index:800;} #btnBox span {margin-left: 0.5em;} #btnBox span:hover { cursor: pointer; color: #666666;}");
	GM_addStyle("#btnBox:hover {opacity:1;}");
	var oC = $("#content").offset().top;
	var h3 = $("#woo_blogauthorinfo-2 h3");
	var oM = h3.offset().top - 0.3 * h3.height();
	$("<div id='btnBox'></div>").css('top', oM - oC).appendTo('#content');
	
	$("<span id='openBtn'>+</span>").appendTo("#btnBox").Hide().click(function(){
		sidebar.style.display = 'inline-block';
		closeBtn.style.display = 'inline';
		this.style.display = 'none';
		var cw = Content.offsetWidth + sidebar.offsetWidth;
		if(cw >= document.body.offsetWidth)
			return max();
		$content.width(cw);
		// Content.style.width = cw + 'px';
		szMain();
	});
	
	$("<span id='minBtn'>&#x25F1;</span>").Hide().appendTo("#btnBox").click(function(){
		$content.width(lastw);
		// Content.style.width = lastw + 'px';
		szMain();
		this.style.display = 'none';
		maxBtn.style.display = 'inline';
	});	
	
	$("<span id='maxBtn'>&#x25A2;</span>").appendTo("#btnBox").click(max);
	
	function max(){
		lastw = Content.offsetWidth;
		Content.style.width = wrapper.offsetWidth + 'px';
		szMain();
		minBtn.style.display = 'inline';
		maxBtn.style.display = 'none';
	}
	
	$("<span id='closeBtn'>x</div>").css('font-size', '1.2em').appendTo("#btnBox").click(function(){
		Content.style.width = Content.offsetWidth - sidebar.offsetWidth + 'px';
		sidebar.style.display = minBtn.style.display = this.style.display = 'none';
		openBtn.style.display = maxBtn.style.display = 'inline';
	});
	
	openBtn = document.getElementById('openBtn');
	minBtn = document.getElementById('minBtn');
	maxBtn = document.getElementById('maxBtn');
	closeBtn = document.getElementById('closeBtn');
}

