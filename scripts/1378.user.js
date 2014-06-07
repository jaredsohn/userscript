// Flickr PM by Stephen Fernandez aka Steeev - http://steeev.freehostia.com + http://flickr.com/photos/steeev 
// with some additional code by Pedro Vieira aka ppPedro - http://flickr.com/photos/ppPedro 

// (c) 2005-2009 Stephen Fernandez - Excellatronic Communications

// Disclaimer
// ==========
// Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
// i cannot be held responsible for anything bad that happens regarding usage of this script.

// Description
// ===========
// This is a Greasemonkey (see http://www.greasespot.net for more info) user script. The script adds a icons for mail, profile, favourites, archive, flickr scout, flickr DNA and the 
// list of the users photos ordered by "interestingness" next to next to usernames in flickr forums,photo pages +
// recent_activity and photo_comments pages. It also adds a flickr mail popup function, which lets you send a flickrmail
// directly from the page where you click the mail link.

// Installation
// ============
//
// To install, you need FireFox http://www.mozilla.org/firefox
// and the firefox extension called Greasemonkey: http://www.greasespot.net/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "flickrPM", and click Uninstall.

// DONATE
// ======
// If you wish to thank me for all the hard work i have put into writing/testing/supporting this script,  
// and would like to support further updates and bug fixes, you can send me a few pounds/dollars etc
// via PayPal, my paypal donation link can be found here http://steeev.freehostia.com/donate/
 
// Whats New
// =========
// v3.72 06/03/09 added pm icons/links to contacts list page and also group admin (members/moderators) pages
// v3.71 21/02/09 script fixed to work on individual flickr mail pages
// v3.7  19/02/09 updated script to work with new site changes (contacts page, photo page, activity page) also replaced flickr leech link with flickr river link
// v3.63 15/11/08 updated INT link to point to new service provided by http://flickr.com/drayde
// v3.62 08/07/08 flickrpm mail popup no longer reports an error when sending mail if you are on international version of the site
// v3.61 06/06/08 flickrpm now works on forum search page, no longer display fpm links for deleted users, 
//                flickrmail popup now also displays users real name and location if they have them listed in their account
// v3.55 02/6/08 flickrpm now works on search pages again, and now also on the allsizes page
// v3.54 28/5/08 fixed userid getting code, for cases where user doesnt have a buddyicon
// v3.53 24/4/08 popup window doesnt scroll to top of page anymore, fixed mail popup, not displaying correctly over videos on photostream page
// v3.52 21/5/08 added link to flickr leech, fixed browser resizing issue, fixed popup window links styles, added donation link
// v3.5  14/3/08 fixed mail sending part of the code, which was broken due to GM 0.7 security update
// v3.41 20/6/07 switched flickr inspector link with a link to the new flickr dna service
// v3.4  08/6/07 optimised some of the code (using regex instead of multiple split functions)
// v3.33 02/5/07 fixed mail popup bug - clicking mail link on first poster to a thread, popped up wrong fmail address
// v3.32 21/4/07 fixed fpm to work on the new help forum, also added some excludes to stop script running on pages it doesnt need to
// v3.31 27/3/07 fixed a bug in the mail sending code, it would cut the message short if it had an ampersand in it
// v3.3 21/12/06 added fpm functionality to sent+received flickrmail messages + also to the profile page
// v3.22 8/8/06 added preview function in the mail popup 
// v3.21 31/7/06 fixed textarea width for flickrmail popup + added FPM to /contacts/ pages + /search/ pages
// v3.2 25/7/06 added FPM links to header of photostream pages
// v3.1 24/7/06 fixed minor bug, the pm toolbar is no longer displayed in recent_activity or photo_comments pages nexty to your own comments
// v3.0 21/7/06 I added FPM to recent_activity+photo_comments pages also added Flickr Mail Popup function to let you Flickr Mail users directly from the same page.
// v2.6 14/7/06 I added a link to Flickr Inspector
// v2.5 14/7/06 I added a link to Scout
// v2.41 17/5/06 I fixed bug where first post in forum didnt get the links
// v2.4 17/5/06 I fixed it for Flickr Gamma, cheers Scragz for the style tip btw!
// v2.3 16/4/06 I added a link to go to the list of the users photos ordered by Interestingness
// v2.2 17/8/05 I changed the included URLs so the script would work with the new Group URLs format
// v2.1 27/7/05 I added a new icon for users photo archive by date taken
// v2.0 09/6/05 Pedro fixed a bug and added some extra functionality (extra icons, usernames now link to photos again, removed pink popup)
// v1.4 31/5/05 I got rid of question mark link for profile, instead changed username link to goto profile.
// v1.3 29/5/05 I added a profile link
// v1.2 28/5/05 initial public release

