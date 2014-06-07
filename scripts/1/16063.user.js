// ==UserScript==
// @name           arunim's toolbar for orkut scraps and community posts
// @namespace      arunim
// @description Adds a toolbar for formatting and inserting many smilies in orkut(scrap-book and community). It also features a toolbar button for inserting colorful and glittering text into scrap-book. Changes from org orkut-toolbar: 1.) option to change the text size, 2.) more colors added 3.) background color of the scraps can be changed..// @provided by    arunim
// @include http://www.orkut.com/Scrapbook.aspx*
// @include http://www.orkut.com/CommMsgPost.aspx*
// @include http://www.orkut.co.in/Scrapbook.aspx*
// @include http://www.orkut.co.in/CommMsgPost.aspx*
// @maintained by  Copyright  2005-2008, arunim.\nAll Right Reserved.\n\nSite developed and Maintained by arunim.
// ==/UserScript==

var currentTextArea=document.getElementsByTagName('textarea')[0];

//Glitter-Text Box - start
var glitterToolBox = document.createElement('div');
glitterToolBox.setAttribute("style","background-color: #FAFBFC; display: none; z-index: 10;position: absolute; border: 3px #cdbdcd solid;");

var br=0; /*For row break in display*/
for(i=0;i<36;i++)
{
	var glitterOption=document.createElement('img');
	glitterOption.src="http://s240.photobucket.com/albums/ff289/otext/"+i+"a.gif";
	glitterOption.title=i;
	glitterOption.setAttribute("style","height: 40; width: 40; border-style: solid; border-width:2px;color: #fff;");
	glitterOption.addEventListener("click",function(){
	appendGlitterCode(this.title, currentTextArea);
	glitterToolBox.style.display="none";
	},true);
	glitterOption.addEventListener("mouseover",function(){
	this.setAttribute("style","height: 40; width: 40;border-style: solid;border-width:2px; color: silver;");
	},true);
	glitterOption.addEventListener("mouseout",function(){
	this.setAttribute("style","height: 40; width: 40;border-style: solid;border-width:2px;color: #fff;");
	},true);
	glitterToolBox.appendChild(glitterOption);
	br++;
	if(br>8) //Add a row break after 9 glitter pics
	{
		glitterToolBox.appendChild(document.createElement("br"));
		br=0;
	}
}
//Glitter-Text Box - end

//SmileyBox - start
var smileyToolBox = document.createElement('div');
smileyToolBox.setAttribute("style","background-color: #FAFBFC; display: none; z-index: 10;position: absolute; border: 3px #cdbdcd solid;");

var smIndex=0;

for(i=0;i< 6; i++)
{
	for(j=0;j< 10; j++)
	{
		var smileyOption=document.createElement('img');
		smileyOption.src="http://s240.photobucket.com/albums/ff289/otext/smiley/sm"+smIndex+".gif";
		smileyOption.setAttribute("style","border-style: solid; border-width:2px;color: #fff;");
		smileyOption.addEventListener("click",function(){
		appendSmileyCode("<img src="+this.src+">", currentTextArea);
		smileyToolBox.style.display="none";
		},true);

		smileyOption.addEventListener("mouseover",function(){
		this.setAttribute("style","border-style: solid;border-width:2px; color: silver;");
		},true);

		smileyOption.addEventListener("mouseout",function(){
		this.setAttribute("style","border-style: solid;border-width:2px;color: #fff;");
		},true);
		smileyToolBox.appendChild(smileyOption);
		smIndex++;
	}
	smileyToolBox.appendChild(document.createElement('br'));
}
//SmileyBox - end

//Add the two div elements before the current page.
document.getElementById("mboxfull").appendChild(smileyToolBox);
document.getElementById("mboxfull").appendChild(glitterToolBox);

//Append toolbar buttons above all the text-areas
window.addEventListener("load", function(e) 
{
	var ta;
	for(i=0;i<document.getElementsByTagName('textarea').length;i++) {
		ta = document.getElementsByTagName('textarea')[i];
		appendToolBar(ta);
	}
},false);

// Hide the glitter select box
// when user clicks on document
document.addEventListener('click', function (e) {  
	if(glitterToolBox.style.display=="block")
	{
		glitterToolBox.style.display="none";
	}	

	if(smileyToolBox.style.display=="block")
	{
		smileyToolBox.style.display="none";
	}	
}, true);

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

