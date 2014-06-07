// ==UserScript==
// @name           Google Search Keyboard
// @description	   Google search results, minus the mouse
// @namespace      http://www.bitconsultants.net
// @include        http://*.google.*
// ==/UserScript==
/*********************************************************
/
/	Left/Right arrow search navigation
/	Number keys to navigate text search
/
/*********************************************************/
var urls  = document.getElementsByClassName('l');
var url_length = urls.length;
var content = "";
var loc =  "";
var page = parseInt(qs('start')) || 0;
var q = qs('q') || "";
var sub = document.getElementsByClassName('lsb')[0];
var vin = document.getElementsByClassName('lst')[0];
var vin2 = document.getElementsByClassName('lst')[1];
var typing = false;
var action = window.location.href.split('/');
var t = action.toString();
var a = t.split('?');
var re = a[0].replace(/,/gi, '/');
var url = re;

/**
*	Add the number to the text links
*/
for(i = 0; i < url_length; i++){
    content = urls[i].innerHTML;
    if(i < 9){
        urls[i].innerHTML=(i+1).toString()+". "+content;
    }else{
	urls[i].innerHTML=(0).toString()+". "+content;
    }
}

/**
*	Cancels Google's submit action
*/
document.addEventListener('submit', stopSubmit, true);

if(vin){
	vin.addEventListener('focus', function(e){typing = true;}, true);
	vin.addEventListener('blur', function(e){typing=false;}, true);
}
if(vin2){
	vin2.addEventListener('focus', function(e){typing = true;}, true);
	vin2.addEventListener('blur', function(e){typing=false;}, true);
}

document.addEventListener("keypress", function(e) {
    if(!e) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
    if ( key == 37 && !typing ) {//left
		if(page > 0){
			page -= 10;
			loc = '&start=' + page;
		}else{
			loc = '';
		}
		location.href = url + '?q=' + q + loc;
    }
	else if (key == 39 && !typing){//right
		page += 10;
		loc = '&start=' + page;
		location.href = url + '?q=' + q + loc;
	}else if(key >= 48 && key <= 57 && !typing){
		goto(translate(key));
		return false;
	}
  }, true);

function translate(num){
	return (num - 49);
}

if(sub !== undefined){
	sub.addEventListener('click',  stopSubmit, false);
}

function qs(ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i=0;i<gy.length;i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji) {
			return ft[1];
		}
	}
}

function goto(index){
    location.href = urls[index].getAttribute('href');
}

function stopSubmit(e){
	stopEvent(e);cancelEvent(e);
	
	input = document.getElementsByClassName('lst')[0];
	if(input == undefined)
		input = document.getElementsByClassName('srch_box')[0];
	if(input == undefined)
		return true;
	location.href = url + '?q=' + q + input.value;
	return false;
}
function cancelEvent(e){
	if(!e) e = window.event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}
function stopEvent(e){
	if(!e) e = window.event;
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}