// ==UserScript==
// @name            OneNostalgia
// @namespace       Noc <noc7c9@gmail.com>
// @description     Makes MangaReader.net look like the beloved and sorely missed OneManga.com
// @include         http://www.mangareader.net/*
// @icon            ../imgs/onemanga.png
// @noframes
// ==/UserScript==

var header_css = '#adtop, #adfooter { display: none;}#logoimg, #sec_navigation { display: none;}.top { width: 760px;}#container { color: #dcdcdc; font-family: verdana,sans-serif;}input, select { font-size: 1.1em; font-family: Ubuntu, sans-serif;}input { padding: 0px 6px;}.top, #wrapper_header { height: auto; background: none;}#wrapper_header { margin-bottom: 7px;}#top_navigation { float: none;}.logo { float: right; height: auto; width: auto; padding: 0px; padding-bottom: px;}.logo a { text-decoration: underline; float: right; color: #ffffff; font-size: 10px; margin: 5px 0px;}.logo a:hover { color: #FF4A5F;}.logo * { display: block;}#top_navigation ul { padding: 5px 0 0 1px; color: #ffffff;}#top_navigation li { height: 15px; font-family: verdana,sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; padding: 0px 4px; border: none;}#top_navigation li.navpipe { height: 15px; font-family: verdana,sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; line-height: 1.5em; padding: 0px;}#top_navigation a { color: #ffffff; font-size: 11px; line-height: normal; padding: 2px 5px;}#top_navigation a:hover { background: #cc0033; text-shadow: none;}.topnav-first { padding-left: 0px !important;}#searchbox { width: 300px; height: 19px; background: #ffffff; padding: 0px; margin-right: 0px; border: gray solid 1px; font-size: 12px; font-weight: 400; font-family: sans-serif; line-height: normal; border-radius: 4px;}#searchbox:focus { border-color: #E67E00;}.ac_over { background: #cc0033; color: #ffffff;}',
    footer_css = '#wrapper_footer { background: none; border: none; text-align: center; width: 100%; color: #FFFFFF; font-family: sans-serif; margin: 2px 0px; padding: 0px;}',
    mainpage_css = 'div.c6, #tfollowme { display: none;}#wrapper_body { width: 760px;}#bodyust { display: none;}#latestchapters { width: 410px; padding: 15px;}.updates { width: 410px;}#wrapper_body, #bodyalt { background: none;}#bodyalt { border: none; padding: 0px; margin: 0px; margin-top: 1px;}#latestchapters, #popularmangas { background: white;}.updates a, .popularitemcaption, span.c5 a { color: #CC0033; font-weight: 400; text-decoration: underline;}.updates a:hover, .popularitemcaption:hover, span.c5 a:hover { color: #000000;}.updates a.chaptersrec, .chapters { color: black; text-decoration: none;}.updates a.chaptersrec:hover, .chapters:hover { text-decoration: underline !important;}#latestchapters > h2, td.manga_close, td.manga_open, .c3 .c4, .c3 .c2 { display: none;}#latestchapters h3 { color: black; font-size: 150%;}.updates strong { font-weight: 400;}.updates { border-collapse: separate;}.chaptersrec { text-decoration: none !important;}.new, .hot { width: 28px; height: 11px; margin: 0px;}.new { background: url(data:image/gif;base64,R0lGODlhHAALAPEAAP/////WAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/h1HaWZCdWlsZGVyIDAuNCBieSBZdmVzIFBpZ3VldAAh+QQJCgAAACwAAAAAHAALAAACPISPqXsR7Zhs44FQndbQIlxd1UCSmHcqZzZu5xYmb1s+sxN/IfjaLO6hWFYuYu4TMeBKrNFxUowGJ9RFAQAh+QQJCgAAACwAAAAAHAALAAACPYSPqcsWD0NL78CBMbSVDgkE3xd9lumZoqiF5AUiKzlu643K9BzhT36SsFiZH2+xcrx6mpZi44hxepNqtQAAIfkECQoAAAAsAAAAABwACwAAAjqEj6nLHH9eUNDI+8a0mnYQaMM4htiHhJ2pXe27pWKmrrDp0XPF4jlYarlEKNmGRRJiFpIIptKIShcFADs=);}.hot { background: url(data:image/gif;base64,R0lGODlhHAALAKECAAAAAP8+Pv///////yH/C05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJCgACACwAAAAAHAALAAACNJSPqYvh4gKbDchgYdyb4Wg5wCiOpGeSnwhGaPtBWTzF64xLdb7aWf3gmII/ioJjcBmXlAIAIfkECQoAAwAsAAAAABwACwAAAjScj6nLGP+aggM+gK1lAYTqdZCHld8iXio4UmiZiezcpGkoy7XHXjHN4eU2QFTENYlIlswCACH5BAkKAAMALAAAAAAcAAsAAAI0nI+pyx0PA4ODxgdylisA6UFa9D1TGaZh9TWsVrbr6qAxKLc1jom8O7NtQCaHyRJxKZeKAgA7);}#welcomebox { display: inline; float: right; width: 300px; background: white; margin-bottom: 10px;}#popularmangas, #welcomebox { padding: 5px;}#popularcaption, #popularlist { font-family: verdana, sans-serif; color: black; border: none; background: none; text-align: left; padding: 0px;}#popularcaption, #welcomebox .caption { font-size: 0.8em; color: white; background: black; padding: 3px 0 3px 5px; border-radius: 0px; width: auto;}#popularlist, #welcomebox .text { background: #EFEFEF; width: auto; padding: 0px; padding-top: 5px; border-radius: 0px;}#welcomebox .text { padding: 5px; font-family: verdana, sans-serif; line-height: 1.5em;}#popularlist .manga { width: 230px; background: none; border: none;}#popularlist li { padding-top: 0px; padding-bottom: 4px;}',
    seriespage_css = '#wrapper_body { width: 760px; background: white;}#bodyust, #readmangasum, #chapterlist { color: black; background: none;}.chico_manga { display: none;}#mangaproperties table a, #latestchapters a, #listing a { text-decoration: underline; color: #cc0033;}#mangaproperties table a:hover, #latestchapters a:hover, #listing a:hover { color: black;}#bodyust + .clear { clear: none;}#mangaimg { margin: 0px;}#mangaproperties { display: inline-block; float: none; width: 500px; height: 350px; margin-left: 10px;}#mangaproperties h1 { color: black; margin-top: 0px; margin-bottom: 5px;}#mangaproperties table a { font-size: 0.9em;}.aname { color: black; font-size: 100%; font-weight: 400; font-family: sans-serif;}.genretags { background: none; color: #cc0033; border: none; padding: 0px;}.genretags:hover { color: black;}table { border-collapse: separate;}.propertytitle { color: black; font-weight: 700; padding-right: 15px; font-size: 0.85em;}td > a { line-height: 18px;}#mangaproperties tr:nth-last-child(1),#mangaproperties tr:nth-last-child(2),#mangaproperties tr:nth-last-child(3) { display: none;}#popularcaption { background: black; color: white; padding: 3px 0px 3px 5px; border-radius: 0px; text-align: left; width: auto;}#popularcaption h3 { font-family: sans-serif;}#latestchapters ul { margin: 0px; width: 500px; background: #efefef; float: none;}#latestchapters li { padding: 3px 0px 3px 5px;}#readmangasum { border: none; margin-top: 0px; margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px; clear: left;}#readmangasum p { color: black; padding: 0px;}#readmangasum h2 { display: none;}#chapterlist { padding: 0px;}#listing { margin: 10px; width: 740px;}.table_head { border: none; color: white; background: black !important;}.leftgap { padding-left: 5px;}#listing th { color: white; padding: 3px 0 3px 5px; font-size: 100%; font-weight: 700;}#listing td { padding: 3px 0px 3px 5px; color: black;}#listing tr:nth-child(even), #latestchapters li:nth-child(even) { background: #EFEFEF;}#listing tr:nth-child(odd), #latestchapters li:nth-child(odd) { background: white;}',
    search_css = '#genrebox { float: none; height: 240px;}#wrapper_body { width: 760px; background: none;}#bodyust, #mangaresults, #authorresults { background: white}#searchcontainer { width: auto; margin-top: 0px;}#searchinput { height: 20px; width: 618px; margin: 0px; border: 1px solid gray; border-radius: 4px 4px 4px 4px; font-family: sans-serif; font-size: 12px; font-weight: 400; padding: 0px;}#searchinput:focus { border-color: #cc0033;}#genrebox, #genreselect { background: none; width: auto;}#genreinfodiv { height: auto; width: auto; background: none;}#submitbox { padding: 0px;}.genre { color: black; width: 123px text-decoration: none;}.genre:hover { text-decoration: underline;}.r0, .r1, .r2 { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlwAAABcCAYAAAC7g2uZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGAw43FlqQFNUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE6UlEQVR42u3dT2gc1x0H8O/+0WqtGJNKwQ5VAqtCQknAh9JDakqPLW2Nii9uDj0mqXMuuLkVelF8CuSiEgkKpSdDCUp1adNDlYMb6sYOxT2oPtiEtE1UJGwiyetdaaeHWWM5VWm9Xtmu9fnAwMyb2Znl9y5f3tt5mwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwhyp7/YBjx47VkzRrtdpjRVE0k9QrlUpt5zVFUWz3d7d6vd6Ndrvd3tjYaC8vL28l6e1y22qSepJGo9EYrdfrtcnJycbBgwdHRkdHU61WK7VabWN7e3sjSfvcuXNbuhoAAAAAAAAeOQvJ9EJydJf2owvJtAoBANxb2Jo9nxRLSfFOMnOr/Z1kZikpzifFQjKrUgAAA4ati0lRJEVnR+i6FbY6/XMXhS4AgIHC1vT5fqAqPhe6doatW1t/pMv0IgDw0Ko/hN/p6maSbpKRfsNIkq/t2L+lm2Sz/xldCQBwFz4/dbjb1tnl910AAAwpdAlbAMD/k6oSAADsQ6YUAQD20EJydLew1fkPbUvlW4pHVQ4AeFg9jFOKrbH8+9uIf+hv3R3tI0nG+p/RlQAAd8HCpwAA9yl0+WsfAIC9D13+vBoAAAAAAAAAAHiUVR7IU2ePHM7IgVNJku6Nn+XVT1d0BQDwqKrf9yfOt06nkTN5vlMeXzyQJD/VFQDAo+r+Lnw615rJeO9MTqwnX2kna9WkV/lQNwAADCdszWZpssjNiSLFeJGlySJzLetoAQAMNWwV48IWAMDA3hw/lDfHD/3XsPXXJ4vMt36uYADAfjGc33DNTb2Sxw9dz+OHrme+dXpH2JrJs91T+caN8ni1lrzfTLJldAsA2DeG9JZi8Wq+s5GMFsm7Y2cy15pKci0TvdfyQru8pFNJ3juQ3Kz8MC9//EelBwAErkEc7CUn1pMLzVP5SyP57kbSKMpzF0aT1errefnKW8oOAOwnQ1oWojKb342Vo1hJueTD9z+7Hbb+UU8uNX6fv139iZIDAPtNbSh3+fW1D/KtLzRzvfb1fKl75507leQ3jyU3qz/Oj679WckBAO7FfOvtXD1y+43EYrzIB18sMteaURwAYL8a7krz25XZvHcgWe/fdrWWXGh8mK0bbyg1AMCwzLdOZ/HpcnRr8ekic1OvKAoAwLDNtWbz7lNWkwcA2FNvTU0rAgAAAAAAAAAAAAAAD1Jlt8bi8pUiZxeTldWy4fBEcvJ4Ks9MVZQMAOAeA1ex8Nsiv3w7eeGryVNPlo0ff5K8/6fkBydS+d43hS4AgLtQvyNsXb5S5LXXk+lvl6NavV554rlnkycmkl/8KsXlK4WRLgCAAQNXzi4mz305qdeTv68kW9v9q2pJc7Q8d3ZR1QAABg5cK6vJE0eSlWvJZvv2CFe1mow1k0YzWflU1QAABg5cSdLpJuufJZvdcj9JGiNJb8cxAAD/s+odR4cnkrW1JL0knaTaLbd0yra1tfIaAAAGDFwnjycffZRsrifN+p3b5np57uRxVQMAGDRwVZ6ZquSlF5NLy8kn/yynEDvdcv/ScvLSi9biAgC4SxY+BQAAAAAAAAAAeHD+BVnS2HOCqRSXAAAAAElFTkSuQmCC);}h2 { color: black;}.resetbutton, .submitbutton { box-shadow: none; font-size: 120%; font-weight: 700; background: black; color: white; height: 22px;}.resetbutton:hover, .submitbutton:hover { background: #CC0033; height: 22px; box-shadow: none;}#resetbox { margin-left: 10px;}#bodyalt { border: none; background: none; margin: 0px; margin-top: 10px; padding: 0px;}#mangaresults, #authorresults { width: 355px; border: none; padding: 10px;}.mangaresultitem, .mangaresultauthoritem { background: #EFEFEF; box-shadow: none; border-radius: 0px; border: none; width: 345px;}.imgsearchresults { margin-right: 5px;}div.c4 { float: none; padding-left: 88px; width: auto;}div.c5, div.c3 { float: right; padding: 0px;}.result_infoauthor, .authorinfo, .authorgenre { float: none; width: auto;}.authorpublish > li:last-child > div { border: none; padding-bottom: 0px;}div.c7, div.c6 { padding: 0px;}.result_info a, .result_infoauthor a { color: #cc0033; text-decoration: underline; font-weight: 400; font-size: 100%;}.result_info a:hover, .result_infoauthor a:hover { color: black;}.manga_type { color: black;}#sp { background: white; margin-top: 10px;}#sp a { background: black; color: white; border: none;}#sp a:hover { background: #CC0033; color: white; border: none;} ',
    latest_css = '#wrapper_body { width: 760px; background: white;}#sp { padding: 10px 0px; margin: 0px;}#sp a { background: black; border: none; color: white; padding: 3px; font-size: 16px;}#sp a:hover { background: #cc0033; border: none; color: white;}#latest { padding-bottom: 0px;}.updates { width: 100%; margin: 0px;}h1 { color: black; margin: 0px;}.manga_close, .manga_open { display: none;}.hot, .new { float: left; margin: 0px; width: 28px; height: 11px;}.new { background: url(data:image/gif;base64,R0lGODlhHAALAPEAAP/////WAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/h1HaWZCdWlsZGVyIDAuNCBieSBZdmVzIFBpZ3VldAAh+QQJCgAAACwAAAAAHAALAAACPISPqXsR7Zhs44FQndbQIlxd1UCSmHcqZzZu5xYmb1s+sxN/IfjaLO6hWFYuYu4TMeBKrNFxUowGJ9RFAQAh+QQJCgAAACwAAAAAHAALAAACPYSPqcsWD0NL78CBMbSVDgkE3xd9lumZoqiF5AUiKzlu643K9BzhT36SsFiZH2+xcrx6mpZi44hxepNqtQAAIfkECQoAAAAsAAAAABwACwAAAjqEj6nLHH9eUNDI+8a0mnYQaMM4htiHhJ2pXe27pWKmrrDp0XPF4jlYarlEKNmGRRJiFpIIptKIShcFADs=); } .hot { background: url(data:image/gif;base64,R0lGODlhHAALAKECAAAAAP8+Pv///////yH/C05FVFNDQVBFMi4wAwEAAAAh/hFDcmVhdGVkIHdpdGggR0lNUAAh+QQJCgACACwAAAAAHAALAAACNJSPqYvh4gKbDchgYdyb4Wg5wCiOpGeSnwhGaPtBWTzF64xLdb7aWf3gmII/ioJjcBmXlAIAIfkECQoAAwAsAAAAABwACwAAAjScj6nLGP+aggM+gK1lAYTqdZCHld8iXio4UmiZiezcpGkoy7XHXjHN4eU2QFTENYlIlswCACH5BAkKAAMALAAAAAAcAAsAAAI0nI+pyx0PA4ODxgdylisA6UFa9D1TGaZh9TWsVrbr6qAxKLc1jom8O7NtQCaHyRJxKZeKAgA7); } a.chapter { text-decoration: underline; color: #cc0033;}a.chapter:hover { color: black;}.updates a.chaptersrec { text-decoration: none;}.updates a.chaptersrec:hover { text-decoration: underline;}a.chapter strong { font-weight: 400;}.updates a.chaptersrec, td.c1 { color: black; font-size: 100%;}tr.c2 { border-bottom: 10px solid white;}tr.c2:last-child { border: none;}',
    list_css = '#wrapper_body { width: 760px;}.content_bloc2 { width: auto; background: white;}div.series_col { padding: 0px; width: 365px;}div.series_col:last-child { float: right;}ul.series_alpha { width: auto;}ul#alpha_listing li { margin: 0px; margin-right: 2px; width: 19.1px;}ul#alpha_listing li:last-child { margin: 0px;}ul#alpha_listing { margin: 0px;}ul#alpha_listing li a { background: black; font-size: 100%; font-weight: 700; padding: 0px; text-align: center;}ul#alpha_listing li a:hover { background: #cc0033;}div.series_alpha { background: #efefef; border: none; border-radius: 0px; box-shadow: none; padding: 0px;}div.series_alpha h2 { background: black; color: white; padding: 1px 0px 1px 5px; width: auto;}div.series_alpha h2 a { color: white;}ul.series_alpha { margin: 0px; width: 100%;}div.series_alpha li { list-style-image: none; padding: 3px 3px 0px 5px; height: 18px;}div.series_alpha li:nth-child(even) { background: white;}.series_alpha li a { color: #cc0033; text-decoration: underline;}.series_alpha li a:hover { color: black;}.mangacompleted { color: black;}',
    popular_css = '#wrapper_body { width: 760px; background: none;}#bodyalt { background: none; padding: 0px;}#bodyalt h1 { padding: 10px 0px 0px 10px; background: white; width: 560px;}#mangaresults { background: white; width: 550px; padding: 10px;}.mangaresultitem { width: auto; margin: 0 0 10px; background: #efefef; border: none; box-shadow: none; border-radius: 0px;}.mangaresultitem:last-child { margin: 0px;}div.c2 { width: auto; float: none;}.imgsearchresults { margin-right: 5px;}div.c1 { float: right; padding: 0px;}.manga_name { font-size: 100%;}.listeyan li a, .result_info a { color: #cc0033; text-decoration: underline; font-weight: 400;}.listeyan li a:hover, .result_info a:hover { color: black}.author_name { font-size: 100%;}.manga_type { color: black;}.kutu { background: white; padding: 10px; top: -31px !important; margin: 0px; box-shadow: none; border-radius: 0px; border: none; width: 160px;}.kutu-baslik, .listeyan li { width: auto}.kutu-baslik { background: black; color: white; padding: 3px 0px 3px 5px; height: 16px;}.listeyan ul { width: 100%; background: #efefef;}.listeyan li { background: none; padding-left: 5px;}.listeyan li.nactive { background: #cc0033 !important;}.listeyan li.nactive a { color: white; text-decoration: none; font-weight: 700;}.listeyan li.nactive a:hover { color: black;}#sp { background: white; margin: 0; margin-top: 10px; padding: 10px 0; font-size: 116%; text-align: center; width: 100%;}#sp a { background: black; border: none; color: white; font-size: 16px; padding: 3px;}#sp a:hover { background: #cc0033; border: none; color: white;}',
    reader_css = '#ombanner, .logo, #sec_navigation, #mangainfofooter, #related, .shortcutkeys { display: none;}#container { color: #dcdcdc; font-family: verdana,sans-serif;}input, select { font-size: 1.1em; font-family: Ubuntu, sans-serif;}input { padding: 0px 6px;}#wrapper_header { background: #000000; height: 30px;}#top_navigation ul { padding: 5px 0 0 1px; color: #ffffff;}#top_navigation li { height: 15px; font-family: verdana,sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; padding: 0px 4px; border: none;}#top_navigation li.navpipe { height: 15px; font-family: verdana,sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; line-height: 1.5em; padding: 0px;}#top_navigation a { color: #ffffff; font-size: 100%; line-height: normal; padding: 2px 5px;}#top_navigation a:hover { background: #cc0033; text-shadow: none;}.top { width: 100%; height: auto;}#top_navigation { background: none; float: none;}#topchapter { text-align: center; margin-bottom: 5px;}#mangainfo { margin-top: 10px; color: #dcdcdc; font-size: 1.4em; font-weight: bold; margin-bottom: 10px; text-transform: capitalize;}#mangainfo a { color: #ff3f47;}#mangainfo a:hover { color: #dcdcdc;}#selectmanga { float: none; width: auto; margin: 5px 0;}#chapterMenu { width: 400px;}#pageMenu { width: 100px;}.zoomimg { background: #000000; color: #ffffff;}.zoomimg:hover { background: #cc0033; color: #ffffff;}#bottomnav { text-align: center; margin-top: 10px;}#bottomnav input { margin: 0px 10px;}#bottomchapter { width: auto; text-align: center;}#bottomchapter p { width: auto; float: none;}',
    nomorechaps_css = 'body > h1, #topchapter, #relatedheader, #mangainfo_son, #related { display: none;}#imgholder { width: 760px;}#recom_info { font-size: 100%;}#recom_info, #recom_input { border-radius: 0px; background: white; color: black;}#recom, #recom_input, #recom_info, #recom_search { width: auto;}#relateds { width: auto; height: 435px; background: white;}#emailinput { padding: 0px;}#emailsubmit { box-shadow: none; font-size: 120%; font-weight: 700; background: black; color: white; height: 22px; margin-bottom: 1px; margin-top: 1px;}#emailsubmit:hover { background: #CC0033;}.latesthotimages { border: none; background: #EFEFEF; padding: 5px; margin: 6px; height: 195px;}.latesthotimages a { color: #cc0033; font-weight: 400; text-decoration: underline;}.latesthotimages a:hover { color: black;}div.c3 { margin: 3px;}',
    banner_base64encoded = 'data:image/jpeg;base64,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',
    favicon_base64encoded = 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAABMLAAATCwAAEAAAAAAAAABTU1MAbW1tAIuLiwAiIiIAq6urAAAAAADJyckA6OjoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANVVVVVVVVVNVVVVVVVVVVVVVNVVTVVVVVTIRUWEyIjVVQFQ1QzNyVVNzVCUjQ2FVUHNSRSBwQVVRdVJlEnFBVVB1UmUXEWFVU3NURScwcVVVY1YFJlNxVVUCBFFxVWYFVVATUzVVMzVVVVVVVVVVVVVVVVVVVVVVNVVVVVVVVVMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//don't run on frames or iframes
