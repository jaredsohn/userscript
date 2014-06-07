// ==UserScript==
// @name           Twitter Live Updater
// @namespace      abhinavsarkar.net
// @description    Updates live the twitter home timeline without browser refresh
// @include        http://twitter.com/home*
// @include        http://twitter.com/replies*
// @include        http://twitter.com/public_timeline*
// @exclude        http://twitter.com/*#inditweets
// ==/UserScript==

/*
#
# (C) 2007 Abhinav Sarkar
# Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
#
# History
# -------
#
# 2008-01-30 - First working version
# 2008-02-10 - Updates the "currently" status, update count, makes tinyurls links, fixed a bug
# 2008-04-14 - Fixed the 'reply to' and 'delete' shortcuts,use of html template instead of DOM
# 2008-04-16 - Refactored the code, added replies and public_timeline to includes
# 2008-05-05 - Fixed the bug due to change in entry template
#
*/


(function() {
    tlu = {
        xp: function(p, context) {
            if (!context) context = document;
            var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
            return arr;
        },
        
        updateTweets: function() {
            if (timerId != undefined)
                window.clearTimeout(timerId);
                
            tlu.xp('//*[@id="timer"]')[0].innerHTML = "Updating now";
            tlu.xp('//*[@id="loader"]')[0].style.display = "";
            
            tlu.getData(unsafeWindow.tweetDataURL, tlu.showData);
            
            timerId = window.setTimeout(tlu.updateTimer, 3000, updateInterval);
            window.setTimeout(tlu.updateTweets, updateInterval);
        },
        
        updateTimer: function(timeLeft) {
            if (timerId != undefined)
                window.clearTimeout(timerId);
            tlu.xp('//*[@id="loader"]')[0].style.display = "none";
            tlu.xp('//*[@id="timer"]')[0].innerHTML = "Updating in " + Math.round(timeLeft/1000) + " seconds";
            timerId = window.setTimeout(tlu.updateTimer, timerInterval, timeLeft-timerInterval);
        },
        
        updatePublishTime: function() {
            result = tlu.xp('//abbr[@class="published"]');
            for (i=0; i<result.length; i++) {
                result[i].innerHTML = tlu.updatedPublishTime(result[i].title)[0];
            }
            window.setTimeout(tlu.updatePublishTime, updateInterval/2);
        },
        
        getData: function(url, cb) {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(xhr) {
                    if (xhr.status == 200) {
                        cb(xhr.responseText);
                        updateInterval = 60*1000;
                    }
                    if (xhr.status == 400) {
                        tlu.xp('//*[@id="timer"]')[0].innerHTML = 'Rate limit exceeded!';
                        updateInterval = 5*60*1000;
                    }
                }    
            });
        },
        
        showData: function(data) {
            tweets = eval(data);
            
            latestTweetId = tlu.xp("/html/body/div[2]/div[3]/div/div/table/tbody/tr")[0].id.substr(7);
            newTweets = tweets.filter(function(element, index, array) {return (element.id > latestTweetId);});
            newTweets.reverse();

            date = new Date();

            for (i=0; i<newTweets.length; i++) {
                // 2008-01-30T08:17:58+00:00
                // Wed Jan 30 08:11:18 +0000 2008
                tDate = newTweets[i].created_at.split(" ");
                tMonth = months.indexOf(tDate[1]);
                tDay = tDate[2];
                tYear = tDate[5];
                tDoW = tDate[0];
                tTime = tDate[3];
                tOffestHour = tDate[4].substr(0, 3);
                tOffsetMinute = tDate[4].substr(3); 
                tHour = tTime.split(":")[0];
                tMinute = tTime.split(":")[1];
                tSecond = tTime.split(":")[2];
                
                tDateHTTPFormat = tYear + "-" + ((tMonth+1 < 10) ? ('0'+(tMonth+1)) : (tMonth+1)) + "-" + tDay + "T" + tHour + ":" + tMinute + ":" + tSecond + tOffestHour + ":" + tOffsetMinute;
                tDateIETFFormat = tDoW + ", " + tDay + " " + months[tMonth] + " " + tYear + " " + tTime + " GMT";
                
                date.setTime(Date.parse(tDateIETFFormat));
                now = new Date();
                ago = (now.getTime() - date.getTime())/1000;
            
                hentry_html = hentry_template;
                
                if (newTweets[i].user.screen_name != username) {
                    hentry_html = hentry_html.replace(/<!-- delete -->.*<!-- delete -->/m, '');
                } else {
                    hentry_html = hentry_html.replace(/<!-- reply -->.*<!-- reply -->/m, '');
                }
                updatedPublishTime = tlu.updatedPublishTime(tDateHTTPFormat);
                
                hentry_html = hentry_html.replace("%%id%%", newTweets[i].id, "g")
                            .replace("%%screen_name%%", newTweets[i].user.screen_name, "g")
                            .replace("%%profile_image_url%%", newTweets[i].user.profile_image_url, "g")
                            .replace("%%name%%", newTweets[i].user.name, "g")
                            .replace("%%text%%", newTweets[i].text
                                .replace(/(http:\/\/tinyurl\.com\/\w*)/g, "<a href='$1'>$1</a> ")
                                .replace(/@([A-Za-z0-9_]*)/g, "@<a href='http://twitter.com/$1'>$1</a>"), "g")
                            .replace("%%created_at_http_format%%", tDateHTTPFormat, "g")
                            .replace("%%created_at_relative%%", updatedPublishTime[0], "g")
                            .replace("%%ago%%", updatedPublishTime[1])
                            .replace("%%source%%", newTweets[i].source, "g")
                            .replace("%%auth_token%%", auth_token, "g");
                  
                parent_node = tlu.xp("/html/body/div[2]/div[3]/div/div/table/tbody")[0];
                new unsafeWindow.Element.insert(parent_node, {'top': hentry_html})
                
                if (newTweets[i].text.substr(0, username.length+1) == ('@' + username))
                    new unsafeWindow.Effect.Highlight("status_" + newTweets[i].id, {duration: 5.0, startcolor: '#DDFFCC', endcolor: '#e0ff92'});
                else
                    new unsafeWindow.Effect.Highlight("status_" + newTweets[i].id, {duration: 5.0, startcolor: '#DDFFCC'});                
                
                if (newTweets[i].user.screen_name == username) {
                    tlu.xp('//*[@id="currently"]')[0].innerHTML = newTweets[i].text
                    .replace(/(http:\/\/tinyurl\.com\/\w*)/g, "<a href='$1'>$1</a> ")
                    .replace(/@([A-Za-z0-9_]*)/g, "@<a href='http://twitter.com/$1'>$1</a>");
                    tlu.xp('//*[@id="update_count"]')[0].innerHTML = parseInt(tlu.xp('//*[@id="update_count"]')[0].innerHTML) + 1;
                }
            }
        },
        
        
        /* This function's original code is taken from http://userscripts.org/scripts/review/13420
            originally wriiten by Lenny Domnitser http://domnit.org */
        updatedPublishTime: function(HTTPFormatTime) {
            var m = HTTPFormatTime.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\+00:00$/);
            var now = new Date();
            earlier = new Date();
            earlier.setUTCFullYear(m[1]);
            earlier.setUTCMonth(m[2] - 1);
            earlier.setUTCDate(m[3]);
            earlier.setUTCHours(m[4]);
            earlier.setUTCMinutes(m[5]);
            earlier.setUTCSeconds(m[6]);
            var diff = (now - earlier) / 1000;
            if(diff < 86400) {
                var hours = Math.floor(diff / 3600);
                var minutes = Math.floor(diff / 60 % 60);
                var seconds = Math.floor(diff % 60);
                if(!hours) {
                    if(!minutes) {
                        if(seconds < 5) {
                            return(['less than 5 seconds', "ago"]);
                        } else if(seconds < 10) {
                            return(['less than 10 seconds', "ago"]);
                        } else if(seconds < 20) {
                            return(['less than 20 seconds', "ago"]);
                        } else if(seconds < 40) {
                            return(['half a minute', "ago"]);
                        } else {
                            return(['less than a minute', "ago"]);
                        }
                    } else {
                        if(minutes == 1) {
                            return(['1 minute', "ago"]);
                        } else {
                            return([minutes + ' minutes', "ago"]);
                        }
                    }
                } else {
                    var nearestHour = Math.round(hours + minutes / 60);
                    if(nearestHour == 1) {
                        return(['about 1 hour', "ago"]);
                    } else {
                        return(['about ' + nearestHour + ' hours', "ago"]);
                    }
                }
            } else {
                return([earlier.toLocaleFormat('%I:%M %p %B %d, %Y'), ""]);
            }
        }
    };

    hentry_template = "\
<tr id=\"status_%%id%%\" class=\"hentry_hover\">\
	<td class=\"thumb vcard author\">\
		<a class=\"url\" href=\"http://twitter.com/%%screen_name%%\">\
            <img src=\"%%profile_image_url%%\" id=\"profile-image\" class=\"photo fn\" alt=\"%%name%%\"/>\
        </a>\
	</td>\
	<td class=\"content\">\
		<strong><a title=\"%%name%%\" href=\"http://twitter.com/%%screen_name%%\">%%screen_name%%</a></strong>\
    	<span class=\"entry_content\">%%text%%</span>\
		<span class=\"meta entry-meta\">\
			<a rel=\"bookmark\" class=\"entry-date\" href=\"http://twitter.com/%%screen_name%%/statuses/%%id%%\">\
            <abbr title=\"%%created_at_http_format%%\" class=\"published\">%%created_at_relative%%</abbr> %%ago%%</a>\
				from %%source%%\
		</span>\
	</td>\
	<td width=\"10\" align=\"right\">\
		<div class=\"status_actions\" id=\"status_actions_%%id%%\">\
			<a onclick=\"new Ajax.Request('/favourings/create/%%id%%', {asynchronous:true, evalScripts:true, onLoading:function(request){$('status_star_%%id%%').src='/images/icon_throbber.gif'}, parameters:'authenticity_token=' + encodeURIComponent('%%auth_token%%')}); return false;\" href=\"#\">\
                <img border=\"0\" title=\"Favorite this update\" src=\"http://assets3.twitter.com/images/icon_star_empty.gif?1209779639\" id=\"status_star_%%id%%\" alt=\"Icon_star_empty\"/></a>\
            <!-- reply -->\
            <a onclick=\"replyTo('%%screen_name%%');\" href=\"#\">\
                <img border=\"0\" title=\"reply to %%screen_name%%\" src=\"http://assets2.twitter.com/images/reply.png?1209779639\" alt=\"reply to %%screen_name%%\"/>\
            </a>\
            <!-- reply -->\
            <!-- delete -->\
            	<a title=\"Delete this update?\" onclick=\"if (confirm('Sure you want to delete this update? There is NO undo!')) { var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var m = document.createElement('input'); m.setAttribute('type', 'hidden'); m.setAttribute('name', '_method'); m.setAttribute('value', 'delete'); f.appendChild(m);var s = document.createElement('input'); s.setAttribute('type', 'hidden'); s.setAttribute('name', 'authenticity_token'); s.setAttribute('value', '%%auth_token%%'); f.appendChild(s);f.submit(); };return false;\" href=\"/status/destroy/%%id%%\">\
                <img border=\"0\" src=\"http://assets3.twitter.com/images/icon_trash.gif?1209779639\" alt=\"Icon_trash\"/></a>\
            <!-- delete -->\
        </div>\
	</td>\
</tr>";

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    var timerId;
    updateInterval = 60*1000;
    timerInterval = 10*1000;
    
    contentDiv = tlu.xp("/html/body/div[2]/div[3]/div/div")[0];
    timerDiv = document.createElement("div");
    timerDiv.id = 'timer';
    contentDiv.insertBefore(timerDiv, contentDiv.firstChild);
    
    auth_token = tlu.xp(
                    "/html/body/div[2]/div[3]/div/div/table/tbody/tr/td[3]/div/a"
                )[0]
                .getAttribute("onclick")
                .match(/encodeURIComponent\('(.*)'\)/)[1];
    username = tlu.xp("/html/body/div[2]/div[2]/div/div/div[2]/a")[0].pathname.substr(1);
    switch (window.location.pathname) {
        case '/home':
            unsafeWindow.tweetDataURL = "http://twitter.com/statuses/friends_timeline/" + username + ".json";
            break;
        
        case '/replies':
            unsafeWindow.tweetDataURL = "http://twitter.com/statuses/replies.json";
            break;
        
        case '/public_timeline':
            unsafeWindow.tweetDataURL = "http://twitter.com/statuses/public_timeline.json";
            break;
    }

    tlu.updateTweets();
    tlu.updatePublishTime();
})();

/* TODO
  protected
  url
*/