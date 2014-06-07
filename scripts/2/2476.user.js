// nytimesadlinkremover
// version 0.7 alpha
// 2005-12-29
// Copyright (c) 2005, Aaron Patterson
// Released under the GPL version 3
// http://www.gnu.org/copyleft/gpl.html
//
//  Removes advertising links from the nytimes this includes links under
//  the table of contents and times select past columns links on the right 
//  in the annoying black/white box - I wouldnt have bothered with this if 
//  the nytimes ads haddent become so darn annoying lately.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "nytimesadlinkremover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            nytimesadlinkremover
// @namespace       http://slashdot.org/~lupine/  
// @description     Removes advertising links on the nytimes
// @include         *nytimes.com*
// ==/UserScript==

(function() {

	 // based on sub element kill all parent elements - recursive - kills top level table
	 function kill_Parent(Pointer,level) { 
	   
	   if (Pointer == null) return;
	   if (Pointer.parentNode == null) return;
	 
	   // keep moving up the parent node - but dont kill the body
	   level--;
	   if (level>0) {
	     if (Pointer.parentNode.parentNode != null) {
	       if (Pointer.parentNode.nodeName != 'BODY') {
	         kill_Parent(Pointer.parentNode,level);
	         return;
		   }
		 } 
	   } 
	   
	   //  GM_log(Pointer.nodeName);   //debug the level we are killing
	   Pointer.parentNode.removeChild(Pointer);     
	 }  

	 /*
	    Written by Jonathan Snook, http://www.snook.ca/jonathan
	    Add-ons by Robert Nyman, http://www.robertnyman.com
	*/
	function getElementsByClassName(oElm, strTagName, strClassName){
	    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	    var arrReturnElements = new Array();
	    strClassName = strClassName.replace(/\-/g, "\\-");
	    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	    var oElement;
	    for(var i=0; i<arrElements.length; i++){
	        oElement = arrElements[i];      
	        if(oRegExp.test(oElement.className)){
	            arrReturnElements.push(oElement);
	        }   
	    }
	    return (arrReturnElements)
	}
 
 function kill_links() { 
 
  //use this to switch the header style size so that it is not so huge.
  GM_addStyle("div#shell.home div#page div#masthead { min-height: 10px; padding: 4px; text-align: left; }");

  var adBox = document.getElementById('Middle1');  //kill the top banner add
  if (adBox) adBox.parentNode.removeChild(adBox);

  adBox = document.getElementById('homeAd1');  //kill the top banner add
  if (adBox) adBox.parentNode.removeChild(adBox);

  adBox = document.getElementById('homeAd2');  //kill the top banner add
  if (adBox) adBox.parentNode.removeChild(adBox);
  
  adBox = document.getElementById('searchSponsorAd');  //kill the top banner add
  if (adBox) adBox.parentNode.removeChild(adBox);
 
  adBox = document.getElementById('searchSponsorHeader');  //kill the top banner add
  if (adBox) adBox.parentNode.removeChild(adBox);
 
  adBox = document.getElementById('dcolTSpromo');  //kill the times select adbox on the right side
  if (adBox) adBox.parentNode.removeChild(adBox);

  adBox = document.getElementById('HPMiddle');  //nytimes old columns adbox
  if (adBox) adBox.parentNode.removeChild(adBox);
  
  var adboxes = getElementsByClassName(document, "div", "story advertisement");  //housing & realestate ads
  for (var i = 0; i < adboxes.length; i++) {
	adboxes[i].parentNode.removeChild(adboxes[i]); 
   }
   
  adboxes = getElementsByClassName(document, "div", "story announcement");  //misc ads
  for (var i = 0; i < adboxes.length; i++) {
	adboxes[i].parentNode.removeChild(adboxes[i]); 
   }

  adboxes = getElementsByClassName(document, "div", "adCreative");  //auto ads and others
  for (var i = 0; i < adboxes.length; i++) {
	adboxes[i].parentNode.removeChild(adboxes[i]); 
   }
  
  
//  adBox = document.getElementById('columnGroup advertisementColumnGroup');  //kill the adbar down the left side below the fold
//  if (adBox) adBox.parentNode.removeChild(adBox);
  
  adBox = document.getElementById('adBar');  //kill the adbar down the left side below the fold
  if (adBox) adBox.innerHTML = "";			//clear the contents but keep the spacing buffer
  
  var badlink = new Array(10);  //update this number when new entries are added
  var badlinklen;
  
  badlinklen = badlink.length;
  for (var x = 0; x < badlinklen; x++) badlink[x] = new Array(2);

  badlink[0][0] = 'column_nonsub';  //this is the keywork to find past column links - used to be 'ad=Dcolumn';  
  badlink[0][1] = '3';          //levels to use kill_Parent rather than just removing the link
  badlink[1][0] = 'adx/bin/adx_click.html';  //kill all other ad-links
  badlink[2][0] = 'doubleclick.';   //kill direct ad-links
  badlink[3][0] = 'mediaplex.';    //kill direct ad-links
  badlink[4][0] = 'select.nytimes.com';  //kill times select links
  badlink[5][0] = 'opinionator.blogs.nytimes.com';  //kill times select blog links  //need to add other banned blogs
  badlink[6][0] = '.page.nytimes.com';  //kill times select blog links
  badlink[7][0] = '/timesselect/whatis.html';  //timesselect ad-info links
  badlink[8][0] = 'nytimes.com/ref/multimedia/podcasts.html';
  badlink[9][0] = 'khovmetroliving.com'; //realestate ads
  badlink[9][1] = '1';
  
  var badtext = new Array(2);  //update this number when new entries are added   
  var badtextlen = badtext.length;
  badtext[0] = 'Save';  //timeselect save this article functionality
  badtext[1] = 'Reprints';      //article reprints for $$$ link
	
  // add more link filters here

  var allLinks, thisLink;
  allLinks = document.evaluate('//a[@href]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  var re, result, hreftext, vistext, found;

  //GM_log('link kill0')
  
  for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    hreftext = thisLink.href;
	vistext = thisLink.innerHTML;
    //GM_log('link: ' + thisLink.innerHTML + ' ' + hreftext);   //use this to see what html links are being checked
	
    found = 0;
	
	re = new RegExp('javascript:pop_me_up2');
    result = re.exec(hreftext);
	
	if (result != null) {
		var strary = thisLink.href.split("'");  //split parameters out of javascript popups - the first param is the real html http address to launch.
		//GM_log('link: ' + strary[1]);
		if (strary[1]) thisLink.href = strary[1];  //remove javascript popup code - launch popup in their own window.
	} else {
	
		for (var x = 0; x < badlinklen; x++) {
		  if (vistext == badtext[x]) {
		    thisLink.innerHTML = "";
			found = 1;
			break;  // force loop end	
		  }
		}  // end for x
	    
		if (found < 1) {
		    for (var x = 0; x < badlinklen; x++) {
		      re = new RegExp(badlink[x][0]);
		      result = re.exec(hreftext);
			  
		      if (result != null) {
			    //GM_log('kill: ' + badlink[x][0] + ' ' + thisLink.innerHTML);   //use this to see what html is being removed & why

				//GM_log('link killx: ' + thisLink.href)
				//if (thisLink.href.indexOf('brownharrisstevens.com') > 0) {
				//  GM_log('link kill1: ' + badlink[x][0] + ' ' + thisLink.href);  
				//  GM_log('link kill2: ' + thisLink.parent.innerHTML);  
				//  }

		        if (badlink[x][1] > 0) {
		          kill_Parent(thisLink,badlink[x][1]);    //kill the parent table 
			    } else {
			      thisLink.innerHTML = "";  //clear the link text
				}
		        break;  // force loop end	
		      } // end if
		    }   // end for x
		}  // end if not found
	  } // end of javascript popup search		
	}	// end for i
  
   //GM_log('link kill done')

  
  var baddivs = new Array(4);  //update this number when new entries are added
  var baddivslen;
  
  baddivslen = baddivs.length;
  
  baddivs[0] = '//div[@id="insideTSMoths"]';   //kill times select pictures/links under the main headlines
  baddivs[1] = '//div[@id="advertiserLinks"]'; //find all grey text 'Advertisement' headers - we dont need them anymore  
  baddivs[2] = '//div[@id="adxBigAd"]';        //find all grey text 'Advertisement' headers - we dont need them anymore  
  baddivs[3] = '//font[@color="#999999"]';     //find all grey text used to display 'Advertisement' text - we dont need them anymore  
	 
  for (var i = 0; i < baddivslen; i++) {
    var divads = document.evaluate(baddivs[i], document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //GM_log('div: ' + baddivs[i] + ' ' + divads.snapshotLength);
    for (var x = 0; x < divads.snapshotLength; x++) kill_Parent(divads.snapshotItem(x),1);
  }   // end for i
  
  //this only works for nytimes.com home page..  other pages display centered content
  var urlstr = window.location;
  if ((urlstr == 'http://www.nytimes.com/') || (urlstr == 'http://nytimes.com/')) {
  //center aligned table cells are all crap-ads
	  var centerads = document.evaluate('//td[@align="center"]',  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	  for (var i = 0; i < centerads.snapshotLength; i++) kill_Parent(centerads.snapshotItem(i),1);
  } // end if urlstr
  
 }  	// end function


 kill_links();

 //if they add a pause before loading I will add a pause... 
 // window.setTimeout(kill_links,500);


})();


