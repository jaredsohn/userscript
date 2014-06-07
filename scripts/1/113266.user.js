// ==UserScript==
// @name           Rainbowdash Columns
// @description    Reloads the post list on Rainbowdash.net on an interval and makes columns.
// @version        0.9.1
// @author		   Michael Shepard
// @include        http://*rainbowdash.net/
// @include        https://*rainbowdash.net/
// @exclude        http://*rainbowdash.net/settings/*
// @exclude        https://*rainbowdash.net/settings/*
// @exclude        http://*rainbowdash.net/notice/*
// @exclude        https://*rainbowdash.net/notice/*
// @exclude        http://*rainbowdash.net/main/*
// @exclude        https://*rainbowdash.net/main/*
// @exclude        http://*rainbowdash.net/doc/*
// @exclude        https://*rainbowdash.net/doc/*
// @exclude        http://*rainbowdash.net/search/*
// @exclude        https://*rainbowdash.net/search/*
// @exclude        http://*rainbowdash.net/group/*
// @exclude        https://*rainbowdash.net/group/*
// @exclude        http://*rainbowdash.net/tags/*
// @exclude        https://*rainbowdash.net/tags/*
// @exclude        http://*rainbowdash.net/favorited/*
// @exclude        https://*rainbowdash.net/favorited/*
// @exclude        http://*rainbowdash.net/attachment/*
// @exclude        https://*rainbowdash.net/attachment/*
// @exclude        http://*rainbowdash.net/background/*
// @exclude        https://*rainbowdash.net/background/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
/* Logs Information to the Console */
var logging = true
/* TODO:
   Make broken conversations posts still show
*/

function consoleLog(message) {
    if (logging) GM_log("RDN Columns: " + message)
}

consoleLog("Refresh Script Active")

var totalNew = lastPost = styleVar = 0
var hasFocus = true
var displayReply = true; //Used to replace the blip above the post field with what message is being replied to. 
var defaultVal = 30000; //Default Reload Interval. 
var docTitle = document.title; //Gets the natural document title.
var currentUser, timeout, clearContext

function toggleSettings(event){
    if(jQuery('#rdn_refresh').css('visibility') == 'hidden')
    {
        jQuery('#rdn_refresh').css('visibility','visible')
    }
    else
    {
        jQuery('#rdn_refresh').css('visibility','hidden')
    }
    menuoffset = jQuery('#settings_link').offset()
    jQuery('#rdn_refresh').css({'top': menuoffset.top + 24,
        'left': menuoffset.left})
    event.preventDefault()
}

function navPauseNow(event) {
        setValue('ReloadState', !GM_getValue('ReloadState', true))
        if (timeout) {
            clearTimeout(timeout)
        }
        updatePause()
        reload()
        parseLinks()
        event.stopPropagation()
        event.preventDefault()
    }

function replyListener(event) { /* Standard Link Cancellation */
    event.stopPropagation()
    event.preventDefault()

    var currentLink = this.href
    var currentLink_array = currentLink.split("replyto=")
/*  0:      url base
                1:      username&in
                2:      replyto=postid
            */
    var username = currentLink_array[1].split("&")
/*  0:      username
                1:      =
            */
    var postid = currentLink_array[2]

    /* New Function Call to Set the Post Data */
    setPost(postid.toString(), username[0], "")
}

try {
    currentUser = jQuery('#nav_personal a').attr('href').split('.net/')[1].split('/')[0]
} catch (err) {
    consoleLog('Error getting Username')
    currentUser = 'administrator'
}
initVar()
setup()
setFocusListeners()
createMenu()
updatePause()
jQuery(function () {
    reload(true)
})

/* Initialize the lastPost variable */

