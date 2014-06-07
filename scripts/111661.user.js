// ==UserScript==
// @name           BvS Crank Helper
// @include        http://*animecubed.com/billy/bvs/pages/main.html
// @include        http://*animecubed.com/billy/bvs/themesdifficulty.html
// @namespace      North
// @description    Displays average success chances for selected Crank level.
// @version        1.0
// @history        1.0 Initial Release
// ==/UserScript==

function CrankHelper(){
    var name = document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
    var tbody;

    var addStyle = function(css) {
        var head = document.getElementsByTagName("head")[0];
        if (!head)
            return;
        var style = document.createElement("style");
        style.type = "text/css";
        style.textContent = css;
        head.appendChild(style);
    }

    var binomialCoefficient = function(n, k){
        if (k > n || k < 0)
            return 0;
        k = Math.max(k, n - k);
        var i = 1;
        var j = k + 1;
        var c = 1;
        while (j <= n)
            c *= j++ / i++;
        return c;
    }

    var binomdist = function(k, n, p, cumulative){
        if (cumulative) {
            var sum = 0;
            for (var i = 0; i <= k; i++)
                sum += binomdist(i, n, p, false);
            return sum;
        }
        return binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }

    var successChance = function(lvl, str, rng, suc, dif, sucx){
        var req = sucx - suc;
        if (req <= 0)
            return 1;
        if (dif > rng)
            return 0;
        if (req > lvl)
            return 0;

        var prob = (str + rng - dif + 1) / rng;
        if (prob >= 1)
            return 1;

        return Math.min(0.9999, 1 - binomdist(req - 1, lvl, prob, true));
    }

    var strip = function(s){
        s = s.replace(/^\s+/, "");
        s = s.replace(/\s+$/, "");
        s = s.replace(/\s+/g, " ");
        return s;
    }

    var percent = function(n){
        if (n == 1.0)
            return "100%";
        else if (n == 0.0)
            return "0%";
        var p = Math.round(n * 1000) / 10;
        if (p > 99.9)
            return ">99.9%";
        else if (p < 0.1)
            return "<0.1%";
        return p + "%";
    }

    var mainStats = function(){
        var snap = document.evaluate("//td[contains(text(),'jutsu:')]", document, null, 7, null);
        var stats = [];
        for (var i = 0; i < snap.snapshotLength; i++) {
            var node = snap.snapshotItem(i);
            var stat = node.childNodes[0].textContent;
            stat = stat.slice(0, stat.length - 2);
            var lvl, str, rng, suc;
            node = strip(node.childNodes[1].textContent).match(/(\d+)( \(([+-]\d+)\))?(Strength:([+-]\d+))? Range: 1-(\d+)(Free Successes: (\d+))?/);
            if (node){
                lvl = parseInt(node[1]) || 0;
                lvl += parseInt(node[3]) || 0;
                str = parseInt(node[5]) || 0;
                rng = parseInt(node[6]) || 0;
                suc = parseInt(node[8]) || 0;
            }

            stats[i] = [stat, lvl, str, rng, suc].join(',');
        }

        localStorage.setItem("BvS_CrankHelper_" + name, stats.join(';'));
    }

    var singleDiff = function(type, stats, crank, dif, suc){
        dif += crank;
        suc += crank;
        var stat = stats["Taijutsu"];
        var taic = successChance(stat[0], stat[1], stat[2], stat[3], dif, suc);
        stat = stats["Ninjutsu"];
        var ninc = successChance(stat[0], stat[1], stat[2], stat[3], dif, suc);
        stat = stats["Genjutsu"];
        var genc = successChance(stat[0], stat[1], stat[2], stat[3], dif, suc);

        var tr = '<tr><td colspan="7"/></tr>';
        tr += '<tr><td>' + type + '</td><td colspan="2" class="genc">' + percent(genc) + '</td><td colspan="2" class="ninc">' + percent(ninc) + '</td><td colspan="2" class="taic">' + percent(taic) + '</td></tr>';
        tbody.innerHTML += tr;
    }

    var doubleDiff = function(type, stats, crank, dif1, suc1, dif2, suc2){
        dif1 += crank;
        dif2 += crank;
        suc1 += crank;
        suc2 += crank;
        var stat = stats["Taijutsu"];
        var taic1 = successChance(stat[0], stat[1], stat[2], stat[3], dif1, suc1);
        var taic2 = successChance(stat[0], stat[1], stat[2], stat[3], dif2, suc2);
        stat = stats["Ninjutsu"];
        var ninc1 = successChance(stat[0], stat[1], stat[2], stat[3], dif1, suc1);
        var ninc2 = successChance(stat[0], stat[1], stat[2], stat[3], dif2, suc2);
        stat = stats["Genjutsu"];
        var genc1 = successChance(stat[0], stat[1], stat[2], stat[3], dif1, suc1);
        var genc2 = successChance(stat[0], stat[1], stat[2], stat[3], dif2, suc2);

        var tr = '<tr><td colspan="7"/></tr>';
        tr += '<tr><td rowspan="2">' + type + '</td><td colspan="2" class="genc">' + percent(genc1) + '</td><td colspan="2" class="ninc">' + percent(ninc1) + '</td><td colspan="2" class="taic">' + percent(taic1) + '</td></tr>';
        tr += '<tr><td class="ninc">' + percent(ninc2) + '</td><td class="taic">' + percent(taic2) + '</td><td class="genc">' + percent(genc2) + '</td><td class="taic">' + percent(taic2) + '</td><td class="genc">' + percent(genc2) + '</td><td class="ninc">' + percent(ninc2) + '</td></tr>';
        tbody.innerHTML += tr;
    }
	
    var douSimple = function(type, stats, crank, dif, suc){
        dif += crank;
        suc += crank;
        var stat = stats["Doujutsu"];
        var douc = successChance(stat[0], stat[1], stat[2], stat[3], dif, suc);
        var tr = '<tr><td colspan="7"/></tr>';
        tr +=  '<tr><td>' + type + '</td><td colspan="6" class="douc">' + percent(douc) + '</td></tr>';
        tbody.innerHTML += tr;
    }
	
    var douDouble = function(type, stats, crank, difd, sucd, difg, sucg, difn, sucn, dift, suct){
        difd += crank;
        difg += crank;
        difn += crank;
        dift += crank;
        sucd += crank;
        sucg += crank;
        sucn += crank;
        suct += crank;
        var stat = stats["Doujutsu"];
        var douc = successChance(stat[0], stat[1], stat[2], stat[3], difd, sucd);
        stat = stats["Taijutsu"];
        var taic = successChance(stat[0], stat[1], stat[2], stat[3], dift, suct);
        stat = stats["Ninjutsu"];
        var ninc = successChance(stat[0], stat[1], stat[2], stat[3], difn, sucn);
        stat = stats["Genjutsu"];
        var genc = successChance(stat[0], stat[1], stat[2], stat[3], difg, sucg);
        
        var tr = '<tr><td colspan="7"/></tr>';
        tr +=  '<tr><td rowspan="2">' + type + '</td><td colspan="6" class="douc">' + percent(douc) + '</td></tr>';
        tr += '<tr><td colspan="2" class="genc">' + percent(genc) + '</td><td colspan="2" class="ninc">' + percent(ninc) + '</td><td colspan="2" class="taic">' + percent(taic) + '</td></tr>';
        tbody.innerHTML += tr;
    }

    var douOther = function(type, stats, crank, difd1, sucd1, dif1, suc1, difd2, sucd2, dif2, suc2){
        difd1 += crank;
        difd2 += crank;
        dif1 += crank;
        dif2 += crank;
        sucd1 += crank;
        sucd2 += crank;
        suc1 += crank;
        suc2 += crank;
        var stat = stats["Doujutsu"];
        var douc1 = successChance(stat[0], stat[1], stat[2], stat[3], difd1, sucd1);
        var douc2 = successChance(stat[0], stat[1], stat[2], stat[3], difd2, sucd2);
        stat = stats["Taijutsu"];
        var taic1 = successChance(stat[0], stat[1], stat[2], stat[3], dif1, suc1);
        var taic2 = successChance(stat[0], stat[1], stat[2], stat[3], dif2, suc2);
        stat = stats["Ninjutsu"];
        var ninc = successChance(stat[0], stat[1], stat[2], stat[3], dif2, suc2);
        stat = stats["Genjutsu"];
        var genc = successChance(stat[0], stat[1], stat[2], stat[3], dif1, suc1);

        var tr = '<tr><td colspan="7"/></tr>';
        tr +=  '<tr><td rowspan="5">' + type + '</td><td colspan="6" class="douc">' + percent(douc1) + '</td></tr>';
        tr += '<tr><td colspan="2" class="genc">' + percent(genc) + '</td><td colspan="2" class="ninc"> - </td><td colspan="2" class="taic">' + percent(taic1) + '</td></tr>';
        tr += '<tr><td colspan="6"/></tr>';
        tr +=  '<tr><td colspan="6" class="douc">' + percent(douc2) + '</td></tr>';
        tr += '<tr><td colspan="2" class="genc"> - </td><td colspan="2" class="ninc">' + percent(ninc) + '</td><td colspan="2" class="taic">' + percent(taic2) + '</td></tr>';
        tbody.innerHTML += tr;
    }

    var themesDifficulty = function(){
        var crank = parseInt(document.getElementsByName("cranknumber")[0].value);
        var stats = [];
        var temp = localStorage.getItem("BvS_CrankHelper_" + name).split(';');
        
        for(var i = 0; i<temp.length; i++){
            var temp2 = temp[i].split(',');
            stats[temp2[0]] = [temp2[1] * 1, temp2[2] * 1, temp2[3] * 1, temp2[4] * 1];
        }
        tbody.innerHTML = '<tr><th class="hh">Mission Type</th><th colspan="2" class="genh">Gen</th><th colspan="2" class="ninh">Nin</th><th colspan="2" class="taih">Tai</th></tr>';
        singleDiff("D-Rank", stats, crank, 7, 1);
        singleDiff("C-Rank", stats, crank, 8, 3);
        doubleDiff("B-Rank", stats, crank, 10, 8, 9, 7);
        doubleDiff("A-Rank", stats, crank, 13, 9, 5, 11);
        doubleDiff("AA-Rank", stats, crank, 18, 12, 15, 16);
        doubleDiff("S-Rank", stats, crank, 22, 13, 18, 14);
        doubleDiff("Monochrome", stats, crank, 20, 17, 18, 18);
        singleDiff("R00t AA-Rank", stats, crank, 25, 25);
        douSimple("BurgerNinja", stats, crank, 4, 5);
        douOther("PizzaWitch", stats, crank, 16, 23, 28, 26, 17, 29, 25, 25);
        douDouble("PizzaWitch-High", stats, crank, 25, 27, 30, 40, 40, 35, 30, 40);
        douDouble("Witching Hours", stats, crank, 26, 30, 30, 25, 30, 23, 23, 30);

    }
    return{
        init:function(){
            if(/main\.html/.test(location.pathname)){
                mainStats();
            }
            if(/themesdifficulty\.html/.test(location.pathname)){
                addStyle([
                    ".crankHelperTable { border-collapse: collapse; border: 2px solid black; margin: auto; text-align: center; }",
                    ".crankHelperTable tr th { padding: 0.2em; border: 1px solid #888;}",
                    ".crankHelperTable tr { background-color: #F4F9FE; }",
                    ".crankHelperTable tr td { border: 1px solid #888; padding: 2px; }",
                    ".taic { background-color: #071E4A; color: white;}",
                    ".ninc { background-color: #4A0707; color: white;}",
                    ".genc { background-color: #124A07; color: white;}",
                    ".douc { background-color: #4A4A07; color: white;}",
                    ".hh { background: #D4DEEF url(data:image/gif;base64,R0lGODlhAQAUAMQAAPT3+9Te79rj8eju9vn6/d/m8+Ho9Pf5/Ovv9/H1+uXr9dXf79fh8P3+/vz8/u7y+dzk8v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABQAAAUQYCQ2DnEAyYMMilFAArMEIQA7) top center repeat-x; }",
                    ".douh { color: white; background: #4A4A07 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALklEQVR42gXBQQoAIAhFQX3Q/U8ZhvDFTbuiZuy9wd5ON1SB5ETAnM5aRuZFOh+K0BSu6v8ibAAAAABJRU5ErkJggg==) repeat-x left top;}",
                    ".taih { color: white; background: #071E4A url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR42gXBiQoAEBBAQfvKj/tXkXKkHFvEjLHuIWNAbVAL0jPMgKjHaOSuxNn5A21aFILfIZVwAAAAAElFTkSuQmCC) repeat-x left top;}",
                    ".ninh { color: white; background: #4A0707 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAALUlEQVR42gXBQQoAIAhFQf8D73/KKAKjTTslZ+y78yQucICQmMCQWGbsKiKzAdgHDWs7Xvp7AAAAAElFTkSuQmCC) repeat-x left top;}",
                    ".genh { color: white; background: #124A07 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR42gXBQQ4AEAwAwXYT7/H/BwmREBcH0qoZyZGIrcSCN+ENxSt4UawJtztn2Ad2ABR2S9mVngAAAABJRU5ErkJggg==) repeat-x left top;}"
                    ].join("\n"));

                var snap = document.evaluate("//table[@cellpadding = 4]/tbody", document, null, 7, null);
                var successTable = document.createElement("table");
                tbody = document.createElement("tbody");
                successTable.appendChild(tbody);
                snap.snapshotItem(0).appendChild(document.createElement("tr").appendChild(document.createElement("td").appendChild(successTable)));
                successTable.className="crankHelperTable";
                
                themesDifficulty();
                var combobox = document.getElementsByName("cranknumber")[0];
                if(combobox.wrappedJSObject)
                    combobox = combobox.wrappedJSObject;
                combobox.onchange = themesDifficulty;
            }
        }
    }
}

CrankHelper().init();