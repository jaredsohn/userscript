// ==UserScript==
//
// @name         Last.fm Enhanced Song Page
// @description  Injects external song information to the last.fm track page
// @namespace    lastfmenhancedsongpage
//
// @include      http://www.last.fm/music/*/*/*
// @include      http://www.lastfm.*/music/*/*/*
//
// @exclude      /^http:\/\/www\.last\.?fm\.?\w*\/music\/.*\/\+(wiki|images|videos|news)\//
//
// @require      http://library.lastfm-enhanced-song-page.googlecode.com/hg/base.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
//
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceURL
//
// @resource     progress http://cdn.last.fm/tageditor/progress_active.gif
//
// @author       saaj <mail@saaj.me>
// @website      http://code.google.com/p/lastfm-enhanced-song-page/
// @license      GPL
// @version      0.7.2
//
// ==/UserScript==


/**
 * Formats self in modern Python manner
 */
String.prototype.format = function()
{
  var value = this;
  for(var i = 0; i < arguments.length; i++)
  {
    value = value.split('{' + i + '}').join(String(arguments[i]));
  }

  return value;
};
/**
 * Computes a Levenshtein distance of self and passed argument,
 * based on qx.util.EditDistance
 */
String.prototype.distance = function(value)
{
  var a = this;
  var b = value;
  
  // distance is table with a.length + 1 rows and b.length + 1 columns
  var distance = [];
  // posA and posB are used to iterate over a and b
  var posA, posB, cost;

  for(posA = 0; posA <= a.length; posA++)
  {
    distance[posA]    = [];
    distance[posA][0] = posA;
  }

  for(posB = 1; posB <= b.length; posB++) 
  {
    distance[0][posB] = posB;
  }

  for(posA = 1; posA <= a.length; posA++)
  {
    for(posB = 1; posB <= b.length; posB++)
    {
      cost = a[posA - 1] === b[posB - 1] ? 0 : 1;

      distance[posA][posB] = Math.min(
        distance[posA - 1][posB    ] + 1,     // deletion
        distance[posA    ][posB - 1] + 1,     // insertion
        distance[posA - 1][posB - 1] + cost   // substitution
      );
    }
  }

  return distance[posA - 1][posB - 1];
};

function namespace(ns)
{
  var root = window;
  ns.split(".").forEach(function(part)
  {
    if(typeof root[part] == "undefined")
    {
      root[part] = {};
    }

    root = root[part];
  });
  return root;
}


namespace("lesp");

/**
 * Event target. Sort of conceptual mix of qx.core.Object and SplObserver/SplSubject.
 */
lesp.Target = Base.extend({

  _listeners : null,


  constructor : function(supportedEvents)
  {
    this._listeners = {};
    supportedEvents.forEach(function(name)
    {
      this._listeners[name] = [];
    }, this);
  },

  attach : function(event, listener)
  {
    this._listeners[event].push(listener);
  },

  detach : function(event, listener)
  {
    var i = this._listeners[event].indexOf(listener);
    if(i != -1)
    {
      this._listeners[event].splice(i, 1);
    }
  },

  notify : function(event, data)
  {
    this._listeners[event].forEach(function(listener)
    {
      listener(this, data);
    }, this);
  }

});

lesp.mangleHtml = function(value)
{
  // the trick allows jquery traverse html correctly
  return value.replace(/<(\/?)(html|head|body|img)/ig, '<$1$2z');
};


namespace("lesp.abstract");

/**
 * Abstract song.
 */
lesp.abstract.Song = lesp.Target.extend({

  _baseUrl  : null,
  _document : null,
  _pageUrl  : null,
  _exact    : null,
  _name     : null,


  constructor : function(match)
  {
    this.base(["loaded", "notLoaded"]);

    this._pageUrl = match.href;
    if(this._pageUrl.indexOf(this._baseUrl) != 0)
    {
      this._pageUrl = this._baseUrl + this._pageUrl;
    }
    
    this._exact   = match.dist == 0;
    this._name    = match.name;

    GM_xmlhttpRequest({
      method  : "get",
      url     : this._pageUrl,
      onload  : this._onLoad.bind(this),
      onerror : this.notify.bind(this, "notLoaded")
    });
  },
  
  isExact : function()
  {
    return this._exact;
  },
  
  getName : function()
  {
    return this._name;
  },

  _onLoad : function(response)
  {
    this._document = jQuery(lesp.mangleHtml(response.responseText));
    this.notify("loaded");
  },

  getPageUrl : function()
  {
    return this._pageUrl;
  }

});

