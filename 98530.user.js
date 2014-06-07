// ==UserScript==
// @name           wtm scripts
// @namespace      wtm-scripts
// @include        http://whatthemovie.com/*
// ==/UserScript==

/*

  TODO:
    - [done]  where the shot is: rejected, archive, FF, ns
              - different colored background/border
    - [done?] lock fetching script to one window!
    - [done?] unbookmark button
    - [90%]   watch shot pages
              - [done] if bookmarked: generate thumb, that seems to be tricky, if possible
              - [done] tags fails
    - [done]  visit movie page button
    - [done]  fix unavailbale shots title fubar
    - [done]  utf8
    - [done?] massive memory leak
              - localStorage is too small
              - a GM_setValue for each thumb seems the best way
    - []      first run info
    - [SIC]   waiting shots that got available must be fetched title
              - [done?] determine the date they switch category (ns -> rejected, ns -> ff, ff -> a)
              - [done?] the whole dateadded is a huge fuckup!!!!
              - []      rejected shots never get title
    - []      user categories
              - on bookmarking open a dialog asking to asign category
    - []      tag search
    - []      slideshow big shots
    - [done]  remove solutionAvailble, use dateadded
    - []      icon for optionslink
    - [50%]   db cleaner
    - []      loading bars
    - [done]  firstsolver/poster = deleted user
    - [bug]   restore queue
    - []      bookmarked movie OH SHI--
    - []      open shot page in new tab
    
    db:
    id:{
      int     id,
      string  title,
      string  poster,
      string  firstSolver,
      ctime   dateadded,
      string  url,
      char    cat (n,f,a,r),
      int     userCat,
      bool    solved,
      array   tags,
      
    }

*/

// load script
window.addEventListener("load", function(e) {
  if (document.title != "WTM is over capacity")
    init();
}, false);

// the on pageload execzted
function init() {
  //GM_setValue("bookmarks","{}");
  if (!GM_getValue("firstrun",false)) {
    GM_setValue("lock","-1");
    GM_setValue("firstrun",true);
    alert("You just installed the bookmarks extension for WTM.\nThis is very beta, so expect errors to occur.\nIt's main purpose is to add features to the mybookmarks page.\nIt also caches the thumbs on your computer so save the server a bit bandwidth.");
    if (confirm("You need to visit your bookmarks to refresh the cache. Do this now?")) window.location = "http://whatthemovie.com/mybookmarks";
  
  }

  // generate window id for lock
  window.bookmarkcacheid=Math.floor(Math.random()*100000);
    
  // where we are
  var x = window.location;
  
  // add unload stuff
  window.addEventListener("unload", function(e){ if (GM_getValue("lock") == window.bookmarkcacheid) GM_setValue("lock",-1); /*delete(window.savedmarks); delete(window.queue);*/}, false);
  
  //load db
  if (window.savedmarks == undefined)
  	window.savedmarks = loadBookmarks();
    
  //replace menu options -> bookmarks
  if (document.getElementsByClassName("last")[3] != undefined) {
    document.getElementsByClassName("last")[3].innerHTML = '<a id="new_bookmarks" href="#">Bookmarks</a>';
    document.getElementById('new_bookmarks').addEventListener("click", function(e){ insertBookmarkPage(); }, false);
  }
  
  // add hooks to shot page
  var z = x.href.match(/^http:\/\/whatthemovie\.com\/shot\/([0-9]+)\/?/);
  if (z != null) {         
    // watch bookmark button
    document.getElementById("watchbutton").addEventListener("click",function(e){ toggleBookmark(z[1]); },false);
  
    // shot is bookmarked
    if (window.savedmarks[z[1]] != undefined) {      
      GM_log("this shot is a bookmark\n"+JSON.stringify(window.savedmarks[z[1]]));
      //update info while we are here
      shotPage(z[1]); 		
    }
  }
  
  // if browsing real bookmarks page update db (maybe later it ajaxed db updates?)
  if (x == 'http://whatthemovie.com/mybookmarks') {
			
			// harvest bookmarks and save them to db
      var bookmarks = document.getElementsByClassName('movie_list')[0].getElementsByTagName('li');
      var id = 0;
      var img = 0;
      var json = {};
      var count = 0;
      var queue = [];
      for (var i = 0; i < bookmarks.length;i++) {
				id = bookmarks[i].getElementsByTagName('a')[0].href;
				id=id.split('/');
				id = id[id.length-1];
				json[id]={id:id};
				
				// new bookmark, save his image to b64 data uri
				if (window.savedmarks[id] == undefined) {
					img_ = getBase64Image(bookmarks[i].getElementsByTagName('img')[0]);
					GM_setValue("img_"+id,img_);
					queue.push(id);
					GM_log(id+" is new");
				}
				// known bookmark, copy his object data
				else
					json[id]=window.savedmarks[id];
				count++;
			}
			GM_setValue("count",count);
			window.savedmarks = json;
			// save databases
			saveBookmarks();
			
  }
  cleanDB();
  forgeQueue();
}

