// ==UserScript==
// @name           Daily Show on Hulu
// @namespace      booga-booga
// @description    Bring the Daily Show back in your hulu queue. kinda.
// @include        http://www.hulu.com/profile/queue*
// @include        http://www.thedailyshow.com/full-episodes/*
// @include        http://www.colbertnation.com/full-episodes/*
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;


// in theory, it's as simple as added entries to the config.
// in practice: you're screwed. inconsistency is the only consistent thing here.
var config = [
  {
    feed: "http://www.thedailyshow.com/sitemap/episodes",
    yql: 'http://query.yahooapis.com/v1/public/yql?q=select%20url.loc%20from%20xml%20where%20url%3D\'http%3A%2F%2Fwww.thedailyshow.com%2Fsitemap%2Fepisodes\'%20and%20url.loc%20not%20like%20%22%25december-4-2010%25%22%20limit%2016&format=json&callback=',
    name: "The Daily Show"
  },
  {
    feed: "http://www.colbertnation.com/sitemap_episode.xml",
    yql: 'http://query.yahooapis.com/v1/public/yql?q=select%20url.loc%20from%20xml%20where%20url%3D\'http%3A%2F%2Fwww.colbertnation.com%2Fsitemap_episode.xml\'%20limit%2016&format=json&callback=',
    name: "The Colbert Report"
  },
  /*
  {
    feed: "http://www.southparkstudios.com/sitemap.php",
    name: "South Park"
  }
  */
];



// stuff for hulu pages

