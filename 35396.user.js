// ==UserScript==
// @name            Better Mobile Twitter
// @version         6.0
// @namespace       http://ellab.org
// @author          angusdev
// @description     To enhance the mobile twitter page
// @include         https://mobile.twitter.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

/*jshint white: false, browser: true, onevar:false, devel:true */
/*global $, chrome, GM_xmlhttpRequest, org */
(function() {
'use strict';

function BetterMobileTwitter() {
  this.isChrome = false;
  this.enabled = true;
  this.loading = false;
  this.page = 1;
  this.lastMessage = '';
  this.myname = '';
  this.onsrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAcCAMAAACppkqwAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAFBMVEUoKCgwMDA5OTkZOXogP3xAQEBERUhHSUtOUVVVVVVUWF5YWFhOWnBXY3plZWZiZGhsbGxvc3p0dHR9fX0YP4seRI8bQpEeT64lQ4AnRYErSIMkSJIoTJQsT5YyToUzUIg4VIoyVJo6Wpc6W50rU6AjVLcoWbguXLsxWKMwXLI1YLYxYL44ZL0iWsYmXMotYMQsYcw5Z8I6acY0aNA5bdNCV4BVbJlCYqJAY6pMba5BaLRMcLdQbahAbcVDcc1JdMpBc9dKeddJetxTfM1af8ltgqx0h618jrFXgM9bhtxSgeBYh+NciuRfjedjh9BpjNJvkdZzldd5mtxxluFzmud6nueCg4OXl5mam5yRoL+lpaWqrK63t7e/v7+DpOiFp+yKq+yRr+ufuOqirsiptcyvus+a5Oi7zfDGxsbOzs7Hz9/V1dXf39/M1OTO2vLW3OjV3/Td4uvd5PXn5+fg5Ozk6O/v7+/s8Pft8vz39/fz9Pj4+vz7/P39/f0S8OgABAGVYIgS8PxFZh4MAAAS8PhCkIMS8SQAAAD//EgAAAAWbsAWbuAABQAWbdAAAABCkAk94RQCCYoS8bAAAAAWbdA94R8AAAAAAAAABQAAABOVYIgABAEAAAAFhqAQacBFZcBBlL5Cr0ICCYoABAEAAAAFhqAAAAAAArAAAAEAAAAAAAAAAAAAAACKACEABQBC9AuVYIgABAEAAAAAAAQAAaYAAAIABQAAABMWbuABGOQAAAAAAAAAAAAAAAAAAAAAAAAAAAC/YRwABABPLyCACxKA7mRPL0QS8XBPMpQAxCgS8oA9654WbdAAAAAWbmAAAAQAAAAS8ug95RsAAAAAAAABGlIAAADxn43xntwBGlIAAAAAAAAS9SAAAAAAACg95RsAAAAS8ogA//8AAADxn3g95RsAAAAS8pRBhzQCCYoABAoAAAAS9sQS8qxBhzQCCYoAAA8AAAAAAAA95Ru6q80AAAAS8ug95RsS8xRBiBb90AAS8xRBiFoS8tQoKCgoKCj4nXKPAAAAZ3RSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AFBa6eAAAAdZJREFUeNq91ulT00AYx/Eg1OLBGkHRUSbQcoyl5TKKogIppUjTDAq0HAU6CLgUSimXxPD753madwkduksYvi+y2+kz+5n0mInCOV9VQ5I9amp6whqnFjhXeLn1c9+QXG9etbC1rVLDNlWVgFBkWLL+zuYXhcbH1+ooKC+1Udn6XzczsfNLW6ryeEQaGCDgQDCmhKTPlwV06Qbet7CyYHcC4nLApxvp8Vhcdze67l5978e7ggExbTw9rsVo1619oGtEG/MOJAg4EowAw1dizgZw9XPQMBzsfjSMQyz4JrreBgHSwH5xH5irAfhhGBU/MBYImLKRpyWHqykCnMMEAb+8I5ORd+xcMAJmvKVgu6uN+RkHO0gnCfCOBAMWUXXXKpYIMO2Lb3WBS8EIML0t41+SluQFlkwC/mC9gt/ekeleLQCQASZomQCsGmCeOadYvE/APMHf6NfoHs5MFyjSb7YO4AhGQNZXDqjuVYB8NuuAXh8T4J1I9XbLAJa/7dof7f827ehjsqw8UPQOpL70MAhWD7CsXDFn3VJwoEHzDwEE+Q7uGQjLAykpYPX5ne7gXOz80orCw6HZjByQ+R5tWxERLg9YWeF842lY+slReSbw5MhYe5lfA3x4QqsW145cAAAAAElFTkSuQmCC';
  this.offsrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAcCAMAAACppkqwAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAFBMVEU/Pz9AQEBCQkJDQ0NKSkpMTExNTU1OTk5QUFBRUVFSUlJUVFRVVVVYWFhZWVlbW1tcXFxdXV1eXl5fX19iYmJjY2NlZWVmZmZnZ2doaGhpaWlqamptbW10dHR1dXV2dnZ3d3d8fHx9fX1/f3+AgICBgYGCgoKDg4OFhYWGhoaHh4eIiIiJiYmKioqLi4uOjo6Pj4+QkJCSkpKUlJSVlZWWlpaYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6epqamqqqqrq6utra2urq6wsLC1tbW3t7e4uLi5ubm7u7u8vLy9vb2+vr6a5OjAwMDBwcHCwsLDw8PExMTGxsbHx8fIyMjJycnKysrMzMzPz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbY2Nja2trb29vc3Nze3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7///8AAABCkAk94RQCCYoS8bAAAAAWbdA94R8AAAAAAAAABQAAABOVYIgABAEAAAAGH6QQacBFZcBBlL5Cr0ICCYoABAEAAAAGH6QAAAAAArAAAAEAAAAAAAAAAAAAAACKACEABQBC9AuVYIgABAEAAAAAAAQAAaYAAAIABQAAABMWbuABGOQAAAAAAAAAAAAAAAAAAAAAAAAAAAC/YRwABABPLyCACxKA7mRPL0QS8XBPMpQAxCgS8oA9654WbdAAAAAWbmAAAAQAAAAS8ug95RsAAAAAAAABGoQAAADxn43xntwBGoQAAAAAAAAS9SAAAAAAACg95RsAAAAS8ogA//8AAADxn3g95RsAAAAS8pRBhzQCCYoABAoAAAAS9sQS8qxBhzQCCYoAAA8AAAAAAAA95Ru6q80AAAAS8ug95RsS8xRBiBb90AAS8xRBiFoS8tQ/Pz8/Pz8VWo7vAAAAVXRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////8AsKEHzwAAAVhJREFUeNrt1i1vhTAUBmBOgsDgjkEgSOqqMEhkDUkVdZi6qsrKSn73TuHeDUIW2m5M7TUHGugT+kFazJphROqmY4nhwszzXCzNqO4jkCmbGCPZRABOEf0rNTWDcamxvSRgiQtmACSYBMCmA06JAnVc8gDLHwYc+wPAxIUAf4zTkzTbxb4o3auen/LZgEagMGpjsIWrvVYXIHLbnAFbAY59BW0Amp4iFZShjvmAO7zHgYXRqUASMGxNCmp/TS6AoHZnIIDTNtEBCPvFXYDI5XAGStgmeKQP4dvQl/41B+p3gBp0KANwAjD8Ogkowz/UXAAfFxzd+pUWxLvQMG1NNETrNbmAgJpulwLMQwDNcsU6gH79BJbvgDUuOPrjrW3DjA7+MWBdnTb+/rUfAHH5B+5ih4RlmgNIWTRPAprNRSdcRPeOoUgGnGR08JpjDo6ITd0mnx17QUfHDw3CUdHJl2jOAAAAAElFTkSuQmCC';
  this.loadingsrc = 'data:image/gif;base64,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';

  this.nsResolver = {
    lookupNamespaceURI:function (prefix) {
      if (prefix == "html") {
        return "http://www.w3.org/1999/xhtml";
      }
      else {
        return "";
      }
    }
  };
  this.expandUrlMap = [
    {name:'tinyurl',     func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/tinyurl\.com\/[a-zA-z0-9]+$/},
    {name:'snipurl',     func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/snipurl\.com\/[a-zA-z0-9]+$/},
    {name:'pingfm',      func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/ping\.fm\/[a-zA-z0-9]+$/},
    {name:'ffim',        func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/ff\.im\/[a-zA-z0-9\-\|]+$/},
    {name:'trim',        func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/tr\.im\/[a-zA-z0-9]+$/},
    {name:'isgd',        func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/is\.gd\/[a-zA-z0-9]+$/},
    {name:'bitly',       func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/bit\.ly\/[a-zA-z0-9]+$/},
    {name:'twurl',       func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/twurl\.nl\/[a-zA-z0-9]+$/},
    {name:'shortto',     func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/short\.to\/[a-zA-z0-9]+$/},
    {name:'googl',       func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/goo\.gl\/[a-zA-z0-9]+$/},
    {name:'lnkd.in',     func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/lnkd\.in\//},
    {name:'linkedin',    func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/(www\.)?linkedin\.com\slink\?/},
    {name:'es.pn',       func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/es\.pn\//},
    {name:'espn',        func:this.expandUrl_espn,        ajax:false, regex:/http:\/\/espn\.go\.com\//},
    {name:'4sq',         func:this.expandUrl_tinyurl,         ajax:true,  regex:/http:\/\/4sq.com\//},
    {name:'foursquare',  func:this.expandUrl_foursquare,  ajax:true,  regex:/https?:\/\/foursquare\.com\/[^\/]+\/checkin\//},
    //{name:'hellotxt',    func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/hellotxt\.com\/l\/[a-zA-z0-9]+$/},
    //{name:'hellotxttxt', func:this.expandUrl_hellotxt,    ajax:true,  regex:/http:\/\/hellotxt\.com\/[a-zA-z0-9]+$/},
    //{name:'funp',        func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/funp\.com\//},
    //{name:'twitpic',     func:this.expandUrl_twitpic,     ajax:true,  regex:/http:\/\/twitpic\.com\/[a-zA-z0-9]+$/},
    //{name:'tapulous',    func:this.expandUrl_tapulous,    ajax:true,  regex:/http:\/\/twinkle\.tapulous\.com\/index\.php\?hash=/},
    //{name:'flickr',      func:this.expandUrl_flickr,      ajax:true,  regex:/(www\.)?flickr\.com\/photos/},
    //{name:'pingfmimg',   func:this.expandUrl_pingfmimg,   ajax:true,  regex:/http:\/\/ping\.fm\/p\/[a-zA-z0-9]+$/},
    //{name:'hellotxtimg', func:this.expandUrl_hellotxtimg, ajax:true,  regex:/http:\/\/hellotxt\.com\/i\/[a-zA-z0-9]+$/},
    {name:'youtube',     func:this.expandUrl_youtube,     ajax:false, regex:/http:\/\/[a-z]*\.youtube\.com\//},
    {name:'youtu.be',    func:this.expandUrl_tinyurl,     ajax:true,  regex:/http:\/\/youtu\.be\//},
    {name:'img',         func:this.expandUrl_img,         ajax:false, regex:/http:\/\/.*\.(gif|jpg|png)$/},
    //{name:'googlelogin', func:this.expandUrl_googlelogin, ajax:false, regex:/^https?:\/\/[^\/]*\.google\.com?(\.[a-zA-Z]{1,2})?\/accounts\/ServiceLogin\?/},
    //{name:'longurl',     func:this.expandUrl_longurl,     ajax:false, regex:/.{101}/},
    {name:'t.co',        func:this.expandUrl_metarefresh, ajax:true,  regex:/http:\/\/t\.co\/[a-zA-z0-9]+$/ },
    {name:'instagram',   func:this.expandUrl_instagram,   ajax:true,  regex:/https?:\/\/instagram\.com\/p\/[a-zA-z0-9]+\/?$/ },
    {name:'pic.twitter', func:this.expandUrl_pictwitter,  ajax:true,  regex:/https?:\/\/twitter\.com\/[^\/]+\/status\/.*\/photo/ }
  ];
}

BetterMobileTwitter.prototype.encodeHTML = function(t) {
  t = t.replace(/&/g, '&amp;');
  t = t.replace(/\"/g, '&quot;');
  t = t.replace(/</g, '&lt;');
  t = t.replace(/>"/g, '&gt;');

  return t;
};

BetterMobileTwitter.prototype.init = function() {
  if (navigator.userAgent.match(/Chrome/)) {
    this.enabled = document.location.href == 'http://m.twitter.com/home';
    this.isChrome = true;
  }

  if (this.enabled && document.body) this.functionPrinciple();
};

BetterMobileTwitter.prototype.extract = function(s, prefix, suffix, allowSuffixNotFound) {
  var i;
  var lower = s.toLowerCase();
  if (prefix) {
    i = lower.indexOf(prefix.toLowerCase());
    if (i >= 0) {
      s = s.substring(i + prefix.length);
    }
    else {
      return '';
    }
  }

  if (suffix) {
    lower = s.toLowerCase();
    i = lower.indexOf(suffix.toLowerCase());
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else if (allowSuffixNotFound) {
      return s;
    }
    else {
      return '';
    }
  }

  return s;
};

BetterMobileTwitter.prototype.removeInvalidChar = function(t) {
  // Some tweets has special character, need to remove it
  for (var i=0;i<t.length;i++) {
    if (t.charCodeAt(i) < 32 && t.charCodeAt(i) != 10 && t.charCodeAt(i) != 13 && t.charCodeAt(i) != 9) {
      t = t.substring(0, i) + t.substring(i+1);
      --i;
    }
  }

  return t;
};

BetterMobileTwitter.prototype.shortenDisplayUrl = function(s) {
  if (s && typeof s === 'string') {
    s = s.replace(/^http:\/\//, '');
    if (s.length > 60) {
      s = s.substring(0, 57) + '…';
    }
  }

  return s;
};

BetterMobileTwitter.prototype.extractTweetsHTML = function(fullt) {
  return this.removeInvalidChar(this.extract(fullt, '<ul>', '</ul>'));
};

BetterMobileTwitter.prototype.nextPage = function() {
  if (this.loading) {
    return;
  }

  this.loading = true;
  document.getElementById('bmt-scrolldetector').innerHTML = 'Loading more tweets...';

  var bmt = this;
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var t = bmt.extractTweetsHTML(this.responseText);

        var targetul = document.getElementById('bmt-tweetsdiv').getElementsByTagName('ul')[0];
        pageli = document.createElement('li');
        pageli.innerHTML = 'Page ' + (bmt.page + 1);
        targetul.appendChild(pageli);
        var ulholder = document.createElement('ul');
        ulholder.innerHTML = t;
        var lilist = ulholder.getElementsByTagName('li');
        /*jshint loopfunc:true */
        while (lilist.length) {
          lilist[0].addEventListener('mouseover', function(e) { bmt.onMouseOverOutTweets(e.target, true); }, false);
          lilist[0].addEventListener('mouseout', function(e) { bmt.onMouseOverOutTweets(e.target, false); }, false);
          targetul.appendChild(lilist[0]);
        }
        /*jshint loopfunc:false */

        bmt.loading = false;
        document.getElementById('bmt-scrolldetector').innerHTML = '';

        // add user filter
        var filter = document.getElementById('bmt-userfilter');
        while (t) {
          var li = bmt.extract(t, '<li>', '</li>');
          if (li) {
            bmt.addUserFilter(filter, li);
          }

          t = bmt.extract(t, '</li>');
        }
        bmt.onUserFilterChanged(filter);

        bmt.page++;
        bmt.expandUrl(1);
      }
      else {
        document.getElementById('bmt-scrolldetector').innerHTML = 'Error ' + this.status;
      }
    }
  };
  client.open('GET', 'http://m.twitter.com/account/home.mobile?page=' + (bmt.page + 1));
  client.send(null);
};

BetterMobileTwitter.prototype.loadReplies = function() {
  var replyDiv = document.getElementById('bmt-replydiv');
  replyDiv.innerHTML = 'Loading replies ...';

  var bmt = this;
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var t = bmt.extractTweetsHTML(this.responseText);
        replyDiv.innerHTML = '<div class="s" style="font-size:133%;"><b>replies</b></div><ul>' + t + '</ul>';
      }
      else {
        replyDiv.innerHTML = 'Error ' + this.status;
      }
    }
  };
  client.open('GET', 'http://m.twitter.com/replies');
  client.send(null);
};

BetterMobileTwitter.prototype.loadDirectMessage = function(displayCount) {
  var directMessageDiv = document.getElementById('bmt-directdiv');
  directMessageDiv.innerHTML = 'Loading direct messages ...';

  var bmt = this;
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var olbody = bmt.extract(this.responseText, '<ol class="statuses" id="timeline">', '</ol>');
        //t = t.replace(/id="[^"]*"/g, '');
        //t = t.replace(/<img[^>]*>/g, '');
        var cont = true;
        var count = 0;
        var html = '';
        while (cont) {
          var t = bmt.extract(olbody, '<li', '</li>');
          if (t) {
            t = bmt.extract(t, 'status-body">', '<span class="action');
            // span class="published" is the publish time, change to <small> as used in mobile version
            t = t.replace(/<span class="published">([^<]*)<\/span>/, ' <small>$1</small>');
            // remove all span tags
            t = t.replace(/<\/?span[^>]*>/g, '');
            // remove all image tags
            t = t.replace(/<img[^>]*>/g, '');
            // remove all class attribute
            t = t.replace(/\s+class="[^"]*"/g, '');
            // remove all title attribute
            t = t.replace(/\s+title="[^"]*"/g, '');
            // add spaces after the username
            t = t.replace(/(<\/strong>)/, '$1 ');
            // finally remove invalid chars
            t = bmt.removeInvalidChar(t);
            html = html + '<li' + (++count > displayCount?' style="display:none;"':'') + '>' + t + '</li>';

            olbody = bmt.extract(olbody, '</li>');
          }
          else {
            cont = false;
          }
        }
        directMessageDiv.innerHTML = '<div class="s" style="font-size:133%;"><b>direct messages</b>' +
                                     (count > displayCount?' <a id="bmt-directdiv-expand" href="javascript:void(0)">[+]</a>':'') +
                                     '</div><ul>' + html + '</ul>';
        var expandLink = document.getElementById('bmt-directdiv-expand');
        if (expandLink) {
          expandLink.addEventListener('click', function(e) {
            var lilist = directMessageDiv.getElementsByTagName('li');
            for (var i=displayCount;i<lilist.length;i++) {
              lilist[i].style.display = '';
            }
            e.target.parentNode.removeChild(e.target);
          }, false);
        }
      }
      else {
        directMessageDiv.innerHTML = 'Error ' + this.status;
      }
    }
  };
  client.open('GET', 'http://m.twitter.com/direct_messages');
  client.send(null);
};

BetterMobileTwitter.prototype.calcOffsetTop = function(e) {
  var top = 0;
  do {
    if (!isNaN(e.offsetTop)) top += e.offsetTop;
    e  = e.offsetParent;
  } while (e);

  return top;
};

BetterMobileTwitter.prototype.detectScroll = function() {
  if (!this.enabled) return;
  var scrollTop = this.isChrome?document.body.scrollTop:document.documentElement.scrollTop;
  if (this.calcOffsetTop(document.getElementById('bmt-scrolldetector')) < scrollTop + document.documentElement.clientHeight) {
    this.nextPage();
  }
};

BetterMobileTwitter.prototype.statusMessageChanged = function(e) {
  document.getElementById('bmt-wordcount').innerHTML = 140 - e.target.value.length;
};

BetterMobileTwitter.prototype.checkUpdate = function() {
  var bmt = this;
  if (!bmt.enabled) {
    window.setTimeout(function() {bmt.checkUpdate(bmt);}, 60000);
    return;
  }

  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var newTweetsCount = 0;
        var fullt = this.responseText;
        var t = bmt.extract(fullt, '<ul>', '</ul>');
        while (t) {
          var li = bmt.extract(t, '<li>', '</li>');
          li = li?li.replace(/<small>[^<]*<\/small>/, ''):'';
          if (li) {
            document.getElementById('bmt-htmlholder').innerHTML = li;
            li = document.getElementById('bmt-htmlholder').innerHTML;
            if (li == bmt.lastMessage) {
              break;
            }
            else {
              newTweetsCount++;
            }
          }

          t = bmt.extract(t, '</li>');
        }
        if (newTweetsCount) {
          document.getElementById('bmt-checkupdate').innerHTML = newTweetsCount + ' new tweet' + (newTweetsCount>1?'s':'');
          if (document.title.match(/^\(\d+\)/)) {
            document.title = document.title.replace(/^\(\d+\)/, '(' + newTweetsCount + ')');
          }
          else {
            document.title = '(' + newTweetsCount + ') ' + document.title;
          }
        }
      }
      else if (this.status) {
        document.getElementById('bmt-checkupdate').innerHTML = 'Error ' + this.status;
      }

      window.setTimeout(function() {bmt.checkUpdate(bmt);}, 60000);
    }
  };
  client.open('GET', 'http://m.twitter.com/account/home.mobile');
  client.send(null);
};

