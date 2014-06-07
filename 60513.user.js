// ==UserScript==
// @name           tooltip_tweet_localtime
// @namespace      http://twitter.com/towtter
// @description    Adds local time tool tip to each tweet
// @include        http://twitter.com/*
// @exclude        http://twitter.com/account/*
// @exclude        http://twitter.com/following
// @exclude        http://twitter.com/followers
// @exclude        http://twitter.com/login
// @exclude        http://twitter.com/invitations/find*
// ==/UserScript==

// strftime function has almost same features as C language, but not support %B %A %j %U %W
function strftime(form, date){
  var WDAYNAMES = {
    'Sun':0,'Mon':1,'Tue':2,'Wed':3,'Thu':4,'Fri':5,'Sat':6
  };
  var MONTHNAMES = {
    'Jan':0,'Feb':1,'Mar':2,'Apr':3,'May':4,'Jun':5,
    'Jul':6,'Aug':7,'Sep':8,'Oct':9,'Nov':10,'Dec':11
  };
  var dt = date.toString().split(/[\s:]/);
  var wDay = dt[0], aMon = dt[1], day = dt[2], year = dt[3], hour = dt[4], min = dt[5], sec = dt[6];
  var formats = [];
  var result = '';
  var i=0;
  var format = '';
  while (i < form.length) {
    var c = form.charAt(i);
    if (c == '%') {
      format = c;
      i += 1;
      c = form.charAt(i);
      if (c.match(/[a-zA-Z]+/)){
        format += c;
        formats.push(format);
        i += 1;
        continue;
      }
    } else {
      formats.push(c);
    }
    i += 1;
  }

  for (i=0; i<formats.length; i++){
    format = formats[i];
    switch (format) {
    case '%a': 
      result += wDay;
      break;
    case '%b': 
      result += aMon;
      break;
    case '%c': 
      result += day + ' ' + hour + ":" + min + ":" + sec;
      break;
    case '%d': 
      result += day;
      break;
    case '%H': 
      result += hour;
      break;
    case '%I':
      var h = Number(hour);
      if (h > 12) result += (h - 12);
      else if (h == 0) result += (h + 12);
      else result += h;
      break;
    case '%m':
      var m = MONTHNAMES[aMon] + 1;
      if (m < 10) result += '0' + m;
      else result += m;
      break;
    case '%M': result += min;
      break;
    case '%p':
      if (hour >= 12) result += "PM";
      else result += "AM";
      break;
    case '%S': 
      result += sec;
      break;
    case '%w':
      result += WDAYNAMES[wDay];
      break;
    case '%x':
      result += day + "/" + mon + "/" + year.substring(2, 4);
      break;
    case '%X':
      var h = Number(hour);
      if (h >= 12) {
        if (h > 12) result += (h - 12) + ":" + min + " PM";
        else result += h + ":" + min + " PM";
      }
      else {
        if (h == 0) result += (h + 12) + ":" + min + " AM";
        else result += h + ":" + min + " AM";
      }
      break;
    case '%y': result += year.substring(2, 4);
      break;
    case '%Y': result += year;
      break;
    default :
      result += format;
    }
  }
  return result;
}
function formatDigit(x, digit){
  var fmt = x.toString();
  var i = fmt.lastIndexOf('.');
  if (i > 0){
    fmt = fmt.substring(0, i+digit+1);
  }
  return fmt;
}
TwitterUserProfile = {
  data: {},
  user_cache: {},
  access_id: '',
  is_user_page: false,
  dateformat: '%a %X %b %d',
  DST: {
    "Alaska|Pacific Time|Arizona|Mountain Time|Central Time|Eastern Time|Indiana" :{
      start_dst : { month : 2, nth : 2, hour : 2, wday : 'Sun' 
        },
      end_dst   : { month : 10, nth : 1, hour : 2, wday : 'Sun' 
        }
    },
    "Dublin|Edinburgh|Lisbon|London|Monrovia" : {
      start_dst : { month : 2, nth : -1, hour : 1, wday : 'Sun' 
        },
      end_dst   : { month : 9, nth : -1, hour : 1, wday : 'Sun' 
        }
    },
    "Amsterdam|Belgrade|Berlin|Bern|Bratislava|Brussels|Budapest|Copenhagen|Ljubljana|Madrid|Paris|Prague|Rome|Sarajevo|Skopje|Stockholm|Vienna|Warsaw|West Central Africa|Zagreb" : {
      start_dst : { month : 2, nth : -1, hour : 1, wday : 'Sun' 
        },
      end_dst   : { month : 9, nth : -1, hour : 1, wday : 'Sun' 
        }      
    },
    "Baghdad|Kuwait|Moscow|Nairobi|Riyadh|St\. Petersburg|Volgograd" : {
      start_dst : { month : 2, nth : -1, hour : 1, wday : 'Sun' 
        },
      end_dst   : { month : 9, nth : -1, hour : 1, wday : 'Sun' 
        }
    },
    "Newfoundland" : {
      start_dst : { month : 3, nth : 1, hour : 2, wday : 'Sun' 
        },
      end_dst   : { month : 9, nth : -1, hour : 2, wday : 'Sun' 
        }      
    }
  },
  getUserProfile: function(id, status_id, pt){
    if (this.user_cache[id] != undefined){
      this.renderLocalTime(id, status_id, pt);
    } else {
      this.access_id = id;
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.twitter.com/users/show/' + id + '.json',
        onload : function (response){
          TwitterUserProfile.processProfile(response.responseText);
          if (TwitterUserProfile.is_user_page) TwitterUserProfile.dispUsersProfile(TwitterUserProfile.data);
          if ((status_id) && (pt)) TwitterUserProfile.renderLocalTime(id, status_id, pt);
        }
      });        
    }
  },
  // evaluate json object and caching user data
  processProfile: function(response){
    eval("var obj=" + response);
    for (name in obj) {
      this.data[name] = obj[name];
    }
    var utc_offset = 0;
    var time_diff = '';
    if (this.data['utc_offset'] != null)
      utc_offset = parseInt(this.data['utc_offset']);
    this.user_cache[this.access_id] = {
      utc_offset: 0,
      time_zone: ''
    };
    this.user_cache[this.access_id].utc_offset = utc_offset;
    this.user_cache[this.access_id].time_zone = this.data['time_zone'];
  },
  // rendering local time
  renderLocalTime : function(id, status_id, pt) {
    var spanTags = document.getElementById(status_id).getElementsByTagName("span");
    for (var i = 0; i < spanTags.length; i++) {
      if (spanTags[i].className == 'published timestamp'){
        var pbtime = spanTags[i];
        break;
      }
    }
    if (pbtime.getAttribute('title')) return;
    var utc_offset = 0;
    var time_zone = '';
    var time_diff = '';
    utc_offset = parseInt(this.user_cache[id].utc_offset);
    time_zone = this.user_cache[id].time_zone;
    var utc = Date.parse(pt);
    var local = new Date();
    utc = utc +  local.getTimezoneOffset() * 60 * 1000 + utc_offset * 1000;
    local.setTime(utc);
    for (var dst in this.DST) {
      var re = new RegExp(dst);
      if ((time_zone) && (time_zone.match(re))){
        var d = this.DST[dst];
        if (this.isdst(local, d)) {
          utc = utc + 3600 * 1000;
          utc_offset = utc_offset + 3600;
          break;
        }
      }
    }
    local.setTime(utc);
    time_diff = local.getTimezoneOffset() / 60 + utc_offset / 3600;
    var time_diff_min = 0;
    if (time_diff < 0) {
      time_diff_min = Math.abs(time_diff) + Math.ceil(time_diff);
      time_diff = time_diff + time_diff_min;
    }
    else {
      time_diff_min = Math.abs(time_diff) - Math.floor(time_diff);
      time_diff = time_diff - time_diff_min;            
    }
    time_diff_min = time_diff_min * 60;
    if (time_diff_min < 10) time_diff_min = "0" + time_diff_min;
    if (time_diff >= 0) time_diff = "+" + time_diff;
    time_diff = time_diff + ":" + time_diff_min;
    var local_time = strftime(this.dateformat, local);
    if ((time_diff != '') && (time_diff != '+0:00')) local_time = local_time + " (" + time_diff + ")";
    if (time_zone != '') 
      local_time = local_time + " [" + time_zone + "]";
    local_time = 'Local Time:' + local_time;
    pbtime.setAttribute("title", local_time);
  },
  dispUsersProfile: function(profile){
    var start_date = Date.parse(profile.created_at);
    var _now = new Date();
    var user_days = (_now.getTime() - start_date) / 1000 / 3600 / 24;
    var side_profile = document.getElementById("side").getElementsByTagName("div")[0];
    var tbl = side_profile.getElementsByTagName("table")[0];
    var row = tbl.getElementsByTagName("tr")[0];
    if (row){
      var td = null;
      td = document.getElementById("days_twitter_following");
      if (!td) {
        td = document.createElement("td");
        td.id = "days_twitter_following";
        var date_text = document.createElement("span");
        date_text.className = "stats_count numeric";
        date_text.innerHTML = Math.ceil(user_days);
        var date_lbl = document.createElement("span");
        date_lbl.className = "label";
        date_lbl.style.fontSize = "8px";
        date_lbl.innerHTML = "days<br/>follow twitter";
        td.appendChild(date_text);
        td.appendChild(date_lbl);
        row.appendChild(td);
        var update_count = document.getElementById("update_count");
        var count = update_count.innerHTML;
        var ave = profile.statuses_count / user_days;
        if (ave < 1){
          ave = user_days / profile.statuses_count;
          ave = Math.ceil(ave);
          count += ' (1/' + ave + 'day)'; 
        } else {
          count += ' (' + formatDigit(ave, 1) + '/day)';
        }
        update_count.innerHTML = count;
      }
    }

  },
  isdst: function(t, dst) {
    var this_year = new Date().getFullYear();
    var start_dst = dst["start_dst"];
    var end_dst = dst["end_dst"];
    var dst_start = this.getDateOfNumberOfWday(this_year, start_dst.month, start_dst.wday, start_dst.nth);
    var dst_end = this.getDateOfNumberOfWday(this_year, end_dst.month, end_dst.wday, end_dst.nth);
    if ((t.getMonth() >= dst_start.getMonth()) && (t.getMonth() <= dst_end.getMonth())) {
      if (t.getMonth() == dst_start.getMonth()){
        var judge = t.getDate() - dst_start.getDate();
        if (judge > 0) return true;
        if (judge < 0) return false;
        if (t.getHours() < start_dst.hour) return false;
      } else if ((t.getMonth() == dst_end.getMonth())) {
        var judge = t.getDate() - dst_end.getDate();
        if (judge < 0) return true;
        if (judge > 0) return false;
        if ((t.getHours() + 1) >= end_dst.hour) return false;
      }
      return true;
    }
  },
  getDateOfNumberOfWday: function(year, month, wday, n) {
    var d = new Date(year, month, 1);
    var getWday = function(date){
      return date.toString().split(/[\s:]/)[0];
    };
    var nextMonth = d.getMonth() < 11 ? d.getMonth() + 1 : 0;
    var m = d.getMonth();
    var i = 1;
    for (;;){
      if (getWday(d) == wday) {
        if (i == n){
          return d;
        } else {
          i += 1;
          d.setDate(d.getDate() + 7);
          if ((n == -1) && (d.getMonth() == nextMonth)){
            d.setDate(d.getDate() - 7);
            return d;
          }
          continue;
        }
      }
      d.setDate(d.getDate() + 1);
      if (d.getMonth() == nextMonth) break;
    }
  }
};

