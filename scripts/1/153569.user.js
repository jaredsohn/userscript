// ==UserScript==
// @name           Anti Protect!
// @author         K7rim
// @description    Skip link-protector sites that annoys us with these 2-step pages to get to the final link No link protect! No more ads! get to your final destination 
// @updateURL      http://userscripts.org/scripts/source/153569.user.js
// @installURL     http://userscripts.org/scripts/source/153569.user.js
// @version        0.2
// @include       *tvegy.info/*
// @include       *tmf.myegy.com/*
// @include       *egcenter.com/*
// @include       *forum.arabseed.com/redirect/*.php?url=*
// @include       *wn.arabseed.com/*
// @include       *wwenews.us/*
// @include       *zero10.net/*
// @include       *egnews.info/*
// @include       *downha.tv/linkaty/*
// @include       *uplds.com/*
// @include       *arablionz.com/histate/url.php?url=*
// @include       *imzdb.com/*
// @include       *1tool.biz/*
// ==/UserScript==



window.addEventListener('DOMContentLoaded', main, false);

function main() {

	for (var i in Modules) {
        var h = Modules[i].host;
        var a;
	
		if (typeof h === 'string') {
			a = new RegExp(h, 'i')
			
		}else if (typeof h === 'object'){
			a = new RegExp(h.join('|'), 'i');
			
		}
        if (a.test(document.domain)) {
            document.title = "Redirecting..."; 
			Modules[i].func();
			window.removeEventListener('DOMContentLoaded', main, false);
        }
	}
}

var Modules = {
	tmf: {
        host: ['tmf.myegy.com','takemyfile.com','tvegy.info', 'egcenter.com',
				'imzdb.com', 'forum.arabseed.com', 'arablionz.com'],
        func: function() {
			e = getElem('div[@id="continue"]//a', 'xp')
			if (e) {
				u = e.href
			} else {
				e = getElem('groovybtn1', 'n')
				u = exUrl(e.getAttribute('onclick'))
            }
			if (u) {
				return goTo(u)
			}
        }
    },
	wwe: {
		host: ['wn.arabseed.com','wwenews.us','1tool.biz','downha.tv', '1tool.biz'],
		func: function() {
			
			e = getElem('a[contains(.,"download page")]','xp')
			if (e) {
				u = e.href
			}else{
				e = getElem('cont','id')
				u = exUrl(e.getAttribute('onclick'))
			}
			if (u) {
				return goTo(u);
			}
		}
	
	},
	uplds: {
		host: 'uplds.com',
		func: function() {
			e = getElem('form[@name="F1"]/input[@name="id"]', 'xp')
			if (e) {
				return goTo(e.value)
			}
		}
	},
	zero10: {
		host: 'zero10.net',
		func: function() {
		
			e = getElem('input[contains(@value,"Download Page")]', 'xp')
			if (e) {
				return e.form.submit()
			}else{
				e = getElem('groovybtn1', 'n');
				if (e) {
					u = exUrl(e.getAttribute('onclick'))
					return goTo(u)
				}
			}	
		}
	},
	egnews: {
		host: 'egnews.info',
		func: function() {
			e = getElem('a[contains(.,"download page")]','xp')
			if (e) {
				u = e.href
			}else{
				p = /ShortPopUp\s?\(['"]([^'"]+)["']/
				e = getElem('.//input[contains(@value,"Get Link")]','xp')
				u = exUrl(e.getAttribute('onclick'),p)
			}
			return goTo(u)
		}
	
	}
};

function goTo(url) { 
	top.location.assign(url)
}

function getElem(El, By) {
	var res;
	var r;
	switch (By)	{
		case 'id':
			return document.getElementById(El);
		case 'c':
			res = document.getElementsByClassName(El);
			break;
		case 'n':
			res = document.getElementsByName(El);
			break;
		case 't':
			res = document.getElementsByTagName(El);
			break;
		case 'xp':
			res = []
			var xpath = document.evaluate('.//' + El, document, null, 5, null);
			while (nD = xpath.iterateNext()) {
                res.push(nD);
            }
			break;
	}
	res.length == 1 ? r = res[0] : res.length > 1 ? r = res : r = false;
	return r
}

	
function exUrl(str, ptr) {
	
	if (!ptr) {ptr = /NewWindow\s?\(['"]([^'"]+)["']/};
	s = ptr.exec(str);
	return s[1];
}
