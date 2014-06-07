// ==UserScript==

// @name           hdbTorrentSearch

// @description    searches for torrents with the same name as the current one

// @include        https://hdbits.org/details.php?id=*

// @include        http://hdbits.org/details.php?id=*

// ==/UserScript==



title = document.getElementsByTagName('h1')[0];



titleString = new String(title.innerHTML);



searchLink = document.createElement('a');

searchLink.innerHTML = 'search on HDBits';



if(titleString.match(/s[0-9][0-9]e[0-9][0-9]/i) != null){// show

    titleString = titleString.match(/^(.*?)( -)? s[0-9][0-9]e[0-9][0-9]/i)[1];

}else if(titleString.match(/ - /i) != null){

    titleString = titleString.match(/^(.*?) - /i)[1];

}// else just use original string



searchLink.href='browse.php?search='+titleString;

searchLink.title = 'search HDBits for "' + titleString + '"';



table = myNextSibling(title);

tbody = myFirstChild(table);

linkTD = tbody.firstChild.firstChild.nextSibling;



linkTD.appendChild(document.createTextNode(' | '));

linkTD.appendChild(searchLink);



// helping functions



function myFirstChild(obj){

    temp = obj.firstChild;

    while(temp.nodeType == 3){    //TEXT_NODE = 3

        temp = temp.nextSibling;

    }

    return temp;

}

function myNextSibling(obj){

    temp = obj.nextSibling;

    while(temp.nodeType == 3){    //TEXT_NODE = 3

        temp = temp.nextSibling;

    }

    return temp;

}