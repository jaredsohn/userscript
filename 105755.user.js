// ==UserScript==
// @name           BLTest
// @namespace      bltest
// @description    Generates a like button for each forum post of www.lablms.org in firefox and chrome
// @include        http://www.lablms.org/*
// ==/UserScript==

// method iop
// like qwe
// likes wer
// alllikes ert
// user rty
// unlike tyu
// postinfo yui
// postcontent uio

// siteid asd
// postid sdf
// postids dfg
// sentbefore fgh
// username ghj
// creator_ref hjk
// subject jkl
// datestring zxc
// content xcv


var g_siteid = ""; // site id of the user currently logged in
var g_username = ""; // site name of the user currently logged in
var g_useraddcounter =0; // a counter for try again in case of failing in saving users on server
var allHTMLTags = new Array();

init();
send_user_info(false); // is called on every page of www.lablms.org but first check cookies then send request to server.


function send_user_info(forceSend)
{
	set_user_info(); // set global varibles of siteid and username
	if(g_siteid != "" && g_username != ""){ // if user info has been filled
		var cookieflag = getCookie("flag"+g_siteid);
		if (!forceSend && cookieflag!=null && cookieflag!="") // we saved this user 
		{
			// nothing to do :D we have this user in db
		}else // we do not have this user in server
		{
			GM_xmlhttpRequest({
				method: 'POST',
				url: get_server_url(),
				headers: {
					'Accept': 'application/atom+xml,application/xml,text/xml',
					"Content-Type" : "application/x-www-form-urlencoded",
				},
				data : "iop=rty&asd="+g_siteid+"&ghj="+g_username ,
				onload: function(responseDetails) {
					if(responseDetails.status == "200" && responseDetails.statusText.toLowerCase() == "ok"){
						if(responseDetails.responseText.match("code_ua") == "code_ua" ||
						responseDetails.responseText.match("code_uu") == "code_uu"){
							setCookie("flag"+g_siteid,"ok",30); // set a cookie  (name = flag89 value = ok) that this user from this computer has been saved once for 60 days
						}else if(responseDetails.responseText.match("code_reu") == "code_reu"){
							// we set a cookie in this case as we want to save this cookie for all the url of the site
							setCookie("flag"+g_siteid,"ok",30); // set a cookie  (name = flag89 value = ok) that this user from this computer has been saved once for 60 days
						}else // something is wrong so we try again two more times
						{
							g_useraddcounter +=1
							if(g_useraddcounter<3) // try two more times and get give up
								send_user_info(true);
						}
					}
				}
			});
		}
	}
}

// Copied from www.w3schools.com
function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

// Copied from www.w3schools.com
function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

// this function takes the site id and site name of the current user from footer or header (logininfo tag) 
// and store them in two global variables
function set_user_info() 
{
	if(g_siteid == "" || g_username == ""){ // if they are not set before this
		allHTMLTags=document.getElementsByTagName("*");
		for( i=0; i<allHTMLTags.length; i++){
			if(allHTMLTags[i].className.match("logininfo")=="logininfo"){ // find login info tag
				var loginTags = new Array();
				loginTags = allHTMLTags[i].getElementsByTagName("*");
				for( j=0; j < loginTags.length; j++){ // pass through logininfo tags
					if(loginTags[j].tagName.toLowerCase() == 'a') // if it is a link
					{
						if(loginTags[j].href.match("user") == "user"){ // this is the login info link tag
							// siteid
							g_siteid = loginTags[j].href.substr(loginTags[j].href.indexOf("id=")+3,loginTags[j].href.indexOf("&course=") - loginTags[j].href.indexOf("id=")-3);
							// username
							g_username = loginTags[j].innerHTML;
						}
					}
				}
			}
		}
	}
}

var g_postTag;
var g_postIds;
var g_postIdsCounter;
var g_postIdsString; // to send the whole ids together to the server
var g_sentBeforeCounter; // holds the number of time we request for likers of one page 

