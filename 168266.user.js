// ==UserScript==
// @name        tiebaCustomFace 
// @updateURL      http://userscripts.org/scripts/source/168266.meta.js
// @downloadURL    http://userscripts.org/scripts/source/168266.user.js
// @description    贴吧自定义表情
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @include     http://tieba.baidu.com/*
// @version     2014.3.23
// ==/UserScript==

var _window = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var $ = _window.$;

var faces = []; //全部表情
var selector; //判断选中的是回复框还是楼中楼
var recentlyFaceNum = 45; //最近使用表情数量
var LZLCss = '.insertsmiley_holder';
//读取表情列表
var splitor = "　"; //GM变量分隔符
var tabNum = 0;

var baiduFace1 = [];
//度娘自带表情

function defaultFace(num, name) {
    this.num = num;
    this.name = name;
}

var face = GM_getValue('FACES', '{"tabName":"","faceSrc":[""],"colCount":"8","rowCount":1,"faceWidth_Height":60,"position":0}');
if (face == "")
    face = '{"tabName":"","faceSrc":[""],"colCount":"8","rowCount":1,"faceWidth_Height":60,"position":0}';
face = face.split(splitor); //分割成数组
for (var i = 0; i < face.length; i++) {
    faces.push(JSON.parse(face[i]));
    if (!faces[i].position)
        faces[i].position = 0;
}

//创建表情构造函数

function Face(tabName, srcArray, colCount, position) {
    this.tabName = tabName;
    this.faceSrc = srcArray;
    this.colCount = colCount;
    this.rowCount = Math.round(srcArray.length / colCount) + 1;
    this.faceWidth_Height = 500 / colCount - 2;
    this.position = position || 0;
}


//响应监听函数
var tbodyHtml = []; //存储表情tbody内的html
var addFaces = function() {
    //获得百度自带表情json，隐藏用
    $('.s_tab_btn').each(function() {
        baiduFace1.push(new defaultFace($(this).attr('data-index'), $(this).find('span').html()));
    });

    faces[0].tabName = "最近";
    addSettingElement(); //添加编辑删除等元素
    addEventOnce(); //添加只需添加一次的事件
    if (faces.length === 0) //保证faces中至少有一个元素
        faces[0] = new Face("", [""], 8);
    for (var index = 0; index < faces.length; index++) {
        var face = faces[index];
        if (face.position == 0)
            selector.find('li.s_tab_btn[data-index="' + (parseInt(face.position) + 1) + '"]').before('<li id="smilyTab' + index + '" class="s_tab_btn customSmily"><span class="s_tab_btnbg" data-index="' + face.tabName + '">' + face.tabName + '</span></li>');
        else
            selector.find('li.s_tab_btn[data-index="' + (parseInt(face.position)) + '"]').after('<li id="smilyTab' + index + '" class="s_tab_btn customSmily"><span class="s_tab_btnbg" data-index="' + face.tabName + '">' + face.tabName + '</span></li>');
        tabOnClick(index);
    }
    //隐藏元素
    var hidef = GM_getValue('hideFace', '');
    if (hidef) {
        hidef = hidef.split(',');
        for (var i = 0; i < hidef.length; i++) {
            $(css + ' li.s_tab_btn[data-index="' + hidef[i] + '"]').hide();
            $(css + ' li.s_tab_btn span[data-index="' + hidef[i] + '"]').parent().hide();
        }
    } //

    var sf = document.querySelector(css + " #showFace");
    sf.addEventListener("click", blacklistManage, false);

    normalTabClick(); //添加自带表情组点击事件
    setTimeout(ImgOnClickAddMostUsedFace, 200); //添加最近表情点击事件
    tabNum = GM_getValue('tabNum', '0');
    //初始化默认表情组
    //if(tabNum!=-1)
    //tabNum = 0;	//默认上次标签页
    //tabNum=0;
    if (tabNum == 0 || tabNum > faces.length) {
        hidemenu();
    }
    if (faces.length > tabNum) {
        selector.find('.selected').removeClass('selected');
        refreshFaces(tabNum);
        selector.find("#smilyTab" + tabNum + " span").addClass('selected');
    } else
        fetchTbodyHtml();
}

