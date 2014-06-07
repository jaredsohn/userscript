// ==UserScript==
// @name          List_of_people_like
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       https://www.facebook.com/
// @include       http://www.facebook.com/
// @include       https://www.facebook.com/QualityForLifePhilippines
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		  http://download.pouchdb.com/pouchdb-nightly.min.js
// ==/UserScript==


var data = []; // the data grasp from the facebook
var db_data = []; // the data read from the indexedDB
$(document).ready(function () {
    grasp_data();
    read_from_indexedDB("like_list");
    setTimeout(function () {
        download(db_data);

    }, 2000);
});

window.setInterval(function () {

    grasp_data();
}, 3600000);
//======download data for each 24 hours
window.setInterval(function () {
    read_from_indexedDB("like_list");
    setTimeout(function () {
        download(db_data);

    }, 2000);
}, 21600000);

//self.location.href="QualityforLifePhilippines";


function grasp_data() {
    do_login(); // login
    setTimeout(function () {
        //goToPage();
        var node_see_likes = document.querySelector('div.clearfix.uiHeaderTop a._558p');
        seeLikes();
        setTimeout(function () {
            seeMore();
        }, 5000);
    }, 5000);

    setTimeout(function () {
        data = getData();

    }, 185000);
    setTimeout(function () {
        write_to_indexedDB(data);
    }, 186000);
    /* setTimeout(function(){
     read_from_indexedDB("like_list");
     setTimeout(function(){
     download(db_data);
     console.log(db_data.length);
     }, 2000);
     }, 187000); */
    //setTimeout( function(){ seeLikes(); }, 10000); // delay 10 seconds then redirect to the list of people who likes this page
}

function get_login_button()
// get the login button node
{
    var node_login_button = document.getElementById('loginbutton');
    if (node_login_button == undefined) {
        node_login_button = document.getElementsByClassName('uiButton uiButtonConfirm');
        if (node_login_button.length != 0) {
            node_login_button = node_login_button[0];
        } else {
            node_login_button = undefined;
        }
    }
    if (node_login_button != undefined && node_login_button.nodeName != 'LABEL') {
        node_login_button = undefined;
    }
    if (node_login_button == undefined) {
        GM_log('Warning: could not locate "Login" button');
    } else {
        GM_log('successfully located "Login" button');
        // node_login_button.style.color = 'red';
    }
    return node_login_button;
}

function enter_field(id, gm_name)
// set a value to a field
{
    GM_log('enter_field("' + id + '", "' + gm_name + '") called');
    var node = document.getElementById(id);
    if (node != undefined) {
        //node.value = GM_getValue( gm_name, '' );
        node.value = gm_name + "";
    } else {
        GM_log('Error: failed to locate "' + id + '" input field');
    }
}

function enter_login_fields()
// input the facebook email and the password
{
    GM_log('enter_login_fields event listener called');
    enter_field("email", "dsmqflphilippines@hotmail.com");
    enter_field("pass", "dsmph.com");

    return true;
}

function do_login()
// auto longin
{
    GM_log('do_login: entry');

    GM_log('do_autologin: autologin is a go!');
    enter_login_fields();

    var node_login_button = get_login_button();
    if (node_login_button != undefined) {
        var now = new Date();
        //GM_setValue( "lastTime", now.getTime().toString() );
        GM_log('do_autologin: click!');
        node_login_button.click();
    } else {
        GM_log('do_login: login button is missing?!?');
    }
}

function seeLikes() {
    //var node_see_likes = document.getElementById();
    var node_see_likes = document.querySelector('div.clearfix.uiHeaderTop a._558p');
    node_see_likes.click();
}

function seeMore() {
    i = 0;
    for (; i < 61; i++) {
        setTimeout(function () {
            var node_see_more = document.querySelector('div.clearfix.mam.uiMorePager.stat_elem.morePager._52jv a.pam.uiBoxLightblue.uiMorePagerPrimary');
            node_see_more.click();
        }, 5000 + i * 1500);
    }
}

function getData() {
    var nodelist = document.querySelectorAll('div.fsl.fwb.fcb a');
    var datas = [];
    grasp_at = new Date();
    for (i = 0; i < nodelist.length; i++) {
        datas[i] = [nodelist[i].text, nodelist[i].href, grasp_at.toUTCString()];
    }
    return datas;
}

function write_to_indexedDB(data) {
    var pouchdb = new Pouch('like_list');
    for (i = 0; i < data.length; i++) {
        pouchdb.post({ _id: data[i][1], title: data[i][0], date: data[i][2]}, function (err, response) {
        })
    }
}

function read_from_indexedDB(db_name) {
    var pouchdb = new Pouch(db_name);
    pouchdb.allDocs({include_docs: true}, function (err, response) {
        db_data = response.rows;
        for (i = 0; i < response.rows.length; i++) {
            db_data[i] = [response.rows[i].doc.title, response.rows[i].doc._id, response.rows[i].doc.date];
        }
    });
}

function download(data) {
    var exp = document.createElement("a");
    exp.innerHTML = '<a id="export" href="#" class="export" display:none>Export Table data into Excel</a>';
    document.body.insertBefore(exp, document.body.lastChild);

    $(document).ready(function () {
        function exportTableToCSV(filename) {
            csv = 'name,url,date\r\n';
            for (i = 0; i < data.length; i++) {
                csv += data[i][0] + "," + data[i][1] + "," + data[i][2] + "\r\n";
            }
            // Data URI
            csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
            $(this)
                .attr({
                    'download': filename,
                    'href': csvData,
                    'target': '_blank'
                });
        }

        // This must be a hyperlink
        exportTableToCSV.apply($(".export"), ['export.csv']);
        var node_export = document.getElementById("export");
        node_export.click();
    });
}
