// ==UserScript==
// @name           FazedAddon
// @namespace      Fazed
// @include      http://*fazed.net/forum/*
// @include	 http://*fazed.org/forum/*
// @include 	 http://*skill.org/forum/*
// @include      http://*slorum.net/forum/*
// @include      http://*slorum.org/forum/*
// @include      http://*workwebpage.com/forum/*

// @include	 http://*fazed.net/pm/new/*
// @include	 http://*fazed.org/pm/new/*
// @include	 http://*skill.org/pm/new/*
// @include	 http://*slorum.net/pm/new/*
// @include	 http://*slorum.org/pm/new/*
// @include	 http://*workwebpage.org/pm/new/*

// @include	 http://*fazed.net/view/*
// @include	 http://*fazed.org/view/*
// @include 	 http://*skill.org/view/*
// @include	 http://*slorum.net/view/*
// @include	 http://*slorum.org/view/*
// @include	 http://*workwebpage.org/view/*

// @include	http://*fazed.net/login/*
// @include	http://*fazed.org/login/*
// @include	http://*skill.org/login/*
// @include	http://*slorum.net/login/*
// @include	http://*slorum.org/login/*
// @include	http://*workwebpage.org/login/*

// @include	http://*fazed.net/submit/*
// @include	http://*fazed.org/submit/*
// @include	http://*skill.org/submit/*
// @include	http://*slorum.net/submit/*
// @include	http://*slorum.org/submit/*
// @include	http://*workwebpage.org/submit/*

// @author		James Hannan aka JDHannan
// ==/UserScript==


// Hi everyone, JDHannan here.  I just wanted to help out where I could and take some of the workload off of Spun.  Any 
// comments/suggestions/questions, feel free to PM me or something.  I would like to add a couple more things to 
// the script, so future versions should be coming.

//to do: quick quote?(no)  ignore user? more tooltips?


//add javascript function into the page to insert tags
function insertInsertFunction()
{
	//get the head tag
	var head = document.getElementsByTagName('head')[0];

	//make a new element of the script
	var newFunction=document.createElement("script");
	newFunction.setAttribute('type','text/javascript');
	newFunction.innerHTML=	'function insertTag(toInsert) { ' +
		'var commentArea = document.getElementsByName(\'comment\')[0]; ' +
		'var startPos = commentArea.selectionStart; ' +
		'var endPos = commentArea.selectionEnd; ' +
		'var selectedText = commentArea.value.substring(startPos,endPos);' +
		'var newText;' +

		// concatenate together the text before the highlighting, the tag, the highlighted text, the closing 
		// tag(minus the =) and the text after the highlighting
		'newText= commentArea.value.substring(0, startPos) + \'[\' + toInsert; ' + 
		//if it is NOT image tagged AND it contains http:// or www.
		'if ((selectedText.search(\'/img]\')<0) && ((selectedText.search(\'http://\') >= 0) || (selectedText.search(\'www.\') >= 0) || (selectedText.search(\'https://\') >= 0))) { ' +
		'	newText += selectedText + \']\'; ' +	
		'} ' +

		'else { ' +
		'	newText += \']\' + selectedText;' +
		'} ' +

		//add the closing tag
		'newText += \'[/\' +toInsert.replace(/=/,\'\') + \']\' + '+ 
		'commentArea.value.substring(endPos, commentArea.value.length); ' +
		'commentArea.value = newText;' + 

		//if there is an = in the toInsert, then put the cursor after the =
		'if (toInsert.search(\'=\')>=0) { ' +

			//if the selected text is webpagey, then the cursor goes inbetween the tags
		'	if (((selectedText.search(\'http://\') >= 0) || (selectedText.search(\'www.\') >= 0) || (selectedText.search(\'https://\') >= 0))&&(selectedText.search(\'/img]\')<0)) { ' +
		'		commentArea.selectionEnd = startPos + toInsert.length + selectedText.length + 2;' +
		'	} ' + //end if webpagey
				
			//if its not webpagey, the cursor goes after the equals
		'	else { ' +
		'		commentArea.selectionEnd = startPos +toInsert.search(\'=\')+2; ' + //put cursor after the equals
		'	} ' +

		'} ' +

		//else put it the cursor after the last tag
		'else { ' +
		'	commentArea.selectionEnd = endPos+5+toInsert.length*2;}' +
		'	commentArea.focus();' +
		'	commentArea.scrollTop = commentArea.scrollHeight;' +
		'} ';

	//head-on! apply directly to the head
	head.appendChild(newFunction);
}


