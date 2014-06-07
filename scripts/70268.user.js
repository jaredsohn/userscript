// ==UserScript==
// @name           Bloquear Usuarios ND
// @namespace      Noticierodigital
// @description    Greasemonkey script para bloquear usuarios de ND
// @include        http://www.noticierodigital.com/*
// ==/UserScript==
(function() {
var currentVersion = "0.5.0";
var reg = /viewforum.php/i;
var fcheck = reg.exec(document.URL);

var reg = /viewtopic.php/i;
var threadcheck = reg.exec(document.URL);
var maxImageWidth = document.width - 240;

var userIgnore_names = [];
var lastRestoredUser;
var isNewDay;

var replacementStrings = GM_getValue("stringSubs", 
"Game Talk->Idiot Central\nHaravikk->Haravikk the Perturbed\nAndenno->Andenno the Banned\nSpock->Sir Splockalot\nNova Hessia->Noav Hsesia\nBotD->Python\nrediculous->I AM TOO STUPID TO SPELL RIDICULOUS");
var replacements = replacementStrings.split("\n");

var mObj;
var alertObj;

for(var i = 0; i<replacements.length;i++)
{
    replacements[i] =  replacements[i].split("->");
}

function toggle(post)
{	
	var elementStyle=document.getElementById(post).style;
	if (elementStyle.display=="none")
		elementStyle.display="table-row";
	else
		elementStyle.display="none";
}

function isUserIgnored(name)
{
    return GM_getValue("ig_" + name, false);
}

function ignoreUser(name)
{
  if(name =="Noticiero Digital")
  {
    alert("a mi no me puedes bloquear");
    return;
  }
  if(isUserIgnored(name)) return;
  GM_setValue("ig_" + name, true);

  BlockUsers(true);
  GM_log("Ignored " + name);
}

function unignoreUser(name)
{
  if(!isUserIgnored(name)) return;
  GM_setValue("ig_" + name, false);

  BlockUsers(true);
  GM_log("Unignored " + name);
}





function configure(e)
{
    // shortcut reference to the document object
    // if the modalContainer object already exists in the DOM, bail out.
    var d = document;
    if(d.getElementById("modalContainer")) return;
    // create the modalContainer div as a child of the BODY element
    mObj = d.getElementsByTagName("body")[0].insertBefore(d.createElement("div"), d.body.firstChild);
    mObj.id = "modalContainer";
    // make sure its as tall as it needs to be to overlay all the content on the page
    // create the DIV that will be the alert 
    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    // center the alert box
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    // create an H1 element as the title bar
    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode("Configure User Ignore"));

    // create a paragraph element to contain the txt argument
    msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = '<form><input type="checkbox" id="imageAutoshrink"> Automatically shrink large images.<br><input type="checkbox" id="linksToImages"> Automatically convert image links to images.<br><input type="checkbox" id="motd"> Display the message of the day.<br><input type="checkbox" id="quotePrune"> Prune excessively nested quotes.<br><input type="checkbox" id="textSubstitution"> Do text replacement.<br><input type="checkbox" id="ignoreUsers"> Ignore selected users.<p><b>Text replacements:</b></p><textarea rows="15" cols="40" id="textSubstitutionArea"></textarea><p><b>Username highlighting:</b></p><textarea rows="15" cols="40" id="textColourArea"></textarea></form>';
    document.getElementById("imageAutoshrink").checked = "true"; //GM_getValue("function_resizeLargeImages", true);
    document.getElementById("linksToImages").checked = GM_getValue("function_linksToImages", true);
    document.getElementById("motd").checked = GM_getValue("function_motd", true);
    document.getElementById("quotePrune").checked = GM_getValue("function_pruneQuotes", true);
    document.getElementById("textSubstitution").checked = GM_getValue("function_textSubstitution", false);
    document.getElementById("ignoreUsers").checked = GM_getValue("function_blockUsers", true);
    document.getElementById("textSubstitutionArea").value = replacementStrings;
    document.getElementById("textColourArea").value = GM_getValue("highlight_usernames_custom", "");

    // create an anchor element to use as the confirmation button.
    btnOK = alertObj.appendChild(d.createElement("a"));
    btnOK.id = "btnOK";
    btnOK.appendChild(d.createTextNode("OK "));
    btnOK.href = "#";
    // set up the onclick event to remove the alert when the anchor is clicked
    btnOK.addEventListener("click",
    function(e) 
    { 
	GM_setValue("function_resizeLargeImages", document.getElementById("imageAutoshrink").checked);
        GM_setValue("function_linksToImages", document.getElementById("linksToImages").checked);
        GM_setValue("function_motd", document.getElementById("motd").checked);
        GM_setValue("function_pruneQuotes", document.getElementById("quotePrune").checked);
        GM_setValue("function_textSubstitution", document.getElementById("textSubstitution").checked);
        GM_setValue("function_blockUsers", document.getElementById("ignoreUsers").checked);
        GM_setValue("stringSubs", document.getElementById("textSubstitutionArea").value);
	GM_setValue("highlight_usernames_custom", document.getElementById("textColourArea").value);
        removeCustomAlert();
        window.location.reload();
        return true; 
    }, true);

    // create an anchor element to use as the confirmation button.
    btnCancel = alertObj.appendChild(d.createElement("a"));
    btnCancel.id = "btnCancel";
   btnCancel.appendChild(d.createTextNode(" Cancel"));
   btnCancel.href = "#";
   // set up the onclick event to remove the alert when the anchor is clicked
   btnCancel.addEventListener("click",function() { removeCustomAlert();return false; }, true);
}

// removes the custom alert from the DOM
function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
 
 function addMenuItemOption(configVariableName, name, onByDefault)
{
    if(GM_getValue(configVariableName, onByDefault))
    {
        GM_registerMenuCommand("Disable " + name, function(e) 
        {
            GM_setValue(configVariableName, false);
            alert("Disabled " + name + ".");
            document.location.reload();
        });
    }
    else
    {
        GM_registerMenuCommand("Enable " + name, function(e) 
        {
            GM_setValue(configVariableName, true);
            alert("Enabled " + name + ".");
            document.location.reload();
        });
    }
}

function BlockUsers(cleanup)
{
    insertIgnoreLinks(cleanup)
    var allspans = document.getElementsByTagName("span"); //Get all <span> elements in the doc
    //Before sweeping for the ignore list, we check that
    //we're not on a forum page.

    if (! fcheck)
    {
        for (var i = 0 ; i < allspans.length ; i++)
        {
            if(allspans[i].className == "name")                  //Find all the ones that contain usernames.
            {
                var s = allspans[i];
                var username = s.lastChild.lastChild.nodeValue;
                    var post = s.parentNode.parentNode;
                    if (isUserIgnored(username))	//If the username in question is on the blocklist
	           		{
                            post.style.display = "none"; //Make it invisible

                            post.id = "block" + i;
                        	blockText = document.createElement("tr");
                            blockText.setAttribute("id", "blockText");
                            td = document.createElement("td");
                               td.setAttribute("colspan", "5");
                            span = document.createElement("span");
                                                span.setAttribute("class", "topictitle");
                            span.innerHTML = "<b>Blocked a post by " + username + ", click to view</b>";

                            blockText.insertBefore(td, blockText.firstChild);
                            td.insertBefore(span, td.firstChild);
                            
                            post.parentNode.insertBefore(blockText,post);
                            a = document.createElement("a");


                            td.addEventListener('click', function(event) {
                            // event.target is the element that was clicked
                            event.preventDefault();


                            if(event.target.tagName == "B") toggle(event.target.parentNode.parentNode.parentNode.nextSibling.id);
                            else toggle(event.target.parentNode.nextSibling.id);
                            }, true);
                            i++;
   	                }


                    else
                    {
                        if(post.style.display == "none")
                        {
                            post.style.display = 'table-row';
                        }
                    }
            }
        }
    }
}

function insertIgnoreLinks(cleanup)
{

if(cleanup)
{
    var rows = document.getElementsByTagName("tr");
    for(var i = 0; i<rows.length; i++)
    {
      if(rows[i].style.display =="none")
		rows[i].style.display="table-row";
      if(rows[i].id == "blockText") rows[i].parentNode.removeChild(rows[i]);
    }
}

if(!threadcheck) return;
	var spans = document.getElementsByTagName("span");

for(var i=0; i < spans.length; i++)
	{
		if(spans[i].className == "name")
		{

			var name = spans[i].lastChild.firstChild.data;
            var postDetails = spans[i].nextSibling.nextSibling;
            a = document.createElement("a");
            p = document.createElement("p");
            if(cleanup)
            {
                postDetails.insertBefore(a, postDetails.firstChild.nextSibling.nextSibling.nextSibling);
                postDetails.removeChild(a.nextSibling);
            }

            if(isUserIgnored(name))
			{
				a.setAttribute("href", name);
                                a.addEventListener('click', function(event) {
                                // event.target is the element that was clicked
                                event.stopPropagation();
                                event.preventDefault();
                                n = event.target.parentNode.getAttribute("href");
                                unignoreUser(n);
                                lastRestoredUser = n;
                                }, true);
                                //a.setAttribute("href", "#");
                                p.innerHTML = "Restore";
                                a.insertBefore(p, a.firstChild);
		    }
			else
			{
				a.setAttribute("href", "#");
                                a.setAttribute("href", name);
                                a.addEventListener('click', function(event) {
                                // event.target is the element that was clicked
                                event.stopPropagation();
                                event.preventDefault();

                                ignoreUser(event.target.parentNode.getAttribute("href"));
                                }, true);

                                p.innerHTML = "Ignore";
                                a.insertBefore(p, a.firstChild);
            }
			a.setAttribute("id", "hello");
            a.style.display = "block";

			postDetails.insertBefore(a, postDetails.firstChild.nextSibling.nextSibling.nextSibling);
		}
	}
}



//SPECIFY A MAXIMUM QUOTE DEPTH HERE
var maxQuoteDepth = 3;



function times(t, func)
{
	var start = Date.now();
	for (var i = 0; i < t; i++)
		func();
	return Date.now() - start;
}





if(GM_getValue("function_blockUsers", true)) BlockUsers(false);



})();