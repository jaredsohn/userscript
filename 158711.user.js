// Hide Chumpsmouth
// version 0.92
// 2013-03-09
//
//
// Based on Hide Chumpsparty which is in turn based on Butler
// Copyright (c) 2005, Mark Pilgrim
// Modified for Facemouth by Splith
// Additional user functionality and clarity added by Splith
// [All changes have been marked for the interests in bug checking]
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Removes any chumps you want to disappear from Facemouth
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            RemoveChumpsmouth
// @namespace       http://nucleoso.me.uk/
// @description     Removes people from Facemouth
// @include         http://facemouth.co.uk/*
// @include         http://www.facemouth.co.uk/*
// @include         http://alternative.failparty.co.uk/*
// @include         https://alternative.failparty.co.uk:*
// @include         https://alternative.failparty.co.uk/*
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

var UsernamesToBlock = GM_getValue('FM-BlockedUserNames');
var Folded = GM_getValue('FM-FoldedStatus'); //Splith addition

if (UsernamesToBlock == undefined) {
    UsernamesToBlock = "";
    GM_setValue('FM-BlockedUserNames', UsernamesToBlock);
}

//Splith addition
if (Folded == undefined) {
    Folded = false;
    GM_setValue('FM-FoldedStatus', Folded);
}

var CleanBlocklist = function(bl) {
    while (bl.indexOf("%%", 0) > -1) {
        bl = bl.replace("%%", "%");
    }    
    return bl;
}
    
var AddUserToList = function(user) {
    user = user;
    var currentblocklist = GM_getValue('FM-BlockedUserNames');
    currentblocklist += "%" + user;
    GM_setValue('FM-BlockedUserNames', currentblocklist);
}

var RemoveUserFromList = function(user) {
    user = user;
    var currentblocklist = "%" + GM_getValue('FM-BlockedUserNames') + "%";
    currentblocklist = currentblocklist.replace("%" + user + "%","%");
    GM_setValue('FM-BlockedUserNames', CleanBlocklist(currentblocklist));    
}

//I stole this function from gmail (google)... It has got to be the best minimised function I've ever used!
var el = function(id)
{
	if (document.getElementById)
	{
		return document.getElementById(id);
	}
	else if (window[id])
	{
		return window[id];
	}
	return null;
}

//Splith addition
var ShowHideUserListBox = function()
{
	//Shows or hides the add user box
	if (Folded == false)
	{
		//Hide
		Folded = true;
		el('BCP-UserListTable').style.display="none";
	}
	else
	{
		//Show
		Folded = false;
		el('BCP-UserListTable').style.display="table";
	}
	GM_setValue('FM-FoldedStatus', Folded);
}

