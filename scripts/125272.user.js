// ==UserScript==
// @name	  Jinni Torrent Test
// @namespace	  http://userscripts.org/scripts/show/125272
// @version       0.1
// @description	  Adds Torrent Search links on watch page
// @author        Adam B (http://userscripts.org/users/AdamB)
// @license       GNU GENERAL PUBLIC LICENSE
// @match	  http://www.jinni.com/movies/*/watch-it/
// @include	  http://www.jinni.com/movies/*/watch-it/
// ==/UserScript==


//options: func, shouldExecute, shouldWaitForJQuery, shouldLoadJQuery, jQueryWaitCallBackFuncName
function loadFunction(options) {  
  function loadScript(func, exec){
    var script = document.createElement("script");
    script.textContent = exec ? "(" + func.toString() + ")();" : func.toString();
    document.body.appendChild(script); 
  }
  
  if(options.shouldLoadJQuery){
    var jqScript = document.createElement("script");
    jqScript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js");
    jqScript.addEventListener("load", function() {
      loadScript(options.func, true);
    }, false);
    document.body.appendChild(jqScript);
  }
  else if(options.shouldWaitForJQuery){
    var waitForJquery = 
      "function waitForJquery(){ if(!$) window.setTimeout(waitForJquery, 100); else " + options.jQueryWaitCallBackFuncName + "(); }";    
    loadScript(options.func, false);
    loadScript(waitForJquery, true);
  }
  else{
    loadScript(options.func, options.shouldExecute);
  }
}

function main() {  
  
  watchFreeDiv = $("div.watchItList.watchFree");
  if(watchFreeDiv.length == 0){
    watchFreeDivHtml = 
      "<div class=\"watchItList watchFree\">" +
      " <h2 class=\"contentOverview\"> " +
      "   <span class=\"watchItListTitleIcon\"><img src=\"http://media.jinni.com/images/16_online_green.png\" alt=\"Watch Free\" /></span>" +
      " 		Watch Free" +
      " </h2> " +
      " <ul></ul>" +
      "</div>";
    var rentsDiv = $("div.watchItList.rents");
    if(rentsDiv.length > 0){
      rentsDiv.before(watchFreeDivHtml);
    }
    else{
      $("div#left").append(watchFreeDivHtml);
    }
  }
  
  var watchFreeUL = $("div.watchItList.watchFree ul:first"); 
  
  var titleRaw = $("h1#contentTitle_heading span:first").html();
  var titleClean = titleRaw.replace(/&\w+;|[^a-zA-Z\-\d\s]/g, "").replace(/\s+/g, " ");
  var titleDash = titleClean.replace(/\s/g, "-").toLowerCase();
  var titleUnderScore = titleClean.replace(/\s/g, "_").toLowerCase();
  var titlePlus = titleClean.replace(/\s/g, "+").toLowerCase();
  var year = $("h1#contentTitle_heading span:last").html().substring(2);
  var yearInt = parseInt(year);
 
 // the only device
  watchFreeUL.append(
    createMovieSiteItem("Find Torrent", 
      "http://torrent-finder.info/show.php?q=" + titlePlus + " " + year,
      "http://img408.imageshack.us/img408/4933/theonlydevicelogo.jpg",
      null
  ));

  function createMovieSiteItem(siteName, searchPath, logoPath, moviePath, searchPostCallBack){  
    var movieLink = "";
    if(moviePath != null){
      movieLink = 
        " <a href=\"" + moviePath + "\"" +
        "   style=\"background: url('http://img839.imageshack.us/img839/3558/16moviegreen.jpg') no-repeat 0 0; margin-left: 5px\"" +
        "   target=\"_blank\" title = \"I am feeling lucky\">" +
        "     <span style=\"display:block; width: 16px; height: 16px;\">" +
        "     </span>" +
        " </a>";
    }
    
    onClick = "";
    if(searchPostCallBack != undefined) {
      searchPath = "#";
      onClick = "onClick=\"" + searchPostCallBack + "; return false;\"";
      //onClick = "onClick=\" alert('clicked!'); return false;\"";
    }
    
    var li = 
      "<li>" +
      " <a href=\"" + searchPath + "\" " + onClick + 
      "   style=\"background: url('" + logoPath + "') no-repeat 0 0\"" +
      "   target=\"_blank\" class=\"indentedWatchItem jinniLink\">" +
      "     <span style=\"display:block; text-indent: 35px; height: 30px;\">" +
              siteName +
      "     </span>" +
      " </a>" +
        movieLink +
      "</li>";
      
      return li;
  } 
}

function postToUrl(url, params){
  var form = $('<form>').attr({"action": url, "method": "POST"});
  
  var addParam = function(paramName, paramValue){
      $('<input type="hidden">').attr({ "id": paramName, "name": paramName, "value": paramValue }).appendTo(form);        
  };
  
  for(var key in params){
      addParam(key, params[key]);
  }
      
  form.appendTo(document.body).submit().remove();   
}

loadFunction({func: main, shouldLoadJQuery: true});
loadFunction({func: postToUrl});