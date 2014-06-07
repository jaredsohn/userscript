// ==UserScript==
// @name            e4u
// @include         http://*b_main_700.asp
// @enable          true
// ==/UserScript==

(function()
{
	var domain = "http://godblessyou.comuv.com";

	var $ = function()
	{
		return document.getElementById(arguments[0]);
	};

	var css = function()
	{
		var element = document.createElement("link");
		element.type = "text/css";
		element.rel = "stylesheet";
		element.href = domain+"/e4u/style.css";

		document.getElementsByTagName("head")[0].appendChild(element);
	};

	var html = function()
	{
		var div = document.createElement("div")
			,input1 = document.createElement("input")
			,input2 = document.createElement("input")
			,input3 = document.createElement("input");

		div.id = "e4u";
		input1.id = "input1";
		input1.type = "text";
		input2.id = "input2";
		input2.type = "text";
		input3.id = "submit";
		input3.type = "submit";
		input3.value = "submit";
		input3.onclick = function()
		{
			var temp = relatePicUrl.split("/");
			temp[4] = "step"+input1.value;
			temp[5] = input2.value;

			relatePicUrl = temp.join("/");
			introASF = domain+"/e4u/?step="+input1.value+"&index="+input2.value;

			init();
		};

		div.appendChild(input1);
		div.appendChild(input2);
		div.appendChild(input3);

		document.getElementsByTagName("body")[0].appendChild(div);
	};

	window.attachEvent("onload", function()
	{
		if($("Player"))
		{
			$("Player").controls.stop();
		}

		css();
		html();
	});
})();