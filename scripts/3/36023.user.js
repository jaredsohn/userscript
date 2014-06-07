// ==UserScript==
// @name           Selectbox Suggest
// @namespace      com.appspot.final.gm.selectboxsuggest
// @include        *
// ==/UserScript==

(function(){
var container = null;
function _insert_after(node, ref_node){
	var parent = ref_node.parentNode;
	if(ref_node == parent.lastChild){
		parent.appendChild(node);
	}else{
		parent.insertBefore(node, ref_node.nextSibling);
	}
}
function _txt(node){
	try{
		var txt = node.textContent;
		if(txt){
			return txt;
		}
	}catch(ex){
	}
	return node.innerText;
}
function _show_finder(cbo){
	var selected_info = {};
	var data_list = [];
	if(container){
		document.body.removeChild(container);
	}
	container = document.createElement("form");
	var do_submit = function(){
		if(selected_info.opt){
			selected_info.opt.selected = true;
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent('change', true, true);
			selected_info.opt.parentNode.dispatchEvent(evt);
		}
		document.body.removeChild(container);
		container = null;
	};
	container.style.position = "absolute";

	container.style.left = ((window.innerWidth - 300) / 2 + window.scrollX) + "px";
	container.style.top = (window.scrollY + 10) + "px";
	container.style.width = 300 + "px";
	container.style.height = 300 + "px";
	container.style.paddingTop = 10 + "px";
	container.style.paddingLeft = 10 + "px";
	container.style.backgroundColor = "#89abcd";
	
	var input = document.createElement("input");
	input.style.width = 200 + "px";
	container.appendChild(input);
	var btn = document.createElement("input");
	btn.type = "submit";
	btn.value = "OK";
	container.appendChild(btn);

	var btn_close = document.createElement("input");
	btn_close.type = "button";
	btn_close.value = "X";
	btn_close.addEventListener("click", function(){
		document.body.removeChild(container);
		container = null;
	}, true);
	container.appendChild(btn_close);

	var list = document.createElement("div");	
	list.style.backgroundColor = "#eeeeee";
	list.style.marginTop = 10 + "px";
	list.style.width = (parseInt(container.style.width) - parseInt(container.style.paddingTop) * 2) + "px";
	list.style.height = (parseInt(container.style.height) - 60) + "px";
	list.style.overflowY = "scroll";

	var opts = cbo.getElementsByTagName("option");
	for(var i = 0; i < opts.length; i++){
		var data = {};
		var opt = opts[i];
		var item = document.createElement("div");
		data.txt = _txt(opt);
		item.innerHTML = data.txt;
		item.style.border = "1px solid #cccccc";
		item.style.backgroundColor = "";
		(function(_item, _opt){
			_item.addEventListener("dblclick", function(){
				selected_info.item = _item;
				selected_info.opt = _opt;
				do_submit();
			}, true);
			_item.addEventListener("click", function(){
				if(selected_info.item){
					selected_info.item.style.backgroundColor = "";
				}
				_item.style.backgroundColor = "#d4e6fc";
				selected_info.item = _item;
				selected_info.opt = _opt;
			}, true);
		})(item, opt);
		list.appendChild(item);
		data.item = item;
		data.opt = opt;
		data_list.push(data);
	}
	container.appendChild(list);
	var filter_proc;
	var last_txt = '';
	filter_proc = function(){
		if(!container){
			return;
		}
		try{
			var txt = input.value;
			var is_first = true;
			if(txt != last_txt){
				last_txt = txt;
				var len = data_list.length;
				for(var i = 0; i < len; i++){
					var data = data_list[i];
					data.item.style.backgroundColor = "";
					if(-1 == data.txt.toLowerCase().indexOf(txt.toLowerCase())){
						data.item.style.display = "none";
					}else{
						data.item.style.display = "";
						if(!is_first){
							continue;
						}
						is_first = false;
						data.item.style.backgroundColor = "#d4e6fc";
						selected_info.item = data.item;
						selected_info.opt = data.opt;
					}
				}
			}
			setTimeout(filter_proc, 100);
		}catch(ex){
		}
	};
	filter_proc();

	container.addEventListener("submit", function(e){
		do_submit();
		e.preventDefault();
		return false;
	}, true);
	document.body.appendChild(container);
	input.focus();
}
function _attach_button(cbo){
	var btn = document.createElement("input");
	btn.type = "button";
	btn.value = "Suggest!";
	_insert_after(btn, cbo);
	btn.addEventListener("click", function(){
		_show_finder(cbo);	
	}, true);
}
var cbo_list = document.getElementsByTagName("select");
try{
for(var i = 0; i < cbo_list.length; i++){
	if(cbo_list[i].options.length < 30){
		continue;
	}
	_attach_button(cbo_list[i]);
}
}catch(ex){
	alert(ex.toString());
}
})();
