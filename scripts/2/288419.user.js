// ==UserScript==
// @name          Twitch.TV - Pause Chat
// @version       2.0
// @description   Pause/Resume Twitch Chat [Hotkey: Pause/Break key] - CODE BASED OFF: Twitch.TV Chat Pauser (http://userscripts.org/scripts/show/153305) by wn_
// @author        wn_ & jim
// @include       http://twitch.tv/*
// @include       http://*.twitch.tv/*
// @updateURL     https://userscripts.org/scripts/source/288419.meta.js
// @grant         none
// ==/UserScript==


// jQuery window onChange plugin
if ( typeof(jQuery) == "function" && typeof(jQuery.windowLocationChange) == "undefined" ) {  
    // http://www.bennadel.com/blog/1520-Binding-Events-To-Non-DOM-Objects-With-jQuery.htm
    // Our plugin will be defined within an immediately
    // executed method.
    (function( $ ){
    	
		// Default to the current location.
		var strLocation = window.location.href;
		var strHash = window.location.hash;
		var strPrevLocation = "";
		var strPrevHash = "";
    
		// This is how often we will be checkint for
		// changes on the location.
		var intIntervalTime = 100;

		// This method removes the pound from the hash.
		var fnCleanHash = function( strHash ){
			return(
				strHash.substring( 1, strHash.length )
				);
		}
    
		// This will be the method that we use to check
		// changes in the window location.
		var fnCheckLocation = function(){
			// Check to see if the location has changed.
			if (strLocation != window.location.href){

				// Store the new and previous locations.
				strPrevLocation = strLocation;
				strPrevHash = strHash;
				strLocation = window.location.href;
				strHash = window.location.hash;
				// The location has changed. Trigger a
				// change event on the location object,
				// passing in the current and previous
				// location values.
				$( window.location ).trigger(
					"change",
					{
						currentHref: strLocation,
						currentHash: fnCleanHash( strHash ),
						previousHref: strPrevLocation,
						previousHash: fnCleanHash( strPrevHash )
					}
					);

			}
		}
            

        jQuery.windowLocationChange = {
            isRunning: true
        };          

    	// Set an interval to check the location changes.
    	setInterval( fnCheckLocation, intIntervalTime );

	})( jQuery );
}

