// ==UserScript==
// @name           Twilight fake voter
// @authour        D3
// @include        https://secure.imdb.com/register-imdb/*
// @include        http://www.mailinator.com/*
// @include        http://www.imdb.com/*
// @include        http://www.mailinator.com/showmail.jsp?*
// ==/UserScript==



if(document.location=="http://www.mailinator.com/stinky.jsp")
{
	alert("Flood detected\nRestart after 10 minute break");
}

if(document.location=="https://secure.imdb.com/register-imdb/logout?c=1")
{
	document.location="http://www.mailinator.com/";
}

if(document.location=="http://www.mailinator.com/")
{
	var email = "hello";
	email = email + Math.floor(Math.random()*22321313);
	
	GM_setValue('ihatetwlight', email); 
	document.forms[0].elements[0].value=email;
	document.forms[0].submit();
}

var link=GM_getValue('ihatetwlight');

if(document.location=="http://www.mailinator.com/maildir.jsp?email="+link)
{
	if(document.links.length==12)
	{
		document.location="https://secure.imdb.com/register-imdb/?why=personalize";
	}
	else if (document.links.length==13)
	{	
		document.location=document.links[11].href;
	}
	else
	{
		alert(document.links[13].href);
		document.location=document.links[13].href;
	}
}

if(document.location=="https://secure.imdb.com/register-imdb/?why=personalize")
{
	if((document.body.innerHTML.indexOf("While you wait for that e-mail, you can still update some of your")==-1))
	{
		document.forms[1].elements[0].value=link+"@mailinator.com ";
		document.forms[1].elements[1].value=link+"@mailinator.com ";
		document.forms[1].elements[2].checked=true;
		document.forms[1].elements[4].value="1987";
		document.forms[1].elements[5].value="98104";
		document.forms[1].elements[8].value="1qaz";
		document.forms[1].elements[9].value="1qaz";
		document.forms[1].submit();
	}
}


if((document.body.innerHTML.indexOf("While you wait for that e-mail, you can still update some of your")>-1))
{
	document.location="http://www.mailinator.com/maildir.jsp?email="+link;
}

if((document.body.innerHTML.indexOf("This step helps prevent automated registrations")>-1))
{
	document.forms[1].elements[2].focus();
}

if((document.body.innerHTML.indexOf("Going back and trying the previous image again will not work")>-1))
{
	document.links[50].focus();
	document.forms[1].elements[2].focus();
}

if(document.location=="https://secure.imdb.com/register-imdb/confirm?c=1")
{
	document.location="http://www.imdb.com/title/tt1259571/";
}
if(document.location=="http://www.imdb.com/title/tt1259571/")
{
	document.location=document.evaluate("//*[@title='1']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.href;
}

if(document.body.innerHTML.indexOf("Your vote of 1 was counted.")>-1)
{
	document.location="http://www.imdb.com/register/logout";
}

if(document.body.innerHTML.indexOf("please click on this link to activate your account")>-1)
{
	document.location=document.links[13].href;
}

if(document.body.innerHTML.indexOf("Sorry, you can't go back and try the same image again.")>-1)
{
	document.forms[1].elements[2].focus();
}
 
