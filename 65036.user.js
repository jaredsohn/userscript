// ==UserScript==
// @name           Hello
// @namespace      CHSdawg@gmail.com
// @include        http://www.cybernations.net/send_message.asp?Nation_ID=*
// ==/UserScript==
subject = document.getElementsByTagName("input")[2];
subject.setAttribute("value","Want 80 mil?");

textarea = document.getElementsByTagName("message-status")[1];
recruit_message = "Avé,\n\My name is BEazy and we would like to invite you to Order of the Sword. We are based off a Knight/Cult theme and I want you to join us. Don't worry about bringing your own clothes. We have more than enough right now.\n\We offer our new recruits the following:\n\- Aid: You could receive 80 million dollars from us all we ask for is activity and friendliness  \n\-trades: We will help you figure out your trades to maximize your economy.\n\- Information: Whether you've played for one day or a hundred, we have guides and veterans to help you out.\n\If interested, change your Affiliation to:\n\Order of the Sword\n\And register on our forums to post an application;\n\swordorder.com/forums \n\Take care, \n\BEazy \n\PS: if you have any questions about the alliance or the game, pm me"
textarea.innerHTML = recruit_message;
