// ==UserScript==
// @name           Adding a buttons for input and excuting code/getting and setting Variables
// @description    Adds a "hack" button 
// @namespace      
// @include        
// @version 0.1
// @creator wethecom@gmail
// ==/UserScript==

dummyDiv = document.createElement('div');//Note there can be no contorl linfeeds in next line...i use notepad++ to edit all this code because it shows linfeeds as LF
dummyDiv.innerHTML = '<div><input type=\"button\" value=\" hack \" onClick=\"cba(stuff) \"><br /><input type=\"text\" name=\"thecode\" size=9 value=\"\"><br /></div>';//this function dynamically adds a button with a new function in real time
document.body.insertBefore(dummyDiv.firstChild, document.body.firstChild);//this insert aboved mentioned into thepage

unsafeWindow.abc = function(b) {// here we go a real function added to the page
  alert(b);
  //setTimeout("window.abc()", 2000);this is a timer that excute over and over
}
unsafeWindow.cba = function() {//this is how to make a function on the actual page in print...without unsafewindow  it would just be excuted inside grease monkey and destoryed...this can be called over and over
myDiv = document.createElement('div');//Note there can be no contorl linfeeds in next line
  myDiv.innerHTML = '<div><input type=\"button\" value=\" crack \" onClick=\"abc(stuff) \"><br /><input type=\"text\" name=\"thecode\" size=9 value=\"\"><br /></div>';//this is code for a button and a function call
  document.body.insertBefore(myDiv.firstChild, document.body.firstChild);//this insert aboved mentioned into thepage
}
unsafeWindow.stuff = "yes";//this is a variable that can be called anytime..you can make functions this way to
abcde = "hello";//this type of variable is refrenced on load and destroyed never to be seen again
alert(abcde);//this is a function call on load that gets destroyed
