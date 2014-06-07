// ==UserScript==
// @name        HDD - TGS
// @namespace   hdd
// @include     https://trello.com/b/*
// @version     1.1.2
// @grant       none
// ==/UserScript==


function currency(digits){
    strLen = digits.toString().length;
    times = parseInt(strLen / 3);
    revDigits = digits.toString().split("").reverse().join("")
    
    var counter = 0;
    for(var i=0; i < times; i++){
        counter = 3 + (3 * i) + (i * 1);
        tmpCoutner = counter;
        if(tmpCoutner > 3) tmpCoutner++;
        revDigits = [revDigits.slice(0, counter), ',', revDigits.slice(counter)].join('');
    }
    
    return revDigits.toString().split("").reverse().join("");
}

var calculated = 0;
var lastURL = document.URL;

function hi_calcSP(){
    if( calculated == 1 && lastURL == document.URL && document.URL.indexOf("/b/") > 0 )
        return;
       
    $designLink = $('a.js-org-name');

    if($designLink.length != 1){
        return;
    }
    calculated = 1;

    var $total = 0;
    var $boardID = document.URL;
    
    $boardID = $boardID.match(/\/b\/(.+)\//)[1];
    
    $.ajax({
        url: "https://trello.com/1/boards/"+ $boardID +"/cards/all"
    }).done(function(data) {
        data.forEach(function($item) {
            if($item.desc.length > 0 && $item.desc.indexOf("[") > -1){
                $total = $total + parseInt($item.desc.match(/\[(p|P)(.+)]/)[2]);
            }
        });
        
        if($total == 0)
            return;
        
        $total = $total/10;
        $("#gs_total").remove();
        $designLink.parent().append('<a id="gs_total" title="" class="quiet org-name ed js-org-name" href="#" style="font-family:tahoma; text-decoration:none;"><span style="margin: 0 3px 0 -4px;" class="icon-sm icon-info icon-bc-color"></span> مجموع هزینه پشتیبانی : ' + currency($total) + ' تومان</a>');
    });
    

    
    
}



$(document).ready(function() {
  setInterval(hi_calcSP, 1000);
  
});