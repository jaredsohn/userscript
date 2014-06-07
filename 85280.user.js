// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          Tweethance
// @namespace     http://www.userscripts.org/scripts/show/85280
// @description   Adds reply/retweet counts, links them to details page and unshorten URLs
// @include       http://twitter.com/*/status/*
// ==/UserScript==
//
// -------------------------------------- EDIT BELOW -------------------------------------
//

(function(){
  log = function(){
    if(window.console.log) window.console.log.apply(console,arguments);
  }

  function init(){
    var urlPrefix = "http://inagist.com/api/v1/get_url_details?url=";
    var statPrefix = "http://inagist.com/api/v1/handle_tweet_lookup?compressed=true&id="

    var urlArr = location.href.split("/");
    var id = urlArr[urlArr.length -1];
    var user = urlArr[urlArr.length -3];
log(id);

    var statNode = null;
    var metaStat = document.getElementById("status_"+id);
    var spans = metaStat.getElementsByTagName("span");
    for(var i=0,l=spans.length;i<l;i++){
      if(spans[i].className.match("shared-content")){
        statNode = spans[i];
log(statNode.innerHTML);
        break;
      }
    }
    if(statNode){
      ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function(){
        data = eval("("+ajax.responseText+")");
        statNode.innerHTML = "<a href='http://inagist.com/"+user+"/"+id+"' >"+data.mentions+" replies & "+data.retweets+" reweets</a>";
      };
      ajax.open('GET', statPrefix+id, true);
      ajax.send('');
    }
  };

  setTimeout(init,1000);
})();

{};
