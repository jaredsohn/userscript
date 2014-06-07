// Ultibot's Strange Cube Solving Helper
// Copyright (c) 2011, Ultimater at gmail dot com 
// You can reach me at the above email address if you have inquiries regarding this script
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
// http://www.gnu.org/licenses/gpl.html

// ==UserScript==
// @name	Ultibot's Strange Cube Solving Helper
// @description	"Strange Cube" puzzle solving helper for KoL
// @include	http://*.kingdomofloathing.com/generate15.php*
// @include	http://kingdomofloathing.com/generate15.php*
// @include	http://127.0.0.1:*/generate15.php*
// @namespace	http://ultimater.net/kol/public/namespaces/strangecubesolvinghelper
// @license	GNU-GPL http://www.gnu.org/licenses/gpl.html
// @version	2.1
// ==/UserScript==

//=================== Change Log ===================
/* v1.0 - 02/28/2011 - Initial Release */
/* v2.0 - 04/07/2011 - Added an auto-solver to the cube and re-did the user interface*/
/* v2.1 - 04/10/2011 - Fixed the puzzle solving algorithm so it doesn't fail on 2.5% of the puzzles it is given */


//==================== Globals =====================
scriptInfo={
	version:"2.1",
	id:98036,
	name:"Strange Cube Solving Helper"
};

scriptOptions={
	debugMode:true,
	disableAlertMessages:false
};

scriptGlobals={
	version:scriptInfo.version,
	name:scriptInfo.name,
	installLink:"http://userscripts.org/scripts/source/"+scriptInfo.id+".user.js",
	downloadPage:"http://userscripts.org/scripts/show/"+scriptInfo.id,
	scriptMetaLink:"http://userscripts.org/scripts/source/"+scriptInfo.id+".meta.js",
	updateCheckInterval:1000*60*60*6,			//six hours
	updateFailedRecheckInterval:1000*60*5,		//5 minutes
	updateFailsAllowedBeforeAborting:10,			//10 retrys allowed before switching to abort mode
	updateCheckIntervalForAbortMode:1000*60*60*24,	//twenty-four hours
	toggleHelpInnerHTML:{show:'show hint',hide:'hide hint'},
	forceUpdate:false,
	ERRORS:{	
		UPDATE_CHECKER:
			{
			FILE_NOT_FOUND : "Error: The autoupdate functionality of this script failed to load the download link to get the version number of the latest available script. Perhaps the server there was caught during down-time. If this error persists, please check for script updates manually.",
			VERSION_DETECTION_FAILURE : "Error: The autoupdate functionality of this script failed to find the version number of the latest script available on the download site and thus failed to decide if your current script version is up-to-date or not. If this error persists, please check for script updates manually."
			}
		},
	ALERTS:{
		INVALID_PUZZLE_PIECE_INSTRUCTION : "%s was not recognized as a piece connector instruction.",
		INVALID_PUZZLE_INPUT_SYNTAX : "Invalid 4x4 puzzle input syntax"
	},
	IMGS:{
		GM_ICON:"data:image/gif;base64,R0lGODlhDwAQAMZiAAAdAAAmAEAgAEQiAEckAEkkAE8oABA8EFMqAFsuAF8qHlwuAGUqH18wAGMyAGc0AGg0AGs2AHM6AHQ6AGU+E3g8AIQ4Kn0/AH4/AIk4Kn9AAHpCCGNFL2dFL3tDCZg5Ko9TEUBvQJNoMp9mI5NtO51tMqdwK5B7UqZ3O5J8VK95NKx/Q7eDPrGGS5+Ua5+VaZ+VcJ+XcceXUMeXUZ+iYp+iZZ+oYZ+pZs+hW9eqYNeqYdK1gdO2gt+3deC/fuDAgPfQg/fQhPfRhffRhv/ajP/ajf/ajv/bj//bkP/bkf/bkv/ck//clP/dlv/dl//dmP/emf/emv/fnP/fnf/fnv/fn//goP/hov/ho//hpf/ipv/iqP/krf/krv/lrv/lsf/nuP/ouv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAPABAAAAe9gH+Cg4QLA4SIGhoRBAKIg4oaCQICBhMFiRogDw0OEhIIhBcYJkBGOBo4RkAmGBd/HiUaQEhNUT1RTkpBGiUeIi0jR042NVk3NFBJIy0iJCgsTFIhB13UVU0sKyQUKDJNVgEAYOJXUDMrFH8bQuAvMGExLlhQQxuCIEUnO1pcX15beKQwokHQLB8cFFj4kIFBhx9ACv7RoIKIkidSqEyBwqSICokTR+Q4soTJEiQ6RoAUBKFCJEUVIDyaiSgQADs="
	}
	
};

//================ Reusable Functions =================
Array.prototype.clone=function(){return this.slice(0);}
Array.prototype.toTable=function(){var t=document.createElement('table');var rows=[t.insertRow(0),t.insertRow(1),t.insertRow(2),t.insertRow(3)];for(var i=0;i<4;i++)for(var j=0;j<4;j++){t.rows[i].insertCell(j);if(this[i*4+j]!=null)t.rows[i].cells[j].appendChild(document.createTextNode(this[i*4+j]));else t.rows[i].cells[j].appendChild(document.createTextNode("\xa0")).parentNode.className='blank';};return t;}
String.prototype.format=function(){var ar=Array.apply(null,arguments);return this.replace(/\%s/g,function(a,b){return ar.shift()||"";});};
String.prototype.repeat=function(n){return new Array(n+1).join(this);};


function alertUser(){
	if(scriptOptions['disableAlertMessages'])return;
	var l=arguments.length;
	var ar=Array.apply(null,arguments);
	var msg=ar.shift()||"";
	msg=msg.format.apply(msg,ar);
	alert(msg);

}



//=============== snakeObject Constructor ===============
function snakeObject(){
	this.mappedPieces=[['','','',''],['','','',''],['','','',''],['','','','']];
	this.lastPiece=[-1,0];
	this.pieceCounter=0;
}

snakeObject.prototype.addPoint=function(piece){
var p=piece.split("");
if(p[0]=='h'){return this.addPiece(0,0);}
if(p[0]=='l'){return this.addPiece(this.lastPiece[0],this.lastPiece[1]+1);}
if(p[0]=='r'){return this.addPiece(this.lastPiece[0],this.lastPiece[1]-1);}
if(p[0]=='t'){return this.addPiece(this.lastPiece[0]+1,this.lastPiece[1]);}
if(p[0]=='b'){return this.addPiece(this.lastPiece[0]-1,this.lastPiece[1]);}
alertUser(scriptGlobals['ALERTS'].INVALID_PUZZLE_PIECE_INSTRUCTION,piece);
};

snakeObject.prototype.addPiece=function(a,b){
this.mappedPieces[a][b]= ++this.pieceCounter;
this.lastPiece=[a,b];
};

snakeObject.prototype.addPoints=function(){
for(var i=0,l=arguments.length;i<l;i++)this.addPoint(arguments[i]);
}

snakeObject.prototype.toString=function(){
return this.mappedPieces.toString();
};

snakeObject.prototype.getPosition=function(){
	var m=this.mappedPieces;
	var outArray=new Array();
	for(var i=0;i<4;i++)for(var j=0;j<4;j++){
		outArray.push(m[i][j]==''?null:m[i][j]);
	}
	return outArray;
};

snakeObject.prototype.getTable=function(){
var t=document.createElement('table');
var rows=[t.insertRow(0),t.insertRow(1),t.insertRow(2),t.insertRow(3)];
for(var i=0;i<4;i++)for(var j=0;j<4;j++){
t.rows[i].insertCell(j);
t.rows[i].cells[j].appendChild(document.createTextNode(this.mappedPieces[i][j]));
}
return t;
};

snakeObject.prototype.getTableWithImages=function(srcMap){
var t=document.createElement('table');
var rows=[t.insertRow(0),t.insertRow(1),t.insertRow(2),t.insertRow(3)];
for(var i=0;i<4;i++)for(var j=0;j<4;j++){
t.rows[i].insertCell(j);
rows[i].cells[j].style.border="1px solid black";
if(this.mappedPieces[i][j]==''){//no image
rows[i].cells[j].innerHTML='&nbsp;';
}else{
var d=document.createElement('div');
d.appendChild(srcMap[this.mappedPieces[i][j]]);
t.rows[i].cells[j].innerHTML=d.innerHTML;
}
//t.rows[i].cells[j].appendChild(document.createTextNode(this.mappedPieces[i][j]));
}
//alertUser('returning');
return t;
};

