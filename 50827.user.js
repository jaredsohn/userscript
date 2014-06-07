// ==UserScript==
// @name           MoreSPORE
// @namespace      http://www.spore.com/view/myspore/misterhaan
// @description    Adds more information and links to spore.com profile pages
// @include        http://www.spore.com/view/myspore
// @include        http://www.spore.com/view/myspore/*
// @include        http://www.spore.com/view/profile
// @include        http://www.spore.com/view/profile/*
// ==/UserScript==

var subsXml = false;
var publicProfile = document.location.pathname != "/view/myspore" && document.location.pathname != "/view/profile";
var username = getUsername(publicProfile);
if(publicProfile && username) {
  var uploaded = document.getElementById("creationsUpLabel");
  if(uploaded) {
    showSubscribers();
    showAchievements();
  }
  addQualitySporeLink();
  addEventsFeed();
}
if(!publicProfile) {
  hideSporeIslands();
  showSubscribers();
}


function showSubscribers() {
  var subs = document.createTextNode("(counting...)");
  var subRow = false;
   if(publicProfile)
     addUserStat("subscribers", "Subscribers: ", subs);
   else {
     var content = document.getElementById("sporeTabContentInner");
     if(content) {
       var div = document.createElement("div");
       content.appendChild(div);
       div.id = "subscribersHeaderDiv";
       div.className = "headerDiv";
       var h4 = document.createElement("h4");
       div.appendChild(h4);
       h4.id = "subscribersHdr";
       h4.className = "tabHeader";
       h4.appendChild(document.createTextNode("SUBSCRIBERS"));
       var icon = document.createElement("div");
       div.appendChild(icon);
       icon.id = "subscribersIcon";
       icon.className = "headerIcon";
       icon.style.background = "transparent url(/static/war/images/sporepedia/adv/mySporeSprite.png) no-repeat scroll -101px -6px";
       icon.style.marginTop = "-20px";
       div = document.createElement("div");
       content.appendChild(div);
       div.id = "subscriberCount";
       div.className = "graySubHead";
       div.style.marginTop = "10px";
       div.appendChild(document.createTextNode("YOU HAVE "));
       var span = document.createElement("span");
       div.appendChild(span);
       span.id = "numSubscribers";
       span.appendChild(subs);
       div.appendChild(document.createTextNode(" SUBSCRIBERS: "));
       var a = document.createElement("a");
       div.appendChild(a);
       a.href = "javascript:";
       a.id = "subscriberSPDLink";
       a.className = "sporepediaLink";
       a.appendChild(document.createTextNode("(See all of your subscribers)"));
      a.addEventListener("click", viewSubscribers, false);  // greasemonkey won't work with .onclick
       subRow = document.createElement("div");
       content.appendChild(subRow);
       subRow.id = "subscriberRow";
       subRow.className = "buddyRow";
       subRow.style.visibility = "visible";
     }
   }
  getAsync("http://www.spore.com/rest/users/subscribers/" + username + "/0/100000", gotSubscriberXml, new Array(subs, subRow));
}
function gotSubscriberXml(req, args) {
  subsXml = req.responseXML.documentElement;
  var count = subsXml.getElementsByTagName("count");
  count = count[0].firstChild.data;
  args[0].data = count;
  if(args[1]) {
    var subs = subsXml.getElementsByTagName("buddy");
    for(var s = 0; s < 4 && s < subs.length; s++) {
      var subName = subs[s].getElementsByTagName("name")[0].firstChild.nodeValue;
      var div = createSubscriberDiv(subName);
      args[1].appendChild(div);
      div.id = "subscriberDiv" + (s + 1);
    }
  }
}

function createSubscriberDiv(subName) {
  var div = document.createElement("div");
  div.className = "buddyDiv";
  var div2 = document.createElement("div");
  div.appendChild(div2);
  div2.className = "avatarframe"
  var link = document.createElement("a");
  div2.appendChild(link);
  link.href = "/view/myspore/" + subName;
  var img = document.createElement("img");
  link.appendChild(img);
  img.className = "header-avatar js-avatar-thumbnail PNG avatarimg";
  img.src = "/static/war/images/header/avatar_frame_transparent.png";
  div2 = document.createElement("div");
  div.appendChild(div2);
  div2.className = "buddyData";
  var div3 = document.createElement("div");
  div2.appendChild(div3);
  div3.className = "buddyName";
  link = document.createElement("a");
  div3.appendChild(link);
  link.href = "/view/myspore/" + subName;
  link.appendChild(document.createTextNode(subName));
  div3 = document.createElement("div");
  div2.appendChild(div3);
  div3.className = "buddyTagline";
  div3.appendChild(document.createTextNode("(looking up " + subName + "...)"));
  getAsync("http://www.spore.com/rest/user/" + subName, gotSingleSubInfo, new Array(img, div3));
  return div;
}

