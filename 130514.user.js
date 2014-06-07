// ==UserScript==
// @name RK-Termin-AutoFill
// @namespace http://naonie.com/projects/RK-Termin-AutoFill.html
// @description Form Auto Fill for RK-Termin
// @version 0.1.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include https://service2.diplo.de/rktermin/*
// ==/UserScript==

var TerminAutoFill = {
    init: function(vals) {
        var key, $selector, val,
            selectors = {
            "lastname": $("#appointment_showForm_lastname"),
            "firstname": $("#appointment_showForm_firstname"),
            "email": $("#appointment_showForm_email"),
            "lastname_applicant": $("#appointment_showForm_fields_0__content"),
            "firstname_applicant": $("#appointment_showForm_fields_1__content"),
            "birthday": $("#appointment_showForm_fields_2__content"),
            "pass_num": $("#appointment_showForm_fields_3__content"),
            "phone_num": $("#appointment_showForm_fields_5__content"),
            "confirmation": $("#appointment_showForm_fields_6__content")
        };

        for (key in selectors) {
            val = vals[key];
            $selector = selectors[key];
            if (typeof(val) === "boolean") {
                $selector.attr("checked", "checked");
            } else {
                $selector.val(val);
            }
        }

        setTimeout(function() {
            $("#appointment_showForm_captchaText").focus();
        }, 1000);
    }
};

TerminAutoFill.init({
    "lastname": "X",
    "firstname": "X",
    "email": "X@X.com",
    "lastname_applicant": "X",
    "firstname_applicant": "X",
    "birthday": "dd.mm.yyyy",
    "pass_num": "xxxxxxxx",
    "phone_num": "00xxxxxxxxxx",
    "confirmation": true
});
