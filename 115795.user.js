// ==UserScript==
// @name           BarRefaleliCounter
// @namespace      corky.net.dotan
// @description    counts mentions of celebs on Ynet home page (also xnet, nrg and mako
// @include        http://www.ynet.co.il/home/*.html
// @include        http://www.xnet.co.il/home/*.html
// @include        http://www.nrg.co.il/*
// @include        http://www.mako.co.il/*
// ==/UserScript==

var _bar__counted = false;
var _bar__exps = ['בר רפאלי', 'גלעד שליט', 'עדי הימלבלוי'];

function init() {
    if (_bar__counted || // done this
        top !== self || // iframe
        document.body === null) { 
        return;
    }
    try {
        var jq = window.jQuery || unsafeWindow.jQuery;
        var textWodge  = "תמונות בלעדיות מחתונת גלעד שליט ובר רפאלי. בצילום: בר רפאלי בבגד ים";
        textWodge = (jq) ? jq(document.body).text() : document.body.innerHTML;
        var exps = _bar__exps;
        var len = exps.length;
        var report = [];
        for (var i = 0; i< len; i++) {
            var exp = exps[i];
            console.log(exp);
            var regexp = new RegExp('(' + exp + ')', 'g');
            var myBars = textWodge.match(regexp);
            var barCount = (myBars === null || myBars.length === undefined ) ? 0 : myBars.length ;
            if (barCount === 0) 
                report.push("היום לא הזכרנו את " + exp + " אפילו פעם אחת. אולי היחצ\"ן חולה?");
            else 
                if (barCount === 1)
                    report.push("היום הזכרנו את " + exp + ' רק פעם אחת סמלית.');
                else 
                    if (barCount === 2) 
                        report.push("היום הזכרנו את " + exp + ' רק פעמיים.');
                    else 
                        report.push("היום הזכרנו את " + exp + ' רק ' + barCount + " פעמים.");
       }
       console.log(report.join("\n"));
       var el = makeElement(report.join("<br>\n"));
    }
    catch(e) {
        ;
        // alert(e);
    }
   _bar__counted = true;
}

function makeElement(report) {
    var newEl     = document.createElement('div');
    newEl.setAttribute('id', 'barCounterIsMadeOfAwesome');
    newEl.style.position = 'fixed';
    newEl.style.top = '20px';
    newEl.style.right = '20px';
    newEl.style.width = '360px';
    newEl.style.padding = '10px';
    newEl.style.borderWidth = '3px';
    newEl.style.borderStyle = 'solid';
    newEl.style.borderColor = '#666';
    newEl.style.backgroundColor = '#C00';
    newEl.style.color = '#EEE';
    newEl.style.fontSize = '19px';
    newEl.style.opacity = '0.8';
    newEl.style.borderRadius = '6px';

    newEl.setAttribute('dir', 'rtl');
    newEl.innerHTML = report;
    var replaceEl = document.getElementById('barCounterIsMadeOfAwesome');
    if (replaceEl)
        replaceEl.parentNode.replaceChild(newEl, replaceEl);
    else     
    	document.body.appendChild(newEl);
    return replaceEl;    
}

addEventListener("load",init,false);
