// ==UserScript==
// @name sarah
// ==/UserScript==
function changeme(){
        var pic=document.getElementById("profile_pic_education");
        var allpics=pic.getElementsByTagName("img");
        for(var i=0; i<allpics.length; i++){
                allpics[i].src="http://www.petfinder.com/wp-content/uploads/2012/11/101418789-cat-panleukopenia-fact-sheet-632x475.jpg";
        }
}