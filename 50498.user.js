// ==UserScript==
// @name           cn_recruite_message
// @namespace      http://dnathe4th.porfusion.com/blog/
// @description    Adds the recruitment message to the text box
// @include        http://www.cybernations.net/send_message.asp?Nation_ID=*
// ==/UserScript==


subject = document.getElementsByTagName("input")[2];
subject.setAttribute("value","Welcome :-)");

textarea = document.getElementsByTagName("textarea")[1];
recruit_message = "Hi, my name is dnathe4th, a member of The Democratic Order.\n\nSoon you will receive many invitations from different alliances. Here I want to explain why we are a bit unique.\n\nTDO is strictly neutral, we only engage in war when attacked. This allows us to play the game to the fullest: develop trade, sell technology, analyse new strategies,... And yes, when necessary, do spy operations and fight wars.\n\nIf your main goal is to attack other nations, we are NOT the right alliance for you.\n\nBecause we are not focused on the military aspect alone, we do not need all that discipline and are a much more laid-back group. We generally believe that we have more fun in the game.\n\nSo, if you want to check us out, go to: http://z6.invisionfree.com/TDO1/index.php?act=idx\n\nAnd to show you what nice people we are, read this (it's FREE): http://z6.invisionfree.com/TDO1/index.php?showtopic=276\n\nRegardless, I'm here if you have any questions,\n\ndnathe4th\n\nPS: Oh, we do have start-up $";
textarea.innerHTML = recruit_message;