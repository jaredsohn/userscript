// ==UserScript==
// @name        SledujuFilmy
// @namespace   sledujufilmy
// @description Removes ads and improves navigation.
// @include     http://sledujufilmy.cz/*
// @include     http://netu.tv/*
// @include     http://cdn.netu.tv/*
// @version     2.70
// @grant       tomasb
// ==/UserScript==

(function() {
    var locals = false;
    var reload = false;
    
    if ('localStorage' in window && window['localStorage'] !== null && window['localStorage'] !== undefined) {
        locals = true;
        if (localStorage['_cbpa'] == "false") {
            // inform netutv frame
        }
    }
    //NetuTV
    if (window.location.href.indexOf('netu.tv') != -1) {
        if (window.location.href.indexOf('#keepPA') == -1) {
            var ad = document.getElementById('this-pays-for-bandwidth-container-hor');
            if (ad != null) {
                ad.parentElement.removeChild(ad);
            }
        }
        return;
    }
    
    if (locals) {
        var show = false;    
        var pbin = "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";
        var jbin = "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";
        var setupId = "sfs_setupw";
        try {
            var _ss = function() {
                show = !show;
                var sw = getDiv();        
                if (show) {
                    sw.style.display = "block";
                } else {
                    sw.style.display = "none";
                    if (reload) {
                        window.location.reload();
                    }
                }
            };
            var getDiv = function() {
                var sw = document.getElementById(setupId);
                if (sw == null) {
                    sw = document.createElement('DIV');
                    sw.style.zIndex = "2147483647";
                    sw.style.fontFamily = "Tahoma, Lucida, Sans";
                    sw.style.textShadow = "1px 1px 2px #aaaaaa";
                    sw.style.position = "fixed";
                    sw.style.width = "190px";
                    sw.style.height = "105px";
                    sw.style.backgroundColor = "white";
                    sw.style.backgroundImage = "url(data:image/jpeg;base64," + jbin + ")";
                    sw.style.boxShadow = "0px 0px 4px 2px rgba(0,0,0,0.5) inset";
                    sw.style.top = "65px";
                    sw.style.left = "20px";
                    sw.style.display = "none";
                    sw.style.margin = "0px";
                    sw.style.padding = "0px";
                    var st = "<style> #";
                    st += setupId + " p {margin:0 0 0 10px;padding:0;display:block;} #";
                    st += setupId + " input{position: absolute;right:6px;} #";
                    st += setupId + " span {padding: 0; margin: 4px 0 1px 6px;display:inline-block;}";
                    st += ".x {font-family: system,monospace;position:absolute;top:0;right:0;font-weight:900;cursor: pointer;height:14px;width:20px;text-align:center;}";
                    st += ".x:hover {text-shadow: 0px 0px 1px #000000;color:white;}</style>";
                    sw.innerHTML = st + "<span><strong>Remove</strong></span><div id='_sfs_x' class='x'>x</div><p>Side Ads<input id='_cbsa' type='checkbox'></p><p>Player Ads<input id='_cbpa' type='checkbox'></p><p>Facebook comments<input id='_cbfb' type='checkbox'></p><p>SocialNet Buttons<input id='_cbsb' type='checkbox'></p>";
                    sw.id = setupId;
                    document.body.appendChild(sw);
                    document.getElementById('_sfs_x').onclick = _ss;
                }
                return sw;
            };
            getDiv();
            if ('localStorage' in window && window['localStorage'] !== null && window['localStorage'] !== undefined) {
                document.getElementById('_cbsa').checked = !(localStorage['_cbsa'] == "false");
                document.getElementById('_cbpa').checked = !(localStorage['_cbpa'] == "false");
                document.getElementById('_cbfb').checked = localStorage['_cbfb'] == "true";
                document.getElementById('_cbsb').checked = localStorage['_cbsb'] == "true";
                var _sv = function(e) {        
                    var el = e.target || e.srcElement;
                    localStorage[el.id] = el.checked;
                    reload = true;
                };
                document.getElementById('_cbsa').onclick = _sv;
                document.getElementById('_cbpa').onclick = _sv;
                document.getElementById('_cbfb').onclick = _sv;
                document.getElementById('_cbsb').onclick = _sv;
            }
     
            var img = document.createElement('IMG');
            img.style.position = "fixed";
            img.style.top = "20px";
            img.style.left = "20px";
            img.style.margin = "0";
            img.style.padding = "0";
            img.style.border = "none";
            img.style.cursor = "pointer";
            img.style.zIndex = "2147483646";
            img.alt = "Setup";           
            img.onclick = _ss;
            img.src = "data:image/png;base64," + pbin;    
            document.body.appendChild(img);
        } catch (e) {
            alert(e.message);
        }
    }
    
    Array.prototype.contains = function(obj) {
        for (var x = 0; x < this.length; x++) {
            if (this[x] == obj) {
                return true;
            }
        }
        return false;
    }
    
    var toremove = [];
    var cntoremove = ['nadpis','vertical_banner_left','vertical_banner_right','horizontal_banner','horizontal_banner_mobile'];
    if (locals && localStorage['_cbfb'] == "true") {
        cntoremove.push('partners_permalinks');
        document.body.removeChild(document.getElementById('fb-root'));
        cntoremove.push('fb');
        cntoremove.push('fb-comments');
    }
    if (locals && localStorage['_cbsb'] == "true") {
        cntoremove.push('butonyahlasy');
    }
    if (!locals || !(localStorage['_cbsa'] == "false")) {
        cntoremove.push('banenr200');
        try {
            document.getElementById('show_h_up').style.width = '100%';
            //document.getElementsByClassName('wrapper')[0].style.width = '100%';
            document.getElementById('show_h_down').style.width = '100%';
            document.getElementById('PagerId').style.marginLeft = '45%';
            document.getElementById('PagerId').style.clear = 'both';
        } catch(e) {}
    }
    var all = document.getElementsByTagName('DIV');
    for (var i = 0; i < all.length; i++) {
        if (cntoremove.contains(all[i].className)) {
            toremove.push(all[i]);
        }
    }
    var all = document.getElementsByTagName('P');
    for (var i = 0; i < all.length; i++) {
        if (cntoremove.contains(all[i].className)) {
            toremove.push(all[i]);
        }
    }
    
    for (var i = 0; i < toremove.length; i++) {
        try {
            var p = toremove[i].parentNode;
            p.removeChild(toremove[i]);
        } catch (e) {}
    }

    var all = document.getElementsByTagName('DIV');
    var nahled = 0;
    var pl = null;
    for (var i = 0; i < all.length; i++) {
        if (all[i].className=='obsah') {
            if (!locals || !(localStorage['_cbsa'] == "false")) {
                all[i].style.width = '100%';   
            }
            var pager = document.getElementById('PagerId');
            if (pager != null) {
                var first = document.getElementById('show_h_up').nextSibling;
                var pagerUp = all[i].insertBefore(pager.cloneNode(true), first);
                pagerUp.style.display = 'block';
            }
        }
        if (all[i].className=='kategorie') {
            all[i].style.width = '100%';
        }
        if (all[i].className=='film_nahled') {
            all[i].style.boxShadow = '4px 4px 4px 1px rgba(0,0,0,0.3)';
            all[i].style.display = 'block';
            if (nahled == 0) {
                all[i].style.clear = 'both';
                nahled++;
            }
        }
    }
    
})();