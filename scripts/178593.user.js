// ==UserScript==
// @name           SteamGifts Plus - Extras Addon
// @version        1.3
// @namespace      steamgiftsplus-extra
// @description    Adds some extra tweaks to the already tweaked Steamgifts.com (Thanks to SG Plus)
// @include        http://*steamgifts.com/
// @include        http://*steamgifts.com/open*
// @include        http://*steamgifts.com/new*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @icon 		   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAB3RJTUUH3QkcCBADqHM9VAAAAlNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuMS4yIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgPHhtcDpDcmVhdGVEYXRlPjIwMTMtMDktMjhUMDc6MjA6MzZaPC94bXA6Q3JlYXRlRGF0ZT4KICAgPHhtcDpNb2RpZnlEYXRlPjIwMTMtMDktMjhUMDc6MjM6NTZaPC94bXA6TW9kaWZ5RGF0ZT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+ChBxLw8AAAKNSURBVHicPZJNaJRXFIbvPef+fDPJDBkMYwmdWNPYlChUsCAWabtqQMhGaEFcBeKi4F5Ql9m6yi6L4k5X/iBdCUHBphYkMU1JKBLUJG0azSQzmS8zc7/7nXNcTPF5li/P7tVbW1szMzPz8/POWe8T771zzjqHxkieZzFmWRZCCCGIyJXpaT0xMbG4uFgul4vFou8VScFrUXmeO8/MWQjdEELoNpsHAIBpmhaLRWssIhpj0Dkk4pHR45OTuLPTbDREqRhjjDkAxBgBEYmIhYV7CB+mzTPn16em+r/7Pm+1SPUWISYRMcysAZiIRIiFmDMWl8Z+osiKmJmYRUSYiIjIMLMmyhF1px0PD7KkAO1Wod7yhNxo7e/8C+VKp50q40SEmQ0Ta63z0C0MjXz+1dfWAOahPjTa2KDR4bHxyR+V4sT7V8+fbW5uKa11pVJB4yBPi9/eODrxM/rMVUoEkaVdGvoEB5Q/2jrhS7t37z28ehlKA4aJlYpKm/SvX9t7DVOwYCE5dqpv/OzBi0ch/nf62qWlX+6v3r2dM+ssM8QkihVa3F+RvZeMlrNWuv1T9fjZ6rvf/v5nHcIV8/yB2/zz0y9Pbr95rZMkAQBERDSACGhU3obaD7WL1wuDRThSoYKuVMu25AcH1IupC4ZZREhEWBgZNRFw7O7WN56uDPrV943t4Ys3d+/cqm+umUKSLi+ZPM8RQXqAaM1aCaVv2+uP6+H3w4O9ztglWHuyu/yHVUoBYJIkIQSt9f+NsIhW1JR0pdvZFzOg7Rfd+mKn+U5ZR0Rqbm6uWq1qrRFN707WWmuts946a6yzfZ+hSYxBpdS5c98oEZmdnS2VSogIgD0/AgCgFKIGwFqttrCw8AFwrX8ry5t72gAAAABJRU5ErkJggg==
// ==/UserScript==

/*

Todo:
- fix grid view
- add options screen
- put all game data in 1 structure

*/

