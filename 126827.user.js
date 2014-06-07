// ==UserScript==
// @name           Light Rising Anti Wall Climbing
// @namespace      http://userscripts.org/users/125692
// @description    Stops accidental wall climbing.
// @include        *lightrising.com*game.cgi
// ==/UserScript==
(function() {

//make move buttons disappear after clicking them
var rwallbutton=function(e) {return confirm("Really climb that wall?")}
var buttons=document.getElementsByClassName("movebutton");

var rwallbutton=function(e){
     e.preventDefault();    
    //alert('hahaha');
    var rval=confirm("Really climb that wall?");
    if (rval){
                //e.target.style.visibility="hidden";
                document.getElementById('button0').style.visibility="hidden";
                //got to check buttons are there before alter them
                document.getElementById('button1')?document.getElementById('button1').style.visibility="hidden":false;
                document.getElementById('button2')?document.getElementById('button2').style.visibility="hidden":false;
                document.getElementById('button3')?document.getElementById('button3').style.visibility="hidden":false;
                document.getElementById('button4')?document.getElementById('button4').style.visibility="hidden":false;
                document.getElementById('button5')?document.getElementById('button5').style.visibility="hidden":false;
                document.getElementById('button6')?document.getElementById('button6').style.visibility="hidden":false;
                document.getElementById('button7')?document.getElementById('button7').style.visibility="hidden":false;
                //mostly there are only 8 buttons. 9 means we are outsidebuilding
                if(document.getElementById('button8')){document.getElementById('button8').style.visibility="hidden";}
                
                document.getElementById(e.target.id).parentNode.submit();
    }
    //return rval;
}

for (var i=0;i<buttons.length;i++){
    buttons[i].id="button"+i;
    buttons[i].name="button"+i;
    if (buttons[i].value.match(/139ap/)||buttons[i].value.match(/ 5ap/)) {
        //buttons[i].setAttribute("onclick",'return confirm("Really Climb that wall?");');
        //buttons[i].setAttribute("onclick",'wallbutton');
        //buttons[i].addEventListener("click",rwallbutton,false);
        buttons[i].style.color="red";
	}
}  
   var rbutton=function(e) {
                e.target.style.visibility="hidden";
                document.getElementById('button0').style.visibility="hidden";
                document.getElementById('button1')?document.getElementById('button1').style.visibility="hidden":false;
                document.getElementById('button2')?document.getElementById('button2').style.visibility="hidden":false;
                document.getElementById('button3')?document.getElementById('button3').style.visibility="hidden":false;
                document.getElementById('button4')?document.getElementById('button4').style.visibility="hidden":false;
                document.getElementById('button5')?document.getElementById('button5').style.visibility="hidden":false;
                document.getElementById('button6')?document.getElementById('button6').style.visibility="hidden":false;
                document.getElementById('button7')?document.getElementById('button7').style.visibility="hidden":false;
                if(document.getElementById('button8')){document.getElementById('button8').style.visibility="hidden";}
   }
for (var i=0;i<buttons.length;i++){
    if (buttons[i].value.match(/139ap/)||buttons[i].value.match(/ 5ap/)) {
        //buttons[i].setAttribute("onclick",'return confirm("Really Climb that wall?");');
        //buttons[i].setAttribute("onsubmit",'return rwallbutton(this)');
        buttons[i].addEventListener("click",rwallbutton,false);
        //buttons[i].addEventListener("submit",function (e) { alert("hello"); },false);
        buttons[i].style.color="red";
    }
    else{
        buttons[i].addEventListener("click",rbutton,false);
    }    
    buttons[i].style.visibility="visible";//we have used stylish to alter the style of mvoebuttons to hidden so they can't be pressed before we fix them. but we have done that so make them visible.

}
//EOF
})();