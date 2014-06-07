// ==UserScript==
// @name           kds_optimizer
// @namespace      www.raphael-go.com
// @include        http://club.pchome.net/*
// ==/UserScript==

function disableByInstance(inst)
{
	if (inst)
		inst.style.display = "none";
}

function disableById(id)
{
	console.log("disableById: " + id);
	disableByInstance(document.getElementById(id));
}

function optimize()
{
	ids = ["kds-login-wrapper","top_content_kds","clubin-nav","test","right_content","at_wrapper","area","outside1","topic_type","_iCast3_flashdiv_main_32202_4495"];
	classes = ["nof","top-nav2","top_navs_con"];
	tag = ["div","br"];
	
	// Disable by id
	for (id in ids) {
		disableById(ids[id]);
	}
	
	// Disable by class name
	cs = {}
	for (c in classes) {
		cs[String(classes[c])] = true;
	}
	for (t in tag) {
		divs = document.getElementsByTagName(tag[t]);
		for (d in divs) {
			targetClass = String(divs[d].className);
			if (targetClass.length) {
				if (cs[targetClass]) {
					console.log("disableByClass: " + targetClass);
					disableByInstance(divs[d]);
					continue;
				}
			}
			targetId = String(divs[d].id);
			if (id.length) {
				if (/AD\d\d\d\d/.test(targetId)) {
					console.log("disableByPatternId: " + targetId);
					disableByInstance(divs[d]);
					continue;
				}
			}
		}
	}
}

function redirectThread()
{
	//group = document.getElementById("mytopics");
	links = document.getElementsByTagName("A");
	for (n=0; n<links.length; n++) {
		url = links[n].href;
		if (/http:\/\/club\.pchome\.net\/thread[0-9_.]+/.test(url)) {
			links[n].href = "javascript:null();";
			links[n].setAttribute("previous_href", url);
			links[n].onclick = function(evt, url){
				st = document.body.scrollTop;
				url = evt.target.getAttribute("previous_href");
				fr = document.createElement("iframe");
				fr.name = "kolz_fr";
				fr.style.width = "95%";
				fr.style.height = "95%";
				fr.style.position = "absolute";
				fr.style.left = "2%";
				fr.style.top = st + 10 + "px";
				fr.src = url;
				document.body.appendChild(fr);
				
				cb = document.createElement("input");
				cb.type = "button";
				cb.value = " CLOSE ";
				cb.style.fontSize = "20px";
				cb.style.color = "blue";
				cb.style.position = "absolute";
				cb.style.left = "2%";
				cb.style.top = st + "px";
				cb.setAttribute("fr", fr);
				cb.onclick = function(evt) {
					//t = evt.target.getAttribute("fr");
					//document.body.removeChild(t);
					frs = document.getElementsByName("kolz_fr");
					for (n=0; n<frs.length; n++) {
						document.body.removeChild(frs[n]);
					}
					document.body.removeChild(this);
				};
				document.body.appendChild(cb);
			};
		}
	}	
}


optimize();
redirectThread();