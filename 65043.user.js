// ==UserScript==
// @name           Hello from Skingrad
// @namespace      CHSdawg@gmail.com
// @include        http://www.cybernations.net/send_message.asp?Nation_ID=*
// ==/UserScript==
subject = document.getElementsByTagName("input")[2];
subject.setAttribute("value","Reach for the Sword");

textarea = document.getElementsByTagName("textarea")[1];
recruit_message = "Avé,\n\My name is Skingrad and we would like to invite you to join our well respected alliance.. We are based off a Knight theme and want you to join us. Order of the Sword is a group of like-minded nations who offer protection, help, and social interaction. That said, alliances cannot (and will not) replace your girlfriend. I'm sorry\n\nWe offer our new recruits the following:\n\- Aid: You will receive three million upon signing up and an additional 3 million after you finish the academy course.\n\-Deals: We offer the chance for you to get More than 50 mil in Tech deals. -trades: we will help you figure out your trades to maximize your economy.\n\- Information: Whether you've played for one day or a hundred, we have guides and veterans to help you out.\n\nIf interested, change your Affiliation to:\n\nSword Applicant\n\And register on our forums to post an application;\n\swordorder.com/forums \n\Take care, \n\Skingrad \n\PS: if you have any questions about the alliance or the game, pm me"
textarea.innerHTML = recruit_message;
