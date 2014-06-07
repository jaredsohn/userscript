// ==UserScript==
// @name         Sleeme
// @version      1.2.8.2
// @description  Sleeme allows you to open only the links to images in the current tab
// @author       kostaskrev
// 
// ==/UserScript==
var allLinks = document.links;
var newhtml = '';
var images = 'jpg|jpeg|png|bmp|gif|';
var counter = 0;

for (var i=0; i<allLinks.length; i++) {

  var temphref = allLinks[i].href;
  var temp = temphref.split('.');
  var extention = temp[temp.length-1].toLowerCase();
  if ( images.indexOf(extention) != -1){
    newhtml+= '<img src="'+ temphref + '" title="'+allLinks[i].title+'"><br/><br/>';
    counter++;
  }
}



if (counter == 0){
  alert('No image links found!');
}

var output = '<html><head><link rel="stylesheet" href="http://kkrev.net63.net/sleeme/style.css?ver=" type="text/css" /></head><body class="body" style="">';
output += '<div id="toolbar">';
output += '<ul><li><a href="#">' + counter + ' pictures found!</a></li>';
output += '<li>Remember to <a href="http://kkrev.net63.net" target="_blank">donate Kostas Krevatas</a></li>';
//output += '<li>Download your images with a plugin like <a href="https://addons.mozilla.org/en-US/firefox/addon/downthemall/" target="_blank" class="dta_a" style="">DownthemAll</a></li>';
output += '<li><a href="javascript:var s = document.createElement(\'script\');s.type=\'text/javascript\';document.body.appendChild(s);s.src=\'file:///c:/Users/Kostas/Desktop/Document2.js\';void(0);">Bookmark</a></li>';
output += '</ul>';
output += '</div><div id="content">';
output += newhtml ;
output += '</div></body>';

document.open("text/html","replace");
document.write(output);
document.close();
