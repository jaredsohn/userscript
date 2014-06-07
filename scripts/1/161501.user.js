// ==UserScript==
// @name           Beautify Twitter
// @namespace      http://userscripts.org/users/508768
// @include        https://twitter.com/
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @version        0.4.61
// @downloadURL    https://userscripts.org/scripts/source/161501.user.js
// @updateURL      https://userscripts.org/scripts/source/161501.meta.js

// ==/UserScript==


(function (e, t, n) { "use strict"; var r = t.event, i; r.special.smartresize = { setup: function () { t(this).bind("resize", r.special.smartresize.handler) }, teardown: function () { t(this).unbind("resize", r.special.smartresize.handler) }, handler: function (e, t) { var n = this, s = arguments; e.type = "smartresize", i && clearTimeout(i), i = setTimeout(function () { r.dispatch.apply(n, s) }, t === "execAsap" ? 0 : 100) } }, t.fn.smartresize = function (e) { return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"]) }, t.Mason = function (e, n) { this.element = t(n), this._create(e), this._init() }, t.Mason.settings = { isResizable: !0, isAnimated: !1, animationOptions: { queue: !1, duration: 500 }, gutterWidth: 0, isRTL: !1, isFitWidth: !1, containerStyle: { position: "relative" } }, t.Mason.prototype = { _filterFindBricks: function (e) { var t = this.options.itemSelector; return t ? e.filter(t).add(e.find(t)) : e }, _getBricks: function (e) { var t = this._filterFindBricks(e).css({ position: "absolute" }).addClass("masonry-brick"); return t }, _create: function (n) { this.options = t.extend(!0, {}, t.Mason.settings, n), this.styleQueue = []; var r = this.element[0].style; this.originalStyle = { height: r.height || "" }; var i = this.options.containerStyle; for (var s in i) this.originalStyle[s] = r[s] || ""; this.element.css(i), this.horizontalDirection = this.options.isRTL ? "right" : "left"; var o = this.element.css("padding-" + this.horizontalDirection), u = this.element.css("padding-top"); this.offset = { x: o ? parseInt(o, 10) : 0, y: u ? parseInt(u, 10) : 0 }, this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function"; var a = this; setTimeout(function () { a.element.addClass("masonry") }, 0), this.options.isResizable && t(e).bind("smartresize.masonry", function () { a.resize() }), this.reloadItems() }, _init: function (e) { this._getColumns(), this._reLayout(e) }, option: function (e, n) { t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e)) }, layout: function (e, t) { for (var n = 0, r = e.length; n < r; n++) this._placeBrick(e[n]); var i = {}; i.height = Math.max.apply(Math, this.colYs); if (this.options.isFitWidth) { var s = 0; n = this.cols; while (--n) { if (this.colYs[n] !== 0) break; s++ } i.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth } this.styleQueue.push({ $el: this.element, style: i }); var o = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css", u = this.options.animationOptions, a; for (n = 0, r = this.styleQueue.length; n < r; n++) a = this.styleQueue[n], a.$el[o](a.style, u); this.styleQueue = [], t && t.call(e), this.isLaidOut = !0 }, _getColumns: function () { var e = this.options.isFitWidth ? this.element.parent() : this.element, t = e.width(); this.columnWidth = this.isFluid ? this.options.columnWidth(t) : this.options.columnWidth || this.$bricks.outerWidth(!0) || t, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((t + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1) }, _placeBrick: function (e) { var n = t(e), r, i, s, o, u; r = Math.ceil(n.outerWidth(!0) / this.columnWidth), r = Math.min(r, this.cols); if (r === 1) s = this.colYs; else { i = this.cols + 1 - r, s = []; for (u = 0; u < i; u++) o = this.colYs.slice(u, u + r), s[u] = Math.max.apply(Math, o) } var a = Math.min.apply(Math, s), f = 0; for (var l = 0, c = s.length; l < c; l++) if (s[l] === a) { f = l; break } var h = { top: a + this.offset.y }; h[this.horizontalDirection] = this.columnWidth * f + this.offset.x, this.styleQueue.push({ $el: n, style: h }); var p = a + n.outerHeight(!0), d = this.cols + 1 - c; for (l = 0; l < d; l++) this.colYs[f + l] = p }, resize: function () { var e = this.cols; this._getColumns(), (this.isFluid || this.cols !== e) && this._reLayout() }, _reLayout: function (e) { var t = this.cols; this.colYs = []; while (t--) this.colYs.push(0); this.layout(this.$bricks, e) }, reloadItems: function () { this.$bricks = this._getBricks(this.element.children()) }, reload: function (e) { this.reloadItems(), this._init(e) }, appended: function (e, t, n) { if (t) { this._filterFindBricks(e).css({ top: this.element.height() }); var r = this; setTimeout(function () { r._appended(e, n) }, 1) } else this._appended(e, n) }, _appended: function (e, t) { var n = this._getBricks(e); this.$bricks = this.$bricks.add(n), this.layout(n, t) }, remove: function (e) { this.$bricks = this.$bricks.not(e), e.remove() }, destroy: function () { this.$bricks.removeClass("masonry-brick").each(function () { this.style.position = "", this.style.top = "", this.style.left = "" }); var n = this.element[0].style; for (var r in this.originalStyle) n[r] = this.originalStyle[r]; this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), t(e).unbind(".masonry") } }, t.fn.imagesLoaded = function (e) { function u() { e.call(n, r) } function a(e) { var n = e.target; n.src !== s && t.inArray(n, o) === -1 && (o.push(n), --i <= 0 && (setTimeout(u), r.unbind(".imagesLoaded", a))) } var n = this, r = n.find("img").add(n.filter("img")), i = r.length, s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", o = []; return i || u(), r.bind("load.imagesLoaded error.imagesLoaded", a).each(function () { var e = this.src; this.src = s, this.src = e }), n }; var s = function (t) { e.console && e.console.error(t) }; t.fn.masonry = function (e) { if (typeof e == "string") { var n = Array.prototype.slice.call(arguments, 1); this.each(function () { var r = t.data(this, "masonry"); if (!r) { s("cannot call methods on masonry prior to initialization; attempted to call method '" + e + "'"); return } if (!t.isFunction(r[e]) || e.charAt(0) === "_") { s("no such method '" + e + "' for masonry instance"); return } r[e].apply(r, n) }) } else this.each(function () { var n = t.data(this, "masonry"); n ? (n.option(e || {}), n._init()) : t.data(this, "masonry", new t.Mason(e, this)) }); return this } })(window, jQuery);

