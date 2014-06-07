// ==UserScript==
// @name           GLB Mods Forum Rules
// @namespace      Yes!.
// @description    Shortcut rules mod with dropdown of rules and autofill reply box
// @include  	   http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

var statusDiv = document.createElement("div");
statusDiv.id = "statusDiv";
document.getElementById("reply_content").parentNode.insertBefore(statusDiv, document.getElementById("reply_content"));
GM_addStyle("#statusDiv {padding:10px; margin:10px;};");

var url = document.location.href;
var thread = url.split("thread_id=", 2);
var thread2 = thread[1].split("&", 2);
var str1 = getElementsByClassName("big_head subhead_head", document);
var str = str1[0].innerHTML;
var test = str.split('/game/forum_thread_list.pl?forum_id=', 5);
var test_length = test.length - 1;
var test2 = test[test_length].split("\"", 2);
var forum = "http://goallineblitz.com/game/forum_thread_list.pl?forum_id=" + test2[0] + "&thread_id=" + thread2[0];
var lock = forum + "&lock=1";

var div = document.getElementById("statusDiv");
var html = "<select name=rules onchange='reply.value = this.options[this.selectedIndex].value;'><option></option><option value='* We encourage debate and lively discussion. However, we will not tolerate hate speech, personal attacks, racism, disparaging remarks about others sexuality, insulting posts, purposeless inflammatory posts, or other actions that degrade the site experience for other users. Please treat other people with respect, including the mods and administrators of this site.'>No hate speech, personal attacks, racism, purposeless inflammatory posts.</option><option value='* General trolling will not be tolerated. Unconstructive threads created with no other purpose but to complain or incite flaming will be locked or deleted.'>General trolling will not be tolerated.</option><option>* Please refrain from cursing/swearing excessively.</option><option value='* Do not create threads to complain about the actions of another user. If you have a problem with another user, please contact a moderator or customer support.'>Do not create threads to complain about the actions of another user.</option><option value='* Spamming, such as posting similar or the same thread over and over, or adding completely offtopic posts over and over to an existing thread, is not allowed.'>No Thread Spamming</option><option value='* Please refrain from posting meaningless one-line posts, such as IB4L, wat, or fail. If you want to post, please contribute to the conversation.'>Please refrain from meaningless one-line posts</option><option value='* Please avoid hook threads. This means threads that have titles such as How do I... or What do you think of... that are intended to bait other users into clicking on the thread.'>No Hook Threads.</option><option value='* Do not post quote pyramids. This means posting quotes of other quotes multiple times in order to try and stretch out the page.'>Do not post quote pyramids.</option><option value='* Please wait a reasonable amount of time before bumping a thread, such as waiting until it reaches the second page.'>Please wait a reasonable amount of time before bumping a thread</option><option value='* Please do not bump threads that are old, such as threads that are past the second or third page. Threads bumped in this manner may be locked.'>Please do not bump old threads.</option><option value='* Please post recruiting threads in the proper section. Threads posted in the wrong section will be moved, and repeated offenses will result in a suspension of posting privileges.'>Please post recruiting threads in the proper section.</option><option>* Do not post links to sexual content or pornography. Keep it PG-13.</option><option value='* Discussion of illegal activity, including warez links, pirating music and other copywritten materials, and cybercrimes are not allowed.'>Discussion of illegal activity, including warez links, etc</option><option value='* Discussing and/or planning spam or hack attempts on this site or any other site is not allowed, and will result in posting suspension or a forum ban.'>Discussing and/or planning spam or hack attempts</option><option value='* Do not post the content of Private Messages from other users without the users permission.'>Do not post the content of Private Messages</option><option value='* Do not share build or tactics information about a team or another player without the permission of the team owner or players agent.'>Do not share build or tactics information about a team without permission.</option><option value='* Creating another thread to discuss or ask why another thread was locked, deleted, or moved is not allowed. The additional threads will be locked or deleted as well.'>Creating a thread to discuss another locked, deleted, or moved thread.</option><option value='* Do not create threads asking why other users were suspended or banned. That information is private between the administation of the site and the user who was suspended.'>Do not create threads asking why other users were suspended or banned.</option><option>* No threads about how peoples teams should be taken away.</option><option>* No threads about how people should have been allowed to transfer leagues.</option><option>* No Look, Another Team Got Gutted threads.</option><option>* No Farm Team Threads.</option><option>* No Threads in the wrong forum.</option><option>* No Counting threads.</option><option>* No Profanity in thread titles.</option><option>* No Poll Threads.</option><option>* No Mods/Bort please look at this! threads.</option><option>* No Selling my team/Player threads.</option><option>* No How to Cheat threads.</option><option>* No The Game is Broken threads.</option><option>* No Give me FPs or When do we get our FPs threads.</option><option>* No Blank threads (not having a title or a post in it).</option><option>* No Who will lock this or Will this get locked threads or anything similar.</option><option>* No Worthless threads, i.e. Miller Test Here threads.</option><option>* No Blog threads - GLB isn't the place to seek attention like that.</option><option value='* No Posting 'real life' information of any member, including pictures, without their permission. This includes images and info taken from the members MySpace, Facebook, or blog page.'>No Posting RL information of any member</option><option value='* Please note that just because something is not listed here, does not mean it will not be eligible for moderation. We are attempting to maintain a clean and fun environment for all users. Attempting to find loopholes in the rules to get away with things does not help promote that sort of environment.'>Not listed here.</option></select><br/><a href='"+lock+"'>Click to Lock this thread after Posting your reason below.</a>";
div.innerHTML = html;
