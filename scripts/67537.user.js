// ==UserScript==
// @name			Twitter atSuggest
// @namespace		twitter_atsuggest	
// @description		Provides a box of suggested names from the list of users you follow when you begin typing @xx in the status input on Twitter.
// @author			http://nateeagle.com
// @homepage		http://github.com/neagle/atSuggest
// @include			http://twitter.com/*
// ==/UserScript==

// console.debug('Loading...');

(function(){
var jQuery = unsafeWindow.jQuery;

var REGEX = /^@/;

function onReady(){
    // console.debug('Loaded!');
    loadTwitterUserNames(initializeEvents);
}

var Cookie = { 
    load: function() {
        Cookie.cookies = {}; 
        var rawCookies = document.cookie.split('; ');
        jQuery(rawCookies).each(function(i, item){
            var thisCookie = item.split('=');
            Cookie.cookies[thisCookie[0]] = thisCookie[1];
        }); 
    },  
    get: function(key) {
        return Cookie.cookies[key];
    },  
    set: function(key, value, expires) {
        var expires = expires || Cookie.expiry(1*24*60*60*1000);
        Cookie.cookies[key] = value;
        var setCookie = []; 
        setCookie.push(key + '=' + value);
        setCookie.push('expires=' + expires);
        setCookie.push('path=/');
        document.cookie = setCookie.join('; ');
    },  
    del: function(key) {
        Cookie.set(key, '', Cookie.expiry(-10000));
        delete Cookie.cookies[key];
    },  
    expiry: function(delta) {
        var now = new Date().getTime();
        var expires = new Date(now + delta); 
        return expires.toGMTString();
    }   
};

Cookie.load();

function uniquify(myArray) {
    result = []; 
    for(var i=myArray.length-1;i>=0;i--) {
        var val = myArray[i];
        if (result.indexOf(val) == -1) {
            result.push(val);
        }   
    }   
    return result.reverse();
}

function loadTwitterUserNames(callback) {
	// console.debug('Load Twitter User Names...');
    var TWITTER_USERNAMES = [];
    function loadFromAPI(cursorPosition, callback) {
		// console.debug('Loading from API...');
        var isFirstRequest = cursorPosition==-1;
        var remainingNames;
        // Get usernames
        jQuery.getJSON('/statuses/friends.json?lite=true&cursor='+cursorPosition,
            function(data) {
                remainingNames = data.next_cursor;
                jQuery.each(data.users, function(i, item) {
                    TWITTER_USERNAMES.push(this.screen_name);
                });//, completeTwitterUserNames(cursorPosition, remainingNames, callback));
                if (remainingNames == 0) {
                    TWITTER_USERNAMES = uniquify(TWITTER_USERNAMES);
                    TWITTER_USERNAMES.sort();
                    Cookie.set('TwitterAutoComplete', TWITTER_USERNAMES.toString());
                    callback(TWITTER_USERNAMES);
                } else {
                   cursorPosition--;
                   loadFromAPI(cursorPosition, callback);
                }
            });
    }
    function loadFromCookie(callback) {
		// console.debug('Loading from Cookie...');
        return Cookie.get('TwitterAutoComplete').split(',');
    }
    var cookieNames = Cookie.get('TwitterAutoComplete');
    if (cookieNames) {
        callback(cookieNames.split(','));
    } else {
        loadFromAPI(-1, callback);
    }
}

function initializeEvents(names) {
	// console.debug('Initialize Events...');
    var statusInput = jQuery('#status');
	// If user hits enter and there are suggested names displayed, complete with the first name displayed
	statusInput.bind('keypress', function(e) {
		if(e.keyCode == 13 && jQuery('#suggestedNames').length > 0) {
			jQuery('#suggestedNames li:first').click();
			return false;
		}	
	});
	// Attach autocompletion actions to keyup event
    statusInput.bind('keyup', function(e) {
        var ta = e.currentTarget;
        var taPreceedingWords = ta.value.slice(0, ta.selectionStart).split(' ');
        var taPreceedingWord = taPreceedingWords[taPreceedingWords.length - 1];
        if (taPreceedingWord.length > 1) {
            if(taPreceedingWord.match(REGEX)) {
                autoComplete(taPreceedingWord, ta.selectionStart, names);
                var cursorLocation = ta.selectionStart;
                jQuery('#suggestedNames li').click(function(){
                    var remainingName = jQuery(this).text();
                    remainingName = remainingName.substring(taPreceedingWord.length - 1);
                    ta.value = ta.value.substring(0, cursorLocation) + remainingName + ' ' + ta.value.substring(cursorLocation);
                    cursorLocation += remainingName.length + 1;
                    statusInput.focus().attr({'selectionStart' : cursorLocation, 'selectionEnd' : cursorLocation});
                    removePanel();
                });
            } else {
                removePanel();
            }

        } else {
            removePanel();
        }
    });
}

function autoComplete(word, index, names) {
    var name = word.substring(1);
    var r = new RegExp('^'+name);
    var matchList = [];
    jQuery.each(names, function(i, n){
        if(n.match(r)) {
			 matchList.push(n);
        }
    });
    if(matchList.length > 0) {
        showNames(matchList);
    } else {
        removePanel();
    }

}

function showNames(names) {
    // Styles for the AutoComplete Panel
    function stylePanel() {
        jQuery('#suggestedNames').css({
                'background-color' : '#fff',
                'border-right' : '1px solid #aaa',
                'border-bottom' : '1px solid #aaa',
                'border-left' : '1px solid #aaa',
                'cursor' : 'pointer',
                'left' : '76px',
                'margin-top' : '-1px',
                'padding' : '10px',
                'position' : 'absolute',
                'z-index' : '9999'
        });
    }
    var statusInput = jQuery('#status');
    if (jQuery('#suggestedNames').length == 0) {
        statusInput.after('<ul id="suggestedNames"></ul>');
        stylePanel();
    }
    var suggestedNames = jQuery('#suggestedNames');
    suggestedNames.empty();
    jQuery(names).each(function(i, n){
        suggestedNames.append('<li>' + n + '</li>');
    });
}

function removePanel() {
    jQuery('#suggestedNames').remove();
}

unsafeWindow.jQuery(document).ready(function() {
	onReady();
});

})();
