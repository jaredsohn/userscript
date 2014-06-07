// ==UserScript==
// @author Farbdose
// @name Tribalwars Scripting Team Timer
// @namespace http://www.tw-ar.com
// @include http://*/game.php*screen=place&target=*
// @include http://*/game.php*screen=place
// @include http://*/game.php*screen=place&mode=command*
// @include http://*/game.php*screen=place&try=confirm
// ==/UserScript==

(function(){

function start(){
    var dstime=document.getElementById("serverTime").innerHTML;
	window.dtime=prompt('الثواني:الدقيقه:الساعه\n مثال :\n08:14:36 ');
	window.setInterval(function() {
		var dstime=document.getElementById("serverTime").innerHTML;
		if(dstime==window.dtime){  
			window.setTimeout(document.getElementsByName('submit')[0].click(),window.dtimev*400);
		}
	},200);
}
	var l = document.createElement('a');
	var nl = document.createElement('br');
	l.href="javascript:;";
	l.addEventListener('click',start,true);
	l.innerHTML = 'الوقت المراد فيه الضغط على "موافق"';
	document.forms[0].appendChild(nl);
	document.forms[0].appendChild(l);
}());

(function(){
	function start(){
		var dstime=document.getElementById("serverTime").innerHTML;
		window.dtime=prompt('الثواني:الدقيقه:الساعه\n مثال :\n08:14:36 ');
		window.setInterval(function(){
			var dstime=document.getElementById("serverTime").innerHTML;
			if(dstime==window.dtime){
				window.setTimeout(document.getElementsByName('attack')[0].click(),window.dtimev*400);
			}
		},200);
	}
	var l = document.createElement('a');
	var nl = document.createElement('br');
	l.href="javascript:;";
	l.addEventListener('click',start,true);
	l.innerHTML = 'الوقت المراد فيه الضغط على "هجوم"';
	document.forms[0].appendChild(nl);
	document.forms[0].appendChild(l);
}());

(function(){
	function start(){
		var dstime=document.getElementById("serverTime").innerHTML;
		window.dtime=prompt('الثواني:الدقيقه:الساعه\n مثال :\n08:14:36 ');
		window.setInterval(function(){
			var dstime=document.getElementById("serverTime").innerHTML;
			if(dstime==window.dtime){
				window.setTimeout(document.getElementsByName('support')[0].click(),window.dtimev*400);
			}
		},200);
	}

	var l = document.createElement('a');
	var nl = document.createElement('br');
	l.href="javascript:;";
	l.addEventListener('click',start,true);
	l.innerHTML = 'الوقت المراد فيه الضغط على "دعم"';
	document.forms[0].appendChild(nl);
	document.forms[0].appendChild(l);
}());