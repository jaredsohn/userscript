// ==UserScript==
// @name          Tibia.com Enhancements
// @author        aijan
// @namespace     tibia
// @description   some enhancements
// @include       http://www.tibia.com/*
// @include       https://secure.tibia.com/*
// @include       http://forum.tibia.com/*
// @version       09.11.2010
// ==/UserScript==

(function () {

// for compatibility with chrome and opera
checkForGeasemonkeyApi();


// favourite threads item in sidebar
//
var sidebarGuild = gid("submenu_guildboards").parentNode;
var sidebarFavThreads = sidebarGuild.cloneNode(true);

var duplicateIds = _evaluate(".//*[@id]", sidebarFavThreads);
for (var i=0; i<duplicateIds.length; i++)
	duplicateIds[i].removeAttribute("id");

sidebarFavThreads.href = "http://forum.tibia.com/forum/?action=board&boardid=11&";
sidebarFavThreads.childNodes[1].childNodes[5].firstChild.nodeValue = "Favourite Threads";


var sidebarCommunity = gid("submenu_communityboards").parentNode;
if (location.href.match(/forum\/\?action=board&boardid=11&$/i)) { // favourite threads
	sidebarCommunity.childNodes[1].style.color = "";
	sidebarCommunity.childNodes[1].childNodes[3].style.visibility = "";
	sidebarFavThreads.childNodes[1].style.color = "white";
	sidebarFavThreads.childNodes[1].childNodes[3].style.visibility = "visible";
}
else {
	sidebarFavThreads.childNodes[1].style.color = "";
	sidebarFavThreads.childNodes[1].childNodes[3].style.visibility = "";
}

insertAfter(sidebarFavThreads,sidebarGuild);


// favourite boards item in sidebar
//
var sidebarFavBoards = sidebarGuild.cloneNode(true);

var duplicateIds = _evaluate(".//*[@id]", sidebarFavBoards);
for (var i=0; i<duplicateIds.length; i++)
	duplicateIds[i].removeAttribute("id");

sidebarFavBoards.href = "http://forum.tibia.com/forum/?subtopic=guildboards&";
sidebarFavBoards.childNodes[1].childNodes[5].firstChild.nodeValue = "Favourite Boards";

if (location.href.match(/forum\/\?subtopic=guildboards&$/i)) { // favourite boards
	sidebarGuild.childNodes[1].style.color = "";
	sidebarGuild.childNodes[1].childNodes[3].style.visibility = "";
}
else {
	sidebarFavBoards.childNodes[1].style.color = "";
	sidebarFavBoards.childNodes[1].childNodes[3].style.visibility = "";
}

insertAfter(sidebarFavBoards,sidebarGuild);


var image_redX = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAATCAYAAAB2pebxAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2QcUDS0CUkJTDwAAAeRJREFUOI190jFoU1EUxvFf3ksiCCoUHFyKLdaKClYtxt1JSxeldXBRN2ers5uDg7iILgoODqUgDlXBxUGaRAoiEhAVBEGlVmirFdsk78Uh75k0Sf3gch/vO/d/7jnn0qE5Jkq8LnJtmrDTT1Vm7zy7INtpBkwEjISMDNGPi+3+NGE/12OmYpaKHA06ISFf8sgjx4UKk6n3jm2DzOIKMujLMNZ1kzyvsk2YoBl5s8KTiFzE0xyFDKrN8Nt/uJvphFToy/E9S5hA4E5Eoc7hOmpNyOwo4xkaXRD4RDnLsTCBNBChDfB1jUOj/Ej62K0sL3LNnqS9kWv+F9IIOJ8CNoUEvMwmgHSlfQp5uJ/nHUm7tYUPYWJmkzLiJmAl5nKPpN2KORMkmfNak8KtQRZ6ndmgz5xdIF6i8ZvGerIv0VhkbJPyW3pPIeZeRCadRjXZI9Q40Qvyb8QV9gTM5dmZTiQtI25BVursHmC56yYltq/xKGJn+3uo8a3a+lZnR52rPctpcD/mYAeg/JPhKjPtoBpTbxjeAClxCqfrGwEfI8b38WuVc+s8bgPlIvo2QALeYlUraHGNk0MswgGqdSarPEv8mSMUu7pb5FKRRpHlIoVeE5hna5kHZQZ6+WCOGyWObxrwH/0FIzCkqfCAEWYAAAAASUVORK5CYII=";
var image_greenTick = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH2QcYABwnnRWsEQAAAbVJREFUOI2l1D9IVlEYx/HPvb3WZlhUg40NDTVFUS4RzhENYYMtTRWEFElDyyVMyIKQxMKGpv5AQVvUEkEEYjgU5BbSEFFCEAUKes9puK+v9y17/+gDD4dz+PE9z+95Diexvkhc0CvoQYfEs8qaUQN24JHgSO0s2pqsCXbeNh1eye0pwZ6K+je0DctsFLzEvhLsga/63beYtg2cNyZ1SIoUide2OO2JHNqzfEWf6LGAiOCzBfvdNrcsaR2Y2Sn3QdQlIMjlDrvhbVnWzpTHpbrE6i66+jesdeCQ46Kj1cpIvLfJ8GrS5pYznTrMoFtALkePzNRq8uZTrriG7tLJxP9g9cBLths0LtNZqm633Jma1eAXskb3F8CL+kQfcdaCCScUDz4YFlTkyBHdlPneCJgYMCgxUnuoRb6Qei41KpFUO/1NapfM78bAyzZb8EZqbx00Ka2F8pwhdxrBCsvX/ZQ7Jpor9Up1okUGn1TcawZjuYdjZnFSlP8DLfKuzFIrwJXfZtKsgxZFvXWKaN6SUybNt17hcnwxgnd1loOHbvnRCqy+QpgRHTAllWIa0xKjJld+k2bxByWKi/eEwBM2AAAAAElFTkSuQmCC";


// on guild pages
// show online guild members
if (location.href.match(/community\/\?subtopic=guilds/i)) {
	// array with the rows of the guild table
	var guildTable = _evaluate("//*[b='Guild Members']/parent::tr/parent::tbody/tr");
	
	if (guildTable.length) { // guild table found
		// get the game world of the guild
		guildTable[0].parentNode.parentNode.parentNode.innerHTML.match(/The guild was founded on (.+) on/i);
		var gameWorld = RegExp.$1
		
		// request the who is online page of the world and call insertStatusColumn() when received
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://www.tibia.com/community/?subtopic=worlds&world=" + gameWorld,
			onload: function (responseDetails) { insertStatusColumn(responseDetails,guildTable) }
		});
	}
}

