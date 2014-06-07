// ==UserScript==
// @name           Travian MP Percent Dependent Fill
// @version        0.1
// @description    Lets you fill Send Ressource Fields with one click. Amount of each ressource depends on how much of the total reasources each represents.
// @include        http://*.travian.tld/build.php?*
// ==/UserScript==

//Images
images = [];
images["0"]  = "R0lGODlhEgAMAOYAAP/////+/v/++/38+/369/v6+fHt6e/p4+7n4u/f1OPc1tjUz9rTy9zRyNrQxfzIi/fEnvTEkdLGvfa/i+/BcO6+btK9pPSzgOe1g9e4lu+0b+u1dvGxiNe4ht60eOqwdeSxd/qradCxguinb+WnatOnh9+mdOGked6jfuCmU9CnZrSqnuWgcNyicdija+aeYrukkdqgVNGbctGadeOXZM+afNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK+bibWYfr+UedCUSN6OWteSQbWVft2NRdqJRtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ+NLaBadt7OcF8T8l5SMZ1W8Z4Qq96UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVaLDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6Lw9mcoUJRykfFV51FBgqQms+hQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7";
images["0g"] = "R0lGODlhEgAMAOZaAG1tbYeHh319fYGBgf7+/nJycpSUlH5+fqGhoT09PWtra3R0dKSkpKamplJSUpKSkvj4+ISEhB4eHpaWljc3N6ioqIqKinNzc4uLi7W1tR8fH0RERMPDw0NDQzU1NS4uLsDAwGxsbGlpaXd3d7+/v2ZmZjQ0NBQUFJmZmdXV1X9/f7Kysqenp+Xl5aOjox0dHY2NjZCQkCgoKGNjY2pqaoKCgisrK4iIiGFhYbOzsxsbG7CwsM7OzpOTkyIiIl9fX6qqqrm5uWBgYMLCwuDg4F5eXpubmxwcHJqamoaGhpGRkb6+vqKiont7e/39/fr6+nV1dd7e3omJiUFBQVxcXI6OjhkZGZWVlbu7u4ODg////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFoALAAAAAASAAwAAAeRgFqCg4SCPBVRBIqFgzAAKgETBQpZCkuMWhwABlhJCTZVIhQQjE0zBhhUPh8sERItjAEPMUAUGkUYNC8DjAUBLghSCT9IIR4ChRAbPQsHFhcOQSUyJ0SDTwITGQUOR1Y3DyRTEoUpAldMO0I6OQ1KAyYHhSAXAw1QCys1DBUoFpgRRnRAMEQLAwA4jDjBxLBhIAA7";
images["1"]  = "R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT+rl48JrQtivpbaIZ96FXI9YSOjGr+m1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u+sqFWLubhwLteNP///8iwlNJpRcmKacldMNdrNeSJY9JuS6VkT+17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNephfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu/mz8xvS/B+W8lyQOzMsfR+Q+qDVqxmTPDHp/fy6+ZrQMyZZrdtS+R1U86betSunNh9WeaWaNFgK9uzo7+Pcei0kp5bOtdxOeR6S869tNBZF//69o9jVu6BPqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh+Uu6GVMxyQpNaOPLWxdBrP7eLdOa1jORmN+ZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V+aLVb1rSv///wAAAAAAAAAAAAAAACH5BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1FnXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA+DhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpKXipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE+PJkQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7";
images["1g"] = "R0lGODlhEgAMAOZTAGRkZICAgGhoaGBgYH19faenp8DAwLi4uJ6enl1dXWlpaZubm9fX11RUVPn5+aOjo5iYmHx8fFNTU3h4eHl5eUZGRmxsbLu7u2ZmZnBwcNra2kpKSm9vb1xcXPT09GdnZ2tra1ZWVlBQUFtbW6KiorW1tYuLi1dXV5GRkfDw8Pj4+I2NjaamplhYWJSUlHd3d5eXl8vLy6+vr4KCgq2traWlpcHBwePj46ioqG1tbYSEhERERE1NTdzc3FJSUoiIiIODg0tLS9XV1X9/f2JiYsXFxYyMjL+/v19fX0hISKGhodLS0qysrO3t7Xt7e+/v73R0dHV1dczMzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFMALAAAAAASAAwAAAexgFOCgg4qg4eIgykBFwYGMUIeiYcaAAUdPgBRR5OCMg9QMBwKESsXnVMmRTcQUTMoBU4QUpKDDFI/FC0AIwobFQ0fBAeHOBoHEwkWAQQNA1AREzWHD0s9FAJQQEYJUVFQUFFKDoIFJxlRAr8iSB88OyEDUSxNUzZJIwIBIhI5GC8SglgYQkAHgylSQjToAEJAAgwAQCggMiADhwAHHTxwsWCBARoIECw4UIIECQRMngQCADs=";
images["2"]  = "R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM/EtFJKPv///7Ozqj05NIR5aPDu62VXT+jeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSsoCAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S+PULBAA7";
images["2g"]  = "R0lGODlhEgAMAOYGAA4SDOvhzaaOdXZrXM/EtFJKPgAAALOzqj05NIR5aPDu62VXT+jeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAYALAAAAAASAAwAAAd9gAaCg4SFhocbCoeLEghKBxsSG4c9RCUoCAB/QEQbk4QWBw8HJUgAAEgID0QPoEpKSCUlQKoTSLdAhEsItEooE49EKEgPRYQPjq9KE0BFAEUHRAiEG69IsEATKBsIG0uGS0q0qEoIRArfhju/LkouBz093weUEkQ9g/SC6YEAOw==";
images["3"]  = "R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7";
images["3g"] = "R0lGODlhEgAMAOYAAFZWVvDw8MXFxaenp5GRkYKCgoWFhd/f33BwcKWlpf///7S0tIaGhtDQ0Ojo6KKior29vbW1tYODg/b29piYmJiYmLOzs87OztbW1nt7e8LCwuTk5JmZmbKysqamplxcXMDAwO/v74GBgff394+Pj9fX19HR0b+/v4qKip2dnc/Pz5aWlufn5+7u7ra2trKysqurq6urq+Li4u7u7r6+vpGRkcXFxYGBgc/Pz+bm5ri4uNHR0bOzs/r6+ouLi9jY2L6+vvLy8vj4+NHR0fLy8tvb2+fn51lZWd/f37m5uerq6rW1taioqMHBwaKiore3t7Ozs+bm5v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7";
images["switch"] = "R0lGODlhNAAMAOZuAP/+/vv49v7+/eLi4vXu6btjOvLu68p1U+/QvtpwRu/p5fDXzvbw67N2UNpwSvfu6f7+/q5sTerp6MOkg/379ceZaMuYc65mRF1QQ896SfPg2d1rMb6AXtdxPnRkU8+OZcWVd7yxpu3SxbR/V8iTbsu/t9itgZB7aPDZ0MO2rr50TM+RXt+ib+bm5qGNevDZy+FwR4FyaO/Z0suGRHBkWZVcP+XDo/z7+1NHQPb29r5mOufh28fAtOTh2LBxVW5aSOeuda13T+CoaNJ/VaRzTbSwqObj4J9/aUAzJrZkSM6tk7+EUf79/OLb1j47L4aGge7r6Nra2uzg2fHn4PPk3fjx7LxySPLk2717YnRsXstxSdSZfNi3mXtOK+3Xzu/p4uPj48duSvPv69R3UO2TbLuNderQtVNIQd7Pw/n08fz8/Pjv6NelftnZ2f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG4ALAAAAAA0AAwAAAe0gG6Cg4SFhoJqUA9SL2mHj49tkJOCAWhsREERCjcSTz0UlIZtkqKHYjYsNQ0jKTslZ05ZPKaEpLe4ubdRggAESjNLJBZYWz8uJzFIGIO6zs/QbWCCa0BCXRVcIGMfRzQeOCFNgjnR5tEDggwrJl9mHB0ZFzBlRUYCgy3nt7WFEFNVDEwYokOFliQHEADox5BSgAIbrIRJ4MMBGSYNMx4S4EXEFRkoqCzQsFCjyZMoU6pceTIQADs=";
images["switchg"] = "R0lGODlhNAAMAOZZAP7+/m9vb21tbWJiYtXV1c/Pz5eXl83NzZOTk/39/VtbW2pqalhYWH9/f2RkZNvb2/r6+ujo6OHh4evr6zw8PCsrK2tra8zMzGlpacbGxpKSkn19ferq6vz8/IODg4CAgFpaWuPj44yMjPDw8GBgYFxcXG5ubjIyMrOzs6ioqNzc3Pb29tTU1CwsLJ6ennV1dd7e3r+/v/X19R0dHV5eXkhISODg4NbW1lFRUVZWVtfX15qamt/f3+np6WxsbPLy8sPDw0NDQ8XFxUlJSYiIiI2NjWNjY6SkpHZ2dnBwcOzs7CEhIXNzc+fn56mpqcrKyp+fn9jY2Pn5+URERDg4OGdnZ4SEhMnJycjIyP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFkALAAAAAA0AAwAAAfHgFmCg4SFhoIQIT0EBSOHj49YkJOCMjEaCiQgEhA8AyxSlIZXkqKHESgINQMYLgROLUtDKaaEWLekWLm4V7lXT4IAEQYvAQ1WC0QUJiU4MyeDure6u9PS077WuzeCHFAGVB5HHwEbRkFTFQYHgj/W0r7V19jZpASCEw07NkACPgE5kiBBoAPAoAfZqPHqVarWoAQwlDQRwUSBgyoMFggx6LDjpBUMLAxwIICGgCIdPKo8lOBChgcFCqg4EIXjyps4c+rcyfNmIAA7";

