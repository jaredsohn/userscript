// ==UserScript==
// @name           imdb age adder
// @description    Adds age of people on imdb after their date of birth.
// @namespace      znerp
// @include        http://*.imdb.com/name/*
// ==/UserScript==

months = ["znerp","January","February","March","April","May","June","July","August","September","October","November","December"]
infoDiv = document.evaluate( "//div[@class='info']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
year = parseInt(infoDiv.getElementsByTagName("a")[1].innerHTML);
date = infoDiv.getElementsByTagName("a")[0].innerHTML.split(" ");
day = date[0];
for (month = 12; month >= 0; month--) if (months[month] == date[1]) break;
if (month != 0) {
  nowDate = new Date();
  age = nowDate.getYear() + 1900 - year;
  if ((nowDate.getMonth() + 1 - month) < 0)
    age--;
  else if ((nowDate.getMonth() + 1 - month) == 0)
    if ((nowDate.getDate() - day) < 0)
      age --;
  infoDiv.innerHTML = infoDiv.innerHTML.replace(/,/, " ("+age+" years old), ");
}