BetterMobileTwitter.prototype.addUserFilter = function(filter, li) {
  // get user list
  var nameres = li.match(/^<a[^>]*>([^<]*)</);
  if (nameres) {
    var name = nameres[1];
    for (var i=1; i<filter.options.length; i++) {
      if (filter.options[i].value.toLowerCase() == name.toLowerCase()) return;
      if (filter.options[i].value.toLowerCase() > name.toLowerCase()) break;
    }

    var option = document.createElement('option');
    option.text = name;
    option.value = name;
    filter.options.add(option, i);
  }
};

BetterMobileTwitter.prototype.onUserFilterChanged = function(filter) {
  var name = filter.options[filter.selectedIndex].value;

  var lis = document.getElementById('bmt-tweetsdiv').getElementsByTagName('li');
  for (var i=0; i<lis.length; i++) {
    if (filter.selectedIndex === 0 || lis[i].innerHTML.match('href="\/' + name + '"')) {
      lis[i].style.display = '';
    }
    else {
      lis[i].style.display = 'none';
    }
  }
};

BetterMobileTwitter.prototype.sessionStorageWrapper = function(url, obj, key, func) {
  if (obj && typeof obj === 'string') {
    console.log('sessionStorageWrapper obj is a string:' + url + ':' + obj);
    return obj;
  }

  var strdata = func();
  if (window.sessionStorage) {
    window.sessionStorage.setItem(url, strdata);
  }

  return strdata;
};

