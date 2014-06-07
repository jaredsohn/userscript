// ==UserScript==
// @name			instapaper - unread skip
// @namespace		http://d.hatena.ne.jp/Cherenkov/
// @include			http*
// @version			0.1
// @date			20120126
// ==/UserScript==

/*
//bookmarklet::
javascript:function%20iprl5(){var%20d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;try{if(!b)throw(0);d.title='(Saving...)%20'+d.title;z.setAttribute('src',l.protocol+'//www.instapaper.com/j/xxxxxxxxxxx?u='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(z);


var%20v=d.createEvent('Event');v.initEvent('GM_instaSkip',1,1);b.dispatchEvent(v);


}catch(e){alert('Please%20wait%20until%20the%20page%20has%20loaded.');}}iprl5();void(0)
*/

//http://q.hatena.ne.jp/1327242023


function skip() {
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.instapaper.com/u',
		headers: {"User-Agent":"Mozilla/5.0", "Accept":"text/xml"},
		onload: function(res) {
			var df = document.createRange().createContextualFragment(res.responseText);
			Array.forEach(df.querySelectorAll('.archiveButton'), function(e) {
				var href = 'http://www.instapaper.com' + e.getAttribute('href');
				console.log(href);
				gm_get(href);
			});
		}
	});
}

function gm_get(url) {
	GM_xmlhttpRequest({ method: "GET", url: url });
}

document.body.addEventListener('GM_instaSkip', function(e) { 
	document.body.addEventListener('DOMNodeRemoved', function(e) { 
		if (/^ipb/.test(e.target.id)) {
			setTimeout(function() { skip() }, 1000);
		}
	}, false);
}, false);
