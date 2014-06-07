// ==UserScript==
// @name           User Count
// @namespace      GLB
// @description    User Count - by clicking the posts count link, currently launches to the last page.  Need to get the results from the Error Console (Ctrl+Shift+J), last line
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// @include        http://*.warriorgeneral.com/game/forum_thread_list.pl?*
// ==/UserScript==


window.setTimeout( function() 
{



	var buseshort = true;
	var loaded = false;
	
	var threads = getElementsByClassName("post_count", document);
	for (var i=0; i<threads.length; i++)
	{
		var thread = threads[i].parentNode;
		var container_temp = getElementsByClassName("thread_title",thread);
		var container = container_temp[0];
	
		var urlElement = getElementsByClassName("thread_title",thread);
		var url = urlElement[0].firstChild.href;
		
		var postString = getElementsByClassName("post_count",thread);
		var posts = parseFloat(postString[0].innerHTML);
		
		var pages = parseInt(posts/15)+1;
		
		//postString[0].innerHTML = '<a href=javascript:;>'+posts+'<//a>';
		postString[0].innerHTML = '<a href='+url+'&page='+pages+'>'+posts+'<//a>';
		//postString[0].addEventListener("click",function() {postCount(url,pages);},false);
		postString[0].addEventListener("click",function() {postCount(this);},true);
	}
	
	function postCount(obj){
		var allAgents = new Array();
		var allAgentPosts = new Array();
		
		var page = obj.innerHTML.split('href=\"')[1];		
		var url = page.split('&amp')[0];
		var pages = obj.innerHTML.split('page=')[1];
		pages = pages.split('\"')[0];
		
		for (var page = pages; page >= 1; page--){
			GM_log(page);
			checkPosts(url, page, allAgents, allAgentPosts);
		}
		
		return false;
		//var message = "";
		//for (var i = 0; i< allAgents.length;i++)
		//{
		//	message += allAgents[i] + ": " + allAgentPosts[i] + "\n";
		//}
		//alert('RESULT'+ "\n" + message);
	};

	function checkPosts(urlLocation, page, allAgents, allAgentPosts) {
	  GM_xmlhttpRequest({
		  method: "GET",
		  url: urlLocation + "&page="+page,
		  headers: {
			"User-Agent": "Mozilla/5.0",            // Recommend using navigator.userAgent when possible
			"Accept": "text/xml"
		  },
		  onload: function(response) {
			//loadAgents(response.responseText);
			loadAgents(response.responseText, allAgents, allAgentPosts, page);
		  }
	  });
	};

	function getElementsByClassName(classname, par){
		var a=[];   
		var re = new RegExp('\\b' + classname + '\\b');
		var els = par.getElementsByTagName("*");

		for(var i=0,j=els.length; i<j; i++){       
			if(re.test(els[i].className)) 
			{	
				a.push(els[i]);
			}
		}
		return a;
	};

	function loadAgents(responseText, allAgents, allAgentPosts, page) {
		buseshort=false;
		
		var userids = responseText.split("user_name\">");
		for (var i = 1; i < userids.length; i++) {
						
			userInfo = userids[i].split('>');
			
			userInfo = userInfo[1].split('</');
			id2 = userInfo[0];
					   
			var x = findValue(allAgents,id2);

			if (x == -1)
			{
				var pointer = allAgents.length;
				allAgents[pointer] = id2;
				allAgentPosts[pointer]=1;
			}
			else{
				allAgentPosts[x] += 1 ;
			}
		}
		
		var message = "";
		  var x, y, holder;
		  // The Bubble Sort method.
		  for(x = 0; x < allAgentPosts.length; x++) {
		    for(y = 0; y < (allAgentPosts.length-1); y++) {
		      if(allAgentPosts[y] < allAgentPosts[y+1]) {
		        holder = allAgentPosts[y+1];
		        allAgentPosts[y+1] = allAgentPosts[y];
		        allAgentPosts[y] = holder;
		        holder = allAgents[y+1];
		        allAgents[y+1] = allAgents[y];
		        allAgents[y] = holder;	
		      }
		    }
		  }
 
		for (var i = 0; i< allAgents.length;i++)
		{
			message += allAgents[i] + "\t [B][u]" + allAgentPosts[i] + "[/B][/u]\n";
		}
		GM_log('PAGE: ' + page + "\n" + message);
	};
	
	function findValue(a,id){

		if (a.length > 0)
		{
			for (var i = 0;i<=a.length;i++)
			{
				if(typeof(a[i]) != "undefined")
				{
					var temp = a[i].toString();
					if (temp == id)
					{
						return i;
					}
				}
			}
		}
		return -1;
	};

},2000);