// ==UserScript==
// @name           FYAD FLAG FUN PAK
// @namespace      poo
// @description    work around not being able to use the back button for flags
// @include        http://forums.somethingawful.com/*
// ==/UserScript==
// license: public domain, and also wtfpl and mit if you want it under either of those instead
// version two! with titles and a clear button

function getFlag() {
  var flagcontainer = document.getElementById("flag_container");
  if (!flagcontainer) {
      // gbs
      return;
  }
  if (flagcontainer.children.length == 0) {
    // wait for it to load
    setTimeout(getFlag, 1000);
    return;
  }
  var flag = flagcontainer.children[0];
  if (flag.style.display == "none") {
    setTimeout(getFlag, 1000);
    return;
  }
  var loc = "stupid fyad flag shit";
  var oldflags;
  if (!window.localStorage.getItem(loc)) {
    oldflags = [];
  } else {
    oldflags = window.localStorage.getItem(loc).split('|||');
  }
  var maxLen = 20;
  while (oldflags.length >= maxLen) {
    oldflags.shift();
  }
  oldflags.push(flag.src + "////" + flag.title);
  window.localStorage.setItem(loc, oldflags.join('|||'));

  // this can't possibly be the right way to do this
  // i'm pretty sure there's a greasemonkey bug or something because doing it
  // the right way works fine in chrome
  // but it's impossible to debug greasemonkey because anything you call from
  // setTimeout doesn't give you a stacktrace or anything beyond a line number
  // basically it seems to be impossible to change an existing onclick, but you
  // can still change innerhtml.
  // fuck.
  var wtf = 'var ass = document.createElement("div"); ass.setAttribute("id", "whatisthisgarbage");';
  wtf += 'document.getElementsByClassName("breadcrumbs")[0].appendChild(ass);';
  wtf +=  'var x = window.localStorage.getItem("' + loc + '").split("|||"); x.reverse();';
  wtf +=  'for (var i = 0; i < x.length; i++) {';
  wtf +=     'var fuck = document.createElement("img"); fuck.setAttribute("src", x[i].split("////")[0]);';
  wtf +=     'if (x[i].split("////").length > 0 && x[i].split("////")[1]) fuck.setAttribute("title", x[i].split("////")[1]);';
  wtf +=     'document.getElementById("whatisthisgarbage").appendChild(fuck); ';
  wtf +=  '}';
  wtf +=  'var clearer = document.createElement("a");';
  wtf +=  'clearer.innerHTML = "<span><u>clear</u></span>";'; // <u> rules
  wtf +=  'clearer.setAttribute("onclick", "document.getElementsByClassName(\\"breadcrumbs\\")[0].removeChild(document.getElementById(\\"whatisthisgarbage\\"))");';
  wtf += 'document.getElementById("whatisthisgarbage").appendChild(clearer);';
  flagcontainer.innerHTML = "<a href='#' onclick='" + wtf + "' id='flagshit'>" + flagcontainer.innerHTML + "</a>";
}

getFlag();
