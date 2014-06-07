// ==UserScript==
// @name           Error Control Mode
// @namespace      klavogonki.ru
// @version        1.2.0 KTS
// @author         Fenex
// @description    No-Error Mode for Users Ditionaries
// @include        http://klavogonki.ru/g/*
// ==/UserScript==

ECM = function(name) {
    this.name = name;
    this.funcnames = {
        count: 2,        
        ls: 'KTS_ECM_',
        name: [false, false]
    };
    this.timer = false;
    this.errors = 0;
    this.gametype = false;
    this.ls_prefix = 'noerror_limit_';
    this.timer = setInterval(this.name+'.checkGame();', 1500);
	this.autorestart = false;
}

ECM.prototype.changeAutoRestart = function(elem) {
	if(elem.checked) {
		localStorage[this.ls_prefix+"autorestart"] = '1';
	} else {
		localStorage[this.ls_prefix+"autorestart"] = '0';
	}
	
	return;
}

ECM.prototype.checkGame = function() {
    this.test = game;
    if(!game||!game.params) {
        return false;
    }
    clearInterval(this.timer);
    this.timer = false;
	
    if(game.params.gametype=='noerror'||game.params.competition||(game.params.qual&&game.params.qual=='on'))
        return false;

    this.gametype = game.params.gametype;

    if(!this.checkGameFunc()) {
        document.getElementById('cs_noerrorall').innerHTML = "ERROR!";
	    document.getElementById('cs_noerrorall_less').innerHTML = " ";
        document.getElementById('cs_noerrorall_more').innerHTML = " ";
        document.getElementById('noerror-all').style.display = "";
		document.getElementById('ecm_pencil').style.display = "";
        return false;
    }

    this.changeErrorLimit(0);

    if(!localStorage[this.ls_prefix+this.gametype])
        localStorage[this.ls_prefix+this.gametype] = -1;
    this.errors = localStorage[this.ls_prefix+this.gametype];
    document.getElementById('noerror-all').style.display = '';
    this.timer = setInterval(this.name+'.startMonitoring();', 300);
	
	if(localStorage[this.ls_prefix+"autorestart"]=='1')
		document.getElementById('autorestart').checked = true;
	
	return true;
}

ECM.prototype.confirmFindFunc = function(e) {
    e.setAttribute('disabled', 'disabled');
    var a = this.write_func();
    if(a)
        alert('Операция выполнена успешно!\r\n\r\nЧтобы изменения вступили в силу, перезагрузите страницу.');
    else
        alert('Не удалось определить имена функций');
}

ECM.prototype.saveManFunc = function(e) {
    if(!e) {
        localStorage[this.funcnames.ls+'0'] = $('ecm_func_0').value = "";
        localStorage[this.funcnames.ls+'1'] = $('ecm_func_1').value = "";
        $('ecm_info_man').innerHTML = 'Имена функций удалены';
        return;
    }
    $('ecm_info_man').innerHTML = '';
    if(typeof(game[$('ecm_func_0').value])!='function')
        $('ecm_info_man').innerHTML += "<b>\""+$('ecm_func_0').value +"\"</b> не функция.\r\n";
    else {
        localStorage[this.funcnames.ls+'0'] = $('ecm_func_0').value;
        $('ecm_info_man').innerHTML += "Функция <b>\""+$('ecm_func_0').value +"\"</b> сохранена. ";
    }
    if(typeof(game.players[0][$('ecm_func_1').value])!='function')
        $('ecm_info_man').innerHTML += "<b>\""+$('ecm_func_1').value +"\"</b> не функция.\r\n";
    else {
        localStorage[this.funcnames.ls+'1'] = $('ecm_func_1').value;
        $('ecm_info_man').innerHTML += "Функция <b>\""+$('ecm_func_1').value +"\"</b> сохранена. ";
    }
}

ECM.prototype.editFuncName = function() {
    popalert("<div><h3 style='text-align:center;'><span style='cursor:pointer;' onclick='$(\"ecm_man\").hide();$(\"ecm_auto\").show();'>Автоматически</span> | <span style='cursor:pointer;' onclick='$(\"ecm_auto\").hide();$(\"ecm_man\").show();'>Вручную<span></h3></div><div id='ecm_auto'>В автоматическом режиме скрипт попытается сам определить имя функции. Во время выполнения операции браузер может подвиснуть. В случае неудачи можно ввести имена функции вручную в соответствующей вкладке.<br /><center><input type='button' onclick='ecm.confirmFindFunc(this);' value='Приступить' /></center></div><div style='display:none;' id='ecm_man'>Здесь можно вводить имена функций вручную, если автоматически получить не удалось. Имена функций будут выкладываться на форуме.<br />Function #1: <input type='text' id='ecm_func_0' /><input type='button' value='Отчистить' id='ecm_btn' onclick='ecm.saveManFunc(0)' /><br />Function #2: <input type='text' id='ecm_func_1' /><input type='button' value='Сохранить' id='ecm_btn' onclick='ecm.saveManFunc(1)' /><div id='ecm_info_man'></div></div><script>$('ecm_func_0').value=localStorage[ecm.funcnames.ls+'0'];$('ecm_func_1').value=localStorage[ecm.funcnames.ls+'1'];</script>");
}

