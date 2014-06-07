// ==UserScript==
// @name rsb-userscript
// @description Выставляет логин и фокус в правильное поле для ИБ РСБ.
// @author Vladimir N. Indik
// @license GPLv3
// @version 1.0
// @icon https://online.rsb.ru//favicon.ico
// @include https://online.rsb.ru/hb/faces/system/login/rslogin.jsp*
// @include https://online.rsb.ru/hb/faces/rs/remittances/RSRemittance_internal.jspx
// @include https://online.rsb.ru/hb/faces/rs/remittances/RSRemittance_internal_confirm.jspx
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie) (см. habrahabr.ru/post/129343/)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    // [4] дополнительная проверка наряду с @include
    if (/https:\/\/online.rsb.ru\/hb\/faces\/system\/login\/rslogin.jsp/.test(w.location.href)) {
        var $ = w.jQuery;
        var $login = $('#user_login_internet'),
            $password = $('#user_password_internet');
        var $loginLabel = $login.parent().children('label'),
            $passwordLabel = $password.parent().children('label');
        var $user = ''; //Сюда вписываем свой логин

        //Скрываем заголовок "Логин"
        $loginLabel.hide();
        //Выставляем правильный логин
        $login.val($user);
        //Костылик для хрома
        if(!$('#popup_restore').is(':visible')) {
            //Скрываем заголовок "Пароль"
            $passwordLabel.hide();
            //Выставляем правильный фокус. Лёха, привет!
            $password.focus();
        }

        //Выставляем правильный фокус при закрытии окна о неверном пароле
        $('#close_popup_txt').click(function(){
            $passwordLabel.hide();
            $password.focus();
        });

        //Нажимаем кнопку "Войти" при нажатии Enter в поле ввода
        $('#smsinp').keypress(function(e) {
            //Прилетело нажатие Enter
            if (e.which == 13) {
                $('#L2').click();
            }
        });
    }

    //Подтверждение платежей, переводов и т.д.
    if (/https:\/\/online.rsb.ru\/hb\/faces\/rs\/remittances\/RSRemittance_internal/.test(w.location.href)) {
        //Аналогично сделать для https://online.rsb.ru/hb/faces/rs/payments/RSPaymentRequest.jspx (Форма и кнопка те же)
        //Нажимаем кнопку "Войти" при нажатии Enter в поле ввода
        unsafeWindow.$('[id="mainform:pincode1"]').live('keypress', function(e) {
            //Прилетело нажатие Enter
            if (e.which == 13) {
                unsafeWindow.$('[id="mainform:transfer"]').click();
            }
        });

        //Нажимаем кнопку "Перевести" при нажатии Enter в поле ввода
        unsafeWindow.$('[id="mainform:remittance_sum"]').live('keypress', function(e) {
            //Прилетело нажатие Enter
            if (arguments[0].which == 13) {
                unsafeWindow.$('[id="mainform:further"]').click();
            }
        });
    }

})(window);
