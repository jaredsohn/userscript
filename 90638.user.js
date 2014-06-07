// ==UserScript==
// @name           AutoReadMark
// @namespace      AutoReadMark
// @description    When you open Tumblr, Twitter and so on, automatically marking the entry you have previously read. In addition, Show count of unread entries.
// @include        http://*
// @include        https://*
// ==/UserScript==


(function() {
//Sometimes GM scripts is  doubly executed. This is countermeasure for those cases
if(document.body.getAttribute("AutoReadMarkIsExecuted")=="true") return
document.body.setAttribute("AutoReadMarkIsExecuted", "true")

var SITEINFO_IMPORT_URLS = [
    'http://wedata.net/databases/EntryXPaths/items.json',
]
var XHR_TIMEOUT = 30 * 1000
var CACHE_EXPIRE = 24 * 60 * 60 * 1000
var MAX_COUNT_OF_SAVED_PREVIOUS_READ = 3;

var info;
var entryXPath , idXPath;
var entries, markedEntry, numOfEntries, unreadNum;
var previousRead, previousReadNumber, firstPreviousRead;
var href, styleNumber;
/*
var styleList =   ["{border: double thick red !important;}", 
	"{border: double thick green !important;}",
    "{border: double thick blue !important;}"]
*/
GM_registerMenuCommand('Auto Read Marker - clear cache', clearCache)
GM_registerMenuCommand('Auto Read Marker - style change', styleChange)
var cacheInfo = getCache()
var xhrStates = {}
SITEINFO_IMPORT_URLS.forEach(function(i) {
//デバッグ用
//  cacheInfo[i] = null
	if (!cacheInfo[i] || cacheInfo[i].expire < new Date()) {
		var opt = {
			method: 'get',
			url: i,
			onload: function(res) {
				xhrStates[i] = 'loaded'
				getCacheCallback(res, i)
			},
			onerror: function(res){
				xhrStates[i] = 'error'
				getCacheErrorCallback(i)
			},
		}
		xhrStates[i] = 'start'
		GM_xmlhttpRequest(opt)
		setTimeout(function() {
			if (xhrStates[i] == 'start') {
				getCacheErrorCallback(i)
			}
		}, XHR_TIMEOUT)
	}
	else {
		launchAutoReadMark(cacheInfo[i].info)
	}
})

function launchAutoReadMark(list) {
    if (list.length == 0) {
        return
    }
    for (var i = 0; i < list.length; i++) {
        try {
            if (location.href.match(list[i].url)) {
				info = list[i];
                setXpaths()
                return
            }
        }
        catch(e) {
            continue
        }
    }
}
function styleChange(){
	GM_setValue('style', !GM_getValue('style', 0))

	setStyle()
}
function setXpaths(){
    entryXPath = info.entryXPath;
    idXPath = info.idXPath;

	var S = document.createElement('style');
	S.type = 'text/css';
	S.id = 'AutoReadMarker_CSS'
	var head = document.getElementsByTagName('head');
	head = head[0]
	head.appendChild(S);

	setStyle()

//    GM_addStyle(style);

	marking()
}
function setStyle(){
	S = document.getElementById("AutoReadMarker_CSS")
	styleNumber = GM_getValue('style', 0)
	if(styleNumber){
		var style =".Read_Mark0{border: double thick red !important;}\n" +
		".Read_Mark1{border: double thick green !important;}\n" +
		".Read_Mark2{border: double thick blue !important;}";
	}
	else{
		var style = ".Read_Mark0{background-color:LightPink !important;}\n" +
		".Read_Mark1{background-color: PowderBlue !important;}\n" +
		".Read_Mark2{background-color: PaleGreen !important;}";
	}

	
	S.innerHTML = style
}
function marking(){
    href=location.href//.replace("&sourceid=Mozilla-search","")
    //page=の部分を削除
    //href=href.replace(/[?&]page=\d+/, "").replace(/[?&]p=\d+/, "")
	markedEntry = new Array();
	numOfEntries = 0;
	unreadNum = 0;

    try {
		previousReadList = getPreviousReadList();
    }
    catch(e) {
        previousReadList = new Array();
    }
	previousReadNumber = 0;
	previousRead = getPreviousRead();

	firstPreviousRead = previousRead;
    var failed = setReadMark()

//GM_log(entries.snapshotLength)
    if(numOfEntries==1) return
    if(failed){
		document.body.addEventListener('DOMNodeInserted', checkLoadFinished, false);
    }
	else setFirstEntry();
    //entries.snapshotLength;  // 取得した要素（正確にはノード）の数。

    return
}
function checkLoadFinished(){
	entries = getEntries();
	if(entries.snapshotLength>1){
		document.body.removeEventListener('DOMNodeInserted', checkLoadFinished, false);
		setReadMark()
		setFirstEntry();
	}
}
function setFirstEntry(){
	var first = entries.snapshotItem(0);
    id = getId(first)

	if(id!=firstPreviousRead) setPreviousReadList(id);
    document.body.addEventListener('DOMNodeInserted', setReadMark, false);

	setTimeout(checkReverseTimeline, 1000)
}
function checkReverseTimeline(){
	if(!document.getElementById("RAT_separator") && !document.getElementById("RAT_processing")) return;

	document.body.removeEventListener('DOMNodeInserted', setReadMark, false);
	document.title = document.title.replace(/^\(\d+\+?\)\s/, "")
	for(var i=0; i<previousReadNumber; i++){
		markedEntry[i].setAttribute("class", markedEntry[i].getAttribute("class").replace(/Read_Mark\d/, ""))
	}
	
}
function getPreviousReadList(){
	var modifiedHref = href.replace("&sourceid=Mozilla-search","")
	return JSON.parse(GM_getValue(modifiedHref));
}
function setPreviousReadList(id){
	var dd = new Date();
	var tmp = previousReadList;
	tmp.push([id, dd.toString()]);
	if(tmp.length > MAX_COUNT_OF_SAVED_PREVIOUS_READ) tmp.shift();
	var modifiedHref = href.replace("&sourceid=Mozilla-search","")
	setTimeout(function() {
		GM_setValue(modifiedHref, JSON.stringify(tmp));
	}, 0);
}
function getPreviousRead(){
	var i = previousReadList.length - 1 - previousReadNumber;
	if(i>=0) return previousReadList[i][0];
	else return null;
}
function getId(node){
    if(idXPath){
        var idNode = document.evaluate(
                  idXPath ,            // これが XPath !
                   node,           // どこから取得するか たとえば、 document.body とかってすると head 以下の要素は取得されない
                   null,               // 基本使わないと思っていい
                   XPathResult.STRING_TYPE,                  // 結果の種類を指定する。基本は 6 か 7 でいい。 6 だったら結果がソートされない可能性がある。
                   null                // 基本使わない
                 );
//      if(idNode.snapshotLength==0) return false;
        id = idNode.stringValue;
    }
    else id = node.id+""    //文字列化

    return id
}

function setReadMark(aEvt){
	//    var requestURL = evt.newValue;
	//    var parentNode = evt.relatedNode;
		// 処理
	//  alert(node.innerHTML)
//GM_log(href+" "+location.href+" "+(location.href!=href))
	if(location.href!=href){
		document.body.removeEventListener('DOMNodeInserted', setReadMark, false);
		setTimeout(function() {
			marking();
		},0)
		return
	}
	entries = getEntries();
	var newUnreadNum = 0;
//GM_log(href+" "+entries.snapshotLength)
	if(entries.snapshotLength==0) return true;
	var entry, id
	for(var i=numOfEntries; i<entries.snapshotLength; i++){
		entry = entries.snapshotItem(i);
//		entry.addEventListener("dblclick", setReadMarkManually, false)
		if(previousRead){
			id = getId(entry)
			if(!id) continue;
			if(id==previousRead){
				markedEntry[previousReadNumber] = entry
				entry.setAttribute("class", entry.getAttribute("class")+" Read_Mark"+previousReadNumber);
				previousReadNumber++;
				if(previousReadNumber<MAX_COUNT_OF_SAVED_PREVIOUS_READ){
					previousRead = getPreviousRead();
				}
				else {
					previousRead = "";
					document.body.removeEventListener('DOMNodeInserted', setReadMark, false);
				}
			}
			else if(previousReadNumber==0) newUnreadNum++;
		}
	}
	if(newUnreadNum){
		unreadNum+= newUnreadNum;
		showUnreadCount();
	}
	numOfEntries = entries.snapshotLength;
	return false;
}
function getEntries(){
	return document.evaluate(
				  entryXPath ,  
				   document.body, 
				   null,  
				   7, 
				   null
				 );
}
function showUnreadCount(){
	if(!unreadNum) return
	if(markedEntry && markedEntry[0]) var count = "("+unreadNum+") "
	else var count =  "("+unreadNum+"+) "
	if(document.title.match(/^\(\d+\+?\)\s/)) document.title = document.title.replace(RegExp.lastMatch, count);
	else document.title = count + document.title
}
/*
function setReadMarkManually(aEvt){
    var entry = aEvt.currentTarget;
    if(markedEntry[0]){
        markedEntry[0].setAttribute("class", markedEntry[0].getAttribute("class").replace("Read_Mark0", ""))
    }
    markedEntry[0] = entry;
    markedEntry[0].setAttribute("class", markedEntry[0].getAttribute("class")+" Read_Mark0")
    id = getId(markedEntry[0])
    setPreviousReadList(id)
}
*/
var getCacheCallback = function(res, url) {
    if (res.status != 200) {
        return getCacheErrorCallback(url)
    }

    var info
    try {
        info = JSON.parse(res.responseText).map(function(i) { return i.data })
    }
    catch(e) {
        info = []
    }

    if (info.length > 0) {
        info = info.filter(function(i) { return ('url' in i) })
        info.sort(function(a, b) { return (b.url.length - a.url.length) })

        var r_keys = ['url', 'entryXPath', 'idXPath']//
        info = info.map(function(i) {
            var item = {}
            //ワイルドカードと正規表現の自動判別しようとしたが、標準で'?'が含まれるURLもあるのでやめた
            /*
            // \ が含まれてない場合ワイルドカードとみなす
            if(i['url'].indexOf("\\")==-1){
                i['url'] = i['url'].replace('.', "\\.").replace('[', "\\[").replace(']', "\\]").replace('^', "\\^").replace('.', "\\.").replace('?', '.').replace('*', '.*');
            }
            item['url'] = i['url']
            */
            r_keys.forEach(function(key) {
                if (i[key]) {
                    item[key] = i[key]
                }
            })
            return item
        })

        cacheInfo[url] = {
            url: url,
            expire: new Date(new Date().getTime() + CACHE_EXPIRE),
            info: info
        }
        GM_setValue('cacheInfo', JSON.stringify(cacheInfo))
        launchAutoReadMark(info)
    }
    else {
        getCacheErrorCallback(url)
    }
}
var getCacheErrorCallback = function(url) {
    var expire = new Date(new Date().getTime() + CACHE_EXPIRE)
    if (cacheInfo[url]) {
        cacheInfo[url].expire = expire
        launchAutoReadMark(cacheInfo[url].info)
    }
    else {
        cacheInfo[url] = {
            url: url,
            expire: expire,
            info: []
        }
    }
    GM_setValue('cacheInfo', JSON.stringify(cacheInfo))
}
function getCache() {
	var tmp = GM_getValue('cacheInfo');
	if(tmp){
		try {
			return JSON.parse(tmp) 
		}
		catch(e) {
			return {}
		}
	}
	return {}
}
function clearCache() {
    GM_setValue('cacheInfo', '')
}
function isChromeExtension() {
    return (typeof chrome == 'object') &&
        (typeof chrome.extension == 'object')
}


})();