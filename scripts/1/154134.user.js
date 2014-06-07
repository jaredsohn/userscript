// ==UserScript==
// @name        Embiggen Images
// @namespace   ameboide
// @author      ameboide
// @description Shows CSS-resized images (and some thumbnails) in their original size by holding Shift while hovering over the image (or links to images)
// @include     *
// @version     1.10
// ==/UserScript==

var show = false;
var keep = false;
var testing = null;

var keyShow = 16; //shift
var keyKeep = 17; //ctrl

//match common thumbnail urls
var reThumb = [
	[/(-|_)\d+x\d+(?=\.\w+$)|:thumb$|(_mini|_reasonably_small|_normal|_bigger)(?=\.\w+$)|\?(w|h)=\d+&(w|h)=\d+$/, ''],
	[/(\.gravatar\.com\/avatar\/\w+)(\?.+)?$/, '$1?s=529'], //gravatar
	[/(\.gravatar\.com\/avatar)\.php\?.*gravatar_id=(\w+).*$/, '$1/$2?s=529'], //gravatar alt
	[/\._.+(\.\w+)$/, '$1'], //imdb, amazon
	[/\/mini\//, '/large/'], //twitpic
	[/_500(\.\w+)$/, '_1280$1'], //tumblr
	[/(fbcdn.+_)q(\.\w+)$/, '$1n$2'], //facebook avatars
	[/^.+(\?|&)url=([^&]+)(&.+)?/, '$2'], //proxy (g+)
	[/(\/photos\/images\/)list\//, '$1newsfeed/'] //knowyourmeme
];
//match links to images
var reImg = [
	[/\.(png|jpg|jpeg|gif|svg)(\?.+)?$/, '$&'],
	[/^.+&imgurl=([^&]+).*$/, function(x, url){ //google images
		return decodeURIComponent(decodeURI(url));
	}]
];
//match css urls
var reCssUrl = /^url\("(.+)"\)$/;

var lastTarget = null;

var testingClass = 'testing-embiggenable';
var div, bigImg, testImg;

function init(){
	div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.left = 0;
	div.style.maxWidth = '100%';
	div.style.maxHeight = '100%';
	div.style.overflow = 'auto';
	div.style.display = 'none';
	div.style.zIndex = (1<<30)*2-1; //max int32
	document.body.appendChild(div);

	bigImg = document.createElement('img');
	div.appendChild(bigImg);

	var css = document.createElement('style');
	css.innerHTML = '.'+testingClass+'{border:1px dotted red !important;}';
	div.appendChild(css);

	testImg = document.createElement('img');
	testImg.addEventListener('load', function(){
		if(show && testing){
			bigImg.src = testImg.src;
			bigImg.setAttribute('style', '');
			div.style.display = '';
		}
		endTesting();
	}, true);

	testImg.addEventListener('error', endTesting, true);
	testImg.addEventListener('abort', endTesting, true);
}

function testTarget(element, src){
	if(!div) init();
	endTesting();
	element.classList.add(testingClass);
	testing = element;
	testImg.src = src;
}

function endTesting(hide){
	if(hide){
		show = false;
		if(div) div.style.display = 'none';
	}
	if(testing){
		testing.classList.remove(testingClass);
		testing = null;
	}
}

function testReList(img, src, reList){
	for(var i=0; i<reList.length; i++){
		var re = reList[i];
		if (re[0].test(src)){
			testTarget(img, src.replace(re[0], re[1]));
			return true;
		}
	}
	return false;
}

function processTarget(img){
	var parent = img.parentNode;
	if(img.tagName == 'IMG'){
		if(img.width != img.naturalWidth || img.height != img.naturalHeight){
			testTarget(img, img.src);
		}

		if(parent.tagName == 'A' && testReList(img, parent.href, reImg)){
			return true;
		}

		return testReList(img, img.src, reThumb);
	}
	if(img.tagName == 'A' && testReList(img, img.href, reImg)){
		return true;
	}
	while(true){
		var style = window.getComputedStyle(img);
		if(reCssUrl.test(style.backgroundImage)){
			var src = style.backgroundImage.replace(reCssUrl, '$1');
			if(style.backgroundSize != 'auto auto'){
				testTarget(img, src);
			}
			return testReList(img, src, reThumb);
		}
		if(img.offsetWidth != parent.offsetWidth || img.offsetHeight != parent.offsetHeight){
			return false;
		}
		//fake target?
		img = parent;
		parent = img.parentNode;
	}
}

window.addEventListener('keydown', function(e){
	if(e.keyCode == keyShow && !show){
		show = true;
		if(lastTarget){
			processTarget(lastTarget);
		}
	}
	else if(e.keyCode == keyKeep){
		keep = true;
	}
}, true);
window.addEventListener('keyup', function(e){
	if(e.keyCode == keyKeep){
		keep = false;
	}
	else if(!keep && e.keyCode == keyShow){
		endTesting(true);
	}
}, true);

window.addEventListener('mouseover', function(e){
	if(e.target == bigImg) return;
	lastTarget = e.target;
	if(show){
		processTarget(lastTarget);
	}
}, true);

//left click + right click
var b1 = false, stopClick = 0;
window.addEventListener('mousedown', function(e){
	if(b1 && e.buttons == 3){
		if(show){
			endTesting(true);
		}
		else{
			show = true;
			lastTarget = e.target;
			processTarget(lastTarget);
		}
		stopClick = 3;
	}
	b1 = e.buttons == 1;
}, true);

window.addEventListener('click', function(e){
	var b = e.button || 1;
	if(b & stopClick){
		e.preventDefault();
		e.stopPropagation();
		stopClick ^= b;
	}
}, true);
