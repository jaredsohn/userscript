// ==UserScript==
// @name           userscripts favourites
// @namespace      znerp
// @description    Allows users to store their favourite scripts on userscripts.org. Favourites can be viewed in a table.
// @include        http://userscripts.org/*
// ==/UserScript==

var favourites = eval(GM_getValue("favourites","({})"));
var total = 0;
var count = 0;
var updated = 0;
var event = 0;
var newComments = 0;
var months = ["znerp","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
for (i in favourites) if (favourites[i]) total++;
var plus  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMA/wDyAAA"+
            "SgmejAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAUUlEQVR4nKWQwQ3AMAgDzxXfdv852wHcXxKqIDWKX0iYAyzf"+
            "TKUTwA/AMbdkRcUY6wB0ZZcLkv3tCLWb+jpJnZVnomog2uObpEG/clKV+DLpBUudGg5KB2sQAAAAAElFTkSuQ"+
            "mCC";
var minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMA/wDyAAA"+
            "SgmejAAAAP0lEQVR4nGP8/4mBIGAirISBgQWLGB82RYyoov9xmfT/P7oUIyMj3LksyKIIw1D1sOCSwK6IUpOI"+
            "CidGqoU4AI3kFg5RMwfuAAAAAElFTkSuQmCC";
var script = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RV"+
             "h0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKwSURBVHjabJNJTBNRGID%2Fmc5MQYVWVNCGTbEtNZGDBj1ogolEMR5U"+
             "JA2LBmMoIokxERIj8ehJjx6MYIQoJgq4JIa6gEARkKJFTa2iFFtKWwp2oeDCzNQ%2B31DQCc5L%2FnmT%2FP%2F3749ACAFBECBx"+
             "iEPFFds0Ws399DRVhtX2udc97ig0PmgOLBkIbOwjAR8uMRRdvXF7pqv%2FNfrqnEAOlxsdLas6j3Wk2AEpCRcbKvLydrdu1WUr0l"+
             "XrITEhAZKUSkhQKvKwXiY2ppbDRzCcv29P%2FZZsDaSqUkCJYVJGwKMnHTDlmWgTZ%2FCvjkW4sKTScP1WC%2BoZsKAxpwv5gyEU"+
             "nAkj2xc70p88Y8Y2a8VBxT0gispOGa413UVDb23IMe6OwaEw%2BjTqQKMOF3pptqBSw7k74hLEPaDUOu0VmpFDV58ZCJIAkiDB5f"+
             "UBz0eApmjQqbOgrqa69HhVbZO4jKUfmiBJBctysHJFPPiDYbA7J4DjeJDLaWAYGVAyErIy0uDs6RPH9OXVtULWYgfEmN3emJK8Bl"+
             "YrEsHl8cEvloX4ODnEyRlgKGZhV1iOhcz0VNixM7dOCCp2EBkeMF3u6DaNqDasg1U4CzlFxxSRKMyz8xjmsPAQwNmRsc2jxGPkR0"+
             "esHp7n9RBFrYbyUi1DUzh1GujFG0UBQrNz8P7DR3j%2B9NklqTEK3VVkbNLkVNZc9AwNW5Hb60PT%2FgCamg6gEbsT3XvYjvIP6i"+
             "9gu2ShhOWb%2BBvLD13O9o3azWrVdy4K3wKhv5HfWW1Q39BY19nechPbzQrVwX9bhU%2BiIqnyQMF%2BmPvJQr%2FFCsHwDJgG30"+
             "ADhl8Y2wQ4jIUVkpdaZRnPcd6AfxomJ32AIhEwdvaC8XG7JLwwvmXPmVFn52Tu2lvQjN9Crn3M6bWY%2B6otr3oGpWCB%2FSPAAJ"+
             "aJRguGUxB0AAAAAElFTkSuQmCC";

function addFavourite() {
  if (document.getElementsByClassName("author")[0].innerHTML.match(/\/users\/(\d+)/))
    author = document.getElementsByClassName("author")[0].innerHTML.match(/\/users\/(\d+)/)[1];
  else 
    author = "unknown";
  var href = document.location.href.match(/\d+/)[0];
  favourites = eval(GM_getValue("favourites","({})"));
  favourites[href] = {author:author,href:href};
  GM_setValue("favourites", uneval(favourites));
  add(false);
}

function removeFavourite() {
  var href = document.location.href.match(/\d+/)[0];
  favourites = eval(GM_getValue("favourites","({})"))
  favourites[href] = null;
  GM_setValue("favourites", uneval(favourites));
  add(true);
}

function add(bool) {
  img.setAttribute("src", (bool?plus:minus));
  img.setAttribute("title", (bool? "Add to":"Remove from") + " favourites");
  img.setAttribute("style", "width:24px; height:24px; margin-left: 10px; cursor: pointer;");
  img.removeEventListener( 'click', (bool ? removeFavourite : addFavourite) , false);
  img.addEventListener( 'click', (bool ? addFavourite : removeFavourite) , false );
  img.style.cursor = "pointer";
  h1.appendChild(img);
}

function showFavourites() {
  document.title = document.title.substring(0,document.title.length - 18) + "'s favourite scripts - Userscripts.org";
  if (total > 0) {
    var content = document.getElementById("content");
    content.innerHTML = '<h4>Checked Scripts</h4><p class="subtitle"></p><table border="0" cellspacing="0"'+
                        'cellpadding="0" class="wide forums"><tr><th class="la" colspan="2">Script</th><th class="la"'+
                        'width="20%">Info</th></tr></table>';
    table = content.getElementsByTagName("table")[0];
    commentSpace = content.getElementsByTagName("p")[0].appendChild(document.createElement('span'));
    commentSpace.innerHTML = total+' script'+(total > 1 ? 's':'')+((count<total) ? (" (loaded "+count+"/"+total+")") : "");
    for (i in favourites) if (favourites[i]) {
      if (favourites[i].author) {
        getBollocks(i);
      } else {
        GM_xmlhttpRequest({
          method: 'get',
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded'
          },
          url: "http://userscripts.org/scripts/show/" + i,
          onload: function (i) {return function(result) {
            res=result.responseText;
            favourites[i].author = parseInt(res.slice(res.indexOf('/users/', res.indexOf('<div class="author">'))+7,
                                   res.indexOf(';scripts', res.indexOf('<div class="author">'))));
            GM_setValue('favourites', uneval(favourites));
            getBollocks(i);
          }}(i)//onload
        });//GM_xmlhttpRequest
      }
    }
  } else {
    var content = document.getElementById("content");
    content.innerHTML = '<h4>Checked Scripts</h4><p class="subtitle">No favourite scripts yet</p>'
  }
}

