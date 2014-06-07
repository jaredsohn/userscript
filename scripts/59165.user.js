// ==UserScript==
// @name           update last version in Mantis
// @description    update last version in Mantis
// @version        0.01
// @date           2009-10-05
// ==/UserScript==

if(document.body == null)
{
  if(window.addEventListener) { window.addEventListener('load',function(){ChangeVersion(1); }, false); }
  else window.attachEvent('onload', function(){ ChangeVersion(1); });
}
else ChangeVersion(1);


function ChangeVersion(ft)
{
  var elm = document.getElementsByName("fixed_in_version");
  elm[0].options[1].selected=true;
}