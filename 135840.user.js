// ==UserScript==
// @name           YouTube Multi-Downloader
// @namespace      ytmd.gotscripts
// @description    Download videos from YouTube.
// @version        1.2.8
// @include        http://youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch#*
// @include        http://*.youtube.com/watch#*
// @include        http://youtube.com/user/*
// @include        http://*.youtube.com/user/*
// ==/UserScript==

// format descriptions borrowed from http://userscripts.org/scripts/source/62634.meta.js
// fix bug : broken on some pages, because 1080p WebM format not in f. by ifreedom.cn@gmail.com

var b, p,   // the button and its parent element
    timer,  // a timer
    f={
      0: {d:"Low Quality"                  ,f:"FLV" ,q:"22kHz, mono"  ,a:"MP3"   ,v: "SVQ"   },
      5: {d:"Low Quality"                  ,f:"FLV" ,q:"22kHz, mono"  ,a:"MP3"   ,v: "SVQ"   },
      6: {d:"High Quality"                 ,f:"FLV"                   ,a:"MP3"   ,v: "SVQ"   },
      13:{d:"Low Quality H.263"            ,f:"3GPP",q:"8kHz, mono"   ,a:"SAMR"  ,v: "H.263" },
      15:{d:"Original Upload Format"                                                         },
      17:{d:"Low Quality MPEG-4"           ,f:"3GPP",q:"44kHz, mono"  ,a:"AAC"   ,v: "MPEG-4"},
      18:{d:"iPod Compatible, High Quality",f:"MP4" ,q:"44kHz, stereo",a:"AAC"   ,v: "H.264" },
      22:{d:"High Definition, 720p"        ,f:"MP4" ,q:"44kHz, stereo",a:"AAC"   ,v: "H.264" },
      34:{d:"Low Definition, 360p"         ,f:"FLV" ,q:"44kHz, stereo",a:"AAC"   ,v: "H.264" },
      35:{d:"Standard Definition, 480p"    ,f:"FLV" ,q:"44kHz, stereo",a:"AAC"   ,v: "H.264" },
      36:{d:"High Quality MPEG-4"          ,f:"3GPP",q:"44kHz, mono"  ,a:"AAC"   ,v: "MPEG-4"},
      37:{d:"Full High Definition, 1080p"  ,f:"MP4" ,q:"44kHz, stereo",a:"AAC"   ,v: "H.264" },
      38:{d:"Original Definition"          ,f:"MP4"                   ,a:"AAC"   ,v: "H.264" },
      43:{d:"Low Definition, 360p"         ,f:"WebM"                  ,a:"Vorbis",v: "VP8"   },
      44:{d:"Medium Definition, 480p"      ,f:"WebM"                  ,a:"Vorbis",v: "VP8"   },
      45:{d:"High Definition, 720p"        ,f:"WebM"                  ,a:"Vorbis",v: "VP8"   },
      46:{d:"High Definition, 1080p"       ,f:"WebM"                  ,a:"Vorbis",v: "VP8"   } },
    iconShade="data:image/png;base64," // non-hovered icon.
             +"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEX///9+fn5+fn6ZmZlpaWnX"
             +"19e5ubm/v7/7+/uDg4Po6Ojd3d1/f3/CwsJTU1Px8fEeXBn5AAAABHRSTlMA0mb3LeAsWgAAAF9J"
             +"REFUCNdjYGBgUBRigABpQyjj9B1CDCbB03cEFYAMxt3W17cLgBjlu6/XghhMh6/ftQFJZT6xveP3"
             +"DMiI6O/o/7UMyMhf1dEfBWLMWpo5M2olkDH/PxD8BDLegQEDAB75KdyY0EUxAAAAAElFTkSuQmCC",
    iconLight="data:image/png;base64," // hovered icon.
             +"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEX///9lthhNmQROmQZFfRPW"
             +"19S4urWR2UuChICJ4TNOmgb6+/rw8fDn6OXC7JpRVE/NNQBkAAAABHRSTlMA92bSWGJ8FgAAAF9J"
             +"REFUCNdjYGBgUDZigAA7YShj3SxCDCbjdbOMFYAM5ndy058bgBjl76ZXghhMC6fPlAJJZXyRnOX/"
             +"DciI3rN7z9lrQEbO3d17YkGM3qsZHbE3gIyeM0BwAsj4DwYMAIiCKIbbcINPAAAAAElFTkSuQmCC";

