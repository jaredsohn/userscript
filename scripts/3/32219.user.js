// ==UserScript==
// @name           PopTip
// @namespace      http://www.madin.jp/
// @description    Add pop-up preview to any site.
// @include        http://*
// @include        https://*
// @author         Maripo GODA http://www.madin.jp/
// ==/UserScript==
// SITEINFO database
// http://wedata.net/databases/PopTip%20SITEINFO/items
//
// Referred AutoPagerie http://swdyh.infogami.com/autopagerize
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

/*

20080818 0.0.1
20080820 0.0.5 "disabled" option
20080822 0.0.6 Add icon (thanks to hao_yayoi http://d.hatena.ne.jp/hao_yayoi/20080822)
               "stripe" option
               Change "linkReplaceRule" option (function -> regular expression)
20080824 0.0.7 Fix in position adjustment logic
               Add 2 rules to SITEINFO (Slashdot.jp, Flickr, Awasete-yomitai)
               Fix icon style (remove border)
20080824 0.0.8 Bug fix in position adjustment logic
               Add 2 rules to SITEINFO (Slashdot.org, YouTube in Hatena Bookmark)
20080824 0.0.9 "excludeUrl" option
               Add 2 rules to SITEINFO (Yahoo! Chiebukuro, Hatena Keyword)
20080824 0.0.10 Error handling (HTTP error / HTML node error)
               Add a rule (Tabelog)
20080824 0.1.0 XSLT option for popup area
20080907 0.1.1 Bug fix in position adjustment logic
               Encoding option
               Enable multiple "linkElement" / "targetElement" option as array format
               add some rules (Wikimedia commons / Wikipedia / Hatena Bookmark / Google related search / Goo dictionary)
20090403 0.1.2 Bug fix in position adjustment logic
               add some rules (kakaku.com / Crossreview / cookpad / 2ch)


== TODO ==
+ Write some XSLT examples
+ Change the icon to smaller one
+ Re-create as a Firefox extension

*/

var VERSION = '0.1.1';
var DEFAULT_DELAY_MSEC = 400;
var HIDE_DELAY_MSEC = 400;
var DEBUG_MODE = false;
var ERROR_MESSAGE_POPUP_ELEMENT_EMPTY = 'Error : No such node';
var ERROR_MESSAGE_HTTP = 'HTTP Error';

// == IMAGE ==
var IMAGE_INFOBOX = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACQSURBVHjaYvz//z/DpdsM/99+ZGC49oCB'+
    'ITuEgREggBi3Hf3/n5uTgeHFWwaGQ+cZGG6cX8sAEEAsl+4wMPz9x8Bw7ylQ4NQMhie3dzIABBDL'+
    '2Qu3GV4/PcPw5NY2hq+fgDJAABBAjCAzpZSd/jNAwbO7+xgBAggsiA4AAgirIEAAYRUECCCsggAB'+
    'hFUQIMAABUM9tTVTQ6QAAAAASUVORK5CYII=';

// == SITEINFO begin ==

