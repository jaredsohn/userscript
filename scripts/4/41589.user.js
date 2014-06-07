// GitHub Favorites
// version 0.1 (Whiny Whale)
// 2008-09-18
// Copyright (c) 2008, August Lilleaas
// Released under the MIT license
// http://www.opensource.org/licenses/mit-license.php
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GitHub Favorites", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           GitHub Favorites
// @namespace      http://www.github.com/*
// @description    Add GitHub projects to a favorites list. Avoid clutter in your RSS feed.
// @include        http://www.github.com/*
// @include        http://github.com/*
// @include        https://www.github.com/*
// @include        https://github.com/*
// ==/UserScript==

// Check if jQuery's loaded. Thank you, http://www.joanpiedra.com/jquery/greasemonkey/
if(typeof unsafeWindow.jQuery == 'undefined') {
  window.setTimeout(canHasJQuery,100)
} else { 
  $ = unsafeWindow.jQuery
  letsJQuery()
}

function currentProjectName(){
  // This regexp can probably be simplified
  var projectName = /^http[s]?:\/\/[www\.]?github.com\/([\w-]+\/[\w-]+)/.exec(document.location)[1]
  return projectName
}

function isCurrentProjectFavorite(){
  var allProjects = listOfFavoriteProjectsAsArray()
  var currentProject = currentProjectName()
  
  for (var i=0, il=allProjects.length; i<il; i++) {
    if (allProjects[i] == currentProject) {
      return true
    }
  }
  
  return false
}

// Returns the stored data, or an initial empty array.
function listOfFavoriteProjectsAsArray(){
  var stored = GM_getValue('favoriteProjects')
  if (stored) {
    return stored.split(',')
  } else {
    return []
  }
}

function addFavorite(name){
  window.setTimeout(function() {
    if (!isCurrentProjectFavorite()){
      var favoriteProjectsAsArray = listOfFavoriteProjectsAsArray()
      favoriteProjectsAsArray.push(currentProjectName())
      console.log(favoriteProjectsAsArray)
      GM_setValue('favoriteProjects', favoriteProjectsAsArray.toString())
    }
    
  }, 0);
}

function removeFavorite(name){
  window.setTimeout(function() {
    if (isCurrentProjectFavorite()){
      var favoriteProjectsAsArray = listOfFavoriteProjectsAsArray()
      var favoriteProjectsAsArray = $.grep(favoriteProjectsAsArray, function(item, index){
        return item != currentProjectName()
      })
      GM_setValue('favoriteProjects', favoriteProjectsAsArray.toString())
    }
  })
}

function addCurrentProjectToFavorites(){
  $("#add_favorite").hide()
  $("#remove_favorite").show()
  addFavorite(currentProjectName())
}

function removeCurrentProjectFromFavorites(){
  $("#add_favorite").show()
  $("#remove_favorite").hide()
  removeFavorite(currentProjectName())
}

// 
// GUI STUFF
// 

function createButtons(){
  createButton("add_favorite", "github_favorite.png", addCurrentProjectToFavorites)
  createButton("remove_favorite", "github_unfavorite.png", removeCurrentProjectFromFavorites)
  
  isCurrentProjectFavorite() ? $("#remove_favorite").show() : $("#add_favorite").show()
}

function createButton(id, imageName, clickFunction){
  var button = $("<a href='#'></a>")
  button.attr('id', id)
  var image = $("<img class='button' />")
  image.attr('src', "http://lilleaas.net/greasemonkey/github/" + imageName)
  
  button.append(image)
  button.click(function(){
    clickFunction()
    return false
  })
    
  $("#repos .title .path").append(button)
  button.hide()
}

function renderList(){
  var favoriteList = $("<div class='repos favorites'></div>")
  favoriteList.append('<h1>Favorite Repositories</h1>')
  var innerList = $('<ul></ul>')
  $.each(listOfFavoriteProjectsAsArray(), function(index, item){
    var accountName = item.split("/")[0]
    var projectName = item.split('/')[1]
    
    var listItem = $('<li></li>')
    listItem.attr('class', 'public')
    
    var accountLink = $("<a></a>")
    accountLink.html(accountName)
    accountLink.attr('href', '/' + accountName)
    
    var projectLink = $("<a></a>")
    projectLink.html(projectName)
    projectLink.attr('href', '/' + accountName + '/' + projectName + '/tree')
    projectLink.css('font-weight', 'bold')
    
    listItem.append(accountLink)
    listItem.append(' / ')
    listItem.append(projectLink)
    favoriteList.append(listItem)
  })
  
  favoriteList.append(innerList)
  $("#dashboard .repos.watching").before(favoriteList)
}

// Yay, jquery!
function letsJQuery() {
  if (document.getElementById('repos')) {
    createButtons()
  } else if (document.getElementById('dashboard')) {
    renderList()
  }
}