function setup() {
    updateStyle('post')
    updateStyle('user')
    addStyle('.dropDown { margin-left:30px }' + '.rdn_more { font-size:x-small }', 'dropDown')
    addStyle('#rdn_refresh { border-radius: 5px; z-index: 9000; position: absolute; top: 0px; left: 0px; background-color: #9AE4E8; visibility: hidden; }' + '.nav_next { float: left !important ; }' + '#site_nav_global_primary { float: left !important; }' + '#notice_data-text{ height: 50px !important; }' + '#wrap { min-width: none !important; max-width: none !important; }' + '#rdn_columns { float: left; }' + '#notices_primary { float: left !important ; width: auto !important; }' + '#content { width: 100% !important; padding: 10px 25px !important; }' + '.logo { float: left !important; width: 100px !important; }' + '#form_notice { float: left !important; clear: left; width: 600px !important; }' + '#content ol.xoxo { width: 300px !important; float: left !important; border: 2px solid #9AE4E8 !important; border-radius: 2px !important; }' + '.author {position: relative !important; left: -59px; }' + '.avatar {position: relative !important; left: 0px !important; top: 0px !important; clear: left !important; }' + '.entry-title {overflow: visible !important; }' + '.entry-content {display: block !important; }' + '.notice, .notices { padding-top: 1px !important; padding-left: 1px !important; margin-left: 1px !important; margin-top: 0px !important; }' + '#site_contact { margin: 0px !important; }', "mikesStyles")

    document.getElementById('notice_data-text').addEventListener('keyup', function (event) {
        contextClear(this)
    }, false)
    document.getElementById('notice_data-text').addEventListener('change', function (event) {
        contextClear(this)
    }, false)
    jQuery("#notices_primary ol").empty().attr('id', 'conversation-0')
    jQuery("#notices_primary").after('<div id="rdn_columns"></div>')
    blah = jQuery("#aside_primary").remove()
    blah.insertBefore("#footer")
}

function contextClear(target) {
    if (styleLookup('contextToggle', true) && (target.value == null || target.value == "")) {
        setPost("", "", "reset")
        consoleLog('CLEARED')
    }
}

/* Initialize the variables - To Ensure All Variables have a Default Value*/

function initVar() {
    GM_setValue('userHighlight', styleLookup('userHighlight'))
    GM_setValue('userHighlight', styleLookup('postHighlight'))
    GM_setValue('ReloadInterval', parseInt(getValue('ReloadInterval', defaultVal)))
    GM_setValue('ReloadState', GM_getValue('ReloadState', true))
    GM_setValue('originalToggle', GM_getValue('originalToggle', true))
    GM_setValue('showColumns', GM_getValue('showColumns', true))

    GM_setValue('post_a', styleLookup('post_a'))
    GM_setValue('post_hex', styleLookup('post_hex'))

    GM_setValue('user_bold', styleLookup('user_bold'))
    GM_setValue('user_italic', styleLookup('user_italic'))
    GM_setValue('user_color', styleLookup('user_color'))

    GM_setValue('slideToggle', styleLookup('slideToggle'))
    GM_setValue('contextToggle', styleLookup('contextToggle'))

    try {
        jQuery('#notice_data-text-label').mouseenter(function () {
            modifyDataText(false)
        }).mouseleave(function () {
            modifyDataText(true)
        })
    } catch (e) {
        consoleLog('notice_data-text-label could not be found')
    }
}

function modifyDataText(mouseOut) {
    if (a = document.getElementById('notice_data-text-label')) {
        if (mouseOut) {
            a.innerHTML = "What's up, " + currentUser + "?"
        } else {
            var inreplyto = document.getElementById('notice_in-reply-to').value
            a.innerHTML = 'inReplyTo: <div style="display:inline" id="replytoValue">None</div> (<a id="clearVal" href="javascript:void(0);">Clear</a>)'
            jQuery('a#clearVal').click(function () {
                setPost("", "", "reset")
                document.getElementById('replytoValue').innerHTML = 'None'
            })
            if (inreplyto) {
                try {
                    document.getElementById('replytoValue').innerHTML = '<a target="_blank" href="notice/' + inreplyto + '">' + inreplyto + '</a>'
                } catch (e) {}
            }
        }
    }
}

/* Calls a fresh version of the page information and replaces the 'ol' from the old with the new. */

function reload(forceReload) {
    if (GM_getValue("ReloadState", true) || forceReload) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: location.href,
            onerror: function (response) {
                consoleLog('Unknown Error fetching New Data')
            },
            onload: function (response) {
                oldPosts = newPosts = ''
                var holder = document.createElement('div')
                holder.innerHTML = response.responseText

                /* Passing the new page to post checker */
                getNewPosts(holder, true, "0")

                parseLinks()
                consoleLog('Post Reload Process')

            }
        })
        timeout = setTimeout(reload, getValue("ReloadInterval", defaultVal))
    }
}

