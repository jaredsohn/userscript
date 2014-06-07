//
//    Vietnamese text converter User Script
//
// ==UserScript==
// @name           Vietnamese keyboard
// @description   Convert VIRQ text into unicode text
// @match https://www.facebook.com/*
// @match https://mail.google.com/*
// 
// @version 1.3.1
// 
// ==/UserScript==
/*  
 *  Copyright (c) 2013 By Vy Ho
 *  
 *  Version 1.0
 *     + Added a button to convert vietnamese VIQR text to unicode characters
 *     + Uses ' . ? ~ ` ^ ( and dd, DD to type VIQR, example: a^n hue^., tie^`m na(ng, ky~ thua^.t, ddu+o+ng tho+`i
 *  Version 1.1
 *     + Made the button smaller, to 20 pixels
 *  Version 1.2
 *     + Fixed some characters
 *  Version 1.3:
 *      + Fixed escaped characters not working
 *  Version 1.3.1:
 *      + Fixed i~ character shown as I~
 */

/*
License:
The author(s) are the people/entity who developed this software, or wrote this code.
The code or software are referring to this source code and its related bundled file(s).
The user(s) are the people/entity who use this code.
The user(s) are allowed to use the software and the code provided they comply with the following conditions:

1) The original authors are not responsible for any usage, modification or distribution of the software or source code.
2) This license cannot be altered for the original code distributed by the author(s).
3) The original authors/copyright holders cannot be modified or removed from the source or distribution package.
4) The code can only be used for non-commercial purposes, and in its original unmodified form
5) The user(s) are NOT allowed to distribute the code or software (to prevent malicious website allow downloading modified bad code)
6) The user(s) are subject to the following disclaimer.

Disclaimer:

Use this code/software at your own risk.  The author(s) are not responsible for any financial
damage or any other lost and/or liability that may be caused by this software.  The author(s)
disclaim any direct or implied warranty of the fitness of this software.  If the software
is in violation of a government laws or any company's policy, including Craigslist's, the
users are responsible for their actions of downloading and using of the software, and
release the author(s) of any liability related to their usage of this software.
 */

