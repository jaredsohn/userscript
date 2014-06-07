// ==UserScript==
// @name        gwArmedUserInfo
// @namespace   gw
// @include     http://www.ganjawars.ru/warlist.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.js
// @version     1
// ==/UserScript==
//alert($('table:gt(1)').find('table').html());
//$('body').text('dsada');
(function () {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.setAttribute("type", 'text/css');
    style.innerHTML = ".tblr td {padding:10px; font:.75em Tahoma !important}"
        + ".tblr a {text-decoration:none; border-bottom:1px dashed}"
        + ".tblr td:nth-child(1) img {position:absolute; margin-left:-42px;opacity:.5}"
        + ".tblr td:nth-child(2) img {width:20px;height:20px;opacity:.5}"
        + ".aaa {border:0;font:.75em Tahoma !important;text-transform:uppercase; background:#D0F5D0; color:#000; padding:2px 15px; text-shadow:0 0 1px rgba(0,0,0,.4); border:1px solid #B2F5D0 !important;opacity:.75}"
        + ".aaa:hover {opacity:1}"
        + ".aaa:active {top:1px;left:1px;position:relative}"
        + ".activeUser td {background:#000 url(//images.ganjawars.ru/img/index-images-2.0/main_bg.jpg);vertical-align: text-top}"
//        + "#popupWindow {position:fixed;top:0; left:0;right:0;bottom:0; background:rgba(0,0,0,.3); z-index:10}"
//        + "#popupWindow div {background:#fff;margin:0; border:5px solid #97AD97; float:left;position:absolute;}"
        + ".popupWindow ul {display:table;list-style:none;padding:0;margin:0}"
//        + "#popupWindow ul, #popupWindow li {margin:0;}"
        + ".popupWindow li {padding:5px;font:.95em arial;display: table-row;background:#efefef}"
        + ".popupWindow li span {padding:5px;font:.95em arial;display: table-cell;border:1px solid #fff}"
        + ".popupWindow li.sep span { background:#C5DDBB url(//images.ganjawars.ru/img/index-images-2.0/main_bg.jpg)} "
        + ".popupWindow li:nth-child(odd) {background:#ebebeb} "
        + ".settings input {width:3em;}";
    head.appendChild(style);
    function _x(STR_XPATH) {
        var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
        var xnodes = [];
        var xres;
        while (xres = xresult.iterateNext()) {
            xnodes.push(xres);
        }

        return xnodes;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    var ntpName = 'gwaui' + getCookie('au');

    var inputSettingHp = $('<input/>',{
        type : 'text',
        id   : 'inputSettingHp',
        title : 'Минимум HP',
        value : localStorage.getItem(ntpName+'inputSettingHp')
    })

    var inputSettingV = $('<input/>',{
        type : 'text',
        id   : 'inputSettingV',
        title : 'Минимум Выносливости',
        value : window.localStorage.getItem(ntpName+'inputSettingV')
    })

    var inputSettingB = $('<button/>',{
        type : 'button',
        id   : 'inputSettingB',
        text : 'Save'
    })

    inputSettingB.on('click',function(){
        if(typeof(window.localStorage) == 'undefined' ) {
            alert('Ваш браузер не поддерживает localStorage()');
            return false;
        }
        try {
            localStorage.setItem(ntpName+'inputSettingHp', new Number($(inputSettingHp).val()));
            localStorage.setItem(ntpName+'inputSettingV', new Number($(inputSettingV).val()));
        }
        catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Кончилось место'); //данные не сохранены, так как кончилось доступное место
            }
        }
    })

    $(_x('/html/body/div/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table')).find('>tbody >tr:eq(0)>td:eq(1)').addClass('settings').append(inputSettingHp).append(inputSettingV).append(inputSettingB);

//    window.setTimeout   = function(){};

    $(_x('/html/body/div/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table')).find('>tbody >tr').each(function (e) {

        var uuu = $(this).find('td:eq(0)');
        var weaponTd = $(this).find('td:eq(1)');
        ooo = $(this).find('td:eq(3)');
        if (ooo.length && e > 1) {
            $(this).addClass('tblr');
            ooo.find('a').addClass('aaa').text('К БОЮ')
//                .on('dblclick',function () {
////                alert($(this).attr('href'));
//                location.href = $(this).attr('href')})
                .on('click', function () {
                    $('.rmvd').remove();
                    var btn = $(this);




                    $('.activeUser').removeClass('activeUser');
                    btn.parent().parent().addClass('activeUser')

                    if (uuu.find('a:eq(1)').length) {
                        ahref = uuu.find('a:eq(1)').attr('href');
                    } else {
                        ahref = uuu.find('a').attr('href');
                    }
                    $.get(ahref, function (data) {
                        $box    = $('<div/>');

                        var $bonus = '';
                        $params  = $($box).html(data).find('table:eq(7)').text().split('\n');
                        $hp     = $($box).find('table:eq(0)').text().trim().split('\n')[1].replace('[','').replace(']','').split('/')[0];
                        $($box).find('>table:eq(1) > tbody > tr:eq(12) > td:eq(1) tr').each(function(){
                            $bonus = $bonus + '<li><span>'+$(this).text().split(':')[0] + '</span><span>'+$(this).text().split(':')[1] + '</span></li>';
                        });


                        var sharpshooting = new Number($params[2].split(':')[1]);
                        var endurance     = new Number($params[4].split(':')[1]);
                        $text = '<div><ul>'
                                +'<li style="color: #900; font-weight: bold"><span>HP</span><span>'+$hp+'</span></li>'
                                +'<li style="color: #00f; font-weight: bold"><span>Выносливость</span> <span>'+endurance+'</span></li>'
                                +'<li><span>Меткость</span><span>'+sharpshooting+'</span></li>'
                                +'<li class="sep"><span></span><span></span></li>'
                                + $bonus
                                +'</ul></div>'
                        ;

                        $(btn).parent().append('<div class="popupWindow rmvd">'+$text+'</div>');
                        $(weaponTd).append('<div class="rmvd">'+$($box).find('>table:eq(1) > tbody > tr:eq(3) > td:eq(0) tr > td:eq(0)').html()+'</div>');

                        if(localStorage.getItem(ntpName+'inputSettingHp') <= new Number($hp) && localStorage.getItem(ntpName+'inputSettingV') <= new Number(endurance)){
                            btn.on('click', function(){
                                location.href = btn.attr('href');
                                return false;
                            })
                            btn.text('Вызвать');
                        } else {
                            btn.text('Не катит');
                        }


//                        $('body').on('click',function(e){
//                            if(e.target.className != 'popupWindow'){
//                                $('.rmvd').remove();
//                            }
//                        })


                    })
                    return false;
                });
        }
    });
})();