// ==UserScript==
// @name        YaYaMa (Yet Another Yahoo Advertisement in the eMail Alleviator)
// @namespace   yahoo.com
// @description Hide Yahoo mail ads.
// @include     https://*.mail.yahoo.com/neo/*
// @include     http://*.mail.yahoo.com/neo/*
// @version     4
// @grant       none
// ==/UserScript==

// Everything, navigator, content, ad
var pt_paneshell = document.getElementById('paneshell') || top.document.getElementById('paneshell') ;
var   pt_shellnavigation = document.getElementById('shellnavigation') || top.document.getElementById('shellnavigation') ;
var   pt_shellcontent = document.getElementById('shellcontent') || top.document.getElementById('shellcontent') ;
var   pt_theAd = document.getElementById('theAd') || top.document.getElementById('theAd') ;

// alert('Current content width (calculated)=' + (pt_paneshell.offsetWidth - pt_shellnavigation.offsetWidth - pt_theAd.offsetWidth) + '   .offsetWidth=' + pt_shellcontent.offsetWidth) ;
var n_newContentWidth = pt_paneshell.offsetWidth - pt_shellnavigation.offsetWidth ;
// alert('New width = ' + n_newContentWidth) ;




if (pt_theAd && pt_shellcontent) {
    
    // Move the ad behind the content pane, make it transparent and 
    //   resize the content pane for the additional horizontal space.  
    //   By leaving the ad pane intact, we let yahoo think it's still 
    //   being displayed so they won't force a frame or windows refresh.
    //   They can update it to their heart's content.
    
    pt_theAd.style['zIndex']='-1' ;
    pt_theAd.style['opacity']='0' ;
    pt_shellcontent.style['width'] = n_newContentWidth.toString() + 'px' ;
}
