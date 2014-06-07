// ==UserScript==
// @name           @ Allow forks on own gists
// @namespace      http://esquifit.myopenid.com/
// @description    Allow forks on own gists
// @include        http://gist.github.com/*
// ==/UserScript==

const XPATH_BUTTONS = "//div[@id='repos']/div[@class='repo public']/div[@class='title']/div[@class='path']/a";
const ONST          = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

if (! /^https?:\/\/gist\.github\.com\/\d+/.test(document.location.href)) {
    return;
} else {
    var id = /^gist: (\d+) - .*/.exec(document.title)[1];
};

var buttons = document.evaluate( XPATH_BUTTONS, document, null, ONST , null);
var firstButton = buttons.snapshotItem(0);

if (firstButton.getAttribute('href') == '/gists/' + id + '/edit')
{
    var href = '/fork/' + id;
    var fork = <a href={href}>
                   <img alt="Download_button" 
                        class="button"
                        src="http://assets0.github.com/images/modules/repos/fork_button.png"
                        border="0"/>
                </a>;

    firstButton.parentNode.innerHTML = firstButton.parentNode.innerHTML.concat(fork); 
}

// vim: ft=javascript sw=4 ts=4 
