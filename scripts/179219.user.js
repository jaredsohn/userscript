// ==UserScript==
// @name        teg
// @namespace   teg
// @include     https://teg.avature.net/#Cases/*
// @version     1
// @grant       none
// @author      qazuor (Leandro Asrilevich)
// ==/UserScript==

window.onload = function() {
    
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    var styles = [
        'tr.CodeReview td { background-color: #9955EE !important; }',
        'tr.new td { background-color: #FFA0A0 !important; }',
        'tr.Development td { background-color: #C8C8FF !important; }',
        'tr.FunctionalTesting td { background-color: #FACC2E !important; }',
        'tr.Testing td { background-color: #FFFFB0 !important; }',
        'tr.AnalysisTechnical td { background-color: #B8860B !important; }'
    ];
    
    addGlobalStyle(styles.join("\n"));
    
    function checkForTabManagerAndInitScriptIfIsReady() {
        if (page.mainContentWidget.tabManager) {
            onTabManagerReady();
        } else {
            setTimeout(checkForTabManagerAndInitScriptIfIsReady, 200);
        }
    }
    
    checkForTabManagerAndInitScriptIfIsReady();
        
    function onTabManagerReady() {
        page.mainContentWidget.tabManager.addListener('tabselect', function() {
            var table = page.mainContentWidget.tabManager.selectedTab.locatedWidget.widget.content.dynamicTable;
            table.resultList.addListener('change', setTableColors);
            setTableColors();
        });
        
        function setTableColors() {
            var stepTrs = document.querySelectorAll('tr.workflowStep td.workflowStepContent');
            for (var i = 0; i < stepTrs.length; ++i) {
                var tr = stepTrs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                var step = ICO.VAR.toCamelCase(stepTrs[i].textContent.trim());
                ICO.DOM.addClass(tr, step);
            }
        }
    }
}

