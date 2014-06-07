/*****************************************************************************\
* Copyright (C) 2008-2010  Lúthien Sofea Elanessë                             *
*                                                                             *
*    This program is free software: you can redistribute it and/or modify     *
*    it under the terms of the GNU General Public License as published by     *
*    the Free Software Foundation, either version 3 of the License, or        *
*    (at your option) any later version.                                      *
*                                                                             *
*    This program is distributed in the hope that it will be useful,          *
*    but WITHOUT ANY WARRANTY; without even the implied warranty of           *
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            *
*    GNU General Public License for more details.                             *
*                                                                             *
*    You should have received a copy of the GNU General Public License        *
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.    *
\*****************************************************************************/

// ==UserScript==
// @name            Jeuxvideo.Nyu v1.2
// @namespace        JVN
// @description        /!\ ALPHA /!\
// @version            1.2.0 Build33
// @include            http://www.jeuxvideo.com/*
// @include            http://f.jeuxvideo.com/*
// @include            http://m.jeuxvideo.com/*
// @include            http://jeuxvideonyu.web44.net/*
// @include            http://127.0.0.1/*.jeuxvideo.com*
// @include            http://127.0.0.1/jeuxvideonyu.web44.net*
// @copyright        2008-2010, Lúthien Sofea Elanessë
// @copyright        <sofea@jeuxvideonyu.web44.net>
// @license            GPL version 3 or any later version;
// @license            http://www.gnu.org/copyleft/gpl.html
// @resource        licence    http://www.gnu.org/licenses/gpl-3.0.txt
// @contributor        JVC    L'Odyssée Interactive
// @contributor        JVF    Anonymous59
// @contributor        Ico    Ange
// @contributor        1.1    Paic,Shaka,Amber,Ange,Dium
// @contributor        1.1    Suumas,Kukirio,Dargor,Sil'
// @contributor        JsLint    Douglas Crockford
// @contributor        Javascript    Dargor
// @contributor        ß-0    none
// ==/UserScript==

// ==Reminder Annihilatio==
// licence    http://jeuxvideonyu.web44.net/JVN/licence.txt
// ==/Reminder Annihilatio==

var CSS, Cookie, Colonnes, Create, GM, Icone, JVN, JVN_Menu, Lecteur,
Menu, Messages, Moderateur, JVN_Option, Profil, Pseudonyme, Reponse, 
Scripts, Sujets, System, begin_date_test, JVN_id, JVN_id_old, Const,
Reg, B, Exclusion, Citation, navi, fatal;

begin_date_test = new Date();

JVN_Option = {
    debug : true,
    CSS : true,
    scripts : true,
    arme : true,
    firstPage : true,
    lastPage : true,
    citation : true,
    verrou : true,
    formulaire : false,
    formulaireVerrou : false,
    stats : true,
    seeAncre : true,
    hide : true,
    censure : true,
    exclusion : true,
    immuneMod : true,
    icone : "b64",
    version : "1.2.0"
};

fatal = [];

JVN_id = {
    citation : "JVN:Citation:Message",
    cookie : "JVN:Cookie:",
    exclusion : "JVN_Exclusion_",
    censure : "JVN_censure_",
    version : "1.2.1"
};

Reg = {
    forum : {
        exp : function (context, server, mode, forum, sujet, page,
            hash, index, recherche, motif, ancre) {
            var reg;
            if (!context) {
                context = "//";
            }
            if (!server) {
                server = ".+";
            }
            if (!mode) {
                mode = "[0-9]+";
            }
            if (!forum) {
                forum = "[0-9]+";
            }
            if (!sujet) {
                sujet = "[0-9]+";
            }
            if (!page) {
                page = "[0-9]+";
            }
            if (!hash) {
                hash = "[a-z0-9]+";
            }
            if (!index) {
                index = "[0-9]+";
            }
            if (!recherche) {
                recherche = "[0-9]+";
            }
            if (!motif) {
                motif = "[^./]+";
            }
            if (!ancre) {
                ancre = "";
            }
            reg = context;
            reg += "(" + server + ")";
            reg += "\\.jeuxvideo\\.com/forums/" + "(" + mode + ")";
            reg += "-" + "(" + forum + ")";
            reg += "-" + "(" + sujet + ")";
            reg += "-" + "(" + page + ")";
            reg += "-" + "(" + hash + ")";
            reg += "-" + "(" + index + ")";
            reg += "-" + "(" + recherche + ")";
            reg += "-" + "(" + motif + ")";
            reg += "\\.htm#?" + ancre;
            return reg;
        },
        ans : ["type", 
            "context", 
            "server", 
            "mode", 
            "forum", 
            "sujet", 
            "page", 
            "hash", 
            "index", 
            "recherche", 
            "motif", 
            "ancre"],
        version : "1.2.0"
    },
    dummy : {
        exp : function () {
            var reg;
            reg = "//(.*)\\.jeuxvideo\\.com/forums/([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([a-z0-9]+)-([0-9]+)-([0-9]+)-([^./]+)\\.htm#?$";
            return reg;
        },
        ans : ["type", 
            "context", 
            "server", 
            "mode", 
            "forum", 
            "sujet", 
            "page", 
            "hash", 
            "index", 
            "recherche", 
            "motif",
            "ancre"],
        version : "1.2.0"
    },
    version : "1.2.0"
};

JVN_id_old = {
    version : "1.2.1"
};

navi = (function () {
    var answer, detect, OS, browser;
    answer = [];
    detect = navigator.userAgent.toLowerCase();
    
    function checkIt(string, detect) {
        var place;
        place = detect.indexOf(string) + 1;
        return place;
    }
    
    if (checkIt('konqueror', detect)) {
        browser = "Konqueror";
        OS = "Linux";
    } else if (checkIt('avantbrowser', detect)) {
        browser = "Avant Browser";
    } else if (checkIt('lunascape', detect)) {
        browser = "Lunascape";
    } else if (checkIt('chrome', detect)) {
        browser = "Chrome";
    } else if (checkIt('safari', detect)) {
        browser = "Safari";
    } else if (checkIt('omniweb', detect)) {
        browser = "OmniWeb";
    } else if (checkIt('opera', detect)) {
        browser = "Opera";
    } else if (checkIt('webtv', detect)) {
        browser = "WebTV";
    } else if (checkIt('icab', detect)) {
        browser = "iCab";
    } else if (checkIt('msie', detect)) {
        browser = "IE";
    } else if (checkIt('firebird', detect)) {
        browser = "Firebird";
    } else if (checkIt('firefox', detect)) {
        browser = "Firefox";
    } else if (!checkIt('compatible', detect)) {
        browser = "Netscape";
    } else {
        browser = "An unknown browser";
    }
    
    if (!OS) {
        if (checkIt('linux', detect)) {
            OS = "Linux";
        } else if (checkIt('x11', detect)) {
            OS = "Unix";
        } else if (checkIt('mac', detect)) {
            OS = "Mac";
        } else if (checkIt('win', detect)) {
            OS = "Windows";
        } else {
            OS = "an unknown operating system";
        }
    }
    
    answer.browser = browser;
    answer.os = OS;
    return answer;
}());

switch (navi.browser) {
case "Netscape" :
case "Firefox" :
    GM = {
        arr : [],
        get : function (ind, val) {
            if (this.arr[ind] === undefined) {
                this.arr[ind] = GM_getValue(ind, val);
            } 
            return this.arr[ind];
        },
        set : function (ind, val) {
            this.arr[ind] = val;
            GM_setValue(ind, val);
        },
        del : function (ind) {
            this.arr[ind] = undefined;
            GM_deleteValue(ind);
        },
        lis : function () {
            return GM_listValues();
        },
        unl : function (ind) {
            this.arr[ind] = undefined;
        },
        log : function (str) {
            GM_log(str);
        },
        version : "1.2.1"
    };
    break;
case "Chrome" :
    GM = {
        arr : [],
        get : function (ind, val) {
            var i;
            if (this.arr[ind] === undefined) {
                if (localStorage[ind] !== undefined) {
                    this.arr[ind] = localStorage[ind];
                } else {
                    this.arr[ind] = val;
                }
                switch (this.arr[ind]) {
                case "true" :
                    this.arr[ind] = true;
                    break;
                case "false" :
                    this.arr[ind] = false;
                    break;
                default :
                    i = parseInt(this.arr[ind], 10);
                    if (i + "" == this.arr[ind]) {
                        this.arr[ind] = i;
                    }
                    break;
                }
            } 
            return this.arr[ind];
        },
        set : function (ind, val) {
            this.arr[ind] = val;
            localStorage[ind] = val;
        },
        del : function (ind) {
            this.arr[ind] = undefined;
            localStorage.removeItem(ind);
        },
        lis : function () {
            var list, key;
            list = [];
            for (key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    list.push(key);
                }
            }
        },
        unl : function (ind) {
            this.arr[ind] = undefined;
        },
        log : function (str) {
        },
        version : "1.2.2"
    };
    break;
case "Opera" :
    GM = {
        arr : [],
        get : function (ind, val) {
            if (this.arr[ind] === undefined) {
                this.arr[ind] = Cookie.read(ind);
                if (this.arr[ind] === undefined) {
                    this.arr[ind] = val;
                }
            } 
            return this.arr[ind];
        },
        set : function (ind, val) {
            this.arr[ind] = val;
            Cookie.write(ind, val);
        },
        del : function (ind) {
            this.arr[ind] = undefined;
            Cookie.write(ind, "", true);
        },
        lis : function () {
            return Cookie.list;
        },
        unl : function (ind) {
            this.arr[ind] = undefined;
        },
        log : function (str) {
            window.opera.postError(str);
        },
        version : "1.2.3"
    };
    break;
case "IE" :
case "Safari" :
    GM = {
        arr : [],
        get : function (ind, val) {
            if (this.arr[ind] === undefined) {
                this.arr[ind] = Cookie.read(ind);
                if (this.arr[ind] === undefined) {
                    this.arr[ind] = val;
                }
            } 
            return this.arr[ind];
        },
        set : function (ind, val) {
            this.arr[ind] = val;
            Cookie.write(ind, val);
        },
        del : function (ind) {
            this.arr[ind] = undefined;
            Cookie.write(ind, "", true);
        },
        lis : function () {
            return Cookie.list;
        },
        unl : function (ind) {
            this.arr[ind] = undefined;
        },
        log : function (str) {
        },
        version : "1.2.4"
    };
    break;
default :
    GM = {
        arr : [],
        get : function (ind, val) {
            if (this.arr[ind] === undefined) {
                this.arr[ind] = val;
            } 
            return this.arr[ind];
        },
        set : function (ind, val) {
            this.arr[ind] = val;
        },
        del : function (ind) {
            this.arr[ind] = undefined;
        },
        lis : function () {
            var key, list;
            list = [];
            for (key in this.arr) {
                if (this.arr.hasOwnProperty(key)) {
                    list.push(key);
                }
            }
            return list;
        },
        unl : function (ind) {
            this.arr[ind] = undefined;
        },
        log : function (str) {
        },
        version : "1.2.0"
    };
    break;
}

Cookie = {
    enable : undefined,
    data : [],
    allow : function () {
        if (this.enable === undefined) {
            this.enable = navigator.cookieEnabled;
        }
        return this.enable;
    },
    write : function (name, value, destroy, path) {
        var val, cookie, time;
        if (name !== undefined) {
            name = this.encode(name);
            val = this.encode(value);
            if (Cookie.allow()) {
                cookie = name + "=" + val;
                if (destroy) {
                    time = -10;
                } else {
                    time = 365 * 24 * 60 * 60 * 1000;
                }
                cookie += "; expires=" +
                    (new Date(new Date().getTime() + time)).toGMTString();
                if (path) {
                    cookie += "; path=" + path;
                } else {
                    cookie += "; path=/";
                }
                document.cookie = cookie;
            }
            this.data[name] = val;
        }
    },
    read : function (name) {
        var tempData, i;
        if (name === undefined) {
            if (Cookie.allow()) {
                tempData = document.cookie.split("; ");
                for (i = 0;i < tempData.length; ++i) {
                    if (new RegExp("^([^=]*)=(.*)$").test(tempData[i])) {
                        this.data[RegExp.$1] = this.decode(RegExp.$2);
                    }
                }
                return document.cookie;
            }
        } else {
            name = this.encode(name);
            if (Cookie.allow()) {
                tempData = "; " + document.cookie;
                if (new RegExp("; " + name + "=([^;]*);?").test(tempData)) {
                    this.data[name] = this.decode(RegExp.$1);
                }
            }
            return this.data[name];
        }
    },
    reset : function (name) {
        if (name !== undefined) {
            this.data[name] = undefined;
        }
    },
    decode : function (val) {
        return decodeURIComponent(val);
    },
    encode : function (val) {
        return encodeURIComponent(val);
    },
    list : function () {
        var key, list;
        Cookie.read();
        list = [];
        for (key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                list.push(key);
            }
        }
        return list;
    },
    version : "1.2.0"
};

