// Version: 1.0.5
// Sudoku Combat
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sudoku Combat", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sudoku Combat
// @namespace     http://www.sudokucombat.com
// @description   Improves the website
// @include       http://www.sudokucombat.com/*
// ==/UserScript==


/***********************************************/
/*** CHECK UPDATE	           **********/
/***********************************************/

var last_check = GM_getValue('last_check');
var timeStamp = new Date().getTime();
var timeStamp = timeStamp.toString();
if(last_check==undefined)
{
	GM_setValue('last_check',timeStamp);	
}
else
if(parseInt(timeStamp) > (parseInt(last_check) + 86400000))
{
//GM_log(timeStamp+">"+(parseInt(last_check) + 86400000).toString());
var u_loc = 'http://userscripts.org/scripts/source/5616.user.js';

var i_version="1.0.6";

GM_xmlhttpRequest({
	method: 'GET',
	url: u_loc,
	onload: function(responseDetails) {
		//Get the remote version
		var lines = responseDetails.responseText.split("\n");
		//GM_log('Returned line: '+lines[0]);
		var reg_exp = new RegExp("^.* Version: (.*)$", "i");
		var remote_version = lines[0].match(reg_exp);
		//GM_log('remote_version: '+remote_version);
    		//Compare with the current version
		if (remote_version[1] != i_version) {
			var update_message="<center><b style='background-color: red'>New version "+remote_version[1]+" of the Script for the web Sudoku Combat<br><a href='"+u_loc+"' target='_blank'>Click here to update!!</a></b></center>";									
			unsafeWindow.document.body.innerHTML=update_message+unsafeWindow.document.body.innerHTML;
		}
		else
		{
			GM_setValue('last_check',timeStamp);
		}
    	}
})
}



var url=window.location.href;

if(url=="http://www.sudokucombat.com/index.php" || url=="http://www.sudokucombat.com/")
{
/************************************************/
/********      PLAYERS WAITING           ********/
/************************************************/

var thisElement;

var divWaitingPlayers =  unsafeWindow.document.getElementsByTagName('table')[2];
if(divWaitingPlayers)
{	

	unsafeWindow.waitingPlayers = function()
	{
	//GM_log('waiting player...');
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.sudokucombat.com/',
	    onload: function(responseDetails) {
		var myString = new String(responseDetails.responseText);
	//var myRE = new RegExp("<b>the players waiting are:(.*)", "gi");
	var myRE = new RegExp("<table class=\'onlineplayers\'>(.*)<\/table>","i");
		var results = myString.match(myRE);

		if(results[1])
		{
			//GM_log(results[1]);
			divWaitingPlayers.innerHTML = results[1]
		}
		setTimeout("waitingPlayers()",4000);
	    }
	});
	}	
	//Real time waiting players
	//unsafeWindow.document.body.addEventListener('load',unsafeWindow.waitingPlayers,true);
	unsafeWindow.waitingPlayers();
}
}

if(url.indexOf("http://www.sudokucombat.com/sudoku.php?type=")>-1)
{

//With the last web updates with this work correctly if not...
	//unsafeWindow.TESTING=1;

/***********************************************/
/*** Waiting players addon           **********/
/***********************************************/

var divTitle, divWaitingPlayers;
divTitle = document.getElementById('title');
if (divTitle) {
	divWaitingPlayers = document.createElement('table');
	divWaitingPlayers.style.fontSize="7pt";
	//divWaitingPlayers.style.height="60px";
	//divWaitingPlayers.style.overflowY="scroll";
	divTitle.parentNode.insertBefore(divWaitingPlayers, divTitle);
}

unsafeWindow.waitingPlayers = function waitingPlayers()
{
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.sudokucombat.com/',
    headers: {},
    onload: function(responseDetails) {
	var myString = new String(responseDetails.responseText);
	//var myRE = new RegExp("<b>the players waiting are:(.*)", "i");
	var myRE = new RegExp("<table class=\'onlineplayers\'>(.*)<\/table>","i");
	var results = myString.match(myRE);

	if(results[0])
	{
	divWaitingPlayers.innerHTML=results[1];
	}
	setTimeout("waitingPlayers()",4000);
    }
});
}
unsafeWindow.waitingPlayers();

/***********************************************/
/*** Remove the start animation      **********/
/***********************************************/

unsafeWindow.swCTRL=false;

