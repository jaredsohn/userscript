// ==UserScript==
// @name           better_danbooru
// @namespace      otani
// @description    Several changes to make Danbooru much better.  Including the viewing of loli/shota images on non-upgraded accounts.
// @include        http://danbooru.donmai.us/*
// ==/UserScript==

/*True or false settings*/
//Global
var show_loli = true;
var show_shota = true;
var hide_upgrade_message = true;
var hide_advertisements = true;
//Popular
var enable_popular_by = true; //Enables popular by week and popular by month links on post subnavbar.
//Search
var enable_arrow_nav = true; //Doesn't work when input has focus.
var add_border = true; //Adds a light blue border to Shota and pink border to Loli
var search_add = true; //Show + to tag list to add search term
//Post
var hide_comment_message = true;
var sample_resize = true; //When you press an image it shows the sample version.  Won't work if your options are set to show samples.

/*Set Border Colors.  Use CSS hex values for colors.  http://www.w3schools.com/CSS/css_colors.asp*/
var loli_border = "#FFC0CB";
var shota_border = "#66CCFF";
var child_border = "#00FF00"; //Is Child
var parent_border = "#CCCC00"; //Is Parent
var pending_border = "#0000FF";

/*Don't touch below this line!*/
if(show_loli && wordCheck("loli")){
	if(/show/.test(location.href)){postImage();}else{searchImages();}}
if(show_shota && wordCheck("shota")){
	if(/show/.test(location.href)){postImage();}else{searchImages();}}
if(hide_upgrade_message){hideUpgradeMessage();}
if(hide_advertisements){hideAdvertisements();}
if(enable_popular_by && /post\/popular_by/.test(location.href)){enablePopularBy();}
if(/post/.test(location.href)){
	checkFocus();//Turns off arrow nav if an input box or textarea has focus.  You can safely delete this line, but why would you?
	window.addEventListener("keydown", keyCheck, false);}
if(search_add && /post/.test(location.href)){searchAdd();}
if(hide_comment_message){hideCommentMessage();}
if(sample_resize && /show/.test(location.href)){sampleResize();}

/*Functions*/
function searchImages(){//Form url
	var url = "http://danbooru.donmai.us/post/index.xml?";
	if(getVar("tags")){url += "&tags="+getVar("tags");}
	if(getVar("page")){url += "&page="+getVar("page");}
	fetchData(url, "search");}

function fetchData(url, mode){//Retrieve XML
	var xmlhttp = new XMLHttpRequest();
	if (xmlhttp!=null){
		xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){// 4 = "loaded"
			if (xmlhttp.status==200){// 200 = "OK"
				xml = new DOMParser();
				xml = xml.parseFromString(xmlhttp.responseText,"text/xml");
				(mode=="notes") ? showNotes(xml) : parseData(xml);}else{
					alert(xmlhttp.statusText);}}}
		xmlhttp.open("GET",url,true);
		xmlhttp.send(null);}}

function parseData(xml){//Use XML to create links
	var where = document.evaluate('//div[@class="content"]/div[last()-1]', document, null, 9, null).singleNodeValue;
	out = "";
	var posts = xml.getElementsByTagName("post");

	for(var x=0; x<posts.length; x++){
		var url = posts[x].getAttribute("id");
		var style = "border:none;";
		if(posts[x].getAttribute("has_children")=="true"){style = "border: 3px solid "+child_border+";";}
		if(posts[x].getAttribute("parent_id")!=""){style = "border: 3px solid "+parent_border+";";}
		if(posts[x].getAttribute("status")=="pending"){style = "border: 3px solid "+pending_border+";";}
		if(add_border){
			if(/\bshota\b/.test(posts[x].getAttribute("tags"))){style = "border: 3px solid "+shota_border+";";}
			if(/\bloli\b/.test(posts[x].getAttribute("tags"))){style = "border: 3px solid "+loli_border+";";}}
		if(/flash/.test(posts[x].getAttribute("tags"))){//Get swf details from results. Correct file, height, and width.
			url += "?swf="+posts[x].getAttribute("md5")+"&height="+posts[x].getAttribute("height")+"&width="+posts[x].getAttribute("width");}

		out += "<span class=\"thumb\"><a href=\"http://danbooru.donmai.us/post/show/"+url+"\" onclick=\"return PostModeMenu.click("+posts[x].getAttribute("id")+")\"><img src=\""+posts[x].getAttribute("preview_url")+"\" alt=\""+posts[x].getAttribute("tags")+"\" title=\""+posts[x].getAttribute("tags")+"\" style=\""+style+"\"/></a></span>";}
		where.innerHTML = out;}

