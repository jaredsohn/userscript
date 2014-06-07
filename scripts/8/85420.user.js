// ==UserScript==
// @name           Pixiv Picture Viewer
// @namespace      http://userscripts.org/scripts/show/28350
// @description    Better viewing for Safari + GreaseKit.
// @version        2010.09.03
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==

//////////////////////////////////////////////////

var TEXT_COLOR = '#555';
var HIGHLIGHT_TEXT_COLOR = '#555';
var DISABLED_TEXT_COLOR = '#AAA';
var BACKGROUND_COLOR = '#F5F5F5';
var HIGHLIGHT_BACKGROUND_COLOR = '#E5E5F5';
var DISABLED_BACKGROUND_COLOR = '#D5D5D5';
var BORDER_INSET = 'inset 1px #BBB';
var BORDER_OUTSET = 'outset 1px #BBB';

var img_tag;            // 画像タグ要素
var img_src_midium;     // 縮小サイズの画像のURL
var img_src_original;   // オリジナルサイズの画像のURL
var next_href;          // 次のページのURL
var prev_href;          // 前のページのURL
var user_id;            // 投稿者のID

var div_screen;
var div_description;
var div_canvas;

var PICTURE_TITLE                  = document.getElementsByClassName('works_data')[0].getElementsByTagName('h3')[0].innerHTML;
var ORIGINAL_SIZE_PICTURE_PAGE_URL = document.getElementsByClassName('works_display')[0].getElementsByTagName('a')[0].href;


//////////////////////////////////////////////////

(function() {
	
	setup();
	
	// 
	{
		div_screen = document.createElement('div');
		div_screen.style.width = '100%';
		div_screen.style.height = '100%';
		div_screen.style.backgroundColor = 'black';
		div_screen.style.opacity = '0.80';
		div_screen.style.position = 'fixed';
		div_screen.style.top = '0';
		div_screen.style.left = '0';
		div_screen.style.zIndex = '154';
		div_screen.style.display = 'none';
		document.body.appendChild(div_screen);
	}
	
	// 
	{
		div_canvas = document.createElement('div');
		div_canvas.style.width = '80%';
		div_canvas.style.height = '100%';
		div_canvas.style.padding = '20px';
		div_canvas.style.position = 'absolute';
		div_canvas.style.top = '0px';
		div_canvas.style.left = '10%';
		div_canvas.style.zIndex = '155';
		div_canvas.style.display = 'none';
		document.body.appendChild(div_canvas);
	}
	
	//
	{
		var div = document.createElement('div');
		div.innerHTML = 'a';
		div.style.margin = 'auto';
		div.style.marginBottom = '10px';
		div.innerHTML = '<h3 style="color: white; font-weight: bold; font-size: 250%; margin-bottom: 10px; border-bottom: 1px solid white;">' + PICTURE_TITLE + '</h3>' + 
		                '<p style="color: white; margin-bottom: 20px;">' + document.getElementsByClassName('works_caption')[0].innerHTML + '</p>';
		div_canvas.appendChild(div);
	}
	
	//
	{
		var createImages = function(urls) {
			for (var i = 0; i < urls.length; i++) {
				var img = document.createElement('img');
				img.src = urls[i];
				img.style.maxWidth = '100%';
				img.style.marginBottom = '20px';
				div_canvas.appendChild(img);
				div_canvas.appendChild(document.createElement('br'));
			}
		};
		
		var http_request = new XMLHttpRequest();
		http_request.open('GET', ORIGINAL_SIZE_PICTURE_PAGE_URL, true);
		http_request.onreadystatechange = function() {
			if (http_request.readyState == 4 && http_request.status == 200) {
				var urls = http_request.responseText.match(/http:.*.\/([1-9][0-9]+)(_p[0-9]+)?.(jpg|gif|png)/g);
				createImages(urls);
			}
		};
		http_request.send(null);
	}
	
	//
	{ 
		var controller = buildController();
		controller.style.position = 'fixed';
		controller.style.top = '20px';
		controller.style.left = '10px';
		controller.style.zIndex = '255';
		document.body.appendChild(controller);
	}
	
})();

