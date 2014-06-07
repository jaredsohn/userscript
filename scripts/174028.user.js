// ==UserScript==
// @name        tirar baners
// @namespace   tira os anuncios da tela
// @include     http://trophymanager.com/*

// @version     1
// ==/UserScript==

    document.getElementsByClassName("banner_top no_pro main_center")[0].style.display="none";
    document.getElementsByClassName("banner_placeholder rectangle")[0].style.display="none";    
    document.getElementsByClassName("banner_bottom")[0].style.display="none";    
    document.getElementsByClassName("remove_banners subtle unbold")[0].style.display="none";
    document.getElementsByClassName("banner_placeholder skyscraper banner_left")[0].style.display="none";
 if (location.href.indexOf("/finances/") != -1){   
    document.getElementById("finances").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[6].getElementsByTagName("th")[0].getElementsByTagName("span")[0].innerHTML = "Com.técnica/Juniores/Transf";
    document.getElementById("finances_year").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[6].getElementsByTagName("th")[0].getElementsByTagName("span")[0].innerHTML = "Com.técnica/Juniores/Transf";
 }