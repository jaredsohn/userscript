// ==UserScript==
// @name            Flickr Mail To
// @description     Adds a "mailto" button above Flickr photos, and also puts a "send page" link on every page, letting you send that page's link by Flickr Mail or Regular Email
// @author          Stephen Fernandez aka steeev http://steeev.f2o.org
// @version         1.4 (14/Jul/06)
// @namespace       http://steeev.f2o.org/flickr/
// @include         http://www.flickr.com/*
// @include         http://flickr.com/*
// @exclude         http://www.flickr.com/organize*
// @exclude         http://flickr.com/organize*

// ==/UserScript==


// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and 
// the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Mail To", and click Uninstall.
//
// --------------------------------------------------------------------


// Credits: Mark Pilgrim for his excellent greasemonkey tutorial at http://diveintogreasemonkey.org 
//          Button images converted to data URIs via Hixies URI Kitchen: http://software.hixie.ch/utilities/cgi/data/data
//          I also borrowed some code for getting the button into the buttonbar from .CK's brilliant GMiF script http://flickr.com/photos/ckyuan/

// Usage: click the envelope icon above the photo, or the "send page" link on any flickr page, to open the email client
//        The script can send email via FlickrMail or your regular email client, by default the script uses flickrmail
//        if you would like it to use your own email client, goto the Firefox "Tools" menu, then select "User Script Commands"
//        then select "Change MailTo's Default Mail Type" this will let you switch the default mail type.


window.addEventListener("load", function() { mailto_init_script() }, false);


function mailto_init_script() {

var changedefaultmailtype=function () {
 if (confirm('Do you want to switch between using Regular Email + Flickr Mail as the default Mail type?') ) {
   if (GM_getValue('defaultmailtype')=='flickr') {
     GM_setValue('defaultmailtype','email');
   }
   else 
     GM_setValue('defaultmailtype','flickr');

 defaultmailtype= GM_getValue('defaultmailtype');
 alert('The default mail type has been changed to ' + defaultmailtype);

 sendtolink.href = createmailURL(defaultmailtype,'general');
 sendbymail.href = createmailURL(defaultmailtype,'photopage'); 
 sbmimg.setAttribute('title','Send link to this page via ' + defaultmailtype);
 }
}

if (GM_getValue('defaultmailtype','')=='')
  GM_setValue('defaultmailtype','flickr');

defaultmailtype = GM_getValue('defaultmailtype');
 
GM_registerMenuCommand("Change MailTo's Default Mail Type", changedefaultmailtype);




  var sendtolink = document.createElement("a");
  sendtolink.href = createmailURL(defaultmailtype,'general');
  sendtolink.innerHTML='Send Page';

tds=document.getElementsByTagName('td');
     tds[0].appendChild(sendtolink);

theform=document.getElementsByTagName("form");

  if (location.href.match(/messages_write\.gne/)) {
    if(location.href.match(/\#subject\=/) && location.href.match(/body\=/)) {
      theform[1].elements.namedItem("subject").value=unescape(location.href.split('subject=')[1].split('\&body=')[0]);
      theform[1].elements.namedItem("message").value=unescape(location.href.split('body=')[1]);
    }
  }

  else if (((location.href.match(/http:\/\/www.flickr.com\/photos\//)) || (location.href.match(/http:\/\/flickr.com\/photos\//))) && location.href.split('/')[5]){

    var imgoffsrc="data:image/gif;base64,R0lGODlhMQAYAKIAAP%2F%2F%2F4ODg%2B%2Fv78TExNnZ2Z%2Bfn9TU1AAAACH5BAAAAAAALAAAAAAxABgAQAOaCLrc%2FjDGIoa4mAxSYAjKB44AWUoKAajsGoHhKcMwat%2B4RFXXVhGcnHBILBqPk0FhuRw4B69PSVobSXUCAi9rAXYcohB1Ya1BChsg0LBWPqgmWgxJr9vv%2BLx%2BTy8YMBlcXw1mVXJyEz1ZFxpZg28yM3FYXBZOWgaPfAAUXUBZBgOhkHNXYWY6T6pPHidliKh5VTNTr5u3uLlECQA7";
    var imgoversrc="data:image/gif;base64,R0lGODlhMQAYAKIAAP%2F%2F%2F5mZmQAAAMPR1EFAQL%2B%2FvwAAAAAAACH5BAAAAAAALAAAAAAxABgAQAO0CLrc%2FjCu0AigbYRhnxDKB44AWTJYBgxry0JgeM5x3KRSrus40GGby4CzK06MyGQvyYQsCQGCVBqoLhei0md2yqIqLYxmRXR4s7bR9suADt%2BFYSHqUdNkXHZz%2F7jy935%2FTIGCSISFRT0EBQ4sGh0NNlxrJpKKChQvY2UwkyGVegodGhRVLAWQiJhgmUMrc3MeWJ%2BfJjcOUFa6VZ0kIjV4t4Vpd2heq6p8h8kSu87P0NHSugUJADs%3D";
    var imgdownsrc="data:image/gif;base64,R0lGODlhMQAYAKIAAP%2F%2F%2F5mZmQAAAMPR1EFAQL%2B%2FvwAAAAAAACH5BAAAAAAALAAAAAAxABgAQAOwWLHc%2FjDKBiogIFg7wsCbJQjVSJ4AmoZaOABvDIcbWa64bdMt7f%2FAIG8Dankyg49w%2Besxn1CLM0oVTgkBglZL%2BZlSI9zqyyLOWh2Ykkb%2B7k7hsgWbrBeSClAozL%2FlmlWBVoKEPlOFhIeIgYqLVE4EBTQxWT47YnEqlxlmnC8wGmtemCWachUgHRoLLwV6jlJmoUkwCgqWIqWlKkNEE6MoJjp%2BvYVvf25ksbCJzM3OgQkAOw%3D%3D";
 
    var sendbymail = unsafeWindow.document.createElement("a");
    var sbmimg = unsafeWindow.document.createElement("img");
    sbmimg.src=imgoffsrc;
    sbmimg.onmouseover = function() { sbmimg.src = imgoversrc; }
    sbmimg.onmouseout = function() { sbmimg.src = imgoffsrc; }
    sbmimg.onmousedown = function() { sbmimg.src = imgdownsrc; }
    sbmimg.setAttribute('title','Send link to this page via ' + defaultmailtype);
    sendbymail.appendChild(sbmimg);
    sendbymail.href = createmailURL(defaultmailtype,'photopage'); 

    insertpoint=document.getElementById('button_bar');
    insertpoint.appendChild(sendbymail);
  }
  else 
    ; // do nothing
  
}

createmailURL=function(mailtype,pagetype) {

  baseURL='http://www.flickr.com/messages_write.gne#';

  if (pagetype=='photopage') {
    defaultsubject="Hey Check out this cool pic";
    defaultmessage="Hey Check out this cool pic";
    photoid=location.href.split('/')[5];
    username=location.href.split('/')[4];
    defaultmessage += ' by ' + username ;
    defaultsubject += ' by ' + username ;
    title=eval("unsafeWindow.global_photos['" + photoid + "'].title");
    body=escape(defaultmessage + "\n\n" + title + "\n" + location.href);
  }
  if (pagetype=='general') {
    defaultsubject="Check this out";
    defaultmessage="Check this out";
    body=escape(defaultmessage + "\n\n" + location.href);
  }

  if (mailtype=='flickr')
    return baseURL +'subject=' + defaultsubject + "&body=" + body;
  if (mailtype=='email')
    return 'mailto:?subject='+ defaultsubject + "&body=" + body;
}