Icone = {
    MaJ    : {
        url : "jeuxvideonyu.web44.net/icones/maj.png",
        alt : "www.noelshack.com/up/aac/maj-ee8dfda395.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAFAAAAARCAYAAABKFStkAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kIHAkwL6gcdIQAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAAD5ElEQVRYw+2Yz2tcVRTHP/f9TjpJ" +
            "E3VhJCi0NStLBkItkqCNIkhAKvY/cJOtkC4EBetOJAG7dFkQXAlKxI2" +
            "kCf5Y2DhQMIpVx4WGiLFNM53JzLz35r7nIvPu3Jl5L5mJ6GoODHNyvv" +
            "ec7znn/pyI+ZmlmIH0JeuFFZHoFsCZyblBV/qTOGmiBSCjYNCSPuSJx" +
            "55mnqV4vbAiTtzAOD7c+UKI/3aq/yeefmXy0TzzM0uxBRBJyWEjQ/yg" +
            "jOuMYBq2GpzYbWuIelAmikKFGYaN54x02U+CGYbNsDcOQLV+v4tn2Bt" +
            "XeckoVGM6MR0HUmN2cgEqH13vHK9ztG3hOI6p1P7ms6/e5IULV3l47A" +
            "ymYSOjkHv7v7G2ucylmdfZKLzfNRsvXnyDL759N3WmjsKev3CVm5vLX" +
            "TbPGeHzb97uGn/5ufcYcseI4obKKRE9Z70WgIXZd6gH5WO59PrSatU5" +
            "1MQmDZRRQKNRA2Btc5ndvTvUgxK7e3dUon5YVo75qSvM5Rd56Zm3yA0" +
            "/wsLsNebyiwqfyy+yMHvtSMw0zLZ4ADc3l3lwsJPKY1kOMgqoVHdVTo" +
            "nf2uYyleouDekjo4CwWQvAg4Md1by5/KLKpZNLr6+z1jSOVgOlPPxEU" +
            "jltFK7z+58FNgrXlS2KIqXf/vljvr79AULYCGw8ZwzPGVe454zjOWMY" +
            "wsnEmvQAuM6o0sNGkMoTRwIpJWHDz/DzVS2RVose75B7PBXT69P1LA6" +
            "1he+WigAc1O61LdnCTx+1/V2u/qX0p86+zLD3EK6To+rvdfnvV7YJGl" +
            "V1+Kdh1fqest3dLyr9oHa3Zx7d7375D/zwACFE2xg97/3KdmZNWbrOU" +
            "arsKA5T2K0lkNx2iZx7/FLbd6d47mk89zSGYaX6p92kR0lx+0sAzp+7" +
            "jOPkeuZJ/Prl60dUbk++guvk2l4ERpbT6KkJLp5/jdFTE6l43S9Rre9" +
            "R8/eJosa/TvLs5LMn4un0i2NJ3S9R90vKph/6R2F+UFG6EMaxuXU10B" +
            "CtQ90yHFw7h2U4LTKzpW8VV/nuxw+5tXVDHdi6v65nYboteVJ8/+unS" +
            "Bn0zJP4JfagUePWDzfYKq4CMD11hdHcBNPNi2CruJqJJStteupVhtyx" +
            "7tx++YRAu5wAxPzMUizjsHlwNtQsuE4Ow7DabLY9RBjWiGKpvc9MXLt" +
            "7bOLfOpR7i40A2+qdR/k14x7eoBWiSGIIs7nlTOJY4gcVFTMLS+z6it" +
            "RzS3IAMIXd3sCsl79uSztfssb28qsiLXa/PJ1xdd80n+OwzjhpHKqBA" +
            "J1NHEhvom7h9cKKMIU96MgJpG2fDf432L/8AxZ5rfnI/HiVAAAAAElF" +
            "TkSuQmCC"
    },
    neutre    : {
        url : "jeuxvideonyu.web44.net/icones/neutre.png",
        alt : "www.noelshack.fr/uploads/neutre018962.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kBEgEyO2MshoEAAAE3SURBVDjLhZMxa8MwEIXfy" +
            "R4MGTqFjAmZO3dWl8yloNl0K4T8mhDoVjobgucs0dzZs0nG4qmDwYt1" +
            "HRwJW7aaN0q8T+9Od5QqhSl9ZRn7Z6lS5J/FIWNbihE0Wnd3fVDsm+t" +
            "zhGTZPU6zlwGgLXMHspD4rjnZOAAB4DpHWwoHEQDwtt0ygIFZLI7OTM" +
            "kTxMM7kGxGqWIAkFKiPkcAeLKh3Hw7EN+StGWOaJ2xsK9PqjnhnkTow" +
            "vy8DiDm96NL4kFdE6vCYA6BZMngOh/W+k+SOBhtcQym4jpHc+1GgbTW" +
            "bBt52RPmj8L9RrA1V8LsuUWqFInPw2EwnlVhHD1krgozLkFrjdUthe3" +
            "HlKrCYLVjN85kl8l+p5QSAHDZj1OsdjxaKupvY38mLKgvrTX8kmlqna" +
            "eGyzda/QHJ3o7Xk0krQAAAAABJRU5ErkJggg=="
    },
    nyu    : {
        url : "jeuxvideonyu.web44.net/icones/nyu.gif",
        alt : "www.noelshack.com/uploads/nyu007731.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhEAAQAOMAAAAAAAD/AMbGxs6cAM7Ozv/OAP//Y///nP///wA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/g" +
            "U6bnl1OgAh+QQFHgAPACwAAAAAEAAQAAAEVPDJCWqdWNbC+c1AZ4yGh" +
            "4UWcKQFIAkpEltam94o3CJy3+coHsA3BA5sFUOqBIAdRaSRR+DsWDuu" +
            "h3NgQRa4LxjgOfZkw+UWOaMdD7hvMPthEZ8fEQAh+QQFHgAPACwAAAA" +
            "AEAAQAAAEHPDJSau9OOstEQLdh3kTiQGghHKpyr1wLM90fUUAIfkEBR" +
            "4ADwAsAAAAABAAEAAABBzwyUmrvTjrPQFCkgdeYvhpAJVaa8i9cCzPd" +
            "K1FACH5BAUeAA8ALAAAAAAQABAAAAQd8MlJq7046y0B9RsAPmKGINOJ" +
            "ASrZcnAsz3RtVxEAOw=="
    },
    shoot    : {
        url : "jeuxvideonyu.web44.net/icones/shoot.gif",
        alt : "www.noelshack.com/uploads/shoot018595.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhEAAQAOMOAAAAAABqm59oAACLy9GJAACu/+CTAW3R/8DAwPv" +
            "DAKnk///jHv/wfv/5zvalt : /////yH/C05FVFNDQVBFMi4wAwEAAA" +
            "Ah/gY7c2hvb3QAIfkECQEADwAsAAAAABAAEAAABGjwyQlqnVjWxfnNQ" +
            "MIxJONhocc0DWAugIQAo+MA9g1rImy3PxNg1iMBWK2GkDgqIUmwmaFo" +
            "cUGHgGmnCk0Mpb2DQnHgeGVZbaFcThhiD4R0OjgkCm64bAYgBAoEAx8" +
            "YcnwWCBmEhYgZEQAh+QQJAQAPACwAAAAAEAAQAAAEaPDJCWqdWNbF+c" +
            "1AsjQk6WHh6ABOC5wP8jas2zYLoIlNu/oAHEDG+9kcQuKo5/MlAQYez" +
            "XLLyaJLC4uUGF55B4XiwNXFAAJsgUxOGMwIWToxOCQKbrMkXiEECgQD" +
            "HxhxMloIGYSFiBkRACH5BAkBAA8ALAAAAAAQABAAAARn8MkJap1Y1sX" +
            "5zUCyNCTpYeEIOCzQnA8CjE3LOjOgic1qOyaAjPfDARfCFOnGfCUNvJ" +
            "6F5ZRBaZYVKSG08g4KxWGriwEE18J4nDCUETJ0YnBIFNplCbxCCBQIA" +
            "x8YcDJZCBmDhIcZEQAh+QQJAQAPACwAAAAAEAAQAAAEavDJCWqdWNbF" +
            "+c1AwjEk42HhCDQNA5wP8i6A4zT1TWviwtg5B8AEkPVcDNaqRTOOSqw" +
            "WUWY4WoakJqDauWYTRWrvoFAcOGAJlVs4nxMGgHqdGBwSBbh8gpABCA" +
            "EFBAMfGH1+FggZhoeKGREAOw=="
    },
    actif    : {
        url : "jeuxvideonyu.web44.net/icones/actif.png",
        alt : "www.noelshack.fr/uploads/actif099716.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kCBRAzGqHUey8AAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAACp0lEQVRIx9WXO2sUURSAv3N3ZnY1" +
            "T2ISoxZCfCwpApIVfCJYWIqxsLGxsfEnCTY2NhZRLC2EgC8wQUgRUmg" +
            "ISXBFjJuErJmdmXssMjM7iZtk1so9MHDnvOZ+95wzw0iVfqUDZYSaJG" +
            "sHYPjhg46DqD55qgmIA0C93nEQw/fvUX32XEeoSQyxnTtYVbEoqiACB" +
            "kFEdulhxyYImtElkrVBa79s7n1BJm9TffFKHQDZ2soFYFX5bSM2woDA" +
            "Kq4Reh0XTwwNtaleBDwxeMbQsBbfWqJ4wwWEojG4xuDbCNjx9a2loRZ" +
            "BMAJFY+gtuBSNORAk006/c1WgbiNW/W3Ks9Opfn7iBgOOy1oYMJbRAy" +
            "xdvMnpT29a5pufuJH6z1y4RuXz2798apdv4RWcfBA2B0SkSi1sUJ57B" +
            "8DU6Dh3v84xNjvNx3KFSwszAHwoVxhyXI6aAt0irIxfZbnhcyW2vy9X" +
            "OOF6RFGU5l7LdMLLM+McdzxGXI8hx0UlwOaBMDkgrCqNwE/vi40gXW9" +
            "mXgwDQchJLeCJIkCXKvUwTO3HgpBBNYRhM163mzN558scAD/PVSgFls" +
            "IhACnE0sLCoY4hyiqW0aRVVpdT27eV5rq6uIjB4CJpXBXL+YxdMXzHc" +
            "jbWfV9ZSeOnpIdTGPoQNuOhP0hK6Uz8gzzSZgtkHxPFl0ExQLtf0n6E" +
            "PoRiDoBETDsPyKZ8LF2Z02ha1lF+YPmF4reIkxY6s6c1nDYA2oKQPZs" +
            "9kQkdRHgtvQBM6ibXdYOKruPHdcjGleLtZXV9LextHW6Vfs3zqVOUbW" +
            "Az3pgLJKPZhaBAHSWIgT2gG8ED/ExcT9wq/j65ehBKbVSirZkQhBKK1" +
            "yJ5UpMjMUxSOdMizuTI1W4tBCBvNf5HKSWHOEJNSnSu7Kpbp/5b/AH8" +
            "7g4WVzg8OAAAAABJRU5ErkJggg=="
    },
    blueK    : {
        url : "jeuxvideonyu.web44.net/icones/bluek.png",
        alt : "www.noelshack.fr/uploads/bluek076359.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQNH+Hl/bQAAAD7SURBVCjPhdFPK4RxFMXxz" +
            "2/Gn5pRFk9KbNhJEbHTlAVvQfa8IktlZ+EtyNLCwlN28goojPybZwZj" +
            "rsUwTIqzu93vOZ3bTZk8/KO65QQDUKst/QkfH+dRt5xk8lhfjJ5W5+5" +
            "ibaH9a87kUYJm8Z1ydXvo6KwMZiYOXN+deH5u6NX4CV9cboLpbB+MDM" +
            "96bVVBCYpG/43j1R2vL6H8vqLdmtQsSiBl8giFetT6DKNpT9mUZKgLq" +
            "nSTf6qStsFDbOmoC+3e7hecVI2mXXAfGzpuhPf+Gh2P3pwiDFoSWtrO" +
            "JRWD5pWMSZDJo+NJaPTSCaHA22ffrAt/Gf57+webMHQzlgwMswAAAAB" +
            "JRU5ErkJggg=="
    },
    red    : {
        url : "image.jeuxvideo.com/pics/forums/bt_forum_avertirmod.gif",
        alt : "image.jeuxvideo.com/pics/forums/bt_forum_avertirmod.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAMQAAAAAAP///94iD8ISALAQAIsNAOc+K/4nEf87Jv9" +
            "PPbcqG50PAMwTAP8yHfdCLrYRAOc1Ip8fEt8sGZ4YC/9EMLwRAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAALA" +
            "AwAAAVAICOOIwAwSaqmzEm9QWA4r4jcsQLdYuPHEYlPdCjGJoKiaMAk" +
            "FAoE5pIZWzykDOYgBsVqnd1BK9skVM6tE4kUAgA7"
    },
    redC    : {    // need b64
        url : "jeuxvideonyu.web44.net/icones/redC.png",
        alt : "www.noelshack.fr/uploads/redc090963.png",
        b64 : undefined
    },
    blueG    : {
        url : "jeuxvideonyu.web44.net/icones/blueg.png",
        alt : "www.noelshack.fr/uploads/blueg005213.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQGDmihBI0AAAC6SURBVCjPhdAxSkNBEMbx3" +
            "z4kCA9rLyFiL3gREQsPkMoDeIRcIN5FxGPYWClEULF5Jk6KnaebFMnX" +
            "DPvNf2a/3cI07NWswEE93O6jg1lJePHvxukGVcojriES/krwPIG7RDv" +
            "0ONHE+Ny69Q1nOMqBoYXft+Bv/GCJgo8WfkroMuszOhHzjHWDXrfzA/" +
            "70gmETrhuIeBBxn94FftsYoyZKucJr4x3iuPaqMY36ILllaGKsMEE/w" +
            "uPAbq0B0Y8taKG3U2QAAAAASUVORK5CYII="
    },
    apercu    : {
        url : "image.jeuxvideo.com/pics/forums/bt_forum_apercu.gif",
        alt : "image.jeuxvideo.com/pics/forums/bt_forum_apercu.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhUAARALMAAAAAANbW1sXFxe/v7zMzM+bm5szMzPT09N7e3gA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAABQABEAAATe0M" +
            "hJq704672BN0cojmRpnmiqpsY3vHAsz3Rt3zjeGnnv/8CapEAsGo/Ho" +
            "DKGbCKHzqiRQH1Rq4NrVQvjbgkDqRgqdn6z4HM3zY6dy1EJYk6v2+2F" +
            "s/5qbVOnbEZ3g3YSAoeIiYqJElQIf5AEeQR1jpEIAZmWlAGGi5+goaC" +
            "NWpN/k5VXRI6ZAZuYnqKys4wGm5MFdI66lJKorZuZsbTEoaSPvZyaWq" +
            "7Jc8zNBK3DxdW1Bq3Z2tvcVNydBtbiixPcGt0a44cA4eMc7xvq6+zyA" +
            "hSfF/XFHuzw/v8A4UUAADs="
    },
    greenX    : {
        url : "image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif",
        alt : "image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAMQAAAAAAP///3O5GGGdFENsDjxiDJHdL1WJEYjPLIT" +
            "OJGakFUx7EJvlOojbHFuTE2mjHUl2D4TUG1iOEpLjKFKEEVmNFWGbF4" +
            "7iIZbkMQAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAALA" +
            "AwAAAVHoCKOIwAoTKqmyokFAWLAsjjBT4In4qXDgYqFp2hEBLCDQxAR" +
            "DQbAAMQxcMIIBRjFYQ0UFleJU0IgSMjmlsJxdrAlXBNpHgIAOw=="
    },
    redX    : {
        url : "image.jeuxvideo.com/pics/forums/bt_forum_bann_defi.gif",
        alt : "image.jeuxvideo.com/pics/forums/bt_forum_bann_defi.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAMQAAAAAAP///8wTALAQAOc1IosNAHkLANYhDv9PPbw" +
            "RAK8iFP8yHectGp4YC/YmEPdCLpcOAOc+K64bDMISAKQPALcqG4UMAP" +
            "87Jp8fErYRAP4nEf9EMAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAALA" +
            "AwAAAVHoCCOIwAISKqmwrkFQfTAsnjBFYET4sLAMIyCIdI4DrCG5OAQ" +
            "TSbAQCEzccIsBhglYQ0YINeBc1AoDMjmliBxTrAHXBNpHgIAOw=="
    },
    redS    : {
        url : "image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif",
        alt : "image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAMQAAAAAAP///9cyIMwTALYRAKQPAHkLAN4iD20KAP9" +
            "PPf8yHcYeDZceEfc5JfYmEP9EMI8cEO8vG8ISAOc+K4sNAPdCLrAQAP" +
            "87JqchE8cnF7wRAIUMAP4nEeYjDwAAAAAAACH5BAUUAAAALAAAAAALA" +
            "AwAAAVF4CCOIwAMSaqmw/m8QTxVj3hdcS40oqLEEAYmExFxOJ3c4uAQ" +
            "SZ4FSqygcUpysY3FSsghtFZJYWPYUFuDp8TC1lRNpHgIADs="
    },
    redA    : {
        url : "jeuxvideonyu.web44.net/icones/redA.png",
        alt : "www.noelshack.com/up/aac/reda-15b77e838.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kKCAoeLnPhYM8AAAD/SURBVCjPhZE9TsNAFIS/X" +
            "ZsYBSGQLFEQWopIFKC4oADlCJyHE3CeHAFBQbEK9BFVqECxHEexvYH4" +
            "UXjjnwIx3dv5dnY1T5kQoSVxk1LNWbRAAfgAo5tb7Lbko7DYbQlA4Gn" +
            "O9gMCT2OenyRaoHwAu1rysswYm1n7ER6jc66P+oyuLjGvb6JFYJ6kNT" +
            "gZDpgMBwCMzYx5kiLZmvobNi+auM2mk27zAuSngSXPavPu/asDS54hW" +
            "93A0zjlwpkPh1UN96uqlmmcEntwoB3c1qnmT/kAe61Oe6oLtD1lQiQp" +
            "4bOqlxOX3J57CvqKajMmRNZld3O7TX671GPt4N0F/tEvtz9eQY1zkG4" +
            "AAAAASUVORK5CYII="
    },
    citer    : {
        url : "jeuxvideonyu.web44.net/icones/citer.gif",
        alt : "www.noelshack.fr/uploads/citer083047.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAIcAAAAAACAeezg2ezo4fCcklScklikmnC4rsDcz0Do" +
            "23Ts23zw35Dw45T4560E8 +EE9+UM+/kM+/0hGlUhGlktJnFVSsFxZx" +
            "ExH/kxH/2Vh3Whl3mxo5Wxo62pm+W9r/3Fu5XRw/nRw/3t3+Xh0/3t3" +
            "/356/4J//oN//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
            "BAMAACkALAAAAAALAAwAAAhqADEIHDgwRQoMJxKeMMHQBIaDJSKimIj" +
            "igwiBJEhMlDCBQgUOAkeMmDjAgoYNHQSGCDFRQAYQIDwIjABhYoAEEC" +
            "JEmBnBJs6cPBlQRMHgAU8HCAgUMHCgwUMMOh0sUKCg6MODAi9ovSAwI" +
            "AA7"
    },
    couleur    : {
        url : "jeuxvideonyu.web44.net/icones/couleur.png",
        alt : "www.noelshack.fr/uploads/couleur084255.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAADMAAAARCAYAAABwxZQXAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kCDgsLHwFT+MsAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVRIx9WVu28cVRTGf3fu7k4s" +
            "e9cp00ALhFeTUIAiGYkUQbHoEAU1JX8MJTUtL9HjgsQyBuI4fkWggIK" +
            "McWQR7+6s57Fz5x6Ku/Pc3bjeI43m3PP47v3OPXNGidHCAotqZSrXW8" +
            "7y+cKSEfOF5ISUGC2oz1hokS9RrUxNyHxa94lgrSCTBlQKPM/d5ovsz" +
            "qYQmdY9TxXrKkaOMy8v15t7KqUahL6atBlxYbNWiKKM4TAlTS1KKXzf" +
            "Y3m5hYgQBIY0tQC02x4rKy2UgtHIIAKdjsd47Py5rhSsrrbxfU2SZPT" +
            "7KUliJyTB9zXttipsTYwkscXa9z16vTZLS7ooZKXntEi2LpKtizV3JR" +
            "jckceH70tTjv/+QA721qbs+4/W5PfHZfyv27dm6ifHtyUOP5ST49syS" +
            "w731y7FyOXoYE2CwR2x5m5xdjFaPEcpBEKsDRkOA1557UcAtrdu8teT" +
            "9/j3n1vE8QXX39gAYPPeDTbv3QDg9Tc3ePZsWBSn3x/N1KPoAmtDoui" +
            "isP3w/dtsb93kyR/vYm10KcZ337wFwKvXNxgOA6wNi7OX02zSZiJCHC" +
            "dF8tWrlmvXLEoJYVjaV1dt7XajqGzTLEtm6iIxYBEZF7b1j3YBOD15h" +
            "yzLLsXodEyhJ0mEiAXKVmsBZOa+SzRg0moPPnCh4nylfadGxpiDyuaH" +
            "s3XzgMzUce7/pHj5Jeh2YVCpzzyM0eio0LX3GzaDvARaa7ypn5CqgoI" +
            "x7l2VzLonF6+CYu18rCyjNsV6Xej1oNWqx87D+PgTl/zLz4put74vUC" +
            "ejFFy5Uq7P+3B6Cufn9aTBwD1l21G5/lJfWqpjPX8O47LLGAZwdjaNP" +
            "w/j268dsyb52jQzCWISJI2R/n/I/i5TE+Tpn8ijnWn73kPk+Cmy97Du" +
            "291BjvZnx8+SWfhNjK3NUj87RcYRxdnFaFFitFQ/PmshDCEIIE1dBXw" +
            "flpedbzQqq9vpuH73fVfNIHC+TgdWVlxuEEAcg9Yurt126yRx/tzexK" +
            "9ijEZM/mHuTJ7n2tP3yxvSWjNFxk0eB1z/65Zkm3al6jkvileq/k3Mw" +
            "2/a8rgcK9+XygBQeas1CS2aFNNMtTKltWbRRTWHwSKT+R+3MgG1BaaY" +
            "/wAAAABJRU5ErkJggg=="
    },
    cyanD    : {
        url : "jeuxvideonyu.web44.net/icones/cyand.png",
        alt : "www.noelshack.fr/uploads/cyand073376.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQSMx5nn8kAAADoSURBVCjPjY9PasJQEIe/9" +
            "6IUFaVuSk+gC6EgybYX8CA9QM9RPIA7D2EuoIsoDy1dCoKLdmuNmGgk" +
            "yesi/yqI +sHALL6Z+Y3AVppb9CwBUAJ4tcyr7thWmp4lSgD7dPf86V" +
            "x6Wf5i1Bt0TZOFrbQE8HVSGc8fAwC+Wk12P994YQTARTkIgrzfOmP2r" +
            "kue2YszUwBwEjKXjzuXOAyLzRtnwsaZ5IK/Xp31WzUt5Hu5KOtBPwn1" +
            "9g6VGkhZZM4QwxF8zuDgwUMFanVod6Ba/feRrTQHH6IIfA/iOL0roVw" +
            "Gw4DGYypnAzf4A6SpVH1BrU4UAAAAAElFTkSuQmCC"
    },
    danger    : {
        url : "image.jeuxvideo.com/css_img/defaut/danger.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/danger.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhHwAcAOYAAAAAAOXl2aWlnMZLR+UKCcsoJc7OxN6nnrmQiPn" +
            "57L+/tvzv1OcZF+VcWPGEddzc0faxnud6c/Dw5M4qKOVBPu5lWryupa" +
            "yso8bGvN8TEfDVyvnQuf398P7+4uQlIr1sZtTUybx3cfHk2NIuK/OTg" +
            "+VQS7iclO22rfb26fvfx9fXzPB0Z+QzMO+clc5FQd46NumKg+3t4ba2" +
            "ovjBrOfn27qDfe1XTdwqKPWikMJVUdoaGOgpJN7e08RlX+tHP/Tm2ri" +
            "qou2on8zMzLm5r9UxLuqmnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAAAfAB" +
            "wAAAf/gByCg4SFhoeIiAktEigJiZCHQQQHARKPkZk/HgQ3GDwomZEJE" +
            "QSmPQYxmKKHGqamGUAPoayGKBSmDqYDGDSrtYJFphUdFaYIIJfAgpsE" +
            "DAsdCwwEIwoBtLWkpiQd3SSmH6m/ma4EOx0gACAdOwSxs9klpjMdAPY" +
            "dM7u944knpjbd7AHoZuNYMn62ODFIEfBehxSmql0bVYqAg271HHbQRS" +
            "CcKkgapu2A1nBgtwXtdMjCZiiBPAIQMHaQAUCGTAimcuxD5I+AD5no1" +
            "AH1YcqECmWFUHAiwBCo0w4bIlpjyUEbgRVO060DusJUCHGEREx75lSg" +
            "U2kEdFgANShBA1M4Vp5qffqNgE5fgnoSoPe0L75XRi+hYPGqsOHDiCW" +
            "igIG4seNXNZKVeEFkQoHLmDNr3nx5gotUMQwMuSCgtOnTqFOXvjAERA" +
            "wJAR6AmE27tu3btR/QQBEIADs="
    },
    darkL    : {
        url : "jeuxvideonyu.web44.net/icones/darkl.png",
        alt : "www.noelshack.fr/uploads/darkl004182.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQ1GoYQtcAAAADeSURBVCjPlZGxSsRAEIa/m" +
            "Ww0YiPKdQrhinRaiU+ifV7Bh/A97mlsLOws7prrDq5Q9A4J2ThjERJZ" +
            "OAj+1fLtt7PDjFRl7UxkuV4IQACYnd9O+b5cLyQAmLUAPL8+AnB3/US" +
            "WFYgoABdnN1Rl7drLHWbdWObj640Y9yMf7vrKHpM/Y7fnx1vU84QnbQ" +
            "wx7zBrMTsgf+5WCWyaLTstyLJiZKpHKP9IOAS37y/jeX71gPZDS+X55" +
            "T3fzQaziGqOiCISODmeASAAVVm7WYu7YRaBv6UajkogD6e9PDyY6vkX" +
            "EDhYz3BrBjcAAAAASUVORK5CYII="
    },
    edit    : {
        url : "jeuxvideonyu.web44.net/icones/edit.png",
        alt : "www.noelshack.fr/uploads/edit009720.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAACAAAAARCAYAAAC8XK78AAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kCBQ8jC5bcrcEAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAAB5UlEQVRIx8VWvc7iMBAce50fEI9B" +
            "gcQ7UEAFXRAlpOahaBCUSOmgp+NNKABRBQL+ueJkn034RHEnbqRI69V" +
            "md3bsdcKyLDP4MoqiYNYWANDtdr/NwVgSHACUUl99Op0OrPICAKSUIT" +
            "1jYEx9ZxhjNT9jzL3zU4wfa+Pb7TayLDPCKuAXl1KiqirnZ4yBiMA5d" +
            "10AABEhjmMAwPP5hDEGRAStNZRSASkhBOI4BhE5Em8V0FrjdrthsVjU" +
            "OpjNZlitVoFvOp2CiLBcLn+MsZjP54jj+DOB+/3u1qPRCM1mE2maBko" +
            "Nh0Psdjus12uMx2Pnl1Iiz3OUZYnNZgMAmEwmaLVaSJIEUso6AT+xlc" +
            "9iu90CAPI8D4j6SR6PR9BpFEUQQvwpIoRba62DWAEAx+OxtgUWvV4Pj" +
            "UYDQghUVeX81+vV2ZfLxdmn0wlpmgYqns9nlGUJznlQnHMO8WlghRCI" +
            "oijo2D/1f4uPBOxEcM4D+XybiP4dATtyFvv93tmDwcDZh8MBANDv95E" +
            "kSY2Mn+N19IJ6WZYZvxtjDJRSkFJCKeUuD8aYuwe01m5tk9sDKoQAEb" +
            "kcvu+VxNszYBUgomCf7cv+6fYT+h37Od7FBvUA4FWFb4Fz/vtjVBQFe" +
            "x2RbyHQ5X/8G/wCvTw+p5pu/PoAAAAASUVORK5CYII="
    },
    grayC    : {
        url : "jeuxvideonyu.web44.net/icones/grayc.png",
        alt : "www.noelshack.fr/uploads/grayc094521.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQVNbhFrDsAAADcSURBVCjPhZEtroZADABnN" +
            "9tA9gBoFBrJRVAozGI4CwfAcyiOQHA4fvcJAh+IFyqbaTttlXPO8xFt" +
            "2yoAA5Bl2Rfv27ZVBmBZljtbVdWLapqGNE1xznkDsK4rAHVdA1CWJQB" +
            "aa8IwJI5jbo0LvmKaJpIkwVqL1hqt9Q9+agDs+44xBhFBKcW2bT+47/" +
            "sXPAwD1lrCMLxzIoL+d33v8f59VeWc85fzPM90XfcCiqJARAiC4NR4j" +
            "srznHEcz05KISJEUUQQBCiAZ/fjOFjX9VY4jgMRwVp7wlfB1xv/ANJJ" +
            "U6cQluBaAAAAAElFTkSuQmCC"
    },
    green    : {
        url : "jeuxvideonyu.web44.net/icones/green.png",
        alt : "www.noelshack.fr/uploads/green+013294.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQFLnjid4YAAADbSURBVCjPjdG/TgJBEMfxz" +
            "96djRqE0Jj4DkYFSwrfwgfwQXwpC2wpuWBrbaGFoqLHmUjiWnCH4P9f" +
            "stmdmd/MfJMN8nb0l7rjABn0Or1fvYN8EHXHIYPCdFEYOQe7D0fSRia" +
            "kwX7nwEU+igmUXhan1l3/RjF5XslntflKvrL6+vgS7NzvSbZSkMA0lj" +
            "/yTvq3iscCBHk7KiNPbwxn4mlVOFlnM9AMHK6xnc4xwEaV/Bw3w/xdM" +
            "4M00AjCWYvhjFY1tZEsLNkXyOUN1cRa86jm/k6v1d0MPlr/8e3vZHxE" +
            "6s+4B4AAAAAASUVORK5CYII="
    },
    ignorer    : {
        url : "jeuxvideonyu.web44.net/icones/ignorer.gif",
        alt : "www.noelshack.fr/uploads/ignorer022644.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAIcAAAAAAFdSBVtVBWVfBWliBXFpBXdwB4+GCJSJB5y" +
            "SCZ2TCaKYCaacCa+jCK+kCrClCrOoCrSpCrmtCrquCrywCcu9Cc6/Cd" +
            "LECtXHCtfICtjKCtnLCtrMCt3NCt3OCt/PCuLSCuXVCubWCv///wAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5B" +
            "AMAACQALAAAAAALAAwAAAhsACcIHDiQBIkJIhKGWBhCxISDIECMmDii" +
            "QgcQAj98sDCxAAILHAR68JBh4oAGGS4I3LBBw0QCFDRgEBghAoSJARJ" +
            "AiEDTJk6dPCfUpDjigIOgNRkYECDAAAOeByM8WKBAwYIHUA9OkMBVws" +
            "CAADs="
    },
    inactif    : {
        url : "jeuxvideonyu.web44.net/icones/inactif.png",
        alt : "www.noelshack.fr/uploads/inactif009481.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kCBRAzM+Nm40MAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAACyElEQVRIx9WXS0v7TBTGf5nJpYnf" +
            "w4XgBxBXguhOd8GCItTLzs+jCFZEoZKdF3Dn2k/iwuKm2to2l/kv+k7" +
            "eTDoBXfaBwEzOOTPznHPyDHHiOFYsIJIkcfTYBVhdXV1EHkoTcQHyPF" +
            "84BisrK8RxrJIkcVyALMvmaSqFUrNOc5yycjiOY7XpuX5X96vH21C1N" +
            "fnptQGWl5eJ41hZSSilyLKMyWQCgJRy1nuui5SSPM9Lm+/7KKVI05Q8" +
            "z5FS4vt+6TedTsnzHMdxkFKW77MsMw7sui5CiLIrpJRkWVbG6vggCJB" +
            "SGom1kiiKgtFoxPn5OQCHh4fc3NxwdHREFEWkacrFxQUAx8fH5HnO9f" +
            "V1Gd/pdGi1WozHY7rdrrH26ekpl5eX1kp0Op3S/+DggNvb2zmfs7Mzg" +
            "iD4HQmdaYDhcAjA1dUV+/v7RpkHgwFJkgCws7PD4+Mj3W6XdrtNr9cD" +
            "oN1uE4ZhWcmTkxO+vr64v78HYG9vj6WlJeMco9GoHO/u7hJFUflkWWa" +
            "QEPrDtj0a1cXv7u4YDAblfDqdWrP68/Pzf6Zcl1arhe/7uK6L53l4nl" +
            "fa6/O62Dw8PNDr9RBCoJSiKArjjC7A+/u7tZ00Pj8/DfvT05PV9vHxY" +
            "X3f7/cZDocIIazr9/t9vr+/DeLV+I2NDaIowvd9hBBGFaSUs0r8Bevr" +
            "6422t7c3u6D/p1I2tfoNfN+3EjDa6S8Iw5DNzU1D8jTW1taMDGmkacp" +
            "4PGYymVAUxZ9JaHWyEWgkoeWsmonqOIoitre352xhGJbjIAjY2toC4P" +
            "X1lZeXF56fnw0JrRNu2rMuqXPnjeNY1W9spZSh5UIIiqIw9LwoijKrO" +
            "r7up+8b3UJCCDzPK+8DLRjV+6dpzyYiUsrZh91UiWpmbOXV9rqyVKHJ" +
            "VFvPtv5v9mysBICtGouCUp2SJHGaMrAIMGq0qP8W/wButZN61vlAZgA" +
            "AAABJRU5ErkJggg=="
    },
    listegroupe    : {
        url : "jeuxvideonyu.web44.net/icones/Listegroupes.png",
        alt : "www.noelshack.fr/uploads/Listegroupes015188.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAGQAAAARCAYAAAArDQkmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kCDgoUATfEoQEAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAAFTklEQVRYw+2Z32tcRRTHP2dm7iap" +
            "jWlVBEubTQyJsWna1L6I+BeI4IvS4osvgmhFKD7UFEEFMQiKikQRquC" +
            "bQhVE8EX6JuJbbdq0TWpo0p9iEdua7G52753x4d69O3fvTdNQIS+Zl5" +
            "2Zs9/v+c45M3PP3ZXhyUHHRlvvJucOno87w5ODbujJoY2QrGOb/WU2T" +
            "YoMTw66vif6NqKyzm3+13kAMQB1W88YnXNgk4ECEcnNAWDBORABBHDx" +
            "OHMWV7CJ5Lmb9qbN99GOy/lPuHz9q/GtRUM8Ga/D7/9fmrc9vo2rv11" +
            "1BmCZWiYZdtkRLYYA6M0GVRJs3ZvbpHEObCXCRQ4JFCoQbMPh6hZnYz" +
            "WiBCkpxAi2bnENlwqUDoW5RyNBwv1viE3sKhDUJo0IREtROt/E6S4FL" +
            "ra5yCGlhKsk4MAuW6LFCBc6EJBSggGixSjjR2/WiBFc6FoYQIynoRKB" +
            "AwmktYbmeu9Ss+pQmQ1sABph2EpI5GjcCDnx1EkA9v60B3OvJrwVpXN" +
            "7ju3Cho5TB6ZT3NgPo/z+zKnC47j72xGm9k/n5vcdH0N1aULPX7ONfj" +
            "OCMsLJZ0/ncHt/3E20FDHl+d93fAyNxi5b6tcbTD2XxT328xhu2XLi6" +
            "amcNnOvIbwV5jS2a9j19aOcfuFsrn83mo02+YRQ9c5X6LA3o3Rob0Zg" +
            "VGau8WeDM6/OADDy+TClBwJ0l2Lvd6PU/2ow/fK51BbcH0CtxT80MUC" +
            "wNSC4LyDYYqCa9Tf07gCzb85x6sA0Oz99JIczPQYcTD0/3fL/YIDpNl" +
            "BxRDfCNBkjnw1jejSqU6E6FFGBn6n904x8Mcz0S7HmnZOxzzMHZ3Iaw" +
            "r/Dwv5daa66fEKi0GZOiPXGNrREoc3NpX3ncAYIBNEK6ZLW3dklyCbB" +
            "1ryKYnwuPlHfj2Jx8Qbw/Wtvb1SjHG7PsV3pNZH6V6RcYaWFcSaet5U" +
            "Ilm382bR5N0XjViu40imZAPkabMMW9n2utWp23trThCyeXsxeWf+0BC" +
            "7NVtIrq9lqV5fpO9zL/PsXOfvKDP3jZYKtBtFC40YLW5mrYq7XM9jyo" +
            "R0EWw2qSyGBgCXjr3axlb3qhWohDgv942UuTCzc3v/MEvMfXkrHva9t" +
            "b9n+qBT6rMxVMwHyNVTna4X9DNel2po0+88QCQS1aj1mXVxZeGWDMoL" +
            "p1pRf3wHAhYkFbM3GlcoqTXUqVKdCtBTaMxxSjJMg9t+3mn+Jg5Jyhy" +
            "37la+upUFTnSq7XlusYSVtTa7+w71x8Negub2Z1QIYVSwSRLjIF0Z8B" +
            "O3a621bs4SLEaoksViVTYx/tCWQQpzopMJp9y+CGA/TyCbI59v+4kNc" +
            "PnoN0XGF5PvJbCAvwH5Cfa7yoR2YHo3ZYoiWorVpXjUhkhW48FF85Pv" +
            "Hy5mvzb0zn/b7j5QJthhESQarAoG2uSYfwODEw0hH1n7ly2S3vdGL6d" +
            "aFuIG3+lbwD7pL0X+kzIX3Frj4yeXWd9r4TE+89PkPLjHwdl96nSx87" +
            "GHGY96m7crRaytwaXS3QSS7oe5Ecy78w5ODzidxLq6tbdViQ4eouCYX" +
            "JZka3VmHC12chM7keZAIau4y1anSGj/la75sGkmPc7tdjMR3q8S7rB0" +
            "nWnBR3r+oRFeiwUWJXu3xLdv4ncLEHAiokkrfXzIYX3/Cl+NqrjPZVJ" +
            "nY3aFm/9TlUiQiEIA2Gu3y92X2fkls0nrjbGKbuEI+2nBF/hI6HRTgb" +
            "uNflEApxrECX9GtAKBLeYyIgPL4irgK1r8WzTkp7adko63TT77NKuvc" +
            "wfPiP6Q22jomxR9s/Dey/u0/BgxQF71cBrEAAAAASUVORK5CYII="
    },
    orange    : {
        url : "jeuxvideonyu.web44.net/icones/orange.png",
        alt : "www.noelshack.fr/uploads/orange-009637.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQQExc/3YMAAACwSURBVCjPlZFNDsFgFEXPq" +
            "6a0koqZWddA2xjZjKkNdAkdsxcxZyRNjMxtQCPxk1B8Bq0Q+sNJ3uwM" +
            "7n1XogBFBV6IAOgAbn9QKkfBXHkhogOQHEplt9clClYqla8nfuF/WSV" +
            "HAGS4/RLiSRvblJe8WMcA5NUcz3b4DnRazxgZ05Gw3MD+DCp7qN34zJ" +
            "xhGeA7cH/7vCbQrOfINQ1ss7ig5oWIZRQLl1t6QDpjulL17A/mHCzMj" +
            "xYK5AAAAABJRU5ErkJggg=="
    },
    pinkO    : {
        url : "jeuxvideonyu.web44.net/icones/pinko.png",
        alt : "www.noelshack.fr/uploads/pinko066815.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQJHByAaQoAAAEdSURBVCjPhdGxSltxFMfxz" +
            "82NQwJaUQI2g3RwqWhRk0CXPkHHTH2C0rEP0HdQnyIIeYUuFcR6tdVB" +
            "EOpW6BaTkKRNc73/DlcThKK/8ZzvOXwPJ2pLgifSVI+gCPU3tUfh9pc" +
            "kNNWjImSDvPji7CH0/VXHfPzMznZN +1sSChBGM3C/2rJfbYGtiyW/+" +
            "j+lw1tQgGyUg3vLLZNxakPD5+o1OO0e6Q16ps7ZMCCSjYOt4mvP/6xO" +
            "VbJxkGbpbPPXziH4OHjnvJc4uTn0sjMHrodXzrrHIGpLwm8jA33vw9s" +
            "HB36IPonFNjVUrOQaUFK2Gx344XIKx2Jr1pWUZ855o2hJxaaGTHbnWF" +
            "BSFt9hEdyr/C8Tf8GCxRy+H3jq7f8ArlRftbCK5d8AAAAASUVORK5CY" +
            "II="
    },
    profil    : {
        url : "image.jeuxvideo.com/pics/forums/bt_forum_profil.gif",
        alt : "image.jeuxvideo.com/pics/forums/bt_forum_profil.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAMQAAAAAAP///3LEGzpYGj5qD5LkO2m1GWClF3q0PKH" +
            "nVlKAIVGLE4PHO6boX5XcSkyDEm69Gn/GM4zJS1mLJJrdUj9iGWWtGF" +
            "aUFJzmTVWAJkNzEJflREJjIQAAAAAAAAAAACH5BAUUAAAALAAAAAALA" +
            "AwAAAVFoCCOIwAITaqmwpkkQRxIVCJisow44hYPnFiGISpEJopYRRER" +
            "QQyHGIFwMTghEMtDU4VcIbGFBfu1LMTkExZ6MKRPJFIIADs="
    },
    purpler    : {
        url : "jeuxvideonyu.web44.net/icones/purpler.png",
        alt : "www.noelshack.fr/uploads/purpler056280.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQbNr/P0A8AAAD3SURBVCjPhdEtSwRhEADg5" +
            "z1WV1QU0SjYrtw/EBQEUSzrXxCsgtW43Wqy+Bu8ZjSYxWAwieAHiKCI" +
            "uHe7d74GdT24cJNmmGeGgQmZPBoRbXmABFo2RvnYlocEKh2HcW1I7IV" +
            "TqSlNqzJ5bEBPWYP1sG8rHICjuO3Vg1IBGtAfwJXCgqW6vnel8Ka+uQ" +
            "pF3TyPx3W+EnaNm1Tp/G++i5dD97bCpnfP+nqe3PzjwWiGVXAdz0xbk" +
            "JrW+GVDOJFaDjvgIp7o+hB9gZDJY6WjVHhxC+Yt6au8eZRIzVk0aVaA" +
            "TB5LnypdMCYV0dMV9SXGTZj5wX8Do974DfeRT9Ogx94NAAAAAElFTkS" +
            "uQmCC"
    },
    rep    : {
        url : "jeuxvideonyu.web44.net/icones/rep.gif",
        alt : "www.noelshack.fr/uploads/rep057497.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCgANAOdiAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAk" +
            "JCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFh" +
            "cXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJ" +
            "CUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIy" +
            "MjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0B" +
            "AQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU" +
            "5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW" +
            "1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlp" +
            "aWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd" +
            "3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhI" +
            "WFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSk" +
            "pOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6Cg" +
            "oKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6" +
            "urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7" +
            "y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJy" +
            "crKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX" +
            "19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OX" +
            "l5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8v" +
            "Pz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5B" +
            "AEKAP8ALAAAAQAKAAwAAAhmAIEB+yeQ4L+DwPb5wsbPlzJdB3/tC1fO" +
            "X7hi9nb966VvXz9//nThwqWLVz59/T76K/dNVyxqMGPCjNVqHr17+E7" +
            "u29eKlUyZrDrJk1fPHs6TnSD9jAnJELx49OoVxWkoj9WrWAMCADs="
    },
    rep_off    : {
        url : "jeuxvideonyu.web44.net/icones/rep_off.png",
        alt : "www.noelshack.fr/uploads/rep_off020374.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBDQ8BNusS9c8AAACoSURBVBjThc+9SkNBEMXx3" +
            "1y3EuwtRIs8htrlpXwtWyOmzSOIlTbWEhJBxWOzN5iLHweGObvs/M+O" +
            "JVmSJKY+ibEGOMddVY5x0f0hbqqiaxjdDEcYlBne+9CiP65bconCgFJ" +
            "gIT5HGlqw4yOilLnyLN7wgLbpZl/ZO72ifeCsRx/0/r3gfox+9LeC9o" +
            "LTfvETsbBCW+PpH+IabYuTyR9NiNeoq+mKv+gLy/s/MdZtnZAAAAAAS" +
            "UVORK5CYII="
    },
    retour    : {
        url : "jeuxvideonyu.web44.net/icones/retour.png",
        alt : "www.noelshack.fr/uploads/retour039758.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kCBQ8wI8KGRKkAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVRIx9WXz4vdVBTHPzfJSzKT" +
            "TKYDHfwxLrrRFmeoTgvFQXEjIrPQghtXorgQ/ItcSsGNCCLtRl2UkWl" +
            "n2oIUBLUDthbEwjg+5728TCfJey/HxZ0kN+/Fdv0uXHJyzj3f7z0/7g" +
            "1RHCTCLI7lUJWiA/DZYjBzMXx+kEgZiAPweAZr8VEUcOUkEAcgnVggI" +
            "khRgJxEpxTKsrTN1Jc2pRCRpv5JfpN6qDFMeWK9UqoB/0EU8NVBIroS" +
            "EwEUacqw16PIMgAsz8MJQ1CK0WBQ6bEsbM9DuS6S54yzDMZjbbNtbN/" +
            "HDgIQ0X7DoXbrdGq8JAERLNelyHNtd12KLKvfPQ8nirDn5qrgzTHVTj" +
            "IuyA97bJ95rrHwtbu/YLkuO6svToG8vveQm2fPtJb9jQd/MYr73Hr15" +
            "SfiXdr9iTsbF6fkcmz8fA9v5QXsIJiqiAWQmFOEwfFxteClr78F4Nb6" +
            "Kv39/Up/9ptrrN24w/reQ7Io4sIfj1jbvl3Z17Zvs/77nyRpWgWwurX" +
            "D6tZOK96g12uVS/7d8+eI45ikKBr7rSqRm+0EDI3eHrtuJWdpfXr23n" +
            "8XgPOPuhBFyPw8xVFS2YulJYqlJUbGRovFxUYGMyNZw7INJ+QGf5YhI" +
            "qi2drr7T7fWjEZweFi9Ptj/u5LvG6Tq6vewsgKLp6AQfRb6cWX/rR+D" +
            "P9/AuhfHDfL7/X4tGzZTNvl/TY6g+y/Ydg3i+VhPu8rk04/1pq/9AGF" +
            "YGxYW9HSc8kZoBzD7d1zoWTWzQV8UrT4V/3fXNX/LwbaeRqy++PKkZj" +
            "YoY/lgAN0u9HtQ3lbmhpXS0/UMn1hPMxHlyLNa9v1pftthqo/+NwilG" +
            "iA886zOyOZb0OnUGXrvHWTjAvLKuToI08/3ddmjBdSPu9rn8iZyeVPT" +
            "bO3C8yv6CcgnH2r99Ztwenma/+03YTRurbjiIBGy1PxQQHqsMy0Crgv" +
            "DoQ7O6UCWQp7rd9vW9nBBP7NU+5VZ9uc0xvFjSBKNAzoZYairlGe1rd" +
            "OBINDYR0dNfsvSPJ7XrLjntwRRBlL2qFKNL2ejd0udZdXrSnupM/FMn" +
            "EkfkVpvnhGT38RsBAG0BjIro7qdlkOF5zOro1mbGf23+A/Sr5o+b30e" +
            "UgAAAABJRU5ErkJggg=="
    },
    voir    : {
        url : "jeuxvideonyu.web44.net/icones/voir.gif",
        alt : "www.noelshack.fr/uploads/voir035885.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCwAMAIcAAAAAAFVQBVdSBVhSBWReBmVfBmdgBWliBWtjBWt" +
            "kBXNsBoJ5BoN6BpOKCJSLCJ2TCaKYCaacCa6kCq+kCrSpCrerCbmsCb" +
            "mtCrquCsS3Ccq8Ccu9CdjKCtnLCtzMCt3OCt/PCuLSCuXVCubWCv///" +
            "wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5B" +
            "AMAACUALAAAAAALAAwAAAhrADEIHDiwRAkMIxKKEDFiIYaDIUKQIKFh" +
            "4gYPAkGAmLhgIoMMAj98mIhgYoIKAjtwmGhg4gELFzBQoDAxwMQBDwT" +
            "OhDCRhIACEHRSmNCAxAACDSYIpSDBgQIHEig8lDlzQoQJMx8eHBhzYE" +
            "AAOw=="
    },
    yellowE    : {
        url : "jeuxvideonyu.web44.net/icones/yellowe.png",
        alt : "www.noelshack.fr/uploads/yellowe032856.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2" +
            "+oZAAAAAd0SU1FB9kBHAQXI36ne+gAAAD7SURBVCjPhdExTsMwGIbh9" +
            "08ipXGahrQS4gJIHRAKIksHxo6cgZGJvbeAuQeAE8CSEQaEooqZhRNA" +
            "F5KSITGDo1qUiv6LJeux9X225AWaHTPNEAAPIDs9+xfnxaOeZogHoPk" +
            "CIGHxB74vj0nTlLx41R2ufoHr+QHRwMF1hWjgkE16rGNs4rqumZz0SI" +
            "aC52lU+G1xq0ujxCyzqyUAbx8Jqi+IIxY/P30CcN71vLgURvsQxzA+A" +
            "hVCoDq8OX4Ah2OI98D37f5WPL+xT3/3IARqC769FxYvsCohCMF1QSkT" +
            "pR91lfICvaqgaaAqoW3tBW1j8iajdX9zYNe3/wDkuz+sWEgdaQAAAAB" +
            "JRU5ErkJggg=="
    },
    Menumessages    : {
        url : "jeuxvideonyu.web44.net/icones/Menu-messages.png",
        alt : "www.noelshack.com/up/aac/Menu-messages-2ec1b9cd41.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAF4AAAAUCAYAAAAEEYpkAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJDxELJRmCUasAAAC/SURBVFjD7ZfhCoAgDIRd+" +
            "P6vvP4kSKSec1OI+35JzTzOzVlKhBBCCHFFvh6qqg4nigjtczQeMb1n" +
            "fmt+Hdtbo8RFx5zSU7isBs9WSnmHbOyOmBN6anJIGYlIEVKPZzczKua" +
            "0njDjrdVhMcgaY9HkpWd41MjDexzeeDrr1JXkVfa7NMMZr6qKNiFPoW" +
            "jjRps7WgGz2b1y2chI+bXOae+jptcTorN6ZU2LP5eXKK9M39ngIr6Hz" +
            "ucPFCGEEEL+wQ1CEsgezHaNIAAAAABJRU5ErkJggg=="
    },
    Menuprofil    : {
        url : "jeuxvideonyu.web44.net/icones/Menu-profil.png",
        alt : "www.noelshack.com/up/aac/Menu-profil-732af9b565.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAYAAAAwaEt4AAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJDxEMJCHE9/oAAACXSURBVFjD7ZZLDoAgDEQp4" +
            "f5Xrhu7IQjDp0DivJXRUfHRNoZACCFkO1I6qaravFFEfiUGkfIlp3av" +
            "ZZFMLYdkLGfX82Pk2+KIgBEQ4ZapZZHMCpJLGQKV5JW5WkxPdXi8a4W" +
            "shO48MiNm2/GmgZ5au4EOu1kJ+tIr51gr2WK9h51nuyHPzAXHUwscrY" +
            "Jd7cYfPEIIIffwAFWueBRfqQxfAAAAAElFTkSuQmCC"
    },
    Menupseudonyme    : {
        url : "jeuxvideonyu.web44.net/icones/Menu-pseudonymes.png",
        alt : "www.noelshack.com/up/aac/Menu-pseudonyme-31e5f7fd31.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAHkAAAAUCAYAAACpkJLNAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJEREZNlUOQAoAAAD1SURBVGje7ZjRDsMgCEWr8" +
            "f9/2b3MxC4KF0S7Jvc8tStS5CJjuy5CCCGEEHKENPqw1lrVhSklpu+l" +
            "IiMCz4SW1va2iJ1m057PYuhtvPFYbJB4Vt/140fS5XafPWJ6aIEjRWQ" +
            "ptJ3xWGws7wzIj2mvZUt7AE44UjhRXwmeeLw2aDxaxwHz85zI3tMaVR" +
            "xPEtWFwPxAwmet4prj/nrlNEk+TrTpbcONsK/owpTcjVJYtGpCBwLLp" +
            "kbP33hqrUNYVNHMhJ7JU5C2oU2qu9rZ6iQabfMPbf+rhclXjhYm4iSs" +
            "DmWW9Sfb7IlfMqPl/DOEEEIIIYSQKD5UkN4mxaH5vQAAAABJRU5ErkJ" +
            "ggg=="
    },
    Menutopics    : {
        url : "jeuxvideonyu.web44.net/icones/Menu-topics.png",
        alt : "www.noelshack.com/up/aac/Menu-topics-3433165d25.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAYAAAAwaEt4AAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJDxELGEHqHboAAACpSURBVFjD7ZZLDoAwCAWh6" +
            "f2vjKsmLmh5/drENyujQOpAqyKEEEKOo95NM7MwUVV/JQaRUpMT5Zb4" +
            "Wlz03ItBa6J1C2lEwAytxSFN8WKQmj0NFxHJS8fP6U5NKjJtoxPZU/O" +
            "ImNX0dhmRgMpKUeGS9L7+9FAcXEMrz5OVo46hh9dNEmrbGZ0gaCsVOa" +
            "ul7JA8e7B3f5VWvkRrCnZsE6SmF8MfPEIIIffwAGfWgCK4aKvGAAAAA" +
            "ElFTkSuQmCC"
    },
    Menugeneral    : {
        url : "jeuxvideonyu.web44.net/icones/Menu-g%e9n%e9ral.png",
        alt : "www.noelshack.com/up/aac/Menu-general-875dce5767.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAFUAAAAUCAYAAAD88XGTAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJEREiBzhirwgAAACzSURBVFjD7ZZLDoAgDESFc" +
            "P8r44qEGKW/ASSZt4V06rSlXhchhBAUaYdorbV+JpRSWh1niamjZP+Q" +
            "9HGdqjF0ZKymeyJ3ek0pjraTJa12rm2k7DXP2+HRO+3MUnxvHK9GmdL" +
            "+iiJ47rx95Kw4kaKVWe+KlLjXIKsOcoIgpvbJad7Do5bJxEVbpOppF8" +
            "OKrkQ+I89vWzr+TdwiEhk3q9moOEitjDIJuaB2jy9//gkhhBBi4waRy" +
            "KgRBiD/MgAAAABJRU5ErkJggg=="
    },
    yuu    : {
        url : "jeuxvideonyu.web44.net/icones/yuu.gif",
        alt : "www.noelshack.com/up/aac/yuu-d65a2f4939.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhEwAQAKUiAAAAAD0AAG4AAHkAAJsAAPM6AP1MAP9ZDP9eMd5" +
            "lZedwAf9iUdttbf1vAP93ENGJAP+BEf9+QuCTAf+DbP+ISM+SkvyUAP" +
            "+Ghv+Rkf+tF8DAwP+3YPvDAP+9nf/Cwv/jHv/wfv/5zv///////////" +
            "/////////////////////////////////////////////////alt : " +
            "///////////////////////////////////////////////////////" +
            "//yH/C05FVFNDQVBFMi4wAwEAAAAh/ghCeSBTb2ZlYQAh+QQJDwA/AC" +
            "wAAAAAEwAQAAAGhcCfcPgDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQ" +
            "FIDeAK8IiNWTNwCrGeAKL0ekjkZwGYT73j0YXYAFg4HCIcbC4oIEXmC" +
            "Cg0HR3xGCBSOQmQKFmUhaR+eABmcdmQSU12oIVNsgqcSVACwYadjpkc" +
            "cR7VKGmQAD8DAUFG9vkcaUbbFyUEAIfkECQ8APwAsAAAAABMAEAAABo" +
            "3An3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSc7SGjKIQVkxkh" +
            "kEALyC9HmoCgEwGAO90AB5qYUMVAwYHBwgbCAgLCxMbdUIVAgVHG0cI" +
            "FJGDk3gfISIAoKIbGx8cbD8aZBxdU69NqWMAElS1t6gSqkKsR6lGHBy" +
            "7Ub4AD8jIUMXGRxpRY6ys0EEAIfkECQ8APwAsAAAAABMAEAAABo/An3" +
            "D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSw7QaRaIQVkzcAkAAL" +
            "wCtDg8rAEvmDdh0AB1pa0IeCQQGBwcbCIwLEx1Wdj8eDARHe0YIFBuR" +
            "bB54HyEiAKGjG5wfHGw/ZBxdU69OqkkAElS1t00cEqtCZEa8RhzDvFE" +
            "avw/JyVDGx0dGGlFjx8fSQQAh+QQJDwA/ACwAAAAAEwAQAAAGjcCfcP" +
            "gDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFJztIaMohBWTGSGQQAvI" +
            "L0eagKATAYA73QAHmphQxUDBgcHCBsICAsLExt1QhUCBUcbRwgUkYOT" +
            "eB8hIgCgohsbHxxsPxpkHF1Tr02pYwASVLW3qBKqQqxHqUYcHLtRvgA" +
            "PyMhQxcZHGlFjrKzQQQAh+QQJDwA/ACwAAAAAEwAQAAAGhcCfcPgDGI" +
            "3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFIDeAK8IiNWTNwCrGeAKL0ek" +
            "jkZwGYT73j0YXYAFg4HCIcbC4oIEXmCCg0HR3xGCBSOQmQKFmUhaR+e" +
            "ABmcdmQSU12oIVNsgqcSVACwYadjpkccR7VKGmQAD8DAUFG9vkcaUbb" +
            "FyUEAIfkECQ8APwAsAAAAABMAEAAABonAn3D4AxiNxOTQ+Gk2kUohgN" +
            "MEWUHP6LQKCnmxH0BSA+AaRaLQMbn9gABegAj+FgvJ1M8GsOnAAR17A" +
            "UN4HxkRCIkLHQuJBwMedwASHBkQCEd7RgcCkT9klBkZZSFzH6UAAZ4a" +
            "oFRTXa9qY5OUk66UYWOgtUYca0qsRg/Dw1BRrGRHABpRusjNQQAh+QQ" +
            "JDwA/ACwAAAAAEwAQAAAGi8CfcPgDGI3E5ND4aTaRSiGA0wRZQc/otA" +
            "oKebEfQFID4IaMohAIuqR+rAAvQATAioVkN2gD6HTmABsZAB54Wx8bE" +
            "QgICwsdiwcEF4VkElQZFItHFEcYlACWHxmYZSF0H6aEPxqVbmEcXVOx" +
            "Q5WhYaGgVHertRy+RxJHY2QAD8bGbEqsxEcaUcPLz0EAIfkECQ8APwA" +
            "sAAAAABMAEAAABonAn3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0" +
            "BSA+AaRaLQMbn9gABegAj+FgvJ1M8GsOnAAR17AUN4HxkRCIkLHQuJB" +
            "wMedwASHBkQCEd7RgcCkT9klBkZZSFzH6UAAZ4aoFRTXa9qY5OUk66U" +
            "YWOgtUYca0qsRg/Dw1BRrGRHABpRusjNQQA7"
    },
    puppy    : {
        url : "jeuxvideonyu.web44.net/icones/puppy.png",
        alt : "www.noelshack.com/up/aac/puppy-639a02b417.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJFxEUBA0cMBsAAAE8SURBVDjLjVNBSsQwFH2Rb" +
            "iy4c13c6gFcCfYAI4zMBTzJ4B0Edw5zgkGYC2SoKxfiZphtmeJGXAwI" +
            "VWnkuUiTpknK+KCQ/37eS/p/vqgVEUOaiCBRKwqfS4aErLLAVLQ51yj" +
            "xxU0BJCet+OimZ8Bqbo2MSbJXfDjuX+NzDlZZZ1IrQkpJAGSVkVVGAD" +
            "r+edEf2XG7qd1TKwJtEdkUsAkDYxJwjkny/LQKqi2EwH84ADiIkfqgF" +
            "l+PIRczeHsV+H3YgqPUnsbZBFiswdmk467PgMV6+B0AAEepXiw3wNUp" +
            "sNxoocH3Cqr80GspJU0XyjtBdQtbcQDk/XEQNwX6XXANbDt3064DXmz" +
            "29QyMidtSI/BjI64VdRHPLy5F+zu2oKrcAu/jaOzOgnCn0byJPM8xBH" +
            "8iRWycY4/L3NLHH8IKJjYnBhYZAAAAAElFTkSuQmCC"
    },
    v    : {
        url : "jeuxvideonyu.web44.net/icones/v.png",
        alt : "www.noelshack.com/up/aac/v-d005704810.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJFxMHK8SmmL4AAAEYSURBVDjLjZPNTcNAEIXfW" +
            "JtIIFGBpYgOEi6cQLgESkgXqSFnGnAJKWGjIA5cMBfOli1XEMlIZKXJ" +
            "wdn17E8S3m29ep9nZ95Qbxgp3SqKLnrDFH5T54zcziIone4kSIXmww5" +
            "Q9yfz3dIDcFs6kIWoq+abV7+MfQluZw6iAODzfcvABfP0IYJ4TyiKAo" +
            "cdzuvva4AIELclSBFn9u9J/W58SEIZrimEyLNsYlcRcjRDH/alP4HA9" +
            "L8KRKNSd6ZuhpFqrdk2sn4j5AsepyEnIoCmbjB5HgKVPT69ePHsKnJ0" +
            "ZwzMXTVaqDfscmCrAIB8kR7OzwcwX41xJrtMEgIA3+vYPF/FS0VyG2U" +
            "mLEhKa43wyZRa51S4QqPVEQFEkZW6PjetAAAAAElFTkSuQmCC"
    },
    Menusecrets    : {
        url : "jeuxvideonyu.web44.net/icones/Menu-secrets.png",
        alt : "www.noelshack.com/up/aac/Menu-secrets-b9d5338773.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAFUAAAAUCAYAAAD88XGTAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJHAYCCNZa+xMAAADESURBVFjD7ZbRCsAgCEVt9" +
            "P+/3J4GMdz0qsVg9zyNoZV21UQIIYSQD9O0n2OMYTq21pg+Z1I9CX1L" +
            "7Jv/ZZ+xQdbw2FnxovuJiBzR5EUVnrVB/BGBZM8805fI33EJERstuIi" +
            "Npeone6+4liR1RfCRdpPZK7POYQVxOc3fEfVVlWJlu6pYT4urWzfjbf" +
            "qomjJKmX21CrifuyLJSJV0TyCeKYmq0ZruOwZN5QCGp39FcHMbyZQbo" +
            "rodb2ltDz7+CSGEkL9xAm8iqDJwbyHcAAAAAElFTkSuQmCC"
    },
    ouin    : {
        url : "jeuxvideonyu.web44.net/icones/ouin.gif",
        alt : "www.noelshack.com/up/aac/ouin-d45cd6c812.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhEwATANU8AP///9GJAADj/b/5/wC/1f8AALPX/8nJyWSt/5m" +
            "ZmWZmZu/3/97u/zAtGGuBmcHe/zArBuHv/5Gvz0hWZjAwMGZbDMHZ1d" +
            "Hcpfnrz2ZgMmROAFGMzycaACocAHmmz4Cxzy8lAIZYATY2NrvJ2SQkJ" +
            "JeXlzAAAMHTz9Hn/3Nzc73Fzf70z5CfmWYAAFQ3AJmIEjxomf/85/PU" +
            "mf/0pYm15uCTAf/5zvvDAMDAwP/wfv/jHgAAAP///wAAAAAAAAAAACH" +
            "/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgA8ACwAAAAAEwATAAAGeUCecM" +
            "jbGY3E5NCoazaRSuHu1sxZc8/otJqzebG6XRK3q+68gDNWTNzqcmfvD" +
            "mBbD8nUt9Vro9uFeFx7X388ZDV5V4qFh3l6ijo3bIaNYWWWkZOAOzU1" +
            "l0yRnmOHiDempqJKOGQ7Aa6uUFGrrEc4UaOzt7q7vL2+QkEAIfkEBQo" +
            "APAAsBgAKAAYAAgAABgnAnW4n1N2KxCAAIfkEBQoAPAAsBwAKAAYAAg" +
            "AABgnAnU63ExKNuyAAIfkEBQoAPAAsBgAKAAcAAgAABgpAHW/HE+6Ix" +
            "mIQACH5BAUKADwALAYACgAGAAIAAAYJwJ1uJ9TdisQgACH5BAUKADwA" +
            "LAcACgAGAAIAAAYJwJ1OtxMSjbsgACH5BAUKADwALAYACgAHAAIAAAY" +
            "KQB1vxxPuiMZiEAAh+QQFCgA8ACwGAAoABgACAAAGCcCdbifU3YrEIA" +
            "Ah+QQFCgA8ACwHAAoABgACAAAGCcCdTrcTEo27IAAh+QQFMgA8ACwGA" +
            "AoABwACAAAGCkAdb8cT7ojGYhAAIfkEBQAAPAAsDAAGAAEAAQAABgPA" +
            "XRAAIfkEBQAAPAAsCwAHAAMAAgAABgfAnWHHIwYBACH5BAUAADwALAs" +
            "ABwADAAMAAAYJQB6AtzPsiLwgACH5BAUAADwALAsACQADAAEAAAYFwB" +
            "1iFwQAIfkEBQAAPAAsDAAJAAIAAwAABgdAAw+x2/GCACH5BAUAADwAL" +
            "AsACgADAAMAAAYJQJ6Bt0PsiLwgACH5BAVkADwALAoACQAFAAQAAAYP" +
            "wJ2BB9jtEMQdD2lQOnlBACH5BAUKADwALAYAAwAJAAsAAAYpQN6ORxw" +
            "Sj8hj7ghIIptO227phCJzw52Otx0ajrfhlmewFhGIb9LICwIAIfkEBQ" +
            "oAPAAsBgAEAAkACwAABi7AXW7H2wGIvKRyyWwubc5cI9dsxBpNiAVyS" +
            "xYKJoll1VmCPicMk+PZSChNEjwIACH5BAkKADwALAYABQAJAAsAAAYt" +
            "wB1PSOQZj8ikMplb5jLNZGVWOe6uu4umdi0UWg6HLOliORKKJIyGSiM" +
            "VcF4QACH5BAkKADwALAAAAAATABMAAAZZQJ5wSCwaj8ikcslsKne5nW" +
            "0HkOaUuaxtC7Bdk1ntNqvUhc9fpM6M1pV1u/had1Pe4vjXrfbExxUhO" +
            "30FhDsTgko4fhMjAAmJOJEpDxGOTgkPlI+XCZtOSEEAIfkECQoAPAAs" +
            "AAAAABMAEwAABopAnnDI2xmNxOTQqGs2kUrh7tbMWXPP6PSZs9l2WN0" +
            "uidtxd18AWJzcinPondqGHQvL1MHVawPo2XduV11eVoA8ZTVUOoODh4" +
            "mLjI06N3aIkE9MTZVkOzWKR0w3NZZ3iaFHpFE4ZUYFrzsipWSsqCoHU" +
            "USsrCULCwC4uUkHDL/BwkPExcfIQgfPSUEAIfkEBQAAPAAsAAAAABMA" +
            "EwAABnlAnnDI2xmNxOTQqGs2kUrh7tbMWXPP6PSZs9l2WN0uidtxd18" +
            "AWJzcinPondqGHQvL1MHVawPo2XduV11eVoA8ZTVUOoODh4mLjI06N3" +
            "aIkE9MTZVkOzWKR0w3NZZ3iaFHpFE4ZUYFr0dRpq1HOLJErLm3u7y9v" +
            "rtBACH5BAUAADwALAUABwAJAAEAAAYHQAFvSOQJggAh+QQFAAA8ACwE" +
            "AAcACwACAAAGC8ABb0gkDgTFpCAIACH5BAUAADwALAMACAANAAIAAAY" +
            "MwAFvSCzyBgKjUhAEACH5BAUAADwALAMACQANAAIAAAYMQB6BRywWh0" +
            "OjUhgEACH5BAUAADwALAMACwANAAEAAAYIQAJvSCzyCEEAIfkEBQAAP" +
            "AAsAgAKAA8AAwAABhJAgoBHLBp5AgLhyCQul83iMggAIfkEBQAAPAAs" +
            "AgAKAA8ABAAABhNAAW9ILBKFQqNRSFA6m00nsRkEACH5BAXIADwALAI" +
            "ACwAPAAQAAAYWQAFvSCwShQKCsUgQNpXL4ZMHjUp5QQA7"
    },
    skinSelectnoir    : {
        url : "www.noelshack.com/up/aac/skin-select-iphone-6c8c04f382.png",
        alt : "www.noelshack.com/up/aac/skin-select-iphone-6c8c04f382.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHQ8yNeYZ3RsAAACHSURBVBjTldExDoQgEIXhn" +
            "wQ7qampvQLNnJyaC5hwAYyFhTUxbOVuSFaCr5vJN1PMKAARqXQSQlAA" +
            "WkSq955lWf7CGCNADSEoDXCe5918jLW2aoCcMyPRAMaYLjqOYxy/2tz" +
            "geZ4fwXVdLd62Decc0zQ1sJRCSulbq5GnrOv6w/cdewP7vqsPjWQtFf" +
            "cEXFAAAAAASUVORK5CYII="
    },
    skinSelectds    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_ds.png",
        alt : "www.noelshack.com/up/aac/skin-select-ds-2a1255d435.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHRILMmIH9SEAAACSSURBVBjTY2RgYGA4ps/wn" +
            "wEPsLrIwMgAU/hnbsN/XOBPY8x/mGEsDAwMDEz3LjH8bYrFZziDiorK" +
            "fxYGBgYGxiMbGZgZCAMWBgYGBgZZNfyqPlxHKP4vr4lf8WVkxbLqDAz" +
            "UcAbjj6+oihmPbWZg9ElmYODiQ1X57RMDw9IuhEZiIiXuqwpCMSwc8W" +
            "m4c+cOIwDcQ0CFQtHPfwAAAABJRU5ErkJggg=="
    },
    skinSelectiphone    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_iphone.png",
        alt : "www.noelshack.com/up/aac/skin-select-iphone-6c8c04f382.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHQ8yNeYZ3RsAAACHSURBVBjTldExDoQgEIXhn" +
            "wQ7qampvQLNnJyaC5hwAYyFhTUxbOVuSFaCr5vJN1PMKAARqXQSQlAA" +
            "WkSq955lWf7CGCNADSEoDXCe5918jLW2aoCcMyPRAMaYLjqOYxy/2tz" +
            "geZ4fwXVdLd62Decc0zQ1sJRCSulbq5GnrOv6w/cdewP7vqsPjWQtFf" +
            "cEXFAAAAAASUVORK5CYII="
    },
    skinSelectpc    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_pc.png",
        alt : "www.noelshack.com/up/aac/skin-select-pc-de8d69a948.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHREtGpYqYKYAAACDSURBVBjTrdGxDcQgEETRj" +
            "4REAVACFdCS66IDaMGSAxcBInJIB4iAi3yWg0MEN9lKbyfYFQDbtg0m" +
            "8d4Lbrjv+/iVEMK4yyRArZUY46wca+2QACklViIBtNZTdF3Xg40x/2t" +
            "exr33N84545xDKfWCrTXO8/zOYuUpx3E8+L7jbKGUIj7FeEarOuoqbg" +
            "AAAABJRU5ErkJggg=="
    },
    skinSelectps2    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_ps2.png",
        alt : "www.noelshack.com/up/aac/skin-select-ps2-25ecdc5b16.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHgIMKN63lgIAAACSSURBVBjTY2RgYGBgCDn2n" +
            "wEfWGPFyABT2LDlz39cIGbBn/8ww1gYGBgYLj1nYohd+Bev4SoqKv9Z" +
            "GBgYGDZeZmRgYGBmIARYGBgYGNTE8Cu6/gxJsaY4fv9dRzZZXew/AzG" +
            "AoDO+/mJEVbz5CiNDsiUjAx8HqsJPPxgYuvYg+IzERIrKhTgkxdBwxK" +
            "fhzp07jAAxREBWokDX9wAAAABJRU5ErkJggg=="
    },
    skinSelectps3    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_ps3.png",
        alt : "www.noelshack.com/up/aac/skin-select-ps3-06381e6882.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHRE5AqvoL6UAAACnSURBVBjTY2RgYGBg0F7xn" +
            "wEfuBrByMDAwMDCoL3iv7tXMMOklHtY1fm3KTPcYFjxn+FqBCMLAwMD" +
            "w43HTAz+bcp4DZeTk/vPwsDAwPDw4V0GYgALAwMDAwOHAn5Vn84hFMu" +
            "LM+NV+/AVksnKUvgD4+FlJMWKErgVf/vFhOrmPeeYGEIdGBl4OFEVfv" +
            "nOwLBmKyOcz0hMpMh9LkNSDA1HfBoePXrECACG0injH6GevgAAAABJR" +
            "U5ErkJggg=="
    },
    skinSelectpsp    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_psp.png",
        alt : "www.noelshack.com/up/aac/skin-select-psp-acf29f9372.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHRE2KPfL+rwAAACRSURBVBjTjdEhDsJAEIXh/" +
            "yVrWoHHbyBcgatAMEgOgcegOAjhDlyAAGaDQdc0qaMdBDS0oss+N8k3" +
            "k8mMADicjVg2c9HC7aO2oSyutbXDHMClEstbEx3uvTcHcCwEiH9xAJM" +
            "8ju5dPMssHU9zIyWfNbJhUDXq41Mh1mMxcn1YvmD3/NVKeYrfrzr4e8" +
            "dYQwhBbyk2QJ2aWPfbAAAAAElFTkSuQmCC"
    },
    skinSelectweb    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_web.png",
        alt : "www.noelshack.com/up/aac/skin-select-web-fcbc05cc50.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHRE0KMX9mD4AAACJSURBVBjTY2RgYGA4lsbwn" +
            "wEPsJrFwMgAU/jvQN1/XODf+qj/MMNYGBgYGBheX2H4vyEan+EMKioq" +
            "/1kYGBgYGG9tZCAGQEwWVsOv6uF1hOL/wpoEzERSzCCkRiVn/P6Gpvj" +
            "2FgZGg2QGBnY+VIU/PzEwHO+CcxmJiZS4fSoIxbBwxKfhzp07jADXjD" +
            "+jlgklkwAAAABJRU5ErkJggg=="
    },
    skinSelectwii    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_wii.png",
        alt : "www.noelshack.com/up/aac/skin-select-wii-d12a850016.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHRINBPvnxz4AAACaSURBVBjTY2RgYGDYw2D4n" +
            "wEPcGE4z8gAU/g7f/L/z58/Y8W/vSv/wwxjYWBgYGC+/ICBI6INn+EM" +
            "SkpK/1kYGBgYvu07w0AMYGFgYGDglhbHr+rpJ4Ti/+qyBBTfRij+pya" +
            "NX/E+JGcwqOBWzPj1B6qbmbadYmCIc2Vg4ONGVfnpKwPj4j0IjcRESp" +
            "rSR4RiWDji03Dv3j1GAJIuQG7EaFTYAAAAAElFTkSuQmCC"
    },
    skinSelectx360    : {
        url : "jeuxvideonyu.web44.net/icones/skin_select_x360.png",
        alt : "www.noelshack.com/up/aac/skin-select-x360-7127416f54.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t" +
            "1+/AAAAAd0SU1FB9kJHRIOEiQeIawAAACUSURBVBjTY2RgYGBgOKb/n" +
            "wEfsLrIyABT2Ph77n9cIPZ303+YYSwMDAwMF5nvMcT9acZruIqKyn8W" +
            "BgYGho2MR6Da8AMWBgYGBjUGWbyKrjN8QCjW/C9PQPFlhGL1/7IMxAC" +
            "CzvjK+ANV8WbGYwzJjD4MfAxcKAo/MXxj6GJYCuczEhMpKnFfkRRDwx" +
            "Gfhjt37jACAN3yQIh8WU6pAAAAAElFTkSuQmCC"
    },
    TitreModo    : {
        url : "jeuxvideonyu.web44.net/icones/Titre-modo.png",
        alt : "www.noelshack.com/up/aac/titre-modo-1474038d50.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAADMAAAARCAYAAABwxZQXAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kJHhcxFfba8zYAAAAZdEVYdENvbW1lbnQAQ3JlY" +
            "XRlZCB3aXRoIEdJTVBXgQ4XAAACI0lEQVRIx9WXsU8UQRTGf7NDXEJi" +
            "CAWBRCyMgcLmYoW55qAjsbcjFhaU/CE2EmkotKGh1pBYQAjNqgUxZ2E" +
            "kSCzAZNF4F0732DldxuJmN3vr7t0shfFe8pK335tv572ZL7OzQkupGW" +
            "I7W4oEwPQ2jADo1dWhbWZqbU3z9KHweY7QUmq9sjLMm4PY2IDHD0S3m" +
            "eVlht3E5mZXZoShFUFFEd+UYtJ1caXMxQFO223U5SUAruMwMzZWiLtS" +
            "oqKoMFfGRgBEEFgN/hIE3N7dZb9a5d7ERFLI22aTmufxYXGRr0qx4Hk" +
            "9vP1qlUnX5c7e3l/43fFx3p2fU8vhxHPYmgNAu23lyjRd8zxe+z6tVo" +
            "s3vp8UctxoJI28rFR4Uakk4z81GsmkT+bmet5TK+CcNJvoILCrL94ZW" +
            "5nR6SThwsEBz2ZneXR0lGChUkl8y3F6JZrK3UjlflxcFHPCEITouo1p" +
            "KfVvsPL3oPvZVipfB11PPW9ZxFlOHfQvy9q0lNq56umxblZr3XbV/oF" +
            "duZl54LMQzKewa6n42Hhe7jQVX+/DccsWVUZmhykJfDQSOMzIYidHij" +
            "sZ+aTx7304Py3rimUmtJQ6iiK77wxwYuKbZuWymDYr30ntyAwgzDhl4" +
            "hgfBcICzmiJTZFSUqoZTLGYgoqw7M11ED4oZ9uMc7YUCVniwyRyJspi" +
            "IuOD8EE56wNgert7jZYlrw7/5f0sDvz7MPVquP9t/gAg5PNLm8P8iQA" +
            "AAABJRU5ErkJggg=="
    },
    avert    : {
        url : "jeuxvideonyu.web44.net/icones/avert.png",
        alt : "www.noelshack.com/up/aac/avert-2a6302a433.png",
        b64 : "data:image/gif;base64," +
            "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0I" +
            "Ars4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJ" +
            "qcGAAAAAd0SU1FB9kKAw4iMsQbaqIAAACRSURBVBjTjc5BDsIgEEDRX" +
            "yHqfbybh/IwXsETGG2lLcIwdAMLTUB/Mrs3A0M+nzI17yB6iJ4U3mgM" +
            "aBKOlzBYAG5XvjNlZjUAWFbA0UxEC7y7PowVvuQHpMBn+AvuWAK9ZK4" +
            "XR4FHG2oqME+Jofe0FphWgw37JlyyAhGrcuj+URFgxKoI3hq8CABzVj" +
            "wwkT8WNj2iUllbs4igAAAAAElFTkSuQmCC"
    },
    cssPagedebut    : {
        url : "image.jeuxvideo.com/css_img/defaut/page_debut.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/page_debut.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZsw" +
            "AmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ+MK" +
            "VDK5UT6A3CyZwWBAK1IRpClscJIIggDGYKI8NA1O+t761ODEYgFEwj3" +
            "ABRKBgoI9nP+ZxIi9SPxGKRRAAAOw=="
    },
    cssPageprec    : {
        url : "image.jeuxvideo.com/css_img/defaut/page_prec.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/page_prec.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZsw" +
            "AmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ6MK" +
            "VDK5UT6A3CyZwWBAIVIqNQHhyCqoOpuQhMyAA9DMTNdgEXj1AwpQSIX" +
            "sFAOQ6XzImNaIhKLBZJBAA7"
    },
    cssPageretour    : {
        url : "image.jeuxvideo.com/css_img/defaut/page_retour.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/page_retour.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAMALMAAP////7+/vf39/Hx8fDw8Obm5uXl5eDg4NXV1cz" +
            "MzJmZmWZmZswAmQAAAAAAAAAAACH5BAUUAAwALAAAAAAMAAwAAAQ5kD" +
            "FFK5UT6A2EypwmCAMVdmSpcMtCvIWpta1hHDJNH/iKDoMCD2EaAYUHR" +
            "IJiDA4Ty8nxGZVYLJIIADs="
    },
    cssPagesuiv    : {
        url : "image.jeuxvideo.com/css_img/defaut/page_suiv.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/page_suiv.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZsw" +
            "AmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ6MK" +
            "VDK5UT6A3CyZwWBALFIR1ZHieiDuaGzMNAxN2M2Deb0gRCwTQS7IIFA" +
            "6Uo4CWVE0ETaYBKLBZJBAA7"
    },
    cssPagefin    : {
        url : "image.jeuxvideo.com/css_img/defaut/page_fin.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/page_fin.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZsw" +
            "AmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ+MK" +
            "VDK5UT6A3CyZwWBAK1IRpClsepIoIwmCliDwNBA/ZN6K3ODfErmEYIH" +
            "KJQMFBGsRyh6ZxEi4aqxGKRRAAAOw=="
    },
    cssPuceprec    : {
        url : "image.jeuxvideo.com/css_img/defaut/puce_base.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/puce_base.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAPALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmVFRUcw" +
            "AmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAA8AAAQ+MM" +
            "lJq60n6zwP+CAQHIkXfkEgZCeSCqsJIgg8sACtIwOB7zSCz/QKEgqsl" +
            "wAhLBgyyt7R8CzZmlSSZLO5XCIAOw=="
    },
    cssPucesuiv    : {
        url : "image.jeuxvideo.com/css_img/defaut/puce_fleche_gauche.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/puce_fleche_gauche.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhDAAPALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmVFRUf/" +
            "//wAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAA8AAARAMM" +
            "lJq60n6zwP+CAQHIkXfkEgZCEiqqsJIEgqCAM70/xA6Dwe4WcK0AY+Q" +
            "oFlQyQLhowNN4RGS7en4SrZbC6XCAA7"
    },
    cssPuceinfo    : {
        url : "image.jeuxvideo.com/css_img/defaut/publi_info.gif",
        alt : "image.jeuxvideo.com/css_img/defaut/publi_info.gif",
        b64 : "data:image/gif;base64," +
            "R0lGODlhCgAKAMIHAAAAAJmZmWZmZszMzLOzs8DAwKampv///yH5BAE" +
            "KAAcALAAAAAAKAAoAAAMfeBc1U0Ed4uogq6oaqNuO9x2WBYZlhWnkaK" +
            "SGNIVSAgA7"
    },
    version : "1.2.2"
};

