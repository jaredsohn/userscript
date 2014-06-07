// ==UserScript==
// @name           Alternate Post Apperance
// @namespace      APA
// @description    Changes the apperance of posts on Kongregate!
// @include        http://www.kongregate.com/forums/*
// @include        http://www.wolfthatissavage.com/updateS.php
// @version        1
// ==/UserScript==

var showLoadTime = false;

var ver = "1";
if(unsafeWindow.checkUpdate){unsafeWindow.checkUpdate("www.wolfthatissavage.com/creations/alternate_post_apperance.user.js", "Alternate Post Appearance Script", ver, "SavageWolf");}

/*

Alternate Post Apperance (APA)
------------------------------

Created by SavageWolf (http://www.wolfthatissavage.com)
Images by Sasms (http://www.kongregate.com/accounts/Sasms)

*/

var timer = new Date();
//Load Styles
//document.getElementsByTagName("head")[0].innerHTML += '<link rel="stylesheet" type="text/css" href="http://www.wolfthatissavage.com/Kong/ATAStyles.css" />'
document.getElementsByTagName("head")[0].innerHTML += "<style type='text/css'>\
.postBox blockquote {\
    background:#FFEECC none repeat scroll 0 0;\
    border-color:#DDCCAA -moz-use-text-color #CCDDAA #AA9977;\
    border-style:solid none solid solid;\
    border-width:1px 0 1px 3px;\
    margin-left:0;\
    padding:1px 10px;\
}\
\
.postBox pre {\
    background:#EFEFEF none repeat scroll 0 0;\
    border-color:#CCCCCC -moz-use-text-color #CCCCCC #DDDDDD;\
    border-style:solid none solid solid;\
    border-width:1px 0 1px 3px;\
    font-family:'Monaco','Bitstream Vera Sans Mono','Courier New',serif;\
    font-size:0.8em;\
    overflow:auto;\
    padding:5px 10px;\
}\
\
\
.headerBox {\
    background:#EFEFEF none repeat scroll 0 0;\
}\
\
\
.postBox {\
    background-color:#FAFAFA;\
    border-width:0px !important;\
    overflow:scroll;\
    font-size: 85%;\
}\
\
table.posts {\
    border-bottom:2px solid #EFEFEF;\
    width:919px;\
    display: none;\
}\
\
table.newPosts {\
    border-bottom:2px solid #EFEFEF;\
    width:919px;\
}\
</style>"

var timerb = new Date();
var timeForCss = timer.getTime() - timerb.getTime();

// function changeFont(){
// //     
// // }
// // 
// // // Add menu items
// // GM_registerMenuCommand("Change Font Size", changeFont);


function echo(text){
    document.getElementById("posts").innerHTML += text;
};

forumPosts = document.getElementById("forum_posts").getElementsByTagName("table")[0].rows;

var AcScript = new Boolean();
if(forumPosts[0].cells[0].innerHTML.indexOf("Mute user") == -1 && forumPosts[2].cells[0].innerHTML.indexOf("Mute user") == -1){
    AcScript = false;
}else{
    AcScript = true;
};

//Is it locked?
var topicLocked = new Boolean();
if(document.getElementById("main").innerHTML.indexOf("<label>This topic is locked.</label>") == -1){
    topicLocked = false;
}else{
    topicLocked = true;
};

//Load level numbers
/*var levels = new Array();
levels[0] = 0;
var i = 1
while(i < 100){
    levels[i] = levels[i-1] + (i*5);
    i ++;
};*/
function askLevel(num){
    var z = 1;
    return 0;
    /*while(true){
	  if(num < levels[z]){
		return z;
		break;
	  }else{
		z++;
	  };
    }; */return 42;
};


