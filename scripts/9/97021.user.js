// ==UserScript==
// @name           Amazon Popup Review
// @namespace      http://d.hatena.ne.jp/sandai/
// @description    Amazon reviews pops up.
// @include        http://www.amazon*
// @version        1.1.0
// ==/UserScript==

(function() {
// return frame document
try {
	if(window.self != window.top) throw 0;
}catch(e) { return; }

/* windows setting */
const DH = 400,                   // windows height(ウィンドウの高さ)
	  DW = 520,                   // windows width(ウィンドウの幅)
	  POSITION = 'top-right',  // some character setting any position for windows -> 'top-left' or 'top-right' or 'bottom-left' or 'bottom-right'(ウィンドウの位置)
	  OPACITY = 0.85;             // windows opacity value the range from 0.0 to 1.0(不透明度を0.0から1.0の値を指定)
/* end */

var popup,
	timer,
	xpath1 = '(.//div | .//span)[@class="reviewsCount" or @class="crAvgStars" or @class="rvwCnt"][not(.//span[@class="popupBtn"])]',
    xpath2 = './/div[@class="s9CustomerReviews"]/span[not(.//span[@class="popupBtn"])]',
	res1 = getPath(xpath1),
	res2 = getPath(xpath2);

if(document.getElementById('popupReviewBox') == null && (res1 != null || res2 != null)) {
	popup = setppWindow();
	setppBtn(res1);
	setppBtn(res2);

	document.addEventListener('DOMNodeInserted',treeModified, false);

	window.addEventListener('resize', function(e) {
		var pos = getPos(POSITION);
		popup.box.style.top = pos.y + 'px';
		popup.box.style.left = pos.x + 'px';
	}, false);

	document.addEventListener('click', function(e) {
		if(e.target != popup.box && e.target != popup.frame && e.target != popup.loading) {
			popup.box.style.display = 'none';
		  }
		e.stopPropagation();
	}, false);

	var twh = DW - 30;
	popup.frame.addEventListener('load', function(e) {
		var f = e.currentTarget,
			fdoc = f.contentDocument,
			table = getPathSingle('/html/body/table', fdoc);

		if(table == null) return;

		fdoc.body.innerHTML = '';
		fdoc.body.appendChild(table);

		table.width = twh + 'px';
		getPathSingle('/html/body/table/tbody/tr/td[2]', fdoc).style.display = 'none';
		// getPathSingle('/html/body/table/tbody/tr/td/table/tbody/tr/td[5]', fdoc).style.display = 'none';
		getPath('.//div[contains(@class, "crVS")]', fdoc).forEach(function(elem) {
			elem.firstChild.textContent = elem.firstChild.textContent.replace(/^\s+|\s+$/g, '');
			elem.style.whiteSpace = 'pre-wrap';
		});
		getPath('.//table[@class="CMheadingBar"]//div[@class]', fdoc).forEach(function(elem) {
			elem.style.whiteSpace = '';
		});

		popup.loading.style.display = 'none';
		e.currentTarget.style.display = 'block';

		var atag = table.getElementsByTagName('a');
		for(var i = 0, item; item = atag[i]; i++) {
			if(!(/product-reviews/.test(item.href))) {
				item.style.textDecoration = 'line-through';
				item.target = '_blank';
			} else {
				item.addEventListener('click', function(e) {
					popup.loading.style.display = 'block';
					popup.frame.style.display = 'none';
				}, false);
			}
		}
		e.stopPropagation();
	}, false);
} else {
	return;
}

function treeModified() {
	if(timer) return;
	timer = setTimeout(function() {
		setppBtn(getPath(xpath1));
		setppBtn(getPath(xpath2));
		timer = 0;
	}, 30);
}

function setppWindow() {
	var d = document.createElement('div'),
		f = document.createElement('iframe'),
		img = document.createElement('img'),
		pos = getPos(POSITION),
		shadow = ((/right/.test(POSITION)) ? '-2px' : '2px') + ' 2px 4px #000';

	d.id = 'popupReviewBox';
	d.style.cssText = '-webkit-box-shadow:' + shadow + ';-moz-box-shadow:' + shadow + ';box-shadow:' + shadow + ';'
					  + 'position:fixed;z-index:50000;display:none;'
					  + 'width:' + DW + 'px;'
					  + 'height:' + DH + 'px;'
					  + 'top:' + pos.y + 'px;'
					  + 'left:' + pos.x + 'px;'
					  + 'opacity:' + OPACITY + ';';

	f.id = 'popupReviewFrame';
	f.width = DW;
	f.height = DH;
	f.frameBorder = 0;
	f.style.display = 'none';

	img.id = 'popupReviewLoading';
	img.src = (/ja/.test(navigator.language) || /ja/.test(navigator.browserLanguage))
				? 'http://g-ecx.images-amazon.com/images/G/09/ui/loadIndicators/loadIndicator-large._V192261612_.gif'
				: 'http://g-ecx.images-amazon.com/images/G/01/ui/loadIndicators/loadIndicator-large._V192261612_.gif';
	img.style.cssText = 'position:absolute;top:50%;left:50%;display:block;';
	img.addEventListener('load', function(e) {
		var i = e.currentTarget;
		i.style.marginLeft = -i.width / 2 + 'px';
		i.style.marginTop = -i.height / 2 + 'px';
	}, false);

	d.appendChild(f);
	d.appendChild(img);
	document.body.appendChild(d);

	return {
		box: d,
		frame: f,
		loading: img
	};
}

function createBtn() {
	var s = document.createElement('span');
	s.className = 'popupBtn';
	s.innerHTML = ' popup ';
	s.style.cssText = 'color:red;cursor:pointer;text-decoration:underline;';
	return s;
}

function setppBtn(c) {
	if(!c.length) return;

	var span = createBtn();

	for(var i = 0, item, btn; item = c[i]; i++) {
		btn = span.cloneNode(true);
		item.insertBefore(btn, item.lastChild);

		btn.addEventListener('mouseover', function(e) {
			e.currentTarget.style.cssText = 'color:white;background:red;cursor:pointer;text-decoration:none;';
			e.stopPropagation();
		}, false);

		btn.addEventListener('mouseout', function(e) {
			e.currentTarget.style.cssText = 'color:red;cursor:pointer;text-decoration:underline;';
			e.stopPropagation();
		}, false);

		btn.addEventListener('click', function(e) {
			popup.box.style.display = 'block';
			popup.loading.style.display = 'block';
			popup.frame.style.display = 'none';
			popup.frame.src = e.currentTarget.previousSibling.href; // for now
			e.stopPropagation();
		}, false);
	}
}

function getPath(xpath, context) {
	context = context || document;
	var doc = context.ownerDocument || context;
	var ret = [],
		result = doc.evaluate(xpath, context, null, 7, null);
	for(var i = 0, item; item = result.snapshotItem(i); i++) ret[i] = item;
	return ret;
}

function getPathSingle(xpath, context) {
	context = context || document;
	var doc = context.ownerDocument || context,
		result = doc.evaluate(xpath, context, null, 9, null).singleNodeValue;
	return result;
}

function getPos(pos) {
	var x, y;

	switch(pos) {
		case 'top-left':
			x = 10, y = 10;
			break;
		case 'top-right':
			x = getClientWH('Width') - DW - 10, y = 10;
			break;
		case 'bottom-left':
			x = 10, y = getClientWH('Height') - DH - 10;
			break;
		case 'bottom-right':
			x = getClientWH('Width') - DW - 10;
			y = getClientWH('Height') - DH - 10;
			break;
		default:
			x = getClientWH('Width') - DW - 10, y = 10;
	}
	return {x: x, y: y};
}


function getClientWH(data) { // 'Height' or 'Width'
	var comp = /BackCompat/i.test(document.compatMode) ? document.body : document.documentElement;
	return comp['client' + data];
}

})();

//function log(str) {
//	unsafeWindow.console.log(str);
//}