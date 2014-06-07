// ==UserScript==
// @name           QLR_GM
// @namespace      _QLR_
// @description    QLRanks.com GreaseMonkey Script v1.0 Created by szr
// @include        http://*.quakelive.com/*
// ==/UserScript==


(function(){
	
	document.addEventListener('load', function(){
		
		
		function GetNickFromHtml()
		{
			player_nick = document.getElementById('prf_player_name').innerHTML;
			return player_nick;
		}
		
		function printELO(elo)
		{
		
			if (!document.getElementById("qlr_elo"))
			{
							
				var qlr_elo = document.getElementById('qlr_elo');
				
				if (qlr_elo)
				{
					qlr_elo.parentNode.removeChild(qlr_elo);
				}
				
				
				var qlv_profile_shared_container;
				qlv_profile_shared_container = document.getElementById('qlv_profile_shared_container');
				
				var qlr = document.createElement("div");
				qlr.innerHTML = '<div id="qlr_elo" style="margin: 0 auto 0 auto; ' +
				'border-bottom: 1px solid #000000; ' +
				'margin-bottom: 5px; font-size: small; ' +
				'background-color: #000000; color: #ffffff;">' +
				'<p align="center" style="margin: 2px 0 1px 0;"> ' +
				'QLRanks.com ELO Rating: ' + '<b>' + elo + '</b>' +
				'</p>' +
				'</div>';
				qlv_profile_shared_container.parentNode.insertBefore(qlr, qlv_profile_shared_container);
			}
			
		}
		
		GM_xmlhttpRequest({
		method:"GET",
		url:"http://qlranks.com/gmapi.aspx?name=" + GetNickFromHtml(),
		headers:{
			"User-Agent":"monkeyagent",
			"Accept":"text/monkey,text/xml",
		},
		onload:function(details) {
		str1 = details.responseText;
		
		str1 = str1.replace("<span id=\"Label1\">", "");
		str1 = str1.replace("</span>", "");
		str1 = str1.replace(/\n/g, "");
		str1 = str1.replace(/\s/g, "");

		printELO(str1);
		
		}
		});
		
		
		
	}, true);
				
	
})();