/**
 * Base manager.
 */
lesp.abstract.Manager = lesp.Target.extend({

  _track             : null,
  _searchUrlTemplate : null,
  _songUrlQuery      : null,


  constructor : function(artist, track)
  {
    this.base(["found", "failed", "loaded"]);

    this._track = track;

    GM_xmlhttpRequest({
      method  : "get",
      url     : this._searchUrlTemplate.format(encodeURIComponent(artist)),
      onload  : this._onLoad.bind(this),
      onerror : this.notify.bind(this, "failed")
    });
  },

  _onLoad : function(response)
  {
    // be overriden
  },

  getSongUrlQuery : function()
  {
    return this._songUrlQuery;
  }

});

/**
 * Abstract song renderer.
 */
lesp.abstract.Renderer = lesp.Target.extend({

  _manager : null,
  _song    : null,
  _title   : null,


  constructor : function(manager)
  {
    this.base(["completed", "failed"]);

    manager.attach("loaded", (function(target, song)
    {
      this._song = song;
      this.notify("completed");
    }).bind(this));
    manager.attach("failed", this.notify.bind(this, "failed"));
  },

  getTitle : function()
  {
    return this._title; 
  },

  _createMatchNotice : function()
  {
    if(this._song.isExact())
    {
      return "";  
    }
    
    return [
      "<p style='color:#bbb;font-size:10pt;text-align:center;'>",
      "No exact match is found. Best match is {0}.".format(this._song.getName()),
      "</p>"
    ].join("");
  },
  
  render : function()
  {
    // be overriden
  }

});


namespace("lesp.songfacts");

/**
 * Songfacts' song page. Retrives facts and comments.
 */
lesp.songfacts.Song = lesp.abstract.Song.extend({

  _baseUrl  : "http://www.songfacts.com",


  getFacts : function()
  {
    if(!this._document)
    {
      throw new Error("Song document is not yet ready");
    }

    return this._document.find("#body_text > .chamfer1, #body_text > .chamfer2").map(function()
    {
      return jQuery(this).text();
    }).get(); 
  },

  getComments : function()
  {
    if(!this._document)
    {
      throw new Error("Song document is not yet ready");
    }

    return this._document.find(".comments_holder > .chamfer1, .comments_holder > .chamfer2").map(function()
    {
      return jQuery(this).find(".boxcontent").html();
    }).get();
  }

});

/**
 * Songfacts' manager. Searches for a song of given artist.
 */
lesp.songfacts.Manager = lesp.abstract.Manager.extend({

  _searchUrlTemplate : "http://www.songfacts.com/search-artist-1.php?{0}",


  _onLoad : function(response)
  {
    var contents = jQuery(lesp.mangleHtml(response.responseText));

    if(response.finalUrl.indexOf(this._searchUrlTemplate.format("")) == 0)
    {
      this.notify("failed");
    }
    else
    {
      var track      = this._track.toLowerCase();
      var candidates = contents.find("#body_text .browse_result_holder .srlist_s a")
        .map(function()
        {
          var item     = jQuery(this);
          var distance = item.text().toLowerCase().distance(track);
          
          // jQuery filters nulls and concats returned arrays
          return distance < 8 ? {dist : distance, href : item.attr("href"), name : item.text()} : null;  
        })
        .get()
        .sort(function(a, b)
        {
          return a.dist - b.dist;
        });
      
      if(candidates.length)
      {
        this._songUrlQuery = candidates[0].href;

        var song = new lesp.songfacts.Song(candidates[0]);
        song.attach("loaded",    this.notify.bind(this, "loaded", song));
        song.attach("notLoaded", this.notify.bind(this, "failed"));

        this.notify("found");
      }
      else
      {
        this.notify("failed");
      }
    }
  }

});