BetterMobileTwitter.prototype.sessionStorageWrapper_image = function(a, url, obj, key, func) {
  // obj.finalUrl should be the cached image url
  // otherwise call func to get the image url from obj.responseText;

  if (obj && typeof obj === 'string') {
    console.log('sessionStorageWrapper_image obj is a string:' + url + ':' + obj);
    return obj;
  }

  var imgUrl = obj.responseText?this.sessionStorageWrapper(url, obj, key, func):obj.finalUrl;
//console.log(imgUrl);

  if (imgUrl) {
    this.expandUrl_image(a, url, imgUrl);
  }
  else{
    this.expandUrl(1);
  }
};

BetterMobileTwitter.prototype.expandUrl_tinyurl = function(bmt, a, url, t) {
//if (url.indexOf('4sq') !== -1) console.log('expandUrl_tinyurl:' + url);

  var finalUrl = bmt.sessionStorageWrapper(url, t, 'tinyurl', function() {
    return t.finalUrl;
  });
//if (finalUrl.indexOf('4sq') !== -1) console.log('expandUrl_tinyurl finalurl:' + finalUrl);

  if (finalUrl && url != finalUrl) {
    a.innerHTML = bmt.encodeHTML(decodeURIComponent(bmt.shortenDisplayUrl(finalUrl)));
  }
  a.setAttribute('bmt-finalurl', finalUrl);

  if (!bmt.expandOneUrl(a)) {
    bmt.expandUrl(1);
  }
};

