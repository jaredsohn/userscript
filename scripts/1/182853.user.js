// ==UserScript==
// @name       MuffinScript!
// @version    0.9
// @description  This script change some things only in this room: http://plug.dj/dubstep-fucking-mindblowing/ Enjoy it :)
// @match      http://plug.dj/dubstep-fucking-mindblowing/
// @copyright  2012+, You
// ==/UserScript==


/*Based on: http://stackoverflow.com/a/6825715/2391389*/
var e, code, angel;

function load(url, onLoad, onError) {
    e = document.createElement("script");
    e.setAttribute("src", url);
    if (onLoad !== null) {
        e.addEventListener("load", onLoad);
    }
    if (onError !== null) {
        e.addEventListener("error", onError);
    }
    document.body.appendChild(e);
    return e;
}

function loadStyle(url, onLoad, onError) {
    e = document.createElement("link");
    e.setAttribute("rel", "stylesheet");
    e.setAttribute("type", "text/css");
    e.setAttribute("href", url);
    if (onLoad !== null) {
        e.addEventListener("load", onLoad);
    }
    if (onError !== null) {
        e.addEventListener("error", onError);
    }
    document.body.appendChild(e);
    return e;
}

function execute(functionOrCode) {
    if (typeof functionOrCode === "function") {
        code = "(" + functionOrCode + ")();";
    } else {
        code = functionOrCode;
    }
    e = document.createElement("script");
    e.textContent = code;
    document.body.appendChild(e);
    return e;
}

function loadAndExecute(url, functionOrCode) {
    load(url, function () {
        execute(functionOrCode);
    });
}

