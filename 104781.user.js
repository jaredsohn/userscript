// ==UserScript==
// @name           Google Spreadsheets Revision History Enhanced
// @version        1.1
// @namespace      http://klargodut.com/googleSpreadsheetsRevisionHistoryEnhanced
// @include        https://spreadsheets*.google.com/spreadsheet/ver*widget=true*
// @require        http://klargodut.com/jquery-1.6.1.min.js
// ==/UserScript==

go();

var cachedPages = {};
var cachedComparePages = {};

var iframe1;
var iframe2;

var aboutMessage = "\
<html>\
<body>\
<h1>Google Spreadsheet Revision History Enhanced</h1>\
<p>by: Emil Andersson</p>\
<p>Loading sheets, please be patient...</p>\
<ul>\
<li>Sheet tabs have editors' colors when edited</li>\
<li>Sheet contents are cached for quicker navigation</li>\
<li>To the right of the new version, the old version is displayed</li>\
</ul>\
</body>\
</html>\
";

var sorryMessage = "\
<html>\
<body>\
<h1>Google Spreadsheet Revision History Enhanced</h1>\
<p>by: Emil Andersson</p>\
<p>For some reason, this sheet failed to load. Please try reloading it.</p>\
</body>\
</html>\
";

var maxIframeWidth;
var iframeContainerWidth;
var innerScrollerWidth;

function resize() {
    if ((iframe1.contentDocument.height == 0) && (iframe2.contentDocument.height == 0)) { 
        setTimeout(resize, 100);
    }
    else {
        iframe1.setAttribute("style", "border: 0; overflow-x: hidden;");
        iframe2.setAttribute("style", "border: 0; overflow-x: hidden;");
        
        setTimeout(function() {
            var width = $jq(window).width();
            $jq("#divLeft, #divRight").width((width - 10 - 20) / 2 - 1);
            $jq("#scroller").width(width);
            
            $jq(iframe1).height($jq(iframe1.contentDocument).height());
            $jq(iframe2).height($jq(iframe2.contentDocument).height());

            $jq(iframe1).width($jq(iframe1.contentDocument).width());
            $jq(iframe2).width($jq(iframe2.contentDocument).width());

            $jq("#iframeContainer").width($jq(window).width());
            $jq("#iframeContainer").height($jq(window).height() - 50);
            
            $jq("#divOuter").height($jq(window).height() - 50);
            
            var maxIframeHeight = 
                Math.max(Math.max($jq("#iframe1").height(), $jq("#iframe2").height()), $jq("#iframeContainer").height());
                
            $jq("#divCenter").height(maxIframeHeight);
            
            maxIframeWidth = Math.max($jq("#iframe1").width(), $jq("#iframe2").width());
            iframeContainerWidth = $jq("#divLeft").width();
            innerScrollerWidth = maxIframeWidth / iframeContainerWidth * width;
            $jq("#innerScroller").css("width", innerScrollerWidth);
        }, 1000);
    }    
}

function loadHtml(iframe, html) {
    iframe.contentDocument.open();
    iframe.contentDocument.writeln(html);
    iframe.contentDocument.close();
    
    resize();
}