function init(){
	var forumPage = false;
	g_postIdsCounter = 0; // set the global counter of forumposts
	g_postIds = new Array();
	var contentTags = new Array();
	contentTags = document.getElementById("content").getElementsByTagName("*");
	var forumCounter = 0;
	for( i=0; i < contentTags.length; i++){ // seeking for forumpost tag in the content
		if(contentTags[i].className.match("forumpost")=="forumpost"){ // there is forum post tag in this content div
			forumPage = true;
			if(i>0)
			{
				if(contentTags[i-1].tagName.toLowerCase() == 'a'){
					g_postTag = contentTags[i]; // we set it for addlike button
					add_like_button(contentTags[i-1].id);
					
					g_postIds[forumCounter] = contentTags[i-1].id; // filling global forum post ids array
					g_postIdsString +=  ")("+ contentTags[i-1].id + ")(";
					forumCounter += 1; // increasing forum counter
					
					if(g_postIdsCounter == 0){ // we call get likers one after another and we control this with a global counter
						//get_likers(g_postIds[g_postIdsCounter]); //THIS WILL ENABLE ONE BY ONE GET LIKE
						g_postIdsCounter += 1;
					}
				}
			}
		}
	}
	if(forumPage){
		g_sentBeforeCounter = 0;
		get_50_likers(g_postIdsString); // THIS WILL ENABLE GET 50 LIKERS 
	}
}

function get_50_likers(allpostids)
{
	GM_xmlhttpRequest({
		method: 'POST',
		url: get_server_url(),
		headers: {
			'Accept': 'application/atom+xml,application/xml,text/xml',
			"Content-Type" : "application/x-www-form-urlencoded",
		},
		data : "iop=ert&dfg="+allpostids+"&fgh="+g_sentBeforeCounter,
		onload: function(responseDetails) {
			if(responseDetails.status==200 && responseDetails.statusText.toLowerCase() == "ok" ){
			
				var postsArr = responseDetails.responseText.split("(p)");
				var j ;
				
				for(j =0;j<postsArr.length ; j++){
				
					var onePost = "";
					var onePostId = "";
					var onePostArr = postsArr[j].split("(id)");
					
					if(onePostArr.length == 2){
						onePost = onePostArr[1];
						onePostId = onePostArr[0];
					}
					
					if(onePost.match("!@#") == "!@#" )
					{
						var resArr = onePost.split("!@#");
						var i;
						g_sentBeforeCounter = 0;
						for(i = 0; i < resArr.length; i++)
						{
							if(resArr[i].match("#@!") == "#@!" )
							{	
								var id_un = resArr[i].split("#@!");
								if(id_un.length == 2){
									add_like(onePostId,id_un[0],id_un[1]);
									g_sentBeforeCounter += 1;
								}
							}
						}
					}
					
					if(onePost.match(" code_nf ") == " code_nf " ) // Nothing for this Forum post
					{
					}
					if(onePost.match(" code_ni ") == " code_ni " ) // in case of No post Info
					{
						send_postinfo(onePostId); // REQUEST
					}else if (responseDetails.responseText.match(" code_nc ") == " code_nc " ) // in case of No post Content (like for the first time)
					{
						send_postcontent(onePostId); // REQUEST						
					}
					
					// remove this post id from g_postIdsString so server does not proccess for it again
					if(onePost.match(" code_cnt ") == " code_cnt " )
					{
						// this is the last one and might not be complete
					}else
					{
						g_postIdsString = g_postIdsString.replace(onePostId,'');
						g_sentBeforeCounter = 0;
					}
				}
				if(responseDetails.responseText.match(" code_cnt ") == " code_cnt " ) // there are still some likers (more than 50)
				{
					get_50_likers(g_postIdsString);
				}
			}
		}
	});
}

function get_likers(postid)
{
	GM_xmlhttpRequest({
		method: 'POST',
		url: get_server_url(),
		headers: {
			'Accept': 'application/atom+xml,application/xml,text/xml',
			"Content-Type" : "application/x-www-form-urlencoded",
		},
		data : "iop=wer&sdf="+postid,
		onload: function(responseDetails) {

			if(responseDetails.responseText.match("!@#") == "!@#" )
			{
				var resArr = responseDetails.responseText.split("!@#");
				var i;
				for(i = 0; i < resArr.length; i++)
				{
					if(resArr[i].match("#@!") == "#@!" )
					{	
						var id_un = resArr[i].split("#@!");
						if(id_un.length == 2){
							add_like(postid,id_un[0],id_un[1]);
						}
					}
				}
			}
			if(responseDetails.responseText.match(" code_nf ") == " code_nf " ) // Nothing for this Forum post
			{
			}
			if(responseDetails.responseText.match(" code_ni ") == " code_ni " ) // in case of No post Info
			{
				send_postinfo(postid); // REQUEST
			}else if (responseDetails.responseText.match(" code_nc ") == " code_nc " ) // in case of No post Content (like for the first time)
			{
				send_postcontent(postid); // REQUEST						
			}
			if(g_postIdsCounter<g_postIds.length){
				g_postIdsCounter += 1; // we increase the counter because the asynchronize method does not cause faults
				get_likers(g_postIds[g_postIdsCounter-1]);
			}
		}
	});
}

