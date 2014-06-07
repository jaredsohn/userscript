// ==UserScript==
// @name        LiveFyreUserIgnore
// @namespace   faleij
// @description Ignore User's Comments on LiveFyre Comment Streams
// @include     *
// @version     1.11
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @updateURL  	http://userscripts.org/scripts/source/177226.meta.js
// @downloadURL http://userscripts.org/scripts/source/177226.user.js
// ==/UserScript==
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

var ignoredUsers = [];
var blockedUsers = {};

function SaveSettings(cb){
    setTimeout(function(){
        GM_setValue("ignoredUsers",ignoredUsers.join("|"));
        GM_setValue("blockedUsers",JSON.stringify(blockedUsers));
        processAllComments(document.body);
        if(cb) cb();
    },0);
}

function LoadSettings(cb){
    setTimeout(function(){
        ignoredUsers = GM_getValue("ignoredUsers","").split("|");
        blockedUsers = JSON.parse(GM_getValue("blockedUsers","{}"));
        if(cb) cb();
    },0);
}

LoadSettings();

function ExportIgnoredUsers(e){
    e.preventDefault();
    e.stopPropagation();
    LoadSettings(function(){
        window.location = ("data:application/octet-stream;base64,"+btoa(ignoredUsers.join("|")));
    });
}

function ExportBlockedUsers(e){
    e.preventDefault();
    e.stopPropagation();
    LoadSettings(function(){
        window.location = ("data:application/octet-stream;base64,"+btoa(JSON.stringify(blockedUsers)));
    });
}

function ResetSettings(e){
    e.preventDefault();
    e.stopPropagation();
    LoadSettings(function(){
        if(confirm("Confirm discarding of the entire Ignored Users list")){
            ignoredUsers = [];
        }
        if(confirm("Confirm discarding of the entire Blocked Users list")){
            blockedUsers = {};
        }
        SaveSettings();
    });
}

function ImportIgnoredUsers(evt){
    if(evt.target.files.length){
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function(e) {
            LoadSettings(function(){
                var imported = e.target.result.split("|").filter( function (value, index){ return ignoredUsers.indexOf(value) === -1; } );
                if(confirm("Confirm adding "+imported.length+" unique entries from the imported file to the Ignored Users list?\nDuplicate entries have be discarded.")){
                    ignoredUsers = ignoredUsers.concat(imported);
                    SaveSettings();
                    alert("Imported "+ imported.length +" entries successfully!");
                }
            });
        };
        reader.readAsText(file);
    }
}

function GetDictKeys(obj){
    var keys = [];

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    return keys;
}

function ImportBlockedUsers(evt){
    if(evt.target.files.length){
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function(e) {
            LoadSettings(function(){
                var imported = JSON.parse(e.target.result);
                var keys = GetDictKeys(imported);
                keys.filter( function (value, index){ if(blockedUsers[value]) return true; else return false; } );
                if(confirm("Confirm adding "+keys.length+" unique entries from the imported file to the Blocked Users list?\nDuplicate entries have be discarded.")){
                    keys.forEach(function(value){ blockedUsers[value] = imported[value]; })
                    SaveSettings(function(){
                        alert("Imported "+ keys.length +" entries successfully!");
                    });
                }
            });
        };
        reader.readAsText(file);
    }
}

function isIgnored(id){
    return (ignoredUsers.indexOf(id)!==-1);
}

function isBlocked(id){
    if (id in blockedUsers) return true;
    return false;
}

GM_addStyle("" +
    ".faleij-fmid-hidden {" +
    "   display: none !important;" +
    "}");

function hide(comment){
    try{
        comment.querySelector(".fyre-comment-body").classList.add("faleij-fmid-hidden");
        comment.querySelector(".fyre-comment-user").classList.add("faleij-fmid-hidden");
        comment.querySelector(".fyre-comment-footer").classList.add("faleij-fmid-hidden");
    }catch(err){

    }
}

function show(comment){
    try{
        comment.querySelector(".fyre-comment-body").classList.remove("faleij-fmid-hidden");
        comment.querySelector(".fyre-comment-user").classList.remove("faleij-fmid-hidden");
        comment.querySelector(".fyre-comment-footer").classList.remove("faleij-fmid-hidden");
    }catch(err){

    }
}

function remove(comment){
    try{
        comment.classList.add("faleij-fmid-hidden");
    }catch(err){
        console.error("cant remove comment!");
    }
}

function add(comment){
    try{
        comment.classList.remove("faleij-fmid-hidden");
    }catch(err){

    }
}

function processComment(comment){
    setTimeout(function(){
    var id = this.getAttribute("data-author-id");
    if(id){
        if(isBlocked(id)){
            remove(this);
        }else{
            add(this);
            if(isIgnored(id))
                hide(this);
            else
                show(this);
        }
        addButton(this);
    }
    }.bind(comment),1000);
}

function processAllComments(stream){
    setTimeout(function(){
        [].slice.call(stream.querySelectorAll(".fyre-comment-article[data-author-id]")).forEach(processComment);
    },1);
}

