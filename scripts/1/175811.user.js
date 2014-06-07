// ==UserScript==
// @name			Automater for ASK.FM
// @namespace                   http://userscripts.org/scripts/show/175811
// @version			2.1
// @copyright		        http://ask.fm/incaner
// @description		        Automater for ASK.FM
// @author			(http://userscripts.org/users/528378)
// @include			http://ask.fm/*

// ==/UserScript==
// ==============
// ==Auto Answer remove==
body = document.body;
if(body != null) {
    //Remove Answers
    div = document.createElement("div");
    div.setAttribute('id','removea');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "125px"; 
    div.style.opacity= 0.90;
    div.style.bottom = "+75px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "1px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a onclick='RemoveAnswers ()'>Antworten Löschen</a>"
    //Like
    like = document.createElement("like");
    like.setAttribute('id','likea');
    like.style.position = "fixed";
    like.style.display = "block";
    like.style.width = "125px"; 
    like.style.opacity= 0.90;
    like.style.bottom = "+50px";
    like.style.left = "+6px";
    like.style.backgroundColor = "#eceff5";
    like.style.border = "1px solid #94a3c4";
    like.style.padding = "2px";
    like.innerHTML = "<a onclick='Like()'>Liken</a>"
    //Load
    load = document.createElement("load");
    load.setAttribute('id','loada');
    load.style.position = "fixed";
    load.style.display = "block";
    load.style.width = "125px"; 
    load.style.opacity= 0.90;
    load.style.bottom = "+25px";
    load.style.left = "+6px";
    load.style.backgroundColor = "#eceff5";
    load.style.border = "1px solid #94a3c4";
    load.style.padding = "2px";
    load.innerHTML = "<a onclick='load()'>Laden</a>"
    
    body.appendChild(like);
    body.appendChild(div);
    body.appendChild(load);
    
    
    unsafeWindow.load= function() {
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("submit-button-more")[0].click();
        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("like") >= 0)
                if(buttons[i].getAttribute("name") == "likern false;")
                    buttons[i].click();
                }
        
    };
    
    unsafeWindow.Like = function() {
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        document.getElementsByClassName("like hintable")[0].click();
        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("like") >= 0)
                if(buttons[i].getAttribute("name") == "likern false;")
                    buttons[i].click();
                }
        
    };
    
    unsafeWindow.RemoveAnswers = function() {
        document.getElementsByClassName("submit-button-more")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        document.getElementsByClassName("delete hintable")[0].click();
        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("like") >= 0)
                if(buttons[i].getAttribute("name") == "likern false;")
                    buttons[i].click();
                }
    }
    
};