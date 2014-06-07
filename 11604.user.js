// ==UserScript==
// @name           JobSearchTools
// @namespace	   http://jakes.jobsearchtools.jobids
// @description	   Tools to aid you with career sites job listings.
// @version        1.0.5
// @author         coughlin_jake@yahoo.com
// @include        http://www.careerbuilder.com/jobseeker/*
// @include        http://osp.its.state.nc.us/jobtitlesearchresults*
// ==/UserScript==

/*
// Disclaimer: I haven't knowningly written anything into this script
// to cause damage.  You choose to use this script AT YOUR OWN RISK!!
// If you can't accept the responsibility of living with the
// consequences of CHOOSING TO RUN THIS SCRIPT, then DON'T RUN IT!
//
// That said, the script "scrapes" each page that each career site
// sends to your browser, looking for A elements with known
// "jobid" fields in their query string.  For each element it finds,
// the "jobid" that the script extracts from the HREF attribute
// is looked up in a simple JavaScript associative array.  If it
// finds the jobid, the script adds 3 little icons to the existing
// markup for that link to give you a visual indicator.  Clicking
// on these icons "toggles" them and the script merely toggles the
// status for that jobid and then serializes the associative array to
// persistent storage with GM_setValue() and GM_getValue().  THIS
// SCRIPT IS NOT OUTBOUND IN ANY WAY!!  THE SCRIPT DOES NOT SEND
// ANY DATA *ANYWHERE*.  IT MERELY WRITES ITS ASSOCIATIVE ARRAY BACK
// to GreaseMonkey's little storage area.

// Description: www.careerbuilder.com provides you with page after page
// of job listings, but the descriptions are so freakin' vague that one
// wastes a substantial amount of time re-reading the same job listings
// over and over and over.  Also, it's easy to get yourself to "deep"
// in the process that you get lost on a tangential search (like
// "software developer" vs "software engineer" vs "programmer" vs
// "application developer" vs "web developer" vs... 
//
// This script runs thru all of the job links on the page and extracts
// the identifier that the site uses to track/identify joblistings.
// Every link to a joblisting is modified to include a few "status"
// icons.  When you click on an icon (rather than the joblink), you
// toggle its status and the script makes a note of
// [career site, jobid, toggle-status].  So, the next time you load a
// page from the same site and the script discovers a link to the same
// jobid, it sets the icons for that joblink appropriately.
//
// Right now you can toggle three states: FLAGGED, SEEN and JUNK.  I've
// been absolutely astounded at how this simple visual indicator has
// kept me "on focus" when using the career sites.
*/

/*
// Version 1.0.5 (2008-08-14)
// * Modified XPath for CareerBuilder's table class="results" to ignore
//   the div they're wrapping the a element in now.
*/

/*
// Version 1.0.4 (2007-08-21)
// * careerbuilder.com results from running a saved search.
*/

/*
// Version 1.0.3 (2007-08-20)
// * Initial versions are very much in the "is this actually possible" realm.
//   Hey, a whole 2 days and it's been working surprisingly well.  I'm tring
//   really hard not to think about the infinite possibilities that career
//   sites to write markup that totally sinks my ship.   Hopefully, I'll have
//   found a better job by then. :-)
*/

/*
// Version 1.0.2 (2007-08-20)
// * Various small fixes in order to properly integrate osp.its.state.nc.us.
*/

/*
// Version 1.0.1 (2007-08-20)
// * Added support for osp.its.state.nc.us.
*/

/*
// Version 1.0.0 (2007-08-19)
// * Initial version supports www.careerbuilder.com only. 
*/

/*
// function GM_addStyles() {
     // var head, style;
     // head = document.getElementsByTagName('head')[0];
     // if (!head) { return; }
     // style = document.createElement('style');
     // style.type = 'text/css';
     // style.innerHTML = css;
     // head.appendChild(style);
 // }
 // function GM_log(str) { window.alert(str); }
 // function GM_setValue(key, json) { }
 // function GM_getValue(key) { return {}; } 
*/