function getBollocks(i) {
  if (favourites[i].author == "unknown") {
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://userscripts.org/scripts/show/" + favourites[i].href + "?page=2",
      onload: function (i) {return function(result) {
        res = result.responseText;
        h1 = res.slice(res.indexOf("<h1 class=\"title\">")+18,res.indexOf("</h1>",
             res.indexOf("<h1 class=\"title\">")));
        desc = res.slice(res.indexOf("<p>",res.indexOf('<div id="content">'))+3,res.indexOf("</p>",
               res.indexOf('<div id="content">')));
        comments = res.slice(res.indexOf("<a href=\"#about-comments\">"),
                             res.indexOf("</a>", res.indexOf("<a href=\"#about-comments\">"))).match(/\d+/)[0];
        installs = res.slice(res.indexOf("<span class=\"install-count\">"),
                             res.indexOf("</span>", res.indexOf("<span class=\"install-count\">"))).match(/\d+/)[0];
        favourites = eval(GM_getValue("favourites","({})"))
        date = res.slice(res.indexOf("<div class=\"date\">")+18,
                         res.indexOf("</div>", res.indexOf("<div class=\"date\">")));
        var oldDate = ((favourites[i].date) ? favourites[i].date : date);
        favourites[i].date = date;
        var thisUpdated = !(date == oldDate);
        updated += thisUpdated;
        var oldComments = ((favourites[i].comments) ? favourites[i].comments : comments);
        favourites[i].comments = comments;
        GM_setValue("favourites", uneval(favourites));
        var thisComments = comments - oldComments;
        newComments += thisComments;
        count++;
        commentSpace.innerHTML = total + " scripts" + ((count<total) ? (" (loaded "+count+"/"+total+")") : "") +
                                 ((newComments != 0) ? " / <font color=green>"+newComments+"</font> new comment"+
                                 ((newComments == 1) ? '':'s') : "") + ((updated > 0) ? " / <font color=green>"+
                                 updated+"</font> updated script"+((updated == 1) ? '':'s') : "");
        (tr = table.appendChild(document.createElement('tr'))).innerHTML = '<td class="script-install">'+
              '<a href="/scripts/source/'+i+'.user.js"><img alt="Install script"'+
              'src="'+script+'" title="Install script" /></a>'+
              '<img title="Remove from favourites" src = '+minus+' style="margin-top: 13px; cursor: pointer;"></td>'+
              '<td class="script-meat"><a href="/scripts/show/'+i+'" class="title">'+h1+'</a><p class="desc">'+desc+
              '</p></td><td class="inv lp"><p>'+comments+' comment'+((comments == 1) ? ' ' : 's ')+((thisComments > 0)
              ? '( <font color=green>'+((thisComments > 0) ? '+' : '')+thisComments+'</font> )' : '') +'</p><p>'+
              (installs+"").replace(/(\d)(?=(\d{3})+\b)/g,'$1,')+' install'+((installs == 1) ? '' : 's')+'</p><p>'+
              '<abbr class="updated" title = "'+date+'">'+date+'</abbr>'+((thisUpdated) ? 
              ' (<font color=green>Updated!</font>)' : '') +'</p></td>';
        tr.getElementsByTagName("img")[1].addEventListener(
          'click',
          function(tr) { return function() {
            favourites = eval(GM_getValue("favourites","({})"))
            favourites[i] = null;
            GM_setValue("favourites", uneval(favourites));
            table.removeChild(tr);
            newComments -= thisComments;
            updated -= thisUpdated;
            commentSpace.innerHTML = --total + " scripts" + ((newComments != 0) ? " / <font color=green>"+newComments+
                                     "</font> new comment"+((newComments == 1) ? '':'s') : "") + ((updated > 0) ?
                                     " / <font color=green>"+updated+"</font> updated script"+((updated == 1) ? '':'s')
                                     : "");
          }}(tr),
          true );
      }}(i)//onload
    });//GM_xmlhttpRequest
  } else {
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://userscripts.org/users/" + favourites[i].author + "/scripts.xml",
      onload: function (i) {return function(result) {
        xmlString = result.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlString, "application/xml");
        var scripts = xmlDoc.getElementsByTagName('script');
          for (j = scripts.length - 1; j >= 0; j--) {
            if (parseInt(scripts[j].getElementsByTagName('id')[0].textContent) == i) {
              h1 = scripts[j].getElementsByTagName('name')[0].textContent;
              desc = scripts[j].getElementsByTagName('summary')[0].textContent;
              comments = scripts[j].getElementsByTagName('posts-count')[0].textContent;
              installs = scripts[j].getElementsByTagName('views')[0].textContent;
              favourites = eval(GM_getValue("favourites","({})"))
              date = scripts[j].getElementsByTagName('script-updated-at')[0].textContent;
              var oldDate = ((favourites[i].date) ? favourites[i].date : date);
              favourites[i].date = date;
              var thisUpdated = !(date == oldDate);
              updated += thisUpdated;
              var parts = date.replace(/[T:Z]/g, "-").split("-");
              var dateString = months[parseInt(parts[1].replace(/^0/, ""))] + " " + parts[2] + ", " + parts[0];
              var oldComments = ((favourites[i].comments) ? favourites[i].comments : comments);
              favourites[i].comments = comments;
              GM_setValue("favourites", uneval(favourites));
              var thisComments = comments - oldComments;
              newComments += thisComments;
              count++;
              commentSpace.innerHTML = total + " scripts" + ((count<total) ? (" (loaded "+count+"/"+total+")") : "") +
                                       ((newComments != 0) ? " / <font color=green>"+newComments+"</font> new comment"+
                                       ((newComments == 1) ? '':'s') : "") + ((updated > 0) ? " / <font color=green>"+
                                       updated+"</font> updated script"+((updated == 1) ? '':'s') : "");
              (tr = table.appendChild(document.createElement('tr'))).innerHTML = '<td class="script-install">'+
                    '<a href="/scripts/source/'+i+'.user.js"><img alt="Install script"'+
                    'src="'+script+'" title="Install script" /></a>'+
                    '<img title="Remove from favourites" src = '+minus+' style="margin-top: 13px; cursor: pointer;"></td>'+
                    '<td class="script-meat"><a href="/scripts/show/'+i+'" class="title">'+h1+'</a><p class="desc">'+
                    desc+'</p></td><td class="inv lp"><p>'+comments+' comment'+((comments == 1) ? ' ' : 's ')+((thisComments != 0) ?
                    '( <font color=green>'+((thisComments > 0) ? '+' : '')+thisComments+'</font> )' : '') +'</p><p>'+
                    (installs+"").replace(/(\d)(?=(\d{3})+\b)/g,'$1,')+' install'+((installs == 1) ? '' : 's')+'</p><p>'+
                    '<abbr class="updated" title = '+date+'>'+dateString+'</abbr>'+((thisUpdated) ? 
                    ' (<font color=green>Updated!</font>)' : '') +'</p></td>';
              tr.getElementsByTagName("img")[1].addEventListener(
                'click',
                function(tr) { return function() {
                  favourites = eval(GM_getValue("favourites","({})"))
                  favourites[i] = null;
                  GM_setValue("favourites", uneval(favourites));
                  table.removeChild(tr);
                  newComments -= thisComments;
                  updated -= thisUpdated;
                  commentSpace.innerHTML = --total + " scripts" + ((newComments != 0) ? " / <font color=green>"+
                                           newComments+"</font> new comment"+((newComments == 1) ? '':'s') : "") + 
                                           ((updated > 0) ? " / <font color=green>"+updated+"</font> updated script"+
                                           ((updated == 1) ? '':'s') : "");
                }}(tr),
                true );
            }//if
          }//for
        }}(i)//onload
    });//GM_xmlhttpRequest
  }//if
}

