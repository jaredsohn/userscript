// ==UserScript==
// @name           !tTimer
// @version        1.3
// @namespace      !tTimer
// @author         Skera
// @description    e-Sim battle slap at t20, t5 and t2
// @match          http://*.e-sim.org/battle.html?id=*
// ==/UserScript==
var main = function () {
    $(document).ready(function(){
        var path=parent.document.location.pathname.toString();
		var id=0, t20=false, t5=false, t2=false, running=false,timeout=false;
        var beepS = new Audio('http://skera.tk/beep.wav');
        if (!/battle.html/g.test(path)){ return; }
		if( $( "form[action='login.html']" ).length != 0 ) { //alert("login") 
		return;
        }
        id = $('#command :hidden').val();
        checkTime();
		function checkTime() {
            var time = $('.countdown_row').html().split(":");
            if(time[0]=="00"){
                var min = parseInt(time[1],10);
                var sec = parseInt(time[2],10);
                if(!t20){
                    if(!cookieInfoRead(20,id) && ((min == 21 && sec<=10) || min <= 20)  && min >=19){
                        beepS.play();
                        alert("t20");
                        t20=true;
                        cookieInfoWrite(20,id,true);
                        cookieInfoWrite(5,id,null);
                        cookieInfoWrite(2,id,null);
                    }
                }
                if(!t5){
                    if(!cookieInfoRead(5,id) && min == 5 && sec <= 50){
                        beepS.play();
                        alert("t5");
                        t5=true;
                        cookieInfoWrite(20,id,null);
                        cookieInfoWrite(5,id,true);
                        cookieInfoWrite(2,id,null);
                    }
                }
                if(!t2){
                    if(!cookieInfoRead(2,id) && min == 2 && sec <= 50){
                        beepS.play();
                        alert("t2");
                        t2=true;
                        cookieInfoWrite(20,id,null);
                        cookieInfoWrite(5,id,null);
                        cookieInfoWrite(2,id,true);
                    }
                }
                if((min == 21 && sec>10) || min > 21){
                    cookieInfoWrite(20,id,null);
                }
            }
            else{
                if(cookieInfoRead(20,id)){
                   cookieInfoWrite(20,id,null);
                }
                if(cookieInfoRead(5,id)){
                   cookieInfoWrite(5,id,null);
                }
                if(cookieInfoRead(2,id)){
                   cookieInfoWrite(2,id,null);
                }
            }
            timeout=setTimeout(checkTime,20000);
        }
        function cookieInfoRead(time,battleID){
            switch(time){
                case 2:
                    return $.cookie("t2_"+battleID);
                    break;
                case 5:
                    return $.cookie("t5_"+battleID);
                    break;
                case 20:
                    return $.cookie("t20_"+battleID);
                    break;
            }
        }
        function cookieInfoWrite(time,battleID,state){
            switch(time){
                case 2:
                    $.cookie("t2_"+battleID,state, {expires: 1});
                    break;
                case 5:
                    $.cookie("t5_"+battleID,state, {expires: 1});
                case 20:
                    $.cookie("t20_"+battleID,state, {expires: 1});
            }
        }
    })
}
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);