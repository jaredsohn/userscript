// ==UserScript==
// @name		Simple Build Watch
// @namespace		se.tapirboy.travian
// @description		Shows information about what amount of resource is needed, how long it will take to get it and when it will be ready.
// @include		http://*.travian.*/build*
// @require		http://sizzlemctwizzle.com/updater.php?id=81027
// @author		Tapirboy
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version		1.1.1
// ==/UserScript==

(function buildwatch(){

    function $id(id){
        return (id !=''? document.getElementById(id): null);
    };
    function $class(aName){
        return (aName != '' ? document.getElementsByClassName(aName): null);
    };
    function $tag(aTag){
        return (aTag != ''? document.getElementsByTagName(aTag): null);
    };
    function getTimeFromDivision(a, p) {
        var h,m,s;
        h = Math.floor(a/p);
        m = Math.floor(((a/p)%1)*60)>9? Math.floor(((a/p)%1)*60): "0"+Math.floor(((a/p)%1)*60);
        return h+":"+m;
    };
    function getTimeReady(delay){
        var time = $id("tp1").innerHTML.split(":");
        var d = delay.split(":");
        time[2] = new Number(time[2])+new Number(d[2]);
        time[1] = new Number(time[1])+new Number(d[1])+Math.floor(time[2]/60);
        time[0] = new Number(time[0])+new Number(d[0])+Math.floor((time[1]+1)/60);
        time[2] = time[2]%60;
        time[1] = time[1]%60;
        time[0] = time[0]%24>9? time[0]%24: "0"+time[0]%24;
        time[1] = time[1]>9? time[1]: "0"+time[1];
        time[2] = time[2]>9? time[2]: "0"+time[2];
        return time[0]+":"+time[1]; //+":"+time[2];
    };
    function getCapacityLevel(cost){
        var capacity = new Array(1200,1700,2300,3100,4000,5000,6300,7800,9600,11800,14400,17600,21400,25900,31300,37900,45700,55100,66400,80000);
        var buildings = Math.floor(cost/capacity[19]);
        cost = cost-capacity[19]*buildings;
        var factor = 0, rest = 0;

        while (rest != cost && factor != 19) {
            rest = cost%capacity[factor++];
        }
        var rString = "";
        for(var i=0; i<buildings; i++) {
            rString += "20, ";
        }
        return rString+(factor).toString();
    };

    function parseConstructionCosts(){
        var r = new Array();
        var STORE=0,CAPACITY=1,FREE=2,PRODUCTION=4;
        var needWarehouse = 0;
        var needGranary = 0;

        // getElementById("contracts") does not work for main building
        var c = $tag("p")[$tag("p").length-1];
        var s = document.createElement("p");
        s.innerHTML = "";

        for (var i=0; i<4; i++) {
            var e = $id("l"+(4-i));
            r = e.innerHTML.split("/");
            r[FREE] = r[CAPACITY]-r[STORE];
            r[PRODUCTION] = new Number(e.title);
 
            var cost = new Number(c.innerHTML.match(/\d+/g)[2*(i+1)]);
            var res = $class("r"+(i+1))[0].alt;

            // enough resources?
            if (cost > r[CAPACITY]) {
                if (i!=3 && cost>needWarehouse) {
                    needWarehouse = cost;
                }
                if (i==3) {
                    needGranary = cost;
                }
            }
            s.innerHTML += "<img title='"+res+"' alt='"+res+"' class='r"+(i+1)+"' src='img/x.gif' style='padding-left:2px' />";
            var delay = getTimeFromDivision(cost-r[STORE],r[PRODUCTION]);
            //	s.innerHTML += cost-r[STORE]>0?"-"+Math.abs(cost-r[STORE])+" | "+delay+" ("+getTimeReady(delay+":00")+")<br />":"<span class='none'>"+Math.abs(cost-r[STORE])+"</span><br />";
            s.innerHTML += cost-r[STORE]>0? "<span title='"+getTimeReady(delay+":00")+"'>-"+Math.abs(cost-r[STORE])+" ("+delay+") ": "<span class='none'>"+Math.abs(cost-r[STORE])+" </span>";
        }

        var e = $class("build").length>1? document.getElementsByClassName("build")[1]: false;

        // if possible to build, show time when ready
        if (e) {
            var time = document.createElement("span");
            time.innerHTML =" ("+ getTimeReady(c.childNodes[14].textContent) +")";

            // if waitingloop - fade text as time isn't correct - FIXME: need cookie to know time
            if (document.getElementsByClassName("none").length){
                time.className = "none";
            }
            c.insertBefore(time,c.childNodes[c.lastChild]);
        }

        // if not enough warehouse, show what level needed
        if (needWarehouse) {
            c.lastChild.innerHTML = c.lastChild.innerHTML +" ("+getCapacityLevel(needWarehouse)+")";
        }
        if (needGranary) {
            c.lastChild.innerHTML = c.lastChild.innerHTML +" ("+getCapacityLevel(needGranary)+")";
        }
        c.insertBefore(s,c.childNodes[c.lastChild]);
    };

    // ignore sub pages for palace, residence and marketplace
    if(( $id("build").className.match(/25/) || $id("build").className.match(/26/) || $id("build").className.match(/17/) ) && window.location.href.match(/[s,t]=\d/)){
        return;
    }
    
    parseConstructionCosts();
})();