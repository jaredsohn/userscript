/**
    DW Link Style Rewriter

    This script rewrites entry and month list links on Dreamwidth to display
    the the light, site, default, or mine styles.

    Thank you to:
    Patrick Cavit, pcavit@gmail.com
    http://patcavit.com

    from whose Google Image Relinker this script is base.  He, in turn,
    thanks Eric Hamiter, since the GIR is just a quick modification of
    his extension at:
    http://roachfiend.com/

    Also thanks to Dive Into Greasemonkey's Guide:

    http://diveintogreasemonkey.org/

    COPY, USE, MODIFY, and SPREAD as you see fit.
**/

// ==UserScript==
// @name          DW Link Style Rewriter
// @version       0.1
// @namespace     http://memewidth.org
// @description   Rewrites applicable DW links to point to a certain styled version of pages.
// @include       http://*.dreamwidth.org/*
// @require       http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

(function() {

    //Text for the link back to using the regular style
    var heavy_link_text = "StyleLinks: Use Default Style"
    var style_default = "mine";
    
    //Selects nodes in the document with the required characteristics in xpath
    function selectNodes(doc, context, xpath) {
        var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = new Array( nodes.snapshotLength );

        for (var x=0; x<result.length; x++) {
            result[x] = nodes.snapshotItem(x);
        }

        return result;
    }

    //This nifty little function will add a get option to a link. If the option
    // already exists, its value will be replaced.
    function addLinkOption( link, name, value ) {

        //If there's an anchor tag, split it off; we'll add it at the end
        var split = link.split("#");
        link = split[0];
        var anchor = split[1];

        //If there's a trailing ? at the end of our URL now, we'll remove it
        // since there's no more options if there's nothing after the ?
        if( link.charAt( link.length - 1 ) == '?' ) {
            link = link.substr( 0, link.length-1);
        }

        //If we already have a question mark, options already exist
        if( link.match(/\?/) ) {
            //Split off the options from the URL
            var split = link.split("?");
            var URL = split[0];
            var options = split[1];

            //We're looking for this pattern to determine if the option exists
            var pattern = '(\\?|&)'+name;

            var regex = new RegExp( pattern );

            if( link.match(regex)) {
                //If we've found the pattern, this regex will help us replace the
                // option's current value with the new value
                var pattern = '(\\?|&)'+name+'=([^&]+)';
                var regex = new RegExp( pattern );
                var replace = "$1"+name+"="+value;

                link = link.replace( regex, replace );
            } else {
                //We haven't found the option, so it's okay to add it onto the end
                link += '&' + name + '=' + value;
            }
        } else{
            //No current options--add the ? and the option
            link += '?' + name + '=' + value;
        }

        //If the anchor exists, add it back on with its #
        if( anchor != undefined ) {
           link += '#' + anchor;
        }

        //Tada!  We can return our link now.
        return link;
    }

    //This function will remove a get option from a URL
    function removeLinkOption( link, option_name ) {
        //This pattern will identify the parts of an option that would need
        // to be removed if it was found--note that only & is marked for
        // removal if it exists.  If there is a trailing ?, we will deal
        // with it later.  This pattern will also remove the option as a name
        // by itself--the value part is optional
        var pattern = '(&)?'+option_name+'(=[^&]+)?';
        var regex = new RegExp( pattern );

        //If there's an anchor tag, split it off; we'll add it at the end
        var split = link.split("#");
        link = split[0];
        var anchor = split[1];

        //We replace what we find with nothing
        link = link.replace( regex, "" );

        //If there's a trailing ? at the end of our URL now, we'll remove it.
        if( link.charAt( link.length - 1 ) == '?' ) {
          link = link.substr( 0, link.length-1);
        }

        //If the anchor exists, add it back on with its #
        if( anchor != undefined ) {
           link += '#' + anchor;
        }

        //Tada!  We can return our link now.
        return link;
    }
    
    function showConfig() {
        GM_log("Showing config...")
        GM_config.open();
    }
    
    function configSetup() {
        GM_log("Setting up config...")
        GM_config.init('Options',{
            style:  { label: 'Link style: ', title: 'Which style do you want to use for your links?', type: 'radio', options:['mine','site','light'], default: style_default },
        });
        GM_registerMenuCommand("Configure link style options", showConfig)
    }
    
    function changeLinks( style ) {
        
        GM_log("Changing links to style: " + style)

        //for ease of reference
        doc = window.document;
    
        // Get a list of all A tags that point to entry pages--which end in .html
        var EntryLinks = StyledLinks = selectNodes(doc, doc.body, "//A[contains(@href,'dreamwidth.org')]");
        
        //Our current location's URL.  Use this to analyze what else we
        // should add to the page.
        var url = doc.location.href;
    
        //REWRITE ALL ENTRY LINKS
        for (var x=0; x<EntryLinks.length; x++) {
            EntryLinks[x].href = addLinkOption( EntryLinks[x].href, "style", link_style);
        }
        //END REWRITE ALL ENTRY LINKS
    }
    
    configSetup();
    var link_style = GM_config.get("style", style_default);
    GM_log("Link style: " + link_style)
    changeLinks(link_style);
})();

