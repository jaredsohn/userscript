//=============================================================================
// This script is provided under the terms of the GNU General Public License, 
// version 2, which can be found at
//   http://www.gnu.org/copyleft/gpl.html
// Specifically, note that this script comes with NO guarantees, not even the 
// implied guarantee of merchantibility or fitness for a specific purpose.
//=============================================================================
// Revision History
// 1.0 - Initial release
// 1.1 - add site fdlbooksalon.com 
//     - change default back to Pacific Standard Time - MyFDL does not seem to 
//       change to Daylight.
//=============================================================================
// ==UserScript==
// @name                FDLPlus
// @description	        This script is a Greasemonkey plug-in providing some
//                      enhanced functionality for the firedoglake.com site 
//                      family.
// @include		http://firedoglake.com/*
// @include		http://*.firedoglake.com/*
// @include		http://fdlbooksalon.com/*
// ==/UserScript==
//=============================================================================

var version = "FDLPlus version 1.1";
var blacklist = null;

var alpha_filtered = 0;
var beta_filtered = 0;
//=============================================================================
function contains(a, obj) 
{
   if (a)
   {
      var i = a.length;
      while (i--) 
	 if (a[i] === obj) 
	    return true;
   }
   return false;
}
//=============================================================================
function loadBlacklist()
{
   var bl, uid;
   if (blacklist == null)
   {
      blacklist = new Array();
      bl = GM_getValue('Blacklist',';').split(';');
      for (u in bl)
	 if (bl[u])
	    blacklist[bl[u]] = true;
   }
   return blacklist;
}

//=============================================================================
function saveBlacklist()
{
   var u;
   var bl = ';';
   if (blacklist)
      for (u in blacklist)
	 bl += u + ';';
   GM_setValue('Blacklist',bl);
}

//=============================================================================
function doAbout()
{
   alert(version);
}

//=============================================================================
function banUser()
{
   var  user;

   user = prompt('User id to blacklist:','');
   if (user)
   {
      loadBlacklist();
      blacklist[user] = true;
      saveBlacklist();
   }
}

//=============================================================================
function unbanUser()
{
   var u = prompt('User to remove from blacklist:','');
   if (u)
   {
      loadBlacklist();
      if (u in blacklist)
      {
	 delete blacklist[u];
	 saveBlacklist();
      }
      else
	 alert('Error: user [' + u + '] is not blacklisted.');
   }
}

//=============================================================================
function showBlacklist()
{
   var u, bl='';
   for (u in loadBlacklist())
      bl += u + '\n';
   if (bl)
      alert('Blacklisted users:\n' + '--------------------\n' + bl);
   else
      alert('No users are blacklisted');
}

//=============================================================================
function purgeTS()
{
   var keys = GM_listValues();
   for (var i=0,key=null;key=keys[i];i++)
      if ((key != 'Blacklist') && (key != 'DST'))
	 GM_deleteValue(key);
}
//=============================================================================
function promptDST()
{
   var answer = confirm('Is California on Daylight Savings Time? Select OK for yes, Cancel for no.')
   if (answer)
      GM_setValue('DST',1);
   else
      GM_setValue('DST',0);
}

//=============================================================================
// This is ugly. MyFDL prints the time on a comment as Pacific time, but it does
// not indicate whether it is currently using Standard or Daylight. This prevents
// us from doing a correct conversion to ticks-from-epoch time. 
// Read a property that lets the user set this. Return the string "GMT-0800" or
// "GMT-0700" as appropriate. Defaults to Standard, since MyFDL does not seem
// to switch to Daylight.
function tzString()
{
   var result = " GMT-0800";
   var prop = GM_getValue('DST');
   if (prop)
      result = " GMT-0700";
   return result;
}

