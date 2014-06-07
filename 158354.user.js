// ==UserScript==
// @name           سكككرببت
// @version	   8.9
// @author	   Kevin Möchel
// @namespace      KSTM.Javascript.DS
// @description    سكربت 
// @include	   http://*.tribalwars.ae/game.php?*mode=members&screen=ally
// @include        http://*.tribalwars.ae/game.php?*members&screen=ally
// @include	   http://*.tribalwars.ae/game.php?*&screen=forum&screenmode=view_forum&forum_id=*
// ==/UserScript==
doc = document;
curr_date = doc.getElementById("serverDate").innerHTML;;
curr_time = doc.getElementById("serverTime").innerHTML;;

function add_dismiss(message) {
    rows[i].innerHTML += '<td><a href="javascript: radbut = rows[' + i + '].getElementsByTagName(\'td\')[0].getElementsByTagName(\'input\')[1];radbut.checked = true;var selbox = rows[rows.length - 1].getElementsByTagName(\'select\')[0];selbox.options[2].selected = true; var confirm_booting = prompt(\'' + message + '\'); if(confirm_booting){alert(\'تم طرد اللاعب من القبيلة بنجاح ^_*\'); doc.forms[0].submit(\'OK\');} else {alert(\'تم إلغاء العملية بنجاح\');} void 0;">» طرد من القبيلة</a></td>';
}
if (doc.URL.match("screen=ally&mode=members")) {
    var rows = doc.getElementById("ally_content").getElementsByTagName("table")[0].getElementsByTagName("tr");
    var Tribe = doc.getElementById("content_value").getElementsByTagName("h2")[0].firstChild.nodeValue;
    var output = '[b]حالة لاعبي القبيلة[/b]\n\n\n';
    var good = '\n\n';
    var g = 0;
    var n = 0;
    var a = 0;
    var naughty = "[b] [color=#0000ff] اللاعبين تحت الحضانة[/color][/b]\n\n[table] [**]اللاعب[||]حاضن الحساب[/**]';
    var inactive = '[/table] \n\n\n\n [b] [color=#0000ff]اللاعبين الخاملين[/color][/b]\n\n';
    var inactive2 = " [b][color=#ff0000]اللاعبين الخاملين من يومين إلى 6 ايام [/color][/b]\n\n[table] [**]اللاعب[||]مدة غياب صاحب الحساب[/**]";
    var inactive7 = "[/table] \n\n [b][color=#ff0000]اللاعبين الخاملين 7 أيام أو أكثر [/color][/b]\n\n[table][**]اللاعب[||]مدة غياب صاحب الحساب[/**]';
    for (i = 1; i < rows.length - 1; i++) {
        cell = rows[i].getElementsByTagName("td");
        player = cell[0].getElementsByTagName('a')[0].firstChild.nodeValue;
        if (cell[0].getElementsByTagName("img")[0].getAttribute('src').match("yellow")) {
            inactive2 += "\n" + "[*] [player]" + player + "[/player] [|]من 2 إلى 6 أيام";
            add_dismiss("هذا اللاعب خامل لمدة يومين إلى 6أيام , هل تريد طرده من القبيلة ؟! , لتأكيد طرده أكتب نعم    ثم OK");
            a++;
        }
        if (cell[0].getElementsByTagName("img")[0].getAttribute('src').match("red")) {
            inactive7 += "\n" + "[*] [player]" + player + "[/player] [|] 7 أيام أو أكثر";
            add_dismiss("هذا اللاعب خامل لمدة7أيام أو أكثر , هل تريد طرده من القبيلة ؟! , لتأكيد طرده أكتب نعم    ثم OK");
            a++;
        }
        if (cell[13].firstChild !== null) {
            sitter = cell[13].getElementsByTagName("a")[0].innerHTML;
            STribe = cell[13].getElementsByTagName('a')[0].getAttribute('alt');
            if (Tribe == STribe) {
                good += "[*] [player]" + player + "[/player] » » » [player]" + sitter + "[/player]" + "\n";
                g++;
            } else if (Tribe !== STribe) {
                naughty += " [*] [player]" + player + "[/player] [|]» » » [player]" + sitter + "[/player] \n";
                n++;
            }
        }
    }
    if (a == 0) {
        inactive = "\n\n\n\n[b] [color=#0000ff]اللاعبين الخاملين[/color][/b]\n\nالقبيلة ليس بها لاعبين نشيطين";
    } else {
        inactive = inactive + inactive2 + "\n\n" + inactive7;
    }
    if (g > 0) {
        good = good + "\n\n\n\n";
        output = output + good;
        if (n > 0) {
            output = output + naughty;
        }
    } else if (n > 0) {
        output = output + naughty;
    } else {
        output = "حالة أعضاء القبيلة";
    }
    alert(output + inactive + "\n\n\n\n [b] [color=#0000ff] تاريخ تسجيل هذه المعلومات[/color][/b] " + curr_time + " - " + curr_date);
} alert(message);