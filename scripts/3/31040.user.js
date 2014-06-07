// Google Groups - Math Equations
// version 0.1
// 2008-08-03
// Copyright (c) 2008, Ofir K.
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// http://www.gnu.org/licenses/gpl.html
// 
// ==UserScript==
// @name           Google Groups - Math Equations
// @namespace      http://violetech.org
// @description    Adds the ability to post math equations on Google Groups
// @include        http://groups.google.com/*
// ==/UserScript==

// Set the url and convert it to string
url = window.location + '';
gmoduleCode = '<script src="http://www.gmodules.com/ig/ifr?url=http://www.sitmo.com/gg/latex/latex.xml&amp;up_eq=&amp;up_z=100&amp;synd=open&amp;w=320&amp;h=500&amp;title=Equation+Editor&amp;border=%23ffffff%7C3px%2C1px+solid+%23999999&amp;output=js"></script>';
gmoduleUrl  = 'http://www.gmodules.com/ig/ifr?url=http://www.sitmo.com/gg/latex/latex.xml&up_eq=&up_z=100&synd=open&w=320&h=500&title=Equation+Editor&border=%23ffffff%7C3px%2C1px+solid+%23999999&output=js';

//~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
 * Function to encode the formula before sending to the server
 */
function URLEncode (clearString) {
    var output = '';
    var x = 0;
    clearString = clearString.toString();
    var regex = /(^[a-zA-Z0-9_.]*)/;
    while (x < clearString.length) {
        var match = regex.exec(clearString.substr(x));
        if (match != null && match.length > 1 && match[1] != '') {
            output += match[1];
            x += match[1].length;
        } else {
            if (clearString[x] == ' ')
                output += '+';
            else {
                var charCode = clearString.charCodeAt(x);
                var hexVal = charCode.toString(16);
                output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
            }
            x++;
        }
    }
    return output;
}

/*
 * Function to retrieve all nodes with a specific class name
 */
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function getElementsById(id, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + id + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].id))a.push(els[i]);
    return a;
}

/*
 * Function to replace latex code with an image equation
 */
function getEquation(formula, replaceNode) {
    GM_xmlhttpRequest({
        method:  "POST",
        url:     "http://eng.biu.ac.il/~klingeo/math/index.php",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            "User-Agent":   navigator.userAgent, // "Mozilla/5.0"
            "Accept":       "text/html"
        },
        data: "latex_formula=" + URLEncode(formula),
        onload: function(response) {
            replaceNode.innerHTML = response.responseText;
        }
    });
}

//~ Program ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
 * Replace all [tex] BB tags with an <img> tag 
 */
if (url.match('\\btopics[:?]*\\b') || url.match('\\bbrowse_thread*\\b')) {
    //~ document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/\[tex\](.*?)\[\/tex\]/ig, "<span><a href='http://eng.biu.ac.il/~klingeo/math/index.php?latex_formula=[tex]$1[/tex]' class='gmTex'>[tex]$1[/tex]</a></span>");
    
    posts = getElementsById('inbdy');
    for (var i=0; i < posts.length; i++) {
        posts[i].innerHTML = posts[i].innerHTML.replace(/\[tex\](.*?)\[\/tex\]/ig, "<span><a href='http://eng.biu.ac.il/~klingeo/math/index.php?latex_formula=[tex]$1[/tex]' class='gmTex'>[tex]$1[/tex]</a></span>");
    }
    
    threads = getElementsByClassName('padt2');
    for (var i=0; i < threads.length; i++) {
        threads[i].innerHTML = threads[i].innerHTML.replace(/\[tex\](.*?)\[\/tex\]/ig, "<span><a href='http://eng.biu.ac.il/~klingeo/math/index.php?latex_formula=[tex]$1[/tex]' class='gmTex'>[tex]$1[/tex]</a></span>");
    }
    
    texElements = getElementsByClassName('gmTex');
    for (var i=0; i < texElements.length; i++) {
        getEquation(texElements[i].innerHTML, texElements[i].parentNode);
        texElements[i].parentNode.innerHTML = 'Loading equation...';
    }
}

/*
 * Add formula editor to the post form
 */
if (url.match('\\bpost[:?]*\\b')) {
    var node = '';
    tableChilds = document.getElementById('leftcontent');
    node = tableChilds.getElementsByTagName('tbody')[0];
    
    node = document.getElementsByName('postform')[0];
    
    var lineBreak  = document.createElement("br");
    var lineClear  = document.createElement("p");
    lineClear.innerHTML = '&nbsp;';
    
    var title  = document.createElement("font");
    title.className      = 'b nb';
    title.innerHTML = 'Equation Editor:';
    
    var popup  = document.createElement("a");
    popup.href      = 'http://www.gmodules.com/ig/creator?url=http://www.sitmo.com/gg/latex/latex.xml&up_eq=&up_z=100&synd=open&w=320&h=500&title=Equation+Editor&border=%23ffffff|3px%2C1px+solid+%23999999';
    popup.innerHTML = 'To open the Equation Editor, click here';
    popup.target    = '_blank';
    
    node.appendChild(lineClear);
    node.appendChild(lineClear);
    node.appendChild(lineClear);
    node.appendChild(title);
    node.appendChild(lineBreak);
    node.appendChild(popup);
}