var SITEINFO = [
    {
        url: '^http://mixi\\.jp/',
        linkElement: 'id("mymixiList")//td/a',
        popupElement: 'id("profile")',
        disabled: false,
        style: {
            backgroundColor: 'white',
            border: '1px solid orange'
        }
    },
    {
        url: '^http://mixi\\.jp/',
        targetElement: 'id("myProfile")//div[@class="contents01"]/img',
        linkElement: 'id("myProfile")//div[@class="contents03"]//a',
        popupElement: 'id("editPhotoArea")',
        disabled: false,
        style: {
            backgroundColor: 'white',
            border: '1px solid orange'
        }
    },
    {
        description: 'mixi community recent topics',
        url: '^http://mixi\\.jp/',
        linkElement: 'id("communityList")//td/a',
        popupElement: 'id("newCommunityTopic")//dl',
        style: {
            backgroundColor: 'white',
            border: '1px solid orange',
            padding: '8px'
        },
        containerHTML: '<h2>Recent Topics</h2><popup:container/>'
    },
    {
        description: 'mixi diary',
        url: '^http://mixi\\.jp/new_friend_diary\\.pl',
        linkElement: '//ul[@class="entryList01"]//dl/dd/a',
        popupElement: 'id("diary_body")',
        style: {
            backgroundColor: 'white',
            border: '1px solid orange',
            padding: '8px'
        },
        containerHTML: '<h2>Recent Topics</h2><popup:container/>'
    },
    {
        description: 'mixi footprint',
        url: '^http://mixi\\.jp/show_log\\.pl',
        linkElement: 'id("log_color")/ul/li/a',
        popupElement: 'id("profile")',
        style: {
                border: "1px solid gray",
                width: "400px"
        }
    },
    {
        url: '^http://(?:www\\.)?flickr\\.com/',
        linkElement: '//span[@class="photo_container pc_s"]/a',
        popupElement: '//div[@class="photoImgDiv"]//img',
        style: {
            padding: '0px'
        }
    },
    {
        descript: 'Flickr Exif info',
        url: '^http://(?:www\\.)?flickr\\.com/',
        linkElement: '//li[@class="Stats"]/a[.="More properties"]',
        popupElement: 'id("GoodStuff")',
        stripe: true,
        style: {
            backgroundColor: 'white',
            padding: '4px;',
            margin: '4px;',
            border: '1px solid #444'
        }
    },
    {
        url: '^http://(?:www\\.)?flickr\\.com/',
        linkElement: '//span[@class="photo_container pc_s"]/a',
        popupElement: '//div[@class="photoImgDiv"]//img',
        style: {
            backgroundColor: 'white'
        }
    },
    {
        description: 'Awasete-Yomitai more info',
        url: '^http://awasete\\.com/show\\.phtml\\?u=',
        exampleUrl: 'http://awasete.com/show.phtml?u=http%3A%2F%2Fwww.madin.jp%2Fdiary%2F',
        linkElement: '//div[@class="inner"]/ul/li/nobr/a',
        popupElement: '//div[@class="inner"]/ul',
        stripe: true,
        style: {
            fontSize: '80%',
            textAlign: 'left',
            padding: '4px;',
            margin: '4px;',
            border: '1px solid #444'
        }
    },
    {
        description: 'Hatena Bookmark',
        url: '^http://b\\.hatena\\.ne\\.jp/',
        linkElement: '//div[@class="entry-footer"]//*//a',
        popupElement: 'id("entry-info")//blockquote',
        delay: 1000,
        stripe: true,
        style: {
            fontSize: '80%'
        }
    },
    {
        description: 'Hatena Bookmark',
        url: '^http://b\\.hatena\\.ne\\.jp/',
        linkElement: '//dd[@class="users"]//a',
        popupElement: 'id("entry-info")//blockquote',
        delay: 1000,
        style: {
            fontSize: '80%',
            border: '1px solid blue'
        }
    },
    {
        description: 'Hatena Diary Keyword',
        url: '^http://d\\.hatena\\.ne\\.jp/',
        excludeUrl: '^http://d\\.hatena\\.ne\\.jp/keyword/',
        linkElement: '//a[@class="keyword"]',
        popupElement: '//div[@class="box-curve-bar"]//div[@class="section"]',
        delay: 1500,
        stripe: false,
        style: {
            fontSize: '80%',
            padding: '2px',
            border: '1px solid blue',
            color: 'black',
            backgroundColor: 'white',
            textAlign: 'left'
        }
    },
    {
        description: 'Hatena Keyword',
        url: '^http://d\\.hatena\\.ne\\.jp/keyword/',
        linkElement: '//a[@class="keyword"]',
        popupElement: 'id("body")//div[@class="keyword-body"]/div[@class="section"]/p',
        delay: 1000,
        stripe: true,
        style: {
            fontSize: '80%',
            padding: '2px',
            border: '1px solid blue',
            color: 'black',
            backgroundColor: 'white',
            textAlign: 'left'
        }
    },
    {
        url: '^http://mixi\\.jp/(?:search|list)_community\\.pl',
        linkElement: '//div[@class="iconList03"]//a',
        popupElement: 'id("newCommunityTopic")//dl',
        style: {
            backgroundColor: 'white',
            border: '1px solid orange',
            padding: '8px'
        }
    },
    {
        description: 'Yahoo! Chiebukuro related question',
        url: '^http://detail\\.chiebukuro\\.yahoo\\.co\\.jp/qa/question_detail/.+',
        linkElement: 'id("recommend")//dd[@class="recombox"]/a',
        popupElement: '//div[@class="bestAnswer Extends-details"]//div[@class="qa"]',
        style: {
            backgroundColor: 'white',
            borderWidth: '1px solid blue',
            padding: '8px',
            fontSize: '80%',
            textAlign: 'left'
        },
        containerHTML: '<h2>Best Answer</h2><popup:container/>'
    },
    {
        description: 'Twitter icon enlargement',
        url: '^https?://twitter\\.com/',
        linkElement: '//img[@class="photo fn"]/..',
        linkReplaceRule: {
            pattern: 'http://twitter.com/',
            replacement: 'http://twitter.com/account/profile_image/'
        },
        popupElement: 'id("content")/div/p/img',
    },
    {
        description: 'Twitter timeline',
        url: '^https?://twitter\\.com/',
        linkElement: 'id("content")//td[@class="content"]/strong/a',
        popupElement: 'id("side")',
        disabled: true,
        style: {
            width: '300px',
            textAlign: 'left'
        }
    },
    {
        description: 'Twitter following & followers',
        url: '^https?://twitter\\.com/(?:[^/]+/)?(?:friends|followers)',
        targetElement: '//td[@class="thumb"]//img[@class="photo fn"]',
        linkElement: '//td[@class="thumb"]//a[@rel="contact"]',
        popupElement: 'id("side")',
        style: {
            width: '300px',
            textAlign: 'left'
        }
    },
    {
        description: 'Hatena Fotolife',
        url: '^http://f\\.hatena\\.ne\\.jp/',
        linkElement: '//ul[@class="fotolist"]/li/a',
        popupElement: 'id("container")/div[2]/div[3]/img',
        style: {
        }
    },
    {
        description: 'Pixiv thumbnails',
        url: '^http://www\\.pixiv\\.net/tags\\.php\\?tag=',
        linkElement: 'id("illust_c5")/ul/li/a[1]',
        popupElement: 'id("content2")/div[6]/a/img',
        style: {
            border: '1px solid black'
        }
    },
    {
        description: 'Amazon.co.jp ListMania',
        url: '^http://www\\.amazon\\.co\\.jp/.+?/lm/',
        targetElement: '//td[@class="listItem"]/a/img[position()=1]',
        linkElement: '//td[@class="listItem"]//strong/a',
        popupElement: 'id("productDescription")',
        stripe: true,
        style: {
            fontSize: '80%',
            width: '500px',
            padding: '5px',
            border: '1px solid orange'
        }
    },
    {
        description: 'Amazon.co.jp SearchResult',
        url: '^http://www\\.amazon\\.co\\.jp/s/',
        linkElement: '//td[@class="imageColumn"]//a',
        popupElement: 'id("productDescription")',
        delay: 300,
        stripe: true,
        style: {
            fontSize: '80%',
            width: '500px',
            padding: '5px',
            border: '1px solid orange'
        }
    },
    {
        description: 'slashdot.jp recent 3 stories',
        url: '^http://slashdot\\.(?:jp|org)/topics\\.(?:pl|shtml)',
        exampleUrl: 'http://slashdot.jp/topics.pl',
        targetElement: '//div[@class="generalbody"]/table//td[@align="center"]/a/img',
        linkElement: '//div[@class="generalbody"]/table//td[@align="center"]/a',
        popupElement: '//div[@class="search-results"][position()<4]',
        style: {
            border: '1px solid black',
            padding: '4px',
            fontSize: '80%'
        }
    },
    {
        description: 'Youtube in Hatena Bookmark',
        url: '^http://b\\.hatena\\.ne\\.jp/',
        linkElement: '//a[contains(@href,"youtube.com/") and contains(text(),"users")]',
        popupElement: 'id("video")',
        delay: 500,
        stripe: true,
        style: {
            padding: '20px',
            background: 'black',
            fontSize: '80%'
        }
    },
    {
        description: 'Tabelog',
        url: '^http://r\\.tabelog\\.com/',
        linkElement: 'id("column-main")//div[@class="photo"]/a',
        popupElement: 'id("column-main")//div[@class="menulst"][position()=1]/div[@class="item"][position()<6]',
        delay: 500,
        //stripe: true,
        linkReplaceRule: {
            pattern: '/rstdtl/',
            replacement: '/rstdtlmenu/'
        },
        style: {
            padding: '4px',
            background: 'white',
            textAlign: 'left',
            fontSize: '90%',
            border: '1px solid #444'
        }
    },
    {
        description: 'Wikimedia commons icon->license',
        url: '^http://commons.wikimedia.org/wiki/',
        linkElement: '//table[@class="gallery"]//a',
        targetElement: '//table[@class="gallery"]//a/img',
        popupElement: '//table[@class="layouttemplate"]',
        style: {
                border: "1px solid gray",
                width: "400px"
        }
    },
    {
        description: 'Wikipedia',
        url: '^http://[a-z]{2}\\.wikipedia\\.org/',
        linkElement: 'id("bodyContent")//a[contains(@href,"/wiki/") and not (contains(@href,":"))]',
        popupElement: 'id("bodyContent")/p[position()<3]',
        stripe: true,
        style: {
                border: "1px solid gray",
                padding: "10px",
                width: "400px"
        },
        delay: 1000
    },
    {
        description: 'Hatena Bookmark Tag',
        url: '^http://b\\.hatena\\.ne\\.jp/entry/',
        linkElement: 'id("tags")/a',
        popupElement: '//div[@class="entry" and position()<7]',
        stripe: true,
        style: {
                border: "1px solid gray",
                padding: "10px",
                lineHeight: "140%",
                fontSize: "80%",
                textAlign: 'left'
        },
        delay: 1000
    },
    {
        description: 'Goo dictionary',
        url: '^http://dictionary\\.goo\\.ne\\.jp/search\\.php\\?',
        linkElement: ['id("incontents")//div[contains(@class,"diclst")]/ul/li/a[contains(@href,"search.php")]',
                      '//dl[@class="ranking" and position()<2]//table//a[contains(@href,"search.php")]',
                      'id("incontents")//div[@class="mainlst"]//a[contains(@href,"search.php")]'],
        popupElement: 'id("incontents")//div[@class="mainlst"]',
        stripe: true,
        encoding: 'euc-jp',
        style: {
                border: "1px solid gray",
                padding: "10px",
                width: "400px",
                textAlign: "left"
        },
        delay: 1000
    },
    {
        description: 'Google Related Search',
        url: '^http://www\\.google\\.co(?:m|\\.[a-z]{2})/search',
        linkElement: 'id("trev")//a',
        popupElement: '//li[@class="g" and position()<4]',
        stripe: true,
        style: {
                border: "1px solid gray",
                padding: "10px 20px",
                lineHeight: "140%",
                fontSize: "80%",
                textAlign: 'left'
        },
        delay: 1000
    },
    {
        description: 'Hatena Haiku Keywords',
        url: '^http://h\\.hatena\\.(?:ne\\.jp|com)/',
        linkElement: ['//a[@class="keyword"]', '//h2[@class="title"]/a'],
        popupElement: '//div[@class="entry" and position()>1 and position()<5]',
        stripe: true,
        style: {
                border: "1px solid gray",
                fontSize: "80%",
                textAlign: 'left'
        },
        delay: 1000
    },
    {
        description: 'Hatena Haiku Users',
        url: '^http://h\\.hatena\\.(?:ne\\.jp|com)/',
        linkElement: '//div[@class="list-image"]/a',
        popupElement: '//div[@class="entry" and position()>1 and position()<5]',
        style: {
                border: "1px solid gray",
                fontSize: "80%",
                textAlign: 'left'
        },
        delay: 1000
    },
    {
        description: 'CookPad Hot Recipe',
        url: '^http://cookpad\\.com/',
        linkElement: 'id("wadai-recipe")//a[@class="recipe-title"]',
        popupElement: '//div[@class="desc-and-ingredients"]',
        style: {
                border: "1px solid gray",
                fontSize: "80%",
                textAlign: 'left',
				width: '320px'
        },
        delay: 1000
    },
    {
        description: 'kakaku.com shop info',
        url: '^http://kakaku\\.com/item/',
        linkElement: '//a[@class="btnShoplink"]',
        popupElement: '//div[@class="shopComment02"]',
        style: {
                border: "1px solid gray",
                fontSize: "80%",
                textAlign: 'left',
				width: '320px'
        },
		encoding:'Shift_JIS',
        delay: 1000
    },
    {
       description: '2ch anchor popup',
       url: '^http://[^.]+\\.2ch\\.net/',
       linkElement: '//dd/a[contains(text(),">>")]',
       popupElement: '//dl',
       stripe: true,
       encoding: 'shift_jis',
       style: {
               border: "1px solid gray",
               padding: "4px",
               lineHeight: "140%",
               fontSize: "80%",
               textAlign: 'left'
       },
       delay: 1000
    },
    {
       description: '2ch anchor popup',
       url: '^http://[^.]+\\.2ch\\.net/[0-9a-z]+/subback\\.html',
       linkElement: 'id("trad")/a',
       popupElement: '//dl/dd[1]',
       encoding: 'shift_jis',
       style: {
               border: "1px solid gray",
               padding: "4px",
               lineHeight: "140%",
               fontSize: "80%",
               textAlign: 'left'
       },
       delay: 1000
    },
    {
       description: 'Mozilla-gumi Forum',
       url: '^http://forum\\.mozilla\\.gr\\.jp/',
       linkElement: '//a[contains(@href,"namber=") and contains(@href,"mode=one")]',
       popupElement: '//div[@class="ArtComment"]',
       stripe: true,
       style: {
               border: "1px solid gray",
               padding: "4px",
               lineHeight: "140%",
               fontSize: "80%",
               textAlign: 'left'
       },
       delay: 1000
    },
    {
        description: 'Shitaraba BBS anchor links',
        url: '^http://jbbs\\.livedoor\\.jp/',
        linkElement: '//dd/a[contains(text(),">>")]',
        popupElement: '//dl',
        stripe: true,
        encoding: 'euc-jp',
        style: {
            border: "1px solid gray",
            padding: "4px",
            lineHeight: "140%",
            fontSize: "80%",
            textAlign: 'left'
        },
        delay: 1000
    },
    {
        description: 'crossreview',
        url: '^http://crossreview\\.jp/',
        linkElement: ['//h3[contains(@class,"ReviewItem")]/a','//div[@class="SearchItemTxt"]/h3/a'],
        popupElement: '//div[@class="Review01 clearfix"][position()<3]',
        stripe: true,
        style: {
            border: "1px solid gray",
            padding: "4px",
            lineHeight: "140%",
            fontSize: "80%",
            textAlign: 'left'
        },
        delay: 1000
    }
];


