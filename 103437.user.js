// ==UserScript==
// @name	        IMDB Watch Now Plus
// @namespace	    https://sites.google.com/site/yaadtek/
// @version       1.0.1
// @description	  Adds additional links imdb.com to watch movies for free
// @author        Dannie F (http://userscripts.org/users/dannief)
// @license       GNU GENERAL PUBLIC LICENSE
// @match	        http://www.imdb.com/title/*/
// @match         http://www.imdb.com/title/*/episodes*
// @include	      http://www.imdb.com/title/*/
// @include       http://www.imdb.com/title/*/episodes*
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
    jqScript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
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
  var debug = false;
    
  // movie sites
  var watchNowMovieSites = [
    // solar movie
    {
      siteName: "Solar Movie", 
      searchPath: "http://www.solarmovie.com/movie/search/?query={TITLE_PLUS}+{YEAR}", 
      logoPath: "http://www.solarmovie.com/favicon.ico"       
    },
    
    // watches movie on
    {
      siteName: "Watch Movie On", 
      searchPath: "http://www.watchmovieon.com/movies/search?query={TITLE_PLUS}", 
      logoPath: "http://img691.imageshack.us/img691/9338/watchmoviesonlogo.jpg"      
    },
    
    //movies datacenter
    {
      siteName: "Movies DataCenter", 
      searchPath: "http://www.moviesdatacenter.com/find/within-movies/{TITLE_PLUS}+{YEAR}.html", 
      logoPath: "http://file.moviesdatacenter.com/3/shortcut.ico"      
    },
    
    // project free tv
    {
      siteName: "Project Free TV", 
      searchPath: "http://www.free-tv-video-online.me/movies/search.php?md=movies&sa=Search&q={TITLE_PLUS}", 
      logoPath: "http://www.free-tv-video-online.me/favicon.ico"      
    },
    
    // watch movies online
    {
      siteName: "Watch Movies Online", 
      searchPath: "http://www1.zmovie.tv/search", 
      logoPath: "http://www1.zmovie.tv/favicon.ico",
      searchParams: {text: "{TITLE_CLEAN}" , t1: "title"}
    },
    
     // movielab.tv  
    {
      siteName: "MovieLab.tv", 
      searchPath: "http://movielab.tv/movies/{TITLE_UNDERSCORE}/movie/", 
      logoPath: "http://movielab.tv/favicon.ico"      
    },
    
    // screen jacker  
    {
      siteName: "Screen Jacker", 
      searchPath: "http://www.screenjacker.com/search/movies/{TITLE_PLUS}+{YEAR}.html",
      logoPath: "http://www.screenjacker.com/favicon.ico"      
    },
    
    // the only device      
    {
      siteName: "The Only Device", 
      searchPath: "http://www.theonlydevice.com/?x=0&y=0&s={TITLE_PLUS}",
      logoPath: "http://www.theonlydevice.com/favicon.ico"      
    },
    
     // alluc.org      
    // {
      // siteName: "Alluc.org", 
      // searchPath: "http://www.alluc.org/search.html", 
      // logoPath: "http://alluc.org/favicon.ico",
      // searchParams: {sword: "{TITLE_CLEAN}" , mode: "search"}
    // }  
  ];
  
  // tv show sites
  var watchNowTvShowSites = [
    // hulu
    {
      siteName: "Hulu",
      directPath: "http://www.hulu.com/{TITLE_DASH}",
      searchPath: "http://www.hulu.com/search?query={TITLE_PLUS}&st=0&fs=",
      logoPath: "http://www.hulu.com/favicon.ico"
    },
  
    // project free tV
    {
      siteName: "Project Free TV", 
      searchPath: "http://www.free-tv-video-online.me/movies/search.php?q={TITLE_PLUS}&md=shows&sa=Search", 
      logoPath: "http://www.free-tv-video-online.me/favicon.ico",
      directPath: "http://www.free-tv-video-online.me/internet/{TITLE_UNDERSCORE}/"
    },
    
    // sidereel
    {
      siteName: "Sidereel",
      searchPath: "http://www.sidereel.com/_television/search?q={TITLE_PLUS}&commit=submit",
      directPath: "http://www.sidereel.com/{TITLE_UNDERSCORE}",
      logoPath: "http://img32.imageshack.us/img32/5429/sidereelcom.png"
    },
    
    // free online episodes
    {
      siteName: "Free Online Episodes",      
      directPath: "http://www.freeonlineepisodes.net/category/{TITLE_DASH}/",
      logoPath: "http://www.google.com/s2/favicons"
    },
    
    // watch series online
    {
      siteName: "Watch Series Online",
      searchPath: "http://www.watchseriesonlinehere.com/?s={TITLE_PLUS}&x=42&y=15",
      logoPath: "http://www.watchseriesonlinehere.com/wp-content/plugins/favicons/icons/1267473284_078.ico"
    },
    
    // mega episodes
    {
      siteName: "MegaEpisodes",
      directPath: "http://megaepisodes.com/{TITLE_DASH}",
      logoPath: "http://megaepisodes.com/favicon.ico",
      searchPath: "http://megaepisodes.com/index.php",
      searchParams: {query: "{TITLE_CLEAN}" , menu: "search"}
    },
    
    // surf the channel
    {
      siteName: "Surf the Channel",
      searchPath: "http://www.surfthechannel.com/cat/61406.html",
      logoPath: "http://www.surfthechannel.com/favicon.ico"
    },
    
    // videostic
    {
      siteName: "Videostic",
      searchPath: "http://videostic.com/TvShows/index.php",
      logoPath: "http://www.google.com/s2/favicons"
    }
  ];
  
  var downloadNowMovieSites = [
    // torrentz.eu
    {
      siteName: "Torrentz.eu",
      searchPath: "http://torrentz.eu/search?f={TITLE_PLUS}",
      logoPath: "http://torrentz.eu/img/accept.png"
    },
    
    // filetube
    {
      siteName: "Filetube",
      searchPath: "http://www.filestube.com/search.html?q={TITLE_PLUS}&select=All",
      logoPath: " http://static.filestube.com/files/images/favicon.ico"
    },
    
    // epic moviez
    {
      siteName: "Epic Moviez",
      searchPath: "http://epicmoviez.com/?s={TITLE_PLUS}",
      logoPath: "http://epicmoviez.com/favicon.ico"
    }
  ];
  
  var watchTrailerMovieSites = [    
       
    // youtube
    {
      siteName: "Youtube (Search)",
      searchPath: "http://www.youtube.com/results?search_query={TITLE_PLUS}&aq=f",
      logoPath: "http://www.youtube.com/favicon.ico"
    },
    
    // // youtube
    // {
      // siteName: "Youtube Trailers",
      // directPath: "http://www.youtube.com/trailers/{TITLE_CLEAN}",
      // logoPath: "http://www.youtube.com/favicon.ico"
    // },
    
    // trailer addict
    {
      siteName: "Trailer Addict (Search)",
      directPath: "http://www.traileraddict.com/search.php?domains=www.traileraddict.com&sitesearch=www.traileraddict.com&q={TITLE_PLUS}&client=003813540160704722719%3A8i8_gdk_9vk&forid=1&channel=4779144239&ie=ISO-8859-1&oe=ISO-8859-1&safe=active&cof=GALT%3A%235A5A5A%3BGL%3A1%3BDIV%3A%23336699%3BVLC%3ACD0A11%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3AFFFFFF%3BALC%3ACD0A11%3BLC%3ACD0A11%3BT%3A000000%3BGFNT%3ACD0A11%3BGIMP%3ACD0A11%3BLH%3A50%3BLW%3A227%3BL%3Ahttp%3A%2F%2Fwww.traileraddict.com%2Fimages%2Fgoogle.png%3BS%3Ahttp%3A%2F%2Fwww.traileraddict.com%3BFORID%3A11&hl=en",
      logoPath: "http://www.traileraddict.com/favicon.ico"
    },
    
    // trailer addict
    {
      siteName: "Trailer Addict (List)",
      searchPath: "http://www.traileraddict.com/tags/{TITLE_DASH}",
      logoPath: "http://www.traileraddict.com/favicon.ico"
    }
    
    // // trailer addict
    // {
      // siteName: "Trailer Addict (Main)",
      // directPath: "http://www.traileraddict.com/trailer/{TITLE_DASH}/trailer",
      // logoPath: "http://www.traileraddict.com/favicon.ico"
    // },
    
    // // trailer addict
    // {
      // siteName: "Trailer Addict (Theatrical)",
      // directPath: "http://www.traileraddict.com/trailer/{TITLE_DASH}/theatrical-trailer",
      // logoPath: "http://www.traileraddict.com/favicon.ico"
    // }
   
  ]
  
  var watchNowEpisodeSites = [
    // hulu
    {
      siteName: "Hulu",      
      searchPath: "http://www.hulu.com/search?query={SHOW_TITLE_PLUS}+{EPISODE_TITLE_PLUS}&st=0&fs=",
      logoPath: "http://www.hulu.com/favicon.ico"
    },
  
    // project free tV
    {
      siteName: "Project Free TV",       
      logoPath: "http://www.free-tv-video-online.me/favicon.ico",
      directPath: "http://www.free-tv-video-online.me/internet/{SHOW_TITLE_RAW_UNDERSCORE}/season_{SEASON}.html"
    },
    
    // sidereel
    {
      siteName: "Sidereel",      
      directPath: "http://www.sidereel.com/{SHOW_TITLE_UNDERSCORE}/season-{SEASON}/episode-{EPISODE}/search",
      logoPath: "http://img32.imageshack.us/img32/5429/sidereelcom.png"
    }
  ];
 
