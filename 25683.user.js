// ==UserScript==
// @name           Facebook Date Fixer
// @description    Changes dates on facebook from middle endian form (month day, year) to little endian form (day month year).
// @namespace      znerp
// @include        http://*.facebook.com/*
// ==/UserScript==

function anglisize(str, p1, p2, p3, p4, offset, s) {
  if (p3 == "") p3 = (Math.floor(p2 / 10) == 1) ? "th" : (p2 % 10 == 1 ? "st" : (p2 % 10 == 2 ? "nd" : (p2 % 10 == 3 ? "rd" : "th")))
  return p2 + p3 + " " + p1 + p4;
}

regex = /(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d{1,2})(st|nd|rd|th)?,?( \d{4})?/
potentialDates = document.evaluate('//div[@id="photodate"]|'+
                                   '//small|'+
                                   '//div[@class="date_divider"]|'+
                                   '//span[@class="date"]|'+
                                   '//div[@id="event"]/div[@class="left"]/div[@class="box clearfix"]/table/tbody/tr/td/div[@class="datawrap"]',
                                   document,
                                   null,
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                   null);
for (i = potentialDates.snapshotLength - 1; i >= 0; i--)
  if (regex.test((thisDate = potentialDates.snapshotItem(i)).textContent))
    thisDate.textContent = thisDate.textContent.replace(/(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d{1,2})(st|nd|rd|th)?,?( \d{4})?/, anglisize)

if (birthday = document.getElementById("Birthday-data")) {
  birthdate = birthday.removeChild(birthday.firstChild)
  if (birthday.childNodes.length > 1) birthday.firstChild.textContent =  "\t"
  
  birthdate.textContent = birthdate.textContent.replace(/(\w+) (\d{1,2})()()/, anglisize)
  birthday.insertBefore(birthdate, birthday.firstChild);
}