// ==UserScript==
// @name       PlanetSuzy Cleaner
// @namespace  http://userscripts.org/users/309240
// @version    0.5a
// @description Cleans up PlanetSuzy stuff
// @match      http://planetsuzy.org/t*
// @copyright  2012+
// ==/UserScript==



function getElementByXpath(xPathStr) {
    xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (xPathResults.snapshotItem(0) != null) {
		return xPathResults.snapshotItem(0);
	}
}

function hideElementByXpath(xPathStr) {
    var targetEl
        targetEl = getElementByXpath(xPathStr);
    targetEl.style.display = 'none';
}

function deleteElementByXpath(xPathStr) {
    var targetEl
        targetEl = getElementByXpath(xPathStr);
    targetEl.parentNode.removeChild(targetEl);	
}

function doIt() {
    deleteElementByXpath('/html/body/script');
    hideElementByXpath("/html/body/div/table");
    hideElementByXpath("/html/body/div[2]/div[@class='page']/div/form[@id='notices']/table[@class='tborder']/tbody/tr[2]/td[@class='alt1']");
    hideElementByXpath('/html/body/div[2]/div/div/div[3]');
    
    var xPathStr = '//div[@class="page"]';
    var xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = xPathResults.snapshotLength - 1; i >= 0; i--) {
        var myDiv = xPathResults.snapshotItem(i);
        myDiv.style.width = '95%';
    } 	
    
    
    
    xPathStr = '//*[starts-with(@id,"post_message")]//a/img';
    xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xPathResults.snapshotLength; i++) {
        var img = xPathResults.snapshotItem(i);
        if (img.parentElement.nextElementSibling.tagName == 'BR') {
            img.parentElement.nextElementSibling.parentNode.removeChild(img.parentElement.nextElementSibling);
            i--;
        }
    }
    
    
    xPathStr = '//*[starts-with(@id,"post_thanks_")]//div';
    xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xPathResults.snapshotLength; i++) {
        var curDiv = xPathResults.snapshotItem(i);
        curDiv.style.display = "none";
    }
    
    
    xPathStr = '//*[starts-with(@id,"post_message")]//a/img';
    xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < xPathResults.snapshotLength; i++) {
        var img = xPathResults.snapshotItem(i);
        if (img.parentElement.nextElementSibling.textContent != '') {
            img.parentElement.nextElementSibling.innerHTML = "<br>" + img.parentElement.nextElementSibling.innerHTML;
        }
    }
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    // xPathStr = "/html/body/div[2]/div/div/table[3]/tbody/tr/td[2]/div/table/tbody/tr/td[28]/a";
    xPathStr = "/html/body/div[4]/div[@class='page']/div/table[1]/tbody/tr/td[2]/div[@class='pagenav']/table[@class='tborder']/tbody/tr/td[@class='alt1'][15]/a[@class='smallfont']";
    xPathStr = "/html/body/div[2]/div[@class='page']/div/table[3]/tbody/tr/td[2]/div[@class='pagenav']/table[@class='tborder']/tbody/tr/td[@class='alt1'][15]/a[@class='smallfont']";
    xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xPathResults.snapshotItem(0) != null) {
        nextURL = xPathResults.snapshotItem(0).attributes['href'].nodeValue;
    } else {
        nextURL = sPage;
    }
    
    //xPathStr = '/html/body/div[2]/div/div/table[3]/tbody/tr/td[3]/div/table/tbody/tr/td[3]/a';
    xPathStr = "/html/body/div[2]/div[@class='page']/div/table[3]/tbody/tr/td[2]/div[@class='pagenav']/table[@class='tborder']/tbody/tr/td[@class='alt1'][2]/a[@class='smallfont']";
    xPathResults = document.evaluate(xPathStr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xPathResults.snapshotItem(0) != null) {
        prevURL = xPathResults.snapshotItem(0).attributes['href'].nodeValue;
    } else {
        prevURL = sPage;
    }
    
    var divString = '<div id="prevNav" style="width: 115px; height=25px; height: auto; text-align: center; line-height: 35px; border-style: groove; border-color: #999; border-width: 2px; padding: 0px; margin: 0px; background-color: #F98888; display: block; bottom: 20px; left: 15px; position: fixed; opacity: .3;" onMouseOver="document.getElementById(\'prevNav\').style.opacity = \'1\';" \
onMouseOut="document.getElementById(\'prevNav\').style.opacity = \'.3\';"> \
<a href="' + prevURL + '" rel="prev"  style="color: #600; font-size: x-large; text-decoration: none; font-weight: bolder; font-family: Verdana, Geneva, sans-serif;">< Prev</a></div> \
<div id="nextNav" style="width: 115px; height=25px; height: auto; text-align: center; line-height: 35px; border-style: groove; border-color: #999; border-width: 2px; padding: 2px; margin: 0px; background-color: #F98888; display: block; bottom: 20px; right: 15px; position: fixed; opacity: .3;" onMouseOver="document.getElementById(\'nextNav\').style.opacity = \'1\';" \
onMouseOut="document.getElementById(\'nextNav\').style.opacity = \'.3\';"> \
<a href="' + nextURL + '" rel="next"  style="color: #600; font-size: x-large; text-decoration: none; font-weight: bolder; font-family: Verdana, Geneva, sans-serif;">Next ></a></div>';
    
    var bodyEl = document.getElementsByTagName('BODY')[0]
        bodyEl.innerHTML = bodyEl.innerHTML + divString;
    
}

if(document.body)
	doIt();
else
	window.addEventListener("DOMContentLoaded", doIt, false); 