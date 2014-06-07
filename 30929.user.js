// ==UserScript==
// @name           FlickrBlogThis
// @include        http://www.flickr.com/photos/*
// @include        https://www.flickr.com/photos/*
// @namespace      https://www.flickr.com/photos/*
// @description    Generates HTML code for a blog posting from a flickr photo page
// ==/UserScript==

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = '//code.jquery.com/jquery-1.9.1.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            do_JQuery();
        }
    }

    
    function do_JQuery() {
        GM_registerMenuCommand("Blog this flickr photo page", FlickrHTMLCode);
    }
    
    function scrollToElement(selector, time, verticalOffset) {
    // http://www.dconnell.co.uk/blog/index.php/2012/03/12/scroll-to-any-element-using-jquery/
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
    }



function FlickrHTMLCode()
{
	title = $('span.editable:nth-child(1)').text();
	name = $("a.owner-name").first().text().replace(/^\s+|\s+$/g, '');
	// arr = $("span.photo-name-line-1").find("a").attr("href").split("/");
	theURL = document.URL;
    profile_name = theURL.split("/")[4];
	u = theURL.match(/^(.*)\/in(.*)/);
	if (u) {
	    newURL = u[1] + "/sizes/s/";
	} else {
	    newURL = document.URL + "sizes/s/";
	}
	$.get(newURL, function(data) {
	    img_src = $(data).find("div#allsizes-photo img").attr("src");
	    e = $(".title-desc-block");
		if (e) {
			newElement = document.createElement("div");
			newElement.innerHTML = '<textarea cols=\"60\" rows=\"13\" wrap=\"virtual\">' + 
			'&lt;table style=\"margin-left: 10px; width: 20%;\" align=\"right\"&gt;&lt;tbody&gt;&lt;tr&gt;&lt;td&gt;&lt;a href=\"' +
			theURL + 
			'\"&gt;&lt;img alt=\"' +
			title + 
			'\" src=\"' +
			img_src + 
			'" /&gt;&lt;/a&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;small&gt;\"&lt;a href=\"' +
			theURL + 
			'\"&gt;' + 
			title +
			'&lt;/a&gt;\" by &lt;a href=\"'+
			'http://www.flickr.com/photos/' + profile_name +  '/\" ' + 
			'&gt;' + 
			name + 
			'&lt;/a&gt;&lt;i&gt;.&lt;/i&gt;&lt;/small&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/tbody&gt;&lt;/table&gt; ' +
			'</textarea>';
			$(e).parent().append(newElement);
		}
		scrollToElement(e);
    }); 
}

