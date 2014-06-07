// ==UserScript==
// @name        PDOX webpage title change
// @namespace   https://userscripts.org/users/543794
// @description Change the title of a PDOX page based on folder/document name
// @include     http://bby1dms01/docmgmt*
// @version     1.2
// @grant       none
// ==/UserScript==

if (document.URL.search("fileinfo.cfm.*file_id\=") != -1)
{
    // Opened page is a document page
    ChangePdoxDocPageTitle();
}

if (document.URL.search("index.cfm.*folder\=") != -1)
{
    // Opened page is a folder page
    ChangePdoxFolderPageTitle();
}

function ChangePdoxDocPageTitle()
{
    document.title = "PDOX doc - " + document.getElementById("title").value;
}

function ChangePdoxFolderPageTitle()
{
    var PdoxPathFolders = document.getElementsByClassName("main-content")[0].textContent.replace(/(\r\n|\n|\r)/gm,"").replace(/\s{2,}/g, ' ').split(" Find Folder Up One Level Go to Root Legend")[0].split(" \\ ");
    document.title = "PDOX folder - " + PdoxPathFolders[PdoxPathFolders.length-1];
}
