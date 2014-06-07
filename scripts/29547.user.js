// ==UserScript==
// @name           GLB Forum Favorites
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/forum_thread*
// @include        http://goallineblitz.com/game/forum_main.pl*
// ==/UserScript==

var timeout = 0;

var url = window.location.href;
var parts = url.split("=");   
var current = parts[0];

window.setTimeout( function() {
   if(url != "http://goallineblitz.com/game/forum_main.pl" && url != "http://goallineblitz.com/game/forum_main.pl#"){
      // create the button
      var button = document.createElement('span');
      button.setAttribute("class","fav");
      button.innerHTML = "Add to Favorites";   
      button.addEventListener('click', addFavorite, false);

      // check if the page_selectors element is found
      // threads with only 1 page do not have the page_selectors element
      var page_selectors = getElementsByClassName("page_selectors", document);
      if(page_selectors.length == 0){      
         // page_selectors not found, create a new page_selectors and clear element
         var div = document.createElement('div');
         div.setAttribute('class', 'page_selectors');
         var clear = document.createElement('div');
         clear.setAttribute('class', 'clear');
         
         // insert the new page_selectors element
         var content_container = getElementsByClassName("post content_container", document);
         if(content_container.length >0){
            content_container[0].parentNode.insertBefore(div, content_container[0]);
            content_container[0].parentNode.insertBefore(clear, content_container[0]);            
         }else{
            var forums = getElementsByClassName("forums", document);
            if(forums.length > 0){
               forums[0].parentNode.insertBefore(div, forums[0]);
               forums[0].parentNode.insertBefore(clear, forums[0]);               
            }else{
               var threads = document.getElementById("threads");
               threads.parentNode.insertBefore(div, threads);
               threads.parentNode.insertBefore(clear, threads);                
            }
         }
         
         page_selectors = getElementsByClassName("page_selectors", document);
      }
      
      // insert the button into the page
         page_selectors[0].parentNode.insertBefore(button, page_selectors[0]);
   }

   // add pop up link
   var link = document.createElement('a');
   link.setAttribute('href', '#');
   link.innerHTML = "Forum Favorites";
   link.addEventListener('click', showFavoritesList, false);

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " | ";
   subhead_link_bar[0].appendChild(link);

   // create the popup
   var popUpFavs = document.createElement('div');
   popUpFavs.setAttribute("id","popUpFavs");
   popUpFavs.setAttribute("style","display:none;background-color:#FBFBF8;padding:0px");

   document.body.insertBefore(popUpFavs, document.body.firstChild);
   
   var wint = (screen.height-300)/2;
   var winl = (screen.width-600)/2;   

   var css = '.fav{color:blue;cursor:pointer;float:left;padding:5px;background-color:#EEE;border:1px solid #A0A0A0;}' +
      '.fav:hover {color:red;}' +
      '#popUpFavs {padding:5px;border:1px solid #A0A0A0;position:absolute;top:200px;left:'+ winl +'px;;background-color:#FBFBF8;width:600px;' +
      'height:100px;z-index: 9002;}' +
      'html, body {height: 100%;}' +
      'html>body #popUpFavs {height: auto;}';

   addGlobalStyle(css);
},timeout);

function addFavorite(){
   var popUpFavs = document.getElementById("popUpFavs");
   var isOpen = false;
	if ( popUpFavs.style.display != 'none' ){
      toggle();
      isOpen = true;
   }
   
   var favoriteAddresses = [];
   var favoriteTitles = [];
   
   // get the thread address
   var url = window.location.href;
   var left = url.split("&");   
   var address = left[0];
   
   // get the thread title
   var big_head = getElementsByClassName("big_head subhead_head", document);
   var re = /(.+)<\/a>\s&gt;\s(.+)/;
   var matches = big_head[0].innerHTML.match(re);
   var title = matches[2];
   
   title = title.replace(/,/g, "&x;");
   
   if(address.indexOf("#") == address.length-1) address = address.replace("#", "");

   // check for saved favorites
   var savedAddresses = GM_getValue("favoriteAddresses", "");
   var savedTitles = GM_getValue("favoriteTitles", "");
   if(savedAddresses == ""){      
      // create a new list
      favoriteAddresses.push(address);
      favoriteTitles.push(title);
   }else{
      // add to the existing list
      favoriteAddresses = savedAddresses.split(",");
      favoriteTitles = savedTitles.split(",");
      if(!indexInArray(favoriteAddresses, address)){
         favoriteAddresses.push(address);
         favoriteTitles.push(title);
      }
   }
   
   GM_setValue("favoriteAddresses", favoriteAddresses.join());
   GM_setValue("favoriteTitles", favoriteTitles.join());
   
   if(isOpen) showFavoritesList();
}

