// ==UserScript==
// @name           CloudLL
// @namespace      pendevin
// @include        http://endoftheinter.net/*
// @include        http://boards.endoftheinter.net/*
// @include        http://archives.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// @include        https://archives.endoftheinter.net/*
// ==/UserScript==

//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf("#")>=0)hash[1]=hash[1].substring(0,hash[1].indexOf("#"));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf("#")>=0)hash[0]=hash[0].substring(0,hash[0].indexOf("#"));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
var XHR={
	// adds an extra 'doc' property to the response object that contains
	// the document element of the response
	createDoc:function(r,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		var a=r.responseText;
		html.innerHTML=a;
		doc.appendChild(html);
		r.doc=doc;
		callback(r,optional);
	},

	createQueryString:function(obj){
		var ret=[];
		for(var i in obj)
			ret.push([i,encodeURIComponent(obj[i])].join('='));
		return ret.join('&');
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent':navigator.userAgent,
				'Content-Type':'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	},

	//sends an XHR post message encoded as a url
	//data should be an object whose parameters are what you want to send
	post:function(url,callback,data,optional){
		if(optional==undefined)optional=null;
		unsafeWindow.console.log(XHR.createQueryString(data));
		GM_xmlhttpRequest({
			method:'POST',
			url:url,
			headers:{
				'User-Agent':navigator.userAgent,
				'Content-Type':'application/x-www-form-urlencoded',
				'Content-Length':XHR.createQueryString(data).length,
			},
			data:XHR.createQueryString(data),
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

//global variables
var menubar=document.getElementsByClassName('menubar')[0];
var get=getUrlVars(location.href);
var userbar=document.getElementsByClassName('userbar')?document.getElementsByClassName('userbar')[0]:null;
if(userbar){
	var username=userbar.firstChild.textContent.replace(/ \(gs.?\)$/,'').replace(/ \(-?\d+\)$/,'');
	GM_setValue('username',username);
	var userid=parseInt(getUrlVars(userbar.firstChild.href)['user']);
	GM_setValue('userid',userid);
}
else{
	var username=GM_getValue('username','')
	var userid=parseInt(GM_getValue('userid','0'))
}
var body=document.getElementsByClassName('classic3')[0]?document.getElementsByClassName('classic3')[0].nextSibling:document.getElementsByClassName('body')[0];

//topic shit
if(location.pathname=='/showmessages.php'){
	//add a new infobar for our shit
	var cloudBar=document.createElement('div');
	cloudBar.className='infobar';
	cloudBar.id='cloudBar';
	//infobar content goes like: [Tags] | Classify Topic
	cloudBar.innerHTML='<span id="cloudTags"></span> | <span class="linky" id="cloudClassify">Classify Topic</span>';
	var cloudTags=cloudBar.firstChild;
	var cloudClassify=cloudBar.lastChild;
	//add cloudbar to document
	document.getElementById('u0_1').parentNode.insertBefore(cloudBar,document.getElementById('u0_1'));
	//XHR.get(http://llanim.us:6274/topic/classify) to get topic tags
	XHR.get('http://llanim.us:6274/topic/classify?topics=['+get['topic']+']&username='+username,function(r){
		unsafeWindow.console.log(r.responseText);
		//handle error codes
		//get mah tags
		var tags=JSON.parse(r.responseText)[0].tags;
		//if there's no tags, say so, and suggest the guy add some
		if(tags.length==0){
			var noTag=document.createElement('span');
			noTag.className='cloudTag';
			noTag.innerHTML='No tags. You should add some.'
			cloudTags.appendChild(noTag);
		}
		else{
			//order the tags by probability - least to greatest
			tags.sort(function(a,b){return a.prob<b.prob;});
			//loop through the tags and add them to the bar
			//if prob is below threshold, discard it -- done. current threshold set to 40%
			//limit the number of tags to some maximum -- done. current max set to 10
			for(var i=0;i<10,i<tags.length;i++){
				if(tags[i].prob>.4){
					var tag=document.createElement('a');
					tag.className='cloudTag';
					tag.id='cloudTag_'+tags[i].id;
					tag.title=tags[i].name+' ('+(Math.round(tags[i].prob*10000)/100)+'%)';
					tag.innerHTML=tags[i].name+' ('+(Math.round(tags[i].prob*10000)/100)+'%)';
					//link to this tag's topic list
					tag.href='/showtopics.php?board=cloudLL&type=tag&tagid='+tags[i].id;
					cloudTags.appendChild(tag);
				}
			}
		}

	});
	//add event listener to classify link
	cloudClassify.addEventListener('click',function(){
		//popup wrapper
		var wrapper=document.createElement('div');
		wrapper.id='cloudWrapper';
		body.appendChild(wrapper);
		//shadow thing
		var shadow=document.createElement('div');
		shadow.id='cloudShadow';
		wrapper.appendChild(shadow);
		//classify brings up popup overlay thing (ugh)
		var classifyBox=document.createElement('div');
		classifyBox.id='cloudClassifyBox';
		wrapper.appendChild(classifyBox);
		//overlay contains recently tagged, see all owned tags, and add new tag
		//also, radio buttons for positive/negative tagging ang submit buttons
		classifyBox.innerHTML='\n\
			<label><input type="radio" name="classification" value="recent" checked id="recentTagsRadio">Recently classified tags:\n\
			<div id="recentTags"></div></label>\n\
			<br>\n\
			<hr>\n\
			<label><input type="radio" name="classification" value="all" id="allTagsRadio">Other tags:\n\
			<div id="allTags"><span class="linky">See all owned tags</span></div></label>\n\
			<br>\n\
			<hr>\n\
			<label><input type="radio" name="classification" value="new" id="newTagRadio">New tag (3 or more characters):<br>\n\
			<input type="text" id="newTag"></label>\n\
			<br>\n\
			<br>\n\
			<hr>\n\
			This tag:<label><input type="radio" name="polarity" value="1" checked>matches this topic</label><br>\n\
			<label><input type="radio" name="polarity" value="0">does not match this topic</label>\n\
			<br>\n\
			<hr>\n\
			<input type="button" value="Submit" id="submitTags"> <input type="button" value="Cancel" id="cancelTags">\n\
		';
		//recently tagged
		//get my list of 10 most recently used tags
		var recent=JSON.parse(GM_getValue('recent','[]'));
		for(var i=0;i<recent.length;i++){
			var tagging=document.createElement('label');
			tagging.id='recentTags_'+recent[i];
			tagging.className='taggingTag';
			tagging.innerHTML='<input type="radio" name="recent" value="'+recent[i]+'">'+recent[i];
			document.getElementById('recentTags').appendChild(tagging);
		}
		//see all owned tags (http://llanim.us:6274/tag/owned)
		var all=document.getElementById('allTags');
		all.firstChild.addEventListener('click',function classifyOwned(){
			XHR.get('http://llanim.us:6274/tag/owned?username='+username,function(r){
				unsafeWindow.console.log(r.responseText);
				var allTags=JSON.parse(r.responseText);
				//if you don't own any tags
				if(allTags.length==0){
					all.firstChild.innerHTML='No other tags owned. Create a new tag.';
					all.firstChild.removeEventListener('click',classifyOwned,false);
				}
				//replace the get tags link with all the tags
				else{
					all.removeChild(all.firstChild);
					for(var i=0;i<allTags.length;i++){
						//don't put recent tags on this list
						for(var j=recent.length-1;j>=0;j--){
							if(allTags[i].name==recent[j]){
								allTags.splice(i,1);
							}
						}
						var tagging=document.createElement('label');
						tagging.id='allTags_'+allTags[i].name;
						tagging.className='taggingTag';
						tagging.innerHTML='<input type="radio" name="all" value="'+allTags[i].name+'">'+allTags[i].name;
						all.appendChild(tagging)
						tagging.addEventListener('click',function(){document.getElementById('allTagsRadio').click();},false);
					}
				}
			});
		},false);
		//add new tag
		//don't need to do anything for this, since shal took care of it on the server end
		//submit
		document.getElementById('submitTags').addEventListener('click',function(){
			var submit='';
			//if we're submitting a recent tag
			if(document.getElementById('recentTagsRadio').checked){
				var submitTags=document.getElementsByName('recent');
				for(var i=0;i<submitTags.length;i++){
					if(submitTags[i].checked){
						submit=submitTags[i].value;
						break;
					}
				}
			}
			//if we're submitting a different owned tag
			else if(document.getElementById('allTagsRadio').checked){
				var submitTags=document.getElementsByName('all');
				for(var i=0;i<submitTags.length;i++){
					if(submitTags[i].checked){
						submit=submitTags[i].value;
						break;
					}
				}
			}
			//if we're submitting a new tag
			else if(document.getElementById('newTagRadio').checked){
				submit=document.getElementById('newTag').value;
			}
			//make sure the tag isn't an empty string'
			if(submit!=''){
				document.getElementById('submitTags').disabled=true;
				//fuck with recent to reflect new tagging
				for(var i=0;i<recent.length;i++){
					if(recent[i]==submit){
						recent.splice(i,1);
						break;
					}
				}
				if(recent.unshift(submit)>10)
					recent=recent.slice(0,9);
				//save recent tags
				GM_setValue('recent',JSON.stringify(recent));
				//post that shit
				XHR.post(
					'http://llanim.us:6274/topic/classify',
					function(r){
						unsafeWindow.console.log(r.responseText);
						var response=JSON.parse(r.responseText)
						//on success
						if(response.name){
							//if positive, add the tag to the cloudbar
							//replace shit in popup with success shit
							classifyBox.innerHTML='\
								Success! This topic '+(document.getElementsByName('polarity')[0].checked?'matches':'does not match')+' the tag <span class="cloudTag">'+submit+'</span><br>\
								<input type="button" value="Done">\
							';
							classifyBox.lastElementChild.addEventListener('click',close,false);
						}
						//handle error codes
						else
							classifyBox.innerHTML=r.responseText;
					},
					{
						'tag':submit,
						'username':username,
						'topic':get['topic'],
						'type':document.getElementsByName('polarity')[0].checked?1:0
					}
				);
			}
		},false);

		//cancel (close overlay if you click on shadow, cancel button, done button (after tag is submitted))
		function close(){
			body.removeChild(wrapper);
		}

		document.getElementById('cancelTags').addEventListener('click',close,false);
		wrapper.addEventListener('click',function(e){
			if(e.target==wrapper)
				close();
		},false);
	},false);
}

//feed shit i guess
else if(location.pathname=='/showtopics.php'&&get['board']=='cloudLL'){
	//XHR.post('http://llanim.us:6274/tag/edit',function(r){unsafeWindow.console.log(r.responseText);},{'tag':16,'username':username,'public':1});
	//XHR.get('http://llanim.us:6274/tag/owned?username='+username,function(r){unsafeWindow.console.log(r.responseText);});
	//remove not a board notice
	body.removeChild(document.getElementsByTagName('h2')[0]);
	var h1=document.getElementsByTagName('h1')[0];
	//show subscriptions
	if(get['type']=='feed'){
		//build me a page of shit and fuckery
		//title
		document.title='End of the Internet - Cloud Subscription';
		h1.textContent='Cloud Subscriptions';
		//add a userbar
		userbar=document.createElement('div');
		userbar.className='userbar';
		userbar.innerHTML='<a href="//endoftheinter.net/profile.php?user='+userid+'">'+username+'</a>: <a href="/boardlist.php">Board List</a> | <a href="//wiki.endoftheinter.net/index.php/Help:Rules">Help</a>';
		body.insertBefore(userbar,h1.nextSibling);
		var page=parseInt(get['page']?get['page']:'1');
		//top pagination bar
		var topbar=document.createElement('div');
		topbar.className='infobar';
		topbar.innerHTML=
				(page>1?'<a href="/showtopics.php?board=cloudLL&type=feed">First Page</a> | ':'')+
				(page>2?'<a href="/showtopics.php?board=cloudLL&type=feed&page='+(page-1)+'">Previous Page</a> | ':'')+
				'Page '+page+' of '
			;
		body.insertBefore(topbar,userbar.nextSibling);
		//add some kind of table bs
		var grid=document.createElement('table');
		grid.className='grid';
		//make the header row  uuuuuggggggggggghhhhhhhhhhhhhhhhh (oh apparently i was dumb before)
		grid.insertRow(0).innerHTML='<th>Topic</th><th>Created By</th><th>Msgs</th><th>Last Post</th>';
		//zebratables concession. the benefits of writing everything i guess.
		grid.insertRow(1).innerHTML='<td colspan="4">Loading feed...</td>';
		body.insertBefore(grid,topbar.nextSibling);
		//bottom pagination bar
		var bottombar=document.createElement('div');
		bottombar.className='infobar';
		bottombar.innerHTML='Page: '
		for(var i=1;i<page;i++){
			if(i==1)
				bottombar.innerHTML+='<a href="/showtopics.php?board=cloudLL&type=feed">'+i+'</a> | ';
			//oh god i have to do that crazy thing that lg does where it doesn't show all the pages
			else if(i<10||page-i<10||i%5==0)
				bottombar.innerHTML+='<a href="/showtopics.php?board=cloudLL&type=feed&page='+i+'">'+i+'</a> | ';
		}
		bottombar.innerHTML+=page;
		body.insertBefore(bottombar,grid.nextSibling);
		//there is only one person reading this board, so don't include
		//this probability variable need to be set in the settings later
		var prob=.6
		XHR.get('http://llanim.us:6274/subscription/topics?username='+username+'&prob='+prob+(get['page']?'&page='+get['page']:''),function(r){
			unsafeWindow.console.log(r.responseText);
			var response=JSON.parse(r.responseText);
			//remove zebratables concession
			grid.deleteRow(1);
			//make each row
			for(var i=0;i<response.topics.length;i++){
				//build the row
				var row=grid.insertRow(-1);
				row.insertCell(-1).innerHTML='<a href="/showmessages.php?board='+response.topics[i].board+'&topic='+response.topics[i].id+'">'+response.topics[i].title+'</a>';
				row.insertCell(-1).innerHTML='<a href="//endoftheinter.net/profile.php?user='+response.topics[i].creator.id+'">'+response.topics[i].creator.username+'</a>';
				row.insertCell(-1).textContent=response.topics[i].postCount;
				var lastPost=new Date(response.topics[i].lastPostTime*1000);
				//fuckin date formatting
				row.insertCell(-1).textContent=(lastPost.getMonth()+1)+'/'+lastPost.getDate()+'/'+lastPost.getFullYear()+' '+(lastPost.getHours()<10?'0':'')+lastPost.getHours()+':'+(lastPost.getMinutes()<10?'0':'')+lastPost.getMinutes();
				//run the tag adder or something i guess
				var tags=response.topics[i].tags;
				//order the tags by probability
				//greatest to least
				tags.sort(function(a,b){return a.prob>b.prob;});
				//loop through the tags and add them to the bar
				//if prob is below threshold, discard it -- done. current threshold set to 60%
				//limit the number of tags to some maximum -- done. current max set to 5
				for(var j=0;j<5,j<tags.length;j++){
					if(tags[j].prob>prob){
						var tag=document.createElement('a');
						tag.className='topicTag';
						tag.id='topicTag_'+tags[j].id;
						tag.title=tags[j].name+' ('+(Math.round(tags[j].prob*10000)/100)+'%)';
						tag.innerHTML=tags[j].name;
						//link to this tag's topic list
						tag.href='/showtopics.php?board=cloudLL&type=tag&tagid='+tags[j].id;
						row.cells[0].appendChild(tag);
					}
				}
			}
			//populate the pagination shit
			if(response.pages>page){
				var diff=response.pages-page;
				//topbar shit
				topbar.innerHTML+=response.pages;
				if(diff>1)
					topbar.innerHTML+=' | <a href="/showtopics.php?board=cloudLL&type=feed&page='+(page+1)+'">Next Page</a>';
				topbar.innerHTML+=' | <a href="/showtopics.php?board=cloudLL&type=feed&page='+response.pages+'">Last Page</a>';
				//bottombar shit
				for(var i=page+1;i<response.pages+1;i++){
					//fucking thing with the not displaying all the pages at the bottom and shit
					if(response.pages-i<10||i-page<10||i%5==0)
						bottombar.innerHTML+=' | <a href="/showtopics.php?board=cloudLL&type=feed&page='+i+'">'+i+'</a>';
				}
			}
		});
	}
	//show topics for a tag
	else if(get['type']=='tag'){
		//do things in here or something
		//title
		document.title='End of the Internet - Cloud Tag - ';
		h1.textContent='Cloud Tag - ';
		//add a userbar
		userbar=document.createElement('div');
		userbar.className='userbar';
		userbar.innerHTML='<a href="//endoftheinter.net/profile.php?user='+userid+'">'+username+'</a>: <a href="/boardlist.php">Board List</a> | <a href="//wiki.endoftheinter.net/index.php/Help:Rules">Help</a>';
		body.insertBefore(userbar,h1.nextSibling);
		var page=parseInt(get['page']?get['page']:'1');
		//top pagination bar
		var topbar=document.createElement('div');
		topbar.className='infobar';
		topbar.innerHTML=
				(page>1?'<a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'">First Page</a> | ':'')+
				(page>2?'<a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'&page='+(page-1)+'">Previous Page</a> | ':'')+
				'Page '+page+' of '
			;
		body.insertBefore(topbar,userbar.nextSibling);
		//add some kind of table bs
		var grid=document.createElement('table');
		grid.className='grid';
		//make the header row  uuuuuggggggggggghhhhhhhhhhhhhhhhh (oh apparently i was dumb before)
		grid.insertRow(0).innerHTML='<th>Topic</th><th>Created By</th><th>Msgs</th><th>Last Post</th>';
		//zebratables concession. the benefits of writing everything i guess.
		grid.insertRow(1).innerHTML='<td colspan="4">Loading feed...</td>';
		body.insertBefore(grid,topbar.nextSibling);
		//bottom pagination bar
		var bottombar=document.createElement('div');
		bottombar.className='infobar';
		bottombar.innerHTML='Page: '
		for(var i=1;i<page;i++){
			if(i==1)
				bottombar.innerHTML+='<a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'">'+i+'</a> | ';
			//oh god i have to do that crazy thing that lg does where it doesn't show all the pages
			else if(i<10||page-i<10||i%5==0)
				bottombar.innerHTML+='<a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'&page='+i+'">'+i+'</a> | ';
		}
		bottombar.innerHTML+=page;
		body.insertBefore(bottombar,grid.nextSibling);
		unsafeWindow.console.log('http://llanim.us:6274/tag/topics?username='+username+'&tag='+get['tagid']+(get['page']?'&page='+get['page']:''));
		//there is only one person reading this board, so don't include
		XHR.get('http://llanim.us:6274/tag/topics?username='+username+'&tag='+get['tagid']+(get['page']?'&page='+get['page']:''),function(r){
			unsafeWindow.console.log(r.responseText);
			var response=JSON.parse(r.responseText);
			//title shit
			document.title+=response.tag.name;
			h1.textContent+=response.tag.name
			//remove zebratables concession
			grid.deleteRow(1);
			//make each row
			for(var i=0;i<response.topics.length;i++){
				//build the row
				var row=grid.insertRow(-1);
				row.insertCell(-1).innerHTML='<a href="/showmessages.php?board='+response.topics[i].board+'&topic='+response.topics[i].id+'">'+response.topics[i].title+'</a>';
				row.insertCell(-1).innerHTML='<a href="//endoftheinter.net/profile.php?user='+response.topics[i].creator.id+'">'+response.topics[i].creator.username+'</a>';
				row.insertCell(-1).textContent=response.topics[i].postCount;
				var lastPost=new Date(response.topics[i].lastPostTime*1000);
				//fuckin date formatting
				row.insertCell(-1).textContent=(lastPost.getMonth()+1)+'/'+lastPost.getDate()+'/'+lastPost.getFullYear()+' '+(lastPost.getHours()<10?'0':'')+lastPost.getHours()+':'+(lastPost.getMinutes()<10?'0':'')+lastPost.getMinutes();
				//run the tag adder or something i guess
				var tags=response.topics[i].tags;
				//order the tags by probability
				//greatest to least
				tags.sort(function(a,b){return a.prob>b.prob;});
				//loop through the tags and add them to the bar
				//if prob is below threshold, discard it -- done. current threshold set to 60%
				//limit the number of tags to some maximum -- done. current max set to 5
				for(var j=0;j<5,j<tags.length;j++){
					if(tags[j].prob>.5){
						var tag=document.createElement('a');
						tag.className='topicTag';
						tag.id='topicTag_'+tags[j].id;
						tag.title=tags[j].name+' ('+(Math.round(tags[j].prob*10000)/100)+'%)';
						tag.innerHTML=tags[j].name;
						//link to this tag's topic list
						tag.href='/showtopics.php?board=cloudLL&type=tag&tagid='+tags[j].id;
						row.cells[0].appendChild(tag);
					}
				}
			}
			//populate the pagination shit
			if(response.pages>page){
				var diff=response.pages-page;
				//topbar shit
				topbar.innerHTML+=response.pages;
				if(diff>1)
					topbar.innerHTML+=' | <a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'&page='+(page+1)+'">Next Page</a>';
				topbar.innerHTML+=' | <a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'&page='+response.pages+'">Last Page</a>';
				//bottombar shit
				for(var i=page+1;i<response.pages+1;i++){
					//fucking thing with the not displaying all the pages at the bottom and shit
					if(response.pages-i<10||i-page<10||i%5==0)
						bottombar.innerHTML+=' | <a href="/showtopics.php?board=cloudLL&type=tag&tagid='+get['tagid']+'&page='+i+'">'+i+'</a>';
				}
			}
		});
	}
	//oh god i forgot what this cas was supposed to be
	else if(get['type']=='review'){
		XHR.get('http://llanim.us:6274/tagging/list?username='+username,function(r){
			unsafeWindow.console.log(r.responseText);
		});
	}
}

//topic list shit
else if(location.pathname=='/showtopics.php'||location.pathname=='/main.php'||location.pathname=='/showfavorites.php'||location.pathname=='/search.php'){
	//get the rows
	var rows=document.getElementsByClassName('grid')[0].rows;
	var cells=[];
	var topicIDs=[];
	//gather topic ids
	for(var i=0;i<rows.length;i++)
		if(rows[i].firstChild.nodeName=='TD')
			cells.push(rows[i].cells[0]);
	for(var i=0;i<cells.length;i++){
		var fuckinAs=cells[i].getElementsByTagName('a');
		for(var j=0;j<fuckinAs.length;j++){
			if(fuckinAs[j].pathname=='/showmessages.php'&&getUrlVars(fuckinAs[j].href)['page']==null){
				topicIDs[i]=parseInt(getUrlVars(fuckinAs[j].href)['topic']);
				break;
			}
		}
	}
	unsafeWindow.console.log(topicIDs)
	//get tags
	XHR.get('http://llanim.us:6274/topic/classify?topics='+JSON.stringify(topicIDs)+'&username='+username,function(r){
		unsafeWindow.console.log(r.responseText);
		//handle error codes
		//object holding each topic
		var topics=JSON.parse(r.responseText);
		//loop through this shit and do a thing for each guy
		for(var i=0;i<topics.length;i++){
			var tags=topics[i].tags;
			//order the tags by probability
			//greatest to least
			tags.sort(function(a,b){return a.prob>b.prob;});
			//loop through the tags and add them to the bar
			//if prob is below threshold, discard it -- done. current threshold set to 60%
			//limit the number of tags to some maximum -- done. current max set to 5
			for(var j=0;j<5,j<tags.length;j++){
				if(tags[j].prob>.6){
					var tag=document.createElement('a');
					tag.className='topicTag';
					tag.id='topicTag_'+tags[j].id;
					tag.title=tags[j].name+' ('+(Math.round(tags[j].prob*10000)/100)+'%)';
					tag.innerHTML=tags[j].name+' ('+(Math.round(tags[j].prob*10000)/100)+'%)';
					//link to this tag's topic list
					tag.href='';
					//ugh foxlinks compatibility
					if(cells[i].lastChild.nodeName=='DIV')
						cells[i].insertBefore(tag,cells[i].lastChild);
					else
						cells[i].appendChild(tag);
				}
			}
		}

	});
}

//tag management shit
//implement this or else

var css='\
		#cloudWrapper{\
			position:fixed;\
			top:0px;\
			left:0px;\
			width:100%;\
			height:100%;\
			background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiYGBgaAAIMAAAhQCB69VMmQAAAABJRU5ErkJggg==);\
		}\
		#cloudClassifyBox{\
			margin:180px auto 50px;\
			padding:8px;\
			background-color:#ffffff;\
			color:#000000;\
			width:500px;\
		}\
		.topicTag{\
			float:right;\
			margin:0 1px;\
			border:1px solid;\
			padding:0 1px;\
			font-weight:bold;\
		}\
		.cloudTag{\
			margin:0 1px;\
			border:1px solid;\
			padding:0 2px 1px;\
		}\
	';
GM_addStyle(css);