//Get information
//Order: Body, Ago, Name, Post Count, Link to Posts, Quote onclick or false, Flag Post onclick or false, Avatar URL, "mute" or "delete", Edit URL or false, ID, Level, load
var posts = new Array();
var i = 0;
var no = 0;
function loadMain(){
    posts[no] = new Array();
    posts[no][0] = forumPosts[i].cells[1].innerHTML;
    if(forumPosts[i].cells[1].innerHTML.indexOf('ignore_opt') == -1 && forumPosts[i].cells[1].getElementsByTagName("div")[0].innerHTML.indexOf("This post has been removed by an administrator or moderator") == -1){
	  posts[no][1] = forumPosts[i].cells[0].getElementsByTagName("a")[0].getElementsByTagName("abbr")[0].innerHTML;
	  posts[no][1] = posts[no][1].replace(/.$/gi, "");
	  posts[no][2] = forumPosts[i].cells[0].getElementsByTagName("a")[1].href.split("/accounts/")[1];
	  posts[no][3] = forumPosts[i].cells[0].getElementsByTagName("a")[2].innerHTML.split(" ")[0];
	  posts[no][4] = forumPosts[i].cells[0].getElementsByTagName("a")[2].href;
	  if(forumPosts[i].cells[0].innerHTML.indexOf("Edit post") == -1){
		posts[no][9] = false;
	  }else{
		posts[no][9] = forumPosts[i].cells[0].getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML.split("onclick=\"")[1].split("\">")[0];
	  };
	  if(forumPosts[i].cells[0].getElementsByTagName("div")[1].innerHTML != "Post flagged"){
		posts[no][6] = forumPosts[i].cells[0].getElementsByTagName("div")[1].innerHTML.split("onclick='")[1].split("'>")[0];
	  }else{
		posts[no][6] = false;
	  };
	  if(!topicLocked){
		posts[no][5] = forumPosts[i].cells[0].getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML.split("onclick=\"")[1].split("\">")[0];
	  };
	  posts[no][7] = forumPosts[i].cells[0].getElementsByTagName("img")[0].src;
	  posts[no][8] = false;
	  posts[no][10] = forumPosts[i].cells[1].id;
	  forumPosts[i].cells[1].id = " a potato";
	  posts[no][11] = askLevel(parseInt(posts[no][3]));
    }else if(forumPosts[i].cells[1].innerHTML.indexOf('ignore_opt') != -1){
	  posts[no][2] = forumPosts[i].cells[0].getElementsByTagName("span")[0].innerHTML;
	  posts[no][8] = "mute";
	  posts[no][0] = ""
    }else if(forumPosts[i].cells[1].getElementsByTagName("div")[0].innerHTML.indexOf("This post has been removed by an administrator or moderator") != -1){
	  posts[no][2] = forumPosts[i].cells[0].getElementsByTagName("a")[1].href.split("/accounts/")[1];
	  posts[no][8] = "delete";
	  posts[no][0] = "";
    };
};

while(i <= forumPosts.length){
    loadMain();
    //Check for doublepost;
    if(i != 0){
	  if(posts[no-1][2] == posts[no][2]){
		//Double post ARGH!!!!!
		posts[no][0] = posts[no-1][0] + "<hr><hr>" + posts[no][0];
		posts[no-1][12] = "no";
	  };
    };
    i += 2;
    no ++;
};

var timerc = new Date();
var timeForLoad = timerb.getTime() - timerc.getTime();

document.getElementById("forum_posts").innerHTML += "<table id='posts' class='newPosts'></table>";
if(document.getElementById("forum_posts").innerHTML.indexOf('<ul class="pagination">') != -1){
    document.getElementById("forum_posts").innerHTML += "<ul class='pagination'>"+document.getElementById("forum_posts").getElementsByTagName("ul")[0].innerHTML+"</ul>";
    document.getElementById("forum_posts").getElementsByTagName("ul")[1].innerHTML = "";
};