// This function add the like button to every forum posts.
function add_like_button(likeid){
	var postTags = new Array();
	var postTags = g_postTag.getElementsByTagName("*");
	for( j=0; j < postTags.length; j++){
		if(postTags[j].className.match("commands")=="commands"){
			if(postTags[j].innerHTML != ''){ // Add line
				postTags[j].innerHTML = postTags[j].innerHTML + " | ";
			}
			// Create button
			var newButton = document.createElement("button");
			newButton.setAttribute("type","submit");
			newButton.setAttribute("id","btn"+likeid);
			newButton.setAttribute("title","Like this forum post");
			newButton.setAttribute("style","color:=#FFDF87;");
			newButton.innerHTML = "Like";
			newButton.setAttribute("class","as_link");
			// Set events
			newButton.addEventListener('click', function(event) {
				var methodName = "";
				if(event.target.innerHTML == "Like"){
					event.target.setAttribute("title","Unlike this forum post");
					event.target.setAttribute("class","as_link1");
					event.target.innerHTML = "Unlike";
					methodName = "qwe";
				}else{
					event.target.setAttribute("title","Like this forum post");
					event.target.setAttribute("class","as_link");
					event.target.innerHTML = "Like";
					methodName = "tyu";
			    }
				// get user info 
				set_user_info(); // set global varibles of siteid and username
				if(g_siteid != ""){ // if user info has been filled				
					GM_xmlhttpRequest({
						method: 'POST',
						url: get_server_url(),
						headers: {
						'Accept': 'application/atom+xml,application/xml,text/xml',
						"Content-Type" : "application/x-www-form-urlencoded",
						},
						data : "iop="+methodName+"&asd="+g_siteid+"&sdf="+event.target.id.substr(3), // sending liker information to server
						onload: function(responseDetails) {
							if(responseDetails.status==200 && responseDetails.statusText.toLowerCase() == "ok" )
							{
								if(responseDetails.responseText.match("code_la") == "code_la" ){ // like added
									set_user_info(); // set global varibles of siteid and username
									if(g_siteid != "" && g_username != ""){ // if user info has been filled
										add_like(event.target.id.substr(3),g_siteid,g_username);
									}
								}else if(responseDetails.responseText.match("code_lu") == "code_lu" ){ // unlike added
									set_user_info(); // set global varibles of siteid and username
									if(g_siteid != "" && g_username != ""){ // if user info has been filled
										remove_like(event.target.id.substr(3),g_siteid,g_username);
									}
								}else // not like not unlike so toggle the button
								{
									if(event.target.innerHTML == "Like"){
										event.target.setAttribute("title","Unlike this forum post");
										event.target.setAttribute("class","as_link1");
										event.target.innerHTML = "Unlike";
									}else{
										event.target.setAttribute("title","Like this forum post");
										event.target.setAttribute("class","as_link");
										event.target.innerHTML = "Like";
									}
								}
								// No User name saved for this user (her/his post has been liked before OR database has been removed after he/she was added to cookies)
								if(responseDetails.responseText.match(" code_nu ") == " code_nu " ) 
								{
									send_user_info(true); // REQUEST
								}
								if(responseDetails.responseText.match(" code_ni ") == " code_ni " ) // in case of No post info (like for the first time)
								{
									send_postinfo(event.target.id.substr(3)); // REQUEST
								}else if (responseDetails.responseText.match(" code_nc ") == " code_nc " ) // in case of No post content (like for the first time)
								{
									send_postcontent(event.target.id.substr(3)); // REQUEST						
								}
								
							}else // in case of failur toggle the button
							{
								if(event.target.innerHTML == "Like"){
									event.target.setAttribute("title","Unlike this forum post");
									event.target.setAttribute("class","as_link1");
									event.target.innerHTML = "Unlike";
								}else{
									event.target.setAttribute("title","Like this forum post");
									event.target.setAttribute("class","as_link");
									event.target.innerHTML = "Like";
								}
							}
							
						}
					});
				}
				event.stopPropagation();
				event.preventDefault();
			}, true);
			//Add action listener for mouse out event
			newButton.addEventListener('mouseout', function(event) {
				event.target.setAttribute("style","text-decoration:none;");
				event.stopPropagation();
				event.preventDefault();
			}, true);
			//Add action listener for mouse over event
			newButton.addEventListener('mouseover', function(event) {
				event.target.setAttribute("style","text-decoration:underline;");
				event.stopPropagation();
				event.preventDefault();
			}, true);
			postTags[j].appendChild(newButton);
		} // End of if
	}
}

