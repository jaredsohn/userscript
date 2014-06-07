// ==UserScript==
// @name           Newgrounds Cheats & Hacks
// @namespace      newgrounds.hacks
// @description    Show cheats and hacks when playing games at Newgrounds.com
// @include        http://www.newgrounds.com/portal/view/*
// @include        http://newgrounds.com/portal/view/*
// @include        https://www.newgrounds.com/portal/view/*
// @include        https://newgrounds.com/portal/view/*
// @version        1.0
// ==/UserScript==

//setTimeout(replaceAdsWithHacks, 2000);
addBeforeAuthorCommentsAndMedals();

function replaceAdsWithHacks(){
	var idToReplace = (document.getElementById("textunderflash"));
	
	var hackDiv = document.createElement('div');
	hackDiv.id = "belowgame_accomplishments";

	var hackLink = document.createElement('a');
	hackLink.innerHTML = "(See all hacks for all games)";
	hackLink.href = "http://kongregatehack.com";

	var hackTitle = document.createElement('h3');
	hackTitle.innerHTML = "Hacks ";
	hackTitle.appendChild(hackLink);

	var gameTitle = document.getElementsByTagName("meta")[6].getAttribute("content");

	var hacks = document.createElement('p');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.kongregatehack.com/userscript-newgrounds.php?name=' + gameTitle,
		headers: {
			'User-agent': window.navigator.userAgent,
			'Content-type': null
		},
		onload: function(res) { if (res.status == 200) hacks.innerHTML = res.responseText; }
	});

	hackDiv.appendChild(hackTitle);
	hackDiv.appendChild(document.createElement('hr'));
	hackDiv.appendChild(hacks);

	idToReplace.innerHTML = hacks.innerHTML;
}

function addBeforeAuthorCommentsAndMedals(){
	var classToAddBefore = document.getElementsByClassName("box title twothird")[0];
	
	var hackPanel = document.createElement('div');
	hackPanel.id = "game_hacks_panel";
	hackPanel.className = "box title twothird";
	
	var top = document.createElement('div');
	top.className = "boxtop";
	top.appendChild(document.createElement('div'));
	
	var box = document.createElement('div');
	box.className = 'boxl';
	
	var innerBox = document.createElement('div');
	innerBox.className = 'boxr';
	
	var innerInnerBox = document.createElement('div');
	innerInnerBox.className = 'boxm';
	
	var headsizer = document.createElement('div');
	headsizer.className = 'headsizer';
	
	var heading = document.createElement('div');
	heading.className = 'heading';
	
	var hackTitle = document.createElement('h2');
	hackTitle.className = "i-achieve";
	hackTitle.innerHTML = "HACKS";
	
	var bottom = document.createElement('div');
	bottom.className = "boxbot";
	bottom.appendChild(document.createElement('div'));

	var gameTitle = document.getElementsByTagName("meta")[6].getAttribute("content");
	
	var hacks = document.createElement('div');
	hacks.className = "full_text";
	hacks.style.cssText = "display: none;";
	
	var truncatedHacks = document.createElement('div');
	truncatedHacks.className = "truncated_text";
	
	var innerHacks;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.kongregatehack.com/userscript-newgrounds.php?name=' + gameTitle,
		headers: {
			'User-agent': window.navigator.userAgent,
			'Content-type': null
		},
		onload: function(res) { if (res.status == 200) innerHacks = res.responseText; continueAdding(); }
	});
	
	function continueAdding(){
		var showLessBtn = document.createElement('a');
		showLessBtn.innerHTML = "show less";
		showLessBtn.className = "show_less spritegame";
		showLessBtn.href = "#";
		showLessBtn.setAttribute('onclick', "$(this).up('.full_text').hide(); $(this).up('.show_more_text_block').down('.truncated_text').show(); return false;");
		hacks.innerHTML = innerHacks;
		hacks.appendChild(showLessBtn);
		
		var showMoreBtn = document.createElement('a');
		showMoreBtn.innerHTML = "show more";
		showMoreBtn.className = "show_more spritegame";
		showMoreBtn.href = "#";
		showMoreBtn.setAttribute('onclick', "$(this).up('.truncated_text').hide(); $(this).up('.show_more_text_block').down('.full_text').show(); return false;");
		truncatedHacks.innerHTML = innerHacks.substr(0, 120);
		truncatedHacks.appendChild(showMoreBtn);
		
		
		
		var hacksContainer2 = document.createElement('div');
		hacksContainer2.className = "show_more_text_block";
		hacksContainer2.appendChild(truncatedHacks);
		hacksContainer2.appendChild(hacks);
		
		var hacksContainer1 = document.createElement('div');
		hacksContainer1.id = "game_hacks";
		hacksContainer1.className = "boxsizer";
		hacksContainer1.appendChild(hacksContainer2);
		
		heading.appendChild(hackTitle);
		headsizer.appendChild(heading);
		innerInnerBox.appendChild(headsizer);
		innerInnerBox.appendChild(hacksContainer1);
		innerBox.appendChild(innerInnerBox);
		box.appendChild(innerBox);
		
		hackPanel.appendChild(top);
		hackPanel.appendChild(box);
		hackPanel.appendChild(bottom);

		classToAddBefore.parentNode.insertBefore(hackPanel, classToAddBefore);
	}
}