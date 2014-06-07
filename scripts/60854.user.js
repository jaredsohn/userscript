// ==UserScript==
// @name           cn_recruiting
// @namespace      TodZumTeufel@gmail.com
// @include        http://www.cybernations.net/send_message.asp?Nation_ID=*
// ==/UserScript==
subject = document.getElementsByTagName("input")[2];
subject.setAttribute("value","12 Million dollars");

textarea = document.getElementsByTagName("textarea")[1];
recruit_message = "Hello, and welcome to Cybernations. The most important aspect of this game are alliances. Countries identify themselves with their alliance. Alliances members fight for one another in war. Alliances go to war with one another.Choosing your alliance is the most important decision you will make in the game.\n\nI am the leader of the Big Top Order. We can offer you several things for joining.\n\n1. A community to become a part of\n\n2. Protection from other nations\n\n3. ***12 MILLION DOLLARS IN NEW MEMBER ACTIVITY REWARD AID***\n\n4. Teaching and arranging tech deals, which make 2.25 million dollars of profit a week for you.\n\nIf you wish to apply, go to our forums at\n\nhttp://s1.zetaboards.com/Big_Top_Orde\n\nRegister an account and then go to the application center and follow the directions in the post titled application format. Most applications will be accepted pretty quickly.\n\nPls do not change your alliance affiliation until your applications has been accepted."
textarea.innerHTML = recruit_message;