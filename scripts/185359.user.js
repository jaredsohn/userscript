// ==UserScript==
// @id             KongImprovements
// @name           KongImprovements
// @version        0.6dev3
// @author         KurzedMetal
// @description    Stuff for Kongregate Chat
// @updateUrl      https://userscripts.org/scripts/source/185359.user.js
// @include        http://www.kongregate.com/games/*
// @run-at         document-end
// ==/UserScript==

// -----  Stuff  --------------------------------------------------------------------------
/*

Features:
=========
* Highlight Friends, Mods, Devs & Whispers
* Convert some text URLs to real links
* Display "Anti-Idle: The Game" Acronyms and Abbvs
* Add a "!<command>" message shortcut to access AITGBot commands


TODO:
=====
* Improve the text to link conversion, add more sites
* Define more Anti-Idle acronyms and abbvs


Changelog:
==========

Version 0.3
* configure automatic updates with userscripts.org

Version 0.5
* skip v0.4 uploading v0.5 by mistake
* add more glossary terms
* fix a bug in highlightGlossaryTerms replacements by adding word delimiters
* add a message filter that redirect messages starting with '!' to the AITGBot

Version 0.6
* add automatic DEBUG mode only for the coolest guy ever
* add more glossary terms
* improve replacement of acronyms and abbreviations
* add injection of a CSS StyleSheet
* replace hardcoding of styles in tags with classes defined by injected CSS
* add highlighting when IATGBot hail Tukkun

*/
// -----  Notes  --------------------------------------------------------------------------
/*

// highscore categories
// first do: (guessing, stuff that gets loaded when clicking "view highscore")
holodeck.loadHighScores();
// then:
game_id = holodeck.chatWindow().gameId() 66881 for Anti Idle
statistic_id = list of objects with descriptions in holodeck._high_scores._holodeck._statistics

// access to highscores:
http://www.kongregate.com/high_scores.chat?game_id=66881&statistic_id=37911&friends_page=2
http://www.kongregate.com/high_scores.chat?game_id=66881&statistic_id=37911&all_time_page=2
http://www.kongregate.com/high_scores.chat?game_id=66881&statistic_id=37911&weekly_page=2
http://www.kongregate.com/high_scores.chat?game_id=66881&statistic_id=37911&today_page=2

*/
// -----  Globals  ------------------------------------------------------------------------

//// access DOM through Scriptish's unsafeWindow or directly
var dom = (typeof(unsafeWindow) === 'undefined' ? window : unsafeWindow);

//// control console output
var DEBUG = false;

//// define Regular Expression substitutions for Chat Filter
var regexes = [
    {regexp: RegExp("(\\*\\* Bot Alert \\*\\*|All hail Tukkun, our Lord and Master!)"),
     replace: "<span class='KI_aitgbot'>$1</span>"},
     
    {regexp: RegExp("(\\bhttps?://prntscr\.com(?:/[^' <>]{6})?\\b/?)", 'gi'),
     replace: "<a target='_blank' href='$1'>$1</a>"},

    {regexp: RegExp("(\\bhttps?://dl\.dropboxusercontent\.com(?:[^' <>]+)?\\b/?)", 'gi'),
     replace: "<a target='_blank' href='$1'>$1</a>"},

    {regexp: RegExp("(\\bhttps?://anti-idle-the-game\.wikia\.com(?:/wiki/([^ '<>]+))?\\b/?)", 'gi'),
     replace: "<a target='_blank' href='$1'>AITG Wiki: $2</a>"}
];