System = {
    test : function (bool, fun) {
        if (bool) {
            if (JVN_Option.debug) {
                try {
                    fun();
                } catch (e) {
                    bool = false;
                    System.debug("", e);
                }
            } else {
                fun();
            }
        }
        return bool;
    },
    debug : function (key, e) {
        if (fatal.error === undefined) {
            fatal.error = [];
        }
        fatal.error.push(e.description);
        GM.log(e);
    },
    applyOnElem : function (elem, type, script) {
        elem.setAttributeNode(Create.attribute(type, script));
    },
    generateMap : function (values, names) {
        var map, i;
        map = [];
        for (i = 0;i < names.length; ++i) {
            map[names[i]] = values[i];
        }
        for (i = names.length;i < values.length; ++i) {
            map.push(values[i]);
        }
        return map;
    },
    alertMap : function (map, test) {
        var str, key;
        str = "";
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                str += key + " : " + map[key] + "\n";
            }
        }
        if (test) {
            str += "\n" + map[test];
        }
        window.alert(str);
    },
    readMonth : function (mois) {
        var annee, i;
        annee = ["janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        while (i < annee.length && annee[i++] != mois) {
        }
        if (i - 1 < annee.length) {
            return i;
        } else {
            return undefined;
        }
    },
    version : "1.1.2"
};