//////////////////////////////////////////////////

function forEachTag(tagName, func) {
	var tags = document.getElementsByTagName(tagName);
	for (var i = 0; i < tags.length; i++) {
		func(tags[i]);
	}
}

//////////////////////////////////////////////////

// 変数の設定．
function setup() {
	
	// 画像のタグを探す
	forEachTag('img', function(tag) {
		if (/_m\.(gif|jpg|png)/.test(tag.src)) {
			img_tag = tag;
			img_src_midium = img_tag.src;
			img_src_original = img_src_midium.replace('_m.', '.');
			img_tag.style.KhtmlUserSelect = 'none';     // for Safari
			img_tag.style.MozUserSelect = 'none';       // for Firefox
		}
	});
	
	// 前後のページへのリンクタグ
	forEachTag('a', function(tag) {
		if (/≫$/.test(tag.innerHTML)) { prev_href = tag.href; }
		if (/^≪/.test(tag.innerHTML)) { next_href = tag.href; }
	});
	
}

//////////////////////////////////////////////////

function buildController() {

	var elem = document.createElement('DIV');
	elem.id = 'pixiv_preview_replace';
	
	elem.appendChild(buildLinkButton('▲', next_href));
	elem.appendChild(buildZoomButton());
	elem.appendChild(buildLinkButton('▼', prev_href));
	
	return elem;
}

//////////////////////////////////////////////////

// ボタンに共通なスタイルを設定する．
function setButtonStyle(button, enabled) {
	
	// デフォルトは disabled 状態
	with (button.style) {
		backgroundColor = DISABLED_BACKGROUND_COLOR;
		color = DISABLED_TEXT_COLOR;
		cursor = 'default';
		border = BORDER_OUTSET;
		textAlign = 'center';
		padding = '2px 10px';
		width = '50px';
		KhtmlUserSelect = 'none';        // for Safari
		MozUserSelect = 'none';          // for Firefox
	}
	if (!enabled) return;
	
	// enabled 状態
	with (button.style) {
		backgroundColor = BACKGROUND_COLOR;
		color = TEXT_COLOR;
		cursor = 'pointer';
	}
	button.addEventListener('mouseover', function() {
		button.style.backgroundColor = HIGHLIGHT_BACKGROUND_COLOR;
		button.style.color = HIGHLIGHT_TEXT_COLOR;
	}, false);
	button.addEventListener('mouseout', function() {
		button.style.backgroundColor = BACKGROUND_COLOR;
		button.style.color = TEXT_COLOR;
	}, false);
}

//////////////////////////////////////////////////

// ボタンが押されたときに実行される関数を設定する．
function setButtonAction(button, enabled, action) {
	if (!enabled) return;
	button.addEventListener('click', action, false);
}

//////////////////////////////////////////////////

// 拡大イラストを表示するボタン．
function buildZoomButton() {
	
	var button = document.createElement('DIV');
	setButtonStyle(button, true);
	button.innerHTML = 'zoom';
	
	var zoomed = false;
	var setState = function(b) {
		zoomed = b;
		if (zoomed) {
			button.style.border = BORDER_INSET;
			div_screen.style.display = '';
			div_canvas.style.display = '';
			window.scrollTo(0, 0);
		}
		else {
			button.style.border = BORDER_OUTSET;
			div_screen.style.display = 'none';
			div_canvas.style.display = 'none';
		}
	}
	
	setState(true);
	
	button.addEventListener('click', function() {
		setState(!zoomed);
	}, false);
	
	return button;
}

//////////////////////////////////////////////////

// 前後のページへ移動するボタン．
function buildLinkButton(title, href) {
	
	var button = document.createElement('DIV');
	setButtonStyle(button, !!href);
	button.innerHTML = title;
	
	setButtonAction(button, !!href, function(){
		button.style.border = BORDER_INSET;
		location.href = href;
	});
	
	return button;
}
