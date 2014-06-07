// ==UserScript==
// @name Link to RubyGems on GitHub
// @version 1
// @namespace http://higher.lv
// @description Tries to guess link to rubygems and adds it to Github page
// @include https://github.com/*
// @include http://github.com/*
// @copyright BSD
// ==/UserScript==

(function() {
  var gemspec_url = document.querySelector("a[href$='.gemspec']");
  if(gemspec_url === null) return;

  var gem_name = gemspec_url.href.match(/\/([^\/]+)\.gemspec/);
  if(gem_name === null) return;

  gem_name = gem_name[1];

  var pagehead_actions = document.querySelector(".pagehead-actions");
  if(pagehead_actions === null) return;

  var rubygems_link_a = document.createElement('a');
  rubygems_link_a.href = 'https://rubygems.org/gems/' + gem_name;
  rubygems_link_a.className = 'minibutton';

  var text_node = document.createTextNode('RubyGems');
  rubygems_link_a.appendChild(text_node);

  var rubygems_link_li = document.createElement('li');
  rubygems_link_li.appendChild(rubygems_link_a);

  pagehead_actions.insertBefore(rubygems_link_li, pagehead_actions.firstChild);
}());