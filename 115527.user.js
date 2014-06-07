// ==UserScript==
// @name          social-bookmark-counter-on-google-search
// @namespace     https://github.com/ikeikeikeike
// @include       http://www.google.*/search*
// @include       http://www.google.*/custom*
// @include       https://www.google.*/search*
// @include       https://www.google.*/custom*
// @require       http://code.jquery.com/jquery-2.0.3.min.js
// @require       https://raw.github.com/ikeikeikeike/bookmarkhub/master/bookmarkhub.js
// @grant         GM_addStyle
// @grant         GM_xmlhttpRequest
// @description   Script Summary: Supporting Delicious, Facebook, Twitter, Hatena, Digg and StumbleUpon.
// @author        Tatsuo Ikeda <jp.ne.co.jp at gmail> http://about.me/ikeikeikeike
// @homepage      https://userscripts.org/scripts/show/115527
// @updateURL     https://userscripts.org/scripts/source/115527.meta.js
// @downloadURL   https://userscripts.org/scripts/source/115527.user.js
// @supportURL    https://github.com/ikeikeikeike/social-bookmark-counter-on-google-search/issues
// @version       0.9.1
// @license       Creative Commons
// ==/UserScript==
/*
@include       http://search.yahoo.co.jp/search?*
@include       https://search.yahoo.co.jp/search?*
@include       http://www.bing.com/search*
@include       https://www.bing.com/search*
@include       http://userscripts.org/scripts/search?*
@include       https://userscripts.org/scripts/search?*
*/
(function(){

/**
 * CSS
 */
GM_addStyle([
".__GMsavers a\
  {\
    background: #3274D0 none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMsavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMtwisavers a\
  {\
    background: rgba(51,204,255,0.9) none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMtwisavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMdiggsavers a\
  {\
    background: rgba(31,100,105,0.9) none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMdiggsavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMstumbleuponsavers a\
  {\
    background: rgba(255, 112, 0, 0.9) none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMstumbleuponsavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMredditsavers a\
  {\
    background-color: #4FA7FF;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMredditsavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMhatebusavers a\
  {\
    background: rgba(255,99,71,0.9) none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMhatebusavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMfacebooksavers a\
  {\
    background: rgba(0,0,128,0.9) none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    font-size: 12px;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }",
".__GMfacebooksavers a:hover\
  {\
    background: #7CBA0F none repeat scroll 0 0;\
    color: #FFFFFF;\
    font-weight: bold;\
    padding: 1px 5px;\
    margin-left: 5px;\
    text-decoration: none;\
  }"
].join(''));
// GM_addStyle(<><![CDATA[
// .__GMsavers a
// {
// background: #3274D0 none repeat scroll 0 0;
// color: #FFFFFF;
// font-weight: bold;
// padding: 1px 5px;
// margin-left: 5px;
// text-decoration: none;
// }
// .__GMsavers a:hover
// {
// background: #7CBA0F none repeat scroll 0 0;
// color: #FFFFFF;
// font-weight: bold;
// padding: 1px 5px;
// margin-left: 5px;
// text-decoration: none;
// }
// .__GMtwisavers a
// {
// background: rgba(51,204,255,0.9) none repeat scroll 0 0;
// color: #FFFFFF;
// font-weight: bold;
// padding: 1px 5px;
// margin-left: 5px;
// text-decoration: none;
// }
// .__GMtwisavers a:hover
// {
// background: #7CBA0F none repeat scroll 0 0;
// color: #FFFFFF;
// font-weight: bold;
// padding: 1px 5px;
// margin-left: 5px;
// text-decoration: none;
// }
// ]]></>);

var USER_AGENT = "Mozilla/5.0 (compatible; Social bookmark Counter/0.9.1; +https://github.com/ikeikeikeike/social-bookmark-counter-on-google-search)"

// Monkey patch
Bookmarkhub['requester'] = function(options, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: options.url,
    headers: {
      "User-Agent": USER_AGENT,
      "Accept": "text/xml"
    },
    onload: function(data) {
      try {
        callback($.parseJSON(data.responseText));
      } catch(e) {
        var receiveCount = function(o) {return o;},
            IN = {Tags: {Share: {handleCount: function(o) {return o;}}}};
        callback(eval(data.responseText));
      }
    }
  });
};


