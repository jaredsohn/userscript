// ==UserScript==
// @name       GotoTop
// @namespace  http://weibo.com/qianlifeng2011
// @version    0.2
// @description  add gototop button at every site
// @match      http://*
// @match      https://*
// @author     scott
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

var isScrollingUp = false;

function ImportCss() {
    var jqueryScriptBlock = document.createElement('style');
    jqueryScriptBlock.type = 'text/css';
    jqueryScriptBlock.innerHTML = "#gototop{position: fixed;bottom: 20%;right: 1px;padding: 3px;width: 12px;font-size: 28px;cursor: pointer;border-radius: 3px;text-shadow: 1px 1px 6px #676767;}";
    document.getElementsByTagName('head')[0].appendChild(jqueryScriptBlock);
}

function UpdateIconState() {
    if ($(document).scrollTop() == 0) {
        $('#gototop').css("display", "none");  
    }
    else {
        $('#gototop').css("display", "block");
    }
}

function Gototop() {

    if ($(document).scrollTop() == 0) {
        return;
    }

    if (!isScrollingUp) {
        isScrollingUp = true;
        $('html,body').animate({ scrollTop: '0px' }, 350, function () {
            isScrollingUp = false;
            UpdateIconState();
        });
    } 
}

function AddGototopDOM() {
    $(document.body).append("<div id='gototop' title='hotkey:alt + wheel up'>↑</div>");
    $('#gototop').click(Gototop);
    UpdateIconState();
}

function BindHotKey() {
    window.addEventListener('mousewheel', function (event) {
        if (event.wheelDelta > 0 && event.altKey) {
            //prevent default action for scrolling up
            window.event.preventDefault();
            Gototop();
        }
        if (event.wheelDelta > 0 && isScrollingUp) {
            window.event.preventDefault();
        }

        UpdateIconState();

    }, false);
}


ImportCss();
AddGototopDOM();
BindHotKey();