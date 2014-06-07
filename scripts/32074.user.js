// Flickr Count Users Post Thread! user script
// version 0.1 BETA!
// 2008-08-19
// Copyright (c) 2008, DURLEA Adrian
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
// select "Flickr Count Users Post Thread", and click Uninstall.
//
//
// Description
// ===========
// Get all the users that have multiple posts on a thread and show the number of posts.
// This is useful when you want to know if some one has posted more than once on a thread.
// Ex: contest thread, invite thread or vote thread; where you want only a post per person.
// When you have more than a page in the thread you can use the auto page scripts http://userscripts.org/scripts/show/8594
//   and scroll down to the bottom till you have all pages in the same page and then press "Count Users".

// --------------------------------------------------------------------
//
// ==UserScript==
// @name Flickr Count Users Post Thread
// @author DURLEA Adrian
// @namespace
// @description Get all the users that have multiple posts on a thread and show the number of posts
// @include http://www.flickr.com/groups/*/discuss/*
// @include http://flickr.com/groups/*/discuss/*
// ==/UserScript==

(function() {
	var FCUPTuserDiv;

	men = document.getElementById('Tertiary');
	men.innerHTML+='--> <a onclick="FCUPTshowCountForm();return false;" title="Show Form Count" href="#">Count Users</a>';
	if (!document.getElementById('FGUMFCUPTuserDiv')) {
		FCUPTuserDiv = document.createElement('div');
		FCUPTuserDiv.setAttribute('id','FCUPTuserDiv');
		FCUPTuserDiv.style.position = 'absolute';
		FCUPTuserDiv.style.width = '500px';
		FCUPTuserDiv.style.margin = 'auto';
		FCUPTuserDiv.style.top = "80px";
		FCUPTuserDiv.style.left = (1*document.body.clientWidth-500)/2 + 'px';
		FCUPTuserDiv.style.visibility = 'hidden';
		FCUPTuserDiv.style.background = '#ffffff';
		FCUPTuserDiv.style.border = '2px solid #000';
		FCUPTuserDiv.style.padding = '3px';
	}


unsafeWindow.FCUPTgetUsers = function(){
  var FCUPT_allUsers = new Object();
  var FCUPT_multUsers = new Array();
  var FCUPT_txtUsers = "";

  if(!document.getElementById('DiscussTopic')){
		return;
	} else {
		tables=document.getElementById('DiscussTopic').getElementsByTagName('table');
    k = 0;
		for(i=0;i<tables.length;i++) {
      if (tables[i].className == 'TopicReply'){
        tds=tables[i].getElementsByTagName('td');
        for(j=0;j<tds.length;j++) {
          if (tds[j].className == 'Said' ){
            if (tds[j].innerHTML.match('<a href="/photos')){
             if (FCUPT_allUsers[tds[j].innerHTML.split('<a href="/photos')[1].split('>')[1].split('<')[0]] == null){
               FCUPT_allUsers[tds[j].innerHTML.split('<a href="/photos')[1].split('>')[1].split('<')[0]] = 1;
             } else {
               if (FCUPT_allUsers[tds[j].innerHTML.split('<a href="/photos')[1].split('>')[1].split('<')[0]] == 1){
                 FCUPT_multUsers[k] = tds[j].innerHTML.split('<a href="/photos')[1].split('>')[1].split('<')[0];
                 k++;
               }
               FCUPT_allUsers[tds[j].innerHTML.split('<a href="/photos')[1].split('>')[1].split('<')[0]] = FCUPT_allUsers[tds[j].innerHTML.split('<a href="/photos')[1].split('>')[1].split('<')[0]] + 1;
             }
            }
				  }
        }
			}
		}
	}

  for (i=0;i<FCUPT_multUsers.length; i++){
    FCUPT_txtUsers += '<tr align="center"><td>' + FCUPT_multUsers[i] + '</td><td>' + FCUPT_allUsers[FCUPT_multUsers[i]] + ' times</td></tr>';
  }

  FCUPT_allUsers = null;
  FCUPT_multUsers = null;

  if (FCUPT_txtUsers != "") {
  	FCUPTuserDiv.innerHTML = '<span align="right">'+
              '<a href="javascript:;" onclick="FCUPThideCountForm();return false;" title="Close Window">'+
							'<img src="http://flickr.com/images/window_close_grey.gif" style="border: 0px none ! important; margin: 0pt; padding: 0pt; float: right; position: relative; vertical-align: top;"/>'+
							'</a></span>'+
							'<span align="center"><h2>Users that have multiple post in this thread'+
							'</h2></span><br>'+
							'<table id="FCUPTtable" name="FCUPTtable" width="480px"><tbody>'+
							FCUPT_txtUsers + '</tbody></table>'+
							'<br><span align="center"><b>Created by DURLEA Adrian</span>';
    document.body.appendChild(FCUPTuserDiv);
	} else {
    window.alert('There are no multiple post of a same user');
    FCUPTuserDiv.style.visibility = 'hidden';
  }

  return;
}

unsafeWindow.FCUPTshowCountForm = function () {
  unsafeWindow.FCUPTgetUsers();
	FCUPTuserDiv.style.visibility = 'visible';
	return;
}

unsafeWindow.FCUPThideCountForm = function () {
	FCUPTuserDiv.style.visibility = 'hidden';
	return;
}

})();