/**
 * Api requester.
 */
function requestApi(url, func) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    headers: {
      "User-Agent": USER_AGENT,
      "Accept": "text/xml"
    },
    onload: func
  });
}


/**
 * Render Html
 */
function renderHtml(link, total, url, className) {
  var span = document.createElement('span'),
      a = document.createElement('a');

  a.setAttribute('style', 'color: #FFF;');
  a.href = url;
  a.textContent = total;

  span.className = className;
  span.appendChild(a);

  try {
    // normal
    var s = link.parentNode.parentNode.getElementsByClassName('s')[0];
    var ss = link.parentNode.parentNode.parentNode.getElementsByClassName('s')[0];
    if (s) {
      var tonode = s.childNodes[0];
      tonode.parentNode.insertBefore(span, tonode.parentNode.firstChild);
    }
    else if (ss) {
      var tonode = ss.childNodes[0];
      tonode.parentNode.insertBefore(span, tonode.parentNode.firstChild);
    }
    else {
      link.parentNode.insertBefore(span, link.nextSibling);
    }
  } catch(e) {
    // console.log(e);
  }
}


/**
 * Delicious
 */
function deliCountView(link) {
  var bookmarker = new Bookmarkhub.Bookmarker(link.href);

  bookmarker.delicious()
    .done(function(data) {
      if (Number(data.count) > 0) {
        renderHtml(link, data.count, data.link, "__GMsavers");
      }
    })
    .fail(function(data) {
      // console.log(data);
    });
}


/**
 * 1. Tweetmeme is over. Thanks!!
 * #. Change Topsy API.
 * #. Change to native twitter API.  # Note: Exists, count bug.
 */
function twitterCountView(link) {
  var bookmarker = new Bookmarkhub.Bookmarker(link.href);

  bookmarker.twitter()
    .done(function(data) {
      if (Number(data.count) > 0) {
        renderHtml(link, data.count, data.link, "__GMtwisavers");
      }
    })
    .fail(function(data) {
      // console.log(data);
    });
}


/**
 * digg
 */
function diggCountView(link) {
  var url = "http://services.digg.com/1.0/endpoint?method=story.getAll&link=" + link.href + '&type=javascript&callback=crossdomain_res';

  requestApi(url, function(res) {
    var json,
        total;

    try {
      json = eval(res.responseText.replace('crossdomain_res', ''));
      total = json.stories[0].diggs;
      if (!json || !total) {
        return;
      }
    } catch (e) {
      // console.log(e);
      return;
    }

    renderHtml(link, total, json.stories[0].href, "__GMdiggsavers");
  });
}


/**
 * hatena bookmark
 */
function hatebuCountView(link) {
  var bookmarker = new Bookmarkhub.Bookmarker(link.href);

  bookmarker.hatena()
    .done(function(data) {
      if (Number(data.count) > 0) {
        renderHtml(link, data.count, data.link, "__GMhatebusavers");
      }
    })
    .fail(function(data) {
      // console.log(data);
    });
}


/**
 * facebook like button
 */
function facebookCountView(link) {
  var bookmarker = new Bookmarkhub.Bookmarker(link.href);

  bookmarker.facebook()
    .done(function(data) {
      if (Number(data.count) > 0) {
        renderHtml(link, data.count, 'https://developers.facebook.com/docs/reference/plugins/like/', "__GMfacebooksavers");
      }
    })
    .fail(function(data) {
      // console.log(data);
    });
}


/**
 * StumbleUpon
 */
function stumbleuponCountView(link) {
  var bookmarker = new Bookmarkhub.Bookmarker(link.href);

  bookmarker.stumbleupon()
    .done(function(data) {
      if (Number(data.count) > 0) {
        renderHtml(link, data.count, data.link, "__GMstumbleuponsavers");
      }
    })
    .fail(function(data) {
      // console.log(data);
    });
}

/**
 * reddit
 */
function redditCountView(link) {
  var bookmarker = new Bookmarkhub.Bookmarker(link.href);

  bookmarker.reddit()
    .done(function(data) {
      if (Number(data.count) > 0) {
        renderHtml(link, data.count, data.link, "__GMredditsavers");
      }
    })
    .fail(function(data) {
      // console.log(data);
    });
}

/**
 * http://nanoappli.com/blog/archives/768
 */
