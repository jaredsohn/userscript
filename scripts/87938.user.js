// ==UserScript==
// @name           marketplace.secondlife.com tools
// @namespace      http://sites.google.com/site/cerisesorbet/
// @include        http://marketplace.secondlife.com/*
// @include        https://marketplace.secondlife.com/*
// ==/UserScript==


function GetCookie(key) {
  var encKey = encodeURIComponent(key);
  var raw = document.cookie.split(/\s*;\s*/);
  for (var i = 0; i < raw.length; i++) {
    var pair = raw[i].split('=', 2);
    if (pair[0] == encKey && pair.length > 1)
      return decodeURIComponent(pair[1]);
  }
  return null;
}

function SetCookie(key, value) {
  document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) 
    + ';path=/;expires=' + new Date(Date.now() + 31556926000).toUTCString();
}


//  attributes is an {attr: value, ...} object
function BuildTag(tagName, attributes) {
  var rv = document.createElement(tagName);
  for (var i in attributes)
    rv.setAttribute(i, attributes[i]);
  return rv;
}

// adapted from http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
function GetParams(search) {
  var params = {};
  var segment = search.replace(/^\?/,'').split('&');
  var s;
  for (var i = 0; i < segment.length; i++) {
    if (!segment[i]) continue;
    s = segment[i].split('=');
    var sVal = s[1].split('+');
    for (var j = 0; j < sVal.length; j++)
      sVal[j] = decodeURIComponent(sVal[j]);
    params[decodeURIComponent(s[0])] = sVal.join(' ');
  }
  return params;
}

// fetch the keywords from the meta tags and display them inline
function ShowKeywords() {
  var metaTags = document.getElementsByTagName('head')[0].getElementsByTagName('meta');
  var keywords = '<span style="color: #333333"><small>[no keywords]</small></span>';
  if (metaTags) {
    for (var i =  metaTags.length - 1; i >= 0; i--) {
      if (metaTags[i].name == "keywords") {
        if  (metaTags[i].content.length)
          keywords = '<span style="color: #cc6633" <b>Keywords:</b> ' +  metaTags[i].content + '</span>';
        break;
      }
    }
  }
  var tabs = document.getElementById('product-tabs');
  if (tabs) {
    var kwDiv = document.createElement('div');
    kwDiv.className = 'span-6';
    kwDiv.innerHTML = keywords;
    tabs.parentNode.insertBefore(kwDiv, tabs);
  }
}

function SetupShowFeatured() {
  var featuredItems = document.getElementById('featured-items'); // main page
  if (!featuredItems)
    featuredItems = document.getElementById('featured-items-category'); // category page
  if (featuredItems) {
    var featHeading = featuredItems.getElementsByTagName('h2')[0];
    if (featHeading) {
      var showHideLink = document.createElement('span');
      showHideLink.innerHTML = '<button id="showFeatured"></button> ';
      featHeading.insertBefore(showHideLink, featHeading.firstChild);
      ShowFeatured(GetCookie('hideFeatured'), featuredItems);
      document.getElementById('showFeatured').addEventListener('click', function() { ShowFeatured('toggle', featuredItems); }, false);
    }
  }
}

function ShowFeatured(hideFeatured, featuredItems) {
  if (hideFeatured == 'toggle')
    hideFeatured = !(GetCookie('hideFeatured') == 'true');
  else
    hideFeatured = (hideFeatured == 'true');

  SetCookie('hideFeatured', hideFeatured ? 'true' : 'false');
    
  // find the featured items and show or hide them as requested
  var scrollable = document.getElementById('featured-items-scrollable');
  if (scrollable)
    scrollable.style.display = hideFeatured ? 'none' : '';
  var carousels = featuredItems.getElementsByTagName('div');
  for (var i = carousels.length - 1; i >= 0; i--) {
    if (carousels[i].className == 'carousel-controls') {
      var caroKids = carousels[i].childNodes;
      for (var j = 0; j <  caroKids.length; j++) {
        if (caroKids[j].style)
          caroKids[j].style.display = hideFeatured ? 'none' : '';
      }
    }
  }
  // set the button text to match the show/hide state
  var showHideA = document.getElementById('showFeatured');
  if (showHideA) {
    showHideA.innerHTML = hideFeatured ? '+' : '-';
    showHideA.blur();
  }
}

