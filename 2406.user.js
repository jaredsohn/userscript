//
//  Movie Find
//
// --------------------------------------------------------------------
//   Version:   2.1
//   Created:   12/20/2005
//   Updated:   3/7/2006 (updates listed below)
//   Author:    Travis J Kuhl (http://travisjkuhl.com)
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
// select "Movie Find", and click Uninstall.
//
// --------------------------------------------------------------------
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
//
// ==UserScript==
//
// @name          Movie Find
// @namespace     http://mf.travisjkuh.com
// @description   Provides search suggestions IMDb and RottenTomattos
// @include       http://imdb.com/*
// @include       http://www.imdb.com/*
// @include       http://us.imdb.com/*
// @include		  http://www.rottentomatoes.com/*
//
// ==/UserScript==
//
//
//  Updates:
// --------------------------------------------------------------------
//      1.0         First Release
//      1.1         Added deep linking for both IMDb & RT. Visit
//                  mf.travisjkuhl.com for more info.
//      2.0         Major update. Add search history to keep track
//                  of movies you've already searched for. View homepage
//                  for more info
//      2.0.1       Fixed to only show history when history is returned   
//      2.1         Now users can add movies and people
//      2.1.1       Changed history return type to go along with server
//                  update
//      2.1.2       IMDb changed their page. fix broken form.
// --------------------------------------------------------------------


    // Version
    var MF_VERSION      = "2.1.2";
    // Hold Vars
    var MF_SITE         = "";
    var MF_DB           = "";

    //
    // Movie Finder
    //
    var mf = {
    
        //
        // Init for Rottentomattos
        //
        initRT: function() {
       
            // get our search box
            var box = document.forms.namedItem('searchform').elements.namedItem('search');

            // if we have a box
            if ( box ) {

                // attach our envents
                box.addEventListener('keydown', mf.fetchMovies, false);
                box.addEventListener('keypress', mf.keyPress, false);
                box.addEventListener('blur', mf.blur, false);

                // give the box an id
                box.setAttribute('id','mf_str');

                // get top and left
                top = mf.getPos(box,'top') + 25;
                left = mf.getPos(box,'left');

                // general init
                mf.init(top,left);

            }

        },

        //
        // Init for IMDb
        //
        initIMDb: function() {

            // Get All Inputs
            //  -> Get all inputs so we can look for the one we want
            var inputs = document.getElementsByTagName('input');
            
                // top & left
                var top = 0;
                var left = 0;

                // For All Inputs
                // -- Go through and do what we will
                for ( var i = 0; i < inputs.length; i++ ) {
                    if ( inputs[i].type == "text" && inputs[i].name == "q" && inputs[i].getAttribute('size') == 14 ) {
                        // Give it an ID
                        // -- Give the box an ID fore easier use later on
                        inputs[i].setAttribute('id','mf_str');

                        // Event Listener
                        // -- Fire our search on every key up
                        //    Close any results when we blur from input
                        //    PS: love not having to use a whole function to add events
                        inputs[i].addEventListener('keyup',mf.fetchMovies,false);
                        inputs[i].addEventListener('blur',mf.keyPress, false);
                        inputs[i].addEventListener('blur',mf.blur, false);

                        // Top & lLeft
                        // -- Get the top & left position of this element.
                        //    Used to position results box below find box
                        top = mf.getPos(inputs[i], 'top') + 25;
                        left = mf.getPos(inputs[i], 'left');
                    }
                }


           // init
           mf.init(top,left);

        },


        //
        // General Init
        //
        init: function(top,left) {

            // check
            var check = 0;
    
            // should we check the database
            if ( MF_SITE == 2 ) {
                   // rt movie
                   if ( document.location.href.indexOf("/m/") != -1 ) {
                       // check = 1;
                   }
                   // rt people
                   else if ( document.location.href.indexOf("/p/") != -1 ) {
                       // check = 2;
                   }
            }
            else {
                   // imdb movie
                   if ( document.location.href.indexOf("/title/") != -1 ) {
                        check = 1;
                   }
                   // imdb people
                   else if ( document.location.href.indexOf("/name/") != -1 ) {
                        check = 2;
                   }
            }

            // if we should check
            if ( check ) {
                // run check
                mf.dbCheck(check);
            }

            // create style element
            style = document.createElement('style');
            style.innerHTML = ' #mf_lm { position: absolute; display: none; top: 0px; left: 0px; padding: 4px; font-family: verdana; font-size: 7pt; background: red; color: #fff; } ' +
                              ' #mf_rb { position: absolute; display: none; top: '+top+'px; left: '+left+'px; border: solid 1px #000; background: #fff; padding: 5px; font-family: verdana; font-size: 8pt; } ' +
                              ' #mf_rb ul { list-style: decimal; margin: 0px; padding: 5px 0 0 30px; font-family: verdana; font-size: 8pt; } ' +
                              ' #mf_rb ul li a { color: #000; text-decoration: none; } ' +
                              ' #mf_rb ul li a:hover { text-decoration: underline; }' +
                              ' #mf_add { position: absolute; display: none; top:0; right:0; font-family: verdana; font-size:8pt; padding:5px; background: url(http://mf.travisjkuhl.com/html/images/add-bg.jpg) no-repeat; width:200px; height: 35px; text-align: center; } ' +
                              ' #mf_add a { display: blcok; color: #fff; padding: 0px 6px 0 0; text-decoration: none; line-height: 20px; }';


            // append style to header
            document.getElementsByTagName('head')[0].appendChild(style);

            // add our divs
            mf_lm = document.createElement('div');
            mf_lm.setAttribute('id','mf_lm');
            mf_lm.innerHTML = "Loading...";
            
            // rb 
            mf_rb = document.createElement('div');
            mf_rb.setAttribute('id','mf_rb');
    
            // add
            mf_add = document.createElement('div');
            mf_add.setAttribute('id', 'mf_add');
            mf_add.innerHTML = "Add This Movie";

            // append
            document.getElementsByTagName('body')[0].appendChild(mf_lm);
            document.getElementsByTagName('body')[0].appendChild(mf_rb);
            document.getElementsByTagName('body')[0].appendChild(mf_add);

        },



        //
        // fetch movies
        //
        fetchMovies: function() {

            // check for string
            var str = document.getElementById('mf_str').value;

            // if string run ajax
            if ( str ) {

                // build url
                var url = "http://mf.travisjkuhl.com/server.php?str="+str+"&db="+MF_DB;

                // Make Request
                // -- Use GM built in xmlHttpRequest function to get movies list
                //    from the remote server.
                GM_xmlhttpRequest({
                  method:"GET",
                  url: url,
                  headers:{
                    "User-Agent":"monkeyagent",
                    "Accept":"text/xml",
                    },
                  onload:function(details) {
                        // parser
                        var dom = new XML(details.responseText.replace(/<\?xml.*?\?>/g, ""));
                        // give to function with parse
                        mf.displayMovies(dom);
                  },
                  onerror:function(details) {
                    // call internal error
                    mf.error(details);
                  }
                });

            }

            // show loading message
            document.getElementById('mf_lm').style.display = "block";

        },


        //
        // Display Movies
        //
        displayMovies: function(dom) {

            // rb
            var rb = document.getElementById('mf_rb');

            // holder
            var list = "";

            // check for dom
            for ( var i = 0; i < dom..movie.length(); i++ ) {
                // get vars
                var mfid    = dom..movie[i].mfid;       // mfid
                var title   = dom..movie[i].title;      // title
                var dl      = dom..movie[i].dl;         // deep link

                // which site
                if ( MF_SITE == 2 ) {
                    list += "<li> <a id='mf_r_"+i+"' href='javascript:void(0);' onclick=\"window.location.href='http://mf.travisjkuhl.com/history?gt=rt&id="+mfid+"&dl="+dl+"';\">"+title+"</a> (<a href='http://www.travisjkuhl.com/mf/history?gt=imdb&id="+mfid+"'>IMDb</a>) </li>";
                }
                else {
                    list += "<li> <a id='mf_r_"+i+"' href='javascript:void(0);' onclick=\"window.location.href='http://mf.travisjkuhl.com/history?gt=imdb&id="+mfid+"&dl="+dl+"';\">"+title+"</a> (<a href='http://www.travisjkuhl.com/mf/history?gt=rt&id="+mfid+"'>RT</a>) </li>";
                }
            }

            // show box
            rb.style.display = "block";

            // do we have results
            if ( dom..movie.length() > 0 ) {
                rb.innerHTML = ' <b> Movies: </b> ' +
                               ' <ul> ' + list + ' </ul> ';
            }
            // no results
            else {
                rb.innerHTML = ' No Results ';
            }

            // check for history
            if ( dom..history.length() > 0 ) {
                var list_h = "";
                for ( var j = 0; j < dom..history.length(); j++ ) {
                    list_h += ' <li><a href="'+dom..history[j].url+'">'+dom..history[j].h_title+'</a></li>';
                }
                rb.innerHTML += ' <br/><b> History </b> ' +
                                '  <ul> ' + list_h +
                                '   <li> <a style="font-style:italic" href="http://mf.travisjkuhl.com/me/'+dom.@sid+'">See All</a> </li> ' +
                                '  </ul> ';

            }

            // Version Tracker
            if ( MF_VERSION < dom.@version ) {
                rb.innerHTML += " <div style=' border-top:dotted 1px #888;text-align:center;color:#888;margin-top:10px;padding-top:5px'><a style='color:#888' href='http://mf.travisjkuhl.com'>New Version Available: "+dom.@version+"</a> </div> ";
            }

            // hide loading
            document.getElementById('mf_lm').style.display = "none";

        },


        //
        // dbCheck
        // 
        dbCheck: function(type) {
  
            // build url
            var url = "http://mf.travisjkuhl.com/inc/update-ajax.php?do=check&type="+type+"&site="+MF_SITE+"&url="+document.location.href;

            // Make Request
            // -- Use GM built in xmlHttpRequest function to get movies list
            //    from the remote server.
            GM_xmlhttpRequest({
              method:"GET",
              url: url,
              headers:{
                "User-Agent":"monkeyagent",
                "Accept":"text/xml",
                },
              onload:function(details) {
                    // parser
                    var dom = new XML(details.responseText.replace(/<\?xml.*?\?>/g, ""));
                    // give to function with parse
                    mf.displayCheckResults(dom);
              },
              onerror:function(details) {
                // call internal error
                mf.error(details);
              }
            });

        },


        //
        // displayCheckResults
        //
        displayCheckResults: function(dom) {
            // do our check
            if ( dom.@r == 0 ) {
               // hold vars
               var url = document.location.href;
               var what;

               // title
               var title = escape(document.getElementsByTagName('title')[0].innerHTML);

                // type
                if ( dom.@type == 2 ) {
                    what = "Person";
                }
                else {
                    what = "Movie";
                }

                // show them
                document.getElementById('mf_add').innerHTML = '<a href="#" onclick=\'window.open("http://mf.travisjkuhl.com/update?type='+dom.@type+'&title='+title+'&site='+MF_SITE+'&url='+url+'","Update","width=600,height=500");\' >Add This '+what+' to MovieFind</a> ';
                document.getElementById('mf_add').style.display = "block";
             
            }
        },

        //
        // error
        //
        error: function(details) {
            // pass an error to the
            // results box
            d.getElementById('mf_rb').innerHTML = ' <div style="align:center"> ' +
                                                  '  <b style="color:red"> Error </b> <br/> ' +
                                                  '  There was an error processing your <br/> ' +
                                                  '  request. The server might be down. <br/> ' +
                                                  '  Please try again ' +
                                                  ' </div> ';
        },


        //
        // blur
        //
        blur: function() {
            // avoid good blurs like clicking on a link
            window.setTimeout(function() { document.getElementById('mf_rb').style.display = "none" }, 10000 );
        },


        //
        // keyPress
        //
        keyPress: function(event) {
            if ( event.keyCode == 9 ) {
                if ( document.getElementById('mf_r_0') ) {
                    document.getElementById('mf_r_0').focus();
                    return false;
                }   
            }
        },


        //
        // Get Position
        //
        getPos: function( el, type ){
            var total = ( type == "left" ) ? el.offsetLeft : el.offsetTop;
            var parentEl = el.offsetParent;
                while ( parentEl != null ){
                    total = ( type == "left" ) ? total + parentEl.offsetLeft : total + parentEl.offsetTop;
                    parentEl = parentEl.offsetParent;
                }
            return total;
        },  // END getPos          


        //
        // Create Cookie
        //
		createCookie: function(name,value,domain,days,path,secure) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
            // exp
            var curCookie = name + "=" + escape(value) +
                ((expires) ? "; expires=" + expires : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                ((secure) ? "; secure" : "");
            document.cookie = curCookie;
		},  // END createCookie


        // 
        // Read Cookies
        //
		readCookie: function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++)
			{
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}   // END readCookie

    }


    // figure what to load
    if ( window.location.href.indexOf('rottentomatoes.com') != -1 ) {
        // pick the site
        MF_SITE = "2";
        // pick the db
        MF_DB   = "rt";
        // init rt
        window.addEventListener('load', mf.initRT, false);
    }
    else {
        // pick the site
        MF_SITE = "1";
        // pick the db
        MF_DB   = "imdb";
        // init imdb
        window.addEventListener('load', mf.initIMDb, false);
    }
