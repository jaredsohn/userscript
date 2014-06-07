// ==UserScript==
// @name           dgg
// @namespace      digg.com
// @description    Blacklist filter for digg
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// @exclude        http://digg.com/users/*/news*
// @exclude        http://digg.com/users/*/videos*
// @exclude        http://digg.com/users/*/podcasts*
// @exclude        http://digg.com/users/*/friends*
// @author         listrophy
// ==/UserScript==

var jsVersion = 30, cssVersion = 30;
var FILTER = 0, PREFERENCE = 1;
var status = FILTER;
var DEFAULT_BLACKLIST = 'iphone\nron paul';
var blacklist = GM_getValue('dgg_blacklist',DEFAULT_BLACKLIST).split('\n');
var $;

//functions

function filterOnKeywords(node, keywords, nodeid){
	var xpath  = "div[@class='news-body']/h3/a";
	var title =
		document.evaluate ( xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
		null ).singleNodeValue.textContent;
	xpath = "div[@class='news-body']/p[not(@class='news-submitted')]";
	var text =
		document.evaluate ( xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
		null ).singleNodeValue.textContent;
	var found = new Array();
	
	for(var i = 0;i<keywords.length;i++){

		if(title.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1 ||
				text.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1){
			
			found.push(keywords[i]);
		}
	}
	if(found.length > 0){
		var empty = document.createElement("div");
		empty.className = "diggfiltered";
		empty.title = title;
		empty.textContent = "blocked: " + found.join(",");
		empty.id = "empty-" + i;
		empty.style.cursor = "pointer";
		
		node.parentNode.insertBefore(empty,node);
		node.className += " dggHidden news-buried";

		var jnode = $(node);
		var jempty = $('#empty-'+i);
		GM_log('hi');
		jempty.click(function(){
			jnode.slideToggle('fast', function(){
				jnode.toggleClass('dggHidden');
				jempty.toggleClass('dggHidden');
				jnode.find(".probdrop").css('display','block');
			});
		});


	}
	return true;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function go(){
	if(document.location.pathname.match('/users/') == '/users/') status = PREFERENCE;


	if(status == PREFERENCE){
		var bl = GM_getValue('dgg_blacklist',DEFAULT_BLACKLIST);
		var menuitem = document.createElement("a");
		menuitem.className = "tool";
		menuitem.textContent = "Blocked Keywords";
		menuitem.href = "#";
		menuitem.id = 'dgg_bl_link';
		$('.sub-menu').append(menuitem);

		
		var dialog = 
			$('<div id="dgg_bl_dialog"></div>').appendTo('body');
		var ddialog = $('<div id="dgg_bl_ddialog"></div>')
			.prepend("<h2>Blocked Keywords</h2>");
		ddialog.append("<p>Enter the keywords (or phrases) you'd like to block, one \
				line per keyword/keyphrase.</p>");
		ddialog.append("<textarea id='dgg_bl'></textarea>");
		ddialog.append('<input type="button" value="cancel" id="dgg_bl_cancel"/>');
		ddialog.append('<input type="button" value="save" id="dgg_bl_submit"/>');
		ddialog.appendTo(dialog);
		dialog.hide();
		
		dialog.css({
			position: 'absolute',
			left:     '0px',
			top:      '0px',
			width:    '100%',
			height: "100%",
			zIndex: "9999",
			textAlign: "center",
			backgroundColor: "#fff"
		}).css('-moz-opacity','0.85');
		
		ddialog.css({
			width: "300px",
			margin: "100px auto",
			backgroundColor: "#fff",
			border: "1px solid #000",
			padding: "15px",
			textAlign: "center",
			color: "#393733 !important"
		}).css('-moz-opacity','1');

		$('#dgg_bl_link').click(function(){
			$("#dgg_bl").val(GM_getValue('dgg_blacklist',DEFAULT_BLACKLIST));
			dialog.show();
		});
		$('#dgg_bl_submit').click(function(){
			var field = $('#dgg_bl');
			GM_setValue('dgg_blacklist',field.val());
			GM_log('blacklist set to: ' + field.val());
			dialog.hide();
		});
		$('#dgg_bl_cancel').click(function(){dialog.hide();});
		
	}else{
		var xpath  = "//div[@class='main']/div[@class='news-summary']";
		var result = document.evaluate( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		for ( var i = 0; i < result.snapshotLength; i++ )
		{
			filterOnKeywords(result.snapshotItem(i), blacklist, i);
		}
	}
}

function GM_wait(){
	if(typeof unsafeWindow.jQuery == 'undefined'){window.setTimeout(GM_wait,100);}
	else{ $ = unsafeWindow.jQuery; startItUp();}
}

function startItUp(){
	$(function(){
		addGlobalStyle(".diggfiltered { \
			border-top: 1px solid #ccc; \
			border-left: 1px solid #ccc; \
			border-right: 1px solid #ccc; \
			overflow: hidden; \
			background-color:#eee;\
			}");
		addGlobalStyle(".dggHidden {\
			display: none; \
			border-bottom: 1px solid #ccc !important; \
			border-left: 1px solid #ccc !important; \
			border-right: 1px solid #ccc !important; \
			padding-left: 2px !important; \
			padding-right: 2px !important; \
			}");
		go();
	});
}

GM_wait();