var glossary = {
    'YC':   "YC: Yellow Coins (AITG Resource)",
    'GC':   "GC: Green Coins (AITG Resource)",
    'BC':   "BC: Blue Coins (AITG Resource)",
    'WC':   "WC: White Coins (AITG Resource)",
    'QT':   "QT: Quest Tokens (AITG Resource)",
    
    'HC':   "HC: Hardcore Mode",
    'APOC': "Apoc: Apocalypse Mode",
    'WM':   "WM: Worst Moon Mode",
    'NM':   "NM: Nightmare Buff",

    'PX':   "Px: Pixels (BA Crafting Resource)",
    'CM':   "CM: Crafting Material (BA Crafting Resource)",
    'SCM':  "SCM: Superior Crafting Material (BA Crafting Resource)",
    'UNOB': "Unob: Unobtainium Enhacement Level (BA Crafting Resource)",
    'COR':  "CoR: Crystal of Rarity (BA Crafting Resource)",
    'COUR': "CoUR: Crystal of Ultimate Rarity (BA Crafting Resource)",
    'CFOC': "CFoC: Chaotic Fragments of Chaos (BA Crafting Resource)",
    '500/500': "500/500: Crafting with 500 Crystal of Rarity and 500 Crystal of Ultimate Rarity",
    
    'QA':   "QA: Quick Attack (BA Active Skill)",
    'PA':   "PA: Power Attack (BA Active Skill)",
    'RH':   "RHK: Roundhouse Kick (BA Active Skill)",
    'RHK':  "RHK: Roundhouse Kick (BA Active Skill)",
    'SKB':  "SKB: Super Knockback (BA Active Skill)",
    'CDG':  "CdG: Coup de Grace (BA Passive Skill)",
    
    'GOC':  "GoC: Gem of Constancy (BA Trinket)",
    
    'HG':   "HG: Holy Glory (BA Armor Set)",
    'KM':   "KM: Knightmare (BA Armor Set)",
    'HBB':  "HBB: Humblebee (BA Armor Set)",
    
    'PB/ES':"PB/ES: Pyrabow + Evil Sword Fusion (BA Weapon)",
    'PB':   "PB: Pyrabow (BA Weapon)",
    'ES':   "ES: Evil Sword (BA Weapon)",
    'G5':   "G5: Glaive-Glaive-Glaive-Guisarme-Glaive (BA Weapon)",
    'GS':   "GS: Greatersword (BA Weapon)",
    'ULS':  "ULS: Ultimate Lightning Spear (BA Weapon)",
    'BLS':  "BLS: Blood Scimitar (BA Weapon)",
    'LG':   "LG: Light Glaive (BA Weapon)",
    'DR':   "DR: Dark Ruler (BA Weapon)",
    'AURA': "AURA: CHAOS AURA (BA Weapon of CHAOS Set)",
    
    'CGT':  "CGT: Corrupted Giant Treeman (WM Corruption Boss)",
    'CN':   "CN: Chuck Norris (2012: Ye Old Pub Boss",
    'MB':   "MB: Megaboss (Special Arena Boss)",
    'FGM':  "FGM: Fairy Godmother (Throne Room Boss)",
    'FGF':  "FGM: Fairy Godfather (Throne Room Boss)",
    
    'TR':   "TR: Throne Room (BA Area)",
    'BB':   "BB: Binary Battlefield (BA Area)",
    'CS':   "CS: Censor Ship (BA Area)",
    'DC':   "DC: Dragon Cave (BA Area)",
    'SI':   "SI: Smiley Island (BA Area)",
    'TL':   "TL: Triangle Land (BA Area)",
    'NCI':  "NCI: No Copyright Infringement (BA Area)",
    'PSI':  "PSI: Pirate Ship Interior (BA Area)",
    'SC':   "SC: Spooky Crypt (BA Area)",

    'ED':   "ED: Endless Dungeon (BA Raid)",
    'TH':   "TH: Triangle Hideout (BA Raid)",
    'SC':   "SC: Spooky Crypt (BA Raid)",
    'SD':   "SD: Secret Dungeon (BA Raid)",
    'SA':   "SA: Special Arena (BA Raid)",
    'MBR':  "MBR: Megaboss's Revenge (BA Raid)",
    'DP':   "DP: Dark Pyramid (BA Raid)",
    
    'AA':   "AA: Awesome Adventures (AITG Feature)",
    'AG':   "AG: Another Garden (AITG Feature)",
    'BA':   "BA: Battle Arena (AITG Feature)",
    'RQ':   "RQ: Random Quest (AITG Feature)",
    'PBAR': "PBar: Progress Bar (AITG Feature)",
    
    'PBE':  "PBE: Progress Bar Extension (Awesome Adventure Reward)",

    'UA':   "UA: Ultimate Avoidance (Arcade Game)",
    'TC':   "TC: Triangle Count (Arcade Game)",
    'MM':   "MM: Math Master (Arcade Game)",
    'MS':   "MS: Mind Sweeper (Arcade Game)",   
    'UA':   "UA: Ultimate Avoidance (Arcade Game)",
    'W-A-G': "WaG: Whack-a-Greg (Arcade Game)",
    'WAG':  "WaG: Whack-a-Greg (Arcade Game)",
    'B3':   "B3: Balance 3 (Arcade Game)",
    

    'LB':   "LBox: Legendary Box (Mystery Box)",
    'LBOX': "LBox: Legendary Box (Mystery Box)",
    'PMB':  "PMBox: Pixelated Mystery Box (Mystery Box)",
    'PMBOX':"PMBox: Pixelated Mystery Box (Mystery Box)",
    'PBOX': "PBox: Progress Box (Mystery Box)",
    'IA':   "IA: Invisible Ally",
    'POT':  "PoT: Proof of Training",
    'POM':  "PoM: Proof of Mission",
    'SSF':  "SSF: Secret Save File",
    'IX':   "IX: Invisible X (2012: Ye Olde Pub)",
    'TBNG': "TBNG: To-Be-Nerfed Gems",
    'DAS':  "DAS: Doom Ant Sprayer",
    'MAS':  "DAS: Manual Ant Sprayer",
    'SCS':  "SCs: Secret Crystals",
    'SC1':  "SC1: Secret Crystal 1 (Bestiary page 3, row 4, col 10)",
    'SC2':  "SC2: Secret Crystal 2 (Bestiary page 4, row 4, col 3)",
    'RCP':  "RCP: Random Career Potions",
    'MCP':  "MCP: Mega Career Potions",
        
        
    'AF':   "AF: Awesome Face (TukkunFCG card)",
    'AU':   "AU: Awesome Update",
    'BOD':  "BoD: Boss of Doom",
    'DM':   "DM: Deathmatch (Stadium Mode)",
    'EC':   "EC: Emperor's Clothes Armor Set",
    'FLC':  "FLC: Four Leaf Clover (BA Medal)",
    'GB':   "GB: Gamblers Box",
    'GP':   "GP: Garden Points",
    'IM':   "IM: Item Maker (Career)",
    'MK':   "MK: Mission Kommander",

    'PC':   "PC: Pokayman City (BA Area)",
    'PS':   "PS: Pirate Ship",

    'PSOD': "PSoD: Purple Screen of Death",
    'SG':   "SG: Scary Graveyard",
    'KB':   "KBR: Knockback Ring",
    'KBR':  "KBR: Knockback Ring",
    'SL':   "SL: Secret Lab",
    'SMG':  "SMG: Strong Machine Gun",
    'SP':   "SP: Skill Points",
    'SPF':  "SPF: Special Pet Food",
    'ST':   "ST: Stadium Tokens",
    'TOD':  "ToD: Tower of Doom",
};