//Draw em
i=0;
no = 0;
var textToWrite = new String();
while(i < posts.length){
    if(posts[i][12] != "no"){
	  textToWrite = "<table width=922px>"
	  textToWrite += "<tr height=30px>";
	  if(posts[i][8] == "mute"){
		//***************
		//Muted Users
		//***************
		//---------------
		//AvatarSpace
		//---------------
		textToWrite += "<td width=30px class='headerBox' align=left style='border-right-width:0px; padding:5px;'>";
		textToWrite += "<a href='javascript:location.reload(true)' onclick='_removeIgnore(\""+posts[i][2]+"\")'><img src=http://www.wolfthatissavage.com/Kong/Mute.png width=30px height=30px title='Unmute User' border=0 alt='Unmute'></a>";
		
		//---------------
		//Left panel start
		//---------------
		textToWrite += "</td><td class='headerBox' align=left style='border-right-width:0px; border-left-width:0px;'>";
		textToWrite += "<b><a href=http://www.kongregate.com/accounts/"+posts[i][2]+">"+posts[i][2]+"</a></b> (Muted)";//Username
		
		//---------------
		//Right panel Start
		//---------------
		textToWrite += "</td><td class='headerBox' align=right style='border-left-width:0px;'>";
		textToWrite += "</td></table><br>";
		
		//---------------
		//Post start
		//---------------
		textToWrite += "</td></tr><tr><td colspan=3 class='postBox' id='"+posts[i][10]+"' width=922px>";
		//textToWrite += "<sup><i><a href='#"+posts[i][10]+"'>"+posts[i][1]+"</a></i></sup><br>";
		//textToWrite += "<div><p></p></div>";
		textToWrite += "</td></table><br>";
	  }else if(posts[i][8] == "delete"){
		//***************
		//Deleted Posts
		//***************
		//---------------
		//AvatarSpace
		//---------------
		textToWrite += "<td width=30px class='headerBox' align=left style='border-right-width:0px; padding:5px;'>";
		textToWrite += "<img src=http://www.wolfthatissavage.com/Kong/Flag.png width=30px height=30px title='This post has been removed by an administrator or moderator' border=0 alt=''></a>";
		
		//---------------
		//Left panel start
		//---------------
		textToWrite += "</td><td class='headerBox' align=left style='border-right-width:0px; border-left-width:0px;'>";
		textToWrite += "<b><a href=http://www.kongregate.com/accounts/"+posts[i][2]+">"+posts[i][2]+"</a></b> (Deleted)";//Username
		
		//---------------
		//Right panel Start
		//---------------
		textToWrite += "</td><td class='headerBox' align=right style='border-left-width:0px;'>";
		textToWrite += "</td></table><br>";
		
		//---------------
		//Post start
		//---------------
		textToWrite += "</td></tr><tr><td colspan=3 class='postBox' id='"+posts[i][10]+"' width=922px>";
		//textToWrite += "<sup><i><a href='#"+posts[i][10]+"'>"+posts[i][1]+"</a></i></sup><br>";
		//textToWrite += "<div><p></p></div>";
		textToWrite += "</td></table><br>";
	  }else{
		//***************
		//Unmuted Users
		//***************
		//---------------
		//AvatarSpace
		//---------------
		textToWrite += "<td width=30px class='headerBox' align=left style='border-right-width:0px; padding:5px;'>";
		textToWrite += "<img src="+posts[i][7]+" width=30px height=30px>";
		
		//---------------
		//Left panel start
		//---------------
		textToWrite += "</td><td class='headerBox' align=left style='border-right-width:0px; border-left-width:0px;'>";
		textToWrite += "<b><a href=http://www.kongregate.com/accounts/"+posts[i][2]+">"+posts[i][2]+"</a></b> (<a href="+posts[i][4]+">"+posts[i][3]+" posts</a>)";//Username
		//textToWrite += " <a href="+posts[i][4]+">";
		//textToWrite += "<img src='http://cdn3.kongregate.com/images/presentation/levelbug/levelbug"+posts[i][11]+".gif' title='"+posts[i][3]+" Posts, Forum Level "+posts[i][11]+"' alt='Forum Level: "+posts[i][11]+"' border=0></a>";	  
		
		//---------------
		//Right panel Start
		//---------------
		textToWrite += "</td><td class='headerBox' align=right style='border-left-width:0px;'>";
		if(posts[i][9] != false){
		    textToWrite += " <a onclick=\""+posts[i][9]+"\" href='#'><img id='Edit"+no+"' width=30px height=30px border=0 alt='Edit' title='Edit Post'></a>";
		};
		textToWrite += " <a onclick=\"javascript:alert('"+window.location+"#"+posts[i][10]+"')\" href='#"+posts[i][10]+"'><img id='Link"+no+"' width=30px height=30px border=0 alt='Link' title=\"Get post's URL\"></a>";
		if(!topicLocked){
		    textToWrite += " <a onclick=\""+posts[i][5]+"\" href='#'><img id='Quote"+no+"' width=30px height=30px border=0 alt='Quote' title='Quote Post'></a>";
		}else{
		    textToWrite += " <img id='Quotex"+no+"' width=30px height=30px border=0 alt='' title='Topic Locked'></a>";
		};
		if(AcScript){
		    textToWrite += " <a href='javascript:location.reload(true)' onclick='_addIgnore(\""+posts[i][2]+"\")'><img id='Mute"+no+"' width=30px height=30px border=0 alt='Mute' title='Mute User'></a>";
		};
		if(posts[i][6] != false){
		    textToWrite += " <a onclick='"+posts[i][6]+"' href='#'><img id='Flag"+no+"' width=30px height=30px border=0 alt='Flag' title='Flag Post'></a> ";
		}else{
		    textToWrite += " <img id='Flagx"+no+"' width=30px height=30px border=0 alt='' title='Post Flagged'> ";
		};
		    
		//---------------
		//Post start
		//---------------
		textToWrite += "</td></tr><tr><td colspan=3 class='postBox' id='"+posts[i][10]+"' width=922px>";
		textToWrite += "<sup><i><a href='#"+posts[i][10]+"'>"+posts[i][1]+"</a></i></sup><br>";
		textToWrite += posts[i][0];
		textToWrite += "</td></table><br>";
	  };
	  echo(textToWrite);
	  no ++;
    };
    
    i++;
};
var timerd = new Date();
var timeForDraw = timerc.getTime() - timerd.getTime();

