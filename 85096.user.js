// ==UserScript==
// @name           Post delicious threads of tasty goodness
// @namespace      derp
// @description    anal grapes
// @include        *forumwarz.com/discussions/view/14505*
// ==/UserScript==


//********************************************************************************************
// CHANGE THIS IF YOU WANT TO POST IN A DIFFERNET FORUM **********************************
forumID=7383
//********************************************************************************************
// CHANGE THIS IF YOU WANT TO POST SOMETHING ELSE  **********************************
postwords=new Array("space is old lol", "space is a whale beast", "spacekadt loves dicks in her butt", "'i am fat' - spacekadt", "'i am old' - spacekadt");
//********************************************************************************************

function getaphrase() {
	return postwords[Math.floor(Math.random()*(postwords.length))];
}

// make it spam
function dicksinmybutt() {
if (document.getElementById("gaynessbutts").contentDocument.location.href.indexOf("post")>-1)
	{
	var text = "";
	document.getElementById("gaynessbutts").contentWindow.document.getElementById("discussion_topic_subject").value=postwords[Math.floor(Math.random()*(postwords.length))];

		text = postwords[Math.floor(Math.random()*(postwords.length))];

	document.getElementById("gaynessbutts").contentWindow.document.getElementById("discussion_post_body").value=text;
	var farts = document.getElementById("gaynessbutts").contentWindow.document.getElementsByName("discussion_topic[topic_id]");
	var rnd = Math.floor(Math.random()*(farts.length));
	farts[rnd].checked='true';
	document.getElementById("gaynessbutts").contentWindow.document.getElementById("preview_buttons").getElementsByTagName("a")[0].innerHTML="<input id='poopdick' onclick='Discussions.post_message('/discussions/post/"+forumID+"'); return false;' type='button'>Post it!</input>";

	document.getElementById("gaynessbutts").contentWindow.document.getElementById('poopdick').click();
	}
	else {
		var rndtime = (Math.floor(Math.random()*60));
		if (rndtime==57) {
			rndtime=rndtime*3
		} 
		if (rndtime==53){
			rndtime=rndtime*4
		}
		if (rndtime==46)	{
				rndtime=rndtime*6
		}
		var time = 30000 + (rndtime*1000);
		GM_log(time/1000 + "seconds pause");
		setTimeout("document.getElementById('gaynessbutts').src='/discussions/post/"+forumID+"'",time);
	}
}
//o lawd dicks in my butt

// put in the iframe
var derp = document.getElementById("copyright");
derp.innerHTML = "<iframe width=50% height=50% align='left' src='/discussions/post/"+forumID+"' id='gaynessbutts'></iframe>";
document.getElementById("gaynessbutts").addEventListener('load', dicksinmybutt, false)
