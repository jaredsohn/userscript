// ==UserScript==
// @name           dAmnJoinr
// @namespace      miksago.deviantart.com
// @description    Joins user defined chats on chat load.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

with(unsafeWindow){
    joinIfNotJoined=function(room){
        for(var e in dAmnChats){
            if(e.toLowerCase() == room.toLowerCase()){
                dAmnChatTabs_activate(e,true);
                if(dAmnChats[e].connected)
                    return;
            }else{
                dAmn_Join(room);
            }
        }
    }


}

var setVal = function (name, value) {
        GM_setValue(name,value);
};
var delVal = function (name) {
        GM_setValue(name,'');
};
var getVal = function (name,def) {
        var cookie=GM_getValue(name,def);
    	return cookie;
};

var autojoin = {
    setup: function(){
        setVal("autojoin.firstrun", false);
        setVal("autojoin.enabled", true);

        var channels = prompt("Please enter your autojoin channels, seperated by \', \'");
        if(channels && channels != null){
            setVal("autojoin.channels", channels);
            this.init();
        }
    },
    init: function(){
        var firstrun = getVal("autojoin.firstrun", true);
        if(firstrun == true){
            this.setup();
        }else{
            if(getVal("autojoin.enabled", true)){
                var channels = getVal("autojoin.channels", "");
                if(channels == '') {
                    this.setup();
                }
                var chanarr = channels.split(", ");

                for(var i=0; i< chanarr.length; i++){
                    joinIfNotJoined( 'chat:'+chanarr[i].match( /^#?(.*)/ )[1] );
                }
            }
        }
    },
    enable: function(enabled){
        if(enabled){
            setVal("autojoin.enabled", true);
        }else{
            setVal("autojoin.enabled", false);
        }
    },
    toggle: function(){
        var enabled = getVal("autojoin.enabled", true);

        if(enabled){
            setVal("autojoin.enabled", false);
        }else{
            setVal("autojoin.enabled", true);
        }
    },
    commands: function(cmd){
        switch(cmd){
            default:
                this.init();
                break;
            case "setup":
                this.setup();
                break;
            case "toggle":
                this.toggle();
                break;
            case "disable":
                this.enable(false);
                break;
            case "enable":
                this.enable(true);
                break;
        }
    }
};

window.addEventListener('load', function() {
    autojoin.commands();
}, true);

try{
    GM_registerMenuCommand("Autojoin",function(){autojoin.commands();},null,"j");
    GM_registerMenuCommand("Autojoin: Setup",function(){autojoin.commands("setup");},null,"");
    GM_registerMenuCommand("Autojoin: Enable/Disable",function(){autojoin.commands("toggle");},null,"");
} catch(e){
    GM_log(e);
}
