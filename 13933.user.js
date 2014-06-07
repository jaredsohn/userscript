// ==UserScript==
// @name           Tag Details for StumbleUpon
// @namespace      thlayli.detrave.net
// @include        http://*.stumbleupon.com/tags/
// @description    This script replaces StumbleUpon tag clouds with ordered lists.
// @license        This software is licensed under the CC-GNU GPL <http://creativecommons.org/licenses/GPL/2.0/>
// @license        Portions from STT licensed under the Modified BSD license <http://www.jonasjohn.de/lab/swe/stt_license.txt>
// @contributor    hxseven, author of StumbleUpon Tag Toplist <http://userscripts.org/scripts/show/3456>
// @version        2.5.2
// ==/UserScript==

// auto-update variables
var script_title = 'Tag Details for StumbleUpon';
var source_location = 'http://thlayli.detrave.net/su-tagdetails.user.js';
var version_holder = 'http://thlayli.detrave.net/su-tagdetails.version.txt';
var current_version = '2.5.2';
var latest_version = '';
var manual_check = true;
var lastupdatecheck = GM_getValue('Updated', 'never');

CheckForUpdate();
if(!window.opera)
	GM_registerMenuCommand('Update - '+script_title, CheckVersion);

// initialize global variables
var singleUse = 0;
var totalTagCount = 0;
var longestTags = [];
var shortestTags = [];
var singleWordTags = 0;
var doubleWordTags = 0;
var multiWordTags = 0;
var smallCloudTags = new Array();
var cd = document.createElement('div');
var md = document.createElement('div');
var tagUrlBase = document.location.href.replace("tags","tag");

// get user name
var thisStumbler = xpath(document, "//td/h1/span/a[contains(@title,'Subscribe')]/parent::*/following-sibling::a").snapshotItem(0);
if(thisStumbler){
	thisStumbler = thisStumbler.textContent;
}else{
	var publicLink = xpath(document, "//a[contains(@href, '.stumbleupon.com/public/')]").snapshotItem(0);
	var thisStumbler = publicLink.textContent;
}

// save tag cloud
var tagCloud = xpath(document, "//div[contains(@class, 'tagcloud')]").snapshotItem(0);
var originalTagCloud = tagCloud.innerHTML;

// read tags
var tagString = originalTagCloud.replace(/<li><a href="[^"]+" style="font-size: (\d*)%;" title="(\d*) [^>]+>([^<]+)<\/a><\/li>/gi,'$3,$2,$1;');
var freqTags = tagString.replace(/\n|\t|\s|<\/?ul[^>]+>/gi,'').split(';');
var alphaTags = new Array(freqTags.length);

// create sections
var alphaTagList = "";
var freqTagList = "";
var smallCloud = "";
var originalSidebarCloud = "";

//warn before loading extremely large lists
if(freqTags.length > 5000){
	if(confirm("This page contains " + addCommas(freqTags.length) + " tags. Your browser may be unresponsive while tags details are loaded.\n\nWould you like to continue running the script?"))
		startScript();
}else{
	startScript();
}

// initialize details variables
if(longestTags.length > 0){
	var longText = [(longestTags.length > 1) ? 's' : '',(longestTags[0].length > 1) ? ' characters' : ' character'];
	var shortText = [(shortestTags.length > 1) ? 's' : '',(shortestTags[0].length > 1) ? ' characters' : ' character'];
	var uniqueText = (GM_getValue('excludeUnique',false)==false) ? 'included in' : 'excluded from';
	var uniqueSwitch = (GM_getValue('excludeUnique',false)==true) ? 'include' : 'exclude';
	var diffTags = (GM_getValue('excludeUnique',false)==true) ? freqTags.length-singleUse : freqTags.length;
	var tagRatio = addCommas(Math.ceil(totalTagCount.replace(',','') / diffTags));
	sidebarDetails();
}

// functions

