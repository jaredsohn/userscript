// ==UserScript==
// @name           Bible Tooltips
// @author         R. Trimble
// @description    Add Scripture tooltips from any online Bible to any Bible reference
// @version        0.3.4
// @include        *
// @exclude        http://www.biblegateway.com/passage/*
// @exclude        http://*.bible.org/*
// @exclude        http://www.gnpcb.org/esv/*
// ==/UserScript==
 
//  This script converts any Bible reference you find on the web to a
//  tooltip. Mouseover the reference and the verse is displayed!
//
//  This version supports eleven bibles and eight different languages
//  mostly thanks to biblegateway.com, please consider supporting them. 
//  
//  If a version you would like is not supported examine the syntax at the
//  bottom of the script to add your own. Alternatively post a request 
//  on userscripts.org/scripts/show/23135
//
//  This script was initally based on James Anderson's NIV Bible Refalizer script
//  http://userscripts.org/scripts/show/6363 which does the hard work of
//  identifying the references. What's new is a call to an online bible to
//  create a css tooltip with the bible verse in it on the page you are
//  viewing, much more convenient!
//  
//
//  Version History
//  23/12/2008 - updated German bible info and added Korean bible.
//               widened refernce matching to catch ch3v16 etc.
//  05/08/2008 - improved reference matching to catch all unicode hyphens
//  18/04/2008 - improved movability of tips, now shouldn't disappear
//               on fast mousemoves.
//  16/04/2008 - generalised NET Bible Tooltips to work with any online
//               bible including ESV and NIV (or any Biblegateway bible)
//  12/04/2008 - fixed bug interfering with textarea inputs
//  04/04/2008 - made tips moveable increasing readability
//               altered dynamic setting of maxwidth
//  24/03/2008 - logo now functions as a link to the passage for
//               easily examining the context
//  23/03/2008 - changed tip positioning allowing cursor to move into the tip
//		         for when you want to copy the text
//  09/03/2008 - corrected some style issues in the tips; verse header now
//               always displays correctly, new calculation of width.
//  23/02/2008 - renamed tool tip classes to prevent css conflicts 
//               script now works on facebook

//Initialise Bible Data
var BIBLEDATA;
loadBIBLEDATA();

var index;

if(!(GM_getValue('bibleVersionIndex')+1)){
	selectBible();
}

function selectBible() {
	var promptText = 'Select Bible Version:\n\n';
	for(var i=0; i<BIBLEDATA.length; i++) {
		if(BIBLEDATA[i].versionFullName != ''){
			promptText = promptText + (i+1) + '. ' + BIBLEDATA[i].versionFullName + ' ('+ BIBLEDATA[i].versionLanguage + ')\n';
		}
	}
	promptText = promptText +'\n\nYou can change your Bible at any time by right clicking\n'+
					 'the Greasemonkey icon and selecting:\n'+
					 'User Script Commands | Select Bible';
	var input = prompt(promptText,'');
	if(input == parseInt(input)&& input <= (BIBLEDATA.length)){
		input = input - 1;
		GM_setValue('bibleVersionIndex',input);

		//ask for donation to Bible provider
		var provider;
		var reload = true;
		if(BIBLEDATA[input].webURL.indexOf('biblegateway')!=-1) {provider = 0;}
		if(BIBLEDATA[input].webURL.indexOf('esv')!=-1) {provider = 1;}
		if(BIBLEDATA[input].webURL.indexOf('bible.org')!=-1) {provider = 2;}

		switch(provider)
		{
		case 0:
			if(confirm('This bible is provided by Bible Gateway\nWould you like to have the option to donate to them?')) {
				window.location.href = 'https://donate.gospelcommunications.org/?i=bg';
				reload = false;
			}

			break;
		case 1:
			if(confirm('This bible is provided by the Standard Bible Society\nWould you like to have the option to donate to them?')) {
				window.location.href = 'http://www.esv.org/sbs';
				reload = false;
			}
			break;
		case 2:
			if(confirm('This bible is provided by the Biblical Studies Foundaion\nWould you like to have the option to donate to them?')) {
				window.location.href = 'http://www.bible.org/page.php?page_id=2769';
				reload = false;
			}
			break;
		default:
			break;
		}

		if(reload) {window.location.reload();}

	} else {
		if(input!=null){
			selectBible();
		}
	}
}