snakeObject.prototype.solve=function(str){
str=str.split(',').sort(function(a,b){return parseFloat(a)-parseFloat(b)}).join('-').replace(/\d/g,'');
if(!str.match(/hr-[l][rb](-[tlrb][tlrb]){12}-[tlrb]e/)){return alertUser(scriptGlobals['ALERTS'].INVALID_PUZZLE_INPUT_SYNTAX);}
this.addPoints.apply(this,str.split('-'));
}


//================= ERROR HANDLING =================
function errorHandler(errorText){
	switch(errorText)
	{
		case scriptGlobals['ERRORS'].UPDATE_CHECKER.FILE_NOT_FOUND:
		case scriptGlobals['ERRORS'].UPDATE_CHECKER.VERSION_DETECTION_FAILURE:
			GM_setValue('updateFailedCounter', GM_getValue('updateFailedCounter', 0)+1);
			if(GM_getValue('updateFailedCounter', 0)>scriptGlobals['updateFailsAllowedBeforeAborting']){
				GM_setValue('nextCheckScheduled', new Date().getTime()+scriptGlobals['updateCheckIntervalForAbortMode']+"");
			}else{
				GM_setValue('nextCheckScheduled', new Date().getTime()+scriptGlobals['updateFailedRecheckInterval']+"");
			}
		  break;
	}
	GM_log("Ultibot's Strange Cube Solving Helper GreaseMonkey script returned the following error:");
	GM_log(errorText);
}//function

//================ Script Version Checker ================
function scriptVersionChecker(){
if(!scriptGlobals['forceUpdate']){
if(Number(scriptGlobals['version']) < GM_getValue('latestVersion',0) && GM_getValue('scriptIsOutOfDate', false))return;
//if its already been determined the user is using an old script version, why check if the latest version is even newer?
//also the scriptIsOutOfDate flag will be true even after the user updates so we need to check both flags
if(new Date().getTime() <= parseFloat(GM_getValue('nextCheckScheduled', 0)))return;
}
//Don't check for script updates every time the page loads, only check for updates after scheduled milestones elapse
GM_xmlhttpRequest({
	method:	'GET',
	url:	scriptGlobals['scriptMetaLink'],
	onload:	function(r)
		{
			if(r.status!=200){
				errorHandler(scriptGlobals['ERRORS'].UPDATE_CHECKER.FILE_NOT_FOUND);
				return;
			}
		var regexp=/version\s*([^\r\n]+)/i;
		var m=r.responseText.match(regexp);
			if(!m){
				errorHandler(scriptGlobals['ERRORS'].UPDATE_CHECKER.VERSION_DETECTION_FAILURE);
				return;
			}
		var latestVersion=m[1];
		GM_setValue('updateFailedCounter', 0);
		GM_setValue('latestVersion', latestVersion);
		GM_setValue('nextCheckScheduled', new Date().getTime()+scriptGlobals['updateCheckInterval']+"");
			if(scriptGlobals['version'] < GM_getValue('latestVersion')){
				GM_setValue('scriptIsOutOfDate', true);
			}else{
				GM_setValue('scriptIsOutOfDate', false);
			}
		}//callback
});//xhr
}//function


//=================== Help ===================
function showHelpAlert(){
var helpText="Ultibot's Strange Cube Helper version "+scriptGlobals['version']+"\n\n";
helpText+="PAY ATTENTION OR YOU MAY END-UP WASTING EXTRA MEAT ON ADDITIONAL STRANGE CUBES\n";
helpText+="Basically there are two possible rewards for solving the puzzle:\n\n";
helpText+="If you solve the 15-puzzle the normal way, your strange cube will be consumed and you'll earn a Dense Meat Stack. ";
helpText+="This reward isn't a reward at all if you think about it. ";
helpText+="You could have auto-sold your initial 100 twinkly wads for 9,000 meat. ";
helpText+="\n\n";
helpText+="Then there is the secret way to solve the puzzle. ";
helpText+="Your strange cube will also be consumed but you'll learn a demon name. ";
helpText+="In order to solve the puzzle the secret way, you cannot move any pieces from the initial start position. ";
helpText+="Even if you move a piece then move it back, you will be unable to solve the puzzle the secret way for the demon name. ";
helpText+="If you fail to solve the puzzle correctly the secret way, you must solve the puzzle the regular way for the Dense Meat Stack. ";
helpText+="Then after you've used another strange cube, you will have another shot at the demon name. ";
helpText+="To solve the puzzle the secret way, first toggle the \"show hint\" link so you see the puzzle's goal. ";
helpText+="Then basically all you do is move the spacer \"through\" the snake's body from head to tail. ";
helpText+="Once the spacer reaches the snake's tail, you'll earn your demon name and the strage cube will be consumed. ";
helpText+="If this is not the case, you did it wrong or your puzzle was not at its initial starting position before any pieces were moved. ";
helpText+="Again, even if you restored the puzzle to its initial starting position, the secret way to solve the puzzle will no longer work. ";
helpText+="You will have to solve the cube the normal way and have to use a second cube for another shot at the demon name. ";
helpText+="Ascending does NOT reset the puzzle.";
alert(helpText);
}

//=================== Run Script ===================
scriptVersionChecker();


var findings1=new Array();
var findings2=new Array();
var findings3=new Array();
var imgNames=new Array();
var d=document.getElementsByTagName('div');
var tableContainer=d[0];
var rows=new Array();
var divs=tableContainer.getElementsByTagName('div');
for(var i=0,l=divs.length;i<l;i++){if(divs[i].style.clear=='both')rows.push(divs[i]);}
for(var ii=0,rd,j,img;ii<rows.length;ii++){
rd=rows[ii].getElementsByTagName("div");
for(j=0;j<rd.length;j++){
img=rd[j].getElementsByTagName("img");
var aEls=rd[j].getElementsByTagName("a");
if(!img.length){findings2.push(null);findings3.push(null);continue;}
findings1.push(img[0].getAttribute('alt').split(' ')[1]);
findings2.push(img[0].getAttribute('alt').split(' ')[1].replace(/[^0-9]/g,'')-0);
findings3.push(aEls&&aEls.length?aEls[0].href:null);
imgNames[parseFloat(img[0].getAttribute('alt').split(' ')[1])]=img[0].cloneNode(false);
}//for
}//for

function scriptToRun(){
scriptRanAlready=true;
var x=new snakeObject();
x.solve(findings1.join(','));
var d=document.createElement('div');
d.id="toggleMe";
d.appendChild(x.getTableWithImages(imgNames));


d.innerHTML='<center><table  width=95%  cellspacing=0 cellpadding=0><tr><td style="color: white;" align=center bgcolor=blue><b>Your Goal:</b></td></tr><tr><td style="padding: 5px; border: 1px solid blue;"><center><table><tr><td>'
+d.innerHTML+'</td></tr></table></center></td></tr></table></center>';
document.body.appendChild(d);
}//function


if(GM_getValue('okToRunScript', true)){
scriptToRun();
}


if(GM_getValue('scriptIsOutOfDate', false)){
newDiv=document.createElement('div');
newDiv.innerHTML="<center><table  width=95%  cellspacing=0 cellpadding=0><tr>"+'<td style="color: white;" align=center bgcolor=blue>'+"<b><img src=\""+scriptGlobals['IMGS'].GM_ICON+"\" style=\"width:15px;height:16px;\" alt=\"GreaseMonkey\" />GreaseMonkey"+'</b></td></tr><tr><td style="padding: 5px; border: 1px solid blue;">'+"<center><table><tr><td><div>Your <strong>Strange Cube Solving Helper</strong> script is out of date. Please visit <a target=\"_new\" href=\""+scriptGlobals['downloadPage']+"\">the download page</a> and click \"install\" to update your script or <a target=\"_top\" href=\""+scriptGlobals['installLink']+"\">click here</a> to install it directly.</div></td></tr></table></center></td></tr></table></center>";
document.body.insertBefore(newDiv,document.body.firstChild);
}
var bElements=document.getElementsByTagName('b');
var el=null;
for(var i=0,l=bElements.length;i<l;i++){
if(bElements[i].innerHTML=='A Strange Box'){el=bElements[i];break;}
}

//add toggle help link
a=document.createElement('a');
a.innerHTML=GM_getValue('okToRunScript', true)?scriptGlobals['toggleHelpInnerHTML'].hide:scriptGlobals['toggleHelpInnerHTML'].show;
a.href='#';
a.addEventListener('click', function(){var e=document.getElementById('toggleMe');if(e)e.style.display=(a.innerHTML==scriptGlobals['toggleHelpInnerHTML'].show?'block':'none');if(a.innerHTML==scriptGlobals['toggleHelpInnerHTML'].show){if(typeof scriptRanAlready=='undefined')scriptToRun();GM_setValue('okToRunScript', true);}else{GM_setValue('okToRunScript', false);};a.innerHTML=a.innerHTML==scriptGlobals['toggleHelpInnerHTML'].show?scriptGlobals['toggleHelpInnerHTML'].hide:scriptGlobals['toggleHelpInnerHTML'].show;return false;}, true);

