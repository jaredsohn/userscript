// ==UserScript==   
// @name           Twitter URL disintertwitifier
// @description    Cuts out the middlemen in most Twitter timeline links
// @namespace      http://www.adjustablelabs.info/gm_scripts/disintertwitifier
// @include        http://*twitter.com/*
// @include        http://twitter.com/*
// @include        https://*twitter.com/*
// @include        https://twitter.com/*
// @grant          none
// @version	   0.3+pre4
// ==/UserScript==

// Loosely based on jadi's Twitter URL shortener.


// disabled for now... page appears to deliberately break/usurp console

//var Console = unsafeWindow.console;
var Console = {
    log: function() {}
};


var dwarn = true ? function(msg) {
    window.alert(msg);
} : function() {
};

var dlog = false ? function(msg) {
    window.alert(msg);
} : function() {
};


function disintertwitify(ctx) {
    if (!(typeof ctx === 'object' && ctx instanceof Node))
	ctx = document;

    if (!ctx instanceof Node)
	return true;

    if (!ctx.querySelectorAll)
	return;

    var start = Date.now();
    var links = ctx.querySelectorAll("a.twitter-timeline-link:not([data-gm-url-expanded])");

    var work = [];

    function fix(link, nurl) {
	//work.push(link.href + " -> " + nurl);
	link.setAttribute("href", link.href = nurl);
	link.setAttribute("data-gm-url-expanded", "true");
	//link.textContent = "→" + link.textContent;
    }


    for (var i=0;i<links.length;i++){

	var link = links[i];	
	var linkText = link.firstChild;

	var nurl = null;

	if (nurl = link.getAttribute("data-expanded-url")) {
	    fix(link, nurl);
	} else if (nurl = link.getAttribute("data-ultimate-url")) {
	    fix(link, nurl);
	}
    }

    start = Date.now() - start;
    //Console.log("processed " + links.length + " items in " + start + "ms:\n" + work.join("\n"));

}


//gmScan();

//setInterval(disintertwitify, 5000);

var ntry = 0;

function attackTimeline() {
    var tl;

    var id = "stream-items-id";
    var path = window.location.pathname.split("/");
    if (path[2] && path[2].indexOf('status') >= 0)
	tl = document.querySelectorAll(".permalink")[0];
    else
	tl = document.getElementById("stream-items-id");

    if (!(tl)) {
	// fall back to old method if on e.g. tweet page
	if (ntry++ > 6) {
	    dwarn("Couldn't capture timeline " + id);
	    return setInterval(disintertwitify, 5000);
	}

	return setTimeout(attackTimeline, 100 + 200 * ntry);
    }

    dlog("Captured timeline, try " + ntry + ", id " + id);

    new MutationObserver(function(muts) {
	muts.forEach(function(mut) {
	    for (var i = 0; i < mut.addedNodes.length; i++) {
		var an = mut.addedNodes.item(i);
		disintertwitify(an);
	    }
	});
    }).observe(tl, {
	childList: true,
	subtree: true
    });

    disintertwitify();
}

function attackContainer() {
    var tl;

    if (!(tl = document.getElementById("page-container"))) {
	// fall back to old method if on e.g. tweet page
	if (ntry++ > 6) {
	    dwarn("Couldn't capture container");

	    return setInterval(disintertwitify, 5000);
	}

	return setTimeout(attackContainer, 100 + 200 * ntry);
    }

    new MutationObserver(function(muts) {
	muts.forEach(function(mut) {
	    if (mut.target.id != 'page-container')
		return;

	    dlog("container attr modified", mut.target.getAttribute("class"));

	    ntry = 0;

	    attackTimeline();
	    disintertwitify();
	});
    }).observe(tl, {
	attributes: true,
	attributeFilter: ['class']
    });

    var sty = document.createElement("style");
    sty.type = 'text/css';
    sty.id = 'disintertwitify';
    sty.innerHTML = 
	"a[data-gm-url-expanded]:before { content: '\u2192'; }\n" +
	"a[data-gm-url-expanded] { color: green; }" ;

    document.head.appendChild(sty);

    disintertwitify(tl);
    dlog("captured container, try " + ntry);
}

attackContainer();

setTimeout(function() {
	//disintertwitify();
}, 2000);

// backstop

document.body.addEventListener("click", fixLink, true);
document.body.addEventListener("contextmenu", fixLink, true);

function fixLink (event) {
    var et = event.target;
    while (et) {
	if (!et.tagName)
	    return true;
	if (et.tagName.toLowerCase() == 'a' && et.href.indexOf("t.co") >= 0)
	    break;
	et = et.parentNode;
    }

    if (!et)
	return true;

    var nurl = et.getAttribute("data-expanded-url") || et.getAttribute("data-ultimate-url");

    dlog("Clicky " + et.tagName + " " + et.href + "\n ->" + nurl);

    if (!nurl)
	return;

    et.setAttribute("href", et.href = nurl);
    et.setAttribute("data-gm-url-expanded", "true");

    return true;
}
