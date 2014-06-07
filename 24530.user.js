// ==UserScript==
// @name           LDR for Weather
// @namespace      http://endflow.net/
// @description    changes the appearance for livedoor Weather feed.
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.3.1
// @history        [2008-02-??] 0.1.0 first version
//                 [2008-03-25] 0.2.0 improved: highlight today
//                 [2008-03-26] 0.2.1 improved: optimized, cleaned
//                 [2008-04-04] 0.2.2 bugfixed: sort by date (radix bug)
//                 [2008-09-20] 0.3.0 supported: Firefox 3
//                 [2008-09-20] 0.3.1 improved: supported min-temperature

(function(){
//// Config
var cfg = {
    limit: {
        before: 7,
        after: 6
    },
    label: true,
    interval: {
        first: 50,
        default: 1000
    },
    today: '#FFAA59'
}

GM_addStyle(<><![CDATA[
table.l4w {
    margin: 8px 0px 0px 11px;
    border-width: 1px;
    border-spacing: 2px;
    border-style: outset;
    border-color: gray;
    border-collapse: collapse;
}
table.l4w th {
    border-width: 1px;
    padding: 3px;
    border-style: dotted;
    border-color: gray;
}
table.l4w td {
    border-width: 1px;
    padding: 3px;
    border-style: dotted;
    border-color: gray;
}
table.l4w span.max_temp {
    color: red;
}
table.l4w span.min_temp {
    color: blue;
}
table.l4w img {
    display: block;
}
]]></>);

//// Main
var _Date = Date;
var w = this.unsafeWindow || window;
w.addEventListener('load', function(){with(w){
    register_hook('AFTER_PRINTFEED', function(){
        if(get_active_feed().channel.title.indexOf('livedoor 天気情報') == -1) return;
        var cdt = new _Date(); // current date
        var hdt = new _Date(cdt.getFullYear(), cdt.getMonth(), cdt.getDate() - cfg.limit.before); // head date
        var tdt = new _Date(cdt.getFullYear(), cdt.getMonth(), cdt.getDate() + cfg.limit.after); // tail date
        var crawler = function(){
            var titles = $x('//h2[@class="item_title"]/a');
            var num = parseInt($x('id("scroll_offset")/../text()')[0].nodeValue);
            if(titles.length != num){setTimeout(crawler, cfg.interval.default);return}
            var weathers = [];
            var bodies = $x('//div[@class="item_body"]/div[@class="body"]');
            titles.forEach(function(title, i){
                var dtstr = title.href.slice(-8);
                var dt = new _Date(parseInt(dtstr.substr(0,4), 10), parseInt(dtstr.substr(4,2), 10)-1, parseInt(dtstr.substr(6), 10), 0, 0, 0);
                var descs = title.innerHTML.split(' - ');
                var weather = descs[1];
                var max = title.innerHTML.match(/- 最高気温(\d+℃) -/);
                max = (max && max[1]) ? max[1] : '-';
                var min = bodies[i].innerHTML.match(/最低気温は(\d+℃)で/);
                min = (min && min[1]) ? min[1] : '-';
                weathers.push({date:dt, jdate:descs[3], weather:descs[1], maxtemp:max, mintemp:min, elem:title});
            });
            weathers = weathers.filter(function(wt){return hdt <= wt.date && wt.date <= tdt});
            weathers.sort(function(a,b){return a.date < b.date ? -1 : (a.date > b.date ? 1 : 0)});
            weathers = array_cut(weathers, 7);
            var parent = $('right_body');
            var entries = $x('//div[@id="right_body"]/div[@class != "channel" and @class != "channel_toolbar" and @class != "footer"]');
            entries.forEach(function(entry){entry.parentNode.removeChild(entry)});
            // make frame
            var div = $N('div');
            parent.appendChild(div);
            // add weathers
            weathers.forEach(function(list, i){
                var table = $N('table', {class:'l4w'});
                div.appendChild(table);
                table.appendChild($N('tr', {id:'l4w_date_'+i, valign:'middle', align:'center'}));
                $('l4w_date_'+i).appendChild($N('th', {}, '日付'));
                table.appendChild($N('tr', {id:'l4w_weather_'+i, valign:'middle', align:'center'}));
                $('l4w_weather_'+i).appendChild($N('th', {}, '天気'));
                table.appendChild($N('tr', {id:'l4w_temp_'+i, valign:'middle', align:'center'}));
                $('l4w_temp_'+i).appendChild($N('th', {}, '気温'));
                list.forEach(function(wt){
                    $('l4w_date_'+i).innerHTML += '<td' + (date_eq(wt.date, cdt) ? ' style="background-color:' + cfg.today + '"' : '')
                        + '>' + wt.jdate + '</td>'
                    $('l4w_weather_'+i).innerHTML += '<td><img src="' + makeIconURI(wt.weather) + '" />'
                        + '<span>' + (cfg.label ? wt.weather : '') + '</span></td>';
                    $('l4w_temp_'+i).innerHTML += '<td><span class="max_temp">' + wt.maxtemp + '</span>'
                        + '<span> / </span>'
                        + '<span class="min_temp">' + wt.mintemp + '</span>';
                });
            });
        }
        setTimeout(crawler, cfg.interval.first);
    });
}}, false);
var ICON = {"晴れ":1,"晴時々曇":2,"晴時々雨":3,"晴時々雪":4,"晴のち曇":5,"晴のち雨":6,"晴のち雪":7,
    "曇り":8,"曇時々晴":9,"曇時々雨":10,"曇時々雪":11,"曇のち晴":12,"曇のち雨":13,"曇のち雪":14,
    "雨":15,"雨時々晴":16,"雨時々止む(曇り)":17,"雨時々曇":17,"雨時々雪":18,"雨のち晴":19,"雨のち曇":20,"雨のち雪":21,
    "雨で暴風を伴う":22,"雪":23,"雪時々晴":24,"雪時々止む(曇り)":25,"雪時々雨":26,"雪のち晴":27,
    "雪のち曇":28,"雪のち雨":29,"暴風雪":30};
function makeIconURI(weather){return "http://image.weather.livedoor.com/img/icon/"+ICON[weather]+".gif"}
function date_eq(dt1, dt2){return dt1.getMonth() === dt2.getMonth() && dt1.getDate() === dt2.getDate()}
function array_cut(array, num){
    var res = [];
    array.forEach(function(e, i){
        var row = Math.floor(i / 7);
        if(!res[row]){res[row] = []}
        res[row][i % 7] = e;
    });
    return res;
}
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,n=[];i=r.iterateNext();n.push(i));return n}
})();