//common Color Array
	scolorarray= new Array("black","navy","darkblue","mediumblue","blue","darkgreen","green","teal","darkcyan","deepskyblue","darkturquoise","mediumspringgreen","lime","springgreen","aqua","cyan","midnightblue","dodgerblue","lightseagreen","forestgreen","seagreen","darkslategray","limegreen","mediumseagreen","turquoise","royalblue","steelblue","darkslateblue","mediumturquoise","indigo","darkolivegreen","cadetblue","cornflowerblue","mediumaquamarine","dimgray","slateblue","olivedrab","slategray","lightslategrey","mediumslateblue","lawngreen","chartreuse","aquamarine","maroon","purple","olive","gray","skyblue","lightskyblue","blueviolet","darkred","darkmagenta","saddlebrown","darkseagreen","lightgreen","mediumpurple","darkviolet","palegreen","darkorchid","yellowgreen","sienna","brown","darkgray","lightblue","greenyellow","paleturquoise","lightsteelblue","powderblue","firebrick","darkgoldenrod","mediumorchid","rosybrown","darkkhaki","silver","mediumvioletred","indianred","peru","chocolate","tan","lightgrey","thistle","orchid","goldenrod","palevioletred","crimson","gainsboro","plum","burlywood","lightcyan","lavender","darksalmon","violet","palegoldenrod","lightcoral","khaki","aliceblue","honeydew","azure","sandybrown","wheat","beige","whitesmoke","mintcream","ghostwhite","salmon","antiquewhite","linen","lightgoldenrodyellow","oldlace","red","fuchsia","magenta","deeppink","orangered","tomato","hotpink","coral","darkorange","lightsalmon","orange","lightpink","pink","gold","peachpuff","navajowhite","moccasin","bisque","mistyrose","blanchedalmond","papayawhip","lavenderblush","seashell","cornsilk","lemonchiffon","floralwhite","snow","yellow","lightyellow","ivory","white");
	
colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");

//The Background Color select menu creation
	var bgcolorlist = document.createElement('select');
	bgcolorlist.id='bgcolorselect';
	bgcolorlist.value='Background color';
	
	var bgfirstoption=new Option("Background Color");
	bgfirstoption.selected=true;
	bgfirstoption.disabled="disabled";
	bgcolorlist.options.add(bgfirstoption);

for(var i=0;i<scolorarray.length;i++)
	{
		var bgcolorOption=new Option(scolorarray[i]);
		bgcolorOption.setAttribute("style", "color:"+scolorarray[i]);
		bgcolorlist.options.add(bgcolorOption);
	}

//The Text Color select menu creation for community
var colorlist = document.createElement('select');
	colorlist.id='colorselect';
	colorlist.value='Font color';
	
	var firstoption=new Option("Color");
	firstoption.selected=true;
	firstoption.disabled="disabled";
	colorlist.options.add(firstoption);

	for(var i=0;i<colorarray.length;i++)
	{
		var colorOption=new Option(colorarray[i]);
		colorOption.setAttribute("style", "color:"+colorarray[i]);
		colorlist.options.add(colorOption);
	}

//The text color select menu creation for scrapbook
	var scolorlist = document.createElement('select');
	scolorlist.id='scolorselect';
	scolorlist.value='Font color';

	var sfirstoption=new Option("Color");
	sfirstoption.selected=true;
	sfirstoption.disabled="disabled";
	scolorlist.options.add(sfirstoption);

	for(var i=0;i<scolorarray.length;i++)
	{
		var scolorOption=new Option(scolorarray[i]);
		scolorOption.setAttribute("style", "color:"+scolorarray[i]);
		scolorlist.options.add(scolorOption);
	}
	
	
//The text size select menu creation
	var sizelist = document.createElement('select');
	sizelist.id='sizeselect';
	sizelist.value='Font size';
	
	sizearray= new Array("0","2","4","6","8","10","12","14","16","18","20","22","24","26","28","30","32","34","36","38","40","42","44","46","48","50","52","54","56","58","60","62","64","66","68","70","72","74","76","78","80","82","84","86","88","90","92","94","96","98","100","102","104","106","108","110","112","114","116","118","120","122","124","126","128","130","132","134","136","138","140","142","144","146","148","150");
	
	var sizefirstoption=new Option("Size");
	sizefirstoption.selected=true;
	sizefirstoption.disabled="disabled";
	sizelist.options.add(sizefirstoption);

	for(var i=0;i<sizearray.length;i++)
	{
		var sizeOption=new Option(sizearray[i]);
		sizelist.options.add(sizeOption);
	}

//The smiley select menu creation
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
		
	smileySelectMenu.addEventListener('change',function (){ appendSmileyCode(smileyTags[this.selectedIndex-1], ta);document.getElementById('smileySelect').selectedIndex=0;  },true );
	
//event listener for scrapbook background color menu
	bgcolorlist.addEventListener('change', function(){ appendbgColorCode(this.value, ta); document.getElementById('bgcolorselect').selectedIndex=0; },true);
	
//event listener for scrapbook color menu
	scolorlist.addEventListener('change', function(){ appendColorCode(this.value, ta); document.getElementById('scolorselect').selectedIndex=0; },true);
	
