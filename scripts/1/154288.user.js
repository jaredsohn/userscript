// ==UserScript==
// @name       MightyText ASCII mode
// @namespace  http://use.i.E.your.homepage/
// @version    1.0.0
// @description  Usuwa polskie znaki, żeby można było wysyłać dłuższe smsy
// @include      https://mightytext.net/app/*
// @match      https://mightytext.net/app/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @copyright  2012+, Bozar
// @grant none
// ==/UserScript==

var repl = [['ą', 'a'], ['ć', 'c'], ['ę', 'e'], ['ł', 'l'], ['ń', 'n'], ['ó', 'o'], ['ś', 's'], ['ź', 'z'], ['ż', 'z'],
            ['Ą', 'A'], ['Ć', 'C'], ['Ę', 'E'], ['Ł', 'L'], ['Ń', 'N'], ['Ó', 'O'], ['Ś', 'S'], ['Ź', 'Z'], ['Ż', 'Z']];

var int = setInterval(waitForLoad, 200);

function waitForLoad(){    
    if($("#sendbox-main").length > 0){
        clearInterval(int);
        attachEvt();
        console.log("found!");
    } else{
        console.log("not found");
    }
}

function attachEvt(){    
    $("#sendbox-main").blur(function(e){          
        var text = $("#sendbox-main").val();
        for(var i=0; i<repl.length; i++){
            text = text.replace(new RegExp(repl[i][0], "g"), repl[i][1]);
        }
        $("#sendbox-main").val(text);        
    });
}