// load database and return object
function loadBookmarks() {
		return JSON.parse(GM_getValue('bookmarks','{}'));
}

// save db
function saveBookmarks() {
    GM_setValue("bookmarks",JSON.stringify(window.savedmarks));
}

// deletes a bookmark
function removeBookmark(id){
  GM_log("deleting "+id);
  // if it is in queue remove it from queue
  if (window.queue != undefined && window.queue.indexOf(id) != -1)
    window.queue.splice(window.queue.indexOf(id),1);
  delete(window.savedmarks[id]); 
  GM_deleteValue("img_"+id);
  GM_setValue("count",GM_getValue("count")-1);
  saveBookmarks();
}

// watches the bookmark button on shot page
function toggleBookmark(id) {
  GM_log("tooglebookmark "+id);
  if (window.savedmarks[id] == undefined) {
    //append at beginning of savedmarks
    var new_ = {};
    new_[id] = {"id":id};
    for (var i in window.savedmarks) new_[i]=window.savedmarks[i];
    window.savedmarks=new_; 
    GM_setValue("count",GM_getValue("count")+1);
    shotPage(id);
  }
  else
    removeBookmark(id);
}

// removes unused thumbs from db
function cleanDB() {
  GM_log("cleaning db");
  var x = GM_listValues();
  for (var i in x) {
    if (x[i].indexOf("img_") == 0 && window.savedmarks[x[i].split("_")[1]] == undefined)
      GM_deleteValue(x[i]);
  }
}

// creates a queue if shots lack metadata or moved their section
function forgeQueue() {
  GM_log("forging queue");
  var q = [];
  for (i in window.savedmarks) {
    // NS -> ???
    if (window.savedmarks[i].cat == "n" && window.savedmarks[i].dateadded+172800000 < (new Date().getTime())) {
      GM_log(i+" is ns and known for more than 2 days \n"+(window.savedmarks[i].dateadded-(new Date().getTime()))+"added: "+window.savedmarks[i].dateadded);
      q.push(i);
    }
    // FF -> A
    if (window.savedmarks[i].cat == "f" && daysLeft(window.savedmarks[i].dateadded) < 0) {
      GM_log(i+" is ff but should be a");
      q.push(i);
    }
    // no metadata
    if (window.savedmarks[i].poster == undefined) {
      GM_log(i+" lacks metadata"); 
      q.push(i);
    }
  }
  if (q.length > 0) {
    window.queue=q;
    getPage(q[0]);
  }
}

