// ==UserScript==
// @name           Unicreatures Accomplishments Page Fixes
// @namespace      trueidiocy.us
// @include        http://unicreatures.com/accomplishments.php*
// @include        http://www.unicreatures.com/accomplishments.php*
// @include        http://unicreatures.com/view_accomplishments.php*
// @include        http://www.unicreatures.com/view_accomplishments.php*
// @description    Adds total accomplishments available, table formatting, and wiki links on the Unicreatures accomplishments page.
// @version        1.1.0
// @copyright	   © krazykat1980
// @license 	   Creative Commons Attribution-Noncommercial-Share Alike 3.0
// ==/UserScript==

//--------------------------------------------------
//completed count

 var imgs,i;
var done=0;
var notDone=0;
 imgs=document.getElementsByTagName('img');
 for(i in imgs)
  {
  if(/yes.png/.test(imgs[i].src))
   {
     done=done+1;
   }
  }

//--------------------------------------------------
//incomplete count

 imgs=document.getElementsByTagName('img');
 for(i in imgs)
  {
  if(/no.png/.test(imgs[i].src))
   {
     notDone=notDone+1;
   }
  }

//-------------------------------------------------
//special quests count

if (document.body.textContent.match(/Find a lost apple for Asmo/)){
done=done+1;}
else{
notDone=notDone+1;}

if (document.body.textContent.match(/Returned the Scroll of Olbencar/)){
done=done+1;}
else{
notDone=notDone+1;}

if (document.body.textContent.match(/Returned the Bubble Wand/)){
done=done+1;}
else{
notDone=notDone+1;}

if (document.body.textContent.match(/Returned Socky McPuppet/)){
done=done+1;}
else{
notDone=notDone+1;}



total=done+notDone;

//--------------------------------------------------
//add counts to page

var html = document.body.innerHTML;
html = html.replace( /Accomplishments Completed/, " out of " + total + " Accomplishments Completed");
document.body.innerHTML = html;


//--------------------------------------------------
//add wiki links

var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var myrows = mytable.rows

for(i=1;i < myrows.length;i++)
{
  var oldInner;
  oldInner = myrows[i].cells[0].innerHTML;
var critterName;
critterName=myrows[i].cells[0].textContent;

  myrows[i].cells[0].innerHTML = "<a href='http://wiki.unicreatures.com/index.php?title=" + critterName + "'"+ 'target="_blank">'+oldInner +"</a>";
}

//--------------------------------------------------
//alternating color for table

var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var myrows = mytable.rows
var arListItems = myrows;
var bHighlight = true;

	for (var i = arListItems.length - 1; i >= 0; i--) {

		var elmListItem = arListItems[i];

		elmListItem.style.backgroundColor = bHighlight ? '#8ED6EA' : '#abe4fe';

		elmListItem.style.color = '#000';

		bHighlight = !bHighlight;

	}


//--------------------------------------------------
//sorting features


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
    '    top: 670px; left: 160px;   ' +
    '    max-width: 400px;      ' +
    ' } '
);

//--------------------------------------------------
//add buttons to box

box.innerHTML ='<div><p> ' +    
    '</br><button type="button" button id="reset">Reset Page</button></p></div>' +
    '</br><button type="button" button id="completed">Hide completely completed</button></p></div>' + 
    '</br><button type="button" button id="evolved">Hide Fully Evolved</button></p></div>' +
    '</br><button type="button" button id="stages">Hide All Stages</button></p></div>' +
    '</br><button type="button" button id="trained">Hide Fully Trained</button></p></div>' +
    '</br><button type="button" button id="genders">Hide Matured Genders</button></p></div>' +
    '</br><button type="button" button id="noble">Hide Nobles</button></p></div>' +
    '</br><button type="button" button id="exalted">Hide Exalteds</button></p></div>' +
    '</br><button type="button" button id="herd">Hide Full Herds</button></p></div>';
document.body.appendChild( box );

//--------------------------------------------------
//create buttons except complete

var button1 = document.getElementById("evolved");
button1.addEventListener('click', function(){removeSelected(1);}, true );
var button3 = document.getElementById("reset");
button3.addEventListener('click', function (){reset();}, true );
var button4 = document.getElementById("stages");
button4.addEventListener('click', function(){removeSelected(2);}, true );
var button5 = document.getElementById("trained");
button5.addEventListener('click', function(){removeSelected(3);}, true );
var button6 = document.getElementById("genders");
button6.addEventListener('click', function(){removeSelected(4);}, true );
var button7 = document.getElementById("noble");
button7.addEventListener('click', function(){removeSelected(5);}, true );
var button8 = document.getElementById("exalted");
button8.addEventListener('click', function(){removeSelected(6);}, true );
var button9 = document.getElementById("herd");
button9.addEventListener('click', function(){removeSelected(7);}, true );

//----------------------------------------------
//save original contents

var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var myrows = mytable.rows
var oldInner=[]
for(i=1;i < myrows.length;i++){
oldInner[i]=myrows[i].innerHTML;

}
//-------------------------------------------------
//Reset table to original

function reset(){
var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var myrows = mytable.rows
for(i=1;i < myrows.length;i++){
myrows[i].innerHTML=oldInner[i]
}
}


//---------------------------------------------------
//remove selected columns


function removeSelected(z){
var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var myrows = mytable.rows
reset();
for(i=1;i < myrows.length;i++){

var yes=/yes.png/.test(myrows[i].cells[z].innerHTML)
var emp=/&nbsp;/.test(myrows[i].cells[z].innerHTML)
if(yes==true || emp==true){
myrows[i].innerHTML = "";
}
}
}

//-----------------------------------------------------
//Clear completely completed

var button2 = document.getElementById("completed");
button2.addEventListener('click', function(){reset();
var mytable = document.getElementById('right').getElementsByTagName('table')[4];
var myrows = mytable.rows

var length=myrows[1].cells.length

for(x=1;x < myrows.length;x++)
{

var totalDone=1
for(i=1;i < length;i++){

var yes=/yes.png/.test(myrows[x].cells[i].innerHTML)
var emp=/&nbsp;/.test(myrows[x].cells[i].innerHTML)
//alert(totalDone+myrows[x].cells[i].innerHTML)

if(yes==true || emp==true){
totalDone=totalDone+1
//alert(totalDone)
}
}

if (totalDone==8){

myrows[x].innerHTML = "";
}
}
}, true );

//-------------------------------------------------------------------