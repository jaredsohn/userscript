// ==UserScript==

// @name           Quick Toolbar
// @namespace      Scout.com

// @include        http://mbd.scout.com/mb.aspx?*t=*
// @include	   http://forums.scout.com/mb.aspx?s=*
// ==/UserScript==

window.setTimeout(function(){

var ta = document.getElementById("quickreplytext");
addQuickToolBar(ta,"http://media.scout.com/media/image/56/",true);


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var textbox = document.getElementById("quickreplytext");

if(textbox)
{
	var qqAnchor = document.createElement("a");
	qqAnchor.name="QQ";
	textbox.parentNode.appendChild(qqAnchor);

	var names = getElementsByClassName("username",document);
	var messages = getElementsByClassName("messagebody",document);
	var actionLinks = getElementsByClassName("actionlinks",document);
	var place = 1;
	var link;

	for(var i=0; i<names.length; i++)
	{
		link = document.createElement("a");
		link.href="#QQ";
		link.id = i+"QQ";
		link.innerHTML="Quick Quote";

		actionLinks[place].innerHTML+=" | ";
		actionLinks[place].appendChild(link);
		place+=2;

		link = document.getElementById(i+"QQ");
		link.addEventListener("click",qq,true);
	}
}

function qq()
{
	var box = document.getElementById("quickreply");
	if(box)
		box.style.display="block";
	
	var id = parseInt(this.id);
	var message ="";
	message = "<br><blockquote dir=\"ltr\"><strong>"+names[id].firstChild.firstChild.innerHTML+" wrote:</strong> "+messages[id].innerHTML+"</blockquote>\n";
	
	var re = /(<img([^>]+)>)/gi;
	var images = message.match(re);
	if(images)
	{
		for(var i=0; i<images.length; i++)
		{
			images[i]=images[i].substring(0,images[i].length-1)+"/>";
			message = message.replace(/(<img([^>]+)>)/i,images[i]);
		}
	}

	textbox.focus();
	textbox.value += message;
};


},2000);

function addQuickToolBar(textarea,path,showPreview)
{
//Scout.com greasemonkey emoticon path
var ePath = "http://media.scout.com/media/forums/emoticons/"
var boxWidth = document.defaultView.getComputedStyle(textarea,"").getPropertyValue("width");
var css = "#QT_ToolBox a{border:1px solid #B7B7B7;display:inline-block;} #QT_ToolBox a:hover {background-color:#E5E5E5; border:1px solid #838383;}";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) 
{
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}
var container = document.createElement("center");
var toolBox = document.createElement("div");
toolBox.style.width="98%";//boxWidth;
toolBox.style.background="#B7B7B7";
toolBox.style.border="1px solid #868686";
toolBox.style.textAlign="left";
toolBox.style.padding="1px 0px 1px 0px";
toolBox.id="QT_ToolBox";

//***********************
//IMAGE AND LINK BUTTONS
//***********************
var addImage = document.createElement("a");
addImage.innerHTML="<img alt=\"Create Image\" title=\"Create Image\" src=\""+path+"562338.gif\"/>";
addImage.id="QT_ImageButton";


var addLink = document.createElement("a");
addLink.innerHTML="<img alt=\"Create Link\" title=\"Create Link\" src=\""+path+"562340.gif\"/>";
addLink.id="QT_LinkButton";


//***********************
//TEXT FORMATTING BUTTONS
//***********************
var addBold = document.createElement("a");
addBold.innerHTML="<img alt=\"Bold\" title=\"Bold\" src=\""+path+"562341.gif\"/>";
addBold.id="QT_BoldButton";
addBold.name="b";

var addItalics = document.createElement("a");
addItalics.innerHTML="<img alt=\"Italic\" title=\"Italic\" src=\""+path+"562342.gif\"/>";
addItalics.id="QT_ItalicsButton";
addItalics.name="i";

var addUnderline = document.createElement("a");
addUnderline.innerHTML="<img alt=\"Underline\" title=\"Underline\" src=\""+path+"562343.gif\"/>";
addUnderline.id="QT_UnderlineButton";
addUnderline.name="u";

