// ==UserScript==
// @name        MessageSplit
// @namespace   PSVScripts
// @description Получение "сообщений" со страниц
// @updateURL   https://userscripts.org/scripts/source/165206.user.js
// @version     1.5.5
// @grant       none
// ==/UserScript==

// 9:21 13.05.2013	1.5.4 изменена прозрачность у Alert окошка
// 11:08 14.05.2013	1.5.5 шире минимальная ширина alert окошка

if (!unsafeWindow) unsafeWindow = window;

var prevAlert = unsafeWindow.alert;
var prevConf  = unsafeWindow.confirm;
var popUP  = null;
var popUPStyles='#UJS_alertContainer{'+
                'background-color:#9cf;position:fixed;right:0;bottom:0;max-width:45%;opacity:0.9;}'+
                '.UJS_alertBox{'+
                'border:1px dashed;padding:2px;}';

var MsgWindow = document.createElement('div');
MsgWindow.id = 'MsgWindow';
MsgWindow.style.cssText = 'z-index:5;background-color:#9cf;position:fixed;min-width: 100px;max-width:33%;opacity:0.95;}';
MsgWindow.style.left = '50px';
MsgWindow.style.top = '50px';
document.documentElement.addEventListener('keypress', doKeyPress, false);

function doKeyPress(e)
{
//  alert(e.keyCode);
  if ((e.altKey)&& (e.keyCode == 37))
  {
    TMessagePrev();
    e.preventDefault();
    return false;
  }
  if ((e.altKey)&& (e.keyCode == 39))
  {
    TMessageNext();
    e.preventDefault();
    return false;
  }
}

function ArrIndexOf(arr, item)
{
  for (var n = 0; n < arr.length; n++)
    if (arr[n] == item) return n;
  return;
}

function onMessageClick(e)
{
  if (e.button == 2)
    this.parentNode.removeChild(this);
  e.preventDefault();
  return false;
}

unsafeWindow.TMessageHide = TMessageHide;
unsafeWindow.TMessageNext = TMessageNext;
unsafeWindow.TMessagePrev = TMessagePrev;

unsafeWindow.ShowText = function(aTitle, aText)
{
  var msg = new TMessage('', aText, '', aTitle);
  msg.Show();
  return msg;
}

unsafeWindow.alert = function(input)
{
  if(popUP==null)
  {
    var heads = document.evaluate('//head',document,null,XPathResult.ANY_TYPE,null);
    var head = heads.iterateNext();
    if (head) 
    {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(popUPStyles));
      head.appendChild(style); 
    }
    popUP=document.createElement('div');
    popUP.setAttribute('id','UJS_alertContainer');
    document.body.appendChild(popUP);
  }
  var newPopup = document.createElement('div');
  newPopup.setAttribute('class','UJS_alertBox');
  newPopup.title = "right click to hide message";
  //newPopup.textContent=input;
  newPopup.innerHTML=input;
  popUP.appendChild(newPopup);
  newPopup.addEventListener('mouseup', onMessageClick,false);
}

unsafeWindow.confirm = function (input)
{
  var conf = localStorage['confirm'];
  if (!conf)
  {
    conf = prevConf(input);
    localStorage['confirm'] = conf;
  }
  alert(input+'\n'+conf);
  return conf;
}

document.documentElement.addEventListener('resize', CenterWindow, false);


function TMessageNext()
{
  var aid = TMessage.prototype.cur +1;
  if (aid >= TMessage.prototype.all.length) 
    aid = 0;
  TMessage.prototype.cur = aid;
  TMessage.prototype.all[aid].Show();
}

function TMessagePrev()
{
  var aid = TMessage.prototype.cur -1;
  if (aid < 0) 
    aid = TMessage.prototype.all.length -1;
  TMessage.prototype.cur = aid;
  TMessage.prototype.all[aid].Show();
}

function TMessageHide(id = null)
{
  TMessage.prototype.visible = 1;
//  while (MsgWindow.childNodes.length>0)
//    MsgWindow.removeChild(MsgWindow.firstChild);
  if (MsgWindow.parentNode)
    MsgWindow.parentNode.removeChild(MsgWindow);
}

function CenterWindow()
{ 
  MsgWindow.style.left = ((window.innerWidth -MsgWindow.clientWidth) / 2)+'px';
  MsgWindow.style.top = ((window.innerHeight -MsgWindow.clientHeight) / 2)+'px';
}

function TMessageClose()
{
  var aMsg = this;
  if (!aMsg) return;  
  var idx = ArrIndexOf(TMessage.prototype.all, aMsg);
  TMessage.prototype.all.splice(idx, 1);
  TMessage.prototype.cur = idx -1;
  if ((TMessage.prototype.all[TMessage.prototype.cur]) && (TMessage.prototype.visible == 2))
  {
    TMessageNext()
  }
  else 
  {
    TMessageHide()
  }
}