// == SITEINFO end ==

popupAreaObj = document.createElement('DIV');
with (popupAreaObj.style) {
    position = 'absolute';
    backgroundColor = 'white';
    left = 0;
    top = 0;
}
popupAreaObj.show = function(targetElement) {
    this.style.display = 'block';
    this.style.MozOpacity = 0;
    // adjust position
    var targetDimension = getDimension(targetElement);
    if (targetDimension.offsetRight > targetDimension.offsetLeft) {
        // Right
        popupAreaObj.style.left = targetDimension.left + targetDimension.width + 'px';
        popupAreaObj.style.top = targetDimension.top + 'px';
        var dimension = getDimension(this);
        if (dimension.width > targetDimension.offsetRight) popupAreaObj.style.width = targetDimension.offsetRight + 'px';
    } else {
        // Left
        var dimension = getDimension(this);
        this.style.top = targetDimension.top + 'px';
        if (dimension.width > targetDimension.offsetLeft) this.style.width = targetDimension.offsetLeft + 'px';
        this.style.left = targetDimension.left - this.offsetWidth + 'px';
    }

    var dimension = getDimension(this);
    if (window.scrollY > dimension.top) {
        this.style.top = window.scrollY+ 'px';
    }
    else if (window.scrollY + window.innerHeight < dimension.top + dimension.height) {
        this.style.top = Math.max(window.scrollY + window.innerHeight - dimension.height, window.scrollY) + 'px';
    }
    this.style.MozOpacity = 1;
};
popupAreaObj.hide = function(target) {
    if (popupAreaObj._currentTarget == target) this.style.display = 'none';
};
popupAreaObj.append = function(elm) {
    while (this.childNodes.length > 0) this.removeChild(this.firstChild);
    this.appendChild(elm);
};
popupAreaObj._currentTarget = null;

