// ==UserScript==
// @name       In-game profiles in the Smite Forums
// @version    0.1
// @description  Adds in-game profiles links directly into the forums.
// @match http://forums.smitegame.com/*
// @copyright  2014, Nemo
// ==/UserScript==

var hirez_stats = "https://account.hirezstudios.com/smitegame/stats.aspx?player=";

if (location.pathname == "/member.php") {
    var userinfo =  document.getElementById("userinfo");
    var username = userinfo.getElementsByClassName("member_username")[0].firstChild.textContent;
    var usermenu =  document.getElementById("usermenu");
    
    var new_li = document.createElement("li");
    
    var new_img = document.createElement("img");
    new_img.src = "images/site_icons/forum.png";
    new_img.alt = "Game stats";
    new_img.title = "Game stats";
    
    var new_a = document.createElement("a");
    new_a.href = hirez_stats + username;
    new_a.rel = "nofollow";
    new_a.target = "_blank";
    new_a.className = "inlineimg";
    
    new_a.appendChild(new_img);
    new_a.appendChild(document.createTextNode(" Game stats"));
    
    new_li.appendChild(new_a);
    usermenu.appendChild(new_li);
    
} else {
    var all_users = document.querySelectorAll("a.username.online.popupctrl, a.username.offline.popupctrl");
    
    for (var i = 0; i < all_users.length; i++) {
        var username = all_users[i].childNodes[0].firstChild.textContent;
        
        var member_action_body = all_users[i].nextSibling.nextSibling;
        
        var new_a = document.createElement("a");
        new_a.className = "siteicon_profile";
        new_a.href = hirez_stats + username;
        new_a.rel = "nofollow";
        new_a.target = "_blank";
        new_a.appendChild(document.createTextNode("Game stats"));
        
        var new_li = document.createElement("li");
        //console.log(member_action_body.lastChild.previousSibling);
        //if (member_action_body.lastChild.previousSibling.className == "right")
        if (member_action_body.lastChild.previousSibling.classList.contains("right"))
            new_li.className = "left";
        else
            new_li.className = "right";
        new_li.appendChild(new_a);
        
        //console.log(new_a);
        member_action_body.appendChild(new_li);
        
    }
}