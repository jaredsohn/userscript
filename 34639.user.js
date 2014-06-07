// ==UserScript==
// @name           Twitter Enhancements: Retweet This to Plurk
// @namespace      http://twitter.com
// @description   Append a retweet button to the end of each twitter entry
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @author    Ziru, Fortelin
// ==/UserScript==


const locale = '';
// const locale = 'zh-CN';

var gblRetweetTemplate, gblRetweetButtonTitle;

if (locale == 'zh-CN') {
  gblRetweetTemplate = '[转] @%a: %c';
  gblRetweetButtonTitle = '转发';
} else {
  gblRetweetTemplate = 'Retweeting @%a: %c';
  gblRetweetButtonTitle = 'Retweet this';
}

function createButton(target, func, title, width, height, src) {
  var img, button;
  img = document.createElement('img');
  img.width = width;
  img.height = height;
  img.src = src;
  button = document.createElement('a');
  button._target = target;
  button.title = title;
  button.href = '#';
  button.addEventListener('click', func, true);
  button.appendChild(img);
  return button;
}

function GetEntryAuthor(entry) {
  var url = document.location.href.replace(/\?.*/g,'');
  var re = /^https?:\/\/twitter.com\/(.*)$/;
  var m = re.exec(url);
  if (m && (m[1] != 'home') && (m[1] != 'replies')) return m[1];
  else return re.exec(entry.getElementsByClassName('url')[0].href)[1];
}

function getText(elem) {
  var result = '';
  for (var i = 0; i < elem.childNodes.length; i++) {
    var childElem = elem.childNodes[i];
    if (childElem.nodeType == 3)
      result = result + childElem.nodeValue;
    else if ((childElem.nodeType == 1) && (childElem.tagName.toUpperCase() == 'A'))     // remove the html link tag
      result = result + childElem.firstChild.nodeValue;
  }
  return result.replace(/\n/g,'').replace(/^ *\t* */g, '').replace(/ *\t* *$/g, '');
}

function OnRetweetButtonClicked(event, entry) {
  var entryAuthor = GetEntryAuthor(entry);
  var entryContent = getText(entry.getElementsByClassName('entry-content')[0]);
  var retweetStr = gblRetweetTemplate.replace(/%a/g, entryAuthor).replace(/%c/g, entryContent);
  var url = document.location.href.replace(/\?.*/g,'');
//  var re = /^(http?:\/\/www.plurk.com\/).*$/;
//  var m = re.exec(url);
//  window.open('http://www.plurk.com/TimeLine/addPlurk?uid=29912&qualifier=shares&lang=en&content=[retweet]' + encodeURIComponent(entryContent));

  entryContent= "[retweet]" + entryContent; 
  var iLen= entryContent.length; 
  entryContent= window.prompt('Edit the text and send to Plurk, you may add '+ (140-iLen) + ' characters at most:' , entryContent);
  while(entryContent.length > 140)   entryContent= window.prompt('Content exceeds 140 characters('+ entryContent.length + '), edit and send to Plurk again,  or press Cancel: ' , entryContent);
    if(entryContent!=null && entryContent!=""){
      GM_xmlhttpRequest({url:"http://www.plurk.com/TimeLine/addPlurk", 
			  method:"POST",
			  headers:{
			  "Content-Type": "application/x-www-form-urlencoded"},
			  data:"uid=29912&qualifier=shares&lang=en&content="+encodeURIComponent(entryContent),
			  onload:function(xhr){
			  alert("Retweet to plurk successfully!");
			  },
			  onerror:function(xhr){
			  alert("Unable to send Tweet. Bad username/password? Is Plurk down?");
			  }
      });
  }
  event.preventDefault();
}

function CreateRetweetButton(entry) {
  return createButton(
            null,
            function(event) { OnRetweetButtonClicked(event, entry); },
            gblRetweetButtonTitle,
            15,
            12,
            'data:image/png;base64,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');
}

function addRetweetButtonToEntry(entry) {
  var action = entry.getElementsByClassName('actions')[0];
  if (action) {
    var button = CreateRetweetButton(entry);
    action.appendChild(button);
    button.style.display = 'none';
    button.style.margin = '0';
    entry.addEventListener('mouseover', function(evt) {  button.style.display = 'inline'; }, true);
    entry.addEventListener('mouseout', function(evt) { button.style.display = 'none'; }, true);
  }
}

// =================  MAIN ================= 
var entryElems = document.getElementsByClassName('hentry status');
if (!entryElems) return;
for (var i = 0; i < entryElems.length; i++)
  addRetweetButtonToEntry(entryElems[i]);