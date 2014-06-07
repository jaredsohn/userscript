// ==UserScript==
// @name            A3BCHALLENGE CheckPlay Tool (Flickr)
// @namespace       http://www.flickr.com/groups/a3b/discuss/
// 
// @date            01/06/2008
// @creator         Kris Vangeel (http://flickr.com/kvgl69/)
// @contributor     Alesa Dam (http://flickr.com/alesadam/) // for making it generic, and adding features
// @modified        12/28/2009
//
//
// @include        http://*flickr.com/groups/a3b/discuss
// @include        http://*flickr.com/groups/a3b/discuss/*
// ==/UserScript==
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
/*jslint browser: true, maxerr: 500, onevar: false, regexp: false, plusplus: false, bitwise: false */
/*global window, document, unsafeWindow, GM_setValue, GM_getValue, GM_listValues, GM_deleteValue, GM_xmlhttpRequest, GM_log, PRO_setValue, PRO_getValue, XPathResult, alert */

(function () {

// -----------

// 'hiccups page': error page? or normal page? can create havoc in xpath expressions
// try - catch
//
    var chlgsplit;
    function setEnvironment()
    {
        var a = "none";
        if (typeof(GM_setValue) === 'function')
        {
            a = "GM";
            chlgsplit = 1;
        }
        if (typeof(PRO_setValue) === 'object')
        {
            a = "PRO";
            chlgsplit = 0;
        }
        return a;
    }

    var env = setEnvironment();
    var statusposition = 0;

    function setPlayername() {
        if (env === "GM") {
            return unsafeWindow.global_name;
        }
        if (env === "PRO") {
            return window.global_name;
        }
    }


// defaults
    var playername = setPlayername();
    var states = {};
    states.openState    = "OPEN";
    states.waitingForEntriesState = "OPEN"; // some groups use "ON HOLD", ..
    states.voteState    = /VOTE/i; // some groups use "VOTING", ..
    states.closedState  = "CLOSED"; // 
    states.expiredState = "EXPIRED";
    states.voidedState  = "VOIDED";
    var groupConfig = {};
    groupConfig.groupLimit = 65535; // the number of challenges a member can participate in
    groupConfig.groupLimitLabelAddon = "";
    groupConfig.skipFirstReply      = false; // Faves Contest shows last winning score in first reply => Finished
    groupConfig.skipFirstTwoReplies = false; // Faves Contest have a second reply '... 25-50 faves...', recognized as a vote
    groupConfig.asyncmode = "async"; // start with asynchronous
    groupConfig.automode = true; // nothing to see otherwise :)
    groupConfig.playernumber = 0;
    groupConfig.reExcludeMatch = undefined; // leave undefined, unless specified
    groupConfig.excludeReplyIndex = 0; // the challenge announcement = 0, first reply = 1, ..
    var labels = {};
    labels.filledLabel       = "[Complete]";     labels.filledLabelColor       = "Yellow";
    labels.voteLabel         = "[VOTE]";       labels.voteLabelColor         = "Red";
    labels.finishedLabel     = "[CLOSED]";   labels.finishedLabelColor     = "Blue";
    labels.votedLabel        = '<img src="http://www.flickr.com/images/icon_check.png" width="20" height="17">';
    /*labels.votedLabel      = "[Voted]";*/    labels.votedLabelColor        = "Green";
    labels.openLabel         = "[Open]";       labels.openLabelColor         = "Green";
    labels.waitingForEntriesLabel = "[Open]";  labels.waitingForEntriesLabelColor = "Green";
    labels.updatingLabel     = '<img src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" alt="" width="21" height="10" border="0">'; // using the flickr pulser seems to be a default
    labels.errorLoadingLabel = "[Error]";      labels.errorLoadingLabelColor = "Red";
    labels.errorParsingLabel = "[Error]";      labels.errorParsingLabelColor = "Red";
    labels.playerLabel       = "[Challenger]";     labels.playerLabelColor       = "Blue";
    labels.chatLabel         = "[Chat]";       labels.chatLabelColor         = "Orange";
    labels.gameLabel         = "[Game]";       labels.gameLabelColor         = "Grey";
    labels.showroomLabel     = "[Showroom]";   labels.showroomLabelColor     = "Orange";
    labels.excludedLabel     = "[Excluded]";   labels.excludedLabelColor     = "Orange";
    labels.errExclLabel      = "[ErrExclude]"; labels.errExclLabelColor      = "Red";
    labels.ignoreLabel       = "---";          labels.ignoreLabelColor       = "";

    // definition of challenges
    var challengeDefinitions = [];

// each entry in the array is of the form:
// [ part of the name , entries , votes to win , vote type , count limit, player vote ( , reverse voting ) ]
// - part of the name: uniquely identifiable part of the 'special' challenges
// - entries: the number of photos that participate in the named challenge
// - votes to win: the number of votes required to win the challenge
// - vote type: horizontal (1-2-3), vertical (#00- ..), pic-x ('number of your 2 favorites')
// - count limit: entries in this challenge count toward the group limit
// - maximum entries per member: some challenges allow more than one photo to be entered per player
// - player vote: a player may / must / may not vote in a challenge he/she participates in
// - votes added (default=true): 'constructive' challenges start with 5-5-5 and count down to elect a winner, hence need false

    function my_log(a)
    {
        if (env === "GM") { 
            return GM_log(a);
        }
        if (env === "PRO") {
            return;
        }
    }

    function getGroupname() {
        var reGroupnameMatch = /.*flickr.com\/groups\/([^\/.]*)\//;
        var groupname = reGroupnameMatch.exec(document.location.href)[1];
        return groupname;
    }
        
    switch (getGroupname()) {
      case "a3b":
// A3B definitions
        challengeDefinitions = [
            [ /chat/i,           -1, -1, "CHAT",      -1, "n/a",        false ],
            [ /early vot/i,       2,  7, "HORIZONTAL", 1, "maynotvote", true  ],
            [ /CONSTRUCTIV[EO]/i, 3,  5, "HORIZONTAL", 1, "maynotvote", false, false ], // both constructivE and constructivO are used
            [ /MONTHLY/i,        30, -1, "PIC-X",      5, "maynotvote", false ], // countsToLimit could pass groupLimit => false
            [ /./,                3,  5, "HORIZONTAL", 1, "maynotvote", true  ]
        ];
        groupConfig.groupLimit = 3;
        // no excludes
        break;
default:
        my_log("group not supported");
        return;
    }
  
// -----

    var CPStartTime = new Date();
    var CPtoolversion="V0.6.5"; // don't place spaces around the '=' sign: incompatible with 'checkVersion'

    function my_getValue(a) {
        if (env === "GM") {
            return GM_getValue(a);
        }
        if (env === "PRO") {
            return PRO_getValue(a);
        }
    }
    function my_getValueD(a, defVal) {
        if (env === "GM") {
            return GM_getValue(a, defVal);
        }
        if (env === "PRO") {
            return PRO_getValue(a, defVal);
        }
    }
    function my_setValue(a, b) {
        if (env === "GM") {
            return GM_setValue(a, b);
        }
        if (env === "PRO") {
            return PRO_setValue(a, b);
        }
    }
    function my_listValues() {
        if (env === "GM") {
            return GM_listValues();
        }
        if (env === "PRO") {
            return [];
        }
    }

    function my_deleteValue(a) {
        if (env === "GM") {
            return GM_deleteValue(a);
        }
        if (env === "PRO") {
            return false;
        }
    }

    function myEventListener(element, a, b, c) {
        if (env === "GM") {
            element.addEventListener(a, b, c);
        }
        if (env === "PRO") {
            element.attachEvent('on' + a, b, c);
        }
        return element;
    }


    function appendNavigationItem(groupNavigationMenu, myanchor) {
        // all 'span' elements, except for the last
        // => remove the last ('a' element), and put it in a 'span'
        var inviteFriends = groupNavigationMenu.childNodes[groupNavigationMenu.childNodes.length - 2];
        groupNavigationMenu.removeChild(inviteFriends);
        var friendsSpananchor = groupNavigationMenu.appendChild(document.createElement('span'));
        friendsSpananchor.appendChild(inviteFriends);
        groupNavigationMenu.appendChild(myanchor);
    }

    function checkVersion(groupNavigationMenu)
    {
        if (my_getValue("UCP.lastVersionCheckTime") === undefined) {
            my_setValue("UCP.lastVersionCheckTime", CPStartTime.getTime().toString());
        }
        var lastVersionCheckTime = my_getValue("UCP.lastVersionCheckTime");
        var elapsedtime = CPStartTime.getTime() - lastVersionCheckTime;

        if (elapsedtime / 1000 > 60 * 60 * 24) 
        { //more then 24h ago
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://userscripts.org/scripts/review/60303",
                headers: {
                    "User-Agent": "Mozilla/5.0",            // If not specified, navigator.userAgent will be used.
                    "Accept": "text/html"                    // If not specified, browser defaults will be used.
                },
                onerror: function (response) {
                    my_log("error reading userscripts.org to get version");
                },
                onload: function (response) {
                    var latestVersion       = response.responseText.split("CPtoolversion=&quot;")[1].split("&quot;")[0];
                    var reVersionMatch      = /(\d+)\.(\d+)\.(\d+)/;
                    var latestVersionParts  = reVersionMatch.exec(latestVersion);
                    var currentVersionParts = reVersionMatch.exec(CPtoolversion);
                    var latestVersionMajor;
                    var latestVersionMinor;
                    var latestVersionBuild;
                    [ , latestVersionMajor,  latestVersionMinor,  latestVersionBuild ] = latestVersionParts;
                    var currentVersionMajor;
                    var currentVersionMinor;
                    var currentVersionBuild;
                    [ , currentVersionMajor, currentVersionMinor, currentVersionBuild]  = currentVersionParts;
                    var updateAvailable = false;
                    // first check major: important update! => rewrite, flickr updates, greasemonkey updates
                    if (latestVersionMajor > currentVersionMajor) {
                        updateAvailable = true;
                    } else if (latestVersionMajor === currentVersionMajor) { // we don't want to downgrade
                        // minor version update => new functionality
                        if (latestVersionMinor > currentVersionMinor) {
                            updateAvailable = true;
                        } else if (latestVersionMinor === currentVersionMinor) { // we don't want to downgrade
                            // build version update => bugfixes
                            if (latestVersionBuild > currentVersionBuild) {
                                updateAvailable = true;
                            }
                        }
                    }
                    if (updateAvailable) {

                        var myanchor = document.createElement('a');
                        myanchor.innerHTML = "&nbsp;<font color='red'>(" + latestVersion + " available)</font>&nbsp;";
                        myanchor.href = 'http://userscripts.org/scripts/source/60303.user.js';
                        myanchor.id   = "UCheckPlayUpgrade";
                        myEventListener(myanchor, 'click', function () {
                            var anchor = document.getElementById('UCheckPlayUpgrade');
                            var link = document.getElementById("UCheckPlay");
                            link.parentNode.removeChild(anchor);
                            anchor = link.parentNode.appendChild(document.createElement('a'));
                            anchor.innerHTML = "(reload page to activate new version)";
                            anchor.href = location;
                            anchor.style.color = "orange";
                        }, false);
                        var link = document.getElementById("UCheckPlay");
                        link.parentNode.appendChild(myanchor);
                    }
                }
            });
        } // time check
    }


