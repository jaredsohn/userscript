// ==UserScript==
// @name       Alliance chat inner
// @version    1.1
// @description  enter something useful
// @include    http://founders.icedice.org/g.php?m=main
// @exclude    http://founders.icedice.org/g.php?m=alliances&a=chat
// @copyright  2014+, LostAngel
// ==/UserScript==

function getXmlHttp(){//Функция возвращает объект для загрузки других страничек
    var xmlhttp;
    try {
       xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!="undefined") {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

var s;
var s1;
var idx;
var idx2;
var ScriptText;
var ScriptTag = document.getElementsByTagName('script');
var HideDiv;
var httpRequester = getXmlHttp();	//Получим объект для загрузки данных
    if(!httpRequester) {				//Не удалось получить - выходим :(
        System.exit(0);
    }
    httpRequester.open("GET", "http://founders.icedice.org/g.php?m=alliances&a=chat", false);
    httpRequester.send(null);
    s = httpRequester.responseText;						//Получили текст странички с чатом
    idx = s.indexOf('<div class="gamepostcontent">')+1;	//Найдем где начинается "содержание страницы"
	if(idx) {
        s = s.substr(idx);								//Обрежем до содержания
        idx = s.indexOf('<tr')+1;						//Найдем 1-ю строку - заголовок чата
        s = s.substr(idx);								//Обрежем до нее
        idx = s.indexOf('<tr')+1;						//Найдем 2-ю строку - сообщения чата
        s = s.substr(idx);								//Обрежем до них
        idx = s.indexOf('&');							//Начало сообщений
        idx2 = s.indexOf('</td>')+1;					//Конец сообщений
        s = s.substr(idx, idx2-idx);					//Обрежем
        idx = s.lastIndexOf('<br');						//Последнее вхождение
        s = s.substr(0, idx);
        HideDiv = document.createElement("Div");
		HideDiv.innerHTML = s;
        HideDiv.id = "ChatDiv";
        HideDiv.setAttribute('style', "display: none;");
            
        ScriptText = 'function GetNextMessage(N) {\n';
        ScriptText+= '	s = document.getElementById("ChatDiv").innerHTML;\n';
        ScriptText+= '	s1 = "";\n';
        ScriptText+= '	for(i=0; i < N; i++) {\n';
        ScriptText+= '		idx = s.lastIndexOf("<br");\n';
        ScriptText+= '	    s1 = s.substr(idx)+s1;\n';
        ScriptText+= '	    s = s.substr(0, idx);\n';
        ScriptText+= '	}\n';
        ScriptText+= '	s = \'<table class="filled" width="500" border="1" cellspacing="0"><tbody><tr><td align=center><b><a href="g.php?m=alliances&a=chat">Чат альянса</a></b></td></tr><tr><td>\'+s1.substr(4)+\'</td></tr>\';\n';
        ScriptText+= '	s = s+\'<tr><td><a href="javascript:GetNextMessage(\'+(N+1)+\')">Больше сообщений</a></td></tr></tbody></table>\';\n';
        ScriptText+= '	document.getElementById("ChatAdd").innerHTML = s;\n';
        ScriptText+= '}\n';
		
		//Доавим скрипт
	var Script = document.createElement("Script");
		Script.setAttribute('type', 'text/javascript');
		Script.innerHTML = ScriptText;
		document.getElementsByTagName("HEAD")[0].appendChild(Script);
        
        s1 = '';
        for(i=0; i < 3; i++) {
			idx = s.lastIndexOf('<br');						//Последнее вхождение
            s1 = s.substr(idx)+s1;
            s = s.substr(0, idx);
        }
		var Divs = document.getElementsByTagName('div');
		for(i = 0; i < Divs.length; i++) {
			if(Divs[i].className == 'gamepostcontent') {
                s = '<center id="ChatAdd"><table class="filled" width="500" border="1" cellspacing="0"><tbody><tr><td align=center><b><a href="g.php?m=alliances&a=chat">Чат альянса</a></b></td></tr><tr><td>'+s1.substr(6)+'</td></tr>';
                s = s+'<tr><td><a href="javascript:GetNextMessage(4)">Больше сообщений</a></td></tr></tbody></table></center><br>';
                s = s + Divs[i].innerHTML;
                Divs[i].innerHTML = s;
                Divs[i].appendChild(HideDiv);
				break;
			}
		}
    }