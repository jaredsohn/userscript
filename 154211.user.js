// ==UserScript==
// @name        DepositFilesFreeDownloader
// @namespace   bitsscream
// @include     http://depositfiles.com/files/*
// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main(){
	if(document.getElementsByTagName('body')[0].getAttribute('class').split(" ")[1]=="page_download_gateway"){		
		$('<form method=post><input type="hidden" name="gateway_result" value="1"/></form>').appendTo($('body')).submit();
	}
}
// load jQuery and execute the main function
addJQuery(main);
