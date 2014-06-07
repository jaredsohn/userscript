// ==UserScript==
// @name       TFS Task Board Enhancements
// @version    0.11
// @description  Adds dynamic colouring to tfs tasks
// @include    http://*/tfs/*/TaskBoard*
// ==/UserScript==

//<div class="tbTile ui-draggable propagate-keydown-event" id="tile-998" tabindex="0">
//    <div class="tbTileContent" style="background-color: rgb(246, 245, 210); border-left-color: rgb(242, 203, 29);">
//        <div class="witTitle ellipsis clickableTitle">Augment existing process diagram for file name error handling</div>
//        <div class="witExtra">
//            <div class="onTileEditDiv non-combo-behavior witRemainingWork">
//                <div class="onTileEditTextDiv ellipsis" title=""></div>
//            </div>
//            <div class="onTileEditDiv non-combo-behavior witAssignedTo ellipsis">
//                <div class="onTileEditTextDiv ellipsis" title=""></div>
//            </div>
//        </div>
//    </div>
//</div>

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.witTypeTest .tbTileContent { border-left-color: blue !important; }');
addGlobalStyle('.witTypeAnalysis .tbTileContent { border-left-color: yellow !important; }');
addGlobalStyle('.witTypeDevelopment .tbTileContent { border-left-color: green !important; }');
addGlobalStyle('.witTypeBug .tbTileContent { border-left-color: red !important; }');

addGlobalStyle('.witMyWork { background: green; }');

addGlobalStyle('.taskFilters a { font-weight: bold; border: 1px solid black; color: black; margin-left:2em; padding: .1em; }');
addGlobalStyle('.taskFilters a.Development { background: green; }');
addGlobalStyle('.taskFilters a.Analysis { background: yellow; }');
addGlobalStyle('.taskFilters a.Testing { background: blue; }');
addGlobalStyle('.taskFilters a.off { background: none; }');

addGlobalStyle('.taskboard-cell[axis=taskboard-table_s2] .tbTile { background:red !important; }');
addGlobalStyle('.taskboard-cell[axis=taskboard-table_s2] .tbTileContent { background:#FFE5CC !important; }');

function updateTasks() {
    var tfsContext = $.parseJSON($('.tfs-context').text())
    
    var $taskFilters = $('.taskFilters');
    
    if ($taskFilters.length === 0)
    {
        $taskFilters = $('<span class="taskFilters" />');
     	$('.hub-title').append($taskFilters);
        
        $('.hub-title').append(
            $('<a />')
            .text('Refresh')
            .click(updateTasks)
        );
    }
    
    $taskFilters.empty();
    
    var filterTasks = function() {
            var taskType = $(this).data('taskType');
        	$(this).toggleClass('off');
        	$('.' + taskType).not('.witMyWork').toggle();
    	};
        
    $taskFilters.append($('<a />')
    	.addClass('Development')
    	.data('taskType', 'witTypeDevelopment')
    	.append('Development')
    	.click(filterTasks));  
    
    $taskFilters.append($('<a />')
    	.addClass('Analysis')
    	.data('taskType', 'witTypeAnalysis')
    	.append('Analysis')
    	.click(filterTasks))
    	
    $taskFilters.append($('<a />')
    	.addClass('Testing')
    	.data('taskType', 'witTypeTest')
    	.append('Testing')
    	.click(filterTasks));
    	
        
    var devWorkRemaining = 0;
    var analysisWorkRemaining = 0;
    var testingWorkRemaining = 0;
    
   $(".tbTile").each(function() {
       var $this = $(this);
       var $title = $('.witTitle', this);
       var $content = $('.tbTileContent', this);
       
       var titleText = $title.text();
       var assignedTo = $('.witAssignedTo', this).text();
       var workRemaining = $('.witRemainingWork', this).text() * 1;
              
       if(titleText.indexOf('TEST - ') > 0
       || titleText.indexOf('TEST-') > 0
       || titleText.indexOf('[T]') > 0) {
           $this.addClass('witTypeTest');
           testingWorkRemaining += workRemaining;
       } else if(titleText.indexOf('ANALYSIS - ') > 0
              || titleText.indexOf('ANALYSIS-') > 0
              || titleText.indexOf('[A]') > 0) {
           $this.addClass('witTypeAnalysis');
           analysisWorkRemaining += workRemaining;
       } else if(titleText.indexOf('BUG - ') > 0
              || titleText.indexOf('BUG-') > 0) {
           $this.addClass('witTypeDevelopment')
           		.addClass('witTypeBug');
           analysisWorkRemaining += workRemaining;
       } else {
           $this.addClass('witTypeDevelopment');
           devWorkRemaining += workRemaining;
       }
           
       if (assignedTo == tfsContext.currentUser) {
           $this.addClass('witMyWork');
       }
   });
    
   $('a.Development').append(' [' + devWorkRemaining + ']');
   $('a.Analysis').append(' [' + analysisWorkRemaining + ']');
   $('a.Testing').append(' [' + testingWorkRemaining + ']');
};

window.setTimeout(updateTasks, 1000);

window.setTimeout(function() {    
   $('a.Testing, a.Analysis').click();
}, 1001);