////
// Objects
// Test to determine the type of an object
    function instanceOf(object, constructorFunction) {
        return object instanceof constructorFunction;
/*        while (object !== null) {
            if (object === constructorFunction.prototype) {
                return true;
            }
            object = object.__proto__;
        }
        return false;
        */
    }

    function UCPVote(chlgname, username, string, votesArray, commentAnchor) {
        this.chlgname = chlgname;
        this.username = username;
        this.votetext = string;
        this.commentAnchor = commentAnchor;
        this.votesArray = [];
        this.error = null;
        this.errorIdx = 0;
        this.maxVote = 0;
        if (votesArray !== null) {
            for (var oIdx = 0, oLen = votesArray.length; oIdx < oLen; oIdx++) {
                if (!isNaN(votesArray[oIdx])) {
                    this.maxVote = Math.max(votesArray[oIdx], this.maxVote);
                    this.votesArray[oIdx] = votesArray[oIdx];
                } else {
                    this.votesArray[oIdx] = 0;
                }
            }
        }
        this.valid = function (previousVote, scoresAdded, debug) {
            if (debug) {
                my_log(['comparing in ' + this.chlgname,
                        ' ' + this.toString(),
                        ' with ',
                        previousVote.toString() ].join('\n'));
            }
            if (!instanceOf(previousVote, UCPVote)) {
                return true;
            }
            if (this.votesArray.length !== previousVote.votesArray.length) {
                this.error = "'" + this.username + "' voted for " + (this.votesArray.length - 1) + " photos while '" + previousVote.username + "' voted for " + (previousVote.votesArray.length - 1);
                return false;
            }
            if (this.votesArray.length === 0) {
                return true;
            }
            var voteFound = false;
            for (var oIdx = 0, oLength = this.votesArray.length; oIdx < oLength; ++oIdx) {
                if (isNaN(this.votesArray[oIdx]) || isNaN(previousVote.votesArray[oIdx])) {
                    continue;
                }
                var diff = this.votesArray[oIdx] - previousVote.votesArray[oIdx];
                if (diff < 0 && scoresAdded) {
                    this.error = "'" + this.username + "' dropped a vote";
                    this.errorIdx = oIdx;
                    return false;
                }
                if (diff > 0 && !scoresAdded) {
                    this.error = "'" + this.username + "' dropped a vote";
                    this.errorIdx = oIdx;
                    return false;
                }
                if (diff > 1 && scoresAdded) {
                    this.error = "'" + this.username + "' voted too much on same photo";
                    this.errorIdx = oIdx;
                    return false;
                }
                if (diff < -1 && !scoresAdded) {
                    this.error = "'" + this.username + "' voted too much on same photo";
                    this.errorIdx = oIdx;
                    return false;
                }
                if (voteFound && diff !== 0) {
                    this.error = "'" + this.username + "' misvoted";
                    this.errorIdx = oIdx;
                    return false;
                }
                if (!voteFound && diff !== 0) {
                    voteFound = true;
                }
            }
            if (!voteFound) {
                this.error = "'" + this.username + "' did not really vote";
                this.errorIdx = 0;
            }
            return voteFound;
        };
        this.isUnanimous = function () {
            var foundScore = false;
            for (var oIdx = 0, oLen = this.votesArray.length; oIdx < oLen; ++oIdx) {
                if (!isNaN(this.votesArray[oIdx]) && this.votesArray[oIdx] > 0) {
                    if (foundScore) {
                        return false;
                    }
                    foundScore = true;
                }
            }
            return foundScore; // no score found = no voting = not unanimous
        };
        this.isExampleVote = function (scoresAdded, neededScore) {
            if (scoresAdded) {
                return this.maxVote === 0;
            }
            // !scoresAdded
            if (this.maxVote !== neededScore) { // fast test
                return false;
            }
            for (var oIdx = 1, oLen = this.votesArray.length; oIdx < oLen; ++oIdx) {
                if (isNaN(this.votesArray[oIdx])) {
                    return false;
                }
                if (this.votesArray[oIdx] !== neededScore) {
                    return false;
                }
            }
            return true;
        };
        this.toString = function () {
            var retval = this.username + ' ' + this.votetext + ' =(';
            for (var oIdx = 0, oLen = this.votesArray.length; oIdx < oLen; ++oIdx) {
                retval = retval + ' ' + this.votesArray[oIdx];
            }
            retval = retval + ') => ' + this.maxVote;
            return retval;
        };
        this.showVotes = function () {
            var retval = "(";
            for (var oIdx = 1, oLen = this.votesArray.length; oIdx < oLen; ++oIdx) { 
                var part = oIdx + ": " + votesArray[oIdx];
                if (this.errorIdx === oIdx) {
                    part = "<b>" + part + "</b>";
                }
                if (oIdx === 1) {
                    retval = retval + part;
                } else {
                    retval = retval + ", " + part;
                }
            }
            retval = retval + ")";
            return retval;
        };
        this.showPicVotes = function () {
            var retval = "";
            for (var oIdx = 1, oLen = this.votesArray.length; oIdx < oLen; ++oIdx) {
                var vote = votesArray[oIdx];
                if (!isNaN(vote) && vote > 0) {
                    if (retval.length === 0) {
                        retval = retval + oIdx;
                    } else {
                        retval = retval + ", " + oIdx;
                    }
                }
            }
            return "(" + retval + ")";
        };
    }

// The challenger or competitor's photo in  one of the challenges.
    function UCPCompetitor(username, commentAnchor) {
        this.username = username;
        this.commentAnchor = commentAnchor;
        this.toString = function () {
            return this.username;
        };
    }

// Voter comment for voting replies that don't contain a wellformed vote
    function UCPVoteComment(username, comment, commentAnchor) {
        this.username = username;
        this.comment = comment;
        this.commentAnchor = commentAnchor;
        this.toString = function () {
            return this.username + " said :" + this.comment;
        };
    }


