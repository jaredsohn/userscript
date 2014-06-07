// ==UserScript==
// @name          Flickr Groups Organiser
// @version       0.936 ( 06-Mar-2009 )
// @description	  Lets you tag and sort your groups to help you find them again more easily and also lets you quit groups more easily
// @author        Stephen Fernandez aka steeev http://steeev.freehostia.com  +  http://flickr.com/photos/steeev
// @namespace     http://steeev.f2o.org/flickr/
// @include       http://www.flickr.com/groups/
// @include       http://www.flickr.com/groups
// @include       http://flickr.com/groups/
// @include       http://flickr.com/groups
// @include       http://www.flickr.com/photos/organize*
// @include       http://flickr.com/photos/organize*
// @include       http://www.flickr.com/recent.gne*
// @include       http://flickr.com/recent.gne*
// ==/UserScript==

// (C) 2006 - 2009 Stephen Fernandez - An Excellatronic Communications Production

/* 
   DISCLAIMER
   ==========

   Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
   i cannot be held responsible for anything bad that happens regarding usage of this script.

   Installation
   ============

   This is a Greasemonkey user script.

   To install, you need FireFox  http://www.mozilla.org/firefox and the 
   firefox extension called Greasemonkey: http://www.greasespot.net/
   Install the Greasemonkey extension then restart Firefox and revisit this script.
   There should now be a button at the top of the screen saying "Install User Script".
   Click it and accept the default configuration and install.

   To uninstall, go to Tools/Manage User Scripts,
   select "Flickr Groups Organiser", and click Uninstall.

   Usage Instructions
   ==================

   if you have a lot of groups that you administer you might like those groups to move to the right hand column
   you can enable this by editing the value PUT_ADMIN_GROUPS_IN_RIGHT_COLUMN and changing it to equal 1;

   Add tags to groups by clicking the "+tags" link next to a group in the groups list, you will then be able to view
   all groups with the same tag, by clicking one of the tags in the tag list at the top of the page.
   
   To delete a tag, first select the tag you wish to delete, once you click the tag, the list of groups tagged with
   that tag will be shown, to delete the tag from one of the groups, just click the "- tag" link 

   Sorting: on the group list page, there are 2 sort modes, alpha and numeric, in alpha mode the list
   will be sorted alphabetically, and in numeric mode, they will be sorted in order of number of group members
   clicking a sort link a second time will reverse the order of the list

   Backup/Export/Imort group tags: if you go to the Tools/Greasemonkey/User Script Commands menu you will
   see there are options for backing up and restoring your group tags

   BUGLIST
   =======
   * if you quit a group via a page outside of the groups organiser interface, a tag/group synchronisation error occurs, causing certain groups to lose their tags
   * when sorting the list of groups, if 2 groups are equivalent eg same number of members or the group name (when stripped of punct) is the same,
     then only 1 of the equivalent groups gets displayed in the sorted list, the other/s get dropped off in the ether.
   * on moving the mouseover the last image in a row, the image jumps over to the other side of the page
   FIXED: when we quit a group, we also need to delete it from the tags (unless we find a way of keeping tagged groups that we are not members of)
   FIXED: adding tags to groups with names that had non ascii characters in caused the script to stop working

   TODO LIST
   =========
   DONE enhance functionality on /photos/organize/
   integrate with MGS + GPWAD
*/

// Changelog
// ---------
// v0.1   19-May-2006 - initial release
// v0.4   14-Jul-2006 - added rudimentary group tagging functionality
// v0.5   25-Jul-2006 - added ability to delete group tags + moved the quit function to a separate link
// v0.51  09-Aug-2006 - bugfix - the whole group list was disappearing when you quit a group previously
// v0.52  10-Aug-2006 - bugfix - when quitting a group, all its tags are now deleted too
// v0.53  11-Aug-2006 - added rename tag function + also added functionality to the Organize page (this part is still a bit buggy, but almost there)
// v0.54  16-Aug-2006 - added group tag functionality to Organize page
// v0.541 31-Aug-2006 - changed the way the quit group function works - it now displays "quitting group" text for 3 seconds, to give the user some feedback on the progress of the quitting process - also fixed bug (couldnt quit groups if zero tags existed - thanks EFO!)
// v0.542 08-Sep-2006 - bugfix - if the group name of the group you were added a tag to had weird UTF characters in it, it screwed up the JSON DB, meaning no tags were displayed at all, this is now fixed.
// v0.55  28-Apr-2007 - added ability to backup and restore your tags + "remove photos - when quitting group" option + ability to use unicode characters in tags
// v0.56  25-May-2007 - when adding a tag, the list of tags the group already has is displayed.
// v0.6   01-Jun-2007 - fixed a major bug where tagged groups would automatically get detagged under certain conditions, also merged my groups list sorter script into this one, and fixed the "normal" sort mode so the quit and +tag links are preserved
// v0.8   14-Jun-2007 - added group browsing ability for tagged groups (both images and discussions)
// v0.9   17-Jun-2007 - added search text and search tags filters
// v0.91  17-Jun-2008 - fixed script for latest version of GM + FF
//                      added a "show quit links" function, that only shows the quit links if you click the "show quit links" link at the top of the page
// v0.921 17-Jun-2008 - added tagged group functionality to the groups recent changes page, so u can now see recent changes in your tagged groups
// v0.934 27-Jun-2008 - added select box on recent changes page that lets you view the tagged groups by different time frames
//                      finally fixed bug where if you werent a member of a group but had a tag for that group, it would detag all the remaining groups under that tag
// v0.935 04-Mar-2009 - various minor changes. also restored show quit links link to right place after site update
// v0.936 06-Mar-2009 - added auto alphabetic sorting of group tags

var versionnum='v0.936';
var HOW_MANY_PICs_TO_GRAB=8;

tagval=GM_getValue('grouptags','');
if (tagval) {
  try {
    unsafeWindow.tagsobject = unsafeWindow.JSON.parse(tagval);
  }
  catch(e){ 
    GM_log('[initialisation] - error parsing json string ');
  }
}
else
  unsafeWindow.tagsobject=[];

goReadData = function () {
   return unsafeWindow.tagsobject;
}

goSaveData = function (tagsoserial,mode) {
  if(mode && (mode=='reset')) {
    unsafeWindow.tagsobject =null;
  }
  else{
    try {
      var tmptagsobject = unsafeWindow.JSON.parse(tagsoserial);
    }
    catch(e){ 
      GM_log('Flickr Groups Organiser GM Script: error parsing json string in goSaveData function');
      alert('Error saving tags object');
      return;
    }
    unsafeWindow.tagsobject = unsafeWindow.JSON.parse(tagsoserial);
  } 
  
  window.setTimeout(function() { GM_setValue ('grouptags', tagsoserial); }, 0 );
}


scriptTimer=function () {
  var startTime, endTime, executionTime;
  this.startTime=new Date();

  this.stopTimer = function() {
    this.endTime=new Date();
  }
  this.executionTime =function() {
    return this.endTime-this.startTime;
  }
}

sTimer=new scriptTimer();

// change the following value to 1 if you want the groups you administer to move to the right hand column
PUT_ADMIN_GROUPS_IN_RIGHT_COLUMN=0;
mailbackupsubject="Flickr Groups Organiser Tags Backup System";

  var SEP1   = "\xAC"; //proper separator !!! 
  var BADSEP = "\xFD"; //bad separator

//GM_setValue('grouptags',''); // uncomment this line to delete all tags, load the page then recomment the line


  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }

