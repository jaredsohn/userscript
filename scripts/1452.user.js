// ==UserScript==
// @name          LF Live Preview
// @namespace     http://users.linkfilter.net/~deathburger/
// @description	  Show a live preview of your post
// @include       http://linkfilter.net/*
// @include       http://www.linkfilter.net/*
// ==/UserScript==

// This script is getting rather complex, so it's probably not too good for you to start out learning with.

(function() {
  window.addEventListener("load", function(e) {

document.injectScript("\
function dbpreview()\
{\
    var source = document.getElementsByTagName('textarea')[0];\
    var target = document.getElementById(source.getAttribute('id') + '-preview');\
    target.innerHTML = source.value.split(/\\n/).join('<br />');\
}");

var i, posttype;
var found = false;
var inputs = document.getElementsByTagName("input");

for(i=0; posttype=inputs[i]; ++i)
{
    if(posttype.getAttribute("type") == "hidden")
    {
	var postv = posttype.getAttribute("value");
	if(postv == "c" || postv == "j")
	    found = true;
    }
    if(i == inputs.length)
	break;
}

// If found is still false, it's not a comment or journal posting page, so we stop right here
if(!found)
    return;

// Get the skin we're in
var skin = readCookie("lfskin");

// Add the preview for the subject line, and remove the preview button
var input, x, j;
for(i=0; input=inputs[i]; ++i)
{
    if(input.getAttribute("type") == "text" && (input.getAttribute("name") == "subject" || input.getAttribute("name") == "title"))
    {
	input.setAttribute("id","subject");
	input.setAttribute("onkeyup","document.getElementById('subject-preview').firstChild.nodeValue = this.value;");
	input.setAttribute("onchange", "this.onkeyup()");
    }
    // Nuke the Preview button, who needs it anymore?
    if(input.getAttribute("name") == "preview")
	input.setAttribute("style","display:none");
    if(i == inputs.length)
	break;
}

// We have to do something special to nuke the preview button in Lain..
if(skin == "lain")
{
    var links = document.getElementsByTagName("a");
    for(j=0; x=links[j]; ++j)
    {
	if(x.getAttribute("href") == "javascript:document.commentform.preview.value=1;document.commentform.submit()")
	    x.setAttribute("style","display:none");
	if(i == links.length)
	    break;
    }
}


// Add preview for the text body
if(input = document.getElementsByTagName("textarea")[0]);
{
    input.setAttribute("id","body");
    input.setAttribute("onkeyup", "dbpreview()");
    input.setAttribute("onchange", "this.onkeyup()");

    // Thank you Firefox dickheads, for making sure I can't do this.
    // I may as well be using Netscape 4.
    //input.addEventListener('onkeyup',dbpreview,false);

    // Add in the area on the page where the preview is actually displayed
    x = input.parentNode;
    found = 0;
    while(!found)
    {
	if(x.getAttribute("method") && x.getAttribute("method") == "post")
	{
	    found = true;
	    continue;
	}
	x = x.parentNode;
    }

    // Create the preview table
    var table, tbody, tr, td, font, p, span, div;
    table = document.createElement("table");
    table.setAttribute("width","95%");
    // These skins don't get a border around posts
    if(skin != "lcd" && skin != "tangerine" && skin != "digital" && skin != "digitalsnow")
    {
	table.setAttribute("rules","none");
	table.setAttribute("frame","border");
    }
    table.setAttribute("cols","1");
    table.setAttribute("cellspacing","0");
    table.setAttribute("cellpadding","3");
    table.setAttribute("align","center");
    tbody = document.createElement("tbody");

    // The subject line
    tr = document.createElement("tr");
    td = document.createElement("td");
    div = document.createElement("div");
    span = document.createElement("span");
    td.setAttribute("height","20");
    td.setAttribute("class","message-head page-body link-head");
    font = document.createElement("font");
    font.setAttribute("class","comment-subject");
    span.setAttribute("id","subject-preview");
    span.setAttribute("class","title-large");
    span.appendChild(document.createTextNode(" "));
    div.appendChild(span);
    font.appendChild(div);
    td.appendChild(font);
    tr.appendChild(td);
    tbody.appendChild(tr);

    // The post body
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.setAttribute("class","message-body link-body td-body");
    p = document.createElement("p");
    p.setAttribute("id","body-preview");
    td.appendChild(document.createTextNode("Posted by you in the near future"));
    td.appendChild(document.createElement("br"));
    td.appendChild(document.createElement("br"));
    td.appendChild(p);
    tr.appendChild(td);
    tbody.appendChild(tr);

    // Add the preview table to the page
    table.appendChild(tbody)
    x.parentNode.insertBefore(table,x);
    x.parentNode.insertBefore(document.createElement("br"),x);

    // Set the fields up, so if there is text they are autofilled
//    var source = document.getElementsByTagName('textarea')[0];
//    if(source.value)
    if(input.value)
    {
	document.getElementById(input.getAttribute('id') + '-preview').innerHTML = input.value.split(/\\n/).join('<br />')
    }
    for(i=0; input=inputs[i]; ++i)
    {
	if(input.getAttribute("type") == "text"
	  && (input.getAttribute("name") == "subject" || input.getAttribute("name") == "title"))
	{
	    document.getElementById('subject-preview').firstChild.nodeValue = input.value;;
	}
	if(i == inputs.length)
	    break;
    }
}
// End of script
  }, false);
})();

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
/* Script injector */
document.injectScript = function(data)
{
    var head = document.getElementsByTagName("head").item(0);
    var js = document.createTextNode(data);
    var script = document.createElement("script");
    script.setAttribute("language","Javascript");
    script.setAttribute("type","text/javascript");
    script.appendChild(js);
    head.appendChild(script);
}
