// ==UserScript==
// @name           Argos.co.uk - Remove flash product images
// @namespace      http://tr00st.co.uk/userscripts/argos/productImages
// @description    Replaces the product page images on Argos.co.uk with non-flash versions.
// @include        http://www.argos.co.uk/*
// ==/UserScript==

document.querySelectorAll(".nonRicherContent")[0].className="nonRicherContent";
document.querySelectorAll(".richerContent")[0].innerHTML="";
