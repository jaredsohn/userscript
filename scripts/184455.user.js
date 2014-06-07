// ==UserScript==
// @name        eksiantik 
// @namespace   translator
// @include     https://eksisozluk.com/*
// @version     1
// @grant       none
// ==/UserScript==

var antikmain = 'http://antik.eksisozluk.com';

if(document.URL.indexOf(antikmain)!=-1)
{
    if(document.URL.indexOf('login.asp')!=-1)
    {
        //localStorage["antikloginok"]=1;         ;
        document.forms[0].submit();
    }      
    else if(document.URL==antikmain)
    {
        var antikredir = localStorage["antikredir"];
        if(antikredir!=null)
        {
            localStorage.removeItem("antikredir");
            //localStorage.removeItem("antikloginok");
            document.location=antikredir;
        }
    }    
}
else
{
    var redir;
    var mch = document.URL.match(/https?:.*\.com\/(.*)--\d+/);
    if (mch != null)
        redir = antikmain + '/show.asp?t=' + mch[1].replace(/-/ig, '+');
    
    mch = document.URL.match(/https?:.*\.com\/entry\/(\d+)/);
    if (mch != null)
        redir = antikmain + '/show.asp?id=' + mch[1];    
        
    if(redir!=null)
    {
        localStorage["antikredir"]=redir;
        document.location=redir;//antikmain+'/login.asp?ref=default.asp';
    }
}

