// ==UserScript==
// @name           dump_on_keypress
// @namespace      http://frey.co.nz
// @description    dump on pressing alt-shift-D
// @include        *
// ==/UserScript==


function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function escapeHTML( text )
{
    return text.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}

function appendDiv(content, className)
{ 
    // find div to append to
    var body = document.getElementsByTagName('body') [0];
    var divs = getElementsByClassName(className);
    if ( divs.length == 0 )
    {
        // not found: create
        var new_div = document.createElement('div');
        new_div.className = className;
        /*var new_text = document.createTextNode(content);
        new_div.appendChild(new_text);*/
        new_div.innerHTML = content;
        body.appendChild(new_div);
    }
    else
    {
        // update
        divs[0].innerHTML = content;
    }
}

function keyPressed( e )
{
  // alt-shift-D
  if ( e.altKey && e.shiftKey && e.which == 206 )
  {
    // clear the old live code div
    appendDiv('', '__livecode');
    // get page source
    text = document.getElementsByTagName('body')[0].innerHTML;
    // escape html codes
    text = "<pre>"+escapeHTML( text )+"</pre>";
    // write
    appendDiv(text, '__livecode');
  }
  
}


// hook keypress event
document.addEventListener("keypress", keyPressed, false );