function isAnumberToComplete(num){
				switch(num)
				{
				case 1: numberTemp="one";
					break;
				case 2: numberTemp="two";
					break;
				case 3: numberTemp="three";
					break;
				case 4: numberTemp="four";
					break;
				case 5: numberTemp="five";
					break;
				case 6: numberTemp="six";
					break;
				case 7: numberTemp="seven";
					break;
				case 8: numberTemp="eight";
					break;
				case 9: numberTemp="nine";
					break;
				default:
				}
				if(numberTemp)
				if(unsafeWindow.document.getElementById(numberTemp).innerHTML=="")
					return true;
				else
					return false;
}

function completeNumbers()
{
		var numberCounter = new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());

		var counter=0;
		for(var x=0; x<81; x++)
		{
			var cell=unsafeWindow.document.getElementById('cell'+x).value;
			if(cell.length!=1) continue;
			if(parseInt(cell)==NaN) continue;
			counter++;
			numberCounter[cell-1].push(x);
		}
		unsafeWindow.document.getElementById('CounterInput').value=81-counter;

		if(counter==81) unsafeWindow.Done();
		
		for(var index=0; index<9; index++)
		{
			if(numberCounter[index].length==9)
			{
				for(var j=0; j<9; j++)
				{
					if(unsafeWindow.document.getElementById('cell'+numberCounter[index][j]).readOnly!=true)
					{
						//unsafeWindow.document.getElementById('cell'+numberCounter[index][j]).style.backgroundColor="#fff0f0";
						unsafeWindow.document.getElementById('cell'+numberCounter[index][j]).style.backgroundColor="#FAFAFD";
					}
				}
				var numberTemp=""
				switch(index+1)
				{
				case 1: numberTemp="one";
					break;
				case 2: numberTemp="two";
					break;
				case 3: numberTemp="three";
					break;
				case 4: numberTemp="four";
					break;
				case 5: numberTemp="five";
					break;
				case 6: numberTemp="six";
					break;
				case 7: numberTemp="seven";
					break;
				case 8: numberTemp="eight";
					break;
				case 9: numberTemp="nine";
					break;
				default:
				}
				if(numberTemp)
					unsafeWindow.document.getElementById(numberTemp).innerHTML="";
			//jumps automatically to the next number
			//-->
			if((index+1)==parseInt(divNumberMouse.innerHTML))
			{
				var num=parseInt(divNumberMouse.innerHTML);
				var tempcont=0;
				do{
					tempcont++;
					num++;
					if(num>9) num=1;
				}while(isAnumberToComplete(num)&&tempcont<10);
				divNumberMouse.innerHTML=num;
				divNumberMouse.style.color = unsafeWindow.COLORS[num];
			}
			//<--
			}
			else
			{
				for(var z=0; z<81; z++)
				{
					var cell=unsafeWindow.document.getElementById('cell'+z).value;	
					if(cell.length!=1 || parseInt(cell)==NaN || (cell==(index+1) && unsafeWindow.document.getElementById('cell'+z).readOnly!=true))
					{
						unsafeWindow.document.getElementById('cell'+z).style.backgroundColor="white";			
					}
				}
				switch(index+1)
				{
				case 1: numberTemp="one";
					break;
				case 2: numberTemp="two";
					break;
				case 3: numberTemp="three";
					break;
				case 4: numberTemp="four";
					break;
				case 5: numberTemp="five";
					break;
				case 6: numberTemp="six";
					break;
				case 7: numberTemp="seven";
					break;
				case 8: numberTemp="eight";
					break;
				case 9: numberTemp="nine";
					break;
				default:
				}
				unsafeWindow.document.getElementById(numberTemp).innerHTML=(index+1)+"";
			}
		}

}

	//I create this div out of StartAnimation so its not create every time you beguin a match,
	//just once.
	var divNumbers=document.createElement('div');
	var divNumberMouse=document.createElement('div');
	divNumberMouse.innerHTML="1";
	divNumberMouse.style.fontSize="24pt";
	divNumberMouse.style.color=unsafeWindow.COLORS[1];
	//divNumberMouse.style.backgroundColor="lightyellow";
	divNumberMouse.style.border="3px solid lightyellow";
	
	//Flag to avoid creating events twice or more times because
	//function StartAnimation can be called more than once.
	var swStartAnimation=true;


//BOF STARANIMATION

