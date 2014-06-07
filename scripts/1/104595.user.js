// ==UserScript==
// @name           CS2 auto-filler
// @namespace      CS
// @description    fills into the inputs different values, or max cargo (if available), on sb, sy, manu
// @include        http://*.chosenspace.com/index.php?go=starbase*
// @include        http://*.chosenspace.com/index.php?go=shipyard*
// @include        http://*.chosenspace.com/index.php?go=manufactory*
// @exclude        http://*.chosenspace.com/*/*
// ==/UserScript==
function button(width,value,onclick){
	var newButton=document.createElement('input');newButton.type='button';newButton.className='forms_btn';
	newButton.style.width=width+'px';newButton.value=value;newButton.setAttribute('onclick',onclick);
	return newButton;}
function clgif(width,height){var newGif=document.createElement('img');newGif.src='images/clear.gif';newGif.height=height;newGif.width=width;newGif.border=0;return newGif;}
var first,extract;
if(window.find("Cargo in Hold", true, false, false, false, false, false)){
	extract=window.getSelection().anchorNode.parentNode.textContent.split('\n').join('');
	window.getSelection().removeAllRanges();}
if(extract!='No Cargo in Hold'){
	var max=extract.split('/')[1].split(')')[0].split(',').join('');
	var now=extract.split('/')[0].split('(')[1].split(',').join('');
	first=button(85,'Max Cargo',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='"+(max-now)+"';}");}
else{
	first=button(85,'fill 5k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='5000';}");}
allTags=document.evaluate("/html/body/table/tbody/tr[3]/td/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisTag=allTags.snapshotItem(0);
if(thisTag){
	thisTag.parentNode.insertBefore(first,thisTag);
	thisTag.parentNode.insertBefore(clgif(5,1), thisTag);
	thisTag.parentNode.insertBefore(button(85,'fill 10k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='10000';}"),thisTag);
	thisTag.parentNode.insertBefore(clgif(5,1), thisTag);
	thisTag.parentNode.insertBefore(button(85,'fill 20k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='20000';}"),thisTag);
	thisTag.parentNode.insertBefore(clgif(5,1), thisTag);
	thisTag.parentNode.insertBefore(button(85,'fill 30k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='30000';}"),thisTag);
	thisTag.parentNode.insertBefore(clgif(5,1), thisTag);
	thisTag.parentNode.insertBefore(button(85,'fill 40k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='40000';}"),thisTag);
	thisTag.parentNode.insertBefore(clgif(5,1), thisTag);
	thisTag.parentNode.insertBefore(button(85,'fill 50k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='50000';}"),thisTag);
	thisTag.parentNode.insertBefore(clgif(5,1), thisTag);
	thisTag.parentNode.insertBefore(button(85,'fill 60k',"var allTags=document.getElementsByName('amount');for(var q=0;q<allTags.length;q++){var thisTag=allTags[q];thisTag.value='60000';}"),thisTag);
}