//黑名单管理
var blacklistManage = function(dataindex) {
    addBlacklistDiv();
}
//添加表情黑名单管理div
var addBlacklistDiv = function() {
    var blist = GM_getValue('hideFace', "").split(',');
    var html = '<div id="blist"><div id="blistdiv">';
    var content;
    for (var i = 0; i < baiduFace1.length; i++)
        html = html + '<span class="blistElement" index="' + baiduFace1[i].num + '">' + baiduFace1[i].name + '</span>';
    html += '<br>';
    for (var i = 0; i < faces.length; i++)
        html = html + '<span class="blistElement" index="' + faces[i].tabName + '">' + faces[i].tabName + '</span>';
    html += '</div><span id="blistConfig">确认</span></div>';
    selector.find('DIV.s_layer_tab.j_tab').after(html);
    GM_addStyle(blistcss);

    //点击显示/隐藏

    function hasClass(node, className) //是否具有某个类名
    {
        var names = node.className.split(/\s+/);
        for (var i = 0; i < names.length; i++) {
            if (names[i] == className) return true;
        }
        return false;
    }
    var t = GM_getValue('hideFace', '').split(',');
    for (var i = 0; i < t.length; i++) {
        if (t[i])
            $('#blist span.blistElement[index="' + t[i] + '"]').addClass('blisthide');
    }
    var allElement = document.querySelectorAll('#blistdiv span.blistElement');
    [].forEach.call(allElement, function(e) {
        function Eclick() {
            var l = e.getAttribute('index');
            if (hasClass(e, 'blisthide')) {
                e.className = e.className.replace("blisthide", '');
                $('li.s_tab_btn[data-index="' + l + '"]').show();
                if (l == '最近') //默认标签页
                {
                    tabNum = 0;
                    GM_setValue('tabNum', 0)
                }
                $(css + ' li.s_tab_btn span[data-index="' + l + '"]').parent().show();
                var s = GM_getValue('hideFace', '').split(',');
                s.splice(s.indexOf(l), 1);
                GM_setValue('hideFace', s.join(','));

            } else {
                if (l == '最近') {
                    tabNum = 1000;
                    GM_setValue('tabNum', tabNum);
                }
                e.className = e.className + " " + 'blisthide';
                var listTemp = GM_getValue('hideFace', '');
                $('li.s_tab_btn[data-index="' + l + '"]').hide();
                $(css + ' li.s_tab_btn span[data-index="' + l + '"]').parent().hide();
                GM_setValue('hideFace', listTemp + "," + l);
            }
        }
        e.addEventListener('click', Eclick, false);
    });
    var cf = document.querySelector('#blistConfig');
    cf.addEventListener('click', function() {
        $('#blist').remove();
    });
}

//标签点击事件(标签元素背景相关)
//添加设置元素
var addSettingElement = function() {
    selector.find('DIV.s_layer_tab.j_tab').after('<div id="setting">' + '<div id="aditFaceMenu">编辑</div>' //增加编辑按钮
    + '<div id="addFaceMenu">增加</div>' //增加按钮
    + '<div id="deleteFaceMenu">删除</div>' //删除按钮
    + '<div id="tab_MoveLeft">左移</div>' + '<div id="tab_MoveRight">右移</div>' + '<div id="getProfile">导出</div>' + '<div id="loadProfile">导入</div>' + '<div id="showFace">隐藏</div>' + '</div>');
    //+'<div id="settingmenu">显示/隐藏菜单</div>');	
}
//添加只需添加一次的事件
var m, n, s, l, r, cc; //事件
var addEventOnce = function() {
    m = document.querySelector(css + " #aditFaceMenu");
    m.addEventListener("click", aditFace, false);
    n = document.querySelector(css + " #addFaceMenu");
    n.addEventListener("click", addNewFace, false);
    s = document.querySelector(css + " #deleteFaceMenu");
    s.addEventListener("click", deleteFace, false);
    l = document.querySelector(css + " #tab_MoveLeft");
    l.addEventListener("click", tab_MoveLeft, false);
    r = document.querySelector(css + " #tab_MoveRight");
    r.addEventListener("click", tab_MoveRight, false);
    var gp = document.querySelector(css + " #getProfile"); //导出配置
    gp.addEventListener("click", function() {
        if (confirm("转到纯文本模式复制文本保存配置"))
            $('body').html(GM_getValue('FACES'));
    }, false);
    var lp = document.querySelector(css + " #loadProfile"); //导入配置
    lp.addEventListener("click", function() {
        var a = prompt("要导入的数据(覆盖原有数据)");
        if (a) {
            GM_setValue("FACES", a);
            if (confirm("是否确认要导入(将会刷新)"))
                window.location.reload();
        } else
            alert("不能为空");
    }, false);
}
var tabOnClick = function(index) //添加自定义表情标签事件，index为id后缀
{
    function clickIdTab() {
        $('.edui-container li.s_tab_btn[data-index="1"]').click();
        $('.tbui_scroll_bar.j_scroll_bar').show();
        selector.find('TABLE.s_layer_table tbody').html(tbodyHtml[index]);
        if (tabNum != 0)
            GM_setValue('tabNum', index); //记录下标以便下次打开默认为该组
        selector.find('#aditFaceMenu').show(); //显示设置栏
        selector.find('#deleteFaceMenu').show();
        selector.find('#tab_MoveRight').show();
        selector.find('#tab_MoveLeft').show();
        selector.find('.selected').removeClass('selected');
        $(this).find('span').addClass("selected");
        if (index == 0) {
            hidemenu();
        }
    }
    cc = document.querySelector(css + ' #smilyTab' + index);
    cc.addEventListener("click", clickIdTab, false);
}

