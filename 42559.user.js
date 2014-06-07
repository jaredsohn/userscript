// ==UserScript==
// @name           GMail Sign out Shortcut 
// @namespace      www.gmail.com
// @description	   Press (SHIFT+W) to Signout
// @include        https://mail.google.com/mail/*
// ==/UserScript==

function isSignOut(e)
{
var keynum;
var keychar;
var numcheck;

    if(e.which)
    {   
      keynum = e.which;
      if(keynum == 87 && e.shiftKey == true){
        var ret = confirm('Are you sure to signout');
        if( ret ){
            window.location.href='?logout';
        }
      }
    }
}

window.addEventListener("keypress", function(e) { isSignOut(e); } , false);