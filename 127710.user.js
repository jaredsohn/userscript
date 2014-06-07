// ==UserScript==
// @name            Geocaching Map Lightness
// @description     Allows you to change lightness of Geocaching map so you can see caches' icons better.
// @version         0.9.2
// @author          jenda^^
// @homepage        http://www.ovecka.maweb.eu/
// @include         http://www.geocaching.com/map*
// ==/UserScript==

//changes:
//0.9.2
// fix: due some changes on GC map, older zoom levels were still visible
//
//0.9.1
// fix: bugs in hiding and displaying layers

var lightness_opacity=localStorage.getItem('lightness_value');
if (lightness_opacity==null)
{
  lightness_opacity=1;
}

//initial steps:
//- display opacity slider
//- set map background to black
//- add listener to map
//- initialize
function lightness_mod()
{
  document.getElementsByClassName('ui-block-b')[0].innerHTML+='<div class="LogIn">Map lightness: <input type="range" min="0" max="10" value="'+Math.floor(lightness_opacity*10)+'" onchange="lightness_change(this);" style="margin:0" /></div>';
  document.head.innerHTML+='<style>.leaflet-container { background: #000 !important; }</style>';
  document.getElementById('map_canvas').addEventListener("DOMNodeInserted", lightness_set, false);
  lightness_set();
}

function lightness_set()
{
  //find layers with map tiles
  var light_layers = document.getElementsByClassName('leaflet-layer');
  var zind=0;
  
  //check which layers are topmost
  for (i=light_layers.length-1; i>=0; i--)
  {
    var ztmp = parseInt(light_layers[i].parentElement.style.zIndex);
    if (zind<ztmp)
      zind=ztmp.toString();
  }
  //set opacity
  for (i=light_layers.length-1; i>=0; i--)
  {
    try {
      //smooth opacity transition
      //disabled, overloads CPU more and more as you pan with map :(
      //var transition = new L.Transition(light_layers[i]);
      
      //topmost layers
      if (light_layers[i].parentElement.style.zIndex == zind)
      {
        //layers not containin map.tile are map layers, so set opacity
        if (light_layers[i].innerHTML.indexOf('map.tile')==-1)
        {
          //transition.run({opacity:lightness_opacity});
          light_layers[i].style.opacity = lightness_opacity;
        }
        else
          //transition.run({opacity:1});
          light_layers[i].style.opacity = 1;
      } else {
        //other layers are invisible
        //transition.run({opacity:0});
        light_layers[i].style.opacity = 0;
      }
    } catch (e) { }
  }
}

function lightness_change(sender) 
{
  lightness_opacity=sender.value/10;
  localStorage.setItem('lightness_value', lightness_opacity);
  lightness_set();
}

if (document.addEventListener)
{ 
  window.addEventListener("DOMContentLoaded", lightness_mod, false);
}