//***********************
//PREVIEW BUTTON
//***********************
var previewButton = document.createElement("a");
previewButton.innerHTML="<img alt=\"Preview Post\" src=\""+path+"562350.gif\"/>&nbsp;";
previewButton.id="QT_PreviewButton";

//***********************
//EMOTICON DROP DOWN BUTTONS
//***********************
var addEmoticon = document.createElement("a");
addEmoticon.innerHTML="<img alt=\"Add Emoticon\" title=\"Add Emoticon\" src=\""+path+"562344.gif\"/>";
addEmoticon.id="QT_EmoticonButton";

var emoticonBox = document.createElement("div");
emoticonBox.style.position="absolute";
emoticonBox.style.width="125px";
emoticonBox.style.maxHeight="100px";
emoticonBox.style.display="none";
emoticonBox.style.overflow="auto";
emoticonBox.style.backgroundColor="#E5E5E5";
emoticonBox.style.border="1px solid #838383";
addEmoticonGrid();

//***********************
//FONT FORMATTING SELECT BOXES
//***********************
var addFontColor = document.createElement("select");
addFontColor.innerHTML= getFontColorOptions();
addFontColor.name="color";
addFontColor.style.font="11px Tahoma,Verdana,sans-serif";

var addFontSize = document.createElement("select");
addFontSize.innerHTML= getFontSizeOptions();
addFontSize.name="size";
addFontSize.style.font="11px Tahoma,Verdana,sans-serif";

var addFontFace = document.createElement("select");
addFontFace.innerHTML= getFontFaceOptions();
addFontFace.style.font="11px Tahoma,Verdana,sans-serif";
addFontFace.name="face";

//***********************
//TEXT ALIGN BUTTONS
//***********************

var  addLeftAlign = document.createElement("a");
addLeftAlign.innerHTML="<img alt=\"Justify Left\" title=\"Justify Left\" src=\""+path+"562345.gif\"/>";
addLeftAlign.id="QT_LeftAlignButton";
addLeftAlign.name="left";

var  addRightAlign = document.createElement("a");
addRightAlign.innerHTML="<img alt=\"Justify Right\" title=\"Justify Right\" src=\""+path+"562347.gif\"/>";
addRightAlign.id="QT_RightAlignButton";
addRightAlign.name="right";

var  addCenterAlign = document.createElement("a");
addCenterAlign.innerHTML="<img alt=\"Justify Center\" title=\"Justify Center\" src=\""+path+"562348.gif\"/>";
addCenterAlign.id="QT_CenterAlignButton";
addCenterAlign.name="center";

var  addJustifyAlign = document.createElement("a");
addJustifyAlign.innerHTML="<img alt=\"Justify Full\" title=\"Justify Full\" src=\""+path+"562349.gif\"/>";
addJustifyAlign.id="QT_LeftAlignButton";
addJustifyAlign.name="justify";

//***********************
//SEPERATOR
//***********************
var separator = document.createElement("img");
separator.src=path+"562351.gif";



//***********************
//EVENT LISTENERS
//***********************
addImage.addEventListener("click",imagePrompt,true);
addLink.addEventListener("click",linkPrompt,true);
addBold.addEventListener("click",addTag,true);
addItalics.addEventListener("click",addTag,true);
addUnderline.addEventListener("click",addTag,true);
addEmoticon.addEventListener("click",toggleEmoticons,true);
previewButton.addEventListener("click",previewPost,true);
addFontSize.addEventListener("change",formatFont,true);
addFontColor.addEventListener("change",formatFont,true);
addFontFace.addEventListener("change",formatFont,true);
addLeftAlign.addEventListener("click",addAlign,true);
addRightAlign.addEventListener("click",addAlign,true);
addCenterAlign.addEventListener("click",addAlign,true);
addJustifyAlign.addEventListener("click",addAlign,true);


