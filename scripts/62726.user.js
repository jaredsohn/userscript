// ==UserScript==
// @name           RTM Sticky Notes
// @namespace      http://blog.endflow.net/
// @description    Adds a sticky panel for showing notes.
// @include        http://www.rememberthemilk.com/home/kuy/#section.tasks
// ==/UserScript==
// @author         Yuki KODAMA (twitter: kuy, skype: netkuy)
// @version        0.1.0
// @history        [2009-11-24] 0.1.0 first version

(function(){

// setup UI
GM_addStyle(<><![CDATA[
#stickynotes {
    margin-top: 13px;
    padding-top: 13px;
    border: 1px solid #CACACA;
    display: none;
}
#stickynotes > div {
    color: #575757;
    background-color: white;
    line-height: 1.45em;
    padding: 0 14px 13px;
}
]]></>);

var cont = document.createElement('div');
cont.id = 'stickynotes';
document.getElementById('detailsbox').appendChild(cont);

// subscribe 'hoverOn' message
with(this.unsafeWindow){
    messageBus.subscribe(function(obj, taskId){
        if(noteMgr.index == null)
            noteMgr.prepareIndex();
        var seriesId = taskList.list.hashMap[taskId].series_id;
        var noteIndices = noteMgr.index[seriesId];
        if(typeof noteIndices == 'undefined'){
            cont.style.display = 'none';
            return;
        }
        var notes = '';
        for(var i = 0; i < noteIndices.length; i++){
            var note = stateMgr.notes[noteIndices[i]].content;
            if(note)
                notes += '<div>' + note + '</div>';
        }
        cont.innerHTML = notes;
        cont.style.display = 'block';
    }, taskList.list.getUniqueMessageBusName() + 'hoverOn');
}

function $x(x,c){c=c||document;var d=c.ownerDocument||c;
var r=d.evaluate(x,c,null,4,null);for(var i,n=[];i=r.iterateNext();n.push(i)); return n}
})();
