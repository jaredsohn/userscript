// ==UserScript==

// @name           TradeMe order

// @namespace      http://smileychris.tactful.co.nz

// @description    Change the default ordering of TradeMe category pages to "closing soon"

// @include        http://www.trademe.co.nz/*

// ==/UserScript==



// This is the function that rewrites the url.

// If you'd rather use some other ordering, you can change the sort_order here.

function  change_a(a, cat) {

    a.href = '/browse/categorylistings.aspx?mcat='+cat+'&rewritten=true&sort_order=expiry_asc'

}



// Build regular expressions once before we loop through all links.

var top_cats = {

    'Antiques-collectables':'0187',

    'Art':'0339',

    'Computers':'0002',

    'Gaming':'0202',

    'Baby-gear':'0351',

    'Books':'0193',

    'Building-renovation':'5964',

    'Business-farming-industry':'0010',

    'Clothing':'0153',

    'Crafts':'0341',

    'Electronics-photography':'0124',

    'Health-beauty':'4798',

    'Home-living':'0004',

    'Jewellery-watches':'0246',

    'Mobile-phones':'0344',

    'Music-instruments':'0343',

    'Pottery-glass':'0340',

    'Sports':'0005',

    'Toys-models':'0347',

}

var re_cats = {}

for (var cat in top_cats) {

    re_cats[cat] = new RegExp('/'+cat+'/index.htm$')

}

var re_cat_index = new RegExp('/mcat-((\\d{4}-)+).htm')

var re_cat_unordered = new RegExp('\\?mcat=((\\d{4}-)+)$')



// Now get the links and rewrite any matching ones.

var elements = document.getElementsByTagName('a')

for (var i=0;i<elements.length;i++) {

    var href = elements[i].href

    if (re_cat_index.test(href)) {

        change_a(elements[i], RegExp.$1)

    } else if (re_cat_unordered.test(href)) {

        change_a(elements[i], RegExp.$1)

    } else {

        for (var cat in top_cats) {

            if (re_cats[cat].test(href)) {

                change_a(elements[i], top_cats[cat]+'-')

                break

            }

        }

    }

}

// Add an sort_order hidden input to the search boxes too.
var elements = document.getElementsByTagName('form')
for (var i=0;i<elements.length;i++) {
    var form = elements[i]
    if (form.id == 'sidebarSearch' || form.name == 'generalSearch') {
        form.innerHTML = form.innerHTML + '<input type="hidden" name="sort_order" value="expiry_asc" />'
    }
}