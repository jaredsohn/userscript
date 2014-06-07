// ==UserScript==
// @name           NOWnews OnePage 
// @author         WM Chang
// @version        0.4.5
// @namespace      https://addons.mozilla.org/zh-TW/firefox/addon/nownews-onepage/
// @description    Make NOWnews articles displayed in one page.
// @match http://www.nownews.com/*
// @match https://www.nownews.com/*
// ==/UserScript==

if (document.getElementById('news_nav')) {
    
    var target = document.getElementById('news_nav');

    /* modify the page title and get the total pages */
    var reg = /第\d+頁\s|\s/;
    var total = target.querySelectorAll('a[rel="prev"]').length && target.querySelectorAll('a[rel="next"]').length ? target.querySelectorAll('a').length - 1 : target.querySelectorAll('a').length;
    document.title = document.title.replace(reg, '');
    

    var targets = target.querySelectorAll('a');
    var index = target.querySelector('span.current').textContent;
    target.style.display = 'none';
    var result = new Array(total);
    for (var i = 0; i < total; i++) {
        result[i] = 'null';
    }
    result[index - 1] = 'current';
    for (var i = 0; i < targets.length; i++) {
        if (targets[i].textContent != '<' && targets[i].textContent != '>') {
            var request = new XMLHttpRequest();
            request.onreadystatechange = fetch;
            request.open('GET', targets[i].href, true);
            //request.overrideMimeType('text/html; charset=big5');
            request.send(null);
        }
    }
}

function fetch() {
    var request = this;
    var content = document.createElement('div');
    if (request.readyState === 4) {
        if (request.status === 200) {
            content.innerHTML = request.responseText;
            page(content.querySelector('div.story_content'));
            /*if (content.querySelector('div.story_photo')) {
		    document.getElementById("reporter_info").nextElementSibling.innerHTML = '<div class="story_photo">' + content.querySelector('div.story_photo').innerHTML + '<div>';
		    var target = document.querySelector('div.story_photo');
		    target.style.display = 'block';
		    
                    [].forEach.call(
                      target.querySelectorAll('img'), 
                      function(el) {
                        el.setAttribute('src', el.getAttribute('rel'));
                      }
                    );

            }*/
        }
    }
}

function page(content) {
    var position = content.querySelector('#news_nav > span.current').textContent;
    node = content.querySelector("span.news_next");
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
    node = content.querySelector("div.page_nav");
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
    node = content.querySelector('p.bzkeyword');
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
    result[position - 1] = content.innerHTML.replace(/%20/g, ''); // fix space char like %20http in img src after innerHTML
    
    var images = content.getElementsByTagName('img');    
    for (var i = 0; i < images.length; i++) { 
		if (images[i].getAttribute('pagespeed_lazy_src'))
			images[i].src = images[i].getAttribute('pagespeed_lazy_src');
	}
    
    if (result.indexOf('null') < 0) {
       render(); 
    }
}

function render() {
    for (var i = index - 2; i > -1 ; i--) {
        document.querySelector('div.story_content').insertAdjacentHTML('afterbegin', result[i]);
    }
    for (var i = index; i < total; i++) {
        document.getElementById('news_nav').insertAdjacentHTML('beforebegin', result[i]);
    }
}
