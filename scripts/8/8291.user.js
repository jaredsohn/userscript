// ==UserScript==
// @name          FireBug Console
// @description   FireBug Lite!
// @include       *
// ==/UserScript==


// ADD (FREMYCOMPANY) //
var firebug_html="%3C!DOCTYPE%20html%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20XHTML%201.0%20Strict%2F%2FEN%22%0A%20%20%20%20%20%20%20%20%20%22http%3A%2F%2Fwww.w3.org%2FTR%2Fxhtml1%2FDTD%2Fxhtml1-strict.dtd%22%3E%0A%0A%3Chtml%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%3E%0A%0A%3Chead%3E%0A%20%20%20%20%3Ctitle%3EFirebug%3C%2Ftitle%3E%0A%20%20%20%20%3Clink%20rel%3D%22stylesheet%22%20type%3D%22text%2Fcss%22%20href%3D%22http%3A%2F%2Fwww.getfirebug.com%2Ffirebug%2Ffirebug.css%22%3E%0A%3C%2Fhead%3E%0A%0A%3Cbody%3E%0A%20%20%20%20%3Cdiv%20id%3D%22toolbar%22%20class%3D%22toolbar%22%3E%0A%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20onclick%3D%22parent.console.clear()%22%3EClear%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22toolbarRight%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22%23%22%20onclick%3D%22parent.console.close()%22%3EClose%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%3C%2Fspan%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20id%3D%22log%22%3E%3C%2Fdiv%3E%0A%20%20%20%20%3Cinput%20type%3D%22text%22%20id%3D%22commandLine%22%3E%0A%20%20%20%20%0A%20%20%20%20%3Cscript%3Eparent.onFirebugReady(document)%3B%3C%2Fscript%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A";
var firebug_css="%0Ahtml%2C%20body%20%7B%0A%20%20%20%20margin%3A%200%3B%0A%20%20%20%20background%3A%20%23FFFFFF%3B%0A%20%20%20%20font-family%3A%20Lucida%20Grande%2C%20Tahoma%2C%20sans-serif%3B%0A%20%20%20%20font-size%3A%2011px%3B%0A%20%20%20%20overflow%3A%20hidden%3B%0A%7D%0A%0Aa%20%7B%0A%20%20%20%20text-decoration%3A%20none%3B%0A%7D%0A%0Aa%3Ahover%20%7B%0A%20%20%20%20text-decoration%3A%20underline%3B%0A%7D%0A%0A.toolbar%20%7B%0A%20%20%20%20height%3A%2014px%3B%0A%20%20%20%20border-top%3A%201px%20solid%20ThreeDHighlight%3B%0A%20%20%20%20border-bottom%3A%201px%20solid%20ThreeDShadow%3B%0A%20%20%20%20padding%3A%202px%206px%3B%0A%20%20%20%20background%3A%20ThreeDFace%3B%0A%7D%0A%0A.toolbarRight%20%7B%0A%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20top%3A%204px%3B%0A%20%20%20%20right%3A%206px%3B%0A%7D%0A%0A%23log%20%7B%0A%20%20%20%20overflow%3A%20auto%3B%0A%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20left%3A%200%3B%0A%20%20%20%20width%3A%20100%25%3B%0A%7D%0A%0A%23commandLine%20%7B%0A%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20bottom%3A%200%3B%0A%20%20%20%20left%3A%200%3B%0A%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20height%3A%2018px%3B%0A%20%20%20%20border%3A%20none%3B%0A%20%20%20%20border-top%3A%201px%20solid%20ThreeDShadow%3B%0A%7D%0A%0A%2F************************************************************************************************%2F%0A%0A.logRow%20%7B%0A%20%20%20%20position%3A%20relative%3B%0A%20%20%20%20border-bottom%3A%201px%20solid%20%23D7D7D7%3B%0A%20%20%20%20padding%3A%202px%204px%201px%206px%3B%0A%20%20%20%20background-color%3A%20%23FFFFFF%3B%0A%7D%0A%0A.logRow-command%20%7B%0A%20%20%20%20font-family%3A%20Monaco%2C%20monospace%3B%0A%20%20%20%20color%3A%20blue%3B%0A%7D%0A%0A.objectBox-null%20%7B%0A%20%20%20%20padding%3A%200%202px%3B%0A%20%20%20%20border%3A%201px%20solid%20%23666666%3B%0A%20%20%20%20background-color%3A%20%23888888%3B%0A%20%20%20%20color%3A%20%23FFFFFF%3B%0A%7D%0A%0A.objectBox-string%20%7B%0A%20%20%20%20font-family%3A%20Monaco%2C%20monospace%3B%0A%20%20%20%20color%3A%20red%3B%0A%20%20%20%20white-space%3A%20pre%3B%0A%7D%0A%0A.objectBox-number%20%7B%0A%20%20%20%20color%3A%20%23000088%3B%0A%7D%0A%0A.objectBox-function%20%7B%0A%20%20%20%20font-family%3A%20Monaco%2C%20monospace%3B%0A%20%20%20%20color%3A%20DarkGreen%3B%0A%7D%0A%0A.objectBox-object%20%7B%0A%20%20%20%20color%3A%20DarkGreen%3B%0A%20%20%20%20font-weight%3A%20bold%3B%0A%7D%0A%0A%2F************************************************************************************************%2F%0A%0A.logRow-info%2C%0A.logRow-error%2C%0A.logRow-warning%20%7B%0A%20%20%20%20background%3A%20%23FFFFFF%20no-repeat%202px%202px%3B%0A%20%20%20%20padding-left%3A%2020px%3B%0A%20%20%20%20padding-bottom%3A%203px%3B%0A%7D%0A%0A.logRow-info%20%7B%0A%20%20%20%20background-image%3A%20url(infoIcon.png)%3B%0A%7D%0A%0A.logRow-warning%20%7B%0A%20%20%20%20background-color%3A%20cyan%3B%0A%20%20%20%20background-image%3A%20url(warningIcon.png)%3B%0A%7D%0A%0A.logRow-error%20%7B%0A%20%20%20%20background-color%3A%20LightYellow%3B%0A%20%20%20%20background-image%3A%20url(errorIcon.png)%3B%0A%7D%0A%0A.errorMessage%20%7B%0A%20%20%20%20vertical-align%3A%20top%3B%0A%20%20%20%20color%3A%20%23FF0000%3B%0A%7D%0A%0A.objectBox-sourceLink%20%7B%0A%20%20%20%20position%3A%20absolute%3B%0A%20%20%20%20right%3A%204px%3B%0A%20%20%20%20top%3A%202px%3B%0A%20%20%20%20padding-left%3A%208px%3B%0A%20%20%20%20font-family%3A%20Lucida%20Grande%2C%20sans-serif%3B%0A%20%20%20%20font-weight%3A%20bold%3B%0A%20%20%20%20color%3A%20%230000FF%3B%0A%7D%0A%0A%2F************************************************************************************************%2F%0A%0A.logRow-group%20%7B%0A%20%20%20%20background%3A%20%23EEEEEE%3B%0A%20%20%20%20border-bottom%3A%20none%3B%0A%7D%0A%0A.logGroup%20%7B%0A%20%20%20%20background%3A%20%23EEEEEE%3B%0A%7D%0A%0A.logGroupBox%20%7B%0A%20%20%20%20margin-left%3A%2024px%3B%0A%20%20%20%20border-top%3A%201px%20solid%20%23D7D7D7%3B%0A%20%20%20%20border-left%3A%201px%20solid%20%23D7D7D7%3B%0A%7D%0A%0A%2F************************************************************************************************%2F%0A%0A.selectorTag%2C%0A.selectorId%2C%0A.selectorClass%20%7B%0A%20%20%20%20font-family%3A%20Monaco%2C%20monospace%3B%0A%20%20%20%20font-weight%3A%20normal%3B%0A%7D%0A%0A.selectorTag%20%7B%0A%20%20%20%20color%3A%20%230000FF%3B%0A%7D%0A%0A.selectorId%20%7B%0A%20%20%20%20color%3A%20DarkBlue%3B%0A%7D%0A%0A.selectorClass%20%7B%0A%20%20%20%20color%3A%20red%3B%0A%7D%0A%0A%2F************************************************************************************************%2F%0A%0A.objectBox-element%20%7B%0A%20%20%20%20font-family%3A%20Monaco%2C%20monospace%3B%0A%20%20%20%20color%3A%20%23000088%3B%0A%7D%0A%0A.nodeChildren%20%7B%0A%20%20%20%20margin-left%3A%2016px%3B%0A%7D%0A%0A.nodeTag%20%7B%0A%20%20%20%20color%3A%20blue%3B%0A%7D%0A%0A.nodeValue%20%7B%0A%20%20%20%20color%3A%20%23FF0000%3B%0A%20%20%20%20font-weight%3A%20normal%3B%0A%7D%0A%0A.nodeText%2C%0A.nodeComment%20%7B%0A%20%20%20%20margin%3A%200%202px%3B%0A%20%20%20%20vertical-align%3A%20top%3B%0A%7D%0A%0A.nodeText%20%7B%0A%20%20%20%20color%3A%20%23333333%3B%0A%7D%0A%0A.nodeComment%20%7B%0A%20%20%20%20color%3A%20DarkGreen%3B%0A%7D%0A%0A%2F************************************************************************************************%2F%0A%0A.propertyNameCell%20%7B%0A%20%20%20%20vertical-align%3A%20top%3B%0A%7D%0A%0A.propertyName%20%7B%0A%20%20%20%20font-weight%3A%20bold%3B%0A%7D%0A";
var objectBrowser_html="%3C!DOCTYPE%20html%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20XHTML%201.0%20Transitional%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FTR%2Fxhtml1%2FDTD%2Fxhtml1-transitional.dtd%22%3E%0D%0A%3Chtml%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%20%3E%0D%0A%3Chead%3E%0D%0A%20%20%20%20%3Ctitle%3EObject%20Browser%3C%2Ftitle%3E%0D%0A%20%20%20%20%3Cscript%20type%3D%22text%2Fjavascript%22%3E%0D%0A%20%20%20%20var%20target%20%3D%20opener.console.target%3B%0D%0A%20%20%20%20var%20targets%20%3D%20%5Btarget%5D%3B%0D%0A%20%20%20%20%20%20%20%20targets.currentIndex%20%3D%200%3B%0D%0A%20%20%20%20%20%20%20%20targets.moveUp%3Dfunction(name)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20this.currentIndex%2B%2B%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20this%5Bthis.currentIndex%5D%3Dthis%5Bthis.currentIndex-1%5D%5Bname%5D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20this.refresh()%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20targets.moveNext%3Dfunction(newTarget)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!newTarget)%20%7B%20alert(%22This%20object%20doesn't%20exists%22)%3B%20return%20false%3B%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20this.currentIndex%2B%2B%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20this%5Bthis.currentIndex%5D%3DnewTarget%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20this.refresh()%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20targets.moveDown%3Dfunction()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(this.currentIndex!%3D0)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20delete%20this%5Bthis.currentIndex%5D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.currentIndex--%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this.refresh()%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20targets.printValue%3Dfunction()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20w%20%3D%20window.open(%22about%3Ablank%22%2C%22_blank%22%2C%22height%3D600%2C%20width%3D800%2C%20centerscreen%3Dyes%2C%20center%3Dyes%2C%20scrollbars%3Dyes%22)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20targets.printValue.w%3Dw%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20setTimeout(targets.printValue.wait%2C%20150)%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20targets.printValue.wait%3Dfunction()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20w%20%3D%20targets.printValue.w%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(w.document)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20s%20%3D%20document.createElement(%22span%22)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20s.appendChild(document.createTextNode((%22%22%2Btarget).split(%22%5Cn%22).join(%22%5BBR%5D%22).split(%22%5Ct%22).join(%22%5BS%5D%22)))%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20w.document.write(s.innerHTML.split(%22%5BBR%5D%22).join(%22%3CBR%20%2F%3E%22).split(%22%5BS%5D%22).join(%22%26nbsp%3B%26nbsp%3B%26nbsp%3B%26nbsp%3B%22))%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20setTimeout(targets.printValue%2C%20150)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20targets.refresh%3Dfunction()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20target%20%3D%20targets%5Btargets.currentIndex%5D%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20tbody%20%3D%20%22%22%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20var%20s%20%3D%20document.createElement(%22span%22)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20s.appendChild(document.createTextNode(%22%22%2Btarget))%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20tbody%20%2B%3D%20getData(%22propertyRow%22%2C%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%22%3Cb%3EValue%3C%2Fb%3E%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22target%22%3A%22targets.printValue()%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22value%22%3A%22%5B...%5D%22%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20tbody%20%2B%3D%20getData(%22propertyRow%22%2C%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3A%22%3Cb%3EProperties%3C%2Fb%3E%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22target%22%3A%22%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22value%22%3A%22%22%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20for%20(key%20in%20target)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20tbody%20%2B%3D%20getData(%22propertyRow%22%2C%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22name%22%3Akey%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22target%22%3A%22targets.moveUp('%22%2Bkey.split(%22'%22).join(%22%5C%5C'%22)%2B%22')%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22value%22%3A(%22%22%2Btarget%5Bkey%5D).split(%22%5Cn%22)%5B0%5D.substr(0%2C%2025)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20catch%20(ex)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20table%20%3D%20getData(%22propertyTable%22%2C%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22tbody%22%3Atbody%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20container%20%3D%20document.getElementById(%22properties%22)%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20container.innerHTML%3Dtable%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20container.scrollTop%20%3D%200%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20function%20getData(name%2C%20remplacements)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20res%20%3D%20document.getElementById(%22data_%22%20%2B%20name).firstChild.data%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20for%20(key%20in%20remplacements)%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20res%20%3D%20res.split(%22%3C%5C%3F%22%20%2B%20key%20%2B%20%22%3F%5C%3E%22).join(remplacements%5Bkey%5D)%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20res%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20function%20Button1_onclick()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20targets.moveDown()%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%20%20%20%20function%20Button2_onclick()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20targets.refresh()%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20function%20Button3_onclick()%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20try%20%7B%20targets.moveNext(eval(document.getElementById(%22Input1%22).value))%3B%20%7D%20catch%20(ex)%20%7B%7D%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20document.getElementById(%22Input1%22).value%3D%22target%22%3B%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%3C%2Fscript%3E%0D%0A%3C%2Fhead%3E%0D%0A%3Cbody%20bgcolor%3D%22buttonface%22%3E%0D%0A%20%20%20%20%3Cinput%20id%3D%22Button1%22%20type%3D%22button%22%20value%3D%22%20%20Back%20%20%22%20language%3D%22javascript%22%20onclick%3D%22return%20Button1_onclick()%22%20%2F%3E%0D%0A%20%20%20%20%3Cinput%20id%3D%22Button2%22%20type%3D%22button%22%20value%3D%22%20Refresh%20%22%20language%3D%22javascript%22%20onclick%3D%22return%20Button2_onclick()%22%20%2F%3E%0D%0A%20%20%20%20%3Cinput%20id%3D%22Input1%22%20type%3D%22input%22%20value%3D%22target%22%20language%3D%22javascript%22%20%2F%3E%0D%0A%20%20%20%20%3Cinput%20id%3D%22Button3%22%20type%3D%22button%22%20value%3D%22%20Execute%20%22%20language%3D%22javascript%22%20onclick%3D%22return%20Button3_onclick()%22%20%2F%3E%0D%0A%20%20%20%20%3Cbr%20%2F%3E%0D%0A%20%20%20%20%3Cdiv%20id%3D%22properties%22%20style%3D%22width%3A%20490px%3B%20height%3A%20300px%3B%20overflow-y%3A%20scroll%3B%20overflow-x%3A%20hidden%3B%20%22%3E%3C%2Fdiv%3E%0D%0A%20%20%20%20%3Cspan%20id%3D%22data%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20id%3D%22data_propertyTable%22%3E%3C!--%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctable%20width%3D%22490%22%20border%3D%221px%20black%20solid%22%20style%3D%22background-color%3A%20white%3B%20widht%3A%20490px%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctbody%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%3Ftbody%3F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%22130px%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20No%20more%20property%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%22360px%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%26nbsp%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftbody%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftable%3E%20%20%20%20%20%20%20%20%0D%0A%20%20%20%20%20%20%20%20--%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%20%20%20%20%3Cspan%20id%3D%22data_propertyRow%22%3E%3C!--%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctr%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%22100px%22%20style%3D%22cursor%3A%20pointer%22%20onclick%3D%22%3C%3Ftarget%3F%3E%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%3Fname%3F%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctd%20width%3D%22300px%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%3Fvalue%3F%3E%26nbsp%3B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftd%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Ftr%3E%0D%0A%20%20%20%20%20%20%20%20--%3E%3C%2Fspan%3E%0D%0A%20%20%20%20%3C%2Fspan%3E%0D%0A%20%20%20%20%3Cscript%3Etargets.refresh()%3C%2Fscript%3E%0D%0A%3C%2Fbody%3E%0D%0A%3C%2Fhtml%3E%0D%0A";
var firebug_base_URI="http://www.getfirebug.com/firebug/"
var objectCache=new Array();
// END ADD            //

