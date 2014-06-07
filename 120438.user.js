// ==UserScript==
// @name          Expand thumbnails
// @description   Make thumbnail images inline-expandable
// @namespace     http://mauke.dyndns.org/stuff/greasemonkey/
// @version       0.5.1
// ==/UserScript==

const UserInterface = {
	grab_horizontal_wheel: true,
	inject_global_buttons: true,
	inject_img_overlay: true,
	grease_script_menu: true,
};

const ImgMinWidth = 15;
const ImgMinHeight = 30;
const LabelCollapse = '\u26CB'; // WHITE DIAMOND IN SQUARE
const LabelExpand = '\u25A3'; // WHITE SQUARE CONTAINING BLACK SMALL SQUARE
// '\u25ab'; // WHITE SMALL SQUARE
const MaxLoad = 100;

const LoadingAnimation = 'data:image/gif;base64,' +
	'R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbG' +
	'xkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNy' +
	'ZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAA' +
	'EAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla' +
	'+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KM' +
	'aCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr' +
	'6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAA' +
	'EAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoL' +
	'LoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAA' +
	'ABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7' +
	'baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCO' +
	'ZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYA' +
	'qrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVf' +
	'ICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0Ua' +
	'FBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==';


const unique_id = function () {
	let uniq = 0;
	return function unique_id() {
		return 'G' + uniq++;
	};
}();

function rand_elem(x) {
	return x[Math.floor(Math.random() * x.length)];
}

const random_id = function () {
	const charset =
		'abcdefghijklmnopqrstuvwxyz' +
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
		'0123456789';
	return function random_id(n) {
		n = n || 8;
		let r = '_';
		for (let i = 0; i < n; ++i) {
			r += rand_elem(charset);
		}
		return r;
	};
}();

const hax = function () {
	const prefix = random_id() + '_gm_expandable_thumbnails_';
	return function hax(s) {
		return s.replace(/\?\?/g, function () prefix);
	};
}();

function find_containing_link(elem) {
	for (; elem && elem.tagName; elem = elem.parentNode) {
		if ((elem.tagName === 'A' || elem.tagName === 'a') && elem.href) {
			return elem;
		}
	}
	return;
}

function position_of(elm) {
	let y = elm.clientTop, x = elm.clientLeft;
	for (; elm; elm = elm.offsetParent) {
		y += elm.offsetTop;
		x += elm.offsetLeft;
	}
	return {top: y, left: x};
}

function resize(xs) {
	let w = window.innerWidth + 'px',
		h = window.innerHeight + 'px';
	xs.forEach(function (x) {
		let s = x.style;
		if (s.maxWidth !== w) {
			s.maxWidth = w;
		}
		/*
		if (s.maxHeight !== h) {
			s.maxHeight = h;
		}
		*/
	});
}

function hook_event(elem, action) {
	if (UserInterface.grab_horizontal_wheel) {
		elem.addEventListener(
			'DOMMouseScroll',
			function (ev) {
				if (!(ev.axis && ev.axis === ev.HORIZONTAL_AXIS)) {
					return;
				}
				action(ev.target, function () ev.preventDefault());
			},
			true
		);
	}
}

function kforeach(xs, f, k) {
	function kstep(i) {
		if (i >= xs.length) {
			return k();
		}
		return f(xs[i], function () kstep(i + 1));
	}
	return kstep(0);
}

function deentitize(s) {
	return s.replace(/&(amp|gt|lt|quot|#(?:x[\da-fA-F]+|\d+));/g, function (m0, m1) {
		if (m1[0] === '#') {
			if (m1[1] === 'x') {
				return String.fromCharCode(parseInt(m1.substr(2), 16));
			}
			return String.fromCharCode(parseInt(m1.substr(1), 10));
		}
		switch (m1) {
			case 'amp':  return '&';
			case 'gt':   return '>';
			case 'lt':   return '<';
			case 'quot': return '"';
		}
		return m0;
	});
}

