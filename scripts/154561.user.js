// ==UserScript==
// @name     globes movie ads remover
// @include  http://www.globes.co.il/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $("embed").each(function(){
        $(this).attr("src", $(this).attr("src").replace("is_hiro=true", "is_hiro=false"));
    });
});

