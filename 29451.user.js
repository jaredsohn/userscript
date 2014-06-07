// ==UserScript==
// @name           SSW.UpUp.us Maze Helper
// @namespace      http://ssw.upup.us
// @description    Adds Navigational Aids.
// @include        http://www.secretsocietywars.com/index.php?p=planets&a=daily_maze*
// @include        http://www.secretsocietywars.com/index.php?p=quests&a=quest*

// ==/UserScript==

var endCell = find('.//td[@class="main"]//td[@class="eunc" or starts-with(@class,"ce1") or starts-with(@class,"ce0")]');

if(endCell && /^(eunc|ce[01]{4})$/.test(endCell.className)) {
	var openEventListeners = new Array();
	addEventListener(window, 'unload', destroyEventListeners, false);
	var qMark = "data:image/gif;base64,R0lGODlhCwALAJEAAAAAAE1MTN7d3QAAACH5BAAAAAAALAAAAAALAAsAAAIajI8my6zdHphzvQZswFVc6G1M5ohgeGpJUgAAOw%3D%3D";
	
	var cssStyle = (<r><![CDATA[
		div#backtrackLink {
			position:relative;
			cursor:pointer;
			padding-left:15px;
			background:white url(data:image/gif;base64,R0lGODlhCQAJAJEAAHRzc7awsP%2F%2F%2FwAAACH5BAAAAAAALAAAAAAJAAkAAAIUjI%2BiK7awnILKgXtbeHHPznQIUgAAOw%3D%3D) no-repeat center left ;
		}
		div#backtrackLink:hover {
			color:#555;
		}
		div#backtrackLink.expanded {
			background-image:url(data:image/gif;base64,R0lGODlhCQAJAJEAAHRzc7awsP%2F%2F%2FwAAACH5BAAAAAAALAAAAAAJAAkAAAIRjI%2BiK8brXgsCWDtllvGhHxQAOw%3D%3D);
		}
		div#backtrackDirections {
			clear:left;
			min-height:1.3em;
			width:90px;
			border:1px solid silver;
			font-size:9pt;
			color:#444;
			padding:3px;
		}
		div#backtrackDirections input {
			border:1px solid silver;
			background-color:black;
			color:white;
			margin-top:.5em;
		}
		div.tooltip {
			background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAFoEvQfAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAANSURBVHjaY%2Fr%2F%2F%2F9JAAnPA8kh2HzuAAAAAElFTkSuQmCC) repeat top left;
			font-size:8pt;
			position:absolute;
			border:1px solid #aaa;
			width:120px;
			padding:8px;
			font-color:#444;
		}
		.qmark {
			margin:0 4px;
			background:white url(data:image/gif;base64,R0lGODlhCwALAJEAAAAAAE1MTN7d3QAAACH5BAAAAAAALAAAAAALAAsAAAIajI8my6zdHphzvQZswFVc6G1M5ohgeGpJUgAAOw%3D%3D) no-repeat scroll top left;
			height:11px;
			width:11px;
		}
		div#backtrackHolder {
			margin-top:2em;
			font-size:8pt;
		}
		div#backtrackDirections span {
			font-weight:bold;
		}
		a.gmDirection {
			display:block;
			height:30px;
			background-color:#CAEDC5;
			-moz-opacity:.5;
			text-decoration:none;
		}
		a.gmDirection:hover {
			-moz-opacity:.8;
		}
	]]></r>).toString();
	
	GM_addStyle(cssStyle);
	
	var curCell = find('.//td[@class="main"]//td[strong[.="X"]]');
	var column=curCell.cellIndex;
	var row = find('ancestor::tr[1]',curCell).rowIndex;
	
	var wholeTable = find('ancestor::table[1]',curCell);
	var grid = new Array();
	readTable(wholeTable);
	var curRow = find('ancestor::tr[1]',curCell);
	
	var aRow=row;
	var aCol=column;
	
	var maxCols = grid[0].length;
	var maxRows = grid.length;
	
	//used to prevent redundant directions
	var routeLocations=new Array();
	var route=new Array();
	var routeCells = new Array();
	var routeActive = false;
	
	
	var ghostPawn = document.createElement('span');
	ghostPawn.appendChild(document.createTextNode('x'));
	ghostPawn.style.position="absolute";
	
	
	
	var dirs = snap('.//td[@class="main"]//a[contains(@href,"&go=")]');
	var dirObject = new Object();
	for(var i=0,l=dirs.length;i<l;i++) { 
		var string = dirs[i].textContent;
		if(string.length==1) {
			dirObject[string]=dirs[i].href;
		}		
		dirs[i].style.backgroundColor="#CAEDC5";
	}
	
	
	for(nav in dirObject) {
		var newLink = document.createElement('a');
		newLink.className="gmDirection";
		newLink.appendChild(document.createTextNode(nav));
		//newLink.appendChild(document.createTextNode('go'));
		newLink.href=dirObject[nav];
		
		
		switch(nav) {
			case "N":
				targetCell = curRow.previousSibling.getElementsByTagName('td')[column];
			break;
			case "S":
				targetCell = curRow.nextSibling.getElementsByTagName('td')[column];
			break;
			case "E":
				targetCell = curCell.nextSibling;
			break;
			case "W":
				targetCell = curCell.previousSibling;
			break;
		}
		removeChildNodes(targetCell);
		targetCell.appendChild(newLink);
		
	}
	
	var backtrackHolder = document.createElement('div');
	backtrackHolder.id="backtrackHolder";
	
	var backtrackLink = document.createElement('div');
	addEventListener(backtrackLink,'click',toggleBacktrack,false);
	backtrackLink.id = "backtrackLink";

	var textSpan = document.createElement('span');
	textSpan.style.cssFloat="left";
	textSpan.appendChild(document.createTextNode('backtrack'));
	backtrackLink.appendChild(textSpan);
	
	var mark=new qmark('To use: Click "backtrack," then use arrow keys to navigate around the maze. Click Go! when ready.');	
	mark.style.cssFloat="left";
	backtrackLink.appendChild(mark);
	
	
	var backtrackDirections = document.createElement('div');
	backtrackDirections.id="backtrackDirections";
	backtrackDirections.style.display="none";
	
	var backtrackCounter = document.createElement('div');
	backtrackCounter.appendChild(document.createTextNode('Turns: '));
	
	var backtrackCount = document.createElement('span');
	backtrackCount.appendChild(document.createTextNode('0'));
	backtrackCounter.appendChild(backtrackCount);
	
	var backtrackDirs = document.createElement('div');
	backtrackDirs.appendChild(document.createTextNode(''));
	
	var backtrackGo = document.createElement('input');
	backtrackGo.type="button";
	backtrackGo.value="Go!";
	addEventListener(backtrackGo,'click',routeGo,false);
	
	backtrackDirections.appendChild(backtrackCounter);
	backtrackDirections.appendChild(backtrackDirs);
	backtrackDirections.appendChild(backtrackGo);
	
	backtrackHolder.appendChild(backtrackLink);
	backtrackHolder.appendChild(backtrackDirections);
	
	var target = find('ancestor::td[1]',dirs[dirs.length-1]);
	target.appendChild(backtrackHolder);
}