//if(el)el.parentNode.appendChild(document.createTextNode(' '));
//if(el)el.parentNode.appendChild(a);
//if(el)el.parentNode.appendChild(document.createTextNode(' '));
//if(el)el.parentNode.appendChild(a2);

newDivMainMenu=document.createElement('div');
moveExecuteTR="<tr><td colspan=\"3\" style=\"text-align:center;background-color:#eee;\"><span style=\"background-color:white;\"><input type=\"text\" size=\"40\" value=\"\" id=\"executeMoveList\" /><input id=\"executeMoveListButton\" type=\"button\" value=\"execute!\" /></span></td></tr>";
newDivMainMenu.innerHTML="<center><table  width=95%  cellspacing=0 cellpadding=0><tr>"+'<td style="color: white;" align=center bgcolor=blue>'+"<b><a href=\"/showplayer.php?who=1487928\" style=\"color:white;text-decoration:none;\">Ultibot</a>'s Strange Cube Helper"+'</b><span style=\"float:right;\" id=\"rightSide\"></span></td></tr><tr><td style="padding: 5px; border: 1px solid blue;">'+"<center><table><tr><td><table style=\"width:100%;\" border=\"1\"><tr><th>Solve for Dense Meat Stack</th><th>Puzzle Hint</th><th>Solve for Demon Name</th></tr><tr><td valign=\"top\" style=\"vertical-align:top;text-align:center;\"><div id=\"mainMenuContents\"></div><div id=\"msgs\"></div></td><td valign=\"top\" style=\"vertical-align:top;text-align:center;\"><div id=\"hintMenuContents\"></div></td><td valign=\"top\" style=\"vertical-align:top;text-align:center;\"><div id=\"rightMenuContents\"></div><div id=\"msgs2\"></div></td></tr>"+moveExecuteTR+"</table></td></tr></table></center></td></tr></table></center>";
document.body.insertBefore(newDivMainMenu,document.body.firstChild);
document.getElementById("executeMoveListButton").addEventListener('click',function(){var e=document.getElementById("executeMoveList");executeMovesInKoLNow(e.value);return false},true);

rs=document.getElementById("rightSide");
helpAnchor=document.createElement("a");
helpAnchor.href="#";
helpAnchor.innerHTML="help";
//helpAnchor.style.color='white';
//helpAnchor.style.textDecoration='none';
helpAnchor.addEventListener('click',function(){showHelpAlert();return false},true);
rs.appendChild(helpAnchor);

rmc=document.getElementById("rightMenuContents");
mmc=document.getElementById("mainMenuContents");
hmc=document.getElementById("hintMenuContents");

//add toggle solver link
//a2=document.createElement('a');
//a2.innerHTML='find solution';
//a2.href='#';
//a2.addEventListener('click', function(){findSolutionToThePuzzle();return false;}, true);
//mmc.appendChild(a2);

findSolutionButton=document.createElement("input");
findSolutionButton.type="button";
findSolutionButton.value="Find Solution";
findSolutionButton.addEventListener('click', function(){findSolutionToThePuzzle();}, true);
mmc.appendChild(findSolutionButton);

findSolutionButtonForDemonName=document.createElement("input");
findSolutionButtonForDemonName.type="button";
findSolutionButtonForDemonName.value="Find Solution";
findSolutionButtonForDemonName.addEventListener('click', function(){findSolutionToTheDemonName();}, true);
rmc.appendChild(findSolutionButtonForDemonName);

hmc.appendChild(a);
//mmc.appendChild(document.createTextNode(' '));
//mmc.appendChild(document.createElement("br"));
document.body.insertBefore(document.createElement("br"),newDivMainMenu.nextSibling);

//=================== AStar Path Finder Snippet ===================
//The following script snippet is an A* implementation which grants a basic pathfinding functionality.
//I found it at from http://devpro.it/examples/astar/index2.html
//An example of the path finding functionality can be found at: http://webreflection.blogspot.com/2006/10/javascript-path-finder-with-star.html
//The following script snippet was written by Andrea Giammarchi (see above two links)
//who gives special thanks to Alessandro Crugnola [www.sephiroth.it]
//This is the source code of http://devpro.it/examples/astar/AStar_memtronic.js
//And was last modified on Wed, 21 Oct 2009 17:58:02 GMT by its author
//
//  This code snippet is being re-distributed under the GNU General Public License.
//  Permission was given to me by Andrea Giammarchi, via email, on April 7th 2011 to re-distribute his code under the GNU-GPL license.
//   -- Ultimater at gmail dot com 
//=================== begin AStar_memtronic.js ===================
// (C) Andrea Giammarchi
//	Special thanks to Alessandro Crugnola [www.sephiroth.it]
function AStar(Grid,Start,Goal,Find){
function AStar(){
switch(Find){case "Diagonal":case "Euclidean":Find=DiagonalSuccessors;break;case "DiagonalFree":case "EuclideanFree":Find=DiagonalSuccessors$;break;default:Find=function(){};break;};};
function $Grid(x,y){return Grid[y][x]===0;};
function Node(Parent,Point){return{Parent:Parent,value:Point.x+(Point.y*cols),x:Point.x,y:Point.y,f:0,g:0};};
function Path(){var $Start=Node(null,{x:Start[0],y:Start[1]}),$Goal=Node(null,{x:Goal[0],y:Goal[1]}),AStar=new Array(limit),Open=[$Start],Closed=[],result=[],$Successors,$Node,$Path,length,max,min,i,j;while(length=Open.length){max=limit;min=-1;for(i=0;i<length;i++){if(Open[i].f<max){max=Open[i].f;min=i;}};$Node=Open.splice(min,1)[0];if($Node.value===$Goal.value){$Path=Closed[Closed.push($Node)-1];do{result.push([$Path.x,$Path.y]);}while($Path=$Path.Parent);AStar=Closed=Open=[];result.reverse();}else{$Successors=Successors($Node.x,$Node.y);for(i=0,j=$Successors.length;i<j;i++){$Path=Node($Node,$Successors[i]);if(!AStar[$Path.value]){$Path.g=$Node.g+Distance($Successors[i],$Node);$Path.f=$Path.g+Distance($Successors[i],$Goal);Open.push($Path);AStar[$Path.value]=true;};};Closed.push($Node);};};return result;};function Successors(x,y){var N=y-1,S=y+1,E=x+1,W=x-1,$N=N>-1&&$Grid(x,N),$S=S<rows&&$Grid(x,S),$E=E<cols&&$Grid(E,y),$W=W>-1&&$Grid(W,y),result=[];if($N)result.push({x:x,y:N});if($E)result.push({x:E,y:y});if($S)result.push({x:x,y:S});if($W)result.push({x:W,y:y});Find($N,$S,$E,$W,N,S,E,W,result);return result;};
function DiagonalSuccessors($N,$S,$E,$W,N,S,E,W,result){if($N){if($E&&$Grid(E,N))result.push({x:E,y:N});if($W&&$Grid(W,N))result.push({x:W,y:N});};if($S){if($E&&$Grid(E,S))result.push({x:E,y:S});if($W&&$Grid(W,S))result.push({x:W,y:S});};};
function DiagonalSuccessors$($N,$S,$E,$W,N,S,E,W,result){$N=N>-1;$S=S<rows;$E=E<cols;$W=W>-1;if($E){if($N&&$Grid(E,N))result.push({x:E,y:N});if($S&&$Grid(E,S))result.push({x:E,y:S});};if($W){if($N&&$Grid(W,N))result.push({x:W,y:N});if($S&&$Grid(W,S))result.push({x:W,y:S});};};
function Diagonal(Point,Goal){return max(abs(Point.x-Goal.x),abs(Point.y-Goal.y));};
function Euclidean(Point,Goal){return sqrt(pow(Point.x-Goal.x,2)+pow(Point.y-Goal.y,2));};
function Manhattan(Point,Goal){return abs(Point.x-Goal.x)+abs(Point.y-Goal.y);};
var abs=Math.abs,max=Math.max,pow=Math.pow,sqrt=Math.sqrt,cols=Grid[0].length,rows=Grid.length,limit=cols*rows,Distance={Diagonal:Diagonal,DiagonalFree:Diagonal,Euclidean:Euclidean,EuclideanFree:Euclidean,Manhattan:Manhattan}[Find]||Manhattan;
return Path(AStar());
};
//=================== end AStar_memtronic.js ===================