function send_postinfo(postid){
	var subject = "";
	var datestring = "";
	var siteid = "";
	var contentTags = new Array();
	if(document.getElementById(postid)!= null && document.getElementById(postid).parentNode != null){
		contentTags = document.getElementById(postid).parentNode.getElementsByTagName("*"); // the content tag around the forum post
		for( i=0; i < contentTags.length; i++){ // seeking for forumpost tag in the content
			if(contentTags[i].id == postid){ // get the forum post which is after that a tag
				if(i < contentTags.length - 1) // handle the out bound index exception
				{
					var postTag = contentTags[i + 1];
					var postTags = new Array();
					var postTags = postTag.getElementsByTagName("*");
					for( j=0; j < postTags.length; j++){
						// get the subject from the tag with class equal to subject
						if(postTags[j].className.match("subject")=="subject"){
							subject = postTags[j].innerHTML;
						}
						if(postTags[j].className.match("author")=="author"){
							// get the datestring in the author tag
							var by_dt = postTags[j].innerHTML.split("</a>");
							if(by_dt.length == 2){
								datestring = by_dt[1];
							}
							// find the user id in the author tag
							var authorTags = postTags[j].getElementsByTagName("*");
							for( k=0; k < authorTags.length; k++){
								if(authorTags[k].tagName.toLowerCase() == 'a') // if it is a link
								{
									if(authorTags[k].href.match("user") == "user"){ // this is a user profile link
										// siteid
										siteid = authorTags[k].href.substr(authorTags[k].href.indexOf("id=")+3,authorTags[k].href.indexOf("&course=") - authorTags[k].href.indexOf("id=")-3);
									}
								}
							}
						}
					}
				}
			}
		}
		// sending forum post information to the server
		GM_xmlhttpRequest({
			method: 'POST',
			url: get_server_url(),
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				"Content-Type" : "application/x-www-form-urlencoded",
			},
			data : "iop=yui&sdf="+postid+"&hjk="+siteid+"&jkl="+subject+"&zxc="+datestring ,
			onload: function(responseDetails) {
				if(responseDetails.status == "200" && responseDetails.statusText.toLowerCase() == "ok"){
					if(responseDetails.responseText.match("code_ia") == "code_ia" ){ // Post Info Added Successfully			
					}else // something is wrong so we should try again
					{
					}
					if(responseDetails.responseText.match("code_nc") == "code_nc"){ // No Post Content in server
						send_postcontent(postid); // REQUEST
					}
				}
			}
		});
	}
}

function send_postcontent(postid){
	var contentHTML = "";
	var contentTags = new Array();
	if(document.getElementById(postid)!= null && document.getElementById(postid).parentNode != null){
		contentTags = document.getElementById(postid).parentNode.getElementsByTagName("*"); // the content tag around the forum post
		for( i=0; i < contentTags.length; i++){ // seeking for forumpost tag in the content
			if(contentTags[i].id == postid){ // get the forum post which is after that a tag
				if(i < contentTags.length - 1) // handle the out bound index exception
				{
					var postTag = contentTags[i + 1];
					var postTags = new Array();
					var postTags = postTag.getElementsByTagName("*");
					
					for( j=0; j < postTags.length; j++){
						// get the subject from the tag with class equal to subject
						if(postTags[j].className.match("content")=="content"){
							var cnt_cmd = postTags[j].innerHTML.split("<div class=\"commands\">");
							if(cnt_cmd.length == 2){
								contentHTML = cnt_cmd[0];
							}
						}
					}
				}
			}
		}
		
		// sending forum post information to the server
		GM_xmlhttpRequest({
			method: 'POST',
			url: get_server_url(),
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				"Content-Type" : "application/x-www-form-urlencoded",
			},
			data : "iop=uio&sdf="+postid+"&xcv="+contentHTML ,
			onload: function(responseDetails) {
				if(responseDetails.status == "200" && responseDetails.statusText.toLowerCase() == "ok"){
					if(responseDetails.responseText.match("code_ca") == "code_ca" ){ // Post Info Added Successfully			
					}else // something is wrong so we should try again
					{
					}
				}
			}
		});
	}
}

