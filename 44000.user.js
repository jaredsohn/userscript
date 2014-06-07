// ==UserScript==
// @name           Replay Trace Player Movements
// @namespace      GLB
// @description    Work in progress
// @include        http://goallineblitz.com/game/replay.pl*
// ==/UserScript==

//the higher it is, the more ticks between lines drawn and quicker it should run.
var stepFrames = 3;

window.setTimeout( function() {
    addInputs();
}, 100)
    

function addInputs() {

var offPlayers = getElementsByClassName("player_icon o_icon",document);
for(var i=0; i<offPlayers.length; i++) {
	offPlayers[i].firstChild.setAttribute("onclick","");
}
var defPlayers = getElementsByClassName("player_icon d_icon",document);
for(var i=0; i<offPlayers.length; i++) {
	defPlayers[i].firstChild.setAttribute("onclick","");
}
    var arrIconsO = document.getElementsByClassName('player_icon o_icon');
	var arrIconsD = document.getElementsByClassName('player_icon d_icon');
	var arrPlayers = document.getElementsByClassName('player_name');
   	for (var i=0; i<arrPlayers.length; i++) {
		var playerA = arrPlayers[i];
		var playerID = playerA.href;
		playerID = playerID.split('player_id=')[1];
		
		var chkTrace = document.createElement('input');
		chkTrace.type='checkbox';
        chkTrace.id='trace_' + playerID;
        chkTrace.name= playerID;
		
		if(i<11) {
			arrIconsO[i].setAttribute("name",playerID);
			arrIconsO[i].addEventListener('click', function() {boxChecked(this);}, false);
		}
		else {
			arrIconsD[i-11].setAttribute("name",playerID);
			arrIconsD[i-11].addEventListener('click', function() {boxChecked(this);}, false);
		}
        
		//arrIcons[i].appendChild(chkTrace);
	}
}

function boxChecked(elemInput) {
    var playerID = elemInput.getAttribute("name");
    if (document.getElementById('line_' + elemInput.getAttribute("name"))==null) {
        replaySource = document.body.innerHTML;
        replaySource = replaySource.slice(replaySource.indexOf('var play_data = '));
        var playData = replaySource.slice(0, replaySource.indexOf(';')+1);
        eval(playData);
        
        var mainDiv = document.createElement('div');
        mainDiv.id = 'line_' + playerID;
        document.getElementById('replay_area').appendChild(mainDiv);
        
        var arrColors = new Array('black', 'blue', 'red', 'yellow', 'purple', 'orange',' aqua', 'bisque', 'darkgray', 'lightskyblue', 'magenta', 'greenyellow', 'mintcream', 'salmon', 'tan', 'turquoise', 'silver', 'slateblue', 'plum', 'orangered', 'hotpink', 'goldenrod', 'white');
        
        var numPlayer=0;
        var numPlayerOrig=0;
        for (i=0; i<play_data.length-2; i+=stepFrames) {
            for (j=1; j<=play_data[i].length-1; j++) {
                if (play_data[i][j].id == playerID) {
                    numPlayer=j;
                }
                if (play_data[0][j].id == playerID) {
                    numPlayerOrig=j;
                }
            }
            drawDottedLine(play_data[i][numPlayer].x*3, play_data[i][numPlayer].y*3, play_data[i+1][numPlayer].x*3, play_data[i+1][numPlayer].y*3, arrColors[numPlayerOrig], 'line_' + playerID);
        }
        
    }
    else {
        
        var delDiv = document.getElementById('line_' + playerID);
        document.getElementById('replay_area').removeChild(delDiv);  
    }
        
}

function makeDivs(x, y, w, h, backColor, divName)
{
    var newDiv = document.createElement('div');
	newDiv.style.left = x + 'px';
	newDiv.style.top = y + 'px';
	newDiv.style.width = w*2 + 'px';
	newDiv.style.height = h*2 + 'px';
	//newDiv.style.width = '2px';
	//newDiv.style.height = '2px';
	newDiv.style.backgroundColor= backColor;
	newDiv.className='player_icon';
	newDiv.id='ds';
	document.getElementById(divName).appendChild(newDiv);
}

function drawSolidLine(x1, y1, x2, y2, backColor, divName)
{
	if (x1 > x2)
	{
		var _x2 = x2;
		var _y2 = y2;
		x2 = x1;
		y2 = y1;
		x1 = _x2;
		y1 = _y2;
	}
	var dx = x2-x1, dy = Math.abs(y2-y1),
	x = x1, y = y1,
	yIncr = (y1 > y2)? -1 : 1;

	if (dx >= dy)
	{
		var pr = dy<<1,
		pru = pr - (dx<<1),
		p = pr-dx,
		ox = x;
		while ((dx--) > 0)
		{
			++x;
			if (p > 0)
			{
				makeDivs(ox, y, x-ox, 1, backColor, divName);
				y += yIncr;
				p += pru;
				ox = x;
			}
			else p += pr;
		}
		makeDivs(ox, y, x2-ox+1, 1, backColor, divName);
	}

	else
	{
		var pr = dx<<1,
		pru = pr - (dy<<1),
		p = pr-dy,
		oy = y;
		if (y2 <= y1)
		{
			while ((dy--) > 0)
			{
				if (p > 0)
				{
					makeDivs(x++, y, 1, oy-y+1, backColor, divName);
					y += yIncr;
					p += pru;
					oy = y;
				}
				else
				{
					y += yIncr;
					p += pr;
				}
			}
			makeDivs(x2, y2, 1, oy-y2+1, backColor, divName);
		}
		else
		{
			while ((dy--) > 0)
			{
				y += yIncr;
				if (p > 0)
				{
					makeDivs(x++, oy, 1, y-oy, backColor, divName);
					p += pru;
					oy = y;
				}
				else p += pr;
			}
			makeDivs(x2, oy, 1, y2-oy+1, backColor, divName);
		}
	}
}

function drawDottedLine(x1, y1, x2, y2, backColor, divName)
{
	if (x1 > x2)
	{
		var _x2 = x2;
		var _y2 = y2;
		x2 = x1;
		y2 = y1;
		x1 = _x2;
		y1 = _y2;
	}
	var dx = x2-x1, dy = Math.abs(y2-y1),
	x = x1, y = y1,
	yIncr = (y1 > y2)? -1 : 1,
	drw = true;
	if (dx >= dy)
	{
		var pr = dy<<1,
		pru = pr - (dx<<1),
		p = pr-dx;
		while ((dx--) > 0)
		{
			if (drw) makeDivs(x, y, 1, 1, backColor, divName);
			drw = !drw;
			if (p > 0)
			{
				y += yIncr;
				p += pru;
			}
			else p += pr;
			++x;
		}
		if (drw) makeDivs(x, y, 1, 1, backColor, divName);
	}

	else
	{
		var pr = dx<<1,
		pru = pr - (dy<<1),
		p = pr-dy;
		while ((dy--) > 0)
		{
			if (drw) makeDivs(x, y, 1, 1, backColor, divName);
			drw = !drw;
			y += yIncr;
			if (p > 0)
			{
				++x;
				p += pru;
			}
			else p += pr;
		}
		if (drw) makeDivs(x, y, 1, 1, backColor, divName);
	}
}