CSS = {
    global : ".pseudo img {margin-right:3px} " +
        "#col1 {width: 65% !important;} " +
        "#col2 {width: 34% !important;} " +
        ".ltopic {width: 100% !important;}",
    formulaire : ".JVN_formulaire {width:10px;}" +
        ".JVN_formulaire a {text-align:center !important;}",
    verrou : ".JVN_verrou {width:10px;}" +
        ".JVN_verrou a {text-align:center !important; cursor:pointer;}",
    msgMsg3 : ".msg3 {background-color:#F9B9B9; border:2px solid #D19191;}",
    censureSujet : ".JVN_censure_sujet a {display:inline !important;}" +
        ".JVN_censure_sujet {font-style:italic;}",
    censureMessage : ".JVN_censure_message {font-style:italic;}",
    nb_excl : 3,
    exclusionSujet : ".msg0 {background-color: #000000; " +
        "border:solid 1px #111111; color:#FFFFFF;} " +
        ".JVN_Exclusion_n1 {background-color:#F9D9D9;} " +
        ".JVN_Exclusion_n2 {background-color:#D9D9F9;} " +
        ".JVN_Exclusion_n3 {background-color:#D9F9D9;} " +
        ".tr0 {background-color: #000000; color: #FFFFFF;} " +
        ".tr0 a {color: #888888 !important;} " +
        ".tr0 a:visited {color: #885555 !important;} " +
        ".tr0 a:hover {color: #FFFFFF !important;} " +
        ".JVN_Exclusion_Bloc {margin-top:20px; margin-bottom:12px; " +
        "background-color: #EFF4FC; border: solid 1px #C0D7ED;} " +
        ".JVN_Exclusion_Bloc ul {padding: 7px 4px; position:relative;} " +
        ".JVN_Exclusion_Titre {margin-bottom: 10px; font-weight:bold; " +
        "color:#200060;} " +
        ".JVN_Exclusion_Liste {padding-top: 10px; margin-bottom:8px; " +
        "line-height: 1.3em; background: url(http://image.jeuxvideo.com/" +
        "css_img/defaut/sep_444.gif) repeat-x top;}" +
        ".JVN_Exclusion_Liste span {font-style:italic; display:block; " +
        "padding-top:3px; padding-bottom:2px;} " +
        ".JVN_Exclusion_Liste span strong {color:#444444;} " +
        ".JVN_Exclusion_Liste span a {margin-left:3px; margin-right:3px;} " +
        ".JVN_Exclusion_Liste span img {margin-left:2px; " +
        "vertical-align:baseline;} ",
    version : "1.2.0"
};