if (document.getElementById("user")){
  if (document.location.href.match("userscripts.org/scripts/show")) {
    var href = document.location.href.match(/\d+/)[0];
    var h1 = document.getElementById("details").getElementsByTagName("h1")[0];
    var img = document.createElement("img");
    add(!favourites[href]);
  } else if ((document.location.href.match("userscripts.org/users/")) &&
             (document.getElementById("homeMenu").getElementsByTagName("li")[5].getElementsByTagName("a")[0].href == document.location.href)) {
    content = document.evaluate ("//div[@id='content']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    var div = document.createElement("div");
    div.innerHTML = "<h4>Checked Scripts</h4><p class='subtitle'>"+total+" script"+((total==1) ? '' : 's')+
                    " ( <a href=#favourites>view all</a> )</p>";
    div.getElementsByTagName('a')[0].addEventListener('click', showFavourites, true);
    content.appendChild(div);
  } else if (document.location.href.match("#favourites") ) {
    showFavourites();
  } else if (/^http:\/\/userscripts\.org\/scripts(\?page=.*)?$/.test(document.location.href) ||
             document.location.href == "http://userscripts.org/") {
    document.getElementsByTagName("ul")[1].appendChild(document.createElement("li")).innerHTML = '<a href='+
                                                                 '"/users/me#favourites">Your checked scripts</a>';
  }
}