//Resize images
i = 0;
var j = new Number();
while(i < document.getElementById("posts").getElementsByTagName("table")[i].length){
    j = 0;
    while(true){
	  if(document.getElementById("posts").getElementsByTagName("table")[i].rows[1] != null){
		if(document.getElementById("posts").getElementsByTagName("table")[i].rows[1].cells[0].getElementsByTagName("div")[0].getElementsByTagName("img")[j] != null){
		    if(document.getElementById("posts").getElementsByTagName("table")[i].rows[1].cells[0].getElementsByTagName("div")[0].getElementsByTagName("img")[j].width >= 900){
			  document.getElementById("posts").getElementsByTagName("table")[i].rows[1].cells[0].getElementsByTagName("div")[0].getElementsByTagName("img")[j].width = 600;
		    };
		    j++;
		}else{
		    break;
		};
	  }else{
		break;
	  };
    };
    i ++;
};

i = 0;
while(i < no){
    if(document.getElementById("Flag"+i) != null){
	  document.getElementById("Flag"+i).src = "http://Kong.wolfthatissavage.com/Flag.png";
    };
    if(document.getElementById("Mute"+i) != null){
	  document.getElementById("Mute"+i).src = "http://Kong.wolfthatissavage.com/Mutey.png";
    };
    if(document.getElementById("Quote"+i) != null){
	  document.getElementById("Quote"+i).src = "http://Kong.wolfthatissavage.com/Quote.png";
    };
    if(document.getElementById("Edit"+i) != null){
	  document.getElementById("Edit"+i).src = "http://Kong.wolfthatissavage.com/Edit.png";
    };
    if(document.getElementById("Link"+i) != null){
	  document.getElementById("Link"+i).src = "http://Kong.wolfthatissavage.com/Link.png";
    };
    
    if(document.getElementById("Flagx"+i) != null){
	  document.getElementById("Flagx"+i).src = "http://Kong.wolfthatissavage.com/Flagx.png";
    };
    if(document.getElementById("Quotex"+i) != null){
	  document.getElementById("Quotex"+i).src = "http://Kong.wolfthatissavage.com/Quotex.png";
    };
    
    i ++;
};

var timere = new Date();
var timeForImg = timerd.getTime() - timere.getTime();

if(showLoadTime){
    alert("Time to load css: "+timeForCss+"\nTime for post loading: "+timeForLoad+"\nTime for drawing: "+timeForDraw+"\nTime for images: "+timeForImg);
};