function qmark(txt) {
	mark = document.createElement('div');
	mark.className = "qmark";
	var tip,timer;
	addEventListener(mark,'mouseover',delayToolTip,false);
	addEventListener(mark,'mouseout',hideToolTip,false);
	return mark;
	
	function createTip() {
		tip=document.createElement('div');
		tip.className = 'tooltip';
		tip.appendChild(document.createTextNode(txt));
		tip.style.display="none";
		document.body.appendChild(tip);
	}
	function hideToolTip(e) {
		clearTimeout(timer);
		if(tip)tip.style.display="none";
	}
	function delayToolTip(e) {
		var x=e.pageX;
		var y=e.pageY;
		timer = window.setTimeout(function(){showToolTip(x,y)},750);
	}
	function showToolTip(x,y) {
		if(!tip) {
			createTip();
		}
		tip.style.top=y+10;
		tip.style.left=x+10;
		tip.style.display="block";
	}
}



//Runs the queue
function routeGo() {
	var baseurl = '/index.php?p=planets&a=daily_maze';
	if(document.location.href.indexOf('quest') > -1) {
		baseurl = '/index.php?p=quests&a=quest';
	}
	if(route.length>0) {
//		GM_get('/index.php?p=planets&a=daily_maze&go='+route[0],parseGo);
		GM_get(baseurl+'&go='+route[0],parseGo);
	} else {
		alert('Done');
//		document.location.href="/index.php?p=planets&a=daily_maze";
		document.location.href=baseurl;
	}
	function parseGo(txt) {
		//check for errors:
		//out of adventures?
		//if no errors:
		//GM_log(txt);
		if(txt.indexOf("You don't have any turns left")==-1) {
			route.shift();
			populateBackTrack()
			routeGo();
		} else {
			alert('Ran out of turns');
			document.location.href="/index.php?p=planets&a=daily_maze";
		}
	}
}

//prevents page scrolling with the arrow keys if backtracking is active
function preventScroll(e) {
	if(routeActive&&e.which<=40&&e.which>=37) {
		e.preventDefault();
	}
}