/////////////////////////////////////////////
// BEGIN GROUPS LIST SORTER function
/////////////////////////////////////////////
if (location.href.match(/flickr.com\/groups/))
(function() {

alphasorttoggle=0;
numericsorttoggle=1;

// find the list content + make a backup
contentinsertpoint=$x("//td[@class='List']")[0];

GM_addStyle('.QuitLink { display : none}');
/*
tds=document.getElementsByTagName('td');
for (i=0;i<tds.length-1;i++)
  if (tds[i].getAttribute('class')=="List") {
    contentinsertpoint=tds[i];

    //grouplistbackup=tds[i].innerHTML;
    //tmplidiv=document.createElement('div');
    //tmplidiv.innerHTML=grouplistbackup;

    break;
  }
*/
sortlink="<b>Sort: </b> <a href='' onclick='sortgroups(\"Alpha\");return false;'>Alpha</a>" +
         " | <A onclick='sortgroups(\"Numeric\");return false;' href=''>Numeric</a>" +
         " | <A onclick='listnormalise();return false;' href=''>Normal</a>&nbsp;&nbsp;";

sf_insertpoint=document.getElementById('Main').getElementsByTagName('td')[1];

sortlinkdiv=document.createElement('span');
sortlinkdiv.setAttribute('id','sortlinkdiv');
sortlinkdiv.innerHTML=sortlink;

sf_insertpoint.appendChild(sortlinkdiv);

unsafeWindow.listnormalise = function() {
  contentinsertpoint.innerHTML=unsafeWindow.grouplistbackupdiv.innerHTML;
  alphasorttoggle=0;
  numericsorttoggle=1;
  return false;
}

unsafeWindow.sortgroups=function(mode) {

  document.getElementById('sortlinkdiv').innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='http://flickr.com/images/pulser2.gif'/> <b>Sorting ......</b>&nbsp;";

  var allpeas=contentinsertpoint.getElementsByTagName('li');
  var peasarr = new Array();

  //newwindow2=window.open('','name','height=700,width=200');
  for(a=0;a<allpeas.length;a++) { 

    if (mode=='Alpha') {
      //tstr=allpeas[a].getElementsByTagName('a')[0].textContent.replace(/[\" \*\.\:,!#\$\/\?'\{\}\(\)\[\]_\-\\]/g, '');
      // if you need sorting on a non english character set, comment the next line out, and uncomment above line.
      tstr=allpeas[a].getElementsByTagName('a')[0].textContent.replace(/[ ]|[^a-zA-Z0-9]+/g,''); 
      //alert(allpeas[a].getElementsByTagName('a')[0].textContent.replace(/[ ]|[^a-zA-Z0-9]+/g,''));
    }
    if (mode=='Numeric') {
      tstr=allpeas[a].getElementsByTagName('small')[0].innerHTML.replace(/[^\d]/g,'');
      //if(a<3) alert(allpeas[a].getElementsByTagName('small')[0].innerHTML.replace(/[^\d]/g,'')); // test if we are getting the correct results
    }

    eval("peasarr[\"" + tstr + "\"]=allpeas[a]");

    //var tmp = newwindow2.document;
    //tmp.write(tstr);//allpeas[a].getElementsByTagName('a')[0].textContent + '<Br>');
    }

    //tmp.close();

// the following line hides the dirty secret (bug) that groups that have equal names after the punctuation is stripped out
// or equal number of members dont get added to the sort list, oops ;-)

contentinsertpoint.innerHTML=""; // blank debris ;-)
 
//////////////////////////
// BEGIN sorting code
  var sorted = new Array();
  var num = 0;
  var tmp = new Array();
  for (i in peasarr) {
    tmp[num++] = i + "|" + peasarr[i];
  }
  tmp = tmp.sort(eval(mode));
  
  if (mode=='Alpha') {
    if (alphasorttoggle) {
      tmp.reverse();
      alphasorttoggle=0;
    }
    else
      alphasorttoggle=1;
    }
  if (mode=='Numeric') {
    if (numericsorttoggle) {
      tmp.reverse();
      numericsorttoggle=0;
    }
    else
      numericsorttoggle=1;
    }
  for (i = 0; i < tmp.length; i++)
   {
     x = tmp[i].split("|");
     //alert(x[0] + ' is ' + x[1])
     sorted[x[0]] = x[1];
   }

//END sorting code
///////////////////////

  
  sortlinkdiv.innerHTML=sortlink;
  //sf_insertpoint.appendChild(sortlinkdiv); //put the sort link back in 
  
  ulu=document.createElement('ul');
  ulu.setAttribute('class','GroupsListing');
  contentinsertpoint.appendChild(ulu);

  for(pea in sorted) { 
   try {
    ulu.appendChild(peasarr[pea]); 
    }
   catch ( e ) {

   //alert ( e );
   ; // dunno whats causing the error, but ignoring it seems to work ok
   } 
  }

  return false;
}

function Alpha(a, b) {
  var x = a.toLowerCase();
  var y = b.toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function Numeric(a, b) {
  var x = parseInt(a.split('|')[0].replace(/[\(\)]/,''));
  var y = parseInt(b.split('|')[0].replace(/[\(\)]/,'')); 
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

})();

/////////////////////////////////////////////////////
//END GROUPS LIST SORTER function
/////////////////////////////////////////////////////

var getElementsByClassName = function (classname,tagname) {
  //N.B tagname is optional
  return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
  //return unsafeWindow.document.getElementsByClass(classname,tagname)
}

unsafeWindow.stripnasties = function (string) {
  string=string.replace(/[\'\"]/g,'');//.replace('\'','','g'); // strip out nasties
  return string;
}

fixCorruptedDatastore = function() {
  tmpstore=GM_getValue("grouptags");
  tmpstore=tmpstore.replace(BADSEP,SEP1,'g');
  
  //GM_setValue("grouptags",tmpstore);
  window.setTimeout(function() { GM_setValue("grouptags",tmpstore); }, 0);
  //goSaveData(tmpstore);
  
  alert('fingers crossed, the datastore should be fixed now!');
}

unsafeWindow.FGOsendmail=function(userid, mcookie, subject, message) {
   if(!subject || !message || !userid || !mcookie ) {
     alert('Error storing FGO tags data!');
     return false;
   }
   
  //alert(location.href.split('/')[2]);
  window.setTimeout(function() { GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://www.flickr.com/messages_write.gne',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey (Flickr Groups Organiser) ' + versionnum,
      'Content-type': 'application/x-www-form-urlencoded',
      'Referer': 'http://flickr.com/messages_write.gne',
    },
    data: 'magic_cookie=' + mcookie + '&reply=&done=1&to_nsid=' + userid + '&subject=' + subject + '&message=' + message ,
    onload: function(responseDetails) {
    //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
        if (responseDetails.responseText.match('Your message has been sent.'))
          alert('Flickr Group Organiser Tags have successfully been backed up to your flickr mailbox'); // document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Mail has been sent to " + username +'<p/>';
        else
          alert('Flickr Group Organiser Tags backup to flickr mailbox has failed'); // document.getElementById('mailstatusPM').innerHTML="<b>Mail Status:</b> Mail send has failed<p/>";
      }
    });
    },0);
    
return false;
}

FGObackuptags=function() {
  //tagval=GM_getValue('grouptags','');
  if (unsafeWindow.tagsobject)
    unsafeWindow.FGOsendmail ( unsafeWindow.global_nsid, unsafeWindow.global_auth_hash,'Flickr Groups Organiser Tags Backup System', encodeURIComponent(unsafeWindow.JSON.stringify(unsafeWindow.tagsobject)));
}

GM_registerMenuCommand("Flickr Groups Organiser: Backup Tags to Flickrmail DataStore", FGObackuptags);

FGOrestoretagsfromflickrmail=function() {
  restoredivexists=0;
  if(document.getElementById('restorediv')) {
    restorediv=document.getElementById('restorediv');
    restoredivexists=1
  }
  else
    restorediv=document.createElement('div');
  restorediv.innerHTML='<br><b>The following Flickr Groups Organiser tag backups are availble in your FlickrMail datastore</b><p/>';
  restorediv.setAttribute('id','restorediv');
  //grab the first flickrmail page http://flickr.com/messages.gne?ok=1
  apiurl='http://' + location.hostname + "/messages.gne?ok=1";
  //alert(apiurl);
  procinbox=function (evt) {

    content = evt.target.responseText;     
    tableinnards=content.split('<table id="InBox" cellspacing="0" width="100%">')[1].split('\<\/table\>')[0];
    tmptable=document.createElement('table');
    tmptable.innerHTML=tableinnards;
    //alert(tableinnards);
    tmpas=tmptable.getElementsByTagName('td');
    for(i=0;i<tmpas.length;i++)
      if(tmpas[i].innerHTML.match('\>Flickr Groups Organiser Tags Backup System\<\/a\>')) {
        restorediv.innerHTML+= "Backup by: <b>" + tmpas[i-1].innerHTML + '</b> on ';
        restorediv.innerHTML+= tmpas[i+1].innerHTML + ' ';
        backupid=tmpas[i].innerHTML.split('\?id\=')[1].split('\"')[0];
        viewbackuplink="<A target=new href=http://flickr.com/messages_read.gne?id=" + backupid + ">View</a>"
        restorebackuplink="<A href='javascript:fgorestorebackupfrommail(\"" + backupid + "\");'>Restore</a>"
        restorediv.innerHTML+= viewbackuplink + ' | ' + restorebackuplink;
        restorediv.innerHTML+='<br/>';
      }
    restorediv.innerHTML+='<br>';
    
    //if(document.getElementById('tagslist');
    if(!restoredivexists) {
      tmpnavbar=document.getElementById('tagslist');//SubNav');
      if (tmpnavbar) 
        tmpnavbar.parentNode.insertBefore(restorediv, tmpnavbar);
    }
  } // end procinbox function
  
  request = new XMLHttpRequest();
  if (request) {
    request.open("GET", apiurl, true);
    request.onload=procinbox;
    request.send(null);
   }
}

