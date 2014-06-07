// ==UserScript==
// @name           skrip2
// @namespace      prihandini
// @description    checkbox
// ==/UserScript==
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Form Check Box</title>
</head>
<body>
<form id="form" name="form" method="post" action="">
  <table width="100%" cellspacing="3" cellpadding="3">
    <tr>
      <td width="8%" align="left" valign="top"><strong>Pilihan : </strong></td>
      <td width="92%"><input name="kepada[]" type="checkbox" id="kepada[]" value="prihandini" /> 
        Prihandini 
          
          <br />
          <input name="kepada[]" type="checkbox" id="kepada[]" value="prihandini.astuti" />
        Prihandini Astuti <br />
        <input name="kepada[]" type="checkbox" id="kepada[]" value="eselon1" /> 
        Eselon 1
        
        <br />
        <input name="kepada[]" type="checkbox" id="kepada[]" value="eselon2" />
Eselon 2

        <br />
<input name="kepada[]" type="checkbox" id="kepada[]" value="jabatan1" /> 
Jabatan 1<br />
<input name="kepada[]" type="checkbox" id="kepada[]" value="jabatan1" /> 
Jabatan 2<br />
<input name="kepada[]" type="checkbox" id="kepada[]" value="khusus1" /> 
Khusus 1<br />
<input name="kepada[]" type="checkbox" id="kepada[]" value="khusus2" /> 
Khusus 2 </td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="Submit" value="Submit" /></td>
    </tr>
  </table>
</form>
<?php
	if(isset($_POST['Submit']))
	{
		$kepada = $_POST['kepada'];
		$jml_kepada = count($kepada);
		
		for($i=0;$i<=$jml_kepada;$i++)
		{
			if(!empty($kepada[$i]))
			{
				$cekeselon = strpos($kepada[$i], "eselon");
				$cekjabatan = strpos($kepada[$i], "jabatan");
				$cekkhusus = strpos($kepada[$i], "khusus");
				
				if ($cekeselon == TRUE) {
					$tipekepada[$i] = "eselon";
				} else {
					$tipekepada[$i] = "lain";
				}
				
				echo $kepada[$i]." - ".$tipekepada[$i]."<br/>";
			}
		}
	}
?>
</body>
</html>