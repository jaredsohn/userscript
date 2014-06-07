// ------------------------------------------------------------------
// HotmailEnhanced.user.js
// http://www.bhelpuri.net/Trixie/Scripts/HotailEnhanced.user.js
//
// Copyright (c) 2005, Kaushik Sridharan
// This script is licensed under the MIT license.  See
// http://opensource.org/licenses/mit-license.php for more details.
//
// ------------------------------------------------------------------
//
// This script lets you preview messages from the message list view
// in Hotmail, without having to open individual messages. The
// envelope to the left of each message entry is converted to a link
// that opens a preview pane.
//
// You will also see the following set of links at the top of the list
// of messages:
//
//   Show: [Unread] [Read] [All]
//   Preview: [Unread] [Read] [All] [None]
//
// These links let you selectively show or preview messages.
//
// ------------------------------------------------------------------
//
// ==UserScript==
// @name          Hotmail Enhanced
// @namespace     http://www.bhelpuri.net/Trixie
// @description   Preview messages from the Hotmail message list
// @include       http://*.hotmail.msn.com/cgi-bin/HoTMaiL*
// @date          May 2005
// ==/UserScript==
// ------------------------------------------------------------------


(function(){

    var Previewer =
    {
        isIE: navigator.appName.indexOf("Microsoft") != -1,
        startMarker: /<table border=0 cellspacing=8 cellpadding=0 width=100% align=center nowrap>\s*<tr><td>/mi,
        endMarker: new RegExp("</td></tr>\\s*</table>\\s*</td></tr></table><div class=\"HT\"", "mi"),

        msgRows: new Array(),
        msgUrl: new Array(),
        previewRows: new Array(),
        visibleFlag: new Array(),

        extractMsg: function(s)
        {
            var start = s.search(Previewer.startMarker);
            s = s.substr(start);
            for(var i = 0; i < 3; ++i)
                s = s.substr(s.search(/>/) + 1); // skip the table tag, tr and td tags
            var end = s.search(Previewer.endMarker);
            s = s.substring(0, end);
            return s;
        },

        loadMsgContent: function(frame, url)
        {
            var xmlhttp = false;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            if(!xmlhttp) return;

            xmlhttp.open("GET", url, true);
            xmlhttp.onreadystatechange = function ()
            {
                if(xmlhttp.readyState == 4)
                {
                    var msg = Previewer.extractMsg(xmlhttp.responseText);
                    frame.innerHTML = msg;
                    var previewRow = frame.parentNode.parentNode;
                }
            }
            xmlhttp.send(null);
        },

        togglePreview: function(index)
        {
            if(Previewer.visibleFlag[index] == 0)
            {
                if(Previewer.previewRows[index] == null)
                {
                    Previewer.previewRows[index] = Previewer.createPreviewPane(Previewer.msgRows[index], Previewer.msgUrl[index]);
                }
                else
                {
                    Previewer.previewRows[index].style.display = Previewer.previewRows[index].previousSibling.style.display;
                }

                Previewer.visibleFlag[index] = 1;
            }
            else
            {
                Previewer.previewRows[index].style.display = "none";
                Previewer.visibleFlag[index] = 0;
            }
        },

        showPreview: function(index)
        {
            var fCachedOnly = false;

            var fToggle = (Previewer.visibleFlag[index] == 0);

            if(Previewer.visibleFlag[index] == 0)
            {
                if((fCachedOnly == false) || Previewer.previewRows[index] != null)
                {
                    Previewer.togglePreview(index);
                }
            }
        },

        hidePreview: function(index)
        {
            if(Previewer.visibleFlag[index] == 1)
            {
                Previewer.togglePreview(index);
            }
        },

        createToggler: function(row, index, url)
        {
            var doHoverThing = false;
            var tdIcon = row.childNodes[1];

            var anchor = document.createElement("a");
            anchor.href = "javascript:k_togglePreview(" + index + ");";

            if(doHoverThing == true)
            {
                anchor.setAttribute("onmouseover", "javascript:previewRowsShow(" + index + ");");
                anchor.setAttribute("onmouseout", "javascript:previewRowsHide(" + index + ");");
            }

            tdIcon.firstChild.setAttribute("border", "0");
            anchor.appendChild(tdIcon.removeChild(tdIcon.firstChild));

            anchor.setAttribute("title", "Preview Message");
            anchor.childNodes[0].alt = "Preview Message";

            if (Previewer.isIE)
            {
                var dummySpan = document.createElement("span");
                dummySpan.appendChild(anchor);
                tdIcon.appendChild(dummySpan);
            }
            else
            {
                tdIcon.appendChild(anchor);
            }

            if(index == 0)
            {
                k_togglePreview = Previewer.togglePreview;
                previewRowsShow = Previewer.showPreview;
                previewRowsHide = Previewer.hidePreview;
            }

            Previewer.msgRows[index] = row;
            Previewer.msgUrl[index] = url;
            Previewer.previewRows[index] = null;
            Previewer.visibleFlag[index] = 0;
        },

        createPreviewPane: function(row, url)
        {
            var previewRow = document.createElement("tr");

            var td1 = document.createElement("td");
            td1.colSpan = 5;
            var td2 = document.createElement("td");
            td2.colSpan = 2;
            var td3 = document.createElement("td");
            td3.colSpan = 2;

            previewRow.appendChild(td1);
            previewRow.appendChild(td2);
            previewRow.appendChild(td3);

            var frame = document.createElement("div");
            td2.appendChild(frame);
            row.parentNode.insertBefore(previewRow, row.nextSibling);

            frame.style.height = "150px";
            td2.style.height = "155px";
            frame.style.padding = "2px";
            frame.style.borderLeft = frame.style.borderRight = "1px solid #a0c6e5";
            frame.style.overflow = "auto";
            frame.style.left = td2.style.left;
            frame.style.top = td2.style.top;
            frame.innerHTML = "<div><font color='c0c0c0'>Loading message...</font></div>";

            // Hack to not make the date column resize
            td2.style.width = frame.style.width = td2.offsetWidth - 8;

            Previewer.loadMsgContent(frame, url);
            return previewRow;
        },

        fixLinks: function()
        {
            var jol = /^javascript:(ol|G)\('([^']*)'\);?$/;

            var count = 0;

            var msgTable = document.getElementById("MsgTable");
            if(!msgTable) return;

            var l = msgTable.getElementsByTagName('a');
            for (var i=0; i<l.length; i++)
            {
                var url = l[i].href;
                if (url.match(jol))
                {
                    url = url.replace(jol, '$2');
                }

                if(url.match(/\/cgi\-bin\/getmsg\?/))
                {
                    var row = l[i].parentNode.parentNode;

                    Previewer.createToggler(row, count, url + "&msgread=1");

                    // Increment again because createToggler just created an anchor which makes
                    // this anchor show up again in the enumeration
                    ++i;

                    ++count;
                }
            }

            // Hack to not make the Subject column resize.
            // This doesn't work IE though (using Trixie), but only in Firefox.
            var allRows = msgTable.getElementsByTagName("tr");
            var lastRow = allRows[allRows.length - 1];
            lastRow.childNodes[2].width = "";
        },

        previewBatch: function(tag)
        {
                for(var i = 0; i < Previewer.msgRows.length; ++i)
                {
                    var fShow = false;
                    if(tag == "all")
                        fShow = true;
                    else if(tag != "none")
                    {
                        var bgColor = Previewer.msgRows[i].getAttribute("bgColor");
                        fShow = ((tag == "unread") ? (bgColor == "#fff7e5") : (!bgColor));
                    }

                    if(fShow)
                    {
                        Previewer.msgRows[i].style.display = ""; // Row may have been hidden by ReadUnreadFilter
                        Previewer.showPreview(i);
                    }
                    else
                    {
                        Previewer.hidePreview(i);
                    }
                }
        },

        attachHeaderLinks: function()
        {
            var msgTable = document.getElementById("MsgTable");

            if (msgTable )
            {
                previewRowsBatch = Previewer.previewBatch;

                var actionTbl = msgTable.previousSibling;

                var actionCol = actionTbl.getElementsByTagName("td");

                var elem = document.createElement("font");
                elem.className = "CC";
                elem.innerHTML = "Preview: ";

                var unread = document.createElement("a");
                unread.href = "javascript:previewRowsBatch('unread');";
                unread.innerHTML = "Unread";

                var read = document.createElement("a");
                read.href = "javascript:previewRowsBatch('read');";
                read.innerHTML = "Read";

                var all = document.createElement("a");
                all.href = "javascript:previewRowsBatch('all');";
                all.innerHTML = "All";

                var none = document.createElement("a");
                none.href = "javascript:previewRowsBatch('none');";
                none.innerHTML = "None";

                var fillerElem = document.createElement("font");
                fillerElem.innerHTML = "&nbsp;"

                elem = actionCol[0].firstChild.parentNode.insertBefore(elem, actionCol[0].firstChild);
                unread = elem.parentNode.insertBefore(unread, elem.nextSibling);
                fillerElem = unread.parentNode.insertBefore(fillerElem, unread.nextSibling);
                read = fillerElem.parentNode.insertBefore(read, fillerElem.nextSibling);
                fillerElem = read.parentNode.insertBefore(fillerElem.cloneNode(fillerElem), read.nextSibling);
                all = fillerElem.parentNode.insertBefore(all, fillerElem.nextSibling);
                fillerElem = all.parentNode.insertBefore(fillerElem.cloneNode(fillerElem), all.nextSibling);
                none = fillerElem.parentNode.insertBefore(none, fillerElem.nextSibling);
                fillerElem = fillerElem.cloneNode(fillerElem);
                fillerElem.innerHTML = "&nbsp;&nbsp;&nbsp;"
                none.parentNode.insertBefore(fillerElem, none.nextSibling);
            }
        }
    };


    // Filter stuff by fm
    var ReadUnreadFilter =
    {
        show: function(s)
        {
            var msgTable = document.getElementById("MsgTable");
            var rows = Previewer.msgRows; // msgTable.getElementsByTagName("tr");

            // We check previewRows and show/hide the associated preview panes too

            for (var i = 0; i < rows.length; i++)
            {
                var bgColor = rows[i].getAttribute("bgColor");

                switch (s)
                {
                    case "all":
                        rows[i].style.display = "";
                        if(Previewer.visibleFlag[i] == 1)
                            Previewer.previewRows[i].style.display = Previewer.previewRows[i].previousSibling.style.display;
                        break;
                    case "unread":
                        if (!bgColor)
                        {
                            rows[i].style.display = "none";
                            if(Previewer.visibleFlag[i] == 1)
                                Previewer.previewRows[i].style.display = "none";
                        }
                        else if (bgColor == "#fff7e5")
                        {
                            rows[i].style.display = "";
                            if(Previewer.visibleFlag[i] == 1)
                                Previewer.previewRows[i].style.display = Previewer.previewRows[i].previousSibling.style.display;
                        }
                        break;
                    case "read":
                        var bgColor = rows[i].getAttribute("bgColor")
                        if (!bgColor)
                        {
                            rows[i].style.display = "";
                            if(Previewer.visibleFlag[i] == 1)
                                Previewer.previewRows[i].style.display = Previewer.previewRows[i].previousSibling.style.display;
                        }
                        else if (bgColor == "#fff7e5")
                        {
                            rows[i].style.display = "none";
                            if(Previewer.visibleFlag[i] == 1)
                                Previewer.previewRows[i].style.display = "none";
                        }
                        break;
                }
            }
        },

        init: function()
        {
            var msgTable = document.getElementById("MsgTable");

            if (msgTable)
            {
                f_show = ReadUnreadFilter.show;

                var actionTbl = msgTable.previousSibling;

                var actionCol = actionTbl.getElementsByTagName("td");

                var elem = document.createElement("font");
                elem.className = "CC";
                elem.innerHTML = "Show: ";

                var unread = document.createElement("a");
                unread.href = "javascript:f_show('unread');";
                unread.innerHTML = "Unread";

                var read = document.createElement("a");
                read.href = "javascript:f_show('read');";
                read.innerHTML = "Read";

                var all = document.createElement("a");
                all.href = "javascript:f_show('all');";
                all.innerHTML = "All";

                var fillerElem = document.createElement("font");
                fillerElem.innerHTML = "&nbsp;"

                elem = actionCol[0].firstChild.parentNode.insertBefore(elem, actionCol[0].firstChild);
                unread = elem.parentNode.insertBefore(unread, elem.nextSibling);
                fillerElem = unread.parentNode.insertBefore(fillerElem, unread.nextSibling);
                read = fillerElem.parentNode.insertBefore(read, fillerElem.nextSibling);
                fillerElem = read.parentNode.insertBefore(fillerElem.cloneNode(fillerElem), read.nextSibling);
                all = fillerElem.parentNode.insertBefore(all, fillerElem.nextSibling);
                fillerElem = fillerElem.cloneNode(fillerElem);
                fillerElem.innerHTML = "&nbsp;&nbsp;&nbsp;"
                all.parentNode.insertBefore(fillerElem, all.nextSibling);
            }
        }
    };

    Previewer.fixLinks();
    Previewer.attachHeaderLinks();

    // Uncomment as appropriate
    //
    //var defaultFilter = "unread";
    //var defaultFilter = "read";
    var defaultFilter = "all";
    ReadUnreadFilter.init();
    if (defaultFilter)
        ReadUnreadFilter.show(defaultFilter);

})();
