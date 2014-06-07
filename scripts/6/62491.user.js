// ==UserScript==
// @name           IMDB Socializer
// @namespace      dirkwilden
// @include        http://*imdb.com/*
// @exclude        http://i.imdb.com/*
// @exclude        http://*imdb.com/images/*
// @version        3.0.3
// ==/UserScript==

////CHROME FIX////
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)){
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}
////END CHROME FIX////

// --------------------------------------------------------------------------------
// GLOBAL VARS
// --------------------------------------------------------------------------------

var maxRecent = 5;
var recentDiv = 0;
var configDiv = 0;
var tableIDs  = new Array;
var configNames = new Array;
var configIDs   = new Array;

//friendLists are the links to the lists and friendNames are the names of friends
var friendLists = new Array;
var friendNames = new Array;

// movieCollection is a 2d array that stores a list of MovieLinks for each Friend
// voteCollection  is a 2d array that stores a list of votes corresponding to the movie in movieCollection
var movieCollection = new Array;
var voteCollection  = new Array;
var latestMovies    = new Array;
var movieTitles     = new Array;

// -----------------------------------
// M A I N
// -----------------------------------

//read the local configuration
readConfig();

if ( friendLists.length > 0 ){
  // always check for links which have to be colored
  colorMovieLinks();

  // Verify if the current page shows a movie
  var isMoviePage = document.location.href.match(/tt[0]*(\d+)\/#{0,1}$/);
  if (isMoviePage) addStarBars();
}

// only do this for the start page
if (document.getElementById("homepage_center_top") != null){
  //add socializer-box to the start page
  insertSocializerBox();
  //check for new votes and afterwards fill the
  //socializer-box with most recent votes
  checkForNewVotes();
}

// --------------------------------------------------------------------------------
// UTILS
// --------------------------------------------------------------------------------

function getListUrl(list_id){
  return 'http://www.imdb.com/user/' + friendLists[list_id] + '/ratings';
}

function c(tag_name) {
  return document.createElement(tag_name);
}

function c(tag_name, class_name) {
  var el      = document.createElement(tag_name);
  el.setAttribute("class", class_name);
  return el;
}

function t(element, text) {
  var textNode  = document.createTextNode(text);
  element.appendChild( textNode );
}

function u(id, text) {
  e(id).innerHTML = text;
}

function e(id) {
  return document.getElementById(id);
}

// --------------------------------------------------------------------------------

// ----------------------------------------------
// read local configuration
function readConfig(){

  if ( !GM_getValue("friendNames") )
    return;

  friendNames = GM_getValue("friendNames").split('|');
  friendLists = GM_getValue("friendLists").split('|');
  friendNames[0] = "You";
  
  for (var i=0; i < friendLists.length; i++){
    movieCollection[i] = new Array;
    voteCollection[i]  = new Array;
    latestMovies[i]    = new Array;
    movieTitles[i]     = new Array;
  }

  for (var i=0; i < friendLists.length; i++ )
    if (GM_getValue("movieCollection" + i)){
      movieCollection[i] = GM_getValue("movieCollection" + i).split('|');
      voteCollection[i]  = GM_getValue("voteCollection" + i).split('|');
      latestMovies[i]    = GM_getValue("latestMovies" + i).split('|');
      movieTitles[i]     = GM_getValue("movieTitles" + i).split('|');
    }
}

// ----------------------------------------------
// insert the socializer box in the start-page
var recentA;
var configA;
var tabs;

function insertSocializerBox(){
  
  var divArticle = c('div','article');
  var divNewsWidget = c('div','newsWidget');
  var headLine = c('h2');
  headLine.id = 'ndheadline';
  t(headLine,"IMDb Socializer");

  var ulTabs = c('ul','newsTabs');
  
  var confActive = (friendLists.length == 0) ? 'active' : '';
  var receActive = (friendLists.length != 0) ? 'active' : '';
  
  var tab1 = c('li','active');
  var tab2 = c('li','active');

  tab1.innerHTML = '<a>Configuration</a>';
  tab2.innerHTML = '<a>Recent Activity</a>';

  ulTabs.appendChild(tab1);
  ulTabs.appendChild(tab2);

  divArticle.appendChild(divNewsWidget);
  divNewsWidget.appendChild(headLine);
  divNewsWidget.appendChild(ulTabs);

  tabs  = c('div', 'newsTabs');
  
  //add 'recent activity'
  recentA = c('div', 'newsTab ' + receActive);
  recentDiv = c('div', 'newsItem primary');

  recentA.appendChild(recentDiv);
  tabs.appendChild(recentA);

  //add 'configuration'
  configA = c('div', 'newsTab ' + confActive);
  var configB = c('div', 'newsItem primary');
  
  //construct the inner item
  configDiv = c('div');
  configDiv.style.margin = '4px';

  tab1.addEventListener('click', showConfigTab, true);
  tab2.addEventListener('click', showRecentTab, true);
  
  configB.appendChild(configDiv);
  configA.appendChild(configB);
  tabs.appendChild(configA);
  
  //add it to the page
  divNewsWidget.appendChild(tabs);

  var outputArea = document.getElementById("homepage_center_top");
  var divs = outputArea.getElementsByTagName("div");
  divs[0].appendChild(divArticle);  
  
  setupConfigTab();
}

// update the socializer box in the start-page
// this has to be done for chrome compatibility
function updateSocializerBox(showConfig){
  //clear the tabs
  if ( tabs.hasChildNodes() )
  {
    while ( tabs.childNodes.length >= 1 )
    {
      tabs.removeChild( tabs.firstChild );       
    } 
  }
  
  var confActive =  (showConfig) ? 'active' : '';
  var receActive = (!showConfig) ? 'active' : '';
  
  //add 'recent activity'
  recentA = c('div', 'newsTab ' + receActive);
  recentA.appendChild(recentDiv);
  tabs.appendChild(recentA);

  //add 'configuration'
  configA = c('div', 'newsTab ' + confActive);
  var configB = c('div', 'newsItem primary');
  
  //construct the inner item
  configDiv = c('div');
  configDiv.style.margin = '4px';

  configB.appendChild(configDiv);
  configA.appendChild(configB);
  tabs.appendChild(configA);
  
  setupConfigTab();
}

function showConfigTab(){
  updateSocializerBox(true);
}

function showRecentTab(){
  updateSocializerBox(false);
}

// ----------------------------------------------
// setup the configuration tab
function setupConfigTab(){

  var maxRows = friendLists.length+3;
  if (maxRows < 5) maxRows = 5;
  var html = '';
  
  //init the table
  var table = c('table');
  
  configNames = new Array;
  configIDs   = new Array;
  
  for (var k=0; k < maxRows; k++){

    var defName = '';
    var defId   = '';
  
    if (k < friendLists.length){
      defName = friendNames[k];
      defId   = friendLists[k];
    }

    var disable = '';
    
    if (k == 0){
      defName = 'You';
      disable = 'disabled="disabled"';
      if (defName == '')
        defId   = 'urXXXXXXXX';
    }
    
    var tr = c('tr');
    table.appendChild(tr);
            
    var td1 = c('td');
    td1.width = '260px';

    td1.innerHTML = '<p style="color: black; font-weight:bold; font-size:x-small;">Name: <input style="font-size:x-small;" name="name" type="text" ' + disable + ' value="'+defName+'" size="30" maxlength="30"></p>';
    tr.appendChild(td1);
    configNames[k] = td1.getElementsByTagName("input")[0];
    
    var td2 = c('td');
    td2.width = '300px';
    td2.innerHTML = '<p style="color: black; font-weight:bold; font-size:x-small;">User-ID: <input style="font-size:x-small;" name="userID" type="text" value="'+defId+'" size="30" maxlength="30"></p>';
    tr.appendChild(td2);
    configIDs[k] = td2.getElementsByTagName("input")[0];
  }
  
  configDiv.appendChild(table);
  
  var divSave = c('div');
  divSave.align = 'Right';
  
  var button = c('input');
  button.type = 'Submit';
  button.value = 'Save';
  
  divSave.appendChild(button);
  button.addEventListener('click', saveConfig, true);
  
  configDiv.appendChild(divSave);
}

// ----------------------------------------------
// save the configuration when the button was hit
function saveConfig(){

  friendNames = new Array;
  friendLists = new Array;
  var fId = 0;
  
  for(var k=0; k < configNames.length; k++){
    
    var name = configNames[k].value;
    var id   = configIDs[k].value;
    
    if (name == '' || id == '')
      continue;
    
    friendNames[fId] = name;
    friendLists[fId] = id;
    fId++;
  }
  
  GM_setValue("friendNames", friendNames.join('|'));
  GM_setValue("friendLists", friendLists.join('|'));

  for (var i=0; i < friendLists.length; i++ ){
    GM_setValue("movieCollection" + i, '');
    GM_setValue("voteCollection"  + i, '');
    GM_setValue("latestMovies"    + i, '');
    GM_setValue("movieTitles"     + i, '');
  }
  
  setTimeout("document.location.reload();", 1);
}

// -----------------------------------
// check for new/updated votes
function checkForNewVotes(){
  //trigger updates
  for (var i = 0; i < friendLists.length; i++ ){
    displayLatestMovies(i,0); //this temporarily shows the old votes
    fetchMovieList(i, 1);
  }
}

// -----------------------------------
// update list with given id
function fetchMovieList(id, pageStart){
  if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
  }
  
  //retrieve movie list
  GM_xmlhttpRequest({
    method : 'GET',
    url    : getListUrl(id) + "?start=" + pageStart + "&view=compact&sort=ratings_date:desc",
    //headers: { 'Cookie': document.cookie },
    onload : function(responseDetails) { updateMovieList(responseDetails, id, pageStart) },
    onerror: function(responseDetails) { gotListError(responseDetails, id, pageStart) }
  });
}

