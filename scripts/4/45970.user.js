// ==UserScript==
// @name           RealTimeGoogle
// @namespace      gkoehler
// @description    Integrates Twitter results on Google search pages
// @include        http://www.google.*/search?*
// ==/UserScript==
(function() {
 
    var nMaxTweets = 4;    	// change this to display more/less tweets, up to 15
	var sQuery;				// the query the user is searching for
	
    // load jQuery for easy ajax and dom helpers
    var oScriptTag = document.createElement('script');
    oScriptTag.src = 'http://jquery.com/src/jquery-latest.js';
    oScriptTag.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(oScriptTag);

    // Check if jQuery's loaded
    function fcnScriptWait()
    {
        if (typeof unsafeWindow.jQuery == 'undefined')
        {
            window.setTimeout(fcnScriptWait, 100);
        }
        else {
            $ = unsafeWindow.jQuery;
            fcnScriptReady();
        }

    }
    fcnScriptWait();

    function fcnScriptReady()
    {
    	sQuery = $('#bsf input').val(); 
		
		if($('#liTwitterResults').length==0 && sQuery.length > 0) // make sure this isn't called 2x
		{
			// load the jsonp from twitter's API
			$.ajax({
	            url: 'http://search.twitter.com/search.json',
	            data: {
	                q: sQuery
	            },
	            cache: false,
	            dataType: 'jsonp',
	            success: fcnReceiveTwitterResults
	        });
		}
    }
	
	// insert the results into Google's search results
	function fcnReceiveTwitterResults(oData)
    {
		var oContainer = $('<li id="liTwitterResults" class="g"></li>');
        $(oContainer).append('<h3 class="r"><a href="http://search.twitter.com/search?q=' + encodeURIComponent(sQuery) + '">Twitter results for <em>' + sQuery + '</em></a></h3>');
        $(oContainer).append('<div id="tRes"></div>');

        var oTweetItem;
        var nIndx = 0;
        $.each(oData.results, function() {
            nIndx++;
            if (nIndx > nMaxTweets)
            {
                return;
            }
            oTweetItem = $('<div style="border-bottom:1px dashed #ccc;padding-bottom:2px;"></div>');
            $(oTweetItem).append('<table class="ts"><tr><td valign="top" style="padding-top:5px;padding-right:10px;font-size:78%;line-height:normal;width:40px;text-align:center">'
            + '<a href="http://twitter.com/' + this.from_user + '"><img style="border:none;" src="' + this.profile_image_url + '" height="30" alt="" /></a>'
            + '</td><td class="tResItem" valign="top" style="padding-top:3px"></td></tr></table>');

            $('.tResItem', oTweetItem).append('"' + fcnAddLinks(this.text) + '"');

            $('.tResItem', oTweetItem).append(' <nobr><span class="f"></span></nobr>');

            $('.tResItem .f', oTweetItem)
            .append(
                $('<a></a>')
                .css('color', '#676767')
                .attr('href', 'http://twitter.com/' + this.from_user + '/status/' + this.id)
                .text(fcnFormatTime(this.created_at))
            );

            $('.tResItem .f', oTweetItem).append(' from ');

            $('.tResItem .f', oTweetItem)
            .append(
				$('<a></a>')
                .css('color', '#676767')
                .attr('href', 'http://twitter.com/' + this.from_user)
            	.text(this.from_user)
            );

            $('#tRes', oContainer).append(oTweetItem);

        });

		if(nIndx > 0) // only add results if there are some
		{
			$('#res ol:first').prepend(oContainer);
		}

    }
	
	// Adds <a> tags around links so they can be clicked on
	function fcnAddLinks(sText)
	{
		// regex lifted from http://snippets.dzone.com/posts/show/6995
		return sText.replace(/((http\:\/\/|https\:\/\/|ftp\:\/\/)|(www\.))+(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, 
			function(sValue)
			{
				return '<a href="' + sValue + '">' + sValue + '</a>';
			}
		);
	}

	// translates something like "Sun, 05 Apr 2009 03:11:25 +0000" to something like "45 seconds ago"
	function fcnFormatTime(sTime)
	{
		var sOut = '';
		var nMSDiff = ((new Date()).getTime() - (new Date(sTime)).getTime());
		$.each({
			"day":(1000 * 60 * 60 * 24),
			"hour":(1000 * 60 * 60),
			"minute":(1000 * 60),
			"second":1000}, function(sLabel, nValue){
				if(sOut == '')
				{
					if(nMSDiff > (1.5 * nValue))
					{
						sOut = Math.floor(nMSDiff / nValue) + " " + sLabel + "s ago";
					}
					else if(nMSDiff > nValue)
					{
						sOut = "1 " + sLabel + " ago";
					}
				}
			});
		return sOut;
	}

})()