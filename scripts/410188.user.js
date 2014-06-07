// ==UserScript==
// @name           SDMB Old Smileys
// @namespace      SDMB_Old_Smileys
// @description    SDMB Old Smileys
// @include        http://boards.straightdope.com/sdmb/*
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

(function()
{
	var animated_rolleyes = false;
	var rolleyes_uri;
	if (typeof (GM_registerMenuCommand != 'undefined')) {
		GM_registerMenuCommand("Toggle animated rolleyes (must reload page)", function (){
			GM_setValue("animated_rolleyes", !animated_rolleyes);
		});
		animated_rolleyes = GM_getValue("animated_rolleyes");
	}

	if (animated_rolleyes == true) {
		rolleyes_uri = 'data:image/gif;base64,R0lGODlhDwAPAPQaAAAAANbm/////5TOQjqEEKXeSnO1MSl7CEqUGZzWSjqMEDGEEGutKYzFOkKMEEKMGWOtKXu9OoS9OpTWQlqlISFzCCFzAFJSUhlrAFKcIQAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAaACwAAAAADwAPAAAFc6AmikBZjqhWRgZDIScKDNPQRC6yACOQFIBLomEIEg48FTAQmAGYAKRq8hQImgFrE1MaPEtYMIALaCRMZfSBHGl4y7jSokJmGCISVk5xsHBVEAyCEC8OFXRJABmLaAB0fyQODw4ECwePST1Rl34xKSpoKSEAIfkEBQoAAgAsBAAFAAgAAwAAAggUHnYbfNZAAQAh+QQFCgADACwEAAQABwAEAAACCgwwYHcrHF4waRYAIfkEBTIAAwAsBAAEAAgAAwAAAgjEPoaBw8IOLAAh+QQFFAABACwKAAoAAQABAAACAkQBACH5BAUKAAMALAQABAAHAAQAAAIKTDBgos0A40EwFAAh+QQFCgACACwCAAIACwAHAAAEIlBIIAWtCaRq7ihgMYwGcRRACgwqcFRCAATwVF/SWCGKFAEAIfkEBQoAAQAsAgACAAsABgAABB4wyCYDqjhXkE3gQSEWwTAYRAgCw3oESZwEDYMsRwQAIfkEBQoAAgAsAgACAAsABgAAAxUoCircMKoShyALaKcZCErwhV7HbQkAOw=='
	} else {
		rolleyes_uri = 'data:image/gif;base64,R0lGODlhDwAPAPQYAAAAABluACN0ACp7DFNTUzOCDDqHETqJEUCMFkaRGVWdIFqhI2SpKmuuLHe5M3u9N4HBOYnIPJPQQ5fTRZvWSKjhTtbo/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKABgALAAAAAAPAA8AAAVwICaKQFmOKFY+TrMkJwpIkxQ9blIAI0BVAAIl4ggaBjwV0CQxAZCqCcBSolKngECpablcrF6qFhChTKmR83P8iDTJuFJBMG44HhBW7jCg8wAMDYIMLwgAfiQKik6HAVo9CJEGBX2OST1PfX6XKYwpIQA7'
	}

	window.addEventListener('load', function() {
		var images = document.getElementsByTagName('img');
		for (var i = 0; i < images.length; i++) {
			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/rolleyes.gif', rolleyes_uri);

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/smile.gif', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAflBMVEXAwMAAAACCZgCFaACIawCJbACJbQCNcQCOcQCQdACSdQCUdwCZfACdfwCfggCgggCihQClhwCpjACqjQCsjgCtjwCxkwC1lwC2mAC5mwC8ngDBowDFpgDGpwDNrgDQsQDRsgDTtADYuQDevgDgwQDjwwDqygDtzQDz0wD31wBBwt/MAAAAAXRSTlMAQObYZgAAAI1JREFUCB0FgDFKBEEABKtnN7hTLhD8gML5/+eYGqiJIKKBrNNTEgACIECA8GhX3xECuUY72+NTNnIdI4i6H+yQPPOUvHIfGHlUUEHPSR62RDvb42/+7pREq0sXO8sRl22rDNqXOdu23y0bPzeXt9vV9us0lyF3Ix8Ap1kN5BLVzqUECGeXXQgBIAAC/ANkLmjbVUdosQAAAABJRU5ErkJggg==');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/confused.gif', 'data:image/gif;base64,R0lGODlhDwAWAPQbAAAAAGYAh2gAimoAjm0Akm4AlHIAmXQAnHgAo3sAp34Aq4AAsIMAtIYAuIkAvowAwY0AwpEAyZQAzpkA1Z0A254A3aAA4KUA6KcA66wA8q8A9wAAAAAAAAAAAAAAAAAAACH5BAUAABsALAAAAAAPABYAAAWS4LYBokiW56iqJ5muZgm/tGzfco3iPA78P96PMpFAGsHcZWmZRBwLRApwyWgyF4qRkTC0MJofpiL5dV2V6u9CNhsGv4lleWk+owbBTzKhVCpFRwoHBXoAEBESihFHC10DAT8NDxCVDg2OBgQCkSMLCwxAPwWQLQgJAAkIB5oAAZ0mBrIGBZuvLyMAA5C3uCiiNiEAOw==');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/eek.gif', 'data:image/gif;base64,R0lGODlhDwAPAPQcAAAAAJ4AAEBA00FB1EdH10lJ10pK2E1N2lBQ21JS3FZW3lpa4F1d4WNj5GRk5Glp52tr6G5u6XJy63p673x88ICA8oWF9IiI9Y2N+JSU+8LP9P///wAAAAAAAAAAAAAAACH5BAUAABwALAAAAAAPAA8AAAV5ICeKQFmOKFdaVjVJJwpcV4ZdbuQAI2BpQNsPyOCpNJukBoNU8gATJGCzlFITpWiSemlSESVJFNgaaxSHEkRMoUxekMYCUSg1HhEJzM5IHAhPDA4ODyYLaIAkCgsMRQEACH8CRioICVglBgSTKZkFBAQDMSkqJpQiIQA7');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/mad.gif', 'data:image/gif;base64,R0lGODlhDwAPAPQbAAAAAH8AAIMAAIcAAIoAAI0AAJIAAJYAAJgAAJ4AAKMAAKcAAKsAALEAALQAALcAAL0AAMIAAMwAANAAANUAANwAAOAAAOgAAOsAAPIAAPcAAAAAAAAAAAAAAAAAAAAAACH5BAUAABsALAAAAAAPAA8AAAWB4CaKQFmO6FZWlBQ5JwpcF2C1QKMA45xpGUAF8FogeCqMpoQBTEpGnvASnFUkUAShRLFcMJebBKI7bAESSsXCcjkYCcM5IpE8TYDFoSAoPSARRBAODQsABgMBUg0ADoQMCnEAfSQKC5eRB3ICij0In5oFA5xIPQAFBKOKpSl4rBshADs=');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/cool.gif', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAgVBMVEXAwMAAAAAyMjL0iT34n05aWlrqRwnqSgvtWxj5plT7tF/sUxLvaiTxdi7yejHyfjTzhDn0iDz1kUP2lUb2l0j6q1j8uGLoPADoPwLpQQTpQwXrTg7sWBbtXBntXhvvZyLvaCPvayXxdS33mUn9wGj+xWzpQgXrTA3uYh7wcCnzgDawz03NAAAAAXRSTlMAQObYZgAAAJJJREFUeAFdz0cWwiAYBGAHkJLeTe+xeP8Dyk+ycha8+TYD3FxAoXLJiJzHwEWv8kqRJeGEk/uxe6ZIo0CDXB1gVbmBLQPOKXaHoYNGIUpqjr2yzoUB7D7w9qU1z4qtyPh3nXXXWsdJytMkXoPRlzUNhhGi8DOPUI27bwoWUNTzcT5ID7r3O9kQKcBLybYG8f9/P3bVB8QITJTdAAAAAElFTkSuQmCC');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/tongue.gif', 'data:image/gif;base64,R0lGODlhDwAPAPUoAAAAAAAEAQAZCpoAAKQAAMYAAACYBwCaCwCbCwCeDwCfEQCiFQCjFwClGgCnHQCoHgCsJACwKgCzLgC0LwC3NAC7OQC8OwC/PwDCQwDERgDHSwDKTwDLUQDRWQDTXQDVXwDWYQDbaADgcADkdQDrfwDugwD0jAD4kgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUAACgALAAAAAAPAA8AAAaPQJRQCCgWh0hUURTycDBHJIBUIo1CHY0lAhhOTUaRUeLoKkuA06kkAnEugEcXICKZTib2Z3OZPBJFISMlhFdZWw2AAB4hIkxNTxQQCwdFHAIfIB8dHBlbcgZFGBtGAaZGCKFKFRcYAwQFBAMMCapKERITEgO8C7W2Sg4PDg0LCgcGwEQACQnIoWZJSkbRQkEAOw==');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/wink.gif', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAgVBMVEXAwMAAAADv7gDi4ADm5QC3sgHU0QCtpwHBvQHIxQHNygHRzgHZ1wDd2gDx8AC/ugHLxwHb2QDp6AD29gD5+QCkngGmoAGnogGoowGrpQGrpgGuqQGvqgGzrgG1sAG4swG5tQG/uwHCvQHEwQHHxAHT0QDe3ACoogG7twHPywHo5gD32ICcAAAAAXRSTlMAQObYZgAAAJNJREFUeAFdz0VixCAAheE8PEJ84i4Zuf8BB0jbRf/dt+ABngs27zeA0UwEwA9JTHIahX6Cm0VZEKbPVHFYxyjLGBewzTBkpADANKB4Dw80/zs/SeOMso/b319jaywifelIvI+VD41xEEKcYXCoBV1lB/0Uqb+vC2Tt7kvUBpt8Pu4H8ZlP49DVjiagl21TwfHf/75puQf9XW/kzAAAAABJRU5ErkJggg==');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/biggrin.gif', 'data:image/gif;base64,R0lGODlhDwAPAPQbAAAAAAB9bQKAbwWEcg2QexWcghefhR+qjSKvkCSykii4liu8mSy9mjHFnzPIoTTKozrRqD7YrUDbr0LdsEjmt0rpuVDxvlP2wln/yNDs/P///wAAAAAAAAAAAAAAAAAAACH5BAUAABsALAAAAAAPAA8AAAVv4CaKQFmO6FZGkMMkJwpQFTVBjXIUwDhbJUrkUTIQeqoKAHMBSAAMBOCoilAsF4vwsUAYByWIaTwGAxwATSatTq8FJYabvW4HSrC2Rr++qw4AdXoAfioFBiV7a4SFKgRHYwGNJAADAwKSMSkqYykhADs=');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/redface.gif', 'data:image/gif;base64,R0lGODlhDwAPAPQdAAAAALEAAP9IAP9OAP9RAP9WAP9bAP9dAP9hAP9kAP9rAP9vAP90AP95AP9+AP+CAP+FAP+JAP+PAP+XAP+bAP+dAP+mAP+tAP+zAP+8AP/AAP/JAP/OAAAAAAAAAAAAACH5BAUAAB0ALAAAAAAPAA8AAAWCYCeKQFmOaFdil0VJJwpgmZZh1hQ1wAhcmQ1nk7lUJI5FT4UBcDgADaAyAShVFGCJeCklD6WJhZa55XYKQ0lSsVya4QcDUShBJJOKqdRQHAh8DxEwewt0Az0ADA0OAAGPAIdLAAkKC0olBwUDAksqBgehBgUEnJ4kAASlAp2nMnspIQA7');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/frown.gif', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAhFBMVEXAwMAAAABmi+l0l/FKc9lfheUdTMAsWcg4Y89Xf+FojutrkOwOPrcbSb4kUsQpVsYyXsw7ZtFSet5VfeCDpfoGN7ILPLUQQLgRQbkWRbsWRrwqV8ctWsk3Ys4/adNBa9RFb9ZZgOJ+ofcHOLMKO7UXRrweTcAhT8I9Z9JJctl3mvOMrf+di+rsAAAAAXRSTlMAQObYZgAAAJFJREFUCB01wIUNw0AABMHbRzOHman//hJbymjCSH+QGd870ITcYnPPMUE/GMtwtialjUgiY/gM7+zk2CKRGgtna6CNAdH5HGzuIalLhOu9yYzv3b6p1oiD69JT2rnDbhOWiN3++GIUH6s5Ek3Cs02aDbcCSVR13Ma6Cqtihn4owz2U6+V8hiawWBTXC+iPkUZfHjcHgU3Wd+oAAAAASUVORK5CYII=');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/dubious.gif', 'data:image/gif;base64,R0lGODlhDwARAPUqAAAAAAkJB3t2P8G7dMK8dcjCeMvFes7IfNLMftXPgNnSgtzVhN3WhN/YhuHah+bfiufgi+rjjO7nj/Hqkfbuk/bulPrylvz0mvz0m/rynfv0nv73nf/4o//4p//4q//5q//5sf/6u//6vf/6wv/7x//7yP/70v/80f/82P/83AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUAACoALAAAAAAPABEAAAafQJVQBSgah0hiKoUylUbFJCBVNJFIoU8HMASgjIArqeSxcIkmQIkEEIVEos6DGy6dTKaRCCxwFEUjJwEAIyEhAgIWDgl/IiVFIB5bABMLCEUfIG4iH5IYFw8IBkUdHB4eHBsYGBQRDAUERaoZGhgWFq0KsANFthUArREQrwUDsUQSEGBFxbxCABANAAcD1dbOzwnU19VnXQDcUUnPYElBADs=');

			images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/smack.gif', 'data:image/gif;base64,R0lGODlhFQAWAPQgAAAAAG5uboN2Bt/QPOHRPenZP+zaQO3dQfLiQ/bkRPvrRv/vTv/vVv/yX//yZf/zbv/zdP/0gf/1iv/1kf/2l//2mv/2nf/2of/4p//3rP/4q//6s//6uP/7wf/7xP///yH5BAUAACAALAAAAAAVABYAAAbEQJBwSBQGikgigHgcNkFPEADAmSKjUCF1W10ak9qqeAtWjsdlqfQMmEy90MBxy+VU3Z5ukSq2cyaAAB0bGBZwYX5/ExALVBoWExGHa3aAjAmCHJAPk1JuApcAG5pTDwxwb20TCwmYGxkAoA6niByMjVMYF5ARDQsKS1QQqQAUGReADsqsB8HDWhUU0hMDA28JBQTBCsBTEhRubx/jANVeAArV1gIA4+Tt5YfEDZziH+XWZegIBgXW+J324FNnJc0QYkiCAAA7');
		}
	}, false);

})();