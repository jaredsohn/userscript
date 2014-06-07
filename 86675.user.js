// ==UserScript==
// @name           forecast
// @namespace      www.currygu.com
// @description    Get international weather forecasts from Wunderground.com
// @include        http*
// ==/UserScript==
(function(){
function $(element){return document.getElementById(element)}

function getForecast(currentUrl){
	//var currentUrl = e.target.href ? e.target.href :
	//  	 'http://www.wunderground.com/cgi-bin/findweather/getForecast?query='+$('f_txt_city').value+'&wuSelect=WEATHER';
	GM_xmlhttpRequest({
	  method: "GET",
	  url:currentUrl,
	  headers: {
	    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
	    "Accept": "text/xml"            // If not specified, browser defaults will be used.
	  },
	  onload: function(response) {
	 		var weatherData = null;
//	 		var city = '';
	 		if($('f_weatherData'))
	 				$('f_content_div').removeChild($('f_weatherData'));
	 		if($('f_detailData'))
	 				$('f_content_div').removeChild($('f_detailData'));
	 				
	 		var div = document.createElement('DIV');
	  	div.innerHTML = response.responseText;
	  	
	  	weatherData = document.evaluate('//td[@class="vaT full"]/div[@class="bm15" or @class="blueBox"]/table[@class="dataTable"]',
	  		 div, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	  		 
	  	if(weatherData.snapshotLength > 0){
	  		weatherData = weatherData.snapshotItem(0);
	  		weatherData.setAttribute('id','f_weatherData');
	  		$('f_content_div').appendChild(weatherData); 			
	 			weatherData.setAttribute('onclick','');
	 			var links = weatherData.getElementsByTagName('A');
	 			for(var i=0,len=links.length;i<len;i++){
	 				links[i].setAttribute('href','http://www.wunderground.com'+links[i].getAttribute('href'));
	 				links[i].setAttribute('target','_blank');
	 				links[i].addEventListener('click',function(e){
	 					if(e.target.href.indexOf('http://www.wunderground.com/global/')!=-1 ||
	 						e.target.href.indexOf('http://www.wunderground.com/US/')!=-1){	
	 						$('f_error_div').style.display = 'none'; 						
		 					$('f_loading_div').style.display = 'block';
		 					$('f_btn_query').setAttribute('disabled','disabled');
		 					getForecast(e.target.href);
		 					e.preventDefault();
		 				}
	 				},false);
	 			}
	 		}else{
	 			$('f_error_div').style.display = 'block';
	 		}	 
	 		 		
	  	detailData = document.evaluate('//div[@id="wundfct_contain" or @id="forecast_contain"]/table[@class="dataTable"]',
	  		 div, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	  	if(detailData.snapshotLength > 0){
	  		detailData = detailData.snapshotItem(0);
	  		detailData.setAttribute('id','f_detailData');
	  	}else{
	  		detailData = null;
	  	}
	  	city = document.evaluate('//table[@id="cityTable"]//td[@class="nobr full"]/h1',
	  		 div, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	  	if(city.snapshotLength > 0){
	  		city = city.snapshotItem(0).innerHTML;
	  		$('f_txt_city').value = city;
	  	}else{
	  		city = '';
	  	}		  	
		  
			$('f_loading_div').style.display = 'none';
			$('f_btn_query').removeAttribute('disabled');	
			$('f_txt_hidden').value = currentUrl;
	  }
	});
}
if(window.top != window.self)
	return;
var detailData = null;
var city = '';
var button = document.createElement('DIV');
button.setAttribute('style','cursor:pointer;width:12px;height:12px;position:fixed;left:20px;top:20px;background-color:#f00;z-index:2147483647');
button.addEventListener('click',createContainer,false);
document.body.appendChild(button);
unsafeWindow.createContainer = createContainer;//Just for firegesture and keysnail.You can delete the line without any modification
function createContainer(){
	if($('f_container')){
		document.body.removeChild($('f_container'));
		detailData = null;
		return ;
	}
		
	css = '#featuresBar td.b {color:#000000;} \
		#f_container .nobr {white-space:nowrap;}\
		#f_container .taC {text-align:center;}\
		#f_container .dataTable tbody tr.wHover:hover td {background-color:#FFFFFF;}\
		#f_container .dataTable tbody tr.noBorder td {border-bottom:0 none;}\
		#f_container .dataTable {width:100%;font-size:12px}\
		#f_container td{padding:2px;line-height:100%;}\
		#f_container div{text-align:center}\
		#f_container td.sortH {\
			background-color:#CCCCCC;\
			border-color:#EEEEEE #999999 #999999 #EEEEEE;\
			border-style:solid;\
			border-width:1px;\
			color:#000000;\
			cursor:pointer;\
			font-family:Verdana;\
			font-size:11px;\
			font-weight:bold;\
			padding:5px;\
		}\
		#f_container,#f_btn_default,#btn_query,#txt_city{font-size:12px}\
		#f_container{width:500px;position:fixed;left:40px;top:20px;border:2px solid #ccc;background-color:#E6E6FA;opacity:0.9;z-index:2147483647;}\
		#f_content_div{max-height:500px; overflow-y:scroll;}\
		#f_error_div{text-align: center;display:none;color:red;font-size:14px;}\
		#f_btn_close{float:right;cursor:pointer}\
		#f_btn_detail{float:right;cursor:pointer;padding-right:5px;color:red}\
		#f_loading_div{text-align: center;display:none;height:50px;background-repeat: no-repeat;background-position: center;\
			background-image:url(data:image/jpg;base64,R0lGODlhIAAgAPMAAPf6+wAAAMDCw4CBgrCzs5WXmDQ1NVNUVNLU1d3g4ba5uR0dHQMDAwAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ/V/nmOM82XiHRLYKhKP1oZmADdEAAAh+QQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY/CZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB+A4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6+Ho7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq+B6QDtuetcaBPnW6+O7wDHpIiK9SaVK5GgV543tzjgGcghAgAh+QQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK++G+w48edZPK+M6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE+G+cD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm+FNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk+aV+oJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0/VNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc+XiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30/iI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE/jiuL04RGEBgwWhShRgQExHBAAh+QQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR+ipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq+E71SRQeyqUToLA7VxF0JDyIQh/MVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY+Yip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd+MFCN6HAAIKgNggY0KtEBAAh+QQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1+vsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d+jYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg+ygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0+bm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h+Kr0SJ8MFihpNbx+4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX+BP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA==)}\
		';
		
	GM_addStyle(css);
	
	var container = document.createElement('DIV');
	container.setAttribute('id','f_container');
	container.innerHTML = '<form action="#" onsubmit="return false;">\
			city:&nbsp;<input type="text" id="f_txt_city" value="Shanghai Hongqiao"/>&nbsp;\
			<input type="submit" id="f_btn_query" value="query" />\
			<input type="button" id="f_btn_default" value="set default" />\
			<input type="text" id="f_txt_hidden" value="" style="display:none" />\
			<span id="f_btn_close">close</span>\
			<span id="f_btn_detail">details</span>\
		</form>\
		<div id="f_loading_div"></div>\
		<div id="f_error_div">City Not Found</div>\
		<div id="f_content_div"></div>';
			
	container.getElementsByTagName('INPUT')[1].addEventListener('click',function(e){
		if(!$('f_txt_city').value.replace(/^\s*|\s*$/g,'')){
			alert('a city is necessary');
			return;
		}
		this.setAttribute('disabled', 'disabled');
		$('f_loading_div').style.display = 'block';
		$('f_error_div').style.display = 'none';
		var url =	'http://www.wunderground.com/cgi-bin/findweather/getForecast?query='+$('f_txt_city').value+'&wuSelect=WEATHER';
		getForecast(url);
	},false);
	
	container.getElementsByTagName('INPUT')[2].addEventListener('click',function(e){
		if($('f_txt_hidden').value && city){
			GM_setValue('defaultUrl',$('f_txt_hidden').value);
			GM_setValue('city',city);
		}else{
			alert('error occured when setting default');
		}
	},false);
	
	container.getElementsByTagName('SPAN')[0].addEventListener('click',function(){
		document.body.removeChild(container);
		detailData = null;
	},false);
	container.getElementsByTagName('SPAN')[1].addEventListener('click',function(){
		if(detailData){
			container.getElementsByTagName('DIV')[2].appendChild(detailData);
			detailData = null;
		}
	},false);
	document.body.appendChild(container);		
	
	if(GM_getValue('defaultUrl')){
		$('f_loading_div').style.display = 'block';
		$('f_btn_query').setAttribute('disabled','disabled');
		$('f_txt_city').value = GM_getValue('city');
		getForecast(GM_getValue('defaultUrl'));
	}
}
})();
return;