// ==UserScript==
// @name           4chan sounds
// @namespace      http://userscripts.org/users/33432
// @description    Allows to post sounds in 4chan's boards.
// @include        http://zip.4chan.org/*
// @include        http://boards.4chan.org/*
// ==/UserScript==

function addelem(owner,kind,func){
	var elem=document.createElement(kind);
	
	if(func) func(elem);
	
	owner.appendChild(elem);
	
	return elem;
}

function foreach(l,f){
	for(var i in l){
		f(l[i],i);
	}
}

function $$(owner,kind,a,func){
	var elem;
	
	if(kind=='text'){
		elem=document.createTextNode(a);
		a='';
	} else{
		elem=document.createElement(kind);
	}
	
	if(typeof(a)!='function') elem.className=a;
	else func=a;
	
	if(func) func(elem);
	
	owner.appendChild(elem);
	
	return elem;
}

var settings={
	showPlayerWindows:	[1,		'bool',		'Display player windows',				],
	expandImages:		[0,		'bool',		'Expand images when playing sounds',	],
	showLinksList:		[0,		'bool',		'Show list of clickable audio links',	],
	customCss:			["",	'textarea',	'Custom CSS',							function(v){GM_addStyle(v)}],
};

function changeSetting(key,value){
	var setting=settings[key];
	if(!setting) return;
	
	if(setting[0]==value) return;
	
	setting[0]=value;
	
	if(setting[3]) setting[3](value);
	
	GM_setValue(key,value);
	return value;
}

foreach(settings,function(setting,key){
	changeSetting(key,GM_getValue(key,setting[0]));
});

GM_registerMenuCommand("4chan sounds settings",function(){
	$$(document.body,'div','ys_settingsContainer reply',function(div){
		div.style.position='fixed';
		div.style.right='1em';
		div.style.bottom='1em';
		div.style.padding='0.6em';
		
		$$(div,'table','ys_settingsTable',function(table){
			table.style.marginBottom='0.6em';
			table.style.borderSpacing='1px';
			
			foreach(settings,function(setting,key){
				$$(table,'tr','ys_settingsTr',function(tr){
					$$(tr,'td','ys_settingsCaptionTd postblock',function(td){
						td.textContent=setting[2];
						td.style.width='18em';
					});
					
					$$(tr,'td','ys_settingsValueTd',function(td){
						if(setting[1]=='textarea')
						$$(td,'textarea','ys_settingsTextarea inputtext',function(textarea){
							textarea.rows=12;
							textarea.cols=64;
							textarea.value=setting[0];
							
							textarea.addEventListener('keyup',function(e){
								changeSetting(key,textarea.value);
							},false);
						});
						else if(setting[1]=='bool')
						$$(td,'span','ys_settingsBoolarea inputtext',function(span){
							$$(span,'input',"ys_settingsCheckbox",function(b){
								b.type="checkbox";
								
								b.checked=setting[0];
								b.addEventListener('change',function(e){
									changeSetting(key,b.checked);
								},false);
							});
						});
					});
				});
			});
		});
		
		$$(div,'input','ys_settingsButton ys_closeButton',function(button){
			button.value='Close';
			button.type='submit';
			
			button.addEventListener('click',function(e){
				document.body.removeChild(div);
			},false);
		});
	});
});

function utf8d(string) {
	var utftext="";

	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
}


function wwwget(link,callback,progress){
/*
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.overrideMimeType('text/plain; charset=x-user-defined');
	
	if(progress) progress(0,xmlhttp);
	
	if(progress){
		xmlhttp.onprogress=function(e){
			if(!e.lengthComputable) return;
			progress(e.loaded/e.total,xmlhttp);
		};
	}
	
	xmlhttp.onload=function(){
		if(progress) progress(1,xmlhttp);
		
		callback(xmlhttp.responseText,xmlhttp);
	};
	
	xmlhttp.open("GET",link,true);
	xmlhttp.send(null);
*/
	if(progress) progress(0);

	GM_xmlhttpRequest({
		method:"GET",
		url:link,
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload:function(details){
			if(progress) progress(1);
			
			if(details.status==200)
				callback(details.responseText);
			else
				callback(null);
		}
	});
}

