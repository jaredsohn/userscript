// ==UserScript==
// @name           BlogSpot fullsize image viewer
// @namespace      http://truyen247.com
// @include        *e/picker?protocol=*
// ==/UserScript==


var contentDiv = document.getElementsByClassName('picker-upload-control-success');

var buttonWrapper = document.createElement('div');
buttonWrapper.setAttribute('style','position:fixed; top:15px; left:140px; padding:5px; width:150px; height: 23px;');
buttonWrapper.innerHTML = "<input type='button' value='show large image' class='goog-inline-block jfk-button jfk-button-standard' onClick='showLargeImg()'>";
document.getElementsByTagName('body') [0].appendChild(buttonWrapper);

unsafeWindow.showLargeImg = function(){
	for(i = 0; i < contentDiv.length; i++){
		txt = contentDiv[i].innerHTML;
		matches = txt.match(/https:\/\/lh\d{1}\.googleusercontent.com\/(.*?)">/i);
		if(matches[1] != ''){
			var thumb = 'https://lh'+matches[1];
			var fullsize = 'http://1.bp.blogspot.com/'+matches[1].replace('h120', 's1600');
			contentDiv[i].innerHTML = txt+"<p style='margin-top:3px;'><input type='text' value='"+fullsize+"' style='width:200px;' onClick='this.select()'></p><p style='margin-top:3px;'><img src='"+fullsize+"' height='32' border='1'></p>";
		}
	}
}