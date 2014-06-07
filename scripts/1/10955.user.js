// ==UserScript==
// @name          Salesforce Cold Call Mashup
// @namespace     http://www.japaninyourpalm.com
// @description   Adds icon/link to Hoover, Google, Yahoo, Technorati, YouTube, Wikipedia, NY Times, Twitter  search for current company
// @include       https://*.salesforce.com/001*
// @include       https://*.salesforce.com/003*
// @include       https://*.salesforce.com/00Q*
// @version 2.0// ==/UserScript==

// Written by: Al Nevarez
// May 2009, added search links to the Leads page, added Twitter link
// Nov 2008, updated to work on any sf machine, also added the feature to contact page
// March 2008, updated to handle slight change in salesforce.com's html
// Nov 10, 2007 - added Ny Times, and na5 server
// July 22, 2007 - original version

(function() {
	
var targetElem = document.getElementById("topButtonRow");

if (targetElem) {
	               
var companyXPath;
var accountpattern = /salesforce.com\/0018/; //account page
var contactspattern = /salesforce.com\/0038/; //contacts page
  	
// find the DOM xpath location of the company name  	
if (accountpattern.test(document.location)) {  // account page
    companyXpath= "/html/body/div[2]/table[@id='bodyTable']/tbody/tr/td[@id='bodyCell']/div[@id='ep']/div[2]/div[2]/table/tbody/tr[2]/td[2]";
} else if (contactspattern.test(document.location)) {    // on contact page
    companyXpath = "/html/body/div[2]/table[@id='bodyTable']/tbody/tr/td[@id='bodyCell']/div[@id='ep']/div[2]/div[2]/table/tbody/tr[3]/td[2]/a";
} else { // on leads page
    companyXpath = "/html/body/div[2]/table[@id='bodyTable']/tbody/tr/td[@id='bodyCell']/div[@id='ep']/div[2]/div[2]/table/tbody/tr[3]/td[2]";
}	

var companyElem = document.evaluate(companyXpath,
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var companyText = companyElem.textContent;
var pattern = /(.*)\s\[View H(.*)/;
var companyNamePatternMatch = pattern.exec(companyText);

var companyName;
if (companyNamePatternMatch) {
	companyName = companyNamePatternMatch[1]; // pull out just the company name
} else {
	companyName = companyText;
}

companyNameForURL = companyName.replace(/\s/g, "+");

var spanWideElem = document.createElement('span');
spanWideElem.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

var spanNarrowElem = document.createElement('span');
spanNarrowElem.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;';

var spanNewsElem = document.createElement('span');
spanNewsElem.setAttribute('style', 'font-size: 91%;font-weight: bold;color: #333333;');
spanNewsElem.innerHTML = 'News on&nbsp;&nbsp;' + companyName + '&nbsp;&nbsp;&nbsp;';

// hoovers
var linkHooverElem = document.createElement('a');
linkHooverElem.setAttribute('href', 'http://hoovers.com/free/search/simple/xmillion/index.xhtml?query_string='+ companyNameForURL + '&which=company&page=1&x=66&y=20');
linkHooverElem.setAttribute('target', '_blank');
linkHooverElem.setAttribute('title','Hoovers');
var imageHooverElem = document.createElement('img');
imageHooverElem.setAttribute('src', 'data:image/gif;base64,R0lGODlhDgAOAIAAAPf39wAqWSH5BAAAAAAALAAAAAAOAA4AAAIgjI8Jy732IDgxBlunpBrr231KmHDbCaKe+mXm6cRimRQAOw==');
imageHooverElem.setAttribute('style', 'vertical-align: top;');
linkHooverElem.appendChild(imageHooverElem);

// google
var linkGoogleElem = document.createElement('a');
linkGoogleElem.setAttribute('href', 'http://news.google.com/news?hl=en&ned=us&ie=UTF-8&q='+ companyNameForURL + '&btnG=Search');
linkGoogleElem.setAttribute('target', '_blank');
linkGoogleElem.setAttribute('title','Google News');
var imageGoogleElem = document.createElement('img');
imageGoogleElem.setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgQFBv/EACEQAAICAgEEAwAAAAAAAAAAAAECAwQFEQASITFBFBVS/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EAB4RAAEDBAMAAAAAAAAAAAAAAAEAAhEEEjFhAxNB/9oADAMBAAIRAxEAPwDaYSvFlUp46pBVrpVx9eS5Z+PG8rvIm1VeoEDwSSQfQ133xvKYD6/E5WUywWIEoStGZacazJIFJDB0CjWvXTvfvkzFSthpqWToS1bcVuhXhv0zajjljeNNK69ZAPYkFSRwsxlbNs5GQXHgx7Y+wHrWbNZtyFNIIxGzN+idnzrXHqRxm4sLYjUz7vKCl672B2ZC/9k=');
imageGoogleElem.setAttribute('style', 'vertical-align: top;');
linkGoogleElem.appendChild(imageGoogleElem);

// yahoo
var linkYahooElem = document.createElement('a');
linkYahooElem.setAttribute('href', 'http://news.search.yahoo.com/search/news;_ylt=A9j8eu3r46JGHREAShPQtDMD;_ylu=X3oDMTBhNjRqazhxBHNlYwNzZWFyY2g-?p='+ companyNameForURL + '&c=&x=wrt');
linkYahooElem.setAttribute('target', '_blank');
linkYahooElem.setAttribute('title','Yahoo News');
var imageYahooElem = document.createElement('img');
imageYahooElem.setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgIE/8QAJRAAAQMEAQMFAQAAAAAAAAAAAQIDBAUGERIxAEFRBxMUIjKh/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAeEQABBAIDAQAAAAAAAAAAAAABAhEhMQADBBITUf/aAAwDAQACEQMRAD8Ac1G4biotZix6uKSinvqwJgbcSknuknY6nGeQR/cYkeprqYTU+Tb7zcN5wttOIkBRdI/WidQTjjwScecIbyt2VckNuG1UW4jAVssKje6VKHBB2Tjv556mJayvk0h2qSmZiKWxow2iMWkpcBGrg+x4SANTkZAUMdH67HIBjK3twzqSpaAVS4DiqqHJv4BF5//Z');
imageYahooElem.setAttribute('style', 'vertical-align: top;');
linkYahooElem.appendChild(imageYahooElem);

// technorati
var linkTechnoratiElem = document.createElement('a');
linkTechnoratiElem.setAttribute('href', 'http://technorati.com/posts/tag/'+ companyNameForURL);
linkTechnoratiElem.setAttribute('target', '_blank');
linkTechnoratiElem.setAttribute('title','Technorati Blog Search');
var imageTechnoratiElem = document.createElement('img');
imageTechnoratiElem.setAttribute('src', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAPABEDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EAC0QAAIBAwIDBAsAAAAAAAAAAAECAwAFEQQSBiEiExZRkRcxMkFTVWGBktHj/8QAFgEBAQEAAAAAAAAAAAAAAAAABQQG/8QAIREAAQMDBAMAAAAAAAAAAAAAAgABEQMSMRNRUpFxsfD/2gAMAwEAAhEDEQA/ANXwCkItV20+gUJcjC3Y7SFOMctvh1es/UVANjvOqnxJbdZI8jdRlhbDE+JYY+5pSxXZtHPHcdIoaQKwjLj2SQVJI9+MmqkvF18kidZLiUj2ncyxqpUY5nKrny51l9SmQiFWWIZx59oa8SZhOZbb7Ke9F8vx9H+B/VFZvvmvzi+eX9aKWuq8C7ZXSfF+1//Z');
imageTechnoratiElem.setAttribute('style', 'vertical-align: top;');
linkTechnoratiElem.appendChild(imageTechnoratiElem);

// youtube
var linkYouTubeElem = document.createElement('a');
linkYouTubeElem.setAttribute('href', 'http://www.youtube.com/results?search_query='+ companyNameForURL + '&search=');
linkYouTubeElem.setAttribute('target', '_blank');
linkYouTubeElem.setAttribute('title','You Tube Videos');
var imageYouTubeElem = document.createElement('img');
imageYouTubeElem.setAttribute('src','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAUG/8QAIxAAAQQCAgICAwAAAAAAAAAAAQIDBBEFEhMhAAYUQSIxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAHBEAAAYDAAAAAAAAAAAAAAAAAAEREyExBRIi/9oADAMBAAIRAxEAPwDT55swfasrkcbkC3IWwwEoblMBYWpxCZGqXTrfCyzW3Vjrv9O9NyfskrKpRmX47sH4gJdZdYUkvFDA1pB2sLD5PVHYV0API03iEybCzG/CJkh1DTiV60S2UkV/RyV9WSfu/ExjBkZNDkBrae7JZWpxtLibAWCo0RR/EEquhYBFmqB7pIFY8eTe00tD/9k=');
imageYouTubeElem.setAttribute('style', 'vertical-align: top;');
linkYouTubeElem.appendChild(imageYouTubeElem);

// wikipedia
var linkWikipediaElem = document.createElement('a');
linkWikipediaElem.setAttribute('href', 'http://en.wikipedia.org/wiki/Special:Search?search=' + companyNameForURL + '&go=Go');
linkWikipediaElem.setAttribute('target', '_blank');
linkWikipediaElem.setAttribute('title','Wikipedia');
var imageWikipediaElem = document.createElement('img');
imageWikipediaElem.setAttribute('src','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1zUfGmvWsni2xjtbOXVtHCXVvF5bBbm1YZyPm+994fUVesPFuo61ow1LRjY/Z72aGHTzNG/7wnHmM2GGQPm6YPymo/iFoeqv4k0PXPDkAkuxu0+7BbANvJzuI6fKRkfWq/wAO/C2p6Dq9zpl4pfRNMdpdMmZsl/NHzAj/AGfmH/A6AP/Z');
imageWikipediaElem.setAttribute('style', 'vertical-align: top;');
linkWikipediaElem.appendChild(imageWikipediaElem);

// nytimes
var linkNYTimesElem = document.createElement('a');
linkNYTimesElem.setAttribute('href', 'http://query.nytimes.com/search/query?query=' + companyNameForURL + '&srchst=nyt');
linkNYTimesElem.setAttribute('target', '_blank');
linkNYTimesElem.setAttribute('title','NY Times');
var imageNYTimesElem = document.createElement('img');
imageNYTimesElem.setAttribute('src','data:image/gif,GIF87a%10%00%10%00%87%00%00%00%00%00%FF%FF%FF%EF%EF%EF%DF%DF%DF%CF%CF%CF%BF%BF%BF%AF%AF%AF%9F%9F%9F%8F%8F%8F%7F%7F%7Fooo___OOO%3F%3F%3F%2F%2F%2F%1F%1F%1F%0F%0F%0F%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%40%08%BC%00%03%08%1CH%B0%20A%01%00%1C%04h%00%80%01%80%07%02%02H%9C%18%A0%01%83%04%0A%1E%00%D8%D8%20%80%C7%8F%01%0C%00%18%C9%40%C1%03%00%05%02%A8%5C%19%40%80%82%07%0E%16%14%08%A0%40A%80%9B8%03%08p%C0%13%40%82%04%01%82%0A%0DJ%00%00%00%03%0E%1A%10H%20%40A%80%A7P%A1%0A%40%90%00%C1%80%00X%B3j%DD%CAU%AB%02%00%60%C3%82%0D%40%B6l%80%03%05%16%24(%80%A0%C1%01%01%01%E2%CA%0D%B0%00%40%81%06%00%1200%10%A0%AF%DF%00%05%00%00%08%D0%00%40%82%04%02%02(%5E%AC%F8%01%00%00%08%02%04H%E0%80A%80%CB%98%2F%1F%80%00%A03%80%03%01B%8B%1EM%9At%40%00%3B');
imageNYTimesElem.setAttribute('style', 'vertical-align: top;');
linkNYTimesElem.appendChild(imageNYTimesElem);


//twitter
var linkTwitterElem = document.createElement('a');
linkTwitterElem.setAttribute('href', 'http://search.twitter.com/search?q=' + companyNameForURL);
linkTwitterElem.setAttribute('target', '_blank');
linkTwitterElem.setAttribute('title','Twitter search');
var imageTwitterElem = document.createElement('img');
imageTwitterElem.setAttribute('src',"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%00%90%91h6%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%01%A8IDATx%DA%7CR%3Bn%15A%10%EC%9E%99%FD%C8%CF%C2%80%2Cd%B0%09l%12%0E%E0%00%F90%BE%01%24H%04%5C%80%0B%90s%1F%022%B03%07%04%08%EB%D9%CF2%C6O%BBo%A6%8B%DA%99%B7bA%86Q%EFjW%D3%D5U%5D%DD%0A%40D%A2Y%9F%0C%AAN%E0T%1B%EF%E5%1F'%F0!%22%02g%A6%97%113%AF%CF%2B1%0C%B0%3B%01nx%01%D7%26%9F%BB%B8H%E9%B4%8B%F34%10%FE%8F%81%A7%07.%12%F8%D3%89%24%11%85u%11%B9%96%A8%AAw%0C%F7%07%80%05%7F%1A*%A56%F9%D2%A7%B9w%96%A5%F2%A8%E0I%90%1DX%E5%DD%1A%C0%1A%06%B9%19%00%14%8E%8F%CB8%0A%D2%82b%D2%CB%07%ED%C3)%03e%5CCjv%93MC)3%7C%D39%3DOvn%F8%0D%60%12%95%2C%CC%DA%B1(%B2%92%22%89%06%1E%D4n%BF%9A%F4%A0%03%03%AE%08P%BDMxu%BF%3DlB%07%14A%BC%DA%F6%BE%1A%5D%0EEj%0F!%E9%A6%CA%0F%C3%86%D3%99%E2%5E%F0%85%83%FD%F8%C9L%5C%96%24%95%C8w%C3W%E3%F8p%BA%B2%40A%1C%05%2F%18fX%1B6i%FAi%A5%B5%EAI%A2%ED%F2f%B1%9C%A7f%CF%BB%98%CB3%E3%A8%0D%FB%F5zY%B4%D8%22%96%DE%5D%F5o%2Fo%25%9B%CD%DD%18%2B%B2%BA%3E%F6%FAiok'%F7%BD%EE%DD%D4%BD%DEj%8E7%1Bn%C5%C0%EFt%0C%C7%0E%BEE%3BY%A5%C9.%0D%09%EAU%3E%3C%DAx%BF%3D%7B%16%B4%01%18m%0E%B2%BDh%C3a%F3%97%A4%C2%03%A4%B8Z%8A%A7%01%96%ED.C%DC%F5%ECP%EA%BC%F3%BF%04%18%00%F2P%E2%87%18%87l%B4%00%00%00%00IEND%AEB%60%82");
imageTwitterElem.setAttribute('style', 'vertical-align: top;');
linkTwitterElem.appendChild(imageTwitterElem);

// add new DOM structure to the salesforce page
var trElem = targetElem.parentNode;
var td2 = document.createElement("td");
var td3 = document.createElement("td");

//td2.appendChild(spanWideElem);
td2.appendChild(spanNewsElem);
trElem.appendChild(td2);

td3.appendChild(linkHooverElem);
td3.appendChild(spanNarrowElem);

td3.appendChild(linkGoogleElem);
var newSpacer1 = spanNarrowElem.cloneNode(true);
td3.appendChild(newSpacer1);

td3.appendChild(linkYahooElem);
var newSpacer2 = spanNarrowElem.cloneNode(true);
td3.appendChild(newSpacer2);

td3.appendChild(linkTechnoratiElem);
var newSpacer3 = spanNarrowElem.cloneNode(true);
td3.appendChild(newSpacer3);

td3.appendChild(linkYouTubeElem);
var newSpacer4 = spanNarrowElem.cloneNode(true);
td3.appendChild(newSpacer4);

td3.appendChild(linkWikipediaElem);

var newSpacer5 = spanNarrowElem.cloneNode(true);
td3.appendChild(newSpacer5);

td3.appendChild(linkNYTimesElem);

var newSpacer6 = spanNarrowElem.cloneNode(true);
td3.appendChild(newSpacer6);

td3.appendChild(linkTwitterElem);

trElem.appendChild(td3);


}
else { return;}

})(); 