//lscache
var lscache=function(){var CACHE_PREFIX="lscache-";var CACHE_SUFFIX="-cacheexpiration";var EXPIRY_RADIX=10;var EXPIRY_UNITS=60*1000;var MAX_DATE=Math.floor(8640000000000000/EXPIRY_UNITS);var cachedStorage;var cachedJSON;var cacheBucket="";function supportsStorage(){var key="__lscachetest__";var value=key;if(cachedStorage!==undefined){return cachedStorage}try{setItem(key,value);removeItem(key);cachedStorage=true}catch(exc){cachedStorage=false}return cachedStorage}function supportsJSON(){if(cachedJSON===undefined){cachedJSON=(window.JSON!=null)}return cachedJSON}function expirationKey(key){return key+CACHE_SUFFIX}function currentTime(){return Math.floor((new Date().getTime())/EXPIRY_UNITS)}function getItem(key){return localStorage.getItem(CACHE_PREFIX+cacheBucket+key)}function setItem(key,value){localStorage.removeItem(CACHE_PREFIX+cacheBucket+key);localStorage.setItem(CACHE_PREFIX+cacheBucket+key,value)}function removeItem(key){localStorage.removeItem(CACHE_PREFIX+cacheBucket+key)}return{set:function(key,value,time){if(!supportsStorage()){return}if(typeof value!=="string"){if(!supportsJSON()){return}try{value=JSON.stringify(value)}catch(e){return}}try{setItem(key,value)}catch(e){if(e.name==="QUOTA_EXCEEDED_ERR"||e.name==="NS_ERROR_DOM_QUOTA_REACHED"){var storedKeys=[];var storedKey;for(var i=0;i<localStorage.length;i++){storedKey=localStorage.key(i);if(storedKey.indexOf(CACHE_PREFIX+cacheBucket)===0&&storedKey.indexOf(CACHE_SUFFIX)<0){var mainKey=storedKey.substr((CACHE_PREFIX+cacheBucket).length);var exprKey=expirationKey(mainKey);var expiration=getItem(exprKey);if(expiration){expiration=parseInt(expiration,EXPIRY_RADIX)}else{expiration=MAX_DATE}storedKeys.push({key:mainKey,size:(getItem(mainKey)||"").length,expiration:expiration})}}storedKeys.sort(function(a,b){return(b.expiration-a.expiration)});var targetSize=(value||"").length;while(storedKeys.length&&targetSize>0){storedKey=storedKeys.pop();removeItem(storedKey.key);removeItem(expirationKey(storedKey.key));targetSize-=storedKey.size}try{setItem(key,value)}catch(e){return}}else{return}}if(time){setItem(expirationKey(key),(currentTime()+time).toString(EXPIRY_RADIX))}else{removeItem(expirationKey(key))}},get:function(key){if(!supportsStorage()){return null}var exprKey=expirationKey(key);var expr=getItem(exprKey);if(expr){var expirationTime=parseInt(expr,EXPIRY_RADIX);if(currentTime()>=expirationTime){removeItem(key);removeItem(exprKey);return null}}var value=getItem(key);if(!value||!supportsJSON()){return value}try{return JSON.parse(value)}catch(e){return value}},remove:function(key){if(!supportsStorage()){return null}removeItem(key);removeItem(expirationKey(key))},supported:function(){return supportsStorage()},flush:function(){if(!supportsStorage()){return}for(var i=localStorage.length-1;i>=0;--i){var key=localStorage.key(i);if(key.indexOf(CACHE_PREFIX+cacheBucket)===0){localStorage.removeItem(key)}}},setBucket:function(bucket){cacheBucket=bucket},resetBucket:function(){cacheBucket=""}}}();

