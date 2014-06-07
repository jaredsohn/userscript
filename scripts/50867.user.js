// ==UserScript==
// @name           playspymaster auto repeat tasks
// @namespace      ftrx.jp
// @include        http://playspymaster.com/tasks
// ==/UserScript==

(function(){
    
    if( !document.getElementById('repeat-task-button') ){
        return;
    }
    
    var timer_id = setInterval( exec_task, 60000 );
    
    function xpath(query) { // http://yamanoue.sakura.ne.jp/blog/coding/68
        var results = document.evaluate(query, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var nodes = new Array();
        for(var i=0; i<results.snapshotLength; i++){
            nodes.push(results.snapshotItem(i));
        }
        return nodes;
    }
    
    function exec_task(){
        var current_energy = xpath('id("mini-dashboard-energy")/span');
            current_energy = current_energy[1].innerHTML;
        var max_energy = xpath('id("current-energy-item")/span');
            max_energy = max_energy[1].innerHTML.substring(2);
        if( ( Number(max_energy) - Number(current_energy) ) < 50 ){
            if( document.getElementById('repeat-task-button') ){
                unsafeWindow.$('#repeat-task-button').click();
            }
        }
    }
})();