function postImage(){
	var paragraph = document.evaluate('//div[@id="right-col"]/div[2]', document, null, 9, null).singleNodeValue;//Yay for XPath, no more loop
	if(/swf/.test(location.href)){
		paragraph.innerHTML = "<embed src='../../data/"+getVar("swf")+".swf' width='"+getVar("width")+"px' height='"+getVar("height")+"px'></embed><p><br/><a href=\"../../data/"+getVar("swf")+".swf\">Save this flash (right click and save)</a></p>";
		return;}
	var img_url = imageURL();
	if(isThere(img_url)){
		paragraph.innerHTML = "<img id=\"better_danbooru\" src=\""+img_url+"\"/>";}else{
			nextEXT(img_url, paragraph);}
	//Allow tags to be edited
	document.getElementById("post_tags").disabled=false;
	if(/translated/.test(document.getElementById("tag-sidebar").innerHTML)){
		var id = /[0-9]+/.exec(location.href);
		var url = "http://danbooru.donmai.us/note/index.xml?post_id="+id;
		document.getElementById("better_danbooru").addEventListener("load", function(){fetchData(url, "notes");},false);}}

//Retrieve url for image. 
function imageURL(){
	var where = document.evaluate('//div[@class="sidebar"]/div[last()]/ul/li[last()]/a', document, null, 9, null).singleNodeValue;
	var preview = where.href.split("=")[1];
	return preview.replace("preview/", "");}

//Checks if file exists.  Thanks to some random forum!
function isThere(url){
	var req = new XMLHttpRequest(); // XMLHttpRequest object
	try {
		req.open("HEAD", url, false);
		req.send(null);		
		return req.status == 200 ? true : false;}
	catch(er){return false;}}

//If JPG doesn't exist look for other extensions.  Currently also looks for gif or swf files.
function nextEXT(img, where){
	if(isThere(img.replace("jpg", "gif"))){where.innerHTML = "<img id=\"better_danbooru\" src=\""+img.replace("jpg", "gif")+"\"/>"; return;}
	if(isThere(img.replace("jpg", "png"))){where.innerHTML = "<img id=\"better_danbooru\" src=\""+img.replace("jpg", "png")+"\"/>"; return;}}

function showNotes(xml){
	var notes = xml.getElementsByTagName("note");
	var container = document.createElement("div");
	container.setAttribute("id", "note-container");
	
	var style = document.createElement("style");
	style.innerHTML = ".otaniShow:hover .otaniHidden{display: block;}\n .otaniHidden{display: none; padding: 5px;}\n .otaniShow div{margin: 5px; background: #FFFFEE; border: solid black 1px;}";
	container.appendChild(style);

	for(var i=0; i<notes.length; i++){
		var note = document.createElement("div");
		note.className = "otaniShow";
		note.setAttribute("style", "");
		note.style.cursor = "default";
		note.style.position = "absolute";
		note.style.left = notes[i].getAttribute("x")+"px";
		note.style.top = notes[i].getAttribute("y")+"px";
		container.appendChild(note);
		
		var box = document.createElement("div");
		box.setAttribute("style", "");
		box.style.height = notes[i].getAttribute("height")+"px";
		box.style.width = notes[i].getAttribute("width")+"px";
		box.style.opacity = "0.5";	
		note.appendChild(box);
		
		var text = document.createElement("div");
		text.className = "otaniHidden";
		text.innerHTML = notes[i].getAttribute("body");
		text.setAttribute("style", "");
		text.style.minWidth = notes[i].getAttribute("width")+"px";
		note.appendChild(text);}
	var where = document.evaluate('//div[@id="right-col"]/div[2]', document, null, 9, null).singleNodeValue;
	where.insertBefore(container, where.firstChild);}

function hideUpgradeMessage(){
	var x = document.getElementById("upgrade-account");
	if(x){x.style.display = "none";}}

