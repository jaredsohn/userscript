// ==UserScript==
// @name             SindExp [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Показывает кол-во синдэкспы до следующего синдуровня
// @include          http://www.ganjawars.ru/me/*
// @version          1.01
// @author           W_or_M
// ==/UserScript==

(function() {
    
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// таблица опыта
var seExp = {
1 : 5,
2 : 15,
3 : 37,
4 : 76,
5 : 143,
6 : 249,
7 : 412,
8 : 655,
9 : 1007,
10 : 1505,
11 : 2199,
12 : 3149,
13 : 4433,
14 : 6146,
15 : 8407,
16 : 11362,
17 : 15192,
18 : 20113,
19 : 26394,
20 : 34353,
21 : 44377,
22 : 56931,
23 : 72568,
24 : 91947,
25 : 115853,
26 : 145214,
27 : 181127,
28 : 224882,
29 : 277996,
30 : 342247,
31 : 419713,
32 : 512821,
33 : 624395,
34 : 757716,
35 : 916591,
36 : 1105426,
37 : 1329313,
38 : 1594124,
39 : 1906627,
40 : 2274598,
41 : 2723523,
42 : 3293658,
43 : 4046236,
44 : 5077268,
45 : 6541333,
46 : 8693509,
47 : 11964817,
48 : 17100771,
49 : 25421016,
50 : 39315825
};

// для личной страницы
if (root.location.href.indexOf('http://www.ganjawars.ru/me/') >= 0) {
    
    var nobrs = root.document.body.getElementsByTagName('nobr');
    
    for (i = 0, l = nobrs.length; i < l; i++) {
        
        var sindExp = /(\d+)<\/font><\/b> \((\d+)\) \]/i.exec(nobrs[i].innerHTML);
        
        if (sindExp != null) {
            
            var s1 = nobrs[i].innerHTML.substring(0,nobrs[i].innerHTML.length - 2);
            var s2 = seExp[parseInt(sindExp[1]) + 1] - parseInt(sindExp[2]);
            
            nobrs[i].innerHTML = s1 + '<span style="font-size: 9px; color: rgb(105, 97, 86);"> +'+ s2 +'</span> ]';
            
        }
        
    }
    
}

/*
// для инфы персонажа
if (root.location.href.indexOf('http://www.ganjawars.ru/info.php?id=') >= 0) {
    
    load(function () {
            
            var lis = document.body.getElementsByTagName('li');
            
            for (i = 0, l = lis.length; i < l; i++) {
                
                var sindExp = /\[ <b>(\d+)<\/b> \((\d+)\) \]/i.exec(lis[i].innerHTML);
                
                if (sindExp != null) {
                    
                    var s = lis[i].innerHTML.split(/<br>/i);
                    
                    // колво опыта
                    var exp = seExp[parseInt(sindExp[1]) + 1] - parseInt(sindExp[2]);
                    lis[i].innerHTML = s[0].substring(0, s[0].length - 2) + '<span style="font-size: 9px; color: rgb(105, 97, 86);"> +'+ exp +'</span> ]<br />' + s[1];
                    
                }
            }
            
    });
}
*/

})();