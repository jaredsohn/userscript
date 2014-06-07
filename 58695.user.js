//
// Extratorrent.com Direct Download
//
// This script makes direct downloads of torrents from extratorrent.com possible without the annoying 12 seconds delay.
//
// Because extratorrents.com checks the referrer its a little bit tricky to get the torrent file directly.
// This solution uses GM_xmlhttpRequest with a fake referrer and base64 encodes the returned data
// to use it with a data-URI.
//
//
// Thanks to the following sites and their authors for the very useful information they provide:
//
//  - Using Prototype and Scriptaculous with Greasemonkey
//    http://jimbojw.com/wiki/index.php?title=Using_Prototype_and_Scriptaculous_with_Greasemonkey
//  - Avoid Common Pitfalls in Greasemonkey
//    http://www.oreillynet.com/pub/a/network/2005/11/01/avoid-common-greasemonkey-pitfalls.html?page=last
//  - Dive Into Greasemonkey
//    http://diveintogreasemonkey.org/
//  - GreaseSpot
//    http://wiki.greasespot.net/0.7.20080121.0_compatibility
//  - Felix Hunecker
//    http://www.hunecker.de/?p=47
//  - FILExT
//    http://filext.com/file-extension/TORRENT
//  - SelfHTML
//    http://selfhtml.org/ 
//
//
// This script was written 2009 by Manuel Brotz, manu.brotz@gmx.ch
//
// This script is public domain. Use it as you wish.
//
//
// Changelog:
//   v0.1.1
//     27.09.2009 - Changed the script to ensure that the download links are adjusted on every site.
//   v0.1.2
//     27.09.2009 - Set the href attribute on adjusted links to 'javascript: return false;' to prevent scrolling 
//                  to the top of the site.
//   v0.1.3
//     10.10.2009 - Reworked the sourcecode to introduce the Direct Download Object.
//                - Added support for injecting the Prototype Framework v1.6.1 into the page.
//                - Added an options menu. ("Direct Download Options" on the top of the page.)
//     11.10.2009 - Changed adjusted links, so they don't need a href attribute.
//                - Added functions to get and set options.
//                - Implemented an error message if prototype cannot be loaded.
//   v0.1.3.1
//     12.10.2009 - Added some logging for debugging
//                - Increased the time waiting until Prototype is loaded.
//                - Script works faster, because it now starts doing the modifications to the page immediately.
//   v0.1.3.2
//     12.10.2009 - Massivly increased the delay between link adjustments. (To 250 ms)
//   v0.1.3.3
//     18.10.2009 - Introduced functions adjust_page(), remove_usenext_buttons()
//                - Changed the function adjust_download_links()
//                - Made use of adjust_page() ... :)
//   v0.1.3.4
//     15.11.2009 - Direct Download was broken. Made it working again.
//
//
// ==UserScript==
// @name          Extratorrent.com Direct Download
// @namespace     http://www.brotzilla.ch/
// @description   Makes direct downloads of torrents from extratorrent.com possible without the annoying 12 seconds delay.
// @include       http://extratorrent.com/*
// @include       http://www.extratorrent.com/*
// @version       0.1.3.4
// ==/UserScript==


/*

  Placeholders for the prototype functions.

*/
var $, $$;
  