function startScript(){

	// create command bar
	var cmdCloudLabel = (GM_getValue('showCloud',false)==true) ? 'Show list' : 'Show cloud';
	var cmdSmallCloudLabel = (GM_getValue('smallCloud',false)==true) ? 'Show full cloud' : 'Show small cloud';
	var cmdSortLabel = (GM_getValue('byFrequency',false)==true) ? 'Sort by name' : 'Sort by frequency';
	var cmdHideLabel = (GM_getValue('excludeUnique',false)==true) ? 'Include unique tags' : 'Exclude unique tags';
	var cmdBar = document.createElement('div');
	cmdBar.className = 'form sectionCmds';
	cmdBar.style.margin = '-5px 0 10px';
	var cmdBarHtml = '<ul class="cmds"><li class="textlink"><a href="javascript:void(0);" class="textlink" id="showcloud">' + cmdCloudLabel + '</a></li><li class="textlink" style="display: none;"><a href="javascript:void(0);" class="textlink" id="smallcloud">' + cmdSmallCloudLabel + '</a></li><li class="textlink"><a href="javascript:void(0);" class="textlink" id="tagsort">' + cmdSortLabel + '</a></li><li class="textlink"><a href="javascript:void(0);" class="textlink" id="taghide">' + cmdHideLabel + '</a></li>';
	if(!window.opera)
		cmdBarHtml += '<li class="textlink"><a href="javascript:void(0);" id="tagdetails" class="textlink">More details</a></li>';
	cmdBarHtml += '<li class="textlink"><span class="textUncolor">Details in sidebar <input type="checkbox" id="tagsidebardetails"></span></li></ul><div class="clear"><!-- --></div>';
	cmdBar.innerHTML = cmdBarHtml;
	tagCloud.parentNode.insertBefore(cmdBar,tagCloud);
	document.getElementById('showcloud').addEventListener('click', showCloud, false);
	document.getElementById('smallcloud').addEventListener('click', showSmallCloud, false);
	document.getElementById('tagsort').addEventListener('click', tagSort, false);
	document.getElementById('taghide').addEventListener('click', tagHide, false);
	if(GM_getValue('sidebarCloud', true) == true)
		document.getElementById('tagsidebardetails').checked = "checked";

	// run main functions
	getTagInfo();
	createAlphaTagList();
	createFreqTagList();
	createSmallCloud();

	// write initial list or show cloud
	if(GM_getValue('showCloud',false)==false){
		if(GM_getValue('byFrequency',false)==false)
			writeAlphaTagList();
		else
			writeFreqTagList();
	}else{
		document.getElementById('smallcloud').parentNode.style.display = "inline";
		document.getElementById('tagsort').parentNode.style.display = "none";
		document.getElementById('taghide').parentNode.style.display = "none";
		if(GM_getValue('smallCloud',false)==false){
			document.getElementById('smallcloud').innerHTML = 'Show small cloud';
			writeCloud();
		}else{
			document.getElementById('smallcloud').innerHTML = 'Show full cloud';
			writeSmallCloud();
		}
	}
}

// parse tag arrays
function getTagInfo(){
	var curChar = '';
	var shift = 0;
	for(i=0;i<freqTags.length;i++){
		tag = freqTags[i].split(',');
		freqTags[i] = new Array(3);
		freqTags[i][0] = tag[0];
		freqTags[i][1] = tag[1];
		freqTags[i][2] = tag[2];
		alphaTags[i+shift] = new Array(2);
		alphaTags[i+shift][0] = tag[0];
		alphaTags[i+shift][1] = tag[1];

		// insert index values as pairs
		if(alphaTags[i+shift][0].match(/^[0-9]/)){
			if(curChar!='#'){
				curChar = '#';
				alphaTags.splice((i+shift), 0, [curChar,0], [curChar,0]);
				shift=shift+2;
			}
		}else{
			if(curChar!=alphaTags[i+shift][0].substr(0,1)){
				curChar = alphaTags[i+shift][0].substr(0,1);
				alphaTags.splice((i+shift), 0, [curChar,0], [curChar,0]);
				shift=shift+2;
			}
		}
	}

	// cleanup
	freqTags.pop();
	alphaTags.pop();

	// sort first to get frequency then to alpha if needed
	freqTags.sort(sortByCount);
	calcFreq(freqTags);
	alphaTags.sort(sortByCount);
	calcFreq(alphaTags);
	alphaTags.sort(sortByAlpha);
}

// store frequency
function calcFreq(tags){
	var curRank = '';
	n = 0;
	for(i=0;i<tags.length;i++){
		if(tags[i][1] && curRank!=tags[i][1]){
			curRank = tags[i][1];
			n++;
		}
		tags[i][3] = n;
	}
}