/**
 * Songfacts' song renderer. Creates ready DOM node of facts and comment.
 */
lesp.songfacts.Renderer = lesp.abstract.Renderer.extend({

  _title : "SongFacts",


  _createFacts : function()
  {
    var facts = this._song.getFacts().map(function(fact)
    {
      return "<li>{0}</li>".format(fact);
    }).join("");
    
    return facts 
      ? [
        "<h4>Facts</h4>",
        "<ul class='journalsSmall' style='font-size:12px;'>",
        facts,
        "</ul>"
      ].join("")
      : "";
  },

  _createMenu : function()
  {
    var comments = this._song.getComments().length;
    var pageUrl  = this._song.getPageUrl();
    var result   = jQuery("<div style='text-align: right; padding: 5px 10px 10px 0; font-size: 11px;'/>")
      .append(comments ? "<a href='#songfacts-commnets' class='info show-comments'>Show comments</a>" : "")
      .append(comments ? "<span style='padding-left: 10px;'/>" : "")
      .append("<a href='{0}' class='info' target='_blank'>SongFacts page</a>".format(pageUrl));

    result.find("a.show-comments").click(function()
    {
      var anchor = jQuery(this);

      anchor.parent()
        .next().toggle()
        .next().toggle();

      anchor.text(anchor.data("shown") ? "Show comments" : "Hide comments");
      anchor.data("shown", !anchor.data("shown"));
    });

    return result;
  },

  _createComments : function()
  {
    var comments = this._song.getComments().map(function(comment)
    {
      comment = jQuery("<div>{0}</div>".format(comment))
        .find("div:eq(1)").css("color", "#696969").parent()
        .html();
        
      return "<li>{0}</li>".format(comment);
    }).join("");
    
    return comments 
      ? [
        "<h4 id='songfacts-commnets' style='display:none;'>Comments</h4>",
        "<ul class='journalsSmall' style='display:none; overflow:auto; height:450px; font-size:12px;'>",
        comments,
        "</ul>"
      ].join("") 
      : "";
  },

  render : function()
  {
    return jQuery("<div/>")
      .append(this._createMatchNotice())
      .append(this._createFacts())
      .append(this._createMenu())
      .append(this._createComments());
  }

});


namespace("lesp.songmeanings");

/**
 * SongMeanings' manager. Searches for a song of given artist.
 */
lesp.songmeanings.Manager = lesp.abstract.Manager.extend({

  _searchUrlTemplate : "http://songmeanings.com/query/?q={0}&type=artists",
  _baseUrl           : "http://songmeanings.com",


  _onLoad : function(response)
  {
    if(response.finalUrl.indexOf(this._baseUrl + "/artist") == 0)
    {
      // exact match redirect
      this._onArtistSongsLoad(response);
    }
    else if(response.finalUrl.indexOf("https://www.google") == 0)
    {
      // google search fallback
      var contents = jQuery(lesp.mangleHtml(response.responseText));
      var search   = "{0}/artist".format(this._baseUrl.replace("http://", ""));
      var links    = contents.find("cite").get().filter((function(element)
      {
        return jQuery(element).text().indexOf(search) == 0;
      }).bind(this));
      
      if(links.length)
      {
        GM_xmlhttpRequest({
          method  : "get",
          url     : "http://" + jQuery(links[0]).text(),
          onload  : this._onArtistSongsLoad.bind(this),
          onerror : this.notify.bind(this, "failed")
        });
      }
      else
      {
        this.notify("failed");
      }
    }
    else
    {
      var contents = jQuery(lesp.mangleHtml(response.responseText));
      var artist   = contents.find("#content-big tr.item td a:eq(0)");

      if(artist.length)
      {
        var url = artist.attr("href");
        if(url.indexOf(this._baseUrl) != 0)
        {
          url = this._baseUrl + url;
        }
        
        GM_xmlhttpRequest({
          method  : "get",
          url     : url,
          onload  : this._onArtistSongsLoad.bind(this),
          onerror : this.notify.bind(this, "failed")
        });
      }
      else
      {
        this.notify("failed");
      }
    }
  },

  _onArtistSongsLoad : function(response)
  {
    var contents = jQuery(lesp.mangleHtml(response.responseText));

    var track      = this._track.toLowerCase();
    var candidates = contents.find("#songslist td:not(.comments) a")
      .map(function()
      {
        var item     = jQuery(this);
        var distance = item.text().toLowerCase().distance(track);
        
        // jQuery filters nulls and concats returned arrays
        return distance < 8 ? {dist : distance, href : item.attr("href"), name : item.text()} : null;  
      })
      .get()
      .sort(function(a, b)
      {
        return a.dist - b.dist;
      });
    
    if(candidates.length)
    {
      this._songUrlQuery = candidates[0].href;

      var song = new lesp.songmeanings.Song(candidates[0]);
      song.attach("loaded",    this.notify.bind(this, "loaded", song));
      song.attach("notLoaded", this.notify.bind(this, "failed"));

      this.notify("found");
    }
    else
    {
      this.notify("failed");
    }
  }

});

