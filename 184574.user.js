// ==UserScript==
// @name        test
// @namespace   f
// @include     http*://*.pgkbroker.ir/*
// @version     1
// @grant		none
// ==/UserScript==

(function() {

	var win = unsafeWindow,
		winLoaded = false, log_el;
		
	win.addEventListener("load", function(){
        winLoaded = true;
		
		init();
    }, false);
	
	function log(val) {
		log_el.val(log_el.val() + "\n" + val);
	}
    
    function init() {
		var btn, input_i;
		
		if(!win.$)
			return;
			
		btn = win.$("<div style='cursor: pointer; z-index: 9999999; background:green; position: absolute; width: 100px; height: 40px; top: 10px; right: 40px;'/>");
		input_i = win.$("<input type='text' value='2' style='z-index: 9999999; position: absolute; width: 80px; text-align: center; height: 40px; top: 10px; right: 150px;'/>");
		//log_el = win.$("<textarea  style='z-index: 9999999; position: absolute; width: 400px; text-align: center; height: 40px; top: 10px; left: 270px;'></textarea>");
		//time = win.$("<input type='text' value='58:500' title='ثانیه و میلی ثانیه را وارد کنید' style='z-index: 9999999; position: absolute; width: 80px; text-align: center; height: 40px; top: 10px; right: 240px;'/>");
		
		btn.appendTo(win.document.body);
		input_i.appendTo(win.document.body);
		//log_el.appendTo(win.document.body);
		//time.appendTo(win.document.body);
		
		
		btn.bind("click", function() {
			var i, j = 0, id, l = input_i.val(), reached = false, m, s, ss, counter = 0, old, time, now;

			win.$("#hiddenOrderSide").val(65);
			old = new Date();
			m = old.getMinutes();
			//s = new Date().getTime()
					
			id = window.setInterval(function() {
				//(counter == 0) && (s = new Date().getTime()) && (counter = 1);
				if(counter == 0) {
				    
				    counter = 1
				}
				
				now = new Date();


				if(!reached) {
					if(now.getSeconds() < 58) return;
					if(now.getMilliseconds() < 500) return;
					reached = true;
					s = new Date().getTime();
				    
				}
				
				//log("AAAAAAAAAAAAAAAAAA " + j + " : " + (now.getTime() - s));
				
				//log("AAAAAAAAAAAAAAAAAA " + j + " : " + now.getTime() + " - "  + s);
								
				++j;
				
				if(now.getTime() - s > 3000) {
				    //log("FINISH");
					window.clearInterval(id);
					return;
				}
				
                //log(j);

				for(i = 0; i < l; ++i) {
				    //log("A " + i + " " + j);
					win.SendOrder();
				}
			}, 1);
			
		});
	}

})();