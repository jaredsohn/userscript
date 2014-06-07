// ==UserScript==
// @name           ggbx
// @include        *gagabux.com/ads.php*
// @include        *gagabux.com/cks.php*
// ==/UserScript==


var nHtml = {
    TestClick: function(obj) {
        obj.style.border = '3px solid #f00'; return;
    },
    Click: function(obj) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,
		1, 0, 0, 0, 0, false, false, false, false, 0, null);
        return !obj.dispatchEvent(evt);
    }
};

BUX = {
    CheckClickedPage: function() {
        var bar = document.getElementById('bar');
		var seconds = document.getElementById('seconds');
		var secsNum = parseInt(seconds.innerHTML);
		
        if (!bar) {
            GM_log('need to close page, and reload the main page');
            window.setTimeout(function() {
                window.close();
            }, Math.floor(3 + Math.random() * 5) * 1000);
            return;
        }
		if(bar.style.display == "none" || secsNum == 100){
			window.setTimeout(function() {
                GM_log('close window');
                // wait for the ajax to record your ad viewing
                window.close();
            }, Math.floor(5 + Math.random() * 5) * 1000);
            return;
		}

        window.setTimeout(function() {
            BUX.CheckClickedPage();
        }, 1000);
    },

    IsHidden: function(obj) {
        var hidden = false;
        var pdiv = obj;
        var count = 0;
        while (pdiv && count < 200) {
            if (pdiv.tagName == 'BODY') { break; }
            if (pdiv.style.display == 'none') {
                hidden = true;
                break;
            }
            pdiv = pdiv.parentNode;
            count++;
        }
        return hidden;
    },

    clicked: {},
    ClickRedDot: function() {
		var imgs = document.getElementsByTagName('img');
		
		var clicked = 0;
		for(var w = imgs.length-1; w >= 0; w--){
			
			var currentImg = imgs[w];
            if (this.IsHidden(currentImg)) {
                continue;
            }
			
			var currentLink = currentImg.parentNode;
			if (!currentImg.src || currentImg.src.indexOf('dot.png') < 0 || this.clicked[currentLink.href]) {
				continue;
			}
			
			var oncl = currentImg.getAttribute('onclick');
			if (!oncl || oncl.indexOf('star')<0){ continue; }
			
			this.clicked[currentLink.href] = 1;
			GM_log('click ad: ' + currentLink.href);
			
			nHtml.Click(currentImg);
			window.open(currentLink.href);
			
			window.setTimeout(function() {
				window.history.go(0);
			}, Math.floor(38 + Math.random() * 5) * 1000);
            break;
		}
     },
	
    ClickLinks: function() {
        var links = document.getElementsByTagName('a');
		
        var resetRe = /reset.*balance/;
        var notClickRe = /not *click/i;
        var clicked = 0;
        for (var a = links.length-1; a >= 0; a--){
            var currentLink = links[a];
			var onclck = currentLink.getAttribute('onclick');
            if (!onclck || onclck.indexOf('clt(') < 0) { continue; }
            if (this.IsHidden(currentLink)) {
                GM_log('is hidden:' + sobj.href);
                continue;
            }
            var tr = currentLink;
            var trOk = false;
            while (tr && tr.tagName != "BODY") {
                if (tr.tagName == "TR") {
                    if (tr.innerHTML.indexOf('novo_32.png') >= 0) {
                        trOk = true;
                    }
                }
                tr = tr.parentNode;
            }
            if (!trOk) { continue; }

            var ahtml = currentLink.innerHTML.toLowerCase();
            if (resetRe.exec(ahtml) || notClickRe.exec(ahtml)) { continue; }
            if (ahtml.indexOf('cheat') >= 0) { continue; }
			if (ahtml.indexOf('suspend') >= 0) { continue; }
            GM_log('click link:' + onclck);
            nHtml.Click(currentLink);
            clicked++;
            window.setTimeout(function() {
                BUX.ClickRedDot();
            }, Math.floor(Math.random() * 5) * 1000);
            return;
        }

        if (!clicked) {
            window.setTimeout(function() {
                window.history.go(0);
            }, Math.floor(60 + Math.random() * 250) * 1000);
        } else {
        }
    }

};

window.addEventListener("load", function(e) {
    var pathname = location.pathname;
    if (pathname == "/ads.php") {
        BUX.ClickLinks();
    } else if (pathname.substring(0, 8) == "/cks.php") {
        BUX.CheckClickedPage();
    }
}, false);