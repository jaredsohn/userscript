// ==UserScript==
// @name            Mahat Tziyonet Fixer
// @version         1.0
// @author          TzAnAnY
// @description     Fix The Login Button For Firefox Users
// @include         http://www2.moital.gov.il/WebServicesHandlers/Mahat/MahatGrades.aspx
// @updateVersion   1
// ==/UserScript==

var command, buttn;
command = "RegisterBeforeSubmit('btnSubmit','','true');" + 
"WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions('btnSubmit', '', true, '', '', false, true));";
buttn = document.getElementById("btnSubmit");
buttn.setAttribute("onclick", command);