// ==UserScript==
// @name           Tumblr Stats Button
// @namespace      @jamespgilbert
// @include        http://*.tumblr.com/*
// @exclude        http://www.tumblr.com/*
// @exclude        http://assets.tumblr.com/*
// ==/UserScript==

tumblrstats_css=document.createElement('LINK');
tumblrstats_css.rel='stylesheet';
tumblrstats_css.href='http://theclearingband.com/tests/tumblrstats.css';
tumblrstats_css.type='text/css';
tumblrstats_css.media='all';
document.getElementsByTagName('head')[0].appendChild(tumblrstats_css);

var stats = document.createElement("a");
stats.innerHTML = "<img src='http://static.tumblr.com/bdltwuw/Nsflh5bk1/stats.png' style='margin-left:3px; margin-right:3px;float:left' /> Tumblr Stats";
stats.id = "tumblr_stats_button";
stats.addEventListener("click", function(evt) {unsafeWindow.getInfo(this);}, false);
document.body.appendChild(stats);

unsafeWindow.getJsTimestamp = function( timeString ) {
            // split the mssql timestamp, and return it so that we 
            // can create a date in javascript
            var arrMssqldate = timeString.split( ' ' );
            var arrDate = arrMssqldate[0].split( '-', 3 );
            var arrTime = arrMssqldate[1].split( ':', 2);

            var timeObject = new Date();
            timeObject.setFullYear(arrDate[0]);
            timeObject.setMonth(arrDate[1]);
            timeObject.setDate(arrDate[2]);
            timeObject.setHours(arrTime[0]);
            timeObject.setMinutes(arrTime[1]);            
            return timeObject;
}
unsafeWindow.getInfo = function(loc)
{
    var tresults = document.createElement("div");
    tresults.id="tumblrstats_results";
    tresults.innerHTML = '<div id="tumblrstats_results_close" onclick="this.parentNode.parentNode.removeChild(this.parentNode);">x</div><h3>'+loc.title+'</h3><p>Loading&hellip;</p><div style="text-align:right;color:#888;font-size:10px">by <a style="color:#aaa;text-decoration:none" target="_blank" href="http://twitter.com/jamespgilbert">@jamespgilbert</a></div>';
    document.body.appendChild(tresults);
    tresults.style.left = ((document.body.clientWidth / 2) - (tresults.clientWidth / 2)) + "px";
    loc.rel = "http://" + window.location.href.split("/")[2] + "/";
    
    GM_xmlhttpRequest({
        method: "GET",
        url: loc.rel + "api/read?num=50",
        onload: function(response) {
            var xdoc = new DOMParser().parseFromString(response.responseText, "text/xml");
            var posts = xdoc.getElementsByTagName("post");
            var tags = xdoc.getElementsByTagName("tag");
            var dtlast = unsafeWindow.getJsTimestamp(posts[0].getAttribute("date-gmt"));
            var dtfirst = unsafeWindow.getJsTimestamp(posts[posts.length-1].getAttribute("date-gmt"));
            var one_day=1000*60*60*24;
            // 50 posts, how days time between the first and the last in days
            
            var daydiff = (dtlast.getTime()-dtfirst.getTime())/one_day; // total span of time between the first and last post retrieved
            var postrate = 50 / daydiff;
            var stats = "POSTS:\navg. " + Math.round(postrate) + " posts per day\n";
            
            var types = new Object();
            for(var p = 0; p < posts.length; p++)
            {
                var ty = posts[p].getAttribute("type");
                if(types[ty])
                    types[ty]++;
                else
                    types[ty] = 1;
            }
            for(var t in types)
            {
                stats += "<span style='height:14px;width:"+ Math.round((types[t] / posts.length) * 100) * 2 +"px;background-color:white;margin-right:5px;float:left;'>&nbsp;</span> " + Math.round((types[t] / posts.length) * 100) + "% " + t + "s\n";
            }
            var tagtypes = new Object();
            var hasany = false;
            for(var t = 0; t < tags.length; t++)
            {
                var ty = tags[t].textContent;
                if(tagtypes[ty])
                {
                    tagtypes[ty]++;
                }
                else
                {
                    hasany = true;
                    tagtypes[ty] = 1;
                }
            }
            stats += "\nRECENT TAGS:\n";
            
            if(hasany)
            {
                for(var t in tagtypes)
                {
                    if(tagtypes[t] > 1)
                        stats += t + "<sup> " + tagtypes[t] + "</sup>, ";
                }
                stats = stats.substring(0, stats.length - 3);
            }
            else
                stats += "N/A";
                
            document.getElementById("tumblrstats_results").getElementsByTagName("p")[0].innerHTML = stats.replace("\n", "<br/>", "g");
        }
    });
     
}