// ==UserScript==
// @name       ROBLOX Themed Upload
// @namespace  http://www.roblox.com/user.aspx?username=glosgreen2
// @version    0.1
// @description  Changes the upload buttons on the Develop pages to the ROBLOX House Style.
// @exclude *sitetest*
// @exclude *gametest*
// @copyright  2013
// @author  celliott1997
// @run-at  document-body
// ==/UserScript==

if (location.href.indexOf("roblox.com/build/upload") > 1 || location.href.indexOf("roblox.com/develop/upload") > 1){
    var css = "\
    input[type='file']::-webkit-file-upload-button {\
      visibility: hidden;\
    }\
    input[type='file']:before {\
        color: #FFF;\
        content: 'Drop file here or Click to browse';\
        display: inline-block;\
        background: url('/images/Buttons/StyleGuide/bg-btn-green.png') repeat left 0px;\
        border: 1px solid #000;\
        padding: 5px 8px;\
        outline: none;\
        white-space: nowrap;\
        -webkit-user-select: none;\
        font-weight: 700;\
        font-size: 10pt;\
    }\
    input[type='file']:hover:before {\
        background-position: left -128px;\
    }\
    input[type='file']:active:before {\
        text-decoration: underline;\
    }\
    input[type='file']{\
		color: #FFF;\
        cursor: pointer;\
        height: 30px;\
        vertical-align: middle;\
    }";
    
    var s = document.createElement("style");
    s.setAttribute("name", "StyledInputs");
    s.innerHTML = css;
    document.head.appendChild(s);
};