function PopupManager() {
    this.init = function() {
        document.body.appendChild(popupAreaObj);
        this.maxZIndex = 0;
        // calculate maximum value of "z-index"
        var allElements = document.getElementsByTagName('*');
        for (var i in allElements) {
            if (allElements[i].style && allElements[i].style.zIndex) {
                this.maxZIndex = allElements[i].style.zIndex;
            }
        }
        popupAreaObj.style.zIndex = this.maxZIndex + 2;

        for (var i in SITEINFO) {
            if (SITEINFO[i].disabled) continue;
            if (!location.href.match(new RegExp(SITEINFO[i].url)) || (SITEINFO[i].excludeUrl && location.href.match(new RegExp(SITEINFO[i].excludeUrl)))) continue;

            var linkElementList;
            var targetElementList;
            if ('string'==typeof(SITEINFO[i].linkElement)) {
                linkElementList = getElementsByXPath(SITEINFO[i].linkElement);
            } else {
                linkElementList = new Array();
                for (var index in SITEINFO[i].linkElement) linkElementList = linkElementList.concat(getElementsByXPath(SITEINFO[i].linkElement[index]));
            }
            if (SITEINFO[i].targetElement) {
                if ('string'==typeof(SITEINFO[i].targetElement)) {
                    targetElementList = getElementsByXPath(SITEINFO[i].targetElement);
                } else {
                    targetElementList = new Array();
                    for (var index in SITEINFO[i].targetElement) targetElementList = targetElementList.concat(getElementsByXPath(SITEINFO[i].targetElement[index]));
                }
            } else {
                targetElementList = linkElementList;
            }
            for (var j in targetElementList) {
                if (linkElementList.length<=j) break;
                var url = linkElementList[j].href;

                //add icon
                if (SITEINFO[i].stripe) linkElementList[j].appendChild(createIcon());

                if (SITEINFO[i].linkReplaceRule) {
                    var rule = SITEINFO[i].linkReplaceRule;
                    if (rule.pattern && rule.replacement) url = url.replace(new RegExp(rule.pattern), rule.replacement);
                }
                this.setEvent (targetElementList[j], url, SITEINFO[i].popupElement,
                    {
                        style:SITEINFO[i].style,
                        containerHTML:SITEINFO[i].containerHTML,
                        xslt:SITEINFO[i].xslt,
                        delay:SITEINFO[i].delay,
                        encoding:SITEINFO[i].encoding
                    });
            }
        }
    };

    this.setEvent = function(targetElement, url, popupElementXPath, option) {
        targetElement._elementCache = null;
        targetElement._mouseOut = true;
        targetElement._locked = false;
        var dimension = getDimension(targetElement);

        targetElement.lock = function() {
            targetElement._locked = true;
        };
        targetElement.unlock = function(e) {
            targetElement._locked = false;
            if (targetElement._mouseOut) targetElement.removePopupElement();
        };

        targetElement.removePopupElement = function() {
                    setTimeout(function() {
                        if (!targetElement._mouseOut) return;
                        if (!targetElement._locked) popupAreaObj.hide(targetElement);
                    }, HIDE_DELAY_MSEC);

        };
        targetElement.addPopupElement = function() {
            if (targetElement._elementCache != null) {
                popupAreaObj.append(targetElement._elementCache);
                popupAreaObj.show(targetElement);
                return;
            }
            var http = new XMLHttpRequest();
            if (option.encoding)
                http.overrideMimeType("text/plain; charset=" + option.encoding);
            http.open("GET", url, true);
            http.onreadystatechange = function() {
                 if (http.readyState == 4) {
                    try {
                            popupAreaObj._currentTarget = targetElement;
                            var text = http.responseText;
                            var xml = createHTMLDocumentByString(text);
                            var elmContainer = document.createElement('DIV');
                            // apply style
                            if (option.style) {
                                for (var j in option.style) {
                                    elmContainer.style[j] = option.style[j];
                                }
                            }
                            if (http.status == 200) {
                                var elementList = getElementsByXPath(popupElementXPath, xml);
                                if (option.xslt) {
                                    // apply XSLT stylesheet
                                    var template = new XSLTProcessor();
                                    var stylesheet = createXsltDocumtntByString(option.xslt);
                                    template.importStylesheet (stylesheet.documentElement.firstChild);
                                    var result = template.transformToFragment(xml, document);
                                    elmContainer.appendChild(result);
                                } else if (elementList.length > 0) {
                                    // "popupElement" found
                                    if (option.containerHTML) {
                                        elmContainer.innerHTML = option.containerHTML;
                                        var tmpList = elmContainer.getElementsByTagName('popup:container');
                                        if (tmpList.length == 1) {
                                            for (var elementIndex in elementList) {
                                                tmpList[0].parentNode.insertBefore(elementList[elementIndex], tmpList[0]);
                                            }
                                        }
                                    } else {
                                            for (var elementIndex in elementList) {
                                                elmContainer.appendChild(elementList[elementIndex]);
                                            }
                                    }
                                } else {
                                    // nothing matched to "popupElement"
                                    elmContainer.appendChild(document.createTextNode(ERROR_MESSAGE_POPUP_ELEMENT_EMPTY));
                                }
                                targetElement._elementCache = elmContainer;
                            } else {
                                // HTTP Error
                                elmContainer.appendChild(document.createTextNode(ERROR_MESSAGE_HTTP + http.status));
                            }
                            elmContainer.addEventListener('mouseover', targetElement.lock, true);
                            elmContainer.addEventListener('mouseout', targetElement.unlock, true);
                            popupAreaObj.append(elmContainer);
                            popupAreaObj.show(targetElement);
                    } catch (ex) {
                    }
                 }
            };
            http.send(null);
        };
        targetElement.addEventListener ('mouseout',
            function() {
                try {
                    targetElement._mouseOut = true;
                    targetElement.removePopupElement();
                } catch (ex) {}
            },
            true);

        targetElement.addEventListener ('mouseover',
            function() {
                targetElement._mouseOut = false;
                setTimeout(function() {
                    if (targetElement._mouseOut) return;
                    targetElement.addPopupElement();
                }, (option.delay)?option.delay:DEFAULT_DELAY_MSEC)
            },
            true);
    };
}