//add a spoiler= button
function addSpoilerEqualsButton()
{
	//get the last element (spoiler tag)
	var lmnt = document.getElementsByName("addbbcode8")[0];

	//create the spoiler 'button'
	var toInsert=document.createElement("input"); 
	toInsert.setAttribute('type','button');
	toInsert.setAttribute('name','spoilerequals');
	toInsert.setAttribute('value','=');
	toInsert.setAttribute('class','bbcode');
	toInsert.setAttribute('onClick','insertTag(\'spoiler=\')');
	toInsert.setAttribute('style','padding-left:0px; padding-right:0px; border-left:0px');

	//remove the previous space
	lmnt.previousSibling.nodeValue='';

	//create a space :-P
	var space = document.createTextNode(' ');
	//ram it in there
	lmnt.parentNode.insertBefore(toInsert,lmnt);
	lmnt.parentNode.insertBefore(space,lmnt);
}

//add a url= button
function addUrlEqualsButton()
{
	//get the img tag element 
	var lmnt = document.getElementsByName("addbbcode12")[0];

	//create the url= 'button'
	var toInsert=document.createElement("input"); 
	toInsert.setAttribute('type','button');
	toInsert.setAttribute('name','urlequals');
	toInsert.setAttribute('value','=');
	toInsert.setAttribute('class','bbcode');
	toInsert.setAttribute('onClick','insertTag(\'url=\')');
	toInsert.setAttribute('style','padding-left:0px; padding-right:0px; border-left:0px');
	toInsert.setAttribute('title','highlight the url and then press this button');

	//remove the previous space
	lmnt.previousSibling.nodeValue='';

	//create a space :-P
	var space = document.createTextNode(' ');

	//ram it in there
	lmnt.parentNode.insertBefore(toInsert,lmnt);
	lmnt.parentNode.insertBefore(space,lmnt);
}

//add a quote= button
function addQuoteEqualsButton()
{
	//get the pre tag element 
	var lmnt = document.getElementsByName("addbbcode4")[0];

	//create the quote= 'button'
	var toInsert=document.createElement("input"); 
	toInsert.setAttribute('type','button');
	toInsert.setAttribute('name','quoteequals');
	toInsert.setAttribute('value','=');
	toInsert.setAttribute('class','bbcode');
	toInsert.setAttribute('onClick','insertTag(\'quote=\')');
	toInsert.setAttribute('style','padding-left:0px; padding-right:0px; border-left:0px');
	toInsert.setAttribute('title','highlight the quote and then press this button');

	//remove the previous space
	lmnt.previousSibling.nodeValue='';

	//create a space :-P
	var space = document.createTextNode(' ');

	//ram it in there
	lmnt.parentNode.insertBefore(toInsert,lmnt);
	lmnt.parentNode.insertBefore(space,lmnt);
}

//add a nsfw= button
function addNSFWEqualsButton()
{
	//get the nsfw tag element 
	var lmnt = document.getElementsByName("addbbcode16")[0];

	//create the nsfw= 'button'
	var toInsert=document.createElement("input"); 
	toInsert.setAttribute('type','button');
	toInsert.setAttribute('name','nsfwequals');
	toInsert.setAttribute('value','=');
	toInsert.setAttribute('class','bbcode');
	toInsert.setAttribute('onClick','insertTag(\'nsfw=\')');
	toInsert.setAttribute('style','padding-left:0px; padding-right:0px; border-left:0px');
	toInsert.setAttribute('title','highlight the address and then press this button.');

	//remove the previous space
	lmnt.nextSibling.nodeValue='';

	//create a space :-P
	var space = document.createTextNode(' ');

	//ram it in there
	//lmnt.parentNode.insertBefore(toInsert,lmnt);
	//lmnt.parentNode.insertBefore(space,lmnt);
	lmnt.parentNode.appendChild(toInsert);
	lmnt.parentNode.appendChild(space);
}