function go() {
    if ($jq("td.switcherItem, td.switcherItemActive").length == 0)
        window.setTimeout(go, 100); // Give Google's javascript a chance to kick in first
    else {
        window.setTimeout(function() {    // And give it some extra time...
            // Get rid of the GWT stuff
            var container = $jq("iframe#pageswitcher-content").parent().parent();
            $jq("iframe#pageswitcher-content").parent().remove();
            
            // Create our diff viewer
            var divScroller = document.createElement("div");
            var divScrollerInner = document.createElement("div");
            
            var divOuter = document.createElement("div");
            
            var divLeft = document.createElement("div");
            var divCenter = document.createElement("div");
            var divRight = document.createElement("div");
            
            iframe1 = document.createElement("iframe");
            iframe2 = document.createElement("iframe");
            
            divScroller.appendChild(divScrollerInner);
            divLeft.appendChild(iframe1);
            divRight.appendChild(iframe2);
            
            iframe1.setAttribute("id", "iframe1");
            iframe1.setAttribute("id", "iframe2");
            
            divLeft.setAttribute("id", "divLeft");
            divLeft.setAttribute("style", "float: left; overflow: hidden;");
            
            divCenter.setAttribute("style", "background: #808080; width: 10px; float: left; height: 100%");
            divCenter.setAttribute("id", "divCenter");
            
            divRight.setAttribute("id", "divRight");
            divRight.setAttribute("style", "float: left; overflow:hidden;");
        
            divScroller.setAttribute("style", "width: 100%; height: 20px; overflow-y: hidden; overflow-x: scroll;");
            divScroller.setAttribute("id", "scroller");
            
            divScrollerInner.setAttribute("id", "innerScroller");
            $jq(divScrollerInner).html("&nbsp;");
            
            divOuter.setAttribute("style", "width: 100%; overflow-x: hidden; overflow-y: scroll;");
            divOuter.setAttribute("id", "divOuter");
        
            var td = container[0];
            try {
                var td = XPCNativeWrapper.unwrap(td);
            }
            catch (e) {}
            
            divOuter.appendChild(divLeft);
            divOuter.appendChild(divCenter);
            divOuter.appendChild(divRight);
            
            td.setAttribute("id", "iframeContainer");
            td.appendChild(divScroller);
            td.appendChild(divOuter);
            
            loadHtml(iframe1, aboutMessage);
            
            $jq(window).resize(resize);
            
            $jq("#scroller").scroll(function(event) {
                var offset = $jq("#scroller").scrollLeft() / innerScrollerWidth;
                $jq("#divLeft, #divRight").scrollLeft(offset * maxIframeWidth);
            });

            
            $jq("td.switcherItemActive, td.switcherItem").each(function (index, elem) {
                try {
                    elem = XPCNativeWrapper.unwrap(elem);
                }
                catch (e) {}
                
                var pageUrl = elem.item.pageUrl;
                var ptStart = pageUrl.indexOf("pt=") + 3;
                var ptEnd = pageUrl.indexOf("&widget");
                
                var key = pageUrl.substring(ptStart, ptEnd);
                var compareUrl = 
                    pageUrl.substring(0, pageUrl.indexOf("&t=")) + 
                    "&t=" + key + "&pt=" + key + "&widget=false" + 
                    pageUrl.substring(pageUrl.indexOf("&gid="));
                    
                $jq.ajax({
                    url: compareUrl,
                    success: function (data, textStatus, jqXHR) {
                        cachedComparePages[pageUrl] = data;
                        
                        if (elem.getAttribute("class") == "switcherItemActive") {
                            loadHtml(iframe1, data);
                            resize();
                        
                            if (!cachedPages[pageUrl])
                                loadHtml(iframe2, aboutMessage);
                        }
                    }
                });
                
                $jq(elem).css("color", "#606060");
                $jq.ajax({
                    async: true,
                    url: pageUrl,
                    success: function (data, textStatus, jqXHR) {
                        if (elem.getAttribute("class") == "switcherItemActive") {
                            loadHtml(iframe2, data);
                            resize();
                        }
                        
                        cachedPages[pageUrl] = data;
                        var bgs = data.match(/background-color:#[A-F0-9]{6}/gi);
                        for (var i in bgs) {
                            var color = bgs[i].substring(17).toLowerCase();
                            var r = color.substr(1,2);
                            var g = color.substr(3,2);
                            var b = color.substr(5,2);
                            if (r != g && r != g && g != b) {    // Don't code shades of gray (including white and black) as edits. These are cells with background colors in the document.
                                $jq(elem).css("background-color", color);    // TODO: Handle edits by multiple people (show all colors)
                            }
                        }
                        $jq(elem).css("color", "");

                        $jq(elem).bind('click', function(event) {
                            loadHtml(iframe1, cachedComparePages[pageUrl]);
                            loadHtml(iframe2, cachedPages[pageUrl]);
                            resize();
                        });
                    },
                    error: function () {    // TODO: Try reloading, or include reload link in sorryMessage
                        $jq(elem).css("text-decoration", "line-through"); 
                        $jq(elem).bind('click', function() {
                            loadHtml(iframe1, sorryMessage);
                        });
                    }
                });
            });
        }, 100);
    }
}
