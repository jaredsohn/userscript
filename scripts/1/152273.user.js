// ==UserScript==
// @name        realkana real smooth
// @namespace   realkana
// @include     http://www.realkana.com/practice/
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
        var num_guess = 0;
        var num_correct = 0;
        
        start_time = new Date();
        
        $("#guess").bind("keyup", function(){
                if((this.value.length == 2 && !(this.value[1] in {"y":0,"s":0,"h":0})) ||
                    this.value.length == 3 ||
                    ($("#bottom-center").text() == "\"" + this.value + "\"")
                ){
                
                    iswrong = false;
                    
                    if($("#bottom-center").text() == "\"" + this.value + "\""){
                        num_guess++;
                        num_correct++;
                    }else{
                        num_guess++;
                        iswrong = true;
                    }
                    
                    try{
                        $("#stat").html(num_correct  + "/" + num_guess + " = " + Math.round(num_correct / num_guess  * 100) + "%");
                    }catch(ex){}
                
                    if(!iswrong){
                        $("input[value=OK]")[0].click();
                    }else{
                        $("#bottom-center").css("visibility","visible");
                        this.value = "";
                        return false;
                    }
                }
        });
        
        setInterval(function(){
                new_date = new Date((new Date()) - start_time);
                h = new_date.getUTCHours();
                if(h.toString().length < 2){
                    h = "0" + h;
                }
                m = new_date.getUTCMinutes();
                if(m.toString().length < 2 ){
                    m = "0" + m;
                }
                s = new_date.getUTCSeconds();
                if(s.toString().length < 2){
                    s = "0" + s;
                }
                try{
                    $("#timer").html(h + ":" + m + ":" + s);
                }catch(ex){}
        },100);
        
        $("#main").append("<div id='timer'></div><div id='stat'></div>");
});