//this function will make the quoted pics smaller if they're over 200px tall to save ur mousewheel
// it also allows you to click the picture to return it to fullsize (and again to reshrink it)
function smallerQuotedPics()
{
	var allImgs = document.getElementsByTagName('img');
	
	for (var i=0;i<allImgs.length;i++)
	{
		if (allImgs[i].parentNode.getAttribute('class')=='quote')
		{
			
			if (allImgs[i].height>200)
			{
				allImgs[i].height=200;
				allImgs[i].setAttribute('onclick','if (this.height > 200) { this.height=200; } else { this.height=this.naturalHeight; }');
				allImgs[i].setAttribute('title','click to toggle image size');
			}
		}
			
	}
}

//this function will resize images greater than a maximum image size.  The size is defined near the bottom of the script.  The entire script
//not just this function.  Images can be clicked to toggle between fullsized and resized
function marginSaver()
{
	var allImgs = document.getElementsByTagName('img');

	for (var i=0;i<allImgs.length;i++)
	{
		if (allImgs[i].parentNode.getAttribute('class')!='quote')
		{
	
			if (allImgs[i].width>maxImageWidth)
			{
				allImgs[i].width=maxImageWidth;
				allImgs[i].setAttribute('onclick','if (this.width > '+maxImageWidth+') { this.width='+maxImageWidth+'; } else { this.width=this.naturalWidth; }');
				allImgs[i].setAttribute('title','click to toggle image size');

			}
		}
	}
}



//This function will remove the post option from threads that are over 30 days old
//It recreates the error message that you get if you try to post in a >30 day old thread so you don't miss that.
//This functions as well as it can, there's no way to know 100% if the thread is 30 day'd if you're not on the last page
function oldThreads()
{
	//make sure you're on the last page of the thread
	//find all <li> tags
	var lis = document.getElementsByTagName("li");
	var more=false;

	//look through them for the existence of the word 'next' - to indicate that the thread goes on
	for (var i=lis.length - 1; i>=0; i--)
	{
		if (lis[i].innerHTML.search('next')>=0)
			{
				more=true;
				break;
			}
	}

	//if there is not more pages available
	if (!more)
	{
		//find the date section
		var h5tags = document.getElementsByTagName("h5");
		if (h5tags.length==0)
		{
			return;
		}
		
		var h5length = h5tags.length -1;
		var dateString = h5tags[h5length].innerHTML;
		//<strong>Date:</strong> 2/20/09 @ 10:59 AM	
		//cut it down to just the date
		dateString = dateString.substring(23,dateString.length);
		dateString = dateString.split(' ')[0];
		
		//add in the 20
		dateString=dateString.substring(0,dateString.length-2) + '20' + dateString.substring(dateString.length-2,dateString.length);
		dateString = Date.parse(dateString);
		
		//find out if its within 30 days
		var now = new Date();
		var diff = now.getTime() - dateString;
		
		if (diff > 2678400000)
			{
				var removeMe = document.getElementsByName('comment')[0]; 
				var toAdd = document.createElement('div');			
				toAdd.setAttribute('class','redboxtl');
				toAdd.innerHTML = '<div class="redboxtr"><span class="redboxtitle">Stop</span></div><div class="redboxbl"><div class="redboxbr">This thread hasn\'t been updated in more than 30 days, and can no longer accept new posts.</div></div></div><br>';
				removeMe.parentNode.parentNode.appendChild(toAdd);
				
				//just a little whitespace at the bottom
				toAdd = document.createElement('div');
				toAdd.innerHTML = '<br><br><br><br><br><br>';
				removeMe.parentNode.parentNode.parentNode.appendChild(toAdd);
	
				removeMe.parentNode.parentNode.removeChild(removeMe.parentNode);
			}
	}

}

function addToolTips()
{
	var lmnt = document.getElementsByName("addbbcode8")[0];
	lmnt.setAttribute('title','uses a fixed-width font.  bold = very very little');
	
	lmnt = document.getElementsByName("addbbcode16")[0];
	lmnt.setAttribute('title','makes a link clickable.  use http:// for all links or for none');

	lmnt = document.getElementsByName("addbbcode12")[0];
	lmnt.setAttribute('title','makes an image link show up as an image. use img and nsfw tags together at your own peril');

	lmnt = document.getElementsByName("addbbcode14")[0];
	lmnt.setAttribute('title','makes an image link clickable and designated as not safe for work. again: do not nest img and nsfw tags');

	lmnt = document.getElementsByName("addbbcode10")[0];
	lmnt.setAttribute('title','makes the tagged words go on strike');

	lmnt = document.getElementsByName("addbbcode0")[0];
	lmnt.setAttribute('title','mixes well with caps');

	lmnt = document.getElementsByName("addbbcode2")[0];
	lmnt.setAttribute('title','hey, do those letters look crooked to you?');

	lmnt = document.getElementsByName("addbbcode6")[0];
	lmnt.setAttribute('title','that\'s what she said');

	lmnt = document.getElementsByName("addbbcode4")[0];
	lmnt.setAttribute('title','Allows you to not ruin it for everyone');
}

