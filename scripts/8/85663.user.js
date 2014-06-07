// ==UserScript==
// @name           trac auto previewer
// @namespace      umezo.tsuyabu.in
// @description    Preview automatically working with its all text that is firefox addon
// @include        http://*/*trac*
// ==/UserScript==



var textElem = document.getElementById("text") , prevText ;

if( !textElem ){return ;}

prevText = textElem.value;

if( !document.getElementById("preview") ){
    return;
}


function polling(){
    if( prevText != textElem.value ){
        updatePreview();
    }

    prevText = textElem.value;
}

function updatePreview(){
    var form = document.getElementById("edit") , elements ;

    if( !form ){ 
        clearInterval( id );
        return;
    }

    elements = form.elements ;

    var data = {};
    for( var i = 0 , n = 10 ; i < n ; i++ ){
        var e = elements[i];
        console.log( e );
        data[ e.name ] = e.value ;
    }

    GM_xmlhttpRequest({
        method : "POST" ,
        headers: { 'Content-type': 'application/x-www-form-urlencoded' } ,
        url    : form.action , 
        data   : (function( data ){
            var text = [] , i ;
            for( i in data ){
                text.push( i + "=" + encodeURIComponent( data[i] ) );
            }

            return text.join("&");
        })( data ),
        onload : function ( resp ){
            var preview = resp.responseText.split('id="preview">').pop().split("</fieldset>").shift();
            document.getElementById("preview").innerHTML = preview ;
        }
    });
}

var id = setInterval( polling , 500 );
