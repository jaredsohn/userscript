// ==UserScript==
// @name           View/Filter All Posts and Post Count
// @namespace      GLB
// @description    This will combine all pages in a thread to a single view.  This will then allow for filtering of the posting user.  To get the post count, continue to check the Error Console (Ctrl+Shift+J).  This script will be updated to clean up the css at some point.  There also is a way to get an alert with the post count, instead of the console output.
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// @include        http://*.warriorgeneral.com/game/forum_thread_list.pl?*
// ==/UserScript==



var buseshort = true;
var loaded = false;
var pages = new Array();
var posts = new Array();
var threadPages;
var users = new Array();
var UserPostCount = new Array();
	var allAgents = new Array();
	var allAgentPosts = new Array();


window.setTimeout(function() {

	boxSetup();

}, 1000);


function divSetup() {
	var head = document.getElementsByTagName('head')[0],
	style = document.createElement('style'),
	//rules = document.createTextNode('h1 { background: red; }');
	rules = document.createTextNode('#body_container {background-color: #FFFFFF; height: auto !important; margin-left: auto; margin-right: auto; min-height: 100%; padding-bottom: 30px; position: relative; text-align: left; width: 1000px;margin-left: auto;margin-right: auto;	}');
	rules2 = document.createTextNode('#header {background-image: url("/images/game/design/header.jpg");    border-bottom: 20px solid #A03C19;    height: 80px;    left: 0;    position: absolute;top: 0;    width: 1000px;    z-index: 254;margin-left: auto;margin-right: auto;}');
	rules3 = document.createTextNode('#body_shadow {background-image: url("/images/game/design/background_shadow.gif"); background-repeat: repeat-y;	    height: 100%;	    left: -30px;	    min-height: 100%;	    position: absolute;	    width: 30px;}');
	rules4 = document.createTextNode('#body_shadow_right {background-image: url("/images/game/design/background_shadow_right.gif");	    background-repeat: repeat-y;	    height: 100%;	    min-height: 100%;	    position: absolute;	    right: -30px;	    width: 30px;}');
	rules5 = document.createTextNode('#toolbar {background-image: url("/images/game/design/toolbar.gif");background-repeat: repeat-x;	    color: white;	    font-size: 14px;	    font-weight: bold;	    height: 30px;	    position: absolute;	    top: 80px;	    width: 1000px; margin-left: auto;margin-right: auto; z-index: 255;}');
	//rules6 = document.createTextNode('#content {background: url("/images/game/design/content_bg.jpg") repeat-x scroll 0 110px #FFFFFF;	    height: 100%;	    min-height: 100%;	    padding-left: 10px;	    padding-right: 10px;	    padding-top: 110px;	    position: relative;	    width: 980px;}');
	rules6 = document.createTextNode('#content { height: 100%;	    min-height: 100%;	    padding-left: 10px;	    padding-right: 10px;	    padding-top: 110px;	    position: relative;	    width: 980px;}');
	rules7 = document.createTextNode('#footer {bottom: 0;height: 1.5em;position: absolute;}');
	//rules8 = document.createTextNode('.outer_post { width: 980px   position: relative;}');
	//rules9 = document.createTextNode('#content_header {    background: url("/images/game/design/content_tabs_bg.gif") repeat-x scroll center bottom transparent;  margin-bottom: 100px; left: -10px;    margin: 0 0 2px;    padding: 1px 10px 0;    position: relative;    width: 100%;    z-index: 253;}');
	//rules10 = document.createTextNode('.post_user {    float: left;    height: 140px;    text-align: center;    width: 110px;    z-index: 3;}');
	rules10 = document.createTextNode('.post_user {    float: left;    height: 140px;    text-align: center;    width: 110px;    z-index: 3;}');
	rules11 = document.createTextNode('.user_avatar {    background-color: white;    border: 1px solid black;    height: 75px;    margin-bottom: 6px;    margin-left: 17px;    margin-top: 6px;    position: relative;    width: 75px;    z-index: 5;}');
	rules12 = document.createTextNode('.quote {background-color:#FBF9F5;border:1px solid #757575;display:block;margin-left:10px;padding:6px;width:95%;}');




	style.type = 'text/css';
	if(style.styleSheet)
	    style.styleSheet.cssText = rules.nodeValue;
	else{
		style.appendChild(rules);
		style.appendChild(rules2);
		style.appendChild(rules3);
		style.appendChild(rules4);
		style.appendChild(rules5);
		style.appendChild(rules6);
		style.appendChild(rules7);
		//style.appendChild(rules8);
		//style.appendChild(rules9);
		style.appendChild(rules10);
		style.appendChild(rules11);
		style.appendChild(rules12);
	}
	//console.log("Appended style");
	head.appendChild(style);

	var body = document.getElementsByTagName("body")[0];
	body.innerHTML = "";

	var bodyContainer = document.createElement("div");
	bodyContainer.setAttribute("id","body_container");
	body.appendChild(bodyContainer);

	var bodyShadowContainer = document.createElement("div");
	bodyShadowContainer.setAttribute("id","body_shadow");
	bodyContainer.appendChild(bodyShadowContainer);

	var bodyShadowRightContainer = document.createElement("div");
	bodyShadowRightContainer.setAttribute("id","body_shadow_right");
	bodyContainer.appendChild(bodyShadowRightContainer);

	var headerContainer = document.createElement("div");
	headerContainer.setAttribute("id","header");
	bodyContainer.appendChild(headerContainer);

	var toolbarContainer = document.createElement("div");
	toolbarContainer.setAttribute("id","toolbar");
	bodyContainer.appendChild(toolbarContainer);

	var contentContainer = document.createElement("div");
	contentContainer.setAttribute("id","content");
	bodyContainer.appendChild(contentContainer);

	var contentHeaderContainer = document.createElement("div");
	contentHeaderContainer.setAttribute("id","content_header");
	contentHeaderContainer.setAttribute("style",'background: url("/images/game/design/content_tabs_bg.gif") repeat-x scroll center bottom transparent; left: -10px; margin: 0pt 0pt 50px; padding: 1px 10px 0pt; position: relative; width: 100%; height: 0px; z-index: 253; bottom: 50px; top: 0px;');
	contentContainer.appendChild(contentHeaderContainer);



	//add children to content

	var footerContainer = document.createElement("div");
	footerContainer.setAttribute("id","footer");
	bodyContainer.appendChild(footerContainer);

	return contentContainer;
}

