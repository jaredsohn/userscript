// ==UserScript==
// @name        TamerSaga FB
// @namespace   akc
// @include     http://apps.facebook.com/tamersaga/*
// @include     https://apps.facebook.com/tamersaga/*
// @include     https://tsapp.poppace.com/*
// @include     http://tsapp.poppace.com/*
// @version     1.4
// ==/UserScript==

rightCol = document.getElementById('rightCol');
if (rightCol != null) rightCol.parentNode.removeChild(rightCol);//rightCol.style.display = "none";
faceboolbox = document.getElementsByClassName('m_facebookbox');
if (faceboolbox.length != 0) faceboolbox[0].parentNode.removeChild(faceboolbox[0]);//faceboolbox.style.display = "none";
function closeWarning(){
    return 'Are you sure?'
}
window.onbeforeunload = closeWarning;