function get_server_url()
{
	return 'http://www.doordid.com/bihelike/Handler.ashx';
}

function remove_like(postid,siteid,sitename){
	set_user_info(); // set global varibles of siteid and username
	// just a you remover!
	if(g_siteid == siteid && g_username == sitename ){
		var tempButton = document.getElementById("btn"+postid);
		if(tempButton != null){
			tempButton.setAttribute("title","Like this forum post");
			tempButton.setAttribute("class","as_link");
			tempButton.innerHTML = "Like";
		}	
		var likes_list = document.getElementById("li"+postid);
		if( likes_list != null){
			var smallDiv = document.getElementById("div"+postid);
			var divTags = new Array();
			var divTags = smallDiv.getElementsByTagName("*");
			//if(smallDiv.innerHTML == "You like this." || smallDiv.innerHTML == sitename +" likes this."){
			if(smallDiv.innerHTML == "You like this."){ // remove the whole list
				if(document.getElementById("ul"+postid) != null && document.getElementById("ul"+postid).parentNode != null)
				{
					var commandTag =document.getElementById("ul"+postid).parentNode;
					var ulTag = document.getElementById("ul"+postid);
					commandTag.removeChild(ulTag);
				}
			}else{ // just remove you
				if(smallDiv.innerHTML.length >5 && smallDiv.innerHTML.substr(0,5) == "You, "){
					smallDiv.innerHTML = smallDiv.innerHTML.substr(5);
				}else if(smallDiv.innerHTML.length >8 && smallDiv.innerHTML.substr(0,8) == "You and "){
					smallDiv.innerHTML = smallDiv.innerHTML.substr(8);
					// and change the like to likes ali like this.
					if(smallDiv.innerHTML.length>6)
						smallDiv.innerHTML = smallDiv.innerHTML.substr(0,smallDiv.innerHTML.length - 6) + "s this.";
				}
			}
		}
	}
}

