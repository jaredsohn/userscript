// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.MoCReplyFilter
// @name           Mansion of Celebs Reply Filter
// @version        2012.11.26
// @author         kuehlschrank
// @description    Hides replies that don't contain additional photos. Also supported: The Celebrity City
// @include        http*mansion-of-celebs.com/viewtopic*
// @include        http*thecelebritycity.com/forum/viewtopic*
// ==/UserScript==

(function() {

	function setDisplay(display) {
		var list = document.querySelectorAll('div.post'), first;
		for(var i = list.length, post; i-- && (post = list[i]);) {
			if(!post.querySelector('div.content a img')) {
				post.style.display = display;
				first = post;
			}
		}
		return first;
	}

	function addLinks() {
		var list = document.querySelectorAll('div.pagination');
		for(var i = list.length, p; i-- && (p = list[i]);) {
			p.insertBefore(document.createTextNode(' • '), p.firstChild);
			p.insertBefore(buildLink(), p.firstChild);
		}
	}

	function buildLink() {
		var a = document.createElement('a');
		a.textContent = 'Show hidden posts';
		a.className = 'mocrf-link';
		a.style.cssText = 'font-weight:bold;color:#825353;';
		a.href = '#';
		a.addEventListener('click', onClick, false);
		return a;
	}

	function onClick(e) {
		e.preventDefault();
		setDisplay('').scrollIntoView();
		var list = document.querySelectorAll('a.mocrf-link');
		for(var i = list.length, a; i-- && (a = list[i]);) {
			a.parentNode.removeChild(a.nextSibling);
			a.parentNode.removeChild(a);
		}
	}

	if(/\d\s*(x\b|\w+Q)|\bx\s*\d/i.test(document.title) && setDisplay('none')) {
		addLinks();
	}

})();