// ==UserScript==
// @name           Basil Image and Video Expander
// @namespace      basilmarket.com
// @description    Expands image and video links in posts
// @include        http://www.basilmarket.com/forum/*
// ==/UserScript==

var youtube = '<object width="640" height="385"><param name="movie" value="http://www.youtube.com/v/<%id%>&amp;hl=en_US&amp;fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/<%id%>&amp;hl=en_US&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385"></embed></object>';

function getTagsByClass(parent, tag_name, class_name) {
	var tags = parent.getElementsByTagName(tag_name);
	if(class_name == '')
		return tags;
	var out = new Array();
	for(i=0;i<tags.length;i++){
		if(tags[i].className==class_name)
			out.push(tags[i]);
	}
	return out;
}

var ad = getTagsByClass(document, 'div', 'rf');
for(a=0;a<ad.length;a++)
	ad[a].parentNode.removeChild(ad[a]);

var comments = getTagsByClass(document, 'span', 'lh');
for(x=0;x<comments.length;x++) {
	var links = comments[x].getElementsByTagName('a');
	if(links != null)
	{
		for(y=0;y<links.length;y++) {
			var href = links[y].href.toLowerCase();
			if(href.match('.jpg') || href.match('.jpeg') || href.match('.gif') || href.match('.png')) {
				var imgurl = links[y].href.replace('http://www.basilmarket.com/bye.php?u=', '');
				if(imgurl.substr(0,7) != 'http://')
					imgurl = 'http://' + imgurl;
				if(imgurl.match('photobucket')) {
					imgurl = imgurl.replace(/\?.*=/g,'');
				} else if(imgurl.match(/imageshack.us\/.\/.*\//)) {
					continue;
				}
				var im = new Image();
				im.src = imgurl;
				if(im.width > 940) {
					var ratio = 940.0/im.width;
					var height = Math.round(im.height*ratio);
					links[y].className = '';
					links[y].innerHTML = '<img src="' + imgurl + '" width="940" height="' + height + '" title="' + links[y].innerHTML + '" alt="' + links[y].innerHTML + '">';
				} else {
					links[y].className = '';
					links[y].innerHTML = '<img src="' + imgurl + '" title="' + links[y].innerHTML + '" alt="' + links[y].innerHTML + '">';
				}
			} else if(href.match('youtube.*v=')) {
				var id = links[y].href.substr(href.indexOf('v=')+2);
				var tmp = youtube.replace(/<%id%>/g, id);
				var d = document.createElement('div');
				d.innerHTML = tmp;
				links[y].parentNode.replaceChild(d, links[y]);
				y--;
			}
		}
	}
}