(function() {
    // ==========
    // DOM Object
    // ==========
    var DOM;
    DOM = {
	xpath1:function(path, root) {
	    if (!root) { root = document; }
	    var e = document.evaluate(path,
		root, null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null).singleNodeValue;
	    return e;
	},
	
	xpath:function(path, root) {
	    if (!root) { root = document; }
	    
	    var n = document.evaluate(path,
		root, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	    
	    // create an array of the results
	    var a = new Array(n.snapshotLength);
	    for (var i = 0; i < n.snapshotLength; i++) {
		a[i] = n.snapshotItem(i);
	    }
	    
	    return a;
	},
	
	// forEachMatch(xpath, f) - Apply the function f to each element matched by the xpath.
	forEachMatch:function(xp, f) {
	    var matches = DOM.xpath(xp);
	    for (var i = 0; i < matches.length; i++)
		f( matches[i] );
	},
	
	getTarget:function(e) {
	    var target = window.event ? window.event.srcElement : e ? e.target : null;
	    if (!target) { return false; }
	    return target;
	},
	
	findParent:function(e, tag) {
	    if (!tag) tag = 'div';
	    while (e) {
		if (e.nodeName.toLowerCase() == tag) return e;
		e = e.parentNode;
	    }
	    return null;
	},
	
	cancelClick:function(e) {
	    if (window.event){
		window.event.cancelBubble = true;
		window.event.returnValue = false;
		return false;
	    }
	    if (e) {
		e.stopPropagation();
		e.preventDefault();
	    }
	    return false;
	},
	
	addEvent:function(elm, evType, fn) {
	    if (elm.addEventListener) {
		elm.addEventListener(evType, fn, false);
		return true;
	    } else if (elm.attachEvent) {
		var r = elm.attachEvent('on' + evType, fn);
		return r;
	    } else {
		elm['on' + evType] = fn;
	    }
	    return true;
	},
	
	cssClass:function(action,o,c1,c2) {
	    switch (action) {
	    case 'swap':
		o.className=!DOM.cssClass('check',o,c1) ? o.className.replace(c2,c1) : o.className.replace(c1,c2);
		break;
	    case 'add':
		if (!DOM.cssClass('check',o,c1)) { o.className+=o.className?' '+c1:c1; }
		break;
	    case 'remove':
		var rep = o.className.match(' '+c1) ? ' '+c1 : c1;
		o.className = o.className.replace(rep,'');
		break;
	    case 'check':
		return new RegExp("(^|\\s)" + c1 + "(\\s|$)").test(o.className)
		break;
	    }
	    return true;
	}
    };

    // =========
    // DB Object
    // =========
    var DB;
    DB = {
        JOBCOLS : [ 'FLAGGED', 'SEEN', 'JUNK' ],
        
        // properties we'll calculate
        JobsDBKey : '', JobsDB : '',

        // InitRunOnce:function() {
        // DB.Init();
        // var db = eval( GM_getValue('CareerBuilder_Jobs') );
        // if (!db) db = {};
        // DB.JobsDB = db;
        // DB.Save();
        // },

        Init:function(key) {
            if (key) DB.JobsDBKey = key;
            return true;
        },

        // SaveDB() -- Save the current jobid DB.
        Save:function() {
            GM_setValue(DB.JobsDBKey, uneval(DB.JobsDB));
            return true;
        },
        
        // LoadDB() -- Load the current jobid DB.
        Load:function() {
            var db = eval( GM_getValue(DB.JobsDBKey) );
            if (!db) {
                db = {};
                DB.JobsDB = {}; DB.Save();
            } else {
                DB.JobsDB = db;
            }
            return db;
        },
        
        Fetch:function(jobid) {
            if ( typeof(DB.JobsDB) == "undefined" || !DB.JobsDB ) DB.Load();
            if ( !DB.JobsDB ) return null;
            
            if ( typeof(DB.JobsDB[jobid]) == "undefined" || !DB.JobsDB[jobid] ) return {};
            return DB.JobsDB[ jobid ];
        },
        
        Store:function(jobid, jobinfo) {
            if ( !DB.JobsDB ) return null;
            DB.JobsDB[jobid] = jobinfo;
            DB.Save();
            return true;
        }
    };

    //
    // Support Functions
    //

    function addStyles() {
        GM_addStyle([
        '  td.Job-Status { padding: 0; width: 75px !important; min-width: 70px !important; }',
        '',
        '  td.Job-Status a,',
        '  td.Job-Status a:link,',
        '  td.Job-Status a:visited,',
        '  td.Job-Status a:active {',
        '     margin: 0; padding: 1px 6px; width: 18px !important;',
        '     background-repeat: no-repeat;',
        '     background-position: 50% 50%;',
        '     background-color: transparent;',
        '     text-decoration: none;',
        '     border: 1px solid transparent;',
        '  }',
        '  td.Job-Status a:hover {',
        '    background-color: #f9f3d4; border-color: #c03030;',
        '  }',
        '',
        '  a.SEEN-ON  { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgTFCAoCi2ycwAAASpJREFUKM/dkD9Lw3AQht/8a03yk+AQpZDJpbtTRyfBj+GsgzjoNxAHF8HVyQoOTkIHR1vEoSgiUkyoHcRASxuJYpNiNa9TSltanPWZ7t6754YD/helWocruyWSZJrJv0kxycPzKr4TYrNYxVSx/k72Pr+u03775AZQFSiqilbYnSyS5M5xBfcBCwBw9vDKVtyHYZrIzVsobixPFtdP76DpOi69JjokLx5bEJaF3MIcjtYKUCVJSneVtCg/x7x6asMQBnpKFrcvXVDRYM3q2FtdRGZIAoCR5o3kQaWJrqQhM5OFJgNbSwJiTJpKuU3u1/r8GHr/OINLrusySRLIsox8Pj/IPc9jo9GAEAK2bQ9mI2IYhvB9H0EQIIoixHEM0zRh2zYcxxkR/xA/Zkh+hdcxLiIAAAAASUVORK5CYII="); }',
        '  a.SEEN-OFF { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgTFCEsFFtHKwAAASNJREFUKM/dkD2KwlAUhb+8PAzkpzOdop3tbODiKlyBO7B3I0IKd+ACtHp1wNIEES0Em6BY+IsvUynKjMy0M6e653I+zuXC/9J0OpV+vy9lWcp9p36CrterjEYjrLUkScJbsCgKuVwuH3c/HA5xHAetNdvt9nuwLEtJkoTNZhMBpGkq+/2eIAioVqv0er1H1n0G6/V6w1qLtZbBYNCYTCZUKhWiKKLb7eK6rvkCzudzmc1m+L4PwGq1QilFGIZ0Oh201ua5xHk2p9NJxuMxt9sNz/NQStFut/E8z/zq/cvlUowxcj6f5V1G34csy8Rai1KKZrP5aMjzXBaLBWEYEscxrVbLvJyaZZnsdjvW6zVFUXA4HDgejwRBQBzH1Gq1F/AP6RNoCnXl3IyrTAAAAABJRU5ErkJggg=="); }',
        '  a.FLAGGED-ON { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgTFBwQUdxzEgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAKcSURBVCjPbZJbbMtxFMc/v7//2q2XrVvpVrV1XbNlF9pk1iEsQZYQ4mGyEDyY4IEg7hkiRFwT4UnCk5AgMcITEhIx0jG3EJuJ7CJtzaWosa77d/v/PDSKxXk4JznnfM/35HsOUkqsTi84/NQ17aTq0AtAqPYF+w5QsXgFv809MxUVA1JKVAApR2FEI5n4uS7xI7amcFebunD9NF/oFWR97T3aN+RyPNnuqwfuo48CIKSUmO0TiQ+Kgr0dkf63AxD9AF4lzsCwkeq6cQgBp7Ze6uw9u7wqRSRTQKPJYqo+9rItZCjxzfNorLJ3oX7uIfLxE8/jOYTcS3F54drVrljXngq7lFJXABxz1m4INJT4yhyw0dXDrKk+yv0BfNUBag3vEcGTWHOhJlBuI3N8A4ACEA7ebAvehXwlgfLtHYnYFxSThTxnIUUVNYwf7OFDt+Rp8CUkoo/SwFy3x+CfAuNUI919IcKhXjRtmGyrFUUmGYgPk5khmDLbBxbPTCCl6vfB0ax4ErJMgnvhIgzPguRP6kfXdW7fvkNsUi3ZRog+jsHP3m9pVYUQKFWNzc0XW44omRC69RDjpwdoI0PEXXW462fTcvkNffsrG0C/nlZVCAFA6e72jsDcQOXnMNg9MBgDXQerGW4c3PZ4oPVE7e9zpNw/VtFYM7/6TP25YenY3CO3bCqRRV7b+b870p9js0BSA02Dh63FV3LzvjfZhlz0iyh2M9y5RvuY6SlVdQkjOiQBTZgveEqnL4x0RqlcBF9H4HWEUEEeFBWA2/kXrdUExgw4sN10quW0X6rQvLxRXS1ljtyxjC+AGLsqUkqyzWDO/FOYMY3Jne1zIsd32iXgH7tmGphjgWxzKllWzIQlC9TDTnvGSgBVwP+AvwCR4xT1ZeDkywAAAABJRU5ErkJggg=="); }',
        '  a.FLAGGED-OFF { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgTFB0EUh2WLgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAIySURBVCjPjZJPa9pwHMafmMSEQuKfn5Jkc25ZpVvQSJF66aHQwwoKQ3wJvhDBi6dSSl+I76CX9tAKQ37u4i5dCXVFS6P71YmZWs1OLW1XSp/T84XP5/R8eTwfrlAofBJFUXZd98+zwMOjXC5/ME0zCYDb3t5WR6MRxuPx38ViEaxWq6eDwWB4x/J3RVEUaX9/f5MQIhNCJEEQwHEcUqmUoOs653lehFLqPBJlWeZrtdrm1dWVFIlEsLq6Ct/3wRjD+fk5eJ7HxsaGZJrmx6Ojo58AEACAra0tM5PJqIQQrK2tIZ/PI5vNIpfLQVVVNJtNBINBZLNZcWVlRb8XW63WsNvtQpIk3NzcYDQaQZIkaJoGy7IwnU4xHo/RbrcxmUx+34uGYQQ0TYMoinAcBxcXF5jNZlBVFb7vYzKZQBAE2LaNcDgcBQABADzP4+fzOURRBGMMlFIkEgksl0scHh6CEALf9zEcDsEYmz+aI51Opw4ODiyO49DpdHB5eYnpdArDMLC+vo7j42PU6/Vvvu/3H81xfX09NAzjTTQalXieRzKZhK7rUBQFt7e3aDQazHGczrMPAACxWMywLCteqVTen52dgVKKdrv9q9fr0Ydc4Knoum6vVCrJ3W4XjDGk02ksFgv2lPtP3Nvby2UyGa3f7yMej8PzPLiu670o7uzs2I7jvC0Wiz9OTk6+y7IMSul8uVz28ZokEglld3f3S6lU+gpAfZVECAnatv05FAq9e4n7B5zC3DYAwrm3AAAAAElFTkSuQmCC"); }',
        '  a.JUNK-ON { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABmJLR0QA8ADcAFxXOTqpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgUBC0m2cp68AAAASlJREFUKM/Vkj9LQmEUxn/n7d5XkiSyWq4RtERk+AEqBIem9gb7CE2t9R2CCNodamiMBgczaHCLEBqipSEITEvzYvmHehtu3CtdHZqiM5/f8zzn4cCfzGurY37LWAB1twtAo/lmas13Ti7vhgLppQSrqVmxAKpuB4DDszIAW+lSCBClEWVzUOxzfG52h+gLt+4G59cPg6M2Wr0wIjaibBbjeZJrGsRClGY/nwjAdu/ze93rSI1EQdmIaG6qGYrlfkcTgBFb/cgR9R1TzhWpGY0oCxHN3qkOwPFRC4Cd7LIAmKOS2V5/ArF5aS+QK1R8zZWkE4DxmDWgRS9urlBhd9MTDJUzOaZD4IdEAO3fFO4bqNZdMz0R81XvH2vm+MJ7gmxmnjlnSvi/8wXTrk4N7+turgAAAABJRU5ErkJggg=="); }',
        '  a.JUNK-OFF { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wgTFCgE8CxUmAAAAMNJREFUKM/Vkj0Kg0AQRl8RCxUvsVvK3kHwBpZ6PlsbGxtZ8AR6AL2C+LM2NqliCNklpAr5qmHg8T6GgZ/EGJN+y9wA9n0HYNu2dFkWuq5zAkoplFLtDWBdVwDqugYgyzInWFXVu9GWaZro+95e1RjjBIUQCCHsxvM8neA4jgzDYDd6nucEpZRIKe1G3/cByPO8BSjLMn0caJ5ntNYXGMfxEwzD0GnUWlMURWutGkXRG3Acx+cHCILgZZkkCU3TXPOf5w7BtEYrHyRW5AAAAABJRU5ErkJggg=="); }',
        ''
        ].join("\n"));
        return true;
    }
    
    var ALLSITEPROPS = {
        'www.careerbuilder.com' : {
            // each entry: [ xpath_to_list_cnr, xpath_to_joblink, re_extract_jobid ]
            listpatterns : [
                [ "//table[@class='results']//tr", ".//td[@class='title']//a", "Job_DID=([\\w]+)" ],
                [ "//table[@class='jl_tbl']//tr", ".//a[@class='jt']", "Job_DID=([\\w]+)" ],
                [ "//div[@id='myCBRecJobInfo']", ".//a[@class='joblink']", "Job_DID=([\\w]+)" ]                                
            ]
        },
        
        'osp.its.state.nc.us' : {
            // each entry: [ xpath_to_list_cnr, xpath_to_joblink, re_extract_jobid ]       
            listpatterns : [
                [ "//td[@class='mMain' and position()=1]", ".//a", "vacancykey=([\\w\\-]+)" ]
          ]
        }
    };
    var SITEPROPS;
   
    // statusIconClick(e) - Event handler for when any of our status icons is clicked.
    var statusIconClick = function(e) {
        var icon = DOM.getTarget(e);

        // determine which property this icon represents
        var iconprop = icon.className.split( /-/ );
        iconprop = iconprop[0];

        var td = DOM.findParent(icon, 'td');
        var jobid = td ? td.getAttribute('jobid') : '';
        if (jobid) {
            // update the DB
            var jobinfo = DB.Fetch(jobid);
            if (jobinfo) { jobinfo[ iconprop ] = !jobinfo[ iconprop ]; }
            else         { jobinfo[ iconprop ] = 1; }
            DB.Store(jobid, jobinfo);

            // update the icon
            icon.className = iconprop + '-' + ( jobinfo[iconprop] ? 'ON' : 'OFF' );
        }

        return DOM.cancelClick(e);
    };

    // addStatusIcons(row, xpath_link, re_jobid) - The jobs are listed in a container of some
    //   sort.  For each "row" in that container, locate the element containing the jobid
    //   then extract the jobid.
    var TD = '';
    function addStatusIcons(row, xplink, reid) {
        // only add status icons to rows that contain a job title, company, etc
        if (row.nodeName.toLowerCase() == 'tr' && row.childNodes.length < 3) return false;

        var i;
        if (!TD) {
            // create the template 'td' element with one anchor element for each status icon
            // this template is created once and then cloned.
            TD = document.createElement('td');
            TD.className = 'Job-Status';
            TD.style.width = '70px';

            var classes =
            [
            { title:"Press to toggle this job's FLAGGED status." },
            { title:"Press to toggle this job's SEEN status." },
            { title:"Press to toggle this job's JUNK status." }
            ];
            for (i = 0; i < classes.length; ++i) {
                var a = document.createElement('a');
                a.className = DB.JOBCOLS[i]+'-OFF';
                a.setAttribute('title', classes[i].title);
                a.setAttribute('href', '#');
                a.appendChild( document.createTextNode('\u00a0') );  // &nbsp;
                TD.appendChild(a);
            }
        }

        // retrieve the anchor element which contains the jobid
        var a = DOM.xpath1(xplink, row);    if (!a) { return false; }

        // retrieve the jobid from the link's href
        var jobid = a.getAttribute('href'); if (!jobid) { return false; }
        jobid = jobid.match(reid);          if (!jobid) { return false; }
        jobid = jobid[1];                   if (!jobid) { return false; }
        
        // retrieve any jobinfo stored for that jobid
        var jobinfo = DB.Fetch(jobid);

        // clone the template node
        var td = TD.cloneNode(true);
        td.setAttribute('jobid', jobid);

        // update the icons to reflect the info from the db
        // and add click handlers for each of the icons
        var jobcols = DB.JOBCOLS;
        var icons = DOM.xpath('.//a', td);       
        for (i = 0; i < icons.length; ++i) {
            DOM.addEvent(icons[i], 'click', statusIconClick);
            if (jobinfo && jobinfo[ jobcols[i] ]) icons[i].className = jobcols[i]+'-ON';
        }

        // insert status icons as first col in row.  so traverse
        // to the beginning of the row
        if (row.nodeName.toLowerCase() != 'tr') row = DOM.findParent(row, 'tr');
        row.insertBefore(td, row.firstChild);

        return true;
    }
    
    //
    // Actual Entry-Point
    //

    // add global styles for the markup we're going to introduce
    addStyles();
    
    var key;
    if (0) {
        key = 'osp.its.state.nc.us';
    } else {
        key = window.location.host;
    }
    key = key.toLowerCase();   
    GM_log('JobsDBKey: '+key);

    // now that we have the db key, set SITEPROPS to the relevant
    // site properties and convert any properties from strings to
    // objects.
    SITEPROPS = ALLSITEPROPS[key];
    SITEPROPS.jobidre = new RegExp(SITEPROPS.jobidre);

    // initialize DB
    DB.Init(key);

    // find each joblist in the page and apply the appropriate
    // patterns to lookup that joblist's jobids
    var pats = SITEPROPS.listpatterns;
    for (var p = 0; p < pats.length; ++p) {
        pats[p][2] = new RegExp( pats[p][2], "i");
        DOM.forEachMatch(
                          pats[p][0],
                          
                          function (row) {
                            addStatusIcons(row, pats[p][1], pats[p][2]);
                          }
                        );
    }
})();
