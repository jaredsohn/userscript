// ==UserScript==
// @name	  Jinni Movies Watch Free Plus
// @namespace	  https://sites.google.com/site/yaadtek/
// @version       1.0.4
// @description	  Adds additional links to jinnie.com to watch movies for free
// @author        Dannie F (http://userscripts.org/users/dannief)
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
 
  // solar movie  
  watchFreeUL.append(
    createMovieSiteItem("Solar Movie", 
      "http://www.solarmovie.com/movie/search/?query=" + titlePlus + "+" + year,
      "http://img339.imageshack.us/img339/4447/solarmovielogo.jpg",
      "http://www.solarmovie.com/watch-" + titleDash + "-" + year + ".html"
  ));
  
  // watche movie on  
  watchFreeUL.append(
    createMovieSiteItem("Watch Movie On", 
      "http://www.watchmovieon.com/movies/search?query=" + titlePlus,
      "http://img691.imageshack.us/img691/9338/watchmoviesonlogo.jpg",
      "http://www.watchmovieon.com/movies/" + titleDash
  ));
  
  //movies datacenter  
  watchFreeUL.append(
    createMovieSiteItem("Movies DataCenter", 
      "http://www.moviesdatacenter.com/find/within-movies/" + titlePlus + "+" + year + ".html",
      "http://img101.imageshack.us/img101/9058/moviesdatacenterlogo.jpg",
      "http://www.moviesdatacenter.com/Movies/" + titleDash + "-" + year + ".html"
  ));
  
  // project free tV
  var moviePath = yearInt <= 2003 ? 
    "2003%20and%20earlier/" + titleUnderScore + "_(" + year + ")" :
    year + "/" + titleUnderScore;  
  watchFreeUL.append(
    createMovieSiteItem("Project Free TV", 
      "http://www.free-tv-video-online.me/movies/search.php?md=movies&sa=Search&q=" + titlePlus,
      "http://img155.imageshack.us/img155/2539/projectfreetvlogo.jpg",
      "http://www.free-tv-video-online.me/movies/" + moviePath + ".html"
  ));
  
  // watch movies online
  watchFreeUL.append(
    createMovieSiteItem("Watch Movies Online", 
      null,
      "http://img683.imageshack.us/img683/4562/zmovielogo.jpg",
      "http://www1.zmovie.tv/movies/view/" + titleDash, 
      "postToUrl('http://www1.zmovie.tv/search', {'text': '" + titleClean + "', 't1': 'title'})"
  ));
  
  // movielab.tv  
  watchFreeUL.append(
    createMovieSiteItem("MovieLab.tv", 
      "http://movielab.tv/movies/" + titleUnderScore + "/movie/",
      "http://img6.imageshack.us/img6/8240/movielablogo2.jpg",
      null
  ));
  
  // screen jacker  
  watchFreeUL.append(
    createMovieSiteItem("Screen Jacker", 
      "http://www.screenjacker.com/search/movies/" + titlePlus + "+" + year + ".html",
      "http://img810.imageshack.us/img810/8421/screenjackerlogo.jpg",
      null
  ));
  
  // the only device
  watchFreeUL.append(
    createMovieSiteItem("The Only Device", 
      "http://www.theonlydevice.com/?x=0&y=0&s=" + titlePlus,
      "http://img408.imageshack.us/img408/4933/theonlydevicelogo.jpg",
      null
  ));
  
  // alluc.org
  watchFreeUL.append(
    createMovieSiteItem("Alluc.org", 
      null,
      "http://img535.imageshack.us/img535/7416/alluclogo.jpg",
      null, 
      "postToUrl('http://www.alluc.org/search.html', {'sword': '" + titleClean + "', 'mode': 'search'})"
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
