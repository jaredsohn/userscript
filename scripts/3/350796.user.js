/*
* @Author: Kat Zhang (http://www.douban.com/people/AforA/)
*/

// ==UserScript==
// @name       Goodreads Companion for Douban Books
// @namespace  KatZhang
// @version    0.1
// @match      http://book.douban.com/subject/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var isbn,
    reviewWidget,
    ratingStats;

//Iterate through #info to get the book's isbn
$('#info span.pl').each(function () {
	if ($(this).text() === 'ISBN:') {
        isbn = $(this)[0].nextSibling.nodeValue;
        isbn = $.trim(isbn);
    };
});

//Send http request through Goodreads API
function getReviews(isbnNumber) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.goodreads.com/book/isbn?format=json&isbn=" + isbnNumber + "&user_id=23420904",
        onload: function (response) {
            reviewWidget = $.parseJSON(response.responseText).reviews_widget;
            $('#reviews').prepend(reviewWidget);
        }
    });
}

//Inject ratings' markup and styling
function stylingRatings(avg, num) {

    var numClass,
        avgRounded,
        html,
        css;
    if ($.isNumeric(avg)) {
        avgRounded = Math.round(avg * 10 / 5) * 5;
        (avgRounded === 0) ? avgRounded = '00' : avgRounded;
        numClass = 'bigstar' + avgRounded;
    }

    html = '<div class="rating_wrap" id="goodreads-rating" rel="v:rating"><p class="rating_self clearfix" typeof="v:Rating"><span class="ll ';
    html += numClass + '"></span><strong class="ll rating_num " property="v:average">';
    html += avg;
    html += '</strong><span property="v:best" content="10.0"></span></p><p class="rating_self font_normal clearbox">(<span class=""><span property="v:votes">';
    html += num;
    html += '</span> ratings</span>)</p><img src="https://djgho45yw78yg.cloudfront.net/assets/press/logo-5aea6e61d29a47cb9ebfabec5d3aa1ca.png" alt="goodreads-logo"/></div>';
    css = '<style type="text/css"> #info { max-width: 145px; } .subject { width: 270px; } #interest_sectl { width: 295px; } .rating_wrap { float: left; width:140px; } #goodreads-rating { background: #F4F2E9; padding: 5px; width: 120px; } #goodreads-rating .rating_num, #goodreads-rating .rating_self span { color: #215625; } #goodreads-rating>img { width: 80px; } </style>';
    $('#interest_sectl').append(html);
    $('head').append(css);
}

function getRatings(isbnNumber) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.goodreads.com/book/review_counts.json?key=Ht84o1Wo0CHLKIrI4GfR1g&format=json&isbns=" + isbnNumber,
        onload: function (response) {
            ratingStats = $.parseJSON(response.responseText);
            //console.log(ratingStats.books[0]);
            var avgRating = ratingStats.books[0].average_rating,
                numRating = ratingStats.books[0].work_ratings_count;
            stylingRatings(avgRating, numRating);
        }
    });
}


//Let's kick off
getReviews(isbn);
getRatings(isbn);