// -----------------------------------
// callback function receives and parses a MovieList page
function updateMovieList(responseDetails, id, pageStart) {

  var parser = c('div');
  parser.innerHTML = responseDetails.responseText;
  
  // get the table
  var t = parser.getElementsByTagName('table');
  
  if (t.length == 0){
    GM_log("Cannot process movie list");
    return;
  }
  
  var newMovieCount = 0;
  
  var TRs;
  
  for(var x=0; x < t.length; x++){
    var TR = t[x].getElementsByTagName('tr');

    if ( TR.length == 0)
      continue;
    
    if ( TR[0].className != "list_item" )
      continue;

    TRs = TR;
    break;
  }
  
  if ( typeof TRs === 'undefined' ){
    GM_log("Unabe to detect movie table in list!");   
    return;
  }
  
  var previousMovies = latestMovies[id];
  latestMovies[id] = new Array;
  
  for (var j = 1; j < TRs.length; j++ ){
    
    var TDs = TRs[j].getElementsByTagName('td');
    var title     = '';
    var url       = '';
    var yourRating = 0;
    var usrRating  = 0;
    
    for (var k=0; k < TDs.length; k++ ){

      if ( TDs[k].className == 'title' ){
        var a   = TDs[k].childNodes[0];
        title   = a.innerHTML;
        matches = a.href.match(/tt[0]*(\d+)\/$/);
        url     = matches[1];
      }

      if ( TDs[k].className == 'user_rating' ){
        usrRating = TDs[k].innerHTML;
      }
      
      if ( TDs[k].className == 'your_ratings'){
		if (yourRating == 0) {
			for (var ll=0; ll < TDs[k].childNodes.length; ll++) {			
				if (TDs[k].childNodes[ll].childNodes.length == 1) {
					yourRating = TDs[k].childNodes[ll].childNodes[0].nodeValue;
				}
			}
		}
      }
	  
      if ( TDs[k].className == 'rater_ratings' ){
		for (var ll=0; ll < TDs[k].childNodes.length; ll++) {			
			if (TDs[k].childNodes[ll].childNodes.length == 1) {
				yourRating = TDs[k].childNodes[ll].childNodes[0].nodeValue;
			}
		}
      }
    }
	
    //if this is your own list then the votes stand in yourRating
    //if its another list it stands in usrRating -> always copy to yourRating
    if ( yourRating == 0 )
      yourRating = usrRating;
    
    if (title == '')
      continue;
      
    if (movieCollection[id].indexOf(url) == -1){
      //store new movie
      movieCollection[id].push(url);
      voteCollection[id].push(yourRating);
      movieTitles[id].push(title);

      if ( pageStart == 1) //latest movie can only be on first page
        latestMovies[id].push( movieCollection[id].length-1 );
        
      newMovieCount += 1;
    } else {
      //update vote for movie
      voteCollection[id][movieCollection[id].indexOf(url)] = yourRating;
    }   
    
    //GM_log( title + " (" + url + "), " + yourRating + ", " + id );
  }
  
  //push previous movies
  for(var k=0; k < previousMovies.length; k++)
    latestMovies[id].push( previousMovies[k] );
  
  var newMovies = 0;
  
  //keep only 5 latest movies
  while( latestMovies[id].length > maxRecent ){
    latestMovies[id].pop();
    newMovies++;
  }

  //store arrays into cache
  GM_setValue("movieCollection" + id, movieCollection[id].join('|'));
  GM_setValue( "voteCollection" + id,  voteCollection[id].join('|'));
  GM_setValue(   "latestMovies" + id,    latestMovies[id].join('|'));
  GM_setValue(    "movieTitles" + id,     movieTitles[id].join('|'));
  responseDetails.responseText = '';
  
  displayLatestMovies(id,newMovies);
  
  if ( newMovieCount > 50)
    fetchMovieList(id, pageStart+250);
}

