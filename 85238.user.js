// ==UserScript==
// @name           Platinumw.org One Click Reporter Ver 1
// @namespace      http://www.platinumw.org
// @description    Reports dead links in the click of a button
// @include        http://www.platinumw.org/viewtopic.php*
// @author         ShadowAssassin stolen from Daniel.Blaze with some parts blagged from DarkImmortal's WBB:SC
// ==/UserScript==

var Clicks = new Array();
var anchors = document.getElementsByTagName("a");
for (var i = 0; i < anchors.length; i++) {
    var ankr = anchors[i];
    if(ankr.getAttribute("href")) {
        var ReportLink = ankr.getAttribute("href").match(/report.php\?p=[\d]+/gim);
        if (ReportLink != null) {
            var ReportID = /\d+/.exec(ReportLink);
            if (ReportID != null) { 
                Clicks[ReportID] = 0;
                newImg = document.createElement("img"); 
                newImg.src = 'http://i29.tinypic.com/3499pjq.jpg';
                newImg.style.margin = '0 0 0 3px';
                newImg.setAttribute("id", "deadlink_img_" + ReportID);

                newAnchorElement = document.createElement('a');
                newAnchorElement.setAttribute("id", "deadlink_" + ReportID);
                newAnchorElement.setAttribute("title", "One Click AutoReporter for Dead Links - Use with care!");
                newAnchorElement.setAttribute("href", '#report');
                newAnchorElement.appendChild(newImg);
                newAnchorElement.addEventListener("click", function() {
                    var RID = this.getAttribute("id").match(/[\d]+/);
                    Clicks[RID]++;
                    GM_addStyle("#deadlink_img_" + RID + " { margin: 0 0 0 7px!important; }");
                    if (Clicks[RID] >= 2) {
                        GM_addStyle("#deadlink_img_" + RID + " { margin: 0 0 0 14px!important; }");
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: 'http://www.platinumw.org/report.php?p='+RID,           
                            data: 'report_comments=This+topic+contained+dead+links.&report_reasons[]=11&submit=Submit',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            onload: function(data) {
                                if (data.responseText.indexOf("successfully") > 0) {
                                    GM_addStyle("#deadlink_" + RID + " { display: none!important; }");
                                } else {
                                    alert(" - Could Not Report Dead Links -\r\n\r\nAn error occured when submitting your edit.\r\n\r\nIf this keeps recurring, try using the full report page");
                                }
                            },
                            onerror: function(data) {
                                alert(" - Could Not Report Dead Links -\r\n\r\nAn error occured when submitting your edit.\r\n\r\nThis is probably because either Platinumw is lagging or you are lagging");
                            }
                        });
                    }
                }, true);
                
                ankr.parentNode.insertBefore(newAnchorElement, ankr.nextSibling);
                
            }
        }
    }
}