// ==UserScript==
// @name        web QQ旋风/xuanfeng
// @namespace   web QQ旋风/xuanfeng
// @description 旋风离线链接导出
// @include     http://lixian.qq.com/main.html*
// @version     0.9.2
// @Author: maplebeats
// @mail: maplebeats@gmail.com
// ==/UserScript==
/*
* BUG:文件重名无法正常下载.....
* TIPS:$是tencent自己的一个function,不是jQuery
* TODO:aria2-rpc状态检查等
*/
function contentEval(source) {
    // Check for function input.
    if ('function' == typeof source) {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
    }
    // Create a script node holding this  source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval(function () {
    var context = '<progress id="re-pro" value=0 style="width:280px;"></progress>'+
        '<font color="red"></font>'+
        '<div id="messager" style="border:1px solid;margin-top:5px;padding:5px;width:280px;">Welcome</div>';
    jQuery("#share_opt").html(context).css('float','left').css('width','250px').css('margin','20px');
    jQuery('.main').css('width','80%');
    jQuery('#cont_wrap').css('width','100%');
    jQuery("#down_box").remove();
    jQuery(".mod_copyright").remove();
    jQuery(".top").remove();
    jQuery(".search_box").remove();
    jQuery("#task_dl_local em").html("Aria2导出");
    jQuery("#task_share_multi em").html('一键RPC');
});
contentEval(function () {
    EF = {};
    var task_info = [];
    var mode = 1;
    var t_count = 0;
    EF.get_url = function (code) {
        jQuery.ajax({
            type: "post",
            url: "/handler/lixian/get_http_url.php",
            data: code,
            cache: false,
            timeout: 10000,
            dataType: "json",
            async: true, //TvT
            success: function (data) {
                if (data && data.ret == 0) {
                    var url = data["data"];
                    var temp_json = { "name": code.filename, "url": url.com_url, "cookie": url.com_cookie };
                    task_info.push(temp_json);
                    EF.task_check();
                }
                else {
                    XF.widget.msgbox.show("请求url失败", 2, 2000);
                    t_count--;
                    EF.task_check();
                }
            },
            error: function () {
                XF.widget.msgbox.show("请求url失败", 2, 2000);
                t_count--;
                EF.task_check();
            }
        });
    }
    EF.task_check =  function(){
        var count = task_info.length;
        jQuery('#re-pro').attr('max',t_count).attr('value',count);
        if(count == t_count){
            if(mode === 1){
                EF.init_pop();
            }else if(mode === 2){
                EF.rpc();
            }
            jQuery('#share_opt font').html('Success!');
            t_count = 0; //re
        }else{
            return false;
        }
    }
    EF.rpc = function (data) {
        var data = task_info;
        var url = jQuery("#rpc-url").val();
        if(url == undefined){
            url = localStorage.rpc;
        }else{
            localStorage.rpc = url;
        }
        var count = data.length;
        for (var i=0;i<count;i++) {
            var tmp = data[i];
            var uri = { 'jsonrpc': '2.0', 'id': (new Date()).getTime().toString(), 'method': 'aria2.addUri', 'params': [[tmp.url, ], { 'out': tmp.name, 'header': 'Cookie: FTN5K=' + tmp.cookie}] }; /*,'split':'10','continue':'true','max-conection-per-server':'5','parameterized-uri':'true'}]};*/
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url + "?tm=" + (new Date()).getTime().toString(), true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send(JSON.stringify(uri));
        }
        XF.widget.msgbox.hide();
        XF.widget.msgbox.show("任务已经添加至aria2-rpc,请自行查看", 0, 1000, false)
    }
    EF.get_rpc = function(){
    		return 'http://zean.mooo.com:6800/jsonrpc';
        if(localStorage.rpc)
            return localStorage.rpc;
        else
            return 'http://localhost:6800/jsonrpc';
    }
    EF.init_pop = function () {
        var html = '<div class="choose_start" style="height:150px;">'+
        '<p>运行<code>aria2c -c -s10 -x10 -i file</code>使用下载文件</p>'+
        '<div>'+
        '<select id="choose" style="background:rgba(255,255,255,0.5);"><option value=1>aria2文件</option><option value=2>aria2命令</option><option value=3>wget命令</option></select>'+
        '---><a id="save-as" style="color:red" href="data:text/html;charset=utf-8,' + encodeURIComponent(EF.create_data('1')) + '" target="_blank" title="右键另存为" download="test"><span><em>导出(另存为或者点击)</span></em></a>'+
        '</div>'+
        '<div style="margin-top: 20px;">'+
        '<p>后台运行<code>aria2c -c -s10 -x10 --enable-rpc</code></p>'+
        '<div><input id="rpc-url" type="text" style="width:200px;background:rgba(0,0,0,0);" value="'+EF.get_rpc()+'"></input></div><div id="rpc" class="com_opt_btn"><span><em>RPC</em></span></div>'+
        '</div>'+
        '</div>';
        jQuery('#messager').html(html);
        /*
        jQuery("#choose_files_table").html(html);
        window.choose_download_files = new xfDialog("choose_download_files");
        XF.widget.msgbox.hide();
        choose_download_files.show();
        jQuery(".com_win_head_wrap em").html("导出");
        jQuery(".opt").hide();
        */
        jQuery("#rpc").bind("click", function () {
            EF.rpc();
        });
        jQuery("#choose").bind("change", function () {
            var data = EF.create_data(jQuery(this).val());
            var href = "data:text/html;charset=utf-8," + encodeURIComponent(data);
            jQuery("#save-as").attr("href", href);
        });
        /*
        jQuery("#choose_download_files .close_win").bind("click", function () {
            jQuery(".com_win_head_wrap em").html("下载任务");
            jQuery(".opt").show();
        });
        */
    }
    EF.create_data = function (value) {
        var url = task_info;
        var html = '';
        var count = url.length;
        for (var i=0;i<count;i++) {
            var data = url[i];
            var cookie = data.cookie;
            var http = data.url;
            var name = data.name;
            switch (value) {
                case '1':
                    html += http + "\n  header=Cookie: FTN5K=" + cookie + "\n"+
                    "  out=" + name + "\n" +
                    "  continue=true\n";
                    //html += "  parameterized-uri=true\n";
                    //html += "  max-conection-per-server=5\n";
                    //html += "  split=10\n"; //谁能告诉我为什么这个设置了完全无效？？？？
                    break;
                case '2':
                    html += "aria2c -c -s10 -x10 -o '" + name + "' --header 'Cookie: FTN5K=" + cookie + "' " + http + "\n";
                    break;
                case '3':
                    html += "wget -c -O " + name + "--header Cookie:FTN5K=" + cookie + " " + http + "\n";
                    break;
                defalut:
                    break;
            }
        }
        return html
    }
    EF.get_choice = function(){
        var dl_tasks = [];
        var tmp_taskid_str = '';
        var tasks_count = 0;
        for (var task_id in g_task_op.last_task_info) {
            var tmp_obj = g_task_op.last_task_info[task_id];
            if (check_failed_task(task_id)) continue;
            var checkbox_elem = $('task_sel_' + task_id);
            if (checkbox_elem && !checkbox_elem.checked) continue;
            if (tmp_obj == null || tmp_obj.file_size != tmp_obj.comp_size) continue;
            if (tmp_obj.dl_status != TASK_STATUS['ST_UL_OK']) continue;
            var json_temp = { "filename": tmp_obj.file_name, "hash": tmp_obj.code, "browser": "other" };
            dl_tasks.push(json_temp);
            tmp_taskid_str = task_id;
            tasks_count++;
        }
        if(tasks_count == 0){
            return false;
        }else{
            return dl_tasks;
        }
    }
    EF.hander_tasks = function(){
        jQuery('#share_opt font').html('......');
        task_info = [];
        var data = EF.get_choice();
        console.log(data);
        t_count = data.length;
        for (var i=0;i<t_count;i++) {
            EF.get_url(data[i]);
        }
    }
    EventHandler.task_batch2local = function (e) {
        var disabled = jQuery(e).hasClass("disabled_btn");
        if (disabled) {
            return false;
        }
        XF.widget.msgbox.show("后台开始请求下载连接...", 0, 1000, false);
        EF.hander_tasks();
        mode = 1;
    }
    EventHandler.task_share = function(e){
        var disabled = jQuery(e).hasClass("disabled_btn");
        if (disabled) {
            return false;
        }
        jQuery('#messager').html('RPC...');
        XF.widget.msgbox.show('后台添加任务中', 0, 1000, false);
        EF.hander_tasks();
        mode = 2;
    }
});
