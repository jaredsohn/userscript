// ==UserScript==
// @name          Flickr Contacts Organiser
// @description	  Lets you add tags to any flickr user, list contacts by tag, view tagged users photos/favourites etc
// @version       0.644 08-Mar-2009
// @namespace     http://steeev.freehostia.com/flickr/
// @author        Stephen Fernandez aka Steeev http://steeev.freehostia.com/
// @include       http://www.flickr.com/*
// @include       http://flickr.com/*
// @exclude       http://www.flickr.com/photo_zoom.gne*
// @exclude       http://flickr.com/photo_zoom.gne*
// @exclude       http://www.flickr.com/photos/organize*
// @exclude       http://flickr.com/photos/organize*
// @exclude       http://www.flickr.com/groups/
// @exclude       http://flickr.com/groups/
// ==/UserScript==

// (c) 2006-2009 Stephen Fernandez - Excellatronic Communications

// Disclaimer
// ==========
// Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
// i cannot be held responsible for anything bad that happens regarding usage of this script.
 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and the 
// firefox extension called Greasemonkey: http://www.greasespot.net/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// There should now be a button at the top of the screen saying "Install User Script".
// Click it and accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Contacts Organiser", and click Uninstall.
//
// --------------------------------------------------------------------

/*
  About
  =====
  
  This script makes it easier for flickr users to follow their contacts, as it lets you categorise them using tags, and then view their
  photos via various criteria, eg most interesting, recent, earliest, etc etc
  
  Donate
  ======
  If you wish to thank me for all the work i have put into writing/testing/supporting this script,  
  and would like to support further updates and bug fixes, you can send me a few pounds/dollars/euros etc
  via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/ Every little helps, time is money
  and if you send me some money it means i can spend more time on these projects.

  ChangeLog
  =========
  v0.16  04-Aug-2006 added 2 new filters: "Photos tagged with..." + "Photos text includes..." Also stopped the user list refreshing after deleting a tag.
  v0.17  04-Aug-2006 added +tag functionality to tagged contacts list
  v0.18  05-Aug-2006 fixed some bugs + added rename tag function 
  v0.19  08-Aug-2006 added 2 new filters: "photos they've faved of yours" + "photos of theirs youve faved"
  v0.20  11-Aug-2006 added 3 new filters: "random photos", "their contacts", "their contacts photos"
  v0.30  17-Aug-2006 added 3 new filters: "Recent comments on their photos", "Faves you have in common", "Contacts you have in common"
  v0.31  17-Aug-2006 bugfix release, fixed 2 bugs ("Their Contacts" filter was broken, their was a bug getting the logged in users username)
  v0.32  17-Aug-2006 added "Photo tags you have in common" filter - it compares your 150 most popular tags with their most popular 150 tags
  v0.33  18-Aug-2006 added "Groups you have in common" filter - compares your group lists
  v0.34  19-Aug-2006 added 3 new filters "Testimonials they have given", "Testimonials they have received", "Interests you have in common"
  v0.35  19-Aug-2006 added 2 new filters "Comments you have made on their photos", "Comments they have made on your photos" 
  v0.351 21-Aug-2006 fixed bug in "comments you/they have made" filter
  v0.36  25-Aug-2006 added 3 new filters: "Their Groups","Their Interests","Their Photo Tags"
  v0.37  31-Aug-2006 added new filter: "Photos they have commented on"
  v0.371 04-Oct-2006 fixed "photos of yours they have commented on" filter
  v0.372 10-Nov-2006 fixed photos of yours/theirs they have commented on filters
  v0.373 29-Nov-2006 fixed photos of yours/theirs they have commented on filters *again* as google had changed their results ouput format
  v0.374 24-Mar-2007 fixed compatibility problem with new version of flickr shades
  v0.40  28-Mar-2007 added backup and restore tags datastore functions. also fixed some more bugs, eg disallow single and double quotes in tags
  v0.45  19-Apr-2007 solved data corruption problem, added automatic data fixer to restore lost tags
  v0.46  04-May-2007 added recent+interesting "Photos of this user" filters added recent+interesting "Photos tagged with..." filters fixed "testimonials they wrote" filter. also fixed stream duplication bug.
  v0.48  11-May-2007 fixed some css issues, disallowed quotes in tags, added some extra filters
  v0.49  17-May-2007 fixed username mangling when restoring tags from flickrmail datastore,
  v0.491 19-May-2007 added support for unicode tags, when u click add a tag, the prompt now displays the list of tags for that user.
  v0.50  26-May-2007 added "Contact Details" filter - which includes Instant Messaging presence functionality
  v0.51  29-May-2007 very minor adjustment to the contact details filter
  v0.52  06-Jun-2007 fixed bug in contact details filter, and added some extra details for same filter.
  v0.53  13-Jun-2007 Added "Their Sets" filter, added messenger (yim,aim,msn,icq) presence info to all users profile pages
  v0.61  20-Jun-2008 Fixed script to work with latest GM and FF
  v0.635 05-Mar-2009 Fixed the following filters : comments theyve made on your photos, comments youve made on their photos, testimonials they have written
                     Fixed restore tags from flickr mail backup functionality
                     Added new filters : Recent Videos, Earliest Videos, Most Interesting Videos, Least Interesting Videos, recent videos of this user, 
                                       : Earliest videos of this user, Most interesting videos of this user, Least interesting videos of this user, videos of this user by others
  v0.643 06-Mar-2009 Added image enlargement on rollover. Fixed alpha sorting of tags. Removed some code that wasnt working.
  v0.644 08-Mar-2009 added tags are now converted to lowercase. added mouseover image enlargement in "comments on photos" filters.
*/


/* TODO LIST
   ---------
  only run the script on non contact pages, when the plus tag is clicked, might save resources
  add loads more filters
  merge script with FlickrPM??
  add a refresh user icons function, as the icons seem to go out of sync sometimes
  add ability to "browse" an arbitrary user - even untagged ones
  preferences/settings screen - give the user the option to change the number of images retrieved per contact, type of thumbnail etc
  alphabeticise tags + users - *sort of done* ( add a sort up + sort down toggle button ) need to fix case insensitive sort + strip alphanumerics from start of strings
  tag integration (groups tagged with, photos tagged with, contacts tagged with)
  global tagging / del.icio.us integration?
  DONE! backup/import/export tags via flickrmail
  flickr mail your tag dump (exported tags) to other users, so they can import them?
  ability to subscribe to a users usertags via flickrmail / rss feed ?
  display user tags on profile page?
  add a tag input box to the "change relationship" popup window

  add paging for streams (left + right) eg buttons for next 10/X - previous 10/X
  some way of displaying your list of tags when adding a tag, so it saves typing, and the possibility of misspelt tags
  ability to mail all users tagged with the same tag, 
  ability to invite all users with a specific tag to join a group
  add a status span beneath each stream - then could eg add a string to say when most recent photo was updated (for most recent photos stream) etc
  use google api instead of screen scraping for certain functions
  add a check for updated version of script function
  indicate whether a tagged user is a "real" or "virtual" contact
  get thumbnails to work with the greased lightbox script
  tidy up filters list, sort by most used/useful. select box is becoming too unwieldy, time for a new interface...

  BUGS + ISSUES LIST
  ------------------
  after restoring the tags datastore from a flickrmail backup, usernames with non ascii characters get mangled
  show images of this user from others filter doesnt work correctly yet
  
  we need to force tags to lowercase otherwise causes problems with sorting and duplicate tags etc
  some of the users in the tags list buddy icons dont display (shows grey box instead of actual icon) (seems to be a creeping bug?)
  if theres no tags, dont display "tags:" or maybe display tags: none
  get usericon buddy menus to work (almost there!)
  contacts tagged with "tag" X - at present the number X doesnt get updated when we delete a tag from a contact
  if you log out of flickr and a different flickr user logs in on the same machine, they get to see your tags - need to create different set of tags for each logged in flickr user?
  the faves you have in common and the contacts you have in common filters are extremely slow, maybe they can be optimised
  FIXED: sometimes the users photo stream gets duplicated... we need to disable the click for a second or 2 to avoid double clicking
  FIXED: testimonials they have written function doesnt work any more
  FIXED: for the "comments you have made on their photos" and "comments they have made on your photos" filters, the bug is that it only works if the username is the same as the username used in the url 
  FIXED: recent commented photos filter doesnt work for usernames begginging with dodgy chars like "*" 
  FIXED: after renaming a tag, the page reloads for some reason
  FIXED: need to fix the addtag link on the main tags page
  FIXED: stop trying to display taglist on every page
  FIXED: UTF encoding problem with GM_setValue - sorted using encodeURI() function
  FIXED: sort out "error parsing json string" thing - maybe write the message to the console instead - sorted
  FIXED: sometimes the filter select box doesnt work for me, i dont know why this is though...
  FIXED: when deleting a tag from a user, dont retrieve+redisplay all users streams again
  FIXED: "photos of yours/theirs they have commented on" filter wasnt working

*/

// we are storing userid username userurl with GM_setValue



