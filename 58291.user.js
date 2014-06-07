// No Manager of the Week
// version 1.3
// 2009-09-24
// Copyright (c) 2009, Roy Mahabick (1.FC Bundestag)
// contact: in game: Roy Mahabick or 1.FC Bundestag
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Manager of the Week", and click Uninstall.
//
// --------------------------------------------------------------------
//

// ==UserScript==
// @name           No Manager of the Week
// @namespace      Manager
// @description    Verhindert das Anzeigen des Managers of the Week
// @include        http://fussballcup.de/index.php*
// ==/UserScript==

//Regular Expression, global to speed up (what ever :) )
  var fraud_re = new RegExp(".(cred(i|t|s)+|\\d{3,} c\\.).","im");
  var true_prem = new RegExp(".tournament_premium.","im");

//function by... verdammicht, vergessen!
function getElementsByClassName(class_name,tag_name)
{
  var all_obj,ret_obj=new Array(),j=0,teststr;

  if(document.all)all_obj=document.all;
  else if(document.getElementsByTagName && !document.all)
    all_obj=document.getElementsByTagName(tag_name);

  for(i=0;i<all_obj.length;i++)
  {
    if(all_obj[i].className.indexOf(class_name)!=-1)
    {
      teststr=","+all_obj[i].className.split(" ").join(",")+",";
      if(teststr.indexOf(","+class_name+",")!=-1)
      {
        ret_obj[j]=all_obj[i];
        j++;
      }
    }
  }
  return ret_obj;
}

//quick and dirty!
(function()
{
  //remove premium ad at the left corner everywhere
  if(document.getElementById("Help")){
     document.getElementById("Help").style.display = "none";}

  //get the url of the document
  var site_mod = document.URL.split("&")[2].split("=")[1];
  var site_action = document.URL.split("&")[3].split("=")[1];

  if(site_mod == "main" && site_action == "index"){
    disable_premium_ad();
    disable_motw();
  }
  else if(site_mod == "tournament" && site_action == "index"){
    anti_fraud();
  }
})()

//at the Trunier-Tab
function anti_fraud()
{
    var turnier_table = document.getElementsByTagName("td");
    for (i = 1; i < turnier_table.length; i++){
	if(fraud_re.test(turnier_table[i].innerHTML) == true && !true_prem.test(turnier_table[i-1].innerHTML)){
	  turnier_table[i].innerHTML = "<strong>Abzocke!</strong><br/>" + turnier_table[i].innerHTML +"<br/><strong>Abzocke!</strong>";
	  turnier_table[i].style.color = "red";
	}
    }

}

//close Manager der Woche
function disable_motw()
{
  var posts = getElementsByClassName("CntBox","div");
  var regexe = new RegExp(".elo-rang.","im")
  for (i = 0; i < posts.length; i++)
  {
	    if(regexe.test(posts[i].innerHTML) == true){
	      posts[i].style.display = "none";
	      posts[i].previousSibling.style.cursor = "pointer";
	      posts[i].previousSibling.setAttribute("onclick","if(this.nextSibling.style.display == 'none'){this.nextSibling.style.display = 'block';}else{this.nextSibling.style.display = 'none';}");
	  }
	  
  }
}

//close Premium advertisement
function disable_premium_ad()
{
  //if the message is premium ad, dont show
  var clean_info = getElementsByClassName("CntBoxMessage","div");
  var premium = new RegExp(".Premium Credits bringen Vorteile.","im")
  if(clean_info){
  if(premium.test(clean_info[0].innerHTML) == true){
    clean_info[0].style.display = "none";
    clean_info[0].previousSibling.innerHTML += " (Werbung)";
    clean_info[0].previousSibling.style.cursor = "pointer";
    clean_info[0].previousSibling.setAttribute("onclick","if(this.nextSibling.style.display == 'none'){this.nextSibling.style.display = 'block';}else{this.nextSibling.style.display = 'none';}");	
  }}

}

//Main

//ChangeLog
//2009-09-23 - 1.3 - ROYM - recoded
//2009-09-23 - 1.2 - ROYM - add credit-fraud detection
//2009-09-23 - 1.1 - ROYM - added stuff to remove the premium ad stuff
//2009-09-23 - 1.0 - ROYM - written & release