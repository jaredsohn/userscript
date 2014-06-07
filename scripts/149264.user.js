// ==UserScript==
// @name        Diaspora Emoticons 2
// @namespace   https://pod.geraspora.de/u/deusfigendi
// @version    0.3
// @description Replaces Smiley-ASCII by images
// @include     https://pod.geraspora.de/stream
// @match      http*://*/stream
// @copyright  2012+, Deus Figendi
// @grant       none
// ==/UserScript==


//          this is a minified version of json_parse.js
//	                           by douglascrockford from
//          https://github.com/douglascrockford/JSON-js
//                                  it's public domain.
var json_parse=(function(){"use strict";var at,ch,escapee={'"':'"','\\':'\\','/':'/',b:'\b',f:'\f',n:'\n',r:'\r',t:'\t'},text,error=function(m){throw{name:'SyntaxError',message:m,at:at,text:text}},next=function(c){if(c&&c!==ch){error("Expected '"+c+"' instead of '"+ch+"'")}ch=text.charAt(at);at+=1;return ch},number=function(){var number,string='';if(ch==='-'){string='-';next('-')}while(ch>='0'&&ch<='9'){string+=ch;next()}if(ch==='.'){string+='.';while(next()&&ch>='0'&&ch<='9'){string+=ch}}if(ch==='e'||ch==='E'){string+=ch;next();if(ch==='-'||ch==='+'){string+=ch;next()}while(ch>='0'&&ch<='9'){string+=ch;next()}}number=+string;if(!isFinite(number)){error("Bad number")}else{return number}},string=function(){var hex,i,string='',uffff;if(ch==='"'){while(next()){if(ch==='"'){next();return string}if(ch==='\\'){next();if(ch==='u'){uffff=0;for(i=0;i<4;i+=1){hex=parseInt(next(),16);if(!isFinite(hex)){break}uffff=uffff*16+hex}string+=String.fromCharCode(uffff)}else if(typeof escapee[ch]==='string'){string+=escapee[ch]}else{break}}else{string+=ch}}}error("Bad string")},white=function(){while(ch&&ch<=' '){next()}},word=function(){switch(ch){case't':next('t');next('r');next('u');next('e');return true;case'f':next('f');next('a');next('l');next('s');next('e');return false;case'n':next('n');next('u');next('l');next('l');return null}error("Unexpected '"+ch+"'")},value,array=function(){var array=[];if(ch==='['){next('[');white();if(ch===']'){next(']');return array}while(ch){array.push(value());white();if(ch===']'){next(']');return array}next(',');white()}}error("Bad array")},object=function(){var key,object={};if(ch==='{'){next('{');white();if(ch==='}'){next('}');return object}while(ch){key=string();white();next(':');if(Object.hasOwnProperty.call(object,key)){error('Duplicate key "'+key+'"')}object[key]=value();white();if(ch==='}'){next('}');return object}next(',');white()}}error("Bad object")};value=function(){white();switch(ch){case'{':return object();case'[':return array();case'"':return string();case'-':return number();default:return ch>='0'&&ch<='9'?number():word()}};return function(source,reviver){var result;text=source;at=0;ch=' ';result=value();white();if(ch){error("Syntax error")}return typeof reviver==='function'?(function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}({'':result},'')):result}}());





function parse_stream() {
	//console.log('parse_stream');
    var textboxes = document.getElementsByTagName('textarea');
    var postings = document.getElementsByClassName('post-content');
    var comments = document.getElementsByClassName('comment-content');
    
    
    
    var elements_to_parse = postings;    
    for (var i = 0; i < elements_to_parse.length; i++) {
        if (!elements_to_parse[i].className.match(/emoteparsed/)) {
			//console.log('parse_stream '+i);
            parse_recurse(elements_to_parse[i]);
			//console.log('/parse_stream '+i);
            elements_to_parse[i].className += ' emoteparsed';
        }
    }
    elements_to_parse = comments;
	//console.log('~parse_stream');
    
    for (var i = 0; i < elements_to_parse.length; i++) {
        if (!elements_to_parse[i].className.match(/emoteparsed/)) {
			//console.log('parse_stream '+i);
            parse_recurse(elements_to_parse[i]);
			//console.log('/parse_stream '+i);
            elements_to_parse[i].className += ' emoteparsed';
        }
    }
	//console.log('~~parse_stream');
    
    for (var i = 0; i < textboxes.length; i++) {
        addEmotePanel(textboxes[i]);
    }
	//console.log('/parse_stream');    
}

function parse_recurse(contentelement) {
	//console.log('parse_recurse');
    if (contentelement) {
        if (contentelement.childNodes.length >= 0) {
            //for (var i = 0; i < contentelement.childNodes.length; i++) {
            for (var i = contentelement.childNodes.length-1; i >= 0 ; i--) {
                parse_recurse(contentelement.childNodes[i]);
            }
        }
        if (contentelement.nodeType == 3) {
            replace_smileys(contentelement);
        }
        
    }
}

function replace_smileys(text_node) {
	//console.log('replace_smileys');
    
    for (var i = 0; i < emote_replace_rules .length; i++) {
		if (emote_replace_rules[i].length < 4) {
			emote_replace_rules[i].push(escapeRegExp(emote_replace_rules[i][0]));
		}
    }
    var smile_position = 0;
    var found_something = false;
    var e1 = null;
    var e2 = null;
    var e3 = null;
    var n = 0;
    
    while (n < emote_replace_rules.length && found_something == false) {
		//console.log('replace_smileys 85 - n='+n+' ('+emote_replace_rules[n][0]+')');
        smile_position = text_node.data.search(new RegExp('(\\s|^)'+emote_replace_rules[n][3]+'(\\s|$)'));
        if (smile_position >= 0) {
            found_something = true;
            e1 = document.createTextNode(text_node.data.substring(0,smile_position));
            e2 = document.createElement('img');
            e2.src = emote_base_url+emote_replace_rules[n][1];
            e2.alt = emote_base_url+emote_replace_rules[n][2];
            e3 = document.createTextNode(text_node.data.substring(smile_position+emote_replace_rules[n][0].length+1));
            
            
            var this_parentNode = text_node.parentNode;
            
            this_parentNode.insertBefore(e1,text_node);
            this_parentNode.insertBefore(e2,text_node);
            this_parentNode.insertBefore(e3,text_node);
            this_parentNode.removeChild(text_node);
        }
        n++;
    }
    
    if (found_something) {
        parse_recurse(this_parentNode);
        return true;
    } else {
        return false;
    }
}
    