unsafeWindow.StartAnimation=function StartAnimation(_b){
	//GM_log('staranimation()');
//If cells arent displayed is because the var name is changed..
	if(unsafeWindow.cc!=0)
		unsafeWindow.cc=2;
	unsafeWindow.cb = new Date();
        unsafeWindow.UpdateTimer();
	unsafeWindow.CreateTable(unsafeWindow.db,"table",0);

	unsafeWindow.document.getElementById('CounterInput').style.display="inline";
	unsafeWindow.document.getElementById('CounterInputText').style.display="inline";


	var counter=0;
	for(var x=0; x<unsafeWindow.db.length; x++)
	{
		var digit=unsafeWindow.db.charAt(x);
		if(digit=="0") continue;		
		counter++;
	}

	unsafeWindow.document.getElementById('CounterInput').value=81-counter;

if(url.indexOf("http://www.sudokucombat.com/sudoku.php?type=0")==-1)
{	
	unsafeWindow.document.getElementById('CounterInputOpponent').style.display="inline";
	unsafeWindow.document.getElementById('CounterInputTextOpponent').style.display="inline";
	//if(swStartAnimation)unsafeWindow.UpdateCounterOpponent();
	unsafeWindow.document.body.scrollTop=480;
}
else
{
	//Scroll to the sudoku Table automatically
	unsafeWindow.document.body.scrollTop=415;
}
/***********************************************/
/*** Coloring completed numbers and autoDone ***/
/***********************************************/

//I rewrite the wipe function because when you clear the grid it rewrites the sudoku table
//and removes all the events added
unsafeWindow.Wipe=function(){
var sc=confirm("Do you really want to clear the grid?");if(sc==false)return;rb=null;
	for(var k=0; k<81; k++)
	{
		var cell = unsafeWindow.document.getElementById('cell'+k);
		if(cell.readOnly==false) cell.value="";			
	}
	completeNumbers();
}


	var sudokuTable=document.getElementById('table');

	if(swStartAnimation)sudokuTable.addEventListener('mouseover',function(e){
	var posx = 0;
	var posy = 0;
	if (!e) var e = unsafeWindow.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + unsafeWindow.document.body.scrollLeft
			+ unsafeWindow.document.documentElement.scrollLeft;
		posy = e.clientY + unsafeWindow.document.body.scrollTop
			+ unsafeWindow.document.documentElement.scrollTop;
	}
	// posx and posy contain the mouse position relative to the document
	// Do something with this information
	divNumberMouse.style.position="absolute";
	divNumberMouse.style.top=(posy-22)+"px";
	divNumberMouse.style.left=(posx+5)+"px";
	divNumberMouse.style.display="block";

	//In order to "activate" the keydown event we focus on a cell of the table
	//unsafeWindow.document.getElementById('cell0').focus();
	sudokuTable.style.cursor = "default";
	},true);

	if(swStartAnimation)sudokuTable.addEventListener('mouseout',function(e){
		divNumberMouse.style.display="none";
	},true);


	if(swStartAnimation)sudokuTable.addEventListener('keydown',function(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	//var character = String.fromCharCode(code);
	//GM_log('tecla pulsada: '+String.fromCharCode(code));

	//Controls CTRL key for multiple candidates
	if(code==17) 
	{
		unsafeWindow.swCTRL=true;
		unsafeWindow.document.getElementById('buttonCandidates').innerHTML="Candidates ON";
	}

	if(code==38 || code==39)
	{
		var num=parseInt(divNumberMouse.innerHTML);
		//GM_log('Incrementar ný: '+num);
		var tempcont=0;
		do{
		tempcont++;
		num++;
		if(num>9) num=1;
		}while(isAnumberToComplete(num)&&tempcont<10);
		divNumberMouse.innerHTML=num;		
	}
	if(code==40 || code==37)
	{
		var num=parseInt(divNumberMouse.innerHTML);
		//GM_log('Decrementar ný: '+num);
		var tempcont=0
		do{
		tempcont++;
		num--;
		if(num<1) num=9
		}while(isAnumberToComplete(num)&&tempcont<10);
		divNumberMouse.innerHTML=num;		
	}
	if(code>36 && code <41)
	{		
		divNumberMouse.style.color = unsafeWindow.COLORS[num];
	}
	//GM_log('ný Final: '+num);
	},true);

	if(swStartAnimation)sudokuTable.addEventListener('keyup',function(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	//var character = String.fromCharCode(code);
	//GM_log('tecla pulsada: '+String.fromCharCode(code));

	//Controls CTRL key for multiple candidates
	if(code==17) 
	{
		unsafeWindow.swCTRL=false;
		unsafeWindow.document.getElementById('buttonCandidates').innerHTML="Candidates OFF";
	}
	},true);

	//Adding event for puting numbers with the mouse on each cell
	for(var k=0; k<81; k++)
	{
		//unsafeWindow.document.getElementById('cell'+k).addEventListener('keydown',function(){unsafeWindow.InputOnKeyDown(this)},true);

		unsafeWindow.document.getElementById('cell'+k).addEventListener('mousedown',function(e){

		var rightclick;
		var middleclick;
		if (!e) var e = window.event;
		var button = e.which ? e.which : e.button;;
		//GM_log('button: ' + button);			
		switch(true)
		{
			case (button==3):
				unsafeWindow.increaseDivNumberMouse();
				return false;
				break;
			/*case (button==2):
				unsafeWindow.decreaseDivNumberMouse();
				return false;
				break;	*/	
		}
		

		//GM_log('click con cell'+k+'-num:'+divNumberMouse.innerHTML);
		if(this.readOnly==false) 
		{				
			if(unsafeWindow.swCTRL)
			{
				if(this.value.length==0 || this.value.length==1)
				{
					this.value="*"+divNumberMouse.innerHTML;
				}
				else
				{
					this.value+=divNumberMouse.innerHTML;
				}

				this.style.fontSize='8pt';
			}
			else
			{
				this.value=divNumberMouse.innerHTML;
				this.style.fontSize='16pt';
			}
		}
		},false);
		unsafeWindow.document.getElementById('cell'+k).addEventListener('dblclick',function(e){		
		//GM_log('erase cell'+k);	
		if(this.readOnly==false) this.value="";

		},true);

		//Disable contextmenu
		unsafeWindow.document.getElementById('cell'+k).addEventListener('contextmenu',function(e) {e.stopPropagation(); return false;},true);

		unsafeWindow.document.getElementById('cell'+k).addEventListener("mouseover",function(){
	this.style.cursor="default";
	//Change mouse cursor:
			/*
			var cursorURL="";
			switch(divNumbers.innerHTML)
			{
				case "1": cursorURL="http://www.christianet.com/freecursor/images/smiles_3.cur";
					break;
				case "2": cursorURL="http://www.christianet.com/freecursor/images/smiles_1.cur";
					break;
				case "3": cursorURL="http://www.christianet.com/freecursor/images/cool_3.cur";
					break;
				case "4": cursorURL="http://www.christianet.com/freecursor/images/car_2.cur";
					break;
				case "5": cursorURL="http://www.christianet.com/freecursor/images/cartoon_2.cur";
					break;
				case "6": cursorURL="";
					break;
				case "7": cursorURL="";
					break;
				case "8": cursorURL="";
					break;
				case "9": cursorURL="";
					break;
			}
		this.style.cursor="url("+cursorURL+"),auto";*/
		},true);
	}

	//Numbers to complete
	divNumbers.style.fontSize="19pt";
	divNumbers.title='TIP:  use the keyboard arrows to increase/decrease the input number. Click a number to put it with the mouse. ';
	divNumbers.innerHTML="" 
