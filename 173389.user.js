// ==UserScript==
// @name        SoundBible Downloader
// @namespace   soundbibledownloader
// @description Adds download links to soundbible.com
// @include     http://soundbible.com/*
// @include     soundbible.com/*
// @run-at      document-end
// @version     1
// ==/UserScript==

console.info("SoundBible Downloader 1.0");
function findTable(){
    datatable = null;
    main = document.getElementById("main");
    for(i = 0;i<main.children.length;i++){
        if(main.children.item(i).tagName.toUpperCase() == "TABLE"){
            datatable = main.children.item(i).children.item(0);
            break;
        }
    }
    return datatable;
}

function addLinks(){
    datatable = findTable();
    if(datatable == null){
        console.info("Failed to find table.");
        return;
    }
    columnTitle = document.createElement('th');
    columnTitleBottom = document.createElement('th');
    columnTitle.innerHTML = "Download";
    columnTitleBottom.innerHTML = "Download";
    datatable.children.item(0).appendChild(columnTitle);
    for(i = 1;i<datatable.children.length-1;i++){
        try{
            cur = datatable.children.item(i);
            newElement = document.createElement('td');
            cur.appendChild(newElement);
        
            fileparam = cur.children.item(1).children.item(0).children.item(5).getAttribute("value");
            headerless = fileparam.replace("theFile=", "");
            link = headerless.split(".mp3")[0]+".mp3";
        
            newElement.innerHTML = "<a href='"+link+"'>Download</a>";
        }catch(err){}
    }
    datatable.children.item(datatable.children.length-1).appendChild(columnTitleBottom);
}

addLinks();