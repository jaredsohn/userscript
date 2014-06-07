// ==UserScript==
// @name           ika-archive
// @namespace      ika-archive
// @include        http://*ikariam.*/index.php?view=diplomacyAdvisor*
// ==/UserScript==

	var body = document.getElementsByTagName('body');
    var newscript = document.createElement('script');
    newscript.setAttribute('type','application/javascript');
    newscript.setAttribute('language','javascript');
    newscript.textContent = '(function() {'+
	'  if (window.google && google.gears) {'+
	'    return;'+
	'  }'+
	'  var factory = null;'+
	'  if (typeof GearsFactory != "undefined") {'+
	'    factory = new GearsFactory();'+
	'  } else {'+
	'    try {'+
	'      factory = new ActiveXObject("Gears.Factory");'+
	'      if (factory.getBuildInfo().indexOf("ie_mobile") != -1) {'+
	'        factory.privateSetGlobalObject(this);'+
	'      }'+
	'    } catch (e) {'+
	'      if ((typeof navigator.mimeTypes != "undefined")'+
	'           && navigator.mimeTypes["application/x-googlegears"]) {'+
	'        factory = document.createElement("object");'+
	'        factory.style.display = "none";'+
	'        factory.width = 0;'+
	'        factory.height = 0;'+
	'        factory.type = "application/x-googlegears";'+
	'        document.documentElement.appendChild(factory);'+
	'      }'+
	'    }'+
	'  }'+
	'  if (!factory) { return; }'+
	'  if (!window.google) {'+
	'    google = {};'+
	'  }'+
	'  if (!google.gears) {'+
	'    google.gears = {factory: factory};'+
	'  }'+
	'})();'+
	'function getSelected()'+
	'{'+
	'    var selectedMsgs = new Array();'+
	'    var allInputs = document.getElementById("deleteMessages").getElementsByTagName("input");'+
	'    var b = 0;'+
	'    for (var i=0; i<allInputs.length; i++) {'+
	'         if (allInputs[i].getAttribute("type") == "checkbox") {'+
	'             if (allInputs[i].checked) {'+
	'                selectedMsgs[b++] = allInputs[i].name.replace("deleteId[","").replace("]","");'+
	'             }'+
	'         }'+
	'    }'+
	'    return selectedMsgs;'+
	'}'+
	'function archive_selected()'+
	'{'+
	'var db = google.gears.factory.create("beta.database");'+
	'db.open("database-ikaarchive");'+
	'db.execute("create table if not exists Msgs (Msgid int, Autor text, Subject text, Citylink text, City text, Datetime text, Msg text)");'+
	'    var ids = getSelected();'+
	' if(ids.length!=0){'+
	'	db.execute(\'BEGIN\');'+
	'    for(var i in ids)'+
	'    {'+
	'        var msg = document.getElementById("tbl_mail"+ids[i]).childNodes[1].childNodes[1].innerHTML;'+
	'        var info = document.getElementById("message"+ids[i]);'+
	'        var autor = info.childNodes[5].childNodes[0].innerHTML;'+
	'        var subject = info.childNodes[7].innerHTML;'+
	'        var city_link = info.childNodes[9].childNodes[0].href;'+
	'        var city = info.childNodes[9].childNodes[0].innerHTML;'+
	'        var date_time = info.childNodes[11].innerHTML;'+
	'		db.execute("insert into Msgs values (?, ?, ?, ?, ?, ?, ?)", [ids[i],autor,subject,city_link,city,date_time,msg]);'+
	'    }'+
	'	db.execute(\'COMMIT\');'+
	'}'+
	'	showArchive();'+
	'}'+
	'function deleteArchived(id)'+
	'{'+
	'	var db = google.gears.factory.create("beta.database");'+
	'	db.open("database-ikaarchive");'+
	'	var rs = db.execute("delete from Msgs where Msgid = "+id);'+
	'	rs.close();'+
	'	showArchive();'+
	'}'+
	'function showArchive(order_by)'+
	'{'+
	'	if(order_by===undefined) {order_by = "Datetime";}'+
	'	var oldArchive = document.getElementById("archive");'+
	'	if(oldArchive!=null) { oldArchive.parentNode.removeChild(oldArchive); }'+
	'	var db = google.gears.factory.create("beta.database");'+
	'	db.open("database-ikaarchive");'+
	'	var rs = db.execute("select * from Msgs order by "+order_by+" desc");'+
	'	var theader = document.getElementsByTagName("table")[1].childNodes[1].childNodes[0].innerHTML;'+
	'	var archiveData = "<h3 class=\'header\'><span class=\'textLabel\'>Poruke</span></h3><table style=\'width:100%;\'><tr>"+theader.replace("<th>Akcija</th>","")+"</tr>";'+
	'	while (rs.isValidRow()) {'+
	'		archiveData = archiveData+"<tr class=\'entry\' onmouseout=\'mout(this);\' onmouseover=\'mover(this);\' style=\'text-align:center;\' onClick=showMsg("+rs.field(0)+");><td><img src=skin/layout/down-arrow.gif id=msgi"+rs.field(0)+" /></td><td>"+rs.field(1)+"</td><td>"+rs.field(2)+"</td><td><a href="+rs.field(3)+">"+rs.field(4)+"</a></td><td>"+rs.field(5)+"</td></tr><tr id=msg"+rs.field(0)+" style=\'display:none;cursor:default;\' class=\'text entry\'><td colspan=\'5\' style=\'padding:5px;\'>"+rs.field(6)+"<div><input type=\'button\' class=\'button\' name=\'delete_it\' value=\'Izbrisi iz arhive\' onClick=\'deleteArchived("+rs.field(0)+");\' /></div></td></tr>";'+
	'		rs.next();'+
	'	}'+
	'	var selection = document.getElementsByClassName("selection")[0];'+
	'	var archive = document.createElement("div");'+
	'	archive.setAttribute("id","archive");'+
	'	archive.innerHTML = archiveData+"</table>";'+
	'	selection.appendChild(archive);'+
	'}'+
	'function mout(e) { e.bgColor="#FDF7DD"; }'+
	'function mover(e) { e.bgColor="#ECD5AC"; }'+
	'function showMsg(id){'+
	'	var state = document.getElementById("msg"+id).style;'+
	'	if(state.display=="none") {state.display = "";document.getElementById("msgi"+id).src = "skin/layout/up-arrow.gif";} else {state.display = "none";document.getElementById("msgi"+id).src = "skin/layout/down-arrow.gif";}}';;
	body[0].appendChild(newscript);
var cbox = document.getElementsByClassName('selection');
cbox[0].innerHTML = cbox[0].innerHTML + '<input type="button" class="button" name="archive_it" value="Dodaj u arhivu" onClick="archive_selected();" /><input type="button" class="button" name="archive_it" value="Prikazi arhivu" onClick="showArchive();" />';