//=============================================================================
// This is the only domain that supports indented sub-threads. For ease of reading,
// save a timestamp for the last time you loaded the page, then compare it to
// the timestamp on each comment. Any comment that is newer, add a "[new] to its
// comment-meta.
// The timestamp is stored by "post-id". The absence of one means you have not
// read this post yet.
//
function doMyFDL()
{
   // obtain post ID
   var pBody = document.getElementsByTagName('body')[0];
   var postId = pBody.getAttribute('class')
   postId = postId.substr(postId.lastIndexOf('postid-')+7);

   // obtain the timestamp of the last page view, if any, otherwise epoch date.
   var lastViewTS = null;
   var ts_tmp = GM_getValue(postId);
   if (ts_tmp)
      var lastViewTS = new Date(ts_tmp);
   else
      lastViewTS = new Date(0);
   // store current time as the timestamp of the current page view.
   GM_setValue(postId,new Date().toString());

   var cList = document.getElementsByClassName('commentlist')[0];
   var allComments = cList.getElementsByTagName('li');
   var c;
   for (var i = 0; (c = allComments[i]) != null; i++)
   {
      var c_id = c.getAttribute('id');
      var c_meta = c.getElementsByClassName('comment-meta')[0];

      // handle [new] 
      var c_ts = c_meta.getElementsByClassName('comment-date')[0].innerHTML;
      var tmp = c_ts.replace('th,','');
      tmp = tmp.replace('at ','');
      // FDL is on Pacific Time, UTC - 8 hours for Standard.
      tmp += tzString();
      var c_ts_date = new Date(tmp);

      if (lastViewTS < c_ts_date)
      {
	 c_ts += '&nbsp;&nbsp;&nbsp;[new]';
	 c_meta.getElementsByClassName('comment-date')[0].innerHTML = c_ts;
      }

      var c_author = c_meta.getElementsByTagName('a')[0].text;
      if (c_author in blacklist)
      {
	 alpha_filtered++;
	 var c_content = c.getElementsByClassName('comment-content')[0];
	 var limit = c_content.childNodes.length-3;
	 for (var j=1;j<limit;j++)
	 {
	    c_content.removeChild(c_content.childNodes[2]);
	 }
	 var newNode = document.createTextNode('...filtered...');
	 c_content.insertBefore(newNode,c_content.childNodes[2]);
      }
      // now do the subtree, somehow...
   }

   // write statistics at the top of the comments.
   if (alpha_filtered > 0)
   {
      var feedback = document.getElementsByClassName('comments')[0]
      feedback.innerHTML = 'Alpha filtered: ' + alpha_filtered + '<br/> Beta filtered: ' + beta_filtered +
			   '<br/><br/>' + feedback.innerHTML;
   }
}

//=============================================================================
function doCommonFDL()
{
   var cfilterlist = new Array();
   var allComments = document.getElementsByClassName('comment');
   var c;
   for (var i = 0; (c = allComments[i]) != null; i++)
   {
      var c_id = c.getAttribute('id');
      var c_authorid = c_id.replace('comment-','commentAuthor-');
      var c_author = document.getElementById(c_authorid).getElementsByTagName('a')[0].text;
      if (c_author in blacklist)
      {
	 c_body = c.getElementsByClassName('commentBody');
	 c_body[0].innerHTML = "...filtered...";
	 alpha_filtered++;
	 cfilterlist.push(c_id)
      }
      var c_respelem = c.getElementsByClassName('commentResponse');
      if (c_respelem.length > 0)
      {
	 var tmp = c_respelem[0].getElementsByTagName('a')[0].href;
	 var c_respid = tmp.substr(tmp.lastIndexOf('#')+1);
	 // if this comment is in response to a filtered comment, filter it
	 if (contains(cfilterlist,c_respid))
	 {
	    c_body = c.getElementsByClassName('commentBody');
	    c_body[0].innerHTML = "...filtered...";
	    beta_filtered++;
	    cfilterlist.push(c_id)
	 }
      }
   }
   // write statistics at the top of the comments.
   if (alpha_filtered > 0)
   {
      var feedback = document.getElementById('respTotal');
      feedback.innerHTML = 'Alpha filtered: ' + alpha_filtered + '<br/> Beta filtered: ' + beta_filtered +
			   '<br/><br/>' + feedback.innerHTML;
   }
}

//=============================================================================
// Different sub-domains have radically different HTML. Test to see which one we
// are dealing with and branch to the appropriate function.

function filterComments()
{
   loadBlacklist();

   if (document.getElementsByClassName('comment').length > 0)
      doCommonFDL();
   else
      doMyFDL();

}

//=============================================================================
// Main

GM_registerMenuCommand("About FDLPlus",doAbout);
GM_registerMenuCommand("Add user to blacklist",banUser);
GM_registerMenuCommand("Remove user from blacklist",unbanUser);
GM_registerMenuCommand("Show blacklisted users",showBlacklist);
GM_registerMenuCommand("Set Daylight Savings Time",promptDST);
GM_registerMenuCommand("Delete all timestamps",purgeTS);

filterComments();
