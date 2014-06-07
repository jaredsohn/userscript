// ==UserScript==
// @name          Cup of Tea
// @namespace     http://flyne.monkey.googlepages.com
// @description	  Loads different URLs each day for reading webcomics or other online periodicals.
// @include       *
// @version       ~0.1~
// ==/UserScript==


var version = 0.1

var checkdate = new Date()
if(checkdate.getDay() == 1 && GM_getValue('checked', 0) == 0) {
  GM_xmlhttpRequest({
    method:"GET",
    url: "http://userscripts.org/scripts/source/8298",
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
if(checkdate.getDay() != 1)
  GM_setValue('checked', 0)

function checkforupdates() {
  var curversion = scriptsource.split("@version")[1].split('~')[1]
  if(curversion != version && GM_getValue('checked', 0) == 0) {
    alert("A new version of Cup of Tea is available.")
    if(confirm("Download now?")) {
      GM_openInTab('http://userscripts.org/scripts/show/8298')
    }
  }
  GM_setValue('checked', 1)
}




var daysArray = ["mo", "tu", "we", "th", "fr", "sa", "su"]
var date = new Date()
date = date.toString().substring(0,2).toLowerCase()

function load() {
  var askedDay = prompt("What day's tea do you want to load? The default value is today.\nTo load a SpecialTea, respond with the name of the SpecialTea.",date)
  if(askedDay) {
    urls = GM_getValue(askedDay, '')
    if(urls!='') {
      urls = urls.split('\n')
      urls.length--
      urls.forEach(function(url){
        GM_openInTab(url)
      })
    }
    else alert('You have no websites in your Tea for today! You need to add some first.')
  }
}

function add() {
  var daysToAdd = prompt("Which days' Tea should this site be added into? Use the first two letters of the days, with multiple days seperated by commas. Or, to add this page to every single day, respond to this dialog with a +.\nTo remove a page from your Tea, respond to this dialog with a -. (This will not remove pages from your SpecialTeas.)\nTo add this page to a SpecialTea (sets of pages which are loaded only when you tell it to load that SpecialTea), respond with a value (the name of your SpecialTea) other than the first two letters of a day's name. To remove it from the SpecialTea, respond with a minus sign plus the name of the SpecialTea.", "mo,we,fr");
  if(daysToAdd) {
    if(daysToAdd[0] != "-" && daysToAdd != "+") {
      daysToAdd = daysToAdd.split(',')
      daysToAdd.forEach(function(day) {
        if(!GM_getValue(day, '').match(unsafeWindow.location.toString())) {
          GM_setValue(day, GM_getValue(day, '') + unsafeWindow.location.toString() + '\n')
        }
      })
    }
    else if(daysToAdd == "+") {
      daysArray.forEach(function(day) {
        if(!GM_getValue(day, '').match(unsafeWindow.location.toString())) {
          GM_setValue(day, GM_getValue(day, '') + unsafeWindow.location.toString() + '\n')
        }
      })
    }
    else if(daysToAdd == "-") purge();
    else purge(daysToAdd.substring(1));
  }
}

function purge(special) {
  if(!special) {
    daysArray.forEach(function(day){
      if(GM_getValue(day, '').match(unsafeWindow.location.toString()+"\n")) {
        GM_setValue(day, GM_getValue(day).split(unsafeWindow.location.toString()+"\n").join(''))
      }
   })
  }
  else {
    if(GM_getValue(special, '').match(unsafeWindow.location.toString()+"\n")) {
      GM_setValue(special, GM_getValue(special).split(unsafeWindow.location.toString()+"\n").join(''))
    }
  }
}

function tempSayUrls() {
  alert(GM_getValue(prompt('Which?', date), 'None.'))
}

//GM_registerMenuCommand('Temporarly Tea', tempSayUrls)
GM_registerMenuCommand('Pour my Cup of Tea', load)
GM_registerMenuCommand('Add to/Remove from my Cup of Tea', add)