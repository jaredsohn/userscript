//
//
// ==UserScript==
// @name          Lepra Live Filter
// @namespace     http://leprosorium.de
// @description   Lepra Live Filter
// @include       http://leprosorium.ru/live*
// @include       http://www.leprosorium.ru/live*
// ==/UserScript==

function set_setting(name,option){
	if(option.toString().indexOf('"')>0){
		option = option.toString().split('"').join('\\"');
	}

	if(document.cookie.indexOf('filter.settings=')>0){
		var param = unescape(document.cookie.split('filter.settings=')[1].split(";")[0]);

		if(param.indexOf(name+':')>0){
			eval("var temp_name = name+':\"'+settings."+name+".split('\"').join('\\\\\"')+'\"';");
			param = param.split(temp_name).join(name+':"'+option+'"');
		}
		else param = param.split('}').join(','+name+':"'+option+'"}');

		document.cookie = "filter.settings="+escape(param)+"; domain=.leprosorium.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
		eval("settings="+unescape(param));
	}
	else{
		document.cookie = "filter.settings="+escape('{'+name+':"'+option+'"}')+"; domain=.leprosorium.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
		eval("settings="+'{'+name+':"'+option+'"}');
	}
}


function get_settings(){

	if(document.cookie.indexOf('filter.settings=')>0){
		var param = unescape(document.cookie.split('filter.settings=')[1].split(";")[0]);
		eval("settings="+unescape(param));
	}

}
var settings = '';
get_settings();
if(!settings.posts) set_setting('posts',1);
if(!settings.comments) set_setting('comments',1);
if(!settings.glange) set_setting('glange',1);
if(!settings.podlepra) set_setting('podlepra',1);




var divTag = document.createElement("div");
       
divTag.id = "menu";
divTag.setAttribute("style","font-size:7pt; position:absolute; top:50px; left: 15px; border: 1px solid #909090; width:100px; padding:20px;");
divTag.innerHTML = '<b>Фильтруй базар!</b><br><br><label><input type="checkbox" id="c_posts" '+((settings.posts=='1')?'checked="checked"':'')+'/>Посты</label><br /><label><input type="checkbox" id="c_comments"  '+((settings.comments=='1')?'checked="checked"':'')+'/>Комментарии</label><br /><br /><label><input type="checkbox" id="c_glange"  '+((settings.glange=='1')?'checked="checked"':'')+'/>Гланге<label><br /><label><input type="checkbox" id="c_podlepra"  '+((settings.podlepra=='1')?'checked="checked"':'')+'/>Подлепры<label>';
document.body.appendChild(divTag);


	document.getElementById('c_posts').addEventListener('click',
	function(){
		if(document.getElementById('c_posts').checked===true) set_setting('posts',1);
		else set_setting('posts',0);

	},false);
	
	document.getElementById('c_comments').addEventListener('click',
	function(){
		if(document.getElementById('c_comments').checked===true) set_setting('comments',1);
		else set_setting('comments',0);

	},false);
	
	document.getElementById('c_podlepra').addEventListener('click',
	function(){
		if(document.getElementById('c_podlepra').checked===true) set_setting('podlepra',1);
		else set_setting('podlepra',0);

	},false);
	
	document.getElementById('c_glange').addEventListener('click',
	function(){
		if(document.getElementById('c_glange').checked===true) set_setting('glange',1);
		else set_setting('glange',0);

	},false);


/* watch for any changed attributes */
document.addEventListener("DOMNodeInserted", documentChanged, false);
	
function documentChanged(event) {
	var text = event.target.innerHTML;
	var sig = "";
	if(typeof(text) !== 'undefined' && text.indexOf('div') > 0){
		sig = text.split('<div class="dd">')[1].split('</span></div></div></div>')[0];
		if(settings.posts == 0 && text.indexOf('>пост<') > 0){
			event.target.style.display = "none";
		}else if(settings.comments == 0 && text.indexOf('>комментарий<') > 0){
			event.target.style.display = "none";
		}else if(settings.podlepra == 0 && text.indexOf('.leprosorium.ru') > 0){
			event.target.style.display = "none";
		}if(settings.glange == 0 && text.indexOf('.leprosorium.ru') < 0){
			event.target.style.display = "none";
		}
	}
}