function handleKey(e) {
	if(routeActive) {
		var curClass=grid[aRow][aCol].className;
		switch(e.which) {
			case 37:
			//GM_log('left');
			var newNum=aCol-1;
			if(newNum>=0) {
				if(curClass.charAt(4)!="1" && grid[aRow][newNum].className!="unc") {
					aCol=newNum;
					move("w");
				}
			}
			break;
			case 38:
			//GM_log('up');
			var newNum=aRow-1;
			if(newNum>=0) {
				if(curClass.charAt(1)!="1" && grid[newNum][aCol].className!="unc") {
					aRow=newNum;
					move("n");
				}
			}
			break;
			case 39:
			var newNum=aCol+1;
			//GM_log('right');
			if(newNum<maxCols) {
				if(curClass.charAt(3)!="1" && grid[aRow][newNum].className!="unc") {
					aCol=newNum;
					move("e");
				}
			}
			break;
			case 40:
			//GM_log('down');
			var newNum=aRow+1;
			if(newNum<maxRows) {
				if(curClass.charAt(2)!="1" && grid[newNum][aCol].className!="unc") {
					aRow=newNum;
					move("s");
				}
			}
			break;
		}
	}
}

//assembles route arrays, styles table cells
function move(dir) {
	var locString=aRow+","+aCol;
	//disallow back to origin move (clear all);
	if(aRow==curRow.rowIndex && aCol==curCell.cellIndex) {
		//origin
		clearBackTrack();
	} else {
		var index=routeLocations.indexOf(locString);
		if(index==-1) {
			routeLocations.push(aRow+","+aCol);
			route.push(dir);
			routeCells.push(grid[aRow][aCol]);
			grid[aRow][aCol].style.backgroundColor="lightblue";
		} else {
			routeLocations=routeLocations.slice(0,index+1);
			route=route.slice(0,index+1);
			for(var i=index+1,l=routeCells.length;i<l;i++) {
				routeCells[i].style.backgroundColor="";
			}
			routeCells=routeCells.slice(0,index+1);
			//unblue cells
		}
		movePawn(grid[aRow][aCol]);
	}
	populateBackTrack();
}

//populates the queue for display
function populateBackTrack() {
	backtrackDirs.firstChild.nodeValue = route.join(", ");
	backtrackCount.firstChild.nodeValue=route.length;
}

//clears the current queue, removes route styling.
function clearBackTrack() {
	aRow=curRow.rowIndex;
	aCol=curCell.cellIndex;
	for(var i=0,l=routeCells.length;i<l;i++) {
		routeCells[i].style.backgroundColor="";
	}
	routeLocations=new Array();
	route=new Array();
	routeCells=new Array();
	backtrackDirs.firstChild.nodeValue = "";
	if(ghostPawn.parentNode)ghostPawn.parentNode.removeChild(ghostPawn);
}

function movePawn(cell) {
	cell.insertBefore(ghostPawn,cell.firstChild);	
}

//enable/disable backtrack queue
function toggleBacktrack(e) {
	if(routeActive) {
		routeActive=false;
		clearBackTrack();
		populateBackTrack();
		backtrackLink.removeAttribute('class');
		backtrackDirections.style.display="none";	
	} else {
		routeActive = true;
		addEventListener(document,'keyup',handleKey,false);
		addEventListener(document,'keydown',preventScroll,false);
		backtrackDirections.style.display="block";
		backtrackLink.className = "expanded";
	}
}

//reads the maze table to an array. Probably completely unnecessary.
function readTable(table) {
	var rows=table.getElementsByTagName('tr');
	for(var i=0,l=rows.length;i<l;i++) {
		grid[i]=new Array();
		var row = rows[i];
		var cells = snap('./td',row);
		for(var j=0,k=cells.length;j<k;j++) {
			var cell=cells[j];
			grid[i].push(cell);
		}
	}
}


/* Utility functions */
function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}
function removeChildNodes(parent){
  while(parent.hasChildNodes()){
  	parent.removeChild(parent.lastChild)
	}
}
function find(xp,location) {
	if(!location)location = document;
	var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return temp.singleNodeValue;
}
function snap(xp,location) {
	if(!location)location=document;
	var result = document.evaluate(xp, location, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	v=new Array();
	for ( var i=0 ; i < result.snapshotLength; i++ )
	{
		v.push(result.snapshotItem(i));
	}
	return v;
}
function addEventListener(target, event, listener, capture) {
	openEventListeners.push( [target, event, listener, capture] );
	target.addEventListener(event, listener, capture);
}
function destroyEventListeners(event) {
	for (var i = 0, l=openEventListeners.length; i<l; i++)     {
		var rel = openEventListeners[i];
		rel[0].removeEventListener(rel[1], rel[2], rel[3]);
	}
	window.removeEventListener('unload', destroyEventListeners, false);
}
