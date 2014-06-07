// ==UserScript== 

// @name LN Quick Post Link 

// @namespace      Karlhockey 

//@include        http://*.longhornnation.com/* 

// ==/UserScript== 
var co=1;
var rows = document.getElementById("pageContent").getElementsByTagName('TD');
for( var t = 0, row; row = rows[t]; t++ ) {


if(row.className=='header') {


var num=row.innerHTML.split(' ')[0];

num=num.split('#')[1];

var other=row.innerHTML.split('#'+num)[1];

if(row.innerHTML.split('#').length != 1) {


row.innerHTML="<span class='user'><a class='online' style='font-size:11px;' href='#t"+num+"'>#"+num+"</a></span>"+other;



}

}

}