function boxSetup() {
	//get all the post counts
	var threads = getElementsByClassName("post_count", document);

	for each(thread in threads)
	{

		var container_temp = getElementsByClassName("thread_title",thread.parentNode);
		var container = container_temp[0];

		var urlElement = getElementsByClassName("thread_title",thread.parentNode);
		var url = urlElement[0].firstChild.href;

		var postString = getElementsByClassName("post_count",thread.parentNode);
		var posts = parseFloat(postString[0].innerHTML);

		threadPages = parseInt(posts/15)+1;

		//postString[0].innerHTML = '<a href=javascript:;>'+posts+'<//a>';
		var linkURL = url+'&page='+threadPages;

		var threadID = url.split("=")[1];
		var button = document.createElement("input");
		button.setAttribute("value","<");
		button.setAttribute("type","button");
		button.setAttribute("id","btn_"+threadID);
		button.setAttribute("link",url);
		button.setAttribute("pages",threadPages);
		button.addEventListener("click",function(){getData(this.getAttribute("id"),this.getAttribute("link"),this.getAttribute("pages"))},false);
    	thread.appendChild(button);
	}
}

function getData(buttonID, url, threadPages){

	var btn = document.getElementById(buttonID);
	btn.setAttribute("value","0/"+threadPages);
	btn.disabled = true;



	for (var i=1;i<=threadPages;i++){
		var linkURL = url+'&page='+i;
		var html = getInetPage(linkURL);
		html = html.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
		var div = document.createElement("div");
		div.innerHTML = html;

		getThreadData(div, i);

		//getThreadData(linkURL);
		btn.setAttribute("value",i+"/"+threadPages);
	}

	var button = document.createElement("input");
	button.setAttribute("value","Ready");
	button.setAttribute("type","button");
	button.setAttribute("id","bsbutton");
	button.setAttribute("link",linkURL);
	button.addEventListener("click",function(){displayData(this.getAttribute("link"))},false);

	btn.parentNode.appendChild(button);

	for (var i = 1; i< pages.length;i++){
		var page = pages[i];
		for (var j = 0; j <page.length;j++){
			loadAgents(page[j]["User"]);
			//addCount(page[j]["User"]);//need to fix
		}
	}
	sortPostCount();
	console.log(outputPostCount());
	//alert(outputPostCount());
}

