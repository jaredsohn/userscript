// ==UserScript==
// @name            Wikipedia TeX Source Extractor
// @namespace       http://giu.me
// @description     Allows you to extract the TeX source from an image of a formula on Wikipedia. Just click on the desired formula and you're good to go.
// @version			1.0
// @include			*.wikipedia.org/w*
// @include			*.wikibooks.org/w*
// ==/UserScript==

//A thanks for this snippet goes to tghw:
//http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function addExtractor(){
	var counter = 0;
	$("img.tex").click(function(){
		var $t = $(this);
		if(!$t.parent("span").find("#wte_close").length){
			$t.wrap("<span></span>");
			$t.parent().append("<input id='wte_texsource_"+counter+"' style='width:250px;padding:5px;border:2px solid #ccc;font: monospace;margin-left:10px;' type='text' /> <a style='margin-right:10px;color:red !important;font-weight:bold;' href='javascript:void(0);' id='wte_close'>x</a>");
			$("#wte_texsource_"+counter).val($t.attr("alt")).focus().select();
			counter++;
		}
	});

	$("[id^=wte_t]").live("click", function(){
		$(this).focus().select();
	});

	$("#wte_close").live("click", function(){
		var $t = $(this);
		$t.prev().remove();
		$t.remove();
	});
}


addJQuery(addExtractor);