//the real code
    var addCPheader = function addCPheader() {

        var topbarTD = document.evaluate("//div[@id='TopBar']//td[@class='Status']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    
        topbarTD.innerHTML = "Unified CheckPlay " + CPtoolversion + "&nbsp;&nbsp;-&nbsp;&nbsp;" + topbarTD.innerHTML;
    };


    function skipchallenge(name) {
        if (name.match(states.closedState))  {
            return true;
        }
        if (name.match(states.expiredState)) {
            return true;
        }
        if (name.match(states.voidedState))  {
            return true;
        }
        for (var idx = 0, len = challengeDefinitions.length; idx < (len - 1); ++idx) { // skip 'default'
            var specialName = challengeDefinitions[idx][0];
            if (name.match(specialName)) {
                return false;
            }
        }
        if (name.match(states.openState))    {
            return false;
        }
        if (name.match(states.waitingForEntriesState)) {
            return false;
        }
        if (name.match(states.voteState))    {
            return false;
        }

        return true;
    }

    function cleanupUCPvariables(groupname) {
        var keyValues = my_listValues();
        for (var keyIdx = 0, valLen = keyValues.length; keyIdx < valLen; ++keyIdx) {
            var key = keyValues[keyIdx];
            if (!groupname) {
                if (key.match(/UCP./) && // for versions prior to 0.5.10
                    !key.match(/UCP.auto/) && 
                    !key.match(/UCP.async/) && 
                    !key.match(/UCP.lastVersionCheckTime/)) {
                    my_deleteValue(key);
                }
            } else { // only for the given group
                if (key.match(new RegExp("UCP." + groupname))) {
                    my_deleteValue(key);
                }
            }
        }
    }

    function asyncModeClicked(mode) {
        var groupname = getGroupname();
        //my_log("groupname:" + groupname);
        groupConfig.asyncmode = mode; //my_getValueD("UCP.asyncmode." + groupname, "sync");
        my_setValue("UCP.async." + groupname, mode);

        return true;
    }
    var syncClicked = function syncClicked() {
        asyncModeClicked("sync");
    };
    var asyncClicked = function asyncClicked() {
        asyncModeClicked("async");
    };

    var checkPlayClicked = function checkPlayClicked() {
        var groupname = getGroupname();
        //my_log("groupname:" + groupname);
        groupConfig.automode = (my_getValue("UCP.auto." + groupname) === "true");

        var automodetxt = "";
        if (groupConfig.automode) {
            groupConfig.automode = false;
            my_setValue("UCP.auto." + groupname, "false");
            automodetxt = "off";
        } else {
            groupConfig.automode = true;
            my_setValue("UCP.auto." + groupname, "true");
            automodetxt = "on";
        }

        var link = document.getElementById("UCheckPlay");
        link.innerHTML = "UCheckPlay " + automodetxt + "&nbsp;"; // +" (" + playername +")" ;

        return true;
    };


    function addchlgstatus(newchlgstatus, value) {
        if (value === "Chat") {
            return "Chat";
        }
        if (value === "Showroom") {
            return "Showroom";
        }
        if (value === "Game") {
            return "Game";
        }
        // following changes can only occur in order below
        // set CLOSED (before for loops)
        if ((newchlgstatus === "none") && (value === "CLOSED")) {
            return "Excluded"; // not really 'excluded'!
        }
        // set for photoposter (first for loop)
        if (value === "Excluded") {
            return "Excluded";
        }
        if ((newchlgstatus === "none") && (value === "photoposter")) {
            return "Player";
        }
        if ((newchlgstatus === "Excluded") && (value === "photoposter")) {
            return "ErrExclPlay";
        }
        // set for voter (second for loop)
        if ((newchlgstatus === "none") && (value === "voter")) {
            return "Voted";
        }
        if ((newchlgstatus === "Excluded") && (value === "voter")) {
            return "Voted";
        }
        if ((newchlgstatus === "ErrExclPlay") && (value === "voter")) {
            return "ErrExclPlay";
        }
        if ((newchlgstatus === "Player") && (value === "voter")) {
            return "VotedPlayer";
        }
        if ((newchlgstatus === "Voted") && (value === "voter")) {
            return "Voted"; //catch a comment and a vote from same player
        }
        if ((newchlgstatus === "Voted") && (value === "photoposter")) {
            return "VotedPlayer";
        }
        if ((newchlgstatus === "Player") && (value === "mayvote")) {
            return "PlayerMayVote";
        }
        if ((newchlgstatus === "Player") && (value === "mustvote")) {
            return "PlayerMustVote";
        }
        if ((newchlgstatus === "PlayerMayVote" || newchlgstatus === "PlayerMustVote") && (value === "voter")) {
            return "VotedPlayer";
        }
        if (newchlgstatus === "Player") {
            return "Player"; // don't overwrite in case of 'maynotvote'
        }
        return "";
    }

    function setchlgstatuscolor(chlgstatus) {
        switch (chlgstatus) {
        case "OK":
            return labels.openLabelColor;
        case "VOTE":
            return labels.voteLabelColor;
        case "--VOTE--":
            return labels.voteLabelColor;
        case "Voted":
            return labels.votedLabelColor;
        case "Excluded":
            return labels.excludedLabelColor;
        case "ErrExclPlay":
            return labels.errExclLabelColor;
        case "UPDATING":
            return "";
        case "ERRORLOADING":
            return labels.errorLoadingLabelColor;
        case "ERRORPARSING":
            return labels.errorParsingLabelColor;
        case "Chat":
            return labels.chatLabelColor;
        case "Game":
            return labels.gameLabelColor;
        case "Showroom":
            return labels.showroomLabelColor;
        case "Filled":
            return labels.filledLabelColor;
        case "Player":
            return labels.playerLabelColor;
        case "VotedPlayer":
            return labels.votedLabelColor;
        case "PlayerMustVote":
            return labels.voteLabelColor;
        case "PlayerMayVote":
            return labels.playerLabelColor;
        case "Finished":
            return labels.finishedLabelColor;
        default:
            return "";
        }

        return "";
    }

    function setchlgstatustitle(chlgstatus) {
        switch (chlgstatus) {
        case "VOTE":
            return "You haven't voted in this challenge yet... Please vote. No has votado aún,por favor vota.";
        case "--VOTE--":
            return "You haven't voted in this challenge yet... Please vote. No has votado aún, por favor vota.";
        case "OK":
            return "This challenge is open to play and doesn't require voting yet.Este reto está aún abierto.";
        case "Excluded":
            return "You are excluded from entering this challenge, see rules for more information. No puedes participar en este reto, lee las reglas.";
        case "Player":
            return "You are a player in this challenge. Good luck!Eres un participante en este reto. Suerte!";
        case "Voted":
            return "You have voted in this challenge. Thank you. Gracias por votar.";
        case "VotedPlayer":
            return "You are a player in this challenge. Good luck! Eres un participante en este reto. Suerte! " +
                   "You have voted in this challenge. Thank you.Gracias por votar.";
        case "PlayerMustVote": 
            return "You are a player in this challenge. Good luck! Eres un participante en este reto. Suerte! " +
                   "You haven't voted in this challenge yet, while you shoud. Please vote.";
        case "PlayerMayVote. No has votado aún en este reto, debes hacerlo. Por favor vota.": 
            return "You are a player in this challenge. Good luck! Eres un participante en este reto. Suerte!" +
                   "You haven't voted in this challenge yet... Please vote.No has votado aún en este reto. Por favor vota.";
        case "ErrExclPlay":
            return "You are excluded from this challenge but did enter in it. Please have your entry removed";
        case "---":
            return "This thread is closed or contains general information. Este reto está cerrado o contiene información general";
        case "Finished":
            return "Voting in this thread is finished. Please wait for an admin/mod to close the challenge. Este reto está cerrado. Por favor espera a que un admin/mod lo cierre.";
        case "Filled":
            return "This challenge has the required number of photos in it and is waiting to be set to vote by an admin/mod. You may vote in it already if you want.Este reto ya tiene el número de fotos requeridas, puedes esperar a que un admin/mod lo ponga a votar o si prefieres puedes votar ahora.";
        case "UPDATING":
            return "Challenge information is being updated in the background";
        case "ERRORLOADING":
            return "Error loading the challenge page";
        case "ERRORPARSING":
            return "Error parsing the challenge page";
        case "Chat":
            return "A non-challenge thread used for chatting, asking questions, and reporting problems";
        case "Game":
            return "A non-challenge thread used for games";
        case "Showroom":
            return "A non-challenge thread used to showcase challenge winners";
        }
    }

    function fillupanchor(ucpThread, newchlgstatus) {
        if (!newchlgstatus) {
            newchlgstatus = ucpThread.chlgstatus;
        }
        ucpThread.updanchor.innerHTML = newchlgstatus; // default
        ucpThread.updanchor.style.textDecoration = 'none';

        switch (newchlgstatus) {
        case "Filled":
            ucpThread.updanchor.innerHTML = labels.filledLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "Finished":
            ucpThread.updanchor.innerHTML = labels.finishedLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "--VOTE--":
            ucpThread.updanchor.innerHTML = labels.voteLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "VOTE":
            ucpThread.updanchor.innerHTML = labels.voteLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "Voted":
            ucpThread.updanchor.innerHTML = labels.votedLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "OK":
            ucpThread.updanchor.innerHTML = labels.waitingForEntriesLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "Excluded":
            ucpThread.updanchor.innerHTML = labels.excludedLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "ErrExclPlay":
            ucpThread.updanchor.innerHTML = labels.errExclLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "UPDATING":
            ucpThread.updanchor.innerHTML = labels.updatingLabel; 
            break;
        case "ERRORLOADING":
            ucpThread.updanchor.innerHTML = labels.errorLoadingLabel;
            break;
        case "ERRORPARSING":
            ucpThread.updanchor.innerHTML = labels.errorParsingLabel;
            break;
        case "Player":
            ucpThread.updanchor.innerHTML = labels.playerLabel + (ucpThread.validVoting ? '' : '(!)');
            break;
        case "VotedPlayer":
            ucpThread.updanchor.innerHTML = "";
            var playerLink = ucpThread.updanchor.appendChild(document.createElement('span'));
            playerLink.innerHTML = labels.playerLabel + "&nbsp;";
            playerLink.style.color = setchlgstatuscolor("Player");
            var votedLink = ucpThread.updanchor.appendChild(document.createElement('span'));
            votedLink.innerHTML = "&nbsp;" + labels.votedLabel + (ucpThread.validVoting ? '' : '(!)');
            votedLink.style.color = setchlgstatuscolor("OK");
            break;
        case "PlayerMustVote":
            ucpThread.updanchor.innerHTML = "";
            playerLink = ucpThread.updanchor.appendChild(document.createElement('span'));
            playerLink.innerHTML = labels.playerLabel + "&nbsp";
            playerLink.style.color = setchlgstatuscolor("Player");
            var voteLink = ucpThread.updanchor.appendChild(document.createElement('span'));
            voteLink.innerHTML = "&nbsp;" + labels.voteLabel + (ucpThread.validVoting ? '' : '(!)');
            voteLink.style.color = setchlgstatuscolor("VOTE");
            break;
        case "PlayerMayVote":
            ucpThread.updanchor.innerHTML = labels.playerLabel+ (ucpThread.validVoting ? '' : '(!)');
            break;
        case "Chat":
            ucpThread.updanchor.innerHTML = labels.chatLabel;
            break;
        case "Game":
            ucpThread.updanchor.innerHTML = labels.gameLabel;
            break;
        case "Showroom":
            ucpThread.updanchor.innerHTML = labels.showroomLabel;
            break;
        case "---":
        case "none":
            ucpThread.updanchor.innerHTML = labels.ignoreLabel;
        }

        ucpThread.updanchor.style.color = setchlgstatuscolor(newchlgstatus);
        var anchortitle = setchlgstatustitle(newchlgstatus);
        ucpThread.updanchor.title = anchortitle + (ucpThread.validVoting ? "" : " (!! " + ucpThread.votingError + ")");

//if some statusses are reached, let's display a warning on screen
/*
if (newchlgstatus === "ErrExclPlay")  //ErrExclPlay
{
wanchor=document.getElementById("CheckPlayStatusDiv");
wanchor.style.display='block';
wanchor=document.getElementById("CheckPlayStatus");
wanchor.innerHTML="You entered a challenge you were excluded from (look for the '" +
                  newchlgstatus + "' status and ask a mod/admin to remove " +
                  "this entry by messaging a mod/admin";
wanchor.style.color='red';
wanchor.style.textDecorationUnderline='underline';
wanchor.style.fontWeight='bold';
}
*/
        var wanchor = document.getElementById("UCheckPlayStatusDiv");
        if (groupConfig.playernumber === groupConfig.groupLimit) {
            wanchor.style.display = 'block';
            wanchor = document.getElementById("UCheckPlayStatus");
            wanchor.innerHTML = "UCheckPlay: You entered " + groupConfig.groupLimit + " challenges and have reached your maximum play limit! " + groupConfig.groupLimitLabelAddon;
            wanchor.style.color = 'red';
        }
        if (groupConfig.playernumber > groupConfig.groupLimit) {
            wanchor.style.display = 'block';
            wanchor = document.getElementById("UCheckPlayStatus");
            wanchor.innerHTML = "UCheckPlay: You entered over " + groupConfig.groupLimit + " challenges and are thus breaking the rules! Please remove your latest entry!";
            wanchor.style.color = 'red';
            wanchor.style.textDecorationUnderline = 'underline';
            wanchor.style.fontWeight = 'bold';
        }
    }

    function addVotingError(ori, extra) {
        if (ori === null) {
            return extra;
        } else {
            return ori + " | " + extra;
        }
    }

    function addUCPComment(anchor, text, color, markUCP, appendToLastLine) {
        if (anchor && markUCP) {
            var lineBreak;
            if (appendToLastLine) {
                lineBreak = "";
            } else {
                lineBreak = "<br>UCheckPlay: ";
            }
            var colorSpanStart = "";
            var colorSpanEnd   = "";
            if (color) {
                colorSpanStart = "<font style='color:" + color + "'>";
                colorSpanEnd   = "</font>";
            }   
            if (anchor.innerHTML && anchor.innerHTML.length > 0) {
                anchor.innerHTML = anchor.innerHTML + lineBreak + colorSpanStart + text + colorSpanEnd;
            } else {
                anchor.innerHTML = "UCheckPlay: " + colorSpanStart + text + colorSpanEnd;
            }
        }
    }

////
// Read a challenge page and return an array of voter's names and the text of their votes
//
// First look for the names of the player's posting pictures
// Then collect the names of voters and the text of their votes
//
    function collectVotes(challengeConfig, challengeEntries, excludedPlayers, markUCP) {

        var voteArray = [];
   
        var i = 1; 
        if (groupConfig.skipFirstReply) { 
            i = 2;// 0: announcement, 1: first reply 
        }
        if (groupConfig.skipFirstTwoReplies) {
            i = 3; 
        }
        var challengeEntriesLength = challengeEntries.snapshotLength;
        for (; i < challengeEntriesLength; ++i) {
            var challengeEntry = challengeEntries.snapshotItem(i);
            //my_log("["+i+"]: "+challengeEntry.innerHTML);
            // admins have an image before there name, surrounded with an 'a' tag without 'href' attribute :> skip
            var username = document.evaluate('./h4/a[@href]', challengeEntry, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue;
            if (!username) {
                my_log("no user in " + challengeConfig.chlgname);
                continue;
            }
            username = username.textContent.replace(/&amp;/g, "&");
            if (username.length === 0) {
                my_log("no user in " + challengeConfig.chlgname); // should not happen!
                continue;
            }

            var usercomment = document.evaluate('./p', challengeEntry, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                .singleNodeValue;

            if (!usercomment) {
                my_log("no usercomment in " + challengeConfig.chlgname);
                continue;
            }
            var ucpSmallPrint;
            if (markUCP) {
                ucpSmallPrint = usercomment.appendChild(document.createElement('small'));
            }

            // 'ends-with()' and 'matches()' don't work?
            var photos = document.evaluate(".//img[not(contains(@src,'buddyicons')) and contains(@src,'flickr.com') and contains(@src,'jpg')]", usercomment, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var photofound = (photos.snapshotLength > 0);

            if (photofound) {
                voteArray.push(new UCPCompetitor(username, ucpSmallPrint));
            } else {
                // This should be a vote or user comment
                var ptag = usercomment.innerHTML.split("<small>")[0];
                // first remove striked votes
                var replytxt = ptag.replace(/<s(.|\s)*?\/s>/gi, ''); // remove strike-through votes
                //replytxt = replytxt.replace(/\s*<[^>]*>\s*/g,''); // removes html
        
                if (replytxt.match(/void/i)) {
                    // Skip replies where the vote has been voided
                    continue;
                }

                var votes = null;
                switch (challengeConfig.scoreType) {
                case "VERTICAL":
                    var vVotesArray = [];
                    var vVoteLines = replytxt.split(/<br>\s*/); // source code shows '<br />', DOM uses <br>?
                        // voteLines is an array:
                        // #01- 1
                        // #02- 1+2+3
                        // ..
                        // others use 1:
                    var reVoteMatch1 = /(\d{1,2})#/; // 01-
                    var reVoteMatch2 = /(\d{1,2})#(\d+)/; // '01-1'
                    var reVoteMatch3 = /(\d{1,2})#(\d+)([^0-9azA-Z](\d+))+/; // '01-1+2' && '01- 1+2+3'
                    var vVoteFound = false;
                    // it misses the first votes: 01-1 or 06-1, but that's to be ignored :)
                    for (var j = 0, vVoteLinesLength = vVoteLines.length; j < vVoteLinesLength; ++j) {
                        var vVoteLine = vVoteLines[j];
                        // remove any leading spaces
                        vVoteLine = vVoteLine.replace(/^\s*/, '');
                        // ignore lines that are comment text
                        if (vVoteLine.match(/^\s*[\.a-zA-Z]+/)) {
                            continue;
                        }
                        // first seperate the photo number from the votes, in case it was seperated with a space
                        var reVReplaceMatch = /#(\d{1,2})/;
                        vVoteLine = vVoteLine.replace(reVReplaceMatch, "$1"); // remove leading #
                        reVReplaceMatch = /(\d{1,2})([-:+ ]+|\.\.\.)/; // faves contest uses '...', adding it to [] creates havoc in other places, even with escaping (or escaping double)
                        vVoteLine = vVoteLine.replace(reVReplaceMatch, "$1#"); // insert # after photonumber
                        // remove spaces
                        vVoteLine = vVoteLine.replace(/\s/g, '');
                        // remove any character before first vote in voteLine 00#-1+2
                        vVoteLine = vVoteLine.replace(/(\d{1,2}#)[^0-9]*/, "$1");
                        if (vVoteLine.match(/^\s*\d{1,2}\s*$/)) {
                            vVoteLine = vVoteLine.replace(/^s*(\d{1,2})\s*$/, "$1#0");
                        }
                        var matchedString, photoNumber, photoScore;
                        var verticalVotes = reVoteMatch3.exec(vVoteLine);
                        if (verticalVotes) {
                            [matchedString, photoNumber, , , photoScore] = verticalVotes;
                            vVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(verticalVotes[4], 10);
                            vVoteFound = true;
                            continue;
                        }
                        verticalVotes = reVoteMatch2.exec(vVoteLine);
                        if (verticalVotes) {
                            [matchedString, photoNumber, photoScore] = verticalVotes;
                            vVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = parseInt(photoScore, 10);
                            vVoteFound = true;
                            continue;
                        }
                        verticalVotes = reVoteMatch1.exec(vVoteLine);
                        if (verticalVotes) {
                            [matchedString, photoNumber ] = verticalVotes;
                            vVotesArray[parseInt(photoNumber.replace(/^0/, ''), 10)] = 0;
                            vVoteFound = true;
                            continue;
                        }
                    // thisvotes is still null => normal comment
                    }       
                    //my_log(vVotesArray);
                    if (!vVoteFound) {
                        voteArray.push(new UCPVoteComment(username, replytxt, ucpSmallPrint));
                    } else {
                        var vote = new UCPVote(challengeConfig.chlgname, username, vVoteLines, vVotesArray, ucpSmallPrint);
                        voteArray.push(vote);
                    }
                    break;
                
                case "HORIZONTAL":
                    // dynamic build does not work :(
                    var reVoteMatchSplit  = "#(\\d+|[a-zA-Z]{1})"; // when split with a character, it can be double digits
                    var reVoteMatchJoined = "#(\\d|[a-zA-Z]{1})"; // when stuck to each other, it should be single digits
                
                    for (var p = 1; p < challengeConfig.neededPhotos; ++p) {
                        reVoteMatchSplit  = reVoteMatchSplit  + "[^a-zA-Z0-9]{1,2}(\\d+|[a-zA-Z]{1})";
                        reVoteMatchJoined = reVoteMatchJoined + "(\\d|[a-zA-Z]{1})";
                    }
                    reVoteMatchSplit  = reVoteMatchSplit  + "(?:\\s|\\b)";
                    reVoteMatchJoined = reVoteMatchJoined + "(?:\\s|\\b)";

                    var reVoteMatch = new RegExp(reVoteMatchSplit + "|" + reVoteMatchJoined, "ig");

                    //var reVoteMatch = null;
                    // limit the seperation characters to non-alphabet characters:
                    // a removed photo, but remaining link fits the regexp if [^\d]{1,2} is used
                    // TODO: leading space are NOT fully removed (&nbsp; ?)
                    if (challengeConfig.neededPhotos < 1 || challengeConfig.neededPhotos === 65535) {
                        reVoteMatch = /(\d+)([^\d](\d+))*/ig;
                    }

                    // first: cleanup the comment, to ease the vote recognition

                    // in The mother of all challenge group, the 'local' CP script has no way to handle '10'; 
                    // they use ten instead
                    // people that use this hack, also use it in other groups:
                    replytxt = replytxt.replace(/ten/g,  10);
                    replytxt = replytxt.replace(/nine/g,  9);
                    replytxt = replytxt.replace(/eight/g, 8);
                    replytxt = replytxt.replace(/seven/g, 7);
                    replytxt = replytxt.replace(/six/g,   6);
                    replytxt = replytxt.replace(/five/g,  5);
                    replytxt = replytxt.replace(/four/g,  4);
                    replytxt = replytxt.replace(/three/g, 3);
                    replytxt = replytxt.replace(/two/g,   2);
                    replytxt = replytxt.replace(/one/g,   1);
                    replytxt = replytxt.replace(/nil/g,   0);
                    replytxt = replytxt.replace(/zero/g,  0);
                    var replyLines = replytxt.split(/<br>\s*/); // source code shows '<br />', DOM uses <br>?
                    var horizontalVotes = null;
                    for (var lineIdx = 0, linesLen = replyLines.length; lineIdx < linesLen; ++lineIdx) {
                        // catches multiple votes, or comment, on multiple lines
                        var replyLine = replyLines[lineIdx].replace(/\s*<[^>]*>\s*/g, ' | '); // removes html
                        // ignore lines that are comment text
                        if (replyLine.match(/^\s*[\.a-zA-Z]+/)) {
                            continue;
                        }
                        // replace first empty space(s) with a # char
                        replyLine = replyLine.replace(/^(?:\s|\b)*/, '#');
                        // some like voting with extra spaces '0 - 1 - 2'
                        replyLine = replyLine.replace(/(\d+)\s+[^a-zA-Z0-9]/g, "$1-");
                        replyLine = replyLine.replace(/&gt;(?:\s|\b)*(\d+)/g, ' | #$1'); // correction
                        replyLine = replyLine.replace(/â†’(?:\s|\b)*(\d+)/g, ' | #$1'); // correction

                        var matchVotes = reVoteMatch.exec(replyLine);
                        while (matchVotes) { // catches multiple votes (correction?) on one line
                            horizontalVotes = matchVotes;
                            matchVotes = reVoteMatch.exec(replyLine);
                        }
                    }
                    if (horizontalVotes) {
                        var nvotes = horizontalVotes.length - 1;
                        // vote: 1-2-3
                        if (nvotes >= challengeConfig.neededPhotos) {
                            var hVotesArray = [];
                            var voteIdx     = 1; // 0: the input string
                            while (!horizontalVotes[voteIdx]) {
                                ++voteIdx; // skip the non matching part
                            }
                            var arrayIdx = 1;
                            while (true) {
                                hVotesArray[arrayIdx] = parseInt(horizontalVotes[voteIdx], 10);
                                if (voteIdx + 1 >= horizontalVotes.length) {
                                    break;
                                }
                                if (!horizontalVotes[voteIdx + 1]) {
                                    break;
                                }
                                ++voteIdx;
                                ++arrayIdx;
                            }
                            var hVote = new UCPVote(challengeConfig.chlgname, username, horizontalVotes, hVotesArray, ucpSmallPrint);
                            voteArray.push(hVote);
                        } else {
                            // No votes found in this reply
                        }
                    } else {
                        my_log(challengeConfig.chlgname + ": found another comment from user " + username + ": " + replytxt);
                        if (excludedPlayers && groupConfig.excludeReplyIndex === i) {
                            for (var exclIdx = 0, exclLen = excludedPlayers.length; exclIdx < exclLen; exclIdx++) {
                                addUCPComment(ucpSmallPrint, "found exclude for <b>" + excludedPlayers[exclIdx] + "</b>", 
                                                null, true, false);
                            }
                        }
                        voteArray.push(new UCPVoteComment(username, replytxt, ucpSmallPrint));
                    }
                    break;
                case "PIC-X":
                    // scores are a single number, on separate lines
                    var pVotesArray = [];
                    var pVoteLines = replytxt.split(/<br>\s*/); // source code shows '<br />', DOM uses <br>?
                    // voteLines is an array:
                    // #01
                    // #02
                    // ..
                    // others use
                    // 1
                    // 2
                    var pVoteFound = false;
                    for (var k = 0, pVoteLinesLength = pVoteLines.length; k < pVoteLinesLength; ++k) {
                        var pVoteLine = pVoteLines[k];
                        // remove any leading spaces
                        pVoteLine = pVoteLine.replace(/^\s*/, '');
                        // ignore lines that are comment text
                        if (pVoteLine.match(/^\s*[a-zA-Z]+/)) {
                            continue;
                        }
                        var reReplaceMatch = /#(\d{1,2})/;
                        pVoteLine = pVoteLine.replace(reReplaceMatch, "$1"); // remove leading #
                        var picVote = /^\s*(\d+)/.exec(pVoteLine);
                        if (picVote) {
                            pVotesArray[parseInt(picVote[1].replace(/^0(\d+)/, '$1'), 10)] = 1;
                            pVoteFound = true;
                            continue;
                        }
                    }
                    if (!pVoteFound) {
                        voteArray.push(new UCPVoteComment(username, replytxt, ucpSmallPrint));
                    } else {
                        var pVote = new UCPVote(challengeConfig.chlgname, username, pVoteLines, pVotesArray, ucpSmallPrint);
                        if (pVote.maxVote <= 0) { // skip example vote
                            voteArray.push(new UCPVoteComment(username, replytxt, ucpSmallPrint));
                        } else {
                            voteArray.push(pVote);
                        }
                    }
                    break;

                case "GAME": // fallthrough
                case "SHOWROOM": // fallthrough
                case "CHAT":
                    my_log("not processing " + challengeConfig.scoreType);
                    break;
                default:
                    my_log("invalid score type: '" + challengeConfig.scoreType + "'");
                }
            }
        } // for loop

        return voteArray;           
    }

    function UCPThread(thread, chlgname, replies, chlgstatus, validVoting, votingError) {
        var reTopicMatch = /.*flickr.com\/groups\/[^\/.]*\/discuss\/([0-9]+)/;
        this.topic = reTopicMatch.exec(thread)[1];
        this.groupname = getGroupname();
        this.url = thread;
        this.chlgname = chlgname;
        this.updanchor = null;
        this.chlgstatus = chlgstatus;
        this.replies = replies;
        this.validVoting = validVoting;
        this.votingError = votingError;
        this.lastLoadTime = null;
        this.toString = function () {
            return  [ "url:         " + this.url,
                      "groupname:   " + this.groupname,
                      "topic:       " + this.topic,
                      "chlgname:    " + this.chlgname,
                      "updanchor:   " + this.updanchor,
                      "chlgstatus:  " + this.chlgstatus,
                      "validVoting: " + this.validVoting,
                      "votingError: " + this.votingError,
                      "lastLoadTime:" + this.lastLoadTime].join('\n');

        };
        this.store = function () {
            my_setValue("UCP." + this.groupname + "." + this.topic, 
                uneval({
                    chlgname:       this.chlgname,
                    chlgstatus:     this.chlgstatus,
                    replies:        this.replies,
                    validVoting:    this.validVoting ? "true" : "false",
                    votingError:    this.votingError ? this.votingError : "",
                    lastLoadTime:   this.lastLoadTime ? this.lastLoadTime : 0
                }));
        };
        this.retrieve = function () {
            var value = my_getValue("UCP." + this.groupname + "." + this.topic);
            if (value) {
                var values = eval('(' + value + ')');
                this.chlgname = values.chlgname;
                this.chlgstatus = values.chlgstatus;
                this.replies = parseInt(values.replies, 10);
                this.validVoting = (values.validVoting === "true" ? true : false);
                this.votingError = values.votingError;
                this.lastLoadTime = parseInt(values.lastLoadTime, 10);
            }
        };
    }
    function my_deleteThread(thread) {
    }

    function findExcludesInDOMNode(node) {
        var excludedPlayers = [];
        var excludedMatch = groupConfig.reExcludeMatch.exec(node.innerHTML);
        if (excludedMatch) {
            for (var exclMatchIdx = 1, exclMatchLen = excludedMatch.length; exclMatchIdx < exclMatchLen; ++exclMatchIdx) {
                var excludedPlayer = excludedMatch[exclMatchIdx++];
                if (excludedPlayer) {
                    excludedPlayers.push(excludedPlayer);
                }
            }
        }
        return excludedPlayers;
    }

    var threadsToLoad = [];
    function storeThread(ucpThread) {
        if (groupConfig.asyncmode === "async") {
            loadthread(ucpThread); // don't store anything, just process
        } else {
            threadsToLoad.push(ucpThread);
        }
    }

    function loadNextThread() {
        var ucpThread = threadsToLoad.pop();
        if (ucpThread) {
            loadthread(ucpThread);
        }
    }

    function processDiscussionTopic(discussionTopic, ucpThread, challengeConfig, markUCP) {

        var nonChallengeStatus;
        switch (challengeConfig.scoreType) {
        case "CHAT": 
            if (!nonChallengeStatus) {
                nonChallengeStatus = "Chat";
            }
            // fallthrough
        case "SHOWROOM":
            if (!nonChallengeStatus) {
                nonChallengeStatus = "Showroom";
            }
            // fallthrough
        case "GAME": // fallthrough
            if (!nonChallengeStatus) {
                nonChallengeStatus = "Game";
            }
            // done processing thread for CHAT, SHOWROOM and GAME
            if (groupConfig.asyncmode === "sync") {
                loadNextThread();
            }
            var newchlgstate = addchlgstatus("none", nonChallengeStatus);
            ucpThread.chlgstatus = newchlgstate;
            ucpThread.validVoting = true;
            ucpThread.store();
            fillupanchor(ucpThread, newchlgstate);
            return newchlgstate;
        default:

            var newchlgstatus = "none";
            var validVoting = true;
            var votingError = null;
            var maxvote = 0;
            var photosposted = 0;
            var previousVote = null;

            if (!discussionTopic) {
                ucpThread.chlgstatus  = "ERRORPARSING";
                ucpThread.validVoting = false;
                ucpThread.votingError = "no DiscussTopic";
                ucpThread.store();
                return "none";
            }
            // discussionTopic contains the challenge announcement (table 1) and the replies (table 2);
            if (discussionTopic.childNodes.length < 2) { // test does not work
                my_log("no replies yet in " + ucpThread.chlgname);
                ucpThread.chlgstatus  = "none";
                ucpThread.validVoting = true;
                ucpThread.votingError = null;
                ucpThread.store();
                return "none";
            }
            // 
            var challengeAnnouncement = document.evaluate(".//*/td[@class='Said']/p", discussionTopic, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (!challengeAnnouncement) {
                ucpThread.chlgstatus  = "ERRORPARSING";
                ucpThread.validVoting = false;
                ucpThread.votingError = "empty topic";
                ucpThread.store();
                return "none";
            }
            var excludedPlayers = [];
            if (groupConfig.excludeReplyIndex === 0 && 
                groupConfig.reExcludeMatch !== undefined) {
                excludedPlayers = findExcludesInDOMNode(challengeAnnouncement);
                if (excludedPlayers.indexOf(playername) >= 0) {
                    newchlgstatus(newchlgstatus, "Excluded");
                }
                if (markUCP && excludedPlayers.length > 0) {
                    var ucpSmallPrint = challengeAnnouncement.appendChild(document.createElement('small'));
                    for (var exclIdx = 0, exclLen = excludedPlayers.length; exclIdx < exclLen; ++exclIdx) {
                        addUCPComment(ucpSmallPrint, "found exclude for <b>" + excludedPlayers[exclIdx] + "</b>", 
                                    null, markUCP, false);
                    }
                }
            }
            // get all 'says:' elements
            var challengeEntries = document.evaluate(".//*[@class='Said']", discussionTopic, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (challengeEntries.snapshotLength === 0) { // no replies
                ucpThread.chlgstatus  = newchlgstatus;
                ucpThread.validVoting = true;
                ucpThread.votingError = null;
                ucpThread.store();
                return newchlgstatus;
            }
            var commentcounter = challengeEntries.snapshotLength - 1;
                    
            if (groupConfig.excludeReplyIndex > 0 && 
                groupConfig.reExcludeMatch !== undefined && 
                groupConfig.excludeReplyIndex < challengeEntries.snapshotLength) {
                var challengeEntry = challengeEntries.snapshotItem(groupConfig.excludeReplyIndex);
                excludedPlayers = findExcludesInDOMNode(challengeEntry);
                if (excludedPlayers.indexOf(playername) >= 0) {
                    newchlgstatus = addchlgstatus(newchlgstatus, "Excluded");
                }
            }
//            my_log("excluded: '" + excludedPlayer + "'");
            var votes = collectVotes(challengeConfig, challengeEntries, excludedPlayers, markUCP);
           
            var doubleVotesArray = [];
            var doublePlayerArray = [];

            for (var j = 0, jLen = votes.length; j < jLen; ++j) {
                var vote = votes[j];
                if (instanceOf(vote, UCPCompetitor)) {
                    photosposted++; // we can not just get the number of photos posted with XPath: see The Pinnacle
                    var photoposter = vote.username;
                    if (photoposter.indexOf(playername) !== -1) {
                        addUCPComment(vote.commentAnchor, "found a photo by <b>you</b>", null, markUCP, false);
                        newchlgstatus = addchlgstatus(newchlgstatus, "photoposter");
                        if (challengeConfig.countsToLimit) {
                            groupConfig.playernumber++;
                        }
                    } else {
                        addUCPComment(vote.commentAnchor, "found a photo by <b>" + vote.username + "</b>", 
                                        null, markUCP, false);
                    }
                    if (challengeConfig.limitPerPlayer > 0) {
                        var registered = false;
                        if (doublePlayerArray[vote.username] !== undefined) {
                            // this member has more than one photo entered
                            registered = true;
                            var entries = doublePlayerArray[vote.username] + 1;
                            if (entries > challengeConfig.limitPerPlayer) {
                                validVoting = false;
                                votingError = addVotingError(votingError, 
                                        vote.username + " entered more than " + challengeConfig.limitPerPlayer + " photo");
                                addUCPComment(vote.commentAnchor, 
                                        " (max. photos allowed: " + challengeConfig.limitPerPlayer + ")", 
                                        "Red", markUCP, true);
                            }
                            doublePlayerArray[vote.username] = entries;
                        }
                        if (!registered) {
                            doublePlayerArray[vote.username] = 1;
                        }
                    }
                    //my_log("comparing '"+excludedPlayer+"' with '"+vote.username+"'");
                    if (excludedPlayers.indexOf(vote.username) >= 0) { // when using arrays: indexOf
                        validVoting = false;
                        votingError = addVotingError(votingError, vote.username + " was excluded, but entered anyway");
                        addUCPComment(vote.commentAnchor, vote.username + " was excluded, but entered anyway",
                                    "Red", markUCP, false);
                    }

                } else if (instanceOf(vote, UCPVoteComment)) {
                    addUCPComment(vote.commentAnchor, "found a regular comment(no photo, no votes)", null, markUCP, false);

                } else  { // a vote!
                    if (vote.isExampleVote(challengeConfig.scoresAdded, challengeConfig.neededScore)) {
                        addUCPComment(vote.commentAnchor, "found an example vote", null, markUCP, false);
                        continue;
                    }
                    addUCPComment(vote.commentAnchor, 
                        "<b>" + (vote.username === playername ? "you" : vote.username) + "</b> voted ", 
                        null, markUCP, false);
                    if (doubleVotesArray.indexOf(vote.username) >= 0) { // this member already voted!
                        addUCPComment(vote.commentAnchor, " <b>again<b> ", "Red", markUCP, true);
                        votingError = addVotingError(votingError, vote.username + " voted more than once");
                    } else {
                        doubleVotesArray[doubleVotesArray.length] = vote.username;
                    }
                    // DEBUG
                    var debug = false; //vote.chlgname.match(/macro flower/i);
                    maxvote = Math.max(vote.maxVote, maxvote);
                    if (vote.username.search(playername) >= 0) {
                        newchlgstatus = addchlgstatus(newchlgstatus, "voter");
                    }
                    if (challengeConfig.scoreType.match(/PIC-X/)) {
                        addUCPComment(vote.commentAnchor, vote.showPicVotes(), null, markUCP, true);

                    } else { // HORIZONTAL or VERTICAL
                        if (maxvote >= challengeConfig.neededScore && challengeConfig.scoresAdded) {
                            newchlgstatus = "Finished";
                        }
                        if (!challengeConfig.scoresAdded && vote.isUnanimous()) {
                            newchlgstatus = "Finished";
                        }
                        if (previousVote) {
                            var currentValidVoting = vote.valid(previousVote, challengeConfig.scoresAdded, debug);
                            if (!currentValidVoting) {
                                votingError = addVotingError(votingError, vote.error);
                                if (!validVoting) { // already in error from previous vote
                                    addUCPComment(vote.commentAnchor, vote.showVotes(), "orange", markUCP, true);
                                } else { // new error
                                    addUCPComment(vote.commentAnchor, vote.showVotes(), "red", markUCP, true);
                                }
                            } else {
                                addUCPComment(vote.commentAnchor, vote.showVotes(), null, markUCP, true);
                            }
                            validVoting &= currentValidVoting;
                        } else {
                            addUCPComment(vote.commentAnchor, vote.showVotes(), null, markUCP, true);
                        }
                    }
                    previousVote = vote;
                }
            }
            previousVote = null;

            if (challengeConfig.neededPhotos === photosposted && maxvote >= challengeConfig.neededScore && challengeConfig.scoresAdded) {
                newchlgstatus = "Finished";
            }
            //DEBUG
            //overwrite some base statusses if challenge is in voting.
            if ((newchlgstatus === "none") && (photosposted === challengeConfig.neededPhotos) && (ucpThread.chlgname.match(states.openState) || ucpThread.chlgname.match(states.waitingForEntriesState))) {
                newchlgstatus = "Filled";
            }
            if (((newchlgstatus === "none") || (newchlgstatus === "Excluded")) && (ucpThread.chlgname.match(states.voteState))) {
                newchlgstatus = "--VOTE--";
            }
            if ((newchlgstatus === "Player") && (photosposted >= challengeConfig.neededPhotos)) {
                newchlgstatus = addchlgstatus(newchlgstatus, challengeConfig.playerVoting);
            }
            if (newchlgstatus === "none") {
                newchlgstatus = "OK";
            }
            //let's go and change the update status on screen
           
            //update thread info
            ucpThread.chlgstatus  = newchlgstatus;
            ucpThread.validVoting = validVoting;
            ucpThread.votingError = votingError;
            ucpThread.replies     = commentcounter;
            ucpThread.store();
            return newchlgstatus;
        }
    }

    function getChallengeConfig(chlgname) {
        var neededPhotos   = -1;
        var neededScore    = -1;
        var scoreType      = null;
        var countsToLimit  = false;
        var limitPerPlayer = 1;
        var playerVoting   = "N/A";
        var scoresAdded    = true;
        for (var defIdx = 0, defLen = challengeDefinitions.length; defIdx < defLen; ++defIdx) {
            var nameIndication = challengeDefinitions[defIdx][0];
            // DEBUG
            //my_log("comparing "+chlgname+" with "+nameIndication+": "+chlgname.match(nameIndication));
            var nameIndicationMatch = chlgname.match(nameIndication);
            if (nameIndicationMatch) {
                [ , neededPhotos, neededScore, scoreType, limitPerPlayer, playerVoting, countsToLimit, scoresAdded ] =
                    challengeDefinitions[defIdx];
                if (scoresAdded === undefined) { // missing in definition
                    scoresAdded = true; // default
                }
                break; // important: stop after the first match, easy to implement priorities :)
            }
        }
        if (neededPhotos < 0) {
            neededPhotos   = 65535;
        }
        if (neededScore < 0) {
            neededScore    = 65535;
        }
        var retval = {
            chlgname:       chlgname,
            neededPhotos:   neededPhotos,
            neededScore:    neededScore,
            scoreType:      scoreType,
            countsToLimit:  countsToLimit,
            limitPerPlayer: limitPerPlayer,
            playerVoting:   playerVoting,
            scoresAdded:    scoresAdded
        };
        return retval;
    }

    function loadthread(ucpThread) 
    {
        var ifModifiedSince = ucpThread.lastLoadTime ? new Date(ucpThread.lastLoadTime * 1000) : new Date(0);
        //maybe we could use if-modified-since header to improve performance
        GM_xmlhttpRequest({
            method: "GET",
            url: ucpThread.url,
            headers: {
                "User-Agent": "Mozilla/5.0",            // If not specified, navigator.userAgent will be used.
                "Accept": "text/html",                    // If not specified, browser defaults will be used.
                "If-Modified-Since": ifModifiedSince.toUTCString() // does not work on flickr :(
            },
            onerror: function (response) {
                my_log("error loading " + ucpThread.chlgname);
                ucpThread.chlgstatus  = "ERRORLOADING";
                ucpThread.validVoting = true;
                ucpThread.votingError = null;
                fillupanchor(ucpThread);
                ucpThread.store();
                loadNextThread(); // sync or async, doesn't matter
            },
            onload: function (xmlhttp) {
                if (xmlhttp.status === 304) { // not modified since date
                    my_log("found 304");
                    fillupanchor(ucpThread);
                    loadNextThread(); // sync or async, doesn't matter
                    return;
                }
                ucpThread.lastLoadTime = Math.round((new Date()).getTime() / 1000);

                var challengeConfig = getChallengeConfig(ucpThread.chlgname);
                var discussionHTML = xmlhttp.responseText;
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = discussionHTML.replace(/<script(.|\s)*?\/script>/g, '');
                var discussionTopicResult = document.evaluate(".//*[@id='DiscussTopic']", tempDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                var discussionTopic = discussionTopicResult.singleNodeValue;
                var newchlgstatus = processDiscussionTopic(discussionTopic, ucpThread, challengeConfig, false);
                fillupanchor(ucpThread, newchlgstatus);
                // done processing
                if (groupConfig.asyncmode === "sync") {
                    loadNextThread();
                }
            } // onload
        }); // xmlHttpRequest
    } // loadthread

    function insertAfter(newElm, elm) {
        var clone = elm.cloneNode(true);
        elm.parentNode.insertBefore(clone, elm);
        elm.parentNode.replaceChild(newElm, elm);
    }

    var processTopicListingTable = function processTopicListingTable(topicListingTable) {

    // select main table
        var topicListingHeaderRow = document.evaluate(".//tr", topicListingTable, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        var headerColumns = document.evaluate("./th", topicListingHeaderRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var latestPostColumn = headerColumns.snapshotItem(3);
        latestPostColumn.width = "12%";

        var statusTitleCell = document.createElement('th');
        statusTitleCell.noWrap = "true";
        insertAfter(statusTitleCell, latestPostColumn);

        var statusTitleDiv = statusTitleCell.appendChild(document.createElement('div'));
        var statusTitle = statusTitleDiv.appendChild(document.createElement('font'));
        statusTitle.innerHTML = "UCP-status<br/>";
        statusTitle.width = "10%";
        statusTitle.style.textAlign = 'center';
        
        var topicListingRows = document.evaluate(".//tr", topicListingTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        // let's loop the table and start processing
        for (var i = 1, trsLength = topicListingRows.snapshotLength; i < trsLength; ++i) { // skip first: the header row

            var topicRow = topicListingRows.snapshotItem(i);
            var columns = document.evaluate("./td", topicRow, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

/*            if (statusposition === 0) {
                statusposition = tds.length;
            }
*/
            var topic    = document.evaluate("./a", columns.snapshotItem(0), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var thread   = topic.href;
            var chlgname = topic.innerHTML;
            var ucpThread = new UCPThread(thread, chlgname, 0, "UPDATING", true, null);
            ucpThread.retrieve();
            // reset
            var debug = false; //chlgname.match(/dome/i);
            var localChlgstatus = skipchallenge(chlgname) ? "---" : "UPDATING";

            var commentcounter = parseInt(columns.snapshotItem(2).innerHTML, 10);

            // add statusses
            var myanchor  = document.createElement('a');
            myanchor.id   = "UCP." + thread;
            myanchor.href = thread;
            ucpThread.updanchor = myanchor;

            var loadneeded = false;

            if (localChlgstatus === "UPDATING") // not "---"
            {
                // read UCP.http://www.flickr.com/groups/name/discuss/.lastloadtime
                var elapstime = Math.round(CPStartTime.getTime() / 1000) - ucpThread.lastloadtime;

                if (elapstime > 60 * 3) {//more then 3 minutes: force reload (after enough testing, this could be set to 1h)
                    loadneeded = true;
                } else {
                    if (ucpThread.chlgname === undefined) { // sentinel not found
                        loadneeded = true;
                    } else {
                        if (!ucpThread.validVoting) {
                            loadneeded = true;
                        }
                        if (ucpThread.replies !== commentcounter) {
                            loadneeded = true;
                        }
                        if (ucpThread.chlgname !== chlgname) {
                            ucpThread.chlgname = chlgname;
                            loadneeded = true;
                        }
                        if (ucpThread.chlgstatus === "UPDATING") {
                            loadneeded = true;
                        }
                    } 
                }
                if (ucpThread.chlgstatus.match(/Chat|Showroom|Game/)) {
                    loadneeded  = false;
                }
//DEBUG
//loadneeded = true;
                if (loadneeded) {
                    fillupanchor(ucpThread, localChlgstatus);
                    storeThread(ucpThread);
                } else {
                    if (ucpThread.chlgstatus.match("Player")) { // "VotedPlayer" || "PlayerMustVote" || "PlayerMayVote"
                        groupConfig.playernumber++; //when loadneeded => number gets added in loadthread
                    }
                    fillupanchor(ucpThread);
                }
            } else { // "---"
                ucpThread.chlgstatus = "---";
                fillupanchor(ucpThread, ucpThread.chlgstatus);
            }

            var statusCell = document.createElement('td');
            statusCell.noWrap = "true";
            insertAfter(statusCell, columns.snapshotItem(3));
//            var mylink = trs[i].insertCell(statusposition);
            statusCell.style.textAlign = 'center';
            var mysmall = document.createElement('small');
            mysmall.appendChild(myanchor);
            statusCell.appendChild(mysmall);
        }
        if (groupConfig.asyncmode === "sync") {
            threadsToLoad.reverse();
            loadNextThread();
        }
        //my_log("End of processing main discuss page");

        return;
    };

// *******************
// Start of processing
// *******************

    if (window.name === 'Log page') {
        return; //don't process log page
    }

    if (env === "none")
    {
        alert('UCheckPlay tool is only supported under Greasemonkey or IE7PRO');
        return;
    }

//alert('start');

    var automodetxt = "off";

//playername="danleyc";
//alert(playername);

    var groupname = getGroupname();
// if version is newer than stored one, clear all GM variables (except automode and async)
    var storedVersion;
    if (my_getValue("UCP.version") === undefined) {
        cleanupUCPvariables("");
    } else {
        storedVersion = my_getValue("UCP.version"); // VO.5.9
        if (CPtoolversion !== storedVersion) {
            cleanupUCPvariables("");
        }
    }
    my_setValue("UCP.version", CPtoolversion);

// check if we have GM variables
    if (my_getValue("UCP.auto." + groupname) === undefined) {
        my_setValue("UCP.auto." + groupname, "true");
    }
    if (my_getValue("UCP.lastloadtime." + groupname) === undefined) {
        my_setValue("UCP.lastloadtime." + groupname, Math.round(CPStartTime.getTime() / 1000));
    }
    var automode = true;
    if (my_getValue("UCP.auto." + groupname) === "true") {
        automode = true;
    } else {
        automode = false;
    }
    if (automode) {
        automodetxt = "on";
    }

    groupConfig.asyncmode = my_getValueD("UCP.async." + groupname, "async");
    // V0.5.9 used 
    switch (groupConfig.asyncmode) {
    case "full-async":
        groupConfig.asyncmode = "async";
        my_setValue("UCP.async." + groupname, "async");
        break;
    case "semi-async":
        groupConfig.asyncmode = "sync";
        my_setValue("UCP.async." + groupname, "sync");
        break;
    }
    
    // 
    // read UCP.http://www.flickr.com/groups/name/discuss/.lastloadtime
    var lastloadtime = parseInt(my_getValue("UCP.lastloadtime." + groupname), 10) * 1000;
    var elapstime = CPStartTime.getTime() - lastloadtime;

//DEBUG
/*    if (elapstime > 1000 * 60 * 60) //more than 1 hour : cleanup
    {
        // clear all GM_values for this group
        cleanupUCPvariables(groupname);
    }*/
    // store UCP.http://www.flickr.com/groups/name/discuss/.lastloadtime
    my_setValue("UCP.lastloadtime." + groupname, Math.round(CPStartTime.getTime() / 1000));

    var UCPanchor = document.createElement('font'); // just some type of element that won't disturb the layout
    var myanchor = UCPanchor.appendChild(document.createElement('a'));
    myanchor.innerHTML = "UCheckPlay " + automodetxt + "&nbsp;"; // +" (" + playername +")" ;
    myanchor.title = "Click to turn " + (automode ? "off" : "on");
    myanchor.href = location;
    myanchor.id = "UCheckPlay";
    myEventListener(myanchor, 'click', checkPlayClicked, false);


//add auto on/off link
    var discussPage;
    var groupNavigationMenu;
    var navigation = document.evaluate("//div[@id='Main']/table[@id='SubNav']/tbody/tr/td[@class='Section']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (navigation) { // 'Discuss' page
        discussPage = true;
        groupNavigationMenu = document.evaluate(".//p[@class='LinksNewP']/span[@class='LinksNew']", navigation, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        appendNavigationItem(groupNavigationMenu, UCPanchor);
    }
    if (!navigation) {
        navigation = document.evaluate("//div[@id='Main']/h1[@id='Tertiary']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (navigation) { // Challenge thread
            discussPage = false;
            groupNavigationMenu = document.createElement('span');
            groupNavigationMenu.setAttribute('style', 'text-decoration: none; font-size: small; font-weight: normal;');
            navigation.appendChild(groupNavigationMenu);
            groupNavigationMenu.appendChild(UCPanchor);
        }
    }
    if (!navigation) {
        my_log("unable to analyze");
        return;
    }

    if (!groupNavigationMenu) {
        return;
    }

    if (automode && discussPage === true) {
        // only append [sync|async] on Discuss page
        myanchor = document.createElement('font');
        myanchor.innerHTML = "&nbsp;[";
        UCPanchor.appendChild(myanchor);

        var syncanchor = document.createElement('a');
        syncanchor.innerHTML = "sync";
        syncanchor.title     = "Synchronous mode: processes challenges one by one " +
            "(a challenge is processed completely before the next is loaded)";
        if (groupConfig.asyncmode !== "sync") {
            syncanchor.href = location;
            myEventListener(syncanchor, 'click', syncClicked, false);
        }
        UCPanchor.appendChild(syncanchor);

        myanchor = document.createElement('font');
        myanchor.innerHTML = "|";
        UCPanchor.appendChild(myanchor);

        var asyncanchor = document.createElement('a');
        asyncanchor.innerHTML = "async";
        asyncanchor.title     = "Asynchronous mode: processes all challenges concurrently";
        if (groupConfig.asyncmode !== "async") {
            asyncanchor.href = location;
            myEventListener(asyncanchor, 'click', asyncClicked, false);
        }
        UCPanchor.appendChild(asyncanchor);

        myanchor = document.createElement('font');
        myanchor.innerHTML = "]&nbsp;";
        UCPanchor.appendChild(myanchor);

    }

    // create field for messages (reached limit, not logged in, ..)
    var mydiv = document.createElement('div');
    mydiv.style.display = 'none';
    mydiv.id            = "UCheckPlayStatusDiv";
    navigation.appendChild(mydiv);

    myanchor = document.createElement('p');
    myanchor.id        = "UCheckPlayStatus";
    myanchor.innerHTML = "CheckPlay statusfield";
    myanchor.setAttribute('style', 'text-decoration: none; color: Red');
    mydiv.appendChild(myanchor);

    if (playername === "") {
        // We can't give useful feedback if the user isn't logged in, so abort processing.
        var wanchor = document.getElementById("UCheckPlayStatusDiv");
        wanchor.style.display = 'block';
        wanchor               = document.getElementById("UCheckPlayStatus");
        wanchor.innerHTML     = "Sign in to your Flickr account if you want to take part in challenges in this group";
        wanchor.style.color   = 'red';
        return;
    }

// check themelist & chlgheaders

    if (discussPage) {
        var topicListingTable = document.evaluate("//div[@id='Main']/table[@class='TopicListing']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (topicListingTable) {

            if (automode) {
                processTopicListingTable(topicListingTable);
            }
        } else {
            my_log("not processing (no TopicListing found!)");
        }
    } else { // challenge thread page
        if (automode) {
            var discussionTopic = document.evaluate(".//*[@id='DiscussTopic']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            var chlgname = document.evaluate("//div[@id='Main']/table//td[@id='GoodStuff']/h2", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
            var thread   = document.location.href;
            var ucpThread = new UCPThread(thread, chlgname, 0, "UPDATING", true, null);
            ucpThread.retrieve();
            ucpThread.lastLoadTime = Math.round(CPStartTime.getTime() / 1000);
            var challengeConfig = getChallengeConfig(chlgname);
            processDiscussionTopic(discussionTopic, ucpThread, challengeConfig, true);
        }
    }

    addCPheader();
    checkVersion(groupNavigationMenu);

    return;

    // *******************
    //  End of processing
    // *******************

})();






