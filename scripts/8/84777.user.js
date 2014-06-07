// ==UserScript==
// @name           New Old Digg
// @namespace      http://userscripts.org
// @description    Makes new Digg look like old Digg. Please see script page for notes. http://userscripts.org/scripts/show/84777
// @include        http://digg.com/*
// ==/UserScript==

/* version 8/31/2010 2 */

var loggedIn = document.getElementById("header-logout") !== null;
var mainListing = document.getElementById("story-items") !== null;

var style = document.createElement("style");
style.type = "text/css";

style.innerHTML = "\
body {background-color: #E5ECF3; margin: 0 auto; width: 1200px; font: arial, helvetica, sans-serif}\
.header-wrapper {position: relative; margin: 0px auto; max-width:1200px;margin-bottom:7px;-moz-border-radius-bottomleft:6px;-moz-border-radius-bottomright:6px}\
.header {position:relative; width:100% !important; background:#1b5790; height: 109px; padding-left:0; padding-right:0;-moz-border-radius-bottomleft:6px;-moz-border-radius-bottomright:6px}\
#h,#h a {height:45px;line-height:42px;vertical-align:middle;color: #d2dcf3;font-weight: bold;font-size:12px}\
#h-pri {position:absolute; top:50px; width:100%; background: #b2d281; float:left; font-size: 13px; height:32px}\
#h-pri a{position: relative;line-height: 22px;display: block;float: left;color: #522D0A;word-spacing: -0.1em;margin:0 8px;padding:0px 4px;top:5px; font-weight:bold;}\
#h-pri a.current {background: #DDEEC2;-moz-border-radius: 6px}\
#h-sec {width:100%;position: absolute;top:82px; background:#7aa13d; float:left; clear:both; font-size:11px; height:32px;-moz-border-radius-bottomleft:6px;-moz-border-radius-bottomright:6px}\
#h-sec a{position: relative;line-height: 22px;display: block;float: left;color: #522D0A;word-spacing: -0.1em;padding:0 12px;top:5px; font-weight:bold;}\
#header-search-form {margin-right:10px}\
#time {float:right;vertical-align:middle;margin-top:7px;font-size:11px}\
#time a {border: #fff 4px solid; padding: 5px; background: #fff; float: right; height: 20px; color: #e37400; font-weight: bold; word-spacing: -0.1em; text-decoration: none;height:10px;line-height:10px;}\
#time a.current {background: #e37400; color:#fff;-moz-border-radius: 6px}\
.column-container {width:100% !important}\
.columns.double{padding-left:0px}\
.columns.double-span { width: 100% !important}\
.columns.wide {width:auto}\
#main-column {padding-left: 20px; max-width: 840px}\
#right-column {padding-right: 20px; width: 300px}\
#search-menu {margin-top:0px;-moz-border-radius:6px}\
.page-wrapper {padding: 5px 0 !important}\
.story-item {padding-top: 12px}\
.digg-count {left: 0px;top:3px}\
.digg-btn {height:52px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA0CAIAAACoxpfFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAikSURBVGhDxZlZd5RFEIbnn%2Fn3vPe4i4q74gYo7rsoLoASVBT3C%2FXoTZKZyWQGtHyq3q76epYkoOcop07S019%2F1c%2FU1tVhZP2%2F67%2FZ7JxNX7bJszZ%2BxHbuse3b%2Fy8ZNbA%2FJzb70Hbvt527B9m%2B07bv%2BL8kyMCavmHOcbNyl22X3G3bkn7yZhUO64MMay2p61VvHIsAX0vu3ST1dB33SP2%2BYGTE1ooTe4euju%2BxnXtD7nPZPZZyvysZJOe1rL3Cu12oHDUeecj7Il47XERzzKURPGC7D6Yct91eap41QawXG%2BWRe%2FmCkU2eO4osLdSYCgiUh0Ie3iR6xBpRBmKDkxWP4BulhWX2deGLolE0QoHjEdt9NOQxl%2FHjG0SP2jLW81aCos11yoQHyuFkK1jFVDRP2PjJkKeWRZM8DeiGKL6w4g3AiQzbKg56CVPtYKreTuwkGlBO2PjpkGdCKM4SfdQj1rAyKHdBxMxpPzQPfOu7HxMZD4DohdeO2w5MchxKUc0GohHHczZ%2B3iYnU07ZRJIzPPU1Yg1KNLieRES%2F7yLEVYGMZ32WdfE0ftTGclwYafK0TZ7xjJkI6JRNT9v0hZAXQ87kQJOnE5T1vMW78MmE6EQz37mLvyHTPWlGa2mfvnMs%2BQ5dPRNWAUgcL4W8bNNXloUZPQpW1rstk8%2Fth05FYeffpbpzHDLVISW5sGQqxRPu47s%2BG3p7JtG8atPXbO%2F1kDdS4iPz%2FpQ1rFzhk3%2FRrCxRCst4g0DW16SIqsFUwsIR%2BI7vjYPYQ0wCguZN23vL9t5eFmaY56kQkw8NrgdtxJ%2Fg0nhDcrTqCJlGMCHgZ1S5zTFVYeE%2BvBNMU5gE9I7tvRvy3rJokqeByPrG95JN5FzBYbyMPE8LdheGC2QdE4lTHiStylQTmaqYsJBo3rfZWZt94D3BkjBz1p%2F6Glayvvho%2Fs64%2BcXnyZuebWmrEv0YZFXHI9gnJzIBT0bqpan2cB%2Feectm79jsPZvBFED752z%2FI9v%2F2PY%2FSWHMzLlgZQ0rWS%2F7oUHOxfxoTuN52naejfo8yoMli2erCxFY61g4yLfBTuwKk4A%2Btf3ztn8hhTEzzH%2Fsa3wl6zHeJrjyLPv2ZXn8BGSYSqVB1so09IKEExXsYS380kwlO7G3gC7a%2Fmcu8%2FjpwgzzPGXNR8EXxnPPhuVa2KEft6qgsG8P9yRkOuMOjvd1rBmmwirsDcTnNr9k8y2bX05hfMnn%2FSlrPjXWHwi3MSfw7AnI%2FFc7bVarAwVJ1sIRCiy%2BPVgYQ3YS0xchX6bo45Y%2FbfY7P8B5WoRb0ewFL6rdUkK00wwyHb2ccSpaZLXKOqHKyytY8iBYmER2Augrm1%2Bx%2BdcpjJlh%2FrKv8ZWsB%2B6TZjnBodn1swvZmpaDIU9byKJBaOdg1dJXo5BStN62GeEVIe%2FxHk4kntyDgbW4YouvbfGNLa6mMGYGvoDzlelWzwklRJYSL8VpuRZzGMjPsehpXTiedTBHOa0a4cmYfmwhf9HmxBZb4rKvEutbW3yXwjjg3HKsYWWaDQ1DwG2sI0oIh4MMQETWyirfop6XqREr4QWWYktYmAqU723xQwpjZpgvuN6nmQ1ehBOuTogh5k5BpqZK1iK8sG36cSgTZH5FWPqR2HLbyFqBde2nhGMmLOfxp4AjGyra0FZFpI4H%2BVQB5ycEZEQ9RTWw9hReVevDj17lFWHyYxhs0fvxe7sG1o8pUMpsCjj5lLfkU%2FSgLSvccDawb8JFbzLKXi86iBZeFfg9WaTkZrLv1sjSZhvI0NOTVSrUwaXe7gxkACLVaQXW0ilU5b5LyaUggyPiDMu5WxmLrEItk9TLWxwMMxzan1rh0%2BWuDjIYEbJXzVZgeeDn4egRFq7086cPsgr%2FJGtJsELWlY9WeDkVlKQB11JBAUeFa10nZFgron5aPSAWphiKTLFfZ1GRET1VxqpkiKkMRgYoPSsJ6rxKs7GL7yWfUnvVLDkcZFRhndlB5k2OTu6ztk91lSuHAnvbrbcQ0f5zqcYCJz4N8GPW2yED%2BpIbJz363TPsxY7ZZqoT3nt9lF28OuYOa%2Bhz1OQo%2FC%2BJbFP1F5OwOjI3mOotZFVyI0OHHingPIrCcm6jNyHzXxle0am2NpU4GAwGUDA1shh74Wjzi6thRWfKGX8kV2rGP7YzNBqQlgcqH4q2gvNbBWS6XKijrwY6GsMMslDqp3jyXdau8dMP8qT5Jvg8vHKl1mAwbz1Sj1ojhVrlQbXmkLhAplEweTxWSvIaBuf980XWtM97stZliLJYqf4rNotjQN68gM7QjP6E09bt6uD3Hcji2uNh2F03lrr7IJsTZ141ZIP46W6Kw4BjKjjyZ8zIWhVkW%2FERDX27u3JjUDY04S97GuHsugIpwoYeP2yG0hVvBplHkkMMZH5W5ozo5U19q9bo9neF8qluNE0g0wgaiZy4cvW4mCHc28wzdDmeYHLjdVHo%2Fa1mAksteJlNeRDbNbcWxrn4a2gDgkmi8OK1uhSpt0YvscK3VzfbN9nyndsvS6uspXpB%2BKv5XiNjlyHgCsAHkMXn4baoa2N3UWsRpptIfxkZjJEB15yYZqsga95sJW2INt2vdAVclVFOyUIlvFA3NsU%2BZHVN6m3W303qkiImibDiQtWUyKHlU8GtCmSaqntsDfSy7o%2B9wW4ES4gb4cqnPd%2F67hcg02xdYvsBYSGJ8GqXpYqwFWstBdnyDU%2BW01WqAk6aN%2B7L5BZkul7LWRulwquuu%2FS0Eu5Oh0ssaz7t3VqePWDTxdVR0igUDpK6f5eDKqSotJukNT%2FrbpWqw7fbsuu%2FQlZVoLbfOCimg5xY3jzcrenZ4a8N69t9aX%2BOIdODPq0OH%2FcEXloPlX7xDW%2FBf4WZQaYXjtxjfUH9ueDwwU1qvvaL%2FbUQWbzpl5x%2FKTSxkn%2Bs56pd%2F11YQdYUld7%2FfvCtXfvZrv9hf037%2Fzn%2FG%2F%2FXlvYQi3tbAAAAAElFTkSuQmCC)!important}\
.digg-it span{padding:0!important;position:relative;top:23px;left:-4px;width:51px;height:25px;color:transparent!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAZCAIAAAAT9IEtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAGJSURBVFhHzZfLTgIxFIbnEXgpYty7g9fgGTCs3PgKrE1IfATWLDBRF0QDJmRMZpyAXDro%2BJeDtTlth5uQMzkkh9JJP%2F5zaRsVRZGvvtPP%2FC1dDuK5HIuAFWcqmeYL9QVKIQ8EiqAWsIQAGQxNhiCKUovgNBk%2B0gTbkA2TpUSycRzJJRulQc0a7Zdqsw9rd9%2FPrOsAmpWQgYmAjFPOV6nfwzDHOAf%2Fnz3Ieq%2FTrcscD%2FTXNdaaKe%2BSQLGlorDCXEQCMsY0c381E%2BxXGIPWzFsBBOESM1wvhD1oq%2BiNdUjmYDRdslZndHXzeHH9wIjL1z6KTK5mO5JBs9rt82XrXJphd%2FJ2jVCyu3nmTWc3iCzZvWVhp7XeN71kcZLddTdt1lQlOU%2FDj63tw0yg9kaPXQHuIK9NkIV2p%2FlCZZOZaxjfnYwpyoBK%2Bp%2FWTOi%2BGYrmXqqcYrJszQRGE2dsnLQl5hnuJbidyCKDWsDCXQ43Ot3PEFAYHJw7yP%2F9ykaUmbN2%2Fv9%2BiiBCLWChqn4AToW8Y5S%2BhKAAAAAASUVORK5CYII%3D)!important}\
.digg-dugg .digg-it span {background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAZCAIAAAAT9IEtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADtSURBVFhH7ZfbCsIwEETz%2F3%2Fgz%2FVNkDxYBEVt1DgxGNJLyBT7MEhCCiVstyezuewa7717vPqL2%2Ff3zl51ugGWPQ3Hs7sNT1CKNAhkoBawRIASRiBDEKXUinCBDI%2BaYNpkB6uq2Z%2BQ7T7t90XJ%2BOlWacZ4ZLgZPxRZdJQa%2Fp27nr%2Fnlsm49HlpJnWyRYgNBxvZd38kUUtxry5H4Wgyt9N8Byyua36Q2psMWVX5aJAfdXk00%2BcM0CjX2PBGnxwuiXhyjjBTbbkGo9LYpmm2UjPk2Mi0FfMz1CWoTrTIoBawUMuhogtkOh1BhFrAQvzfHjweKbh39CIAAAAASUVORK5CYII%3D)!important}\
.story-item .digg-it span{top:24px}\
.comment-digg {background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wYNETIGpzKTSQAAAR9JREFUOMutlDFrwlAUhT9jtOAYwTEIQSd%2FQAadu%2FUvJFmke9Y3urqXLsXNOZPOOvgDOlkEcSzoppCWcrtEiSaG19CzPd47551z77sPEUFEfBGZichR9HFMOL6IUBERH3iZrMYP2%2F2a758vdFCr1mk3u3huGAPPFRGZTVbjx4%2FPd8qg0%2BrhueHcAAbb%2FZqySLgDE2jkxbEth2FfAfC6HLE7bHKFEm7DuHfTsK9QUYCKgotgEQzdCLblFO6bOiQVBYye3i7rvKgZoTNBRUFGLF27231TN1rakXa0PNw6Ki1U2pFtOVcF%2FbMjFQV3D6e7lid0qlXrV697d9hkulI0vMDJABbtZrf0rCXchQFMPTeMO63eWV3bSTL5MTDlvz62X0qK6lETGCnKAAAAAElFTkSuQmCC)!important}\
.comment-bury {background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wYNETE33cHAsAAAAP9JREFUOMutVDuKwzAQfTGCxb5ASOF7uEmhagtfYEqXPlKOMBcQZCsXaXyPFEEHSIIh8LbRBuVjr2zyKhXzPjNiBiRBsiG5J3lmOs6B05DEimQDYOdEvk59j9v1ihSYPMemqlCrDgDaFcm9E%2Fk%2Bdh2WoLQWtepPBmB76nssReBuDYAibic4jBKdCOL0gVuY58Ja9aX4ncluvX6c2TvXOFFMmJqjSYmf9ItzEs0W%2BkgiJzKaqPV%2B1ORF6Nh1d3JpLVrvkwaeTcWd0575r8CJoPX%2B%2Fp4Supg8L8aWNW51bHkBXDIAh01VLd61wD1kALRWHUpr%2F9STz0hYmQGA4lOH7RftcvZYE2Z%2F7QAAAABJRU5ErkJggg%3D%3D)!important}\
.comment-dugg .comment-digg {background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIHBMFN45kemwAAAEBSURBVDjLxZRBcoIwAEUfMSgYEMdNb8D9z5MbuGlBCCCB0IWj1Y7Y1DrTv8tM8vN%2B8pMAYF%2BYKQoXPKPOjrxtVRDsCzOFwYQxNW1jqA%2Bll0GyyYjXCqUS7BQgo3DBoSwoP94ZbO9N0tQV%2FfHINDqy3Q4B0DaGwfY457yNnHMMtseYCgAJzMbJ8xwArfWsWdsYgBPRnInWGq31xfCRBC%2BS9Jn0nepeVOl7Ltfjc%2BxfE11v8Kdo94ieNvo%2FovOCRwSzt5ZsMpq6unkic22%2BKaEQrKL4q5DxWiHDJUL491MIgQyXKJWeiDo7olTCNDqMqS5v5yetohilUtQmpbMjwas%2Btk8weYWmUyzA4QAAAABJRU5ErkJggg%3D%3D)!important}\
.comment-buried .comment-bury {background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oIHBMGGuCWddoAAADcSURBVDjLzZQxjsMgEEWfR1QuENfAEkfIPVJmT7ZtjrB9joCEr4GQkpLZxrtaOTFGVor9FcX%2FwxsNDACqelHVL1W9a7%2FuS%2BYCMCyHz5QSpRRqrfRIRLDW4r1nGIYPAc4pJXLO3UUAaq3knJnnGeAswKmUwlEt2ZMBxjVJCGEzGGN8IgNGszaGEJ7Mry5Ze0zL%2FCqwJdODf7jQ%2FyKKMW4StQaxS7Q3xd%2BXzptk9gx%2FW22RGeAhImPrn7UKiAjAQ4CbtfZwS0v2JsDVe49z7qd69xpxzjFNE8CVdy22b5A32iuuaiw3AAAAAElFTkSuQmCC)!important}\
.current-user {margin-right: 10px}\
#module-invites, .main-navigation, #header-settings, .loggedout-navigation, .sidebar-menu, #page-topbar, #feedback-bar, .ad-river, .digg-btn-bottom, .digg-count-label, .digg-btn-icon {display: none!important}\
";

