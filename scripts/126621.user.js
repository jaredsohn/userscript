// ==UserScript==
// @name MFC Chat Box Scroll Fix
// @version	0.1.1
// @description	Fixes the problem where the chatbox scrolls up wierdly after the model updates the topic.
// @include	http://www.myfreecams.com/*

// ==/UserScript==

//todo:
//1. Im suspicious that there is a bug with removing the first child after message cap is reached where it will eventually remove all msgs
//3. Embed images in script somehow
//4. Populate new chat box with existing messages on startup (works on model switch but not the very first time)
if (0 === window.location.href.indexOf('http://www.myfreecams.com/')) {
    var ChatFix = (function () {
        GM_addStyle('.hidden {display: none;} .newChat {height: 100%; width: 100%; overflow-x: hidden; overflow-y: auto; overflow:auto} .options{position:absolute; top:0; right:20px; z-index: 999} .options img {cursor: hand;}');
        var scrollFixAdded = false, scrollNewChat = true, modelChangedInterval, currentModelID, chatCount = 0, maxChatCount = 100;
        var newChat, scrollImg;

        var findPlayer = setInterval(function () {
            if (document.querySelector("#chat_contents")) {
                //found a chatbox--add the fix
                if (!scrollFixAdded) {
                    addScrollFix();
                    scrollFixAdded = true;
                    modelChangedInterval = setInterval(function () {
                        var video = document.querySelector("object#fvideo");
                        if (null !== video) {
                            var modelID = document.querySelector("object#fvideo param[name='flashvars']").value.match(/modelID=(\d*)/)[1];
                            if (modelID !== currentModelID) {
                                currentModelID = modelID;
                                modelChanged();
                            }
                        }
                    }, 1000);
                }
            } else {
                scrollFixAdded = false; //user navigated somewhere without a chatbox
                clearInterval(modelChangedInterval);
            }
        }, 1000);

        function modelChanged() {
            if (newChat.hasChildNodes()) {
                while (newChat.childNodes.length >= 1) {
                    newChat.removeChild(newChat.firstChild);
                }
            }
            chatCount = 0;
        }

        function addScrollFix() {
            //set up a listener for the original chat contents and hide it
            //        var msgs = document.querySelectorAll("#chat_contents *");
            document.querySelector('#chat_contents').addEventListener('DOMNodeInserted', handleNewChatMsg);
            document.querySelector("#chat_contents").setAttribute('class', 'hidden');

            //add an options div
            var chatBox = document.querySelector('#chat_box');

            var options = document.createElement('div');
            options.setAttribute('class', 'options');

            scrollImg = document.createElement('img');
            scrollImg.setAttribute('src', 'http://dl.dropbox.com/u/9659390/MFCAssistant/stop1normalorange.png');
            scrollImg.setAttribute('title', 'Pause chat scrolling');
            scrollImg.addEventListener('click', toggleScroll);
            options.appendChild(scrollImg);

            chatBox.appendChild(options);

            //newChat = document.createElement('div');
            newChat = document.querySelector('#chat_contents').cloneNode(true);
            newChat.setAttribute('class', 'newChat');
            chatBox.appendChild(newChat);

            //        //populate with existing messages
            //        setTimeout(function () {
            //            console.log(msgs.length);
            //            for (var i = 0; i < msgs.length; i++)
            //                newChat.appendChild(msgs[i].cloneNode(true));
            //        }, 1000);
        }

        function handleNewChatMsg(e) {
            chatCount++;

            //cap the number of chat messages allowed
            if (chatCount > maxChatCount)
                newChat.removeChild(newChat.firstChild);

            //add the element
            var chatMsg = e.srcElement ? e.srcElement : e.target;
            newChat.appendChild(chatMsg);
            //add onload handlers for images
            try {
                var imgs = chatMsg.querySelectorAll('img');
                for (var i = 0; i < imgs.length; i++)
                    imgs[i].addEventListener('load', imgScroll);
            } catch (e) {
                //don't do anything here; just catch errors thrown by calling querySelectorAll on elements that dont have it
            }
            //scroll now
            scrollToBottomOfChat();
        }

        function imgScroll() {
            setTimeout(scrollToBottomOfChat, 300); //adding a slight delay here for a small bug that occurs sometimes when multiple images are included
        }

        function scrollToBottomOfChat() {
            if (scrollNewChat)
                newChat.scrollTop = newChat.scrollHeight;
        }

        function toggleScroll() {
            scrollNewChat = !scrollNewChat;
            if (scrollNewChat) {
                scrollImg.setAttribute('src', 'http://dl.dropbox.com/u/9659390/MFCAssistant/stop1normalorange.png');
                scrollImg.setAttribute('title', 'Pause chat scrolling');
                scrollToBottomOfChat();
            } else {
                scrollImg.setAttribute('src', 'http://dl.dropbox.com/u/9659390/MFCAssistant/stepforwardnormalorange.png');
                scrollImg.setAttribute('title', 'Resume chat scrolling');
            }
        }
    } ());
}