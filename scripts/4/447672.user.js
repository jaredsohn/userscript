// ==UserScript==
// @name        lướt cồng quán bựa
// @namespace   luot_cong_quan_bua
// @include     http://an-hoang-trung-tuong.blogspot.com/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    
        var ary_luotcong = new Array("Maria","ironcrossfreedom","ten 3", "ten 4", "ten 5");;
        var comments = document.getElementsByClassName('comment-block');
        for (i in comments) {
            var hyperlinks = comments[i].getElementsByTagName('a');
            
            for (j in hyperlinks) {     
                if (ary_luotcong.indexOf(hyperlinks[j].textContent) >= 0 || ary_luotcong.indexOf(hyperlinks[j].innerHTML) >= 0) {
                    comments[i].remove();
                }                                
            }
        }

})();