// calculate stats
function calcStats(tags){

	// reset variables
	singleUse = 0;
	totalTagCount = 0;
	longestTags = [];
	shortestTags = [];
	singleWordTags = 0;
	doubleWordTags = 0;
	multiWordTags = 0;

	// check for unique tag exclusion
	for(i=0;i<tags.length;i++){
		var treatAsUnique = false;
		if(tags[i][1] == 1){
			if(GM_getValue('excludeUnique',false) == true){
				treatAsUnique = true;
				singleUse++;
			}else{
				singleUse++;
			}
		}
		if(treatAsUnique == false){

			// avoid indexes
			if(tags[i][1]){

				// find long tags
				if(longestTags[0]){
					if(tags[i][0].length > longestTags[0].length){
						longestTags = [];
						longestTags.push(tags[i][0]);
					}else{
						if(longestTags[0].length == tags[i][0].length)
							longestTags.push(tags[i][0]);
					}
				}else{
					longestTags.push(tags[i][0]);
				}

				// find short tags
				if(shortestTags[0]){
					if(tags[i][0].length < shortestTags[0].length && tags[i][0].length > 0){
						shortestTags = [];
						shortestTags.push(tags[i][0]);
					}else{
						if(shortestTags[0].length == tags[i][0].length)
							shortestTags.push(tags[i][0]);
					}
				}else{
					shortestTags.push(tags[i][0]);
				}

				// split tag words
				switch(tags[i][0].split('-').length){
					case 1:
						singleWordTags++
						break
					case 2:
						doubleWordTags++
						break
					default:
						multiWordTags++
						break
				}

				// keep a running total
				totalTagCount += parseFloat(tags[i][1]);
			}
		}
	}

	// sort lists
	longestTags.sort();
	shortestTags.sort();

	// adjust 'different tags' value for unique tag exclusion
	var diffTags = (GM_getValue('excludeUnique',false)==true) ? freqTags.length-singleUse : freqTags.length;

	// format numbers 0,000,000
	totalTagCount = addCommas(totalTagCount);
	singleWordTags = addCommas(singleWordTags);
	doubleWordTags = addCommas(doubleWordTags);
	multiWordTags = addCommas(multiWordTags);
	diffTags = addCommas(diffTags);

	// add stats area
	if(!window.opera)
		document.getElementById('tagdetails').addEventListener('click', showModal, false);
	document.getElementById('tagsidebardetails').addEventListener('change', sidebarDetails, false);

}

function writeCloud(){
	tagCloud.innerHTML =  originalTagCloud;
}

function writeSmallCloud(){
	tagCloud.innerHTML = '<ul class="">' + smallCloud + '</ul>';
}

function createSmallCloud(){

	var totalCloudSizes = 0;
	var totalCloudCount = 0;
	var tagTable = document.createElement('table');

	// find average size and adjustment ratio
	for(i=0;i<150;i++){
		if(freqTags[i][1] > 1){
			totalCloudSizes = totalCloudSizes + Number(freqTags[i][2]);
			totalCloudCount++;
		}else{
			break;
		}
	}
	var adjustRatio = 150 / (totalCloudSizes / totalCloudCount);

	// create 150 small tag cloud elements
	for(i=0;i<totalCloudCount;i++)
		smallCloudTags.push(freqTags[i]);

	// sort by alpha
	smallCloudTags.sort(sortForClouds);

	// print tag cloud
	for(i=0;i<smallCloudTags.length;i++){
		var tagObj = document.createElement('li');
		tagObj.innerHTML = '<a href="/tag/' + smallCloudTags[i][0] + '/" style="font-size: ' + Math.round(Number(smallCloudTags[i][2]) * adjustRatio) + '%;" title="' + smallCloudTags[i][1] + ' sites tagged ' + smallCloudTags[i][0] + '">' + smallCloudTags[i][0] + "</a>\n";
		tagTable.appendChild(tagObj);
	}
	smallCloud = tagTable.innerHTML;
}

function writeFreqTagList(){
	calcStats(freqTags);
	tagCloud.innerHTML = '<ul><table id="tagtable" style="width: 100% !important;">' + freqTagsList + '</table></ul>';
}

