// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          oase Threads Ignore List
// @namespace     waiting4wind
// @description   oase.surfforum.com - Ignore function for threads.
// @include       http://surfforum.oase.com/forumdisplay.php?*
// @include       http://surfforum.oase.com/search.php?searchid=*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
const IGNOREPNG = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/9JREFUeNpsk1toHFUYx89tbjs7u5O9zG6ym2sToqa1CaxBGwwtUqioYFWixetDH7w89kH00QcRFARffKjoQzQiklgwFe/FJqgoKrG2kDQxyWabzW52Nzs72cvMnJnjWSm0VL8ZOMyZ73++7/z+58BKpQL+LzBSF36Yp9SLJfpLpfJ2IXdq6mnG6jfnkJs/TNPZymZHJ++yN1aLH78R//Ic26sQgXQH5KHxydbaSOBwxrOsG+Jazf1oZrozZfR293Qmuw4Mpmg+52TXwd5eKBJFHTrGGCDoOS13a92JxLAevdFd3Ei++soZPdQxOze3fHXl6tpq7+8X7V8WlOxqusuIH+iLGIYeCqLKbuPaVjO74Q5lZPl6v/DKlXUlAM++9/5jj5yMxw0EUW5qoiMc6hnsk6IRACFgEAAG7GY+Xyqa9dku7dkXXot0DbbbTiYSn87N3HPkSCJpVEvm+bn5e/ctPiu989mtCM88SfO7in64+dfbdvgtSVWQ4zTX/ryQSvd/+/3iHYduP/HA8WBAlKH7X/7Q3scAxHpG5heXC4VcuzJE+KFMsPTH2e1NAYCpg5nRS2rIsW3n9FExpDPPhz7jvlGnae81oap19d85/e5yOvV67PE3Ibdnaf7lnmTcsmp+sNdkw8IXH4hWNb6zGfUamPANe4zBMpQL0T47mtgYSg7ophHtIL1TxKMUMAyJpGgRyMrM+ipyYnw/Vy7+KtcLeRE6DPo+Emshw0wbNCLe3e9CYrTsJm3uE5/5CAsIK5hRQoJJLR5SFV7M1MLm9o7g0jZsAThKyA/JVGpgOeV7riQQUYsRQRARQoKA2wAIgRDVm57eqaVPT6zkx2Z/LJr51fszkYnMyH7LcRzqcwwIeJAJonTdboIEhjEhGCO+AtY09bdLKxd+Wjw+NhAfH260aHanlojpALQ8yk3DFINGrUR8z2uLBZEBl2BRkoiiavPfLWS3Np9/4lFFUWzbZoCWK+VrhWKXESVYoJ6LAGWBMOHlCBEQhLywqihEkKdnP1ck+OJzT/luy3ZchCHHkojH6o36drEc1zVZEVu0JQV0vkkOhJ98FAwo9ZY388mHB4cGJo/d59ct34cCxowHhIy5akBVJLJdLAaopKtyxSoS/stxbDUcXv07d+7r8w8eO3rboVFqWQgBDhK0pdj3+chfDyLS3WlUq9Xdyp4QFgnPCIf0pcsr3yxceObkw0YyzZWcG+RK6PEbAYCP+THxfOp51G3ani9IstV0ELXbtH9euux79kunphQ1QOtVPuNSjz8OhTYjLV9kpANJYSyHhHBQUIKiqEYcs43ZccxwYmhsuH/HT0Fb494TSRWloKiozK2JAIi3XhDq/Kvk8Y8AAwAJd9NjRnOsIQAAAABJRU5ErkJggg==";
const FOLLOWPNG = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYEAGAAEGAAAOAAGxCzVCAAAAAElFTkSuQmCC";

var panelTDs, modus;
var threadIDs = new Array();

