// ==UserScript==
// @name           NicodicHighSpeedCrawler
// @version        1.0.0
// @description    ニコニコ大百科の記事要素へのかっこいいアクセスを提供します。たぶん
// @comment        div[style.overflow="auto"]内スクロール対応
// @run-at         document-idle
// @include        http://dic.nicovideo.jp/*
// ==/UserScript==

(function(){
    // スクロール基準位置のオフセット(そのままだと上端揃えになるのでやや見ずらい)
    const VIEWPORT_OFFSET = 47
    // スクロール効果をつける最長距離(長すぎるとなんとなくうざかったので)
    const MAX_EFFECT_DISTANCE = 1536
    const MAX_EFFECT_DISTANCE_SUB = 1024
    
    /*--------------------------------------------------------------------------*
     *  
     *  SmoothScroll JavaScript Library V2, scrollMe
     *  
     *  MIT-style license. 
     *  
     *  2007-2011 Kazuma Nishihata 
     *  http://www.to-r.net
     *  
     *--------------------------------------------------------------------------*/
    // original source is placed at
    // http://blog.webcreativepark.net/sample/js/53/smoothScroll.js
    // more information
    // http://blog.webcreativepark.net/2007/07/12-143406.html
    function SmoothScroll(a){
	var e = document.getElementById(a.rel.replace(/.*\#/,""));
	if (!e) {return}

	var target = window
	var parentDiv = e.getAttribute("NicodicHSCparentDivID")
	if (parentDiv) {
	    target = document.getElementById(parentDiv)
	}
	
	//Move point
	var end = e.offsetTop
	while (e.offsetParent && e.offsetParent.tagName.toLowerCase() != "body") {
	    e = e.offsetParent
	    end += e.offsetTop
	}
	var istart = target.scrollTop
	var iend = end - target.offsetTop
	if (target != window) {
	    end = target.offsetTop
	}

	end -= VIEWPORT_OFFSET // 視認性のためにちょっとだけ下に
	end = (end<0)?(0):(end)

	var docHeight = document.documentElement.scrollHeight;
	var winHeight = window.innerHeight || document.documentElement.clientHeight
	if(docHeight-winHeight<end){
	    var end = docHeight-winHeight;
	}
	
	//Current Point
	var start=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	
	var n = Math.abs(start-end) -MAX_EFFECT_DISTANCE
	if (n > 0) { start += ((start<end)?(n):(-n)); scrollAbs(window, start) }
	var upFlag=(end<start)?(true):(false);
	setOrder(start,end,upFlag,window)
	if (target != window) {
	    var n = Math.abs(istart-iend) -MAX_EFFECT_DISTANCE_SUB
	    if (n > 0) { istart += ((istart<iend)?(n):(-n)); scrollAbs(target, istart) }
	    var iupf = (iend<istart)?(true):(false)
	    setOrder(istart, iend, iupf, target)
	}
	observe()
    }
    function scrollMe(holder) {
	var rmOrders = []
	holder.orders.forEach(function(o){
	if(o.up && o.start >= o.end){
	    o.start = o.start - (o.start - o.end)/20-1;
	    scrollAbs(o.target, o.start)
	}else if(!o.up && o.start <= o.end){
	    o.start = o.start + (o.end - o.start)/20+1;
	    scrollAbs(o.target, o.start)
	}else{
	    scrollAbs(o.target, o.end);
	    rmOrders.push(o)
	}
	})
	while (rmOrders.length > 0) {
	    var id = holder.orders.indexOf(rmOrders.pop())
	    holder.orders.splice(id,1)
	}
	if (holder.orders.length > 0) {
	    observe()
	}
    }

    function observe() {
	setTimeout(function(){
	    scrollMe(holder)
	}, 10);
    }

    var holder = {orders:[]}
    function setOrder(_start, _end, _up, _target) {
	if (!_target) { _target = window }
	if (holder.orders.every(function(o){
	    if (o.target == _target) {
		o.start = _start
		o.end = _end
		o.up = _up
		o.target = _target
		return false
	    } else { return true } })) {
	    holder.orders.push({start:_start, end:_end, up:_up, target:_target})
	}
    }
    function scrollAbs(base, Ypos) {
	if (base.scrollTo) {
	    base.scrollTo(0, Ypos)
	} else {
	    base.scrollTop = Ypos
	}
    }
	

    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }

    function mkVendorPrefix(elem) {
	return "-moz-" + elem + "-o-" + elem + "-webkit-" + elem + "-ms-" + elem + elem
    }

    addGlobalStyle("" +

		   ".nicodicHSC_menu {" +
		   "position: fixed;" +
		   "border: 1px solid #ccff00;" +
		   "border-right: none;" +
		   "background: #f7ffee;" +
		   mkVendorPrefix("border-radius: 4px 0px 0px 4px;") +
		   "padding: 4px;" +
		   "padding-right: 2px;" +
		   "top: 141px;" +
		   "right: 50%;" +
		   "margin-right: 484px;" +
		   "text-align: left;" +
		   "}" +

		   ".nicodicHSC_h1 {" +
		   "font-size: 114%;" +
		   "text-align: center;" +
		   "border-bottom: 1px solid #ccff00;" +
		   "}" +

		   "li.nicodicHSC_h2 {" +
		   "font-size: 107%;" +
		   "}" +

		   "li.nicodicHSC_h3 {" +
		   "font-size: 93%;" +
		   "margin-left: 7px;" +
		   "}" +

		   "li.nicodicHSC_h4 {" +
		   "font-size: 86%;" +
		   "margin-left: 14px;" +
		   "}" +

		   "a.nicodicHSC {" +
		   "display: block;" +
		   "padidng: 1px 0px;" +
		   "color: #442200 !important;" +
		   "text-decoration: none !important;" +
		   "}" +

		   "a.nicodicHSC:hover {" +
		   "background: #664422;" +
		   "color: #f7ffdd !important;" +
		   "}" +

		   "")

    var index = 1
    var ofdivID = 0
    function setSmoothScroll(a) {
	a.rel = a.href
	a.href = "javascript:void(0);"
	a.addEventListener('click', function(evn){
	    SmoothScroll(a)
	}, false)
	return a
    }
    function articleTop(target) {
	var a = document.createElement('a')
	a.className = "nicodicHSC"
	var name = /記事[:;]\s(.+)/.exec(target.textContent)
	if (name.length >= 2) {
	    a.innerHTML = name[1]
	}
	if (target.name) {
	} else if (target.id) {
	    target.name = target.id
	} else {
	    target.name = "nicodicHSC-0"
	    target.id = "nicodicHSC-0"
	}
	a.href = "#" + target.name
	return setSmoothScroll(a)
    }
    function setAnchor(target) {
	var a = document.createElement('a')
	a.className = "nicodicHSC"
	if (/について語るスレ$/.test(target.textContent)) {
	    a.innerHTML = "掲示板"
	} else {
	    a.innerHTML = target.textContent
	}
	if (target.name) {
	    
	} else if (target.id) {
	    target.name = target.id
	} else {
	    target.name = "nicodicHSC-" + index
	    target.id = "nicodicHSC-" + index
	    index += 1;
	}
	a.href = "#" + target.name
	return setSmoothScroll(a)
    }

    var article = document.getElementById("article")
    if (article) {
	var pageMenu = document.getElementById("page-menu")
	pageMenu.style.display = 'none'
	var menu = document.createElement('div')
	menu.className = "nicodicHSC_menu"
	var h1menu = document.createElement('ul')
	menu.insertBefore(h1menu, null)
	var h2menu = document.createElement('ul')
	h1menu.insertBefore(h2menu, null)
	var h3menu = document.createElement('ul')
	h2menu.insertBefore(h3menu, null)

	var divs = article.getElementsByTagName("div")
	for ( var i = 0, l = divs.length; i < l; i++ ) {
	    var div = divs[i]
	    if (div.style.overflow == "auto") {
		if (!div.id) {
		    div.id = "ofdiv-" + ofdivID
		    div.name = div.id
		    ofdivID += 1;
		}
		var hxs = document.evaluate(".//h2 | .//h3 | .//h4", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
		for ( var k = 0, t = hxs.snapshotLength; k < t; k++ ) {
		    var hx = hxs.snapshotItem(k)
		    hx.setAttribute("NicodicHSCparentDivID", div.id)
		}
	    }
	}

	var hxs = document.evaluate("//div[@class='article-tab-nico']/h1 | //div[@id='bbs']//h2 | .//h2 | .//h3 | .//h4", article, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
	for ( var i = 0, l = hxs.snapshotLength; i < l; i++ ) {
	    var hx = hxs.snapshotItem(i)
	    var hxtag = hx.tagName.toLowerCase()
	    if ( hxtag == "h1" ) {
		var h1 = menu.insertBefore(articleTop(hx), h1menu)
		h1.className += " nicodicHSC_h1"
	    } else if ( hxtag == "h2" ) {
		var h2 = document.createElement('li')
		h2.insertBefore(setAnchor(hx), null)
		h2.className = "nicodicHSC_h2"
		h2menu = document.createElement('ul')
		h3menu = h2menu
		h2.insertBefore(h2menu, null)
		h1menu.insertBefore(h2,null)
	    } else if ( hxtag == "h3" ) {
		var h3 = document.createElement('li')
		h3.insertBefore(setAnchor(hx), null)
		h3.className = "nicodicHSC_h3"
		h3menu = document.createElement('ul')
		h3.insertBefore(h3menu, null)
		h2menu.insertBefore(h3,null)
	    } else if ( hxtag == "h4" ) {
		var h4 = document.createElement('li')
		h4.insertBefore(setAnchor(hx), null)
		h4.className = "nicodicHSC_h4"
		h3menu.insertBefore(h4,null)
	    }
	}

	document.body.insertBefore(menu, null)
	var h1menuMaxoffset = (window.innerHeight || document.documentElement.clientHeight) - 141 - 40
	if (h1menu.offsetHeight > h1menuMaxoffset) {
	    h1menu.style.height = h1menuMaxoffset + "px"
	    h1menu.style.overflow = "auto"
	}
    }
})();