var AddRow = function(table, user) {
    user = user;
    var mylistitem = document.createElement('tr');
    var namecell = document.createElement('td');
    var countcell = document.createElement('td');
    var showhidecell = document.createElement('td');
    var removefromlistcell = document.createElement('td');

    mylistitem.appendChild(namecell);
    mylistitem.appendChild(countcell);
    mylistitem.appendChild(showhidecell);
    mylistitem.appendChild(removefromlistcell);

    // comments
commentsXPATH = '//div[@class="one-fourth"]/a/h4//text()[contains(., "' + user + '")]';
threadXPATH = "//div[@class='page-title-holder']/h5/text()[contains(., '" + user + "')]";

    var thisdiv;

    var allCommentElements = document.evaluate(
        commentsXPATH,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var allPostElements = document.evaluate(
        threadXPATH,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    mylistitem.postedthreads= new Array();
    mylistitem.postedcomments = new Array();
    
    for (var i = 0; i < allCommentElements.snapshotLength; i++) {
        thisDiv = allCommentElements.snapshotItem(i);
        //thisDiv.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
        mylistitem.postedcomments[mylistitem.postedcomments.length] = thisDiv.parentNode.parentNode.parentNode.parentNode.previousSibling;
        mylistitem.postedcomments[mylistitem.postedcomments.length] = thisDiv.parentNode.parentNode.parentNode.parentNode.nextSibling;
        mylistitem.postedcomments[mylistitem.postedcomments.length] = thisDiv.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling;
        mylistitem.postedcomments[mylistitem.postedcomments.length] = thisDiv.parentNode.parentNode.parentNode.parentNode;
    }

    for (var i = 0; i < allPostElements.snapshotLength; i++) {
        thisDiv = allPostElements.snapshotItem(i);
        //thisDiv.parentNode.parentNode.style.display = 'none';
        mylistitem.postedthreads[mylistitem.postedthreads.length] = thisDiv.parentNode.parentNode;
    }

    var clicktotoggle = document.createElement('a');
    var clicktotoggleimage = document.createElement('img');
    clicktotoggle.appendChild(clicktotoggleimage);

    mylistitem.HideItems = function() {
        mylistitem.shown = false;
        clicktotoggleimage.setAttribute("src", "http://www.faceparty.com/im/ps_bg.gif");
        for (var i = 0; i < mylistitem.postedcomments.length; i++) {
            mylistitem.postedcomments[i].style.display = 'none';  
        }      
        for (var i = 0; i < mylistitem.postedthreads.length; i++) {
            mylistitem.postedthreads[i].style.display = 'none';  
        }
    }

    mylistitem.ShowItems = function() {
        mylistitem.shown = true;
        clicktotoggleimage.setAttribute("src", "http://www.faceparty.com/im/ps_b.gif");
        for (var i = 0; i < mylistitem.postedcomments.length; i++) {
            mylistitem.postedcomments[i].style.display = '';  
        } 

        for (var i = 0; i < mylistitem.postedthreads.length; i++) {
            mylistitem.postedthreads[i].style.display = '';  
        } 
    }

    mylistitem.ToggleVisible = function() {
        if (mylistitem.shown) {
            mylistitem.HideItems();        
        } else {
            mylistitem.ShowItems();        
        }
    }

    countcell.innerHTML = mylistitem.postedthreads.length + (mylistitem.postedcomments.length/4);

    var clicktoadd = document.createElement('a');
    clicktoadd.setAttribute("a", "#");
    var clicktoaddimage = document.createElement('img');
    clicktoaddimage.setAttribute("src", "http://www.faceparty.com/im/ps_g.gif");
    clicktoaddimage.setAttribute("alt", "Click to remove this user from being blocked.");
    clicktoaddimage.setAttribute("title", "Click to remove this user from being blocked.");
    clicktoadd.appendChild(clicktoaddimage);
    removefromlistcell.appendChild(clicktoadd);

    clicktoadd.addEventListener('click', function() {
        mylistitem.ShowItems();
        RemoveUserFromList(namecell.innerHTML);
        table.removeChild(mylistitem);
    }, false);
    clicktoadd.addEventListener('mouseover', function() {
this.style.cursor="pointer";
    }, false);


    clicktotoggle.setAttribute("a", "#");
    clicktotoggle.setAttribute("alt", "Click to temporally show comments from this user.");
    clicktotoggle.setAttribute("title", "Click to temporally show comments from this user.");
    showhidecell.appendChild(clicktotoggle);

    clicktotoggle.addEventListener('click', function() {
        mylistitem.ToggleVisible();
    }, false);

    clicktotoggle.addEventListener('mouseover', function() {
this.style.cursor="pointer";
    }, false);

    namecell.innerHTML = user;
    mylistitem.HideItems();
    table.appendChild(mylistitem);
}

var DisplayList = function() {
    //Find div#csc
    //after it put in a new div containing a list of the user list.
    var cscnode = document.getElementById('header');

    var mylistnode = document.createElement('div');
    mylistnode.id = 'BCP-UserNameContainer';

    var mytable = document.createElement('table');
    mytable.id = 'BCP-UserListTable';

//Splith addition
if (Folded == true)
{
    mytable.setAttribute("style","border-collapse:collapse; display:none; background-color:#FFFFFF;");
}
else
{
    mytable.setAttribute("style","border-collapse:collapse; background-color:#FFFFFF;");
}

    var UsernameList = UsernamesToBlock.split("%"); 

    //Allow new additions
    var mylistitem = document.createElement('tr');
    mylistitem.setAttribute('id', 'BCP-AddNewChumpRow');
    var namecell = document.createElement('td');
    var countcell = document.createElement('td');
    var showhidecell = document.createElement('td');
    var removefromlistcell = document.createElement('td');

    mylistitem.appendChild(namecell);
    mylistitem.appendChild(countcell);
    mylistitem.appendChild(showhidecell);
    mylistitem.appendChild(removefromlistcell);

    var nameinput = document.createElement('input');
    nameinput.setAttribute('type', 'text');
    nameinput.setAttribute('id', 'BCP-NewChump');
    nameinput.setAttribute('style', "width: 85px");
    namecell.appendChild(nameinput);

    var clicktoadd = document.createElement('a');
    clicktoadd.setAttribute("a", "#");
    var clicktoaddimage = document.createElement('img');
    clicktoaddimage.setAttribute("src", "http://www.faceparty.com/im/ps_f.gif");
    clicktoadd.setAttribute("alt", "Click to add this user to the block list.");
    clicktoadd.setAttribute("title", "Click to add this user to the block list.");
    clicktoadd.appendChild(clicktoaddimage);
    clicktoadd.addEventListener('click', function() {
//Splith modification
if (nameinput.value.replace(/ /gi, '').length > 1)
{
        AddUserToList(nameinput.value);
        AddRow(mytable, nameinput.value);
nameinput.value="";
}
    }, false);
    clicktoadd.addEventListener('mouseover', function() {
this.style.cursor="pointer";
    }, false);

//Splith addition
    var hidebox = document.createElement('a');
    hidebox.setAttribute("a", "#");
    var hideboximage = document.createElement('img');
    hideboximage.setAttribute("src", "http://junk.failparty.co.uk/blockicon.gif");
    hideboximage.setAttribute("width", "18px");
    hideboximage.setAttribute("alt", "Hides the blacklist from being seen.");
    hideboximage.setAttribute("title", "Hides the blacklist from being seen.");
    hidebox.appendChild(hideboximage);
    hidebox.addEventListener('click', function() {
ShowHideUserListBox();
    }, false);
    hidebox.addEventListener('mouseover', function() {
this.style.cursor="pointer";
    }, false);

//Splith modification
    countcell.appendChild(clicktoadd);
    showhidecell.appendChild(hidebox);
    mytable.appendChild(mylistitem);
    
    //Add existing users
    for (var i = 0; i < UsernameList.length; i++) {
        if ((typeof UsernameList[i]) == "string" && (UsernameList[i] != ""))
            AddRow(mytable, UsernameList[i]);
    }

//Splith modification
    mylistnode.appendChild(mytable);
//    mylistnode.setAttribute("style","position: fixed; top: 0pt;border-right: solid 1px rgb(153,153,153);border-bottom: solid 1px rgb(153,153,153); background: rgb(230,230,230); color: rgb(102,102,102); font-size: 8pt; -moz-border-radius-bottomright: 7px; -webkit-border-bottom-right-radius: 7px;");
    mylistnode.setAttribute("style","position: fixed; bottom: 4px; left:0px; z-index:100;");
    cscnode.parentNode.insertBefore(mylistnode, cscnode.nextSibling);

//Splith addition
    var showbox = document.createElement('a');
    showbox.setAttribute("a", "#");
    var showboximage = document.createElement('img');
    showboximage.setAttribute("src", "http://junk.failparty.co.uk/blockicon.gif");
    showbox.setAttribute("alt", "Click to hide/show block list.");
    showbox.setAttribute("title", "Click to hide/show block list.");
    showbox.appendChild(showboximage);
    showbox.addEventListener('click', function() {
ShowHideUserListBox();
    }, false);
showbox.setAttribute("style","position: fixed; bottom: 0px; left:0px; z-index:101;");
    showbox.addEventListener('mouseover', function() {
this.style.cursor="pointer";
    }, false);
    cscnode.parentNode.insertBefore(showbox, cscnode.nextSibling);

}

DisplayList();

// END FILE