Scripts = {
    adapt : function (code) {
        var blocs;
        if (JVN_Option.scripts) {
            blocs = (code + "").split("\n");
            if (blocs.length > 2) {
                blocs.shift();
                blocs.pop();
                blocs.pop();
                return blocs.join("\n");
            }
        }
        return "";
    },
    arme : {
        aimAll : function () {
            var cibles, i;
            cibles = document.getElementsByName('arme_JVN');
            for (i = 0;i < cibles.length; ++i) {
                cibles[i].checked = true;
            }
            return 0;
        },
        aimNone : function () {
            var cibles, i;
            cibles = document.getElementsByName('arme_JVN');
            for (i = 0;i < cibles.length; ++i) {
                cibles[i].checked = false;
            }
            return 0;
        },
        aimMess : function () {
            var cibles, i;
            cibles = document.getElementsByName('arme_JVN');
            for (i = 0;i < cibles.length; ++i) {
                if (cibles[i].getAttribute('mess')) {
                    cibles[i].checked = true;
                }
            }
            return 0;
        },
        aimTopics : function () {
            var cibles, i;
            cibles = document.getElementsByName('arme_JVN');
            for (i = 0;i < cibles.length; ++i) {
                if (!cibles[i].getAttribute('mess')) {
                    cibles[i].checked = true;
                }
            }
            return 0;
        },
        shoot : function () {
            var cibles, i, destroy;
            if (window.confirm('Êtes-vous sûr de vouloir tout effacer ?')) {
                cibles = document.getElementsByName('arme_JVN');
                for (i = 0;i < cibles.length; ++i) {
                    if (cibles[i].checked) {
                        destroy = window.open(location.href, 'arme_' + i, 
                            'toolbar=no, location=no, directories=no, ' +
                            'status=no, scrollbars=yes, resizable=yes, ' +
                            'copyhistory=no, width=520, height=570');
                        destroy.location.href = cibles[i].getAttribute('href');
                    }
                }
            }
            return 0;
        },
        version : "1.2.0"
    },
    lock : function () {
        var lock, a;
        lock = window.open(this.getAttribute('lock'), 'verrou', 
            'toolbar=no, location=no, directories=no, status=no, ' +
            'scrollbars=yes, resizable=yes, copyhistory=no, ' +
            'width=520, height=570');
        lock.onload = function () {
            var i, bool;
            a = lock.window.document.getElementsByTagName("a");
            i = -1;
            bool = true;
            while (bool && ++i < a.length) {
                bool = !(new RegExp("\\.jeuxvideo\\.com/forums/1[78]-([0-9]+)-([0-9]+)-([0-9]+)-([a-z0-9]+)-([0-9]+)-([0-9]+)-([^./]+)\\.htm#?", "i").test(a[i].href));    /***/
            }
            if (i < a.length) {
                lock.location.href = a[i].href;
                lock.onload = function () {
                    this.close();
                };
                lock.onunload = function () {
                    this.close();
                };
            } else {
                lock.close();
            }
        };
        return 0;
    },
    exclusionToggle : function () {
        var id1, id2, cible1, cible2;
        id1 = this.getAttribute('cible1');
        id2 = this.getAttribute('cible2');
        if (id1 && id2) {
            cible1 = document.getElementById(id1);
            cible2 = document.getElementById(id2);
            if (cible1 && cible2) {
                cible1.style.display = "";
                cible2.style.display = "none";
            }
        }
        return 0;
    },
    attributeGest : function () {
        function applyOnElem(elem, type, script) {
            var attribute;
            attribute = document.createAttribute(type);
            attribute.nodeValue = script;
            elem.setAttributeNode(attribute);
        }
        return applyOnElem;
    },
    cookie : function () {
        function cookieRead(name) {
            if (name) {
                if (new RegExp("; " + encodeURIComponent(name) + 
                    "=([^;]*);?").test("; " + document.cookie)) {    /**/
                    return decodeURIComponent(RegExp.$1);
                }
                return undefined;
            } else {
                return document.cookie;
            }
        }
        function cookieWrite(name, value, destroy, path) {
            var cookie, time;
            cookie = encodeURIComponent(name) + "=";
            cookie += encodeURIComponent(value) + ";";
            if (destroy) {
                time = -10;
            } else {
                time = 365 * 24 * 60 * 60 * 1000;
            }
            cookie += "; expires=" + 
                (new Date(new Date().getTime() + time)).toGMTString();
            if (path) {
                cookie += "; path=" + path;
            } else {
                cookie += "; path=/;";
            }
            document.cookie = cookie;
        }
        return [cookieRead, cookieWrite];
    },
    delExclusion : function () {
        var auteur, links, i, id, cible, exclId;
        auteur = this.getAttribute("auteur");
        exclId = this.getAttribute("ref");
        if (auteur && exclId) {
            if (window.confirm("Retirer l'exclusion de " + auteur + " ?")) {
                auteur = auteur.toLowerCase();
                cookieWrite(exclId + auteur, "", true);
                links = document.getElementsByName("Ref_exclusion_" + auteur);
                for (i = 0; i < links.length; ++i) {
                    links[i].style.display = "none";
                    id = links[i].getAttribute('cible2');
                    if (id) {
                        cible = document.getElementById(id);
                        if (cible) {
                            cible.style.display = "";
                        }
                    }
                }
                cible = document.getElementById(exclId + "Ref:" + auteur);
                if (cible) {
                    cible.style.display = "none";
                }
                links = document.getElementsByName(exclId + "Allow:" + auteur);
                for (i = 0; i < links.length; ++i) {
                    links[i].style.display = "";
                }
                
                afficheBlocExclusion();
            }
        }
        return 0;
    },
    exclusionActive : function () {
        var auteur, ref, id, span, cible, links, i;
        auteur = this.getAttribute("auteur");
        ref = this.getAttribute("ref");
        if (auteur && ref) {
            if (window.confirm("Exclure " + auteur + " ?")) {
                auteur = auteur.toLowerCase();
                
                cookieWrite(ref + auteur, true);
                
                links = document.getElementsByName(this.name);
                for (i = 0; i < links.length; ++i) {
                    links[i].style.display = "none";
                }
                
                links = document.getElementsByName("Ref_exclusion_" + auteur);
                for (i = 0; i < links.length; ++i) {
                    links[i].style.display = "";
                    links[i].onclick();
                    id = links[i].getAttribute("cible2");
                    if (id) {
                        cible = document.getElementById(id);
                        if (cible) {
                            cible.className = "msg msg0";
                        }
                    }
                }
                
                span = document.getElementById(ref + "Ref:" + auteur);
                if (span) {
                    span.style.display = "";
                }
                
                afficheBlocExclusion();
            }
        }
        return 0;
    },
    afficheBlocExclusion : function () {
        function afficheBlocExclusion() {
            var bloc, span, i;
            bloc = document.getElementById('JVN_Exclusion_block');
            if (bloc) {
                span = bloc.getElementsByTagName('span');
                i = -1;
                while (++i < span.length && span[i].style.display == "none") {
                }
                if (i < span.length) {
                    bloc.parentNode.parentNode.style.display = "";
                } else {
                    bloc.parentNode.parentNode.style.display = "none";
                }
            }
        }
        return afficheBlocExclusion;
    },
    censureToggle : function () {
        var bool, cookie, i, links, id, temp, cible;
        if (window.confirm(this.title + " ?")) {
            cookie = this.getAttribute("cookie");
            bool = (cookieRead(cookie) === undefined);
            links = document.getElementsByName(this.name);
            for (i = 0; i < links.length; ++i) {
                id = links[i].getAttribute("cible");
                if (id) {
                    cible = document.getElementById(id);
                    if (cible) {
                        temp = cible.innerHTML;
                        cible.innerHTML = links[i].getAttribute("alternate");
                        applyOnElem(links[i], "alternate", temp);
                        
                        temp = links[i].src;
                        links[i].src = links[i].getAttribute("alternateSrc");
                        applyOnElem(links[i], "alternateSrc", temp);
                        
                        temp = links[i].alt;
                        links[i].alt = links[i].getAttribute("alternateAlt");
                        applyOnElem(links[i], "alternateAlt", temp);
                    }
                }
            }
            if (bool) {
                cookieWrite(cookie, true);
            } else {
                cookieWrite(cookie, "", true);
            }
        }
        return 0;
    },
    readMessage : function () {
        function readMessage(message) {
            var reg, post, child, i;
            post = "";
            if (message !== undefined) {
                child = message.childNodes;
                for (i = 0; i < child.length; ++i) {
                    if (child[i].nodeType == 3) {
                        reg = new RegExp(String.fromCharCode(10), "gi");
                        post += child[i].nodeValue.replace(reg, "");
                    } else {
                        switch (child[i].tagName) {
                        case 'IMG' :
                            post += child[i].alt;
                            break;
                        case 'A' :
                            post += child[i].href;
                            break;
                        case 'BR' :
                            post += "\n";
                            break;
                        default : 
                            if (child[i].alt) {
                                post += child[i].alt;
                            }
                            break;
                        }
                    }
                }
            }
            return post;
        }
        return readMessage;
    },
    version : "1.2.0"
};

