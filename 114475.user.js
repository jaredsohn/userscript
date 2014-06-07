// ==UserScript==
// @name        Wadsworth Constant
// @namespace   Wadsworth Constant
// @include http*://*.youtube.com/*
// @include http*://www.youtube.com/*
// @include http*://youtube.com/*
// @author         Jake Lauer
// ==/UserScript==

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

	$('#watch-info, #playnav-video-panel-inner').before('<div id="wadsworth" style="display:inline-block; padding:10px; margin-bottom:10px; border:1px solid red; cursor:pointer;-moz-border-radius:5px;-webkit-border-radius:5px;background:#CCC;color:black;">Apply Wadsworth Constant</div>');

	if( !window.location.href.match("v=") && !window.location.href.match("#p") )
	{
		$('#wadsworth').remove();
	}
	
	
	$('#wadsworth').live('click', function(){
		var url;
		var isProfile;
		
		if( $('#playnav-video-panel-inner').length ) 
		{
			url = window.location.href;
			url = url.split("/");
			url = url[ url.length - 1 ];
			isProfile = true;
		}
		else
		{
			url = window.location.href;
			if( url.match("#") || url.match("&t") )
			{
				url = url.split("#")[0].split("&t")[0];
			}
			url = url.split("?")[1].split("&")[0].split("=")[1];
		}
		var saveURL = url;
		url = 'http://gdata.youtube.com/feeds/api/videos/'+url;
		var duration;
		if( url == "http://gdata.youtube.com/feeds/api/videos/" )
		{
			alert( "Something went wrong... dunno what it was. Sorry!" );
		}
		
		jQuery.ajax({
			 type: "GET",
			 url: url,
			 async:false,
			 dataType: "jsonp",
			 success: function(results){
					duration = parseInt( results.split( "duration seconds=\'")[1].split( "\'" )[0] );

					newTime = Math.ceil( duration * 0.3 );
					
					if( !isProfile )
					{
						if( window.location.href.match("#") )
						{
							window.location = ( window.location.href.split("#")[0] + "&t=" + newTime + "s");
						}
						else
						{
							window.location = ( window.location.href + "#t=" + newTime + "s");
						}
					}
					else
					{
							window.location = ( "http://www.youtube.com/watch?feature=player_profilepage&v=" + saveURL + "#t=" + newTime + "s");
					}
		
			 },
			 error: function(XMLHttpRequest, textStatus, errorThrown){
				  alert("Error");
			 }
		});
	});
	
}

// load jQuery and execute the main function
addJQuery(main);

