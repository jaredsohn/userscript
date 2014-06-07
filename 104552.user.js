// ==UserScript==
// @name          blokki
// @description   basic Greasemonkey script
// ==/UserScript==

//MuroBBS banned message hider
var timer = 100; //Time before try to hide messages milliseconds

tryit();
function tryit()
{
    if(document.querySelector("body") != null && document.querySelector("body") != "undefined")
    {
        setTimeout(hide, timer);
    }
    else
    {
        setTimeout(tryit, 1);
    }
}
hide();
var rounds = 0;
var done = false;
function hide()
{
    if(!done && document.querySelector("#lastpost") != null && document.querySelector("#lastpost") != "undefined")
    {
    var messages = document.querySelectorAll('table[id^=post]');
        var i = 0;
        while(i < messages.length)
        {
            var temp = getElementsByClassName("alt1", messages[i]);
            temp = getElementsByClassName("smallfont", temp[0]);
            try{
                temp = temp[0].getElementsByTagName("a");
                var temp_text = temp[0].innerHTML.replace(/^\s+|\s+$/g, '');
            } catch(e){ temp_text =""; }
            if(temp_text == "estolistallasi")
            {
                messages[i].style.display="none";
                messages[i].style.heigth="0px";
            }
            i++;
        }
        done = true;
    }
    else if(!done)
    {
        setTimeout(hide, timer);
        rounds++;
    }
    
    function getElementsByClassName(classname, node)  {
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))a.push(els[i]);
        return a;
    }
}