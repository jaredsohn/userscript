// ==UserScript==
// @name       Sejmfager
// @namespace  http://karachan.org/
// @version    0.2.4
// @description  Fajny skrypt do oznaczania anonków kolorami na podstawie unikalnych identyfikatorów
// @match      http://karachan.org/b/res/*
// @copyright  2014, Łukasz Rajzer
// ==/UserScript==

(function() {

    var fags = {},
        samefags = [],

        currentFag = 1,

        config = {
            setOnlySamefags: true,          // Oznaczenie jedynie sejmfagów
            setNumbers: false,              // Oznaczanie anonka numerem zamiast identyfikatorem
            setFaggot: true,                // Oznaczanie OPa pedała napisem "OP PEDAŁ"
            highlightFaggot: false          // Oznaczanie OPa pedała ramką
        },

        getSamefags = function getSamefags() {
            var i = 0;

            $('.posteruid').each(function() {
                var $this = $(this);

                if (!$this.data('id')) {
                    var id = $this.text().slice(5, -1),
                        isOp = $this.parents('.postContainer').hasClass('opContainer');

                    // Zbieramy najpierw informacje o pierwszych postach anonków
                    if (fags[id] === undefined) {
                        var bg = getRandomColor();

                        i += 1;

                        // Zapisujemy sobie dane do obiektu
                        fags[id] = {};
                        fags[id].i = i;
                        fags[id].id = id;
                        fags[id].isOp = isOp;
                        fags[id].bg = bg;
                        fags[id].posts = 1;
                    }

                    // A teraz o sejmfagach
                    else {
                        fags[id].posts += 1;

                        if (samefags.indexOf(fags[id].id) === -1) {
                            samefags.push(fags[id].id);
                        }
                    }

                    $this.parents('.post').addClass('anonek-' + fags[id].i);

                    // Kolorujemy, bo fajnie jest wtedy
                    $this
                        .css({
                            display: 'inline-block',
                            padding: '2px 4px',
                            color: '#fff',
                            background: fags[id].bg,
                            verticalAlign: 'middle',
                            borderRadius: '5px',
                            fontWeight: 700,
                            fontSize: '11px',
                            fontFamily: 'Arial, sans-serif',
                            boxSizing: 'border-box',
                            cursor: 'pointer'
                        })
                        .attr('title', 'Oznacz wszystkie posty anonka')
                        .attr('data-postNo', fags[id].posts)
                        .data('id', fags[id]);


                    // Numerowanie anonka
                    if (config.setNumbers) {
                        $this.text('Anonek nr ' + fags[id].i);
                    }

                    // Albo oznaczanie identyfikatorem
                    else {
                        $this.text(fags[id].id);
                    }

                    // Oznaczamy OPa pedała
                    if (fags[id].isOp) {
                        if (config.highlightFaggot) {
                            $this.css('border', '2px solid red');
                        }

                        if (config.setFaggot) {
                            $this.text('OP PEDAŁ');
                        }
                    }
                }
            });
        },

        setSamefagsOnly = function setSamefagsOnly() {
            if (config.setOnlySamefags) {
                for (id in samefags) {
                    var samefagId = samefags[id];

                    // Dodawanie informacji o liczbie postów
                    $('.anonek-' + fags[samefagId].i)
                        .addClass('samefag')
                        .find('.posteruid')
                        .after(
                            $('<span>')
                                .html(' &middot; Postów: <span class="postsCounter"></span> &middot; ')
                        );

                    // Pokazywanie liczby postów
                    $('.anonek-' + fags[samefagId].i)
                        .find('.postsCounter')
                        .html($('<strong>')
                            .css({
                                display: 'inline-block',
                                width: '18px',
                                height: '18px',
                                lineHeight: '18px',
                                color: '#fff',
                                background: fags[samefagId].bg,
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                borderRadius: '50%',
                                fontWeight: 700,
                                fontSize: '11px',
                                fontFamily: 'Arial, sans-serif'
                            })
                            .text(fags[samefagId].posts)
                        );
                }

                // Odznaczamy anonków z pojedynczymi postami
                $('.post:not(.samefag) .posteruid')
                    .css({
                        color: 'inherit',
                        fontWeight: 400,
                        background: 'rgba(0, 0, 0, .05)'
                    });
            }
        },

        highlightSamefag = function highlightSamefag(i) {
            $('.post').removeAttr('style');

            // Oznaczanie postów po kliknięciu
            if (i) {
                $('.anonek-' + i).css('border', '2px solid red');
            }

            // Oznaczanie postów na podstawie URL
            else {
                var hash = window.location.hash.split('#anonek-')[1];

                if (hash) {
                    highlightSamefag(hash);
                }
            }
        },

        getRandomColor = function getRandomColor() {
            var letters = '0123456789ABCDEF'.split(''),
                color = '#';

            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.round(Math.random() * 15)];
            }

            return color;
        },

        scrollToPost = function scrollToPost(fag, postNo) {
            var postPosition = $('.anonek-' + fag + ' [data-postNo=' + postNo + ']').parents('.post').offset().top - 40;

            $('body').animate({ scrollTop: postPosition }, 400);
        };

    getSamefags();
    setSamefagsOnly();
    highlightSamefag();

    $('.posteruid').on('click', function() {
        var $this = $(this),
            url = window.location,
            data = $this.data('id'),
            postNo = parseInt($this.attr('data-postNo')),
            nextPost;

        window.location.hash = 'anonek-' + data.i;

        highlightSamefag(data.i);

        if (currentFag === data.i) {
            if ((postNo + 1) > data.posts) {
                scrollToPost(data.i, 1);
            } else {
                scrollToPost(data.i, postNo + 1);
            }
        } else {
            currentFag = data.i;
        }
    });

})();