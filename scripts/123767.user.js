    // ==UserScript== 
    // @name           IGGetter
    // @namespace      Automatically inputs your username and password and logs in
    // @include        *cie*
    // ==/UserScript==
//Author - Omar Shehata
     
    var boxes = document.getElementsByTagName('input');
     
     
    function refresh(){
            if(document.documentElement.innerHTML.indexOf('Your Results') == -1){
            window.location = "https://myresults.cie.org.uk/cie-candidate-results/sessionCheck";
            }
            boxes = document.getElementsByTagName('input');
            if(boxes.length != 3){
    setTimeout("refresh()",1000);
    }
     
    }
     
     
    if(boxes.length != 3){
    if(document.documentElement.innerHTML.indexOf('Your Results') == -1){
    refresh();
    }
    //
    }
    else{
    boxes[0].value = "USERNAME HERE";
    boxes[1].value = "PASSWORD HERE";
     
    boxes[2].click();
    }
