// ==UserScript==
// @name           Bj2.me Ajax Provider
// @namespace      http://albertomonteiro.net
// @description    Bj2.me Ajax Provider
// @include        http://www.bj2.me*/*
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.min.js
// ==/UserScript==
/// <reference path="jquery-16min.js" />

if (window.location.pathname.indexOf("browse.php") != -1) {
    ajaxTorrentsPage();
}

if (window.location.pathname.indexOf("pesquisa_videos.php") != -1) {
    ajaxTorrentsSearchPage();
    ajaxTorrentsFormPage();
}

$("#menu form").submit(function () {
    ajaxBegin($("#content"));
    ajaxStop($("#content"));
    $.ajax({
        url: $(this).attr("action"),
        data: $(this).serialize(),
        success: function (data, status) {
            $("#content").html($(data).find("#content").html());
            ajaxTorrentsSearchPage();
        },
        complete: function (data, status) {
            try {
                window.history.pushState("", document.title, this.url);
            } catch (e) {
                console.log(e);
            }
        }
    });
    return false;
});

function ajaxTorrentsFormPage() {
    $("#content form").submit(function () {
        var data = $(this).serialize();
        var link = $(this).attr("action");
        var tableIsNull = $("#content table")[1] == null;
        var tabela = $($("#content table")[1]);
        if (tableIsNull) {
            ajaxBegin($("#content"));
            ajaxStop($("#content"));
        }
        else {
            ajaxBegin(tabela);
            ajaxStop(tabela);
        }
        try {
            window.history.pushState("", document.title, this.url);
        } catch (e) {
            console.log(e);
        }
        $.ajax({
            url: link,
            data: data,
            success: function (data) {
                var html = $($(data).find("#content table")[1]).clone()
                var pages = $($(data).find("#content table")[1]).next().clone()
                var pages1 = $($(data).find("#content table")[1]).prev().clone()
                if (tableIsNull) {
                    $("#content").append(pages1);
                    $("#content").append(html);
                    $("#content").append(pages);
                } else {
                    tabela.html(html);
                    tabela.next().html(pages);
                    tabela.prev().html(pages1);
                }
                ajaxTorrentsSearchPage();
            }
        });
        return false;
    });
}

function ajaxTorrentsPage() {
    ajaxBegin($("#tabela1"));
    ajaxStop($("#tabela1"));
    $("#tabela1").next().find("a").click(function () {
        var link = $(this).attr("href");
        try {
            window.history.pushState("", document.title, this.url);
        } catch (e) {
            console.log(e);
        }
        $.ajax({
            url: link,
            success: function (data) {
                $("#tabela1").html($(data).find("#tabela1").html());
                $("#tabela1").next().html($(data).find("#tabela1").next().html());
                ajaxTorrentsPage();
            }
        });
        return false;
    });
}

function ajaxTorrentsSearchPage() {
    var tabela = $($("#content table")[1]);
    ajaxBegin(tabela);
    ajaxStop(tabela);
    tabela.next().find("a").click(function () {
        var link = $(this).attr("href");
        try {
            window.history.pushState("", document.title, this.url);
        } catch (e) {
            console.log(e);
        }
        $.ajax({
            url: link,
            success: function (data) {
                var html = $($(data).find("#content table")[1]).html()
                var pages = $($(data).find("#content table")[1]).next().html()
                var pages1 = $($(data).find("#content table")[1]).prev().html()
                tabela.html(html);
                tabela.next().html(pages);
                tabela.prev().html(pages1);
                ajaxTorrentsSearchPage();
            }
        });
        return false;
    });
    tabela.prev().find("a").click(function () {
        var link = $(this).attr("href");
        try {
            window.history.pushState("", document.title, this.url);
        } catch (e) {
            console.log(e);
        }
        $.ajax({
            url: link,
            success: function (data) {
                var html = $($(data).find("#content table")[1]).html()
                var pages = $($(data).find("#content table")[1]).next().html()
                var pages1 = $($(data).find("#content table")[1]).prev().html()
                tabela.html(html);
                tabela.next().html(pages);
                tabela.prev().html(pages1);
                ajaxTorrentsSearchPage();
            }
        });
        return false;
    });
    return false;
}

function ajaxBegin(element) {
    element.ajaxStart(function () {
        var top = element.position().top;
        var left = element.position().left;
        var altura = element.height();
        var largura = element.width();
        $("body").append("<div id='loadingDivAjax' style='position:absolute'></div>");
        $("body").append("<div id='loadingDivAjaxText'><center><h1>Carregando</h1><br /><img src='http://www.nestle.pt/cozinhar/images/ajax_loading_bar.gif' /></center></div>");
        $("#loadingDivAjax").css({
            top: top + "px",
            left: left + "px",
            width: largura + "px",
            height: altura + "px",
            'background-image': 'url("http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.10/themes/ui-lightness/images/ui-bg_diagonals-thick_20_666666_40x40.png")',
            opacity: 0.5
        });
        $("#loadingDivAjaxText").css({
            position: "absolute",
            top: top + "px",
            left: left + "px",
            width: largura + "px"
        });
    });
}

function ajaxStop(element) {
    element.ajaxStop(function () {
        $("#loadingDivAjax").remove();
        $("#loadingDivAjaxText").remove();
    });
}