function hulu() {

    var ready = -1, idcount = 0;

    for (var site in config) {
      var cfg = config[site];
      cfg.data = [];
      load_yql_eps(cfg.yql, cfg.data, checkReady);
      ready --;
    }

    function load_yql_eps(url, array, done) {
        // make an id
        var id="gm_dsoh_cb_"+(idcount++), n = document.createElement("script");
        unsafeWindow.window[id] = function(data) {
            var set = data.query.results.urlset,i=0,l=set.length;
            for (;i<l;i++) {
                array.push(set[i].url.loc);
            }
            if (done) {
                done(array);
            }
        };
        n.src = url + "window." + id;
        document.getElementsByTagName("head")[0].appendChild(n);
    }

    if (document.readyState != "complete") {
        window.addEventListener('load', function(){
          checkReady();
        }, true);
    } else {
        checkReady();
    }

    window.addEventListener('click', function(e){
      switch(e.target.className) {
        case "gm_popout":
          e.preventDefault();
          var url = e.target.parentNode.href;
          open(url, "_blank", "width=1024,height=768"); // big, help viacom pick the high Q stuff
          return;
          break;
      }
      switch (e.target.title) {
        case "Remove":
          // go through our own checkboxes and blacklist the checked stuff..
          var cbs = document.getElementsByClassName("gm_cb"), didStuff= false;
          for (var i=0;i<cbs.length;i++) {
            if (cbs[i].checked) {
              blacklist.add(cbs[i].getAttribute("url"));
              didStuff = true;
            }
          }
          if (didStuff) {
            setTimeout(function(){location.reload()},700);
          }
      }
    }, true);

    function checkReady() {
      ready++;
      if (ready >= 0) {
        for (var site in config) {
          var cfg = config[site];
          insertShow(cfg.name, cfg.data);
        }
      }
    }

    function insertShow(name, array) {
      //console.log("insertShow",name,array);
      var q = document.getElementById("queue");
      
      if (!q) {
        // the hulu queue is currently empty, so we're missing a bunch of markup here.
        var t = document.getElementsByClassName("placeholder")[0].parentNode;
        t.innerHTML = "";
        var u = t.parentNode.parentNode;
        var structure = document.createElement("div");
        structure.className = "profile-layout fixed-lg relative container";
        structure.innerHTML = '<div style="visibility: visible; " class="update-order">Click the Save Order button to save this play order.</div><div class="queue-actions"><div class="queue-switch"><img alt="Display thumbnails" border="0" src="http://static.huluim.com/images/btn-queue-thumb-active.gif?1279702941" title="Display thumbnails"><a href="/profile/queue?kind=list"><img alt="Text only" border="0" class="" id="btn-queue-list.gif127991424532695" src="http://static.huluim.com/images/btn-queue-list.gif?1279702941" title="Text only"></a></div><a href="#" onclick="Profile.perform_queue_action(\'\', \'/profile/update_queue_order\', \'/profile/queue?kind=thumbs&amp;with_master=1\', null);; return false;"><img alt="Save order" border="0" class="" id="btn-saveorder.gif127991424532748" src="http://static.huluim.com/images/btn-saveorder.gif?1279702941" title="Save order"></a> <a href="#" onclick="Profile.perform_queue_action(\'Are you sure you want to remove {COUNTED_ITEMS}?\', \'/profile/remove_queue_items\', \'/profile/queue?kind=thumbs&amp;with_master=1\', null);; return false;"><img alt="Remove" border="0" class="" id="btn-remove.gif127991424532851" src="http://static.huluim.com/images/btn-remove.gif?1279702941" title="Remove"></a> <a href="#" onclick="Profile.perform_queue_action(\'Are you sure you want to remove all expired items?\', \'/profile/clear/queue?expired_only=1\', \'/profile/queue?kind=thumbs&amp;with_master=1\', null);; return false;"><img alt="Remove expired videos" border="0" class="" id="btn-removeexpiredvideos.gif127991424532955" src="http://static.huluim.com/images/btn-removeexpiredvideos.gif?1279702941" title="Remove expired videos"></a> <form onsubmit="return false;" style="margin: 0; vertical-align: baseline;"><span id="privacy-select"><a href="#" onclick="$(\'more_action_list\').toggle(); return false;"><img alt="More actions" border="0" class="" id="btn-more-actions.gif127991424533078" src="http://static.huluim.com/images/btn-more-actions.gif?1279702941" title="More actions"><input autocomplete="off" class="perform_queue_action" id="more_action" name="more_action" type="hidden" value=""></a><div id="more_action_list" class="cbx-options" style="display: none; "><ul><li><a href="#" onclick="$(\'more_action\').value = \'set_queue_items_private\'; this.up(\'.cbx-options\').hide(); Profile.perform_queue_action(\'\', \'/profile/__action__\', \'/profile/queue?kind=thumbs&amp;with_master=1\', event);; return false;">Make Selected Private</a></li><li><a href="#" onclick="$(\'more_action\').value = \'set_queue_items_public\'; this.up(\'.cbx-options\').hide(); Profile.perform_queue_action(\'\', \'/profile/__action__\', \'/profile/queue?kind=thumbs&amp;with_master=1\', event);; return false;">Make Selected Public</a></li></ul></div></span></form><img alt="Loading-animated-circle" class="working" src="http://static.huluim.com/images/loading-animated-circle.gif?1279702941" style="display:none; margin: 1px 0px 0px 6px;"></div><div id="queue" class="section"><form id="queue_options"><table class="vt" id="sortable-queue"><tbody><tr class="rh"><td class=" rh-c0"><input type="checkbox" onclick="Profile.toggleAllCheckboxes($(\'queue_options\'), $(this).checked);"></td><td class="active rh-c1"><div><a href="/profile/queue?kind=thumbs&amp;order=desc&amp;sort=position">Play Order</a> <img alt="Sort-arrow-top" border="0" class="order" height="5" src="http://static.huluim.com/images/sort-arrow-top.gif?1279702941" width="8"></div></td><td class=" rh-c2"><a href="/profile/queue?kind=thumbs&amp;order=asc&amp;sort=video.title">Title and Information</a></td><td class=" rh-c3"><a href="/profile/queue?kind=thumbs&amp;order=desc&amp;sort=type">Type</a></td><td class=" rh-c4"><a href="/profile/queue?kind=thumbs&amp;order=desc&amp;sort=video.rating">Rating</a></td><td class=" rh-c5"><a href="/profile/queue?kind=thumbs&amp;order=desc&amp;sort=video.original_premiere_date">Airdate</a></td><td class=" rh-c6"><a href="/profile/queue?kind=thumbs&amp;order=asc&amp;sort=video.expires_at">Expires</a></td><td class=" rh-c8">Popout</td></tr></tbody></table></form></div><div class="queue-actions"><a href="#" onclick="Profile.perform_queue_action(\'\', \'/profile/update_queue_order\', \'/profile/queue?kind=thumbs&amp;with_master=1\', null);; return false;"><img alt="Save order" border="0" class="" id="btn-saveorder.gif127991424534461" src="http://static.huluim.com/images/btn-saveorder.gif?1279702941" title="Save order"></a> <a href="#" onclick="Profile.perform_queue_action(\'Are you sure you want to remove {COUNTED_ITEMS}?\', \'/profile/remove_queue_items\', \'/profile/queue?kind=thumbs&amp;with_master=1\', null);; return false;"><img alt="Remove" border="0" class="" id="btn-remove.gif127991424534567" src="http://static.huluim.com/images/btn-remove.gif?1279702941" title="Remove"></a> <a href="#" onclick="Profile.perform_queue_action(\'Are you sure you want to remove all expired items?\', \'/profile/clear/queue?expired_only=1\', \'/profile/queue?kind=thumbs&amp;with_master=1\', null);; return false;"><img alt="Remove expired videos" border="0" class="" id="btn-removeexpiredvideos.gif127991424534668" src="http://static.huluim.com/images/btn-removeexpiredvideos.gif?1279702941" title="Remove expired videos" style="cursor: pointer; "></a><img alt="Loading-animated-circle" class="working" src="http://static.huluim.com/images/loading-animated-circle.gif?1279702941" style="display:none; margin: 1px 0px 0px 6px;"></div><br style="clear:both;"><br style="clear:both;">';
        u.appendChild(structure);
        q = document.getElementById("queue");
        // alright, done "restoring" markup. proceed as if nothing.
      }
      
      
      var p = document.createElement("div"), html = "<h2>"+name+"</h2>"+
      "<table class=vt style=\cursor:pointer'>";
      var hasOne = false;
      for (var i=0;i<array.length;i++) {
        var url = array[i], t = url.split('/')[4].split("-").join(" ");
        if (blacklist.has(url)) {
          continue;
        }
        html += "<tr class=r><td class=c0><input class=gm_cb type=checkbox url='"+url+"'></td>"+
          "<td class=c1>&nbsp;</td><td class=c2><div class=queue-thumb-container></div><div>"+
            "<a class=show-title-gray href='"+url+"'><b>"+name+"</b>: "+t+"</a></div></td>"+
          "<td class=c3>Full Episode</td><td class=c4>-</td><td class=c5>-</td>"+
          "<td class=c6>&nbsp;</td><td class=c7>Unknown</td><td class=c8>"+
          "<a href='"+url+"#fs=1'><img class=gm_popout src='http://static.huluim.com/images/icon-popout.gif'></a></td></tr>";

        hasOne = true;
      }
      html += "</table>";
      if (hasOne) {
        p.innerHTML = html;
        q.appendChild(p);
      }
    }

}

