// ==UserScript==
// @name           Clean up Slashdot
// @description    Fixes slashdot's insane margins. And tidies up the looks.
// @include        http://*.slashdot.org/*
// @include        http://slashdot.org/*
// ==/UserScript==
// -------------------------------------Options--------------------------------
var Make_reply_a_button = true; // true to make the reply link under a post look like a button
var kill_slashboxes = true;
var kill_left_menu = true;
// ----------------------------------------------------------------------------
// Please excuse the sloppy code, I made this in a hurry.

removeByClass("slant");
if (kill_left_menu) removeByClass("left_menu"); 
if (kill_slashboxes) removeById("slashboxes"); 
if (Make_reply_a_button && !( document.location.href == "http://slashdot.org/") ) prettybuttons();

styleFix("body","margin","0px 3px");
styleFix("body","padding","0px");
styleFix("firehose","margin","0px");
styleFix("comments","margin","0px");
styleFix("firehose","padding","0px");
styleFix("aside","display","none");
styleFix("small","display","none");

// --- stylefix adresses a single element by id, if there is no element with the id assume element reffers to type of html element //
function styleFix(element,property,newvalue ) {  
    var elementid = document.getElementById(element);
    if (elementid){
        elementid.style[property] = newvalue;
    } else {
           var elementtags = document.getElementsByTagName(element);
           for (var i = 0; i < elementtags.length; i++) {
              elementtags[i].style[property] = newvalue;
        }
    }
}


// --- Fix white on white input/textboxes if OS theme uses light foreground color ---
// --- We actually have to add a style tag :| 

var stag = document.createElement('style');
stag.setAttribute("type", "text/css");
var sclass = 'form input[type="text"], form input[type="tel"], form input[type="email"], form input[type="password"], form textarea { color : black !important; }';
//var scomment = ' #commentlisting .comment_footer, #commentlisting.d1 .commentBody, #comments .commentBody, #wide #commentlisting .commentBody, #comments ul li.show { padding:10px 15px 0 !important; }';
sclass = document.createTextNode(sclass);
stag.appendChild(sclass);
//stag.appendChild(scomment);
document.getElementsByTagName('head')[0].appendChild(stag);


// --- We've done our little magic 



function removeById(id) {

  var node = document.getElementById(id);

  if (node) {
      node.parentNode.removeChild(node);
      node = null;
  }
}

function removeByClass(cls) {
  
  var cool = document.getElementsByClassName(cls);
 
  if (cool.length > 0) {
    for(var d = 0; d < cool.length; d++) {
      cool[d].parentNode.removeChild(cool[d]);
      cool[d] = null;
    }
  }
}

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}  

// --- Element walker 

function visitElements(element, visitorFunction)
{
    var children = element.childNodes;
    var childrenLength = children.length;
    for(var i = 0; i < childrenLength; i++)
    {
        var child = children[i];
        visitorFunction(child);
        visitElements(child, visitorFunction);
    }
}

function elementVisitor(el)
{
    if (el.className && el.className.indexOf("link") != -1)
    {
        // GM_log("prettybuttoning: " + el);
        el.className = "btn";
    }
}

function prettybuttons()
{
    // GM_log("prettybuttons loading");
    visitElements(document.getElementById("commentwrap"), elementVisitor);
}

