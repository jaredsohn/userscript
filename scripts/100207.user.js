// ==UserScript==
// @name          BvS Video Challenge Spoiler
// @namespace     Stanotomic's Little Helper
// @description   Insert Correct Answers for the BvS Video Challenge
// @include       http://www.animecubed.com/billy/bvs/pages/main.html
// @licence       MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright     2011, Stano
// ==/UserScript==

//Video Challenge is the first table with white backgroundcolor
var hint;
var snap = document.evaluate("//table[@bgcolor='FFFFFF']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

//Different solutions
if (snap.snapshotItem(0).textContent.search(/popsicle.+/) != -1) hint = "4"; 
else if (snap.snapshotItem(0).textContent.search(/57 seconds into the DN Angel.+/) != -1) hint = "greatest"; 
else if (snap.snapshotItem(0).textContent.search(/In the Azumanga trailer.+/) != -1) hint = "6"; 
else if (snap.snapshotItem(0).textContent.search(/Chobits Trailer, 12 seconds.+/) != -1) hint = "partnership"; 
else if (snap.snapshotItem(0).textContent.search(/On the Gantz trailer.+/) != -1) hint = "45"; 
else if (snap.snapshotItem(0).textContent.search(/Evangelion trailer.+/) != -1) hint = "assingnment"; 
else if (snap.snapshotItem(0).textContent.search(/Best Student Council trailer.+/) != -1) hint = "broom"; 
else if (snap.snapshotItem(0).textContent.search(/The guy who shows up .+/) != -1) hint = "asahi"; 
else if (snap.snapshotItem(0).textContent.search(/Air Gear Trailer 2.+/) != -1) hint = "9"; 
else if (snap.snapshotItem(0).textContent.search(/On the Best Student Council Trailer.+/) != -1) hint = "3"; 
else if (snap.snapshotItem(0).textContent.search(/Slayers Trailer - 18 seconds.+/) != -1) hint = "hard"; 
else if (snap.snapshotItem(0).textContent.search(/Happy Lesson Trailer - 5 seconds in.+/) != -1) hint = "6"; 
else if (snap.snapshotItem(0).textContent.search(/Princess Tutu Trailer, 2 seconds.+/) != -1) hint = "upon"; 
else if (snap.snapshotItem(0).textContent.search(/Gantz trailer, 26 seconds in.+/) != -1) hint = "brutal"; 
else if (snap.snapshotItem(0).textContent.search(/In the Cromartie Trailer.+/) != -1) hint = "mother"; 


//Put the answer in 
var video = document.getElementsByName("videoroll");
video[0].value = hint;

/*
Gantz trailer, 26 seconds in. Word on the screen. Six letters, starts with 'B'.
-> brutal
Princess Tutu Trailer, 2 seconds in. Second word on the screen, 4 letters.
-> upon
Happy Lesson Trailer - 5 seconds in (you will probably have to pause it, it is quick). How many keys are on the table?
-> 6
Slayers Trailer - 18 seconds in. No matter how ____. 4 Letters
-> hard
57 seconds into the DN Angel Trailer, it says - and his _________. Eight letters. 
-> greatest
The guy who shows up in the Comic Party Trailer 5 seconds in has writing on his coat. one of the words is 5 letters long and starts with A. what is it?
-> asahi
On the Gantz trailer, right in the beginning, how many minutes are on the ball(2 digits, and it is between 40 and 50)
-> 45
Chobits Trailer, 12 seconds in. Words on the bottom of the screen. Last word. 11 letters.
-> partnership
Air Gear Trailer 2. 1:19. How many people are standing there? 
-> 9
Best Student Council trailer. 11 seconds in. The middle girl is holding something. What is it? 5 letters. 
-> broom
Evangelion trailer. 20 seconds in. type the word after 'pilot'. WARNING: it is spelled incorrectly, spell it just how it is spelled there. 11 letters.  
-> assingnment
On the Best Student Council Trailer, how many times does the puppet get tossed up before it gets tossed up along with a girl? 
-> 3
In the Azumanga trailer, how many girls pop up before the planes show?
-> 6
Cromartie trailer. 1:08. people 'pop' up, the last one that pops up has a popsicle. counting him, how many pop up?
-> 4
In the Cromartie Trailer, a letter to someone shows up right away. it says Dearest _______. six letters.
-> mother
*/