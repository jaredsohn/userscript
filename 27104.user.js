// ==UserScript==
// @name           YKTTW permalinks
// @namespace      http://tvtropes.org/pmwiki/pmwiki.php/Main/Fleb
// @description    Adds a permanent, bookmarkable link to unlaunched You-Know-That-Thing-Where threads.
// @include        http://tvtropes.org/pmwiki/ykttw.php*
// @include        http://tvtropes.org/pmwiki/launcher.php*
// ==/UserScript==

function getLoc(y) {
	return y.getElementsByClassName('timestamp')[0];
    }

var discussionBase = "http://tvtropes.org/pmwiki/discussion.php?id=";
var linkText = "[permalink]";
var linkHover = "Click to view only this YKTTW";

var perm = document.createElement('a');
perm.textContent = linkText;
perm.setAttribute('title', linkHover);
var loc, yID;

var entries = document.getElementsByClassName('aYKTTW');

for (var i=0; i < entries.length; i++) {
    loc=getLoc(entries[i]);
    //yID = entries[i].getAttribute('ykttwid');
    yID = entries[i].id.slice(5);
    perm.href = discussionBase + yID;
    loc.appendChild(perm.cloneNode(true));
    }

/* Sample HTML: 

<div class="aYKTTW" id="YKTTWabc123yz" ykttwid="abc123yz" ><div class="wtitleholder" id="wtitleholderabc123yz">  title! </div><div class="timestamp" ><span id="timestampholderforabc123yz" > <span class="newmsg"><img src="pub/check.png" width="20" height="20" /></span> <span class="newmsg"><img src="pub/check.png" width="20" height="20" /></span> added: 2008-05-18 03:59:46 by <span style="color:black;">UnknownTroper</span>(last reply: 2008-05-19 09:02:18)</span><img class="pseudobutton" title="edit this YKTTW" onclick="editykttw('abc123yz');" src="pub/images/edit_icon.gif"/></div>
<div id="ykttwtextabc123yz" class="ykttwtext" >

content!

</div>
<div id="ykttweditorabc123yz" class="replyeditor" style="display:none;">
<div class="centered">Editing this YKTTW entry:</div>
<label for="wtitleabc123yz" style="position:relative;left:5%;">Working Title:</label>
<input id="wtitleabc123yz" type="text" size="45" style="position:relative;left:5%;" autocomplete="off" maxlength="45" value=""/><br/>
<textarea class="entryeditor" rows="5" cols="40" style="width:90%;" autocomplete="off" id="ykttwtextareaabc123yz"></textarea>
<div class="centered" ><button onclick="updateykttw('abc123yz');">enter changes</button></div></div><!-- editor -->
<div class="levelOneCommands">
<div class="levelTwoCommands" style="display:none;"><button onclick="kickoff('YKTTWabc123yz', 'kickoffinputforabc123yz', 'kickoffmessageforabc123yz');">Kick it off as:</button><input id="kickoffinputfor" type="text" autocomplete="off" onkeyup="clearmsgs();"/><span class="KOmsg" id="kickoffmessageforabc123yz"></span></div>

<button  class="replyopener" id="yktogglepanelrepliesabc123yz" onclick="togglereplies('repliesabc123yz', 'abc123yz', '2008-05-17 17:07:06');">show replies</button>
<span style="color:midnightblue;">replies: 8 <span class="newmsg"><img src="pub/check.png" width="20" height="20" /></span> </span><br/></div>
<div id="repliesabc123yz" class="replyBlock" style="display:none;" paneltype="panel"><div id="repliesholderabc123yz" ></div>
<div class="suspect" id="lastreplyforabc123yz"></div>
<div id="aReplyInputabc123yz" class="aReplyInput" style="display:none;" paneltype="subpanel">
<span class="plainlabel">Your reply:</span><br/>
<textarea class="entryeditor"  style="width:90%;" rows="5" cols="40" autocomplete="off" id="inputforabc123yz"></textarea>
<div class="centered"><button onclick="sendreply('abc123yz', 'inputforabc123yz', 'lastreplyforabc123yz', 'aReplyInputabc123yz', 'replycountforabc123yz');">send reply</button></div></div>
<div class="levelThreeCommands"><table style="width:100%;padding:4px;"><tr><td style="text-align:left;"><button title="this button opens and closes the reply editor" onclick="yktogglepanel('aReplyInputabc123yz');">reply</button></td><td style="text-align:center;"><button title="closes the list of replies for this YKTTW" onclick="togglereplies('repliesabc123yz', 'abc123yz', '2008-05-17 17:07:06');">close replies</button></td><td style="text-align:right;"><button title="When the trope is ready, use this button to start the page. It will copy this discussion into a link for you." onclick="showlauncher('abc123yz');" >launch</button></td></tr></table></div></div></div>

*/
