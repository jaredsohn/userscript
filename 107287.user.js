// ==UserScript==
// @name	   Text Formating Toolbar 
// @version	   1.1
// @author	   Devjmi
// @description	   Use Text Formating Toolbar (for www.frendz4m.com only) in community Forums.
// @date           2011-07-19
// @include        http://*.frendz4m.*/*

// ==/UserScript==


window.addEventListener("load", function(e) 
{
	var currentTextArea=document.getElementsByTagName('textarea')[0];
	var ta;
	for(i=0;i<document.getElementsByTagName('textarea').length;i++) {
		ta = document.getElementsByTagName('textarea')[i];
		appendToolBar(ta);
	}

},true);

function appendToolBar(ta)
{

	var urlButton = document.createElement('input');
	urlButton.type='button';
	urlButton.value="URL";
	urlButton.setAttribute("style", "font-weight:bold");

	var updatesButton = document.createElement('input');
	updatesButton.type='button';
	updatesButton.value="UPDATES";
	updatesButton.setAttribute("style", "font-weight:bold");

	var quoteButton = document.createElement('input');
	quoteButton.type='button';
	quoteButton.value="QUOTE";
	quoteButton.setAttribute("style", "font-weight:bold");

	var trickButton = document.createElement('input');
	trickButton.type='button';
	trickButton.value="TRICK";
	trickButton.setAttribute("style", "font-weight:bold");

	var tinyButton = document.createElement('input');
	tinyButton.type='button';
	tinyButton.value="TINYPIC";
	tinyButton.setAttribute("style", "font-weight:bold");

	var furlButton = document.createElement('input');
	furlButton.type='button';
	furlButton.value="FURL";
	furlButton.setAttribute("style", "font-weight:bold");


	var imgButton = document.createElement('input');
	imgButton.type='button';
	imgButton.value="IMG";
	imgButton.setAttribute("style", "font-weight:bold");

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
	smileyArray= new Array("rofl","cool", "rolleyes","sleep","dry", "Yahoo", "smile", "wub", "angry", "sad", "India","unsure", "wacko","blink","ph34r", "yawn", "yeah", "please", "notworthy", "drunk", "bb","clap2","ban","yu","yahoo","tease","victory","sorry","rtfm","mega_shok","punish","help","crazy","dance2","dance3","dance","friends","clapping","drinks","bye","India","birthday","crazydance","Loser1","winky","angel","argue","biggrin","blush","bored","bounce","cry","first","hug","livid","wacko","walkman","what");
	smileyGifs=new Array("rofl.gif","cool.gif", "rolleyes.gif", "sleep.gif","dry.gif","yahoo.gif","smile.gif","wub.gif", "mad.gif","sad.gif","India.gif","unsure.gif", "wacko.gif", "blink.gif","ph34r.gif","yawn.gif","yeah.gif","please.gif", "notworthy.gif","drunk.gif","bb.gif","clap2.gif","ban.gif","yu.gif","yahoo.gif","tease.gif","victory.gif","sorry.gif","rtfm.gif","mega_shok.gif","punish.gif","help.gif","crazy.gif","dance2.gif","dance3.gif","dance.gif","friends.gif","clapping.gif","drinks.gif","bye.gif","India.gif","birthday.gif","crazydance.gif","Loser1.gif","winky.gif","angel.gif","argue.gif","biggrin.gif","blush.gif","bored.gif","bounce.gif","cry.gif","first.gif","hug.gif","livid.gif","wacko.gif","walkman.gif","what.gif");
	smileyTags=new Array(":rofl:","B)", ":rolleyes:", "-_-","<_<",":yahoo:", ":)", ":wub:",":angry:",":(",":India:",":unsure:", ":wacko:", ":blink:",":ph34r:",":yawn:", ":yeah:", ":please:",":notworthy:",":drunk:",":bb:",":clap2:",":ban:",":yu:",":yahoo:",":tease:",":victory:",":sorry:",":rtfm:",":mega_shok:",":punish:",":help:",":crazy:",":dance2:",":dance3:",":dance:",":friends:",":clapping:",":drinks:",":bye:",":India:",":birthday:",":crazydance:",":Loser1:",":winky:",":angel:",":argue:",":D",":India:",":bored:",":bounce:",":cry:",":winky:",":hug:",":livid:",":wacko:",":walkman:",":what:");


	var smileySelectLabel=new Option("Smiley");
	smileySelectLabel.selected=true;
	smileySelectLabel.disabled="disabled";
	smileySelectMenu.options.add(smileySelectLabel);

	var promoteButton = document.createElement('input');
	promoteButton.type='button';
	promoteButton.value="TEST";
	promoteButton.setAttribute("style", "font-weight:bold");
	
	for(i=0;i<smileyArray.length;i++)
	{
		var smileyOption=new Option(smileyArray[i]);
		smileyOption.setAttribute("style", "padding-bottom:15px; font-weight:bold; background-image:url(http://www.frendz4m.com/forum/images/"+smileyGifs[i]+");background-repeat:no-repeat; background-position:center left; padding-left:60px; text-align:center;");
		smileySelectMenu.options.add(smileyOption);
	}

	
	colorlist.addEventListener('change', function(){ appenddevCode(this.value, ta); document.getElementById('colorselect').selectedIndex=0; },true);
	smileySelectMenu.addEventListener('change',function (){ appendSmileyCode(smileyTags[this.selectedIndex-1], ta);document.getElementById('smileySelect').selectedIndex=0;  },true );
	boldButton.addEventListener('click',function (){ appendFormatCode('b', ta); },true);
	urlButton.addEventListener('click',function (){ appendFormatCode('URL', ta); },true);
	furlButton.addEventListener('click',function (){ appendfFormatCode('URL', ta); },true);
	tinyButton.addEventListener('click', function(){window.open ("http://plugin.tinypic.com/plugin/index.php?popts=l,narrow|t,both|c,forum|i,en|s,false", "mywindow","location=1,status=1,scrollbars=1, width=250,height=300"); }, true);
	updatesButton.addEventListener('click', function(){window.open ("http://www.frendz4m.com/forum/showthreads-27-0-3777831--0.htm","mywindow"); }, true);
	imgButton.addEventListener('click',function (){ appendFormatCode('IMG', ta); },true);
	italicButton.addEventListener('click',function (){ appendFormatCode('i', ta); },true);
	underlineButton.addEventListener('click',function (){ appendFormatCode('u', ta); },true);
	promoteButton.addEventListener('click',function (){ appendPromoteHTML(promoteHTML, ta); },true);
	trickButton.addEventListener('click',function (){ appendFormatCode('trick', ta); },true);
	quoteButton.addEventListener('click',function (){ appendFormatCode('quote', ta); },true);

	var formattingToolbarContainer=document.createElement('div');
	var formattingToolbarContainer2=document.createElement('div');
	formattingToolbarContainer.appendChild(boldButton);
	formattingToolbarContainer.appendChild(italicButton);
	formattingToolbarContainer.appendChild(underlineButton);
	formattingToolbarContainer.appendChild(imgButton);
	formattingToolbarContainer.appendChild(urlButton);
	formattingToolbarContainer.appendChild(furlButton);
	formattingToolbarContainer.appendChild(trickButton);
	formattingToolbarContainer2.appendChild(quoteButton);
	formattingToolbarContainer2.appendChild(tinyButton);
	formattingToolbarContainer2.appendChild(updatesButton);
	formattingToolbarContainer2.appendChild(colorlist);
	formattingToolbarContainer2.appendChild(smileySelectMenu);		


	//Identify the textbox of the page		
	ta.parentNode.insertBefore(formattingToolbarContainer, ta);
	ta.parentNode.insertBefore(formattingToolbarContainer2, ta);
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

//Appends the given Format Tag into the selected text
function appendfFormatCode(format, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}
	
	formatOpen="[FURL=  ]";
	formatClose="[/FURL]";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}


//Appends the given Format Tag into the selected text
function appenddevCode(format, tx)
{
	if(tx.value==tx.getAttribute("prompt"))
	{
		tx.focus();
	}
	
	formatOpen="[color="+format+"]";
	formatClose="[/color]";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}

