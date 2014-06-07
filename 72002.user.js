// ==/UserScript==
// ==UserScript==
// @id             easyfuckr-f092638f-032b-498a-bbc3-060e1fb13d2d
// @name           easyfuckr
// @version        1.1
// @namespace      
// @author         kloetpatra
// @description    
// @include        http://4fuckr.com/*
// @include        http://www.4fuckr.com/*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

tooltip = {
  name : "ttip",
  offsetX : 24,
  offsetY : 8,
  lastx : 0,
  lasty : 0,
  height : 0,
  width  : 0,
  tip : null,
  img : null,
  hurl: null,
  _show: false
}

tooltip.init = function () {
	var t = this;
	var tipNameSpaceURI = "http://www.w3.org/1999/xhtml";
	if(!tipCID){ var tipCID = this.name;}
	var tipC = document.getElementById(tipCID);

	if(!tipC) {
	  tipC = document.createElementNS ? document.createElementNS(tipNameSpaceURI, "div") : document.createElement("div");
		tipC.setAttribute("id", tipCID);
	  document.getElementsByTagName("body").item(0).appendChild(tipC);
	}
	

	if (!document.getElementById) return;
	this.tip = document.getElementById (this.name);
	this.setCSS();
	
	if(!this.img) {
	    this.img = document.createElement('img');
		this.tip.appendChild(this.img);
		this.img.addEventListener('load', function () { tooltip.show(); tooltip.adjust();}, false);
	}
	
	if (this.tip) window.addEventListener('mousemove',function (evt) {tooltip.move (evt)},false);
	
	var a, sTitle, elements;
	
	elements = document.getElementsByTagName("a");
	if(elements)
	{
		for (var i = 0; i < elements.length; i ++)
		{
			a = elements[i];
			if((a.getAttribute("class") == "thumb image" || a.href.search(/image_/) != -1) && (!a.hasAttribute("tiptitle")))
			{
			    if (typeof(unsafeWindow.x)=="undefined") {

			    } else {
    				var ref = unsafeWindow.x[a.rel].split(":");
    				a.href = "http://4fuckr.com/g/" + ref[1] + "/" + ref[0];
    			}
				a.setAttribute("tiptitle", a.href);
				a.childNodes[0].title="";
				a.addEventListener('mouseover', function() {tooltip._show = true; tooltip.hurl = this.getAttribute("tiptitle"); tooltip.check(this);}, false);
				a.addEventListener('mouseout',  function() {tooltip.hide(); tooltip.hurl = null;}, false);
			}
		}
	}
}

tooltip.setCSS = function () {
	this.tip.style.position = "fixed";
	this.tip.style.padding = "2px";
	this.tip.style.border = "1px solid #333";
	this.tip.style.borderRightWidth = "2px";
	this.tip.style.borderBottomWidth = "2px";
	this.tip.style.display = "none";
	this.tip.style.background = "#777";
	this.tip.style.color = "#fff";
	this.tip.style.textAlign = "left";
	this.tip.style.zIndex = "999";
}

tooltip.move = function (evt) {
	var x=0, y=0, x_fix=0, y_fix=0;
	if (document.all) {
		x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
		y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
		x += window.event.clientX;
		y += window.event.clientY;
		
	} else {
		x = evt.clientX;
		y = evt.clientY;
	}
	
	this.lastx = x;
	this.lasty = y;

	this.adjust();

}

tooltip.adjust = function () {
	view_w = window.innerWidth;
	view_h = window.innerHeight;
	div_w  = this.tip.offsetWidth;
	div_h  = this.tip.offsetHeight;
	x = this.lastx;
	y = this.lasty;
	
	if (x > view_w/2) {
		this.tip.style.left  = "auto";
		this.tip.style.right = (view_w - x + this.offsetX) + "px";
	} else {
		this.tip.style.right = "auto";
		this.tip.style.left = (x + this.offsetX) + "px";
	}

	this.tip.style.bottom = "auto";
	this.tip.style.top = "auto";
	if ( y+div_h+12 > view_h) {
		this.tip.style.bottom = "0px";
	} else {
		this.tip.style.top = (y + this.offsetY ) + "px";
	}
	
	if ( div_h+12 > view_h ) {
		this.img.style.height = view_h-14 + "px";
	}
	
}

tooltip.show = function () {
	if (!this.tip || !this._show) {
		return;
	}
	this.tip.style.display = "block";
}

