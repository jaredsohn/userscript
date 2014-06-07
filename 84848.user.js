// ==UserScript==
// @name           SCC Forums++
// @namespace      http://userscripts.org/users/213569
// @include        http*://www.sceneaccess.org/forums*?action=viewtopic&topicid=*
// @include        http*://sceneaccess.org/forums*?action=viewtopic&topicid=*
// @include        http*://beta.sceneaccess.org/viewtopic?id=*
// @include        http*://*sceneaccess.org/forums*
// @version        0.1.0

// @history    0.1.0	Commented out pageNumbers as it has been implemented natively. Minor bug fixes.
// @history	   0.0.9 	Added recent activity for v2 of the site.
// @history	   0.0.7	Added recent activity for v1 of the site.
// @history	   0.0.5	First version of the script.

// ==/UserScript==

// If you want to disable a feature, simply comment it out below, just like this line has been commented

titleChanger();
//linkRewriter();
//pageNumbers();
//recentActivityV1();
recentActivityV2();

/*--------------------------------------------------------------------------*/

// Title changer

function titleChanger() {
	var h1 = document.getElementsByTagName('h1');

	if(String(window.location).match(/sceneaccess.org\/forums.php$|sceneaccess.org\/forums$|sceneaccess.org\/forums.php\?action=viewforum|sceneaccess.org\/forums\?action=viewforum/gi) == null) {
		if(h1.length >= 1) {
		var separator = ':';
		var rawTopic = h1[0].innerHTML;
		var topic = rawTopic.replace(/<a\shref=\"([^\"]*)\">(.*)<\/a>\s&gt;\s/g, " ");
		document.title = "SceneAccess "+separator+separator+" View Topic"+separator+" " + topic;
		}
		else {
		var separator = '|';
		var divTopic = document.getElementById('forums_box_header');
		var rawTopic = divTopic.innerHTML;
		var topic = rawTopic.replace(/<a\shref=\"([^\"]*)\">(.*)<\/a>\s&gt;\s<a\shref=\"([^\"]*)\">(.*)<\/a>\s&gt;/g, " ");
		document.title = "SceneAccess "+separator+" View Topic "+separator+" " + topic;
		}
	}
}
// Beta Forum link rewriter

function linkRewriter() {

	if(String(window.location).match(/sceneaccess.org\/forums.php$/gi) && String(window.location).match(/beta.sceneaccess.org\/forums.php$|beta.sceneaccess.org\/forums$/gi) == null) {
		var tables = document.getElementsByTagName('table');
		var forum = tables[7];
		var cells = forum.getElementsByTagName('td');
		var rawCell = cells[10];
		var topicLinks = rawCell.getElementsByTagName('a');
		var rawLink = topicLinks[1].getAttribute('href');
		var linkArguments = rawLink.replace(/\?action=viewtopic&topicid=/g, "");
		var betaLink = 'https://beta.sceneaccess.org/viewtopic?id='+linkArguments;
		topicLinks[1].setAttribute('href', betaLink);
	//	uncomment next line if you want the link to open in a new page/tab
	//	topicLinks[1].setAttribute('target', '_blank');
	}
}
// Add page numbers to top of page - beta forum

function pageNumbers() {
	if(String(window.location).match(/beta.sceneaccess.org\/viewtopic\?id=/gi)) {
		var parent = document.getElementById('forums_box_content');
		var forums_table = document.getElementById('forums_table');
		var page_numbers_class = document.getElementsByClassName('forums_page_menu');
		var page_numbers = page_numbers_class[0];
		var npn_div = document.createElement('div');
		npn_div.setAttribute('class', 'forums_page_menu');
		npn_div.innerHTML = page_numbers.innerHTML;
		parent.insertBefore(npn_div, forums_table);
	}
}
// Top 5 recent activity - for v1

function recentActivityV1() {
	if(String(window.location).match(/sceneaccess.org\/forums.php$|sceneaccess.org\/forums$/gi) && String(window.location).match(/beta.sceneaccess.org\/forums.php$|beta.sceneaccess.org\/forums$/gi) == null) {
		var tablesArray = document.getElementsByTagName('table');
		var mainTable = tablesArray[7];
		var contentArray = mainTable.getElementsByTagName('nobr');
		var recentArray = [];
		var topRow = [];
		var top5Cell1 = [];
		var top5Cell2 = [];
		var top5Cell3 = [];
		var top5Cell4 = [];
		
		var top5Header = document.createElement('tr');
		var top5HeaderCell = document.createElement('td');
		top5HeaderCell.innerHTML='<b>Top 5 Recent Activity</b>';
		top5HeaderCell.setAttribute('align', 'left');
		top5HeaderCell.setAttribute('colspan', '4');
		top5HeaderCell.setAttribute('style', 'background-color: rgb(45, 45, 45); border: 1px solid; border-color: #61625D #2D2D2D #2D2D2D #2D2D2D;');
		top5Header.appendChild(top5HeaderCell);
		mainTable.appendChild(top5Header);
		
		for (x in contentArray) {
			var timestamps = contentArray[x].innerHTML.replace(/<br>.*/, "");
			var date = timestamps.replace(/.........$/, '');
			var time = timestamps.replace(/^.........../, '');
			isoTimestamp=date+'T'+time+'Z';
			var time = new Date(isoTimestamp);		
			var tmstmp = time.getTime();
			var contents = contentArray[x].innerHTML;
			recentArray[x] = {timestamp: tmstmp, content: contents};
		}
		
		recentArray.sort(function(a, b){
			return b.timestamp-a.timestamp;
		});

		for (x = 0; x<5; x++) {
			topRow[x] = document.createElement('tr');
			top5Cell1[x] = document.createElement('td')
			top5Cell2[x] = document.createElement('td')
			top5Cell3[x] = document.createElement('td')
			top5Cell4[x] = document.createElement('td')
			top5Cell1[x].setAttribute('style', 'border-top: 1px solid #61625D;');
			top5Cell2[x].setAttribute('style', 'background-color: rgb(45, 45, 45); border: 1px solid #2D2D2D;');
			top5Cell3[x].setAttribute('style', 'background-color: rgb(45, 45, 45); border: 1px solid #2D2D2D;');
			top5Cell4[x].setAttribute('style', 'background-color: rgb(45, 45, 45); border: 1px solid #2D2D2D;');
			top5Cell1[x].innerHTML = recentArray[x]['content'];
			topRow[x].appendChild(top5Cell1[x]);
			topRow[x].appendChild(top5Cell2[x]);
			topRow[x].appendChild(top5Cell3[x]);
			topRow[x].appendChild(top5Cell4[x]);
			mainTable.appendChild(topRow[x]);
		}
	}
}

// Top 5 recent activity - for v2

function recentActivityV2() {
	
	if(String(window.location).match(/sceneaccess.org\/forums.php$|sceneaccess.org\/forums$/gi)) {
		var forumsTable = document.getElementById('forums_table');
		var rowsArray = document.getElementsByClassName('ftc_row');
		var picsArray = document.getElementsByClassName('ftc_pic');
		var lastPostArray = document.getElementsByClassName('ftc_lastpost');
		var recentArray = [];
		var topRow = [];
		var top5Cell1 = [];
		var top5Cell2 = [];
		var top5Cell3 = [];
		var top5Cell4 = [];
		var top5Cell5 = [];
		
		var top5Header = document.createElement('tr');
		var top5HeaderCell = document.createElement('td');
		top5HeaderCell.innerHTML='<b>Top 5 Recent Activity</b>';
		top5HeaderCell.setAttribute('colspan', '5');
		top5HeaderCell.setAttribute('style', 'border-color:#434343 #2F2F2F #2F2F2F; border-style:solid; border-width:1px; overflow:hidden; padding:5px;');
		top5Header.appendChild(top5HeaderCell);
		forumsTable.appendChild(top5Header);
		
		for (x in lastPostArray) {
			var timestamps = lastPostArray[x].innerHTML.replace(/<br>.*/, "");
			var date = timestamps.replace(/.........$/, '');
			var time = timestamps.replace(/^.........../, '');
			isoTimestamp=date+'T'+time+'Z';
			var time = new Date(isoTimestamp);		
			var tmstmp = time.getTime();
			var contents = lastPostArray[x].innerHTML;
			recentArray[x] = {timestamp: tmstmp, content: contents};
		}
		
		recentArray.sort(function(a, b){
			return b.timestamp-a.timestamp;
		});
		
		for (x = 0; x<5; x++) {
			topRow[x] = document.createElement('tr');
			topRow[x].setAttribute('class', 'ft_row');
			top5Cell1[x] = document.createElement('td')
			top5Cell2[x] = document.createElement('td')
			top5Cell3[x] = document.createElement('td')
			top5Cell4[x] = document.createElement('td')
			top5Cell5[x] = document.createElement('td')
			top5Cell1[x].setAttribute('class', 'ftc_lastpost');
			top5Cell1[x].setAttribute('colspan', 2);
			top5Cell2[x].setAttribute('style', 'border: 1px solid #2F2F2F');
			top5Cell3[x].setAttribute('style', 'border: 1px solid #2F2F2F');
			top5Cell4[x].setAttribute('style', 'border: 1px solid #2F2F2F');
			top5Cell5[x].setAttribute('style', 'border: 1px solid #2F2F2F');
			top5Cell1[x].innerHTML = recentArray[x]['content'];
			topRow[x].appendChild(top5Cell1[x]);
			topRow[x].appendChild(top5Cell2[x]);
			topRow[x].appendChild(top5Cell3[x]);
			topRow[x].appendChild(top5Cell4[x]);
			forumsTable.appendChild(topRow[x]);
		}
	}
}