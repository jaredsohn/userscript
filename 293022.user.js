// ==UserScript==
// @name       Playblink Ignore Button
// @namespace  
// @version    0.1.1
// @description  Puts an ignore button on users' profile pages
// @match      http://www.playblink.com/profile/*
// @copyright  2014+, Arpione
// ==/UserScript==

var wrap = document.getElementsByClassName("wrap")[1];

if((wrap.children[0].children.length > 0) && (wrap.children[0].children[0].textContent == "Send me a message")){
    
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerHTML = ".red {" +
        "color: #eeeeee;" +
        "border: solid 1px #A40000;" +
        "background: #CC0000;" +
        "background: -webkit-gradient(linear, left top, left bottom, from(#EE0000), to(#A60000));" +
        "background: -moz-linear-gradient(top,  #EE0000,  #A60000);" +
        "filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#EE0000', endColorstr='#A60000');" +
    "}" +
    ".red:hover {" +
        "background: #AC0000;" +
        "background: -webkit-gradient(linear, left top, left bottom, from(#CC0000), to(#8E0000));" +
        "background: -moz-linear-gradient(top,  #CC0000,  #8E0000);" +
        "filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#CC0000', endColorstr='#8E0000');" +
    "}" +
    ".red:active {" +
        "color: #C3C3C3;" +
        "background: #CC0000;" +
        "background: -webkit-gradient(linear, left top, left bottom, from(#A60000), to(#EE0000));" +
        "background: -moz-linear-gradient(top,  #A60000,  #EE0000);" +
        "filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#A60000', endColorstr='#EE0000');" +
    "}";
    wrap.children[0].appendChild(style);
    
    var button = document.createElement("div");
    var label = document.createTextNode("Ignore");
    
    button.appendChild(label);
    button.setAttribute("class", "button red");
    button.setAttribute("style", "float:right;vertical-align:bottom;margin-right:10px;");
    
    button.onclick = function (){
        var username = wrap.children[0].innerHTML.split(' ')[0];
        var confirmed = window.confirm("Are you sure you want to ignore " + username + "?");
        if(confirmed){
            $.get("/?do=shout&act=ignore&username=" + username, function (res) {
                if (res == "OK") {
                    document.location = "/profile/" + username;
                }else{
                    window.alert("Failed to add " + username + " to the ignore list:\n\"" + res + "\"");
                }
            });
        }
    }
    
    wrap.children[0].appendChild(button);
}
