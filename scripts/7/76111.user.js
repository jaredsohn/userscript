// ==UserScript==
// @name           NewMenu by Doceluf
// @description    Quick map for margonem game
// @copyright      Łukasz Kowalski (Doceluf)
// @version        1
// @include        http://game*.margonem.pl/game.html
// @exclude        http://game8.margonem.pl/*
// ==/UserScript==

/*jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}*/

myFunction = function(npcId){
	mAlert("Jestem "+g.npc[npcId].nick+"<br />Mam "+g.npc[npcId].lvl+" poziom<br /><br />Podobało się?", 2, {0:function(){message("Super! "+g.npc[npcId].nick+" Cię lubi")}, 1:function(){message("Szkoda, "+g.npc[npcId].nick+" Cie nie lubi")}})
}

/*$(":regex(id,npc[0-9]*)").bind('click',function (h) {
	var f = this.id.substr(3);
	if (Math.abs(g.npc[f].x - hero.x) > 1 || Math.abs(g.npc[f].y - hero.y) > 1) {
		hero.mClick(h);
		return
	}
	var d = [];
	if (g.npc[f].type == 4) {
		return
	}
	if (g.npc[f].type == 0) {
		d[0] = ["Rozmawiaj", '_g("talk&id=' + f + '")']
	}
	if (g.npc[f].type == 2 || g.npc[f].type == 3) {
		d[0] = ["Atakuj", '_g("fight&a=attack&auto=1&id=-' + f + '")']
	}
	if (g.npc[f].type == 2 || g.npc[f].type == 3) {
		d[1] = ["Walcz turowo", '_g("fight&a=attack&id=-' + f + '")']
	}
	if (g.npc[f].type == 5) {
		d[0] = [(g.npc[f].wt == 1) ? "Uruchom" : "Obejrzyj", '_g("talk&id=' + f + '")']
	}
	d[2] = ["Kim jesteś?", 'myFunction("'+f+'")'];
	showMenu(g.npc[f].x * 32 + 16, g.npc[f].y * 32 + 8, d)
})*/
newNpc = function(e) {
    for (k in e) {
        if (isset(g.npc[k])) {
            $("#npc" + k).remove();
            if (isset(g.npc[k].x)) {
                delete g.npccol[g.npc[k].x + 256 * g.npc[k].y]
            }
            delete g.npc[k]
        }
        if (isset(e[k].del)) {
            continue
        }
        if (e[k].icon.charAt(0) != "/") {
            e[k].icon = "/" + e[k].icon
        }
        e[k].icon = g.opath + "npc" + e[k].icon;
        e[k].id = k;
        g.npc[k] = e[k];
        if (e[k].type != 4 || e[k].lvl) {
            var c = "<b>" + e[k].nick + "</b>";
            if (e[k].type != 4) {
                if (e[k].wt > 79) {
                    c += "<i>heros</i>"
                } else {
                    if (e[k].wt > 29) {
                        c += "<i>elita III</i>"
                    } else {
                        if (e[k].wt > 19) {
                            c += "<i>elita II</i>"
                        } else {
                            if (e[k].wt > 9) {
                                c += "<i>elita</i>"
                            }
                        }
                    }
                }
                var b = "";
                if (e[k].type == 2 || e[k].type == 3) {
                    var a = e[k].lvl - hero.lvl;
                    if (a < -13) {
                        b = 'style="color:#888"'
                    } else {
                        if (a > 19) {
                            b = 'style="color:#f50"'
                        } else {
                            if (a > 9) {
                                b = 'style="color:#ff0"'
                            }
                        }
                    }
                }
                c += "<span " + b + ">" + (e[k].lvl ? (e[k].lvl + " lvl") : "") + (e[k].grp ? ", grp" : "") + "</span>"
            }
            wtip = " ctip=t_npc tip='" + c + "'"
        } else {
            wtip = ""
        }
        $("#base").append("<div class=npc id=npc" + k + wtip + ">" + (e[k].qm ? "<img src='img/quest-mark.gif'>" : "") + "</div>");
        $("#npc" + k).css({
            left: e[k].x * 32,
            top: e[k].y * 32 - 16,
            zIndex: 10 + e[k].y + ((e[k].type == 4) ? parseInt(e[k].wt) : 0)
        }).click(function (h) {
            var f = this.id.substr(3);
            if (Math.abs(g.npc[f].x - hero.x) > 1 || Math.abs(g.npc[f].y - hero.y) > 1) {
                hero.mClick(h);
                return
            }
            var d = [];
            if (g.npc[f].type == 4) {
                return
            }
            if (g.npc[f].type == 0) {
                d[0] = ["Rozmawiaj", '_g("talk&id=' + f + '")']
            }
            if (g.npc[f].type == 2 || g.npc[f].type == 3) {
                d[0] = ["Atakuj", '_g("fight&a=attack&auto=1&id=-' + f + '")']
            }
            if (g.npc[f].type == 2 || g.npc[f].type == 3) {
                d[1] = ["Walcz turowo", '_g("fight&a=attack&id=-' + f + '")']
            }
            if (g.npc[f].type == 5) {
                d[0] = [(g.npc[f].wt == 1) ? "Uruchom" : "Obejrzyj", '_g("talk&id=' + f + '")']
            }
			d[2] = ["Kim jesteś?", 'myFunction("'+f+'")'];
            showMenu(g.npc[f].x * 32 + 16, g.npc[f].y * 32 + 8, d)
        }).mousedown(function (d) {
            return false
        });
        if (e[k].type != 4) {
            g.npccol[e[k].x + 256 * e[k].y] = true
        }
        g.npc[k].imgload = function () {
            $("#npc" + this.id).css({
                backgroundImage: "url(" + this.img.src + ")",
                left: this.x * 32 + 16 - Math.round(this.img.width / 2) + ((this.type > 3 && !(this.img.width % 64)) ? -16 : 0),
                top: this.y * 32 + 32 - this.img.height,
                width: this.img.width,
                height: this.img.height
            });
            delete this.img;
            if (isset(g.checklist["npc" + this.id])) {
                g.checklist["npc" + this.id](this)
            }
        };
        g.npc[k].img = new Image();
        $(g.npc[k].img).load($.proxy(g.npc[k], "imgload")).error(function () {
            log($(this).attr("src"), 2)
        }).attr({
            src: g.npc[k].icon
        })
    }
}