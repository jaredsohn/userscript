// Meta Utility Lil Helper
// version 0.1 BETA!
// 2008-2-08
// Copyright (c) 2008 Blended Technologies LLC
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Meta Utility Lil Helper
// @namespace     http://utilitymill.com
// @description   Make all text areas on a page enter four spaces on a tab key hit
// @include       http://utilitymill.com/utility/MetaUtility
// @include       http://utilitymill.com/utility/MetaUtility_Improved
// ==/UserScript==

GM_log('starting script');

//Define a class to handle all of the history tracking
function History(size) {
    if (!(GM_setValue && GM_getValue)) {
        alert('Please upgrade to the latest version of Greasemonkey.');
        return;
    }
    this.index=0;
    this.size=size;
    //oldest items are at the front of the array
    //newest added to end
    this.code_history=new Array();
}
History.prototype.load=function() {
    this.code_history=new Array(); //reset
    for (var i=0; i<this.size; i++) {
        text=GM_getValue(String(i),false);
        if (text) {
            this.code_history.push(text);
        }
        else {break;}    
    }
    this.index=this.code_history.length-1;
}
History.prototype.save=function() {
    //TODO: clear out any old saved history?
    for (var i=0; i<this.code_history.length; i++) {
        GM_setValue(String(i),this.code_history[i]);
    }
}
History.prototype.get_next_older=function() {
    this.index=Math.max(this.index-1,0);
    return this.code_history[this.index];
}
History.prototype.get_next_newer=function() {
    this.index=Math.min(this.index+1,this.code_history.length);
    return this.code_history[this.index];
}
History.prototype.add=function(text) {
    while (this.code_history.length>=this.size) {
        //shift off oldest items until we reach our target size
        //of size-1, since we need to add one now.
        this.code_history.shift();
    }
    this.code_history.push(text);
    this.index=this.code_history.length-1;
}

//Use window for global vars since GM wraps the whole script in a function
//run once.  new makes that prototype junk work
window.oHistory=new History(10);
window.oHistory.load();

document.addEventListener('click',function(event) {
    //Capture Go button click and save text area code to GM persistent storage
    //GM_log('entering click event');
    //GM_log('target:'+event.target.name);
    if (event.target.name && event.target.name=='btnRun') {
        //GM_log('entering save code cond');
        var code=document.forms[1].elements.namedItem("SOURCE").value;
        //GM_log('code to save:'+ code);
        window.oHistory.add(code);
        window.oHistory.save();
        // if you want to prevent the default click action
        // (such as following a link), use these two commands:
        //event.stopPropagation();
        //event.preventDefault();
    }
}, true);

document.addEventListener('keydown', function(event) {
    //Capture keydown event and insert a tab in proper text area if tab key was hit
    //Also detect ctrl + up or down arrow to scroll through last 10 programs entered
    //References:
    //http://diveintogreasemonkey.org/patterns/intercept-clicks.html
    //http://www.answermysearches.com/here-is-how-to-make-the-tab-work-in-a-textarea-javascript/265/
    //
    // event.target is the element that was clicked
    // do whatever you want here
    //GM_log('event triggered');
    //GM_log(event.target.name);
    //GM_log(event.keyCode);
    //GM_log('ctrl:'+event.ctrlKey);
    if (event.target.name && event.target.name=='SOURCE') {
        //A function to capture a tab keypress in a textarea and insert 4 spaces and NOT change focus.
        //9 is the tab key, except maybe it's 25 in Safari? oh well for them ...
        //GM_log('entered tab code');
        if(event.keyCode==9){
            var oldscroll = event.target.scrollTop; //So the scroll won't move after a tabbing
            event.returnValue=false;  //This doesn't seem to help anything, maybe it helps for IE
            //Check if we're in a firefox deal
            if (event.target.setSelectionRange) {
                var pos_to_leave_caret=event.target.selectionStart+4;
                //Put in the tab
                event.target.value = event.target.value.substring(0,event.target.selectionStart) + '    ' + event.target.value.substring(event.target.selectionEnd,event.target.value.length);
                //There's no easy way to have the focus stay in the textarea, below seems to work though
                setTimeout("var t=document.forms[1].SOURCE; t.focus(); t.setSelectionRange(" + pos_to_leave_caret + ", " + pos_to_leave_caret + ");", 0);
            }
            //Handle IE
            else {
                // IE code, pretty simple really
                document.selection.createRange().text='    ';
            }
            event.target.scrollTop = oldscroll; //put back the scroll
        }
        if ((event.ctrlKey) && ((event.keyCode==38) || (event.keyCode==40))) {
            //Handle scrolling through code history
            //GM_log('Ctrl + ' + event.keyCode + ' pressed');
            if (event.keyCode==38) {
                //up arrow
                //GM_log('up arrow cond hit');
                var code=window.oHistory.get_next_older();
            }
            else if (event.keyCode==40) {
                //down arrow
                //GM_log('down arrow cond hit');            
                var code=window.oHistory.get_next_newer();
            }
            //GM_log('got code:' + code);
            if (code) {
                event.target.value=code;
            }
            // if you want to prevent the default click action
            // (such as following a link), use these two commands:
            event.stopPropagation();
            event.preventDefault();
        }
    }
}, true);
