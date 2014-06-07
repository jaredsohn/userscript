
/*
 * Title:
 * 	gmail skin 
 * 
 * Description:
 * 	This is a Greasemonkey user script for Firefox.
 * 
 * 	This script changes the appearance of gmail 
 *   This skin is : 
 *     http://persistent.info/files/20041005.gmail.css
 * 
 * Author:
 * 	Toru Watanabe, mail: toru.wata at gmail dot com
 * 
 * Last Updated:
 * 	Oct 9, 2005
 * 
 */

// ==UserScript==
// @name gmail skin
// @namespace http://toru.wata.gmail.com/userscripts/
// @description a skin for gmail
// @include http://gmail.google.com/*
// @include http://mail.google.com/*
// @include https://gmail.google.com/*
// @include https://mail.google.com/*
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

var cssStyle = unescape("body%20%7B%0A%09background-color%3A%20%23ebe2cd%20%21important%3B%0A%7D%0A%0Adiv%23ds_inbox%20img%20%7B%0A%09display%3A%20none%20%21important%3B%0A%7D%0A%0Adiv%23ds_inbox%20%7B%0A%09width%3A%20143px%20%21important%3B%0A%09height%3A%2059px%20%21important%3B%0A%09background-repeat%3A%20no-repeat%20%21important%3B%0A%7D%0A%0Aspan.lk%2C%0Aa.lc%2C%0Aa.lk%0A%7B%0A%09text-decoration%3A%20none%20%21important%3B%0A%09color%3A%20%239f3638%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.ur%20%7B%0A%09background-color%3A%20%23d3cbb8%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.rr%20%7B%0A%09background-color%3A%20%23ebe2cd%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.ur%20td%2C%0Atable.tlc%20tr.rr%20td%7B%0A%09border%3A%200%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.ur%3Ahover%2C%0Atable.tlc%20tr.rr%3Ahover%7B%0A%09background-color%3A%20%23ffc%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.ur%3Ahover%20td%2C%0Atable.tlc%20tr.rr%3Ahover%20td%7B%0A%09border-width%3A%201px%200%201px%200%20%21important%3B%0A%09border-color%3A%20black%20%21important%3B%0A%09border-style%3A%20solid%20%21important%3B%0A%09vertical-align%3A%20top%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.ur%3Ahover%20.sn%2C%0Atable.tlc%20tr.rr%3Ahover%20.sn%7B%0A%09display%3A%20block%20%21important%3B%0A%09white-space%3A%20normal%20%21important%3B%0A%7D%0A%0Atable.tlc%20tr.ur%3Ahover%20td%20span%2C%0Atable.tlc%20tr.rr%3Ahover%20td%20span%20%7B%0A%09display%3A%20block%3B%0A%7D%0A%0Atable.tlc%20tr.ur%3Ahover%20td%20span.ct%2C%0Atable.tlc%20tr.rr%3Ahover%20td%20span.ct%7B%0A%09display%3A%20inline%3B%0A%7D%0A%0Atable.tlc%20tr.ur%3Ahover%20td%20span%5Bid%5D%3Aafter%2C%0Atable.tlc%20tr.rr%3Ahover%20td%20span%5Bid%5D%3Aafter%7B%0A%20%20content%3A%20attr%28id%29%3B%0A%20%20display%3A%20block%3B%0A%20%20margin-left%3A%20-38px%3B%0A%20%20color%3A%20%23b6af9e%3B%0A%7D%0A%0A%0Adiv%23nav%20table.cv%2C%0Adiv%23nav%20table.cv%20td%20%7B%0A%09background%3A%20%23ebe2cd%20%21important%3B%0A%7D%0A%0Atable.cv%20td.tl%2C%0Atable.cv%20td.bl%20%7B%0A%09height%3A%200%20%21important%3B%0A%7D%0A%0Atable.cv%20td%20span.lk%2C%0Adiv.nl%20span.lk%7B%0A%09display%3A%20block%20%21important%3B%0A%09background%3A%20%23d3cbb8%20%21important%3B%0A%09border%3A%20solid%201px%20%23b5ae9f%20%21important%3B%0A%09-moz-border-radius%3A%206px%20%21important%3B%0A%09padding%3A%202px%20%21important%3B%0A%09margin-right%3A%205px%20%21important%3B%0A%7D%0A%0A%0Atable.cv%20td%20span.lk%20%7B%0A%09background%3A%20%23d3cbb8%20%21important%3B%0A%09border%3A%20solid%201px%20%23b5ae9f%20%21important%3B%0A%7D%0A%0Adiv.nl%20span.lk%20%7B%0A%09background%3A%20%23ebe2cd%20%21important%3B%0A%09border%3A%20solid%201px%20%23ebe2cd%20%21important%3B%0A%7D%0A%0Adiv.nl%20span.lk%3Ahover%20%7B%0A%09background%3A%20%23d3cbb8%20%21important%3B%0A%09border-color%3A%20%23b5ae9f%20%21important%3B%0A%7D%0A%0Adiv%23nav%20sup%20%7B%0A%09display%3A%20none%20%21important%3B%0A%7D%0A%0A%0Adiv%23co%20div%20%7B%0A%09border%3A%200%20%21important%3B%09%0A%7D%0A%0Adiv%23tc_top%20table%2C%0Adiv%23tc_top%20table%20td.tl%2C%0Adiv%23tc_top%20table%20td.tr%2C%0Adiv%23tc_top%20table.th%2C%0Adiv%23tc_bot%20table%2C%0Adiv%23tc_bot%20table%20td.bl%2C%0Adiv%23tc_bot%20table%20td.br%2C%0Adiv%23tc_bot%20table.th%7B%0A%09background%3A%20none%20%21important%3B%0A%7D%0A%0Adiv%23co%20div%23tc_top%2C%0Adiv%23co%20div%23tc_bot%20%7B%0A%09border%3A%20solid%201px%20black%20%21important%3B%0A%09-moz-border-radius%3A%208px%20%21important%3B%0A%09padding%3A%202px%20%21important%3B%0A%09margin%3A%205px%200%205px%200%20%21important%3B%0A%09background%3A%20%23d3cbb8%20%21important%3B%0A%7D%0A%0Adiv%23co%20div%23tc_top%20span.l%2C%0Adiv%23co%20div%23tc_bot%20span.l%7B%0A%09color%3A%20%239f3638%20%21important%3B%0A%7D%0A%0A%0Adiv%23co%20div%23tbd%20%7B%0A%09background%3A%20%23ebe2cd%20%21important%3B%0A%09border%3A%20solid%201px%20black%20%21important%3B%0A%09-moz-border-radius%3A%208px%20%21important%3B%0A%09padding%3A%204px%200%204px%200%20%21important%3B%0A%7D%0A%0Adiv%23nb_0%20%7B%0A%09background%3A%20none%3B%0A%09padding%3A%200%3B%0A%09margin%3A%200%3B%0A%09border%3A%200%3B%0A%7D%0A%0Adiv%23nb_0%20div%20%7B%0A%09background%3A%20none%3B%0A%09padding%3A%200px%3B%0A%09margin%3A%200%3B%0A%09border%3A%200%3B%0A%7D%0A%0Adiv%23nb_0%20div%20div%20%7B%0A%09border%3A%20solid%201px%20%2356765e%3B%0A%09-moz-border-radius%3A%206px%20%21important%3B%0A%09padding%3A%200%201px%200%200%20%21important%3B%0A%7D%0A%0Adiv%23nb_0%20div%20div%20div%20%7B%0A%09border%3A%200%20%21important%3B%0A%09padding%3A%200%20%21important%3B%0A%09background%3A%20none%20%21important%3B%0A%09-moz-border-radius%3A%200%20%21important%3B%0A%7D%0A%0Adiv%23nb_0%20div.s%2C%0Adiv%23nb_0%20div.h%7B%0A%09padding%3A%201px%203px%200%203px%20%21important%3B%0A%09background%3A%20none%20%21important%3B%0A%09border-bottom%3A%20solid%201px%20%2356765e%20%21important%3B%0A%09-moz-opacity%3A%200.5%3B%0A%7D%0A%0Adiv%23nb_0%20table%2C%0Adiv%23nb_0%20table%20td.tl%2C%0Adiv%23nb_0%20table%20td.tr%2C%0Adiv%23nb_0%20table%20td.bl%2C%0Adiv%23nb_0%20table%20td.br%20%7B%0A%09background%3A%20none%20%21important%3B%0A%7D%0A%0Adiv%23nb_0%20table.nb%20%7B%0A%09background%3A%20%23d0e7c5%20%21important%3B%0A%09-moz-border-radius-bottomright%3A%206%20%21important%3B%0A%09-moz-border-radius-bottomleft%3A%206%20%21important%3B%0A%7D%0A%0Adiv%23nb_0%20table.nb%20div.lk%20%7B%0A%09text-decoration%3A%20none%20%21important%3B%0A%09margin%3A%203px%200%200%203px%20%21important%3B%0A%7D%0A%0Adiv%23nb_0%20table.nb%20div%23prf_l%20%7B%0A%09margin-right%3A%2050px%20%21important%3B%0A%09-moz-opacity%3A%200.7%20%21important%3B%0A%7D%0A%0A%0A%23il%20%7B%0A%09display%3A%20none%20%21important%3B%0A%7D%0A%0Adiv%23ft%20%7B%0A%09display%3A%20none%20%21important%3B%0A%7D%0A%0Adiv%23nav%20%7B%20width%20%3A%2024ex%20%21important%3B%20%7D%0Adiv%23co%20%7B%20margin-left%20%3A%2024ex%20%21important%3B%20%7D%0A%0A");
 cssStyle = cssStyle + 'div#ds_inbox { background-image: url("data:image/gif;base64,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");}';
 addGlobalStyle(cssStyle);
})()


