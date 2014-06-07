// ==UserScript==
// @name The West - Centrează pe muncă
// @namespace http://userscripts.org/users/120392
// @description Acest script va crea un buton pe care dacă îl veţi apăsa veţi fi trimis direct la locul de muncă pe care îl efectuaţi în acel moment.
// @author JoeSmith
// @include http://*.the-west.*/game.php*
// ==/UserScript==

var resourceBundle = "{'center.popup':'Arată pe hartă'};";

function init() {
	var that = this;
	
	Tasks.generate_queue_xhtml_centerJobs = Tasks.generate_queue_xhtml;
	Tasks.generate_queue_xhtml = function(options) {
		var table = Tasks.generate_queue_xhtml_centerJobs(options);
		if(Tasks.tasks.length > 0) {
			var lastPos = Tasks.last_pos;
			var workingCoords = new Array();
			for(var i=0; i < Tasks.tasks.length; i++){
				var obj = Tasks.tasks[i];
				if(obj.type == 'way'){
					lastPos = {x:obj.data_obj.to_x, y:obj.data_obj.to_y};
				} else {
					workingCoords.push(lastPos);
				}
			}
			var tds = $ES('td', $E('tr', table));
			for(var i=0; i < workingCoords.length; i++){
				var td = tds[i];
				var div = $E('div', td);
				
				var center = new Element('img',{title:'',src:'images/icons/center.png',styles:{position:'absolute',top:'5px',left:'63px', width:'20px', cursor:'pointer'}});
				center.addMousePopup(new MousePopup(that.resourceBundle['center.popup'],100,{opacity:0.9}));
				center.addEvent('click',function(pos){
					WMap.scroll_map_to_pos(pos.x, pos.y);
				}.bind(this, [workingCoords[i]]));
				center.injectInside(div);
			}
		}
		return table;
	}	
}


var centerJob_script = document.createElement('script');
centerJob_script.type='text/javascript';
centerJob_script.text =  'if(window.CenterJob == undefined) {\n';
centerJob_script.text += '  window.CenterJob = new Object();\n';
centerJob_script.text += '  CenterJob.init = ' + init.toString() + '\n';
centerJob_script.text += '  CenterJob.resourceBundle = ' + resourceBundle + ';\n';
centerJob_script.text += '  CenterJob.init();\n';
centerJob_script.text += '}';
document.body.appendChild(centerJob_script);