if ( document.getElementById("r1") ) {
	var res_table = document.getElementById("r1").parentNode.parentNode.parentNode;

	var newTr = document.createElement("tr");
		var newTd = document.createElement("td");
		newTd.setAttribute("colspan", "5");
		
			var newImg = [];
			
			newImg[0] = document.createElement("img");
			newImg[0].setAttribute("src", "data:image/gif;base64,"+images["0"]);
			newImg[0].style.cursor = "pointer";
			addEvent( newImg[0], 'click', function(){ switch_mode(0); } );
			newTd.appendChild(newImg[0]);
			
			newImg[1] = document.createElement("img");
			newImg[1].setAttribute("src", "data:image/gif;base64,"+images["1"]);
			newImg[1].style.cursor = "pointer";
			addEvent( newImg[1], 'click', function(){ switch_mode(1); } );
			newTd.appendChild(newImg[1]);
			
			newImg[2] = document.createElement("img");
			newImg[2].setAttribute("src", "data:image/gif;base64,"+images["2"]);
			newImg[2].style.cursor = "pointer";
			addEvent( newImg[2], 'click', function(){ switch_mode(2); } );
			newTd.appendChild(newImg[2]);
			
			newImg[3] = document.createElement("img");
			newImg[3].setAttribute("src", "data:image/gif;base64,"+images["3g"]);
			newImg[3].style.cursor = "pointer";
			addEvent( newImg[3], 'click', function(){ switch_mode(3); } );
			newTd.appendChild(newImg[3]);
			
			var newA = document.createElement("a");
			newA.setAttribute("href", "javascript:void(0);");
			newA.innerHTML = "Fill Up<br/>";
			addEvent( newA, 'click', function(){prop_fill();} );
			newTd.appendChild(newA);
			
			newImg["switch"] = document.createElement("img");
			newImg["switch"].setAttribute("src", "data:image/gif;base64,"+images["switch"]);
			newImg["switch"].style.cursor = "pointer";
			addEvent( newImg["switch"], 'click', function(){ switch_mode("switch"); } );
			newTd.appendChild(newImg["switch"]);
			
		newTr.appendChild(newTd);
	res_table.appendChild(newTr);
	
	var r = [];
	for ( i = 0; i < 4; i++ ) {
		r[i] = parseInt(document.getElementById( "l"+(4-i) ).innerHTML.split("/")[0]);
	}
	
	var marketinfo = [];
	marketinfo[0] = document.getElementsByTagName("script")[1].innerHTML.replace(/\n/g, " ");
	marketinfo[1] = document.getElementsByTagName("script")[2].innerHTML.replace(/\n/g, " ");
	
	var regex = /<!-- var haendler = ([0-9]+); var carry = ([0-9]+); \/\/-->/g;
	if ( regex.exec(marketinfo[0]) ) {
		h = RegExp.$1;
		c = RegExp.$2;
	} else if ( regex.exec(marketinfo[1]) ) {
		h = RegExp.$1;
		c = RegExp.$2;
	}
}

