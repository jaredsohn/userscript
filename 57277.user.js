// ==UserScript==
// @name          FFS Commander
// @description   used to automatically get your pets working in Friends For Sale
// @include       http://apps.facebook.com/friendsforsale/chores*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	  1.0.2
// ==/UserScript==
var Worker={
doClick : function(node){
var evt=document.createEvent("MouseEvents")
evt.initEvent("click",true,false)
node.dispatchEvent(evt)
},
goNext : function(){
var next=$('#app7019261521_pet_value div.pagination a:last')
if(next.html()=='Next'){
Worker.doClick(next[0])
window.setTimeout(Worker.refresh,5000)}
else{
alert('DONE')}
},
work : function(){
Worker.doClick($('div.left_column div.headline ul.filters li:eq(1) a')[0])
var pets=$('#app7019261521_pet_value span.pet_container a')
pets.each(function(i){
var pet=pets.eq(i)
Worker.doClick(pet[0])
var energy=$('span.energy',pet).html()
var point=parseInt(energy.match(/([0-9]+)/i)[1])
var hadWorked=false
if(point>=100){
hadWorked=true
var work
var friend
if(point==100){
work=$('span.chore_container:eq(0) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<100&&point>=90){
hadWorked=true
var work
var friend
if(point>=90){
work=$('span.chore_container:eq(7) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(1) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(2) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<90&&point>=80){
hadWorked=true
var work
var friend
if(point>=80){
work=$('span.chore_container:eq(9) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(1) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<80&&point>=75){
hadWorked=true
var work
var friend
if(point>=75){
work=$('span.chore_container:eq(4) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<75&&point>=70){
hadWorked=true
var work
var friend
if(point>=70){
work=$('span.chore_container:eq(2) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(1) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<70&&point>=50){
hadWorked=true
var work
var friend
if(point>=65){
work=$('span.chore_container:eq(8) a')}
if(point>=60){
work=$('span.chore_container:eq(11) a')}
if(point>=50){
work=$('span.chore_container:eq(6) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<50&&point>=45){
hadWorked=true
var work
var friend
if(point>=45){
work=$('span.chore_container:eq(1) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(1) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(2) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<45&&point>=25){
hadWorked=true
var work
var friend
if(point>=40){
work=$('span.chore_container:eq(9) a')}
if(point>=35){
work=$('span.chore_container:eq(2) a')}
if(point>=30){
work=$('span.chore_container:eq(7) a')}
if(point>=25){
work=$('span.chore_container:eq(5) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<25&&point>=20){
hadWorked=true
var work
var friend
if(point>=20){
work=$('span.chore_container:eq(3) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
friend=$('span.friend_container:eq(1) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
else if(point<20&&point>=10){
hadWorked=true
var work
var friend
if(point>=15){
work=$('span.chore_container:eq(1) a')}
if(point>=10){
work=$('span.chore_container:eq(3) a')}
Worker.doClick(work[0])
friend=$('span.friend_container:eq(0) a')
Worker.doClick(friend[0])
work=$('div.buy a')
Worker.doClick(work[0])}
if(i==pets.length-2){
Worker.goNext()}
if(hadWorked){
return false}
})}}
window.setTimeout(Worker.work,7000)