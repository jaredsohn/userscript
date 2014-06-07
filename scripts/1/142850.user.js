// ==UserScript==
// @name           BBCodes
// @namespace      No Page
// @description    Add BBCode to MAL Forum posts
// @author         Al_eXs
// @include        *myanimelist.net/forum/?topicid=*
// @include        *myanimelist.net/forum/?action=message&msgid=*
// @include        *myanimelist.net/mymessages.php?go=send*
// @include        *myanimelist.net/editprofile.php*
// @match        *myanimelist.net/forum/?topicid=*
// @match        *myanimelist.net/forum/?action=message&msgid=*
// @match        *myanimelist.net/mymessages.php?go=send*
// @match        *myanimelist.net/editprofile.php*
// @version        1.0.3
// ==/UserScript==

function addtag(obj, tag) {

    beforeText = obj.value.substring(0, obj.selectionStart);
    selectedText = obj.value.substring(obj.selectionStart, obj.selectionEnd);
    afterText = obj.value.substring(obj.selectionEnd, obj.value.length);

    switch(tag) {
        
        case "bold":
            tagOpen = "[b]";
            tagClose = "[/b]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "strike":
            tagOpen = "[s]";
            tagClose = "[/s]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "italic":
            tagOpen = "[i]";
            tagClose = "[/i]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "underline":
            tagOpen = "[u]";
            tagClose = "[/u]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "code":
            tagOpen = "[code]";
            tagClose = "[/code]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "center":
            tagOpen = "[center]";
            tagClose = "[/center]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "right":
            tagOpen = "[right]";
            tagClose = "[/right]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "spoiler":
            tagOpen = "[spoiler]";
            tagClose = "[/spoiler]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "url":
            url = prompt("Enter URL", "");
            
            if (url == null) {
                break;
            }

            tagOpen = "[url=" + url + "]";
            tagClose = "[/url]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;

        case "image":
            imgURL = prompt("Enter image URL", "");

            if (imgURL == null) {
                break;
            }

            tagOpen = "[img]";
            tagClose = "[/img]";

            newText = beforeText + tagOpen + imgURL + tagClose + afterText;
            break;
            
        case "size":
     //       txtsize = prompt("Enter the size", "");
            txtsize = document.getElementById("Size");
            
            if (txtsize == "Size") {
                break;
            }

            tagOpen = "[size=" + String(txtsize.value) + "]";
            tagClose = "[/size]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "profile":
            profile = prompt("Enter profile name", "");
            
            if (profile == null) {
                break;
            }

            tagOpen = "[profile=" + profile + "]";
            tagClose = "[/profile]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "youtube":
            yt = prompt("Enter complete youtube url", "");
            
            if (yt == null) {
                break;
            }
            
            yt1 = yt.replace("http://www.youtube.com/watch?v=","");
            yt2 = yt1.substring(0,11);

            tagOpen = "[yt]";
            tagClose = "[/yt]";

            newText = beforeText + tagOpen + yt2 + tagClose + afterText;
            break;
            
        case "color":
//            color = prompt("Enter color", "");
            color = document.getElementById("Color");
            
            if (color == "Select") {
                break;
            }

            tagOpen = "[color=" + String(color.value) + "]";
            tagClose = "[/color]";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
    }

    obj.value = newText;
}

function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getXpathRes(){
	var path = xpath("//textarea[@class='textarea']");
	return (path.snapshotLength > 0) ?  path : false;
}

var xpathRes = getXpathRes();

if(xpathRes){
	var div1 = document.createElement("div");
	div1.style="margin: 0px; margin-top:10px; margin-bottom:5px";
	div1.align ="Left";
	div1.id = "myBBcode";
	div1.innerHTML = " ";
	div1.style.display = "block";

	xpathRes.snapshotItem(0).parentNode.insertBefore(div1, xpathRes.snapshotItem(0));

	var post = document.createElement("input");
	post.type = "button";
	post.value = "Bold";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'bold');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Italic";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'italic');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Strike";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'strike');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Underline";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'underline');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Code";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'code');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Center";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'center');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Right";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'right');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "URL";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'url');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Spoiler";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'spoiler');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "IMG";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'image');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Youtube";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'youtube');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "Profile";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'profile');}, false);
	div1.appendChild(post);
    var post = document.createElement("select");
	post.id = "Size";
	//post.value = "Size";
        var opt = document.createElement("option");
        opt.value = "Size";
        opt.appendChild(document.createTextNode('Size'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "50";
        opt.appendChild(document.createTextNode('Small'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "100";
        opt.appendChild(document.createTextNode('Normal'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "300";
        opt.appendChild(document.createTextNode('Medium'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "600";
        opt.appendChild(document.createTextNode('Big'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "900";
        opt.appendChild(document.createTextNode('Ultra Big'));
        post.appendChild(opt);
    post.addEventListener('change', function() {addtag(document.getElementsByTagName("textarea")[0],'size');}, false);
	div1.appendChild(post);
    var post = document.createElement("select");
	post.id = "Color";
	//post.value = "Color";
        var opt = document.createElement("option");
        opt.value = "Select";
        opt.appendChild(document.createTextNode('Select Color'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "blue";
        opt.appendChild(document.createTextNode('Blue'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "red";
        opt.appendChild(document.createTextNode('Red'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "yellow";
        opt.appendChild(document.createTextNode('Yellow'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "pink";
        opt.appendChild(document.createTextNode('Pink'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "navy";
        opt.appendChild(document.createTextNode('Navy'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "white";
        opt.appendChild(document.createTextNode('White'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "black";
        opt.appendChild(document.createTextNode('Black'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "orange";
        opt.appendChild(document.createTextNode('Orange'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "purple";
        opt.appendChild(document.createTextNode('Purple'));
        post.appendChild(opt);
	post.addEventListener('change', function() {addtag(document.getElementsByTagName("textarea")[0],'color');}, false);
	div1.appendChild(post);
}