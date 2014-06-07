
/*
 * Title:
 * 	Autumn theme for del.icio.us
 * 
 * Description:
 * 	This is a Greasemonkey user script for Firefox.
 * 
 * 	This script changes the appearance of del.icio.us and is based 
 * 	on a del.icio.us.ness user script
 * 
 * Author:
 * 	Toru Watanabe, mail: toru.wata at gmail dot com
 * 
 * Last Updated:
 * 	Sep 30, 2005
 * 
 * ChangeLog:
 *     2005-10-10:
 *       * fix bugs that "bookmarkit" view does not show url in form
 *     2005-09-30:
 *       * fix bugs to show tags in cloud mode.
 *       * change the text alignment of pager.
 *       * footer, and rss fields comes below of list/cloud
 *     2005-09-29:
 *       * fix a problem that left menu showed over top nav.
 *       
 * 
 */

// ==UserScript==
// @name autumn theme
// @namespace http://toru.wata.gmail.com/userscripts/
// @description a skin for del.icio.us
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

var cssStyle = unescape("html%2Cbody%2Cform%2Cul%2Cli%2Ch1%2Ch3%2Cp%2Col.posts%7B%0A%20%20margin%3A0%3B%0A%20%20padding%3A0%0A%7D%0Abody%20%7B%0A%20%20width%3A%2090%25%3B%0A%20%20color%3A%20%23557%3B%0A%20%20background%3A%20%23eee%3B%0A%20%20font%3A%20small%20verdana%3B%0A%7D%0Aimg%20%7B%0A%20%20border%3A%20none%3B%0A%7D%0Aa%20%7B%0A%20%20color%3A%20%23000%3B%0A%20%20text-decoration%3A%20none%3B%0A%7D%0Aa%3Alink%20%7B%0A%20%20color%3A%20%23000%3B%0A%20%20text-decoration%3A%20none%3B%0A%7D%0Aa%3Ahover%20%7B%0A%20%20color%3A%20%23c00%3B%0A%20%20text-decoration%3A%20none%3B%0A%20%20position%3A%20relative%3B%0A%20%20top%3A%201px%3B%0A%20%20left%3A%201px%3B%0A%7D%0Aul%2Col.posts%20%7B%0A%20%20list-style-type%3A%20none%0A%7D%0Ahr%7B%0A%20%20display%3Anone%0A%7D%0A.hide%2C%20.nav%20li.hide%2C%20.dupe%20%7B%0A%20%20display%3Anone%0A%7D%0A.arrow%20%7B%0A%20%20margin-left%3A%20-10px%20%21important%0A%7D%0A.meta%20%7B%0A%20%20color%3A%20%23999%3B%0A%20%20padding-left%3A%205px%3B%0A%20%20line-height%3A%20150%25%3B%0A%20%20background%3A%20%23fff8da%3B%0A%20%20margin-left%3A%203px%3B%0A%20%20margin-right%3A%203px%3B%0A%20%20border-bottom%3A%201px%20%23aaa%20solid%3B%0A%20%20border-right%3A%201px%20%23aaa%20solid%3B%0A%20%20border-left%3A%201px%20%23aaa%20solid%3B%0A%20%20-moz-border-radius%3A%200%200%204px%204px%3B%0A%7D%0A.extended%20%7B%0A%20%20color%3A%20%23999%3B%0A%20%20padding-left%3A%205px%3B%0A%20%20line-height%3A%20150%25%3B%0A%20%20background%3A%20%23fff8da%3B%0A%20%20margin-left%3A%203px%3B%0A%20%20margin-right%3A%203px%3B%0A%20%20border-right%3A%201px%20%23aaa%20solid%3B%0A%20%20border-left%3A%201px%20%23aaa%20solid%3B%0A%20%20font-size%3A%2080%25%3B%0A%20%20border-bottom%3A%201px%20%23eaeaea%20solid%3B%0A%7D%0A.delMain%20form%20%7B%0A%20%20padding-left%3A%2010px%3B%0A%7D%0A.right.list%20div%20.delPostInfo%20%7B%0A%20%20padding-left%3A%2010px%20%21important%3B%0A%7D%0A.banner%20h1%20%7B%0A%20%20background%3A%20url%28%5C%22http%3A//del.icio.us/img/delicious.gif%5C%22%29%20norepeat%20%21important%3B%0A%7D%0A.banner%20h1%2C%20.banner%20h1%20a%20%7B%0A%20%20font-weight%3A%20bold%20%21important%3B%0A%20%20font-size%3A%2015px%3B%0A%20%20color%3A%20%23fff%3B%0A%7D%0A.delPage%2C%20.delPage%20form%20a%2C%20.delPage%20a%20%7B%0A%20%20color%3A%20%23557%20%21important%3B%0A%20%20font-size%3A%2012px%20%21important%3B%0A%20%20font-weight%3A%20bold%3B%0A%7D%0A.delPage%20form%20input%7B%0A%20%20width%3A%20150px%3B%0A%20%20font-size%3A%2012px%3B%0A%20%20padding%3A%200%3B%0A%7D%0A.right.list%20a%2C%20.right.list%20a%3Avisited%20%7B%0A%20%20color%3A%20%2388f%3B%0A%7D%0A.right.list%20%23sidebar%2C%20.delRightTitle%2C%20.right.list%20h2%20%7B%0A%20%20font-size%3A%2012px%20%21important%3B%0A%20%20padding%3A%205px%200%205px%2010px%20%21important%3B%0A%20%20background-color%3A%20transparent%3B%0A%20%20color%3A%20%23557%3B%0A%7D%0A.list%20.bundle%20img%20%7B%0A%20%20float%3A%20left%3B%0A%20%20margin-right%3A%208px%3B%0A%20%20text-align%3A%20right%3B%0A%20%20padding%3A%206px%200%200%2025px%3B%0A%7D%0A.list%20li.bundle%20%7B%0A%20%20padding-top%3A%200.20pc%3B%0A%20%20margin-bottom%3A%200.15pc%0A%7D%0A.list%20li%20li%20span%2C%20.list%20.option%20span%20%7B%0A%20%20float%3A%20left%3B%0A%20%20width%3A%2025px%3B%0A%20%20margin-right%3A%208px%3B%0A%20%20text-align%3A%20right%3B%0A%7D%0A.nav%20li%2C%20%23footer%20li%20%7B%0A%20%20display%3Ainline%3B%0A%20%20padding%3A%200%200.4em%3B%0A%7D%0A%23fotter%20%7B%0A%20%20margin-left%3A%20180px%3B%0A%7D%0A.nav%20li%2C%20.nav%20li%20a%20%7B%0A%20%20font-size%3A%2013px%3B%0A%20%20font-weight%3A%20bold%3B%0A%20%20color%3A%20%23fff%3B%0A%7D%0A.creator%2C%20.creator%20a%20%7B%0A%20%20color%3A%20%23fff%3B%0A%20%20font-size%3A%2013px%3B%0A%7D%0A.cloud.right%20%7B%0A%20%20float%3A%20left%3B%0A%20%20background-color%3A%20%23fff8da%3B%0A%20%20margin-top%3A%2050px%3B%0A%20%20border%3A%201px%20solid%20%23ccc%3B%0A%20%20-moz-border-radius%3A%206px%206px%206px%206px%3B%0A%20%20position%3A%20static%3B%0A%20%20padding%3A%205px%3B%0A%20%20padding-left%3A%2015px%3B%0A%20%20font-size%3A%2011px%3B%0A%7D%0A%23footer%20%7B%0A%20position%3A%20static%20%21important%3B%0A%20clear%3A%20both%0A%7D%0A.date%20%7B%0A%20%20float%3A%20none%20%21important%3B%0A%20%20color%3A%20%23fff%3B%0A%20%20font-weight%3A%20bold%3B%0A%20%20background-color%3A%20transparent%3B%0A%20%20padding%3A%205px%200%204px%2010px%3B%0A%20%20font-size%3A%2012px%20%21important%3B%0A%7D%0A.postui%20%7B%0A%20%20margin-top%3A%2040px%3B%0A%7D%0A.by-url%20.post%20%7B%0A%20%20margin-left%3A%200%20%21important%3B%0A%20%20position%3A%20static%3B%0A%7D%0A.delMain%20%23posts%2C%20.delMain%20.section%20%7B%0A%20%20margin-left%3A%20-1px%3B%0A%7D%0A.banner%20%7B%0A%20%20padding%3A%209px%20%21important%3B%0A%20%20background-color%3A%20%23483521%20%21important%3B%0A%20%20background-position%3A%200%200%20%3B%0A%20%20background-repeat%3A%20repeat-x%3B%0A%20%20height%3A%2025px%3B%0A%20%20position%3A%20fixed%3B%0A%20%20left%3A%200%3B%0A%20%20top%3A%200%3B%0A%20%20width%3A%20100%25%3B%0A%7D%0A.nav%20%7B%0A%20%20float%3A%20right%3B%0A%20%20padding%3A%200.5pc%200.5pc%200%200%0A%7D%0A.right.list%20%7B%0A%20%20float%3A%20left%3B%0A%20%20background-color%3A%20%23fff8da%3B%0A%20%20width%3A%20160px%3B%0A%09%20margin-top%3A%2050px%3B%0A%20%20border%3A%201px%20solid%20%23ccc%3B%0A%20%20-moz-border-radius%3A%206px%206px%206px%206px%3B%0A%20%20position%3A%20static%3B%0A%20%20padding%3A%205px%3B%0A%20%20font-size%3A%2011px%3B%0A%7D%0A.posts.by-popularity%20%7B%0A%20%20margin-top%3A%2040px%3B%0A%7D%0A%23posts%2C%20DIV.section%2C%20DIV.pager%2C%20.delMain%20%7B%0A%20%20padding%3A%2010px%200%2010px%200%3B%0A%20%20margin-left%3A%2010px%3B%0A%20%20margin-top%3A%2010px%3B%0A%7D%0A.pager%20%7B%0A%20%20text-align%3A%20right%3B%0A%20%20margin-left%3A%2010px%3B%0A%20%20padding-left%3A%205px%0A%7D%0A.section%20%7B%0A%20%20padding%3A%203px%20%21important%3B%0A%20%20margin-left%3A%2010px%3B%0A%7D%0A.delMain%20.delPostInfo%20%7B%0A%20%20margin-top%3A%2040px%3B%0A%7D%0A.delMain%20.pager%20%7B%0A%20%20margin-left%3A%20-1px%3B%0A%7D%0A.post%2C%20.section%2C%20.pager%20%7B%0A%20%20padding-left%3A%2010px%3B%0A%20%20padding-top%3A%200.5em%3B%0A%20%20margin%3A%200%3B%0A%7D%0A.posts.by-minute%20.post%20%7B%0A%20%20position%3A%20static%3B%0A%20%20margin-left%3A%200px%3B%0A%7D%0A.posts.by-minute%20%7B%0A%20%20margin-left%3A%20180px%20%21important%3B%0A%7D%0A.delMain%20form%20table%20%7B%0A%20%20margin-top%3A%2050px%3B%0A%7D%0ADIV.delPage%20%7B%0A%20%20background%3A%20transparent%3B%0A%20%20padding%3A%2045px%2010px%205px%200%20%21important%3B%0A%20%20text-align%3A%20right%3B%0A%7D%0A%23content%20%7B%0A%20%20border%3A%201px%20%23000%20solid%3B%0A%20%20height%3A%2080px%3B%0A%20%20background%3A%20%23aaa%3B%0A%20%20color%3A%20%23000%3B%0A%20%20padding-left%3A%2020px%3B%0A%20%20font%3A%2018px%20verdana%20bold%3B%0A%7D%0A.posts%20%7B%0A%20%20padding-left%3A%2020px%3B%0A%20%20padding-bottom%3A%205px%3B%0A%20%20padding-right%3A%2020px%3B%0A%20%20margin-top%3A%205px%3B%0A%20%20margin-left%3A%20180px%20%21important%3B%0A%20%20background%3A%20transparent%20%0A%7D%0Ah3.desc%20a%20%7B%0A%20%20color%3A%20%23600%3B%0A%20%20display%3A%20block%3B%0A%20%20border-top%3A%201px%20%23aaa%20solid%3B%0A%20%20border-left%3A%201px%20%23aaa%20solid%3B%0A%20%20border-right%3A%201px%20%23aaa%20solid%3B%0A%20%20-moz-border-radius%3A%204px%204px%200%200%3B%0A%20%20border-bottom%3A%201px%20%23eaeaea%20solid%3B%0A%20%20font-size%3A%2012px%3B%0A%20%20font-weight%3A%20bold%3B%0A%20%20padding%3A%203px%3B%0A%20%20margin-right%3A%203px%3B%0A%20%20margin-left%3A%203px%3B%0A%20%20background%3A%20%23fff8da%3B%0A%7D%0A%0A%0A%0A%0A%0A");

 addGlobalStyle(cssStyle);

})()


