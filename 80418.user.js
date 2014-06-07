// ==UserScript==
// @name ROPT E FRIKES
// @description PROP UNLOCKER
// @include http://facebook.mafiawars.com/*
// ==/UserScript==

jjavascript:(function(){
	var slot=0;
    var start_stam = parseInt(document.getElementById('user_stamina').innerHTML);
    var start_exp = parseInt(document.getElementById('exp_to_next_level').innerHTML);
    var refreshed=false;
    	
	function Robbit(){
	   refreshed=false;
		do_ajax('','remote/html_server.php?xw_controller=robbing&xw_action=rob&xw_city=1&slot='+slot,1,0,RobbingController.preRob(slot),RobbingController.rob);
		
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
		if(slot < 9){
			setTimeout(Robbit,0);
		}
		else{
			setTimeout(refreshGrid,0);
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
							setTimeout(Robbit,0);
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
            setTimeout(refreshGrid,500);
		}
		else{
		  return;
        }
        return;
	}
	
	Robbit();
})()