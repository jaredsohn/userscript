// ==UserScript==
// @name           gaealer
// @include        http://*earn.bz/ads.php*
// @include        http://*earn.bz/cks.php*
// @include        http://*gagabux.com/ads.php*
// @include        http://*gagabux.com/cks.php*
// @include        http://*buxler.net/ads.php*
// @include        http://*buxler.net/cks.php*
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

gaealer = {
    CheckClickedPage: function() {
		var seconds = document.getElementById('seconds');
		var secsNum = parseInt(seconds.innerHTML);
		
        if (!seconds) {
            GM_log('need to close page, and reload the main page');
            window.setTimeout(function() {
                window.close();
            }, Math.floor(3 + Math.random() * 5) * 1000);
            return;
        }
		if(secsNum == 100){
			window.setTimeout(function() {
                GM_log('close window');
                // wait for the ajax to record your ad viewing
                window.close();
            }, Math.floor(5 + Math.random() * 5) * 1000);
            return;
		}

        window.setTimeout(function() {
            gaealer.CheckClickedPage();
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
        var as = document.getElementsByTagName('a');

        var clicked = 0;
        for (var a = 0; a < as.length; a++) {
            var aObj = as[a];
            if (this.IsHidden(aObj)) {
                continue;
            }
            if (!aObj.href || aObj.href.indexOf('cks.php') < 0 || this.clicked[aObj.href]) {
                continue;
            }
            this.clicked[aObj.href] = 1;
            GM_log('click ad:' + aObj.href);
            window.open(aObj.href);
            //		nHtml.Click(aObj);
            window.setTimeout(function() {
                // wait till the ad page closes then reload.
                window.history.go(0);
            }, Math.floor(38 + Math.random() * 10) * 1000);
            break;
        }
    },
	
    ClickLinks: function() {
        var as = document.getElementsByTagName('a');
		
        var resetRe = /reset.*balance/;
        var notClickRe = /not *click/i;
        var clicked = 0;
        for (var a = 0; a < as.length; a++) {
            var aObj = as[a];
            var oncl = aObj.getAttribute('onclick');
            if (!oncl || oncl.indexOf('clt(') < 0) { continue; }
            if (this.IsHidden(aObj)) {
                GM_log('is hidden:' + sobj.href);
                continue;
            }
            var tr = aObj;
            var trOk = false;
            while (tr && tr.tagName != "BODY") {
                if (tr.tagName == "TR") {
                    if (tr.innerHTML.indexOf('novo_32.png') >= 0 || tr.innerHTML.indexOf('novo_32.jpg') >= 0) {
                        trOk = true;
                    }
                }
                tr = tr.parentNode;
            }
            if (!trOk) { continue; }

            var ahtml = aObj.innerHTML.toLowerCase();
            if (resetRe.exec(ahtml) || notClickRe.exec(ahtml)) { continue; }
            if (ahtml.indexOf('cheat') >= 0) { continue; }
			if (ahtml.indexOf('suspend') >= 0) { continue; }
            GM_log('click link:' + oncl);
            nHtml.Click(aObj);
            clicked++;
            window.setTimeout(function() {
                gaealer.ClickRedDot();
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
        gaealer.ClickLinks();
    } else if (pathname.substring(0, 8) == "/cks.php") {
        gaealer.CheckClickedPage();
    }
}, false);