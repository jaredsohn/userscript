// ==UserScript==
// @name           Douban/UESTC Library Mashup
// @namespace      http://tremblefrog.org/
// @description    A mashup plugin inquiring library reservation of corresponding book entry on doublan.com
// @include        http://www.douban.com/subject/*
// @include        http://douban.com/subject/*
// @include        http://douban.com/book/series/*
// @include        http://www.douban.com/book/series/*
// @include        http://douban.com/book/works/*
// @include        http://www.douban.com/book/works/*
// @require http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version 1.2.1
/* @reason
	Added a new GreaseMonkey Updater, thanks to NullPointer :)
@end*/
// ==/UserScript==


/* Auto update, thanks NullPointer :p */
var libdbScript = {
	name: "Douban/UESTC Library Mashup", 
	id: "55048", 
	version:"1.2.1" 
}
var gm_updater = new Updater(libdbScript);
gm_updater.setHoursToCheck(24);	// check for updates per day
gm_updater.check();

if (unsafeWindow.$)
	var $ = unsafeWindow.$;
	

/* Main Program Below */

new LibraryDBMashup();	// run plugin

function LibraryDBMashup(){
	this.pt = /\/subject\/([0-9]+)/;
	this.pt_col = /\/book\/(works|series)\/[0-9]+/;
	
	unsafeWindow.Douban.libdb_js_pool = Object();
	
	this.init_loader = function(entry_id){
		/*	Initialize the floating layer */
		var book_title = $("h1").eq(0).text();
					
		$("<div class='gray_ad'><h2>查询图书馆的馆藏信息? &nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</h2><ul class='bs'><li style='border:none;'><a href='javascript:void(0);' onclick='Douban.libdb_query_for_book_reservation(" + entry_id + ");'>&middot;&middot; 查看本图书的馆藏状态</a></li><li style='border:none;'><a target='_blank' href='http://222.197.164.247/search~S1*chx/?searchtype=t&searcharg=" + encodeURI(book_title) + "&searchscope=1&sortdropdown=-&SORT=D&extended=0'>&middot;&middot; 在图书馆搜索 &lt;" + book_title + "&gt;</a></li></ul</div>").prependTo("div.aside");
		
		/* assign a callback in user's interface */
		unsafeWindow.Douban.libdb_query_for_book_reservation = function(entry_id)
		{
			var js = document.createElement("script");
			js.src="http://tremblefrog.org/libdb/query.php?db_id=" + entry_id;
			js.type="text/javascript"; 
			document.body.appendChild(js);
		};
	}
	
	this.inquiry_collection = function(){
		var collection_count = $("a.pl2").size();
		var _this = this;
		
		if (collection_count > 0){
			var books = [];
			$.each($("a.pl2"), function(idx, link){
				var book_href = link.href;
	
				if (book_href.search(_this.pt)){
					var entry_id = parseInt(RegExp.$1);
					
					var book_info = document.createElement("div");
					var prop_class = document.createAttribute("class");
					prop_class.nodeValue = "gray_ad";
					book_info.setAttributeNode(prop_class);	/* assign a douban style */
					book_info.id = 'libdb_book_info_' + entry_id;
					
					book_info.innerHTML = '请稍候, 正在查询图书馆藏信息...';
					
					link.parentNode.appendChild(book_info);
					books.push(entry_id);
				}
				
			}
			);
			
			for(entry in books){
				this.request("http://tremblefrog.org/libdb/query.php?db_id=" + books[entry], books[entry]);
			}
		}
	}
	
	this.extract_book_info = function(html){
		if (html.indexOf("<table") == -1){
			return [0, 0];
		}
		else{
			var reserv_count = html.split("<tr").length - 2;
			var reserv_avail_count = 0;
			var _pos = 0;
			
			while(true){
				_pos = html.indexOf("可借", _pos + 1);
				if (_pos == -1)
					break;
				
				reserv_avail_count++;
			}
			
			return [reserv_count, reserv_avail_count];
		}
	}
	
	this.request = function(url, entry_id){
		var _this = this;
		
		GM_xmlhttpRequest({
	        method: 'GET',
	        url: url,
	        onreadystatechange: function(resp){
	        	if(resp.status == 200 && resp.readyState == 4){
	        		unsafeWindow.Douban.libdb_js_pool['js_' + entry_id] = resp.responseText;
	        		var book_info = _this.extract_book_info(resp.responseText);
	        		
	        		$("#libdb_book_info_" + entry_id).html("&middot;&middot;&middot; 馆藏信息: 共有" + book_info[0] + "本, 可借" + book_info[1] + "本. / <a href='javascript:void(0);' onclick='eval(Douban.libdb_js_pool[\"js_" + entry_id + "\"]);'>查看详细信息</a>");
	        	}
	        }
	    });
	}
	
	if (this.pt.test(unsafeWindow.location.href))
	{
		
		if(unsafeWindow.location.href.search(this.pt))
		{
			var entry_id = parseInt(RegExp.$1);
			
			/* Check if we are on the correct page to run the script */
			var nav_now = unsafeWindow.$("a.now");
			if (nav_now.size() == 1){
				if (nav_now.eq(0).attr("href") != "/book/"){
					return;
				}
			}
			
			this.init_loader(entry_id);
		}
	}
	else if(this.pt_col.test(unsafeWindow.location.href)){
		
		unsafeWindow.location.href.search(this.pt_col);
		var page_type = RegExp.$1;
		if (page_type == 'works'){
			/* Different versions of a same book */
			var book_title = $.trim($("a.pl2").eq(0).text());
			$("<div class='gray_ad'><h2>查询图书馆的馆藏信息? &nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</h2><ul class='bs'><li style='border:none;'><a target='_blank' href='http://222.197.164.247/search~S1*chx/?searchtype=t&searcharg=" + encodeURI(book_title) + "&searchscope=1&sortdropdown=-&SORT=D&extended=0'>&middot;&middot; 在图书馆搜索 &lt;" + book_title + "&gt;</a></li></ul</div>").prependTo("div.aside");
			
		}
		else if (page_type == 'series'){
			/* A series of books */
			var series_title = document.title;
			
			var book_list = [];
			var book_title = "";
			var book_uri = "";
			$.each($("a.pl2"), function(idx, link){
				book_title = $.trim(link.firstChild.nodeValue);
				book_uri = "<li style='border:none;'><a target='_blank' href='http://222.197.164.247/search~S1*chx/?searchtype=t&searcharg=" + encodeURI(book_title) + "&searchscope=1&sortdropdown=-&SORT=D&extended=0'>&middot;&middot;  &lt;" + book_title + "&gt;</a></li>";
				book_list.push(book_uri);
				
				}
			);
			
			$("<div class='gray_ad'><h2>图书馆搜索以下图书 &nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</h2><h3>" + series_title + "</h3><ul class='bs'>" + book_list.join("") + "</ul</div>").prependTo("div.aside");
		}
		
		this.inquiry_collection();
		
	}
	else{
		return;
	}
} 