//=============== Puzzle15Solver Constructor ===============
function Puzzle15Solver(){
this.puzzle=new Array(16);
this.goal=new Array(16);
this.moveList=new Array();
}
Puzzle15Solver.prototype.setPuzzle=function(ar){this.puzzle=ar;}
Puzzle15Solver.prototype.setGoal=function(ar){this.goal=ar;}
Puzzle15Solver.prototype.getPieceIndex=function(p){for(var i=0,l=this.puzzle.length;i<l;i++){if(this.puzzle[i]==p)return i;}}
Puzzle15Solver.prototype.getGoalIndex=function(p){for(var i=0,l=this.puzzle.length;i<l;i++){if(this.goal[i]==p)return i;}}
Puzzle15Solver.prototype.clearMoveList=function(){this.moveList=new Array();}
Puzzle15Solver.prototype.getPuzzle=function(){return this.puzzle;}
Puzzle15Solver.prototype.getGoal=function(){return this.goal;}
Puzzle15Solver.prototype.getDifference=function(){var p=this.puzzle;var np={};var g=this.goal;var ng={};var d=[];for(var i=0,l=p.length;i<l;i++){np[p[i]]=i;};for(var i=0,l=g.length;i<l;i++){ng[g[i]]=i;};for(var i=0,l=p.length;i<l;i++){v={};v.current_position=i;v.current_number=p[v.current_position];v.goal_position=ng[v.current_number];v.goal_number=g[v.goal_position];d[d.length]=v.goal_position-v.current_position;};return d;}
Puzzle15Solver.prototype.insertPuzzle=function(id){var e=typeof id=="string"?document.getElementById(id):id;if(!e)return;while(e.firstChild)e.removeChild(e.firstChild);var t_p=this.getPuzzle().toTable();var els=t_p.getElementsByTagName("td");var th=this;for(var i=0,l=els.length;i<l;i++){(function(i){els[i].onclick=function(){th.callback(i)};})(i);}e.appendChild(t_p);}
Puzzle15Solver.prototype.insertGoal=function(id){var e=typeof id=="string"?document.getElementById(id):id;if(!e)return;while(e.firstChild)e.removeChild(e.firstChild);e.appendChild(this.getGoal().toTable());}
Puzzle15Solver.prototype.getTLCornerDist=function(p){var topMoves=Math.floor(p/4);var leftMoves=p%4;return {'t':topMoves,'l':leftMoves};}
Puzzle15Solver.prototype.moveSpace=function(str){if(str=='u'){var spc=this.getPieceIndex(null);if(spc<4)return false;this.puzzle[spc]=this.puzzle[spc-4];this.puzzle[spc-4]=null;this.moveList.push('u');return true;}else if(str=='d'){var spc=this.getPieceIndex(null);if(spc>=12)return false;this.puzzle[spc]=this.puzzle[spc+4];this.puzzle[spc+4]=null;this.moveList.push('d');return true;}else if(str=='l'){var spc=this.getPieceIndex(null);if(spc%4==0)return false;this.puzzle[spc]=this.puzzle[spc-1];this.puzzle[spc-1]=null;this.moveList.push('l');return true;}else if(str=='r'){var spc=this.getPieceIndex(null);if(spc%4==3)return false;this.puzzle[spc]=this.puzzle[spc+1];this.puzzle[spc+1]=null;this.moveList.push('r');return true;}return false;}
Puzzle15Solver.prototype.executeMoves=function(str){var success=true;var ar=str.split('');for(var i=0,l=ar.length;i<l;i++){success = this.moveSpace(ar[i]) && success;}if(l==0)return false;return success;}
Puzzle15Solver.prototype.show=function(){this.insertPuzzle("puzzle");}
Puzzle15Solver.prototype.callback=function(i){var x=this;var spc=x.getPieceIndex(null);if(spc+4==i){x.moveSpace('d');x.show();}if(spc-4==i){x.moveSpace('u');x.show();}if(spc%4==i%4+1){x.moveSpace('l');x.show();}if(spc%4==i%4-1){x.moveSpace('r');x.show();}}
Puzzle15Solver.prototype.getPiecePositionInfo=function(i){
	var x=this;
	var piece=this.goal[i];
	var p=x.getPieceIndex(piece);
	var pD=x.getTLCornerDist(p);
	var s=x.getPieceIndex(null);
	var sD=x.getTLCornerDist(s);
	var gD=x.getTLCornerDist(i);
	return {piece:{index:p,top:pD.t,left:pD.l},space:{index:s,top:sD.t,left:sD.l},goal:{index:i,top:gD.t,left:gD.l},diff:{top:pD.t-gD.t,left:pD.l-gD.l}};
}
Puzzle15Solver.prototype.findPath=function(startIndex,endIndex,forbiddenSpaceIndexes){
	var grid=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(var i=0,l=forbiddenSpaceIndexes.length;i<l;i++){
		var x=Math.floor(forbiddenSpaceIndexes[i]/4);
		var y=forbiddenSpaceIndexes[i]%4;
		grid[x][y]=1;
	}
	if(arguments[3]){
	grid[Math.floor(startIndex/4)][startIndex%4]=0;//don't forbid our start block
	grid[Math.floor(endIndex/4)][endIndex%4]=0;//don't forbid our end block
	}
	var startPoint={t:Math.floor(startIndex/4),l:startIndex%4};
	var endPoint={t:Math.floor(endIndex/4),l:endIndex%4};
	var result=AStar(grid,[startPoint.l,startPoint.t],[endPoint.l,endPoint.t],'Manhattan');
	if(!result){return false;}
	var moves="";
	for(var i=0,l=result.length-1;i<l;i++){
		if(result[i][1]>result[i+1][1]){moves+="u";}
		if(result[i][1]<result[i+1][1]){moves+="d";}
		if(result[i][0]>result[i+1][0]){moves+="l";}
		if(result[i][0]<result[i+1][0]){moves+="r";}
	}
	return moves;
}

Puzzle15Solver.prototype.movePieceOnLegalPath=function(pieceIndex,movesToExecute,forbiddenSpaces){
	for(var i=0,l=movesToExecute.length;i<l;i++){
	switch(movesToExecute[i])
	{
	case 'u':
		var info=this.getPiecePositionInfo(pieceIndex);
		var avoidSpaces=forbiddenSpaces.slice(0);avoidSpaces.push(info.piece.index);
		var moves=this.findPath(info.space.index,info.piece.index-4,avoidSpaces)||"";
		this.executeMoves(moves+"d");
	break;
	case 'd':
		var info=this.getPiecePositionInfo(pieceIndex);
		var avoidSpaces=forbiddenSpaces.slice(0);avoidSpaces.push(info.piece.index);
		var moves=this.findPath(info.space.index,info.piece.index+4,avoidSpaces)||"";
		this.executeMoves(moves+"u");
	break;
	case 'r':
		var info=this.getPiecePositionInfo(pieceIndex);
		var avoidSpaces=forbiddenSpaces.slice(0);avoidSpaces.push(info.piece.index);
		var moves=this.findPath(info.space.index,info.piece.index+1,avoidSpaces)||"";
		this.executeMoves(moves+"l");
	break;
	case 'l':
		var info=this.getPiecePositionInfo(pieceIndex);
		var avoidSpaces=forbiddenSpaces.slice(0);avoidSpaces.push(info.piece.index);
		var moves=this.findPath(info.space.index,info.piece.index-1,avoidSpaces)||"";
		this.executeMoves(moves+"r");
	break;
	}//switch
	}//for
}


Puzzle15Solver.prototype.studyPiecePositionMoves=function(n,offSet){
	var info=this.getPiecePositionInfo(n);
	var moves="";
	var t=info.diff.top-offSet.t;
	var l=info.diff.left-offSet.l;
	if(t>0){moves+="u".repeat(t);}else if(t<0){moves+="d".repeat(t*-1);}
	if(l>0){moves+="l".repeat(l);}else if(l<0){moves+="r".repeat(l*-1);}
	return moves;
}

Puzzle15Solver.prototype.findSpacerPath=function(targetIndex,avoidIndexes){
	var moves=this.findPath(this.getPieceIndex(null),targetIndex,avoidIndexes)||"";
	return moves;
}

Puzzle15Solver.prototype.movePieceToIndex=function(pieceIndex,targetIndex,avoidIndexes){
	var moves=this.findPath(this.getPieceIndex(this.goal[pieceIndex]),targetIndex,avoidIndexes)||"";
	this.movePieceOnLegalPath(pieceIndex,moves,avoidIndexes);
}

