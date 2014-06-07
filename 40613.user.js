// ==UserScript==
// @name           KillUsers Experimental Edition
// @namespace      kuee@kwierso.com
// @description    It's KillUsers Reimagined!
// @include        http://roosterteeth.com/*
// @include        http://roosterteethcomics.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://grifball.com/*
// ==/UserScript==

//used to check for updated versions
var v = "1.2";
var homepageURL = "http://userscripts.org/scripts/show/40613";

//register the two menu commands
GM_registerMenuCommand( "KUEE - Display List of Blocked Users", showKUs);
GM_registerMenuCommand( "KUEE - Clear List of Blocked Users", eraseKUs);
GM_registerMenuCommand( "KUEE - Show Options", showOptions);

(function() {
//get the list of usernames from the preference
    var username = getUserNames();
    
//make sure that there actually is something from the preference
    if(username == undefined) {
        username = " ";
    }

//strip all spaces from the list of usernames, convert list to lowercase
    username = username.toLowerCase().replace(/ /g,"");
    var isthereuser = true;
	if(username == "")
		isthereuser = false;

//declare a bunch of arrays
    var tableTags =[];
    var userTags = [];
    var commentNames =[];
    var postNums =[];

//get all posts on the current page, put them in array
    var commentTags = findAllComments();

//is there a user listed? if not, don't run
    if(isthereuser) {
    
//break list into an array. For great justice.
        if(username.search(",") != -1)
        {
            var usernames = username.split(",");
        }
        else
        {
            var usernames =[];
            usernames[0] = username;
        } 

//for every comment, get the username
        for(i in commentTags) {
            tableTags = commentTags[i].getElementsByTagName("table");
            for(j in tableTags) {
                if(tableTags[j].className == "web2User") {
                    userTags.push(tableTags[j].getElementsByTagName("b")[0]);
                }
                if(tableTags[j].className == "user") {
                    try {
                        userTags.push(tableTags[j].getElementsByTagName("a")[1]);
                    } catch(e) {}
                }
            }
        }

//for every username, convert name to lowercase, push onto list of names
        for(i in userTags) {
            commentNames.push(userTags[i].innerHTML.toLowerCase().replace(/\s+/g, ""));
        }

//for every username, see if it's on the list of blocked usernames
        for(i in usernames) {
            for(j in commentNames) {
                if(usernames[i] == commentNames[j] || usernames[i] == "*") {
                    postNums.push(j);
                }
            }
        }

//send this information to addToggle()
        addToggle(commentTags, postNums, userTags);
    }
    else {
//if KU doesn't have any users to block, still add the button to each post
        addToggle(commentTags, [], []);
    }
})();

function getElementsByClass(element, theClass) {
// EFFECT: Returns all of 'element's children that match theClass. 
    //Create Array of All HTML Tags
	var allHTMLTags=element.getElementsByTagName('*');
    var classTags = new Array();
    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
    {
        //Get all tags with the specified class name.
        if (allHTMLTags[i].className==theClass) 
        {
            classTags.push(allHTMLTags[i]);
        }
    }
    return classTags;
}

function findAllComments() {
// EFFECT: Creates an array of all comments on the page.
    var commentTags=[];

    //Create Array of All HTML Tags
    allHTMLTags=document.getElementsByTagName('*');

    //Loop through all tags using a for loop
    for (i=0; i< allHTMLTags.length; i++) 
    {
        //Get all elements with "comment" classnames
        if (allHTMLTags[i].className=="comment" || allHTMLTags[i].className=="comment altComment") 
        {
            commentTags.push(allHTMLTags[i]);
        }
    }
    return commentTags;
}

