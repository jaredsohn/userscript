// ==UserScript==
// @id             mrtzcmp3.net-eb800b71-e1fb-4043-88c8-68f46089fd39@scriptish
// @name           MRTZC direct download links
// @version        1.2
// @include        http://mrtzcmp3.net/*
// @include        http://www.mrtzcmp3.net/*
// @downloadURL    https://userscripts.org/scripts/source/136617.user.js
// @updateURL      https://userscripts.org/scripts/source/136617.meta.js
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// ==/UserScript==

/*
	Chrome issue with loading jQuery
	http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey
*/
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//code.jquery.com/jquery-1.7.2.min.js", function() {
	/*
		start own code
	*/
	$('a[href^=L\\?]').each(function(){
		var that = $(this).parent();
		$.ajax({
			url: $(this).attr('href'),
			success: function(re) {
				var player = $(re).find("embed").get(0).outerHTML;
				var mp3 = player.match(/player\.swf\?audioUrl=(.+?)\"/);

				var new_html = player.replace("autoPlay=true", "")
					+ '<br><a href="' + mp3[1] + '">[Right click & Save as]</a>';
				$(that).html(new_html);	
			}
		});
	});
    
});
