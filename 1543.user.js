// ==UserScript==
// @name          Flickr - Multi Group Sender
// @description	  Allows you to send your Flickr image to multiple groups
// @author        Stephen Fernandez http://steeev.freehostia.com http://flickr.com/photos/steeev
// @namespace     http://steeev.f2o.org/flickr/
// @include       http://www*.flickr.com/photos/*/*
// @include       http://flickr.com/photos/*/*
// @version       3.1 11-Jun-2008
// ==/UserScript==
/*

 (c) 2008 Stephen Fernandez - Excellatronic Communications
 
 DONATE
 .................
 If you wish to thank me for all the hard work i have put into writing/testing/supporting this script,  
 and would like to support further updates and bug fixes, you can send me a few pounds/dollars/euros etc
 via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/ 
 or else you might like to buy me something from my amazon wishlist http://www.amazon.co.uk/gp/registry/1LAD1VZGDF3XS :)


 Disclaimer
 -------------
 Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
 i cannot be held responsible for anything bad that happens regarding usage of this script.

 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr - Multi Group Sender" and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------
 Click the "send to group" button on your photo page as normal, you will then be sent to a page that will allow you to
 send your image to multiple groups. If you select multiple groups to send to and click the checkbox next to the
 "Add to group" button, when you click "add" you will be asked to give your selection of groups a name, your selection
 will then be saved in another select box below the main one, under the name you have chosen. Next time you use this page
 if you select one of your saved selections using the secondary select box, the primary select box will automatically be
 repopulated with the selection of groups you saved previously.

 If you spent ages selecting a list of groups to submit to, and forgot to tick the save box, nevermind, as your previously selected 
 list is always saved automatically, and accessible from the saved selections menu.

 If you wish to delete a saved group selection, just select it in the secondary drop down box, and then click the little grey [x] next to it
 

 Changelog:
 ----------
 v1.0    19-Aug-2005 : Initial Release
 v1.1    12-Apr-2006 : Updated script to work with GM 0.6.4 + FF 1.5
 v1.2    03-May-2006 : Minor bugfix + code refactoring + also a SuperBatch GM script compatibility fix supplied by .CK
 v1.21   11-May-2006 : Minor bugfix: can now submit to group names with single quotes in them.
 v1.22   16-May-2006 : Fixed to work with Flickr Gamma release
 v1.3    18-May-2006 : Added save previous group selection function
 v1.6    19-May-2006 : added more save group selection options
 v1.61   20-May-2006 : removed some debugging code, that i left in accidentally
 v1.7    13-Jun-2006 : Reformatted success/fail messages
 v1.71   29-Jun-2006 : Added error message for when you cant add any more photos to the pool due to quota limit
 v1.72   03-Jul-2006 : fixed 'x' image alignment issue
 v1.8    07-Jul-2006 : Switched to using the Flickr API for group submitting
 v1.9    07-Jul-2006 : The send to group form is now a floating popup on the photo page itself rather than a separate page.
 v1.91   07-Jul-2006 : Fixed z-index bug:- notes were floating above the MGS div, not anymore :)
 v1.92   21-Jul-2006 : Fixed for compatibility with updated FlickrPM + updated Group Pool Admin Warn+Delete scripts
 v1.922  09-May-2007 : changed delete selection button to a link for better usability
 v2.0   25-Apr-2008 : fixed: saved group selections functionality ( many thanks to Ricardo Mendonca Ferreira http://flickr.com/ricardo_ferreira )
                       fixed: send to group menu no longer appears beneath flash video
                       fixed: clicking send to group button twice no longer sends you to another page
                       fixed: you can no longer use a blank name for the saved group selection			             
	                     new feature: your previously selected list of groups is always automatically saved, useful if you forget to check  the save box
 v2.02 20-May-2008 : fixed bug: resizing browser window no longer causes MGS's window to go off screen
                       fixed style of links in popup window, so they no longer turn invisible on mouseover. 
                       fixed bug: stop script running if theres no original send to group button on the page
 v2.5  22-May-2008 : fixed script to work on international versions of the site
                       added group selection counter, to show how many groups you have selected,
                       you now cannot select a group pool that the picture is already in
 v2.73 24-May-2008 : speeded up group dialog creation process, and refactored old code, stripping out the deadwood
 v2.74 28-May-2008 : previous version of script only displayed a max of 400 groups, this is now fixed
 v3.00 07-Jun-2008 : added search function, that lets you search the group list
 v3.1  11-Jun-2008 : added [x] for removal from group when image is placed in pending queue
*/


