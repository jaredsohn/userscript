// ==UserScript==
// @name           历史恢复工具
// @namespace      li_xiao_ke
// @include        http://*.pub.sina.com.cn:8080/*
// @version        1.0
// ==/UserScript==

var i,
    j;
var aResult = [];
var aResultText = [];
var aResultRadio = [];
var aResultOther = [];
var aResultSel = [];
var aResultIpt = [];
var toggleSucFail = false;

function bianli() 
{
    aResult = [];
    aResultText = [];
    aResultRadio = [];
    aResultOther = [];
    aResultSel = [];
    aResultIpt = [];
    var re = /^_FORM_PF_sp_f\d+$/ig;
    var re2 = /^change__FORM_PF_sp_f\d+_(yes|no)$/ig;
    var re3 = /^_FORM_PF_sp_f\d+_\d+$/ig;
    var re4 = /^restrict_select_sp_f\d+$/ig;
    var arr = document.getElementsByTagName('*');
    for (i in arr)
    {
        if (arr[i] && arr[i].nodeType == 1)
        {
            if (arr[i].id)
            {
                if (re.test(arr[i].id))
                {
                    aResult.push(arr[i]);
                }

                else if (re3.test(arr[i].id))
                {
                    aResultOther.push(arr[i]);
                }
                else if (re4.test(arr[i].id))
                {
                    aResultSel.push(arr[i]);
                }

            }
            else
            {
                if (re.test(arr[i].name))
                {
                    aResultIpt.push(arr[i]);
                }
            }
        }
    }
}

// 第一次获取页面需要的元素
bianli();


var _str = "";


    var select = document.getElementById("docv_select");
    
      
    select.onchange = function(){
        docv_onchange_define();
    }
    
    function docv_onchange_define() {
    

     
        var cgifile = select.value;
        var index = select.selectedIndex;
        var version_no = select.options[index].text;
        var _parmValue = getParam();
        var theurl = "http://log.pub.sina.com.cn/cgi-bin/gsps/document_oncemore.cgi?logfile=" + cgifile + "&version_no=" + version_no + "&d_id=" + _parmValue.d_id + "&p_id=" + _parmValue.p_id + "&t_id=" + _parmValue.t_id;
        setTimeout(function() {
            getData(theurl);
        },
        300);
    }



function getParam() 
{
    var _json = "{";
    var href = window.location.href;
    if (href.lastIndexOf('?') > -1) {
        var _str = href.substring(href.lastIndexOf('?') + 1);
        var _arr = _str.split('&');
        for (var i = 0; i < _arr.length; i++)
        {
            if (i > 0) _json += ',';
            var _arr1 = _arr[i].split('=');
            _json += _arr1[0] + ":" + _arr1[1];
        }
        _json += "}";
    }
    var _values = eval('(' + _json + ')');
    return _values;
}

function getData(dataurl) 
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: dataurl,
        overrideMimeType: 'text/plain;charset=gb2312',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows NT 6.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Charset': "GB2312;q=0.7,*;q=0.7"
        },
        onload: function(responseDetails)
        {
        
            var tips = 0,
                objtips = document.getElementsByClassName('js_gmspanti'),
                tipslen = objtips.length;
            
            if(tipslen > 0){
                for(; tips < tipslen; tips++){
                   if(objtips[0]) {
                       objtips[0].parentNode.removeChild(objtips[0]);
                   }           
                }
            }
                                
            var loading = document.createElement('div');
            loading.id = 'gmloading';
            loading.style.height = '100px';
            loading.style.width = '200px';
            loading.style.backgroundColor = 'white';
            loading.style.border = '2px solid blue';
            loading.innerHTML = '请重试......';
            loading.style.position = 'fixed';
            loading.style.left = '50%';
            loading.style.top = '50%';
            loading.style.marginLeft = '-100px';
            loading.style.marginTop = '-50px';
            loading.style.display = 'block';
            document.body.appendChild(loading);
            var str = responseDetails.responseText;
            tempDiv = document.createElement('div');
            tempDiv.id = 'tempDivBox';
            tempDiv.style.display = 'none';
            tempDiv.innerHTML = str;
            document.body.appendChild(tempDiv);
            var tmp1 = document.getElementById('tempDivBox');
            var allElm = tmp1.getElementsByTagName('*');

            // 元素有id
            for (i = 0; i < allElm.length; i++) {
                if (allElm[i].id)
                {
                    for (var j = 0; j < aResult.length; j++)
                    {
                        if (allElm[i].id == aResult[j].id)
                        {
                            aResult[j].value = allElm[i].value;
                            toggleSucFail = true;
                        }
                    }
                }
            }

            // 元素有name
            for (i = 0; i < allElm.length; i++) {
                if (allElm[i].name)
                {
                    for (var j = 0; j < aResultIpt.length; j++)
                    {
                        if (allElm[i].name == aResultIpt[j].name)
                        {
                            aResultIpt[j].value = allElm[i].value;
                            toggleSucFail = true;
                        }
                    }
                }
            }

            // 元素其他情况
            for (i = 0; i < allElm.length; i++)
            {
                if (allElm[i].id)
                {
                    for (var j = 0; j < aResultOther.length; j++)
                    {
                        if (allElm[i].id == aResultOther[j].id)
                        {
                            if (aResultOther[j].parentNode && allElm[i].parentNode)
                            {
                                aResultOther[j].parentNode.innerHTML = allElm[i].parentNode.innerHTML;
                                toggleSucFail = true;
                            }
                        }
                    }
                }
            }


            // 元素其他情况-图片上传
            for (i = 0; i < allElm.length; i++) {
                if (allElm[i].id != '')
                {
                    for (var j = 0; j < aResultSel.length; j++)
                    {
                        if (allElm[i].id == aResultSel[j].id)
                        {
                            var parents = aResultSel[j].parentNode;
                            
                            if(parents){
                                parents.innerHTML = allElm[i].parentNode.innerHTML;
                           
                        
                                if (parents.getElementsByTagName('img')[0])
                                {
                                
                                    var tmpimg = parents.getElementsByTagName('img')[0].src;
                                    var tmpspan1 = document.createElement('span');
                                    tmpspan1.className="js_gmspanti";
                                    tmpspan1.innerHTML = '<br /><strong style="color:red">请重新手动添加上传图片：' + tmpimg + '</strong><br />';
                                    parents.appendChild(tmpspan1);
                                    toggleSucFail = true;
                                }
                                
                             }
                        }
                    }
                }
            }

            if (toggleSucFail == true)
            {
                if (document.getElementById('gmloading'))
                {
                    document.getElementById('gmloading').style.display = 'none';
                    document.body.removeChild(document.getElementById('gmloading'));
                }
            }

            document.body.removeChild(tempDiv);
            bianli();

        },
        onprogress: function() { }
    });
}