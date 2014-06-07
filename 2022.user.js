// ==UserScript==
// @name          Super-Clean Answers.com
// @description   Fixes various answers.com annoyances.
// @include       http://answers.com/*
// @include       http://*.answers.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen, tv, projection, print';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeByXPath(xpath) {
    var allElements, thisElement;
    allElements = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        thisElement.parentNode.removeChild(thisElement);
    }
}


addGlobalStyle('p { width: 100%; text-align: justify ! important} ' +
        '#middle { width: 100% ! important} ' +
        '.bodyHead { width: 80% ! important} ' +
        'div.content { width: 95% ! important} ' +
        'span.hw { font-size: inherit ! important} ' +
        //        'div.gradient_bedge { font-size: inherit ! important} ' +
        'div.pageTools { width: 95% ! important } ');



var targetElement = document.getElementById('answersLogo');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('lookup');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('copyrightTable');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads1');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads2');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads3');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads4');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads5');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads6');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('b_ads');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}



removeByXPath('//div[@style="margin: 10px 1px 0px; padding: 5px 0px; width: 772px; background-image: url(http://site.answers.com/main791/images/backTaxonomyHeader2.gif); background-position: left bottom; background-repeat: repeat-x;"]');
removeByXPath('//div[@style="border-top: 1px solid rgb(208, 219, 239); margin: 0px; padding: 0px; width: 772px; height: 60px; background-image: url(http://site.answers.com/main791/images/backTaxonomyHeader2.gif); background-position: left bottom; background-repeat: repeat-x; text-align: center;"]');
removeByXPath('//div[@class="ads"]');
removeByXPath('//div[@class="footer"]');
removeByXPath('//script');
removeByXPath('//div[@class="pageTools"]');
removeByXPath('//div[@class="backTopicTitle"]');
removeByXPath('//a[@href="#copyright"]');
removeByXPath('//p[@class="grayHeading"]/../../../../../../../..');