unsafeWindow.fgorestorebackupfrommail = function(backupid) {

 request = new XMLHttpRequest();
  if (request) {
    request.open("GET", "http://flickr.com/messages_read.gne?id=" + backupid, false);
    request.setRequestHeader('User-Agent', 'Greasemonkey - Flickr Groups Organiser ' + versionnum);
    request.setRequestHeader('Referer', 'http://flickr.com/messages.gne?ok=1');
    request.setRequestHeader('Cookie', document.cookie);
    request.send(null);
    if (request.status == 200) {
      content = request.responseText;
      //alert(content);
      tmptags= '{' + content.split("\<p\>\{")[1].split("\}\<\/p\>")[0] + '}'; // grab the JSON packet

      tmptags=tmptags.replace('&quot;','"','g');
      tmptags=tmptags.replace('&amp;',"\x26",'g'); //replace ampersand with hex version
      //alert(tmptags);//encodeURIComponent
      //unsafeWindow.writeConsole(tmptags);
      
      goSaveData(tmptags);
      /*
      try {
        var tmptagsobject = unsafeWindow.JSON.parse(tmptags);
      }
      catch(e){ 
        GM_log('Flickr Groups Organiser GM Script: error parsing json string in FGOrestoretags function');
        alert('Data is in incorrect format');
        return;
      }
      tmptagsobject=null;
      window.setTimeout(function() { GM_setValue("grouptags",tmptags); }, 0);
      */
      tmptags=null;
      document.getElementById('restorediv').style.display='none';
      listags();
 
      //alert(backupid);
      alert('Flickr Groups Organiser Tags Datastore has been restored');
    }
  }  
}

GM_registerMenuCommand("Flickr Groups Organiser: Restore Tags from Flickrmail DataStore", FGOrestoretagsfromflickrmail);

unsafeWindow.dspdatastore = function () {
  /*tagval=GM_getValue('grouptags','');
  if (tagval)
    unsafeWindow.writeConsole(tagval);
  */
  if (unsafeWindow.tagsobject)
    //alert(unsafeWindow.tagsobject.length);
    unsafeWindow.writeConsole(unsafeWindow.JSON.stringify(unsafeWindow.tagsobject));
}

GM_registerMenuCommand("Flickr Groups Organiser: Display group tags Datastore", unsafeWindow.dspdatastore);

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

FGOrestoretags=function() {
  var tmptags=prompt('Enter the Flickr Groups Organiser Tags Datastore you wish to restore');
  
  goSaveData(tmptags);
  /*
  try {
    var tmptagsobject = unsafeWindow.JSON.parse(tmptags);
  }
  catch(e){ 
    GM_log('Flickr Groups Organiser GM Script: error parsing json string in FGOrestoretags function');
    alert('Data is in incorrect format');
    return;

  }
  tmptagsobject=null;
  //GM_setValue('grouptags',tmptags);
  window.setTimeout(function() { GM_setValue("grouptags",tmptags); }, 0);
  */
  listags();
  alert('Flickr Groups Organiser Tags Datastore has been restored');
}

GM_registerMenuCommand("Flickr Groups Organiser: Restore Tags via direct input", FGOrestoretags);

FGOresetgrouptags = function () {
  if(confirm("Do you want to completely reset the groups organiser tags?\n You cant get them back once they are gone!"))
    //GM_setValue('grouptags','');
    goSaveData('','reset');
    //window.setTimeout(function() { GM_setValue("grouptags",''); }, 0);
  else
    return;
}
// commenting out this command for now, as people might accidentally reset their tags?
//GM_registerMenuCommand("Flickr Groups Organiser: Reset Group Tags", FGOresetgrouptags);


unsafeWindow.quitGroup = function(groupname,groupurl)
{
  //alert(groupurl);
  removepics=0;
  removepicsmess='';
  if(!confirm('Would you like to quit the ' + groupname + ' group?'))
    return;
  if ( confirm('Would you also like to remove all your images from the group?') )  {
    removepics=1;
    removepicsmess=' and removing your pics from the pool';
  }

  // we need to also delete the group from the associated tags
  //tagval=GM_getValue('grouptags','');
  if (unsafeWindow.tagsobject) {
    /*try {
      var tagsobject = unsafeWindow.JSON.parse(tagval);
    }
    catch(e){ 
      GM_log('addtagtogroup function(): error parsing json string');
    }
    */
    //alert('are we here:?');

    for (x in unsafeWindow.tagsobject) {
      //alert(x + groupurl.replace('flickr\.com',''));
      if(unsafeWindow.tagsobject[x].match(groupurl.replace('flickr\.com',''))) {
        //alert(tagsobject[x]);
        tagarr=unsafeWindow.tagsobject[x].split('|');
        for(i=0;i<tagarr.length;i++)
          if(tagarr[i].match(groupurl.replace('flickr\.com',''))) {
            tagarr.splice(i,1);
            break;
          }
        if(tagarr.length)
          unsafeWindow.tagsobject[x]=tagarr.join('|');
        else
          delete unsafeWindow.tagsobject[x];
      }
    }
  
    //alert(tagsobject[tag]);
    tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.tagsobject);
    //alert(tagsoserial);
    //GM_setValue("grouptags",tagsoserial);  
    goSaveData(tagsoserial);
    //window.setTimeout(function() { GM_setValue("grouptags",tagsoserial); }, 0);
 
    //alert(GM_getValue("grouptags"));
    listags(); //redisplay the tag list
    //unsafeWindow.dsptagtab(tag);
    //return false;
  }
  
  //now do the actual group quitting bit
  unsafeWindow.dohttpthing(groupurl,"getgroupid",removepics);
  //thetd=getElementsByClassName('List','td')[0];
  groupurl=groupurl.replace('flickr\.com','');
  lis=document.getElementsByTagName('li');
  for(i=0;i<lis.length;i++) {
    var thea=lis[i].getElementsByTagName('a')[0];
    //GM_log(thea.getAttribute('href')+ ' '+groupurl);
    if(thea && thea.getAttribute('href')==groupurl){
      //lis[i].parentNode.removeChild(lis[i]); // old code
      lis[i].style.color='red';
      thespanid=groupurl.replace('/','','g');
      lis[i].textContent='Quitting : '+ thea.textContent + removepicsmess;
      lis[i].setAttribute('id',thespanid);
      //setTimeout("document.getElementById('"+ thespanid + "').style.display='none'",3000);
      setTimeout("document.getElementById('"+ thespanid + "').parentNode.removeChild(document.getElementById('"+ thespanid + "'))",3000);
    }
  }

  return false;

}

unsafeWindow.faveit_clickHandler = function(event)
{
  //alert('you clicked an li!' + this.getElementsByTagName('a')[0].href);
  if(confirm('Would you like to quit the ' + this.getElementsByTagName('a')[0].textContent + ' group?')) {
    unsafeWindow.dohttpthing(this.getElementsByTagName('a')[0].href,"getgroupid","");
    this.parentNode.removeChild(this);
  }
  event.preventDefault();
  return false;

}

//http://flickr.com/services/rest/?method=flickr.urls.lookupGroup&url=http://flickr.com/groups/api&api_key=9d179414c5491bb965d03dab476a0ef8
//http://flickr.com/groups_leave.gne?magic_cookie&id&done=1 //(returns a 302 code)