/**
 * SongMeanings' song page. Retrives lyrics.
 */
lesp.songmeanings.Song = lesp.abstract.Song.extend({

  _baseUrl         : "http://songmeanings.com",
  _commentCache    : null,
  _commentDocument : null, 


  getLyrics : function()
  {
    if(!this._document)
    {
      throw new Error("Song document is not yet ready");
    }

    var result = this._document.find("div#textblock");
    var text   = result.text().replace(/�/g, "'"); 

    return text;
  },
  
  _onLoad : function(response)
  {
    // the trick allows jquery treat html correctly
    this._document = jQuery(lesp.mangleHtml(response.responseText));
    
    GM_xmlhttpRequest({
      method  : "post",
      url     : this._pageUrl,
      data    : "command=loadComments",
      headers : {
        "X-Requested-With" : "XMLHttpRequest",
        "Content-Type"     : "application/x-www-form-urlencoded"
      },
      onload  : (function(response)
      {
        this._commentDocument = jQuery("<div>{0}</div>".format(response.responseText));
        this.notify("loaded");
      }).bind(this),
      onerror : this.notify.bind(this, "notLoaded")
    });
  },
  
  getCommentCount : function()
  {
    var match = /\d+/.exec(this._document.find("#header-comments-counter").text());
    
    return match ? Number(match[0]) : 0; 
  },
  
  getFirstComments : function()
  {
    if(!this._commentDocument)
    {
      throw new Error("Comment document is not yet ready");
    }
    
    if(this._commentCache)
    {
      return this._commentCache; 
    }
    
    return this._commentCache = this._commentDocument.find("li div.text").map(function()
    {
      var comment = jQuery(this);
      
      var user = comment.find(".sign a.author:eq(0)").text();
      var date = comment.find(".sign em.date:eq(0)").text();
      var text = comment.contents().map(function()
      {
        if(this.nodeName == "#text")
        {
          return jQuery.trim(this.wholeText);
        }
        else if(this.nodeName == "BR")
        {
          return "<br/>";
        }
      }).get().join("");
      
      return {
        user : user,
        date : date,
        text : text
      };
    }).get();
  }

});

/**
 * SongMeanings' song renderer. Creates ready DOM node for lyrics.
 */