BetterMobileTwitter.prototype.expandUrl_metarefresh = function(bmt, a, url, t) {
//console.log('expandUrl_metarefresh:' + url);
//console.log(t);
  var finalUrl = bmt.sessionStorageWrapper(url, t, 'metarefresh', function() {
    return bmt.extract(t.responseText, 'content="0;url=', '"');
  });
//console.log('expandUrl_metarefresh finalurl:' + finalUrl);

  if (finalUrl && url != finalUrl) {
    a.innerHTML = bmt.encodeHTML(decodeURIComponent(bmt.shortenDisplayUrl(finalUrl)));
    a.removeAttribute('bmt-expandurl');
  }
  a.setAttribute('bmt-finalurl', finalUrl);

  if (!bmt.expandOneUrl(a)) {
    bmt.expandUrl(1);
  }

};

BetterMobileTwitter.prototype.expandUrl_image = function(a, url, imgsrc) {
//  console.log('add ' + imgsrc);
  if (imgsrc[0] === '/') {
    imgsrc = url.match(/https?:\/\/[^\/]*/)[0] + imgsrc;
  }
  var img = document.createElement('img');
  img.setAttribute('style', 'border:none; margin-left:5px; height:70px;');
  img.src = imgsrc;
  a.appendChild(img);

  this.expandUrl(1);
};

