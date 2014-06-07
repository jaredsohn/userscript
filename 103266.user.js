// ==UserScript==
// @name				Minified Pure Reader for Firefox
// @description Pixel specialist Na Wong (http://nadesign.net/safari/) hand-crafted the most beautiful Google Reader restyling of modern times, Pure Reader. It was ported from Safari by Jimmi Ti and then stripped down to just style a bit of the article contents.
// @include			https://*.google.com/reader/view/*
// @include			http://*.google.com/reader/view/*
// @include			htt*://*.google.*/reader/view*
// @author			Jimmy Ti (http://www.twitter.com/jimmyti), edited by Andrea Lazzarotto (http://andrealazzarotto.com)
// ==/UserScript==

var pureReaderCSS = 'div.entry-comments{background:transparent!important;margin-bottom:2em!important;padding:0 40px!important}div.entry-conversation{border-top:1px solid #e6e6e6!important;border-bottom:1px solid #e6e6e6!important}div.comment-add span.add-comment-warning{margin-left:2px!important;font-size:11px!important}div.search .entry{width:92%!important;margin:0 auto!important}div.entry div.entry-main{margin-left:24px!important}.entry .entry-body div.item-body{margin-top:.8em!important}.entry .entry-body div.item-body h3{clear:both;margin-top:1em!important}.entry .entry-body div.item-body ol,.entry .entry-body div.item-body ul{display:block!important;padding-left:0!important;margin-left:2em!important;clear:left}.entry .entry-body div.item-body ol li,.entry .entry-body div.item-body ul li{margin-bottom:.8em!important}.entry .entry-body div.item-body dt{color:#000!important}.entry .item-body,.entry .entry-body,.entry .entry-title,.entey .entry-likers{max-width:96%!important}div.entry-main{overflow:hidden!important}div.entry-0{padding-top:0!important}.entry .item-body,.entry .entry-body{padding-top:0!important;font-size:16px!important;line-height:28px!important;color:#646464!important;font-weight:400!important;text-shadow:#fff 0 1px 0}.entry .item-body p,.entry .entry-body p{margin-bottom:2em!important}.entry .entry-body p strong{color:#464646!important;font-weight:500}.entry .entry-body code pre{background:#f5f3f3!important;-moz-border-radius:4px!important;border-radius:4px!important;-webkit-box-shadow:#fff 0 1px 0!important;-moz-box-shadow:#fff 0 1px 0!important;color:#323232!important;text-shadow:#fff 0 0 3px;line-height:22px!important;padding:16px 24px}.entry .entry-body p img{clear:both!important;max-width:100%!important;height:auto!important}.entry-body p img{float:right;margin-left:1em;margin-bottom:.5em}.entry-body p img:only-child{float:none;display:block;margin:0 auto!important}.entry-body p img[alt=";)"],.entry-body p img[alt=":)"],.entry-body p img[alt=":D"],.entry-body p img[alt=";-)"],.entry-body p img[alt=":-)"],.entry-body p img[alt=":-D"]{display:inline;float:none;vertical-align:baseline;margin:0}.entry .entry-body hr{height:0!important;border:none;border-top:1px solid #aaaaaf;border-bottom:1px solid #fff}div.entry blockquote{border-left:1px dotted rgba(136,134,133,.4);margin-left:4px!important;padding-left:36px!important;color:#46464b!important;text-shadow:#fff 0 1px 0}div.entry ul li,div.entry ol li{margin-bottom:.7em!important}div.entry-body div dl dd{margin-left:1.2em!important;margin-bottom:.5em!important}.entry .entry-body blockquote{font-family:Georgia,Palatino,serif!important;font-style:italic!important}';

var head = document.getElementsByTagName('head')[0];
var style = document.createElement('style');
var rules = document.createTextNode(pureReaderCSS);

style.type = 'text/css';

if(style.styleSheet) {
	style.styleSheet.cssText = rules.nodeValue;
} else {
	style.appendChild(rules);
}
head.appendChild(style);