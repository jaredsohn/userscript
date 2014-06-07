// ==UserScript==
// @name           gist fill in fileName automatically
// @namespace      http://efcl.info/
// @description    Fill in the filename automatically When pasting a Greasemonkey script.
// @include        http://gist.github.com/
// @include        https://gist.github.com/
// ==/UserScript==

/*  GRATITUDE
 ペーストされたテキストを置き換えるスクリプト
 http://gist.github.com/338606
 */
var fileExtension = ".user.js";
var addAutoEvent = function(fileID) {
    var editArea = document.getElementsByName("file_contents[gistfile" + fileID + "]")[0];
    var editFileName = document.getElementsByName("file_name[gistfile" + fileID + "]")[0];
    var editDescription = document.getElementsByName("description")[0];
    editArea.addEventListener("paste", function(e) {
        // この瞬間はまだtargetのvalueが空である。
        var obj = e.target;
        obj.addEventListener('input', function(evt) {
            // クリップボードの内容がinputされた
            evt.currentTarget.removeEventListener(evt.type, arguments.callee, false);
            var pasteValue = obj.value;
            // name
            var atName = pasteValue.match(/@name\s+([\w\s]+)/i);
            atName = atName && atName[1];
            // description
            var atDesc = pasteValue.match(/@description\s+(.*)/i);
            atDesc = atDesc && atDesc[1];
            if (atName && !editFileName.value) {
                atName = atName.replace(/\s+$/, "");
                // m = m.replace(" " , "_" , "g");// 第３引数 繰り返し
                editFileName.value = atName + fileExtension;
                // console.log(m + fileExtension);
                if(atDesc){
                    editDescription.value = atDesc;
                }
                editFileName.focus();
            }
        }, false);
    }, false);
};
// 追加されたテキストエリアにもイベントをつける
var addButton = document.getElementById("add-gist");
addButton.addEventListener("click", function() {
    document.getElementById("files").addEventListener("DOMNodeInserted", function(e) {
        // テキストエリアが追加された         
        e.currentTarget.removeEventListener(e.type, arguments.callee, false);
        var editAreaLength = document.getElementsByClassName("file").length;
        addAutoEvent(editAreaLength);
    }, false);
}, false);
// 最初から表示されているテキストエリアにイベントをつける
addAutoEvent(1);
