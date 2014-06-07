// ==UserScript==
// @name           ernbz
// @include        *earn.bz/mini-ads.php*
// @include        *earn.bz/cksmini.php*
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
        var links = document.getElementsByTagName('a');

        var clicked = 0;
        for (var a = links.length-1; a >= 0; a--) {
            var currentLink = links[a];
            if (this.IsHidden(currentLink)) {
                continue;
            }
		
			if (!currentLink.href || currentLink.href.indexOf('cksmini.php') < 0 || this.clicked[currentLink.href]) {
				var oncl = currentLink.getAttribute('onclick');
				if (!oncl || oncl.indexOf('openad')<0){ continue; }
				
				this.clicked[currentLink.href] = 1;
				GM_log('click ad: ' + currentLink.href);
				
				nHtml.Click(currentLink);
				
				window.setTimeout(function() {
					window.history.go(0);
				}, Math.floor(38 + Math.random() * 5) * 1000);
            break;
			} 
			
            this.clicked[currentLink.href] = 1;
            GM_log('click ad: ' + currentLink.href);
            window.open(currentLink.href);
            //		nHtml.Click(currentLink);
            window.setTimeout(function() {
                // wait till the ad page closes then reload.
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
                    if (tr.innerHTML.indexOf('novo_32.jpg') >= 0) {
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
    if (pathname == "/mini-ads.php") {
        BUX.ClickLinks();
    } else if (pathname.substring(0, 12) == "/cksmini.php") {
        BUX.CheckClickedPage();
    }
}, false);