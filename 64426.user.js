// ==UserScript==
// @name           Mangahelpers auto thanks
// @namespace      http://userscripts.org/scripts/show/64426
// @description    thanks automatiaclly
// @include        http://mangahelpers.com/s/*/details/*
// @include        http://mangahelpers.com/downloads/details/*
// @copyright      2009+, Toost Inc.
// @license        kopimi http://www.kopimi.com/kopimi/
// @version        1.1
// ==/UserScript==


var	xpath = document.evaluate(
    "//html/body/div/div[2]/div/div/div/div[4]/form",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
var place = xpath.snapshotItem(0);

if(place!=null){
	
	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]/form",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var place = xpath.snapshotItem(0);	
	
	var br = document.createElement('br')
	place.appendChild(br);

	
	var checkbox = document.createElement('input');
	checkbox.type='checkbox';
	checkbox.id='thankscheckbox';
	place.appendChild(checkbox);
	
	var text = document.createElement('label');
	text.id='thankstext';
	text.style.fontWeight='normal';
	text.innerHTML='Always say Thanks';
	place.appendChild(text);
		
	var checkboxmem = GM_getValue('checkboxmem');
	
	if (checkboxmem==null) {
	
		checkboxmem=false;
		GM_setValue('checkboxmem', checkboxmem);
		checkbox.checked=checkboxmem;
		
	}
	
	else {
		checkbox.checked=checkboxmem;
			if(checkboxmem==true) {
				sayThanks();
			}
	}


	
    checkbox.addEventListener('change',function () {checkboxchange()},false)

}	

else if(place==null) {

	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var place = xpath.snapshotItem(0);	
	
	place.align='center';
	
	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]/h5",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var h5 = xpath.snapshotItem(0);
	
	
	var br = document.createElement('br')
	place.insertBefore(br, h5);

	
	var checkbox = document.createElement('input');
	checkbox.type='checkbox';
	checkbox.id='thankscheckbox';
	checkbox.checked="GM_getValue('checkboxmem')"
	place.insertBefore(checkbox, h5);
	
	var text = document.createElement('label');
	text.id='thankstext';
	text.style.fontWeight='normal';
	text.innerHTML='Always say Thanks';
	place.insertBefore(text, h5);
		

    checkbox.addEventListener('change',function () {checkboxchange()},false)
	
}


function checkboxchange() {
	
	if(checkbox.checked==true){
        sayThanks();
		GM_setValue('checkboxmem', checkbox.checked);
	}
	
	else if (checkbox.checked==false) {
		GM_setValue('checkboxmem', checkbox.checked);
	}
	

}
	
function sayThanks() {
	
	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]/form/input[2]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var Thanks = xpath.snapshotItem(0);
	
	Thanks.click();
	
}




