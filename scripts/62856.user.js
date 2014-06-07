// ==UserScript==
// @name           zod_autologin
// @namespace      http://userscripts.org/
// @description    Login, work, train
// @include        http://www.erepublik.com/*
// ==/UserScript==

var user_path = "http://erep.kronart.hu/zod/invitel/";

var linkek = document.getElementsByTagName("body");
var linkek_pagename = linkek[0].getAttributeNode('id').nodeValue;
switch (linkek_pagename)
{

case "fullcontent":
  //to do login begin
  GM_xmlhttpRequest({method: 'GET',url: user_path+'autologin.php',onload:function(responseDetails){
  var responseText = responseDetails.responseText;
  var tags = responseText.split('|');
  var rep_username = tags[0];
  var rep_password = tags[1];
//  alert("Login "+rep_username+" "+rep_password+" "+rep_work+" "+rep_train+" "+rep_today);
  document.getElementsByName("citizen_name")[0].value = rep_username;
  document.getElementsByName("citizen_password")[0].value = rep_password;
  setTimeout('document.getElementsByName("commit")[0].click()', 5000);
  }});
  //to do login end
  break;

case "homepage":
  GM_xmlhttpRequest({method: 'GET',url: user_path+'autotoday.php',onload:function(responseDetails){
  var responseText = responseDetails.responseText;
  var tags = responseText.split('|');
  var rep_username = tags[0];
  var rep_password = tags[1];
  var rep_work = tags[2];
  var rep_train = tags[3];
  var rep_today = tags[4];
  var rep_id = tags[5];
  if (rep_work < rep_today)
    {
//  alert("Jump to work: http://www.erepublik.com/en/my-places/company/"+rep_id);
    window.location.replace("http://www.erepublik.com/en/my-places/company/"+rep_id);
    }
  else if (rep_train < rep_today)
    {
//    alert("Jump to train: http://www.erepublik.com/en/my-places/army");
    setTimeout('window.location.replace("http://www.erepublik.com/en/my-places/army")', 10000);
    }
  else
    {
//  alert("Jump to profile: http://www.erepublik.com/en/citizen/profile/"+rep_id);
    window.location.replace("http://www.erepublik.com/en/citizen/profile/"+rep_id);
    }
  }});
  break;

case "companyprofile":
  var flag_work = "nem dolgozott";
  var linkek = document.getElementsByTagName("a");
  for (var i = 0; i < linkek.length; i++)
    {
    if (linkek[i].getAttributeNode('href') != null)
      {
      var linkek_href = linkek[i].getAttributeNode('href').nodeValue;
      if (linkek_href.indexOf('/en/work') != -1)
        {
//      alert("Work");
        setTimeout('window.location.replace("http://www.erepublik.com/en/work")', 9000);
        flag_work = "dolgozott";
        }
      }
    }
  if (flag_work == "nem dolgozott")
    {
    GM_xmlhttpRequest({method: 'GET',url: user_path+'work.php'});
    setTimeout('window.location.replace("http://www.erepublik.com/en")', 8000);
    }
  break;

case "places":
  var flag_train = "nincs edzes";
  var linkek = document.getElementsByTagName("a");
  for (var i = 0; i < linkek.length; i++)
    {
    if (linkek[i].getAttributeNode('href') != null)
      {
      var linkek_href = linkek[i].innerHTML;
      if (linkek_href.indexOf('Train') != -1)
        {
//      alert("Train");
        setTimeout('window.location.replace("http://www.erepublik.com/en/my-places/train")', 7000);
        flag_train = "edzes";
        }
      }
    }
  if (flag_train == "nincs edzes")
    {
    GM_xmlhttpRequest({method: 'GET',url: user_path+'train.php'});
    setTimeout('window.location.replace("http://www.erepublik.com/en")', 8000);
    }
  break;

default:
//  alert("default");
}



<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

include("variabile.php");

  $today = date("Ymd");
  $result = mysql_query("SELECT * FROM zod_autologin_".$prefix." WHERE last_work_day < '".$today."' OR last_train_day < '".$today."' LIMIT 1");
  mysql_query("UPDATE zod_autologin_".$prefix." SET status = 'active' WHERE status = 'actual'");
  $number = mysql_numrows($result);
  if ($number == 1)
    {
    $id_account = mysql_result($result, 0, "id_account");
    $citizen_name = mysql_result($result, 0, "citizen_name");
    $password = mysql_result($result, 0, "password");
    $last_work_day = mysql_result($result, 0, "last_work_day");
    $last_train_day = mysql_result($result, 0, "last_train_day");
    mysql_query("UPDATE zod_autologin_".$prefix." SET status = 'actual' WHERE citizen_name = '".$citizen_name."'");
    echo $citizen_name."|".$password."|".$last_work_day."|".$last_train_day."|".$today."|".$id_account;
    }
  else
    {
    $result = mysql_query("SELECT * FROM zod_autologin_".$prefix." LIMIT 1");
    $id_account = mysql_result($result, 0, "id_account");
    $citizen_name = mysql_result($result, 0, "citizen_name");
    $password = mysql_result($result, 0, "password");
    $last_work_day = mysql_result($result, 0, "last_work_day");
    $last_train_day = mysql_result($result, 0, "last_train_day");
    mysql_query("UPDATE zod_autologin_".$prefix." SET status = 'actual' WHERE citizen_name = '".$citizen_name."'");
    echo $citizen_name."|".$password."|".$last_work_day."|".$last_train_day."|".$today."|".$id_account;
    }

include("variabile_end.php");
?>
