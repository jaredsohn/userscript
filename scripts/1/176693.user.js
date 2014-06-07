// ==UserScript==
// @name            Hack Forums Context Menu Options
// @namespace       Snorlax
// @description     Right click an username and it will give you different options
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         http://medialize.github.io/jQuery-contextMenu/src/jquery.contextMenu.js
// @require         http://medialize.github.io/jQuery-contextMenu/src/jquery.ui.position.js
// @require         http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @require         https://raw.github.com/jquery/jquery-ui/master/ui/jquery.ui.dialog.js
// @include         *hackforums.net/*
// @version         1.3
// ==/UserScript==

$("head").append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/s/wmeqe002sddby77/screen.css?token_hash=AAFyevfn16axgJWMvzKN2lAM1fvMN3jtLncgDPOsc6oAYA" type="text/css" class="test" />');
$("head").append('<style>.ui-dialog{background-color: white;color:black;}</style>');

var hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}

$(".post_author").find("img[src*='buddy']").addClass("menu");

function getUID() {
    if($this.is('[border]')) {
        uid = $this.parent().prev().find("a").attr("href").replace(/[^0-9]/g, '');
    } else {
        uid = $this.prev().find("a").attr("href").replace(/[^0-9]/g, '');
    }
}

function getUsername() {
    if($this.is('[border]')) {
        username = $this.parent().prev().find("span:last").text();
    } else {
        username = $this.prev().find("span:last").text();
    }
}

function getURL() {
    if($this.is('[border]')) {
        URL = $this.parent().prev().find("a").attr("href");
        color = rgb2hex($this.parent().prev().find("span:last").css("color"));
    } else {
        URL = $this.prev().find("a").attr("href");
        color = rgb2hex($this.prev().find("span:last").css("color"));
    }
}

$(function(){
    $.contextMenu({
        selector: '.menu', 
        callback: function(key, options) {
        },
        items: {
            user: {name: "User Options", disabled: true},
            activity: {name: "Post Activity", callback: function(key, opt){
                $this = $(this);
                getUID();
                window.open("http://www.hackforums.net/postactivity.php?uid="+uid,"_blank");
            }},
            usernameChange: {name: "Username Changes", callback: function(key, opt){ 
                $this = $(this);
                getUID();
                window.open("http://www.hackforums.net/misc.php?action=username_history&uhuid="+uid,"_blank");
            }},
            "menu1": {
                "name": "View", 
                "items": {
                    viewThreads: {name: "View Threads", callback: function(key, opt){ 
                        $this = $(this);
                        getUID();
                        window.open("http://www.hackforums.net/search.php?action=finduserthreads&uid="+uid,"_blank");
                    }},
                    viewAwards: {name: "View Awards", callback: function(key, opt){ 
                        $this = $(this);
                        getUID();
                        window.open("http://www.hackforums.net/myawards.php?uid="+uid,"_blank");
                    }}
                }},
            "menu2": {
                "name": "Copy", 
                "items": {
                    copyName: {name: "Copy Username", callback: function(key, opt){ 
                        $this = $(this);
                        getUsername();
                        window.prompt ("Copy to clipboard: Ctrl+C, Enter", username);
                    }},
                    copyCite: {name: "Copy Cite", callback: function(key, opt){ 
                        $this = $(this);
                        getURL();
                        getUsername();
                        window.prompt ("Copy to clipboard: Ctrl+C, Enter", "[url="+URL+"][color=" + color + "][b]" + username + "[/b][/color][/url]");
                    }},
                }},
            giveRep: {name: "Give Reputation", callback: function(key, opt){ 
                $this = $(this);
                getUID();
                window.open('reputation.php?action=add&uid='+uid,'Reputation Page','width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0')
            }},
            userStatus: {name: "Current Activity", callback: function(key, opt){ 
                $this = $(this);
                getUID();
                getUsername();
                dialog = $("<img src='http://i.stack.imgur.com/FhHRx.gif' />").dialog({
                    height: 50,
                    width: 50,
                    dialogClass: 'dialogClass'
                });
                $.get('http://www.hackforums.net/member.php?action=profile&uid='+uid+'"', function(data) {
                    dialog.remove();
                    if(data.indexOf('class="offline"') >= 1){
                        $('<p>User is probably offline</p>').dialog({
                            height: 100,
                            width: 300
                        });
                    }else{
                        doing = data.match(/Online<\/span><\/a>([\s\S]*?)<\!-- end: member_profile_online/);
                        result = doing[0].match(/\((.*?)\)/)[1].replace("<a", "<a style='color:#0068FF' target='_blank'");
                        $('<p>'+username+': <b>'+result+'</b></p>').dialog({
                            autoOpen:true,
                            hide: "fade",
                            resizable: false,
                            modal: true,
                            closeOnEscape: true,
                            height: 90,
                            width: 400,
                        });
                    }
                }, 'text');
            }},
        }
    });
    
    $('.menu').on('click', function(e){
        console.log('clicked', this);
    })
});