function unignoreUser(button){
    var id = button.getAttribute("data-author-id");
    console.log("unignoring user-id:", id);
    LoadSettings(function(){
    var idx = ignoredUsers.indexOf(id);
        if(idx!==-1){
            ignoredUsers.splice(idx,1);
            SaveSettings();
        }
        button.innerHTML = "Ignore User";
        button.addEventListener("click",ignoreButtonClick);
    });
}

function ignoreUser(button){
    var id = button.getAttribute("data-author-id");
    console.log("ignoring user-id:", id);
    LoadSettings(function(){
        if(ignoredUsers.indexOf(id)===-1){
            ignoredUsers.push(id);
            SaveSettings();
        }else{
            console.error("this should not appear!");
        }

        button.innerHTML = "Unignore User";
        button.addEventListener("click",unignoreButtonClick);
    });
}

function blockUser(button){
    var id = button.getAttribute("data-author-id");
    var from = button.getAttribute("data-from");
    console.log("blocking user-id:", id);
    LoadSettings(function(){
        if(!isBlocked(id)){
            if(confirm("Are you sure you want to block "+from+"?")){
                blockedUsers[id] = from;
                SaveSettings();
            }
        }else{
            console.error("this should not appear!");
        }
    });
}

var unignoreButtonClick = function (e){
    e.preventDefault();
    e.stopPropagation();
    setTimeout(function(){
        unignoreUser(this);
    }.bind(this),10);
    this.removeEventListener("click", unignoreButtonClick);
}

var ignoreButtonClick = function (e){
    e.preventDefault();
    e.stopPropagation();
    setTimeout(function(){
        ignoreUser(this);
    }.bind(this),10);
    this.removeEventListener("click", ignoreButtonClick);
}

var blockButtonClick = function (e){
    e.preventDefault();
    e.stopPropagation();
    setTimeout(function(){
        blockUser(this);
    }.bind(this),10);
    this.removeEventListener("click", blockButtonClick);
}

function addButton(comment){
    var ignoreButton = comment.querySelector(".faleijs-ignore-button") || document.createElement("a");
    var blockButton = comment.querySelector(".faleijs-block-button") || document.createElement("a");
    ignoreButton.className = "fyre-comment-action-button faleijs-ignore-button fyre-comment-like-btn";
    blockButton.className = "fyre-comment-action-button faleijs-block-button fyre-comment-like-btn";
    blockButton.innerHTML = " Block User";
    blockButton.removeEventListener("click", blockButtonClick);

    var id = comment.getAttribute("data-author-id");
    var from = comment.querySelector(".fyre-comment-user[data-from]").getAttribute("data-from");
    if(id){
        ignoreButton.setAttribute("data-author-id", id);
        blockButton.setAttribute("data-author-id", id);
        blockButton.setAttribute("data-from", from);

        ignoreButton.removeEventListener("click",unignoreButtonClick);
        ignoreButton.removeEventListener("click",ignoreButtonClick);

        if(isIgnored(id)){
            ignoreButton.innerHTML = "Unignore User";
            ignoreButton.addEventListener("click",unignoreButtonClick);
        }else{
            ignoreButton.innerHTML = "Ignore User";
            ignoreButton.addEventListener("click",ignoreButtonClick);
        }

        blockButton.addEventListener("click", blockButtonClick);

        var date = comment.querySelector(".fyre-comment-date");
        if(date){
            date.parentNode.insertBefore(ignoreButton, date);
            date.parentNode.insertBefore(blockButton, date);
        }else{
            console.error("no date for comment:",comment);
        }
    }else{
        console.error("no id for comment:",comment);
    }
}

