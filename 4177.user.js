// ==UserScript==
// @name           Flickr Group Pool Admin - Warn + Delete
// @description    Lets admins delete images from a group pool with 1 click, also delete all users images from the pool at once + also allows you to email + optionally ban or remove a user at the same time.
// @author         Stephen Fernandez aka steeev http://steeev.freehostia.com http://flickr.com/photos/steeev/
// @version        1.74  20-Feb-2008 
// @namespace      http://steeev.f2o.org/flickr/
// @include        http://flickr.com/groups/*
// @include        http://www.flickr.com/groups/*
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

/*

 (c) 2006-2009 Stephen Fernandez - Excellatronic Communications
 
 About
 =====
 This is a GreaseMonkey script for the Flickr.com website More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html

 Disclaimer
 ==========
 Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
 i cannot be held responsible for anything bad that happens regarding usage of this script.

 Installation
 ============
 First you need firefox http://mozilla.org/firefox then you need to install GreaseMonkey http://greasemonkey.mozdev.org
 Restart your browser then revisit this script. You should now see a button in the top right hand corner, click it to install.

 DONATE
 ======
 If you wish to thank me for all the hard work i have put into writing/testing/supporting this script,  
 and would like to support further updates and bug fixes, you can send me a few pounds/dollars/euros etc
 via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/

 Release Notes
 ============
 v0.0  ????        overrides the default delete behaviour when you click the [X] below an image in a group pool, it now auto removes the image without leaving the page
 v0.7  10-Jun-2006 added [W] (warn+delete) link next to [X], when clicked it pops up a window that lets you mail the user of the image, and also lets u delete the image and kick or ban the user.
 v0.8  13-Jun-2006 added option to save sent messages as reusable templates also if you put $USERNAME$ and/or $GROUPNAME$ and/or $PICURL$ in your message template, they will be replaced with the appropriate values.
 v0.9  15-Jun-2006 added option to remove all a users images from the pool + added option to promote user (see the script can be used for positive things too :) + added new substitution variable $GROUPURL$
 v0.91 20-Jun-2006 minor bugfix: script wasnt working properly on /pool/tags/tag-x pages, this is now fixed.
 v0.92 23-Jun-2006 ban/kick/promote code fixed to accomodate recent security update. Also added link to help page.
 v0.93 30-Jun-2006 got rid of annoying alert box that says "removing image" replaced it with bomb explosion animation.
 v0.94 30-Jun-2006 fixed bug with confirm dialog if user selects promote option. also preloaded nuke animation.
 v1.00 05-Jul-2006 Added functionality for removing images from multiple group pools on individual photo pages
 v1.10 05-Jul-2006 minor functionality update
 v1.2  21-Jul-2006 compatibility update, (fixed compatibility with new flickrpm + new multigroupsender)
 v1.21 27-Jul-2006 previously it would only delete a max of 100 images when "delete all images" was selected, ive updated this to 500
 v1.23 31-Jul-2006 mainly cosmetic changes
 v1.25 08-Aug-2006 fixed handling of apostrophes in mails
 v1.3  09-Aug-2006 added a preview function for checking the mails formatting
 v1.4  06-Mar-2007 fixed kick and ban functions, removed promote function.
 v1.41 27-Mar-2007 fixed bug - ampersands in the warning-mail subject or message would cause mail to be cut short. fixed now.
 v1.42 19-Mar-2008 fixed mail sending bug. still need to fix some other bugs caused by the GM security update
 v1.7  21-May-2008 fixed bugs caused by latest GM security update, fixed bug where browser resizing would push the W+D window off the screen, added donation link :)
 v1.71 24-May-2008 fixed : screen no longer scrolls to top for the popup window
 v1.72 06-Jun-2008 fixed : w+d now works on first page of group again
 v1.73 08-Jul-2008 fixed : sending mail, no longer results in error when using international version of site
 v1.74 20-Feb-2009 fixed : removing image from pools on photo page without page refresh works again. also fixed script so it runs on first page of pool again.

 Known Issues
 ============
 Clicking [X]es too quickly one after the other on group pool pages, will leave strange results on the screen, and may mean the image wont actually be deleted. 
 Wait for the explosion animation to go away before clicking another [X]

 Credits
 =======
 thanks go to CK for his dhtml popup code+css styles, which i borrowed from his toggle recent comments script, cheers m8! :)
*/


var getElementsByClassName = function (classname,tagname) {
  //N.B tagname is optional
  return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
}

