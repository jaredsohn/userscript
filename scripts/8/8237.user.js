// Devshed Butler
// version 0.1
// 2007-03-31
// Copyright (c) 2007, Mike Jervis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Inspired by Mark Pilgrim's Butler (via BoingBoing)
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DevShed Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           DevShed Butler
// @namespace      http://fuckingbrit.com/greasemonkey
// @description    Makes articles on devshed.com more readable.
// @include        http://*.devshed.com/*
// ==/UserScript==



(function() {

    var DSButler = {

	    // main
	    main: function() {
            // Crap ads at the bottom
            ads = this.snap("//div[@class='pagenavbar']");
            this.eaterOfBabies(ads.nextSibling.nextSibling.nextSibling.nextSibling);
            
            // crap ads at the right
            ads = this.snap("//div[@id='resultright']");
            this.eaterOfBabies(ads);
            
            // expand content
            content = this.snap("//div[@id='resultcontent']");
            content.style.width = '845px';
            
            // Hard chuff to remove.
            ads = this.snap("/html/body/div/div/div/div[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[3]");
            ads.innerHTML = '';
            
            ads = this.snap("/html/body/div/div/div/div[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr[2]");
            this.eaterOfBabies(ads);
            
            // move info to end.
            panel = this.snap("/html/body/div/div/div/div[2]/table/tbody/tr/td/table/tbody/tr/td/table");
            s = panel.innerHTML;
            this.eaterOfBabies(panel);
            
            panel = this.snap("/html/body/div/div/div/div[2]/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr[3]/td[3]");
            panel.innerHTML = s;
        },
        
        eaterOfBabies: function(n) {
            n.parentNode.removeChild(n);
        },
        
        snap: function(s) {
            n = document.evaluate(
                    s,
                    document,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);
           return n.snapshotItem(0);
        }
    
    }
    
    DSButler.main();
})();


