// ==UserScript==
// @name           tumblr full auto photo asanusta link
// @description    Add link to the High resolution photos to tumblr dashboard and liked pages.
//                 When a server does not have an image,It is a small image.
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/likes*
// @include        http://www.tumblr.com/tumblelog/*
// @version        3.2
// @url            http://asanusta.tumblr.com
// ==/UserScript==

(function() {
    
    var dashboard = function() {
        var link_XPath = "//ol[@id='posts']/li[contains(@class, 'photo')]/a[contains(@class, 'permalink')]";
        
        var link_obj = $x(link_XPath);
        var thumb_obj = getThumbObj();
        var addlink_obj = getAddLinkObj();
        
        for(var i = 0, len = link_obj.length; i < len; i++) {
            var url = buildURL(link_obj[i].href, thumb_obj[i].src);
            addHighResLink(addlink_obj[i], url);
        }
    }

    function $x(xpath) {
        var nodes = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var data = [];
        for (var i = 0, len = nodes.snapshotLength; i < len; i++) {
            data.push(nodes.snapshotItem(i));
        }
        return data;
    }
    
    function buildURL(link, thumb) {
        var link_regexp = /(http:\/\/.+)\/post\/(\d+)\/?/;
        var thumb_regexp = /http:\/\/.+\.tumblr\.com\/(\w.+)\w{2}_\d{3}\./;
        var link_result = link_regexp.exec(link);
        var thumb_result = thumb_regexp.exec(thumb);
        var url = link_result[1] + "/photo/1280/" + link_result[2] + "/1/" + thumb_result[1];
        return url;
    }
    
    function addHighResLink(link, url) {
        if (link.firstChild.text == "full size photo Link") {
            return;
        }
        var HighResLink = document.createElement("a");
        HighResLink.setAttribute("href", url);
        
        var str = document.createTextNode("full size photo Link");
        HighResLink.appendChild(str);
        
        link.insertBefore(HighResLink, link.firstChild);
    }
    
    function getThumbObj() {
        var thumb_XPath = "//div[starts-with(@id, 'highres_photo_')]//img";
        var thumb_obj = $x(thumb_XPath);
        if (thumb_obj.length == 0) {
            var thumbfull_XPath = "//ol[@id='posts']/li[contains(@class, 'photo')]//img[@class='image']";
            thumb_obj = $x(thumbfull_XPath);
        }
        return thumb_obj;
    }
    
    function getAddLinkObj() {
        var addlink_XPath = "//div[starts-with(@id, 'highres_photo_')]/../div[@class='post_controls']";
        var addlink_obj = $x(addlink_XPath);
        if (addlink_obj.length == 0) {
            var addlinkfull_XPath = "//ol[@id='posts']/li[contains(@class, 'photo')]/div[@class='post_controls']";
            addlink_obj = $x(addlinkfull_XPath);
        }
        return addlink_obj;
    }
    
    dashboard();
    
    // AutoPagerize関連
    setTimeout(function(){
        if (window.AutoPagerize && window.AutoPagerize.addFilter){
            window.AutoPagerize.addFilter(dashboard);
        }
    },0);
    
})();