addStyles(
    '\n.ytmd-mini-button-outer .ytmd-mini-button {display:none; } '
  + '\n.ytmd-mini-button-outer:hover .ytmd-mini-button { display:block; } '
  + '\n.ytmd-big-button, .ytmd-mini-button { background-image:url('+iconShade+'); } '
  + '\n.ytmd-big-button { background-position:0 50%; '
  + '\n    background-repeat:no-repeat; padding-left:24px; display:inline-block;'
  + '\n    line-height:24px; text-decoration:none; color:black; display:inline-block; min-height:24px; } '
  + '\n.ytmd-big-button:hover, .ytmd-mini-button:hover { background-image:url(' + iconLight + '); } '
  + '\n.ytmd-mini-button { position:absolute;top:0;left:0;z-index:9999;cursor:pointer; '
  + '\n    width:16px; height:16px; } '
);

function addStyles (css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) _addStyles(css);
  else window.addEventListener('load', function(){_addStyles(css);}, false);

}

function _addStyles (css) {
  var ss = document.createElement('style');
  ss.setAttribute("type", "text/css");
  ss.styleSheet ? ss.styleSheet.cssText = css : ss.appendChild(document.createTextNode(css));
  (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(ss);
}

function makeDownloadButton () {

  p=document.getElementById('watch-actions-right') ||
    document.getElementById('channel-like-buttons') ||
    document.body;

  // check playlist and suggestions for updates
  // linkThumbLists(['quicklist-item', 'video-list-item', 'playnav-video-thumb']);
  makeLinkButtons();

  // user pages: abort if nothing should happen
  if ((b && b.clientHeight) || (p && !p.clientHeight)) return;


  var o={}, c=getLinks(document, o), t=getTitle(document), i, d, a;

  if (c==1) { // no need for a menu if there's only one link.
    b=document.createElement('a');
    for (i in o) if (o.hasOwnProperty(i)) {
      b.href=o[i] + '&title=' + t;
      b.innerHTML=('Download as ' + f[i].f);
    }
  } else {
    m=document.createElement('div');
    m.className = 'yt-uix-button-menu hid';
    b=document.createElement('button');
    b.innerHTML=('Download...');
    b.appendChild(m);
    // console.dir(o);
    for (i in o) if (o.hasOwnProperty(i)) {
      // write the link into our menu
      d=f[i];
      // console.log(i);
      // console.dir(d);
      if (d) {
        a=document.createElement('a');
        a.href=o[i] + '&title=' + t;
        a.className='yt-uix-button-menu-item';
        a.innerHTML= d.d + ' ' + d.f + '<br />' + d.v + ' / ' + d.a + (d.q ? ' (' + d.q + ')' : '');
        m.appendChild(a);
      }
    }
  }

  b.innerHTML = '<span class="ytmd-big-button">' + b.innerHTML + '</span>';
  b.className = 'yt-uix-button';
  b.style.textDecoration='none';
  b.style.display='inline-block';

  if (p.id=='watch-actions-right') {
    b.style['float']='left';
  }

  // run makeDownloadButton periodically (function will abort if nothing should happen)
  clearInterval(timer);
  timer=setInterval(makeDownloadButton, 2000);

  p.appendChild(b);

}

/*
function getLinks (d, o) {
  var h=d.documentElement.innerHTML,
      l=/\d+\|http:.*?videoplayback.*?&id=\w+\b/g,  // regex to find download links
      r=h.match(l) || unescape(h).match(l),         // array of format ids and links, pipe-separated
      i, a, x, c=0;

  for (i in r) {
    x=r[i].indexOf('|');
    a=[r[i].substring(0,x), r[i].substring(x+1)];   // separate format id from url
    if (o[a[0]] || !f[a[0]]) continue;              // if we've seen or don't know the format, skip it
    o[a[0]]=a[1];                                   // we've seen this format now
    ++c;                                            // increment counter
  }
  return c;
}
*/

function getLinks(doc, out) {
  var count = 0,
      title = encodeURIComponent(getTitle(doc)),
      links = (doc||document).documentElement.innerHTML
          .match(/flashvars="([^"]+)"/)[1]
          .match(/url%3D([^&]+)/)[1]
          .split('%2Curl%3D');
  for(var i=links.length; i--;) {
    var link = decodeURIComponent(decodeURIComponent(links[i]))
       .match(/.*quality=[^&]+/)[0]
       .concat('&title=', title);
    var format = link.match(/itag=(\d+)/)[1];
    if (out[format]) continue;
    out[format] = link;
    ++count;
  }
  return count;
}