function createFreqTagList(){

	calcStats(freqTags);

	// get column length
	tagsLength = (GM_getValue('excludeUnique',false)==true) ? freqTags.length-singleUse : freqTags.length;
	var colMax = Math.ceil(tagsLength / 4);

	// create table
	var tagTable = document.createElement('table');
	var tagRow = document.createElement('tr');
	tagTable.appendChild(tagRow);

	for(i=0,n=0;i<freqTags.length;i++){

		// check for unique tag exclusion
		var treatAsUnique = false;
		if(GM_getValue('excludeUnique',false)==true)
			if(freqTags[i][1] <= 1)
				treatAsUnique = true;
		if(treatAsUnique == false){

			// add a column
			if((n % colMax) < 1){
				var tagCol = document.createElement('td');
				tagCol.style.width = '25%';
				tagRow.appendChild(tagCol);
			}

			n++;

			// create normal tag elements
			var tagObj = document.createElement('li');
			tagObj.style.whiteSpace = 'nowrap';
			tagObj.innerHTML = '<span style="display: block !important;"><a '+ 'title="Ranked #' + freqTags[i][3] + ' by frequency" href="' + tagUrlBase + freqTags[i][0] + '/" style="padding: 0px;">' + freqTags[i][0] + '</a><span class="textUncolor textSm"> (' + freqTags[i][1] + ')</span></span>';
			tagCol.appendChild(tagObj);
		}
	}
	freqTagsList = tagTable.innerHTML;
}

function writeAlphaTagList(){
	calcStats(alphaTags);
	tagCloud.innerHTML = '<ul><table id="tagtable" style="width: 100% !important;">' + alphaTagList + '</table></ul>';
}

function createAlphaTagList(){

	calcStats(alphaTags);

	// get column length
	tagsLength = (GM_getValue('excludeUnique',false)==true) ? alphaTags.length-singleUse : alphaTags.length;
	var colMax = Math.ceil(tagsLength / 4);

	// create table
	var tagTable = document.createElement('table');
	var tagRow = document.createElement('tr');
	tagTable.appendChild(tagRow);

	// create list elements and add columns if needed
	var n = 0;
	var forceFinish = false;
	var skipNextCol = false;
	for(i=0;i<alphaTags.length;i++){

		// check for unique tag exclusion
		var treatAsUnique = false;
		if(GM_getValue('excludeUnique',false)==true)
			if(alphaTags[i][1] == 1)
				treatAsUnique = true;
		if(treatAsUnique == false){

			// add a column
			if((n % colMax) < 1){

				// alert(alphaTags[i][0]); //debug

				// look ahead 15 items for an index
				if(forceFinish == false){
					for(x=1;x<16;x++){
						if(i+x < alphaTags.length-1){
							if(alphaTags[(i+x)][1]==0 && alphaTags[(i+x+1)][1]==0){

								// alert('finishing '+alphaTags[i][0]); //debug

								// force the index section to finish
								forceFinish = true;
								break;
							}
						}
					}
				}

				// look back 5 items for an index
				if(skipNextCol == false && forceFinish == false){
					for(x=1;x<6;x++){
						if(i-x > 1){
							if(alphaTags[(i-x)][1]==0 && alphaTags[(i-x-1)][1]==0){

								// alert('skipping '+alphaTags[i][0]); //debug

								// bump the index section to the next column
								skipNextCol = true;
								lastIndexPos = x+1;
								break;
							}
						}
					}
				}

				// normal column addition
				if(forceFinish == false && skipNextCol == false){
					var tagCol = document.createElement('td');
					tagCol.style.width = '25%';
					tagRow.appendChild(tagCol);	
				}
			}

			n++;

			// forcing an index section to finish
			if(forceFinish == true){
				if(alphaTags[i][1]==0 && alphaTags[i+1][1]==0){
					forceFinish = false;
					var tagCol = document.createElement('td');
					tagCol.style.width = '25%';
					tagRow.appendChild(tagCol);	

				}
			}

			// bumping an index section to the next column
			if(skipNextCol == true){
				skipNextCol = false;
				var thisNode = tagRow.lastChild.lastChild.nodeName;
				var lastNode = '';
				var skipSize = 0;
				var removeItems = new Array(lastIndexPos);
				var clonedItems = new Array(lastIndexPos);
				for(x=0;x<lastIndexPos;x++){
					thisNode = tagRow.lastChild.lastChild.nodeName;

					// remove items from last column
					clonedItems[x] = tagRow.lastChild.lastChild.cloneNode(true);
					tagRow.lastChild.removeChild(tagRow.lastChild.lastChild);
					skipSize++;

					// step once past the horizontal rule
					if(lastNode == 'HR')
						break;

					lastNode = thisNode;
				}

				// put items in a new column
				var tagCol = document.createElement('td');
				tagCol.style.width = '25%';
				tagRow.appendChild(tagCol);
				for(x=skipSize;x>0;x--){
					tagCol.appendChild(clonedItems[x-1]);
					tagCol.lastChild.style.display = 'block';
				}
			}

			// find index values
			if(i<alphaTags.length-1 && alphaTags[i][1]==0 && alphaTags[i+1][1]==0){

				// create index elements but wait one loop to display them
				var charLabel = document.createElement('li');
				var charHr = document.createElement('hr');
				charLabel.innerHTML = '<h4 style="font-weight: bold; margin-top: 0.75em;">' + alphaTags[i][0].toUpperCase() + '</h4>';
				charLabel.setAttribute('style','margin-right: 10px; display: none;');
				charHr.setAttribute('style','margin-right: 10px; display: none;');
				tagCol.appendChild(charLabel);
				tagCol.appendChild(charHr);
				i++;

			}else{

				// the last index was not empty so display it
				if(charLabel)
					charLabel.style.display = 'block';
				if(charHr)
					charHr.style.display = 'block';

				// create normal tag elements
				if(alphaTags[i][1] != 0){
					var tagObj = document.createElement('li');
					tagObj.style.whiteSpace = 'nowrap';
					tagObj.innerHTML = '<span style="display: block !important;"><a '+ 'title="Ranked #' + alphaTags[i][2] + ' by frequency" href="' + tagUrlBase + alphaTags[i][0] + '/" style="padding: 0px;">' + alphaTags[i][0] + '</a><span class="textUncolor textSm"> (' + alphaTags[i][1] + ')</span></span>';
					tagCol.appendChild(tagObj);
				}
			}
		}
	}
	alphaTagList = tagTable.innerHTML;
}

