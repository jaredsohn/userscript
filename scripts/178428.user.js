

// ==UserScript== 
// @name anonib image expando 
// @namespace anonib 
// @description expands images like magic!

// @include */anonib.com/*/res*
// @include http://www.anonib.com/*/res* 
// @version        1.1 
// ==/UserScript==

function expandImage() {
	var img;

	img = this.getElementsByTagName('IMG')[0];
	img.src = img.src.replace(/\/thumb\/([0-9]+)s(\.[a-z]+)/, '/src/$1$2');
	img.style.width = 'auto';
	img.style.height = 'auto';

	return false;
}


var allElements, thisElement; 
allElements = document.getElementsByTagName('a'); 

for (var i = 0; i < allElements.length; i++) { 
    thisElement = allElements[i]; 
    thisElement.href = thisElement.href.replace('/img.php?path=http://www.anonib.com',''); 
    
    //thisElement.href = 'javascript: return false;';
    //thisElement.target = '';
    //thisElement.addEventListener('click', expandImage, true);
    if(thisElement.getElementsByTagName('IMG').length > 0) {
        thisElement.href = 'javascript: return false;';
        thisElement.target = '';
        //		links[i].title = 'matched'
        thisElement.addEventListener('click', expandImage, true);
    }
}
