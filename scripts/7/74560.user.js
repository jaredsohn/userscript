// ==UserScript==
// @name           BacklogUtl
// @namespace      http://twitter.com/niwaringo
// @description    BacklogUtl
// @include        https://*.backlog.jp/view/*
// ==/UserScript==

var getElem = {
    parents : function ( elem, tagName ) {
        var selfElem = elem;

        while ( selfElem.nodeName != "BODY" ) {
            if ( selfElem.nodeName == tagName ) {
                break;
            }
            selfElem = selfElem.parentNode;
        }
        return selfElem;
    },

    className : function ( elem, name ) {
        var arr = [];
        for ( var i = 0; i<elem.length; i++ ) {
            if ( elem[i].className == name ) {
                arr.push( elem[i] );
            }
        }
        return arr;
    }
};

var edit = getElem.className( document.getElementById("comments").getElementsByTagName("td"), "edit" );
var commentHeader = getElem.className( document.getElementById("comments").getElementsByTagName("td"), "date" );

for ( var i = 0; i<edit.length; i++ ) {
    var selectionLinkSpan   = document.createElement('span');
    var selectionLinkSpanA  = document.createElement('a');

    selectionLinkSpanA.innerHTML = "選択引用";
    selectionLinkSpanA.href      = "javascript:void(0);";

    selectionLinkSpanA.addEventListener( "click", function () {
        if ( ( window.getSelection() + "" ) === "" ) return;

        var quoteText = ( window.getSelection()  + "" ).replace( /[\s\r\n]+$/gm, '' ).replace( /^/gm, '>' );
        var commentElem   = document.getElementById("leftCommentContent");

        commentElem.value += quoteText + "\n\n";

    }, false);

    selectionLinkSpan.appendChild( selectionLinkSpanA );
    edit[i].appendChild( selectionLinkSpan );
}

for ( var ii = 0; ii<commentHeader.length; ii++ ) {
    var toggleA   = document.createElement('a');

    toggleA.href = "javascript:void(0);";

    toggleA.addEventListener( "click", function () {
        var commentTable       = getElem.parents(this, "TABLE");
        var commentTableFamily = commentTable.parentNode.childNodes;

        for ( i = 0; i < commentTableFamily.length; i++ ) {
            if ( commentTableFamily[i].nodeName != "#text" && commentTableFamily[i].nodeName != "TABLE")  {
               if(commentTableFamily[i].style.display === "") {
                   commentTableFamily[i].style.display = "none";
               }
               else {
                   commentTableFamily[i].style.display = "";
               }
            }
        }

        if ( this.childNodes[0].src.match("/images/common/opentriangle.gif") ) {
            this.childNodes[0].src = "/images/common/triangle.gif";
        }
        else {
            this.childNodes[0].src = "/images/common/opentriangle.gif";
        }
    }, false);

    var toggleAIMG  = document.createElement('img');
    toggleAIMG.src = "/images/common/opentriangle.gif";

    toggleA.appendChild( toggleAIMG );

    commentHeader[ii].insertBefore( toggleA, commentHeader[ii].firstChild );
}
