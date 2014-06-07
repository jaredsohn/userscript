// ==UserScript==
// @name           JIRA Recent Issues List
// @namespace      http://www.twitter.com/klagace
// @description    Creates a drop down list of recently visited issues beside the quick search form.
// @include        http://jira.*/*
// ==/UserScript==

function createCookie() {
  var x = readCookie('jiraRecentItems');
  if(null == x){
    x = "";
  }
  var dl = document.location + "";
  if(dl.indexOf('?') != -1)
    dl = dl.substring(0,dl.indexOf('?'));
  if(dl.indexOf('/browse/') != -1 && x.indexOf(dl) == -1)
    document.cookie = 'jiraRecentItems=' + dl + '|' +trimList(x,8) + '; expires=01-Jan-2099 02:00:00 UTC; path=/';
}

function trimList(x,max){
  var items = x.split('|');
  if(items.length < max)
    return x;
  newitems = "";
  for(i = 0;i<max;i++){
    newitems += items[i] + "|";
  }
  return newitems;
}


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function createRecentItemsList(){
  var x = readCookie('jiraRecentItems');
  if (x) {
    opts = x.split('|');
    var templateSelect = document.createElement('div');
    var inrhtml = '<select onchange="window.location=this.value" style="float:right">';
        inrhtml = inrhtml + '<option value="'+document.location+'">Recent Issues</option>';
      for(i = 0; i < opts.length; i++){
        inrhtml = inrhtml + '<option value="'+opts[i]+'">'+opts[i].substring(opts[i].lastIndexOf('/'))+'</option>';
      }
    inrhtml = inrhtml + '</select>';
    templateSelect.innerHTML = inrhtml;
    var c = document.getElementsByTagName('form');
    for(k=0;k<c.length;k++){
      if(c[k].name == "quicksearch"){
        c[k].parentNode.insertBefore(templateSelect,c[k]);
      }
    }
  }
}

function embedFunction(s) 

{document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');}

embedFunction(createCookie);
embedFunction(trimList);
embedFunction(readCookie);
embedFunction(createRecentItemsList);

createCookie();
createRecentItemsList();