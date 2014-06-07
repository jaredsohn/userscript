
Code:
// ==UserScript==
// @name           Formodireccion
// @description    Va directo al Premio
// @include        *ptzplace.lockerz.com*
// @include        *redeemquick.com*
// @include        *forolockerz.com*

// ==/UserScript==

var product1=/New iPod Touch 8GB/i;
var product1=/New iPod Touch 8GB/i;
var product1=/New iPod Touch 8GB/i;
var product1=/New iPod Touch 8GB/i;



var bool=false;
check();
function check(){
var spanarray=document.getElementsByTagName('a');
var x=0;
for (x in spanarray){
    if (bool==false){
    found=0;
      
    var check=spanarray[x].innerHTML;
 
    var patt2=/productInfo/i;        
    var found1=check.search(patt2);
    var found=check.search(product1);

    if (found>0 && found1>0){
        window.location=spanarray[x].href;
        bool=true;

    }    
    }
    
}
for (x in spanarray){
    if (bool==false){
    found=0;
      
    var check=spanarray[x].innerHTML;
 
    var patt2=/productInfo/i;        
    var found1=check.search(patt2);
    var found=check.search(product2);

    if (found>0 && found1>0){
        window.location=spanarray[x].href;
        bool=true;

    }    
    }
    
}

for (x in spanarray){
    if (bool==false){
    found=0;
      
    var check=spanarray[x].innerHTML;
 
    var patt2=/productInfo/i;        
    var found1=check.search(patt2);
    var found=check.search(product3);

    if (found>0 && found1>0){
        window.location=spanarray[x].href;
        bool=true;

    }    
    }
    
}
for (x in spanarray){
    if (bool==false){
    found=0;
      
    var check=spanarray[x].innerHTML;
 
    var patt2=/productInfo/i;        
    var found1=check.search(patt2);
    var found=check.search(product4);

    if (found>0 && found1>0){
        window.location=spanarray[x].href;
        bool=true;

    }    
    }
    
}



}