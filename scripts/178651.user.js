// ==UserScript==
// @name        BlockUsersOnGameStar
// @namespace   faleij
// @include     http://www.gamestar.hu/*
// @version     1.2
// ==/UserScript==

var blockstring;

function loadBlocked(cb){
    setTimeout(function(){
        blockstring = GM_getValue("blocked", "|");
        cb();
    },0);
}

function saveBlocked(){
    setTimeout(function(){
        GM_setValue("blocked", blockstring);
    },0);
}

function block(){
    loadBlocked(function(){
        blockstring += this+"|";
        saveBlocked();
        filter();
    }.bind(this));
}

function unblock(){
    loadBlocked(function(){
        blockstring = blockstring.replace("|"+this+"|","|");
        saveBlocked();
        filter();
    }.bind(this));
}

function createUnblockBtn(comment,username){
    var a = document.createElement("a");
    a.textContent = "Unblock "+username;
    a.addEventListener("click",unblock.bind(username));
    comment.parentNode.insertBefore(document.createElement("br"),comment);
    comment.parentNode.insertBefore(a,comment);
}

function filter(){
    var comments = document.querySelectorAll(".art_postcom");
    console.log(comments.length,comments);
    for (var i=0; i<comments.length; i++){
        var user = comments[i].querySelector(".art_pcuser");
        if(user){
            var username = user.textContent.trim();
            console.log(username);
            try{
                if (blockstring.indexOf("|"+ username +"|") !== -1){
                    comments[i].style.display = "none";
                    var createBtn = false;
                    if(comments[i].previousElementSibling){
                        if(comments[i].previousElementSibling.textContent !== "Unblock "+username){
                            createBtn = true;
                        }
                    }else{
                        createBtn = true;
                    }
                    if(createBtn) createUnblockBtn(comments[i],username);
                }else{
                    comments[i].style.display = "";
                    if(comments[i].previousElementSibling){
                        if(comments[i].previousElementSibling.textContent === "Unblock "+username){
                            comments[i].parentNode.removeChild(comments[i].previousElementSibling);
                            comments[i].parentNode.removeChild(comments[i].previousElementSibling);
                        }
                    }
                }

                if(user.nextElementSibling.textContent !== "Block User "){
                    var a = document.createElement("a");
                    a.textContent = "Block User ";
                    a.addEventListener("click",block.bind(username));
                    user.parentNode.insertBefore(a,user.nextElementSibling);
                }
            }catch(err){
                console.dir(err);
            }
        }
    }
}

loadBlocked(filter);

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

new MutationObserver(function(mutations) {
    console.log(mutations);
    var changed = false;
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length){
            changed = true;
        }});
    if(changed) filter();
}).observe(document.querySelector("#article_comments_container"),{childList: true,subtree: true});