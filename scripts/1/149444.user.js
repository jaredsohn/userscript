// ==UserScript==
// @name        VonGoLa.'s Pronosoft Post Blocker
// @namespace   pronosoft.postbloker
// @description Cache les messages d'un utilisateur définit
// @include     http://www.pronosoft.com/forums/viewforum.php?f=6*
// @include     http://www.pronosoft.com/forums/viewforum.php?f=156*
// @include     http://www.pronosoft.com/forums/viewforum.php?f=4*
// @include     http://www.pronosoft.com/forums/*
// @include     http://www.pronosoft.com/forums/viewtopic.php?f=*
// @include     http://www.pronosoft.com/forums*
// @version     1
// ==/UserScript==

function addToBlockList(username)
{
	var strList = GM_getValue("blocklist", "");
	if(strList == "") GM_setValue("blocklist", username + ";");
	else
	{
		GM_setValue("blocklist", strList + username + ";");
		window.location.reload();
	}
}

function removeFromBlockList(username)
{
	var strList = GM_getValue("blocklist", "");
	var users = strList.split(";");
	for(var i=0; i<users.length; i++)
	{
		if(users[i] == username) users.splice(i, 1);

	}

	strList = users.join(";");
	GM_setValue("blocklist", strList);
	window.location.reload();
}

function isInBlockList(username)
{
	var strList = GM_getValue("blocklist", "");
	var users = strList.split(";");
	var retval = false;
	for(var i=0; i<users.length; i++)
	{
		if(users[i] == username) retval = true;

	}
	return retval;
}

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
}

function showPost(div, username, postID, fr, ftb, frContent, ftbContent, isPreview)
{
	if(frContent.indexOf("Hide Post") == -1)	fr.innerHTML = '<a href="javascript:void(0)" id="h' + postID + '">Hide Post</a>' 

+ 

frContent;
	else fr.innerHTML = frContent;
	ftb.innerHTML = ftbContent;
	document.getElementById('h' + postID).addEventListener('click', function(){ createHTML(div, username, postID, fr, ftb, isPreview) 

}, true);
}

function createHTML(div, username, postID, fr, ftb, isPreview)
{
	var br = document.createElement('BR');
	var holder = document.createElement('B');
	var frSave = fr.innerHTML;
	var ftbSave = ftb.innerHTML;

	if(isInBlockList(username))
	{				
		fr.innerHTML = '<a href="javascript:void(0)" id="s' + postID + '">Show Post</a><a href="javascript:scroll(0,0)">Top</a>';
		if(isPreview == true) ftb.innerHTML = '<div class="foot ce ta"><b>Posts by this user are blocked.</div>';
		else ftb.innerHTML = '<div class="foot ce ta"><b>Posts by this user are blocked. <a href="" id="ub' + postID + 

'">Unblock</a></div>';
		ftb.innerHTML += '<div class="desc bc1"></div>';
	}
	else
	{
		if(isPreview == false)
		{
			var colorBL = GM_getValue("blockLinkColor", "");
			holder.innerHTML += '<a href="" id="b' + postID + '"><font color="' + colorBL + '">Block Posts</font></a>';	
			var beforeEle = div.getElementsByTagName('DIV')[0];
			div.insertBefore(holder,beforeEle);
			div.insertBefore(br,beforeEle);
		}
	}

	if(isPreview == false)
	{
		if(document.getElementById('b' + postID) != null) document.getElementById('b' + postID).addEventListener('click', 

function(){ 

addToBlockList(username) }, true);
		else
		{
			document.getElementById('ub' + postID).addEventListener('click', function(){ removeFromBlockList(username) }, 

true);
			document.getElementById('s' + postID).addEventListener('click', function(){ showPost(div, username, postID, fr, 

ftb, frSave, ftbSave) 

}, true);
		}
	}
	else document.getElementById('s' + postID).addEventListener('click', function(){ showPost(div, username, postID, fr, ftb, frSave, 

ftbSave, isPreview) 

}, true);
}

function hideQuotes()
{
	var name,idx;
	var quoteInfo = getElementsByClassName('quote1', document);
	var quoteContent = getElementsByClassName('quote2', document);
	for(var i=0;i<quoteInfo.length;i++)
	{
		idx = quoteInfo[i].innerHTML.indexOf('@');
		name = quoteInfo[i].innerHTML.substring(7, idx - 1);
		if(isInBlockList(name))
		{
			quoteContent[i].innerHTML = '<b><font color="red">Posts by this user are blocked.</font></b>';

		}
	}
}

function loadPage()
{
    if(GM_getValue("blockLinkColor", "") == "")
	{
		GM_setValue("blockLinkColor", "");		
	}
	hideQuotes();
	var dl = document.getElementsByTagName('DL');
	var fr = getElementsByClassName('fR', document);
	var bc1 = getElementsByClassName('bc1',document);
	var dt = document.getElementsByTagName('DT');
	var ftb = getElementsByClassName('ftb', document);
	var forms = document.getElementsByTagName('form');
	var isPoll = false;
	var isPreview = false;
	var name,postID,strDT,strName,strPostID,dlOffset,dtOffset,bc1Offset,frOffset, ftbOffset;
	dlOffset = 0;
	dtOffset = 0;
	bc1Offset = 0;
	frOffset = 1;
	ftbOffset = 0;



	
	if(window.location.href.indexOf('post.php') != -1)
	{
		isPreview = true;
		dtOffset+=2;
		dlOffset+=2;
		frOffset = 0;
	}
	else
	{

		for(var i=0; i<forms.length; i++)
		{
			if(forms[i].action.indexOf('poll.php') != -1) isPoll = true;
		}
		if(isPoll == true || isPreview == true)
		{
			dtOffset++;
			dlOffset++;		
		}
	}
		
	
	for(var i=0;i<dl.length;i++)
	{	
	
		strDT = dt[i + dtOffset].firstChild;
		postID = strDT.name;

		if(strDT.innerHTML.indexOf('<') == 0)
		{
			strDT = strDT.firstChild;
		}

		
		strName = strDT.innerHTML;
		
		var idx = strName.indexOf('<');
		if(idx != -1)
		{
			name = strName.substring(0,idx)
		}
		else
		{
			name = strName;
		}
		
		name = name.replace(/ /gi,'');
		
		createHTML(bc1[i + bc1Offset],name,postID, fr[i + frOffset], ftb[i + ftbOffset], isPreview);		
	
	}	

}

loadPage();