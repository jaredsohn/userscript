// ==UserScript==
// @name       Scrap.TF Chat Tab Name Completion
// @namespace  http://use.i.E.your.homepage/
// @version    1.0.3
// @description  Does tab completion for names
// @match      http://scrap.tf/*
// @copyright  2014+, Andrew Silver
// @grant none
// ==/UserScript==


var oldBindSocket = window.bindSocket;

window.bindSocket = function() {
	oldBindSocket();
    window.roomList={};
    socket.on('rooms',function(data){window.roomList=data;});
    var lastCharWasTab = false;
    var tabIndex = 0;
    var tabNames = [];
    var oldOnKeyDown = document.getElementById("chat-input-txt").onkeydown;
    document.getElementById("chat-input-txt").onkeydown = function(e) {
        oldOnKeyDown(e);
        if(e.keyCode == 9 && !e.altGraphKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
            e.preventDefault();
            var chatInput = this;
            if(roomList.rooms.ListOfUsers.some(function(str){str = htmlDecode(str.replace(/<i style="color:red" class="icon-heart"><\/i>/g, "<3")); return str == chatInput.value.substring(chatInput.value.length - str.length);}) && lastCharWasTab) {
                var currText = chatInput.value.substr(0,chatInput.value.length-tabNames[tabIndex][0].length);
                tabIndex++;
                if (tabIndex == tabNames.length)
                    tabIndex = 0;
                chatInput.value = currText + tabNames[tabIndex][0];
                return;
            }
            var matchWord = this.value.split(" ");
            var matchList = [];
            roomList.rooms.ListOfUsers.forEach(function(str) {
                str = htmlDecode(str.replace(/<i style="color:red" class="icon-heart"><\/i>/g, "<3"));
                var matchWordTest = matchWord.slice(0);
                matchWord.some(function(matchStr) {
                    if(new RegExp(matchWordTest.join(" ").replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i").test(str)) {
                        matchList.push([str, matchWordTest]);
                        return true;
                    } else {
                        matchWordTest.splice(0,1);
                    }
                });
            });
            if(matchList.length > 0) {
                matchList.sort(function(a,b){return b[1].length - a[1].length;});
                if(matchList[0][1].length == 1 && matchList[0][1][0] == "")
                    return;
                var txtArr = chatInput.value.split(" ");
                txtArr.splice(-matchList[0][1].length);
                chatInput.value = txtArr.join(" ") + (txtArr.length ? " " : "") + matchList[0][0];
            }
            tabNames = matchList;
            tabIndex = 0;
            lastCharWasTab = true;
        } else {
            lastCharWasTab = false;
        }
    };
};