//普通表情tab点击事件
var normalTabClick = function() {
    var dd = document.querySelectorAll(css + ' LI.s_tab_btn');
    [].forEach.call(dd, function(e) {
        function clickNormalTab() {
            setTimeout(ImgOnClickAddMostUsedFace, 400); //添加表情点击事件
            if (!$(this).attr('id')) {
                selector.find('.customSmily span').removeClass('selected'); //移除选中状态
                hidemenu();
                if (tabNum != 0)
                    GM_setValue('tabNum', 10000);
            }
        }
        e.addEventListener("click", clickNormalTab, false);
    });
}

var hidemenu = function() {
    selector.find('#aditFaceMenu').hide(); //隐藏设置选项
    selector.find('#deleteFaceMenu').hide();
    selector.find('#tab_MoveRight').hide();
    selector.find('#tab_MoveLeft').hide();
}
//修改后更新表情框
var refreshFaces = function(index) {
    tbodyHtml = fetchTbodyHtml();
    selector.find('TABLE.s_layer_table tbody').html(tbodyHtml[index]);
}

//添加表情点击函数，作为常用表情功能
var ImgOnClickAddMostUsedFace = function() {
    var customId = selector.find('.selected').parent().attr('id');
    var reg = /http:\/\/static\.tieba\.baidu\.com\/tb\/editor\/images\/[0-9][0-9]\.gif/;
    var f = document.querySelectorAll('.s_face.j_emotion');
    f && [].forEach.call(f, function(e) {
        var url = e.getAttribute('data-surl');
        e.addEventListener('click', function() {
            var ind = faces[0].faceSrc.indexOf(url);
            if (ind != -1) {
                faces[0].faceSrc.splice(ind, 1);
            }
            if (faces[0].faceSrc.length > recentlyFaceNum)
                faces[0].faceSrc.pop();
            if (!reg.test(url)) {
                faces[0].faceSrc.unshift(url);
                saveFaces();
            }
            if (customId) {
                var cindex = parseInt(customId.replace("smilyTab", ""));
                if (cindex > 0) {
                    var ind = faces[cindex].faceSrc.indexOf(url);
                    faces[cindex].faceSrc.splice(ind, 1);
                    faces[cindex].faceSrc.unshift(url);
                    saveFaces();
                }
            }
        });
    });
}

