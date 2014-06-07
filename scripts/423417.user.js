// ==UserScript==
// @name       PS inline image viewer
// @namespace  idkwhatthisfielddoes
// @version    0.1
// @description  Button to show an image in the PS chat itself
// @match      http://play.pokemonshowdown.com/*
// @match      http://play.pokemonshowdown.com
// @match      https://play.pokemonshowdown.com/*
// @match      https://play.pokemonshowdown.com
// @match      http://*.psim.us/*
// @match      http://*.psim.us
// @match      https://*.psim.us/*
// @match      https://*.psim.us
// @run-at document-end
// ==/UserScript==
$(function () {
    var oldAddRoom = app.addRoom;
    app.addRoom = function (id, type, nojoin) {
        oldAddRoom.apply(this, [id, type, nojoin]);
        var croom = app.curSideRoom;

        var oldAddChat = croom.addChat;
        var exts = ["jpg", "png", "bmp", "jpeg", "gif"];

        croom.addChat = function (name, message, pm, deltatime) {
            oldAddChat.apply(this, [name, message, pm, deltatime]);

            $("a[fixed!=true]").each(function () {
                $(this).attr({
                    fixed: true
                });
                var ext = this.innerText.split('.').slice(-1)[0];

                if (exts.indexOf(ext) > -1) {
                    var href = this.innerText;
                    var $toggle = $("<div>")
                        .text("[ click to show ]")
                        .css({
                            marginLeft: "10px",
                            display: "inline-block",
                            backgroundColor: "grey",
                            padding: "1px",
                            cursor: "pointer"

                        }).data("shown", false)
                        .appendTo($(this).parent())
                        .click(function () {
                            var $this = $(this);
                            var shown = !$this.data("shown");
                            $this.data("shown", shown);
                            if (shown) {
                                $this.text("[ click to hide ]");
                                $image.attr("src", href).show();
                            } else {
                                $this.text("[ click to show ]");
                                $image.hide();
                            }
                        });

                    var $image = $("<img>")
                        .css({
                            maxWidth: "400px"
                        })
                        .appendTo($(this).parent());

                }
            });
        };
    }

})