/* Updates the javascript onClick handling for the in-page reply links */

function parseLinks() {
    var links = document.getElementsByClassName('notice_reply')
    for (var i = 0, imax = links.length; i < imax; i++) {
        links[i].removeEventListener('click', replyListener, false)
        links[i].addEventListener('click', replyListener, false)
    }
}

/* Scroll to Top and Append Field Data to Posting Element */

function setPost(inreplyto, username, content) {
    if (content == 'reset') {
        document.getElementById('notice_in-reply-to').value = ""; // Sets the internal reply value
    } else {
        window.scrollTo(0, 0); // Scrolls to position 0,0 
        document.getElementById('notice_data-text').focus(); // Ensures that the post box has focus
        document.getElementById('notice_in-reply-to').value = inreplyto; // Sets the internal reply value
        if (username != null && username.length > 0) {
            document.getElementById('notice_data-text').value = '@' + username + " " + content + document.getElementById('notice_data-text').value; // Updates the Post content with the user name (and optional content).
        } else {
            document.getElementById('notice_data-text').value = content + document.getElementById('notice_data-text').value; // Updates the Post content with the user name (and optional content).
        }
    }

}


/* Sets up the right hand menu for options */
function createMenu() {
    containerDiv = jQuery(document.createElement('div'))
    containerDiv.attr({
        'id': 'rdn_refresh',
        'class': 'section'
    })
    containerDiv.html('<h2>RDN Columns 0.9</h2>' + '<input name="reloadVal" size="4" value="' + parseInt(getValue("ReloadInterval", defaultVal) / 1000) + '"/>&nbsp;' + '<img style="display: inline; vertical-align: middle" id="nav_pause" alt="Pause" title="Pause AutoRefresh" width="16" height="16"/>' + '<div><input name="userHighlight" type="checkbox" value="userHighlight"/> Highlight User Mentions <a href="#" class="rdn_more" id="userToggle">config</a></div>' + '<div id="userHide" class="dropDown" style="display:none">' + '<input name="userHighlightBold" type="checkbox"/> Bold' + '<br/><input name="userHighlightItalic" type="checkbox"/> Italic' + '<br/><input name="userHighlightColor" size="6" value="' + styleLookup('user_color') + '"/>&nbsp; Color</div>' + '<div><input name="postHighlight" type="checkbox" value="postHighlight"/> Highlight New Posts <a href="#" class="rdn_more" id="postToggle">config</a></div>' + '<div id="postHide" class="dropDown" style="display:none">' + '<input name="postHighlightColor" size="6" value="' + styleLookup('post_hex') + '"/>&nbsp; Color' + '<br/><input name="postAlpha" size="6" value="' + styleLookup('post_a') + '"/>&nbsp; Alpha {0.0 - 1.0}</div>' + '<div><input name="contextToggle" type="checkbox" value="contextToggle"/> Clear Context After Post</div>' + '<div><input name="slideToggle" type="checkbox" value="slideToggle"/> Slide Animation</div>' + '<div><input name="originalToggle" type="checkbox" value="originalToggle" /> Keep Posts in the Main Column</div>' + '<div><input name="showColumns" type="checkbox" value="showColumns" /> Show Columns</div>' + '<div><a title="Report a Problem to ponydude2143&#10;&#13;You MUST be Logged In" name="report" href="">Report Problem</a></div>')

    /* Placing the Element As the Last within the Header */
    jQuery("#site_notice").remove()
    containerDiv.appendTo("#header")

    anotherDiv = jQuery(document.createElement('div'))
    anotherDiv.css('float','left')
    anotherDiv.attr({
        'id': 'rdn_columnindicatior',
        'class' : 'section'
    })
    anotherDiv.append(jQuery('#nav_pause').clone())
    anotherDiv.find('#nav_pause').attr('id', 'nav_pause2')
    anotherDiv.append('<a id="settings_link" href="#">RDN Columns Settings</a>')
    anotherDiv.insertAfter("#site_nav_global_primary")
    
    
    

    /* Sets the initial checkbox state */
    document.getElementsByName('userHighlight')[0].checked = GM_getValue('userHighlight', true)
    document.getElementsByName('postHighlight')[0].checked = GM_getValue('postHighlight', true)
    document.getElementsByName('userHighlightBold')[0].checked = styleLookup('user_bold')
    document.getElementsByName('userHighlightItalic')[0].checked = styleLookup('user_italic')
    document.getElementsByName('contextToggle')[0].checked = styleLookup('contextToggle')
    document.getElementsByName('slideToggle')[0].checked = styleLookup('slideToggle')
    document.getElementsByName('originalToggle')[0].checked = GM_getValue('originalToggle', true)
    document.getElementsByName('showColumns')[0].checked = GM_getValue('showColumns', true)

    /* Configures the JS calls for the Menu */
    document.getElementById('settings_link').addEventListener('click', toggleSettings, false)
    document.getElementsByName('userHighlight')[0].addEventListener('change', function (event) {
        setValue("userHighlight", !GM_getValue('userHighlight', true))
        updateStyle('user')
    }, false)
    document.getElementById('userToggle').addEventListener('click', function (event) {
        var target = document.getElementById('userHide')
        if (target.style.display == 'none') {
            //target.style.display = 'block'
            jQuery(target).slideDown(200)
        } else {
            //target.style.display = 'none'
            jQuery(target).slideUp(200)
        }
        event.stopPropagation()
        event.preventDefault()
    }, false)
    document.getElementsByName('userHighlightBold')[0].addEventListener('click', function (event) {
        setValue('user_bold', !styleLookup('user_bold'))
        updateStyle('user')
    }, false)
    document.getElementsByName('userHighlightItalic')[0].addEventListener('click', function (event) {
        setValue('user_italic', !styleLookup('user_italic'))
        updateStyle('user')
    }, false)
    document.getElementsByName('userHighlightColor')[0].addEventListener('change', function (event) {
        var hex = this.value.toString()
        if (hex.charAt(0) != '#') {
            hex = '#' + hex
        }
        setValue('user_color', hex)
        updateStyle('user')
    }, false)

    document.getElementsByName('postHighlight')[0].addEventListener('change', function (event) {
        setValue("postHighlight", !GM_getValue('postHighlight', true))
        updateStyle('post')
    }, false)
    document.getElementById('postToggle').addEventListener('click', function (event) {
        var target = document.getElementById('postHide')
        if (target.style.display == 'none') {
            //target.style.display = 'block'
            jQuery(target).slideDown(200)
        } else {
            //target.style.display = 'none'
            jQuery(target).slideUp(200)
        }
        event.stopPropagation()
        event.preventDefault()
    }, false)
    document.getElementsByName('postHighlightColor')[0].addEventListener('change', function (event) {
        setValue('post_hex', this.value)
        updateStyle('post')
    }, false)
    document.getElementsByName('postAlpha')[0].addEventListener('change', function (event) {
        setValue('post_a', this.value)
        updateStyle('post')
    }, false)

    document.getElementsByName('reloadVal')[0].addEventListener('change', function (event) {
        setValue('ReloadInterval', parseInt(this.value * 1000))
        consoleLog('Refresh Value: ' + parseInt(getValue('ReloadInterval', defaultVal)))
        if (timeout) {
            clearTimeout(timeout)
        }
        reload()
        event.stopPropagation()
        event.preventDefault()
    }, false)

    document.getElementById('nav_pause').addEventListener('click', navPauseNow, false)
    document.getElementById('nav_pause2').addEventListener('click', navPauseNow, false)

    document.getElementsByName('contextToggle')[0].addEventListener('change', function (event) {
        setValue("contextToggle", !GM_getValue('contextToggle', true))
    }, false)

    document.getElementsByName('slideToggle')[0].addEventListener('change', function (event) {
        setValue("slideToggle", !GM_getValue('slideToggle', true))
    }, false)

    document.getElementsByName('originalToggle')[0].addEventListener('change', function (event) {
        setValue("originalToggle", !GM_getValue('originalToggle', true))
    }, false)

    document.getElementsByName('showColumns')[0].addEventListener('change', function (event) {
        setValue("showColumns", !GM_getValue('showColumns', true))
        jQuery('#rdn_columns').empty()
        jQuery('#content_inner, #wrap').css('width','100%')
    }, false)

    document.getElementsByName('report')[0].addEventListener('click', function (event) {
        event.stopPropagation()
        event.preventDefault()
        setPost("", "ponydude2143", "#rdncolumnsBUG ")
    }, false)

}