divNumbers.innerHTML+="<font color='#bb0000' id='one' onclick='setDivNumberMouse(this.innerHTML)'>1</font> ";
divNumbers.innerHTML+="<font color='#dd8800' id='two' onclick='setDivNumberMouse(this.innerHTML)'>2</font> "; 
divNumbers.innerHTML+="<font color='#0000aa' id='three' onclick='setDivNumberMouse(this.innerHTML)'>3</font> ";
divNumbers.innerHTML+="<font color='#55aaaa' id='four' onclick='setDivNumberMouse(this.innerHTML)'>4</font> ";
divNumbers.innerHTML+="<font color='#000000' id='five' onclick='setDivNumberMouse(this.innerHTML)'>5</font> ";
divNumbers.innerHTML+="<font color='#aa00aa' id='six' onclick='setDivNumberMouse(this.innerHTML)'>6</font> ";
divNumbers.innerHTML+="<font color='#3333ff' id='seven' onclick='setDivNumberMouse(this.innerHTML)'>7</font> ";
divNumbers.innerHTML+="<font color='#999900' id='eight' onclick='setDivNumberMouse(this.innerHTML)'>8</font> ";
divNumbers.innerHTML+="<font color='#ff0000' id='nine' onclick='setDivNumberMouse(this.innerHTML)'>9</font>";

	sudokuTable.parentNode.insertBefore(divNumbers, sudokuTable);
	sudokuTable.parentNode.insertBefore(divNumberMouse, sudokuTable);
	divNumberMouse.style.display="none";

	if(swStartAnimation)sudokuTable.addEventListener('keyup',completeNumbers, true);	
	if(swStartAnimation)sudokuTable.addEventListener('keyup',completeNumbers, true);

	if(swStartAnimation)sudokuTable.addEventListener('mouseup',completeNumbers,false);
	
	var imgDecrease=document.createElement('img');
	imgDecrease.src='http://www.tag2.net/assets/images/txtsmaller_button.gif';
	//imgDecrease.align='middle';
	imgDecrease.title='TIP: Remove a cell with just a doubleclick';
	imgDecrease.style.height='25px';
	imgDecrease.style.width='25px';
	imgDecrease.style.margin='1px 1px 1px 1px';
	imgDecrease.addEventListener('click',function(){unsafeWindow.decreaseDivNumberMouse()},false);

	var imgIncrease=document.createElement('img');
	imgIncrease.src='http://www.tag2.net/assets/images/txtlarger_button.gif';
	//imgIncrease.align='middle';
	imgIncrease.title='TIP: INCREASE INPUT NUMBER WITH THE RIGHT BUTTON OF THE MOUSE.';
	imgIncrease.style.height='25px';
	imgIncrease.style.width='25px';
	imgIncrease.style.margin='1px 1px 1px 1px';
	imgIncrease.addEventListener('click',function(){unsafeWindow.increaseDivNumberMouse()},false);

	var buttonCandidates=document.createElement('button');
	buttonCandidates.innerHTML="Candidates OFF";
	buttonCandidates.id="buttonCandidates";
	buttonCandidates.title="TIP: Mantain 'ctrl' key pressed to active candidates mode";
	buttonCandidates.addEventListener('click',function(){
	if(this.innerHTML=="Candidates OFF") 
	{
		this.innerHTML="Candidates ON";
		unsafeWindow.swCTRL=true;
	}
	else
	{
		this.innerHTML="Candidates OFF";
		unsafeWindow.swCTRL=false;
	}
	},true);
	var lastNumber = unsafeWindow.document.getElementById('nine');
	lastNumber.parentNode.insertBefore(imgIncrease, lastNumber.nextSibling);
	lastNumber.parentNode.insertBefore(imgDecrease, lastNumber.nextSibling);
	lastNumber.parentNode.insertBefore(buttonCandidates, lastNumber.nextSibling);
	swStartAnimation=false;
	}

