// ==UserScript==
// @name            Bungie.net Multiquote Script
// @author          SpeedySurfer2205 / robby118 <3
// @namespace       Bungie.net Multiquote Script
// @description     This script adds a multiquote function to Bungie.net.
// @include         http://*bungie.net/fanclub/*/Forums/*
// @include         http://*bungie.net/forums/*       
// ==/UserScript==
 
unsafeWindow.buttonNum=0;
document.getElementById("ctl00_forumSidebarPanel").innerHTML=document.getElementById("ctl00_forumSidebarPanel").innerHTML.replace("Create New Topic</a></li>" ,"Create New Topic</a></li><li id=\"ctl00_clearMultiquote\"><a href=\"javascript:alert('Multiquote cache cleared!')\" id=\"clearMultiquoteLink\">Clear Multiquote</a></li>")
document.getElementById("clearMultiquoteLink").addEventListener('click', function() {clearMultiquote();}, true);
 var divArray=document.getElementsByTagName("div");
 for (var a = 0; a<divArray.length; a++)
{
	
	
	if(divArray[a].getAttribute("class")=="post-actions"){
		if(document.location.href.match("posts.aspx")){
		post=divArray[a].getAttribute("id")
		post=post.replace("ctl00_mainContent_postRepeater1_ctl","")
		post=post.replace("_ctl00_postControl_skin_postactionsDiv","")
		buttonname="ctl00_mainContent_postRepeater1_ctl"+post+"_ctl00_postControl_skin_multiQuoteButton";
divArray[a].innerHTML=divArray[a].innerHTML.replace("</ul>", "<div align=\"right\"><li><input value=\"multiquote\" type=\"button\" name=\""+post+"\" id=\""+buttonname+"\" onmousedown=\"window.buttonNum=document.getElementById('"+buttonname+"').getAttribute('name');\" style=\"background:#1b1d1f; cursor: pointer; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid; margin-right:0px;\" onmouseover=\"thisButton=document.getElementById('"+buttonname+"'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('"+buttonname+"'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" /></li></div></ul>")
document.getElementById(buttonname).addEventListener('mouseup', function() {addMultiquote();}, true);
checkQuote=replaceTags(post);
multiQuotevalue=GM_getValue("Multiquote");
if(multiQuotevalue.indexOf(checkQuote)>0){
	if(multiQuotevalue.indexOf(checkQuote+"</span>")==-1){
divArray[a].innerHTML=divArray[a].innerHTML.replace("PDT", "PDT&nbsp;&nbsp;|&nbsp;&nbsp;Multiquoted")}
}}
	}else if(divArray[a].getAttribute("class")=="create-post-actions"){
		if(document.location.href.match("createpost.aspx")){
	divArray[a].innerHTML=divArray[a].innerHTML.replace(/<a id=.ctl00_mainContent_postForm_skin_cancelButton./, "<input value=\"multiquote\" type=\"button\" id=\"insertMultiquote\" style=\"background:#1b1d1f; height: 22px; cursor: pointer; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid; margin-right:-3px; float:left; margin-left:5px; margin-right:0px;\" onmouseover=\"thisButton=document.getElementById('insertMultiquote'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertMultiquote'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/><a id=\"ctl00_mainContent_postForm_skin_cancelButton\"")
document.getElementById("insertMultiquote").addEventListener('click', function() {insertMultiquote();}, true);
		}}}
	
function addMultiquote(){
	userPost=replaceTags(unsafeWindow.buttonNum)
	if (GM_getValue("Multiquote")==undefined){
		multiquoteValue="";
	}else{
	multiquoteValue=GM_getValue("Multiquote")
	}
	lengthTest=multiquoteValue+"[quote][b]Posted by:[/b] "+userName+"\n"+userPost+"[/quote]\n\n"
	if(lengthTest.length>7500){
		alert("Sorry, that post would push the multiquote value over 7500 characters which is the limit set so as to leave you enough characters to comment on the quotes. You are currently using "+multiquoteValue.length+" characters.")
	}else{
	GM_setValue("Multiquote", multiquoteValue+"[quote][b]Posted by:[/b] "+userName+"\n"+userPost+"[/quote]\n\n");
	if(document.getElementById("ctl00_mainContent_postRepeater1_ctl"+unsafeWindow.buttonNum+"_ctl00_postControl_skin_postactionsDiv").innerHTML.indexOf("PDT&nbsp;&nbsp;|&nbsp;&nbsp;Multiquoted")==-1){
	document.getElementById("ctl00_mainContent_postRepeater1_ctl"+unsafeWindow.buttonNum+"_ctl00_postControl_skin_postactionsDiv").innerHTML=document.getElementById("ctl00_mainContent_postRepeater1_ctl"+unsafeWindow.buttonNum+"_ctl00_postControl_skin_postactionsDiv").innerHTML.replace("PDT", "PDT&nbsp;&nbsp;|&nbsp;&nbsp;Multiquoted")	}
	}
	
}
function replaceTags(buttonNum){
	userName=document.getElementById("ctl00_mainContent_postRepeater1_ctl"+buttonNum+"_ctl00_postControl_skin_usernameLink").innerHTML
	userPost=document.getElementById("ctl00_mainContent_postRepeater1_ctl"+buttonNum+"_ctl00_postControl_skin_postbodyDiv").getElementsByTagName("p")[1].innerHTML
	userPost=userPost.replace(/%3C/g, "<")
	userPost=userPost.replace(/%20/g, " ")
	userPost=userPost.replace(/&gt;/g, ">")
	userPost=userPost.replace(/&amp;/g, "&")
	userPost=userPost.replace(/<br><br>\[Edited on (.*?)\]/, "");
	userPost=userPost.replace(/<br>/g, "\n")
	userPost=userPost.replace(/<i>/g, "[i]")
	userPost=userPost.replace(/<\/i>/g, "[/i]")
	userPost=userPost.replace(/<b>/g, "[b]")
	userPost=userPost.replace(/<\/b>/g, "[/b]")
	userPost=userPost.replace(/<u>/g, "[u]")
	userPost=userPost.replace(/<\/u>/g, "[/u]")
	userPost=userPost.replace(/<a href=\"mailto:(.*?)\">/g, "[email]")
	emaillink=userPost.match(/\[email\](.*?|)<\/a>/g)
	if(emaillink==null || emaillink.length==0){
	}else{
		for (var i = 0; i<emaillink.length; i++)
{
	emaillink1=emaillink[i].replace(/<\/a>/, "[/email]")
	userPost=userPost.replace(emaillink[i], emaillink1)
						
}}
	urllink=userPost.match(/<a target=\"_blank\" href=\"(.*?)\">(.*?)<\/a>/g)
	if(urllink==null || urllink.length==0){
	}else{
	for (var i = 0; i<urllink.length; i++)
{
	linkAddress=urllink[i].replace(/<a target=\"_blank\" href=\"/,"")
	linkAddress=linkAddress.replace(/\">(.*?)<\/a>/,"")
	linkText=urllink[i].replace(/<a target=\"_blank\" href=\"(.*?)\">/,"")
	linkText=linkText.replace(/<\/a>/,"")
	if(linkText==linkAddress){
	userPost=userPost.replace(urllink[i], "[url]"+linkAddress+"[/url]")
	}else{
		userPost=userPost.replace(urllink[i], "[url="+linkAddress+"]"+linkText+"[/url]")
	}
	}
	}
	userPost=userPost.replace(/<span class=(.*?)IBBquotedtable(.*?)>/gi, "[quote]")
	userPost=userPost.replace(/<\/span>/g, "[/quote]")
	return(userPost)
}

function clearMultiquote(){
	GM_setValue("Multiquote","")
	 var divArray=document.getElementsByTagName("div");
 for (var a = 0; a<divArray.length; a++)
{
		
	if(divArray[a].getAttribute("class")=="post-actions"){
		if(document.location.href.match("posts.aspx")){
		post=divArray[a].getAttribute("id")
		post=post.replace("ctl00_mainContent_postRepeater1_ctl","")
		post=post.replace("_ctl00_postControl_skin_postactionsDiv","")
		buttonname="ctl00_mainContent_postRepeater1_ctl"+post+"_ctl00_postControl_skin_multiQuoteButton";
		divArray[a].innerHTML=divArray[a].innerHTML.replace("PDT&nbsp;&nbsp;|&nbsp;&nbsp;Multiquoted", "PDT")
		document.getElementById(buttonname).addEventListener('mouseup', function() {addMultiquote();}, true);
		}
	}
}
	
	}
	
	function insertMultiquote(){
multiQuotevalue=GM_getValue("Multiquote");
var textbox=document.getElementById('ctl00_mainContent_postForm_skin_body');
var startPos = textbox.selectionStart;
var endPos = textbox.selectionEnd;
textbox.value = textbox.value.substring(0, startPos)+ multiQuotevalue +textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+multiQuotevalue.length; textbox.setSelectionRange(caretPos, caretPos); 
	}