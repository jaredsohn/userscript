// ==UserScript==
// @name		Simple Capacity Watch
// @namespace		se.tapirboy.travian
// @description		Shows information about warehouse/granary. Percentage fill, estimated time until full or empty.
// @include		http://*.travian.*/dorf1*
// @include		http://*.travian.*/dorf3*
// @require		http://sizzlemctwizzle.com/updater.php?id=80945
// @author		Tapirboy
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version		1.2.1
// ==/UserScript==

(function capacitywatch(){

    /* SIMPLE SETTINGS */

    // highlight if less than xx hours left until full/empty
    var SS_hours_left = 9; // default 9
    var SS_hours_left_style = "font-weight:bold;"; // default "font-weight:bold;"

    // highlight if negative crop production
    var SS_negative_crop_style = "color:#b00;"; // default "color:#b00;"

    /* END OF SIMPLE SETTINGS */

    function $id(id) {
        return (id!=''? document.getElementById(id): null);
    };
    function getTimeFromDivision(a, p){
        var h,m,s;
        h = Math.floor(a/p);
        m = Math.floor(((a/p)%1)*60)>9? Math.floor(((a/p)%1)*60): "0"+Math.floor(((a/p)%1)*60);
        return h+":"+m;
    };
    function getTimeReady(delay){
        var time = document.getElementById("tp1").innerHTML.split(":");
        var d = delay.split(":");
        time[2] = new Number(time[2])+new Number(d[2]);
        time[1] = new Number(time[1])+new Number(d[1])+new Number(Math.floor(time[2]/60));
        time[0] = new Number(time[0])+new Number(d[0])+Math.floor((time[1]+1)/60);
        time[2] = time[2]%60;
        time[1] = (time[1]+1)%60;
        time[0] = time[0]%24>9? time[0]%24: "0"+time[0]%24;
        time[1] = time[1]>9? time[1]: "0"+time[1];
        time[2] = time[2]>9? time[2]: "0"+time[2];
        return time[0]+":"+time[1]; //+":"+time[2];
    };

    function parseDorf1(){
        var r = new Array();
        var STORE=0,CAPACITY=1,FREE=2,PERCENT=3,PRODUCTION=4,TIME=5;
        var e = $id("production").childNodes[2];
        for(var i=0; i<4; i++){
            //get values
            var el = $id("l"+(4-i));
            r = el.innerHTML.split("/");
            r[FREE] = r[CAPACITY] - r[STORE];
            r[PERCENT] = Math.round((r[STORE]/r[CAPACITY])*100,2)>9? Math.round((r[STORE]/r[CAPACITY])*100,2): "0"+Math.round((r[STORE]/r[CAPACITY])*100,2);
            r[PRODUCTION] = el.title;
            r[TIME] = Math.floor(r[PRODUCTION])>0? getTimeFromDivision(r[FREE],r[PRODUCTION]): getTimeFromDivision(r[STORE],Math.abs(r[PRODUCTION]));
            //set values
            var style = r[TIME].split(":")[0]>SS_hours_left? "": SS_hours_left_style;
            style += Math.floor(r[PRODUCTION])>0? "": SS_negative_crop_style;
            e.childNodes[(1+i*2)].childNodes[7].innerHTML = "| <span style='"+style+"' title='"+getTimeReady(r[TIME]+":00")+"'>"+r[PERCENT]+"% "+r[TIME]+"</span>";
            e.childNodes[(1+i*2)].childNodes[7].style.width = "60%";
        }
    };

    function parseDorf3(){
        var e = $id("warehouse");
        var villages = e.childNodes[2].rows.length;
        for(var i=1; i<villages*2+1; i++){
            var timer = $id("timer"+i);
            if(timer.innerHTML.split(":")[0]<SS_hours_left){
                timer.setAttribute("style",SS_hours_left_style);
            }
        }
    };

    if (window.location.href.match(/dorf1/)) {
        parseDorf1();
    }
    if(window.location.href.match(/dorf3.php\?.+=3/)) {
        parseDorf3();
    }
})();