tooltip.setimg = function (url) {

    this.img.src = url;
	this.img.style.height = "auto";
	this.img.style.width = "auto";
}


tooltip.hide = function () {
	if (!this.tip) {
		return;
	}
	this.tip.style.display = "none";
	this._show = false;
}

tooltip.check = function (item) {
	window.setTimeout( function () { fetch_data(item) }, 125 );
}

function fetch_data (item) {
	if (tooltip.hurl != item.getAttribute('tiptitle')) {
		return;
	}
	var location = item.getAttribute('tiptitle')
	GM_xmlhttpRequest({
		method: 'GET',
		url: location,
		onload: function(responseDetails) {
                    if (responseDetails.finalUrl.search(/\/image_\d+.htm/) < 0 &&
                        responseDetails.finalUrl.search(/\/video_\d+.htm/) < 0)
                    {
                        $(item).children().hide(0);
                        $(item).parent().css({ background: "#000000" });
                    }
					var Ausdruck = /<img src="([^"]*?)"[^>]*?id="mypic"[^>]*?>/;
					Ausdruck.exec(responseDetails.responseText);
					var html = RegExp.$1;
					if (tooltip.hurl == item.getAttribute('tiptitle'))
					{
						tooltip.setimg(RegExp.$1);
					}
		}
	});
}

function remove_stuff() {

    $("#content").prevUntil("body").remove();
	
	var el = document.getElementsByTagName("a");
	for (var i=0; i < el.length; i++) {
		
		if (el[i].href.search(/\/page_\d+\.htm/) >= 0 || el[i].href.search(/\/user_\d+_\d+\.htm/) >= 0 ) {
			el[i].style.fontSize = '2.8em';
			el[i].style.color = '#888888';
			el[i].style.fontWeight = 'normal';
			el[i].style.textDecoration = 'none';
			el[i].style.border = '1px solid #434343';
		}
		
		/*
		if (el[i].getAttribute("class") == 'thumb') {
			if (el[i].href.search(/\/image_\d+\.htm/) == -1) {
				el[i].parentNode.style.display = 'none';
			}        
		}
		*/
	}
    


	var mypic = document.getElementById("mypic");
	if (mypic) {
		mypic.setAttribute("class", "");
		mypic.style.width = "auto";
	}

/*

	var tmp = document.getElementById("top");
	if (tmp) {
		tmp.parentNode.removeChild(tmp);
	}
	
	var tmp = document.getElementById("message");
	if (tmp) {
		tmp.parentNode.removeChild(tmp);
	}
	
	var bodyEl = document.getElementsByTagName("body")[0].childNodes;
	for (var i=0; i < bodyEl.length; i++) {
		if (bodyEl[i].nodeName == "A") {
			//console.log (bodyEl[i].nodeName);
			bodyEl[i].style.display = "none";
		}
	}
	
	var el = document.getElementById("system-message");
	el.parentNode.removeChild(el);
	
	if (document.URL.search(/\/image_\d+\.htm/) != -1) {
		var tmp = document.getElementById("rightmenu");
		if (tmp) {
			tmp.parentNode.removeChild(tmp);
		}
	}
*/


}

function test() {
    console.log($("#comments_image>div>div>iframe").parent().remove());

	var a, sTitle, elements;
	
	elements = document.getElementsByTagName("a");
	if(elements)
	{
		for (var i = 0; i < elements.length; i ++)
		{
			a = elements[i];
			if((a.getAttribute("class") == "thumb image" || a.href.search(/image_/) != -1) && (!a.hasAttribute("tiptitle")))
			{
			    if (typeof(unsafeWindow.x)=="undefined") {

			    } else {
    				var ref = unsafeWindow.x[a.rel].split(":");
    				a.href = "http://4fuckr.com/g/" + ref[1] + "/" + ref[0];
    			}
				a.setAttribute("tiptitle", a.href);
				a.childNodes[0].title="";
				a.addEventListener('mouseover', function() {tooltip._show = true; tooltip.hurl = this.getAttribute("tiptitle"); tooltip.check(this);}, false);
				a.addEventListener('mouseout',  function() {tooltip.hide(); tooltip.hurl = null;}, false);
			}
		}
	}
}

waitForKeyElements ("#comment-show", test);

function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
)
{
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                500
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

tooltip.init();
remove_stuff();