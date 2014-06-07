// ==UserScript==
// @name           Jmountain Quick URL Upload
// @namespace      google.com
// @description    go to whatimg.com/index.php?url=1&img=imageUrl to quickly upload it to whatimg
// @include        http://whatimg.com/index.php?url=1&img=*
// ==/UserScript==

var url = /img=(.+)$/.exec(window.location.href)[1];
var folder = '• Album Covers'; //Replace me with the name of the folder you wish to use
//To upload to a different folder, it needs to be prepended with '• ' (no quotes)

//Select the folder
var folders = document.getElementsByTagName("select")[0].getElementsByTagName("option");
var folderFound = false;
for (var i=0; i<folders.length; i++) {
    if (folders[i].innerHTML == folder) {
        folders[i].selected = true;
        i = folders.length;
        folderFound = true;
    }
}

var continueUpload = true;
if (!folderFound) {
    continueUpload = confirm("Folder does not exist, Upload anyway?");
}

if (continueUpload) {
    document.getElementsByTagName("input")[0].value = url;
    document.getElementsByTagName("form")[0].submit();
}