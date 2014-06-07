// ==UserScript==
// @name        Suggested words everywhere
// @namespace   http://www.example.com/
// @include     *
// @exclude     *.google.*
// @exclude     *.facebook.*
// @require     http://code.jquery.com/jquery.min.js
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==




var query='';
var response='';
var terms=[];
var i;
var option;

$(document).ready(function(){
    
    var datalist=document.createElement("datalist");
    datalist.id="terminos";
    for(i=1;i<=12;i++){
        option=document.createElement("option");
        option.id="opcion"+i;
        datalist.appendChild(option);
    }
    
    document.body.appendChild(datalist);
            

    $('input[name="q"]').attr("list",'terminos');
    $('input[name="q"]').attr("autocomplete",'off');
    $('input[name="q"]').bind('input',queryWords)
    
    $('input[name="s"]').attr("list",'terminos');
    $('input[name="s"]').attr("autocomplete",'off');
    $('input[name="s"]').bind('input',queryWords)
    

    
});


function queryWords (){
        query=$(this).val();
   
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                "Accept" : "application/json, text/javascript, */*; q=0.01",
                "Accept-Language" : "en-us;q=0.5,en;q=0.3",
                "Accept-Encoding" : "gzip, deflate",
                "Connection" : "keep-alive",
                "X-Requested-With" : "XMLHttpRequest"
            },
            url: "http://www.google.com/s?q=" + escape(query),
            onload: function(data) {
                response=(data.responseText).replace('window.google.ac.h(','');
                response=(response).replace(')','')
                terms= JSON.parse(response);
                for(i=0;i<terms[1].length;i++){
                    $("#opcion"+i).val(terms[1][i][0]);
                 }
            }
        });
        
    }