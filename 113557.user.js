// ==UserScript==
// @name           4ch ML
// @namespace      chml
// @include        http://boards.4chan.org/*
// ==/UserScript==

function getFirst(e, tagName)
{
	return e.getElementsByTagName(tagName).item(0);
}

var win = unsafeWindow || window;
var once = false;

function main()
{
	if(once) return;

	once = true;
	var body = getFirst(win.document, 'body');
	var b = document.createElement('img');
	var dv = document.createElement('div');

	b.width = 640;
	b.height = 480;
	b.style.border = '0';
	dv.style.position = 'fixed';
	dv.style.left = '50%';
	dv.style.top = '50%';
	dv.style.margin = '-245px 0 0 -325px';
	dv.style.border = '10px solid black';
	dv.style.borderRadius = '10px';
	dv.style.visibility = 'hidden';
	dv.style.backgroundColor = 'black';

	dv.appendChild(b);

	function animThGo(e)
	{
		var frm = e.animFrame = ((e.animFrame || 0) + 1) % 5;
		e.style.backgroundPosition = (frm * -170) + 'px 0';
	}

	function animTh(e, run)
	{
		if(!e.animation) e.animation = getFirst(e, 'span');
		if(!e.image) e.image = getFirst(e, 'img');
		var animation = e.animation;
		if(e.animating ^ run)
		{
			e.animating = run;
			clearInterval(e.interval);
			if(run) e.interval = setInterval(function(){ animThGo(animation) }, 300);
		}
		b.src = e.image.src;
		dv.style.visibility = e.animating ? 'visible' : 'hidden';
		return false;
	}

	var elements = document.getElementsByTagName('blockquote');

	for(var i = 0, e; e = elements[i]; i++)
	{
		e.innerHTML = (' ' + e.innerHTML).replace(/([^\w#:])((G(I|V|))?[A-F0-9]{6,7})(?![\w;])/gi,
			function(all,pre,id,isGallery,galleryType){
				if(/^[0-9]+$/.test(id) || /^[A-F]+$/i.test(id)) return all;

				var txt = id;
				if(isGallery)
				{
					var gt = (galleryType || '').toLowerCase();
					txt = '&lt;&lt; MOTHERLESS ' + (gt ? (gt === 'i' ? 'IMAGE ' : 'VIDEO ') : '') + 'GALLERY >>';
				}
				else
				{
					var url = 'http://thumbs.motherlessmedia.com/thumbs/';
					txt =
						'<span style="display:block;position:relative;width:170px;height:140px" onmouseover="animTh(this,true)" onmouseout="animTh(this, false)">' +
							'<img width="170" height="140" style="border:0;margin:0;padding:0" src="' + url + id + '.jpg" alt="' + id + '">' +
							'<span style="display:block;position:absolute;margin:0;padding:0;left:0;top:0;width:170px;height:140px;background:url(' + url + id + '-strip.jpg)"> </span>' +
						'</span>';
				}
				return pre + '<a target="_blank" href="http://motherless.com/' + id + '">' + txt + '</a>';
				// javascript sadly doesn't support lookbehind in regexps - "pre" is a workaround for it
			}
		);
	}
	win.animTh = animTh; // export this function

	body.appendChild(dv);
}

document.addEventListener('DOMContentLoaded', main, false);
document.addEventListener('load', main, false);