if (window.top != window.self) {
    return;
}

function main() {
    var loc = document.location.pathname,
        parts = loc.split('/').slice(1);

    convertFavicon();
    convertHeader();
    convertFooter();

    if (loc.search('.html') === -1) { // new type url
        switch (parts[0]) {
            case '':
                changeMainPage();
            break;
            case 'search':
                changeSearch();
            break;
            case 'latest':
                changeLatest();
            break;
            case 'alphabetical':
                changeList();
            break;
            case 'popular':
                changePopular();
            break;
            default:
                if (parts.length === 1) {
                    changeSeriesPage();
                } else {
                    changeReader();
                }
        }
    } else { // old type url
        switch (parts.length) {
            case 2:
                changeSeriesPage();
            break;
            case 3:
                changeReader();
            break;
        }
    }
}

function convertFavicon() {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon_base64encoded;
    head.appendChild(link);
}

function convertHeader() {
    addStyle(header_css)

    // rearrange
    var topbox = document.getElementsByClassName('logo')[0],
        searchbox = document.getElementById('searchbox'),
        surpriseme = document.getElementById('sec_navigation')
          .getElementsByTagName('ul')[0].children[2].getElementsByTagName('a')[0];
    topbox.appendChild(searchbox);
    topbox.appendChild(surpriseme);
    
    // insert the banner
    var topnav = document.getElementById('top_navigation'),
        banner = document.createElement('a'),
        banner_img = document.createElement('img');
    banner_img.src = banner_base64encoded;
    banner.id = 'ombanner';
    banner.href = 'http://www.mangareader.net'
    banner.appendChild(banner_img);
    topnav.parentNode.insertBefore(banner, topnav);

    // insert | into the navigation menu
    var menu = topnav.getElementsByTagName('ul')[0],
        li = Array.prototype.slice.call(menu.getElementsByTagName('li'));
    for (var i = 1; i < li.length; i++) {
        var text = document.createElement('li');
        text.innerHTML = '|';
        text.className = 'navpipe';
        menu.insertBefore(text, li[i]);
    }
}