if (location.href != "https://twitter.com/" && location.href.substr(-20) == "BeautifyTwitter=true" ) {

    //addScript_BT = new Function("var headID = window.document.getElementsByTagName(\"head\")[0];var newScript = window.document.createElement('script');newScript.type = 'text/javascript';    newScript.src = 'https://googledrive.com/host/0B1SUSIcmSaCSbDh4Qjd5RHFIWW8/html2canvas.js';headID.appendChild(newScript);");
	//addScript_BT();
	
	
	(function(){
		console.log(" OK2... from: " + location.href);
		setTimeout(function(){console.log(" OK3... from: " + location.href); html2canvas(document.body, { onrendered: function(canvas) {   document.body.appendChild(canvas); CANVASJPEG = canvas.toDataURL("image/jpeg"); var img = document.createElement("img"); img.src = CANVASJPEG; document.body.appendChild(img); document.body.removeChild(canvas); }	}); }, 1000);
	})();
	
	/*
	html2canvas_BT = new Function("console.log(\" OK3... from: \" + location.href); html2canvas(document.body, { onrendered: function(canvas) { $(\"body\").html(\"\"); document.body.appendChild(canvas); CANVASJPEG = canvas.toDataURL(\"image/jpeg\"); var img = document.createElement(\"img\"); img.src = CANVASJPEG; document.body.appendChild(img); document.body.removeChild(canvas); } });");
	html2canvas_BT();
	*/
	
	//top.canvasToJPEG(document.getElementsByTagName("img")[0].src, location.href);
	top.canvasToJPEG(window.CANVASJPEG, location.href);
	//unsafeWindow.top.canvasToJPEG(unsafeWindow.CANVASJPEG, location.href);
	//setCookie("BTIFRAMESHOT|" + location.href, window.CANVASJPEG);

	//return;
}else if (location.href == "https://twitter.com/" ) initialize();

function canvasToJPEG(data, url){
	 if( url.indexOf("?") == -1) URLadd = "?BeautifyTwitter=true";
	 else URLadd = "&BeautifyTwitter=true";
	 $("iframe[src='" + url + URLadd + "']").parent().html("").html("<img class='URLShot' url='" + url +"' src='" + data + "' />");
}