/* Configuration variables */
(function($){
    var unsafeWindow = this['unsafeWindow'] || window;
    
    var cfgSteamLinks = true;
    var cfgHighlightTrusted = true;
    var cfgHideAvatar = true;
    var cfgPointsTitle = true;
    
    var image = {
        'platform-win': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADAFBMVEUAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcJCQkKCgoLCwsMDAwPDw8QEBAUFBQWFhYdHR0qKioyMjI0NDQ1NTU6Ojo8PDxCQkJDQ0NISEhLS0tSUlJVVVVaWlpiYmJxcXF6enp7e3t9fX1+fn6Dg4OEhISFhYWGhoaJiYmLi4uQkJCRkZGTk5OXl5enp6exsbG0tLS2tra6urq7u7u8vLy9vb3AwMDCwsLDw8PFxcXGxsbHx8fIyMjJycnKysrMzMzNzc3Pz8/S0tLV1dXW1tbY2Njb29vc3Nze3t7f39/o6Ojt7e3u7u7v7+/29vYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD3jbu2AAABAHRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AU/cHJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAxUlEQVQoU0WO6XYBURCE686dGUSQ2MU6xL4kBEHsS8IN3v9tbmqcoH509/nOqa6CdnUY/V425YKNbcCOfd5BBaYEPvY38GTBC2yfQ8U3J0EwByCN1y1MeJAhyAajUWBchwGJJUHva7LaN3ZBSIFH/lB+IRGZqTToaRMUHmhFp/U9HXS6Zw0VsE0gPvbhxcklGbtgokRtSIONJkExVS6FzZVj0SjYzS2mT+9rPyCE9d+UUgmLGYU70Md+vvrjHleglVKcWv8B8lJqFnM1R8kAAAAASUVORK5CYII=',
        'platform-mac': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAiZJREFUeNqMUz2IGlEQnnVXUUQJEn8Kk5j2IMYiymF5jVilFBISrBLRJmVASSWmTaGxucLiCpOLVhFE1i5CArYrGFAQQaKxENY/dN3NzPNWUt3tg8H1vZlv5n3f9zhN02Cz2YDJZAJFUVgIggD7/R5sNhud8blc7s3hcLhXKpU+7nY7oBp9meC/xXEcdDod6PV64HQ6GVA2my1i4Wer1fqYmhAwAfA8z5qyP+v1GrbbLRB6vV6HdDrNJmm1WheIq3k8Hrnf759R7ng8htlsxnKpRtC7WywWWCwW/Gg0ejYYDB41Go1f0+n0YTQalZLJ5HW1Wn1gt9v94XD4RygUWp/GJlS8H2DR/Xg83sRr0AU1vP8Wk3/GYjHR7Xb/pT2KQCAgtdvtc5qQJmcANE4ikfiiJ90WZrNZrVQqrwhgtVodAURRfIodFSMAhULhA9VQ8XK5PHIgSdIZyQV3LFRFQU6+0TepcJIRCRTAwMLOHBGtqiqT/AQwn88n+sZtC8nmu93uC9KfghnqRlu33+//Y4QDnHafyWTeoxd4IpIBUODmpREAimAw+BsB7CT/CQDt+8TlcslGAGq12mtdflZMlqTfcrn87q5inPT7cDh8iW8mKcvyUUYikB5JKpX6hAyrxWLxLTqu7/V6r3w+3wLPnjebzQt0qpjP57/iu7hEH3QxtcKdRrmxNb1ARObRJOpkMtEikQg7wz3O4XBolIvkmcnyGId/AgwAAYOG5Sqskx4AAAAASUVORK5CYII=',
        'platform-lnx': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAhlJREFUOE9dkr9rE2Ecxr3c3Zv7kUuuF4vmmjSagjQGByelLbU0URx0EFyKinHp4D/QKRTcBVtRCgVFUWyhiIMouIiTiODgqiCCuhQ3B5dWP9/Le5e0X/hw9z7P+7y/D+yvTmdOMCCn0U6/9vtaHpQ2vDiuNJRSC0hXoAnGsA8B5EXLCkFGjubnZ2PHcZYNw/iN/Ae2YDL1oQJFGKxgyKw1m8eOEN5EvgofoEe7m/pQBhOyPcmyUjNi6SGhZ/AVfhDe8X1/qd0+M677JdtJShoge5JlychiFkEGuE/4uW3bf4OgsNZqTda1PygEmV0OpASmlqfgCeENz/Nu+b73Win7p2maF/p2v+ifDeDor+gV2CLcq1bj1szM6aPMvkh7G/2zdJCir6xcJaPoYFrn6PylVCouoCdnwszj6C9hF66hyQHKLRQksKcIP8zn1btGoz5Fh/RMAngEO7mccU/rh8CRTFq2aeZOcAPfXNf5HgRBd2wsdrU3AW9glzNZJigrC2HwDpj5IuGPo6MHr7uuu0L7F3ILpNMN2qts6zLepygaOU947zvg5a3Dv3I5mrUsSw7yKWzAbcLbMnOtVj1Ln7u0e+j9Ipy8gzAs3cR8jPkC+Q7IoW2y5wecyVuu8hXf9zqcbi27RnkHxTg+LMZxWIRLrGRkevpUWK/XTvISu5ZltiWTFplsgLz+aivbmoICDL+TpOS/05lT/wGx1YwMjhFcqgAAAABJRU5ErkJggg==',
        'user-trust-green' : 'data:image/png;base64,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',
        'user-trust-orange': 'data:image/png;base64,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',
        'user-trust-red'   : 'data:image/png;base64,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',
        'user-trust-blue'  : 'data:image/png;base64,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',
        'user-trust-gray'  : 'data:image/png;base64,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'
    }
    
    lscache.setBucket('sgextra');
    var cfgScriptVersion = '1.3';
    
    var installerVersion = lscache.get('version');
    if (cfgScriptVersion != installerVersion) {
        console.log('Version mismatch! clean cache...');
    	lscache.flush(); // if versions are different, flush old data (only for my bucket, SG Extras script)
        lscache.set('version', cfgScriptVersion);
    }
    
    // TRUE to clean the localstorage for this script
    if (false) {
        lscache.setBucket('sgextra');
        lscache.flush();
        
        console.log('Cleaned local data');
    }
    
    
    /* Script variables */
    var FetchType = { SteamID : 1, SteamPage : 2, UserPage : 3 };
    var fetchQueue = Array();
    
    var maxConnections = 20;
    var activeConnections = 0;
	var userRefreshInterval = 2880; // in minutes, defajult 2 days
    
    /* Support functions */
    /* ----------------- */
    //retrieve url asynchonously, then calls hook 
    function ajaxCall(url, finishFn, par1, par2){
        //setTimeout(function() {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(retData) {
                finishFn(retData, par1, par2);
            }
        });
        //}, 0);
    }
    
    function injectSteamLinkSpan(elem, steamAppID) {
        if (steamAppID != null && !elem.find('.steamLink').length) {
            var steamLink = '<span class="steamLink">(<a href="http://store.steampowered.com' + steamAppID + '" target="_new">Steam Store</a>)</span>';
            elem.find('.title').append(steamLink);
        }
    }
    
    function injectSteamCatSpan(elem, steamAppData) {
        // steamAppData format:  category;win;mac;linux
        if (steamAppData != null && !elem.find('.steamCat').length) {
            var steamInfoArr = steamAppData.split(';');
            var steamAppCat = steamInfoArr[0];
            if (steamInfoArr[3] > 0) {
                steamAppCat += ' <div class="platformIcon platform-lnx" title="Linux compatible"></div>';
            }
            if (steamInfoArr[2] > 0) {
                steamAppCat += ' <div class="platformIcon platform-mac" title="Mac compatible"></div>';
            }
            if (steamInfoArr[1] > 0) {
                steamAppCat += ' <div class="platformIcon platform-win" title="Windows compatible"></div>';
            }
            
            var steamCategory = '<div class="steamCat">' + steamAppCat + '</div>';
            elem.find('.entries').append(steamCategory);
        }
    }
    
    function injectUserTrust(userName, userPercent) {
        var userObj = $('a[href="/user/' + userName + '"]');
        $(userObj).attr('title', userPercent+'%');
        if(userPercent > 99) {
            $(userObj).addClass('userTrust userTrustGreen');
        } else if (userPercent > 50) {
            $(userObj).addClass('userTrust userTrustOrange');
        } else if (userPercent >=0) {
            $(userObj).addClass('userTrust userTrustRed');
        } else {
            // did never submit any gift
            $(userObj).addClass('userTrust userTrustGray');
            $(userObj).attr('title', 'User has no votes, yet!');
        }
    }
    
    function parseSteamLink(inputHTML, appID, postObj) {
        var steamURL = $('.steam_store a', $(inputHTML.responseText)).attr('href');
        
        if (steamURL != null) {
            var steamAppID = steamURL.replace('http://store.steampowered.com', '');
            
            lscache.set(appID, steamAppID);
            injectSteamLinkSpan($(postObj), steamAppID);
            
            /* Start getting more info about app, don't decrease connections count yet, let's first finish this game */
            ajaxCall("http://store.steampowered.com" + steamAppID, parseSteamPage, steamAppID, postObj);
        } else {
            activeConnections--;
        }
        //activeConnections--;
    }
    
    function parseSteamPage(inputHTML, steamID, postObj) {
        var steamAppCat = '';
        
        var genreLinks = $('.glance_details a[href*="/genre/"]', inputHTML.responseText);
        if (genreLinks.length > 0) {
            $.each(genreLinks, function(){
                steamAppCat = steamAppCat + (steamAppCat=='' ? '' : ', ') + $(this).html();
            })
        } else {
            steamAppCat = 'n/a';
        }
        
        // check os
        var platform = $(".game_area_purchase_platform", inputHTML.responseText);
        var osWin = platform.find('.win').length;
        var osMac = platform.find('.mac').length;
        var osLnx = platform.find('.linux').length;
        
        var storeData = steamAppCat + ';' + osWin + ';' + osMac + ';' + osLnx;
        
        lscache.set('/steamInfo' + steamID, storeData);
        
        injectSteamCatSpan($(postObj), storeData);
        activeConnections--;
    }
    
    function parseUserPage(inputHTML, userName, postObj) {
        var userPercent=parseInt($('.green .row_right strong', inputHTML.responseText).html());
        
        console.log('User from site: ' + userName + " = " + userPercent);
        if (isNaN(userPercent)) {
            userPercent = -1;
        }
        
        lscache.set('/user/' + userName, userPercent, userRefreshInterval);
        
        injectUserTrust(userName, userPercent);
        
        activeConnections--;
    }
    
    function styleInit(obj) {
        obj.find('head').append('<style>\
.userTrust {\
padding-right: 16px;\
background-position: right;\
background-repeat: no-repeat;\
}\
\
.userTrustGreen {\
color: green !important;\
font-weight: bold;\
background-image: url('+image['user-trust-green']+');\
}\
\
.userTrustOrange {\
color: orange !important;\
font-weight: bold;\
background-image: url('+image['user-trust-orange']+');\
}\
\
.userTrustRed {\
color: red !important;\
font-weight: bold;\
background-image: url('+image['user-trust-red']+');\
}\
\
.userTrustBlue {\
color: blue !important;\
font-weight: bold;\
background-image: url('+image['user-trust-blue']+');\
}\
\
.userTrustGray {\
background-image: url('+image['user-trust-gray']+');\
}\
\
.steamLink {\
float: right;\
font-size: 0.7em;\
margin-top: 4px;\
}\
\
.steamCat {\
float: right;\
width: 30%;\
text-align: right;\
font-weight: bold;\
font-style: normal;\
}\
\
.platformIcon {\
width: 16px;\
height: 16px;\
background-repeat: no-repeat;\
float: right;\
margin-left: 5px;\
}\
\
.platform-win { background-image: url('+image['platform-win']+'); }\
.platform-mac { background-image: url('+image['platform-mac']+'); }\
.platform-lnx { background-image: url('+image['platform-lnx']+'); }\
');
    }
    
    /* Main Functions */
    /* -------------- */
    
    function addSteamLinks() {
        console.log('Add Steam links - Start');
        
        $('.post:visible').each(function(index){
            var appURL = $(this).find('.title a').attr('href');
            var appID = "/steamlink" + appURL.substring(appURL.lastIndexOf('/'));
            //console.log(appId);
            
            var steamAppID = lscache.get(appID);
            if(steamAppID != null){
                injectSteamLinkSpan($(this), steamAppID);
                
                var appData = lscache.get("/steamInfo" + steamAppID);
                if (appData != null) {
                    injectSteamCatSpan($(this), appData);
                } else {
                    fetchQueue.push({
                        type : FetchType.SteamPage,
                        post : $(this),
                        stid : steamAppID
                    });
                }
                
            } else {
                fetchQueue.push({
                    type : FetchType.SteamID,
                    post : $(this),
                    url  : appURL,
                    gaid : appID});
            }
            
            
            //$(this).find('.new').hide();
            if (cfgHideAvatar) {
                $(this).find('.center').hide();
                $(this).find('.left').css('width', '765px');
            }
            
        });
        console.log('Add Steam links - End');
    }
    
    setInterval(function() {
        if (fetchQueue.length > 0) console.log('Queue size: ' + fetchQueue.length + '\t\tActive Connections: ' + activeConnections);
        
        if (fetchQueue.length > 0 && activeConnections < maxConnections) {
            while ((activeConnections < maxConnections) && (fetchQueue.length > 0)) {
                var gaObj = fetchQueue.shift();
                if (gaObj.type == FetchType.SteamID) {
                    // Check again if we don't have it already
                    var steamAppID = lscache.get(gaObj.gaid);
                    if (steamAppID != null){
                        injectSteamLinkSpan(gaObj.post, steamAppID);
                    } else {
                        activeConnections++;
                        ajaxCall('http://www.steamgifts.com' + gaObj.url, parseSteamLink, gaObj.gaid, gaObj.post);
                    }
                } else if (gaObj.type == FetchType.SteamPage) {
                    var steamAppData = lscache.get("/steamInfo" + gaObj.stid);
                    
                    if (steamAppData != null) {
                        injectSteamCatSpan(gaObj.post, steamAppData);
                    } else {
                        activeConnections++;
                        ajaxCall('http://store.steampowered.com' + gaObj.stid, parseSteamPage, gaObj.stid, gaObj.post);
                    }
                } else if (gaObj.type == FetchType.UserPage) {
                    var userPercent = lscache.get('/user/' + gaObj.user);
                    
                    if (userPercent != null) {
                        console.log('User data re-found in cache for user: ' + gaObj.user);
                        injectUserTrust(gaObj.user, userPercent);
                    } else {
                        activeConnections++;
                        ajaxCall('http://www.steamgifts.com/user/' + gaObj.user, parseUserPage, gaObj.user, gaObj.post);
                    }
                }
                    }
        }
    }, 2000);
    
    //Trusted Giveaways
    function highlightTrusted(){
        console.log('Highlight Users - Start');
        $('.post:visible .left .description .created_by a').each(function(index){
            var userPage = $(this).attr('href');
            var userName = $(this).html();
            
            // get user percentage from storage
            if(lscache.get(userPage) != null){
                var userPercent = lscache.get(userPage);
                injectUserTrust(userName, userPercent);
            } else {
                fetchQueue.push({
                    type : FetchType.UserPage,
                    post : $(this),
                    user : userName
                });
            }
        });
        console.log('Highlight Users - End');
    }
    
    function syncPoints(){
        $.ajax({
            type: "get",
            url: "http://www.steamgifts.com/account",
            dataType: "html",
            success: function(data){
                $(data).find('div#navigation ol > li:nth-child(3) > a').each(function(){
                    var accPoints = $(this).html();
                    accPoints = accPoints.substring(9, accPoints.length - 2);
                    document.title = "(" + accPoints + ") " + $.tmptitle;
                    $('div#navigation ol > li:nth-child(3) > a').html("Account (" + accPoints + "P)");
                });
            }
        });
    }
    
    function setupPointsSync() {
        // add points to the browser title, updated every minute
        $.tmptitle = 'SteamGifts.com'; // document.title
        target = document.querySelector('div#navigation ol > li:nth-child(3) > a');
        mObs = new MutationObserver(function() {
            document.title = target.innerHTML.replace('Account ','') + ' ' + $.tmptitle;
        });
        config = {
            attributes: true,
            childList: true,
            characterData: true,
        };
        mObs.observe(target, config);
        
        document.title = target.innerHTML.replace('Account ','') + ' ' + $.tmptitle;
        
        setInterval(syncPoints, 60000);
    }
    
    styleInit($('html'));
    
    if (cfgSteamLinks) addSteamLinks();
    if (cfgHighlightTrusted) highlightTrusted();
    if (cfgPointsTitle) setupPointsSync();
    
    var ajaxGiftsObj = document.querySelector('div.ajax_gifts');
    giftObs = new MutationObserver(function(mutRecs) {
        console.log('Changes detected');
        if (cfgSteamLinks) addSteamLinks();
        if (cfgHighlightTrusted) highlightTrusted();
    });
    giftConfig = {
        attributes: true,
        childList: true,
        characterData: true,
    };
    giftObs.observe(ajaxGiftsObj, giftConfig);
    
})(jQuery);