GM_registerMenuCommand('Select Bible',selectBible);


index = GM_getValue('bibleVersionIndex');







var dataURL = BIBLEDATA[index].dataURL;
var dataURL2 = BIBLEDATA[index].dataURL2;
var webURL = BIBLEDATA[index].webURL;
var webURL2 = BIBLEDATA[index].webURL2;
var logoURL = BIBLEDATA[index].logoURL;
var logoDim = BIBLEDATA[index].logoDim;
var logoCrop = BIBLEDATA[index].logoCrop;
var logoCropDim = BIBLEDATA[index].logoCropDim;
var topBarColour = BIBLEDATA[index].topBarColour;
var selectionXPath = BIBLEDATA[index].selectionXPath;
var removalXPath = BIBLEDATA[index].removalXPath;
var version = BIBLEDATA[index].version;
var versionFullName = BIBLEDATA[index].versionFullName;
var versionLanguage = BIBLEDATA[index].versionLanguage;
var versionLanguageRTL = BIBLEDATA[index].versionLanguageRTL;
var versionCSS = BIBLEDATA[index].versionCSS;

//Namespace resolver for XPath requests
function NSResolver(prefix) {
  if(prefix == 'html') {
    return 'http://www.w3.org/1999/xhtml';
  }
  else  {
  //this shouldn't ever happen
    return null;
  }
}