function convertFooter() {
    addStyle(footer_css);

    var msg = '&copy; 2009 OneManga.com - OneNostalgia made by Noc'
    document.getElementById('wrapper_footer').innerHTML = msg;
}

function changeMainPage() {
    console.log('main');
    addStyle(mainpage_css);

    // add welcome box
    var e = document.getElementById('popularmangas'),
        box = document.createElement('div')
    box.id = 'welcomebox'
    box.innerHTML = '<div class="caption"><h2>One Manga</h2></div><div \
class="text">Welcome to One Manga, where manga scans are made delicious! \
Naruto, Bleach, One Piece, Claymore, Hana Kimi, Vampire Knight... it\'s all \
here and more!</div>';
    e.parentNode.insertBefore(box, e);
}

function changeSeriesPage() {
    console.log('series');
    addStyle(seriespage_css);
}

function changeSearch() {
    console.log('search');
    addStyle(search_css);

    var opts = document.getElementById('options'),
        box = document.getElementById('genreselect'),
        clear = box.getElementsByClassName('clear')[0];
    box.insertBefore(opts, clear);

    var searches = document.getElementsByClassName('submitbutton');
    for (var i = searches.length; i--;) {
        searches[i].value = 'Search';
    }
    document.getElementsByClassName('resetbutton')[0].value = 'Reset';
}