function gotSingleSubInfo(req, args) {
  var response = req.responseXML.documentElement;
  var avatar = response.getElementsByTagName("image")[0].firstChild.nodeValue;
  if(avatar.substring(0, 33) == "http://www.spore.com/static/thumb")
    args[0].src = avatar;
  else {
    // need to adjust structure for uploaded image
    args[0].className = null;
    args[0].parentNode.className = "myCustomAvatarFrame";
    var avtframe = args[0].parentNode.parentNode
    avtframe.className = "myAvatarcustomframe";
    var img = document.createElement("img");
    avtframe.parentNode.insertBefore(img, avtframe.nextSibling);
    img.className = "avatarcustomimg";
    img.src = avatar;
    img.style.cssFloat = "left";
    img.style.margin = "8px 5px 0";
  }
  var tagline = response.getElementsByTagName("tagline")[0];
  if(tagline.firstChild)
    args[1].firstChild.nodeValue = "“" + tagline.firstChild.nodeValue + "”";
  else
    args[1].removeChild(args[1].firstChild);
}

function viewSubscribers() {
  var profileInfo = document.getElementById("profile-info");
  var content = document.createElement("div");
  profileInfo.parentNode.replaceChild(content, profileInfo);
  scroll(0, 0);
  content.id = "subscribersContentDiv";
  var hdr = document.createElement("div");
  content.appendChild(hdr);
  hdr.id = "subscribersHeaderDiv"
  hdr.className = "headerDiv";
  hdr.style.width = "1000px";
  var h4 = document.createElement("h4");
  hdr.appendChild(h4);
  h4.id = "subscribersHdr";
  h4.className = "tabHeader";
  h4.appendChild(document.createTextNode("SUBSCRIBERS"));
  var div = document.createElement("div");
  hdr.appendChild(div);
  div.id = "buddiesIcon";
  div.className = "headerIcon";
  div = document.createElement("div");
  hdr.appendChild(div);
  div.className = "outerpod-header-right";
  div.style.top = "-12px";
  div.style.right = "12px";
  var span = document.createElement("span");
  div.appendChild(span);
  span.className = "js-close-button";
  var img = document.createElement("img");
  span.appendChild(img);
  img.className = "closedetail";
  img.alt = "close";
  img.src = "/static/war/images/global/button_close.png";
  img.addEventListener("click", function() { content.parentNode.replaceChild(profileInfo, content); }, false);

  div = document.createElement("div");
  content.appendChild(div);
  div.id = "buddyCount";
  div.className = "graySubHead";
  div.appendChild(document.createTextNode("My "));
  span = document.createElement("span");
  div.appendChild(span);
  span.id = "numSubscribers";
  span.appendChild(document.createTextNode(subsXml.getElementsByTagName("count")[0].firstChild.data));
  div.appendChild(document.createTextNode(" SUBSCRIBERS:"));

  var subs = subsXml.getElementsByTagName("buddy");
  var row = false;
  for(var s = 0; s < subs.length; s++) {
    if(s % 2 == 0) {  // only do a new row for every other subscriber
      row = document.createElement("div");
      content.appendChild(row);
      row.className = "buddyRow";
      row.style.height = "100px";
      row.style.width = "1000px";
      row.style.visibility = "visible";
      row.style.textAlign = "left";
    }
    div = createSubscriberDiv(subs[s].getElementsByTagName("name")[0].firstChild.data);
    row.appendChild(div);
    div.style.width = "500px";
  }
}

function showAchievements() {
  var achs = document.createTextNode("(counting...)");
  addUserStat("achievements", "Achievements: ", achs);
  getAsync("http://www.spore.com/rest/achievements/" + username + "/0/10000", gotAchievementXml, achs);
}
function gotAchievementXml(req, achs) {
  var response = req.responseXML.documentElement;
  var count = response.getElementsByTagName("length");
  count = count[0].firstChild.data;
  achs.data = count;
  var achHdr = document.getElementById("achHdr");
  if(achHdr)
    achHdr.firstChild.data += " (" + count + ")";
}

function addUserStat(id, label, value) {
  var span = document.createElement("span");
  span.id = id;
  span.className = "userData";
  span.appendChild(value);
  var div = document.createElement("div");
  div.id = id + "Label";
  div.className = "dataLabel";
  div.style.marginTop = "10px";
  div.appendChild(document.createTextNode(label));
  div.appendChild(span);
  uploaded.parentNode.insertBefore(div, uploaded);
}