function addToggle(commentTags, postNums, userTags) {
// EFFECT: Adds the toggle button to each post. Posts flagged by postNums are hidden by default.
    var commentPosts =[];

    for(i in commentTags) {
        commentPosts.push(getElementsByClass(commentTags[i], "commentPost")[0]);
    }

    for(i in postNums) {
        commentPosts[postNums[i]].style.display = "none";
        userTags[postNums[i]].parentNode.parentNode.parentNode.style.backgroundColor = "red";
    }

    for(k=0; k< commentPosts.length; k++) {
        var header = getElementsByClass(commentTags[k], "header")[0];
        var toggleLink = document.createElement("a");

        if(commentPosts[k].style.display != "none")
            toggleLink.innerHTML = "Hide Post";
        else
            toggleLink.innerHTML = "Show Post";

        toggleLink.className = "small";
        toggleLink.addEventListener("click", togglePost, false);

        header.appendChild(document.createTextNode(" - [ "));
        header.appendChild(toggleLink);
        header.appendChild(document.createTextNode(" ]"));
    }
}

function togglePost() {
// EFFECT: Function that is does the showing/hiding when the button is clicked.
            if(this.innerHTML == "Hide Post")
            {
                this.innerHTML = "Show Post";
                getElementsByClass(this.parentNode.parentNode.parentNode, "commentPost")[0].style.display = 'none';
                //add this user to list of blocked usernames
                try {
                    setUserNames(true, getElementsByClass(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, "hi")[0].firstChild.innerHTML);
                } catch(e) {
                    console.log("You're using the old user block style, aren't you?");
                    setUserNames(true, getElementsByClass(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, "user")[2].innerHTML.replace(/\s+/g, ""));
                }
            }
            else
            {
                this.innerHTML = "Hide Post";
                getElementsByClass(this.parentNode.parentNode.parentNode, "commentPost")[0].style.display = '';
                //remove this user from list of blocked usernames
                try {
                    setUserNames(false, getElementsByClass(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, "hi")[0].firstChild.innerHTML);
                } catch(e) {
                    console.log("You're using the old user block style, aren't you?");
                    setUserNames(false, getElementsByClass(this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, "user")[2].innerHTML.replace(/\s+/g, ""));
                }
            }
}

function getUserNames() {
//grab the usernames preference, pass it on to whatever wants it
    return GM_getValue("roosterteeth.KUEE.usernames");
}

function setUserNames(bool, name) {
//grab list of usernames
    var userlist = getUserNames();
    var userArray = [];
//create array of those usernames
    if(userlist != undefined) {
        if(userlist.search(",") != -1)
            userArray = userlist.split(",");
        else {
            userArray[0] = userlist;
        }
    }

    if(bool) {
    //if we're adding a name to the list, add the name to the array
        userArray.push(name);
    }
    else {
    //if we're removing a name from the list, remove all elements with that name from the array
        while(userArray.indexOf(name) != -1)
        userArray.splice(userArray.indexOf(name), 1);
    }
    
    //turn the array back into a string, separated by commas
    userlist = "";
    for(i in userArray) {
        userlist += userArray[i];
        if(i != userArray.length -1)
        userlist += ",";
    }
    
    //remove commas from the beginning and end of the string
    if(userlist.charAt(0) == ",")
        userlist = userlist.substr(1);
    if(userlist.charAt(userlist.length -1) == ",")
        userlist = userlist.substring(0, userlist.length -1);

//copy string back to the preference
    GM_setValue("roosterteeth.KUEE.usernames", userlist);
//reload window so all posts from users added or removed get affected
    alert("Reloading page to apply new KU user list.");
    window.location.reload();
}

function showKUs() {
//grab list of usernames
    var usernames = getUserNames();
    var userArray = [];
//convert list into an array
    if(usernames != undefined) {
        if(usernames.search(",") != -1) {
            userArray = usernames.split(",");
        }
        else {
            userArray.push(usernames);
        }
    }

//print out array in a numbered list form, checking to see if there actually are any names in the list
    usernames = "";
    for(i in userArray) {
        if(userArray[i] != undefined && userArray[i] != "") {
            usernames += i + ". " + userArray[i] + "\n";
        }
        else {
            usernames += "No users are currently blocked.";
        }
    }
    if(userArray.length == 0)
        usernames += "No users are currently blocked.";
    alert("Blocked Users:\n\n" + usernames);
}

