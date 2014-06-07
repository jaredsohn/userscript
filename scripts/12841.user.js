// ==UserScript==
// @name Orkut Formatting Toobar
// @namespace http://www.jawaji.com/
// @description Orkut formatting toolbar is a very handy toolbar that appears just above the textbox for easy formatting.  This toolbar automatically appears on above the textbox on the Scrapbook and Message pages.
// @include http://*orkut.com/Scrapbook.aspx*
// @include http://*orkut.com/CommMsgPost.aspx*
// ==/UserScript==


window.addEventListener("load", function(e) 
{
	var ta;
	for(i=0;i<document.getElementsByTagName('textarea').length;i++) {
		ta = document.getElementsByTagName('textarea')[i];
		displayTB(ta.getAttribute('id'));
	}
	
},false);

function appendSmileyCode(smiley, tx)
{
		return "tx = document.getElementById('" + tx + "');startPos = tx.selectionStart;endPos = tx.selectionEnd;tx.value = tx.value.substring(0, startPos)+'"+smiley+"'+ tx.value.substring(endPos, tx.value.length)";
}

function appendFormatCode(format, tx)
{
    formatOpen="["+format+"]";
    formatClose="[/"+format+"]";     
		return "tx = document.getElementById('" + tx + "');scr= tx.scrollTop;startPos = tx.selectionStart;endPos = tx.selectionEnd;selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);tx.value = tx.value.substring(0, startPos)+'"+formatOpen+"'+selectedSubString+'"+formatClose+"'"+"+ tx.value.substring(endPos, tx.value.length);tx.scrollTop = scr;";
}
function displayTB(tx) {
	
	var ta = document.getElementById(tx);
	
	if (ta != 'undefined') {
		
		var divToolbar = document.createElement('div');
		//divToolbar.setAttribute('id', 'sjOTB');
		
		var boldButton = document.createElement('input');
		boldButton.type='button';
		boldButton.value="B";
		boldButton.setAttribute("style", "font-weight:bold");
	
		var italicButton = document.createElement('input');
		italicButton.type='button';
		italicButton.value="I";
		italicButton.setAttribute("style", "font-style: italic");
	
		var underlineButton = document.createElement('input');
		underlineButton.type='button';
		underlineButton.value="U";
		underlineButton.setAttribute("style", "text-decoration:underline");
	
		var colorlist = document.createElement('select');
		colorlist.name='colorselect';
		colorlist.value='Font color';
		colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");  
		colorvals=new Array("aqua","blue","#f0c0a0","#ffd700","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","#ff00ff","yellow");
	
		var firstoption=new Option("Text Color...");
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
	
		colorlist.setAttribute("onchange", "format=this.value;var formatOpen='['+format+']';var formatClose='[/'+format+']';tx = document.getElementById('" + tx + "');scr= tx.scrollTop;startPos = tx.selectionStart;endPos = tx.selectionEnd;selectedSubString = tx.value.substr(tx.selectionStart, tx.selectionEnd - tx.selectionStart);tx.value = tx.value.substring(0, startPos)+formatOpen+selectedSubString+formatClose"+"+ tx.value.substring(endPos, tx.value.length);tx.scrollTop = scr;this.selectedIndex = 0;");
		boldButton.setAttribute("onclick", appendFormatCode('b', tx));
		italicButton.setAttribute("onclick",appendFormatCode('i', tx));
		underlineButton.setAttribute("onclick",appendFormatCode('u', tx));
		coolSmiley.setAttribute("onclick",appendSmileyCode( '[8)]', tx));
		coolSmiley.title="Cool";
		sadSmiley.setAttribute("onclick",appendSmileyCode( '[:(]', tx));
		sadSmiley.title="Sad";
		angrySmiley.setAttribute("onclick",appendSmileyCode( '[:x]', tx));
		angrySmiley.title="Angry";
		smileSmiley.setAttribute("onclick",appendSmileyCode( '[:)]', tx));
		smileSmiley.title="Smile";
		winkSmiley.setAttribute("onclick",appendSmileyCode( '[;)]', tx));
		winkSmiley.title="Wink";
		bigsmileSmiley.setAttribute("onclick",appendSmileyCode('[:D]', tx));
		bigsmileSmiley.title="Big Smile";
		surpriseSmiley.setAttribute("onclick",appendSmileyCode( '[:o]', tx));
		surpriseSmiley.title="Surprised";
		funnySmiley.setAttribute("onclick",appendSmileyCode( '[:P]', tx));
		funnySmiley.title="Funny";
		confuseSmiley.setAttribute("onclick",appendSmileyCode('[/)]', tx));
		confuseSmiley.title="Confused";
		
		divToolbar.appendChild(boldButton);
		divToolbar.appendChild(italicButton);
		divToolbar.appendChild(underlineButton);
		divToolbar.appendChild(colorlist);
		divToolbar.appendChild(coolSmiley);
		divToolbar.appendChild(sadSmiley);
		divToolbar.appendChild(angrySmiley);
		divToolbar.appendChild(smileSmiley);
		divToolbar.appendChild(winkSmiley);
		divToolbar.appendChild(bigsmileSmiley);
		divToolbar.appendChild(surpriseSmiley);
		divToolbar.appendChild(funnySmiley);
		divToolbar.appendChild(confuseSmiley);
		
		ta.parentNode.insertBefore(divToolbar, ta);
	}
	
}