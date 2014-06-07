// ==UserScript==
// @id             oldpr0gramm
// @name           gibeOldPr0grammPls
// @version        2.3
// @namespace      hurrdurr
// @author         lawl
// @description    Fairly stable now
// @include        http://pr0gramm.com/*
// @license        WTFPL
// @run-at         document-end
// ==/UserScript==
//Copy pasted from http://wiki.greasespot.net/Content_Scope_Runner
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
    (function page_scope_runner() {
        // If we're _not_ already running in the page, grab the full source
        // of this script.
        var my_src = "(" + page_scope_runner.caller.toString() + ")();";

        // Create a script node holding this script, plus a marker that lets us
        // know we are running in the page scope (not the Greasemonkey sandbox).
        // Note that we are intentionally *not* scope-wrapping here.
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

        // Insert the script node into the page, so it will run, and immediately
        // remove it to clean up.  Use setTimeout to force execution "outside" of
        // the user script scope completely.
        setTimeout(function () {
            document.body.appendChild(script);
            document.body.removeChild(script);
        }, 0);
    })();

    // Stop running, because we know Greasemonkey actually runs us in
    // an anonymous wrapper.
    return;
}

var hasQjUi = false;
var longclicktimer = 0;
var disableClick = false;
var scaled = false;
var oldurl = null;
var disableEventListener = false;


var modCSS = "\
.item-comments { \
  position: fixed !important; \
  top: 0 !important; \
  left: 0 !important; \
  width: 300px !important; \
  height: 100vh !important; \
  max-height: 100vh !important; \
  overflow-y: auto !important; \
  overflow-x: hidden !important; \
} \
.item-comments textarea.comment { \
  resize: none !important; \
} \
div.comment-box > div.comment-box { \
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.1) !important; \
    padding: 0 0 0 6px !important; \
} \
#page { \
    left: 150px !important; \
} \
#head { \
    left: 300px !important; \
} \
#stream-next{ \
	position: fixed !important; \
	left:inherit !important; \
	right: 0px; \
	z-index:70 !important \
} \
#stream-prev{ \
	right: inherit !important; \
	left: 310px !important; \
	z-index:70 !important \
} \
.item-info { \
	position:fixed !important; \
	bottom: 0 !important; \
	background-color: #2A2E31; \
	width:100%; \
	left: 300px; \
} \
.tag{ \
	background-color: #1A1E21 !important\
} \
.item-pointer { \
	display: none !important; \
} \
.item-image { \
	visibility: none; \
} \
";

addCSS(modCSS);
installJQUI();


document.addEventListener("DOMMouseScroll", handleWheel, false);
document.addEventListener("mousewheel", handleWheel, false);

installLightbox();
var stream=byid('stream');
if(stream != null) {
	stream.addEventListener('DOMNodeInserted', handleInserts, false);
}

/*
installLightbox();

byid('stream').addEventListener('DOMNodeInserted', handleInserts, false);
*/

//force actual reload, to work around bug
//byid('tab-new').onclick=function(){location.reload()}
//byid('tab-top').onclick=function(){location.reload()}


// first pageload we don't get DOMNodeInserted, and shit is dynamically inserted? wtf?
// well, we'll workaround it by probing the first 10s for an image (in case of link to and img)
// and then abort assuming it's not an image link, because we're too lazy to parse URL's
$(document).ready(function () {
    var cnt = 0;
    var interval = setInterval(function () {
        if (cnt >= 100) {
            //give up
            clearInterval(interval);
        }
        if (document.getElementsByClassName("item-image").length != 0) {
            clearInterval(interval);
            updateImg();
            showLightbox();
        }
        cnt++;
    }, 100);
});