// on account page
// links char names
else if (location.href.match(/account\/\?subtopic=accountmanagement/i)) {
	// array with char columns
	var chars = _evaluate("//*[td='Name']/parent::tbody/tr/td[1]/nobr");
	for (var i=0; i<chars.length; i++) {
		var charName = chars[i].innerHTML.replace(/(\xa0|&#160;|&nbsp;| )/g, " ").replace(/(\d{1,2}\.)\s/,"");
		chars[i].innerHTML = RegExp.$1 + "&nbsp;";
		
		var link = document.createElement('a');
		link.innerHTML = charName.replace(/\s/, "&nbsp;");
		link.href = "http://www.tibia.com/community/?subtopic=characters&name=" + charName.replace(/\s/g, "+");
		// link.target = "_blank";  // open in new tab
		
		chars[i].appendChild(link);
	}
}

// on character pages
// several links 
else if (location.href.match(/community\/\?subtopic=characters/i)) {
	var infoTable = _evaluate("//b[.='Character Information']/../../..")[0];
	if (!infoTable)
		return;
		
	// link to the who is onlne page of the world(s)
	var worldNode = _evaluate(".//td[.='World:']/following-sibling::td[1]", infoTable)[0];
	var world = worldNode.innerHTML;
	worldNode.innerHTML = "<a href='http://www.tibia.com/community/?subtopic=worlds&world=" + world + "'>" + world + "</a>";
	
	var formerWorldNode = _evaluate(".//td[.='Former World:']/following-sibling::td[1]", infoTable)[0];
	if(formerWorldNode)
		formerWorldNode.innerHTML = "<a href='http://www.tibia.com/community/?subtopic=worlds&world=" + formerWorldNode.innerHTML + "'>" + formerWorldNode.innerHTML + "</a>";
	
	// link to the town map
	var residence = _evaluate(".//td[.='Residence:']/following-sibling::td[1]", infoTable)[0];
	if (residence)
		residence.innerHTML = "<a href='/library/?subtopic=maps&region=" + residence.innerHTML.replace(/[\s\']/g,"").toLowerCase() + "'>" + residence.innerHTML + "</a>";
	
	// link to the house page
	var house = _evaluate(".//td[.='House:']/following-sibling::td[1]", infoTable)[0];
	if (house) {
		house.innerHTML.match(/^(.+?(\s\(Shop\)|))(\s\((.+?)\).+?)$/);
		var houseName = RegExp.$1;
		var secondPart = RegExp.$3;
		var town = RegExp.$4;
		
		// request the house overview to get the house id
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://www.tibia.com/community/?subtopic=houses&world=" + world + "&town=" + town + "&type=houses",
			onload: function (responseDetails) {
				var regExp = new RegExp(houseName.replace(/(\xa0|&nbsp;| )/g, "&#160;").replace(/([()])/g,"\\$1") + "[\\s\\S]+?NAME=houseid VALUE=(\\d+)", "i");
				var houseId = regExp.exec(responseDetails.responseText)[1];
				house.innerHTML = "<a href='/community/?subtopic=houses&page=view&world=" + world + "&town=" + town + "&type=houses&houseid=" + houseId + "'>" + houseName + "</a>" + secondPart;
			}
		});
	}
	
	
}

// on reply and new thread pages
// allows to save a default post char
else if (location.href.match(/forum\/(|index\.php)\?action=(new_thread|new_post|quote)/i)) {
	var select = document.getElementsByName("forum_character")[0];
	
	// change the link when default char is selected
	select.addEventListener("change", function () {
		if (select.options[select.selectedIndex].value == GM_getValue("defaultPostChar","-1"))
			gid("setDefault").innerHTML = "[default]";
		else
			gid("setDefault").innerHTML = "[set as default]";
	}, true);

	// create the set default link
	var span = document.createElement("span");
	span.innerHTML = " <a id='setDefault' style='cursor: pointer'>[default]</a>";
	span.addEventListener("click", function () {
		GM_setValue("defaultPostChar",select.options[select.selectedIndex].value);
		gid("setDefault").innerHTML = "[default]";
	}, true);
	
	insertAfter(span,select);
	
	// select the saved default char
	var postChar = GM_getValue("defaultPostChar","-1");
	for (var i=0; i<select.options.length; i++) {
		if (select.options[i].value == postChar) {
			select.selectedIndex = i;
			break;
		}
	}
}



//// favourite boards
// on world and trade boards page
// favourite boards at the top
else if (location.href.match(/forum\/\?subtopic=((world|trade))boards/i) || location.href.match(/forum\/.*[?&]sectionid=((2|3))$/i)) {
	if (RegExp.$1 == "2")
		var forumType = "world";
	else if (RegExp.$1 == "3")
		var forumType = "trade";
	else
		var forumType = RegExp.$1;

	// array with board rows
	var boardRows = _evaluate("//b[.='Board']/../../../tr[position()>1 and position()<last()]");

	
	// add an enventlistener to the first column of every board row
	// a click will add the board to the favourite board part
	for (var i=0; i<boardRows.length; i++) {
		boardRows[i].setAttribute("forumType",forumType);
		boardRows[i].childNodes[1].setAttribute("style","cursor: pointer");
		boardRows[i].childNodes[1].addEventListener("click", function () {
			insertBoardRow_separator(this.parentNode);
		}, true);
	}
	
	// inserts saved boards
	var boards = GM_getValue(forumType,"").split(",");
	for (var i=0; i<boards.length; i++) {
		for (var j=0; j<boardRows.length; j++) {
			if ( getBoardName(boardRows[j]) == boards[i] ) {
				insertBoardRow_separator(boardRows[j],true)
				break;
			}
		}
	}
}
// on all other forums than world and trade boards forum
// saves a board to favourites when clicked
else if (location.href.match(/forum\/\?subtopic=(?!guildboards&$)(.+?)boards/i) || location.href.match(/forum\/.*[?&]sectionid=(\d+)/i)) {
	if (RegExp.$1 == "12")
		var forumType = "community";
	else if (RegExp.$1 == "7")
		var forumType = "support";
	else if (RegExp.$1 == "10")
		var forumType = "guild";
	else
		var forumType = RegExp.$1;
	
	// array with board rows
	var boardRows = _evaluate("//b[.='Board']/../../../tr[position()>1 and position()<last()]");
	
	// no board for this forum
	if (boardRows.length == 1 && boardRows[0].childNodes[1].innerHTML.match(/(You can not see any boards in this section.)/i))
		return;

	// add an enventlistener to the first column of every board row
	// a click will add the board to the favourite board page
	for (var i=0; i<boardRows.length; i++) {
		boardRows[i].setAttribute("forumType",forumType);
		boardRows[i].childNodes[1].setAttribute("style","cursor: pointer");
		boardRows[i].childNodes[1].addEventListener("click", function () {
			var boardName = getBoardName(this.parentNode);
			var forumType = this.parentNode.getAttribute("forumType");
			
			if (gid("boardName_" + boardName)) {
				removeFromGMlist(boardName, forumType);
				this.firstChild.firstChild.src = image_redX;
				this.firstChild.firstChild.id = "";
			}
			else {
				addToGMlist(boardName, forumType)
				// green tick mark as image
				this.innerHTML = '<center><img id="boardName_' + boardName + '" width="16" height="16" border="0" src="' + image_greenTick + '"></center>';
			}
		}, true);
	}
}
// new favourite boards page
// displays every saved board
else if (location.href.match(/forum\/\?subtopic=guildboards&$/i)) {
	// headline image
	gid("ContentBoxHeadline").src = "data:image/gif;base64,R0lGODlh+gAcAKIAAAUEA6mTdMmvinlqU0I6Lc3MjO/QpAAAACH5BAEAAAcALAAAAAD6ABwAAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ4UoK5ouwBufK2wbKeEYBjFUN8igA9IZAAMgsDA9yvaAASDMrAjNJ0aAFVwPams3RiUuisQsLLlFgbQmR9htCNqGDbiFuHSSq7jK38RKmRcci0DO34KBAEBZ3d2WSotUFZ3BAOPG0c7OkqJmkaTEkKBgnSFhiYABTsDopBUj1C0RpYKKgONSqMHNLeVYLVfYLC+YDkGK7e+wXFaoLlVorqNTA5CsrhfzQTFlwM6SE2VvaoZQq6kZEPpO01RAWyISuIGlm1I7wqI72TefXrUqGbFXqJEhQZJaSUPQr92iCKlqxfNCLsadOQNaLVD/16NQT02dmSTbOS5DQ9JiWvo6x8DRGegCSPAcdYWYGXcUcmkyxWMhzl6SllC9Ms4KD4f9ItJB5isZTWNrPzYKQnPRBiPqhDnI4oAb+FCnbSwVILXcQvovMIlgEs6iajYtGLGSWMZYDoKqW3W70fWVNBYNujL6KDHiH7jptUHOBFLpHVa3jOSUxuusRrKQkhHx6+nrK9YRTay9C25kQ/9kmGjTnKqFzrW+tIhdkE/hksQcpKNK6UvmPt85WSwt6+tKjdZYMagGY6f2B+NQ2M9mrjPVlfquguVr2HTRa2tT5b2bfBINvnqhF88+ogP6MKlJK7i7krnfp0iLafQ3AGin/9ogRdZFEPsdYcrxlEmX4K/8fDIdwcYKJ4a+enSBYMC+qbgWv8dgEhCSR3jEzTKNNCZO46Zst92trCRBHWadDcdLiYpiElwL6D2TiVUeCTgg+sJmMQuu/BmG478uFJjjuO9GF9MI2LSFj4XWddOJeKoOFY2HClB1EYwELjCZ70p+RhX8LyT2gsZoahbmpNFGOIxnLhFQxwYboemeGH6sZV8nBykCHtv9GaGcrPFud9mghrkJ36C/kDHNIQ6dQ9kX62An1119OFjku11Mkk6JEoEhVL0MckFHYfi8pSbB6nQyaSZwiaqUWBc6qqii2IjjZ/lCCfAlxoG+lqDrmCy0zzNCAUgQA+ilgapI2C1huIStEHRJRgbGSkZD1/mxWyyPbWDBLE+jVTSuZhEyJEU8KlllH69olrdS7zmAxg72BSWyDVlphgoi2McZEY/j/Xh5zGO1nqHwgfBpTDAMEk1jklCvOunv+BGZzC99foX5CLM4OJNi8/QYs42Kh8zE13OuMxdOdlhUlQEL3uzcjeIRliyy8G84Ixfd4pi884hm3dv0kw37TS+Sz8t9dTLaUj11VijUWrWXHd9w9Zehy12CTSMbfbZaKet9tpstw1EAgA7";

	var boardTable = _evaluate("//b[.='Board']/../../..")[0];
	
	// remove the guild board rows
	var boardRows = _evaluate("./tr[position()>1 and position()<last()]", boardTable);
	for (var i=0; i<boardRows.length; i++)
		removeElement(boardRows[i]);
	

	var forums = new Array("world", "trade", "community", "support", "guild");
	
	// insert alphabetically sorted rows of the boards to be later accessed by id
	// xmlhttpRequest is asynchronous
	var boards = [];
	for (var i=0; i<forums.length; i++) {
		var forumBoardNames = GM_getValue(forums[i],"").split(",");
		if (!forumBoardNames[0])
			continue;
		for (var j=0; j<forumBoardNames.length; j++)
			boards.push(forumBoardNames[j]);
	}
	boards.sort();

	var referenceRow = boardTable.lastChild;
	for (var i=0; i<boards.length; i++) {
		var row = document.createElement("tr");
		row.setAttribute("id","fav_" + boards[i]);
		insertBefore(row, referenceRow);
	}
	
	
	// get the fav board rows with an ajax request
	for (var i=0; i<forums.length; i++) {
		// no favourite boards for this forum
		if (!GM_getValue(forums[i],""))
			continue;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://forum.tibia.com/forum/?subtopic=" + forums[i] + "boards",
			onload: function (response) {
				response.finalUrl.match(/\?subtopic=(\w+?)boards/i);
				var forum = RegExp.$1;
				
				var boards = GM_getValue(forum,"").split(",");
				for (var j=0; j<boards.length; j++) {
					var boardRegExp = new RegExp('<tr>\\s<td bgcolor="#D4C0A1" class="ff_std">.*?</td><td bgcolor="#D4C0A1" class="ff_std"><a href="http://forum.tibia.com/forum/\\?action=board&amp;boardid=\\d+">' + boards[j] + '</a><br>[\\S\\s]*?</tr>', "i");
					var boardRow = newTr( response.responseText.match(boardRegExp) );
						
					// used to be able to remove the bord from the saved fav lists
					boardRow.setAttribute("forumType", forum);

					var ref = gid("fav_" + boards[j]);
					insertBoardRow(boardRow, ref);
					removeElement(ref);
				}
			}
		});
	}
}


