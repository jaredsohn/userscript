// ==UserScript==
// @name          Inkbunny Lite
// @namespace     Krechevskoy
// @description   Modifies Inkbunny to have a more low profile early 90's feel.
// @include       *inkbunny.net/*
// ==/UserScript==

//Define a few potentially helpful functions here
function getByTag(name,index){
  return document.getElementsByTagName(name)[index];
}

function getByClass(name,index){
  return document.getElementsByClassName(name)[index];
}

function removeByID(name){
  var node = document.getElementById(name);
  
  if(node) {
    node.parentNode.removeChild(node);
    node = null;
  }
}

function removeByClass(name) {
  var nodes = document.getElementsByClassName(name);
  
  for(i=0; i < nodes.length; i++){
    nodes[i].parentNode.removeChild(nodes[i]);
  }
  nodes=null;
}

/**********************************/
/**Start redecorating like crazy!**/
/**********************************/
var temp;

//Remove various unneeded things
removeByID('brush_border');
removeByID('createribbons');
removeByClass('bgbrowser');
removeByClass('notification_clear');
removeByClass('sales_usernavigation');
removeByClass('logout_usernavigation');
removeByClass('bookshelf_usernavigation');

//Remove page size limits
temp = document.getElementsByClassName('elephant');
for(i = 0;i<temp.length;i++){
  temp[i].style.width = "auto";
  temp[i].style.margin = "0";
}

//Change the background image/color
temp = getByTag('body',0);
temp.style.backgroundImage = "none";
temp.style.background = "#2E3B41";
temp.style.minWidth = "962px";
temp.style.width = "962px";
temp.style.margin = "auto";

//Move the header around
temp = getByClass('mainnavigation',0);
temp.style.margin = "0";
temp.style.width = "100%";
temp.style.height = "135px";
temp.style.overflow = "hidden";

//Move the banner around a bit
temp = getByClass('inkbunny_navigation',1);
temp.style.backgroundPosition = "top right";
temp.style.width = "220px";
temp.style.left = "0px";
temp.style.zIndex = "-1";
temp = getByClass('inkbunny_navigation',0);
temp.style.left = "150px";

//Move and resize the notification panels
temp = getByClass('notificationnavigation',0);
temp.style.width = "auto";
temp.style.left = "auto"
temp.style.right = "5px";
temp.style.bottom = "0px";

//Move and resize the SSL notifications as well
temp = getByClass('sslnotificationnavigation',0);
temp.style.position = "absolute";
temp.style.width = "auto";
temp.style.left = "auto"
temp.style.right = "5px";
temp.style.bottom = "0px";

//Move the primary navigation buttons
temp = getByClass('search_navigation',0);
temp.style.left = "auto";
temp.style.right = "15px";
temp.style.top = "22px";

temp = getByClass('artists_navigation',0);
temp.style.left = "auto";
temp.style.right = "117px";
temp.style.top = "27px";

temp = getByClass('popular_navigation',0);
temp.style.left = "auto";
temp.style.right = "248px";
temp.style.top = "20px";

temp = getByClass('latest_navigation',0);
temp.style.left = "auto";
temp.style.right = "378px";
temp.style.top = "24px";

//Recolor the user navigation bar
temp = getByClass('usernavigation',0);
temp.style.backgroundColor = "#6A7283";
temp.style.border = "1px solid #1b2326";
temp.style.borderBottom = "none";
temp = getByClass('background',0);
temp.parentNode.removeChild(temp);

//Put page title to the right
temp = getByClass('heading',0);
temp.style.left = "auto";
temp.style.right = "0px";

//Rearrange the userbar and replace the bulky buttons with text
temp = getByClass('userdetailsnavigation',0);
temp.style.display = "inline";
temp.style.left="30px";
var cells = temp.getElementsByTagName("td");
var inners = "<tbody>\n<tr>";
inners += "<td class='usericon_userdetails'>\n";
inners += cells[1].innerHTML+"</td>\n";
inners += "<td class='username_userdetails'>\n";
inners += cells[0].innerHTML+"</td>\n";
inners += "<td class='profile_userdetails'>\n"
inners += cells[2].innerHTML+"</td>\n";
inners += "<td class='account_userdetails'>\n"
inners += cells[3].innerHTML+"</td>\n";
inners += "<td><a class='nav_link' href='http://inkbunny.net/post.php'>Submit</a></td>"
inners += "<td><a class='nav_link' href='http://inkbunny.net/sales_process.php'>Check Sales</a></td>"
inners += "<td><a class='nav_link' href='http://inkbunny.net/collection_process.php'>View Library</a></td>"
inners += "<td><a class='nav_link' onClick='if (confirm(\"Are you sure you want to Log Out?\")) $(\"logout_form\").submit();'>Logout</a></td>"
inners += "</tr>\n</tbody>\n";
temp.innerHTML = inners;

//Add a style to control the links in the usernav 
GM_addStyle(".usernavigation a, .usernavigation a:visited {font-weight:bold;color:#2E3B41; border:none;} .usernavigation a:hover,.usernavigation a:active{color: #0E1B21;} .userdetailsnavigation td{padding-left: 12px;}");

//Resize that pesky username column
temp = getByClass('username_userdetails',0);
temp.style.width = "auto";
temp.style.paddingLeft = "15px";
temp.style.paddingRight = "8px";

//Resize the body of the pages and border them to match
GM_addStyle(".elephant .background .middle{width:100%;}.shadow,.background .top,.background .bottom{display: none !important;}.elephant{border-left:1px solid #1b2326;border-right:1px solid #1b2326;}.elephant_top{margin-top: 0px !important;} .elephant_bottom{margin-bottom: 0px !important;} .elephant_bottom .background .middle{bottom: 0;} .elephant_top .background .middle{top: 0;}");

//Removes unneeded secondary headers
temp = getByClass('heading',1);
temp.style.display = 'none';