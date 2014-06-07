// ==UserScript==
// @name       Unicode Tamil TextBox
// @namespace  http://userscripts.org/scripts/show/345615
// @version    1.5
// @description  To convert text into tamil. Press F9 to toggle b/w tamil/english. Press F2 to show/hide help.
// @include	   *
// @require	   http://code.jquery.com/jquery-latest.min.js
// @copyright  2013+, You
// ==/UserScript==

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (s) {
        return this.slice(0, s.length) == s;
    };
}

if (typeof String.prototype.contains != 'function') {
    String.prototype.contains = function (s) {
        return this.indexOf(s) != -1;
    };
}
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (s) {
        return this.length >= s.length && this.substr(this.length - s.length) == s;
    };
}

this.$ = this.jQuery = jQuery.noConflict(true);

var isIE = document.all ? true : false;
var myimg = new Image();
var sPos = 0;
var isTh = false;
var isNg = false;
var kbmode = "roman";
var pkbmode = "roman";
var SplKeys = new Array();
var toShowHelp = true;
var webhome = "http://www.higopi.com";

var cookie_kbmode = 'ckkbmode';
var cookie_kbhelp = 'ckkbhelp';

SplKeys["ZR"] = 0;
SplKeys["BS"] = 8;
SplKeys["CR"] = 13;

function incfont(fontname, fontfile) {
    if (isIE)
        document.write("<STY" + "LE TYPE='text/css'>\n<!--\n@font-face {\n"
				+ "font-family: " + fontname + ";\nsrc:url(" + webhome + "/eot/" + fontfile + ".eot);\n"
				+ "}\n-->\n</ST" + "YLE>")
}

function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        return document.layers[objectId];
    } else {
        return false;
    }
} // getStyleObject


function showMap(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }

    if (!obj.checked)
    { hideMap(); return; }

    if (document.getElementById('KeyMapDiv') == null) {
        mapdiv = document.createElement('div');
        mapdiv.setAttribute('id', 'KeyMapDiv');
        mapdiv.setAttribute('align', 'left');
        mapdiv.onmousedown = downMap;
        mapdiv.onmouseup = upMap;
        bdy = document.getElementsByTagName('BODY')[0];
        bdy.appendChild(mapdiv);

        mapstyle = getStyleObject('KeyMapDiv');
        mapstyle.width = '140px';
        mapstyle.backgroundColor = '#FFFFFF';
        mapstyle.position = 'absolute';
        mapstyle.cursor = 'move';
    }
    else {
        mapdiv = document.getElementById('KeyMapDiv');
        mapstyle = getStyleObject('KeyMapDiv');
    }
    mapdiv.innerHTML = '<table border="0" cellpadding="0" cellspacing="0" style="border:3px solid #0e88af;background-color:#ffffff;width:100%;"><tr>'
						+ '<td style="background-color:#0e88af;color:#ffffff;" nowrap="nowrap"><b>&nbsp;Keypad Map - '
						+ lang.substring(0, 1).toUpperCase() + lang.substring(1) + '</b></td><td bgcolor="#0e88af" nowrap="nowrap" width="20" align="right">'
						+ '<div align="right" onclick="hideMap()" style="padding:2px;width:20px;text-align:right;background-color:#0e88af;color:#ffffff;cursor:default">'
						+ '<b> &nbsp; X &nbsp; </b></div></td></tr><tr><td colspan="2" align="center"><img name="KeyMap" src=' + myimg.src
						+ ' style="display:block"></td></tr></table>';
    mapstyle.left = '100px';
    if (isIE)
    { mapstyle.pixelTop = document.body.scrollTop + 100; }
    else
    { mapstyle.top = window.pageYOffset + 100 + "px"; }
    mapstyle.display = 'inline';
}

function moveMap(e) {
    mapdiv = document.getElementById('KeyMapDiv');
    mapstyle = getStyleObject('KeyMapDiv');

    if (!e) e = window.event;
    if (dragok) {
        if (isIE) { mapstyle.left = dx + e.clientX - tempX + "px"; mapstyle.top = dy + e.clientY - tempY + "px"; }
        else { mapstyle.left = dx + e.pageX - tempX + "px"; mapstyle.top = dy + e.pageY - tempY + "px"; }
        return false;
    }
}

var dx, dy, tempX, tempY;
var dragok = false;
var n = 500;

function downMap(e) {
    mapdiv = document.getElementById('KeyMapDiv');
    mapstyle = getStyleObject('KeyMapDiv');
    dragok = true;
    mapstyle.zIndex = n++;
    dx = parseInt(mapstyle.left + 0);
    dy = parseInt(mapstyle.top + 0);
    if (!e) e = window.event;
    if (isIE) { tempX = e.clientX; tempY = e.clientY; }
    else { tempX = e.pageX; tempY = e.pageY; }

    document.onmousemove = moveMap;

    return false;
}

function upMap() {
    dragok = false;
    document.onmousemove = null;
}

function hideMap() {
    mapstyle = getStyleObject('KeyMapDiv');
    mapstyle.display = 'none';
    if (document.post != null && document.post.showmap != null) {
        document.post.showmap.checked = false;
        if (document.post.savepref != null) {
            document.post.savepref.disabled = false;
            document.post.savepref.onclick = savePref;
        }
    }
}

function isEnglish(elem) {
    var alphaExp = /[a-zA-Z]+/;
    if (elem.match(alphaExp))
        return true;
    else
        return false;
}


function convertThis(e, numchar) {
    if (!isIE)
        Key = e.which;
    else
        Key = e.keyCode;
    Char = String.fromCharCode(Key);
    if (typeof numchar == "undefined")
        numchar = 4;
    if (isIE) {
        //IE9 processs the event faster. so cancel the bubble first and then process the key
        e.cancelBubble = true;
        e.returnValue = false;
        myField = e.srcElement;
        myField.caretPos = document.selection.createRange().duplicate();
        prevChar = myField.caretPos.text;
        diff = 0;
        cpos = getCursorPosition(myField);
        if (prevChar.length != 0)
            document.selection.clear();
        if (myField.value.length != 0 && cpos != "1,1") {
            myField.caretPos.moveStart('character', -1);
            prevChar = myField.caretPos.text;
            diff++;
        }
        if (prevChar == chnbin) {
            myField.caretPos.moveStart('character', -1);
            prevChar = myField.caretPos.text;
            diff++;
        }

        if (cpos[1] > numchar) {
            prevPrevChar = prevChar;
            myField.caretPos.moveStart('character', diff - numchar);
            prevChar = myField.caretPos.text;
            if (isEnglish(prevChar)) {
                prevChar = prevPrevChar;
                myField.caretPos.moveStart('character', numchar - diff);
            }
        }
        if (prevChar == "" && cpos != "1,1")
            prevChar = "\u000A";
        if (Key == 13)
            Char = "\u000A";

        myField.caretPos.text = getLang(prevChar, Char, 0)
    }
    else {
        myField = e.target;
        if (myField.selectionStart >= 0) {
            if (isSplKey(Key) || e.ctrlKey)
                return true;
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            txtTop = myField.scrollTop;
            if (myField.value.length == 0) {
                prevChar = "";
                myField.value = getLang(prevChar, Char, startPos)
            }
            else {
                prevChar = myField.value.substring(startPos - 1, startPos);
                prevStr = myField.value.substring(0, startPos - 1);
                if (prevChar == chnbin) {
                    prevChar = myField.value.substring(startPos - 2, startPos);
                    prevStr = myField.value.substring(0, startPos - 2);
                }
                cpos = getCursorPosition(myField);
                if (cpos[1] >= numchar) {
                    prevChar = myField.value.substring(startPos - numchar, startPos);
                    prevStr = myField.value.substring(0, startPos - numchar);
                    if (isEnglish(prevChar)) {
                        prevChar = myField.value.substring(startPos - 1, startPos);
                        prevStr = myField.value.substring(0, startPos - 1);
                        if (prevChar == chnbin) {
                            prevChar = myField.value.substring(startPos - 2, startPos);
                            prevStr = myField.value.substring(0, startPos - 2);
                        }
                    }
                }
                myField.value = prevStr + getLang(prevChar, Char, myField.selectionStart)
						  + myField.value.substring(endPos, myField.value.length);
            }
            myField.selectionStart = sPos;
            myField.selectionEnd = sPos;
            if ((myField.scrollHeight + 4) + "px" != myField.style.height)
                myField.scrollTop = txtTop;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    showCombi(e)
}

function toggleT(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }
    isTh = obj.checked;
    if (isTh)
        ta['t'] = "\u0BA4\u0BCD";
    else
        ta['t'] = "\u0B9F\u0BCD";
}

function toggleG(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }
    isNg = obj.checked;
    if (isNg)
        ta['g'] = "\u0B99\u0BCD";
    else
        ta['g'] = "\u0B95\u0BCD"
}