//// favourite threads
// on all boards
// saves a thread to favourites when clicked
else if (location.href.match(/forum\/(|index\.php)\?action=board&boardid=(?!11&$)(\d+)/i)) {
	var firstThreadTableColumn = _evaluate("//b[.='Thread']/../../following-sibling::tr/td[1]");
	for (var i=0; i<firstThreadTableColumn.length; i++) {
		firstThreadTableColumn[i].setAttribute("style","cursor: pointer");
		firstThreadTableColumn[i].addEventListener("click", function () {
			var threadId = _evaluate("./following-sibling::td[2]/a", this)[0];
			if (!threadId) // no link on thread title, thread under investigation..
				return;
			threadId = threadId.href.split("threadid=")[1];
			
			var boardName = _evaluate("//*[@class='BoxContent']/table[1]/tbody/tr/td[2]/b")[0].innerHTML;
			
			if (gid("tickMark_" + threadId)) {
				if ( removeFromGMlist(threadId, boardName) == "empty" )
					removeFromGMlist(boardName, "boardsWithFavThreads");
			
				this.firstChild.firstChild.src = image_redX;
				this.firstChild.firstChild.id = "";
			}
			else {
				addToGMlist(boardName, "boardsWithFavThreads");
				addToGMlist(threadId, boardName);
				
				// green tick mark as image
				this.innerHTML = '<center><img id="tickMark_' + threadId + '" Fwidth="16" height="16" border="0" src="' + image_greenTick + '"></center>';
			}
		}, true);
	}
}
// on all threads
// adds thread to favourites when clicked on title
else if (location.href.match(/forum\/(|index\.php)\?action=thread&/i)) {
	if (_evaluate("//div[.='Error Message']")[0]) // thread not found or no rights to access
		return;
	
	var titleTd = _evaluate("//b[.='Author']/../../../../preceding-sibling::table[1]/tbody/tr[2]/td[1]")[0];
	titleTd.setAttribute("style","cursor: pointer");
	titleTd.addEventListener("click", function () {
		var threadId = _evaluate("./../../../following-sibling::table[1]/tbody/tr[1]/td[2]/table/tbody/tr/td[1]/b", this)[0].innerHTML.split("#")[1];
		var boardName = _evaluate("//*[@class='BoxContent']/table[1]/tbody/tr/td[2]/a[2]")[0].innerHTML;
		
		if (gid("tickMark")) { // already added
			if ( removeFromGMlist(threadId, boardName) == "empty" )
				removeFromGMlist(boardName, "boardsWithFavThreads");
			
			this.firstChild.firstChild.src = image_redX;
			this.firstChild.firstChild.id = "";
		}
		else {
			addToGMlist(boardName, "boardsWithFavThreads");
			addToGMlist(threadId, boardName);
			
			// green tick mark as image
			this.firstChild.innerHTML = this.firstChild.innerHTML.replace(/(<img.+?>|^)/, '<img id="tickMark" width="16" height="16" border="0" src="' + image_greenTick + '"> ');
		}
	}, true);
}
// new favourite threads page
// displays every saved thread
else if (location.href.match(/forum\/\?action=board&boardid=11&$/i)) {
	// headline image
	gid("ContentBoxHeadline").src = "data:image/gif;base64,R0lGODlh+gAcAKIAAAUEA6mTdMmvinlqU0I6Lc3MjO/QpAAAACH5BAEAAAcALAAAAAD6ABwAAAP/eLrc/jDKSau9OOvNu/9gKI5kaZ4VoKpo677tCsA0MBh4MNMkQAy7l4/QmAV5D4BBEBgAj0iQSmBw4gTQKIeAI2RLgEA1SGgCtQ6fGFcgoj2/m8Frw52Lb0vdkP1ibAMEP3aCgnJ3eQsqa1iJG0o4cwphTVA2fhQyMU9FTnCRoKCBdmg+A0lcS5iOEHt8iiyKA2JuPisNgkFqAU1einQ+k4UyRCq5R7dDKjdPsQfGx0kBAgNUBmZOOqmnz8qwwdDODNC+RYM65tVXusqreZCvrWt3AAV2urTPBALUa9c7XKxxq0cohw17Bo3w0hYq1MAb07p8WSHHzaRn9/ZFCuAr/5WOAQj/sRMTwB46BqniTQpTwAlCdK6qsEoSCRMAayd9GFRUAItOHRR36hwz6RAkfr3kvIJHCaSBlk5mKZyzCIdNKgX62IGozirGJUwCKd2h0+e2IyktHggoQ2CYKoZOzlS0LkJAVYrWkJEECdmaYsyOVISXc9szvSuoyJ16J5VaXPfSRPL5zChhsobX4j38L681i2/VQmrTudvcIjuT3EgluMskMTPkWFpHEMpgNmhJ7QHouoFsYZvTHKLpNa/V0bll3pQ5iYroKmLu/P7VhZC401/logZCBRGkM1yeTFdkrQ4iBbdL63P9ttFbla9F/rQ5j/j59ypSr5fkuNvqWP91DGXEeAqwFtI1gmA3iX6+vXJDI/H5BBtn8KFnVXcOpEfPWZzBpFcRYlDTFTYQDOdAZsb5FNl+4G3FSDZGjPEdhVCwphEoj7GSn3r6PMNEjJIs4Fh4A/bGwIPf2SbRPabwU85bHhZn3DULVZmjhcyNg2J8TzD5g5O8LVHlQtxwAZhI8+R2hjFGnXaTNVVENcspRE6hHiS8BHmAHBByydQ4n8Ejil+d4TfOHsBoUqJ+amyJkXsNEUWXKjIAOM0K/aXShixtOFOHdonEtAQoPikVii5wLrZGYZSmaQycXlyRkgDlfBVPmz5Qk5YutULG5FujZOkjX0fNWut73oETqYz11vikkxfV7AVqqDvygWmMIkZFygJKPbbcEmL1BFBIeTax5D83gvvDn7aaQSmfgajRJ4iRFBARECju0QQWBqWrK50v0QESEMzIidUMBJDbXVW0LrKpguweqeewfabUR1fg8gonNXsAIZRTkXjcW66T0WPqivI4hPC2mk0Wa6EgewmnrPlpZ5ga9TbmD4LulFLTib3qI1o0SdgykdHC0FEILMOQg4w3h8p5HSpRAZjLL8YYsfRKTf8itTCWXL2SoknHq+CkFZ6t9tpsexBx23DHLXcrP89t991wW4z33nyfpmnPfQcuOBhkD2744YgnrvjijDdueAIAOw==";
	
	// remove all threads
	var threadRows = _evaluate("//b[.='Thread']/../../../tr[position()!=2]");
	for (var i=0; i<threadRows.length; i++)
		removeElement(threadRows[i]);
		
	var boardDiv = _evaluate("//*[@id='communityboards']/div[5]/div/div")[0];
	//var threadTable = _evaluate("./table[3]", boardDiv)[0].cloneNode(true);
	
	while (boardDiv.firstChild)
		removeElement(boardDiv.firstChild);

	//boardDiv.appendChild(threadTable);
	
	// thread table and description row
	var threadTable = newTable('<table width="100%" cellspacing="1" cellpadding="3" border="0"><tbody><tr>'
								+	'<td width="22px" bgcolor="#505050" align="center" colspan="1" class="ff_white"><b><img width="16" height="16" border="0" src="http://static.tibia.com/images/global/general/blank.gif"></b></td>'
								+	'<td width="16px" bgcolor="#505050" align="center" colspan="1" class="ff_white"><b><img width="16" height="16" border="0" src="http://static.tibia.com/images/global/general/blank.gif"></b></td>'
								+	'<td bgcolor="#505050" align="center" colspan="1" class="ff_white"><b>Thread</b></td>'
								+	'<td width="116px" bgcolor="#505050" align="center" colspan="1" class="ff_white"><b>Thread Starter</b></td>'
								+	'<td width="36px" bgcolor="#505050" align="center" colspan="1" class="ff_white"><b>Replies</b></td>'
								+	'<td width="155px" bgcolor="#505050" align="center" colspan="1" class="ff_white"><b>Last Post</b></td>'
								+ '</tr></tbody></table>');
	
	// bottom table
	var bottomTable = newTable('<table width="100%" cellspacing="0" cellpadding="6" border="0"><tbody><tr><td nowrap="" bgcolor="#505050" align="left" colspan="1" class="ff_white"><b>All times are CEST.</b></td></tr></tbody></table>');
	
	// global object to save a thread row between GM_xmlhttpRequest calls
	var threadRowObject = new Object();
	
	var boards = GM_getValue("boardsWithFavThreads","").split(",");
	if (boards[0]) {
		for (var i=0; i<boards.length; i++) {
			// separator
			threadTable.firstChild.appendChild(newTr('<tr id="separator_' + boards[i] + '"><td bgcolor="#505050" align="left" class="ff_white" colspan="6"><b>' + boards[i] + '</b></td></tr>'));
			
			var threadIds = GM_getValue(boards[i],"").split(",");
			for (var j=0; j<threadIds.length; j++) {
				//threadTable.firstChild.appendChild(newTr('<tr name="' + threadIds[j] + '"><td>' + threadIds[j] + '</td></tr>'));
				GM_xmlhttpRequest({
					method: 'GET',
					url: "http://forum.tibia.com/forum/?action=thread&threadid=" + threadIds[j] + "#" + boards[i],
					onload: evaluateThreadData
				});
			
			}
		}
	}
	
	boardDiv.appendChild(threadTable);
	boardDiv.appendChild(bottomTable);
}



