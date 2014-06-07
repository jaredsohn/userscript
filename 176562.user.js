// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            baidu map dialysis
// @version         1.0
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://static.jiaju.com/jiaju/com/js/dojquery-s-min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    $(document).ready(function () {
        var init = function(){
            window.setTimeout(getLocalData,1500);
        };

        var new_loop = function(){
           // $('#localvalue').val("");
           // $('#localvalue').attr("shopid",'');
           window.setTimeout(init,1500);
            // location.reload();
        };

        var adjustmentParameter = function(){
            $('#localsearch').trigger('click');
            window.setTimeout(transferLocalData,1500);
        };



        var extraction = function(str){
        var re=str.replace(/<\/?[^>]*>/gim,"").replace(/\s/g,"");//去掉所有的html标记,去除文章中间空格
        var result = re.split('坐标：',3);
        var jjs = result[1];
        return jjs;
        };

        var transferLocalData = function(){
            var lng,lat,status;
            var id = $('#localvalue').attr("shopid");
            var city = $('#localvalue').attr("city");
            var cityName = $('#localvalue').attr("cityName");
            var original =$.trim($('#no_0').find('p').html());
            if(original){
                var new_jj =  extraction(original);
                var jj = new_jj.split(',');
                var lng = jj[0];
                var lat = jj[1];
                var status = 1;
                transferBaiduData(id,lng,lat,status,city,cityName);
            }else{
                var lng = 0;
                var lat = 0;
                var status = 0;
                transferBaiduData(id,lng,lat,status,city,cityName);
            }
        };
        var transferBaiduData = function(id,lng,lat,status,city,cityName){
              var n_lng = parseInt(lng);
              if(city == 'tianjing'||n_lng == '117'||n_lng == '116'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'chengdu'||n_lng == '103'||n_lng == '104'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'chongqing'||n_lng == '106'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'hangzhou'||n_lng == '120'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'nanjing'||n_lng == '118'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'wuhan'||n_lng == '114'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'changsha'||n_lng == '112'||n_lng == '113'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'suzhou'||n_lng == '120'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'shenyang'||n_lng == '123'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'xian'||n_lng == '108'||n_lng == '109'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'shijiazhuang'||n_lng == '114'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'wuxi'||n_lng == '120'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'changchun'||n_lng == '125'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'huizhou'||n_lng == '114'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'zhengzhou'||n_lng == '113'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'dalian'||n_lng == '121'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'taiyuan'||n_lng == '112'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'jinan'||n_lng == '116'||n_lng == '117'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'haerbin'||n_lng == '126'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'qingdao'||n_lng == '120'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'yantai'||n_lng == '121'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'dongguan'||n_lng == '113'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'foshan'||n_lng == '113'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'hainan'||n_lng == '110'||n_lng == '109'||n_lng == '108'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else if(city == 'sanya'||n_lng == '109'){
                    $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                            window.setTimeout(new_loop,2000);
                    });
              }else{
                     window.setTimeout(init,2000);
            }
        };

        function getLocalData(){
            $.getJSON("http://10.207.0.240/jsapi.php?type=getshop&callback=?",function(data){
                    var data = eval(data);
                    var id = data.data.shop_id;
                    var city = data.data.city;
                    var str = data.data.city_name; 
                    var cityName=str.substr(0, str.length-1);  
                    $('#localvalue').val(data.data.shop_name);
                    $('#localvalue').attr("shopid",id);
                    $('#localvalue').attr("city",city);
                    $('#localvalue').attr("cityName",cityName);
                    $('#curCityText').trigger('click');
                    $('#selCityInput').val(cityName);
                    $('#selCityButton').trigger('click');
                    window.setTimeout(adjustmentParameter,1000);
            });
        };

        // $('#curCityText').trigger('click');
        // $("a[name*='上海市']").trigger('click');
        window.setTimeout(getLocalData,1500);
    });
}
letsJQuery();