function TMessageShow()
{
  var aMsg = this;
  if (!aMsg) return;
  aMsg.Hide();

  TMessage.prototype.cur = ArrIndexOf(TMessage.prototype.all, aMsg);
  TMessage.prototype.visible = 2;
  
  if (!MsgWindow.parentNode)
    document.body.appendChild(MsgWindow);

  var msgTxt = '<table width="100%" height="100%"><tr><td colspan="2"><b>'+aMsg.Title+'</b></td><td width="16">'+
                        '<a onclick="TMessageHide();return false;" title="Close" style="cursor: pointer;"><img src="http://www.eurasian-bank.kz/images/close.png" /></a></td></tr>'+
                        '<tr><td colspan="3">'+aMsg.Content+'</td></tr>';
  if (this.all.length < 2)
    msgTxt += '<tr><td colspan="3"><a href="'+aMsg.url+'">'+aMsg.Description+'</a></td></tr></table>'
  else
    msgTxt += '<tr><td width="16"><a onclick="TMessagePrev();return false;" title="Previous [alt ←]" style="cursor: pointer;"><img src="http://cdn1.iconfinder.com/data/icons/customicondesignoffice5/16/navigate-left.png"/></a></td>'
             +'<td colspan="1"><a href="'+aMsg.url+'">'+aMsg.Description+'</a></td>'
             +'<td width="16"><a onclick="TMessageNext();return false;" title="Next [alt →]" style="cursor: pointer;"><img src="http://cdn1.iconfinder.com/data/icons/customicondesignoffice5/16/navigate-right.png"/></a></td></tr></table>';
                        
  MsgWindow.innerHTML = msgTxt;
  CenterWindow();
}

var TMessage = function(aDescription, aContent, aurl='', aTitle=''){
  this.Title = aTitle;
  this.Description = aDescription;
  this.url = aurl;
  this.Content = aContent;
  
  if (!TMessage.prototype.all)
    TMessage.prototype.all = new Array();  
    
  this.id = TMessage.prototype.all.length;
  TMessage.prototype.all.push(this);
  if (TMessage.prototype.cur === undefined)
    TMessage.prototype.cur = this.id;
  if (!TMessage.prototype.visible)
    TMessage.prototype.visible = 1;

  if (this.visible == 2)
    TMessage.prototype.all[TMessage.prototype.cur].Show();
}
TMessage.prototype.Show = TMessageShow;
TMessage.prototype.Hide = TMessageHide;
TMessage.prototype.Close = TMessageClose;

function nodePath(node)
{
 if (node.parentNode) return nodePath(node.parentNode)+'.'+node.nodeName+':'+node.className;
 return '-'+node.nodeName;
}
function getElementsByClassName(Name, from)
{
  var rlist = new Array;

  if (!from.childNodes) return rlist;
  var all = from.childNodes;
  for (var i = 0; i< all.length; i++)
  {
    if (all[i].className)
    {
      var classes = all[i].className.toLowerCase().split(' ');
      for (var c = 0; c < classes.length; c++)
      if (classes[c] == Name.toLowerCase())
      {
        rlist.push(all[i]);
        break;
      }
    };
    
    if (all[i].childNodes)
    if (all[i].childNodes.length > 0)
    {
      var inline = getElementsByClassName(Name, all[i]);
      for (var n = 0; n < inline.length; n++)
        rlist.push(inline[n]);
    };    
  };
  return rlist;
}

function DoMessageFromSpan(node, ttlclass, txtclass, i, t)
{
  var text = node.innerHTML;
  var aLink = '';
  var atxt = getElementsByClassName(txtclass, node)[0];
  if (atxt) text = atxt.innerHTML;

  var ahr = getElementsByClassName(ttlclass, node)[0];
  if (ahr) aLink = ahr.outerHTML;
  
  var amsg = new TMessage(i+'/'+t, text, '', aLink);
  node.parentNode.removeChild(node);
  if (amsg.visible !=2) amsg.Show();
}

function ShowMessages(msgclass, ttlclass, txtclass)
{
  var messages = new Array();

  for (var i = 0; i<document.documentElement.childNodes.length; i++)
    if (document.documentElement.childNodes[i].nodeName == 'BODY')
      messages = getElementsByClassName(msgclass, document.documentElement.childNodes[i]);
      
  for (var n = 0; n<messages.length; n++)
    DoMessageFromSpan(messages[n], ttlclass, txtclass, n+1, messages.length);

  return messages.length;
}
unsafeWindow.ShowMessages = ShowMessages;

function UpdateMessages()
{
  ShowMessages('TMessage', 'TMessageTitle', 'TMessageText'); //b-serp-item
//  ShowMessages('b-serp-item', 'b-serp-item__title-link', 'b-serp-item__text'); // yandex results
//  ShowMessages('card-common', 'entry-title-link', 'item-body'); // greader results  
}

UpdateMessages();
setTimeout(UpdateMessages, 1500);
//  TMessage.prototype.Title = '';
//  TMessage.prototype.Description = '';
//  TMessage.prototype.url = '';
//  TMessage.prototype.Image = '';

//var msg = new TMessage('test', 'first', 'http://www.w3schools.com', '<a href="http://w3schools.org">w3schools</a>');
//msg.Show();
//var msg = new TMessage('test', '<img src="http://www.gravatar.com/avatar/00cc18165cda711e712435e858034ff9?r=PG&s=92&default=identicon"/>', 'http://www.w3schools.com', 'w3schools');
//var msg = new TMessage('test', 'third', 'http://www.w3schools.com', 'w3schools');
