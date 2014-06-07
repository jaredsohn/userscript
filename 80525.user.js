// ==UserScript==

// @name           Flaschenzeit

// @namespace      Pennergame

// @description    Führt eine Growl-Notification aus, wenn du vom Flaschensammeln wiederkommst.

// @version        1.1

// @author	   y4nk33zulu (LudenLasse)

// @include        http://*.pennergame.de/*

// @exclude        *.highscore.*

// @exclude        *.*board.*

// ==/UserScript==







// Hier kann eingestellt werden, ob ein Popup aufploppen soll und/oder ob geGrowled werden soll.

// true  = Funktion eingeschaltet; 

// false = Funktion ausgeschaltet



var doPopup = true;

var doGrowl = true;



// ENDE Einstellungen







var alreadyNotified = false;



var time = -1;



var bottletimer = document.getElementById("counter2").innerHTML;

var laenge = bottletimer.length;



//Auswertung des Strings aus bottletimer

var teil = bottletimer.split(':');



var stunde;

var minute;

var sekunde;



if(laenge < 6){

	minute = parseInt(teil[0]);

	sekunde = parseInt(teil[1]);

	time = minute * 60 + sekunde;

}

if(laenge >= 6){

	stunde = parseInt(teil[0]);

	minute = parseInt(teil[1]);

	sekunde = parseInt(teil[2]);

	time = stunde * 3600 + minute * 60 + sekunde;

}

//Ende Auswertung



if(bottletimer == "-/-" || bottletimer == "00:00"){

//Verhindert, dass der Alert bei abgelaufener Zeit ausgelöst wird.

	time = -1;

}



//Runterzählen, ggf. Notification auslösen

function countdown(){

	if(time > 0){

		time = time - 1;

	}

	

	if(time == 0){

		if(alreadyNotified == false){

			if(doGrowl){

				GrowlMonkey.notify("Flaschenzeit", "timeisup", "Die Zeit ist abgelaufen", "Du bist zurück vom Flaschensammeln.\nZurück an die Arbeit!");

			}

			if(doPopup){

				//alert("Du bist zurück vom Flaschensammeln. \nZurück an die Arbeit!");

				var bestaetigung = window.confirm('Du bist zurück vom Flaschensammeln. \nZurück an die Arbeit?');

				//Nach Betätigung des Buttons

				if(bestaetigung) {

 					window.location.replace('http://www.pennergame.de/activities/bottle/');

				}

			}

			alreadyNotified == true;

		}

		time = -1;

	}

} 



//Bei Growl registrieren

function registerGrowl(){

        var ntTimeIsUp = {};

        ntTimeIsUp.name = "timeisup";

        ntTimeIsUp.displayName = "Zeit abgelaufen";

        ntTimeIsUp.enabled = true;



        var types = [ntTimeIsUp];



        GrowlMonkey.register("Flaschenzeit", "http://static.pennergame.de/img/pv4/favicon.ico", types);

};



// -- GrowlMonkey stuff below here - do not edit

GrowlMonkey = function(){

    function fireGrowlEvent(type, data){

        var element = document.createElement("GrowlEventElement");

        element.setAttribute("data", JSON.stringify(data));

        document.documentElement.appendChild(element);



        var evt = document.createEvent("Events");

        evt.initEvent(type, true, false);

        element.dispatchEvent(evt);

    }

    

    return {

        register : function(appName, icon, notificationTypes){

            var r = {};

            r.appName = appName;

            r.icon = icon;

            r.notificationTypes = notificationTypes;

            fireGrowlEvent("GrowlRegister", r);

        },

        

        notify : function(appName, notificationType, title, text, icon){

            var n = {};

            n.appName = appName;

            n.type = notificationType;

            n.title = title;

            n.text = text;

            n.icon = icon;

            fireGrowlEvent("GrowlNotify", n);

        }

    }

}();



/* json2.js 

 * 2008-01-17

 * Public Domain

 * No warranty expressed or implied. Use at your own risk.

 * See http://www.JSON.org/js.html

*/

if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}

Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+

f(this.getUTCMonth()+1)+'-'+

f(this.getUTCDate())+'T'+

f(this.getUTCHours())+':'+

f(this.getUTCMinutes())+':'+

f(this.getUTCSeconds())+'Z';};var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case'string':return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];if(c){return c;}

c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+

(c%16).toString(16);})+'"':'"'+value+'"';case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}

if(typeof value.toJSON==='function'){return stringify(value.toJSON());}

a=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){l=value.length;for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||'null');}

return'['+a.join(',')+']';}

if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}else{for(k in value){if(typeof k==='string'){v=stringify(value[k],whitelist);if(v){a.push(stringify(k)+':'+v);}}}}

return'{'+a.join(',')+'}';}}

return{stringify:stringify,parse:function(text,filter){var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}

return filter(k,v);}

if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof filter==='function'?walk('',j):j;}

throw new SyntaxError('parseJSON');}};}();}





window.setInterval(countdown, 1000);

window.addEventListener("load", function(e) {

     registerGrowl();

}, false);