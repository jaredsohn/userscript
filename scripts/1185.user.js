// ==UserScript==
// @name          NPR Embedded
// @namespace     http://home.kc.rr.com/bmciver
// @description   Embeds Realplayer to play NPR stories without opening standalone Realplayer
// @include       http://npr.org/*
// @include       http://www.npr.org/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

(function()
{
    var NPREmbed =
    {
        addAttribute : function(param,val)
        {
            var p = document.createAttribute(param);
            p.value = val;
            return p;
        },

        placeMedia : function(clipInfo,loc,cont,wide,high,nobreak)
        {
            addAtr = NPREmbed.addAttribute;
            var newElement = document.createElement('embed');
            attrib = addAtr('controls',cont);
            newElement.setAttributeNode(attrib);
            attrib = addAtr('src',clipInfo);
            newElement.setAttributeNode(attrib);
            attrib = addAtr('width',wide);
            newElement.setAttributeNode(attrib);
            attrib = addAtr('height',high);
            newElement.setAttributeNode(attrib);
            attrib = addAtr('type','audio/x-pn-realaudio-plugin');
            newElement.setAttributeNode(attrib);
            if (nobreak == 1)
            {
                loc.parentNode.insertBefore(newElement, loc);
            }
            else
            {
                var newBR = document.createElement('br');
                loc.parentNode.insertBefore(newBR, loc);
                newBR.parentNode.insertBefore(newElement, newBR);
            }
            loc.parentNode.removeChild(loc);
        },

        replaceGetMedia : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getMedia")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                var tmpString = thisLink.href;
                var tmpArr = new Array();
                tmpArr = tmpString.split("'");
                tmpString = 'http://www.npr.org/dmg/dmg.php?prgCode=' + tmpArr[1] +
                  '&showDate=' + tmpArr[3] + '&segNum=' + tmpArr[5] +
                  '&mediaPref=RM';
                media = NPREmbed.placeMedia;
                media(tmpString,thisLink,'controlpanel','220','25');
            }
        },

        replaceGetStaticMedia : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getStaticMedia")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                var tmpString = thisLink.href;
                var tmpArr = new Array();
                tmpArr = tmpString.split("'");
                tmpString = 'http://www.npr.org/dmg/dmg.php?mediaURL=' + tmpArr[1] + '&mediaType=RM';
                thisLink.href = tmpString;
            }
        },

        replaceGetTopicMedia : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getTopicMedia")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                var tmpString = thisLink.href;
                var tmpArr = new Array();
                tmpArr = tmpString.split("'");
                tmpString = 'http://www.npr.org/dmg/dmg.php?topicId=' + tmpArr[1] +
                  '&topicName=' + tmpArr[3] + '&mediaPref=RM';
                thisLink.href = tmpString;
            }
        },

        replaceGetLatestShow : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getLatestShow")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                var tmpString = thisLink.href;
                var tmpArr = new Array();
                tmpArr = tmpString.split("'");
                tmpString = 'http://www.npr.org/dmg/dmg.php?getLatestShow=true&prgCode=' + tmpArr[1] +
                  '&NPRMediaPref=RM';
                media = NPREmbed.placeMedia;
                media(tmpString,thisLink,'playbutton','20','20');
            }
        },

        replaceGetFeaturedAudio : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getFeaturedAudio")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                var tmpString = thisLink.href;
                var tmpArr = new Array();
                tmpArr = tmpString.split("'");
                tmpString = tmpArr[1] + '&NPRMediaPref=RM';
                media = NPREmbed.placeMedia;
                media(tmpString,thisLink,'controlpanel','220','25');
            }
        },

        replaceGetProgramStream : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getProgramStream()")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                thisLink.href = 'http://www.npr.org/dmg/dmg.php?getProgramStream=true';
            }
        },

        replaceGetNewsCast : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getNewsCast()")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                thisLink.href = 'http://www.npr.org/dmg/dmg.php?getNewsCast=true';
            }
        },

        replaceGetMusicButton : function()
        {
            var jsLinks = document.evaluate('//a[starts-with(@href, "javascript:getMusicButton")]',
                            document,
                            null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                            null);
            for (var i = 0; i < jsLinks.snapshotLength; i++)
            {
                var thisLink = jsLinks.snapshotItem(i);
                var tmpString = thisLink.href;
                var tmpArr = new Array();
                tmpArr = tmpString.split("'");
                tmpString = 'http://www.npr.org/dmg/dmg.php?getMusicButton=true&songId=' + tmpArr[1] +
                  '&musicAudioFileName=' + tmpArr[3] + '&prgCode=' + tmpArr[5] +
                  '&NPRMediaPref=RM';
                thisLink.href = tmpString;
            }
        },

        init : function()
        {
            NPREmbed.replaceGetMedia();
            NPREmbed.replaceGetStaticMedia();
            NPREmbed.replaceGetNewsCast();
            NPREmbed.replaceGetMusicButton();
            NPREmbed.replaceGetProgramStream();
            NPREmbed.replaceGetFeaturedAudio();
            NPREmbed.replaceGetLatestShow();
            NPREmbed.replaceGetTopicMedia();
        }
    };

    NPREmbed.init();

})();