// fav thread functions
//
function evaluateThreadData(response) {
	var threadId = response.finalUrl.split("threadid=")[1].split("#")[0];
	var boardName = decodeURI(response.finalUrl).split("#")[1];
	
	if (response.responseText.match(/<div class="Text" >Error Message<\/div>/)) { // error: thread not found or no rights to access
		insertThreadRow( newThreadRow(threadId, "thread not found/no rights to access", "", "", "", "", new Date(1), boardName) );
		return;
	}
	
	var posters = response.responseText.match(/<a href="http:\/\/www.tibia.com\/community\/\?subtopic=characters&amp;name=[^>]+">.+?<\/a>/gi);
		
	var threadStarter = posters[0].split('">')[1].split("</a>")[0];
	var threadTitle = response.responseText.match(/<td  bgcolor="#F1E0C6" class="ff_large" colspan=1 align="left"><b>.+?<\/b><\/td>/i)[0].split('<b>')[1].split("</b>")[0];
	var pageNavigationHtml = response.responseText.match(/<b>Pages:.+?<\/b>/i);
	
	// more than one page of posts, additional xmlhttpRequest needed to get last post data
	if (pageNavigationHtml) {
		pageNavigationHtml = pageNavigationHtml[0];
		pageNavigationHtml = pageNavigationHtml.replace(/<b>Pages: <span style="font-weight: normal;">1<\/span>/i, ' <font class="ff_smallinfo"><img width="10" height="12" border="0" src="http://static.tibia.com/images/forum/logo_multipage.gif">(Pages: <a href="http://forum.tibia.com/forum/?action=thread&amp;threadid=2821103&amp;pagenumber=1">1</a>');
		pageNavigationHtml = pageNavigationHtml.replace(/<\/b>/i, ")</font>");
		
		var lastPageUrl = pageNavigationHtml.match(/http:\/\/forum\.tibia\.com\/forum\/\?action=thread&amp;threadid=\d+(&amp;pageitems=\d+|)&amp;pagenumber=\d+/gi).pop().replace(/&amp;/gi,"&");

		threadRowObject[threadId] = newThreadRow(threadId, threadTitle, pageNavigationHtml, threadStarter, "", "", new Date(), boardName);
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: lastPageUrl,
			onload: function (response) {
				var threadId = response.finalUrl.split("threadid=")[1].split("&page")[0];
				
				var posters = response.responseText.match(/<a href="http:\/\/www.tibia.com\/community\/\?subtopic=characters&amp;name=[^>]+">.+?<\/a>/gi);
				var lastPoster = posters[posters.length-1].split('">')[1].split("</a>")[0];
				
				var pages = response.finalUrl.split("pagenumber=")[1];
				var replies = (pages - 1)*20 + posters.length - 1;
				
				var lastPostId = response.responseText.match(/Post\s#\d+/gi).pop().split("#")[1];
				var lastPostDate = response.responseText.match(/(\d{2})\.(\d{2}).(\d{4})\s(\d{2}):(\d{2}):(\d{2})/g).pop();
				var lastPostDate0bject = new Date(RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
				var lastPostTdContend = '<a href="http://forum.tibia.com/forum/?action=thread&amp;postid=' + lastPostId + '#post' + lastPostId + '"><img width="10" height="9" border="0" src="http://static.tibia.com/images/forum/logo_lastpost.gif"></a>&nbsp;' + lastPostDate.replace(/\s/, "&nbsp;") + '<br><font class="ff_info">by&nbsp;<a href="http://www.tibia.com/community/?subtopic=characters&amp;name=' + escapeSpace(lastPoster) + '">' + lastPoster + '</a></font>';

				var row = threadRowObject[threadId];
				_evaluate(".//td[@id='lastPost_" + threadId + "']",row)[0].innerHTML = lastPostTdContend;
				_evaluate(".//td[@id='replies_" + threadId + "']",row)[0].innerHTML = replies;
				row.setAttribute("lastPost", lastPostDate0bject.getTime());
				
				insertThreadRow(row);
			}
		});
	}
	// only one page
	else {
		pageNavigationHtml = "";
		var replies = posters.length-1;
		var lastPoster = posters[posters.length-1].split('">')[1].split("</a>")[0];
		var lastPostId = response.responseText.match(/Post\s#\d+/gi).pop().split("#")[1];
		var lastPostDate = response.responseText.match(/(\d{2})\.(\d{2}).(\d{4})\s(\d{2}):(\d{2}):(\d{2})/g).pop();
		var lastPostDate0bject = new Date(RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
		var lastPostTdContend = '<a href="http://forum.tibia.com/forum/?action=thread&amp;postid=' + lastPostId + '#post' + lastPostId + '"><img width="10" height="9" border="0" src="http://static.tibia.com/images/forum/logo_lastpost.gif"></a>&nbsp;' + lastPostDate.replace(/\s/, "&nbsp;") + '<br><font class="ff_info">by&nbsp;<a href="http://www.tibia.com/community/?subtopic=characters&amp;name=' + escapeSpace(lastPoster) + '">' + lastPoster + '</a></font>';

		insertThreadRow( newThreadRow(threadId, threadTitle, pageNavigationHtml, threadStarter, replies, lastPostTdContend, lastPostDate0bject, boardName) );
	}

	
}
function insertThreadRow(row) {
	var boardName = row.getAttribute("name");
	var lastPostNewThread = row.getAttribute("lastPost");
	
	// sort the threads by last post date
	var boardThreads = document.getElementsByName(boardName);

	// finds the closest newer thread to insert after
	var closestNewerDate = 100000000000000;
	var closestNewerThread = gid("separator_" + boardName);
	
	for (var i=0; i<boardThreads.length; i++) {
		var date = boardThreads[i].getAttribute("lastPost");
		if (date > lastPostNewThread && date < closestNewerDate) {
			closestNewerThread = boardThreads[i];
			closestNewerDate = date;
		}
	}
	insertAfter( row, closestNewerThread );
}
function removeThreadRow(row) {
	var boardName = row.getAttribute("name");
	var threadId = row.getAttribute("id");
	if ( removeFromGMlist(threadId, boardName) == "empty" ) { // separator row has to be removed
		removeFromGMlist(boardName, "boardsWithFavThreads");
		removeElement( gid("separator_" + boardName) );
	}
	removeElement( gid(threadId) );
}
function newThreadRow(threadId, threadTitle, pageNavigationHtml, threadStarter, replies, lastPostTdContend, lastPostDate0bject, boardName) {
	// lastPost and name attribute to later be able to sort threads by last post date
	var tr = newTr('<tr id="' + threadId + '" lastPost="' + lastPostDate0bject.getTime() + '" name="' + boardName + '" height="35px">'
				  +		'<td bgcolor="#d4c0a1" align="center" colspan="1" class="ff_std"><img width="16" height="16" border="0" src="http://static.tibia.com/images/global/general/blank.gif"></td>'
				  +		'<td bgcolor="#f1e0c6" align="center" colspan="1" class="ff_std"></td>'
				  +		'<td bgcolor="#d4c0a1" align="left" colspan="1" class="ff_std"><a href="http://forum.tibia.com/forum/?action=thread&amp;threadid=' + threadId + '">' + threadTitle + '</a>' + pageNavigationHtml + '</td>'
				  +		'<td bgcolor="#f1e0c6" align="center" colspan="1" class="font_std"><a href="http://www.tibia.com/community/?subtopic=characters&amp;name=' + escapeSpace(threadStarter) + '">' + threadStarter + '</a></td>'
				  +		'<td id="replies_' + threadId + '" bgcolor="#d4c0a1" align="center" colspan="1" class="ff_std">' + replies + '</td>'
	//			  +		'<td bgcolor="#f1e0c6" align="center" colspan="1" class="ff_std">7</td>'
				  +		'<td id="lastPost_' + threadId + '" bgcolor="#f1e0c6" align="left" colspan="1" class="ff_std">' + lastPostTdContend + '</td>'
				  +'</tr>');
	tr.firstChild.addEventListener("click", function () {removeThreadRow(this.parentNode);}, true);
	tr.firstChild.setAttribute("style","cursor: pointer");
	return tr;
}
//
// fav thread functions



// fav board functions
//
function insertBoardRow_separator(row, dontSave) {
	// user has clicked to add a board to favourite list
	if (!dontSave) {
		if ( !addToGMlist(getBoardName(row), row.getAttribute("forumType")) ) // return if the board is already saved / on page
			return;
	}
	
	if(!insertBoardRow_separator.separatorRow) { // no separator row
		var separatorTr = newTr("<tr><td height='22' class='ff_white' bgcolor='#505050'></td><td class='ff_white' bgcolor='#505050'></td><td class='ff_white' bgcolor='#505050'></td><td class='ff_white' bgcolor='#505050'></td><td class='ff_white' bgcolor='#505050'></td></tr>"); 
		insertBoardRow_separator.separatorRow = separatorTr;
		
		var firstBoardRow = _evaluate("//*[b='Board']/parent::tr")[0];
		insertAfter(insertBoardRow_separator.separatorRow, firstBoardRow);
		insertAfter(insertBoardRow_separator.separatorRow, firstBoardRow);
		
		insertBoardRow_separator.rowCount = 0;
	}
	
	
	// insert the board row
	var newRow = insertBefore(row.cloneNode(true),insertBoardRow_separator.separatorRow);
	// eventListener to remove the board
	newRow.childNodes[1].addEventListener("click", function () {removeBoardRow_separator(this.parentNode);}, true);
	newRow.childNodes[1].setAttribute("style","cursor: pointer");
	insertBoardRow_separator.rowCount++;
}
function insertBoardRow(row, refereneNode) {
	var newRow = insertBefore(row.cloneNode(true), refereneNode);
	
	// eventListener to remove the board
	newRow.childNodes[1].addEventListener("click", function () {removeBoardRow(this.parentNode);}, true);
	newRow.childNodes[1].setAttribute("style","cursor: pointer");
	
	insertBoardRow.rowCount++;
}
function removeBoardRow_separator(row) {
	// remove board from saved list
	removeFromGMlist(getBoardName(row), row.getAttribute("forumType"));
	
	removeElement(row);
	insertBoardRow_separator.rowCount--;
	
	// remove separetorRow when no favourite boards are present
	if (insertBoardRow_separator.rowCount == 0) {
		removeElement(insertBoardRow_separator.separatorRow);
		insertBoardRow_separator.separatorRow = false;
	}
}
function removeBoardRow(row) {
	// remove board from saved list
	removeFromGMlist(getBoardName(row), row.getAttribute("forumType"));

	removeElement(row);
}
function getBoardName(row) {
	return _evaluate("./td[2]/a", row)[0].firstChild.nodeValue.replace(/^ /,"");
}
//
// fav board functions


// inserts a new column with every members online state into the guild table
function insertStatusColumn(responseDetails,guildTable) {
	// adjust the width of the columns
	guildTable[0].firstChild.colSpan = "5";		// top
	guildTable[1].childNodes[0].width = "25%";  // Rank
	guildTable[1].childNodes[2].width = "50%";	// Name and Title
	guildTable[1].childNodes[4].width = "15%";	// Joining Date

	// insert state cell into description row
	var stateCell = document.createElement('td');
	stateCell.width = "10%";
	stateCell.innerHTML = "<b>State</b>";
	guildTable[1].insertBefore(stateCell,guildTable[1].childNodes[4]);
	
	
	// get all online chars, their vocation and level from the received who is online page
	var regExp = new RegExp('subtopic=characters&name=.+?>(.+?)</A></TD><TD.*?>(.+?)</TD><TD.*?>(.+?)</TD></TR>', 'gi');

	var charsOnline = [];
	while (match = regExp.exec(responseDetails.responseText)) {
		match[1] = match[1].replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');
		charsOnline.push(match[1]);
	}

	// get all cells with member names
	var guildMemberCells = _evaluate("parent::tbody/tr/td[2]",guildTable[0]);
	
	for (var i=1; i < guildMemberCells.length; i++) {
		var online = false;
		// get the name and unescape the spaces
		guildMemberName = guildMemberCells[i].getElementsByTagName('a')[0].innerHTML.replace(/(\xa0|&#160;|&nbsp;| )/g, ' ');

		// check if the guild member is online
		for (var j=0; j < charsOnline.length; j++) {
			if (charsOnline[j] == guildMemberName)
				online = true;
		}
		// insert state cell for the member
		var stateCell = document.createElement('td');
		stateCell.innerHTML = online ? '<b class="green">online</b>' : '';
		insertAfter(stateCell,guildMemberCells[i]);
	}
}


function escapeSpace(string) {
	return string.replace(" ", "+");
}

// workaraund for not beeing able to edit the innerHTML of a table and tr directly
function newTr(Html){
	var div = document.createElement("div");
	div.innerHTML = "<table><tbody>" + Html + "</tbody></table>";
	return div.firstChild.firstChild.firstChild;
}
function newTd(Html){
	var div = document.createElement("div");
	div.innerHTML = "<table><tbody><tr>" + Html + "</tr></tbody></table>";
	return div.firstChild.firstChild.firstChild.firstChild;
}
function newTable(Html){
	var div = document.createElement("div");
	div.innerHTML = Html;
	return div.firstChild;
}


// adds a string to a comma separated list stored via GM_setValue
// returns false if the value was already there
function addToGMlist(string, listName) {
	var list = GM_getValue(listName,"").split(",");

	for(var i=0; i < list.length; i++) {
		if(list[i] == string)
			return false;
	}
		
	if (!list[0])
		list.shift();

	list.push(string);
	list.sort();
	
	GM_setValue(listName, list.join(","));
	return true;
}

// removes a string from a comma separated list stored via GM_setValue
// returns false if the value was not there, emty if the list is now empty
function removeFromGMlist(string, listName) {
	var list = GM_getValue(listName,"").split(",");

	var found = false;
	for (var i=0; i<list.length; i++) {
		if (list[i] == string) {
				list.splice(i,1);
				found = true;
			}
	}
	
	GM_setValue(listName, list.join(","));
	
	if (!list[0])
		return "empty";
		
	return found;
}


// inserts the new node after the reference node
function insertAfter(newNode,referenceNode) {
	return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// inserts the new node before the reference node
function insertBefore(newNode,referenceNode) {
	return referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function removeElement(element) {
	return element.parentNode.removeChild(element);
}

function gid(id) {
	return document.getElementById(id);
}

// Xpath
// returns the found nodes as array
function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var i = 0; i < XPath.snapshotLength; i++) {
		nodes.push(XPath.snapshotItem(i));
	}
	
	return nodes;
}

// for compatibility with chrome and opera
function checkForGeasemonkeyApi() {
	// chrome and opera
	if (typeof GM_getValue == "undefined" || GM_getValue.toString().indexOf("not supported")>-1) {
		GM_getValue = function (name, defaultValue) {
			return localStorage.getItem(name) || defaultValue;
		};
		GM_setValue = function (name, value) {
			return localStorage.setItem(name, value);
		};
	}
	// opera
	if (typeof GM_log == "undefined") 
		GM_log = opera.postError;
	// opera - took the chrome implementation of this function
	if (typeof GM_xmlhttpRequest == "undefined") {
		GM_xmlhttpRequest = function (details) {
			function setupEvent(xhr, url, eventName, callback) {
				xhr[eventName] = function () {
					var isComplete = xhr.readyState == 4;
					var responseState = {
						responseText: xhr.responseText,
						readyState: xhr.readyState,
						responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
						status: isComplete ? xhr.status : 0,
						statusText: isComplete ? xhr.statusText : "",
						finalUrl: isComplete ? url : ""
					};
					callback(responseState);
				};
			}

			var xhr = new XMLHttpRequest();
			var eventNames = ["onload", "onerror", "onreadystatechange"];
			for (var i = 0; i < eventNames.length; i++ ) {
				var eventName = eventNames[i];
				if (eventName in details)
					setupEvent(xhr, details.url, eventName, details[eventName]);
			}

			xhr.open(details.method, details.url);
		
			if (details.overrideMimeType)
				xhr.overrideMimeType(details.overrideMimeType);
			if (details.headers) {
				for (var header in details.headers)
					xhr.setRequestHeader(header, details.headers[header]);
			}
			xhr.send(details.data ? details.data : null);
		};
	}
}

function l(value) {
	GM_log(value);
}

})();