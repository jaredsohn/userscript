// ==UserScript==
// @name          FFS Commander
// @description   used to automatically get your pets working in Friends For Sale
// @include       http://apps.facebook.com/friendsforsale/chores*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	  1.0.7 (last updated on March 24, 2010)
// ==/UserScript==
var Worker={
doClick : function(node){
var evt=document.createEvent("MouseEvents")
evt.initEvent("click",true,false)
node.dispatchEvent(evt)
},
doOK : function() {
  var event = document.createEvent("UIEvents");
  event.initUIEvent("keypress", true, false, window, 0);
  event.keyCode = 13;
  document.forms[0].dispatchEvent(event);
},
goNext : function(){
var next=$('#app7019261521_pet_value div.pagination a:last')
if(next.html()=='Next'){
Worker.doClick(next[0])
window.setTimeout(Worker.refresh,4000)}
else{
alert('DONE')}
},
work : function(){
Worker.doClick($('div.left_column div.headline ul.filters li:eq(1) a')[0])
var pets=$('#app7019261521_pet_value span.pet_container a')

pets.each(function(i){
var pet=pets.eq(i)
Worker.doClick(pet[0])
var hadWorked=false
var energy=$('span.energy',pet).html()
var e = energy.match(/([0-9]+)/i)
if (e != null)
{
var point=parseInt(e)

if(point>=100){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(8) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	
}

else if(point>=90){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(7) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(1) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(2) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	//work=document.getElementsByName("button1")
	//Worker.doClick(work[0])
}

else if(point>=75){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(4) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	//work=document.getElementsByName("button1")
	//Worker.doClick(work[0])
}

else if(point>=70){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(2) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(1) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	//work=document.getElementsByName("button1")
	//Worker.doClick(work[0])
}

else if(point>=65){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(9) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	//work=document.getElementsByName("button1")
	//Worker.doClick(work[0])
}

else if(point>=60){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(7) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(1) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	//work=document.getElementsByName("button1")
	//Worker.doClick(work[0])
}

else if(point>=50){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(6) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}

else if(point>=40){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(3) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(1) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(2) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(3) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}

else if(point>=35){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(2) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}

else if(point>=30){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(7) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}

else if(point>=25){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(5) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}

else if(point>=20){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(3) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	friend=$('span.friend_container:eq(1) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}

else if(point>=10){
	hadWorked=true
	var work
	var friend
	work=$('span.chore_container:eq(3) a')
	Worker.doClick(work[0])
	friend=$('span.friend_container:eq(0) a')
	Worker.doClick(friend[0])
	work=$('#app7019261521_checkout div.buy:eq(1) a')
	Worker.doClick(work[0])
	work=document.getElementsByName("button1")
	Worker.doClick(work[0])
}
}
if(i==pets.length-1){Worker.goNext()}
if(hadWorked){return false}
})}}

window.setTimeout(Worker.work,6000)