var key="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function sweep64(code,input) {
	var output="";
	var i=0;
	
	code=utf8d(code);

LOOP:
	while(i<input.length){
		if(input.charAt(i++)!='[') continue;
		
		for(var j=0;j<code.length;j++)
			if((input.charCodeAt(i+j)&0xff) != code.charCodeAt(j)) continue LOOP;
		
		i+=code.length;
		
		if(input.charAt(i+0)!=']') continue;
		
		while(input.charAt(i+1)=='\n' || input.charAt(i+1)=='\r' || input.charAt(i+1)==' ')
			i++;
		
		if(input.charAt(i+1)!='O') continue;
		if(input.charAt(i+2)!='g') continue;
		if(input.charAt(i+3)!='g') continue;
		if(input.charAt(i+4)!='S') continue;
		if(input.charCodeAt(i+5)!=0x00) continue;
		if(input.charCodeAt(i+6)!=0x02) continue;
		
		break;
	}

	if(i==input.length) i=0;

	while(i<input.length){
		chr1 = input.charCodeAt(i++)&0xff;
		chr2 = input.charCodeAt(i++)&0xff;
		chr3 = input.charCodeAt(i++)&0xff;

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if(isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if(isNaN(chr3)) {
			enc4 = 64;
		}

		output+=key.charAt(enc1)+key.charAt(enc2)+key.charAt(enc3)+key.charAt(enc4);
   }
   
   return output;
}

