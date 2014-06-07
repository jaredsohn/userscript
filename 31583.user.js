// ==UserScript==
// @name           RLSLOG.NET - Dynamic Comments
// @description    Dynamic comments in RLSLOG.NET
// @include        http://www.rlslog.net/*
// @include        http://rlslog.net/*
// ==/UserScript==
new_script = document.createElement("SCRIPT");
new_script.setAttribute("language","javascript")
new_script.innerHTML=(<r><![CDATA[
//****************************************************************************************************************************************
function process_comments(link,i){
	show_loading_img(i)
	commentblock = document.getElementById('com'+i).innerHTML
	if (commentblock.length){
		toggle_comments(i)
	}
	else{
		get_response(link,i)
	}
}

function get_response(link,i){
	request = new XMLHttpRequest();
	request.open("GET", link)
	request.send(null)
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200 ){
			parse_comments(request.responseText,i)
		}
		else if (request.readyState == 4 && request.status != 200 ){
			hide_loading_img(i)
			alert("Network Error!!!")
			return false;
		}
	}
}
function parse_comments(response,i){
	response = response.replace(/\r/g, "cariagereturn");
	response = response.replace(/\n/g, "linefeed");
	myregexp = /<div id="commentblock">cariagereturnlinefeedcariagereturnlinefeed(.+<\/div>)cariagereturnlinefeed  <\/div>cariagereturnlinefeed/;
	match = myregexp.exec(response);
	if (match != null && match.length > 1){
		commentblock=match[1];
		commentblock = commentblock.replace(/cariagereturn/g, "\r");
		commentblock = commentblock.replace(/linefeed/g, "\n");
		
		bottom_link='<br><a href="javascript:toggle_comments(' + i +')">Hide Comments</a>'
		document.getElementById('com'+i).innerHTML=commentblock + bottom_link
		toggle_comments(i)
	}
	else{
		hide_loading_img(i)
		alert("Error - Invalid Page!!")
		return false;
	}
}
function toggle_comments(i){
	hide_loading_img(i)
	l = location.href.replace(/(#.+)/g, "");
	location.href = l + '#toogle_com_top'+i
	
	state=document.getElementById('com'+i).style.display
	if (state=="none"){
		document.getElementById('com'+i).style.display="block"
		document.getElementById('toogle_com_top'+i).innerHTML="Hide Comments"
	}
	else{
		document.getElementById('com'+i).style.display="none"
		document.getElementById('toogle_com_top'+i).innerHTML="Show Comments"
	}
}
function hide_loading_img(i){
	document.getElementById('img_loading'+i).style.display="none"
}
function show_loading_img(i){
	document.getElementById('img_loading'+i).style.display="inline"
}
//****************************************************************************************************************************************
]]></r>).toString();
document.getElementsByTagName('HEAD')[0].appendChild(new_script)
//Main
function get_number_of_comments(entry_obj){
	comment_innerHTML=entry_obj.getElementsByClassName('comments_link')[0].innerHTML
	
	myregexp = /Comments\((\d+)\)/
	match = myregexp.exec(comment_innerHTML)
	if (match != null && match.length > 1){
		return Number(match[1])
	}
	else{
		return 0
	}
}
function add_comments_link(entry_obj,i){
	comment_innerHTML=entry_obj.getElementsByClassName('comments_link')[0].innerHTML
	myregexp = /href=\"(http:\/\/.+\/)#/
	match = myregexp.exec(comment_innerHTML)
	if (match != null && match.length > 1){
		post_link=match[1]
	}
	else{
		alert ("Unexpected Error")
		return false
	}
	onc="process_comments('"+ post_link +"',"+i+")"
	link='<a id="toogle_com_top'+ i +'" href="javascript:' + onc +'">Show Comments</a>'
	+'<span id="img_loading'+i+'"  style="position:relative;top:4px;margin-left:15px;display:none">'+img_loading+'</span>'
	entry_obj.getElementsByClassName('comments_link')[0].innerHTML+=link
}
img_loading="<img width=20 height=20 src='data:image/gif;base64,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'>"

entries_obj=document.getElementsByClassName('entry')
for (i=0;i<entries_obj.length;i++){
	entry_obj=entries_obj[i]
	comment_innerHTML=entry_obj.getElementsByClassName('comments_link')[0].innerHTML
	nc=get_number_of_comments(entry_obj)
	if (nc){
		add_comments_link(entry_obj,i)
		new_div = document.createElement("DIV")
		new_div.setAttribute("style","display:none;padding:0px 3px 10px 10px;background-color:#bed3eb;")
		new_div.setAttribute("id","com"+i)
		entry_obj.appendChild(new_div)
	}
}