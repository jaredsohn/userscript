// ==UserScript==
// @name           Greasemungo Star Mean
// @namespace      kenmooda@gmail.com
// @description    Popmundo: Shows number of skills and arithmetic mean of the skills stars (2009-09-22)
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp?action=MySkills*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//    
//    Copyright (c) 2008 Tommi Rautava
//    
//    Permission is hereby granted, free of charge, to any person
//    obtaining a copy of this software and associated documentation
//    files (the "Software"), to deal in the Software without
//    restriction, including without limitation the rights to use,
//    copy, modify, merge, publish, distribute, sublicense, and/or sell
//    copies of the Software, and to permit persons to whom the
//    Software is furnished to do so, subject to the following
//    conditions:
//    
//    The above copyright notice and this permission notice shall be
//    included in all copies or substantial portions of the Software.
//    
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
//    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//    OTHER DEALINGS IN THE SOFTWARE.
//    
////////////////////////////////////////////////////////////////////////////////

const SKILLS_COUNT_TITLE_TEXT = 'Skills count';
const STARS_MEAN_TITLE_TEXT = 'Stars mean';

////////////////////////////////////////////////////////////////////////////////

const STAR_IMG_URL = 'graphics/Default/Miscellaneous/star1.gif';
const WHITE_BAR_IMG_URL = 'graphics/Default/progressbar/stapel_vit.gif';
const GREEN_BAR_IMG_URL = 'graphics/Default/progressbar/stapel_gron.gif';
const LTBLUE_BAR_IMG_URL = 'graphics/Default/progressbar/stapel_ljusbla.gif';

////////////////////////////////////////////////////////////////////////////////

const PROGRESS_IMG_XPATH = '/html/body/table[3]/tbody/tr/td[1]/div[2]/form/div/table/tbody/tr/td[2]/img[last()-1]';
const RESULT_XPATH = '/html/body/table[3]/tbody/tr/td/div[2]/form/table[3]';
const EXTRACT_PATTERN = /(\d+).*?(\d+)\%/; // #6 star 0% complete.

////////////////////////////////////////////////////////////////////////////////

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


function countMean(imgNodes) {
	var count = 0;
	var sum = 0;
	
	for (var i = imgNodes.snapshotLength - 1; i >= 0; i--) {
		var imgNode = imgNodes.snapshotItem(i);		
		var res = imgNode.title.match(EXTRACT_PATTERN);
		
		if (res) {
			count++;
			var stars = (res[1] - 1) + (res[2] / 100);
			sum = sum + stars;
			//GM_log(i +"="+ stars);
		}
	}
	
	//GM_log('skills='+ count +', stars='+ sum);
	
	return {
		count: count,
		sum: sum,
		mean: (sum / count)
	};
}


function createStar() {
	// <img width="8" hspace="1" height="8" alt="*" src="graphics/Default/Miscellaneous/star1.gif"/>
	var img1 = document.createElement('img');
	img1.width = 8;
	img1.height = 8;
	img1.hspace = 1;
	img1.alt = '*';
	img1.src = STAR_IMG_URL;
	
	return img1;
}

function createProgressBarImage(imgUrl) {
	var img1 = document.createElement('img');
	img1.width = 1;
	img1.height = 10;
	img1.border = 0;
	img1.src = imgUrl;
	
	return img1;
}

function createProgressBar(barValue, titleText, targetNode) {
	//<img width="1" height="10" border="0" src="graphics/Default/progressbar/stapel_vit.gif"/>
	//<img width="2" height="10" border="0" title="#2 star 5% complete." alt="#2 star 5% complete." src="graphics/Default/progressbar/stapel_gron.gif"/>

	var overlayText = document.createElement('span');
	overlayText.appendChild(document.createTextNode(barValue + '%'));
	overlayText.setAttribute('style', 'position: absolute; text-align: right; color: #000000; width: 2px; line-height: 9px; font-size: 10px; font-weight: normal; z-index: 2;');
	targetNode.appendChild(overlayText);

	var img1 = createProgressBarImage(WHITE_BAR_IMG_URL);
	targetNode.appendChild(img1);

	var width2 = parseInt((barValue / 100) * 40);
	if (width2 > 0) {
		var img2 = createProgressBarImage(GREEN_BAR_IMG_URL);
		img2.width = width2;
		img2.title = titleText;
		targetNode.appendChild(img2);
	}

	var width3 = 40 - width2;
	if (width3 > 0) {
		var img3 = createProgressBarImage(LTBLUE_BAR_IMG_URL);
		img3.width = width3;
		img3.title = titleText;
		targetNode.appendChild(img3);
	}

	var img4 = createProgressBarImage(WHITE_BAR_IMG_URL);
	targetNode.appendChild(img4);
}


function createRow(titleText) {
	var keyNode = document.createElement('b');
	keyNode.appendChild(document.createTextNode(titleText));
	
	var td1 = document.createElement('td');
	td1.appendChild(keyNode);

	var td2 = document.createElement('td');
	td2.align = 'right';
		
	var tr1 = document.createElement('tr');
	tr1.appendChild(td1);
	tr1.appendChild(td2);
	
	return tr1;
}


function createCountRow(count) {
	var tr1 = createRow(SKILLS_COUNT_TITLE_TEXT);
	var td2 = tr1.cells.item(1);
	
	var b = document.createElement('b');
	b.appendChild(document.createTextNode(count));

	td2.appendChild(b);
	td2.appendChild(document.createTextNode('\u00a0'));
	
	return tr1;
}
	

function createMeanRow(stars, progress, titleText) {
	var tr1 = createRow(STARS_MEAN_TITLE_TEXT);
	var td2 = tr1.cells.item(1);
	
	for (var i = stars; i > 0; i--) {
		var starNode = createStar();
		td2.appendChild(starNode);
	}
	
	td2.appendChild(document.createTextNode('\u00a0\n\t\t'));
	createProgressBar(progress, titleText, td2);
	td2.appendChild(document.createTextNode('\u00a0'));
	
	return tr1;
}
	

function showResult(count, stars, progress, titleText) {
	var targetNode = xpathNode(RESULT_XPATH);
	
	if (targetNode) {
		var tr1 = createCountRow(count);
		var tr2 = createMeanRow(stars, progress, titleText);

		tr1.className = 'DarkColumnHL';

		var tbody1 = targetNode.tBodies.item(0);
		tbody1.appendChild(tr1);
		tbody1.appendChild(tr2);
	}
}


function createTitleText(titleTemplate, stars, progress) {
	var titleText = titleTemplate;
	titleText = titleText.replace(/(\#\d+)/, '#'+ (stars+1));
	titleText = titleText.replace(/(\d+\.)/, (stars+1) + '.');
	titleText = titleText.replace(/(\d+\%)/, progress + '%');
	
	return titleText;
}


var imgNodes = xpathNodes(PROGRESS_IMG_XPATH);

if (imgNodes && imgNodes.snapshotLength > 0) {
	var res = countMean(imgNodes);

	var stars = parseInt(res.mean);
	var progress = parseInt((res.mean - stars) * 100);	
	var titleText = createTitleText(imgNodes.snapshotItem(0).title, stars, progress);
	
	showResult(res.count, stars, progress, titleText);
}

// EOF