if (location.href.match(/\.com\/groups/)) {

(function() {

var wdVersion="1.74";

// start check we are on the right page
var onfirstpageofpool=0;
h3s=document.getElementsByTagName('h3');
for (i=0;i<h3s.length;i++) {
  if (h3s[i].textContent.match(/^Group Pool/))
    onfirstpageofpool=1; // first page of group contains latest images from pool and also latest discussions
}

if (!document.location.href.match("/pool/") && !onfirstpageofpool) {
  return false;
}
// end check we are on the right page

if (onfirstpageofpool)
  poollistclassname="PoolList_no_height";
else
  poollistclassname="PoolList";
  
unsafeWindow.arrgroups=[];
if (GM_getValue("savedgroups"))
   { unsafeWindow.arrgroups=GM_getValue("savedgroups").split('|'); }
   
   
// setup some globs
var wdmagiccookie=unsafeWindow.global_auth_hash;
var wdusername='';
var wduserurl='';
var wduserid='';
var wddelref='';
var wdgroupid='';
var wdgroupurl='';
var wdcontainer;
var wdgroupname='';
var wdpicid='';

// begin get groupid
wdtempstr=getElementsByClassName("xBuddyIconH","img")[0].getAttribute('src');
if (wdtempstr.match(/buddyicon\.jpg/))
  if(wdtempstr.match(/\?/))
    wdgroupid=wdtempstr.split('buddyicon.jpg\?')[1].split('\"')[0];
  else
    wdgroupid=wdtempstr.split('buddyicon.jpg\#')[1].split('\"')[0]; 
else
  wdgroupid=wdtempstr.split('\/buddyicons\/')[1].split('\.jpg')[0];
// end get groupid

unsafeWindow.delay = function(ms)
{
    date = new Date();
    curDate = null;
    do { var curDate = new Date(); }
    while ( curDate - date < ms);
}

unsafeWindow.asre=function(delref, strimgnum) {

  if (!strimgnum)
    strimgnum=' ';

  if (!wdusername)
    by=''
  else
    by='by ' + wdusername;

  //alert('Removing image' + strimgnum + by + ' from pool.');
  if(document.getElementById('deletestatus')!=undefined)
    document.getElementById('deletestatus').innerHTML+='<br><b>Delete Status:</b> Removing image' + strimgnum + by + ' from pool.';
  else
     ;// (PUT THIS BACK IN one day maybe...) alert('Removing image' + strimgnum + by + ' from pool.'); //
  //this.parentNode.removeChild(this)


  photoid=delref.split('remove=')[1].split('&magic')[0];
  var listener = {
    flickr_groups_pools_remove_onLoad: function(success, responseXML, responseText, params){
      if(success) {
        if(document.getElementById('deletestatus') && document.getElementById('deletestatus')!=undefined)
          document.getElementById('deletestatus').innerHTML+='<br><b>Delete Status:</b> Image Deleted Successfully.';
      }
      else
          //<err code="1" msg="Group not found"/>; 
          document.getElementById('deletestatus').innerHTML+='<br><b>Delete Status:</b> Image Delete Failed : ' + responseXML.documentElement.getElementsByTagName('err')[0].getAttribute('msg');
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.groups.pools.remove', { group_id:wdgroupid, photo_id:photoid } , listener);
  
  /* replaced following code, with above code
  hostname=unsafeWindow.document.location.href.split('/')[2];
  //apiurl="http://" + hostname + delref;
  photoid=delref.split('remove=')[1].split('&magic')[0];
  apiurl = "http://" + hostname + "/services/rest/?method=flickr.groups.pools.remove&api_key=9d179414c5491bb965d03dab476a0ef8" + "&auth_token=" + wdmagiccookie + "&group_id=" + wdgroupid + "&photo_id=" + photoid ;
  
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  if (p.responseText) {
    alert(p.responseText);
    if(p.responseText.match('<rsp stat="ok">'))
      if(document.getElementById('deletestatus')!=undefined)
        document.getElementById('deletestatus').innerHTML+='<br><b>Delete Status:</b> Image Deleted Successfully.';
      else
        ; // we wont bother with success message here as it should be ok //alert('Image deleted successfully');
  }
  else {
    if(document.getElementById('deletestatus')!=undefined)
      document.getElementById('deletestatus').innerHTML='<br><b>Delete Status:</b> Image Delete Failed : ' + p.responseText;
    else
      alert('Image delete failed');
    return;
  }
  */
  
return false;

}

unsafeWindow.saveMessage = function () {
  //busysignal('Saving message','start');
  document.getElementById('savestatus').innerHTML='<br><b>Save Status:</b> Saving Message...';
  document.getElementById('chksavemessid').checked=false;
  savegrouplist= document.getElementById('dasubjectid').value.replace(/\'/g,'&apos;') + "^" + document.getElementById('damessageid').value.replace(/\'/g,'&apos;');
  //if (GM_getValue("savedgroups")) {
  if (unsafeWindow.arrgroups.length) {

    var arroldsavedgroups=unsafeWindow.arrgroups; //.split('|');
    //alert(arroldsavedgroups.join('|'));
  }
  else
    var arroldsavedgroups = new Array();
  arroldsavedgroups.push(savegrouplist);
  
  //GM_setValue("savedgroups", arroldsavedgroups.join('|'));
  unsafeWindow.arrgroups = arroldsavedgroups;
  window.setTimeout(function() { GM_setValue("savedgroups",unsafeWindow.arrgroups.join('|')); }, 0);
  
  unsafeWindow.makesavedgrpsform();
  //busysignal('message saved','stop');
  document.getElementById('savestatus').innerHTML='<br><b>Save Status:</b> Message Template Saved.';
}

unsafeWindow.sfprocessform=function(dform, preview) {

  //tmps=getElementsByClassName(document,'td','Section')[0];
  tmps=getElementsByClassName('Section','td')[0];
  
  if (!location.href.match(/\/pool\/tags\//))
    wdgroupname=tmps.getElementsByTagName('h1')[0].textContent.replace(/^\s+/g, '').replace(/\s+$/g, '');
  else
    wdgroupname=tmps.getElementsByTagName('h1')[0].textContent.replace(/^\s+/g, '').replace(/\s+$/g, '').split(' \/ ')[0];
  wdgroupurl='http://www.flickr.com/groups/'+ location.href.split('\/')[4].split('\/')[0];

  wdpicid=wddelref.split('remove=')[1].split('&')[0];
  wdpicurl=wduserurl + wdpicid;

  wdsubject=dform.dasubject.value.replace('\$USERNAME\$',wdusername,'g').replace('\$GROUPNAME\$',wdgroupname,'g').replace('\$GROUPURL\$',wdgroupurl,'g').replace('\$PICURL\$',wdpicurl,'g');
  wdmessage=dform.damessage.value.replace('\$USERNAME\$',wdusername,'g').replace('\$GROUPNAME\$',wdgroupname,'g').replace('\$GROUPURL\$',wdgroupurl,'g').replace('\$PICURL\$',wdpicurl,'g');

 // .replace(/^\s+/g, '').replace(/\s+$/g, '')

 if(preview != 'PREVIEW')
   document.getElementById('sendmessid').style.display='none'; //hide the form
 else {
   wdprvwspan=document.getElementById('wdprvwspan');
   wdprvwspan.innerHTML="<br/><div class='Preview'><b>Subject:</b> " + wdsubject + "<p/>"+
                        wdmessage.replace('\n','<br/>','g') + "</div>";
   return false;
 }
   
 // process mail
 unsafeWindow.sendmail(wduserid, unsafeWindow.global_auth_hash, wdsubject, wdmessage, wdusername);

 // process deleting images
 if (dform.delimages.value=='no') 
   ; // do nuttin
 else if(dform.delimages.value=='image') {
   unsafeWindow.asre(wddelref, ' 1 of 1 ');
   wdcontainer.style.display='none';
 }
 else if(dform.delimages.value=='allimages') {
   // code to delete all images from that user
   
  var listener = {
    flickr_groups_pools_getPhotos_onLoad: function(success, responseXML, responseText, params){
      if(success) {
        var entries = responseXML.documentElement.getElementsByTagName('photo');
        if (entries.length==0) {
          alert('The user either has no images in the pool, or his images are marked as NIPSA, or they are marked private');
          return;
        }
        for(var p=0;p<entries.length;p++) {
          var id = entries.item(p).getAttribute('id');
          //alert(id + ' is ' + (p + 1) + ' of '+ entries.length);
          tmpdref=wddelref.split('=' + wdpicid + '&').join('=' + id +'&');
          tmpstrimgnum=' ' + (p + 1) + ' of '+ entries.length + ' ';
          setTimeout("asre(\'" + tmpdref + "\',\'" + tmpstrimgnum + "\')",2000*(p+1));
        }
      }
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.groups.pools.getPhotos', { group_id:wdgroupid, user_id:wduserid, per_page:500 } , listener);

  //wdais=getElementsByClassName(document, "div", "HoldPhotos")[0].getElementsByTagName('a');
  wdais=getElementsByClassName("HoldPhotos","div")[0].getElementsByTagName('a');

  for(i=0;i<wdais.length;i++)
    if(wdais[i].textContent==wdusername)
      wdais[i].parentNode.style.display='none';


  //wdusername=''; // if we do this it means the username never gets displayed, if we dont, the wrong username gets shown when we click the X if we have already clicked the W

   /* 
   replaced this code with the inbuilt flickr api calling mechanism above, which lets you make authenticated calls easier.
   hostname=unsafeWindow.document.location.href.split('/')[2];
   //as this call is non authenticated, it will not return images of users who are marked NIPSA
   apiurl="http://" + hostname + "/services/rest/?method=flickr.groups.pools.getPhotos&api_key=0e11e5d6ccbbc3901854f4777c2be1c8&group_id=" + wdgroupid + "&user_id=" + wduserid;
   //alert(apiurl);
   p = new XMLHttpRequest();
   p.open("GET", apiurl, false);
   p.send(null);
   if (p.responseText) {
     //alert(p.responseText);
     var parser = new unsafeWindow.DOMParser();
     var xml = parser.parseFromString(p.responseText, "application/xml");
     var entries = xml.getElementsByTagName('photo');
     if (entries.length==0) {
       alert('The user either has no images in the pool, or his images are marked as NIPSA, or they are marked private');
       return;
     }
     for(var p=0;p<entries.length;p++) {
        var id = entries.item(p).getAttribute('id');
        //alert(id + ' is ' + (p + 1) + ' of '+ entries.length);
        // /groups/bodylanguage/pool/?remove=167071503&magic_cookie=1f6f0b1b2f1c608038759c8c2f22a646
        unsafeWindow.asre(wddelref.split('=' + wdpicid + '&').join('=' + id +'&'), ' ' + (p + 1) + ' of '+ entries.length + ' ');
     }
   }
   else
     return;
   */
 }

 // process kick/ban
 if (dform.kickban.value=='no')
   ; // do nuttin
 else 
    if (dform.kickban.value=='promote')
      if(confirm('Are you sure you want to ' + dform.kickban.value + ' this user?'))
        unsafeWindow.kickbanuser(wduserid, wdgroupid, dform.kickban.value);
      else
        ;// do nothing return false;
 else
   unsafeWindow.kickbanuser(wduserid, wdgroupid, dform.kickban.value);

 // process saving msg if required
 if (dform.chksavemess.checked==true) {
   unsafeWindow.saveMessage();

 }
 return false;
}

unsafeWindow.deletesavedselection =function() {
  thesel=document.getElementById('selboogerid');
  if(thesel.selectedIndex==0) 
    return;
  val2del=thesel.options[thesel.selectedIndex].value;
  txt2del=thesel.options[thesel.selectedIndex].textContent;
  item2del=txt2del + '^'+ val2del;
  //alert(item2del); alert(thesel.selectedIndex);


if (unsafeWindow.arrgroups) {
    unsafeWindow.arrgroups.splice(thesel.selectedIndex-1,1);
    window.setTimeout(function() { GM_setValue("savedgroups",unsafeWindow.arrgroups.join('|')); }, 0);
  }
  thesel.options[thesel.selectedIndex]=null;

  document.getElementById('dasubjectid').value="";
  document.getElementById('damessageid').value="";
  alert('Your saved message "' + txt2del + '" has been deleted');
  return false;
}



unsafeWindow.makesavedgrpsform = function() {

  if (unsafeWindow.arrgroups) {
    savgrpsel="<select style=width:420px name='selbooger' id='selboogerid' title='You can select previously saved message templates using this select box' onchange='populatemessage()'>";
    theOption="<option value=0>Create a New Message</option>";

    for(i=0;i<unsafeWindow.arrgroups.length;i++) {
      theOption +="<option value='" + unsafeWindow.arrgroups[i].split('^')[1] +"'>" + unsafeWindow.arrgroups[i].split('^')[0] +"</option>";
    }
    
    savgrpsel+=theOption+'</select>';
    dsgbutt="&nbsp;<a href='' class='Grey' onclick='deletesavedselection(); return false;' title='Clicking this will delete the currently selected saved message'>[X]</a>";
    savgrpsel+=dsgbutt+'<br/>';
    document.getElementById('sgspanid').innerHTML=savgrpsel; 
  }
  else { // do nuttin
    return ;
  }
}

unsafeWindow.populatemessage=function() {

  //alert(wdgroupname + wdusername + wduserurl + wddelref);
  dasel=document.getElementById('selboogerid');
  if(dasel.options[dasel.selectedIndex].value==0) {
    document.getElementById('dasubjectid').value="";
    document.getElementById('damessageid').value="";
  }
  else {
    document.getElementById('dasubjectid').value=dasel.options[dasel.selectedIndex].textContent;
    document.getElementById('damessageid').value=dasel.options[dasel.selectedIndex].value;
    //alert(dasel.options[dasel.selectedIndex].value.replace(/\'/g,''));
  }
  return false;
}

unsafeWindow.kickbanuser = function(userid, groupid, action) {

  if (action=='ban') {
     thingyword='banned';
     thingymethod='flickr.groups.banMember';
  }
  if (action=='kick') {
     thingyword='removed';
     thingymethod='flickr.groups.kickMember';
  }
  if (action=='promote')
     thingyword='promoted';

  var callback = {};
  var group_nsid   = groupid;
  var user_nsid    = userid;
  var photo_remove = 0; //form.photo_remove.checked ? 1 : 0;

  callback.flickr_groups_kickMember_onLoad = function(success, responseXML, responseText, params) {
    if (success) {
        document.getElementById('useractionstatus').innerHTML='<br><b>User Status:</b> ' + wdusername + ' was successfully ' + thingyword + '.';
    } else {	
        document.getElementById('useractionstatus').innerHTML='<br><b>User Action Status: </b> ' + action + ' '  +  wdusername + ' failed. Error: ' + responseText.split('msg="')[1].split('"')[0];
    }
  }

  callback.flickr_groups_banMember_onLoad = function(success, responseXML, responseText, params) {
    if (success) {
        document.getElementById('useractionstatus').innerHTML='<br><b>User Status:</b> ' + wdusername + ' was successfully ' + thingyword + '.';
    } else {	
        document.getElementById('useractionstatus').innerHTML='<br><b>User Action Status: </b> ' + action + ' '  +  wdusername + ' failed. Error: ' + responseText.split('msg="')[1].split('"')[0];
    }
  }

  unsafeWindow.F.API.callMethod(thingymethod, {user_id: user_nsid, group_id: group_nsid, send_mail: 0, remove_photo: photo_remove }, callback);


  return;


/*
  // old code
  pdata="id="+ groupid+ "&user=" + userid + "&action="+action + "&magic_cookie=" + wdmagiccookie;
  hostname=location.href.split('/')[2];

  apiurl="http://" + hostname + "/groups_manage.gne";
  p = new XMLHttpRequest();
  p.open("POST", apiurl, false); //+'?'+pdata+'&done'+action+'=1'
  p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  p.setRequestHeader('referer', apiurl);
  p.send(pdata);
  if (p.responseText) {//alert(p.responseText) ;
     if (p.responseText.match('has been '+ thingyword))
        document.getElementById('useractionstatus').innerHTML='<br><b>User Status:</b> ' +wdusername + ' was successfully ' + thingyword + '.';
        //alert(wdusername + ' was successfully ' + thingyword);
     else
       document.getElementById('useractionstatus').innerHTML='<br><b>User Action Status: </b> ' + action + ' '  +  wdusername + ' failed.';
  }
    else
       document.getElementById('useractionstatus').innerHTML='<br><b>User Action Status: </b> ' + action + ' '  + wdusername + ' failed.';
      //alert('Error blab blab' + p.status);
  return;
*/
}



if (!document.getElementById('WADemaildivID')) {
  unsafeWindow.emailDiv = document.createElement('div');
  unsafeWindow.emailDiv.setAttribute('id','WADemaildivID');
  unsafeWindow.emailDiv.style.position = 'absolute';
  unsafeWindow.emailDiv.style.overflow = 'visible';
  unsafeWindow.emailDiv.style.width = '490px';
  unsafeWindow.emailDiv.style.padding = '10px';
  unsafeWindow.emailDiv.style.paddingRight = '0px !important';
  
  unsafeWindow.emailDiv.style.margin = '4px';
  unsafeWindow.emailDiv.style.top = '10px';
  //unsafeWindow.emailDiv.style.right = '300px';
  unsafeWindow.emailDiv.style.left = (1*document.body.clientWidth-550)/2 + 'px';

  unsafeWindow.emailDiv.style.zIndex = 21000;
  unsafeWindow.emailDiv.style.display = 'none';
  unsafeWindow.emailDiv.style.border = '2px solid #000';
  unsafeWindow.emailDiv.style.background = '#ffffff';
}

//

//<style>span.sfhead { font-weight:bold; font-size: x-large } span.sfhead2 {font-weight:bold; font-size: large; color:#F52887}  a.poplnk {text-decoration:none} a.poplnk:hover {color: red !important} </style>

unsafeWindow.dspEmailForm = function () {
  unsafeWindow.emailDiv.innerHTML="<style>span.sfhead { font-weight:bold; font-size: x-large } span.sfhead2 {font-weight:bold; font-size: large; color:#F52887} a.poplnk {text-decoration:none} a.poplnk:hover {color: red !important} </style>" +
                   "<span class='sfhead'>Group Pool Admin: Warn+Delete</span> ( v" + wdVersion +" ) by <a class='poplnk' href='/photos/steeev/'>Steeev</a><p><span class='sfhead2'>Send a message to the user who posted this picture</span></p>" +
                   "<a href='javascript:;' title='Close Window' onclick='this.parentNode.style.display=\"none\";document.body.scrollTop=wadscrolltop;return false;'><img style='float: right; position: relative; top:-77; margin: 0; padding: 0; border:0px !important; vertical-align: top;' src='http://flickr.com/images/window_close_grey.gif'/></a>" +
                   "<form name='frmsendmess' id='sendmessid'>To: <span id='wdusernamediv'></span><br>" +
                   "<span id='sgspanid'></span>" + 
                   "<span id='wdprvwspan'></span>" + 
                   "<br>Subject<br><input name='dasubject' style='width:440px' id='dasubjectid'>" +
                   "<br>Message<br><textarea name='damessage' id='damessageid' style='width:440px' rows='8'></textarea><br>" +
                   "<input title='Saving the message will let you reuse it as a message template next time.' name='chksavemess' type='checkbox' value='true' id='chksavemessid'>Save Message " +
                   "<select name='delimages'><option value='no'>Dont Delete Image<option value='image' selected>Delete Image<option value='allimages'>Delete All Images By User</select>" +
                   //"<select name=kickban><option value=no>Kick/Ban/Promote ?<option value=kick>Kick User<option value=ban>Ban User<option value=promote>Promote User</select>" +
                   "<select name='kickban'><option value='no'>Kick or Ban User?<option value='kick'>Kick User<option value='ban'>Ban User</select>" +
                   "<br><br><p style='text-align:center;'><input onclick='sfprocessform(this.parentNode.parentNode,\"PREVIEW\");return false;' name='btnpreviewmess' class='Butt' type='button' value='PREVIEW'> or <input onclick='sfprocessform(this.parentNode.parentNode,\"NOPREVIEW\"); return false;' name='btnsendmess' class='Butt' type='button' value='SEND'></p> </form><p/>" + 
                   "<span id='mailstatus'></span><span id='savestatus'></span><span id='useractionstatus'></span><span id='deletestatus'></span>" +
                   "<p align='center'>If you appreciate Steeev's <a class='poplnk' href='http://steeev.freehostia.com/flickr/'>GM Flickr Scripts</a>. Please make a <a class='poplnk' href='http://steeev.freehostia.com/donate'>donation</a> :)</p>" +
                   "<p/><span><span style='float:left'><a class='poplnk' target='_new' href='http://flickr.com/groups/flickrhacks/discuss/72157594144963684/'>Help? / Discuss</a></span><span  style='float:right'><a class='poplnk' href='' onclick='this.parentNode.parentNode.parentNode.parentNode.style.display=\"none\";document.body.scrollTop=wadscrolltop;return false;'>Close</a></span></span>";
  GM_addStyle(".Preview {border: 1px solid #ddd; background-color: #f5f5f5; padding: 10px; font-size: 12px;}");
}
document.getElementById('candy_nav_button_bar').appendChild(unsafeWindow.emailDiv);

wdmenu=document.createElement('div');
wdmenu.setAttribute('id','wdmenudiv');
wdmenu.style.position = 'relative';
//wdmenu.style.left = '-20px';
wdmenu.style.top = '15px';
wdmenu.style.overflow = 'visible';
wdmenu.style.width = '300px';
wdmenu.style.padding = '10px';
wdmenu.style.margin = '4px';
wdmenu.style.zIndex = 1000;
wdmenu.style.display = 'none';
wdmenu.style.border = '1px solid #000';
wdmenu.style.background = '#eeeeee';
//wdmenu.style.textalign='left';

thehtml='<b>*</b> <a href="" onclick="document.getElementById(\'wdmenudiv\').style.display=\'none\';asre(placeholder);this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);return false;">Just Delete the image</a><br>';
thehtml+='<b>*</b> <a href="" onclick="document.getElementById(\'wdmenudiv\').style.display=\'none\';document.getElementById(\'WADemaildivID\').style.display=\'block\';return false;">Warn + Delete</a><br>';

wdmenu.innerHTML=thehtml;

/* this function is no longer in use
unsafeWindow.asrex=function(clickedlink,delref,userurl,username) {
  //alert('Removing image from pool!');

  //alert(delref);
  //this.parentNode.removeChild(this)
  //alert(clickedlink);
  document.getElementById(clickedlink).appendChild(wdmenu);


  if(wdmenu.style.display == 'none') {

    wdmenu.innerHTML=wdmenu.innerHTML.replace('asre(placeholder)','asre(\'' + delref + '\')');
    wdmenu.style.display='block';
  }
  else {
    wdmenu.style.display='none';
  }

  return false;
}
*/


unsafeWindow.warnAndDelete=function (container, delref) {
  
  //alert(container.getElementsByTagName('a')[1].textContent + ' ' + container.getElementsByTagName('a')[1].href);
  unsafeWindow.wadscrolltop=document.body.scrollTop;
  unsafeWindow.dspEmailForm();
  document.getElementById('WADemaildivID').style.display='block';
  document.getElementById('WADemaildivID').style.top=document.body.scrollTop;

  wdusername=container.getElementsByTagName('a')[1].textContent;
  wduserurl=container.getElementsByTagName('a')[1].href;
  wduserid=unsafeWindow.WDgrabuserid(wduserurl);
  wddelref=delref;
  wdcontainer=container;
  
/*
  // get groupid
  wdtempstr=getElementsByClassName("xBuddyIconH","img")[0].getAttribute('src');
  if (wdtempstr.match(/buddyicon\.jpg/))
    if(wdtempstr.match(/\?/))
      wdgroupid=wdtempstr.split('buddyicon.jpg\?')[1].split('\"')[0];
    else
      wdgroupid=wdtempstr.split('buddyicon.jpg\#')[1].split('\"')[0]; 
  else
    wdgroupid=wdtempstr.split('\/buddyicons\/')[1].split('\.jpg')[0];
*/
  unsafeWindow.makesavedgrpsform();
  document.getElementById('wdusernamediv').innerHTML='<b>' + wdusername + '</b>';
  document.getElementById('WADemaildivID').style.display='block';
  //scroll(0,0);
  return false;
}

unsafeWindow.WDgrabuserid = function(userurl) {

  hostname=location.href.split('/')[2];
  apiurl="http://" + hostname + "/services/rest/?method=flickr.urls.lookupUser&api_key=9d179414c5491bb965d03dab476a0ef8&url="+userurl;
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  if (p.responseXML) {
    //alert(p.responseText) 
    userid=p.responseText.split("<user id=\"")[1].split("\"")[0];
  }
  else
    alert('Error retrieving userid');
  return userid

}

ps=getElementsByClassName(poollistclassname,"*");

  unsafeWindow.nukblast=document.createElement('img');
  unsafeWindow.nukblast.setAttribute('src','http://flickr.com/images/nuke.gif'); 
  //unsafeWindow.nukblast.setAttribute('width','75');
  //unsafeWindow.nukblast.setAttribute('height','75');

  unsafeWindow.wdnodcntr=0;
  unsafeWindow.wdnodstor=new Array();
  unsafeWindow.wdnodstor2=new Array();

for (i=0;i<ps.length;i++) { 
  ais=ps[i].getElementsByTagName('a');
  if (!ais[2]) // if we are not an admin in this group
     return;
  dref=ais[2].getAttribute('href');

  ais[2].setAttribute('href','');

//  ais[2].setAttribute('onclick','var thisimg=this.parentNode.getElementsByTagName(\'img\')[0];thisimg.setAttribute(\'src\',\'http://flickr.com/images/nuke.gif\');thisimg.setAttribute(\'height\',\'75\');thisimg.setAttribute(\'width\',\'75\');asre("' + dref +'");wdnodstor[++wdnodcntr]=this.parentNode.parentNode;wdnodstor2[wdnodcntr]=this.parentNode;setTimeout("wdnodstor[wdnodcntr].removeChild(wdnodstor2[wdnodcntr])",1600);return false;');//this.parentNode.parentNode.removeChild(this.parentNode);return false;');
    ais[2].setAttribute('onclick','var thisimg=this.parentNode.getElementsByTagName(\'img\')[0];thisimg.setAttribute(\'src\',\'http://flickr.com/images/nuke.gif\');thisimg.setAttribute(\'height\',\'75\');thisimg.setAttribute(\'width\',\'75\');asre("' + dref +'");wdnodstor[++wdnodcntr]=this.parentNode.parentNode;wdnodstor2[wdnodcntr]=this.parentNode;setTimeout("wdnodstor2[wdnodcntr].style.visibility=\'hidden\'",1600);return false;');


  //ais[2].setAttribute('onclick','this.parentNode.getElementsByTagName(\'img\')[0]=nukblast;nukblast.style.display=\'block\';asre("' + dref +'");wdnodstor[++wdnodcntr]=this.parentNode.parentNode;wdnodstor2[wdnodcntr]=this.parentNode;setTimeout("wdnodstor[wdnodcntr].removeChild(wdnodstor2[wdnodcntr])",1600);return false;');//this.parentNode.parentNode.removeChild(this.parentNode);return false;');


  //old style with popup menu offering choices... maybe we will bring it back one day?
  //ps[i].innerHTML+=" <span id='wd"+ i +"'> <a class='grey' href='' onclick=\"asrex(parentNode.getAttribute('id'),'" + dref +"');return false;\">[W+D]</a>";
  ps[i].innerHTML+=" <span id='wd"+ i +"'> <a title='Warn\/Kick\/Ban user + Delete Image Screen' class='grey' href='' onclick=\"warnAndDelete(this.parentNode.parentNode,'"+ dref +"');return false;\">[W]</a>";

}

unsafeWindow.sendmail=function(userid, mcookie, subject, message, username) {

   document.getElementById('mailstatus').innerHTML="<b>Mail Status:</b> Sending Mail... <img src='http://flickr.com/images/pulser2.gif'/>"; //"<div id='" + userid + "'><font color=blue>" + username + "</font> :</div>";


/////////////////////////////////////////////////////////////////////////////
/// BEGIN revert to xmlhttprequest due to security update - 19 march 2008 ///
/////////////////////////////////////////////////////////////////////////////

  checkresponse = function(evt) {
    if (evt.target.responseText.match('<p class="Confirm">'))//('Your message has been sent.'))
      document.getElementById('mailstatus').innerHTML="<b>Mail Status:</b> Mail has been sent to " + wdusername;
    else
      document.getElementById('mailstatus').innerHTML="<b>Mail Status:</b> Mail to " + wdusername + " has failed";
  }

  pdata= 'magic_cookie=' + mcookie + '&reply=&done=1&to_nsid=' + userid + '&subject=' + encodeURIComponent(subject) + '&message=' + encodeURIComponent(message)
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

///////////////////////////////////////////////////////////////////////////
/// END revert to xmlhttprequest due to security update - 19 march 2008 ///
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////
// begin old mail sending code
/*
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://www.flickr.com/messages_write.gne',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type': 'application/x-www-form-urlencoded',
      'Referer': 'http://flickr.com/messages_write.gne',
    },
    data: 'magic_cookie=' + mcookie + '&reply=&done=1&to_nsid=' + userid + '&subject=' + encodeURIComponent(subject) + '&message=' + encodeURIComponent(message) ,
    onload: function(responseDetails) {
    //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
    if (responseDetails.responseText.match('Your message has been sent.'))
      //alert('Message has been successfully sent to '+ wdusername);//document.getElementById(userid).innerHTML += ' <span class="Confirm"><b>Sent</b></span>';
      document.getElementById('mailstatus').innerHTML="<b>Mail Status:</b> Mail has been sent to " + wdusername;
    else
      document.getElementById('mailstatus').innerHTML="<b>Mail Status:</b> Mail to " + wdusername + " has failed";
      //alert('Message Send Failed');//document.getElementById(userid).innerHTML += ' <span class="Problem"><b>Failed</b></span>';
      //document.getElementById('mailstatus').innerHTML += '<br/><font color=red>Message processing complete.</font> <a href="" onclick="location.href=\'http://www.flickr.com/messages_write.gne\'">Compose a new message?</a>';
      //alert('mail processing complete!');	
    }
    });
*/
// end old mail sending code
//////////////////////////////////////////

return false;
}

})();

  }
else
  { // we are on a photo page

(function() {

unsafeWindow.dropphoto=function (delref,node) {

  parentnodeid=node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('id');
  node.parentNode.childNodes[1].style.color='red';
  node.parentNode.childNodes[1].textContent='Removing photo from '+ node.parentNode.childNodes[1].textContent;
  node.parentNode.childNodes[1].setAttribute('onclick','return false;');
  setTimeout("document.getElementById('"+ parentnodeid + "').style.display='none'",2000);

  photoid=location.href.split('/')[5];
  //alert(photoid);

  tempgid=delref.split('/')[4];
  //alert(tempgid);

  if (tempgid.match(/[0-9]+@N[0-9]+/))
    groupid=tempgid
  else {
    hostname=location.href.split('/')[2];
    apiurl="http://" + hostname + "/services/rest/?method=flickr.urls.lookupGroup&api_key=9d179414c5491bb965d03dab476a0ef8&url=" + delref;
    p = new XMLHttpRequest();
    p.open("GET", apiurl, false);
    p.send(null);
    if (p.responseXML) {//alert(p.responseText) 
      groupid=p.responseText.split("<group id=\"")[1].split("\"")[0];
    }
    else
      return;
  }

  var listener = {
    flickr_groups_pools_remove_onLoad: function(success, responseXML, responseText, params){
      if(!success)
        alert('Remove photo from group operation failed');
    }
  };
					
  unsafeWindow.F.API.callMethod('flickr.groups.pools.remove', { group_id:groupid, photo_id:photoid } , listener);       

  return false;
}// end function dropphoto

  rdiv=document.getElementById('otherContexts_div');
  if(rdiv) {
    ais=rdiv.getElementsByTagName('a');
    for (i=0;i<ais.length;i++)
      if (ais[i].getAttribute('class')=='delete-x-inline') {
        delref=ais[i].href;
        ais[i].setAttribute('onclick','dropphoto("' + delref + '", this); return false;');
      }
  }

  // if we are viewing the image via a pool page
  if (location.href.match(/\/in\/pool-/)) {
    inpooldiv=getElementsByClassName("ContextTop contextDiv","div"); 
    for (i=0;i<inpooldiv.length;i++) {
      ais=inpooldiv[i].getElementsByTagName('a');
      for (i=0;i<ais.length;i++)
        if (ais[i].textContent=='[X]') {
          delref=ais[i].href;
          ais[i].setAttribute('onclick','dropphoto("' + delref + '", this); return false;');
        }
    }
   
  }

})();

}