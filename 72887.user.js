// ==UserScript==
// @name           eParaguay Ordenes Batalla
// @namespace      eParaguay Ordenes Batalla
// @description    Ordenes actualizadas de batalla
// @version        1.01
// @include        http://www.erepublik.com/*
// ==/UserScript==

// Thanks to eGermany for the hardwork and eUSA for the inspiration

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://eparaguay.foroactivo.com/militar-f10/topic-oficial-ordenes-t247.htm',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('#.*?#');
            order_string = order_string.join("");
           order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1)

            var tags = order_string.split('|');
			var defcon = tags[0];
			var orders = tags[1];
			var link = tags[2];
			var date_issued = tags[3];

				var csslk = "";
				var color = "";
				var imglk = "http://img.skitch.com/20100329-jrn574xsqa4df13byfsnad76yg.jpg";
				if(defcon=="2")
				 {
				 	csslk = " color:#FDB109; ";
					color = "#FDB109";
				 }
				if(defcon=="1")
				 {
				 	csslk = " color:red; ";
					color = "#F96153";
					imglk = "http://img.skitch.com/20100329-chanjtuh9k96ipdxme52c3tr3n.jpg";
				 }

			latest=document.getElementById('latestnews');

			params_el = document.createElement("div");
			params_el.innerHTML = "<div style=\"height:100px; width:106px;float: left; margin-right: 4px;\ background:url("+imglk+"); -moz-border-radius:5px;\"></div><div style=\"font-size: 16px; font-weight: bold; margin-bottom: 4px;\">Ordenes Ejercito Paraguayo</div><div style=\"font-size: 16px; margin-bottom: 2px; min-height: 58px;\"><a href=\""+link+"\" style=\""+csslk+"\">"+orders+"</a></div><div style=\"float: right;\">Actualizado : "+date_issued+"</div><div style=\"clear: both;margin-bottom:10px;\"></div>"


            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(params_el, latest);
            }
		}	
		}
	);