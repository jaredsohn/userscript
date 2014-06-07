// ==UserScript==
// @name          SIKEP Essentials
// @version       1.14
// @description   SIKEP modification
// @author        Agus Sudarmanto
// @orig_author   Agus Sudarmanto
// @include       http*://202.182.166.73/*
// @include       http*://sikep.mahkamahagung.go.id/*
// @include       http*://*.sikep.mahkamahagung.go.id/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require       http://plugins.jquery.com/files/jquery.cookie.js.txt
// ==/UserScript==

/* @require       http://localhost/libs/js/jquery/js/jquery-1.3.2.min.js*/
$(document).ready(function() {

  jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
  };

	$("#content").prepend("<input type='button' id='btnGet' value='GET DATA << '>");
	$("#content").prepend("<input type='button' id='btnMoncrot' value='MONCROT RONALD ABUY >> '>");
	$("#content").prepend("<input type='button' id='btnCopy' value='BAGI KUE << '> &nbsp;");
	$("#content").prepend(
    '<h2>Powered by. SIKEP ESSENTIAL ver 0.3</h2><table>'+
    '<tr valign="top">'+
      '<td>'+
        '<table>'+
          '<tr><td>TGl.KGB</td><td>: <input type="text" id="_tgl_kgb" value=""></td></tr>'+
          '<tr><td>GAJI</td><td>: <input type="text" id="_NewSalary" value=""></td></tr>'+
          '<tr><td>TMT</td><td>: <input type="text" id="_tgl_tmt" value=""></td></tr>'+
          '<tr><td>NO BKN</td><td>: <input type="text" id="_BaknNo" value=""></td></tr>'+
          '<tr><td>TGL BKN</td><td>: <input type="text" id="_tgl_bakn" value=""></td></tr>'+
        '</table>'+
      '</td>'+
      '<td>'+
        '<table>'+
          '<tr><td>TGL AKTUAL</td><td>: <input type="text" id="_tgl_actualdate" value=""></td></tr>'+
          '<tr><td>TGL BERAKHIR</td><td>: <input type="text" id="_tgl_enddate" value=""></td></tr>'+
          '<tr><td>PENANDATANGAN SK</td><td>: <input type="text" id="_SkPejabat" value=""></td></tr>'+
          '<tr><td>NO SK</td><td>: <input type="text" id="_SkNo" value=""></td></tr>'+
          '<tr><td>TGL SK</td><td>: <input type="text" id="_tgl_SK" value=""></td></tr>'+
        '</table>'+
      '</td>'+
      '<td>'+
        '<table>'+
          '<tr><td>MASA KERJA THN</td><td>: <input type="text" id="_txtMasaKerjaThn" value="" size=2 maxlength=2></td></tr>'+
          '<tr><td>MASA KERJA BLN</td><td>: <input type="text" id="_txtMasaKerjaBln" value="" size=2 maxlength=2></td></tr>'+
          '<tr><td>JABATAN</td><td>: <input type="text" id="_txtPositionName" value=""> <input type="text" id="_txtPositionId" value="" size=4 maxlength=20></td></tr>'+
          '<tr><td>SATUAN KERJA</td><td>: <input type="text" id="_txtWorklocationName" value=""> <input type="text" id="_txtWorklocationId" value="" size=4 maxlength=20></td></tr>'+
          '<tr><td>GOL</td><td>: <select style="width: 300px;" name="_grade"><option value=""> [ Pilih salah satu ] </option><option value="1">I/a [ JURU MUDA ]</option><option value="2">I/b [ JURU MUDA TINGKAT I ]</option><option value="3">I/c [ JURU ]</option><option value="4">I/d [ JURU TINGKAT I ]</option><option value="5">II/a [ PENGATUR MUDA ]</option><option value="6">II/b [ PENGATUR MUDA TINGKAT I ]</option><option value="7">II/c [ PENGATUR ]</option><option value="8">II/d [ PENGATUR TINGKAT I ]</option><option value="9">III/a [ PENATA MUDA ]</option><option value="10">III/b [ PENATA MUDA TINGKAT I ]</option><option value="11">III/c [ PENATA ]</option><option value="12">III/d [ PENATA TINGKAT I ]</option><option value="13">IV/a [ PEMBINA ]</option><option value="14">IV/b [ PEMBINA TINGKAT I ]</option><option value="15">IV/c [ PEMBINA UTAMA MUDA ]</option><option value="16">IV/d [ PEMBINA UTAMA MADYA ]</option><option value="17">IV/e [ PEMBINA UTAMA ]</option><option value="41">MAYJEN TNI (Purn) [ MAYJEN TNI ]</option><option value="42">IV/G [ JENDRAL / LAKSAMANA / MARSEKAL ]</option><option value="43">BRIGJEN TNI [ BRIGJEN TNI (Purn) ]</option><option value="44">Letkol Chk [ Letkol Chk ]</option><option value="45">Letkol Sus [ Letkol Sus ]</option><option value="46">Mayor Chk (K) [ Mayor Chk (K) ]</option><option value="47">Mayor Chk [ Mayor Chk ]</option><option value="48">Mayor Sus [ Mayor Sus ]</option></select></td></tr>'+
        '</table>'+
      '</td>'+
    '</tr>'+
    '</table>'
    );
  
  $("#btnGet").click(function(){
    /* get specific values */
    $("#_txtPositionName").val($("[name=txtPositionName]").val());
    $("#_txtPositionId").val($("[name=txtPositionId]").val());
    $("#_txtWorklocationName").val($("[name=txtWorklocationName]").val());
    $("#_txtWorklocationId").val($("[name=txtWorklocationId]").val());
    $.cookie("txtPositionName",$("#_txtPositionName").val(),{expires: 7});
    $.cookie("txtPositionId",$("#_txtPositionId").val(),{expires: 7});
    $.cookie("txtWorklocationName",$("#_txtWorklocationName").val(),{expires: 7});
    $.cookie("txtWorklocationId",$("#_txtWorklocationId").val(),{expires: 7});
  });
  
  $("#btnCopy").click(function(){
    /* get cookie */
    $("#_tgl_kgb").val($.cookie("tgl_kgb"));
    $("#_NewSalary").val($.cookie("NewSalary"));
    $("#_tgl_tmt").val($.cookie("tgl_tmt"));
    $("#_BaknNo").val($.cookie("BaknNo"));
    $("#_tgl_bakn").val($.cookie("tgl_bakn"));
    $("#_SkNo").val($.cookie("SkNo"));
    $("#_tgl_SK").val($.cookie("tgl_SK"));
    $("#_SkPejabat").val($.cookie("SkPejabat"));
    $("#_txtMasaKerjaThn").val("");
    $("#_tgl_actualdate").val($.cookie("tgl_actualdate"));
    $("#_tgl_enddate").val($.cookie("tgl_enddate"));
    $("#_txtMasaKerjaThn").val($.cookie("txtMasaKerjaThn"));
    $("#_txtMasaKerjaBln").val($.cookie("txtMasaKerjaThn"));
    $("#_txtPositionName").val($.cookie("txtPositionName"));
    $("#_txtPositionId").val($.cookie("txtPositionId"));
    $("#_txtWorklocationName").val($.cookie("txtWorklocationName"));
    $("#_txtWorklocationId").val($.cookie("txtWorklocationId"));
  });
  
  
  
  $("#btnMoncrot").click(function(){
    $("[name=careerTransitionType]").val("8,Kenaikan Regular,Kenaikan Reguler");
    $("[name=checks]").attr('checked','true');
    if ($('[name="is_active"]').length > 0){$('[name="is_active"]')[0].checked = true;}
    /*
    txtPositionName
    txtPositionId
    txtWorklocationName
    txtWorklocationId
    */
    img_ok = '<img src="http://plugins.jquery.com/misc/watchdog-ok.png"> ';
    
    /* set input */
    $("[name=tgl_kgb]").css("background-color","yellow").val($("#_tgl_kgb").val()).before(img_ok);
    $("[name=tgl_kgb]").css("background-color","yellow").val($("#_tgl_kgb").val()).before(img_ok);
    $("[name=NewSalary]").css("background-color","yellow").val($("#_NewSalary").val()).before(img_ok);
    $("[name=txtSalary]").css("background-color","yellow").val($("#_NewSalary").val()).before(img_ok);
    $("[name=tgl_tmt]").css("background-color","yellow").val($("#_tgl_tmt").val()).before(img_ok);
    $("[name=BaknNo]").css("background-color","yellow").val($("#_BaknNo").val()).before(img_ok);
    $("[name=tgl_bakn]").css("background-color","yellow").val($("#_tgl_bakn").val()).before(img_ok);
    $("[name=SkNo]").css("background-color","yellow").val($("#_SkNo").val()).before(img_ok);
    $("[name=tgl_SK]").css("background-color","yellow").val($("#_tgl_SK").val()).before(img_ok);
    $("[name=SkPejabat]").css("background-color","yellow").val($("#_SkPejabat").val()).before(img_ok);
    $("[name=tgl_actualdate]").css("background-color","yellow").val($("#_tgl_actualdate").val()).before(img_ok);
    $("[name=tgl_enddate]").css("background-color","yellow").val($("#_tgl_enddate").val()).before(img_ok);
    $("[name=txtMasaKerjaThn]").css("background-color","yellow").val($("#_txtMasaKerjaThn").val()).before(img_ok);
    $("[name=txtMasaKerjaBln]").css("background-color","yellow").val($("#_txtMasaKerjaBln").val()).before(img_ok);
    $("[name=txtPositionName]").css("background-color","yellow").val($("#_txtPositionName").val()).before(img_ok);
    $("[name=txtPositionId]").css("background-color","yellow").val($("#_txtPositionId").val()).before(img_ok);
    $("[name=txtWorklocationName]").css("background-color","yellow").val($("#_txtWorklocationName").val()).before(img_ok);
    $("[name=txtWorklocationId]").css("background-color","yellow").val($("#_txtWorklocationId").val()).before(img_ok);
    
    /* set cookie */
    $.cookie("tgl_kgb",$("#_tgl_kgb").val(),{expires: 7});
    $.cookie("NewSalary",$("#_NewSalary").val(),{expires: 7});
    $.cookie("tgl_tmt",$("#_tgl_tmt").val(),{expires: 7});
    $.cookie("BaknNo",$("#_BaknNo").val(),{expires: 7});
    $.cookie("tgl_bakn",$("#_tgl_bakn").val(),{expires: 7});
    $.cookie("SkNo",$("#_SkNo").val(),{expires: 7});
    $.cookie("tgl_SK",$("#_tgl_SK").val(),{expires: 7});
    $.cookie("SkPejabat",$("#_SkPejabat").val(),{expires: 7});
    $.cookie("tgl_actualdate",$("#_tgl_actualdate").val(),{expires: 7});
    $.cookie("tgl_enddate",$("#_tgl_enddate").val(),{expires: 7});
    $.cookie("txtMasaKerjaThn",$("#_txtMasaKerjaThn").val(),{expires: 7});
    $.cookie("txtMasaKerjaBln",$("#_txtMasaKerjaBln").val(),{expires: 7});
    $.cookie("txtPositionName",$("#_txtPositionName").val(),{expires: 7});
    $.cookie("txtPositionId",$("#_txtPositionId").val(),{expires: 7});
    $.cookie("txtWorklocationName",$("#_txtWorklocationName").val(),{expires: 7});
    $.cookie("txtWorklocationId",$("#_txtWorklocationId").val(),{expires: 7});
  });
});