// click action for the 'Show cloud/list' link
function showCloud(){
	var label = document.getElementById('showcloud');
	if(GM_getValue('showCloud',false)==true){
		GM_setValue('showCloud',false);
		label.innerHTML = 'Show cloud';
		document.getElementById('smallcloud').parentNode.style.display = "none";
		document.getElementById('tagsort').parentNode.style.display = "inline";
		document.getElementById('taghide').parentNode.style.display = "inline";
		if(GM_getValue('byFrequency',false)==true)
			writeFreqTagList();
		else
			writeAlphaTagList();
	}else{
		GM_setValue('showCloud',true);
		label.innerHTML = 'Show list';
		document.getElementById('smallcloud').parentNode.style.display = "inline";
		document.getElementById('tagsort').parentNode.style.display = "none";
		document.getElementById('taghide').parentNode.style.display = "none";
		if(GM_getValue('smallCloud',false)==true){
			writeSmallCloud();
		}else{
			writeCloud();
		}
	}
}

// click action for the 'Small/Show full cloud' link
function showSmallCloud(){
	var label = document.getElementById('smallcloud');
	if(GM_getValue('smallCloud',false)==true){
		GM_setValue('smallCloud',false);
		label.innerHTML = 'Show small cloud';
		writeCloud();
	}else{
		GM_setValue('smallCloud',true);
		label.innerHTML = 'Show full cloud';
		writeSmallCloud();
	}
}

// click action for the 'Include/Exclude unique tags' link
function tagHide(){
	var label = document.getElementById('taghide');
	if(GM_getValue('excludeUnique',false)==true){
		GM_setValue('excludeUnique',false);
		label.innerHTML = 'Exclude unique tags';
	}else{
		GM_setValue('excludeUnique',true);
		label.innerHTML = 'Include unique tags';
	}
	createFreqTagList();
	createAlphaTagList();
	if(GM_getValue('byFrequency',false)==true)
		writeFreqTagList();
	else
		writeAlphaTagList();
}

// click action for the 'Sort by frequency/alpha' link
function tagSort(){
	var label = document.getElementById('tagsort');
	if(GM_getValue('byFrequency',false)==true){
		GM_setValue('byFrequency',false);
		label.innerHTML = 'Sort by frequency';
		writeAlphaTagList();
	}else{
		GM_setValue('byFrequency',true);
		label.innerHTML = 'Sort by name';
		writeFreqTagList();
	}
}

