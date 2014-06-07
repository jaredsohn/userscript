// ==UserScript==
// @name           XW Inline Edit
// @namespace      http://www.warez-bb.org
// @include        http://www.xtremew.org/viewtopic.php?f=*
// ==/UserScript==

var gooddivs;
var sid = "";
var ft = "";
var lc = "";
var ct = "";
var pmc = "";
var psc = "";
var sub = "";
var postAction = "";

function getSource(lnk)
{
	try 
	{
		httpReq = new XMLHttpRequest();
	}
	catch (e)
	{
		httpReq=false;
	}

	httpReq.open("GET",lnk,false);
	httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpReq.setRequestHeader("Connection", "close");
	httpReq.send(null);
	if (httpReq.status == 200) 
		src = httpReq.responseText;
	return src;
}


function getElementsByClassName(className, tag)
{
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++)
	{
		current = elements[i];
		if(testClass.test(current.className))
		{
			returnElements.push(current);
		}
	}
	return returnElements;
}

function inlineEdit(number)
{
	var who = gooddivs[number];
	var divhtml = who.innerHTML;
	var eaction = divhtml.match(/\<li class\=\"edit-icon\"\>[^\"]+"\.\/([^\"]+)\"/i)[1];
	editAction = eaction.replace(/&amp;/gi,"&");
			
	var $editsrc = getSource(editAction);
	sid = $editsrc.match(/sid=(\w+)/i)[1];
	ft = $editsrc.match(/form_token" value="(\w+)/i)[1];
	lc = $editsrc.match(/lastclick" value="(\w+)/i)[1];
	ct = $editsrc.match(/creation_time" value="(\w+)/i)[1];
	pmc = $editsrc.match(/edit_post_message_checksum" value="(\w+)/i)[1];
	sub = $editsrc.match(/name="subject".+value=\"([^\"]+)\"/i)[1];
	
	postAction = $editsrc.match(/action="\.\/([^"]+)/i)[1];
	postAction = postAction.replace(/&amp;/gi,"&");
	
	psc = $editsrc.match(/edit_post_subject_checksum" value="(\w+)/i)[1];
	$editsrc = $editsrc.substring($editsrc.indexOf('class="inputbox">')+17);
	$editsrc = $editsrc.substring(0,$editsrc.indexOf('</textarea>'));
	who.innerHTML = '<div id="message-box"><textarea name="message" id="message" rows="15" cols="76" tabindex="4" onselect="storeCaret(this);" onclick="storeCaret(this);" onkeyup="storeCaret(this);" onfocus="initInsertions();" class="inputbox">' + $editsrc + '</textarea></div>';
	who.innerHTML = who.innerHTML + '<input id="submitInline" type="button" value="Submit" />';
	addButtonListener("submitInline",postIt);
}

function addButtonListener(who,func)
{
	var button = document.getElementById(who);
	button.addEventListener('click',func,true);
}

function postIt()
{
	postSource(postAction,"message="+document.getElementById('message').value);
	location.reload(true);
}

function postSource(lnk,post)
{
	var foo = new Date;
	var tm = "" + parseInt((foo.getTime() / 1000) - 10);
	post = post + "&creation_time="+ct;
	post = post + "&lastclick="+lc;
	post = post + "&mode=edit";
	post = post + "&sid="+sid;
	post = post + "&subject="+sub;
	post = post + "&form_token="+ft;
	post = post + "&edit_post_message_checksum="+pmc;
	post = post + "&edit_post_subject_checksum="+psc;
	post = post + "&post=Submit";
	try 
	{
		httpReq = new XMLHttpRequest();
	}
	catch (e)
	{
		httpReq=false;
	}

	httpReq.open("POST",lnk,false);
	httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpReq.setRequestHeader("Connection", "close");
	httpReq.send(post);
	if (httpReq.status == 200) 
		src = httpReq.responseText;
	return src;
}

function addEditButtons()
{
	var editregex = /\<li class\=\"edit-icon\"\>/i
	gooddivs = getElementsByClassName("postbody","div");
	for(var i=0;i<gooddivs.length;i++)
	{
		if(editregex.test(gooddivs[i].innerHTML))
		{
			var tmpid = "tmpid" + i;
			var inlineeditbutton = "<a href='javascript:;' mynumber='"+i+"' id='"+tmpid+"'><img src='http://img.myph.us/iEs.png'></a>";
			gooddivs[i].innerHTML = gooddivs[i].innerHTML.replace(editregex,inlineeditbutton + '<li class="edit-icon">');
			
			document.getElementById(tmpid).addEventListener('click',function () 
			{
				inlineEdit(this.getAttribute("mynumber"));
			},false);
		}
	}
	
}

addEditButtons();