(function() {

  var versionnum='v0.644';
  var HOW_MANY_PICs_TO_GRAB=8; // you can change this to a value that will fit on you screen/download at a reasonable speed
  var HOW_MANY_CONTACTS_TO_GRAB=15;
  var HOW_MANY_SETS_TO_GRAB=10;
  var DEFAULT_THUMBNAIL_TYPE='t'; // possible values = t/s/m
  var yourid=unsafeWindow.global_nsid;
  if (unsafeWindow.photos_url)
    var youruserurl=unsafeWindow.photos_url.split('/')[2]; // (url username without slashes)
  else
    return; // user is not logged in

  //var SEP1 = "\xFD"; // "\xAC"; //new String.fromCharCode(172)
  var SEP1   = "\xAC"; //proper separator !!! 
  var BADSEP = "\xFD"; //bad separator


  var getElementsByClassName = function (classname,tagname) {
    //N.B tagname is optional
    return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
    //return unsafeWindow.document.getElementsByClass(classname,tagname)
  }

tagval=GM_getValue('contacttags','');

if (tagval) {
  try {
    unsafeWindow.contagsobject = unsafeWindow.JSON.parse(tagval);
  }
  catch(e){ 
    GM_log('[initialisation] - error parsing json string ');
  }
}
else
  unsafeWindow.contagsobject=[];


unsafeWindow.mouseoverthumb = function (img) {
 //alert('in');
 //alert(this.innerHTML);
 img.src=img.src.replace('_t.jpg','_m.jpg');
 //img.onload=("img.height=this.height;img.width=this.width;");
 
 return;
}

unsafeWindow.mouseoutthumb = function (img) {
 //alert('out');
 img.src=img.src.replace('_m.jpg','_t.jpg');
 return;
}

unsafeWindow.curf=GM_getValue("contactfilter",'Dont show any pictures');

coReadData = function () {
   return unsafeWindow.contagsobject;
}

coSaveData = function (tagsoserial) {

  try {
    var tmptagsobject = unsafeWindow.JSON.parse(tagsoserial); // check if json object is formatted correctly
  }
  catch(e){ 
    GM_log('Flickr Groups Organiser GM Script: error parsing json string in coSaveData function');
    alert('Error saving tags object');
    return;
  }
  unsafeWindow.contagsobject = unsafeWindow.JSON.parse(tagsoserial);
  //console.log(dumpObj(unsafeWindow.contagsobject));
  window.setTimeout(function() { GM_setValue ('contacttags', tagsoserial); }, 0 );
  tmptagsobject=null; 
 
}

  var yourusername=getElementsByClassName('Pale','a')[0].textContent;
  if(!yourusername)
    yourusername='';

  unsafeWindow.stripnasties = function (string) {
    string=string.replace(/[\'\"]/g,'');
    return string;
  }

  /*
  function sortCaseInsensitive(a, b) {  // case insensitive sort an array
    if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
    if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
    return 0;
  }
  */

  delay = function(ms) {
    date = new Date();
    curDate = null;
    do { var curDate = new Date(); }
    while ( curDate - date < ms);
  }

 shortenstring=function (str,len) {
   if(str.length>len)
     return str.substr(0,len) + '..';
   else
     return str;
 }

 function unixtimetodate(unixdtstr) {
   var theDate = new Date(unixdtstr * 1000);
   dateString = theDate.toGMTString();
   return dateString;
 }
 
  grabuserid = function(text) {
    buddyid = 'undefined';
    if (text.indexOf('buddyicon.jpg') != -1) { // no proper icon
      buddiarr = text.split('buddyicon.jpg?');
      if (buddiarr[1] != null) {
        buddyid = (buddiarr[1].split('"'))[0];
      }
    } else {
      buddiarr = text.split('/buddyicons/');
      if (buddiarr[1] != null) {
        // get the iconserver number too
        buddyid = text.split('flickr.com/')[1].split('/buddyicons/')[0] + '_' + buddiarr[1].split('.jpg')[0];
      }
    }
    if ((buddyid == 'undefined') || (buddyid == null)) {
      buddyid = (text.split('/'))[2];
    }
    return (buddyid == null) ? 'undefined' : buddyid;
  }

unsafeWindow.writeConsole = function(content) {
 top.consoleRef=window.open('','myconsole',
  'width=640,height=650'
   +',menubar=0'
   +',toolbar=1'
   +',status=0'
   +',scrollbars=1'
   +',resizable=1')
 top.consoleRef.document.writeln(
  '<html><head><title>Console</title></head>'
   +'<body bgcolor=white onLoad="self.focus()">'
   +content
   +'</body></html>'
 )
 top.consoleRef.document.close()
}

fixCorruptedDatastore = function() {
  tmpstore=GM_getValue("contacttags");
  tmpstore=tmpstore.replace(BADSEP,SEP1,'g');
  //GM_setValue("contacttags",tmpstore);
  coSaveData(tmpstore);
  alert('fingers crossed, the datastore should be fixed now!');
}


FCOresettags=function() {
  if(confirm("Do you want to completely reset the contact organiser tags?\n You cant get them back once they are gone!"))
    GM_setValue('contacttags','');
  else
    return;
  listags();
}
GM_registerMenuCommand("Reset Flickr Contacts Tags", FCOresettags);

FCObackuptags=function() {
  tagval=GM_getValue('contacttags','');
  if (tagval) { //alert(encodeURIComponent(tagval));
    FCOsendmail ( unsafeWindow.global_nsid, unsafeWindow.global_auth_hash,'Flickr Contacts Organiser Tags Backup System', encodeURIComponent(tagval)); // ( we might need to encode tagval here!! ) 
  }
  else
    alert('Error backing up Flickr Contacts Organiser Tags to Flickrmail Datastore');
}

GM_registerMenuCommand("Backup: Flickr Contacts Organiser Tags to Flickrmail DataStore", FCObackuptags);

FCOrestoretagsfromflickrmail=function() {
  restorediv=document.createElement('div');
  restorediv.innerHTML='<b>The following Flickr Contacts Organiser tag backups are availble in your FlickrMail datastore</b><p/>';
  restorediv.setAttribute('id','restorediv');
  //grab the first flickrmail page http://flickr.com/messages.gne?ok=1
  
  dahostname=unsafeWindow.document.location.href.split('/')[2];
  
  request = new XMLHttpRequest();
  if (request) {
    request.open("GET", "http://" + dahostname + "/messages.gne?ok=1", false);
    request.send(null);
    if (request.status == 200) {
      content = request.responseText;
      tableinnards=content.split('\<table id\=\"InBox\" cellspacing\=\"0\" width=\"100\%\"\>')[1].split('\<\/tbody\>\<\/table\>')[0];
      tmptable=document.createElement('table');
      tmptable.innerHTML=tableinnards;
      tmpas=tmptable.getElementsByTagName('td');
      for(i=0;i<tmpas.length;i++) {
        if(tmpas[i].innerHTML.match('\>Flickr Contacts Organiser Tags Backup System\<\/a\>')) {
          restorediv.innerHTML+= "Backup by: <b>" + tmpas[i-1].innerHTML + '</b> on ';
          restorediv.innerHTML+= tmpas[i+1].innerHTML + ' ';
          backupid=tmpas[i].innerHTML.split('\?id\=')[1].split('\"')[0];
          viewbackuplink="<A target=new href=http://" + dahostname + "/messages_read.gne?id=" + backupid + ">View</a>"
          restorebackuplink="<A href='javascript:restorebackupfrommail(\"" + backupid + "\");'>Restore</a>"
          restorediv.innerHTML+= viewbackuplink + ' | ' + restorebackuplink;
          restorediv.innerHTML+='<br/>';
        }
      }
      restorediv.innerHTML+='<p><br/></p>';
    }
  }
  tmpnavbar=document.getElementById('SubNav');
  if (tmpnavbar) {
    tmpnavbar.parentNode.insertBefore(restorediv, tmpnavbar.nextSibling);
  }
}

GM_registerMenuCommand("Restore Flickr Contacts Organiser Tags from Flickrmail DataStore", FCOrestoretagsfromflickrmail);

unsafeWindow.restorebackupfrommail = function(backupid) {

 request = new XMLHttpRequest();
  if (request) {
    request.open("GET", "http://flickr.com/messages_read.gne?id=" + backupid, false);
    request.setRequestHeader('User-Agent', 'Greasemonkey - Flickr Contacts Organiser ' + versionnum);
    request.setRequestHeader('Referer', 'http://flickr.com/messages.gne?ok=1');
    request.setRequestHeader('Cookie', document.cookie);
    request.send(null);
    if (request.status == 200) {
      content = request.responseText;
      //alert(content);
      tmptags= '{' + content.split("\<p\>\{")[1].split("\}\<\/p\>")[0] + '}'; // grab the JSON packet

      //tmptags=decodeURIComponent(tmptags); // attempt to unmangle it (this doesnt seem to work)
      tmptags=tmptags.replace('&quot;','"','g');
      tmptags=tmptags.replace('&amp;',"\x26",'g'); //replace ampersand with hex version

      
      coSaveData(tmptags);
      //alert(tmptags);//encodeURIComponent

      //unsafeWindow.writeConsole(tmptags);
      /*
      try {
        var tmptagsobject = unsafeWindow.JSON.parse(tmptags);
      }
      catch(e){ 
        GM_log('Flickr Contacts Organiser GM Script: error parsing json string in FCOrestoretags function');
        alert('Data is in incorrect format');
        return;
      }
      tmptagsobject=null;
      //alert(tmptags);
      GM_setValue('contacttags',tmptags);
      */
      tmptags=null;
      document.getElementById('restorediv').style.display='none';
      unsafeWindow.tag_filter_lock=""; // reset the lock
      listags();
 
      //alert(backupid);
      alert('Flickr Contacts Organiser Tags Datastore has been restored');
    }
  }  
}

fcodspdatastore = function () {
  tagval=GM_getValue('contacttags','');
  if (tagval)
    unsafeWindow.writeConsole(tagval);
}

GM_registerMenuCommand("Display: Flickr Contacts Organiser - Tags Datastore", fcodspdatastore);

FCOsendmail=function(userid, mcookie, subject, message) {
   if(!subject || !message || !userid || !mcookie ) {
     alert('Error storing FCO tags data!');
     return false;
   }
   
  //alert(location.href.split('/')[2]);
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://www.flickr.com/messages_write.gne',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey (Flickr Contacts Organiser)' + versionnum,
      'Content-type': 'application/x-www-form-urlencoded',
      'Referer': 'http://flickr.com/messages_write.gne',
    },
    data: 'magic_cookie=' + mcookie + '&reply=&done=1&to_nsid=' + userid + '&subject=' + subject + '&message=' + message ,
    onload: function(responseDetails) {
    //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
        if (responseDetails.responseText.match('Your message has been sent.'))
          alert('Flickr Contacts Organiser Tags have successfully been backed up to your flickr mailbox'); // document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Mail has been sent to " + username +'<p/>';
        else
          alert('Flickr Contacts Organiser Tags backup to flickr mailbox has failed'); // document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Mail send has failed<p/>";
      }
    });
return false;
}

FCOrestoretags=function() {
  var tmptags=prompt('Enter the Flickr Contacts Organiser Tags Datastore you wish to restore');
  // verify data is in correct format
  try {
    var tmptagsobject = unsafeWindow.JSON.parse(tmptags);
  }
  catch(e){ 
    GM_log('Flickr Contacts Organiser GM Script: error parsing json string in FCOrestoretags function');
    alert('Data is in incorrect format');
    return;

  }
  tmptagsobject=null;
  //GM_setValue('contacttags',tmptags);
  coSaveData(tmptags);
  
  listags();
  alert('Flickr Contacts Organiser Tags Datastore has been restored');
}

GM_registerMenuCommand("Restore Flickr Contacts Organiser Tags via direct input", FCOrestoretags);

unsafeWindow.fcoRenametagprompt=function(tag) {

  newtag=prompt("Enter the tagname you want to replace \"" + decodeURIComponent(tag) + "\" with");

  if(!newtag)
    return false;
  if(!newtag.replace(/['" ]/g,'')) {
    alert('You didnt enter a tag!');
    return false;
  }

  unsafeWindow.fcoRenametag (tag, newtag);
  return false;

}

unsafeWindow.fcoRenametag=function(tag, newtag, specialcase) {
  /*
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("contacttags"));
  }
  catch(e){ GM_log('Flickr Contacts Organiser GM Script: fcoRenametag function: error parsing json string'); 
    //document.write(tagsobject);
    return;}
  */
  
  newtag=newtag.replace(/['"]/g,''); // strip out damn quotes
  if(!specialcase)
    newtagenc=encodeURIComponent(newtag);
  else
    newtagenc=newtag;

  if(!specialcase) // specialcase is when we need to rename tag with URIEncoded version
    for (var x in unsafeWindow.contagsobject) 
      if ((x==newtag) || (x==newtagenc)) {
        alert('Sorry, theres aready a tag called "'+ decodeURIComponent(newtag) + '"');
        return;
      }

  for (var x in unsafeWindow.contagsobject) 
    if (x==tag) {
      tmpob=unsafeWindow.contagsobject[x];
      delete(unsafeWindow.contagsobject[x]);
      unsafeWindow.contagsobject[newtagenc]=tmpob;
      //tmpob=null;
    }
  tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.contagsobject);
  //alert(tagsoserial);
  //GM_setValue("contacttags",tagsoserial);  
  coSaveData(tagsoserial);

  //alert(GM_getValue("contacttags"));
  unsafeWindow.tag_filter_lock="";
  listags(); //redisplay the tag list
  unsafeWindow.dspcontactstagtab(newtagenc); //redisplay
 
  return false;

}

unsafeWindow.changefilter = function(sel) {
  unsafeWindow.tag_filter_lock=""; // reset the lock
  //alert(sel[sel.selectedIndex].value);

  //if(sel[sel.selectedIndex].value=="Photos text includes..." || sel[sel.selectedIndex].value.match('photos tagged with...'))
  if(sel[sel.selectedIndex].value.match("Photos text includes...") || sel[sel.selectedIndex].value.match('photos tagged with...'))
    searchtext=prompt('Enter the text you want to search for');
  else
    searchtext='';
  window.setTimeout(function() { GM_setValue("contactfilter",sel[sel.selectedIndex].value + searchtext); }, 0);
  unsafeWindow.curf=sel[sel.selectedIndex].value + searchtext;
  
  unsafeWindow.dspcontactstagtab(sel.parentNode.dtag.value);
  return false;
}


// BEGIN new code!!!
unsafeWindow.getObjectMethodClosure=function(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}

unsafeWindow.newbuddyfunction=function(theimgid){ 
  //adds buddymenu to usericon
  //many thanks to mortimer?!! for helping with this!! :)
  unsafeWindow.console.log(theimgid);
  
  imgs=document.getElementById(theimgid);
  if((imgs.getAttribute('id')) && (imgs.getAttribute('id').match('FriendBuddyIcon'))) {
    var biid = imgs.getAttribute('id').split('FriendBuddyIcon')[1];

    var img2 = document.getElementById('FriendBuddyIcon'+biid);
    img2.nsid = biid;

    imgs.addEventListener('mouseover',unsafeWindow.getObjectMethodClosure(document.getElementById('person_hover'),'icon_mouseover'),true);
    imgs.addEventListener('mouseout',unsafeWindow.getObjectMethodClosure(document.getElementById("person_hover"),'icon_mouseout'),true);

    var id="hover_img" + biid;
    if (!document.getElementById(id)) {  
      var new_img = document.createElement("IMG");
      /*
      new_img.id = id;
      new_img.nsid = biid;
      new_img.src = imgs.getAttribute('src');
      new_img.className = "person_hover_img";
      */
      new_img.setAttribute('id',id);
      new_img.setAttribute('nsid',biid);
      new_img.setAttribute('src',imgs.getAttribute('src'));
      new_img.setAttribute('className',"person_hover_img");
      
      document.getElementById("person_hover_link").appendChild(new_img);
      var new_img2 = document.getElementById(id);
      new_img2.setAttribute('nsid',biid);
    }
  }
} // end new buddy function
// end new code!!!

unsafeWindow.tag_filter_lock="";

unsafeWindow.dspcontactstagtab =function (tag) {
  if (unsafeWindow.tag_filter_lock==tag)  {
    //alert('tag_filter_lock');
    return; // function is locked, to prevent duplication of streams
  }
  unsafeWindow.tag_filter_lock=tag;


  if(!document.getElementById('tagslist')) {
    tagslist=document.createElement('span');
    tagslist.setAttribute('id','tagslist');
    tagspan=document.getElementById('tagspanid');
    tagspan.parentNode.insertBefore(tagslist,tagspan.nextSibling);
  }

  if (!unsafeWindow.contagsobject[tag]) { // check if that tag actually exists
    listags(); // its not there so redisplay list, to remove ghost tag
    return;
  }
  
  contactarr=unsafeWindow.contagsobject[''+tag].split('|');
    
  tagslist.innerHTML='<h2 id="contagstitle" style="margin-top:10px;margin-bottom:5px">Contacts tagged with "<span style=color:#FF0084>' + decodeURIComponent(tag) + '</span>" (' + contactarr.length + ') <span id="spcontfilter"></span></h2>'; // style=display:inline

  filter=document.getElementById('spcontfilter');
  filter.style.fontSize='12px';
  filter.style.float='right';
  filter.style.marginLeft='150'; 
  filter.style.fontWeight='normal';
  filter.innerHTML='<form style="display:inline" id="fxid"><b>Current Filter</b>  '+
                   '<input type="hidden" name="dtag" value="' + tag + '">' +
                   '</form>';

  //curf=GM_getValue("contactfilter",'Dont show any pictures');
  if((unsafeWindow.curf=='Faves you have in common') || (unsafeWindow.curf=='Contacts you have in common'))
    if(!confirm('This filter is EXTREMELY SLOW TO RUN! + may FREEZE your browser for a while, are you sure you want to continue?')) {
      unsafeWindow.curf='Dont show any pictures';
      window.setTimeout(function() { GM_setValue("contactfilter",'Dont show any pictures'); }, 0 );
    }
 
  dasel=document.createElement('select');
  dasel.setAttribute('onchange','changefilter(this)');
  arrFilter=new Array("Dont show any pictures","Recent Photos","Earliest Photos","Most Interesting Photos","Least Interesting Photos","Recent Videos","Earliest Videos","Most Interesting Videos","Least Interesting Videos","Recent photos of this user","Earliest photos of this user","Interesting photos of this user","Least interesting photos of this user","Pics of this user from others","Recently Favourited Photos","Recent comments on their photos","Photos they have commented on","Photos of yours they have commented on","Photos of theirs you have commented on","Their Sets","Random Photos","Photos of theirs you've faved","Photos of yours they've faved","Faves you have in common","Recent photos tagged with...","Interesting photos tagged with...","Photos text includes...","Contact Details","Their Contacts","Their Contact's Photos","Contacts you have in common","Their Groups","Groups you have in common","Their Photo Tags","Photo tags you have in common","Their Interests","Interests you have in common","Testimonials they have written","Testimonials they have received","Recent videos of this user","Earliest videos of this user","Interesting videos of this user","Least interesting videos of this user","Videos of this user from others"); // 
  for(i=0;i<arrFilter.length;i++) {
    blah=document.createElement('option');
    //blah.style.display='block';
    if(unsafeWindow.curf.match(arrFilter[i])) 
      blah.setAttribute('selected','true');
    if(unsafeWindow.curf.match(arrFilter[i]) && unsafeWindow.curf.match('...'))
      blah.textContent=unsafeWindow.curf;
    else
      blah.textContent=arrFilter[i];
    dasel.appendChild(blah);
  }
  document.getElementById('fxid').appendChild(dasel);

  renametaglink=document.createElement('a');
  renametaglink.setAttribute('onclick','fcoRenametagprompt(\'' + tag + '\')');
  renametaglink.setAttribute('href','javascript:;');
  renametaglink.setAttribute('title','Rename current tag');
  renametaglink.textContent='Rename tag';
  renametaglink.style.textDecoration='none';
  renametaglink.style.fontSize='12';
  renametaglink.style.color='darkgray';
  renametaglink.style.marginLeft='4';
  
  document.getElementById('spcontfilter').parentNode.insertBefore(renametaglink,document.getElementById('spcontfilter'));

  nooul=document.createElement('p');

  //x=contactarr.sort(); //sortCaseInsensitive sort users alphabetically

  for (i=0;i<contactarr.length;i++){
    tmparr=contactarr[i].split(SEP1);
    
    if(!tmparr[1]) {
      alert('Your tag datastore seems to be corrupt, im going to try and fix it right now!');
      fixCorruptedDatastore();
      return;
    }

    ghref=tmparr[1]; //user url

    tmpli=document.createElement('p');
    tmpli.style.marginBottom='3px';

    if(!(i%2)) 
      tmpli.style.backgroundColor='#eeeeee';

    if(tmparr[2].match('_')) // if the userid is stored with the iconserver number
      userid=tmparr[2].split('_')[1];
    else
      userid=tmparr[2];

    tmpli.setAttribute('id','user' + '_' + userid);
    //tmpli.setAttribute('class','Person');
    if(tmparr[2].match('_')) {
      budic='http://static.flickr.com/'+tmparr[2].split('_')[0] + '/buddyicons/' +tmparr[2].split('_')[1] + '.jpg';
      bid=tmparr[2].split('_')[1];
    }
    else {
      budic='http://www.flickr.com/images/buddyicon.jpg?' +tmparr[2] ;
      bid=tmparr[2];
    }

    try {  // handle whether flickrPM is installed or not
      pmlinks=unsafeWindow.makeLinks(bid); // makeLinks is defined in flickr.pm.user.js 
    } 
    catch(e) {
      pmlinks='';
    }
    adtaglink='<a title="Add a tag to this contact" style="color:darkgray;text-decoration:none" onclick="addtagtocontact(\'' + decodeURIComponent(tmparr[0]) + '\',\'' + ghref + '\',\'' + tmparr[2] + '\')" href="javascript:;">+tag</a>';
     
    if(unsafeWindow.curf!='Dont show any pictures') 
      loadingmsg='<span style="position:relative;top:11" id="loading_' + userid + '">&nbsp&nbsp;<b>Loading, Please Wait...</b> <img src="http://flickr.com/images/pulser2.gif"/></span>';
    else
      loadingmsg='';
    tmpli.innerHTML= '<a style="text-decoration:none" href="' + '/photos/' + tmparr[1] + '">' + decodeURIComponent(tmparr[0]) + '</a>&nbsp;' + pmlinks + adtaglink + ' <a title="Delete this tag from this contact" style=color:darkgray;text-decoration:none href="javascript:;" onclick="deltagfromcontact(\'' + tag + '\',\'' + ghref +'\');this.parentNode.style.display=\'none\'">-tag</a>' + '<br>' + '<a href=' + '/photos/' + tmparr[1] + '><img id="FriendBuddyIcon' + bid +'" className="FriendBuddyIcon" width="48" height="48" align="top" style=margin-top:3px src="' + budic + '"/></a>&nbsp;&nbsp;' + loadingmsg;

    //onmouseout="return (document.getElementById(\'person_hover\'))[\'icon_mouseout\'];" onmouseover="return (document.getElementById(\'person_hover\'))[\'icon_mouseover\'];"
    // space out calls to the api
    setTimeout("grabphotosfromapi('" + userid + "'," + HOW_MANY_PICs_TO_GRAB + ",'" + decodeURIComponent(tmparr[0]) + "','" + decodeURIComponent(tmparr[1]) +"')",(i+1)*2000); // space out calls to the api
    //delay(1000);
    //grabphotosfromapi(userid,HOW_MANY_PICs_TO_GRAB); 
    nooul.appendChild(tmpli);
    
    //create span to hold info on pics
    picinfodiv=document.createElement('div');
    picinfodiv.setAttribute('id','picinfodiv_' + userid);
    picinfodiv.setAttribute('align','center');
    picinfodiv.style.display='none';
    nooul.appendChild(picinfodiv);
    
    //unsafeWindow.newbuddyfunction("FriendBuddyIcon" + bid);
   
  }

  //tagslist.innerHTML+= '<a href=' + contactarr[i].split(SEP1)[1] + '>' + contactarr[i].split(SEP1)[0] + '</a> | ';
  steeevfooter=document.createElement('p');
  steeevfooter.style.backgroundColor='#dddddd';
  steeevfooter.innerHTML='<b><a target="_blank" href=http://steeev.freehostia.com/flickr/>Flickr Contacts Organiser</a></b>&nbsp;&nbsp; <a title="Check for Updates" href="http://steeev.freehostia.com/flickr/flickr.contacts.organiser.user.js">' + versionnum + '</a>&nbsp;&nbsp; by&nbsp;&nbsp; <a title="Flickr Contacts Organiser was created by Stephen Fernandez aka Steeev" target="_blank" href="/photos/steeev/">Steeev</a>&nbsp;&nbsp; If you like this script, and would like to see it developed further, please <a href=http://steeev.freehostia.com/donate/>make a donation</a>&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;More of Steeevs scripts <a target="_blank" href="http://steeev.freehostia.com/flickr/">here</a>';
  nooul.appendChild(steeevfooter);
  tagslist.appendChild(nooul);


  //alert('hello there');
  /*  begin new code for buddymenus
  for (x=0;x<contactarr.length;x++) {
    tmparr=contactarr[x].split(SEP1);
    if(tmparr[2].match('_')) {
      bid=tmparr[2].split('_')[1];
    }
    else {
      bid=tmparr[2];
    }
    //alert(bid);
    unsafeWindow.newbuddyfunction("FriendBuddyIcon" + bid);
  }
    //end new buddymenu code
 */
}

listags=function () {

  //unsafeWindow.console.dir (unsafeWindow.contagsobject);
  
  //////////////////////////////////
  // BEGIN associative array sort code
  
  var num = 0;
  var tmp = new Array();
  var sorted = new Array();
  for (i in unsafeWindow.contagsobject)
    tmp[num++] = i + "$Z9Z$" + unsafeWindow.contagsobject[i];
    
  //unsafeWindow.console.dir (tmp);
  tmp = tmp.sort();
  //unsafeWindow.console.dir (tmp);
  for (i = 0; i < tmp.length; i++)
  {
     x = tmp[i].split("$Z9Z$")
     sorted[x[0]] = x[1];
   }
  unsafeWindow.contagsobject=sorted;
  
  // END associative array sort code
  //////////////////////////////////

  //unsafeWindow.console.dir (unsafeWindow.contagsobject);

  tagspan.innerHTML='<b>Tags:</b> ';
    for (var x in unsafeWindow.contagsobject) {
      contactarr=unsafeWindow.contagsobject[x].split('|');
      tagspan.innerHTML+= '<a style=text-decoration:none href=\'javascript:;\' onclick=\'dspcontactstagtab\("'  +  x + '"\);return false;\'>' + decodeURIComponent(x) + '</a> | ';
    }

}

unsafeWindow.addtagtocontactNoId = function (username,userurl) {
  //get the userid + iconserver value
  hostname=unsafeWindow.document.location.href.split('/')[2];
  apiurl="http://" + hostname + "/services/rest/?method=flickr.urls.lookupUser&api_key=9d179414c5491bb965d03dab476a0ef8&url=" + userurl;
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  userid = p.responseText.split('id=\"')[1].split('\"')[0]; 

  //now get iconserver
  apiurl="http://" + hostname + "/services/rest/?method=flickr.people.getInfo&api_key=9d179414c5491bb965d03dab476a0ef8&user_id=" + userid;
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  iconserv = p.responseText.split('iconserver="')[1].split('"')[0]; 

  //alert(iconserv);
  if (iconserv != '0')
    userid = iconserv + '_' + userid;

  //alert(username + ' ' + userurl + ' ' + userid  );
  unsafeWindow.addtagtocontact(username, userurl.split('/photos/')[1], userid);
  unsafeWindow._ge("person_hover").hover_go_away();
  return;

}


unsafeWindow.addtagtocontactfrompersonmenu=function(node) {
  if(node.getElementsByTagName("strong")[0])
    username=node.getElementsByTagName("strong")[0].innerHTML;
  else if (node.getElementsByTagName('p')[0].innerHTML.match(/^You are blocking/))
    username=node.getElementsByTagName('p')[0].innerHTML.split('You are blocking')[1];
  else {
    alert('Error retrieving username');
    return;
  }
    
  userid=document.getElementById('personmenu_mail_link').getAttribute('href').split('to=')[1].split('\"')[0] ; //node.getElementsByTagName("a")[0].getAttribute('href').split('id\=')[1].split('\"');
  userurl=document.getElementById('personmenu_photos_link').getAttribute('href').split('/photos/')[1].split('"')[0];

  //alert(username + ' ' + userurl + ' ' + userid  );

  //get the iconserver value
  hostname=unsafeWindow.document.location.href.split('/')[2];
  apiurl="http://" + hostname + "/services/rest/?method=flickr.people.getInfo&api_key=9d179414c5491bb965d03dab476a0ef8&user_id=" + userid;
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  iconserv = p.responseText.split('iconserver=\"')[1].split('\"')[0]; 

  //alert(iconserv);
  if (iconserv != '0')
    userid = iconserv + '_' + userid;

  //alert(username + ' ' + userurl + ' ' + userid  );
  unsafeWindow.addtagtocontact(username, userurl, userid)
  unsafeWindow._ge("person_hover").hover_go_away();
  return;

}

unsafeWindow.FCOlistcontactstags=function (userid) {
  var datagslist='';
  /*
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("contacttags"));
  }
  catch(e) { 
    GM_log('Flickr Contacts Organiser GM Script: listags function : error parsing json string'); 
    return;
  }
  */
  for (var x in unsafeWindow.contagsobject)
    if(unsafeWindow.contagsobject[x].match(userid))
      datagslist+=x +', ';
  return datagslist;
}

unsafeWindow.addtagtocontact =function(name,urlx,id) {
  name=encodeURIComponent(name); // handle the dodgy characters
  datags=unsafeWindow.FCOlistcontactstags(id);
  if(datags)
    damsg="This user is currently tagged with: " + decodeURIComponent(datags) + '\n';
  else
    damsg="";
  tagname=prompt(damsg + 'Please enter the tag you want to associate with this person');
  
  //tmptag=tagname.replace(' ','','g');
  if(!tagname || (!(tagname.replace(/['" ]/g,'')))) {
    alert('You didnt enter a tag!');
    return false;
  }
  tagname=tagname.replace(/['"]/g,''); //remove nasty quotes
  tagname=encodeURIComponent(tagname.toLowerCase());
  
  if (unsafeWindow.contagsobject) { 

    if ( unsafeWindow.contagsobject[tagname] )  { // if tag already exists
       // we need to check if this contact already has this tag
       // if not add contact to tag
      if(!unsafeWindow.contagsobject[tagname].match(urlx)) { 
        unsafeWindow.contagsobject[tagname]+= '|' + name + SEP1 + urlx + SEP1 + id;
      }  
      else {
        alert('This person is already tagged with: ' + tagname);
        return false;
      }      
    }
    else 
      // create new tag
      unsafeWindow.contagsobject[tagname]=name + SEP1 + urlx + SEP1 + id;
  }
  else {
  
    unsafeWindow.contagsobject=[];
    unsafeWindow.contagsobject[tagname]=name + SEP1 + urlx + SEP1 + id;
  }
  
  //alert(tagsobject[tagname]);
  tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.contagsobject);

  //alert(tagsoserial);
  //GM_setValue("contacttags",tagsoserial); 
  coSaveData(tagsoserial); 
  unsafeWindow.tag_filter_lock="";
  //alert(GM_getValue("contacttags"));
  listags(); //redisplay the tag list
  return false;

}


unsafeWindow.deltagfromcontact = function(tag,url) {
  /*
  tagval=GM_getValue('contacttags','');

  try {
    var tagsobject = unsafeWindow.JSON.parse(tagval);
  }
  catch(e){ 
    GM_log('Flickr Contacts Organiser GM Script: error parsing json string');
  }
  */
  
  //alert(tagsobject);
  if(!unsafeWindow.contagsobject[tag]) {
    return;
  }
  else { 
    // we need to check if this contact already has this tag
    if(!unsafeWindow.contagsobject[tag].match(url))
      return;
    else {
      //alert(tagsobject[tag]);
      tagarr=unsafeWindow.contagsobject[tag].split('|');
      for(i=0;i<tagarr.length;i++)
        if(tagarr[i].match(url)) {
          tagarr.splice(i,1);
          break;
        }
      if(tagarr.length)
        unsafeWindow.contagsobject[tag]=tagarr.join('|');
      else {
        delete unsafeWindow.contagsobject[tag]; 
        tagslist=document.getElementById('tagslist')
        tagslist.innerHTML='';
      }
    }
  }
    
  //alert(tagsobject[tag]);
  tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.contagsobject);
  //alert(tagsoserial);
  //GM_setValue("contacttags",tagsoserial);  
  
  coSaveData(tagsoserial);
  
  //alert(GM_getValue("contacttags"));

  // commented out to save refreshing and hitting hte api each time we delete a tag
  listags(); //redisplay the tag list
  //unsafeWindow.dspcontactstagtab(tag);

  return false;

}

parsePhotoTagsXML = function( userid, xml) {
  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';
  var entries = xml.getElementsByTagName('tag');
  var html='';
  for(var p=0; p < entries.length; p++) {  
    var tag = entries.item(p).textContent;
    //var nsid=entries.item(p).getAttribute('nsid');
    html +="<a style='text-decoration:none' href='http://flickr.com/photos/"  + userid + "/tags/" + tag +"'>" + tag + "</a>, " ;
    //html="<table style=display:inline><tr><td>" + link + "<img height='48' width='48' src='" + buddyicon + "' alt='" + username + "'/></a></td></tr><tr><td>" + link + shortenstring(username,9) + "</a></td></tr></table>";
  }
  html = html="<table style='display:inline'><tr><td valign=top>"+html+"</td></tr></table>";
  document.getElementById('user_'+userid).innerHTML += html;

}

parseGroupsXML=function ( userid, xml) {

  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';
  try {
    var entries = xml.getElementsByTagName('group');
  } catch(e) {
      var parser = new DOMParser();
      var xml = parser.parseFromString(xml, "application/xml");
      var entries = xml.getElementsByTagName('group');
  }

/*
  if (limit=='limit') {
    if(entries.length<HOW_MANY_CONTACTS_TO_GRAB)
      var cgrab=entries.length;
    else
      var cgrab=HOW_MANY_CONTACTS_TO_GRAB;
  }
  else {
    var cgrab=entries.length;
  }
*/
  var html='';
  for(var p=0; p<entries.length; p++) {  // cgrab;(too many!!)
    var name = entries.item(p).getAttribute('name');
    var nsid=entries.item(p).getAttribute('nsid');
    var href = "http://flickr.com/groups/" +nsid; 
    html+="<a style='text-decoration:none' href='" + href + "'>" + name + "</a>,&nbsp;&nbsp;";
  }
  html="<table style='display:inline'><tr><td valign=top>"+html+"</td></tr></table>";

  document.getElementById('user_'+userid).innerHTML += html;

}

parseSetsXML=function ( userid, xml, limit) {
  //example set result
  //<photoset id="181095" primary="7561061" secret="5d5110128e" server="5" farm="1" photos="100">
  //<title>Cream of Steeev</title>
  //<description>My Favourite Images by Me.</description>
  //</photoset>

  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';
  var entries = xml.getElementsByTagName('photoset');

  if (limit=='limit') {
    if(entries.length<HOW_MANY_SETS_TO_GRAB)
      var cgrab=entries.length;
    else
      var cgrab=HOW_MANY_SETS_TO_GRAB;
  }
  else {
    var cgrab=entries.length;
  }

  var html='<table style="display:inline"><tr>';
  for(var p=0; p < cgrab; p++) {  //<entries.length (too many!!)
    var title = entries.item(p).getElementsByTagName('title')[0].textContent;
    //var description = entries.item(p).getElementsByTagName('description')[0].textContent;
    var primary = entries.item(p).getAttribute('primary');
    var id=entries.item(p).getAttribute('id');
    var server=entries.item(p).getAttribute('server');
    var secret=entries.item(p).getAttribute('secret');
    var href = "http://flickr.com/photos/"  + userid + "/sets/" + id + "/";
    var icon = "http://static.flickr.com/" + server + "/" + primary + "_" + secret + "_s.jpg";
    link="<a title='" + title + "' style='text-decoration:none' href='" + href + "'>";
    html+="<td>" + link + "<img height='75' width='75' src='" + icon + "' alt='" + encodeURIComponent(title) + "'/></a><br>" + link + shortenstring(title,12) + "</a></td>";
  }
  html+='</tr></table>';

  document.getElementById('user_'+userid).innerHTML += html;


}

parseContactsXML=function ( userid, xml, limit) {
  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';
  //var parser = new unsafeWindow.DOMParser();
  //var xml = parser.parseFromString(rxml, "application/xml");

  var entries = xml.getElementsByTagName('contact');

  if (limit=='limit') {
    if(entries.length<HOW_MANY_CONTACTS_TO_GRAB)
      var cgrab=entries.length;
    else
      var cgrab=HOW_MANY_CONTACTS_TO_GRAB;
  }
  else {
    var cgrab=entries.length;
  }
/*
  var html='';
  for(var p=0; p < cgrab; p++) {  //<entries.length (too many!!)
    var username = entries.item(p).getAttribute('username');
    var nsid=entries.item(p).getAttribute('nsid');
    var icoserv=entries.item(p).getAttribute('iconserver');
    var href = "http://flickr.com/photos/" +icoserv; 
    if(icoserv)
      var buddyicon = "http://static.flickr.com/" + icoserv + "/buddyicons/" + nsid + ".jpg";
    else
      var buddyicon = "http://www.flickr.com/images/buddyicon.jpg"
    link="<a title='" + username + "' style='text-decoration:none' href='http://flickr.com/photos/"  + nsid + "'>";
    html+="<table style='display:inline'><tr><td>" + link + "<img id='FriendBuddyIcon" + nsid + "' className='FriendBuddyIcon' height='48' width='48' src='" + buddyicon + "' alt='" + username + "'/></a></td></tr><tr><td>" + link + shortenstring(username,9) + "</a></td></tr></table>";
    //html+="<span style='display:inline'>" + link + "<img id='FriendBuddyIcon" + nsid + "' className='FriendBuddyIcon' height='48' width='48' src='" + buddyicon + "' alt='" + username + "'/></a>" + "<br>" + link + shortenstring(username,9) + "</a></span>";
  }
*/


  var html='<table style="display:inline"><tr>';
  for(var p=0; p < cgrab; p++) {  //<entries.length (too many!!)
    var username = entries.item(p).getAttribute('username');
    var nsid=entries.item(p).getAttribute('nsid');
    var icoserv=entries.item(p).getAttribute('iconserver');
    var href = "http://flickr.com/photos/" +icoserv; 
    if(icoserv)
      var buddyicon = "http://static.flickr.com/" + icoserv + "/buddyicons/" + nsid + ".jpg";
    else
      var buddyicon = "http://www.flickr.com/images/buddyicon.jpg"
    link="<a title='" + username + "' style='text-decoration:none' href='http://flickr.com/photos/"  + nsid + "'>";
    html+="<td>" + link + "<img id='FriendBuddyIcon" + nsid + "' className='FriendBuddyIcon' height='48' width='48' src='" + buddyicon + "' alt='" + encodeURIComponent(username) + "'/></a><br>" + link + shortenstring(username,9) + "</a></td>";
    //html+="<span style='display:inline'>" + link + "<img id='FriendBuddyIcon" + nsid + "' className='FriendBuddyIcon' height='48' width='48' src='" + buddyicon + "' alt='" + username + "'/></a>" + "<br>" + link + shortenstring(username,9) + "</a></span>";
  }
  html+='</tr></table>';

  document.getElementById('user_'+userid).innerHTML += html;
  
  // begin buddy menu code // commented out till we figure out the buddyicon/hover menu alignment problem 31/aug/2006
  /*
  imgs=document.getElementsByTagName('img');
  for(i=0;i<imgs.length;i++)
    if((imgs[i].getAttribute('id')) && (imgs[i].getAttribute('id').match('FriendBuddyIcon'))) {
      var bid = imgs[i].getAttribute('id').split('FriendBuddyIcon')[1];

      var img2 = document.getElementById('FriendBuddyIcon'+bid);
      img2.nsid = bid;
      imgs[i].addEventListener('mouseover',unsafeWindow.getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
      imgs[i].addEventListener('mouseout',unsafeWindow.getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);

      var id="hover_img" + bid;
      if (!document.getElementById(id)) {  
        var new_img = document.createElement("IMG");
        new_img.id = id;
        new_img.nsid = bid;
        new_img.src = imgs[i].getAttribute('src');
        new_img.className = "person_hover_img";
        document.getElementById("person_hover_link").appendChild(new_img);
        var new_img2 = document.getElementById(id);
        new_img2.nsid = bid;
        //document.getElementById('person_hover').style.position='relative';
      }
    }
    */
   // end buddy menu code
   
}

unsafeWindow.fcobark=function (text,groupid) { 

  titleinsertpoint=document.getElementById('picinfodiv_' + groupid);
  titleinsertpoint.textContent=decodeURI(text);
  titleinsertpoint.style.display='block';

}

parseXML=function ( userid, xml) {
  //<rsp stat="ok">
  //<photos page="1" pages="14" perpage="100" total="1358">
  //<photo id="59463884" owner="15189471@N00" secret="5fd0299002" server="29" title="where's the brick?" ispublic="1" isfriend="0" isfamily="0" ownername="mundaylaura" dateadded="1148124498"/>
  
  //unsafeWindow.open("http://www.google.com","nameOfWindowForReuse","scrollbars=yes,fullscreen=yes");

  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';

  // var parser = new unsafeWindow.DOMParser();
  //var xml = parser.parseFromString(rxml, "application/xml");

  var entries = xml.getElementsByTagName('photo');
  var html='';
  //unsafeWindow.arrImgSlideshow=new Array();
  for(var p=0;p<entries.length;p++) {
    var title = entries.item(p).getAttribute('title').replace('"','','g').replace("'",'','g');
    var href = "http://flickr.com/photos/" + entries.item(p).getAttribute('owner') + '/' + entries.item(p).getAttribute('id');
    //href+='/in/pool-' + groupNameID + '/';

    
    //try {
    var author = entries.item(p).getAttribute('ownername') ;
    if(!author)
      author='';
    else
      author=' by ' + author;

    var dateadded = " -&nbsp;&nbsp;&nbsp;Posted: " + unixtimetodate(entries.item(p).getAttribute('dateupload'));
    //} catch (e) 
    //    {dateadded='';} 
    var img_src = "http://static.flickr.com/" + entries.item(p).getAttribute('server') + '/' + entries.item(p).getAttribute('id') + '_' + entries.item(p).getAttribute('secret') + "_" + DEFAULT_THUMBNAIL_TYPE + ".jpg" ;
    title = '\"'+ title.replace("'",'&apos;','g').replace('"',"&quot;",'g') +'\"' + author + dateadded;
    //html += "<a href='"+href+"' title='"+title+"' target='_new'><img style=vertical-align:top;margin-top:3px;margin-bottom:3px;margin-right:3px src='"+img_src +"' border='0'/></a>";
    html += "<a href='"+href+"' target='_new'>";
    html += "<img onmouseover='this.src=this.src.replace(\"_t.jpg\",\"_m.jpg\");fcobark(\"" + encodeURI(title) + "\",\""+ userid + "\");' onmouseout='this.src=this.src.replace(\"_m.jpg\",\"_t.jpg\");fcobark(\"\",\""+ userid + "\")' style='vertical-align:top;margin-top:3px;margin-bottom:3px;margin-right:3px' src='"+img_src +"' border='0'/></a>"; //title='"+title+"'

  }
  document.getElementById('user_'+userid).innerHTML += html;
}

unsafeWindow.grabphotosfromapi=function(userid, howmanypics, username, userurl) {

  
  /*
   hostname=location.href.split('/')[2];
   apiurl="http://" + hostname + "/services/rest/?method=flickr.urls.lookupGroup&api_key=9d179414c5491bb965d03dab476a0ef8&url=http://flickr.com/groups/"+groupNameID;
   p = new XMLHttpRequest();
   p.open("GET", apiurl, false);
   p.send(null);
   if (p.responseXML) {//alert(p.responseText) 
     groupid=p.responseText.split("<group id=\"")[1].split("\"")[0];
   */
   //url = 'http://www.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=9d179414c5491bb965d03dab476a0ef8&per_page=' + HOW_MANY_IMAGES_TO_GET_FROM_API + '&group_id='+groupid;


  //http://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=582dee593a6e711374e70148a424fea5&user_id=36521957871@N01&sort=interestingness-asc&per_page=15
  
  /* 
  switch (cfilter){
    case "'Recent Photos'":
      sortmode='date-posted-desc';
      break;
    case "Most Interesting Photos":
      sortmode="interestingness-desc")
      break;
    case "Recently Favourited Photos":
      alert("It has its moments")
      break;
    default : 
      ;//alert("I\'m sure it was great");
  }
  */
/*
 if (cfilter=='Recent Photos') {
  var listener = {
    flickr_people_getPublicPhotos_onLoad: function(success, responseXML, responseText, params){
      if(success) {
        parseXML( userid, responseXML);
      }
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.people.getPublicPhotos', { user_id:userid, per_page:howmanypics } , listener);       
 }
*/

 cfilter=unsafeWindow.curf ; // GM_getValue('contactfilter','Dont show any pictures');

 if (cfilter=='Most Interesting Photos'||
    cfilter=='Least Interesting Photos'||
    cfilter=='Most Interesting Videos'||
    cfilter=='Least Interesting Videos'||
    cfilter=='Recent Photos'||
    cfilter=='Earliest Photos'||
    cfilter=='Recent Videos'||
    cfilter=='Earliest Videos'
    ) {
   if (cfilter.match('Most Interesting'))
     sortmode='interestingness-desc';
   if (cfilter.match('Least Interesting'))
     sortmode='interestingness-asc';
   if (cfilter.match('Recent'))
     sortmode='date-posted-desc';
   if (cfilter.match('Earliest'))
     sortmode='date-posted-asc';
   if (cfilter.match('Photos'))
     damedia='photo';
   else
     damedia='video';


  var listener = {
    flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
      if(success)
        parseXML( userid, responseXML );
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.photos.search', { user_id:userid, per_page:howmanypics, sort:sortmode, media:damedia, extras:'date_upload,date_taken' } , listener); //desc
 }

 else if (cfilter=='Recently Favourited Photos') {
  var listener = {
    flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
      if(success) {
        parseXML( userid, responseXML );
      }
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.favorites.getList', { user_id:userid, per_page:howmanypics, extras:'date_upload,owner_name,date_taken' } , listener);
 }

 else if ((cfilter=="Photos of yours they've faved") || (cfilter=="Photos of theirs you've faved")) {
  if (cfilter=="Photos of yours they've faved") {
    var dauser=userid;
    var ufilter=yourid;
  }
  else {
    var dauser=yourid;
    var ufilter=userid;
  }

  var listener = {
    flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
      if(success) {

        var tmpxml=document.implementation.createDocument("","photos", null);
        var entries = responseXML.getElementsByTagName('photo');
        for(var p=0;p<entries.length;p++) {
          if (entries.item(p).getAttribute('owner')==ufilter)
            tmpxml.documentElement.appendChild(entries.item(p));
        } 

        parseXML( userid,  tmpxml);//newarr.join('')
      }
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.favorites.getList', { user_id:dauser, per_page:500, extras:'date_upload' } , listener);
 }

 else if (cfilter.match('Faves you have in common')) {
   var comparefaves=function() {
         //unsafeWindow.yourfavesxml=responseText;
         var listenerb = {
           flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
           if(success)             
             //yourtotphots=unsafeWindow.yourfavesxml.split('total="')[1].split('"')[0];
             //theirtotphots=responseText.split('total="')[1].split('"')[0];
             //var commonarr=new Array();
             var tmpxml=document.implementation.createDocument("","photos", null);
             
             //var parser = new unsafeWindow.DOMParser();
             //var xml = parser.parseFromString(unsafeWindow.yourfavesxml, "application/xml");
             var entries = unsafeWindow.yourfavesxml.getElementsByTagName('photo');
             var entriesb = responseXML.getElementsByTagName('photo');

            /*
             if (yourtotphots>theirtotphots) {
               entries=theirfaves;
               entriesb=yourfaves;
             }
             else {
               entries=yourfaves;
               entriesb=theirfaves;
             }
             */

             for(var p=0;p<entries.length;p++) {
               var pid = entries.item(p).getAttribute('id');
               for(i=0; i<entriesb.length;i++) {
                 var dpid = entriesb.item(i).getAttribute('id');
                 if(pid==dpid) {
                   //commonarr.push(pid);
                   tmpxml.documentElement.appendChild(entries.item(p));
                   break;
                 }
               }
             }
             //var xmlSerializer = new XMLSerializer();
             //var markup = xmlSerializer.serializeToString(tmpxml);
             //alert(markup);
             parseXML( userid, tmpxml ); //markup
           }
         }
         unsafeWindow.F.API.callMethod('flickr.favorites.getList', { user_id:userid, per_page:500, extras:'date_upload' } , listenerb );
   }
   var listener = {
     flickr_favorites_getList_onLoad: function(success, responseXML, responseText, params){
       if(success) {
         unsafeWindow.yourfavesxml=responseXML;//responseText;
         comparefaves();    
       }
     }
   };
   if(!unsafeWindow.yourfavesxml)						
     unsafeWindow.F.API.callMethod('flickr.favorites.getList', { user_id:yourid, per_page:500, extras:'date_upload' } , listener); //desc
   else
     comparefaves();
 }

 else if (cfilter.match("Contacts you have in common")) {
   var comparefaves=function() {
         var listenerb = {
           flickr_contacts_getPublicList_onLoad: function(success, responseXML, responseText, params){
           if(success)             
             var tmpxml=document.implementation.createDocument("","contacts", null);
             var entries = unsafeWindow.yourcontactsxml.getElementsByTagName('contact');
             var entriesb = responseXML.getElementsByTagName('contact');
             for(var p=0;p<entries.length;p++) {
               var pid = entries.item(p).getAttribute('nsid');
               for(i=0; i<entriesb.length;i++) {
                 var dpid = entriesb.item(i).getAttribute('nsid');
                 if(pid==dpid) {
                   tmpxml.documentElement.appendChild(entries.item(p));
                   break;
                 }
               }
             }
             parseContactsXML( userid, tmpxml, 'nolimit');//markup
           }
         }
         unsafeWindow.F.API.callMethod('flickr.contacts.getPublicList', { user_id:userid } , listenerb );
   }
   var listener = {
     flickr_contacts_getPublicList_onLoad: function(success, responseXML, responseText, params){
       if(success) {
         unsafeWindow.yourcontactsxml=responseXML;//responseText;
         comparefaves();    
       }
     }
   };
   if(!unsafeWindow.yourcontactsxml)						
     unsafeWindow.F.API.callMethod('flickr.contacts.getPublicList', { user_id:yourid } , listener); //desc
   else
     comparefaves();
 }

 else if (cfilter.match("Their Groups")) {
  var listener = {
    flickr_people_getPublicGroups_onLoad: function(success, responseXML, responseText, params){
      if(success) {
        parseGroupsXML( userid, responseXML );
      }
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.people.getPublicGroups', { user_id:userid } , listener);
 }

 else if (cfilter.match("Groups you have in common")) {
   var comparefaves=function() {
         var listenerb = {
           flickr_people_getPublicGroups_onLoad: function(success, responseXML, responseText, params){
           if(success)             
             var tmpxml=document.implementation.createDocument("","contacts", null);
             var entries = unsafeWindow.yourgroupsxml.getElementsByTagName('group');
             var entriesb = responseXML.getElementsByTagName('group');
             for(var p=0;p<entries.length;p++) {
               var pid = entries.item(p).getAttribute('nsid');
               for(i=0; i<entriesb.length;i++) {
                 var dpid = entriesb.item(i).getAttribute('nsid');
                 if(pid==dpid) {
                   tmpxml.documentElement.appendChild(entries.item(p));
                   break;
                 }
               }
             }
             parseGroupsXML( userid, tmpxml);
           }
         }
         unsafeWindow.F.API.callMethod('flickr.people.getPublicGroups', { user_id:userid } , listenerb );
   }
   var listener = {
     flickr_people_getPublicGroups_onLoad: function(success, responseXML, responseText, params){
       if(success) {
         unsafeWindow.yourgroupsxml=responseXML;//responseText;
         comparefaves();    
       }
     }
   };
   if(!unsafeWindow.yourgroupsxml)						
     unsafeWindow.F.API.callMethod('flickr.people.getPublicGroups', { user_id:yourid } , listener); //desc
   else
     comparefaves();
 }

 else if (cfilter.match('Their Photo Tags')) {
   var listener = {
     flickr_tags_getListUserPopular_onLoad: function(success, responseXML, responseText, params){
       if(success)
         parsePhotoTagsXML( userid, responseXML );
     }
   };
  unsafeWindow.F.API.callMethod('flickr.tags.getListUserPopular', { user_id:userid,count:150 } , listener); //desc
 }

 else if (cfilter.match("Photo tags you have in common")) {
   var comparefaves=function() {
      var listenerb = {
        flickr_tags_getListUserPopular_onLoad: function(success, responseXML, responseText, params){
          if(success)             
            var tmpxml=document.implementation.createDocument("","contacts", null);
            var entries = unsafeWindow.yourphototagsxml.getElementsByTagName('tag');
            var entriesb = responseXML.getElementsByTagName('tag');
            for(var p=0;p<entries.length;p++) {
              var pid = entries.item(p).textContent;
              for(i=0; i<entriesb.length;i++) {
                var dpid = entriesb.item(i).textContent;
                if(pid==dpid) {
                  tmpxml.documentElement.appendChild(entries.item(p));
                  break;
                }
              }
            }
            parsePhotoTagsXML( userid, tmpxml);
           }
        }
        unsafeWindow.F.API.callMethod('flickr.tags.getListUserPopular', { user_id:userid,count:150 } , listenerb );
   }
   var listener = {
     flickr_tags_getListUserPopular_onLoad: function(success, responseXML, responseText, params){
       if(success) {
         unsafeWindow.yourphototagsxml=responseXML;//responseText;
         comparefaves();    
       }
     }
   };
   if(!unsafeWindow.yourphototagsxml)						
     unsafeWindow.F.API.callMethod('flickr.tags.getListUserPopular', { user_id:yourid,count:150 } , listener); //desc
   else
     comparefaves();
 }

 else if (cfilter.match('Recent comments on their photos') || cfilter.match("Photos they have commented on")) {
/*
   hps = document.createElement('script');
   hps.setAttribute('src','http://www.flickr.com/recent_comments_feed.gne?id='+ userid +'&format=json');
   document.body.appendChild(hps);
   var ctable="<table style='border:1px solid #CCCCCC'><tr>";
   var commentText='';
   unsafeWindow.jsonFlickrFeed = function(feed){
     numitems=feed.items.length;
     for(i=0;i<6;i++) { //numitems
       //alert(feed.items[i].title);
       commentText+=feed.items[i].title + '<br>';
       //commentText+=feed.items[i].link + '<br>';
       commentText+=feed.items[i].description;
       ctable+="<td width=450>"+decodeURI(commentText) +"</td>";
       if(i%2)
         ctable+="</tr><tr>";
     }
     ctable+="</tr></table>";
     //alert(decodeURI(commentText));
   }
  
   hps=null;
*/

/*
   var ctable="<table border=1 style=border-style:solid><tr>";
   for (i in unsafeWindow.jsonFlickrFeed.items) {
     //var commentText = entries[i].getElementsByTagName('content')[0].textContent;
     commentText+=i.title + '<br>';
     commentText+=i.link + '<br>';
     commentText+=i.description + '<br>';

     //alert(commentText);
     ctable+="<td width=450>"+commentText +"</td>";
     if(i%2)
       ctable+="</tr><tr>";
   }
   ctable+="</tr></table>";
  
*/

  if (cfilter.match('Recent comments on their photos'))
    var feedurl='http://api.flickr.com/services/feeds/activity.gne?id=' + userid + '&format=rss_2';
  else
    var feedurl='http://api.flickr.com/services/feeds/photos_comments.gne?user_id=' + userid + '&format=rss_2';


// http://api.flickr.com/services/feeds/activity.gne?id=36521957871@N01&format=rss_2
//http://api.flickr.com/services/feeds/photos_comments.gne?user_id=36521957871@N01&format=rss_2

window.setTimeout(function() { GM_xmlhttpRequest({
     method: 'GET',
     url: feedurl,
     headers: {
      'User-agent': 'Mozilla/Compatible - Greasemonkey - Flickr Contacts Organiser '+versionnum,
      
     },
     onload: function(responseDetails) {
       //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
       var parser = new DOMParser();
       var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
       var ctable="<table cellpadding='3' border='1' style='display:inline'><tr>"
       var entries = dom.getElementsByTagName('entry');
       if(!entries[0]) {
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';   
         return false;
        }
       if (entries.length<9)
         numentries=entries.length-1;
       else
         numentries=8;
       for (var i = numentries; i >= 0; i--) {
         var commentText = entries[i].getElementsByTagName('content')[0].textContent;
         var pdate=entries[i].getElementsByTagName('published')[0].textContent.split('T')[0];
         var arrptime=entries[i].getElementsByTagName('published')[0].textContent.split('T')[1].split('Z')[0].split(':');
         var ptime=arrptime[0]+':'+arrptime[1];
         peas=commentText.split('<p>');
         thea=peas[peas.length-1].replace('</p>','');
         if (peas[1].split('>')[1].split('<')[0]==username)  //peas[1].match(username) removed cos match didnt like * or ? in usernames
            bgcolor='style=border-color:blue;border-style:dashed';//'bgcolor=#FFFAAA';//#FFDDDD
         else if (peas[1].split('>')[1].split('<')[0]==yourusername)
            bgcolor='style=border-color:red;border-style:dashed';//'bgcolor=#FFFAAA';//#FFDDDD
         else
            bgcolor='';
         peas[1]=thea.replace(/height="[0-9]+"/,'').replace(/width="[0-9]+"/,'').replace('<img ','<img onmouseover="mouseoverthumb(this)" onmouseout="mouseoutthumb(this)" valign=bottom style="float:right;" ')+peas[1].replace('has posted a comment:','@<font size=-2> ' + ptime + ' - ' + pdate +'</font>');
         peas.splice(3,1);
         commentText=peas.join('<p>');
         ctable+="<td valign=top width=300 " + bgcolor +">"+commentText +"</td>";
         if(!(i%3))
           ctable+="</tr><tr>";
       }
       ctable+="</tr></table>";
       
       document.getElementById('user_'+userid).innerHTML+=ctable; 
       if(document.getElementById('loading_' + userid))
         document.getElementById('loading_' + userid).style.display='none';   
         
     }//end onload   Greasemonkey - Flickr Contacts Manager
    }); 
    } , 0 ); // end settimeout

/*
   hostname=location.href.split('/')[2];
   apiurl="http://" + hostname + '/recent_comments_feed.gne?id=' + userid + '&format=rss_2';//atom_03';
   p = new XMLHttpRequest();
   p.open("GET", apiurl, false);
   p.send(null);
   if (p.responseXML) {//alert(p.responseText) 
     var ctable="<table cellpadding=3 border=1 style=display:inline;border-style:solid ><tr>"
     var parser = new unsafeWindow.DOMParser();
     var dom = parser.parseFromString(p.responseText, "application/xml");
     var entries = dom.getElementsByTagName('entry');
     if(!entries[0]) {
       if(document.getElementById('loading_' + userid))
         document.getElementById('loading_' + userid).style.display='none';   
       return false;
     }
     if (entries.length<6)
       numentries=entries.length-1;
     else
       numentries=5;
     for (var i = numentries; i >= 0; i--) {
       var commentText = entries[i].getElementsByTagName('content')[0].textContent;
       var pdate=entries[i].getElementsByTagName('published')[0].textContent.split('T')[0];
       var arrptime=entries[i].getElementsByTagName('published')[0].textContent.split('T')[1].split('Z')[0].split(':');
       var ptime=arrptime[0]+':'+arrptime[1];
       peas=commentText.split('<p>');
       thea=peas[peas.length-1].replace('</p>','');
       if (peas[1].match(username))
          bgcolor='style=border-color:blue;border-style:dashed';//'bgcolor=#FFFAAA';//#FFDDDD
       else if (peas[1].match(yourusername))
          bgcolor='style=border-color:red;border-style:dashed';//'bgcolor=#FFFAAA';//#FFDDDD
       else
          bgcolor='';
       peas[1]=thea.replace('<img ','<img valign=bottom style="float:right;" ')+peas[1].replace('has posted a comment:','@<font size=-2> ' + ptime + ' - ' + pdate +'</font>');
       peas.splice(3,1);
       commentText=peas.join('<p>');
       ctable+="<td valign=top width=450 " + bgcolor +">"+commentText +"</td>";
       if(!(i%2))
         ctable+="</tr><tr>";
     }
     ctable+="</tr></table>";
   }

  document.getElementById('user_'+userid).innerHTML+=ctable; 
  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';   
*/
 }

 else if ((cfilter.match('Recent photos tagged with...')) ||
           (cfilter.match('Interesting photos tagged with...')) ||
           (cfilter.match('Recent photos of this user')) ||
           (cfilter.match('Earliest photos of this user')) ||
           (cfilter.match('Interesting photos of this user')) ||
           (cfilter.match('Least interesting photos of this user')) ||
           (cfilter.match('Recent videos of this user')) ||
           (cfilter.match('Earliest videos of this user')) ||
           (cfilter.match('Interesting videos of this user')) ||
           (cfilter.match('Least interesting videos of this user')) 
          ) {
   if(cfilter.match('photos tagged with...')) {
     searchtext=cfilter.split('...')[1];
     if(cfilter.match('Interesting')) 
       fsortmode="interestingness-desc";
     else
       fsortmode="date-taken-desc";
   }
   if ((cfilter.match('photos of this user')) || (cfilter.match('videos of this user'))) {
     searchtext="me,self,myself,selfportrait,autoportrait,flickr:user=" + encodeURIComponent(username);
   if (cfilter.match('Interesting'))
     fsortmode="interestingness-desc";
   else
     if (cfilter.match('Least interesting'))
       fsortmode="interestingness-asc";
   else
     if (cfilter.match('Earliest'))
       fsortmode="date-taken-asc";
   else
     if (cfilter.match('Recent'))
       fsortmode="date-taken-desc";
   }
   
   if(cfilter.match('photos'))
     damedia='photo';
   else
     damedia='video';
     
   var listener = {
     flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
       if(success)
         parseXML( userid, responseXML );
     }
   };
						
  unsafeWindow.F.API.callMethod('flickr.photos.search', { user_id:userid, per_page:howmanypics,tags:searchtext,sort:fsortmode,media:damedia, extras:'date_upload' } , listener); //desc

 }
 
 // this filter isnt finished
 else if ((cfilter.match('Pics of this user from others')) || (cfilter.match('Videos of this user from others'))) {
   searchtext=username + ",flickr:user=" + encodeURIComponent(username);
     //if (cfilter.match('Interesting'))
       fsortmode="interestingness-desc";
     //else
     //  fsortmode="date-taken-desc";
   if (cfilter.match('Pics'))
     damedia='photo';
   else
     damedia='video';
   
   var listener = {
     flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
       if(success){
         //strip out photos from current user
         parseXML( userid, responseXML );
       }
     }
   };
  //machine_tags:mtags,				
  unsafeWindow.F.API.callMethod('flickr.photos.search', { per_page:howmanypics,tags:searchtext,sort:fsortmode,media:damedia, extras:'date_upload' } , listener); //desc
 }


 else if (cfilter.match('Testimonials they have written')) {
   window.setTimeout(function() { 
    GM_xmlhttpRequest({
     method: 'GET',
     url: 'http://www.google.co.uk/search?q=site%3Aflickr%2Ecom%2Fpeople+%22' +username+ '+says%22',
     headers: {
      'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-GB; rv:1.8.0.6) Gecko/20060728 Firefox/1.5.0.6',
     },
     onload: function(responseDetails) {
       //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
       if (responseDetails.responseText.match('- did not match any documents')) {
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';   
       }
       else { 
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';
         //parr=responseDetails.responseText.split('<div class=g>');
         parr=responseDetails.responseText.split('<li class=g>');
         //alert(parr.length);  
         var html="<table cellpadding=3 border=1 style=display:inline;border-style:solid ><tr><td>";
         for(i=1;i<parr.length-1;i++) {
           blurb=parr[i].split('<nobr>')[0];
           html+=blurb.replace('view profile ','').replace('Flickr: ','').replace('h3','h5','g'); // +'<br style="font-size:7px"/>'
         }
       
         html+='</td></tr></table>';
         document.getElementById('user_' + userid).innerHTML+=html;
       }
        
     }//end onload   Greasemonkey - Flickr Contacts Manager
    });
   },0); // end settimeout

 }

 else if (cfilter.match('Contact Details')) {
   window.setTimeout(function() { GM_xmlhttpRequest({
     method: 'GET',
     url: 'http://www.flickr.com/people/' +userurl+ '/',
     headers: {
      'User-agent': 'Mozilla/Compatible GreaseMonkey - Flickr Contacts Organiser ' + versionnum
     },
     onload: function(responseDetails) {
       //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )

         //document.getElementById('loading_' + userid).style.display='none';   
     
         //alert(responseDetails.responseText.split('<body')[1]);
         
         if(responseDetails.responseText.match('<span class="RealName">'))
           realname=('<span class="RealName">'+ responseDetails.responseText.split('<span class="RealName">')[1].split('</span></span></span>')[0] + '</span></span></span>').replace('/ ','');
         else
           realname=''
         if(responseDetails.responseText.match('<span class="adr">')) {
           hometown='<span class="adr">' + responseDetails.responseText.split('<span class="adr">')[1].split('</span></span>')[0]+'</span></span>';
           var reg = new RegExp("<([^<>\s]*)(\s[^<>]*)?>", "g");
           hometownstripped=hometown.replace(reg,"");
           hometownpresence='<font size="-2"><a title="See this location in Google Maps" target="_blank" href="http://maps.google.com/maps?f=q&hl=en&q=' + (encodeURIComponent(hometownstripped+ ' (' + username + '\'s Home Town)')) +'">GM</a> / <a title="See this location in Google Earth" target="_blank" href="http://steeev.freehostia.com/flickr/go2ge2.php?address=' + encodeURIComponent(hometownstripped) + '&details=' + encodeURIComponent(username + "s Home Town") + '">GE</a></font>';
         }

         else
           hometown=''
         if(responseDetails.responseText.match('<td width="25%">Occupation:</td>'))
           occupation=responseDetails.responseText.split('<td width="25%">Occupation:</td>')[1].split('<td class="title">')[1].split('</td>')[0];
         else
           occupation=''

         if(responseDetails.responseText.match('" class="url" rel="me"><strong>')) {
           homepagename= responseDetails.responseText.split('" class="url" rel="me"><strong>')[1].split('<\/strong>')[0];
           homepageurlmatches= responseDetails.responseText.match('<a href="(http:\/\/[a-zA-Z0-9\.\-]+)\/*" class="url" rel="me">');
           if (homepageurlmatches && homepageurlmatches.length) {
             homepageurl= homepageurlmatches[1];
             homepage='<a target="_blank" title="' + homepageurl  + '"'  +  ' href="' + homepageurl + '">' + homepagename + '</a>';
           }
           else
             homepage=''
         }
         else {
	   homepage='';
         }      

         tmpcd=responseDetails.responseText.split('<h3>Contact</h3>')[1];
       if (tmpcd) {
         tmptab=tmpcd.split('</table>')[0];
         if(tmptab.match('<td class=\"email\">')) {
           email= tmptab.split('<td class=\"email\">')[1].split('</td>')[0].replace(' [at] ','@');
           email= '<a href="mailto:' + email +  '">' + email+ '</a>';
         }
         else
	   email='';
         //alert(tmptab);   

         if(tmptab.match("AIM ")) {
           aim=tmptab.split("AIM ")[1].split('<td>')[1].split('</td>')[0];
           aimpresence='<a href="aim:GoIM?screenname=' + aim + '"><img src="http://api.oscar.aol.com/SOA/key=ex109xps2Ozg9p9f/presence/' + aim + '" border="0"/></a>';
         }
         else {
           aim='';
           aimpresence='';
         }
         if(tmptab.match('MSN Messenger:')) {
           msn=tmptab.split('MSN Messenger:')[1].split('<td>')[1].split('</td>')[0].replace(' [at] ','@');
           msnpresence='<A HREF="technoserv.no-ip.org:8080/msn/' + msn + '"><IMG SRC="http://technoserv.no-ip.org:8080/msn/' + msn + '" align="absmiddle" border="0" ALT="MSN Online Status Indicator" onerror="this.onerror=null;this.src=\'http://technoserv.no-ip.org:8080/image/msnunknown.gif\';"></A>';
         }
         else {
           msn='';
           msnpresence='';
         }
         if(tmptab.match('Yahoo\! IM:')) {
           yim=tmptab.split('Yahoo\! IM:')[1].split('<td>')[1].split('</td>')[0];
           yimpresence='<a href="http://edit.yahoo.com/config/send_webmesg?.target=' + yim + '&.src=pg"><img border=0 src="http://opi.yahoo.com/online?u=' + yim + '&m=g&t=2&l=us"></a>';
         }
         else {
           yim='';
           yimpresence='';
         }
         if(tmptab.match('ICQ:')) {
           icq=tmptab.split('ICQ:')[1].split('<td>')[1].split('</td>')[0];
           icqpresence='<img src="http://status.icq.com/online.gif?icq=' + icq + '&img=7">';
         }
         else {
           icq='';
           icqpresence='';
         }
       }
        else
           email=yim=aim=msn=icq=yimpresence=aimpresence=icqpresence=msnpresence='';

         html='<table cellpadding="3" border="1" style="display:inline;"><tr>';//border:1px solid #CCCCCC"
         if (realname) html+='<td>Real Name</td>';
         if (email) html+='<td>Email</td>';
         if (homepage) html+='<td>Website</td>';
         if (hometown) html+='<td>Home Town</td>';
         if (occupation) html+='<td>Occupation</td>';

         if (yim) html+='<td>Yahoo! IM</td>';
         if (aim) html+='<td>AIM (AOL IM)</td>';
         if (msn) html+='<td>MSN Messenger</td>';
         if (icq) html+='<td>ICQ</td>';

         html+='</tr><tr>';

         if (realname) html+='<td>' + realname + '</td>';
         if (email) html+='<td>' + email + '</td>';
         if (homepage) html+='<td>' + homepage + '</td>';
         if (hometown) html+='<td>' + hometown + '<br>' + hometownpresence + '</td>';
         if (occupation) html+='<td>' + occupation + '</td>' ;

         if (yim) html+='<td>' + yim + '<br>' + yimpresence + '</td>';
         if (aim) html+='<td>' + aim + '<br>' + aimpresence + '</td>';
         if (msn) html+='<td>' + msn + '<br>' + msnpresence + '</td>';
         if (icq) html+='<td>' + icq + '<br>' + icqpresence + '</td>';

         html+='</tr></table>';

         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';

         document.getElementById('user_' + userid).innerHTML+=html;
        
     }//end onload   Greasemonkey - Flickr Contacts Manager
    }); 
   }, 0); // end settimeout
 }

 else if (cfilter.match('Testimonials they have received')) {
   window.setTimeout(function() { 
    GM_xmlhttpRequest({
     method: 'GET',
     url: 'http://www.flickr.com/people/' +username+ '/',
     headers: {
      //'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-GB; rv:1.8.0.6) Gecko/20060728 Firefox/1.5.0.6',
      'User-agent': 'Mozilla/Compatible GreaseMonkey - Flickr Contacts Organiser ' + versionnum
     },
     onload: function(responseDetails) {
       //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
       if (responseDetails.responseText.match("doesn\'t have any testimonials yet")) {
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';   
       }
       else { 
         //alert(responseDetails.responseText.split('<body')[1]);
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';
         parr=responseDetails.responseText.split('\<div class=\"Testi\"\>');
         //alert(parr.length);

         html='<table cellpadding=3 border=1 style=display:inline;border-style:solid ><tr>';
         for(i=0;i<parr.length-1;i++) {
           html+= '<td valign=top width=450>' + parr[i+1].split('\<br clear\=\"all\" \/\>')[0] + '</td>';
           if(i%2)
             html+="</tr><tr>";
         }
         html+='</tr></table>';
         document.getElementById('user_' + userid).innerHTML+=html;
       }
        
     }//end onload   Greasemonkey - Flickr Contacts Manager
    });
   }, 0 ); // end settimeout

 }

 else if (cfilter.match('Photos of theirs you have commented on')||cfilter.match('Photos of yours they have commented on')) {
   if (cfilter.match('Photos of theirs you have commented on')) {
     url=userurl;
     user=username;
     sayer=yourusername;
   }
   if (cfilter.match('Photos of yours they have commented on')) {
     url=youruserurl;// .split('\/')[3];
     user=yourusername;
     sayer=username;
   }
   window.setTimeout(function() { 
    GM_xmlhttpRequest({
     method: 'GET',
     url: 'http://www.google.co.uk/search?q=site%3Aflickr%2Ecom%2Fphotos%2f' + url + ' '+sayer+ '+says+-favorites',
     headers: {
      'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-GB; rv:1.8.0.6) Gecko/20060728 Firefox/1.5.0.6',
     },
     onload: function(responseDetails) {
       //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
       if (responseDetails.responseText.match('- did not match any documents')) {
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';   
       }
       else { 
         if(document.getElementById('loading_' + userid))
           document.getElementById('loading_' + userid).style.display='none';
         //parr=responseDetails.responseText.split('<div class=g>');
         parr=responseDetails.responseText.split('<li class=g>');
         //alert(parr.length);
         var html="<table cellpadding=3 border=1 style=display:inline;border-style:solid ><tr><td>";
         for(i=1;i<parr.length-1;i++) {
           blurb=parr[i].split('<nobr>')[0];
           html+=blurb.replace('view profile ','').replace('Flickr: ','').replace('h3','h5','g'); //+'<br style="font-size:7px"/>'
         }
       
         html+='</td></tr></table>';
         document.getElementById('user_' + userid).innerHTML+=html;
       }
        
     }//end onload   Greasemonkey - Flickr Contacts Manager
    });
   }, 0 ) ; //end settimeout

 }

 else if (cfilter.match('Interests you have in common') || cfilter.match('Their Interests')) {

   getlistofthings=function() {
   ;
   }

   function interestsobj(theuserid) {
   
   hostname=location.href.split('/')[2];
   apiurl="http://" + hostname + '/people/' +theuserid+ '/';
   p = new XMLHttpRequest();
   p.open("GET", apiurl, false);
   p.send(null);
   if (p.responseText) { 
     abitmore=p.responseText.indexOf('\<h3\>A bit more about');
     if(abitmore<=0)
       return;
     isithere=p.responseText.indexOf('\<table class=\"Stats\"\>',abitmore);
     if(isithere<=0)
       return;
     endoftable=p.responseText.indexOf('</table>',isithere)+8;
     wholetable=p.responseText.substr(isithere,endoftable-isithere);
     //alert(wholetable);

     var arrinterests=new Array();
     var arrbooks=new Array();
     var arrmovies=new Array(); 
     var arrmusic=new Array();
     tmpdiv=document.createElement('div');
     tmpdiv.innerHTML=wholetable.replace('<table ','<table id=tmptbl' );
     tds=tmpdiv.getElementsByTagName('td');
     for(i=0;i<tds.length-1;i++) {
        //alert(tds[i].textContent);
        if(tds[i].textContent=='Interests:') {
           theas=tds[i+1].getElementsByTagName('a');
           for(j=0;j<theas.length;j++)
             arrinterests.push(theas[j].textContent);
           i++;
        }
        if(tds[i].textContent=='Favorite Books & Authors:') {
           theas=tds[i+1].getElementsByTagName('a');
           for(j=0;j<theas.length;j++)
             arrbooks.push(theas[j].textContent);
           i++;
        }
        if(tds[i].textContent=='Favorite Movies, Stars & Directors:') {
           theas=tds[i+1].getElementsByTagName('a');
           for(j=0;j<theas.length;j++)
             arrmovies.push(theas[j].textContent);
           i++;
        }
        if(tds[i].textContent=='Favorite Music & Artists:') {
           theas=tds[i+1].getElementsByTagName('a');
           for(j=0;j<theas.length;j++)
             arrmusic.push(theas[j].textContent);
           i++;
        }
 
     } // end for loop
     //alert ("musiclist="+arrmusic.join() + '\n' + "interestslist="+arrinterests.join() + '\n' + "movieslist="+arrmovies.join() + '\n' + "bookslist="+ arrbooks.join());
     this.interests = arrinterests;
     this.books = arrbooks;
     this.movies = arrmovies;
     this.music = arrmusic;
   } // end if responsetext
   } // end object funtion
   

   var arrtmpinterests=new Array();
   var arrtmpbooks=new Array();
   var arrtmpmovies=new Array();
   var arrtmpmusic=new Array();

   var theirinterests = new interestsobj(userid);

 if ( cfilter.match('Interests you have in common') ) {
   if(!unsafeWindow.myinterests) // cache logged in users interests
     unsafeWindow.myinterests = new interestsobj(yourid);
   myinterests=unsafeWindow.myinterests;
   
   if(myinterests.interests && theirinterests.interests) {
   for(i=0;i<myinterests.interests.length;i++)
     for(j=0;j<theirinterests.interests.length;j++)
       if(myinterests.interests[i]==theirinterests.interests[j]) {
         arrtmpinterests.push("<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + myinterests.interests[i].replace(' ','+','g') + "%22>" + myinterests.interests[i] + "</a>");
         break;
       }
   }
   if(myinterests.books && theirinterests.books) {
   for(i=0;i<myinterests.books.length;i++)
     for(j=0;j<theirinterests.books.length;j++)
       if(myinterests.books[i]==theirinterests.books[j]) {
         arrtmpbooks.push("<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + myinterests.books[i].replace(' ','+','g') + "%22>" + myinterests.books[i] + "</a>");
         break;
       }
   }
   if(myinterests.movies && theirinterests.movies) {
   for(i=0;i<myinterests.movies.length;i++)
     for(j=0;j<theirinterests.movies.length;j++)
       if(myinterests.movies[i]==theirinterests.movies[j]) {
         arrtmpmovies.push("<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + myinterests.movies[i].replace(' ','+','g') + "%22>" + myinterests.movies[i] + "</a>");
         break;
       }
   }
   if(myinterests.music && theirinterests.music) {
   for(i=0;i<myinterests.music.length;i++)
     for(j=0;j<theirinterests.music.length;j++)
       if(myinterests.music[i]==theirinterests.music[j]) {
         arrtmpmusic.push("<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + myinterests.music[i].replace(' ','+','g') + "%22>" + myinterests.music[i] + "</a>");
         break;
       }
   }

 }
 else {
   arrtmpinterests=theirinterests.interests;
   if (arrtmpinterests){
    for(i=0;i<arrtmpinterests.length;i++)
      arrtmpinterests[i]="<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + arrtmpinterests[i].replace(' ','+','g') + "%22>" + arrtmpinterests[i] + "</a>";
   }

   arrtmpbooks=theirinterests.books;
   if (arrtmpbooks){
     for(i=0;i<arrtmpbooks.length;i++)
       arrtmpbooks[i]="<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + arrtmpbooks[i].replace(' ','+','g') + "%22>" + arrtmpbooks[i] + "</a>";
   }
 
   arrtmpmovies=theirinterests.movies;
   if (arrtmpmovies){ 
     for(i=0;i<arrtmpmovies.length;i++)
        arrtmpmovies[i]="<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + arrtmpmovies[i].replace(' ','+','g') + "%22>" + arrtmpmovies[i] + "</a>";
   }
   arrtmpmusic=theirinterests.music;
   if (arrtmpmusic){ 
     for(i=0;i<arrtmpmusic.length;i++)
       arrtmpmusic[i]="<a style=text-decoration:none target=_new href=http://flickr.com/search/people/?m=extras&q=%22" + arrtmpmusic[i].replace(' ','+','g') + "%22>" + arrtmpmusic[i] + "</a>";
   }
 }
   if(document.getElementById('loading_' + userid))
     document.getElementById('loading_' + userid).style.display='none';

   var html="<table cellpadding=3 border=0 style=display:inline;border-style:solid ><tr><td valign=top width=900>";
   if(arrtmpinterests) 
     html+="<b>Interests</b> " + arrtmpinterests.join(',&nbsp;')+'<p style=font-size:2px>&nbsp;</p>';
   if(arrtmpbooks) 
     html+="<b>Books</b> " + arrtmpbooks.join(',&nbsp;')+'<p style=font-size:2px>&nbsp;</p>';
   if(arrtmpmovies) 
     html+="<b>Movies</b> " + arrtmpmovies.join(',&nbsp;')+'<p style=font-size:2px>&nbsp;</p>';
   if(arrtmpmusic) 
     html+="<b>Music</b> " + arrtmpmusic.join(',&nbsp;')+'<p style=font-size:2px>&nbsp;</p>';
   html+="</td></tr></table>";
   document.getElementById('user_' + userid).innerHTML+=html;
   //yourinterests.compare(theirinterests)

 }

 else if (cfilter.match('Photos text includes...')) {
   searchtext=cfilter.split('...')[1];
   var listener = {
     flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
       if(success)
         parseXML( userid, responseXML );
     }
   };
						
  unsafeWindow.F.API.callMethod('flickr.photos.search', { user_id:userid, per_page:howmanypics,text:searchtext,sort:'interestingness-desc', extras:'date_upload' } , listener); //desc
 }

 else if (cfilter.match('Random Photos')) {
   var listener = {
     flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
       if(success) {
         totphots=responseText.split('total="')[1].split('"')[0];
         totpages=totphots/howmanypics;
         randpage=randomnumber=Math.floor(Math.random()*totpages+1);
         if(randpage==0)randpage=1;
         var listenerb = {
           flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
           if(success)
             parseXML( userid, responseXML );
           }
         }
         unsafeWindow.F.API.callMethod('flickr.photos.search', { user_id:userid, page:randpage, per_page:howmanypics, extras:'date_upload' } , listenerb );
       }
     }
   };
						
  unsafeWindow.F.API.callMethod('flickr.photos.search', { user_id:userid, per_page:1 } , listener); //desc
 }


 else if (cfilter.match("Their Sets")) {
   var listener = {
     flickr_photosets_getList_onLoad: function(success, responseXML, responseText, params){
       if(success)
         parseSetsXML( userid, responseXML, 'limit' );
     }
   };					
   unsafeWindow.F.API.callMethod('flickr.photosets.getList', { user_id:userid } , listener); //desc
 }


 else if (cfilter.match("Their Contacts")) {
   var listener = {
     flickr_contacts_getPublicList_onLoad: function(success, responseXML, responseText, params){
       if(success)
         parseContactsXML( userid, responseXML, 'limit' );
     }
   };					
   unsafeWindow.F.API.callMethod('flickr.contacts.getPublicList', { user_id:userid } , listener); //desc
 }



 else if (cfilter.match("Their Contact's Photos")) {
   var listener = {
     flickr_photos_getContactsPublicPhotos_onLoad: function(success, responseXML, responseText, params){
       if(success)
         parseXML( userid, responseXML );
     }
   };					
   unsafeWindow.F.API.callMethod('flickr.photos.getContactsPublicPhotos', { user_id:userid,single_photo:1,extras:'date_upload,owner_name' } , listener); //desc
 }
 else
   return;
}
  
  /* we dont really need this, but might need it sometime in the future (its a tab on the contacts page saying "Tagged")
  try { // cos it only works on /contacts/ pages. we are geting rid of this anyway i think
  tabmain=getElementsByClassName('Tab')[0];
  tabmain.innerHTML+=' ';
  tabcontacts=document.createElement('span');
  tabcontacts.setAttribute('class','TabIn');
  tabcontacts.innerHTML='<a href="javascript:;">Tagged</a>';
  tabmain.appendChild(tabcontacts);
  } catch (e) {;}
  */

  //if (location.href.match(/[\/photos\/friends\/|\/contacts\/]/))

  tagspan=document.createElement('span');
  tagspan.setAttribute('id','tagspanid');
  tagspan.style.fontSize='12px';
  //tagspan.style.position='relative';
  //tagspan.style.top=-60;

  /*
  if(location.href.match(/\/contacts\//)) 
    //tabmain.parentNode.insertBefore(tagspan,tabmain.nextSibling);
    document.getElementById('SubNav').parentNode.insertBefore(tagspan,document.getElementById('SubNav').nextSibling);
  */
  if(location.href.match(/\/photos\/friends\//) || location.href.match(/\/contacts\//)) {
    document.getElementById('SubNav').parentNode.insertBefore(tagspan,document.getElementById('SubNav').nextSibling);
    GM_addStyle("#Main { width: auto !important; margin-left:4px} #SubNav {margin-top:5 !important;margin-bottom:5 !important} .PeopleResults{ margin-top:5 !important}"); // go wide :) // h3.Tab {margin-top:5 !important;margin-bottom:15 !important;position:relative !important; top:-20 !important;}
    listags();
   }

 if (location.href.match(/\/contacts\/$|\/contacts$/)) { // deal with recent contacts page (shows recent photos) i.e /contacts/
   theps=getElementsByClassName('Person','p'); 
   if(theps.length) {
     for(i=0;i<theps.length;i++) {

       var thea=theps[i].getElementsByTagName('a')[0];
       var href=thea.getAttribute('href').replace(/\/photos\//,'');
       var nm=thea.textContent;
       var thenm=unsafeWindow.stripnasties(nm).replace(/^\ /,'');
       var uid=grabuserid(thea.innerHTML);
  
       var adtglink=document.createElement('a');
       adtglink.setAttribute('onclick','addtagtocontact("' + thenm + '","' + href +'"' + ',"' + uid + '");return false;');
       adtglink.setAttribute('href','javascript:;');
       adtglink.setAttribute('title','Add a tag to this contact');
       adtglink.setAttribute('class','Grey');
       adtglink.textContent='+tag';
       theps[i].appendChild(adtglink);
     }
   }
 }
 else if( location.href.match(/\/contacts\//) || location.href.match(/\/search\/people\//) ) {  // deal with normal contacts page (shows user icons)
   //GM_addStyle("h3.Tab {  margin-top:5px !important; margin-bottom:5px !important;}"); // move tabs up higher :)
   datds=document.getElementsByTagName('td');
   if(datds.length) {
     for (i=0;i<datds.length;i++) {
       if(datds[i].getAttribute('class')=='Icon') {
         thea=datds[i].getElementsByTagName('a')[0]; 
         href=thea.getAttribute('href').split('/photos/')[1];
         uid=grabuserid(datds[i].innerHTML);
         nm=datds[i+1].getElementsByTagName('h2')[0].innerHTML;
         thenm=unsafeWindow.stripnasties(nm).replace(/^\ /,'');
         theps=datds[i+1].getElementsByTagName('p');
         thep=theps[theps.length-1];

         var adtglink=document.createElement('a');
         adtglink.setAttribute('onclick','addtagtocontact("' + thenm + '","' + href +'"' + ',"' + uid + '");return false;');
         adtglink.setAttribute('href','javascript:;');
         adtglink.setAttribute('title','Add a tag to this contact');
         adtglink.setAttribute('class','Grey');
         adtglink.textContent='+tag';
         thep.appendChild(adtglink);

        //datds[i+1].getElementsByTagName('p')[0].innerHTML=makeLinks(usid)+'<br>' + datds[i+1].getElementsByTagName('p')[0].innerHTML;
       }
     }
   }
 }
 
  
  if (location.href.match('/photos/friends/')) { 
    daps=getElementsByClassName('RecentPhotos');
    for(i=0;i<daps.length;i++) {
      thea=daps[i].getElementsByTagName('a')[1]; 
      href='flickr.com' + thea.getAttribute('href');
      //uid=grabuserid(datds[i].innerHTML);
      nm=thea.textContent;
      thenm=unsafeWindow.stripnasties(nm).replace(/^\ /,'');
      //theps=datds[i+1].getElementsByTagName('p');
      //thep=theps[theps.length-1];

      var adtglink=document.createElement('a');
      adtglink.setAttribute('onclick','addtagtocontactNoId("' + thenm + '","' + href +'");return false;');
      adtglink.setAttribute('href','javascript:;');
      adtglink.setAttribute('title','Add a tag to this contact');
      adtglink.setAttribute('class','Grey');
      adtglink.textContent='+tag';
      daps[i].appendChild(adtglink);
      
    }

  }

  
  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }

  if(location.href.match(/\/people\//) && unsafeWindow.document.body.innerHTML.match("<h3>Contact<\/h3>")) {
    //attempting to add IM presence data to profile page
    /* abstracting code out into a function that uses templates
    cbling=function (xpath,ptemplate,extractrule) {
      node=$x(xpath)[0];
      if(node) {
        if(extractrule)
          thingy=eval('node.textContent'+extractrule);
        else
          thingy=node.textContent;
        thingypresence=eval(ptemplate.replace('tmptext','thingy','g'));
        node.innerHTML= thingy + ' ' + thingypresence;
      } 
        
    }
    cbling('//td[text()="Email:"]/following-sibling::td', "'<a href=\"mailto:' + email +  '\">' + email+ '</a>", ".replace(' [at] ','@')" );
    */
    
    emailnode=$x('//td[text()="Email:"]/following-sibling::td')[0]
    if(emailnode) {
       email=emailnode.textContent.replace(' [at] ','@');
       emailpresence= '<a href="mailto:' + email +  '">' + email+ '</a>';
       emailnode.innerHTML=emailpresence;
      }
    

    aimnode=$x('//td[text()="AIM (AOL IM):"]/following-sibling::td')[0]
    if(aimnode) {
       aim=aimnode.textContent;
       aimpresence= '<a href="aim:GoIM?screenname=' + aim + '"><img align="absmiddle" src="http://api.oscar.aol.com/SOA/key=ex109xps2Ozg9p9f/presence/' + aim + '" border="0"/></a>';
       aimnode.innerHTML=aim + ' ' + aimpresence;
      }

    yimnode=$x('//td[text()="Yahoo\! IM:"]/following-sibling::td')[0]
    if(yimnode) {
       yim=yimnode.textContent;
       yimpresence='<a href="http://edit.yahoo.com/config/send_webmesg?.target=' + yim + '&.src=pg"><img align="absmiddle" border=0 src="http://opi.yahoo.com/online?u=' + yim + '&m=g&t=2&l=us"></a>';
       yimnode.innerHTML=yim + ' ' + yimpresence;
      }

    msnnode=$x('//td[text()="MSN Messenger:"]/following-sibling::td')[0]
    if(msnnode) {
       msn=msnnode.textContent.replace(' [at] ','@');
       msnpresence='<a href="http://technoserv.no-ip.org:8080/msn/' + msn + '"><img src="http://technoserv.no-ip.org:8080/msn/' + msn + '" align="absmiddle" border="0" ALT="MSN Online Status Indicator" onerror="this.onerror=null;this.src=\'http://technoserv.no-ip.org:8080/image/msnunknown.gif\';"></a>';
       msnnode.innerHTML=msn + ' ' + msnpresence;
      }

    icqnode=$x('//td[text()="ICQ:"]/following-sibling::td')[0]
    if(icqnode) {
       icq=icqnode.textContent;
       icqpresence='<img align="absmiddle" src="http://status.icq.com/online.gif?icq=' + icq + '&img=7">';
       icqnode.innerHTML=msn + ' ' + icqpresence;
      }    

  } 
    

  // add menu item to person menu
  tagpersonlink=document.createElement('a');
  tagpersonlink.setAttribute('class','block');
  tagpersonlink.setAttribute('id','tag_person_link');
  tagpersonlink.setAttribute('href','javascript:;');
  tagpersonlink.setAttribute('onclick','addtagtocontactfrompersonmenu(this.parentNode.parentNode)');
  tagpersonlink.textContent='Tag this Person';

  buddymenuinpoint=document.getElementById('personmenu_contacts_link');
  if(buddymenuinpoint)
    buddymenuinpoint.parentNode.insertBefore(tagpersonlink,buddymenuinpoint.nextSibling);
  //alert('we not getting here!');



}) ();