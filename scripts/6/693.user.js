// ==UserScript==
// @name          Scrobbler Percentages
// @namespace     tag:emailmat@nerdshack.com,2005-05-19:Scrobblerpercent
// @description   Displays a percentage for each of the top artist stats on Audioscrobbler.com. Note: Percentages will always be a bit wrong, unless your stats JUST updated.
// @include       http://www.audioscrobbler.com/user/*
// ==/UserScript==
//5/23/2005 7:48AM JGD - reviewed.  No warranty expressed or implied.

(function() {
    
//Get info

firstrow_xpath = document.evaluate("//table[@class='userinfo']/tbody/tr[1]/td[1]" , document, null, XPathResult.ANY_TYPE,null);
firstrow_elem = firstrow_xpath.iterateNext();
firstrow = firstrow_elem.textContent;

secondrow_xpath = document.evaluate("//table[@class='userinfo']/tbody/tr[2]/td[1]" , document, null, XPathResult.ANY_TYPE,null);
secondrow_elem = secondrow_xpath.iterateNext();
secondrow = secondrow_elem.textContent;

//Get total tracks played (Could be in 1st 2nd or 3rd row as all general settings are optional)

if (firstrow == "Tracks played:")
{
tracksplayed_xpath = document.evaluate("//table[@class='userinfo']/tbody/tr[1]/td[2]" , document, null, XPathResult.ANY_TYPE,null);
}
else if (secondrow == "Tracks played:")
{
tracksplayed_xpath = document.evaluate("//table[@class='userinfo']/tbody/tr[2]/td[2]" , document, null, XPathResult.ANY_TYPE,null);
}
else
{
tracksplayed_xpath = document.evaluate("//table[@class='userinfo']/tbody/tr[3]/td[2]" , document, null, XPathResult.ANY_TYPE,null);
}

tracksplayed_elem = tracksplayed_xpath.iterateNext();
tracksplayed = tracksplayed_elem.textContent;

//Seperate number from anything extra

if(isNaN(tracksplayed))        
tracksplayed = tracksplayed.substring(0,tracksplayed.indexOf(' '));

//Get number of played tracks for each artist
        
for(i = 0; i <= 49; i++) {
  switch(i) {
        case 0:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[2]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 1:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[3]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 2:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[4]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 3:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[5]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 4:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[6]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 5:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[7]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 6:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[8]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 7:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[9]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 8:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[10]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 9:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[11]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 10:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[12]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 11:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[13]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 12:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[14]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 13:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[15]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 14:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[16]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 15:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[17]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 16:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[18]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 17:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[19]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 18:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[20]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 19:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[21]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 20:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[22]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 21:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[23]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 22:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[24]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 23:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[25]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 24:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[26]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 25:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[27]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 26:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[28]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 27:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[29]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 28:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[30]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 29:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[31]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 30:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[32]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 31:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[33]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 32:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[34]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 33:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[35]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 34:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[36]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 35:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[37]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 36:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[38]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 37:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[39]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 38:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[40]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 39:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[41]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 40:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[42]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 41:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[43]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 42:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[44]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 43:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[45]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 44:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[46]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 45:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[47]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 46:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[48]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 47:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[49]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        case 48:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[50]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
        default:
          listens_xpath = document.evaluate("//table[@id='topartists']/tbody/tr[51]/td[3]/div" , document, null, XPathResult.ANY_TYPE,null); break
  }
      
  listens_elem = listens_xpath.iterateNext();
  if(listens_elem == null) 
  return;
  listens = listens_elem.textContent;

//Calculate percentages

  percent = listens / tracksplayed * 100;
  rpercent = Math.round(percent * 10) / 10;

// Insert stuff
  listens_elem.textContent = listens_elem.textContent+" ("+rpercent+"%)";
}
})();