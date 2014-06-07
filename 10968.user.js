// ==UserScript==
// @name           Google Reader Tag Cloud
// @namespace      http://jabasite.ej.am
// @description    Creates a tag cloud for google reader
// @include        http://www.google.com/reader/view*
// ==/UserScript==
// created 07/26/07
function sendRequest(url,callback,postData) {
	var req = createXMLHTTPObject();
	if (!req) return;
	var method = (postData) ? "POST" : "GET";
	req.open(method,url,true);
	req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	req.send(postData);
}
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
var XMLHttpFactories = [
	function () {return new XMLHttpRequest()},
	function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
	var xmlhttp = false;
	for (var i=0;i<XMLHttpFactories.length;i++) {
		try {
			xmlhttp = XMLHttpFactories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}
(function(){

var total = null;
var complete = 0;
function getLength(id){
     GM_xmlhttpRequest({
             method: 'GET',
             url: 'http://www.google.com/reader/atom/'+id,
             headers: {},
           onload: function(responseDetails) {
                 TagGot(responseDetails);
             }
     });
    
}

function TagGot(details){
    if (details.status==200){
        complete+=1
        if (complete==total){
                imm.parentNode.removeChild(imm);
                imm=null;
            }
        var parser = new DOMParser();
        var dom = parser.parseFromString(details.responseText,
                     "application/xml");
        l=details.responseText
        n=l.slice(l.search(/<link rel="self" href="/)+'<link rel="self" href="'.length)
        var tag = n.slice(0,n.search(/"/)).split('/').slice(-1)[0]
        show(tag, dom.firstChild.childNodes.length-7)
    }
}

function pulseup(){
    if (!imm)return
    if (imm.style.opacity>=1.0){
        pulsedown()
        return
    }
    var a=parseFloat(imm.style.opacity);
    a=a+.1
    imm.style.opacity=a;
    setTimeout(pulseup,50);
}
function pulsedown(){
    if (!imm)return
    if (imm.style.opacity<=0){
        pulseup()
        return
    }
    var a=parseFloat(imm.style.opacity);
    a=a-.1
    imm.style.opacity=a;
    setTimeout(pulsedown,50);
}

var par = null;
var imm = null;

function getTags(){
    par=document.createElement('div')
    par.style.width='200px'
    par.style.minHeight="100px"
    par.style.backgroundColor="white"
    par.style.wordWrap="break-word";
    par.style.position="absolute";
    var [x,y] = findPos(a);
    par.style.top = y+a.offsetHeight+2+"px";
    par.style.left = x+"px"
    par.style.border = "1px solid black"
    par.style.zIndex = "200";
    par.style.padding = "5px";
    imm = info.insertBefore( document.createElement("span"), info.childNodes[1])
    imm.innerHTML="loading"
    imm.style.margin="2px"
    imm.style.padding="2px"
    imm.style.backgroundColor="red"
    imm.style.opacity = 1
    pulsedown();
    document.body.appendChild(par)
    GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://www.google.com/reader/api/0/tag/list?output=json',
            headers: {},
            onload: function(a) {
                eval('tags='+a.responseText);
                total = tags.tags.length-2
                for (var i=2;i<tags.tags.length;i++){
                    getLength(tags.tags[i].id);
                }
             }
     });/*
    sendRequest('http://www.google.com/reader/api/0/tag/list?output=json',
                function(a){
                    eval('tags='+a.responseText);
                    total = tags.tags.length-2
                    for (var i=2;i<tags.tags.length;i++){
                        getLength(tags.tags[i].id);
                    }
                })*/
}

function show(x,y){
    if (y<2)return
    var d = par.appendChild(document.createElement("a"))
    d.style.fontSize = y+8+"px"
    d.innerHTML=x+" ";
    d.href = "/reader/view/user/-/label/"+x
}

var info = document.getElementById("global-info")
var a = info.insertBefore( document.createElement("a"), info.firstChild)
info.insertBefore( document.createTextNode(" "), info.childNodes[1])
a.innerHTML = "Tag Cloud"
a.href = "#"
a.addEventListener("click",function(){getTags()},false);
})();
