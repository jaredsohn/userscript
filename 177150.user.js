// ==UserScript== 
// @name        eHarmony Enhancer
// @author      Michael Soh 
// @namespace   eHarmony-Enhancer-JNZKWXMFD0
// @description Helps navigate eHarmony
// @version     0.4
// @license     GPL 3.0 
// @include     http://www.eharmony.com/singles/servlet/user/comm/review*
// @include     http://www.eharmony.com/singles/servlet/user/comm/messages*
//
// @grant       GM_log
//
//  
// ==/UserScript== 

var j$ = 0;
load_jQuery();


// =-=-=-=-=- MAIN FUNCTIONS -=-=-=-=-= //

function load_jQuery() {
    if (typeof unsafeWindow.jQuery !== "undefined") {
        if (typeof unsafeWindow.$ !== "undefined")
            j$ = unsafeWindow.$;
        else 
            j$ = unsafeWindow.jQuery.noConflict();

        GM_log("Loaded jQuery version: " + unsafeWindow.jQuery.fn.jquery);
        j$(window).load(function() { whereami(); });
    } else if (++j$ < 5) {
        GM_log('jQuery == ' + typeof unsafeWindow.jQuery);
        setTimeout(doDetect, 1500);
    } else {
        alert('jQuery could not be loaded.  Timed out: ' + j$);
    }
}

function whereami() {
    if (RegExp("review").test(window.location.href)) {
        enhance_profile();
    } else if (RegExp("messages").test(window.location.href)) {
        load_makes_breaks();
    }
}

// =-=-=- Enhance Profile -=-=-= //
function enhance_profile() {
    // Expand the stat box
    j$('div#stats-box').addClass('expanded');
    
    // Get activity information
    var uid = unsafeWindow.matchSummaryDefaultData.matchId;
    get_match_details(uid);

    // Stop annoying bouncing
    j$('div.bounce').removeClass('bounce');
}

// =-=- Expand Makes or Breaks -=-= //

function load_makes_breaks() {
    // Set page title
    var eh_constant = unsafeWindow.EH.Constants;
    document.title = "eH Msg: " + eh_constant.NAME_THEM + " from " + eh_constant.matchLocation;
    
    // if the communication loader is still there, we'll need to wait.
    if (j$('div.comm-loader').length > 0) {
        GM_log('Communication history not loaded...trying again.');
        setTimeout(load_makes_breaks, 1500);
    } else {
        // Labels for Makes/Breaks BEFORE being sent
        j$('div.comm-content-makes-cont').find('div.row').each(function() {
            j$(this).attr('title', get_title_description(j$(this).text()));
        });

        // event handler to edit
        j$('div.comm-content-makes').find('div[data-button="edit"]').click(function() {
            setTimeout(load_makes_breaks, 1500);
        });


        // Show titles of RECEIVED Makes/Breaks before YOU have sent
        // YOURS back
        if ((j$('div.comm-content-makes').find('div[data-button="edit"]').length == 0) && 
                (j$('div[data-pane="mustHave"]').length == 1)) {
            GM_log(j$('div[data-pane="mustHave"]').find('div.label').length);
            j$('div[data-pane="mustHave"]').find('div.label').each(function() {
                j$(this).attr('title', get_title_description(j$(this).text()));
            });
            j$('div[data-pane="cantStand"]').find('div.label').each(function() {
                GM_log(j$(this).text());
                j$(this).attr('title', get_title_description(j$(this).text()));
            });

            // Trigger on sending
            j$('div.comm-content-makes').find('div[data-button="send"]').click(function() {
                setTimeout(load_makes_breaks, 1500);
            });
            
            // Trigger on next
            j$('div.comm-content-makes').find('div[data-button="next"]').click(function() {
                setTimeout(load_makes_breaks, 1500);
            });
        }

        // If Makes or Breaks were already exchanged:
        j$('div[class^="col"]').each(function() {
            j$(this).attr('title', get_title_description(j$(this).text()));
        });

        j$('<input/>', {
            id: 'open_print',
            type: 'button',
            value: 'Print Communication',
            style: 'float: right'
        }).prependTo('div#comm-body').click(function() { open_print_communication(); });
    }
}


function open_print_communication() {
    j$('input#open_print').hide();
    j$('div#comm-body').css({'position': 'absolute', 'left': '0', 'top':'0', 'z-index': '100'});
    j$('<input/>', {
        id: 'close_print',
        type: 'button',
        value: 'Close Print Window',
        style: 'float: right;'
    }).prependTo('div#comm-body').click(function() { close_print_communication(); });

    setTimeout(window.print, 1000);
}

