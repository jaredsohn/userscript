// ==UserScript==
// @name           MafiaScum.net vote counting assistant
// @namespace      http://forum.mafiascum.net/memberlist.php?mode=viewprofile&u=16845
// @description    Helps moderators of mafiascum.net Mafia games come up with accurate vote counts
// @include        http://forum.mafiascum.net/viewtopic.php?f=50&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=8&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=1&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=2&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=3&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=11&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=23&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=51&*
// @include        http://forum.mafiascum.net/viewtopic.php?f=83&*
// ==/UserScript==

var divs = document.documentElement.getElementsByTagName('div');
var di;
var settingsVisible = false;
var counterSettings = undefined;
var voterAlive = {};
var voterMod = {};
var voterModNames = {};
var voterVoteValue = {};
var replacementMatrix = {};
var replacementIndex = {};
var stateKey = "f"+window.location.search.match(/(f)=(\d+)\&(t)=(\d+)/).join("_").split("f")[2];
var state = GM_getValue(stateKey, undefined)
if (state !== undefined) state = JSON.parse(state);

function voteOptionOnChange(p,v) {
    var vo = document.getElementById("voteCounterVote" + p + "_" + v);
    state.posts[p].votes[v] = vo.value;
    GM_setValue(stateKey, JSON.stringify(state));
    vo.blur();
    return true;
}

function getUserTypes() {
    var pli;
    if (state === undefined) return true;
    for (pli = 0; pli < state.userList.length; pli++) {
        var uNames = state.userList[pli].split("<");
        var ui;
        voterAlive[pli] = true;
        voterMod[pli] = false;
        voterVoteValue[uNames[0]] = 1;
        for (ui = 0; ui < uNames.length; ui++) {
            replacementMatrix[uNames[ui]] = uNames[0];
            replacementIndex[uNames[ui].toLowerCase()] = pli;
            if (uNames[ui] == "DEAD") voterAlive[pli] = false;
            if (uNames[ui] == "MOD") {
                voterMod[pli] = true;
                voterModNames[uNames[0]] = true;
            }
            if (uNames[ui].match(/^(\d+)$/)) {
                voterVoteValue[uNames[0]] = uNames[ui];
            }
        }
    }
    return true;
}

function countVotes(p) {
    var missingPosts = "";
    var userVotes = {};
    var voteTimestamps = {};
    var votesOnPlayer = {};
    var notVoting = {};
    var livingPlayers = 0;
    var bbcode = "[area=Vote Count][list]";
    var maxVotes = 1;
    var pi;
    for (pi = 0; pi <= p; pi++) {
        if (state.posts[pi] === undefined) { missingPosts += " #" + pi; continue; }
        var vi = 0;
        while (state.posts[pi].votes[vi] !== undefined) {
            var vval = state.posts[pi].votes[vi];
            var voter = replacementMatrix[state.posts[pi].author];
            if (vval == -5) {userVotes = {};} /* reset vote count */
            if (vval == -4) {missingPosts += " #" + pi;} /* undecided */
            if (vval == -3) {} /* not a vote */
            if (vval == -2) {userVotes[voter] = undefined;} /* unvote */
            if (vval >= -1 && (userVotes[voter] === undefined || userVotes[voter] != vval)) { /* vote for lynch or no lynch */
                userVotes[voter] = vval; voteTimestamps[voter] = pi;
            }
            vi++;
        }
    }
    if (missingPosts !== "") {
        window.alert("Could not count votes, as you have not processed these posts:" + missingPosts);
        return false;
    }
    /* Compile the lists of votes on each player.
       Ignore votes from and on dead players.
       (Mods can vote in order to put secret extra votes on someone, but don't by default. And they don't count towards lynch threshold.) */
    for (pli = 0; pli < state.userList.length; pli++) {
        if (!voterAlive[pli]) continue;
        if (!voterMod[pli]) livingPlayers++;
        var voter = state.userList[pli].split("<")[0];
        if (userVotes[voter] !== undefined && userVotes[voter] != -1 && !voterAlive[userVotes[voter]]) {
            userVotes[voter] = undefined;
        }
        if (userVotes[voter] === undefined && !voterMod[pli]) {
            notVoting[voter] = true;
            continue;
        }
        if (votesOnPlayer[userVotes[voter]] === undefined) votesOnPlayer[userVotes[voter]] = {};
        votesOnPlayer[userVotes[voter]][voteTimestamps[voter]] = voter;
    }
    /* Sort the players being voted by number of votes, and sort the votes in timestamp order. */
    for (pli = -1; pli < state.userList.length; pli++) {
        if (votesOnPlayer[pli] === undefined) continue;
        votesOnPlayer[pli].voteCount = 0;
        votesOnPlayer[pli].voteString = "";
        for (pi = 0; pi <= p; pi++) {
            if (votesOnPlayer[pli][pi] !== undefined) {
                votesOnPlayer[pli].voteCount += 1 * voterVoteValue[votesOnPlayer[pli][pi]];
                maxVotes += 1 * voterVoteValue[votesOnPlayer[pli][pi]];
                votesOnPlayer[pli].voteString += " [url=" + state.posts[pi].link + "]" + votesOnPlayer[pli][pi] + "[/url]";
            }
        }
    }
    for (vi = maxVotes; vi >= 0; vi--) {
        for (pli = -1; pli < state.userList.length; pli++) {
            if (votesOnPlayer[pli] === undefined) continue;
            if (votesOnPlayer[pli].voteCount != vi) continue;
            bbcode += "[*][b]" + (pli == -1 ? "No Lynch" : state.userList[pli].split("<")[0]) + " (" + vi + ")[/b]:" + votesOnPlayer[pli].voteString + "\n";
        }
    }
    bbcode += "[*][b]Not voting:[/b]";
    var nonvoter;
    var nononvoters = true;
    for (nonvoter in notVoting) {nononvoters = false; bbcode += " " + nonvoter;}
    if (nononvoters) bbcode += " ([i]nobody[/i])";
    bbcode += "[/list]\n";
    bbcode += "[b]With " + livingPlayers + " alive it is " + (livingPlayers % 2 ? (livingPlayers+1) / 2 : (livingPlayers/2) + 1) + " to lynch.[/b]";
    bbcode += "[/area]";
    window.alert(bbcode);
    return false;
}

