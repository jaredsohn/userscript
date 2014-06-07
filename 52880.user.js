// ==UserScript==
// @name           habrafilter
// @namespace      http://userscripts.org
// @description    ban user's comments at habrahabr.ru
// @include        http://habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blogs/*
// @include        http://*.habrahabr.ru/blog/*
// ==/UserScript==

var highlightComments;

window.addEventListener("load", function(e) {
    if (document.getElementById('comments')) {
        highlightComments = function () {
            if (this.lastFired != undefined) {
                if ((new Date).valueOf() - this.lastFired < 7000) {
                    this.lastFired = (new Date).valueOf();
                    return;
                }
            }
            this.lastFired = (new Date).valueOf();

	    var entries = document.getElementsByClassName('entry-content');

	    for (var entry in entries){
	       var entryNode = entries[entry];

		var avatar = entryNode.parentNode.getElementsByTagName("li"); 
		if(avatar[0] != undefined){
			var nickname = avatar[0].getElementsByTagName('a')[0].title;
			if (GM_getValue(nickname) != undefined){
				
				if (entryNode != undefined){
					entryNode.innerHTML =  "°";
				}

				if (avatar[1] != undefined){
					avatar[1].parentNode.parentNode.innerHTML = "";		
				}

				//var hentry = entryNode.parentNode.parentNode;
				//var commentHolder = hentry.getElementsByClassName("comment_holder vote_holder")[0]; 
				//var msgMeta = hentry.getElementsByClassName("msg-meta")[0]; 
				//var entryContent = hentry.getElementsByClassName("entry-content")[0]; 
				//var replyForm = hentry.getElementsByClassName("reply_form")[0]; 
				//entryNode.parentNode.removeChild(commentHolder);
				//hentry.removeChild(msgMeta);
				//hentry.removeChild(entryContent);
				//hentry.removeChild(replyForm);

			}else{
				insertBanUserSign(avatar, nickname);
			}
		}
	   }
        }
        highlightComments();
        document.addEventListener("DOMNodeInserted", highlightComments, false);
    }
}, false);

var insertBanUserSign = function (avatar, nickname) {
	var newElement;
	if (avatar) {
	    var liElm = document.createElement("li");
	    var linkElm = document.createElement("a");
	    linkElm.setAttribute('href', 'javascript:void(0)'); 
	    linkElm.setAttribute('title', nickname);
	    linkElm.setAttribute('id', 'applyfilter'); 
	    var text = document.createTextNode("x");
	    linkElm.appendChild(text);
	    liElm.appendChild(linkElm);
	    avatar[1].parentNode.appendChild(liElm);
	}
};


/** 
 * catch applyfilte clicks
 */
window.addEventListener('click', function (event) 
{
    /* code goes here */
	var id = event.target.id;
	var user = event.target.title;
	var isFiltered = GM_getValue(user) != undefined;
	if (id == "applyfilter") {
		if (confirm((!isFiltered?"Add to":"Remove from ") + " black list "  + user + "?")) { 
			 // do things if OK
			 if (isFiltered){
				GM_deleteValue(user);
			 }else{
				 GM_setValue(user, user);
			 }
		}
        	window.location.reload();

	}
	event = undefined;

	
}, false);