// array sort functions
function sortByCount(a,b){
	return ((b[1]-a[1]<0) ? -1 : ((b[1]-a[1]>0) ? 1 : ((a[0]<b[0]) ? -1 : ((a[0]>b[0]) ? 1 : 0))));
}
function sortByAlpha(a,b){
	return ((a[0]<b[0]) ? -1 : ((a[0]>b[0]) ? 1 : 0));
}
function sortForClouds(a,b){
	if(isNaN(a[0]) && isNaN(b[0]))
		return ((a[0]<b[0]) ? -1 : ((a[0]>b[0]) ? 1 : 0));
	if(isNaN(a[0]) && !isNaN(b[0]))
		return 0;
	if(isNaN(b[0]) && !isNaN(a[0]))
		return 1;
	if(!isNaN(a[0]) && !isNaN(b[0]))
		return a[0] - b[0];
}

// public domain function from mredkj.com
function addCommas(str){
	str += '';
	x = str.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

// sidebar details
function sidebarDetails(){

	// store original sidebar cloud
	var sidebar = xpath(document, "//td[@class='sidebar']").snapshotItem(0);
	var sidebarClouds = xpath(sidebar, ".//div[contains(@class, 'tagcloud')]");
	for(i=0;i<sidebarClouds.snapshotLength;i++){
		if(!sidebarClouds.snapshotItem(i).parentNode.innerHTML.match(/How Similar Are You\?/))
			sidebarCloud = sidebarClouds.snapshotItem(i);
	}
	if(!originalSidebarCloud)
		originalSidebarCloud = sidebarCloud.innerHTML;

	if(document.getElementById("tagsidebardetails").checked){
		GM_setValue('sidebarCloud', true);

		// remove link to "View more tags" 
		var moreTagsLink = xpath(sidebar, ".//ul[contains(., 'View more tags')]").snapshotItem(0);
		if(moreTagsLink)
			moreTagsLink.style.display = "none";

		// create html
		var statsHtml = '<table><tbody><tr><td class="label" width="85">' +
		'Total</td><td><ul class="textUncolor"><li>' + totalTagCount + ' tags</li>\n' +
		'<tr><td class="label">Different</td><td><ul class="textUncolor"><li>' + diffTags + ' tags</li></tr>\n' +
		'<tr><td class="label">Unique</td><td><ul style="margin-right: -5px" class="textUncolor"><li>' + singleUse + ' tags (' + Math.ceil(singleUse/diffTags*100) + '%)</li></tr>\n' +
		'<tr><td class="label">Average</td><td><ul class="textUncolor"><li>' + tagRatio + ' uses</li></tr>\n' +
		'<tr><td class="label">One-word</td><td><ul class="textUncolor"><li>' + singleWordTags + ' tags</li></tr>\n' +
		'<tr><td class="label">Two-word</td><td><ul class="textUncolor"><li>' + doubleWordTags + ' tags</li></tr>\n' +
		'<tr><td class="label">Multi-word</td><td><ul class="textUncolor"><li>' + multiWordTags + ' tags</li></tr>\n' +
		'</tbody></table>\n';

		// longest tags links
		statsHtml += '<table><tbody><tr><td class="label" colspan="2"><br>Longest tag' + longText[0] + ' <span class="textUncolor">(' + longestTags[0].length + longText[1] + ')</span></td></tr>\n' +
		'<tr><td width="20">&nbsp;</td>' + '<td><br><ul class="textUncolor" style="text-align: right;">';
		for(i=0;i<longestTags.length;i++)
			statsHtml += '<li><a href="' + tagUrlBase + longestTags[i] + '/">' + longestTags[i] + '</a></li><br>\n';
		statsHtml += '</li></ul></td></tr>\n';

		// shortest tags links
		statsHtml += '<tr><td class="label" colspan="2"><br>Shortest tag' + shortText[0] + ' <span class="textUncolor">(' + shortestTags[0].length + shortText[1] + ')</span></td></tr>\n';

		statsHtml += '<tr><td>&nbsp;</td><td><br><ul class="textUncolor" style="text-align: right;">';
		for(i=0;i<shortestTags.length;i++){
			var splitter = (i < shortestTags.length-1) ? ', ' : '';
			statsHtml += '<a href="' + tagUrlBase + shortestTags[i] + '/">' + shortestTags[i] + '</a>' + splitter;
		}
		statsHtml += '</ul></td></tr></tbody></table>'; 

		sidebarCloud.innerHTML = '<h3>Tag details</h3>' + statsHtml + '';

	}else{
		GM_setValue('sidebarCloud', false);
		sidebarCloud.innerHTML = originalSidebarCloud;
	}
}

// click action for the 'More statistics' button
function showModal(){

	// create cover div
	cd.setAttribute("style","position: absolute; top: 0px; left: 0px; ");
	cd.style.MozOpacity = '0.75';
	cd.style.background = document.bgColor;
	cd.style.backgroundImage = getComputedStyle(document.body, "").getPropertyValue('background-image');
	cd.style.width = window.screen.availWidth - 20 + 'px';
	cd.style.height = window.innerHeight + window.scrollMaxY + 'px';

	// create modal div
	md.setAttribute("style","padding: 5px; border: 2px solid #4d4d4d; position: fixed; width: 600px;");
	md.style.background = document.bgColor;
	md.style.backgroundImage = getComputedStyle(document.body, "").getPropertyValue('background-image');
	md.style.top = (window.innerHeight/2) - 150 + 'px';
	md.style.left = (window.innerWidth/2) - (md.style.width.replace("px","") / 2) + 'px';
	
	// create html
	var statsHtml = '<p style="font-size: 12px;"><b>Total tags:</b> ' + totalTagCount +
	'<br><b>Different tags:</b> ' + diffTags +
	'<br><br><b>Unique tags:</b> ' + singleUse + ' (' + Math.ceil(singleUse/diffTags*100) + '%)' +
	'<br><b>Average tag usage:</b> ' + tagRatio + " times" +
	'<br><br><b>Single-word tags:</b> ' + singleWordTags +
	'<br><b>Double-word tags:</b> ' + doubleWordTags +
	'<br><b>Multi-word tags:</b> ' + multiWordTags + '</td>';

	// longest tags links
	statsHtml += '<td><p style="font-size: 12px;"><b>Longest tag' + longText[0] + '</b> (' + longestTags[0].length + longText[1] + ')\n<ul style="list-style: none;">';
	for(i=0;i<longestTags.length;i++)
		statsHtml += '<li><a href="' + tagUrlBase + longestTags[i] + '/">' + longestTags[i] + '</a></li>\n';
	statsHtml += '</ul></p>';

	// shortest tags links
	statsHtml += '<br><p style="font-size: 12px;"><b>Shortest tag' + shortText[0] + '</b> (' + shortestTags[0].length + shortText[1] + ')\n<ul style="list-style: none; max-width: 220px; "><li>';
	for(i=0;i<shortestTags.length;i++){
		var splitter = (i < shortestTags.length-1) ? ', ' : '';
		statsHtml += '<a href="' + tagUrlBase + shortestTags[i] + '/">' + shortestTags[i] + '</a>' + splitter;
	}
	statsHtml += '</li></ul></td>';
	
	statsHtml += '<tr><td colspan="2"><p style="font-size: 12px; margin: 5px -10px -5px 0;"><em>' + singleUse + ' unique tags are being ' + uniqueText + ' these statistics. These tags were only used once.<br>You can change this setting from the list view.</em></p>';
	
	// fill modal div
	md.innerHTML = '<div style="margin: 25px 0 -10px 25px;; float: none; width: 100%;"><h2 style="font-size: 24px;">' + thisStumbler + '\'s Tag Details</h2></div>';
	md.innerHTML += '<table style="padding: 25px;"><tbody><tr><td>'+ statsHtml +'</td></tr></tbody></table>';

	// show div
	document.body.appendChild(cd);
	document.body.appendChild(md);
	unsafeWindow.onresize = resizeModal;
	cd.wrappedJSObject.onclick = hideModal;

}

function hideModal(){
	document.body.removeChild(cd);
	document.body.removeChild(md);
	unsafeWindow.onresize = '';
}

function resizeModal(){
	md.style.top = (window.innerHeight/2) - 150 + 'px';
	md.style.left = (window.innerWidth/2) - (md.style.width.replace("px","") / 2) + 'px';
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 18 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						SkipWeeklyUpdateCheck();
						if(manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                }
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}