function escapeRegExp (s) {
	//console.log('escapeRegExp '+s);
    var r = s.replace(/\\/g,'\\\\');
    var r = r.replace(/\(/g,'\\(');
    var r = r.replace(/\)/g,'\\)');
    var r = r.replace(/\[/g,'\\[');
    var r = r.replace(/\]/g,'\\[');
    var r = r.replace(/\{/g,'\\{');
    var r = r.replace(/\}/g,'\\}');
    var r = r.replace(/\^/g,'\\^');
    var r = r.replace(/\$/g,'\\$');
    var r = r.replace(/\*/g,'\\*');
    var r = r.replace(/\+/g,'\\+');
    var r = r.replace(/\?/g,'\\?');
    var r = r.replace(/\./g,'\\.');
    var r = r.replace(/\|/g,'\\|');
	//console.log('/escapeRegExp '+r);
    return(r);
}

function unescapedLength(s) {
	//console.log('unescapedLength');
    var r = s.replace(/\\/,'');
    return r.length;
}

function addEmotePanel(areaelement) {
	//console.log('addEmotePanel');
    
    var settingBox = areaelement;
    ////console.log('l 158');
    if (areaelement.id == 'status_message_fake_text') {
    //Variant 1: The Textarea is "new post"...
        while (settingBox.nodeName.toUpperCase() != 'FORM') {
            settingBox = settingBox.parentNode;
        }
        settingBox = settingBox.getElementsByClassName('public_toggle')[0];
    } else if (areaelement.className == 'comment_box') {
    //Variant 2: The Textarea is a commentbox in the stream...
        while (settingBox.nodeName.toUpperCase() != 'FORM') {
            settingBox = settingBox.parentNode;
        }
        settingBox = settingBox.getElementsByClassName('submit_button')[0];        
    }
    // blah andere Variante der Eingabebox
    
    ////console.log('l 174');
    if (settingBox.firstChild) {
        if (settingBox.firstChild.className != 'emotepanel') {
            if (areaelement.id == 'status_message_fake_text') {
                var emotepanel = createemotepanel(true);
            } else {
                var emotepanel = createemotepanel(false);
            }
            ////console.log('l 181');
            emotepanel.className = 'emotepanel';    
            settingBox.style.position = 'relative';
            settingBox.insertBefore(emotepanel,settingBox.firstChild);
        }
    }
    
}

