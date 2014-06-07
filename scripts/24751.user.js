// ==UserScript==
// @name           oc.at - search my threads
// @namespace      searchmythreads
// @include        http://www.overclockers.at/*
// ==/UserScript==


var username = document.evaluate('//div[@class=\'vcenter\']/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
document.evaluate('//div[@class=\'vcenter\']/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML = "<a href=\"http://www.overclockers.at/search.php?searchuser=" + username + "&exactname=yes&userresult=thread&forumchoice=-1&searchtype=1&searchclass=any+class&searchdate=any&action=simplesearch\">" + username + "</a>";
