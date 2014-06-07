// ==UserScript==
// @name           gal6time
// @namespace      EasySly
// @description    proper time of the gal6 based on Maillor's script
// @include        http://*.gal6.com/universe/galaxyforum/*
// @include        http://*.gal6.com/universe/notifications*
// ==/UserScript==

(function(){

leadZero = function(number) {
     return (number < 10) ? "0"+number:number;
}

// You can change this to true if you want to see real date instead of absolute
showAsDate = false;

b = document.getElementById("gal6time").innerHTML.split("&");
mosttick=parseInt(b[1].split("=")[1]);
mostminute=parseInt(b[2].split("=")[1].split(" ")[0].slice(0, -1));

for(i = 0; (a = document.getElementsByTagName("td")[i]); i++){
    if(a.className == " col4" || a.className == " col1 leftcolumn"){
        original = a.innerHTML;
        ora = a.innerHTML.split(":")[1];
        perc = a.innerHTML.split(":")[2];
            if (parseInt(ora.substring(1,1)) == 0) {
                ora=parseInt(ora.substr(1,ora.lenght-1));
            }
            if (parseInt(perc.substring(1,1)) == 0) {
                perc=parseInt(perc.substr(1,perc.lenght-1));
            }
            if (mostminute >= perc) {
                elteltora = mosttick-ora; 
                elteltperc = Math.abs(perc-mostminute);
            }
            else { ora++; 
                elteltora = parseInt(mosttick-ora); 
                elteltperc = Math.abs(60-perc+mostminute);
            }
            if (elteltora<0){
                elteltora++;
            }

            days = 0;
            if (elteltora > 24) {
                days = parseInt(elteltora/24);
            }
            
            text = "";
            if (showAsDate == false) {
               if (days > 0) {
                   text += days +" days ";
               }
               if (elteltora > 0) {
                   text += elteltora % 24 + " hours "; 
               }
               text += elteltperc + " min ago";
            } else {
              dateToday = new Date();
              oldDate = new Date(dateToday - (elteltora*3600000 + elteltperc*60000));
              text += leadZero(oldDate.getDate()) + "/" + leadZero(oldDate.getMonth()) + "/" + oldDate.getFullYear() + " " + leadZero(oldDate.getHours()) + ":" + leadZero(oldDate.getMinutes());
            }

            a.innerHTML=  text + "<br />" + original;
    }
}
})();

