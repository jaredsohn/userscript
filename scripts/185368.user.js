// ==UserScript==
// @name     .-[MUN Maximizer]-.
// @include  http://online.mun.ca/d2l/home/*
// @include  http://online.mun.ca/d2l/lms/*
// @exclude	 *online.mun.ca*/ep*
// @exclude  http://online.mun.ca/d2l/home
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle   
// ==/UserScript==
/*- The @grant directive is needed to work around a design change introduced
    in GM 1.0.   It restores the sandbox.
*/
//-- Get everything that has the class "user_type_1".
//document.body.style.background = "black";
var bgcolor = "#088A08";
try{

var userTypeNodes1 = $(".d2l-max-width");
userTypeNodes1.removeClass ("d2l-max-width");

var userTypeNodes3 = $(".d2l-background-global");
userTypeNodes3.removeClass ("d2l-background-global");
userTypeNodes3[0].style.backgroundColor = bgcolor;

var userTypeNodes4 = $(".d2l-page-main");
userTypeNodes4[0].style.backgroundColor = bgcolor;
} catch(e) {
    //alert(e);
}

//Found on Home Page
try{
var userTypeNodes2 = $(".d2l-page-main-transparent");
userTypeNodes2.removeClass ("d2l-page-main-transparent");
userTypeNodes2[0].style.backgroundColor = bgcolor;
} catch(e) {
    //alert(e);
}

//Found in Course Content
try{
var elem = document.getElementById('d_pc');
elem.style.backgroundColor = bgcolor;
} catch(e) {
    //alert(e);
}