function toggleKBMode(e, obj) {
    if (obj != null) {
        pkbmode = kbmode;
        kbmode = obj.value;
        if (kbmode == "typewriter" && lang != 'english')
            myimg.src = webhome + "/images/ucedit/" + lang + "tw.png";
        else if (kbmode == "tamil99")
            myimg.src = webhome + "/images/ucedit/tamil99.png";
        else if (kbmode == "bamini")
            myimg.src = webhome + "/images/ucedit/tamilbamini.png";
        else if (kbmode == "modular")
            myimg.src = webhome + "/images/ucedit/tamilmodular.png";
        else if (kbmode == "vaanavil")
            myimg.src = webhome + "/images/ucedit/tamilvaanavil.png";
        else if (kbmode == "applete")
            myimg.src = webhome + "/images/ucedit/teluguapple.png";
        else
            myimg.src = webhome + "/images/ucedit/" + lang + ".png";
        //savepref = eval('document.' + obj.form.name + '.savepref');
        //if (savepref != null) {
        //    savepref.disabled = false;
        //    savepref.onclick = savePref;
        //}
    }
    else {
        if (!isIE)
            key = e.which;
        else
            key = e.keyCode;

        if (key == 120) {
            if (kbmode != "english") {
                pkbmode = kbmode;
                kbmode = "english";
            }
            else {
                kbmode = pkbmode;
                pkbmode = "english";
            }

setCookie(cookie_kbmode, kbmode, 365);
        }
else if (key == 113)
{
 toShowHelp = !toShowHelp;
setCookie(cookie_kbhelp, (toShowHelp ? '1' : '0'), 365);
}
    }
}

function savePref(e) {
    if (isIE)
        savepref = event.srcElement
    else
        savepref = e.target

    frm = savepref.form
    showmap = eval('document.' + frm.name + '.showmap');
    showhelp = eval('document.' + frm.name + '.showhelp');
    keybrd = eval('document.' + frm.name + '.keybrd');
    tha = eval('document.' + frm.name + '.tha');
    nga = eval('document.' + frm.name + '.nga');

    setCookie(lang + "_showmap", showmap.checked, 365);
    setCookie(lang + "_showhelp", showhelp.checked, 365);
    if (tha != null)
        setCookie(lang + "_tha", tha.checked, 365);
    if (nga != null)
        setCookie(lang + "_nga", nga.checked, 365);

    for (var i = 0; i < keybrd.length; i++)
        if (keybrd[i].checked)
            setCookie(lang + "_keybrd", keybrd[i].value, 365);
    savepref.disabled = true;
    savepref.blur();
}

function restorePref() {
    if (getCookie(lang + "_help") != null && document.post != null
		&& document.post.showhelp != null && document.post.savepref != null
		&& eval(getCookie(lang + "_showhelp"))) {
        document.post.showhelp.click();
        document.post.savepref.disabled = true;
    }

    if (getCookie(lang + "_tha") != null && document.post != null
		&& document.post.tha != null && document.post.savepref != null
		&& eval(getCookie(lang + "_tha"))) {
        document.post.tha.click();
        document.post.savepref.disabled = true;
    }

    if (getCookie(lang + "_nga") != null && document.post != null
		&& document.post.nga != null && document.post.savepref != null
		&& eval(getCookie(lang + "_nga"))) {
        document.post.nga.click();
        document.post.savepref.disabled = true;
    }

    if (getCookie(lang + "_keybrd") != null && document.post != null
		&& document.post.keybrd != null && document.post.savepref != null) {
        keybrdopt = getCookie(lang + "_keybrd");
        for (var i = 0; i < document.post.keybrd.length; i++)
            if (document.post.keybrd[i].value == keybrdopt) {
                document.post.keybrd[i].click();
                document.post.savepref.disabled = true;
            }
    }
    if (getCookie(lang + "_showmap") != null && document.post != null
		&& document.post.showmap != null && document.post.savepref != null
		&& eval(getCookie(lang + "_showmap"))) {
        document.post.showmap.click();
        document.post.savepref.disabled = true;
    }
}

function isSplKey(keynum) {
    retVal = false;
    for (i in SplKeys) {
        if (keynum == SplKeys[i])
            retVal = true;
    }
    return retVal;
}

function getLang(prv, txt, sP) {
    sPos = sP;
    prvPrv = prv;
    if (kbmode == "english") {
        retTxt = prv + txt;
        sPos++;
    }
    else if (kbmode == "typewriter") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "tw") == uugar)
            retTxt = mapLang(prv + txt, sP, "tw");
        else
            retTxt = prv + mapLang(txt, sP, "tw");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        if (lang == 'tamil');
        retTxt = canoFix(retTxt);
    }
    else if (kbmode == "tamil99") {
        if (isEnglish(prvPrv))
            prv = "";
        retTxt = mapLang(prv + txt, sP, "ta99");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
    }
    else if (kbmode == "applete") {
        if (isEnglish(prvPrv))
            prv = "";
        if ((prv.indexOf(":") != -1) || (prv.indexOf("/") != -1) ||
		    (prv.indexOf(";") != -1) || (prv.indexOf("?") != -1))
            retTxt = prv + mapLang(txt, sP, "teap");
        else
            retTxt = mapLang(prv + txt, sP, "teap");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
    }
    else if (kbmode == "bamini") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "taba") == uugar)
            retTxt = mapLang(prv + txt, sP, "taba");
        else
            retTxt = prv + mapLang(txt, sP, "taba");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        retTxt = typeOrderFix(retTxt);
        retTxt = canoFix(retTxt);
    }
    else if (kbmode == "vaanavil") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "tava") == uugar)
            retTxt = mapLang(prv + txt, sP, "tava");
        else
            retTxt = prv + mapLang(txt, sP, "tava");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        retTxt = typeOrderFix(retTxt);
        retTxt = canoFix(retTxt);
    }
    else if (kbmode == "modular") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "tamo") == uugar)
            retTxt = mapLang(prv + txt, sP, "tamo");
        else
            retTxt = prv + mapLang(txt, sP, "tamo");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        retTxt = canoFix(retTxt);
    }

    else {
        if (pkbmode == "english") {
            retTxt = prv + mapLang(txt);
            pkbmode = "roman";
        }
        else {
            if (isEnglish(prvPrv))
                prv = "";
            retTxt = mapLang(prv + txt);
            if (isEnglish(prvPrv))
                retTxt = prvPrv + retTxt;
        }
    }
    return retTxt;
}