//***********************
//ADDING TOOLS
//***********************
toolBox.appendChild(addImage);
toolBox.appendChild(addLink);
toolBox.appendChild(separator.cloneNode(false));
toolBox.appendChild(addBold);
toolBox.appendChild(addItalics);
toolBox.appendChild(addUnderline);
toolBox.appendChild(separator.cloneNode(false));
toolBox.appendChild(addEmoticon);
addEmoticon.appendChild(emoticonBox);
toolBox.appendChild(separator.cloneNode(false));
toolBox.appendChild(addFontFace);
toolBox.appendChild(addFontSize);
toolBox.appendChild(addFontColor);
toolBox.appendChild(separator);
toolBox.appendChild(addLeftAlign);
toolBox.appendChild(addRightAlign);
toolBox.appendChild(addCenterAlign);
toolBox.appendChild(addJustifyAlign);



container.appendChild(toolBox);
textarea.parentNode.insertBefore(container,textarea);

container.appendChild(textarea);

var preview = document.createElement("div");
var previewText = document.createElement("div");
preview.style.border="1px solid #B7B7B7";
preview.style.backgroundColor="white";
preview.style.textAlign="right";
preview.style.padding="2px 0px 2px 0px";
preview.style.width="98%";//boxWidth;
previewText.style.textAlign="left";
previewText.style.maxHeight="200px";
previewText.style.overflow="auto";




preview.appendChild(previewButton);
preview.appendChild(previewText);
if(showPreview)
	container.appendChild(preview);

function addAlign()
{
	var type = this.name;
	if(textarea.selectionStart>=0)
	{
		wrapSelection("<div align=\""+type+"\">","</div>");
	}
	else
	{
		textarea.value+="<div align=\""+type+"\"></div>";
	}

}

function formatFont()
{
	var color = this.options[this.selectedIndex].value;
	var type = this.name;
	if(color!="")
	{
		if(textarea.selectionStart>=0)
		{
			wrapSelection("<font "+type+"=\""+color+"\">","</font>");
		}
		else
		{
			textarea.value+="<font "+type+"=\""+color+"\"></font>";
		}
		this.selectedIndex = 0;
	}
	
};

function addEmoticonGrid()
{
	addEmoticonButton("biggrin.gif");
	addEmoticonButton("confused.gif");
	addEmoticonButton("cool.gif");
	addEmoticonButton("eek.gif");
	addEmoticonButton("frown.gif");
	addEmoticonButton("mad.gif");
	addEmoticonButton("redface.gif");
	addEmoticonButton("rolleyes.gif");
	addEmoticonButton("surprised.gif");
	addEmoticonButton("tongue.gif");
	addEmoticonButton("wink.gif");
	addEmoticonButton("pirate.gif");
	addEmoticonButton("flushed.gif");
	addEmoticonButton("devil.gif");
	addEmoticonButton("banghead.gif");
	addEmoticonButton("blah2.gif");
	addEmoticonButton("bored1.gif");
	addEmoticonButton("crazy.gif");
	addEmoticonButton("disbelief.gif");
	addEmoticonButton("eek1.gif");
	addEmoticonButton("excited.gif");
	addEmoticonButton("noidea.gif");
	addEmoticonButton("ohlord.gif");
	addEmoticonButton("192/thumbs.gif");
	addEmoticonButton("192/dancindeac.gif");
	addEmoticonButton("192/wf.gif");
	addEmoticonButton("192/pray.gif");
	addEmoticonButton("192/eusa_clap.gif");
	addEmoticonButton("192/nono.gif");
	addEmoticonButton("192/pimp.gif");
	addEmoticonButton("192/soulja.gif");
	addEmoticonButton("192/26.gif");
};

function addEmoticonButton(filename)
{
	var src= ePath+filename;
	var eButton = document.createElement("a");
	eButton.innerHTML="<img alt=\""+filename+"\" src=\""+src+"\"/>";
	eButton.name=filename;
	eButton.style.border="none";
	eButton.style.padding="3px";
	eButton.addEventListener("click",insertEmoticon,true);
	emoticonBox.appendChild(eButton);
	
};

function insertEmoticon()
{
	emoticonBox.style.display="none";
	var file = this.name;
	var src= ePath+file;
	textarea.focus();
	insert("<img src=\""+src+"\"/>");
};

function toggleEmoticons()
{
	if(emoticonBox.style.display=="none")
		emoticonBox.style.display="block";
	else
		emoticonBox.style.display="none";
};

