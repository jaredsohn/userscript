// ==UserScript==
// @name           bbs.archlinux.pl.newtopic
// @namespace      lobotomius.com
// @include        http://bbs.archlinux.pl/post.php?fid*
// ==/UserScript==

function sn(xp, ct) {
	if(!ct) ct = document;
	var r = document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	if(r)
		return r.singleNodeValue
		else
			return null;
}

var last='';

function loop() {
	var keywords=sn('//input[@name="req_subject"]').value;

	if(keywords != last) {
		last = keywords;
		fetch(keywords);
	};
};

function fetch(keywords) {

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://bbs.archlinux.pl/search.php?action=search&forum=-1&search_in=all&sort_by=0&sort_dir=DESC&show_as=topics&keywords="+keywords,
		onload: function(response) {
			var l = response.responseText.match(/<a href\="viewtopic\.php\?id\=\d+">[^<>]*<\/a>/gi);
			var h = s = o = "";
			var box = sn('//div[@id="results"]');

			if(l != null) {
				for(i in l) {
					h = l[i].slice(0, 2)+' style="background: url(http://bbs.archlinux.pl/style/Air/img/bull.png) no-repeat scroll left center; padding-left: 18px; color: ';
					(l[i].match(/solved/i)) ?
						s += h+'#383" '+l[i].slice(3)+" "
					:
						o += h+'#07b" '+l[i].slice(3)+" ";

				};
				box.innerHTML= s + o;
				box.style.display="block";
			} else
				box.style.display="none";
		}
	});

};

var box=document.createElement('div');
	box.setAttribute('id', 'results');
	box.style.height="60px";
	box.style.padding="10px";
	box.style.overflow="auto";
	box.style.display="none";


	sn('//div[@class="infldset txtarea"]').appendChild(box);

sn('//textarea[@name="req_message"]').setAttribute('rows', 15);
setInterval(loop, 4000);

//