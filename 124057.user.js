// ==UserScript==
// @name           Kongregate Forum Filter
// @namespace      whateverwhateverwhateverwhateverwhateverwhatever
// @description    Remove threads.
// @include        http://www.kongregate.com/forums/*
// ==/UserScript==

/*HOW TO USE:

1: Find a thread that you want to get rid of.
2: Add a new entry to the list below (the part after "var t=["...)
  > Type the full name of the thread (CAPS DO MATTER) between slashes (/).
  > If the thread title has any of the following characters: /[-\{}()*+?.,\^$|# as a part
   of its name, you'll have to add this slash (\) before the character. 
   ie, If the thread's title is: Level 65! (finally) you'll have to type /Level 65! \(finally\)/
  > If the above doesn't work, you can copy a part of the thread's URL instead of its name.
	just make sure to add a \ before every hyphen (-)
  > Make sure to separate each entry with a comma.
   ie;
   var t=[
   /this thread sucks/,
   /wanna be my lover\?/,
   /annoying sticky/
   ]
3: Refresh the page: thread is gone forever!

EXAMPLE:

Let's say we want to remove a thread.
Its name is: EARN FREE MONEY!!!
Its URL is: http://www.kongregate.com/forums/1-kongregate/topics/838925-earn-free-money

To remove it, we can use any of the following options:
/EARN FREE MONEY!!!/ 
/FREE MONEY/ <- This will remove all the threads with "FREE MONEY" as a part of its name.
/925\-earn/  <- We used a part of the URL. This will keep it hidden even if the OP changes the thread's title.

That's it, if you have any questions, drop me a PM on Kong or post it on this thread:
http://www.kongregate.com/forums/1-kongregate/topics/239154-kongregate-forum-filter

                          - Senekis.
*/


var t=[
//enter the information here. 
], //DON'T MODIFY ANYTHING BEYOND THIS POINT!!
D=document,p=g("c2",D,"td"),r=[],l1=p.length,l2=t.length;
for(i=0;i<l1;i++){for(j=0;j<l2;++j){if(p[i].innerHTML.search(t[j])>-1){r[r.length]=p[i];}}}
l3=r.length;for(i=0;i<l3;i++)r[i].parentNode.parentNode.removeChild(r[i].parentNode);
function g(c,n,t){var e=[],E=n.getElementsByTagName(t),r=new RegExp("(^|\\s)"+c+"(\\s|$)"),l4=E.length;
for(i=0,j=0;i<l4;i++){if(r.test(E[i].className)){e[j]=E[i];j++;}}return e;}