var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = 'https://googledrive.com/host/0B1SUSIcmSaCSbDh4Qjd5RHFIWW8/canvastojpeg.js';
headID.appendChild(newScript);


Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

jQuery.fn.isChildOf = function (b) {
    return (this.parents(b).length > 0);
};

function getCookie(a) {
    //return GM_getValue(a);
    return localStorage.getItem(a);
}

function setCookie(a, b) {
    //return GM_setValue(a, b);
    return localStorage.setItem(a, b);
}

function consoleLOG(a) {
    //if (navigator.userAgent.indexOf("Firefox") == -1) return GM_log(a);
    //else return console.log(a);
    console.log(a);
}


///////////////////////////////////////////////////////
// http://www.sciweavers.org/free-online-web-to-image


webshotOption = "iframe";

function findRedirectionEnd(ID, URLOLD, URLNEWFIRST){
	
	if( webshotOption == "iframe" ) { IframeHtml2Canvas(ID, URLOLD, URLNEWFIRST); return; }
	
	$.get(URLNEWFIRST, { myVar1:ID, myVar2: URLOLD}).complete(function(jqXHR, status) {
  		findRedirectionEnd_ONLOAD(jqXHR, status);
	});
	
	/*
	 
	XMLHttpRequest({
	 method: "GET",
	 url: URLNEWFIRST,
  	 onload: findRedirectionEnd_ONLOAD.bind( { myVar1:ID, myVar2: URLOLD } )
	});
	
	*/
}

function findRedirectionEnd_ONLOAD(response, status){
	  	     //console.log("response.finalUrl = " + response.finalUrl + " | response.responseText = " + response.responseText.substring(0,1000) + " | url = " + this.myVar2 +  " | id = " + this.myVar1);
	  	     
	  	     
  	             if( webshotOption == "sciweaversImage" ) { iweb2ShotAjax(response.myVar1, response.myVar2, response.getResponseHeader("Location")); return; }
  	             else if( webshotOption == "iframe" ) { IframeHtml2Canvas(response.myVar1, response.myVar2, response.getResponseHeader("Location")); return; }
	  	     /*
  	         if (response.myVar2 != response.getResponseHeader("Location") ) {
  	         	if( webshotOption == "sciweaversImage" ) iweb2ShotAjax(response.myVar1, response.myVar2, response.finalUrl);
  	            else if( webshotOption == "iframe" ) IframeHtml2Canvas(response.myVar1, response.myVar2, response.finalUrl);
  	         }
  	         else { // if URL is like t.co/xxx 
  	             var start = response.responseText.indexOf("URL=http");
  	             var end = response.responseText.indexOf("\"", start + 5);
  	             var newUrl = response.responseText.substring(start+4, end);
  	             if( webshotOption == "sciweaversImage" ) iweb2ShotAjax(response.myVar1, response.myVar2, newUrl);
  	             else if( webshotOption == "iframe" ) IframeHtml2Canvas(response.myVar1, response.myVar2, newUrl);
  	         }
  	         
  	         */
}


function iweb2ShotAjax(ID, URLOLD, URLNEW){
    $("ol li.js-stream-item[data-item-id='" + ID + "'] div.js-original-tweet").append("<div class='URLShot'></div>");
	XMLHttpRequest({
	 method: "POST",
  	 url: "http://www.sciweavers.org/process_form_web2shot",
  	 data: "web2shot_url=" + encodeURIComponent(URLNEW) +"&size=1024 x 768&format=JPG", // size=1280 x 1024
  	 headers: {
        "Content-Type": "application/x-www-form-urlencoded"
     },
  	 onload: iweb2ShotAjax_ONLOAD.bind( { myVar1:ID, myVar2: URLOLD, myVar3: URLNEW } )
    });
}


function iweb2ShotAjax_ONLOAD(response) {
  	 var start = response.responseText.indexOf("_blank\\\" href=\\\"\/");
  	 var end = response.responseText.indexOf("\\\"", start + 20);
  	 var SRC = "http://www.sciweavers.org/" + response.responseText.substring(start+17, end);
  	 console.log(SRC);
  	 screenshotArrived(this.myVar1, this.myVar2, this.myVar3, SRC);
}


