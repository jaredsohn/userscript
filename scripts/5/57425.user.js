// ==UserScript==
// @name			Wakoopa.com Status Links
// @version			0.6
// @namespace		wakoopaUserStatus
// @description		Displays links to Server status, Detailed activity and Software updates at the bottom of a page
// @include			http://social.wakoopa.com/*
//
// @copyright		(c) 2009, Rubzn (aka 9091) http://wakoopa.com/rubzn
// @license			GPL, http://www.gnu.org/copyleft/gpl.html
//
// @contributor		CSS styling by naesk http://wakoopa.com/naesk
// @contributor		Suggest web app by naesk http://wakoopa.com/naesk
// @contributor		Text links by Shirayuki http://wakoopa.com/shirayuki
// @attribution		Silk icons by famfamfam.com
// ==/UserScript==


var status = document.createElement("div");


status.innerHTML = '<div style="position:fixed; bottom:0; right:0; z-index:1000; border-radius:10px; -moz-border-radius:10px; -webkit-border-radius:10px; background:#eee; margin:5px; padding:10px 20px; border:solid 5px #ccc; font-size:9px;">' +
	'<a href="http://wakoopa.com/submit"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJvSURBVDjLpZPrS5NhGIf9W7YvBYOkhlkoqCklWChv2WyKik7blnNris72bi6dus0DLZ0TDxW1odtopDs4D8MDZuLU0kXq61CijSIIasOvv94VTUfLiB74fXngup7nvrnvJABJ/5PfLnTTdcwOj4RsdYmo5glBWP6iOtzwvIKSWstI0Wgx80SBblpKtE9KQs/We7EaWoT/8wbWP61gMmCH0lMDvokT4j25TiQU/ITFkek9Ow6+7WH2gwsmahCPdwyw75uw9HEO2gUZSkfyI9zBPCJOoJ2SMmg46N61YO/rNoa39Xi41oFuXysMfh36/Fp0b7bAfWAH6RGi0HglWNCbzYgJaFjRv6zGuy+b9It96N3SQvNKiV9HvSaDfFEIxXItnPs23BzJQd6DDEVM0OKsoVwBG/1VMzpXVWhbkUM2K4oJBDYuGmbKIJ0qxsAbHfRLzbjcnUbFBIpx/qH3vQv9b3U03IQ/HfFkERTzfFj8w8jSpR7GBE123uFEYAzaDRIqX/2JAtJbDat/COkd7CNBva2cMvq0MGxp0PRSCPF8BXjWG3FgNHc9XPT71Ojy3sMFdfJRCeKxEsVtKwFHwALZfCUk3tIfNR8XiJwc1LmL4dg141JPKtj3WUdNFJqLGFVPC4OkR4BxajTWsChY64wmCnMxsWPCHcutKBxMVp5mxA1S+aMComToaqTRUQknLTH62kHOVEE+VQnjahscNCy0cMBWsSI0TCQcZc5ALkEYckL5A5noWSBhfm2AecMAjbcRWV0pUTh0HE64TNf0mczcnnQyu/MilaFJCae1nw2fbz1DnVOxyGTlKeZft/Ff8x1BRssfACjTwQAAAABJRU5ErkJggg==" title="Suggest Web App" /> Suggest Web App</a>&nbsp;&nbsp;' +

    '<a href="http://wakoopa.com/about/status"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIzSURBVDjLpVO7a1NRGP/dm9ubpGlMioGiLdFBHCyFtksHZ6tiQZAMEbqZwTGgkw7B3cmugoOL/0ATujadlIZchCwGWlERF5XbNOc+zsPvnNvUQmMWAx8f5+b8Ht/jWEop/M/POXvodDpvOOebcRw7lEHZRBRFOr+rVCoPxxJ4nlcgwOtisVhJp6cREghSwngjh7OzRezstKp0Ok/Q7XbvaHCpVJrP5XI4OPwGrS6lglSSiBQEkYVhOL4Eutwql8vmwFiAmMAfvX0ikKdxa/2uKWMsga7RdV34vp8oC4Ebi8tGXZ2o60b/04FmFgTSl/RAtHWv+4GyMOr6v0v37k92kPRKmcuaYHFp1aiPXKgJPbBHzIkDbZlIxEn9dgRf/UT6+wGezRxCvXqsxNMN/xzBKVj8bZwm2vq0gha7jedf1oCpLHBxgZTsqUe96gzFpiHQ1kbbqC2b8ckkz81lca1gwc24oPEAEcWx0Fd/2Zbztuo9+GEc6CmkUqmk7rMuIglOFfIhfWccKiTwkIPx2CmggCAILmgH79vtNgaDAfL5PDLZNG2gZYhiAvKQSjsmhwE1m+ngBAzJTEx7E2bsWq221u/3N5rN5v7e3i7SroWrVxZQLs9DDEmdaQIYIAJyEQmwIMBRNEAcxclbqNfr25S2G43Geq/Xe0mjXdJLJS6/AM9RbwIaJyP700TCpdlY3z4CCxmsSc955clnZSnznnDz967KOrC+Dp2wc104yh6mZJzlfwCf3q+o0qkR9wAAAABJRU5ErkJggg==" title="Server Status" /> Server Status</a>&nbsp;&nbsp;' +

	'<a href="http://wakoopa.com/account/activity"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGeSURBVDjLjZLdKwRRGIf3X1wXuNAikiKfWXaVLO1SIjYlG9LYaGKxNSXWx1rnwoUo+Zhdu2vkRsp32ePCvH5nYoaGNaeemjkz5/ee85zX5W6VS4bjuc3uhSzzz4NohnlnT1nHzAlrnz5mbZEj1jJ5yHwRxsS/ROT6jiu4lEuF12+YE5pHd1O2AFHZKXVDSWYL8EcvxKQjaga27AG+ubTxUUllMlOJq9fB1Us+sAJieR5azPJ+Oc0DC2e8N3rCmyYOOFxocOGxAiTVCBhTtMJ08pYXY1i55nChwUXeDGgM7xsBovJ/dErnHC40uNDMAGynr35kj3VJKn98eQOcPzwLCib3gqcCf3l9e8QiDS6sgK8HuBCTWnxHvRtT8joqEfqC0BeEYxJ6g9AXhL4g9AXBBaF4gxUgqUZAKJYjnNMRcPFuBsCFESAqOwUurPvEdsbhQkNfkNMBFz+b4tPFnwt0gS7Qjfeq4MYvARBWbHyFiOEJrNkD4MLxEdxtsj0ALmS4MATVDm5TdTBBlf3rVNGjUHl3nMp8y1TqjYkrFMgf+hUje+AiV2IAAAAASUVORK5CYII=" title="Account Activity" /> Account Activity</a>&nbsp;&nbsp;' +

    '<a href="http://wakoopa.com/updates?category_id=all"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKgSURBVDjLlZLrS1NxGMd90ZvovdEfEBEUEhZIb0xMjdyLIuyGkiHGUFKydFKKJiRegjIyFJRwojMxzfJSaVOYeTfxtpSNuZ1tXnY2z27nsss5334uWloG9uLD7/A7z/fzPPx4IgBE7ISl3qWyelUvu9JIueZqeOdUmcCMFDgcQ3fntjSK0j/rwx+csesIZ3jbL1j6EbCPIej5DpE3QRIoBJ3LEFb74BjIxkbXVYNdrTixS8Ca3h/y6pSTfloD0UcRjCS8BJGbRdA7QRgjd1pIfhruyeewKOMdm+rCw2GBV1tXKZh7SIEVoqAjpwVS0AlIvhBSkCGyeQRcPYDogO1DNixvrveFBa6ZCkuAmSe1OtJpFVLATkJboWCIAE3+GYngI6ENgnUK+hcxfFiw9fWRT+RWEWTHEeRmyPhaMvYCgu5ZEpgkbzCCgPszBNsr8NY8iF4Ky5WnpLDArs41+zYnSPdF8OYi0qEcTHc6mF45mJ4M2Ftl4C1lYPU34KerwFNTWKmO/j2BfbiwghmvJuPawZsUsNVHgTPlEx6ANcjJeR9r5QfhWUqEJOlhbc+FoV42FBY4R0sPbPbKlz2LLeQB9aCbYkJhzpIFlkoDZ8zDRk0kRHYYrm8d0JYeEyyduUd37QH9pTBqvSOV9iy0wtmZ+VNAOm+HOeM92JtlYDQN0JYcD1BtmTf/WqRtbJ/yTxtUt9fXGhPBq5MhriVBtMYhoLkMQ1Ek5sqi3eb2O4l7buIvhlRPkmsfZ/ibax+iruosnpacQUFOOq7Fn5TUypJz/1zlnRQr5JSypRVKZRvq6htR/ewlriTH03vV7ilQ5NwaHRgchM1GY3p6Bq+bmpEii9XtWzCgqkhLuXSBTUg4L8XFxUoXk2K57obirH0L/ocfNQ8V8wE+uE0AAAAASUVORK5CYII=" title="Software Updates" /> Software Updates</a>' + '</div>';


document.body.insertBefore(status, document.body.firstChild);