function forelems(kind,func){var list=document.getElementsByTagName(kind);for(var i=0;i<list.length;i++) func(list[i]);}
function insertAfter(referenceNode,newNode){referenceNode.parentNode.insertBefore(newNode,referenceNode.nextSibling);}
function get(node,str){
	var list,elem,res=[];
	
	list=document.evaluate(str,node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(i=0;i<list.snapshotLength;i++)
		res.push(list.snapshotItem(i));

	return res;
}


var requests=[];
var loading=[];
var sounds=[];
var div;

function fixposts(node){
var no=0;
var posts=get(node,"descendant::blockquote");

for(i in posts){
	var p=posts[i];
	
	var a=p;
	while(a && (a.tagName!='A' || (!a.firstChild) || a.firstChild.tagName!='IMG'))
		a=a.previousSibling;
	
	if(!a || !a.firstChild || a.firstChild.tagName!='IMG')
		continue;
	
	for(j=0;j<p.childNodes.length;j++){
		var node=p.childNodes[j];
		
		if(node.nodeType!=3) continue;
		
		if(!(match=node.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) continue;
		
		
		(function(){
			var href=a.href;
			var code=match[2];
			var ident=href+','+no;
			var postno=p.parentNode.id;
			var img=a.children[0];
			
			node.nodeValue=match[1];
			
			var link=document.createElement('a');
			link.innerHTML='['+match[2]+']';
			link.className='ys_playAudioLink quotejs';
			link.href='#';
			link.id='ys_link'+(no++);
			
			link.addEventListener('click',function(e){
				e.preventDefault();
				
				function stopPlaying(ident){
					if(sounds[ident]){
						sounds[ident].sound.pause();
						div.removeChild(sounds[ident].elem);
						sounds[ident]=undefined;
					}
					if(requests[ident]){
						requests[ident].abort();
						requests[ident]=undefined;
					}
					loading[ident]=0;
					link.innerHTML='['+code+']';
				}
				
				if(loading[ident]){
					stopPlaying(ident);
					return;
				}
				
				loading[ident]=1;
				
				if(sounds[ident]){
					stopPlaying(ident);
					return;
				}
				
				wwwget(href,function(data){
					loading[ident]=0;
					var ref={};
					
					if(settings.expandImages[0]){
						img.src=href;
						img.removeAttribute('width');
						img.removeAttribute('height');
					}
					if(!div){
						div=document.createElement('div');
						div.style.position='fixed';
						div.style.left=0;
						div.style.bottom=0;
						document.body.appendChild(div);
					}
					
					var uri='data:audio/ogg;base64,'+sweep64(code,data);
					
					var audioElement=document.createElement('audio');
					audioElement.setAttribute('src',uri);
					ref.sound=audioElement;
					
					var div2=document.createElement('div');
					div2.style.cssFloat='left';
					div2.style.margin='0.2em';
					div2.style.padding='0.4em';
					div2.className='ys_playerContainer reply';
					
					$$(div2,'span','ys_playerTitleSpan',function(a){a.textContent=code;a.style.fontSize='1.3em';a.style.marginRight='1em'});
					$$(div2,'span','',function(a){
						a.style.cssFloat='right';
						
						a.appendChild(document.createTextNode('['));
						$$(a,'a','ys_playerShowSaveLink ys_playerSaveLink',function(b){
							b.textContent='show save link';
							b.href='#';
							
							var listener=function(e){
								e.preventDefault();
								b.removeEventListener('click',listener,false);
								
								b.className='ys_playerSaveLink';
								b.textContent='save';
								b.href=uri;
							};
							
							b.addEventListener('click',listener,false);
						});
						a.appendChild(document.createTextNode(' '));
						$$(a,'a','ys_playerCloseLink',function(b){
							b.textContent='close';
							b.href='#';
							
							b.addEventListener('click',function(e){
								e.preventDefault();
								
								stopPlaying(ident);
							},false);
						});
						a.appendChild(document.createTextNode(']'));
					});
					
					$$(div2,'br','ys_playerFirstBr');
					if(postno) addelem(div2,'span',function(b){
						b.innerHTML="<a class='quotelink' href='"+window.location.pathname+'#'+postno+"' onclick='replyhl(\""+postno+"\");'>&gt;&gt;"+postno+"</a>"
					});
					$$(div2,'input','ys_playerCloseWhenFinishedCheckbox',function(b){
						b.type="checkbox";
						b.checked=true;
						b.style.cssFloat='right';
						
						ref.closewhenfinished=b;
					});
					
					$$(div2,'span','ys_playerCloseWhenFinishedComment',function(b){b.style.fontSize="small";b.textContent='close when finished';b.style.cssFloat='right';});
					$$(div2,'br','ys_playerSecondBr',function(a){a.style.marginBottom='0.75em'});
					
					if(settings.showPlayerWindows[0]){
						ref.elem=div2;
						audioElement.controls='1';
						div2.appendChild(audioElement);
						div.appendChild(div2);
					} else{
						ref.elem=audioElement;
						div.appendChild(audioElement);
					}
					
					audioElement.addEventListener('ended',function(){
						if(sounds[ident] && sounds[ident].closewhenfinished.checked)
							stopPlaying(ident);
					},false);
					
					sounds[ident]=ref;
					
					audioElement.play();
				},function(v,xmlhttp){
					if(v==0){
						requests[ident]=xmlhttp;
						link.innerHTML="[ <em>Loading... </em> ]";
						link.className='ys_loadingAudioLink quotejs';
					} else if(v<1){
						link.innerHTML="[ <em>Loading... "+Math.floor(v*100)+'%</em> ]';
					} else if(v==1){
						requests[ident]=undefined;
						link.innerHTML='['+code+']';
						link.className='ys_playAudioLink quotejs';
					}
				});
			},true);

			insertAfter(node,link);
			
			var text=document.createTextNode(match[3]);
			insertAfter(link,text);
			
		})();
		
		j--;
	}
}

}

fixposts(document);
document.body.addEventListener("DOMNodeInserted",function(a){fixposts(a.relatedNode);},false);

if(settings.showLinksList[0]){
	var list=[];
	
	foreach(get(document.body,"//a"),function(a){
		if(a.id.match(/^ys_link/)) list.push(a);
	});
	
	if(list.length==0) return;

	$$(document.body,'div','ys_linksListContainer reply',function(div){
		div.style.position='fixed';
		div.style.right='1em';
		div.style.bottom='1em';
		div.style.padding='0.6em';
		
		foreach(list,function(a){
			$$(div,'a','ys_linksListContainerLink ys_playAudioLink quotejs',function(b){
				b.href=window.location.pathname+'#'+a.id;
				b.innerHTML=a.innerHTML;
			});
			$$(div,'br');
		});
	});
}



