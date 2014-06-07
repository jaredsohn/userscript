// ==UserScript==
// @name           bg1
// @namespace      bg
// @include        https://braingames.ru/*
// @include        https://www.braingames.ru/*
// @include        http://braingames.ru/*
// @include        http://www.braingames.ru/*
// @grant          none
// ==/UserScript==

(function() {
    var STR = {
        board: '\u0428\u0430\u0445\u043C\u0430\u0442\u043D\u0430\u044F \u0434\u043E\u0441\u043A\u0430',
        wait: '\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435....',
        voting: '\u0413\u043E\u043B\u043E\u0441\u043E\u0432\u0430\u043D\u0438\u0435',
        weight: '\u0412\u0435\u0441',
        preview: '\u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440',
        allUnresolved: '\u0412\u0441\u0435 \u043D\u0435\u0440\u0435\u0448\u0435\u043D\u043D\u044B\u0435',
        checked: '\u0417\u0430\u0447\u0442\u0435\u043D\u043D\u044B\u0435',
        discussion: '\u041E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C\u044B\u0435',
        puzzleLink: '\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0443',
        topicNotFound: '\u0422\u0435\u043C\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430',
        puzzleTopicLink: '\u0422\u043E\u043F\u0438\u043A \u043D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435',
        allUserAnswers: '\u0412\u0441\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u0438\u0433\u0440\u043E\u043A\u0430',
        checkAnswers: '\u0412\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435',
        myChecked: '\u0417\u0430\u0447\u0442\u0435\u043D\u0430',
        mspace: '\u041C\u043E\u043D\u043E\u0448\u0438\u0440\u0438\u043D\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u043F\u0441\u0435\u0432\u0434\u043E\u0433\u0440\u0430\u0444\u0438\u043A\u0438',
        
        group: {
            moder: '\u041C\u043E\u0434\u0435\u0440\u0430\u0442\u043E\u0440\u044B',
            vip: 'VIP',
            gamer: '\u0418\u0433\u0440\u043E\u043A\u0438'
        }
    };
    
    var trueWin = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
    var doc = trueWin.document;
    var uscrCmd = getParam('userscriptcmd');
    
    function copy(src, dest) {
        for(var i in src) {
            if (src.hasOwnProperty(i)) { dest[i] = src[i]; }
        }
    }
    function getParam(pn, s) {
        return (RegExp('[?&]' + pn + '=([^&#]*)', 'i').exec(s || doc.location.href)||'')[1]||'';
    }
    function getUserGroup() {
        if (getUserGroup._grpvalue) { return getUserGroup._grpvalue; }
        var sel = doc.querySelector("span.group~span.group+span.score");
        return (getUserGroup._grpvalue = (sel && sel.textContent.replace(/^\s+|\s+$/g, "")));
    }
    var isOpera12m = /Presto/.test(navigator.userAgent);
    
    //------ puzzle content ----------------------------------------------------------------------------

    var handlePuzzleContent = (function() {
        function createChFrm(html) {
            var src = '/chess/index.php?userscriptcmd=embedchess';
            if(/https?:\/\/w?w?w?\.?braingames\.ru(\/chess\/?(index\.php)?\?figures=[a-z0-9_]+)/i.test(html)) {
                src = RegExp.$1 + '&userscriptcmd=embedchess';
            }
            var fr = doc.createElement('iframe');
            copy({name: 'chfrm' + (new Date()).valueOf(), src: src}, fr);
            copy({ margin: '4px 0 4px 0', padding: '0', width: '510px', height: '465px', 
                            border: '2px solid #a77e5c', display: 'none'}, fr.style);
            return fr;
        }
        function chessClick(e, id) {
            var i, a = e.target;
            a = a.wrappedJSObject || a;
            
            function ajaxCallback(html) {
                a.innerHTML = STR.board;
                if(html) {
                    a._chfrm = createChFrm(html);
                    var td = a.parentNode;
                    a._chfrm.style.display = 'block';
                    td.appendChild(a._chfrm);
                    a._showChess = true;
                    a.innerHTML = STR.board;
                } else { a.style.display = 'none'; }
            }
            
            e.preventDefault();
            if(a._showChess === 'loading') {
                return false;
            }
            var data = { type: 'comments', page: 1, commentsId: 0, puzzleId: id };
            if(!a._showChess) {
                if(!a._chfrm) {
                    a._showChess = 'loading';
                    a.innerHTML = STR.wait;
                    trueWin.jQuery.post('/ajax/comments.php', data, ajaxCallback);
                } else {
                    a._chfrm.style.display = 'block';
                    a._showChess = true;
                }
            } else { 
                a._chfrm.style.display = 'none';
                a._showChess = false;
            }
            return false;
        }
        function execChess(elem) {
            if (elem.id) {
                var a = doc.createElement('a');
                copy({ href: 'javascript:void(0);', innerHTML: STR.board }, a);
                copy({ display: 'block', width: '130px', padding: '2px 0 2px 0', outline: 'none' }, a.style);
                a.addEventListener("click", function(e) { return chessClick(e, elem.id); }, false);
                elem.td.appendChild(a);
            }
        }
        function imgClick(e) {
            var a = e.target;
            a = a.wrappedJSObject || a;
            if(!a._show1) {
                if(!a._img1) {
                    a._img1 = doc.createElement('img');
                    a._img1.src = a.href;
                    copy({paddingTop: '4px', display: 'block'}, a._img1.style);
                    var td = a;
                    while(td.tagName != 'TD') { td = td.parentNode; }
                    td.appendChild(a._img1);
                }
                a._img1.style.display = 'block';
            } else { 
                a._img1.style.display = 'none';
            }
            a._show1 = !a._show1;
            e.preventDefault();
        };
        function execTD(td) {
            var a1 = td.getElementsByTagName('a');
            if(!a1) { return; }
            for(var j=0; j<a1.length; ++j) {
                if(/\.(gif|png|jpe?g)$/i.test(a1[j].href) && !/<img/i.test(a1[j].innerHTML)) {
                    a1[j].addEventListener("click", imgClick, false);
                    a1[j]._show1 = false;
                }
            }
        }
        function _clickTopic() {
            var url = getPuzzleTopicUrl(this.__pzid);
            if (url) {
                this.href = url;
                this.onclick = null;
            }
        }
        function addTopicLink(item) {
            if (item.title) {
                var aPzl = doc.createElement("a");
                var url = getPuzzleTopicUrl(item.id);
                aPzl.style.outline = "0";
                aPzl.href = url || ("/copyright.php?userscriptcmd=gopzt&puzzle=" + item.id);
                //aPzl.innerHTML = "<b>" + STR.puzzleTopicLink + "</b>";
                aPzl.innerHTML = '<img src="/forum/style_images/bg/f_norm.gif" title="' + STR.puzzleTopicLink + '" style="opacity:0.5;border:0;outline:0;margin-right: 4px;" />';
                aPzl.target = "_blank";
                aPzl.__pzid = item.id;
                if (!url) { aPzl.onclick = _clickTopic; }
                item.title.parentNode.insertBefore(aPzl, item.title);
            }
        }
        
        return function(item) {
            execTD(item.td);
            if (item.chess) {
                execChess(item);
            }
            if (getUserGroup() == STR.group.moder) {
                addTopicLink(item);
            }
        };
    })();
    function getPuzzleElemData(a) {
        var tr1;
        while(a && ((a.tagName != 'TBODY') || (a.rows.length < 2))) { 
            tr1 = a;
            a = a.parentNode; 
        }
        if(!a){return null;}
        var atype = tr1.cells[0].getElementsByTagName('a')[0];
        
        if(!atype || (atype.className != 'taskcategory')) {return null;}
        
        var tools, td = a.rows[tr1.rowIndex+1].cells[0];
        
        if(a.rows.length == 2) {
            while(a && ((a.tagName != 'TBODY') || (a.rows.length < 5))) { 
                a = a.parentNode; 
            }
            tools = a && a.rows[4].cells[0];
        } else { tools = a.rows[3].cells[0]; }
        
        var id = getParam("puzzle") || getParam("puzzleId") || 0;
        if (!id) {
            if (tools) {
                a = tools.getElementsByTagName('a')[0];
                if (a && /puzzle=(\d+)/i.test(a.href)) { id = RegExp.$1; }
            }
        }
        var title = tr1.querySelector(".tasktitle");
        
        return {id: id, title: title, td: td, chess: /catname=chess/i.test(atype.href), tools: tools};
    }
    
    function addPuzzleIdLink(url, text, noStore) {
        if (/\(0*(\d+)\).{0,4}$/.test(text)) {
            var pzlId = RegExp.$1;
            if (/showtopic=(\d+)/.test(url) || /^(\d+)$/.test(url)) {
                var tid = RegExp.$1;
                try {
                    if (!noStore) {
                        trueWin.localStorage.setItem("pz" + pzlId, tid);
                    }
                    return pzlId;
                } catch (exc) {}
            }
        }
    }
    function getPuzzleTopicUrl(pzlId) {
        try {
            var tid = trueWin.localStorage.getItem("pz" + pzlId);
            return tid ? ("/forum/index.php?showtopic=" + tid) : null;
        } catch (e) { return null; }
    }
    function BB2HTML(id) {
        if (!id) { return ""; }
        var str = trueWin.convtex ? trueWin.convtex(id) : null;
        if (!str) { return ""; }
        var depth = 0;
        str = str.replace(/\[quote'\s*([^']+)'\]|\[\/quote\]/g, function(a,b) {
            if (a == "[/quote]") {
                if (depth > 0) {
                    depth--;
                    return "</td></tr></table>";
                } else {
                    return a;
                }
            } else {
                depth++;
                return '<table class="quoteTable" cellpadding="0" cellspacing="1"><tr><td class="quoteTd1">' + b + '</td></tr><tr><td class="quoteTd2">';
            }
        });
        while (depth > 0) {
            str = str + "</td></tr></table>";
            depth--;
        }
        return str;
    }
    //----------------------------------------------------------------------------
    function BeginChess() {
        if (uscrCmd == 'embedchess') {
            var tbl = doc.getElementById('board');
            var brs = doc.getElementsByTagName('br');
            for(var i=0; i<3; ++i) {
                brs[i] && (brs[i].style.display = 'none');
            }
            tbl.rows[tbl.rows.length-1].style.display = 'none';
        }
    }
    function BeginGoPuzzleTopic() {
        document.body.innerHTML = "";
        var currPzid = getParam("puzzle");
        var url = getPuzzleTopicUrl(currPzid);
        if (url) { 
            location.href = url;
            return;
        }
        function stop(url) {
            if (url) {
                location.href = url;
            } else {
                document.body.innerHTML = STR.topicNotFound;
            }
        }
        var pages = null, rnd = Math.round(Date.now()/180000);
        setTimeout(function() {
            (function f(url) {
                var x = new XMLHttpRequest();
                x.open("GET", url, false);
                x.onload = function() {
                    var rm, t = this.responseText;
                    if (!pages) {
                        if (t.indexOf("showforum=10") < 0) { return stop(); }
                        pages = [];
                        if (/class=['"]ipbpagespan['"][^>]*>([\s\S]+?)<\/div>/.test(t)) {
                            var rm, plinks = RegExp.$1, rx = /href=["'](f10-[1-9]\d*\.html)["']/g;
                            while(rm = rx.exec(plinks)) {
                                pages.push("/forum/lofiversion/index.php/" + rm[1] + "?_rand=" + rnd);
                            }
                        }
                    }
                    var found = false, rxTopics = /<li>[^<]*<a\s+href=['"]t(\d+)\.html['"]>([^<]+)<\/a>/g;
                    while(rm = rxTopics.exec(t)) {
                        found = (addPuzzleIdLink(rm[1], rm[2]) == currPzid) || found;
                    }
                    if (found) {
                        stop(getPuzzleTopicUrl(currPzid));
                    } else {
                        if (pages.length) { f(pages.pop()); } else { stop(); }
                    }
                };
                x.send();
            })("/forum/lofiversion/index.php/f10.html?_rand=" + rnd);
        }, 300);
    }
    function BeginForum() {
        var i, prms = {
            CODE: getParam('CODE'),
            act: getParam('act'),
            f: getParam('f'),
            do1: getParam('do')
        };
        
        if ((prms.f == '9') && (prms.act.toLowerCase() == 'post') && ((prms.do1 == 'new_post') || (parseInt(prms.CODE||'99', 10) == 0))) {
            var tbl = doc.getElementsByName('TopicTitle')[0];
            var tbl2 = doc.getElementsByName('TopicDesc')[0];
            
            trueWin.show_poll_form();  
            trueWin.poll_add_question();  
            trueWin.poll_add_choice("1");  
            trueWin.poll_add_choice("1");
            trueWin.poll_add_choice("1");
            doc.getElementsByName('poll_question')[0].value = STR.voting;
            doc.getElementById('question_1').value = STR.weight;
            doc.getElementById('choice_1_1').value = '1';
            doc.getElementById('choice_1_2').value = '0';
            doc.getElementById('choice_1_3').value = 'x';
        }
        var chbAddSent = doc.getElementsByName('add_sent')[0];
        if (chbAddSent && doc.getElementById('entered_name')) {
            chbAddSent.checked = true;
        }
        var tidLH = getParam("showtopic");
        if (tidLH && /\d+/.test(tidLH)) {
            var aForumNS = doc.querySelector('#navstrip>a:last-child');
            var fid;
            if (aForumNS && /^(9|10|19|25)$/.test(fid = getParam("showforum", aForumNS.href))) {
                var btitle = document.querySelector('.maintitle td img+b');
                var pzid;
                if (btitle && (pzid = addPuzzleIdLink(location.href, btitle.textContent, (fid == "19")))) {
                    var divPages = doc.querySelector('a[name="top"]~.ipbtable div');
                    if (divPages) {
                        var aPzl = doc.createElement("a");
                        aPzl.href = "/?path=comments&puzzle=" + pzid;
                        aPzl.innerHTML = "<b>" + STR.puzzleLink + "</b>";
                        aPzl.target = "_blank";
                        divPages.appendChild(aPzl);
                    }
                }
            }
        }
    }
    function BeginT3() {
        var tabl = doc.getElementsByTagName('table')[0];
        if (!tabl) {return;}
        var notModer = (getParam("nma")=="1");
        var styl = doc.createElement('style');
        styl.textContent = ' ' 
        
            + "#div_tools * {cursor: pointer;} " 
            + ".nochecked .trchecked, .noansw .transw, .nonone .trnone, .noves0 .trves0, "
            + ".noves1 .trves1, .noves2 .trves2, .noves3 .trves3, .noves4 .trves4, .noves5 .trves5, .novesx .trvesx {display: none;} "
            + (notModer ? "body>br,body>a { display: none; }" : "")
           
            + '';
        doc.getElementsByTagName('head')[0].appendChild(styl);
        var i, div1 = doc.createElement('div');
        div1.innerHTML = '<input type="checkbox" id="idcb_checked" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_answ" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_none" />'
            + '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_ves0" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_ves1" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_ves2" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_ves3" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_ves4" />'
            + '&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_ves5" />'
            + '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idcb_vesx" />'
            
            + '<i></i>';
        div1.style.padding = '14px 0 7px 0';
        div1.id = 'div_tools';
        
        tabl.parentNode.insertBefore(div1, tabl);
        
        var cbs = div1.getElementsByTagName('input');
        
        function handler() {
            var cn = '';
            for (var i=0; i<cbs.length; ++i) {
                if (!cbs[i].checked) { cn += (cn?' no':'no') + cbs[i].id.substr(5); }   
            }
            tabl.className = cn;
        }
        
        var strsLabel = ['\u0417\u0430\u0447\u0442\u0435\u043D\u043D\u044B\u0435', 
                   '\u041E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C\u044B\u0435',
                   '\u041D\u0435\u043E\u0442\u0432\u0435\u0447\u0435\u043D\u043D\u044B\u0435',
                   '\u0432\u0435\u0441 0', '\u0432\u0435\u0441 1', '\u0432\u0435\u0441 2', '\u0432\u0435\u0441 3', '\u0432\u0435\u0441 4', '\u0432\u0435\u0441 5', 
                   '\u0421\u043A\u0440\u044B\u0442\u044B\u0435'];
        
        for (i=0; i<cbs.length; ++i) {
            cbs[i].checked = true;
            cbs[i].addEventListener('click', handler, false);
            var lab = doc.createElement('label');
            lab.textContent = strsLabel[i];
            lab.htmlFor = cbs[i].id;
            cbs[i].parentNode.insertBefore(lab, cbs[i].nextSibling);
        }
        var trs = tabl.rows;
        for (i=0; i<trs.length; ++i) {
            var cves = '', textc1 = trs[i].cells[1].textContent; //'trves0 ';
            if (/\(([0-6])\)/.test(textc1)) { cves = 'trves' + RegExp.$1 + ' '; } else { cves = 'trvesx '; }
            var pzlImg = trs[i].cells[0].getElementsByTagName('img')[0];
            if (!pzlImg) {
                trs[i].className = cves + 'trnone';
            } else {
                if (notModer) {
                    var aDis = pzlImg.parentNode;
                    aDis.href = String(aDis.href).replace("path=admin", "path=privatedata").replace("action=answers", "action=allanswers");
                }
                trs[i].className = cves + (/folder_new/i.test(pzlImg.src) ? 'transw' : 'trchecked');
            }
        }
    }
    function BeginPrev() {
        function prev(btn, mult) {
            var msgBox = mult
                ? doc.getElementById("ansAnswerText" + btn.form.id.substr(4))
                : doc.getElementsByName("addCommentText")[0];
            if (!msgBox) { return; }
            var prevBtn = doc.createElement("span");
            prevBtn.innerHTML = STR.preview;
            copy({
                verticalAlign: "top",
                marginRight: "5px",
                height: "17px",
                background: "#828282",
                color: "#ffffff",
                display: "inline-block",
                padding: "2px 18px 0 18px",
                cursor: "pointer"
            }, prevBtn.style);
            
            btn.parentNode.insertBefore(prevBtn, btn);
            prevBtn.addEventListener("click", function() {
                if(!msgBox._pv11){
                    var divTitle = doc.createElement("div");
                    divTitle.innerHTML = STR.preview + ":";
                    copy({ padding:"7px 4px 4px 2px", textAlign:"left", color:"#000088" }, divTitle.style);
                    msgBox.parentNode.appendChild(divTitle);
                    msgBox._pv11 = doc.createElement("div");
                    copy({ border:"1px solid #999933", textAlign:"left", padding:"6px", background:"#ffffff" }, msgBox._pv11.style);
                    msgBox.parentNode.appendChild(msgBox._pv11);
                }
                msgBox._pv11.innerHTML = BB2HTML(msgBox.id);
            }, false);
        }
        var sendBtn = doc.getElementsByName("addComment")[0];
        if (sendBtn && !(sendBtn.form || ((sendBtn.id == "addComment") && /path=comments/.test(location.href)))) {
            return;
        }
        if (!sendBtn) {
            sendBtn = doc.getElementsByName("sendAnswer");
            for(var i=0; i<sendBtn.length; ++i) { prev(sendBtn[i], true); }
        } else {
            prev(sendBtn, false);
        }
    }
    function PhpImagesReloading() {
        function onerr() {
            if(this._nn) { 
                this._nn--; 
                this.src = this.src + "&" + this._nn; 
            }
        }
        var arr = doc.getElementsByTagName("img");
        for (var i=0; i<arr.length; ++i) {
            var im = arr[i];
            if(!im.naturalHeight && !im.onerror && /(latex|getimage)\.php\?/i.test(im.src)) {
                im.onerror = onerr;
                im._nn=10;
                if (im.complete) { im.onerror(); }
            }
        }
    }
    function BeginAllUnresolved() {
        doc.body.innerHTML = "";
        doc.title = "BG_Unresolved";
        var links = doc.querySelectorAll("head>link");
        for (var i=links.length-1; i>=0; --i) {
            links[i].parentNode.removeChild(links[i]);
        }
        function getMaxPage(html) {
            var r, n = 1, rxPages = /displayOpts[^>]+class="rating">(\d+)<\/a>/g;
            while (r = rxPages.exec(html)) {
                n = Math.max(n, parseInt(r[1], 10));
            }
            return n;
        }
        function resolvePuzzleHtml(html) {
            var r, rx = /<a[^>]*href="([^>]+)"[^>]*>([\s\S]+)<\/a>/g;
            var arr = [];
            html = html.replace(rx, function(a, b, c) { 
                arr.push('<br /><img src="' + b + '" />'); 
                return (c && c.indexOf("<img") >= 0) ? "" : c;
            });
            return html + arr.join("");
        }
        function showAll(parent, displayOpts, callback) {
            var maxPage = 1;
            (function _f(page) {
                var xh = new XMLHttpRequest();
                xh.open("GET", "/?displayOpts=" + displayOpts + "&page=" + page, true);
                xh.onload = function() {
                    var html = xh.responseText;
                    var r, rx = /"tasktitle"[^>]*>([^<]+)<[\s\S]{1,200}"taskcategory"[^>]*>([^<]+)<[\s\S]{1,250}"taskves"[^>]*>([^<]+)<[\s\S]+?#F4F4E8[^>]{0,15}>([\s\S]+?)<\/td>/g;
                    while (r = rx.exec(html)) {
                        var h3 = doc.createElement("b");
                        h3.textContent = r[1] + " (" + r[2] + ", " + r[3] + ")";
                        h3.style.fontSize = "17px";
                        h3.style.color = "#8A6B07";
                        parent.appendChild(h3);
                        parent.appendChild(doc.createElement("br"));
                        parent.appendChild(doc.createElement("br"));
                        var div = doc.createElement("span");
                        div.innerHTML = resolvePuzzleHtml(r[4]);
                        parent.appendChild(div);
                        parent.appendChild(doc.createElement("br"));
                        parent.appendChild(doc.createElement("br"));
                    }
                    if (page == 1) { maxPage = getMaxPage(html); }
                    if (page < maxPage) { _f(page + 1); } else { callback(); }
                };
                xh.overrideMimeType("text/html; charset=windows-1251");
                xh.send();
            })(1);
        }
        var prnt = doc.createElement("div");
        prnt.style.padding = "10px";
        prnt.className = "usrscr-all-unresolved-data";
        doc.body.style.minHeight = "400px";
        doc.body.style.background = "#fff url(/forum/uploads/post-17196-1388623767.gif) 50% 300px no-repeat";
        showAll(prnt, "unchecked", function() {
            doc.body.style.background = "#fff";
            var style1 = doc.createElement("style");
            style1.media = "print";
            style1.type = "text/css";
            style1.textContent = ".usrscr-all-unresolved-tools { display: none; } .usrscr-all-unresolved-data {padding: 1px !important; }";
            doc.getElementsByTagName("head")[0].appendChild(style1);
            doc.body.innerHTML = '<div class="usrscr-all-unresolved-tools" style="padding:10px 10px 0 10px;"><input type="button" value="select all" /></div>';
            doc.querySelector('.usrscr-all-unresolved-tools input').onclick = function() { trueWin.getSelection().selectAllChildren(doc.body.lastChild); };
            doc.body.appendChild(prnt);
        });
    }
    function BeginAnswersLinks() {
        function getMAUrl(pzid) {
            return "https://www.braingames.ru/index.php?path=admin&action=myanswers&answers=checked&puzzle=" + pzid + "&id=1";
        }
        if (getUserGroup() == STR.group.moder) {
            var votes = doc.querySelectorAll('[id^="vote_links_"]');
            var isAdmin = (location.search.indexOf("path=admin&action=answers&answers=underconsideration&puzzle=") >= 0);
            for (var i=0; i<votes.length; ++i) {
                if (votes[i].querySelector('a[id*="vote"]')) {
                    var td = doc.createElement('td');
                    td.setAttribute('valign', 'top');
                    td.style.whiteSpace = 'nowrap';
                    var id = votes[i].id.replace(/\D/g, "");
                    
                    td.innerHTML = (isAdmin ? ('| <a target="_blank" href="' + getMAUrl(id) + '">' + STR.myChecked + '</a> ') : '')
                        + '| <a href="/index.php?path=admin&action=answers&answers=underconsideration&puzzle=' + id + '">' 
                        + STR.discussion + '</a> | <a href="/index.php?path=admin&action=answers&answers=checked&puzzle=' + id + '">' + STR.checked + '</a>';
                    votes[i].parentNode.insertBefore(td, votes[i]);
                }
            }
        }
    }
    function BeginPuzzleContent() {
        var arr = doc.querySelectorAll("span.taskves");
        for(var i=0; i<arr.length; ++i) {
            var item = getPuzzleElemData(arr[i]);
            if(item) {
                handlePuzzleContent(item);
            }
        }
    }
    function BeginAllNCLink() {
        var lastLink = doc.querySelector('tr:last-child>td>a[href*="rss?key"]');
        if (lastLink) {
            var df1 = doc.createElement("td");
            df1.innerHTML = '<b><a target="_blank" href="/copyright.php?userscriptcmd=nc">' + STR.allUnresolved + '</a><sup style="color:red">new</sup></b>';
            var tr = lastLink.parentNode.parentNode;
            var trn = doc.createElement("tr");
            if (tr.cells.length > 1) {
                var tdp = doc.createElement("td");
                tdp.colSpan = tr.cells.length-1;
                trn.appendChild(tdp);
            }
            trn.appendChild(df1);
            tr.parentNode.appendChild(trn);
        }
    }
    function BeginT3Form() {
        var notModer = (getUserGroup() == STR.group.vip);
        function form(na) {
            var f = doc.createElement("form");
            f.target = "_blank";
            f.action = "/test/t3.php";
            if (na) { f.style.borderTop = "1px solid #bbb"; f.style.paddingTop = "3px"; }
            f.innerHTML = (notModer ? '<input type="hidden" name="nma" value="1" />' : '') +
                       '<b>' + STR.allUserAnswers + '</b> <input type="text" name="name" style="background-color:#' +
                       (!na ? 'dcdba5' : 'eee') + ';width:150px;border: 1px solid #222222;padding: 1px;" />' + 
                       '<input type="submit" value="-&gt;" style="background-color: #' + 
                       (!na ? 'aeab73' : 'aaa') + ';border: 1px solid #222222;cursor:pointer;" />';
            return f;
        }
        if(/path=admin/i.test(location.href)) {
            var a = trueWin.jQuery('td>a.adminmenu[href*="action=addPuzzle"]');
            var tb = a.closest('tbody');
            if (tb.length) {
                tb.append('<tr><td colspan="4" align="left" id="id_td_t3form"></td></tr>');
                doc.getElementById("id_td_t3form").appendChild(form());
            }
        }
        if (notModer || (getUserGroup() == STR.group.moder)) {
            var uac = doc.querySelector(".userinactive");
            if (uac) {
                var tr = uac.parentNode.parentNode.insertRow(-1);
                var td = tr.insertCell(0);
                var span = doc.createElement("span");
                span.innerHTML = STR.allUserAnswers + "...";
                span.style.color = "#999";
                span.style.cursor = "pointer";
                span.style.fontSize = "9px";
                span.addEventListener("click", function() {
                    td.removeChild(span);
                    var f = form(true);
                    td.appendChild(f);
                    try {
                        f.querySelector('input[name="name"]').focus();
                    } catch (exc) {}
                }, false);
                td.appendChild(span);
            }
        }
    }
    function BeginF34Link() {
        var action = getParam("action");
        if ((getParam("path") == "admin") && (((action == "quickcheck") && getParam("puzzleId")) || (/^(mylead|answers$)/.test(action) && getParam("puzzle") && getParam("user")))) {
            var taskves = doc.querySelector(".taskves");
            if (taskves) {
            	var td = taskves.parentNode.parentNode.insertCell(-1);
                td.style.paddingLeft = "40px";
                td.innerHTML = '<form target="_blank" method="post" action="//www.braingames.ru/forum/index.php?act=Search&CODE=01"> \
<input type="hidden" name="keywords" value="' + td.parentNode.querySelector(".tasktitle").textContent + '" /> \
<input type="hidden" name="namesearch" value="" /> \
<input type="hidden" name="forums[]" value="34" /> \
<input type="hidden" name="forums[]" value="67" /> \
<input type="hidden" name="prune" value="0" /> \
<input type="hidden" name="prune_type" value="newer" /> \
<input type="hidden" name="sort_key" value="last_post" /> \
<input type="hidden" name="sort_order" value="desc" /> \
<input type="hidden" name="search_in" value="titles" /> \
<input type="hidden" name="result_type" value="topics" /> \
<input type="submit" value="' + STR.checkAnswers + '" style="border: none; background: #f7f3c8; cursor: pointer; border-radius: 3px;" /> \
                </form>';
            }
        }
    }
    function BeginAnswerMonospace() {
        if (/admin|privatedata/.test(getParam("path"))) {
            var arr = doc.querySelectorAll("td.commentDate");
            function _cl() {
                var tr = this.parentNode.parentNode.nextSibling;
                if (tr.tagName != "TR") { tr = tr.nextSibling; }
                var td = tr.querySelector(".comments");
                if (td) {
                    //if (!td.getAttribute("mspace") && /&#\d+;/.test(td.textContent)) {
                    //    td.innerHTML = td.innerHTML.replace(/&amp;(#\d+;)/g, "&$1");
                    //}
                    td.setAttribute("mspace", (td.getAttribute("mspace") != "true"));
                }
            }
            for (var i = 0, n = arr.length; i<n; ++i) {
                arr[i].appendChild(doc.createElement("span"));
                var btn = doc.createElement("span");
                btn.textContent = "[###]";
                btn.title = STR.mspace;
                btn.style.marginLeft = "10px";
                btn.style.color = "#ccc";
                btn.style.cursor = "pointer";
                btn.style.border = "0";
                btn.addEventListener("click", _cl, false);
                arr[i].appendChild(btn);
            }
        }
    }
    function BeginCSS() {
        var style = doc.createElement("style");
        style.type = "text/css";
        style.textContent = ' \
.comments[mspace="true"] { white-space: pre-wrap; font-family: "Courier New"; } \
.comments[mspace="true"] br { display: none; } \
        ';
        doc.getElementsByTagName("head")[0].appendChild(style);
    }

    
    var loadedReadyStates = { interactive: true, complete: true };
    function Begin() {
        if (!doc.body || !loadedReadyStates[document.readyState]) { return 'notload'; }
        
        if(trueWin.__bgmsGMHandled) { return; }
        trueWin.__bgmsGMHandled = true;
        
        if(uscrCmd == 'nc') {
            return BeginAllUnresolved();
        }
        if(uscrCmd == "gopzt") {
            return BeginGoPuzzleTopic();
        }
        if(/braingames\.ru\/chess\//i.test(location.href)) {
            return BeginChess();
        }
        BeginCSS();
        if(/braingames\.ru\/forum\//i.test(location.href)) {
            return BeginForum();
        }
        if(/braingames\.ru\/test\/t3\./i.test(location.href)) {
            return BeginT3();
        }
        BeginAnswerMonospace();
        BeginPrev();
        BeginF34Link();
        BeginAnswersLinks();
        BeginPuzzleContent();
        BeginAllNCLink();
        BeginT3Form();
        if (!isOpera12m) {
            setTimeout(PhpImagesReloading, 1700);
        }
    }
    
    var begr = Begin();
    if(begr === 'notload') {
        doc.addEventListener("DOMContentLoaded", Begin, false);
    }
})();