var glossaryTerms = listToRegExp(Object.keys(glossary));
glossaryTermsRegex = RegExp(glossaryTerms, 'gi');


// -----  Functions  ----------------------------------------------------------------------

//// check if the user is developer of the current game
//// this ugly implementation was found in holodeck
function isDeveloperOfGame(username) {

    return dom.location.pathname.split("/")[2].toLowerCase() == username.toLowerCase();
    
}


//// convert the list of glossary terms to a RegExp string
function listToRegExp(list) {

    function reduceToRegExp(prev, curr, idx, arr) {
        return prev + '|' + curr;
    }
    
    return'(\\b(?:' + list.reduce(reduceToRegExp) + ')\\b)+';
}


//// find glossary terms, highlight them, and add hover descriptions.
function highlightGlossaryTerms(text) {

    function replaceTerm(term) {
        console.debug('Found match: "' + term + '"');
        return '<acronym style="font-style: italic; text-decoration: underline" title="' + glossary[term.toUpperCase()] + '">' + term + '</acronym>';
    }

    return text.replace(glossaryTermsRegex, replaceTerm);
    
}


//// substitute lines in Kong Chat using Regular Expressions
//// note: can edit message text only
function kongRegexFilter(text, func) {

    //// running the REs on the text
    for (x in regexes) {
        rr = regexes[x];
        
        if (text.search(rr.regexp) > -1) {
            DEBUG && console.debug("Filtering '" + text + "'");
            DEBUG && console.debug("Replacing " + rr.regexp.toString() + " with " +  rr.replace);
            text = text.replace(rr.regexp, rr.replace);
            DEBUG && console.debug("Resulting text: '" + text + "'");
        }
    }
    
    text = highlightGlossaryTerms(text);
    
    ///// "returning" the modified text
    if (typeof(func) === 'undefined') {
        return text;
    } else {
        func(text, func);
    }
    
}