function createemotepanel(createsettings) {
	//console.log('createemotepanel');
    
    var emotepannel = document.createElement("div");
    emotepannel.className='emotepanel';    
    emotepannel.style.display = 'inline';    
    var toggle_button = document.createElement("img");
    toggle_button.src = emote_base_url+emote_replace_rules[0][1];
    toggle_button.addEventListener('click',function() {
		var my_emotepanel = this;
		while (my_emotepanel.className != 'emotepanel') {
			my_emotepanel = my_emotepanel.parentNode;
			//console.log(my_emotepanel.nodeName+' - '+my_emotepanel.className);
		}
        my_emotepanel.getElementsByTagName('table')[0].style.display = null;
        if (my_emotepanel.getElementsByTagName('label').length > 0) {
			my_emotepanel.getElementsByTagName('label')[0].style.display = null;
		}
        this.style.display = 'none';
		my_emotepanel.style.display = 'block';
    });
    emotepannel.appendChild(toggle_button);
    var emote_factoryreset = document.createElement('span');
    emote_factoryreset.appendChild(document.createTextNode('reset'));
    emote_factoryreset.addEventListener('click',function() {
		localStorage.emoticon_data = null;
		alert('Seite bitte neu laden...');
	});
    emotepannel.appendChild(emote_factoryreset);
	
    
    //emote_tablewidth
    
    var emote_table = document.createElement('table');
    emote_table.style.display = 'none';
    emote_table.style.border = 'solid';
    emote_table.style.background = 'rgba(255,255,255,0.9)';    
    var temp_tr = null;
    var temp_td = null;
    var temp_img = null;
    
    
    for (var i = 0; i < emote_replace_rules.length; i++) {
		if (i % emote_tablewidth == 0) {
			//beginning a new line...
			temp_tr = document.createElement('tr');
		}
		
		temp_td = document.createElement('td');
		temp_img = document.createElement('img');
		temp_img.id = 'emote_button_'+i;
		temp_img.src = emote_base_url+emote_replace_rules[i][1];
        temp_img.title = emote_replace_rules[i][0];
        temp_img.alt = emote_replace_rules[i][2];
        
        temp_img.addEventListener('click',function(e) {
			var my_id = parseInt(this.id.match(/emote_button_(\d+)/)[1]);
			if (this.className == 'emote_editmode') {
				var switch_id = my_id;
				if (this.style.cursor == 'n-resize') {
					//console.log('N');
					switch_id = my_id - emote_tablewidth;
				} else if (this.style.cursor == 'e-resize') {
					//console.log('O');
					switch_id = my_id +1;
				} else if (this.style.cursor == 's-resize') {
					//console.log('S');
					switch_id = my_id + emote_tablewidth;
				} else if (this.style.cursor == 'w-resize') {
					//console.log('W');
					switch_id = my_id - 1;
				} else {
					switch_id = my_id;
				}
				
				//console.log('switching '+my_id+'<>'+switch_id+' ... '+this.style.cursor);
				if (switch_id >= 0 && switch_id < emote_replace_rules.length && switch_id != my_id) {
					switch_emote_elements(my_id,switch_id);
					var switch_image1 = document.getElementById('emote_button_'+my_id);
					var switch_image2 = document.getElementById('emote_button_'+switch_id);
					var switch_td1 = switch_image1.parentNode;
					var switch_td2 = switch_image2.parentNode;
					switch_td2.appendChild(switch_image1);
					switch_td1.appendChild(switch_image2);
					switch_image1.id = 'emote_button_'+switch_id;
					switch_image2.id = 'emote_button_'+my_id;
				
				}
				
				var emote_edit_panel = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('fieldset')[0];
				emote_edit_panel.getElementsByTagName('img')[0].src = emote_base_url+emote_replace_rules[switch_id][1];
				emote_edit_panel.getElementsByTagName('img')[0].alt = 'emote_button_'+switch_id;
				
				document.getElementById('emote_edit_emotename').value = emote_replace_rules[switch_id][0];
				document.getElementById('emote_edit_emotesrc').value = emote_replace_rules[switch_id][1];
				document.getElementById('emote_edit_emotealt').value = emote_replace_rules[switch_id][2];
				
				document.getElementById('emote_edit_keyboardcontrol').focus();
				
			}
			
			
			//console.log('e.clientX '+e.clientX);
			//console.log('e.layerX '+e.layerX);
			//console.log('e.offsetX '+e.offsetX);
			//console.log('e.pageX '+e.pageX);
			//console.log('e.x '+e.x);
			//console.log('this.clientX '+this.clientX);
			//console.log('this.layerX '+this.layerX);
			//console.log('this.offsetX '+this.offsetX);
			//console.log('this.pageX '+this.pageX);
			//console.log('this.x '+this.x);
		});
        temp_img.addEventListener('mousemove',function(e) {
			if (this.className == 'emote_editmode') {
				var my_mpoitionX = (e.layerX - this.x)/this.clientWidth;
				var my_mpoitionY = (e.layerY - this.y)/this.clientHeight;
				if (my_mpoitionX <= 0.33) {
					if (my_mpoitionY <= 0.33) {
						if (my_mpoitionX < my_mpoitionY) {
							this.style.cursor = 'w-resize';
						} else {
							this.style.cursor = 'n-resize';
						}
					} else if (my_mpoitionY >= 0.67) {
						if (my_mpoitionX < (1-my_mpoitionY)) {
							this.style.cursor = 'w-resize';
						} else {
							this.style.cursor = 's-resize';
						}
					} else {
						this.style.cursor = 'w-resize';
					}
				} else if (my_mpoitionX >= 0.67) {
					if (my_mpoitionY <= 0.33) {
						if ((1-my_mpoitionX) < my_mpoitionY) {
							this.style.cursor = 'e-resize';
						} else {
							this.style.cursor = 'n-resize';
						}
					} else if (my_mpoitionY >= 0.67) {
						if ((1-my_mpoitionX) < (1-my_mpoitionY)) {
							this.style.cursor = 'e-resize';
						} else {
							this.style.cursor = 's-resize';
						}
					} else {
						this.style.cursor = 'e-resize';
					}
				} else {
					if (my_mpoitionY <= 0.33) {
						this.style.cursor = 'n-resize';
					} else if (my_mpoitionY >= 0.67) {
						this.style.cursor = 's-resize';
					} else {
						this.style.cursor = 'pointer';
					}
				}
			} else {
				this.style.cursor = 'pointer';
			}
		});
        
        temp_td.appendChild(temp_img);
        temp_tr.appendChild(temp_td);
    
		if (i % emote_tablewidth == 1) {
			//ending a line...
			emote_table.appendChild(temp_tr);
		}
	}
	if (i % emote_tablewidth == 1) {
		//create new TR		
		temp_tr= document.createElement('tr');
	}
	temp_td = document.createElement('td');
	temp_td.colSpan = emote_tablewidth - i % emote_tablewidth;
	temp_td.style.textAlign = 'right';
	temp_td.style.cursor = 'cross';
	temp_td.appendChild(document.createTextNode('NEW'));
	temp_td.addEventListener('click',function() {
		emote_replace_rules.push(new Array('NEW',emote_replace_rules[0][1],'foobar'));		
		while (document.getElementsByClassName('emotepanel').length > 0) {
			document.getElementsByClassName('emotepanel')[0].parentNode.removeChild(document.getElementsByClassName('emotepanel')[0]);
		}
		parse_stream();
	});
	temp_tr.appendChild(temp_td);
	emote_table.appendChild(temp_tr);

	emotepannel.appendChild(emote_table);
	
	if (createsettings) {
		var emote_edit_button = document.createElement('input');
		emote_edit_button.type = "checkbox";
	
		var emote_edit_button_label = document.createElement('label');
		emote_edit_button_label.appendChild(document.createTextNode('Editmode/Settings'));
		emote_edit_button_label.appendChild(emote_edit_button);
		emote_edit_button_label.style.display = 'none';
		emote_edit_button.addEventListener('change',function() {
			var my_emotepanel = this;
			while (my_emotepanel.className != 'emotepanel') {
				my_emotepanel = my_emotepanel.parentNode;
				//console.log(my_emotepanel.nodeName+' - '+my_emotepanel.className);
			}
			var my_img_list = my_emotepanel.getElementsByTagName("table")[0].getElementsByTagName("img");
			if (this.checked) {
				my_emotepanel.getElementsByTagName('fieldset')[0].style.display = null;
				for (var i = 0; i < my_img_list.length; i++) {
					my_img_list[i].className = 'emote_editmode';
				}
			} else {
				my_emotepanel.getElementsByTagName('fieldset')[0].style.display = 'none';
				for (var i = 0; i < my_img_list.length; i++) {
					my_img_list[i].className = 'emote_insertmode';
				}
			}
		});
	
		emotepannel.appendChild(emote_edit_button_label);
		
	
		var emote_edit_panel = document.createElement('fieldset');
		emote_edit_panel.style.display = 'none';
		emote_edit_panel.id = 'emote_edit_panel';
		var emote_edit_panel_legend = document.createElement('legend');
		emote_edit_panel_legend.appendChild(document.createTextNode('Edit/Settings '));
		
		var emote_edit_helpbutton = document.createElement('span');
		emote_edit_helpbutton.style.cursor = 'help';
		emote_edit_helpbutton.appendChild(document.createTextNode('(?)'));
		emote_edit_helpbutton.addEventListener('click',function() {
			document.getElementById('emote_styles').firstChild.data += '\
.emote_help {			\
			display:block!important;\
			}\
			';
		});
		
		emote_edit_panel_legend.appendChild(emote_edit_helpbutton);
		
		
		emote_edit_panel.appendChild(emote_edit_panel_legend);
	
	
		var emote_edit_img = document.createElement('img');
		emote_edit_img.id = 'emote_edit_img';
		emote_edit_img.src = emote_base_url+emote_replace_rules[emote_replace_rules.length-1][1];
		emote_edit_img.alt = 'emote_button_'+(emote_replace_rules.length-1);			
		emote_edit_panel.appendChild(emote_edit_img);
		
		var emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('This is the Icon you are editing. To choose it just click on the one above while you\'re in edit-mode. After you chose one you can move it using your cursor-keys ↑→↓←.'));
		emote_edit_panel.appendChild(emote_edit_help);

	
		var emote_edit_keyboardcontrol = document.createElement('input');
		emote_edit_keyboardcontrol.id = 'emote_edit_keyboardcontrol';
		emote_edit_keyboardcontrol.placeholder = 'click and use ↑→↓←';
		emote_edit_keyboardcontrol.style.width = '0';
		emote_edit_keyboardcontrol.style.position = 'fixed';
		emote_edit_keyboardcontrol.addEventListener('keydown',function(e) {
			//W = 37
			//N = 38
			//E = 39
			//S = 40
			if (e.keyCode >= 37 && e.keyCode <= 40) {
				var my_id = parseInt(this.parentNode.getElementsByTagName('img')[0].alt.match(/emote_button_(\d+)/)[1]);
				var switch_id = my_id;
				if        (e.keyCode == 37) { switch_id = my_id -1;
				} else if (e.keyCode == 38) { switch_id = my_id -emote_tablewidth;
				} else if (e.keyCode == 39) { switch_id = my_id +1; 
				} else if (e.keyCode == 40) { switch_id = my_id +emote_tablewidth;
				} else { /* foo */ }
			
			
				if (switch_id >= 0 && switch_id < emote_replace_rules.length && switch_id != my_id) {
					switch_emote_elements(my_id,switch_id);
					var switch_image1 = document.getElementById('emote_button_'+my_id);
					var switch_image2 = document.getElementById('emote_button_'+switch_id);
					var switch_td1 = switch_image1.parentNode;
					var switch_td2 = switch_image2.parentNode;
					switch_td2.appendChild(switch_image1);
					switch_td1.appendChild(switch_image2);
					switch_image1.id = 'emote_button_'+switch_id;
					switch_image2.id = 'emote_button_'+my_id;
				
					this.parentNode.getElementsByTagName('img')[0].alt = 'emote_button_'+switch_id;
				}
			}
		});
		/*
		var emote_edit_keyboardactivator = document.createElement('span');
		emote_edit_keyboardactivator.style.fontSize = '140%';
		emote_edit_keyboardactivator.style.cursor = 'pointer';
		emote_edit_keyboardactivator.appendChild(document.createTextNode('✢'));
		emote_edit_keyboardactivator.addEventListener('click',function() {
			document.getElementById('emote_edit_keyboardcontrol').focus();
		});
	
		emote_edit_panel.appendChild(emote_edit_keyboardactivator);
		*/
		emote_edit_panel.appendChild(emote_edit_keyboardcontrol);
		
		var emote_edit_baseurl = document.createElement('input');
		emote_edit_baseurl.id = 'emote_edit_baseurl'
		emote_edit_baseurl.value = emote_base_url;
		emote_edit_baseurl.addEventListener('change',function() {
			emote_base_url = this.value;
			save_to_localstorage();
		});
		var emote_edit_baseurl_label = document.createElement('label');
		emote_edit_baseurl_label.htmlFor = 'emote_edit_baseurl';
		emote_edit_baseurl_label.appendChild(document.createTextNode('base-url'));
		emote_edit_baseurl_label.appendChild(emote_edit_baseurl);

		emote_edit_panel.appendChild(emote_edit_baseurl_label);

		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('Here you can setup your "base-url". That means the "path" to the directory the emote-graphics are. That can also be a local adress like file:///home/username/Images/Diaspora_Emoteset/ don\'t forget the pending / otherwise it\'s a prefix instead of a directory.'));
		emote_edit_panel.appendChild(emote_edit_help);

		
		 
		var emote_edit_poststyle = document.createElement('input'); //image or code?
		emote_edit_poststyle.type = 'checkbox';
		emote_edit_poststyle.checked = false;
		emote_edit_poststyle.id = 'emote_edit_poststyle';
		emote_edit_poststyle.addEventListener('change',function() {
			if (this.checked) {
				this.parentNode.lastChild.data = 'image';
			} else {
				this.parentNode.lastChild.data = 'code';
			}
		});
		
		
		var emote_edit_poststyle_label = document.createElement('label');
		emote_edit_poststyle_label.htmlFor = 'emote_edit_poststyle';
		emote_edit_poststyle_label.appendChild(document.createTextNode('insert emotes as'));
		emote_edit_poststyle_label.appendChild(emote_edit_poststyle);
		emote_edit_poststyle_label.appendChild(document.createTextNode('code'));
	
		emote_edit_panel.appendChild(emote_edit_poststyle_label);
		
		
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('Hit this box to change the way you POST Emoticons. Default just the codes are inserted and users can parse them local. But you can setup that you want to paste the images itself. (Does not make any sence with a local base-uri!). This setting is not saved, it\'s a one-time-thingy.'));
		emote_edit_panel.appendChild(emote_edit_help);
	/*
	var emote_edit_tablewidth = document.createElement('input');
	emote_edit_tablewidth.type = 'number';
	emote_edit_tablewidth.value = emote_tablewidth;
	emote_edit_tablewidth.min = 1;
	emote_edit_tablewidth.max = emote_replace_rules.length;
	emote_edit_tablewidth.addEventListener('change',function() {
		emote_tablewidth = parseInt(this.value);
		if (emote_tablewidth < 1) { emote_tablewidth = 1; }		
	});
	
	emote_edit_panel.appendChild(emote_edit_tablewidth);
	*/
	
		emote_edit_panel.appendChild(document.createElement('br'));
		
		var emote_edit_emotename = document.createElement('input');
		emote_edit_emotename.id = 'emote_edit_emotename';
		emote_edit_emotename.value = emote_replace_rules[emote_replace_rules.length-1][0];
		emote_edit_emotename.addEventListener('change',function() {
			var emote_id = parseInt(document.getElementById('emote_edit_img').alt.match(/emote_button_(\d+)/)[1]);	
			emote_replace_rules[emote_id][0] = this.value;
		});
		var emote_edit_emotename_label = document.createElement('label');
		emote_edit_emotename_label.htmlFor = 'emote_edit_emotename';
		emote_edit_emotename_label.appendChild(document.createTextNode('Code'));
		emote_edit_emotename_label.appendChild(emote_edit_emotename);
		emote_edit_panel.appendChild(emote_edit_emotename_label);
		
		
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('This is where you setup what "code" you have to type into the send-box to get an emoticon. Remember: You should use more or less the same codes as other users to keep compatibility.'));
		emote_edit_panel.appendChild(emote_edit_help);
				
		var emote_edit_emotesrc = document.createElement('input');
		emote_edit_emotesrc.id = 'emote_edit_emotesrc';
		emote_edit_emotesrc.value = emote_replace_rules[emote_replace_rules.length-1][1];
		emote_edit_emotesrc.addEventListener('change',function() {
			var emote_id = parseInt(document.getElementById('emote_edit_img').alt.match(/emote_button_(\d+)/)[1]);	
			emote_replace_rules[emote_id][1] = this.value;
		});
		var emote_edit_emotesrc_label = document.createElement('label');
		emote_edit_emotesrc_label.htmlFor = 'emote_edit_emotesrc';
		emote_edit_emotesrc_label.appendChild(document.createTextNode('URL'));
		emote_edit_emotesrc_label.appendChild(emote_edit_emotesrc);
		emote_edit_panel.appendChild(emote_edit_emotesrc_label);
		
		
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('This is just the filename of the emoteicon. You can setup here easy if you like one smiling face more than another.'));
		emote_edit_panel.appendChild(emote_edit_help);
		
		
		var emote_edit_emotealt = document.createElement('input');
		emote_edit_emotealt.id = 'emote_edit_emotealt';
		emote_edit_emotealt.value = emote_replace_rules[emote_replace_rules.length-1][2];
		emote_edit_emotealt.addEventListener('change',function() {
			var emote_id = parseInt(document.getElementById('emote_edit_img').alt.match(/emote_button_(\d+)/)[1]);	
			emote_replace_rules[emote_id][2] = this.value;
		});
		var emote_edit_emotealt_label = document.createElement('label');
		emote_edit_emotealt_label.htmlFor = 'emote_edit_emotealt';
		emote_edit_emotealt_label.appendChild(document.createTextNode('alt'));
		emote_edit_emotealt_label.appendChild(emote_edit_emotealt);
		emote_edit_panel.appendChild(emote_edit_emotealt_label);
		
		
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('The alt-attribute is nessesary on posting with images. The alt-attribute is displayed if the image is not found (e.g. it\'s deleted or the filename is wrong) and read out to blind users. Also search-engines read the alt-attribute as text. It should represent the image.'));
		emote_edit_panel.appendChild(emote_edit_help);
		
		emote_edit_panel.appendChild(document.createElement('br'));

		var emote_edit_sharebutton = document.createElement('input');
		emote_edit_sharebutton.type = 'button';
		emote_edit_sharebutton.value = 'export/share';
		emote_edit_sharebutton.addEventListener('click',function(){
			document.getElementById('emote_edit_importbutton').style.display = null;
			document.getElementById('emote_edit_iobox').style.display = null;
			document.getElementById('emote_edit_iobox').value = get_serilised_emotedata();
		});

		var emote_edit_savebutton = document.createElement('input');
		emote_edit_savebutton.type = 'button';
		emote_edit_savebutton.value = 'save';
		emote_edit_savebutton.addEventListener('click',function(){
			save_to_localstorage();
			while (document.getElementsByClassName('emotepanel').length > 0) {
				document.getElementsByClassName('emotepanel')[0].parentNode.removeChild(document.getElementsByClassName('emotepanel')[0]);
			}
			parse_stream();
		});
		
		var emote_edit_iobox = document.createElement('textarea');
		emote_edit_iobox.id = 'emote_edit_iobox';
		emote_edit_iobox.style.display = 'none';
		
		var emote_edit_importbutton = document.createElement('input');
		emote_edit_importbutton.type = 'button';
		emote_edit_importbutton.value = 'import';
		emote_edit_importbutton.style.display = 'none';
		emote_edit_importbutton.id = 'emote_edit_importbutton';
		emote_edit_importbutton.addEventListener('click',function(){
			load_from_json(document.getElementById('emote_edit_iobox').value);
			while (document.getElementsByClassName('emotepanel').length > 0) {
				document.getElementsByClassName('emotepanel')[0].parentNode.removeChild(document.getElementsByClassName('emotepanel')[0]);
			}
			parse_stream();
		});
		
		emote_edit_panel.appendChild(emote_edit_sharebutton);
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('Clicking this button displays a text-box containing all your settings (in a data-format called "JSON"). With this function you can backup your settings to a textfile or share YOUR Emote-Set (with your base-url, order etc.).'));
		emote_edit_panel.appendChild(emote_edit_help);
		
		emote_edit_panel.appendChild(emote_edit_savebutton);
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('All your settings are temporary hold in your RAM (technicly: in global variables). Clicking here saves them to your harddisk (local storage). So if you\'d like to use it over multible devices/browsers you have to sync your stuff using the export/import-function. After saving the panel is closed.'));
		emote_edit_panel.appendChild(emote_edit_help);
		
		emote_edit_panel.appendChild(document.createElement('br'));
		emote_edit_panel.appendChild(emote_edit_iobox);
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('This is the import/export-box, all your settings are displayed here in JSON. You can copy the content to share it or to backup. Or you can paste in stuff to import it.'));
		emote_edit_panel.appendChild(emote_edit_help);
		
		emote_edit_panel.appendChild(emote_edit_importbutton);
		emote_edit_help = document.createElement('span');
		emote_edit_help.className = 'emote_help';
		emote_edit_help.appendChild(document.createTextNode('Click here to import the stuff written to the textbox above. RECOGNIZE: The panel is instandly closed to recreate it from your new setup but it\'s NOT SAVED to your harddisc. If you like your new settings you have to save manually.'));
		emote_edit_panel.appendChild(emote_edit_help);
	
	
		emotepannel.appendChild(emote_edit_panel);
	
	
	}
	//resize
		
		
		/*
		var my_emotepanel = this;
		while (my_emotepanel.className != 'emotepanel') {
			my_emotepanel = my_emotepanel.parentNode;
			//console.log(my_emotepanel.nodeName+' - '+my_emotepanel.className);
		}
		my_emotepanel.parentNode.removeChild(my_emotepanel);
		*/
    
    return(emotepannel);
    
}

