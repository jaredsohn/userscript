// ==UserScript==
// @name           Douban Search Switch
// @namespace      http://userscripts.org/users/195534
// @description    随意切换豆瓣首页的搜索类型
// @include        http://www.douban.com/*
// @version        0.1 Rev005
// @author         disinfeqt
// @homepage       http://www.zdxia.com
// ==/UserScript==

var $, jQuery;
loading();

$.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

function loading() {
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);
}

function init() {
	$ = jQuery = unsafeWindow.jQuery;
	
	$(function() {
	    
	    $('#select_search li').live('mouseover mouseout', function(event) {
	      if (event.type == 'mouseover') {
	        $("#select_search li:not(.current)").show();
	      } else {
	        $("#select_search li:not(.current)").hide();
	      }
	    });
	    
	    $('#select_search li a').live('click', function() {
	      var formAction = $(this).parent().data("search");
	      var searchBar = $("#db-nav-main .nav-srh input[type=text]");
	      var searchForm = $("#db-nav-main .nav-srh form");
	      var hiddenCat = $(this).parent().data("cat");
	      $(searchForm).attr("action", formAction);
	      if ($(searchBar).parent().parent().find("input[type=hidden]").length > 0) {
	          $(searchBar).parent().parent().find("input[type=hidden]").val(hiddenCat);
	      } else {
	          $(searchBar).parent().after('<input type="hidden" value="' + hiddenCat +'" name="cat">')
	      };
	      $('#select_search li').removeClass("current");
	      $(this).parent().addClass("current");
	      $.cookie('currentSearch', formAction, {expires: 365});
	      $("#select_search li:not(.current)").hide();
	    });

	});
	
	$(document).ready(function() {
	
    	// Dynamically insert shit into Douban's <head>
    	function addStyle(name, value){  
    	    var styles = document.styleSheets;  
    	    if(!styles || styles.length <= 0){  
    	        var s = document.createElement("style");  
    	        s.type = "text/css";  
    	        var head = document.getElementsByTagName("head")[0];  
    	        head.appendChild(s);  
    	    }  
    	    styles = document.styleSheets;  
    	    styles = styles[styles.length - 1];   
    	    styles.insertRule(name + " { " + value + " }", styles.cssRules.length);   
    	}  
        
        // Now we have a styleshit...
        addStyle("#db-nav-main .bd","position: relative;");
        addStyle("#select_search","position: absolute; right: 305px; top: 8px; background: #E9F4E9; width: 50px;");
        addStyle("#select_search li a","display: block; text-align: center;");
        addStyle("#select_search li.current a","color: #006600;");
        addStyle("#select_search li.current a:hover","color: #fff;");
        addStyle("#select_search li:not(.current)","display: none;");
        
        var selectSearch = '<ul id="select_search">';
        selectSearch += '<li data-search="http://www.douban.com/search" data-cat="" class="current"><a href="javascript:;">默认</a></li>';
        selectSearch += '<li data-search="http://movie.douban.com/subject_search" data-cat="1002"><a href="javascript:;">电影</a></li>';
        selectSearch += '<li data-search="http://music.douban.com/subject_search" data-cat="1003"><a href="javascript:;">音乐</a></li>';
        selectSearch += '<li data-search="http://book.douban.com/subject_search" data-cat="1001"><a href="javascript:;">读书</a></li>';
        
        // Fire!
        $(".nav-srh").before(selectSearch);
        
        $("#select_search li").each(function (i) {
            if ($(this).data("search") === $.cookie('currentSearch')) {
                var formAction = $(this).data("search");
                var hiddenCat = $(this).data("cat");
                var searchForm = $("#db-nav-main .nav-srh form");
                var searchBar = $("#db-nav-main .nav-srh input[type=text]");
                $(searchForm).attr("action", formAction);
                $(searchBar).parent().after('<input type="hidden" value="' + hiddenCat +'" name="cat">');
                $("#select_search li").removeClass("current");
                $(this).addClass("current");
            } else {
                return 0;
            }
        })

	});
}