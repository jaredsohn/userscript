
// ==UserScript==
// @name       E2E BMW Form fill
// @version    3.5
// @description Autofills a Core Form using static testing data
// @match      https://*.de/*
// @match      https://*.at/*
// @match      https://*.nl/*
// @match      https://*.com/*
// @match      https://*.co.uk/*
// @match      https://cmx-bounce.bmwgroup.net/*
// @copyright  2013 BMW
// @modified by David Zabihi
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
    
// Funktion Datum konvertieren 
    
function getFormattedDate() {
    var date = new Date();
    var monthNames = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
    //var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var str = date.getFullYear() + monthNames[date.getMonth()] + date.getDate() + "_" +  date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
    return str;
}    
   
    link.click(function() {
        //form.find("[data-field='account.login']").val("E2E." + (getFormattedDate()) + "@spambog.com");
        var userMail = "E2E_" + (getFormattedDate() + "@spambog.com");
        var username = "E2E_" + getFormattedDate();
        form.find("[data-field='account.login']").val(userMail);
        form.find("[data-field='account.password']").val("daza1234");
        form.find("[data-field='account.confirmPassword']").val("daza1234");
        
        form.find("[data-field='user.profile.salutation']").find("input").first().attr("checked", "checked");
        form.find("select[data-field='user.profile.title']").find("option[value='MR'], option[value='DR']").first().prop('selected', true).change();
        form.find("[data-field='user.firstName']").val("daza");
        form.find("[data-field='user.lastName']").val(username);
        
        // fill required mail
        form.find("[data-field='user.profile.email'][data-validators*='equired'] input").first().val(userMail);
        
        var c = unsafeWindow.rlMandator.getCountry();
        
        if (c === "AT") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().attr("checked", "checked");
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("1020");
            form.find("[data-field='user.profile.addresses[0].city']").val("Wien");
            form.find("[data-field='user.profile.addresses[0].street']").val("Scherzergasse");
            //form.find("[data-field='user.profile.addresses[0].houseNumber']").val("10");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("0043125935460");
        } else if (c === "GB") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().attr("checked", "checked");
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("HX5 0QQ");
            form.find("[data-field='user.profile.addresses[0].city']").val("Elland");
            form.find("[data-field='user.profile.addresses[0].street']").val("Cross Lane");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("00442082325700");
        } else if (c === "NL") {
            form.find("[data-field='user.profile.initials']").val("van");
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().attr("checked", "checked");
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("3035 XD");
            form.find("[data-field='user.profile.addresses[0].city']").val("Rotterdam");
            form.find("[data-field='user.profile.addresses[0].street']").val("Ooievaarstraat");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("00311012345678");
        } else if (c === "DE") {
            form.find("[data-field='user.profile.addresses[0].addressType']").find("input").first().attr("checked", "checked");
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("53177");
            form.find("[data-field='user.profile.addresses[0].city']").val("Bonn");
            form.find("[data-field='user.profile.addresses[0].street']").val("Wichterichstr.");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("004922192345678");            
        } else if (c === "BE") {
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("1000");
            form.find("[data-field='user.profile.addresses[0].city']").val("Bruxelles");
            form.find("[data-field='user.profile.addresses[0].street']").val("Rue Neuve");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("003271655865");
            form.find("[data-field='user.profile.email']").find("input").val("E2E_" + (getFormattedDate()) + "@spambog.com");
        } else if (c === "LU") {
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("1611");
            form.find("[data-field='user.profile.addresses[0].city']").val("Luxembourg");
            form.find("[data-field='user.profile.addresses[0].street']").val("avenue de la Gare");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("0035226270535");
            form.find("[data-field='user.profile.email']").find("input").val("E2E_" + (getFormattedDate()) + "@spambog.com");
        } else if (c === "IT") {
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("35131");
            form.find("[data-field='user.profile.addresses[0].city']").val("Padova");
            form.find("[data-field='user.profile.addresses[0].street']").val("Via Venezia");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("00390412413979");
            form.find("[data-field='user.profile.email']").find("input").val("E2E_" + (getFormattedDate()) + "@spambog.com");
        } else if (c === "ES") {
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("08005");
            form.find("[data-field='user.profile.addresses[0].city']").val("Barcelona");
            form.find("[data-field='user.profile.addresses[0].street']").val("Calle de La Marina");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("0034932697475");
            form.find("[data-field='user.profile.email']").find("input").val("E2E_" + (getFormattedDate()) + "@spambog.com");
        } else if (c === "FR") {
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("75001");
            form.find("[data-field='user.profile.addresses[0].city']").val("Paris");
            form.find("[data-field='user.profile.addresses[0].street']").val("Rue de Rivoli");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("0033142339564");
            form.find("[data-field='user.profile.email']").find("input").val("E2E_" + (getFormattedDate()) + "@spambog.com");
        } else if (c === "CH") {
            form.find("[data-field='user.profile.addresses[0].postalCode']").val("8002");
            form.find("[data-field='user.profile.addresses[0].city']").val("Zürich");
            form.find("[data-field='user.profile.addresses[0].street']").val("Tessinerplatz");
            form.find("[data-field='user.profile.addresses[0].houseNumber']").val(Math.floor(Math.random() * 100) + 1);
            form.find("[data-field='user.profile.phone']").find("input").val("0041443602525");
            form.find("[data-field='user.profile.email']").find("input").val("E2E_" + (getFormattedDate()) + "@spambog.com");
        }
            
        form.find("[name='consent']").attr("checked", "checked");
        form.find("[data-field='captcha.input']").val("skipCaptcha");
    });
}
