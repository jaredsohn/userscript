// ==UserScript==
// @name HAD fixer
// @description Fixes Hackaday.
// @include http://hackaday.com/*
// @match http://*.hackaday.com/*
// @match http://hackaday.com/*
// ==/UserScript==

/**********************
 * Changelog
 * 6/13/19 - First release.
 *
 **********************/

function codeToInject(){
	window.HADcomments = {};
	window.currentPage = -1;
	window.lastPage = -1;
	window.nPage = 0;
	window.commentsPerPage = 10;
	window.blockList = [];
	
	/** Being storage functions. **/
	
	/* TODO: Find a better way to store user configuration. */
	/* I think it's possible to use the localStorage variable, but I haven't tested it on Firefox. */
	window.setCookie = function(name, value, days){
	    if(days){
		    var date = new Date();
			date.setTime(date.getTime()+(days * 24 * 60 * 60 * 1000));
			var expires = "; expires="+date.toGMTString();
		} else
            var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    window.readCookie = function(name, defaultvalue){
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for(var i=0;i<ca.length;i++){
            var c = ca[i];
			var data = c.split(/^(.+?)=(.*)$/);
			if(name == data[1].trim())
			    return data[2];
        }
        return defaultvalue;
    }		
	
	window.HADsaveSettings = function(){ /* Save user settings. */
	    var blist = "[";
		for(var i in window.blockList){
		    blist+="\""+window.blockList[i].replace("\"", "\\\"")+"\",";
		}
		blist+="]";
		window.setCookie("HADblockList", blist, 365);
		console.log(blist);
	}
	
	/** End storage functions. **/
	
	window.block = function(name){   /* Block a user. */
	    window.blockList.push(name); /* Add them to the block list. */
		window.HADsaveSettings();    /* Save the list. */
		window.HADBlockUpdate();     /* Update the current page. */
		window.gotoPage(window.currentPage);
	}
	
	window.unblock = function(name){ /* Unblock a user. */
	    window.blockList.splice(window.blockList.indexOf(name), 1);
		window.HADsaveSettings();
		window.HADBlockUpdate();
		window.gotoPage(window.currentPage);
	}
	
	window.HADBlockUpdate = function(){ /* Mark comments as blocked. */
	    for(var c in window.HADcomments){
		    var actions = document.getElementById("actions-"+window.HADcomments[c].object.childNodes[1].getAttribute('id'));
			if(!actions){
			    var credit = window.HADcomments[c].object.childNodes[1].getElementsByClassName("credits")[0];
			    actions = document.createElement("span");
				actions.setAttribute("id", "actions-"+window.HADcomments[c].object.childNodes[1].getAttribute('id'));
			    credit.appendChild(actions);
			}
            if(window.blockList.indexOf(window.HADcomments[c].user)!=-1){
	            window.HADcomments[c].blocked = true;
				actions.innerHTML="&nbsp;-&nbsp;<a href=\"javascript:window.unblock('"+window.HADcomments[c].user+"');\">Unblock</a>";
	        } else {
			    window.HADcomments[c].blocked = false;
			    actions.innerHTML="&nbsp;-&nbsp;<a href=\"javascript:window.block('"+window.HADcomments[c].user+"');\">Block</a>";
			}
        }
	}
	
    window.commentShowHide = function(commentId, button){
        var comment = document.getElementById(commentId);
        if(comment.style.display == "none"){
            comment.style.display = "inherit";
			button.innerHTML = "Hide";
        }else{
            comment.style.display = "none";
			button.innerHTML = "Show";
		}
	}
	
	window.gotoPage = function(page){ /* Show a "page" of comments. */
	    if(page < 0) page = 0;
		if(page > window.nPages) page = window.nPages;
		window.lastPage = window.currentPage;
		if(window.lastPage!=-1){
		    var oldPageLink = document.getElementById("pageLink-"+window.lastPage);
		    oldPageLink.style.fontWeight = "normal";
		}
		var pageLink = document.getElementById("pageLink-"+page);
		pageLink.style.fontWeight = "bold";
	    var start = (page * window.commentsPerPage);
		for(var c in window.HADcomments){
		    var showhide = document.getElementById("showhide-"+window.HADcomments[c].object.childNodes[1].getAttribute('id'))
		    if(showhide){
			    showhide.parentNode.removeChild(showhide);
			}
			if(c >= start && c < start + window.commentsPerPage){
			    window.HADcomments[c].object.style.display = "inherit";
				if(window.HADcomments[c].blocked){
				    window.addShowHideButton(window.HADcomments[c]);
				    window.hideComment(window.HADcomments[c]);
				}
			} else
		        window.HADcomments[c].object.style.display = "none";
		}
		window.currentPage = page;
		window.prettyComments(window.HADcomments);
	}
	
	window.nextPage = function(){
	    if(window.currentPage < window.nPages-1){
		    window.gotoPage( window.currentPage+1 );
		}
	}
	
	window.prevPage = function(){
	    window.lastPage = window.currentPage;
	    if(window.currentPage > 0){
		    window.gotoPage( window.currentPage-1 );
		}
	}
	
    window.getComments = function(){
        var content = document.getElementById("content");
        var comments = content.getElementsByClassName("commentlinks");
    	var ret = new Array();
    	if(!comments)
    	    return ret;
        
        for(var i=0;i<comments.length;i++){
            var html = comments[i].childNodes[1];
	        var content = html.innerHTML.split(/(.+?)\<p class=\"credits\"\>(.+?)\<\/p\>/);  // Separate content and credits
		    var comment = content[0];
		    var credits = content[2];
		    var creditData = credits.split(/^Posted at \<a href=\"#comment-.+?\"\>(.+?)\<\/a\> on (.+?) by (.*)$/); // Extract credit information
            ret.push( {"user": creditData[3].replace(/(<([^>]+)>)/ig,""),  // Remove HTML tags (specifically <a>) from user name.
		               "rawUser": creditData[3],
				       "blocked": false,
		               "comment": comment,
		               "date": creditData[2],
        			   "time": creditData[1],
				       "object": comments[i]} );
        }
	    return ret;
    }
    
    window.prettyComments = function(comments){ /* Fix class names for the comments. */
        var n = 0;
        for(var i in comments){
	        comments[i].object.childNodes[1].setAttribute('class', "statsclass"+(n%2?2:1));
		    if(comments[i].object.style.display != "none")
    		    n++;
    	}
    }
    
    window.removeComment = function(comment){ /* Completely hide a comment. */
        comment.object.style.display = "none";
    }
    
    window.hideComment = function(comment){ /* Another variant of the above. */
        comment.object.childNodes[1].style.display = "none";
    }
	
	window.addShowHideButton = function(comment){
	    var controls = document.createElement("div");
    	comment.object.appendChild(controls);
    	controls.innerHTML="<button onclick=\"commentShowHide('"+comment.object.childNodes[1].getAttribute('id')+"', this);\" id=\"showhide-"+comment.object.childNodes[1].getAttribute('id')+"\">Show</button>";
	}
    
    window.hideAllComments = function(comments){
        for(var c in comments){
            comments[c].object.style.display = "none";
        }
    }
    
    window.paginate = function(comments){ /* Create page links. */
        var nComments = comments.length;
    	var nPages = nComments / window.commentsPerPage;
		window.nPages = nPages;
    	var ret = "<a href=\"javascript:window.prevPage();\">&lt; Prev</a>&nbsp;";
        for(var i=0;i<nPages;i++){
		    var tmp = i + 1;
	        ret += "<a href=\"javascript:window.gotoPage("+i+");\" id=\"pageLink-"+i+"\" style=\"font-weight:"+((i==0)?"bold":"normal")+"\">"+tmp+"</a>&nbsp;";
	    }
		ret += "<a href=\"javascript:window.nextPage();\">Next &gt;</a>";
        return ret;
    }
	
	window.onload = function(){
	    window.blockList = eval(window.readCookie("HADblockList", "[]")); /* Retrieve list of blocked users. */
		
	    var comments = getComments();
		window.HADcomments = comments;
		
        window.HADBlockUpdate(); /* Process comments. */
        hideAllComments(comments); /* Hide all comments in preparation for pagination. */
		
        prettyComments(comments);
        
		/* Perform pagination. */
        var commentText = document.getElementById("comments");
        var pages = document.createElement("div");
        pages.innerHTML = paginate(comments);
        commentText.parentNode.insertBefore(pages, commentText.nextSibling);
		
		window.gotoPage(0); /* Show page 0. */
	}
}

/* I don't necessarily like the way this is done, but it seemed to be the easiest. */
/* This injects the above code into the page, where a new window.onload handler is defined. */
/* One major problem is that it makes debugging a bit of a pain. */
/* Taken from: http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome */
function injectCode(){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ codeToInject +')(); window.HADdata = ("'+ codeToInject.tmpData +'");'));
    (document.body || document.head || document.documentElement).appendChild(script);
}

if(document.getElementById("comments")) /* Make sure the page has comments. */
    injectCode();
