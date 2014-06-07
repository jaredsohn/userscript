// ==UserScript==
// @name       CDN refresh with icenter
// @namespace  tysonpan + wenjuli
// @version    1.0
// @description  CDN批量文件刷新
// @match      http://cdn.isd.com/cdnms2.0/checkmd5/refresh.php*
// @copyright  2013, Tysonpan + wenjuli
// ==/UserScript==

//引入jquery
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


//实际逻辑
function main() {

    //根据文件名查找对应的显示位置的元素
    var showResult = function(file_name,result_txt){
        $('#result_list').find('tr').each(function(){
            var td_elements = $(this).find('td');
            if(td_elements[0].innerHTML == file_name){
                td_elements[1].innerHTML = result_txt;
            }
        });
    };

    //增加输入框高度
    var $input = $('textarea[name=URL]');
    $input.css('height','200px').css('overflow-y','scroll');
    
    var inputStr =
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter_delay-ie6.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter_delay-32.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter_delay.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/icenter_delay.css' + '\n\n' +
    	'http://ctc.qzonestyle.gtimg.cn/qzone_v6/icenter.css' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter@2x.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter-32.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter-32@2x.png' + '\n' +
        'http://ctc.qzonestyle.gtimg.cn/qzone_v6/sprite/icenter-ie6.png';
;
    $input.val(inputStr);
    


    //添加初始表格
    $(document.body).append('<br><br><table width="65%" cellspacing="0" class="S0"><tbody id="result_list"><tr height="10" width="30%" class="Sbg"><td>刷新文件</td><td>刷新结果</td></tr></tbody></table>');
    $(document.body).append('<br><p>----------------以下是详细信息-----------------</p>');

    //替换按钮事件
    $('input[name=Submit]').click(function(){
        //清空上次记录
        $('table:gt(0)').remove();
        $('#result_list').find('tr:gt(0)').remove();
        $('br:gt(2)').remove();

        //获取文件列表
        var file_arr = $input.val().split('\n');
        //循环处理
        for(var i=0;i<file_arr.length;i++){
            if(file_arr[i]!= ''){
                //要刷新的文件名
                var file_name = file_arr[i];
                //添加结果记录行
                $('#result_list').append('<tr><td>'+file_name+'</td><td><img src="http://qzonestyle.gtimg.cn/qzone_v6/gb/img/loading_16.gif" /></td></tr>');

                //发起刷新请求
                $.ajax({
                    url:'http://cdn.isd.com/cdnms2.0/checkmd5/refresh.php?URL='+file_name+'&Submit=刷新',
                    type:'GET',
                    dataType:'text',
                    error:function () {
                        console.log('请求失败');
                    },
                    success:function(feedback){
                        //获取返回的两个表格
                        var tables = feedback.match(/<table[\s\S]+?<\/table>/gi);
                        //文件名
                        var result_file_name = $(tables[0]).find('td').get(2).innerHTML;
                        //该文件的刷新结果
                        var result_text = $(tables[0]).find('td').get(3).innerHTML;
                        //显示结果
                        showResult(result_file_name,result_text);
                        //显示详细信息
                        $(document.body).append(tables[1]);
                        $(document.body).append('<br><br>');
                    }
                 });
            }
        }

        return false;
    });
}

addJQuery(main);