// ----------------------------------------------
// display latest movies on the start page
function displayLatestMovies(id,newMovies){

  if (recentDiv.innerHTML == ''){
    //init the table for all votes once
    var table = c('table');
    
    var cells = friendLists.length + (friendLists.length % 3);
    var tr;
    
    for (var k=0; k < cells; k++){
    
      //one row for 3 cells
      if ( k % 3 == 0){
        tr = c('tr');
        table.appendChild(tr);
      }
        
      var td = c('td');
      td.width = '250px';
      tr.appendChild(td);
      
      tableIDs[k] = td;
    }
    
    recentDiv.appendChild(table);
  }
  
  var html = '';
  html += '<span><a style="color: black; font-weight:bold; font-size:x-small; text-decoration: none"';
  html += ' href="'+getListUrl(id)+'">'+friendNames[id]+"</a>";
  html += '</span><br>';
  
  for (var l=0; l < maxRecent; l++){
  
    var mLink  = '';
    var mTitle = '';
    var mVote  = '';
    
    if ( l < latestMovies[id].length ){
      var lateID = latestMovies[id][l];
      mTitle = movieTitles[id][lateID];
      if (mTitle.length > 25) mTitle = mTitle.substr(0,25) + '...';
      mLink = '/title/tt'+movieCollection[id][lateID]+'/';
      mVote = ' (' + voteCollection[id][lateID] + ')';
    }

    if ( l < newMovies )
      html += '<span><a style="color: grey; font-weight:bold; font-size:x-small; text-decoration: none"';
    else
      html += '<span><a style="color: grey; font-size:x-small; text-decoration: none"';

    html += ' href="'+mLink+'">'+mTitle+"</a>";
    html += '</span><span style="color: black; font-size:x-small;">'+mVote+'</span>';
    html += '<br>';
  }
    
  tableIDs[id].innerHTML = html; 
}