BetterMobileTwitter.prototype.expandUrl_hellotxt = function(bmt, a, url, t) {
  t = bmt.extract(bmt.extract(t.responseText, '<div class="history-row big">'), '<p>', '</p>');
  if (t) {
    a.innerHTML = t;
  }

  bmt.expandUrl(1);
};

BetterMobileTwitter.prototype.expandUrl_twitpic = function(bmt, a, url, t) {
  bmt.sessionStorageWrapper_image(a, url, t, 'twitpic', function() {
    return bmt.extract(bmt.extract(t.responseText, '<img id="pic"'), 'src="', '"');
  });
};

BetterMobileTwitter.prototype.expandUrl_tapulous = function(bmt, a, url, t) {
  var res = url.match(/[\?|&]hash=([a-zA-Z0-9]*)(&.*$)?/);
  if (res) {
    // show the first 4 hash, then follow by ...
    a.innerHTML = a.innerHTML.replace(/([\?|&amp;]hash=[a-zA-Z0-9]{4})[a-zA-Z0-9]*/, '$1...');
  }

  bmt.sessionStorageWrapper_image(a, url, t, 'tapulous', function() {
    return bmt.extract(bmt.extract(bmt.extract(t.responseText, '<div id="post">'), '</div>'), 'img src="', '"');
  });
};

