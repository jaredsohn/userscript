/* [WARNING] This script is deprecated. 
             See the successor "CyclicAutoReloader" below
             http://userscripts.org/scripts/show/105714 */
// ==UserScript==
// @name           Page Reloader with Presets
// @description    Reload specific pages periodically
// @version        1.1.4
// @author         k2jp
// @namespace      http://d.hatena.ne.jp/k2jp/
// @match          *://*
// @exclude        about:blank
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// ==/UserScript==
// Home URL          : http://userscripts.org/scripts/show/103760
// ChangeLog
//              1.1.4: Use match metadata instead of include for better scheme support.
//              1.1.3: Use document instead of window.
//                     Use reload(true) instead of reload().
//              1.1.2: [Minor] Changed anonymous function into callback in the first setTimeout arguments.
//              1.1.1: [Minor] if => else if
//              1.1  : Event switched to from "load" to "DOMNodeInserted".
//              1.0  : Initial Release.
(function(){
    document.addEventListener("DOMNodeInserted", 
        function(){
            var urlList60 = [
                // Updates once an hour when Minutes:Seconds = 00:00
                'http://sample1.com/path1/',
                'http://www.sample2.com/'
            ];
            var urlList30 = [
                // Updates once every 30 minutes when Minutes:Seconds = 00:00 or 30:00
                'http://sample3.com/',
                'http://sample4.com/path2/path3'
            ];
            var urlList10 = [
                // Updates once every 10 minutes when Minutes:Seconds = 00:00 or 10:00 or 20:00 or 30:00 or 40:00 or 50:00
                'http://sample5.com/filename.php',
                'http://www.sample6.com/'
            ];
            var urlList1 = [
                // Updates once a minute when Seconds = 00
                'http://sample7.com/', 
                'http://www.sample8.com/'
            ];
            var isElementMatchList = function(element, index, array){
                return (document.location.href.indexOf(element) != -1);
            };
            var urlCondition60 = function() {
                return urlList60.some(isElementMatchList);
            };
            var urlCondition30 = function(){
                return urlList30.some(isElementMatchList);
            };
            var urlCondition10 = function(){
                return urlList10.some(isElementMatchList);
            };
            var urlCondition1 = function(){
                return urlList1.some(isElementMatchList);
            };
            var targetTime = new Date();
            targetTime.setSeconds(0);
            var diff2Update = 0;
            if( urlCondition60() ){
                targetTime.setMinutes(60);
                diff2Update = targetTime.getTime() - new Date().getTime();
            }
            else if( urlCondition30() ){
                targetTime.setMinutes(targetTime.getMinutes() + 30 - targetTime.getMinutes()%30);
                diff2Update = targetTime.getTime() - new Date().getTime();
            }
            else if( urlCondition10() ){
                targetTime.setMinutes(targetTime.getMinutes() + 10 - targetTime.getMinutes()%10);
                diff2Update = targetTime.getTime() - new Date().getTime();
            }
            else if( urlCondition1() ){
                targetTime.setSeconds(60);
                diff2Update = targetTime.getTime() - new Date().getTime();
            }
            if(diff2Update){
                setTimeout(function(){document.location.reload(true);}, diff2Update);
            }
        }
    , false);
}) ();