// ==UserScript==
// @name       BitChujsom
// @namespace  http://red.tube.org/
// @version    0.0666
// @description  something useful
// @main 	   krzysiu.t1@gmail.com
// @match      http://bitcoinwisdom.com/*
// @copyright  2012+, Gruby Kuc
// ==/UserScript==

 var sumGreen;
 var sumRed;
 var div;

window.onload = function() {
  var loc = document.getElementById("leftbar");
    sumGreen = document.createElement("div");
    sumRed = document.createElement("div");
    
    sumGreen.setAttribute("id","sumGreen");
    sumGreen.setAttribute("class","p green");
   // sumGreen.innerHTML = "kutas:";
    sumGreen.style.fontSize="large";
    loc.appendChild(sumGreen);
    sumRed = document.createElement("div");
    sumRed.setAttribute("id","sumRed");
    sumRed.setAttribute("class","p red");
    sumRed.style.fontSize="large";
  //  sumRed.innerHTML = "cipa:";
    loc.appendChild(sumRed);
   
     window.setInterval(Redisplay,1000);
  
}

function Redisplay() {
    div = document.getElementById("trades");
    var size = div.getElementsByClassName("row").length;
    var rows =  div.getElementsByClassName("row");
    var red = 0;
    var green = 0;
    var greenval =0;
    var redval = 0;

    for(var i = 0;i<size;i++)
    {
        var tmp = rows[i].lastChild.className;
        
        if(tmp == "p red"){
            var str =  rows[i].firstChild.innerHTML;
            str = str.replace("<g>",'');
            str = str.replace("</g>",'');
            redval +=parseFloat(str);
            red++; 
        }
            else 
        {
             var str =  rows[i].firstChild.innerHTML;
            str = str.replace("<g>",'');
            str = str.replace("</g>",'');
             greenval +=parseFloat(str);
            green++;
        }
      
    }           
    document.getElementById("sumGreen").innerHTML = green.toString()+ " " + greenval.toString().substr(0,9);
        document.getElementById("sumRed").innerHTML = red.toString()+ " " + redval.toString().substr(0,9);
  
}