// ==UserScript==
// @name          Facebook easy like
// @description   Like any page on the web!
// @include       *
// @version       1.0
// ==/UserScript==

//don't append the bar if it's an iframe
if (window.top != window.self)
{
  exit;
}

base_url = getBaseURL();

//don't display the bar on facebook.com
if (base_url == 'http://www.facebook.com/' || base_url == '/')
{
  exit;
}

//assigning event handlers need a timeout so they don't die
setTimeout(assignClickHandler, 100);

var base_url = getBaseURL(window.location);

//define the HTML/CSS that needs to be prepended to the current page
var output_markup = '';
output_markup = '<div style="z-index: 9999; position: fixed; width: 100%; top: 0px; left: 0px; height: 23px; padding: 3px; background-color: #E5E5E5; font-family: tahoma; color: #3B5998; font-size: 13px; opacity: 0.90; filter:alpha(opacity=90);">' +
         '<div style="float: left; font-weight: bold; margin: 2px 15px 0px 0px;"><div style="color: #fff; margin: 0px 5px 0px 5px; float: left;"><a href="#" onclick="return false;" id="socialInfo" style="color: #9E9E9E;"></a></div><div style="float: left; clear: none;">'+ '</div></div>' +
         '<div style="float: left;"><iframe src="http://www.facebook.com/plugins/like.php?href=https://www.facebook.com/United.Hacing.Kingdom&layout=standard&show_faces=false&width=450&action=like&colorscheme=light&height=25" scrolling="no" frameborder="0" style="border: none; width: 450px; height: 40px;" allowTransparency="true"></iframe></div>' +
         '</div>' + '</div>';

output = document.createElement('div');
output.innerHTML = output_markup;

//prepend the markup to the body
body = document.getElementsByTagName('body')[0];
body.appendChild(output);

//buffer the top of the page so the bar doesn't overlap any content on initial load
body.style.marginTop = '29px';

//toggle Recent Activity/Recommendations sidebar on and off
function showExtraInfo() {
  obj = document.getElementById("extra-info");
  
  if (obj.style.display == "none")
  {
    obj.style.display = "";
  }
  else {
    obj.style.display = "none";
  }
  
  return false;
}

//track the click event on the plus ([+]) button in order to toggle showExtraInfo
function assignClickHandler() { 
  var clickDiv = document.getElementById('socialInfo');
  clickDiv.addEventListener("click", showExtraInfo, true);
}

//get the base URL of the site the user is currently on
function getBaseURL () {
  var url = location.href;
  var baseURL = url.substring(0, url.indexOf('/', 14));
  
  if (baseURL.indexOf('http://localhost') != -1) {
    var url = location.href;
    var pathname = location.pathname;
    var index1 = url.indexOf(pathname);
    var index2 = url.indexOf("/", index1 + 1);
    var baseLocalUrl = url.substr(0, index2);

    return baseLocalUrl + "/";
  }
  else {
    return baseURL + "/";
  }
}