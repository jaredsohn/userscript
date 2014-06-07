// ==UserScript== 
// @name Kentucky.com ad & sidebar remover
// @author chadthebad
// @version 0.2
// @description Delete the side mar and most of the header
// @include http*://www.kentucky.com/*
// ==/UserScript==

function main() {
 var DivRemove = ['footer', 'sidebar', 'widget_bundle', 'main_r2']
 var ClassRemove = ['widget', 'leaderboard', 'mast', 'sbb_wrap', 'parallel_widgets', 'widget']
    
    function removeElement(elemString) {
        var elem = document.getElementById(elemString)
        if (elem != undefined) {
            elem.parentNode.removeChild(elem)
        }
    }
    
    function removeElementByClass(classString) {
        var elem = document.getElementsByClassName(classString)[0]
        if (elem != undefined) {
            elem.parentNode.removeChild(elem)
        }
    }
    
    len = DivRemove.length
    for (i=0; i < len; i++) {
        removeElement(DivRemove[i])
    }

    len = ClassRemove.length
    for (i=0; i < len; i++) {
        removeElementByClass(ClassRemove[i])
    }
}

main()