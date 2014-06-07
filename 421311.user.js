// ==UserScript==
// @name       Showdown Friends
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  enter something useful
// @require    http://code.jquery.com/jquery.min.js
// @match      http://play.pokemonshowdown.com/
// @copyright  nyok0
// ==/UserScript==


function GetRColor(s){
    var value = s,
        result = "";
    value = value.split('');
    
    // Filter non hex values
    for (var i = 0; i < value.length; i++) {
        var val = value[i];
        
        if (!/^[0-9A-F]{1}$/i.test(val)) {
            val = 0;
        }
        
        result += val;
    }
    
    // Multiple of 3
    if (result.length % 3) {
        result += Array((3 - result.length % 3) + 1).join("0");
    }
    
    // Multiple of 6
    if (result.length % 6) {
        result += Array((6 - result.length % 6) + 1).join("0");
    }
    
    // Split in 3 groups with equal size
    var regexp = new RegExp("([A-Z0-9]{"+result.length / 3+"})", "i");
    result = result.split(regexp);
    
    // Remove first 0 (if there is one at first postion of every group
    if (result[1].length > 2) {
        if (result[1].charAt(0) == result[3].charAt(0) == result[5].charAt(0) == 0) {
            result[1] = result[1].substr(1);
            result[3] = result[3].substr(1);
            result[5] = result[5].substr(1);
        }
    }
    
    // Truncate (first 2 chars stay, the rest gets deleted)
    result[1] = result[1].slice(0, 2);
    result[3] = result[3].slice(0, 2);
    result[5] = result[5].slice(0, 2);
    
    // Output
    return "#"+result[1] + result[3] + result[5];
    
}

////
function createCookie(name, value, days) {
    var expires;
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        var date = new Date();
        date.setDate(date.getDate() + 365);
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


/////

function GetFriendList(){
    var Fcookie = readCookie("friendlistX2"); 
    return Fcookie;
}
function SetFriendList(f){
    f = JSON.stringify(f)
    createCookie("friendlistX2",f);
}
function UpdateFriends(){
    var friendlist = JSON.parse(GetFriendList())
    if(friendlist != null){
        $(".friendlog").find(".mtext").html("")
        $.each(friendlist,function(name, val){
            var friend = $(
                "<div class='friendB'>"+
                val+
                "<button class='fbchall'>Challenge</button>"+
                "<button class='fbChat'>Chat</button>"+
                "<button class='fbremove'>Del</button>"+
                "</div>"
            )
            friend.css("cursor","pointer").css("color",GetRColor(val)).css("font-weight","900")
            friend.find(".fbchall").click(function(){                   
                app.focusRoom('');
                app.rooms[''].challenge(val);
            })
            friend.find(".fbChat").click(function(){                   
                app.focusRoom('');
                app.rooms[''].focusPM(val);
            })
            friend.find(".fbremove").click(function(){ 
                var newfb = friendlist
                //alert(newfb.toString())
                $.each(friendlist, function(i,obj) {
                    if (obj == val) {
                        newfb.splice(i, 1);
                    }
                });
                //alert(newfb.toString())
                SetFriendList(newfb)
                //alert(GetFriendList())
                UpdateFriends()
            })
            $(".friendlog").find(".mtext").append(friend)
        })
    }
}

function SetNewFriend(newfriend){
    
    var fl = new Array()
    fl = JSON.parse(GetFriendList())
    if(fl == null){
        fl = new Array()
    }
    
    var hasName = false;
    $.each(fl, function(i,obj) {
        if (obj == newfriend) { 
            hasName = true; 
            return false;
        }
    });
    if(!hasName){
        fl.push(newfriend)
        SetFriendList(fl)
        UpdateFriends()
    }else{alert("That name is already registered")}    
    
}
window.onload = function(){  
    
    var friendmenu = $("<div class='menugroup'><p><button class='button' name='friendlist'>Friendlist</button></p></div>")
    var friendlog = $(
        "<div class='pm-window news-embed friendlog' data-newsid='5489'>"+
        "<h3><button class='closebutton' tabindex='-1'><i class='icon-remove-sign'></i></button>Friend List</h3>"+
        "<div class='pm-log' style='max-height:300px'>"+
        "<div class='mtextA' style='font-size:9pt;padding:1px 10px'>"+        			
        "<input class='fnameX' type='text' placeholder='Friend Name' />"+	
        "<button class='fnameB button'>Add Friend</button>"+	
        "<div class='mtext'></div>"+
        "</div>"+
        "</div>"+
        "</div>"    
    )
    friendlog.find('.fnameB').click(function(){
        newfriend = $(this).parent().find(".fnameX").val()
        if(newfriend != ""){
            SetNewFriend(newfriend)
        }
    })
    friendlog.find('.fnameX').keyup(function( event ) {
        if(event.which == 13){          
            newfriend = $(this).parent().find(".fnameX").val()
            if(newfriend != ""){
                SetNewFriend(newfriend)
            }
        }
    })
    friendmenu.find(".button").click(function(){
        $(".friendlog").remove()
        $(".fnameX").val("")
        $(".pmbox").prepend(friendlog)
        UpdateFriends()
    })
    $(".mainmenu").append(friendmenu)
    
    friendmenu.find(".button").click()
    
    
    
}


function FPopup(name){
    app.closePopup()
    app.addPopup(UserPopup, {name: name, sourceEl: $(".pmbox"), position: "left"});
}