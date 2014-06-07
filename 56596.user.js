// ==UserScript==
// @name           Bejeweled Cheat
// @namespace      DeadTrash
// @description    Para você que não tem saco para jogar Bejeweled Direito// @copyright      2009, DeadTrash 
// @include        http://labs.popcap.com/facebook/bj2/*
// ==/UserScript==

function cheatMain()
{
	function getGame()
	{
		var gameFlashArr = document.getElementsByName('gameFlash');
		//alert(gameFlashArr.length);
		return gameFlashArr[gameFlashArr.length-1];
	}

	function activateTimeHack()
	{
		getGame().SetVariable("challengeTime", 24*60); // 100 hours
	}

	function deactivateTimeHack()
	{
		getGame().SetVariable("challengeTime", 1); // back to 1 minute
	}

	function nextLevel()
	{
		var levelOn = parseInt(getGame().GetVariable("maingame.levelOn")) + 1;
		getGame().SetVariable("maingame.levelOn", levelOn)
		getGame().SetVariable("scoreUp", "SCORE x" + levelOn);
		getGame().SetVariable("scoreUp2", "x" + levelOn);
	}

	function cheatTimer()
	{
		setTimeout(cheatTimer, 1);

		var game = getGame();
		//alert(game.GetVariable);

		var boardArray = game.GetVariable("maingame.boardArray");
		if (typeof boardArray == 'string')
		{
			var comm = document.getElementById("comm").childNodes[0];
			comm.childNodes[0].childNodes[3].style.backgroundColor = '#FF0000'; // data write in progress or game is not ready
			comm.childNodes[0].childNodes[4].style.backgroundColor = '#' + (0x100000 + parseInt(game.GetVariable("maingame.myScore"))).toString(16);

			if (game.GetVariable("maingame.gamePhase") != "norm")
				return;
			if (game.GetVariable("maingame.gemDragging") != "false")
				return;
		
			boardArray = boardArray.replace(/_level0./g, "");
			var board = boardArray.split(",");
			if (board.length != 64)
				return;

			for (var j=0;j<8;j++)
				for (var i=0;i<8;i++)
				{
					var name = board[i*8+j];
					var type  = game.GetVariable(name + ".myType");
					var shiny = game.GetVariable(name + ".bangMe")?1:0;
					var multi = game.GetVariable(name + ".isLevelUp")?1:0;
					var hyper = game.GetVariable(name + ".isHyper")?1:0;
					comm.childNodes[j+1].childNodes[i].style.backgroundColor = '#' + (0x100000 + type*0x000010 + shiny*0x000100 + multi*0x000200 + hyper*0x000400).toString(16);
				}

			comm.childNodes[0].childNodes[3].style.backgroundColor = '#00FF00'; // data is written
		}
	}

	function initializeCheat()
	{
		//alert('initializeCheat');
		//if (document.domain.indexOf("labs.popcap.com") == -1) return;
		if (document.getElementById("cheatbar")) return;

		var game = getGame();
		if (!game)
		{
			alert("Can't find game object...");
		}
		//alert(game.nodeName);
		// recreate the gameFlash object with cheatsOn
		var gameObj = document.getElementById('gameFlash');
		gameObj.innerHTML = gameObj.innerHTML.replace(/bejeweledfacebook\.swf\?/g, 'bejeweledfacebook.swf?cheatsOn=1&');
	
		// add the cheat bar
		var body = document.getElementsByTagName("body").item(0);
		var div = document.createElement("div");
		div.id = "cheatbar";
	
		/*function addButton(text, func)
		{
			var btn = document.createElement("input");
			btn.setAttribute("type", "button");
			btn.setAttribute("value", text);
			btn.addEventListener('click', func, false);
			//btn.onclick = func;
			div.appendChild(btn);
		}
		addButton("Activate time hack", activateTimeHack);*/

		div.innerHTML = '<input type="button" id="activateTimeHack" value="Activate time hack"/>'+
				'<input type="button" id="deactivateTimeHack" value="Deactivate time hack"/>'+
				'<input type="button" id="nextLevel" value="Increase score multiplier"/>'+
				'<!--input type="button" onclick="activateBuiltinCheats()" value="Activate built-in cheats"/-->'+
				'<a href="www.twitter.com/" target="_blank"><button>Visit Twitter\'s </button></a>';
		div.childNodes[0].addEventListener('click', activateTimeHack, false);
		div.childNodes[1].addEventListener('click', deactivateTimeHack, false);
		div.childNodes[2].addEventListener('click', nextLevel, false);
		body.insertBefore(div, body.childNodes[0]);

		// add the bot helper comm
		div = document.createElement("div");
		div.style.position = "absolute";
		div.style.right = "0";
		div.style.top = "0";
		div.innerHTML = '<table id="comm" title="Don\'t mind me, I\'m just the data comm for the second version of the hack\'s bot." style="empty-cells: show; border-spacing: 0; background-color: #FF0000;"><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>';
		body.appendChild(div);

		// draw the positioning marker
		var comm = document.getElementById("comm").childNodes[0];
		comm.childNodes[0].childNodes[0].style.backgroundColor = '#012345';
		comm.childNodes[0].childNodes[1].style.backgroundColor = '#6789AB';
		comm.childNodes[0].childNodes[2].style.backgroundColor = '#CDEF01';

		cheatTimer();
	}

	initializeCheat();
}

function inject(code)
{
	var div = document.createElement("div");
	div.innerHTML = '<script>' + code + '</script>';
	document.getElementsByTagName("body").item(0).appendChild(div);
	return;
}

if (navigator.userAgent.indexOf("Opera")>=0)
	cheatMain();
else // GreaseMonkey
	inject(cheatMain.toString() + 'cheatMain();');