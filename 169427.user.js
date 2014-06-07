// ==UserScript==
// @name        RPG.SE Chat Fudge Dice
// @namespace   http://userscripts.org/users/168580
// @description Convert RPG.SE chat d6 to Fudge dice (dF)
// @grant       none
// @include     http://chat.stackexchange.com/rooms/8403/*
// @include     http://chat.stackexchange.com/transcript/8403
// @include     http://chat.stackexchange.com/transcript/8403/*
// @version     1.3
// ==/UserScript==

// Changelog:
// 1.3 Configurable colors
// 1.2 Made to work in Transcript. Dice faces made fatter.
// 1.1 ??
// 1.0 Created by @C.Ross (http://userscripts.org/users/168580)

//Thanks to Sohum (http://rpg.stackexchange.com/users/792/sohum) for the chrome fix
var main = function () {
        // load jQuery and execute the main function

    var fudgeConfig = (function() {
        // Defaults
        var _useColors = false;
        var _plusColor = '#008800';
        var _minusColor = '#CC0000';

        function useColors(value) {
            if (value == undefined) return _useColors;
            else _useColors = value;
        }

        function plusColor(value) {
            if (value == undefined) return _plusColor;
            else _plusColor = value;
        }

        function minusColor(value) {
            if (value == undefined) return _minusColor;
            else _minusColor = value;
        }

        function validateColorInput(value) {
            // #000 or #000000 is acceptable
            if (value.length != 7 && value.length != 4) return false;
            if (value[0] != '#') return false;
            return true;
        }

        function save() {
            var config = { 'useColors':_useColors, 'plusColor':_plusColor, 'minusColor':_minusColor };
            localStorage.fudgeConfig = JSON.stringify(config);
        }

        function load() {
            var firstRunEver = (localStorage.fudgeConfig == undefined);
            if (firstRunEver) {
                // Use and store defaults.
                save();
                return;
            }
            var config = JSON.parse(localStorage.fudgeConfig);
            _useColors = config.useColors;
            _plusColor = config.plusColor;
            _minusColor = config.minusColor;
        }

        return {
            useColors: useColors,
            plusColor: plusColor,
            minusColor: minusColor,
            validateColorInput: validateColorInput,
            save: save,
            load: load
        }
    })();

    function convertDice(){
        $('.six-sided-die').each(function() {
            var $die = $(this);
            //It does something strange when I try to use the :not selector,
            //   So go old school
            if ($die.hasClass('fate-die')){
                return;
            }
            var count = $('.dot:contains("•")', $die).length;
            $die.empty();
            $die.attr('data-d6-roll', count);

            var $face = $('<span>')
                .css('display', 'table-cell')
                .css('vertical-align', 'middle');

            if (count < 3){;
                $face.html('&minus;');
                if (fudgeConfig.useColors()) {
                    $die.css('color', fudgeConfig.minusColor());
                }
                $die.empty().append($face)
                $die.addClass('fate-roll-minus');
                $die.attr('data-fate-roll', -1);
            }else if (count > 4){
                $face.html('+');
                if (fudgeConfig.useColors()) {
                    $die.css('color', fudgeConfig.plusColor());
                }
                $die.empty().append($face);
                $die.addClass('fate-roll-plus');
                $die.attr('data-fate-roll', 1);
            }else {
                $die.text(' ');
                $die.attr('data-fate-roll', 0);
            }

            $die.css('display', 'table');
            $die.css('text-align','center');
            $die.css('font-size','30px');
            $die.css('font-weight', 'bold');

            //Add class to prevent re-processing
            $die.addClass('fate-die');
        });
    }
        
    function add4dFMeta(){
        $('.content').each(function() {
            var $content = $(this);
            if ($('.fate-die', $content).length == 4 && !$content.hasClass('.fate-roll')) { 
                $content.addClass('.fate-roll');

                var total = 0;
                $('.fate-die', $content).each(function() {
                    var $die = $(this);
                    total = total + parseInt($die.attr('data-fate-roll'));
                });

                if (total > 0) {
                    total = '+' + total;
                }
                $content.attr('title', '4dF = ' + total);
            }
        });
    }

    function createButton() {
        var $button = $('<a>')
            .addClass('button')
            .text('dice config');
        return $button;
    }

    function wrapLabel($object, labelText) {
        var $lbl = $('<label>')
            .text(labelText)
            .css('vertical-align', 'middle')
            .prepend($object);
        $object.css('margin-right', '1em');
        return $('<p>').append($lbl);
    }

    function createMenu() {
        var $menu = $('<section>')
            .css('border', '1px solid #E0DCBF')
            .css('background-color', '#FFF8DC')
            .css('padding', '10px')
            .css('color', '#444444')
            .css('margin-bottom', '1em');

        $menu.append(
            $('<h3>')
                .text('Fudge dice config')
                .css('margin-bottom', '0.5em')
        );

        var $colorToggle = $('<input>')
            .prop('type', 'checkbox')
            .css('vertical-align', 'middle')
            .prop('id', 'fudge-color-toggle');
        $menu.append(wrapLabel($colorToggle, 'Use colors'));

        var $picker = $('<input>')
            .addClass('color-picker')
            .prop('type', 'text')
            .prop('maxlength', '7')
            .css('width', '7em')
            .css('vertical-align', 'middle');
        var $preview = $('<span>')
            .addClass('color-preview')
            .css('display', 'inline-block')
            .css('width', '1em')
            .css('height', '1em')
            .css('border', '1px solid black')
            .css('margin-right', '0.5em')
            .css('vertical-align', 'middle');
        var $pickerSpan = $('<span>')
            .append($preview)
            .append($picker);

        var $plusColorPicker = $pickerSpan.clone()
            .prop('id', 'fudge-plus-color');
        $menu.append(wrapLabel($plusColorPicker, 'Plus color'));

        var $minusColorPicker = $pickerSpan
            .prop('id', 'fudge-minus-color');
        $menu.append(wrapLabel($minusColorPicker, 'Minus color'));

        $menu.append($('<button>')
            .prop('id', 'fudge-save')
            .text('Save and update')
        );

        $menu.append($('<div>')
            .text("Insert a three- or six-digit hex color, such as #000 or #CC00FF, then hit enter. "
                + "A red border means you probably entered an invalid value. "
                + "You can still save that value but it won't be previewed. "
                + "You can use a ")
            .append($('<a>')
                .text('HTML Color Picker')
                .prop('href', 'http://www.w3schools.com/tags/ref_colorpicker.asp')
                .prop('target', '_blank')
            )
        );

        $menu.hide();
        return $menu;
    }

    function updateColors() {
        if (fudgeConfig.useColors()) {
            $('.fate-roll-plus').css('color', fudgeConfig.plusColor());
            $('.fate-roll-minus').css('color', fudgeConfig.minusColor());
        } else {
            $('.fate-roll-plus').css('color', '');
            $('.fate-roll-minus').css('color', '');
        }
    }

    function addConfigMenu() {
        var $button = createButton();
        $('#info .fl').append($button);

        var $menu = createMenu();
        $menu.insertAfter($('#roomtitle'));

        $('#fudge-color-toggle').click(function() {
            fudgeConfig.useColors($(this).prop('checked'));
        });

        $('.color-picker').change(function() {
            var valid = fudgeConfig.validateColorInput($(this).val());
            if (!valid)
            {
                $(this).css('border-color', 'red');
                return;
            }

            $(this).css('border-color', 'green');

            $('.color-preview', $(this).parent()).css('background-color', $(this).val());
        })

        $('#fudge-color-toggle').prop('checked', fudgeConfig.useColors());

        $('#fudge-plus-color .color-picker').val(fudgeConfig.plusColor());
        $('#fudge-minus-color .color-picker').val(fudgeConfig.minusColor());
        $('.color-picker').change();

        $('#fudge-save').click(function() {
            var useColors = $('#fudge-color-toggle').prop('checked');
            var plusColor = $('#fudge-plus-color .color-picker').val();
            var minusColor = $('#fudge-minus-color .color-picker').val();

            fudgeConfig.useColors(useColors);
            fudgeConfig.plusColor(plusColor);
            fudgeConfig.minusColor(minusColor);
            fudgeConfig.save();

            updateColors();
        })

        $button.click(function() {
            $menu.toggle();
        });
    }

    $(window).load(function() {

        var inTranscript = window.location.href.indexOf('transcript') != -1;

        var scan = function() {
            convertDice();
            add4dFMeta();
        };

        fudgeConfig.load();

        addConfigMenu();

        if(inTranscript) {
            scan();
        } else {
            $(document).one('DOMNodeInserted', '#chat', function() {
                // Wait til the dice have loaded
                $(scan);
            });

            setInterval(scan, 500);
        }
    });

};

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);