// Credits
// =======
// Some of the table traversal code is by Kastner: http://flickr.com/photos/kastner
// Bug fix and extra functionality supplied by Pedro: http://flickr.com/photos/ppPedro
// Some of the Icons were encoded by jrhyley: http://flickr.com/photos/jrhyley
// Thanks Guys! :D


// ==UserScript==
// @name          flickrPM
// @description	  Adds icons for mail, profile, favourites, Scout, Interestingness, photo archive and "change relationship" next to usernames in forums and on individual photo pages.
// @version       3.72 6th March 2009
// @namespace     http://steeev.f2o.org/flickr/
// @author        Stephen Fernandez aka Steeev http://steeev.freehostia.com http://flickr.com/steeev with some additional code from Pedro Vieira http://flickr.com/photos/ppPedro
// @include       http://www.flickr.com/*
// @include       http://flickr.com/*
// @exclude       http://www.flickr.com/groups/
// @exclude       http://flickr.com/groups/
// @exclude       http://www.flickr.com/photos/organize*
// @exclude       http://flickr.com/photos/organize*
// ==/UserScript==

(function() {

var fpmVersion="3.72";
//var FPMStartTime=new Date();

GM_addStyle("a.fpmLink {text-decoration:none; vertical-align:middle }");

if (!document.getElementsByClassName) {
  var getElementsByClassName = function (classname,tagname) {
    if(unsafeWindow.Y.U.Dom.getElementsByClassName)
      return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
    else 
      return false;
  }
}
else {
  var getElementsByClassName = function (classname,tagname) {
    return document.getElementsByClassName(classname,tagname); //firefox 3 has this function built in
  }
   
}
 
// BEGIN Flickr Mail Popup code

unsafeWindow.FMPgrabusername = function(userid) {

  hostname=location.href.split('/')[2];
  apiurl="http://" + hostname + "/services/rest/?method=flickr.people.getInfo&api_key=9d179414c5491bb965d03dab476a0ef8&user_id="+userid;
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  if (p.responseXML) {
    //alert(p.responseText) 
    username=p.responseText.split("\<username\>")[1].split("\<\/")[0];
    if(p.responseText.match('<realname>'))
      realname=p.responseText.split("\<realname\>")[1].split("\<\/")[0];
    else
      realname='';
    if(p.responseText.match('\<location\>'))
      ulocation=p.responseText.split("\<location\>")[1].split("\<\/")[0];
    else
      ulocation='';
  }
  else
    alert('Error retrieving users name');
  return username + ':~:' + realname + ':~:' + ulocation;

}

unsafeWindow.flickrmailpopup=function (userid) {
  //alert (userid);
  username=unsafeWindow.FMPgrabusername(userid);
  unsafeWindow.dspFMPEmailForm (userid,username);
  unsafeWindow.FMPscrolltop=document.body.scrollTop;
  //scroll(0,0);
}

  pmmlink=document.getElementById('personmenu_mail_link');
  if(pmmlink)
    pmmlink.setAttribute('onclick',"flickrmailpopup(this.getAttribute('href').split('=')[1]);return false;");

if (!document.getElementById('emaildiv')) {
  emailDiv = document.createElement('div');
  emailDiv.setAttribute('id','emaildiv');
  emailDiv.style.position = 'absolute';
  emailDiv.style.overflow = 'visible';
  emailDiv.style.width = '450px';
  emailDiv.style.padding = '10px';
  emailDiv.style.margin = '4px';
  emailDiv.style.left = (1*document.body.clientWidth-450)/2 + 'px';
  emailDiv.style.display = 'none';
  emailDiv.style.border = '2px solid #000';
  emailDiv.style.background = '#ffffff';
  //emailDiv.style.zIndex = 1000;  
  GM_addStyle("#emaildiv { z-index:99999999; }");
}

unsafeWindow.FMPprocessform = function(dform,preview) { 

  unsafeWindow.FMPsendmail(dform.dauserid.value, dform.dausername.value, unsafeWindow.global_auth_hash, dform.dasubject.value, dform.damessage.value, preview);

}

unsafeWindow.dspFMPEmailForm = function (userid,username) {
  if (username.split(':~:')[1])
    realname="&nbsp;&nbsp; Real Name: <b>" + username.split(':~:')[1] + '</b> ';
  else
    realname='';
  if (username.split(':~:')[2])
    ulocation="&nbsp;&nbsp; Location: <b>" + username.split(':~:')[2] + '</b> ';
  else
    ulocation='';
  emailDiv.innerHTML = "<style>span.sfhead { font-weight:bold; font-size: x-large } span.sfhead2 {font-weight:bold; font-size: large; color:#F52887}  a.poplnk {text-decoration:none} a.poplnk:hover {color: red !important} </style><a title='Close Window' onclick='this.parentNode.style.display=\"none\";document.body.scrollTop=FMPscrolltop;return false;' href='javascript:;'><img style='float: right; position: relative; margin: 0; padding: 0; border:0px !important; vertical-align: top;' src='http://flickr.com/images/window_close_grey.gif'/></a>" +
                   "<span class='sfhead'><b>FlickrPM Mail Popup</b></span>" + " (v" + fpmVersion + ") by <b><a class='poplnk' target=_new href=http://flickr.com/photos/steeev>Steeev</a></b><p>" +
                   "<span class='sfhead2'>Send a Flickr Mail to this User</span><p>" +
                   "<form name=frmsendmess id=pmsendmessid>To: <span id='pmusernamediv'><b>" + username.split(':~:')[0] + '</b>' + realname + ulocation + "</span><br>" +
                   "<span id='prvwspan'></span>" +
                   //"<span id='sgspanid'></span>" + 
                   "<input type='hidden' name='dauserid' value=" + userid + ">" +
                   "<input type='hidden' name='dausername' value=" + encodeURIComponent(username).split("\:\~\:")[0] + ">" +
                   "<br>Subject<br><input name='dasubject' style='width:440px'  id='dasubjectPMid' tabindex='100'>" +
                   "<br>Message<br><textarea name='damessage' id='damessagePMid' style='width:440px' rows='8' tabindex='102'></textarea><br>" +
                   //"<input title='Saving the message will let you reuse it as a message template next time.' name=chksavemess type=checkbox value='true' id=chksavemessid>Save Message " +
                   "<br><p style='text-align:center;'><input onclick='FMPprocessform(this.parentNode.parentNode,\"PREVIEW\");return false;' name='btnpreviewmess' class='Butt' type='button' value='PREVIEW'> or <input onclick='FMPprocessform(this.parentNode.parentNode,\"NOPREVIEW\");return false;' name='btnsendmess' class='Butt' type='button' value='SEND' tabindex='103'></p> </form><p/>" + 
                   "<span id=mailstatusPM></span>" +
                   "<p align='center'>If you appreciate Steeev's <a class='poplnk' href='http://steeev.freehostia.com/flickr/'>Flickr GM Scripts</a>. Please make a <a class='poplnk' href='http://steeev.freehostia.com/donate'>donation</a> :)</p>" +
                   "<span><span style='float:left'><a class='poplnk' target=_new href='http://www.flickr.com/groups/flickrhacks/discuss/38788/'>Help? / Discuss</a></span><span  style='float:right'><a class='poplnk' href='javascript:;' onclick='document.getElementById(\"emaildiv\").style.display=\"none\";document.body.scrollTop=FMPscrolltop;return false;'>Close</a></span></span>";
  emailDiv.style.display='block';
  emailDiv.style.top=document.body.scrollTop;
  GM_addStyle(".Preview {border: 1px solid #ddd; background-color: #f5f5f5; padding: 10px; font-size: 12px;}");
}
if (document.getElementById('candy_nav_button_bar'))
  document.getElementById('candy_nav_button_bar').appendChild(emailDiv);
else
  document.body.appendChild(emailDiv);
 

unsafeWindow.FMPsendmail=function(userid, username, mcookie, subject, message, preview) {
   if(!subject || !message) {
     alert('Please enter a Subject and a Message before clicking Send');
     return false;
   }
   if (preview=='PREVIEW') {
     unsafeWindow.previewcode='&preview=PREVIEW';
   }
   else 
     {
     //scroll(0,0);
     // commenting the next line out is useful for debugging flickr mail manager :)
     document.getElementById('pmsendmessid').style.display='none';
     document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Sending Mail... <img src='http://flickr.com/images/pulser2.gif'/><p/>"; //"<div id='" + userid + "'><font color=blue>" + username + "</font> :</div>";
     unsafeWindow.previewcode='';
     }


///////// UPDATED: 14-3-2008 //////////////
//BEGIN post using plain old xmlhttprequest
///////////////////////////////////////////

     checkresponse = function(evt) {
       if (!unsafeWindow.previewcode) {
         if (evt.target.responseText.match('<p class="Confirm">')) //('Your message has been sent.'))
           document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Mail has been sent to <b>" + decodeURIComponent(username).split("\:\~\:")[0] +'</b><p/>';
         else {
           document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Mail send has failed<p/>";
           if(evt.target.responseText.match('Slow down, partner'))
             document.getElementById('mailstatusPM').innerHTML+="You have been blocked by this user";
         }
       }
       else {
         if (evt.target.responseText.match('<div class="Preview">')) //('<h3>Preview your message</h3>'))
           document.getElementById('prvwspan').innerHTML=evt.target.responseText.split('<div class="Preview">')[1].split('</div>')[0];
         else
           document.getElementById('prvwspan').innerHTML="<b>Preview:</b> Sorry theres been an error displaying the preview.<p/>";
       }
     } // end function checkresponse

  pdata='magic_cookie=' + mcookie + '&reply=&done=1&to_nsid=' + userid + '&subject=' + encodeURIComponent(subject) + '&message=' + encodeURIComponent(message) + unsafeWindow.previewcode;
  hostname=location.href.split('/')[2];
  req = false;
  try {
    req = new XMLHttpRequest();
  } 
  catch(e) {
    req = false;
  }

  req.onload=checkresponse; // response handler function (defined above)
  if(req) {
    req.open("POST",  'http://' + hostname + '/messages_write.gne', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    req.send(pdata);
  }
/////////////////////////////////////////
//END post using plain old xmlhttprequest
/////////////////////////////////////////

return false;
}

// END Flickr Mail Popup code


// BEGIN Flickr PM Code

/* icons copied from jrhyleys (http://www.rhyley.org/gm/FlickrMail.user.js) */
iconmail = '<img src="data:image/gif;base64,R0lGODlhDQAKAMQAAAAAAP////j4+O3t7ebm5uHh4czMzKqqqqOjo5ycnJOTk4qKioSEhHp6empqamJiYllZWf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAANAAoAQAVIYOQ4UFk6TcNEj2K8MMw8kDAMiU0oQ2GUgtzApnMBB4ebgkBIvGgIgXQ6ndVwxMGO8LsSDgqBAkHwAZMFZtmwMDxYqbh8EQkBADs=" style="float: none; margin: 0; padding: 0; border:0px !important; vertical-align: middle;" width="13" height="10">';
iconprof = '<img src="data:image/gif;base64,R0lGODlhDwAPALMAAAAAAP///+/W7t/P7c/H64+o54Ch5nCZ5GCR40CC4SBy3gBj3P///wAAAAAAAAAAACH5BAEAAAwALAAAAAAPAA8AAAQ7kMlJaxVpKWIpWqDSTRm4jJJhJqj0JcNYJHSdHAKlmvzCkr0eJaPoFU/AnWk3XChBzGQvKsk8naBWJwIAOw==" width="15" style="float: none; margin: 0; padding: 0; border:0px !important; vertical-align: middle;" height="15">';
iconfave = '<img src="data:image/gif;base64,R0lGODlhEAAPANUAAAAAAP/////e7//f79gAcKUAVv4ckv4rmfwznf86oP9Gpv9ntv7f7/7f8P3g8Ocmmfrh8cU0pbY/rfHf8Z1Nt+fc8ZdwyHphxdbU7mlqy9HT7o+X22J407XE7E541laC26e/7I226z+M4lqd5sHa9f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAQAA8AAAaewJJwWCGRJsOkMmSxjBxKJUS0eHgq0STGszBcOsrGZDwZURYHiahChoA4mXjmkUggLnJOByQhLNAICoJ/CwQRHRofBAUGCAmCCgkHhnoMISIUBAePggkEFCIhEEIYIhIHjnUHoBgDQwMjEQYHXbMST0kTIg8GBA+LBlZYQxgXBgURHh59XhivGBQFoCEdIhefrUIDGBsbIxgCAmXd2UEAOw==" style="float: none; margin: 0; padding: 0; border:0px !important; vertical-align: middle;" width="16" height="15">';
iconarch = '<img src="data:image/gif;base64,R0lGODlhDQAPAKIAAACAAIAAgP8AAAAA%2F%2F%2F%2F%2FwAAAAAAAAAAACH5BAAAAAAALAAAAAANAA8AAAMsSLrc7mOQEIgQJCpNLdbPc2USAHjKqJlo6HTsek5VXM4uw1VjR9IoX27ISAAAOw%3D%3D" style="float: none; margin: 0; padding: 0; border:0px !important; vertical-align: middle;" width="13" height="15">'
iconcont = '<b>?</b>';


  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }


/*
//attempt at optimising the function. doesnt seem to make that much difference. code is a lot clearer though

grabuserid = function(text) {
  var buddyid;
  var icontest=text.match(/\/buddyicons\/([0-9]+@N[0-9]+)\.jpg/);
  if(icontest)
    buddyid=icontest[1];
  else {
    var noicontest=text.match(/\/images\/buddyicon\.jpg\?([0-9]+@N[0-9]+)"/)
    if(noicontest)
      buddyid=noicontest[1];
  }
  return (buddyid == null) ? 'undefined' : buddyid;
}
*/

grabuserid = function(text) {
  buddyid = 'undefined';
  if (text.indexOf('buddyicon.jpg') != -1) { // no proper icon
    buddiarr = text.split('buddyicon.jpg#');
    if (buddiarr[1] != null) {
      buddyid = (buddiarr[1].split('"'))[0];
    }
  } else {
    buddiarr = text.split('/buddyicons/');
    if (buddiarr[1] != null) {
      buddyid = buddiarr[1].split('.jpg')[0];
    }
  }
  if ((buddyid == 'undefined') || (buddyid == null)) {
    buddyid = (text.split('/'))[2];
  }
  return (buddyid == null) ? 'undefined' : buddyid;
}

makeLinks = function(userid) {
  if (userid=='undefined' || userid=='l.yimg.com')
    return ' '; //[ User is no longer on Flickr ]
  
  iconlink = '[ <b>';
  iconlink += '<a onclick="flickrmailpopup(\'' + userid + '\');return false;" title="Send a Message" href="http://www.flickr.com/messages_write.gne?to=' + userid + '">' + iconmail + '</a> ';
  iconlink += '<a title="View Profile" href="http://www.flickr.com/people/' + userid + '/">' + iconprof + '</a> ';
  iconlink += '<a class="fpmLink" title="View this users photos that are featured on the Explore page via Flickr Scout" href="http://bighugelabs.com/flickr/scout.php?sort=position&year=0&username=' + userid + '">FS</a> ';
  iconlink += '<a class="fpmLink" title="View this users info + stats on Flickr DNA" href="http://bighugelabs.com/flickr/dna.php?username=' + userid + '">FD</a> ';
  iconlink += '<a class="fpmLink" title="View this users most Interesting Photos" href="http://apps.gagalabs.com/flickr/interestingby?id=' + userid + '&theme=white">INT</a> ';
  iconlink += '<a class="fpmLink" title="View this users photos on Flickr River" href="http://www.flickriver.com/photos/' + userid + '/popular-interesting/">FR</a> ';
  iconlink += '<a title="View Photo Archive" href="http://www.flickr.com/photos/' + userid + '/archives/date-taken/">' + iconarch + '</a> ';
  iconlink += '<a title="View Favourites" href="http://www.flickr.com/photos/' + userid + '/favorites/">' + iconfave + '</a> ';
  //iconlink += '<a style="text-decoration:none" title="View/Change Relationship" href="http://www.flickr.com/relationship.gne?id=' + userid + '">' + iconcont + '</a> '; // onclick="_ge(\'person_hover\').hover_add_contact(); return false;" 
  iconlink += '</b>] ';
  
  return iconlink;
}
unsafeWindow.makeLinks=makeLinks; // make the function available to other scripts too :)


/* ******************************** */

if (document.location.href.match('/photos/')) {
  if (document.location.href.match('/sizes/')) {
    datds=document.getElementsByClassName('Owner')
    usid=grabuserid(datds[0].getElementsByTagName('a')[0].innerHTML);
    datds[0].innerHTML+= ' <nobr>' + makeLinks (usid) + '</nobr>';
    return;
    
  }
  // begin Add fpm links to header of photostream pages
  dasec=getElementsByClassName("Section");
  if(dasec[0]) {
    pmsp=document.createElement('span');
    pmsp.style.position='relative';
    pmsp.style.fontWeight='normal';
    pmsp.style.fontSize= '11px';
    dah1=dasec[0].getElementsByTagName('h1')[0];
    buddyhtml=getElementsByClassName('Buddy')[0].innerHTML;
    bdid=grabuserid(buddyhtml);
    pmsp.innerHTML=makeLinks(bdid);
    dah1.appendChild(pmsp);
  }
  //end Add fpm links to header of photostream pages


  original = getElementsByClassName('Widget');
  if (original[0]) {
    originalID = grabuserid(original[0].innerHTML);
    if (originalID != 'undefined') {
      aspan=document.createElement('span');
      aspan.innerHTML=makeLinks(originalID);
      original[0].appendChild(aspan);
    }
  }

  underphotonode = document.getElementById('DiscussPhoto');
  if (!underphotonode) 
    return;
  
  cowners=getElementsByClassName('comment-owner');
  ccontents=getElementsByClassName('comment-content');
  for(x=0;x<cowners.length;x++) {
    buddyid=grabuserid(cowners[x].innerHTML);
    ccontents[x].innerHTML=ccontents[x].innerHTML.replace('says:', makeLinks(buddyid) + 'says:');
  }
  
} else if (location.href.match(/\/activity\//) || location.href.match(/recent\_activity\.gne/) || location.href.match(/photos\_comments\.gne/)) {

    // BEGIN deal with new /activity/ page
    wholist=document.getElementsByClassName('act-who');
    for(x=0;x<wholist.length;x++) {
      buddyid=grabuserid(wholist[x].innerHTML);
      if(wholist[x].parentNode.getElementsByClassName('act-content').length)
        wholist[x].parentNode.getElementsByClassName('act-content')[0].innerHTML=wholist[x].parentNode.getElementsByClassName('act-content')[0].innerHTML.replace('said:', makeLinks(buddyid) + ' ' + 'said:');
      else
        wholist[x].parentNode.innerHTML=wholist[x].parentNode.innerHTML.replace('added ', makeLinks(buddyid) + ' ' + 'added ');
    }
    // END deal with new /activity page
    
    if(location.href.match(/photos\_comments\.gne/)) {
      datds=getElementsByClassName("Who");
      for(j=0;j<datds.length;j++) {
        buddyid = grabuserid(datds[j].innerHTML);
        datds[j].innerHTML += '&nbsp;' + makeLinks(buddyid);
      }
    }
  }
  
  else if (location.href.match(/\/contacts\//)) {
  
    ciconlist=document.getElementsByClassName("contact-list-bicon");
    cnamelist=document.getElementsByClassName("contact-list-name");
    for(x=0;x<ciconlist.length;x++) {
      //console.log(x);
      usid=grabuserid(ciconlist[x].innerHTML);
      lspan=document.createElement('span');
      lspan.style.display='inline';
      lspan.innerHTML='&nbsp;&nbsp;' + makeLinks(usid);
      theeh=cnamelist[x+1].getElementsByTagName('a')[0];
      theeh.parentNode.insertBefore(lspan, theeh.nextSibling);

    }

  }
  else if (location.href.match(/flickr\.com\/help\/forum\//) || location.href.match(/flickr\.com\/groups\//)) { 
  
    if(location.href.match("\/admin\/") && document.getElementById('MemberList')) {
      dah3s=document.getElementById('MemberList').getElementsByTagName('tr');
      for(i=1;i<dah3s.length;i++) {
        usid=grabuserid(dah3s[i].getElementsByTagName('td')[0].innerHTML);
        dah3s[i].getElementsByTagName('td')[1].innerHTML=dah3s[i].getElementsByTagName('td')[1].innerHTML.replace('</a>','</a>&nbsp;&nbsp;'+makeLinks(usid));
      }
    }
  
    // we must be in a forum/group
    // add pm icon to first post (special case)
    if (document.getElementById('GoodStuff')) {
      dagoodstuff = document.getElementById('GoodStuff');
      firstpostid = grabuserid(getElementsByClassName("Who")[0].innerHTML);
      //firstpostid = grabuserid(dagoodstuff.innerHTML);
      if (firstpostid == 'undefined') 
        return;
      //dagoodstuff.getElementsByTagName('table')[0].getElementsByTagName('td')[1].getElementsByTagName('h4')[0].innerHTML = dagoodstuff.getElementsByTagName('table')[0].getElementsByTagName('td')[1].getElementsByTagName('h4')[0].innerHTML.replace('says:', makeLinks(firstpostid) + 'says:');
      getElementsByClassName('Said')[0].getElementsByTagName('h4')[0].innerHTML = getElementsByClassName('Said')[0].getElementsByTagName('h4')[0].innerHTML.replace('says:', makeLinks(firstpostid) + 'says:');
    }
    else
      return;
    // add pm icon to replies
    var tables = document.getElementsByTagName('table');
    for (i=0, l=tables.length; i<l; i++) {
      if (tables[i].className == 'TopicReply') {
        var tds = tables[i].getElementsByTagName('td');
        for (var j=0, xl=tds.length; j<xl; j++) {
          if (j%2 == 0) {
            buddyid = grabuserid(tds[j].innerHTML);
        } else {
          if (buddyid != 'undefined') {
            tds[j].getElementsByTagName('h4')[0].innerHTML = tds[j].getElementsByTagName('h4')[0].innerHTML.replace('says:', makeLinks(buddyid) + 'says:');
          }
        }
      }
    }
  }
}

  else if (location.href.match(/flickr\.com\/people/)) {
    budtd=getElementsByClassName('Buddy');
    usid=grabuserid(budtd[0].innerHTML);
    inftd=document.getElementsByTagName('h1')[0];
    inftd.innerHTML=inftd.innerHTML + " <span style='font-weight:normal;font-size:11px'>" + makeLinks(usid) + "</span>";
  }

  else if (location.href.match("messages_sent_read")) {
    dah3s=document.getElementsByTagName('h3');
    for (i=0;i<dah3s.length;i++)
      if(dah3s[i].innerHTML.match('buddyicons')){
        usid=grabuserid(dah3s[i].innerHTML);
        dah3s[i].innerHTML=dah3s[i].innerHTML+ " <span style='font-weight:normal;font-size:11px'>" + makeLinks(usid) + "</span>";
      }
  }
  else if (location.href.match("messages_read")) {
    dah3s=document.getElementsByClassName('clearfix');
    if(dah3s[0].innerHTML.match('buddyicons')){
      usid=grabuserid(dah3s[0].innerHTML);
      dah3s[0].innerHTML+= " <span style='font-weight:normal;font-size:11px'>" + makeLinks(usid) + "</span>";
      }
  }
  else if (location.href.match(/\/search\//)) {
    if(location.href.match(/\/groups\//) || location.href.match(/\/forum\//)) {
      if(!location.href.match('&m=pool')) {
        datds=document.getElementsByTagName('td');
        for (i=0;i<datds.length;i++)
          if(datds[i].getAttribute('class')=='Who') {
            usid=grabuserid(datds[i].innerHTML);
            datds[i+1].getElementsByTagName('b')[0].innerHTML=datds[i+1].getElementsByTagName('b')[0].innerHTML.replace('says:', '&nbsp;' + makeLinks(usid) + 'says:');
          }
      }
      else {      
        datds=document.getElementsByClassName('PicFrom');
        for (i=0;i<datds.length;i++) {
          usid=grabuserid(datds[i].innerHTML);
          datds[i].getElementsByTagName('b')[0].innerHTML += ' ' +makeLinks(usid);
        }
        
      }
    }
    else if (location.href.match(/\/search\/people\//)) {
      datds=document.getElementsByTagName('td');
      for (i=0;i<datds.length;i++)
        if(datds[i].getAttribute('class')=='Icon') {
          usid=grabuserid(datds[i].innerHTML);
          datds[i+1].getElementsByTagName('p')[0].innerHTML=makeLinks(usid)+'<br>' + datds[i+1].getElementsByTagName('p')[0].innerHTML;
        }
    }
    else {
      datds=getElementsByClassName('ListBuddyIconThings'); // must be a photo search...
      for (i=0;i<datds.length;i++)
        {
          usid=grabuserid(datds[i].innerHTML);
          datds[i].parentNode.getElementsByTagName('h3')[0].getElementsByTagName('small')[0].innerHTML += '&nbsp;' + makeLinks(usid);
        }
 
    }

}

//var FPMEndTime=new Date();
//var FPMExecutionTime=FPMEndTime-FPMStartTime;
//document.body.appendChild(document.createTextNode('FlickrPM Execution Time = ' + FPMExecutionTime + 'ms'));

// END Flickr PM Code

})();