function addQualitySporeLink() {
  var userData = document.getElementById("pubUserDataDiv");
  if(userData) {
    var qslink = document.createElement("a");
    qslink.href = "http://www.qualityspore.com/ProfileViewer.htm?profile=" + username;
    qslink.appendChild(document.createTextNode("See " + username + "'s QualitySPORE profile"));
    var div = document.createElement("div");
    div.id = "qualitySporeLink";
    div.className = "dataLabel";
    div.appendChild(qslink);
    userData.parentNode.insertBefore(div, userData);
  }
}

function addEventsFeed() {
  var adventures = document.getElementById("adventureHeaderDiv");
  if(!adventures)  // quit if the adventures header is missing
    return;
  var events = document.createElement("div");
  adventures.parentNode.insertBefore(events, adventures);
  events.className = "headerDiv";
  var h4 = document.createElement("h4");
  events.appendChild(h4);
  h4.className = "tabHeader";
  h4.appendChild(document.createTextNode(username + "'s EVENTS"));
  var div = document.createElement("div");
  events.appendChild(div);
  div.id = "sporeNewsIcon";
  div.className = "headerIcon";
  events = document.createElement("div");
  adventures.parentNode.insertBefore(events, adventures);
  events.id = "eventsDiv";
  events.appendChild(document.createTextNode("Loading..."));
  getAsync("http://www.spore.com/atom/events/user/" + username, gotEvents, events);
}
function gotEvents(req, events) {
  var parser = new DOMParser();
  var response = req.responseXML || parser.parseFromString(req.responseText, "application/xml");
  var response = response.documentElement;
  while(events.firstChild)
    events.removeChild(events.firstChild);
  var ul = document.createElement("ul");
  events.appendChild(ul);
  ul.style.marginLeft = "42px";
  ul.style.marginTop = ".5em";
  var entries = response.getElementsByTagName("entry");
  var needAchievements = false;
  for(var e = 0; e < entries.length && e < 12; e++) {
    entryid = entries[e].getElementsByTagName("id")[0].firstChild.data;  // use this to show an icon
    var li = document.createElement("li");
    ul.appendChild(li);
    var img = document.createElement("img");
    li.appendChild(img);
    img.className = "eventicon iconavat";
    img.width = "20";
    img.height = "20";
    img.alt = "";
    img.style.verticalAlign = "middle";
    img.src = getImageSrcFromEventId(entryid);
    var span = document.createElement("span");
    li.appendChild(span);
    span.className = "time";
    span.style.margin = "0 .5em 0 .3em";
    var datetime = utcDate(entries[e].getElementsByTagName("published")[0].firstChild.data);
    span.title = datetime.toString();
    span.appendChild(document.createTextNode(smartDate(datetime)));
    span = document.createElement("span");
    li.appendChild(span);
    var eventcontent = entries[e].getElementsByTagName("content")[0].firstChild.data
    if(entryid == "7") {
      var start = eventcontent.indexOf('the "<a href="http://www.spore.com">');
      var end = eventcontent.indexOf('</a>" Achievement');
      var achievementid = eventcontent.substring(start + 36, end);
      span.innerHTML = eventcontent.substring(0, start + 4) + '<a href="http://spore.wikia.com/wiki/Achievements">' + achievementid + "</a>" + eventcontent.substring(end + 5);
      needAchievements = true;
    } else if(+entryid >= 8 && +entryid <= 10) {
      span.innerHTML = eventcontent.replace(/[{}]/, "");
    } else
      span.innerHTML = eventcontent;
  }
  if(needAchievements)
    getAsync("http://www.spore.com/data/achievements.xml", gotAchievementData, ul);
}
function gotAchievementData(req, ul) {
  var achXml = req.responseXML;
  var eventlinks = ul.getElementsByTagName("a");
  for(var l = 0; l < eventlinks.length; l++)
    if(eventlinks[l].href == "http://spore.wikia.com/wiki/Achievements") {
      var ach = achXml.evaluate("/achievements/achievement/id[.='" + eventlinks[l].firstChild.data + "']", achXml, achXml.createNSResolver(achXml.documentElement), XPathResult.ANY_TYPE, null);
      ach = ach.iterateNext();
      for(ach = ach.nextSibling; ach!= null && ach.nodeName != "name"; ach = ach.nextSibling);
      if(ach) {
        ach = ach.firstChild.data;
        eventlinks[l].href = "http://spore.wikia.com/wiki/" + ach.replace(" ", "_");
        eventlinks[l].replaceChild(document.createTextNode(ach), eventlinks[l].firstChild);
      }
    }
}

