// ==UserScript==
// @name           Semantic Youtube Links
// @namespace      http://pmav.eu/stuff/semantic-youtube-links
// @description    Create a new link for each YouTube video by appending the title to the URL.
// @include        http://*.youtube.com/watch*
// @version        1.2.6
// @author         pmav
// @homepage       http://pmav.eu
// ==/UserScript==

(function() {

    var SemanticYoutubeLinks = {


        /**
         * Get video title in a URL-compatible format.
         *
         * @return URL-compatible video title.
         */
        getVideoTitle : function()
        {
            var title = document.title;

            return this.cleanVideoTitle(title);
        },


        /**
         * Clean the title of the video.
         *
         * @return Cleaned video title.
         */
        cleanVideoTitle : function(title)
        {	
            var i, j;
            var newTitle = "";
            var charCode = "";
            var inivisibleCharFound = false;
	  
            var invalidChars = '=,;:()[]\"\'ºª|';
            var cleanChars = '.';
            var invisibleChars = ['\\u202A', '\\u202C', '\\u200F'];
	  
            title = title.replace(' - YouTube', '');
	  
            for (i = 0; i < title.length; i++)
            {
                inivisibleCharFound = false;
	  
                charCode = this.unicodeValue(title[i]);
	  
                for (j = 0; j < invisibleChars.length; j++)
                {
                    if (charCode === invisibleChars[j])
                    {
                        inivisibleCharFound = true;
                        break;
                    }
                }
		
                if (!inivisibleCharFound)
                {
                    if ((invalidChars.indexOf(title.charAt(i)) === -1) && (title.charCodeAt(i) < 55204)) // http://czyborra.com/unicode/characters.html
                    {
                        newTitle += title.charAt(i);
                    }
                    else if (cleanChars.indexOf(title.charAt(i)) !== -1)
                    {
                        newTitle += '.';
                    }
                }
            }
	  
            if (newTitle != '')
            {
                title = newTitle;
            }
			
            title = title.toLowerCase();
            title = title.replace(/[ .\\//]/g, '-');
            title = title.replace(/--*/g,  '-');
            title = title.replace(/--*$/g, '');

            var temp = '';
            while (temp !== title) {
                temp = title;
                title = title.replace(/!!*$/g, '');
                title = title.replace(/\?\?*$/g, '');
            }

            title = title.replace(/[áàãâ]/gi, 'a');
            title = title.replace(/[éèê]/gi,  'e');
            title = title.replace(/[íìî]/gi,  'i');
            title = title.replace(/[óòôõ]/gi, 'o');
            title = title.replace(/[úùü]/gi,  'u');
            title = title.replace(/[ç]/gi,    'c');

            return title;
        },

	
        /**
         * Returns the Unicode value from the given character.
         * Check: http://buildingonmud.blogspot.com/2009/06/convert-string-to-unicode-in-javascript.html
         *
         * @return Unicode value (\uXXXX).
         */
        unicodeValue : function(character)
        {
            if (character.length != 1)
            {
                throw 'Invalid argument length: '+character.length+', excepted: 1.';
            }
	
            var code = character.charCodeAt(0).toString(16).toUpperCase();

            while (code.length < 4)
            {
                code = '0' + code;
            }

            return '\\u' + code;
        },
	

        /**
         * Check if the URL contains the title.
         *
         * @return True if the URL contains the title, false otherwise.
         */
        titleInUrl : function(videoTitle)
        {
            var url = "" + window.location;

            if (url.indexOf(videoTitle) !== -1)
            {
                return true;
            }

            return false;
        },


        /**
         * Entry point: create the new link and add it to the DOM.
         */
        init : function()
        {
            var videoTitle;

            try
            {
                videoTitle = this.getVideoTitle(); // Transforms video title in a usable string.

                if (!this.titleInUrl(videoTitle)) // If the title is not in the URL.
                {
                    window.location += '#' + videoTitle; // Append the title to the URL.
                }
            }
            catch(error)
            {
            }
        }
    };

    SemanticYoutubeLinks.init();

})();