function ForceResultsParams() {
  var wantRefresh = false;

  // if these values are strange there can be reload loops, so fix them.
  // It would be better to check these against live values in the sort header but those are not on all pages.

  var sortOrder = GetCookie('sortBy');
  if (!~['relevance_desc', 'created_at_desc', 'created_at_asc', 'price_asc', 'price_desc', 'name_asc', 'name_desc',
         'prim_count_asc', 'prim_count_desc', 'average_rating_desc', 'sales_rank_asc'].indexOf(sortOrder))
    sortOrder = 'relevance_desc';
  SetCookie('sortBy', sortOrder); // refresh

  // If the link came from outside, display parameters could be the defaults.
  if (/^\/?products\/search$/.test(window.location.pathname) || /^\/?stores\/\d+$/.test(window.location.pathname)) {

// XXX skipping this for now, some browsers do not like it.
//     var parsed = GetParams(window.location.search);

//     if (!parsed['search[sort]'])
//       parsed['search[sort]'] = 'relevance_desc';
//     if (parsed['search[sort]'] != sortOrder) {
//       parsed['search[sort]'] = sortOrder;
//       wantRefresh = true;
//     }
    
    if (wantRefresh) {
      var newSearch = '?';
      for (var key in parsed)
        newSearch += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parsed[key]);
      window.location.search = newSearch; // reload the page
    }
  }

  // fix up the search form
  var searchForm = document.getElementById('search');
  if (searchForm) {
    var forms = searchForm.getElementsByTagName('form');
    var newLink = document.createElement('a');
    for (var i = 0; i < forms.length; i++) {
      newLink.href = forms[i].action;
      if (/^\/?products\/search$/.test(newLink.pathname))
      forms[i].appendChild(BuildTag('input', {type: 'hidden', name: 'search[sort]', value: sortOrder}));
      break;
    }
  }

  matureCookie = (GetCookie('overrideMature') == 'true');

  // change all search and store links to saved items per page
  var tags, i;
  tags = document.getElementsByTagName('a');
  for (i = 0; i < tags.length; i++) {
    if (window.location.hostname != tags[i].hostname) continue;
    if (/^\/?products\/search$/.test(tags[i].pathname) ||  /^\/?stores\/\d+$/.test(tags[i].pathname)) {
      var parsed = GetParams(tags[i].search);
      parsed['search[sort]'] = sortOrder;        
      tags[i].search = '?';
      for (var key in parsed)
        tags[i].search += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parsed[key]);
    }
  }

  // SLM bugfix: for the category sidebar links, make sure they go to page 1.
  var searchCat = document.getElementById('search-category');
  if (searchCat) {
    tags = searchCat.getElementsByTagName('a');
    for (i = 0; i < tags.length; i++) {
      if (window.location.hostname != tags[i].hostname) continue;
      if (/^\/?products\/search$/.test(tags[i].pathname)) {
        var parsed = GetParams(tags[i].search);
        parsed['search[page]'] = '1';
        tags[i].search = '?';
        for (var key in parsed)
          tags[i].search += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parsed[key]);
      }
    }
  }
}

function SaveResultsParam() {
  var selectVal;

  if (/(^|\s)sort-by(\s|$)/.test(this.className)) {
    selectVal = document.getElementById('search_sort_id');
    if (selectVal)
      SetCookie('sortBy', selectVal.options[selectVal.selectedIndex].value);
  }
  else
    return;
}

function SetupSearchEventListeners() {
  var i;

  var container = document.getElementById('search-results-container');
  if (!container)
    return;

  var tags = container.getElementsByTagName('span');
  if (tags) {
    for (i = 0; i < tags.length; i++) {
      if (tags[i].className && /(^|\s)sort-by(\s|$)/.test(tags[i].className)) {
        tags[i].addEventListener('change', SaveResultsParam, false);
        break;
      }
    }
  }
}

// Add "search in this category"
function AddCurrentCategory() {
  var thisCatText = "This category"; // no I18N, but better than hovercfrafts full of eels.
  var currentCat = '1'; // all categories
  var parsed;

  var catDrop = document.getElementById('top_search_category_id');
  if (!catDrop)
    return;

  parsed = GetParams(window.location.search);
  if (parsed['search[category_id]']) {
    currentCat = parsed['search[category_id]'];
    // try to find the cat
    var catTags = document.getElementsByClassName('current-category');
    if (catTags.length) {
      if (catTags[0].nodeName == 'SPAN')
        thisCatText = catTags[0].innerHTML;
    }
  }
  else {
    var breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
      var tags = breadcrumb.getElementsByTagName('a');
      if (tags.length) {
        parsed = GetParams(tags[tags.length - 1].search);
        if (parsed['search[category_id]']) {
          currentCat = parsed['search[category_id]'];
          thisCatText = tags[tags.length - 1].innerHTML;
        }
      }
    }
  }

  if (currentCat != '1') { // no need to add if category is All
    // Add it to the search form if it is not there, else activate it
    var newOption = document.createElement('option');
    newOption.value = parsed['search[category_id]'];
    newOption.innerHTML = thisCatText;
    catDrop.insertBefore(newOption, catDrop.firstChild);
    catDrop.selectedIndex = 0;
  }

  // try to get a current store too
  var storeID = null;
  var mat;

  mat = window.location.pathname.match(/^\/?stores\/\d+$/); // from our custom search
  if (mat) {
      storeID = mat[0].split('/').pop();
  }
  else if (parsed['search[store_id]']) { // standard store page
      storeID = parsed['search[store_id]'];
  }
  else { // try on product pages
    var merchBox = document.getElementById('merchant-box');
    if (merchBox) {
      var merchLinks = merchBox.getElementsByTagName('a');
      if (merchLinks.length) {
        mat = merchLinks[0].pathname.match(/^\/?stores\/\d+$/);
        if (mat)
          storeID = mat[0].split('/').pop();
      }
    }
  }

  if (storeID) {

    var newCheck = document.createElement('div');
    newCheck.setAttribute('style', 'float:right');
    newCheck.style.height='0px';
    newCheck.style.paddingRight='50px';
    newCheck.style.textAlign='right';
    newCheck.innerHTML = '<label style="clear:none;float:none" for="searchInStore"> This store</label>'
        + '<input id="searchInStore" type="checkbox" name="search[store_id]" value="'
        + storeID + '">' ;
    catDrop.parentNode.parentNode.insertBefore(newCheck, catDrop.parentNode);

    var searchInStore = document.getElementById('searchInStore');
    if (searchInStore)
      searchInStore.addEventListener('click', ToggleSearchInStore, false);
  }
}

// for switch to and from search in this store
function ToggleSearchInStore() {
  var searchForm = document.getElementById('search');
  if (searchForm) {
    var forms = searchForm.getElementsByTagName('form');
    if (forms.length) {
      if (this.checked)
        forms[0].action = '/stores/' + this.value;
      else
        forms[0].action = '/products/search';
      GM_log('after: ' + forms[0].action);
    }
  }
}


SetupSearchEventListeners();
ForceResultsParams();
AddCurrentCategory();
ShowKeywords();
SetupShowFeatured();
