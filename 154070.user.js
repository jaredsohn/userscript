// ==UserScript==
// @name       RYM New Post Indicator
// @version     3.0
// @match      http://rateyourmusic.com/boards*
// @copyright  2012+, quiapz
// ==/UserScript==

var firstLoad = 0;

if (GM_getValue(parent.location.href) == undefined){
	firstLoad = 1;
	GM_setValue(parent.location.href,'yes');
}

var topics = ((document.getElementsByClassName('mbgen'))[0].firstChild.nextSibling).getElementsByTagName('tr');

for (i = 0; i < topics.length; i++) {
	if (i != 0){
		if ((topics[i].getAttribute('id') != null)){
			if ((topics[i].getAttribute('id').indexOf('oldpost') == -1)){
				threadInfo(topics[i]);
			}
		} else{
			threadInfo(topics[i]);
		}
	}
}

function threadInfo(a){
	var info = a.getElementsByTagName('td') ;

	var url = (info[0].getElementsByTagName('a'))[0].getAttribute('href');
	var threadID = url.substr(26);
	var replies = info[3].innerHTML.replace(',','');

	if ((GM_getValue(threadID) == undefined) || (firstLoad == 1)){
		GM_setValue(threadID,replies);
		if ((firstLoad == 0)){
			a.style.backgroundColor = '#FFFFAA';
		}
	} else{
		var oldReplies = GM_getValue(threadID);
		if (GM_getValue(threadID) != replies){
			a.style.backgroundColor = '#FFFFAA';
			var countDif = parseInt(replies.replace(',','')) - parseInt(oldReplies.replace(',',''));
	        var count = document.createElement('a');
	        count.innerHTML = '+'+countDif;
	        count.href = 'http://rateyourmusic.com/board_message?message_id='+threadID+'&start='+ (parseInt(oldReplies.replace(',',''))+1);
	        var targetNode = a.firstChild.lastChild;
	        targetNode.parentNode.insertBefore(document.createTextNode('  '), targetNode.nextSibling);
	        targetNode.parentNode.insertBefore(count, targetNode.nextSibling);
        }
	}
}

var newPost = (document.getElementsByClassName('smallbutton'))[0];
var newButton = newPost.cloneNode(true);
newButton.removeAttribute('href');
newButton.setAttribute('href', 'javascript:void(0);');
newButton.onclick=function(){GM_deleteValue(parent.location.href); window.location.reload();};
newButton.innerHTML = 'Mark Topics Read';
newPost.parentNode.insertBefore(newButton,newPost.nextSibling);