Const = {
    data : [],
    get : function (ind, arg1, arg2) {
        if (this.data[ind] === undefined) {
            switch (ind) {
            case "head" :
            case "body" :
                this.data[ind] = document.getElementsByTagName(ind);
                break;
            }
        }
        return this.data[ind];
    },
    set : function (ind, val) {
        this.data[ind] = val;
    },
    version : "1.2.0"
};

Create = {
    attribute : function (type, value) {
        var attribute;
        attribute = document.createAttribute(type);
        attribute.nodeValue = value;
        return attribute;
    },
    element : function (type) {
        return document.createElement(type);
    },
    link : function (href, content) {
        var a;
        a = Create.element("a");
        if (href) {
            a.href = href;
        }
        a.appendChild(content);
        return a;
    },
    text : function (text) {
        return document.createTextNode(text);
    },
    image : function (src, alt) {
        var img;
        img = Create.element("img");
        img.src = src;
        img.alt = alt;
        return img;
    },
    icone : function (nom, alt) {
        var img;
        img = Create.image(Icone[nom][JVN_Option.icone], alt);
        return img;
    },
    script : function (code) {
        var script;
        script = Create.element("script");
        script.type = "text/javascript";
        script.appendChild(Create.text("/* <!-- */ " + code + " /* --> */"));
        return script;
    },
    style : function (css) {
        var style;
        style = Create.element("style");
        style.type = "text/css";
        style.appendChild(Create.text(css));
        return style;
    },
    JVN : {
        script : function (nom) {
            var script, head;
            script = document.getElementById("JVN_script_" + nom);
            if (JVN_Option.scripts && !script) {
                head = Const.get("head");
                if (head.length > 0) {
                    script = Create.script(Scripts.adapt(Scripts[nom]));
                    script.id = "JVN_script_" + nom;
                    head[0].appendChild(script);
                }
            }
            return script;
        },
        style : function (nom) {
            var style, head;
            style = document.getElementById("JVN_style_" + nom);
            if (JVN_Option.CSS && !style) {
                head = Const.get("head");
                if (head.length > 0) {
                    style = Create.style(CSS[nom]);
                    style.id = "JVN_style_" + nom;
                    head[0].appendChild(style);
                }
            }
            return style;
        },
        version : "1.2.0"
    },
    url : {
        forum : function (context, server, mode, forum, sujet, page, 
            hash, index, recherche, motif, ancre) {
            var url;
            url = context + "//";
            url += server + ".jeuxvideo.com/forums/";
            url += mode + "-";
            url += forum + "-";
            url += sujet + "-";
            url += page + "-";
            url += hash + "-";
            url += index + "-";
            url += recherche + "-";
            url += motif + ".htm";
            if (ancre) {
                url += "#" + ancre;
            }
            return url;
        },
        version : "1.2.0"
    },
    menu : {
        menu : function (titre, id) {
            var menu, h3, span;
            menu = Create.element("div");
            menu.id = id;
            h3 = Create.element("h3");
            span = Create.element("span");
            span.appendChild(Create.text(titre));
            h3.appendChild(span);
            menu.appendChild(h3);
            menu.appendChild(Create.element("ul"));
            return menu;
        },
        option : function (titre, href) {
            var li;
            li = Create.element("li");
            li.appendChild(Create.link(href, Create.text(titre)));
            return li;
        },
        version : "1.1.0"
    },
    version : "1.2.0"
};

