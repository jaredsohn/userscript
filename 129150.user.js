// ==UserScript==
// @name           Insta Record - Sonera IPTV
// @namespace      www.vel.lu/userscripts/
// @description    One click record for Sonera IPTV web interface.
// @include        https://www4.sonera.fi/OmatSivut/Apps/Iptv/*
// @match          https://www4.sonera.fi/OmatSivut/Apps/Iptv/*
// @version        1.1
// ==/UserScript==


var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", function() {
    jQuery(".none").each(function (i) {
			var recordId = jQuery(this).attr("href");
			jQuery(this).removeAttr("href");
			jQuery(this).removeAttr("onClick");

			var parsed = recordId.replace(/\D/g,'');

			jQuery(this).click(function(){
                                var target = jQuery(this);
				jQuery.ajax({
				    type: 'GET',
				    url: "index.jsp",
				    data: {m: "Dialog", name: "Api", action: "record", storage: "network", program: parsed},
				    success: function(data){
                                       jQuery(target).removeClass("none");
				       jQuery(target).addClass("network");
                                       document.body.style.cursor = 'default';
				    }, 
				        dataType: 'json'
				  });
                                document.body.style.cursor = 'wait';
								  				
			});

		});

		jQuery(".value").children("a").each(function (i) {
			if ( jQuery.trim( jQuery(this).text() ) == "Tallenna" ) {
				var recordId = jQuery(this).attr("href");
				jQuery(this).removeAttr("href");
				jQuery(this).removeAttr("onClick");

				var parsed = recordId.replace(/\D/g,'');

				jQuery(this).click(function(){
                                        var target = jQuery(this);
					jQuery.ajax({
					    type: 'GET',
					    url: "index.jsp",
					    data: {m: "Dialog", name: "Api", action: "record", storage: "network", program: parsed},
					    success: function(data){
                                               jQuery(target).text("Tallennettu");
                                               document.body.style.cursor = 'default';
					    }, 
					        dataType: 'json'
					  });
                                        document.body.style.cursor = 'wait'; 
					console.log("Program is being recorded.");
								  				
				});
				}
		});		
});