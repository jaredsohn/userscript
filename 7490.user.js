// ==UserScript==
// @name           Youtube Response Viewer
// @namespace      http://billybobbain.com/
// @description    Display all responses at once in floating treeview
// @include        http://www.youtube.com/video_response_view_all*
// ==/UserScript==

// Settings used by the loader
var GM_YUILOADER_CONFIG = {
    // List of JS libraries and CSS files to load. obj is used for the object
    // detection used in the loader. Basically, if the object already exists,
    // the script is not injected in the page.
    assets: [
        { type: 'css', url: 'http://developer.yahoo.com/yui/build/container/assets/container.css' },
        { type: 'css', url: 'http://developer.yahoo.com/yui/build/treeview/assets/tree.css' },
        { type: 'js', obj: 'YAHOO', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/yahoo_2.1.0.js' },
        { type: 'js', obj: 'YAHOO.util.Event', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/event_2.1.0.js' },
        { type: 'js', obj: 'YAHOO.util.Dom', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/dom_2.1.0.js' },
        { type: 'js', obj: 'YAHOO.util.DragDrop', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/dragdrop_2.1.0.js' },
        { type: 'js', obj: 'YAHOO.util.Anim', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/utils/2/animation_2.1.0.js' },
        { type: 'js', obj: 'YAHOO.widget.Panel', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/widgets/2/container/container_2.1.0.js' },
        { type: 'js', obj: 'YAHOO.widget.TreeView', url: 'http://us.js2.yimg.com/us.js.yimg.com/lib/common/widgets/2/treeview/treeview_2.1.0.js' }
    ],
// http://pagead2.googlesyndication.com/pagead/show_ads.js
    // What should be the max allowed loading time? In this example, the
    // script has 6 seconds to load the libraries and CSS files.
    timeout: 6000,

    // How often should the script check if everything was loaded?
    interval: 300,

    // What to trigger once all assets are loaded (a string). Example: execute
    // YBFLOOKUP() (this will be eval()'ed later on, hence the string)
    runFunction: 'YBFLOOKUP.run()',
}



// START LOADER CODE //////////////////////////////////////////////////////////

var YAHOO;
var GM_YUILOADER = {
    // Version of the loader
    VERSION: 20070103,

    // Simple internal timer to keep track of the passed time.
    loaderTimer: 0,
};

// This function checks whether everything was loaded yet; if not, it'll wait
// some more and call itself again. It'll do so until either all assets are
// loaded or the max loading time (GM_YUILOADER.loaderTimer.timeout) is
// reached.

GM_YUILOADER.loaderCheck = function() {
    var ud = unsafeWindow.document;

    // Do we have a green light yet?
    if (ud.GM_YUILOADER_DOC.go) {
        YAHOO = unsafeWindow.YAHOO;
        delete ud.GM_YUILOADER_DOC;
        GM_YUILOADER.run();
    }
    // Nope, not yet. Rinse & repeat!
    else {
        GM_YUILOADER.loaderTimer += GM_YUILOADER_CONFIG.interval;

        if (GM_YUILOADER.loaderTimer >= GM_YUILOADER_CONFIG.timeout) {
            return;
        }
        setTimeout(GM_YUILOADER.loaderCheck, GM_YUILOADER_CONFIG.interval);
    }
}

// Main function that initiates loading the external JS and/or CSS files

GM_YUILOADER.loader = function() {
    if (document.contentType != 'text/html' || !document.body) { return; }
    var ud = unsafeWindow.document;

    // This object holds the important stuff to make this work. It's a property
    // of GM's unsafeWindow.document object.

    ud.GM_YUILOADER_DOC = {
        // Number of JS libraries loaded so far (increased by countLoaded()
        // below)
        numberLoaded: 0,

        // Total number of JS files.
        numberTotal: 0,

        // If this is bool true, we're good to go! This is checked by
        // GM_YUILOADER.loaderCheck().
        go: false,

        // This function will be called by the onLoad events.
        countLoaded: function() {
            if (++this.numberLoaded == this.numberTotal) { this.go = true; }
        }
    };

    // Now let's add the extra tags to the page that'll load the libraries and
    // CSS files.

    var numAssets = GM_YUILOADER_CONFIG.assets.length;

    for (var a = 0; a < numAssets; a++) {
        var tag;
        var asset = GM_YUILOADER_CONFIG.assets[a];
        switch (asset.type) {
            // CSS file
            case 'css':
                tag = document.createElement('link');
                tag.href = asset.url;
                tag.type = 'text/css';
                tag.rel = 'stylesheet';
                break;

            // Javascript library.
            case 'js':
                var injectScript = true;

                // Object detection
                try {
                    injectScript = eval('window.' + asset.obj + ' === undefined');
                }
                catch (e) {}

                if (injectScript) {
                    tag = document.createElement('script');
                    tag.src = asset.url;

                    // The crucial part: triggering document.GM_YUILOADER.countLoaded()
                    // means keeping track whether all scripts are loaded yet.

                    tag.setAttribute('onload', 'document.GM_YUILOADER_DOC.countLoaded();');

                    // How many JS libraries are we dealing with again? Let's keep
                    // track.

                    ud.GM_YUILOADER_DOC.numberTotal++;
                }
                break;
        }

        document.body.appendChild(tag);
    }

    // Did we actually include anything in the page? If so, trigger the
    // GM_YUILOADER.loaderCheck "watchdog". If not, just tell it to run the
    // main part of the script.

    if (ud.GM_YUILOADER_DOC.numberTotal > 0) {
        setTimeout(GM_YUILOADER.loaderCheck, GM_YUILOADER_CONFIG.interval);
    }
    else {
        ud.GM_YUILOADER_DOC.go = true;
        GM_YUILOADER.loaderCheck();
    }
}

GM_YUILOADER.run = function() {
    // When we're here, we're good to go!
    eval(GM_YUILOADER_CONFIG.runFunction);
}


// The initial GM_YUILOADER trigger.
setTimeout(GM_YUILOADER.loader, 500);
// END LOADER CODE ////////////////////////////////////////////////////////////


// START PAYLOAD SECTION //////////////////////////////////////////////////////

// "YBFLOOKUP" == "Yahoo! Babelfish Lookup (english to german)"
var YBFLOOKUP = {
    panelTitle: 'Video Responses',
    panel: null,
    mybody: '',
};

function xpath(expr, doc) {
  if (!doc) {
    doc = document;
  }
  var items = document.evaluate(expr, doc, null,
                               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var ret = [];
  for (var i = 0; i < items.snapshotLength; ++i) {
    ret.push(items.snapshotItem(i));
  }
  return ret;
}

function retrieveResponses(video,treeNode) {

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.youtube.com/video_response_view_all?v=' + video,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	var str = responseDetails.responseText;
	// <div class="vstill"><a href="/watch?v=LK0PJ4QqLs4"><img src="http://sjl-static15.sjl.youtube.com/vi/LK0PJ4QqLs4/2.jpg" class="vimg"></a></div>
	count = 0;
	pos = str.indexOf('v120vEntry');
	while ( pos != -1 ) {
	   var endPos = str.indexOf('</div></td>',pos+1);
           GM_log("responses for " + video);
           var nodeText = str.substring(pos+12,endPos);
           var childPos = nodeText.indexOf("v=");
           var endChildPos = nodeText.indexOf('">',childPos+2);
           var userPos = nodeText.indexOf('<a href="/user/');
           var endUserPos = nodeText.indexOf('">',userPos);
           var userText = nodeText.substring(userPos+15,endUserPos);
           GM_log(userText);
           var childResponse = nodeText.substring(childPos+2,endChildPos);
           //nodeText = '<object width="212" height="175"><param name="movie" value="http://www.youtube.com/v/' + video + '"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/' + video + '" type="application/x-shockwave-flash" wmode="transparent" width="212" height="175"></embed></object>';
           var tmpNode = new YAHOO.widget.TextNode(nodeText, treeNode, false);
	   retrieveResponses(childResponse,tmpNode);
           //GM_log(tmpNode);
	   pos = str.indexOf("v120vEntry",pos+1);
	}
        tree.draw();
        YBFLOOKUP.panel.show();
    }
});

}


var tree;


// This function is triggered by the loader engine once the scripts are loaded
YBFLOOKUP.run = function() {
	
    // Build a panel that shows the translations later on
    YBFLOOKUP.panel = new YAHOO.widget.Panel("dictionaryPanel",
                                              { x: 10, y: 10, width: '400px', visible: false, draggable: true, close: true }
     );
    var treeDiv = document.createElement("div");                                        
    tree = new YAHOO.widget.TreeView(treeDiv);
    var root = tree.getRoot();
    var rootNode = new YAHOO.widget.TextNode(document.getElementsByTagName("h1")[0].innerHTML, root, true);
    YBFLOOKUP.panel.setHeader(YBFLOOKUP.panelTitle);
    	
    var allDivs, thisDiv, results;
    results = '';
    allDivs = xpath("//div[@class='v120vEntry']");
    //YBFLOOKUP.mybody = results;
    YBFLOOKUP.panel.appendToBody(treeDiv); //+'<br/>'+YBFLOOKUP.mybody);
    tree.draw();
    YBFLOOKUP.panel.render(document.body);

    YBFLOOKUP.kl = new YAHOO.util.KeyListener(document,
                                               { keys: [27] },
                                               { fn: function() { if (YBFLOOKUP.panel) { YBFLOOKUP.panel.hide(); } } }
                                              );
    YBFLOOKUP.kl.enable();
    YBFLOOKUP.panel.show();
    // Listen to mouseUp events
    for (var i = 0; i < allDivs.length; i++) {
      thisDiv = allDivs[i];

	tree.draw();
      try {
          var video = thisDiv.getElementsByTagName('a')[0].href.split("=")[1];
      //var nodeText =  '<object width="212" height="175"><param name="movie" value="http://www.youtube.com/v/' + video + '"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/' + video + '" type="application/x-shockwave-flash" wmode="transparent" width="212" height="175"></embed></object>';
          var nodeText = thisDiv.innerHTML;
          var tmpNode = new YAHOO.widget.TextNode(nodeText, rootNode, false);
          retrieveResponses(video,tmpNode);
      } catch(e) {
	alert(e);
      }

    }
 
}
// END PAYLOAD SECTION ////////////////////////////////////////////////////////