// ----------------------------- TV and Movie Title Pages -------------------------
   
  function getTitleInfo(){
    var titleRaw = $.trim($($("h1.header").contents()[0]).text());
    var titleClean = titleRaw.replace(/[:,'()]/g, "").replace("&", "and");
    var titleDash = titleClean.replace(/\s/g, "-").toLowerCase();
    var titleUnderscore = titleClean.replace(/\s/g, "_").toLowerCase();
    var titlePlus = titleClean.replace(/\s/g, "+").toLowerCase();
    
    return {title: titleRaw, titleClean: titleClean, titleDash: titleDash, 
            titleUnderscore: titleUnderscore, titlePlus: titlePlus};
  }
  
  function getMovieTitleInfo(){  
    var titleInfo = getTitleInfo();
    var movieYearLink = $("h1.header > span > a");
    var year = $.trim(movieYearLink.html());
    titleInfo.year = parseInt(year);
    
    return titleInfo;
  }
  
  function getTvShowTitleInfo(){
    var titleInfo = getTitleInfo();
        
    return titleInfo;
  }
  
  function ensureParentDiv(){
    var sidebar = $("div#sidebar");      
    var mainDiv = sidebar.find("div.aux-content-widget-5 > div.contextual > div.main");    
    
    if(mainDiv.length > 0) return mainDiv;
     
    function ensureChild(parent, childSelector,  childHtml, shouldAppend){
      var child = parent.children(childSelector);
      if(child.length === 0){
        child = shouldAppend ? $(childHtml).appendTo(parent) : $(childHtml).prependTo(parent);          
      }      
      return child;
    }
     
    var contentWidgetDiv = ensureChild(sidebar, "div.aux-content-widget-5", "<div class='aux-content-widget-5'></div>");
    var contextualDiv = ensureChild(contentWidgetDiv, "div.contextual", "<div class='contextual'></div>");
    mainDiv = ensureChild(contextualDiv, "div.main", "<div class='main'></div>");
          
    var bottomDiv = contextualDiv.children("div.bottom");
    if(bottomDiv.length === 0){
      var roundBottom = 
        {
          "border-bottom-left-radius": "12px",
          "border-bottom-right-radius": "12px",
          "-moz-border-radius": "0 0 12px 12px",
          "-webkit-border-bottom-left-radius": "12px",
          "-webkit-border-bottom-right-radius": "12px"
        };
      mainDiv.css(roundBottom);
    }
    else{
      bottomDiv.removeClass("bottom-only");
    }  
  }  
  
  function getWatchNowSitesContainerDiv() {    
    
    ensureParentDiv();
    var parentDiv = $("div#sidebar div.aux-content-widget-5 > div.contextual > div.main"); 
    var watchNowPattern = /watch now/i;
    var watchNowHeader = parentDiv.children("h2").filter(function() {
                            return watchNowPattern.test($(this).text());
                          });

    // If Watch now section does not exist, create it
    if (watchNowHeader.length === 0) {
        if(parentDiv.children().length > 0){
          $("<br />").appendTo(parentDiv);
        }
        watchNowHeader = $("<h2>Watch Now</h2>").appendTo(parentDiv);        
    }

    // add a container div after the header
    var container = $("<div></div>").insertAfter(watchNowHeader);//.after("<br />");
        
    return container;
  }
  
  function getDownloadNowSitesContainerDiv() {    
    
    ensureParentDiv();
    var parentDiv = $("div#sidebar div.aux-content-widget-5 > div.contextual > div.main");  
    parentDiv.append("<br />");
    downloadNowHeader = $("<h2>Download Now</h2>").appendTo(parentDiv);
    
    // add a container div after the header
    var container = $("<div></div>").insertAfter(downloadNowHeader);//.after("<br />");
        
    return container;
  }
  
  function getWatchTrailerSitesContainerDiv(){
    ensureParentDiv();
    var parentDiv = $("div#sidebar div.aux-content-widget-5 > div.contextual > div.main");  
    parentDiv.append("<br />");
    downloadNowHeader = $("<h2>Watch Trailer</h2>").appendTo(parentDiv);
    
    // add a container div after the header
    var container = $("<div></div>").insertAfter(downloadNowHeader);//.after("<br />");
        
    return container;
  }
 
  /*
  // Options:
  // siteName - The display name of the site
  // searchPath - The GET search path for the title including query parameters or the action url for a POST
  // logoPath - The 16 x 16 px path of the site logo (usually the favicon)
  // searchParams - The search paramters for a POST in the format "{fieldName1: fieldValue1, fieldName2: fieldValue2}"
  // directPath - The direct path for the title if applicable. If directPath is provided, it is used intead of searchPath
  */
  function createSiteItem(options){  
    
    var img = '<div style="width:16;height:16"></div>';
    if(options.logoPath) img = '<img class="absmiddle" width="16" height="16" src="' + options.logoPath + '"> ';
  
    var href = "#";
    var onclick = "";
    var newWindowImg = "";
    if(options.searchParams) {    
      onclick = 'onclick=\'postToUrl("' + options.searchPath + '",' + JSON.stringify(options.searchParams) + ', ""); return false;\'';            
      var newWinOnclick = 'onclick=\'postToUrl("' + options.searchPath + '",' + JSON.stringify(options.searchParams) + ',"_blank"); return false;\'';      
      newWindowImg = "<a href='#' " + newWinOnclick + " title='open in new window'><img src='http://img837.imageshack.us/img837/5338/newwindowicon.gif'></a>";
    }
    else{
      href = options.directPath ? options.directPath : options.searchPath;
      newWindowImg = "<a href='" + href +"' target='_blank' title='open in new window'><img src='http://img837.imageshack.us/img837/5338/newwindowicon.gif'></a>";
    }
    
    log("newWindowImg: " + newWindowImg);
    
    var link = '<a href="'+ href +'" ' + onclick + ' target="">' + options.siteName + '</a>'
    
    var movieSiteItemDiv = '<div class="contextual-member">' + img + link + "&nbsp" + newWindowImg + "&nbsp;»</div>";
      
    return movieSiteItemDiv;
  }  
   
  function addSites(sites, titleInfo, container, createSiteItemHandler) {   
    function setPlaceHolderData(str, info){
      str = str.replace("{TITLE}", info.title);
      str = str.replace("{TITLE_PLUS}", info.titlePlus);
      str = str.replace("{TITLE_CLEAN}", info.titleClean);
      str = str.replace("{TITLE_DASH}", info.titleDash);
      str = str.replace("{TITLE_UNDERSCORE}", info.titleUnderscore);
      str = str.replace("{YEAR}", info.year);
      return str;
    }
      
    for (var i = 0; i < sites.length; i++) {
        site = sites[i];
        if(site.searchPath){
          site.searchPath = setPlaceHolderData(site.searchPath, titleInfo);
          log(site.siteName + " searchPath: " + site.searchPath);
        }
        if(site.directPath){
          site.directPath = setPlaceHolderData(site.directPath, titleInfo);
          log(site.siteName + " directPath: " + site.directPath);
        }
        if(site.searchParams){
          for(var key in site.searchParams){
            site.searchParams[key] = setPlaceHolderData(site.searchParams[key], titleInfo);
            log(site.siteName + " searchParam- " + key + ": " +  site.searchParams[key]);
          }   
        }        
        container.append(createSiteItemHandler(site));
    }    
  }
  
  function addMovieSites(){
    var titleInfo = getMovieTitleInfo();
     
    var imdbTrailerBtn = $("td#overview-bottom > a.title-trailer");
    //imdbTrailerBtn.hide();
    var trailerUrl = imdbTrailerBtn.attr("href");    
    var imdbSite = {
      siteName: "IMDB",
      directPath: trailerUrl,
      logoPath: " http://www.imdb.com/favicon.ico"
    };    
    var movieTrailerSites = $.merge([imdbSite], watchTrailerMovieSites);    
    addSites(movieTrailerSites, titleInfo, getWatchTrailerSitesContainerDiv(), createSiteItem)
    addSites(watchNowMovieSites, titleInfo, getWatchNowSitesContainerDiv(), createSiteItem);
    addSites(downloadNowMovieSites, titleInfo, getDownloadNowSitesContainerDiv(), createSiteItem);
  }
  
  function addTvShowSites(){
    var titleInfo = getTvShowTitleInfo();
    addSites(watchNowTvShowSites, titleInfo, getWatchNowSitesContainerDiv(), createSiteItem);
  }
  
// ----------------------------- TV Episode Pages -------------------------
   
  function getEpisodeInfoList(containers){
    var info = containers.map(function(){
      var episodeInfo = {};    
      
      var seasonEpisode = $($(this).children("h3").contents()[0]).text();
      log("Season and Episode: " + seasonEpisode);
      var pattern = /Season (\d+), Episode (\d+):/ig;
      var matches = pattern.exec(seasonEpisode);  
      //log("Pattern Matches:");
      //log(matches);
      episodeInfo.season = matches[1];
      episodeInfo.episode = matches[2];
      episodeInfo.title = $(this).find("h3 > a").html();        
      log("Episode Title: " + episodeInfo.title);
      episodeInfo.titleClean = episodeInfo.title.replace(/[:,'()]/g, "");
      episodeInfo.titleDash = episodeInfo.titleClean.replace(/\s/g, "-").toLowerCase();
      episodeInfo.titleUnderscore = episodeInfo.titleClean.replace(/\s/g, "_").toLowerCase();
      episodeInfo.titlePlus = episodeInfo.titleClean.replace(/\s/g, "+").toLowerCase();

      return episodeInfo;
    }).get();
    
    return info;
  }
  
  function getEpisodePageTvShowInfo(){
    var anchorContent = $.trim($("div#tn15title > h1 > a").html());
    var title = anchorContent.substring(1, anchorContent.length - 1);
    
    log("TV show title: " + title);
    
    var info = {};
    info.title = title;
    info.titleClean = info.title.replace(/[:,'()]/g, "").replace("&", "and");;
    info.titleDash = info.titleClean.replace(/\s/g, "-").toLowerCase();
    info.titleUnderscore = info.titleClean.replace(/\s/g, "_").toLowerCase();
    info.titlePlus = info.titleClean.replace(/\s/g, "+").toLowerCase();
    info.titleRawUnderscore = info.title.replace(/\s/g, "_").toLowerCase();
    
    return info;
  }
   
  function createEpisodeSiteItem(sites, tvShowInfo, episodeInfo){
    var sitesContainer = $("<div style='margin-top:10px'></div>");  
    sitesContainer.append($("<span>Watch Now: </span>").css({"color": "#A58500", "font-size": "17.5px"}));

    for(var i = 0; i < sites.length; i++){
      var site = sites[i];
      var href = site.directPath ? site.directPath : site.searchPath;
      var item = $("<span></span>")
                    .append(
                      $("<a></a>")                    
                        .attr({"href": href, "title": site.siteName})
                        .append($("<img/>").attr("src", site.logoPath).css("vertical-align", "middle"))                         
                    )
                    .append("&nbsp;")
                    .append(
                      $("<a></a>")                    
                        .attr({"href": href, "title": site.siteName})                        
                        .append(site.siteName)
                    )
                    .append("&nbsp;")
                    .append(
                      $("<a></a>")
                        .attr({"href": href, "target": "_blank"})
                        .append(
                          $("<img />")
                            .attr("src", "http://img837.imageshack.us/img837/5338/newwindowicon.gif")
                        )
                    )
                    .append("&nbsp;»");
      
      sitesContainer.append(item);
      sitesContainer.append("&nbsp;");
    }
    
    log("Sites Container: ");
    log(sitesContainer);
    
    return sitesContainer;
  }
  
  function getSitesWithEpisodeInfo(sites, tvShowInfo, episodeInfo){
    function setTvShowPlaceHolderData(str, info){
      str = str.replace("{SHOW_TITLE_PLUS}", info.titlePlus);
      str = str.replace("{SHOW_TITLE_CLEAN}", info.titleClean);
      str = str.replace("{SHOW_TITLE_DASH}", info.titleDash);
      str = str.replace("{SHOW_TITLE_UNDERSCORE}", info.titleUnderscore);
      str = str.replace("{SHOW_TITLE_RAW_UNDERSCORE}", info.titleRawUnderscore);      
      return str;
    }
    
    function setEpisodePlacholderData(str, info){
      str = str.replace("{EPISODE_TITLE_PLUS}", info.titlePlus);
      str = str.replace("{EPISODE_TITLE_CLEAN}", info.titleClean);
      str = str.replace("{EPISODE_TITLE_DASH}", info.titleDash);
      str = str.replace("{EPISODE_TITLE_UNDERSCORE}", info.titleUnderscore);
      str = str.replace("{EPISODE_TITLE_RAW_UNDERSCORE}", info.titleRawUnderscore); 
      str = str.replace("{SEASON}", info.season);
      str = str.replace("{EPISODE}", info.episode);   
      return str;
    }
    
    sitesWithInfo = [];  
    for(var i = 0; i < sites.length; i++){
      var site = $.extend({}, sites[i]);
      if(site.searchPath){
        site.searchPath = setTvShowPlaceHolderData(site.searchPath, tvShowInfo);
        site.searchPath = setEpisodePlacholderData(site.searchPath, episodeInfo);
        log(site.siteName + " searchPath: " + site.searchPath);
      }
      if(site.directPath){
        site.directPath = setTvShowPlaceHolderData(site.directPath, tvShowInfo);
        site.directPath = setEpisodePlacholderData(site.directPath, episodeInfo);
        log(site.siteName + " directPath: " + site.directPath);
      }
      sitesWithInfo[i] = site;
    }
    
    log("Sites with Info: ");
    log(sitesWithInfo);
    
    return sitesWithInfo;
  }
  
  function getEpisodeContainerList(){
    var containerTDs = $("div.season-filter-all > div.filter-all > table > tbody > tr > td:nth-child(2)");
    log("Num episode containers: " + containerTDs.length)
    return containerTDs;
  }
   
  function addEpisodeSites(){
    var containers = getEpisodeContainerList();
    var episodeInfoList = getEpisodeInfoList(containers);
    log("Episode Info List:");
    log(episodeInfoList);
    var tvShowInfo = getEpisodePageTvShowInfo();
    
    for(var i = 0; i < episodeInfoList.length; i++){
      var episodeInfo = episodeInfoList[i];
      var sites = getSitesWithEpisodeInfo(watchNowEpisodeSites, tvShowInfo, episodeInfo);
      var item = createEpisodeSiteItem(sites, tvShowInfo, episodeInfo);      
      $(containers[i]).append(item);
    }
  }
   
// ----------------------------- Common Functions -------------------------
 
  
  function run(){
    //check if current page is a episodes page    
    episodesPattern = /http:\/\/www\.imdb\.com\/title\/.+\/episodes.*/ig;
    var isEpisodesPage = episodesPattern.test(location.href);
    log("isEpisodesPage: " + isEpisodesPage);
  
    if(isEpisodesPage){
      addEpisodeSites();
    }
    else{
       // Check if the current page is a movie or a tv series page
      var isMoviePage = isTvShowPage = false;
      var movieYearLink = $("h1.header > span > a");
      var tvShowSpan = $("h1.header > span.tv-series-smaller");

      if(movieYearLink.length > 0) isMoviePage = true;
      else if(tvShowSpan.length > 0) isTvShowPage = true;

      log("isMoviePage: " + isMoviePage);
      log("isTvShowPage: " + isTvShowPage);
      
      if(isMoviePage) {               
        addMovieSites();
      }
      else if(isTvShowPage){        
        addTvShowSites();
      }
    }
  }
  
  function log(object){
    if(debug) console.log(object);
  }
  
  run();
}

function postToUrl(url, params, target){
  if(target == undefined) target = "";
  var form = $('<form>').attr({"action": url, "method": "POST", "target": target});
  
  var addParam = function(paramName, paramValue){
      $('<input type="hidden">').attr({ "id": paramName, "name": paramName, "value": paramValue }).appendTo(form);        
  };
  
  for(var key in params){
      addParam(key, params[key]);
  }
      
  form.appendTo(document.body).submit().remove();   
}


loadFunction({func: main, shouldWaitForJQuery: true, jQueryWaitCallBackFuncName: "main"});
loadFunction({func: postToUrl});