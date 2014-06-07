// ==UserScript==
// @name            Amazon.*: XML Feeds
// @namespace       http://docs.g-blog.net/code/greasemonkey
// @description     2005-04-22: Adds links to Amazon RSS feeds (provided by Watchcow.net) to applicable Amazon.* pages (products, wishlists).
// @include         http://www.amazon.*
// @include         http://amazon.*
// ==/UserScript==

(function() {
    var WatchcowXMLButtons =
    {
        go: function()
        {
            url = document.location.href;

            if (!this.isValidAmazonURL(url)) return;
            // alert(url);

            // Add feed references
            head = document.getElementsByTagName("head")[0];
            head.appendChild(this.getLinkElement(url, "new"));
            head.appendChild(this.getLinkElement(url, "used"));
            head.appendChild(this.getLinkElement(url, "full"));

            // Add XML buttons
            pageType = this.getAmazonPageType(url);
            tld = this.getAmazonTLD(url);

            if (pageType == "asin")
            {
                id = this.getISBNorASIN(url);
                feedType = "items";
            }
            else if (pageType == "wishlist")
            {
                id = this.getWishlistID(url);
                feedType = "wishlists";
            }

            div = document.createElement("div");
            div.setAttribute("id", "watchcowNetXmlButtons");
            div.style.textAlign = "right";
            div.style.margin = "0px";
            div.style.padding = "3px 0px 8px 3px";

            body = document.getElementsByTagName("body")[0];
            body.insertBefore(div, body.firstChild);

            div = document.getElementById("watchcowNetXmlButtons");

            a1 = document.createElement("a");
            a1.href = "http://www.watchcow.net/";

            button = document.createElement("img");
            button.src = "http://www.watchcow.net/img/ext_feeds_provided_by_watchcownet.gif";
            button.style.width = "200px";
            button.style.height = "15px";
            button.style.border = "0px";
            button.style.margin = "0px";
            button.style.padding = "0px 0px 0px 5px";

            a1.appendChild(button);
            div.appendChild(a1);

            a2 = document.createElement("a");
            a2.href = "http://www.watchcow.net/feeds/" + feedType + "/" + tld + "/" + id + "-new.xml";

            button = document.createElement("img");
            button.src = "http://www.watchcow.net/img/ext_new_prices.gif";
            button.style.width = "86px";
            button.style.height = "15px";
            button.style.border = "0px";
            button.style.margin = "0px";
            button.style.padding = "0px 0px 0px 5px";

            a2.appendChild(button);
            div.appendChild(a2);

            a3 = document.createElement("a");
            a3.href = "http://www.watchcow.net/feeds/" + feedType + "/" + tld + "/" + id + "-used.xml";

            button = document.createElement("img");
            button.src = "http://www.watchcow.net/img/ext_used_prices.gif";
            button.style.width = "90px";
            button.style.height = "15px";
            button.style.border = "0px";
            button.style.margin = "0px";
            button.style.padding = "0px 0px 0px 5px";

            a3.appendChild(button);
            div.appendChild(a3);

            a4 = document.createElement("a");
            a4.href = "http://www.watchcow.net/feeds/" + feedType + "/" + tld + "/" + id + "-full.xml";

            button = document.createElement("img");
            button.src = "http://www.watchcow.net/img/ext_combined_prices.gif";
            button.style.width = "163px";
            button.style.height = "15px";
            button.style.border = "0px";
            button.style.margin = "0px";
            button.style.padding = "0px 0px 0px 5px";

            a4.appendChild(button);
            div.appendChild(a4);
        },



        getISBNorASIN: function(href)
        {
            isbn = href.match(/\/([0-9A-Z]{10})(\/|\?|$)/);
            return isbn ? isbn[1] : null;
        },



        getWishlistID: function(href)
        {
            wishlistID = href.match(/(\/|\?|=)([0-9A-Z]{12,13})(\/|$)/);
            if (wishlistID)
            {
                return wishlistID[2];
            }

            aList = document.getElementsByTagName("a");
            for (a = 0; a < aList.length; a++)
            {
                if (aList[a].href.match(/(registry.+id=|share-registry.+wishlist)/i))
                {
                    wishlistID = aList[a].href.match(/(\/|\?|=)([0-9A-Z]{12,13})(\/|$)/);
                    if (wishlistID)
                    {
                        return wishlistID[2];
                    }
                }
            }

            return false;
        },



        getAmazonTLD: function(href)
        {
            amazonTLD = this.getServerName(href).match(/amazon\.(com|co\.uk|de)/i);
            return amazonTLD ? amazonTLD[1] : null;
        },



        getAmazonPageType: function(href)
        {
            asin = this.getISBNorASIN(href);
            if (asin)
            {
                return "asin";
            }

            if (href.match(/(registry|wishlist)/i))
            {
                return "wishlist";
            }

            return false;
        },



        isValidAmazonURL: function(href)
        {
            return (this.getAmazonTLD(href) && !href.match(/(jpg|gif|png|js)$/i) && !href.match(/(associate|partner|rate-this-)/i)) ? true : false;
        },



        getServerName: function(href)
        {
            serverName = href.match(/http(?:s)?:\/\/[^\/]+/i);
            return serverName ? serverName[0].toLowerCase() : href;
        },



        getLinkElement: function(href, price)
        {
            pageType = this.getAmazonPageType(href);
            id = "watchcow-feed-" + price;

            if (!pageType || document.getElementById(id))
            {
                return null;
            }

            link = document.createElement("link");
            link.setAttribute("rel", "alternate");
            link.setAttribute("type", "application/atom+xml");

            if (pageType == "asin")
            {
                link.setAttribute("href", "http://www.watchcow.net/feeds/items/" + this.getAmazonTLD(href) + "/" + this.getISBNorASIN(href) + "-" + price + ".xml");
                type = "Item";
            }
            else if (pageType == "wishlist")
            {
                link.setAttribute("href", "http://www.watchcow.net/feeds/wishlists/" + this.getAmazonTLD(href) + "/" + this.getWishlistID(href) + "-" + price + ".xml");
                type = "Wishlist";
            }

            if (price == "new")
            {
                link.setAttribute("title", "Watchcow.net " + type + " Price Watch Feed for new (un-used) price(s)");
            }
            else if (price == "used")
            {
                link.setAttribute("title", "Watchcow.net " + type + " Price Watch Feed for used price(s)");
            }
            else
            {
                link.setAttribute("title", "Watchcow.net " + type + " Price Watch Feed for both new and used price(s)");
            }

            link.setAttribute("id", id);

            return link;
        }
    }

    WatchcowXMLButtons.go();

})();