function switch_emote_elements(i1,i2) {
	var temp_array = emote_replace_rules[i1];
	emote_replace_rules[i1] = emote_replace_rules[i2];
	emote_replace_rules[i2] = temp_array;
}

function get_serilised_emotedata() {
	//console.log('get_serilised_emotedata');
	
    var emote_exporttext = '{"emote_base_url"     :"'+emote_base_url+'",'+"\n";
    emote_exporttext    += ' "emote_tablewidth"   :"'+emote_tablewidth+'",'+"\n";
    emote_exporttext    += ' "emote_replace_rules":[';
        
    for (var i = 0; i < emote_replace_rules.length; i++) {
		emote_exporttext += "\n\t"+'["'+emote_replace_rules[i][0]+'","'+emote_replace_rules[i][1]+'","'+emote_replace_rules[i][2]+'"],';
	}
	emote_exporttext = emote_exporttext.substring(0,emote_exporttext.length-1);
        
    emote_exporttext += "\n]}";
    
	//console.log('/get_serilised_emotedata');
    return emote_exporttext;	
}

function load_from_json(s) {
	//console.log('load_from_json');
	var temp_object = json_parse(s);
	if (typeof(temp_object.emote_base_url) != 'undefined') {
		emote_base_url = temp_object.emote_base_url;
	} else {
		if(typeof(emote_base_url) == 'undefined') {
			emote_base_url = 'http://ect.bonsaiheld.org/e/';
		}
	}
	if (typeof(temp_object.emote_tablewidth) != 'undefined') {
		emote_tablewidth = temp_object.emote_tablewidth;
	} else {
		if(typeof(emote_tablewidth) == 'undefined') {
			emote_tablewidth = 14;
		}
	}
	if (typeof(temp_object.emote_replace_rules) != 'undefined') {
		emote_replace_rules = temp_object.emote_replace_rules;
	} else {
		if(typeof(emote_replace_rules) == 'undefined') {
			emote_replace_rules = new Array(new Array(':-)','smile.png','Smile')); //I hope this does not happen XD
		}
	}
	//console.log('/load_from_json');
}