var htmlHead = document.getElementsByTagName("head")[0]
htmlHead.appendChild(style);

var link = document.createElement("link");
link.rel = "shortcut icon";
link.href = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FAJmZmf%2BZmZn%2FmZmZ%2F5mZmf%2BZmZn%2F%2F%2F%2F%2FAJmZmf%2BZmZn%2FmZmZ%2F5mZmf%2BZmZn%2FmZmZ%2F5mZmf%2BZmZn%2F3d3d%2F%2F%2F%2F%2FwCZmZn%2F%2BPj4%2F%2FLy8v%2Fu7u7%2FmZmZ%2F%2F%2F%2F%2FwCoqKj%2F%2F%2F%2F%2F%2F9vb2%2F%2FY2Nj%2FqKio%2F9LS0v%2FQ0ND%2FmZmZ%2F93d3f%2F%2F%2F%2F8AmZmZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F5mZmf%2F%2F%2F%2F8AqKio%2F%2F%2F%2F%2F%2F%2Fe3t7%2F29vb%2F6ioqP%2FV1dX%2F0tLS%2F5mZmf%2Fd3d3%2F%2F%2F%2F%2FAP%2F%2F%2FwCZmZn%2FmZmZ%2F5mZmf%2F%2F%2F%2F8A%2F%2F%2F%2FAKioqP%2F%2F%2F%2F%2F%2F4uLi%2F97e3v%2BoqKj%2F2NjY%2F9XV1f%2BZmZn%2F3d3d%2F%2F%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAJmZmf%2F%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwCoqKj%2F%2F%2F%2F%2F%2F%2BXl5f%2Fi4uL%2F3t7e%2F9vb2%2F%2FY2Nj%2FmZmZ%2F93d3f%2F%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwCZmZn%2F%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8AqKio%2F%2F%2F%2F%2F%2F%2Fp6en%2F5eXl%2F%2BLi4v%2Fe3t7%2F29vb%2F5mZmf%2Fd3d3%2F%2F%2F%2F%2FAJmZmf%2BZmZn%2FmZmZ%2F5mZmf%2BZmZn%2FqKio%2F6ioqP%2F%2F%2F%2F%2F%2F7e3t%2F%2Bnp6f%2Fl5eX%2F4uLi%2F97e3v%2BZmZn%2FmZmZ%2F5mZmf%2F%2F%2F%2F%2F%2F4uLi%2F9fX1%2F%2FPz8%2F%2FzMzM%2F5mZmf%2F29vb%2F3t7e%2F97e3v%2Fe3t7%2F2NjY%2F9jY2P%2FY2Nj%2F2NjY%2F5mZmf%2BZmZn%2F%2F%2F%2F%2F%2F%2FDw8P%2Fi4uL%2F19fX%2F8%2FPz%2F%2BZmZn%2F%2Bfn5%2F5mZmf%2BZmZn%2FmZmZ%2F5mZmf%2BZmZn%2FmZmZ%2F9jY2P%2BZmZn%2FmZmZ%2F%2F%2F%2F%2F%2F%2F5%2Bfn%2F8PDw%2F%2BLi4v%2FX19f%2FmZmZ%2F%2Fv7%2B%2F%2BoqKj%2F%2F%2F%2F%2F%2F%2BXl5f%2Fe3t7%2F1tbW%2F5mZmf%2FY2Nj%2FmZmZ%2F5mZmf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fn5%2Bf%2Fw8PD%2F4uLi%2F5mZmf%2BoqKj%2FqKio%2F%2F%2F%2F%2F%2F%2Ft7e3%2F5eXl%2F97e3v%2BZmZn%2FqKio%2F6ioqP%2F%2F%2F%2F8AmZmZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Bfn5%2F5mZmf%2F%2F%2F%2F8A%2F%2F%2F%2FAKioqP%2F%2F%2F%2F%2F%2F9fX1%2F%2B3t7f%2Fl5eX%2FmZmZ%2F93d3f%2F%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwCZmZn%2FmZmZ%2F5mZmf%2F%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwCoqKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F5mZmf%2Fd3d3%2F%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8AqKio%2F6ioqP%2BoqKj%2FqKio%2F6ioqP%2BZmZn%2F%2F%2F%2F%2FAP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F8AAIIAAACCAAAAggAAAMYAAADuAAAA7gAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAgwEAAMcBAAD%2FAwAA%2F%2F8AAA%3D%3D";
htmlHead.appendChild(link);