function changeLatest() {
    console.log('latest');
    addStyle(latest_css);
}

function changeList() {
    console.log('list');
    addStyle(list_css);
}

function changePopular() {
    console.log('popular');
    addStyle(popular_css);
}

function changeNoMoreChapters() {
    console.log('no more chaps');
    addStyle(nomorechaps_css);
    
    var but = document.getElementById('emailsubmit');
    if (but) {
        but.value = 'Subscribe';
    }
}

function changeReader() {
    // detect not released yet or series over pages
    if (document.getElementById('recom_info')) {
        changeNoMoreChapters();
        return;
    }

    console.log('reader');
    addStyle(reader_css);

    // change the series & chapter into onemanga format
    var infobox = document.getElementById('mangainfo'),
        chapter = infobox.getElementsByTagName('h1')[0].textContent.split(' ').pop(),
        series = infobox.getElementsByTagName('h2')[0].getElementsByTagName('a')[0];
    infobox.innerHTML = ('<div id="infocenter"><a href="/"><u>OM</u></a> / <a href="' +
        series.href + '"><u>' + series.textContent.replace(/\s+Manga/, '') +
        '</u></a> / Chapter ' + chapter + '</div>');

    // fix navigation
    var navcontainer = document.getElementById('selectmanga'),
        chapter_menu = document.getElementById('chapterMenu'),
        page_menu = document.getElementById('pageMenu'),
        back_link = document.createElement('a'),
        back_button = document.createElement('input'),
        next_link = document.createElement('a'),
        next_button = document.createElement('input'),
        old_nav = document.getElementById('navi'),
        old_links = old_nav.getElementsByTagName('a');

    back_link.href = old_links[0].href
    back_button.type = 'button';
    back_button.value = 'back';
    back_link.appendChild(back_button)
    next_link.href = old_links[1].href
    next_button.type = 'button';
    next_button.value = 'next';
    next_link.appendChild(next_button)

    navcontainer.insertBefore(document.createTextNode(' Chapter '), chapter_menu);
    navcontainer.appendChild(document.createTextNode(' Page '));
    navcontainer.appendChild(page_menu);
    navcontainer.appendChild(document.createTextNode(' '));
    navcontainer.appendChild(back_link);
    navcontainer.appendChild(document.createTextNode(' '));
    navcontainer.appendChild(next_link);

    old_nav.parentNode.removeChild(old_nav);

    // add the read direction notice
    var text = document.createElement('span');
    text.innerHTML = (' <<<<<&nbsp;&nbsp;&nbsp;&nbsp;' +
        'This series is read from right to left' +
        '&nbsp;&nbsp;&nbsp;&nbsp;<<<<< ')
    navcontainer.parentNode.appendChild(text);

    // add the bottom nav
    var container = document.createElement('div'),
        back_button = back_link.cloneNode(true),
        next_button = next_link.cloneNode(true);

    back_button.children[0].value = 'previous page';
    next_button.children[0].value = 'next page';
    container.id = 'bottomnav';
    container.appendChild(back_button);
    container.appendChild(text.cloneNode(true));
    container.appendChild(next_button);

    document.getElementById('container').insertBefore(container,
        document.getElementById('bottomchapter'))

    // add the copy right notice
    var footer = document.getElementById('wrapper_footer');
    footer.innerHTML = 'All Manga, Character Designs and Logos are &copy; to \
their respective copyright holders. OneNostalgia made by Noc.'
}

if (GM_addStyle === undefined) {
    function addStyle(css) {
        var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');
        if (!head) {
            return;
        }
        style.type = 'text/css';
        try {
            style.innerHTML = css
        } catch(x) {
            style.innerText = css
        }
        head.appendChild(style);
    }
} else {
    addStyle = GM_addStyle;
}

main();

// eof
