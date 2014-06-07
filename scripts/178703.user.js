// ==UserScript==
// @name           RTM notes
// @version    0.1
// @description  Add notes to Task Tab
// @match      https://www.rememberthemilk.com/*
// @require http://code.jquery.com/jquery-latest.min.js 
// @copyright  2013+, gellu
// ==/UserScript==

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

function RTMNoteAdd(taskId) {
    if(noteMgr.index == null)
        noteMgr.prepareIndex();
    var seriesId = taskList.list.hashMap[taskId].series_id;
    var noteIndices = noteMgr.index[seriesId];
    if(typeof noteIndices == 'undefined'){
            $('#stickynotes').hide();
        return;
    }
    var notes = '';
    for(var i = 0; i < noteIndices.length; i++){
        var noteBody = stateMgr.notes[noteIndices[i]].content;
        var noteTitle = stateMgr.notes[noteIndices[i]].title;
        if(noteBody) {
            notes += '<div>';
            if(noteTitle) {
                notes += '<span>' + noteTitle + '</span><br />';
            }
            notes += linkify(noteBody.replace(/\n/g, '<br />'));
            notes += '</div>';
        }
        
    }
    
    $('#stickynotes').html(notes).show();
}


function RTMStickyNotes() {
        
    GM_addStyle(" #stickynotes { font-size: 10px; margin-top: 10px; display: none; } #stickynotes > div { color: #575757; line-height: 1.45em; padding: 10px 0; word-wrap: break-word; border-top: 1px solid #CACACA; } #stickynotes > div > span { font-weight: bold; color: #0060BF; } ");
   
    $("#detailscontent").append('<div id="stickynotes"></div>');
    
    var selectedTaskId;
    with(this.unsafeWindow){
        
        messageBus.subscribe(function(obj, taskId){
			RTMNoteAdd(taskId);
        }, taskList.list.getUniqueMessageBusName() + 'hoverOn');
        
        messageBus.subscribe(function(obj, taskId){
            if(selectedTaskId) {
            	RTMNoteAdd(selectedTaskId);
            }
        }, taskList.list.getUniqueMessageBusName() + 'hoverOff');
        
        messageBus.subscribe(function(obj){
			selectedTaskId = null;
            if(obj.selected.length == 1) {
                selectedTaskId = obj.reverseMap[obj.selected[0]];
            	RTMNoteAdd(selectedTaskId);
            }
            $('#detailsstatuswrap').hide();
        }, taskList.list.getUniqueMessageBusName() + 'selectFinished');
        
        messageBus.subscribe(function(obj){
            $('#stickynotes').show();           
            if(obj.selected == 1) {
            	$('#stickynotes').hide();           
            }
        }, taskTabs.getUniqueMessageBusName() + 'tabChanged');
        
        
    }
    
    function $x(x,c){c=c||document;var d=c.ownerDocument||c;
    var r=d.evaluate(x,c,null,4,null);for(var i,n=[];i=r.iterateNext();n.push(i)); return n}
}

setTimeout(RTMStickyNotes, 2000);