B = {
    v : String.fromCharCode(11),
    f : String.fromCharCode(12),
    s : String.fromCharCode(28),
    g : String.fromCharCode(29),
    r : String.fromCharCode(30),
    u : String.fromCharCode(31),
    citbeg : "" + this.v + this.v + this.v + this.s + this.v,
    citend : "" + this.v + this.v + this.v + this.g + this.v,
    version : "1.2.0"
};

Lecteur = {
    messagetext : function (message) {
        if (fatal.write === undefined) {
            fatal.write = Scripts.readMessage();
            if (fatal.write) {
                return "";
            }
        }
        return fatal.write(message);
    },
    message : function (mess) {
        var answer, li, a, i, strong, split, parse;
        answer = [];
        answer.all = mess;
        split = mess.id.split("_");
        if (split.length > 1) {
            answer.id = split[1];
        }
        answer.detruit = (mess.className == "msg msg_invisible");
        li = mess.getElementsByTagName("li");
        if (li.length > 0) {
            for (i = 0;i < li.length; ++i) {
                switch (li[i].className) {
                case "pseudo" : 
                    answer.first = li[i];
                    break;
                case "date" : 
                    answer.second = li[i];
                    break;
                case "post" : 
                    answer.third = li[i];
                    break;
                case "ancre" : 
                    answer.fourth = li[i];
                    break;
                }
            }
            if (answer.first !== undefined) {
                strong = answer.first.getElementsByTagName("strong");
                if (strong.length > 0) {
                    answer.pseudonyme = strong[0];
                    answer.pseudo = strong[0].innerHTML;
                    answer.moderateur = (strong[0].className == "moderateur");
                }
                a = answer.first.getElementsByTagName("a");
                if (a.length > 0) {
                    for (i = 0;i < a.length; ++i) {
                        parse = Lecteur.url(a[i].href);
                        switch (parse.type) {
                        case "forum" :
                            if (parse.mode == "4") {
                                answer.suppr = a[i];
                                answer.parse_suppr = parse;
                            }
                            break;
                        case "profil" :
                            answer.profil = a[i];
                            answer.parse_profil = parse;
                            break;
                        }
                    }
                }
            }
            if (answer.second !== undefined) {
                if (new RegExp("(([0-9]{1,2})[er]* ([^ 0-9<>]*) ([0-9]{4}) à ([0-9]{2}):([0-9]{2}):([0-9]{2}))").test(answer.second.innerHTML)) {    /***/
                    answer.date = RegExp.$1;
                    answer.jour = parseInt(RegExp.$2, 10);
                    answer.mois = System.readMonth(RegExp.$3);
                    answer.annee = parseInt(RegExp.$4, 10);
                    answer.heure = parseInt(RegExp.$5, 10);
                    answer.minute = parseInt(RegExp.$6, 10);
                    answer.seconde = parseInt(RegExp.$7, 10);
                }
                a = answer.second.getElementsByTagName("a");
                if (a.length > 0) {
                    for (i = 0;i < a.length; ++i) {
                        parse = Lecteur.url(a[i].href);
                        switch (parse.type) {
                        case "avert_modo" :
                            answer.avert = a[i];
                            answer.parse_avert = parse;
                            break;
                        case "kick" :
                            answer.kick = a[i];
                            answer.parse_kick = parse;
                            break;
                        }
                    }
                }
            }
            if (answer.third !== undefined) {
                answer.text = Lecteur.messagetext(answer.third);
            }
            if (answer.fourth !== undefined) {
                a = answer.fourth.getElementsByTagName("a");
                if (a.length > 0) {
                    for (i = 0;i < a.length; ++i) {
                        parse = Lecteur.url(a[i].href);
                        if (parse.type == "forum") {
                            answer.ancre = a[i];
                            answer.parse_ancre = parse;
                        }
                    }
                }
            }
        }
        return answer;
    },
    sujet : function (sujet, infoColonnes) {
        var answer, td, ico, a, child, bool;
        answer = [];
        answer.all = sujet;
        answer.detruit = (sujet.className == "trinv");
        td = sujet.getElementsByTagName('td');
        if (td.length != infoColonnes.length) {
            sujet.className = "trinv";
        } else {
            answer.bloc_icone = td[infoColonnes.n_icone];
            ico = answer.bloc_icone.getElementsByTagName("img");
            if (ico.length > 0) {
                answer.icone = ico[0];
                if (new RegExp(".*/([^/]+)").test(answer.icone.src)) {
                    switch (RegExp.$1) {
                    case "topic_marque_on.gif" :
                        answer.epingle = true;
                        answer.verrou = false;
                        break;
                    case "topic_marque_off.gif" :
                        answer.epingle = true;
                        answer.verrou = true;
                        break;
                    case "topic_cadenas.gif" :
                        answer.epingle = false;
                        answer.verrou = true;
                        break;
                    case "topic_dossier1.gif" :
                    case "topic_dossier2.gif" :
                        answer.epingle = false;
                        answer.verrou = false;
                        break;
                    }
                }
            }
            
            if (infoColonnes.n_moder) {
                answer.bloc_moder = td[infoColonnes.n_moder];
                a = answer.bloc_moder.getElementsByTagName("a");
                if (a.length > 0) {
                    answer.suppr = a[0];
                    answer.parse_mod = Lecteur.url(a[0].href);
                }
            }
            
            answer.bloc_sujet = td[infoColonnes.n_sujet];
            a = answer.bloc_sujet.getElementsByTagName("a");
            if (a.length > 0) {
                answer.sujet = a[0];
                answer.parse = Lecteur.url(a[0].href);
                answer.titre = a[0].childNodes[0].nodeValue;
                answer.mess = (a[0].href.split("#").length > 1);
            }
            
            answer.bloc_auteur = td[infoColonnes.n_auteur];
            child = answer.bloc_auteur.childNodes;
            if (child.length > 0) {
                answer.auteur = child[0].nodeValue;
            }
            bool = (answer.bloc_auteur.className == "pseudo topic_mod");
            answer.moderateur = bool;
            
            answer.bloc_mess = td[infoColonnes.n_mess];
            child = answer.bloc_mess.childNodes;
            if (child.length > 0) {
                answer.nombre = child[0];
                answer.messages = parseInt(answer.nombre.nodeValue, "10");
            }
                    
            answer.bloc_date = td[infoColonnes.n_date];
            child = answer.bloc_date.childNodes;
            if (child.length > 0) {
                answer.date = child[0];
                if (new RegExp("^([0-9]{2})/([0-9]{2})/([0-9]{4}) ([0-9]{2})h([0-9]{2})$").test(answer.date.nodeValue)) {    /***/
                    answer.jour = parseInt(RegExp.$1, "10");
                    answer.mois = parseInt(RegExp.$2, "10");
                    answer.annee = parseInt(RegExp.$3, "10");
                    answer.heure = parseInt(RegExp.$4, "10");
                    answer.minute = parseInt(RegExp.$5, "10");
                    answer.seconde = 0;
                }
            }
        }
        return answer;
    },
    colonnes : function (colonnes) {
        var answer, th, i;
        answer = [];
        answer.all = colonnes;
        th = colonnes.getElementsByTagName('th');
        answer.length = th.length;
        for (i = 0;i < answer.length; ++i) {
            switch (th[i].id) {
            case "c1" :
                answer.n_icone = i;
                answer.icone = th[i];
                break;
            case "c2" :
                answer.n_sujet = i;
                answer.sujet = th[i];
                break;
            case "c3" :
                answer.n_auteur = i;
                answer.auteur = th[i];
                break;
            case "c4" :
                answer.n_mess = i;
                answer.mess = th[i];
                break;
            case "c5" :
                answer.n_date = i;
                answer.date = th[i];
                break;
            }
            if (th[i].className == "col_moder") {
                answer.n_moder = i;
                answer.moder = th[i];
            }
        }
        return answer;
    },
    profil : function () {
        var answer;
        answer = [];
        
        return answer;
    },
    menu : function () {
        var answer;
        answer = [];
        answer.global = document.getElementById("menu_rubriques");
        answer.magazine = Lecteur.rubrique("menu_magazine");
        answer.telecharger = Lecteur.rubrique("menu_telecharger");
        answer.videos = Lecteur.rubrique("menu_videos");
        answer.interactif = Lecteur.rubrique("menu_interactif");
        answer.concours = Lecteur.rubrique("menu_concours");
        answer.apropos = Lecteur.rubrique("menu_apropos");
        return answer;
    },
    rubrique : function (id) {
        var answer, temp;
        answer = [];
        answer.global = document.getElementById(id);
        if (answer.global) {
            temp = answer.global.getElementsByTagName('h3');
            if (temp) {
                answer.h3 = temp[0];
            }
            temp = answer.global.getElementsByTagName('ul');
            if (temp) {
                answer.ul = temp[0];
            }
        }
        return answer;
    },
    url : function (url) {
        var answer, tmp;
        answer = [];
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp(Reg.forum.exp(), "i"), 
                url, 
                "forum", 
                Reg.forum.ans);
        }
        if (answer.length === 0) {
            tmp = "[^-./]+";
            answer = Lecteur.tryurl(
                new RegExp(Reg.forum.exp(undefined, 
                        undefined, 
                        tmp, 
                        tmp, 
                        tmp, 
                        tmp, 
                        tmp, 
                        tmp, 
                        tmp), 
                    "i"), 
                url, 
                "forum", 
                Reg.forum.ans);
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/cgi-bin/jvforums/forums_profil\\.cgi\\??(.*)$", "i"), url, "profil", ["type", "context", "options"]);    /***/
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/cgi-bin/jvforums/forums_profil_mobile\\.cgi\\??(.*)$", "i"), url, "profil_mobile", ["type", "context", "options"]);    /***/
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/cgi-bin/jvforums/avertir_moderateur\\.cgi\\??(.*)$", "i"), url, "avert_modo", ["type", "context", "options"]);    /***/
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/smileys/legende\\.htm", "i"), url, "legende", ["type", "context", "options"]);    /***/
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/cgi-bin/jvforums/moderation\\.cgi\\??(.*)$", "i"), url, "moderation", ["type", "context", "options"]);    /***/
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/cgi-bin/jvforums/moncompte\\.cgi\\??(.*)$", "i"), url, "compte", ["type", "context", "options"]);    /***/
        }
        if (answer.length === 0) {
            answer = Lecteur.tryurl(new RegExp("\\.jeuxvideo\\.com/cgi-bin/jvforums/kick_user\\.cgi\\??(.*)$", "i"), url, "kick", ["type", "context", "options"]);    /***/
        }
        return answer;
    },
    optionsURL : function (options) {
        var answer, blocs, i;
        answer = [];
        blocs = options.split("&");
        for (i = 0;i < blocs.length; ++i) {
            if (new RegExp("([^=]+)=(.*)").test(blocs[i])) {
                answer[RegExp.$1] = RegExp.$2;
            }
        }
        return answer;
    },
    tryurl : function (reg, url, type, names) {
        var answer, temp;
        answer = [];
        temp = [];
        if (reg.test(url)) {
            temp.push(type);
            temp.push(RegExp.leftContext);
            temp.push(RegExp.$1);
            temp.push(RegExp.$2);
            temp.push(RegExp.$3);
            temp.push(RegExp.$4);
            temp.push(RegExp.$5);
            temp.push(RegExp.$6);
            temp.push(RegExp.$7);
            temp.push(RegExp.$8);
            temp.push(RegExp.$9);
            temp.push(RegExp.rightContext);
            answer = System.generateMap(temp, names);
            answer.push(true);
        }
        return answer;
    },
    version : "1.2.1"
};

Exclusion = {
    getBloc : function () {
        var ul, li, titre, block, col1, id;
        id = JVN_id.exclusion + "block";
        li = document.getElementById(id);
        if (!li) {
            col1 = document.getElementById("col1");
            if (col1) {
                Create.JVN.script("afficheBlocExclusion");
                block = Create.element("div");
                block.className = "JVN_Exclusion_Bloc";
                col1.appendChild(block);
                
                ul = Create.element("ul");
                block.appendChild(ul);
                
                titre = Create.element("li");
                ul.appendChild(titre);
                titre.appendChild(Create.text("Liste des exclusions : "));
                titre.className = "JVN_Exclusion_Titre";
                
                li = Create.element("li");
                ul.appendChild(li);
                li.id = id;
                li.className = "JVN_Exclusion_Liste";
                
                Create.JVN.style("exclusionSujet");
            }
        }
        return li;
    },
    getReference : function (auteur) {
        var span, block, strong, id, a, img, n, i, script;
        id = JVN_id.exclusion + "Ref:" + auteur.toLowerCase();
        span = document.getElementById(id);
        if (!span) {
            block = Exclusion.getBloc();
            if (block) {
                n = block.getElementsByTagName("span").length;
                
                span = Create.element("span");
                block.appendChild(span);
                span.id = id;
                i = 1 + (n % CSS.nb_excl);
                span.className = "JVN_Exclusion_n" + i;
                
                strong = Create.element("strong");
                strong.appendChild(Create.text(auteur));
                span.appendChild(strong);
                
                img = Create.icone("green", "[+]");
                a = Create.link("", img);
                a.title = "Enlever l'exclusion de " + auteur;
                a.style.cursor = "pointer";
                System.applyOnElem(a, "auteur", auteur);
                System.applyOnElem(a, "ref", JVN_id.exclusion);
                script = Scripts.adapt(Scripts.delExclusion);
                System.applyOnElem(a, "onclick", script);
                span.appendChild(a);
                Create.JVN.script("cookie");
                
                span.appendChild(Create.text(" : "));
            }
        }
        return span;
    },
    add : function (newPosition, icone, id, auteur, titre, bool) {
        var bloc, img, script, rest;
        bloc = Exclusion.getReference(auteur);
        if (bloc) {
            img = Create.icone("profil", "[?]");
            img.title = titre;
            img.style.cursor = "pointer";
            img.id = "voir:" + id;
            System.applyOnElem(img, "cible1", id);
            System.applyOnElem(img, "cible2", img.id);
            script = Scripts.adapt(Scripts.exclusionToggle);
            System.applyOnElem(img, "onclick", script);
            bloc.appendChild(img);
            
            rest = icone;
            rest.title = "Cacher le bloc";
            rest.style.cursor = "pointer";
            rest.id = "cacher:" + id;
            rest.name = "Ref_exclusion_" + auteur.toLowerCase();
            System.applyOnElem(rest, "cible1", img.id);
            System.applyOnElem(rest, "cible2", id);
            script = Scripts.adapt(Scripts.exclusionToggle);
            System.applyOnElem(rest, "onclick", script);
            newPosition.appendChild(rest);
            
            if (bool) {
                img.style.display = "none";
            }
        }
    },
    version : "1.2.0"
};

Citation = {
    allow : function () {
        return (JVN_Option.citation && GM.version != "1.2.0");
    },
    write : function (pseudo, date, message, ancre) {
        var citation;
        citation = "";
        citation += "| " + pseudo;
        citation += "\n| " + date;
        citation += "\n| " + message.split("\n").join("\n| ");
        return citation;
    },
    version : "1.2.0"
};

Pseudonyme = {
    color : function (pseudo) {
    },
    version : "1.2.0"
};

Moderateur = {
    is : undefined,
    detect : function (info) {
        return (info.type == "forum") && (info.mode == "4");
    },
    isModo : function () {
        var a, i, n, bool;
        if (Moderateur.is === undefined) {
            a = document.getElementsByTagName("a");
            i = -1;
            n = a.length;
            bool = true;
            while (bool && ++i < n) {
                bool = !(Moderateur.detect(Lecteur.url(a[i].href)));
            }
            Moderateur.is = !bool;
        }
        return Moderateur.is;
    },
    arme : {
        active : null,
        isActive : function () {
            if (Moderateur.arme.active === null) {
                Moderateur.arme.active = true;
            }
            return (Moderateur.isModo() && Moderateur.arme.active);
        },
        menu : {
            apply : function (context, infoMenu) {
                var nom_menu, script, aimAll, aimAllPics, 
                    aimAllMess, aimNone, shoot, text;
                if (Moderateur.arme.isActive()) {
                    nom_menu = "interactif";
                    if (infoMenu[nom_menu] && infoMenu[nom_menu].ul) {
                        aimAll = Create.menu.option("Tout viser");
                        aimAll.style.cursor = "pointer";
                        script = Scripts.adapt(Scripts.arme.aimAll);
                        System.applyOnElem(aimAll, "onclick", script);
                        infoMenu[nom_menu].ul.appendChild(aimAll);
                        
                        if (context.mode == "0" && context.recherche == "4") {
                            text = "Tout viser (topics)";    /**/
                            aimAllPics = Create.menu.option(text);
                            aimAllPics.style.cursor = "pointer";
                            script = Scripts.adapt(Scripts.arme.aimTopics);
                            System.applyOnElem(aimAllPics, "onclick", script);
                            infoMenu[nom_menu].ul.appendChild(aimAllPics);
                            
                            text = "Tout viser (messages)";    /**/
                            aimAllMess = Create.menu.option(text);
                            aimAllMess.style.cursor = "pointer";
                            script = Scripts.adapt(Scripts.arme.aimMess);
                            System.applyOnElem(aimAllMess, "onclick", script);
                            infoMenu[nom_menu].ul.appendChild(aimAllMess);
                        }
                        
                        aimNone = Create.menu.option("Rien viser");
                        aimNone.style.cursor = "pointer";
                        script = Scripts.adapt(Scripts.arme.aimNone);
                        System.applyOnElem(aimNone, "onclick", script);
                        infoMenu[nom_menu].ul.appendChild(aimNone);
                        
                        shoot = Create.menu.option("Sulfater");
                        shoot.style.cursor = "pointer";
                        script = Scripts.adapt(Scripts.arme.aimShoot);
                        System.applyOnElem(shoot, "onclick", script);
                        infoMenu[nom_menu].ul.appendChild(shoot);
                    }
                }
            },
            version : "1.0.2"
        },
        sujets : {
            apply : function (sujet, infoURL, info) {
                var aim, input; 
                if (Moderateur.arme.isActive()) {
                    aim = Sujets.add(sujet.firstChild, true);
                    input = Create.element('input');
                    input.type = "checkbox";
                    aim.appendChild(input);
                    if (info.mess) {
                        System.applyOnElem(input, "mess", true);
                    }
                    if (info.suppr === undefined || info.detruit) {
                        input.disabled = true;
                        input.style.display = "none";
                    } else {
                        System.applyOnElem(input, "href", info.suppr.href);
                        input.name = "arme_JVN";
                    }
                }
            },
            init : function (col, infoURL) {
                if (Moderateur.arme.isActive()) {
                    Colonnes.add(col.firstChild, true);
                }
            },
            version : "1.0.0"
        },
        message : {
            apply : function (info, infoURL) {
                var input, bool;
                if (Moderateur.arme.isActive()) {
                    input = Create.element('input');
                    input.type = "checkbox";
                    bool = info.suppr === undefined;
                    bool = bool || info.detruit;
                    bool = bool || infoURL.sujet == info.all.id.split("_")[1];
                    if (bool) {
                        input.disabled = true;
                        input.style.display = "none";
                    } else {
                        System.applyOnElem(input, "href", info.suppr.href);
                        input.name = "arme_JVN";
                    }
                    info.first.insertBefore(input, info.first.firstChild);
                }
            },
            version : "1.0.0"
        },
        version : "1.2.0"
    },
    lock : {
        apply : function (info) {
            var td, href, img, a, script;
            if (Moderateur.isModo()) {
                td = Sujets.add(info.bloc_icone.nextSibling, true);
                if (info.verrou !== undefined) {
                    if (info.verrou) {
                        img = Create.icone("rep_off", "{}");
                    } else {
                        img = Create.icone("redA", "[]");
                    }
                    a = Create.link(href, img);
                    System.applyOnElem(a, "lock", info.sujet.href);
                    script = Scripts.adapt(Scripts.lock);
                    System.applyOnElem(a, "onclick", script);
                    td.className = "JVN_verrou";
                    Create.JVN.style("verrou");
                    td.appendChild(a);
                }
            }
        },
        init : function (info) {
            if (Moderateur.isModo()) {
                Colonnes.add(info.icone.nextSibling, true);
            }
        },
        version : "1.2.0"
    },
    version : "1.0.0"
};

