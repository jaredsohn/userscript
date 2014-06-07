// ==UserScript==
// @name            Dict.cn SelectAndFindOut
// @description	    Select a word and Press D to use dict.cn to search.
// @author
// @version
// @date
// @namespace
// @include         *
// ==/UserScript==

var w=800,h=300,u,s,i;

function q(e){
    s = window.getSelection();
    if(s!=""&&e.which==68){
        if(i!=null) document.body.removeChild(i);
        u="http://dict.cn/"+window.getSelection()+".htm";
        i = document.createElement("iframe");
        i.setAttribute("src",u);
        with(i.style){
            position="fixed";
            left="-220px";
            top="200px";
            width=w+"px";
            height=h+"px";
            zIndex="10000";
            background="#fff";
            overflowX="hidden";
            border="3px double #8DD5DF";
        }
        document.body.appendChild(i);
    }
}

function r(){
    if(s==""&&i){
        document.body.removeChild(i);
        i=null;
    }
}

document.addEventListener("keydown",q,false);
document.addEventListener("click",r,false);