// ==UserScript==
// @name           IMDB movie subtitles
// @namespace      http://userscripts.org/scripts/show/21965
// @description    Searching for greek, turkish, english and arabic subtitles for movies listed on IMDB.com
// @version        20110811
// @license        GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http://*imdb.com/title/tt*
// ==/UserScript==
// version 20110811
// fixed some bugs
// version 20110221
// fixed some bugs
// removed greeksubs.ws
// fixed for imdb new design
// New Additions version 22012009
// Arabic language is supported now
//----------------------------------
// New Additions version 18012009
// Turkish and English languages are supported now
//----------------------------------
// New Additions version 15122008
// http://www.greeksubs.ws/ correction
//----------------------------------
// New Additions version 13112008 EPOE FACK edition
// http://www.greeksubs.ws/
//----------------------------------
// New Additions version 07112008 EPOE FACK edition
// http://subs4free.com/
// http://dvd.stuff.gr/
// http://www.all4divx.com/
// http://www.divxsubtitles.net/
//---------------------------------- 
// History
// Previous version 09092998
//----------------------------------
// To Do ?
// http://www.tvsubtitles.net/
// http://www.movieplace.tv/subtitles.php?search_b=GOMORRA+&search=
//var lang = GM_getValue("language");
//alert (lang);
//if (lang == undefined){
//	alert (lang);
//	}
////if ((GM_getValue("language")) || isNaN(parseInt(GM_getValue("xposit")) != "NaN")){
////if (!(isNaN(GM_getValue("language")))){
//if (isNaN(GM_getValue("language"))){
if (GM_getValue("language") == undefined) {
    configuration();
    return;
}
GM_addStyle('div#titleInfo{ left:21px;margin-bottom:4px;padding-bottom:0;padding-left:3px;cursor:pointer;padding-right:18px;padding-top:0; position:relative; }');
GM_addStyle('div#subs_box {background-color:#F3EEAD;background-image:url(/images/nb15/searchbg.gif);background-position:bottom;background-repeat:repeat-x;} ');
function configuration() {
    //GM_setValue("xposit", xposit);
    //alert('set lang');
    var node = document.createElement("div");
    node.setAttribute("id", "configuration_layer");
    node.innerHTML = "<h1>imdb subtitles configuration</h1>";
    node.innerHTML += "In what language? / " + "Σε τι γλώσσα;<br>";
    node.innerHTML += "<div id=subsconfig>" + "<img src='http://www.all4divx.com/flags/84.png'><input type='radio' name='language' value='greek'> Ελληνικά<br>" + "<img src='http://www.all4divx.com/flags/223.png'><input type='radio' name='language' value='turkish'> Türkçe<br>" + "<img src='http://www.all4divx.com/flags/230.png'><input type='radio' name='language' value='english'> English<br>" + "<img src='http://www.all4divx.com/flags/192.png'><input type='radio' name='language' value='arabic'> Arabic<br>" + "</div>";
    var existingobject = document.getElementsByTagName("body");
    existingobject[0].parentNode.insertBefore(node, existingobject[0]);
    GM_addStyle("div#configuration_layer {-moz-border-radius:7px;background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom;color:black;font-family:Arial,Helvetica,sans-serif;font-size:14px;height:auto;left:118px;padding:10px 36px 23px;position:fixed;top:47px;width:auto;z-index:501;}");
    function radiofunctionchange(evt) {
        var lang = evt.target.value;
        GM_setValue("language", lang);
        GM_addStyle("div#configuration_layer {display:none;}");
    }
    document.getElementById("subsconfig").addEventListener("change", radiofunctionchange, false);
}
var whatlang = GM_getValue("language");
var the_text =  new Array();
if (whatlang == 'greek') {
    the_text[0] = "IMDB subtitles - Αλλαγή στην θέση του κουτιού με τους Ελληνικούς υπότιτλους";
    the_text[1] = "IMDB subtitles - Αναζήτηση με εναλακτικό όνομα υπότιτλου";
    the_text[2] = "Κινήστε το αργά, κάντε κλίκ για αποθήκευση θέσης";
    the_text[3] = "Ελληνικοί Υπότιτλοι για : ";
    the_text[4] = "Ελληνικοί Υπότιτλοι";
    the_text[5] = "Η νέα θέση αποθηκεύτηκε";
    the_text[6] = "από αριστερά";
    the_text[7] = "από πάνω";
    the_text[8] = "IMDB subtitles - Configuration";
    the_text[9] = "http://www.all4divx.com/flags/84.png";
    // greek flag
    subs_box_width = (the_text[4].length + 6) + "ex";
    //"161px";//
}
else if (whatlang == 'turkish') {
    the_text[0] = "IMDB subtitles - Türkçe altyazı arama kutucuğunun yerini değiştir";
    the_text[1] = "IMDB subtitles - Alternatif isimlerinde ara";
    the_text[2] = "Yavaşça hareket ettir, kayıt etmek için tıkla ";
    the_text[3] = "Türkçe Altyazılarda ara : ";
    the_text[4] = "Türkçe Altyazı";
    the_text[5] = "Yeni pozisyon kayıt edildi";
    the_text[6] = "soldan";
    the_text[7] = "yukarıdan";
    the_text[8] = "IMDB subtitles - Ayarlar";
    the_text[9] = "http://www.all4divx.com/flags/223.png";
    // turkish flag
    subs_box_width = (the_text[4].length + 6) + "ex";
    //subs_box_width = "146px";
}
else if (whatlang == 'arabic') {
    the_text[0] = "IMDB subtitles - Change the position of the box with Arabic subtitles";
    the_text[1] = "IMDB subtitles - Search with alternative name";
    the_text[2] = "Move it slowly, click to save position";
    the_text[3] = "Arabic Subtitles for : ";
    the_text[4] = "Arabic Subtitles";
    the_text[5] = "New position is saved";
    the_text[6] = "from the left";
    the_text[7] = "from the top";
    the_text[8] = "IMDB subtitles - Configuration";
    the_text[9] = "http://www.all4divx.com/flags/192.png";
    // arabic flag
    subs_box_width = (the_text[4].length + 6) + "ex";
    //subs_box_width = "147px";
}
else if (whatlang == 'english') {
    the_text[0] = "IMDB subtitles - Change the position of the box with English subtitles";
    the_text[1] = "IMDB subtitles - Search with alternative name";
    the_text[2] = "Move it slowly, click to save position";
    the_text[3] = "English Subtitles for : ";
    the_text[4] = "English Subtitles";
    the_text[5] = "New position is saved";
    the_text[6] = "from the left";
    the_text[7] = "from the top";
    the_text[8] = "IMDB subtitles - Configuration";
    the_text[9] = "http://www.all4divx.com/flags/230.png";
    // english flag
    subs_box_width = (the_text[4].length + 6) + "ex";
    //subs_box_width = "147px";
}
else {
    configuration();
    return;
}