function typeOrderFix(retTxt) {
    rexp = new RegExp('\u200C\u0BC6\u200C(.)', "g");
    retTxt = retTxt.replace(rexp, "$1\u0BC6");
    rexp = new RegExp('\u200C\u0BC7\u200C(.)', "g");
    retTxt = retTxt.replace(rexp, "$1\u0BC7");
    rexp = new RegExp('\u200C\u0BC8\u200C(.)', "g");
    retTxt = retTxt.replace(rexp, "$1\u0BC8");
    return retTxt;
}

function canoFix(retTxt) {
    //Correct ragaram + pulli
    retTxt = retTxt.replace('\u0BBE\u0BCD', "\u0BB0\u0BCD");
    //Correct Ogara otru
    retTxt = retTxt.replace('\u0BC6\u0BBE', "\u0BCA");
    //Correct Ogaara otru
    retTxt = retTxt.replace('\u0BC7\u0BBE', "\u0BCB");
    //Correct Augaaram
    retTxt = retTxt.replace('\u0B92\u0BB3', "\u0B94");
    //Correct Augara otru
    retTxt = retTxt.replace('\u0BC6\u0BB3', "\u0BCC");


    // re-split Ogaram + Lagaram +  otru
    mychar = "\u0B94([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0B92\u0BB3$1");
        sPos += 1;
    }
    // re-split Ogara otru + Lagaram +  otru
    mychar = "\u0BCC([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0BC6\u0BB3$1");
        sPos += 1;
    }


    // re-split egaram + ragaram + otru
    mychar = "\u0BCA([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0BC6\u0BB0$1");
        sPos += 1;
    }

    // re-split Egaaram + ragaram + otru
    mychar = "\u0BCB([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    var rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0BC7\u0BB0$1");
        sPos += 1;
    }
    // make aagaara otru + otru = ragaram + otru
    mychar = "\u0BBE([\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    retTxt = retTxt.replace(rexp, "\u0BB0$1");
    return retTxt;
}


function mapLang(txt, sP, mod) {
    if (sP != null)
        sPos = sP;
    prvlen = txt.length;
    txtarr = eval(lang.substring(0, 2));
    if (mod != null && mod == "tw")
        txtarr = eval(lang.substring(0, 2) + "tw");
    if (mod != null && (mod == "teap" || mod == "ta99" || mod == "taba" || mod == "tava" || mod == "tamo"))
        txtarr = eval(mod);
    retTxt = "";
    for (itm in txtarr) {
        rexp = new RegExp(itm, "g");
        txt = txt.replace(rexp, txtarr[itm]);
    }
    sPos += (txt.length - prvlen + 1);
    return txt;
}

function getCursorPosition(textarea) {
    var txt = textarea.value;
    var len = txt.length;
    var erg = txt.split("\n");
    var pos = -1;
    if (typeof document.selection != "undefined") { // FOR MSIE
        range_sel = document.selection.createRange();
        range_obj = textarea.createTextRange();
        range_obj.moveToBookmark(range_sel.getBookmark());
        range_obj.moveEnd('character', textarea.value.length);
        pos = len - range_obj.text.length;
    }
    else if (typeof textarea.selectionStart != "undefined") { // FOR MOZILLA
        pos = textarea.selectionStart;
    }
    if (pos != -1) {
        for (ind = 0; ind < erg.length; ind++) {
            len = erg[ind].length + 1;
            if (pos < len)
                break;
            pos -= len;
        }
        ind++; pos++;
        return [ind, pos]; // ind = LINE, pos = COLUMN
    }
}

