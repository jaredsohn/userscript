// ==UserScript==
// @name           Test CEW
// @include       https://*
// @include       http://*
// @version 1.0.8
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	
	console.log('Main loaded');
	
	jQuery('<div/>', {
	    id: 'cew'
	}).appendTo('body');
	
	$('#cew').html(
		'	<div class="cew_btn cew_onThisSite" style="">5</div>'
		+'	<div class="cew_btn cew_prefs" style=""></div>'
		+'	<div class="cew_btn cew_onAllSites" style="">12</div>'
		+'	<div class="cew_panel cew_prefs_panel">Blabla tavu</div>'
	);
	
	
	
}

// load jQuery and execute the main function
addJQuery(main);

var style = "#cew{width: 80px;height: 18px;font-size:13px;font-weight:bold;color:hsl(74, 64%, 25%);line-height:18px;position:absolute;top:5px;left:5px;z-index:9998;font-family:'Trebuchet MS', Verdana;}"
	+"#cew .cew_btn{display:block;height: 18px;float:left;background-color:hsl(74, 64%, 59%);cursor: pointer;z-index:9999;position: relative;opacity:0.8;}"
	+"#cew .cew_btn:hover{background-color:hsl(74, 64%, 39%);color:white}"
	+"#cew .cew_onThisSite{padding:1px 5px 1px 7px;border-radius: 10px 0 0 10px;}"
	+"#cew .cew_prefs {border-left:2px solid hsl(74, 64%, 45%);padding:1px 5px;"
	+"	width:18px;"
	+"	background-image:  url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM+/MM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8/QPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6+E7YAN/5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1/CxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU/ySckkgDYuNuVpI42T9k4gLKGMPs/xPzzovQiY2hQYe0jlJfyNNhTqiWDYBq/wBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo//3mrj+BV0QQagqGTOo+Y7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A+aQvWk4ihq95p67a7nP+u+Ws+r0dql9z/zv0NCYhdCPKZ7oYAAAAASUVORK5CYII%3D);"
	+"	background-repeat: no-repeat;"
	+"	background-position: 6px 1px;"
	+"}"
	+"#cew .cew_onAllSites {border-left:2px solid hsl(74, 64%, 45%);padding:1px 7px 1px 5px;border-radius:0 10px 10px 0}"
	+"#cew .cew_panel{position: absolute;top:10px;left:0;border:2px solid hsl(74, 64%, 45%);border-radius:5px;z-index: 9997;width: 200px;background: #fff;padding: 10px 5px 5px}"
	
GM_addStyle(style);