// if on a shotpage this extracts info
function shotPage(id) {
      var b = window.savedmarks[id];
      GM_log(id+" "+b);
      
      if (GM_getValue("img_"+id) == undefined) {       
        var blob = document.createElement("img");
        blob.src=document.getElementById("shot_still").src.replace("normal","mini").replace("http://static.whatthemovie.com","");
        blob.addEventListener("load", function(e){img_ = getBase64Image(blob);GM_setValue("img_"+id,img_);},false);
      }
      
      var x = document.getElementsByClassName("topbar_title")[0].innerHTML.trim();
      if (x != null) {
			      if (x == "Feature Films")
  			      b.cat ="f";
  			    if (x == "The Archive")
  			      b.cat ="a";
  			    if (x == "New Submissions")
  			      b.cat ="n";
  			    if (x == "Rejected Snapshots")
  			      b.cat ="r";
  		}
  		
  		if (b.poster == undefined && document.getElementsByClassName("nav_shotinfo")[0].getElementsByClassName("nametaglink")[0] != undefined)
  		  b.poster = document.getElementsByClassName("nav_shotinfo")[0].getElementsByClassName("nametaglink")[0].title;
  		else if (b.poster == undefined && document.getElementsByClassName("nav_shotinfo")[0].firstElementChild.innerHTML.match(/deleted user/) != null)
  		  b.poster = -1;
  		if (b.firstSolver == undefined && document.getElementsByClassName("nav_shotinfo")[0].getElementsByClassName("nametaglink")[1] != undefined)
  		  b.firstSolver = document.getElementsByClassName("nav_shotinfo")[0].getElementsByClassName("nametaglink")[1].title;
  		else if (b.firstSolver == undefined && document.getElementsByClassName("nav_shotinfo")[0].getElementsByTagName("li")[2].innerHTML.match(/deleted user/) != null)
  		  b.firstSolver = -1;
  		
  		if (b.solved == undefined && document.getElementById("shot_msg").innerHTML.trim() == "You already solved this snapshot.")
  		  b.solved = true;
  		
  		var tags = document.getElementById("shot_tag_list").getElementsByTagName("a");
  		if (tags.length > 0) {
  		  b.tags = [];
  		  for (var i = 0; i < tags.length;i++)
  		    b.tags.push(tags[i].innerHTML.trim());
  		}
  		
  		var x = null;
  		// FF/A
  		if (document.getElementsByClassName("nav_date")[0].children[3] != undefined)
  		  var x = document.getElementsByClassName("nav_date")[0].children[3].innerHTML.match(/<a href="\/overview\/(.+?)\/(.+?)\/(.+?)">(.+?)<\/a>/);
			if (x != null) {
			  b.dateadded = Date.UTC(x[1],x[2]-1,x[3]);
			}
			// NS now-48h+hoursleft
			else if (b.cat == "n") {
			  b.dateadded=(new Date().getTime())-(48-parseInt(document.getElementsByClassName("time_left")[0].firstElementChild.innerHTML.split("h")[0]))*3600000;
			}
			// R now-30d+daysleft
			else if (b.cat == "r") {
			  var daysleft = document.getElementById("solutionbutton").nextElementSibling.innerHTML.match(/in about (\d+?) days/);
			  if (daysleft != null) 
  			  b.dateadded= (new Date().getTime())-(30-daysleft)*86400000;
			}
			  
		  if (b.title == undefined && (b.cat == "a" || (b.cat == "r" && daysleft == null)))
		    getTitle(id);
			  
			saveBookmarks();

}

