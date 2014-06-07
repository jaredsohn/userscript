// ==UserScript==
// @name          OscarPlus McMaster loginbox
// @description   Display the login box inside OscarPlus's homepage
// @include       https://www.oscarplusmcmaster.ca/*
// @include       https://cap.mcmaster.ca/mcauth/login.jsp?app_id=783&app_name=orbis
// @version       1.7
// @author        Afzal
// @date          2013-09-13
// ==/UserScript==

setInterval ( "keepMeLoggedInClicked()", (565 * 1000));

if (document.location == "https://www.oscarplusmcmaster.ca/logout.htm" || document.location == "https://www.oscarplusmcmaster.ca/home.htm") {
        var login, loginbox;
        login = document.createElement("div");
        login.align='center';
        login.innerHTML='<iframe width="100%" height="25%" frameborder="0" scrolling="no" src="https://cap.mcmaster.ca/mcauth/login.jsp?app_id=783&amp;app_name=orbis"></iframe>';
        if (document.getElementsByClassName('style3')[0]) {
                document.getElementsByClassName('style3')[0].appendChild(login);
        } else if (document.getElementsByClassName('withOutHeader')[0]) {
                document.getElementsByClassName('withOutHeader')[0].appendChild(login);
        }

        loginbox = document.getElementsByTagName("form")[2];
        loginbox.setAttribute('onsubmit','');
        loginbox.setAttribute('target','_parent');
}