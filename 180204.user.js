// ==UserScript==
// @name       Biblio Styler
// @namespace  http://bigvik.ru/
// @version    0.4.1
// @updateURL     https://userscripts.org/scripts/source/180204.meta.js
// @description  Изменяет стили известных онлайн библиотек для комфортного чтения
// @match      http://lib.ru/*.txt
// @match      http://lib.rus.ec/*
// @match      http://flibusta.net/*read
// @copyright  2013+, Bigvik
// ==/UserScript==
var time =	true;
var icons =	
{
    day:'data:image/png;base64,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'+
		's1l/4ftXZuEwAAAABJRU5ErkJggg==',
  night:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2'+
		'Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWhJREFUeNrEV4GNgzAMzHeB/gZ0g/wG6Qb8Bh2Bbs'+
		'AI/AaMkN+g3SC/QUZAPwEfJCPxVuwktHEjnRBgsH0ctqNU3moDbMBNCS8T4AJmgJF0PmwcL/BSjo9A9Y'+
		'wwSDl3Eedi9I+E8xmCq7oujPNZgvrpFQEc4HgNeFcvXKnsFzS1GGgj2V8jth9Syl8LjpeoA4dIZt9wvK'+
		'Prn7UYwN+63TQgfO8iEYBhxOlr/YbU+kLnp4BOkgGqQGmpABRkjG2mZwaBM+wjNreaQVj0Ykf0Ck9UyI'+
		'c10WWWXc2UbL/jFzXrjNlEXmiJhzTDxBrIADWkibBo4L7HfkamIOWObHvQbjMrFVmX2UUpuNQUvBrpxC'+
		'DT7wzE5Cp9Yj4H3ryMCY0kOyundFswlHSM83+7qzciiDszov1Ay8bterE/Q9s+Mc8uNr+pDHQmlSUYS0'+
		'f7IyHMUuRqiGXD7nTcP3ND04C4LCNUB1RnZ/wnwADUKjtp9O2gggAAAABJRU5ErkJggg=='
};
var css =	'#main {width:80% !important; margin: 0 auto !important;}\n'+
    		'.body>pre {width:70% !important; margin: 0 auto !important;}\n'+
    		'.body.day {background-color: #F0E8D1 !important}\n'+
			'.body.night {background-color: #013F53 !important}\n'+
    		'.body > div {background-color: inherit !important;\n}'+
    		'#paneloption {position:fixed; right:20px; width:48px; top:45px; height:48px; z-index:999;}\n'+
    		'#paneloption:hover{cursor:pointer;}\n'+
    		'.day #paneloption { background:url('+icons.day+') no-repeat;}\n'+
    		'.night #paneloption { background:url('+icons.night+') no-repeat;}\n'+
			'.day .pf {font: 26px Tahoma,Helvetica,Arial sans  !important; color: #3E2917  !important;}\n'+
			'.night .pf {font: 26px Tahoma,Helvetica,Arial sans  !important; color: #B8BCA5  !important;}\n'+
			'.day h1, .day h2, .day h3, .day h4, .day h5 {color:#A00000 !important}\n'+
			'.night h1, .night h2, .night h3, .night h4, .night h5 {color: #A00000  !important}\n'+
    		'h1, h2, h3, h4, h5 {font-size:30px !important; line-height:2em !important; margin-bottom: 10px !important;}\n'+
'.hid {visibility:hidden}';

function addEvent(html_element, event_name, event_function) 
{       
   if(html_element.attachEvent) //Internet Explorer
      html_element.attachEvent("on" + event_name, function() {event_function.call(html_element);}); 
   else if(html_element.addEventListener) //Firefox & company
      html_element.addEventListener(event_name, event_function, false); //don't need the 'call' trick because in FF everything already works in the right way          
}

function addStyle (css){
	/*if(typeof GM_addStyle != "undefined"){ GM_addStyle(css);
											 }else if(typeof PRO_addStyle != "undefined"){ PRO_addStyle(css);
																						 }else if(typeof addStyle != "undefined"){ addStyle(css);
																																 }else{*/
	var heads = document.getElementsByTagName("head");
	if(heads.length){
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}//}
}

function addClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    if (re.test(o.className)) return
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}
  
function removeClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
}


var divLayer = document.createElement('div');
divLayer.setAttribute('id' , 'paneloption');
document.getElementsByTagName('body')[0].appendChild(divLayer);
addEvent(document.getElementById('paneloption'), 'click', function() 
{             
   if (time)
   {
    time = false;
	removeClass(document.getElementsByClassName('body')[0], 'day');
	addClass(document.getElementsByClassName('body')[0], 'night');
   }
    else
   {
    time = true;
	removeClass(document.getElementsByClassName('body')[0], 'night');
	addClass(document.getElementsByClassName('body')[0], 'day');
   }
}); 


addStyle(css);

var daycss, nightcss;
var forEach = Array.prototype.forEach;

if (window.location.hostname == "lib.ru")
{
    addClass(document.getElementsByTagName('body')[0], 'body');
    	pf = document.getElementsByTagName('pre');
	forEach.call(pf, function(el){addClass(el, 'pf');});
} else if (window.location.hostname == "lib.rus.ec")
{
    addClass(document.getElementsByClassName('lb-pay__overlay')[0],'hid');
	addClass(document.getElementById('main-wrapper'), 'body');
		pf = document.getElementsByTagName('p');
	forEach.call(pf, function(el){addClass(el, 'pf');});
    daycss		=	"div._ga1_on_ {width:80%; margin:0 auto}\n#main {background-color: #F0E8D1 !important}\n"+
					".stanza {font-style:italic; color:#B8638F}"+
					"blockquote.epigraph p.book{font-style:italic !important; color:#B8638F !important}"+
					"blockquote>i {color:#881280}";
    nightcss	=	"#main {background-color: #013F53 !important};";
} else if (window.location.hostname == "flibusta.net"){

	addClass(document.getElementById('main-wrapper'), 'body');
    	pf = document.getElementsByTagName('p');
	forEach.call(pf, function(el){addClass(el, 'pf');});
    daycss		=	"#main{width:80%; margin: 0 auto; background-color: #F0E8D1 !important}\n"+
					"#main-wrapper{background-color: #F0E8D1 !important}\n"+
					".stanza {font-style:italic; color:#B8638F}"+
					"blockquote>i {color:#881280}";
    nightcss	=	"#main {background-color: #013F53 !important};";
}
addClass(document.getElementsByClassName('body')[0], 'day');