// ==UserScript==
// @name        autoforum
// @namespace   afm
// @include     http://rutracker.org/*
// @version     1.0.1
// @updateURL   ttps://userscripts.org/scripts/source/166707.user.js
// @grant none
// ==/UserScript==


// 23:08 05.05.2013 заливка на us.org

var http = new XMLHttpRequest();
var tempdoc = new DOMParser();
var origtitle = document.title;
var msgidx = -1;
var msgs = Array();
var cellidx = 1;
var topics = Array();
var hasscipts = 0;


var allrows = document.getElementsByTagName('tr');

for (var i = 0; i<allrows.length; i++)
{
  // if (allrows[i].className.indexOf('hl-tr') >= 0)
    topics.push(allrows[i]);
};

if (0 === topics.length)
for (var i = 0; i<allrows.length; i++)
{
  if (allrows[i].id.indexOf('tr-') == 0)
    topics.push(allrows[i]);
};



// 

if ('viewforum.php' === location.pathname.split('/')[2])
{
  cellidx = 1;
  document.title = '['+  topics.length +'] ' +origtitle;
}
else
if ('tracker.php' === location.pathname.split('/')[2])
{
  cellidx = 3;
  document.title = '['+  topics.length +'] ' +origtitle;
}
else
if ('search.php' === location.pathname.split('/')[2])
{
  cellidx = 2;
  document.title = '['+  topics.length +'] ' +origtitle;
}
else
if ('search_cse.php' === location.pathname.split('/')[2])
{
  cellidx = 0;
  document.title = '['+  topics.length +'] ' +origtitle;
}
else
  return null;



function pause(ms)
{
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < ms);
}

function getcontent(url)
{
  try
  {
    http.open('GET', url+'&tmp='+Math.random(), false);
    http.send(null);
  }
  catch(e)
  { return null; };

  if (http.status == 200)
    return tempdoc.parseFromString(http.responseText, 'text/html');
  return null;
}

function makeImages(dom)
{
  var spans = dom.getElementsByTagName('var');
  var mwidth = window.innerWidth * 0.8;
  for (var i = 0; i < spans.length; i++)
  if (spans[i].className.indexOf('postImg') >= 0)
  {
    var aimg = document.createElement('img');
    var src = spans[i].getAttribute('title');

    var img = new Image();
    img.src = src;
    var divider = 1;
    if (img.width > mwidth )
    {
      divider = (img.width / mwidth);
      aimg.setAttribute('width', Math.round(img.width / divider));
      aimg.setAttribute('height', Math.round(img.height / divider));
    }

    aimg.setAttribute('src', src);
    aimg.className = spans[i].className;
    spans[i].parentNode.insertBefore(aimg, spans[i]);
    spans[i].parentNode.removeChild(spans[i]);
  }

  var spans = dom.getElementsByTagName('div');
  for (var i = 0; i < spans.length; i++)
  if (spans[i].className.indexOf('sp-') >= 0)
  {
    var imgs = spans[i].getElementsByTagName('img');
    if ((imgs.length > 0) && (imgs.length < 25))
    {
      spans[i].style.display = 'block';
    }
  }

  var spans = dom.getElementsByTagName('a');
  for (var i = 0; i < spans.length; i++)
    spans[i].setAttribute('target', '_blank');
}

function GetFirstPost(url)
{
  var dom = getcontent(url);
  if (null == dom) 
    return null;

  if (hasscipts)
  {
   hasscipts = 1;
   var scripts = dom.getElementsByTagName('script');
   for (var i = 0; i < scripts.length; i++)
     document.documentElement.appendChild(scripts[i]);
   alert('scripts copied');
  }

  var atable = dom.getElementById('topic_main');
  if (null == atable)
    return -1;

  var amessages = atable.getElementsByTagName('td');
  for (var i = 0; i < amessages.length; i++)
    if (amessages[i].className == 'message td2') 
    {
      makeImages(amessages[i]);
      return amessages[i];
    }
  return -1;
}

