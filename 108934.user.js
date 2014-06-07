// ==UserScript==
// @name		StudIP_PlainDownload
// @namespace	arne.wendt@tuhh
// @version		0.2.1
// @description 	Removes "Download-Container-Box" and dropdown arrow - download files by a simple click on file name! Download as .zip-archive with klick on archive-icon at beinning of row.
//
// @include		*digicampus.de*folder.php*
// @include		*studip*folder.php*
// @include		*elearning.*folder.php*
// @include		*.elearningspace.de*folder.php*
// @include		*leo.uni-leipzig.de*folder.php*
// @include		*studienportal.vetmed.uni-muenchen.de*folder.php*
// @include		*lms.ph-gmuend.de*folder.php*
// @include		*hs-rm.de*folder.php*
// @include		*neo.hfwu.de*folder.php*
// @include		*lernstudio.bbw-bua.de*folder.php*
// @include		*www.conscien.de*folder.php*
// @include		*studip-bao-leer.de*folder.php*
// @include		*www.mysbs.ch*folder.php*
// @include		*modulverwaltung.rlp.de/sembbs*folder.php*
//
// @exclude		*www.studip.de*
//
// ==/UserScript==

var tds, links, element, operatingon, printhead, zip, files, folder, isinit = 0;

function linkfuck(){
	
	window.removeEventListener('DOMSubtreeModified', linkfuck,true);
    
	tds = document.getElementsByTagName('td');
	files = [];
	

	for(var i=0; i < tds.length; i++){
		if(tds[i].id.indexOf('file_') == 0){
			files.push(tds[i]);
		}
	}
	
	for(var i=0; i < files.length; i++){
		
		element = files[i];
		operatingon = element.parentNode;
		printhead = operatingon.getElementsByClassName('printhead')[0];
		
		links = printhead.getElementsByTagName('a');
		links[1].href = links[0].href;
		
		zip = document.createElement('a');
		zip.title = 'Als .zip-Archiv';
		zip.innerHTML = '<img src="./assets/images/icons/16/blue/file-archive.png" style="padding-right:8px; ">';
		zip.href = links[0].href + '&zip=1';
		printhead.insertBefore(zip, printhead.firstChild);
		delete zip;
		
		operatingon.removeChild(element);
		
	}
	
	window.addEventListener('DOMSubtreeModified', linkfuck,true);
	    
};

function folderfuck(){
	
	linkfuck();
	window.removeEventListener('DOMSubtreeModified', linkfuck,true);
	
	tds = document.getElementsByTagName('td');
	folder = [];
	
	for(var i=0; i < tds.length; i++){
		if(tds[i].id.indexOf('folder_') == 0){
			folder.push(tds[i]);
		}
	}

	for(var i=0; i < folder.length; i++){
		
		
		zip = document.createElement('a');
		zip.title = 'Als .zip-Archiv';
		zip.innerHTML = '<img src="./assets/images/icons/16/blue/file-archive.png" style="padding-right:8px; ">';
		zip.href = folder[i].childNodes[0].href.replace(/(.*open=)([^#]*)(.*)/, '?folderzip=$2');
		folder[i].insertBefore(zip, folder[i].childNodes[1]);
		delete zip;

	}
	
	window.addEventListener('DOMSubtreeModified', linkfuck,true);
		
};

window.addEventListener('DOMSubtreeModified', linkfuck,true);
window.addEventListener('load', folderfuck,true);
folderfuck();
