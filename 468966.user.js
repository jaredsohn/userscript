// ==UserScript==
// @name	   VKontakte Favorite List
// @version    1.0.3
// @namespace  artslab.info
// @author     4gray
// @description Позволяет добавлять любые ссылки на боковую панель сайта ВКонтакте
// @match	  http://vk.com/*
// @match     https://vk.com/*
// @include   http://vk.com/*
// @include   https://vk.com/*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require   http://code.jquery.com/ui/1.10.4/jquery-ui.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$(document).ready(function() {

  //clean sidebar
  $('#left_ads').remove();

	addGlobalStyle('#add-link-form input {background: #FFF;color: #000;border: 1px solid #C3CBD4;padding: 3px;margin: 0px;width: 128px;}'
                   + 'ul#favorite-links {padding:0;margin:0;list-style:none;}'
                   + '#new-link-button a, #add-link-form a, #save-current-page-button a {background: #597BA5;border: none;border-radius: 2px;color: #fff;margin-top: 10px;padding: 5px;display: block;text-align: center;}'
                   + '#favorite-links li .removebtn {float: right;}'
                   + '#favorite-links li {padding: 5px;cursor: move;}'
                   + '#favorite-links li:last-child {border:none;}'
                   + '#add-link-form {display:none;}'
                   + 'div#add-link-form {margin-top: 10px;}'
                   + '#favorite-form {display:block;}'
                   + '.my-favorite-links {border-top-width: 1px; border-top-style: solid; border-top-color: rgb(238, 238, 238);}'
                   + '#favorite-link-new-tab {width:15px !important}'
                   + 'ul#favorite-links li:hover {background: #E1E7ED;border-radius:2px;}'
                   + 'ul#favorite-links li a:hover {text-decoration:none;}'
                   + '.placeholderBackground{background-color:#eee;border: 1px dashed #ccc;border-radius:2px;}');

   $("#side_bar").append('<div class="my-favorite-links">'
                          + '<ul id="favorite-links" class="connectedSortable">'
                          + '<li><a href="http://artslab.info">Artslab</a><a class="removebtn">x</a></li>'
                          + '<li><a href="http://codepen.io">Codepen</a><a class="removebtn">x</a></li>'
                          + '<li><a href="http://thenews.im/">The News</a><a class="removebtn">x</a></li>'
                          + '</ul>'
                          + '<div id="save-current-page-button">'
                          + '<a href="#">Добавить текущую страницу</a>'
                          + '</div>'
                          + '<div id="new-link-button">'
                          + '<a href="#">Добавить ссылку</a>'
                          + '</div></div>'
                          + '<div id="add-link-form">'
                          + '<label>Заголовок</label><br />'
                          + '<input id="favlink-title" placeholder="Группа, тег или сайт..." /><br />'
                          + '<label>Ссылка</label><br /><input id="favlink-url" value="http://" /><br />'
                          + '<input type="checkbox" id="favorite-link-new-tab" /> <small>Открывать в новом окне</small><br />'
                          + '<a href="#" id="favlink-add">Сохранить</a>'
                          + '</div>');

  var $ul = $('#favorite-links');
  var $title = $('#favlink-title');
  var $url = $('#favlink-url');
  var $newTab = $('#favorite-link-new-tab');
  var $pageUrl = window.location;
  var $pageTitle = $('title');
  var $saveCurrentPage = $('#save-current-page-button');
  var $add = $('#favlink-add');
  var $addLinkForm = $("#add-link-form");
  var $newLinkButton = $("#new-link-button");

  $saveCurrentPage.click(function () {

    //add new item
    $ul.append('<li><a href="'+$pageUrl+'">'+$pageTitle.text()+'</a><a class="removebtn">x</a></li>');

    //save changes to localstorage
    localStorage.setItem('vk-links', $ul.html());

  });

  //get items from local storage
  if(localStorage.getItem('vk-links')){
   $ul.html(localStorage.getItem('vk-links'));
  }

  $add.click(function () {
    //check if title not empty
    if ($title.val() != '') {
      //add new item
      if($newTab.is(':checked')) {
        $ul.append('<li><a href="'+$url.val()+'" target="_blank">'+$title.val()+'</a><a class="removebtn">x</a></li>');
      }
      else {
        $ul.append('<li><a href="'+$url.val()+'">'+$title.val()+'</a><a class="removebtn">x</a></li>');
      }

      //save changes to localstorage
      localStorage.setItem('vk-links', $ul.html());

      //reset form
      $title.val("");
      $url.val("http://");
      $newTab.prop("checked",false);
      $addLinkForm.slideToggle("100");

    }
    else {
      alert("Введите заголовок ссылки");
    }
  });

  //remove item
  $ul.on('click','.removebtn',function() {
    $(this).parent().remove();
    //save changes to localstorage
    localStorage.setItem('vk-links', $ul.html());
  });

  //form toggle
  $newLinkButton.click(function() {
    $addLinkForm.slideToggle("100");
  });

  //jquery ui sortable plugin
  $ul.sortable({
    connectWith: ".connectedSortable",
      cursor: "move",
      axis: "y",
      placeholder: 'placeholderBackground',
      opacity: 0.9,
      update: function( event, ui ) { localStorage.setItem('vk-links', $ul.html()); }
  }).disableSelection();

});