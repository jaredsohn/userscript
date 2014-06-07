// Flickr Mail Manager by Stephen Fernandez aka Steeev ( http://steeev.freehostia.com )

// ==UserScript==
// @name	flickrMailManager
// @version	1.35 (2007-03-27)
// @description	Adds some options to help manage your Flickr mailbox
// @namespace	http://steeev.f2o.org/flickr
// @author	Steeev : http://steeev.freehostia.com : http://flickr.com/steeev
// @include	http://flickr.com/messages.gne*
// @include	http://www.flickr.com/messages.gne*
// ==/UserScript==


/*

(c) 2008 Excellatronic Communications

 DISCLAIMER
==  ===  ===  ===  =

 BECAUSE THIS PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
 APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE
 PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE
 OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR
 OR CORRECTION.

 IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY  MODIFY AND/OR REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,  INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO  LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO  OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.


 Description
==  ===  ===  ===  ==

 This script adds 5 links at the top of your "Flickr Mail" page.
 1) "Mark as Read" Clicking this will mark all "Unread" messages as "Read"
 2) "Delete New Contact Msgs" Clicking this link will delete all "New Contact" messages
 3) "Delete Group Invites" Clicking this link will delete all group invitations from your mailbox
 4) "Delete All Read Msgs" Clicking this link will delete all the "Read" messages in your mailbox
 5) "Nuke Mailbox" Clicking this will completely delete *ALL* mails in your mailbox!


 Installation Instructions
--------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and
 also the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "flickrMailManager", and click Uninstall.

--------------------------------------------------------------------

 Whats New
==  ===  ===  =

 v1.35 27/03/07 tidied up the feedback reporting screen
 v1.3 17/05/06 fixed pagination bug
 v1.2 16/05/06 flickr gamma compatibility fix
 v1.1 29/04/06 scragz http://flickr.com/photos/scragz updated the script for GM 0.6.4
 v1.0 26/06/05 mainly a bugfix release
 v0.9 24/06/05 updated to remove gm_* api calls
 v0.8 17/06/05 fixed a bug where unecessary requests were being made, also added "mark all as read" function
 v0.7 09/06/05 fixed a small bug, (the script now works properly on both flickr.com and www.flickr.com)
 v0.6 03/06/05 Initial release

 DONATE
==  ==  == =

 If you wish to thank me for all the hard work i have put into writing/testing/supporting this script,  
 and would like to support further updates and bug fixes, you can send me a few pounds/dollars/euros etc
 via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/
 
*/

window.debugmode = 0;
window.msgidlist = '';
window.gmuseragent = 'GreaseMonkey: Flickr Mail Manager 1.35 : (XMLHTTPRequest)';