/*My functions*/
unsafeWindow.myFunction = function () {
    myVar = setInterval(function () {
        document.getElementById("woot").click();
    }, 3000);
    /*    API.chatLog("--<{ Autowoot enabled }>--"); */
    ustawCookie("MuffinScript_AutoVote", "on", waznosc);
};
unsafeWindow.myStopFunction = function () {
    clearInterval(myVar);
    /*    API.chatLog("--<{ Autowoot disabled }>--"); */
    ustawCookie("MuffinScript_AutoVote", "off", waznosc);
};
unsafeWindow.myFunction2 = function () {
    myVar = setInterval(function () {
        document.getElementById("woot").click();
    }, 3000);
    ustawCookie("MuffinScript_Snow", "on", waznosc);
    $("#room canvas").each(function () {
        var current = $(this);
        if (current.css('left') == '-2px') {
            current.css('opacity', '1');
        }
    });
};
unsafeWindow.myStopFunction2 = function () {
    clearInterval(myVar);
    ustawCookie("MuffinScript_Snow", "off", waznosc);
    $("#room canvas").each(function () {
        var current = $(this);
        if (current.css('left') == '-2px') {
            current.css('opacity', '0');
        }
    });
};
unsafeWindow.switcher = function () {
    var valu = document.getElementById('guzik').getAttribute('class');
    if (valu == 'guzik-off') {
        $("#guzik").attr('class', "guzik-on");
        $("#guzik").stop().animate({
            backgroundPositionX: "0px"
        }, 300);
        myFunction();
    } else {
        $("#guzik").attr('class', "guzik-off");
        $("#guzik").stop().animate({
            backgroundPositionX: "-15px"
        }, 300);
        myStopFunction();
    }
};
unsafeWindow.switcher2 = function () {
    var valu = document.getElementById('guzik2').getAttribute('class');
    if (valu == 'guzik2-off') {
        $("#guzik2").attr('class', "guzik2-on");
        $("#guzik2").stop().animate({
            backgroundPositionX: "0px"
        }, 300);
        myFunction2();
    } else {
        $("#guzik2").attr('class', "guzik2-off");
        $("#guzik2").stop().animate({
            backgroundPositionX: "-15px"
        }, 300);
        myStopFunction2();
    }
};
unsafeWindow.AnimateRotate = function (angle) {
    // caching the object for performance reasons
    var $elem = $('#arrowButton');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({
        deg: 0
    }).animate({
        deg: angle
    }, {
        duration: 1000,
        step: function (now) {
            teraz = now;
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
};
unsafeWindow.teraz = 0;
unsafeWindow.AnimateRotate2 = function (angle) {
    // caching the object for performance reasons
    var $elem = $('#arrowButton');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({
        deg: teraz
    }).animate({
        deg: angle
    }, {
        duration: 1000,
        step: function (now) {
            teraz = now;
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
};

unsafeWindow.ustawCookie = function (nazwa, wartosc, expire) {
    document.cookie = nazwa + "=" + escape(wartosc) + ((expire === null) ? "" : ("; expires=" + expire.toGMTString()));
};

unsafeWindow.waznosc = new Date();
waznosc.setMonth(waznosc.getMonth() + 6);

unsafeWindow.pokazCookie = function (nazwa) { //1
    if (document.cookie !== "") { //2
        var toCookie = document.cookie.split("; "); //3
        for (i = 0; i < toCookie.length; i++) { //4
            var nazwaCookie = toCookie[i].split("=")[0]; //5
            var wartoscCookie = toCookie[i].split("=")[1]; //6
            if (nazwaCookie == nazwa) return unescape(wartoscCookie); //7
        }
    }
};

/*Script*/
setTimeout(function () {
    load("https://dl.dropboxusercontent.com/s/mbe9i6gbhycaafa/nprogress.js?dl=1&token_hash=AAHBCTqeb4q6n-BVbI2Iw71y3lxz9SUMM3SQaV2N86dpUQ");
    loadStyle("https://dl.dropboxusercontent.com/s/82eodoq2q05avma/nprogress.css?dl=1&token_hash=AAE5gBLmjE-25-jywQ4jqapV0aJzDNvjkgmX2SJyvR-wQA");
    load("http://www.bitstorm.org/jquery/color-animation/jquery.animate-colors-min.js");
}, 4000);
execute(function () {
    setTimeout(function () {
        NProgress.configure({
            minimum: 0.0000000000000000000000000000000000000000000000000000000000000000001
        });
        NProgress.configure({
            speed: 1
        });
        NProgress.set(0.0000000000000000000000000000000000000000000000000000000000000000001);
        NProgress.configure({
            speed: 16000
        });
        NProgress.done();
    }, 8000);
});
setTimeout(function () { //Waiting for JQuery libs from plug.dj and more code
    execute(function () { //Executing MY script
        var x = location.href;
        var myVar;
        var leaveHeader;
        var wlacznik;
        var teraz = 0;
        var zajety = "0";
        var buttonTwo = "<div onclick='switcher2()' id='grupa2' style='top:30px;border-radius:15px;cursor:pointer;position:absolute;width:225px;height:25px;'><p style='left: 35px;position: absolute; top:4px;'>Snow</p><div class='guzik2-off' id='guzik2' style='top:5px;position: absolute;left: inherit;height: 15px;width: 15px;overflow: hidden;background-image: url(http://i.imgur.com/7kZbEc8.png);right: 13px;background-position-x: -15px;'></div></div>";
        var buttonOne = "<div onclick='switcher()' id='grupa1' style='border-radius:15px;cursor:pointer;position:absolute;width:225px;height:25px;'><p style='left: 35px;position: absolute; top:4px;'>Autowoot</p><div class='guzik-off' id='guzik' style='top:5px;position: absolute;left: inherit;height: 15px;width: 15px;overflow: hidden;background-image: url(http://i.imgur.com/7kZbEc8.png);right: 13px;background-position-x: -15px;'></div></div>";
        var label = "<div id='label' style='opacity: 0;position: absolute;width: 39px;top: 53px; right: -8px;height: 0px;background-color: #1c1f25;z-index: 500001;opacity: 1;-webkit-box-shadow: inset 2px -2px 0 -1px #0a0a0a;-moz-box-shadow: inset 2px -2px 0 -1px #0a0a0a;box-shadow: inset 2px -2px 0 -1px #0a0a0a;cursor: default;'><div id='grupy' style='font-weight:bold;top:5px;left:5px;right:5px;left:5px;position:absolute;'>" + buttonOne + buttonTwo + "</div></div>";
        var downButton = "<div id='downButton' style='overflow: hidden;cursor: pointer;left: -35.5px;position: absolute;top: 0px;width: 27px;background-image: url(http://i.imgur.com/ZV4myJh.png);background-size: contain;background-repeat: no-repeat;background-position-y: 14px;height: 54px;'><div id='arrowButton' style='cursor: pointer;width: 27px;background-image: url(http://i.imgur.com/k9o49Zw.png);height: 54px;background-repeat: no-repeat;background-position-y: 14px;background-size: contain;'></div>" + label + "</div>";
        if (x == "http://plug.dj/dubstep-fucking-mindblowing/") {
            $("#header").css('overflow', 'visible');
            $("#notifications").css('z-index', '19');
            $("#chat-button").before(downButton);

            setTimeout(function () {
                setInterval(function () {
                    var current = $("#chat");
                    if (current.css('left') != 'initial') {
                        current.css('left', 'initial');
                        current.css('right', '0');
                    }
                    $("#notifications").each(function () {
                        var current = $(this);
                        current.css('left', '764px');
                        current.css('opacity', '0.97');
                    });
                    $("#dj-button").each(function () {
                        var current = $(this);
                        current.css('left', '150px');
                        current.css('top', 'auto');
                        current.css('bottom', '10px');
                        current.css('width', '225px');
                        current.css('height', '41.5px');
                    });
                    $("#user-lists, #waitlist").each(function () {
                        var current = $(this);
                        if (current.css('left') != 'initial') {
                            current.css('left', 'initial');
                            current.css('right', '0');
                        }
                    });
                    setTimeout(function () {
                        $("#user-lists .list").each(function () {
                            var current = $(this);
                            current.css('width', '306px');
                        });
                    }, 200);
                }, 500);
            }, 6000);
            $('head').append('<link rel="stylesheet" href="https://dl.dropboxusercontent.com/s/lu36shhj2fxbvgj/css2.css?dl=1&token_hash=AAELgs2QDnX-IIviSIOoQePLmeTHXmal2oM5nECuiyzeFg" type="text/css" />');
            /*     $("#room canvas").each(function () {
                var current = $(this);
                if (current.css('left') == '-2px') {
                    current.css('opacity', '0');
                }
            }); */
            /*Snow enabled now :)*/
            setTimeout(function () {
                $("body").each(function () {
                    var current = $(this);
                    current.css('background-image', 'url(http://i.imgur.com/rdtqg99.jpg)');
                });
            }, 1500);
            setTimeout(function () {
                $("#chat").each(function () {
                    var current = $(this);
                    if (current.css('left') != 'initial') {
                        current.css('left', 'initial');
                        current.css('right', '0');
                    }
                });
            }, 1000);
            setTimeout(function () {
                $("#dj-button").each(function () {
                    var current = $(this);
                    current.css('left', '150px');
                    current.css('top', 'auto');
                    current.css('bottom', '10px');
                    current.css('width', '225px');
                    current.css('height', '41.5px');
                });
                $("#notifications").each(function () {
                    var current = $(this);
                    current.css('left', '764px');
                });
            }, 1900);
            setTimeout(function () {
                $("#dj-button .left .icon-current-dj-white, #dj-button .left .icon-booth-locked-big, #dj-button .left .icon-leave-waitlist-big, #dj-button .left .icon-waitlist-full-big, #dj-button .left .icon-leave-booth-big, #dj-button span").each(function () {
                    var current = $(this);
                    current.css('top', '20%');
                });
            }, 2800);
            $("#room #playback .background img").each(function () {
                var current = $(this);
                if (current.attr('src') == '/_/static/images/custom/winter/videoframe.95193af.png') {
                    current.attr('src', 'http://i.imgur.com/5Ik6tAA.png');
                }
            });
            $("#grupa1").mouseover(function () {
                $("#grupa1").stop().animate({
                    backgroundColor: "rgba(10, 10, 10, 1)"
                }, 300);
            });
            $("#grupa1").mouseleave(function () {
                $("#grupa1").stop().animate({
                    backgroundColor: "rgba(10, 10, 10, 0.0)"
                }, 300);
            });
            $("#grupa2").mouseover(function () {
                $("#grupa2").stop().animate({
                    backgroundColor: "rgba(10, 10, 10, 1)"
                }, 300);
            });
            $("#grupa2").mouseleave(function () {
                $("#grupa2").stop().animate({
                    backgroundColor: "rgba(10, 10, 10, 0.0)"
                }, 300);
            });
            /*          $("#header").mouseenter(function () {
                var leaveHeader = "no";
            });
            $("#header").mouseleave(function () {
                var leaveHeader = "yes";
                setTimeout(function () {
                    setTimeout(function () {
                        if (leaveHeader == "yes") {
                            $("#label").stop().animate();
                            AnimateRotate2(0);
                            setTimeout(function () {
                                $("#label").contents().stop().animate();
                                $("#label").contents().css('opacity', '1');
                                $("#label").contents().animate({
                                    opacity: "0"
                                }, 600);
                                setTimeout(function () {
                                    $("#label").animate({
                                        width: "39px"
                                    });
                                    $("#label").animate({
                                        height: "0px"
                                    });
                                    wlacznik = 0;
                                    setTimeout(function () {
                                        $("#downButton").css('overflow', 'hidden');
                                    }, 600);
                                }, 500);
                            }, 1);
                        }
                    }, 1);
                });
            }); */
            $("#arrowButton").click(function () {
                if (wlacznik != 1) {
                    $("#downButton").css('overflow', 'visible');
                    AnimateRotate(180);
                    $("#label").stop().animate();
                    $("#label").contents().stop().animate();
                    $("#label").contents().css('opacity', '0');
                    setTimeout(function () {
                        $("#label").animate({
                            height: "150px"
                        });
                        $("#label").animate({
                            width: "235px"
                        });
                        setTimeout(function () {
                            $("#label").contents().stop().animate();
                            $("#label").contents().css('opacity', '0');
                            $("#label").contents().animate({
                                opacity: "1"
                            }, 600);
                            wlacznik = 1;
                        }, 600);
                    }, 1);
                } else {
                    $("#label").stop().animate();
                    AnimateRotate2(0);
                    setTimeout(function () {
                        $("#label").contents().stop().animate();
                        $("#label").contents().css('opacity', '1');
                        $("#label").contents().animate({
                            opacity: "0"
                        }, 600);
                        setTimeout(function () {
                            $("#label").animate({
                                width: "39px"
                            });
                            $("#label").animate({
                                height: "0px"
                            });
                            wlacznik = 0;
                            setTimeout(function () {
                                $("#downButton").css('overflow', 'hidden');
                            }, 600);
                        }, 500);
                    }, 1);

                }
            });
            $("#dj-button, #chat-button, #users-button, #waitlist-button, #footer, #user-lists ,header, #user-lists .header .button, #plug-menu *").click(function () {
                var current = $("#chat");
                if (current.css('left') != 'initial') {
                    current.css('left', 'initial');
                    current.css('right', '0');
                }
                $("#notifications").each(function () {
                    var current = $(this);
                    current.css('left', '764px');
                    current.css('opacity', '0.97');
                });
                $("#dj-button").each(function () {
                    var current = $(this);
                    current.css('left', '150px');
                    current.css('top', 'auto');
                    current.css('bottom', '10px');
                    current.css('width', '225px');
                    current.css('height', '41.5px');
                });
                $("#user-lists, #waitlist").each(function () {
                    var current = $(this);
                    if (current.css('left') != 'initial') {
                        current.css('left', 'initial');
                        current.css('right', '0');
                    }
                });
                setTimeout(function () {
                    $("#user-lists .list").each(function () {
                        var current = $(this);
                        current.css('width', '306px');
                    });
                }, 200);
            });
            $("#waitlist .header").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#waitlist .list").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#chat").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#chat-header").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#chat-messages").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#chat-input").each(function () {
                var current = $(this);
                current.css('width', '289.147826px');
            });
            $(".chat-input-form").each(function () {
                var current = $(this);
                current.css('width', '289.147826px');
            });
            $("#chat-input-field").each(function () {
                var current = $(this);
                current.css('width', '269px');
            });
            $("#chat-header .divider").each(function () {
                var current = $(this);
                current.css('width', '191px');

            });
            $("#chat-popout-button").each(function () {
                var current = $(this);
                current.css('right', '0px');
                current.css('left', 'initial');
            });
            $("#user-lists, #waitlist").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#user-lists .header").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#user-lists .list-header").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#header-panel-bar").each(function () {
                var current = $(this);
                current.css('width', '306px');
            });
            $("#chat-button").each(function () {
                var current = $(this);
                current.css('width', '102px');
            });
            $("#users-button").each(function () {
                var current = $(this);
                current.css('width', '102px');
                current.css('left', '102px');
            });
            $("#waitlist-button").each(function () {
                var current = $(this);
                current.css('width', '102px');
                current.css('left', '204px');
            });
            $("#user-lists, #waitlist").each(function () {
                var current = $(this);
                if (current.css('left') != 'initial') {
                    current.css('left', 'initial');
                    current.css('right', '0');
                }
            });
        }
    });
    var autovote = pokazCookie("MuffinScript_AutoVote");
    if (autovote !== "off") {
        if (autovote !== "on") {
            ustawCookie("MuffinScript_AutoVote", "on", waznosc);
        } else {
            switcher();
        }
    }
    var snow = pokazCookie("MuffinScript_Snow");
    if (snow !== "off") {
        if (snow !== "on") {
            ustawCookie("MuffinScript_Snow", "on", waznosc);
        } else {
            switcher2();
        }
    } else {
        $("#room canvas").each(function () {
            var current = $(this);
            if (current.css('left') == '-2px') {
                current.css('opacity', '0');
            }
        });
    }
    var version = pokazCookie("MuffinScript_Version");
    if (version !== undefined) {
        if (version !== "0.9") {
            alert("Enjoy new version of MuffinScript! 0.9");
            ustawCookie("MuffinScript_Version", "0.9", waznosc);
        }
    } else {
        ustawCookie("MuffinScript_Version", "0.9", waznosc);
        alert("MuffinScript uses cookies to save settings! Don't delete them (and also don't eat them =D).");
        alert("Enjoy new version of MuffinScript! 0.9");
    }
}, 30000);