window.ttvscas = { 

    settings: {
        HotKeyCode: 19 // Pause/Break key: https://en.wikipedia.org/wiki/Break_key
    },
    
    load: function () {
    
        setTimeout(function() {
                
            if ( typeof(jQuery) == "function" && jQuery("#twitch_chat").length > 0 && $("#twitchtvchatpauser").length == 0 && typeof(window.CurrentChat) == "object" && window.CurrentChat != null ) {
                
                ttvscas.loadStyles();
                
                $("#twitch_chat").append("<span id='twitchtvchatpauser'>");
                                            
                $("#twitchtvchatpauser").attr({
                    title: "Pause",
                    class: "ttcpPause"
                }).data({
                    paused: false,
                    queue: [],
                    oldInsert: window.CurrentChat.insert_with_lock
                }).on("click", function() {
                    paused = $(this).data("paused");
                    if (paused === true) {
                        ttvscas.chatResume();
                    } else {
                        ttvscas.chatPause();
                    }
                    return false;
                });
                
                $(document).keydown(function(e) {
                    //console.log(e.key + " / " + e.keyCode);
                    if ( e.keyCode == ttvscas.settings.HotKeyCode ) {
                        if ( $("#twitchtvchatpauser").data("paused") === true ) {
                             ttvscas.chatResume();
                        } else {
                            ttvscas.chatPause();
                        }
                    }
                });
                
                // Wrap CurrentChat.insert_with_lock() to queue chat inserts when paused
                window.CurrentChat.insert_with_lock = function() {
                    var $ttcp = $("#twitchtvchatpauser"),
                    args = Array.prototype.slice.call(arguments);
                    if ($ttcp.data("paused")) {
                        var newLen = $ttcp.data("queue").push(args);
                        //console.log("Added message to queue.  New length: " + newLen);
                    } else {
                        $ttcp.data("oldInsert").apply(window.CurrentChat, args);
                    }
                }
                
            }
             if ( typeof(jQuery) == "function" ) {
                jQuery(window.location).off("change", null, ttvscas.onChangeEvent);
                jQuery(window.location).on("change", null, ttvscas.onChangeEvent);
            }
                
        }, 2000);
 
    },
    
    onChangeEvent: function() {
        ttvscas.load();
    },
    
    chatPause: function () {
        $("#twitchtvchatpauser").data("paused", true);
        $("#twitchtvchatpauser").attr("title", "Resume"); 
        $("#twitchtvchatpauser").addClass("ttcpResume");
        $("#twitchtvchatpauser").removeClass("ttcpPause");        
    },
    
    chatResume: function () {
        $("#twitchtvchatpauser").data("paused", false);
        $("#twitchtvchatpauser").attr("title", "Pause");
        $("#twitchtvchatpauser").addClass("ttcpPause");
        $("#twitchtvchatpauser").removeClass("ttcpResume");         
        jQuery("#chat_lines").css("background-color","");
        var q = $("#twitchtvchatpauser").data("queue"),
        oldInsert = $("#twitchtvchatpauser").data("oldInsert")
        var t;
        //console.log("displaying " + q.length + " queued messages");
        while (t = q.shift()) {
          oldInsert.apply(window.CurrentChat, t);
        }
    },
        
    loadStyles: function() {
        if ( jQuery("body").hasClass("popout_chat") === true ) {
          ttvscas.addGlobalStyle("#twitchtvchatpauser { position: absolute; display: block; top: 5px; right: 25px; width: 20px; height: 20px; cursor: pointer }");      
        } else {
            ttvscas.addGlobalStyle("#twitchtvchatpauser { position: absolute; display: block; top: 5px; right: 10px; width: 20px; height: 20px; cursor: pointer }");
        }
        ttvscas.addGlobalStyle(".ttcpPause { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0"
            + "RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHoSURBVDjLpVM9awJBEB2DKIoocoI2goXVgVhoYam9bep0XqX+DU1pZ6Eh"
            + "pZ2FYGsnot2BqJUgaiGCd/j9tZlZvc2ZjyZZGPZmb+bNe49dC2MM/rOsXw9Go1EcQdMYSYwIDbheryruLdwb0Wi0Z663mBlgs4J5TpIk"
            + "2el0gt1u5+f7/R7W6zXMZrM+gpRisVhZNBEAxXA4VAaDgYbFjBbtuq4zTdPYbrfjZ5vNhnU6Ha3dbitGH2dwp/0eCoVkmrparQSweYjP"
            + "54PtdgvdbpeYvKRSqd4TFWCSJtpGc6FQgEqlKpqLxVeoVt8AGQFJCwaDMrJJCxPJMPpBWhEMboPZ/ZvxbwMMG8Hr9VJtks4MBhGafjgc"
            + "HigbAIRhnBGAy+WC8/kcEQBmrdR0+3402VxzPB7hdDqBmYFK5thstjsAExI+81szSV0ulwSgCoDL5dIigxwOBy+SJN+DBHLfYEE10+mU"
            + "JLSEiai9MR6Pn1Gb7Pf7QVEy4p7QBcpkbrnb7Yb5fA6qqvYxbQgGiUSih66W8JLoRM/j8YDVauWm0k5BzXgTodls6uhBCUF7365yvV5X"
            + "UFsuHA7LgUCAA6E8WCwWMJlM+GTMS/l8vvzjW6BVq9XiSDuNQPwxoVZuMkYLmTSy2ezvj+kv6wM24KX3CYk6PAAAAABJRU5ErkJggg=="
            + ") no-repeat; background-size: 20px }"
        + ".ttcpPause:hover { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/I"
            + "NwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJjSURBVDjLpZNLbxJhFIb7A/wF/A5YunTDzuqmO+PdsDFx"
            + "0dSVpJq4aIyQmUIU06a1gUqCJlXb1Ehb6QhiGgsdKFNAwAIOhWEcBobLUI5zPpgRLzsneRfz5bzPec93mQCAiXGdc4FJk0WTVdPUSNbR"
            + "munP+nHjGU3muy8lW+DjMR3ZTzMHiUMhziaF3b0U82InR0/76zaswdrfACPzWV+obI8fZjm+JoGs9EA9HRA1Wl0oVeoQ3mO5hc2sHWt1"
            + "iA4wo5lNfZXbHRXwU7p9qMs9EDQ1O32yJitd2I3GZM/6EULMBIBzYWzsrJurUhcqP7rAi0OVxQ6U6h0DsrkV5m6v8DiOCQGWAPONxti6"
            + "+eKDENxyJw3z5OwOXHclSBr8UrnvQPkjNHoRYA1/OWJwZoyKpgv3EZAgXYtCWwNsE0Ct0QOppcKJqMDi6msGvQiYih0kBNwsLEAAdryh"
            + "AY5rbaJJ+zZcm2dJOvzvqqew4l0V0EsA+3GWALAAu+qRsbhQbcP5e0G4Sg8B+C+1erC49NwAWD98TjKi3IGGog47ksgs5E8UyFUUDfCe"
            + "AHBj8WTSRREoj9cYweINZuhCqQaDAZAOGBeV5RUiNF+mWDJerz+ArU9JsLvfGptouuOr2oKhKCdIbeMkdKXLLeM40ZzRujufLHNX3Onh"
            + "MeoXiXoVt6+9C8l8vUmSiE2VpMEx8PjQnC7WweHxyTPU+q+LNH6V57xR+7J/jYvEMlDgJbInOHMyL8BGKA5z1AI37Xzz91Uef0w3n+Vt"
            + "s0836EeuJYaadwuPnbTw0OFhZhwB+hKd+vdj+p/n/BMZPwxzcSL1lgAAAABJRU5ErkJggg==) }"
        + ".ttcpResume { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl"
            + "0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHiSURBVDjLpZPLquJAEIbPQ+Wd8gAZnTirPIGIgiLoxo2iCxeuBJGgogg"
            + "q3trLwoX3a9R4QVGxpv/mJCJzOMMwDUVCur+/qv7qfBDRx//EHx/6/b7U6/W0brerdzodgzFmtFotvdlsavV6XfpWgMMyh9l6vabz+Uy"
            + "Px0PE6XSixWJBtVqNVSoV+UuBT9i8Xq+EhefhcCDTNOlyuYhvEC2Xy2apVJLfBD7LZha82+1ou91SPp8nwzBos9kQqrJEdF1n2WxWsgV"
            + "4v5p1wIIBOp0/KZfLCXi5XIrAGgwGlEqlNFuAm6VDGaUCtLI6HE4RPKOA4QP8QIJEIqHbAu1224BZ+/1ewMi4Wq047BDhcv2iarVKs9l"
            + "MCN1uN4pGo4YtwMckBFC+BeMgYFV1kaL8EHvT6dSuIhKJvAQajYYOx9GG1SsOqqr6Bk8mEzGZ4XBI4XD41QKfr4bN5/MpwPl8LspVFEX"
            + "A2BuPxzQajeh+v1OxWKRgMPgykc9VKhQKDB5gIRsCsAUiKxLgncOMh/R2kTKZjJxOp024j4PH49GuBpcJmSHCQdPn88lfXuVkMinH43H"
            + "GWxItwBP0jLljlBxkHo9H/vZnisViUigU0gKBgO73+w2v12twSHe73Rp/l/76N/5r/AZGRj/URbdFDAAAAABJRU5ErkJggg==) "
            + "no-repeat; background-size: 20px }"
        + ".ttcpResume:hover { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/"
            + "INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJfSURBVDjLpZNNbxJRFIb7A/wF/A5YunTDrpouujNxY8L"
            + "GxEVTVyU11UVjCmEsUUyb1gYqEWuqtqmRWukUimksH6UMHwIW6FCYwWFgYBjKcc6FGam68ybvZuY87/m4544BwNiobiyCQZVJlVnV5FD"
            + "m4TfDn/Gj4DVVxgdvBIvv4IwKHafp2MkpF40nuP2jJP1qL0dNeXkLxmDsFYMhfN0TKFujp1mGrQkgSl1QLvtEjZYMpQoPwaM4s7STtWK"
            + "sZqIZGBGOJ7+L7Y4CeCS5B7zYBU5Vs9Mj30RJhv1wRHRtpdDESAywLywbM2twVZCh8lOGt+EKsHUZyvUOlPiObrKzG2TurbHYjgENTD7"
            + "6B4Vlj8II3noYgI3DCoHPam0iPMncOTi8IQpZNDAHv6Vo7BlLRVDLenN2j+h1iCVwodoGoaXARV2C5fV3NLJoMBmJnXA4rFqjS2DMWOT"
            + "aKvyZaOJRCPwxDnIViRjJyiWsudc5ZInBcTRODLB8DcZAAs8dwPiMn/zLstKwii4sr7zUDcxfviboutiBhqTovWLgxBx9Bc6ct8jNpIt"
            + "1cLjcegsmtz9DFUo16PeBgPkLiZQ7PvOJwAimyy1IlVrQ7fVh9zABVucHfYiG+56qxR8IM5wwmDJmQyGsgclSkyTIqNntz1aZO8704Bq"
            + "1RXJsRK2bHwMiyw8C601FrwaXCTOnizzYXB5x2rH1e5FGV3neHbauejeZUCQDBVYgM8GeE3kOtgNRmHcsMVP293+v8uhjuvsib5l9vk0"
            + "9WVyhHU+d3IKd4h7bXPS0zUfdppL/fkz/85x/AR14FVfMwp4lAAAAAElFTkSuQmCC) }");
    },
        
    addGlobalStyle: function(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
};

ttvscas.load();