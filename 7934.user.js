// ==UserScript==
// @name           Digg Nested Comments
// @namespace      http://pile0nades.wordpress.com/
// @description    Allows multi-level threaded comments on Digg, and quoting of comments.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==


// insert reply links in comments that don't have them
var tlcrl = get("//div[@class='comment']/ol/li/div[@class='c-body']/div[@class='c-body-inside']/div[@class='c-line']");
for(var i = 0; i < tlcrl.length; i++) {
  var link = tlcrl[i];
  var sc = get("//li[@id='c" + link.parentNode.id.slice(13) + "']/ol/li/div[@class='c-body']/div[@class='c-body-inside']");
  for(var j = 0; j < sc.length; j++) {
    sc[j].appendChild(link.cloneNode(true));
  }
}




// hack the reply links to work right
var reply = get("//div[@class='comment']//a[@class='c-reply']");
for(var i = 0; i < reply.length; i++) {
  var cid = reply[i].parentNode.parentNode.id.slice(13);
  var name = document.getElementById("c" + cid).firstChild.childNodes[2].firstChild.firstChild.nodeValue;
  reply[i].setAttribute("onclick", reply[i].getAttribute("onclick").replace(/, '\w+'\)/i, ", '" + name + "')"));
  var qlink = reply[i].cloneNode(true);
  var textbox = document.getElementById("comment");
  
  // add the [reply] link
  reply[i].addEventListener("click", function(event) {
    var cid = this.parentNode.parentNode.id.slice(13);
    var name = document.getElementById("c" + cid).firstChild.childNodes[2].firstChild.firstChild.nodeValue;
    textbox.value += "@" + name + " (#" + cid + ")\n";
    
    event.preventDefault();
  }, false);
  
  // add a [quote] link after the [reply] link
  qlink.className = 'c-quote';
  qlink.innerHTML = '[quote]';
  qlink.addEventListener("click", function(event) {
    var cid = this.parentNode.parentNode.id.slice(13);
    var name = document.getElementById("c" + cid).firstChild.childNodes[2].firstChild.firstChild.nodeValue;
    
    var quote = this.parentNode.parentNode.innerHTML
    .replace(/<a.*?>((?:\n|\r|.)*?)<\/a>/gi, "$1")
    .replace(/(<br.*?>|\n?<div.*?>((?:\n|\r|.)*?)<\/div>|\s+$)/gi, "")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<");
    textbox.value += "@" + name + " (#" + cid + ") said: \"" + quote + "\"\n";
    
    event.preventDefault();
  }, false);
  
  reply[i].parentNode.appendChild(document.createTextNode(' - '));
  reply[i].parentNode.appendChild(qlink);

}



// linkify comment links
// modified version of the Linkify script
var comments = get("//div[@class='c-body-inside']/text()");
var urlRegex = /@\w+ \(#\d+\)/gi;

for(var cand = null, i = 0; cand = comments[i]; i++) {
  if(urlRegex.test(cand.nodeValue)) {
    var parent = cand.parentNode;
    var source = cand.nodeValue;
    urlRegex.lastIndex = 0;
    
    for(var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
      var text   = match[0].split(" ");
      var number = text[1].slice(2, -1);
      var name   = text[0].slice(1);
      var parentPost = document.getElementById("c" + number);
      if(!parentPost || parentPost.firstChild.childNodes[2].firstChild.firstChild.nodeValue != name) continue;
      
      parent.insertBefore(document.createTextNode(source.substring(lastLastIndex, match.index)), cand);
      
      var a = document.createElement("a");
      a.setAttribute("href", "#c" + number);
      a.setAttribute("class", "gm-comment-reply-link");
      a.appendChild(document.createTextNode("@" + name));
      parent.insertBefore(a, cand);
      
      lastLastIndex = urlRegex.lastIndex;
    }
    
    parent.insertBefore(document.createTextNode(source.substring(lastLastIndex)), cand);
    parent.removeChild(cand);
    parent.normalize();
  }
}




// now nest the comments
var nesting = get("//div[@class='c-body-inside']/a[@class='gm-comment-reply-link'][1]");
for(var i = 0; i < nesting.length; i++) {
  var reply = nesting[i].parentNode.parentNode.parentNode;
  var parent = document.getElementById(nesting[i].href.split("#")[1]);
  
  if(reply == parent || reply.parentNode.parentNode == parent) continue;
  
  for(var j = 0, ol = false; j < parent.childNodes.length; j++) {
    if(parent.childNodes[j].tagName && parent.childNodes[j].tagName.toLowerCase() == "ol") {
      ol = parent.childNodes[j];
      break;
    }
  }
  if(!ol) ol = parent.appendChild(document.createElement("ol"));
  
  for(var j = 0, inserted = false; j < ol.childNodes.length; j++) {
    if(ol.childNodes[j].id && ol.childNodes[j].id > reply.id) {
      ol.insertBefore(reply, ol.childNodes[j]);
      inserted = true;
      break;
    }
  }
  if(!inserted) ol.appendChild(reply);
}



// xpath function
function get(query) {
  var result = document.evaluate(query, document, null, 7, null);
  for(var i = 0, a = []; i < result.snapshotLength; i++) {
    a.push(result.snapshotItem(i));
  }
  return a;
}