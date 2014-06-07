// ==UserScript==

// @name          UMN New Web Design Links
// @author        Karl Swedberg <http://www.englishrules.com/>
// @description	  Get new links from UMN Web Design References and put them at the top of each page.
// @include       http://*.umn.edu/itss/support/Training/Online/webdesign*
// ==/UserScript==

(

function() {
/*  var script_file = document.createElement("script");
  script_file.src = "http://www.englishrules.com/scripts/jquery.js";
  script_file.type="text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script_file);
  var new_button = document.createElement("input");
  new_button.setAttribute("type","submit");
  new_button.setAttribute("value","new items");
  */ 
  

  var breadcrumb_div = document.getElementById('breadcrumbs'); 
  if (!breadcrumb_div) return;
  var breadcrumb_ul = document.createElement('ul');
  breadcrumb_div.appendChild(breadcrumb_ul,breadcrumb_div);
  var new_img = document.getElementsByTagName('img');
  for (var i=0; i < new_img.length; i++) {
    if (new_img[i].getAttribute('src') == "images/newyellow.gif" ) {
      var new_lis = new_img[i].parentNode;
      new_lis.setAttribute('style','background:#ffe');         
      breadcrumb_ul.appendChild(new_lis,breadcrumb_ul);        
    };
  };


  
}
)();