var header = document.getElementsByClassName("header")[0];
header.className = header.className.replace("size-simple");

var hPri = document.createElement("div");
hPri.id = "h-pri";
hPri.innerHTML = "<a href='/news/technology'{0}>Technology</a><a href='/news/world_news'{1}>World</a><a href='/news/business'{2}>Business</a><a href='/news/politics'{3}>Politics</a><a href='/news/science'{4}>Science</a><a href='/news/gaming'{5}>Gaming</a><a href='/news/lifestyle'{6}>Lifestyle</a><a href='/news/entertainment'{7}>Entertainment</a><a href='/news/sports'{8}>Sports</a><a href='/news/offbeat'{9}>Offbeat</a>";
if(document.location.pathname.indexOf("/technology") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{0}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/world_news") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{1}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/business") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{2}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/politics") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{3}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/science") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{4}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/gaming") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{5}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/lifestyle") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{6}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/entertainment") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{7}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/sports") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{8}", " class='current'").replace(/\{\d\}/g, "");
else if(document.location.pathname.indexOf("/offbeat") >= 0)
	hPri.innerHTML = hPri.innerHTML.replace("{9}", " class='current'").replace(/\{\d\}/g, "");
else
	hPri.innerHTML = hPri.innerHTML.replace(/\{\d\}/g, "");

