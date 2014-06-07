// ==UserScript==
// @name           ImageFap Utilities
// @namespace      
// @version        0.1b
// @description    Adds several cusomizations to imagefap
// @include        http://www.imagefap.com/*
// ==/UserScript==


var VERSION = 0.1b;

var DEBUG = true;

function RunImageFapUtil(){
 log('bootstrapped and ready to roll');
 

}

function correctNavigationLinks(){


}


function log(msg) {
    if (DEBUG) {
        unsafeWindow.console && unsafeWindow.console.log(msg)
    }
}

//Makes requests on behalf of your request
// (Stolen from the Pornifier2 script http://userscripts.org/scripts/show/104615

function sneakyXHR(url, cb) {
    log("requesting: " + url)
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'POST',
            'url': url,
            headers: {
                'User-agent': 'Mozilla/4.0',
                'Accept': 'application/atom+xml,application/xml,text/xml'
            },
            onload: function(responseDetails) {
                var text = responseDetails.responseText;
                cb(text, responseDetails);
            }
        });
    }, 1)
}

// Makes sequential getJSON requests, passing the processed results from the
// previous request to the next request. seedData is optional.
// (Stolen from the Pornifier2 script http://userscripts.org/scripts/show/104615
var chainedGet = function(requests, isJson, seedData) {
  var seed = $.Deferred(),
      finalPromise;

  finalPromise = requests.reduce(function(promise, request) {
    return promise.pipe(function() {
      return $[isJson ? 'getJSON':'get'](request.url).pipe(function(data){
          request.process(data);
      });
    });
  }, seed.promise());

  // Start the chain
  seed.resolve(seedData);

  return finalPromise;
};


/**************** startup code ******************************/
log('starting imageFapUtil');
loadDependancies(RunImageFapUtil);

function loadDependancies(cb) {
    var boostrapFn = function(){
        //add scripts that require jquery:
        //will dev. later
		cb();
    };

     if (typeof unsafeWindow.jQuery != 'undefined') {
        log('didnt need jquery, site had its own. woot!');
        jQuery = $ = unsafeWindow.jQuery;
        boostrapFn();
    } else {
      addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');

        var check = function() {
            log("waiting for jquery to load: " + typeof unsafeWindow.jQuery);
            if (typeof unsafeWindow.jQuery == 'undefined') {
                window.setTimeout(check, 500);
            } else {
                jQuery = $ = unsafeWindow.jQuery;
    //            addScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js');
                boostrapFn();
            }
        };
        check();
    }
    updateScript();
}


//update the script (stolen from mafiawars bot)
function updateScript() {
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/source/104615.meta.js', // don't increase the 'installed' count; just for checking
            onload: function(result) {
                if (result.status != 200) {
                    return;
                }
                var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/) ? RegExp.$1 : '';
                if (theOtherVersion != VERSION) {
                    var changes = result.responseText.match(/@changes\s+(.+)/) ? RegExp.$1 : '';
                    if (window.confirm('Version ' + theOtherVersion + ' is available! You are running ' + VERSION + '\n\nChanges:\n' + changes + '\n\nDo you want to upgrade?' + '\n')) {
                        window.location.href = "http://userscripts.org/scripts/source/104615.user.js";
                    }
                }
            }
        });
    }, 10);
}