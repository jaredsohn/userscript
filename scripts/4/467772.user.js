// ==UserScript==
// @name       Gamefaqs Quick PM and Quick Edit
// @namespace  N-eil
// @version    0.6
// @description  PM and edit from within topic in gamefaqs 
// @include *
// @grant		none
// @updateURL https://greasyfork.org/scripts/591-gamefaqs-quick-pm-and-quick-edit/code/Gamefaqs%20Quick%20PM%20and%20Quick%20Edit.user.js
// ==/UserScript==

if(document.getElementsByName('key').length) // Looks for the key, which is only included on the page if quickpost is available. Without the key, nothing in this script works, so the buttons are not added.
											// There doesn't seem to be a realistic fix for this.  
{
    var username = $(". a:first").html();
    username = username.substring(0,username.indexOf('(')-1);
    
    var $details = $(".msg_stats_left")
    ,	displayLeft = true;
    
    if (!$details.length){ //If nothing was found, they must have user details displayed above the message
        $details = $(".msg_stats");
        displayLeft = false;
    }
    
    $details.each(function(index, el) {
        var $el = $(el);
        if ($el.html().match(username))
        { //Ones with your username in them are your posts, and can be edited
            var editLink = $("<a> Edit </a>");
            editLink.click(function() {
                if (displayLeft)
                    showEditWindow($(el).closest(".msg").find(".msg_body").clone());
                else
                    showEditWindow($(el).closest(".top").next().find(".msg_body").clone());
            });
            $el.append(editLink);
        }
        else 
        { //Other ones are posts from other users, and they can be PM'd 
            var pmLink = $("<a> PM </a>");   
            pmLink.click(function() {showPMWindow($el.find("a.name").html());});
            $el.append(pmLink);
        }
            
    });
}
function createPopup(text){
	$("#popup-window").remove();
	var $window = $("<div id='popup-window'> " + text + " </div>")
		.css("left", "30%")
		.css("top","30%")
		.css("position", "fixed")
		.toggleClass("reg_dialog", true);
    $("body").append($window);
	return $window; 
}

function showPMWindow(name) {
    var $PMWindow = createPopup("Send a PM to " + name)
    ,   $subject = $("<div>Subject: <input type='text' maxlength='100' /></div>")
    ,   $message = $("<div><textarea rows='20' cols='80' maxlength='1024'></textarea></div>");
    
    var $send = $("<button style='margin: 5px;'>Send</button>").click(function() {sendPM(name, $subject.find("input").val(), $message.find("textarea").val()); setTimeout(function() {$PMWindow.remove();},5000);})
    ,   $cancel = $("<button style='margin: 5px;'>Cancel</button>").click(function() {$PMWindow.remove();});
    
    $PMWindow.append($subject).append($message).append($send).append($cancel);
}

function sendPM(name, subject, message) {
    var key = document.getElementsByName( 'key' )[0].value ; //A key unique to users required to post/PM
    name = name.slice(3,-4);
    $.post('/pm/new', {key: key, to: name, subject: subject, message: message, submit: 'Quick PM'}).done(function(){$("#popup-window textarea").val("PM sent.");});
}

function showEditWindow(message) {
        
    function stripTags(index, el) {
        //Function to strip out tags like links, TTI images, etc from the message.
            var $el = $(el);
            console.log(el);
            if ($el.hasClass("fspoiler"))  //Things hidden in spoilers get this class, but should be turned back into tags
                $el.replaceWith("<spoiler>" + $el.html() + "</spoiler>");
            else if ($el.is("img"))
                $el.replaceWith($el.attr("src"));
            else
                $el.replaceWith($el.html());
    }
    
    //Parse the HTML message back into the way it looks while a user is typing
    message.html(message.html().replace(/<br>(?:<\/br>)?/g, '\n'));
    var tags = [1];
    while (tags.length) {
        tags = message.find("a, span, img, video");
        tags.each(stripTags);
    }
    var reg = /\/(\d+)/g //Makes a regex to get board and message ID from the url
    ,	boardID = reg.exec(location.href)[1]
    ,	topicID = reg.exec(location.href)[1]
    ,	messageID = message.attr("name");    
	
    var $editWindow = createPopup("Edit your post")
    ,   $message = $("<div><textarea rows='20' cols='80' maxlength='4096'>" + message.html() + "</textarea></div>");
     
    var $send = $("<button style='margin: 5px;'>Send</button>").click(function() {makeEdit($message.find("textarea").val(), boardID, topicID, messageID);})
    ,   $cancel = $("<button style='margin: 5px;'>Cancel</button>").click(function() {$editWindow.remove();});
    
    $editWindow.append($message).append($send).append($cancel);
}

function makeEdit(message, board, topic, ID) {
    var url = "/boards/post.php?board=" + board + "&topic=" + topic + "&message=" + ID 
    ,	key = document.getElementsByName( 'key' )[0].value ; //A key unique to users required to post/PM
    $.post(url, {key: key, messagetext: message, post: 'Post without Preview'}).done(function() {location.reload();}).fail(function() {$("#popup-window textarea").val("Could not edit the post.  Are you sure you are within the 1 hour timeframe for edits?");});
}