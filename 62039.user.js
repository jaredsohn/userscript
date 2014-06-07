// ==UserScript==
// @name          PageZipper
// @namespace     http://userstyles.org
// @description	  autopagerize 
// @author        pagezipper
// @homepage      http://userstyles.org/styles/15692
// @include       http://*
// @include       https://*
// ==/UserScript==
(/** PageZipper - www.printwhatyoulike.com/pagezipper
 *  A bookmarklet to make any page infinte scroll
 *  Written by Jonathan Koomjian (jonathan@printwhatyoulike.com)
 * 
 *
 *                                           /;    ;\
 *                                      __  \\____//
 *                                     /{_\_/   `'\____
 *                                     \___   (o)  (o  }
 *          _____________________________/          :--'
 *      ,-,'`@@@@@@@@       @@@@@@         \_    `__\
 *     ;:(  @@@@@@@@@        @@@             \___(o'o)
 *     :: )  @@@@          @@@@@@        ,'@@(  `===='
 *     :: : @@@@@:          @@@@         `@@@:
 *     :: \  @@@@@:       @@@@@@@)    (  '@@@'
 *     ;; /\      /`,    @@@@@@@@@\   :@@@@@)
 *     ::/  )    {_----------------:  :~`,~~;
 *    ;;'`; :   )                  :  / `; ;
 *   ;;;  : :   ;                  :  ;  ; :
 *   `'`  / :  :                   :  :  : :
 *       )_ \__;      ";"          :_ ;  \_\       `,','
 *       :__\  \    * `,'*         \  \  :  \   *  8`;'*  *
 *           `^'     \ :/           `^'  `-^-'   \v/ :  \/
 *
 * 
 */


function PageZipper() {

	/*------------------ Configuration -------------------*/
	//TODO add non-english synonyms
	this.nextSynonyms = [
							//beware, the order of this list is referenced elsewhere!
							{syn: "next", weight: 100},
							{syn: "older", weight: 80},
							{syn: "previous", weight: 60},
							{syn: "forward", weight: 50},
							{syn: "continue", weight: 45},
							{syn: ">>", weight: 40, humanReadableOnly: true},
							{syn: ">", weight: 35, humanReadableOnly: true},
							{syn: "more", weight: 30},
							{syn: "page", weight: 25},
							{syn: "-1", weight: 0, humanReadableOnly: true, pageBar: true}		//for nav bars that list pages 1234, list the next page
						];
	this.minimumPageBuffer = 1; //number of unread pages to keep queued
	this.poster_image_margin_top = 10; //how close from the top edge of the brower should the next poster image be placed
	this.poster_image_margin_bottom = 10; //how close from the bottom edge of the brower should the next poster image be placed

	/*------------------------- PageZipper Instance Variables ------------------*/
	this.pages = []; //page, nextLink, posterImg
	this.is_running = false;
	this.is_loading_page = false;
	this.is_bookmarklet = false;
	this.is_extension = false;
	this.ctrl_key_pressed = false;
	this.curr_next_synonym = null; //keep track of which next synonym we use- then use it only- otherwise when we reach the end of a gallery, we will get the back/previous link
	this.onePosterPerPageMode = false;
	this.displayMode = "text";		//can be 'image' or 'text' depending on if this is an image gallery
	this.currDomain = win().location.hostname;
	this.url_list = [ win().location.href ];
	this.media_path;
	this.debug = false;
}


/*------------------------- Initialize ----------------------*/
PageZipper.prototype.loadPageZipper = function() {
	pgzp().addExistingPage(doc().body, win().location.href);
	pgzp().displayMode = pgzp().calculateDisplayMode(pgzp().pages[0]);
	if (pgzp().displayMode == 'image' && pgzp().pages[0].posterImgs.length == 1) pgzp().onePosterPerPageMode = true;
	
	//Override document.write to prevent additional pages from writing to this closed page and messing everything up!
	//FF makes this hard due to security: mikeconley.ca/blog/2009/05/02/overriding-firefox’s-windowalert-part-2/ developer.mozilla.org/en/XPCNativeWrapper
	var currDoc = pgzp().is_extension ? document.getElementById('content').contentWindow.wrappedJSObject.document : doc();
	currDoc.write = currDoc.writeln = currDoc.open = currDoc.close = function(str) {
//		if (!str) return;
//		var scripts = doc().getElementsByTagName("script");
//		//get the last one
//		if (scripts.length > 0) {
//			var lastScript = scripts[ scripts.length - 1];
//			var div = doc().createElement("div");
//			div.innerHTML = str;
//			lastScript.parentNode.insertBefore(div, lastScript);
//		}
		return;
	}
	
	if (pgzp().currDomain == "www.boston.com") pgzp().poster_image_margin_bottom = 60;
	if (pgzp().currDomain == "www.nytimes.com") pgzp().poster_image_margin_top = 40;
}

PageZipper.prototype.runPageZipper = function() {
	pgzp().addEventListener(doc(), "keydown", this.keyDown)
	pgzp().addEventListener(doc(), "keyup", this.keyUp)
	pgzp().addEventListener(win(), "resize", this.positionMenu);
	pgzp().addMenu();
	this.is_running = win().setInterval(pgzp().mainBlock, 250);
}

PageZipper.prototype.stopPageZipper = function() {
	if (this.is_running) {
		win().clearInterval(this.is_running);
		this.is_running = null;
		pgzp().removeMenu();
		pgzp().removeEventListener(doc(), "keydown", this.keyDown)
		pgzp().removeEventListener(doc(), "keyup", this.keyUp)
		pgzp().removeEventListener(win(), "resize", this.positionMenu);
	}
}

/*------------------------- Main Block ----------------------*/
PageZipper.prototype.mainBlock = function() {
//	alert("is loading: " + !pgzp().is_loading_page + " nextLink: " + pgzp().pages[pgzp().pages.length-1]["nextLink"] );

	if (!pgzp()) return; //Firefox when we have switched tabs

	var currPageIndex = pgzp().getCurrentPage();
	var currViewablePage = pgzp().getViewableCurrentPage(currPageIndex);
	
	pgzp().menuSetCurrPageNumber(currViewablePage + 1);

	if (!pgzp().is_loading_page && 
			pgzp().pages[pgzp().pages.length-1]["nextLink"] &&		//has next link
			(
				//scrolling
				(pgzp().pages.length - currPageIndex - 1) < pgzp().minimumPageBuffer ||
				//image advance for pages w/1 image/page
				(pgzp().onePosterPerPageMode && ((pgzp().pages.length-currPageIndex) < 4))
			)
		) {
		pgzp().is_loading_page = true;
		pgzp().url_list.push( pgzp().pages[pgzp().pages.length-1].nextLink.url ); //add to url_list
		pgzp().loadPage( pgzp().pages[pgzp().pages.length-1].nextLink.url );
	}
}

//returns the 0-based index of the current displayed page in pgzp().pages
PageZipper.prototype.getCurrentPage = function() {
	var i, currPage, currPagePos, currPageTop, currPageBottom;
	var currViewBottom = pgzp().screen.getScrollTop() + pgzp().screen.getViewportHeight();
	for (i=0; i<pgzp().pages.length; i++) {
		currPage = pgzp().pages[i].page;
		
		currPagePos = pgzp().findPos(currPage);
		currPageTop = currPagePos.y;
		//if this is the last elem, calculate from bottom of page, else calculate distance to next page
		if (i == (pgzp().pages.length - 1)) {
			currPageBottom = pgzp().screen.getDocumentHeight();
		} else {
			currPageBottom = pgzp().findPos( pgzp().pages[ (i+1) ].page ).y;
		}
		
		//if this is the last page, and page bottom does not extend to bottom, set currPageBottom to currViewBottom
		if (i == (pgzp().pages.length - 1) && currPageBottom < currViewBottom) currPageBottom = currViewBottom;
		
		//curr page if pageTop <= currViewBottom < pageBottom
		//pgzp().log("browser bottom: " + currViewBottom + " currPageTop: " + currPageTop + " currPageBottom: " + currPageBottom + " currPage: " + i);
		if (currPageTop <= currViewBottom && currViewBottom <=  currPageBottom) {
			return i;
		}
	}
	return pgzp().pages.length+1;  //we're at the end of pgzp().pages
}

//gets the current page as viewed by user - whichever page takes up the most space on page is current viewable page
PageZipper.prototype.getViewableCurrentPage = function(currPage) {
	//update page # once next page takes up more than 50% of space in viewport
	var currPageObj = pgzp().pages[currPage];
	
	if  ((pgzp().findPos(currPageObj.page).y - Math.abs(pgzp().screen.getScrollTop())) > (pgzp().screen.getViewportHeight() / 2)) {
		return currPage - 1;
	}
	return currPage;
}

/*------------------------- Load Page ----------------------*/
//takes a url, returns a div containing the body content of the page at url
PageZipper.prototype.loadPage = function(url) {

	//load page
	pgzp().jx.load(url, function(data){

		//try to get only the body, but use the entire doc if we cant locate it
		var results = data.match(/<body.*?>([\w\W]*?)<\/body>/i);
		data = (results && results.length >= 2) ? results[1] : data;

		//remove all js to prevent pgzp.doc.write() from messing us up!
//		data = data.replace(/<script[\w\W]*?>[\w\W]*?<\/script>/ig, '').replace(/<script[\w\W]*?\/>/ig, '').replace(/<noscript>([\w\W]*?)<\/noscript>/ig, "$1");
		
		//pgzp().log("body: " + data);
		pgzp().processPageAdd(data, url);
	});
}

PageZipper.prototype.processPageAdd = function(nextPageData, url) {
	var nextPage = pgzp().buildPageFromData(nextPageData, url);
	pgzp().pages.push(nextPage);
	pgzp().copyPage(nextPage.page);
	pgzp().removeAbsolutePositioning(nextPage.page);
	pgzp().menuIncrementPagesLoaded();
	nextPage.nextLink = pgzp().getNextLink(nextPage.page); //very slow- do this after the page has been loaded
	pgzp().is_loading_page = false;
	pgzp().mainBlock(); //continue the loop
}

PageZipper.prototype.addExistingPage = function(body, url) {
	var nextPage = pgzp().buildPage(body, url);
	pgzp().pages.push(nextPage);
	pgzp().removeAbsolutePositioning(nextPage.page);

	//must set this here, else will try to get largest image on all of pgzp.doc.body, which may be multiple pages by the time it is called
	nextPage.posterImgs = pgzp().getPosterImagesOnPage(nextPage.page);

	nextPage.nextLink = pgzp().getNextLink(nextPage.page); //very slow- do this after the page has been loaded
}

PageZipper.prototype.buildPageFromData = function(data, url) {
		var page = doc().createElement("div");
		page.id = "pgzp_page" + pgzp().pages.length;
		page.style.clear = 'both';
		page.innerHTML = data;
		return pgzp().buildPage(page, url);
}

PageZipper.prototype.buildPage = function(page, url) {
	return {
			'page': page,
			'nextLink': null,
			'posterImgs': null,
			'url': url
			};
}

PageZipper.prototype.copyPage = function(body) {
	doc().body.appendChild(body);
}

//position: absolute with position: relative
PageZipper.prototype.removeAbsolutePositioning = function(body) {
	for (var i=0; i<body.childNodes.length; i++) {
		if (body.childNodes[i].nodeType == 1 && pgzp().css.getStyle(body.childNodes[i], 'position') == 'absolute') {
			pgzp().css.setStyle(body.childNodes[i], 'position', 'static');
		}
	}
}

/*------------------------- Display Mode ----------------------*/

PageZipper.prototype.calculateDisplayMode = function(currPage){
	var textArea = 0, imgArea = 0;
	var i=0, txtP, imgs = {};
	
	//first calculate the area of all text on this page
	txtP = pgzp().getAllTextOnPage(currPage.page);
	doc().body.appendChild(txtP);
	textArea = txtP.offsetWidth * txtP.offsetHeight;
	doc().body.removeChild(txtP);
	
	//calculate area of poster imgs
	if (currPage.posterImgs == null) currPage.posterImgs = pgzp().getPosterImagesOnPage(currPage.page);
	
	//make sure we remove all duplicates! This is important for sites like google and yahoo which use the same image multiple times (sprite.png)
	for (i=0; i<currPage.posterImgs.length; i++) {
		imgs[ currPage.posterImgs[i].src ] = currPage.posterImgs[i];
	}

	for (imgUrl in imgs) {
		var img = imgs[imgUrl];
		imgArea += img.offsetHeight * img.offsetWidth;
	}
	
	//pgzp().log("textArea: " + textArea + " imgArea: " + imgArea + " mode: " + ((textArea >= imgArea) ? "text" : "image"));
	return (textArea >= imgArea) ? "text" : "image";
}

PageZipper.prototype.getAllTextOnPage = function(pageHtml) {
	var str = "";
	
	pgzp().depthFirstRecursion(pageHtml, 	function(curr) {
												if (curr.nodeType == 3 && curr.parentNode.nodeType == 1) {
													var tagName = curr.parentNode.tagName.toLowerCase();
													//filter out obvious bad stuff.  could be improved, but works well enough as is
													if (tagName == "div" || tagName == "span" || tagName == "p" || tagName == "td")
														str += curr.nodeValue + "\n";
												}
											});
	var p = doc().createElement("p");
	p.appendChild( doc().createTextNode(str) );
	return p;
}

/*------------------------- Page Stuff ----------------------*/
PageZipper.prototype.goToNext = function(inc){
	var currPageIndex = pgzp().getViewableCurrentPage(pgzp().getCurrentPage());
	
	if (pgzp().displayMode == 'text') {
		pgzp().goToNextPage(inc, currPageIndex);
	} else {
		if (inc > 0)
			pgzp().goToNextPosterImage();
		else
			pgzp().goToPreviousPosterImage();
	}
}

//For FF Extension
PageZipper.prototype.nextArrow = function(){pgzp().goToNext(1);}
PageZipper.prototype.prevArrow = function(){pgzp().goToNext(-1);}

PageZipper.prototype.goToNextPage = function(inc, currPageIndex) {
	var currPage, pos, amountToScroll, ps;
	currPageIndex += inc;
	if (currPageIndex in pgzp().pages) {
		currPage = pgzp().pages[currPageIndex].page;
		//if currPage has a p elem, scroll to first p
//		ps = currPage.getElementsByTagName("p");
//		//make sure this p is visible
//		if (ps.length > 0 && pgzp().css.getStyle(ps[0], "display") != "none" && pgzp().findPos(ps[0]).y > 10) {
//			amountToScroll = pgzp().findPos(ps[0]).y - pgzp().screen.getScrollTop() - 40;	//a little margin
//		} else {
			amountToScroll = pgzp().findPos(currPage).y - pgzp().screen.getScrollTop();
//		}
		win().scrollBy(0, amountToScroll);
	}
}

/*------------------------- Image Stuff ----------------------*/
//return array of all poster images on page
PageZipper.prototype.getPosterImagesOnPage = function(page) {
	var posterImgs = [], filteredImages = [];
	var okImgDomains = {"www.flickr.com": 1};
	var isFillerImg = function(img) {

		//ignore all images of size less than 100x100 - these can't possibly be big enought to be poster images
		if ( (img.offsetWidth * img.offsetHeight) < (100 * 100) ) {
			filteredImages.push(img);
			return true;
		}
		
		//ignore images which are links to different domains - ie ads, widgets, or logos pointing to home page
		var p = img.parentNode;
		if (p.nodeType == Node.ELEMENT_NODE && p.tagName.toLowerCase() == "a") {
			//pgzp().log("domain: " + pgzp().getDomain(p.href) + " diff domain: " + (pgzp().getDomain(p.href) != pgzp().currDomain) + " home: " + (p.href == ('http://' + pgzp().currDomain)));
			if (pgzp().getDomain(p.href) != pgzp().currDomain && okImgDomains[pgzp().getDomain(p.href)] != 1) {
				return true;
			}
		}
		
		return false;
	}
	
	var getBiggestImg = function(imgs) {
		var biggestImg = null;
		for (var i=0; i<imgs.length; i++) {
			if (biggestImg == null || ((imgs[i].offsetWidth * imgs[i].offsetHeight) > (biggestImg.offsetWidth * biggestImg.offsetHeight))) {
				biggestImg = imgs[i];
			}
		}
		return biggestImg;
	}

	//get all images on given page
	var imgs = pgzp().convertToArray( page.getElementsByTagName("img") );
	//pgzp().logList(imgs, "#imgs: " + imgs.length + " + urls", "#{o.src}: #{o.parentNode.tagName} url: #{o.parentNode.href}");
	
	//filter out unimportant images
	pgzp().filter(imgs, isFillerImg);
	//pgzp().logList(imgs, "#imgs: " + imgs.length + " + urls after filter", "#{o.src}: #{o.parentNode.tagName} url: #{o.parentNode.href}");

	if (imgs.length < 2) return imgs;  //if 0 or 1 imgs, just return 
					
	//sort by size
	imgs.sort(function(a, b) {
					var sizeA = a.offsetWidth * a.offsetHeight;
					var sizeB = b.offsetWidth * b.offsetHeight;
					return sizeB - sizeA;
				});
	//pgzp().logList(imgs, "imgs ordered by size", "#{o.offsetWidth * o.offsetHeight}\t#{o.src}");

	//if just 1 img per page, return biggest img
	if (pgzp().onePosterPerPageMode) return [ imgs[0] ];
	
	//Add back in the largest filtered image
	//the idea here is that we are looking for a series of large images, all about the same size
	//we find these by comparing to the sizes of the other images on the page, and finding the largest gaps between image sizes
	//so we need 1 image we know is outside the group to compare against
	//since biggestSmallImg image is smallest in imgs, it will always get filtered out
	var biggestSmallImg = getBiggestImg(filteredImages);
	if (biggestSmallImg) {
		imgs.push(biggestSmallImg);
	}
	
	//mark the largest gap in size between image sizes, then delete all images after the gap
	var biggestGap = [0, 1]; //gap, index of bigger elem
	for (var i=1; i<imgs.length; i++) {
		var bigger = imgs[i-1], biggerSize = bigger.offsetHeight * bigger.offsetWidth;
		var smaller = imgs[i], smallerSize = smaller.offsetHeight * smaller.offsetWidth;
		var relGap = (biggerSize == 0 || smallerSize == 0 ? 0 : (biggerSize / smallerSize)), absGap = (biggerSize - smallerSize), totalGap = (relGap * absGap);
		//pgzp().log("rel gap: " + relGap + " abs gap: " + absGap + " total gap: " + totalGap + " smallerSize: " + smallerSize + " biggerSize: " + biggerSize + " smaller img: " + imgs[i].src);
		if (totalGap >= biggestGap[0]) {
			biggestGap = [totalGap, i];
		}
	}
	//remove all images after the gap
	//pgzp().log("biggest gap: " + biggestGap[0] + " at img: " + imgs[biggestGap[1]].src);
	imgs.splice(biggestGap[1], (imgs.length - biggestGap[1]) );
	
	//return poster imgs, ordered by y position - top to bottom
	imgs.sort(function(a, b) {
				return pgzp().findPos(a).y - pgzp().findPos(b).y;
			});
	//pgzp().logList(imgs, "#poster imgs: " + imgs.length + " ordered by y", "#{pgzp().findPos(o).y}\t#{o.src}");
			
	return imgs;
}

//if a given image is taller than the viewport, resize the image to fit perfectly in the viewport
PageZipper.prototype.resizeImageToViewport = function(img) {
	var usableViewport = pgzp().screen.getViewportHeight() - pgzp().poster_image_margin_top - pgzp().poster_image_margin_bottom;
	if (img.offsetHeight > usableViewport) {
		//scale image
		img.style.width = ( usableViewport / img.offsetHeight ) * img.offsetWidth + 'px';
		img.style.height = usableViewport + 'px';
	}
}

//go to the next poster image
//TODO combine goToNext and goToPrevious
PageZipper.prototype.goToNextPosterImage = function() {
	var browserBorderTop = pgzp().screen.getScrollTop() + pgzp().poster_image_margin_top + 1; //start looking for next poster image below this line
	
	for (var i=0; i<pgzp().pages.length; i++) {
		//calculate the largest image here - we leave this as late as possible b/c all images on page have to be loaded
		if (pgzp().pages[i].posterImgs == null) pgzp().pages[i].posterImgs = pgzp().getPosterImagesOnPage(pgzp().pages[i].page);
		
		for (var j=0; j<pgzp().pages[i].posterImgs.length; j++) {
			var currPosterImg = pgzp().pages[i].posterImgs[j];
			var pos = pgzp().findPos(currPosterImg);
			//if (window['console']) pgzp.log("page " + i + " of " + pgzp.pages.length + " : " + pos.y + " body: " + pgzp.pages[i].page + " " + pgzp.pages[i].page.id);
			//array should be ordered top to bottom
			if (pos.y > browserBorderTop) {
				pgzp().resizeImageToViewport(currPosterImg);
				var amountToScroll = (pos.y - pgzp().poster_image_margin_top) - pgzp().screen.getScrollTop();
				win().scrollBy(0, amountToScroll);
				return;
			}
		}
	}
}

PageZipper.prototype.goToPreviousPosterImage = function() {
	var browserBorderTop = pgzp().screen.getScrollTop() + pgzp().poster_image_margin_top - 1; //start looking for next poster above below this line
	
	//iterate from bottom to top- find first image w/top above browser top
	for (var i=(pgzp().pages.length-1); i>=0; i--) {
		if (pgzp().pages[i].posterImgs == null) pgzp().pages[i].posterImgs = pgzp().getPosterImagesOnPage(pgzp().pages[i].page);
		
		for (var j=(pgzp().pages[i].posterImgs.length-1); j>=0; j--) {
			var currPosterImg = pgzp().pages[i].posterImgs[j];
			var pos = pgzp().findPos(currPosterImg);
			//array should be ordered top to bottom
			if (pos.y < browserBorderTop) {
				pgzp().resizeImageToViewport(currPosterImg);
				var amountToScroll = (pos.y - pgzp().poster_image_margin_top) - pgzp().screen.getScrollTop();
				win().scrollBy(0, amountToScroll);
				return;
			}
		}
	}
}
/*------------------------- Image Events ----------------------*/
PageZipper.prototype.keyDown = function(event) {
	//pgzp().log("key code: " + event.keyCode, true);
	event = pgzp().captureEvent(event);
	switch (event.keyCode) {
		//down arrow, >
		case 40:
		case 190:
			if (pgzp().ctrl_key_pressed) {
				pgzp().goToNext(1);
				pgzp().noBubble(event);
			}
			break;
		//up arrow, <
		case 38:
		case 188:
			if (pgzp().ctrl_key_pressed) {
				pgzp().goToNext(-1);
				pgzp().noBubble(event);
			}
			break;
		//seperate handler for cntrl
		//treat apple key like cntrl
		case 17:
		case 224:
			pgzp().ctrl_key_pressed = true;
			break;
	}
}

PageZipper.prototype.keyUp = function(event) {
//	pgzp().log("key code: " + event.keyCode);
	event = pgzp().captureEvent(event);
	switch (event.keyCode) {
		//cntrl
		case 17:
		case 224:
			pgzp().ctrl_key_pressed = false;
			break;
	}
}

/*------------------------ Menu Stuff ----------------------------*/
PageZipper.prototype.addMenu = function() {
	var css = "																																						\
		#pgzp_menu a, #pgzp_menu a * {border: 0; text-decoration: none;}																								\
		#pgzp_menu {position: fixed; top: 0px; float:left; padding: 0px 5px; background-color: #D3D3D3; color: black; z-index: 10000;}												\
		.pgzp_block {display: block; float: left;}																														\
		.pgzp_button {display: block; width: 32px; height: 32px;}																										\
		a.pgzp_button_prev_active {background: transparent url('${media_path}32-gnome-prev.png') no-repeat scroll top left; }			\
		a:hover.pgzp_button_prev_active {background-image: url('${media_path}32-gnome-prev_red.png'); }									\
		a.pgzp_button_prev_inactive {background: transparent url('${media_path}32-gnome-prev_gray.png') no-repeat scroll top left; }	\
		a.pgzp_button_next_active {background: transparent url('${media_path}32-gnome-next.png') no-repeat scroll top left; }			\
		a:hover.pgzp_button_next_active {background-image: url('${media_path}32-gnome-next_red.png'); }									\
		a.pgzp_button_next_inactive {background: transparent url('${media_path}32-gnome-next_gray.png') no-repeat scroll top left; }	\
		#pgzp_curr_page {font-size: 24px;}																																\
		#pgzp_loaded_pages {font-size: 18px;}																															\
	";

	var html = "																																							\
		<div id='pgzp_menu'>																																				\
			<a href='javascript:pgzp().goToNext(-1)' id='pgzp_button_prev' class='pgzp_block pgzp_button pgzp_button_prev_active' title='Previous - Cntrl Up or Cntrl <'></a>	\
			<a href='javascript:pgzp().goToNext(1)' id='pgzp_button_next' class='pgzp_block pgzp_button pgzp_button_next_active' title='Next - Cntrl Down or Cntrl >'></a>	\
			<div class='pgzp_block' style='padding-left: 5px;'><span id='pgzp_curr_page'>1</span><span id='pgzp_loaded_pages'>/1</span></div>								\
			<a href='http://www.printwhatyoulike.com/pagezipper' target='_blank' class='pgzp_block pgzp_button' style='padding-left: 5px'>												\
				<img src='${media_path}zipper_32.png' alt='PageZipper!' style='border-width: 0px' />										\
			</a>																																							\
		</div>																																								\
	";	
	
	//replace ${media_path} with actual value
	css = css.replace(/\$\{media_path\}/g, pgzp().media_path).strip();
	html = html.replace(/\$\{media_path\}/g, pgzp().media_path).strip();

	//insert css
	var cssElem = doc().createElement('style');
	cssElem.setAttribute("type", "text/css");
	if (cssElem.styleSheet) {
		cssElem.styleSheet.cssText = css; //IE only
	} else {
		cssElem.appendChild( doc().createTextNode(css) );	//everyone else
	}
	doc().getElementsByTagName('head')[0].appendChild(cssElem);

	//insert html
	var div = doc().createElement("div");
	div.innerHTML = html;
	div = div.childNodes[0];
	doc().body.appendChild(div);
	pgzp().positionMenu();
	
	//make some changes for the extension
	if (pgzp().is_extension) {
		var fixLink = function(linkId, eventHandler) {
			var link = doc().getElementById(linkId);
			link.removeAttribute("href");
			pgzp().addEventListener(link, "click", eventHandler);
		}
		fixLink("pgzp_button_prev", pgzp().prevArrow)
		fixLink("pgzp_button_next", pgzp().nextArrow)
	}
}

PageZipper.prototype.positionMenu = function() {
	var div = doc().getElementById('pgzp_menu');
	div.style.left = (pgzp().screen.getViewportWidth() - div.offsetWidth - 30) + 'px';
}

PageZipper.prototype.removeMenu = function() {
	var menu = doc().getElementById('pgzp_menu');
	if (menu) doc().body.removeChild(menu);
}

PageZipper.prototype.menuIncrementPagesLoaded = function() {
	var loadedPages = doc().getElementById("pgzp_loaded_pages"), num;
	if (loadedPages) {
		//just to make this more confusing, parseInt is in window, not window.content in ff-extension
		num = parseInt(loadedPages.innerHTML.replace("/", "", "g"), 10);
		num++;
		loadedPages.innerHTML = "/" + num;
	}
}

PageZipper.prototype.menuSetCurrPageNumber = function(currPage) {
	var currPageObj = pgzp().pages[currPage - 1];
	doc().getElementById("pgzp_curr_page").innerHTML = currPage;
	
	//disable/enable arrows as required
	if (pgzp().displayMode == "text") {
		pgzp().updateButtonState((currPage != 1), "prev"); //if on first page, prev disabled, else enabled
		pgzp().updateButtonState((currPage != pgzp().pages.length), "next"); //if on last page next, disabled, else enabled
	} else {
		var top = pgzp().screen.getScrollTop();
		
		//for prev, only disable when we are above first img on first page
		var displayPrev = (pgzp().findPos(pgzp().pages[0].posterImgs[0]).y < top)
		pgzp().updateButtonState(displayPrev, "prev");
		//for next, disble if currPage == lastPage and we are below last image on page
		var disableNext = 	(currPage == pgzp().pages.length && 
							currPageObj.posterImgs && 
							pgzp().findPos( currPageObj.posterImgs[ currPageObj.posterImgs.length-1 ] ).y < (top+pgzp().poster_image_margin_top+1)
							);
		pgzp().updateButtonState(!disableNext, "next");
	}
}

//buttonName = 'prev' or 'next'
PageZipper.prototype.updateButtonState = function(enable, buttonName) {
	var button = doc().getElementById("pgzp_button_" + buttonName);
	var activeClass = "pgzp_button_" + buttonName + "_active";
	var inactiveClass = "pgzp_button_" + buttonName + "_inactive";
	
	if (enable) {
		pgzp().css.replaceClass(button, inactiveClass, activeClass);
	} else {
		pgzp().css.replaceClass(button, activeClass, inactiveClass);
	}
}

/*------------------------- Get Next Page URL ----------------------*/
//NextLink object we will be scoring
//isReadableText = human readable content- not url
PageZipper.prototype.NextLink = function(text, link, alreadyLoaded, isHumanReadableText) {
	this.text = text;
	this.link = link;
	this.isHumanReadableText = (isHumanReadableText == undefined) ? true : isHumanReadableText;
	this.alreadyLoaded = alreadyLoaded;
	this.url = link.href;
	this.finalScore = null;
	this.trialScores = {};
	this.addScore = function(trialName, score, isNormalized) {
		var normalizedKey = isNormalized ? 'normalizedScore' : 'unnormalizedScore';
		if (!this.trialScores[trialName]) this.trialScores[trialName] = {};
		this.trialScores[trialName][normalizedKey] = score;
	}
	this.getScore = function(trialName, isNormalized) {
		//for trials which do not get normalized, just return unnormalized score
		if (isNormalized && pgzp().trials[trialName].noNormailization) isNormalized = false;
		var normalizedKey = isNormalized ? 'normalizedScore' : 'unnormalizedScore';
		return this.trialScores[trialName][normalizedKey];
	}
	this.calculateTotalScore = function() {
		this.finalScore = 0;
		if (pgzp().debug) var debugStr = "Calculate Final Score: " + this.text + ": " + this.url;
		for (var trial in this.trialScores) {
			if (pgzp().trials.hasOwnProperty(trial)) {
				var nScore = this.getScore(trial, true);
				var weight = pgzp().trials[trial].weight;
				this.finalScore += nScore * weight;
				if (pgzp().debug) debugStr += "\n\t" + trial + "\t\t\t" + nScore + "\tx\t" + weight + "\t=\t" + (nScore * weight);
			}
		}
		if (pgzp().debug) pgzp().log(debugStr + "\nFinal Score:\t" + this.finalScore);
		return this.finalScore;
	}
}

//Trials - These are the tests we will use to score the links
PageZipper.prototype.trials = {
	'contains_next_syn': {
						'doScore': function(nextLink) {
										var i, currWord, score = 0;
										for (i=0; i<pgzp().nextSynonyms.length; i++) {
											currWord = pgzp().nextSynonyms[i];
											//+ for containing a keyword
											if (nextLink.text.toLowerCase().indexOf(currWord.syn) >= 0) {
												if (currWord['humanReadableOnly']) {
													if (
														!nextLink.isHumanReadableText ||						//don't allow index as syn on urls
														nextLink.text.toLowerCase().indexOf("comment") >= 0		//blogs often say something link '2 comments' - ignore this
													) continue;  
												}
												//make sure syns are not included as part of something else - ex 'page 2', not '2009', 'older' not placeholder.jpg
												//for human readable, identify breaks by whitespace, for non-human readable, use any non a-z character
												//'next' is never used outside its meaning, so dont worry about it
												if (currWord.syn != "next" && !pgzp().isStandaloneWord(currWord.syn, nextLink.text, nextLink.isHumanReadableText)) continue;
												if (currWord['pageBar'] && !nextLink.isPageBar) continue; //if this is a # from page bar, make sure this link is actually in page bar
												//pgzp().log("adding syn: " + currWord.syn + " to " + nextLink.url);
												if (currWord.weight >= score) {
													score = currWord.weight; //assign weight for keyword used
													nextLink.nextSyn = currWord.syn;
												}
											} else if (!currWord['humanReadableOnly'] && nextLink.url.toLowerCase().indexOf(currWord.syn) >= 0) {
												//also check urls
												if (!pgzp().isStandaloneWord(currWord.syn, nextLink.url, false)) continue;
												if (currWord.weight >= score) {
													score = currWord.weight; //assign weight for keyword used
													nextLink.nextSyn = currWord.syn;
												}
											}
										}
										nextLink.addScore('contains_next_syn', score);
									},
						'weight': 100,
						'noNormailization': true
						},
	//urls similar to known next urls are more likely to be correct
	'url_similarity': {
						'doScore': function(nextLink) {
									var lastUrl, currUrl, shorter, longer, score = 0, i;
									lastUrl = pgzp().pages[ pgzp().pages.length-1 ].url;
									currUrl = nextLink.url;
									if (lastUrl.length <= currUrl.length) {
										shorter = lastUrl;
										longer = currUrl;
									} else {
										shorter = currUrl;
										longer = lastUrl;
									}
									
									//subtract points for differences in length
									score = shorter.length - longer.length;
									
									//add points for matching chars, remove for different chars
									for (i=0; i<shorter.length; i++) {
										if (shorter.charAt(i) == longer.charAt(i)) score++;	else score--;
									}
									
									nextLink.addScore('url_similarity', score);
								},
						'weight': 70
						},
	'url_ends_in_number': {
						'doScore': function(nextLink) {
										var results = nextLink.url.match(/^.*?(\d+)(\/+|\.\w+)?$/);
										//verify url ends in number & number is < 99 - we want /page=3 not /abx43923829
										if (results && (parseInt(results[1], 10) < 99))
											nextLink.addScore('url_ends_in_number', 100);
										else
											nextLink.addScore('url_ends_in_number', 0);
									},
						'weight': 60
						},
	//if multiple links have the same text but point to different urls, they are not next links
	'duplicate_text': {
						'doScore': function(nextLink) {
									var score = 100;
									if (pgzp().linkTextIndex[nextLink.text] && pgzp().linkTextIndex[nextLink.text].length > 0) {
										//subtract 20 points for each additional url
										score = score - (pgzp().linkTextIndex[nextLink.text].length - 1) * 20;
									}
									nextLink.addScore('duplicate_text', score);
								},
						'weight': 60
						},
	'begins_or_ends_with_next_syn': {
						'doScore': function(nextLink) {
										if (nextLink.nextSyn && (nextLink.text.toLowerCase().startsWith(nextLink.nextSyn) || nextLink.text.toLowerCase().endsWith(nextLink.nextSyn)))
											nextLink.addScore('begins_or_ends_with_next_syn', 100);
										else
											nextLink.addScore('begins_or_ends_with_next_syn', 0);
									},
						'weight': 20
						},
	'text_size': {
					'doScore': function(nextLink) {
								//points for larger size per char
								var areaPerChar = Math.floor( (nextLink.link.offsetWidth * nextLink.link.offsetHeight) / nextLink.text.length );
								nextLink.addScore('text_size', areaPerChar);
							},
					'weight': 10
					},
	'chars_in_text': {
					'doScore': function(nextLink) {
									//-1pt for each char in text
									nextLink.addScore('chars_in_text', (nextLink.text.length * -1));
								},
					'weight': 10
					}						
};

PageZipper.prototype.getNextLink = function(body) {
	var allNextLinks = pgzp().getAllNextLinks(body);
	var pageBarInfo = pgzp().getCurrentPageNumberFromPageBar(allNextLinks);
	pgzp().log("looking for page #: " + (pageBarInfo[0] + 1) + " w/confidence: " + pageBarInfo[1]);
	pgzp().nextSynonyms[pgzp().nextSynonyms.length-1].syn = (pageBarInfo[0] + 1) + "";	//update nextSynonyms
	pgzp().nextSynonyms[pgzp().nextSynonyms.length-1].weight = pageBarInfo[1];	//update weight/confidence
	pgzp().linkTextIndex = pgzp().indexDuplicateLinks(allNextLinks);
	pgzp().filter(allNextLinks, function(link) {return link.alreadyLoaded;});	//filter out already loaded links, needed by pageBar, but not need anymore
	pgzp().scoreLinks(allNextLinks);
	pgzp().normalizeLinks(allNextLinks);
	if (allNextLinks.length <= 0) return null;
	var highestLink = pgzp().getHighestTotalScore(allNextLinks);
	//keep track of the matching next syn - if it chagnes, assume we are using a different link and have reached the end of the set
//	if (pgzp.pages.length) alert("firstPageSyn: " + pgzp.pages[0].nextLink.nextSyn + " currSyn: " + highestLink.nextSyn + " set end?: " + (pgzp.pages[0].nextLink.nextSyn != highestLink.nextSyn));

	//stop here if highestLink has a different syn than the first link
	if (pgzp().pages.length > 1 && //don't check on first page
		!pgzp().isNumber(pgzp().pages[0].nextLink.nextSyn) && !pgzp().isNumber(highestLink.nextSyn) &&  //only compare if we are not using page indexes
		pgzp().pages[0].nextLink.nextSyn != highestLink.nextSyn)
		return null;
	return highestLink;
}

//get all links and score them
PageZipper.prototype.scoreLinks = function(allNextLinks) {
	if (pgzp().debug) var debugMsg = '';
	for (var trial in pgzp().trials) {
		if (pgzp().trials.hasOwnProperty(trial)) { //block out stuff added by site with Object.prototype
			for (var i=0; i<allNextLinks.length; i++) {
				pgzp().trials[trial].doScore(allNextLinks[i]);
				if (pgzp().debug) debugMsg += "\nScore " + trial + " " + allNextLinks[i].text + ": " + allNextLinks[i].getScore(trial);
				//remove any links which scored 0 on containing a keyword - do it here so we don't have to continue scoring links we know are bad
				if (trial == 'contains_next_syn' && allNextLinks[i].getScore('contains_next_syn') <= 0) {
					allNextLinks.splice(i, 1);
					i--;
				}
			}
		}
	}
	if (pgzp().debug) pgzp().log(debugMsg);
}

//normalize scores from 1-100
PageZipper.prototype.normalizeLinks = function(allLinks) {
	for (var trial in pgzp().trials) {
		//block out stuff added by site with Object.prototype, trials not meant to be normailzed
		if (pgzp().trials.hasOwnProperty(trial) && !pgzp().trials[trial].noNormailization) {
			pgzp().normalizeTrialSet(trial, allLinks);
		}
	}
}

//takes a trial name, normalizes all scores to between 0 and 100
PageZipper.prototype.normalizeTrialSet = function(trialName, allLinks) {
	//get highest and lowest scores
	var highest, lowest = null;
	for (var i=0; i<allLinks.length; i++) {
		var score = allLinks[i].getScore(trialName);
		if (highest == null || score > highest) highest = score;
		if (lowest == null || score < lowest) lowest = score;
	}

	//now normalize
	if (pgzp().debug) var debugMsg = 'Normalizing Trial Set: ' + trialName;
	var curve = (highest == lowest) ? 0 : (100 / (highest - lowest));
	for (var i=0; i<allLinks.length; i++) {
		var score = allLinks[i].getScore(trialName);
		var nScore = Math.floor((score - lowest) * curve);
		allLinks[i].addScore(trialName, nScore, true);
		if (pgzp().debug) debugMsg += "\nNScore " + i + ": " + allLinks[i].text + ": score: " + score + " curve: " + curve + " higest: " + highest + " lowest: " + lowest + " nscore: " + nScore;
	}
	if (pgzp().debug) pgzp().log(debugMsg);
}

//calculate total score
PageZipper.prototype.getHighestTotalScore = function(allNextLinks) {
	var highestScoringLink = null;
	for (var i=0; i<allNextLinks.length; i++) {
		var score = allNextLinks[i].calculateTotalScore();
		if (highestScoringLink == null || score >= highestScoringLink.finalScore) {
			highestScoringLink = allNextLinks[i];
		}
	}
	
	if (pgzp().debug) {
		var debugMsg = 'Final Score ' + allNextLinks.length;
		allNextLinks.sort(function (a, b) {
							return b.finalScore - a.finalScore;
						});
		for (i=0; i<allNextLinks.length; i++) {
			debugMsg += "\n" + allNextLinks[i].finalScore + ": " + allNextLinks[i].text + ": " + allNextLinks[i].url;
		}
		pgzp().log(debugMsg);
	}
	
	return highestScoringLink;
}

PageZipper.prototype.getAllNextLinks = function(body) {
	var allNextLinks = [];
	var links = body.getElementsByTagName("a"); //get all the links in the page

	var pageUrl = pgzp().getUrlWOutAnchors( pgzp().pages[ pgzp().pages.length-1 ].url );
	for (var i=0; i<links.length; i++) {
		//ignore all links which point to a different domain than the existing domain
		//pgzp().log("currdomain: "  + pgzp().currDomain + " currLink: " + pgzp().getDomain(links[i].href) + " full Link: " + links[i].href + " relative: " + links[i].getAttribute("href"));
		if (
			pgzp().getDomain(links[i].href) == pgzp().currDomain &&  //link points to this domain
			(links[i].href.indexOf("#") < 0 || pageUrl != pgzp().getUrlWOutAnchors(links[i].href)) //avoid links to an anchor in current page, but include normal links curr page
			) {
			pgzp().addLinkComponents(links[i], allNextLinks, pgzp().contains(pgzp().url_list, links[i].href)); //mark links we've already loaded
		}
	}
	return allNextLinks;
}

//returns an array of all NextLink texts that could be derived from this link
PageZipper.prototype.addLinkComponents = function(link, allNextLinks, alreadyLoaded) {
	var NextLink = pgzp().NextLink;
	var search = function(rootNode) {
		for (var i=0; i<rootNode.childNodes.length; i++) {
			var curr = rootNode.childNodes[i];
		
			//check if this node is useful
			if (curr.nodeType == Node.TEXT_NODE && curr.nodeValue && curr.nodeValue.strip().length > 0) {
				allNextLinks.push(new NextLink(curr.nodeValue, link, alreadyLoaded));
			//check for image link
			} else if (curr.nodeType == Node.ELEMENT_NODE && curr.tagName.toLowerCase() == "img") {
				if (curr.alt) allNextLinks.push(new NextLink(curr.alt, link, alreadyLoaded));
				if (curr.title) allNextLinks.push(new NextLink(curr.title, link, alreadyLoaded));
				if (curr.src) allNextLinks.push(new NextLink(curr.src, link, alreadyLoaded, false));
			} else {
				//continue
				search(curr);
			}
		}
	}
	
	if (link.title) allNextLinks.push(new NextLink(link.title, link));
	if (link.alt) allNextLinks.push(new NextLink(link.alt, link));
	search(link);
}

//determine the current page number from a list of page numbers on the page ie. 1 2 3 4 5
//returns [page #, confidence]
PageZipper.prototype.getCurrentPageNumberFromPageBar = function(allNextLinks) {
	var allSequences = [], i = 0, currSeq = [], currNextLink, pageBar;
	var currPageUrl = pgzp().pages[ pgzp().pages.length-1 ].url;

	//first find all consecutive numerical links, put them in arrays
	for (i=0; i<allNextLinks.length; i++) {
		currNextLink = allNextLinks[i];
		if (currNextLink.isHumanReadableText && pgzp().isNumber(currNextLink.text)) {
			var pageNum = parseInt(currNextLink.text, 10)
			if (pageNum >= 0 && pageNum < 1000) {
				currNextLink.pageNum = pageNum;
				currSeq.push(currNextLink);
			}
		} else {
			if (currSeq.length > 0) {
				allSequences.push(currSeq);
				currSeq = [];
			}
		}
	}
	if (currSeq.length > 0) allSequences.push(currSeq);
	
	//now find the biggest sequence numerical links
	for (i=0; i<allSequences.length; i++) {
		if (pageBar == null || allSequences[i].length >= pageBar.length) {
			pageBar = allSequences[i];
		}
	}
	
	if (!pageBar) return [-1, 0];	//no page bar on this page
	
	//sort pageBar lowest to highest
	pageBar.sort(	function(a,b){
						return a.pageNum - b.pageNum;
					});
	pgzp().logList(pageBar, "indexes ordered by size", "#{o.pageNum}\t#{o.text}");
	
	//mark pageBar for later
	for (i=0; i<pageBar.length; i++) pageBar[i].isPageBar = true;
	
	//some page bars include links for the current page- ex. 1 2 3 4 where 1 is a link which is highlighted
	for (i=0; i<pageBar.length; i++) {
		if (pageBar[i].url == currPageUrl) {
			return [pageBar[i].pageNum, 100];
		}
	}
	
	//there are 3 possibilities
	
	//curr page is in the middle - detect by finding missing page
	if (pageBar.length >= 2) {
		var currPageNum, prevPageNum = pageBar[0].pageNum;
		for (i=1; i<pageBar.length; i++) {
			currPageNum = pageBar[i].pageNum;
	
			if ((currPageNum - prevPageNum) == 1) {
				prevPageNum = currPageNum;
				continue;
			}
			
			if ((currPageNum - prevPageNum) == 2) {
				return [currPageNum - 1, 100];
			}
		}
	}
	
	//curr page is first page - detect if first # in sequence is 2
	if (pageBar[0].pageNum == 2) return [1, 30]; //we are on first page
	
	//curr page is last page
	return [pageBar[pageBar.length-1].pageNum, 20];
}

//if multiple links have the same text but point to different urls, they are not next links
//make an array of all text on how many unique urls they point to
PageZipper.prototype.indexDuplicateLinks = function(allNextLinks) {
	var textIndex = {}; //{text, [urls]}
	var currLink;
	for (var i=0; i<allNextLinks.length; i++) {
		currLink = allNextLinks[i];
		if (textIndex[currLink.text]) {
			if (!pgzp().contains(textIndex[currLink.text], currLink.url)) {
				textIndex[currLink.text].push(currLink.url);
			}
		} else {
			textIndex[currLink.text] = [currLink.url];
		}
	}
	return textIndex;
}

/*------------------------- Prototype/Housekeeping ----------------------*/

String.prototype.strip = function() {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
String.prototype.startsWith = function(pattern) {
	return this.indexOf(pattern) === 0;
}
String.prototype.endsWith = function(pattern) {
	var d = this.length - pattern.length;
 	return d >= 0 && this.lastIndexOf(pattern) === d;
}

/*-------------------------------- Utilities ----------------------*/
PageZipper.prototype.log = function(html, override) {
	if (pgzp().debug || override) {
		if (win()["console"]) {
			win().console.log(html);
			return;
		}
		
		var div = doc().createElement("textarea");
		doc().body.appendChild(div);
		div.value = html;
		
	}
}

//handles log strings in form "msg: #{o.src}" where o is the object in the list
PageZipper.prototype.logList = function(list, initialStr, listStr) {
	var interpolate = function (s, o) {
		return s.replace(/\#\{([^}]+)\}/g,	function (match, exp) {
												return eval(exp);
											});
	}
	
	for (var i=0; i<list.length; i++) {
		initialStr += "\n" + interpolate(listStr, list[i]);
	}
	pgzp().log(initialStr);
}

PageZipper.prototype.captureEvent = function(event) {
	if (!event) event = win().event;  //for IE
	return event;//not needed
}

PageZipper.prototype.noBubble = function(event) {
	if (event) {
		event.cancelBubble = true; //IE
		if (event.stopPropagation) 
			event.stopPropagation(); //Everyone else
		event.returnValue = false; //required by stupid browsers which do not respect cancelling bubbling on arrow keys - IE and Safari
	}
	return event;
}

//Find the length of page the user has left to read, in px
PageZipper.prototype.getRemaningBufferSize = function() {
	//alert("jtDocH: " + pgzp.screen.getDocumentHeight() + " jtScroll: " + pgzp.screen.getScrollTop() + " jtViewport: " + pgzp.screen.getViewportHeight());
	var left = pgzp().screen.getDocumentHeight() - pgzp().screen.getScrollTop() - pgzp().screen.getViewportHeight();
	if (left < 0) return 0;
	return Math.floor(left);
}

//http://www.quirksmode.org/js/findpos.html
PageZipper.prototype.findPos = function(obj) {
	var curleft = 0, curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return {"x": curleft,
			"y": curtop};
}

PageZipper.prototype.isNumber = function(str) {
	return str && (typeof(str) == "number" || (typeof(str) == "string" && (str.search(/^\d+$/) >= 0)));
}

PageZipper.prototype.getDomain = function(url) {
	var hna = url.match(/^http\:\/\/([\S]+?)(\/.*)?$/i);
	//absolute url
	if (hna) {
		return hna[1];
	}
	//javascript
	hna = url.match(/^javascript\:.*$/i);
	if (hna) {
		return null;
	}
	//relative link
	return pgzp().currDomain;
}

/* Removes the anchor part of urls */
PageZipper.prototype.getUrlWOutAnchors = function(url) {
	if (url.indexOf("#") >= 0) {
		var results = url.match(/(.*?)#.*/);
		if (results.length > 0) return results[1];
	}
	return url;
}

PageZipper.prototype.convertToArray = function(a) {
	var b = [];
	for (var i=0; i<a.length; i++) b.push(a[i]);
	return b;
}

/* Remove all elements from the given array on which filter returns true */
PageZipper.prototype.filter = function(arr, filter) {
	for (var i=0; i<arr.length; i++) {
		if (filter(arr[i])) {
			arr.splice(i, 1);
			i--;
		}
	}
}

PageZipper.prototype.depthFirstRecursion = function(root, callback) {
	for (var i=0; i<root.childNodes.length; i++) {
		//for now only include visible content
		if (root.childNodes[i].nodeType == 3 ||
			(root.childNodes[i].nodeType == 1 && pgzp().css.getStyle(root.childNodes[i], "display") != "none")) {
			pgzp().depthFirstRecursion(root.childNodes[i], callback);
		}
	}
	callback(root);
}

/* Cross platform addEventListener */
PageZipper.prototype.addEventListener = function(obj, type, callback) {
	//attachEvent is very different from addEventListener, but for or current limited needs, they are close enough
	if (document.addEventListener){
		obj.addEventListener(type, callback, false);
	} else {
		obj.attachEvent('on'+type, callback);
	}
}

PageZipper.prototype.removeEventListener = function(obj, type, callback) {
	if (document.removeEventListener) {
		obj.removeEventListener(type, callback, false);
	} else {
		obj.detachEvent('on'+type, callback);
	}
}

PageZipper.prototype.contains = function(ar, obj) {
	if(Array.indexOf){
		return ar.indexOf(obj) != -1;
	} else {
		//stupid IE!!!
        for(var i=0; i<ar.length; i++){
            if(ar[i]==obj){
                return true;
            }
        }
        return false;
	}
}

PageZipper.prototype.getContentType = function() {
	var metas = doc().getElementsByTagName("head")[0].getElementsByTagName("meta");
	for (var i=0; i<metas.length; i++) {
		if (metas[i].getAttribute("http-equiv") && metas[i].getAttribute("http-equiv").toLowerCase() == "content-type" && metas[i].getAttribute("content"))
			return metas[i].getAttribute("content");
	}
	return null;
}

/* Is word an actual word, or is it part of something else
 * ie. isStandaloneWord('older', 'more older entries') => true
 * isStandaloneWord('older', 'update folder settings') => false
 */
PageZipper.prototype.isStandaloneWord = function(word, text, humanReadable) {
	var delimiter = humanReadable ? "\\s" : "[^a-zA-Z]" ;
	return new RegExp("^(.*" + delimiter + "+)?" + word + "(" + delimiter + "+.*)?$", "i").test(text);
}

/*------------------------- Jx ----------------------*/
//V3.00.A - http://www.openjs.com/scripts/jx/
PageZipper.prototype.jx = {
	http:false, //HTTP Object
	format:'text',
	callback:function(data){},
	error:false,
	//Create a xmlHttpRequest object - this is the constructor. 
	getHTTPObject : function() {
		var http = false;
		//Use IE's ActiveX items to load the file.
		if(typeof ActiveXObject != 'undefined') {
			try {http = new ActiveXObject("Msxml2.XMLHTTP");}
			catch (e) {
				try {http = new ActiveXObject("Microsoft.XMLHTTP");}
				catch (E) {http = false;}
			}
		//If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.
		} else if (XMLHttpRequest) {
			try {http = new XMLHttpRequest();}
			catch (e) {http = false;}
		}
		return http;
	},
	// This function is called from the user's script. 
	//Arguments - 
	//	url	- The url of the serverside script that is to be called. Append all the arguments to 
	//			this url - eg. 'get_data.php?id=5&car=benz'
	//	callback - Function that must be called once the data is ready.
	//	format - The return type for this function. Could be 'xml','json' or 'text'. If it is json, 
	//			the string will be 'eval'ed before returning it. Default:'text'
	load : function (url,callback,format) {
		this.init(); //The XMLHttpRequest object is recreated at every call - to defeat Cache problem in IE
		if(!this.http||!url) return;
		
		//set char encoding. by default ajax responseText is UTF-8, which will cause issues if underlying
		//encoding is something else - http://squio.nl/blog/2006/06/27/xmlhttprequest-and-character-encoding/
		//works for every browser except IE. No know way to fix this bug in IE, so IE users will just have to suffer
		var contentType = pgzp().getContentType();
		if (this.http["overrideMimeType"] && contentType) this.http.overrideMimeType(contentType);

		this.callback=callback;
		if(!format) format = "text";//Default return type is 'text'
		this.format = format.toLowerCase();
		var ths = this;//Closure
		
		//Kill the Cache problem in IE.
//causing problems - removed by jonathan 11/17
//		var now = "uid=" + new Date().getTime();
//		url += (url.indexOf("?")+1) ? "&" : "?";
//		url += now;

		this.http.open("GET", url, true);

		this.http.onreadystatechange = function () {//Call a function when the state changes.
			if(!ths) return;
			var http = ths.http;
			if (http.readyState == 4) {//Ready State will be 4 when the document is loaded.
				if(http.status == 200) {
					var result = "";
					if(http.responseText) result = http.responseText;
					//If the return is in JSON format, eval the result before returning it.
					if(ths.format.charAt(0) == "j") {
						//\n's in JSON string, when evaluated will create errors in IE
						result = result.replace(/[\n\r]/g,"");
						result = eval('('+result+')'); 
					}
	
					//Give the data to the callback function.
					if(ths.callback) ths.callback(result);
				} else { //An error occured
					if(ths.error) ths.error(http.status);
				}
			}
		}
		this.http.send(null);
	},
	init : function() {this.http = this.getHTTPObject();}
}

/*------------------------- Javascript Toolbox by Matt Kruse ----------------------*/
/**
 * Copyright (c)2005-2008 Matt Kruse (http://www.javascripttoolbox.com/lib/util/source.php)
 * 
 * Dual licensed under the MIT and GPL licenses. 
 * This basically means you can use this code however you want for
 * free, but don't claim to have written it yourself!
 * Donations always accepted: http://www.JavascriptToolbox.com/donate/
 * 
 * Please do not link to the .js files on javascripttoolbox.com from
 * your site. Copy the files locally to your server instead.
 * 
 */

	
// Util function to default a bad number to 0
// --------------------------------------------------------------------
PageZipper.prototype.zero = function(n) {
	return (!pgzp().defined(n) || isNaN(n))?0:n;
};

// Determine if a reference is defined
PageZipper.prototype.defined = function(o) {
	return (typeof(o)!="undefined");
};

/* ******************************************************************* */
/*   CSS FUNCTIONS                                                     */
/* ******************************************************************* */
PageZipper.prototype.css = (function(){
	var css = {};

	// Convert an RGB string in the form "rgb (255, 255, 255)" to "#ffffff"
	css.rgb2hex = function(rgbString) {
		if (typeof(rgbString)!="string" || !pgzp().defined(rgbString.match)) { return null; }
		var result = rgbString.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/);
		if (result==null) { return rgbString; }
		var rgb = +result[1] << 16 | +result[2] << 8 | +result[3];
		var hex = "";
		var digits = "0123456789abcdef";
		while(rgb!=0) { 
			hex = digits.charAt(rgb&0xf)+hex; 
			rgb>>>=4; 
		} 
		while(hex.length<6) { hex='0'+hex; }
		return "#" + hex;
	};

	// Convert hyphen style names like border-width to camel case like borderWidth
	css.hyphen2camel = function(property) {
		if (!pgzp().defined(property) || property==null) { return null; }
		if (property.indexOf("-")<0) { return property; }
		var str = "";
		var c = null;
		var l = property.length;
		for (var i=0; i<l; i++) {
			c = property.charAt(i);
			str += (c!="-")?c:property.charAt(++i).toUpperCase();
		}
		return str;
	};
		
	// Get the currently-applied style of an object - expects propery in dash form - ex. border-left-width
	css.getStyle = function(o, property) {
		if (o==null) { return null; }
		var val = null;
		var camelProperty = css.hyphen2camel(property);
		// Handle "float" property as a special case
		if (property=="float") {
			val = css.getStyle(o,"cssFloat");
			if (val==null) { 
				val = css.getStyle(o,"styleFloat"); 
			}
		}
		else if (o.currentStyle && pgzp().defined(o.currentStyle[camelProperty])) {
			val = o.currentStyle[camelProperty];
		}
		else if (win().getComputedStyle) {
			val = win().getComputedStyle(o,null).getPropertyValue(property);
		}
		else if (o.style && pgzp().defined(o.style[camelProperty])) {
			val = o.style[camelProperty];
		}
		// For color values, make the value consistent across browsers
		// Convert rgb() colors back to hex for consistency
		if (/^\s*rgb\s*\(/.test(val)) {
			val = css.rgb2hex(val);
		}
		// Lowercase all #hex values
		if (/^#/.test(val)) {
			val = val.toLowerCase();
		}
		return val;
	};
	
	// Set a style on an object
	css.setStyle = function(o, property, value) {
		if (o==null || !pgzp().defined(o.style) || !pgzp().defined(property) || property==null || !pgzp().defined(value)) { return false; }
		if (property=="float") {
			o.style["cssFloat"] = value;
	  		o.style["styleFloat"] = value;
		} else if (property=="opacity") {
			o.style['-moz-opacity'] = value;
			o.style['-khtml-opacity'] = value;
			o.style.opacity = value;
			if (pgzp().defined(o.style.filter)) {
				o.style.filter = "alpha(opacity=" + value*100 + ")";
			}
		} else {
		  o.style[css.hyphen2camel(property)] = value;
		}
		
		return true;
	};
	
	// Determine if an object or class string contains a given class.
	css.hasClass = function(obj,className) {
		if (!pgzp().defined(obj) || obj==null || !RegExp) { return false; }
		var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
		if (typeof(obj)=="string") {
		  return re.test(obj);
		} else if (typeof(obj)=="object" && obj.className) {
		  return re.test(obj.className);
		}
		return false;
	};
  
	  // Add a class to an object
	css.addClass = function(obj,className) {
		if (typeof(obj)!="object" || obj==null || !pgzp().defined(obj.className)) { return false; }
		if (obj.className==null || obj.className=='') { 
			obj.className = className; 
			return true; 
		}
		if (pgzp().css.hasClass(obj,className)) { return true; }
		obj.className = obj.className + " " + className;
		return true;
	};
  
 	// Remove a class from an object
	css.removeClass = function(obj,className) {
		if (typeof(obj)!="object" || obj==null || !pgzp().defined(obj.className) || obj.className==null) { return false; }
		if (!pgzp().css.hasClass(obj,className)) { return false; }
		var re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		obj.className = obj.className.replace(re,' ');
		return true;
	};
  
	// Fully replace a class with a new one
	css.replaceClass = function(obj,className,newClassName) {
		if (typeof(obj)!="object" || obj==null || !pgzp().defined(obj.className) || obj.className==null) { return false; }
		pgzp().css.removeClass(obj,className);
		pgzp().css.addClass(obj,newClassName);
		return true;
	};
	
	return css;
})();


/* ******************************************************************* */
/*   SCREEN FUNCTIONS                                                  */
/* ******************************************************************* */
PageZipper.prototype.screen = (function() {
	var screen = {};
	
	// Get a reference to the body
	screen.getBody = function() {
		if (doc().body) {
			return doc().body;
		}
		if (doc().getElementsByTagName) {
			var bodies = doc().getElementsByTagName("BODY");
			if (bodies!=null && bodies.length>0) {
				return bodies[0];
			}
		}
		return null;
	};

	// Get the amount that the main document has scrolled from top
	screen.getScrollTop = function() {
		if (doc().documentElement && pgzp().defined(doc().documentElement.scrollTop) && doc().documentElement.scrollTop>0) {
			return doc().documentElement.scrollTop;
		}
		if (doc().body && pgzp().defined(doc().body.scrollTop)) {
			return doc().body.scrollTop;
		}
		return null;
	};
	
	// Get the height of the entire document
	screen.getDocumentHeight = function() {
		var body = pgzp().screen.getBody();
		var innerHeight = (pgzp().defined(self.innerHeight)&&!isNaN(self.innerHeight))?self.innerHeight:0;
		if (doc().documentElement && (!doc().compatMode || doc().compatMode=="CSS1Compat")) {
		    var topMargin = parseInt(pgzp().css.getStyle(body,'margin-top'),10) || 0;
		    var bottomMargin = parseInt(pgzp().css.getStyle(body,'margin-bottom'), 10) || 0;
			return Math.max(body.offsetHeight + topMargin + bottomMargin, doc().documentElement.clientHeight, doc().documentElement.scrollHeight, pgzp().zero(self.innerHeight));
		}
		return Math.max(body.scrollHeight, body.clientHeight, pgzp().zero(self.innerHeight));
	};
	
	// Get the width of the viewport (viewable area) in the browser window
	screen.getViewportWidth = function() {
    	if (doc().documentElement && (!doc().compatMode || doc().compatMode=="CSS1Compat")) {
			return doc().documentElement.clientWidth;
		} else if (doc().compatMode && doc().body) {
      		return doc().body.clientWidth;
		}
		return screen.zero(self.innerWidth);
	};

	// Get the height of the viewport (viewable area) in the browser window
	screen.getViewportHeight = function() {
		if (!win().opera && doc().documentElement && (!doc().compatMode || doc().compatMode=="CSS1Compat")) {
			return doc().documentElement.clientHeight;
		} else if (doc().compatMode && !win().opera && doc().body) {
			return doc().body.clientHeight;
		}
		return pgzp().zero(self.innerHeight);
	};

	return screen;
})();


/*------------------------- FF Extension and Bookmarklet ----------------------*/

/* Get the local copies of all our important variables
 * Required because in FF extension window points to the browser dom window, not the page content window.
 */
window.win = function() {
	return window["_page_zipper_is_bookmarklet"] ? window : window.content;
}
window.doc = function() {
	return win().document;
}
function pgzp() {
	return window["_page_zipper_is_bookmarklet"] ? window.currPgzp : window.content.currPgzp;
}

//add in Node value - ff provides these, but they do not exist for the extension ?!?!
if (!window['Node']) {
    window.Node = {
	    ELEMENT_NODE: 1,
    	TEXT_NODE: 3
	}
}

/*------------------------- FF Extension ----------------------*/

function _pgzpToggleExtension() {

	if (!window.content['currPgzp']) _pgzpInitExtension();

	if (pgzp().is_running) {
		pgzp().stopPageZipper();
		_pgzpSetButtonStatus(false);
	} else {
		pgzp().runPageZipper();
		_pgzpSetButtonStatus(true);
	}
}

function _pgzpInitExtension() {
	window.content.currPgzp = new PageZipper();
	pgzp().is_extension = true;
	pgzp().media_path = "chrome://pagezipper/skin/";
	pgzp().loadPageZipper();
	gBrowser.tabContainer.onselect = _pgzpOnTabChange;
	window.content._pgzpTab = gBrowser.selectedTab;
	pgzp().addEventListener(win(), 'unload', _pgzpUnloadPgzp);
}

function _pgzpOnTabChange() {
	if (window.content._pgzpTab && window.content._pgzpTab.selected) {
		_pgzpSetButtonStatus(pgzp().is_running);
	} else {
		_pgzpSetButtonStatus(false);
	}
}

function _pgzpUnloadPgzp() {_pgzpSetButtonStatus(false);}

function _pgzpSetButtonStatus(active) {
	var pgzpButton = document.getElementById("pagezipper-button")
	pgzpButton.style.listStyleImage = "url('chrome://pagezipper/skin/zipper_24" + (active ? '_green' : '') + ".png')";
}

/*------------------------- Bookmarklet ----------------------*/

function _pgzpInitBookmarklet() {
	window.currPgzp = new PageZipper();
	pgzp().is_bookmarklet = true;
	pgzp().media_path = "http://localhost/web/is/ffextension/src/skin/";
	pgzp().loadPageZipper();
}

function _pgzpToggleBookmarklet() {
	if (!pgzp().is_running) pgzp().runPageZipper();
}

if (window["_page_zipper_is_bookmarklet"]) {
	_pgzpInitBookmarklet();
	_pgzpToggleBookmarklet();
})();