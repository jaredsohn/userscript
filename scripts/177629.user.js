// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            baidu changsha map api
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
           window.setTimeout(init,1500);
        };

        var transferBaiduData = function(id,lng,lat,status){
            var n_lng = parseInt(lng);
            var n_lat = parseInt(lat);
           if((n_lng == '112' || n_lng == '113' || n_lng == '0') & (n_lat == '26'|| n_lat == '27'||n_lat == '28'|| n_lat == '0')){
                $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                        window.setTimeout(new_loop,2000);
                });
            }else{
				var lng = 0;
				var lat = 0;
				var status = 0;
                $.getJSON("http://10.207.0.240/jsapi.php?type=commitxy&shop_id="+id+"&lng="+lng+"&lat="+lat+"&status="+status+"&callback=?",function(data){
                        $('#curCityText').trigger('click');
                        $('#selCityInput').val('长沙');
                        $('#selCityButton').trigger('click');
                        window.setTimeout(init,2000);
                });
            }

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
            var original =$.trim($('#no_0').find('p').html());
            if(original){
                var new_jj =  extraction(original);
                var jj = new_jj.split(',');
                var lng = jj[0];
                var lat = jj[1];
                var status = 1;
                transferBaiduData(id,lng,lat,status);
            }else{
                var lng = 0;
                var lat = 0;
                var status = 0;
                transferBaiduData(id,lng,lat,status);
            }
        };
        function getLocalData(){
            $.getJSON("http://10.207.0.240/jsapi.php?type=getshop&city=changsha&callback=?",function(data){
                    var data = eval(data);
                    // alert(JSON.stringify(data));
                    // alert(data.data.shop_name);
                    var id = data.data.shop_id;
                    $('#localvalue').val(data.data.shop_name);
                    $('#localvalue').attr("shopid",id);
                    // alert($('#localvalue').val());
                    $('#localsearch').trigger('click');
                    window.setTimeout(transferLocalData,1500);
            });
        };
        $('#curCityText').trigger('click');
        $('#selCityInput').val('长沙');
        $('#selCityButton').trigger('click');
        window.setTimeout(getLocalData,2000);
    });
}
letsJQuery();