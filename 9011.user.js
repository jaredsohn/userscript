// Facebook bring back 'That Guy' User Script
// 2007-05-03
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook bring back That Guy", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook bring back 'That Guy'
// @namespace     http://swanky.de/greasemonkey/
// @description   brings back the unnamed guy in the upper left corner.
// @source        http://userscripts.org/scripts/show/9011
// @include       http://*.facebook.com/*
// @include       http://facebook.com/*
// @include	  https://*.facebook.com/*
// @include	  https://facebook.com/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

var pitas = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAABuCAIAAACGO0cqAAAABGdBTUEAALGPC%2FxhBQAADH1JREFUeF7tnT%2BIHEcWxudAwR5cIGUOLrhU4YVOnVnZKbNAwWEcGHHBYi4wxskhLhDCwSEuEMsFhnFgWAWGdbCwShZWwcIqWFgHC6MDBWNwMAIZZmEMc79Xr7u6urumu7p7em62t5Zmme2pqu5%2BX73v%2Fanqt79bLpej30Y%2Fv7uaX13xodHPz79ezd7Nki63dka%2FXd25fefun27%2F9N932fnCiLd27twa7fzh9zs7O3f%2FeHt0K%2Fn63a9XVb0qb4uLfnB7p%2F7OGz5d%2FYB9tFgulpO3s8mb5sfb2cnr6cHLC479lxdHp5Ozn6az2Xz2fn5wLCc9x%2FEF1%2BKKnh9zGwevJv6O3tHSkyevJxeXze%2B%2FxSP332U0%2FWXeBgzuTPBIxCd4vJoABoLmtyIkqDjAyJlXk7k0Kf5w8uxyygheMKTjikOvyzw4OZ9emFtq%2BSz9Czrwxkbtn6GEh8r67HwKDNPpHGAAzEqTDwjOA8ZiKQJ9PaUjwnWlr5%2F5lmMVVPTiEQBD8Lj%2Bx6j9M7ydWTHpPBU8FsuLS2EtlTuDq0xVXez5HCqLJR05hP3QJ7TEaJV2UQj5lvNlRQFvuf%2FrrxYWhU54MCXdGT2dzgrTX%2BR4LHLkODmd%2BOxGdo7RkC%2F8KVp1mBKgMTbzxbKgOkAFRwkSAwIDVDrgYSYmvG%2BnMwIqS5w2igcmtxoPHAGBxNAdeLjkJnicOvph9GZgSKiKdMBDWftSbGlC7l5GUlEeXjDxq%2FGQbxewlqMctgPnUzyEG6GpYanF%2BvjqdGKdVKMEHhXBtiNlr2dVQAjGE5txPkVXCjYm0w%2FTIOLh816MSRc%2F1VpgvN6CKOuVImsxfy9emdcHy%2BzHcMmqG1%2Bpc2lYy1KWBoZ%2BP6oJMMW2efsR9aPStXcCEfFTD%2F2s1QUO%2BgK59XcjHqF4mKChB%2F1YSliT4AFfXUb7URH6amCYmhBvEN5ROegOKyoeSQx4%2FUNxbyTewd91JCKBofqjq4LwzoDgemkWYBh5qlVpkc54aISMVb%2FEVZ14Q8J2WEymMw4iQc2XSO7yWCzTUD3dzvFg6lxJvu9cUn6EbAiwnfTLDpUkng3MmpWRxOJww441xYOaJE%2BT6shrPWCko6AW0GCSSVSmGvrRia9szNyT5ch8qqGb8TXoBwZWJm%2BaTu%2FuVs3f57TLrDNmOcShJhALGt9SP6AO5EUcoLlbiTm6pElYH5S07oQlECyQ2nDshyR6dWXwBljy9vZceNwsdcjSrBGZN40YbkuMbyaJFqyRHHwwn61lGryb25WvrDZoJBiSu62AB6aSAVGLhXxAM0Rd0jVzWcu6AZ5VS%2F3QcMzuEUF8Mnl9afayC0v6NlBpdIHWLqsMPuxorx9iOfJBhuzTeRmw3MTS%2BptZeU1XEQIqvuJIEsbOzhVJkAx09ansvjez5wXlsJNdd0DVzn0Jsw3zlFtK%2BvZQTJE97LauYSdI2vtXuqfGu7aBU8RXtXho5kONc6Ex59VsuJtIDBMObcdCdUgbqh86SVc5tYgyEA9xZKdz2YuFyfFtVMRUWLNxQ2IOF6F6PBIksBnefZ5mngfyldUJ0YNDyZyXAbY%2BNC7vjWKqev9KCcpEaFVUpJnwIBcrHWamsZ7ZZIXaaQAoAc37dEvjoBfJKyhrpX7o3JR87Wq1sPYgcI3Wyt2oVBrbm1UN%2FtSMurUfsjF3KLtyw9OgfjxC1EJntC7biT3w7c3NqRV7qM6nugtLciH53dNJ3qW0b1q3zQ9sU2idfhS8e%2Bx22DKG5sOT7aCvJ7WaJEkRQ1BuorD6BQPNHGeoDD7f%2FuEne%2FHYHgmMAm%2FlwZf7ey%2FOjo6TlN9X3xwFduze7N5n40%2B%2F3n%2Fw9%2F3uQ9WO8NHDvfufjx%2F944DftY37aBCEB9IvuFhg08fdFMb89Mt94kElT1yGvq%2F4%2BPmJOHvGmdzkhHOfqx6Pj%2F66V046bQaPL54cWI9gA3js%2F3hhL%2FfFBgmgGR4QhTXUJMaRy%2FiHs0f%2FPOh7tjJ%2BDo8fe9cPnusa4AF327vEfmwABnuJm4bH3Y%2Bf1vOV6Ef6swHScPF28Rj%2FMHz9%2BPNfnlXhgY8BpRI2WzwkNXIoq%2BXw1f3dsRs60PLZtycoU9kmY2zkdU3zWibxx973Z3hr2gzj9PT5ib4jK9%2BeThjkXurbuHgQq8MnutFLPz%2FYzV3r0dcHYJZcyOTH6F64Ge6Zq7NPTAfhQR7%2F%2BwifSpt5%2BQpfi2ZmDV%2FurVd6qMHD1YxCAuvx8yMsniertVi6E5mH9waJPDkPxvjetRCid4RbsB%2Fla5HswgEri9JtCcFacSP6whaWJMVwObv%2FN%2FFuy3gYXyZL3vXtdLXHg1nz9NuTVVlGnZhf%2FcsHmOmjeBRTLE6iDEVEjmjhqkvoebVnCLqiGXNCsXezZ4X2aJUXDxehDXB1DR7whvCV816svJzJKt7hBVSG0PVtD2Gw%2FHotvQrihpGe%2FueEA%2BlASkjQVT6SYMx0zrg7HIEcLbGCIwphWEbI3c%2Bb2YcP99xefMtEgVsyjv1lThtXslwO5uGMG1ShIqLN6Q9TwXUsSUhbFu2Psmrw0AsH2vOCG4amZ2%2Bhv52Vn8HVnmffJdGlO9MR%2FSPHtVOMOe59tmdXTZgfyBFhqRhVq7SZVT7UgjYZioulDfVzBPXkwMWD2ebCzI31B4MdOQgPV9DogXtbTBnmNQ34LfJNCQdt4CtL1oim%2FDCu6BEoyyeE4i5Zq3eQuXYpHsLpKQCCx%2B7YwsMI9kLcQ9LXAGCFy12pteAAcjs%2B95%2FhQckIZy8yQ20ADC7RHg%2BmIRN2VRq4KR5e9n%2F2XTAeaTYaIoKaVHawoosHFkL%2FhKMsHkDuxyN%2FQ5sJfjvhAcNUmNCmeGhpGrMklRxMTxgDE9JeP%2FJ4%2BPVjFR7mNXh7abX2Gzja60fmGi2WhBcoO9M5x1ewvJ22Do3Yp3Lth7pA5cMbn4tlSvfVCV99PvYaqkwh4KvdsZVvTj%2BcWYX7XrAfdgSA2Xb7YXeTQMfqeLi%2BkBJutuMEzL4%2FU3%2BJx0a3xHvZHbsuEPBgLaTBkwMenvYM6%2Fq7jIkZoA3unO3IrIegchd6cYYXABFZ3wm0hF2dXgzFzXBFt2QEgxf8K4yie4f4EX2rSHv9yKwlRXx4n%2FN86vqOcDe37rJzgdyS%2BKPy%2FR0E5PKV38aYgLmaPDVuqB5KDM8neyi6vYrmd%2FFf7Bm9516PIDxyEz%2FNJ8rjVW7%2Fkft%2BuOfC5gpUY3gSHrpP3vsjeFTGg%2FAJ3MU4TP9VxYNw22zc4IrbvSIKpGkeN9%2BuobhLhnQpZ4PWC08QHshFXuIz7%2FG5RC8euinQp%2FsKJdZ7cabvdo6d3DjkI291mPJkHGq6bWYJYTEmUmMQbUBL3RLHsiCOEJGdvjZoGwAhA5L1sqGGYs9qkrnQDO%2BZQeiFgipg9uC6uoDPaLKH71LyYK77K1uczJMy4bQX929P9q0iQXisdwrE0SokIHjACfHYEgngQYyESReyIarFnn6tHZYc5nUmzsgeQ%2Fe8baAf2Ppm0t3iFDkWqKZXYZD8n1mhuPRleKXN4nEd9gqNYr3X8M2DG2gZ671u1zvtsd7rtuHRmlVjvdfWolvdsf79j5WkaSrDxXqv6zUqHfCI9V63UD9ivdet0Q%2Flq1jvda1a0pmvYr3XLcIj1ntdKxjrqL%2Bb%2F0cgsd5rR3PSja%2FSksjuP2aJ9V67QLIePGK91y4YNKsHEHIldbR6qtqna3mx3mtYYifWe12rSe%2FGVyYEifVeQygksE0HPKQ4bqz3GsYiwTrUAQ9rM6r%2FXVfFPsa6r2K91wZox3qvgRTUqFlL%2FZDCZLHeazALhUPSBg8p%2FRPrvfYARvt8Saz3Gj7lG7VsrB9aFyvWe20k5fDGbfCI9V7D5du0ZTM8CsrhvLES6702cE3r6pGFmSYtpxjrvTad8o3ah%2BpHrPfaSKytG9fjEeu9thZui45VeMR6ry0E2rFLrPe6HjvcEQbbPdZ73UI8Yr3XMA9zXUpQ5e%2FGF8i2SgL19eH0dmO9183AFoRHrPe6GTC4Sj0esd7rxsAIwiPWe90uPGK9143hEeu95qo3rKsecuvi3bHe6%2FrrvQKGHi20qn190Vjv1StuC0Y7SNrjEeu9lvEogNECkljvNduR17HeqxeMppAE1feJ9V5r6%2FVVgNEIkiA8Yr3X6nqvtWCEQ9Iej1jvtWA%2FNsdXXv2I9V5X4WHPt3B82%2BtHrPe6XXjEeq%2FbhUes9%2Fp%2FwyPWe7VBSkW917K16Mt%2BxHqvsd5rv2WgW2T6NtMl1nvdrlq31Hv9H1QciwgRQp4SAAAAAElFTkSuQmCC';

GM_addStyle('#navigator {padding: 7px 0px 4px 0px !important;}');
GM_addStyle('#sidebar_content {background: #f7f7f7 no-repeat 0px -100px; !important;}');
GM_addStyle('#sidebar a.go_home {background: #3B5998 url('+pitas+') no-repeat top left !important;}');
GM_addStyle('#sidebar a.go_home:hover {background: #3B5998 url('+pitas+') no-repeat bottom left !important;}');

// 0.0.1	Initial release.