// ==UserScript==
// @name           TF2TP Autobump
// @namespace      Bloop
// @include        *tf2tp.com/myTrades*
// @require	   http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "var j=jQuery.noConflict();(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


function main() {
  function rel(){
	window.location.reload();
}
   j('.bumpAjaxLink').live('click',function(){
    var aEl = j(this);
    var input = j.parseJSON(aEl.attr('href').slice(1));
    var postData = {
      trade : input.tradeId
    };
    function callback(data){
      if(!handleAjaxResponseSysnotes(data)){
        return false;
      }
      aEl.remove();
      return true;
    }
    j.post('ajax/bumpTrade.php', postData, callback, 'json');
    return false;
  });
  
  j('.bumpAjaxLink').first().click();
  setTimeout(rel,1800000);
}

unsafeWindow.alert = function alert(message) {
	
		console.log(message);
	
}

addJQuery(main);