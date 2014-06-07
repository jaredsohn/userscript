// ==UserScript==
// @name          Follow Rank
// @namespace     http://www.FollowRank.com
// @id 			  http://www.FollowRank.com
// @description   display the Follows in Common and the Follow Rank for a given users twitter profile page
// @copyright     2009+, Ian Irving (http://www.FalsePositives.com)
// @author		  Ian Irving
// @homepage	  http://www.FalsePositives.com	
// @version       1.5
// @include       http*://twitter.com/*
// @userscripts   http://userscripts.org/scripts/show/64286

// ==/UserScript==

/*
 * Change Log
 * Dec 20 2009, Version: 1.2
 * now adding information after div.screen-name rather than appending it, as this was polluting the .action-menu item texts. a real "peanut butter in my chocolate" situation, but not in a good way :)
 * several optimization to improve performance, in particular calculating $'div.screen-name') only once.
 * Changes to the text of the tool tip help text
 * Jan 4 2010, Version: 1.3
 * To address the Twitter API Announcements that "Social Graph API: Legacy data format will be eliminated 1/11/2010"
 * http://groups.google.com/group/twitter-api-announce/browse_thread/thread/5f7df55e3ddf85ed
 * implemented the use of cursors when fetching json data.
 * In getting the list of Followers id this is used only for more than 200,000 users.
 * Progress getting data via json cursors is displayed.
 * Jan 4 2010, Version: 1.4
 * Now showing details (and links) on the users who are "Follows in Common" and "Follow Rank" users. details include thumb nail avatar, name and link to their profile page.
 * Also trapping api throtle limits better with better interal handling of, and reporting, both end user and in the console, of such.
 * Feb 18 2010, Version 1.5
 * revisioning and respondeding to twitters move to versioning in it's Twitter REST API (as pre http://groups.google.com/group/twitter-api-announce/browse_thread/thread/2b70bd6ea4aec175 )
 */
