// ==UserScript==
// @name           Reported Post Sorter
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_reported_posts.pl
// ==/UserScript==

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

//****************************************************************
//*******Modify these for the forums you want at top*******
//****************************************************************

var forums = new Array()
forums[0] = 'Goal Line Blitz'
forums[1] = 'Suggestions'
forums[2] = 'other random forum'
forums[3] = 'other random forum'
forums[4] = 'other random forum'

//*********************************************************************
//*******Modify these for the forums you want at bottom*******
//*********************************************************************

var forums2 = new Array()
forums2[0] = 'Free for All'
forums2[1] = "Trash Talkin'"
forums2[2] = 'other random forum'
forums2[3] = 'other random forum'
forums2[4] = 'other random forum'

//********************************
//*******Don't touch this*******
//********************************

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

var rows = document.getElementsByTagName('tr')
var counter = 0
var rows2 = new Array()
var rows = document.getElementsByTagName('tr')
for(var i=0,j=rows.length; i<j; i++){       
    if (rows[i].getAttribute('class') == 'alternating_color1') {  
       rows2[counter] = rows[i]
       counter = counter + 1
    }
    if (rows[i].getAttribute('class') == 'alternating_color2') {  
       rows2[counter] = rows[i]
       counter = counter + 1
    }
}

function sort() {  
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums[4], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.firstChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums[3], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.firstChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums[2], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.firstChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums[1], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.firstChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums[0], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.firstChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums2[0], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.lastChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums2[1], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.lastChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums2[2], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.lastChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums2[3], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.lastChild
	insertAfter(tbody, rows2[i], first)
	}
       }
   for(var i=0,j=rows2.length; i<j; i++){  
      if (rows2[i].innerHTML.indexOf(forums2[4], 0)>=0) {
	var tbody = document.getElementsByTagName('tbody')[0]
	var first = tbody.lastChild
	insertAfter(tbody, rows2[i], first)
	}
       }
var rows = document.getElementsByTagName('tr')
for(var i=0,j=rows.length; i<j; i++){       
    if (rows[i].getAttribute('class') == 'alternating_color1') {  
       rows2[counter] = rows[i]
       counter = counter + 1
    }
    if (rows[i].getAttribute('class') == 'alternating_color2') {  
       rows2[counter] = rows[i]
       counter = counter + 1
    }
}
   for(var i=0,j=rows2.length; i<j; i++){  
      if ((i+1) % 2) {
	rows2[i].setAttribute('class', 'alternating_color1')
       } else {
	rows2[i].setAttribute('class', 'alternating_color2')
       }
    }
}

var td = document.getElementsByTagName('td')
for(var i=0,j=td.length; i<j; i++){       
    if (td[i].innerHTML == 'Section') {  
       td[i].innerHTML = '<a>Section<a>'
       td[i].addEventListener("click", sort, false)
    }
}