// ==UserScript==
// @name VK Scroll
// @description Fixed scroll in VK by spacebar or Page Up and Page Down
// @author Nikita A. [http://vk.com/define]
// @license MIT
// @version 1.6
// @include http://vk.com/*
// @include https://vk.com/*
// ==/UserScript==

var now = -1,
	min = 5,
	tmp2 = null,
    el2 = Array(),
    el3 = Array(),
    el4 = Array(),
    el5 = Array();

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return curtop;
    }
}

function reindex() {
    el2 = document.getElementsByClassName("feed_row");
    el4 = document.getElementsByClassName("post");
}

document.onkeydown = function (event) {
	event = event || window.event;
	if(tmp2==null){tmp2=location.pathname;}
	if(tmp2!==location.pathname){now=-1;tmp2=location.pathname;}

	if(document.getElementById("profile_narrow")){reindex();}
	if(el4.length!==0){
		return work(event,"profile");
	}
    if(location.pathname=="/feed"){
    	reindex();
	    return work(event,"feed");
	}
};

function work(event,type){
	if(type=="feed"){
		elements=el2;
		le=el2.length;
		el3=Array();
		el4=Array();
		for(i in el2){
    		if(typeof el2[i].getElementsByClassName == 'function'){
    			tmp=document.getElementsByClassName("feed_row")[i].getElementsByClassName("post_like_wrap")[0];
    			if(typeof tmp!=="undefined"){
    				el3[i]=tmp;
    			}
    		}
    		if(typeof el2[i].getElementsByClassName == 'function'){
    			tmp=document.getElementsByClassName("feed_row")[i].getElementsByClassName("wall_post_more")[0];
    			if(typeof tmp!=="undefined"){
    				el5[i]=tmp;
    			}
    		}
    	}
	}else if(type=="profile"){
		elements=el4;
		le=el4.length;
		el3=Array();
		for(i in el4){
    		if(typeof el4[i].getElementsByClassName == 'function'){
    			tmp=document.getElementsByClassName("post")[i].getElementsByClassName("post_like_wrap")[0];
    			if(typeof tmp!=="undefined"){
    				el3[i]=tmp;
    			}
    		}
    		if(typeof el4[i].getElementsByClassName == 'function'){
    			tmp=document.getElementsByClassName("post")[i].getElementsByClassName("wall_post_more")[0];
    			if(typeof tmp!=="undefined"){
    				el5[i]=tmp;
    			}
    		}
    	}
	}

	if (navigator.appVersion.indexOf("Mac")!=-1){
		ctrl=event.shiftKey;
	}else{
		ctrl=event.ctrlKey;
	}

	if(event.target.localName!=="textarea" && le!==0){
	    	if(event.keyCode==76 && ctrl == 1){
	    		if(typeof el3[now]!=="undefined"){
	    			simulatedClick(el3[now]);
	    		}
	    		return false;
	    	}
	    	if(event.shiftKey == 1){
	    		if(typeof el5[now]!=="undefined"){
	    			simulatedClick(el5[now]);
	    		}
	    		return false;
	    	}
		    if ((event.keyCode == 32 && ctrl == 0) || event.keyCode == 34) {
		        if (now < le) {
		        	if (elements[now+1] !== undefined) {
		            	++now;
		                fp = findPos(elements[now]);
		                window.scroll(0, fp-min);
		            }
		            return false;
		        }
		    } else if ((event.keyCode == 32 && ctrl == 1) || event.keyCode == 33) {
		        if (now !== 0) {
		            --now;
		            fp = findPos(elements[now]);
		            window.scroll(0, fp-min);
		            return false;
		        }
		    }
		}
}

function simulatedClick(target) {

    var event = target.ownerDocument.createEvent('MouseEvents');
    var opts = {
        type: 'click', canBubble: true, cancelable: true, view: target.ownerDocument.defaultView,
        detail: 1, screenX: 0, screenY: 0, lientX: 0, clientY: 0, button: 0
    }

    event.initMouseEvent(
    opts.type,
    opts.canBubble,
    opts.cancelable,
    opts.view,
    opts.detail,
    opts.screenX,
    opts.screenY,
    opts.button);

    target.dispatchEvent(event);
}
