// ==UserScript==
// @name           Simplify Blackcats
// @namespace      http://cadlab.cs.ucla.edu/~kirill
// @description    Makes logging in simpler 
// @include        http://www.blackcats-games.net/*
// ==/UserScript==



function fillBC_Code() {
    var code = GM_getValue('blackcats_keyword', false);
    //no code stored
    if( !code ) {
        var code = prompt('Please enter your blackcats keyword. It will be autofilled in the future.');
        GM_setValue('blackcats_keyword', code);
    }
    //fill in code
    var pObj = document.getElementById('txt1');
    if( pObj ) {
        pObj.value = code;
        pObj.addEventListener('change', updateBC_Code, true);
        unsafeWindow.showHint(code);
    }  
}
function scrollBottomBC() {
    var pObj = document.getElementById('txtHint');
    pObj = pObj.wrappedJSObject || pObj;
    pObj.scrollIntoView();
}
function updateBC_Code() {
    var pObj = document.getElementById('txt1');
    var code = GM_getValue('blackcats_keyword', false);
    //value changed
    if( code != pObj.value)
    {
        var r = confirm("You've changed the blackcats keyword.\nDo you want it autofilled in the future with this new value?");
        //I should update
        if( r )
            GM_setValue('blackcats_keyword', pObj.value);
    }
    scrollBottomBC();
}

function BlackCats_Helper()
 {
    var pObj = document.getElementById('txt1');
    pObj.style.color = "black";
    fillBC_Code();
    scrollBottomBC();
}
try {  BlackCats_Helper(); } catch(e) {}