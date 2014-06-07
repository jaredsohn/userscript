// ==UserScript==
// @name           Douban Group Topic Live
// @namespace      http://tremblefrog.org/blog/
// @description    A convenient tool script for browsing any live posts on douban.com
// @include        http://www.douban.com/group/topic/*
// ==/UserScript==


if (unsafeWindow.$){
    var $ = unsafeWindow.$;
}

function DoubanGroupWidget(){
    this.pages = 0;
    this.publisher = null;
    this.filtered = false;
    this.douban = null;
    
    this.parse_paginator = function(){
        /* get the pages count first */
        var page_count = 0;
        if ((page_count = $("div.paginator a").size()) > 0){
            max_page = parseInt($("div.paginator a").slice(page_count - 2, page_count - 1).text());
            if (max_page > 0){
                this.pages = max_page;
            }
        }
    }
    
    this.load_all = function(){
        this.filter_replies();  /* filter replies for current page */
        var _douban = this.douban;
        
        if (this.pages > 0){
            setTimeout(function(){
                $("#dgw_status").html("<span class='btn-next'><a href='#'>&nbsp;</a></span> 正在加载第2页...");
                _douban.dg_widget.load_page(2, true);
            }, 1500);
        }
    }
    
    this.load_page = function(p, auto){
        if (!this.filtered){
            this.filter_replies();
            this.filtered = true;
        }
        
        var uri = window.location.href.replace(/\?start\=\d+/, '') + '?start=' + (p - 1) * 100;
        var _publisher = this.publisher;
        var _pages = this.pages;
        var _douban = this.douban;
        
        $("#dgw_status").html("<span class='btn-next'><a href='#'>&nbsp;</a></span> 正在加载第" + p + "页...");
        
        $.get(uri, function(data){
            var _ul = $("ul.topic-reply").eq(0);
            var _replies = $("ul.topic-reply li", $(data));
            if (_replies.size()){
                _ul.append("<li class='clearfix'><h2 class='hsf'>---- 第" + p + "页 ----</li>");
                $.each(_replies, function(idx, li){
                    if ($("div.user-face a", li).attr("href") == _publisher){
                        _ul.append($(li)); /* insert this reply into DOM tree */
                    }
                });
            }
            
            if (p < _pages){
                /* refresh the link */
                $("#dgw_status").text("第" + p + "页加载完毕, 等待加载下一页...");
                $("#dgw_next_page").attr("href", "javascript: Douban.dg_widget.load_page(" + (p+1) + ", false);").text("加载第" + (p+1) + "页");
                
                if (auto){
                    setTimeout(function(){
                        var _p = p + 1;
                        _douban.dg_widget.load_page(_p, true);
                    }, 5000);
                }
                
            }
            else{
                $("#dgw_status").text("小喇叭广播完啦, 再见!!!");
                $("#dgw_next_page").remove();   /* remove the next page link */
            }
        });
    }
    
    this.filter_replies = function(){
        var _publisher = this.publisher;
        $.each($("ul.topic-reply li"), function(idx, li){
            /* remove any reply entry not posted by the publisher */
            if ($("div.user-face a", li).attr("href") != _publisher){
                $(li).remove();
            }
        });
    }
    
    this.show_switch = function(){
        var main_width =  $("#wrapper").attr("offsetWidth");
		var pos_left = (document.body.offsetWidth - main_width) / 2 + main_width - 270;
		
		$("#dgw_toolbox").remove();
		
		if (this.pages > 0){
		    $("<div id='dgw_switch' style='position:fixed; left:" + pos_left + "px; width:250px; top:125px; padding:10px; background:#f1f1f1; border:#ccc 2px solid; opacity: 0.8;-moz-opacity: 0.8;filter:alpha(opacity=80);'><div class='gray_ad'><h2 class='usf'>直播小板凳(" + this.pages + "页)</h2><ul class='bs'><li style='border:none;'><a href='javascript: void(0);' onclick='Douban.dg_widget.load_all()'>自动加载所有直播帖</a></li><li style='border:none;'><a href='javascript: void(0);' onclick='Douban.dg_widget.filter_replies()'>当前页只看楼主</a></li><li style='border:none;'><a id='dgw_next_page' href='javascript: Douban.dg_widget.load_page(2, false);'>加载第2页</a></li></ul><p id='dgw_status'></p></div></div>").prependTo("body");
		}
		else{
		    $("<div id='dgw_switch' style='position:fixed; left:" + pos_left + "px; width:250px; top:125px; padding:10px; background:#f1f1f1; border:#ccc 2px solid; opacity: 0.8;-moz-opacity: 0.8;filter:alpha(opacity=80);'><div class='gray_ad'><h2 class='usf'>直播小板凳</h2><ul class='bs'><a href='javascript: void(0);' onclick='Douban.dg_widget.filter_replies()'>只看楼主</a></li></ul><p id='dgw_status'></p></div></div>").prependTo("body");
		}
    }
    
    this.initialize = function(){
        this.parse_paginator();
        this.publisher = $("div.topic-doc h3 span.pl20 a").attr("href");
        $("div.aside").prepend("<div id='dgw_toolbox' class='gray_ad'><h2 class='usf'>直播小板凳</h2><span class='btn-next'><a href='javascript:Douban.dg_widget.show_switch();' title='观看直播'>运行</a></span></div>");

    }
}

unsafeWindow.Douban.dg_widget = new DoubanGroupWidget();
unsafeWindow.Douban.dg_widget.initialize();
unsafeWindow.Douban.dg_widget.douban = unsafeWindow.Douban;