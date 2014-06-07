// ==UserScript==
// @id             ZACFiller@leungwensen
// @name           ZAC filler
// @version        0
// @namespace      https://github.com/leungwensen
// @author         leungwensen@gmail.com
// @description    简化 ZAC 填写
// @include        https://asp19.jp.oro.com/kayac/Shinsei/Nippou.asp*
// @run-at         document-end
// ==/UserScript==


(function(){
    var $form = document.getElementsByName('frmNippou');
    $form.time_in_hour          = '9';
    $form.time_in_minute        = '30';
    $form.time_out_hour         = '19';
    $form.time_out_minute       = '45';
    $form.time_break_input_hour = '1';
    $form.time_required_hour1   = '9';
    $form.time_required_minute1 = '15';
    $form.memo1 = "\
        開発：\
        管理画面周りのマージ作業\
        コードレビュー\
        新バージョンのリリース準備\
        運営：\
        データー反映\
        テストサーポー\
    ";
}());

