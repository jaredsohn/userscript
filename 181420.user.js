// ==UserScript==
// @name       Dizimag Favorite List Watched Shows Filter
// @namespace  http://tahapaksu.com/
// @version    0.1
// @description  Filters all watched shows out of the following series list
// @match      http://*.dizi-mag.com/*
// @copyright  2012+, tahapaksu.com
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {    
    $("#dli tr").each(function(){
        if($("td:nth-child(3)",$(this)).text().indexOf('eklenmedi')>=0){
            $("*",$(this)).css("display","none");
        }else if($("td:nth-child(3)",$(this)).text().indexOf('izlemediniz')>=0){
            // do nothing to this line
        }else if($("td:nth-child(3)",$(this)).text().indexOf('Sonraki')<0){
            $("*",$(this)).css("display","none");        
        }else{
            //
            var testString = $("td:nth-child(3)",$(this)).text(); // the string to test
            var gifRegex = /\S*(\d+)\.Sx(\d+)\.B/i; // the regular expression
            var results = testString.match(gifRegex);
            var sezon1 = results[1];            
            var bolum1 = results[2];
            
            var testString1 = $("td:nth-child(4)",$(this)).text(); // the string to test            
            var gifRegex1 = /\S*(\d+)\. Sezon  (\d+)\. Bölüm\S*/i; // the regular expression
            var results1 = testString1.match(gifRegex1);
            if(results1!=null){
                var sezon2 = results1[1];
                var bolum2 = results1[2];                
                if(sezon1 == sezon2 && bolum1==bolum2){
                    $("*",$(this)).css("display","none");
                }                
            }
            //
        }
    });    
});