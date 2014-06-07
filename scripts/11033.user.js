// ==UserScript==
// @name orkut toobar
// @namespace http://www.orkut.com/Scrapbook.aspx?uid=5820333065436516829
// @description toolbar
// @include http://*orkut.com/Scrapbook.aspx*
// @include http://*orkut.com/CommMsgPost.aspx*
// ==/UserScript==
   
window.addEventListener("load", function(e) 
{
	var boldButton = document.createElement('input');
	boldButton.type='button';
	boldButton.value="negrito";
	boldButton.setAttribute("style", "font-weight:bold");

	var italicButton = document.createElement('input');
	italicButton.type='button';
	italicButton.value="italico";
	italicButton.setAttribute("style", "font-style: italic");

	var underlineButton = document.createElement('input');
	underlineButton.type='button';
	underlineButton.value="sublinhado";
	underlineButton.setAttribute("style", "text-decoration:underline");

	var colorlist = document.createElement('select');
	colorlist.name='colorselect';
	colorlist.value='Font color';
	colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");  
	colorvals=new Array("aqua","blue","#f0c0a0","#ffd700","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","#ff00ff","yellow");

	var firstoption=new Option("cor no texto ?");
	firstoption.selected=true;
	colorlist.options.add(firstoption);

	for(var i=0;i<colorarray.length;i++)
	{
		var colorOption=new Option(colorarray[i]);
		colorOption.setAttribute("style", "color:"+colorvals[i]);
		colorlist.options.add(colorOption);
	}


	var coolSmiley=document.createElement('a');
	coolSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_cool.gif'>";
	var sadSmiley=document.createElement('a');
	sadSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_sad.gif'>";
	var angrySmiley=document.createElement('a');
	angrySmiley.innerHTML="<img src='http://images3.orkut.com/img/i_angry.gif'>";
	var smileSmiley=document.createElement('a');
	smileSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_smile.gif'>";
	var winkSmiley=document.createElement('a');
	winkSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_wink.gif'>";
	var bigsmileSmiley=document.createElement('a');
	bigsmileSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_bigsmile.gif'>";
	var surpriseSmiley=document.createElement('a');
	surpriseSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_surprise.gif'>";
	var funnySmiley=document.createElement('a');
	funnySmiley.innerHTML="<img src='http://images3.orkut.com/img/i_funny.gif'>";
	var confuseSmiley=document.createElement('a');
	confuseSmiley.innerHTML="<img src='http://images3.orkut.com/img/i_confuse.gif'>";

	var activeTextArea = document.createElement('a');
	activeTextArea.name="activeAreaName";
	activeTextArea.title="";
	document.forms[1].appendChild(activeTextArea);
	for(i=0;i<	document.getElementsByTagName("textarea").length;i++)
	{
		document.getElementsByTagName("textarea")[i].setAttribute("onfocus","document.getElementsByName('activeAreaName')[0].title=this.name;");
	}

	colorlist.setAttribute("onchange", "format=document.forms[1].colorselect.value;var formatOpen='['+format+']';var formatClose='[/'+format+']';tx = document.getElementsByName(document.getElementsByName('activeAreaName')[0].title)[0];scr= tx.scrollTop;startPos = tx.selectionStart;endPos = tx.selectionEnd;selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose"+"+ tx.value.substring(endPos, tx.value.length);tx.scrollTop = scr;");
	boldButton.setAttribute("onclick",appendFormatCode('b'));
	italicButton.setAttribute("onclick",appendFormatCode('i'));
	underlineButton.setAttribute("onclick",appendFormatCode('u'));
	coolSmiley.setAttribute("onclick",appendSmileyCode( '[8)]'));
	coolSmiley.title="Cool";
	sadSmiley.setAttribute("onclick",appendSmileyCode( '[:(]'));
	sadSmiley.title="Sad";
	angrySmiley.setAttribute("onclick",appendSmileyCode( '[:x]'));
	angrySmiley.title="Angry";
	smileSmiley.setAttribute("onclick",appendSmileyCode( '[:)]'));
	smileSmiley.title="Smile";
	winkSmiley.setAttribute("onclick",appendSmileyCode( '[;)]'));
	winkSmiley.title="Wink";
	bigsmileSmiley.setAttribute("onclick",appendSmileyCode('[:D]'));
	bigsmileSmiley.title="Big Smile";
	surpriseSmiley.setAttribute("onclick",appendSmileyCode( '[:o]'));
	surpriseSmiley.title="Surprised";
	funnySmiley.setAttribute("onclick",appendSmileyCode( '[:P]'));
	funnySmiley.title="Funny";
	confuseSmiley.setAttribute("onclick",appendSmileyCode('[/)]'));
	confuseSmiley.title="Confused";
	
	document.forms[1].appendChild(boldButton);
	document.forms[1].appendChild(italicButton);
	document.forms[1].appendChild(underlineButton);
	document.forms[1].appendChild(colorlist);
	document.forms[1].appendChild(coolSmiley);
	document.forms[1].appendChild(sadSmiley);
	document.forms[1].appendChild(angrySmiley);
	document.forms[1].appendChild(smileSmiley);
	document.forms[1].appendChild(winkSmiley);
	document.forms[1].appendChild(bigsmileSmiley);
	document.forms[1].appendChild(surpriseSmiley);
	document.forms[1].appendChild(funnySmiley);
	document.forms[1].appendChild(confuseSmiley);


},false);

function appendSmileyCode(smiley)
{
		return "tx = document.getElementsByName(document.getElementsByName('activeAreaName')[0].title)[0];startPos = tx.selectionStart;endPos = tx.selectionEnd;tx.value = tx.value.substring(0, startPos)+'"+smiley+"'+ tx.value.substring(endPos, tx.value.length)";

}

function appendFormatCode(format)
{
    formatOpen="["+format+"]";
    formatClose="[/"+format+"]";     
		return "tx = document.getElementsByName(document.getElementsByName('activeAreaName')[0].title)[0];scr= tx.scrollTop;startPos = tx.selectionStart;endPos = tx.selectionEnd;selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);tx.value = tx.value.substring(0, startPos)+'"+formatOpen+"'+selectedSubString+'"+formatClose+"'"+"+ tx.value.substring(endPos, tx.value.length);tx.scrollTop = scr;";
}

