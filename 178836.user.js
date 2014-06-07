// ==UserScript==
// @name           Unicreatures Hide Completed Buildings
// @namespace      http://trueidiocy.us
// @include        http://unicreatures.com/tech_building.php*
// @include        http://www.unicreatures.com/tech_building.php*
// @description    Hides completed buildings from the My Buildings page on Unicreatures.
// @version        1.0.0
// @copyright	   © krazykat1980
// @license 	   Creative Commons Attribution-Noncommercial-Share Alike 3.0
// ==/UserScript==



//--------------------------------------------------
//create box

var box = document.createElement( 'div' );
box.id = 'sortButtons';
GM_addStyle( 
    ' #sortButtons {             ' +
    '    background: ##ABE4FE;     ' +
    '    border: 0px #00BFFF; ' +
    '    padding: 0px;          ' +
    '    position: absolute;    ' +
    '    top: 690px; left: 290px;   ' +
    '    max-width: 400px;      ' +
    ' } '
);


//--------------------------------------------------
//add buttons to box

box.innerHTML ='<div><p> ' +    
    '</br><button type="button" button id="reset">Reset Page</button></p></div>' +
    '</br><button type="button" button id="complete">Hide Completed Buildings</button></p></div>';
document.body.appendChild( box );


//--------------------------------------------------
//create buttons 

var button1 = document.getElementById("complete");
button1.addEventListener('click', function(){removeSelected(1);}, true );
var button3 = document.getElementById("reset");
button3.addEventListener('click', function (){reset();}, true );


//----------------------------------------------
//save original contents

var mytable = document.getElementById('right').getElementsByTagName('table')[0];
var myrows = mytable.rows
var oldInner=[]
for(i=1;i < myrows.length;i++){
oldInner[i]=myrows[i].innerHTML;

}


//-------------------------------------------------
//Reset table to original

function reset(){
var mytable = document.getElementById('right').getElementsByTagName('table')[0];
var myrows = mytable.rows
for(i=1;i < myrows.length;i++){
myrows[i].innerHTML=oldInner[i]
}
}


//-------------------------------------------------
//Hide completed buildings

function removeSelected(){
var mytable = document.getElementById('right').getElementsByTagName('table')[0];
var myrows = mytable.rows
reset();
for(i=1;i < myrows.length;i=i+3){

var incomplete=/href/.test(myrows[i].innerHTML)

if(incomplete==false){
myrows[i].innerHTML = "";
myrows[i+1].innerHTML = "";
myrows[i+2].innerHTML = "";
}
}
}