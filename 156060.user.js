// ==UserScript==
// @author      http://steamcommunity.com/id/lautre/
// @name        BBcode4TF2Outpost
// @version     1.2.7
// @description Simple BBcode buttons.
// @include     http://www.tf2outpost.com/new
// @include     http://www.tf2outpost.com/trade/*

// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @downloadURL https://userscripts.org/scripts/source/156060.user.js
// @updateURL   https://userscripts.org/scripts/source/156060.meta.js
// ==/UserScript==
GM_addStyle(".hov:hover{background:#51463e} .hov:active{border:2px solid #945312} .tonbou{margin:0px 5px 5px 0px; width: 27px ;height: 27px;padding:0px} .cc{margin:0px 5px 5px 0px; width: 120px ;height: 27px;padding:0px 0px 0px 5px}");
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
        var opt = document.createElement("option");
        opt.value = "red";
        opt.style.color = 'red';
        opt.appendChild(document.createTextNode('Red'));
        post.appendChild(opt);
        //item quality
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode('------------------ Item Quality ------------------'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#70B04A";
        opt.style.color = '#70B04A';
        opt.appendChild(document.createTextNode('Community - Self-Made'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#4D7455";
        opt.style.color = '#4D7455';
        opt.appendChild(document.createTextNode('Genuine'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#38F3AB";
        opt.style.color = '#38F3AB';
        opt.appendChild(document.createTextNode('Haunted'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#CF6A32";
        opt.style.color = '#CF6A32';
        opt.appendChild(document.createTextNode('Strange'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#FFD700";
        opt.style.color = '#FFD700';
        opt.appendChild(document.createTextNode('Unique'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#8650AC";
        opt.style.color = '#8650AC';
        opt.appendChild(document.createTextNode('Unusual'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#476291";
        opt.style.color = '#476291';
        opt.appendChild(document.createTextNode('Vintage'));
        post.appendChild(opt);
        //paints, Team colors should be rewritten
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode('--------------------- Paints ----------------------'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#2F4F4F";
        opt.style.color = '#2F4F4F';
        opt.appendChild(document.createTextNode('A Color Similar to Slate'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#7D4071";
        opt.style.color = '#7D4071';
        opt.appendChild(document.createTextNode('A Deep Commitment to Purple'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#141414";
        opt.style.color = '#141414';
        opt.appendChild(document.createTextNode('A Distinctive Lack of Hue'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#BCDDB3";
        opt.style.color = '#BCDDB3';
        opt.appendChild(document.createTextNode("A Mann's Mint"));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#2D2D24";
        opt.style.color = '#2D2D24';
        opt.appendChild(document.createTextNode('After Eight'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#7E7E7E";
        opt.style.color = '#7E7E7E';
        opt.appendChild(document.createTextNode('Aged Moustache Grey'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#E6E6E6";
        opt.style.color = '#E6E6E6';
        opt.appendChild(document.createTextNode('An Extraordinary Abundance of Tinge'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#E7B53B";
        opt.style.color = '#E7B53B';
        opt.appendChild(document.createTextNode('Australium Gold'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#D8BED8";
        opt.style.color = '#D8BED8';
        opt.appendChild(document.createTextNode('Color No. 216-190-216'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#E9967A";
        opt.style.color = '#E9967A';
        opt.appendChild(document.createTextNode('Dark Salmon Injustice'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#808000";
        opt.style.color = '#808000';
        opt.appendChild(document.createTextNode('Drably Olive'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#729E42";
        opt.style.color = '#729E42';
        opt.appendChild(document.createTextNode('Indubitably Green'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#CF7336";
        opt.style.color = '#CF7336';
        opt.appendChild(document.createTextNode('Mann Co. Orange'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#A57545";
        opt.style.color = '#A57545';
        opt.appendChild(document.createTextNode('Muskelmannbraun'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#51384A";
        opt.style.color = '#51384A';
        opt.appendChild(document.createTextNode("Noble Hatter's Violet"));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#C5AF91";
        opt.style.color = '#C5AF91';
        opt.appendChild(document.createTextNode('Peculiarly Drab Tincture'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#FF69B4";
        opt.style.color = '#FF69B4';
        opt.appendChild(document.createTextNode('Pink as Hell'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#694D3A";
        opt.style.color = '#694D3A';
        opt.appendChild(document.createTextNode('Radigan Conagher Brown'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#32CD32";
        opt.style.color = '#32CD32';
        opt.appendChild(document.createTextNode('The Bitter Taste of Defeat and Lime'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#F0E68C";
        opt.style.color = '#F0E68C';
        opt.appendChild(document.createTextNode("The Color Gentlemann's Business Pants"));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#7C6C57";
        opt.style.color = '#7C6C57';
        opt.appendChild(document.createTextNode('Ye Olde Rustic Colour'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#424F3B";
        opt.style.color = '#424F3B';
        opt.appendChild(document.createTextNode('Zepheniah s Greed'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#654740";
        opt.style.color = '#654740';
        opt.appendChild(document.createTextNode('An Air of Debonair #1'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#28394D";
        opt.style.color = '#28394D';
        opt.appendChild(document.createTextNode('An Air of Debonair #2'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#3B1F23";
        opt.style.color = '#3B1F23';
        opt.appendChild(document.createTextNode('Balaclavas Are Forever #1'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#18233D";
        opt.style.color = '#18233D';
        opt.appendChild(document.createTextNode('Balaclavas Are Forever #2'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#C36C2D";
        opt.style.color = '#C36C2D';
        opt.appendChild(document.createTextNode('Cream Spirit #1'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#B88035";
        opt.style.color = '#B88035';
        opt.appendChild(document.createTextNode('Cream Spirit #2'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#483838";
        opt.style.color = '#483838';
        opt.appendChild(document.createTextNode("Operator's Overalls #1"));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#384248";
        opt.style.color = '#384248';
        opt.appendChild(document.createTextNode("Operator's Overalls #2"));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#B8383B";
        opt.style.color = '#B8383B';
        opt.appendChild(document.createTextNode('Team Spirit #1'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#5885A2";
        opt.style.color = '#5885A2';
        opt.appendChild(document.createTextNode('Team Spirit #2'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#803020";
        opt.style.color = '#803020';
        opt.appendChild(document.createTextNode('The Value of Teamwork #1'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#256D8D";
        opt.style.color = '#256D8D';
        opt.appendChild(document.createTextNode('The Value of Teamwork #2'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#A89A8C";
        opt.style.color = '#A89A8C';
        opt.appendChild(document.createTextNode('Waterlogged Lab Coat #1'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#839FA3";
        opt.style.color = '#839FA3';
        opt.appendChild(document.createTextNode('Waterlogged Lab Coat #2'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.disabled = "disabled";
        opt.appendChild(document.createTextNode('--------------------- Extras ---------------------'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#3B342F";
        opt.style.color = '#3B342F';
        opt.appendChild(document.createTextNode('Invisible text'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#8D834B";
        opt.style.color = '#8D834B';
        opt.appendChild(document.createTextNode('Rarity2 quality color'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#70550F";
        opt.style.color = '#70550F';
        opt.appendChild(document.createTextNode('Rarity3 quality color'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#CD9B1D";
        opt.style.color = '#CD9B1D';
        opt.appendChild(document.createTextNode('Original strange quality color'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#B2B2B2";
        opt.style.color = '#B2B2B2';
        opt.appendChild(document.createTextNode('Normal quality color'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#A50F79";
        opt.style.color = '#A50F79';
        opt.appendChild(document.createTextNode('Valve quality color'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#5f8c1e";
        opt.style.color = '#5f8c1e';
        opt.appendChild(document.createTextNode('tf2op $1 Donator'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#d5731c";
        opt.style.color = '#d5731c';
        opt.appendChild(document.createTextNode('tf2op $5 Donator'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#4fa3ca";
        opt.style.color = '#4fa3ca';
        opt.appendChild(document.createTextNode('tf2op $10 Donator'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#b57de4";
        opt.style.color = '#b57de4';
        opt.appendChild(document.createTextNode('tf2op VIP'));
        post.appendChild(opt);
        var opt = document.createElement("option");
        opt.value = "#ff4e4e";
        opt.style.color = '#ff4e4e';
        opt.appendChild(document.createTextNode('tf2op Banned'));
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