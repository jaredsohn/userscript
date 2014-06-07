// ==UserScript==
// @name        mv-infinite-scrolling
// @namespace   santialbo/mv
// @include     http://www.mediavida.com/foro/*/*
// @version     1.1
// ==/UserScript==


// Setup
var re = /(http:\/\/www.mediavida.com\/foro\/[^\/]+\/[^\/#]+)(?:\/(\d+))?(?:#.*)?/
var reResults = re.exec(document.URL);
var threadURL = reResults[1];
var startPage = reResults[2] ? parseInt(reResults[2]) : 1;
var currentPage = startPage;

// Last page unless an 'a.last' element exists.
var numPages = currentPage;
var last = $('a.last')[0];
if (last) {
    var aux = re.exec(last.href);
    numPages = parseInt(aux[2]);
}

var bottompanel = $('#bottompanel').first();
var loading = false;

// Save necessary information from each loaded page
var scrollpages = {};
var bottompanels = {};
var topElements = {};
var tokens = {}

function saveInfo(page, doc) {
    scrollpages[page] = $('#scrollpages', doc).html();
    bottompanels[page] = $('#bottompanel', doc).html();
    topElements[page] = $('#aprimero', doc).nextAll('.odd:first');
    tokens[page] = $('#token', doc).val();
}
saveInfo(startPage, $(document));

function loadNextPosts(page) {
    loading = true;
    var url = threadURL + '/' + page;
    $.get(url, function(data) {
        var doc = new DOMParser().parseFromString(data, "text/html");
        saveInfo(page, doc)
        var posts = $('.largecol', doc).children().not('.tpanel,.postit,#postform,#aprimero,#aultimo,#scrollpages');
        posts.each(function(i, post) {
            configurePost(post);
        })
        posts.insertBefore(bottompanel);
        loading = false;
    });
}

function configurePost(post) {
    // Show +1 and report button on post mouseenter event
    var post_hide = $('.post_hide', $(post));
    $(post).mouseenter(function(){post_hide.show();});
    $(post).mouseleave(function(){post_hide.hide();});
    // Clicking on +1 works
    $(".masmola", $(post)).click(function () {
        var plusOneCounter = $(this).parent().parent().prev().find(".mola");
        var pid = $(this).attr("rel");
        page = Math.floor((parseInt(pid) - 1)/30) + 1;
        $.post("/foro/post_mola.php", {
            token: tokens[page],
            tid: $("#tid").val(),
            num: pid
        }, function (res) {
            var msg = false;
            switch (res) {
            case "1":
                var plusOnes = parseInt(plusOneCounter.text()) + 1;
                if (plusOneCounter.is(":hidden")) {
                    plusOneCounter.text(plusOnes);
                    plusOneCounter.fadeIn();
                } else {
                    plusOneCounter.flash(plusOnes);
                }
                break;
            case "-1":
                msg = "Ya has votado este post";
                break;
            case "-2":
                msg = "No puedes votar más posts hoy";
                break;
            case "-3":
                msg = "Regístrate para votar posts";
                break;
            case "-4":
                msg = "No puedes votar este post";
                break;
            default:
                msg = "Se ha producido un error, inténtalo más tarde";
                break;
            }
            if (msg) {
                alert(msg);
            }
        });
        return false;
    });
    $(".qn", $(post)).click(function(){
        var pid = $(this).attr("rel");
        var textarea = $('#cuerpo');
        $('#postform').show();
        textarea.focus();
        textarea.val(textarea.val() + '#' + pid + ' ');
        $("html, body").animate({ scrollTop: $(document).height() }, "fast");
        return false;
    });
}

function isVisible(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
}

function checkCurrentPage() {
    var page = startPage;
    var middleScreen = $(window).scrollTop() + $(window).height()*0.95;
    for (var i in topElements) {
        if (middleScreen > topElements[i].offset().top) {
            page = i;
        } else break;
    }
    if (page != currentPage) {
        currentPage = parseInt(page);
        $('#scrollpages').html(scrollpages[currentPage]);
        $('#bottompanel').html(bottompanels[currentPage]);
    }
}

var timer = null;
$(window).scroll(function () {
  checkCurrentPage();

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(function() {
  if (isVisible(bottompanel)
      && currentPage != numPages
      && !$('#postform').is(':visible')
      && !loading) {
      loadNextPosts(currentPage + 1);
  }        
  }, 100);
});