panelTDs = document.evaluate("//tbody[contains(@id, 'threadbits_forum')]/descendant::tr", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (panelTDs.snapshotLength == 0) {		// search
	panelTDs = document.evaluate("//table[contains(@id, 'threadslist')]/descendant::tr", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	temp = document.evaluate("//td[@colspan = '7']", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	if (!temp.snapshotItem(0)) return;		// exit script when "Search Entire Posts"
	else {
     		for(i=0;i<temp.snapshotLength;i++){
						node = temp.snapshotItem(i); 
						node.setAttribute("colspan", "8");
				}
			temp = document.evaluate("//td[@class='thead' and @colspan='2']", document, null, 9, null).singleNodeValue;
			temp.setAttribute("colspan", "3");
			modus = "search";
	}
} else {	// forumdisplay
	temp = document.evaluate("//table[@id='threadslist']/tbody/tr/td", document, null, 9, null).singleNodeValue;
	temp.setAttribute("colspan", "3");
	modus = "display";
}


	imgTDs = document.evaluate("//td[contains(@id, 'td_threadstatusicon_')]/ancestor::tr", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     		for(i=0;i<imgTDs.snapshotLength;i++){
						node = imgTDs.snapshotItem(i);
						node.childNodes[1].setAttribute("width", "22");
						node.childNodes[1].setAttribute("height", "22");
						node.childNodes[3].setAttribute("width", "22");
						node.childNodes[3].setAttribute("height", "22");
				}


init();

function init() {
		threadblacklist = getList();

     		for(i=0;i<panelTDs.snapshotLength;i++){
						node = panelTDs.snapshotItem(i); 
						css = node.childNodes[1].getAttribute('class');
							if( css == "thead" || css == "tcat" || css == "tfoot") { continue; }					// modus = search, no cell insert, modify by colspan 

							if( node.childNodes[1].getAttribute('id') == null || node.childNodes[5].getAttribute('title') == "") {			// thread deleted or displaced, insert empty cell
								threadIDs[i] = 0;																																													// no thread ID, set to zero
								ignoreTD = document.createElement("td");
			     			ignoreTD.setAttribute("class", "alt2");
								ignoreTD.setAttribute("width", "22");
								ignoreTD.setAttribute("height", "22");
								node.insertBefore(ignoreTD, node.firstChild); 
						}	else {
								threadIDs[i] = node.childNodes[1].id.slice(20, node.childNodes[1].id.length);		// insert cell and image
								ignoreTD = document.createElement("td");
			     			ignoreTD.setAttribute("class", "alt2");
								ignoreTD.setAttribute("width", "22");
								ignoreTD.setAttribute("height", "22");
			     			ignoreTD.id = "ignoID_" + threadIDs[i];
						    ignoreTD.addEventListener('click',
						        function(event) {
						            followThisThread(event);
						        }, true
						    );
								ignoreTD.appendChild(createImg("ignore", threadIDs[i]));
								node.insertBefore(ignoreTD, node.firstChild); 
				        if (checkList(threadblacklist, threadIDs[i]) >= 0) {
										ignoreThisThread(threadIDs[i]);
								}
							}

				}
}

// hide the threadrow and add her threadID to blacklist 
function ignoreThisThread(event){
	if (!isNumber(event)) tid = event.target.id.slice(7, event.target.id.length); // event.type == "click"
	else tid = event;

		userName = document.evaluate("//td[@id = 'td_threadtitle_" + tid + "']/div[2]/span/text()", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).data;
	  ignoreTD = document.getElementById("ignoID_" + tid);			
		ignoreTD.title = "Benutzer: " + userName + " - Thema: " + document.getElementById("thread_title_" + tid).innerHTML;
		if (modus == "search") { ignoreTD.setAttribute("colspan", "8") }
		else { ignoreTD.setAttribute("colspan", "7") }
    ignoreTD.replaceChild(createImg("follow", tid), ignoreTD.firstChild);
		// add blacklist
    threadblacklist = getList();
	    if (checkList(threadblacklist, tid) < 0) {
		    threadblacklist.push(tid);
	  	  setList(threadblacklist);
			}
			
		switchThreadRow(tid,"none");
}

// show the threadrow and remove her threadID from blacklist
function followThisThread(event){
		tid = event.target.id.slice(7, event.target.id.length); // event.type == "click"
    ignoreTD = document.getElementById("ignoID_" + tid);	
		ignoreTD.removeAttribute("colspan");							
    ignoreTD.replaceChild(createImg("ignore", tid), ignoreTD.firstChild);
		threadblacklist = getList();
    index = checkList(threadblacklist, tid)
    if (index >= 0) {
        var newblacklist = new Array();
        for (var j = 0; j < threadblacklist.length; j++) {
            if (j != index) {
                newblacklist.push(threadblacklist[j]);
            }
        }
        setList(newblacklist,"blacklist");
    }
		switchThreadRow(tid,"");
}

// switch display row  (int nodeID, string [""|"none"])
function switchThreadRow(tid, status){
node = document.getElementById("td_threadstatusicon_" + tid).parentNode;
	for(j=1;j<node.childNodes.length;j++){
		if(node.childNodes[j].nodeName == "TD") node.childNodes[j].style.display = status;
	}
}

function createImg(type, tid) {
    var img =  document.createElement("img");
    switch (type) {
        case "ignore":
				    img.src = IGNOREPNG;
				    img.title = "Thema ignorieren";
				    img.id = "ignore_" + tid;
				    img.width = "20";
				    img.height = "20";
				    img.addEventListener('click',
				        function(event) {
				            ignoreThisThread(event);
				        }, true
				    );
            return img;
        case "follow":
						userName = document.evaluate("//td[@id = 'td_threadtitle_" + tid + "']/div[2]/span/text()", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).data;
				    img.src = FOLLOWPNG;
				    img.title = "Benutzer: " + userName + " - Thema: " + document.getElementById("thread_title_" + tid).innerHTML;
				    img.id = "ignore_" + tid;
				    img.width = "2";
				    img.height = "2";
				    img.addEventListener('click',
				        function(event) {
				            followThisThread(event);
				        }, true
				    );
            return img;
        default:
            return null;
    }
}


function getList() {
    var blacklistString = GM_getValue("blacklist");
    if (blacklistString != undefined && blacklistString.length > 0) {
        return blacklistString.split("|");
    } else {
        return new Array();
    }
}

function setList(list) {
    if (list != undefined && list.length > 0) {
        GM_setValue("blacklist", list.join("|"));
    } else {
        GM_setValue("blacklist", "");
    }
return;
}

function checkList(list, uid) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == uid) {
            return i;
        }
    }
    return -1;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
