// ==UserScript==
// @author      http://steamcommunity.com/profiles/76561198008284817/
// @name        BBCode Buttons for DotaOutpost
// @version     1.0
// @description Adds BBCode buttons to dotaoutpost.
// @include     http://www.dotaoutpost.com/new
// @include     http://www.dotaoutpost.com/trade/*

// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @downloadURL https://userscripts.org/scripts/source/178799.user.js
// @updateURL   https://userscripts.org/scripts/source/178799.meta.js
// ==/UserScript==
GM_addStyle(".hov:hover{background:#2a2a2a; border-radius:5px; color:#FFFFFF} .hov:active{border:2px solid #FFFFFF} .tonbou{margin:0px 5px 5px 0px; width: 27px ;height: 27px;padding:0px} .cc{background:#2a2a2a; color:#FFFFFF; border-radius:5px; border-color:#FFFFFF; margin:0px 5px 5px 0px; width: 120px ;height: 27px;padding:0px 0px 0px 5px}");
$('textarea.notes').css({
    margin: '0 0 0'
});

function wtf(jNode) {
    function addtag(obj, tag) {
        beforeText = obj.value.substring(0, obj.selectionStart);
        selectedText = obj.value.substring(obj.selectionStart, obj.selectionEnd);
        afterText = obj.value.substring(obj.selectionEnd, obj.value.length);
        switch (tag) {
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
            case "underline":
                tagOpen = "[u]";
                tagClose = "[/u]";
                newText = beforeText + tagOpen + selectedText + tagClose + afterText;
                break;
            case "italic":
                tagOpen = "[i]";
                tagClose = "[/i]";
                newText = beforeText + tagOpen + selectedText + tagClose + afterText;
                break;
            case "color":
                //color = prompt("Enter color", "");
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
        if (!object) var object = document;
        return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function getXpathRes() {
        var path = xpath("//textarea[@name='notes']");
        return (path.snapshotLength > 0) ? path : false;
    }
    var xpathRes = getXpathRes();
    if (xpathRes) {
        var div1 = document.createElement("div");
        div1.align = "Left";
        div1.id = "BBcode4tf2ot";
        div1.innerHTML = " ";
        div1.style.display = "block";
        // div1.style.margin = "20px 0 -30px";
        div1.style.margin = "10px 0 0px";
        xpathRes.snapshotItem(0).parentNode.insertBefore(div1, xpathRes.snapshotItem(0));
        var post = document.createElement("input");
        post.type = "button";
        post.style.fontWeight = "900";
        post.value = "B";
        post.className = "tonbou hov";
        post.addEventListener('click', function () {
            addtag(document.getElementsByName("notes")[0], 'bold');
        }, false);
        div1.appendChild(post);
        var post = document.createElement("input");
        post.type = "button";
        post.style.fontStyle = "italic";
        post.value = "I";
        post.className = "tonbou hov";
        post.addEventListener('click', function () {
            addtag(document.getElementsByName("notes")[0], 'italic');
        }, false);
        div1.appendChild(post);
        var post = document.createElement("input");
        post.type = "button";
        post.style.textDecoration = "line-through";
        post.value = "S";
        post.className = "tonbou hov";
        post.addEventListener('click', function () {
            addtag(document.getElementsByName("notes")[0], 'strike');
        }, false);
        div1.appendChild(post);
        var post = document.createElement("input");
        post.type = "button";
        post.style.textDecoration = "underline";
        post.value = "U";
        post.className = "tonbou hov";
        post.addEventListener('click', function () {
            addtag(document.getElementsByName("notes")[0], 'underline');
        }, false);
        div1.appendChild(post);
        var post = document.createElement("select");
        post.id = "Color";
        post.className = "cc hov";
        var opt = document.createElement("option");
        opt.value = "1";
        opt.style.display = "none";
        opt.appendChild(document.createTextNode('Select color'));
        post.appendChild(opt);
        //colors
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode('--------------------- Colors ---------------------'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#FF0000";
        opt.style.color = '#FF0000';
        opt.appendChild(document.createTextNode('Red'));
        post.appendChild(opt)
        ;var opt = document.createElement("option");
        opt.value = "#00FF00";
        opt.style.color = '#00FF00';
        opt.appendChild(document.createTextNode('Green'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#0000FF";
        opt.style.color = '#0000FF';
        opt.appendChild(document.createTextNode('Blue'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#FFFF00";
        opt.style.color = '#FFFF00';
        opt.appendChild(document.createTextNode('Yellow'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#FF00FF";
        opt.style.color = '#FF00FF';
        opt.appendChild(document.createTextNode('Pink'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#C0C0C0";
        opt.style.color = '#C0C0C0';
        opt.appendChild(document.createTextNode('Gray'));
        post.appendChild(opt);
        //item quality
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode('------------------ Item Quality ------------------'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#B0C3D9";
        opt.style.color = '#B0C3D9';
        opt.appendChild(document.createTextNode('Common'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#5E98D9";
        opt.style.color = '#5E98D9';
        opt.appendChild(document.createTextNode('Uncommon'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#4B69FF";
        opt.style.color = '#4B69FF';
        opt.appendChild(document.createTextNode('Rare'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#8847FF";
        opt.style.color = '#8847FF';
        opt.appendChild(document.createTextNode('Mythical'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#D32CE6";
        opt.style.color = '#D32CE6';
        opt.appendChild(document.createTextNode('Legendary'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#EB4B4B";
        opt.style.color = '#EB4B4B';
        opt.appendChild(document.createTextNode('Ancient'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#E4AE33";
        opt.style.color = '#E4AE33';
        opt.appendChild(document.createTextNode('Immortal'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#ADE55C";
        opt.style.color = '#ADE55C';
        opt.appendChild(document.createTextNode('Arcana'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode(''));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#CF6A32";
        opt.style.color = '#CF6A32';
        opt.appendChild(document.createTextNode('Strange'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#476291";
        opt.style.color = '#476291';
        opt.appendChild(document.createTextNode('Vintage'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#4D7455";
        opt.style.color = '#4D7455';
        opt.appendChild(document.createTextNode('Genuine'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#8650AC";
        opt.style.color = '#8650AC';
        opt.appendChild(document.createTextNode('Unusual'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#8650AC";
        opt.style.color = '#8650AC';
        opt.appendChild(document.createTextNode('Tournament'));
        post.appendChild(opt);
        ;var opt = document.createElement("option");
        opt.value = "#70B04A";
        opt.style.color = '#70B04A';
        opt.appendChild(document.createTextNode('Self-Made'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode('----------------- Outpost Ranks -----------------'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#5f8c1e";
        opt.style.color = '#5f8c1e';
        opt.appendChild(document.createTextNode('Outpost $1 Donator'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#d5731c";
        opt.style.color = '#d5731c';
        opt.appendChild(document.createTextNode('Outpost $5 Donator'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#4fa3ca";
        opt.style.color = '#4fa3ca';
        opt.appendChild(document.createTextNode('Outpost $10 Donator'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#b57de4";
        opt.style.color = '#b57de4';
        opt.appendChild(document.createTextNode('Outpost VIP User'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#ff4e4e";
        opt.style.color = '#ff4e4e';
        opt.appendChild(document.createTextNode('Outpost Banned User'));
        post.appendChild(opt);
        post.addEventListener('change', function () {
            addtag(document.getElementsByName("notes")[0], 'color');
            document.getElementById("Color").value = 1;
        }, false);
        div1.appendChild(post);
    }
}
waitForKeyElements("#notes_edit_modal", wtf);
/*--- waitForKeyElements():  A handy, utility function that
    does what it says.
*/
function waitForKeyElements(
selectorTxt,
/* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
actionFunction,
/* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
bWaitOnce,
/* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
iframeSelector
/* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;
    if (typeof iframeSelector == "undefined") targetNodes = $(selectorTxt);
    else targetNodes = $(iframeSelector).contents()
        .find(selectorTxt);
    if (targetNodes && targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each(function () {
            var jThis = $(this);
            var alreadyFound = jThis.data('alreadyFound') || false;
            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction(jThis);
                jThis.data('alreadyFound', true);
            }
        });
        btargetsFound = true;
    } else {
        btargetsFound = false;
    }
    //--- Get the timer-control variable for this selector.
    var controlObj = waitForKeyElements.controlObj || {};
    var controlKey = selectorTxt.replace(/[^\w]/g, "_");
    var timeControl = controlObj[controlKey];
    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj[controlKey];
    } else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval(function () {
                waitForKeyElements(selectorTxt,
                actionFunction,
                bWaitOnce,
                iframeSelector);
            },
            500);
            controlObj[controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}
wtf();