BetterMobileTwitter.prototype.expandUrl_pingfmimg = function(bmt, a, url, t) {
  bmt.sessionStorageWrapper_image(a, url, t, 'pingfmimg', function() {
    return bmt.extract(bmt.extract(t.responseText, 'background:url(/_images/layout/loading.gif)'), '<img src="', '"');
  });
};

BetterMobileTwitter.prototype.expandUrl_hellotxtimg = function(bmt, a, url, t) {
  bmt.sessionStorageWrapper_image(a, url, t, 'hellotxtimg', function() {
    return bmt.extract(bmt.extract(t.responseText, '<div class="status_pic'), '<img src="', '"');
  });
};

BetterMobileTwitter.prototype.expandUrl_flickr = function(bmt, a, url, t) {
  t = t.responseText || t;
  bmt.sessionStorageWrapper_image(a, url, t, 'flickr', function() {
    var pid = url.match(/flickr\.com\/photos\/[^\/]+\/(\d+)/);
    if (pid) {
      return bmt.extract(bmt.extract(t, '<div id="photoImgDiv' + pid[1] + '"'), 'src="', '"');
    }
    return '';
  });
};

BetterMobileTwitter.prototype.expandUrl_instagram = function(bmt, a, url, t) {
//console.log('expandUrl_instagram:' + url);
//console.log('expandUrl_instagram:t.responseText=' + t);
  bmt.sessionStorageWrapper_image(a, url, t, 'instagram', function() {
    return bmt.extract(t.responseText, '<meta property="og:image" content="', '"');
  });
};

BetterMobileTwitter.prototype.expandUrl_pictwitter = function(bmt, a, url, t) {
//console.log('expandUrl_pictwitter:' + url);
//console.log('expandUrl_pictwitter:t.responseText=' + t.responseText);
  bmt.sessionStorageWrapper_image(a, url, t, 'pictwitter', function() {
//console.log('callback:' + bmt.extract(bmt.extract(t.responseText, 'data-resolved-url-large='), 'src="', '"'));
    return bmt.extract(bmt.extract(t.responseText, 'data-resolved-url-large='), 'src="', '"');
  });
};

BetterMobileTwitter.prototype.expandUrl_foursquare = function(bmt, a, url, t) {
  bmt.sessionStorageWrapper_image(a, url, t, 'foursquare', function() {
    var res = t.responseText.match(/<meta content="([^<]+)" property="og:image"/);
    return res?res[1]:null;
  });
};

BetterMobileTwitter.prototype.expandUrl_youtube = function(bmt, a, url) {
  var res = url.match(/[\?|&]v=([a-zA-Z0-9_\-]*)(&.*$)?/);
  if (res) {
    a.innerHTML = a.innerHTML.replace(/([\?|&]v=[a-zA-Z0-9_\-]*)(&.*$)/, '$1&amp;...');

    bmt.expandUrl_image(a, url, 'http://i4.ytimg.com/vi/' + res[1] + '/default.jpg');
  }
  else {
    bmt.expandUrl(1);
  }
};

BetterMobileTwitter.prototype.expandUrl_img = function(bmt, a, url) {
  bmt.expandUrl_image(a, url, url);
};

BetterMobileTwitter.prototype.expandUrl_googlelogin = function(bmt, a, url) {
  var res = url.match(/&continue=(.*)/);
  if (res) {
    a.innerHTML = bmt.encodeHTML(decodeURIComponent(res[1]));
  }

  bmt.expandUrl(1);
};

// obsolete by shortenDisplayUrl
BetterMobileTwitter.prototype.expandUrl_longurl = function(bmt, a, url) {
  var brokenurl = '';
  var html = a.innerHTML;
  while (html.length > 100) {
    brokenurl = brokenurl + (brokenurl.length?' ':'') + html.substring(0, 100);
    html = html.substring(100);
  }
  brokenurl = brokenurl + (brokenurl.length?' ':'') + html.substring(0, 100);

  a.innerHTML = bmt.encodeHTML(brokenurl);

  bmt.expandUrl(1);
};

BetterMobileTwitter.prototype.expandUrl_espn = function(bmt, a, url) {
  // from: http://espn.go.com/nba/story/_/id/9991489/{story name}
  // to:   http://espn.go.com/nba/.../{story name}
  url = url.replace(/story\/([^\/]\/)*id\/\d+/, '...');
  a.innerHTML = bmt.encodeHTML(decodeURIComponent(url));

  bmt.expandUrl(1);
};

BetterMobileTwitter.prototype.expandOneUrl_ajaxWrapper = function(bmt, a, url, func) {
  if (window.sessionStorage) {
    // t.finalUrl only
    var t = window.sessionStorage.getItem(url);
    if (t) {
      func(bmt, a, url, { finalUrl:t } );
      return;
    }
  }

  var img = document.createElement('img');
  img.src = bmt.loadingsrc;
  img.setAttribute('style', 'margin-left:5px;');
  a.appendChild(img);

  /*jshint newcap: false */
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(t) {
      a.removeChild(img);
      func(bmt, a, url, t);
    }
  });
  /*jshint newcap: true */
};

