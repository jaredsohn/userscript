/*
Greasemonkey helper for WhatToGive
(c)WhatToGive.com 2005

Please send comments and questions to feedback@whattogive.com
*/

// ==UserScript==
// @name          WhatToGive Helper
// @namespace     http://whattogive.com/
// @description   Adds a button when viewing items on a variety of sites so that you can quickly and easily add the item to your WhatToGive.com gift list
// @include       http://www.amazon.co.uk/*ASIN*
// @include       http://www.amazon.com/*ASIN*
// @include       http://amazon.co.uk/*ASIN*
// @include       http://amazon.com/*ASIN*
// @include       http://cgi.ebay.com/*
// @include       http://cgi.ebay.co.uk/*
// @include       http://argos.co.uk/*Product*
// @include       http://www.argos.co.uk/*Product*
// @include       http://order.next.co.uk/shot*
// @include       http://www.nextflowers.co.uk/item*
// @include       http://www.marksandspencer.com/*Product*
// ==/UserScript==

(function() {
    var wtg_button = {
    	link: '',
    	image: '',
    	
        render: function() {
            var link = document.createElement('A');
            link.style.position = 'absolute';
            link.style.top = '0';
            link.style.right = '0';
            link.id='wtg_button';
            link.style.color = '#FFF';
            link.style.margin = '1px';
            link.style.padding = '1px 1px';
            link.style.border = '0px';
            link.onclick = this.add_item;
            link.target = '_new';
            link.href="http://www.whattogive.com/api/item_add.php?user_id=&method=greasemonkey&version=1&from="+document.location.href;
            var image = document.createElement('img');
			image.title = 'Click to add this item to your WhatToGive list';
            image.width = 23;
            image.height = 23;
            image.style.border = '1px solid #763';
            image.style.border = 6;
            image.alt = 'Add item to your WhatToGive list';
            image.src = 'data:image/bmp;base64,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\
';
            link.appendChild(image);
            this.link = link;
            this.image = image;
            body = document.getElementsByTagName("body")[0];
            body.insertBefore(link, body.firstChild);
            return link;
        }

        ,add_item: function() {
            title = window.prompt('Please enter a title for this item on your WhatToGive list.\n (Leave title blank to cancel operation and hide icon)',document.title,'Adding Item To WhatToGive');
            if (title) {
                add_url = "http://www.whattogive.com/api/item_add.php?user_id=&title="+title+"&method=greasemonkey&version=1&from="+document.location.href;
                GM_xmlhttpRequest({
                    method:"GET",
                    url:add_url,
                    onload:function(details) {
                        response = details.responseText;
                        window.alert(response);
                    }
                });
			}
			// now hide the button
			wtg_button.link.style.display='none';
            return false;
        }

    }   
    wtg_button.render();

})();
