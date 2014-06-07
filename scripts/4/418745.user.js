// ==UserScript==
// @name        AutoCheckTante
// @namespace   Salahjalan.com
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=1
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=1
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=2
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=2
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=3
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=3
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=4
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=4
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=5
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=5
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=6
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=6
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=7
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=7
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=8
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=8
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=9
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=9
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&QID=1243&course=10
// @include     http://academic.ittelkom.ac.id/survey/index.php?pageid=2001&actC=kuesionersimpan&exeC=2&course=10

// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=1
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=1
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=2
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=2
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=3
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=3
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=4
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=4
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=5
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=5
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=6
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=6
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=7
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=7
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=8
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=8
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=9
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=9
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&QID=1243&course=10
// @include     http://academic.ittelkom.ac.id/survey/?pageid=2001&actC=kuesionersimpan&exeC=2&course=10
// @version     1
// @grant       none
// ==/UserScript==
// Created by SalahJalan.com alien_boys and o_man
var input = document.createElement('input');
input.type = 'button';
input.value = 'Sangat Puas';
input.onclick = SangatPuas;
document.body.appendChild(input);
var input2 = document.createElement('input');
input2.type = 'button';
input2.value = 'Puas';
input2.onclick = Puas;
document.body.appendChild(input2);
var input4 = document.createElement('input');
input4.type = 'button';
input4.value = 'Cukup';
input4.onclick = Cukup;
document.body.appendChild(input4);
var input5 = document.createElement('input');
input5.type = 'button';
input5.value = 'Tidak Puas';
input5.onclick = TidakPuas;
document.body.appendChild(input5);
var input6 = document.createElement('input');
input6.type = 'button';
input6.value = 'Sangat Tidak Puas';
input6.onclick = SangatTidakPuas;
document.body.appendChild(input6);
var input3 = document.createElement('input');
input3.type = 'button';
input3.value = 'Ok';
input3.onclick = '';
document.body.appendChild(input3);
function SangatPuas()
{
    var inputs = document.getElementsByTagName('input'),
    span = Array(),
    textnode,
    option,
    active;
    for (a = 0; a < inputs.length; a++) {
        if ((inputs[a].type == 'checkbox' || inputs[a].type == 'radio') && inputs[a].className == 'styled') {
            if (inputs[a].value == '8') {
                inputs[a].checked = true;
            }
        }
    }
}
function Puas()
{
    var inputs = document.getElementsByTagName('input'),
    span = Array(),
    textnode,
    option,
    active;
    for (a = 0; a < inputs.length; a++) {
        if ((inputs[a].type == 'checkbox' || inputs[a].type == 'radio') && inputs[a].className == 'styled') {
            if (inputs[a].value == '7') {
                inputs[a].checked = true;
            }
        }
    }
}
function Cukup()
{
    var inputs = document.getElementsByTagName('input'),
    span = Array(),
    textnode,
    option,
    active;
    for (a = 0; a < inputs.length; a++) {
        if ((inputs[a].type == 'checkbox' || inputs[a].type == 'radio') && inputs[a].className == 'styled') {
            if (inputs[a].value == '45') {
                inputs[a].checked = true;
            }
        }
    }
}
function TidakPuas()
{
    var inputs = document.getElementsByTagName('input'),
    span = Array(),
    textnode,
    option,
    active;
    for (a = 0; a < inputs.length; a++) {
        if ((inputs[a].type == 'checkbox' || inputs[a].type == 'radio') && inputs[a].className == 'styled') {
            if (inputs[a].value == '6') {
                inputs[a].checked = true;
            }
        }
    }
}
function SangatTidakPuas()
{
    var inputs = document.getElementsByTagName('input'),
    span = Array(),
    textnode,
    option,
    active;
    for (a = 0; a < inputs.length; a++) {
        if ((inputs[a].type == 'checkbox' || inputs[a].type == 'radio') && inputs[a].className == 'styled') {
            if (inputs[a].value == '5') {
                inputs[a].checked = true;
            }
        }
    }
}