//event listener for community color menu
	colorlist.addEventListener('change', function(){ appendFormatCode(this.value, ta); document.getElementById('colorselect').selectedIndex=0; },true);
	
	sizelist.addEventListener('change', function(){ appendSizeCode(this.value, ta); document.getElementById('sizeselect').selectedIndex=0; },true);
	
	boldButton.addEventListener('click',function (){ appendFormatCode('b', ta); },true);
	italicButton.addEventListener('click',function (){ appendFormatCode('i', ta); },true);
	underlineButton.addEventListener('click',function (){ appendFormatCode('u', ta); },true);
	
	var glitterButton = document.createElement('input');
	glitterButton.type='button';
	glitterButton.value='Glitter Text';
	glitterButton.addEventListener('click',function() { currentTextArea=ta; showObject(this, glitterToolBox); },true);

	var smileyButton = document.createElement('input');
	smileyButton.type='button';
	smileyButton.value='More Smileys';
	smileyButton.addEventListener('click',function() { currentTextArea=ta; showObject(this, smileyToolBox); },true);


	var formattingToolbarContainer=document.createElement('div');
	if(document.location.href.indexOf("Scrapbook.aspx")!=-1)
	{
	formattingToolbarContainer.appendChild(bgcolorlist);
	}
	formattingToolbarContainer.appendChild(boldButton);
	formattingToolbarContainer.appendChild(italicButton);
	formattingToolbarContainer.appendChild(underlineButton);
	if(document.location.href.indexOf("Scrapbook.aspx")!=-1)
	{
	formattingToolbarContainer.appendChild(scolorlist);
	formattingToolbarContainer.appendChild(sizelist);
	}
	else
	{
	formattingToolbarContainer.appendChild(colorlist);
	}
	formattingToolbarContainer.appendChild(smileySelectMenu);

//Identify the textbox of the page
	if(document.location.href.indexOf("Scrapbook.aspx")!=-1)
	{
		formattingToolbarContainer.appendChild(glitterButton);
		formattingToolbarContainer.appendChild(smileyButton);
	}
	ta.parentNode.insertBefore(formattingToolbarContainer, ta);
}

//Appends the given smiley to the current cursor position in the current text-area
function appendSmileyCode(smiley, tx)
{
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	tx.value = tx.value.substring(0, startPos)+smiley+tx.value.substring(endPos, tx.value.length);
}

//sets the background color of the selected text
function appendbgColorCode(format, tx)
{
formatOpen="<div id=\"KeG\" style=\"background-color:"+format+"\">";
	formatClose="</div>";
	scr= tx.scrollTop;
	tx.value = formatOpen+tx.value+formatClose;
	
	/*startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;*/
}

//sets the color of the selected text
function appendColorCode(format, tx)
{
formatOpen="<font style= \"color:"+format+"\" >";
	formatClose="</font>";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}

//sets the size of the selected text
function appendSizeCode(format, tx)
{
formatOpen="<font style= \"font-size:"+format+"\" >";
	formatClose="</font>";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}

//Appends the given Format Tag into the selected text
function appendFormatCode(format, tx)
{
	formatOpen="["+format+"]";
	formatClose="[/"+format+"]";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);
	tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose+tx.value.substring(endPos, tx.value.length);
	tx.scrollTop = scr;
}

//Appends the given Glitter code for the selected text
function appendGlitterCode(imgIndex, tx)
{
	var glitterCode="";
	scr= tx.scrollTop;
	startPos = tx.selectionStart;
	endPos = tx.selectionEnd;
	selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);

	if(selectedSubString.length>19)
	{
		alert("Only a maximum of 19 characters may be selected for glitter text\n Please select lesser characters");
		return;
	}
	else
	if(selectedSubString.length == 0 )
	{	
		alert("Please select some text to glitter.");
		return;
	}

	for(var i=0;i<selectedSubString.length; i++)
	{
		if(isAlpha(selectedSubString.charAt(i)) )//If its a aphabet, add the corresponding glitter image for the alphabet
		{
			glitterCode= glitterCode + "<img src=s240.photobucket.com/albums/ff289/otext/"+imgIndex+selectedSubString.charAt(i).toLowerCase()+".gif>";
		}
		else
		if(selectedSubString.charAt(i)==' ') //If its a space
		{
			glitterCode=glitterCode+"<img src=s240.photobucket.com/albums/ff289/otext/empty.gif width=20 border=0>";
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
// True if val is a single alphabetic character
var re = /^([a-zA-Z])$/;
return (re.test(val));
}

//Show the divObj relative to cObj
function showObject(cObj, divObj)
{
	var pos  = GetPos(cObj);
	var top  = pos[0];
	var left = pos[1];
	divObj.style.top  = top + 18;
	divObj.style.left = left - 2;
	divObj.style.visibility = "visible";		
	divObj.style.display="block";
}

function GetPos(obj) 
{
	var top  = obj.offsetTop;
	var left = obj.offsetLeft;
	var parent = obj;
	while(parent = parent.offsetParent)
	{
		top  += parent.offsetTop;
		left += parent.offsetLeft;
	}
	return [top, left];
}