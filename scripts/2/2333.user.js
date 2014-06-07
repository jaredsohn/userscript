// ==UserScript==
//
// @name          IMDb Suggest
// @namespace     http://beta.travisjkuh.com/imdbSuggest
// @description   Provides search suggestions on IMDb
// @include       http://imdb.com/*
// @include       http://www.imdb.com/*
//
// ==/UserScript==

/*
 *
 *  IMDb Suggest
 *  --------------------------------------------------------------------
 *      Version:            0.9.4 Beta
 *      Date Created:       12/12/2005 
 *      Last Updated:       12/18/2005
 *      Author:             Travis J Kuhl (http://www.travisjkuhl.com)
 *
 *
 *  Updates:
 *  --------------------------------------------------------------------
 *      0.9.1       Added getAttribute('size') == 14 to make sure 
 *                  we attach the event to the right 'for' input
 *      0.9.2       Fixed some spelling errors. Fixed small CSS problems
 *      0.9.3       More CSS fixes. Added version tracking.
 *      0.9.4       Now hitting tab for form field will give focus to first result. Also
 *                  fixes version tracker
 */ 

    // Version
    var IMDB_SUGGEST_VERSION    = "0.9.4";


    // 
    // Main Class
    //
    var imdbSuggest = {

        //
        // ini
        //
        init: function() {

            // Get All Inputs
            // -- Get all inputs so we can look for the one we want
            var inputs = document.getElementsByTagName('input');
            
                // top & left
                var top = 0;
                var left = 0;

                // For All Inputs
                // -- Go through and do what we will
                for ( var i = 0; i < inputs.length; i++ ) {
                    if ( inputs[i].type == "text" && inputs[i].name == "for" && inputs[i].getAttribute('size') == 14 ) {
                        // Give it an ID
                        // -- Give the box an ID fore easier use later on
                        inputs[i].setAttribute('id','findBox');

                        // Event Listener
                        // -- Fire our search on every key up
                        //    Close any results when we blur from input
                        //    PS: love not having to use a whole function to add events
                        inputs[i].addEventListener('keyup',imdbSuggest.fetchSuggestions,false);
                        inputs[i].addEventListener('blur',imdbSuggest.blurSuggestions, false);
                        inputs[i].addEventListener("keypress",imdbSuggest.keyPress, false);

                        // Top & lLeft
                        // -- Get the top & left position of this element.
                        //    Used to position results box below find box
                        top = imdbSuggest.getPos(inputs[i], 'top') + 25;
                        left = imdbSuggest.getPos(inputs[i], 'left');
                    }
                }

            // Style
            // -- Add a style sheet for loading message & results box
            var StyleSheet = document.createElement('style');
                StyleSheet.setAttribute('type','text/css');
                StyleSheet.innerHTML = ' #LoadingMessage { display: none; position: absolute; top: 0px; left: 0px; width: 75px; padding: 5px; background: red; font-family: verdana,arial; font-size: 10pt; color: #fff; } ';
                StyleSheet.innerHTML += ' #ResultsBox { text-align: left; display: none; position: absolute; background: #FFFFCC; border: solid 1px #000; font-family: verdana; font-size: 8pt; padding: 5px; } #ResultsBox ul {    list-style: none; margin: 0px; padding: 5px 0 5px 5px; } #ResultsBox ul li a {  color: #000;    text-decoration: none; } #ResultsBox ul li a:hover {    text-decoration: underline; } ';

                // Append it
                document.getElementsByTagName('head')[0].appendChild(StyleSheet);

            // Loading Message
            // -- Create a loading Message 
            var loadingMessage = document.createElement('div');
                loadingMessage.innerHTML = "Loading...";            // it's message
                loadingMessage.setAttribute('id','LoadingMessage'); // ID for easy access

                // Append it
                document.getElementsByTagName('body')[0].appendChild(loadingMessage);

            // Results Box
            // -- Create the div where results will be displayed
            var resultsBox = document.createElement('div');
                resultsBox.setAttribute('id','ResultsBox');
                resultsBox.style.top = top;
                resultsBox.style.left = left;
                
                // Append it
                document.getElementsByTagName('body')[0].appendChild(resultsBox);

        },

        fetchSuggestions: function() {

            // focus is on string
            FOCUS_ON_STRING = 1;

            // Loading Message
            // -- Get our loading message
            var loadingMessage = document.getElementById('LoadingMessage');
                loadingMessage.style.display = "block";             // show the loading message


            // Get String
            // -- Get what they've typed so far
            var string = document.getElementById('findBox').value;
    
            // Check For String
            // -- Only send with a string
            if ( string.length > 0 ) {
                // Make Request
                // -- Use GM built in xmlHttpRequest function to get movies list
                //    from the remote server.
                GM_xmlhttpRequest({
                  method:"GET",
                  url:"http://www.travisjkuhl.com/beta/imdbSuggest/imdbSuggestRemoteServer.php?str="+string,
                  headers:{
                    "User-Agent":"monkeyagent",
                    "Accept":"text/xml",
                    },
                  onload:function(details) {
                        // parser
                        var dom = new XML(details.responseText.replace(/<\?xml.*?\?>/g, ""));
                        // give to function with parse
                        imdbSuggest.displaySuggestions(dom);
                  }
                });
            }

            // No string so hide loading
            else {
                loadingMessage.style.display = 'none';
            }

        },

        displaySuggestions: function(dom) {

            // Get Results box
            // -- we also need to show it
            var resultsBox = document.getElementById('ResultsBox');
                resultsBox.style.display = "block";
        
                    // MovieList
                    var MovieList = "";

                // For all
                // -- Flip through all movies
                for ( var i = 0; i < dom..movie.length(); i++ ) {
                    var thisId = dom..movie[i].id;
                    var thisTitle = dom..movie[i].title;
                    MovieList += "<li> <b>&#187;</b> <a href='http://www.imdb.com/title/tt"+thisId+"'>"+thisTitle+"</a></li>";
                }

            // do we have results to display
            if ( dom..movie.length() > 0 ) {
                // Display Results
                resultsBox.innerHTML = " <b>Suggestions</b> <ul id='resultList'><li><a id='firstResult' href=''></a></li> " + MovieList + " </ul> ";
            }
            else {
                resultsBox.innerHTML = " <span style='color:#888'>Sorry... No Results</span> ";
            }

            // check our version
            if ( IMDB_SUGGEST_VERSION < dom.@version ) {
                resultsBox.innerHTML += " <div style=' border-top:dotted 1px #888;text-align:center;color:#888;margin-top:10px;padding-top:5px'><a style='color:#888' href='http://beta.travisjkuhl.com/imdbSuggest'>New Version Available: "+dom.@version+"</a> </div> ";
            }

            // Loading Message
            // -- Hide our loading message since everything's done
            var loadingMessage = document.getElementById('LoadingMessage');
                loadingMessage.style.display = "none";              // hide the loading message

        },

        // blurSuggestions
        blurSuggestions: function() {
            // avoid good blurs like clicking on a link
            window.setTimeout(function() { document.getElementById('ResultsBox').style.display = "none" }, 9000 );
        },
        
        // Get Pos
        getPos: function( el, type ){
            var total = ( type == "left" ) ? el.offsetLeft : el.offsetTop;
            var parentEl = el.offsetParent;
                while ( parentEl != null ){
                    total = ( type == "left" ) ? total + parentEl.offsetLeft : total + parentEl.offsetTop;
                    parentEl = parentEl.offsetParent;
                }
            return total;
        },

        keyPress: function(event) {   
            if ( event.keyCode == 9 ) {
                if ( document.getElementById('firstResult') ) {
                    document.getElementById('firstResult').focus();
                    return false;
                }   
            }
        }

    }

    // Add Event Listener
    // -- Call the init class to start
    //    the onload
    window.addEventListener("load", imdbSuggest.init, false);
    

