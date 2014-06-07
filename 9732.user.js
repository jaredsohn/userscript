// ==UserScript==
// @name		Page Age
// @namespace	http://userscripts.org/people/14536
// @description	Shows the "age" of a web page.
// @include		*
// @author		Vaughan Chandler
// ==/UserScript==

// Last edited June 8 2007

if (top.location == location) {
    
    function switchMode() {
        if (timing) {
            window.clearTimeout(timer);
            d.innerHTML = timeString;
        } else { updateElapsed(); }
        timing = !timing;
        if (GM_setValue) { GM_setValue('timing',timing); }
    }
   
    function updateElapsed() {
        var n = new Date();
        var x = (n.getTime() - t.getTime())/1000;
        if (x<60) { d.innerHTML = Math.floor(x) + 's'; }
        else if (x<3600) { d.innerHTML = Math.floor(x/60) + 'm'; }
        else { d.innerHTML = Math.floor(x/3600) + 'h'; }
        timer=setTimeout(updateElapsed, 1000);
    }
   
    var t = new Date();
    var timer;
    var timing;
    if (GM_getValue) { timing = GM_getValue('timing',true); }
    else { timing = true; }
   
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = '#pageAgeTimer { position:fixed; bottom:2px; right:12px; text-align:right; '+
        ' font-family:monospaced; font-size:12px; color:#888888; background:#ffffff; opacity:0.9; '+
        ' border:1px solid #dddddd; padding:2px; cursor:default; z-index:999999; }'+
        '#pageAgeTimer:hover { background:#eef6ff; font-size:16px; }';
    head.appendChild(style);
   
    var start = new Date();
    var h = start.getHours() % 12;
    var m = start.getMinutes(); buf = m+''; if (buf.length<2) { m='0'+m; }
    var s = start.getSeconds(); buf = s+''; if (buf.length<2) { s='0'+s; }
    var timeString = h + ':' + m + ':' + s;
   
    var d = document.createElement('div');
    d.id = 'pageAgeTimer';
    d.addEventListener("click",switchMode,true);
    d.addEventListener("dblclick",function(){document.getElementById('pageAgeTimer').style.display='none';},true);
    d.title = 'Page loaded at ' + timeString;
    document.body.appendChild(d);

    if (timing) {
        d.innerHTML = '--';
        updateElapsed();
    } else { d.innerHTML = timeString; }
   
}
