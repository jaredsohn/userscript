// ==UserScript==
// @name          Kongregate Cheats & Hacks
// @namespace     http://kongregatehack.com
// @description   Shows cheats and hacks when playing games at Kongregate.com
// @include       http://www.kongregate.com/games/*
// @include       https://www.kongregate.com/games/*
// @include       http://kongregate.com/games/*
// @include       https://kongregate.com/games/*
// @version       1.0
// ==/UserScript==

addBelowGame();
addAsPanel();

function addBelowGame(){
	var idToAddAfter = (document.getElementById("belowgame_accomplishments")) ? document.getElementById("belowgame_accomplishments") : document.getElementById("admin_control_container");

	var hackDiv = document.createElement('div');
	hackDiv.id = "belowgame_accomplishments";

	var hackLink = document.createElement('a');
	hackLink.innerHTML = "(See all hacks for all games)";
	hackLink.href = "http://kongregatehack.com";

	var hackTitle = document.createElement('h3');
	hackTitle.innerHTML = "Hacks ";
	hackTitle.appendChild(hackLink);

	var gameTitle = document.getElementsByClassName('fn')[0].innerHTML;

	var hacks = document.createElement('p');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.kongregatehack.com/userscript.php?name=' + gameTitle,
		headers: {
			'User-agent': window.navigator.userAgent,
			'Content-type': null
		},
		onload: function(res) { if (res.status == 200) hacks.innerHTML = res.responseText; }
	});

	hackDiv.appendChild(hackTitle);
	hackDiv.appendChild(document.createElement('hr'));
	hackDiv.appendChild(hacks);

	idToAddAfter.parentNode.insertBefore(hackDiv, idToAddAfter.nextSibling);
}

function addAsPanel(){
	var idToAddAfter = (document.getElementById("game_info_panel")) ? document.getElementById("game_info_panel") : idToAddAfter = document.getElementById("game_description_panel");
	
	var hackPanel = document.createElement('div');
	hackPanel.id = "game_hacks_panel";
	hackPanel.className = "collapsible_panel";

	var hackLink = document.createElement('a');
	hackLink.innerHTML = "Hacks";
	
	var hackTitle = document.createElement('p');
	hackTitle.className = "panel_handle spritegame opened_link";
	hackTitle.appendChild(hackLink);

	var gameTitle = document.getElementsByClassName('fn')[0].innerHTML;
	
	var hacks = document.createElement('div');
	hacks.className = "full_text";
	hacks.style.cssText = "display: none;";
	
	var truncatedHacks = document.createElement('div');
	truncatedHacks.className = "truncated_text";
	
	var innerHacks;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.kongregatehack.com/userscript.php?name=' + gameTitle,
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
		hacksContainer1.className = "panel_body splittext";
		hacksContainer1.appendChild(hacksContainer2);
		
		hackPanel.appendChild(hackTitle);
		hackPanel.appendChild(hacksContainer1);

		idToAddAfter.parentNode.insertBefore(hackPanel, idToAddAfter.nextSibling);
	}
}