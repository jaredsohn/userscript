// ==UserScript==
// @name           HaiNeiDouZi
// @namespace      longwosion
// @include        http://hainei.com/movie?r*
// @include        http://www.hainei.com/movie?*
// @include        http://hainei.com/book?r*
// @include        http://www.hainei.com/book?*
// ==/UserScript==

(function(){

	/**
	 * 增加自定义的样式表
	 * @param {String} css 样式表字符串
	 */
	function addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	};

	addStyle(
		'.mynew { background:#C9DFF4;margin-bottom:10px;border-top:1px solid #333;padding-left:20px;line-height:200%} ' + 
		'#movie h2 span#douban-tip,#douban-tip {position:absolute; top:-1000px; left:-100px; background-color:#fff; color:#000; padding:5px; border:4px solid #999; line-height:1;font-size:12px;font-weight:normal;} ' +
		'.p-douban{margin-left:1em} ' +
		'#book-single .sect-content { padding: 5px 0 10px } ' +
		'#go-douban, #douban, #go-verycd {font-size:12px;font-weight:normal;} ' +
		'.close {display:none}' + 
        '.douban-info {float:right; width:290px;} ' + 
        '.douban-image {float:left;} ' +
        '#douban-tip {z-index:10}' +
		'.switcher{padding:0px 5px;font-size:12px;font-weight:normal;float:right;z-index:20;position:relative;top:-24px;}'
	);
	
	var doubanBase = 'http://www.douban.com/';
	var douQuery = "";
	var douQueryMovie = doubanBase + 'subject_search?cat=1002&search_text=';
	var douQueryBook = doubanBase + 'subject_search?cat=1001&search_text=';
	var vcQuery = "http://www.verycd.com/search/folders/";
	var pageType = '';
	
	var RE = {
		//QUERY : "<a href=\"(/subject/[0-9]*/)\">.*<span style=\"font-size:12px;\">(.+)</span></a></div><p", 
		//QUERY : "<a href=\"(/subject/[0-9]*/).*\">(.+)</a></div><p class=\"pl\"", 
		QUERY : "<div class=\"pl2\"><a href=\"(/subject/[0-9]*/)\".*>(.+)</a></div>",
		TITLE :	"<h3><a title=\"(.*)\" href=\"(/review/[0-9]*/)\" style=\"float:left\"",
		USER  :	"<a href=\"(/people/.*/)\" title=\".*\"><img class=\"pil\" src=\"(.*/icon/u.*\.jpg)\" alt=\"(.*)\"/></a>",
		TEXT  : "_short'>(.*)",
		PIC   : "(http://.*.douban.com/mpic/s[0-9]*.jpg)",
		STAR  : "<span class=\"stars. stars\" title=\"(力荐|推荐|还行|较差|很差)\">"
	};
	
	var REQ_HEADS = {
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
	};
	
	//Shortcut
	var YAHOO = unsafeWindow.YAHOO;
	var Dom = YAHOO.util.Dom
	var Event = YAHOO.util.Event;
	var $ = Dom.get;
    var searchResultItems = [];
    
	(function(){
		var t = Dom.getFirstChild("movie");
		if(!t)  {
		    t = Dom.getFirstChild(Dom.getElementsByClassName("book-info")[0]);
		    douQuery = douQueryBook;
		    pageType = 'book';
		} else {
		    douQuery = douQueryMovie;
		    pageType = 'movie';
		}
		
		t.className = "mynew";
		t.title = t.innerHTML.replace("<", " <").replace(/<(.+?)>/g, '').replace(/[，,]/g, ' ');
		var alink = document.createElement("SPAN");
		alink.className = "p-douban";
		alink.innerHTML = [
			"<a id='go-douban' href='"+ douQuery + t.title  +"'><font color='#368332'>豆瓣</font>查询</a> ",
			"<a id='douban' href='#A'><font color='#368332'>豆瓣</font>评论</a> ",
			"<a id='go-verycd' href='"+ vcQuery + t.title +"'><font color='#FF5555'>VeryCD</font>查询</a> ", 
			"<span id='douban-tip' style='display:none'><div class='loading'>数据获取中...</div></span>"
		].join("\n");
		
		t.appendChild(alink);
		
		Event.on("douban", "click", function(e){
		
			if($("doubanreview")){
				$("doubanreview").scrollIntoView();
				return;
			}
			
			var el = Event.getTarget(e).parentNode.parentNode;
			var title = el.title
			$("douban-tip").style.display = "";
			Dom.setX("douban-tip", Dom.getX(this)+20);
			Dom.setY("douban-tip", Dom.getY(this)+20);
			setTimeout(function(){
				GM_xmlhttpRequest({
					method:"GET",
					url:douQuery + encodeURIComponent(title),
					headers: REQ_HEADS,
					onload:function(details) {
						if(details.status=="200"){
							var s = details.responseText;
							var re = new RegExp(RE.QUERY, "g");
							var x = null;
							while ((x = re.exec(s)) != null){
								var caption = x[2].replace(/<(.+?)>/g, '');
								var url = doubanBase + x[1] + "reviews?sort=time";
                                searchResultItems.push({caption: caption, url: url});
                                if(searchResultItems.length>=5) break;
							}
							return getDoubanComments(0);
						}
					}
				});
			}, 10);
			Event.preventDefault(e);
		});

		Event.on("go-douban", "click", function(e){
			var el = Event.getTarget(e).parentNode.parentNode;
			var title = el.title
			window.open(douQuery + encodeURIComponent(title));

			Event.preventDefault(e);
		});

		addSwitcher(["mv-friendsreview", "mv-othersreview", "mv-relatevideo", "bk-friendsreview", "bk-othersreview"]);
	})();

	function foldingEvent(e) {
		var s = Dom.getFirstChild(Dom.getFirstChild(this));
		var x = Dom.getNextSiblingBy(this, function(el){ return Dom.hasClass(el,"sect-content")});
		s.innerHTML = Dom.hasClass(x, "close") ? "(收起)" : "(展开)";
		Dom.hasClass(x, "close") ? Dom.removeClass(x, "close") : Dom.addClass(x, "close")
	}

	function addSwitcher (ids) {
        if( typeof(ids) == "string") {
            ids = [ids];
        }
        var i, id
        for(i=0; i< ids.length; i++) {
            id = ids[i];
            var h3 = Dom.getFirstChild(id);
            if(h3) {
                var switcher = document.createElement("SPAN");
                switcher.innerHTML = "<a href='#A' class='switcher'>(收起)</a>";
                h3.appendChild(switcher);
                Event.on(h3, "click", foldingEvent);
            }
        }
	}

	function getInfoByRegExp (queryString, regExpStr, storeArr, infoArr, createIt) {
		var re = new RegExp(regExpStr, "g"), i = 0, arr;
		while ((arr = re.exec(queryString)) != null) {
			if(createIt) {
				storeArr[i] = {order : i};
			}
			if(storeArr[i]){
				for(var j=0, h=infoArr.length; j<h; j++) {
					storeArr[i][infoArr[j]] = arr[j+1];
				}
				i++;
			} else {
				return 0;
			}
		}
		return 1;
	}

	function countStar(s) {
		var order={'力荐':5,'推荐':4,'还行':3,'较差':2,'很差':1};
		if(s&&order[s]) {
			return order[s];
		} else {
			return 0;
		}
	}

    function getDoubanCommentsHandler(e) {
        $("douban-tip").style.display = "";
        Event.preventDefault(e);
        var el = Event.getTarget(e);
        if (el.tagName!="A") return false;
        Dom.setX("douban-tip", Dom.getX(el)+20);
        Dom.setY("douban-tip", Dom.getY(el)+20);
        getDoubanComments(parseInt(el.title, 10));
    }

	/**
	 * 获取豆瓣的网友评论
	 */
	function getDoubanComments(index) {
        caption = searchResultItems[index].caption;
        douban_url = searchResultItems[index].url;
        setTimeout(function(){
            GM_xmlhttpRequest({
                method:"GET",
                url:douban_url,
                headers: REQ_HEADS,
                onload:function(details) {
                    if(details.status=="200"){
                        if($("doubanpic")) {
                            $("doubanpic").parentNode.removeChild($("doubanpic"));
                            $("doubanreview").parentNode.removeChild($("doubanreview"));
                        }

                        var txt = details.responseText;
                        var reviews = [];
                        getInfoByRegExp(txt, RE.TITLE, reviews, ["title", "link"], true);
                        getInfoByRegExp(txt, RE.USER,  reviews, ["user", "avatar", "name"], false);
                        getInfoByRegExp(txt, RE.STAR,  reviews, ["star"], false);



                        txt = txt.replace(/[\r\n]/g,"").replace(/</g, "\n");
                        getInfoByRegExp(txt, RE.TEXT, reviews, ["text"], false);

                        var douban_review = document.createElement("DIV");
                        douban_review.id = "doubanreview";
                        douban_review.className = "sect";
                        var s = [];
                        s.push("<h3>豆瓣网的评价</h3>");
                        s.push("<div class=\"sect-brief\"><p>评价数据来自豆瓣网站 (<a href=\"http://www.douban.com\" target=\"_blank\">douban.com</a>) </p></div>");
                        s.push("<div class=\"sect-content\"><ul class=\"pl\">");
                        
                        for(var i=0, h=reviews.length; i<h; i++){
                            star = countStar(reviews[i].star);
                            s.push("<li>");
                            s.push("<p class=\"image\">");
                            s.push("<a href=\"http://www.douban.com"+reviews[i].user+"\" target=\"_blank\">");
                            s.push("<img alt=\""+reviews[i].name+"\" src=\""+reviews[i].avatar+"\"/>");
                            s.push("<span>"+reviews[i].name+"</span></a></p>");
                            s.push("<span class=\"rate-star rate-star"+star+"\">"+star+"</span>&nbsp;&nbsp;");
                            s.push("<a href=\"http://www.douban.com"+reviews[i].link+"\" target=\"_blank\">"+reviews[i].title+"</a>")
                            s.push("<p class=\"review\"><q>"+reviews[i].text+"</q></p>");
                            s.push("</li>");
                        }

                        s.push("</ul></div>");
                        douban_review.innerHTML = s.join("\n");
                       

                        var re = new RegExp(RE.PIC, "g");
                        var x = null, small_url, large_url;
                        while ((x = re.exec(txt)) != null){
                            small_url = x[0];
                            large_url = x[0].replace("mpic","lpic");
                        }

                        var resultHTML = ["<p><ul id=\"douban-result-items\">"];

                        for(var i=0; i<searchResultItems.length; i++) {
                            if(index == i) {
                                resultHTML.push(" <li><h4><a href=\"" + searchResultItems[i].url + "\" title=\" " + i + "\" targer=\"_blank\"> " + searchResultItems[i].caption + "</a></h4></li>");
                            } else {
                                resultHTML.push(" <li><a href=\"" + searchResultItems[i].url + "\" title=\" " + i + "\" targer=\"_blank\"> " + searchResultItems[i].caption + "</a></li>");
                            }
                        }
                        resultHTML.push("</ul></p>");

                        var douban_pic = document.createElement("DIV");
                        douban_pic.id = "doubanpic";
                        douban_pic.className = "sect";
                        var s = [];
                        s.push("<h3>豆瓣网的电影封面</h3>");
                        s.push("<div class=\"sect-brief\"><p>封面图片来自豆瓣网站 (<a href=\"http://www.douban.com\" target=\"_blank\">douban.com</a>)</p></div>");
                        s.push("<div class=\"sect-content\">");
                        s.push("<div class=\"douban-image\">");
                        s.push("<p class=\"image\">");
                        s.push("<a href=\""+large_url+"\" target=\"_blank\"><img title=\"点击看大图\" src=\""+ small_url +"\"/></a></p></div>");
                        s.push("<div class=\"douban-info\">");
                        s.push(resultHTML.join("\n"));
                        s.push("</div></div>");
                        douban_pic.innerHTML = s.join("\n");
                        
                        $(pageType == 'movie' ? "mv-friendsreview" : "bk-friendsreview").parentNode.appendChild(douban_pic);

                        Event.on("douban-result-items", "click", getDoubanCommentsHandler);

                        $(pageType == 'movie' ? "mv-friendsreview" : "bk-friendsreview").parentNode.appendChild(douban_review);
                        $("douban-tip").style.display = "none";
                        addSwitcher("doubanreview");
                        addSwitcher("doubanpic");

                        var foldup = function(e) {
                            var s = Dom.getFirstChild(Dom.getFirstChild(this));
                            var x = Dom.getNextSiblingBy(this, function(el){ return Dom.hasClass(el,"sect-content")});
                            s.innerHTML = "(展开)";
                            Dom.hasClass(x, "close") ? "" : Dom.addClass(x, "close")
                        }
                        foldup.call(Dom.getFirstChild(pageType == 'movie' ? "mv-friendsreview" : "bk-friendsreview"));
                        foldup.call(Dom.getFirstChild(pageType == 'movie' ? "mv-othersreview" : "bk-othersreview"));
                        pageType == 'movie' ? foldup.call(Dom.getFirstChild("mv-relatevideo")) : "";
                        //$("doubanpic").scrollIntoView();
                    }
                }
            });
        }, 10);
	}

})();

