// ==UserScript==
// @name Orkut-Toolbar: Easy formatting and smileys V0.7.6
// @author Sharath A.V 
// @namespace http://technowise.blogspot.com
// @description Adds a toolbar for formatting & smilies in orkut for scrap-book and community messages
// @include http://*orkut.*/*Scrapbook*
// @include http://*orkut.*/*CommMsgPost*
// ==/UserScript==

/*
Revision notes:
V0.7.6: Fix problem with loading in the new changed layout. 
V0.7.5: More-smileys and glittering text are removed temporarily, as they now require captcha
verification.
*/


//Append toolbar buttons above all the text-areas


window.addEventListener("load", function(e) 
{
	//alert(unsafeWindow.frames['orkutFrame']);
	var currentTextArea=document.getElementsByTagName('textarea')[0];
	var ta;
	for(i=0;i<document.getElementsByTagName('textarea').length;i++) {
		ta = document.getElementsByTagName('textarea')[i];
		appendToolBar(ta);
	}

},true);

function appendToolBar(ta)
{

	var boldButton = document.createElement('input');
	boldButton.type='button';
	boldButton.value="B";
	boldButton.setAttribute("style", "font-weight:bold");

	var italicButton = document.createElement('input');
	italicButton.type='button';
	italicButton.value="I";
	italicButton.setAttribute("style", "font-style: italic;font-weight:bold;");

	var underlineButton = document.createElement('input');
	underlineButton.type='button';
	underlineButton.value="U";
	underlineButton.setAttribute("style", "text-decoration:underline;font-weight:bold;");

	//The text color select menu cration
	var colorlist = document.createElement('select');
	colorlist.id='colorselect';
	colorlist.value='Font color';
	colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");  
	colorvals=new Array("aqua","blue","#f0c0a0","#ffd700","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","#ff00ff","yellow");

	var firstoption=new Option("Color");
	firstoption.selected=true;
	firstoption.disabled="disabled";
	colorlist.options.add(firstoption);

	for(var i=0;i<colorarray.length;i++)
	{
		var colorOption=new Option(colorarray[i]);
		colorOption.setAttribute("style", "padding-bottom:3px; font-weight:bold; color:"+colorvals[i]);
		colorlist.options.add(colorOption);
	}

	//The smiley select menu cration
	var smileySelectMenu=document.createElement('select');
	smileySelectMenu.id='smileySelect';
	smileySelectMenu.size=1;
	smileySelectMenu.value='Select Smiley';
	smileyArray= new Array("Cool","Sad","Angry", "Smile", "Wink", "Big Smile", "Surprised", "Funny", "Confused");
	smileyGifs=new Array("cool.gif", "sad.gif", "angry.gif","smile.gif","wink.gif","bigsmile.gif","surprise.gif", "funny.gif","confuse.gif");
	smileyTags=new Array("[8)]", "[:(]","[:x]","[:)]", "[;)]", "[:D]","[:o]","[:P]","[/)]");

	var smileySelectLabel=new Option("Smiley");
	smileySelectLabel.selected=true;
	smileySelectLabel.disabled="disabled";
	smileySelectMenu.options.add(smileySelectLabel);
	
	for(i=0;i<smileyArray.length;i++)
	{
		var smileyOption=new Option(smileyArray[i]);
		smileyOption.setAttribute("style", "padding-bottom:3px; font-weight:bold; background-image:url(http://images3.orkut.com/img/i_"+smileyGifs[i]+");background-repeat:no-repeat; background-position:center left; padding-left:20px; text-align:center;");
		smileySelectMenu.options.add(smileyOption);
	}
	
	colorlist.addEventListener('change', function(){ appendFormatCode(this.value, ta); document.getElementById('colorselect').selectedIndex=0; },true);
	smileySelectMenu.addEventListener('change',function (){ appendSmileyCode(smileyTags[this.selectedIndex-1], ta);document.getElementById('smileySelect').selectedIndex=0;  },true );
	boldButton.addEventListener('click',function (){ appendFormatCode('b', ta); },true);
	italicButton.addEventListener('click',function (){ appendFormatCode('i', ta); },true);
	underlineButton.addEventListener('click',function (){ appendFormatCode('u', ta); },true);
	

	var formattingToolbarContainer=document.createElement('div');
	formattingToolbarContainer.appendChild(boldButton);
	formattingToolbarContainer.appendChild(italicButton);
	formattingToolbarContainer.appendChild(underlineButton);
	formattingToolbarContainer.appendChild(colorlist);
	formattingToolbarContainer.appendChild(smileySelectMenu);

	//Identify the textbox of the page		
	ta.parentNode.insertBefore(formattingToolbarContainer, ta);

}



//Appends the given smiley to the current cursor position in the current text-area
function appendSmileyCode(smiley, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}

	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	tx.value = tx.value.substring(0, startPos)+smiley+tx.value.substring(endPos, tx.value.length);
}

//Appends the given Format Tag into the selected text
function appendFormatCode(format, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}

	formatOpen="["+format+"]";
	formatClose="[/"+format+"]";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}