//This function is for resizing the titles on the forum page.  
//if theres 11-74 new posts, it makes it 120% the size (seemingly the first size increase after 100)
//if there is more than 500 posts, it makes it 90% the size
function resizeTitles()
{

var forumTable = document.getElementsByTagName("table")[1];


	var aTags = forumTable.getElementsByTagName("a");
	var toCheck='';
	var newPosts=0;

	for (var i=0;i<aTags.length;i++)
	{	
		toCheck = aTags[i].getAttribute('title');
		if (toCheck!=null)
			if (toCheck.search(/New Posts/)>=0)
			{	
				newPosts=toCheck.substring(11);
				if ((newPosts>10)&&(newPosts<75))
					aTags[i].setAttribute('style','font-size:120%; ');
				else if (newPosts>500)
					aTags[i].setAttribute('style','font-size:90%; ');





			}	
	}
}

function searchHighlighting()
{
	var searchTerms = new Array();
	var regexps = new Array();
	var startRep="<b><font color=\"limegreen\">";
	var endRep="</font></b>";
	
	searchTerms=document.getElementsByName("s")[0].getAttribute("value").split(" ");
	for (var i=0;i<searchTerms.length;i++)
		searchTerms[i]=searchTerms[i].replace(/[^a-zA-Z 0-9]+/g,'');
		
	for (var i=0;i<searchTerms.length;i++)
		regexps[i]=new RegExp(searchTerms[i],'gi');
			
	var lmnts = document.getElementsByTagName("div");
	for (var i=0;i<lmnts.length;i++)
		if (lmnts[i].getAttribute("class")=="post_body") 
			for (var j=0;j<searchTerms.length;j++)
				lmnts[i].innerHTML=lmnts[i].innerHTML.replace(regexps[j],startRep+"$&"+endRep);
	
	var lmnts = document.getElementsByTagName("a");
		for (var i=0;i<lmnts.length;i++)
			if (lmnts[i].getAttribute("class")=="read") 
				for (var j=0;j<searchTerms.length;j++)
					lmnts[i].innerHTML=lmnts[i].innerHTML.replace(regexps[j],startRep+"$&"+endRep);
	
}

function placeCursor_Search()
{
	var searchBox = document.getElementsByName("s")[0];
	searchBox.focus();
}

function placeCursor_Login()
{
	var userBox = document.getElementsByName("username")[0];
	userBox.focus();
}

function placeCursor_PM()
{
	var msgto = document.getElementById('msgto');
	
	if (msgto.textLength==0)
	{
		msgto.focus();
	}
	else
	{
		var comment=document.getElementsByName('comment')[0];
		comment.setSelectionRange(comment.textLength,comment.textLength);
		comment.focus();
	}
}

//this is the maximum allowed size for image widths.  Set it to about 40 pixels less than the width of your monitor's resolution
var maxImageWidth=1240;

//////////////////////////////////////////////////////////////////////////////////////////
// These are the calls to the functions.  If you don't like one, put a // infront of it
//
// note: insertInsertFunction is required by several addButtons so don't 
//	comment it out.  By itself it does nothing noticeable.
//
if (document.title=="FAZED - Slorum Search")
{
	searchHighlighting();
	placeCursor_Search();
}
else if (document.title=="FAZED - Search")
{
	placeCursor_Search();
}
else if (document.title=="FAZED - Login")
{
	placeCursor_Login();
}
else if (document.title=="FAZED - Suggest a Link")
{
	document.getElementsByName('fuckyourspam')[0].focus();
}
else if (document.title!="FAZED - Slorum")
{
	insertInsertFunction();
	addNSFWEqualsButton();
	addSpoilerEqualsButton();
	addUrlEqualsButton();
	addQuoteEqualsButton();
	smallerQuotedPics();
	marginSaver();
	oldThreads();
	addToolTips();
}
else
{
	resizeTitles();
}

if (document.title=="FAZED - New Private Message")
{
	placeCursor_PM();
}

