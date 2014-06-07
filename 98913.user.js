// ==UserScript==
// @name           Robbit mod - faster
// @author         Originally Arun, customised
// @description    Customised robbit with smaller delay times
// ==/UserScript==


javascript:(function(){
    if(top===self){
        try{
        //Credits to spockholm for the unframe code http://www.spockholm.com
            if (navigator.appName == 'Microsoft Internet Explorer') {
        		alert('Robbit is not designed to work in Internet Explorer. Please switch to Firefox or Chrome.');
        		return;
        	}
        	if (/m.mafiawars.com/.test(document.location)) {
        		window.location.href = document.location+'?iframe=1';
        	}
        	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
        		//Credits to Christopher(?) for this new fix
        		for (var i = 0; i < document.forms.length; i++) {
        			if (/^canvas_iframe_post/.test(document.forms[i].id)) {
        				document.forms[i].target = '';
        				document.forms[i].submit();
        				return;
        			}
        		}
        	}
        	else if (document.getElementById('some_mwiframe')) {
        		window.location.href = document.getElementById('some_mwiframe').src;
        		return;
        	}
        	else {
        		document.body.parentNode.style.overflowY = "scroll";
        		document.body.style.overflowX = "auto";
        		document.body.style.overflowY = "auto";
        		try {
        			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
        			if (typeof FB != 'undefined') {
        				FB.CanvasClient.stopTimerToSizeToContent;
        				window.clearInterval(FB.CanvasClient._timer);
        				FB.CanvasClient._timer = -1;
        			}
        		} catch (fberr) {}
        	}
    	}
    	catch(err){}	
	}
    try{
        document.getElementById('header_top_promo_banner').parentNode.removeChild(document.getElementById('header_top_promo_banner'));
    }
    catch(fberr){}
      
    try{
        document.getElementById('LoadingOverlay').parentNode.removeChild(document.getElementById('LoadingOverlay'));
        document.getElementById('LoadingBackground').parentNode.removeChild(document.getElementById('LoadingBackground'));
    }
    catch(fberr){}
    
    try{
        document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
    }
    catch(fberr){}
    
	var slot=0;
    var start_stam = parseInt(document.getElementById('user_stamina').innerHTML);
    var start_exp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
    var refreshed=false;
    	
	function Robbit(){
	   refreshed=false;

 		for (var i = 8;i>=0; i--) 
		{ do_ajax ( '', 'remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=4&slot='+i
		, 1, 0, RobbingController.preRob(i), RobbingController.rob);}
		
        for(i=0;i<document.getElementsByClassName('pop_close').length;i++){
            if(document.getElementsByClassName('pop_close')[i].parentNode.style.display=='block'){
               if(/do not have enough stamina/.test(document.getElementsByClassName('pop_close')[i].parentNode.innerHTML)){
                    var end_stam = parseInt(document.getElementById('user_stamina').innerHTML);
                    var end_exp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
                    var Exp_ratio = (start_exp - end_exp) / (start_stam - end_stam);
                    alert('Robbit Results : \n\n Start Stamina : '+start_stam+' End Stamina : '+end_stam+'\n\nStamina Spent : '+(start_stam - end_stam)+'\n\nExperience Gained : '+(start_exp - end_exp)+'\n\nExp Ratio achieved : '+Exp_ratio);
                    var evt = document.createEvent('MouseEvents');
                	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					document.getElementsByClassName('pop_close')[i].dispatchEvent(evt);					
                    return;
               }
            }
        }
		slot++;
		if(slot < 1){
			setTimeout(Robbit,300);
		}
		else{
			setTimeout(refreshGrid,1750);
		}
	}

	function refreshGrid(){
		for(i=0;i<document.getElementsByClassName('pop_close').length;i++){
			if(document.getElementsByClassName('pop_close')[i].parentNode.style.display=='block'){
				if(document.getElementsByClassName('pop_close')[i].parentNode.getElementsByClassName('sexy_button_new sexy_refresh').length > 0){
                	var evt = document.createEvent('MouseEvents');
                	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					document.getElementsByClassName('pop_close')[i].parentNode.getElementsByClassName('sexy_button_new sexy_refresh')[0].dispatchEvent(evt);
					
                    for(i=0;i<document.getElementsByClassName('pop_close').length;i++){
                        if(document.getElementsByClassName('pop_close')[i].parentNode.style.display=='block'){
                           document.getElementsByClassName('pop_close')[i].dispatchEvent(evt);
                        }
                    }
                    
                    refreshed=true;
                    document.getElementById('inner_page').addEventListener('DOMSubtreeModified',function(){
                        if(pageLoading == 0){
                            slot=0;
							setTimeout(Robbit,300);
							this.removeEventListener('DOMSubtreeModified',arguments.callee,false);
                        }
                    },false);
                    return;
				}	
			} 
		}
        
        for(i=0;i<document.getElementsByClassName('pop_close').length;i++){
            if(document.getElementsByClassName('pop_close')[i].parentNode.style.display=='block'){
               if(/You're out of stamina/.test(document.getElementsByClassName('pop_close')[i].parentNode.innerHTML)){
                    var end_stam = parseInt(document.getElementById('user_stamina').innerHTML);
                    var end_exp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
                    var Exp_ratio = (start_exp - end_exp) / (start_stam - end_stam);
                    alert('Robbit Results : \n\nStamina Spent : '+(start_stam - end_stam)+'\n\nExperience Gained : '+(start_exp - end_exp)+'\n\nExp Ratio achieved : '+Exp_ratio);
                    var evt = document.createEvent('MouseEvents');
                	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					document.getElementsByClassName('pop_close')[i].dispatchEvent(evt);					
                    return;
               }
            }
        }
        
		if(refreshed==false){
            setTimeout(refreshGrid,1750);
		}
		else{
		  return;
        }
        return;
	}
	
	Robbit();
	function loadContent(file){
    	var head = document.getElementsByTagName('head').item(0);
    	var scriptTag = document.getElementById('loadScript');
    	if(scriptTag) head.removeChild(scriptTag);
    		script = document.createElement('script');
    		script.src = file;
    		script.type = 'text/javascript';
    		script.id = 'loadScript';
    		head.appendChild(script);
    		setTimeout(load,5000);
    }

})()