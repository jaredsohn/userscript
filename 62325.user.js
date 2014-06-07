// ==UserScript==
// @name           Prihandini astuti
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
          <input name="tipekepada[]" type="hidden" id="tipekepada[]" value="user" />
        <br />
        <input name="kepada[]" type="checkbox" id="kepada[]" value="eselon1" /> 
        Eselon 1
        <input name="tipekepada[]" type="hidden" id="tipekepada[]" value="eselon" />
        <br />
        <input name="kepada[]" type="checkbox" id="kepada[]" value="eselon2" />
Eselon 2
<input name="tipekepada[]" type="hidden" id="tipekepada[]" value="eselon" />
        <br />
<input name="kepada[]" type="checkbox" id="kepada[]" value="pejabat" /> 
Pejabat
<input name="tipekepada[]" type="hidden" id="tipekepada[]" value="jabatan" /></td>
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
		$tipekepada = $_POST['tipekepada'];
		
		for($i=0;$i<=count($kepada);$i++)
		{
			echo "no. ".$i." ".$kepada[$i]." - ";
			if(!empty($kepada[$i]))
			{
				for($j=0;$j<=count($tipekepada);$j++)
				{
					echo $tipekepada[$j]."<br/>";
				}
			}
		}				
	}
?>
</body>
</html>