// ==UserScript==
// @name			Google Book Downloader
// @namespace		http://userscripts.org/scripts/show/24984
// @description		Download any book from books.google.com
// @include			http://books.google.*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version			2.0.1
// ==/UserScript==

Array.prototype.inArray = function (value,begin) {
	var begin = (begin)?begin:0;
	for (var i=begin; i < this.length; i++) {
		if (this[i] === value) {
			return i;
		}
	}
	return -1;
};

var GBD = {
	// script version
	version : '2.0.1',
	
	// page width
	pageWidth : 800,
	
	// page source
	pageSource : '',
	
	// link prefix
	prefix : '',
	
	PIDs : new Array(),
	viewedPIDs : new Array(),
	totalPIDs : 0,
	
	currentIndex : -1,
	firstIndex : -1,
	
	stop : false,
	
	// init script
	init : function() {
		this.checkForUpdate();
		this.addDownloadButton();
	},
	
	addStyle : function(styles) {
		GM_addStyle(styles.join("\r\n"));
	},
	
	addDownloadButton : function() {
		this.addStyle([
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
		this.stats();
		
		// clear side bar content
		$('#menu_td').html('<div id="gbdPanel"></div>');
		
		this.addStyle([
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
		]);
		
		$('#gbdPanel').html('<h1 id="gbdHeader">Google Book Downloader '+ this.version +'</h1>' +
							'<div id="gbdResult">Getting page list, please wait ...</div>' +
							'<div id="gbdFooter"><a href="http://book.huhiho.com">book.huhiho.com - redphoenix89</a></div>'
							);
		
		// get page source
		var scriptNodes = document.getElementsByTagName('SCRIPT');
		this.pageSource = scriptNodes.item(scriptNodes.length-1).innerHTML;
		
		// get link prefix
		this.getPrefix();
		
		this.getPIDs();
	},
	
	getPrefix : function() {
		var regExp = new RegExp('"prefix":"([^"]+)"');
		var match = regExp.exec(this.pageSource);
		
		this.prefix = match[1].replace(/\\u0026/g,'&');

	},
	
	getPIDs : function() {
		var regExp = new RegExp('"pid":"([^"]+)","src"');
	
		var match = regExp.exec(this.pageSource);
		var firstPID = match[1];
		
		var totalPIDs = 0;
		
		var pUrl = this.prefix +'&pg='+ firstPID +'&sig=&jscmd=click3';
		
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
				
				//this.PIDs = PIDs.unique();
				GBD.totalPIDs = GBD.PIDs.length;
				
				GBD.showPageList();
			},
		});
	},
	
	showPageList : function() {
		var html =	'Download from page : <select id="gbdPageList">';
		for (var i=0;i<this.totalPIDs;i++) {
			html += '<option value="'+ i +'">'+ this.PIDs[i] +'</option>';
		}
		html += '</select>';
		html += '<center><input type="button" id="gbdDownload" value="Download" /></center>';
		
		$('#gbdResult').html(html);
		
		$('#gbdDownload').click(function() {
			GBD.startDownload();
		});
		//$('gbdDownload').addEventListener('click', function() { startDownload(); }, false);
	},
	
	startDownload : function() {
		this.firstIndex = this.currentIndex = $('#gbdPageList')[0].selectedIndex;
		if (this.firstIndex != 0) {
			this.firstIndex -= 1;
		}
		
		$('#gbdResult').html('<div id="gbdResultList"></div><div id="gbdStatus"></div>');
		
		this.download();
	},
	
	download : function() {
		if (!GBD.totalPIDs || GBD.stop || GBD.currentIndex >= GBD.totalPIDs) {
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
					alert(src);
					
					
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
		
		$('<div><a target="_blank" href="'+ src + '&w=' + this.pageWidth + '">' + pid + '.png</a></div>').appendTo('#gbdResultList');
		
		$('#gbdStatus').html('Downloaded <b>'+ this.viewedPIDs.length +'/'+ (this.totalPIDs - this.firstIndex) +'</b> pages');
	},
	
	done : function() {
		alert('Done');
		$('#gbdStatus').html('<b>Done. Total pages : '+ this.viewedPIDs.length +'</b>');
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


GBD.init();