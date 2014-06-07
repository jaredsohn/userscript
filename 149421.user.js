// ==UserScript==
// @name        myMcGill Quick myCourses
// @namespace   McGill Tools
// @description Show myCourses List directly in myMcGill
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// @include     https://mymcgill.mcgill.ca/portal/page/portal/myMcGill
// @include     https://mycourses2.mcgill.ca/d2l/home
// @include     https://mycourses2.mcgill.ca/d2l/le/content/*
// @version     1.9

// Script Auto Update
// @require http://usocheckup.redirectme.net/149421.js
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest

// ==/UserScript==

var semester="Winter 2014";
var location = window.location.href;
var mycoursesLink="https://mymcgill.mcgill.ca/portal/page/portal/External?application=lms";
var mycoursesUrl="https://mycourses2.mcgill.ca/d2l/home";
//document.domain = "mcgill.ca";

if (location=="https://mymcgill.mcgill.ca/portal/page/portal/myMcGill")
{
	//crease an iframe that contains the course list
	$("table#rg1115").before("<div style='border: 1px solid #C0C0C0;margin:4px;'><iframe id='courselist' src='"+mycoursesLink+"' style='width:100%;height:235px;display:block;border:0px solid black'></iframe></div>");
	
	//open Mail in a new tab instead of a new window
	$("a[target='mailbox_frame'].PortletText1").removeAttr("onclick");
	
}

if (location=mycoursesUrl && top !== self)
{
	$("body").html($("h3:contains('"+semester+"')").parent().parent().parent().html()); //if in iframe, show only the classes (remove all myCourses navigations)
	
	$('a.d2l-link:not(:contains("Unread"))').each(function(index) {
		$(this).html($(this).html().replace(/(Fall|Winter) 20(\d{2}) - /gi,"")); //Remove semester text from course list
		
		var cid=$(this).attr('href').replace(/\/d2l\/lp\/ouHome\/home\.d2l\?ou=/i,"");
		
		$(this).attr('href','/d2l/le/content/'+cid+'/Home');
		$(this).after("&nbsp;- <a class='d2l-link' href='/d2l/home/"+cid+"'>Home</a>");
	});
	
	$("div.d2l-htmlblock:contains('Course ended')").parent().remove(); //remove Course ended... message
	
	$('a').attr('target', '_blank'); //make course links open in new window
}

//Directly download pdf documents
if(window.location.href.substr(0,44) == "https://mycourses2.mcgill.ca/d2l/le/content/")
{
	$("a.d2l-le-TreeAccordionItem-anchor").click(function(){
		setTimeout(function(){
			dlpdf();
		},1000);
	});
	dlpdf();
}

function dlpdf()
{
	$("a.d2l-link-main[title*=' - Adobe Acrobat Document']").each(function(index) {
		//https://mycourses2.mcgill.ca/d2l/le/content/89389/viewContent/1348352/View
		//https://mycourses2.mcgill.ca/d2l/le/content/89389/topics/files/download/1348352/DirectFileTopicDownload
		var l = $(this).attr('href');
		var d = l.replace("viewContent","topics/files/download","i");
		var d = d.replace("View","DirectFileTopicDownload","i");
		
		$(this).attr('href',d);
		//console.log(l);
	});
}