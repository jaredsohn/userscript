// ==UserScript==
// @name           CoH Forum Signature Tamer
// @namespace      http://dotfour.net/
// @description    Strips images and ugly fonts from forum signatures
// @include        http://boards.cityofheroes.com/showthread.php*
// @include        http://boards.cityofvillains.com/showthread.php*
// ==/UserScript==

// to disable certain changes, change true to false below
var remove_images = true;
var remove_fonts = true;
var realign_signature = true;

// hide all images
var allowed_hosts = /hide all images/i;

// example: allow cohtitan.com hosted images
//var allowed_hosts = /cohtitan.com/i;

// example: allow cohtitan.com or photobucket hosted images
//var allowed_hosts = /cohtitan.com|photobucket.com/i;

// ----------------------------

function fixSignatures() {
	var divs = document.getElementsByTagName('div');
	try {	
		for (var i = 0; i < divs.length; i++) {		
			if (divs[i].id.indexOf('post_message_') == 0) {				
				var sibling = nextSibling(divs[i]);				
				if ( (sibling != null) && (sibling.nodeName == 'DIV') && (sibling.className != 'smallfont') ) {
					sibling.className = 'signature';					
					if (remove_images) fixImages(sibling);
					if (remove_fonts) fixFonts(sibling);
					if (realign_signature) moveSignature(sibling);
				}
			}		
		}				
	} catch (error) {
		console.log(error);
	}
}

function fixImages(signature) {			
	try {	
		var images = signature.getElementsByTagName('img');	
		var il = images.length;	
		for (var j = 0; j < il; j++) {		
			var image = images[0];		
			if (!allowed_hosts.test(image.src)) {
				var replacement = document.createElement('span');
				if (image.parentNode.nodeName == 'A') {			
					replacement.innerHTML = '[Link: <a href="' + image.parentNode.href + '">' + image.parentNode.href + '</a> Image: <a href="' + image.src + '">' + image.src + '</a>]';				
					image.parentNode.parentNode.replaceChild(replacement, image.parentNode);			
				} else {				
					replacement.innerHTML = '[Image: <a href="' + image.src + '">' + image.src + '</a>]';			
					image.parentNode.replaceChild(replacement, image);
				}	
			}	
		}
	} catch (error) {
		console.log(error);
	}
}

function fixFonts(signature) {		
	try {	
		var fonts = signature.getElementsByTagName('font');	
		for (var j = 0; j < fonts.length; j++) {
			fonts[j].style.fontSize = "100%";
			fonts[j].style.color = "#ffffff";
		}
	} catch (error) {	
		console.log(error);	
	}
}

function moveSignature(signature) {
	try {
		previousSibling(signature).style.minHeight = "103px";
	} catch (error) {
		console.log(error);
	}
}

function nextSibling(orig){
  if (!(ns = orig.nextSibling)) return false;
  while (ns.nodeType != 1) if (!(ns = ns.nextSibling)) return false;
  return ns;
}

function previousSibling(orig){
  if (!(ns = orig.previousSibling)) return false;
  while (ns.nodeType != 1) if (!(ns = ns.previousSibling)) return false;
  return ns;
}

if(!window.console) { window.console = new function() { this.log = function(str) {}; }; }
fixSignatures();