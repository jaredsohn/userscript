// ==UserScript==
// @name           VIP
// @namespace      http://forum.fr2db.fr/
// @description    Secrets ;)
// @include        http://forum.fr2db.fr/*
// @exclude
// ==/UserScript==

var posts = document.getElementsByClassName('content');

for(postIndex = 0; postIndex < posts.length; postIndex++){
       var oldText = posts[postIndex].innerHTML;
       var newText = "";
       var going = "";
       var msg = "";

       for (x = 0; x < oldText.length; x++){
               newText += oldText[x];
               if (oldText.substring(x,x+5).toLowerCase() == "[vip]"){
                       going = "y";
               }
               if (going == "y"){
                       if (oldText.substring(x,x+6).toLowerCase() == "[/vip]"){
                               going = "n";
                               newText += oldText.substring(x+1, x + 6);
                               x +=5;
                       }else{
                               msg += oldText[x];
                       }
               if (going == "n"){
                       var message = msg.toUpperCase();
                       message = message.substring(5);

                       var alphabet, coded, i, ch, index;
                       key = "QWPOERIUTYLKASJHDFGMNZXBCV";
                       alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                       coded = "";
                               for (i = 0; i < message.length; i++) {
                                       ch = message.charAt(i);
                                       index = alphabet.indexOf(ch);
                                       if (index == -1) {
                                           coded += ch;
                                       }else {
                                           coded += key.charAt(index);
                                       }
                               }
                               msg = "";
                               newText = newText + '<font color="red"><br> DECODED MESSAGE: ' +
coded + "</font>";
                       }
               }
       }
document.getElementsByClassName('content')[postIndex].innerHTML = newText;
}

var kp = -1;


function keyHandler(event) {
	if ( kp == 18 && event.keyCode == 67 ) {
		var msg = prompt("Enter UnEncoded Message: ", "Generic Message");

		       var message = msg.toUpperCase();

                       var alphabet, coded, i, ch, index;
                       key = "QWPOERIUTYLKASJHDFGMNZXBCV";
                       alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                       coded = "";
                               for (i = 0; i < message.length; i++) {
                                       ch = message.charAt(i);
                                       index = key.indexOf(ch);
                                       if (index == -1) {
                                           coded += ch;
                                       }else {
                                           coded += alphabet.charAt(index);
                                       }
                               }
			alert("[VIP]" + coded + "[/VIP]");
	} else {
		kp = event.keyCode;
	}
	return false;
}

window.addEventListener('keydown', keyHandler, false);


