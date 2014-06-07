// ==UserScript==
// @name           qt reply @ 55ch
// @namespace      yui
// @description    makes it qt
// @version        0.1
// @include        http://55ch.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

    document.getElementById('postform').style="display:none";
    var createPostForm = document.createElement('div');
    createPostForm.innerHTML='<a id="a-create-postform" style="font-size:30px !important;" href="javascript:void(0)">Reply</a>';
    $( createPostForm ).insertBefore( '#postform' );
    createPostForm.style = "display:inline";
    $( "#a-create-postform" ).click(function() {
        document.getElementById('postform').style = "display:inline";
        createPostForm.style = "display:none";
    })