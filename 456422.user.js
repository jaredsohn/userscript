// ==UserScript==
// @name        Virtonomica:America
// @namespace   virtonomica
// @include     http://*virtonomic*.*/*/main/*
// @version     1
// @grant       none
// ==/UserScript==
var run = function()
{
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);

var wc = $("<li><div id=can_arg style='float:left;cursor:pointer; color: white;'> ARG-CAN</div>").click( function() {
	console.log('click');

	var div = $("div#contest");
	console.log(div.length);

	//console.log(div.eq(0).html());

	var fr = $("iframe");
	console.log(fr.length);
	for(var i=0; i<fr.length; i++){
		var rrr = fr.eq(i).contents().find("div.war");
		console.log(i + " == " + rrr.length);
		if (rrr.length == 0) continue;
		
		var arg = $("#argentina-value", rrr.eq(0)).text().replace(".",",");
		console.log(arg);

		var can = $("#canada-value", rrr.eq(0)).text().replace(".",",");
		console.log(can);

		Murl = "https://script.google.com/macros/s/AKfycbz4a8NYE7Oyx2Qqhlv3jR5y2Bv9rt0ZqYTxabiAUOLjECXOE6c/exec?p1=" + arg+ "&p2=" + can ;
		$.get(Murl,function(data){		
			console.log(data);
		});
	}

});


console.log("start");

var container = $('#topblock').next();
container = $("li:last", container).prev().parent();
container.append(wc) ;

console.log("end");
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}