function save_to_localstorage() {
	//console.log('save_to_localstorage');
	localStorage.emoticon_data = get_serilised_emotedata();
	//console.log('/save_to_localstorage');
}

function load_from_localstorage() {
	//console.log('load_from_localstorage');
		
    if (localStorage.emoticon_data && localStorage.emoticon_data != null && localStorage.emoticon_data != 'null') {
    //if (false) {
		load_from_json(localStorage.emoticon_data);
	} else {
		
		var emote_defaulttext = '{"emote_base_url":"http://ect.bonsaiheld.org/e/",\
		"emote_tablewidth":15,\
		"emote_replace_rules":[\
	[":-)","smile.png","Smile"],                        \
	[":-))","smile-big.png","Big Smile"],               \
	[":-D","grin.png","Grin"],                          \
	[":laugh:","laugh.png","Laugh"],                    \
	[":-(","frown.png","Frown"],                        \
	[":-((","frown-big.png","Big Frown"],               \
	[":cry:","crying.png","Cry"],                       \
	[":-|","neutral.png","Neutral"],                    \
	[";-)","wink.png","Wink"],                          \
	[":-*","kiss.png","Kiss"],                          \
	[":-P","razz.png","Razz"],                          \
	[":chic:","chic.png","Chic"],                       \
	["8-)","cool.png","Cool"],                          \
	[":-X","angry.png","Angry"],                        \
	[":reallyangry:","really-angry.png","Really Angry"],\
	[":-?","confused.png","Confused"],                  \
	["?:-)","question.png","Question"],                 \
	[":-/","thinking.png","Thinking"],                  \
	[":pain:","pain.png","Pain"],                       \
	[":shock:","shock.png","Shock"],                    \
	[":yes:","thumbs-up.png","Yes"],                    \
	[":no:","thumbs-down.png","No"],                    \
	[":rotfl:","rotfl.png","LOL"],                      \
	[":silly:","silly.png","Silly"],                    \
	[":beauty:","beauty.png","Beauty"],             \
	[":lashes:","lashes.png","Lashes"],             \
	[":cute:","cute.png","Cute"],                   \
	[":shy:","bashful.png","Shy"],                  \
	[":blush:","blush.png","Blush"],                \
	[":kissed:","kissed.png","Kissed"],             \
	[":inlove:","in-love.png","In Love"],           \
	[":drool:","drool.png","Drool"],                \
	[":giggle:","giggle.png","Giggle"],             \
	[":snicker:","snicker.png","Snicker"],          \
	[":heh:","curl-lip.png","Heh!"],                \
	[":smirk:","smirk.png","Smirk"],                \
	[":wilt:","wilt.png","Wilt"],                   \
	[":weep:","weep.png","Weep"],                   \
	[":idk:","dont-know.png","IDK"],                \
	[":struggle:","struggle.png","Struggle"],       \
	[":sidefrown:","sidefrown.png","Side Frown"],   \
	[":dazed:","dazed.png","Dazed"],                \
	[":hypnotized:","hypnotized.png","Hypnotized"], \
	[":sweat:","sweat.png","Sweat"],                \
	[":eek:","bug-eyes.png","Eek!"],                \
	[":roll:","eyeroll.png","Roll Eyes"],           \
	[":sarcasm:","sarcastic.png","Sarcasm"],        \
	[":disdain:","disdain.png","Disdain"],          \
	[":smug:","arrogant.png","Smug"],                      \
	[":-$","moneymouth.png","Money Mouth"],                \
	[":footmouth:","foot-in-mouth.png","Foot in Mouth"],   \
	[":shutmouth:","shut-mouth.png","Shut Mouth"],         \
	[":quiet:","quiet.png","Quiet"],                       \
	[":shame:","shame.png","Shame"],                       \
	[":beatup:","beat-up.png","Beat Up"],                  \
	[":mean:","mean.png","Mean"],                          \
	[":evilgrin:","evil-grin.png","Evil Grin"],            \
	[":teeth:","teeth.png","Grit Teeth"],                  \
	[":shout:","shout.png","Shout"],                       \
	[":pissedoff:","pissed-off.png","Pissed Off"],         \
	[":reallypissed:","really-pissed.png","Really Pissed"],\
	[":razzmad:","razz-mad.png","Mad Razz"],               \
	[":X-P:","razz-drunk.png","Drunken Razz"],             \
	[":sick:","sick.png","Sick"],                          \
	[":yawn:","yawn.png","Yawn"],                          \
	[":ZZZ:","sleepy.png","Sleepy"],                       \
	[":dance:","dance.png","Dance"],                       \
	[":clap:","clap.png","Clap"],                          \
	[":jump:","jump.png","Jump"],                          \
	[":handshake:","handshake.png","Handshake"],           \
	[":highfive:","highfive.png","High Five"],             \
	[":hugleft:","hug-left.png","Hug Left"],               \
	[":hugright:","hug-right.png","Hug Right"],             \
	[":kissblow:","kiss-blow.png","Kiss Blow"],             \
	[":kissing:","kissing.png","Kissing"],                  \
	[":bye:","bye.png","Bye"],                              \
	[":goaway:","go-away.png","Go Away"],                   \
	[":callme:","call-me.png","Call Me"],                   \
	[":onthephone:","on-the-phone.png","On the Phone"],     \
	[":secret:","secret.png","Secret"],                     \
	[":meeting:","meeting.png","Meeting"],                  \
	[":waving:","waving.png","Waving"],                     \
	[":stop:","stop.png","Stop"],                           \
	[":timeout:","time-out.png","Time Out"],                \
	[":talktothehand:","talktohand.png","Talk to the Hand"],\
	[":loser:","loser.png","Loser"],                        \
	[":lying:","lying.png","Lying"],                        \
	[":doh:","doh.png","DOH!"],                             \
	[":fingersxd:","fingers-xd.png","Fingers Crossed"],     \
	[":waiting:","waiting.png","Waiting"],                  \
	[":suspense:","nailbiting.png","Suspense"],             \
	[":tremble:","tremble.png","Tremble"],                  \
	[":pray:","pray.png","Pray"],                           \
	[":worship:","worship.png","Worship"],                  \
	[":starving:","starving.png","Starving"],               \
	[":eat:","eat.png","Eat"],                      \
	[":victory:","victory.png","Victory"],          \
	[":curse:","curse.png","Curse"],                \
	[":alien:","alien.png","Alien"],                \
	["O:-)","angel.png","Angel"],                   \
	[":clown:","clown.png","Clown"],                \
	[":cowboy:","cowboy.png","Cowboy"],             \
	[":cyclops:","cyclops.png","Cyclops"],          \
	[":devil:","devil.png","Devil"],                \
	[":doctor:","doctor.png","Doctor"],             \
	[":fighterf:","fighter-f.png","Female Fighter"],\
	[":fighterm:","fighter-m.png","Male Fighter"],  \
	[":mohawk:","mohawk.png","Mohawk"],             \
	[":music:","music.png","Music"],                \
	[":nerd:","nerd.png","Nerd"],                   \
	[":party:","party.png","Party"],                \
	[":pirate:","pirate.png","Pirate"],             \
	[":skywalker:","skywalker.png","Skywalker"],    \
	[":snowman:","snowman.png","Snowman"],          \
	[":soldier:","soldier.png","Soldier"],          \
	[":vampire:","vampire.png","Vampire"],          \
	[":zombiekiller:","zombie-killer.png","Zombie Killer"],\
	[":ghost:","ghost.png","Ghost"],                       \
	[":skeleton:","skeleton.png","Skeleton"],              \
	[":bunny:","bunny.png","Bunny"],                       \
	[":cat:","cat.png","Cat"],                             \
	[":cat2:","cat2.png","Cat 2"],                         \
	[":chick:","chick.png","Chick"],                       \
	[":chicken:","chicken.png","Chicken"],                 \
	[":chicken2:","chicken2.png","Chicken 2"],             \
	[":cow:","cow.png","Cow"],                             \
	[":cow2:","cow2.png","Cow 2"],                         \
	[":dog:","dog.png","Dog"],                             \
	[":dog2:","dog2.png","Dog 2"],                         \
	[":duck:","duck.png","Duck"],                          \
	[":goat:","goat.png","Goat"],                          \
	[":hippo:","hippo.png","Hippo"],                       \
	[":koala:","koala.png","Koala"],                       \
	[":lion:","lion.png","Lion"],                          \
	[":monkey:","monkey.png","Monkey"],                    \
	[":monkey2:","monkey2.png","Monkey 2"],                \
	[":mouse:","mouse.png","Mouse"],                       \
	[":panda:","panda.png","Panda"],                       \
	[":pig:","pig.png","Pig"],                             \
	[":pig2:","pig2.png","Pig 2"],                       \
	[":sheep:","sheep.png","Sheep"],                     \
	[":sheep2:","sheep2.png","Sheep 2"],                 \
	[":reindeer:","reindeer.png","Reindeer"],            \
	[":snail:","snail.png","Snail"],                     \
	[":tiger:","tiger.png","Tiger"],                     \
	[":turtle:","turtle.png","Turtle"],                  \
	[":beer:","beer.png","Beer"],                        \
	[":drink:","drink.png","Drink"],                     \
	[":liquor:","liquor.png","Liquor"],                  \
	[":coffee:","coffee.png","Coffee"],                  \
	[":cake:","cake.png","Cake"],                        \
	[":pizza:","pizza.png","Pizza"],                     \
	[":watermelon:","watermelon.png","Watermelon"],      \
	[":bowl:","bowl.png","Bowl"],                        \
	[":plate:","plate.png","Plate"],                     \
	[":can:","can.png","Can"],                           \
	[":female:","female.png","Female"],                  \
	[":male:","male.png","Male"],                        \
	[":heart:","heart.png","Heart"],                     \
	[":brokenheart:","heart-broken.png","Broken Heart"], \
	[":rose:","rose.png","Rose"],                        \
	[":deadrose:","rose-dead.png","Dead Rose"],          \
	[":peace:","peace.png","Peace"],                     \
	[":yinyang:","yin-yang.png","Yin Yang"],        \
	[":flagus:","flag-us.png","US Flag"],           \
	[":moon:","moon.png","Moon"],                   \
	[":star:","star.png","Star"],                   \
	[":sun:","sun.png","Sun"],                      \
	[":cloudy:","cloudy.png","Cloudy"],             \
	[":rain:","rain.png","Rain"],                   \
	[":thunder:","thunder.png","Thunder"],          \
	[":umbrella:","umbrella.png","Umbrella"],       \
	[":rainbow:","rainbow.png","Rainbow"],          \
	[":musicnote:","music-note.png","Music Note"],  \
	[":airplane:","airplane.png","Airplane"],       \
	[":car:","car.png","Car"],                      \
	[":island:","island.png","Island"],             \
	[":announce:","announce.png","Announce"],       \
	[":brb:","brb.png","brb"],                      \
	[":mail:","mail.png","Mail"],                   \
	[":cell:","mobile.png","Cell"],                 \
	[":phone:","phone.png","Phone"],                \
	[":camera:","camera.png","Camera"],             \
	[":film:","film.png","Film"],                   \
	[":tv:","tv.png","TV"],                         \
	[":clock:","clock.png","Clock"],                \
	[":lamp:","lamp.png","Lamp"],                \
	[":search:","search.png","Search"],          \
	[":coins:","coins.png","Coins"],             \
	[":computer:","computer.png","Computer"],    \
	[":console:","console.png","Console"],       \
	[":present:","present.png","Present"],       \
	[":soccer:","soccerball.png","Soccer"],      \
	[":clover:","clover.png","Clover"],          \
	[":pumpkin:","pumpkin.png","Pumpkin"],       \
	[":bomb:","bomb.png","Bomb"],                \
	[":hammer:","hammer.png","Hammer"],          \
	[":knife:","knife.png","Knife"],             \
	[":handcuffs:","handcuffs.png","Handcuffs"], \
	[":pill:","pill.png","Pill"],                \
	[":poop:","poop.png","Poop"],                \
	[":cigarette:","cigarette.png","Cigarette"]  \
]}';
		load_from_json(emote_defaulttext);
		save_to_localstorage();
    }
       
	//console.log('/load_from_localstorage');
    
}

function addStyles() {
	//console.log('addStyles()');
	var emote_styles = document.createElement('style');
	emote_styles.id = 'emote_styles';
	emote_styles.appendChild(document.createTextNode('.emotepanel table td {\
	padding:0;\
}\
.emotepanel table td img {\
	width:24px;\
}\
.emotepanel label {\
	font-size:0.7em;\
	padding:0.5em;\
}\
.emotepanel label input {\
	width:70px;\
}\
.emote_help {			\
			display:none;\
			background-color:#fe0;\
			border:none;\
			color:black;\
			font-size:0.8em;\
			margin-bottom:1em;\
			padding:0.1em;\
			\
			\
}\
'));
	document.getElementsByTagName('head')[0].appendChild(emote_styles);
}

load_from_localstorage();
addStyles();
if (document.getElementsByClassName('stream_container').length > 0) {
    //console.log('there is a stream_container');
    //window.setTimeout(parse_stream,0500);
    //window.setTimeout(parse_stream,1000);
    window.setTimeout(parse_stream,2000);
    window.setTimeout(parse_stream,4000);

    window.setInterval(parse_stream,8000);
}
