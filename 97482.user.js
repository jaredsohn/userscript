// ==UserScript==
// @name           Facebook AutoLike 2 By. SuaNk'GiE
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">NomorQ [085254225494]</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/yakonde\">~.¤™.aLdHy-SuaNk'GiE.™¤.~</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">~¤. Like Semua Status .¤~</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">~¤. Tidak suka semuanya .¤~</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		
		}
		
	};
}
// ==============


<script>
//mouse
//Circling text trail- Tim Tilton
//Website: http://www.tempermedia.com/
//Visit http://www.dynamicdrive.com for this script and more
function cursor_text_circle(){
// your message here
var msg='SUANKGIE'.split('').reverse().join('');

var font='Times New Roman';
var size=3; // up to seven
var color='#fff';

// This is not the rotation speed, its the reaction speed, keep low!
// Set this to 1 for just plain rotation w/out drag
var speed=.2;

// This is the rotation speed, set it negative if you want
// it to spin clockwise
var rotation=-.2;

// Alter no variables past here!, unless you are good
//---------------------------------------------------


var ns=(document.layers);
var ie=(document.all);
var dom=document.getElementById;
msg=msg.split('');
var n=msg.length;
var a=size*13;
var currStep=0;
var ymouse=0;
var xmouse=0;
var props="<font face="+font+" color="+color+" size="+size+">";

if (ie)
window.pageYOffset=0

// writes the message
if (ns){
for (i=0; i < n; i++)
document.write('<layer left="0" top="0" width="+a+" name="nsmsg'+i+'" height="+a+"><center>'+props+msg[i]+'</font></center></layer>');
}
else if (ie||dom){
document.write('<div id="outer" style="position:absolute;top:0px;left:0px;z-index:30000;"><div style="position:relative">');
for (i=0; i < n; i++)
document.write('<div id="iemsg'+(dom&&!ie? i:'')+'" style="position:absolute;top:0px;left:0;height:'+a+'px;width:'+a+'px;text-align:center;font-weight:normal;cursor:default">'+props+msg[i]+'</font></div>');
document.write('</div></div>');
}
(ns)?window.captureEvents(Event.MOUSEMOVE):0;

function Mouse(evnt){
ymouse = (ns||(dom&&!ie))?evnt.pageY+20-(window.pageYOffset):event.y; // y-position
xmouse = (ns||(dom&&!ie))?evnt.pageX+20:event.x-20; // x-position
}

if (ns||ie||dom)
(ns)?window.onMouseMove=Mouse:document.onmousemove=Mouse;
var y=new Array();
var x=new Array();
var Y=new Array();
var X=new Array();
for (i=0; i < n; i++){
y[i]=0;
x[i]=0;
Y[i]=0;
X[i]=0;
}

var iecompattest=function(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}

var makecircle=function(){ // rotation properties
if (ie) outer.style.top=iecompattest().scrollTop+'px';
currStep-=rotation;
for (i=0; i < n; i++){ // makes the circle
var d=(ns)?document.layers['nsmsg'+i]:ie? iemsg[i].style:document.getElementById('iemsg'+i).style;
d.top=y[i]+a*Math.sin((currStep+i*1)/3.8)+window.pageYOffset-15+(ie||dom? 'px' : '');
d.left=x[i]+a*Math.cos((currStep+i*1)/3.8)*2+(ie||dom? 'px' : ''); // remove *2 for just a plain circle, not oval
}
}

var drag=function(){ // makes the resistance
y[0]=Math.round(Y[0]+=((ymouse)-Y[0])*speed);
x[0]=Math.round(X[0]+=((xmouse)-X[0])*speed);
for (var i=1; i < n; i++){
y[i]=Math.round(Y[i]+=(y[i-1]-Y[i])*speed);
x[i]=Math.round(X[i]+=(x[i-1]-X[i])*speed);

}
makecircle();
// not rotation speed, leave at zero
setTimeout(function(){drag();},10);
}
if (ns||ie||dom)
if ( typeof window.addEventListener != "undefined" )
window.addEventListener( "load", drag, false );
else if ( typeof window.attachEvent != "undefined" )
window.attachEvent( "onload", drag );
else {
if ( window.onload != null ) {
var oldOnload = window.onload;
window.onload = function ( e ) {
oldOnload( e );
drag();
};
}
else
window.onload = drag;
}

}
cursor_text_circle();

</script>