var streamInitiator = (function(){
    var initiated = [];

    var ignoredUsersFileSelect = document.createElement("input");
    ignoredUsersFileSelect.type = "file";
    ignoredUsersFileSelect.addEventListener("change", ImportIgnoredUsers);

    var blockedUsersFileSelect = document.createElement("input");
    blockedUsersFileSelect.type = "file";
    blockedUsersFileSelect.addEventListener("change", ImportBlockedUsers);

    function CreateUnblock(e){
        e.preventDefault();
        e.stopPropagation();

        var fyreStats = this.querySelector(".fyre-stream-stats");

        var _el = fyreStats.querySelector(".faleij-unblocker");
        if(_el) fyreStats.removeChild(_el);

        var el = document.createElement("div");
        el.className = "faleij-unblocker";
        el.style = "height: 260px;width: 300px; position: absolute;background-color: whitesmoke;z-index: 2000;" +
            "padding: 5px;margin: auto;left: 25%;border: 1px solid grey;box-shadow: 0px 25px 35px grey;";
        var select = document.createElement("select");
        select.multiple = true;
        select.size = 10;
        select.style.width="100%";
        select.title = "Hold CTRL to select multiple or deselect entries.";

        for(var key in blockedUsers){
            var option = document.createElement("option");
            option.value = key;
            option.innerHTML = blockedUsers[key] +  " ("+key+")";
            select.appendChild(option);
        }

        var apply = document.createElement("button");
        apply.innerHTML = "Apply";
        apply.addEventListener("click",function(){
            [].slice.call(select.selectedOptions).forEach(function(selected){
                delete blockedUsers[selected.value];
            });
            SaveSettings(function(){
                el.innerHTML = "<span>Applied!</span><time class='fyre-comment-date'>Auto closing in 3 seconds.</time>";
                setTimeout(function(){
                    fyreStats.removeChild(el);
                },3*1000);
            });
        });

        var title = document.createElement("span");
        title.innerHTML="Unblock Users";

        el.appendChild(title);
        el.appendChild(select);
        el.appendChild(apply);
        fyreStats.appendChild(el);
    }

    return function(stream){
        if(initiated.indexOf(stream)!==-1){
            console.log("stream already initiated!");
            return;
        }
        initiated.push(stream);

        var importIgnoredUsersLink = document.createElement("li");
        importIgnoredUsersLink.innerHTML = "<a title='Import Ignored Users' href='#'>Import Ignored Users</a>";
        importIgnoredUsersLink.firstChild.addEventListener("click",function(e){
            ignoredUsersFileSelect.click();
            e.preventDefault();
            return false;
        });

        var importBlockedUsersLink = document.createElement("li");
        importBlockedUsersLink.innerHTML = "<a title='Import Blocked Users' href='#'>Import Blocked Users</a>";
        importBlockedUsersLink.firstChild.addEventListener("click",function(e){
            blockedUsersFileSelect.click();
            e.preventDefault();
            return false;
        });

        var exportIgnoredUsersLink = document.createElement("li");
        exportIgnoredUsersLink.innerHTML = "<a title='Export Ignored Users' href='#'>Export Ignored Users</a>";
        exportIgnoredUsersLink.firstChild.addEventListener("click", ExportIgnoredUsers);

        var exportBlockedUsersLink = document.createElement("li");
        exportBlockedUsersLink.innerHTML = "<a title='Export Blocked Users' href='#'>Export Blocked Users</a>";
        exportBlockedUsersLink.firstChild.addEventListener("click", ExportBlockedUsers);

        var resetLink = document.createElement("li");
        resetLink.innerHTML = "<a title='Reset Ignored Users' href='#'>Reset Ignored or Blocked Users</a>";
        resetLink.firstChild.addEventListener("click", ResetSettings);

        var unblockLink = document.createElement("li");
        unblockLink.innerHTML = "<a title='Unblock Blocked User(s)' href='#'>Unblock Blocked User(s)</a>";
        unblockLink.firstChild.addEventListener("click", CreateUnblock.bind(stream.parentNode.parentNode.parentNode));

        var fyreBox = stream.parentNode.parentNode.parentNode.querySelector(".fyre-box-list");

        if(fyreBox){
            fyreBox.appendChild(importIgnoredUsersLink);
            fyreBox.appendChild(importBlockedUsersLink);
            fyreBox.appendChild(exportIgnoredUsersLink);
            fyreBox.appendChild(exportBlockedUsersLink);
            fyreBox.appendChild(unblockLink);
            fyreBox.appendChild(resetLink);
        }else{
            console.error("no fyreBox!");
        }

        var observer = new MutationObserver(function(mutations) {
            var check = false;
            mutations.forEach(function(mutation) {
                if(mutation.type === "childList" && mutation.addedNodes.length){
                    console.log(mutation);
                    var comments = [].slice.call(mutation.addedNodes).filter(function(node){
                        if(node.classList){
                            if(node.classList.contains("fyre-comment-article")){
                                return true;
                            }
                        }
                        return false
                    });
                    if(comments.length){
                        LoadSettings();
                        //comments.forEach(processComment);
                        check = true;
                    }
                }else{
                    console.log(mutation);
                }
            });
            if(check) processAllComments(stream);
        });

        var observerSettings = {
            childList: true,
            subtree: true
        };

        observer.observe(stream, observerSettings);
        console.log("faleij: observing stream", stream);

        processAllComments(stream);
        console.log("faleij: processed initial comments");
    }
})();

(function(){
    var found = false;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.type === "childList" && mutation.addedNodes.length){
                [].slice.call(mutation.addedNodes).forEach(function(node){
                    if(node.querySelectorAll){
                        var streams = node.querySelectorAll('.fyre-comment-stream>.fyre-stream-content');
                        if(streams.length){
                            console.log("faleij: found new stream to initiate!",streams);
                            [].slice.call(streams).forEach(streamInitiator); //initiate each stream
                            found = true;
                        }
                    }
                });
            }});
    });

    var observerSettings = {
        childList: true,
        subtree: true
    };

    observer.observe(document.body, observerSettings);

    setTimeout(function(){
        //stop trying to find lifeFyre after 5 minutes if it has not been found
        if(!found) observer.disconnect();
    }, 1000*60*5);
})();