// ==UserScript==
// @name          Play JigSaw
// @namespace     http://userscripts.org/scripts/show/5795
// @description   Play Shockwave daily jigsaw of any date in fullscreen, with history.
// @include       http://www.shockwave.com/contentPlay/shockwave.jsp?*
// @creator       private_lock@yahoo.com
// @date          2006-10-14
// ==/UserScript==
//
// First I wanted to play shockwaves daily jigsaw in fullscreen. Back then I
// produced a static HTML-Page loading the puzzel of the day into a
// fullscreen-browserwindow.
//
// Playing around with the values, I discovered, that I could play a lot more
// than just one puzzle a day, because they are all there on the shockwave
// server for the whole year. Therefore my selfmade page got browse links to
// play recent and even future jigsaws.
//
// After some time I got lost and added a history saved in a cookie to
// remember what I've already solved before. (Actually a jigsaw is assumed
// solved, if you view it for 5 minutes.)
//
// But with the new version of shockwave they came up with a session key. So I
// wrapped my static html-page into this GM-script to dynamically read a fresh
// session key. After 60 to 90 minutes the key expires. You can still finish
// your running jigsaw, but the navigation will fail and you must reload the
// page.


// locate the session key along with the HTML to display the jigsaw
var scriptcode = "";
var script = document.getElementsByTagName("script");
var SESSION_KEY = null;

for (i=0; i<script.length; i++)
    if (script[i].firstChild && script[i].firstChild.data) {
        SESSION_KEY =       // execute regular expression
            /var DISPLAY_MARKUP = (.+);/.exec(
            script[i].firstChild.data)
            [1];            // 0 whole match, 1 first subexpression in parenthesis
        if (SESSION_KEY)
            break;
    }

