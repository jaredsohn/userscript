// ==UserScript==
// @name           ok1
// @namespace      asdad
// @description    ok1
// @include        http://www.booty-master.com/show_item.php?feed=*
// ==/UserScript==


var thestring;
var otherstring;
var locofequal;
var omg;	

thestring = window.location.search;
locofequal = thestring.indexOf("=");
otherstring = thestring.substring((locofequal + 1),thestring.length); 
omg = otherstring++;

var ind = location.href.indexOf('http://www.booty-master.com/show_item.php?feed=');
function init(){
window.open( "http://www.booty-master.com/show_item.php?feed=" + otherstring,'_self' );
}

if(ind != -1){      
    var elem = document.createElement("input"); 
    elem.id ='btnGumb';
    elem.value = 'Next';
    elem.type = 'image';
	elem.src = 'http://web.uni-plovdiv.bg/stu0805072013/gallery/images/classic_next_button.gif';
    elem.style.position = 'fixed';
    elem.style.left = '0px';
    elem.style.top = '0px';


	elem.addEventListener('click', init, false);


    document.body.appendChild(elem); 

}


function KeyCheck(e)
{
    if (e.keyCode == 39) {
init()
       return false;}

	   if (e.keyCode == 37)  {
       history.back();
       return false;}
	   
}

window.addEventListener('keydown', KeyCheck, true);




