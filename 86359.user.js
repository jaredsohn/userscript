// ==UserScript==
// @name           hlj_preview_images
// @namespace      http://kebrantador.blogspot.com/
// @include        http://www.hlj.com/*
// @version       0.1
// @description	Add button to show larger images (the ones on the detail page)  on the listing pages.
// ==/UserScript==

function $x(xpath, root) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root || doc, null, null, null),

		result = [];
	while (next = got.iterateNext())
		result.push(next);
	return result;
}

function bigImages() {
    console.log('holaaa');
	// Hide table
	$x("//div[contains(@class,'itemblock_small')]")[0].parentNode.parentNode.parentNode.style.display='none';

	// Make width 100%
	var main = $x("//div[@id='container']")[0].style.width='100%';
	
	// Place where we're going to attach all the images
	var main = $x("//div[@id='mainContent']")[0];

	// Get big image for each figure
	var imgs = $x("//div[contains(@class,'itemblock_small')]//a/img");
	imgs.forEach(function(img){
		img.removeAttribute('height');
		img.removeAttribute('width');
		manufacturer = img.alt.substr(0,3).toLowerCase();
		id = img.alt.substr(3).toLowerCase(); 
		img.src='http://static.hlj.com/images/'+manufacturer+"/"+manufacturer+id+".jpg";
	});
	
	// List all figures outside of the table
	var items = $x("//div[contains(@class,'itemblock_small')]");
	items.forEach(function(item){
		main.innerHTML = main.innerHTML + "<div style='display:inline;float:left;border:1px dashed grey'>" + item.childNodes[1].innerHTML + "</div>";
	});
	
	// Place pagination at bottom again
	var paginacionInferior = ($x("//div[@class='clearfix']")[2]);
	paginacionInferior.style.clear='both';
	var paginacionInferior = main.removeChild(paginacionInferior );
	main.appendChild(paginacionInferior);

}

addButton();
 
function addButton(){
	var buttonElems = $x("//div[@id='mainContent']")[0];
	buttonElems.innerHTML =  '<li><input type="button" id="greasemonkeyButton" value="VIEW BIG IMAGES"/></li>' + buttonElems.innerHTML;
	addButtonListener();
}
 
function addButtonListener(){
	var button = document.getElementById("greasemonkeyButton");
	button.addEventListener('click',bigImages,true);
}
