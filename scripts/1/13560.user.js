{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20    1. // ==UserScript==\par
   2. // @name           Signature in Comm Msg & SB\par
   3. // @namespace      SrK\par
   4. // @description    Signature in SB and Comm Msg\par
   5. // @include        http://www.orkut.com/CommMsgPost.aspx?cmm=*\par
   6. // @include        http://www.orkut.com/Scrapbook.aspx*\par
   7. // ==/UserScript==\par
   8. addEventListener('load', function(event) \{\par
   9. function getTextArea() \{\par
  10.     return document.getElementsByTagName('textarea')[0];\par
  11. \}\par
  12. //----------------------------\par
  13. // -- To Edit, Install This Script, Go to Tools, Greasemonkey, Manage User Scripts, Select this Script and click on Edit, after edited, press ctrl + s and Enjoy!! --\par
  14. //----------------------------\par
  15.\par
  16. function sign() \{\par
  17.     e=document.getElementsByTagName('TEXTAREA').item(0).value;\par
  18.     document.getElementsByTagName('TEXTAREA').item(0).value=e+"\\n\\n\\n [silver]On3 n OnLy:[/silver][red][b] \u9787? SrK \u9787?";\par
  19. \}\par
  20.     function Gautam() \{\par
  21.     text=getTextArea();\par
  22.     if (!text) return;\par
  23.     c=text.parentNode;\par
  24.     d=document.createElement("div");\par
  25.     d.className="T";\par
  26.     d.style.fontSize="11px";\par
  27.     d.align="left";\par
  28.    \par
  29.        \par
  30.         d.style.marginTop="10px";\par
  31.     c.appendChild(d);\par
  32.    \par
  33.     sig=document.createElement("a");\par
  34.     sig.href="javascript:;";\par
  35.     sig.innerHTML="Add Signature";\par
  36.     sig.addEventListener("click", sign, true);\par
  37.     d.appendChild(sig);\par
}
 