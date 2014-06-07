// ==UserScript==
// @name       V1 - Teamroom Filtering
// @namespace  jrioux
// @version    1.2
// @description  Allow filtering in the teamroom
// @match      https://www11.v1host.com/*/TeamRoom.mvc/Show/*
// @copyright  2013+, Jordan Rioux-Leclair
// ==/UserScript==

$(document).ready(function() {
    
    var FILTER_COOKIE_NAME = "teamFilteringUserIds";
    var FILTER_COOKIE_EXPIRES = 750;

    function isEmpty(str) {
    	return (!str || String(str).length === 0);
    }
    
    var CookieManager = (function () {
        return {
            getCookie: function (name) {
                var allCookies = document.cookie.split(';');
                var tempCookie = '';
                var cookieName = '';
                var cookieValue = '';
                var cookieFound = false;
    
                for (var i = 0, len = allCookies.length; i < len; ++i) {
                    tempCookie = allCookies[i].split('=');
                    cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
    
                    if (cookieName === name) {
                        cookieFound = true;
    
                        if (tempCookie.length > 1) {
                            cookieValue = unescape(tempCookie[1].replace(/^\s+|\s+$/g, ''));
                        }
    
                        return cookieValue;
                        break;
                    }
                    
                    tempCookie = null;
                    cookieName = '';
                }
    
                if (!cookieFound) {
                    return null;
                }
            },
            
            setCookie: function (name, value, expires, path, domain, secure) {
                var today = new Date();
                today.setTime(today.getTime());
    
                if (expires) {
                    expires *= (1000 * 60 * 60 * 24);
                }
    
                var expiresDate = new Date(today.getTime() + expires);
                document.cookie = (name + '=' + escape(value)
                                  + (expires ? (';expires=' + expiresDate.toGMTString()) : '')
                                  + (path ? (';path=' + path) : '')
                                  + (domain ? (';domain=' + domain) : '')
                                  + (secure ? ';secure' : ''));
            },
            
            deleteCookie: function (name, path, domain) {
                if (this.getCookie(name)) {
                    document.cookie = (name + '='
                                      + (path ? (';path=' + path) : '')
                                      + (domain ? (';domain=' + domain) : '')
                                      + ';expires=Thu, 01-Jan-1970 00:00:01 GMT');
                }
            }
        }
    })();
    
    var userNodes = $(".owner-list li.owner");
    
    // Polyfill for IE8 and below...
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict";
            if (this == null) {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[1]);
                if (n != n) { // shortcut for verifying if it's NaN
                    n = 0;
                } else if (n != 0 && n != Infinity && n != -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }
            return -1;
        }
    }
    
    function addStylesheet() {
        var STYLE_SHEET = '<style type="text/css">'
                        + '#top-bar .utility-bar .teamroom-filtering-button { cursor: pointer; display: inline; margin-right: 1em; }'
                        + '#top-bar .utility-bar .teamroom-filtering-button .handle { display: inline-block; zoom: 1; background: url(https://www11.v1host.com/s/13.1.4.28/css/images/arrows-10px.png) no-repeat scroll 0 0 transparent; height: 10px; width: 10px; margin-left: .2em; background-position: 0 -40px; }'
        				+ '#top-bar .utility-bar .teamroom-filtering-button .teamroom-filtering-menu { padding: 10px; background-color: #f2f2f2; border-width: 1px; border-color: #a6a6a6; border-bottom-color: #a6a6a6; color: #a6a6a6; -moz-box-shadow: inset 0 1px #fff; -webkit-box-shadow: inset 0 1px #fff; box-shadow: inset 0 1px #fff; border-style: solid; color: #454545; min-width: 120px; display: none; font-size: 1.25em; position: absolute; z-index: 5; }'        				
        				+ '#top-bar .utility-bar .teamroom-filtering-button .teamroom-filtering-menu .tf-holder { cursor: auto; float: left; width: 135px; margin-top: 10px; }'
        				+ '#top-bar .utility-bar .teamroom-filtering-button .teamroom-filtering-menu input { display: block; float: left; margin-bottom: 2px; margin-right: 4px; }'
        				+ '#top-bar .utility-bar .teamroom-filtering-button .teamroom-filtering-menu label { cursor: pointer; display: block; float: left; margin-bottom: 2px; margin-left: 4px;}'
                        + '</style>';
    
        $("body").append(STYLE_SHEET);
    }
    
    function addTeamroomFilteringMenu() {
        var newSubmenu = $('<div class="teamroom-filtering-menu"></div>');        
        var i = 0;
        var columnCount = 3;
        var memberCount = userNodes.length;
        var itemsPerColumn = Math.round((memberCount / columnCount));
        var holder;
        
        var actionsDiv = $('<div style="margin-bottom: 12px;"></div>');
        var selectAllElem = $('<a href="#select-all" style="display: inline-block; margin-right: 18px;">Select all</a>');
        var unselectAllElem = $('<a href="#unselect-all" style="display: inline-block;">Unselect all</a>');
        
        selectAllElem.click(function(event) {
            event.preventDefault();
            
            $('.teamroom-filtering-menu input[type="checkbox"]').each(function() {
            	$(this).attr("checked", "checked");
                $(this).change();
            });
        });
        
        unselectAllElem.click(function(event) {
            event.preventDefault();
            
            $('.teamroom-filtering-menu input[type="checkbox"]').each(function() {
            	$(this).removeAttr("checked");
                $(this).change();
            });                        
        });
        
        actionsDiv.append(selectAllElem);
        actionsDiv.append(unselectAllElem);
        
        newSubmenu.append(actionsDiv);
        newSubmenu.append("<h3><strong>Members</strong></h3>");
        
        userNodes.each(function(index) {
            if ((i % itemsPerColumn) === 0) {
            	holder = $('<div class="tf-holder"></div>');
            }
            
            var node = $(this);
            var memberName = $("span.name a", node).text();
            var memberId = node.attr("data-filterable-by").split(":")[1];
                            
            var checkbox = $('<input type="checkbox" id="tf-chk-' + memberId + '" value="' + memberId + '" />');
            var label = $('<label for="tf-chk-' + memberId + '">' + memberName + '</label>');
            
            var userIdsToFilter = CookieManager.getCookie(FILTER_COOKIE_NAME);
            if (!userIdsToFilter) {
                userIdsToFilter = "";
            }
            
            var userIdsToRemove = userIdsToFilter.split("|");
            if (userIdsToRemove.indexOf(memberId) === -1) {
				checkbox.attr("checked", "checked");
            } 
            
            (function(index, memberId) {
                checkbox.change(function() {
                    var node = $(userNodes.get(index));
					var userIdsToFilter = CookieManager.getCookie(FILTER_COOKIE_NAME);
                    if (!userIdsToFilter) {
                        userIdsToFilter = "";
                    }
                    
                    if ($(this).is(":checked")) {                                            
                        node.show();
						userIdsToFilter = userIdsToFilter.replace("|" + memberId, "").replace(memberId, "");                        
                    } else {
                        node.hide();
                        
                        if (userIdsToFilter.indexOf(memberId) === -1) {
                        	userIdsToFilter += ((isEmpty(userIdsToFilter)) ? memberId : "|" + memberId);
                        }
                    }

                    CookieManager.deleteCookie(FILTER_COOKIE_NAME, '/');
                    CookieManager.setCookie(FILTER_COOKIE_NAME, userIdsToFilter, FILTER_COOKIE_EXPIRES, '/');
                });
            })(i, memberId);
               
            
            holder.append(checkbox).append(label).append('<div style="clear: both;"></div>');
            ++i;
            
            if ((i % itemsPerColumn) === 0 || i === memberCount) {            	
                newSubmenu.append(holder); 
            }
        });      
        
        var newMenu = $('<div class="teamroom-filtering-button"></div>')
                      .append("<strong>Teamroom Filtering</strong>")
                      .append('<span class="handle"></span>')
                      .append(newSubmenu);
        
        $(newMenu).insertAfter("#launch-site-nav");
        
        $("html").click(function() {
        	$(newSubmenu).hide();
        });
        
        $(".teamroom-filtering-button").click(function(event) {
       		event.stopPropagation();
            
			// Quick and dirty...            
            if ($(event.target).parent().hasClass("teamroom-filtering-button")) {
            	$(newSubmenu).toggle();
            }
        });
    }
    
    function init() {
        if (!userNodes || userNodes.length === 0) {
        	return;
        }
        
        setTimeout(function() {
        	addStylesheet();
        	addTeamroomFilteringMenu();
        }, 0);
        
        setTimeout(function() {
            var userIdsToFilter = CookieManager.getCookie(FILTER_COOKIE_NAME);
                    
            if (!userIdsToFilter) {
                userIdsToFilter = "";
            }
            
            var userIdsToRemove = userIdsToFilter.split("|");
            
            // Hide all members that are found in the cookie
            if (userIdsToRemove && userIdsToRemove.length > 0) {
                userNodes.each(function() {
                    var node = $(this);
                    var memberId = node.attr("data-filterable-by").split(":")[1];

                    if (userIdsToRemove.indexOf(memberId) !== -1) {
                        node.hide();
                    }
                });      
            }
        }, 0);
    }

    $(document).ready(function(){
        init(); 
    });    
});