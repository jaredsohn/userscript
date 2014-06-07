// ==UserScript==
// @name           Report_form
// @description    Add form to MAL reports
// @author         Serhiyko
// @include        *myanimelist.net/modules.php?go=report*
// @include        *myanimelist.net/dbchanges.php?go=report*
// @match        *myanimelist.net/modules.php?go=report*
// @match        *myanimelist.net/dbchanges.php?go=report*
// @version        1.0.0
// @downloadURL https://userscripts.org/scripts/source/377884.user.js
// @updateURL https://userscripts.org/scripts/source/377884.meta.js
// ==/UserScript==

function addtag(obj, tag) {

    beforeText = obj.value.substring(0, obj.selectionStart);
    selectedText = obj.value.substring(obj.selectionStart, obj.selectionEnd);
    afterText = obj.value.substring(obj.selectionEnd, obj.value.length);

    switch(tag) {

        case "hello":
            tagOpen = "Hello MAL mod team! Thanks in advance for working on this report of mine, I reported the following review/recommendation/post because it...\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
        
        case "language":
            tagOpen = "[ ] ... is written in another language than English.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "too":
            tagOpen = "[ ] ... is too short/long.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;

        case "grammar":
            tagOpen = "[ ] ... lacks correct grammar, full sentences, punctuation and proper capitalization.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;

        case "arguments":
            tagOpen = "[ ] ... lacks balanced out arguments and respective supportive evidence.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "finalized":
            tagOpen = "[ ] ... isn't written in a finalized form that is required for such a post.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;

        case "plagiarizes":
            source = prompt("Enter source URL", "");
            
            if (source == null) {
                break;
            }

            tagOpen = "[ ] ... plagiarizes. Here's the original source: [url=" + source + "]";
            tagClose = "[/url]\n";

            newText = beforeText + tagOpen + selectedText + tagClose + afterText;
            break;
            
        case "spoilers":
            tagOpen = "[ ] ... includes excessive spoilers.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "unwelcomed":
            tagOpen = "[ ] ... includes unwelcomed content such as URLs, personal information of any kind, excessive profanity, obsceneties, formatting and emoticons, content prohibited on MAL.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "minimum":
            tagOpen = "[ ] ... is written before the user read/watched the allowed minimum amount of chapters/episodes required for this post.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "available":
            tagOpen = "[ ] ... includes mostly content that is already available on MAL (genres, producers/directors/mangaka/magazine/VAs, score/popularity, relations).\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "insult":
            tagOpen = "[ ] ... is written with the intent to insult, bait or otherwise rile up mods, users, certain fanbases or people with a specific religion, opinion on controversial matters, etc.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "off-topic":
            tagOpen = "[ ] ... contains off-topic content.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "necroposting":
            tagOpen = "[ ] ... falls under necroposting.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "unproductive":
            tagOpen = "[ ] ... lacks any kind of productive content that contributes to the topic at hand (simple listing, youtube video or picture collecting, remarks consisting of 1-2 words, spam).\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;

        case "board":
            tagOpen = "[ ] ... isn't posted in the right board.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "rules":
            tagOpen = "[ ] ... violates board-specific rules.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;

        case "inexperience":
            tagOpen = "[ ] ... contains a variation of \"this is my first [X] so please be gentle\". Inexperience is no excuse.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;
            
        case "regular":
            tagOpen = "[ ] ... is written by a CD regular and we all know they deserve to be banned as they drag down the entire website.\n";

            newText = beforeText + tagOpen + selectedText + afterText;
            break;

        case "thanks":
            tagOpen = "Once again thanks in advance for processing this report as soon as possible. Have a nice day!\n";

            newText = beforeText + tagOpen + selectedText + afterText;
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
	if(path.snapshotLength == 0) path = xpath("//textarea[@class='inputtext']");
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
	post.value = "hello MAL";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'hello');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "another language";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'language');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "too short/long";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'too');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "incorrect grammar";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'grammar');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "unbalanced arguments";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'arguments');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "not finalized form";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'finalized');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "plagiarizes";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'plagiarizes');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "spoilers";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'spoilers');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "unwelcomed content";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'unwelcomed');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "no minimum amount";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'minimum');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "available content";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'available');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "insult";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'insult');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "off-topic";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'off-topic');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "necroposting";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'necroposting');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "unproductive content";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'unproductive');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "wrong board";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'board');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "board-specific rules";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'rules');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "inexperience";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'inexperience');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "CD regular";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'regular');}, false);
	div1.appendChild(post);
    var post = document.createElement("input");
	post.type = "button";
	post.value = "thanks MAL";
	post.addEventListener('click', function() {addtag(document.getElementsByTagName("textarea")[0],'thanks');}, false);
	div1.appendChild(post);
}