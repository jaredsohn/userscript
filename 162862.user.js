// ==UserScript==
// @name       SOChatUserColors
// @version    1.3.1
// @description  color chat lines in a Stack Overflow chat room, using a different color for each user
// @match      http://chat.stackoverflow.com/rooms/*
// @match      http://chat.stackexchange.com/rooms/*
// @match      http://chat.meta.stackoverflow.com/rooms/*
// @match      http://chat.meta.stackexchange.com/rooms/*
// @match      http://chat.stackoverflow.com/transcript/*
// @match      http://chat.stackexchange.com/transcript/*
// @match      http://chat.meta.stackoverflow.com/transcript/*
// @copyright  2012+, Jan Dvorak
// @licence    Creative Commons with attribution
// ==/UserScript==

var main = function(){
    var $presentUsers = $("#present-users");
    var $chat = $(".monologue").parent().add("#chat");
    var $style = $("<style>");
    var isMobile = /( |^)mc=1/.test(document.cookie);
    
    //element not present in the transcript
    $presentUsers.each(function(){ 
        new MutationObserver(refresh).observe(this, {childList:true, subtree:true});
    });
    var pastUsersMO = new MutationObserver(addPastUsers);
    pastUsersMO.observe($chat[0], {childList:true, subtree:true});
    $style.appendTo(document.head);
    var pastUsers = {};
    addPastUsers();
    
    function addPastUsers(records){
        //currently (nov 2013) a profile link is added even before user data is loaded. 
        //In case this ever changes, the second condition will kick in
        if($(".monologue").length && !$(".username:not(a *):not(:has(a))").length){
            pastUsersMO.disconnect();
        }
        $(".monologue").each(function(){
            var $profileLink = $(".username a, a:has(.username)", this);
            if($profileLink.length){
                var id = $profileLink.attr("href").match(RegExp("/users/(-?\\d+)"))[1];
                if (!users[id] && !pastUsers[id]){
                    pastUsers[id] = {id:id, name: $profileLink.attr("title")};
                }
            };
        });
        refresh();
    }
    
    function refresh(){
        var newCSS = "";
        var selectorRest = isMobile ? "" : " .messages";
        function colorise(usrId){
            var usrIDbits = (+/\d+/.exec(usrId)).toString(2).split('').reverse().join('');
            var usrColor = 'rgb('+parseInt(('11'+usrIDbits.replace(/(.)?.?.?/g,'$1')+"00000000").slice(0,8),2)
            +','  +parseInt(('11'+usrIDbits.replace(/.?(.)?.?/g,'$1')+"00000000").slice(0,8),2)
            +','  +parseInt(('11'+usrIDbits.replace(/.?.?(.)?/g,'$1')+"00000000").slice(0,8),2)
            +')';
            var usrClass = ".user-"+usrId;
            newCSS += usrClass + selectorRest + "{background-color:"+usrColor+"}\n";
        }
        for(u in users){
            if(!users[u].colorised && !pastUsers[u]){
                colorise(u);
                users[u].colorised = true;
            }
        }
        for(u in pastUsers){
            if(!pastUsers[u].colorised){
                colorise(u);
                pastUsers[u].colorised = true;
            }
        }        
        
        if(newCSS) {$style.text($style.text()+newCSS)};
    }
};

//the following lines were donated by Phenomnomnominal
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);