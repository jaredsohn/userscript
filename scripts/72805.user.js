// ==UserScript==
// @name           Entente DoD
// @namespace      Entente DoD
// @description    Entente DoD
// @include        http://www.erepublik.com/*
// @exclude        http://www.erepublik.com/*/*
// ==/UserScript==
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://entente.erepfrance.com/viewtopic.php?f=18&t=101&p=311',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = null;
            
            /*if(!(response.responseText.match('#@#.*?#@#'))){
				latest=document.getElementById("content").childNodes[1];
				divdod = document.createElement("div");
				divdod.id = "EntenteDod";
				divdod.innerHTML = "<div style=\"border: none; padding: 10px; margin-bottom: 20px; width: 670px; background: none repeat scroll 0% 0% rgb(233, 245, 250); -moz-border-radius: 4px 4px 4px 4px; overflow: hidden;\"><div style=\"font-size: 18px; font-weight: bold;margin-bottom:4px;\">Entente DoD - You're not granted or not connected on the Entente forum.<a href=\"http://entente.erepfrance.com/\" target=\"_blank\" style=\"font-size: 10px;\"> &gt; Go on the forum for more details</a></div></div>";
			}else{*/
            	var order_string = response.responseText.match('#@#.*?#@#');
            	order_string = order_string.join("");
            	order_string = order_string.substring(order_string.indexOf('#')+4,order_string.length-3);
            	var tags = order_string.split('|');
            	var CURVERS = "1.0";
				var version = tags[0];
				var orders = tags[1];
				var link = tags[2];
				var update = tags[3];
				var defcon = tags[4];
			
				var csslk = "";
				var color = "rgb(233, 245, 250)";
				var spmsg = "This Order is not mandatory.";
				if(defcon=="2")
				 {
				 	csslk = " color:red; ";
					color = "#FDB109";
					spmsg = "This Order is important.";
				 }
				if(defcon=="1")
				 {
				 	csslk = "";
					color = "#F96153";
					spmsg = "&#47;&#33;\\ This Order is very important and mandatory for all.";
				 }
			
				latest=document.getElementById("content").childNodes[1];
			
				divdod = document.createElement("div");
				divdod.id = "EntenteDod";
				if(CURVERS==version) {
				divdod.innerHTML = "<div style=\"border: none; padding: 10px; margin-bottom: 20px; width: 670px; background: none repeat scroll 0% 0% "+color+"; -moz-border-radius: 4px 4px 4px 4px; overflow: hidden;\"><div style=\"font-size: 18px; font-weight: bold;margin-bottom:4px;\">Entente DoD <a href=\"http://entente.erepfrance.com/viewtopic.php?f=18&t=101&p=311\" target=\"_blank\" style=\"font-size: 10px; "+csslk+"\"> &gt; Go on the forum for more details</a></div><div style=\"font-size: 16px; margin-bottom:4px;\"><a href=\""+link+"\" target=\"_blank\" style=\""+csslk+"\">"+orders+"</a><br/>"+spmsg+"</div><div style=\"float:right;\">"+update+"</div></div>";
				 }
				else
				 {
				divdod.innerHTML = "<div style=\"border: none; padding: 10px; margin-bottom: 20px; width: 670px; background: none repeat scroll 0% 0% "+color+"; -moz-border-radius: 4px 4px 4px 4px; overflow: hidden;\"><div style=\"font-size: 18px; font-weight: bold;margin-bottom:4px;\">Entente DoD - New update is available<a href=\"http://entente.erepfrance.com/\" target=\"_blank\" style=\"font-size: 10px; "+csslk+"\"> &gt; Go on the forum for more details</a></div></div>";
				 }
			 //}

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(divdod, latest);
            }
		}	
		}
	);