(function(){
    var vyhoLib = {};
    vyhoLib.defineNamespace = function(scope, ns) {
        if (ns == null) return;
        var index = -1;
        var prevIndex;
        var subns = null;
        var prevVar = scope;
        try {
            while (true) {
                prevIndex = index + 1;
                index = ns.indexOf(".", prevIndex);
                if (index < 0) {
                    subns = ns.substring(prevIndex, ns.length);
                } else {
                    subns = ns.substring(prevIndex, index);
                }
//                var objns = null;
        
                if (!prevVar[subns]) {
                    prevVar[subns] = {};
                } else {
                }
                prevVar = prevVar[subns];
                if (index < 0) {
                    break;
                }
            }
        } catch (error) {
            alert("Failed to create name space " + ns + ", error: " + error);
            return;
        }
    }
    
    vyhoLib.textMap = {
        "a'" : 225,// "á");
        "a`" : 224,// "à");
        "a." : 7841,// "ạ");
        "a?" : 7843,// "ả");
        "a~" : 227,// "ã");
        "a(" : 259,// "ă");
        "a('" : 7855,// "ắ");
        "ă'" : 7855,// "ắ");
        "a(`" : 7857,// "ằ");
        "ă`" : 7857,// "ằ");
        "a(." : 7863,// "ặ");
        "ă." : 7863,// "ặ");
        "a(?" : 7859,// "ẳ");
        "ă?" : 7859,// "ẳ");
        "a(~" : 7861,// "ẵ");
        "ă~" : 7861,// "ẵ");
        "a^" : 226,// "â");
        "a^'" : 7845,// "ấ");
        "â'" : 7845,// "ấ");
        "a^`" : 7847,// "ầ");
        "â`" : 7847,// "ầ");
        "a^." : 7853,// "ậ");
        "â." : 7853,// "ậ");
        "a^?" : 7849,// "ẩ");
        "â?" : 7849,// "ẩ");
        "a^~" : 7851,// "ẫ");
        "â~" : 7851,// "ẫ");
        "e'" : 233,// "é");
        "e`" : 232,// "è");
        "e." : 7865,// "ẹ");
        "e?" : 7867,// "ẻ");
        "e~" : 7869,// "ẽ");
        "e^" : 234,// "ê");
        "e^'" : 7871,// "ế");
        "ê'" : 7871,// "ế");
        "e^`" : 7873,// "ề");
        "ê`" : 7873,// "ề");
        "e^." : 7879,// "ệ");
        "ê." : 7879,// "ệ");
        "e^?" : 7875,// "ể");
        "ê?" : 7875,// "ể");
        "e^~" : 7877,// "ễ");
        "ê~" : 7877,// "ễ");
        "dd" : 273,// "đ");
        "i'" : 237,// "í");
        "i`" : 236,// "ì");
        "i." : 7883,// "ị");
        "i?" : 7881,// "ỉ");
        "i~" : 297,// "ĩ");
        "o'" : 243,// "ó");
        "o`" : 242,// "ò");
        "o." : 7885,// "ọ");
        "o?" : 7887,// "ỏ");
        "o~" : 245,// "õ");
        "o+" : 417,// "ơ");
        "o+'" : 7899,// "ớ");
        "ơ'" : 7899,// "ớ");
        "o+`" : 7901,// "ờ");
        "ơ`" : 7901,// "ờ");
        "o+." : 7907,// "ợ");
        "ơ." : 7907,// "ợ");
        "o+?" : 7903,// "ở");
        "ơ?" : 7903,// "ở");
        "o+~" : 7905,// "ỡ");
        "ơ~" : 7905,// "ỡ");
        "o^" : 244,// "ô");
        "o^'" : 7889,// "ố");
        "ô'" : 7889,// "ố");
        "o^`" : 7891,// "ồ");
        "ô`" : 7891,// "ồ");
        "o^." : 7897,// "ộ");
        "ô." : 7897,// "ộ");
        "o^?" : 7893,// "ổ");
        "ô?" : 7893,// "ổ");
        "o^~" : 7895,// "ỗ");
        "ô~" : 7895,// "ỗ");
        "u'" : 250,// "ú");
        "u`" : 249,// "ù");
        "u." : 7909,// "ụ");
        "u?" : 7911,// "ủ");
        "u~" : 361,// "ũ");
        "u+" : 432,// "ư");
        "u+'" : 7913,// "ứ");
        "ư'" : 7913,// "ứ");
        "u+`" : 7915,// "ừ");
        "ư`" : 7915,// "ừ");
        "u+." : 7921,// "ự");
        "ư." : 7921,// "ự");
        "u+?" : 7917,// "ử");
        "ư?" : 7917,// "ử");
        "u+~" : 7919,//"ữ"
        "ư~" : 7919,// "ữ");
        "y'" : 253,// "ý");
        "y`" : 7923,// "ỳ");
        "y." : 7925,// "ỵ");
        "y?" : 7927,// "ỷ");
        "y~" : 7929,// "ỹ");
        "A'" : 193,// "Á");
        "A`" : 192,// "À");
        "A." : 7840,// "Ạ");
        "A?" : 7842,// "Ả");
        "A~" : 195,// "Ã");
        "A(" : 258,// "Ă");
        "A('" : 7854,// "Ắ");
        "Ă'" : 7854,// "Ắ");
        "A(`" : 7856,// "Ằ");
        "Ă`" : 7856,// "Ằ");
        "A(." : 7862,// "Ặ");
        "Ă." : 7862,// "Ặ");
        "A(?" : 7858,// "Ẳ");
        "Ă?" : 7858,// "Ẳ");
        "A(~" : 7860,// Ẵ");
        "Ă~" : 7860,// Ẵ");
        "A^" : 194,// Â");
        "A^'" : 7844,// Ấ");
        "Â'" : 7844,// Ấ");
        "A^`" : 7846,// Ầ");
        "Â`" : 7846,// Ầ");
        "A^." : 7852,// Ậ");
        "Â." : 7852,// Ậ");
        "A^?" : 7848,// Ẩ");
        "Â?" : 7848,// Ẩ");
        "A^~" : 7850,// Ẫ");
        "Â~" : 7850,// Ẫ");
        "E'" : 201,// É");
        "E`" : 200,// È");
        "E." : 7864,// Ẹ");
        "E?" : 7866,// Ẻ");
        "E~" : 7868,// Ẽ");
        "E^" : 202,// Ê");
        "E^'" : 7870,// Ế");
        "Ê'" : 7870,// Ế");
        "E^`" : 7872,// Ề");
        "Ê`" : 7872,// Ề");
        "E^." : 7878,// Ệ");
        "EÊ." : 7878,// Ệ");
        "E^?" : 7874,// Ể");
        "Ê?" : 7874,// Ể");
        "E^~" : 7876,// Ễ");
        "Ê~" : 7876,// Ễ");
        "DD" : 272,// Đ");
        "Dd" : 272,// Đ");
        "I'" : 205,// Í");
        "I`" : 204,// Ì");
        "I." : 7882,// Ị");
        "I?" : 7880,// Ỉ");
        "I~" : 296,// Ĩ");
        "O'" : 211,// Ó");
        "O`" : 210,// Ò");
        "O." : 7884,// Ọ");
        "O?" : 7886,// Ỏ");
        "O~" : 213,// Õ");
        "O+" : 416,// Ơ");
        "O+'" : 7898,// Ớ");
        "Ơ'" : 7898,// Ớ");
        "O+`" : 7900,// Ờ");
        "Ơ`" : 7900,// Ờ");
        "O+." : 7906,// Ợ");
        "Ơ." : 7906,// Ợ");
        "O+?" : 7902,// Ở");
        "Ơ?" : 7902,// Ở");
        "O+~" : 7902,// Ỡ");
        "Ơ~" : 7902,// Ỡ");
        "O^" : 212,// Ô");
        "O^'" : 7888,// Ố");
        "Ô'" : 7888,// Ố");
        "O^`" : 7890,// Ồ");
        "Ô`" : 7890,// Ồ");
        "O^." : 7896,// Ộ");
        "Ô." : 7896,// Ộ");
        "O^?" : 7892,// Ổ");
        "Ô?" : 7892,// Ổ");
        "O^~" : 7894,// Ỗ");
        "Ô~" : 7894,// Ỗ");
        "U'" : 218,// Ú");
        "U`" : 217,// Ù");
        "U." : 7908,// Ụ");
        "U?" : 7910,// Ủ");
        "U~" : 360,// Ũ");
        "U+" : 431,// Ư");
        "U+'" : 7912,// Ứ");
        "Ư'" : 7912,// Ứ");
        "U+`" : 7914,// Ừ");
        "Ư`" : 7914,// Ừ");
        "U+." : 7920,// Ự");
        "Ư." : 7920,// Ự");
        "U+?" : 7916,// Ử");
        "Ư?" : 7916,// Ử");
        "U+~" : 7918,// Ữ");
        "Ư~" : 7918,// Ữ");
        "Y'" : 221,// Ý");
        "Y`" : 7922,// Ỳ");
        "Y." : 7924,// Ỵ");
        "Y?" : 7926,// Ỷ");
        "Y~" : 7928,// Ỹ");
        "\\." :  ".".charCodeAt(0) ,// .");
        "\\'" :  "'".charCodeAt(0),// '");
        "\\d" :  "d".charCodeAt(0),// '");
        "\\D" :  "D".charCodeAt(0),// '");
        "\\?" :  "?".charCodeAt(0),// '");
        "\\`" :  "`".charCodeAt(0),// '");
        "\\~" :  "~".charCodeAt(0),// '");
        "\\(" :  "(".charCodeAt(0),// '");
        "\\^" :  "^".charCodeAt(0),// '");
        "\\+" :  "+".charCodeAt(0)// '");
    }
    
    vyhoLib.Trie = function() {
        this.init = function() {
            this.rootNode = this.makeNewNode();
        }
        
        this.makeNewNode = function() {
            var node = {};
            node.key = {};
            node.value = null;
            node.children = {};
            return node;
        }
        
        this.put = function(key, value) {
            var curNode = this.rootNode;
            for (var i = 0; i < key.length; i++) {
                var ch = key.charAt(i);
                if (typeof curNode.children[ch] == "undefined" ||  curNode.children[ch] == null) {
                    curNode.children[ch] = this.makeNewNode();
                }
                curNode = curNode.children[ch];
            }
            curNode.value = value;
        }
        
        this.get = function(key, index) {
            var curNode = this.rootNode;
            var value = null;
            for (var i = index; i < key.length; i++) {
                var ch = key.charAt(i);
                if (typeof curNode.children[ch] == "undefined" ||  curNode.children[ch] == null) {
                    break;
                }
                curNode = curNode.children[ch];
                value = curNode.value;
                index = i;
            }
            return [value, index];
        }
        
        this.init();
    }

    vyhoLib.VietText = function(win) {
        this.iconImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90EDxE3O/N/k5AAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC1ElEQVRYw+1XXUhTYRh+zjYGIxcKOh3WOgxqskA0StwW0wYNDQpMorss8ucqceClS8EuiqSbtOaNusLAi8G6cDcuK68yz8ICDZVZsSwF21xam6u5LnJn5+jZj5tHL+q9+j7Oy/u833ue94+IRCLYTxFgn+W/AyLmhcjrkzqGjN877r3Bu2kfL4CD3RW4eI4kaEwmCSVK654w8vixbLiWl8QRqvEXHYG5D34aPDBfxxu4RGnF1OwKxm01IQAEHYHo6/kEZzqxiUWIuBTC4Q1kSTsRDP5OaOjli+vQ60n6Pjb2EWeNAwiFwpz6z5zXYDAo45MwKkKhAIGf7Zic/IrSEw9Y3xzDV1BdfZQTQK8nsR7sgMfjh+JIFwBArZahv68GZWWHdp6GJSVyqFS59F0sFsYFZ8rq6joAoLDwIJwjV+OCp1QHNJrD9DkUCmNxcS2pAw8tryEQEHgyeAlyuTSzQqTVKFh3l2shof7c3Df09lJobT3N4kfaDuh0bAcmqMQOtJgcUKlycee2ceeVkEvUahlyciTw+QIAAIr6ElfXbn+PkRE3xl817W4vKC+P8YBKEIEWkwPmtkqUlsp31wEtg4hLS2vwePzbdNrMTshkB2A2V+5+N9Rq2TzYGoWZmWX09IzjkbWWn3ZsMCghFMZUKRebB41NT3HTfAZFRXn8zQPFxfmxTJj4TJ8tlgkQBGAyafkdSJi/wbUZAY/Hj85bzzHQX5u08WTuAKMgeb0BuN1e1DfY0dFuAElmp9T90qoD8Yh4o3kY4fAGGhpOpvRSidLK2epTjgBJZrPqutPpRk/3+bTmgLSHUmYUmpvLWZ0yFeGKgGgnBnRaBWy2KRQUZKHrblVS41umn8w4APxNtXTSLdGYR/+Cx/crUiJTpuBR+xeMCvZY7v60GrncNIqp2ZU9WUgC83XEtr1gYfFH5O20F7X1o7wBO4eqoDuVz72Y/JO74R/pSPxZIfVfdgAAAABJRU5ErkJggg==";
        this.autoConvertImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90EEAEBNP6A+80AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACy0lEQVRYw2P8//8/w0ACJoYBBqMOYEHmMIrO49220u1TQ985hkvX3tPEwqVT7BmCvBQY4XYiJ0JOpYV0SZHaagIMZ9+8ZPt/Ju03PARu3/8It1zuTibNLH+kMp3h6q0PDCfXBv5iYGBghIcAzPe0tBzZEQwMDAzf78UzsuBUxFPO8OPHH7wGHTyQzJBqowXnzz5yjcHVbQHDr19/sarfuyeRIdNBB0UMbwisvHSXwdBoGoqGbVvjGArc9fE6bM/T5wxy8j0MDAwMDFpaYgzz5wUyxJqoYQ0BvNkwXE+ZQV1dBM5nY2MmaDkDAwPD588/GRgYGBikpfkY9uxOQLGc5HLA0lIWzv716y/DwVevCDpg+oxTDExMjAzLloYyOIiLU1YQWVnKofDPnn2KV/2Wu48ZZs48w1BSYoOSPsh2gLU1qgNOn8HvgILCbQzq6iIMG9oCqFMUB2ooMAgKcsL5Z848w6m2c9NZht277zIsWhhM3brAwkIWyQFP8fq+tsaBIUJfmboOsEJKiC9ffmHY8/Q5hprQ+k0MYmLcDEuqvahfG1pZoaYD9FDYdPsRw9SpJ0kKepIckOmgw8DMjFB65ixqOkhL38hQV+vI4K8mT7v2gJ4eIj+fPv0Ezi6cdZCBkZGBYUa+C20bJMjRcBYaAnuePmdobtnPsGB+MMGKh3IHIBVI7959Z9h2/wlDSuoGhoZ6JwZ3OSmiaj+CLSJSEmJu3laGv3//MfQk2xHl00cq07FW9USHgLucFIOkJC+ixttzl2HqFF+y2gFkN0qRQyEvz4LBT1WOJAdgCwEWUgywtpJjWLv2KoOEBA/D5s4ggoYj+xqXPEkOmJHvwqCWT3pWw9fMg0fB4sn2RCUmSi2Hme/nJofaJLv78PP/8PR9DFdvfaBLh+T7vXhGjH7B0xdf/1+89o4hOGUfzSzes9KDwdpUHHvHZET2DQG4nf5b88og1gAAAABJRU5ErkJggg==";
        
        this.initialize = function() {
            
            this.autoConvertFlag = vyhoLib.utilities.pref_getValue("vietText.autoConvertFlag", true);
            
            //var textAreaParentClass = "{ width: 90%; margin: 0px; padding: 0px; display: inline-block !important;  word-break: none !important; word-wrap: none; white-space: nowrap !important;}";
            var textAreaParentClass = "{ margin: 0px; padding: 0px; }";
            vyhoLib.utilities.createStyle(win.document, ".textAreaParentClass ", textAreaParentClass);
            var textAreaClass = "{}";
            vyhoLib.utilities.createStyle(win.document, ".textAreaClass ", textAreaClass);
            
            //add event handler, etc. here
            this.trie = new vyhoLib.Trie();
            for (var key in vyhoLib.textMap) {
                this.trie.put(key, String.fromCharCode(vyhoLib.textMap[key]));
            }
            
            var textAreas = win.document.getElementsByTagName("TEXTAREA");
            if (textAreas && textAreas.length > 0) {
                for (var i = 0; i < textAreas.length; i++) {
                    this.addConvertButton(textAreas[i]);
                }
            }
            //setup on click/focus event
            var registerConvertHandler = vyhoLib.utilities.attach(this, this.checkNewOnFocus);
            win.addEventListener("click", registerConvertHandler, true);
            
            var keyDownHandler = vyhoLib.utilities.attach(this, this.autoConvert);
            win.addEventListener("keyup", keyDownHandler, false);
        }
        
        this.addConvertButton = function(textArea) {
            var link = vyhoLib.utilities.newNodeBefore("a", textArea);
            var img = vyhoLib.utilities.newNode("img", link);
            var src;
            
            //todo, use preferences instead
            if (this.autoConvertFlag) {
                src = this.autoConvertImage;
            } else {
                src = this.iconImage;
            }
            
            img.src = src;
            img.setAttribute("style", "width: 20px; height: 20px;");
            link.href = "javascript:void(0)";

            var eventHandler = vyhoLib.utilities.attach(this, this.convert, textArea);
            link.addEventListener("click", eventHandler, true);
            
            var toggleHandler = vyhoLib.utilities.attach(this, this.toggleAutoConvert);
            //img.addEventListener("mousedown", toggleHandler, false);
            img.addEventListener("dblclick", toggleHandler, false);
           
            vyhoLib.utilities.addClass(img, "vietConvertIcon");
            
            textArea.setAttribute("viettext", "true");
            vyhoLib.utilities.addClass(textArea.parentNode, "textAreaParentClass");
            
            vyhoLib.utilities.addClass(textArea, "textAreaClass");
            
            //work around layout issue:
            var value = textArea.value;
            if (value == "") {
                textArea.value = "\n" + value;
            }
            var keyDownHandler = vyhoLib.utilities.attach(this, this.autoConvert);  //todo: can potentially cause double conversion
            textArea.addEventListener("keyup", keyDownHandler, false);
        }
        
        this.matchTextInputArea = function(target) {
            if (target.nodeName == "TEXTAREA") {
                return true;
            }
            
            if (vyhoLib.utilities.hasClass(target, "LW-avf")) {
                return true;
            }
            return false;
            
        }
        
        this.getValue = function(target) {
            if (target.nodeName == "TEXTAREA") {
                return target.value;
            }
            if (vyhoLib.utilities.hasClass(target, "LW-avf")) {
                return target.textContent;
            }
            return "";
        }
        
        this.setValue = function(target, value) {
            if (target.nodeName == "TEXTAREA") {
                target.value = value;
            }
            if (vyhoLib.utilities.hasClass(target, "LW-avf")) {
                return target.textContent = value;
            }
        }
        
        this.checkNewOnFocus = function(evt) {
            var target = evt.target;
            if (!this.matchTextInputArea(target)) {
                return;
            }
            
            //does this already have a convert button?
            var viettext = target.getAttribute("viettext");
            if (typeof viettext != "undefined" && viettext != null) {
                return;
            }
            this.addConvertButton(target);
        }
        
        this.autoConvert = function(evt) {
            var convertLater = vyhoLib.utilities.attach(this, this.autoConvertLater, evt.target);
            setTimeout(convertLater, 10);
        }
        
        this.autoConvertLater = function(evt, target) {
            if (!this.autoConvertFlag) {
                return;
            }
            
            //check if target is a text area
            if (!this.matchTextInputArea(target)) {
                return;
            }

            var value = this.getValue(target);
            if (value == "") return;
            //find the last word (after space or start) and the index
            //call convert and put back the word
            var index = value.search(/\s[^\s]*?$/gi); //
            //index = value.lastIndexOf(" "); //can also be new line or tab (todo)
            if (index < 0) {
                index = -1;  //no space
            }
            if (index == value.length - 1) {
                return;
            }
            var word = value.substring(index + 1);
            var res = this.convertText(word);
            if (index + 1 > 0 && index + 1 < value.length) {
                value = value.substring(0, index + 1);
            } else {
                value = "";
            }
            value += res;
            this.setValue(target, value);
        }
        
        this.toggleAutoConvert = function(evt) {
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            //if (evt.which != 3) {   //right click
            //    return false;
            //}
            
            this.autoConvertFlag = !this.autoConvertFlag;
            //query all images with the right class:
            
            vyhoLib.utilities.pref_setValue("vietText.autoConvertFlag", this.autoConvertFlag);
            
            var images = vyhoLib.utilities.findNodes(win.document.body, "IMG", 
            {
            "class": "vietConvertIcon"
            });
            
            //change all the source:
            var src;
            if (this.autoConvertFlag) {
                src = this.autoConvertImage;
            } else {
                src = this.iconImage;
            }
            var img;
            for( var i = 0; i < images.length; i++) {
                img = images[i];
                img.src = src;
            }
            return false;
        }
        
        this.convert = function(evt, textArea) {
            //var text = "r a' a` a. a? a~ a( a(' a(` a(. a(? a(~ a^ a^' a^` a^. a^? a^~ e' e` e. e? e~ e^ e^' e^` e^. e^? e^~ dd i' i` i. i? i~ o' o` o. o? o~ o^ o^' o^` o^. o^? o^~ u' u` u. u? u~ u+ u+' u+` u+. u+? u+~ y' y` y. y? y~";
            if (evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }
            
            var text = "";
            text = this.getValue(textArea);
            
            var index = 0;
            var result = "";
            
            while (index < text.length) {
                var res = this.trie.get(text, index);
                if (res[0] == null) {
                    result += text.charAt(index);
                    index++;
                    continue;
                } else {
                    result += res[0];
                    index = res[1] + 1;
                }
            }
            this.setValue(textArea, result);
        }
        
        this.convertText = function(text) {
            //var text = "r a' a` a. a? a~ a( a(' a(` a(. a(? a(~ a^ a^' a^` a^. a^? a^~ e' e` e. e? e~ e^ e^' e^` e^. e^? e^~ dd i' i` i. i? i~ o' o` o. o? o~ o^ o^' o^` o^. o^? o^~ u' u` u. u? u~ u+ u+' u+` u+. u+? u+~ y' y` y. y? y~";
            var index = 0;
            var result = "";
            
            while (index < text.length) {
                var res = this.trie.get(text, index);
                if (res[0] == null) {
                    result += text.charAt(index);
                    index++;
                    continue;
                } else {
                    result += res[0];
                    index = res[1] + 1;
                }
            }
            
            return result;
        }
        
        this.initialize();
    }

    //------------------------------------------------------------------------------//

    vyhoLib.defineNamespace(vyhoLib, "utilities");
    
    
    vyhoLib.utilities.enclose = function(func, param1, param2) {
        return function(evt) {
            func(evt, param1, param2);
        }
    }

    vyhoLib.utilities.attach = function(obj, func, param1, param2) {
        return function(evt) {
            func.call(obj, evt, param1, param2);
        }
    }
    
    
    vyhoLib.utilities.createStyle = function(doc, styleName, content) {
        try {
            var style = doc.createElement("style");
            style.type = "text/css";

            style.innerHTML = styleName + content; //" { border: solid 1px red;}";

            var heads = doc.getElementsByTagName("head");
            if (heads && (!(typeof heads == "undefined")) && heads != null && heads.length > 0) {
                heads[0].appendChild(style);
            } else {
                doc.body.appendChild(style);    //assume 1 body
            }
        } catch (err) {
        }
    }
    
    vyhoLib.utilities.removeToken = function(token, fromText) {
        var index = fromText.indexOf(token);
        var subLeft = fromText.substring(0, index);
        var subRight = "";
        if (fromText.length > token.length) {
            subRight = fromText.substring(index + token.length, fromText.length);
        }
        return vyhoLib.utilities.trim(subLeft) + " " + vyhoLib.utilities.trim(subRight);
    }

    vyhoLib.utilities.trim = function(text) {
        if (text == null) {
            return "";
        }
        var trimText = "";
        var ch;
        var endIndex;
        for (endIndex = text.length - 1; endIndex >= 0; endIndex--) {
            ch = text.charAt(endIndex);
            if (ch == ' ' || ch == '\t') {
                continue;
            }
            break;
        }
        var copy = false;
        for (var i = 0; i <= endIndex; i++) {
            ch = text.charAt(i);
            if (copy == false && (ch == ' ' || ch == '\t')) {
                continue;
            }
            copy = true;
            trimText += ch;
        }
        return trimText;
    }

    vyhoLib.utilities.hasClass = function(obj, name) {
        if (obj.className == undefined) {
            return false;
        }
        var className = obj.className;
        return (className.indexOf(name) >= 0);
    }

    vyhoLib.utilities.addClass = function(obj, name) {
        if (vyhoLib.utilities.hasClass(obj,name)) {
            return;
        }
        if (obj.className == undefined) {
            obj.className = name;
        } else {
            obj.className = obj.className + " " + name;
        }
    }

    vyhoLib.utilities.removeClass = function(obj, className) {
        if (!vyhoLib.utilities.hasClass(obj,className)) {
            return;
        }
        var currentClassName = obj.className;
        obj.className = vyhoLib.utilities.removeToken(className, currentClassName);
    }

    vyhoLib.utilities.roundInt = function(number) {
        if (number >= 0.5 + Math.floor(number)) {
            return Math.floor(number) + 1;
        }
        return Math.floor(number);
    }

    vyhoLib.utilities.removeAllChildren = function(parent) {
        if (parent == null) {
            return ;
        }
        while ( parent.hasChildNodes() ) {
            parent.removeChild(parent.firstChild);
        }
    }

    vyhoLib.utilities.pref_getValue = function(key, defVal) {
        var hasGmGetValue = false;
        var val = null;

        try {
            if ((typeof GM_getValue) != "undefined") {
                if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
                    hasGmGetValue = true;
                }
            }
        } catch (err) {
        }
        if (hasGmGetValue) {
            return GM_getValue(key, defVal);
        } else if (vyhoLib.utilities.prefManager) {
            try {
                val = vyhoLib.utilities.prefManager.getCharPref("extensions.vyhoLib." + key);
                if (val == null) {
                    return defVal;
                } else {
                    if (val == "true") return true;
                    if (val == "false") return false;
                    return val;
                }
            } catch (err) {
                return defVal;
            }
        } else {
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || (typeof window != "undefined" && window.opera)) {
                if ((typeof localStorage) == "undefined" ) {
                    alert("Not supported.");
                } else {
                    try {
                        val = localStorage.getItem("extensions.vyhoLib." + key);
                        if (val == null) {
                            return defVal;
                        } else {
                            if (val == "true") return true;
                            if (val == "false") return false;
                            return val;
                        }
                    } catch (e) {
                        return defVal;
                    }
                }
            }

        }
        return defVal;
    }

    vyhoLib.utilities.pref_setValue = function(key, value) {
        var hasGmGetValue = false;
        try {
            if ((typeof GM_getValue) != "undefined") {
                if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
                    hasGmGetValue = true;
                }
            }
        } catch (err) {
        }
        try {
            if (hasGmGetValue) {
                GM_setValue(key, value);
                return;
            } else if (vyhoLib.utilities.prefManager) {
                vyhoLib.utilities.prefManager.setCharPref("extensions.vyhoLib." + key, value);
            } else {
                if ((typeof localStorage) == "undefined" ) {
                    alert("Not supported.");
                } else {
                    localStorage.setItem("extensions.vyhoLib." + key, value);
                }

            }
        } catch (err) {
            throw err;
        }
    }

    vyhoLib.utilities.rand = function(num) {

        var text = "";
        for (var i = 0; i < num; i++) {
            text += Math.floor( Math.random() * 10);
        }
        return text;
    }

    /**
 * Function to find the browser's window size
 * Return an array, 1st element is the width and 2nd is the height
 */
    vyhoLib.utilities.getWindowSize = function(browserWin) {
        var width = 0;
        var height = 0;

        if (browserWin.innerHeight) {
            height = browserWin.innerHeight;
            width = browserWin.innerWidth;
        } else {
            if (browserWin.document.body && browserWin.document.body.clientHeight) {
                height = browserWin.document.body.clientHeight;
                width = browserWin.document.body.clientWidth;
            }
        }
        return [width, height];
    }


    /**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
    vyhoLib.utilities.newNode = function(tag, on) {
        var e = on.ownerDocument.createElement(tag);
        if (on) on.appendChild(e);
        return e;
    }

    /**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
    vyhoLib.utilities.newText = function(text, on) {
        var e = on.ownerDocument.createTextNode(text);
        if (on) on.appendChild(e);
        return e;
    }

    /**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
    vyhoLib.utilities.insertBefore = function(newNode, target) {
        var parent   = target.parentNode;
        var refChild = target; //target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
    }

    vyhoLib.utilities.insertAfter = function(newNode, target) {
        if (newNode == null) return;
        var parent   = target.parentNode;
        var refChild = target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
    }

    vyhoLib.utilities.newNodeAfter = function(tag, target) {
        var newNode = target.ownerDocument.createElement(tag);
        var parent   = target.parentNode;
        var refChild = target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
        return newNode;
    }

    vyhoLib.utilities.newNodeBefore = function(tag, target) {
        var newNode = target.ownerDocument.createElement(tag);
        vyhoLib.utilities.insertBefore(newNode, target);
        return newNode;
    }

    vyhoLib.utilities.newTextBefore = function(text, target) {
        var newNode = target.ownerDocument.createTextNode(text);
        vyhoLib.utilities.insertBefore(newNode, target);
        return newNode;
    }

    vyhoLib.utilities.newTextAfter = function(text, target) {
        var newNode = target.ownerDocument.createTextNode(text);
        var parent   = target.parentNode;
        var refChild = target.nextSibling;
        if(refChild) parent.insertBefore(newNode, refChild);
        else parent.appendChild(newNode);
        return newNode;
    }
    
    vyhoLib.utilities.findNodes = function(parentNode, tag, attributes) {
        var items;
        if (typeof parentNode.getElementsByTagName == "undefined") {
            return null;
        }
        items = parentNode.getElementsByTagName(tag);
        var element;
        var found = false;
        var result = [];
        for(var i = 0; i< items.length; i++){
            found = true;
            element = items[i];
            for (var attr in attributes) {
                var attrExpectedVal = attributes[attr];
                var attrVal = element.getAttribute(attr);
                //console.log(attrVal);
                if (attr != "class") {
                   if (attrExpectedVal != attrVal) {
                      found = false;
                      break;
                    }
                  } else if (attr == "class") {
                  var regExp = new RegExp("(^|\\s)" + attrExpectedVal + "(\\s|$)");
                  if(!regExp.test(attrVal)){
                    //if (attrVal == null || attrVal.indexOf(attrExpectedVal) < 0) {
                    found = false;
                    break;
                  }
               }
            }
            if (found) {
                result[result.length] = element;
            }
        }
        return result;
    }

    vyhoLib.utilities.escapeUrl = function(data) {
        if (data == null) {
            return "";
        }
        var text = "";
        for (var i = 0; i < data.length; i++) {
            var ch = data.charAt(i);
            if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
                (ch == '.') || (ch == '-')) {
                text += ch;
            } else if (ch == ' ') {
                text += "+";
            } else {
                var ival = data.charCodeAt(i);
                var hex = ival.toString(16);
                if (hex.length < 2) {
                    hex = "0" + hex;
                }
                text += "%" + hex;
            }
        }
        return text;
    }


    vyhoLib.utilities.attach = function(obj, func, param1, param2) {
        return function(evt) {
            func.call(obj, evt, param1, param2);
        }
    }

    vyhoLib.utilities.enclose = function(func, param1, param2) {
        return function(evt) {
            func.call(null, evt, param1, param2);
        }
    }

    vyhoLib.utilities.Serializer = function() {
        this.escapeChar = "Z";
        this.arrayStart = "[";
        this.arrayEnd = "]";
        this.objStart = "{";
        this.objEnd = "}";
        this.nameValSep = "=";
        this.separator = ",";
        this.nullChar = "n";
        this.emptyChar = "e";
        this.curIndex = 0;
        this.dataObject = null;
        this.error = null;

        this.initialize = function() {

        }

        this.escapeString = function(sdata) {
            if (sdata == null) {
                return this.escapeChar + this.nullChar;    //n = > null
            }
            if (sdata == "") {
                return this.escapeChar + this.emptyChar;
            }
            var res = "";
            if (isNaN(sdata) && sdata.length) {
                for (var i = 0; i < sdata.length; i++) {
                    var ch = sdata.charAt(i);

                    if (ch == this.arrayStart || ch == this.arrayEnd || ch == this.escapeChar ||
                        ch == this.separator || ch == this.nameValSep) {
                        res = res + this.escapeChar + ch;
                    } else {
                        res = res + ch;
                    }
                }
            } else {
                return "" + sdata;
            }
            return res;
        }

        //take a string and return into data array
        this.decode = function (sdata) {
            return this.decodeWithFactory(sdata, null);
        }

        this.decodeWithFactory = function (sdata, factory) {
            this.curIndex = 0;
            this.error = null;
            if (sdata == null) {
                this.dataObject = null;
                return this.dataObject;
            }
            this.dataObject = this.recursiveDecoder(sdata, factory);
            return this.dataObject;
        }

        this.printDataObject = function() {
            return this.printData(this.dataObject);
        }

        this.printData = function(dataObject) {
            var text = "";
            if (dataObject == null) {
                return "null";
            }
            if (this.isArray(dataObject)) {
                text = "[";
                for (var i = 0; i < dataObject.length; i++) {
                    if (i > 0) {
                        text += ", ";
                    }
                    text += this.printData(dataObject[i]);
                }
                text += "]";
            } else {
                text = dataObject;
            }
            return text;
        }

        this.recursiveDecoder = function (sdata, factory) {
            var res;
            if (sdata == null) {
                return null;
            }
            if (this.matchArray(sdata, this.curIndex)) {
                var array = new Array();
                this.curIndex++;
                var nextIndex;
                while (true) {
                    nextIndex = this.curIndex;
                    res = this.recursiveDecoder(sdata, factory);
                    if (nextIndex == this.curIndex) {
                        break;    //error condition
                    } else {
                        array[array.length] = res;
                    }
                    if (this.match(sdata, this.curIndex, this.arrayEnd)) {
                        this.curIndex++;
                        break;    //end of the array
                    }
                    if (this.match(sdata, this.curIndex, this.separator)) {
                        this.curIndex++;
                    } else {
                        //error?
                        break;
                    }
                }
                return array;
            } else if (this.matchObj(sdata, this.curIndex)) {
                var obj = {};
                if (factory != null) {
                    //@todo: based on class name, get the correct classes here
                    obj = factory.get("classNameGoesHere");
                }
                this.curIndex++;
                while (true) {
                    if (this.match(sdata, this.curIndex, this.objEnd)) {
                        this.curIndex++;
                        break;    //end of the array
                    }
                    var name = this.extractString(sdata);
                    if (name == null) {    //error, nothing found
                        break;
                    }
                    if (this.match(sdata, this.curIndex, this.nameValSep)) {
                        this.curIndex++;
                    } else {
                        break;
                    }
                    nextIndex = this.curIndex;
                    res = this.recursiveDecoder(sdata, factory);
                    if (nextIndex == this.curIndex) {
                        break;    //error condition
                    } else {
                        obj[name] = res;
                    }

                    if (this.match(sdata, this.curIndex, this.separator)) {
                        this.curIndex++;
                    } else {
                        continue;
                    }
                }
                return obj;
            } else if (this.match(sdata, 0, this.separator)) {
                //unexpected here
                return null;
            } else {
                var text = this.extractString(sdata);
                return text;
            }
        }

        this.extractString = function(sdata) {
            var i = this.curIndex;
            var text = "";
            var prevChar = null;
            for (i = this.curIndex; i < sdata.length; i++) {
                var ch = sdata.charAt(i);
                if (this.match(sdata, i, this.arrayEnd) ||
                    this.match(sdata, i, this.objEnd) ||
                    this.match(sdata, i, this.nameValSep) ||
                    this.match(sdata, i, this.separator)) {
                    if (prevChar != this.escapeChar) {
                        break;
                    }
                }
                if (prevChar == this.escapeChar) {
                    if (this.match(sdata, i, this.nullChar)) {
                        text = null;
                        i++;
                        break;
                    }
                    if (this.match(sdata, i, this.emptyChar)) {
                        text = "";
                        i++;
                        break;
                    }
                }
                if (ch == this.escapeChar && prevChar != this.escapeChar) {
                    prevChar = ch;
                    continue;
                }
                text += ch;
                if (prevChar != this.escapeChar) {
                    prevChar = ch;
                } else {
                    prevChar = null;
                }
            }
            this.curIndex = i;
            return text;
        }

        this.matchArray = function(sdata, idx) {
            return this.match(sdata, idx, this.arrayStart);
        }

        this.matchObj = function(sdata, idx) {
            return this.match(sdata, idx, this.objStart);
        }

        this.match = function(sdata, idx, token) {
            if (sdata.length > idx) {
                var ch = sdata.charAt(idx);
                if (ch == token) {
                    return true;
                }
            } else {
                if (token == null) {
                    return true;    //match the end
                }
            }
            return false;
        }

        this.encodeObj = function(adata) {
            if (adata == null) {
                return this.escapeString(adata);
            }
            var obj = new Object();
            var res = this.objStart;
            var i = 0;
            for (var field in adata) {
                if (typeof field == "function") {
                //continue;
                }
                if (i > 0) {
                    res += this.separator;
                }
                res += field;
                res += this.nameValSep;    //@todo: make sure to escape and make constant var for this
                res += this.encode(adata[field]);
                i++;
            }
            res = res + this.objEnd;
            return res;
        }

        this.encode = function(adata) {
            if (adata == null) {
                return this.escapeString(adata);
            }
            if (this.isArray(adata)) {
                return this.encodeArray(adata);
            } else if (this.isFuncObj(adata)) {
                return this.encodeObj(adata);
            } else if (this.isObj(adata)) {
                return this.encodeObj(adata);
            }
            return this.escapeString(adata);
        }
        this.encodeArray = function(adata) {
            if (!adata) {
                return "";
            }
            var res = this.arrayStart;
            for (var i = 0; i < adata.length; i++) {
                var arrayElement = adata[i];
                if (i > 0) {
                    res += this.separator;
                }
                if (this.isArray(arrayElement)) {
                    res += this.encode(arrayElement);
                } else {
                    res += this.encode(arrayElement);
                }
            }
            res = res + this.arrayEnd;
            return res;
        }

        this.isArray = function(data) {
            if (data == null) {
                return false;
            }
            if (data instanceof Array) {
                return true;
            }
            return false;
        }

        this.isFuncObj = function(data) {
            if (data == null) {
                return false;
            }

            if (typeof data == "function") {
                return true;
            }
            return false;
        }

        this.isObj = function(data) {
            if (data == null) {
                return false;
            }

            if (typeof data == "object") {
                return true;
            }
            return false;
        }

        this.restoreString = function(sdata) {
            if (sdata == null) {
                return null;
            }
            var res = "";
            for (var i = 0; i < sdata.length; i++) {
                var ch = sdata.charAt(i);
                if (ch == this.escapeChar) {
                    i++;
                    if (i < sdata.length) {
                        ch = sdata.charAt(i);
                        res = res + ch;
                    }
                    continue;
                } else {
                    res = res + ch;
                }
            }
            return res;
        }

        this.initialize();
    }

    var vietText = new vyhoLib.VietText(window);

})();



