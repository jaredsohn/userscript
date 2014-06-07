// ==UserScript==
// @name           Bejeweled Blitz Cheat Script
// @description    Allows (dirty) cheating in Bejeweled Blitz
// @copyright      2009, CyberShadow <thecybershadow@gmail.com> (http://thecybershadow.net/hax/bejeweledblitz/)
// @include        http://labs.popcap.com/facebook/bj2/*
// ==/UserScript==

function cheatMain()
{
	function getGame()
	{
		var gameFlashArr = document.getElementsByName('gameFlash');
		return gameFlashArr[gameFlashArr.length-1];
	}

	function nextLevel()
	{
		var levelOn = parseInt(getGame().GetVariable("maingame.levelOn")) + 1;
		getGame().SetVariable("maingame.levelOn", levelOn);
		//getGame().SetVariable("scoreUp", "SCORE x" + levelOn);
		//getGame().SetVariable("scoreUp2", "x" + levelOn);
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
		if (document.getElementById("cheatbar")) return;

		var game = getGame();
		if (!game)
		{
			alert("Can't find game object...");
		}
	
		// add the cheat bar
		var body = document.getElementsByTagName("body").item(0);
		var div = document.createElement("div");
		div.id = "cheatbar";
	
		div.innerHTML = '<input type="button" id="nextLevel" value="Increase score multiplier"/>';
		div.childNodes[0].addEventListener('click', nextLevel, false);
		body.insertBefore(div, body.childNodes[0]);
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
else // GreaseMonkey is stupid
	inject(cheatMain.toString() + 'cheatMain();');