// shows the cached bookmark page
function insertBookmarkPage() {

  var b = window.savedmarks;	
  var me = document.getElementsByClassName("secondary_nav")[2].getElementsByTagName("span")[0].innerHTML;
  window.me = me;

  // write html code
  
  if (document.getElementsByClassName("topbar_title")[0] != undefined)document.getElementsByClassName("topbar_title")[0].innerHTML="Bookmark Cache";
  
  var style = document.createElement("style");
  document.getElementsByTagName("head")[0].appendChild(style);
  style.innerHTML='.us_box { -moz-border-radius: 2px; -webkit-border-radius: 2px; border: 2px solid #333; background: #000; color: #ccc;'+
	    	           'z-index:1000000; position: fixed; left: 50%; top: 100px; width: 300px; margin-left: -150px; }'+
                   '.us_box h3 { font-size: 20px; padding: 4px 8px 4px 10px; margin: 0px; border-bottom: 1px solid #AAA }'+
                   '.us_box .optionscontent { margin: 10px; text-align: center; }'+
                   '#us_box_close { background-image: url(data:image/gif;base64,R0lGODlhDQANALMPAKurq7S0tOzs7MrKytfX14qKir6%2BvqWlpf7%2B%2Fnt7e5OTk56enpmZmYWFhYCAgP%2F%2F%2FyH5BAEAAA8ALAAAAAANAA0AAARd8EkxTDBDSIlI%2BGBAIBIBAMeJnsQjnEugMEqwnNRxGF0xGroBYEEcCTrEG2OpKBwFhdlyoWgae9VYoRDojQDbgKBBDhTIAHJDE3C43%2B8Ax5Co2xO8jevQSDQOGhIRADs%3D); width: 13px; height: 13px; float: right; margin-top: 1px; }'+
                   '#us_box_help { background-image: url(data:image/gif;base64,R0lGODlhDQANAKIAALKysomJisfHx%2F%2F%2F%2F5WWlujo6H5%2BfqOjoyH5BAAAAAAALAAAAAANAA0AAANCOFoi0EXJAqoFUbnDexUD1UWFx3QNkXJCRxBBkBLc%2B8ZMYNN37Os0wA8wEPowvySuaGg6nUQF4AmVLA4BQ%2BCQGSQAADs%3D); width: 13px; height: 13px; float: right; margin: 1px 3px 0 0; }'+
                   '.us_box input[type=text], input[type=password] { height: 15px; border: 1px solid #bbb; margin: 2px; padding: 3px 0 4px 0; width: 180px; }'+
                   '.us_box input[type=submit] { cursor: pointer; margin: 0 0 0 5px; padding: 0 4px 3px 4px; -moz-border-radius: 2px; -webkit-border-radius: 2px; font-size: 11px; font-weight: bold; color: white; height: 17px; border: 1px solid #3e3e3e; background-image: url(data:image/gif;base64,R0lGODlhAQAQAKIAAH5%2BflRUVFxcXGNjY2tra3Nzc3p6eoKCgiH5BAAAAAAALAAAAAABABAAAAMKeAdmVYSMIUS4CQA7); }'+
                   '.hidden { visibility: hidden; overflow: hidden; height: 0px; }'+
                   '.us_loadgif { text-align: center; padding: 10px 0; }'+
                   '.us_loadgif img { -moz-border-radius: 5px; -webkit-border-radius: 5px; border:3px solid #91998E; }'+
		               '.us_submitbuttons { background-color: #EEE; border-top: 1px solid #AAA; padding: 5px; width: 290px; margin-left: -10px; margin-bottom: -10px; margin-top: 5px; }'+
                   '.us_error { background-color: #F6D8D8; border: 1px solid #f28494; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
                   '.us_done { background-color: #CCFF99; border: 1px solid #99CC00; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
                   '.us_infobox { z-index:1000000; background-color: #EEE; -moz-border-radius: 5px; -webkit-border-radius: 5px; top: 5px; padding: 10px; position: fixed; left: 5px; border: 1px solid #666; font-size: 8pt; }'+
                   '.us_infobox div { margin: 1px 5px 0 0; float: left; }'+
		               '.us_box .us_center { padding: 10px; text-align: center; }'+
		               '#us_submit { float: right; }'+
		               '.infoPane { position: absolute !important; display: none; padding: 5px; }'+
		               '.infoPane td { padding-right: 10px; }'+
		               '.row { width: 800px !important; }'+
		               '.movie_list li { height: 100px !important; }'+
		               '.wrapper { height: 100px !important; padding: 3px; }'+
		               '#main_shot { width: 920px !important; }'+
		               'img.unsolved{border-bottom:3px solid #CC0000 !important;}'+
		               'img.solved{border-bottom:3px solid #008000 !important;}'+
		               'img.firstsolved{border-bottom:3px solid #000080 !important;}'+
		               'img.posted{border-bottom:3px solid #FFF !important;}';
		               
		               
  var info = createIdElement("div","infoPane");
  var attr = document.createAttribute("class");
  attr.nodeValue="infoPane us_box";
  info.setAttributeNode(attr);
  document.getElementsByTagName("body")[0].appendChild(info);
  
  us_changeOpac(0,"infoPane");
	var p = document.getElementById("topbar").nextElementSibling;
	p.id = 'main_shot';
	document.getElementsByTagName("body")[0].setAttribute("class","black");
	document.title = "WTM | Discover Movies another Way";
	var tmp = '<div style="width: 920px;" class="col_left nopadding"><div style="min-height: 400px; width:920px;" class="shot_focus_box thumbnails_only"><div class="focus_curtain_left"><div class="bottom"></div><div class="top"></div></div>'+
					'<div class="focus_curtain_right"><div class="bottom"></div><div class="top"></div></div>'+
					'<div style="margin-bottom: 20px;" class="header clearfix"><h2>Your Bookmark Cache ('+GM_getValue("count")+' shots)- <a href="#" id="optionsButton">Options</a></h2></div><ul style="padding-bottom: 20px;" class="movie_small_preview clearfix">'+
					'<div class="row"><h4>Bookmarked Snapshots</h4><ul class="movie_list clearfix">';

  // list all thumbnails
	for (var i in b) {

  	var now = new Date().getTime();
  	
  	//text under image
  	if (b[i].title == undefined && b[i].cat == undefined) var title='fetching info…';
		else if (b[i].title == undefined && b[i].cat == "n")
		  var title ="wait 30 days.";
    else if (b[i].title == undefined) var title ='wait '+daysLeft(b[i].dateadded)+' days';
		else var title=eval('"'+b[i].title+'"');
		
		// color around image, white = ns, grey = ff, red = rejected (black = archive)
		var catborder = '';
		if (b[i].cat == "r") catborder=' style="background-color:#500000"';
		else if (b[i].cat == "n")catborder=' style="background-color:#fff"';
  	else if (b[i].cat == "f")catborder=' style="background-color:#222"';
  	else catborder=' style="background-color:#000"';
  	
		tmp+='<li><div class="wrapper"'+catborder+'><a title="'+title+'" id="bookmark_'+i+'" href="http://whatthemovie.com/shot/'+i+'"><img ';
    
    // colored underline as known from WTM
    if (b[i].poster == me) tmp+='class="poster"';
		else if (b[i].firstSolver == undefined) tmp+='class="unsolved" ';
		else if (b[i].firstSolver == me) tmp+='class="firstsolved" ';
		else if (b[i].solved != undefined) tmp+='class="solved" ';
		tmp+='src="data:image/png;base64,'+GM_getValue("img_"+i)+'"><p>';
		tmp+=title;
		tmp+='</p></a></div></li>';
	}
	
	tmp+='</ul></div></ul></div></div><div class="clearer"></div>';
	p.innerHTML = tmp;
	
	// make options button work
	document.getElementById("optionsButton").addEventListener("click",function(e){optionsPanel();},false);
	
	// attach eventlisteners to thumbnails
	function newEventHandler(idx) { 
	  return function(e) { 
	     e.preventDefault(); 
 	     infoPane(idx);
	   }; 
	}
	for (var i in b)
	  document.getElementById("bookmark_"+i).addEventListener("click", newEventHandler(i),false);
}