if (SESSION_KEY) {

// alert(SESSION_KEY);

window.moveTo(0,0);     // fullscreen
window.resizeTo(screen.availWidth,screen.availHeight);
window.document.close();
window.document.open(); // rewrite the whole document with my own
window.document.write(

// to further read, whats going on, I recommend looking with firefox at the
// source of the generated page, since the script is wrapped in as a string.

'<html>\n'+
'<head>\n'+
'<base href="http://www.shockwave.com">\n'+
'<title>Daily Jigsaw</title>\n'+
'<script type="text/javaScript" language="JavaScript">\n'+
'\n'+
'var dayMillis = 24*60*60*1000;\n'+
'var epoche = new Date(2006, 0, 1).getTime();   // year,month,day\n'+
'var listtag = "solvedJigSaw";   // magic string to recognize my cookie\n'+
'var separator = "v";\n'+
'var list = new Array();   // list of solved jigsaws - days relative to epoche (or range of days)\n'+
'\n'+
'function after(aRange) {\n'+
'    return aRange.end+1<this.begin;\n'+
'}\n'+
'\n'+
'function before(aRange) {\n'+
'    return aRange.after(this);\n'+
'}\n'+
'\n'+
'function contains(number) {\n'+
'    return this.begin<=number && number<=this.end;\n'+
'}\n'+
'\n'+
'function merge(aRange) {\n'+
'    if (aRange.begin<this.begin) this.begin = aRange.begin;\n'+
'    if (aRange.end  >this.end  ) this.end   = aRange.end  ;\n'+
'}\n'+
'\n'+
'function toString() {\n'+
'    if (this.begin == this.end)\n'+
'        return this.begin;\n'+
'    return this.begin + separator + this.end;\n'+
'}\n'+
'\n'+
'function toHTMLString() {\n'+
'    if (this.begin == this.end)\n'+
'        return \'<a href="javascript:jump(\'+this.begin+\')">\'+this.begin+"</a>";\n'+
'    return \'<a href="javascript:jump(\'+this.begin+\')">\'+this.begin+"</a>"+separator+\'<a href="javascript:jump(\'+this.end+\')">\'+this.end+"</a>";\n'+
'}\n'+
'\n'+
'function Range(begin,end) {\n'+
'    this.begin    = begin;\n'+
'    this.end      = end;\n'+
'\n'+
'    this.after    = after;\n'+
'    this.before   = before;\n'+
'    this.contains = contains;\n'+
'    this.merge    = merge;\n'+
'    this.toString = toString;\n'+
'    this.toHTMLString = toHTMLString;\n'+
'}\n'+
'\n'+
'function listToHTMLString() {\n'+
'    if (!list) return "";\n'+
'    var result = "";\n'+
'    for (i=0; i<list.length; i++) {\n'+
'        result += list[i].toHTMLString();\n'+
'        if (i<list.length-1) result+=","\n'+
'    }\n'+
'    return result;\n'+
'}\n'+
'\n'+
'function parseRange(aRangeStr) {\n'+
'    var i = aRangeStr.indexOf(separator);\n'+
'    if (i>0) {\n'+
'        var begin = parseInt(aRangeStr.substring(0,i),10);\n'+
'        var end   = parseInt(aRangeStr.substring(i+separator.length),10);\n'+
'        if (begin<=end)\n'+
'            return new Range(begin,end);\n'+
'        return new Range(end,begin);\n'+
'    } else {\n'+
'        var begin = parseInt(aRangeStr,10);\n'+
'        return new Range(begin,begin);\n'+
'    }\n'+
'}\n'+
'\n'+
'function compareTo(a,b) {\n'+
'    if (a.begin == b.begin)\n'+
'        return a.end - b.end;\n'+
'    return a.begin - b.begin;\n'+
'}\n'+
'\n'+
'var warnagain = true;\n'+
'\n'+
'function saveCookie() {\n'+
'    if (navigator.cookieEnabled)\n'+
'        document.cookie = listtag + "={" + list.join(",") + "}; expires=" + new Date(new Date().getTime() + 365*dayMillis).toGMTString() + ";";\n'+
'    else\n'+
'        if (window.statusbar && window.statusbar.visible == true)\n'+
'            window.defaultStatus = "Could not save history to cookie!";\n'+
'        else if (warnagain) {\n'+
'            alert("Could not save history to cookie!");\n'+
'            warnagain = false;\n'+
'        }\n'+
'}\n'+
'\n'+
'function insert(aRangeStr) {\n'+
'    var aRange = parseRange(aRangeStr);\n'+
'    if (!isNaN(aRange.begin))\n'+
'        if (!isNaN(aRange.end)) {\n'+
'//alert("insert "+aRange.toString()+" in "+list.join(","));\n'+
'            var toInsert = true;\n'+
'            var shift = 0;\n'+
'            for (i=0; i+shift<list.length; i++) {\n'+
'                if (shift>0) {\n'+
'                    list[i] = list[i+shift];\n'+
'                }\n'+
'                if (aRange.before(list[i])) {           // switch the one outside the list\n'+
'                    if (toInsert) {\n'+
'//alert(aRange.toString()+" before "+list[i].toString());\n'+
'                        var temp = list[i];\n'+
'                        list[i]  = aRange;\n'+
'                        aRange   = temp;\n'+
'//alert("now ins "+aRange.toString()+" in "+list.join(","));\n'+
'                    }\n'+
'                } else if (!aRange.after(list[i]))      // found an intersection\n'+
'                    if (toInsert) {\n'+
'                        toInsert = false;\n'+
'                        list[i].merge(aRange);\n'+
'                        aRange = list[i];\n'+
'//alert("merged "+aRange.toString()+" in "+list.join(","));\n'+
'                    } else {\n'+
'                        aRange.merge(list[i]);\n'+
'                        shift++;\n'+
'                        i--;                            // revisit i\n'+
'                    }\n'+
'            }\n'+
'            if (toInsert) list.push(aRange);            // just append to list\n'+
'            else for (i=0; i<shift; i++) list.pop();    // clear end of list\n'+
'        } else {\n'+
'            insert(aRange.begin);\n'+
'        }\n'+
'    else\n'+
'        if (!isNaN(aRange.end)) {\n'+
'            insert(aRange.end);\n'+
'        }\n'+
'//alert("done "+list.join(","));\n'+
'}\n'+
'\n'+
'function loadCookie() {\n'+
'    if (list) {\n'+
'        while (list.length>0)\n'+
'            delete list.pop();\n'+
'        delete list;\n'+
'    }\n'+
'    list = new Array();\n'+
'    if (document.cookie) {\n'+
'        var begin = document.cookie.indexOf(listtag);\n'+
'            begin = document.cookie.indexOf("{", begin) + 1;\n'+
'        var end   = document.cookie.indexOf("}", begin);\n'+
'        var liststr = document.cookie.substring(begin,end);\n'+
'//        alert(listtag + " = " + liststr + " (" + begin + "," + end + ")");\n'+
'        liststrarray = liststr.split(",");\n'+
'        for (j=0; j<liststrarray.length; j++) {\n'+
'            insert(liststrarray[j]);\n'+
'        }\n'+
'    }\n'+
'}\n'+
'\n'+
'function searchClosest(value) {\n'+
'    var first=0, last=list.length, middle=0;\n'+
'    if (last==0) return -1;\n'+
'    while (first<last-1) {\n'+
'        middle = Math.floor((first + last) / 2);\n'+
'        if (value<list[middle].begin)\n'+
'            last  = middle;\n'+
'        else if (value>list[middle].end)\n'+
'            first = middle;\n'+
'        else {\n'+
'            first = middle;\n'+
'            last  = middle;\n'+
'        }\n'+
'    }\n'+
'    return first;\n'+
'}\n'+
'\n'+
'function removeValue(value) {\n'+
'    var index = searchClosest(value);\n'+
'    var aRange = index<0 ? null : list[index];\n'+
'    if (aRange && aRange.contains(value)) {\n'+
'        if (aRange.begin==value) aRange.begin++;\n'+
'        if (aRange.end  ==value) aRange.end  --;\n'+
'        if (aRange.begin>aRange.end) {\n'+
'            list.splice(index,1);\n'+
'            delete aRange;\n'+
'        } else if (aRange.contains(value)) {\n'+
'            var first = new Range(aRange.begin, value-1);\n'+
'            aRange.begin = value+1;\n'+
'            list.splice(index,0,first)\n'+
'        }\n'+
'    }\n'+
'}\n'+
'\n'+
'function padWithZero(number) {\n'+
'    if (number<10) return "0"+number;\n'+
'    return number;\n'+
'}\n'+
'\n'+
'var SESSION_KEY = ' + SESSION_KEY + ';\n'+
'var today = new Date();\n'+
'var current = Math.floor((today.getTime() - epoche) / dayMillis);\n'+
'var year2,month,day;\n'+
'var myTimeOut;\n'+
'\n'+
'function updateNavigation() {\n'+
'    var index = searchClosest(current);\n'+
'    var aRange = index<0 ? null : list[index];\n'+
'    var solved = aRange && aRange.contains(current);\n'+
'    var background = \' bgcolor="\'+(solved ? "#77FF77" : "#FF7777")+\'"\';\n'+
'    document.getElementById("navigation").innerHTML = \' <table border=0 width=100%><tr><td align="center"\'+background+\'><a href="javascript:shift(-10)">-10</a> <a href="javascript:shift(-1)">previous</a> \'\n'+
'        + \'<a href="javascript:searchNew(false)">searchBack</a> \'\n'+
'        + padWithZero(day)+"."+padWithZero(month)+"."+year2+" ("\n'+
'        + \'<a href="javascript:\' + (solved ? "remove(current)" : "assumeSolved()") +\'">\'+current+"</a>"\n'+
'        + "|"+listToHTMLString()+")"\n'+
'        + \' <a href="javascript:searchNew(true)">searchForward</a>\'\n'+
'        + \' <a href="javascript:shift( 1)">next</a> <a href="javascript:shift(10)">+10</a> <tt id="time">0:00</tt> <a href="http://www.shockwave.com">shockwave</a> <a href="http://userscripts.org/scripts/show/5795">script</a></td></tr></table>\';\n'+
'}\n'+
'\n'+
'function remove(value) {\n'+
'    removeValue(value);\n'+
'    saveCookie();\n'+
'    updateNavigation();\n'+
'    if (myTimeOut) {\n'+
'        window.clearTimeout(myTimeOut);\n'+
'        delete myTimeOut;\n'+
'    }\n'+
'    myTimeOut = window.setTimeout("assumeSolved()", 5*60*1000);\n'+
'}\n'+
'\n'+
'function assumeSolved() {\n'+
'    insert(""+current);\n'+
'    saveCookie();\n'+
'    updateNavigation();\n'+
'    if (myTimeOut) {\n'+
'        window.clearTimeout(myTimeOut);\n'+
'        delete myTimeOut;\n'+
'    }\n'+
'}\n'+
'\n'+
'function showPuzzle() {\n'+
'    today.setTime(epoche + current*dayMillis);\n'+
'    var myheight = 430;\n'+
'    if (window.innerHeight) myheight = window.innerHeight-40;   // FireFox\n'+
'    else myheight = document.body.offsetHeight-70;              // IE\n'+
'    var game = SESSION_KEY;\n'+
'//    game = game.replace(/</g,"&lt;").replace(/>/g,"&gt;");\n'+
'    game = game.replace(/width="?\\d+"?/g , \'width="100%"\' );\n'+
'    game = game.replace(/height="?\\d+"?/g, \'height="\'+myheight+\'"\');\n'+
'\n'+
'    var prefix = "tf=daily/text/", delimiter = "_", infix = "/daily", postfix = ".txt";\n'+
'    year2 = (""+today.getFullYear()).substring(2,4), month = today.getMonth()+1, day = today.getDate();\n'+
'    var datekey = prefix + month + delimiter + year2 + infix + day + postfix;\n'+
'\n'+
'    game = game.replace(/tf=daily\\/text\\/\\d+_\\d+\\/daily\\d+\\.txt/gi, datekey);\n'+
'\n'+
'//    game = "current = "+current+";   list("+list.length+") = "+list.join(",");\n'+
'\n'+
'    document.getElementById("preplay").innerHTML = \'<div class="game_window">\' + game + "</div>";\n'+
'    updateNavigation();\n'+
'    if (myTimeOut) {\n'+
'        window.clearTimeout(myTimeOut);\n'+
'        delete myTimeOut;\n'+
'    }\n'+
'    myTimeOut = window.setTimeout("assumeSolved()", 5*60*1000);\n'+
'}\n'+
'\n'+
'function shift(offset) {\n'+
'    current += offset;\n'+
'    showPuzzle();\n'+
'}\n'+
'\n'+
'function jump(index) {\n'+
'    current = index;\n'+
'    showPuzzle();\n'+
'}\n'+
'\n'+
'function searchNew(forward) {\n'+
'    if (forward) current++; else current--;\n'+
'    var index = searchClosest(current);\n'+
'    var aRange = index<0 ? null : list[index];\n'+
'    if (aRange && aRange.contains(current))\n'+
'        if (forward) current = aRange.end  +1;\n'+
'        else         current = aRange.begin-1;\n'+
'    showPuzzle();\n'+
'}\n'+
'\n'+
'var startZeit = new Date().getTime();\n'+
'\n'+
'function timeStamp() {\n'+
'    var differenz = new Date();\n'+
'    differenz.setTime(differenz.getTime() - startZeit);\n'+
'    var h = differenz.getUTCHours();\n'+
'\n'+
'    document.getElementById("time").innerHTML =\n'+
'        (h>0 ? h+":" : "")+\n'+
'        padWithZero(differenz.getUTCMinutes())+":"+\n'+
'        padWithZero(differenz.getUTCSeconds());\n'+
'    delete differenz;\n'+
'}\n'+
'\n'+
'</script>\n'+
'</head>\n'+
'<body>\n'+
'\n'+
'<div id="preplay">\n'+
'</div>\n'+
'<div id="navigation">\n'+
'<script type="text/javaScript" language="JavaScript">\n'+
'loadCookie();\n'+
'showPuzzle();\n'+
'window.setInterval("timeStamp()", 200);\n'+
'</script>\n'+
'</div>\n'+
'\n'+
'</body>\n'+
'</html>\n'

);
window.document.close();
}
