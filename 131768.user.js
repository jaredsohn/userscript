/*
    Copyright (C) 2012 SBscripts

    THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THIS SOFTWARE OR THE USE OR OTHER DEALINGS IN THIS SOFTWARE.

*/

(function(){//Begin wrapper
// ==UserScript==
// @id             TopicHunter.js
// @name           TopicHunter.js -- auto-flag spam at the "Script development forums"
// @version        0.1.1 alpha
// @namespace      scripts.seabreeze.tk
// @author         SBscripts
// @description    Auto-flag spam at the "Script development forums" at UserScripts.org
// @include        http://userscripts.org/forums/1
// @include        http://userscripts.org/forums/1#*
// @include        https://userscripts.org/forums/1
// @include        https://userscripts.org/forums/1*
// @include        http://userscripts.org/topics/*
// @include        https://userscripts.org/topics/*
// @run-at         document-end
// @require         https://secure.dune.net/usocheckup/131768.js?method=install&open=window&maxage=1&custom=yes&topicid=0
// @whatsnew       Chrome compatibility fix
// ==/UserScript==
/**
	Configuration
*/
var spamTopics=[
	{
		title: /^([A-Z][a-z]+){2}$/,
		content: /^([A-Z][a-z]+){4}$/
	}
];
var autoRefresh=60000;//Value in milliseconds after which to refresh and hunt new spam topics. 0 for disabled.


/**
	Global vars
*/
var $q=function (selector){return document.querySelector(selector)},
$a=function (selector){return document.querySelectorAll(selector)},
$d=document,
debug=false;


/**
	Functions
*/
function log(str){
	if(debug){
		GM_log(str);
	}
}


/**
	Generic
*/
log("Now entering "+location.href);


/**
	Topic index

*/
var topicTable=$q('table.wide.topics>tbody')||$q('table.wide.topics');


//log(topicTable.innerHTML)//Warning! This will throw if topicTable does not exist!

if(topicTable){//At forum index
	var topics=topicTable.childNodes;
	var len=topicTable.childNodes.length;
	
	//log('Length: '+len);

	for(var i=0;i<len;i++){
		var topic=topics[i];
		
		//log('nodeName: '+topic.nodeName+'\tnodeType: '+topic.nodeType)
		
		//No text nodes
		if(topic.nodeType===3) continue;
		
		//log(topic)
		//log(topic.textContent)
		
		var isRead=!topic.querySelector('img.icon.green');
		log('Is this topic read? '+isRead);
		
		if(isRead) continue;
		
		log('We\'ve got the right topic!');
		
		/**
			Test topic title
		*/
		var topicLink=topic.querySelector('a.entry-title');
		var topicTitle=topicLink.textContent;
		
		log('Topic title: '+topicTitle);
		
		for(var j=0;j<spamTopics.length;j++){//Loop through spam topics array
			
			var spamRegex=spamTopics[j].title;
			
			var hasSpammyTitle=spamRegex.test(topicTitle);
			
			log('Spammy title? '+hasSpammyTitle);
			
			if(!hasSpammyTitle) continue;
			
			location.replace(topicLink.href+"#topicHunter");
		
		}
		
		
	}
	//Auto-refresh functionality
	if(autoRefresh>999) setTimeout("location.reload()",autoRefresh);//Minimal 1 second
}

/**
	Spam topic
*/
var postsTable=$q('table.wide.posts>tbody')||$q('table.wide.posts');
//log(postsTable.innerHTML)//Warning! This will throw if postsTable does not exist!

if(postsTable){//No empty topic
	var posts=postsTable.childNodes;
	var len=postsTable.childNodes.length;
	
	//log('Length: '+len);

	//If all posts are deleted
	if(len<3&&postsTable.getElementsByTagName('tr').length===0&&location.hash.indexOf('#topicHunter')===0) return location.replace($q('div#section>div.container>p.subtitle>a').href);

	for(var i=0;i<len;i++){
		var post=posts[i];
		
		log('nodeName: '+post.nodeName+'\tnodeType: '+post.nodeType)
		
		//No text nodes
		if(post.nodeType===3) continue;
		
		//log(post)
		//log(post.textContent)
		
		/*
			If we've just submitted a report
		*/
		if(location.hash.indexOf('#topicHunter')===0){//Only spam detecting from the main page right now, because the script doesn't remember that we've already reported posts, thus it would re-report a spam post with each encounter.
			if(location.hash.indexOf('#topicHunter_return_from_')===0){
				if(location.hash.indexOf(post.id)>-1) return location.replace($q('div#section>div.container>p.subtitle>a').href);//We only process the first post for now
			}
		}else{
			return;//We only process the first post for now
		}
		
		var spam_Poll=post.querySelector('div.spam_poll');
		log('Is this post marked as spam? '+!!spam_Poll);
		

		/**
			Test if topic matches spam topic blacklist
		*/
		var postTitle=$q('h2#topic-title').textContent.match(/^\s+(.+?)\s+$/)[1];
		var postBody=post.querySelector('td.body.entry-content>p').textContent;
		
		log('Post title: '+postTitle);
		
		for(var j=0;j<spamTopics.length;j++){//Loop through spam topics array
			
			
			/**
				Check topic title
			*/
			if(location.hash!=="#topicHunter"){//If topicHunter is in location.hash, the title has already been checked
				var spamRegex=spamTopics[j].title;

				var hasSpammyTitle=spamRegex.test(postTitle);
			
				log('Spammy title? '+hasSpammyTitle);
			
				if(!hasSpammyTitle) break;//We only process the first post for now
			}
			
			
			/**
				Check topic body
			*/
			var spamRegex=spamTopics[j].content;

			var hasSpammyContent=spamRegex.test(postBody);
			
			log('Spammy contents? '+hasSpammyContent);
			
			if(!hasSpammyContent) break;//We only process the first post for now

			//100% pure spam!
			log('This post is spam!');
			
			if(spam_Poll){
				var reportForm=spam_Poll.getElementsByTagName('form')[0];
			}else{
				var reportForm=post.querySelector('form.spam_form');
			}
			
			reportForm.action+=((location.hash.length>1)?location.hash:'#')+'_return_from_'+post.id;
			
			log('Submitting spam report form');
			
			setTimeout(function(){
				reportForm.submit();
			},500);
			
		
		}
		
		//We only process the first post for now
		break;
	}
}



//End wrapper
})();