/* Refreshes the state of the pause button */

function updatePause() {
    navPause = jQuery('#nav_pause, #nav_pause2')
    if (GM_getValue("ReloadState", true)) {
        navPause.attr('title', "Pause AutoRefresh")
        navPause.attr('alt', "Pause")
        navPause.attr('src', "http://i1196.photobucket.com/albums/aa412/haganbmj/pause_button.png")
    } else {
        navPause.attr('title', "UnPause AutoRefresh")
        navPause.attr('alt', "UnPause")
        navPause.attr('src', "http://i1196.photobucket.com/albums/aa412/haganbmj/play_button.png")
    }
}

/* Collects the new and old posts, which are stored to an array for comparison */

function getNewPosts(holder, isRoot, conversation) { /* Compiles an Array of NewPosts and an array of OldPosts */
    // If this is the primary column, the following lines will retreive the others
    if (isRoot && GM_getValue("showColumns",true)) {
    var newPosts = splicePosts(holder)
        // Get all the conversation ids currently on the page, then crunch them into a unique array.
        conversations = []
        jQuery(newPosts).each(function () {
            if (link = jQuery(this).find(".response").attr('href')) {
                conversations.push(link.split('/')[4].split('#')[0])
            if (!GM_getValue('originalToggle',true)) {
                jQuery(this).remove()
            }
            }
        })
        conversations = conversations.unique().sort(function(a,b){ return a - b })

        // Test for and remove obsolete columns 
        jQuery("#rdn_columns").children('ol').each(function () {
            if (this.length) {
                if (conversations.indexOf(this.attr('id').split('-')[1]) == -1) {
                    this.remove()
                }
            }
        })

        // If there are any conversations, make an xmlhttprequest for each one.
        if (conversations.length) {
            jQuery(conversations).each(function () {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://www.rainbowdash.net/conversation/' + this,
                    onerror: function (response) {
                        consoleLog('Unknown Error fetching New Data')
                    },
                    onload: function (response) {
                        var oldPosts = newPosts = ''
                        var holder = document.createElement('div')
                        holder.innerHTML = response.responseText


                        /* Passing the new page to post checker */
                        getNewPosts(holder, false, response.finalUrl.split('/')[4])

                        parseLinks()
                        consoleLog('Post Reload Process')
                    }
                })
            })
        }
    }



    /* Replacing Posts */
    //DO STUFF TO REPLACE INDIVIDUAL LI ELEMENTS - NOT BENEFICIAL. 
    /* Replaces the entire ol section ONLY if there are new posts (to save processing time) - temporary */
    newPosts = holder.getElementsByTagName('ol')[0]
    jQuery(newPosts).attr('id', 'conversation-' + conversation)
    oldPosts = document.getElementById(jQuery(newPosts).attr('id'))
    /* Convert the Post Arrays to ID Numbers for comparison */
    var newPostsID = toFlatArray(newPosts).sort(function(a,b){return a-b}).slice(jQuery(oldPosts).find('li').length)
    // If there are oldPosts relating to the new column, process them
    if (newPosts != null) {
        if (oldPosts != null) {
            if (jQuery(newPosts).attr('id') == 'conversation-0') {
                jQuery(oldPosts).remove()
                jQuery(newPosts).insertAfter('#notices_primary h2')
            }
            else if(jQuery(oldPosts).find('li').length != jQuery(newPosts).find('li').length) {
                jQuery(oldPosts).remove()
                displayColumn(newPosts)
            }
            }
            else {
        // If there aren't just add a new column
                displayColumn(newPosts)
            }
    } else {
        consoleLog('Error: newPosts null?')
    }

    /* Update the title and highlight new posts */
    if (newPostsID.length) {
        totalNew += newPostsID.length
        flashTitle(totalNew)
    }

    highlightPosts(newPostsID)
    highlightUsername()
}

