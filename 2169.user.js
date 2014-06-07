/*
 * Title:
 * 	Simpy Skin for del.icio.us
 * 
 * Author:
 *      Harsh Shah
 * 
 * Last Updated:
 * 	Nov 17, 2005
 * Download the CSS files from: http://www.utdallas.edu/~hps031000/delSimpy.css
 */

// ==UserScript==
// @name Simpl.icio.us
// @namespace http://www.utdallas.edu/~hps031000
// @description a Simpy like skin for del.icio.us
// @include http://del.icio.us/*
// @exclude http://del.icio.us/rss/*
// ==/UserScript==

(function(){ 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


 var cssStyle = unescape("%0Ahtml%2Cbody%2Cform%2Cul%2Cli%2Ch1%2Ch3%2Cp%2Col.posts%7B%0A%20%20margin%3A0%3B%0A%20%20padding%3A0%0A%7D%0Abody%20%7B%0A%20%20width%3A%2095%25%3B%0A%20%20color%3A%20%23557%3B%0A%20%20background%3A%20%23fff%3B%0A%20%20font%3A%20small%20verdana%3B%0A%20%20margin-left%3A%202.5%25%3B%0A%7D%0Aimg%20%7B%0A%20%20border%3A%20none%3B%0A%7D%0Aa%20%7B%0A%20%20color%3A%20%23000%3B%0A%20%20text-decoration%3A%20none%3B%0A%7D%0Aa%3Alink%20%7B%0A%20%20color%3A%20%23000%3B%0A%20%20text-decoration%3A%20none%3B%0A%7D%0Aa%3Ahover%20%7B%0A%20%20color%3A%20%23c00%3B%0A%20%20text-decoration%3A%20none%3B%0A%20%20position%3A%20relative%3B%0A%20%20top%3A%201px%3B%0A%20%20left%3A%201px%3B%0A%7D%0A%23header%20%7B%20%0A%20%20color%3A%20%23000%3B%20%0A%20%20font-size%3A%20100%25%3B%20%0A%20%20border%3A%200px%20solid%20%23ccc%3B%20%0A%20%20background-color%3A%20%23d9d9bf%3B%0A%7D%0A%23header%20h1%20%7B%20%0A%20%20color%3A%2300f%3B%0A%20%20font-size%3A%20130%25%3B%20%0A%20%20margin%3A%200%3B%20%0A%20%20padding%3A%200%200%200%200.33em%3B%20%0A%20%20line-height%3A%201.8%3B%0A%7D%0A%23infobar%7B%0Afont%3A%20verdana%3B%0Afont-size%3A%2012px%3B%0Acolor%3A%20%23557%3B%0A%7D%0A.pager%20%7B%0A%20%20text-align%3A%20right%3B%0A%20%20margin-left%3A%200px%3B%0A%20%20padding-left%3A%200px%3B%0A%20%20margin-right%3A%2020px%3B%0A%7D%0A%23sidebar.list%7B%0A%20float%3A%20right%3B%0A%20%20background-color%3A%20%23ffffdd%3B%0A%20%20width%3A%20190px%3B%0A%20%20margin-top%3A%200px%3B%0A%20%20border%3A%200px%20solid%20%23ccc%3B%0A%20%20-moz-border-radius%3A%207px%207px%207px%207px%3B%0A%20%20position%3A%20static%3B%0A%20%20padding%3A%200px%3B%0A%20%20font-size%3A%2014px%3B%0A%7D%0A.sidebar-inner%7B%20%20background-color%3A%20%23ffffdd%3B%20%7D%0A.sidebar-inner%20a%2C%20.sidebar-inner%20a%3Avisited%20%7B%0A%20%20color%3A%20%23008000%3B%0A%7D%0A%23sidebar.cloud%20%7B%0A%20%20float%3A%20right%3B%0A%20%20width%3A%20280px%3B%0A%20%20background-color%3A%20%23ffffdd%3B%0A%20%20border%3A%200px%20solid%20%23ccc%3B%0A%20%20-moz-border-radius%3A%200px%200px%200px%200px%3B%0A%20%20position%3A%20static%3B%0A%20%20padding%3A%200px%3B%0A%20%20padding-left%3A%20px%3B%0A%20%20font-size%3A%2018px%3B%0A%7D%0A%23sidebar.cloud%20a%2C%20%23sidebar.cloud%20a%3Avisited%20%7B%0A%20%20color%3A%20%23008000%3B%0A%7D%0Ah4.desc%20a%20%7B%0A%20%20color%3A%20%23436976%3B%0A%20%20display%3A%20block%3B%0A%20%20border-top%3A%200px%20%23aaa%20solid%3B%0A%20%20border-left%3A%200px%20%23aaa%20solid%3B%0A%20%20border-right%3A%200px%20%23aaa%20solid%3B%0A%20%20-moz-border-radius%3A%200px%200px%200%200%3B%0A%20%20border-bottom%3A%200px%20%23eaeaea%20solid%3B%0A%20%20font-size%3A%2012px%3B%0A%20%20font-weight%3A%20bold%3B%0A%20%20padding%3A%203px%3B%0A%20%20margin-right%3A%203px%3B%0A%20%20margin-left%3A%203px%3B%0A%20%20background%3A%20%23efefef%3B%0A%7D%0A%0A.extended%7B%0A%20%20color%3A%20%23008000%3B%0A%20%20padding-left%3A%205px%3B%0A%20%20line-height%3A%20150%25%3B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20margin-left%3A%203px%3B%0A%20%20margin-right%3A%203px%3B%0A%20%20border-right%3A%200px%20%23aaa%20solid%3B%0A%20%20border-left%3A%200px%20%23aaa%20solid%3B%0A%20%20font-size%3A%20100%25%3B%0A%20%20border-bottom%3A%200px%20%23eaeaea%20solid%3B%0A%7D%0A%0A.meta%7B%0A%20%20color%3A%20%23008000%3B%0A%20%20padding-left%3A%205px%3B%0A%20%20line-height%3A%20150%25%3B%0A%20%20background%3A%20%23ffffff%3B%0A%20%20margin-left%3A%203px%3B%0A%20%20margin-right%3A%203px%3B%0A%20%20border-bottom%3A%200px%20%23aaa%20solid%3B%0A%20%20border-right%3A%200px%20%23aaa%20solid%3B%0A%20%20border-left%3A%200px%20%23aaa%20solid%3B%0A%20%20-moz-border-radius%3A%200%200%200px%200px%3B%0A%7D%0A.meta%20a%3Alink%2C%20.meta%20a%3Avisited%20%7B%20color%3A%20%23cc8822%3B%7D%0A%23infobar%7B%0Afont%3A%20verdana%3B%0Afont-size%3A%2012px%3B%0Acolor%3A%20%23557%3B%0A%7D%0A%0A%23secondsago%7B%0Acolor%3A%20%23777%20%21important%3B%0Afont-size%3A%2010px%20%21important%3B%0A%7D%0A%0A.date%7B%0Apadding-left%3A4px%20%21important%3B%0Afont-size%3A%2010px%20%21important%3B%0Acolor%3A%23777%20%21important%3B%0A%7D%0A");

 addGlobalStyle(cssStyle);

})()