var urlMon = setInterval(function(){
	
	var url = (window.location+'').split(/\//)[3];
	
	if(oldurl===null){
		oldurl=url;
		return; //skip first time
	}
	if(oldurl!=url) {
		oldurl=url;
		setupSite(url);
		closeLightboxIfNeeded(url);
	}
	
},500);



function closeLightboxIfNeeded(url) {
	if(url!="user" && url != "inbox") {
		return;
	}
	var wrapper = document.getElementsByClassName("item-image-wrapper");
	if (wrapper.length != 0) {
		wrapper[0].click();
	}
	hideLightbox();
}


function setupSite(url){
	installLightbox();
	if(byid('stream') != null){
		byid('stream').addEventListener('DOMNodeInserted', handleInserts, false);
	}
}

function handleInserts(e) {

    if (disableEventListener == true) {
        return;
    }

    var el = e.target;

    if ($(el).hasClass("item-container")) {
        updateImg(true);
        showLightbox();
    }

}
/* Nicht sicher ob noch brauche
$(document).on('click','.item-container', function(e) {
	var target = $(e.target);    
	if (target.parents('.item-comments').length || target.parents('.item-info').length  || target.hasClass("item-comments")) {
        return false;
    }
	hideLightbox();
});*/


function installLightbox() {
    var lb = document.createElement("div");
    lb.id = "lb";
    lb.addEventListener("click", function (e) {
        if (e.target.id == "lb") {
            reinstallLightbox();
            var wrapper = document.getElementsByClassName("item-image-wrapper");
            if (wrapper.length != 0) {
                wrapper[0].click();
            }
        }
    }, false);

    lb.setAttribute('style', 'position:fixed; width:100%; height:100%; left:-150px; margin-left:300px; top:-28px; z-index:50; background-color:#000;text-align:center;background-color: rgba(0,0,0,0.8);display:none;"');
    lb.innerHTML = '<span id="lbcontent"></span>';

    document.body.appendChild(lb);

    lb.addEventListener('DOMNodeInserted', handleInserts, false)

}

function updateImg(noChangeDom) {
    //byid('img').src=document.getElementsByClassName("item-image")[0].src;

    if (document.getElementsByClassName("item-container").length == 0) {
        return false;
    }

    if (noChangeDom || 1) {
        disableEventListener = true;
        var q = document.getElementsByClassName("item-container")[0];
        byid('lbcontent').appendChild(q.parentNode.removeChild(q));
        disableEventListener = false;
    }


    setTimeout(function () { // settimeout,0, give the browser 1 more tick
        var img = document.getElementsByClassName("item-image");

        if (img.length != 0) {
            img = img[0];
            $(img).bind('load', function () {
                $(img).unbind();
                scaleImg($(img));
                centerImg(img);
                img.style.visibility="";
                makeImgDraggable(img);
                $('#lb').mouseup(function (e) {
                    clearTimeout(longclicktimer);
                });
                $('#lb').mousedown(function () {
                    if (scaled) {
                        longclicktimer = setTimeout(function () {
                            $(img).css({
                                height: '',
                                width: ''
                            });
                            scaled = false;
                            disableClick = true;
                            makeImgDraggable(img); //somehow needed again, dunno why
                        }, 300);
                    }
                });
            }).each(function () {
                if (this.complete) $(this).load();
            });
        }

    }, 0);

    return true;
}

function handleWheel(event) {
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
    } else if (event.detail) { /** Mozilla case. */
        delta = -event.detail / 3;
    }
    var imgs = document.getElementsByClassName("item-container");


    if (imgs.length != 1 || (!isHover(imgs[0]) && !isHover(byid('lb'))) || isHover(document.getElementsByClassName("item-comments")[0])) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (delta < 0) {
		if(byid('stream-next') != null) {
			byid('stream-next').click();
			showLightbox();
			updateImg();
        }
    } else {
		if(byid('stream-prev') != null) {
			byid('stream-prev').click();
			showLightbox();
			updateImg();
		}
    }
}

function isHover(e) {
    return (e.parentElement.querySelector(':hover') === e);
}

function byid(id) {
    return document.getElementById(id);
}

function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function showLightbox() {
    byid('lb').style.display = "";
}

function hideLightbox() {
    if (disableClick == true) {
        disableClick = false;
        return;
    }
    byid('lb').style.display = "none";
}

function reinstallLightbox() {
    var lb = byid('lb');
    lb.parentNode.removeChild(lb);
    installLightbox();
}


function scaleImg(img) {
    if (img.height() == 0 || img.width() == 0) {
        return; //to lazy to and an onload handler now
    }
    var wh = parseInt($(window).height()) - 69;
    var ww = parseInt($(window).width()) - 300;

    if (img.height() > wh) {
        var h = wh;
        var w = Math.ceil(img.width() / img.height() * wh);
    } else if (img.width() > ww) {
        var w = ww;
        var h = Math.ceil(img.height() / img.width() * ww);
    } else {
        return;
    }
    img.css({
        height: h,
        width: w
    });
    scaled = true;
}

function makeImgDraggable(img) {
    if (hasQjUi) {
        $(img).draggable({
            stop: function (event, ui) {
                $(this).css("position", "fixed");
            }
        });
    }
}

function centerImg(img) {
    var div_height = $("#lb").height() - 34;
    var div_width = $("#lb").width() + 300;
    $(img).each(function () {
        $(this).css({
            "top": (div_height - $(this).height()) / 2 + "px",
            "left": (div_width - $(this).width()) / 2 + "px",
            "position": "fixed"
        });
    });
}

function installJQUI() {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js");
    document.getElementsByTagName("head")[0].appendChild(fileref);
    fileref.onload = function () {
        hasQjUi = true;
    }
}