//// outgoing message filter, redirect messages starting with '!' to AITGBot as whispers
function simplerAITGBotCommandsFilter(text, func) {

    if (text.charAt(0) === '!') {
        dom.holodeck.sendWhisper(dom.holodeck, '/w AITGBot ' + text.slice(1));

        //// instead of calling func() as expected by Kong's Filter system,
        //// just exit the Filter's flow to prevent printing the message
        return true;
    } else {
        //// process as normal
        func(text, func);
    }
    
}


//// can replace text and templates of all
//// note: can edit message and style, gets the name of the sender too
function displayUnsanitizedMessageModified(username, message, htmlclasses, prefix) {

    var originalTemplate = dom.ChatDialogue.MESSAGE_TEMPLATE.template;
    var isFriend = false;
    var isModerator = false;
    var isDeveloper = false;
    var userObject = dom.holodeck.chatWindow().activeRoom().user(username);
    

    if (!htmlclasses) { htmlclasses = { class: '' }; }

    //// highlight me
    if (dom.holodeck.username() == username) { htmlclasses['class'] += ' KI_me'; }

    //// highlight developers
    if (isDeveloperOfGame(username)) { isDeveloper = true; htmlclasses['class'] += ' KI_dev'; }

    //// highlight moderators
    if (dom.holodeck.chatWindow().activeRoom().canUserModerate(userObject)) {
        isModerator = true;
        htmlclasses['class'] += ' KI_mod';
    }

    //// highlight friends 
    if (dom.holodeck.chatWindow().isFriend(username)) {
        isFriend = true;
        htmlclasses['class'] += ' KI_friend';
    }    
    
    /*
    // Default Template
    dom.ChatDialogue.MESSAGE_TEMPLATE.template =
        '<p class="#{classNames}">' +
        '<span username="#{username}" class="username #{userClassNames}">#{prefix}#{username}</span>' +
        '<span class="separator">: </span>' +
        '<span class="message hyphenate">#{message}</span>' +
        '<span class="clear"></span></p>';
    */
    dom.ChatDialogue.MESSAGE_TEMPLATE.template =
        '<p class="#{classNames}">' +
            '<span username="#{username}" class="username #{userClassNames}">' +
            (!isFriend && !isModerator && !isDeveloper ? '' : '<span class="user_row">') +
                (!isDeveloper ? '' : '<span class="spritesite developer_icon rank_icon" title="Developer">Developer</span>') +
                (!isModerator ? '' : '<span class="spritesite moderator_icon rank_icon" title="Moderator">Moderator</span>') +
                (!isFriend ? '' : '<span class="spritesite friend_icon" title="Friend">Friend</span>') +
            (!isFriend && !isModerator && !isDeveloper ? '' : '</span>') +
            '#{prefix}#{username}' +
        '</span>' +
        '<span class="separator">: </span>' +
        '<span class="message hyphenate">#{message}</span>' +
        '<span class="clear"></span></p>';
    
    message = kongRegexFilter(message);
    
    htmlmsg = this.displayUnsanitizedMessageOriginal(username, message, htmlclasses, prefix);
    dom.ChatDialogue.MESSAGE_TEMPLATE.template = originalTemplate;

    return htmlmsg;
    
}