const retarget = function () {
	function mkreplace(re, rhs) function (s) {
		return s.replace(re, rhs);
	}

	function mkstatic(re, f) function (url, k) {
		let m = re.exec(url);
		if (!m) {
			return;
		}
		k(f(url, m));
		return true;
	}

	function mkstarep(x, y, z) {
		return mkstatic(x, mkreplace(y, z));
	}

	function mkdynamic(re1, re2) function (url, k) {
		if (!re1.test(url)) {
			return;
		}
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onerror: function (r) {
				return k(url);
			},
			onload: function (r) {
				let m = re2.exec(r.responseText);
				if (!m) {
					GM_log(url + ' (' + re1 + '): ' + re2 + ' failed');
					return k(url);
				}
				let ref = deentitize(m[1]);
				if (!/^[A-Za-z]+:/.test(ref)) {
					let urk = r.finalUrl;
					ref = (
						/^\//.test(ref)
						? /^\w+:\/\/[^\/]+/.exec(urk)[0] + ref
						: urk.replace(/\/[^\/]*$/, function () '/' + ref)
					);
				}
				//GM_log('dyn: ' + url + ' => ' + ref);
				return k(ref);
			},
		});
		return true;
	}

	let matchers = [
		mkstarep(/^http:\/\/\d+\.bp\.blogspot\.com\/_/, /-h\//, '/'),
		mkstarep(/^http:\/\/pornimghost\.com\/viewer\.php\?file=/, /\/viewer\.php\?file=/, '/fullsize/'),
		mkstarep(/^http:\/\/www\.imageshentai\.com\/viewer\.php\?file=/, /\/viewer\.php\?file=/, '/imagenes/'),

		mkstatic(/^http:\/\/[^\/.]+\.linkbucks\.com\/url\/(http:\/\/.*)/, function (_, m) m[1]),
		mkstatic(/^http:\/\/hotchyx\.com\/(\d+)\/adult-image-hosting-view-(\d+)\.php\?id=(\w+\.\w+)/, function (_, m) 'http://hosting' + m[1] + '.hotchyx.com/adult-image-hosting-' + m[2] + '/' + m[3]),
		mkstatic(/^http:\/\/imgur\.com\/(\w+)$/, function (_, m) 'http://i.imgur.com/' + m[1] + '.jpg'),
		mkstatic(/^http:\/\/photosex\.biz\/v\.php\?id=(\w+)/, function (_, m) 'http://img.photosex.biz/pic_b/' + m[1] + '.jpg'),
		mkstatic(/^http:\/\/qkme\.me\/(\w+)\?/, function (_, m) 'http://i.qkme.me/' + m[1] + '.jpg'),
		mkstatic(/^http:\/\/(?:m|www)\.quickmeme\.com\/meme\/(\w+)\/$/, function (_, m) 'http://i.qkme.me/' + m[1] + '.jpg'),

		mkdynamic(/^http:\/\/(?:danbooru|hijiribe)\.donmai\.us\/post\/show\/\d/, /<img\s+alt="[^"]*"[\s\w\-="]*\sid="image"[\s\w\-=".();]*\ssrc="(http:\/\/\w+\.donmai\.us\/data\/[^"]+)"/),
		mkdynamic(/^http:\/\/\w+\.wikipedia.org\/w\/index\.php\?/, /<div\s[^<>]*class=["']fullImageLink['"][^<>]*><a\s+href=["']([^'"]+)/i),
		mkdynamic(/^http:\/\/\w+\.wikipedia.org\/wiki\/File:/, /<div\s[^<>]*class=["']fullImageLink['"][^<>]*><a\s+href=["']([^'"]+)/i),
		mkdynamic(/^http:\/\/chickupload\.com\/showpicture\//, /<img\s+src=['"]([^'"]+)['"]\s+id=['"]full['"]/i),
		mkdynamic(/^http:\/\/imagefap\.com\/image\.php\?/, /<img\s+id=["']mainPhoto["'][^>]*\ssrc=["'](http:\/\/[^"'\s]+)/i),
		mkdynamic(/^http:\/\/img\d+\.imagevenue\.com\/img\.php\?image=/, /<img\s+id=['"]thepic['"][^<>]*\ssrc=['"]([^'"]+)['"]/i),
		mkdynamic(/^http:\/\/memegenerator\.net\/instance\/\d+$/, /<div\s+class="instance_large">[\s\S]*?<img\s+src="(\/cache\/instances\/[\w\/]+\.jpg)"/),
		mkdynamic(/^http:\/\/www\.hentai-foundry\.com\/pic-\d+\.html$/, /<img\s+(?:please_stop=.leeching my bandwidth.\s+)?src=['"](http:\/\/pictures\.hentai-foundry\.com\/\w\/\w+\/\w+(?:\.(?:jpg|png|gif|bmp))?)['"]/i),
		mkdynamic(/^http:\/\/www\.imagebam\.com\/image\//, /<img\s+id=['"][^'"]*['"][^<>]*\ssrc=['"]([^'"]+)['"]/i),
		mkdynamic(/^http:\/\/www\.pornupload\.com\/\w+\/\w+\/.*\.html$/, /<img\s+src=['"](http:\/\/www\.pornupload\.com:8080\/[^'"]+)['"]/i),
		mkdynamic(/^http:\/\/www\.turboimagehost\.com\/p\/.*\.(?:jpg|png|gif)\.html$/,/<img\s+src=['"]([^'"]+)['"]\s+class="upimage"\s+id=['"]imageid['"]/i),
	];

	return function retarget(url, k) {
		for (let i = 0; i < matchers.length; ++i) {
			if (matchers[i](url, k)) {
				return;
			}
		}
		return k(url);
	};
}();

function computed_style(elem) {
	try {
		return window.getComputedStyle(elem, null);
	} catch (e) {
		GM_log('computed_style(' + elem + '): ' + e);
		return undefined;
	}
}

function set_overflow(elem) {
	for (; elem && elem !== document; elem = elem.parentNode) {
		let (st = computed_style(elem)) {
			//GM_log('?? ' + elem.tagName + ' - ' + st.overflow);
			if (st && st.overflow && st.overflow === 'hidden') {
				//GM_log('!>> ' + elem);
				elem.style.overflow = 'visible';
			}
		}
	}
}

let expanded = [];
window.addEventListener('resize', function () resize(expanded), false);

let collapsers = [];

function do_expand(img, target) {
	let parent_img = img.parentNode;
	let alt = null;
	let overlay = null;

	let unoverlay = function () {
		//GM_log("unoverlay()");
		if (!overlay) {
			return;
		}
		overlay.parentNode.removeChild(overlay);
		overlay = null;
	};
	let collapse = function () {
		//GM_log("collapse()");
		if (!alt) {
			return;
		}
		parent_img.replaceChild(img, alt);
		alt = null;
	};

	let img_style = window.getComputedStyle(img, null);

	alt = document.createElement('div');
	let (st = alt.style) {
		st.cssFloat = img_style.cssFloat;
		st.display = img_style.display;
		['margin', 'padding'].forEach(function (x) {
			['', 'Top', 'Right', 'Bottom', 'Left'].forEach(function (y) {
				let k = x + y;
				st[k] = img_style[k];
			});
		});
		st.zIndex = img_style.zIndex;
		//st.outline = '1px solid green';
	}
	let div = document.createElement('div');
	let (st = div.style) {
		st.position = 'relative';
		st.display = 'inline-block';
		//st.outline = '1px solid blue';
	}
	alt.appendChild(div);

	let img_exp = img.cloneNode(false);
	img_exp.removeAttribute('src');
	let (st = img_exp.style) {
		st.margin = st.padding = '0px';
		//st.outline = '1px inset red';
	}
	let done_id = unique_id();
	img_exp.setAttribute(hax('??done'), done_id);
	expanded.push(img_exp);
	div.appendChild(img_exp);

	overlay = document.createElement('div');
	let (shade = document.createElement('div')) {
		let (st = shade.style) {
			st.position = 'absolute';
			st.top = st.left = '0px';
			st.width = st.height = '100%';
			if (false) {
				st.opacity = 0.2;
				st.backgroundColor = '#000000';
			} else {
				st.outline = '2px dashed red';
			}
		}
		overlay.appendChild(shade);
	}
	let (anim = document.createElement('img')) {
		anim.src = LoadingAnimation;
		let (st = anim.style) {
			st.padding = '0px';
			st.border = st.outline = 'none';
			st.position = 'absolute';
			st.top = st.left = '50%';
			st.margin = '-8px 0px 0px -8px';
			st.opacity = 0.4;
		}
		overlay.appendChild(anim);
	}
	div.appendChild(overlay);

	img_exp.addEventListener(
		'error',
		collapse,
		false
	);

	img_exp.addEventListener(
		'load',
		function () {
			unoverlay();
			if (!img_exp) {
				return;
			}
			img_exp.style.outline = 'none';
			resize([img_exp]);
			img_exp.removeAttribute('width');
			img_exp.removeAttribute('height');
			img_exp.style.width = '';
			img_exp.style.height = '';
		},
		false
	);
	retarget(target, function (tx) {
		//GM_log('hay ' + tx);
		img_exp.src = tx;
		hook_event(img_exp, function (ev, f) { collapse(); f(); });
		collapsers.push([done_id, collapse]);

		resize([img_exp]);
		img_exp.removeAttribute('width');
		img_exp.removeAttribute('height');
		img_exp.style.width = '';
		img_exp.style.height = '';
		img_exp.style.minWidth = img_style.width;
		img_exp.style.minHeight = img_style.height;

		parent_img.replaceChild(alt, img);
		set_overflow(parent_img);
	});
}

function expansion_target(img) {
	if (img.tagName !== 'IMG' && img.tagName !== 'img') return;
	if (
		img.getAttribute(hax('??done')) ||
		img.width < ImgMinWidth ||
		img.height < ImgMinHeight ||
		/^chrome:/.test(img.src)
	) {
		return;
	}
	let link = find_containing_link(img);
	if (!link) {
		return;
	}
	let target = link.href;
	if (
		img.src === target ||
		!/^(?:https?|data):/.test(target) ||
		/#/.test(target) ||
		/\S/.test(link.textContent) ||
		link.getElementsByTagName('img').length !== 1
	) {
		return;
	}
	return target;
}

function maybe_expand(img, after) {
	let target = expansion_target(img);
	if (!target) {
		return;
	}
	if (after) {
		after();
	}
	do_expand(img, target);
}

function expand_all() {
	let imgs = document.getElementsByTagName('img');
	let did = 0;
	kforeach(
		imgs,
		function (img, k) {
			let style = window.getComputedStyle(img, null);
			if (
				style.visibility !== 'hidden' &&
				style.visibility !== 'collapse' &&
				style.display !== 'none'
			) {
				maybe_expand(img, function () ++did);
			}

			if ((did + 1) % MaxLoad) {
				return k();
			}
			window.setTimeout(k, 100);
		},
		function () {
		}
	);
}

function collapse_all() {
	collapsers.forEach(function (x) x[1]());
	collapsers = [];
}

if (UserInterface.inject_global_buttons || UserInterface.inject_img_overlay) {
	GM_addStyle(hax(
		'.??uicontainer { z-index: 1000; } ' +
		'.??uicontainer .??ui.??button { font-size: xx-small; max-width: 2em; } ' +
		'.??uicontainer .??ui.??trans { opacity: 0.2; } ' +
		'.??uicontainer .??ui.??trans:hover { opacity: 1; } '
	));
}

let overlay_victim;
let overlay_ui_button = document.createElement('input');
let overlay_ui = document.createElement('div');
overlay_ui.className = hax('??uicontainer');
let (st = overlay_ui.style) {
	st.position = 'absolute';
	st.visibility = 'hidden';
	//st.outline = '2px dashed blue';
	st.width = st.height = '0px';
}
let (bt = overlay_ui_button) {
	bt.type = 'button';
	bt.className = hax('??ui ??button');
	let (st = bt.style) {
		st.position = 'absolute';
		//st.fontSize = 'xx-small';
		//st.maxWidth = '15px';
		st.top = '4px';
		st.right = '4px';
	}
	bt.addEventListener('click', function (ev) {
		bt.blur();
		if (!overlay_victim) {
			GM_log('wtf: victimless click');
			return;
		}
		let img = overlay_victim;
		hide_overlay();

		let done_id = img.getAttribute(hax('??done'));
		if (done_id) {
			for (let i = 0; i < collapsers.length; i++) {
				if (collapsers[i][0] === done_id) {
					collapsers[i][1]();
					collapsers.splice(i, 1);
					break;
				}
			}
			return;
		}

		let target = expansion_target(img);
		if (!target) {
			return;
		}
		do_expand(img, target);
	}, false);
	overlay_ui.appendChild(bt);
}
if (UserInterface.inject_img_overlay) {
	document.body.appendChild(overlay_ui);
}

function in_overlay_group(x) {
	return !!(x && (
		x === overlay_victim ||
		x === overlay_ui ||
		x === overlay_ui_button
	));
}

function hide_overlay() {
	overlay_victim = null;
	let (st = overlay_ui.style) {
		st.visibility = 'hidden';
	}
}

hook_event(document, function (elm, after) {
	if (in_overlay_group(elm)) {
		elm = overlay_victim;
		hide_overlay();
	}
	return maybe_expand(elm, after);
});

function doc_mouseover(ev) {
	let tg = ev.target;
	if (in_overlay_group(tg)) return;
	if (tg.getAttribute(hax('??done'))) {
		overlay_ui_button.value = LabelCollapse;
		overlay_ui_button.title = 'Collapse';
	} else if (expansion_target(tg)) {
		overlay_ui_button.value = LabelExpand;
		overlay_ui_button.title = 'Expand';
	} else {
		return;
	}
	let w = tg.clientWidth, h = tg.clientHeight;
	//GM_log('doc_mouseover([' + tg + '] ' + w + ' ' + h + ')');
	overlay_victim = tg;
	let (
		pos = position_of(tg),
		st = overlay_ui.style
	) {
		//st.width = w + 'px';
		//st.height = h + 'px';
		st.top = pos.top + 'px';
		st.left = (pos.left + w) + 'px';
		st.visibility = 'visible';
	}
}

function doc_mouseout(ev) {
	let tg = ev.target;
	if (!overlay_victim || in_overlay_group(tg) === in_overlay_group(ev.relatedTarget)) {
		return;
	}
	//GM_log('doc_mouseout(![' + tg + '])');
	hide_overlay();
}

if (UserInterface.inject_img_overlay) {
	document.addEventListener('mouseover', doc_mouseover, true);
	document.addEventListener('mouseout', doc_mouseout, true);
}

if (UserInterface.grease_script_menu) {
	GM_registerMenuCommand(
		'Expand all thumbnails',
		expand_all
	);

	GM_registerMenuCommand(
		'Collapse all thumbnails',
		collapse_all
	);
} 

if (UserInterface.inject_global_buttons) {
	let (div = document.createElement('div')) {
		div.className = hax('??uicontainer');
		let (st = div.style) {
			st.position = 'fixed';
			st.top = '12px';
			st.right = '20px';
		}
		let (b = document.createElement('input')) {
			b.type = 'button';
			b.title = 'Expand all';
			b.value = LabelExpand;
			b.className = hax('??ui ??button ??trans');
			b.addEventListener('click', expand_all, false);
			div.appendChild(b);
		}
		let (b = document.createElement('input')) {
			b.type = 'button';
			b.title = 'Collapse all';
			b.value = LabelCollapse;
			b.className = hax('??ui ??button ??trans');
			b.addEventListener('click', collapse_all, false);
			div.appendChild(b);
		}
		document.body.appendChild(div);
	}
}