// refreshed display of element in bookmark listing
function redrawBookmark(id) {

    GM_log("redrawing "+id+"\n"+JSON.stringify(window.savedmarks[id]));
    var b = document.getElementById("bookmark_"+id);
    var i = b.getElementsByTagName("img")[0];
    
		if (window.savedmarks[id].cat == "r")b.parentNode.style.backgroundColor='#500000';
		else if (window.savedmarks[id].cat == "n")b.parentNode.style.backgroundColor='#fff';
  	else if (window.savedmarks[id].cat == "f")b.parentNode.style.backgroundColor='#222';
    
    if (window.savedmarks[id].title == undefined && window.savedmarks[id].cat == undefined) var title='fetching info…';
		else if (window.savedmarks[id].title == undefined && window.savedmarks[id].cat == "n")
		  var title ="wait 30 days.";
		else if (window.savedmarks[id].title == undefined) var title = 'wait '+daysLeft(window.savedmarks[id].dateadded)+' days';
		else var title=eval('"'+window.savedmarks[id].title+'"');
		
		b.title = title;

    if (window.savedmarks[id].poster == window.me) i.setAttribute("class","poster");
		else if (window.savedmarks[id].firstSolver == undefined) i.setAttribute("class","unsolved");
		else if (window.savedmarks[id].firstSolver == window.me) i.setAttribute("class","firstsolved");
		else if (window.savedmarks[id].solved == true) i.setAttribute("class","solved");
		else i.setAttribute("class","");

		b.getElementsByTagName("p")[0].innerHTML=title;
}

// daysleft to show under thumb
function daysLeft(added) {
  added = added/1000;
  return Math.ceil((added+2678400-(new Date().getTime())/1000)/86400);
}

