// ==UserScript==
// @name         VeryCD Linker
// @namespace    http://jixun.org/
// @version      1.0.1.0
// @description  veryCD Linker
// @include      http://*.verycd.com/topics/*
// @include      http://verycd.com/topics/*
// @copyright    2012+, Jixun
// ==/UserScript==

(function () {
    var topicId = (location.href.match(/topics\/([\d]+)/i)||[,0])[1];
    if (!topicId) return;
    
    function byte2Str (inp) {
        var f = parseFloat (inp), unit = ['字节', 'KB', 'MB', 'GB', 'TB'], fUnit=0;
        while (f > 1126) {
            f /= 1024;
            fUnit += 1;
        }
        return f.toFixed(2).toString() + ' ' + (unit[fUnit]||'未知单位');
    }
    
    function ed2kLink (aHref) {
        var ed2kArr = aHref.substr(0, aHref.length-2).substr (13).split ('|');
        return ({
            name: decodeURI (ed2kArr[0]),
            size: parseInt (ed2kArr[1]),
            sizs: byte2Str (ed2kArr[1]),
            hash: ed2kArr[2],
            extr: ed2kArr[3]
        });
    }
    
    function buildTr (aHref) {
        var ed2k = ed2kLink (aHref),
            tr = document.createElement ('tr'),
            d1 = document.createElement ('td'),
            d2 = document.createElement ('td'),
            tbox = document.createElement ('input'),
            aLink = document.createElement ('a');
        
        d1.className   = 'post2';
        d2.className   = 'post2';
        tbox.type      = 'checkbox';
        tbox.className = 'fBoxT';
        tbox.value     = aHref;
        tbox.checked   = 'checked';
        
        aLink.textContent = ed2k.name;
        aLink.href = aHref;
        aLink.style.width = '600px';
        aLink.style.overflow = 'hidden';
        aLink.style.whiteSpace = 'nowrap';
        aLink.style.textOverflow = 'ellipsis';
        d2.textContent = ed2k.sizs;
        
        // 合并组件
        d1.appendChild (tbox);
        d1.appendChild (aLink);
        tr.appendChild (d1);
        tr.appendChild (d2);
        
        return tr;
    }
    
    var parseVeryCD = function (aLink) {
        log (['parseVeryCD', aLink]);
        var dlDiv = document.querySelector ('#iptcomED2K');
        var topDiv = document.createElement ('div'),
            mainDiv = document.createElement ('div'),
            bottomTr = document.createElement ('tr'),
            mainTable = document.createElement ('table');
        var sAll = document.createElement ('input'),
            dAll = document.createElement ('input'),
            sAlabel = document.createElement ('label'),
            tdBot = document.createElement ('td'),
            tdSiz = document.createElement ('td'),
            ePre = document.createElement ('pre');
        
        function updateSize () {
            var boxes = document.querySelectorAll ('.fBoxT'), tSize = 0, j = 0;
            for (var i=0; i<boxes.length; i++) {
                if (boxes[i].checked)
                    tSize += ed2kLink(boxes[i].value).size, j++;
            }
            tdSiz.textContent = byte2Str (tSize);
            sAll.checked = (j == i);
        }
        
        topDiv .innerHTML = '电驴链接';
        topDiv .className = 'emuletop';
        mainDiv.className = 'emulemain';
        tdSiz.id = 'allExpSize';
        tdSiz.className = 'emulesize post';
        tdSiz.style.background = 'inherit';
        mainTable.setAttribute ('cellpadding', '2');
        mainTable.setAttribute ('cellspacing', '1');
        mainTable.setAttribute ('width', '100%');
        
        // 全选
        sAll.id = 'sAll';
        sAll.checked = true;
        sAll.className = 'sAll';
        sAll.type = 'checkbox';
        sAlabel.setAttribute ('for', 'sAll');
        sAlabel.textContent = '全选';
        sAll.addEventListener ('click', function () {
            var boxes = document.querySelectorAll ('.fBoxT');
            for (var i=0; i<boxes.length; i++) {
                boxes[i].checked = this.checked;
            }
            updateSize ();
        }, false);
        
        // 导出链接
        dAll.type = 'button';
        dAll.value = '导出所选链接';
        dAll.className = 'button downall';
        dAll.style.marginLeft = '10px';
        dAll.addEventListener ('click', function () {
            ePre.innerHTML = '';
            var boxes = document.querySelectorAll ('.fBoxT');
            for (var i=0; i<boxes.length; i++) {
                if (boxes[i].checked)
                    ePre.textContent += boxes[i].value + '\n';
            }
            
            // 高亮选中文本
            var selection = unsafeWindow.getSelection();            
            var range = document.createRange();
            range.selectNodeContents(ePre);
            selection.removeAllRanges();
            selection.addRange(range);
            
        }, false);
        
        // 导出链接输出用样式表
        ePre.style.whiteSpace = 'pre-wrap';
        ePre.style.wordBreak = 'break-all';
        
        bottomTr.appendChild (sAll);
        bottomTr.appendChild (sAlabel);
        bottomTr.appendChild (dAll);
        bottomTr.appendChild (tdSiz);
        
        for (var i=0; i<aLink.length; i++) {
            mainTable.appendChild(buildTr (aLink[i]));
        }
        
        // 文件选择事件
        mainDiv.addEventListener ('click', function (e) {
            if (e.target.className == 'fBoxT')
                updateSize ();
        }, false);
        
        mainTable.appendChild(bottomTr);
        mainDiv.appendChild (mainTable);
        
        dlDiv.innerHTML = '';
        dlDiv.appendChild (topDiv);
        dlDiv.appendChild (mainDiv);
        dlDiv.appendChild (ePre);
        updateSize ();
    };
    
    log ('requesting page...');
    
    var parseStage1 = function (r) {
        var aLinks = parseHTML(r.responseText).querySelectorAll ('a[href*="/detail.htm?id="]');
        var aHrefs = [], lStat = [], finalEd2k = [];
        
        var checkIfReady = function () {
            if (lStat.join('').indexOf ('0') == -1)
                parseVeryCD (finalEd2k);
        };
        
        var parseStage2 = function ( id ) {
            var _arrId = id;
            log ('req Start : '+_arrId);
            GM_xmlhttpRequest ({
                url: aHrefs[i],
                method: 'GET',
                onload: function ( r ) {
                    log ('req Finish: '+_arrId);
                    finalEd2k [_arrId] = parseHTML ( r.responseText ).querySelector ('a[href^="ed2k://"]').href;
                    lStat [_arrId] = 1;
                    checkIfReady ();
                },
                synchronous: true,
            });
        }
        for (var i=0; i<aLinks.length; i++) {
            aHrefs.push (aLinks[i].href);
            lStat.push ('0');
            finalEd2k.push ('');
            parseStage2 (i);
        }
        
    };
    
    GM_xmlhttpRequest ({
        url: 'http://verycd.gdajie.com/topics/' + topicId,
        method: 'GET',
        onload: parseStage1
    });
})();