// ==UserScript==
// @name Orkut-Formatting-toolbar V0.6
// @namespace http://technowise.blogspot.com
// @description Adds a toolbar for formatting and inserting smilies in orkut(for scrap-book and community messages).
// @include http://*orkut.com/Scrapbook.aspx*
// @include http://*orkut.com/CommMsgPost.aspx*
// ==/UserScript==
   
window.addEventListener("load", function(e) 
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
		colorOption.setAttribute("style", "color:"+colorvals[i]);
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
		smileyOption.setAttribute("style", "background-image:url(http://images3.orkut.com/img/i_"+smileyGifs[i]+");background-repeat:no-repeat; background-position:bottom left; padding-left:20px;");
		smileySelectMenu.options.add(smileyOption);
	}


	//The glitter-text select menu cration
	var glitterSelectMenu=document.createElement('select');
	glitterSelectMenu.id='glitterSelect';
	glitterSelectMenu.value='Glitter Text';
	glitterSelectMenu.setAttribute("style","width:105px; height:18px;");
	glitterGifDirs=new Array("blush_noise", "sc", "love","gold","spblue","disco","mixed","smiley", "tpurp");

	var glitterSelectLabel=new Option("Glitter Text");
	glitterSelectLabel.selected=true;
	glitterSelectLabel.disabled="disabled";
	glitterSelectMenu.options.add(glitterSelectLabel);

	
	for(i=0;i<glitterGifDirs.length;i++)
	{
		var glitterOption=new Option();
		glitterOption.setAttribute("style", "background-image:url(http://208.101.23.249/text/"+glitterGifDirs[i]+"/a.gif);background-repeat:no-repeat; background-position:bottom left; width:60px;  height:50px;"); // width:60px; height:60px; 
		glitterSelectMenu.options.add(glitterOption);
	}
	//end of the glitter-text stuff
	
	
	//Assign the anchor tags to identify the active text-area
	var activeTextArea = document.createElement('a');
	activeTextArea.name="activeAreaName";
	activeTextArea.title="";
	document.forms[1].appendChild(activeTextArea);
	for(i=0;i<document.getElementsByTagName("textarea").length;i++)
	{
		document.getElementsByTagName("textarea")[i].setAttribute("onfocus","document.getElementsByName('activeAreaName')[0].title=this.name;");
	}

	colorlist.addEventListener('change', function(){ appendFormatCode(document.getElementById('colorselect').value); document.getElementById('colorselect').selectedIndex=0; },true);
	smileySelectMenu.addEventListener('change',function (){ appendSmileyCode(smileyTags[document.getElementById('smileySelect').selectedIndex-1]);document.getElementById('smileySelect').selectedIndex=0;  },true );
	glitterSelectMenu.addEventListener('change',function (){ appendGlitterCode(glitterGifDirs[document.getElementById('glitterSelect').selectedIndex-1]); document.getElementById('glitterSelect').selectedIndex=0;  },true );
	boldButton.addEventListener('click',function (){ appendFormatCode('b'); },true);
	italicButton.addEventListener('click',function (){ appendFormatCode('i'); },true);
	underlineButton.addEventListener('click',function (){ appendFormatCode('u'); },true);
	

	//Identify the textbox of the page		
	if(document.location.href.indexOf("Scrapbook.aspx")!=-1)
	{
		document.getElementsByName('activeAreaName')[0].title="scrapText";
		messageTextBox=document.getElementById("scrapInputContainer");		
		messageTextBox.parentNode.insertBefore(boldButton,messageTextBox);
		messageTextBox.parentNode.insertBefore(italicButton,messageTextBox);
		messageTextBox.parentNode.insertBefore(underlineButton,messageTextBox);
		messageTextBox.parentNode.insertBefore(colorlist,messageTextBox);
		messageTextBox.parentNode.insertBefore(smileySelectMenu,messageTextBox);
		messageTextBox.parentNode.insertBefore(glitterSelectMenu,messageTextBox);
	}
	else
	{
		document.getElementsByName('activeAreaName')[0].title="messageBody";
		messageTextBox=document.getElementById("messageBody").parentNode;
		messageTextBox.parentNode.insertBefore(boldButton,messageTextBox);
		messageTextBox.parentNode.insertBefore(italicButton,messageTextBox);
		messageTextBox.parentNode.insertBefore(underlineButton,messageTextBox);
		messageTextBox.parentNode.insertBefore(colorlist,messageTextBox);
		messageTextBox.parentNode.insertBefore(smileySelectMenu,messageTextBox);

	}


},false);


//Appends the given smiley to the current cursor position in the current text-area
function appendSmileyCode(smiley)
{
	tx = document.getElementsByName(document.getElementsByName('activeAreaName')[0].title)[0];
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	tx.value = tx.value.substring(0, startPos)+smiley+tx.value.substring(endPos, tx.value.length);
}

//Appends the given Format Tag into the selected text
function appendFormatCode(format)
{
	formatOpen="["+format+"]";
	formatClose="[/"+format+"]";
	tx = document.getElementsByName(document.getElementsByName('activeAreaName')[0].title)[0];
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}



//Appends the given Glitter code for the selected text
function appendGlitterCode(gDirName)
{
	var glitterCode="";
	tx = document.getElementsByName(document.getElementsByName('activeAreaName')[0].title)[0];
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);

	if(selectedSubString.length>19)
	{
		alert("Only a maximum of 19 characters may be selected for glitter text\n Please select lesser characters");
		return;
	}

	for(var i=0;i<selectedSubString.length; i++)
	{
		if(isAlpha(selectedSubString.charAt(i)) )//If its a aphabet, add the corresponding glitter image for the alphabet
		{
			glitterCode= glitterCode + "<img src=http://text.glitter-graphics.net/"+gDirName+"/"+selectedSubString.charAt(i).toLowerCase()+".gif>";
		}
		else
		if(selectedSubString.charAt(i)==' ') //If its a space
		{
			glitterCode=glitterCode+"<img src=http://dl3.glitter-graphics.net/empty.gif width=20 border=0>";
		}
		else
		if(selectedSubString.charAt(i)=='\n') //If its a newline character
		{
			glitterCode=glitterCode+"<br>";
		}


	}
	
	tx.value = tx.value.substring(0, startPos)+glitterCode+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}


function isAlpha(val)
{
// True if val is a single alphabetic character.
var re = /^([a-zA-Z])$/;
return (re.test(val));
}




