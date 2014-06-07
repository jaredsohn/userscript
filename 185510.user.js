// ==UserScript==
// @name           SimplyMovies fixer
// @include        http://simplymovies.net/*
// @exclude        
// ==/UserScript==

var all = document.getElementsByClassName('overlayMovieDescription');
for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
}

var all = document.getElementsByClassName('overlayMovieRelease');
for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
}

var all = document.getElementsByClassName('overlayMovieGenres');
for (var i = 0; i < all.length; i++) {
    all[i].style.color = 'black';
}


$(document).ready(function(){
    $('#favicon').remove();
    $('head').append('<link href="https://doc-0s-5c-docs.googleusercontent.com/docs/securesc/7f07cbc94jqi54p5uie7veepc0iifoer/3vi1ql577r69mefi87p260jk3pcph0t3/1386525600000/02458619046524680582/02458619046524680582/0ByOM6AQ15nAJN2VvdGxqVGVGY1k?e=download&h=16653014193614665626&nonce=sfq3kemqpjdmk&user=02458619046524680582&hash=0tcvj1bakls1fbs2po7c7a36seofr657" id="favicon" rel="shortcut icon">');
});

GM_addStyle("input { padding: 2px; border: 1px solid; border-color: black; -moz-border-radius: 7px !important; }");
GM_addStyle('body {font: 12px/18px \'Lucida Grande\',\'Lucida Sans\',Arial,sans-serif}');

(function() {
    document.bgColor="181818"
    document.fgColor="#FFFFFF"
    document.body.style.backgroundColor="181818";
})();

var VI=new String();

function ImON()
{
    GM_setValue(VI,1);
    
}
function ImOFF()
{
    GM_setValue(VI,0);
    
}
var VII=GM_getValue(VI)

if (VII==1)
{
    (function() {
        var css = "@namespace url(http://www.w3.org/1999/xhtml);   a:link {font-weight:  bold !important; text-decoration: none !important;}  a:visited {font-weight: bold !important; text-decoration: line-through !important; color: #0099FF !important } a:hover {font-weight: bold !important; text-decoration: none !important; color: #B0099FF !important; background-color:rgba(245,230,0,0.3) !important;} a:visited img {border: 3px dotted #B40404 !important;}"; 
        
        if (typeof GM_addStyle != "#B40404") {
            GM_addStyle(css);
        } else if (typeof PRO_addStyle != "#B40404") {
            PRO_addStyle(css);
        } else if (typeof addStyle != "#B40404") {
            addStyle(css);
        } else {
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node); 
            }
        }
    })();
    
    
}
else 
{
    (function() {
        var css = "@namespace url(http://www.w3.org/1999/xhtml);   a:link {font-weight:  bold !important; text-decoration: none !important; color: #EEBF14 !important}  a:visited {font-weight: bold !important; text-decoration: line-through !important; color: #EEBF14 !important } a:hover {font-weight: bold !important; text-decoration: none !important; color: #EEBF14 !important; background-color:rgba(40, 40, 40, 1) !important;}"; 
        
        
        
        if (typeof GM_addStyle != "#EEBF14") {
            GM_addStyle(css);
        } else if (typeof PRO_addStyle != "#EEBF14") {
            PRO_addStyle(css);
        } else if (typeof addStyle != "#EEBF14") {
            addStyle(css);
        } else {
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node); 
            }
        }
    })();
    
}