BetterMobileTwitter.prototype.expandOneUrl = function(a) {
  var url = a.getAttribute('bmt-finalurl') || a.getAttribute('data-url') || a.href;

//console.log('expandOneUrl:' + url);
  for (var j=0;j<this.expandUrlMap.length;j++) {
    if (url.match(this.expandUrlMap[j].regex)) {
//console.log(url, 'expandOneUrl match:' + this.expandUrlMap[j].name);
      if (this.expandUrlMap[j].ajax) {
        this.expandOneUrl_ajaxWrapper(this, a, url, this.expandUrlMap[j].func);
      }
      else {
        this.expandUrlMap[j].func(this, a, url);
      }

      return true;
    }
  }

  // expand the url that is ellipse by twitter, using our length limit (we also have a limit, refer to shortenDisplayUrl()
  if (a.innerHTML.match(/…$/)) {
    a.innerHTML = this.encodeHTML(bmt.shortenDisplayUrl(url));
  }

  return false;
};

BetterMobileTwitter.prototype.expandUrl = function(maxRun) {
  var bmt = this;
  var loadcount = 0;

  $('.stream-items li a:not([bmt-expandurl]), .timeline .tweet-text a:not([bmt-expandurl])').each(function() {
    // since we use setInterval to call expandUrl, there may be cases that the previous loop didn't finish and the next loop starts
    // and second call will select the <a> in previous call but didn't process, resulting in double action on same <a>
    // so we need to test [bmt-expandurl] again to avoid it
    if (!this.getAttribute('bmt-expandurl')) {
      this.setAttribute('bmt-expandurl', 'true');
      if (bmt.expandOneUrl(this)) {
        if (++loadcount >= maxRun) {
          return false;
        }
      }
    }
  });
};

BetterMobileTwitter.prototype.onMouseOverOutTweets = function(obj, isover) {
  while (obj && obj.tagName.toUpperCase() != 'LI') {
    obj = obj.parentNode;
  }
  if (obj) {
    var actionspan = obj.getElementsByTagName('span');
    if (actionspan.length > 0 && actionspan[actionspan.length - 1].getAttribute('bmt-actionspan')) {
      actionspan = actionspan[actionspan.length - 1];
    }
    else if (isover && this.myname != obj.getElementsByTagName('a')[0].textContent) {
      actionspan = document.createElement('span');
      actionspan.setAttribute('bmt-actionspan', 'true');
      // tweets div is 80% width, so use right: 22%
      actionspan.setAttribute('style', 'position: absolute; right: 22%;');

      var replybtn = document.createElement('img');
      replybtn.src = 'http://static.twitter.com/images/icon_reply.gif';
      replybtn.setAttribute('style', 'cursor:pointer; padding:5px;');
      replybtn.addEventListener('click', function(e) {
        var status = document.getElementById('status');
        if (status) {
          var replyto = '@' + obj.getElementsByTagName('a')[0].textContent;
          // ignore if already start with the replyto string
          if (!status.value.match('^' + replyto)) {
            status.value = replyto + ' ' + status.value.replace(replyto, '');
            status.focus();
          }
        }
      }, false);

      actionspan.appendChild(replybtn);

      obj.appendChild(actionspan);
    }
    else {
      actionspan = null;
    }

    if (actionspan) {
      actionspan.style.visibility = isover?'visible':'hidden';
    }

    obj.style.backgroundColor = isover?'#f7f7f7':'';
  }
};