Profil = {
    apply : function (infoURL, JVN_Options) {
    },
    version : "1.2.0"
};

JVN_Menu = {
    apply : function (arbre) {
        var cour, i, key;
        cour = JVN_Menu;
        if (arbre) {
            for (i = 0;cour && i < arbre.length; ++i) {
                cour = cour[arbre[i]];
            }
        }
        if (cour) {
            for (key in cour) {
                if (cour.hasOwnProperty(key)) {
                
                }
            }
        }
    },
    menu_dummy : {
        titre : "",
        description : "",
        JVN_Option : false,
        content : false,
        apply : function () {
        },
        version : "1.2.0"
    },
    version : "1.2.0"
};

Menu = {
    apply : function (infoURL) {
        var infoMenu, option, url;
        infoMenu = Lecteur.menu();
        System.test(JVN_Option.stats, function () {
            if (infoMenu.interactif.ul) {
                url = "http://jvstats.planet-shitfliez.net/" +
                    "stats/inflate.php?num=" + infoURL.forum;
                option = Create.menu.option("Statistiques", url);
                infoMenu.interactif.ul.appendChild(option);
            }
        });
        System.test(JVN_Option.arme, function () {
            Moderateur.arme.menu.apply(infoURL, infoMenu);
        });
        System.test(JVN_Option.firstPage, function () {
            Menu.gotoFirstPage();
        });
    },
    addMenu : function (id_menu, titre, icone, prec) {
        var liste, menu;
        liste = document.getElementById('menu_rubriques');
        if (liste) {
            menu = Create.menu.menu(titre, id_menu);
            Create.JVN.style(id_menu);
            if (prec && prec.parentNode == liste) {
                liste.insertBefore(menu, prec);
            } else {
                liste.appendChild(menu);
            }
        }
        return menu;
    },
    getUl : function (id_menu) {
        var liste, ul;
        liste = document.getElementById(id_menu);
        if (liste) {
            ul = liste.getElementsByTagName('ul');
            if (ul.length > 0) {
                return ul[0];
            }
        }
        return null;
    },
    gotoFirstPage : function () {
        var i, a, parse;
        a = document.getElementById('col1');
        if (a) {
            a = a.getElementsByTagName('a');
            if (a.length > 0) {
                for (i = 0;i < a.length; ++i) {
                    parse = Lecteur.url(a[i].href);
                    if (parse.type == "forum" && parse.mode == "26") {
                        a[i].href = Create.url.forum(
                            parse.context, 
                            parse.server, 
                            0, 
                            parse.forum, 
                            0, 
                            1, 
                            0, 
                            1, 
                            0, 
                            parse.motif);
                    }
                }
            }
        }
    },
    version : "1.2.0"
};

Messages = {
    apply : function (infoURL) {
        var ul, i, info, cour;
        System.test(JVN_Option.seeAncre, function () {
            Messages.seeAncre(infoURL);
        });
        ul = document.getElementById("col1").getElementsByTagName("ul");
        for (i = 0;i < ul.length; ++i) {
            cour = ul[i].parentNode;
            info = Lecteur.message(cour);
            if (info.first && info.second && info.third && info.fourth) {
                info.first.id = cour.id + "_pseudo";
                info.second.id = cour.id + "_date";
                info.third.id = cour.id + "_post";
                info.fourth.id = cour.id + "_ancre";
                Messages.modify(cour, infoURL, info);
            }
        }
        (Scripts.afficheBlocExclusion()());
    },
    modify : function (message, infoURL, info) {
        System.test(JVN_Option.arme, function () {
            Moderateur.arme.message.apply(info, infoURL);
        });
        System.test(JVN_Option.hide, function () {
            Messages.hide(message, info, infoURL);
        });
        System.test(JVN_Option.censure, function () {
            Messages.censure(message, info, infoURL);
        });
        System.test(JVN_Option.exclusion, function () {
            Messages.exclure(message, info, infoURL);
        });
        System.test(Citation.allow(), function () {
            Messages.citation(message, info, infoURL);
        });
    },
    citation : function (message, info, infoURL) {
        var img;
        img = Create.icone("grayC", "[C]");
        img.title = "Citer ce message";
        img.style.cursor = "pointer";
        img.addEventListener("click",
            function () {
                var citation, base, q;
                citation = Citation.write(
                    this.getAttribute('pseudo'),
                    this.getAttribute('date'),
                    this.getAttribute('message'),
                    this.getAttribute('ancre'));
                q = "Citer ce message ?\n\n" + citation.substring(0, 1500);
                if (window.confirm(q)) {
                    base = GM.get(JVN_id.citation, "");
                    if (base === "") {
                        base = "";
                    } else {
                        base += "\n\n";
                    }
                    GM.set(JVN_id.citation, base + citation);
                    GM.unl(JVN_id.citation);
                }
            }, false);
        System.applyOnElem(img, "pseudo", info.pseudo);
        System.applyOnElem(img, "date", info.date);
        System.applyOnElem(img, "message", info.text);
        if (info.ancre) {
            System.applyOnElem(img, "ancre", info.ancre.href);
        }
        info.first.appendChild(img);
    },
    seeAncre : function (infoURL) {
        var message;
        if (infoURL.ancre) {
            message = document.getElementById(infoURL.ancre);
            if (message) {
                message.className = "msg msg3";
                Create.JVN.style("msgMsg3");
            }
        }
    },
    hide : function (message, info, infoURL) {
    
    },
    censure : function (message, info, infoURL) {
        var img, content, span, script, temp, cookie;
        Create.JVN.script("cookie");
        Create.JVN.script("attributeGest");
        cookie = JVN_id.censure + info.pseudo.toLowerCase();
        
        content = Create.element("li");
        span = Create.element("span");
        span.appendChild(Create.text("Ce message a été censuré"));
        span.className = "JVN_censure_message";
        span.title = info.text;
        content.appendChild(span);
        
        img = Create.icone("blueK", "[K]");
        img.style.cursor = "pointer";
        img.name = cookie;
        System.applyOnElem(img, "cookie", cookie);
        System.applyOnElem(img, "cible", info.third.id);
        System.applyOnElem(img, "alternate", content.innerHTML);
        System.applyOnElem(img, "alternateTitle", "Dékicker " + info.pseudo);
        System.applyOnElem(img, "alternateSrc", Icone.pinkO[JVN_Option.icone]);
        System.applyOnElem(img, "alternateAlt", "[O]");
        img.title = "Kicker " + info.pseudo;
        script = Scripts.adapt(Scripts.censureToggle);
        System.applyOnElem(img, "onclick", script);
        info.first.appendChild(img);
        
        Create.JVN.style("censureMessage");
        if (Cookie.read(cookie)) {
            temp = info.third.innerHTML;
            info.third.innerHTML = img.getAttribute("alternate");
            System.applyOnElem(img, "alternate", temp);
            
            temp = img.title;
            img.title = img.getAttribute("alternateTitle");
            System.applyOnElem(img, "alternateTitle", temp);
            
            temp = img.src;
            img.src = img.getAttribute("alternateSrc");
            System.applyOnElem(img, "alternateSrc", temp);
            
            temp = img.alt;
            img.alt = img.getAttribute("alternateAlt");
            System.applyOnElem(img, "alternateAlt", temp);
        }
    },
    exclure : function (message, info, infoURL) {
        var boolCookie, bool, img, cible, script, id;
        boolCookie = Cookie.read(JVN_id.exclusion + info.pseudo.toLowerCase());
        bool = (info.moderateur && JVN_Option.immuneMod);
        bool = (bool || Moderateur.isModo());
        Create.JVN.script("cookie");
        Create.JVN.script("afficheBlocExclusion");
        
        img = Create.icone("redX", "[X]");
        img.name = JVN_id.exclusion + "Allow:" + info.pseudo.toLowerCase();
        img.style.cursor = "pointer";
        System.applyOnElem(img, "auteur", info.pseudo);
        System.applyOnElem(img, "ref", JVN_id.exclusion);
        script = Scripts.adapt(Scripts.exclusionActive);
        System.applyOnElem(img, "onclick", script);
        info.first.appendChild(img);
        
        bool = (!boolCookie || bool);
        Exclusion.add(info.first, 
            Create.icone("greenX", "[X]"), 
            message.id, 
            info.pseudo, 
            info.date, 
            bool);
        if (boolCookie) {
            img.style.display = "none";
            message.className = "msg msg0";
        } else {
            cible = document.getElementById("cacher:" + message.id);
            if (cible) {
                cible.style.display = "none";
            }
            id = JVN_id.exclusion + "Ref:" + info.pseudo.toLowerCase();
            cible = document.getElementById(id);
            if (cible) {
                cible.style.display = "none";
            }
        }
        if (!bool) {
            message.style.display = "none";
        }
    },
    version : "1.2.0"
};

Colonnes = {
    add : function (colonnes, bool) {
        var th;
        th = Create.element("th");
        th.scope = "col";
        if (bool) {
            colonnes.parentNode.insertBefore(th, colonnes);
        } else {
            colonnes.appendChild(th);
        }
        return th;
    },
    version : "1.2.0"
};

Sujets = {
    apply : function (infoURL) {
        var liste, infoColonnes, i, info;
        liste = document.getElementById('liste_topics');
        if (liste) {
            liste = liste.getElementsByTagName('tr');
            infoColonnes = Lecteur.colonnes(liste[0]);
            Sujets.modify("init", liste[0], infoURL, infoColonnes);
            for (i = 1;i < liste.length; ++i) {
                info = Lecteur.sujet(liste[i], infoColonnes);
                Sujets.modify("apply", liste[i], infoURL, info);
            }
        }
    },
    modify : function (fonction, sujet, infoURL, info) {
        if (info.parse) {
            sujet.id = "topic_" + info.parse.sujet;
        }
        System.test(JVN_Option.arme, function () {
            Moderateur.arme.sujets[fonction](sujet, infoURL, info);
        });
        System.test(JVN_Option.formulaire, function () {
            Sujets.formulaire[fonction](info);
        });
        System.test(JVN_Option.verrou, function () {
            Moderateur.lock[fonction](info);
        });
        System.test(JVN_Option.lastPage, function () {
            Sujets.lastPage[fonction](info);
        });
        System.test(JVN_Option.censure, function () {
            Sujets.censure[fonction](sujet, infoURL, info);
        });
        System.test(JVN_Option.exclusion, function () {
            Sujets.exclusion[fonction](sujet, infoURL, info);
        });
    },
    add : function (sujet, bool) {
        var td;
        td = Create.element("td");
        if (bool) {
            sujet.parentNode.insertBefore(td, sujet);
        } else {
            sujet.appendChild(td);
        }
        return td;
    },
    lastPage : {
        apply : function (info) {
            var bloc;
            if (info.icone && info.messages !== undefined && info.parse) {
                bloc = info.bloc_icone;
                bloc.appendChild(Create.link(Create.url.forum(
                    info.parse.context,
                    info.parse.server,
                    info.parse.mode,
                    info.parse.forum,
                    info.parse.sujet,
                    1 + Math.floor(info.messages / 20),
                    info.parse.hash, 
                    info.parse.index,
                    info.parse.recherche, 
                    info.parse.motif),
                    info.icone));
            }
        },
        init : function (info) {
        },
        version : "1.2.0"
    },
    formulaire : {
        apply : function (info) {
            var td, href, img;
            td = Sujets.add(info.bloc_icone.nextSibling, true);
            if (info.verrou !== undefined) {
                if (!info.verrou || JVN_Option.formulaireVerrou) {
                    href = Create.url.forum(
                        info.parse.context, 
                        info.parse.server, 
                        3, 
                        info.parse.forum, 
                        info.parse.sujet, 
                        info.parse.page, 
                        info.parse.hash, 
                        info.parse.index, 
                        info.parse.recherche, 
                        info.parse.motif, 
                        "form_post");
                    img = Create.icone("rep", "[]");
                    if (info.verrou && JVN_Option.formulaireVerrou) {
                        img = Create.icone("rep_off", "{}");
                    }
                    td.className = "JVN_formulaire";
                    Create.JVN.style("formulaire");
                    td.appendChild(Create.link(href, img));
                }
            }
        },
        init : function (info) {
            Colonnes.add(info.icone.nextSibling, true);
        },
        version : "1.2.0"
    },
    censure : {
        apply : function (sujet, infoURL, info) {
            var text;
            if (Cookie.read(JVN_id.censure + info.auteur.toLowerCase())) {
                info.bloc_sujet.title = info.titre;
                info.sujet.innerHTML = "";
                text = Create.text("(Personne censurée, cliquez ");
                info.bloc_sujet.insertBefore(text, info.sujet);
                info.sujet.appendChild(Create.text("ici"));
                text = Create.text(" pour accéder au sujet)");
                info.bloc_sujet.appendChild(text);
                info.bloc_sujet.className = "JVN_censure_sujet";
                Create.JVN.style("censureSujet");
                
                info.bloc_icone.innerHTML = "";
                info.bloc_icone.appendChild(Create.icone("redX"));
            }
        },
        init : function (sujet, infoURL, info) {
        },
        version : "1.2.0"
    },
    exclusion : {
        apply : function (sujet, infoURL, info) {
            var bool;
            if (Cookie.read(JVN_id.exclusion + info.auteur.toLowerCase())) {
                sujet.className = "tr0";
                bool = (info.moderateur && JVN_Option.immuneMod);
                bool = (bool || Moderateur.isModo());
                info.bloc_icone.innerHTML = "";
                Exclusion.add(info.bloc_icone, 
                    Create.icone("orange", "[-]"), 
                    sujet.id, info.auteur, 
                    info.titre + " (" + info.messages + ")", 
                    bool);
                if (!bool) {
                    sujet.style.display = "none";
                }
            }
        },
        init : function (sujet, infoURL, info) {
        },
        version : "1.2.0"
    },
    dummy : {
        apply : function () {
        },
        init : function () {
        },
        version : "1.2.0"
    },
    version : "1.2.0"
};

Reponse = {
    apply : function (infoURL) {
        System.test(Citation.allow(), function () {
            Reponse.citation();
        });
        
    },
    citation : function () {
        var message;
        message = document.getElementById("newmessage");
        if (message !== null) {
            message.addEventListener("focus",
                function () {
                    var msg = GM.get(JVN_id.citation, "");
                    if (msg) {
                        this.value += "\n" + GM.get(JVN_id.citation, "");
                        GM.del(JVN_id.citation);
                    }
                }, false);
        }
    },
    version : "1.2.0"
};

JVN = {
    initialize : function (doc, id) {
        var block, body;
        block = doc.getElementById(id);
        if (block === null) {
            body = doc.getElementsByTagName("body");
            if (body.length > 0) {
                block = Create.element("input");
                block.type = "hidden";
                block.id = id;
                if (body[0].childNodes.length > 0) {
                    body[0].insertBefore(block, body[0].firstChild);
                } else {
                    body[0].appendChild(block);
                }
                return JVN.execute();
            }
        }
        return false;
    },
    execute : function () {
        var infoURL;
        infoURL = Lecteur.url(location.href);
        switch (infoURL.type) {
        case "forum" :
            System.test(true, function () {
                Menu.apply(infoURL);
            });
            switch (infoURL.mode) {
            case "0" :
                System.test(true, function () {
                    Sujets.apply(infoURL);
                });
                if (infoURL.recherche != "4") {
                    System.test(true, function () {
                        Reponse.apply(infoURL);
                    });
                }
                break;
            case "1" :
                System.test(true, function () {
                    Messages.apply(infoURL);
                });
                break;
            case "3" :
                System.test(true, function () {
                    Messages.apply(infoURL);
                });
                System.test(true, function () {
                    Reponse.apply(infoURL);
                });
                break;
            }
            break;
        case "profil" :
            System.test(true, function () {
                Profil.apply(infoURL, Lecteur.optionsURL(infoURL.options));
            });
            break;
        default :
            return false;
        }
        Create.JVN.style("global");
        // System.alertMap(infoURL);
        return true;
    },
    finalize : function (text) {
        var body;
        body = Const.get("body");
        if (body.length > 0) {
            if (text) {
                body[0].appendChild(Create.text(text));
            }
            body[0].appendChild(Create.element("br"));
        }
    },
    version : "1.2.0"
};

if (JVN.initialize(document, "JVN_Block")) {
    JVN.finalize();
    JVN.finalize(navi.browser + " / " + navi.os + " : " + GM.version);
    JVN.finalize("JVN : time elapsed : " + (new Date() - begin_date_test));
    if (fatal.error) {
        JVN.finalize();
        JVN.finalize(fatal.error.join("\n<br/>"));
    }
}
