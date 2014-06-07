// ==UserScript==
// @name            [HF] Re-scale Image
// @description     Scale your image. Note - the maximum scaling for an image is 999x999.
// @author          Gambino
// @copyright       Gambino 2013+ (http://userscripts.org/users/521590)
//
// @version         1.0.3
//
// @match           http://*.hackforums.net/newreply.php?tid=*
// @match           http://*.hackforums.net/newthread.php?fid=*
// @match           http://*.hackforums.net/editpost.php?pid=*
//
// @history         1.0.3 - Changed button position so it doesn't break the editor.
// @history         1.0.2 - Now works with Firefox. Added the ability to add a url to your image (const ENLARGE)
// @history         1.0.1 - Script created
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

// START SCRIPT SETTINGS
const ENLARGE = ["This setting will attach the original URL your image was resized from (Set to either true or false)", true];
// END SCRIPT SETTINGS
/*













 Don't
 Touch
 Anything
 Below


















 */

if (navigator.userAgent.indexOf('Firefox') != -1){
    var elemToolBar, elemIcon, elemMsg, url, scale, s, img, w, h;
    var loadElem = setInterval(function(){
        if (document.getElementsByClassName("trow1")[0]){
            window.clearInterval(loadElem);
            wrapper();
        }
    },1000);
}else{
    wrapper();
}


function wrapper(){
    elemToolBar = document.getElementsByClassName("trow1");
    for (i = 0; i < elemToolBar.length; i++){
        if (elemToolBar[i].innerHTML.indexOf("Post Options") != -1){
            elemToolBar = elemToolBar[i];
        }
    }
    elemMsg = document.getElementById("message_new");
    elemToolBar.innerHTML += "<br /><br /><span id='ic0n44' class='bitButton' style='cursor: pointer;'>Image Resize</span>";
    elemIcon = document.getElementById("ic0n44");

    function mClick() {
        console.log(".------------ START USER SCRIPT DEBUG ------------.");
        if (!elemToolBar || !elemIcon || !elemMsg) {
            console.warn("There is an error.");
            return;
        }
        url = prompt("Please enter the image URL");
        if (!url){
            return;
        }
        cn("URL", url);
        scale = prompt("Please enter how much you'd like to scale the image(0-100)");
        if (!scale){
            return;
        }
        cn("Scale", scale);
        s = checkScale(scale) / 100;
        cn("Scale %", s);
        img = new Image();
        img.src = url;
        console.log("Downloading IMG...");
        var timer = setInterval(function(){
            if (img.width != 0 && img.height != 0){
                window.clearInterval(timer);
                fixScale();
                if (ENLARGE[1] === true){
                    insertAtCaret("message_new", "Click to enlarge:\n[url=" + url + "]" + "[img=" + w + "x" + h + "]" + url + "[/img][/url]");
                }else{
                    insertAtCaret("message_new", "[img=" + w + "x" + h + "]" + url + "[/img]");
                }

                console.log(".------------ END USER SCRIPT DEBUG ------------.");
            }
        },1000);
    }

    function fixScale() {
        w = img.width;
        h = img.height;
        do {
            cn("Fixed Scale", s);
            if (Math.floor(w - (w * s)) < 1000 && Math.floor(h - (h * s)) < 1000) {
                h = Math.floor(h - (h * s));
                w = Math.floor(w - (w * s));
                cn("Fixed W", w);
                cn("Fixed H", h);
            } else {
                s += 0.01;
                cn("Checking Width:", Math.floor(w - (w * s)));
                cn("Checking Height:", Math.floor(h - (h * s)));
            }
        } while (w > 1000 && h > 1000);
    }

    function checkScale(scale) {
        if (scale > 0 && scale < 100) {
            return scale;
        } else {
            console.log("[Image Scaling Script] Invalid scale number!");
            return 50;
        }
    }

    function cn(txt, val) {
        console.log("[Image Scaling Script] Var Name: " + txt + " || Var Value: " + val);
    }

    elemIcon.addEventListener("click", mClick, false);

    function insertAtCaret(areaId, text) {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
            "ff" : (document.selection ? "ie" : false));
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
        } else if (br == "ff") strPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0, strPos);
        var back = (txtarea.value).substring(strPos, txtarea.value.length);
        txtarea.value = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            range.moveStart('character', strPos);
            range.moveEnd('character', 0);
            range.select();
        } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
    }
}