function addCount(entry){
	try{
		console.log("increment");
		UserPostCount[entry]["Count"]++
	}
	catch(ex){
		console.log("add: " + entry);
		UserPostCount[entry]["User"] = entry;
		UserPostCount[entry]["Count"] = 1;
	}
}

function generatePlayers(){
	for (var i = 1; i< pages.length;i++){
		var page = pages[i];
		for (var j = 0; j <page.length;j++){
			var user = page[j]["User"];
			users[user] = user;
		}
	}
}

function changeDivs(username){

	var idx = username.selectedIndex;
	// get the value of the selected option
	var which = username.options[idx].value;
	console.log("Changing divs: " + which);

	if (which == 'All'){
		//console.log('All');
		var divs = document.getElementsByClassName("outer_post");
		for each (div in divs){
			div.style.display = 'block';
		}
	}
	else{
		//console.log('Changing to ' + which);
		var divs = document.getElementsByClassName("outer_post");
		//console.log('Div count: ' + divs.length);
		for each (div in divs){
			//console.log(div.id);
			if (div.id == which){
				div.style.display = 'block';
			}
			else{
				div.style.display = 'none';
			}
		}
	}
}

function displayData(linkAddress){

	var content = divSetup();

	var toolbar = document.getElementById("toolbar");


	generatePlayers();
	//var elSel = document.getElementById('users');
	var userList = ""

	var select = document.createElement('Select');
	select.setAttribute("name","usersList");
	//select.onchange=function(){alert('test');};
	select.addEventListener("change", function(){changeDivs(this);}, true);

	var opt = document.createElement('Option');
	opt.appendChild(document.createTextNode('All'));
	opt.innerText = 'All';
	opt.value = 'All';
	select.appendChild(opt);

	for each (var user in users){
		opt = document.createElement('Option');
		opt.appendChild(document.createTextNode(user));
		opt.innerText = user;
		opt.value = user;
		select.appendChild(opt);

		userList += '<option value="' +user +'">'+user+'</option>';
	}
	toolbar.appendChild(select);
	//toolbar.innerHTML = '<form name="userListForm"><select name="usersList" id="usersList" onchange=changeDivs();>'+userList+'</select></form>';

	//console.log("Adding content nodes.");
	for (var i = 1;i< pages.length;i++){
		var page = pages[i];

		for (var j = 0; j < page.length;j++){
			//console.log("Page:Post: " + i + ":" + j);

			var userDiv = document.createElement("div");
			userDiv.innerHTML = page[j]["User"];
			userDiv.setAttribute("style","");


			var createdDiv = document.createElement("div");

			createdDiv.setAttribute("class","outer_post");
			createdDiv.setAttribute("id",page[j]["User"]);
			createdDiv.setAttribute("style","position: relative; width: 940px; border: 2px solid #A0A0A0;  margin: 10px; padding: 10px; background-color: #EEEEEE;");
			content.appendChild(createdDiv);
			createdDiv.innerHTML = '<div style="padding: 5px; background-color: #65250D; height: 20px;"><span style="color:white;font-weight:bold;font-size:14px;">' +page[j]["User"] +	 '</span><span style="color:white;font-weight:bold;font-size:14px;position: absolute; right: 0; margin-right: 20px;"> Page: ' + i + '/' + (j+1) +'</span> </div>' + page[j]["InnerContent"];
			//console.log(page[j]["InnerContent"]);  //Text of the post
		}
	}
}


