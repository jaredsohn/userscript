// ==UserScript==
// @name           Pixiv Show All
// @description    Show All original size images in current page, view all images in new page
// @author         vinsai
// @updateURL      https://userscripts.org/scripts/source/134203.meta.js
// @version        1.4.1
// @include        http://www.pixiv.net/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
var autoLoad = true;
var autoLoadPage = false;

GM_registerMenuCommand("Pixiv Show All->Toggle Auto Load Images", SetAutoLoad);

function SetAutoLoad() {
    var auto = GM_getValue(autoLoad);
    if (auto == true) {
        GM_setValue(autoLoad, false);
    }
    else {
        GM_setValue(autoLoad, true);
    }
}

GM_registerMenuCommand("Pixiv Show All->Toggle Auto Load Next Page", SetAutoLoadPage);

function SetAutoLoadPage() {
    var auto = GM_getValue(autoLoadPage);
    if (auto == true) {
        GM_setValue(autoLoadPage, false);
    }
    else {
        GM_setValue(autoLoadPage, true);
    }
}

(function () {
    var buttonStyle = 'border:1px solid rgb(190,202,215);background:#FCFCFC;padding:2px;cursor:pointer;';
    var fixedButtonStyle = 'z-index:2000;position:fixed;left:5px;width:100px;text-align:center;opacity:0.3;';
    var imagesWrapperStyle = 'z-index:3000;background-color:#000;text-align:center;position:absolute;top:0px;left:0px;font-family:"メイリオ",Meiryo;';
    var imgStyle = 'margin: 5px auto;';
    var aStyle = 'color:white;text-align:center;';
    var imgDIVStyle = 'margin-bottom:30px;';
    var imgTitleStyle = 'font-weight:bold;font-size:180%;';
    var imgUserStyle = 'font-size:120%;';

    var btn = '<span class="fixedButton button" style="top:208px;" id="showAllC">Show images</span>';
    var btnPage = '<span class="fixedButton button" style="top:236px;" id="triggerAutoPage">Start Auto Page</span>';
    btnPage += '<span class="fixedButton" style="text-align:center;border:1px solid rgb(0,0,0);background:rgba(0,128,64,0.8);padding:2px;top:264px;font-size:110%;font-weight:bold;display:none;" id="loadNotice">Loading...</span>';

    var addStyle =
	'<style type="text/css">\n\
		.imgDIV {' + imgDIVStyle + '}\n\
        .imgDIV a, #images-wrapper a {' + aStyle + '}\n\
        .imgDIV img, #images-wrapper img {' + imgStyle + '}\n\
		.imgTitle {' + imgTitleStyle + '}\n\
		.imgUser {' + imgUserStyle + '}\n\
        .button {' + buttonStyle + '}\n\
        .fixedButton {' + fixedButtonStyle + '}\n\
		.fixedButton:hover {opacity:1;}\n\
        .limitImg {max-width:780px;height:auto;}\n\
        .AppendTool {background-color:#E5E5E5;margin:5px 0px;}\n\
        #closeImages {position:fixed;z-index:3000;top:0px;left:0;}\n\
        #images-wrapper {' + imagesWrapperStyle + '}\n\
    </style>\n';

    var css =
    '<style type="text/css">\n\
        #imagesCollection {display:table-cell;vertical-align:middle;text-align:center;}\n\
		body {background-color:black;width:99%;height:98%;display:table;font-family:"メイリオ",Meiryo;}\n\
	</style>\n';

    var head = document.getElementsByTagName("head")[0];
    if (head) {
        head.innerHTML += addStyle;
    }

    var jquerySrc =
		'<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>\n';
    var js =
        '<script type="text/javascript">\n' +
            setMaxWidth.toString() +
            '\nsetMaxWidth();\n' +
            'window.onresize = setMaxWidth;\n' +
        '</script>\n';

    var NOT_SHOWN = 'Click the link below to view the images';

    var Pixiv = {
        NewIllust: {
            linkXPath: "//a[@rel='next']",
            contentXPath: ["//div[@class='_unit']/ul[@class='image-items autopagerize_page_element'] | //div[@class='_unit']/section[@class='column-search-result'] | //div[@class='_unit']/div[@class='ads_area_no_margin'] | //div[@class='_unit']//nav[@class='column-order-menu'][position()=2]"],
            getTitle: function () {
                return document.querySelector('.column-title').textContent;
            },
            getImageNodes: function () {
                return document.querySelectorAll('.image-item > .work > img');
            },
            getIllustURL: function (node) {
                return node.parentNode.href;
            },
            getIllustTitle: function (node) {
                var title = "";
                if (node.parentNode.querySelector('.title') != null) {
                    title = node.parentNode.querySelector('.title').textContent;
                }
                return title;
            },
            getUser: function (node) {
                var user = "";
                if (node.parentNode.parentNode.querySelector('a.user') != null) {
                    user = node.parentNode.parentNode.querySelector('a.user').textContent;
                }

                return user;
            },
            getUserURL: function (node) {
                var userLink = "";
                if (node.parentNode.parentNode.querySelector('a.user') != null) {
                    userLink = node.parentNode.parentNode.querySelector('a.user').href;
                }

                return userLink;
            }
        },
        Ranking: {
            linkXPath: "//a[@rel='next']",
            contentXPath: ["//section[@class='ranking-items autopagerize_page_element']"],
            getTitle: function () {
                return "";
            },
            getImageNodes: function () {
                return document.querySelectorAll('.ranking-item .data');
            },
            getIllustURL: function (node) {
                var illustLink = "";
                if (node.querySelector('h2>a') != null) {
                    illustLink = node.querySelector('h2>a').href;
                }
                return illustLink;
            },
            getIllustTitle: function (node) {
                var title = "";
                if (node.querySelector('h2>a') != null) {
                    title = node.querySelector('h2>a').textContent;
                }
                return title;
            },
            getUser: function (node) {
                var user = "";
                if (node.querySelector('.user-container') != null) {
                    user = node.querySelector('.user-container').textContent;
                }

                return user;
            },
            getUserURL: function (node) {
                var userLink = "";
                if (node.querySelector('.user-container') != null) {
                    userLink = node.querySelector('.user-container').href;
                }

                return userLink;
            }
        },
		Bookmark: {
            linkXPath: "//a[@rel='next']",
            contentXPath: ["//div[@class='display_works linkStyleWorks'] | //nav[@class='column-order-menu']"],
            getImageNodes: function () {
                return document.querySelectorAll('.display_works img');
            },
            getIllustURL: function (node) {
                return node.parentNode.href;
            },
            getIllustTitle: function (node) {
                return node.parentNode.textContent;
            },
            getUser: function (node) {
                return node.parentNode.parentNode.querySelector('.f10 a').textContent;
            },
            getUserURL: function (node) {
                return node.parentNode.parentNode.querySelector('.f10 a').href;
            }
		},
		Recommend: {
			linkXPath: function() {
				return Pixiv.Bookmark.linkXPath;
			},
			contentXPath: function() {
				return Pixiv.Bookmark.contentXPath;
			},
            getImageNodes: function () {
                return document.querySelectorAll('.image-item img._thumbnail');
            },
            getIllustURL: function (node) {
                return node.parentNode.href;
            },
            getIllustTitle: function (node) {
                return node.nextSibling.textContent;
            },
            getUser: function (node) {
                var userLink = "";
                if (node.parentNode.parentNode.querySelector('a.user') != null) {
                    userLink = node.parentNode.parentNode.querySelector('a.user').href;
                }

                return userLink;
            },
            getUserURL: function (node) {
                var userLink = "";
                if (node.parentNode.parentNode.querySelector('a.user') != null) {
                    userLink = node.parentNode.parentNode.querySelector('a.user').href;
                }

                return userLink;
            },
            setButton: function () {
				Pixiv.setButton(Pixiv.Bookmark);

			    var btn = '<span class="fixedButton button" style="top:180px;" id="showAllR">Recommend</span>';
				$("body").append(btn);
				// Show in current page
				$('#showAllR').click(function (e) {
					var content = Pixiv.CurrentPage.header();
					content += Pixiv.getAppendContent(Pixiv.Recommend);
					Pixiv.CurrentPage.footer(content);
				});
            }
		},
        MemberIllust: {
            linkXPath: "//a[@rel='next']",
            contentXPath: ["//div[@class='display_works linkStyleWorks'] | //div[@class='_unit manage-unit']/div[@class='clear'] | //div[@class='_unit manage-unit']/ul[@class='column-order-menu'][position()=2]"],
            getTitle: function () {
                return Pixiv.Illust.getAuthor();
            },
            getImageNodes: function () {
                return document.querySelectorAll('.image-item img._thumbnail');
            },
            getIllustURL: function (node) {
                return node.parentNode.href;
            },
            getIllustTitle: function (node) {
                return node.nextSibling.textContent;
            },
            getUser: function (node) {
                return "";
            },
            getUserURL: function (node) {
                return "";
            }
        },
        Illust: {
            doc: document,
            getAuthor: function () {
                return document.querySelector('.user-link > h1.user').textContent;
            },
            getTitle: function () {
                return this.getAuthor() + '｜' + this.getIllustTitle();
            },
            getImageNode: function () {
                return $(this.doc).find('.works_display img').attr('src');
            },
            getSrcURL: function () {
                if (this.getImagesCount() > 1)
                    return this.getImageNode();
                return this.getImageNode().replace("_m.", ".");
            },
            getIllustTitle: function () {
                return $(this.doc).find('.work-info > .title').text();
            },
            getIlludtID: function () {
                return parseInt(location.href.match("id=[0-9]+")[0].substr(3), 10);
            },
            getImagesCount: function () {
                var count = 1;
                var str = $(this.doc).find('.work-info > .meta > li:eq(1)').text();
                if (str.match("[0-9]+P") != null) {
                    count = str.match("[0-9]+")[0];
                }
                return count;
            },
            getAppendContent: function () {
                var urls = this.getImagesURL();
                // Get number of images
                var count = this.getImagesCount();
                var page = "";
                for (var i = 0; i < count; ++i) {
                    page += '<a href=' + urls[i] + ' target="_blank"><img id="img' + i + '" src=' + urls[i] + '></a><br />\n';
                }
                return page;
            },
            getImagesURL: function () {
                var bigImage = "_p";
                if (this.getIlludtID() > 11319935) {
                    bigImage = "_big_p";
                }
                var p = this.getImageNode();
                var url = this.getSrcURL();
                var count = this.getImagesCount();

                var urls = [];
                if (count == 1) {
                    urls[0] = url;
                }
                else {
                    for (var i = 0; i < count; ++i) {
                        urls[i] = p.replace("_m.", (bigImage + i + "."));
                    }
                }

                return urls;
            },
            autoLoad: function () {
                var urls = this.getImagesURL();
                var append = "";

                for (var i = 0; i < urls.length; ++i) {
                    append += '<a href=' + urls[i] + ' target="_blank"><img class="limitImg" id="img' + i + '" src=' + urls[i] + '></a>';
                }

                $('.works_display').append(append);
            },
            setButton: function () {
                // Append images to current page
                if (GM_getValue(autoLoad) == true) {
                    Pixiv.Illust.autoLoad();
                }
                var works = $('.work-info .title');
                var btn = '<span class="button" id="winBtn">Show in new Window</span>';
                var btn2 = '<span class="button" id="winBtn2">Show in current Window</span>';
                works.after(btn + btn2);

                // Show in new page
                $('#winBtn').click(function (e) {
                    var page = Pixiv.NewPage.header(Pixiv.Illust);
                    page += Pixiv.Illust.getAppendContent();
                    Pixiv.NewPage.footer(page);
                });
                // Show in current page
                $('#winBtn2').click(function (e) {
                    var content = Pixiv.CurrentPage.header('padding-top:300px;');
                    content += Pixiv.Illust.getAppendContent();
                    Pixiv.CurrentPage.footer(content);
                });
            }
        },
        NewPage: {
            header: function (obj) {
                var newPage = "<html>\n<head>\n<meta charset='utf-8'>\n<title>";
                newPage += obj.getTitle();
                newPage += '</title>\n' + css + addStyle + jquerySrc +'</head>\n<body>\n';
                newPage += '<div id="imagesCollection">\n';
                return newPage;
            },
            footer: function (content) {
                content += "</div>\n" + js + "</body>\n</html>";

                var uriContent = "data:text/html;charset=utf-8," + encodeURIComponent(content);
                window.open(uriContent);
            }
        },
        CurrentPage: {
            header: function (style) {
                var s = "";
                if (style)
                    s = " style=" + style;
                return '<div id="images-wrapper"' + s + '>\n'
            },
            footer: function (content) {
                content += "</div>";
                $('body').append(content);
                Pixiv.getSrcURL();
                imagesWrapper();
            }
        },
        setButton: function (obj) {
            $("body").append(btn);
            // Show in current page
            $('#showAllC').click(function (e) {
                var content = Pixiv.CurrentPage.header();
                if (obj.getAppendContent) {
                    content += obj.getAppendContent();
                }
                else {
                    content += Pixiv.getAppendContent(obj);
                }
                Pixiv.CurrentPage.footer(content);
            });
        },
        getAppendContent: function (obj) {
            var c = obj.getImageNodes();
            var page = "";

            for (var i = 0; i < c.length; ++i) {
                var illustLink = obj.getIllustURL(c.item(i));
                var title = obj.getIllustTitle(c.item(i));
                var user = obj.getUser(c.item(i));
                var userLink = obj.getUserURL(c.item(i));

                page += '<div class="imgDIV" id="img' + i + '" data-url="' + illustLink + '">';
                
                page += '<a href="#" target="_blank"><img src="#" title="' + title + '" alt="' + NOT_SHOWN + '"></a><br />';
                
                page += '<a href=' + illustLink + ' target="_blank" class="imgTitle">' + title + '</a>';
                if (!(user == "" && userLink == "")) {
                    page += '<br /><a href=' + userLink + ' target="_blank" class="imgUser">' + user + '</a>';
                }
                page += '</div>\n';
            }
            return page;
        },
        isNewIllust: function () {
            return location.href.match("pixiv.+new_illust\.php|pixiv.+search\.php");
        },
        isRanking: function () {
            return location.href.match('pixiv.+ranking\.php');
        },
        isMemberIllust: function () {
            return location.href.match('pixiv.+member_illust\.php.id=');
        },
        isIllustID: function () {
            return location.href.match('pixiv.+illust_id');
        },
		isBookmark: function () {
			return location.href.match('pixiv.+bookmark\.php');
		},
		isRecommend: function () {
			return location.href.match('pixiv.+bookmark\.php') && document.querySelector('#illust-recommend') != null;
		},
        getType: function () {
            if (Pixiv.isRanking()) {
                return Pixiv.Ranking;
            }
            else if (Pixiv.isMemberIllust()) {
                return Pixiv.MemberIllust
            }
            else if (Pixiv.isNewIllust()) {
                return Pixiv.NewIllust
            }
            else if (Pixiv.isIllustID()) {
                return Pixiv.Illust
            }
			else if (Pixiv.isRecommend()) {
				return Pixiv.Recommend
			}
			else if (Pixiv.isBookmark()) {
				return Pixiv.Bookmark
			}
			
			return null;
        },
        getSrcURL: function () {
            $('.imgDIV').each(function () {
                var me = $(this);
                var link = $(this).attr('data-url');

                $.ajax({
                    url: link
                }).done(function (t) {
                    var obj = {};
                    $.extend(obj, Pixiv.Illust);
                    obj.doc = t;
                    var url = obj.getSrcURL();

                    me.find('a:first').attr('href', url);
                    me.find('img').attr('src', url);
                });
            });
        }
    };
    //===============================================================================
    //			- Auto Page -
    //===============================================================================
    function autoPage(linkXPath, contentXPath) {
        var scrollY = 0;
        var index = 1;
        var linkNode = null;
        var contentNode = null;

        $("body").append(btnPage);

        function page() {
            var srcollCurrentY = $(document).height();

            if ((srcollCurrentY > scrollY + 100) && (srcollCurrentY < $(window).scrollTop() + $(window).height() + 400)) {
                scrollY = srcollCurrentY;

                if (index == 1) {   // first time to run
                    linkNode = document.evaluate(linkXPath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    linkNode = linkNode.iterateNext();

                    var t = document.evaluate(contentXPath[0], document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);;
                    var node = null;
                    while (node = t.iterateNext()) {
                        contentNode = node;
                    }
                }

                if (linkNode == null || linkNode.tagName != "A") {
                    window.onscroll = null;
                    return;
                }

                var newdiv = '<div class="AppendTool" id="tool' + index + '"><div class="load" style="text-align:center;font-weight:bold;font-size:120%;">Loading...</div></div>'

                contentNode.insertAdjacentHTML('afterEnd', newdiv);
                $("#loadNotice").show();

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        // parse text to document
                        parser = new DOMParser();
                        doc = parser.parseFromString(xmlhttp.responseText, "text/html");

                        // find contentXPath node
                        var targetNode = [];
                        for (var i = 0; i < contentXPath.length; ++i) {
                            var t = doc.evaluate(contentXPath[i], doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                            var node = null;
                            while (node = t.iterateNext()) {
                                targetNode.push(node);
                            }
                        }

                        // find next link node
                        var preLink = linkNode;
                        var t = doc.evaluate(linkXPath, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                        var node = null;
                        var nextLink = null;
                        while (node = t.iterateNext()) {
                            nextLink = node;
                        }
                        if (nextLink == linkNode) {
                            nextLink = null;
                        }
                        linkNode = nextLink;


                        // append after the tool
                        var p = contentNode.parentNode;
                        var i;
                        for (i in targetNode) {
                            p.appendChild(targetNode[i]);
                        }

                        // Change Notice
                        var toolContent = '<a href="' + preLink + '">Page ' + (index + 1) + '</a> ';
                        if (index == 1) {
                            toolContent += '<a href="javascript: function scrollToTop() {document.body.scrollTop = document.documentElement.scrollTop = 0;} scrollToTop();">';
                        }
                        else {
                            toolContent += '<a href="#tool' + (index - 1) + '">';
                        }
                        toolContent += '&#8679;</a> <a href="#tool' + (index + 1) + '">&#8681;</a>';

                        contentNode.nextSibling.childNodes[0].innerHTML = toolContent;
                        $("#loadNotice").hide();

                        contentNode = targetNode[i];

                        index++;
                    }
                }

                xmlhttp.open("GET", linkNode, true);
                xmlhttp.send();
            }
        };

        $("#triggerAutoPage").click(function () {
            if (window.onscroll != null) {
                window.onscroll = null;
                $(this).html("Start Auto Page");
            }
            else {
                page();
                window.onscroll = page;
                $(this).html("Stop Auto Page");
            }
        });

        if (GM_getValue(autoLoadPage) == true) {
            $("#triggerAutoPage").trigger('click');
        }
    }

    //===============================================================================
    //			- End of Auto Page -
    //===============================================================================

    function setMaxWidth() {
        var mwidth = $(window).width() - 15;

        var resizeStyle =
        '<style type="text/css" id="resize">\n'+
            '#images-wrapper img {max-width:' + mwidth + 'px;}\n' +
            '#images-wrapper {min-width:' + $(window).width() + 'px;min-height:' + $(document).height() + 'px;}\n' +
        '</style>\n';

        var head = document.getElementsByTagName("head")[0];
        if (head) {
            $(head).find('#resize').remove();
            head.innerHTML += resizeStyle;
        }
    }
    setMaxWidth();

    function imagesWrapper() {
        $(window).scrollTop(0);
        window.onresize = setMaxWidth;
        $('#images-wrapper').dblclick(function (event) {
            var $e = $(event.target);
            if (!($e.is('a') || $e.is('img'))) {
                $('#images-wrapper').remove();
            }
        });

        jQuery('<span>', { class: 'fixedButton button', id: "closeImages", text: "Return" }).appendTo($('#images-wrapper'));
        $('#closeImages').click(function (e) {
            $('#images-wrapper').remove();
            window.onresize = null;
        });
    }

	if (Pixiv.getType()) {
		if (Pixiv.getType().setButton) {
			Pixiv.getType().setButton();
		}
		else {
			Pixiv.setButton(Pixiv.getType());
		}

	    if (Pixiv.getType().linkXPath)
    	    autoPage(Pixiv.getType().linkXPath, Pixiv.getType().contentXPath);
	}
})();

//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "Pixiv Show All";
var source_location = "http://userscripts.org/scripts/source/134203.user.js";
var current_version = "1.4.1";
var latest_version = " ";
var gm_updateparam = "PixivShowAll_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://dl.dropbox.com/u/4978696/userscripts/PixivShowAll.txt";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("Pixiv Show All->Manually Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
    var today = new Date();
    GM_setValue(gm_updateparam, String(today));
    window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate() {
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

    if (lastupdatecheck != "never") {
        today = today.getTime(); //Get today's date
        var lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

        //If a week has passed since the last update check, check if a new version is available
        if (interval >= 7)
            CheckVersion();
    }
    else
        CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: version_holder,
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        onload: function (responseDetails) {
            var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));

            if (line != null) {
                var strSplit = new Array();
                strSplit = line.split('=');
                latest_version = strSplit[1];

                if (current_version != latest_version && latest_version != "undefined") {
                    if (confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
                        GetNewVersion();
                    else
                        AskForReminder();
                }
                else if (current_version == latest_version)
                    alert("You have the latest version of " + script_title + ".");
            }
            else {
                alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
                SkipWeeklyUpdateCheck();
            }

        }
    });
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder() {
    if (confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)")) {
        var today = new Date();
        today = today.getTime();
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;
        var sixdaysago = new Date(sda_ms)

        //Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
        GM_setValue(gm_updateparam, String(sixdaysago));
    }
    else
        SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck() {
    var today = new Date();
    //As if we've just updated the script, the next check will only be next week.
    GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================


/*
 * DOMParser HTML extension
 * 2012-02-02
 *
 * By Eli Grey, http://eligrey.com
 * Public domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/
// Only for chrome
if (window.chrome) {
    (function (DOMParser) {
        "use strict";

        var
          DOMParser_proto = DOMParser.prototype
        , real_parseFromString = DOMParser_proto.parseFromString
        ;

        // Firefox/Opera/IE throw errors on unsupported types
        try {
            // WebKit returns null on unsupported types
            if ((new DOMParser).parseFromString("", "text/html")) {
                // text/html parsing is natively supported
                return;
            }
        } catch (ex) { }

        DOMParser_proto.parseFromString = function (markup, type) {
            if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
                var
                  doc = document.implementation.createHTMLDocument("")
                , doc_elt = doc.documentElement
                , first_elt
                ;

                doc_elt.innerHTML = markup;
                first_elt = doc_elt.firstElementChild;

                if ( // are we dealing with an entire document or a fragment?
                       doc_elt.childElementCount === 1
                    && first_elt.localName.toLowerCase() === "html"
                ) {
                    doc.replaceChild(first_elt, doc_elt);
                }

                return doc;
            } else {
                return real_parseFromString.apply(this, arguments);
            }
        };
    }(DOMParser));
}