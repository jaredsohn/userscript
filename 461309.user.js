// ==UserScript==
// @name PageNote 网页笔记
// @version v1.3
// @description 在你感兴趣的网页上添加便笺或笔记 按 shift+鼠标左键 添加笔记
// @author Wang Hsin-che 
// @include    	*
// @require	http://code.jquery.com/jquery-2.1.0.js
// @require     http://code.jquery.com/ui/1.10.4/jquery-ui.js
// @resource    myCSS http://page-note-wxz.googlecode.com/svn/mycss.css
// @copyright  2014,04,18 __By Wang Hsin-che   
//1、利用localStorage存储数据
//2、开辟notes根节点---每个site子节点----各个note
//3、初步功能：添加note
//
// ==/UserScript==
function cEle(e){
	e=document.createElement(e);
	return e;
}
function STOupdate(storage){

	localStorage.setItem('wxz-sto',JSON.stringify(storage));//update localStorage.mysto with storage

}
function STOget(){
	var sto={};
	sto=JSON.parse(localStorage.getItem('wxz-sto'));//import localStorage.mysto to stotage
	if(sto==null){sto={};}
	return sto;
}
function MyNote(x,y,text,keyName){
	this.keyName=keyName;
	this.x=x;
	this.y=y;
	this.text=text;
	this.noteDiv=cEle('div');
	this.noteDiv.head=this.noteDiv.appendChild(cEle('div'));
	this.noteDiv.content=this.noteDiv.appendChild(cEle('div'));
	this.noteDiv.head.noteTitle=this.noteDiv.head.appendChild(cEle('nobr'));
	this.noteDiv.head.closeButton=this.noteDiv.head.appendChild(cEle('nobr'));
	this.show(storage);
}
MyNote.prototype.addToStorage=function(storage){
	var path={},temp={};			//just call for add notes  not for update or delete
	temp.keyName=this.keyName;
	temp.x=this.x;
	temp.y=this.y;
	temp.text=this.text;
	path[temp.keyName]=temp;//save notes to path
	if(storage[location.pathname]==null){
		storage[location.pathname]=path;
	}
	else{
		$.extend(storage[location.pathname],path);
	}//save path to storage
};
MyNote.prototype.removeNoteFromStorage=function(storage){
	var path={};
	path=storage[location.pathname];
	if(path!=null){
		delete path[this.keyName];
		storage[location.pathname]=path;//update the localStorage.pathname
	}
};
MyNote.prototype.show=function(storage){
	var tempTime=new Date(parseInt(this.keyName,10)),note=this;
	$('body:first').append(note.noteDiv);
	note.noteDiv.className='wxz-noteDiv';
	note.noteDiv.style.position='absolute';
	note.noteDiv.style.left=this.x+'px';
	note.noteDiv.style.top=this.y+'px';
	note.noteDiv.style.width='200px';
	$(note.noteDiv).draggable({ handle: note.noteDiv.head,addClasses: false,stop: function( event, ui ) {note.save(storage);}});//make it draggable and save when drag stop
		note.noteDiv.head.className='wxz-noteDiv-head';
			note.noteDiv.head.noteTitle.className='wxz-noteDiv-head-title';
			note.noteDiv.head.noteTitle.innerHTML=tempTime.toDateString();
			note.noteDiv.head.closeButton.className='wxz-noteDiv-head-close';
			note.noteDiv.head.closeButton.innerHTML='x';
			$(note.noteDiv.head.closeButton).click(function(){note.close(storage);});//listen the click event
		note.noteDiv.content.className='wxz-noteDiv-content';
		note.noteDiv.content.innerHTML=note.text;
		note.noteDiv.content.contentEditable=true;
		$(note.noteDiv.content).blur(function(){note.save(storage);});//save when it lost focus
    
};
MyNote.prototype.upDate=function(){
	this.x=$(this.noteDiv).offset().left;
	this.y=$(this.noteDiv).offset().top;
	this.text=this.noteDiv.content.innerHTML;
};
MyNote.prototype.close=function(storage){
	if(confirm("Do you like to delete the note？")){
		$(this.noteDiv).remove();
		this.del(storage);
	}
};
MyNote.prototype.save=function(storage){
	this.upDate();
	this.addToStorage(storage);
	STOupdate(storage);
};
MyNote.prototype.del=function(storage){
	this.removeNoteFromStorage(storage);
	STOupdate(storage);
};

function loadNotes(storage){
	if(storage[location.pathname]!=null){
		var node=storage[location.pathname],e,key;
		for(key in node){
			e=node[key];
			var note=new MyNote(e.x,e.y,e.text,e.keyName);
              console.log('ooo');
              list.push(note);

		}
	}
}
function closeNotes(){
	$("wxz-noteDiv").css({
					'display':'none'
					});
}
function showNotes(){
	$("wxz-noteDiv").css({
					'display':'inline'
					});
}

var storage=STOget();
var list=[];
loadNotes(storage);
$("body").mousedown(function(e){ 
	if(e.shiftKey){
		var x,y,keyName;
		x=e.pageX;
		y=e.pageY;
		keyName=e.timeStamp;
		var note =new MyNote(x,y,'',keyName);
        console.log('ooo');
        list.push(note);
	}
});


var mycssText=GM_getResourceText("myCSS");
var style =cEle('style');
style.type='text/css';
style.id='oo';
style.innerHTML=mycssText;
$('head:first').append(style);

GM_registerMenuCommand("显示全部笔记...",showNotes , "s"); 
GM_registerMenuCommand("关闭笔记...",closeNotes , "c");