/* Sorts the post threads most recent first and displays them*/

function displayColumn(thread) {
    jQuery(thread).find('ol, li').each(function () {
        adult = jQuery(this).parent()
        tot = jQuery(this).remove()
        tot.prependTo(adult)
    })
    jQuery(thread).prependTo("#rdn_columns")

    // Resize the box to fit the content
    var totWidth = 0
    jQuery('#notices_primary > ol, #rdn_columns > ol').each(function() {
        totWidth += jQuery(this).width()
    })
    totWidth += 100
    if(jQuery('#wrap').width() < totWidth)
    {
        jQuery('#wrap').width(totWidth)
    }
    jQuery('#content_inner').width(totWidth)
}

/* Converts a NodeList (Collection) To an Array */

function collectionToArray(collection) {
    var ary = []
    for (var i = 0, len = collection.length; i < len; i++) {
        ary.push(collection[i])
    }
    return ary
}

/* Splices an array of Posts down to the size of the valid posts */

function splicePosts(source) {
    var tempPosts = collectionToArray(source.getElementsByClassName('hentry notice'))
    var breakLocation = tempPosts.length
    for (var i = 0, tempSize = tempPosts.length; i < tempSize; i++) {
        if (tempPosts[i].getAttribute('id') != null) {
            continue
        } else {
            breakLocation = i
            break
        }
    }
    tempPosts.splice(breakLocation, (tempPosts.length - breakLocation))
    return tempPosts
}

