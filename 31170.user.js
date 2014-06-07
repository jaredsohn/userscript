// ==UserScript==
// @name           acm
// @namespace      acm
// @description    for acm , show abstract in place.You can click the link which named "full citation",then this script will use ajax to load full abstract in place.You don't need to open many new tabs. 這隻script 可以幫助你在acm 的搜索結果頁面 或是期刊頁面中把完整的摘要給顯示在底下，無須開新頁面。 
// @include        http://portal.acm.org/*
// ==/UserScript==

//load jquery


//this function is copyed from http://code.google.com/p/rssget/
//thanks  	 jackysee
function extractTagByStr(t,tag){
        if(tag && t.match(new RegExp("<"+tag+"[^>]*>","gim")) && t.match(new RegExp("<\/"+tag+">","gim"))){
            var t2 = t.substring(t.indexOf("<"+tag),t.indexOf("</"+tag+">")).replace(new RegExp("<"+tag+"[^>]*>","gim"));
            if(t2) return t2;
        }
        return t;
    }



// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        $("body").append("<div id=\"hidden_div\" style=\"display:none\"></div>");

        $("a:contains('full citation')").unbind("click").bind("click",function(){
                       $(this).unbind("click").bind("click",function(){return false;});
			var target = this;
			$(target).parent().append("<div class=\"inject-obj\">loading....</div>");
			$.get(this.href,"",function(data){
				//get body 
				var content = extractTagByStr(data,"body");
				$("#hidden_div").empty();
				$("#hidden_div").append(content);
				var header= $("#hidden_div").find("span.heading");
				var abs = $(header).next().html();
				if($.trim(abs)==''){
					abs = $(header).next().next().html();
				}
				abs+=" ... <a href=\""+target.href+"\"> original page</a>";
				$("<div/>").css({"padding":"5px 5px 5px 5px","border":"1px solid #333","background-color":"#FAFAFA","font-size":"15px"}).html(abs).appendTo($(target).parent().find(".inject-obj").empty());
			});
			return false;
		});
    }