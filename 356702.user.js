// ==UserScript==
// @name       Automatyczne skakanie stacją
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @version    0.92
// @include    *hegira.com.pl/*
// @copyright  2013-2014, Igorogi
// ==/UserScript==

function $skok($docx, $docy, $docz, $x, $y, $z, $that){
    $x.val($docx);
    $y.val($docy);
    $z.val($docz);
    $.ajax({
        type: 'POST',
        url: 'blanc2.php',
        data: $that.serialize(),
        async: false,
        headers: {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Cache-Control' : 'max-age=0',
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    });
}

var $formy = $("h3:contains('Przesuń stację na współrzędne:')").next();
$formy.before('<input type="text" value size="12"><input type="submit" value="RW" id="dzielnik" title="Rozdziel współrzędne." >');

$('input#dzielnik').click(function (){
    var $kordy = $(this).prev().val();
    $kordy = $kordy.replace(' ','w');
    $kordy = $kordy.replace(' ','w');
    $kordy = $kordy.replace(';','w');
    $kordy = $kordy.replace(';','w');
    $kordy = $kordy.replace(/.*[\[\(]/,'');
    $kordy = $kordy.replace(/.*w1=/,'');
    $kordy = $kordy.replace(/[\]\)].*/,'');
    $kordy = $kordy.replace(/&w2=/,'w');
    $kordy = $kordy.replace(/&w3=/,'w');
    $kordy = $kordy.replace(/.speed.*/,'');
    $kordy = $kordy.replace(/[(,)\t\,\ ]/,'w');
    $kordy = $kordy.replace(/[(,)\t\,\ ]/,'w');
    $kordy = $kordy.replace(',','w');
    $kordy = $kordy.replace(',','w');
    $kordy = $kordy.replace(/ww/,'w');
    $kordy = $kordy.replace(/ww/,'w');
    var $kord = $kordy.split(/w/);
    var $form = $(this).next();
    $form.find('input[name=x]').val($kord[0]);
    $form.find('input[name=y]').val($kord[1]);
    $form.find('input[name=z]').val($kord[2]);
});

$formy.submit(function (e) {
    e.preventDefault();
    $(this).find(':submit').attr('disabled','disabled');
    var $zasieg = 24000;// TUTAJ WPISZ SWÓJ ZASIĘG SKOKU
    var $pierwkord = $(this).parent().prev().prev().text().match(/[^[\]]+(?=])/g)[0].split(',');
    var $ox = parseInt($pierwkord[0]);
    var $oy = parseInt($pierwkord[1]);
    var $oz = parseInt($pierwkord[2]);
    var $x = $(this).find('input[name=x]');
    var $y = $(this).find('input[name=y]');
    var $z = $(this).find('input[name=z]');
    var $kx = $x.val();
    var $ky = $y.val();
    var $kz = $z.val();
    var $rx = $kx - $ox;
    var $ry = $ky - $oy;
    var $rz = $kz - $oz;
    var $odl = Math.sqrt(Math.pow($rx,2) + Math.pow($ry,2) + Math.pow($rz,2));
    var $skokx = Math.round(($rx / $odl) * ($zasieg-100));
    var $skoky = Math.round(($ry / $odl) * ($zasieg-100));
    var $skokz = Math.round(($rz / $odl) * ($zasieg-100));
    if($rx!=0){
        var $iloscskokow = Math.ceil($rx / $skokx);
    }else{
        if($ry!=0){
            var $iloscskokow = Math.ceil($ry / $skoky);
        }else{
            if($rz!=0){
                var $iloscskokow = Math.ceil($rz / $skokz);
            }else{
                return false;
            }
        }
    }
    if($iloscskokow>70) return false;
    if (!confirm('Potwierdzasz wykowanie skoków, które zużyją ' + $iloscskokow + '% energii reaktora?')){
        $(this).find(':submit').prop("disabled", false);
        return false;
    }
    $(this).hide();
    $(this).after('<br>Proszę czekać, skrypt jest wykonywany.');
    var $that=$(this);
    var $docx;
    var $docy;
    var $docz;
    for(var x = 1; x<$iloscskokow; x++){
        $docx = $ox+(x*$skokx);
        $docy = $oy+(x*$skoky);
        $docz = $oz+(x*$skokz);
        setTimeout($skok($docx, $docy, $docz, $x, $y, $z, $that), x*2000);
    }
    $docx = $kx;
    $docy = $ky;
    $docz = $kz;
    setTimeout($skok($docx, $docy, $docz, $x, $y, $z, $that), (x+1)*2000);
    setTimeout(function(){location.reload()}, (x+2)*2000);
});