function getTitle (d) {
  var t=(d.getElementById('playnav-curvideo-title')||{}).textContent ||
         d.documentElement.innerHTML.match(/<meta\s+name="title"\s+content="([^"]*)/ )[1];
 // special chars in titles are double-escaped as html entities
  t=unescapeEntities(t, 2);
  // clean up the title
  return t.replace(/^\s\s*/, '').replace(/\s\s*$/, '')  //trim
          .replace(/@/g, ' at ')        // "at"
          .replace(/[&+]/g, ' and ')    // "and"
          .replace(/[_\s]+/g, ' ')      // blank space
          .replace(/[/\|\\~]/g, '-')    // slashes and dashes
          .replace(/[^\- ,\w]/g, '');   // everything else
}

var tmpSpan=document.createElement('span');

function unescapeEntities (t, n) {
  if (!n) n=1;
  while (n--) {
    tmpSpan.innerHTML=t;
    t=tmpSpan.textContent;
  }
  return t;
}

var linkListLength=0;

function makeLinkButtons () {
  var links=document.getElementsByTagName('a'),
      i=links.length, list=[], a, b, s, x, aDisplay;

  if (linkListLength==i) return;
  linkListLength=i;

  for (i=links.length; i--;)
    if ((''+links[i].getAttribute('href')).indexOf('watch?v=')>-1)
      list.push(links[i]);

  for (i=list.length; a=list[--i];) {
    if (a.getAttribute('data-ytmd-seen')) continue;
    a.setAttribute('data-ytmd-seen', 1);
    s=document.createElement('span');
    x=document.createElement('span');
    b=document.createElement('div');
    b.className='ytmd-mini-button';
    b.title='Download as MP4';
    b.setAttribute('data-ytmd-link', a.href);
    b.addEventListener('click', miniButtonAction, false);
    b.className='ytmd-mini-button';
    s.className='ytmd-mini-button-outer'
    s.style.position='relative';
    aDisplay=getComputedStyle(a).display;
    s.style.display=aDisplay=='inline'?'inline-block':aDisplay;
    s.appendChild(b);
    a.parentNode.replaceChild(x, a);
    s.appendChild(a);
    x.parentNode.replaceChild(s, x);
  }
}

// click the mini button to download as MP4 (fmt 18)
function miniButtonAction () {
  downloadWatchPage(this.getAttribute('data-ytmd-link'));
  return false;
}

// crazy shit with iframes
function downloadWatchPage (url, frame) {
  if (!frame) {
    frame=document.createElement('iframe');
    frame.style.cssText='position:absolute;width:0;height:0;border:none;';
    document.body.appendChild(frame);
    frame.addEventListener('load', function(){downloadWatchPage(url, frame)}, false);
    frame.src=url;
    frame.timer = setInterval(function(){
      frame.contentDocument.body.style.display='none';
    }, 20);
    return;
  }
  setTimeout(function(){
    var t=getTitle(frame.contentDocument), o={};
    getLinks(frame.contentDocument, o);
    frame.src=o[18] + '&title=' + t;
  }, 500);
  setTimeout(function(){
    clearInterval(frame.timer);
    document.body.removeChild(frame);
  }, 5000);
}

makeDownloadButton();
