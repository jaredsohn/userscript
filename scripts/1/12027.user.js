// v0.5.1
// ==UserScript==
// @name 	Handy Game History
// @namespace	philh-2007
// @description Provides a visual display of the game log (history)
// @include	http://*.conquerclub.com/game.php*
// ==/UserScript==

(function () {
	var visualising = false;
	var mapXML;
	var terrs = {};
	var terrNums = [];
	var colors = ['#eee', '#f00', '#090', '#00f', '#cc0', '#0cc', '#f9c', '#f60', '#c09'];
	var log = [];
	var logIndex = 0;
	var request;
	var counts = { action: {}, turn: {}, round: {}};

	function addVisuLink () {
		var gameLogH3 = document.getElementById('log').previousSibling;
	
		// Currently, the previous sibling is actually the text node
		// (containing just "\n") between the div and the H3.
		if (gameLogH3.nodeType == 3)
			gameLogH3 = gameLogH3.previousSibling;
	
		var vl = document.createElement('a');
		vl.innerHTML = '[visualise]';
		var vlHref = document.createAttribute('href');
		vlHref.value = '#';
		vl.setAttributeNode(vlHref);
		gameLogH3.parentNode.insertBefore(vl,gameLogH3.nextSibling);
		vl.addEventListener('click', visualise, false);
	}

	function removeNumbers () {
		var nums = document.getElementById('inner-map');
		nums.style.display = 'none';
	}
	
	function getMapFile () {
		var str = $id('outer-map').style.backgroundImage;
		return "maps/" + str.match(/maps\/(.*)\.[SL]\..*/)[1] + ".xml";
	}

	// don't want to make this a property of each territory.
	// maybe have a specific class for them, and put this in the prototype.
	function setTerrCol (terr, owner) {
		terr.indic.style.color = colors[owner];
	}
	
	function visualise (event) {
		if (!visualising) {
			visualising = true;
			addUI();
			getXML();
			removeNumbers();
			getTerrCoords();
			placeIndicators();
			setTerrOwners();
			parseLog();
			setTerrOrigOwners();
		}
		
		if (event.preventDefault)
			event.preventDefault();
		return false;
	}

	function addUI () {
		var l = document.createElement('ul');
		l.style.listStyleType = 'none';
		l.style.padding = '0px';
		var links = [ ['Game', firstMove, lastMove],
			      ['Round', prevRound, nextRound, 'round'],
			      ['Turn', prevTurn, nextTurn, 'turn'],
			      ['Action', prevMove, nextMove, 'action'] ];
		for (var i = 0; i < links.length; i++) {
			var li = document.createElement('li');
			li.innerHTML = '<a href="">&lt;</a> '
				+ links[i][0]
				+ ' <a href="">&gt;</a>';
			
			if (links[i][3]) {
				var n = links[i][3];
				li.innerHTML+=' (<span></span>/<span></span>)';
				var ss = li.getElementsByTagName('span');
				counts[n].spancur = ss[0];
				counts[n].spanmax = ss[1];
			}
			
			var as = li.getElementsByTagName('a');
			as[0].addEventListener('click', links[i][1], false);
			as[1].addEventListener('click', links[i][2], false);
			
			l.appendChild(li);
		}
		
		var insPos = $id('map-size').parentNode.nextSibling;
		insPos.parentNode.insertBefore(l, insPos);
	}

	function inCount (n) {
		counts[n].spancur.innerHTML++;
	}
	function deCount (n) {
		counts[n].spancur.innerHTML--;
	}
	function setCount (n,v) {
		counts[n].spancur.innerHTML = v;
	}

	// logIndex n means next will consider the n+1th, prev will consider
	// the nth. n is one-based.
	
	function prev () {
		if (logIndex <= 2)
			return false;

		logIndex--;
		delta = log[logIndex];
		switch (delta.type) {
		case 'conquer'://if (delta.type == 'conquer') {
			setTerrCol(terrs[delta.to], delta.defender);
		        deCount('action'); break;
		case 'new turn':
			deCount('turn'); break;
		case 'new round':
			deCount('round'); break;
		}
		
		return delta.type;
	}

	function next () {
		if (logIndex == log.length)
			return false;

		delta = log[logIndex];
		logIndex++;
		switch (delta.type) {
		case 'conquer':
			setTerrCol(terrs[delta.to], delta.attacker);
			inCount('action'); break;
		case 'new turn':
			inCount('turn'); break;
		case 'new round':
			inCount('round'); break;
		}
		
		return delta.type;
	}
	
	function peekPrev () {
		return log[logIndex-1].type;
	}
	function peekNext () {
		return log[logIndex].type;
	}
	
	function prevMove (event) {
		if (event && event.preventDefault)
			event.preventDefault();
		
		while (logIndex > 2)
			if (prev() == 'conquer') break;

		return false;
	}		
	
	function nextMove (event) {
		if (event && event.preventDefault)
			event.preventDefault();
		
		while (logIndex < log.length)
			if (next() == 'conquer') break;
		if (isEndTurn())
			nextTurn();
		
		return false;
	}

	function prevTurn (event) {
		if (event && event.preventDefault)
			event.preventDefault();

		if (isStartTurn())
			prev();
		while (logIndex > 2) {
			if (prev() == 'new turn') break;
		}
		if (peekPrev() == 'new round')
			prevRound();
		
		return false;
	}
	function nextTurn (event) {
		if (event && event.preventDefault)
			event.preventDefault();

		while (logIndex < log.length) {
			if (next() == 'new turn') break;
		}

		return false;
	}
	function isEndTurn () {
		if (peekNext() == 'new turn'
		    || peekNext() == 'new round')
			return true;
		else
			return false;
	}
	function isStartTurn () {
		if (peekPrev() == 'new turn')
			return true;
		else
			return false;
	}
	
	function prevRound (event) {
		if (event && event.preventDefault)
			event.preventDefault();
		
		while (logIndex > 2) {
			if (prev() == 'new round') break;
		}
		
		return false;
	}
	function nextRound (event) {
		if (event && event.preventDefault)
			event.preventDefault();
		
		while (logIndex < log.length) {
			if (next() == 'new round') break;
		}
		nextTurn();

		return false;
	}
	
	function firstMove (event) {
		logIndex = 0;
		for (var i in terrs)
			setTerrCol(terrs[i], terrs[i].origOwner);
		
		for (var i in counts)
			setCount(i, 0);
		
		nextTurn() // round 1, turn 1 are the first events
		
		if (event.preventDefault)
			event.preventDefault();
		return false;
	}

	function lastMove (event) {
		logIndex = log.length;
		for (var i in terrs)
			setTerrCol(terrs[i], terrs[i].currentOwner);
		
		for (var i in counts)
			setCount(i, counts[i].spanmax.innerHTML);
		
		if (event.preventDefault)
			event.preventDefault();
		return false;
	}

	function placeIndicators () {
		var map = document.getElementById('outer-map');
		var isSmall = !!$id('map-size').innerHTML.match(/larger/);
		for (var i in terrs) {
			var sp = document.createElement('span');
			sp.innerHTML = '*';
			sp.style.position = 'absolute';
			if (isSmall) {
				sp.style.left = (terrs[i].sx + 8) + 'px';
				sp.style.top = (terrs[i].sy - 15) + 'px';
			} else {
				sp.style.left = (terrs[i].lx + 8) + 'px';
				sp.style.top = (terrs[i].ly - 15) + 'px';
			}
			sp.style.fontFamily = "courier monospace";
			sp.style.fontSize = '40px';
			sp.style.color = colors[0];
			map.appendChild(sp);
			terrs[i].indic = sp;
		}
	}

	function setTerrOwners () {
		var armlist = [];
		if ($id('armies')) // found when AJAX is enabled
			armlist = $id('armies').innerHTML.split(/,/);
		else {
			var div = $id('inner-map');
			var img = div.getElementsByTagName('img')[0];
			armlist = img.src.split(/armies=/)[1].split(/,/);
		}

		for (var i = 0; i < armlist.length; i++) {
			var owner = armlist[i].split(/-/)[0];
			terrNums[i].currentOwner = owner;
			setTerrCol(terrNums[i], owner);
		}
	}

	var dateR = '([\\d :-]+) - ';
	var playerR = ' ?<SPAN class="player(\\d)">.*?</SPAN> ?';
	var conquerRegex = new RegExp(dateR + playerR + 'attacked (.*?) from (.*?) and conquered it from' + playerR,'i');
	var roundRegex = new RegExp(dateR + 'Incrementing game to round (\\d+)');
	var initRegex = new RegExp(dateR + 'Game has been initialized');
	var turnRegex = new RegExp(dateR + playerR + 'receives \\d+ armies for \\d+ territories','i');

	function parseLog () {
		var types = [ 'action', 'turn', 'round' ];
		counts.action.max = counts.turn.max = counts.round.max = 0;
		var logdiv = $id('log');
		// opera has <BR>, firefox has <br>. But test for ' /' in case.
		var logarr = logdiv.innerHTML.split(/<br ?\/?>/i);

		for (var i = 0; i < logarr.length; i++) {
			if (conquerRegex.exec(logarr[i])) {
				var entry = {};
				entry.type = 'conquer';
				entry.time = RegExp.$1;
				entry.attacker = RegExp.$2;
				entry.to = RegExp.$3;
				entry.from = RegExp.$4;
				entry.defender = RegExp.$5;
				log.push(entry);
				counts.action.max++;
			}
			else if (logarr[i].match(initRegex)) {
				log.push({type: 'new round',
					  time: RegExp.$1,
					  num: 1});
				counts.round.max++;
			}
			else if (logarr[i].match(roundRegex)) {
				var entry = {};
				entry.type = 'new round';
				entry.time = RegExp.$1;
				entry.num = RegExp.$2;
				log.push(entry);
				counts.round.max++;
			}
			else if (logarr[i].match(turnRegex)) {
				var entry = {};
				entry.type = 'new turn';
				entry.time = RegExp.$1;
				entry.player = RegExp.$2;
				log.push(entry);
				counts.turn.max++;
			}
		}
		logIndex = log.length;
		for (var i = 0; i < types.length; i++) {
			counts[types[i]].spanmax.innerHTML
				= counts[types[i]].spancur.innerHTML
				= counts[types[i]].max;
		}
	}

	function setTerrOrigOwners () {
		for (var i = 0; i < log.length; i++) {
			var o = log[i];
			if (o.type == 'conquer') {
				if (terrs[o.from].origOwner == null)
					terrs[o.from].origOwner = o.attacker;
				if (terrs[o.to].origOwner == null)
					terrs[o.to].origOwner = o.defender;
			}
		}
	}

	function getXML () {
		request = new XMLHttpRequest();
		request.open('GET', getMapFile(), false);
		if (request.addEventListener) //firefox
			request.addEventListener('load', handleResponse, false);
		else //opera
			request.onload = handleResponse;
		request.send(null);
	}

	function handleResponse () {
		if (request.readyState == 4) {
			if (request.status == 200) {
				mapXML = request.responseXML;
			} else {
				alert("error getting map file: "
				      + request.statusText
				      + ". I haven't planned for this "
				      + "eventuality, sorry.");
			}
		}
	}
		
	function getTerrCoords () {
		var ts = mapXML.getElementsByTagName('territory');

		var realTerritories = 0;

		for (var i = 0; i < ts.length; i++) {
			if (ts[i].getElementsByTagName('name')[0]!=null)
			{
				var name = ts[i].getElementsByTagName('name')[0]
					   .firstChild.nodeValue;
				var coords = ts[i]
						 .getElementsByTagName('coordinates')[0];
				var sx = coords.getElementsByTagName('smallx')[0]
					 .firstChild.nodeValue;
				var sy = coords.getElementsByTagName('smally')[0]
					 .firstChild.nodeValue;
				var lx = coords.getElementsByTagName('largex')[0]
					 .firstChild.nodeValue;
				var ly = coords.getElementsByTagName('largey')[0]
					 .firstChild.nodeValue;
				if (!terrs[name]) terrs[name] = {};
				terrs[name].sx = sx*1; //cast to ints
				terrs[name].sy = sy*1;
				terrs[name].lx = lx*1;
				terrs[name].ly = ly*1;
				
				terrNums[realTerritories] = terrs[name];
				realTerritories++;
			}
		}
	}

	function $id (id) { return document.getElementById(id); }
	function $tag (name) { return document.getElementsByTagName(name); }
		
	addVisuLink();
})();
