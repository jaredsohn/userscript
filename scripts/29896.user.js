// ==UserScript==
// @name           zdnetfrHighligthComments
// @namespace      http://dhardy44.free.fr
// @include        http://www.zdnet.fr/actualites/*
// ==/UserScript==

//license public domain

function numsort(a,b) {
    return parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
}

//get page
var location=window.location.pathname; 

//get my name
var Name = '';
if (document.getElementById ('membername')) {
    Name=document.getElementById ('membername').lastChild.textContent; 
}

//get read ids
var reg = new RegExp( location+":([^ ]+) ");
var listids = '';
var lastCommentId = '0';
if (GM_getValue('lastCommentIds')) {
	listids = GM_getValue('lastCommentIds').replace(reg, '').match(/([^ ]* ){0,20}/)[0]; // get 20 first others (for update at the end)
}
if (GM_getValue('lastCommentIds') && GM_getValue('lastCommentIds').search(reg) > -1) {
    lastCommentId = GM_getValue('lastCommentIds').match(reg)[1]; // get list id read
}

//treat each comment
var comments=document.getElementsByClassName('commentmetadata'); //get all comments in a NodeList
var commentsArray = new Array();
if (comments.length > 0) {
    commentsArray.push(lastCommentId);
    for(i=0; i<comments.length; i++){
        //highlight newer (orange)
        if( parseInt(comments[i].attributes.getNamedItem('id').value.match(/\d+/)[0]) > parseInt(lastCommentId.match(/\d+/)[0]) ) {
            comments[i].style.backgroundColor='orange';
            commentsArray.push(comments[i].attributes.getNamedItem('id').value); //populate table for sorting ids
        }
        
        //highlight my comments (green)
        if(comments[i].childNodes[2].firstChild.textContent == Name) {
            comments[i].style.backgroundColor='green';
        }
    }
    
    //listing des nouveau posts
    if (commentsArray.length > 1) {
        tmp = '<ul style="display:block; position:fixed; top: 5px; right: 5px; width: 140px; opacity: 0.50; margin: 0 auto 0 auto; border: 1px solid orange; margin: 5px; font-size: small; background-color: tan; color: #ffffff;">';
        for(i=1; i< commentsArray.length; i++) {
            tmp += '<li><a href="#' + commentsArray[i] + '">' + commentsArray[i] + '</a></li>';
        }
        tmp += '</ul>';
        var newItemsDiv = document.createElement("div");
        newItemsDiv.innerHTML = tmp;
        document.body.insertBefore(newItemsDiv, document.body.firstChild);
    }

    
    //save highest commentId read
    lastCommentIds = commentsArray.sort(numsort)[commentsArray.length - 1];
    GM_setValue('lastCommentIds',location + ':' + lastCommentIds + ' ' + listids);
}