// ajax to /shot/ page for metadata
function getPage(id) {
    // if lock is free take it now
    if (GM_getValue("lock") == -1) GM_setValue("lock",window.bookmarkcacheid);
    if (GM_getValue("lock") != window.bookmarkcacheid) { 
      GM_log(window.bookmarkcacheid+" locked "+GM_getValue("lock"));
      return false;
    }
    GM_log(JSON.stringify(window.savedmarks[id]));
    // if title already exists skip this request.
    if (window.savedmarks[id].title != undefined) {
     GM_log("title already fetched skipping this");
      window.queue.shift();
      if (window.queue.length > 0)
			  window.setTimeout(function(){ getPage(window.queue[0]); }, 1000);
			return false;
    }
    GM_log("sic");
		// get metadata
		if (window.savedmarks[id].poster == undefined || (window.savedmarks[id].cat == "f" && daysLeft(window.savedmarks[id].dateadded) < 0) || (window.savedmarks[id].cat =="n" && window.savedmarks[id].dateadded < (new Date().getTime()))) {
      GM_log("fetching page "+id);
		  GM_xmlhttpRequest({
			  method: "GET",
			  url: 'http://whatthemovie.com/shot/'+id,
			  onload: function(response) {
			
			    //GM_log(response.responseText);
			  
			    if (response.status == null) {
			      GM_log("request failed");
			      return false;
			    } 
			  
			    var b = window.savedmarks[id];	
			    
			    // category
			    var x = response.responseText.match(/class="topbar_title">\s+(.+?)\s+<\/h2>/m);
			    if (x != null) {
			      if (x[1] == "Feature Films")
  			      b.cat ="f";
  			    if (x[1] == "The Archive")
  			      b.cat ="a";
  			    if (x[1] == "New Submissions")
  			      b.cat ="n";
  			    if (x[1] == "Rejected Snapshots")
  			      b.cat ="r";	
  			  }	    

          // Posted by
          var x = response.responseText.match(/posted by:\s+?<a.+?>(.+?)<\/a>/mi);
          if (x != null)
  			    b.poster = x[1];
  			  else
  			    // deleted user
  			    b.poster = -1;
			    
			    // first solver
			    var x = response.responseText.match(/first solved by:\s+<a.+?">(.+?)<\/a>/mi);
			    if (x != null)
  			    b.firstSolver=x[1];
  			  else {
  			    // if deleted user
  			    var x = response.responseText.match(/first solved by:\s+(.+?)/mi);
  			    if (x != null) {
  			      GM_log(x);
  			      b.firstSolver=-1;
  			    }
  			  }
			  
			    // date added
			    var x = response.responseText.match(/<li ><a href="\/overview\/(.+?)\/(.+?)\/(.+?)">(.+?)<\/a><\/li>/);
          // FF/A
			    if (x != null)
			      b.dateadded = Date.UTC(x[1],x[2]-1,x[3]);
			    // NS
			    else if (response.responseText.match(/<div class="time_left"><strong>[0-9]+?h<\/strong>/) != null) {
			      //GM_log("is in NS "+response.responseText.match(/<div class="time_left"><strong>[0-9]+?h<\/strong>/));
			      b.dateadded = (new Date().getTime())-(48-response.responseText.match(/<div class="time_left"><strong>([0-9]+)?h<\/strong>/)[1])*3600000;
			    }
			    // not neccesary? scroll down rejected shots
			    else
			      b.dateadded= (new Date().getTime());
			     
  			      
  			  // solved?
  			  var x = response.responseText.match(/guess_problem\(.+?,'You already solved this snapshot\.'\);/)
  			  if (x != null)
  			    b.solved = true;
  			    
   			  // tags
   			  var r = response.responseText.match(/<li><a href="\/search\?t=tag&q=.+?">(.+?)<\/a>/g);
 			    if (r != null) b.tags=[];
  			  while (r != null && r.length > 0) { 
            b.tags.push(r[0].match(/">(.+)<\/a>/)[1]);
            r.shift();
  			  }    
	
	        // rejected shots
			    var daysleft = response.responseText.match(/'solutionbutton', 'solution will be available in about (.+?) days'/);
			    if (daysleft != null && b.cat == "r") {
			      var now = new Date().getTime();
			      b.dateadded = (new Date().getTime())-(30-daysleft[1])*86400000;
			    }
			    
			    GM_log(JSON.stringify(b));
			  
			    GM_setValue('bookmarks',JSON.stringify(window.savedmarks));
			    
			    if (b.cat == "a" || (b.cat == "r" && daysleft == null)) {
			      getTitle(id);
			    }
			    else {
			      GM_log("not available yet");
			      if (document.getElementById("bookmark_"+id) != undefined) {
				      redrawBookmark(id);
				    }
			      window.queue.shift();
			      if (window.queue != undefined && window.queue.length > 0)
  			      getPage(window.queue[0]);  
			    }
			  }
		  });
		}
		else {
		  window.setTimeout(function(){ getTitle(id); }, 1000);
		}
		
}

function getTitle(id) {
    // stop if unexpected call!
    if (window.savedmarks[id].title != undefined) {
      GM_log("illegal request, title already saved");
      return false;
    }
    GM_log("requesting "+id);		
		
		if (window.queue == undefined) window.queue = JSON.parse(GM_getValue("queue","[]"));
				
		GM_xmlhttpRequest({
			method: "POST",
			url: 'http://whatthemovie.com/shot/'+id+'/showsolution',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
			  GM_log("got response for "+id+response.responseText);
			  var regexPattern = /Element\.update\("shot_title", "<strong>(.+?)\.\.\.<\/strong>/;
			  regexPattern.exec(response.responseText);
			  if (RegExp.$1 != undefined) {
				  GM_log(RegExp.$1);
				  window.savedmarks[id].title = RegExp.$1;
				  				  
				  window.savedmarks[id].url = response.responseText.match(/movie\/(.+?)\\">visit movie page/)[1];
          				  
          //if on bookmarkcache show new title
				  if (document.getElementById("bookmark_"+id) != undefined) {
            redrawBookmark(id);
				  }
				  window.queue.shift();
				  saveBookmarks();
				  GM_setValue('queue',JSON.stringify(window.queue));
				}

				if (window.queue.length > 0) {
			    window.setTimeout(function(){ getPage(window.queue[0]); }, 3000);
			  }
			  else
			    GM_setValue("lock",-1);
				  // Queue empty reset lock.
			}
		});
}

function optionsPanel() {
  if (document.getElementById('optionspanel') == undefined) {
		   
    var x = createIdElement("div","optionspanel");
    var y = document.createAttribute("class");
    y.nodeValue="us_box";
    x.setAttributeNode(y);
    document.getElementsByTagName("body")[0].appendChild(x);
    x.innerHTML='<h3 id="us_box_head">Options<a href="#" id="us_box_close"></a><a href="#" id="us_box_help"></a></h3>'+
         '<div class="optionscontent"><input type="submit" id="optionsReal" alt="http://whatthemovie.com/mybookmarks" value="real bookmarks page" /><br /><br /><input type="submit" id="reset_button" value="reset cache" /><br /><br /><input type="submit" value="reset lock" id="optionslock" /><br /><br /><input type="submit" value="reset queue" id="resetq" /></div>';
         
    document.getElementById('us_box_close').addEventListener('click', function(e){ closeOptions(); }, false);
    document.getElementById('us_box_help').addEventListener('click', function(e){ us_help();}, false);
    document.getElementById("reset_button").addEventListener("click",function(e){if (!confirm("Do you really want to clear the cache? You should do this only when errors occur.")) return false; GM_setValue("bookmarks","{}"); GM_setValue("queue","[]"); alert("cache cleared. reload now.");},false);
    document.getElementById("optionsReal").addEventListener("click",function(e){closeOptions(); window.location="http://whatthemovie.com/mybookmarks";},false);
    document.getElementById("optionslock").addEventListener("click",function(e){alert("lock set to this window"); GM_setValue("lock",window.bookmarkcacheid);},false);
    document.getElementById("resetq").addEventListener("click",function(e){if (window.queue != undefined)window.queue=[]; GM_setValue("queue","[]");},false);
  }
  us_changeOpac(0,"optionspanel");
  opacity("optionspanel",0,90,500);
  document.getElementById("optionspanel").style.display = "block";
}

//show the help
function us_help() {
  //var loginbox = document.getElementById('optionspanel').getElementsByClassName("div")[0].innerHTML='hi';
  alert("hi");
}

function closeOptions() {
  if (document.getElementById("optionspanel").style.display == "none") {
    document.getElementById("optionspanel").style.display = "block";
    opacity("optionspanel",0,90,500);
  }
  else {
    opacity("optionspanel",90,0,500);
    window.setTimeout(function() { document.getElementById("optionspanel").style.display = "none"; },500);
  }
}

function infoPane(id) {
  var p = document.getElementById("infoPane");
  var d = window.savedmarks[id];
  var o = new Date();
  o.setTime(d.dateadded);
  var pos = findPos(document.getElementById("bookmark_"+id));
  p.style.left = pos[0]+50+"px";
  p.style.top = pos[1]-100+"px";
  if (d.cat == "f") var cat ="Feature Films";
  if (d.cat == "a") var cat ="The Archive";
  if (d.cat == "n") var cat ="New Submissions";
  if (d.cat == "r") var cat ="Rejected Snapshots";
  if (d.title == undefined && d.cat == "n") p.innerHTML='<h3>solution available in 30 days</h3>';
  else if (d.title == undefined) p.innerHTML='<h3>solution available in '+daysLeft(d.dateadded)+' days</h3>';
  else p.innerHTML='<h3>'+eval('"'+d.title+'"')+'</h3>';
  
  if (d.poster == -1) var poster = "deleted user";
  else var poster = '<a title="'+d.poster+'" href="http://whatthemovie.com/user/'+d.poster+'">'+d.poster+"</a>";
  
  if (d.firstSolver == undefined) var first = "unsolved";
  else if (d.firstSolver == -1) var first = "deleted user";
  else var first = '<a title="'+d.firstSolver+'" href="http://whatthemovie.com/user/'+d.firstSolver+'">'+d.firstSolver+"</a>";
  
  var tags = '';
  if (d.tags == undefined) tags = "none";
  else {
    for (var i in d.tags) {
      tags+='<a href="#" alt="">'+d.tags[i]+'</a> ';
    }
  }
  
  p.innerHTML+='<table><tr><td style="padding:3px !important;">category: </td><td>'+cat+'</td></tr><tr><td>posted by: </td><td>'+poster+'</td></tr><tr><td>first solved by:</td><td>'+first+'</td></tr><tr><td>added:</td><td>'+o.getDate()+'. '+new Array("january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december")[o.getMonth()]+' '+o.getFullYear()+'</td></tr></table><p>Tags: '+tags+'</p><br><input type="submit" value="go to shot" title="http://whatthemovie.com/shot/'+id+'" /><input type="submit" title="http://whatthemovie.com/movie/'+d.url+'" value="go to movie page" /><input type="submit" value="close" /><input type="submit" title="reload the bookmark" value="reload" /><input type="submit" title="unbookmark" value="unbookmark" />';
  
  // go to shot page
  p.getElementsByTagName("input")[0].addEventListener("click",function(e){window.location="http://whatthemovie.com/shot/"+id;},false);
  // go to moviepage
  p.getElementsByTagName("input")[1].addEventListener("click",function(e){window.location="http://whatthemovie.com/movie/"+d.url;},false);
  // close
  p.getElementsByTagName("input")[2].addEventListener("click",function(e){opacity("infoPane",90,0,500); window.setTimeout(function() { document.getElementById('infoPane').style.display = "none"; }, 500);},false);
  
  function bb(ix){
    GM_log("reloading "+ix);    
    window.savedmarks[ix]={id:id};
	  saveBookmarks();
    if(window.queue==undefined)window.queue=[];
    window.queue.push(ix); 
    getPage(ix);
  }
  // reload 
  p.getElementsByTagName("input")[3].addEventListener("click",function(e){ bb(id); },false);
  p.style.display = "block";
  opacity("infoPane",0,90,500);
  // fade out effect on mouseout
  p.addEventListener("mouseout", function(e){if (!e) var e = window.event;	var tg = (window.event) ? e.srcElement : e.target; if (tg.nodeName != 'DIV') return; var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;	while (reltg != tg && reltg.nodeName != 'BODY')	reltg = reltg.parentNode;	if (reltg == tg) return;
opacity("infoPane",90,0,500); window.setTimeout(function() { document.getElementById('infoPane').style.display = "none"; }, 500);}, true);

  // unbookmark /shot/id/unwatch
  p.getElementsByTagName("input")[4].addEventListener("click",function(e){  
    
    GM_xmlhttpRequest({
			method: "POST",
			url: 'http://whatthemovie.com/shot/'+id+'/unwatch',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
			  if (response.status == null) {
			      GM_log("request failed");
			      return false;
			  } 
			  GM_log("unbookmark "+response.responseText);
			  removeBookmark(id);
			}
		});
    
    opacity("infoPane",90,0,500); 
    window.setTimeout(function() { document.getElementById('infoPane').style.display = "none"; }, 500)
  ;},false);
}

// finds absolute position of element
function findPos(obj) {
	var curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curleft,curtop];
  }
}

//change the opacity for different browsers
function us_changeOpac(opacity, id) {
  var object = document.getElementById(id).style;
  object.opacity = (opacity / 100);
  object.MozOpacity = (opacity / 100);
  object.KhtmlOpacity = (opacity / 100);
  object.filter = "alpha(opacity=" + opacity + ")";
}

function opacity(id, opacStart, opacEnd, millisec) {
  //speed for each frame
  var speed = Math.round(millisec / 100);
  var timer = 1;
  //determine the direction for the blending, if start and end are the same nothing happens
  if(opacStart > opacEnd) {
    for(i = opacStart; i >= opacEnd; i--) {
      window.setTimeout(function(b) { return function() { us_changeOpac(b, id); } }(i),(timer * speed));
     timer++;
    }
  }
  else if(opacStart < opacEnd) {
    for(i = opacStart; i <= opacEnd; i++) {
      window.setTimeout(function(b) { return function() { us_changeOpac(b, id); } }(i),speed*timer);
   	  timer++;
	  }
  }
}

//creates a html element with id
function createIdElement(type, id) {
   var el = document.createElement(type);
   var idatr = document.createAttribute("id");
   idatr.nodeValue = id;
   el.setAttributeNode(idatr);
   return el;
}

// thanks to google for this, it transforms any image to data uri
function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    
    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