function hideAdvertisements(){
	var img = document.evaluate('//img[@alt="Advertisement"]', document, null, 6, null);
	for(var i=0; i<img.snapshotLength; i++){
		img.snapshotItem(i).style.display = "none";}}

function enablePopularBy(){
	document.getElementById("header").innerHTML +="<ul class=\"flat-list\" id=\"subnavbar\" style=\"position: relative; top: -20px\"><li><a href=\"/post/popular_by_day\">Popular By Day</a></li><li><a href=\"/post/popular_by_week\">Popular By Week</a></li><li><a href=\"/post/popular_by_month\">Popular By Month</a></li></ul>";}

function keyCheck(e){
	if(!enable_arrow_nav){return;}//If arrow nav is disabled, don't do anything
	if(e.keyCode==37){arrowNav("left");}
	if(e.keyCode==39){arrowNav("right");}}

function arrowNav(dir){
	var page = parseInt(getVar("page"));
	if(!page){page = 1;}
	var url = new String(window.location);

	if(dir=="left"){page--;}//left
	if(dir=="right"){page++;}//right
	if(page<1){page = 1;}
	if(!/\?/.test(url)){url += "?";}//If no ? is found, add one.  Needed for GET vars
	url = url.replace(/&?page=[0-9]+/, "");
	window.location = url+"&page="+page;}

function checkFocus(){
	var input = document.getElementsByTagName("input");
	var textarea = document.getElementsByTagName("textarea");
	addEvent(input);
	addEvent(textarea);}
function addEvent(vars){
	for(var x=0; x<vars.length; x++){
		vars[x].addEventListener("focus", function(){enable_arrow_nav = false;}, false);
		vars[x].addEventListener("blur", function(){enable_arrow_nav = true;}, false);}}

function searchAdd(){
	//Where = array of <li> in tag-sidebar
	var where = document.getElementById("tag-sidebar");
	if(!where){return;}else{where = where.getElementsByTagName("li");}
	var tag = getVar("tags");
	if(!tag){return;}//If no tag found, stop
	for(var x=0; x<where.length; x++){
		var newLink = where[x].getElementsByTagName("a")[1].href+"+"+tag;
		where[x].innerHTML = "<a href=\""+newLink+"\">+</a> "+where[x].innerHTML;}}

function hideCommentMessage(){
	var x = document.getElementById("comments");
	if(!x){x = document.getElementById("comment-list");}
	if(x){x.getElementsByTagName("div")[0].style.display = "none";}}

function sampleResize(){
	var img = document.evaluate('//div[@id="right-col"]/div[2]/img', document, null, 9, null).singleNodeValue;
	if(!img){return;}//Exit if flash file
	img.removeAttribute("height");//Make it so resized isn't stretched >.>
	img.removeAttribute("width");

	var src = img.src; //Original Source
	var newSrc = src.replace("/data/", "/data/sample/sample-"); //New Source
	newSrc = newSrc.replace(/\..{3}$/, ".jpg");//Replace extension with jpg

	if(!isThere(newSrc)){return;}
	img.addEventListener("click", toggleSize, false);

	function toggleSize(){
		if(img.src==newSrc){//If resized
			img.src = src;
			document.getElementById("note-container").style.display = "block";}else{//If original
				img.src = newSrc;
				document.getElementById("note-container").style.display = "none";}}}

//Checks for Loli and Shota, if neither are found no images are changed.
function wordCheck(word){
	if(/comment/.test(location.href)){return false;}//Don't work on comment page
	var check = new RegExp(word);
	if(word=="shota"){var check = new RegExp(/\bshota\b/);}
	if(word=="loli"){var check = new RegExp(/\bloli\b/);}
	var body = document.body;
	if(/show/.test(location.href)){body = document.getElementsByTagName("title")[0];}
	return check.test(body.innerHTML);}

//Wow I actually found a good use for my get variable method.
function getVar(getVar){
	var search = new RegExp(getVar +"=.+?(?=&)");
	var result = new String(search.exec(location.href));
	if(result=="null"){
		var search = new RegExp(getVar +"=.+");
		var result = new String(search.exec(location.href));}
	return result.split("=")[1];}