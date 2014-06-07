// ==UserScript==
// @name           Google検索 - ページの年齢をカラフルに (Colorize Date & Time)
// @version        0.1
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.tld/search?*
// @description    Google検索結果に表示される「☆日前」「△時間前」などに色を付け、さらに見やすくします。
// ==/UserScript==

(function() {
   
    //日付を表示できるように「過去１５年」に固定する
    //...とそんなことしたら関連キーワードが表示されなかったので却下
    /*
    var reset = document.evaluate('//div[@id="tbd"]/div[@class="tbt"]',document,null,7,null).snapshotItem(1);
    var reset = document.evaluate('./div',reset,null,7,null).snapshotItem(0);
    var resetLink = document.evaluate('./a',reset,null,7,null).snapshotItem(0);
    if(resetLink){
       resetLink.href+='&as_qdr=y15';
    }
    var items = document.evaluate('//div[@id="tbd"]//div[@class="tbou"]/a',document,null,7,null);
    for (var i = 0; i < items.snapshotLength; i++)
    {
        item=items.snapshotItem(i);
        var style = item.getAttribute('style');
        if(style)
        {
            item.href+='&as_qdr=y15';
            break;
        }
    }
    */
    
    function handle(node){
        var items = document.evaluate('.//span[contains(concat(" ",@class," "), " f ")]',node,null,7,null);

        var ts = new Date();
        for (var i = 0; i < items.snapshotLength; i++)
        {
           item = items.snapshotItem(i);
           dateText = item.innerHTML;
           //空白以前をとる
           if(dateText.match(/^(.+?[前日]) /)) dateText=RegExp.$1;
           item.innerHTML = simplify(dateText,ts);
           item.style.background = getColor(dateText,ts);;
           
        }
    }
    
    function simplify(dateText,ts){
       if(dateText.match(/^[0-9]{2}([0-9]{2})年([0-9]+)月([0-9]+)日$/))
       {
           var year = RegExp.$1, month = RegExp.$2; day = RegExp.$3;
           var nowYear = ts.getFullYear() - 2000;
           if(year == nowYear)
                return month + '月' + day + '日';
           else if(year == nowYear - 1)
                return year + '年' + month + '月';
           else
                return year + '年';
       }
       else 
           return dateText;
    }
    
    function getColor(dateText,ts){
        if(dateText.match(/秒前$/)) //1分以内
            return '#ffb2b2';
        else if(dateText.match(/[0-9] ?分前$/)) //10分以内
            return '#ffb2b2';        
        else if(dateText.match(/[0-9]+ ?分前$/)) //一時間以内
            return '#ffb2b2';
            
        else if(dateText.match(/[1-6] ?時間前$/)) //半日以内
            return '#ffc1e0';
        else if(dateText.match(/[0-9]+ ?時間前$/)) //一日以内
            return '#ffc1e0';

        else if(dateText.match(/[1-3] ?日前$/)) //3日以内
            return '#ffccff';
        else if(dateText.match(/[1-9]+ ?日前$/)) //一週間以内？
            return '#ffccff';
        else
        {
            if(dateText.match(/^([0-9]{4})年([0-9]+)月([0-9]+)日$/))
            {
                //現在とこの日付との差を日数で求める
                var tsThis = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
                diffDay = (ts - tsThis) / 86400000;

                if(diffDay < 30) //1ヶ月以内                
                    return '#ead6ff';
                if(diffDay < 60) //2ヶ月以内                
                    return '#e0e0ff';
                if(diffDay < 90) //3ヶ月以内
                    return '#e0e0ff';
                if(diffDay < 180) //半年以内
                    return '#eaf4ff';
                if(diffDay < 365) //1年以内
                    return '#f4ffff';
                if(diffDay < 365 * 2) //2年以内
                    return null;
                if(diffDay < 365 * 3) //3年以内
                    return null;
                if(diffDay < 365 * 5) //5年以内
                    return null;
            }
        }
        
        return null;
    }
   
    document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
	    var node = evt.target;
        handle(node);
    }, false);

    handle(document);
})();

