// Hide Chumpsparty
// version 0.5
// 2009-08-18
//
//
// Based on Butler
// Copyright (c) 2005, Mark Pilgrim
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
// 
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Removes any chumps you want to disappear from Faceparty
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            RemoveChumpsparty
// @namespace       http://nucleoso.me.uk/
// @description     Removes people from Faceparty
// @include         http://www.faceparty.com/gossip/*
// ==/UserScript==


var UsernamesToBlock = GM_getValue('FP-BlockedUserNames');

if (UsernamesToBlock == undefined) {
    UsernamesToBlock = "";
    GM_setValue('FP-BlockedUserNames', UsernamesToBlock);
}

var CleanBlocklist = function(bl) {
    while (bl.indexOf("%%", 0) > -1) {
        bl = bl.replace("%%", "%");
    }    
    return bl;
}
    
var AddUserToList = function(user) {
    user = user.toLowerCase();
    var currentblocklist = GM_getValue('FP-BlockedUserNames');
    currentblocklist += "%" + user;
    GM_setValue('FP-BlockedUserNames', currentblocklist);
}

var RemoveUserFromList = function(user) {
    user = user.toLowerCase();
    var currentblocklist = "%" + GM_getValue('FP-BlockedUserNames') + "%";
    currentblocklist = currentblocklist.replace("%" + user + "%","%");
    GM_setValue('FP-BlockedUserNames', CleanBlocklist(currentblocklist));    
}


var AddRow = function(table, user) {
    user = user.toLowerCase();
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
    commentsXPATH = '//table/tbody/tr/td/div/a[@href="/' + user + '"]';
    threadXPATH   = '//table/tbody/tr/td/a[@href="/' + user + '"]'

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
        mylistitem.postedcomments[mylistitem.postedcomments.length] = thisDiv.parentNode.parentNode.parentNode.parentNode.parentNode;
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


    countcell.innerHTML = mylistitem.postedthreads.length + mylistitem.postedcomments.length;

    var clicktoadd = document.createElement('a');
    clicktoadd.setAttribute("a", "#");
    var clicktoaddimage = document.createElement('img');
    clicktoaddimage.setAttribute("src", "http://www.faceparty.com/im/ps_g.gif");
    clicktoadd.appendChild(clicktoaddimage);
    removefromlistcell.appendChild(clicktoadd);

    clicktoadd.addEventListener('click', function() {
        mylistitem.ShowItems();
        RemoveUserFromList(namecell.innerHTML);
        table.removeChild(mylistitem);
    }, false);


    clicktotoggle.setAttribute("a", "#");
    showhidecell.appendChild(clicktotoggle);

    clicktotoggle.addEventListener('click', function() {
        mylistitem.ToggleVisible();
    }, false);



    namecell.innerHTML = user;
    mylistitem.HideItems();
    table.appendChild(mylistitem);
}

var DisplayList = function() {
    //Find div#csc
    //after it put in a new div containing a list of the user list.
    var cscnode = document.getElementById('csc');

    var mylistnode = document.createElement('div');
    mylistnode.id = 'BCP-UserNameContainer';

    var mytable = document.createElement('table');
    mytable.id = 'BCP-UserListTable';

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
    clicktoadd.appendChild(clicktoaddimage);
    clicktoadd.addEventListener('click', function() {
        AddUserToList(nameinput.value);
        AddRow(mytable, nameinput.value);
    }, false);


    removefromlistcell.appendChild(clicktoadd);
    mytable.appendChild(mylistitem);
    
    //Add existing users
    for (var i = 0; i < UsernameList.length; i++) {
        if ((typeof UsernameList[i]) == "string" && (UsernameList[i] != ""))
            AddRow(mytable, UsernameList[i]);
    }

    mylistnode.appendChild(mytable);
    mylistnode.setAttribute("style","position: fixed; top: 0pt;border-right: solid 1px rgb(153,153,153);border-bottom: solid 1px rgb(153,153,153); background: rgb(230,230,230); color: rgb(102,102,102); font-size: 8pt; -moz-border-radius-bottomright: 7px; -webkit-border-bottom-right-radius: 7px;");
    cscnode.parentNode.insertBefore(mylistnode, cscnode.nextSibling);
}

DisplayList();

// END FILE