function previewPost()
{
	var text = textarea.value;
	text=text.replace(/\n/gi,"<br>");
	previewText.innerHTML = text;
	textarea.focus();	
};

function wrapSelection(front,back)
{

	var before, after, selection;

    	before= textarea.value.substring(0, textarea.selectionStart);
    	selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
   	after = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
    	textarea.value= String.concat(before,front, selection, back, after);

}

function insert(toAdd)
{
	if (textarea.selectionStart || textarea.selectionStart == '0')
	{
		var caretPos = textarea.selectionStart;
		textarea.focus();
		textarea.value=textarea.value.substring(0,caretPos)+toAdd+textarea.value.substring(caretPos);
	}
	else
	{
		textarea.focus();
		textarea.value+=toAdd;	
	}

};


function imagePrompt()
{
	var src = prompt("Enter image url:","");
	if(src!=""&&src)
	{	
		insert("<img src=\""+src+"\"/>");
	}
	
	
};

function linkPrompt()
{
	var href = prompt("Enter url:","");
	if (href != '' && href!= null&&href)
	{
		urlText = prompt("Enter url text:",href);
		if(urlText==""||!urlText)
			urlText=href;

		insert("<a href=\""+href+"\" target=\"_blank\">"+urlText+"</a>");
	}
};

function addTag()
{
	var tag = this.name;
	wrapSelection("<"+tag+">","</"+tag+">");
};

function getFontFaceOptions()
{
var options =  '<option value="">Font</option><option value="Verdana">Verdana</option>'+
'<option value="Arial">Arial</option>'+
'<option value="Times">Times</option>'+
'<option value="Georgian">Georgian</option>'+
'<option value="Sans-serif">Sans-serif</option>'+
'<option value="Courier">Courier</option>'+
'<option value="Serif">Serif</option>';
return options;
};

function getFontColorOptions()
{
var options = '<option value="">Color</option><option value="#000000" style="background-color: Black; color: rgb(255, 255, 255);">Black</option>'+
'<option value="#808080" style="background-color: Gray;">Gray</option>'+
'<option value="#A9A9A9" style="background-color: DarkGray;">DarkGray</option>'+
'<option value="#D3D3D3" style="background-color: LightGrey;">LightGray</option>'+
'<option value="#FFFFFF" style="background-color: White;">White</option>'+
'<option value="#7FFFD4" style="background-color: Aquamarine;">Aquamarine</option>'+
'<option value="#0000FF" style="background-color: Blue;">Blue</option>'+
'<option value="#000080" style="background-color: Navy; color: rgb(255, 255, 255);">Navy</option>'+
'<option value="#800080" style="background-color: Purple; color: rgb(255, 255, 255);">Purple</option>'+
'<option value="#FF1493" style="background-color: DeepPink;">DeepPink</option>'+
'<option value="#EE82EE" style="background-color: Violet;">Violet</option>'+
'<option value="#FFC0CB" style="background-color: Pink;">Pink</option>'+
'<option value="#006400" style="background-color: DarkGreen; color: rgb(255, 255, 255);">DarkGreen</option>'+
'<option value="#008000" style="background-color: Green; color: rgb(255, 255, 255);">Green</option>'+
'<option value="#9ACD32" style="background-color: YellowGreen;">YellowGreen</option>'+
'<option value="#FFFF00" style="background-color: Yellow;">Yellow</option>'+
'<option value="#FFA500" style="background-color: Orange;">Orange</option>'+
'<option value="#FF0000" style="background-color: Red;">Red</option>'+
'<option value="#A52A2A" style="background-color: Brown;">Brown</option>'+
'<option value="#DEB887" style="background-color: BurlyWood;">BurlyWood</option>'+
'<option value="#F5F5DC" style="background-color: Beige;">Beige</option>';
return options;
};


function getFontSizeOptions()
{
var options = '<option value="">Size</option><option value="1">1</option>'+
'<option value="2">2</option>'+
'<option value="3">3</option>'+
'<option value="4">4</option>'+
'<option value="5">5</option>'+
'<option value="6">6</option>';
return options;
};



}