/**
  
  The Direct Download Object.
  
*/
var dd = {

  /**
    
    The URL used to inject the prototype library.
    
  */
  PROTOTYPE_URL: 'http://prototypejs.org/assets/2009/8/31/prototype.js',
  

  /**
  
    Holds all the functions to get and set the options.
    
  */
  options: {
  
    // sets the given key to value
    set_value: function (key, value) {
      window.setTimeout(function () {
        GM_setValue(key, value);
      }, 0);
    },

    // used to save the state of the menu
    set_menu_visible: function (value) {
      dd.options.set_value('menu_visible', (value == true));
    },

    get_menu_visible: function () {
      return GM_getValue('menu_visible', false);
    },
    
    // enable / disable Direct Download
    set_dd_enabled: function (value) {
      dd.options.set_value('dd_enabled', (value == true));
    },
    
    get_dd_enabled: function() {
      return GM_getValue('dd_enabled', true);
    },
    
    // enable / disable the 12 seconds delay
    set_rdl_enabled: function (value) {
      dd.options.set_value('rdl_enabled', (value == true));
    },
    
    get_rdl_enabled: function () {
      return GM_getValue('rdl_enabled', true);
    },
    
    // enable / disable removing of usenext buttons
    set_rub_enabled: function (value) {
      dd.options.set_value('rub_enabled', (value == true));
    },
    
    get_rub_enabled: function () {
      return GM_getValue('rub_enabled', true);
    }
  },  
  

  /**
    show()
    
    writes a list of properties and methods of the object
    
    for debugging
  */
  show: function(value) {
    if (typeof value == 'object') {
      
      var result = [];
      
      for (var prop in value) {
        result.push(prop);
      }
      
      result.sort();
      
      document.write(result.join("<br>"));
      
    } else {
      document.write(value);
    }
  },


  /**
  
    Counts the number of waits for prototype.
    
  */
  prototype_waits: 0,


  /**
    inject_prototype()

    This function injects the Prototype Framework v1.6.1 into the page.

  */
  inject_prototype: function () {
      
      var head = document.getElementsByTagName('head')[0];
      
      if (head && head.appendChild) {
        
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', dd.PROTOTYPE_URL);
        
        head.appendChild(script);
        
        GM_log('inject_prototype(): prototype successfully injected!');
      } else {
        
        GM_log('inject_prototype(): waiting another 10 ms for injecting prototype');
        
        window.setTimeout(function () {
          dd.inject_prototype();
        }, 10);
      }      
  },


  /**
    wait_for_prototype(function)
    
    This function waits until prototype is loaded. 
    Then it uses the 'dom:loaded' event to call the given callback function.
    
    After 10 attempts, it displays an error message.
    
  */
  wait_for_prototype: function (callback) {
  
    if (unsafeWindow.Prototype && unsafeWindow.$ && unsafeWindow.$$) {
    
      // get the prototype functions
      $ = unsafeWindow.$;
      $$ = unsafeWindow.$$;

      GM_log('wait_for_prototype(): Prototype successfully loaded!');
      callback();
      
    } else {
      
      if (dd.prototype_waits >= 20) {
      
        GM_log('wait_for_prototype(): Maximum waits exceeded! (' + dd.prototype_waits + ')');
      
        alert("Error while setup Direct Download!\n\nMaybe, you are using NoScript?\nMake sure, the prototype library can be loaded!\n\nPrototype URL: " + dd.PROTOTYPE_URL);
      
      } else {
      
        dd.prototype_waits++;
      
        GM_log('wait_for_prototype(): Waiting another ' + (10 * dd.prototype_waits) + ' ms for prototype');
      
        window.setTimeout(function () {
          dd.wait_for_prototype(callback);
        }, 10 * dd.prototype_waits);    
      
      }
    }
  },
  
  
  /**
    setup()
    
    This function does the page modifications for Direct Download.
    
  */
  setup: function () {
  
    // get the current location
    var location = window.location.href;
    
    // call the appropriate function, depending on the current URI
    if (location.match(/.*extratorrent\.com\/torrent_download\/.*/)) {
      
      if (dd.options.get_rdl_enabled()) {
        dd.remove_download_delay();
      }
      
    } else {
      
      window.addEventListener(
        'load', 
        function() {
          GM_log('Page completely loaded. (dd.adjust_state = 1;)');
          dd.adjust_state = 1;
        },
        true
      );
      
      dd.adjust_page(function (adjust_state) {
        
        if (dd.options.get_dd_enabled()) {
          dd.adjust_download_links();
        }
        
        if (dd.options.get_rub_enabled()) {
          dd.remove_usenext_buttons();
        }
        
      }, 250);
    
    }
  },
  

  /**
    add_options_menu()
    
    This functiona adds the Direct Download options menu on the top of the page.
    
  */
  add_options_menu: function () {
    
    // get the body of the document
    var body = document.getElementsByTagName('body')[0];
    
    // create the options menu
    var menu = document.createElement('div');
    menu.setAttribute('style', 'visibility: hidden; position: absolute; border: 1px solid black; padding: 2px; background-color: white;');
    menu.setAttribute('id', 'dd_menu');
    menu.innerHTML = 
      '<table>' + 
        '<tr><td><input type="checkbox" id="dd_enabled"' + (dd.options.get_dd_enabled() ? ' checked' : '') + '></td><td nowrap> Enable Direct Download</td></tr>' + 
        '<tr><td><input type="checkbox" id="rdl_enabled"' + (dd.options.get_rdl_enabled() ? ' checked' : '') + '></td><td nowrap> Remove 12 Seconds Delay</td></tr>'+
        '<tr><td><input type="checkbox" id="rub_enabled"' + (dd.options.get_rub_enabled() ? ' checked' : '') + '></td><td nowrap> Remove UseNeXT Buttons</td></tr>'+
      '</table>';
    
    // append the options menu to the body
    body.appendChild(menu);
    
    // handle clicks
    var dd_enabled = $('dd_enabled');
    var rdl_enabled = $('rdl_enabled');
    var rub_enabled = $('rub_enabled');
    
    dd_enabled.observe('change', function () {
      dd.options.set_dd_enabled(dd_enabled.getValue() == 'on');
      unsafeWindow.location.reload();
    });
    
    rdl_enabled.observe('change', function () {
      dd.options.set_rdl_enabled(rdl_enabled.getValue() == 'on');
      unsafeWindow.location.reload();
    });
    
    rub_enabled.observe('change', function () {
      dd.options.set_rub_enabled(rub_enabled.getValue() == 'on');
      unsafeWindow.location.reload();
    });
    
    // create the "Direct Download Options" link
    var links = $$('td.h_top_r')[0];
    var new_links = '<a style="cursor: pointer;" id="dd_options" class="menu" title="Direct Download Options">Direct Download Options</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;' + links.innerHTML;
    links.update(new_links);
    
    // handle clicks on the link
    $('dd_options').observe('click', function () {
      dd.toggle_options_menu();
    });
    
    // show the menu if necessary
    if (dd.options.get_menu_visible()) {
      dd.show_options_menu(true);
    }
  },
  
  
  /**
    toggle_options_menu()
    
    This function toggles the visibility of the options menu.
    
  */
  toggle_options_menu: function () {
    dd.show_options_menu($('dd_menu').style.visibility == 'hidden');
  },
  
  
  /**
    show_options_menu(boolean)
    
    This functions shows or hides the options menu.
    
  */
  show_options_menu: function (show) {

    var menu = $('dd_menu');

    if (show == true) {
      
      var link   = $('dd_options');
      var offset = link.cumulativeOffset();
      var height = link.getHeight();
      
      menu.style.left = (offset[0] + 2) + 'px';
      menu.style.top = (offset[1] + height + 2) + 'px';
      menu.style.visibility = 'visible';
      
    } else {
      menu.style.visibility = 'hidden';
    }

    dd.options.set_menu_visible(show);
  },
  
  
  /**
    remove_download_delay()
    
    This function is called on every page which starts with the following uri:
    http://extratorrent.com/torrent_download/
    
    It sets the annoying download countdown immediately to zero.
    
  */
  remove_download_delay: function () {
  
      if (unsafeWindow.dtimer && unsafeWindow.set_timer) {
        
        unsafeWindow.dtimer = 0;
        unsafeWindow.set_timer();
      
        GM_log('remove_download_delay(): Download delay successfully removed!');
      
      } else {
        
        GM_log('remove_download_delay(): Waiting another 10 ms to remove download delay');
        
        window.setTimeout(function () {
          dd.remove_download_delay();
        }, 10);
        
      }
  },


  /**
    adjust_state
    
    This field indicates the state of the page adjustment process.
    
    0 - Adjustment has begun. Adjustment is executed every 250 ms until adjust_state reaches 1.
    1 - Page is completely loaded. Adjustment has to be executed once again.
    2 - Adjustment complete.
  
  */
  adjust_state: 0,
  

  /**
    adjust_page(function callback, int delay)
    
    Used to adjust the page. Calls the callback every *delay* ms until the page is completely loaded.
    When the page is complete, the callback is called once again.
    
    Callback example:
    
    function example(adjust_state) {
      ...
    }
  */
  adjust_page: function (callback, delay) {
    
    if (dd.adjust_state == 1) {
    
      GM_log('adjust_page(): Adjust page the last time. (dd.adjust_state == 1)');

      callback(dd.adjust_state);

      dd.adjust_state = 2;
      
    } else if (dd.adjust_state == 0) {
    
      callback(dd.adjust_state);
      
      if (dd.adjust_state == 0) {
      
        GM_log('adjust_page(): Adjust page again in ' + delay + ' ms. (dd.adjust_state == 0)');
        
        window.setTimeout(function () {
          dd.adjust_page(callback, delay);
        }, delay);
      
      } else if (dd.adjust_state == 1) {
      
        dd.adjust_page(callback, delay);
      
      }    
    }
  },


  /**
    adjust_download_links()
    
    This function is called on every page.
    
    It adjusts the download links to directly download the torrent files.
    
  */
  adjust_download_links: function () {
    
    var links    = document.getElementsByTagName('a');
    var adjusted = 0;

    for (var i = 0; i < links.length; i++) {
      
      var link = links[i];

      var href = link.getAttribute('href');
      var title = link.getAttribute('title');
      var lname = link.getAttribute('name');
      
      if (href) {
        
        var result = href.match(/.*\/torrent_download\/.*/);
        
        if (result && (lname != 'adjusted')) {

          link.setAttribute('name', 'adjusted');
          link.setAttribute('title', 'Direct ' + title);
          link.removeAttribute('href');
          link.style.cursor = 'pointer';
          
          link.addEventListener(
            'click',
            eval("function() {dd.direct_download_torrent('" + href.replace(/\/torrent_download\//, '/download/') + "', '" + href + "');}"),
            false
          );
          
          adjusted++;
        }
      }
    }
    
    if (adjusted > 0) {
      GM_log('adjust_download_links(): ' + adjusted + ' links adjusted');
    }
  },


  /**
    remove_usenext_buttons()
    
    Removes all the useless usenext buttons.
    
  */
  remove_usenext_buttons: function () {
    
    var links = document.getElementsByTagName('a');
    var removed = 0;
    
    for (var i = 0; i < links.length; i++) {
      
      var link = links[i];
      var title = link.getAttribute('title');
      
      if (title && title.match(/Download from UseNeXT/i)) {
        link.parentNode.removeChild(link);
        removed++;
      }
    }
    
    if (removed > 0) {
      GM_log('remove_usenext_buttons(): ' + removed + ' buttons removed');
    }
  },


  /**
    direct_download_torrent(string, string)
    
    This function downloads the torrent and sets the current location to the generated data uri.
    
  */
  direct_download_torrent: function (torrent, referer) {
	  GM_log('direct download torrent\ntorrent: ' + torrent + '\nreferer: ' + referer);
	  dd.download_torrent('http://extratorrent.com' + torrent, 'http://extratorrent.com' + referer, function (statusCode, dataUri) {
	    if (statusCode == 200) {
	      window.location.href = dataUri;
	    } else {
	      alert('Failed loading torrent! (' + statusCode + ')' + "\n" + torrent);
	    }
	  });
  },


  /**
    download_torrent(string, string)
    
    This function actually downloads the torrent files and responds via a callback function.
    
    The callback function has to be to following form:
      
      function callback(statusCode, dataUri) {
        ...
      }
      
    Callback parameters:
      - statusCode : The HTTP status code.
      - dataUri    : The generated data uri, if (statusCode == 200)
    
  */
  download_torrent: function (torrent, referer, callback) {
	  window.setTimeout(
	    function () {
	      try {
	      GM_xmlhttpRequest( {
		      method: "GET",
		      url: torrent,
		      headers: { 
		        Referer: referer,
		        "User-agent": "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.3) Gecko/20090910 Ubuntu/9.04 (jaunty) Firefox/3.5.3"
		      },
		      overrideMimeType: 'text/plain; charset=x-user-defined',
		      onload: function(response) {
			      if(response.status==200) {
				      var text = response.responseText;
				      var b64 = Base64.encode(text);
				      callback(response.status, "data:application/x-bittorrent;base64,"+b64);
			      }
			      else {
				      callback(response.status, '');
			      }
		      }
	      });
	      } catch (e) {
	        GM_log('Error:\ntorrent: ' + torrent + '\nreferer: ' + referer);
	        GM_log(e);
	      }	  
	    },
	    0
	  );
  }  
}


/**
  Special version of base64 encoding.
  
  For details visit http://www.hunecker.de/?p=47
  
*/
var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {

            chr1 = input.charCodeAt(i++) & 0xff;
            chr2 = input.charCodeAt(i++) & 0xff;
            chr3 = input.charCodeAt(i++) & 0xff;

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }
        return output;
    }
}


/**
  
  Inject the Prototype Framework into the page and wait
  until its loaded and ready.
  
*/

dd.inject_prototype();

dd.wait_for_prototype(function () {
  dd.add_options_menu();
  GM_log('wait_for_prototype(): Added options menu');
});


/**

  Do the necessary modifications to the page.
  
*/

dd.setup();

