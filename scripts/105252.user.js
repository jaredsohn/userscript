// ==UserScript==
// @name           Friend or Foe
// @version        1.0.2
// @author         TheRedTeam
// @namespace      reddit
// @description    Create list of friends and foes and perform actions on them
// @include        *reddit.com/r/*
// @exclude        *iframe*reddit.com/*
// ==/UserScript==

/*
Changelog:
09/23/10:1.0.0: First release, works decent
09/23/10:1.0.1: Fixed race condition if multiple tabs open
09/23/10:1.0.2: Fixed issue where opacity blocked clicks on right bar

*/


// current lists
var friend_list = [];
var foe_list = [];
var fof_user = "";
var fof_usercolors = []; // cache of link colors

// reddit can't handle clicking things too fast or it will miss some
// so we save all objects to click in an array, and use an interval on a timer
// this does the clicking asycronously in the background for us
var clicklist = new Array();
var clickinterval = null;

// prototype the crap out of the array object
Array.prototype.has = function (obj) {
        for (var i = 0, j = this.length; i < j; i++) {
                if (this[i] == obj)
                        return true;
        }
        return false;
};
Array.prototype.remove = function(obj) {
  for(i=0; i<this.length; i++)
        if(this[i] == obj){
                this.splice(i, 1);
                i--;
        }
};


// get jquery from reddit
$ = unsafeWindow.$;

// add menu bar items
var mymenu = document.createElement("div");
mymenu.className = "sidecontentbox";
var side = document.getElementsByClassName("side")[0];
side.style.zIndex = 100;
side.insertBefore(mymenu,side.firstChild);
// we do inline CSS here to override reddit's styles because
// they use the !important attribute on everything >:(
mymenu.innerHTML = "<div class='content' style='-moz-border-radius-bottomright: 10px; -moz-border-radius-bottomleft: 10px; border-top: 0px; background-color: #FFFFBB;'> \
                                        <div style='text-align: center; border-bottom: 1px solid #888;'><span style='font-family: arial; font-size: 14px; font-weight: bold; color: #996633;'>Friend or Foe</span></div> \
                                        <div style='margin-bottom: 5px; font-family: arial; font-size: 10px; color: #444;'><span id='fofcounts'></span> (<a href='javascript:userViewLists();'>details</a>)</div> \
                                        <ul>   \
                                                <li><a href='javascript: autoh();'>auto-hide</a></li> \
                                        </ul> \
                                        <div style='margin-top: 5px; font-family: arial; font-size: 10px; color: #444;' id='fofstatus'></div> \
                                        </div>";


/*
########################  Start Helper Functions ############################
*/

unsafeWindow.userViewLists =
function(){
        alert("Friends: "+friend_list.toString()+"\n\nFoes: "+foe_list.toString());
};


function userSetCounts(){
        var counts = document.getElementById('fofcounts');
        counts.innerHTML = friend_list.length+" friends and "+foe_list.length+" foes";
};

// pull lists
function getlists(){
        var t1 = GM_getValue('fof_foelist','');
        var t2 = GM_getValue('fof_friendlist','');
        // see if there is a difference
        if(t1=='') foe_list = [];
        else foe_list = t1.split(',');
        if(t2=='') friend_list = [];
        else friend_list = t2.split(',');
}

// save changes to lists
function savelists(){
        // get current lists again to see if another tab/window updated anything
        var t1 = GM_getValue('fof_foelist','');
        var t2 = GM_getValue('fof_friendlist','');
        // if difference save changes
        if(t1 != foe_list.toString()){
                GM_setValue('fof_foelist',foe_list.toString());
        }
        if(t2 != friend_list.toString()){
                GM_setValue('fof_friendlist',friend_list.toString());
        }
}



// Add a Foe function
unsafeWindow.userAddFoe =
function(s){
        fof_user = s;
        // run in timeout so we can call GM_ funcs
        setTimeout(
                function (){
                        if(foe_list.has(fof_user))
                                return;
                        getlists();
                        foe_list.push(fof_user);
                        savelists();
                        addButtons();
                        userSetCounts();
                        setstatus("Set '"+fof_user+"' as Foe");
                },
        0);
};

// Add a Friend function
unsafeWindow.userAddFriend =
function (s){
        fof_user = s;
        // run in timeout so we can call GM_ funcs
        setTimeout(
                function (){
                        if(friend_list.has(fof_user))
                                return;
                        getlists();
                        friend_list.push(fof_user);
                        savelists();
                        addButtons();
                        userSetCounts();
                        setstatus("Set '"+fof_user+"' as Friend");
                },
        0);
};



// unset user from both friend and foe lists
unsafeWindow.userUnset =
function (s){
        fof_user = s;
        // run in timeout so we can call GM_ funcs
        setTimeout(
                function (){
                        getlists()
                        friend_list.remove(fof_user);
                        foe_list.remove(fof_user);
                        savelists();
                        addButtons();
                        userSetCounts();
                        setstatus("Removed '"+fof_user+"' from lists");
                },
        0);
};

// create click event to use on divs and anchor tags
function clickevent(){
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return evt;
}

// shortcut to set the status
function setstatus(s){
        var stat = document.getElementById('fofstatus');
        stat.innerHTML = stat.innerHTML+s+"<br>";
}