// -----------------------------------
// callback in case of error
 function gotListError(responseDetails, id) {
    alert('Error loading movieList of ' + friendNames[id] + ': ' +
       responseDetails.status + ' ' + responseDetails.statusText);
 }

// -----------------------------------
// color links to movies you or your friends have seen
function colorMovieLinks(){
  // Check all links in the page
  var anchors = document.getElementsByTagName('a');
  for (var i=0; i < anchors.length; i++) {
    var a = anchors[i];
    m = a.href.match(/tt[0]*(\d+)\/$/);
    if (!m) {
      m = a.href.match(/imdb.com\/Title\?[0]*(\d+)$/);
      // http://www.imdb.com/Title?0266543
      if (!m) continue;
    }

    //ignore IMDB Pro links (especially the "more at imdb pro" link)
    if ( a.href.match(/pro.imdb.com/) )
      continue;

    // I "encode" the movie number with "base 36" to save memory
    num = m[1];
    
    for (var c=1; c < movieCollection.length; c++)
      if ( document.location.href.indexOf(getListUrl(c)) == -1 )
        if (movieCollection[c].indexOf(num) != -1) {
          a.style.fontWeight='bold';
          a.style.color='brown';
        }

    if ( document.location.href.indexOf(getListUrl(0)) == -1 )
      if (movieCollection[0].indexOf(num) != -1) {
        a.style.fontWeight='bold';
        a.style.color='green';
      }
  }
}

// ----------------------------------------------
// add additional votes by friends
function addStarBars(){

  // Verify if the current page shows a movie
  var m = document.location.href.match(/tt[0]*(\d+)\/#{0,1}$/);
  
  if (m) {
    var num = m[1];

    //check for friend votes
    for (var c=0; c < movieCollection.length; c++)
      if (movieCollection[c].indexOf(num) != -1) {
        var id = movieCollection[c].indexOf(num);
        addStars(friendNames[c], voteCollection[c][id]);
      }
  }
}

// ----------------------------------------------
// add stars on a moviepage for a friend
function addStars(name, vote){
  var outputArea = document.getElementsByClassName('star-box-rating-widget');
  var pos = outputArea[0].parentNode; 
  
  var starWidget = c('div');
  starWidget.class = 'star-box-rating-widget';
  pos.appendChild(starWidget);
  
  var html = '';
  html += '<span class="star-box-rating-label" style="margin-left: 70px">'+name+': </span>';
  html += '<div class="rating rating-list" style="float: right">';
  html += '<span class="rating-bg">&nbsp;</span>';
  html += '<span class="rating-imdb rating-your" style="width: 0px">&nbsp;</span>';
  html += '<span class="rating-stars">';
  html += '<div class="rating-your"  style="width: '+(vote*14)+'px"></div>';
  html += '</span>';
  html += '<span class="rating-rating rating-your">';
  html += '<span class="value">'+vote+'</span>';
  html += '<span class="grey">/</span>';
  html += '<span class="grey">10</span>';
  html += '</span>';
  html += '&nbsp;';
  html += '</div>';
  html += '<div style="clear: right">';
  
  starWidget.innerHTML = html;
}