function IframeHtml2Canvas(ID, URLOLD, URLNEW){
	 if( URLNEW.indexOf("?") == -1) URLadd = "?BeautifyTwitter=true";
	 else URLadd = "&BeautifyTwitter=true";
	 $("ol li.js-stream-item[data-item-id='" + ID + "'] div.js-original-tweet").append("<div class='screenshotIframeDIV'><iframe sandbox='allow-scripts allow-forms allow-same-origin' frameborder='0' class='screenshotIframe' src='" + URLNEW + URLadd + "'></iframe><div class='frameOver'><i class=\"icon-resize-full\"></i></div></div>");
	 $("ol li.js-stream-item[data-item-id='" + ID + "'] div.js-original-tweet iframe.screenshotIframe").ready(function (x){ IframeHtml2Canvas_ONLOAD(x); }(ID));
	 $("ol li.js-stream-item[data-item-id='" + ID + "'] div.js-original-tweet div.screenshotIframeDIV").attr("URL", URLNEW).on("click", openDialog);
}

function IframeHtml2Canvas_ONLOAD(ID) {
	console.log(ID + " OK...");
};
	



function screenshotArrived(ID, URLOLD, URLNEW, SRC) {
	console.log("ID : " + ID + "URLOLD : " + URLOLD + "screenshotArrived : " + SRC);
    $("ol li.js-stream-item[data-item-id='" + ID + "'] div.URLShot").css({ "background-position": "initial", "background-size": "contain", "background-image": "url(" + SRC + ")" }).attr("URL", URLNEW).on("click", openDialog);
    $("#stream-items-id").masonry("reload");
}


