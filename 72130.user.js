// ==UserScript==
// @name           fbzw dive script
// @description    facebook zedwars dive script
// @include        http://www.zedwars.com/fb/docks.php?cmd=move&move*
// ==/UserScript==
var contents = document.getElementById("content");
var link;
if(contents){
	
	var font = contents.getElementsByTagName("font")[0];
	
		
	if(font.textContent.match('.*left.*')){
		var links = contents.getElementsByTagName("a");
		var link = links[0].href;
		

		var movePos = link.lastIndexOf('move');

		var linkMove = link.substring(0,movePos);
		var linkLeft = linkMove + 'move=left';
		var linkRight = linkMove + 'move=right';
		var linkUp = linkMove + 'move=up';
		var linkDown = linkMove + 'move=down';

		var linkUpRight = linkMove + 'move=upright';
		var linkUpLeft = linkMove + 'move=upleft';
		var linkDownRight = linkMove + 'move=downright';
		var linkDownLeft = linkMove + 'move=downleft';

		var imgs = contents.getElementsByTagName("img");
		var img;
		var xyPos = font.textContent.indexOf('X  Y');
		var comaPos = font.textContent.indexOf(',');
		var xVal = font.textContent.substring(xyPos + 4,comaPos);
		var yVal = font.textContent.substring(comaPos + 1);
		xVal = trim(xVal);
		yVal = trim(yVal);
		
		for(var i=0;i<5;++i){		
			img = imgs[i].src;
			//alert(img);
			//alert(xVal);
			//alert(yVal);
			if ((img.match('.*sd-l.gif')) && (xVal > 1)) { //left
				location.href = linkLeft;
			}else if ((img.match('.*sd-r.gif')) && (xVal < 100)) { //right
				location.href = linkRight;
			}else if ((img.match('.*sd-u.gif')) && (yVal < 100)) {//up
				location.href = linkUp;
			}else if ((img.match('.*sd-d.gif')) && (yVal > 1)) {//down
				location.href = linkDown;
			}else if ((img.match('.*sd-ul.gif')) && (xVal > 1) && (yVal < 100)) { //up left
				location.href = linkUpLeft;
			}else if ((img.match('.*sd-ur.gif')) && (xVal < 100) && (yVal < 100)) { //up right
				location.href = linkUpRight;
			}else if ((img.match('.*sd-dl.gif')) && (xVal > 1) && (yVal >1)) {//down left
				location.href = linkDownLeft;
			}else if ((img.match('.*sd-dr.gif')) && (xVal < 100) && (yVal >1)) {//down right
				location.href = linkDownRight;
			}
		}
	}
}

function ltrim(str) { 
	for(var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
	return str.substring(k, str.length);
}
function rtrim(str) {
	for(var j=str.length-1; j>=0 && isWhitespace(str.charAt(j)) ; j--) ;
	return str.substring(0,j+1);
}
function trim(str) {
	return ltrim(rtrim(str));
}
function isWhitespace(charToCheck) {
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}