// loop through and click everything in the list
// note we kill the interval that calls this when the list is empty
function clickloop(){
        if(clicklist.length==0){
                clickinterval = null;
                return;
        }
        var elm = clicklist.pop();
        elm.dispatchEvent(clickevent());
}


// get a css property, you'd think this would be easier...
function getStyle(x,styleProp)
{
        if (x.currentStyle)
                var y = x.currentStyle[styleProp];
        else if (window.getComputedStyle)
                var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
        return y;
}



/*
########################  Start Main Functions ############################
*/


function addButtons(){
        // div that holds all the submissions
        var t = document.getElementsByClassName("midcol");
        // loop through submissions
        for(i=0; i < t.length; i++){
                // parent node is the div container for the submission
                submission = t[i].parentNode;
                // try to find the username
                var userbox = submission.getElementsByClassName("tagline")[0];
                var title = submission.getElementsByClassName("title loggedin")[0];
                // if in the recently viewed box (no username shown there) skip it
                try{
                        var user = userbox.getElementsByTagName("a")[0];
                }catch(e){
                        continue; // no username section
                }
                if(user == undefined)
                        continue; // user is [deleted]
                var username = user.innerHTML;
                // save reddit's user colors so we can reset if needed
                if(fof_usercolors[username]==undefined){
                        fof_usercolors[username] = getStyle(user, "color");
                }
                // now chose what colors to use according to the user
                if(foe_list.has(username)){
                        user.style.color = fof_usercolors[username]; //"#336699"
                        $(submission).css('opacity',0.3);
                        $(submission).css('margin-right','300px');
                }
                else if(friend_list.has(username)){
                        user.style.color = "#00AA00";
                        title.style.color = "#00AA00";
                        $(submission).css('opacity',1);
                }
                else{
                        user.style.color = fof_usercolors[username]; //"#336699"
                        title.style.color = "inherit";
                        $(submission).css('opacity',1);
                }
                // see if userops is already set, if not append it
                var userops = userbox.getElementsByClassName("userops")[0];
                if(userops == undefined){
                        userops = document.createElement("span");
                        userops.className = "userops";
                        userbox.appendChild(userops);
                }
                // now fill with appropriate links
                if(foe_list.has(username) | friend_list.has(username))
                        userops.innerHTML = " (<a style='color: #666;' href=\"javascript:userUnset('"+username+"');\">unset</a>)";
                else
                        userops.innerHTML = " (<a style='color: #666;' href=\"javascript:userAddFoe('"+username+"');\">foe</a>|<a style='color: #666;' href=\"javascript:userAddFriend('"+username+"');\">friend</a>)";
        }
}



// This goes through and clicks the "hide" button on the submissions
// we add it to the reddit context so the link we add can call it
unsafeWindow.autoh =
function (){
        // div that holds all the submissions
        var t = document.getElementsByClassName("midcol");
        var c = 0;
        var v = 0;
        // loop through submissions
        for(i=0; i < t.length; i++){
                // parent node is the div container for the submission
                submission = t[i].parentNode;
                var userbox = submission.getElementsByClassName("tagline")[0];
                // if in the recently viewed box (no username shown there) skip it
                try{
                        var username = userbox.getElementsByTagName("a")[0].innerHTML;
                }catch(e){
                        continue; // no username section
                }
                // if not a bad user, skip this iteration
                if(!foe_list.has(username))
                        continue;
                c++;
                // hide it if it's down voted only
                if(t[i].className == "midcol dislikes"){
                        // add object to click to the clicklist
                        clicklist.push(submission.getElementsByClassName('state-button hide-button')[0].getElementsByTagName('a')[0]);
                        v++;
                }
    }
        // start hiding (3 second time due to stupid fade out effect)
        clickinterval = setInterval(clickloop, 3000);
        // set status
        setstatus("Hid "+v+" of "+c+" bad submissions");
};


// function to perform action on submissions
function autov(){
        try{
        // get all submissions
        var t = document.getElementsByClassName("midcol");
        // loop through unvoted submissions
        var c = 0;
        var v = 0;
        for(i=0; i < t.length; i++){
                // parent node is the div container for the submission
                var submission = t[i].parentNode;
                // now get the appropriate objects we check
                var downarrow = submission.getElementsByClassName("arrow down")[0];
                var userbox = submission.getElementsByClassName("tagline")[0];
                // if in the recently viewed box (no username shown there) skip it
                try{
                        var username = userbox.getElementsByTagName("a")[0].innerHTML;
                }catch(e){
                        continue; // no username section
                }
                // if not a bad user, skip this iteration
                if(!foe_list.has(username))
                        continue;
                c++;
                // if not already down voted, down vote it
                if(t[i].className == "midcol unvoted"){
                        // save arrow to an array for down-voting later
                        clicklist.push(downarrow);
                        v++;
                }
    }
        // start down voting form the list we made (1 second timer)
        clickinterval = setInterval(clickloop, 1000);
        // set status
        if(c==0)
                setstatus("No bad submissions found");
        else
                setstatus("Auto down voted "+v+" of "+c+" bad submissions");
        }
        catch(e){
                setstatus("Error: "+e);
        }
}



/*
########################  Begin auto-procedures ############################
*/

// do auto-voting only if we are on a table with submissions listed
if(document.getElementById('siteTable') != null){
        getlists();
        userSetCounts();
        autov();
        addButtons();
}