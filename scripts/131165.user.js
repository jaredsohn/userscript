// ==UserScript==
// @name           ***
// @namespace      http://tbhproductions.com/
// @description    *** 
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==

function plus(form1){
  form1.getal3.value=parseFloat(form1.getal1.value) + parseFloat(form1.getal2.value);
}

function min(form1){
  form1.getal3.value=parseFloat(form1.getal1.value) - parseFloat(form1.getal2.value);
}

function deel(form1){
  if (form1.getal2.value=='0' || form1.getal2.value==''){
    alert('delen door nul kan niet');
  }
  else{
    form1.getal3.value=parseFloat(form1.getal1.value) / parseFloat(form1.getal2.value);
  }
}

function maal(form1){
  form1.getal3.value=parseFloat(form1.getal1.value) * parseFloat(form1.getal2.value);
}

function kwadr1(form1){
  var i = form1.getal1.value;
  form1.getal1.value=i * i;
}

function kwadr2(form1){
  var j= form1.getal2.value;
  form1.getal2.value=j * j;
}

function kwadr3(form1){
  var k = form1.getal3.value;
  form1.getal3.value=k * k;
}

function plusresultaat(){
  var a=parseFloat(form2.geheugen.value);
  a+=parseFloat(form1.getal3.value);
  form2.geheugen.value=a;
}

function minresultaat(){
  var a=parseFloat(form2.geheugen.value);
  a-=parseFloat(form1.getal3.value);
  form2.geheugen.value=a;
}

<form name="form1">
<table>
<tr><td>getal 1 :</td><td><input type="text" size=5 name="getal1"></td></tr>
<tr><td>getal 2 : </td><td><input type="text" size=5 name="getal2"></td></tr>
<tr><td colspan=2><hr></td><td></td></tr>
<tr><td>Resultaat : </td><td><input type="text" size=5 name="getal3" onFocus="blur()"></td></tr>
</table><br>

<input type="button" value="optellen(+)" onClick="plus(this.form)">
<input type="button" value="aftrekken(-)" onClick="min(this.form)">
<input type="button" value="delen(/)" onClick="deel(this.form)">
<input type="button" value="vermenigvuldigen(*)" onClick="maal(this.form)"><br><br>

<input type="button" value="kwadrateer getal 1" onClick="kwadr1(this.form)">
<input type="button" value="kwadrateer getal 2" onClick="kwadr2(this.form)">
<input type="button" value="kwadrateer resultaat" onClick="kwadr3(this.form)">
<input type="reset" value="wis getallen"></form><hr>

<h2>De geheugen-functie</h2>
<form name="form2">
<input type="button" value="onthoud getal 1" onClick="form2.geheugen.value=form1.getal1.value">
<input type="button" value="onthoud getal 2" onClick="form2.geheugen.value=form1.getal2.value">
<input type="button" value="onthoud resultaat" onClick="form2.geheugen.value=form1.getal3.value"><br>
<table>
<tr><td>In geheugen :</td><td><input type="text" size=5 name="geheugen"></td></tr>
</table><br>
<input type="button" value="plus resultaat" onClick="plusresultaat(this.form)">
<input type="button" value="min resultaat" onClick="minresultaat(this.form)">
<input type="reset" value="geheugen wissen">