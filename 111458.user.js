// ==UserScript==
// @name           انتقاء التقارير
// @description    انتقاء التقارير التي تريدها
// @author         Michael Richter, Joost Klootwijk
// @namespace      http://tw-ar.com/
// @include        http://de*.die-staemme.de/game.php?*screen=report*
// @include        http://*.tribalwars.ae/game.php?*screen=report*
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------



 


(function () {

    var $x = function (p, context) {
        if (!context)
            context = document;
        var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; item = xpr.snapshotItem(i); i++)
            arr.push(item);
        return arr;
    };

    el = $x('//th/input[@name="all"]');
    if (el.length == 1) {
        try {
            el[0].onclick = null;  // Opera
        } catch (err) { }
        el[0].removeAttribute('onclick');  // Firefox
        el[0].addEventListener('click', function (evt) {
            input = evt.target;
            form = input.form;
            checked = input.checked;

            for (var i = 0; i < form.length; i++) {
                if (form.elements[i].getAttribute('hidden') != 'true') {
                    form.elements[i].checked = checked;
                } else {
                    form.elements[i].checked = false;
                }
            }
        }, false);
    }



    var el = $x('//form/table[1]'); //Changed
    if (el.length == 0) {
        return;
    }
    var div = document.createElement('div');
    var input = document.createElement('input');
    input.addEventListener('keypress', function (evt) {
        if (evt.keyCode == 13) {
            evt.preventDefault();
        }
    }, false);

    var filterfunc = function (value) {
        var reports = $x('//a[contains(@href,"&view=")]');
        if (reports.length == 0) {
            return;
        }
        var inputs = $x('//input[contains(@name,"id_")]');
        if (inputs.length != reports.length) {
            return;
        }

        for (var i = 0; i < reports.length; i++) {
            if (reports[i].textContent.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                reports[i].parentNode.parentNode.parentNode.style.display = 'none';
                inputs[i].setAttribute('hidden', true);
            } else {
                reports[i].parentNode.parentNode.parentNode.style.display = 'table-row';
                inputs[i].removeAttribute('hidden'); //Changed
            }
        }
    };



    input.addEventListener('keyup', function (evt) { filterfunc(evt.target.value); }, false);
    input.addEventListener('change', function (evt) { filterfunc(evt.target.value); }, false);
    div.setAttribute('style', 'padding: 3px;');




    div.appendChild(document.createTextNode('انتقاء: '));
    div.appendChild(input);
    var clearbtn = document.createElement('a');
    clearbtn.href = '#';
    clearbtn.textContent = '×';
    clearbtn.title = 'احذف المكتوب';
    clearbtn.addEventListener('click', function (evt) {
        evt.target.previousSibling.value = '';
        filterfunc('');
        evt.preventDefault();
    }, false);
    div.appendChild(clearbtn);
    el[0].parentNode.insertBefore(div, el[0]);

})();