//针对某些非百度内部和宽度大于100的表情,点击改变BDE_SMILY为BDE_IMAGE,否则会未知错误
unsafeWindow.onClickImg = function(src) {
    /*获取原始图片大小*/
    var theImage = new Image();
    theImage.src = src;
    var myReg = /imgsrc\.baidu\.com|static\.tieba\.baidu\.com/;
    var imageWidth = theImage.width;
    var imageHeight = theImage.height;
    if (!(myReg.test(src) && imageWidth <= 100)) {
        setTimeout(function() {
            var i = $('#ueditor_replace img[src="' + src + '"][class="BDE_Smiley"]')
            i.attr('class', 'BDE_Image');
            //i.attr('width',imageWidth);
            //i.attr('height',imageHeight);
        }, 40);
    }
}
//获取tbodyHtml(表情的HTML表示)
var fetchTbodyHtml = function() {
    var tbody = new Array();
    for (var index = 0; index < faces.length; index++) {
        var face = faces[index];
        tbody[index] = '';
        //face.rowCount += 2;
        var row = 360 / face.faceWidth_Height > face.rowCount ? (360 / face.faceWidth_Height) : face.rowCount;
        for (var i = 0; i < row; i++) {
            tbody[index] += '<tr height=' + face.faceWidth_Height + '>';
            for (var j = 0; j < face.colCount; j++) {
                var data_postflag = (j >= face.colCount / 2) ? 1 : 0; //控制悬浮预览图像的方位,1为右侧
                var cindex = i * face.colCount + j;
                var currentFaceSrc = face.faceSrc[cindex]; //当前表情链接
                var lzlImgReg = /http:\/\/static\.tieba\.baidu\.com\/tb.*/;
                if (css == '.insertsmiley_holder' && !lzlImgReg.test(currentFaceSrc)) //楼中楼不添加百度内部图片
                    currentFaceSrc = undefined;
                if (currentFaceSrc) {
                    currentFaceSrc = currentFaceSrc.replace(/\s|click=[0-9]*/g, ''); //去链接空格
                    tbody[index] += '<td class="s_face j_emotion" index="' + cindex + '" border="1" data-surl="' + currentFaceSrc + '" data-postflag="' + data_postflag + '" style="border-collapse:collapse;"';
                    tbody[index] = tbody[index] + ' align="center" 	bgcolor="#FFFFFF" width="' + face.faceWidth_Height + '" max-height="' + face.faceWidth_Height + '">';
                    tbody[index] += '<a class="img imgclasses" onclick="onClickImg(\'' + currentFaceSrc + '\')" style="background:none;"><img class="faceImg" src="' + currentFaceSrc + '" style="max-height:' + face.faceWidth_Height + 'px;max-width:' + face.faceWidth_Height + 'px;"></img></a>';
                    tbody[index] += '</td>';
                }
            }
            tbody[index] += '</tr>';
        }
    }
    return tbody;
}

//删除表情
var deleteFace = function() {
    var cindex = selector.find('.selected').parent().attr('id').replace("smilyTab", "");
    cindex = parseInt(cindex);
    if (confirm("是否要删除 " + faces[cindex].tabName + " 表情组")) {
        faces.splice(cindex, 1);
        selector.find('.selected').parent().remove();
        saveFaces();
        //动态改变id(faces长度减1了)
        for (var i = cindex; i < faces.length; i++) {
            selector.find("#smilyTab" + (i + 1)).attr('id', 'smilyTab' + i);
            //添加点击函数
            tabOnClick(i);
        }
        if (faces.length > cindex) {
            refreshFaces(cindex);
            selector.find("#smilyTab" + (cindex) + " span").addClass('selected');
        } else if (faces.length > 1) {
            refreshFaces(cindex - 1);
            selector.find("#smilyTab" + (cindex - 1) + " span").addClass('selected');
        } else {
            selector.find('#aditFaceMenu').hide();
            selector.find('#deleteFaceMenu').hide();
        }
    }
}

//添加设置框
var addSettingFloat = function() {
    if (!document.querySelector(css + " #Face_float"))
        selector.find('div').eq(0).after(floatdiv);
    GM_addStyle(ccss);
}
//添加表情函数
var addNewFace = function() {
    addSettingFloat();
    //selector.find('#Face_float').show();
    selector.find('#Face_floatedit').val("");
    selector.find('#tabName').val("未命名");
    selector.find('#colCount').val(8);
    var config_1 = function() {
        var cindex = faces.length;
        selector.find('li.s_tab_btn[data-index="1"]').before('<li id="smilyTab' + cindex + '" class="s_tab_btn customSmily"><span class="s_tab_btnbg">' + selector.find('#tabName').val() + '</span></li>');
        selector.find('.selected').removeClass('selected');
        selector.find("#smilyTab" + cindex).find('span').addClass("selected");
        faces.push(new Face(selector.find('#tabName').val(),
            selector.find('#Face_floatedit').val().split('\n'),
            selector.find('#colCount').val()));
        refreshFaces(cindex);
        tabOnClick(cindex);
        saveFaces();
        selector.find('#maxwindow').remove();
        d.removeEventListener("click", config_1, false); //移除监听
        selector.find('#aditFaceMenu').show();
        selector.find('#deleteFaceMenu').show();
    }
    var d = document.querySelector(css + " #Face_yesc");
    d.addEventListener("click", config_1, false);
    cancle();
}

//设置栏
//悬浮层
var floatdiv = '<div id="maxwindow"><div id="Face_float">' + '<textarea id="Face_floatedit">' + '</textarea></div>' + '<div id="tabSetting"><span id="d_tabName">标签名:<input id="tabName" type="text" onkeydown="if(event.keyCode==13) return false;">' + '</span><span id="d_colCount">每行表情:<input id="colCount" type="text" onkeydown="if(event.keyCode==13) return false;"></span></div>' + '<div id="config"><span id="Face_yesc" class="fff">保存</span><span id="Face_noc" class="fff" >取消</span></div></div>';

