// ==UserScript==
// @name 		dxyey
// 
// @description	A javascript snippet to help you upload online.
// 

// ==/UserScript==

function withjQuery(callback, safe){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js";
		
		if(safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery);";
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		}
		else {
			var dollar = undefined;
			if(typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery);
			});
		}
		document.head.appendChild(script);
	} else {
		callback(jQuery);
	}
}

withjQuery(function($){
	jQuery("input[name=name]").val('123');
	jQuery("input[val='女']").attr("checked","checked");
	jQuery("input[name=birthday]").val('1989-02-04');
	jQuery("input[name=classroom]").val('小班');
	jQuery("input[name=sfzh]").val('小班');
	jQuery("input[name=hj]").val('非农业');
	jQuery("input[name=entersort]").val('新生');
	jQuery("input[name=shuttle]").val('待定');
	jQuery("input[name=fatherName]").val('小班');
	jQuery("input[name=fatherMob]").val('小班');
	jQuery("input[name=father]").val('小班');
	jQuery("input[name=motherName]").val('小班');
	jQuery("input[name=motherMob]").val('小班');
	jQuery("input[name=mother]").val('小班');
	jQuery("input[name=address]").val('小班');
	jQuery("input[name=father]").val('小班');
	jQuery("input[name=father]").val('小班');
	jQuery("input[name=father]").val('小班');
}, true);