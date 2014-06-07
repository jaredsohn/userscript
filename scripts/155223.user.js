// ==UserScript==
// @name           imoutomato.com enhancments
// @namespace      http://userscripts.org/users/73184
// @description    minor stuff for imoutomato.com (hiding old articles, loading all articles on 1 page, etc)
// @match        *://*.imoutomato.com/
// @X-note      the @include works in greasemonkey. the @match works in chrome. fml-.-
// @chrome-is-stupid true
// @run-at         document-end
// @grant          none
// @version        0.1.0
// @author         Hans Henrik
// @X-state-of-mind  bored
// ==/UserScript==
//TODO: add this? @require http://usocheckup.redirectme.net/?????.js?maxage=1&method=show
//// @include        /^http(?:s)?:\/\/(?:www\.)?imoutomato\.com/
if(!/^http(?:s)?:\/\/(?:www\.)?imoutomato\.com/.test(window.location.href)){/*chrome's @match is stupid, and can make the script run in places like forum.imoutomato.com, this is a workaround for that.*/ return;}
else
(function f() {
	
if (document.readyState !== 'complete') {
	/*developer-console friendly version of document.addEventListener("load",...);
         */
        setTimeout(f, 100);

        return;
    }
    if (document.getElementsByClassName("nav-single").length > 0 
	|| document.getElementsByTagName("article").length<1) {
        /*the plugin is irrelevant on this part of the page, afaik...*/
        return;
    }

    HHB = {
        version: "0.1.0",
        debugging: 1, //1 or higher for debugging...
        config: JSON.parse(localStorage.getItem("HHB.config") || "{\"oldArticles\":[],\"hidden\":false}"),
        articlesHiddenInCurrentPage: 0,
        debug: function () {
            if (HHB.debugging < 1) return;
            console.log.apply(console, arguments);
        },
        saveConfig: function () {
            localStorage.setItem("HHB.config", JSON.stringify(HHB.config));
        },
        notifyArticleHidden: function (reason) {
            HHB.articlesHiddenInCurrentPage++;
            HHB.gui._updateStatistics();
        },
        hideArticle: function (articleElement) {
            //alert(articleElement.id+" << ID. outerHTML>>"+articleElement.outerHTML);
            articleElement.style.display = "none";
            HHB.config.oldArticles.push(articleElement.id);
            HHB.saveConfig();
            //articleElement.parentNode.removeChild(articleElement);
            HHB.notifyArticleHidden();
        },
        hideOldArticles: function (_document) {
            //alert("TODO: HHB.hideOldArticles");
            var ele = null,
                i = 0;
            for (i = 0; i < HHB.config.oldArticles.length; i++) {
                ele = _document.getElementById(HHB.config.oldArticles[i]);
                if (!ele) continue;
                ele.style.display = "none";
                //ele.parentNode.removeChild(ele);
                HHB.notifyArticleHidden();
            }
        },
        gui: {
            _appendChild: function (elementToAppend) {
                var brE = document.createElement("br");
                HHB.gui.mainDiv.appendChild(brE);
                HHB.gui.mainDiv.appendChild(elementToAppend);
            },
            mainDiv: document.createElement("div"),
            hidePluginButton: document.createElement("button"),
            _hideOrShowPlugin: function () {
                HHB.config.hidden = !HHB.config.hidden;
                HHB.saveConfig();
                HHB.gui.mainDiv.style.display = (HHB.config.hidden ? "none" : "inherit");
                HHB.gui.hidePluginButton.textContent = (HHB.config.hidden ? "show plugin" : "hide plugin");
            },
            statisticsSpan: document.createElement("span"),
            _updateStatistics: function () {
                var newtext = "";
                newtext +=/* "stats: " +*/ HHB.articlesHiddenInCurrentPage + " article"+(HHB.articlesHiddenInCurrentPage===1?"":"s")+" hidden <small>(out of "+HHB.config.oldArticles.length+" known old article"+(HHB.config.oldArticles.length===1?"":"s")+")</small>";
				//FKING S RULE SUX, WHO THE HELL INVENTED THAT SHIT? x.x
                HHB.gui.statisticsSpan.innerHTML = newtext;
            },
			loadMoreDiv:document.createElement("div"),
			loadMoreArticlesButton:document.createElement("button"),
			loadErrorSpan:document.createElement("span"),
        },/*</HHB.gui>*/
        
        addHideArticleButtons: function (_document) {
            var articles = _document.getElementsByTagName("article");
            var button = null;
            var i = 0;
            for (i = 0; i < articles.length; i++) {
                button = _document.createElement("button");
                button.textContent = "Hide this article, permanently";
                articles[i].appendChild(button);
                button.addEventListener("click", function (ev) {
                    var articleElement = ev.target.parentNode;
                    HHB.hideArticle(articleElement);
                });

            }

        },
		isCurrentlyLoadingMoreArticles:false,
		numberOfPagesLoaded:0,
		numberOfPagesToLoad:0,
		xhrCache:{},
		asyncLoadMoreArticles:function(){
		//alert("TODO: asyncLoadMoreArticles");
		if(HHB.isCurrentlyLoadingMoreArticles){HHB.debug("tried to run asyncLoadMoreArticles twice...?");return;/*...*/throw new Error("");}
		HHB.isCurrentlyLoadingMoreArticles=true;
		HHB.numberOfPagesToLoad=3;
		var i=0;
		//alert("got this "+i+" "+HHB.numberOfPagesToLoad+" "+HHB.numberOfPagesLoaded);
		for(i=HHB.numberOfPagesLoaded;i<HHB.numberOfPagesToLoad+HHB.numberOfPagesLoaded;i++){
		var xhr=new XMLHttpRequest();
		xhr.open("GET","http://imoutomato.com/page/"+i+"/",true);
		xhr.addEventListener("readystatechange",function(ev){
		
		
		function pageLoadCompleted(){
			HHB.numberOfPagesLoaded++;
			HHB.numberOfPagesToLoad--;
			HHB.debug("pageLoadCompleted running! HHB.numberOfPagesToLoad:"+HHB.numberOfPagesToLoad+" HHB.numberOfPagesLoaded: "+HHB.numberOfPagesLoaded);
			if(HHB.numberOfPagesToLoad<1){
				HHB.isCurrentlyLoadingMoreArticles=false;
				HHB.gui.loadMoreArticlesButton.removeAttribute("disabled");
				HHB.gui.loadMoreArticlesButton.style.color="green";
				HHB.gui.loadMoreArticlesButton.textContent="...touch me more?";
			}
		}
		if(ev.target.readyState<4){return;}
		if(ev.target.status!==200)
		{//error...
		HHB.debug("got status \""+ev.target.statusText+"\" in a xmlhttprequest!");
		HHB.gui.loadErrorSpan.innerHTML+="error "+ev.target.status+": "+ev.target.statusText+"<br/>";
		pageLoadCompleted();
		return;
		}
		//alert("got this! "+ev.target.responseText);
		//I know XMLHttpRequest is SUPPOSED to parse html documents automatically
		//However personally experience, if the HTML isnt... "standards-compliant enough", XMLHttpRequest will fail to make a Document object, where DOMParser will work as expected
		//at least in firefox. (this was experienced in the crappy HTML code @slavehack.com slaves page)
			var parser = new DOMParser();
			var xhrDocument = parser.parseFromString(ev.target.responseText, "text/html");
			HHB.debug(xhrDocument,ev.target.responseText);
		(function removeDuplicateArticles(){
		var eaa=document.getElementsByTagName("article");
		var tmp=null;
		for(var i=0;i<eaa.length;i++){//continue;
			//alert("removing duplicate...");
		if(eaa[i] && eaa[i].id && xhrDocument.getElementById(eaa[i].id)){
		tmp=xhrDocument.getElementById(eaa[i].id);
		try{/*tmp.parentNode.removeChild(tmp);*/tmp.outerHTML="<span></span>"}catch(ex){HHB.debug(ex);}
		//shouldn't happen...if(xhrDocument.getElementById(eaa[i].id)){alert("failed to remove the article from xhrDocument!");}
		}
		}
		})(document,xhrDocument);
			HHB.hideOldArticles(xhrDocument);
			HHB.addHideArticleButtons(xhrDocument);
			var newArticles=xhrDocument.getElementsByTagName("article");
			var i=0;
			for(i=0;i<newArticles.length;i++)
			{
			if(!newArticles[i]){continue;}
			//alert("tryin to add ffs...");
			document.getElementById("content").appendChild(newArticles[i]);
			
			}
			pageLoadCompleted();
		});
		
		xhr.send();
		}
		
		},


    };/*</HHB>*/

	/*V is for chrome.. chrome's native DOMParser() sux and dont understand "text/html" -.-*/
	(function(DOMParser) {
		"use strict";
		var
		DOMParser_proto = DOMParser.prototype
		, real_parseFromString = DOMParser_proto.parseFromString
		;
		
		// Firefox/Opera/IE throw errors on unsupported types
		try {
			// WebKit returns null on unsupported types
			if ((new DOMParser).parseFromString("", "text/html")) {
				// text/html parsing is natively supported
				return;
			}
		} catch (ex) {}
		
		DOMParser_proto.parseFromString = function(markup, type) {
			if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
				var
				doc = document.implementation.createHTMLDocument("")
				;
				
				doc.body.innerHTML = markup;
				return doc;
			} else {
				return real_parseFromString.apply(this, arguments);
			}
		};
	}(DOMParser));
	
	
	
	
	
	
    HHB.hideOldArticles(document);
    //<!--mainDiv start
    HHB.gui.mainDiv.id = "HHB.gui.mainDiv";
    HHB.gui.mainDiv.setAttribute("style",
        "background-color:azure; border-style:solid; border-width:medium; display:none;"); //i suck at styling..
    HHB.gui.mainDiv.innerHTML += "<h6>Imoutomato.com Enhancements (" + HHB.version + ") </h6>";
    //mainDiv end-->
    //<!--hidePluginButton start
    HHB.gui.hidePluginButton.setAttribute("style", "height: 30px; font-size: 15px; width: auto;");
    HHB.gui.hidePluginButton.textContent = "???";

    HHB.gui._hideOrShowPlugin() & HHB.gui._hideOrShowPlugin(); //there is a reason for calling it twice here...
    HHB.gui.hidePluginButton.addEventListener("click", HHB.gui._hideOrShowPlugin);
    //hidePluginButton end-->

    //<!-- addhideArticleButtons start
    HHB.addHideArticleButtons(document);
    // addhideArticleButtons end-->
    //<!--  start
	HHB.gui.pagesToLoad=document.createElement("input");
	(function(b){
		b.textContent="load more articles to page";
	b.addEventListener("click",function(ev){
//	ev.target.parentNode.removeChild(ev.target);
	{
	ev.target.textContent="...user-san touched me! :O ";ev.target.style.color="red";
	ev.target.setAttribute("disabled","disabled");
	}
	HHB.asyncLoadMoreArticles();
	});
	HHB.gui.loadMoreDiv.appendChild(b);
	HHB.gui.loadMoreDiv.appendChild(document.createElement("br"));
	HHB.gui.loadMoreDiv.appendChild(HHB.gui.loadErrorSpan);
	HHB.gui.loadMoreDiv.appendChild(document.createElement("br"));
	})(HHB.gui.loadMoreArticlesButton);
	HHB.gui._appendChild(HHB.gui.loadMoreDiv);
    //  end-->
    //<!--  start

    //  end-->
    //<!--  start

    //  end-->
    //<!-- statistics start
    HHB.gui.statisticsSpan.id = "HHB.gui.statisticsSpan";
    HHB.gui.statisticsSpan.setAttribute("style", "color: inherit;"); //<TODO..?
    HHB.gui._updateStatistics();
    HHB.gui._appendChild(HHB.gui.statisticsSpan);
    // statistics end-->


    var masthead = document.getElementById("masthead");
    masthead.insertBefore(HHB.gui.mainDiv, masthead.firstChild);
    masthead.insertBefore(HHB.gui.hidePluginButton, masthead.firstChild);
    if(HHB.debugging>0)window.HHB=HHB;
	//HHB.gui._appendChild(document.createElement("button"));
})(); //end of script.