// ==UserScript==
// @name        Erepublik Names History
// @namespace   http://sniper.vot.pl/erepublik/
// @include     http://www.erepublik.com/*/citizen/profile/*
// @include     http://www.erepublik.com/*/main/search/*
// @version     1.0
// @grant		GM_xmlhttpRequest
// ==/UserScript==

function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (
aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return strReturn;
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else{
		$ = unsafeWindow.jQuery;		
		var foo = document.URL.split('/');
		
		if(foo[4] == "main"){
		
			if($('.bestof > tbody > tr').length <= 1)
			{
				var q = getURLParam('q');			
				GM_xmlhttpRequest({
				  method: "POST",
				  url: "http://sniper.vot.pl/erepublik/names.json",
				  data: "search="+q,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  onload: function(response) {
					data = JSON.parse(response.responseText);
					var string = ""
					var lp = 1;
					for(var i in data){						
						string = string + "<tr><td style='text-align: center;'>"+lp+"</td><td><a href='http://www.erepublik.com/en/citizen/profile/"+data[i].cid+"'>"+data[i].name+"</a></td><td>(Old nickname)</td><td></td></tr>";
						$(".bestof > tbody ").append(string);
						lp++;
					}
				 }	
				});
			}

		}
		else{
			var current_name = $(".citizen_profile_header").children("img").attr("alt");
			var cid= foo[foo.length-1];
			
			GM_xmlhttpRequest({
			  method: "POST",
			  url: "http://sniper.vot.pl/erepublik/names.json",
			  data: "cid="+cid,
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
			  onload: function(response) {
				data = JSON.parse(response.responseText)
				var string = ""
				for(var i in data){
					if(data[i].name != current_name)
						string = string + "<span style='color: gray; font-size: 14px;'> / "+data[i].name+"</span>";
				}
				$(".citizen_profile_header").children("h2").html($(".citizen_profile_header").children("h2").html() + string);
				
				/*if($(".citizen_menu").html())
					$(".citizen_menu").append("<li><a href='#' id='nicknames_history'>Nicknames history</a></li>");
				else
					$(".citizen_profile_header").append("<ul class='citizen_menu'><li><a href='#' id='nicknames_history'>Nicknames history</a></li></ul>");*/
			  }
			});
		}
	}
}
GM_wait();