//编辑表情
var aditFace = function() {

    //selector.find('#Face_float').show();
    if (selector.find('.selected').parent().attr('id')) {
        addSettingFloat();
        var findex = selector.find('.selected').parent().attr('id').replace("smilyTab", "");
        findex = parseInt(findex);
        initFaceEditor(findex);
        config();
        cancle();
    }
}

//初始化编辑框
var initFaceEditor = function(e) {
    var vals = "";
    for (var i = 0; i < faces[e].faceSrc.length; i++) {
        if (i != faces[e].faceSrc.length - 1)
            vals = vals + faces[e].faceSrc[i] + "\n";
        else
            vals = vals + faces[e].faceSrc[i];
    }

    selector.find('#Face_floatedit').val(vals);
    selector.find('#tabName').val(faces[e].tabName);
    selector.find('#colCount').val(faces[e].colCount);
}

//保存按钮
var config = function() {
    var Face_yesc = function() {
        var findex = selector.find('.selected').parent().attr('id').replace("smilyTab", "");
        findex = parseInt(findex);
        var tabname = selector.find('#tabName').val();
        var colcount = selector.find('#colCount').val();
        var tempsrc = selector.find('#Face_floatedit').val().split('\n');
        faces[findex] = new Face(tabname, tempsrc, colcount);
        saveFaces();
        selector.find('.selected').html(tabname);
        refreshFaces(findex);
        selector.find('#maxwindow').remove();
        c.removeEventListener("click", Face_yesc, false);
    }
    //使用jquery的click事件会使GM_的API无效
    var c = document.querySelector(css + " #Face_yesc");
    c.addEventListener("click", Face_yesc, false);
}
//取消按钮
var cancle = function() {
    selector.find('#Face_noc').click(function() {
        selector.find('#maxwindow').remove();
    });
}

//保存表情
var saveFaces = function() {
    var facesTmp = "";
    for (var i = 0; i < faces.length; i++) {
        faces[i].faceSrc = uniQueue(faces[i].faceSrc);
        if (i != faces.length - 1)
            facesTmp = facesTmp + JSON.stringify(faces[i]) + splitor;
        else
            facesTmp += JSON.stringify(faces[i]);
    }
    GM_setValue('FACES', facesTmp);
    tbodyHtml = fetchTbodyHtml();
}

//数组去重复

    function uniQueue(array) {
        var arr = [];
        var m;
        while (array.length > 0) {
            m = array[0];
            arr.push(m);
            array = $.grep(array, function(n, i) {
                return n == m;
            }, true);
        }
        return arr;
    }

    //表情标签页滚动
var nextTab = function() {
    if ((-TabWidthOffset) < tabWidthCount * tabWidth)
        selector.find('.s_tab_content').attr('style', 'margin-left:' + (TabWidthOffset -= tabWidth) + 'px;');
}
var prevtTab = function() {
    if (-TabWidthOffset > 0)
        selector.find('.s_tab_content').attr('style', 'margin-left:' + (TabWidthOffset += tabWidth) + 'px;');
}

///////////////////////////////////////////
////////自定义表情组位置/////////////////////
////////////////////////////////////////////
//表情组右移动
var tab_MoveRight = function(index) {
    var cindex = selector.find('.selected').parent().attr('id').replace("smilyTab", "");
    cindex = parseInt(cindex);
    //console.log(0);
    if ($(css + ' #smilyTab' + cindex).next().length != 0 && cindex > 0) {
        var t = $(css + ' #smilyTab' + cindex).next();
        if (t && t.attr('id')) {
            var anotherIndex = t.attr('id').replace("smilyTab", "");
            var temp = faces[cindex];
            faces[cindex] = faces[anotherIndex];
            faces[anotherIndex] = temp;
            $(css + ' #smilyTab' + cindex).insertAfter(t);
            if (tabNum != 0)
                GM_setValue('tabNum', anotherIndex);
            $(css + ' #smilyTab' + cindex).attr('id', t.attr('id'));
            t.attr('id', 'smilyTab' + (cindex));
            tabOnClick(cindex);
            tabOnClick(anotherIndex);
            saveFaces();
        } else {
            faces[cindex].position = parseInt(t.attr('data-index')) + 0.1;
            $(css + ' #smilyTab' + cindex).insertAfter(t);
            saveFaces();
        }
    }
}
//表情组左移
var tab_MoveLeft = function() {
    var cindex = selector.find('.selected').parent().attr('id').replace("smilyTab", "");
    cindex = parseInt(cindex);
    //console.log(1);
    if ($(css + ' #smilyTab' + cindex).prev().length != 0 && cindex > 0 && $(css + ' #smilyTab' + cindex).prev().attr('id') != "smilyTab0") {
        var t = $(css + ' #smilyTab' + cindex).prev();
        if (t && t.attr('id')) {
            var anotherIndex = t.attr('id').replace("smilyTab", "");
            var temp = faces[cindex];
            faces[cindex] = faces[anotherIndex];
            faces[anotherIndex] = temp;
            $(css + ' #smilyTab' + cindex).insertBefore(t);
            if (tabNum != 0)
                GM_setValue('tabNum', anotherIndex);
            $(css + ' #smilyTab' + cindex).attr('id', t.attr('id'));
            t.attr('id', 'smilyTab' + (cindex));
            tabOnClick(cindex);
            tabOnClick(anotherIndex);
            saveFaces();
        } else {
            faces[cindex].position = t.attr('data-index') == 0 ? 0 : (t.attr('data-index')) - 0.9;
            $(css + ' #smilyTab' + cindex).insertBefore(t);
            saveFaces();
        }
    }
}

