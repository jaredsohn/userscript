// ==UserScript==
// @name           mark web page
// @description    line anywhere in your web, like a pen
// @version        1.4
// @license        Public Domain
// @include        http://*
// @include        https://*
// ==/UserScript==
(function(){
	var Is_MouseDown = false;	
	var Is_CtrlDown = false;
	var LastPos_x, LastPos_y = 0;
	
	var mousePosition = function (ev){
		if(ev.pageX || ev.pageY){  
			return {x:ev.pageX, y:ev.pageY};  
		}  
		return {
			x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,  
			y:ev.clientY + document.body.scrollTop  - document.body.clientTop  
		};  
	}
	var paintPoint = function(x,y){
		setTimeout(function(){
			var css = '<div style="position:absolute;top:'+y+'px;left:'+x+'px;width:3px;height:3px;background:#f00;"></div>';
			$('body').append(css);
		},0);
	}
	var mouseMove = function (ev){
		if(Is_MouseDown && Is_CtrlDown){
			evev = ev || window.event;  
			var mousePos = mousePosition(ev);
			
			var diff = Math.abs(mousePos.x-LastPos_x);
			if((LastPos_x != 0)&&((Math.abs(mousePos.x-LastPos_x))>2 || (Math.abs(mousePos.y-LastPos_y))>2)){
				var step_x = mousePos.x-LastPos_x > 0?2:-2;				
				
				var deita_x = (mousePos.x-LastPos_x)==0?999:(mousePos.y-LastPos_y)/(mousePos.x-LastPos_x);// default is base on X
				
				if(Math.abs(deita_x)>1){
					var step_y = mousePos.y-LastPos_y > 0?2:-2;
					var deita_y = (mousePos.y-LastPos_y)==0?999:(mousePos.x-LastPos_x)/(mousePos.y-LastPos_y);//base on Y
					for(var i=LastPos_y;Math.abs(i-mousePos.y)>1;){
						paintPoint(LastPos_x+deita_y*(i-LastPos_y),i);
						i += step_y;
					}
				}else{
					for(var i=LastPos_x;Math.abs(i-mousePos.x)>1;){
						paintPoint(i,LastPos_y+deita_x*(i-LastPos_x));
						i += step_x;
					}
				}
				paintPoint(mousePos.x,mousePos.y);
			}else{
				paintPoint(mousePos.x,mousePos.y);
			}
			LastPos_x = parseInt(mousePos.x);
			LastPos_y = parseInt(mousePos.y);
		}
	}
	
	//web page painter
    var myPainter = function(res){
		eval(res.responseText);
		document.onmousemove = mouseMove;
		document.onmousedown = function(){
			LastPos_x = LastPos_y = 0;
			Is_MouseDown = true;
		}
		document.onmouseup = function(){
			Is_MouseDown = false;
		}
		document.onkeydown = document.onkeyup = function(event){
			Is_CtrlDown = event.ctrlKey;
		}
    };
	
    // Load jQuery 1.7.1
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
        onload: myPainter
    });
})();