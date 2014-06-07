// ==UserScript==
// @name        Carleton Student Autologin
// @namespace   Carleton
// @icon        http://carletonnow.carleton.ca/ccms/wp-content/uploads/Ravens-logo.jpg
// @description Saves your data into localStorage, encodes it to a shifted cypher, and loads it on page load.
// @include     http*://www.carleton.ca/culearn/*
// @version     2014.4.25
// @grant       none
// ==/UserScript==
(function (d,l) {
    console.time("Elapsed Time");
    d.getElementsByClassName('reset-txt')[0].innerHTML += "<label style='color:pink'>Autologin?</label> " + 
                                                          "<input id='autologin' onchange='localStorage.a=this.checked' type='checkbox'/>"
    if(l.a =="true") 
        d.getElementById('autologin').checked = l.a;
    if (d.cookie.indexOf('MoodleSession') != - 1) 
        return;
    if (!l.a) //undefined
        l.a = false;
    var encodeText = function (string, shift) {
        if (shift == 0) 
            return string;
        return encodeText(btoa(string), shift - 1);
    }
    var decodeText = function (string, shift) {
        if (shift == 0) 
            return string;
        return decodeText(atob(string), shift - 1);
    }
    var t = ['user','pass'];
    if (!l.n) 
        l.n = Math.floor((Math.random() * 20) + 5);
    for (var i = 0; i < 2; i++)
       if (l[encodeText(t[i], 2)] != null)
          login[t[i]].value = decodeText(l[encodeText(t[i], 2)], l.n);
    if (l.length - 1 && l.a=="true"){
        login.submit.click();
        return;
    }
    login.addEventListener('submit', function () {
        for (var i = 0; i < 2; i++) 
            l[encodeText(t[i], 2)] = encodeText(login[t[i]].value, l.n);
    });
    console.timeEnd("Elapsed Time");
})(document, localStorage);