unsafeWindow.dohttpthing=function(username, mode, extras) {
  unsafeWindow.retvar='';
  checkxmlresponse = function(evt) {
    if (evt.target.responseText.match(/rsp stat=\"ok\"/)) {
      groupid=evt.target.responseText.split('group id=\"')[1].split('\"')[0];
      if(extras)
        delphotos="&delete_photos=1";
      else
        delphotos='';
      unsafeWindow.dohttpthing(groupid,'quitgroup',delphotos);
    }
    else {
      alert('we couldnt find the groupid, bad xml response!'); 
      return false;
    }
  }
  check302response = function(evt) {
    if (this.status==302)
      alert('we quit that feckin group for ya!');
  }
  checkphotoidresponse = function(evt) {
     alert(evt.target.responseText);
     alert(evt.target.responseText.split('\<photo id=\"')[1].split('\"')[0]);
     unsafeWindow.retvar= evt.target.responseText.split('\<photo id=\"')[1].split('\"')[0];
  }
  checkselectresponse = function(evt) {
    alert(evt.target.responseText);
    alert(evt.target.responseText.split('\<select')[1].split('\<\/select\>')[0]);
    unsafeWindow.retvar = evt.target.responseText.split('\<select')[1].split('\<\/select\>')[0];
  }
  checkuseridresponse = function(evt) {
    unsafeWindow.retvar= (evt.target.responseText.split('\<user id="')[1].split('"')[0]);
  }
    
  hostname=unsafeWindow.document.location.href.split('/')[2];
  if (mode=='getgroupid') {
     theurl="http://" + hostname + "/services/rest/?method=flickr.urls.lookupGroup&api_key=9d179414c5491bb965d03dab476a0ef8&url=" +username;
     htMode="GET";
     pdata="";
  }
  else if (mode=='quitgroup') {
     theurl="http://" + hostname + "/groups_leave.gne";
     htMode="POST";
     pdata="magic_cookie=" + unsafeWindow.global_auth_hash +"&id=" + username + "&done=1" + extras;
  }
  else if (mode=='getphotoid') {
     theurl="http://" + hostname + "/services/rest/?method=flickr.people.getPublicPhotos&api_key=9d179414c5491bb965d03dab476a0ef8&user_id=" + username + "&per_page=1";
     htMode="GET";
     pdata="";
  }
  else if (mode=='getselectbox') {
    theurl="http://" + hostname + '/photo_sendto_group.gne?id='+ extras;
    htMode="GET";
    pdata='';
  }
  else if (mode=='getuserid') {
    theurl="http://" + hostname + '/services/rest/?method=flickr.urls.lookupUser&api_key=9d179414c5491bb965d03dab476a0ef8&url='+ extras;
    htMode="GET";
    pdata='';
  }
  else
    return false;

  //hostname=location.href.split('/')[2];
  req = false;
  try {
    req = new XMLHttpRequest();
  } 
  catch(e) {
    req = false;
  }
  
  // set the response handler functions (defined above)
  if (mode=='getgroupid')
    req.onload=checkxmlresponse; 
  else if (mode=='quitgroup')
    req.onload=check302response;
  else if (mode=='getphotoid')
    req.onload=checkphotoidresponse;
  else if (mode=='getselectbox')
    req.onload=checkselectresponse;
  else if (mode=='getuserid')
    req.onload=checkuseridresponse;
    
  if(req) {
    req.open(htMode, theurl, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(pdata);
  }
  if (unsafeWindow.retvar)
    return unsafeWindow.retvar;
  else
    return false;
}

unsafeWindow.fgoRenametagprompt=function(tag) {

  newtag=prompt("Enter the tagname you want to replace \"" + decodeURIComponent(tag) + "\" with");

  if(!newtag || !(newtag.replace(/['" ]/g,'')) ) {
    alert('You didnt enter a tag!');
    return false;
  }

  unsafeWindow.fgoRenametag (tag, newtag);
  return false;

}

unsafeWindow.fgoRenametag=function(tag, newtag, specialcase) {
  /*
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("grouptags"));
  }
  catch(e){ GM_log('Flickr Groups Organiser GM Script: fgoRenametag function: error parsing json string'); 
    //document.write(tagsobject);
    return;
  }
  */
  
  newtag=newtag.replace(/['"]/g,'');
  if(!specialcase)
    newtagenc=encodeURIComponent(newtag);
  else
    newtagenc=newtag;

  if(!specialcase) // specialcase is when we need to rename tag with URIEncoded version
    for (var x in unsafeWindow.tagsobject) 
      if ((x==newtag) || (x==newtagenc)) {
        alert('Sorry, theres aready a tag called "'+ decodeURIComponent(newtag) + '"');
        return;
      }

  for (var x in unsafeWindow.tagsobject) 
    if (x==tag) {
      tmpob=unsafeWindow.tagsobject[x];
      delete(unsafeWindow.tagsobject[x]);
      unsafeWindow.tagsobject[newtagenc]=tmpob;
    }
  tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.tagsobject);
  //alert(tagsoserial);
  //GM_setValue("grouptags",tagsoserial);
  goSaveData(tagsoserial);
  //window.setTimeout(function() { GM_setValue("grouptags",tagsoserial); }, 0);

  //alert(GM_getValue("grouptags"));
  listags(); //redisplay the tag list
  unsafeWindow.dsptagtab(newtagenc); //redisplay
  return false;
}

 function unixtimetodate(unixdtstr) {
   var theDate = new Date(unixdtstr * 1000);
   dateString = theDate.toGMTString();
   return dateString;
 }

/*
fgoGotoPage=function(groupid, filter, pagenum) {
   //getcurrentfilter();
   //grabphotosfromapi (pagenum)
}
*/

fgoShowDiscussion = function (groupid) {
  //alert('we here');
  document.getElementById('ginfo_'+groupid).innerHTML = '';
  lang='en-us';
   //http://api.flickr.com/services/feeds/groups_discuss.gne?id=17119602@N00&lang=en-us&format=rss_200
  var feedurl='http://api.flickr.com/services/feeds/groups_discuss.gne?id=' + groupid + '&format=atom&lang=' + lang;

  window.setTimeout(function() {GM_xmlhttpRequest({
     method: 'GET',
     url: feedurl,
     headers: {
      'User-agent': 'Mozilla/Compatible - Greasemonkey - Flickr Groups Organiser '+versionnum,
      'Accept':'text/xml',
     },
     onload: function(responseDetails) {
       //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )

       document.getElementById('gpics_' + groupid).innerHTML='';

       var parser = new DOMParser();
       var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
       var ctable="<table cellpadding='3' border='1' style='display:inline'><tr>"
       var entries = dom.getElementsByTagName('entry');


       if(!entries[0]) {
         /*if(document.getElementById('loading_' + groupid))
           document.getElementById('loading_' + groupid).style.display='none';   
         */
         return false;
        }
                
       if (entries.length<9)
         numentries=entries.length-1;
       else
         numentries=8;
       for (var i = 0; i <= numentries; i++) {
         var title=entries[i].getElementsByTagName('title')[0].textContent;
         var commentText = entries[i].getElementsByTagName('content')[0].textContent;
         var pdate=entries[i].getElementsByTagName('published')[0].textContent.split('T')[0];
         var arrptime=entries[i].getElementsByTagName('published')[0].textContent.split('T')[1].split('Z')[0].split(':');
         var ptime=arrptime[0]+':'+arrptime[1];
         var author=entries[i].getElementsByTagName('author')[0].getElementsByTagName('name')[0].textContent;
         var authorurl=entries[i].getElementsByTagName('author')[0].getElementsByTagName('uri')[0].textContent;
         var link=entries[i].getElementsByTagName('link')[0].getAttribute('href');

         var today=new Date();
         tmpdate=new Date();
         tmpdate.setFullYear(pdate.split('-')[0],pdate.split('-')[1]-1,pdate.split('-')[2]);
         if ((today.getYear()==tmpdate.getYear()) && (today.getMonth()==tmpdate.getMonth()) && (today.getDay()==tmpdate.getDay()))
           pdate ='Today';
         else
           pdate=tmpdate.toString().match(/(^... ... .+ \d\d\d\d)/)[1];
         
         //commentText+=today + ' ' + tmpdate + ' ' + tmpdate.getFullYear();     

         if (author==unsafeWindow.global_name)
           bgcolor='style=border-color:blue;border-style:dashed';//'bgcolor=#FFFAAA';//#FFDDDD
         else
           bgcolor='';
         //alert('author='+author + 'gname=' + unsafeWindow.global_name);
         /*
         peas=commentText.split('<p>');
         thea=peas[peas.length-1].replace('</p>','');
         else if (peas[1].split('>')[1].split('<')[0]==yourusername)
            bgcolor='style=border-color:red;border-style:dashed';//'bgcolor=#FFFAAA';//#FFDDDD
         else
            bgcolor='';
         peas[1]=thea.replace('<img ','<img valign=bottom style="float:right;" ')+peas[1].replace('has posted a comment:','@<font size=-2> ' + ptime + ' - ' + pdate +'</font>');
         peas.splice(3,1);
         commentText=peas.join('<p>');
         */

         ctable+="<td valign=top width=300 " + bgcolor +"><p><b><a href='" + link + "'>" + title.replace(/^Reply to/,'') + '</a></b></p>' + commentText.replace('posted a reply:',('posted a reply <font size=-2>' + pdate + ' ' + ptime  +'</font> ')).replace('posted a new topic:',('posted a new topic <font size=-2>' + pdate + ' ' + ptime  +'</font> ')) +"</td>";
         if(!((i+1)%3))
           ctable+="</tr><tr>";
       }
       ctable+="</tr></table>";
       
       document.getElementById('gpics_'+groupid).innerHTML+=ctable; 

       /*
       if(document.getElementById('loading_' + userid))
         document.getElementById('loading_' + userid).style.display='none';   
       */
         
     }//end onload   Greasemonkey - Flickr Groups Organiser
    }); }, 0 );
}

grabphotosfromapi=function(groupid,gfilter,page) {
   userid='';
   //alert("are we here?");
   if(typeof(howmanypics)=='undefined')
     howmanypics=HOW_MANY_PICs_TO_GRAB;
   if(typeof(gfilter)=='undefined')
     gfilter='Recent Photos';  // 'Dont show any photos'
   if(typeof(page)=='undefined')
     page=1;

   if (gfilter=='Most Interesting Photos')
     sortmode='interestingness-desc';
   if (gfilter=='Least Interesting Photos')
     sortmode='interestingness-asc';
   if (gfilter=='Recent Photos')
     sortmode='date-posted-desc';
   if (gfilter=='Earliest Photos')
     sortmode='date-posted-asc';
   if (gfilter=='Your pics') {
     sortmode='date-posted-desc'
     userid=unsafeWindow.global_nsid;
   }
   if(gfilter=='Random Photos') { 
      // we are going to cache the number of pages for each group
      // to save on extra calls to the api
         /*
         totphots=responseText.split('total="')[1].split('"')[0];
         totpages=totphots/howmanypics;
         randpage=randomnumber=Math.floor(Math.random()*totpages+1);
         if(randpage==0)randpage=1;
         sortmode='date-posted-desc'
         */
      var listener = {
        flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
          if(success) {
            totphots=responseText.split('total="')[1].split('"')[0];
            totpages=totphots/howmanypics;
            randpage=randomnumber=Math.floor(Math.random()*totpages+1);
            if(randpage==0)randpage=1;
              var listenerb = {
                flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
                if(success) {
                  parseXML( groupid, responseXML );
                  //add reload button
                  reloadspan=document.createElement('div');
                  reloadspan.setAttribute('align','middle');
                  reloadhtml='<a href="javascript:;" onclick="grabphotosfromapi(\'' + groupid + '\',\'' + gfilter +  '\')">Reload</a>';
                  reloadspan.innerHTML=reloadhtml;
                  document.getElementById('ginfo_'+groupid).appendChild(reloadspan);
                }
                   
              }
          }
          unsafeWindow.F.API.callMethod('flickr.photos.search', { group_id:groupid, page:randpage, per_page:howmanypics, extras:'date_upload,owner_name' } , listenerb );
          }
        }
      };
						
      unsafeWindow.F.API.callMethod('flickr.photos.search', { group_id:groupid, per_page:1 } , listener); //desc
      return;
   // end if gfilter=='Random Photos'
   }

   if (gfilter=='Search Images Text') {
     searchtext= unsafeWindow.fgoSearch;//$x("//input[@name='tquery']")[0].value;
     if(typeof(sortmode)=='undefined')
       sortmode='date-posted-desc';
     if(!searchtext)
       return;
   }
   else
     searchtext=''; 

   if (gfilter=='Search Images Tags') {
     searchtags= unsafeWindow.fgoSearch;//$x("//input[@name='tquery']")[0].value;
     if(typeof(sortmode)=='undefined')
       sortmode='date-posted-desc';
     if(!searchtags)
       return;
   }
   else
     searchtags=''; 
     
  var listener = {
    flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
      if(success)
        parseXML( groupid, responseXML );
    }
  };
						
  unsafeWindow.F.API.callMethod('flickr.photos.search', { group_id:groupid, per_page:howmanypics,page:page, sort:sortmode, user_id:userid, text:searchtext, tags:searchtags, extras:'date_upload,date_taken,owner_name' } , listener); //desc
}

unsafeWindow.grabphotosfromapi=grabphotosfromapi;

unsafeWindow.bark=function (text,groupid) { 

  titleinsertpoint=document.getElementById('picinfo_' + groupid);
  titleinsertpoint.textContent=decodeURI(text);

}
  
parseXML=function ( userid, xml) {
  //<rsp stat="ok">
  //<photos page="1" pages="14" perpage="100" total="1358">
  //<photo id="59463884" owner="15189471@N00" secret="5fd0299002" server="29" title="where's the brick?" ispublic="1" isfriend="0" isfamily="0" ownername="mundaylaura" dateadded="1148124498"/>



  if(typeof(DEFAULT_THUMBNAIL_TYPE)=='undefined')
    DEFAULT_THUMBNAIL_TYPE='t';

  if(document.getElementById('loading_' + userid))
    document.getElementById('loading_' + userid).style.display='none';

  var entries = xml.getElementsByTagName('photo');
  var html='';

  for(var p=0;p<entries.length;p++) {
    var title = entries.item(p).getAttribute('title');
    var href = "http://flickr.com/photos/" + entries.item(p).getAttribute('owner') + '/' + entries.item(p).getAttribute('id');
    
    var author = entries.item(p).getAttribute('ownername') ;
    if(!author)
      author='';
    else
      author=' by ' + author;

    var dateadded = " -&nbsp;&nbsp;&nbsp;Posted: " + unixtimetodate(entries.item(p).getAttribute('dateupload'));
    var img_src = "http://static.flickr.com/" + entries.item(p).getAttribute('server') + '/' + entries.item(p).getAttribute('id') + '_' + entries.item(p).getAttribute('secret') + "_" + DEFAULT_THUMBNAIL_TYPE + ".jpg" ;
    //title = '\"'+ title.replace("\'",'&apos;','g').replace('\"',"&quot;",'g') +'\"' + author.replace("\'",'&apos;','g').replace('\"',"&quot;",'g') + dateadded;
    title = '\"'+ title.replace("\'",'','g').replace('\"',"",'g') +'\"' + author.replace("\'",'','g').replace('\"',"",'g') + dateadded;
    html += "<a href='"+href+"' target='_new'>";
    html += "<img onmouseover='this.src=this.src.replace(\"_t.jpg\",\"_m.jpg\");bark(\"" + encodeURI(title) + "\",\""+ userid + "\");' onmouseout='this.src=this.src.replace(\"_m.jpg\",\"_t.jpg\");bark(\"\",\""+ userid + "\")' style='vertical-align:top;margin-top:3px;margin-bottom:3px;margin-right:3px' src='"+img_src +"' border='0'/></a>";
  }

  //<photos page="1" pages="91" perpage="6" total="541">
  rooty=xml.getElementsByTagName('photos')[0];

  if(rooty.getAttribute('pages')!=0) { // if theres at least 1 page
    filterselect=document.getElementById('gfilter');
    filter=filterselect[filterselect.selectedIndex].value;
    if(filter=='Random Photos')
      filter='Recent Photos';
    if(parseInt((rooty.getAttribute('page'))-1) >= 1)
      prevhtml='<a onclick="grabphotosfromapi(\'' + userid + '\',\'' + filter + '\',' + (parseInt(rooty.getAttribute('page'))-1) + ');return false;" href="javascript:;">Previous Page</a> ';
    else
      prevhtml='';
    if((parseInt(rooty.getAttribute('page'))+1) <= parseInt(rooty.getAttribute('pages')) )
      nexthtml=' <a onclick="grabphotosfromapi(\'' + userid + '\',\'' + filter + '\',' + (parseInt(rooty.getAttribute('page'))+1) + ');return false;" href="javascript:;">Next Page</a>';
    else
      nexthtml='';//rooty.getAttribute('pages');//'';

    ginfo='<div align="center" id="picinfo_' + userid + '"></div><div align="right"> ' + prevhtml  +  rooty.getAttribute('page') + '/' + rooty.getAttribute('pages') + nexthtml; //+ ' Total Images in Group: ' +    rooty.getAttribute('total') + nexthtml + ' </div>';
    document.getElementById('ginfo_'+userid).innerHTML = ginfo;
  }

  /*
  if(entries.length)
    document.getElementById('gpics_'+userid).setAttribute('height',100);
  */

  document.getElementById('gpics_'+userid).innerHTML =  html; // '<img src="http://flickr.com/images/spaceball.gif" height="100" width="1">' +

  document.getElementById('group_'+userid).getElementsByTagName('small')[0].innerHTML=document.getElementById('group_'+userid).getElementsByTagName('small')[0].innerHTML.replace('members\)','members \/ ' + rooty.getAttribute('total') +' photos\)');
}

delay = function(ms) {
    date = new Date();
    curDate = null;
    do { var curDate = new Date(); }
    while ( curDate - date < ms);
}

unsafeWindow.fgoShowImages=function (tag,filter) {

  if(typeof(filter)=='undefined')
    filter='Dont show any photos';

  if (filter=='Dont show any photos')
    photos=0;
  else
    photos=1;    
  
  if (filter=='Search Images Text')
    searchtext=prompt('Please enter the text you wish to search for');
  else
    searchtext='';
    
  if(filter=='Search Images Tags')
    searchtags=prompt('Please enter the tags you wish to search for');
  else
    searchtags='';
  
  unsafeWindow.fgoSearch='';
  if (searchtext)
    unsafeWindow.fgoSearch=searchtext;
  if(searchtags)
    unsafeWindow.fgoSearch=searchtags;

  /* 
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("grouptags"));
  }
  catch(e){ GM_log('dsptag function(): error parsing json string'); return;
  }
  */
  
  //alert(filter);

  //tagslist=document.getElementById('tagslist');
  //alert(tagsobject[tag]);
  if(!unsafeWindow.tagsobject[tag]) { // tag doesnt exist
    return;
  }
  grouparr=unsafeWindow.tagsobject[tag].split('|');
  for (i=0;i<grouparr.length;i++){
    if(photos) {
      if(i%2==0)
        document.getElementById('group_'+grouparr[i].split(SEP1)[2]).style.backgroundColor='rgb(238, 238, 238)'; 
      document.getElementById('gpics_'+grouparr[i].split(SEP1)[2]).innerHTML='<div align="center">Loading Please Wait ... <img src="/images/pulser2.gif"></div>';
      if(filter!='Recent Discussions') {
        grabphotosfromapi(grouparr[i].split(SEP1)[2],filter); 
        //delay(1000);
      }
      else
        fgoShowDiscussion(grouparr[i].split(SEP1)[2]);
    }
    else {
        document.getElementById('gpics_'+grouparr[i].split(SEP1)[2]).innerHTML='';
        document.getElementById('ginfo_'+grouparr[i].split(SEP1)[2]).innerHTML='';
    }
      
  }
}


unsafeWindow.dsptagtab =function (tag) {

  /*
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("grouptags"));
  }
  catch(e){ GM_log('dsptag function(): error parsing json string'); return;
  }
  */
  
  tagslist=document.getElementById('tagslist');
  //alert(tagsobject[tag]);
  if(!unsafeWindow.tagsobject[tag]) { // tag doesnt exist
    listags();
    return;
  }
  
  grouparr=unsafeWindow.tagsobject[tag].split('|');
  //tagslist.innerHTML='<h3><img src="/images/icon_member.gif" class="icon" alt="M" title="You are a member of these groups" align="absmiddle" height="15" width="15"> Groups tagged "<span style=\'color:black\'>' + tag + '</span>" (' + grouparr.length + ')</h3> <a class="Grey" href="javascript:;" onclick="fgoRenametagprompt(\"' + tag + '\")">Rename Tag</a>';


  if(!grouparr[0].split(SEP1)[1]) { // if the separator has been corrupted
    alert('Your tag datastore seems to be corrupt, im going to try and fix it right now!');
    fixCorruptedDatastore();
    return;
  }

  if(location.href.match('flickr\.com\/groups')) {
  
    tagslisthtml='<h3>Tag: "<span style=\'color:black\'>' + decodeURIComponent(tag) + '</span>" (' + grouparr.length + ')';
    tagslisthtml += '&nbsp;&nbsp;<a class="Grey" style="font-size:12px;font-weight:normal" title="Rename current tag" href="javascript:;" onclick="fgoRenametagprompt(\'' + tag + '\')">Rename</a>'; 
    //<a style="font-size:12px;font-weight:normal" href="javascript:;" onclick="fgoShowImages(\'' + tag + '\')">View Images</a>';
    tagslisthtml += '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:black;font-size:12px;font-weight:normal">Filter</span> <select style="display:inline" onchange="fgoShowImages(\'' + tag + '\',this[this.selectedIndex].value); this.blur()" id="gfilter"><option value="Dont show any photos">Dont show any photos</option><option value="Recent Photos">Recent Photos</option><option value="Earliest Photos">Earliest Photos</option><option value="Most Interesting Photos">Most Interesting Photos</option><option value="Least Interesting Photos">Least Interesting Photos</option><option value="Your pics">Your pics</option><option value="Random Photos">Random Photos</option><option value="Search Images Text">Search Images Text</option><option value="Search Images Tags">Search Images Tags</option><option value="Recent Discussions">Recent Discussions</option></select>';
    tagslisthtml += '</h3>';//&nbsp;&nbsp;<span style="color:black;font-size:12px;font-weight:normal">Search <input type="text" name="tquery"> <input onclick="fgoShowImages(\'' + tag + '\',\'Search Images Text\')" type="button" value="Go"></span></h3>';
      //Text<input type="radio" name="tagsortext" value="text" checked> Tags<input type="radio" name="tagsortext" value="tags"><input onclick="fgoShowImages()" type="button" value="Search"></span></h3>';
    tagslist.innerHTML=tagslisthtml;
    //<img src="/images/icon_member.gif" class="icon" alt="M" title="You are a member of these groups" align="absmiddle" height="15" width="15">

    lis=unsafeWindow.grouplistbackupdiv.getElementsByTagName('li');
    nooul=document.createElement('ul');
    nooul.style.paddingLeft='0px';
    
    for (i=0;i<grouparr.length;i++){
      fgofoundflag=0;
      fgobadhref='';
      for(j=0;j<lis.length;j++) {
        if(lis[j].innerHTML.match(grouparr[i].split(SEP1)[1])) {
          ghref=lis[j].getElementsByTagName('a')[0].getAttribute('href');
          tmpli=document.createElement('li');
          //tmpli.style.border='1px solid #CCCCCC';
          tmpli.setAttribute('id','group_'+ grouparr[i].split(SEP1)[2]);
          tmpli.innerHTML=lis[j].innerHTML + ' <a title="Delete this tag from this group" class="Grey" href="javascript:;" onclick="deltagfromgroup(\'' + tag + '\',\'' + ghref + '\',\'normal\')">-tag</a></font>';
          tmpli.innerHTML+="<div id='" +'gpics_' + grouparr[i].split(SEP1)[2] + "'></div><div id='" + 'ginfo_' + grouparr[i].split(SEP1)[2] + "'></div>";
          nooul.appendChild(tmpli);
          fgofoundflag=1;
          break;
        }
      }
      if (!fgofoundflag) {
         alert('You are not a member of the group: ' + decodeURIComponent(grouparr[i].split(SEP1)[0]) + '. Though it is listed under this tag.\nRemoving group from taglist... ' +fgobadhref); 
         unsafeWindow.deltagfromgroup( tag , grouparr[i].split(SEP1)[1], 'quiet');
      }
       
    } // end looping through groups that have this tag
 
  tagslist.appendChild(nooul);
  //hr=document.createElement('hr');
  //tagslist.appendchild(steeevfooter);
  //tagslist.appendchild(hr);
  //alert(steeevfooter.innerHTML);
  }
  else if (location.href.match('flickr\.com\/photos\/organize')){ // we are on the organise page
    /*if(!unsafeWindow.groupsorgbackup)
      unsafeWindow.groupsorgbackup=document.getElementById('tabl_mat_groups').innerHTML;
    else
      document.getElementById('tabl_mat_groups').innerHTML=unsafeWindow.groupsorgbackup;
    */
    
    tagslist=document.getElementById('tagslist'); 
    if (!tagslist.getElementsByTagName('h3')[0]) {
      tagslist.innerHTML='<h3>Groups tagged "<span style=\'color:black\'>' +  decodeURIComponent(tag) + '</span>" (' + grouparr.length + ') &nbsp;&nbsp;<a style="font-size:12px;font-weight:normal" href="javascript:;" onclick=fgoRenametagprompt("' + tag + '")>Rename Tag</a></h3> '; //"<span style=\'color:black\'> </span>";
      //<img src="/images/icon_member.gif" class="icon" alt="You are a member of these groups" align="absmiddle" height="15" width="15"> 
    }
    else { // put the divs back to bed
      tagslist.getElementsByTagName('h3')[0].innerHTML="Groups tagged \"<span style=\'color:black\'>" + decodeURIComponent(tag) + "</span>\" (" + grouparr.length + ") &nbsp;&nbsp;<a style='font-size:12px;font-weight:normal' href='javascript:;' onclick=fgoRenametagprompt('" + tag + "')>Rename Tag</a></h3>";
      //<img src='/images/icon_member.gif' class='icon' alt='You are a member of these groups' align='absmiddle' height='15' width='15'>
      
      divsindiv=tagslist.getElementsByTagName('div');
      //alert("divs="+divsindiv.length);
  
      admindiv=document.getElementById('admin_group_divs');
      adminbr=admindiv.getElementsByTagName('br')[0];
      memberdiv=document.getElementById('member_group_divs');
      memberbr=memberdiv.getElementsByTagName('br')[0];

      arrgroupsinbed=unsafeWindow.currtaggroups.split(',');
      for(i=0;i<arrgroupsinbed.length;i++) {
        groupid=arrgroupsinbed[i];
        if(!groupid)
          break;
        if(unsafeWindow.global_groups[groupid].is_admin==1)       
          adminbr.parentNode.insertBefore(document.getElementById('group_div'+groupid),adminbr);
        else if(unsafeWindow.global_groups[groupid].is_admin==0)  
          memberbr.parentNode.insertBefore(document.getElementById('group_div'+groupid),memberbr);
      }

    breaker.parentNode.removeChild(breaker);
    }
    unsafeWindow.currtaggroups='';
    for(l=0;l<grouparr.length;l++) 
      for(k in unsafeWindow.global_groups){
        try {
          if(grouparr[l].split(SEP1)[2]==unsafeWindow.global_groups[k].id) {
            tagslist.appendChild(document.getElementById('group_div'+ unsafeWindow.global_groups[k].id));
            unsafeWindow.currtaggroups+=grouparr[l].split(SEP1)[2]+',';
            break;
          }
        } catch(e){;}
      }

     breaker=document.createElement('br');
     breaker.setAttribute('clear','all');
     tagslist.appendChild(breaker);
   //nooul.appendChild(document.createElement('p'));
  }
  else if(location.href.match('flickr\.com\/recent\.gne')) {
    //alert(grouparr[l].split(SEP1)[2]
    if(document.getElementById('fgochangestable')) //reset table
      document.getElementById('Changes').innerHTML= unsafeWindow.backupContentTD;

    // <select name="days" onchange="this.form.submit();">

    dappy=getElementsByClassName('Separate')[0];
    dappy.innerHTML=dappy.innerHTML.replace('Current timeframe: ','')
    dappy.innerHTML='Changes to all your groups: ' +  dappy.innerHTML;
    
    psel=$x("//p[@class='Separate']/select")[0];
    selformhtml='<form style="display:inline"><select id="fgochangesel" name="days" onchange="location.href=\'http://flickr.com/recent.gne?days=\'+this.options[this.selectedIndex].value+\'#' + decodeURIComponent(tag) + '\'">' + psel.innerHTML  + '</select></form>';
    
    document.getElementById('tagslist').innerHTML='<table id="fgochangestable"><tr><td id="taggedtabletitle" colspan="2"><h3>Changes to Your Groups Tagged: ' + decodeURIComponent(tag) + '&nbsp;&nbsp;' + selformhtml + '</h3></td></tr></table>';
    fgochangesel=document.getElementById('fgochangesel');
    /*for(i in fgochangesel.options)
      fgochangesel.options[i].value+='#'+tag;
    */
    
    var found1=0;
    for (i=0;i<grouparr.length;i++){
      tmpgroupurl=grouparr[i].split(SEP1)[1].replace('groups\/','').replace('\/','','g');
      tmpgroupid=document.getElementById(tmpgroupurl);
      if(tmpgroupid) {
        found1=1;
        document.getElementById('fgochangestable').firstChild.appendChild(tmpgroupid);
      }
    }
    
    if(!found1)
      document.getElementById('fgochangestable').firstChild.appendChild(document.createElement('tr').innerHTML='<td>No Changes</td>');
  
  }
//tagslist.appendChild(nooul);

} // END FUNCTION unsafeWindow.dsptagtab

listags=function () {
  /*
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("grouptags"));
  }
  catch(e){ GM_log('listags function(): error parsing json string'); return;
  }
  */
  //alert('in list tags');
  
  //tagspan.innerHTML+='<b>Tags</b>: ';
  
  
  //////////////////////////////////
  // BEGIN associative array sort code
  // auto sort tag list
  //
  var num = 0;
  var tmp = new Array();
  var sorted = new Array();
  for (i in unsafeWindow.tagsobject)
    tmp[num++] = i + "$Z9Z$" + unsafeWindow.tagsobject[i]; //using an arbitrary temp separator
  tmp = tmp.sort();
  for (i = 0; i < tmp.length; i++)
  {
     x = tmp[i].split("$Z9Z$")
     sorted[x[0]] = x[1];
   }
  unsafeWindow.tagsobject=sorted;
  
  // END associative array sort code
  //////////////////////////////////
  
  tagspan.innerHTML='<b>Tags</b>: ';
  
  
  //alert(unsafeWindow.tagsobject);
    for (var x in unsafeWindow.tagsobject) {
      //alert('x');
      grouparr=unsafeWindow.tagsobject[x].split('|');
      tagspan.innerHTML+= '<a href=\'javascript:;\' onclick=\'dsptagtab\("'  +  x + '"\);return false;\'>' + decodeURIComponent(x) + '</a> | ';
    }
  if (!location.href.match('\/organize'))
    //tagspan.innerHTML+='<span id="tagslist"></span>';
    tagspan.innerHTML+='<span id="tagslist"></span>';
  else 
    if(!document.getElementById('tagslist')) {
      tagslist=document.createElement('span');
      tagslist.setAttribute('id','tagslist');
      h3s=document.getElementsByTagName('h3');
      for(i=0;i<h3s.length;i++)
        if (h3s[i].innerHTML.match('Groups you administer')) {
          h3s[i].parentNode.insertBefore(tagslist, h3s[i]);
        }
    }
}

unsafeWindow.FGOlistgroupstags=function (groupurl) {
  var datagslist='';
  /*
  try {
    var tagsobject = unsafeWindow.JSON.parse(GM_getValue("grouptags"));
  }
  catch(e) { 
    GM_log('Flickr Groups Organiser GM Script: listags function : error parsing json string'); 
    return;
  }
  */
  for (var x in unsafeWindow.tagsobject)
    if(unsafeWindow.tagsobject[x].match(groupurl))
      datagslist+=x +', ';
  return datagslist;
}

unsafeWindow.addtagtogroup =function(name,url) {

  name=encodeURIComponent(name); // handle whacky characters

  datags=unsafeWindow.FGOlistgroupstags(url);
  if(datags)
    damsg="This group is currently tagged with: " + decodeURIComponent(datags) + '\n';
  else
    damsg="";

  tagname=prompt(damsg + 'Please enter the tag you want to associate with this group');

  if(!tagname || !(tagname.replace(/['" ]/g,'')) ) {
    //alert('You didnt enter a tag!');
    return false;
  }

  tagname=tagname.replace(/['"]/g,'');
  tagname=encodeURIComponent(tagname);
  
  //get group id
  strapi='/services/rest/?method=flickr.urls.lookupGroup&api_key=9d179414c5491bb965d03dab476a0ef8' + '&url=flickr.com' + url;
  hostname=unsafeWindow.document.location.href.split('/')[2];
  apiurl="http://" + hostname + strapi;
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  if (p.responseText && !(p.responseText.match("rsp stat=\"fail\""))) {
    groupid=p.responseText.split("<group id=\"")[1].split("\"")[0];
  }
  else{
    alert('addtagtogroup function: error looking up groupid');
    return false;
  }

  //tagval=GM_getValue('grouptags','');
  if (unsafeWindow.tagsobject) {
    /*
    try {
    var tagsobject = unsafeWindow.JSON.parse(tagval);
    }
    catch(e){ GM_log('addtagtogroup function(): error parsing json string');
    }
    */
   
    //alert(tagsobject);

    // if the tag doesnt match unencodedtag or encodedtag) - (create tag)
    // if decodedtag matches and encodedtag doesnt match (we need to encode the tag (rename it))
    // if tag matches and encodedtag matches (we are fine)
    // if tag doesnt match and encoded tag matches (we is good to go)
    // deal with unencoded tags created by older versions of the scripts

    encmatch=unencmatch=0;
    if ( unsafeWindow.tagsobject[tagname] )
      encmatch=1;

    if (unsafeWindow.tagsobject[decodeURIComponent(tagname)])
      unencmatch=1;
    
    if (!encmatch && !unencmatch) // no matching tag
      unsafeWindow.tagsobject[tagname]=name + SEP1 + url + SEP1 + groupid;
    else {
      if (unencmatch && !encmatch)
        unsafeWindow.fgoRenametag(decodeURIComponent(tagname),tagname,1);
      if(!unsafeWindow.tagsobject[tagname].match(url))
        unsafeWindow.tagsobject[tagname]+= '|' + name + SEP1 + url  + SEP1 + groupid;
      else {
        alert('This group is already tagged with: ' + decodeURIComponent(tagname));
        return false;
      } 
    }
   /*
    if(!tagsobject[tagname]) {
      tagsobject[tagname]=name + SEP1 + url + SEP1 + groupid;
    }
    else { // we need to check if this group already has this tag
      if(!tagsobject[tagname].match(url))
        tagsobject[tagname]+= '|' + name + SEP1 + url  + SEP1 + groupid;
      else {
        alert('This group is already tagged with: ' + decodeURIComponent(tagname));
        return false;
      }
    }
   */
  /////////////////////////////////

  }
  else {
    unsafeWindow.tagsobject= new Array();
    unsafeWindow.tagsobject[tagname]=name + SEP1 + url  + SEP1 + groupid;
  }
  //alert(tagsobject[tagname]);
  tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.tagsobject);
  //alert(tagsoserial);
  //GM_setValue("grouptags",tagsoserial);  
  //window.setTimeout(function() { GM_setValue("grouptags",tagsoserial); }, 0);
  goSaveData(tagsoserial);

  //alert(GM_getValue("grouptags"));
  listags(); //redisplay the tag list
  return false;

}

unsafeWindow.deltagfromgroup = function(tag,url,mode) {

  //tagval=GM_getValue('grouptags','');
  if (unsafeWindow.tagsobject) { //alert('barg');
    /*
    try {
    var tagsobject = unsafeWindow.JSON.parse(tagval);
    }
    catch(e){ GM_log('deltagfromgroup function(): error parsing json string');
    }
    */
    
    //alert(tagsobject);
    if(!unsafeWindow.tagsobject[tag]) {
      return;
    }
    else { 
      // we need to check if this group already has this tag
      if(!unsafeWindow.tagsobject[tag].match(url))
        return;
      else {
        //alert(tagsobject[tag]);
        tagarr=unsafeWindow.tagsobject[tag].split('|');
        for(i=0;i<tagarr.length;i++)
          if(tagarr[i].match(url)) {
            tagarr.splice(i,1);
            break;
          }
        if(tagarr.length)
          unsafeWindow.tagsobject[tag]=tagarr.join('|');
        else
          delete unsafeWindow.tagsobject[tag];
      }
    }
  }
  else { //alert('we should be ehre nbow')
    return;
  }
  //alert(tagsobject[tag]);
  tagsoserial=unsafeWindow.JSON.stringify(unsafeWindow.tagsobject);
  //alert(tagsoserial);
  //GM_setValue("grouptags",tagsoserial);  
  //window.setTimeout(function() { GM_setValue("grouptags",tagsoserial); }, 0);
  goSaveData(tagsoserial);

  //alert(GM_getValue("grouptags"));
  if (mode=='normal') {
    listags(); //redisplay the tag list
    unsafeWindow.dsptagtab(tag);
  }
  return false;

}

unsafeWindow.showQuitLinks=function () {
  quitlinksA=getElementsByClassName('QuitLink');
  for(i=0;i<quitlinksA.length;i++)
    quitlinksA[i].setAttribute('class','Grey');
  return false;
}

unsafeWindow.addEventListener("load", function(ev) {  
  //var realusername=getElementsByClassName('Pale','a')[0].innerHTML;
  var userid=unsafeWindow.global_nsid ;
  //var photoid=unsafeWindow.dohttpthing(userid,"getphotoid",'');

  /*
  hostname=unsafeWindow.document.location.href.split('/')[2];
  apiurl="http://" + hostname + "/services/rest/?method=flickr.people.getPublicPhotos&api_key=9d179414c5491bb965d03dab476a0ef8&user_id=" + userid + "&per_page=1";
  p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  photoid = p.responseText.split('\<photo id=\"')[1].split('\"')[0]; 
 
  apiurl = "http://" + hostname + '/photo_sendto_group.gne?id='+ photoid;
  //p = new XMLHttpRequest();
  p.open("GET", apiurl, false);
  p.send(null);
  thegroupsel = p.responseText.split('\<select')[1].split('\<\/select\>')[0];
  thegroupsel="<select"+thegroupsel + "</select>";
  //var thegroupsel=unsafeWindow.dohttpthing("","getselectbox",photoid);

  spgroupy=document.createElement('span');
  spgroupy.innerHTML='<form>' + thegroupsel + '</form>';
  spgroupy.style.float='right';
  */  

  //theh1=document.getElementsByTagName('h1')[0];
  //theh1.parentNode.insertBefore(spgroupy, theh1.nextSibling);
  
  tagspan=document.createElement('div'); //span
  tagspan.setAttribute('id','tagspanid');
  tagspan.setAttribute('class','Links');
  //tagspan.appendChild(spgroupy);

  if (location.href.match('flickr\.com\/photos\/organize')) {
    sf_insertpoint=document.getElementById('candy_groups_button_bar');
    sf_insertpoint.appendChild(tagspan);
    //tagspan.style.position='relative';
    //tagspan.style.top=-10;
    //tagspan.style.right=-10;
    
    firstp=sf_insertpoint.getElementsByTagName('p')[0];
    //firstp.innerHTML="<span onmousover=\"this.textContent='Drag photos or videos onto a group to add them to the pool.'\" onmouseout=\"this.textContent='Drag...'\">Drag ...</span>";
    //firstp.innerHTML="<b><a target='_blank' href='http://steeev.freehostia.com/flickr/' title='Flickr Groups Organi(s)er'>FGO</a></b> " + versionnum + " <a target='_blank' href='http://steeev.freehostia.com/flickr/' title='Steeevs Flickr Tools'>?</a>";
    firstp.innerHTML='';
    tagspan.innerHTML="<b><a target='_blank' href='http://steeev.freehostia.com/flickr/' title='Flickr Groups Organi(s)er'>FGO</a></b> " + versionnum + " <a target='_blank' href='http://steeev.freehostia.com/flickr/' title='Steeevs Flickr Tools'>?</a> ";
    
    /*
    fgoheader=document.createElement('div');
    fgoheader.setAttribute('class','Links');
    fgoheader.style.display='inline';
    fgoheader.innerHTML="<b><a target='_blank' href='http://steeev.freehostia.com/flickr/' title='Flickr Groups Organi(s)er'>FGO</a></b> " + versionnum + " <a target='_blank' href='http://steeev.freehostia.com/flickr/' title='Steeevs Flickr Tools'>?</a> ";
    firstp.parentNode.insertBefore(fgoheader,firstp.nextSibling);
    */
    
    
    //sf_insertpoint=document.getElementById('back_link');
    //sf_insertpoint.innerHTML="<a href='javascript:;' onclick='alert(\"mmm\")'>Your Groups</a>" + sf_insertpoint.innerHTML;
    }
           
  else if (location.href.match('flickr\.com\/groups')){ 
    // if we are on the groups page
    //sf_insertpoint=document.getElementById('Main').getElementsByTagName('td')[1];
    //sf_insertpoint.appendChild(tagspan);
    sf_insertpoint=document.getElementById('SubNav');
    sf_insertpoint.parentNode.insertBefore(tagspan,sf_insertpoint.nextSibling);
     
    tagspan.style.marginTop='0px';
    tagspan.style.fontSize='13px';
    
    GM_addStyle("#Main { width: auto !important; margin-left:8px};");
    
    sf_insertpoint.style.marginBottom='3px';
    
    linkinsertpoint=getElementsByClassName('LinksNew')[0];
    if (linkinsertpoint) {
      var fgoEQL='&nbsp;<img height="11" width="1" alt="" src="/images/subnavi_dots.gif"/> ' +
                 '<a href="javascript:;" onclick="showQuitLinks()">Show Quit Links</a>';
      linkinsertpoint.innerHTML+=fgoEQL;
    
    }
    
    
    thetd=getElementsByClassName('List','td')[0];
    lis=thetd.getElementsByTagName('li');
    for(i=0;i<lis.length;i++) {
      var thea=lis[i].getElementsByTagName('a')[0];

      var href=thea.getAttribute('href');
      var nm=thea.textContent;

      var quitglink=document.createElement('a');
      quitglink.setAttribute('onclick','quitGroup("' + unsafeWindow.stripnasties(nm) + '","' + 'flickr.com' + href + '")'); 
      quitglink.setAttribute('href','javascript:;');
      quitglink.setAttribute('title','Quit this group');
      quitglink.setAttribute('class','QuitLink'); //Grey
      //quitglink.style.backgroundColor='white';
      quitglink.textContent='quit';

      lis[i].appendChild(quitglink);
      lis[i].innerHTML+='&nbsp;'; //'<font color=lightgrey>&nbsp;|&nbsp;</font>'
  
      var adtglink=document.createElement('a');
      adtglink.setAttribute('onclick','addtagtogroup("' + unsafeWindow.stripnasties(nm) + '","' + href +'"' + ')');
      adtglink.setAttribute('href','javascript:;');
      adtglink.setAttribute('title','Add a tag to this group');
      adtglink.setAttribute('class','Grey');
      //adtglink.style.backgroundColor='white';
      adtglink.textContent='+tag';
      lis[i].appendChild(adtglink);
    }
   
    steeevfooter=document.createElement('div');
    steeevfooter.style.backgroundColor='#dddddd';
    steeevfooter.innerHTML='<p style="width:520px;text-align:left"><b><a target="_blank" href="http://steeev.freehostia.com/flickr/">Flickr Groups Organiser</a></b> &nbsp; <a title="Check for Updates" href="http://steeev.freehostia.com/flickr/flickr.groups.organiser.user.js">' + versionnum + '</a>&nbsp;&nbsp; by&nbsp;&nbsp; <a title="Flickr Groups Organiser was created by Stephen Fernandez aka Steeev" href="/photos/steeev/">Steeev</a>&nbsp;&nbsp;&nbsp;  If you like this script, and would like to support the author, please <a href=http://steeev.freehostia.com/donate/>make a donation</a> &nbsp;&nbsp;- &nbsp;&nbsp; More of Steeevs scripts <a target="_blank" href="http://steeev.freehostia.com/flickr/">here</a></p>';
    maincourse=document.getElementById('Main');
    maincourse.appendChild(steeevfooter);
    //maincourse.parentNode.insertBefore(steeevfooter, maincourse.nextSibling);          

    // make a backup of the existing list of groups, so we can restore them when we "sort (normal)"
    unsafeWindow.grouplistbackupdiv=document.createElement('div');
    unsafeWindow.grouplistbackupdiv.innerHTML=$x("//td[@class='List']")[0].innerHTML;    


    if (PUT_ADMIN_GROUPS_IN_RIGHT_COLUMN) {
      uls = document.getElementsByTagName('ul');
      uls[0].setAttribute('id','adminul');
      uls[1].setAttribute('id','groupul');
  
      var h3s = document.getElementsByTagName('h3');
 
      for(i=0;i<h3s.length;i++) {
        if(h3s[i].textContent.match(/Groups you administer/))
          adminh3=h3s[i];
        if(h3s[i].textContent.match(/Create your own group/))
          noticedh3=h3s[i];
      }
    noticedh3.parentNode.insertBefore(adminh3, noticedh3); // insert "groups you administer" title into right hand column
    noticedh3.parentNode.insertBefore(uls[0], noticedh3); // insert groups you administer ul into right hand column
    }

  }// end if we are on the /groups/ page
  else if (location.href.match('flickr\.com/recent\.gne')) {
    // recent group changes page
    sf_insertpoint=document.getElementById('Main').getElementsByTagName('td')[1];
    sf_insertpoint.appendChild(tagspan);

    contentTD=document.getElementById('Changes');
    
    groupRowsA=contentTD.getElementsByTagName('table')[0].getElementsByTagName('tr');
    for(i=0;i<groupRowsA.length;i++) {
      firsthref=groupRowsA[i].getElementsByTagName('li')[0].getElementsByTagName('a')[0].getAttribute('href');
      dagroupurl=firsthref.split('/')[2].split('/')[0];
      groupRowsA[i].setAttribute('id',dagroupurl);
    }
    
    unsafeWindow.backupContentTD=contentTD.innerHTML; // make a backup of the tables current state
    
  }

  tagval=GM_getValue('grouptags','');
  if (tagval)
    listags();
  if(location.href.match('#')) { 
    //alert('we have #' + location.href.split('#')[1]);
    unsafeWindow.dsptagtab(location.href.split('#')[1]);
    
  }

  sTimer.stopTimer();
  //document.body.appendChild(document.createTextNode("Flickr Groups Organiser GM script Execution Time=" + sTimer.executionTime())); 

}, false); // end of onload function
