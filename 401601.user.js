// ==UserScript==
// @name       TravoltaWhiteCoatMeme
// @namespace  http://www.huffingtonpost.ca/2014/03/03/john-travolta-idina-menzel_n_4887855.html
// @version    0.2
// @description  John Travolta does UTSW White Coat ceremony
// @match      http://www.southwesternstudents.com/White_Coat_Class_of_2016/Ceremony/Pages/*.html
// @copyright  2014+, You
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//medschool.swmed.edu/assets/js/libs-core/jquery-1.7.2.min.js",main);

function main() {
    $ = jQuery
    console.log($('.caption'));
    var first = $('.Caption').map( function (i,e) { return $(e).text().split(' ')[0] });
    var last = $('.Caption').map( function (i,e) { return $(e).text().split(' ')[1] })
    $('.Caption').each( function (i,e) {
        $(e).text(first[Math.floor(Math.random()*first.length)]+' '+last[Math.floor(Math.random()*last.length)]);
    })
    $.noConflict();
    setTimeout(main,5000);
}
