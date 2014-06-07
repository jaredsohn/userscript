// ==UserScript==
// @name           What.cd Update Ratio Presnatch
// @description    Updates your site stats to display what would happen to your ratio before you actually download a file.
// @include        http://what.cd/*
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @grant          GM_info
// @version        0.7.2
// @author         Etheryte
// @author         Brock Adams
// @author         Erik Vergobbi Vold
// @author         Tyler G. Hicks-Wright
// @author         Alberto Varela
// ==/UserScript==
(function() {

    //GM cross-browser jQuery by Brock Adams, Erik Vergobbi Vold & Tyler G. Hicks-Wright.
    //We will use Google's jQuery instead of on-site jQuery to avoid any versioning-based surprises.
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            //Avoid clashes between on-site jQuery and our jQuery.
            //Note that all jQuery calls are made via jQ() instead of the standard $().
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    // The guts of this userscript
    function container() {
    
        //Html5 storage/cookie management to have a minimal amount of API calls (only used for class required ratio)
        //Html5 Storage jQ Plugin - v1.0 - 2013-01-19
        //https://github.com/artberri/jQuery-html5storage
        //Copyright (c) 2013 Alberto Varela; Licensed MIT
        (function(e,t){"use strict";var n=["localStorage","sessionStorage"],r=[];t.each(n,function(n,i){try{r[i]=i in e&&e[i]!==null}catch(s){r[i]=!1}t[i]={settings:{cookiePrefix:"html5fallback:"+i+":",cookieOptions:{path:"/",domain:document.domain,expires:"localStorage"===i?{expires:365}:undefined}},getItem:function(n){var s;return r[i]?s=e[i].getItem(n):s=t.cookie(this.settings.cookiePrefix+n),s},setItem:function(n,s){return r[i]?e[i].setItem(n,s):t.cookie(this.settings.cookiePrefix+n,s,this.settings.cookieOptions)},removeItem:function(n){if(r[i])return e[i].removeItem(n);var s=t.extend(this.settings.cookieOptions,{expires:-1});return t.cookie(this.settings.cookiePrefix+n,null,s)},clear:function(){if(r[i])return e[i].clear();var n=new RegExp("^"+this.settings.cookiePrefix,""),s=t.extend(this.settings.cookieOptions,{expires:-1});document.cookie&&document.cookie!==""&&t.each(document.cookie.split(";"),function(e,r){n.test(r=t.trim(r))&&t.cookie(r.substr(0,r.indexOf("=")),null,s)})}}})})(window,jQ);
        //TODO: Bind window.localStorage.. to jQ.localStorage..
        //Cookie settings
        window.localStorage.settings = {
            cookiePrefix : 'html5fallback:localStorage:', //Prefix for the Local Storage substitution cookies
            cookieOptions : {
            path : '/', //Path for the cookie
            domain : document.domain, //Domain for the cookie
            expires: 1 //Days left for cookie expiring
            }
        };

        //Actual cookie manangement
        //This checking is done prior to click binding to avoid delay in functionality
        var userClass;
        //If we have a cookie, use it, otherwise fetch the userclass from the API. Continue with main when done.
        var cookie = window.localStorage.getItem('whatcd_userclass');
        if(cookie){
            userClass = cookie;
            main();
        } else {
            var protocol = (document.URL).replace(/\.?what.cd.*/,"");
            jQ.ajax({
            url: protocol+".what.cd/ajax.php?action=index"
            }).done(function(data){
                userClass = data.response.userstats.class;
                window.localStorage.setItem('whatcd_userclass', userClass);
                main();
            });
        }
        
        //What is size, baby don't Hz me no more
        //Keep sizes in KBs because if files are smaller than that they don't matter
        //Converts "1 MB" into "1024" (see previous line).
        function actualSize(sizeText){
            var size = sizeText.replace(/\ [KMGT]?B/,"");
            var postfix = sizeText.replace(/[0-9\.]*\ /,"");
            if(postfix==="MB"){
                size = size*1024;
            } else if(postfix==="GB"){
                size = size*1024*1024;
            } else if(postfix==="TB"){
                size = size*1024*1024*1024;
            }
            return size;
        }
        
        //Functions like these are kept humanly readable by 1024*1024
        //Your processor can handle a few flops
        //Converts "1024" into "1 MB" (see comments for actualSize();).
        function humanSize(size){
            var sizeText;
            if(size<1024){
                sizeText = size + " KB";
            } else if ((size/1024)<1024){
                sizeText = (size/1024).toFixed(2) + " MB";
            } else if ((size/(1024*1024))<1024){
                sizeText = (size/(1024*1024)).toFixed(2) + " GB";
            } else {
                sizeText = (size/(1024*1024*1024)).toFixed(2) + " TB";
            }
            return sizeText;
        }
        
        //Return maximum required ratio based on downloaded amount
        function getMaxReqRatio(download){
            //Turn download (in KB) to downloadGb (in GB, obviously).
            var downloadGb = download/1024/1024;
            var maxReqRatio;
            if(downloadGb<5){
                maxReqRatio = 0;
            } else if(downloadGb<10){
                maxReqRatio = 0.15;
            } else if(downloadGb<20){
                maxReqRatio = 0.2;
            } else if(downloadGb<30){
                maxReqRatio = 0.3;
            } else if(downloadGb<40){
                maxReqRatio = 0.4;
            } else if(downloadGb<50){
                maxReqRatio = 0.5;
            } else {
                maxReqRatio = 0.6;
            }
            return maxReqRatio;   
        }
        
        //Return class required ration based on userclass
        function getClassReqRatio(userClass){
            //If special userclass or just user the userclass sets no requirements.
            var classReqRatio = 0;
            if(userClass == "Member"){
                classReqRatio = 0.65;
            } else if(userClass.match(/^(Member|Elite|Torrent\ Master|Power\ TM|Elite\ TM)$/)){
                classReqRatio = 0.95;
            }
            return classReqRatio;
        }
        
        //Functional body of the userscript
        function main(){
        
            //Keep track of variables
            var size, upload, download, ratio, maxReqRatio, classReqRatio;
            
            //Watch out for [DL] clicks once all the required operations are ready (userclass query to cookie/ajax below).
            jQ('tr.group_torrent').find('a[title="Download"]').click(function(event) {
                //Get current stats from document (allows multiple [DL]-s on a page to stack as opposed to API-based stats where this wouldn't happen)
                var uploadText = jQ('li#stats_seeding').children('span.stat').html();
                var downloadText = jQ('li#stats_leeching').children('span.stat').html();
                upload = actualSize(uploadText);
                //We don't divide by zero, even if your downloaded amount is 0 and you find a torrent that's ~0KB large.
                download = actualSize(downloadText)+1;
                //Snafucate, pretty self-explanatory
                jQ(this).closest('tr').children('td').each(function(){
                    if(jQ(this).children().length == 0){
                        //We ur legiuns aka. I can't believe I'm making this joke
                        if(jQ(this).html().match(/B/)){
                            //Get the torrent size
                            var sizeText = jQ(this).html();
                            size = actualSize(sizeText);
                            //Find what the new downloaded amount would be
                            download = download+size;
                            //And the new ratio would be...
                            ratio = (upload/download).toFixed(2);
                            //Allow checking if maximum required rations would be surpassed
                            maxReqRatio = getMaxReqRatio(download);
                            classReqRatio = getClassReqRatio(userClass);
                        }
                    }
                });
                //Maximum required ratio grandfathers over class required ratio just in case.
                if(ratio<maxReqRatio){
                    if(!confirm('Downloading this torrent would take you under your maximum required ratio ('+maxReqRatio+').\n\rAre you sure you want to download it?')) {
                        return false;
                    }
                } else if(ratio<classReqRatio){
                    if(!confirm('Downloading this torrent would take you under your class required ratio ('+classReqRatio+').\n\rAre you sure you want to download it?')) {
                        return false;
                    }
                }
                //Set the stats to the top menu-bar-what-ever-you-call-that-thing-y'know if the torrent was downloaded
                jQ('li#stats_leeching').children('span.stat').html(humanSize(download));
                jQ('li#stats_ratio').children('span.stat').children('span').html(ratio);
            });
        } 
    }
        
    //Load jQuery and execute the container function which calls main when ready.
    addJQuery(container);
})();