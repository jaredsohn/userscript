// ==UserScript==
// @name           MAL Friend's List Updates
// @namespace      abhin4v.myinfo.ws
// @include        http://myanimelist.net/profile/*
// @include        http://myanimelist.net/myfriends.php*
// ==/UserScript==

function $x(p, context) {
  if (!context) context = document;
  //alert(context);
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}

String.prototype.parseJSON = function () {
   try {
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
        this.replace(/"(\\.|[^"\\])*"/g, ''))) &&
        eval('(' + this + ')');
    } catch (e) {
        return false;
    }
};

function cleanData(str) {
    data = str.parseJSON().value.items;
    cleanedData = new Array();
    count = 0;
    for (i=0; i<data.length; i++) {
        for (j=0; j<data[i].updates.length; j++) {
            cleanedData[count] = {
                "user": data[i].user,
                "title": data[i].updates[j].title,
                "description": data[i].updates[j].description,
                "link": data[i].updates[j].link,
                "hour": data[i].updates[j]['y:published'].hour,
                "timezone":"UTC",
                "second": data[i].updates[j]['y:published'].second,
                "month": data[i].updates[j]['y:published'].month,
                "minute": data[i].updates[j]['y:published'].minute,
                "utime": data[i].updates[j]['y:published'].utime,
                "day": data[i].updates[j]['y:published'].day,
                "day_of_week": data[i].updates[j]['y:published'].day_of_week,
                "year": data[i].updates[j]['y:published'].year
            };
            count++;
        }
    }
    cleanedData.sort(function(a,b) {
            return b.utime - a.utime; 
        });
    return cleanedData;
}

function showDataInProfile(str) {
    cleanedData = cleanData(str);
    cleanedData.splice(10);

    html = "<div class='normal_header'>Friend List Updates</div>";
        
    for (i=0; i<cleanedData.length; i++) {
        dateObj = new Date();
        now = Math.floor(dateObj.getTime()/1000);
        ago = now - cleanedData[i].utime;
        day = Math.floor(ago/(60*60*24));
        hr = Math.floor(ago/(60*60));
        min = Math.floor(ago/(60));
        
                
        html += "<div class='borderClass'><span style='float:right'>" + cleanedData[i].description.match(/([\w\?]+ of [\w\?]+)/)[1] + "</span><a href='" + cleanedData[i].link + "'>" + cleanedData[i].title.match(/(.*)-/)[1] + "</a><br/>" +
                "<span style='float:right'>" +  formatTime(day, hr, min) + "</span>by <b><a href='http://myanimelist.net/profile/" + cleanedData[i].user + "'>" + cleanedData[i].user + "</a></b></div>";
    }

    html +="<br/>";

    divs = $x("/html/body/div/div[3]/div[2]/table/tbody/tr/td/div");
    var e;
    for (i=0; i<divs.length; i++) {
        if (divs[i].innerHTML == 'My Popular Anime Tags') e = divs[i];
    }
    if (e == null) {
        for (i=0; i<divs.length; i++) {
            if (divs[i].innerHTML == 'My Popular Manga Tags') e = divs[i];
        }
    }

    d = document.createElement("div");
    d.innerHTML = html;
    
    p = $x("/html/body/div/div[3]/div[2]/table/tbody/tr/td")[0];
    p.insertBefore(d,e);
}

function showDataInFriendList(str) {
    cleanedData = cleanData(str);
    cleanedData.splice(Math.floor($x("/html/body/div/div[3]/div[2]/div[2]/table/tbody/tr/td[2]/strong/a").length*2.5));

    html = "<div class='normal_header' style='margin-top:1px'>Friend List Updates</div>";
        
    for (i=0; i<cleanedData.length; i++) {
        dateObj = new Date();
        now = Math.floor(dateObj.getTime()/1000);
        ago = now - cleanedData[i].utime;
        day = Math.floor(ago/(60*60*24));
        hr = Math.floor(ago/(60*60));
        min = Math.floor(ago/(60));
        
                
        html += "<div class='borderClass'><span style='float:right'>" + cleanedData[i].description.match(/([\w\?]+ of [\w\?]+)/)[1] + "</span><a href='" + cleanedData[i].link + "'>" + cleanedData[i].title.match(/(.*)-/)[1] + "</a><br/>" +
                "<span style='float:right'>" +  formatTime(day, hr, min) + "</span>by <b><a href='http://myanimelist.net/profile/" + cleanedData[i].user + "'>" + cleanedData[i].user + "</a></b></div>";
    }

    html +="<br/>";

    e = $x("/html/body/div/div[3]/div[2]/div[2]/div[2]")[0];
    e.style.width = "68%";
    $x("/html/body/div/div[3]/div[2]/div[2]/table")[0].style.width = "68%";

    d = document.createElement("div");
    d.innerHTML = html;
    d.setAttribute("style", "float:right; width:30%");
    
    p = $x("/html/body/div/div[3]/div[2]/div[2]")[0];
    p.insertBefore(d,e);
}

function formatTime(day, hr, min) {
    if (day > 0) return day + " day ago";
    if (hr > 0) return hr + " hr ago";
    if (min > 0) return min + " min ago";
    return "just now";
}

if (window.location.pathname.indexOf("profile/")!= -1) {
    if (e = $x("/html/body/div/div[3]/div[2]/table/tbody/tr/td[2]/table[2]/tbody/tr[2]/td/div/div/div").length == 0) {
        links = $x("/html/body/div/div[3]/div[2]/table/tbody/tr/td/a[contains(@href, '/profile/')]");
        //alert(links.length);
        friends = new Array();
        for (i=0; i<links.length; i++) {
            friends[i]= links[i].innerHTML;
        }
        
        if (friends.length != 0) get("http://pipes.yahoo.com/pipes/pipe.run?_id=iOkMhRKJ3BGucTT_CB2yXQ&_render=json&users=" + encodeURIComponent(friends.join(',')), showDataInProfile);
    }
}

if (window.location.pathname == "/myfriends.php") {
    links = $x("/html/body/div/div[3]/div[2]/div[2]/table/tbody/tr/td[2]/strong/a");
    friends = new Array();
    for (i=0; i<links.length; i++) {
        friends[i]= links[i].innerHTML;
    }
    if (friends.length != 0) get("http://pipes.yahoo.com/pipes/pipe.run?_id=iOkMhRKJ3BGucTT_CB2yXQ&_render=json&users=" + encodeURIComponent(friends.join(',')), showDataInFriendList);
}