function eraseKUs() {
//overwrite the usernames preference with an empty string
    GM_setValue("roosterteeth.KUEE.usernames", "");
    alert("All previously blocked users have been removed from KU.");
}

function checkNew(version)
{
GM_xmlhttpRequest({
		method:"GET",
		url:homepageURL,
		headers:{"User-Agent":"monkeyagent"},
		onload:function(content){
		var upgrade = 0;

		var USversion = content.responseText.match(/ver:([^<]+)<\/p>/);
        
		vmain = version.split("."); //vmain[0].vsub[0]rvsub[1]
		
		USvmain = USversion[1].split("."); //USvmain[0].USvsub[0]rUSvsub[1]
		
		verstring = "Latest Version on Userscripts: <b>" + USvmain[0] + "." + USvmain[1] + 
                    "</b><br>Your Installed Version: <b>" + vmain[0] + "." + vmain[1] + "</b>";
        
		if (USvmain[0] > vmain[0]) upgrade = 1;
		if ( (USvmain[1] > vmain[1]) && (USvmain[0] >= vmain[0]) ) upgrade = 1;
        
		document.getElementById('versioncheck').innerHTML = "<br>" + verstring + "<br><b>" + 
                (upgrade ? "<a href=\"" + homepageURL + "\" target=\"_blank\">UPGRADE AVAILABLE</a>" : "You have the latest release");
		}
	})
}

function setOptions()
{
	document.getElementById("usernames").value = getUserNames();
}

//everything below this line is modified directly from the "Youtube Title Adder" script. Many thanks to them.
function saveOptions()
{
	GM_setValue('roosterteeth.KUEE.usernames', document.getElementById("usernames").value.replace(/ /g, ""));
}

function hideOptions()
{
	document.getElementById("KUEEOptionsDiv").className="hidden";
	document.getElementById("KUEEDiv").className="hidden";
}

function showOptions()
{
	var div1=document.getElementById("KUEEDiv");
	if (div1==null)
	{
		GM_addStyle("#KUEEDiv{position:fixed; top:0px; left:0px; z-index:10; width:100%; height:100%; background-color:black; opacity:0.75;}");
		GM_addStyle(".hidden{display:none; visibility:hidden;}");
		
		div1=document.createElement("DIV");
		div1.id="KUEEDiv";
		div1.className="hidden";
		div1.title="Click to cancel and close";
		document.body.appendChild(div1);
		
		div1.addEventListener("click",hideOptions,false);
	}
	var div2=document.getElementById("KUEEOptionsDiv");
	if (div2==null)
	{
		GM_addStyle("#KUEEOptionsDiv{position:fixed; top:10%; left:20%; z-index:20; width:40%; height:30%; background-color:white; border:solid 3px #0033CC; overflow:auto;}");
		
		div2=document.createElement("DIV");
		div2.id="KUEEOptionsDiv";
		div2.className="hidden";
		div2.setAttribute("style","text-align:justify;padding:10px");
		
		var text1="";
		text1+="<center><font size=\"+1\">KillUsers Experimental Edition Options</font><span id=\"versioncheck\" style=\"font-size:10px;\"><br><br>ver. " + v + " (Checking for updates...)</span></center>";
		text1+="<form id=\"KUEE\" name=\"titleform\"><ul>";
        text1+="<li>Blocked Usernames: (Make sure you separate them with commas!)<br /><input type=\"text\" id=\"usernames\" /></li>";
		text1+="</ul><center><input type=\"button\" value=\"Ok\" id=\"KUEEokButton\" /><input type=\"button\" value=\"Cancel\" id=\"KUEEcancelButton\" /></center></form>";
		div2.innerHTML=text1;
		
		document.body.appendChild(div2);
		
		document.getElementById("KUEEokButton").addEventListener("click",function(){saveOptions();hideOptions();location.reload(true);},false);
		document.getElementById("KUEEcancelButton").addEventListener("click",function(){hideOptions();},false);
	}
	document.getElementById("KUEEOptionsDiv").className="";
	document.getElementById("KUEEDiv").className="";
	setOptions();
	checkNew(v);
	div1.className="";
	div2.className="";
}