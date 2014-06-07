// ==UserScript==
// @name           e-pcmag Reply Manager
// @description    Check for new replies in e-pcmag.gr
// @namespace      LocalHost
// @include        *
// ==/UserScript==

var checkInterval=5; //Κάθε πόσα λεπτά θα κοιτάζει

if(!GM_getValue('Initiated', false) || currTime()-parseInt(GM_getValue('InitiatedTime', '0'))>10*60*1000){
GM_setValue('Initiated', true);
GM_setValue('InitiatedTime', String(currTime()));
setInterval(function(){check()}, 10000);
window.addEventListener('unload', function(){GM_setValue('Initiated', false)}, false);
}
GM_setValue('CheckInterval', checkInterval*60*1000);
GM_registerMenuCommand('Enter Topic Number', activate);
GM_registerMenuCommand('Delete Topic (Number)', del);

function check(ref)
{
if(GM_getValue('status', false)) return;
ref=typeof ref=='undefined'?0:ref;
var t=new Date().getTime();
var executeTime=parseInt(GM_getValue('PostCheckInterval', t));
if(ref>0 || ((t>=parseInt(GM_getValue('PostCheckInterval', 0))) && topicsLength()>0)){
GM_setValue('status', true);
var turn=GM_getValue('CurrentPos', 0);
if(turn>topicsLength()-1) turn=0;
if(ref>0) turn=topicsLength()-ref;
GM_setValue('CurrentPos', turn);
var CurrentTopicNum=pickTopic(turn);
requestTopic(CurrentTopicNum, ref>0?true:false);
}
}

function activate()
{
var newOnes=0;
var tArray=new Array;
var topics=prompt('Enter Topic Number');
if(topics.indexOf(';')>-1) tArray=topics.split(/;/);
else tArray.push(topics);
for each(var t in tArray)
{
if(searchTopics(t)>-1) alert('Already Added');
else{
if(t.length>0){
addTopic(t);
newOnes+=1;
}
}
}
check(newOnes);
}

function retMonitorTopics()
{
var tArray=new Array;
var topics=GM_getValue('_topics', undefined);
if(typeof topics!='undefined') tArray=topics.split(/;/);
return tArray;
}

function retPep(tNum)
{
var val=GM_getValue(tNum, undefined)
}

function addTopic(tNum)
{
GM_setValue(tNum, 0)
GM_setValue('_topics', GM_getValue('_topics', '') + tNum + ';')
}

function editTopic(tNum, rNum)
{
GM_setValue(tNum, rNum)
}

function requestTopic(tNum, firstTime)
{
if(!tNum) {reset();return};
GM_xmlhttpRequest({
  method: "GET",
  url: "http://e-pcmag.gr/node/"+tNum,
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept": "text/html"
  },
  onload: function(response) {
    var x=document.createElement('html');
	x.innerHTML=response.responseText;
	var r=parseInt(x.querySelector('.reply-count').textContent);
	r=r?r:0;
	GM_setValue('CurrentPos', GM_getValue('CurrentPos',0)+1);
	//GM_openInTab("http://e-pcmag.gr/node/"+tNum) redir(response.responseText,tNum, x)
	if(GM_getValue(tNum, 0)!=r && !firstTime) redir(response.responseText,tNum, x);
	GM_setValue(tNum, r);
	if((1+GM_getValue('CurrentPos', 0))>topicsLength()) reset();
	GM_setValue('status', false);
	check();
  }
});

}

function topicsLength()
{
var topics=GM_getValue("_topics", '');
if(!topics) return 0;
var tArray=topics.split(/;/);
return tArray.length-1;
}

function reset()
{
var v=new Date().getTime();
v+=GM_getValue('CheckInterval', 50000);
GM_setValue('PostCheckInterval', String(v));
GM_setValue('CurrentPos', 0);
}

function pickTopic(tPos)
{

var topics=GM_getValue("_topics", '');
if(!topics) return;
var tArray=topics.split(/;/);
return tArray[tPos];

}

function redir(page, node, element)
{
var link="http://e-pcmag.gr/node/"+node;
var posts=GM_getValue(node, 0);
if(posts>3){
var a=element.querySelector('.reply-count > a');
if(a){
link=a.href;
link=link.replace(/google.com/, "e-pcmag.gr")
}
}
GM_openInTab(link);
}

function currTime()
{
return new Date().getTime();
}

function del()
{
var topic=prompt("Enter carefully the topic number u want to remove(no spaces)");
if(topic) GM_deleteValue(topic);
var getTopics=GM_getValue('_topics', '');
if(getTopics) GM_setValue('_topics', getTopics.replace(new RegExp(topic+';')))
}

function searchTopics(tNum)
{
var topics=GM_getValue("_topics", '');
return topics.search(new RegExp("(?:^|;)"+tNum+";"));
}