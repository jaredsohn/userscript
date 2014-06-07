// ==UserScript==
// @name           AutoClick for Fox Bux
// @namespace      http://ptcforme.blogspot.com
// @description    An Auto-click for Fox Bux, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css , js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*fox-bux.com/*
// @copyright      Blank
// ==/UserScript==

var RT = 5,
    CH = function (e) {
        var f = 8,
            by2wd = 4,
            bt2wd = 32,
            mb = 512,
            cb = 448,
            mbt = [1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535, 131071, 262143, 524287, 1048575, 2097151, 4194303, 8388607, 16777215, 33554431, 67108863, 134217727, 268435455, 536870911, 1073741823, 2147483647],
            mpw = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824],
            IND = function (n, a) {
                return (n - (n % a)) / a
            },
            D2H = function (n) {
                var b = 0xFFFFFFFF,
                    tmp = (n < 0 && n != -1 ? b - ((n * -1) - 1) : (n === -1 ? b : n)),
                    ot = "",
                    hx = function (a) {
                        switch (a) {
                        case 15:
                            return 'F';
                        case 14:
                            return 'E';
                        case 13:
                            return 'D';
                        case 12:
                            return 'C';
                        case 11:
                            return 'B';
                        case 10:
                            return 'A';
                        default:
                            return a.toString()
                        }
                    };
                while (tmp > 15) {
                    ot = hx(tmp % 16) + ot;
                    tmp = IND(tmp, 16)
                };
                ot = hx(tmp) + ot;
                return ot.toString()
            },
            K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2],
            LSh = function (v, a) {
                switch (a) {
                case 0:
                    return v;
                case 31:
                    return (v & 1 ? 0x80000000 : 0);
                default:
                    if (a >= 0 && a <= 31) return (v & mpw[31 - a]) ? ((v & mbt[31 - (a + 1)]) * mpw[a]) | 0x80000000 : ((v & mbt[31 - a]) * mpw[a])
                };
                return 0
            },
            RSh = function (v, a) {
                switch (a) {
                case 0:
                    return v;
                case 31:
                    return (v & 0x80000000 ? 1 : 0);
                default:
                    if (a >= 0 && a <= 31) {
                        var b = IND(v & 0x7FFFFFFE, mpw[a]);
                        return (v & 0x80000000 ? b | IND(0x40000000, mpw[a - 1]) : b)
                    }
                };
                return 0
            },
            AUn = function (a, b) {
                var c = a & 0x80000000,
                    lY8 = b & 0x80000000,
                    lX4 = a & 0x40000000,
                    lY4 = b & 0x40000000,
                    r = (a & 0x3FFFFFFF) + (b & 0x3FFFFFFF);
                if (lX4 & lY4) return r ^ 0x80000000 ^ c ^ lY8;
                else if (lX4 | lY4) return (r & 0x40000000 ? r ^ 0xC0000000 ^ c ^ lY8 : r ^ 0x40000000 ^ c ^ lY8);
                else return r ^ c ^ lY8
            },
            Ch = function (X, Y, z) {
                return (X & Y) ^ ((~X) & z)
            },
            Maj = function (X, Y, z) {
                return (X & Y) ^ (X & z) ^ (Y & z)
            },
            S = function (X, n) {
                return RSh(X, (n & mbt[4])) | LSh(X, (32 - (n & mbt[4])))
            },
            R = function (X, n) {
                return RSh(X, (n & mbt[4]))
            },
            Sg0 = function (X) {
                return S(X, 2) ^ S(X, 13) ^ S(X, 22)
            },
            Sg1 = function (X) {
                return S(X, 6) ^ S(X, 11) ^ S(X, 25)
            },
            Gm0 = function (X) {
                return S(X, 7) ^ S(X, 18) ^ R(X, 3)
            },
            Gm1 = function (X) {
                return S(X, 17) ^ S(X, 19) ^ R(X, 10)
            },
            C2a = function (a) {
                var b = String(a).length,
                    NWr = (IND((b + IND((mb - cb), f)), IND(mb, f)) + 1) * IND(mb, bt2wd),
                    WAr = Array(NWr - 1),
                    i, WCn, BPs, lByte, BCn = 0;
                for (i = 0; i < WAr.length; i++) WAr[i] = 0;
                while (BCn < b) {
                    WCn = IND(BCn, by2wd);
                    BPs = (3 - (BCn % by2wd)) * f;
                    lByte = a.charCodeAt(BCn);
                    WAr[WCn] = WAr[WCn] | LSh(lByte, BPs);
                    BCn++
                };
                WCn = IND(BCn, by2wd);
                BPs = (3 - (BCn % by2wd)) * f;
                WAr[WCn] = WAr[WCn] | LSh(0x80, BPs);
                WAr[NWr - 1] = LSh(b, 3);
                WAr[NWr - 2] = RSh(b, 29);
                return WAr
            },
            enc = function (c) {
                var d = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19],
                    M = C2a(c),
                    w = Array(63),
                    i, j, A, B, C, D, E, F, G, H, T1, T2, Rg = function (a, b) {
                        return a.substr(a.length - b, b)
                    };
                for (i = 0; i < w.length; i++) w[i] = 0;
                for (i = 0; i < M.length; i += 16) {
                    A = d[0];
                    B = d[1];
                    C = d[2];
                    D = d[3];
                    E = d[4];
                    F = d[5];
                    G = d[6];
                    H = d[7];
                    for (j = 0; j <= 63; j++) {
                        w[j] = (j < 16 ? M[j + i] : AUn(AUn(AUn(Gm1(w[j - 2]), w[j - 7]), Gm0(w[j - 15])), w[j - 16]));
                        T1 = AUn(AUn(AUn(AUn(H, Sg1(E)), Ch(E, F, G)), K[j]), w[j]);
                        T2 = AUn(Sg0(A), Maj(A, B, C));
                        H = G;
                        G = F;
                        F = E;
                        E = AUn(D, T1);
                        D = C;
                        C = B;
                        B = A;
                        A = AUn(T1, T2)
                    };
                    d[0] = AUn(A, d[0]);
                    d[1] = AUn(B, d[1]);
                    d[2] = AUn(C, d[2]);
                    d[3] = AUn(D, d[3]);
                    d[4] = AUn(E, d[4]);
                    d[5] = AUn(F, d[5]);
                    d[6] = AUn(G, d[6]);
                    d[7] = AUn(H, d[7])
                };
                A = Rg("00000000".toString() + D2H(d[0]), 8);
                B = Rg("00000000".toString() + D2H(d[1]), 8);
                C = Rg("00000000".toString() + D2H(d[2]), 8);
                D = Rg("00000000".toString() + D2H(d[3]), 8);
                E = Rg("00000000".toString() + D2H(d[4]), 8);
                F = Rg("00000000".toString() + D2H(d[5]), 8);
                G = Rg("00000000".toString() + D2H(d[6]), 8);
                H = Rg("00000000".toString() + D2H(d[7]), 8);
                return A + B + C + D + E + F + G + H
            };
        return enc(e)
    },
    force_to = "ahriman",
    rA = /(index\.php\?view=surfer&t=([a-zA-Z0-9]+))/,
    blacklist = {},
    PN = function (o, n) {
        var s, t = [],
            i = 0;
        for (; i < n; i++) t[i] = "parentNode";
        eval("s = o." + t.join("."));
        return s
    },
    IA = function (o) {
        var t;
        try {
            if (o.href) t = o.href.match(rA);
            else {
                t = o.onclick.toString().match(rA);
                o.href = t[1]
            }
        } catch (e) {};
        if (t && !blacklist[t[2]]) return function () {
            try {
                var p;
                if (CUl(/okeybux\.com/)) p = PN(o, 10);
                else if (CUl(/(vipclix|buxlover|clickers|evolutionbux|moneybux|buxism|zpaypal|idrclix|facebux|buxexcel)\.(net|com|ws)/)) {
                    p = PN(o, 9);
                    if (PN(p, 1).id.match(/admin_advertisement/)) return 1
                } else if (CUl(/(cosmicbux|spainptc|selwobux)\.(com)/)) {
                    p = PN(o, 4);
                    if (p.id.match(/admin_advertisement/)) return 1;
                    else if (PN(o, 5).id.match(/admin_advertisement/)) return 1
                } else p = PN(o, 3);
                return !p.className.match(/ad\-blocked/)
            } catch (e) {
                return false
            }
        }();
        return false
    },
    CUl = function (r) {
        return window.location.href.match(r) != null
    },
    BT = function (t) {
        return document.getElementsByTagName(t)
    },
    BN = function (n) {
        return document.getElementsByName(n)
    },
    login = function () {
        var a = BT('a'),
            i, r = false;
        for (i = 0; i < a.length; i++) {
            if (a[i].href == "javascript:void(0);" && a[i].innerHTML.match(/([Ll]og|[Ss]ign)\s*[oO](ut|ff)/)) r = true;
            else if (a[i].href.match(/index\.php\?view=account/)) r = true;
            else if (a[i].href.match(/index\.php\?view=ads/) && CUl(/(spainptc|selwobux)\.com/)) a[i].href = "index.php?view=adv"
        };
        return r
    }(),
    NT = function (t) {
        return document.createElement(t)
    },
    addLib = function () {
        var a = NT('script');
        a.language = 'javascript';
        a.src = "http://angramainyu.isgreat.org/js/ptcs.lib.js";
        document.body.appendChild(a)
    }(),
    EO = function (o, f) {
        document.getElementById(o).addEventListener('click', f, false)
    },
    SH = function (o) {
        return o;
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o
    },
    GF = function (r, t) {
        var m = t.match(r),
            s = t.search(r),
            o = [];
        while (m) {
            t = t.substr(s + m[0].length, t.length);
            o[o.length] = m[1];
            m = t.match(r);
            s = t.search(r)
        };
        return o
    },
    GI = function (t) {
        var o = GF(/src=["']imgverification\.php\?set=([0-9a-zA-Z]+)["']/, t);
        if (o.length) return o;
        o = GF(/[Vv][Aa][Ll][Uu][Ee]=["']crypt=([0-9a-zA-Z]+)["']/, t);
        if (o.length) return o;
        return false
    },
    GA = function (t) {
        var a = GF(/(<div\sid="divad[0-9]+">\s*<div\sclass="ad_content">\s*(<div[^>]+>\s*<img[^>]+>\s*<\/div>\s*)?<div[^>]+>\s*<a\shref="(index\.php\?view=surfer(&amp;|&)t=[a-z0-9]+)"[^>]+>[^<]+<\/a>\s*<div[^>]+>[^<]*<\/div>\s*<\/div>\s*<\/div>\s*<div\sclass="ad_footer">\s*<span>Earnings\s?:\s*(\$[0-9\.]+)\s*<\/span>\s*\|\s*<span>Time\s?:\s*([0-9]+)\s*seconds\s*<\/span>\s*\|\s*<span>Member\sClicks\s?:\s*[0-9]+\s*<\/span>\s*\|\s*<span>Outside\sClicks\s?:\s*[0-9]+\s*<\/span>\s*<\/div>\s*<\/div>)/, t),
            i;
        return a.length ? a.join("") : false
    },
    reqimg = ["modules.php?m=surfer&r84c1e4xwtg89g=current2132", "imgverification.php?show=current"],
    ansimg = ["modules.php?m=surfer&r879c2x16f4b=", "imgverification.php?set="],
    AS = false,
    secondway = false,
    wtime_disabled = false;
if ((CUl(/index\.php\?view=ad(s|v)/) && login)) {
    var UL = [],
        sums = {
            '5D65ABD0260D0C0D8E38D7B43EBCC4D1A8EF626E1B35D47F935DF661353F7EB7': '86123007AB04C20D1133711CD620E77A6792A9EC201B383FBF62E7995DC9FA83',
            '1B0A21AC840B8EB7EB5DBF9208EF1E578F1670B4482A739089EAD0B7BD455301': 'E27969D2077F4AD8CB72779601F56D49ED10AD72BF38CF121179440DAB35A482',
            '3578C037A72959DCF7C696891B7D19B6EEA76871BA4EAAF622AEBC6F6DF0DE4A': '914EFE038353292117437D82978AAAE72070D8E9E85F5B1AFE39DD30369B9307',
            '99C6763836670DA6C129DBECA1C61FB5A4784EAE320DA01DD888C035B8BEF3B4': '3E1E59AA278850F47DDE5F62A38515176AC76B3A55E4967247F1B277E663397C',
            'DF7BF11871A4321FD1C4CC9B4BA58945F36268F1D2401A864C492F347F9921A2': 'E2E9C94984EDFA5E1BEF125F1556B5E7CDB3EF518A807D87C4A0AB20E538A65C',
            '1F69659FAEAC38A0457E5FF2FB420EE4C0F6C3C654AB2922442F58DCE705C086': '5F6AD8FB79B53E65FB3F2E711CE170B1E1DA1CED202395BBE48BD3851D85C750',
            '015E2F75C6F250BD9CF5234724E087172C458FE2AA55507A224B956D7E4A6A56': 'A57D4AD90D2DCBCC200AE889F5034475D95E29D3F660731D06AAD1260222B2BB',
            '3AE321EB0100D5A7E45205C775F03DFEEC53C67D5C35B321BC3709BE0AD123D7': '6FA1982094A761550B8FE169E60C6A46F895EB35126AEFC46E6175CD40046D03',
            'C235D15E203666AF991B9293B19E758C6B54B78A430E6DB37F657B997BAF328B': 'B039016AD4FA45601F1D16A81055AAB49AD37185A2A05DB4C7B3B2575E9216B3',
            'B8BAB7976CC634AA768BBDEFCD20E01CB13162355EA1E8F1E94335416CC55726': 'D7F680E23B5E222304E812938431D67060E07256EF6114D8B5D7C12846C98214',
            '04569003B90745F58B3FD782034569DF44B24DF642A4F1DEF767A14D495533CA': '8BB8FD0C3E93287B574E697FBB2D3D3DD5715AE1D1C6762DB9851B813C3F108E',
            'B40AB1258C7536557DF4E01B85F456C13FE9B337AB2DF52141423542CA6A392D': '8FA43AE14B09FD4CC9E466E0572988F31D1251E7F87999A19F624543B4A694BC',
            'CFEEBEDC44F9973263C3E2BE8BE268C0B2153C259BCC3F871ECA06D5EB4A18FD': 'D830A1800BE55FD212CEEC1FB836ABD486669D2390EED1E82092CE9366CF2067',
            '4D30150C7ACEFD006651AB2D585C4D36C18046335DAB91093E591534CDA1EC69': 'F715DE590676768A4CC47EF55A8BF391A55DBE3618C572D4F8FD8C106177382E',
            '16BBF2363D3027802C5D85BD2FD5B068D9788344465834BA975E2162B795E0F5': '19E7F348BB0E4D401772C56ED7BD0B39EBA1B589946F69D34D97FC68BA65A375',
            '184D82DFB8789CF38545ED05412FE981B4FD31948BBEB77B39FA32E17DAC7DC0': '4343CCF114472C5E94584526FF3A1E717EA87B494DDFE09F6416853971EACA42',
            '2E05CCFA802423C34A4D4FF578CE0A8721BFFB39FE36EDDAD811A23456B3BE45': '7FF622FB186E075FEC1192B6137E0A43C82DB002DC1485065BBBF55F06DA5A70',
            '8351A85FCA231DA06A498FD4E47049FBE0876E9FACD97FF15512107F6CC3A3F9': '0549DEA8A9B9C1080E5CDA5DFC742891872C462D2338CD747EE699B5ADF2BC0C',
            '113C0AF8A4C254210411737EBDF5C7A39FDCDB0D4D0EB0848C8FF593112F0840': '91658D7E227445AC9FCB53F09B25EBCF5DBC7C54C3A908F30464CFB7F1E33FF6',
            '16A0CD67C72232EEFB83E5AF5F7F9AAD1D8DFAD242FDD76CD897B35570ED0FFA': 'FAF87F52EE5A272F0CC2ACD5F02032B23BCF6028ECE3D599EF3198C06A5E6D62',
            '94274BA902523CBAF9C49F05D7CF1E3989BE29F103BCC5468362E94CDE22B830': 'ADAA01B40AB809FFDEEDB2F78A5EDD59827F47ADAA1612817CA511C92DC16DBF',
            'BD206C9FEFF1F92358F6176399DE6EA16C1D3655ED35EC91237D133FCC49B2FC': '1533DBFC4EBD92932E1F09E1AF5958E1C098223B5C7EB7CEEB3ECDA6D6F0B8C9',
            'F29111D6A7429C6A0B20E6F5B09FACD97E50C94190D14F9C0226CCDEE1F3EDD8': 'A3709964D84BCC559E7FE2C4F994387074F8F956ABE0D5A3880048DBBCA6A5FC',
            'F4667DAB5FA4E982EBECE542BF186B2CF6E72B0ACC2EEF96665EA88A29716495': '5C21C5948E31DCB132914DC5C7551AFE9392D6A63D6A9E8A7AF5EF08972BDE03',
            'D95481F6C2CB84C0A06A610DE072D92EE95B8C3E831F22CE690D0E16F8DAEB4F': '9EC82DFFB701000F15688F8107B76FFC32FC0BC8C4DAA35422DC803AF217545E',
            '5F1C6532CB8363FB2CD4E47F951D3920B766CDC5BA720A26C984EEF98E5F3678': '2F3BB05C985C31BBA5FC817CA0795139EB3C2407F2CE26B6046F84D349F0C75B',
            'DB07651B2ABB15FE2FF2AA5B28B4D10EA63E6064D3FC3EECE4944BC0A6DCCE63': 'CB46B8B54A80C8162F6E66BA49994CC27EBE8D277670861D9B973A25DEEC8DDE',
            '10980192194217FBD1224E9522A38C588A2A96990F29D1F66490AA6FA8537C88': '8BF7272630652BE76680BE06AF43EE9C4EEC3024A64F536D829CBD380E0651A6',
            '93351918ECF20C7FD592E28CF056E91988947F0EE3F9D984CF91285B4817AC56': '0C1B06AB8F24997DBF8B4B25A25F3D044CBA8DD8AB7F8DDF14CBFE4B56B456C3',
            '66D737C3B5614E8CA77360B3DFBB8C8ECFBC31AAB1972C46F9ABA7862443C4EA': '3B9A87AC8662F5CFA0A343B94B1C13191380D123A2949AB0F56DEF42614482D5',
            'DAFF6BC1978478DF9C52A98F6D74FFE36C7D71861724CA0C27321F30BD31C49B': '8D0E8F593A893DD8DFAC1F33E9FDDE1AA4992544F6B0BA71F2C71BC6A7006CD7',
            '9EFEBB90A48AD08BD120C62B959FDF07EA8968021AA2BBF21E3E7F122C979540': 'C48EBA9FB1837B23ED586C842E09F979306087375D8FDD78955FCC0BD30EA4D3',
            '688A7F918F5C98F9ABFC2CB12AD5B29C5B56BD7D2BA6A6198CBD9A155297139A': 'A012EC8DC56DF72F18E9C4F9F29FC54B18EC6FEA7E0A5D701646D479F740B22B',
            '1B6378D29642B57DC29091301A866B511DA28E6DAF03A622C9893CEEF5B35615': '3B5AB6566654D2A71EAF70B09D130ADC36CF44E333501175CA3C693BDFDA09B8',
            '1134E2327CFCB6393EF0BF171205D2365BB0A07315244F1C4FB8621DAC178ECC': 'AE99D863D41109A616CB07A18A485A58B4738FA24AC8A67B09D83C01560A02C1',
            '296CEBE9161CC797CB57356E2B0624431C1B7E5E64F991D734C85EBA4CFF5790': '5B0BEC9A0A6E1249AFB7B4F369BEECF72899143F3D69F879B796F8A0D783AF7D',
            '8871664FBD13467B09C2690C03782C11DE154DB895C7C50D5C5042CEADBB5281': '51C6525B97750FA15D894184B7708B0A6415B5D844C835DBE3DBC84F050783B3',
            '207F8FB7D4949C7F99D64EF3D5660AD48A5335DD0AD633F062A5ECD1A66F9DFC': '6AC859B0BE7E7A07A3DA264C0F0BA6619CF2BC8DF5FD6806473DCB0506F567C4',
            'CC99BFB49F18347317F7A3735725C19EC9FDDC2A19A7F0908763B4ACC0B8564F': '9791A915710B09ABEF9700884B2689D448D25EBEAB55791A79FD2C064A862D31',
            'FA5791606C88BDB272B16A3F69C9FCD1D7C7FA359F394774185446FA34E05BAF': '0604F1404D85C0D15A20A485A33FE6421A8083518DED2271464829E290311FCA',
            '2D3C10E47036D3C014CCD71FFF155103A8D81B01ED56F1205E32FCF32A6284E8': '86123007AB04C20D1133711CD620E77A6792A9EC201B383FBF62E7995DC9FA83',
            'AC1BB9AF474928644EBE33E6F959708460E3C0D0F615D9CF842E67DC58F283E4': 'E27969D2077F4AD8CB72779601F56D49ED10AD72BF38CF121179440DAB35A482',
            '0F72458B08438B5C7BD8E7D22A99267EC72576ACDE9A1DAB9CC122AE0CD86DAF': '914EFE038353292117437D82978AAAE72070D8E9E85F5B1AFE39DD30369B9307',
            '003154D465B85421751E1D78C2113904AC66D07991D3A3E5360F2374ACC8850E': '3E1E59AA278850F47DDE5F62A38515176AC76B3A55E4967247F1B277E663397C',
            '595A1A5A274393613815A193170AC94E98F3B30EA20E9F13B5BD6592514B1057': 'E2E9C94984EDFA5E1BEF125F1556B5E7CDB3EF518A807D87C4A0AB20E538A65C',
            'D7D07BF68F33EEC82709551ED52B7AFE85D4FFA56F6F64A4E5C63A74C1EB7EAF': '5F6AD8FB79B53E65FB3F2E711CE170B1E1DA1CED202395BBE48BD3851D85C750',
            'B12C5161C7CB569F2F0793E8EE10C68B797154D4E8A9D3E9D686795564575F9D': 'A57D4AD90D2DCBCC200AE889F5034475D95E29D3F660731D06AAD1260222B2BB',
            '7F6B47BE1841DA8FA8DA50109228A468A53B0DB5C66D7FF0B949E2465D29C399': '6FA1982094A761550B8FE169E60C6A46F895EB35126AEFC46E6175CD40046D03',
            '7E095160650F3BF1F6A9C082F68B618B07B6C24F25C238131CD11CD1235AB632': 'B039016AD4FA45601F1D16A81055AAB49AD37185A2A05DB4C7B3B2575E9216B3',
            'B5DDB1F577265BBF0C7DB6BACC33162DEB1BE4AAFA6371A937B7DC77207A2367': 'D7F680E23B5E222304E812938431D67060E07256EF6114D8B5D7C12846C98214'
        },
        current = 0,
        table = function () {
            var d = BT('div'),
                x;
            for (j = 0; j < d.length; j++) {
                switch (d[j].className) {
                case "info_box":
                case "advice":
                    return d[j];
                    break;
                case "title":
                    if (d[j].innerHTML.match(/View Advertisements/)) x = d[j];
                    else if (d[j].innerHTML == "") x = d[j]
                }
            };
            return x
        },
        a = BT('a'),
        robot = NT('div'),
        i, T, msg, tmr, fatalerror = function (t) {
            setStatus(UL[current], t);
            alert(t)
        },
        setStatus = function (o, t) {
            o.innerHTML = t
        },
        curidx = 0;
    load = function () {
        clearInterval(T);
        T = null;
        if (!UL[current]) {
            if (typeof AS == 'function') AS();
            return
        };
        var d = new XMLHttpRequest();
        d.onreadystatechange = function () {
            try {
                if (d.readyState == 4) {
                    if (d.status == 200) {
                        var j = d.responseText.match(/var\s*secs=([0-9]+)/)[1],
                            dt = {},
                            validate = function (a, b) {
                                var c = new XMLHttpRequest(),
                                    data = "action=validate&t=" + encodeURIComponent(a) + "&masterkey=" + encodeURIComponent(b);
                                c.onreadystatechange = function () {
                                    try {
                                        if (c.readyState == 4) {
                                            if (c.status == 200) {
                                                if (c.responseText.match(/[Ii]nvalid\s*[Tt]oken/)) {
                                                    blacklist[a];
                                                    msg.innerHTML = "Got Uncredited ads, opening next ads...";
                                                    setStatus(UL[current], "BLACKLISTED")
                                                } else if (c.responseText.match(/ok/)) {
                                                    msg.innerHTML = "Ads validated, opening next ads...";
                                                    setStatus(UL[current], "VALIDATED")
                                                } else {
                                                    if (confirm("Server response: " + c.responseText + "\n\nContinue ?")) {
                                                        msg.innerHTML = "ERROR, opening next ads...";
                                                        setStatus(UL[current], "ERROR")
                                                    } else {
                                                        msg.innerHTML = "Stopped";
                                                        return
                                                    }
                                                };
                                                current++;
                                                T = setInterval(load, 1000)
                                            } else {
                                                msg.innerHTML = "Connection error, retrying...";
                                                validate(a, b)
                                            }
                                        }
                                    } catch (e) {
                                        msg.innerHTML = "Validation error, retrying...";
                                        validate(a, b)
                                    }
                                };
                                c.open("POST", "index.php?view=surfer&", true);
                                c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                c.setRequestHeader("Content-length", data.length);
                                c.setRequestHeader("Connection", "close");
                                c.send(data)
                            };
                        tmr = setInterval(function () {
                            if (j < 0) {
                                dt = d.responseText.match(/var\s+adtk\s*=\s*["']([a-zA-Z0-9]+)["']/);
                                clearInterval(tmr);
                                tmr = null;
                                if (dt) {
                                    var c = dt[1],
                                        req, imgs, curimg = 0,
                                        imgcodes = [],
                                        ansl, reql, imgans = [],
                                        findimg = function () {
                                            if (!imgs[curimg]) {
                                                if (ansl) validate(c, ansl);
                                                else {
                                                    fatalerror("Unable to compare requested image, please send me feedback with these codes below.\n\nRequested image code : " + req + "\nAnswers codes : \n" + imgcodes.join("\n"))
                                                }
                                                return
                                            };
                                            if (imgs[curimg].match(/current/)) {
                                                curimg++;
                                                findimg();
                                                return
                                            };
                                            var b = new XMLHttpRequest();
                                            b.onreadystatechange = function () {
                                                if (b.readyState == 4) {
                                                    if (b.status == 200) {
                                                        var a = CH(b.responseText);
                                                        imgcodes[imgcodes.length] = a;
                                                        if (sums[req] == a) {
                                                            msg.innerHTML = "Equal image found, validating...";
                                                            validate(c, imgs[curimg])
                                                        } else if (secondway && req == a) {
                                                            msg.innerHTML = "Equal image found, validating...";
                                                            validate(c, imgs[curimg])
                                                        } else if (secondway && reql == String(b.responseText)) {
                                                            ansl = imgs[curimg]
                                                        } else {
                                                            msg.innerHTML = "Not equal, retrying...";
                                                            curimg++;
                                                            findimg();
                                                            return
                                                        }
                                                    } else {
                                                        msg.innerHTML = "Loading error, retrying...";
                                                        findimg();
                                                        return
                                                    }
                                                }
                                            };
                                            b.open("GET", ansimg[curidx] + imgs[curimg], true);
                                            b.send(null)
                                        },
                                        loadimg = function () {
                                            var a = new XMLHttpRequest();
                                            a.onreadystatechange = function () {
                                                if (a.readyState == 4) {
                                                    if (a.status == 200) {
                                                        if (a.responseText == "") {
                                                            curidx++;
                                                            if (curidx >= reqimg.length) fatalerror("Unable to use alternate trick to bypass image, please send me feedback about this");
                                                            else {
                                                                msg.innerHTML = "Trying to use old validation way...";
                                                                loadimg()
                                                            }
                                                        } else {
                                                            msg.innerHTML = "Requested image loaded, comparing...";
                                                            reql = String(a.responseText);
                                                            req = CH(a.responseText);
                                                            if (!sums[req]) {
                                                                secondway = true;
                                                                msg.innerHTML = "Unable to compare image, trying using second way..."
                                                            };
                                                            findimg()
                                                        }
                                                    } else {
                                                        msg.innerHTML = "Loading error, retrying...";
                                                        loadimg()
                                                    }
                                                }
                                            };
                                            msg.innerHTML = "Loading requested image...";
                                            a.open("GET", reqimg[curidx], true);
                                            a.send(null)
                                        };
                                    msg.innerHTML = "Finding captcha images...";
                                    imgs = GI(d.responseText);
                                    if (imgs) loadimg();
                                    else fatalerror("Unable to find captcha images, please send me feedback")
                                } else {
                                    setStatus(UL[current], "ERROR, please send me your feed back");
                                    msg.innerHTML = "Error, opening next ads...";
                                    current++;
                                    T = setInterval(load, 1000)
                                };
                                return
                            };
                            msg.innerHTML = "Ads loaded, waiting for " + j + " seconds...";
                            j--
                        }, 1000)
                    } else {
                        msg.innerHTML = "Loading error, retrying...";
                        T = setInterval(load, 1000)
                    }
                }
            } catch (e) {
                msg.innerHTML = "Loading error, retrying...";
                T = setInterval(load, 1000)
            }
        };
        msg.innerHTML = "Loading ads <b id='AutoClicker-current'>\"" + UL[current].innerHTML + "\"</b>...<br /><div id='AutoClicker-loading'></div>";
        d.open("GET", UL[current].href, true);
        d.send(null)
    }, html = "<style>", r, ul = [], getall = function () {
        a = BT('*');
        for (i = a.length - 1; i >= 0; i--) {
            switch (IA(a[i])) {
            case true:
                ul[ul.length] = a[i];
                break;
            case 1:
                UL[UL.length] = a[i]
            }
        };
        if (UL.length || ul.length) {
            UL = SH(UL);
            ul = SH(ul);
            for (i = 0; i < ul.length; i++) UL[UL.length] = ul[i]
        };
        html += "#AutoClicker-container a,div,b{font-family:arial;color:black;font-weight:bold;text-decoration:none}";
        html += "#AutoClicker-container{display:block}";
        html += "#AutoClicker,#AutoClicker-title,#AutoClicker-container a.button{-moz-border-radius:3px;-webkit-border-radius:3px;-khtml-border-radius:3px;border-radius:3px;border: 1px solid #888}";
        html += "#AutoClicker-container a.buttons{padding:10px;color:#000;background:#ccc;float:none}";
        html += "#AutoClicker-container a.buttons:hover{color:#fff;background:#333}";
        html += "#AutoClicker{padding:2px;display:block;background:#fff;text-align:left}";
        html += "#AutoClicker-title{display:block;padding:5px;background:#666;color:#fff}";
        html += "#AutoClicker-msg{line-height:2em}";
        html += "</style>";
        html += "<div id='AutoClicker'><div id='AutoClicker-title'>AutoClicker - Updated at September 30th 2010</div><br /><div id='AutoClicker-msg' align=center>";
        html += "<b style='font-size:20px'>Warning</b><br />This program is for educational purposes only. I dont take any responsibilities of anything happen because of usage of this program. And please remember, USE YOUR OWN RISK.<br />By using this program, you're totally agreeing with this terms.<br><a href='http://ilix.in/bKy8W' target='_blank'>&copy; Anyone</a>";
        html += "</div><br />";
        html += "<center>" + (UL.length ? "<a href='javascript:;' class='buttons' id='adsclick'>Click All Ads (" + UL.length + ")</a>" : "<a href='javascript:;' class='buttons'>No ads</a>") + "&nbsp;|&nbsp;<a href='javascript:;' class='buttons' id='silversurfer'>Auto Surf</a>&nbsp;|&nbsp;<a href='javascript:;' class='buttons' id='whatsnew'>What's new</a>&nbsp;|&nbsp;<a href='http://ilix.in/bKy8W' class='buttons' target='_blank'>Homepage</a><br /><br /><a href='http://ilix.in/bKy8W' class='buttons' target='_blank'>AutoClickers</a></center><br />";
        html += "</div></div><p>&nbsp;</p>";
        robot.innerHTML = html;
        table = table();
        table.parentNode.insertBefore(robot, table);
        msg = document.getElementById("AutoClicker-msg");
        if (UL.length) {
            EO("adsclick", function () {
                AS = function () {
                    msg.innerHTML = "Done !";
                    alert(msg.innerHTML)
                };
                this.parentNode.style.display = 'none';
                T = setInterval(load, 1000)
            })
        };
        EO('whatsnew', function () {
            var a = "* Advanced auto click & validator\n";
            a += "* Random Clicking\n";
            a += "* Auto surf disabled\n";
            a += "* Bug Fix\n";
            a += "* 8th Release";
            alert(a)
        });
        EO("silversurfer", function () {
            alert("Autosurf disabled, sorry man ;) use click all ads instead");
            return
        })
    };
    if (CUl(/index\.php\?view=adv/)) {
        var pg = BT('body')[0],
            loadpg = function () {
                aj = new XMLHttpRequest();
                aj.onreadystatechange = function () {
                    if (aj.readyState == 4) {
                        if (aj.status == 200) {
                            pg.innerHTML = aj.responseText;
                            getall()
                        } else {
                            pg.innerHTML = "Error loading view ads page, retrying...";
                            loadpg();
                            return
                        }
                    }
                };
                aj.open("GET", "index.php?view=ads", true);
                aj.send(null);
                pg.style.height = "100%";
                pg.innerHTML = "<table width=100% height=100% border=0><tr><td align=center style='padding:20px'><b style='background:white;padding:10px'>Loading view ads page, please wait...</b></td></tr></table>"
            };
        loadpg()
    } else getall()
} else if (CUl(/index\.php\?view=register/)) {
    var r = BN('referrer')[0],
        ref, ajax;
    if (r && force_to) {
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {};
        ajax.open("GET", "/?ref=" + force_to, true);
        ajax.send(null);
        ref = NT('input');
        ref.type = "hidden";
        ref.name = "referrer";
        ref.value = force_to;
        r.form.insertBefore(ref, r.form.firstChild);
        r.name = "reff"
    }
} else if (CUl(/\?view=surfer\&t=[a-zA-Z0-9]+/)) {
    var ifm = BT('iframe'),
        i, em = BT('embed'),
        tmp;
    for (i = 0; i < ifm.length; i++) ifm[i].src = 'about:blank'
};
var bot = document.getElementById("autoclicker");
if (bot) bot.parentNode.removeChild(bot)