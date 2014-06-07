// ==UserScript==
// @id             cc98_shuilou_stat
// @name           cc98 shuilou stat
// @version        1.0
// @namespace      soda@cc98.org
// @author         soda <sodazju@gmail.com>
// @description    
// @include        http://www.cc98.org/dispbbs.asp*
// @run-at         document-end
// ==/UserScript==

(function () {
    var stat = {}, debut = {};

    function $(id) { return document.getElementById(id); }

    function xpath(expr, contextNode) {
        contextNode = contextNode || document;
        var xresult = document.evaluate(expr, contextNode, null,
                    XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
        var xnodes = [];
        var xres;
        while (xres = xresult.iterateNext()) {
            xnodes.push(xres);
        }

        return xnodes;
    }

    // parse the url get parameters
    function parseQS(url) {
        url = url.toLowerCase().split('#')[0];  // remove the hash part
        var t = url.indexOf('?');
        var params;

        var hash = {};
        if (t >= 0) {
            params = url.substring(t+1).split('&');
        } else {    // plain query string without '?' (e.g. in cookies)
            params = url.split('&');
        }
        for (var i = 0; i < params.length; ++i) {
            var val = params[i].split('=');
            hash[decodeURIComponent(val[0])] = decodeURIComponent(val[1]);
        }
        return hash;
    }

    function addStyles(css) {
        var head = document.getElementsByTagName("head")[0];
        var style = document.createElement("style");

        style.setAttribute("type", "text/css");
        style.innerHTML = css;
        head.appendChild(style);
    };

    function ajax(opts) {
        opts = {
            type: opts.type || "GET",
            url: opts.url || "",
            data: opts.data || null,
            contentType: opts.contentType || "application/x-www-form-urlencoded; charset=UTF-8",
            success: opts.success || function(){},
            async: opts.async || (opts.async === undefined)
        };
        var xhr = new XMLHttpRequest;
        xhr.open(opts.type, opts.url, opts.async);
        xhr.setRequestHeader("Content-type", opts.contentType);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                opts.success(xhr.responseText);
            }
        };
        xhr.send(opts.data);
    };

    function unescapeHTML(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    };


    function show() {
        var statBtn = document.createElement("a");
        statBtn.id = "do-stat";
        statBtn.href = "javascript: void(0)";
        var text = document.createTextNode("贴数统计");
        statBtn.appendChild(text);
        var progressMsg = document.createElement("span");
        progressMsg.id = "stat-progress";
        progressMsg.style.color = "red";
        var maxPageCount = document.createElement("div");
        maxPageCount.innerHTML = '<input id="thousand-pages-at-max" type="checkbox" checked><label for="thousand-pages-at-max">只统计前1000页</label>'
        var sortBy = document.createElement("div");
        sortBy.innerHTML = '<input id="by-count" name="sort-by" type="radio" checked><label for="by-count">按帖数排序</label>\n\
                            <input id="by-debut" name="sort-by" type="radio"><label for="by-debut">按首次出现排序</label>';

        var tmp = xpath("//td/a/img[@src='pic/blue/votenew.gif']")[0].parentNode.parentNode;
        tmp.appendChild(statBtn);
        tmp.appendChild(sortBy);
        tmp.appendChild(maxPageCount);
        tmp.appendChild(document.createElement("br"));
        tmp.appendChild(progressMsg);

        addStyles("\n\
            #do-stat {\n\
                display: inline-block; \n\
                vertical-align: 4px;\n\
                text-align: center;\n\
                width: 71px;\n\
                height: 17px;\n\
                margin-left: 3px;\n\
                border: 1px solid black;\n\
                border-radius: 6px;\n\
                background-color: #99CCFF;\n\
                color: #065AAE;\n\
                font-size: 13px;\n\
                text-shadow: white 1px 1px;\n\
            }\n\
        ");
    }

    function doStatistic() {
        var postCountRE = /<span id="topicPagesNavigation">本主题贴数\s*<b>(\d+)<\/b>/g;
        var postCount = parseInt((document.documentElement.innerHTML.match(postCountRE))[0].replace(postCountRE, "$1"));
        var pageCount = Math.ceil(postCount / 10);
        var maxPage;

        if (pageCount > 1000 && $("thousand-pages-at-max").checked) {
            maxPage = 1000;
        } else {
            maxPage = pageCount;
        }

        var urlParams = parseQS(location.href);
        (function parsePage(currentPage) {
            ajax({
                url: "http://www.cc98.org/dispbbs.asp?boardid=" + urlParams["boardid"] + "&id=" + urlParams["id"] + "&star=" + currentPage,
                success: function(text) {
                    $("stat-progress").innerHTML = "正在统计第" + currentPage + "页……";
                    
                    var nameRE = /<span style=\"color:\s*\#\w{6}\s*;\"><b>([^<]+)<\/b><\/span>/g;
                    var spanArr = text.match(nameRE);
                    spanArr.forEach(function(ele, index, arr) {
                        var name = ele.replace(nameRE, "$1");
                        if (stat[name]) {
                            stat[name] += 1;
                        } else {
                            stat[name] = 1;
                            debut[name] = (currentPage - 1) * 10 + index + 1;
                        }
                    });

                    if (currentPage === maxPage) {
                        $("stat-progress").innerHTML = "";
                        showResult();
                    } else {
                        parsePage(currentPage + 1)
                    }
                }
            });
        })(1);
    }

    function showResult() {
        var mask = document.createElement("div");
        mask.id = "stat-mask";

        var statDiv = document.createElement("div");
        statDiv.id = "stat-box";
        var re = document.createElement("div");
        re.style.listStyle = "none";

        var statTable = document.createElement("table");
        statTable.innerHTML = '<thead><tr><th>帖数排名</th><th>用户名</th><th>帖数</th><th>首次回复</th></tr></thead>';
        var statBody = document.createElement("tbody");

        var sortedKey;
        if ($("by-count").checked) {
            sortedKey = Object.keys(stat).sort(function(a, b) { return (stat[b] - stat[a]) || (debut[a] - debut[b]); });   // descending order
        } else {
            sortedKey = Object.keys(debut).sort(function(a, b) { return debut[a] - debut[b]; });   // ascending order
        }
        sortedKey.forEach(function(ele, index, arr) {
            var tr = document.createElement("tr");
            tr.innerHTML = ('<td>' + ('[' + (index+1) + '] ') + '</td>') 
                        + ('<td>' + unescapeHTML(ele) + '</td>')
                        + ('<td>' + stat[ele] + '</td>')
                        + ('<td>' + debut[ele] + '</td>');
            statBody.appendChild(tr);
        });

        statTable.appendChild(statBody);
        statDiv.appendChild(statTable);

        document.body.appendChild(mask);
        document.body.appendChild(statDiv);

        addStyles('\n\
            #stat-mask {\n\
                left: 0px;\n\
                top: 0px;\n\
                height: 100%;\n\
                width: 100%;\n\
                position:fixed;\n\
                z-index: 100;\n\
                opacity:0.75;\n\
                background-color: #222;\n\
                background-repeat: repeat;\n\
            }\n\
            #stat-box {\n\
                position: absolute;\n\
                top: 150px;\n\
                left: 40%;\n\
                opacity: 0.9;\n\
                background-color: #F7F9FB;\n\
                border-radius: 3px;\n\
                padding: 10px;\n\
                z-index: 9999;\n\
                text-align: left;\n\
            }\n\
        ');
        var ubb = "[table]" + statTable.innerHTML.replace(/<thead>|<\/thead>|<tbody>|<\/tbody>/g, "").replace(/<(\/?t[rhd])>/g, "[$1]") + "[/table]";
        var textarea = document.createElement("textarea");
        textarea.style.height = "100px";
        textarea.textContent = ubb;
        statDiv.appendChild(textarea);

        mask.addEventListener("click", function() {
            document.body.removeChild(mask);
            document.body.removeChild(statDiv);
        });
    }

    show();
    $("do-stat").addEventListener("click", doStatistic);

})();