(function(){
   var statuses = [];
   var loc_user_name = '';
   function init(){
     var loc = window.location.toString();
     if (loc.match(/http:\/\/twitter\.com\/([^\/]+\/?)(.*)/)) {
       TwitterUserProfile.is_user_page = true;
       loc_user_name = RegExp.$1;
       if (loc_user_name[loc_user_name.length-1] == "/") {
         TwitterUserProfile.is_user_page = false;
         loc_user_name = loc_user_name.substring(0, loc_user_name.length-1);
       }
       if (loc_user_name.match(/following|followers|login/)){
         loc_user_name = "";
         TwitterUserProfile.is_user_page = false;
       }
       var path = RegExp.$2;
       if (path.match(/\w+/)){
         loc_user_name = "";
         TwitterUserProfile.is_user_page = false;
       }
     }
     if (loc_user_name != "") {
       TwitterUserProfile.getUserProfile(loc_user_name);
     }
     allocEvent();
   }

   function allocEvent(){
     var spanTags = document.getElementsByTagName("span");
     for (var i = 0; i < spanTags.length; i += 1) {
       var span = spanTags[i];
       if (span.className == "published timestamp") {
         if ((span) && (span.addEventListener)) {
           var status_id = span.parentNode.parentNode.parentNode.parentNode.id;
           // prevent to add duplicate event
           if (statuses.indexOf(status_id) == -1){
             span.addEventListener("mouseover", function(e){return show_time(e, loc_user_name);}, false);             
             statuses.push(status_id);
           }
         }
       }
     }     
   }

   function show_time(e, loc_user_name){
     var tstamp = eval(e.target.getAttribute("data"));
     if (loc_user_name == '') {
       var status = e.target.parentNode.parentNode.parentNode;
       var un = status.getElementsByTagName("strong")[0];
       if (un){
         var user_name = un.getElementsByTagName("a")[0].text;
       }    
     } else {
       var user_name = loc_user_name;
     }
     var status_id = e.target.parentNode.parentNode.parentNode.parentNode.id;
     TwitterUserProfile.getUserProfile(user_name, status_id, tstamp);
   }

   function monitor(){
     if (document.getElementsByClassName ('meta entry-meta').length != statuses.length){
       allocEvent();
     }
     setTimeout (monitor, 200);     
   }

   init();

   setTimeout (monitor, 200);

})();