(function() {

var mgsVersion="3.1";
var picid=unsafeWindow.page_photo_id;
if (!picid) 
  return;

// hide original send to group button if its there, if not stop processing
isbutt=document.getElementById('photo_gne_button_send_to_group');
if(isbutt)
  isbutt.setAttribute('style','display:none');
else
  return;
  
//GM_setValue("savedgroups",""); //reset saved selections
unsafeWindow.arrgroups=[];
if (GM_getValue("savedgroups"))
  unsafeWindow.arrgroups=GM_getValue("savedgroups").split('|');

unsafeWindow.blurbflag=0;

unsafeWindow.createCookie = function(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/; domain=" + location.href.split('/')[2];
  return false;
}

unsafeWindow.readCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

unsafeWindow.mgsFilterGroupList=function(){ 
  unsafeWindow.mgsResetGroupList() ; //reset group list
  mgsfilterphrase=document.getElementById('mgsFilter').value; 
  mgssel=document.getElementById('mgsgrpselbox');
      
  for (x=0;x<mgssel.options.length;x++)
	 if(!mgssel.options[x].textContent.match(mgsfilterphrase,'i')) {
      mgssel.options[x].style.display='none';
      if(mgssel.options[x].getAttribute('class')=='mgsDisabledOpt')
        mgssel.options[x].setAttribute('class','mgsDisabledOpt-notinsearch');
      else
        mgssel.options[x].setAttribute('class','notinsearch');
      mgssel.options[x].disabled=true;
      
   }    
    
}

unsafeWindow.mgsResetGroupList=function(){ 

  document.getElementById('MGSmailstatusID').innerHTML=''; // reset status div
  
  mgssel=document.getElementById('mgsgrpselbox');

  //blank currently selected options
  for (x=0;x<mgssel.options.length;x++) 
    mgssel.options[x].selected=false;
      
  unsafeWindow.mgsCountGroups();
  for (x=0;x<mgssel.options.length;x++) {
    mgssel.options[x].style.display='block';
    if(mgssel.options[x].getAttribute('class') && mgssel.options[x].getAttribute('class').match("notinsearch")) {
      if(mgssel.options[x].getAttribute('class').match('mgsDisabledOpt')) {        
        mgssel.options[x].setAttribute('class','mgsDisabledOpt');
      }
      else {
        mgssel.options[x].setAttribute('class','');
      }
      mgssel.options[x].disabled=false;
    }
  }
}


// override send to group button's function
unsafeWindow.sendToGroupDialog = function () { 

 // hack to fix swf overlay problem, because zindex property doesnt seem to work, we hide the swf temporarily
 if (document.getElementById('stewart_swf'+ picid)) {
    document.getElementById('stewart_swf'+ picid).setAttribute('style','visibility:hidden');
 }

 if (!document.getElementById('MGSemaildivID')) { 
   //check if the div exists, so we dont create multiple instances
   MGSemailDiv = document.createElement('div');
   MGSemailDiv.setAttribute('id','MGSemaildivID');
   MGSemailDiv.style.position = 'absolute';
   MGSemailDiv.style.overflow = 'visible';
   MGSemailDiv.style.width = '450px';
   MGSemailDiv.style.top = '-10px';
   MGSemailDiv.style.padding = '15px';
   MGSemailDiv.style.margin = '15px';
   MGSemailDiv.style.left = (1*document.body.clientWidth-450)/2 + 'px';
   MGSemailDiv.style.display = 'none';
   MGSemailDiv.style.border = '2px solid #000';
   MGSemailDiv.style.background = '#ffffff';
   MGSemailDiv.style.zIndex='999999999';

  //<b><font size='+2' color='#0063DC'><b>flick</b></font><font size='+2' color='#FF0084'><b>r</b></font>
  MGSemailDiv.innerHTML = "<style>div#MGSmailstatusID {margin-bottom:10px} span.sfhead { font-size:18 ; font-weight:bold} p.sfhead2 {font-size:17 ; font-weight:bold; color:#FF0084} a.poplnk {text-decoration:none} a.poplnk:hover {color: red !important}  option.mgsDisabledOpt {color:pink}</style>";
  MGSemailDiv.innerHTML += "<span class='sfhead'>Flickr : Multi Group Sender</span> (v" + mgsVersion + ") by <a class='poplnk' target='_new' href='http://flickr.com/photos/steeev'>Steeev</a></b><a title='Close Window' onclick='closeMGSwin();' href='javascript:;'><img style='float: right; position: relative; top:-15; margin: 0; padding: 0; border:0px !important; vertical-align: top;' src='http://flickr.com/images/window_close_grey.gif'/></a>";
    
  //MGSemailDiv.innerHTML += '<p class="sfhead2">Select the group pools you wish to add the photo to:</p>';
  MGSemailDiv.innerHTML += '<h3>Select the group pools you wish to add the photo to:</h3>';
  MGSemailDiv.innerHTML += '<span id="mgsSearchSpan" style="display:none"><form style="display:inline" onsubmit="mgsFilterGroupList(); return false;"><input id="mgsFilter"><input class="Butt" type="submit" id="filterbutt" value="Search"><input class="CancelButt" type="button" id="clearbutt" value="Reset" onClick="mgsResetGroupList();"></form></span><div id="MGSmailstatusID" style="display:none"></div>';
  MGSemailDiv.innerHTML += '<div id="mgsFormContainer"><p>&nbsp;&nbsp;&nbsp;&nbsp;<b>Loading Groups...</b> <img src="http://flickr.com/images/pulser2.gif"/></p></div>';
  
  buildGroupSelectForm();

  MGSemailDiv.innerHTML += "<p>&nbsp;&nbsp;&nbsp;If you appreciate Steeev's <a class='poplnk' href='http://steeev.freehostia.com/flickr/'>Flickr GM Scripts</a>. Please make a <a class='poplnk' href='http://steeev.freehostia.com/donate'>donation</a> :)</p>";
  MGSemailDiv.innerHTML += "<span><span style='float:left'><a class='poplnk' onclick='alert(\"Please read and search through the flickr hacks discussion before asking a question, as your query has quite possibly already been addressed.\")' target='_new' href='http://www.flickr.com/groups/flickrhacks/discuss/72462/'>Help/Discuss?</a></span><span  style='float:right'><a class='poplnk' href='javascript:;' title='Close' onclick='closeMGSwin()'>Close</a></span></span>";

  document.getElementById('candy_nav_button_bar').appendChild(MGSemailDiv);
  
  MGSemailDiv.style.display='block';
  
  

  if (!(unsafeWindow.readCookie('mstgtipbeenseen')=='yes')) {
    document.getElementById('MGSmailstatusID').innerHTML='<div style="background-color: rgb(251, 255, 204);"><B>Tip:</b> You can select multiple groups by holding down the control key (CTRL) key (or Apple key if you are on a Mac) and then clicking the groups you want to send to.<br/><br/>Please take care to carefully select the groups you add your image to, as posting your image to irrelevant groups lowers your images interestingness rating, and also causes extra work for group administrators.<br/><br/><A href="" onclick="disablemmtip();return false;">Close Tip</a></div>';
    document.getElementById('MGSmailstatusID').style.display='block';
  }
    
  // END NEXT GEN
  } // end if MGSemailDiv hasnt been created
  else
    MGSemailDiv.style.display='block';
  return;
} // END sendToGroupDialog function

// create new send to group button
stgbutt=document.createElement ('a');
stgbutt.setAttribute('class','photo_gne_button sprite-send_to_group_grey');
stgbutt.setAttribute('onClick','sendToGroupDialog(); return false;');
stgbutt.setAttribute('title','Steeevs Multi Group Sender');
stgbutt.setAttribute('style','width: 53px; cursor: pointer;');
stgbutt.setAttribute('alt','+ MGS');
stgbutt.setAttribute('href','#');

//insert new button
isbutt.parentNode.insertBefore(stgbutt, isbutt);

// START NEXT GEN

buildGroupSelectFormX=function () {
  //Start Timer
  var MGSStartTime=new Date();
  
  var listener = {
    flickr_groups_pools_getGroups_onLoad: function(success, responseXML, responseText, params){
      jsonFlickrApi = function(rsp) {
        if(rsp.stat!='ok') {
          alert('error in json groups list retrieval');
          return;
        }
		
        var mgsgroupselect='<select id="mgsgrpselbox" onchange="mgsCountGroups()" multiple="multiple" size="14" name="group">';

		    //if we dont care if about the groups the pic is already in we can just use the following 2 lines of code
        //for (var i=0; i<rsp.groups.group.length; i++)
        //  mgsgroupselect += '<option value="' + rsp.groups.group[i].id + '">' + rsp.groups.group[i].name + '</option>';
		
		// create a hash/associative array of the groups that the pic is already in, for faster searching :)
		ingrpA=new Object(); 
		for (i=0;i<unsafeWindow.in_groupsA.length;i++) 
		  ingrpA[unsafeWindow.in_groupsA[i].nsid]=1;
		
        // loop through group list and see if any of them match ones in the associative array		
		for ( x=0; x<rsp.groups.group.length; x++)
		  if(!ingrpA [rsp.groups.group[x].id])
		    mgsgroupselect += '<option value="' + rsp.groups.group[x].id + '">' + rsp.groups.group[x].name + '</option>';
		  else
        mgsgroupselect += '<option value="' + rsp.groups.group[x].id + '" disabled="true" class="mgsDisabledOpt">' + rsp.groups.group[x].name + '</option> ';
		
      mgsgroupselect += '</select>'  ;
      var mgsform = '';

      mgsform += '<form onsubmit="return multimailer(this);" action="http://flickr.com/photo_sendto_group.gne" method="post">';
      mgsform += '<input type="hidden" value="' + picid + '" name="id"/><input type="hidden" value="1" name="done"/>';
      mgsform +=  mgsgroupselect + '<br><span style="float:right" id="groupcountspan"></span>';
      mgsform += '<p>';
      mgsform += '<input name="savegroups" id="chksave" type="checkbox"> Save this group selection';
      mgsform += '<input type="submit" name="Submit" value="ADD PHOTO" class="Butt">';
      mgsform += '</form>';
		  document.getElementById('mgsFormContainer').innerHTML=mgsform;
		  unsafeWindow.makesavedgrpsform();
		
		  // End Timer
	    var MGSEndTime=new Date();
      var MGSExecutionTime=MGSEndTime-MGSStartTime;
      //document.getElementById('groupcountspan').innerHTML='MGS Execution Time = ' + MGSExecutionTime + 'ms';
    }
    eval(responseText);
    }
  }
  unsafeWindow.F.API.callMethod('flickr.groups.pools.getGroups', { format:'json'} , listener );
}

buildGroupSelectForm = function () {
  // total function rewrite to account for people who belong to over 400 groups 
  // Start Timer
  //var MGSStartTime=new Date();
  
  checkresponsex=function (evt) {
    var mgsform = '';
    var mgsgroupselect="<select id='mgsgrpselbox' onchange='mgsCountGroups()' multiple='1' size='14' " + (evt.target.responseText.split('<select')[1].split('</select>')[0]) +"</select>";

    mgsform += '<form id="mgsForm" onsubmit="return multimailer(this);" action="http://flickr.com/photo_sendto_group.gne" method="post">';
    mgsform += '<input type="hidden" value="' + picid + '" name="id"/><input type="hidden" value="1" name="done"/>';
    mgsform +=  mgsgroupselect + '<br><span style="float:right" id="groupcountspan"></span>';
    mgsform += '<p>';
    mgsform += '<input name="savegroups" id="chksave" type="checkbox"> Save this group selection';
    mgsform += '<input type="submit" name="Submit" value="ADD PHOTO" class="Butt">';
    mgsform += '</form>';
		document.getElementById('mgsFormContainer').innerHTML=mgsform;
		
		document.getElementById("mgsSearchSpan").style.display="inline";
		
		//disable the groups that the pic is already in
		
		// create a hash/associative array of the groups that the pic is already in, for faster searching :)
		ingrpA=new Object(); 
		for (i=0;i<unsafeWindow.in_groupsA.length;i++) 
		  ingrpA[unsafeWindow.in_groupsA[i].nsid]=1;
		
    // loop through group list and see if any of them match ones in the associative array		
    mgssel=document.getElementById('mgsgrpselbox');
    mgssel.style.width='380px';
    for (x=0;x<mgssel.options.length;x++)
		  if(ingrpA [mgssel.options[x].value]) {
         mgssel.options[x].setAttribute('disabled','true');
         mgssel.options[x].setAttribute('class','mgsDisabledOpt');
      }    
    
		unsafeWindow.makesavedgrpsform();
		mgssel.focus();
		
		// End Timer
		//var MGSEndTime=new Date();
    //var MGSExecutionTime=MGSEndTime-MGSStartTime;
    //document.getElementById('groupcountspan').innerHTML='MGS Execution Time = ' + MGSExecutionTime + 'ms';
    
  } // END checkresponsex function
  
  hostname=location.href.split('/')[2];
  req = false;
  try {
    req = new XMLHttpRequest();
  } 
  catch(e) {
    req = false;
  }
  
  pdata="id=" + picid + "done=1";
  req.onload=checkresponsex; // response handler function (defined above)
  if(req) {
    req.open("POST",  'http://' + hostname + '/photo_sendto_group.gne', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(pdata);
  }


} // END buildGroupSelectForm function


  //BEGIN mgsCountGroups function
  unsafeWindow.mgsCountGroups = function () {
    countspan=document.getElementById('groupcountspan');
	grpselbox=document.getElementById('mgsgrpselbox');
	if (!grpselbox)
	  return;
	  
    tempcounter=0;
    for (x=0;x<grpselbox.options.length;x++) 
      if(grpselbox.options[x].selected==true && grpselbox.options[x].value.match(/@/))
        tempcounter++;
	
	countspan.innerHTML= tempcounter + ' groups &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  } 
  // END mgsCountGroups function
 

unsafeWindow.closeMGSwin = function () {
 
  document.getElementById('MGSemaildivID').style.display="none";
  // hack to fix swf overlay problem, because zindex property doesnt seem to work, we hid the swf completely, so now reshow it
  if (document.getElementById('stewart_swf'+ picid))
    document.getElementById('stewart_swf'+ picid).setAttribute('style','visibility:visible');
  return false;
}

unsafeWindow.repopulategrouplist=function(command) {
  unsafeWindow.mgsResetGroupList(); 
  if (command=='old')
    oldgroupidlist=unsafeWindow.readCookie('oldgroupidlist'); // this list always gets saved whether or not the user chooses it
  else {
   //bo=MGSemailDiv.getElementsByTagName('form')[0].selbooger;
   bo=document.getElementById('selboogerid');
   oldgroupidlist=bo.options[bo.selectedIndex].value;
  }
  arGroupList=oldgroupidlist.split(',');
  //ob=unsafeWindow.document.forms[1].group;
  ob=document.getElementById('mgsgrpselbox');

  //blank currently selected options
  for (x=0;x<ob.options.length;x++) 
    ob.options[x].selected=false;

  // reselect previously selected options
  for (i=0;i<arGroupList.length;i++) {
    for (x=0;x<ob.options.length;x++){ 

      if(ob.options[x].value==arGroupList[i]) {
         ob.options[x].selected=true;
      }
    }
  }
  unsafeWindow.mgsCountGroups(); // display how many groups are selected
  return false;
}

unsafeWindow.deletesavedselection =function() {
  thesel=document.getElementById('selboogerid');
  if( (thesel.selectedIndex==0) || (thesel.selectedIndex==1) )
    return;
  if(!confirm('Are you sure you want to delete this saved selection?'))
    return;
  val2del=thesel.options[thesel.selectedIndex].value;
  txt2del=thesel.options[thesel.selectedIndex].textContent;
  item2del=txt2del + '^'+ val2del;

  if (unsafeWindow.arrgroups) {
    unsafeWindow.arrgroups.splice(thesel.selectedIndex-2,1);
    window.setTimeout(function() { GM_setValue("savedgroups",unsafeWindow.arrgroups.join('|')); }, 0);
  }
  
  thesel.options[thesel.selectedIndex]=null;
  alert('Your saved selection "' + txt2del + '" has been deleted');
  return false;
}

unsafeWindow.makesavedgrpsform = function() {

  prevGrpSelection=unsafeWindow.readCookie('oldgroupidlist');

  if (!(unsafeWindow.arrgroups.length || prevGrpSelection)) 
    return false;
    
    savgrpsel=document.createElement('select');
    savgrpsel.setAttribute('name','selbooger');
    savgrpsel.setAttribute('id','selboogerid');
    savgrpsel.setAttribute('onchange','repopulategrouplist()');

    theOption=document.createElement("option");
    theText=document.createTextNode('Select a Saved Group Selection');
    theOption.appendChild(theText);
    theOption.setAttribute("value",0);
    savgrpsel.appendChild(theOption); 

  if (prevGrpSelection) {
    theOption=document.createElement("option");
    theText=document.createTextNode('Previous Selection');
    theOption.appendChild(theText);
    theOption.setAttribute("value",prevGrpSelection);
    savgrpsel.appendChild(theOption); 
  }
  
  if(unsafeWindow.arrgroups) {
    for(i=0;i<unsafeWindow.arrgroups.length;i++) {
      theOption=document.createElement("option");
      theText=document.createTextNode(unsafeWindow.arrgroups[i].split('^')[0]);
      theOption.appendChild(theText);
      theOption.setAttribute("value",unsafeWindow.arrgroups[i].split('^')[1]);
      savgrpsel.appendChild(theOption); 
    }
  }

    dsgbutt=document.createElement('a');
    dsgbutt.textContent='[X]';
    dsgbutt.setAttribute('class','Grey');
    dsgbutt.setAttribute('href','javascript:;');
    dsgbutt.setAttribute('title','Delete the currently selected Saved Group Selection');
    dsgbutt.setAttribute('onclick','deletesavedselection()');

    if(!document.getElementById('sgspanid')) {
      sgspan=document.createElement('span');
      sgspan.setAttribute('id','sgspanid');
    }

    sgspan.innerHTML='<br/>You may select a previously saved selection of groups:<br/>';      
    sgspan.appendChild(savgrpsel);
    sgspan.appendChild(document.createTextNode(' ')); 
    sgspan.appendChild(dsgbutt);  

    sgspan.innerHTML+='<p/>'

    inpoint=document.getElementById('groupcountspan');
    inpoint.parentNode.insertBefore(sgspan, inpoint.nextSibling);

    return false; 
}

unsafeWindow.disablemmtip = function() {
  document.getElementById('MGSmailstatusID').style.display="none";
  unsafeWindow.createCookie('mstgtipbeenseen','yes',1000);
  return false;
}

unsafeWindow.multimailer = function (dform) {

  unsafeWindow.mailstosend=0;
  scroll(0,0);

  ob=dform.group;

  tempnamelist='';
  groupidlist='';
  tempcounter=0;
  for (x=0;x<ob.options.length;x++){ 

    if(ob.options[x].selected==true && ob.options[x].value.match(/@/))
      {
      tempnamelist+=ob.options[x].text + ', ';
      groupidlist+=ob.options[x].value + ',';
      tempcounter++;
      }
  }
  
  //alert(groupidlist);

  if (tempcounter==0) {
    alert('You didnt select any groups to send to!');
    return false;
  }

  if ( tempcounter > 30 ) {
    alert('Sorry you cant send to that many groups, please try a smaller number.');
    return false;
  }

  if ( tempcounter >= 1 )
  if (!confirm('You are about to send this image to the following ' + tempcounter + ' groups:\n\n' + tempnamelist + '\n\nAre you sure ?'))
        return false;

  unsafeWindow.createCookie('oldgroupidlist',groupidlist,1000); // save the group selection

  if(dform.savegroups.checked==true) {
    //user wants to save their selection
    var gselname="";
	while(!gselname)
	  gselname=prompt('Please enter a name for your saved group selection:');
    dform.savegroups.checked=false;
    savegrouplist= gselname + "^" + groupidlist.substring(0,groupidlist.length-1);

    unsafeWindow.arrgroups.push(savegrouplist);
    window.setTimeout(function() { GM_setValue("savedgroups",unsafeWindow.arrgroups.join('|')); }, 0);
     
    unsafeWindow.makesavedgrpsform();

  }
	
  var arSelected = new Array();
  var nmSelected = new Array();
  while (ob.selectedIndex != -1) { 

    if(ob.options[ob.selectedIndex].value.match(/@/))
      {
      arSelected.push(ob.options[ob.selectedIndex].value); 
      nmSelected.push(ob.options[ob.selectedIndex].text);
      }
    //deselect selected options
    ob.options[ob.selectedIndex].selected = false; 
  }
  
  // blank the group selection counter
  countspan=document.getElementById('groupcountspan');
  countspan.innerHTML='<br/>';
  
  picid=dform.id.value;

  for (i=0;i<arSelected.length;i++) 
    {
    if(arSelected[i].match(/@/)) {
      grpname=nmSelected[i].replace('\'','','g'); // strip out the nasties
      setTimeout("sendmail(\'" + arSelected[i] + "\',\'" + picid  + "\','" + grpname + "\')",2000*(i+1));
      }
    }

  unsafeWindow.mailstosend=arSelected.length;
  unsafeWindow.mailscounter=0;

  document.getElementById('MGSmailstatusID').style.display='block';
  document.getElementById('MGSmailstatusID').innerHTML='<h3><font color=green>Sending to ' + unsafeWindow.mailstosend + ' Group/s</font></h3>'; //id="pulser" style="display:inline;!important border:0px"

  return false;
}

 unsafeWindow.sendmail=function(userid, picid, username) {

   checkresponse = function(evt) {
     if (evt.target.responseText.match(/stat=\"ok\"/)) {
       document.getElementById(userid).innerHTML = ' <span class="Confirm"><b>Sent</b></span>&nbsp;&nbsp;' + document.getElementById(userid).innerHTML + '&nbsp;' + ' <a class="Grey" title="Remove image from pool" onclick="mgsdropphoto(\'' + userid + '\',\'' + picid + '\');return false;" href=http://flickr.com/groups/' + userid + '/pool/?remove=' + picid + '&magic_cookie=' + unsafeWindow.global_auth_hash + '>[X]</a>';
       //unsafeWindow.add_context_widget("pool", userid, picid); // adds an unneccessary api call?
     }
     else if (evt.target.responseText.match(/stat=\"fail\"/)) {
       document.getElementById(userid).innerHTML = ' <span class="Problem"><b>Failed</b></span>&nbsp;&nbsp;' + document.getElementById(userid).innerHTML + '&nbsp;( ' + evt.target.responseText.split('msg=\"')[1].split('\"')[0] +' )&nbsp;';
       if (evt.target.responseText.match(/err\ code=\"3\"/) || evt.target.responseText.match(/err\ code=\"6\"/) || evt.target.responseText.match(/err\ code=\"7\"/)) //already in the pool
         document.getElementById(userid).innerHTML += ' <a class="Grey" title="Remove image from pool" onclick="mgsdropphoto(\'' + userid + '\',\'' + picid + '\');return false;" href=http://flickr.com/groups/' + userid + '/pool/?remove=' + picid + '&magic_cookie=' + unsafeWindow.global_auth_hash + '>[X]</a>';
     }
     else
       document.getElementById(userid).innerHTML = ' <span class="Problem"><B>Failed</b></span>&nbsp;&nbsp;' + document.getElementById(userid).innerHTML;
     unsafeWindow.mailscounter++;
     if(unsafeWindow.mailscounter==unsafeWindow.mailstosend) {
       document.getElementById('MGSmailstatusID').innerHTML += '<br/><font color=red>Send to Group Operations Completed.</font>'; //<a href="" onclick="history.back();">Return to Photo Page?</a>
       //repopulategrouplist();
     }
   }

  document.getElementById('MGSmailstatusID').innerHTML += "<div id='" + userid + "'><a class='poplnk' href=http://flickr.com/groups/" + userid + ">" + username + "</a></div>";

  pdata="auth_hash=" + unsafeWindow.global_auth_hash + "&api_key=9d179414c5491bb965d03dab476a0ef8&group_id=" + userid + "&photo_id=" + picid ;
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
    req.open("POST",  'http://' + hostname + '/services/rest/?method=flickr.groups.pools.add', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(pdata);
  }

  return false;
}


unsafeWindow.mgsdropphoto=function (groupid,photoid) {

  mgsnode=document.getElementById(groupid);
  mgsnode.style.color='red';
  mgsnode.textContent='Removing photo from ' + mgsnode.getElementsByTagName('a')[0].textContent;
  setTimeout("document.getElementById('"+ groupid + "').style.display='none'",2000);

  var listener = {
    flickr_groups_pools_remove_onLoad: function(success, responseXML, responseText, params){
      if(success)
        unsafeWindow.remove_context_widget("pool",groupid);
      else
        alert('Remove photo from group operation failed');
    }
  };
					
  unsafeWindow.F.API.callMethod('flickr.groups.pools.remove', { group_id:groupid, photo_id:photoid } , listener);       

  return false;
}// end function dropphoto

})();