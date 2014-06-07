// ==UserScript==
// @name           EasyTag
// @namespace		 http://realillusions.deviantart.com
// @description    Simplifies the editing of questions with !triviamgr by =realillusions
// @include        http://chat.deviantart.com/chat/*
// @require			 http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==


///TODO
///FIND OUT WHAT DOESNT WORK FOR OTHER PEOPLE AND THEN MAKE IT WORK!!!!



unsafeWindow.ET$ = $;
ET = document.createElement('script');
ET.id = "EasyTag"
ET.appendChild(document.createTextNode((<r><![CDATA[
//]

var EasyTag = {

user: window.deviantART.deviant.username.toUpperCase(),
html: null,
IDs: null,
tagging: false,
questions: {},

styles: 'div.modal,div.modal div{border:0 solid #93A79C;-moz-border-radius:12px;}'
		 +'.tagheader{background-color: #D9E2DE;padding:5px 0;text-align:center;font-family:Trebuchet MS;color:#454B4A;'
		 				+'font-size:16px;font-weight:bold;border-bottom:1px solid #93A79C!important;}'
		 +'.answerinput{margin-bottom:2px!important;width:97%!important;}'
		 +'li.working{font-size:14px;font-weight:bold;}'
		 +'img.extrashadow{position:absolute!important;top:-18px;z-index:-1}'
		 +'img.taglist{left:-20px;}'
		 +'img.taghistory{right:-20px}'
		 +'#tagbox{width:500px;}'
		 +'#tagbox #tagboxheader{background-color: transparent; color:#768176; font-family: Trebuchet MS;letter-spacing:-1px;'
		 				+'font-size:24px; font-weight:bold; text-align:center;padding:10px 0;margin:0 10px;}'
		 +'#tagbox #tagstats{text-align:center;font-size:11px;margin-bottom:10px;}'
		 +'#tagreason{height:50px;}'
		 +'#tagbox #tagcontent{height:100%;margin-bottom:15px;padding:5px 10px 10px;background-color:#BAC5BA;'
		 				+'border:1px solid #93A79C;-moz-border-radius:0;font-size:10px;}'
		 +'#tagcontent img[src^=data]{margin:3px 3px 0 -5px;float:left;cursor:pointer;}'
		 +'#tagbox input[type=text],textarea{display:block;width:100%;-moz-border-radius:8px;'
		 				+'background-color:#DCE2DC;border:1px solid #7D877D;padding:1px;'
		 				+'font-family:courier new, monospace;font-size:12px;margin-bottom:15px;}'
		 +'#tagtagger{text-align:right;font-style:italic;opacity:.7;display:block;position:relative;top:-15px;}'
		 +'#tagbox #tagbuttoncontainer{text-align:center;margin-top:7px;}'
		 +'#tagbuttoncontainer input{background-color:#DCE2DC;border:1px solid #7D877D;-moz-border-radius:8px;font-family:Verdana;font-size:10px;}'
		 +'#tagbuttoncontainer input:hover{cursor:pointer;background-color:#D3DDD3}'
		 +'#taglist,#taghistory{position:absolute;background-color:#BAC5BA;width:200px;height:353px;border:solid #93A79C;text-align:center;}'
		 +'#taglist{left:-202px;-moz-border-radius:12px 0 0 12px;border-width:2px 0 2px 2px}'
		 +'#taglistheader{-moz-border-radius:12px 0 0 0}'
		 +'#taglist ul{list-style-type:none;margin:10px 0 0;padding:0;font-size:11px;font-family:Verdana}'
		 +'#taglist li:hover{color:#7BA095!important;cursor:pointer}'
		 +'#taghistory{right:-202px;-moz-border-radius:0 12px 12px 0;border-width:2px 2px 2px 0}'
		 +'#taghistoryheader{-moz-border-radius:0 12px 0 0}'
		 +'#taghistory ul{list-style:none;text-align:left;font-size:11px;margin:0 0 0 33px;padding:9px 0 0 1px;border-left:1px dashed #2C3635}'
		 +'#taghistory ul li{margin-bottom:17px;}'
		 +'#taghistory ul li:before{content:"---"}'
		 +'#taghistory ul li ul{margin-left:22px;padding:0 0 0 4px;border:0;}'
		 +'#taghistory ul li ul li{margin-bottom:0;border-left:1px dashed #2C3635;}'
		 +'#taghistory ul li ul li:before{content:"----"}'
		 +'#taghistory ul li:last-child,#taghistory ul li ul li:last-child{height:9px;}'
		 

//MOVE THIS BACK		 
,xbutton: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHHwUUFp8O3HEAAAElSURBVCjPfZDLasJgEEaPf4yauE5FNFatUPoGbsSNdmGhFPqohV5sNyKFPoNKFolCQNcalX/ShRgvtJ7VwJxhvplU/7sfA2gRYhEmfsAxjYpLSikMpQBIA2y2W8L5gmUUcc7ED7ByWYqOQ8Y0UVrkX3nPKloTzhdorVGxSCI/dR7otTqJ2Gt1eL5/BGAZRWgR0seZN+s1NbdKt9lGi1Bzq/izQ98Lprsb9rwOv+g229xc1wEYeWM+fwYn8dR5Xi3yZ73nZEOv1aHmVhl5Y7QId41b8pbNy+DjMNCouMnvLcvGnwVJjLxlY9l2ItfdMqm34Xs8DUNW0ZpLWLkspUIBZShF0XGwc7mLctFxSBvG7oaMaVIqXKFF8ILpiVx3yyilSBsGAL/513grJEK8UQAAAABJRU5ErkJggg==', 


tagWindow: '<div id="tagbox"><div id="tagboxheader">YEAH MAN! LET\'S UNTAG SHIT!</div>'
			  +'<div id="taglist"><img class="modal-shadow extrashadow taglist" src="http://sh.deviantart.net/shadow/alpha-000000/10.6667-0.7/200/358/null.png"/>'
			  +'<div id="taglistheader" class="tagheader">Questions List</div>'
			  +'<ul/></div>'
			  +'<div id="taghistory"><img class="modal-shadow extrashadow taghistory" src="http://sh.deviantart.net/shadow/alpha-000000/10.6667-0.7/200/358/null.png"/>'
			  +'<div id="taghistoryheader" class="tagheader">Changes</div>'
			  +'</div>'
			  +'<div id="tagcontent"><div id="tagstats"><b>Current Question: <span id="tagqid">N/A</span></b> (<b>Hits:</b> <span id="taghits">0</span> | <b>Misses:</b> <span id="tagmisses">0</span>)</div>'
			  +'<div id="tagreason">Reason for tag: none.</div>'
			  +'Question:<textarea rows=5 id="tagqn"></textarea>'
			  +'<span id="tagtagger">Tagged by: no one</span>'			
			  +'Category:<input type=text id="tagcat" />'
			  +'Additional Note:<input type=text id="tagnote" />'
			  +'Answers:<img src="BUTTON!"/><input type=text id="taganswer0" class="answerinput" /><img src="BUTTON!"/><input type=text id="taganswer1" class="answerinput" />'
			  +'<img src="BUTTON!"/><input type=text id="taganswer2" class="answerinput" /><img src="BUTTON!"/><input type=text id="taganswer3" class="answerinput" />'
			  +'<img src="BUTTON!"/><input type=text id="taganswer4" class="answerinput" />'
			  +'<div id="tagbuttoncontainer"><input type="button" value="Untag" onclick="javascript:EasyTag.untag(EasyTag.current)"/> <input type="button" value="Skip" onclick="javascript:EasyTag.skip(EasyTag.current)"/></div>'
			  +'</div></div>'/*</#tagcontent></#tagbox>*/

//THIS ONE TOO
,start: function(){	this.tagging=true;
							if(!dAmnChats['chat:Blackhole']){dAmn_Join("chat:Blackhole");setTimeout('EasyTag.start()',1000);}
							else{dAmnChatTabs_activate("chat:Blackhole")
							//wtf
							this.tagWindow=this.tagWindow.replace(/MAN!/,this.user+"!").replace(/BUTTON!/g,this.xbutton)
							this.createWindow(this.tagWindow);
							this.sendCmd('tagged');
							this.bindListeners();
							document.getElementById('tagbox').previousSibling.setAttribute('onclick','return false')
 							}
						},//start()
						  
init: function(){this.addStyles();
					  this.inject();
					  },//init();
					  
prepQns: function(){if(!this.regex.safe.exec(this.html)){
							this.IDs = this.regex.list.exec(this.html).toString().replace(this.regex.strip,"").split(" ");
							this.addQuestion(this.IDs);
							}
						},//prepQns()
						
plugData: function(e){ET$('#tagqid').html('#'+e.qid);
							 ET$('#taghits').html(e.hits);
							 ET$('#tagmisses').html(e.misses);
							 ET$('#tagreason').html('Reason for tag: '+e.reason)
				  			 ET$('#tagqn').val(e.changes.qn ? e.changes.qn : e.qn);
							 ET$('#tagtagger').html('Tagged by: '+e.tagger);
							 ET$('#tagcat').val(e.changes.cat ? e.changes.cat : e.cat);
							 ET$('#tagnote').val(e.changes.note ? e.changes.note : e.note)
							 for(i=0,j=e.answer.length;i<j;i++){
							 		ET$('.answerinput')[i].value=e.changes.answer[i]?e.changes.answer[i]:e.answer[i]
							 		}
							 },

//Potentially the ugliest thing in this entire script.
//Sorry.
//NOTE: live() bound events require returning false in order
//to stop propagation due to altered bubbling chain introduced by jQuery 
bindListeners: function(){
									ET$('a.x').live('click',function(e){
													if(ET$('ul.top *').length > 0 && 
													!window.confirm('There are still unprocessed changes. Are you sure you\'re done?')){
														return false}																
													else{EasyTag.tagging=false;Modals.pop("cancel");return false}
																});
								  ET$('#taglist ul li').live('click',function(e){EasyTag.activate(this.textContent.substring(1));return false});
								  ET$('#tagcontent img[src^=data]').bind('click',function(e){alert("This doesn't work yet. Sorry.")});
								  ET$('#tagcontent input,#tagcontent textarea').bind('change',function(){
								  		if(this.className=="answerinput"){
								  			if(this.value!=EasyTag.questions['_'+EasyTag.current].answer[this.id.substring(9)])
								  			EasyTag.addChange(EasyTag.current,this.id.substring(3,10),this.value)
								  			}
								  		else{
								  			if(this.value!=EasyTag.questions['_'+EasyTag.current][this.id.substring(3)]){
								  				EasyTag.addChange(EasyTag.current,this.id.substring(3),this.value)}
								  			
								  		  }
								  		});
					  			 },//bindListeners()
					  			 
createWindow: function(x){Modals.push(Tree.createFragment(x,true));
						  		  },//createbox()
					  
addStyles: function(){ET$('head').append('<style>'+this.styles+'</style>')
						 	},//addStyles()

inject: function(){var aku = [];
						 dAmnChatInput.prototype.onKey_ET = dAmnChatInput.prototype.onKey
						 dAmnChatInput.prototype.onKey = function (e,kc,force) {
							noclear="";
							 var el = this.chatinput_el;
							 if( kc == 13 && ( force || !this.multiline || e.shiftKey || e.ctrlKey ) ) {
						 		if( el.value ) {
									if(!e.shiftKey && (this.multiline || !e.ctrlKey) ) {
										var didsmth=false;
										var cmdre = el.value.match( /^\/([a-z]+)([\s\S]*)/m );
										if(cmdre) {
											var cmd  = cmdre[1].toLowerCase();
											}										
										if(this.cmds[cmd]) {
											if(cmd=='tagged'){												EasyTag.start();
												didsmth=true;	
												}
											if(didsmth){
      	 		 							if( this.history_pos != -1  && this.history[this.history_pos] == el.value ){//History posting, moving to end
         										var before = this.history.slice(0,this.history_pos);
         										var after  = this.history.slice(this.history_pos+1);
         										this.history = before.concat(after).concat( this.history[this.history_pos] );
         										}
        										else{ // add to history -- limit to 300
         									this.history = this.history.concat( el.value );
         									if( this.history.length > 300 )
													this.history = this.history.slice(1);
         										}
	        										this.history_pos = -1;
   	     										el.value='';
      	  										if(noclear!=""){el.value=noclear;}
        											el.focus();
        											return false;
        											}
       										}
	  										}
	  									}
									}								rv = this.onKey_ET.apply(this,arguments);
								return rv;
								}
						dAmnChanChat.prototype.onMsg_ET = dAmnChanChat.prototype.onMsg;
						dAmnChanChat.prototype.onMsg = function(from,body){
							if(EasyTag.tagging!=true){this.onMsg_ET.apply(this,arguments);}
							else{
								EasyTag.clear();
								this.onMsg_ET.apply(this,arguments);
								EasyTag.updateHTML();
									if(EasyTag.regex.list.exec(EasyTag.html)){
									EasyTag.prepQns();
									EasyTag.activate(EasyTag.IDs[0]);
									}
									if(EasyTag.regex.qnloaded.exec(EasyTag.html)){
									EasyTag.buildQn(EasyTag.current);
									EasyTag.plugData(EasyTag.questions['_'+EasyTag.current])
									}
								}							
						}
						
						dAmnChanChat.prototype.Init_ET = dAmnChanChat.prototype.Init;
						dAmnChanChat.prototype.Init = function(cr,name,parent_el) {
							this.Init_ET.apply(this,arguments);
							this.input.cmds['tagged']=[0,''];
							}

						dAmn_objForEach(dAmnChats,function(chan){		
							main=chan.channels.main;
							main.onMsg_ET = dAmnChanChat.prototype.onMsg_ET;
							main.onMsg = dAmnChanChat.prototype.onMsg
							main.input.cmds['tagged']=[0,''];
							main.input.onKey = dAmnChatInput.prototype.onKey
							main.input.onKey_ET = dAmnChatInput.prototype.onKey_ET
							});

						document.onkeydown = function(event) {
							k = event.which;
							n = event.target.nodeName;
							if ((k==8||k==191||k==192)&&(n=="HTML"||n=="html")) {event.preventDefault();return false;}
							else {return true;}
							}	
},//inject()

//Mostly helper stuff and question constructors
updateHTML: function(){this.html = dAmnChats['chat:Blackhole'].channels.main.chat_el.innerHTML.toString();
								 },//updateHTML()
clear: function(){dAmnChats['chat:Blackhole'].channels.main.Clear()
								 },//clear()
sendCmd: function(x){this.clear();
							dAmnChats['chat:Blackhole'].Send('msg','main','!triviamgr '+x)
								 },//sendCmd()
addQuestion: function(x){if(x.constructor==Array){
									for(i=0,j=x.length;i<j;i++){
										this.addQuestion(x[i]);
										}
								 }
								 else{
									ET$('#taglist ul').append('<li>#'+x+'</li>')
								 }
								 },//addQuestion()
								 
addChange: function(e,f,g){ 
									if(ET$('#taghistory ul.top').length <1){ET$('#taghistory').append('<ul class="top"/>')}
									if(ET$('#taghistory ul.top #'+e).length <1){
										ET$('#taghistory ul.top').append('<li id="'+e+'">#'+e+'<ul/></li>')
										}
									if(ET$('#taghistory ul.top #'+e+' ul .'+f.substring(0,6)).length < 1){
										ET$('#taghistory ul.top #'+e+' ul').append('<li class="'+f.substring(0,6)+'">'+EasyTag.trans[f.substring(0,6)]+'</li>')
										}
									if(f.length==7){
									this.questions['_'+e].changes.answer[f.substring(6)]=g
									}else{
									this.questions['_'+e].changes[f]=g}

							},//addChange()

pushChanges: function(e) { var h = this.questions['_'+e]
									for(i in h.changes){
										if(h.changes[i]!= null && h.changes[i] != h[i]){
											if(i=="answer"){
												for(j=0,k=h.changes.answer.length;j<k;j++){
													if(h.changes.answer[j] && h.changes.answer[j]!=h.answer[j]){
														if(h.answer[j].length>0){this.sendCmd('delans '+e+' '+h.answer[j])}
														this.sendCmd('addans '+e+' '+h.changes.answer[j])													
													}											
												}
											}
											else{this.sendCmd('upd'+i+' '+e+' '+h.changes[i])
											}
										}
									}
									this.sendCmd('untag '+e)
									if(ET$('#taghistory ul.top #'+e).length >= 1){ET$('#taghistory ul.top #'+e).remove()}
									if(ET$('#taghistory ul.top *').length == 0){ET$('#taghistory ul.top').remove()}
									},//pushChanges()

activate: function(e){this.current=parseInt(e).toString();
							 ET$('#taglist li.working').removeClass('working');
							 ET$('#taglist li:contains("'+e+'")').addClass('working');
							 this.sendCmd('viewqn '+this.current);
									},//activate()
									
skip: function(e){   var qi = e?e:this.qid;
							qi = EasyTag.IDs.indexOf(qi);
							if(qi==EasyTag.IDs.length-1){EasyTag.activate(EasyTag.IDs[0])
									}
							else{
								EasyTag.activate(EasyTag.IDs[qi+1])
								}
				},//skip();
				
untag: function(e){ this.pushChanges(e)
						  ET$('#taglist ul li:contains(#'+e+')').remove();
						  this.skip(e)
						  this.IDs.splice(this.IDs.indexOf(e),1)
						  delete this.questions['_'+e]
		 },//untag()
											 
regex: {
			safe: /No tagged questions\.\./,
			list: /&lt;&lt;.*&gt;&gt;/,
			strip: /[^\d\s]/g,
			qnloaded: /Point Right/,
			qn: /\<\/strong\>\] \<strong\>(.*?)\<\/strong\>/,
			ans: /\<strong\>\[\<\/strong\>(.*?)\<strong\>\]/g,
			note: /note:\<\/strong\> \[(.*?)\]/,
			cat: /Category\:\<\/strong\> ?(?:<span>)? ?(.*?) \|/,
			tagger: /Tagged by\: (.*?)[>)]/,
			reason: /Reason:\<\/strong\>(.*)[)>]/,
			hits: /Hits\:\<\/strong\> (\d{1,})/,
			misses: /Misses\:\<\/strong\> ?(\d{1,})/
		},//regex
		
trans: {
			answer: "Answers",
			qn: "Question",
			note: "Add. Note",
			cat: "Category"
			},
			
			
buildQn: function(z){
					if(this.questions['_'+z])return;
					var A,B,C,D,E,F;
					A= this.html.match(this.regex.qn)[0].replace(this.regex.qn,'$1').replace(/(<([^>]+)>)/ig,"");
					B= this.html.match(this.regex.ans)
						for(i=0,j=B.length;i<j;i++){
							B[i]=B[i].replace(this.regex.ans,'$1')
							}
					C= this.html.match(this.regex.note)[0].replace(this.regex.note,'$1').replace(/(<([^>]+)>)/ig,"")
					D= this.html.match(this.regex.cat)[0].replace(this.regex.cat,'$1').replace(/(<([^>]+)>)/ig,"");
					E= this.html.match(this.regex.tagger)[0].replace(this.regex.tagger,'$1')
					F= this.html.match(this.regex.reason)[0].replace(this.regex.reason,'$1')
					G= this.html.match(this.regex.hits)[0].replace(this.regex.hits,'$1')
					H= this.html.match(this.regex.misses)[0].replace(this.regex.misses,'$1')
					I= {qn:null,answer:[],cat:null,note:null}
					this.questions['_'+z] = new this.qnConst(z,A,B,C,D,E,F,G,H,I);
					},//buildQn()
					
qnConst: function(qid,qn,ans,note,cat,tagger,reason,hits,misses,changes){
					this.qid= qid;
					this.qn= qn;
					this.answer= ans;
					this.note= note;
					this.cat= cat;
					this.tagger=tagger;
					this.reason=reason;
					this.hits=hits;
					this.misses=misses;
					this.skip=EasyTag.skip;
					this.changes=changes;
					this.untag=EasyTag.untag;
						}//qnConst()
}//EasyTag{}	
EasyTag.init();

]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(ET)