/* Converts an Array of li's to flat post ids */

function toFlatArray(oldArray) {
    newArray = []
    jQuery(oldArray).find('li').each(function(){
        noticeID = jQuery(this)
        newArray.push(noticeID.attr('id').split('-')[1])
    })
    //consoleLog("New Post Array Created")
    return newArray
}

/* Checks if an array contains a specified value, and returns the index location if so 
				   If the array does /not/ contain the value, returns the total size of the array (last index + 1) */

function contains(value, array) {
    for (var i = 0, imax = array.length; i < imax; i++) {
        if (array[i] == value) {
            return i; //Return the position of the matched element
        }
    }
    consoleLog("Post Match Failed. Either there are 20 new messages, or the post has been deleted.")
    //return array.length
    return 0
}

/* Changes/Updates the Window Title if/when New Posts are Available */

function flashTitle(newTitle) {
    if (hasFocus || newTitle == "reset") { //Check if the Window is in Focus, if so - break the function. 
        document.title = "."
        document.title = docTitle
        totalNew = 0
    } else {
        document.title = "."
        document.title = "(" + newTitle + ") " + docTitle
    }
}

/* Highlights the newest posts (from the most recent refresh cycle) */

function highlightPosts(posts) {
    if(!posts)
    { 
        return
    }

    jQuery.each(posts, function(){
        jQuery('#notice-' + this).addClass('newPost')
    })

}

/* Scans the page for the current user's name, then applys a highlight */

function highlightUsername() {
    var mentionCounter = 0
    var posts = document.getElementsByClassName('fn nickname')
    for (var i = 0, imax = posts.length; i < imax; i++) {
        //consoleLog('username: ' + posts[i].innerHTML)
        if (posts[i].innerHTML.toLowerCase() == currentUser && (posts[i].getAttribute('class') == 'fn nickname')) {
            //posts[i].setAttribute('style', 'color:red; font-weight:bold;')
            posts[i].setAttribute('class', posts[i].getAttribute('class') + ' userHighlight')
            mentionCounter++
        }
    }
    consoleLog('Username: ' + currentUser + ', was mentioned ' + mentionCounter + ' time(s) on this page.')
}

function blurFunc() {
    hasFocus = false
    //consoleLog('event blur')
}

function focusFunc() {
    hasFocus = true
    flashTitle("reset")
}

function setFocusListeners() {
    jQuery(document).ready(function () {
        jQuery(window).bind("focus", function (event) {
            focusFunc()
        }).bind("blur", function (event) {
            blurFunc()
        })
    })

    /* Updates the title when the body of the page is clicked */
    jQuery('body').click(function () {
        flashTitle("reset")
    })
}

//$(window).blur(blurFunc).focus(focusFunc)
/*
	  _   _ _____ ___ _     ___ _____ ___ _____ ____  
	 | | | |_   _|_ _| |   |_ _|_   _|_ _| ____/ ___| 
	 | | | | | |  | || |    | |  | |  | ||  _| \___ \ 
	 | |_| | | |  | || |___ | |  | |  | || |___ ___) |
	  \___/  |_| |___|_____|___| |_| |___|_____|____/ 
													  
*/


