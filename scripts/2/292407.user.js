// ==UserScript==
// @name       Mashhad MIT
// @namespace  http://jahanii.ir/
// @version    1.2
// @description  Mashhad MIT fixes and improvements
// @match      http://www.mashadmit.ir/*
// @copyright  2012+, You
// ==/UserScript==

var red = '#FF2D55',
    green = '#4CD964',
    orange = '#FF9500',
    blue = '#007AFF',
    scoresTable = document.querySelector('#ctl00_ContentPlaceHolder1_GridView1'),
    perm = document.querySelectorAll('#ctl00_ContentPlaceHolder1_GridView1 tr > td:nth-child(5)'),
    temp = document.querySelectorAll('#ctl00_ContentPlaceHolder1_GridView1 tr > td:nth-child(8)')
;
var checkScore = function(column) {
    for (var i = 0; i < column.length; i++) {
        var columnScore = column[i].querySelector('span').innerHTML;
        if (columnScore != '') {
            if (columnScore < 10) {
                column[i].style.backgroundColor = red;
            }
            else if (columnScore >= 10 && columnScore < 16) {
                column[i].style.backgroundColor = orange;
            }
            else if (columnScore >= 16) {
                column[i].style.backgroundColor = green;
            }
        }
    }
}

var fixMenu = function() {
    document.querySelectorAll('ul.rootGroup')[0].style.display = 'inline';
}

var scoreEditor = function() {
    var ul = document.querySelector('.rootGroup > li:nth-child(6) .slide ul');
    ul.children[ul.children.length - 1].classList.remove('last');
    
    var li = document.createElement('li');
    var a = document.createElement('a');
    var span = document.createElement('span');
    
    a.style.width = '226px';
    //a.id = 'edit-scores';
    
    span.style.fontSize = '10px';
    span.innerHTML = 'ویرایش نمرات! :)';
    span.id = "editToggle";
    
    li.classList.add('item', 'last');
    a.classList.add('link');
    span.classList.add('text');
    
    a.onclick = function() {
        if  (scoresTable.contentEditable != 'true') {
            scoresTable.contentEditable = scoresTable.contentEditable = 'true';
            editToggle.innerHTML = 'ذخیره تغییرات نمرات!';
        }
        else {
            scoresTable.contentEditable = scoresTable.contentEditable = 'false';
			checkScore(temp);
            checkScore(perm);
            editToggle.innerHTML = 'ویرایش نمرات! :)'
        }
    }
    
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
}

var init = function() {
    fixMenu();
    checkScore(temp);
    checkScore(perm);
    scoreEditor();
}

window.addEventListener('load', init);