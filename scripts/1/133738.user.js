// ==UserScript==
// @name DAZ Wishlist and Item detail page improvements
// @description Improve the look and behavior of the DAZ Wishlist and item details on their new site, including adding back in the 'Specials' toggle, and removing the unnecessary tabs.
// @match https://www.daz3d.com/shop/*
// @match http://www.daz3d.com/shop/*
// @match http://forum.daz3d.com/*
// @match http://forumarchive.daz3d.com/*
// ==/UserScript==

function daz_exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

function daz_inject(fn) {
    var script = document.createElement('script');

    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
}

(function() {
    daz_inject(function() {
        document.daz_gm = {};

        document.daz_gm.daz_specials = function() {
            document.daz_gm.specials_only = true;
            jQuery('tbody').hide();
            jQuery($$('.special-price')).each(function(idx, element) { e = jQuery(element); e.parent().parent().parent().parent().parent().show(); });
            $('daz-gm-specials').innerText = 'Show Everything';

            return false;
        };

        document.daz_gm.daz_normal = function() {
            document.daz_gm.specials_only = false;
            jQuery('tbody').show();
            $('daz-gm-specials').innerText = 'Show Specials';
        };

        document.daz_gm.daz_toggle = function() {
            if(document.daz_gm.specials_only) {
                document.daz_gm.daz_normal();
            } else {
                document.daz_gm.daz_specials();
            }
        };
    });

    daz_exec(function() {
      if(document.location.host == 'forumarchive.daz3d.com') {
        function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
        script.addEventListener('load', function() {
          var script = document.createElement("script");
          script.textContent = "(" + callback.toString() + ")();";
          document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
      }

      addJQuery(function() {
        (function($) {
          $.fn.replaceText = function(search, replace) {
            return this.each(function(){
              var remove = [];
              var node = this.firstChild;
              var val, new_val;

              if(node) {
                do {
                  // Only process text nodes.
                  if ( node.nodeType === 3 ) {
                    val = node.nodeValue;
                    new_val = val.replace( search, replace );

                    if ( new_val !== val ) {
                      $(node).before( new_val );

                      // Don't remove the node yet, or the loop will lose its place.
                      remove.push( node );
                    }
                  }
                } while ( node = node.nextSibling );
              }

              // Time to remove those elements!
              remove.length && $(remove).remove();
            });
          };
        })(jQuery);
        $('body *').replaceText('img', 'IMAGE');
        $('body *').replaceText('a href', 'A HREF')
      });
      }
    });

  daz_exec(function() {
    if(document.location.host == 'forum.daz3d.com') {
      document.location = document.location.toString().replace('forum.daz3d', 'forumarchive.daz3d');
    }
  });

  daz_exec(function() {
    //  On the wishlist page
    if(document.location.pathname.indexOf('wishlist') != -1) {
      //  Center the product name under the image
      //  Boost the font size of the prices and center it
      //  Center the entire price box
      //  Cut the textarea for comments in half to make the page feel less busy
      var new_style = ".product-name {text-align: center}\n.price {font-size: 130%; text-align: center;}\n.price-box {text-align: center;}\n.my-wishlist textarea { height: 50%; }";
      var new_element = document.createElement("STYLE");
      new_element.innerHTML = new_style;

      document.getElementsByTagName('head')[0].appendChild(new_element);

      var collateral = $$('div.product-collateral');
      if(collateral && collateral.length != 0) {
        return;
      }

      //  Add the 'toggle specials' button above the RSS Feed
      var toggle_element = document.createElement("A");
      toggle_element.innerHTML = '<a id="daz-gm-specials" href="#" onclick="daz_gm.daz_toggle(); return false;">Show Specials</a>';
      var parent = window.$$('.page-title')[0];
      parent.insertBefore(toggle_element, parent.firstChild);

      // Hide all 'Edit' links on the wishlist items
      jQuery($$('a').select(function(element) { return(element.text == 'Edit') })).hide()

      // Reparent all the price information to be under the 'Added on' date.
      jQuery($$('.price-box')).each(function(idx, element) {
        e = jQuery(element).parent();
        jQuery(e.parent().parent().find("td")[2]).append(e)
      });
    }
  });

  daz_exec(function() {
    if(document.location.host == 'www.daz3d.com') {
      //  Remove the tabs if they are present.
      var collateral = $$('div.product-collateral');
      if(collateral && collateral.length != 0) {
        collateral[0].innerHTML = $$('dd').inject('', function(sum, value, idx) {
          return sum+value.innerHTML;
        });
      }
    }
  });
})();
