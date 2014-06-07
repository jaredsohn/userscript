// ==UserScript==
// @name			Auto Like Facebook | Edit by Javan_xD
// @description			Auto Like Facebook by Kusuma189 - Kakiteng c Kusuma. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			Ichand Kusuma | Edit by Javan_xD
// @authorURL			http://www.facebook.com/ichandkusuma
// @homepage			http://www.kakiteng.com/
// @include			htt*://www.facebook.com/*
// @icon			http://file.kakiteng.com/images/autolike.png
// @version			v.2.1.3 beta 4
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// ==/UserScript==
// ======= Jangan Menghapus Credit ======= | Edit by Javan_xD
// == Nama : Auto Like Facebook v.2.1.3 beta 4 ==
// ======= Author : Ichand Kusuma ========
// ======= Site : www.kakiteng.com =======
// =======================================
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.setAttribute('id', 'like2');
    div.style.position = "fixed";
    div.style.zIndex = 99;
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+110px";
    div.style.left = "+8px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
    body.appendChild(div);
    unsafeWindow.AutoLike = function () {

        var BounceCounterLike = 0;
        var Counter = 0;
        var prepare = document.getElementsByTagName("a");
        var buttons = new Array();
        for (var i = 0; i < prepare.length; i++) if (prepare[i].getAttribute("data-ft") != null && (prepare[i].getAttribute("title") == "Indica que Te gusta este artículo" || prepare[i].getAttribute("title") == "Like this item" || prepare[i].getAttribute("title") == "Sukai item ini" || prepare[i].getAttribute("title") == "Stop liking this item" || prepare[i].getAttribute("title") == "كن معجباً بهذا" || prepare[i].getAttribute("title") == "このアイテムに「いいね！」します" || prepare[i].getAttribute("title") == "좋아요" || prepare[i].getAttribute("title") == "對這項目讚好" || prepare[i].getAttribute("title") == "J’aime ça" || prepare[i].getAttribute("title") == "Bunu beğen")) {
            buttons[Counter] = prepare[i];
            Counter++;
        }


        function check_link(linknumber) {
            buttons[linknumber].click();
            var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: " + (linknumber + 1) + "/" + buttons.length + "</center></a>";
            document.getElementById('like2').innerHTML = message;
        };

        function like_timer(timex) {
            window.setTimeout(bouncer_like, timex);
        };

        function check_warning() {
            var warning = document.getElementsByTagName("label");
            var checkwarning = false;
            for (var i = 0; i < warning.length; i++) {
                var myClass = warning[i].getAttribute("class");
                if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
                    alert("Warning from Facebook");
                    checkwarning = true;
                }
            }
            if (!checkwarning) like_timer(2160);
        };

        function warning_timer(timex) {
            window.setTimeout(check_warning, timex);
        };

        function bouncer_like() {
            if (BounceCounterLike < buttons.length) {
                check_link(BounceCounterLike);
                warning_timer(700);
                BounceCounterLike++;
            }
        };
        alert('Started Auto Like | Edit by Javan_xD');
        bouncer_like();
    };


    div = document.createElement("div");
    div.setAttribute('id', 'like3');
    div.style.position = "fixed";
    div.style.zIndex = 99;
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+89px";
    div.style.left = "+8px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
    body.appendChild(div);
    unsafeWindow.LikeComments = function () {
        var BounceCounterLike = 0;
        var Counter = 0;
        var prepare = document.getElementsByTagName("a");
        var buttons = new Array();
        for (var i = 0; i < prepare.length; i++) if (prepare[i].getAttribute("data-ft") != null && (prepare[i].getAttribute("title") == "Me gusta este comentario" || prepare[i].getAttribute("title") == "Like this comment" || prepare[i].getAttribute("title") == "Suka komentar ini" || prepare[i].getAttribute("title") == "Nyenengi tanggapan iki" || prepare[i].getAttribute("title") == "الإعجاب بالتعليق" || prepare[i].getAttribute("title") == "このコメントはいいね！" || prepare[i].getAttribute("title") == "좋아요 취소" || prepare[i].getAttribute("title") == "說這則留言讚" || prepare[i].getAttribute("title") == "J’aime ce commentaire" || prepare[i].getAttribute("title") == "Bu yorumu beğen")) {
            buttons[Counter] = prepare[i];
            Counter++;
        }

        function check_link(linknumber) {
            buttons[linknumber].click();
            var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: " + (linknumber + 1) + "/" + buttons.length + "</center></a>";
            document.getElementById('like3').innerHTML = message;
        };

        function like_timer(timex) {
            window.setTimeout(bouncer_like, timex);
        };

        function check_warning() {
            var warning = document.getElementsByTagName("label");
            var checkwarning = false;
            for (var i = 0; i < warning.length; i++) {
                var myClass = warning[i].getAttribute("class");
                if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
                    alert("Warning from Facebook");
                    checkwarning = true;
                }
            }
            if (!checkwarning) like_timer(2160);
        };

        function warning_timer(timex) {
            window.setTimeout(check_warning, timex);
        };

        function bouncer_like() {
            if (BounceCounterLike < buttons.length) {
                check_link(BounceCounterLike);
                warning_timer(700);
                BounceCounterLike++;
            }
        };
        alert('Started Auto Like | Edit by Javan_xD');
        bouncer_like();
    };

    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.zIndex = 99;
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+55px";
    div.style.left = "+8px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#3B5998' href='' title='Refresh'><center>Reload (F5)</center></a>"
    body.appendChild(div);


    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.zIndex = 99;
    div.style.display = "block";
    div.style.width = "130px";
    div.style.opacity = 0.90;
    div.style.bottom = "+20px";
    div.style.left = "+8px";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='UpdateVersion()'><center>Check New Version</center></a></a>"
    body.appendChild(div);
    unsafeWindow.UpdateVersion = function () {
        alert('You are currently using Auto Like Facebook v.2.1.3 beta 4. more info click: www.kakiteng.com | Edit by Javan_xD');
    };
}