BetterMobileTwitter.prototype.functionPrinciple = function() {
  // check if it is a mobile version
  if (document.getElementById('dim-screen')) return;

  var status = document.getElementById('status');

  // check if any connection error
  if (!status) return;

  var bmt = this;

  this.page = document.location.href.match(/page=(\d+)/);
  this.page = this.page?paresInt(this.page[1], 10):1;

/*
  // get user name
  var username = document.evaluate("//html:a[@accesskey='2']/@href", document, this.nsResolver, XPathResult.STRING_TYPE, null).stringValue;
  if (username) {
    var res = username.match(/twitter\.com\/(.*)$/);
    if (res) {
      this.myname = res[1];
    }
  }

  // add replies layer
  var tweetsDiv = document.createElement('div');
  var rightBarDiv = document.createElement('div');
  var tweetsUl = document.getElementsByTagName('ul')[0];

  tweetsDiv.setAttribute('style', 'width:80%;');
  tweetsDiv.setAttribute('id', 'bmt-tweetsdiv');


  rightBarDiv.setAttribute('style', 'float:right; width:19%; margin-left:1%; margin-right:3px; ');

  var directDiv = document.createElement('div');
  directDiv.setAttribute('style', 'min-height: 100px; padding:5px; font-size: 75%; ' +
                                 'background:#f9ffe8; border:1px solid #87bc44; ' +
                                 '-moz-border-radius:5px; -webkit-border-radius: 5px;');
  directDiv.setAttribute('id', 'bmt-directdiv');
  directDiv.innerHTML = 'BBDBD';
  rightBarDiv.appendChild(directDiv);

  var replyDiv = document.createElement('div');
  replyDiv.setAttribute('style', 'min-height: 100px; padding:5px; margin-top:8px; font-size: 75%; ' +
                                 'background:#f9ffe8; border:1px solid #87bc44; ' +
                                 '-moz-border-radius:5px; -webkit-border-radius: 5px;');
  replyDiv.setAttribute('id', 'bmt-replydiv');
  rightBarDiv.appendChild(replyDiv);

  tweetsUl.parentNode.insertBefore(rightBarDiv, tweetsUl);
  tweetsUl.parentNode.insertBefore(tweetsDiv, tweetsUl);
  tweetsDiv.appendChild(tweetsUl);

  this.loadDirectMessage(2);
  this.loadReplies();

  // modify status window
  if (status) {
    // remove the BR between status editbox and update button
    var br = status.nextSibling;
    while (br && br.tagName != 'br') br = br.nextSibling;
    if (br && br.parentNode) {
      br.parentNode.removeChild(br);
      status.style.marginRight = '7px';
    }
    status.style.width = '500px';

    // show remaining char
    var wordCount = document.createElement('span');
    wordCount.setAttribute('id', 'bmt-wordcount');
    wordCount.innerHTML = '140';
    status.parentNode.appendChild(wordCount);
    status.addEventListener('keyup', this.statusMessageChanged, false);
    status.addEventListener('blur', this.statusMessageChanged, false);
    status.addEventListener('focus', this.statusMessageChanged, false);

    // dropdown for user filter
    var filter = document.createElement('select');
    filter.setAttribute('id', 'bmt-userfilter');
    filter.setAttribute('style', 'margin-left: 30px;');
    filter.addEventListener('change', function(e) { bmt.onUserFilterChanged(e.target); }, false);

    var option = document.createElement('option');
    option.text = ' --- Filter --- ';
    option.value = ' ';
    filter.options.add(option, 0);

    // generate user filter list
    var lis = document.getElementsByTagName('li');
    for (var i=0;i<lis.length;i++) {
      this.addUserFilter(filter, lis[i].innerHTML);
    }

    status.parentNode.appendChild(filter);
  }
*/

  // setup mouseover and mouseout event
  /*jshint loopfunc:true */
  var tweetslilist = document.evaluate("//html:div[@id='bmt-tweetsdiv']//html:li", document, this.nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var j=0;j<tweetslilist.snapshotLength;j++) {
    tweetslilist.snapshotItem(j).addEventListener('mouseover', function(e) { bmt.onMouseOverOutTweets(e.target, true); }, false);
    tweetslilist.snapshotItem(j).addEventListener('mouseout', function(e) { bmt.onMouseOverOutTweets(e.target, false); }, false);
  }
  /*jshint loopfunc:false */

/*
  // change the older link for scroll detector
  var res_a = document.getElementsByTagName('a');
  for (var k=res_a.length-1; k>=0; k--) {
    if (res_a[k].getAttribute('accesskey') == 6) {
      var scrollDetector = res_a[k].parentNode;
      scrollDetector.setAttribute('id', 'bmt-scrolldetector');
      scrollDetector.innerHTML = '';
    }
  }

  // get last message
  var lastMessageLi = document.getElementsByTagName('li');
  if (lastMessageLi.length) {
    this.lastMessage = lastMessageLi[0].innerHTML;
    this.lastMessage = this.lastMessage.replace(/<small[^<]*<\/small>/, '');
  }

  // command panel
  var commandPanel = document.createElement('div');
  commandPanel.setAttribute('style', 'position: absolute; right: 0px; top: 0px;');
  document.getElementsByTagName('div')[0].appendChild(commandPanel);

  var checkUpdateDiv = document.createElement('div');
  checkUpdateDiv.setAttribute('id', 'bmt-checkupdate');
  checkUpdateDiv.setAttribute('style', 'float:left; margin:3px 5px 0px 0px;');
  var checkUpdateContainer = document.createElement('span');
  checkUpdateContainer.appendChild(checkUpdateDiv);
  commandPanel.appendChild(checkUpdateContainer);

  // clear twitpic session
  if (window.sessionStorage) {
    var clearTwitpic = document.createElement('input');
    clearTwitpic.type = 'button';
    clearTwitpic.value = 'Clear TwitPic cache';
    clearTwitpic.className = 'b';
    clearTwitpic.setAttribute('style', 'vertical-align:top; margin:3px 5px 0px 0px; font-size:10pt;');
    clearTwitpic.title = 'TwitPic image URL may change after a while, clear cache to reload the image thumbnail';
    clearTwitpic.addEventListener('click', function(e) {
      var found = false;
      for (var i=0;i<window.sessionStorage.length;i++) {
        var domkey = window.sessionStorage.key(i);
        var domvalue = window.sessionStorage.getItem(domkey);
        if (domvalue.value.match(/^twitpic\|/)) {
          sessionStorage.removeItem(domkey);
          found = true;
        }
      }
      if (found) {
        document.location.reload();
      }
    }, false);
    commandPanel.appendChild(clearTwitpic);
  }

  // on off button
  var onoff = document.createElement('img');
  onoff.src = bmt.onsrc;
  onoff.setAttribute('style', 'cursor:pointer;');
  onoff.addEventListener('click', function(e) {
    bmt.enabled = !bmt.enabled;
    e.target.src = bmt.enabled?bmt.onsrc:bmt.offsrc;
  }, false);
  commandPanel.appendChild(onoff);

  // an element to convert text to HTML, for comparing last message
  var htmlholder = document.createElement('span');
  htmlholder.setAttribute('id', 'bmt-htmlholder');
  htmlholder.style.display = 'none';
  document.body.appendChild(htmlholder);
*/
  // expand URL
  this.expandUrl(3);

  window.setInterval(function() {bmt.detectScroll(bmt);}, 500);
  window.setTimeout(function() {bmt.checkUpdate(bmt);}, 60000);
};

var bmt = new BetterMobileTwitter();
window.setInterval(function() {
  bmt.expandUrl(3);
}, 1000);

})();
