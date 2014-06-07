// ==UserScript==
// @name           LiveJournal link to referenced image
// @namespace      http://henrik.nyh.se
// @description    For LiveJournal entries containing images, makes key phrases in comments like "5th", "first three", "eighth to last", "monkeylove.jpg" into links to the (assumedly) referenced image. Hovering the link will display linked thumbnails for the referenced images. Also makes the title of the images (the text displayed on hover) state the ordinal number of the image. Keep in mind that the script will (obviously) tend to get the reference wrong in cases like "the second image in the third set" or "the last image of a zebra", as it makes a blanket assumption that references are in relation to all images in the entry. Also works in Opera 9.
// @include        http://*.livejournal.com/*.html*
// ==/UserScript==

/* HANDLES E.G.:
   * filename.jpg
   * second to last, 3rd from last one, fourth last image, fifth last picture
   * first, first one, first image, first 2 images, first three pictures
   * second, third one, fourth image, fifth picture
   * 1st, 2nd image, 3d picture
   * number one, number 2, #3
   * last one, last image, last picture, last 2, last three images, last 4 pictures
   
   * Case-insensitive except for "first" - "twentieth", as you'd typically not put
     it sentence initial when referring to an image - this avoids overgenerating
   * For numbers/ordinals expressed as words, "twenty" and "twentieth" is the upper
     limit, though easily adjusted below

   TO DO:
   * Work with DOM nodes rather than innerHTML
*/

var icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%97IDAT%18%19%05%C1M%88%94u%1C%00%E0%E7%FF%CE%BB%BE%BB%8D%B9V3%DA%8E%C9fR%5EZ%824%CAXY%B2%A8%DDS%04%85%82J%12%7DQ%97%3Ct%09)%88%22%AD%B4%A3%97%C2Ct%12%B2C%97%08%FA%84%BA%14%16%5EB%EC%83uw%C6%D5M%DBr%D6%D9%9Dy%DF_%CF%93%22%02%00%00%00%00%00%00%00%E4%B0%FF%F0%A9c%E5%20%ED%BB%B2%5C%0E_%5B%01%00%40%05%00%8C%14%AC%1Bq%F2%D3%F7%F6%1C%CA%A1%AC%D2%FE%B7%5E%D8%DE%DC%D0l%A6%94r%81%40%05%92%08%22%A8%40(%07%AB%9Ey%F3%8B%838%94%C3%95ke%D1l4%D3K%C7%3F%D6%DA%BC%5EQ%AB%94Q%90%8D%CA%12Y%22%CB%92Z%96%CC%FEv%D6%DB%87%5E%D4%2FS%82%1C%96W%C8%B2%DC%9D%5Bow%F7%03%93jYMDI%CAII%96%92%942Y%96%19%AAe%AA%0A%80%1C%A0BQ%0C%1B%1EYK%04%00%00%00%08%81%009%40%85%FEjO%BFw%9D%94DT%AA(UU%26!%22%D4Ri%B0%BA%2C%A2%02%90%03Dpy%A9%ED%EFKK%FA%D5%40%15%A5%7FW%16%AC%96%B7I%80%0D%C5U%D7%BBKD%06%20%07%88%E0%E2%C2%0D%86.%F4%80%08%A2)%A2%07%E0%AA%11%17.%04%00%C8%A1B%04Ym%0D%15e%FB%8C%C6%EA%1FZ%1Bn%F1%FB%DC%25%BD%CD%0FK%C3%A3%8A%F3%9F%99%D9%D2%F0%C9%C9%13n%8E(%A6%A6%A6%EA9%40%04Q%95%16%7F%FD%DC%BD%B7%86%3D%07%0F%E8v%BB%B6%CE%CD%F9%EA%87%EF%F5%AD%B1%EF%A9%C7%15C%B9N%A7c%CD%D0%CF%C3_%FE%B5%EE%8D%1C%A2%AA%24%B4%CF~c%C7%96%1B%ED%DA%7D%C0%2B%87%8F%F8%EF%E2y%AD%B11%13%13%13%3A%9Dy%1F%1C%7B_%BB%DDq%DF%FD%3B%3D%B2%7B%CA%EC%EC%EC%F3%19%24%10%1E%DA~%97%C6M%EB%C1k%AF%BF%A3%DF%1F%D8%BBw%AF%C9%C9I333%A6%A7%A7%F5%07%03O%3F%FB2%18%1D%1D-rX7%92-U%83%DE%E8%1D%9B%9A~9%F3%138%F5%E1%11UY%3Az%F4%A8z%BD%0E%BA%DD%AE%AA%0A%1F%9D8n%FA%B1G%CD%CF%CF%F7RDx%F2%D5S%EF%0E%AA%B4s%E9%9F%85%7B%D6%5E%FD%B1%BE%EB%C1%1D%A9%B5i%93%FAp%9E%16%16%16%9C%3BwNQ%14%C6%C7%C7m%DC%B8%D1ro%10%9D%F6%DC%EAw%DF~%FDg%8A%08%00%DB%B6m%AB%8D%8D%8DM%D4%EB%F5%D3%ADV%ABY%14E%0D%D9%E2%E2%E2s%98o4%1A%A71%B4%B2%B2R%B6%DB%ED%CB%DDn%F7%89%FF%01%13Z%1B%FD%03ehQ%00%00%00%00IEND%AEB%60%82";
var xpImages = "//div[starts-with(@style, 'margin-left: 30px')]//img[not(starts-with(@src,'http://stat.livejournal.com/')) and not(ancestor::table//text()[.='Current mood:'])]";
var xpComments = "//table[starts-with(@id, 'ljcmt')]/tbody/tr/td[1]";
var xpReferences = "//a[@class='image_reference']";
var cssReference = 'padding-left:20px;background:transparent url() left center no-repeat;';  // Icon is added later for technical reasons
var cssThumbnail = "max-height:75px;border:1px solid #306;margin:2px;";
var cssImagebox = "position:absolute;background:#ACE;border:1px solid #000;color:#000;padding:2px;display:none;";


// XPaths

function xpath(query) { return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
var imgs = xpath(xpImages);
var comments = xpath(xpComments);


var countImgs = imgs.snapshotLength;
if (countImgs > 1) {  // Only continue if there is more than one image

	// Somebody set us up some numerals
	// List of numerals and list of ordinals are assumed to have the same length
	
	var sNumerals = "zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty";
	var sOrdinals = "zeroth|first|second|third|fourth|fifth|sixth|seventh|eight|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth";
	numerals = sNumerals.split('|');
	ordinals = sOrdinals.split('|');
	

	// Lookup table
	
	var lookupTable = {};
	for (n = 0; n < numerals.length; n++)
		lookupTable[numerals[n]] = lookupTable[ordinals[n]] = n;
		
	function lookup(w) { return lookupTable[w.toLowerCase()]; }
	

	// Loop through images
	
	filenames = [];
	for (i = 0; i < countImgs; i++) {  
		img = imgs.snapshotItem(i);
		number = i+1;
		img.id = 'image' + number;
		img.title = 'Image #' + number + '/' + countImgs + ' (' + unescape(img.src) + ')';
		var filename = img.src.substring(img.src.lastIndexOf('/')+1);
		if (filename) {
			filenames[filenames.length] = filename;  // Compile a list of filenames for regexp
			lookupTable[filename.toLowerCase()] = number;  // Add to lookup table
		}
	}
	sFilenames = filenames.join('|').
	replace(/([.(){}[\]])/g, '\\$1');  // Escape special regexp chars that might reasonably appear


	// Helper functions

	var referenceStorage = {};  // Stores meta-data about the reference links
	
	function link_to(start_at, text, how_many) {
		
		var encoded_text = [];  // Encode with numeric HTML entities to avoid re-replacing a string
		for (var y=0; y<text.length; y++)
			encoded_text[encoded_text.length] = "&#x"+text.charCodeAt(y).toString(16)+";";  // Hexadecimal
		encoded_text = encoded_text.join("");
	
		referenceStorage[text] = [start_at, how_many];
		
		return '<a href="#image'+start_at+'" style="'+cssReference+'" class="image_reference">'+encoded_text+'</a>';
	}
	
	function fix(p) {
		if (isNaN(p)) p = lookup(p);  // Numerals and ordinals to numbers
		p = p > 0 ? p : 1;  // >= 1, also catches undefined:s (if e.g. "image" or "picture" was passed)
		p = p > countImgs ? countImgs : p;  // <= countImgs
		return p;
	}
	
	// Replace functions
	
	function replace_from_top(string, linked_text, start_at, how_many) {
		how_many = arguments.length > 5 ? fix(how_many || 1) : 1;  // To avoid using offset value if there are not enough capture groups
		return link_to(fix(start_at), linked_text, how_many);
	}
	
	function replace_from_end(string, linked_text, start_at, how_many) {
		how_many = arguments.length > 5 ? fix(how_many || 1) : 1;  // To avoid using offset value if there are not enough capture groups
		return link_to((countImgs - fix(start_at) + 1), linked_text, how_many);
	}
	
	// Compile regexps
	
	var regexps = {};
	regexps["filename"]	= new RegExp("\\b(("+sFilenames+"))(?![^<]*(</a>|>))\\b", "gi");
	regexps["o to last"]	= new RegExp("\\b((\\d+|"+sOrdinals+")(?:n?d|r?d|th)?(?: to| from)? last(?: one| image| picture)?)\\b", "gi");
	regexps["first ni"]	= new RegExp("\\b((first) (image|picture|photo|\\d+|"+sNumerals+")(?: images|pictures|photos)?)\\b", "gi");
	regexps["o"]			= new RegExp("\\b(("+ordinals.slice(2).join('|')+")(?!( to| from)? last)( one| image| picture| photo)?)(?![^<]*</a>)\\b", "g");
	regexps["number ni"]	= new RegExp("((?:number |#)(\\d+|"+sNumerals+"))\\b", "gi");  // # doesn't like initial \b
	regexps["last n"]		= new RegExp("\\b(last ((image|picture|photo|\\d+|"+sNumerals+"))(?: images|pictures|photos)?)\\b", "gi");
	regexps["ith"]			= new RegExp("\\b((\\d+)(?:st|n?d|r?d|th)(?!( to| from)? last)( image| picture| photo)?)\\b", "gi");
	
	// Replace
	
	for (i = 0; i < comments.snapshotLength; i++) {  // Loop through comments
		
		c = comments.snapshotItem(i);
		
		if (sFilenames)
			c.innerHTML = c.innerHTML.replace(regexps["filename"], replace_from_top);
		
		c.innerHTML = c.innerHTML.
		replace(regexps["o to last"], replace_from_end).
		replace(regexps["first ni"], replace_from_top).
		replace(regexps["o"], replace_from_top).
		replace(regexps["number ni"], replace_from_top).
		replace(regexps["last n"], replace_from_end).
		replace(regexps["ith"], replace_from_top);	
	
	}
	
	
	// Set up imagebox
	
	var imagebox = document.createElement('div');
	imagebox.setAttribute("style", cssImagebox);
	
	function hideImagebox() {
		imagebox.style.display = 'none';
	}
	
	function showImagebox() {
		imagebox.style.display = 'block';
	}
	
	imagebox.addEventListener('mouseover', showImagebox, false);
	imagebox.addEventListener('mouseout', hideImagebox, false);
	
	document.body.appendChild(imagebox);
	
	// Add imageboxen
	
	var references = xpath(xpReferences);
	
	for (i = 0; i < references.snapshotLength; i++) {  // Loop through reference links
		r = references.snapshotItem(i);
		
		r.style.backgroundImage = 'url("'+icon+'")';  // Add data:URI icon now that we're DOMing
		
		r.addEventListener('mouseover', function() {
	
			// Retrieve thumbnail parameters from storage
			var temp = referenceStorage[this.innerHTML];
			var start_at = temp[0], how_many = temp[1];
			
			var thumbs = "";
			for (x = start_at; x < (parseInt(start_at)+parseInt(how_many)); x++) {
				thumbs += '<a href="#image'+x+'"><img src="'+imgs.snapshotItem(x-1).src+'" alt="Thumbnail #'+x+'" style="'+cssThumbnail+'" /></a>';
			}
	
			imagebox.innerHTML = thumbs;
	
			// Position		
			// This bit from http://judas-price.de/alt.php
			for (var id = this, lx = 0,ly = 0; id != null; lx += id.offsetLeft, ly += id.offsetTop, id = id.offsetParent);
			imagebox.style.left = (lx + (0) + (!isNaN(parseInt(imagebox.style.width, 10)) && (lx + parseInt(imagebox.style.width, 10) > window.innerWidth) ? -parseInt(imagebox.style.width, 10) : 0)) + 'px';
			imagebox.style.top  = (ly + (15)) + 'px';  // Set to ...(15)... for Opera
			
			showImagebox();
			
		}, false);
		
		r.addEventListener('mouseout', hideImagebox, false);
	
	}

}