getUserTypes();
for (di = 0; di < divs.length; di++) {
    var d = divs[di];
    var postNumber;
    var postAuthor;
    var postLink;
    if (d.className == 'search-box') {
        var newLink = document.createElement("a");
        newLink.href = "#";
        newLink.onclick = function() {
            if (settingsVisible) {
                var y = counterSettings.style;
                y.setProperty('display', 'none', null);
                settingsVisible = false;
            } else if (counterSettings !== undefined) {
                var y = counterSettings.style;
                y.setProperty('display', 'block', null);
                settingsVisible = true;
            } else {
                counterSettings = document.createElement("div");
                counterSettings.innerHTML = '<p style="clear:both"></p><p>To enable the vote counter for this thread, write the list of player names here, one name per line, matching their username exactly. (Likewise, to disable it, delete the list.) If a player is replaced, use the syntax <tt>NewPlayer&lt;OldPlayer</tt> (potentially with more entries in the list). If a player dies, put <tt>&lt;DEAD</tt> at the end of the line (as if the first player in that slot had replaced DEAD). Along similar lines, you can mark moderators with <tt>&lt;MOD</tt> (moderators will be assumed to not be voting by default), and doublevoters with <tt>&lt;2</tt> (nonvoters with <tt>&lt;0</tt>). Do not reorder the list once it has been made.</p><form method="get" id="vote-counter-settings" action="#"><fieldset><textarea rows="13" cols="20" id="vote-counter-names"></textarea></fieldset></form><p><a href="#" id="voteCounterSubmit">Update list of names</a></p>';
                newLink.parentNode.insertBefore(counterSettings, newLink.nextSibling);
                counterSettings.getElementsByTagName("a")[0].onclick = function() {
                    if (state === undefined) state = {};
                    state.userList = counterSettings.getElementsByTagName("textarea")[0].value.split("\n");
                    if (state.userList.length == 0 ||
                        state.userList.length == 1 && state.userList[0] == "") GM_deleteValue(stateKey);
                    else GM_setValue(stateKey, JSON.stringify(state));
                    window.location.reload(false);
                    return false;
                }
                if (state !== undefined)
                    counterSettings.getElementsByTagName("textarea")[0].value = state.userList.join("\n");
                settingsVisible = true;
            }
            return false;
        };
        newLink.innerHTML = "Vote counter settings";
        var newStyle = newLink.style;
        newStyle.setProperty("margin-left", "10px", null);
        newStyle.setProperty("margin-top", "7px", null);
        newStyle.setProperty("float", "left", null);
        d.parentNode.insertBefore(newLink, d.nextSibling);
    }
    if (d.className == 'postbody' && state !== undefined) {
        // Grab the post number; we look for the "author" paragraph, then
        // the number's inside the only strong inside that. Also grab a
        // link to the post, and the name of the author.
        var paras = d.getElementsByTagName('p');
        var pi;
        for (pi = 0; pi < paras.length; pi++) {
            var p = paras[pi];
            if (p.className == 'author') {
                var strongNode = p.getElementsByTagName('strong')[0];
                postNumber = strongNode.textContent.split("#").join("");
                postLink = strongNode.parentNode.href;
                // And put in the count-votes link while we're at it.
                var countAnchor = document.createElement("a");
                countAnchor.href = "#";
                countAnchor.innerHTML = "&nbsp;(count votes to here)";
                countAnchor.onclick = (function(n){return function(){
                    return countVotes(n);
                }})(postNumber);
                strongNode.parentNode.parentNode.insertBefore(countAnchor, strongNode.parentNode.nextSibling);
            }
        }
        // Author name is stored in the first dt in the post itself (one level
        // outside the post body).
        postAuthor = d.parentNode.getElementsByTagName('dt')[0].textContent.trim();
        // Remember authorship info.
        if (state.posts === undefined) state.posts = {};
        if (state.posts[postNumber] === undefined) state.posts[postNumber] = {};
        if (state.posts[postNumber].votes === undefined) state.posts[postNumber].votes = {};
        state.posts[postNumber].author = postAuthor;
        state.posts[postNumber].link = postLink;
        // Look for votes in the post. Whether made via [b] or [vote], a vote
        // is a span tag, with font-weight:bold, containing "vote" in some
        // case. (We don't check for word boundaries, etc., both to get
        // "unvote" and because false negatives are very bad, false positives
        // harmless.)
        var spans = d.getElementsByTagName('span');
        var si;
        var vi = 0;
        for (si = 0; si < spans.length; si++) {
            var s = spans[si];
            if (s.textContent.toLowerCase().indexOf('vote') == -1) continue;
            var fontWeight = window.getComputedStyle(s).getPropertyValue('font-weight');
            if (fontWeight != 700) continue; //bold
            // Quoting is not voting.
            var e = s;
            var quoteFound = false;
            while (e !== null) {
                if (e.tagName !== undefined &&
                    e.tagName.toLowerCase() == 'blockquote') quoteFound = true;
                e = e.parentNode;
            }
            if (quoteFound) continue;
            var y = s.style;
            y.setProperty('background-color', '#00FFFF', null);
            var voteForm = document.createElement("form");
            voteForm.method = "get";
            voteForm.action = "#";
            var voteOptionName = "voteCounterVote" + postNumber + "_" + vi;
            var voteFormHTML = '<select name="' + voteOptionName + '" id="' + voteOptionName +
                '"><option value="-5">Reset vote count</option><option value="-4">Undecided</option>' +
                '<option value="-3"'
                if (voterModNames[postAuthor]) voteFormHTML += ' selected="selected"';
                voteFormHTML += '>Not a vote</option><option value="-2">Unvote</option><option value="-1">No Lynch</option>';
            var pli;
            for (pli = 0; pli < state.userList.length; pli++) {
                var uName = state.userList[pli].split("<")[0];
                voteFormHTML += '<option value="' + pli + '">' + uName + '</option>';
            }
            voteForm.innerHTML = voteFormHTML + '</option>';
            
            /* must do these before s.insertBefore */
            var voterNumber = s.textContent.match(/^(unvote)\b/i) && !s.textContent.match(/\b(vote)\b/i) ? -2 : -4;
            var voteMatch = s.textContent.match(/^(unvote\W*)?vote\W+(\w*(\s+\w+)*)\W*$/i);
            if (voteMatch !== null && replacementIndex[voteMatch[2].toLowerCase()] !== undefined)
                voterNumber = replacementIndex[voteMatch[2].toLowerCase()];
            
            s.insertBefore(voteForm, null);
            y = voteForm.style;
            y.setProperty('display', 'inline', null);
            var voteOption = document.getElementById(voteOptionName);
            if (state.posts[postNumber].votes[vi] === undefined)
                state.posts[postNumber].votes[vi] = voterModNames[postAuthor] ? -3 : voterNumber;
            voteOption.onchange = (function(p,v){return function(){return voteOptionOnChange(p,v);}})(postNumber, vi);
            voteOption.value = state.posts[postNumber].votes[vi];
            vi = vi + 1;
        }
    }
}
if (state !== undefined) GM_setValue(stateKey, JSON.stringify(state));

