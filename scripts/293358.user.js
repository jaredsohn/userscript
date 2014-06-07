// ==UserScript==
// @name           Twitter Pro
// @namespace      https://twitter.com/Faux_Horoscope
// @description    Twitter Pro allow you to follow all users on a page, color mention on "Interactions" and others..
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @include        https://*.twitter.com/*
// @include        http://*.twitter.com/*
// @version        Version BETA 05/11/13
// @author         @Faux_Horoscope
// @run-at         document-start
// ==/UserScript==

(function autoup(){
	var _window = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
	if (typeof _window.jQuery === 'undefined') {
		window.setTimeout(autoup, 200);
	} else {
		var $ = jQuery = _window.jQuery,
			hasFocus = true,
			isEnqueued = false;
		
		function show(el) {
			el.click();
			isEnqueued = false;
		}

		$(window).on({
			'blur': function() { hasFocus = false; },
			'focus': function() { hasFocus = true; }
		});
		
		$(document).on('DOMNodeInserted', function(event) {
			var el = $(event.target);
			if (el.hasClass('stream-item')) {
				bar = el.children('.new-tweets-bar');
				if (bar.length) {
					if (hasFocus) { show(bar); }
					else if (!isEnqueued) {
						$(window).one('focus', function() { show(bar); });
						isEnqueued = true;
                        
					}
				}
			}
		});
    }}
    )();

// <img id="image" class="non" src="http://www.iamhypeoujessaye.fr/image/twitterbird.png">
// <img id="image2" class="non" src="http://www.iamhypeoujessaye.fr/image/fav.png">
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button onmouseover="document.getElementById(\'image\').className=\'oui\';" onmouseout="document.getElementById(\'image\').className=\'non\';" id="myButton" type="button">&nbsp;&nbsp;'
+ 'Suivre tous <span id="led2" class="ledoff" >... </span><span id="led" class="ledoff" ></span></button><button onmouseover="document.getElementById(\'image2\').className=\'oui\';" onmouseout="document.getElementById(\'image2\').className=\'non\';" id="myButton2" type="button">&nbsp;&nbsp;'
+ 'Favoriser tous<span id="led2" class="ledoff" >..</span><span id="led" class="ledoff" ></span></button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);


//--- Activation du boutton
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);


function ButtonClickAction (zEvent) {
var compteur = document.getElementById("led");
    __cnt__=0;count=0;fini=0
    jQuery('.stream button.follow-button > span.follow-text').each(function (i, ele) {
        ele = jQuery(ele);
        
        if (ele.css('display')!='block') {
            console.log('already following:', i); return;
        								}
        
        setTimeout(function (){ele.click();count++;compteur.innerHTML = count;}, __cnt__++*500); });
    
    document.getElementById('led').className='ledon';
    document.getElementById('led2').className='ledon';
} 

//--- DESIGN
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {}
    
    #image{
    
    padding-top:12px;
   	position: fixed;
    margin-left: 15px;
    z-index: 50001;
    cursor: pointer;
	line-height: 1;
    }
      #image2{
	border-radius: 5px;
    padding-top:9px;
   	position: fixed;
        margin-left: 130px;
    z-index: 50001;
    cursor: pointer;
	line-height: 1;
    }
    .non{
	filter: brightness(60%);
	-webkit-filter: brightness(60%);
	-moz-filter: brightness(60%);
	-o-filter: brightness(60%);
	-ms-filter: brightness(60%);   
    }
   .oui{
	filter: brightness(60%);
	-webkit-filter: brightness(60%);
	-moz-filter: brightness(60%);
	-o-filter: brightness(60%);
	-ms-filter: brightness(60%);    }
    .none{display:none;}
    
    #myButton {
    
  		-webkit-transition: all .15s ease-in-out;
		transition: all .15s ease-in-out;
   		background-color: transparent;
   		position: fixed;
        margin-left: 0px;
		height: 40px;
        font-size:              12px;
        z-index:                50000;
        cursor:                 pointer;
        border-bottom: 4px solid transparent;
		color: #66757f;
		display: block;
		font-size: 13px;
        font-weight: 500;
        height: 46px;
        padding: 0 14px 0 4px;
        text-shadow: none;
    }
    
    #myButton:hover{
    	
        color: #0084B4;
        border-bottom: 4px solid red;
        
    }
    
    
    .ledoff{display: none;}
    
    .ledon{display:inline;}
    
    .stream-item-favorite, .stream-item-favorited_mention{display: none;}
    
    .js-activity-reply, .js-activity-mention {border-left: 12px solid #4099FF;}
    
    #checkbox{
       		background-color: transparent;
   			position: fixed;
        	margin-left: 10px;
        	width: 150px;
			height: 40px;
      		border-radius: 15px;
        	z-index: 50000;
        }
     
     #myButton2 {
   		background-color: transparent;
   		position: fixed;
        margin-left: 90px;
        width: 110px;
    	-webkit-transition: all .15s ease-in-out;
		transition: all .15s ease-in-out;
		height: 40px;
        font-size:              12px;
        z-index:                50000;
        cursor:                 pointer;
		color: #66757f;
		display: block;
		font-size: 13px;
		font-weight: 500;
		height: 46px;
		padding: 0 14px 0 4px;
		text-shadow: none;
        border-bottom: 4px solid transparent;
    }
    #myButton2:hover{color: #0084B4;border-bottom: 4px solid green;}
    
    
    .ledoff{display: none;}
    .ledon{display:inline;}
    .stream-item-favorite, .stream-item-favorited_mention{display: none;}
    .js-activity-reply, .js-activity-mention {border-left: 12px solid #4099FF;}
    
*/} ) );


//--- Activation du boutton
document.getElementById ("myButton2").addEventListener (
    "click", ButtonClickAction2, false
);


function ButtonClickAction2 (zEvent2) {$(document).ready(function(){   $('.favorite').click();});
} 
function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}