function getThreadData(htmlPage, page) {
	var content = new Array();

	var div = htmlPage;

	//console.log("loading data...");
	var contentPosts = div.getElementsByClassName("outer_post");
	//console.log("Length: " + contentPosts.length);

	for (var i = 0;i<contentPosts.length;i++){
		var thisPost = new Array();

		var username = contentPosts[i].getElementsByClassName("user_name");
		username = username[0].innerHTML.split('>')[1].split('</')[0];
		thisPost["User"]=username;

		thisPost["UserContent"]=contentPosts[i].getElementsByClassName("post_user")[0].innerHTML;
		thisPost["InnerContent"] = div.getElementsByClassName("outer_post")[i].getElementsByClassName("post_content_inner")[0].innerHTML
		//var post = div.getElementsByClassName("outer_post")[i];
		//console.log(thisPost["InnerContent"]);
		content[i] = thisPost;
	}

	pages[page] = content;
	//console.log("finished loading...");
}


function getInetPage(address) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, false)
	req.send(null);
	if(req.status == 200) {
		//console.log(req.getResponseHeader("Content-Type"));
	}
	return req;
}


function getElementsByClassName(classname, par){
	var a=[];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");

	for(var i=0,j=els.length; i<j; i++){
		if(re.test(els[i].className))
		{
			a.push(els[i]);
		}
	}
	return a;
}

//Used to output arrays to the browser.
function print_r(theObj){
  if(theObj.constructor == Array ||
     theObj.constructor == Object){
    document.write("<ul>")
    for(var p in theObj){
      if(theObj[p].constructor == Array||
         theObj[p].constructor == Object){
document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
        document.write("<ul>")
        print_r(theObj[p]);
        document.write("</ul>")
      } else {
document.write("<li>["+p+"] => "+theObj[p]+"</li>");
      }
    }
    document.write("</ul>")
  }
}


function loadAgents(agent) {

		var x = findValue(allAgents,agent);

		if (x == -1)
		{
			var pointer = allAgents.length;
			allAgents[pointer] = agent;
			allAgentPosts[pointer]=1;
		}
		else{
			allAgentPosts[x] += 1;
	}
}

function sortPostCount(){
	var x, y, holder;
	  // The Bubble Sort method.
	  for(x = 0; x < allAgentPosts.length; x++) {
		for(y = 0; y < (allAgentPosts.length-1); y++) {
		  if(allAgentPosts[y] < allAgentPosts[y+1]) {
			holder = allAgentPosts[y+1];
			allAgentPosts[y+1] = allAgentPosts[y];
			allAgentPosts[y] = holder;
			holder = allAgents[y+1];
			allAgents[y+1] = allAgents[y];
			allAgents[y] = holder;
		  }
		}
  	}
}

function outputPostCount(){
	var message = '';
	for (var i = 0; i< allAgents.length;i++){
		message += allAgents[i] + "\t [B][u]" + allAgentPosts[i] + "[/B][/u]\n";
	}
	return message;
}
function findValue(a,id){

	if (a.length > 0)
	{
		for (var i = 0;i<=a.length;i++)
		{
			if(typeof(a[i]) != "undefined")
			{
				var temp = a[i].toString();
				if (temp == id)
				{
					return i;
				}
			}
		}
	}
	return -1;
}