// stuff for viacom pages

function viacom() {

  function fullscreen_me() {
      var vp = document.getElementById("video_player")||document.getElementById("mtvnPlayer");
      if (!vp) {
        return setTimeout(fullscreen_me, 100);
      }
      vp.parentNode.removeChild(vp);
      vp.style.position = "absolute";
      vp.style.top = vp.style.left = vp.style.bottom = vp.style.right = 0;
      vp.width = vp.height = "100%";
      document.body.innerHTML = "";
      document.body.appendChild(vp);
  }  

  // implement a curiously missing fullscreen popout feature
  if (location.hash=="#fs=1") {
    fullscreen_me();
  } else {
    var sm = document.getElementsByClassName("subMeta")[0];
    sm.innerHTML = '<button onclick="open(location.href.split(\'#\')[0]+\'#fs=1\',\'_blank\',\'width=400,height=300\');document.getElementById(\'full-ep-player-box\').innerHTML=\'\'" '+
                   'style="float:right;margin-top:0.25em;margin-right:10em">Pop Video Out</button>' + sm.innerHTML;
    location.hash="";
  }
  // regardless, count 5 minutes and remove the video from the queue
  setTimeout(function() {
    blacklist.add(location.href.split("#")[0]);
  }, 1000*60*5);
}

// common code

function Blacklist() {
  var blacklist = {};
  try {
    blacklist = JSON.parse( GM_getValue("blacklist") || "{}" );
  } catch(e){
    alert("can't GM_getValue of blacklist.");
  }
  
  this.add = function(url) {
    blacklist[url] = 1;
    this.save();
  }
  this.save = function() {
    try {
        GM_setValue("blacklist", JSON.stringify(blacklist));
    } catch(e) {
        alert("can't GM_setValue of blacklist");
    }
    
  }
  this.has = function(url) {
    return !!blacklist[url];
  }
}

// initialization

var blacklist = new Blacklist();

switch(location.hostname) {
  case "www.hulu.com": 
    hulu(); 
    break;
  case "www.thedailyshow.com": 
  case "www.colbertnation.com":
  default:
    viacom(); 
    break;
}
