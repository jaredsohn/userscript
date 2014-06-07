//=============================================================================
// This script is provided under the terms of the GNU General Public License, 
// version 2, which can be found at
//   http://www.gnu.org/copyleft/gpl.html
// Specifically, note that this script comes with NO guarantees, not even the 
// implied guarantee of merchantibility or fitness for a specific purpose.
//=============================================================================
// Revision History
// 1.0 - Initial release
//=============================================================================
// ==UserScript==
// @name                NBLblacklist
// @description	        Provides a blacklist function for the guymcpherson.com site. 
// @include		http://guymcpherson.com/*
// ==/UserScript==
//=============================================================================

var version = "NBLblacklist version 1.0";
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
function filterComments()
{
   loadBlacklist();

   var allComments = document.getElementsByClassName('comment');
   var c;
   for (var i = 0; (c = allComments[i]) != null; i++)
   {
      var c_author = c.getElementsByTagName('cite')[0].textContent;
      if (c_author in blacklist)
      {
	 c_body = c.getElementsByClassName('content');
         // It might be nice to retain the author and date.
	 c_body[0].innerHTML = "<p>...filtered...</p>";
      }
   }
}

//=============================================================================
// Main

GM_registerMenuCommand("About NBLblacklist",doAbout);
GM_registerMenuCommand("Add user to blacklist",banUser);
GM_registerMenuCommand("Remove user from blacklist",unbanUser);
GM_registerMenuCommand("Show blacklisted users",showBlacklist);

filterComments();
