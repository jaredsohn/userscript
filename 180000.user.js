// ==UserScript==
// @name        4chan posts backup
// @namespace   whatisthisevensupposedtobe
// @description Backs up 4chan posts locally before submission.
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// ==/UserScript==
(function () {

    var no_confirmation = false;

    var localStorageSupported = function () // from http://diveintohtml5.info/storage.html
    {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    var addListenerToForm = function (form, is_qr_form) {
        if (form.elements['name']) {
            var handler = function () {
                var form = this.elements ? this : this.parentNode.parentNode.parentNode; // hope moot doesn't change the HTML soon

                try {
                    var date = new Date;

                    var entry = 'date: ' + date.toString() + "\n";
                    entry += 'name: ' + form.elements['name'].value + "\n";
                    entry += 'email: ' + form.elements['email'].value + "\n";
                    entry += 'subject: ' + form.elements['sub'].value + "\n";
                    entry += 'comment: ' + "\n\n" + form.elements['com'].value;

                    if (no_confirmation || confirm("Add post?\n(Cancelling will not cancel the submission, only the adding).\n(Posts will be stored in the window.localStorage.backup property of the window object, or something, Google it, works for me).\n\n" + entry)) {
                        try {
                            try {
                                var board = location.toString().match(/4chan\.org\/([\w\d]+)\//)[1];

                                if (!board) {
                                    throw false;
                                }
                            } catch (e) {
                                var board = 'whoknows';
                            }

                            var name = 'backup.' + board + '.' + date.getTime().toString();

                            localStorage.setItem(name, entry);
                            if (null === localStorage.getItem(name)) {
                                throw false;
                            }
                        } catch (e) {
                            alert('Adding failed (space ran out? time to copy to a file?)? Message: ' + e);
                        }
                    }
                } catch (e) {
                    alert('Handler error: ' + e);
                }
            };

            if (is_qr_form) {
                form.getElementsByTagName('input')[6].addEventListener('click', handler); // why doesn't submit work on the QR form, no idea
            } else {
                form.addEventListener('submit', handler);
            }
        }
    };

    try {
        if (!localStorageSupported()) {
            return alert('Local storage not supported, or something. Uninstall, I guess.');
        }

        var forms = document.getElementsByTagName('form');

        for (var i = 0; forms[i]; i++) {
            var form = forms[i];

            addListenerToForm(form);
        }

        setInterval(function () // this is ugly
            {
                var x = 'workingthroughobscurity4chanllllllnnnnmmmmm';
                var qr = document.getElementById('qrForm');

                if (qr) {
                    var form = qr.parentNode;

                    if (undefined === form[x]) {
                        addListenerToForm(form, true); // true = quick reply
                        form[x] = true;
                    }
                }
            }, 1000); // implying you don't post the second you load up a board
    } catch (e) {
        alert('Error: ' + e);
    }

})();