//// when Kong's Holodeck is loaded, add Filters to Kong Chat
function injectKongHolodeck() {

    !DEBUG && (DEBUG = (dom.holodeck.username() === 'kurzedmetal'));
    
    DEBUG && console.debug('glossaryTerms: ' + glossaryTerms);
    DEBUG && console.debug("Holodeck defined? " + (typeof(unsafeWindow.holodeck) !== 'undefined'));
    
    //// injecting function to manipulate display of messages
    if (typeof(dom.ChatDialogue.prototype.displayUnsanitizedMessageOriginal) === 'undefined') {
        dom.ChatDialogue.prototype.displayUnsanitizedMessageOriginal = dom.ChatDialogue.prototype.displayUnsanitizedMessage;
    }
    dom.ChatDialogue.prototype.displayUnsanitizedMessage = displayUnsanitizedMessageModified;
    DEBUG && console.debug("Added Message Template manipulation!");
    
    //// these filters modify incoming messages
    //// including the ones you type
    //dom.holodeck.addIncomingMessageFilter(kongRegexFilter);
    //DEBUG && console.debug("Regex Filter added to incomming messages!");
    
    //// these filters modify your messsages
    //// other people see the changes too, not just you!
    dom.holodeck.addOutgoingMessageFilter(simplerAITGBotCommandsFilter);
    
}


//// injects a CSS StyleSheet into Kong's Chat
function injectStyleSheet() {

    DEBUG && console.debug("Adding custom StyleSheet!");

    var chatSelector = '#kong_game_ui .chat_message_window ';
    var cssCode =
        chatSelector + ".KI_aitgbot { font-weight: bold; color: orange; }\n" +
        chatSelector + ".username .user_row { padding: 0 !important; }\n" +
        chatSelector + ".username .user_row .spritesite { margin: 0 2px 0 0 !important; }\n" +
        chatSelector + ".sent_whisper { background-image: -moz-linear-gradient(left center , #FFFFFF 20%, #F9F9BB 100%); }\n" +
        chatSelector + ".received_whisper { background-image: -moz-linear-gradient(right center , #FFFFFF 20%, #F9F9BB 100%); }\n" +
        chatSelector + ".KI_friend .username { font-weight: bold; }\n" +
        chatSelector + ".KI_me .username { font-weight: bold; }\n" +
        chatSelector + ".KI_dev .username { font-weight: bold; color: #112244; }\n" +
        chatSelector + ".KI_dev { border: 2px none green; border-style: none solid; background-color: #ddffdd; }\n" +
        chatSelector + ".KI_mod .username { font-weight: bold; color: #330055; }\n" +
        chatSelector + ".KI_mod { border: 2px none #4499FF; border-style: none solid; background-color: #ebf5ff; }\n" +
        "\n";

    var css = document.createElement('style');    
    css.appendChild(document.createTextNode(cssCode));

    document.head.appendChild(css);
    
}


// -----  Main Code  ----------------------------------------------------------------------

//// inject code into Kong's Holodeck when it is loaded
function executeMain() {

    if (typeof(dom) === 'undefined') {
        DEBUG && console.error('No Document object!');
    } else {
        injectStyleSheet();
        dom.document.observe("holodeck:ready", injectKongHolodeck);
        DEBUG && console.debug('Waiting for Holodeck Object...');
    }
    
}


executeMain();