(function() {

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

// If the debug window exists, then write to it
debug = function(text)
{
    GM_log(text);
}

// returns *first* element with specified class
getElementByClassName = function(clsName)
{
    var elems = document.getElementsByTagName("*");
    for ( var cls, i = 0; ( elem = elems[i] ); i++ ) {
        if ( elem.className == clsName ) {
            arr = elem;
        }
    }
    if (typeof(arr) != 'undefined') {
        return arr;
    } else {
        return 'undefined';
    }
}//end function

getnumberofpages = function()
{
    pagi = getElementByClassName('Paginator');
    if (pagi != 'undefined') {
        aarr = pagi.getElementsByTagName('a');
        pages = aarr.length + 1;
	/*
        maxpage=0;
        for (i=0;i<aarr.length;i++) {
	  tmpagenum=aarr[i].innerHTML.split('href=\"\/messages\.gne\?ok=1\&page=')[1].split('\"')[0];
          if (tmpagenum>maxpage)
             maxpage=tmppagenum;
          }
        alert(maxpage);
        */
    } else {
        pages = 1;
        //alert('iiissss');
    }
    return pages;
}

showstatus = function(html)
{
    if(!document.getElementById('mailtoolboxstatus')) {
      h1 = document.getElementsByTagName('h1')[0];
      unsafeWindow.statusdiv = _ce('div')
      unsafeWindow.statusdiv.id='mailtoolboxstatus';
      h1.parentNode.insertBefore(unsafeWindow.statusdiv, h1.nextSibling);
    }
    unsafeWindow.statusdiv.innerHTML = html;
}

dspcontrolpanel = function()
{
    var table, tr, th, td;
    var link_mailsbyuser = _ce('a');
    var link_markasread = _ce('a');
    var link_delnewcontactmsgs = _ce('a');
    var link_delgroupinvites = _ce('a');
    var link_delread = _ce('a');
    var link_delall = _ce('a');

    /*
    link_mailsbyuser.href = 'javascript:;';
    link_mailsbyuser.title = 'This will find all mails by a specific user.';
    link_mailsbyuser.innerHTML = 'Mails By User';
    link_mailsbyuser.style.textDecoration = 'none';
    link_mailsbyuser.onclickHandler = function() { terminateMsgs('findmailsbyuser'); }
    link_mailsbyuser.addEventListener('click', link_mailsbyuser.onclickHandler, true);
    */

    link_markasread.href = 'javascript:;';
    link_markasread.title = 'This will mark all "Unread Messages" as "Read".';
    link_markasread.innerHTML = 'Mark all as "Read"';
    link_markasread.style.textDecoration = 'none';
    link_markasread.onclickHandler = function() { terminateMsgs('markasread'); }
    link_markasread.addEventListener('click', link_markasread.onclickHandler, true);

    link_delnewcontactmsgs.href = 'javascript:;';
    link_delnewcontactmsgs.title = 'This will delete all "You are x\'s Newest Contact" messages from your mailbox.';
    link_delnewcontactmsgs.innerHTML = 'Delete New Contact Msgs';
    link_delnewcontactmsgs.style.textDecoration = 'none';
    link_delnewcontactmsgs.onclickHandler = function() { terminateMsgs('delnewcontactmsgs'); }
    link_delnewcontactmsgs.addEventListener('click', link_delnewcontactmsgs.onclickHandler, true);

    link_delgroupinvites.href = 'javascript:;';
    link_delgroupinvites.title = 'This will delete all group invitations from your mailbox.';
    link_delgroupinvites.innerHTML = 'Delete Group Invites';
    link_delgroupinvites.style.textDecoration = 'none';
    link_delgroupinvites.onclickHandler = function() { terminateMsgs('delgroupinvites'); }
    link_delgroupinvites.addEventListener('click', link_delgroupinvites.onclickHandler, true);

    link_delread.href = 'javascript:;';
    link_delread.title = 'This will delete all messages you\'ve already read from your mailbox.';
    link_delread.innerHTML = 'Delete All Read Msgs';
    link_delread.style.textDecoration = 'none';
    link_delread.onclickHandler = function() { terminateMsgs('delread'); }
    link_delread.addEventListener('click', link_delread.onclickHandler, true);

    link_delall.href = 'javascript:;';
    link_delall.title = 'This will delete all messages from your mailbox.';
    link_delall.innerHTML = 'Nuke Mailbox';
    link_delall.style.textDecoration = 'none';
    link_delall.onclickHandler = function() { terminateMsgs('delall'); }
    link_delall.addEventListener('click', link_delall.onclickHandler, true);

    var controlpanel = _ce('div');
    //create the mail manager links
    table = _ce('table');
    table.setAttribute('border', 1);
    tr = _ce('tr');
    th = _ce('th');
    
    steeevlink=_ce('a');
    steeevlink.href="http://steeev.freehostia.com/flickr/";
    steeevlink.textContent='Steeev'
    
    th.appendChild(_ct('Mailbox Tools By '));
    th.appendChild(steeevlink);
    tr.appendChild(th);

    td = _ce('td');
    td.appendChild(link_mailsbyuser);
    tr.appendChild(td);

    td = _ce('td');
    td.appendChild(link_markasread);
    tr.appendChild(td);

    td = _ce('td');
    td.appendChild(link_delnewcontactmsgs);
    tr.appendChild(td);

    td = _ce('td');
    td.appendChild(link_delgroupinvites);
    tr.appendChild(td);

    td = _ce('td');
    td.appendChild(link_delread);
    tr.appendChild(td);

    td = _ce('td');
    td.appendChild(link_delall);
    tr.appendChild(td);

    table.appendChild(tr);
    controlpanel.appendChild(table);

    //controlpanel.innerHTML = inserthtml;
    dagoods = document.getElementById("Main");
    dagoods.insertBefore(controlpanel, dagoods.childNodes[0]);
    //dagoods.innerHTML = inserthtml + dagoods.innerHTML;
}

terminateMsgs = function(command)
{
    warning = '\n\nDeletion of mails is final, you cant get them back once they are gone!';
    if (command == 'delall')
        msg = 'You have chosen the Nuke Mailbox option, this will delete *ALL* messages in your mailbox.' + warning;
    if (command == 'delgroupinvites')
        msg = 'You have chosen to delete all "Group Invites" from your mailbox.' +warning;
    if (command == 'delnewcontactmsgs')
        msg = 'You have chosen to Delete all "New Contact" messages from your mailbox.' + warning;
    if (command == 'delread')
        msg = 'You have chosen to Delete all "Read" messages from your mailbox.' + warning;
    if (command == 'markasread')
        msg = 'You have chosen to mark all "Unread" messages as "Read" in your mailbox.';
    if (command == 'findmailsbyuser')
        msg = 'You have chosen to find all messages by a specific user in your mailbox.';
    if (!confirm(msg)) {
        return false
    }
    //else
    //  alert('boom = ' + command);
    //  return;

    //showstatus('<p><b>Working...</b> <img src="http://flickr.com/images/pulser2.gif"></p>');
    pages = getnumberofpages();
    debug('we are now in terminateMsgs + number of pages = ' + pages);

    for (var i = 1; i <= pages; i++) {
        url = "http://" + location.href.split('/')[2] + "/messages.gne?page=" + i;
        debug(url);
        grabpage(url, command);
        delay(500);
    }
}// end function terminateMsgs

delay = function(ms)
{
    date = new Date();
    curDate = null;
    do { var curDate = new Date(); }
    while ( curDate - date < ms);
}

grabpage = function(pageURL, command)
{
    window.command = command;

    if (command == 'markasread')
        verb = 'Marked ';
    else
        verb = 'Deleted ';

    req = new XMLHttpRequest();
    req.open("GET", pageURL, true);
    req.setRequestHeader('User-Agent', gmuseragent);
    req.onload = responsehandler;
    req.send(null);
} // end function grabpage

responsehandler = function(event)
{
    debug ('in responsehandler: status = ' + event.target.status);
    dlist = '';
    dlist = getdlist(event.target.responseText, command);
    if (dlist.length) {
        // if theres actually any ids to process
        //alert('dlist = ' + dlist + 'command = ' + command );
        procmsglist(dlist + '', command);
        window.msgidlist += dlist;
        //alert("new dlist = " + window.dlist);

        statushtml = '<span style="color: red">' + verb + 'Message IDs = ' + window.msgidlist + '</span>' +
                     '<p class="Confirm">' + ((window.msgidlist.split(',').length)-1) +' messages have been ' + verb.toLowerCase() +
                     '. &nbsp;&nbsp;&nbsp;&nbsp;<a href="messages.gne?ok=1">Refresh Page</a> to see changes.</p>';
        showstatus(statushtml);
        //alert('dlistcount = ' + dlistcount);
    }
}// end responsehandler function

getdlist = function(text, command)
{
    bigarr = text.toString().split('messages_read.gne\?id=');
    //debug(text);
    debug('begin getdlist: command = ' + command + ', html length = ' + text.length + ', bigarr length = ' + bigarr.length);
    mess = 0;
    var dlist = "";
    for (i = 0, l = bigarr.length; i < l; i++) {
        if (command == 'delnewcontactmsgs') {
            if (bigarr[i].match(/\"\>You are/) && bigarr[i].match(/newest contact\!\</)) {
                dlist += (grabmsgid(bigarr[i],'\"') +",");
                mess++;
            }
        }
        if (command == 'delgroupinvites') {
            if (bigarr[i].match(/\"\>Invite to join /)) {
                dlist += (grabmsgid(bigarr[i],'\"') +",");
                mess++;
            }
        }
        if (command == 'delall') {
            if (bigarr[i].match(/\"\>\<img src=/)) {
                dlist += (grabmsgid(bigarr[i],'\"\>\<img') +",");
                mess++;
            }
        }
        if (command == 'delread') {
            if (bigarr[i].match(/alt\=\"you\'ve read this message\"/) || bigarr[i].match(/alt\=\"You have replied to this message\"/))
            {
                dlist += (grabmsgid(bigarr[i],'\"\>\<img') +",");
                mess++;
            }
        }
        if (command == 'markasread') {
            if (bigarr[i].match(/alt\=\"Unread Message\"/) ) {
                dlist += (grabmsgid(bigarr[i],'\"\>\<img') +",");
                mess++;
            }
        }
    }//end for

    debug('in getdlist: length = ' + text.length + ', dlist = ' + dlist);
    return dlist;
}//end function getdlist


grabmsgid = function(text, splitter)
{
    // function accepts 2 strings,text which is the text we want to search and splitter
    // which is the regular expression that helps us grab the ids, function returns a message id
    //debug('we are now in grabmsgid');
    regexedarr = text.toString().split(splitter);
    if (regexedarr[0] == null) return "0";
    msgid = regexedarr[0];
    //debug('msgid = ' + msgid);
    return msgid;
}

procmsglist = function(msgidlist, command)
{
    debug('we are now in procmsglist ids = ' + msgidlist + ', command = ' + command);
    var dlist = msgidlist.split(',');
    dlistcount = dlist.length;

    if (command == 'markasread') {
        for (i = 0; i < dlistcount; i++) {
            if (dlist[i]) {
                //alert(dlist[i]);
                //setTimeout("markasread(" + dlist[i] + ")",2000*(i + 1));
                markasread(dlist[i]);
                delay(2000);
            }
        }
    } else {
        // we are going to delete them
        postdata = 'delete=1&';
        for (i = 0; i < dlistcount; i++) {
            postdata += 'delete_' + dlist[i]+ '=1' + '&';
        }
        var xmlHttpReq = false;
        xmlHttpReq = new XMLHttpRequest();
        xmlHttpReq.overrideMimeType('text/xml');
        xmlHttpReq.open('POST', 'http://' + location.href.split('/')[2] +'/messages.gne', true);
        xmlHttpReq.setRequestHeader('User-Agent', gmuseragent);
        xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xmlHttpReq.onreadystatechange = function() { //if (xmlHttpReq.readyState == 4) {eval(strResultFunc + '(xmlHttpReq.responseText;);'); } }
        xmlHttpReq.send(postdata);
    }
}// end procmsglist function

markasread = function(id)
{
    //alert('hello from markasread function');
    var xmlHttpReq = new XMLHttpRequest();
    //alert('http://' + location.href.split('/')[2] +'/messages_read.gne?id = ' + id);
    xmlHttpReq.open('GET', 'http://' + location.href.split('/')[2] +'/messages_read.gne?id=' + id, true);
    xmlHttpReq.setRequestHeader('User-Agent', gmuseragent);
    xmlHttpReq.send('');
}// end function markasread

dspcontrolpanel();
})();