Puzzle15Solver.prototype.solveFirstRow=function(){
	this.movePieceToIndex(0,0,[]);
	this.movePieceToIndex(1,1,[0]);
	this.movePieceToIndex(2,10,[0,1]);//make sure we don't trap this piece
	this.movePieceToIndex(3,2,[0,1]);//one left of its goal
	this.movePieceToIndex(2,6,[0,1,3]);//one lower than its goal
	this.movePieceToIndex(3,3,[0,1,6]);
	this.movePieceToIndex(2,2,[0,1,4]);
}

Puzzle15Solver.prototype.solveSecondRow=function(){
	this.movePieceToIndex(4,4,[0,1,2,3]);
	this.movePieceToIndex(5,5,[0,1,2,3,4]);
	this.movePieceToIndex(6,14,[0,1,2,3,4,5]);//make sure we don't trap this piece
	this.movePieceToIndex(7,6,[0,1,2,3,4,5]);//one left of its goal
	this.movePieceToIndex(6,10,[0,1,2,3,4,5]);//one lower than its goal
	this.movePieceToIndex(7,7,[0,1,2,3,4,5,10]);
	this.movePieceToIndex(6,6,[0,1,2,3,4,5,7]);
}

Puzzle15Solver.prototype.solveLastRow=function(forbiddenSpaces){
	this.movePieceToIndex(12,12,forbiddenSpaces);
	this.movePieceToIndex(13,13,forbiddenSpaces.concat(12));
	this.movePieceToIndex(14,4,forbiddenSpaces.concat(12,13));//make sure we don't trap this piece
	this.movePieceToIndex(15,14,forbiddenSpaces.concat(12,13));//one left of its goal
	this.movePieceToIndex(14,10,forbiddenSpaces.concat(12,13));//one higher than its goal
	this.movePieceToIndex(15,15,forbiddenSpaces.concat(12,13,10));
	this.movePieceToIndex(14,14,forbiddenSpaces.concat(12,13,15));
}

Puzzle15Solver.prototype.solve2ndToLastRow=function(forbiddenSpaces){
	this.movePieceToIndex(8,8,forbiddenSpaces);
	this.movePieceToIndex(9,9,forbiddenSpaces.concat(8));
	this.movePieceToIndex(10,0,forbiddenSpaces.concat(8,9));//make sure we don't trap this piece
	this.movePieceToIndex(11,10,forbiddenSpaces.concat(8,9));//one left of its goal
	this.movePieceToIndex(10,6,forbiddenSpaces.concat(8,9));//one higher than its goal
	this.movePieceToIndex(11,11,forbiddenSpaces.concat(8,9,6));
	this.movePieceToIndex(10,10,forbiddenSpaces.concat(8,9,11));
}

