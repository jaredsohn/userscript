// ==UserScript==
// @name          SlimrFlickr
// @description   Removes annoying info on Flickr homepage.
// @include       http://flickr.com/
// @include		  http://*.flickr.com/
// ==/UserScript==

//==============================================================
// Configuration
//==============================================================

var display_news = "yes" // "yes" or "no" - This enables/disables the Flickr News block on the right and the seperating border.
var tagsearch_all = "yes" // "yes" or "no" - This enables/disables the optional tag search for all of Flickr on your home window.
var tagsearch_yours = "yes" // "yes" or "no" - This enables/disables the optional tag search for your photos on your home window.
var username = "-" // "-" or "username" - You can enter your username here if you would like, or let the script get your UserID for you.


//************************* Do not edit below this line unless you know what you are doing ********************************


//==============================================================
// Ultimate getElementsByClassName by Robert Nyman
// http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
//==============================================================

function getElementsByClassName(oElm, strTagName, oClassNames){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var arrRegExpClassNames = new Array();
    if(typeof oClassNames == "object"){
        for(var i=0; i<oClassNames.length; i++){
            arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames[i].replace(/\-/g, "\\-") + "(\\s|$)"));
        }
    }
    else{
        arrRegExpClassNames.push(new RegExp("(^|\\s)" + oClassNames.replace(/\-/g, "\\-") + "(\\s|$)"));
    }
    var oElement;
    var bMatchesAll;
    for(var j=0; j<arrElements.length; j++){
        oElement = arrElements[j];
        bMatchesAll = true;
        for(var k=0; k<arrRegExpClassNames.length; k++){
            if(!arrRegExpClassNames[k].test(oElement.className)){
                bMatchesAll = false;
                break;                      
            }
        }
        if(bMatchesAll){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}

//==============================================================
// Get Table Structure for left and right cells
//==============================================================

var myTables = document.getElementsByTagName('table');
var navtable = myTables[0];
var maintable = myTables[1];
var cells = maintable.getElementsByTagName('td');
var leftcell = cells[0];
var rightcell = cells[1];

//==============================================================
// Restyle cell widths
//==============================================================
leftcell.style.width = "420px";
rightcell.style.width = "300px";

//==============================================================
// Place content within a div for centering abilities, and move
// content from right cell to left cell, then place news into
// right cell and style.
//==============================================================

contentdiv = document.createElement("div");
contentdiv.id = "content";
contentdiv.innerHTML = rightcell.innerHTML;
contentdiv.style.width = "400px";

rightcell.innerHTML = "";

var newsinfo = getElementsByClassName(document, "div", "HomeBox")[0].innerHTML;

leftcell.innerHTML = "";
leftcell.appendChild(contentdiv);

if(display_news=="yes" || tagsearch_all=="yes" || tagsearch_yours=="yes"){
	leftcell.style.borderRight = "1px dotted #dadada";
}

rightcell.style.paddingLeft = "40px";
rightcell.style.paddingTop = "15px";
if(display_news == "yes"){
	rightcell.innerHTML = newsinfo;
	rightcell.getElementsByTagName('h3')[0].style.paddingTop = "10px";
} else if((display_news != "yes") && (tagsearch_all != "yes") && (tagsearch_yours != "yes")) {
	rightcell.style.display = "none";
}


//==============================================================
// OPTIONAL (use variable in configurtion at the top to turn on
// or off these tag search boxes)
//==============================================================
function isloggedin() {
    if (username == "-")
        username = getuserid();

    return (username != "");
}

function getuserid() {
    var u

    try {
        var imgs = document.getElementsByTagName("img")
        var nsid_regex = new RegExp("/buddyicons/([^\.]*)\.jpg")

        for (i in imgs) {
            var nsid_matches = nsid_regex.exec(imgs[i].src)
            if (nsid_matches && nsid_matches.length >= 2) {
                return nsid_matches[1];
            }
        }
    }
    catch (e) {
        GM_log(e)
    }

    return u
}

if(isloggedin()){
	if(tagsearch_all=="yes"){
		searchbox_header = document.createElement('h3');
		searchbox_header.style.paddingTop = "10px";
		searchbox_header.innerHTML = "&raquo; <a href=\"http://flickr.com/photos/tags/\" title=\"Tag Search\">Tag Search</a> <span style=\"font-size: 12px; color: #000;\">(Everyones)</span>";
		rightcell.appendChild(searchbox_header);

		searchbox_form = document.createElement('form');
		searchbox_form.action = "http://flickr.com/photos/tags/";
		searchbox_form.method = "get";

		searchbox_input = document.createElement('input');
		searchbox_input.type = "text";
		searchbox_input.name = "q";
		searchbox_input.value = "";
		searchbox_input.style.marginRight = "5px";

		searchbox_submit = document.createElement('input');
		searchbox_submit.type = "submit";
		searchbox_submit.value = "SEARCH";
		searchbox_submit.className = "Butt";

		searchbox_form.appendChild(searchbox_input);
		searchbox_form.appendChild(searchbox_submit);
		rightcell.appendChild(searchbox_form);
	}

	if(tagsearch_yours=="yes"){

		searchbox_header_yours = document.createElement('h3');
		searchbox_header_yours.style.paddingTop = "10px";
		searchbox_header_yours.innerHTML = "&raquo; <a href=\"http://flickr.com/photos/"+username+"/tags/\" title=\"Your Tags Search\">Your Tags</a>";
		rightcell.appendChild(searchbox_header_yours);

		searchbox_form_yours = document.createElement('form');
		searchbox_form_yours.action = "http://flickr.com/photos/"+username+"/search/";
		searchbox_form_yours.method = "post";

		searchbox_input_yours = document.createElement('input');
		searchbox_input_yours.type = "text";
		searchbox_input_yours.name = "tags";
		searchbox_input_yours.value = "";
		searchbox_input_yours.id = "search_input";
		searchbox_input_yours.style.marginRight = "5px";

		searchbox_input_hidden = document.createElement('input');
		searchbox_input_hidden.type = "hidden";
		searchbox_input_hidden.name = "done";
		searchbox_input_hidden.value = "1";

		searchbox_submit_yours = document.createElement('input');
		searchbox_submit_yours.type = "submit";
		searchbox_submit_yours.value = "SEARCH";
		searchbox_submit_yours.className = "Butt";

		searchbox_form_yours.appendChild(searchbox_input_yours);
		searchbox_form_yours.appendChild(searchbox_input_hidden);
		searchbox_form_yours.appendChild(searchbox_submit_yours);
		rightcell.appendChild(searchbox_form_yours);	
	}
}