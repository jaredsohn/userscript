// ==UserScript==
// @name           Rosrabota Ad Remover Beta
// @description    Removes annoying Rosrabota.ru animated adverts
// @author         Galina Gate
// @include        http://*.rosrabota.ru/*
// @include        https://*.rosrabota.ru/*
// @version        0.1
// ==/UserScript==

//Parent Element To animated and context adverts
// That's crazy but there is no grandparent element. What a *** html/css code.
// So, we don't need these row = document.getElementById('BodyWrapper'); 
var removeRrAdverts = function(){
//Rosrabota Adverts
document.getElementById('_ad1').style.visibility = 'hidden'; 
document.getElementById('_ad1').style.display = 'none';
document.getElementById('_ad2').style.visibility = 'hidden'; 
document.getElementById('_ad2').style.display = 'none';
document.getElementById('_ad3').style.visibility = 'hidden'; 
document.getElementById('_ad3').style.display = 'none';
document.getElementById('_ad4').style.visibility = 'hidden'; 
document.getElementById('_ad4').style.display = 'none';
document.getElementById('_ad5').style.visibility = 'hidden'; 
document.getElementById('_ad5').style.display = 'none';
document.getElementById('_ad6').style.visibility = 'hidden'; 
document.getElementById('_ad6').style.display = 'none';
document.getElementById('_ad7').style.visibility = 'hidden'; 
document.getElementById('_ad7').style.display = 'none';
};
//Below function happens whenever the contents of 
//grandparent change
//grandparent.addEventListener("DOMSubtreeModified", removeRrAdverts, true);
//fires off the function to start with
removeRrAdverts();