lesp.songmeanings.Renderer = lesp.abstract.Renderer.extend({

  _title : "SongMeanings",


  _createLyrics : function()
  {
    return jQuery("<div/>")
      .append("<h4>Lyrics</h4>")
      .append(
        jQuery("<div style='padding-left: 25px;'/>").html(this._song.getLyrics()
          .replace(/^[\s]+/g, "<br/>")
          .replace(/[\s]+$/g, "<br/>")
          .replace(/\n/g, "<br/>")
        )
      )
      .html(); // doesn't include outer div
  },

  _createMenu : function()
  {
    var result = jQuery("<div style='text-align: right; padding: 5px 10px 10px 0; font-size: 11px;'/>");
    
    var commentsTotal  = this._song.getCommentCount();
    var commentPostfix = ""; 
    if(commentsTotal)
    {
      var commentsLoaded = this._song.getFirstComments().length;
      if(commentsTotal > commentsLoaded)
      {
        commentPostfix = " ({0}/{1})".format(commentsLoaded, commentsTotal);
      }
    
      result.append(
        "<a href='#songmeanings-commnets' class='info show-comments'>Show comments{0}</a>"
          .format(commentPostfix)
      );
      result.append("<span style='padding-left: 10px;'/>");
    }
    
    result.append(
      "<a href='{0}' class='info' target='_blank'>SongMeanings page</a>".format(this._song.getPageUrl())
    );

    result.find("a.show-comments").click(function()
    {
      var anchor = jQuery(this);

      anchor.parent()
        .next().toggle()
        .next().toggle();

      anchor.text((anchor.data("shown") ? "Show comments" : "Hide comments") + commentPostfix);
      anchor.data("shown", !anchor.data("shown"));
    });

    return result;
  },

  _createComments : function()
  {
    var comments = this._song.getFirstComments().map(function(comment)
    {
      var template = "<li><div>{0}</div><span style='color: #696969'>- {1} {2}</span></li>"; 
      return template.format(comment.text, comment.user, comment.date);
    }).join("");
    
    return comments 
      ? [
        "<h4 id='songmeanings-commnets' style='display:none;'>Comments</h4>",
        "<ul class='journalsSmall' style='display:none; overflow:auto; height:450px; font-size:12px;'>",
        comments,
        "</ul>"
      ].join("")
      : "";
  },
  
  render : function()
  {
    return jQuery("<div/>")
      .append(this._createMatchNotice())
      .append(this._createLyrics())
      .append(this._createMenu())
      .append(this._createComments());
  }

});


namespace("lesp.application");

/**
 * Main interface renderer.
 */
lesp.application.Renderer = Base.extend({

  constructor : function()
  {
    if(!jQuery(".track-detail .wiki").length)
    {
      jQuery(".track-detail")
        .append("<h2 class='heading'><span class='h2Wrapper'>About This Track</span></h2>")
        .append("<div class='wiki'></div>");
    }
  },

  add : function(renderer)
  {
    var progress = document.createElement('img');
    progress.id  = new Date().valueOf();
    progress.src = GM_getResourceURL("progress");

    var container = jQuery("<div style='margin-top: 15px;'/>")
      .append("<h3 style='color: #D51007;'>{0}</h3>".format(renderer.getTitle()))
      .append(progress)
      .appendTo(".track-detail .wiki");

    renderer.attach("completed", function()
    {
      container.find("#" + progress.id).remove();
      container.append(renderer.render());
    });
    renderer.attach("failed", function()
    {
      container.find("#" + progress.id).remove();
      container.append("Not found");
    });
  }

});

/**
 * Main manager.
 */
lesp.application.Application = Base.extend({

  _artist   : null,
  _track    : null,
  _renderer : null,


  constructor : function()
  {
    if(!unsafeWindow.LFM || !unsafeWindow.LFM.get("ParentResource"))
    {
      throw new Error("Invalid last.fm page");
    }

    var resource = unsafeWindow.LFM.get("ParentResource");
    if(resource.type != 9)
    {
      throw new Error("This isn't a track page");
    }
    
    this._artist = resource.artistname;
    this._track  = resource.name;

    this._renderer = new lesp.application.Renderer();
  },

  main : function()
  {
    var renderers = [
      new lesp.songfacts.Renderer(new lesp.songfacts.Manager(this._artist, this._track)),
      new lesp.songmeanings.Renderer(new lesp.songmeanings.Manager(this._artist, this._track))
    ];
    renderers.forEach(this._renderer.add, this);
    
    // purpose:
    //   * debug exclude regex
    //   * look at usage 
    unsafeWindow._gat && unsafeWindow._gat._getTracker("UA-29858354-3")._trackPageview();
  }

});


new lesp.application.Application().main();