unsafeWindow.setDivNumberMouse=function(num){
divNumberMouse.innerHTML=num;
divNumberMouse.style.color=unsafeWindow.COLORS[num];

}

unsafeWindow.increaseDivNumberMouse=function(){
	var num=parseInt(divNumberMouse.innerHTML);
	//GM_log('Incrementar ný: '+num);
	var tempcont=0;
	do{
		tempcont++;
		num++;
		if(num>9) num=1;
	}while(isAnumberToComplete(num)&&tempcont<10);
	divNumberMouse.innerHTML=num;
	divNumberMouse.style.color=unsafeWindow.COLORS[num];
}

unsafeWindow.decreaseDivNumberMouse=function(){
	var num=parseInt(divNumberMouse.innerHTML);
	//GM_log('Decrementar ný: '+num);
	var tempcont=0
	do{
		tempcont++;
		num--;
		if(num<1) num=9
	}while(isAnumberToComplete(num)&&tempcont<10);
	divNumberMouse.innerHTML=num;	
	divNumberMouse.style.color=unsafeWindow.COLORS[num];
}
/***********************************************/
/*** Insertion of the CounterInputOpponent *******/
/***********************************************/
	var CounterInputOpponent, TimerInput;
	TimerInput = document.getElementById('timer');
	
	CounterInputOpponent = document.createElement("input");
	CounterInputOpponent.id="CounterInputOpponent";
	CounterInputOpponent.style.display="none";
	CounterInputOpponent.style.border="0px solid white";
	CounterInputOpponent.style.marginLeft="25px";
	CounterInputOpponent.style.fontSize="18px";
	CounterInputOpponent.size="2";
	CounterInputOpponent.value="0";

	TimerInput.parentNode.insertBefore(CounterInputOpponent, TimerInput.nextSibling);
	
	var CounterInputTextOpponent = document.createElement("i");
	CounterInputTextOpponent.innerHTML="cells opponent";
	CounterInputTextOpponent.id="CounterInputTextOpponent";
	CounterInputTextOpponent.style.display="none";
	TimerInput.parentNode.insertBefore(CounterInputTextOpponent, CounterInputOpponent.nextSibling);

