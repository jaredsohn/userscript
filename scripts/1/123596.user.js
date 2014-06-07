// ==UserScript==
// @name			League of Legeneds Anti-Redirect Confirm (jQuery injected)
// @description			Removes Redirect Confirm from League of Legends URLs
// @namespace			http://userscripts.org/users/viemmsakh
// @author			viemmsakh
// @include			*.leagueoflegends.com/board/showthread.php*
// @version			3.1.1
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
	// Hide Current
	
    $(document).ready( function() {
       	try{
			// Redirect Remover	
			$('a[href*="redirect_url"]').each(function() {
				var href = $(this).attr("href")
				var value = $(this).text();
    			var newlink = href.substring((href.indexOf("redirect_url=") + 13));
    			$(this).replaceWith('<a href="' + decodeURIComponent(newlink) + '">' + value + '</a>')
			});
			
			// Image De-Attach-A-Mogrifier
			$('a[id*="attachment"]').each(function() {
				var imgSrc = $(this).attr("href");
				
				var img = new Image();
					img.onload = function() {
  						//alert(this.width + 'x' + this.height);
					}
					
				if($(this).find('img')) {
					img.src = imgSrc;
					if (img.width > 400) {
            			$(this).replaceWith('<a href="' + imgSrc + '"><img src="' + imgSrc + '" width="400"></a>');
        			} else {
        				$(this).replaceWith('<a href="' + imgSrc + '"><img src="' + imgSrc + '"></a>');
        			}
        		}
        		$('.newImg').css('max-width','400 !important').css('width','expression(this.width > 400 ? "400px" : true) !important').css('z-index','1000');
			});
		} catch (err) {
			alert(err);
		}

    });
}

// load jQuery and execute the main function
addJQuery(main);

