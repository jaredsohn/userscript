// ==UserScript==
// @name SDMB highlight old threads in forum
// @namespace Polerius
// @description In forum pages, highlights threads that are suspected of being very old
// @include http://boards.straightdope.com/sdmb/forumdisplay.php*
// ==/UserScript==
(function() 
 {
 var allThreads = document.getElementsByClassName('alt1');
 var std = 0;
 var avg = 0;
 var cnt = 0;
 var num_sticky = 0;
 var thread_id;
 // Find all thread id's
 for (var i = 0; i < allThreads.length; i++)
 {
 if( allThreads[i].innerHTML.match(/thread_statusicon_(\d+)/))
 {
 thread_id = RegExp.$1;
 avg += thread_id*1;
 cnt += 1;
 std += thread_id*thread_id;
 
 //discard extreme outliers (>100000 from mean)
 if (thread_id*1 < avg / cnt - 100000)
 {
 avg -= thread_id*1
 cnt -= 1;
 std -= thread_id*thread_id
 }
 
 }
 else if( allThreads[i].innerHTML.match(/alt=\"Sticky Thread\"/))
 {
 // "Exclude sticky threads
 if (thread_id*1 >= avg / cnt - 100000) //account for outlier removal
 {
 num_sticky++;
 std -= thread_id*thread_id;
 avg -= thread_id*1;
 cnt -= 1;
 }
 }
 }
 avg /= cnt;
 std = Math.sqrt((std - cnt*avg*avg)/(cnt-1));
 // Find all thread id's and mark the old ones (whose id is less than one std below the mean)
 // Exclude the sticky ones on top of the forum
 for (var i = 0; i < allThreads.length; i++)
 {
 if( allThreads[i].innerHTML.match(/thread_statusicon_(\d+)/))
 {
 if((num_sticky--) <= 0)
 {
 thread_id = RegExp.$1;
 if (thread_id < (avg - std))
 {
 allThreads[i].innerHTML = "<span style=\"font-size:12px;text-align:center;color:#ff0000;\">OLD!</span>" + allThreads[i].innerHTML;
 }
 }
 }
 }
 //alert(Math.round(avg) + " " + Math.round(std) + " " + Math.round(avg-std));
 })();