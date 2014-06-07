// ==UserScript==
// @name           Office Office
// @namespace      hirak99
// @version        1
// @include        http://apps.facebook.com/*
// @include        http://www.facebook.com/*
// @include        http://www.torrentz.com/*
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.facebook.com/mythmonger/*
// ==/UserScript==

function camo() {
	var d = new Date();
	d=new Date(d.getTime()-d.getTimezoneOffset()*1000*60);

	// Weekends
	if (d.getDay()==0 || d.getDay()==6) return;

	var minutes = Math.floor((d.getTime() % (24*60*60*1000))/1000/60);

	// 11'o clock to 8'o clock
	if (!(minutes>=11*60 && minutes<=20*60)) return;


	if (window.location.href.indexOf('.facebook.')>=0) {
		document.getElementById('menubar_container').style.setProperty('background-color','#EFEFEF','');

		var x = document.getElementById('fb_menubar_logo');
		x.parentNode.removeChild(x);
		
		// Remove the feedbar for mousehunt / mythmonger
		if (window.location.href.match('http://apps.facebook.com/(mousehunt|mythmonger)($|/.*)')!=null) {
			divs = document.getElementsByTagName('div');
			for (i=0; i<divs.length; ++i)
				if (divs[i].id.indexOf('newsfeed')>-1)
					divs[i].parentNode.removeChild(divs[i]);
		}
	}
	else if (window.location.href.indexOf('.torrentz.')>=0) {
		var topBar = document.getElementsByClassName('top')[0];
		topBar.getElementsByTagName('a')[0].innerHTML = 'TechSupport';
		topBar.style.setProperty('background-color','#FFFFFF','');
		var lis = topBar.getElementsByTagName('li');
		for (var i=0; i<lis.length; ++i) {
			lis[i].style.setProperty('background-color','#EFEFEF','');
			lis[i].children[0].style.setProperty('background-color','#EFEFEF','');
		}
		var x = document.getElementsByClassName('cloud');
		if (x.length>0) {
			x = x[0];
			//x.parentNode.appendChild(new div()
			x.parentNode.removeChild(x);
		}
		var results = document.getElementsByClassName('results');
		for (var i=0; i<results.length; ++i) {
			var result=results[i];
			var innerHTML = result.children[0].innerHTML;
			if (innerHTML.indexOf(' torrents')==innerHTML.length-' torrents'.length) {
				innerHTML = innerHTML.substr(0,result.children[0].innerHTML.indexOf(' torrents'));
				result.children[0].innerHTML = innerHTML;
			}
		}
	}
}

camo();
