// ==UserScript==
// @name           allocineSeenMovies
// @namespace      allocineSeenMovies
// @description    Allows to hide movies from allocine MyMovies page
// @include        http://www.allocine.fr/cinema/mes-cinemas/*
// ==/UserScript==

function shoot()
{
  addOwnStyles();
  var movies = document.getElementsByClassName('datablock');
  for (var i = 0; i < movies.length; i++) {
    var block = movies[i];
    
    // first we get the movieId from the datablock
    var movieId = block.getElementsByClassName('anchor');
    if (!movieId || !movieId[0]) {
      continue;
    }
    movieId = movieId[0].getAttribute('id');
    initButton(block);
      
    // is the movie hidden ?
    if (isHiddenMovie(movieId)) {
      hideMovie(block, movieId);
    } else {
      setButton(block, movieId, true);
    }
  }
}

function initButton(block)
{
  var titleBar = block.getElementsByTagName('h2');
  if (!titleBar || !titleBar[0]) {
    return;
  }
  titleBar[0].innerHTML = '<span class="ASMbutton"></span>' + titleBar[0].innerHTML;
}

function setButton(block, movieId, toHide)
{
  var button = block.getElementsByClassName('ASMbutton');
  if (!button || !button[0]) {
    return;
  }
  button = button[0];
  
  var id = 'ASMtoggle' + movieId;
  var toggleButton = document.getElementById(id);
  if (toggleButton) {
    toggleButton.removeEventListener('click', toggleMovie, false);
  }
  
  if (toHide == true) {
    button.innerHTML = '<a id="' + id + '">[-]</a>';
  } else {
    button.innerHTML = '<a id="' + id + '">[+]</a>';
  }
  
  var toggleButton = document.getElementById(id);
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleMovie, false);
  }
}

function toggleMovie(e)
{
  var movieId = this.id.substr(9);
  var block = getBlockByMovieId(movieId);
  if (isHiddenMovie(movieId))
    showMovie(block, movieId);
  else
    hideMovie(block, movieId);
}

function getBlockByMovieId(movieId)
{
  var block = document.getElementById(movieId);
  if (!block)
    return false;
  return block.parentNode.parentNode.parentNode;
}

function showMovie(block, movieId)
{
  setButton(block, movieId, true);
  saveMovieState(movieId, false);
  var hidden = block.getElementsByClassName('ASMhidden');
  for (var i = 0; i < hidden.length; i++) {
    removeClass(hidden[i], 'ASMhidden');
  }
}

function hideMovie(block, movieId)
{
  setButton(block, movieId, false);
  saveMovieState(movieId, true);
      var hideZone = block.getElementsByClassName('picturezone');
      if (hideZone && hideZone[0])
        addClass(hideZone[0], 'ASMhidden');
      hideZone = block.getElementsByClassName('contentzone');
      if (hideZone && hideZone[0])
        addClass(hideZone[0], 'ASMhidden');
      hideZone = block.getElementsByClassName('extrazone');
      if (hideZone && hideZone[0])
        addClass(hideZone[0], 'ASMhidden');
        
      hideZone = block.getElementsByClassName('contenzone');
      if (hideZone && hideZone[0]) {
        hideZone = hideZone[0].childNodes;
        var saveNext = false;
        for (var i = 0; i < hideZone.length; i++) {
          if (hideZone[i].nodeType != 1)
            continue;
          
          var saveCur = false;
          if (saveNext == true) {
            saveCur = true;
            saveNext = false;
          }
        
          if (hideZone[i].getAttribute('class') == 'titlebar') {
            saveNext = true;
            continue;
          }
          
          if (saveCur == false) {
            addClass(hideZone[i], 'ASMhidden');
          }
        }
      }
}

function addOwnStyles()
{
  var sheet = document.createElement('style');
  sheet.innerHTML = '.ASMhidden { display: none; visibility: hidden; }' + "\n";
  //sheet.innerHTML += 'img.ASMbutton { width: 16px; height: 16px; display: block; }' + "\n";
  //sheet.innerHTML += 'img.ASMshow { background-image: url(''); }' + "\n";
  //sheet.innerHTML += 'img.ASMhide { background-image: url(''); }' + "\n";
  document.body.appendChild(sheet);
}

function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls))
    ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

function getMovieStates()
{
  var movieStates = new Object();
  var movieStatesText = GM_getValue('movieStates', false);
  if (movieStatesText == false)
    return movieStates;
    
  var movieStatesList = movieStatesText.split(',');
  for (var i = 0; i < movieStatesList.length; i++) {
    movieStates[movieStatesList[i]] = true;
  }
  
  return movieStates;
}

function setMovieStates(movieStates)
{
  var movieStatesList = new Array();
  for (var i in movieStates) {
    if (movieStates[i] == true) {
      movieStatesList.push(i);
    }
  }
  GM_setValue('movieStates', movieStatesList.join(','));
}

function saveMovieState(movieId, state)
{
  var movieStates = getMovieStates();
  movieStates[movieId] = state;
  setMovieStates(movieStates);
}

function isHiddenMovie(movieId)
{
  var movieStates = getMovieStates();
  return (movieStates[movieId] && movieStates[movieId] == true);
}

shoot();