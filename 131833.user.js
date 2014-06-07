// ==UserScript==
// @name			Google Book Downloader
// @namespace		http://userscripts.org/scripts/show/24984
// @description		Download any book from books.google.com (Fix page width in the code of redphx)
// @include			http://books.google.*
// @include			http://www.google.com/books/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version			2.3
// ==/UserScript==

var debug = 0;
var conlose;

Array.prototype.inArray = function (value,begin) {
	var begin = (begin)?begin:0;
	for (var i=begin; i < this.length; i++) {
		if (this[i] === value) {
			return i;
		}
	}
	return -1;
};

$.fn.replace = function(o) { return this.after(o).remove(); }; 


var log = function(obj) {
	if (debug)
	{
		if (!console)
		{
			console = unsafeWindow.console;
		}
		
		console.log(obj);
	}
}

var GBD = {
	// script version
	version	: '2.3',
	
	// page width
	pageWidth : 1200,
	
	// page source
	pageSource : null,
	
	// link prefix
	prefix : '',
	
	PIDs		: new Array(),
	viewedPIDs	: new Array(),
	totalPIDs	: 0,
	
	currentIndex	: -1,
	firstIndex		: -1,
	lastIndex		: -1,
	
	stop : false,
	
	icons : {
		downloadPage :	'data:image/png;base64,'+
						'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEnUlEQVRYw+2XS4wUVRSGv3O7uumenmHQYRRBBSM+MZIoEqNGcGFCIpqAMT5WxgfGuBET0BVLg5iIMdGFji50Y1ywEBfGBQk+I4FoIgmC'+
						'iOgojI7DMPY8quree46L6kaYYWQaTNh4k1NVuXVT57//+c+5p8TMOJ/DcZ7H/wCSyRNPvfT2CmALsPw/+P4EsPbNF574uDUxRXNmdoqt29x39Lsf+y1GNQvhnG3d5r7xdZv7Vk3n73QhmJe7Wby9cy8A'+
						'j/XtYNO2rzEgVTvFJqIy5iOjuWckzRgen2CoMcYfIw0GhkcAePS+lTVg28kgzqiBkbEMmkzduvhiblzYO2WNmaFqmClRFVVF40nPqgAMNIyn195dA7bNGIBIYcWzTFk0E+cxFgCG04xxSwBqMwZgJy4g'+
						'BnIWztUKABqULGh7aVjsvnhlIi0sbTlXtRMuRNpIQwA1QylQP7niuhPztZKDEjQvMxqKov9S7k8LoLXTR974mEYaWdTbhRNBHDgczk0KC6BaODMtNnB4sEFXtcSd112GtQ1AjajGHddeRuoDF3V1NIUp'+
						'yIkQSRElLSCYFUCK/IYrLuqmWk6Iapi2CSCo4aMiIkRVgupUACJIbAl2KoCoio+KmRHaBRBVyYOy8d6bz6kOf/DlQ4xnR+gfjFy7xPPK9lt+AK46MwPR8DEC0Gg0cK79M0tVSf1R1tz2Dnn8i5G/Gmzf'+
						'vaF3Rgx4VVIfT5lL05ShoaEzOq7X68yZM6cpZhhofM6x9Buy0e42NBAj2SQA1WqVBQsWtM2EiEMQpB0N+GBk3p8zAwULimFMV42mYUDJw3/BgBVVEUVKbTCQByPP9ZwYyMMYSalGsBSNHlwAKG39aHlp'+
						'/epd8YwizGP7DGS+wY59zzOy/xCVpINLe5eRhkGCesxGuHze0s7+378LWz9a3uqWFrrpSrE1j1NVndLFTGeJqxI1Z9niZ1i17GXq3RWy8AdqnvHwJxf0dPDgitdYumgNwLfAsUQmiWPd5r6isgHZ7u1k'+
						'v/9M0tUz46jforfz2cG3yGwtwU0Q4hjBArmmOD/GnoMfcKD/00ERHli/elc8bQg6axU6ahWkXiO5EEodXTMG0MMl3JyW2PPT+1y/+H5yGUZtHJEKlnbz/eGdeSmRtetX7/qtpQEBpF6vi3OuBHaky4X5'+
						'dy25HBs7wKyJQVwhoBmPK5nHaLiJ4eP9dM9ZSBY95dDB8ZEhMDZuenjfV8+NigMs6ezsdGaWiEjFzCrHjv664ZMv7FUR13t43lyg5yxPgpXUx7Zzw1UV6rOW8MvwXvoH9r734uMH3hWRamdnpx8dHY1S'+
						'q9WScrmcxBgrzrlZQEVEEjNzLXb45/g/WTAyTYfVErabO79cf3bLNe9ef+Wqq3fv+3D/6xsOPXj8Tz8EpGaWmVlWCiFYtVo1731MksQDedMywJuZF5HWPYhIAGLTQtN8kTymImJFU2XSOJ6rJLa/Pv/I'+
						'Pd9+Prx1946hA8B4qVTKnXMK2ORdCCCzZ8+WEIJUKhVRVWmmopgZ5XJZputwvPfinEOK1DIzwzlnMUZzzpn33gBLksQAS9PU5Hz/nv8NUdxh/r5R354AAAAASUVORK5CYII='
	},
	
	// init script
	init : function() {
		GBD.checkForUpdate();
		
		if ($('#viewport').length)
		{
			GBD.addStyle([
				'.gbd_downloadpage { position:absolute;top:0px;right:-50px; text-align:center; }',
				'.gbd_downloadpage img { border:none }',
				'.gbd_downloadpage p { padding:0px;margin:0px;font-weight:bold }'
			]);
			
			
			GBD.startListerning();
			GBD.addDownloadButton();
		}
	},

	
	startListerning : function() {
		
		var pagesNode = $('#viewport > div > div > div');
		
		if (pagesNode.length) {
			var childs = $(pagesNode).children('div');
			var count = childs.length;
			
			pagesNode.bind('DOMAttrModified', GBD.processImage);
			
			for (i=0;i<count;i++) {
				GBD.processPage(childs.get(i));
			}
		}
		
	},
	
	/*
	stopListerning : function() {
		$('#viewport > div > div > div').unbind('DOMNodeInserted');
	},
	*/
	
	processImage : function(e) {
		if (e.attrName != "src")
		{
			return false;
		}
		
		var parentDOM = $(e.originalTarget).parent().parent().parent().parent();
		
		GBD.processPage(parentDOM[0]);
		//var imageDOM = 
	},
	
	processPage : function(e) {
		var newDOM = (e instanceof Object) ? this : e;

		var divNode = $(newDOM).children("div:last");
		var target = divNode.find(".pageImageDisplay");
		
		if (!target.length)
		{
			return;
		}
		else if ($(target).find("div.gbd_empty").length)
		{
			return;
		}
		
		var imgNode = $("img:eq(0)", target);
		
		if (imgNode.length) {
			var src = imgNode.attr('src');
			
			if (src)
			{
				GBD.addDownloadPage(target, src);
			}
		}
			
	},
	
	addDownloadPage : function(target, src)
	{
		src += "&w=" + GBD.pageWidth;
		
		var regExp = new RegExp('&pg=([^&]+)');
		var match = regExp.exec(src);
		
		var pageName = match[1];
		
		$(target).append($('<div class="gbd_empty" />'));
		
		var parent = $(target).parent();
		parent.css('margin-right', '100px');
		
		$(parent).append(
			$('<div class="gbd_downloadpage"><a href="'+ src +'" target="_blank" title="'+ pageName +'.png"><img src="'+ GBD.icons.downloadPage +'" /><p>'+ pageName +'</p></a></div>')
		);
		
	},
	
	addStyle : function(styles) {
		GM_addStyle(styles.join("\r\n"));
	},
	
	addDownloadButton : function() {
		GBD.addStyle([
			'#gbdButtonDiv { text-align:center; padding:10px; margin-bottom:10px; background-color:#EAF4FB; }',
			'#gbdButton { background-color:#FAFAFA; border:1px solid #E5E5E5; border-bottom-width:2px; color:#707070; padding:4px; font-weight:bold; }',
			'#gbdButton:hover { color:#FF9300; cursor:pointer }',
		]);
		
		$('<div id="gbdButtonDiv"><input type="button" value="Download this book" id="gbdButton" /></div>').insertBefore('#menu_container');
		$('#gbdButton').click(function() {
			GBD.prepareDownload();
		});
	},
	
	prepareDownload : function() {
		GBD.stats();
		
		// clear side bar content
		$('#menu_td').html('<div id="gbdPanel"></div>');
		
		GBD.addStyle([
			'#gbdPanel { padding:10px; font-family:Arial; font-size:12px; background-color:#FAFAFA; color:#707070; overflow-y:auto; height:500px }',
			'#gbdHeader { color:#FF9300; font-size:14px; padding:0px; margin-bottom:10px; text-align:center; }',
			
			'#gbdResult { padding:10px; background-color:#FFFFFF; border:1px solid #E5E5E5; margin-bottom:20px }',
			'#gbdResultList div { margin-bottom:4px; padding:4px; background-color:#FAFAFA; border:1px solid #E5E5E5; border-bottom-width:2px; margin:5px; }',
			'#gbdResultList div a { color:#707070; font-weight:bold; text-decoration:none }',
			'#gbdResultList div a:hover { color:#FF9300; cursor:pointer }',
			
			'#gbdDownload { background-color:#FAFAFA; border:1px solid #E5E5E5; border-bottom-width:2px; color:#707070; padding:4px; font-weight:bold; margin:10px }',
			'#gbdDownload:hover { color:#FF9300; cursor:pointer }',
			
			'#gbdFooter { text-align:center; font-size:10px; font-weight:bold; padding-bottom:40px }',
			'#gbdFooter a { color:#707070; text-decoration:none; }',
			'#gbdFooter a:hover { color:#FF9300}',
			
			'#gbdDonate { text-align:center; padding:0px 0px 5px}',
		]);
		
		$('#gbdPanel').html('<h1 id="gbdHeader">Google Book Downloader '+ GBD.version +'</h1>' +
							'<div id="gbdDonate"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=redphoenix89%40yahoo%2ecom&amp;lc=VN&amp;currency_code=USD&amp;bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest"><img border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_LG.gif"/></a></div>' +
							'<div id="gbdResult">Getting page list, please wait ...</div>' +
							'<div id="gbdFooter"><a href="http://book.huhiho.com">book.huhiho.com - redphoenix89</a></div>'
							);
		
		// get page source
		var scriptNodes = document.getElementsByTagName('script');
		
		for (var i=0; i < scriptNodes.length; i++)
		{
			if (scriptNodes.item(i).innerHTML.indexOf('_OC_Run({') > -1)
			{
				GBD.pageSource = scriptNodes.item(i).innerHTML;
				break;
			}
		}
		
		if (!GBD.pageSource)
		{
			alert('Error while getting pages. Please refresh and try again');
			return;
		}
		
		//alert(GBD.pageSource);
		
		// get link prefix
		GBD.getPrefix();
		
		GBD.getPIDs();
	},
	
	getPrefix : function() {
		var regExp = new RegExp('"prefix":"([^"]+)"');
		var match = regExp.exec(GBD.pageSource);
		
		GBD.prefix = match[1].replace(/\\u0026/g,'&');

	},
	
	getPIDs : function() {
		var regExp = new RegExp('"pid":"([^"]+)","src"');
	
		var match = regExp.exec(GBD.pageSource);
		
		
		
		var firstPID = match[1];
		
		var totalPIDs = 0;
		
		var pUrl = GBD.prefix +'&pg='+ firstPID +'&sig=&jscmd=click3';
		
		GM_xmlhttpRequest({
			method: "GET",
			url: pUrl,
			onload: function(results) {
				var data = results.responseText;
				var regExp = new RegExp('{"pid":"([^"]+)"}','g');
				var match;
				
		
				while (match = regExp.exec(data)) {
					GBD.PIDs.push(match[1]);
				}
				
				//GBD.PIDs = PIDs.unique();
				GBD.totalPIDs = GBD.PIDs.length;
				
				GBD.showPageList();
			},
		});
	},
	
	showPageList : function() {
		var options = '';
		for (var i=0;i<GBD.totalPIDs;i++) {
			options += '<option value="'+ i +'">'+ GBD.PIDs[i] +'</option>';
		}
		
		var html =		'From page :<br /><select id="gbdFromPageList">' + options + '</select>'
					+	'<br />'
					+	'To page :<br /><select id="gbdToPageList">' + options + '</select>';
		
		html += '<center><input type="button" id="gbdDownload" value="Get Download Links" /></center>';
		
		$('#gbdResult').html(html);
		
		$('#gbdToPageList option:last').attr("selected","selected");
		
		
		$('#gbdDownload').click(function() {
			GBD.startDownload();
		});
	},
	
	startDownload : function() {
		GBD.firstIndex	= GBD.currentIndex = $('#gbdFromPageList')[0].selectedIndex;
		GBD.lastIndex	= $('#gbdToPageList')[0].selectedIndex;
		
		if (GBD.lastIndex < GBD.firstIndex)
		{
			alert('ERROR');
			return;
		}
		
		if (GBD.firstIndex != 0) {
			GBD.firstIndex -= 1;
		}
		
		if (GBD.lastIndex != 0) {
			GBD.lastIndex -= 1;
		}
		
		$('#gbdResult').html('<div id="gbdResultList"></div><div id="gbdStatus"></div>');
		
		GBD.download();
	},
	
	download : function() {
		if (!GBD.totalPIDs || GBD.stop || GBD.currentIndex >= GBD.totalPIDs || GBD.currentIndex > GBD.lastIndex) {
			GBD.done();
			return;
		}
		
		var pid = GBD.PIDs[GBD.currentIndex++];
		if (GBD.viewedPIDs.inArray(pid) != -1) {
			GBD.download();
			return;
		}
		
		var sig = '';
		var pUrl = GBD.prefix +'&pg='+ pid +'&sig='+ sig +'&jscmd=click3';
		
		GM_xmlhttpRequest({
			method: "GET",
			url: pUrl,
			onload: function(results) {
				var data = results.responseText;

				var regExp = new RegExp('"pid":"([^"]+)","src":"([^"]+)"','g');
				var match;

				while (match = regExp.exec(data)) {
					var pid = match[1];
					var src = match[2];
					
					if (GBD.viewedPIDs.inArray(pid) == -1 && GBD.PIDs.inArray(pid) != -1) {
						
						GBD.viewedPIDs.push(pid);
						GBD.showLink(pid,src);
						if (GBD.viewedPIDs.length == GBD.totalPIDs) {
							stop = true;
							break;
						}
					}
				}
				// wait ? seconds
				window.setTimeout(GBD.download,1200);
			},
		});
	},
	
	showLink : function(pid, src) {
		src = src.replace(/\\u0026/g,'&');
		src = src + '&w=' + GBD.pageWidth + '&gbd=1';
		
		$('<div><a title="'+ pid +'.png" target="_blank" href="'+ src + '">' + pid + '.png</a></div>').appendTo('#gbdResultList');
		
		$('#gbdStatus').html('Getting <b>'+ GBD.viewedPIDs.length +'/'+ (GBD.lastIndex - GBD.firstIndex) +'</b> pages');
	},
	
	done : function() {
		alert('Done');
		$('#gbdStatus').html('<b>Done. Total pages : '+ GBD.viewedPIDs.length +'</b>');
	},
	
	stats : function() {
		var ifr = document.createElement('iframe');
		ifr.src = 'http://book.huhiho.com/stats.html';
		ifr.width = 0;
		ifr.height = 0;
		document.body.appendChild(ifr);
	},
	
	checkForUpdate : function() {
		var date = new Date();
		var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
		var lastCheck = GM_getValue('lastCheck');

		if (!lastCheck || lastCheck != today) {
			GM_xmlhttpRequest({
				method: "GET",
				url: 'http://book.huhiho.com/version.txt?t='+today,
				onload: function(results) {
					var version = results.responseText;
					if (version.length && version != GBD.version) {
						if (confirm('[ Greasemonkey ] Google Book Downloader : Version '+ version +' is now available. Update ?')) {
							GM_openInTab('http://book.huhiho.com');
						}
					}
				},
			});
		}
		GM_setValue('lastCheck',today);
	}
}

$(function(){
	GBD.init();
});