var topicsprocessed = 0;

function findtable(element)
{
  while (1)
  {
    if (element == null) return null;
    if (element == document.body) return null;
    if (element.nodeName.toLowerCase() == 'table') return element;
    element = element.parentNode;
  }
}

function strip_tags( str )
	// Strip HTML and PHP tags from a string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
{
  return str.replace(/<\/?[^>]+>/gi, '');
}

for (var i = 0; i<topics.length; i++)
{
  var textcell = topics[i].getElementsByTagName('td')[cellidx];
  if (!textcell) 
    continue;

  var lnks = textcell.getElementsByTagName('a');
  var lnk = lnks[0];

  if (cellidx != 2)
  for (var n = 0; n < lnks.length; n++)
    if (lnks[n].className == 'torTopic bold tt-text') lnk = lnks[n];

  if (cellidx == 2)
  for (var n = 0; n < lnks.length; n++)
    if (lnks[n].className == 'topictitle') lnk = lnks[n];

  if (!lnk)
    continue;

  if (String(lnk).indexOf('viewtopic.php') <0)
    continue;

  textcell.setAttribute('lnk', lnk);
  textcell.setAttribute('ttl', strip_tags(lnk.innerHTML) );

  document.title = '[...'+ (topicsprocessed +1) +'/' +topics.length +'] ' +lnk;
  textcell.scrollIntoView();
  var amsg = null;
  for (var n = 0; n< 5; n++)
  {
    amsg = GetFirstPost(lnk);
    if (-1 === amsg)
      break;

    if (null != amsg)
    {
      msgs.push(textcell);
      textcell.innerHTML = amsg.innerHTML;
      break;
    }
    // alert(lnk +' : no page');
    document.title = '[$..'+ (n +1) +'] ' +lnk;
    pause(450);
  }
  // if (-1 === amsg) alert(lnk +' : no first post content');

  topicsprocessed++;
  document.title = '['+ topicsprocessed +'/' +topics.length +'] ' +origtitle;
}

if (msgs.length > 0)
{
  var atbl = findtable(msgs[0]);
  atbl.innerHTML = '';
  for (var i = 0; i < msgs.length; i++)
  {
    var tr = document.createElement('tr');
    tr.appendChild(msgs[i]);
    atbl.appendChild(tr);
  }
  msgs[0].scrollIntoView();
}

function setDocTitle(idx)
{
  document.title = '[>'+ (1 +idx)+'/' +msgs.length +'] ' +msgs[idx].getAttribute('ttl');
}



function keypresshandler(e)
{
  if ((e.charCode == 106) || (e.keyCode == 37))
  {
    msgidx++;
    if (msgidx >= msgs.length) msgidx = 0;
    msgs[msgidx].scrollIntoView();
    return false;
  }

  if ((e.charCode == 107) || (e.keyCode == 39))
  {
    msgidx--;
    if (msgidx < 0) msgidx = msgs.length -1;
    msgs[msgidx].scrollIntoView();
    return false;
  }

  if ((e.charCode == 32))
  {
    window.open(msgs[msgidx].getAttribute('lnk'),  '_blank');
    return false;
  }
  
  if ((e.charCode == 108) || (e.keyCode == 45))
  {
    window.sidebar.addPanel(msgs[msgidx].getAttribute('ttl'), msgs[msgidx].getAttribute('lnk'), ''); 
    return false;
  }

  // alert(e.charCode +' '+e.keyCode);
}

function scrollhandler(e)
{
  for (var i = 0; i < msgs.length; i++)
  if ((msgs[i].getBoundingClientRect().top < 1) && (msgs[i].getBoundingClientRect().bottom >= 1))
  {
    setDocTitle(i);
    msgidx = i;
    return false;
  }
  document.title = origtitle;
}

document.title = origtitle;
window.onkeypress = keypresshandler;
window.onscroll = scrollhandler;
window.onmousedown = keypresshandler;
