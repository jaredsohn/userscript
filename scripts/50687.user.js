// ==UserScript==
// @name           WeChall Raid Scheduler
// @namespace      quangntenemy
// @description   WECHALL ASSEMBLE! If there is a WeChall raid upcoming, a countdown-timer will appear on your Main User Page for ForumWarz.
// @include        http://www.forumwarz.com/characters/me
// ==/UserScript==

$ = unsafeWindow['window'].$;
$$ = unsafeWindow['window'].$$;
Element = unsafeWindow["window"].Element;

Countdown = {
  begin : function(div_id, src_time, target_time, msg, empty_message) {
    this.src_time = src_time
    this.target_time = target_time
    this.target_div = div_id
    this.msg =  msg
    this.empty_message = empty_message
    this.diff_seconds = 0
    this.timeout_id = null
    this.cycle()
  },
  
  cycle : function () {
    this.src_time += 1
    var diff = (this.target_time - this.src_time)
    var update_with = null
    if (diff <= -10800) {
      update_with = this.empty_message
    } else if (diff <= 0) {
      update_with = "Your klan might be raiding at the moment. Check out the raid page.";
    } else {
      this.diff_seconds = diff
      days = Math.floor(diff / (60 * 60 * 24));
      diff %= (60 * 60 * 24);
      hours = Math.floor(diff / (60 * 60));
      diff %= (60 * 60);
      minutes = Math.floor(diff / 60);
      diff %= 60;
      seconds = diff;
      dps = 's'; hps = 's'; mps = 's'; sps = 's';    
      if(days == 1) dps ='';
      if(hours == 1) hps ='';
      if(minutes == 1) mps ='';
      if(seconds == 1) sps ='';
      str = ''  
      if (days > 0) {
        str = days + ' day' + dps + ' ';
      }      
      if (hours > 0)
        str += hours + ' hour' + hps + ' ';
      if (minutes > 0)
        str += minutes + ' minute' + mps + ' and ';
      str += seconds + ' second' + sps;
      update_with = str + " " + this.msg;
      if (this.timeout_id) {
        clearTimeout(this.timeout_id)
        this.timeout_id = null
      }
      this.timeout_id = setTimeout(function() { Countdown.cycle() }, 1000)
    }
    var target_div = $(this.target_div)
    if (target_div) {
      target_div.update(update_with)
    }
  },
  
  reset : function(src_time, target_time) {
    this.src_time = src_time
    this.target_time = target_time
    this.cycle()
  }
  
}

$$("td.hiddenTd h4").each(function(e) {
  e.insert({"after": Element("p", {"id": "raidCountdown"}).update("Test")});
});

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.forumwarz.com/discussions/view_post/603449",
  onload: function(responseDetails) {
    var text = responseDetails.responseText;
    var raidTimeUTC = 0;
    var regex = /\[raid\](.+?)\[\/raid\]/;
    var match = regex.exec(text);
    if (match.length > 0) raidTimeUTC = Math.floor(Date.parse(match[1]) / 1000);
    var d = new Date();
    var currentTimeUTC = Math.floor(d.getTime() / 1000 + d.getTimezoneOffset() * 60);
    Countdown.begin("raidCountdown", currentTimeUTC, raidTimeUTC, "until your klan's raid.", "Your klan has no raid planned");
  }
});