header.appendChild(hPri);

var hSec = document.createElement("div");
hSec.id = "h-sec";
hSec.innerHTML = '<a href="#">Popular</a><a href="/news" style="border-left: #90b557 1px solid">News</a><a href="/settings" style="border-left: #90b557 1px solid">Settings</a>';
header.appendChild(hSec);

var h = document.createElement("span");
h.id = "h";

if(!loggedIn)
{
	h.innerHTML = '<a href="/register" style="padding-right:12px">Join Digg</a><a href="http://about.digg.com" style="border-left: #5481ac 1px solid;padding:0 12px">About</a><a href="/login" style="border-left: #5481ac 1px solid;padding-left:12px">Login</a>';
	var temp = document.getElementById("header-logo");
	temp.parentNode.insertBefore(h, temp.nextSibling);
}
else
{
	h.innerHTML = '<a href="/logout">Logout</a>';
	var temp = document.getElementsByClassName("current-user")[0];
	temp.innerHTML = "";
	temp.appendChild(h);
}

if(mainListing)
{
	var base = document.location.pathname.replace(/(?:(?:\/recent)|(?:\/24hr)|(?:\/week)|(?:\/month))/ig,"");

	var title = document.getElementsByTagName("h1")[0];
	var time = document.createElement("div");
	time.id = "time";
	time.innerHTML = "<a href='"+base+"/month'{3}>30 Days</a><a href='"+base+"/week'{2}>7 Days</a><a href='"+base+"/24hr'{1}>Top in 24Hr</a><a href='"+base+"'{0}>Most Recent</a>";

	if(document.location.pathname.indexOf("24hr") >= 0)
		time.innerHTML = time.innerHTML.replace("{1}", " class='current'").replace(/\{\d\}/g, "");
	else if(document.location.pathname.indexOf("week") >= 0)
		time.innerHTML = time.innerHTML.replace("{2}", " class='current'").replace(/\{\d\}/g, "");
	else if(document.location.pathname.indexOf("month") >= 0)
		time.innerHTML = time.innerHTML.replace("{3}", " class='current'").replace(/\{\d\}/g, "");
	else
		time.innerHTML = time.innerHTML.replace("{0}", " class='current'").replace(/\{\d\}/g, "");

	title.parentNode.insertBefore(time,title);
}