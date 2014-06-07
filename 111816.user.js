// ==UserScript==
// @name المنبه
// @description سكربت ينهبّهك في التوقيت الذي تضعه + الجملة من إختيارك .
// @author Mr.403
// @include http://ae*.tribalwars.ae/game.php*
// ==/UserScript==
// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

document.getElementsByTagName("head").innerHTML += '<style type="text/css">    #jsalarmclock{  font-family: Tahoma;  font-weight: bold;  font-size: 12px;  }    #jsalarmclock div{  margin-bottom: 0.8em;  }    #jsalarmclock div.leftcolumn{  float: left;  width: 150px;  font-size: 13px;  background-color: lightyellow;  clear: left;  }    #jsalarmclock span{  margin-right: 5px;  }</style>';
var jsalarm = {
    padfield: function (f) {
        return (f < 10) ? "0" + f : f;
    },
    showcurrenttime: function () {
        sT = $("#serverTime").text();
        sD = $("#serverDate").text();
        sD = sD.split("/");
        sD = sD[1] + "/" + sD[0] + "/" + sD[2];
        var dateobj = new Date(sT + " " + sD);
        var ct = this.padfield(dateobj.getHours()) + ":" + this.padfield(dateobj.getMinutes()) + ":" + this.padfield(dateobj.getSeconds());
        this.ctref.innerHTML = ct;
        this.ctref.setAttribute("title", ct);
        if (typeof this.hourwake != "undefined") {
            if (this.ctref.title == (this.hourwake + ":" + this.minutewake + ":" + this.secondwake)) {
                clearInterval(jsalarm.timer);
                window.location = document.getElementById("musicloc").value;
            }
        }
    },
    init: function () {
        var dateobj = new Date();
        this.ctref = document.getElementById("jsalarm_ct");
        this.submitref = document.getElementById("submitbutton");
        this.submitref.onclick = function () {
            jsalarm.setalarm();
            this.value = "تم التأكيد , ولـ إعادة التنبيه مرة أخرى عليك بـ تحديث الصفحة (F5)";
            this.disabled = true;
            return false;
        };
        this.resetref = document.getElementById("resetbutton");
        this.resetref.onclick = function () {
            jsalarm.submitref.disabled = false;
            jsalarm.hourwake = undefined;
            jsalarm.hourselect.disabled = false;
            jsalarm.minuteselect.disabled = false;
            jsalarm.secondselect.disabled = false;
            return false;
        };
        var selections = document.getElementsByTagName("select");
        this.hourselect = selections[0];
        this.minuteselect = selections[1];
        this.secondselect = selections[2];
        for (var i = 0; i < 60; i++) {
            if (i < 24) this.hourselect[i] = new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours() == i);
            this.minuteselect[i] = new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes() == i);
            this.secondselect[i] = new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds() == i);
        }
        jsalarm.showcurrenttime();
        jsalarm.timer = setInterval(function () {
            jsalarm.showcurrenttime();
        }, 1000);
    },
    setalarm: function () {
        this.hourwake = this.hourselect.options[this.hourselect.selectedIndex].value;
        this.minutewake = this.minuteselect.options[this.minuteselect.selectedIndex].value;
        this.secondwake = this.secondselect.options[this.secondselect.selectedIndex].value;
        this.hourselect.disabled = true;
        this.minuteselect.disabled = true;
        this.secondselect.disabled = true;
    }
};
document.getElementById("content_value").innerHTML += '<iframe name="iplayer" id="iplayer" src="about:blank" style="display: none"></iframe><form action="" method=""><div id="jsalarmclock"><div><div class="leftcolumn">الوقت الحالي:</div> <span id="jsalarm_ct" style="letter-spacing: 2px"></span></div><div><div class="leftcolumn">ظبط توقيت التنبيه:</div> <span><select></select>الساعة</span> <span><select></select> الدقائق</span> <span><select></select> الثواني</span></div><div class="leftcolumn">الرسالة التنبيهية:</div> <input type="text" id="musicloc" size="55" value="Javascript:alert(\'الرسالة التنبيهية\');" /> <span style="font: normal 11px Tahoma"></span></div><input type="submit" value="! تأكيد" id="submitbutton" /> <input type="reset" value="إنهاء التنبيه" id="resetbutton" /></div></form>';

function playSound(audioURL) {
    if (document.all) document.all['BGSOUND_ID'].src = audioURL;
    else self.iplayer.location.replace(audioURL);
    document.getElementById("content_value").getElementsByTagName("h2")[0].innerHTML = "<span style='color: red;'>" + document.getElementById("showThisText").value + "</span>";
}
jsalarm.init();