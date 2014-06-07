// ==UserScript==
// @name           Min/Max Contract Buttons
// @namespace      GLB
// @include        http://goallineblitz.com/game/make_offer.pl?player_id=*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function maxContract() {
salary.value = minimum * 2.5
salary.focus()
salary.blur()
}

function minContract() {
salary.value = minimum
salary.focus()
salary.blur()
}

var minimum = document.getElementById('minimum_salary').innerHTML
var salary = document.getElementById('salary')
var br = document.createElement('br')
var min_button = document.createElement('input')
min_button.setAttribute('type', 'button')
min_button.setAttribute('value', 'Minimum')
min_button.addEventListener("click", minContract, false)
var max_button = document.createElement('input')
max_button.setAttribute('type', 'button')
max_button.setAttribute('value', 'Maximum')
max_button.addEventListener("click", maxContract, false)
var container = getElementsByClassName('field_container', document)
container[1].appendChild(min_button)
container[1].appendChild(max_button)