function getScripture (e)
{
//stop the page jumping to the top
if (!e) var e = window.event;
e.preventDefault();

//tell the user we're loading the verse
//and reset position
var link = this;
var ref = link.getAttribute('reference');
var text = 'loading...';
var tip = link.nextSibling;
tip.style.width='150px';
tip.style.left='0px';
tip.style.top='1.26em';
tip.innerHTML = text;

//work out the maximum width for the tip
var maxWidth, minWidth;
maxWidth = 800;
minWidth = 100;

var ancestor = link;
while(ancestor != document.body)
{
var overflow = document.defaultView.getComputedStyle(ancestor,null).getPropertyValue('overflow');
if(overflow == 'hidden') {
	maxWidth = parseInt(0.95*ancestor.offsetWidth);
	break;
}
ancestor = ancestor.parentNode;
}






//go get the verse!
GM_xmlhttpRequest({
    method: 'GET',
    url: dataURL + ref + dataURL2,
    onload: function(responseDetails) {
	//turn the text into a dom object
      var doc = document.createElement('div');
      doc.innerHTML = responseDetails.responseText;
	//get the passage from the page
	var div = document.createElement('div');

	//Select the passage and title
	var selection = document.evaluate(selectionXPath,doc,NSResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
	var currentElem = selection.iterateNext();
	while(currentElem) {
		//alert(currentElem);
		//remove any items we don't want to display
		var removal = document.evaluate(removalXPath,currentElem,NSResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		var removalElem = removal.iterateNext();
		while(removalElem) {
			//alert('REMOVE:'+removalElem+'\n'+removalElem.innerHTML);
			try {
				currentElem.removeChild(removalElem);
			}
			catch(e) {
			try {
				removalElem.style.display = 'none';
			}
			catch(e) {
				//alert('could not remove or hide:'+removalElem+'\n'+removalElem.innerHTML);
			}
			}
			removalElem = removal.iterateNext();
		}
		//add the cleaned items to the holding div
		div.appendChild(currentElem);
		currentElem = selection.iterateNext();
	}
	
	//we only want the text
	text = div.innerHTML;
	//put in a logo
	var logoText = '<a href="' + webURL + ref + webURL2 + '" target="_blank"><img src=' + logoURL + ' height="'+ logoDim[0] + 'px" width="' + logoDim[1] + 'px" style="border: 0; margin: 0px 0px 0px 0px;"></img></a>';
	var float = versionLanguageRTL ? 'left' : 'right';
	if(logoCrop) {
		logoText = 	'<div style="height: ' + logoCropDim[0] + 'px; width: ' + logoCropDim[1] + 'px; overflow-x: hidden; float: ' + float + '; ">' + logoText + '</div>';
	} else {
		logoText = '<div style="float: ' + float + '">' + logoText + '</div>';
	}
	text = logoText + text;
	//cobble together a reasonable width for the tip
	var width = Math.floor(3*4*2*Math.sqrt(text.length*1/6));
	if(width > maxWidth) {width=maxWidth;}
	if(width < minWidth) {width=minWidth;}
	tip.style.width= width + 'px';
	// insert the grab bar
	var barWidth = width +13;
	text = '<div style="height: 3px; width: ' + barWidth + 'px; margin: 0 0 5px -6px; background: '+ topBarColour + ';" class="moveparent"></div>' + text
	//display our verse!
	tip.innerHTML = text;
	//remove event listener 
	link.removeEventListener('mouseover', getScripture, true);
		
    }
});


}




//  stick in some css to hide the tooltip and
//  to make it look good

function insertCSS(csstext)
{
var head = document.getElementsByTagName('head');
var style = document.createElement('style');
style.setAttribute('type','text/css');
head[0].appendChild(style);
style.innerHTML = csstext;
}

var csstext = 'span.NETBibletool {			\n'+
'  position: relative;   				\n'+
'  cursor: help;						\n'+
'}								\n'+
' 								\n'+
'span.NETBibletool span.NETBibletip {		\n'+
'  display: none;        				\n'+
'  position: absolute ! important;			\n'+
'  line-height: 1em;					\n'+
'  padding: 0px 7px 4px 6px;				\n'+
'  border: 1px solid #336;				\n'+
'  background-color: #f7f7ee;				\n'+
'  font-family: arial, helvetica, sans-serif;	\n'+
'  font-size: 71%;					\n'+
'  font-weight: normal;					\n'+
'  color: #000;						\n'+
'  text-align: left;					\n'+
'}								\n'+
'								\n'+
'span.NETBibletool:hover span.NETBibletip {	\n'+
'  display: block ! important;			\n'+
'  z-index: 10000 ! important;			\n'+
'  								\n'+
'}								\n'+
'								\n'+
'.moveparent {cursor: move;}    			';


insertCSS(csstext + versionCSS);



//===========================================
//James' old code, slightly modified
//===========================================

//
// Copyright (C) 2006 James N. Anderson
// Released under the GPL license:
// http://www.gnu.org/copyleft/gpl.html
//



var twoBksPatt = '(?:1|2|II?)\\s*';
var threeBksPatt = '(?:1|2|3|II?I?)\\s*';

var bookPatts = [
	'Genesis', 'Gen?\\.?', 'Gn\\.?',
	'Exodus', 'Exo?d?\\.?',
	'Leviticus', 'Lev?\\.?',
	'Numbers', 'Num?\\.?',
	'Deuteronomy', 'Deut\\.?', 'Dt\\.?',
	'Joshua', 'Josh?\\.?',
	'Judges', 'Ju?dg\\.?',
	'Ruth', 'Ru\\.?',
	twoBksPatt + 'Samuel', twoBksPatt + 'Sam?\\.?',
	twoBksPatt + 'Kings', twoBksPatt + 'Ki\\.?',
	twoBksPatt + 'Chronicles', twoBksPatt + 'Chron\\.?', twoBksPatt + 'Chr?\\.?',
	'Ezra', 'Ezr\\.?',
	'Nehemiah', 'Neh?\\.?',
	'Esther', 'Es\\.?',
	'Job',
	'Psalms?', 'Psa?s?\\.?',
	'Proverbs', 'Pro?v?\\.?',
	'Ecclesiastes', 'Ecc?l?\\.?',
	'Song of Solomon', 'Song of Songs', 'Song',
	'Isaiah', 'Isa?\\.?',
	'Jeremiah', 'Jer?\\.?',
	'Lamentations', 'Lam?\\.?',
	'Ezekiel', 'Ezek?\\.?',
	'Daniel', 'Da?n\\.?',
	'Hosea', 'Hos?\\.?',
	'Joel', 'Joe\\.?',
	'Amos', 'Am\\.?',
	'Obadiah', 'Ob\\.?',
	'Jonah', 'Jon\\.?',
	'Micah', 'Mic\\.?',
	'Nahum', 'Nah?\\.?',
	'Habakkuk', 'Hab\\.?',
	'Zephaniah', 'Zeph?\\.?',
	'Haggai', 'Hagg?\\.?',
	'Zechariah', 'Zech?\\.?',
	'Malachi', 'Mal\\.?',
	'Matthew', 'Matt?\\.?', 'Mt\\.?',
	'Mark', 'Mk\\.?',
	'Luke', 'Lk\\.?',
	'John?', 'Jn\\.?',
	'Acts', 'Ac\\.?',
	'Romans', 'Rom?\\.?', 'Rm\\.?',
	twoBksPatt + 'Corinthians', twoBksPatt + 'Cor?\\.?',
	'Galatians', 'Gal?\\.?',
	'Ephesians', 'Eph?\\.?',
	'Philippians', 'Phil?\\.?',
	'Colossians', 'Col?\\.?',
	twoBksPatt + 'Thessalonians', twoBksPatt + 'Thess?\\.?', twoBksPatt + 'Th\\.?',
	twoBksPatt + 'Timothy', twoBksPatt + 'Tim?\\.?',
	'Titus', 'Tit\\.?',
	'Philemon', 'Philem\\.?',
	'Hebrews', 'He?b\\.?',
	'James', 'Jam?s?\\.?',
	twoBksPatt + 'Peter', twoBksPatt + 'Pet?\\.?',
	'Jude?',
	threeBksPatt + 'John?', threeBksPatt + 'Jn\\.?',
	'Revelation', 'Rev?\\.?'
];

// Create regular expression to match references
// Improved hyphen matching Aug 2008
var fullRefPatt =
		'(' + bookPatts.join('|') + ')\\s*' +	
		'(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}' +
		'(?:(?:\u00AD|\u002D|\u2010|\u2011\u2012|\u2013|\u2212)(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}|ff|f)?' +
		'(?:,\\s*(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}(?:(?:\u00AD|\u002D|\u2010|\u2011\u2012|\u2013|\u2212)(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}|ff|f)?)*';
		

var partRefPatt =
		'\\b(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*\\d{1,3}' +
		'(?:(?:\u00AD|\u002D|\u2010|\u2011\u2012|\u2013|\u2212)(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}|ff|f)?' +
		'(?:,\\s*(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}(?:(?:\u00AD|\u002D|\u2010|\u2011\u2012|\u2013|\u2212)(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}|ff|f)?)*';
var regExp = new RegExp('(?:' + fullRefPatt + ')|(?:' + partRefPatt + ')');

var textNodes, textNode, textNode2, elemNode, parNode, parName, toolSpan, tipSpan;
var matches, ref, textBeforeRef, textAfterRef, lastBook;

// Get all text nodes in document
textNodes = document.evaluate(
		'//text()',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

for (var i = 0; i < textNodes.snapshotLength; i++) {
	textNode = textNodes.snapshotItem(i);
	parNode = textNode.parentNode;
	parName = parNode.nodeName.toLowerCase();
	lastBook = null;
	if (parName != 'a' && parName != 'textarea') {
		// Search for references in text
		while (matches = regExp.exec(textNode.data)) {
			// Get text of reference
			ref = matches[0];
			//ref = ref.replace(/(\d{1,3})(\s*v\s*)(\d{1,3})/,'$1:$3');
			// Get text before and after reference
			textBeforeRef = matches.input.substring(0, matches.index);
			textAfterRef = matches.input.substring(matches.index + ref.length);

			if (matches[1]) {
				// Get text of book (for subsequent partial references)
				lastBook = matches[1];
				// Update text node to contain text before reference
				textNode.data = textBeforeRef;
				// Create tool span and tip span - Feb 2008
				toolSpan = document.createElement('span');
				toolSpan.setAttribute('class', 'NETBibletool');
				tipSpan = document.createElement('span');
				tipSpan.setAttribute('class', 'NETBibletip');
				//tipSpan.setAttribute('style','width: 150px;');
				tipSpan.style.width='150px';
				tipSpan.style.left='0px';
				tipSpan.style.top='1.26em';
				tipSpan.innerHTML = 'Click to view ' + ref + ' (' + version + ')';
				// Add hyperlink element containing reference
				elemNode = document.createElement('a');
				elemNode.href = '#';
				elemNode.setAttribute('reference', ref.replace(/(?:[Cc][h]?\s*)?(\d{1,3})(\s*v\s*)(\d{1,3})/g,'$1:$3'));
				elemNode.innerHTML = ref;
				parNode.insertBefore(toolSpan, textNode.nextSibling);
				toolSpan.appendChild(elemNode);
				toolSpan.appendChild(tipSpan);
				elemNode.addEventListener('click', getScripture, true);
				elemNode.addEventListener('mouseover', getScripture, true);
				// Add second text node containing text after reference
				textNode2 = document.createTextNode(textAfterRef);
				parNode.insertBefore(textNode2, toolSpan.nextSibling);
					
			} else if (lastBook != null) {
				// Update text node to contain text before reference
				textNode.data = textBeforeRef;
				// Create tool span and tip span - Feb 2008
				toolSpan = document.createElement('span');
				toolSpan.setAttribute('class', 'NETBibletool');
				tipSpan = document.createElement('span');
				tipSpan.setAttribute('class', 'NETBibletip');
				//tipSpan.setAttribute('style','width: 150px;');
				tipSpan.style.width='150px';
				tipSpan.style.left='0px';
				tipSpan.style.top='1.26em';
				tipSpan.innerHTML = 'Click to view ' + lastBook + ' ' + ref + ' (' + version + ')';
				// Add hyperlink element containing reference
				elemNode = document.createElement('a');
				elemNode.href = '#';
				elemNode.setAttribute('reference', lastBook + ' ' + ref.replace(/(?:[Cc][h]?\s*)?(\d{1,3})(\s*v\s*)(\d{1,3})/g,'$1:$3'));
				elemNode.innerHTML = ref;
				parNode.insertBefore(toolSpan, textNode.nextSibling);
				toolSpan.appendChild(elemNode);
				toolSpan.appendChild(tipSpan);
				elemNode.addEventListener('click', getScripture, true);
				elemNode.addEventListener('mouseover', getScripture, true);
				// Add second text node containing text after reference
				textNode2 = document.createTextNode(textAfterRef);
				parNode.insertBefore(textNode2, toolSpan.nextSibling);
			} else {
				// Update text node to contain text up to end of reference
				textNode.data = textBeforeRef + ref;
				// Add second text node containing text after reference
				textNode2 = document.createTextNode(textAfterRef);
				parNode.insertBefore(textNode2, textNode.nextSibling);
			}

			// Continue to search for references in text after reference
			textNode = textNode2;
		}
	}
}





// Add the event listeners to make the tip dragable
// Code modified for greasemonkey from 
// http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
//
// To use create an object with class name 'moveparent'
// Grabbing that object will move it and the parent
// object.
// Will not work unless the parent object has had its
// left and top style set by javascript using
// object.style.top = 
// object.style.left = 

   var selObj = null;
   var grabObj = null;
   var orgCursor=null;   // The original Cursor (mouse) Style so we can restore it
   var dragOK=false;     // True if we're allowed to move the element under mouse
   var dragXoffset=0;    // How much we've moved the element on the horozontal
   var dragYoffset=0;    // How much we've moved the element on the vertical
 

   function moveHandler(e){
      if (e == null) { e = window.event } 
      if (e.button<=1&&dragOK){
         selObj.style.left=e.clientX-dragXoffset+'px';
         selObj.style.top=e.clientY-dragYoffset+'px';
	   //tooltip only visible on mouseover, this line ensures it
	   //is displayed throughout the motion
	   selObj.style.display = 'block'; 
         return false;
      }
   }

   function cleanup(e) {
      document.removeEventListener("mousemove",moveHandler,true);
      document.removeEventListener("mouseup",cleanup,true);
	//cleanup the display change
	selObj.style.display = '';
	//restore original cursor
      grabObj.style.cursor=orgCursor;
      dragOK=false;
   }

   function dragHandler(e){
      var htype='-moz-grabbing';
      if (e == null) { e = window.event; htype='move';} 
      var target = e.target != null ? e.target : e.srcElement;
      grabObj=target;
	selObj=target.parentNode;
	var selObjLeft, selObjTop;
      orgCursor=grabObj.style.cursor;
      if (!(target.className.search("moveparent")==-1)) {
	   e.preventDefault();
         grabObj.style.cursor=htype;
         dragOK=true;
	   if(window.getComputedStyle) {
		selObjLeft = document.defaultView.getComputedStyle(selObj,null).getPropertyValue('left');
		selObjTop = document.defaultView.getComputedStyle(selObj,null).getPropertyValue('top');
		}
	   else {
		selObjLeft = selObj.style.left;
		selObjTop = selObj.style.top;
	   }
	   dragXoffset=e.clientX-parseInt(selObjLeft);
         dragYoffset=e.clientY-parseInt(selObjTop );
         document.addEventListener("mousemove",moveHandler,false);
         document.addEventListener("mouseup",cleanup,false);
         return false;
      }
   }
	 
	 document.addEventListener("mousedown",dragHandler,false);





// Configuration Data for different Bible versions
//===================================================
// Syntax
//===================================================
// for each version provide the following
//
// dataURL: first part of URL to retrieve data
// dataURL2: second part after reference (if required) e.g. DataURL + ref + DataURL2
// webURL: first part of link to reference page
// webURL2: second part after reference (if required)
// logoURL: URL of bible logo
// logoDim: [x,y] array of logo dimensions
// logoCrop: true/false if the logo is to be cropped
// logoCropDim: [x,y] array of cropped dimensions
// topBarColour: colour of the top bar of the tip
// selectionXPath: XPath of elements to select from the page
// removalXPath: XPath of elements to remove before displaying (if none use './/nothing')
// version: Shorthand version name e.g. NET, NIV, ESV
// versionFullName: Full name of Version
// versionLanguage: Language of Version
// versionCSS: Custom styling to apply to tip


function loadBIBLEDATA() {

BIBLEDATA = [
	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=31;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=31;',
		logoURL: 'http://www.biblegateway.com/images/versions/NIV_zond.gif',
		logoDim: [35,120],
		logoCrop: false,
		logoCropDim: [35,120],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'NIV',
		versionFullName: 'New International Version',
		versionLanguage: 'en',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},

	{
		dataURL: 'http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=',
		dataURL2: '&include-footnotes=false&include-audio-link=false&include-short-copyright=false',
		webURL: 'http://www.gnpcb.org/esv/search/?q=',
		webURL2: '',
		logoURL: 'http://www.gnpcb.org/esv/assets/esv.logo.gif',
		logoDim: [30,180],
		logoCrop: true,
		logoCropDim: [30,140],
		topBarColour: 'grey',
		selectionXPath: './*',
		removalXPath: './/nothing',
		version: 'ESV',
		versionFullName: 'English Standard Version',
		versionLanguage: 'en',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip h2 {			\n'+
				'  font-size: 18px;							\n'+
				'  margin: 5px 0px;							\n'+
				'  line-height: 20px;							\n'+
				'}										\n'+
				'										\n'+
				'span.NETBibletool span.NETBibletip p.bodytext {	\n'+
				'  line-height: 1em;							\n'+
				'}										\n'+
				'span.NETBibletool span.NETBibletip span.chapter-num,	\n'+
				'span.NETBibletool span.NETBibletip span.verse-num {	\n'+
				'  font-weight: bold;							\n'+
				'}										\n',
	},

	{
		dataURL: 'http://net.bible.org/passage.php?passage=',
		dataURL2: '&mode=text',
		webURL: 'http://net.bible.org/passage.php?passage=',
		webURL2: '',
		logoURL: 'http://bible.org/images/logo.gif',
		logoDim: [27,60],
		logoCrop: false,
		logoCropDim: [27,60],
		topBarColour: '#022d67;',
		selectionXPath: './*|./text()',
		removalXPath: './/nothing',
		version: 'NET',
		versionFullName: 'NET Bible',
		versionLanguage: 'en',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip h1 {		\n'+
				'  font-size: 18px;						\n'+
				'  line-height: 20px;						\n'+
				'}									\n'+
				'									\n'+
				'span.NETBibletool span.NETBibletip p.bodytext {	\n'+
				'  line-height: 1em;						\n'+
				'}									\n'+
				'span.NETBibletool span.NETBibletip span.vref {	\n'+
				'  font-weight: bold;						\n'+
				'}									\n'+
				'									\n'+
				'span.NETBibletool span.NETBibletip p.poetry {	\n'+
				'   margin-bottom: 0em;						\n'+
				'   margin-top: 0em;						\n'+
				'   margin-left: 1em}						\n'+
				'span.NETBibletool span.NETBibletip p.otpoetry {margin-left: 1em}\n',
	},

	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=49;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=49;',
		logoURL: 'http://www.biblegateway.com/images/versions/NASB_zond.gif',
		logoDim: [35,120],
		logoCrop: false,
		logoCropDim: [35,120],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'NASB',
		versionFullName: 'New American Standard Version',
		versionLanguage: 'en',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},

	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=32;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=32;',
		logoURL: 'http://www.biblegateway.com/images/publishers/ibs.gif',
		logoDim: [35,120],
		logoCrop: false,
		logoCropDim: [35,120],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'BDS',
		versionFullName: 'La Bible du Semuer',
		versionLanguage: 'fr',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},

	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=42;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=42;',
		logoURL: 'http://www.biblegateway.com/images/versions/NVI_ibs.gif',
		logoDim: [35,120],
		logoCrop: false,
		logoCropDim: [35,120],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'NVI',
		versionFullName: 'Nueva Version Internacional',
		versionLanguage: 'es',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},

	
	{
	dataURL: 'http://www.biblegateway.com/passage/?search=',
	dataURL2: ';&version=10;',
	webURL: 'http://www.biblegateway.com/passage/?search=',
	webURL2: ';&version=10;',
	logoURL: 'http://www.biblegateway.com/languages/en/images/logo_whitebg.gif',
	logoDim: [32,138],
	logoCrop: false,
	logoCropDim: [32,138],
	topBarColour: 'grey',
	selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
	removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
	version: 'LUT',
	versionFullName: 'Luther 1545',
	versionLanguage: 'de',
	versionLanguageRTL: false,
	versionCSS: 'span.NETBibletool span.NETBibletip span.sup { \n'+
				' font-weight: bold; \n'+
				' font-size:0.65em; \n'+
				' vertical-align:text-top; \n'+
				'} \n'+
				'span.NETBibletool span.NETBibletip p { \n'+
				' margin: 0px 0px 0px 0px; \n'+
				'} \n'+
				'span.NETBibletool span.NETBibletip sup, \n'+
				'span.NETBibletool span.NETBibletip strong { \n'+
				' display: none; \n'+
				'} \n'+
				'span.NETBibletool span.NETBibletip h3 { \n'+
				' font-size: 18px; \n'+
				' margin: 5px 0px; \n'+
				' line-height: 20px; \n'+
				'} \n',
	},

	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=80;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=80;',
		logoURL: 'http://www.biblegateway.com/languages/en/images/logo_whitebg.gif',
		logoDim: [32,138],
		logoCrop: false,
		logoCropDim: [32,138],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'CUVS',
		versionFullName: 'Chinese Union Version (Simplified)',
		versionLanguage: 'zh',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup,	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},

	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=28;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=28;',
		logoURL: 'http://www.biblegateway.com/images/publishers/ibs.gif',
		logoDim: [30,120],
		logoCrop: false,
		logoCropDim: [30,120],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-rtl-serif']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'ALAB',
		versionFullName: 'Arabic Life Application Bible',
		versionLanguage: 'ar',
		versionLanguageRTL: true,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n'+
				'.result-text-style-rtl-serif {			\n'+
				'  font-size: 141%;					\n'+
				'  direction: rtl;					\n'+
				'  text-align: right;						\n'+
				'}								\n',
	},

	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=13;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=13;',
		logoURL: 'http://www.biblegateway.com/languages/en/images/logo_whitebg.gif',
		logoDim: [32,138],
		logoCrop: false,
		logoCropDim: [32,138],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'RSV',
		versionFullName: 'Russian Synodal Version',
		versionLanguage: 'ru',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},
	
	{
		dataURL: 'http://www.biblegateway.com/passage/?search=',
		dataURL2: ';&version=20;',
		webURL: 'http://www.biblegateway.com/passage/?search=',
		webURL2: ';&version=20;',
		logoURL: 'http://www.biblegateway.com/languages/en/images/logo_whitebg.gif',
		logoDim: [32,138],
		logoCrop: false,
		logoCropDim: [32,138],
		topBarColour: 'grey',
		selectionXPath: ".//div[3]/h3|.//div[@class='result-text-style-normal']|.//td[@class='multipassage-box']",
		removalXPath: ".//ol|.//p[@class='txt-sm']|.//div[@class='publisher-info-bottom']",
		version: 'KOREAN',
		versionFullName: 'Korean Bible',
		versionLanguage: 'ko',
		versionLanguageRTL: false,
		versionCSS: 'span.NETBibletool span.NETBibletip span.sup {	\n'+
				'  font-weight: bold;					\n'+
				'  font-size:0.65em;					\n'+
				'  vertical-align:text-top;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip p {	\n'+
				'  margin: 0px 0px 0px 0px;				\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip sup, 	\n'+  
				'span.NETBibletool span.NETBibletip strong {  \n'+
				'  display: none;						\n'+
				'}								\n'+
				'span.NETBibletool span.NETBibletip h3 {	\n'+
				'  font-size: 18px;					\n'+
				'  margin: 5px 0px;					\n'+
				'  line-height: 20px;					\n'+
				'}								\n',
	},

/* Template

	{
		dataURL: '',
		dataURL2: '',
		webURL: '',
		webURL2: '',
		logoURL: '',
		logoDim: [,],
		logoCrop: false,
		logoCropDim: [,],
		topBarColour: '',
		selectionXPath: '',
		removalXPath: '',
		version: '',
		versionFullName: '',
		versionLanguage: '',
		versionLanguageRTL: false,
		versionCSS: '',
	},

*/
];

}