function add_like(postid,siteid,sitename){
	set_user_info(); // set global varibles of siteid and username
	
	if(g_siteid == siteid && g_username == sitename ){
		var tempButton = document.getElementById("btn"+postid);
		if(tempButton != null){
			tempButton.setAttribute("title","Unlike this forum post");
			tempButton.setAttribute("class","as_link1");
			tempButton.innerHTML = "Unlike";
		}
	}
	var likes_list = document.getElementById("li"+postid);
	if( likes_list == null){
		var contentTags = new Array();
		if(document.getElementById(postid)!= null && document.getElementById(postid).parentNode != null){
			contentTags = document.getElementById(postid).parentNode.getElementsByTagName("*"); // the content tag around the forum post
			for( i=0; i < contentTags.length; i++){ // seeking for forumpost tag in the content
				if(contentTags[i].id == postid){ // get the forum post which is after that a tag
					if(i < contentTags.length - 1) // handle the out bound index exception
					{
						var postTag = contentTags[i + 1];
						var postTags = new Array();
						var postTags = postTag.getElementsByTagName("*");
						for( j=0; j < postTags.length; j++){
							if(postTags[j].className.match("commands")=="commands"){
								var newList = document.createElement("ul");
									newList.setAttribute("class","myul");
									newList.setAttribute("id","ul"+postid);
									// Triangle
								var triListItem = document.createElement("li");
									triListItem.setAttribute("class","litri");
								var triI = document.createElement("i");
									triI.setAttribute("class","itri");
									triListItem.appendChild(triI);
									// People List Item
								var newListItem = document.createElement("li");
									newListItem.setAttribute("class","lilist");
								var bigDiv = document.createElement("div");
									bigDiv.setAttribute("class","bigdiv");
									// Shast
								var shasta = document.createElement("a");
									shasta.setAttribute("class","shasta");
								var shastlabel = document.createElement("label");
									shastlabel.setAttribute("class","shastlabel");	
									shasta.appendChild(shastlabel);
									bigDiv.appendChild(shasta);
									// People List
								var smallDiv = document.createElement("div");
									smallDiv.setAttribute("class","smalldiv");
									smallDiv.setAttribute("id","div"+postid);
								if(g_siteid == siteid && g_username == sitename ) // Handling YOU like this.
								{
									smallDiv.innerHTML = "You like this.";
								}else
								{
									var newa = document.createElement("a");
										newa.setAttribute("class","namea");
										newa.setAttribute("href","http://www.lablms.org/user/view.php?id=" + siteid);
										newa.innerHTML = sitename;
										smallDiv.appendChild(newa);
										smallDiv.innerHTML = smallDiv.innerHTML  + " likes this.";
								}
									bigDiv.appendChild(smallDiv);
									newListItem.appendChild(bigDiv);
									newListItem.setAttribute("id","li"+postid);
									newList.appendChild(triListItem);
									newList.appendChild(newListItem);
									postTags[j].appendChild(newList);					
							}
						}
					}
				}
			}
		}
	}else{ // Not the first liker
		var smallDiv = document.getElementById("div"+postid);
		var divTags = new Array();
		var divTags = smallDiv.getElementsByTagName("*");
		if(g_siteid == siteid && g_username == sitename ) // Handling YOU like this.
		{
			if(smallDiv.innerHTML.length >2 && smallDiv.innerHTML.substr(0,3).toLowerCase() != "you"){ // Handle you duplicates
				if(divTags.length ==1)
				{
					smallDiv.innerHTML = "You and " + smallDiv.innerHTML;
					// and change the likes to like
					if(smallDiv.innerHTML.length>7)
						smallDiv.innerHTML = smallDiv.innerHTML.substr(0,smallDiv.innerHTML.length - 7) + " this.";
				}
				else
				{
					smallDiv.innerHTML = "You, " + smallDiv.innerHTML;
				}
			}
		}else // It is not YOU
		{
			var haveit = false;
			for( j=0; j < divTags.length; j++){ // to check whether we have the liker in the list already
				if(divTags[0].innerHTML == sitename && divTags[0].tagName.toLowerCase() == 'a' && divTags[0].href.match("id="+siteid) == "id=" + siteid )
				{
					haveit = true;
				}
			}
			if(!haveit){ // if the liker is not in the list already
				// to chech if there is a you in the list
				var justyou = "";
				var youandcomma = ""
				if(smallDiv.innerHTML.length >2 && smallDiv.innerHTML.substr(0,3).toLowerCase() == "you"){ // There is you in the list 
					justyou = "You"; // in case of 2 persons
					youandcomma = "You, "; // in case of more than 2 persons
				}
				
				smallDiv.innerHTML =smallDiv.innerHTML + "!@#";
				for( j=0; j < divTags.length; j++){
					smallDiv.appendChild(divTags[0]); // when we append one of divTags the next become the first (index = 0)
					if(divTags.length !=1 && j != divTags.length-1 ){ // To put a comma
						smallDiv.innerHTML = smallDiv.innerHTML  + ", ";
					}
				}
				// Clearing the past content of divHTML
				var divHTML = smallDiv.innerHTML.split("!@#");
				if(divHTML.length == 2){
					smallDiv.innerHTML = divHTML[1];
				}
				// adding the you if there was a you in the list
				if(smallDiv.innerHTML == "")
					smallDiv.innerHTML = justyou + smallDiv.innerHTML + " and ";
				else
					smallDiv.innerHTML = youandcomma + smallDiv.innerHTML + " and ";
				// adding new person to the end of the list
				var newa = document.createElement("a");
					newa.setAttribute("class","namea");
					newa.setAttribute("href","http://www.lablms.org/user/view.php?id=" + siteid);
					newa.innerHTML = sitename;		
				smallDiv.appendChild(newa);
				smallDiv.innerHTML = smallDiv.innerHTML  + " like this.";
			}
		}
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
//=====================================================
addGlobalStyle('button.as_link { -moz-user-select: text ! important; }');
addGlobalStyle('button.as_link { background: none repeat scroll 0 0 transparent ! important; }');
addGlobalStyle('button.as_link { border: medium none ! important; }');
addGlobalStyle('button.as_link { color: #F6BA64 ! important; }');
addGlobalStyle('button.as_link { cursor: pointer ! important; }');
addGlobalStyle('button.as_link { font-family: "lucida grande",tahoma,verdana,arial,sans-serif! important; }');
addGlobalStyle('button.as_link { font-size: 100%! important; }');
addGlobalStyle('button.as_link { margin: 0 ! important; }');
addGlobalStyle('button.as_link { overflow: visible! important; }');
addGlobalStyle('button.as_link { padding: 0 ! important; }');
addGlobalStyle('button.as_link { text-align: left! important; }');
addGlobalStyle('button.as_link { width: auto ! important; }');
addGlobalStyle('button.as_link { direction: ltr! important; }');
//======================================================
addGlobalStyle('button.as_link1 { -moz-user-select: text ! important; }');
addGlobalStyle('button.as_link1 { background: none repeat scroll 0 0 transparent ! important; }');
addGlobalStyle('button.as_link1 { border: medium none ! important; }');
addGlobalStyle('button.as_link1 { color: #F6BA64 ! important; }');
addGlobalStyle('button.as_link1 { cursor: pointer ! important; }');
addGlobalStyle('button.as_link1{ font-family: "lucida grande",tahoma,verdana,arial,sans-serif! important; }');
addGlobalStyle('button.as_link1 { font-size: 100%! important; }');
addGlobalStyle('button.as_link1 { margin: 0 ! important; }');
addGlobalStyle('button.as_link1 { overflow: visible! important; }');
addGlobalStyle('button.as_link1 { padding: 0 ! important; }');
addGlobalStyle('button.as_link1 { text-align: left! important; }');
addGlobalStyle('button.as_link1 { width: auto ! important; }');
addGlobalStyle('button.as_link1 { direction: ltr! important; }');
//======================================================= UL
addGlobalStyle('.myul { padding-top: 2px ! important; }');
addGlobalStyle('.myul { width: 100% ! important; }'); // dynamic size of the list
addGlobalStyle('.myul { list-style-type: none ! important; }');
addGlobalStyle('.myul { margin: 0 ! important; }');
addGlobalStyle('.myul { padding: 0 ! important; }');
//addGlobalStyle('.myul { border-style: solid ! important; }');
addGlobalStyle('.myul { word-wrap: break-word ! important; }');
addGlobalStyle('.myul { color: #333333 ! important; }');
addGlobalStyle('.myul { direction: ltr ! important; }');
addGlobalStyle('.myul { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');
addGlobalStyle('.myul { font-size: 11px ! important; }');
addGlobalStyle('.myul { text-align: left ! important; }');
//======================================================= LI list of names   
addGlobalStyle('.lilist { background-color: #FFDF87 ! important; }');
addGlobalStyle('.lilist { border-bottom: 1px solid #E5EAF1 ! important; }');
addGlobalStyle('.lilist { margin-top: 2px ! important; }');
addGlobalStyle('.lilist { padding: 5px 5px 4px ! important; }');
addGlobalStyle('.lilist { border-width: 1px 0 0 ! important; }');
addGlobalStyle('.lilist { display: block ! important; }');
addGlobalStyle('.lilist { list-style-type: none ! important; }');
//addGlobalStyle('.lilist { border-style: solid ! important; }');
addGlobalStyle('.lilist { word-wrap: break-word ! important; }');
addGlobalStyle('.lilist { color: #333333 ! important; }');    
addGlobalStyle('.lilist { direction: ltr ! important; }');
addGlobalStyle('.lilist { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');
addGlobalStyle('.lilist { font-size: 11px ! important; }');
addGlobalStyle('.lilist { text-align: left ! important; }');
//======================================================= LI tirangle
addGlobalStyle('.litri { margin-bottom: -2px ! important; }');
addGlobalStyle('.litri { margin-top: 0 ! important; }');
addGlobalStyle('.litri { border-width: 0 ! important; }');
addGlobalStyle('.litri { display: block ! important; }');
addGlobalStyle('.litri { list-style-type: none ! important; }');    
//addGlobalStyle('.litri { border-style: solid ! important; }');
addGlobalStyle('.litri { word-wrap: break-word ! important; }');
addGlobalStyle('.litri { color: #333333 ! important; }');
addGlobalStyle('.litri { direction: ltr ! important; }');
addGlobalStyle('.litri { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');
addGlobalStyle('.litri { font-size: 11px ! important; }');
addGlobalStyle('.litri { text-align: left ! important; }');	
//======================================================= I tirangle
//addGlobalStyle('.itri { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/z7/r/UvyvLtJTQzO.png") ! important; }');
addGlobalStyle('.itri { background-image: url("http://www.doordid.com/bihelike/tri.png") ! important; }');
addGlobalStyle('.itri { background-position: 0 0 ! important; }');		    
addGlobalStyle('.itri { background-repeat: no-repeat ! important; }');		    
addGlobalStyle('.itri { display: block ! important; }');		    
addGlobalStyle('.itri { height: 5px ! important; }');		    
addGlobalStyle('.itri { margin-left: 17px ! important; }');		    
addGlobalStyle('.itri { width: 9px ! important; }');		    
//======================================================= A shast
addGlobalStyle('.shasta { margin-right: 5px ! important; }');
addGlobalStyle('.shasta { float: left ! important; }');	
addGlobalStyle('.shasta { color: #3B5998 ! important; }');		
addGlobalStyle('.shasta { cursor: pointer ! important; }');	
addGlobalStyle('.shasta { text-decoration: none ! important; }');	
addGlobalStyle('.shasta { list-style-type: none ! important; }');
//addGlobalStyle('.shasta { border-style: solid ! important; }');
addGlobalStyle('.shasta { word-wrap: break-word ! important; }');
addGlobalStyle('.shasta { direction: ltr ! important; }');
addGlobalStyle('.shasta { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');
addGlobalStyle('.shasta { font-size: 11px ! important; }');
addGlobalStyle('.shasta { text-align: left ! important; }');
//======================================================= Label shast	
//addGlobalStyle('.shastlabel { background-image: url("http://static.ak.fbcdn.net/rsrc.php/v1/z6/r/l9Fe9Ugss0S.gif") ! important; }');
addGlobalStyle('.shastlabel { background-image: url("http://www.doordid.com/bihelike/shast.png") ! important; }');
addGlobalStyle('.shastlabel { background-position: 0 0 ! important; }');
addGlobalStyle('.shastlabel { background-repeat: no-repeat ! important; }');
addGlobalStyle('.shastlabel { display: block ! important; }');
addGlobalStyle('.shastlabel { height: 13px ! important; }');
addGlobalStyle('.shastlabel { width: 15px ! important; }');
//======================================================= big div
addGlobalStyle('.bigdiv { display: block ! important; }');
addGlobalStyle('.bigdiv { list-style-type: none ! important; }');	
//addGlobalStyle('.bigdiv { border-style: solid ! important; }');		
addGlobalStyle('.bigdiv { word-wrap: break-word ! important; }');
addGlobalStyle('.bigdiv { color: #333333 ! important; }');	
addGlobalStyle('.bigdiv { direction: ltr ! important; }');
addGlobalStyle('.bigdiv { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');
addGlobalStyle('.bigdiv { font-size: 11px ! important; }');
addGlobalStyle('.bigdiv { text-align: left ! important; }');
//======================================================= small div	
addGlobalStyle('.smalldiv { padding-top: 1px ! important; }');	
addGlobalStyle('.smalldiv { display: table-cell ! important; }');	
addGlobalStyle('.smalldiv { vertical-align: top ! important; }');	
//addGlobalStyle('.smalldiv { width: 10000px ! important; }'); I don't understand why facebook have this (it cause posts to take full width of screen NOT COOL)
addGlobalStyle('.smalldiv { list-style-type: none ! important; }');		
//addGlobalStyle('.smalldiv { border-style: solid ! important; }');		
addGlobalStyle('.smalldiv { word-wrap: break-word ! important; }');	
addGlobalStyle('.smalldiv { color: #333333 ! important; }');	
addGlobalStyle('.smalldiv { direction: ltr ! important; }');	
addGlobalStyle('.smalldiv { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');	
addGlobalStyle('.smalldiv { font-size: 11px ! important; }');	
addGlobalStyle('.smalldiv { text-align: left ! important; }');			  
//======================================================= names a    
addGlobalStyle('.namea { color: #3B5998 ! important; }');
addGlobalStyle('.namea { cursor: pointer ! important; }');
addGlobalStyle('.namea { text-decoration: none ! important; }');
addGlobalStyle('.namea { list-style-type: none ! important; }');
//addGlobalStyle('.namea { border-style: solid ! important; }');
addGlobalStyle('.namea { word-wrap: break-word ! important; }');
addGlobalStyle('.namea { direction: ltr ! important; }');
addGlobalStyle('.namea { font-family: "lucida grande",tahoma,verdana,arial,sans-serif ! important; }');
addGlobalStyle('.namea { font-size: 11px ! important; }');
addGlobalStyle('.namea { text-align: left ! important; }');
