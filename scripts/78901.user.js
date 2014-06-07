// ==UserScript==
// @name           NationStates Red+Green Forumbits
// @namespace      http://forum.nationstates.net/
// @description    Replaces the silver/green forumbits with red/green.
// @author         D. Henrich (Glen-Rhodes)
// @include        http://forum.nationstates.net/*
// @version        1.3
// ==/UserScript==
var BrowserDetect = {
    init: function ()
    {
        this.browser = this.searchString(this.dataBrowser) || "an unknown browser";
    },
    searchString: function (data)
    {
        for (var i=0;i<data.length;i++)
        {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString)
            {
                if (dataString.indexOf(data[i].subString) != -1)
                {
                    return data[i].identity;
                }
            }
            else if (dataProp)
            {
                return data[i].identity;
            }
        }
    },
    dataBrowser: [
    {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
    {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    },
    {
        prop: window.opera,
        identity: "Opera"
    },
    {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    },
    {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    },
    ]
};
BrowserDetect.init();

(function() {
	function getElementsByClass(searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
			node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
	function replaceImages() {
		var replacements = new Array();

		// Unread forumbits
		replacements['topic_unread_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_unread_mine.gif';
		replacements['topic_unread_locked_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_unread_locked_mine.gif';
		replacements['topic_unread_locked.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_unread_locked.gif';
		replacements['topic_unread_hot_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_unread_hot_mine.gif';
		replacements['topic_unread_hot.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_unread_hot.gif';
		replacements['topic_unread.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_unread.gif';
		replacements['sticky_unread_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_unread_mine.gif';
		replacements['sticky_unread_locked_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_unread_locked_mine.gif';
		replacements['sticky_unread_locked.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_unread_locked.gif';
		replacements['sticky_unread.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_unread.gif';
		replacements['forum_unread_locked.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/forum_unread_locked.gif';
		replacements['forum_unread.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/forum_unread.gif';

		// Read forumbits		
		replacements['topic_read_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_read_mine.gif';
		replacements['topic_read_locked_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_read_locked_mine.gif';
		replacements['topic_read_locked.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_read_locked.gif';
		replacements['topic_read_hot_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_read_hot_mine.gif';
		replacements['topic_read_hot.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_read_hot.gif';
		replacements['topic_read.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/topic_read.gif';
		replacements['sticky_read_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_read_mine.gif';
		replacements['sticky_read_locked_mine.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_read_locked_mine.gif';
		replacements['sticky_read_locked.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_read_locked.gif';
		replacements['sticky_read.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/sticky_read.gif';
		replacements['forum_read_locked.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/forum_read_locked.gif';
		replacements['forum_read.gif'] = 'http://i181.photobucket.com/albums/x318/dylanhenrich/forum_read.gif';
		
		var icons = getElementsByClass('icon');
		for(var i = 0; i < icons.length; i ++) {
			var bgImg = getComputedStyle(icons[i],null).backgroundImage;
			if(BrowserDetect.browser == "Firefox") {
				var bgImgStr = bgImg.substring(64, bgImg.length - 2);
				icons[i].setAttribute('style', 'background-image: url(' + replacements[bgImgStr] + ') !important;');
			}
			else
			{
				var bgImgStr = bgImg.substring(63, bgImg.length - 1);
				icons[i].style.backgroundImage = 'url(' + replacements[bgImgStr] + ') !important;';
			}
		}
	}
	replaceImages();
})();