function close_print_communication() {
    j$('input#close_print').remove();

    j$('div#comm-body').css('position', 'static').css('left', 'auto').css('top', 'auto').css('z-index', 'auto');
    j$('input#open_print').show();
}


function get_title_description(title = "null") {
    var j = { "makesBreaks": [
    { "id": 1, "title": "Chemistry", "description": "I must feel deeply in love with and attracted to my partner.", "type": "mustHave", "category": "Traits" }, 
    { "id": 2, "title": "Communicator", "description": "I must have someone who is good at talking and listening.", "type": "mustHave", "category": "Traits" }, 
    { "id": 3, "title": "Sense of Humor", "description": "I must have someone who is sharp and can enjoy the humorous side of life.", "type": "mustHave", "category": "Traits" }, 
    { "id": 4, "title": "Verbal Intimacy", "description": "I must know that my partner is sharing their deepest emotional thoughts and desires.", "type": "mustHave", "category": "Traits" }, 
    { "id": 5, "title": "Emotionally Healthy", "description": "I must have a partner who is emotionally healthy, and able to share a stable life with someone else.", "type": "mustHave", "category": "Traits" }, 
    { "id": 6, "title": "Strong Character", "description": "I must have a partner who is honest and strong enough to do the right thing.", "type": "mustHave", "category": "Traits" }, 
    { "id": 7, "title": "Artistry", "description": "I must have a partner who has a passion for music, literature, drama, art, and the finer things in life either as a spectator or participant.", "type": "mustHave", "category": "Traits" }, 
    { "id": 9, "title": "Education", "description": "I must have someone whose educational achievements match my own.", "type": "mustHave", "category": "Traits" }, 
    { "id": 11, "title": "Exciting", "description": "I must have someone who isn't afraid to take a risk and who sees life as an adventure.", "type": "mustHave", "category": "Traits" }, 
    { "id": 12, "title": "Patience", "description": "I must have someone who can handle life's frustrations or momentary setbacks with a patient, steady, demeanor.", "type": "mustHave", "category": "Traits" }, 
    { "id": 14, "title": "Conflict Resolver", "description": "I must have a partner who will work to resolve rather than win arguments or conflicts within our relationship.", "type": "mustHave", "category": "Traits" }, 
    { "id": 16, "title": "Personal Habits", "description": "I must have a partner who maintains high standards of personal hygiene, orderliness, and other personal habits.", "type": "mustHave", "category": "Traits" }, 
    { "id": 17, "title": "Affectionate", "description": "I must have someone who is comfortable giving and receiving affection.", "type": "mustHave", "category": "Traits" }, 
    { "id": 19, "title": "Energy Level", "description": "I must have someone whose energy level matches my own.", "type": "mustHave", "category": "Traits" }, 
    { "id": 21, "title": "Intellect", "description": "I must have a partner who is bright and can share my understanding of the world as well as enjoy discussing important issues.", "type": "mustHave", "category": "Traits" }, 
    { "id": 22, "title": "Self-Confident", "description": "I must have a partner who knows and believes in himself/herself throughout life's ups and downs.", "type": "mustHave", "category": "Traits" }, 
    { "id": 24, "title": "Able to Accept Help", "description": "I must have a partner who is willing to accept outside help for personal or relationship issues that are serious and important.", "type": "mustHave", "category": "Traits" }, 
    { "id": 25, "title": "Curiosity", "description": "I must have a partner who is hungry for new information and knowledge and who strives to learn as much as possible.", "type": "mustHave", "category": "Traits" }, 
    { "id": 27, "title": "Adaptability", "description": "I must have a partner who is able to adapt to life's surprises.", "type": "mustHave", "category": "Traits" }, 
    { "id": 8, "title": "Kindness", "description": "I must have a partner who is gentle and kind.", "type": "mustHave", "category": "Traits" }, 
    { "id": 10, "title": "Organized", "description": "I must have a partner who values structure in their life.", "type": "mustHave", "category": "Traits" }, 
    { "id": 13, "title": "Tolerant", "description": "I must have a partner who is able to hear and appreciate divergent viewpoints.", "type": "mustHave", "category": "Traits" }, 
    { "id": 15, "title": "Attractiveness", "description": "I must have a partner who is considered 'very attractive' by most current standards.", "type": "mustHave", "category": "Traits" }, 
    { "id": 18, "title": "Industriousness", "description": "I must have someone who is willing to work hard at whatever they do.", "type": "mustHave", "category": "Traits" }, 
    { "id": 20, "title": "Emotionally Generous", "description": "I must have a partner who enjoys people and is generous with his or her compassion, attention, sympathies and love.", "type": "mustHave", "category": "Traits" }, 
    { "id": 23, "title": "Unassuming", "description": "I must have someone who is able to accept criticism, and even admit to being wrong sometimes.", "type": "mustHave", "category": "Traits" }, 
    { "id": 26, "title": "Loyal", "description": "I must have someone I can count on to always support me.", "type": "mustHave", "category": "Traits" }, 
    { "id": 29, "title": "Family Life", "description": "I must have a partner who is committed to marriage, home, and family.", "type": "mustHave", "category": "Values" }, 
    { "id": 31, "title": "Style and Appearance", "description": "I must have someone who cares about the way they look and dress and has a sense of personal style.", "type": "mustHave", "category": "Values" }, 
    { "id": 32, "title": "Shared Politics", "description": "I must have someone who has political beliefs which are the same or similar to my own.", "type": "mustHave", "category": "Values" }, 
    { "id": 33, "title": "Spirit of Volunteerism", "description": "I must have a partner who shares my willingness to volunteer and support community and/or social causes.", "type": "mustHave", "category": "Values" }, 
    { "id": 28, "title": "Autonomy", "description": "I must have a partner who will give me space to be my own person.", "type": "mustHave", "category": "Values" }, 
    { "id": 30, "title": "Shared Interests", "description": "I must have someone who is willing to share my interests and passions.", "type": "mustHave", "category": "Values" }, 
    { "id": 34, "title": "No Children", "description": "I must have someone who shares my desire to not have children.", "type": "mustHave", "category": "Family" }, 
    { "id": 35, "title": "Family", "description": "I must have someone who shares my desire to have or adopt children.", "type": "mustHave", "category": "Family" }, 
    { "id": 36, "title": "Stepchildren", "description": "I must have someone who will accept my children as their own.", "type": "mustHave", "category": "Family" }, 
    { "id": 38, "title": "Parent Care", "description": "I must have someone who is willing to help me take care of my parents, now or when the time comes.", "type": "mustHave", "category": "Family" }, 
    { "id": 37, "title": "Parenting Style", "description": "I must have someone who shares my views about how to raise children.", "type": "mustHave", "category": "Family" }, 
    { "id": 40, "title": "Sociability", "description": "I must have a partner who loves to socialize with lots of different people.", "type": "mustHave", "category": "Social Living" }, 
    { "id": 39, "title": "Staying In", "description": "I must have a partner who mainly enjoys staying in together and having quiet evenings alone or with close friends.", "type": "mustHave", "category": "Social Living" }, 
    { "id": 41, "title": "Spirituality", "description": "I must have someone with a similar deep commitment to spirituality, who shares my beliefs.", "type": "mustHave", "category": "Spirituality" }, 
    { "id": 43, "title": "Spiritual Acceptance", "description": "My partner must accept and respect my spiritual beliefs, whether they share them or not.", "type": "mustHave", "category": "Spirituality" }, 
    { "id": 42, "title": "Religious Practice", "description": "My partner must be committed to being an active member of a church or temple congregation.", "type": "mustHave", "category": "Spirituality" }, 
    { "id": 44, "title": "Responsible", "description": "My partner must be financially responsible.", "type": "mustHave", "category": "Financial" }, 
    { "id": 46, "title": "Relaxed", "description": "I must have a partner who is able to forget about money and focus on the important parts of life.", "type": "mustHave", "category": "Financial" }, 
    { "id": 45, "title": "Ambition", "description": "I must have a partner who shares my desire to achieve high financial and/or career goals.", "type": "mustHave", "category": "Financial" }, 
    { "id": 47, "title": "Abstinent", "description": "I must have a spouse who has saved himself/herself sexually for marriage.", "type": "mustHave", "category": "Sexuality" }, 
    { "id": 49, "title": "Sexually Knowledgeable", "description": "I must have someone who is mature and experienced as a potential sexual partner and is able to express himself/herself freely.", "type": "mustHave", "category": "Sexuality" }, 
    { "id": 48, "title": "Traditional", "description": "I must have someone who is reserved and traditional in their sexual needs.", "type": "mustHave", "category": "Sexuality" }, 
    { "id": 50, "title": "Passionate", "description": "I must have someone who is willing to explore our sexual desires with passion and understanding.", "type": "mustHave", "category": "Sexuality" }, 
    { "id": 51, "title": "Vanity", "description": "I can't stand someone who is overly interested in their physical appearance.", "type": "cantStand", "category": "Traits" }, 
    { "id": 52, "title": "Dependence", "description": "I can't stand someone who bases their happiness on me.", "type": "cantStand", "category": "Traits" }, 
    { "id": 54, "title": "Lying", "description": "I can't stand someone who lies to anyone-especially to me.", "type": "cantStand", "category": "Traits" }, 
    { "id": 55, "title": "Cheating", "description": "I can't stand someone who takes advantage of people.", "type": "cantStand", "category": "Traits" }, 
    { "id": 57, "title": "Anger", "description": "I can't stand someone who can't manage their anger, who yells, or bottles it up inside.", "type": "cantStand", "category": "Traits" }, 
    { "id": 59, "title": "Rude", "description": "I can't stand someone who is belittling, impatient or hateful to people in any situation.", "type": "cantStand", "category": "Traits" }, 
    { "id": 60, "title": "Unhappy at Work", "description": "I can't stand someone who hates their job and complains about it all the time.", "type": "cantStand", "category": "Traits" }, 
    { "id": 62, "title": "Denial", "description": "I can't stand someone who is unable to accept blame or see fault in their own actions.", "type": "cantStand", "category": "Traits" }, 
    { "id": 63, "title": "Workaholic", "description": "I can't stand someone who treats everything in life as secondary to their job.", "type": "cantStand", "category": "Traits" }, 
    { "id": 64, "title": "Lazy", "description": "I can't stand someone who likes to spend excessive time sleeping, resting or being a 'couch potato.'", "type": "cantStand", "category": "Traits" }, 
    { "id": 65, "title": "Worrier", "description": "I can't stand someone who easily loses perspective and constantly worries.", "type": "cantStand", "category": "Traits" }, 
    { "id": 66, "title": "Intolerance", "description": "While I understand that religious conviction is a positive trait, I can't stand someone who is self-righteous and feels that their particular faith is the only one that matters.", "type": "cantStand", "category": "Traits" }, 
    { "id": 67, "title": "Victim Mentality", "description": "While everyone has times of self-pity, I can't stand someone who continually sees himself/herself as a victim.", "type": "cantStand", "category": "Traits" }, 
    { "id": 68, "title": "Grudges", "description": "I can't stand someone who has a chip on their shoulder.", "type": "cantStand", "category": "Traits" }, 
    { "id": 69, "title": "Mean Spirited", "description": "I can't stand someone who has a devious nature and is mean to others.", "type": "cantStand", "category": "Traits" }, 
    { "id": 71, "title": "Fiscally Irresponsible", "description": "I can't stand someone who is incapable of managing their money.", "type": "cantStand", "category": "Traits" }, 
    { "id": 73, "title": "Hypochondriac", "description": "I can't stand someone who has a general disposition of sickness and is constantly treating the symptoms of their supposed illness.", "type": "cantStand", "category": "Traits" }, 
    { "id": 75, "title": "Excessive Overweight", "description": "I can't stand someone who is overweight.", "type": "cantStand", "category": "Traits" }, 
    { "id": 76, "title": "Gambling", "description": "I can't stand someone who gambles.", "type": "cantStand", "category": "Traits" }, 
    { "id": 78, "title": "Intruding Family/Friends", "description": "I can't stand someone whose relatives and friends are constantly calling or visiting.", "type": "cantStand", "category": "Traits" }, 
    { "id": 53, "title": "Depressed", "description": "I can't stand someone who is constantly unhappy about their life.", "type": "cantStand", "category": "Traits" }, 
    { "id": 56, "title": "Cynicism", "description": "I can't stand someone who generally sees the world from a cynical perspective.", "type": "cantStand", "category": "Traits" }, 
    { "id": 58, "title": "Self-Centered", "description": "I can't stand someone whose main topic of conversation is himself/herself.", "type": "cantStand", "category": "Traits" }, 
    { "id": 61, "title": "Materialistic", "description": "I can't stand someone who sees material items as a measure of success.", "type": "cantStand", "category": "Traits" }, 
    { "id": 70, "title": "Childishness", "description": "I can't stand someone who is not emotionally mature.", "type": "cantStand", "category": "Traits" }, 
    { "id": 72, "title": "Petty", "description": "I can't stand someone who focuses on imperfection.", "type": "cantStand", "category": "Traits" }, 
    { "id": 74, "title": "Boorishness", "description": "I can't stand someone who is inclined to rowdy, vulgar or disrespectful behavior when 'having fun.'", "type": "cantStand", "category": "Traits" }, 
    { "id": 77, "title": "Drugs", "description": "I can't stand someone who uses illegal recreational drugs.", "type": "cantStand", "category": "Traits" }, 
    { "id": 80, "title": "Flirts", "description": "I can't stand someone who constantly flirts with the opposite sex.", "type": "cantStand", "category": "Values" }, 
    { "id": 82, "title": "Television Junkie", "description": "I can't stand someone who constantly watches television.", "type": "cantStand", "category": "Values" }, 
    { "id": 83, "title": "Poor Hygiene", "description": "I can't stand someone who is not clean.", "type": "cantStand", "category": "Values" }, 
    { "id": 85, "title": "Gossip", "description": "I can't stand someone who loves to talk about other people.", "type": "cantStand", "category": "Values" }, 
    { "id": 86, "title": "Judgmental", "description": "I can't stand someone who finds fault with everyone and everything.", "type": "cantStand", "category": "Values" }, 
    { "id": 88, "title": "Addictions", "description": "I can't stand someone who currently suffers from addictions.", "type": "cantStand", "category": "Values" }, 
    { "id": 90, "title": "Undependable", "description": "I can't stand someone who fails to come through and is unreliable.", "type": "cantStand", "category": "Values" }, 
    { "id": 92, "title": "Foul Mouthed", "description": "I can't stand someone who swears or uses inappropriate language or humor.", "type": "cantStand", "category": "Values" }, 
    { "id": 94, "title": "Extremely Shy", "description": "I can't stand someone who is so shy that they cannot open up and share with me.", "type": "cantStand", "category": "Values" }, 
    { "id": 96, "title": "Political Correctness", "description": "I can't stand someone who censors their thoughts and opinions with a politically correct agenda.", "type": "cantStand", "category": "Values" }, 
    { "id": 97, "title": "Recklessness", "description": "I can't stand someone who has a careless and irresponsible manner when with others.", "type": "cantStand", "category": "Values" }, 
    { "id": 98, "title": "Sexually Obsessed", "description": "I can't stand someone who is sexually obsessive.", "type": "cantStand", "category": "Values" }, 
    { "id": 99, "title": "Uninterested", "description": "I can't stand someone who does not enjoy having sex on a regular basis.", "type": "cantStand", "category": "Values" }, 
    { "id": 100, "title": "Infidelity", "description": "I can't stand someone who engages in sex outside a committed relationship.", "type": "cantStand", "category": "Values" }, 
    { "id": 79, "title": "Punctuality", "description": "I can't stand someone who is always late.", "type": "cantStand", "category": "Values" }, 
    { "id": 81, "title": "Racist", "description": "I can't stand someone who believes that any particular ethnic group to which they belong is superior to the rest of humanity.", "type": "cantStand", "category": "Values" }, 
    { "id": 84, "title": "Hypocrites", "description": "I can't stand someone who holds a double standard for their actions and those of other people.", "type": "cantStand", "category": "Values" }, 
    { "id": 87, "title": "Pornography", "description": "I can't stand someone who views or owns pornography in any form.", "type": "cantStand", "category": "Values" }, 
    { "id": 89, "title": "Sloppy", "description": "I can't stand someone who is unkempt.", "type": "cantStand", "category": "Values" }, 
    { "id": 91, "title": "Cheap", "description": "I can't stand someone who is so tightfisted as to be impractical.", "type": "cantStand", "category": "Values" }, 
    { "id": 93, "title": "Arrogant", "description": "I can't stand someone who is obnoxiously cocky.", "type": "cantStand", "category": "Values" }, 
    { "id": 95, "title": "Pessimism", "description": "I can't stand someone who always sees the glass as half empty.", "type": "cantStand", "category": "Values" }
]}

    for (var i = 0; i < j.makesBreaks.length; i++) {
        if (j.makesBreaks[i].title.toLowerCase() == title.toLowerCase())
            return j.makesBreaks[i].description;
    }

    return "Not found.";
}


// For deciphering when the match was made
function unix_to_string(ut) {
    var d = new Date(ut);

    var m = d.getMonth() + 1;
    var day = d.getDate();
    var y = d.getFullYear();

    return m + '/' + day + '/' + y;
}


function get_match_details(uid) {
    var details_url = "http://www.eharmony.com/singles/servlet/user/match/detail?set=" + uid;

    j$.getJSON(details_url, function (details_json) {
        // Set activity
        var uid = details_json.data.matchDetail.matchId;
        var last_active_key = details_json.data.matchDetail.matchUserInfo.activeWithin.key;
        var last_active_value = details_json.data.matchDetail.matchUserInfo.activeWithin.displayValue;
        j$('div#stats-item-active-within').append(" (" + last_active_key + ")");
        
        // Set page title
        var firstName = details_json.data.matchDetail.matchUserInfo.firstName;
        var city = details_json.data.matchDetail.matchUserInfo.city;
        var state = details_json.data.matchDetail.matchUserInfo.state;
        document.title = "eH: " + firstName + " from " + city + ", " + state;
    });
}
