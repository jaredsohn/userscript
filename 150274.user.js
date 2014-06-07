// ==UserScript==
// @name			HF Scripts - Easy Report Minecraft
// @namespace 		xerotic-spafic/hfreportingriefing
//
// @author          Spafic/Xerotic
// @copyright       Spafic 2012 (http://userscripts.org/users/Spafic)/Xerotic
// @licence         GNU General Public License
//
// @downloadURL     http://userscripts.org/scripts/source/150274.user.js
// @updateURL       http://userscripts.org/scripts/source/150274.user.js
//
// @description 	Makes reporting posts/threads in Minecraft section to Dan. MUCH easier.
// @match     		*://*.hackforums.net/showthread.php?*
// @version  		1.1.4
// ==/UserScript==

(function(){var b,c,f,a,e,d;if(-1!=document.getElementsByClassName("navigation")[0].innerHTML.indexOf('<a href="forumdisplay.php?fid=179">Minecraft</a>')){b=document.getElementsByTagName("a");for(a=0;a<b.length;a++)c=b[a],-1!=c.href.indexOf("my_post_key")&&(f=c.href.split(/my_post_key\=/)[1]);if(-1!=document.body.innerHTML.indexOf("<\!-- start: showthread_classic_header --\>")){c=document.getElementsByTagName("td");b=[];for(a=0;a<c.length;z++)e=c[z],"right"==e.align&&(b[b.length]=e)}else b=document.getElementsByClassName("post_management_buttons");for(a=0;a<b.length;a++)c=document.createElement("span"),e=b[a],d=e.innerHTML.match(/pid\=(\d*)/),d=d[1],d='<form action="private.php" method="post" name="input" target="_blank" style="display:inline-block;"><input type="hidden" name="action" value="do_send" /><input type="hidden" name="pmid" value="" /><input type="hidden" name="do" value="" /><input type="hidden" name="icon" value="" /><input type="hidden" name="my_post_key" value="'+f+'" /><input type="hidden" name="uid" value="175033" /><input type="hidden" name="to" id="to" value="Dan." /><input type="hidden" name="subject" value="Minecraft Section Report" /><input type="hidden" name="options[signature]" value="1" /><input type="hidden" name="options[savecopy]" value="1" /><input type="hidden" name="options[readreceipt]" value="1" /><input type="submit" class="bitButton" name="submit" value="Minecraft Report" tabindex="9" accesskey="s" onclick="return confirm(\'Are you sure that you want to report this post to a moderator?\');"/><input type="hidden" name="message" value="Post: http://www.hackforums.net/showthread.php?pid='+d+"#pid"+d+'" /></form>',c.innerHTML=d,e.appendChild(c)}})();