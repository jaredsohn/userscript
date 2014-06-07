// ==UserScript==
// @name Jiaxiao Shortcut
// @author Glyme
// @description  为驾校理论考试练习(http://wz.jxedt.com/test)加上快捷键功能。1->A/Yes，2->B/No，3->C，4->D，5->打开右侧图片/关闭右侧图片，6->显示/关闭解释，7->下一题。
// @create 2013/7/18
// @lastmodified 2014/3/26
// @version 1.0.5
// @include http://wz.jxedt.com/test/*

// ==/UserScript==
(function(){
    function hideshowlogindiv(id) {
        var obj1 = document.getElementById(id);
        if (obj1) obj1.parentNode.removeChild(obj1);
        var obj = document.getElementById("fathershowlogindiv");
        if (obj) obj.parentNode.removeChild(obj);
    }
    function onkeypressed(e)
    {
        switch(String.fromCharCode(e.keyCode))
        {
            case '1':
                var ele = document.getElementById('answer1');
                ele.click();
                break;
            case '2':
                var ele = document.getElementById('answer2');
                ele.click();
                break;
            case '3':
                var ele = document.getElementById('answer3');
                ele.click();
                break;
            case '4':
                var ele = document.getElementById('answer4');
                ele.click();
                break;
            case '5':
                var ele_pic = document.getElementById('qustionpic').firstChild;
                var ele_window = document.getElementById('append_parent');
                // close window if window exists
                if(ele_window)
                {
                    hideshowlogindiv('append_parent');
                }
                // open window if window not exists
                else
                {
                    ele_pic.click();
                }
                break;
            case '6':
                if(document.getElementById('append_parent'))
                {
                    hideshowlogindiv('append_parent');
                }
                else
                {
	                var ele = document.getElementById('btn_jieshi');
                	ele.click();
                }
              	break;
            case '7':
                unsafeWindow.go(0);
                break;
        }
    }
    document.addEventListener('keypress',onkeypressed,false);
})();