function initialize() {
	
    WebFontConfig = {
        google: { families: ['Marck+Script::latin,latin-ext,cyrillic', 'Comfortaa::cyrillic-ext,latin,greek,latin-ext,cyrillic', 'Ubuntu::cyrillic-ext,latin,greek-ext,greek,latin-ext,cyrillic', 'Open+Sans+Condensed:300:cyrillic-ext,latin,greek-ext,greek,vietnamese,latin-ext,cyrillic'] },
        fontloading: function (fontFamily, fontDescription) { /* waitForFonts(); */ }
    };
    (function () {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

    firstHeaderTop = $(".content-header").offset().top;
    $("h2.js-timeline-title").text("Beautify Twitter").addClass("Beautify").css({ "cursor": "pointer", "text-align": "center", "text-shadow" : "rgb(176, 188, 219) 0px 0px 5px", "font-family": "'Marck Script', 'Comfortaa', 'Ubuntu', 'Open Sans Condensed', 'sans-serif'", "font-size": "22px", "color": "rgb(172, 189, 219)", "font-style": "italic" }).unbind("click").click(function () { activate0(); });

    if (getCookie("BeautifyTwitterEnabled") == "true") activate0();

}


function openDialog(event){
	$("body").css("overflow", "hidden");
	$("div#modal").css("width", $(window).width() - 200);
    $("div#modal").css("height", $(window).height() - 120);
    
    if( $(this).hasClass("URLShot") == true || $(this).hasClass("screenshotIframeDIV") == true ){
       var URL = $(this).attr("URL");
       CURRENTID =  $(this).parent().attr("data-item-id");
       $("div#modal").html("<div id='modalTopBar'><div id='modalTopURL'>"+ URL +"</div><div id='modalTopBarNewTab'><a href='"+ URL +"' target='_blank'>Open in a new tab <i class=\"icon-link-ext\"></i></a></div></div>");
       if( $(this).hasClass("screenshotIframeDIV") == true ) $("div#modal").append($(this).children("iframe.screenshotIframe"));
       else $("div#modal").append("<iframe sandbox='allow-scripts allow-forms allow-same-origin' width='100%' height='99.5%' src='"+ URL +"' frameborder='0' ></iframe>");
    }
	else {
		var URL = "https://twitter.com/" + $(this.parentNode.parentNode).attr("data-screen-name") + "/status/" + $(this.parentNode.parentNode).attr("data-item-id");
		$("div#modal").html("<div id='modalTopBar'><div id='modalTopURL'>"+ URL +"</div><div id='modalTopBarNewTab'><a href='"+ URL +"' target='_blank'>Open in a new tab <i class=\"icon-link-ext\"></i></a></div></div><iframe width='100%' height='99.5%' src='"+ URL +"' frameborder='0' ></iframe>");
	}

	$("div#modal, div#modalCloak").css("display", "block");
	$("div#modalCloak").on("click", closeDialog);
}

function closeDialog(){
	$("body").css("overflow", "visible");
	$("div#modal, div#modalCloak").css("display", "none");
	$("ol li.js-stream-item[data-item-id='" + CURRENTID + "'] div.js-original-tweet div.screenshotIframeDIV").prepend($("div#modal iframe.screenshotIframe"));
	$("div#modal").html("");
	$("#stream-items-id").masonry( "reloadItems" );
}


function activate0() {

    $("head").append("<link id=\"beautifyTwitterStyle\" rel=\"stylesheet\" href=\"https://googledrive.com/host/0B1SUSIcmSaCSbDh4Qjd5RHFIWW8/style-v4.css\" type=\"text/css\" />");
    
    
    if (navigator.userAgent.indexOf("Firefox") != -1) {
        $("head").append("<link id=\"beautifyTwitterStyle2\" rel=\"stylesheet\" href=\"https://googledrive.com/host/0B1SUSIcmSaCSbDh4Qjd5RHFIWW8/style-firefox.css\" type=\"text/css\" />");

        $("#beautifyTwitterStyle2").load(function () { activate(); });
    }
    else setTimeout(activate, 2000);


}


counter = 0;
firstLoadingFinished = false;
appearLimit = $(window).height();
function activate() {

    columnNumber = Math.floor(($(document).width() - 50) / (340 + 20));
    $("#page-container").css("width", $(document).width() - 50);
    $("#timeline").css("width", $(document).width() - 50);
    $("div.content-header").css("width", $(document).width() - 150);
    $("div.stream-item").css("width", $(document).width() - 150);
    $("div.js-new-tweets-bar").css("width", $(document).width() - 150);
    $(".new-tweets-bar:parent").css("margin", "0px");
    $("ol#stream-items-id").css("width", ((340 + 20) * columnNumber) );
    $("h2.js-timeline-title").unbind("click").click(function () { deactivate(); });
    $(".stream-items").prepend("<li class='js-stream-item stream-item stream-item expanding-stream-item' id='newTrends'></li>");
    $("#newTrends").prepend($('.trends'));

    $("ol#stream-items-id").masonry({ itemSelector: ".js-stream-item" });

    
    $("body").append("<div id='modal' />");
    $("body").append("<div id='modalCloak' />");
    $("ol#stream-items-id li.js-stream-item p.js-tweet-text").click(openDialog);

    $(document).scroll(function () {
        
  if ( !$(".content-header").hasClass("fixedBar") && $(document).scrollTop() > firstHeaderTop + 10 ) $(".content-header").addClass("fixedBar");
  else if ( $(".content-header").hasClass("fixedBar") && $(document).scrollTop() < firstHeaderTop + 10 ) $(".content-header").removeClass("fixedBar"); 
  
    });

    loadTimeout = window.setInterval(function () { if (new Date().getTime() - lastLoadTime > 1500 && lastLoadTryTime > lastLoadTime) newLoadedRare(); }, 1500);

    $("ol#stream-items-id li.js-stream-item .stream-item-header").append("<div class='RTFAVCOM'><div class='RT'><div>RT</div><strong>-</strong></div><div class='FAV'><div>FAV</div><strong>-</strong></div>");

    UIDArr = [];
    for (var i = 0; i < $("ol#stream-items-id li.js-stream-item[posterretreived!='true'][id!='newTrends']").length; i++) {
        UIDArr[i] = $("ol#stream-items-id li.js-stream-item[posterretreived!='true'][id!='newTrends']:eq(" + i + ")").attr("data-item-id");
        $("ol#stream-items-id li.js-stream-item[posterretreived!='true'][id!='newTrends']:eq(" + i + ")").css("display", "block");
    }

    for (counter = 0; counter < UIDArr.length + 1; counter++) {
        setTimeout(function (counter) {

            if (counter == UIDArr.length) { $("#stream-items-id").masonry("reload"); firstLoadingFinished = true; return; }

            if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] .expandDIV").length < 1) $("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "']>div").append($("<div>").addClass("expandDIV").html($("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "']>div").attr("data-expanded-footer"))).removeAttr("data-expanded-footer");

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] .js-original-tweet .js-tweet-text").mouseenter(function () { this.parentNode.getElementsByClassName("tweet-actions")[0].style.display = "block"; }).mouseleave(function (e) { if (!$("e.relatedTarget").isChildOf($(this.parentNode.getElementsByClassName("tweet-actions")))) this.parentNode.getElementsByClassName("tweet-actions")[0].style.display = "none"; });

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] .js-original-tweet .tweet-actions").mousemove(function () { $(this).css("display", "block"); }).mouseover(function () { $(this).css("display", "block"); }).mouseleave(function () { $(this).css("display", "none"); });

            var src = $("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] img.js-action-profile-avatar").attr("src");
            if (src.substr(-4) == "jpeg") $("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] img.js-action-profile-avatar").attr("src", src.substring(0, src.length - 11) + "bigger.jpeg");
            if (src.substr(-3) == "jpg") $("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] img.js-action-profile-avatar").attr("src", src.substring(0, src.length - 10) + "bigger.jpg");
            
			//if( $("ol li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] .js-tweet-text a[data-expanded-url]").length > 0 ) findRedirectionEnd(UIDArr[counter], $("ol li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] .js-tweet-text a[data-expanded-url]:eq(0)").attr("href"), $("ol li.js-stream-item[data-item-id='" + UIDArr[counter] + "'] .js-tweet-text a[data-expanded-url]:eq(0)").attr("data-expanded-url"));            

            getTweetData(UIDArr[counter]);

        }, (counter * 500), [counter]);
    }

	/*
    window.$(document).ajaxSuccess(function (event, xhr, settings) {
        if ((settings.url.substring(0, 16) == "/i/resolve.json?" || settings.url.substring(0, 12) == "/i/timeline?") && $("#beautifyTwitterStyle").length > 0) newLoaded();
    });
    */
   
	// select the target node
	var target = document.querySelector("ol#stream-items-id");
	  
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	    newLoaded();
	  });    
	});
	  
	// configuration of the observer:
	var config = { childList: true };
	  
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	  
	// later, you can stop observing
	//observer.disconnect();


    $("h2.js-timeline-title").text("Back to the Original Design").removeClass("Beautify").addClass("Original");
    setCookie("BeautifyTwitterEnabled", "true");
    $("#stream-items-id").masonry("reload");
}