ECM.prototype.startMonitoring = function() {
    if(this.errors != -1 && game.errors>this.errors){
		for(var l=0;l<game.players.length;l++){
			if(game.players[l].you){
				game.players[l][localStorage[this.funcnames.ls+'1']](); 
			}
		}
		game[localStorage[this.funcnames.ls+'0']]();
		
		if(localStorage[this.ls_prefix+"autorestart"] == '1') {
			if(!this.autorestart) {
				this.autorestart = true;
				if(chat)
					chat.leaveRoom('game'+game.id);
				window.location='/g/'+game.id+'.replay';
			}
			return;			
		}
		
		var you = document.getElementById("players").getElementsByClassName("you")[0];
		var children = you.childNodes;
		for (var i=0; i < children.length; i++) {
			if (children[i].id == "rating_loading") {
				children[i].style.display = "none";
                return;
			}
		}
	}
}

ECM.prototype.checkGameFunc = function() {
	var general_name_func = ['finish', 'errorKick'];
	if(game[general_name_func[0]]&&game.players[0][general_name_func[1]]) {
		localStorage[this.funcnames.ls+'0'] = general_name_func[0];
		localStorage[this.funcnames.ls+'1'] = general_name_func[1];
		return true;
	}
    if(!localStorage[this.funcnames.ls+'0']||!localStorage[this.funcnames.ls+'1']||localStorage[this.funcnames.ls+'0']==''||localStorage[this.funcnames.ls+'1']=='') {
        return false;
    } else if(!game[localStorage[this.funcnames.ls+'0']]||!game.players[0][localStorage[this.funcnames.ls+'1']]) {
        return false;
    }
    return true;
}

ECM.prototype.changeErrorLimit = function(value) {
    var ls_name = this.ls_prefix + this.gametype;
    if(parseInt(localStorage[ls_name])!=parseInt(localStorage[ls_name])) {
        localStorage[ls_name] = -1;
    }
	var c_limit = parseInt(localStorage[ls_name]);
	var c_limit_txt = "";
	c_limit += value;
	if (c_limit < 0){
		c_limit_txt = "выкл";
		c_limit = -1;
	}
	else {
		c_limit_txt = c_limit;
	}
    this.errors = localStorage[ls_name] = c_limit;	
	document.getElementById('cs_noerrorall').innerHTML = c_limit_txt;
}

ECM.prototype.find_func = function(name, m, str) {
    var s = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    for(var i=0; i<s.length; i++) {
        for(var j=0; j<s.length; j++) {
            for(var k=0; k<s.length; k++) {
                for(var l=0; l<s.length; l++) {
                    var tmp = s[i]+s[j]+s[k]+s[l];
                    //alert(str[0]+"\r\n|\r\b"+str[1]);
                    if(m==0&&game[tmp]&&str[0].test(game[tmp])&&str[1].test(game[tmp])) {
                        localStorage[name+m] = tmp;
                        return tmp;
                    }
                    else if(m==1&&game.players[0][tmp]&&str[0].test(game.players[0][tmp])&&str[1].test(game.players[0][tmp])) {
                        localStorage[name+m] = tmp;
                        return tmp;
                    }
                }
            }
        }
    }
    return false;
}

ECM.prototype.write_func = function() {
    var a = [[new RegExp('tlog\\(\\"Game\\:\\:finish\\"\\,\\{now\\:\\(new Date\\(\\)\\)\\.getTime\\(\\)\\,'), new RegExp('begintime_delayed\\:this\\.begintime_delayed\\}\\)\\;')], [new RegExp('a\\=\\$\\(\\"rating\\"\\+this\\.info\\.id\\)\\;'), new RegExp('a\\.update\\(strRatingFail\\)\\;')]];
    for(var i=0; i<this.funcnames.count; i++) {
        var tmp = this.find_func(this.funcnames.ls, i, a[i]);
        this.funcnames.name[i] = tmp;
        if(!tmp)
            return false;
    }
    return true;
}

var par_row = document.getElementById("param_metronome").parentNode.parentNode.parentNode.parentNode.insertRow(4);
par_row.style.display = "none";
par_row.id = "noerror-all";

var td1 = par_row.insertCell(0);
td1.innerHTML = "<img id='ecm_pencil' src='http://klavogonki.ru/img/pencil.png' style='cursor:pointer;display:none;' onclick='ecm.editFuncName();'/> Лимит ошибок:";
var td2 = par_row.insertCell(1);
td2.style.setProperty("text-align", "center", null);
td2.setAttribute('colspan', '2');
td2.innerHTML = '<span id="cs_noerrorall_less" style="font-weight:bold;color:#CF0C36;font-size:13px;cursor:pointer;" onClick="ecm.changeErrorLimit(-1);">&#171;</span>&nbsp;' +
					'<span id="cs_noerrorall" style="font-weight:bold;color:#11013F;font-size:13px;"></span>&nbsp;' +
					'<span id="cs_noerrorall_more" style="font-weight:bold;color:#74B30E;font-size:13px;cursor:pointer;" onClick="ecm.changeErrorLimit(1);">&#187;</span><span style="float:right;"><input type="checkbox" onchange="ecm.changeAutoRestart(this);" id="autorestart"/><label for="autorestart">Авто →</label></span>';

var s = document.createElement('script');
s.innerHTML = "";
var arr = ["ECM", "ECM.prototype.write_func", "ECM.prototype.find_func", "ECM.prototype.changeErrorLimit", "ECM.prototype.checkGameFunc", "ECM.prototype.startMonitoring", "ECM.prototype.checkGame", "ECM.prototype.editFuncName", "ECM.prototype.confirmFindFunc", "ECM.prototype.saveManFunc", "ECM.prototype.changeAutoRestart"];
for(var i=0; i<arr.length; i++) {
	s.innerHTML += arr[i] + " = " + eval(arr[i]) + ";";
}
s.innerHTML += 'window.ecm = new ECM("ecm");';
document.body.appendChild(s);