var rootlength = document.getElementsByTagName("div");

function alternativetitle() {
    for (i = 0; i < rootlength.length; i++) {
        if (rootlength[i].className == "txt-block") {
            if (rootlength[i].innerHTML.match(/Also Known As|English title|\(USA\)\(/)) {
                for (y = 0; rootlength[i].childNodes.length; y++) {
                    if (rootlength[i].childNodes[y].textContent.match(/Also Known As|English title|\(USA\)/)) {
                        
                        var engishTitle = rootlength[i].childNodes[y].textContent;
                        engishTitle = engishTitle.replace(/\(.*?\)/g, "");
                        return engishTitle;
                    }
                }
            }
        }
    }
}
getthosesubs(1);
function getthosesubs(vipx) {
    if ((document.getElementById('wrapper')) && (window == top)) {
        GM_registerMenuCommand(the_text[0], function () {
            change_box_position();
        }
        );
        GM_registerMenuCommand(the_text[1], function () {
            new_name_search();
        }
        );
        GM_registerMenuCommand(the_text[8], function () {
            configuration();
        }
        );
	  function new_name_search(){
		removeDaBox = document.getElementById('subs_box')
		removeDaBox.parentNode.removeChild(removeDaBox);  	
		getthosesubs(3);
	  }  	
	  
	  function change_box_position(){
		removeDaBox = document.getElementById('subs_box')
		removeDaBox.parentNode.removeChild(removeDaBox);  	
		getthosesubs(2);
	  }
        if (!(isNaN(GM_getValue("xposit")))) {
            var xposit = GM_getValue("xposit");
            var yposit = GM_getValue("yposit");
        }
        else {
            var xposit = 806;
            var yposit = 108;
            GM_setValue("xposit", xposit);
            GM_setValue("yposit", yposit);
        };
        function bakeValue(name, value, days) {
            GM_setValue(name, value);
        }
        var mybox = document.createElement("div");
        if (vipx == 2) {
            mybox.innerHTML = '<div  id="subs_box" style="left: ' + parseInt(xposit) + 'px; top: ' + parseInt(yposit) + 'px; margin: 5px; padding: 5px; overflow: hidden; -moz-border-radius: 10px; position: absolute; width: 175px; opacity: 0.7; z-index: 500; height: 12px; font-size: 8pt; font-weight: bold; font-family: Arial,Helvetica,sans-serif; background-color: rgb(243, 238, 173);">' + '<span title="' + the_text[2] + '"  style="-moz-border-radius:10px; background-color:white; border-color:yellow; position: absolute; top: 2px; height: 16px; border-style:groove; border-width:1px; width: 16px; left: 5px; cursor:move;"  border="2" cellspacing="1" cellpadding="1" >&nbsp;' + '</span>' + '<div id="titleInfo"><span id="aplogo" style="background-image:url(' + the_text[9] + ');height:12px;left:1px;position:absolute;width:18px;">&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;' + '</span>' + '<span  style="left:23px; position:absolute;  top:-5; width:200px; cursor: pointer;">' + the_text[4] + '</span>' + '</div><div id="sub_results"/>' + '</div>';
            GM_addStyle('div#titleInfo{ height:1.5em;}');
            function listenToList(e) {
                offsetx = e.clientX;
                offsety = e.clientY;
                nowX = document.getElementById("subs_box").style.left;
                nowX = nowX.replace(/px/i, "");
                offsety = offsety.toString(10) + 'px';
                lefti = parseInt(e.clientX) - 18;
                topi = parseInt(e.clientY) - 18;
                moveit(lefti, topi);
            }
            function saveToList(e) {
                aLIx = document.getElementById("subs_box").style.left;
                aLIx = aLIx.replace(/px/i, "");
                aLIy = document.getElementById("subs_box").style.top;
                aLIy = aLIy.replace(/px/i, "");
                bakeValue('xposit', aLIx);
                bakeValue('yposit', aLIy);
                //alert("Η νέα θέση αποθηκεύτηκε\n\nαπό αριστερά = "+aLIx +"px\nαπό πάνω = "+aLIy+"px");
                alert(the_text[5] + "\n\n" + the_text[6] + " = " + aLIx + "px\n" + the_text[7] + " = " + aLIy + "px");
            }
            addEventHandler(mybox.firstChild.firstChild, "mousemove", listenToList, true);
            addEventHandler(mybox.firstChild.firstChild, "click", saveToList, true);
        }
        else if (vipx == 3) {
            the_alternativetitle = alternativetitle();
            mybox.innerHTML = '<div  id="subs_box" style="left: ' + xposit + 'px; top: ' + yposit + 'px; margin: 5px; padding: 5px; overflow: hidden; -moz-border-radius: 10px; position: absolute; width: 296px; opacity: 0.7; z-index: 500; height: 12px; font-size: 8pt; font-weight: bold; font-family: Arial,Helvetica,sans-serif; background-color: rgb(243, 238, 173);">' + '<div id="titleInfo"><span id="aplogo" style="background-image:url(' + the_text[9] + ');height:12px;left:-17px;position:absolute;width:18px;">&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;' + '</span>' + '<span  style="left:3px; position:absolute;  top:-5; width:auto; cursor: pointer;">' + the_text[3] + '</span>' + '<input type="text" name="q" size="41" maxlength="2048" value="' + the_alternativetitle + '" title="Search" id="searchquery" style="left: 162px; width: 104px; height: 11px; font-size: 0.9em; position: relative; top: -3px;"/>' + '</div><div id="sub_results"/>' + '</div>';
        }
        else {
            mybox.innerHTML = '<div  id="subs_box" style="left: ' + xposit + 'px; top: ' + yposit + 'px; margin: 5px; padding: 5px; overflow: hidden; -moz-border-radius: 10px; position: absolute; width: ' + subs_box_width + '; opacity: 0.7; z-index: 500; height: 12px; font-size: 8pt; font-weight: bold; font-family: Arial,Helvetica,sans-serif; background-color: rgb(243, 238, 173);">' + '<div id="titleInfo"><span id="aplogo" style="background-image:url(' + the_text[9] + ');height:12px;left:-17px;position:absolute;width:18px;">&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;' + '</span>' + '' + the_text[4] + '</div><div id="sub_results"/>' + '</div>';
        }
        function moveit(lefti, topi) {
            document.getElementById("subs_box").style.left = lefti + 'px';
            document.getElementById("subs_box").style.top = topi + 'px';
            return;
        }
        if (vipx == 3) {
            addEventHandler(mybox.firstChild.childNodes[0].childNodes[1], "click", function () {
                var box = document.getElementById('subs_box');
                if (box.style.height.split('px')[0] < 250) {
                    // OPEN
                    box.style.height = 'auto';
                    box.style.minWidth = '269px';
                    box.style.minHeight = '12px';
                    box.style.opacity = '1';
                    box.style.setProperty("background-color", "#FFFECC", "");
                    box.style.setProperty("-moz-border-radius-bottomright", "0px", null);
                    box.style.setProperty("-moz-border-radius-bottomleft", "0px", null);
                    box.style.width = 'auto';
                    box.style.overflowX = 'hidden';
                    box.style.overflowY = 'auto';
                    //box.childNodes[1].style.setProperty( "font-style", "oblique", "" );	
                    box.childNodes[1].style.setProperty("font-style", "normal", "");
                }
                else {
                    // CLOSE
                    box.style.height = 12 + 'px';
                    box.style.opacity = '0.7';
                    box.style.setProperty("background-color", "#F3EEAD", "");
                    box.style.setProperty("-moz-border-radius-bottomright", "10px", null);
                    box.style.setProperty("-moz-border-radius-bottomleft", "10px", null);
                    box.childNodes[1].style.setProperty("font-style", "normal", "");
                    box.style.overflow = 'hidden';
                }
                //var gotitonce = document.getElementById('flag_gr2');
                //if (!gotitonce){
                //var search_query = mybox.firstChild.childNodes[2].value;
                var search_query = mybox.firstChild.childNodes[0].childNodes[2].valuegetresults_for_grsubs(search_query);
                //}	
            }
            , true);
        }
        else {
            addEventHandler(mybox.firstChild.lastChild.previousSibling, "click", function () {
                var box = document.getElementById('subs_box');
                if (box.style.height.split('px')[0] < 250) {
                    box.style.height = 'auto';
                    box.style.minWidth = subs_box_width;
                    box.style.minHeight = '12px';
                    box.style.opacity = '1';
                    box.style.setProperty("background-color", "#FFFECC", "");
                    box.style.setProperty("-moz-border-radius-bottomright", "0px", null);
                    box.style.setProperty("-moz-border-radius-bottomleft", "0px", null);
                    box.style.width = 'auto';
                    box.style.overflowX = 'hidden';
                    box.style.overflowY = 'auto';
                    //box.childNodes[1].style.setProperty( "font-style", "oblique", "" );
                    box.childNodes[1].style.setProperty("font-style", "normal", "");
                }
                else {
                    box.style.height = 12 + 'px';
                    box.style.width = subs_box_width;
                    box.style.opacity = '0.7';
                    box.style.setProperty("background-color", "#F3EEAD", "");
                    box.childNodes[1].style.setProperty("font-style", "normal", "");
                    box.style.setProperty("-moz-border-radius-bottomright", "10px", null);
                    box.style.setProperty("-moz-border-radius-bottomleft", "10px", null);
                    //box.childNodes[1].style.setProperty( "text-align", "justify", "" );
                    box.style.overflow = 'hidden';
                }
                var gotitonce = document.getElementById('flag_gr2');
                if (!gotitonce) {
                    getresults_for_grsubs(1);
                }
            }
            , true);
        }
        //document.body.insertBefore(mybox, document.body.firstChild);
        document.getElementById('wrapper').appendChild(mybox);
    }
    function addEventHandler(target, eventName, eventHandler) {
        if (target.addEventListener)target.addEventListener(eventName, eventHandler, false);
        else if (target.attachEvent)target.attachEvent("on" + eventName, eventHandler);
    }
    //---------------------------------- na  
    function getresults_for_grsubs(getresults_for_grsubs) {
        var regexImdbNum = /\/title\/tt(\d{7})\//;
        var arrImdbNum = regexImdbNum.exec(document.location);
        // Check that we got valid results from regex
        if (arrImdbNum && arrImdbNum.length == 2) {
            imdb_id = arrImdbNum[1];
            getOpensubsResults(imdb_id);
        }
        if (getresults_for_grsubs != '1') {
            var movname = getresults_for_grsubs;
            if (whatlang == "greek") {
                sentittothegreeksites(movname);
            }
            else if (whatlang == "turkish") {
                sentittotheturkishsites(movname);
            }
            else if (whatlang == "arabic") {
                sentittothearabicsites(movname);
            }
            else if (whatlang == "english") {
                sentittotheenglishsites(movname);
            }
        } else {
            var regexTitle = /(?!".+")^(.+?) \(\d{4}(?:\/[IV]+)?\)/;
            //<br /><span class="title-extra">
            //The Lord of the Rings: The Return of the King 
            //<i>(original title)</i>
            //(original title)
            //GM_log(document.body.innerHTML);
            //) The Lord of the Rings: The Return of the King (original title)
            var tooManyIpMUreg =  new RegExp("<span class=\"title-extra\">\\n(.*?)\\n<i>\\(original title\\)<");
            var match = tooManyIpMUreg.exec(document.body.innerHTML);
            if (match != null) {
                var movname = match[1];
                movname = movname.replace(/IMDb - /g, "");
            }
            else {
                var movname = document.getElementsByTagName("title")[0].textContent;
                //console.log(movname);
                movname = movname.replace(/ \(TV .*$/g, "");
                movname = movname.replace(/ \(\d{4}\).*$/g, "");
                movname = movname.replace(/"/g, "");
                movname = movname.replace(/IMDb - /g, "");
            }


            if (movname && movname.length > 1) {
                if (whatlang == "greek") {
                    sentittothegreeksites(movname);
                }
                else if (whatlang == "turkish") {
                    sentittotheturkishsites(movname);
                }
                else if (whatlang == "arabic") {
                    sentittothearabicsites(movname);
                }
                else if (whatlang == "english") {
                    sentittotheenglishsites(movname);
                }
                //--- old start ---\\
                //getsubs4u_gr(movname);
                //greeksubs_com(movname);
                //---  old end  ---\\
            }
        }
        function sentittothegreeksites(movname) {
            getGreekSubtitleProjectResults(movname);
            /*  getsubsgr(movname.replace(/:/g, '').replace(/ /g, '+'));  */
            /*  greeksubtitles(movname.replace(/:/g, '').replace(/ /g, '+')); */ 
            subs4free_com(movname.replace(/:/g, '').replace(/ /g, '+'));
            /*    greeksubs_ws(movname.replace(/:/g,'').slice(0,20).toLowerCase());      */
            dvd_stuff_gr(movname.replace(/:/g, '').replace(/ /g, '+'));
            all4divx_com(movname.replace(/:/g, '').replace(/ /g, '+').replace(/\//g, '+'));
            divxsubtitles_net(movname.replace(/:/g, '').replace(/ /g, '+'));
        }
        function sentittotheturkishsites(movname) {
            divxforever_in(movname.replace(/:/g, '').replace(/ /g, '+'));
            all4divx_com(movname.replace(/:/g, '').replace(/ /g, '+').replace(/\//g, '+'));
            divxsubtitles_net(movname.replace(/:/g, '').replace(/ /g, '+'));
            turkceltyazi_org(arrImdbNum[1]);
        }
        function sentittotheenglishsites(movname) {
            divxforever_in(movname.replace(/:/g, '').replace(/ /g, '+'));
            all4divx_com(movname.replace(/:/g, '').replace(/ /g, '+').replace(/\//g, '+'));
            divxsubtitles_net(movname.replace(/:/g, '').replace(/ /g, '+'));
        }
        function sentittothearabicsites(movname) {
            all4divx_com(movname.replace(/:/g, '').replace(/ /g, '+').replace(/\//g, '+'));
            divxsubtitles_net(movname.replace(/:/g, '').replace(/ /g, '-'));
            subscene_com(movname.replace(/ /g, '+'));
        }
        function subscene_com(moviename) {
            var link = document.getElementById('sub_results');
            var subscene = 'http://subscene.com/filmsearch.aspx?q=' + moviename + '&exact=exact';
            GM_xmlhttpRequest( {
                method : 'GET', 
                url : subscene, 
                headers : {
				'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11', 
                'Accept' : 'application/atom+xml,application/xml,text/xml'}, 
                onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var recantfindexactnamergex =  new RegExp("Search for Film Title", "g");
                        var cantfindexactname = recantfindexactnamergex.exec(responseDetails.responseText);
                        if (cantfindexactname) {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://subscene.com/favicon.png  width='14' height='12'> <a id='not_flag_gr2' href='" + subscene.replace(/&exact=exact/, '') + "'>Please visit subscene.com</a></div>";
                            return;
                        }
                        var re =  new RegExp("\" href=\"\/arabic\/", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/\" href=\"\/arabic\//g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://subscene.com/favicon.png  width='14' height='12'> <a href='" + subscene + "'>Found " + whoManyResults.length + " subtitles @ subscene.com</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://subscene.com/favicon.png  width='14' height='12'> <a href='" + subscene + "'>Status " + responseDetails.statusText + " 0 subtitles @ subscene.com</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://subscene.com/favicon.png  width='14' height='12'> <a id='not_flag_gr2' href='" + subscene + "'>" + responseDetails.status + " @ subscene.com</a></div>";
                    }
                }
                //}
            }
            );
        }
        //turkish version site function start
        function divxforever_in(moviename) {
            var link = document.getElementById('sub_results');
            if (whatlang == 'english') {
                var divxforeverlang = 'EN';
            }
            else if (whatlang == 'turkish') {
                var divxforeverlang = 'TR';
            }
            var divxforever = 'http://www.divxforever.in/index.php?act=subz&CODE=66&mname=' + moviename + '&subtitle_lang=' + divxforeverlang;
            // ? OR ? var divxforever = 'http://www.divxforever.in/index.php?act=subz&CODE=66&mname=' + escape(moviename)+'&subtitle_lang='+divxforeverlang;
            GM_xmlhttpRequest( {
                method : 'GET', url : divxforever, //url: 'http://www.divxforever.in/index.php?act=subz&CODE=66&mname=' + moviename,
                headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11', 
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("lang_", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/lang_/g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://www.divxforever.in/favicon.ico  width='14' height='12'> <a href='" + divxforever + "'>Found " + whoManyResults.length + " subtitles @ divxforever.in</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.divxforever.in/favicon.ico  width='14' height='12'> <a href='" + divxforever + "'>Status " + responseDetails.statusText + " 0 subtitles @ divxforever.in</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.divxforever.in/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='" + divxforever + "'>" + responseDetails.status + " @ divxforever.in</a></div>";
                    }
                }
            }
            );
        }
        function turkceltyazi_org(movieid) {
            var link = document.getElementById('sub_results');
            var turkcealtyaziurl = 'http://www.turkcealtyazi.org/tt' + movieid;
            GM_xmlhttpRequest( {
                method : 'GET', url : turkcealtyaziurl, headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11', 
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("tr.gif", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/tr.gif/g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://www.turkcealtyazi.org/images/favicon.ico  width='14' height='12'> <a href='" + turkcealtyaziurl + ">Found " + whoManyResults.length + " subtitles @ turkcealtyazi.com</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.turkcealtyazi.org/images/favicon.ico  width='14' height='12'> <a href='" + turkcealtyaziurl + ">Status " + responseDetails.statusText + " 0 subtitles @ turkcealtyazi.com</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.turkcealtyazi.org/images/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='" + turkcealtyaziurl + ">" + responseDetails.status + " @ turkcealtyazi.com</a></div>";
                    }
                }
            }
            );
        }
        //turkish version site function end
        function divxsubtitles_net(moviename) {
            if (whatlang == 'greek') {
                var divxsubtitleslang = '11';
            }
            else if (whatlang == 'turkish') {
                var divxsubtitleslang = '22';
            }
            else if (whatlang == 'english') {
                var divxsubtitleslang = '2';
            }
            else if (whatlang == 'arabic') {
                var divxsubtitleslang = '40';
            }
            var link = document.getElementById('sub_results');
            GM_xmlhttpRequest( {
                method : 'GET', //url: 'http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=22&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free=' + moviename + '&firstSearch=true&pageNo=1&recPerPage=40',
                url : 'http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=' + divxsubtitleslang + '&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free=' + moviename + '&firstSearch=true&pageNo=1&recPerPage=40', headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11', 
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("&nbsp;&nbsp;", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/&nbsp;&nbsp;/g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://www.divxsubtitles.net/favicon.ico  width='14' height='12'> <a href='http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=" + divxsubtitleslang + "&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free=" + escape(moviename) + "&firstSearch=true&pageNo=1&recPerPage=40'>Found " + whoManyResults.length + " subtitles @ divxsubtitles.net</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.divxsubtitles.net/favicon.ico  width='14' height='12'> <a href='http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=" + divxsubtitleslang + "&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free=" + escape(moviename) + "&firstSearch=true&pageNo=1&recPerPage=40'>Status " + responseDetails.statusText + " 0 subtitles @ divxsubtitles.net</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.divxsubtitles.net/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='http://www.divxsubtitles.net/page_searchedsubtitles.php?_language=" + divxsubtitleslang + "&_format=-1&_framerate=-1&_date=-1&nbcd=-1&_grade=-2&_character=-1&_free=" + escape(moviename) + "&firstSearch=true&pageNo=1&recPerPage=40'>" + responseDetails.status + " @ divxsubtitles.net</a></div>";
                    }
                }
            }
            );
        }
        function all4divx_com(moviename) {
            //alert(whatlang);
            if (whatlang == 'greek') {
                var all4divxlang = 'Greek';
            }
            else if (whatlang == 'turkish') {
                var all4divxlang = 'Turkish';
            }
            else if (whatlang == 'english') {
                var all4divxlang = 'English';
            }
            else if (whatlang == 'arabic') {
                var all4divxlang = 'Arabic';
            }
            moviename = moviename.replace(/ /, '+');
            moviename = moviename.replace(/\//, '+');
            var all4divxurl = "http://all4divx.com/subtitles/" + escape(moviename) + "/" + all4divxlang + "/xml";
            //var all4divxurl = 'http://www.all4divx.com/subtitles/' + moviename + '/'+all4divxlang+'/1';
            var link = document.getElementById('sub_results');
            GM_xmlhttpRequest( {
                method : 'GET', url : all4divxurl, headers : {
                    'User-agent' : 'Mozilla/5.0 Greasemonkey_userscript_IMDB_Subtitles',
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    {
                        var foundresults = document.createElement("div");
                        foundresults.setAttribute("id", "analitika");
                        foundresults.innerHTML += "<div id=titles>all4divx results</div>";
                        // convert string to XML object
                        var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
                        var subtitles = xmlobject.getElementsByTagName('subtitle');
                        if (subtitles.length > 1) {
                            for (var i = 1; i < subtitles.length; i++) {
                                var item = subtitles[i];
                                var title = item.getElementsByTagName("title")[0].firstChild.nodeValue;
                                var link = item.getElementsByTagName("link")[0].firstChild.nodeValue;
                                var files = item.getElementsByTagName("cd")[0].firstChild.nodeValue;
                                var site = link.replace(/http:\/\/(?:.*?\.|)(.*?)\.(com|net|org|info|coop|int|co\.uk|org\.uk|ac\.uk|uk|sk).*/g, "$1.$2");
                                foundresults.innerHTML += "" + "<span id='all4divx_results_id'>" + i + " . " + "<a href='" + link + "'>" + title.replace(/\'/g, '&#39;') + "</a><small> " + site + "</small></span><br/>";
                            }
                        }
                        else {
                            foundresults.innerHTML += '<span id="all4divx_results_id"><center>0 results from all4divx</span>';
                        }
                    }
                    var appentAt = document.getElementById('sub_results');
                    appentAt.appendChild(foundresults);
                    GM_addStyle('p#all4divx_results {margin:0.85em 0;} ');
                }
                /*
                {


                if (responseDetails.status == 200) {
                var re = new RegExp("movie_row_name_link_1", "g");
                var rating = re.exec(responseDetails.responseText);
                if (rating != null) {
                var whoManyResults = responseDetails.responseText.match(/movie_row_name_link_1/g);

                if (whoManyResults.length > 0 ) {
                link.innerHTML += 
                "<div id='flag_gr2'><img src=http://www.all4divx.com/favicon.ico  width='14' height='12'> <a href='http://www.all4divx.com/subtitles/"+escape(moviename) + "/"+all4divxlang+"/1'>Found "+whoManyResults.length+" subtitles @ all4divx.com</a></div>";             
            }
            }else{
                link.innerHTML += 
                "<div id='flag_gr2'><img src=http://www.all4divx.com/favicon.ico  width='14' height='12'> <a href='http://www.all4divx.com/subtitles/"+escape(moviename) + "/"+all4divxlang+"/1'>Status "+responseDetails.statusText+" 0 subtitles @ all4divx.com</a></div>";             
            }



            }else{
                link.innerHTML += 
                "<div id='flag_gr2'><img src=http://www.all4divx.com/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='http://www.all4divx.com/subtitles/"+escape(moviename)+"/"+all4divxlang+"/1'>"+responseDetails.status+" @ all4divx.com</a></div>";             
            }
            }  */
            }
            );
        }
        function dvd_stuff_gr(moviename) {
            var link = document.getElementById('sub_results');
            GM_xmlhttpRequest( {
                method : 'GET', url : 'http://dvd.stuff.gr/subtitles/index.php?act=search&ebresi=' + moviename + '&submit=Search', headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11', 
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("Get\!", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/Get\!/g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://dvd.stuff.gr/pics/tik.gif  width='14' height='12'> <a href='http://dvd.stuff.gr/subtitles/'>Found " + whoManyResults.length + " subtitles @ dvd.stuff.gr</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://dvd.stuff.gr/pics/tik.gif  width='14' height='12'> <a href='http://dvd.stuff.gr/subtitles/'>Status " + responseDetails.statusText + " 0 subtitles @ dvd.stuff.gr</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://dvd.stuff.gr/pics/tik.gif width='14' height='12'> <a id='not_flag_gr2' href='http://dvd.stuff.gr/subtitles/'>" + responseDetails.status + "  @ dvd.stuff.gr</a></div>";
                    }
                }
            }
            );
        }
        function greeksubs_ws(moviename) {
            var link = document.getElementById('sub_results');
            //var grurl = 'http://greeksubs.ws/portal/component/search/' + escape(moviename) +'.html?ordering=newest&searchphrase=all&limit=20&areas[0]=attachments';
            var grurl = 'http://greeksubs.ws/oldportal/component/search/' + escape(moviename) + '.html?ordering=newest&searchphrase=all&limit=20&areas[0]=attachments';
            GM_xmlhttpRequest( {
                method : 'GET', url : grurl, headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11', 
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("attachments/download", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/attachments\/download/g);
                            //var whoManyResults = responseDetails.responseText.match(/get\.php\?subtitleid/g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src='http://greeksubs.ws/images/favicon.ico'  width='14' height='12'> <a href='" + grurl + "'>Found " + whoManyResults.length + " subtitles @ greeksubs.ws</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src='http://greeksubs.ws/images/favicon.ico'  width='14' height='12'> <a href='" + grurl + "'>Status " + responseDetails.statusText + " 0 subtitles @ greeksubs.ws</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src='http://greeksubs.ws/images/favicon.ico'  width='14' height='12'> <a id='not_flag_gr2' href='" + grurl + "'>" + responseDetails.status + " @ greeksubs.ws</a></div>";
                    }
                }
            }
            );
        }
        function subs4free_com(moviename) {
            var link = document.getElementById('sub_results');
            //var url_ = 'http://freeprojectx.com/search_report.php?selLang=1&search=' + moviename + '&cat=0';
            var url_ = 'http://subs4free.com/search_report.php?selLang=1&search=' + moviename + '&cat=0';
            //console.log(url_);
            GM_xmlhttpRequest( {
                method : 'GET', url : url_, 
                headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        //var re = new RegExp("<a href=\"download-(.*?).html\" title=\"Greek subtitle for (.*?)\"><img", "g");
                        //var re = new RegExp(' href="link.php\\?p=download-(.*?).html" title="Greek subtitle for (.*?)"><img', "g");
                        //var re = new RegExp("download-(.*?).html\" title=\"Greek subtitle for (.*?)\">.*?a> on (.*?)</div>", "img");
                        var re = new RegExp("download-(.*?).html\" title=\"Greek subtitle for (.*?)\">", "img");
                        var re = new RegExp("download-(.*?).html\" title=\"Greek subtitle for (.*?)\"><img.*?uploaded by (.*?)\" class=.*?</a> on (.*?)</div></td>  ", "mg");
                        responseDetails.responseText = responseDetails.responseText.replace(/\r\n*?|\r\n|\n*|\r*/g, "");
                       
                        var rating = re.exec(responseDetails.responseText);
                        
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(re);
                            //console.log(whoManyResults);
                            if (whoManyResults.length > 0) {
								var ressubs4u = "<div id='analitika'><div id='titles'><div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif  width='14' height='12'> <a href='http://subs4free.com/search_report.php?selLang=1&search=" + escape(moviename) + "&cat=0'>Found " + whoManyResults.length + " subtitles @ subs4free.com</a></div></div>";
                                //link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif  width='14' height='12'> <a href='http://subs4free.com/search_report.php?selLang=1&search=" + escape(moviename) + "&cat=0'>Found " + whoManyResults.length + " subtitles @ subs4free.com</a></div><div id='analitika'>";
                                for (var i = 0; i < whoManyResults.length; i++) {
									//whoManyResults[i] = whoManyResults[i].replace(/\r|\n/,'');
									whoManyResults[i] = whoManyResults[i].replace(/\n/g," ").replace(/\r/g," ");
                                	//console.log(whoManyResults[i]);
                                	//res2 = whoManyResults[i].match(/download-(.*?).html\" title=\"Greek subtitle for (.*?)\">/);
                                	res2 = whoManyResults[i].match(/download-(.*?).html" title="Greek subtitle for (.*?)"><img.*?uploaded by (.*?)" class=.*?<\/a> on (.*?)<\/div><\/td>  /);
                                	
                                	//link.innerHTML +=i+". <a href='http://freeprojectx.com/download-"+res2[1]+".html'>"+res2[2]+"</a><br/>";
									var sub4freeurl = /http:\/\/subs4free\.com\/search_report\.php\?selLang=1&search=(.*?)&cat=0/;
									var match = sub4freeurl.exec(url_);
									if (match != null) {
										moviename = match[1];
										moviename = moviename.replace(/\+/g, " ");
										var movienamereg = new RegExp(moviename);	
									} 
                                	nameofsub = res2[2].replace(movienamereg, "");
                                	uploader = res2[3].replace(/\*/g, "");
                                	uploaded = res2[4].replace(/\d\d:.*?$/, "");
                                	if (nameofsub=='') nameofsub=moviename;
                                	//http://freeprojectx.com/download-s552811e1f7.html
                                	//http://www.freeprojectx.com/link.php?p=download-s552811e1f7.html
                                	ressubs4u +=(i+1)+". <a href='http://www.freeprojectx.com/link.php?p=download-"+res2[1]+".html'>"+nameofsub+"</a><br/><small>by "+uploader+" "+uploaded+"</small><br/>";
                                }
                                link.innerHTML +=ressubs4u+"</div>";
                            }
                        } else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif  width='14' height='12'> <a href='http://subs4free.com/search_report.php?selLang=1&search=" + escape(moviename) + "&cat=0'>Status " + responseDetails.statusText + " 0 subtitles @ subs4free.com</a></div>";
                        }
                    } else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif  width='14' height='12'> <a id='not_flag_gr2' href='http://www.subs4free.com/portal/infusions/pro_download_panel/search.php?stext=" + escape(moviename) + "'>" + responseDetails.status + " @ subs4free.com</a></div>";
                    }
                }
            }
            );
        }
        function greeksubs_com(moviename) {
            var link = document.getElementById('sub_results');
            //	http://www.greeksubs.com/subtitles.php?title=123
            GM_xmlhttpRequest( {
                method : "post", url : 'http://www.greeksubs.com/subtitles.php', headers : {
                    "Content-type" : "application/x-www-form-urlencoded"
                }
                , data : 'title=' + encodeURIComponent(moviename), onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("get\.php\\?subtitleid", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/get\.php\?subtitleid/g);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://www.greeksubs.com/favicon.ico  width='14' height='12'> <a href='http://www.greeksubs.com/subtitles.php'>Found " + whoManyResults.length + " subtitles @ greeksubs.com</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.greeksubs.com/favicon.ico  width='14' height='12'> <a href='http://www.greeksubs.com/subtitles.php'>Status " + responseDetails.statusText + " 0 subtitles @ greeksubs.com</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.greeksubs.com/favicon.ico width='14' height='12'> <a id='not_flag_gr2' href='http://www.greeksubs.com/subtitles.php'>" + responseDetails.status + "  @ greeksubs.com</a></div>";
                    }
                }
            }
            );
        }
        function getsubs4u_gr(moviename) {
            var link = document.getElementById('sub_results');
            GM_xmlhttpRequest( {
                method : 'GET', url : 'http://www.subs4u.gr/search_report.php?selLang=1&search=' + moviename + '&cat=0', headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("downl_redirect\.php", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/images\/el\.gif/g);
                            if (whoManyResults.length > 1) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif width='14' height='12'> <a href='http://www.subs4u.gr/search_report.php?selLang=1&search=" + escape(moviename) + "&cat=0>Found " + ((whoManyResults.length) - 1) + " subtitles @ subs4u.gr</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif width='14' height='12'> <a href='http://www.subs4u.gr/search_report.php?selLang=1&search=" + escape(moviename) + "&cat=0>Status " + responseDetails.statusText + " 0 subtitles @ subs4u.gr</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs4u.gr/images/el.gif  width='14' height='12'> <a id='not_flag_gr2' href='http://www.subs4u.gr/search_report.php?selLang=1&search=" + escape(moviename) + "&cat=0'>" + responseDetails.status + " @ subs4u.gr</a></div>";
                    }
                }
            }
            );
        }
        function getGreekSubtitleProjectResults(moviename) {
            var link = document.getElementById('sub_results');
            GM_xmlhttpRequest( {
                method : 'GET', url : 'http://greeksubtitles.info/search.php?name=' + moviename + '&Submit=Search', headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("<\/a><\/td>", "g");
                        var rating = re.exec(responseDetails.responseText);
                        
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(/<td class="result_num_k">\d{1,}.<\/td>/g);
                            //console.log(whoManyResults);
                            //console.log(whoManyResults.length);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src='http://www.subtitles.gr/favicon.ico'  width='14' height='12'> <a href='http://greeksubtitles.info/search.php?name=" + escape(moviename) + "'>Found " + whoManyResults.length + " subtitles @ greeksubtitlesproject</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src='http://www.subtitles.gr/favicon.ico'  width='14' height='12'> <a href='http://greeksubtitles.info/search.php?name=" + escape(moviename) + "'>Status " + responseDetails.statusText + " 0 subtitles @ greeksubtitlesproject</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src='http://www.subtitles.gr/favicon.ico'  width='14' height='12'> <a id='not_flag_gr2' href='http://greeksubtitles.info/search.php?name=" + escape(moviename) + "'>" + responseDetails.status + " @ greeksubtitlesproject</a></div>";
                    }
                }
            }
            );
        }
        function getsubsgr(moviename) {
            var link = document.getElementById('sub_results');
            GM_xmlhttpRequest( {
                method : 'GET', url : 'http://www.subs.gr/portal/infusions/pro_download_panel/search.php?stext=' + moviename, headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    if (responseDetails.status == 200) {
                        var re =  new RegExp("href='download\\.php\\?did", "g");
                        var rating = re.exec(responseDetails.responseText);
                        if (rating != null) {
                            var whoManyResults = responseDetails.responseText.match(re);
                            if (whoManyResults.length > 0) {
                                link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs.gr/favicon.ico  width='14' height='12'> <a href='http://www.subs.gr/portal/infusions/pro_download_panel/search.php?stext=" + escape(moviename) + ">Found " + whoManyResults.length + " subtitles @ subs.gr</a></div>";
                            }
                        }
                        else {
                            link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs.gr/favicon.ico  width='14' height='12'> <a href='http://www.subs.gr/portal/infusions/pro_download_panel/search.php?stext=" + escape(moviename) + ">Status " + responseDetails.statusText + " 0 subtitles @ subs.gr</a></div>";
                        }
                    }
                    else {
                        link.innerHTML += "<div id='flag_gr2'><img src=http://www.subs.gr/favicon.ico  width='14' height='12'> <a id='not_flag_gr2' href='http://www.subs.gr/portal/infusions/pro_download_panel/search.php?stext=" + escape(moviename) + "'>" + responseDetails.status + " @ subs.gr</a></div>";
                    }
                }
            }
            );
        }
        function sb(movieID, host) {
            var link = document.getElementById('sub_results');
            url = 'http://www.' + host + '.com/my_hosts_imdb.php?query=' + movieID;
            GM_xmlhttpRequest( {
                method : 'GET', url : url, onload : function (responseDetails) {
                    var foundresults = document.createElement("div");
                    foundresults.setAttribute("id", "analitika");
                    foundresults.innerHTML += "<div id=titles>" + host + " results</div>";
                    // convert string to XML object
                    var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
                    var items = xmlobject.getElementsByTagName('result');
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        var title = item.getElementsByTagName("title")[0].firstChild.nodeValue;
                        if (title.match(/0 results/)) {
                            foundresults.innerHTML += '<span id="' + host + '_results_id"><center>0 results from ' + host + '</span>';
                        } else {
                            var release = item.getElementsByTagName("release")[0].firstChild.nodeValue;
                            var file_id = item.getElementsByTagName("file_id")[0].firstChild.nodeValue;
                            var translated = item.getElementsByTagName("translator")[0];
                            if (translated.firstChild) {
                                translator = translated.firstChild.nodeValue;
                            }
                            else {
                                translator = "";
                            }
                           
 foundresults.innerHTML += "<span id='" + host + "_results_id'>" + (i + 1) + "  <a href=\"http://www." + host + ".com/dload.php?action=file&file_id=" + file_id + "\">" + title.replace(/\'/g, '&#39;') + "</a><br/><small>" + release + " " + translator + "</small></span><br/>";

                        }
                    }
                    var appentAt = document.getElementById('sub_results');
                    appentAt.appendChild(foundresults);
                    GM_addStyle('p#' + host + '_results {margin:0.85em 0;} ');
                }
            }
            );
        }
        function getOpensubsResults(movieid) {
            GM_addStyle('div#analitika {background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom;border-color:#CCCCCC;border-style:solid;border-width:1px 1px 0;margin:3px 6px;padding:0;vertical-align:text-bottom;} ');
            GM_addStyle('div#titles {background:transparent url(/images/nb15/sprocket.gif) repeat-x scroll 0 0;color:black;font-size:11px;font-variant:small-caps;position:relative;text-align:center;}');
            if (whatlang == 'greek') {
                //var site = 'scumbagsgr';
                var site = 'greekdvdsubs';
                if (site != '') {
                    sb(movieid, site);
                }
                var opensubslang = 'ell';
            }
            else if (whatlang == 'turkish') {
                var opensubslang = 'tur';
            }
            else if (whatlang == 'english') {
                var opensubslang = 'eng';
            }
            else if (whatlang == 'arabic') {
                var opensubslang = 'ara';
            }
            var link = document.getElementById('sub_results');
            var openlink = 'http://www.opensubtitles.org/en/search/sublanguageid-' + opensubslang + '/imdbid-' + movieid + '/simplexml';
            GM_xmlhttpRequest( {
                method : 'GET', url : openlink, headers : {
                    'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; el; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
                    'Accept' : 'application/atom+xml,application/xml,text/xml'
                }
                , onload : function (responseDetails) {
                    {
                        var foundresults = document.createElement("div");
                        foundresults.setAttribute("id", "analitika");
                        foundresults.innerHTML += "<div id=titles>opensubtitles results</div>";
                        // convert string to XML object
                        var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
                        var subtitles = xmlobject.getElementsByTagName('subtitle');
                        if (subtitles.length > 0) {
                            for (var i = 0; i < subtitles.length; i++) {
                                var item = subtitles[i];
                                var detail = item.getElementsByTagName("detail")[0].firstChild.nodeValue;
                                var releasename = item.getElementsByTagName("releasename")[0].firstChild.nodeValue;
                                var files = item.getElementsByTagName("files")[0].firstChild.nodeValue;
                                var subadddate = item.getElementsByTagName("subadddate")[0].firstChild.nodeValue;
                                var user = item.getElementsByTagName("user")[0];
                                if (user.firstChild) {
                                    uploader = "by " + user.firstChild.nodeValue;
                                }
                                else {
                                    uploader = "";
                                }
                                detaildwnloadlink = detail.replace(/\/subtitles\//g, 'http://www.opensubtitles.org/subtitleserve/sub/');
								foundresults.innerHTML += "<span id='opensubtitles_results_id'>"+ (i + 1) + " . " + "<a href='http://www.opensubtitles.com/" + detail + "'>" + releasename.replace(/\'/g, '&#39;') + "</a> <a href='"+detaildwnloadlink+"'>download</a><br/><small>" + files + " CD " + uploader + " " + subadddate.replace(/ \d\d:\d\d:\d\d/, '') + "</small></span><br/>";
                            }
                        }
                        else {
                            foundresults.innerHTML += '<span id="opensubtitles_results_id"><center>0 results from opensubtitles</span>';
                        }
                    }
                    var appentAt = document.getElementById('sub_results');
                    appentAt.appendChild(foundresults);
                    GM_addStyle('p#opensubtitles_results {margin:0.85em 0;} ');
                }
            }
            );
        }
        //GM_addStyle('span#flag_gr2 {font-size:0.4em;margin-left:17px;padding-top:6px} ');
        GM_addStyle('div#flag_gr2 {font-size:1em;margin-left:2px;} ');
    }
}
/*
pages 
http://www.greeksubs.com/ is using "post" OK
http://www.subs4u.gr/search_report.php?search=Dark+Star OK
http://www.greeksubtitlesproject.com/greek_subtitles.php?start=1000 OK

http://www.allsubs.org/search-subtitle stupid
http://greek-subtitles.mysubtitles.org/movie/dark-star_94919.html stupid
http://subscene.com/greek/Iron-Man-Ironman/subtitle-144741.aspx den mporo na psakso
http://divxtitles.com/Dark%20Star/Greek/any/1
http://www.podnapisi.net/ppodnapisi/search?tbsl=1&sK=Dark+Star&sJ=16&sY=&submit=Search skata
http://www.all4divx.com/subtitles/The+Big+Sleep/Greek/any/1 :-)
http://www.all4divx.com/subtitles/National+Treasure+Book+of+Secrets/Greek/any/1  :-)
moviesubtitles.org 
subtitlesbox.com


*/