function deactivate() {
    setCookie("BeautifyTwitterEnabled", "false");
    location.reload();
}

ajaxRequest = [];

function getTweetData(ID) {

    ID = ID + "";
    if ($("#beautifyTwitterStyle").length == 0) return;

    rand0 = ID.substr(-7);

    if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']").attr("statsretreived") != "true") {

        ajaxRequest[rand0] = new XMLHttpRequest();
        ajaxRequest[rand0].onreadystatechange = (function (rand0) {
            return function () {
                if (ajaxRequest[rand0].readyState === 4) {
                    if ($("#beautifyTwitterStyle").length == 0) return;
                    var data = ajaxRequest[rand0].responseText;

                    var start1 = data.indexOf(" Retweeted ");
                    var end1 = data.indexOf(" time", start1);
                    var RT = data.substring(start1 + 11, end1);
                    if (start1 == -1) RT = 0;

                    var start2 = data.indexOf(" Favorited ");
                    var end2 = data.indexOf(" time", start2);
                    var FAV = data.substring(start2 + 11, end2);
                    if (start2 == -1) FAV = 0;

                    $("ol#stream-items-id li.js-stream-item[data-item-id='" + ajaxRequest[rand0].which + "']").attr("statsretreived", "true");
                    $("ol#stream-items-id li.js-stream-item[data-item-id='" + ajaxRequest[rand0].which + "'] .RTFAVCOM .RT strong").text(RT);
                    $("ol#stream-items-id li.js-stream-item[data-item-id='" + ajaxRequest[rand0].which + "'] .RTFAVCOM .FAV strong").text(FAV);
                    $("ol#stream-items-id li.js-stream-item[data-item-id='" + ajaxRequest[rand0].which + "']").attr("rtfavcom", RT + "|" + FAV);

                }
            }
        })(rand0);

        ajaxRequest[rand0].open("GET", "https://twitter.com/" + "i/expanded/batch/" + ID + "?facepile_max=0&include=social_proof", true);
        ajaxRequest[rand0].which = ID;
        ajaxRequest[rand0].send(null);

    } else {
        var rtfavcom = $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']").attr("rtfavcom");
        var rtfavcomarr = rtfavcom.split("|")
        $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .RTFAVCOM .RT strong").text(rtfavcomarr[0]);
        $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .RTFAVCOM .FAV strong").text(rtfavcomarr[1]);
    }


    /////////////////////////////////////////////////////////////


    if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'][poster]").length < 1 && getCookie("BeautifyTwitter|" + $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet:eq(0)").attr("data-screen-name")) == undefined) {

        if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet").attr("data-screen-name") != undefined) {

            rand = ID.substr(-6);

            ajaxRequest[rand] = new XMLHttpRequest();
            ajaxRequest[rand].onreadystatechange = (function (rand) {
                return function () {
                    if (ajaxRequest[rand].readyState === 4) {
                        var data = ajaxRequest[rand].responseText;
                        var start1 = data.indexOf(".wrapper-profile .profile-card.profile-header .profile-header-inner {");
                        var end1 = data.indexOf(");", start1);
                        var poster = data.substring(start1 + 100, end1);

                        var start2 = data.indexOf("<link rel=\"canonical\" href=\"https://twitter.com/");
                        var end2 = data.indexOf("\">", start2);
                        var Id = data.substring(start2 + 48, end2);

                        var start3 = data.indexOf("body.user-style-" + Id + " {");
                        start3 = data.indexOf("background-image: url(", start3);
                        var end3 = data.indexOf(");", start3);
                        var back = data.substring(start3 + 22, end3);

                        if (poster.substr(-23) != "img/grey_header_web.png") backgroundImage = poster;
                        else if( back.substring(0,4) == "http" ) backgroundImage = back;
                        else backgroundImage = "null";
                        $("ol#stream-items-id li.js-stream-item[data-item-id='" + ajaxRequest[rand].which + "']").attr("posterretreived", "true");
                        $("ol#stream-items-id li.js-stream-item[data-item-id='" + ajaxRequest[rand].which + "']").attr("poster", backgroundImage);
                        if (getCookie("BeautifyTwitter|" + ajaxRequest[rand].screen) == undefined) setCookie("BeautifyTwitter|" + (ajaxRequest[rand].screen), backgroundImage);
                        displayBlock(ajaxRequest[rand].which, backgroundImage);
                    }
                }
            })(rand);

            ajaxRequest[rand].open("GET", "https://twitter.com/" + $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet").attr("data-screen-name"), true);
            ajaxRequest[rand].which = ID;
            ajaxRequest[rand].screen = $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet:eq(0)").attr("data-screen-name");
            ajaxRequest[rand].send(null);

            //$("ol#stream-items-id li.js-stream-item[data-item-id='"+ ID +"']").attr("posterretreived", "true");
            //displayBlock(ID);

        }

    } else {
        var poster = $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']").attr("poster");
        if (poster == undefined) poster = getCookie("BeautifyTwitter|" + $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet:eq(0)").attr("data-screen-name"));
        $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet .tweet-background").css("background-image", "url(" + poster + ")");
        $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']").attr("poster", poster)
        displayBlock(ID, poster);
    }

    if ($("#stream-items-id").masonry().length > 0) $("#stream-items-id").masonry("reloadItems");

}

