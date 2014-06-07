// ==UserScript==
// @name           LDR - Image Picker
// @namespace      http://profile.livedoor.com/ronekko/
// @description    Livedoor Readerで「次/前の画像まで移動する」をj/k風キー操作でできるようになります
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==
// ver. 20091115

const KEY_GOTO_NEXT_IMAGE = '8';
const KEY_GOTO_PREV_IMAGE = '9';
const KEY_OPEN_IMAGE = '0';
var w = unsafeWindow;
var rightBody;
var rightContainer;
var images;
var timer;
var index;
var lastFocusedIndex;
var messageString;

var binarySearch = function(array, target){
	var low, mid, high;
	low = 0;
	high = array.length - 1;
	
	while(low <= high){
		mid = Math.floor((low + high) / 2);
		if(array[mid] < target){
			low = mid + 1;
		}else if(target < array[mid]){
			high = mid - 1;
		}else{
			return mid;
		}
	}
	return mid;
}


var offsetTopFromContainerTop = function(elem){
	var node = elem;
	var offset = node.offsetTop;
	while(node.offsetParent != rightContainer){
		node = node.offsetParent;
		offset += node.offsetTop;
	}
	return offset;
}


var isReady = function(){
	if(!images){
		w.message('画像のロードが未完了です');
		return false;
	}else if(images.length == 0){
		(function(str){
			setTimeout(function(){w.message(str)}, 1000);
		})(document.getElementById("message").innerHTML);
		w.message('画像はありません');
		return false;
	}else{
		return true;
	}
}


var scrollNextImage = function(){
	if(!isReady()){ return; }
	
	if(messageString){
		w.message(messageString);
		messageString = null;
	}
	
	images = images.filter(function(image){ return image.offsetParent; });
	w.removeClass(images[lastFocusedIndex], "ldrip_focus");
	var imageOffsets = images.map(offsetTopFromContainerTop);
	var scrollTop = rightContainer.scrollTop + rightBody.offsetTop;
	if(imageOffsets[index] == scrollTop){
		index += 1;
	}else{
		var neighborhood = binarySearch(imageOffsets, scrollTop);
		index = (imageOffsets[neighborhood] < scrollTop) ? neighborhood + 1 : neighborhood;
	}
	
	for(;;){
		if(index > (images.length - 1)){
			index = lastFocusedIndex;
			messageString = document.getElementById("message").innerHTML;
			w.message("最後の画像です");
			return;
		}
		if(!images[index].width || images[index].width <= 1){
			index++;
		}else{
			w.Control.scroll_to_px(imageOffsets[index]);
			w.addClass(images[index], "ldrip_focus");
			lastFocusedIndex = index;
			break;
		}
	}
}


var scrollPrevImage = function(){
	if(!isReady()){ return; }
	
	if(messageString){
		w.message(messageString);
		messageString = null;
	}
	
	images = images.filter(function(image){ return image.offsetParent; });
	w.removeClass(images[lastFocusedIndex], "ldrip_focus");
	var imageOffsets = images.map(offsetTopFromContainerTop);
	
	var scrollTop = rightContainer.scrollTop + rightBody.offsetTop;
	if(imageOffsets[index] == scrollTop){
		index -= 1;
	}else{
		var neighborhood = binarySearch(imageOffsets, scrollTop);
		index = (scrollTop < imageOffsets[neighborhood]) ? neighborhood - 1 : neighborhood;
	}
	for(;;){
		if(index < 0){
			index = lastFocusedIndex;
			messageString = document.getElementById("message").innerHTML;
			w.message("最初の画像です");
			return;
		}
		if(!images[index].width || images[index].width <= 1){
			index--;
		}else{
			w.Control.scroll_to_px(imageOffsets[index]);
			w.addClass(images[index], "ldrip_focus");
			lastFocusedIndex = index;
			break;
		}
	}
}


var openImage = function(){
	var url;
	var parent;
	var scrollTop = rightContainer.scrollTop + rightBody.offsetTop;
	if(images[index] && offsetTopFromContainerTop(images[index]) == scrollTop){
		parent = images[index].parentNode;
		if(parent.tagName.toLowerCase() == 'a' && parent.href.match(/\.(jpe?g|gif|png|bmp|tiff?|svg)$/i)){
			url = parent.href;
		}else{
			url = images[index].src;
		}
		window.setTimeout(function(){
			GM_openInTab(url);
		}, 0);
	}
}


var getImages = function(){
	var items = rightBody.getElementsByClassName('item_body');
	images = [];
	index = 0;
	lastFocusedIndex = 0;
	for(var i=0; i<items.length; i++){
		items[i].getElementsByTagName('img');
		Array.prototype.push.apply(images, Array.slice(items[i].getElementsByTagName('img')));
	}
	images = images.filter(function(image){ return image.offsetParent; });
	w.message('ロード完了（画像' + images.length + '枚）');
}


w.register_hook('AFTER_CONFIGLOAD', function(){
	GM_addStyle('.ldrip_focus{ border-left:solid 3px #00AAAA; border-right:solid 3px #00AAAA;}');
	w.Keybind.add(KEY_GOTO_NEXT_IMAGE, scrollNextImage);
	w.Keybind.add(KEY_GOTO_PREV_IMAGE, scrollPrevImage);
	w.Keybind.add(KEY_OPEN_IMAGE, openImage);
});


w.register_hook('AFTER_PRINTFEED', function(feed) {
	if(timer){ clearTimeout(timer); };
	
	var numItems = feed.items.length;;
	images = null;
	messageString = null;
	rightBody = document.getElementById('right_body');
	rightContainer = document.getElementById('right_container');
	(function(){
		var itemNodes = rightBody.getElementsByClassName('item');
		if(itemNodes.length === numItems){
			timer = null;
			getImages();
		}else{
			timer = setTimeout(arguments.callee, 500);
		}
	})();
});