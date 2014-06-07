/*

Copyright (c) 2013 Yuriy Yushin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
// ==UserScript==
// @name       Steam Badges Improvements
// @namespace  http://yuriyyushin.info/
// @version    0.1.3
// @include    http://steamcommunity.com/id/*/badges*
// @include    http://steamcommunity.com/profiles/*/badges*
// @license    MIT License
// @copyright  2013+, Yuriy Yushin
// ==/UserScript==

(function(){
    
    jQuery('head').append('<style>.badges-userjs-label { cursor: pointer; }\
.badges-userjs-label > input { display: none; }\
.badges-userjs-label > input:checked + span { text-decoration: underline !important; }</style>');
    
    
    var insertTo = jQuery('.profile_badges_header');
    
    var isLinks = jQuery('.is_link');
    
    var buttons = [
        {
            text: 'All Badges',
            listener: function() {
                isLinks.slideDown(300);
            }
        },
        {
            text: 'Only With Card Drops Remaining',
            listener: function() {
                var a;
                var b;
                isLinks.each(function(){
                    a = jQuery(this);
                    b = a.find('.progress_info_bold');
                    var c = b.html();
                    if(c && c != undefined)
                        c = c.replace(/[^\d]/g, '');
                    if(!c || c == undefined || !b.length || c == '' || c == '0') {
                        a.slideUp(300);
                    }
                });
                a = null, b = null;
            }
        }
    ];
    
    var count = 0, count2 = 0;
    var num;
    isLinks.find('.progress_info_bold').each(function(){
        num = this.innerHTML.replace(/[^\d]/g, '');
        if(num != '' && num != '0') {
            count += parseInt(num);
            ++count2;
        }
    });
    num = null;
    
    var div = jQuery('<div style="text-align: right;"><div><span>Total Card Drops Remaining: <strong>' + 
                     count + 
                     '</strong> | Total Games With Card Drops Remaining: <strong>' + 
                     count2 + 
                     '</strong></span></div><span>Show: </span></div>');
    count = null, count2 = null;
    
    for(var i = 0; i < buttons.length; i++) {
        div.append(jQuery('<label class="badge_sort_option whiteLink badges-userjs-label">' +
                          '<input type="radio" name="badges-userjs-radio"' + 
                          (i==0?'checked':'') + 
                          '><span>'+buttons[i].text + 
                          '</span></label>')
                   .on('click', buttons[i].listener));
    }
    insertTo.append(div);
})();