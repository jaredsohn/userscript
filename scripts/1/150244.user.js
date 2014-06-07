// ==UserScript==
// @name       BMW Form fill
// @version    0.1
// @description Autofills a Core Form using static testing data
// @match      https://*.at/*
// @match      https://*.nl/*
// @match      https://*.de/*
// @match      https://*.com/*
// @match      https://*.co.uk/*
// @match      https://cmx-bounce.bmwgroup.net/*
// @copyright  2012,2013 BMW AG
// ==/UserScript==

// Make sure we have access to jquery
window.jq = !window.jq ? unsafeWindow.jq : window.jq;
window.jq && window.jq(document).ready(initUserScript());

/**
* Keep an eye on the DOM and grab any Core Forms that appear.
*/
function initUserScript() {
    unsafeWindow.rlComponentLoader && unsafeWindow.rlComponentLoader.deferredExec && unsafeWindow.rlComponentLoader.deferredExec(["glassPaneLayerNext"], function() {
        unsafeWindow.rlGlassPaneLayerNext.addAjaxContentLoaded(function() {
            jq("form.coreForm").each(function(index, frm) {
                addLinkToForm(jq(frm));
            });
        }, true);
    });
}

/**
* Add a "Fill this form" link to a specified Core Form.
*/
function addLinkToForm(form) {
    var link = jq("<a href='javascript:void(0)'>Fill form</a>");
    link.css({
        position: "absolute",
        top: "0px",
        right: "0px"
    });
    form.append(link);
    
    link.click(function() {
        var userMail = "user." + (new Date()).getTime() + "@spambog.com";
        form.find("[data-field='account.login']").val(userMail);
        form.find("[data-field='account.password']").val("qwer1234");
        form.find("[data-field='account.confirmPassword']").val("qwer1234");
        
        form.find("[data-field='user.profile.salutation']").find("input").first().prop("checked", true);
                               form.find("select[data-field='user.profile.title']").find("option[value='MR'], option[value='DR']").first().prop('selected', true).change();
        form.find("[data-field='user.firstName']").val("John");
        form.find("[data-field='user.lastName']").val("Zoidberg");

        // fill required mail
                               form.find("[data-field='user.profile.email'][data-validators*='equired'] input").first().val(userMail);

        var c = unsafeWindow.rlMandator.getCountry();
        
        if (c === "AT") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("1020");
            form.find("[data-field='user.profile.addresses[0].city']").val("Wien");
            form.find("[data-field='user.profile.addresses[0].street']").val("Scherzergasse");
            form.find("[data-field='user.profile.addresses[0].streetNumber']").val("1");
        } else if (c === "GB") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("HX5 0QQ");
            form.find("[data-field='user.profile.addresses[0].city']").val("Elland");
            form.find("[data-field='user.profile.addresses[0].street']").val("Cross Lane");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("10");
        } else if (c === "NL") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("3035 XD");
            form.find("[data-field='user.profile.addresses[0].city']").val("Rotterdam");
            form.find("[data-field='user.profile.addresses[0].street']").val("Ooievaarstraat");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("1");
        } else if (c === "DE") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
           form.find("[data-field='user.profile.addresses[0].postalCode']").val("52072");
            form.find("[data-field='user.profile.addresses[0].city']").val("Aachen");
            form.find("[data-field='user.profile.addresses[0].street']").val("Am Beulardstein");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("30");
        } else if (c === "BE") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("1050");
            form.find("[data-field='user.profile.addresses[0].city']").val("Bruxelles");
            form.find("[data-field='user.profile.addresses[0].street']").val("Avenue Louise");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("10");
        } else if (c === "FR") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("62200");
            form.find("[data-field='user.profile.addresses[0].city']").val("Boulogne Sur Mer");
            form.find("[data-field='user.profile.addresses[0].street']").val("rue Louis Benard");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("10");
        } else if (c === "IT") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("00187");
            form.find("[data-field='user.profile.addresses[0].city']").val("Roma");
            form.find("[data-field='user.profile.addresses[0].street']").val("Via della Purificazione");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("42");
            form.find("[data-field='user.profile.mobile.value']").find("input[type='text']").first().val("004912345678");
            form.find("[data-field='user.profile.mobile.value']").find("input[type='radio']").first().prop("checked", true);
        } else if (c === "ES") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("28001");
            form.find("[data-field='user.profile.addresses[0].city']").val("Madrid");
            form.find("[data-field='user.profile.addresses[0].regionCode']").val("Madrid");
            form.find("[data-field='user.profile.addresses[0].street']").val("Calle Claudio Coello");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("41");
            form.find("[data-field='user.profile.personalIdentification.type']").find("input").first().prop("checked", true).change();
            form.find("[data-field='user.profile.personalIdentification.id']").val('abcdef123456');
            form.find("[data-field='user.profile.phone']").find("input[type='text']").first().val("004912345678");
            form.find("[data-field='user.profile.phone']").find("input[type='radio']").first().prop("checked", true);
            form.find("select[data-field='user.profile.preferredCommunication']").find("option[value='TEL']").first().prop('selected', true).change();
		} else if (c === "CH") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("1201");
            form.find("[data-field='user.profile.addresses[0].city']").val("Genf");
            form.find("[data-field='user.profile.addresses[0].street']").val("Quai du Mont Blanc");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("19");
        } else if (c === "AU") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().prop("checked", true);
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("NSW 2011");
            form.find("[data-field='user.profile.addresses[0].city']").val("Rushcutters Bay");
            form.find("[data-field='user.profile.addresses[0].street']").val("Craigend St");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val("65");
        }

        form.find("[name='consent']").prop("checked", true);
        form.find("[data-field='captcha.input']").val("skipCaptcha");
    });
}
