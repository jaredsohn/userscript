// ==UserScript==
// @name       shanbayadmin
// @namespace  http://uedsky.com/
// @version    0.6.8
// @description   Enhance management for Shanbay Group
// @updateURL  https://dl.dropboxusercontent.com/u/10110127/userscripts/shanbayadmin.js
// @downloadURL  https://dl.dropboxusercontent.com/u/10110127/userscripts/shanbayadmin.js
// @match      http://www.shanbay.com/team/show_dismiss/*
// @match      http://www.shanbay.com/team/members/*
// @match      http://www.shanbay.com/17mail/compose/*
// @copyright  2013+, Brook Yang
// ==/UserScript==

(function() {
       
    var href = location.href;
    var username = document.querySelector('.user-avatar').textContent.trim();
    if(href.indexOf('17mail/compose/') > -1) {
        var body = document.getElementById('id_body');
        body.style.width='80%';
        var panel = document.createElement('div');
        panel.innerHTML = '<a href="javascript:" onclick="$(\'#id_body\')[0].value=\'你好，我是【你觉得我应该叫什么】的$uname。小组对打卡率有严\
格的要求（不低于小组打卡率），这是小组的链接http://www.shanbay.com/team/detail/4597/，\
欢迎重回小组。重回小组后，记得去小组看看【小组公告】，里面有一些内容是你需要\
了解的。还有，记得加小组的QQ群，244625197。进群之后，麻烦把你的扇贝昵称和群备注统一一下，这样方便大家认识你。最后，希望你早日重回小组!”\';$(\'#id_subject\')[0].value=\'欢迎重回小组\'">踢人</a>\
&nbsp;&nbsp;<a href="javascript:" onclick="$(\'#id_body\')[0].value=\'你好，我是本周值班组长$uname，如果你今晚打不了卡的话，那\
就在设置里把时区调成加拿大时区，明天中午十二点前把今天的卡补打卡一下，再调回中\
国时区，把当天的卡也打了。希望你以后能和我们一起按时打卡，天天向上！”\';$(\'#id_subject\')[0].value=\'记得补打卡\'">请假</a>'.replace(/\$uname/g, username);
        body.parentNode.appendChild(panel);
        return;
    }
    
    function query(key, def){
        return (location.search.match(new RegExp("(?:^\\?|&)"+key+"=(.*?)(?=&|$)"))||['',def])[1];
    }
    
    function compare (base, expr) {
        var mat = expr.trim().match(/([><]=?|=)\s*([\d\.]+)/);
        var sign = mat[1];
        var num = parseFloat(mat[2]);
        var res;
        if(sign == '>'){
            res = base > num;
        } else if(sign == '>=') {
            res = base >= num;
        } else if(sign == '<') {
            res = base < num;
        } else if(sign == '<=') {
            res = base <= num;
        } else if(sign == '=') {
            res = base == num;
        }
        return res;
    }
    
    function ajax(url, callback) {
         var xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function() {
             if(xhr.readyState == 4 && xhr.status == 200) {
                 callback(xhr.responseText);
             }
         };
         xhr.open('GET', url, true);
         xhr.send(null);
    }
    
    
    // http://stackoverflow.com/questions/20937475/remove-datalist-dropdown-arrow-in-chrome
    var sty = document.createElement('style');
    sty.innerHTML = 'input.filter-input, select.filter-select{ width:40px; margin-bottom:0; height:16px; line-height:16px; padding:3px 5px; }\
input.filter-input { -webkit-appearance: none; }\
input.filter-input::-webkit-calendar-picker-indicator { display: none; }\
select.filter-select { box-sizing: content-box; }\
.mac select.filter-select { width: 50px; height: 24px; line-height: 24px; }\
';
    document.head.appendChild(sty);
    if (navigator.userAgent.indexOf('Mac OS X') != -1) {
    	document.documentElement.classList.add('mac');
    }
    
    var thead = document.querySelector('#members thead');
    
    var thuser = thead.querySelector('.user');
    thuser.innerHTML += '<div style="display:inline-block"><input class="filter-input" style="width: 8em;" type="text"/></div>';
    
    var thdays = thead.querySelector('.days');
    thdays.innerHTML += '<div><input class="filter-input" pattern="^\\s*([><]=?|=)\s*([\\d\\.]+)\\s*$" type="text" list="dayslist"/><datalist id="dayslist"><option value="<=7"><option value="<=14"><option value="<=30"><option value="<100"><option value=">=100"><option value=">=200"><option value=">=300"></datalist></div>';
    
    var thrate = thead.querySelector('.rate')
    thrate.innerHTML += '<div><input class="filter-input" pattern="^\\s*([><]=?|=)\s*([\\d\\.]+)\\s*$" type="text" list="ratelist"/><datalist id="ratelist"><option value=">=93"><option value="<=93"><option value=">=95"><option value="<=95"><option value="=100"></datalist></div>';
    
    var strchecked = '<div><select class="filter-select"><option value="">无</option><option value="未打卡">未打卡</option><option value="已打卡">已打卡</option></select></div>';
    var checked = thead.querySelectorAll('.checked');
    checked[checked.length -1].innerHTML += strchecked;
    if(checked.length > 1) {
        checked[checked.length -2].className = 'checked2';
        checked[checked.length -2].innerHTML += strchecked;
    }
    
    // for(n in localStorage) { if(n.indexOf('shanbayadmin_option') === 0) delete localStorage[n] }
    var selects = thead.querySelectorAll('input,select');
    var hasVal = false;
    Array.prototype.forEach.call(selects, function(s, i) {
        var id = s.parentNode.parentNode.className;
        s.id = 'shanbayadmin_option_filter_' + id;
        s.value = localStorage[s.id] || '';
        s.onchange = function() {
            localStorage[this.id] = this.value;
            filterData();
        };
        hasVal = hasVal || s.value;
    });
    
 
    var tbody = document.querySelector('#members tbody');
    var html = {};
    if(hasVal) {
        filterData();
    }

    
    function filterData() {
        if(!html[1]) { return fetchAll(); }
        var filters = {};
        var eluser = thuser.querySelector('input');
        eluser.value.trim() && (filters[thuser.cellIndex]  = function(v) {
            var name = v.split(/ &nbsp;/, 1)[0];
            return name.indexOf(eluser.value.trim()) > -1;
        });
        
        var eldays = thdays.querySelector('input');
        eldays.value.trim() && (filters[thdays.cellIndex]  = function(v) {
            return compare(parseFloat(v), eldays.value);
        });
        var elrate = thrate.querySelector('input');
        elrate.value.trim() && (filters[thrate.cellIndex]  = function(v) {
            return compare(parseFloat(v), elrate.value);
        });
        
        var elchecked= thead.querySelectorAll('select');
        elchecked[0].value && (filters[checked[0].cellIndex] = elchecked[0].value);
        if(elchecked.length > 1) {
            elchecked[1].value && (filters[checked[0].cellIndex + 1] = elchecked[1].value);
        }
        console.log(filters);
        var str = [];
        for(var n in html) {
            str.push(html[n].replace(/<tr[^>]*>([\s\S]+?)<\/tr>/g, function($0, $1) {
                var tds = $1.split(/<\/td>/g).map(function(v) {
                    return v.trim().replace(/<\/?\w+[^>]*>/g, '').trim();
                });
                var isMatch = true;
                for(var n in filters) {
                    isMatch = isMatch && (typeof filters[n] != 'function' ? filters[n] == tds[n] : filters[n](tds[n]));
                }
                return isMatch ? $0 : '';
            }));
        }
        tbody.innerHTML = str.join('');
        // fix event bindings
        rebind();
    }
    
    function rebind() {
        var src = $('script[src]').filter(function() {
            return this.src.indexOf('team/team') > -1;
        })[0].src;
        console.log(src);
        var s = document.createElement('script');
        s.src = src;
        document.head.appendChild(s);
    }
    
    function fetchAll() {
        var page = parseFloat(query('page', 1));
        var total = parseFloat(document.querySelector('.pagination li:nth-last-child(2)').textContent);
        html[page] = tbody.innerHTML;
        var c = 1;
        for(var i = 1; i <= total; i++) {
            if(i !== page) {
                ajax('?page=' + i, (function (i) {
                    return function(h) {
                        c++;
                        html[i] = h.match(/<tr class="member">[\s\S]*?(?=<\/table>)/g)[0];
                        if(c == total) {
                            filterData();
                        }
                    }
                })(i));
            }
        }
    }
    
})();
