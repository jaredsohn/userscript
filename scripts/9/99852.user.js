// ==UserScript==
// @name           mining.bitcoin.cz graph data exporter
// @namespace      http://www.chrishowie.com
// @description    Extracts graph data into CSV format for pasting into a spreadsheet
// @include        http://mining.bitcoin.cz/*
// @include        https://mining.bitcoin.cz/*
// ==/UserScript==

function zero_pad(str, zeroes) {
    str = str + "";

    while (str.length < zeroes) {
        str = "0" + str;
    }

    return str;
}

function data_to_csv(data) {
    var str = "Date,Reward\n";
    var i;

    for (i = 0; i < data.length; i++) {
        var rowDate = new Date();
        rowDate.setTime(data[i][0]);

        var rowDateString =
            zero_pad(rowDate.getUTCFullYear(), 4) + "-" +
            zero_pad(rowDate.getUTCMonth() + 1, 2) + "-" +
            zero_pad(rowDate.getUTCDate(), 2);

        str += "\"" + rowDateString + "\"," + data[i][1] + "\n";
    }

    return str;
}

function create_text_popup(text) {
    var textArea = document.createElement('textarea');
    textArea.appendChild(document.createTextNode(text));
    textArea.style.width = '100%';
    textArea.style.height = '90%';

    var button = document.createElement('button');
    button.appendChild(document.createTextNode('Close'));

    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = '25%';
    div.style.top = '25%';
    div.style.width = '50%';
    div.style.height = '50%';
    div.style.background = '#fff';
    div.style.border = '1px solid black';
    div.style.padding = '0.5em';
    div.style.zIndex = '10000';

    div.appendChild(textArea);
    div.appendChild(document.createElement('br'));
    div.appendChild(button);

    document.getElementById('content').appendChild(div);

    button.addEventListener('click', function() {
        div.parentNode.removeChild(div);
    }, false);
}

function install_csv_button(item) {
    var target = document.getElementById(item);
    if (!target) {
        return;
    }

    var data = unsafeWindow[item + '_data'];
    if (!data) {
        return;
    }

    target = target.parentNode;

    var button = document.createElement('button');
    button.appendChild(document.createTextNode('Export CSV'));

    button.addEventListener("click", function() {
        create_text_popup(data_to_csv(data));
    }, false);

    target.parentNode.insertBefore(button, target);
}

window.addEventListener("load", function() {
    install_csv_button('reward_time');
    install_csv_button('system_reward_time');
}, false);