function asyncProcArray(params, onProcess, onFinish) {
  var paramList = params.concat();

  (function() {
    var slipNo = paramList.shift();

    onProcess( slipNo );
    if ( paramList.length <= 0 ) {
      onFinish();
      return;
    }

    setTimeout( arguments.callee, 100);
  })();
}


/**
 * http://nanoappli.com/blog/archives/768
 */
function runAcyncArray(params, onProcess, onFinish) {
  var paramList = params.concat();

  (function() {
    var startTime = new Date();

    while ( 1 ) {
      var curParam = paramList.shift();

      onProcess( curParam );

      if ( paramList.length <= 0 ) {
        onFinish( params );
        return;
      }

      if ( (new Date()) - startTime > 100 ) {
        break;
      }
    }
    setTimeout( arguments.callee, 40 );
  })();
}



// https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
 that detects and handles AJAXed content.

 Usage example:

 waitForKeyElements (
   "div.comments"
   , commentCallbackFunction
 );

 //--- Page-specific function to do what we want when the node is found.
 function commentCallbackFunction (jNode) {
   jNode.text ("This comment changed by waitForKeyElements().");
 }

 IMPORTANT: This function requires your script to have loaded jQuery.
 */
function waitForKeyElements (
  selectorTxt,    /* Required: The jQuery selector string that
   specifies the desired element(s).
   */
  actionFunction, /* Required: The code to run when elements are
   found. It is passed a jNode to the matched
   element.
   */
  bWaitOnce,      /* Optional: If false, will continue to scan for
   new elements even after the first match is
   found.
   */
  iframeSelector  /* Optional: If set, identifies the iframe to
   search.
   */
) {
  var targetNodes, btargetsFound;

  if (typeof iframeSelector == "undefined")
    targetNodes     = $(selectorTxt);
  else
    targetNodes     = $(iframeSelector).contents ()
  .find (selectorTxt);

  if (targetNodes  &&  targetNodes.length > 0) {
    btargetsFound   = true;
    /*--- Found target node(s).  Go through each and act if they
     are new.
     */
    targetNodes.each ( function () {
      var jThis        = $(this);
      var alreadyFound = jThis.data ('alreadyFound')  ||  false;

      if (!alreadyFound) {
        //--- Call the payload function.
        var cancelFound     = actionFunction (jThis);
        if (cancelFound)
          btargetsFound   = false;
        else
          jThis.data ('alreadyFound', true);
      }
    } );
  }
  else {
    btargetsFound   = false;
  }

  //--- Get the timer-control variable for this selector.
  var controlObj      = waitForKeyElements.controlObj  ||  {};
  var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
  var timeControl     = controlObj [controlKey];

  //--- Now set or clear the timer as appropriate.
  if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
    //--- The only condition where we need to clear the timer.
    clearInterval (timeControl);
    delete controlObj [controlKey]
  }
  else {
    //--- Set a timer, if needed.
    if ( ! timeControl) {
      timeControl = setInterval ( function () {
        waitForKeyElements (    selectorTxt,
          actionFunction,
          bWaitOnce,
          iframeSelector
        );
      },
      300
    );
    controlObj [controlKey] = timeControl;
  }
}
waitForKeyElements.controlObj   = controlObj;
}


function main(doc) {
  // bookmarkcounter code below.
  var params = [];
  var n, l = doc.getElementsByClassName("r");
  var fin = function(params) {
    // console.log('finish: ' + params);
  }

  for(var i=0; i<l.length; i++) {
    n = l[i].childNodes.item(0);

    //hatebuCountView(n);
    // diggCountView(n);

    params.push(n);
  }

  asyncProcArray(params, hatebuCountView, fin);
  asyncProcArray(params, deliCountView, fin);
  asyncProcArray(params, facebookCountView, fin);
  asyncProcArray(params, twitterCountView, fin);
  asyncProcArray(params, stumbleuponCountView, fin);
  asyncProcArray(params, redditCountView, fin);
  // asyncProcArray(params, diggCountView, fin);
}


// For AutoPagerize
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
  // console.log('AutoPagerize_DOMNodeInserted')
  main(evt.target);
});


///// Main

// For instant search result.
waitForKeyElements("#rso", function(jNode) {
  try{
    main(jNode[0]);
  } catch(e) {
    // console.log(e);
  }
});


})();
