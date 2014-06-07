// ==UserScript==
// @name           Bungie Moderator Tools
// @author         PKF 647
// @description    Makes you feel like a moderator even though you are not!
// @Created        2008-11-20
// @namespace      http://www.bungie.net/Tools/
// @include        http://*.bungie.net/Tools/
// @include        http://*.bungie.net/Tools
// ==/UserScript==
/*
 * This script is a community open source project,
 * If you change or modify this script please site resources and previous scripters.
 * Not giving credit makes people mad, play nice.
*/
var newBody =
'<html>' +
'<head>' +
'<title>Bungie.net Games Page</title>' +
'</head>' +
'<body text="#FFFFFF" bgcolor="#000000">' +
'<body>' +
'<body background="http://admin.bungie.net/images/base_struct_images/themes/default/background2.jpg">' +
'<p>&nbsp;</p>' +
'<h3 align="center"><font color="#FFFFFF" face="Arial Black">' +
'<span style="font-weight: 400">Admin Tools</span></font></h3>' +
'<div align="center">' +
  '<center>' +
  '<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="600" height="500" bgcolor="#333333" bordercolorlight="#121212" bordercolordark="#666666">' +
    '<tr>' +
      '<td width="100%" height="361" valign="top"><b><font face="Arial"><br>' +
'&nbsp;</font></b><form method="POST" action="">' +
        '<!--webbot bot="SaveResults" U-File="fpweb:///_private/form_results.csv" S-Format="TEXT/CSV" S-Label-Fields="TRUE" --><fieldset style="padding: 2">' +
        '<legend><b><font face="Tahoma">Ban Tools</font> </b></legend>' +
        '<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="101%">' +
          '<tr>' +
            '<td width="46%"><font color="#FFFFFF" face="Tahoma">ENTER NAME OF ' +
            'USER TO BAN<b>:</b></font></td>' +
            '<td width="26%"><input type="text" name="T3" size="20"></td>' +
            '<td width="29%" align="center">' +
            '<input type="submit" value="Banhammer" name="B2"></td>' +
          '</tr>' +
          '<tr>' +
            '<td width="46%"><font color="#FFFFFF" face="Tahoma">ENTER NAME OF ' +
            'USER TO UN-BAN<b>:</b></font></td>' +
            '<td width="26%"><input type="text" name="T4" size="20"></td>' +
            '<td width="29%" align="center">' +
            '<input type="submit" value="[Disabled]" name="B1"></td>' +
          '</tr>' +
        '</table>' +
        '<p>&nbsp;</p>' +
        '</fieldset></form>' +
      '<form method="POST" action=" ">' +
        '<!--webbot bot="SaveResults" U-File="fpweb:///_private/form_results.csv" S-Format="TEXT/CSV" S-Label-Fields="TRUE" --><fieldset style="padding: 2">' +
        '<legend><font face="Tahoma"><b>Personal Moderating Forum Modes</b>' +
        '</font></legend>' +
        '<table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#111111" width="100%">' +
          '<tr>' +
            '<td width="50%"><font face="Tahoma" color="#FFFFFF">Righteous Mode' +
            '</font></td>' +
            '<td width="50%" align="center">' +
            '<input type="checkbox" name="C7" value="ON" checked></td>' +
          '</tr>' +
          '<tr>' +
            '<td width="50%"><font face="Tahoma" color="#FFFFFF">All Knowing Mode</font></td>' +
            '<td width="50%" align="center">' +
            '<input type="checkbox" name="C8" value="ON" checked></td>' +
          '</tr>' +
          '<tr>' +
            '<td width="50%"><font face="Tahoma" color="#FFFFFF">Power Hungry ' +
            'Mode</font></td>' +
            '<td width="50%" align="center">' +
            '<input type="checkbox" name="C6" value="ON" checked></td>' +
          '</tr>' +
          '<tr>' +
            '<td width="50%"><font face="Tahoma" color="#FFFFFF">Asshole&nbsp; ' +
            'Mode</font></td>' +
            '<td width="50%" align="center">' +
            '<input type="checkbox" name="C5" value="ON" checked></td>' +
          '</tr>' +
          '<tr>' +
            '<td width="50%"><font face="Tahoma" color="#FFFFFF">Kind &amp; Caring&nbsp; ' +
            'Mode</font></td>' +
            '<td width="50%">' +
            '<p align="center"><input type="checkbox" name="C9" value="ON"></td>' +
          '</tr>' +
        '</table>' +
        '</fieldset><input type="submit" value="Save" name="B1">&nbsp;' +
        '<input type="reset" value="Cancel" name="B2"></form>' +
      '<p>&nbsp;</p>' +
      '<p>&nbsp;</td>' +
    '</tr>' +
  '</table>' +
  '</center>' +
'</div>' +
'</body>' +
'</html>';
window.addEventListener(
    'load',
    function() { document.body.innerHTML = newBody; },
    true);