function getImageSrcFromEventId(entryid) {
  switch(entryid) {
    case "1":   // switched to creation avatar
    case "2":   // switched to custom avatar
      return "/static/war/images/icons/spd_IconAvatar.png";
    case "3":   // added buddy
      return "/static/war/images/icons/spd_IconBuddy.png";
    case "4":   // created sporecast
      return "/static/war/images/icons/spd_IconNewSporecast.png";
    case "5":   // commented
      return "/static/war/images/icons/spd_IconCommentsEvent.png";
    case "7":   // earned achievement
      return "/static/war/images/icons/spd_IconAchievement.png";
    case "8":   // completed cell stage
    case "9":   // killed cells
    case "10":  // died in cell
      return "/static/war/images/icons/spd_IconEventCLG.png";
    case "11":  // extincted
    case "12":  // befriended
    case "13":  // epicized in creature
    case "14":  // added to posse
      return "/static/war/images/icons/spd_IconEventCRG.png";
    case "15":  // epicized in tribe
    case "16":  // killed epic in tribe
    case "17":  // domesticated
    case "18":  // lost tribe stage
    case "19":  // won tribe stage
      return "/static/war/images/icons/spd_IconEventTRG.png";
    case "20":  // charmed epic
    case "21":  // captured
    case "22":  // used superweapon
    case "24":  // won civilization stage
      return "/static/war/images/icons/spd_IconEventCVG.png";
    case "25":  // epicized in space
    case "26":  // eradicated
    case "27":  // added to fleet
    case "28":  // formed alliance
    case "29":  // declared war
    case "32":  // won gold trophy
    case "33":  // lost gold trophy
    case "34":  // won silver trophy
    case "35":  // lost silver trophy
    case "36":  // won bronze trophy
    case "37":  // lost bronze trophy
      return "/static/war/images/icons/spd_IconEventSPG.png";
    default:
      return "";
  }
}

function utcDate(datestring) {  // datestring is expected as 2010-02-02T18:02:56.000Z
  var thisdate = new Date();
  thisdate.setUTCFullYear(datestring.substring(0, 4));
  thisdate.setUTCMonth(datestring.substring(5, 7) - 1);  // for some reason, month is zero-based
  thisdate.setUTCDate(datestring.substring(8, 10));
  thisdate.setUTCHours(datestring.substring(11, 13));
  thisdate.setUTCMinutes(datestring.substring(14, 16));
  thisdate.setUTCSeconds(datestring.substring(17, 19));
  thisdate.setUTCMilliseconds(datestring.substring(20, 23));
  return thisdate;
}

function smartDate(thedate) {
  var nowdate = new Date();
  var datediff = nowdate.getTime() - thedate.getTime();
  if(datediff < 172800000)  // 48 hours
    return getDayName(thedate.getDay()) + " " + amPmTime(thedate.getHours(), thedate.getMinutes());
  if(datediff < 12960000000)  // 150 days
    return getDayName(thedate.getDay()) + " " + getMonthName(thedate.getMonth()) + " " + thedate.getDate();
  return getMonthName(thedate.getMonth()) + " " + thedate.getDate();
  return thedate;
}

function getDayName(dayNum) {
  switch(dayNum) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "";
  }
}

function getMonthName(monthNum) {
  switch(monthNum + 1) {  // add 1 to account for 0-based month
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
}

function amPmTime(hours, minutes) {
  if(hours == 0)
    return "12:" + zeroPad(minutes) + " AM";
  if(hours == 12)
    return "12:" + zeroPad(minutes) + " PM";
  if(hours < 12)
    return hours + ":" + zeroPad(minutes) + " AM";
  return (hours - 12) + ":" + zeroPad(minutes) + "PM";
}

function zeroPad(num) {
  if(num < 10)
    return "0" + num;
  else
    return num.toString();
}

function hideSporeIslands() {
  var topnews = document.getElementById("TopnewsDiv");
  if(topnews) {
    var link = topnews.getElementsByTagName("a");
    for(var i = link.length - 1; i >= 0; i--)
      if(link[i].href == "http://apps.facebook.com/sporeislands/")
        link[i].parentNode.removeChild(link[i]);
  }
}

function getUsername(publicProfile) {
  if(publicProfile) {
    // potentially viewing someone else's profile, so grab username from url
    var username = document.location.pathname.split("/");
    return username[username.length - 1];
  } else {
    // get the currently logged in user since viewing own profile
    var name = document.getElementById("auxwelcome");
    name = name.getElementsByTagName("a");
    return name[0].firstChild.nodeValue;
  }
}

function getAsync(url, finished, args) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if(req.readyState == 4)
      finished(req, args);
  }
  req.open("GET", url, true);
  req.send(null);
  return true;
}