/* Stores values as defined by the user */

function setValue(key, value) {
/*if (value == null || value <= 0) {
		value = defaultVal
	}*/
    //prefs[key] = value
    GM_setValue(key, value)
    consoleLog("Value: " + key + " - " + value)
}

/* Returns the value for reloadInterval only - Ensures that it is valid */

function getValue(key, value) {
    var checkVar = GM_getValue(key, value)
    if (checkVar == null || checkVar < 5000) {
        checkVar = value
    }
    var x = parseInt(checkVar)
    if (checkVar == x) {
        return checkVar
    } else {
        return value
    }
}

/* Add Custom CSS Styles - Appends them within the <head>
   Attempts to use the GM function, but will backup to page searching if necessary 
   Style is created with the ID >> "RDN_Style" + styleID << */

function addStyle(css, styleID) {
/*if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else */
    if (heads = document.getElementsByTagName('head')) {
        var style = document.createElement('style')
        try {
            style.innerHTML = css
        } catch (x) {
            style.innerText = css
        }
        style.type = 'text/css'
        style.id = 'RDN_Style' + styleID
        heads[0].appendChild(style)
        consoleLog('Style: ' + style.id + ' added.')
    }
}

/* Removes a style, by ID number. Used for when a new/updated Style is set into place. 
   Takes only the StyleID (number) as an input. */

function removeStyle(styleID) {
    if (style = document.getElementById('RDN_Style' + styleID)) {
        style.parentNode.removeChild(style)
        consoleLog('Style: ' + 'RDN_Style' + styleID + ' removed.')
    }
}

/* Appends sections after a targetElement ---- VOID */

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode
    if (parent.lastchild == targetElement) {
        parent.appendChild(newElement)
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling)
    }
}

function styleLookup(stylevar) {
    switch (stylevar) {
    case 'post_a':
        return GM_getValue('post_a', '0.25')
        break
    case 'post_hex':
        return GM_getValue('post_hex', '#efb61d')
        break
    case 'user_bold':
        var boolt = new Boolean()
        boolt = GM_getValue('user_bold', true)
        return boolt
        break
    case 'user_italic':
        var boolt = new Boolean()
        boolt = GM_getValue('user_italic', true)
        return boolt
        break
    case 'user_color':
        return GM_getValue('user_color', 'red')
        break
    case 'postHighlight':
        return GM_getValue('postHighlight', true)
        break
    case 'userHighlight':
        return GM_getValue('userHighlight', true)
        break
    case 'contextToggle':
        return GM_getValue('contextToggle', true)
        break
    case 'slideToggle':
        return GM_getValue('slideToggle', true)
        break
    }
}

function updateStyle(styleID) {
    removeStyle(styleID)
    switch (styleID) {
    case 'post':
        var rgb = hex2rgb(styleLookup('post_hex'))
        if (styleLookup('postHighlight')) {
            addStyle('.newPost, .newPost:hover { background-color: rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + styleLookup('post_a') + ') !important; }', 'post')
        }
        break
    case 'user':
        if (styleLookup('userHighlight')) {
            var weight = 'normal'
            var italic = 'normal'
            if (styleLookup('user_bold')) {
                weight = 'bold'
            }
            if (styleLookup('user_italic')) {
                italic = 'italic'
            }
            addStyle('.userHighlight { ' + 'color:' + styleLookup('user_color') + ';' + 'font-weight:' + weight + ';' + 'font-style:' + italic + '; }', 'user')
        }
        break
    }
}

/* Converts a hex string to an array RGB */

function hex2rgb(hex) {
    if (hex.charAt(0) == '#') {
        hex = hex.substring(1, hex.length)
    }
    var rgbArray = new Array(3)
    rgbArray[0] = parseInt(hex.substring(0, 2), 16)
    rgbArray[1] = parseInt(hex.substring(2, 4), 16)
    rgbArray[2] = parseInt(hex.substring(4, 6), 16)
    return rgbArray
}

Array.prototype.unique = function () {
    var a = []
    var l = this.length
    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            // If this[i] is found later in the array
            if (this[i] === this[j]) j = ++i
        }
        a.push(this[i])
    }
    return a
}
