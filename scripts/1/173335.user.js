// ==UserScript==
// @name       Enable 12333sh enquery social security in non IE browser
// @namespace  http://iworm.net/
// @version    0.1
// @description  When enquery your social secirity info in 12333sh.gov.cn using Chrome or Firefox, you will not able to click "Enquery" button, because they use a function "chkno" which defined in VBScript.
// @match      http://www.12333sh.gov.cn/200912333/2009wsbs/grbs/shbx/01/200909/t20090917_1085043.shtml
// @copyright  2013, iworm
// ==/UserScript==
unsafeWindow.chkno = function(param){return 1;}