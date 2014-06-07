// ==UserScript==
// @name           Facebook background changer
// @namespace      com.ishammohamed.FBbackchanger
// @description    this script to change the background of facebook with time (day/night)
// @version        1.0
// @include        https://www.facebook.com/*
// ==/UserScript==


var currentTime = new Date().getHours();
var adz= document.querySelector('div[class="uiContextualLayerParent"]');
      if (7 <= currentTime&&currentTime < 20) {
       var img = document.createElement("img");
	img.src = "http://www.hdwallpapers.in/walls/bright_day_light-wide.jpg";
	adz.appendChild(img);

      }
      else {
var img = document.createElement("img");
	img.src = "http://wallpaperdreams.com/wallpapers/artistic_night_scene_of_a_gibbous_moon_in_a_sky_with_purple_and_pink_clouds_behind_the_black_silhouette_of_a_tree_on_a_hill.2560x1600.11f84446.jpg";
	adz.appendChild(img);
      }


