// ==UserScript==
// @name           VU Improved Fleet Move
// @namespace      http://userscripts.org/users/125692
// @description    Adds a few things to the fleet move page
// @include        http://www.humugus.com/ds.php/f/move/index/*
// ==/UserScript==
//all this does right now is add a sum of ships set to move. will alter it to better load resources.

if (!window.addEventListener) {

    window.addEventListener = function (type, listener, useCapture) {

        attachEvent('on' + type, function() { listener(event) });

    }

}

dqrsum=function(e){
    var maxcell= document.getElementById('max');
    var idsubstrings=maxcell.title.split(':');
    var target;
    var sum=0;
    for (var i = 0 , idsubstring ; idsubstring = idsubstrings[i];i++){
        target= document.getElementById('qty_ship'+idsubstring);
        sum+=Number(target.value);
    }
    var targetelement=document.getElementById('dqrtotalships')
    targetelement.innerHTML=sum;
}
dqrsum2=function(e){
    var str=e.target.href.match(/[0-9]+/)+'';
    document.getElementById("qty_ship" + str).value = Number(document.getElementById("max_qty" + str).innerHTML); 
    var maxcell= document.getElementById('max');
    var idsubstrings=maxcell.title.split(':');
    var target;
    sum=0;
    for (var i = 0 , idsubstring ; idsubstring = idsubstrings[i];i++){
        target= document.getElementById('qty_ship'+idsubstring);
        sum+=Number(target.value);
    }
    var targetelement=document.getElementById('dqrtotalships')
    targetelement.innerHTML=sum;
}

dqrsum3=function(e){
    var maxcell= document.getElementById('max');
    var idsubstrings=maxcell.title.split(':');
    var target;
    for (var i = 0 , idsubstring ; idsubstring = idsubstrings[i];i++) { 
         document.getElementById("qty_ship" + idsubstring).value = Number(document.getElementById("max_qty" +
             idsubstring).innerHTML); 
    }
    sum=0;
    for (var i = 0 , idsubstring ; idsubstring = idsubstrings[i];i++){
        target= document.getElementById('qty_ship'+idsubstring);
        sum+=Number(target.value);
    }
    var targetelement=document.getElementById('dqrtotalships')
    targetelement.innerHTML=sum;
}
dqrsum4=function(e){
    var targetelement=document.getElementById('dqrtotalships')
    targetelement.innerHTML='0';
}

//setup
//so we need to find all the boxs we are going to be listening to.
//all the fleet number boxes. we need to know when they change.
var maxcell= document.getElementById('max');
//first we meed to move two elements about to make room for the number.
var speedmodcell = document.getElementById('speed_mod');
var lastcell=speedmodcell.parentNode.lastElementChild;
lastcell.parentNode.replaceChild(speedmodcell,lastcell);
var newElement = document.createElement("td");
maxcell.parentNode.insertBefore(newElement, maxcell.nextElementSibling.nextElementSibling.nextElementSibling);
newElement.id="dqrtotalships";
newElement.align="center";
var idsubstrings=maxcell.title.split(':');

for (var i = 0 , idsubstring ; idsubstring = idsubstrings[i];i++){
    target= document.getElementById('qty_ship'+idsubstring);
    target.addEventListener("change",dqrsum,false)
    target.addEventListener("keyup",dqrsum,false)
    target.previousElementSibling.addEventListener("click",dqrsum2,false)
}
target = document.getElementById('max');
target.nextElementSibling.firstElementChild.addEventListener("click",dqrsum3,false)
target.nextElementSibling.nextElementSibling.firstElementChild.addEventListener("click",dqrsum4,false)