var mode = [];
mode[0] = 1;
mode[1] = 1;
mode[2] = 1;
mode[3] = 0;
mode["switch"] = 1;

function switch_mode(j) {
	if ( j == "switch" ) {
		
		if ( mode["switch"] == 1 ) {
			for ( i = 0; i<3; i++) {
				newImg[i].setAttribute("src", "data:image/gif;base64,"+images[i+"g"]);
				mode[i] = 0;
			}
		} else {
			for ( i = 0; i<3; i++) {
				newImg[i].setAttribute("src", "data:image/gif;base64,"+images[i.toString()]);
				mode[i] = 1;
			}
		}
		
	} else {
		
		if ( mode[j] == 1 ) {
			newImg[j].setAttribute("src", "data:image/gif;base64,"+images[j+"g"]);
			mode[j] = 0;
		} else {
			newImg[j].setAttribute("src", "data:image/gif;base64,"+images[j.toString()]);
			mode[j] = 1;
		}
		
	}
	
	if ( mode[0] && mode[1] && mode[2] ) {
		newImg["switch"].setAttribute("src", "data:image/gif;base64,"+images["switch"]);
		mode["switch"] = 1;
	} else {
		newImg["switch"].setAttribute("src", "data:image/gif;base64,"+images["switchg"]);
		mode["switch"] = 0;
	}
}

function prop_fill () {

	res = 0;
	for ( i = 0; i <= 3; i++ ) {
		if ( mode[i] == 1) {
			res += r[i];
		}
	}
	
	rf = [];
	for ( i = 1; i <= 4; i++ ) {
		rf[i] = document.getElementById("r"+i);
		
		if ( mode[i-1] == 1) {
			if ( Math.floor(h*c*r[i-1]/res) < r[i-1] ) {
				rf[i].value = Math.floor(h*c*r[i-1]/res);
			} else {
				rf[i].value = r[i-1]
			}
		} else {
			rf[i].value = "";
		}
	}
	
}

/* Helpers */
function xpath(xp) {
    return document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addEvent( obj, type, fn ) {	
	if (obj.addEventListener)
		obj.addEventListener( type, fn, false );
	else if (obj.attachEvent) {
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
	}
}

function removeEvent( obj, type, fn ) {
	if (obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else if (obj.detachEvent) {
		obj.detachEvent( "on"+type, obj[type+fn] );
		obj[type+fn] = null;
		obj["e"+type+fn] = null;
	}
}