function showFavoritesList(){
   var color;
   var popUpFavs = document.getElementById("popUpFavs");
   var savedAddresses = GM_getValue("favoriteAddresses", "");
   var savedTitles = GM_getValue("favoriteTitles", "");
   if(popUpFavs.style.display == 'none' && savedAddresses != ""){   
      // get the saved thread addresses and titles      
      var favoriteAddresses = savedAddresses.split(",");
      var favoriteTitles = savedTitles.split(",");
      
      // create the table to display the favorites
      var table = document.createElement('table');
      table.setAttribute("style","width:100%;background-color:#FFF;overflow:scroll;border:1px solid #000;");
      table.setAttribute("cellspacing","1");
      table.setAttribute("cellpadding","5");
      var tr = document.createElement('tr');      
      var td = document.createElement('td');
      td.setAttribute("style","text-align:center;background-color:#8F3210;color:#FFF");
      td.setAttribute("colspan","2");

      var closePopup = document.createElement('a');
      closePopup.setAttribute("href","#");
      closePopup.setAttribute("style","float:right;padding-right:5px;color:white;");
      closePopup.innerHTML = "close";
      closePopup.addEventListener('click', toggle, false);
      
      td.appendChild(closePopup); 
      var txt = document.createTextNode('Saved Favorites');
      td.appendChild(txt); 
      //td.innerHTML = 'Saved Favorites';
      
      tr.appendChild(td);
      table.appendChild(tr);
      
      for(var i = 0;i<favoriteAddresses.length;i++){
         (i%2)== 0?color='#FFF':color='#EEE'
         tr = document.createElement('tr');      
         td = document.createElement('td');
         td.setAttribute("style","width:80%;text-align:left;background-color:" + color);         
         var a = document.createElement('a');
         if(favoriteAddresses[i].indexOf("forum_thread_list") > 0){
            a.setAttribute("href",favoriteAddresses[i]);
         }else{
            a.setAttribute("href",favoriteAddresses[i] + "&page=last");
         }
         // title = title.replace(",", "&x;");
         var title = favoriteTitles[i];
         a.innerHTML = title.replace(/&x;/g, ",");
         td.appendChild(a);
         tr.appendChild(td);
         
         td = document.createElement('td');
         td.setAttribute("style","width:20%;background-color:" + color);
         
         var del = document.createElement('a');
         del.setAttribute("href","#");
         del.setAttribute("title","delete " + favoriteTitles[i]);
         del.innerHTML = "delete";        
         del.addEventListener('click', (function(n) {
      		return function (e) {
      			e.preventDefault();
      			deleteFavorite(n);
      		};
      	})(i), false);
         td.appendChild(del);
         tr.appendChild(td);
         table.appendChild(tr);
      }
      
      // add the table to the pop up
      popUpFavs.appendChild(table);
      
      toggle();
   }else{
      if(popUpFavs.style.display != 'none') alert("no favorites found");
   }
}

function deleteFavorite(arg){
   // close the current popup
   toggle();
   var newAddresses = [];
   var newTitles = [];
   
   // remove the favorite from the list
   var savedAddresses = GM_getValue("favoriteAddresses", "");
   var savedTitles = GM_getValue("favoriteTitles", "");
   
   var favoriteAddresses = savedAddresses.split(",");
   var favoriteTitles = savedTitles.split(",");
   
   for(var i = 0;i<favoriteAddresses.length;i++){
      if(i != arg){
         newAddresses.push(favoriteAddresses[i]);
         newTitles.push(favoriteTitles[i]);
      }
   }
   
   // save the new lists
   GM_setValue("favoriteAddresses", newAddresses.join());
   GM_setValue("favoriteTitles", newTitles.join());
   
   // show the popup
   showFavoritesList();
}

function toggle() {   
	var popUpFavs = document.getElementById("popUpFavs");
	if ( popUpFavs.style.display == 'none' ){
      popUpFavs.style.display = 'block';
   }else{
      popUpFavs.innerHTML = '';
      popUpFavs.style.display = 'none';
   }
}

function indexInArray(theArray, theValue){
   var arLength = theArray.length;
   for(var i=0;i<theArray.length;i++){
      if(theArray[i] == theValue) return true;
   }   
   return false;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};