function showCombi(e) {
    if (document.getElementById('HelpDiv') == null) {
        helpdiv = document.createElement('div');
        helpdiv.setAttribute('id', 'HelpDiv');
        helpdiv.setAttribute('align', 'left');
        if (isIE) {
            bdy = e.srcElement.parentNode;
            bdy.insertBefore(helpdiv, e.srcElement);
        }
        else {
            bdy = e.target.parentNode;
            bdy.insertBefore(helpdiv, e.target);
        }

    }
    else {
        helpdiv = document.getElementById('HelpDiv');
    }
    helpstyle = getStyleObject('HelpDiv');
    if (!toShowHelp || kbmode != 'roman')
    { helpstyle.display = 'none'; return; }

    prevWord = getLang(prevChar, Char, 0)
    if (isLangOtru(prevWord.substring(prevWord.length - 1)))
        prevWord = prevWord.substring(prevWord.length - 2)
    else
        prevWord = prevWord.substring(prevWord.length - 1)

    helptxt = "";
    prevLet = getLang(prevWord, Char, 0); prevLet = prevLet.substring(prevLet.length - 1);
    var helpTextBorder = 'lightgray'; /*'#0DE8E9';*/
    var helpTextBackground = 'whitesmoke'; /*'#BDE8E9';*/
    if (prevWord != "" && !isLangOtru(prevWord) && prevLet != getLang('', Char, 0)) {
        if (Char == 'a' || Char == 'i' || Char == 'u' || Char == 'e' || Char == 'o') {
            helptxt = '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + ' + Char + ' = <b>' + getLang(prevWord, Char, 0) + "</b></td>";
            if (Char == 'a')
                helptxt += '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + i = <b>' + getLang(prevWord, 'i', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
						  + prevWord + ' + u = <b>' + getLang(prevWord, 'u', 0) + "</b></td>";
        }
        else if (Char != getLang('', Char, 0)) {
            helptxt = '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + a = <b>' + getLang(prevWord, 'a', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + A = <b>' + getLang(prevWord, 'A', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + i = <b>' + getLang(prevWord, 'i', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + I = <b>' + getLang(prevWord, 'I', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + u = <b>' + getLang(prevWord, 'u', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + U = <b>' + getLang(prevWord, 'U', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + e = <b>' + getLang(prevWord, 'e', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + E = <b>' + getLang(prevWord, 'E', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + a + i = <b>' + getLang(getLang(prevWord, 'a', 0), 'i', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + o = <b>' + getLang(prevWord, 'o', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + o = <b>' + getLang(prevWord, 'O', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
				+ prevWord + ' + a + u = <b>' + getLang(getLang(prevWord, 'a', 0), 'u', 0) + '</b></td>'
            if (lang == 'tamil') {
                if (getLang('', 't', 0) == prevWord)
                    helptxt += '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + h = <b>' + getLang(prevWord, 'h', 0) + '</b></td>';
                if (getLang('', 's', 0) == prevWord)
                    helptxt += '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + h = <b>' + getLang(prevWord, 'h', 0) + '</b></td>';
                if (getLang('', 'S', 0) == prevWord)
                    helptxt += '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + r + I = <b>' + getLang(getLang(prevWord, 'r', 0), 'I', 0) + '</b></td>';
                if (getLang('k', 'n', 0).indexOf(prevWord) > 0)
                    helptxt += '<td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">' + prevWord + ' + t + h = <b>' + getLang(getLang(prevWord, 't', 0), 'h', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
								+ prevWord + ' + g = <b>' + getLang(prevWord, 'g', 0) + '</b></td><td style="font-size:12px;border:1px solid ' + helpTextBorder + ';">'
								+ prevWord + ' + j = <b>' + getLang(prevWord, 'j', 0) + "</b></td>";
            }
        }
        helpdiv.innerHTML = '<table cellpadding="1" cellspacing="2" border="0" style="padding: 1px;color:gray;border:1px solid ' + helpTextBorder + ';background-color:' + helpTextBackground + '"><tr>' + helptxt + '</tr></table>';
        helpstyle.display = 'block';

        if (!isIE) {
            var targetElm = $(e.target);
            if(targetElm.css('position') == 'absolute')
            {
                var top = targetElm.height() + 20;
                helpstyle.position = 'absolute';
                helpstyle.top = (targetElm.offset().top - top > 0 ? '-' : '') + (top) + 'px';
            }
        }

    }
    else
        helpstyle.display = 'none';
    if (isIE) e.srcElement.onblur = hideHelp;
    else e.target.onblur = hideHelp;
}

function isLangOtru(letter) {
    isOtru = false;
    otruArr = new Array('\u200C',
	"\u0BCD", "\u0BBE", "\u0BBF", "\u0BC0", "\u0BC1", "\u0BC2", "\u0BC6", "\u0BC7", "\u0BC8", "\u0BCA", "\u0BCB", "\u0BCC", // Tamil
	"\u0C4D", "\u0C3E", "\u0C3F", "\u0C40", "\u0C41", "\u0C42", "\u0C46", "\u0C47", "\u0C48", "\u0C4A", "\u0C4B", "\u0C4C", "\u0C43", "\u0C44", "\u0C01", "\u0C02", "\u0C03",  //Telugu
	"\u094D", "\u093E", "\u093F", "\u0940", "\u0941", "\u0942", "\u0946", "\u0947", "\u0948", "\u094A", "\u094B", "\u094C", "\u0901", "\u0902", "\u0903", // Hindi
	"\u0D3E", "\u0D3F", "\u0D40", "\u0D41", "\u0D42", "\u0D43", "\u0D47", "\u0D46", "\u0D48", "\u0D4A", "\u0D4B", "\u0D4C", "\u0D4D", "\u0D02", "\u0D03",  //Malayalam
	"\u0CBE", "\u0CBF", "\u0CC0", "\u0CC1", "\u0CC2", "\u0CC3", "\u0CC4", "\u0CC6", "\u0CC7", "\u0CC8", "\u0CCA", "\u0CCB", "\u0CCD", "\u0CCC", "\u0C82", "\u0C83", //Kannada
	"\u0ABE", "\u0ABF", "\u0AC0", "\u0AC1", "\u0AC2", "\u0AC5", "\u0AC7", "\u0AC8", "\u0AC9", "\u0ACB", "\u0ACC", "\u0ACD", "\u0A81", "\u0A82", "\u0A83", //Gujarathi
	"\u0B3E", "\u0B3F", "\u0B40", "\u0B41", "\u0B42", "\u0B46", "\u0B47", "\u0B48", "\u0B4A", "\u0B4B", "\u0B4C", "\u0B4D", "\u0B01", "\u0B02", "\u0B03", //Oriya
	"\u09BE", "\u09BF", "\u09C0", "\u09C1", "\u09C2", "\u09C6", "\u09C7", "\u09C8", "\u09CA", "\u09CB", "\u09CC", "\u09CD", "\u0981", "\u0982", "\u0983", //Bengali
	"\u0A3E", "\u0A3F", "\u0A40", "\u0A41", "\u0A42", "\u0A46", "\u0A47", "\u0A48", "\u0A4A", "\u0A4B", "\u0A4C", "\u0A4D", "\u0A50", "\u0A03"//Punjabi
	);
    for (i = 0; i < otruArr.length; i++)
        if (otruArr[i] == letter)
            isOtru = true;
    return isOtru;
}

function showHelp(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }
    toShowHelp = obj.checked;
    helpstyle = getStyleObject('HelpDiv');
    if (!toShowHelp)
        helpstyle.display = 'none';
}

function hideHelp() {
    helpstyle = getStyleObject('HelpDiv');
    helpstyle.display = 'none';
}

function toggleScreen() {
    objectId = "logo";
    // cross-browser function to get an object's style object given its
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        styleObj = document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        styleObj = document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        styleObj = document.layers[objectId];
    } else {
        return false;
    }
    if (styleObj.paddingTop == "" || styleObj.paddingTop == "156px") {
        styleObj.paddingTop = "56px";
        document.getElementById("updownarrow").src = webhome + "/templates/siteground39/images/downarrow.gif";
        setCookie("ScreenPref", "Half", 365);
    }
    else {
        styleObj.paddingTop = "156px";
        document.getElementById("updownarrow").src = webhome + "/templates/siteground39/images/uparrow.gif";
        setCookie("ScreenPref", "Full", 365);
    }
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

var lang = "tamil";
var chnbin = "\u0BCD";
var ugar = "\u0BC1";
var uugar = "\u0BC2";
myimg.src = "/images/ucedit/" + lang + ".png"
var tatw = new Array();
tatw['\\!'] = "\u0BB8";
tatw['\\$'] = "\u0B9C";
tatw['\\%'] = "\u0BC1";
tatw['\\^'] = "\u0BC2";
tatw['\\&'] = "\u0BB7";
tatw['_'] = "\u0BB8\u0BCD\u0BB0\u0BC0";
tatw['q'] = "\u0BA3\u0BC1";
tatw['w'] = "\u0BB1";
tatw['e'] = "\u0BA8";
tatw['r'] = "\u0B9A";
tatw['t'] = "\u0BB5";
tatw['y'] = "\u0BB2";
tatw['u'] = "\u0BB0";
tatw['i'] = "\u0BC8";
tatw['o'] = "\u0B9F\u0BBF";
tatw['p'] = "\u0BBF";
tatw['\\['] = "\u0BC1";
tatw['\\]'] = "\u0B94";
tatw["\\\\"] = "\u0B95\u0BCD\u0BB7";
tatw['Q'] = "\u0B9E\u0BC1";
tatw['W'] = "\u0BB1\u0BC1";
tatw['E'] = "\u0BA8\u0BC1";
tatw['R'] = "\u0B9A\u0BC1";
tatw['T'] = "\u0B95\u0BC2";
tatw['Y'] = "\u0BB2\u0BC1";
tatw['U'] = "\u0BB0\u0BC1";
tatw['I'] = "\u0B90";
tatw['O'] = "\u0B9F\u0BC0";
tatw['P'] = "\u0BC0";
tatw['\\{'] = "\u0BC2";
tatw['\\}'] = "\u0BC2";
tatw['a'] = "\u0BAF";
tatw['s'] = "\u0BB3";
tatw['d'] = "\u0BA9";
tatw['f'] = "\u0B95";
tatw['g'] = "\u0BAA";
tatw['h'] = "\u0BBE";
tatw['j'] = "\u0BA4";
tatw['k'] = "\u0BAE";
tatw['l'] = "\u0B9F";
tatw['\\;'] = "\u0BCD";
tatw['\\\''] = "\u0B99";
tatw['A'] = "\u0BB1\u0BBE";
tatw['S'] = "\u0BB3\u0BC1";
tatw['D'] = "\u0BA9\u0BC1";
tatw['F'] = "\u0B95\u0BC1";
tatw['G'] = "\u0BB4\u0BC1";
tatw['H'] = "\u0BB4";
tatw['J'] = "\u0BA4\u0BC1";
tatw['K'] = "\u0BAE\u0BC1";
tatw['L'] = "\u0B9F\u0BC1";
tatw['\\:'] = "\u00B0";
tatw['\\"'] = "\u0B9E";
tatw['z'] = "\u0BA3";
tatw['x'] = "\u0B92";
tatw['c'] = "\u0B89";
tatw['v'] = "\u0B8E";
tatw['b'] = "\u0BC6";
tatw['n'] = "\u0BC7";
tatw['m'] = "\u0B85";
tatw[','] = "\u0B87";
tatw['Z'] = "\u0BB9";
tatw['X'] = "\u0B93";
tatw['C'] = "\u0B8A";
tatw['V'] = "\u0B8F";
tatw['B'] = "\u0B83";
tatw['N'] = "\u0B9A\u0BC2";
tatw['M'] = "\u0B86";
tatw['\\<'] = "\u0B88";
tatw['\\|'] = "!";
tatw['\\`'] = "&";
tatw['\\.'] = ",";
tatw['/'] = ".";
tatw['\\#'] = "%";
tatw['\\~'] = ";";
tatw['-'] = "/";
tatw['\\@'] = "\"";
tatw['\\>'] = "-";
tatw['\u0BC1\u0BC2'] = "\u0BC2";
//Phonetic 
var ta = new Array();
ta['f'] = "qp";
ta['B'] = "b";
ta['C'] = "c";
ta['D'] = "d";
ta['F'] = "qp";
ta['G'] = "g";
ta['H'] = "h";
ta['J'] = "j";
ta['K'] = "k";
ta['M'] = "m";
ta['P'] = "p";
ta['Q'] = "q";
ta['T'] = "t";
ta['V'] = "v";
ta['W'] = "w";
ta['X'] = "x";
ta['Y'] = "y";
ta['Z'] = "z";
//Cons 
ta['\u0BA8\u0BCDg'] = "\u0B99\u0BCD";
ta['\u0BA9\u0BCDg'] = "\u0B99\u0BCD";
ta['\u0BA8\u0BCDj'] = "\u0B9E\u0BCD";
ta['\u0BA9\u0BCDj'] = "\u0B9E\u0BCD";
ta['\u0B9F\u0BCDh'] = "\u0BA4\u0BCD";
ta['\u0B9A\u0BCDh'] = "\u0BB7\u0BCD";
ta['\u0BA9\u0BCD\u0BA4\u0BCD'] = "\u0BA8\u0BCD\u0BA4\u0BCD";
ta['ng'] = "\u0B99\u0BCD";
ta['nj'] = "\u0B9E\u0BCD";
ta['th'] = "\u0BA4\u0BCD";
ta['sh'] = "\u0BB7\u0BCD";
ta['k'] = "\u0B95\u0BCD";
ta['g'] = "\u0B95\u0BCD";
ta['c'] = "\u0B9A\u0BCD";
ta['s'] = "\u0B9A\u0BCD";
ta['t'] = "\u0B9F\u0BCD";
ta['d'] = "\u0B9F\u0BCD";
ta['N'] = "\u0BA3\u0BCD";
ta[' n'] = " \u0BA8\u0BCD";
ta['^n'] = "\u0BA8\u0BCD";
ta['\nn'] = "\n\u0BA8\u0BCD";
ta['w'] = "\u0BA8\u0BCD";
ta['p'] = "\u0BAA\u0BCD";
ta['b'] = "\u0BAA\u0BCD";
ta['m'] = "\u0BAE\u0BCD";
ta['y'] = "\u0BAF\u0BCD";
ta['r'] = "\u0BB0\u0BCD";
ta['l'] = "\u0BB2\u0BCD";
ta['v'] = "\u0BB5\u0BCD";
ta['R'] = "\u0BB1\u0BCD";
ta['L'] = "\u0BB3\u0BCD";
ta['z'] = "\u0BB4\u0BCD";
ta['n'] = "\u0BA9\u0BCD";
ta['S'] = "\u0BB8\u0BCD";
ta['h'] = "\u0BB9\u0BCD";
ta['j'] = "\u0B9C\u0BCD";
ta['x'] = "\u0B95\u0BCD\u0BB7\u0BCD";
//adjVows Small 
ta['\u0BCDa'] = "\u200C";
ta['\u0BCDi'] = "\u0BBF";
ta['\u0BCDu'] = "\u0BC1";
ta['\u0BCDe'] = "\u0BC6";
ta['\u0BCDo'] = "\u0BCA";
ta['\u200Ci'] = "\u0BC8";
ta['\u200Cu'] = "\u0BCC";
//adjVows Big 
ta['\u200Ca'] = "\u0BBE";
ta['\u0BBFi'] = "\u0BC0";
ta['\u0BC1u'] = "\u0BC2";
ta['\u0BC6e'] = "\u0BC7";
ta['\u0BCAo'] = "\u0BCB";
ta['\u0BCDA'] = "\u0BBE";
ta['\u0BCDI'] = "\u0BC0";
ta['\u0BCDU'] = "\u0BC2";
ta['\u0BCDE'] = "\u0BC7";
ta['\u0BCDO'] = "\u0BCB";
//Vows 
ta['~'] = "\u200D";
ta['\u0B85i'] = "\u0B90";
ta['\u0B85u'] = "\u0B94";
ta['ai'] = "\u0B90";
ta['au'] = "\u0B94";
ta['\u0B85a'] = "\u0B86";
ta['\u0B87i'] = "\u0B88";
ta['\u0B89u'] = "\u0B8A";
ta['\u0B8Ee'] = "\u0B8F";
ta['\u0B92o'] = "\u0B93";
ta['a'] = "\u0B85";
ta['A'] = "\u0B86";
ta['i'] = "\u0B87";
ta['I'] = "\u0B88";
ta['u'] = "\u0B89";
ta['U'] = "\u0B8A";
ta['e'] = "\u0B8E";
ta['E'] = "\u0B8F";
ta['o'] = "\u0B92";
ta['O'] = "\u0B93";
ta['q'] = "\u0B83";
//Nums 
ta['\u0BF10'] = "\u0BF2";
ta['\u0BF00'] = "\u0BF1";
ta['\u0BE70'] = "\u0BF0";
ta['1\u200D'] = "\u0BE7";
ta['2\u200D'] = "\u0BE8";
ta['3\u200D'] = "\u0BE9";
ta['4\u200D'] = "\u0BEA";
ta['5\u200D'] = "\u0BEB";
ta['6\u200D'] = "\u0BEC";
ta['7\u200D'] = "\u0BED";
ta['8\u200D'] = "\u0BEE";
ta['9\u200D'] = "\u0BEF";
ta['0\u200D'] = "0";
//Other Adjustments 
ta['\u0B9A\u0BCD\u0BB0\u0BBF'] = "\u0BB8\u0BCD\u0BB0\u0BC0";
ta['\u0BB7\u0BCD\u0BB0\u0BBF'] = "\u0BB8\u0BCD\u0BB0\u0BC0";
ta['(.+)\u200C(.+)'] = "$1$2";
// Tamil 99 keys 
var ta99 = new Array();
//caret symbol for special purposes 
ta99['\\^'] = "\u200C";
// mellina vallina rule 
ta99["\u0B99\u200Ch"] = "\u0B99\u0BCD\u0B95\u200C";
ta99["\u0B9E\u200C\\["] = "\u0B9E\u0BCD\u0B9A\u200C";
ta99["\u0BA3\u200Co"] = "\u0BA3\u0BCD\u0B9F\u200C";
ta99["\u0BA8\u200Cl"] = "\u0BA8\u0BCD\u0BA4\u200C";
ta99["\u0BAE\u200Cj"] = "\u0BAE\u0BCD\u0BAA\u200C";
ta99["\u0BA9\u200Cu"] = "\u0BA9\u0BCD\u0BB1\u200C";
//auto pulli rule for same letter repeat 
ta99["\u0BB3\u200Cy"] = "\u0BB3\u0BCD\u0BB3\u200D";
ta99["\u0BB3\u0BCD{2}"] = "\u0BB3\u0BCD\u0BB3\u200C";
ta99["\u0BB1\u200Cu"] = "\u0BB1\u0BCD\u0BB1\u200D";
ta99["\u0BB1\u0BCD{2}"] = "\u0BB1\u0BCD\u0BB1\u200C";
ta99["\u0BA9\u200Ci"] = "\u0BA9\u0BCD\u0BA9\u200D";
ta99["\u0BA9\u0BCD{2}"] = "\u0BA9\u0BCD\u0BA9\u200C";
ta99["\u0B9F\u200Co"] = "\u0B9F\u0BCD\u0B9F\u200D";
ta99["\u0B9F\u0BCD{2}"] = "\u0B9F\u0BCD\u0B9F\u200C";
ta99["\u0BA3\u200Cp"] = "\u0BA3\u0BCD\u0BA3\u200D";
ta99["\u0BA3\u0BCD{2}"] = "\u0BA3\u0BCD\u0BA3\u200C";
ta99["\u0B9A\u200C\\["] = "\u0B9A\u0BCD\u0B9A\u200D";
ta99["\u0B9A\u0BCD{2}"] = "\u0B9A\u0BCD\u0B9A\u200C";
ta99["\u0B9E\u200C\\]"] = "\u0B9E\u0BCD\u0B9E\u200D";
ta99["\u0B9E\u0BCD{2}"] = "\u0B9E\u0BCD\u0B9E\u200C";
ta99["\u0B95\u200Ch"] = "\u0B95\u0BCD\u0B95\u200D";
ta99["\u0B95\u0BCD{2}"] = "\u0B95\u0BCD\u0B95\u200C";
ta99["\u0BAA\u200Cj"] = "\u0BAA\u0BCD\u0BAA\u200D";
ta99["\u0BAA\u0BCD{2}"] = "\u0BAA\u0BCD\u0BAA\u200C";
ta99["\u0BAE\u200Ck"] = "\u0BAE\u0BCD\u0BAE\u200D";
ta99["\u0BAE\u0BCD{2}"] = "\u0BAE\u0BCD\u0BAE\u200C";
ta99["\u0BA4\u200Cl"] = "\u0BA4\u0BCD\u0BA4\u200D";
ta99["\u0BA4\u0BCD{2}"] = "\u0BA4\u0BCD\u0BA4\u200C";
ta99["\u0BA8\u200C;"] = "\u0BA8\u0BCD\u0BA8\u200D";
ta99["\u0BA8\u0BCD{2}"] = "\u0BA8\u0BCD\u0BA8\u200C";
ta99["\u0BAF\u200C\'"] = "\u0BAF\u0BCD\u0BAF\u200D";
ta99["\u0BAF\u0BCD{2}"] = "\u0BAF\u0BCD\u0BAF\u200C";
ta99["\u0BB5\u200Cv"] = "\u0BB5\u0BCD\u0BB5\u200D";
ta99["\u0BB5\u0BCD{2}"] = "\u0BB5\u0BCD\u0BB5\u200C";
ta99["\u0B99\u200Cb"] = "\u0B99\u0BCD\u0B99\u200D";
ta99["\u0B99\u0BCD{2}"] = "\u0B99\u0BCD\u0B99\u200C";
ta99["\u0BB2\u200Cn"] = "\u0BB2\u0BCD\u0BB2\u200D";
ta99["\u0BB2\u0BCD{2}"] = "\u0BB2\u0BCD\u0BB2\u200C";
ta99["\u0BB0\u200Cm"] = "\u0BB0\u0BCD\u0BB0\u200D";
ta99["\u0BB0\u0BCD{2}"] = "\u0BB0\u0BCD\u0BB0\u200C";
ta99["\u0BB4\u200C/"] = "\u0BB4\u0BCD\u0BB4\u200D";
ta99["\u0BB4\u0BCD{2}"] = "\u0BB4\u0BCD\u0BB4\u200C";
//auto pulli rule for vada mozhi ezuthu 
ta99["\u0BB8\u200CQ"] = "\u0BB8\u0BCD\u0BB8\u200D";
ta99["\u0BB8\u0BCD{2}"] = "\u0BB8\u0BCD\u0BB8\u200C";
ta99["\u0BB7\u200CW"] = "\u0BB7\u0BCD\u0BB7\u200D";
ta99["\u0BB7\u0BCD{2}"] = "\u0BB7\u0BCD\u0BB7\u200C";
ta99["\u0B9C\u200CE"] = "\u0B9C\u0BCD\u0B9C\u200D";
ta99["\u0B9C\u0BCD{2}"] = "\u0B9C\u0BCD\u0B9C\u200C";
ta99["\u0BB9\u200CR"] = "\u0BB9\u0BCD\u0BB9\u200D";
ta99["\u0BB9\u0BCD{2}"] = "\u0BB9\u0BCD\u0BB9\u200C";
//otru 
ta99["[\u200D|\u200C]q"] = "\u0BBE";
ta99["[\u200D|\u200C]w"] = "\u0BC0";
ta99["[\u200D|\u200C]e"] = "\u0BC2";
ta99["[\u200D|\u200C]r"] = "\u0BC8";
ta99["[\u200D|\u200C]t"] = "\u0BC7";
ta99["\u0BCDa"] = "\u200C";
ta99["[\u200D|\u200C]a"] = "";
ta99["[\u200D|\u200C]s"] = "\u0BBF"
ta99["[\u200D|\u200C]d"] = "\u0BC1"
ta99["[\u200D|\u200C]f"] = "\u0BCD";
ta99["[\u200D|\u200C]g"] = "\u0BC6";
ta99["[\u200D|\u200C]z"] = "\u0BCC";
ta99["[\u200D|\u200C]x"] = "\u0BCB";
ta99["[\u200D|\u200C]c"] = "\u0BCA";
// copyright & spl symbols 
ta99["\u200Cc"] = "\u00A9";
ta99["\u200C\\."] = "\u2022";
// uyir 
ta99["q"] = "\u0B86";
ta99["w"] = "\u0B88";
ta99["e"] = "\u0B8A";
ta99["r"] = "\u0B90";
ta99["t"] = "\u0B8F";
ta99["a"] = "\u0B85";
ta99["s"] = "\u0B87";
ta99["d"] = "\u0B89";
ta99["f"] = "\u0B83";
ta99["F"] = "\u0B83";
ta99["g"] = "\u0B8E";
ta99["z"] = "\u0B94";
ta99["x"] = "\u0B93";
ta99["c"] = "\u0B92";
// vada mozhi ezuthu 
ta99["Q"] = "\u0BB8\u200C";
ta99["W"] = "\u0BB7\u200C";
ta99["E"] = "\u0B9C\u200C";
ta99["R"] = "\u0BB9\u200C";
ta99["T"] = "\u0B95\u0BCD\u0BB7\u200C";
ta99["Y"] = "\u0BB8\u0BCD\u0BB0\u0BC0";
ta99["O"] = "[";
ta99["P"] = "]";
//mei 
ta99["y"] = "\u0BB3\u200C";
ta99["u"] = "\u0BB1\u200C";
ta99["i"] = "\u0BA9\u200C";
ta99["p"] = "\u0BA3\u200C";
ta99["o"] = "\u0B9F\u200C";
ta99["\\["] = "\u0B9A\u200C";
ta99["\\]"] = "\u0B9E\u200C";
ta99["g"] = "\u0B8E";
ta99["h"] = "\u0B95\u200C";
ta99["j"] = "\u0BAA\u200C";
ta99["k"] = "\u0BAE\u200C";
ta99["l"] = "\u0BA4\u200C";
ta99[";"] = "\u0BA8\u200C";
ta99["\'"] = "\u0BAF\u200C";
ta99["v"] = "\u0BB5\u200C";
ta99["b"] = "\u0B99\u200C";
ta99["n"] = "\u0BB2\u200C";
ta99["m"] = "\u0BB0\u200C";
ta99["/"] = "\u0BB4\u200C";
// spl symbols 
ta99["M"] = "/";
ta99["A"] = "\u0BF9";
ta99["S"] = "\u0BFA";
ta99["D"] = "\u0BF8";
ta99["K"] = "\"";
ta99["L"] = ":";
ta99["\\:"] = ";";
ta99["\""] = "\'";
ta99["Z"] = "\u0BF3";
ta99["X"] = "\u0BF4";
ta99["C"] = "\u0BF5";
ta99["V"] = "\u0BF6";
ta99["B"] = "\u0BF7";
ta99['(.+)\u200C(.+)'] = "$1$2";
var taba = new Array();
taba['\''] = "\u201C";
taba['q'] = "\u0B99";
taba['w'] = "\u0BB1";
taba['e'] = "\u0BA8";
taba['r'] = "\u0B9A";
taba['t'] = "\u0BB5";
taba['y'] = "\u0BB2";
taba['u'] = "\u0BB0";
taba['o'] = "\u0BB4";
taba['\\['] = "\u0B9C";
taba['\\]'] = "\u0BB8";
taba['a'] = "\u0BAF";
taba['s'] = "\u0BB3";
taba['d'] = "\u0BA9";
taba['f'] = "\u0B95";
taba['g'] = "\u0BAA";
taba['j'] = "\u0BA4";
taba['k'] = "\u0BAE";
taba['l'] = "\u0B9F";
taba['z'] = "\u0BA3";
taba['x'] = "\u0B92";
taba['c'] = "\u0B89";
taba['v'] = "\u0B8E";
taba['b'] = "\u0B9F\u0BBF";
taba['m'] = "\u0B85";
taba[','] = "\u0B87";
taba['/'] = "\u0B83";
taba['\\\\'] = "\u0BB7";
taba['\\`'] = "\u0BB9";
taba['='] = "\u0BB8\u0BCD\u0BB0\u0BC0";
taba['Q'] = "\u0B9E";
taba['W'] = "\u0BB1\u0BC1";
taba['E'] = "\u0BA8\u0BC1";
taba['R'] = "\u0B9A\u0BC1";
taba['T'] = "\u0BB5\u0BC1";
taba['Y'] = "\u0BB2\u0BC1";
taba['U'] = "\u0BB0\u0BC1";
taba['I'] = "\u0B90";
taba['O'] = "\u0BB4\u0BC1";
taba['\\{'] = "\u0BC1";
taba['\\}'] = "\u0BC2";
taba['A'] = "\u0BAF\u0BC1";
taba['S'] = "\u0BB3\u0BC1";
taba['D'] = "\u0BA9\u0BC1";
taba['F'] = "\u0B95\u0BC1";
taba['G'] = "\u0BAA\u0BC1";
taba['H'] = "\u0BB0\u0BCD";
taba['J'] = "\u0BA4\u0BC1";
taba['K'] = "\u0BAE\u0BC1";
taba['L'] = "\u0B9F\u0BC1";
taba['\\"'] = "\u201D";
taba['Z'] = "\u0BA3\u0BC1";
taba['X'] = "\u0B93";
taba['C'] = "\u0B8A";
taba['V'] = "\u0B8F";
taba['B'] = "\u0B9F\u0BC0";
taba['M'] = "\u0B86";
taba['\\<'] = "\u0B88";
taba['\\>'] = ",";
taba['\\|'] = "\u2019";
taba['\\~'] = "\u2018";
taba['@'] = ";";
taba['\\#'] = "\u0B9A\u0BC2";
taba['\\$'] = "\u0B95\u0BC2";
taba['\\%'] = "\u0BAE\u0BC2";
taba['\\^'] = "\u0B9F\u0BC2";
taba['\\&'] = "\u0BB0\u0BC2";
taba['\\*'] = "\u0BB4\u0BC2";
taba['\\;'] = "\u0BCD";
taba['N'] = "\u200C\u0BC7\u200C";
taba['n'] = "\u200C\u0BC6\u200C";
taba['i'] = "\u200C\u0BC8\u200C";
taba['h'] = "\u0BBE";
taba['p'] = "\u0BBF";
taba['P'] = "\u0BC0";
taba['_'] = "\u0BC2";
taba['\\+'] = "\u0BC2";
taba['\u0BC1\u0BC2'] = "\u0BC2";
var tava = new Array();
tava['\\!'] = "\u0BB8";
tava['\\$'] = "\u0B9C";
tava['\\%'] = "\u0BC1";
tava['\\^'] = "\u0BC2";
tava['\\&'] = "";
tava['_'] = "\u0BB8\u0BCD\u0BB0\u0BC0";
tava['\\+'] = "+";
tava['q'] = "\u0BA3\u0BC1";
tava['w'] = "\u0BB1";
tava['e'] = "\u0BA8";
tava['r'] = "\u0B9A";
tava['t'] = "\u0BB5";
tava['y'] = "\u0BB2";
tava['u'] = "\u0BB0";
tava['i'] = "\u200C\u0BC8\u200C";
tava['o'] = "\u0B9F\u0BBF";
tava['p'] = "\u0BBF";
tava['\\['] = "\u0BC1";
tava['\\]'] = "\u0BB9";
tava["\\\\"] = "\u201B";
tava['Q'] = "";
tava['W'] = "\u0BB1\u0BC1";
tava['E'] = "\u0BA8\u0BC1";
tava['R'] = "\u0B9A\u0BC1";
tava['T'] = "\u0B95\u0BC2";
tava['Y'] = "\u0BB2\u0BC1";
tava['U'] = "\u0BB0\u0BC1";
tava['I'] = "\u0B90";
tava['O'] = "\u0B9F\u0BC0";
tava['P'] = "\u0BC0";
tava['\\{'] = "\u0BC2";
tava['\\}'] = "\u0BC2";
tava['a'] = "\u0BAF";
tava['s'] = "\u0BB3";
tava['d'] = "\u0BA9";
tava['f'] = "\u0B95";
tava['g'] = "\u0BAA";
tava['h'] = "\u0BBE";
tava['j'] = "\u0BA4";
tava['k'] = "\u0BAE";
tava['l'] = "\u0B9F";
tava['\\;'] = "\u0BCD";
tava['\\\''] = "\u0B99";
tava['\\*'] = "'";
tava['S'] = "\u0BB3\u0BC1";
tava['D'] = "\u0BA9\u0BC1";
tava['F'] = "\u0B95\u0BC1";
tava['G'] = "\u0BB4\u0BC1";
tava['H'] = "\u0BB4";
tava['J'] = "\u0BA4\u0BC1";
tava['K'] = "\u0BAE\u0BC1";
tava['L'] = "\u0B9F\u0BC1";
tava['\\:'] = "\u0BC2";
tava['\\"'] = "\u0B9E";
tava['z'] = "\u0BA3";
tava['x'] = "\u0B92";
tava['c'] = "\u0B89";
tava['v'] = "\u0B8E";
tava['b'] = "\u200C\u0BC6\u200C";
tava['n'] = "\u200C\u0BC7\u200C";
tava['m'] = "\u0B85";
tava['\\,'] = "\u0B87";
tava['Z'] = "\u0BB7";
tava['X'] = "\u0B93";
tava['C'] = "\u0B8A";
tava['V'] = "\u0B8F";
tava['B'] = "\u0B95\u0BCD\u0BB7";
tava['N'] = "\u0B9A\u0BC2";
tava['M'] = "\u0B86";
tava['\\<'] = "\u0B88";
tava['\\|'] = "\u2019";
tava['\\`'] = "\u0B83";
tava['\\.'] = ",";
tava['\\/'] = ".";
tava['\\#'] = "%";
tava['\\~'] = "*";
tava['A'] = "~";
tava['\\-'] = "/";
tava['\\@'] = "\u201C";
tava['\\?'] = "-";
tava['\\>'] = "?";
tava['\u0BC1\u0BC2'] = "\u0BC2";
var tamo = new Array();
tamo['\\!'] = "!";
tamo['\\$'] = "\u0BC1";
tamo['\\%'] = "%";
tamo['\\^'] = "\u0BC2";
tamo['\\&'] = "\u0BCB";
tamo['\\*'] = "\u0BCA";
tamo['_'] = "\u0BF8";
tamo['q'] = "\u0BB1\u0BBE";
tamo['w'] = "\u0BB3";
tamo['e'] = "\u0BAE";
tamo['r'] = "\u0B9A";
tamo['t'] = "\u0BBE";
tamo['y'] = "\u0BA4";
tamo['u'] = "\u0BC8";
tamo['i'] = "\u0B9F";
tamo['o'] = "\u0BB5";
tamo['p'] = "\u0BA9";
tamo['\\['] = "\u0B9C";
tamo['\\]'] = "\u0B83";
tamo["\\\\"] = "\u0B95\u0BCD\u0BB7";
tamo['Q'] = "\u0BB8";
tamo['W'] = "\u0BB3\u0BC1";
tamo['E'] = "\u0BAE\u0BC1";
tamo['R'] = "\u0B9A\u0BC1";
tamo['T'] = "\u0B86";
tamo['Y'] = "\u0BA4\u0BC1";
tamo['U'] = "\u0B90";
tamo['I'] = "\u0B9F\u0BC1";
tamo['O'] = "\u0BB5\u0BC1";
tamo['P'] = "\u0BA9\u0BC1";
tamo['\\{'] = "\u0BB7";
tamo['\\}'] = "\u0BB9";
tamo['a'] = "\u0BB0";
tamo['s'] = "\u0BB1";
tamo['d'] = "\u0BA3";
tamo['f'] = "\u0BCD";
tamo['g'] = "\u0B95";
tamo['h'] = "\u0BBF";
tamo['j'] = "\u0BC0";
tamo['k'] = "\u0BAA";
tamo['l'] = "\u0BA8";
tamo['\\;'] = ";";
tamo['\\\''] = "\u0BC2";
tamo['A'] = "\u0BB0\u0BC1";
tamo['S'] = "\u0BB1\u0BC1";
tamo['D'] = "\u0BA3\u0BC1";
tamo['F'] = "\u0B85";
tamo['G'] = "\u0B95\u0BC1";
tamo['H'] = "\u0B87";
tamo['J'] = "\u0B88";
tamo['K'] = "\u0BAA\u0BC1";
tamo['L'] = "\u0BA8\u0BC1";
tamo['\\:'] = ":";
tamo['\\"'] = "\u0B8A";
tamo['z'] = "\u0B92";
tamo['x'] = "\u0BB4";
tamo['c'] = "\u0BAF";
tamo['v'] = "\u0BC6";
tamo['b'] = "\u0BC7";
tamo['n'] = "\u0B99";
tamo['m'] = "\u0BB2";
tamo[','] = ",";
tamo['Z'] = "\u0B93";
tamo['X'] = "\u0BB4\u0BC1";
tamo['C'] = "\u0BAF\u0BC1";
tamo['V'] = "\u0B8E";
tamo['B'] = "\u0B8F";
tamo['N'] = "\u0B9E";
tamo['M'] = "\u0BB2\u0BC1";
tamo['\\<'] = "\u0BA9\u0BBE";
tamo['\\>'] = "\u0B89";
tamo['\\|'] = "\u0BB8\u0BCD\u0BB0\u0BC0";
tamo['\\`'] = "\u0BC8";
tamo['\\#'] = "\u2019";
tamo['\\~'] = "\u0BA3\u0BBE";
tamo['-'] = "-";
tamo['\\@'] = "\u201B";
tamo['\u0BC1\u0BC2'] = "\u0BC2";

$(document).ready(function () {

    $.fn.initializeTextBoxes = function () {
var ckkbmode = getCookie(cookie_kbmode);
var ckkbhelp = getCookie(cookie_kbhelp);
        kbmode = (ckkbmode == '' ? 'english' : ckkbmode);
toShowHelp = (ckkbhelp == '1' ? true : false);

        $(this).on({
            keypress: function(e){ convertThis(e); },
            keydown: function(e){ toggleKBMode(e); }
        }, 'textarea, input[type="text"]');
    };
    
    window.setTimeout(function () {
    	$(document).initializeTextBoxes();
    }, 20);
    
});