var addBDESrc; //鼠标悬浮获得的图片链接
//修改分享按钮为加入表情到表情组
var addImgToCustomFace = function() {
    (function c() {
        var b = document.querySelector('.share.j_shareImg');
        if (b) {
            b.addEventListener('mouseover', function() {
                $('.share.j_shareImg').unbind('click'); //取消分享按钮默认的点击事件
                setShareDiv(); //重构分享框
                //addAddImgEvents();
            }, false);
        } else
            setTimeout(c, 20); //检查悬浮框是否弹出
    })();

    function setSrc(g) //悬浮在图片上时获取图片src
    {
        [].forEach.call(g, function(e) {
            e.addEventListener('mouseover', function() {
                var s = e.getAttribute('src');
                if (s.match(/http:\/\/imgsrc\.baidu\.com\/forum/)) {
                    s = s.replace(/http:\/\/imgsrc\.baidu\.com\/forum\/.*sign=.*\//mg, ''); //获得点击后的原图
                    addBDESrc = 'http://imgsrc.baidu.com/forum/pic/item/' + s;
                } else
                    addBDESrc = s;
                //console.log(addBDESrc);
            }, false);
        });
    }
    setTimeout(function() //setTimeout兼容贴吧大图还原脚本用，因为那边重构了每个图片
    {
        var a = document.querySelectorAll('cc .BDE_Image'); //普通图片
        var b = document.querySelectorAll('.j_user_sign'); //签名图
        setSrc(a);
        setSrc(b);
    }, 500);
}
var setShareDiv = function() {
    (function c() {
        if (document.querySelector('.bdimgshare-p-icon.bdshare-i-mshare')) {
            var content = "";
            for (var i = 1; i < faces.length; i++)
                content = content + '<a class="bdimgshare-p-icon bdshare-i-mshare ccccc" onclick="return false;" href="#" data-btype="' + i + '">' + faces[i].tabName + '</a>';
            var html = '<h6>添加到</h6>' + '<div class="bdimgshare-layer-list">' + content + '</div>';
            $('.bdimgshare-layer-pnl').html(html);
            //添加事件
            var b = document.querySelectorAll('.ccccc');
            [].forEach.call(b, function(e) {
                var cindex = e.getAttribute('data-btype'); //表情组下标
                e.addEventListener('click', function() //点击表情组后隐藏弹框
                {
                    $('.bdimgshare-layer-pnl').parent().parent().hide();
                    if (addBDESrc && faces[cindex].faceSrc.indexOf(addBDESrc) == -1) //判断是否已有相同图片
                    {
                        faces[cindex].faceSrc.unshift(addBDESrc);
                        saveFaces();
                    }
                }, false)
            });
        } else
            setTimeout(c, 50);
    })();

}

//弹出添加表情框
var showAddFaceDiv = function() {
    if (!document.querySelector('#addFaceDiv')) {

        var cdiv = '<div id="addFaceDiv">';
        for (var i = 1; i < faces.length; i++) {
            cdiv = cdiv + '<a class="addface" onclick="return false;" href="#" data-btype="' + i + '">' + faces[i].tabName + '</a>';
        }
        cdiv += '<br><br><img width="80px" height="80px" src="' + addBDESrc + '">';
        cdiv += '</div>';

        $('body').append(cdiv);
        var ev = document.querySelectorAll('.addface');
        [].forEach.call(ev, function(e) {
            var cindex = e.getAttribute('data-btype'); //表情组下标
            e.addEventListener('click', function() //点击表情组后隐藏弹框
            {
                $('#addFaceDiv').remove();
                if (addBDESrc && faces[cindex].faceSrc.indexOf(addBDESrc) == -1) //判断是否已有相同图片
                {
                    faces[cindex].faceSrc.unshift(addBDESrc);
                    saveFaces();
                }
            }, false)
        });
        GM_addStyle('\
			#addFaceDiv\
			{\
				z-index:99999999;\
				position:fixed;\
				top:10%;\
				border:solid #DFDFDF 5px;\
				line-height:50px;\
				width:700px;\
				height:300px;\
				background:#F9EED0;\
				padding:5px;\
				text-align:center;\
			}\
			.addface\
			{\
				font-size:20px;\
				margin-right:10px;\
			}');
    } else {
        $('#addFaceDiv').remove();
        showAddFaceDiv();
    }
}

//ctrl+鼠标左键弹出showAddFaceDiv
setTimeout(function() {
    var imgs = document.querySelectorAll('img');
    [].forEach.call(imgs, function(dd) {
        dd.onclick = function(e) {
            //e.preventDefault();
            if (e.altKey) {
                var s = dd.getAttribute('src');
                if (s.match(/http:\/\/imgsrc\.baidu\.com\/forum/)) {
                    e.preventDefault();
                    s = s.replace(/http:\/\/imgsrc\.baidu\.com\/forum\/.*sign=.*\//mg, ''); //获得点击后的原图
                    addBDESrc = 'http://imgsrc.baidu.com/forum/pic/item/' + s;
                } else
                    addBDESrc = s;
                showAddFaceDiv();
            }
        }
    });
}, 100);
//点击增加表情框外删除div
document.onclick = function(e) {
    var e = window.event ? window.event : e,
        target = e.srcElement || e.target;
    while (target.nodeName.toLowerCase() != "html") {
        if (target.id == "addFaceDiv" || target.tagName == 'IMG') {
            break;
        }
        target = target.parentNode;
    }
    if (target.nodeName.toLowerCase() == "html")
        $('#addFaceDiv').remove();
}

//去除表情组中重复表情
GM_registerMenuCommand("tiebaCustomFace--去除表情组中重复表情", function() {

});

//prev、next表情滚动条点击事件
var tabScroll = function() {}

//样式
var imgCss = 'IMG.faceImg\
{\
height:101% !important;\
padding:0px 2px 0px 2px !important;\
position:relative;\
bottom:-2px  !important;\
}';
GM_addStyle(imgCss);

var aditmenu = '#aditFaceMenu,#addFaceMenu,#deleteFaceMenu,#tab_MoveLeft,#tab_MoveRight,#getProfile,#loadProfile,#showFace\
{\
	width:50px !important;\
	height:20px!important;\
	position:absolute !important;\
	left:-48px !important;\
	bottom:10px !important;\
	font-size:20px;\
	color:#99C871;\
	border-radius:5px 0px 0px 5px;\
	background:#FAFAFA;\
	cursor:pointer;\
}\
#getProfile\
{\
	bottom:30px !important;\
}\
#loadProfile\
{\
	bottom:50px !important;\
}\
#aditFaceMenu\
{\
	bottom:70px !important;\
}\
#deleteFaceMenu\
{\
	bottom:90px !important;\
}\
#tab_MoveLeft\
{\
	bottom:110px !important;\
}\
#tab_MoveRight\
{\
	bottom:130px !important;\
}\
#showFace\
{\
	bottom:170px !important;\
}\
#settingmenu\
{\
	position:fixed !important;\
	bottom:280px !important;\
}\
.s_tab_btnbg{\
padding:0px 1px !important;\
}\
.faceImg\
{\
	height: auto !important;\
}\
IMG.faceImg:hover\
{\
	cursor:pointer !important;\
}\
.customSmily\
{\
}\
';
GM_addStyle(aditmenu);

//添加删除编辑框样式
var ccss = '\
	#Face_float\
	{\
		margin:auto;\
		width:801px;\
		height:360px;\
		background:#F9EED0;\
		border:solid #DFDFDF 10px;\
	}\
	#Face_floatedit\
	{\
		margin:auto;\
		border:none !important;\
		overflow:auto; \
  		width: 800px;\
  		resize: none;\
  		height: 360px;\
  		font-size:15px;\
  		color:black;\
 	}\
	#maxwindow\
	{\
		text-align:center;\
  		position: fixed;\
  		bottom: 0%;\
  		left: 0%;\
  		width: 100%;\
  		height: 100%;\
  		z-index: 65535 !important;\
  		background:white !important;\
  		opacity:.9;\
 	}\
 	.search_main_fixed\
 	{\
 		z-index:1 !important;\
 	}\
	#config\
	{\
		margin:auto;\
		height:50px;\
		display:block;\
		cursor:pointer;\
	}\
	#config span\
	{\
		position:relative;\
		top:20px;\
		margin-right:10px;\
		font-size:30px;\
		border:1px solid grey;\
		width:50px;\
		height:50px;\
	}\
	#tabSetting span\
	{\
		font-size:20px;\
		border:0px solid grey;\
		width:50px;\
		height:50px;\
		margin-right:15px;\
	}\
	#tabSetting input\
	{\
		color:green;\
	}';

//黑名单样式
var blistcss = '\
	#blist\
	{\
		position:fixed;\
		left:0px;\
		top:0px;\
		width:100%;\
		height:100%;\
		background:none;\
		z-index:55555;\
		text-align:center;\
	}\
	#blistdiv\
	{\
		margin: auto;\
		border:solid #DFDFDF 5px;\
		line-height:50px;\
		width:600px;\
		height:300px;\
		background:#F9EED0;\
		padding:5px;\
		text-align:center;\
	}\
	.blistElement\
	{\
		padding:0px 0px 4px 10px;\
		cursor:pointer;\
		width:50px;\
		height:20px;\
		font-size:20px;\
	}\
	.blisthide\
	{\
		color:#CEDECA;\
	}\
	#blistConfig\
	{\
		background:#CFDCC9;\
		padding:0px;\
		cursor:pointer;\
		border:white solid 2px;\
		width:50px;\
		height:20px;\
		font-size:20px;\
	}\
	';

//小脸数据导入支持（页面右下角）

function xiaolianLoad() {
    var xiaolian = function() {
        var a = prompt('输入小脸数据');
        if (a) {
            a = eval(a);
            for (var i = 0; i < a.length; i++)
                faces.push(new Face(a[i]['name'], a[i]['collection'], 8));
            saveFaces();
        }

    }
    $('#tab_forumname').after('<span id="xiaolian" width="40" height="40" style="position:fixed;right:0px;bottom:0px;cursor:pointer;">小脸导入</span>');
    var x = document.querySelector('#xiaolian');
    x.addEventListener('click', xiaolian, false);
}


//开始监听

//LZL表情按钮监听
var css;
//发帖框表情监听

function normal_Listener() {
    var a = document.querySelector('.edui-btn.edui-btn-emotion');
    if (a) {
        function m() {
            css = '.edui-container';
            if (document.querySelector('.edui-container li.s_tab_btn[data-index="1"]') && (!document.querySelector('.edui-container #smilyTab0'))) {
                $('.edui-container li.s_tab_btn[data-index="1"]').click();
                selector = $(css).find('.edui-dropdown-menu');
                addFaces();
                //a.removeEventListener("click",m,false);
            } else {
                setTimeout(m, 20);
            }
        }
        a.addEventListener("click", m, false);
    } else
        setTimeout(normal_Listener, 100);
}
//重写LZL表情监听，使用jquery似乎会因为GM API不允许unsafewindow导致setvalue和getvalue失效
var LZL_Listener = function(s) {
    var lzlAll = document.querySelectorAll(s);
    [].forEach.call(lzlAll, function(e) {
        function c1() {
            var c = document.querySelector('.insertsmiley_holder');
            if (c) {
                c.addEventListener('click', function() {
                    css = '.insertsmiley_holder';
                    (function c2() {
                        if (document.querySelector('.insertsmiley_holder .s_layer_table') && (!document.querySelector('.insertsmiley_holder #smilyTab0'))) {
                            selector = $(css).find('.layer_content');
                            addFaces();
                        } else
                            setTimeout(c2, 60);
                    })();
                });
            } else
                setTimeout(c1, 60);
        }
        e.addEventListener('click', c1, false);
    });
}

////开始监听
normal_Listener();
//LZL_Listener('DIV.j_lzl_r.p_reply');
//LZL_Listener('.j_lzl_p');
//LZL_Listener('.lzl_s_r');
addImgToCustomFace();
//xiaolianLoad();		//小脸导入函数，需要的自己取消注释，改完后刷新在页面右下角