(function(){
    var DEBUG = true;
    $ = unsafeWindow.jQuery;
    console.time('Follow Rank');
    if (DEBUG && console) {
        console.log('version of jquery install is ' + $().jquery);
    }
    var url_user_follows = "http://api.twitter.com/1/friends/ids/";
    var url_user_followers = "http://api.twitter.com/1/followers/ids/";
    var user_follows_lst = [];
    var user_followers_lst = [];
    var session_user_follows_lst = [];
    var follows_in_common = [];
    var followRank_users = [];
    var fic_user_details_list = "";
    var session_user_screen_name //this is the screen_name of the profile we are looking at
    var page_user_screen_name // this is the screen_name of who is doing the looking i.e. you!
    var page_follower_count; // the screen scaped version of the follower count
    var FR_STYLE = ' style="font-size: 14px; line-height: 1; width: 100%; padding-bottom: 3px; margin-left:-10px; display: block; font-weight: normal; cursor:pointer; " ';
    var User_STYLE = ' style="display: block; " ';
    var dwnbttn_STYLE = 'background: transparent url(http://a2.twimg.com/a/1262899036/images/toggle_down_dark.png) no-repeat scroll right; margin-right:25 px;';
    var upbttn_STYLE = 'background: transparent url(http://a2.twimg.com/a/1262899036/images/toggle_up_dark.png) no-repeat scroll right; margin-right:25 px;';
    var FR_location_selector = 'div.screen-name:first';
    var FR_location_jq;
    var FRSectionId = "FRSection"
    var FR_msg_selector = '#FR_msg';
    var MaxCacheAge = 60 * 60 * 24 * 1000; // Max Age for the Cached data is 1 day in milliseconds
    var currentTime = new Date().valueOf(); // current datetime in milliseconds
    //
    // see http://diveintogreasemonkey.org/patterns/add-css.html
    function addGlobalStyle(css){
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    
    function getIntersect(arr1, arr2){
        /**
         * given 2 arrays returns an array with all elements in arr1 that are in arr2
         * see http://www.falsepositives.com/index.php/2009/12/01/javascript-function-to-get-the-intersect-of-2-arrays/ for more details
         */
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (v in o) {
                r.push(v);
            }
        }
        return r;
    }
    
    function Array_diff(arr1, arr2){
        /**
         * given 2 arrays returns an array with all elements in arr1 that are NOT in arr2
         */
        var r = [], o = {}, l = arr2.length, i, v;
        for (i = 0; i < l; i++) {
            o[arr2[i]] = true;
        }
        l = arr1.length;
        for (i = 0; i < l; i++) {
            v = arr1[i];
            if (!(v in o)) {
                r.push(v);
            }
        }
        return r;
        
    }
    
    function Array_unique(a){
        var b = [];
        var l = a.length;
        for (var i = 0; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                // If this[i] is found later in the array
                if (a[i] === a[j]) 
                    j = ++i;
            }
            b.push(a[i]);
        }
        return b;
    }
    
    /*
     * This method of processing the ajax queue is so that we can still make
     * Greasemonkey-style AJAX calls at any point during execution.
     * from http://blog.maxaller.name/?p=58
     */
    var ajaxQueue = [];
    var processAjaxQueue = function(){
        if (ajaxQueue.length > 0) {
            for (ajax in ajaxQueue) {
                var obj = ajaxQueue[ajax];
                GM_xmlhttpRequest(obj);
            }
            ajaxQueue = [];
        }
    }
    setInterval(function(){
        processAjaxQueue();
    }, 100);
    
    function gmAjax(obj){
        ajaxQueue.push(obj);
    }
    
    /**
     * add the key value to the array list of values being tracked.
     * @param {Object} key required.
     */
    function GM_setCachedDataTrackingValueKey(key){
        var Tracking = eval(GM_getValue('CachedDataTracking_cache', ""));
        if (Tracking == "" || Tracking == undefined) {
            var Tracking = [];
        }
        // make sure the key is not arelady in the Tracking list.
        var i, l = Tracking.length;
        for (i = 0; i < l; i++) {
            if (Tracking[i] === key) {
                return ""; // the key is already in the Tracking array so we can stop;
            }
        }
        Tracking.push(key);
        GM_setValue('CachedDataTracking_cache', JSON.stringify(Tracking));
        
        //      console.log('Tracking now =' + Tracking);
        //		console.log('Tracking now =' + uneval(Tracking));
    
    
    }
    /**
     * delete all cached values older than MaxCacheAge
     * @param {Number} MaxCacheAge 0=all Required.
     */
    function GM_flushCachedData(MaxCacheAge){
        //MaxCacheAge = 0;
        
        //    console.time('GM_flushCachedData');
        //    console.log('GM_flushCachedData MaxCacheAge=' + MaxCacheAge);
        
        var Tracking = eval(GM_getValue('CachedDataTracking_cache', ""));
        //console.log('GM_flushCachedData Tracking=' + Tracking);
        if (!(Tracking == "" || Tracking == undefined)) {
            //    console.log('GM_flushCachedData, got tracking=' + Tracking); 
            //    console.log('GM_flushCachedData, currentTime=' + currentTime);
            
            var l = Tracking.length;
            //  console.log('GM_flushCachedData, l=' + l);
            var i, v, who;
            var DeleteWhoFromTracking = [];
            
            for (i = 0; i < l; i++) {
                who = Tracking[i];
                //      console.log('GM_flushCachedData, who=' + who);
                var DateofWho = GM_getValue(who + '_cacheDate', ""); // get the age of the cache for Who
                //      console.log('GM_flushCachedData, dateofwho=' + DateofWho);
                if (DateofWho != "") {
                    // console.log('GM_flushCachedData, DateofWho(' + DateofWho + ') < currentTime(' + currentTime + ') - MaxCacheAge (' + MaxCacheAge + ') =' + DateofWho < currentTime - MaxCacheAge);
                    
                    // if age is older that MaxCacheAge 
                    if (MaxCacheAge == 0 || (DateofWho < (currentTime - MaxCacheAge))) {
                        // console.log('GM_flushCachedData, DateofWho(' + DateofWho + ') < currentTime(' + currentTime + ') - MaxCacheAge (' + MaxCacheAge + ') =' + DateofWho < currentTime - MaxCacheAge);
                        //the blank the date and the data and remove from CachedDataTracking_cache
                        GM_deleteValue(who);
                        GM_deleteValue(who + '_cacheDate');
                        DeleteWhoFromTracking.push(who)
                    }
                }
                
            }
            if (DeleteWhoFromTracking.length > 0) { // if there is anyone to remove from tracking
                // console.log('GM_flushCachedData, DeleteWhoFromTracking=' + DeleteWhoFromTracking);
                var NewTracking = Array_diff(Tracking, DeleteWhoFromTracking); //NewTracking is new array minus element from 2nd array
                //  console.log('GM_flushCachedData, NewTracking=' + NewTracking);
                if (NewTracking.length == 0) {
                    GM_setValue('CachedDataTracking_cache', "")
                }
                else {
                    GM_setValue('CachedDataTracking_cache', JSON.stringify(NewTracking));
                }
            }
            
        }
        GM_setValue('CachedDataTracking_cacheDate', currentTime);
        
        //   console.timeEnd('GM_flushCachedData');
    }
    
    /**
     * Remove the key from the array list of values begining tracked in the cache
     * @param {string} key. required.
     */
    function GM_removeCachedDataTrackingValueKey(key){
        console.log('GM_removeCachedDataTrackingValueKey,key=' + key);
        var Tracking = eval(GM_getValue('CachedDataTracking_cache', ""));
        if (Tracking == "" || Tracking == undefined) {
            return "";
        }
        var i, l = Tracking.length, NewTracking = [], j = 0;
        for (i = 0; i < l; i++) {
            if (Tracking[i] != key) {
                NewTracking[j++] = Tracking[i];
            }
        }
        //   if (NewTracking.length > 0) {
        GM_setValue('CachedDataTracking_cache', JSON.stringify(NewTracking));
        GM_deleteValue(key);
        //    }
    
    }
    
    
    /**
     * GM_setCachedDataValue set the value, using the key name, and the cacheDate for the value based on the current datetime.
     * to see the values set use about:config in the firefox awsome bar and filter with greasemonkey.scriptvals.http://www.FollowRank.com/
     * @param {String} key  The key argument is a string of no fixed format.  Required.
     * @param {Object} value The value argument can be a string, boolean, or integer. Required.
     * @returns void
     *
     */
    function GM_setCachedDataValue(key, value){
        //  var DEBUG = true;
        if (DEBUG && console) 
            console.log('GM_SetCachedDataValue(key = ' + key + ', value = ' + value);
        
        GM_setCachedDataTrackingValueKey(key);
        GM_setValue(key, value);
        GM_setValue(key + '_cacheDate', currentTime.toString());
        
        if (DEBUG && console) 
            console.log('GM_SetCachedDataValue done');
    }
    /**
     * GM_getCachedDataValue returns the value indicated by the key if a) it exists, b) if it is less the maxDuration milliseconds old; otherwise return a blank.
     * to see the values set use about:config in the firefox awsome bar and filter with greasemonkey.scriptvals.http://www.FollowRank.com/
     * @param {String} key key is the name of the value stored. key argument is a string of no fixed format.  Required.
     * @param {Number} maxDuration is the  Maximum Duration (or how old) in milliseconds the cached data can be. maxDuration is a number. Required.
     * @returns a Integer, String or Boolean
     */
    function GM_getCachedDataValue(key, maxDuration){
        //  var DEBUG = true;
        if (DEBUG && console) 
            console.log('GM_getCachedDataValue(key = ' + key + ', maxDuration = ' + maxDuration);
        if (typeof maxDuration != "number") {
            console.error('maxDuration is NOT a number, but rather a ' + typeof maxDuration);
            return "";
        }
        
        var raw = GM_getValue(key + '_cacheDate', ''); // get the age of the cache
        //    console.log('GM_getCachedDataValue_cacheDate raw=' + raw);
        if (raw != '' && raw != undefined) {
            //           var cache_dt = new Date(parseInt(raw));
            var age = currentTime - raw;
            //            var age = currentTime.getTime() - cache_dt.getTime();
            var allowed_age = maxDuration;
            if (age <= allowed_age) {
                // if the age is less than the max allowed age the get and return the cached value  
                
                GM_setCachedDataTrackingValueKey(key);
                return GM_getValue(key, "");
            }
            else {// if the age is greater than the max then blank out the cache date and value and return black
                GM_removeCachedDataTrackingValueKey(key);
                GM_deleteValue(key);
                GM_deleteValue(key + '_cacheDate');
                console.info('GM cahaced data was too old so I killed it! Age was = ' + age + ' and allowed aged was =' + allowed_age);
            }
        }
        return "";
    }
    /**
     * creates html (a li wrapping a anchor link and img) to show mimimum information and link to a users profile page
     * @param {Object} userProfile might be the full josn user profile object from twiter
     * see http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-users%C2%A0show
     * curently using : id, screen_name, name, profile_image_url
     */
    function buildUserDescription(userProfile){
        //
        var html = "";
        html = '<a href="http://twitter.com/' + userProfile.screen_name + '" title="' + userProfile.name + '">';
        html += '<img width="24" height="24" src="' + userProfile.profile_image_url + '">' + '</a>';
        html = '<li id="fr_id_' + userProfile.id + '">' + html + '</li>';
        return html;
    }
    
    function showUsersInfo(userArr, selector){
        console.time('showUsersInfo' + selector);
        var lstHTML = "";
        userArr.forEach(function(userid){
            //    console.log(userid)          
            var user_profile = {};
            var tmp = GM_getCachedDataValue('user_Profile' + '_' + userid, MaxCacheAge * 7); // is there user data less that 7 day old?
            if (tmp != "") {
                //     console.log('got user data via cache');
                user_profile = eval('(' + tmp + ')');
                $(selector).append(buildUserDescription(user_profile));
            }
            else {
                if (DEBUG) {
                    console.log('going for data for ' + userid + ' via getJSON');
                    console.log('json call : http://twitter.com/users/show/' + userid + '.json');
                }
                gmAjax({
                    method: 'GET',
                    timeout: 10000,
                    url: 'http://api.twitter.com/1/users/show/' + userid + '.json',
                    onload: function(response){
                    
                        var user_profile = eval('(' + response.responseText + ')');
                        if (response.status == 400) {
                            // console.error('ERROR (GM : FollowRank : showUsersInfo) status =' + user_profile.status + ', >>' + user_profile.responseText);
                            //console.error('user_profile.error=' + user_profile.error);
                            jsonTimeOut();
                            //  return;
                        }
                        else {
                            //  console.log('json call : http://twitter.com/users/show/' + userid + '.json');
                            //   console.log('response = ' + uneval(user_profile));
                            $(selector).append(buildUserDescription(user_profile));
                            GM_setCachedDataValue('user_Profile_' + userid, uneval(user_profile));
                        }
                        
                        
                    },
                    onerror: function(response){
                        user_followers_lst = "Error";
                        console.error('ERROR' + response.status + ' for ' + 'http://twitter.com/users/show/' + userid + '.json');
                        
                    }
                });
            }
        });
        console.timeEnd('showUsersInfo' + selector);
    }
    
    function add_FiC_to_page(){
        follows_in_common = getIntersect(user_follows_lst, session_user_follows_lst);
        if (DEBUG && console) {
            console.log("length of YOUR (" + session_user_screen_name + ") follows=" + session_user_follows_lst.length);
            console.log("length of " + page_user_screen_name + " follows=" + user_follows_lst.length);
        }
        var bttn = '';
        if (follows_in_common.length != 0) {
            bttn = '<span id="fic_bttn" style="' + dwnbttn_STYLE + '" >&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        }
        
        var FiC_span_preTag = '<div ' + FR_STYLE + ' id="FiC" title="' + follows_in_common.length + ' of the people whom you are Following (' + session_user_follows_lst.length + ') are also being Followed by ' + page_user_screen_name + '.">';
        var fic_percent = ((follows_in_common.length / session_user_follows_lst.length) * 100).toFixed();
        var Fic_span = ' ' + FiC_span_preTag + 'Follows in Common : ' + fic_percent + '%' + ' (' + follows_in_common.length + ' of ' + session_user_follows_lst.length + ')' + bttn + ' </div>';
        
        FRSection.append(Fic_span);
        $('#FiC').tipsy({
            gravity: 's'
        });
        
        $(FR_msg_selector).hide();
        
        if (follows_in_common.length == 0) {
            $('#FiC').css("cursor", "");
        }
        if (follows_in_common.length != 0) {
            $('#FiC').click(function(){
                if ($('#FiC_users').length == 0) {
                    $('#FiC').append('<ul ' + User_STYLE + ' id="FiC_users"></ul>')
                    showUsersInfo(follows_in_common, '#FiC_users');
                }
                else {
                    $('#FiC_users').toggle();
                }
                
                if ($('#FiC_users').is(":visible")) {
                    $('#fic_bttn').attr("style", upbttn_STYLE);
                }
                else {
                    $('#fic_bttn').attr("style", dwnbttn_STYLE);
                }
            });
        }
        
        
        
    }
    
    
    function add_FR_to_page(cursor){
        followRank_users = getIntersect(user_followers_lst, session_user_follows_lst);
        var followRank = ((followRank_users.length / session_user_follows_lst.length) * 100).toFixed();
        if (DEBUG && console) {
            console.log("length of YOUR (" + session_user_screen_name + ") follows=" + session_user_follows_lst.length);
            console.log("length of " + page_user_screen_name + " followers=" + user_followers_lst.length);
            console.log("length of followRank=" + followRank_users.length);
        }
        
        
        var bttn = '';
        if (followRank_users.length != 0) {
            /// atl img is http://s.twimg.com/a/1262899036/images/divot.gif    
            bttn = '<span id="fr_bttn" style="' + dwnbttn_STYLE + '" >&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        }
        var FR_span_preTag = '<div  ' + FR_STYLE + ' id="FR" title="' + followRank_users.length + ' of the people you Follow (' + session_user_follows_lst.length + ') are also Following ' + page_user_screen_name + '.">';
        var FR_span;
        var FR_content;
        
        if (user_followers_lst == "Error") {
            FR_span = ' ';
        }
        else {
        
            // FR_span = ' ' + FR_span_preTag + 'FollowRank : ' + followRank_users.length + ' (' + followRank + '%)</span>';  // old style number than percent
            FR_content = '' + 'FollowRank : ' + followRank + '%' + ' (' + followRank_users.length + ' of ' + session_user_follows_lst.length + ')' + bttn + '';
            FR_span = ' ' + FR_span_preTag + FR_content + '</div>';
            
        }
        
        if ($('#FR').length > 0) {
            if (cursor == 0) {
                $('#FR').html(FR_content);
            }
            else {
                $('#FR').html(FR_content + ' still fetching ..' + ((user_followers_lst.length / page_follower_count) * 100).toFixed(2) + "%");
            }
        }
        else {
            FRSection.append(FR_span);
            $('#FR').css("float", "left"); //this is to fix a aliment issue
        }
        
        $(FR_msg_selector).hide();
        $('#FR').tipsy({
            gravity: 's'
        });
        
        
        if (cursor == 0) {
            if (followRank_users == 0) {
                $('#FR').css("cursor", "");
            }
            //console.log('ready for click')
            if (followRank_users.length != 0) {
                $('#FR').click(function(){
                    if ($('#FR_users').length == 0) {
                        $('#FR').append('<ul  ' + User_STYLE + '  id="FR_users"></ul>')
                        showUsersInfo(followRank_users, '#FR_users');
                    }
                    else 
                        $('#FR_users').toggle();
                    
                    if ($('#FR_users').is(":visible")) {
                        $('#fr_bttn').attr("style", upbttn_STYLE);
                    }
                    else {
                        $('#fr_bttn').attr("style", dwnbttn_STYLE);
                    }
                    
                });
            }
            
            console.timeEnd('Follow Rank');
        }
        
        
        
        
    }
    
    function jsonTimeOut(){
        gmAjax({
            method: 'GET',
            timeout: 100000,
            url: 'http://api.twitter.com/1/account/rate_limit_status.json',
            onload: function(response){
                var r = {};
                var r = eval('(' + response.responseText + ')');
                var hourly_limit = r.hourly_limit;
                var reset_time = r.reset_time;
                var resetDateTime = new Date(reset_time);
                var reset_time_in_seconds = Date(parseInt(r.reset_time_in_seconds));
                var msg1 = 'Doh! FollowRank has exceeded the Twitter rate limit of ' + hourly_limit + '.  Reset time is ' + resetDateTime.toTimeString();
                console.error('Error : ' + msg1);
                $('#FR_msg').text(msg1).css("color", "red").css("cursor", "").show();
            }
        });
    }
    
    function GoGet_Part3(cursor){
    
        if (cursor == undefined) {
            cursor = -1
        }
        var ByCursor = true; // used to describe if retrieval of ids will be with cursor's (5,000 at a time) or via one biggish page (which seems fine for id sets < 800,000 id's)
        var url = url_user_followers + page_user_screen_name + '.json?cursor=' + cursor;
        
        var tmp = GM_getCachedDataValue('user_followers_lst' + '_' + page_user_screen_name, MaxCacheAge);
        
        if (tmp != "") {
            //            user_followers_lst = eval(tmp);
            user_followers_lst = eval(tmp);
            
            if (DEBUG && console) {
                console.log('GoGet_Part3 got value from Cache tmp =' + user_followers_lst);
            }
            add_FR_to_page(0);
        }
        else {
            if (page_follower_count < 800000) {
                ByCursor = false;
                url = url_user_followers + page_user_screen_name + '.json';
                cursor = 0;
            }
            
            if (DEBUG && console) {
                console.log('about to gmAjax (GoGet_Part3) for ' + url);
            }
            
            gmAjax({
                method: 'GET',
                timeout: 10000,
                url: url,
                onload: function(response){
                    console.log('onload for ' + url);
                    var r = {};
                    var r = eval('(' + response.responseText + ')');
                    if (response.status == 400) {
                        console.error('ERROR (GM : Follow Rank : GoGet_Part3) status =' + response.status + ', >>' + response.responseText);
                        jsonTimeOut();
                        //   return;
                    }
                    else 
                        if (ByCursor) {
                            var next_cursor = r.next_cursor;
                            console.log('response.next_cursor=' + next_cursor);
                            if (next_cursor == 'undefined') {
                                console.log('response.responseText=' + response.responseText);
                                add_FR_to_page(0);
                            }
                            var new_ids = r.ids;
                            user_followers_lst = user_followers_lst.concat(new_ids);
                        }
                        else {
                            //       console.log(r);
                            user_followers_lst = user_followers_lst.concat(r);
                            next_cursor = 0;
                        }
                    //console.log('user_followers_lst.length= ' + user_followers_lst.length);
                    if (next_cursor == 0) {
                        GM_setCachedDataValue('user_followers_lst' + '_' + page_user_screen_name, JSON.stringify(user_followers_lst));
                        add_FR_to_page(next_cursor);
                    }
                    else {
                        add_FR_to_page(next_cursor);
                        GoGet_Part3(next_cursor)
                    }
                },
                onerror: function(response){
                    user_followers_lst = "Error";
                    console.error('ERROR' + response.status + ' for ' + url_user_followers + '?screen_name=' + page_user_screen_name);
                    add_FR_to_page();
                }
            });
            
        }
        
        
        
    }
    
    function GoGet_Part2(cursor){
    
        if (DEBUG && console) {
            console.log('GoGet_Part2');
            console.log('GoGet_Part2 : cursor=' + cursor);
        }
        
        if (cursor == undefined) {
            cursor = -1
        }
        
        var tmp = GM_getCachedDataValue('session_user_follows_lst' + '_' + session_user_screen_name, MaxCacheAge);
        console.log('GoGet_Part2 got value from Cache tmp =' + tmp)
        if (tmp != "") {
            console.log('GoGet_Part2 got value from Cache tmp =' + tmp)
            session_user_follows_lst = JSON.parse(tmp);
            if (DEBUG && console) {
                console.log('GoGet_Part2 got value from Cache tmp =' + session_user_follows_lst);
            }
            add_FiC_to_page();
            GoGet_Part3();
        }
        else {
            if (DEBUG && console) 
                console.log('GoGet_Part2 go for ajax way via ' + url_user_follows + session_user_screen_name + '.json?cursor=' + cursor);
            
            gmAjax({
                method: 'GET',
                url: url_user_follows + session_user_screen_name + '.json?cursor=' + cursor,
                onload: function(response){
                    $(FR_msg_selector).append('...');
                    if (response.status == 400) {
                        console.error('ERROR (GM : Follow Rank : GoGet_Part2) status =' + response.status + ', >>' + response.responseText);
                        jsonTimeOut();
                        //  return;
                    }
                    else {
                        var r = {};
                        var r = eval("(" + response.responseText + ')');
                        var next_cursor = r.next_cursor;
                        //           console.log('response.next_cursor=' + next_cursor);
                        var new_ids = r.ids;
                        //var ar3 = ar1.concat(new_ids);
                        
                        session_user_follows_lst = user_followers_lst.concat(new_ids);
                        //        console.log('session_user_follows_lst length= ' + session_user_follows_lst.length);
                        if (next_cursor == 0) {
                            GM_setCachedDataValue('session_user_follows_lst' + '_' + session_user_screen_name, JSON.stringify(session_user_follows_lst));
                            add_FiC_to_page();
                            GoGet_Part3(-1);
                        }
                        else {
                            GoGet_Part2(next_cursor)
                        }
                    }
                    
                    
                }
            });
            
        }
    }
    
    
    function GoGet_Part1(cursor){
    
        if (cursor == undefined) {
            cursor = -1
        }
        
        if (DEBUG && console) 
            console.log('GoGet_Part1 for ' + 'user_follows_lst' + '_' + page_user_screen_name);
        var tmp = GM_getCachedDataValue('user_follows_lst' + '_' + page_user_screen_name, MaxCacheAge);
        //     console.log('GoGet_Part1 got value from Cache tmp =')
        if (tmp != "") {
            //      console.log('GoGet_Part1 got value from Cache tmp =' + tmp)
            user_follows_lst = JSON.parse(tmp);
            // console.log('GoGet_Part1 got value from Cache tmp =' + tmp)
            GoGet_Part2(-1);
        }
        else {
            var url = url_user_follows + page_user_screen_name + '.json?cursor=' + cursor;
            if (DEBUG && console) {
                console.log('GoGet_Part1 go for ajax way url=' + url);
            }
            gmAjax({
                method: 'GET',
                url: url,
                onload: function(response){
                    if (response.status == 400) {
                        console.error('ERROR (GM : Follow Rank : GoGet_Part1) status =' + response.status + ', >>' + response.responseText);
                        jsonTimeOut();
                        //       return;
                    }
                    else {
                        $(FR_msg_selector).append('...');
                        
                        if (DEBUG && console) 
                            console.log('GoGet_Part1 GOT IT the ajax way');
                        
                        
                        var r = {};
                        var r = eval("(" + response.responseText + ')');
                        var next_cursor = r.next_cursor;
                        var new_ids = r.ids;
                        
                        user_follows_lst = user_followers_lst.concat(new_ids);
                        
                        if (next_cursor == 0) {
                            GM_setCachedDataValue('user_follows_lst' + '_' + page_user_screen_name, JSON.stringify(user_follows_lst));
                            GoGet_Part2(-1);
                        }
                        else {
                            GoGet_Part2(next_cursor)
                        }
                    }
                }
            });
        }
        
    }
    
    
    
    
    console.time('start');
	//alert('yes');
    // is this a profile page? and are we loged in?
    //   if ((document.getElementsByTagName('body')[0].id == 'profile') && (document.getElementById('profile_link'))) {
    if ($('Body#profile').length == 1) {
		if (DEBUG && console) 
			console.log('is this a profile page? and are we loged in?: YES');
		FR_location_jq = $(FR_location_selector);
		FR_location_jq.after('<div id="FRSection" style="width: 400px; display: block; float: left; margin-left: 10pt; "><span id="FR_msg" ' + FR_STYLE + '>computing Follows in Common and FollowRank</span></div>');
		// Note that is is put after, becuase otherwise it populate the user name displayed, which is usesed by the "tool" button.
		FRSection = $('#FRSection');
		
		
		page_user_screen_name = $('meta[name=page-user-screen_name]').attr("content");
		session_user_screen_name = $('meta[name=session-user-screen_name]').attr("content");
		page_follower_count = parseInt($("#follower_count").html().replace(/,/g, ''));
		
		if (DEBUG && console) {
			console.log("page_user_screen_name: " + page_user_screen_name);
			console.log("session_user_screen_name: " + session_user_screen_name);
			console.log("page_follower_count: " + page_follower_count);
		}
		
		/** this will delete ALL GM values stored in about:config by this script.		
	 console.log(GM_listValues());
	 var vals = GM_listValues().map(GM_deleteValue);
	 console.log(GM_listValues());
	 */
		var TrackingDate = eval(GM_getValue('CachedDataTracking_cacheDate', ""));
		//	console.log('TrackingDate ='+TrackingDate);
		if (TrackingDate < (currentTime - MaxCacheAge)) {
			console.time('do flush');
			GM_flushCachedData(MaxCacheAge); //cleanup the cache by remove anything older than 24 hours	
			console.timeEnd('do flush');
		}
		
		GoGet_Part1();
	//			$.ajax({url:url,data:data,success:requestedUsers,dataType:'jsonp',cache:true});
	 console.timeEnd('start');
	
	}
	else {
		//alert('We have a ? ' + $('body'));
			console.log('We have a ? ' + $('body'));
		if ($('body#list_show').length == 1) {
			console.log('We have a List');
		//	alert('yes, We have a List');
		}
		else {
			console.log('We have a ? ' + $('body'));
		}
	}
    
})();



