// ==UserScript==
// @name          Delicious Links
// @namespace     http://flyne.monkey.googlepages.com
// @description      Changes the background color of links which are in a user's del.icio.us bookmarks to prevent creating duplicate bookmarks.
// @include       *
// @version 0.2~
// ==/UserScript==


var version = 0.2

var date = new Date()
if(date.getDay() == 1 && GM_getValue('checked', 0) == 0) {
  GM_xmlhttpRequest({
    method:"GET",
    url: "http://userscripts.org/scripts/source/7956",  
    headers:{
      "User-Agent":"monkeyagent",
      "Accept":"text/monkey,text/xml",
      },
    onload:function(details) {
      scriptsource = details.responseText;
      checkforupdates();
    }
  });
}
if(date.getDay() != 1)
  GM_setValue('checked', 0)

function checkforupdates() {
  var curversion = scriptsource.split("@version ")[1].split('~')[0]
  if(curversion != version && GM_getValue('checked', 0) == 0) {
    alert("A new version of Delicious Links is available.")
    if(confirm("Download now?")) {
      GM_openInTab('http://userscripts.org/scripts/show/7956')
    }
  }
  GM_setValue('checked', 1)
}



var page;
var urls = new Array()
var tempcheckarray = new Array()

if(unsafeWindow.location.toString().match('url=')) {
  if(unsafeWindow.location.toString().split('url=')[1].length > 1) {
    document.getElementById('delForm').addEventListener('submit',addlink,false)
  }
}

function getHTML(url) {
  GM_xmlhttpRequest({
    method:"GET",
    url: url,
    headers:{
      "User-Agent":"monkeyagent",
      "Accept":"text/monkey,text/xml",
      },
    onload:function(details) {
      page = details.responseText;
      processHTML();
    }
  });
}

function processHTML() {
  urls = page.split('href="')
  for(i=1; i<urls.length; i++) {
    urls[i-1] = urls[i].split('" description=')[0]
  }
  urls.length = urls.length - 1
  //alert(urls)
  for(j=0; j<urls.length; j++) {
    GM_setValue(urls[j], 1)
    if(!GM_getValue('allURLs', '\n').match(urls[j])) GM_setValue('allURLs', GM_getValue('allURLs', '\n') + urls[j] + '\n')
  }
  highlight()
}


function highlight() {
  allLinks = document.getElementsByTagName('a')
  for(i=0; i<allLinks.length; i++) {
    if(GM_getValue(allLinks[i].href) == 1) {
      allLinks[i].style.backgroundColor = '#d8d8d8'
    }
  }
}

function update() {
  var name = prompt('What account name? (This is the part after http://del.icio.us/ when looking at your bookmarks', '')
  var pass = prompt('What is the password for this account? This information is not stored.', '')
  getHTML('https://'+name+':'+pass+'@api.del.icio.us/v1/posts/all?')
}

function addlink() {
  link_url = document.getElementById('url').value
  //alert(link_url)
  GM_setValue(link_url, 1)
  if(!GM_getValue('allURLs', '\n').match(link_url)) GM_setValue('allURLs', GM_getValue('allURLs', '\n') + link_url + '\n')
}

function listlinks() {
  alert(GM_getValue('allURLs'))
}

function removelink() {
  var rmlink = prompt('What URL?', '')
  GM_setValue(rmlink, 0)
  GM_setValue('allURLs', GM_getValue('allURLs').split(rmlink + "\n").join(''))
}

function removeall() {
  linksarray = GM_getValue('allURLs').split('\n')
  for(i=0; i<linksarray.length; i++) {
    GM_setValue(linksarray[i], 0)
  }
  GM_setValue('allURLs', "")
}


GM_registerMenuCommand("Fetch del.icio.us bookmarks", update)
GM_registerMenuCommand("List local del.icio.us bookmarks", listlinks)
GM_registerMenuCommand("Remove local del.icio.us bookmark", removelink)
GM_registerMenuCommand("Remove all local del.icio.us bookmarks", removeall)


highlight()