(new PopupManager()).init();

function DimensionInfo(left, top, width, height) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    this.offsetTop = null;
    this.offsetRight = null;
    this.offsetBottom = null;
    this.offsetLeft = null;
}

function getDimension(elm) {
    var dimension = _getDimension(elm);
    dimension.offsetTop = dimension.top - window.scrollY;
    dimension.offsetRight = window.innerWidth + window.scrollX - dimension.width - dimension.left;
    dimension.offsetBottom = window.innerHeight + window.scrollY - dimension.height - dimension.top;
    dimension.offsetLeft = dimension.left - window.scrollX;
    return dimension;
}
function _getDimension(elm) {
    var dimension;
    if (elm) {
        dimension = new DimensionInfo(elm.offsetLeft, elm.offsetTop, elm.offsetWidth, elm.offsetHeight);
        if (elm.offsetParent ) {
            tmp = _getDimension(elm.offsetParent);
            dimension.top += tmp.top;
            dimension.left += tmp.left;
        }
    }
    return dimension;
}

/*
 Utilities
*/
function createIcon () {
    var signimg = document.createElement("img");
    signimg.src = IMAGE_INFOBOX;
    signimg.style.borderStyle = 'none';
    return signimg;
}

function createXsltDocumtntByString(str) {
    var htmlDoc  = document.implementation.createDocument(null, 'html', null);
    var range = document.createRange();
    range.selectNodeContents(htmlDoc.documentElement);
    htmlDoc.documentElement.appendChild(range.createContextualFragment(str));
    return htmlDoc;
}

/*
cited from AutoPagerize
*/
function createHTMLDocumentByString(str) {
    var html = str.replace(/^[\s\S]*?<html(?:[ \t\r\n][^>]*)?>|<\/html[ \t\r\n]*>[\S\s]*$/ig, '');
    var htmlDoc  = document.implementation.createDocument(null, 'html', null);
    var fragment = createDocumentFragmentByString(html);
    try {
        fragment = htmlDoc.adoptNode(fragment);
    } catch (e) {
        fragment = htmlDoc.importNode(fragment, true);
    }
    htmlDoc.documentElement.appendChild(fragment);
    return htmlDoc;
}

function createDocumentFragmentByString(str) {
    var range = document.createRange();
    range.setStartAfter(document.body);
    return range.createContextualFragment(str);
}

function getElementsByXPath(xpath, node) {
    var node = node || document;
    var doc = node.ownerDocument ? node.ownerDocument : node;
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var data = [];
    for (var i = 0, l = nodesSnapshot.snapshotLength; i < l; i++) {
        data.push(nodesSnapshot.snapshotItem(i));
    }
    return data;
}