Puzzle15Solver.prototype.solve15=function(){
	this.solveFirstRow();
	this.solveSecondRow();

	//left pieces on 3rd and 4th row
	this.movePieceToIndex(8,15,[0,1,2,3,4,5,6,7]);//make sure we don't trap this piece
	this.movePieceToIndex(12,12-4,[0,1,2,3,4,5,6,7]);//one up from its goal
	this.movePieceToIndex(8,8+1,[0,1,2,3,4,5,6,7,12-4]);//one right of its goal
	this.movePieceToIndex(12,12,[0,1,2,3,4,5,6,7,9]);
	this.movePieceToIndex(8,8,[0,1,2,3,4,5,6,7,12]);
	
	//next two left pieces on 3rd and 4th row
	this.movePieceToIndex(9,15,[0,1,2,3,4,5,6,7,8,12]);//get piece index 9 out of the way
	this.movePieceToIndex(13,9,[0,1,2,3,4,5,6,7,8,12]);//one up from its goal
	this.movePieceToIndex(9,10,[0,1,2,3,4,5,6,7,8,12,9]);//one right of its goal
	this.movePieceToIndex(13,13,[0,1,2,3,4,5,6,7,8,12,10]);
	this.movePieceToIndex(9,9,[0,1,2,3,4,5,6,7,8,12,13]);

	//last 3 pieces
	this.movePieceToIndex(10,10,[0,1,2,3,4,5,6,7,8,9,12,13]);
	this.movePieceToIndex(11,11,[0,1,2,3,4,5,6,7,8,9,10,12,13]);
	this.movePieceToIndex(14,14,[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);//piece 14
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve14=function(){
	this.solveFirstRow();
	this.solveSecondRow();

	//left pieces on 3rd and 4th row
	this.movePieceToIndex(8,15,[0,1,2,3,4,5,6,7]);//make sure we don't trap this piece
	this.movePieceToIndex(12,12-4,[0,1,2,3,4,5,6,7]);//one up from its goal
	this.movePieceToIndex(8,8+1,[0,1,2,3,4,5,6,7,12-4]);//one right of its goal
	this.movePieceToIndex(12,12,[0,1,2,3,4,5,6,7,9]);
	this.movePieceToIndex(8,8,[0,1,2,3,4,5,6,7,12]);
	
	//next two left pieces on 3rd and 4th row
	this.movePieceToIndex(9,15,[0,1,2,3,4,5,6,7,8,12]);//get piece index 9 out of the way
	this.movePieceToIndex(13,9,[0,1,2,3,4,5,6,7,8,12]);//one up from its goal
	this.movePieceToIndex(9,10,[0,1,2,3,4,5,6,7,8,12,9]);//one right of its goal
	this.movePieceToIndex(13,13,[0,1,2,3,4,5,6,7,8,12,10]);
	this.movePieceToIndex(9,9,[0,1,2,3,4,5,6,7,8,12,13]);

	//last 3 pieces
	this.movePieceToIndex(10,10,[0,1,2,3,4,5,6,7,8,9,12,13]);
	this.movePieceToIndex(11,11,[0,1,2,3,4,5,6,7,8,9,10,12,13]);
	this.movePieceToIndex(15,15,[0,1,2,3,4,5,6,7,8,9,10,11,12,13]);//piece 15
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}
Puzzle15Solver.prototype.solve13=function(){
	//piece 13 is the empty space
	this.solveFirstRow();
	this.solveSecondRow();
	var solvedPieces=[0,1,2,3,4,5,6,7];

	//left pieces on 3rd and 4th row
	this.movePieceToIndex(8,15,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(12,12-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(8,8+1,solvedPieces.concat(12-4));//one right of its goal
	this.movePieceToIndex(12,12,solvedPieces.concat(9));solvedPieces.push(12);
	this.movePieceToIndex(8,8,solvedPieces);solvedPieces.push(8);
	
	//two right pieces on 3rd and 4th row
	this.movePieceToIndex(11,9,solvedPieces);//get piece index 11 out of the way
	this.movePieceToIndex(15,13,solvedPieces);//put piece index 15 somewhere known not to get in the way either
	this.movePieceToIndex(15,11,solvedPieces);//one up from its goal
	this.movePieceToIndex(11,10,solvedPieces);//one left of its goal
	this.movePieceToIndex(15,15,solvedPieces.concat(10));solvedPieces.push(15);
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);

	//last 3 pieces
	//remember piece 13 is the empty space
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);
	this.movePieceToIndex(14,14,solvedPieces);solvedPieces.push(14);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve12=function(){
	//piece index 12 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveSecondRow();
	var solvedPieces=[0,1,2,3,4,5,6,7];

	//right pieces on 3rd and 4th row
	this.movePieceToIndex(11,12,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(15,15-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(11,11-1,solvedPieces.concat(15-4));//one left of its goal
	this.movePieceToIndex(15,15,solvedPieces.concat(11-1));solvedPieces.push(15);
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);
	
	//2nd-most right pieces on 3rd and 4th row
	this.movePieceToIndex(10,12,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(14,14-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(10,10-1,solvedPieces.concat(14-4));//one left of its goal
	this.movePieceToIndex(14,14,solvedPieces.concat(10-1));solvedPieces.push(14);
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);

	//last 3 pieces
	//remember piece index 12 is the empty space
	this.movePieceToIndex(8,8,solvedPieces);solvedPieces.push(8);
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);
	this.movePieceToIndex(13,13,solvedPieces);solvedPieces.push(13);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}
Puzzle15Solver.prototype.solve11=function(){
	//piece index 11 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveSecondRow();
	var solvedPieces=[0,1,2,3,4,5,6,7];

	//left pieces on 3rd and 4th row
	this.movePieceToIndex(8,15,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(12,12-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(8,8+1,solvedPieces.concat(12-4));//one right of its goal
	this.movePieceToIndex(12,12,solvedPieces.concat(8+1));solvedPieces.push(12);
	this.movePieceToIndex(8,8,solvedPieces);solvedPieces.push(8);
	
	//2nd-most left pieces on 3rd and 4th row
	this.movePieceToIndex(9,15,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(13,13-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(9,9+1,solvedPieces.concat(13-4));//one right of its goal
	this.movePieceToIndex(13,13,solvedPieces.concat(9+1));solvedPieces.push(13);
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);

	//last 3 pieces
	//remember piece index 11 is the empty space
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);
	this.movePieceToIndex(14,14,solvedPieces);solvedPieces.push(14);
	this.movePieceToIndex(15,15,solvedPieces);solvedPieces.push(15);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}
Puzzle15Solver.prototype.solve10=function(){
	//piece index 10 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveSecondRow();
	var solvedPieces=[0,1,2,3,4,5,6,7];

	//left pieces on 3rd and 4th row
	this.movePieceToIndex(8,15,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(12,12-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(8,8+1,solvedPieces.concat(12-4));//one right of its goal
	this.movePieceToIndex(12,12,solvedPieces.concat(8+1));solvedPieces.push(12);
	this.movePieceToIndex(8,8,solvedPieces);solvedPieces.push(8);
	
	//2nd-most left pieces on 3rd and 4th row
	this.movePieceToIndex(9,15,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(13,13-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(9,9+1,solvedPieces.concat(13-4));//one right of its goal
	this.movePieceToIndex(13,13,solvedPieces.concat(9+1));solvedPieces.push(13);
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);

	//last 3 pieces
	//remember piece index 10 is the empty space
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);
	this.movePieceToIndex(14,14,solvedPieces);solvedPieces.push(14);
	this.movePieceToIndex(15,15,solvedPieces);solvedPieces.push(15);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}
Puzzle15Solver.prototype.solve9=function(){
	//piece index 9 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveSecondRow();
	var solvedPieces=[0,1,2,3,4,5,6,7];

	//left pieces on 3rd and 4th row
	this.movePieceToIndex(8,15,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(12,12-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(8,8+1,solvedPieces.concat(12-4));//one right of its goal
	this.movePieceToIndex(12,12,solvedPieces.concat(8+1));solvedPieces.push(12);
	this.movePieceToIndex(8,8,solvedPieces);solvedPieces.push(8);
	
	//right pieces on 3rd and 4th row
	this.movePieceToIndex(11,9,solvedPieces);//get piece index 11 out of the way
	this.movePieceToIndex(15,13,solvedPieces);//put piece index 15 somewhere known not to get in the way either
	this.movePieceToIndex(15,11,solvedPieces);//one up from its goal
	this.movePieceToIndex(11,10,solvedPieces);//one left of its goal
	this.movePieceToIndex(15,15,solvedPieces.concat(10));solvedPieces.push(15);
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);

	//last 3 pieces
	//remember piece index 9 is the empty space
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);
	this.movePieceToIndex(13,13,solvedPieces);solvedPieces.push(13);
	this.movePieceToIndex(14,14,solvedPieces);solvedPieces.push(14);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}

}
Puzzle15Solver.prototype.solve8=function(){
	//piece index 8 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveSecondRow();
	var solvedPieces=[0,1,2,3,4,5,6,7];

	//right pieces on 3rd and 4th row
	this.movePieceToIndex(11,12,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(15,15-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(11,11-1,solvedPieces.concat(15-4));//one left of its goal
	this.movePieceToIndex(15,15,solvedPieces.concat(11-1));solvedPieces.push(15);
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);

	//2nd-most right pieces on 3rd and 4th row
	this.movePieceToIndex(10,12,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(14,14-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(10,10-1,solvedPieces.concat(14-4));//one left of its goal
	this.movePieceToIndex(14,14,solvedPieces.concat(10-1));solvedPieces.push(14);
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);

	//last 3 pieces
	//remember piece index 8 is the empty space
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);
	this.movePieceToIndex(12,12,solvedPieces);solvedPieces.push(12);
	this.movePieceToIndex(13,13,solvedPieces);solvedPieces.push(13);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve7=function(){
	//piece index 7 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveLastRow([0,1,2,3]);
	var solvedPieces=[0,1,2,3,12,13,14,15];

	//left pieces on 2nd and 3rd row
	this.movePieceToIndex(4,11,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(8,8-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(4,4+1,solvedPieces.concat(8-4));//one right of its goal
	this.movePieceToIndex(8,8,solvedPieces.concat(4+1));solvedPieces.push(8);
	this.movePieceToIndex(4,4,solvedPieces);solvedPieces.push(4);

	//2nd-most left pieces on 2nd and 3rd row
	this.movePieceToIndex(5,11,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(9,9-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(5,5+1,solvedPieces.concat(9-4));//one right of its goal
	this.movePieceToIndex(9,9,solvedPieces.concat(5+1));solvedPieces.push(9);
	this.movePieceToIndex(5,5,solvedPieces);solvedPieces.push(5);

	//last 3 pieces
	//remember piece index 7 is the empty space
	this.movePieceToIndex(6,6,solvedPieces);solvedPieces.push(6);
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}
Puzzle15Solver.prototype.solve6=function(){
	//piece index 6 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveLastRow([0,1,2,3]);
	var solvedPieces=[0,1,2,3,12,13,14,15];

	//left pieces on 2nd and 3rd row
	this.movePieceToIndex(4,11,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(8,8-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(4,4+1,solvedPieces.concat(8-4));//one right of its goal
	this.movePieceToIndex(8,8,solvedPieces.concat(4+1));solvedPieces.push(8);
	this.movePieceToIndex(4,4,solvedPieces);solvedPieces.push(4);
	
	//2nd-most left pieces on 2nd and 3rd row
	this.movePieceToIndex(5,11,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(9,9-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(5,5+1,solvedPieces.concat(9-4));//one right of its goal
	this.movePieceToIndex(9,9,solvedPieces.concat(5+1));solvedPieces.push(9);
	this.movePieceToIndex(5,5,solvedPieces);solvedPieces.push(5);

	//last 3 pieces
	//remember piece index 6 is the empty space
	this.movePieceToIndex(7,7,solvedPieces);solvedPieces.push(7);
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);
	this.movePieceToIndex(11,11,solvedPieces);solvedPieces.push(11);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve5=function(){
	//piece index 5 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveLastRow([0,1,2,3]);
	var solvedPieces=[0,1,2,3,12,13,14,15];

	//left pieces on 2nd and 3rd row
	this.movePieceToIndex(4,11,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(8,8-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(4,4+1,solvedPieces.concat(8-4));//one right of its goal
	this.movePieceToIndex(8,8,solvedPieces.concat(4+1));solvedPieces.push(8);
	this.movePieceToIndex(4,4,solvedPieces);solvedPieces.push(4);
	
	//right pieces on 2nd and 3rd row
	this.movePieceToIndex(7,5,solvedPieces);//get piece index 7 out of the way
	this.movePieceToIndex(11,9,solvedPieces);//put piece index 11 somewhere known not to get in the way either
	this.movePieceToIndex(11,7,solvedPieces);//one up from its goal
	this.movePieceToIndex(7,6,solvedPieces);//one left of its goal
	this.movePieceToIndex(11,11,solvedPieces.concat(6));solvedPieces.push(11);
	this.movePieceToIndex(7,7,solvedPieces);solvedPieces.push(7);

	//last 3 pieces
	//remember piece index 5 is the empty space
	this.movePieceToIndex(6,6,solvedPieces);solvedPieces.push(6);
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);
	this.movePieceToIndex(10,10,solvedPieces);solvedPieces.push(10);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve4=function(){
	//piece index 4 is the empty space (counting from 0)
	this.solveFirstRow();
	this.solveLastRow([0,1,2,3]);
	var solvedPieces=[0,1,2,3,12,13,14,15];
	//right pieces on 2nd and 3rd row
	this.movePieceToIndex(7,8,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(11,11-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(7,7-1,solvedPieces.concat(11-4));//one left of its goal
	this.movePieceToIndex(11,11,solvedPieces.concat(7-1));solvedPieces.push(11);
	this.movePieceToIndex(7,7,solvedPieces);solvedPieces.push(7);

	//2nd-most right pieces on 2nd and 3rd row
	this.movePieceToIndex(6,8,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(10,10-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(6,6-1,solvedPieces.concat(10-4));//one left of its goal
	this.movePieceToIndex(10,10,solvedPieces.concat(6-1));solvedPieces.push(10);
	this.movePieceToIndex(6,6,solvedPieces);solvedPieces.push(6);

	//last 3 pieces
	//remember piece index 4 is the empty space
	this.movePieceToIndex(5,5,solvedPieces);solvedPieces.push(5);
	this.movePieceToIndex(8,8,solvedPieces);solvedPieces.push(8);
	this.movePieceToIndex(9,9,solvedPieces);solvedPieces.push(9);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve3=function(){
	//piece index 3 is the empty space (counting from 0)
	this.solveLastRow([]);
	this.solve2ndToLastRow([12,13,14,15]);
	var solvedPieces=[8,9,10,11,12,13,14,15];

	//left pieces on 1st and 2nd row
	this.movePieceToIndex(0,7,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(4,4-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(0,0+1,solvedPieces.concat(4-4));//one right of its goal
	this.movePieceToIndex(4,4,solvedPieces.concat(0+1));solvedPieces.push(4);
	this.movePieceToIndex(0,0,solvedPieces);solvedPieces.push(0);

	//2nd-most left pieces on 1st and 2nd row
	this.movePieceToIndex(1,7,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(5,5-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(1,1+1,solvedPieces.concat(5-4));//one right of its goal
	this.movePieceToIndex(5,5,solvedPieces.concat(1+1));solvedPieces.push(5);
	this.movePieceToIndex(1,1,solvedPieces);solvedPieces.push(1);

	//last 3 pieces
	//remember piece index 3 is the empty space
	this.movePieceToIndex(2,2,solvedPieces);solvedPieces.push(2);
	this.movePieceToIndex(6,6,solvedPieces);solvedPieces.push(6);
	this.movePieceToIndex(7,7,solvedPieces);solvedPieces.push(7);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve2=function(){
	//piece index 2 is the empty space (counting from 0)
	this.solveLastRow([]);
	this.solve2ndToLastRow([12,13,14,15]);
	var solvedPieces=[8,9,10,11,12,13,14,15];

	//left pieces on 1st and 2nd row
	this.movePieceToIndex(0,7,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(4,4-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(0,0+1,solvedPieces.concat(4-4));//one right of its goal
	this.movePieceToIndex(4,4,solvedPieces.concat(0+1));solvedPieces.push(4);
	this.movePieceToIndex(0,0,solvedPieces);solvedPieces.push(0);

	//2nd-most left pieces on 1st and 2nd row
	this.movePieceToIndex(1,7,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(5,5-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(1,1+1,solvedPieces.concat(5-4));//one right of its goal
	this.movePieceToIndex(5,5,solvedPieces.concat(1+1));solvedPieces.push(5);
	this.movePieceToIndex(1,1,solvedPieces);solvedPieces.push(1);

	//last 3 pieces
	//remember piece index 2 is the empty space
	this.movePieceToIndex(3,3,solvedPieces);solvedPieces.push(3);
	this.movePieceToIndex(6,6,solvedPieces);solvedPieces.push(6);
	this.movePieceToIndex(7,7,solvedPieces);solvedPieces.push(7);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve1=function(){
	//piece index 1 is the empty space (counting from 0)
	this.solveLastRow([]);
	this.solve2ndToLastRow([12,13,14,15]);
	var solvedPieces=[8,9,10,11,12,13,14,15];

	//left pieces on 1st and 2nd row
	this.movePieceToIndex(0,7,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(4,4-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(0,0+1,solvedPieces.concat(4-4));//one right of its goal
	this.movePieceToIndex(4,4,solvedPieces.concat(0+1));solvedPieces.push(4);
	this.movePieceToIndex(0,0,solvedPieces);solvedPieces.push(0);

	//right pieces on 1st and 2nd row
	this.movePieceToIndex(3,1,solvedPieces);//get piece index 3 out of the way
	this.movePieceToIndex(7,5,solvedPieces);//put piece index 7 somewhere known not to get in the way either
	this.movePieceToIndex(7,3,solvedPieces);//one up from its goal
	this.movePieceToIndex(3,2,solvedPieces);//one left of its goal
	this.movePieceToIndex(7,7,solvedPieces.concat(2));solvedPieces.push(7);
	this.movePieceToIndex(3,3,solvedPieces);solvedPieces.push(3);

	//last 3 pieces
	//remember piece index 1 is the empty space
	this.movePieceToIndex(2,2,solvedPieces);solvedPieces.push(2);
	this.movePieceToIndex(5,5,solvedPieces);solvedPieces.push(5);
	this.movePieceToIndex(6,6,solvedPieces);solvedPieces.push(6);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.solve0=function(){
	//piece index 0 is the empty space (counting from 0)
	this.solveLastRow([]);
	this.solve2ndToLastRow([12,13,14,15]);
	var solvedPieces=[8,9,10,11,12,13,14,15];

	//right pieces on 1st and 2nd row
	this.movePieceToIndex(3,4,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(7,7-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(3,3-1,solvedPieces.concat(7-4));//one left of its goal
	this.movePieceToIndex(7,7,solvedPieces.concat(3-1));solvedPieces.push(7);
	this.movePieceToIndex(3,3,solvedPieces);solvedPieces.push(3);

	//2nd-most right pieces on 1st and 2nd row
	this.movePieceToIndex(2,4,solvedPieces);//make sure we don't trap this piece
	this.movePieceToIndex(6,6-4,solvedPieces);//one up from its goal
	this.movePieceToIndex(2,2-1,solvedPieces.concat(6-4));//one left of its goal
	this.movePieceToIndex(6,6,solvedPieces.concat(2-1));solvedPieces.push(6);
	this.movePieceToIndex(2,2,solvedPieces);solvedPieces.push(2);

	//last 3 pieces
	//remember piece index 0 is the empty space
	this.movePieceToIndex(1,1,solvedPieces);solvedPieces.push(1);
	this.movePieceToIndex(4,4,solvedPieces);solvedPieces.push(4);
	this.movePieceToIndex(5,5,solvedPieces);solvedPieces.push(5);
	if(this.puzzle.join(",")==this.goal.join(",")){return true;}else{return false;}
}

Puzzle15Solver.prototype.getSolution=function(){
	var g=this.goal.slice(0);
	var m=this.moveList.slice(0);
	var p=this.puzzle.slice(0);
	this.clearMoveList();
	var solved=this.puzzle.join(",")==this.goal.join(",")?true:false;
	if(!solved){
		var spc=this.getGoalIndex(null);
		if(spc==15){solved=this.solve15();}
		if(spc==14){solved=this.solve14();}
		if(spc==13){solved=this.solve13();}
		if(spc==12){solved=this.solve12();}
		if(spc==11){solved=this.solve11();}
		if(spc==10){solved=this.solve10();}
		if(spc==9){solved=this.solve9();}
		if(spc==8){solved=this.solve8();}
		if(spc==7){solved=this.solve7();}
		if(spc==6){solved=this.solve6();}
		if(spc==5){solved=this.solve5();}
		if(spc==4){solved=this.solve4();}
		if(spc==3){solved=this.solve3();}
		if(spc==2){solved=this.solve2();}
		if(spc==1){solved=this.solve1();}
		if(spc==0){solved=this.solve0();}
	}
	var moves=this.moveList.join("");
	this.goal=g;
	this.puzzle=p;
	this.moveList=m;
	if(solved){return moves;}
	return false;
}

Puzzle15Solver.prototype.executeSolutionMoves=function(moves){
var moves=moves.split('');
var m=moves.shift();
moves=moves.join('');
this.executeMoves(m);
this.show();
if(moves.length){
(function(t,moves){
setTimeout(function(){Puzzle15Solver.prototype.executeSolutionMoves.apply(t,[moves])},20);
})(this,moves);
}

}

Puzzle15Solver.prototype.solve=function(){
	var solution=this.getSolution()||"";
	if(!solution.length){solution="";}
	solution=solution.replace(/lr/g,'').replace(/rl/g,'').replace(/ud/g,'').replace(/du/g,'');
	var m=document.getElementById("msgs");
	if(!solution&&this.puzzle.join(",")!=this.goal.join(",")){
		m.innerHTML="<span style=\"color:red;\">Error:</span> Could not find a solution!<br />";
		return;
	}
	var outText="";
	if(solution.length==1)outText="Solution found in 1 move!";
	else if(solution.length>1)outText="Solution found in "+solution.length+" moves!";
	else if(solution.length==0){m.innerHTML="Puzzle is already solved!";return;}
	m.innerHTML="";
	if(solution.length>0)
	{
	var el=document.createElement("a");
	el.href="#";
	(function(th,solution){
	el.onclick=function(){th.executeSolutionMoves(solution);this.parentNode.innerHTML="";return false;};
	})(this,solution);
	el.appendChild(document.createTextNode(outText));
	m.appendChild(el);
	}
	
}

Puzzle15Solver.prototype.newPuzzle=function(){
	var goal=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	goal.splice(Math.floor(Math.random()*15),0,null);//add the empty space to a random place
	this.setGoal(goal);
	var puzzle=this.goal.slice(0);//clone
	var scrambleMoves='u'.repeat(Math.floor(Math.random()*100));
	scrambleMoves+='d'.repeat(Math.floor(Math.random()*100));
	scrambleMoves+='l'.repeat(Math.floor(Math.random()*100));
	scrambleMoves+='r'.repeat(Math.floor(Math.random()*100));
	scrambleMoves=scrambleMoves.split('').shuffle().join('');
	x.setPuzzle(puzzle);
	x.executeMoves(scrambleMoves);
	x.clearMoveList();
	//x.setPuzzle([1,2,3,4,5,6,7,8,9,15,11,10,13,null,14,12]);
	//x.setPuzzle([1,2,3,4,5,6,7,8,null,9,12,11,13,14,10,15]);
	//x.setPuzzle([1,7,2,3,4,5,6,null,8,9,10,11,12,13,14,15]);
	x.show();
	x.insertPuzzle('puzzle');
	x.insertGoal('goal');
}

Puzzle15Solver.prototype.reportPositionUnsolvableError=function(){

	var msgString="The following message is an error report.\n";
	msgString+="\n";
	msgString+="Error: Could not find a solution!\n";
	msgString+="scriptInfo: "+scriptInfo.toSource()+"\n";
	msgString+="puzzle: "+this.puzzle.toSource()+"\n";
	msgString+="goal: "+this.goal.toSource()+"\n";
	msgString+="\n";
	var link=null;for(var i=0;i<findings3.length;i++){if(findings3[i]){link=findings3[i];break;}}
	var result=link.match(/^(.*?)\/generate15.php.*?pwd=(\w+)$/);
	var site=result[1],pwdhash=result[2];

	var toMe="Ultibot";
	var kmail={
		url:site+"/sendmessage.php",
		params:{action:'send',pwd:pwdhash,towho:toMe,savecopy:'on',message:msgString}
		};
	var postArray=[];
	for(var j in kmail.params)postArray.push(encodeURIComponent(j)+"="+encodeURIComponent(kmail.params[j]));
	kmail.postData=postArray.join("&");
	GM_xmlhttpRequest({
		method:	'POST',
		url:	kmail.url,
		headers:	{"Content-Type": "application/x-www-form-urlencoded"},
		data: 	kmail.postData,
		onload:	function(r){	
				if(r.status!=200){alert("Error report failed!");return;}
				var page=r.responseText;
				var beforeForm=page.split("<form");
				if(beforeForm[0].indexOf("<center>Message sent.</center>")!=-1){
					alert("Message sent.\nThank you for submitting your error report!");
				}
			}
	});//GM_XHR
}//function

//================== Solution Finder ==================
function findSolutionToThePuzzle(){
	var x=new snakeObject();
	x.solve(findings1.join(','));
	var puzzle=findings2.slice(0);//[1, null, 11, 12, 4, 2, 10, 13, 7, 3, 9, 14, 5, 6, 8, 15]
	var goal=x.getPosition().slice(0);//[1, 2, 11, 12, 4, 3, 10, 13, 5, null, 9, 14, 6, 7, 8, 15]
	var solver=new Puzzle15Solver();
	solver.setGoal(goal);
	solver.setPuzzle(puzzle);
	solver.clearMoveList();
	var solution=solver.getSolution()||"";
	solution=solution.replace(/lr/g,'').replace(/rl/g,'').replace(/ud/g,'').replace(/du/g,'');
	var outText="";
	var m=document.getElementById("msgs");
	if(!solution&&solver.puzzle.join(",")!=solver.goal.join(",")){
		m.innerHTML="<span style=\"color:red;\">Error:</span> Could not find a solution!<br />Please submit your puzzle position to me so I can correct this.<br />This will be done via kmail.<br />A copy will be saved to your outbox after you submit the report.<br />";
		var el=document.createElement("a");
		el.href="#";
		(function(th){
		el.addEventListener('click', function(){th.reportPositionUnsolvableError();this.parentNode.innerHTML="";return false;}, true);
		})(solver);
		el.appendChild(document.createTextNode("Send Error."));
		m.appendChild(el);
		return;
	}else if(solution.length==0){
		outText="Puzzle is already solved!";
	}else if(solution.length==1){
		outText="Solution found in 1 move!";
	}else if(solution.length>1){
		outText="Solution found in "+solution.length+" moves!";
	}
	m.innerHTML=outText;
	if(solution.length>0)
	{
	var el=document.createElement("a");
	el.href="#";
	(function(th,solution){
	//el.onclick=function(){th.executeSolutionMoves(solution);this.parentNode.innerHTML="";return false;};
	//el.onclick=function(){alert(solution);this.parentNode.innerHTML="";return false;};
	el.addEventListener('click', function(){var e=document.getElementById("executeMoveList");e.value=solution;return false;}, true);
	})(solver,solution);
	el.appendChild(document.createTextNode('View Solution'));
	m.appendChild(document.createElement("br"));
	m.appendChild(el);
	}//if
}//function

function findSolutionToTheDemonName(){
	var x=new snakeObject();
	x.solve(findings1.join(','));
	var puzzle=findings2.slice(0);//[1, null, 11, 12, 4, 2, 10, 13, 7, 3, 9, 14, 5, 6, 8, 15]
	if(puzzle[0]!=null){
		var m=document.getElementById("msgs2");
		m.innerHTML="";
		alert("Sorry, you can't get the demon name any more!\nYou will need a fresh cube to get another shot at it.\nWhy not try solving the current one for the Dense Meat Stack?");return;
	}
	var goal=x.getPosition().slice(0);//[1, 2, 11, 12, 4, 3, 10, 13, 5, null, 9, 14, 6, 7, 8, 15]
	var goalMap={};
	for(var i=0,l=goal.length;i<l;i++)goalMap[goal[i]]=i;
	var findings=new Array();findings.push(0);
	for(var j=0;j<l;j++)if(goalMap[j])findings.push(goalMap[j]);
	var moves="";
	for(var i=0,l=findings.length-1;i<l;i++){
		if(Math.floor(findings[i]/4)>Math.floor(findings[i+1]/4)){moves+="u";}
		else if(Math.floor(findings[i]/4)<Math.floor(findings[i+1]/4)){moves+="d";}
		else if(findings[i]%4>findings[i+1]%4){moves+="l";}
		else if(findings[i]%4<findings[i+1]%4){moves+="r";}
	}
	var m=document.getElementById("msgs2");
	if(!moves||!moves.length){m.innerHTML="Could not find solution, strange.";return;}
	m.innerHTML="Solution found in "+moves.length+" moves!<br />(assuming this is a fresh cube)";

	var el=document.createElement("a");
	el.href="#";
	(function(moves){
	el.addEventListener('click', function(){var e=document.getElementById("executeMoveList");e.value=moves;return false;}, true);
	})(moves);

	el.appendChild(document.createTextNode('View Solution'));
	m.appendChild(document.createElement("br"));
	m.appendChild(el);
}

function executeMovesInKoLNow(moveListString){
GM_setValue('moveListStringToExecuteAutomatically', moveListString);
executeMovesNow();
}

function executeMovesNow(){
var movesToExecute=GM_getValue('moveListStringToExecuteAutomatically', "");
if(!movesToExecute)return;
var m=movesToExecute.split("");
var nextMove=m.shift();
GM_setValue('moveListStringToExecuteAutomatically', m.join(""));
var puzzle=findings2.slice(0);
var p=new Puzzle15Solver();
p.setPuzzle(puzzle);
 var x=new snakeObject();
 x.solve(findings1.join(','));
var goal=x.getPosition().slice(0);
p.setGoal(goal);
var spacerIndex=p.getPieceIndex(null);
var pieceToMoveIndex=-1;
if(nextMove=="u" && !(spacerIndex<4)){pieceToMoveIndex=spacerIndex-4;}
else if(nextMove=="d" && !(spacerIndex>=12)){pieceToMoveIndex=spacerIndex+4;}
else if(nextMove=="l" && !(spacerIndex%4==0)){pieceToMoveIndex=spacerIndex-1;}
else if(nextMove=="r" && !(spacerIndex%4==3)){pieceToMoveIndex=spacerIndex+1;}
if(pieceToMoveIndex== -1){return executeMovesNow();}
var pieceProperties={y:Math.floor(pieceToMoveIndex/4),x:pieceToMoveIndex%4};
var pieceElementLinkHref=findings3[pieceToMoveIndex];

//before executing the move, make sure our moveList won't try to execute moves even after the puzzle is solved.
p.moveSpace(nextMove);
if(p.goal.join(",")==p.puzzle.join(",")){
GM_setValue('moveListStringToExecuteAutomatically', "");
}//the next move will solve the puzzle
(function(pieceElementLinkHref){
setTimeout(function(){location.href=pieceElementLinkHref;},1);
})(pieceElementLinkHref);

}//function

if(GM_getValue('moveListStringToExecuteAutomatically', "")){
	executeMovesNow();
}

//======================= End of Script ======================
//EOF