unsafeWindow.UpdateState = function ($b,name,_b)
{
	if(unsafeWindow.cc!=2) return;
	var counterOp=0;
	var i;
	for(i=0;i<$b.length;i++)
	{

		if($b.charAt(i)=='0') counterOp++;

		if($b.charAt(i) == unsafeWindow.eb.charAt(i)) 
			continue;

		var element = unsafeWindow.document.getElementById(name+i);
		if($b.charAt(i)=='a')
		{
			if(_b%2==0) 
			{
				element.style.backgroundColor = "#f99";
			}
			else
				element.style.backgroundColor="#000";
		}
		else 
		if($b.charAt(i)=='0')
			element.style.backgroundColor="#fff";
		else
			element.value=$b.charAt(i);
					
	}

	var difference = parseInt(unsafeWindow.document.getElementById('CounterInput').value) - counterOp;
	
	if(difference < -2)
	{
		divNumberMouse.style.border="3px solid lightblue";
	}
	else if(difference < 2)
	{
		divNumberMouse.style.border="3px solid lightyellow";
	}
	else
	{
		divNumberMouse.style.border="3px solid red";
	}

	unsafeWindow.document.getElementById('CounterInputOpponent').value = counterOp;

	if(_b==0) 
	{
		unsafeWindow.eb = $b;
	}
	else
	{
		_b--;
		setTimeout("UpdateState('"+$b+"','"+name+"', "+_b+")",150);
	}
}

/***********************************************/
/*** Insertion of the CounterInput       *******/
/***********************************************/

	var CounterInput, TimerInput;
	TimerInput = document.getElementById('timer');
	
	var CounterInput = document.createElement("input");
	CounterInput.id="CounterInput";
	CounterInput.style.display="none";
	CounterInput.style.border="0px solid white";
	CounterInput.style.fontSize="18px";
	CounterInput.size="2";
	CounterInput.value="0";

	TimerInput.parentNode.insertBefore(CounterInput, TimerInput.nextSibling);
	
	var CounterInputText = document.createElement("i");
	CounterInputText.innerHTML="cells yours   -";
	CounterInputText.id="CounterInputText";
	CounterInputText.style.display="none";

	TimerInput.parentNode.insertBefore(CounterInputText, CounterInput.nextSibling);



//Setting to one each time a match starts
unsafeWindow.setDivNumberMouse("1");
}




/************************************************/
/******** REMOVE PUBLICITY CONTENT       ********/
/************************************************/

//Just hide the comercials, the webmaster will get the money also..
//but not for the clicks..
var allElementsIframe, thisElement, allElementsScript, allElementsDiv;
allElementsIframe = unsafeWindow.document.getElementsByTagName('iframe');
allElementsScript = unsafeWindow.document.getElementsByTagName('script');
allElementsDiv = unsafeWindow.document.getElementsByTagName('div');

for (var i = 0; i < allElementsIframe.length; i++) {
    thisElement = allElementsIframe[i];
    if(thisElement.name == "google_ads_frame" || thisElement.src.indexOf("google")>-1)
    {
	thisElement.src="";
	thisElement.style.border = "1px solid";
	//I use both methos to hide the iframe, because otherwise sometimes doesn't work
	thisElement.style.display = "none";	
	thisElement.style.display = "none";
	//thisElement.onload=function onload()	{this.style.display="none";this.style.display="none";}
    }
}

for (var i = 0; i < allElementsScript.length; i++) {
    thisElement = allElementsScript[i];
    if(i==3) thisElement.innerHTML="";
    if(thisElement.src.indexOf("google")>-1 || thisElement.innerHTML.indexOf("google")>-1)
    {
	thisElement.src="";
	thisElement.innerHTML="";
    }
}

for (var i = 0; i < allElementsDiv.length; i++) {
    thisElement = allElementsDiv[i];
    //var result = thisElement.innerHTML.match(new RegExp("poker","i"));

    if(thisElement.innerHTML.indexOf("Play poker")>-1)
    {
	thisElement.style.display="none";
    }

}