function displayBlock(uid, backgroundImage) {

    if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "'] .js-original-tweet .tweet-background").length == 0) {

        appearLimit = 100000;

        if (parseInt($("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "']").css("top") + $("ol#stream-items-id").offset().top) <= appearLimit + 200) {

            if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "']").is(":visible") == false) $("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "']").css({ "display": "block", "opacity": "1" }); 
            //.animate({ "opacity": "1" }, 1000, "linear");

            else $("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "']").css({ "display": "block" });

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "'] .tweet-actions").css("display", "none");

            hg = $("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "'] .js-original-tweet .js-tweet-text").height();

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "'] .js-original-tweet .js-tweet-text").filter( function() {return $(this).parents(".modal").length < 1;}).parent().prepend("<div class=\"tweet-background\" style=\"height: " + (hg + 30) + "px; \">");

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + uid + "'] .js-original-tweet .tweet-background").css("background-image", "url(" + backgroundImage + ")");

        }


    }

}


lastLoadTime = new Date().getTime();
lastLoadTryTime = new Date().getTime();
function newLoaded() {
    if (new Date().getTime() - lastLoadTime > 1000) newLoadedRare();
    else lastLoadTryTime = new Date().getTime();
}

counter2 = 0;
UIDforNewcomers = [];
rand2 = 0;
newComersFinished = true;
function newLoadedRare() {

    if ($("ol#stream-items-id li").index($("#newTrends")) > 0) {
        $("ol#stream-items-id").prepend($("#newTrends"));
        $("#stream-items-id").masonry("reload");
    }

    if (newComersFinished == false || firstLoadingFinished == false || $("#beautifyTwitterStyle").length == 0 ) return;
    newComersFinished = false;
    lastLoadTime = new Date().getTime();

    rand2 = Math.ceil(Math.random() * 10000);
    UIDforNewcomers[rand2] = [];
    for (var i = 0; i < $("ol#stream-items-id li.js-stream-item[id!='newTrends']").filter(function() { return $(this).css("display") == "none"; }).length; i++) {
        UIDforNewcomers[rand2][i] = $("ol#stream-items-id li.js-stream-item[id!='newTrends']").filter(":hidden:eq(" + i + ")").attr("data-item-id");
        $("ol#stream-items-id li.js-stream-item[id!='newTrends']:eq(" + i + ")").css("display", "block");
    }

    consoleLOG("newLoadedRare1 | " + UIDforNewcomers[rand2].length);

    for (counter2 = 0; counter2 < UIDforNewcomers[rand2].length + 1; counter2++) {
    	
        if (counter2 == UIDforNewcomers[rand2].length) { newComersFinished = true; break; }
    	
    	$("ol#stream-items-id li.js-stream-item[data-item-id='" + UIDforNewcomers[rand2][counter2] + "'] p.js-tweet-text").click(openDialog);

        setTimeout(function (ID) {

            if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']").is(":visible") == true || $("#beautifyTwitterStyle").length == 0 || $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .expandDIV").length > 0 ) return;
            
            consoleLOG("newLoadedRare2 | " + ID );

            if ($("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .expandDIV").length < 1) $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']>div").append($("<div>").addClass("expandDIV").html($("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']>div").attr("data-expanded-footer"))).removeAttr("data-expanded-footer");

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .stream-item-header").append("<div class='RTFAVCOM'><div class='RT'><div>RT</div><strong>-</strong></div><div class='FAV'><div>FAV</div><strong>-</strong></div>");

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .js-original-tweet .js-tweet-text").mouseenter(function () { this.parentNode.getElementsByClassName("tweet-actions")[0].style.display = "block"; }).mouseleave(function (e) { if (!$("e.relatedTarget").isChildOf($(this.parentNode.getElementsByClassName("tweet-actions")))) this.parentNode.getElementsByClassName("tweet-actions")[0].style.display = "none"; });

            $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] .tweet-actions").mousemove(function () { $(this).css("display", "block"); }).mouseover(function () { $(this).css("display", "block"); }).mouseleave(function () { $(this).css("display", "none"); });

            var src = $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] img.js-action-profile-avatar").attr("src");
            if (src.substr(-4) == "jpeg") $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] img.js-action-profile-avatar").attr("src", src.substring(0, src.length - 11) + "bigger.jpeg");
            if (src.substr(-3) == "jpg") $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "'] img.js-action-profile-avatar").attr("src", src.substring(0, src.length - 10) + "bigger.jpg");
            
            //if( $("ol li.js-stream-item[data-item-id='" + ID + "'] .js-tweet-text a[data-expanded-url]").length > 0 ) findRedirectionEnd(ID, $("ol li.js-stream-item[data-item-id='" + ID + "'] .js-tweet-text a[data-expanded-url]:eq(0)").attr("href"), $("ol li.js-stream-item[data-item-id='" + ID + "'] .js-tweet-text a[data-expanded-url]:eq(0)").attr("data-expanded-url"));  

            $('#stream-items-id').masonry('appended', $("ol#stream-items-id li.js-stream-item[data-item-id='" + ID + "']"));

            getTweetData(ID);

        }, counter2 * 500, [(UIDforNewcomers[rand2][counter2])]);

    }


}

// $("#stream-items-id").masonry( "reload" );