if (!("console" in window) || !("firebug" in console)) {
(function()
{
    var document=window.document;
    window.console = 
    {
        log: function()
        {
            logFormatted(arguments, "");
        },
        
        debug: function()
        {
            logFormatted(arguments, "debug");
        },
        
        info: function()
        {
            logFormatted(arguments, "info");
        },
        
        warn: function()
        {
            logFormatted(arguments, "warning");
        },
        
        error: function()
        {
            logFormatted(arguments, "error");
        },
        
        assert: function(truth, message)
        {
            if (!truth)
            {
                var args = [];
                for (var i = 1; i < arguments.length; ++i)
                    args.push(arguments[i]);
                
                logFormatted(args.length ? args : ["Assertion Failure"], "error");
                throw message ? message : "Assertion Failure";
            }
        },
        
        dir: function(object)
        {
            var html = [];
                        
            var pairs = [];
            for (var name in object)
            {
                try
                {
                    pairs.push([name, object[name]]);
                }
                catch (exc)
                {
                }
            }
            
            pairs.sort(function(a, b) { return a[0] < b[0] ? -1 : 1; });
            
            html.push('<table>');
            for (var i = 0; i < pairs.length; ++i)
            {
                var name = pairs[i][0], value = pairs[i][1];
                
                html.push('<tr>', 
                '<td class="propertyNameCell"><span class="propertyName">',
                    escapeHTML(name), '</span></td>', '<td><span class="propertyValue">');
                appendObject(value, html);
                html.push('</span></td></tr>');
            }
            html.push('</table>');
            
            logRow(html, "dir");
        },
        
        dirxml: function(node)
        {
            var html = [];
            
            appendNode(node, html);
            logRow(html, "dirxml");
        },
        
        group: function()
        {
            logRow(arguments, "group", pushGroup);
        },
        
        groupEnd: function()
        {
            logRow(arguments, "", popGroup);
        },
        
        time: function(name)
        {
            timeMap[name] = (new Date()).getTime();
        },
        
        timeEnd: function(name)
        {
            if (name in timeMap)
            {
                var delta = (new Date()).getTime() - timeMap[name];
                logFormatted([name+ ":", delta+"ms"]);
                delete timeMap[name];
            }
        },
        
        count: function()
        {
            this.warn(["count() not supported."]);
        },
        
        trace: function()
        {
            this.warn(["trace() not supported."]);
        },
        
        profile: function()
        {
            this.warn(["profile() not supported."]);
        },
        
        profileEnd: function()
        {
        },
        
        clear: function()
        {
            objectCache=new Array();
            consoleBody.innerHTML = "";
        },

        open: function()
        {
            toggleConsole(true);
        },
        
        close: function()
        {
            if (frameVisible)
                toggleConsole();
        }
    };
 
    // ********************************************************************************************
       
    var consoleFrame = null;
    var consoleBody = null;
    var commandLine = null;
    
    var frameVisible = false;
    var messageQueue = [];
    var groupStack = [];
    var timeMap = {};
    
    var clPrefix = ">>> ";
    
    var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
    var isOpera = navigator.userAgent.indexOf("Opera") != -1;
    var isIE = !isOpera && navigator.userAgent.indexOf("MSIE") != -1;
    var isSafari = navigator.userAgent.indexOf("AppleWebKit") != -1;

    // ********************************************************************************************

    function toggleConsole(forceOpen)
    {
        frameVisible = forceOpen || !frameVisible;
        if (consoleFrame) {
            consoleFrame.style.visibility = frameVisible ? "visible" : "hidden";
            if (consoleFrame.style.visibility=="visible") {
                consoleFrame.timer=setInterval(layout, 100);
            } else { 
                clearInterval(consoleFrame.timer);
            }
        } else {
            waitForBody();
        }
    }

    function focusCommandLine()
    {
        toggleConsole(true);
        if (commandLine)
            commandLine.focus();
    }

    function waitForBody()
    {
        if (document.body)
            createFrame();
        else
            setTimeout(waitForBody, 200);
    }    

    function createFrame()
    {
        if (consoleFrame)
            return;
        
        window.onFirebugReady = function(doc)
        {
            window.onFirebugReady = null;
            
            var toolbar = doc.getElementById("toolbar");
            toolbar.onmousedown = onSplitterMouseDown;

            commandLine = doc.getElementById("commandLine");
            addEvent(commandLine, "keydown", onCommandLineKeyDown);

            addEvent(doc, isIE || isSafari ? "keydown" : "keypress", onKeyDown);
            
            consoleBody = doc.getElementById("log");
            layout();
            flush();
            
            doc.createStyleSheet();
            doc.cssText=unescape(firebug_css);
        }

        var baseURL = getFirebugURL();

        consoleFrame = document.createElement("iframe");
        consoleFrame.name="firebug_console";
        consoleFrame.src="about:blank";
        consoleFrame.setAttribute("frameBorder", "0");
        consoleFrame.style.visibility = (frameVisible ? "visible" : "hidden");    
        consoleFrame.style.zIndex = "2147483647";
        consoleFrame.style.position = "fixed";
        consoleFrame.style.width = "100%";
        consoleFrame.style.left = "0";
        consoleFrame.style.bottom = "0";
        consoleFrame.style.height = "200px";
        consoleFrame.style.border = "3px inset"
        document.body.appendChild(consoleFrame);
        
        consoleFrame.wait=function() {
            var doc = null;
            if (consoleFrame.contentWindow) {
                doc = consoleFrame.contentWindow.document;
            } else if (consoleFrame.window) {
                doc = consoleFrame.window.document;
            } else {
                setTimeout(consoleFrame.wait, 150);
                return false;
            }
            doc.write(unescape(firebug_html));
        }
        setTimeout(consoleFrame.wait, 150)
    }
    
    function getFirebugURL()
    {
        /*
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; ++i)
        {
            if (scripts[i].src.indexOf("firebug.js") != -1)
            {
                var lastSlash = scripts[i].src.lastIndexOf("/");
                return scripts[i].src.substr(0, lastSlash);
            }
        }
        */
        return firebug_base_URI;

    }
    
    function evalCommandLine()
    {
        var text = commandLine.value;
        commandLine.value = "";

        logRow([clPrefix, text], "command");
        
        var value;
        try
        {
            value = eval(text);
        }
        catch (exc)
        {
        }

        console.log(value);
    }
    
    function layout()
    {
        consoleFrame.style.height=parseInt(consoleFrame.style.height)-6;
        var toolbar = consoleBody.ownerDocument.getElementById("toolbar");
        var height = consoleFrame.offsetHeight - (toolbar.offsetHeight + commandLine.offsetHeight);
        consoleBody.style.top = toolbar.offsetHeight + "px";
        consoleBody.style.height = height + "px";
        
        commandLine.style.top = (consoleFrame.offsetHeight - commandLine.offsetHeight) + "px";
        consoleFrame.style.height=parseInt(consoleFrame.style.height)+6;
    }
    
    function logRow(message, className, handler)
    {
        if (consoleBody)
            writeMessage(message, className, handler);
        else
        {
            messageQueue.push([message, className, handler]);
            waitForBody();
        }
    }
    
    function flush()
    {
        var queue = messageQueue;
        messageQueue = [];
        
        for (var i = 0; i < queue.length; ++i)
            writeMessage(queue[i][0], queue[i][1], queue[i][2]);
    }

    function writeMessage(message, className, handler)
    {
        var isScrolledToBottom =
            consoleBody.scrollTop + consoleBody.offsetHeight >= consoleBody.scrollHeight;

        if (!handler)
            handler = writeRow;
        
        handler(message, className);
        
        if (isScrolledToBottom)
            consoleBody.scrollTop = consoleBody.scrollHeight - consoleBody.offsetHeight;
    }
    
    function appendRow(row)
    {
        var container = groupStack.length ? groupStack[groupStack.length-1] : consoleBody;
        container.appendChild(row);
    }

    function writeRow(message, className)
    {
        var row = consoleBody.ownerDocument.createElement("div");
        row.className = "logRow" + (className ? " logRow-"+className : "");
        row.innerHTML = message.join("");
        appendRow(row);
    }

    function pushGroup(message, className)
    {
        logFormatted(message, className);

        var groupRow = consoleBody.ownerDocument.createElement("div");
        groupRow.className = "logGroup";
        var groupRowBox = consoleBody.ownerDocument.createElement("div");
        groupRowBox.className = "logGroupBox";
        groupRow.appendChild(groupRowBox);
        appendRow(groupRowBox);
        groupStack.push(groupRowBox);
    }

    function popGroup()
    {
        groupStack.pop();
    }
    
    // ********************************************************************************************

    function logFormatted(objects, className)
    {
        var html = [];

        var format = objects[0];
        var objIndex = 0;

        if (typeof(format) != "string")
        {
            format = "";
            objIndex = -1;
        }

        var parts = parseFormat(format);
        for (var i = 0; i < parts.length; ++i)
        {
            var part = parts[i];
            if (part && typeof(part) == "object")
            {
                var object = objects[++objIndex];
                part.appender(object, html);
            }
            else
                appendText(part, html);
        }

        for (var i = objIndex+1; i < objects.length; ++i)
        {
            appendText(" ", html);
            
            var object = objects[i];
            if (typeof(object) == "string")
                appendText(object, html);
            else
                appendObject(object, html);
        }
        
        logRow(html, className);
    }

    function parseFormat(format)
    {
        var parts = [];

        var reg = /((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;    
        var appenderMap = {s: appendText, d: appendInteger, i: appendInteger, f: appendFloat};

        for (var m = reg.exec(format); m; m = reg.exec(format))
        {
            var type = m[8] ? m[8] : m[5];
            var appender = type in appenderMap ? appenderMap[type] : appendObject;
            var precision = m[3] ? parseInt(m[3]) : (m[4] == "." ? -1 : 0);

            parts.push(format.substr(0, m[0][0] == "%" ? m.index : m.index+1));
            parts.push({appender: appender, precision: precision});

            format = format.substr(m.index+m[0].length);
        }

        parts.push(format);

        return parts;
    }

    function escapeHTML(value)
    {
        function replaceChars(ch)
        {
            switch (ch)
            {
                case "<":
                    return "&lt;";
                case ">":
                    return "&gt;";
                case "&":
                    return "&amp;";
                case "'":
                    return "&#39;";
                case '"':
                    return "&quot;";
            }
            return "?";
        };
        return String(value).replace(/[<>&"']/g, replaceChars);
    }

    function objectToString(object)
    {
        try
        {
            return object+"";
        }
        catch (exc)
        {
            return null;
        }
    }

    // ********************************************************************************************

    function appendText(object, html)
    {
        html.push(escapeHTML(objectToString(object)));
    }

    function appendNull(object, html)
    {
        html.push('<span class="objectBox-null">', escapeHTML(objectToString(object)), '</span>');
    }

    function appendString(object, html)
    {
        html.push('<span class="objectBox-string">&quot;', escapeHTML(objectToString(object)),
            '&quot;</span>');
    }

    function appendInteger(object, html)
    {
        html.push('<span class="objectBox-number">', escapeHTML(objectToString(object)), '</span>');
    }

    function appendFloat(object, html)
    {
        html.push('<span class="objectBox-number">', escapeHTML(objectToString(object)), '</span>');
    }

    function appendFunction(object, html)
    {
        var reName = /function ?(.*?)\(/;
        var m = reName.exec(objectToString(object));
        var name = m ? m[1] : "function";
        html.push('<span class="objectBox-function">', escapeHTML(name), '()</span>');
    }
    
    function appendObject(object, html)
    {
        try
        {
            if (object == undefined)
                appendNull("undefined", html);
            else if (object == null)
                appendNull("null", html);
            else if (typeof object == "string")
                appendString(object, html);
            else if (typeof object == "number")
                appendInteger(object, html);
            else if (typeof object == "function")
                appendFunction(object, html);
            else if (object.nodeType == 1)
                appendSelector(object, html);
            else if (typeof object == "object")
                appendObjectFormatted(object, html);
            else
                appendText(object, html);
        }
        catch (exc)
        {
        }
    }

    window.analyse = function analyse(index) {
        window.console.target=objectCache[index];
        var w = window.open("about:blank","_blank","width=500,height=350");
        analyse.w=w;
        setTimeout(analyse.wait, 150);
    }
    analyse.wait=function() {
        var w = analyse.w;
        if (w.document) {
            w.document.write(unescape(objectBrowser_html))
        } else {
            setTimeout(analyse.wait, 150)
        }
    }
    
    function appendObjectFormatted(object, html)
    {
        var index=objectCache.length;
        objectCache.push(object);
        var text = objectToString(object);
        var reObject = /\[object (.*?)\]/;

        var m = reObject.exec(text);
        html.push('<span class="objectBox-object" style="cursor: pointer" onclick="parent.analyse('+index+')">', m ? m[1] : text, '</span>')
    }
    
    function appendSelector(object, html)
    {
        html.push('<span class="objectBox-selector">');

        html.push('<span class="selectorTag">', escapeHTML(object.nodeName.toLowerCase()), '</span>');
        if (object.id)
            html.push('<span class="selectorId">#', escapeHTML(object.id), '</span>');
        if (object.className)
            html.push('<span class="selectorClass">.', escapeHTML(object.className), '</span>');

        html.push('</span>');
    }

    function appendNode(node, html)
    {
        if (node.nodeType == 1)
        {
            html.push(
                '<div class="objectBox-element">',
                    '&lt;<span class="nodeTag">', node.nodeName.toLowerCase(), '</span>');

            for (var i = 0; i < node.attributes.length; ++i)
            {
                var attr = node.attributes[i];
                if (!attr.specified)
                    continue;
                
                html.push('&nbsp;<span class="nodeName">', attr.nodeName.toLowerCase(),
                    '</span>=&quot;<span class="nodeValue">', escapeHTML(attr.nodeValue),
                    '</span>&quot;')
            }

            if (node.firstChild)
            {
                html.push('&gt;</div><div class="nodeChildren">');

                for (var child = node.firstChild; child; child = child.nextSibling)
                    appendNode(child, html);
                    
                html.push('</div><div class="objectBox-element">&lt;/<span class="nodeTag">', 
                    node.nodeName.toLowerCase(), '&gt;</span></div>');
            }
            else
                html.push('/&gt;</div>');
        }
        else if (node.nodeType == 3)
        {
            html.push('<div class="nodeText">', escapeHTML(node.nodeValue),
                '</div>');
        }
    }

    // ********************************************************************************************
    
    function addEvent(object, name, handler)
    {
        if (document.all)
            object.attachEvent("on"+name, handler);
        else
            object.addEventListener(name, handler, false);
    }
    
    function removeEvent(object, name, handler)
    {
        if (document.all)
            object.detachEvent("on"+name, handler);
        else
            object.removeEventListener(name, handler, false);
    }
    
    function cancelEvent(event)
    {
        if (document.all)
            event.cancelBubble = true;
        else
            event.stopPropagation();        
    }

    function onError(msg, href, lineNo)
    {
        var html = [];
        
        var lastSlash = href.lastIndexOf("/");
        var fileName = lastSlash == -1 ? href : href.substr(lastSlash+1);
        
        html.push(
            '<span class="errorMessage">', msg, '</span>', 
            '<div class="objectBox-sourceLink">', fileName, ' (line ', lineNo, ')</div>'
        );
        
        logRow(html, "error");
    };

    function onKeyDown(event)
    {
        if (event.keyCode == 123)
            toggleConsole();
        else if ((event.keyCode == 108 || event.keyCode == 76) && event.shiftKey
                 && (event.metaKey || event.ctrlKey))
            focusCommandLine();
        else
            return;
        
        cancelEvent(event);
    }

    function onSplitterMouseDown(event)
    {
        if (isSafari || isOpera)
            return;
        
        addEvent(document, "mousemove", onSplitterMouseMove);
        addEvent(document, "mouseup", onSplitterMouseUp);

        for (var i = 0; i < frames.length; ++i)
        {
            addEvent(frames[i].document, "mousemove", onSplitterMouseMove);
            addEvent(frames[i].document, "mouseup", onSplitterMouseUp);
        }
    }
    
    function onSplitterMouseMove(event)
    {
        var win = document.all
            ? event.srcElement.ownerDocument.parentWindow
            : event.target.ownerDocument.defaultView;

        var clientY = event.clientY;
        if (win != win.parent)
            clientY += win.frameElement ? win.frameElement.offsetTop : 0;
        
        var height = consoleFrame.offsetTop + consoleFrame.clientHeight;
        var y = height - clientY;
        
        consoleFrame.style.height = y + "px";
        layout();
    }
    
    function onSplitterMouseUp(event)
    {
        removeEvent(document, "mousemove", onSplitterMouseMove);
        removeEvent(document, "mouseup", onSplitterMouseUp);

        for (var i = 0; i < frames.length; ++i)
        {
            removeEvent(frames[i].document, "mousemove", onSplitterMouseMove);
            removeEvent(frames[i].document, "mouseup", onSplitterMouseUp);
        }
    }
    
    function onCommandLineKeyDown(event)
    {
        if (event.keyCode == 13)
            evalCommandLine();
        else if (event.keyCode == 27)
            commandLine.value = "";
    }
    
    //addEvent(window, "error", onError);
    window.onerror = onError;
    addEvent(document, isIE || isSafari ? "keydown" : "keypress", onKeyDown);
    
    if (document.documentElement.getAttribute("debug") == "true")
        toggleConsole(true);
        
})();
}
