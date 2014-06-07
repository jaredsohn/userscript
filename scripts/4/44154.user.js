// ==UserScript==
// @author Chamie (chamie.vk.com, chamie.vkontakte.ru)
// @name vk_quickphotos_debug
// @include http://vkontakte.ru/photo*
// @include http://www.vkontakte.ru/photo*
// @include http://vk.com/photo*
// @include http://www.vk.com/photo*
// @version 1.4.1.1
// @description Если у вас не работает vk_quickphotos
// ==/UserScript==

//For debug purposes:
function analyze(obj){
    txt="";
    for (i in obj) txt+=i+" = "+obj[i]+"\n";
    alert(txt);
}
//:for debug purposes.


var qp= //Гы-гы, инкапсуляция, типа ;)
{
    version      : "1.4.1.1",  //Версия скрипта
    releaseDate  : "30 июля 2010",//Дата выпуска
    debug        : true,
    pagesize     : 100,         //Превьюшек показывается за раз.
    current_page : 0,           //Текущая "страница" превьюшек
    //Страницы нумеруются С НУЛЯ, как и номер фотографии. А вКонтактовское this_id - от единицы.
    show_qnav    : true,        //Флаг "показывать полосу навигации"
    scatter      : false,       //Флаг "разбрасывать" фотографии - случайный поворот для каждой.
    useHD        : true,        //Флаг "Использовать максимальное доступное разрешение".
    HDavailable  : false,       //Флаг "доступны HD фотографии" - включается там, где доступен AJAX-интерфейс
    storeIn      : "WS",        //Указывает, где хранить настройки. Варианты: "WS" (WebStorage), "GM" (GreaseMonkey), "Ck" (Cookies).
    isMozilla    : typeof(unsafeWindow)!="undefined",
    aboutBox     : null,
//Картинки, закодированные в BASE64:
    helpImg      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADdYAAA3WAZBveZwAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAACWUlEQVQ4T21SW0jTcRTezC5WD0WEPRjt4m2TNLdaUTlTh61dnW1ziXbx1t1tkZRvXaj9/1u2TW2bzZxWRNRTQUg+2WOj6KECGUE9GEkv4kuLUr7O7y+ODfrBBz/OOd+5fOeIRFlPYvAVSo1cv9zEJYst/ILczC/IjFxSavT1M192bOZPzloKTqlcIWg7o6jtjGH/iXtQHQtD0XwHxWY+xWJyyGRQlzUFZg91xWC8OIbD50bReDaO+p4R7G0fFshKIpda/LNSg08tkKmFglKrf6qmIwKrZxzm3gSe  TH7Am+QMPqa+4+nke+xrH0TF0QFQcpRY/FOMI5KbeE21K7Ro9UzA7E7A4h7Hy+nPcHqisF2aQPr3X5y+9giUHDQzym2BRZmJ04gog7emI4om7wQaeu6j0hGkrDwkR26h8Uwcv9J/cPxKHBLDbYIP5ctVvSIqz9V1j1A7w6BMgpOBVf705QcePJ9GmelGxq6w0axWP8eIfZWOuxnHCjHx4h2aLwxhh/5mjk/JZrUG+kQlVr+WiEsrBFJYqNx1/Rn2uAJsDaC9gvYLUhRVzuASjaJlqm7c1RJ6u6wYL8i+u3UQM19/YiDxGtUtQRYsqLqTOmOxjCOshHrW0Yzz6tYwNG1DOHAygqvhV7C7Y3QIURw8FRFshHkSRpdzBFTR  Ttcypz8/KhyBifZpJoHYbi20JhJwjgrY/3d2+dvrLqtUTv5hfXfkm7l3LM3QQH+Vg3tcpPWwi1lDyMsmM8MmQpF41Wrlui0y3YZtFa71hYq2tZslenFefhX5pISthAKC+B82iUWs45lmCQAAAABJRU5ErkJggg==",
    prefsImg     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMAgMAAAArG7R0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACVBMVEUAAABFaI5FaI6pR484AAAAAnRSTlMAf7YpoZUAAAAzSURBVAgdY2DgmsDAoOXAwKDJCKTdgHgWA8OqVQxMq1YwcK0AchcAuQ0MDFkMDAwSDAwAvVMIM8COPUUAAAAASUVORK5CYII%3D",
    newVersionImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAUCAYAAAAOTSQ2AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdwAAAHcBnDzE7AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASnSURBVEjHtZZ7TFtVHMd7b9vblr5L1weUUVo6uCBQ3CKPydzAidkYUAEdc8kmU4eCwNiDZSE%2BEs2WRTdlGJJpFmccbstMlsz9QRZjSBR0MUZj1JgImTEzy%2FxjbotUhwa%2Fv%2Fq7yU1tlwGzySf3nHN7zv2e3%2BsczdzcnGY%2BFG%2FcJ93mXQD45rtmOuYrTADNKcZtoAXUpplnASHgB%2FpFiSMRacZXgz5VXw%2FqwAugFSgb8IAyUA82gRpgvyuWw0K6ZCuwdYZAL%2FfLwSA4APaxSBLSD3bR%2F8A6kA2cKhwq7IwtlUVv58JXQFTV3w7eBs%2BDHeB18CqLexm8yGL3srg%2B0A06wZNgK3gcNIBqUMTCSZg4r5jDhI6c6tiYPsN2EO1i8A6JC63dOuoMRyeCaza9uwBxG8EaXs9L1tJoNN3gsbTi2Nz%2BJHErLf7wJUycy65oOK2Ic0WWT9LY0pq20QWI28wCKT6bvdHaPlpLK5kucLJkUNz%2Bx3IUY2AA5HN%2FCax2gyabXP7LirgMd2BKELWzRY8ODC1SXJPB6jpK64t66Qj6mfRN4GaRYrIrKcPO0MfgthqaqBCs3XyWxGGXNyWr6xcl5pYUrzyX4c7%2BxmDNnPaV1x0PVDYOS2bHlKdk1Vskzi1Xj2CTP0Qann2GxJk9uWcki3MSm4vpjJavaW2DLbMrVYVIFWtLwbFAVdOnNNGalT9FT4sv78fI%2Bs4T1LYFCr4ica7Iio9gxVsWf%2BgiBFxG%2B0%2FMG6b%2F2HOLz8qtu3q1esPVRGhUNg5ig89pBGEWa71HbtVKxin04%2Fnrtm9Af0VyudGwGclibpVApyNY8gktGq7v%2BFBvtl8TBPFvt1yZEOwtWz0WqI6dorYjVPYxrDwiWRw%2F4WPXkDD7eVNjjrzSUySG%2Bm656jBC4ryg1V1ftqGLsrZZ1Oqv6ozmMTp1OOZkCitgVCeEmWvSSxxHXRD0hajT%2F4H2SU%2FpAxP0ASx8i56h%2Bo7j%2BPCE4nJBFGfJrTn3t7wpt%2BwcTMRpZtZnmH8dIs9B4F9Irg%2FwvzieJ5SEwIbjyHwq4J6kU8hKglO51QfaEaQzSIQrJE5u2zMK98z8G7yGGYwNG53eaXJpQXPvoeSEwHhcgMVEnfQb3veQazH2OzZ3Y1lj9xZFHKzZjs08jPYqKvx3VOfwyyMhsN4IZ9pRZ7j8S87cSyTOnlv0ecKtwZJxX%2FmDJxF3k4o4JM2v9A5WoXLTiXW%2BS7g6OzKqZCtcfBoW%2FRZPKsYVoDCtODYlFcd6d2HFEewy7o3WkQv2gzew4%2FephDhD0YskLvTQE8fgyp8V18KS3xfGdlBY7IWYaa3BdAUZ2UPisKFxirWCpp4O9NeTOGTsOObdBCROBGE60u70hBC5ONNtYjmfnTGwhWtZopQgg4cKW3YeULtVbt09gFDoV%2Bqc3Lb7aWTuNjoOgQE8QpcBCJOSvmla0JUJE3N413sAFc3X%2BMCnM7eND32lCPfzGRoB2xhZtdZ9oHRR9znO4iK%2B%2BqwF94IgH9aCKruqWNhTXK9M%2FO4eHstLWpfKV%2B5dvWymEE%2FXnXa2qD%2FFe7qAZqWZa%2FjfxJF1uGBq07x3qQv7QvgH%2B0e2sK%2BIFOgAAAAASUVORK5CYII%3D",

selectCurrent : function (num){//num - номер фотографии ОТ НОЛЯ! (this_id - от единицы).
        //обработка выходов за края массива:
        if(qp.debug) alert("selectCurrent("+num+"); btw, ph.length="+ph.length);
	num = (num>0)?num:ph.length;//отправляем в конец вместо позиции "до начала"
	num = (num>=ph.length)?0:num;//отправляем в начало вместо позиции "после конца"
	if(qp.debug) alert("Num recalculated to "+num);

	if(qp.current_page != Math.floor((num)/qp.pagesize))//если текущая страница не включает выбранную фотографию
		qp.showNavBar(Math.floor((num)/qp.pagesize));//то отображаем нужную страницу миниатюр
	num = (num%qp.pagesize);
	var tds = ge("qp.row").getElementsByTagName("td");
	for(var i = 0; i<tds.length;i++){
		if (i == num){
			tds[i].style.borderWidth="3px";
			tds[i].style.borderStyle="solid";
		}
		else{
			tds[i].style.borderWidth="1px";
			tds[i].style.borderStyle="dashed";
		}
	}//центрируем миниатюру выбранной фотографии
	ge("qp.quickBrowse").scrollLeft=(num-1.7)*136;//сдвиг на 1.7 превьюхи. Это примерно расстояние до центра
},
handleHash : function(){
    if(qp.debug) alert("Hash changed");

    var cur_photo = window.location.hash.replace("#photo/","");
    for(var i = 0;i<ph.length;i++)
        if(ph[i][0]==cur_photo)
            qp.selectCurrent(i);
},
showAllLarge : function(){
    wnd = window.open();//Всплывающее окно нужно открывать сразу, а не после ответа сервера
    wnd.focus();        //чтобы браузер не блокировал его, а считал непосредственной реакцией на нажатие.
    done=function(a,text){
        doc=wnd.document;
        var arr = eval(text);
        txt="<html><head><title>Все фото</title><body>";
        for (i=0;i<arr.length;i++){
            txt+="<a href='http://"+window.location.host+"/photo"+arr[i][0];
            txt+="' title='Перейти к странице фотографии'>";
            txt+="<img src='"+arr[i][arr[i].length -1];
            if (qp.scatter) txt+="' style='"+((qp.isMozilla)?"-moz":"-o")+"-transform:rotate("+(Math.random()*10-5)+"deg);"+((qp.isMozilla)?"-moz-":"")+"box-shadow:0px 0px 15px rgba(0,0,0,0.7);";
            txt+="'></a>\n";
        }
        txt+="</body></html>";
        if(qp.debug) alert(txt);
	doc.open();
        doc.write(txt);
        doc.close();
    }
    var nativeViewerCall = " "+ge("maximize").getAttribute("onclick"); // "return showPhotoViewer(UserID, AlbumID, 'UserID_PhotoID', [4, 5]);"
    var arr= nativeViewerCall.split("showPhotoViewer(")[1].split(", '")[0].split(", ");// в итоге получаем UserID и AlbumID
    if (!qp.isMozilla){
        req = new Ajax(done);
        url="http://"+window.location.host+"/photos.php";
        params={"act":"a_album",
                "oid": arr[0],
                "aid": arr[1] //ph[0][1].split("/")[4]
        };
        req.get(url,params);
    }
    else{//Боже, сколько костылей из-за этого Грисманки...
        req = new XMLHttpRequest();
        req.onreadystatechange=function(){if (req.readyState==4) if(req.status >=200 && req.status < 300) done(null,req.responseText);}
        url="http://"+window.location.host+"/photos.php?act=a_album&oid="+arr[0]+"&aid="+arr[1];
        req.open("GET",url,true);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send("");
    }
},
showAll : function(){
        if(qp.debug) alert("I'm in showAll()");
	wnd = window.open();
	wnd.focus();
	wnd.document.open();
	txt = "<html><head><title>Все фото</title>";
	txt+="</head><body>";
	for (i=0;i<ph.length;i++){//window.location.host чтобы работало и с vkontakte.ru, и с vk.com
		txt+="<a href='http://"+window.location.host+"/photo"+ph[i][0];
		txt+="' title='Перейти к странице фотографии'>";
		txt+= "<img src='"+ph[i][2]
                if (qp.scatter) txt+="' style='"+((qp.isMozilla)?"-moz":"-o")+"-transform:rotate("+(Math.random()*10-5)+"deg);"+((qp.isMozilla)?"-moz-":"")+"box-shadow:0px 0px 15px rgba(0,0,0,0.7);";
		txt+="'></a>\n";
	}
	txt+="</body></html>";
	wnd.document.write(txt);
	wnd.document.close();
},
showNavBar : function(page){
        if(typeof(page)=='undefined'){
		page = Math.floor((this_id-1)/qp.pagesize);
		qp.current_page = page;
	}
	var parent = ge("photoborder");
	if (ge("qp.quick_nav_wrapper")){
		parent.removeChild(ge("qp.quick_nav_wrapper"));
	}
	var wrapperDiv = document.createElement("div");
	wrapperDiv.style.width="100%;";
	wrapperDiv.align="center";
	wrapperDiv.id="qp.quick_nav_wrapper";
	var bar = document.createElement("div");
	bar.id ="qp.quickBrowse";
	bar.style.width="97%";
	bar.style.overflow="auto";
	//Добавляем ссылку для перехода к прев. странице превью:
        if(qp.debug) alert("Page is: "+page);
	if(page){
		var goUpDiv = document.createElement("div");
                var linkUp = document.createElement("a");
                linkUp.addEventListener("click", function(){qp.showNavBar(page-1);}, false);
                linkUp.innerHTML="↑ предыдущие "+qp.pagesize+" фото ↑";
		goUpDiv.appendChild(linkUp);
		goUpDiv.style.width="97%"
		goUpDiv.style.textAlign="left";
		wrapperDiv.appendChild(goUpDiv);
	}
	//Добавляем таблицу с превьюхами:
	txt = "<table><tr valign='middle' id='qp.row'>";
	var start = page*qp.pagesize;
	var end   = start+(qp.pagesize-1);
	end = (end >= ph.length)?(ph.length-1):end;

        if(qp.debug) alert("Page "+page+" lays from "+start+" to "+end);

        for (i=start;i<=end;i++){
		txt+="<td style='text-align:center;border-color:#678AA9;border-width:1px;border-style:dashed;";
		txt+="text-align:center;min-width:130px;'>";
		txt+="<a href='#photo/"+ph[i][0]+"'>";
		txt+= "<img src='"+ph[i][1]+"' style='max-height:130px'>";
		txt+="</a></td>";
	}
	txt+="</tr></table>";
	bar.innerHTML=txt;
	wrapperDiv.appendChild(bar);
	if(end<ph.length-1){
		var goDownDiv = document.createElement("div");
                var linkDown = document.createElement("a");
                linkDown.addEventListener("click", function(){qp.showNavBar(page+1);}, false);
                linkDown.innerHTML="↓ следующие "+(((ph.length-end-1)<qp.pagesize)?(ph.length-end-1):qp.pagesize)+" фото ↓";
                goDownDiv.appendChild(linkDown);
		goDownDiv.style.width="97%";
		goDownDiv.style.textAlign="right";
		wrapperDiv.appendChild(goDownDiv);
	}
	parent.appendChild(wrapperDiv);
},
switchQuickView : function(){
	qp.setVar("show_qnav",!qp.show_qnav);
	this.innerHTML = ((qp.show_qnav)?"Скрыть":"Показать")+" навигатор";
	if(qp.show_qnav){
		qp.showNavBar();
		qp.selectCurrent(this_id-1);
	}
	else
		ge("photoborder").removeChild(ge("qp.quick_nav_wrapper"));
        document.cookie=("qp.showQuickPhotoNavigator="+qp.show_qnav);
},
addMainBar : function(){
    if (typeof(ph)=='undefined') return;
    qp.init();
    var txt=". <a id='qp.switchQuickView' onclick='qp.switchQuickView(this)'>"
        +((qp.show_qnav)?"Скрыть":"Показать")+" навигатор</a>. "
        +"<a id='qp.showAll'>Показать все</a> "
        +"<a style='vertical-align:middle;font-size:12px;padding:0px 3px;' id='qp.showAbout' title='Справка'>"
        +"<img style='vertical-align:middle;background-color:#f7f7f7;' src='"+qp.helpImg+"'></a>"
        +"<a id='qp.showPrefs'>"
        +"<img style='vertical-align:middle;background-color:#f7f7f7;' title='Настроить' src='"+qp.prefsImg+"'></a>"
        +"<a id='qp.newVersionHint' style='display:none' title='Доступно обновление, перейти на страницу скрипта' href='http://"+window.location.host+"/page8057106'><img style='vertical-align:middle;background-color:#f7f7f7;' src='"+qp.newVersionImg+"'></a>"
        //Панель настроек:
        +"<div id='qp.prefs' style='display:none;'>"
        +"Показывать <input style='height:13px;width:40px' id='qp.pageSizeInput' type='number' value='"
        +qp.pagesize+"'>"
        +" превью в строке<a title='Числа более 240 не рекоменуются ввиду внутренних ограничений браузеров, приводящих к ошибкам отображения'>*</a>.<br>"
        +"<div title='Разворачивать фотографии на странице «Все фото» и добавлять им тени, придавая странице вид разбросанных по столу фотографий.'>"
        +"<input type='checkbox' id='qp.scatter' "+((qp.scatter)?"checked":"")+">«Разбрасывать» фотографии на странице «Все фото»</div>"
        +"<div title='Использовать для страницы «Все фото» фотографии в максимальном доступном разрешении, включая те, что доступны по кнопке «Увеличить»'>"
        +"<input type='checkbox' id='qp.useHD' "+((qp.useHD)?"checked":"")+">По возможности использовать фотографии высокого разрешения</div>"
    //Обработка событий:
    ge("photodate").innerHTML+=txt;
    ge("qp.pageSizeInput").onchange=function(){qp.setVar("pagesize",this.value);if(qp.show_qnav)qp.showNavBar();};
    ge("qp.scatter").onchange=function(){qp.setVar("scatter",this.checked);};
    ge("qp.useHD").onchange=function(){qp.setVar("useHD",this.checked);}
    ge("qp.switchQuickView").onclick=qp.switchQuickView;
    ge("qp.showAbout").onclick=qp.aboutBox.show;
    if(qp.show_qnav){
        qp.showNavBar();
        qp.selectCurrent(this_id-1);
        if (window.location.hash != "") qp.handleHash();
    }
   document.getElementsByClassName("divider")[0].addEventListener("click", qp.easter,false);
   ge("qp.showPrefs").onclick=function(){ge("qp.prefs").style.display=(ge("qp.prefs").style.display=="none")?"block":"none";};
   ge("qp.showAll").onclick=function(){if(qp.HDavailable&&qp.useHD) qp.showAllLarge(); else qp.showAll();};
},
init : function(){
   qp.HDavailable=ge("maximize")!=null;
   window.addEventListener("hashchange", qp.handleHash, false);
/* По просьбам параноиков здесь будет использоваться ДРУГАЯ логика, don't worry =)
    //Проверка версии: подключаем JS файл, в котором в qp.lartAvailableVersion запишется информация о последней версии
    //в виде: {Opera:{version:версия,releaseDate:дата выпуска}, FireFox:{version:версия,releaseDate:дата выпуска}}
    script = document.createElement("script");
    script.type="text/javascript";
    script.src="http://files.myopera.com/Chamie/files/SmallStuff/LastVersion.js.png";
    document.body.appendChild(script);
    //setTimeout(function(){alert(qp.lastAvailableVersion.Opera.version);},1000)
    //:проверка версии.
*/
    qp.storeIn  = (window.navigator.userAgent.search("FireFox")!=-1)?"GM":(typeof(localStorage)!="undefined")?"WS":("Ck");
    qp.pagesize = qp.getVar("pagesize",100);
    qp.scatter  = qp.getVar("scatter")=='true';
    qp.useHD    = qp.getVar("useHD")=='true';
    qp.show_qnav= qp.getVar("show_qnav")=='true';
    var lastUpdateCheck = new Date(qp.getVar("lastUpdateCheck"));
    if((new Date())-lastUpdateCheck>86400000) qp.check4update();
    qp.aboutBox = MessageBox({title:"О скрипте VK_QuickPhotos", closeButton:true, fullPageLink:"http://"+window.location.host+"/page8057106"})
    var txt="<h1>VK_QuickPhotos</h1>Скрипт <a href='http://"+window.location.host+"/page8057106'>VK_QuickPhotos</a> "
        +"написан для вас мной, <a href='http://"+window.location.host+"/chamie'>Chamie</a>.<br>"
        +"Пожелания к функционалу, сообщения об ошибках и просто «Спасибо» вы можете оставить "
        +"в <a href='http://"+window.location.host+"/note290393_8397947'>специальной заметке</a>.<br>"
        +"<b>Версия скрипта:</b> "+qp.version+"<br><b>Дата выпуска: </b>"+qp.releaseDate
    qp.aboutBox.content(txt);
    qp.check4update();

},
check4update : function(){
    if(qp.debug) alert("Checking for update");
    var req;
    var url="http://"+window.location.host+"/notes.php?act=getcomms&oid=290393&nid=9886144";
    function done(dummy,text){
        text = text.split("<div class='text'>")[1].split("</div>")[0];
        if(qp.debug) alert ("Versions info:" + text);
        var versions = text.split("|");
        var lastVersions={opera:"1.4.1"};
        var temp="";
        for (v=0;v<versions.length;v++){
            temp+=versions[v]+"\n";
            lastVersions[versions[v].split(":")[0]]=versions[v].split(":")[1];
        }
        if((qp.isMozilla && (lastVersions.firefox!=qp.version))||(!qp.isMozilla && (lastVersions.opera!=qp.version))){
            if(qp.debug) alert("New version found. Browser is "+((qp.isMozilla)?"Mozilla":"Opera")
            +"\nff last version is "+lastVersions.firefox+" opera's last version is "+lastVersions.opera
            +"\ncurrent version is "+qp.version);
            ge("qp.newVersionHint").style.display="inline-block";
        }
        if(qp.debug) alert("New version not found. Browser is "+((qp.isMozilla)?"Mozilla":"Opera")
            +"\nff last version is "+lastVersions.firefox+" opera's last version is "+lastVersions.opera
            +"\ncurrent version is "+qp.version);
        qp.setVar("lastUpdateCheck",new Date());
    }
    if (!qp.isMozilla){
        req = new Ajax(done);
        req.get(url);
    }
    else{//Боже, сколько костылей из-за этого Грисманки....
        req = new XMLHttpRequest();
        req.onreadystatechange=function(){if (req.readyState==4) if(req.status >=200 && req.status < 300) done(null,req.responseText);}
        req.open("GET",url,true);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.send("");
    }
},
easter : function(){
    var angle=1;var interval;
    function rot(){
        if (angle>=72){angle=0;window.clearInterval(interval);}
        ge("myphoto").setAttribute("style",((qp.isMozilla)?"-moz":"-o") +"-transform:rotate("+5*(angle++)+"deg)");
    }
    interval=window.setInterval(rot, 1);
},
setVar : function(name, value){//сохраняет значение в переменную и в кукисы, localStorage (WebStorage) либо (для GreaseMonkey) - в спец. хранилище.
    qp[name]=value;
    switch (qp.storeIn){
        case "WS":localStorage.setItem("qp."+name,value);break;
        case "GM":GM_setValue("qp."+name,value);break;
        default:document.cookie=("qp."+name+"="+value+"; expires=01-Jan-2100");
    }
},
getVar : function(name,defaultValue){
    var ret;
    switch (qp.storeIn){
        case "WS":ret = localStorage.getItem("qp."+name);break;
        case "GM":ret = GM_getValue("qp."+name);break;
        default:ret = getCookie("qp."+name);
    }
    if (!ret && (typeof(defaultValue)!=undefined))ret=defaultValue;
    return ret;
}
};
//Костыли для Фаерфокса:
if (qp.isMozilla){
	var ge = unsafeWindow.ge;
	var getCookie = unsafeWindow.getCookie;
	var ph = unsafeWindow.ph;
	var MessageBox = unsafeWindow.MessageBox;
	var this_id = unsafeWindow.this_id;
        Ajax = unsafeWindow.Ajax;
	qp.addMainBar();
}
//:костыли
else
	document.addEventListener("DOMContentLoaded",qp.addMainBar,false);