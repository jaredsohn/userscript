// ==UserScript==
// @name          Ikariam Quick Links
// @version       1.0
// @copyright     2009, Yoshi Toranaga
// @license       GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace     Ikariam/QuickLinks
// @description   Adds some quick links to every screen
// @include       http://s*.ikariam.*/*
// @exclude       http://support.ikariam.*/*
// @require       http://userscripts.org/scripts/source/65252.user.js
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var iql = new Object();

iql.Images = function () {

	this.images = new Array();
	this.prefix = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAA';
	
	this.images[00] = 'cRJREFUOI2lk7trlFEQxX9zv+vuohFRFC3sDIJCYvCBzdooNgEhCIIa0ylsQBG1sbaJFqZIEcGsgpjCRgnW/gUR90V8EAtRNBBZNm50H9/jfmORBytZZWWnnJlzOHNmRlSVbsJ0hQbs/zQ/KaRnQHds8vZkLvY9fwcgnY7wKJee9qMvw6oR1tuJanwgc2zuQ0cKpt6cvl4PF4dd7AAP35WL1pjvGxRkc0MHgejy4Zn5tdzj/Lm+H835UhAtIWIBPinJgdvp98vQYmI2f+FE1S+Xlv1yaSp//shqWpaaC89qQY1QUwTOBmGcHFwDryuYfD2SqtQ/1hphxQD0JHfXdvX0Hq82Fs5Um9/GYo0AwYi5cufk22zreBbgc2XWDyOZhMRVUOp+eUszMIXQNWwjdAgWEV7dH5z7A7zBg9EX/ROqXBMBxQGCYFDwBdv74Gzu6z8JAEam+ydcvEICgIIx5tbTS4XxdhtqewdDDw+NO8cNVcUYKb7MFAfagdc9sCJbgW1AIgZP4d7Rm/v3JrcnTi3OVu7KqOzzIAE4IAICoBqp/hRVxYokgdQqoedAgF9gN0MUeSs1BeIWkmak6nd8yn+Lrr/xN4yjzwehHQW9AAAAAElFTkSuQmCC';
	this.images[01] = 'Y9JREFUOI2lkj1rVUEQhp93d49XjYiCUUFtgiBpFLyWFhKxEAsbGy0ErQQrG/EHCII/QMTGSrQ3hY1FijS5lQp2guBHCiFRSaLnnN0di3Pu9Rpy0IsDCwsz8+w776zMjP+J0JV48nrufMwrc2AUbt/CleMv5ycClHH1UZWWD4MRva4CByYDpHqjSgKEETcmHiHmItW5STuF/FfAg8HZvghHDDMpkKzYXScPgFcx9XBw4WImApITn26cejEAkJlxf7F/MOYfy8K3OJGtJlscKsCpAJqNGRknd+jO6TefA8B6WU1lMrBZ6fiE1R8Zs7hzVJHSjvJnNMb/hMSmht93IYIP5Qhw99zSx1vP+5eSxZmhzpzttmHTbcOKk+413Sav4v3J6ZsfRh5sFdefnnhr2Gz75rvHl18d3aquc43f1/BjaN9V1wn4tq6eta4LtnUCQuPWHmAv0AOKDNXstZln2/f3zgCUX8oFJx1zDagGSmA1mn2VmREk36pxw5NgzVqDhOTFLhjtOgMxmqVOE/81fgFilqPyaom5BAAAAABJRU5ErkJggg%3D%3D';
	this.images[02] = 'Z1JREFUOI2lkz1rVFEQhp+59+yuQckmBDaIBIvYSxQxkaCkyB+w1MKUFjb5C6JgKyKChQaV/ICgkCqFhboqCQS0sxFEXBJ3s3q/zr3njMUly5pgou7A2xxmnpl5mSOqyiARDFR9EODZ5uzc8ubpyn8BHq1PLyV5Zy3Kf5w9DGD2Pjx8P7tkXeda7tvUTH2k+eVBNc5b0usoQ5yqr9oTI2sKIP0m3n976bF12wvW7SAINdPomuCYBS+/t9HIOntucabZ6k1wtzl3Lyu6C1kRI3IEAGvbw6rbQH+9EogZq4RHR4EScPvlhQnnsxvWRYjUDlsbgNw73/MgydKtxNpPSnVS5O/uIpBy+ADg1vx6EmfV+TgNvkVJSJSW+pn8WXEqbp+JV59OTXrnXik0BDAmvBMEfOg3QRBR1a6KWXly5Z2Xvad8efn8yfR7+torx8PK0JkX199sHLSKqCpGpA6MAjUH6cTFxtT49Nji5+dfb2597LQEQsADDiiADGgXqju7AANUKRMDB5mqpiIyHJZGa592QbZQLfat8K8x8G/8Bcc0xz8gnRZ4AAAAAElFTkSuQmCC';
	this.images[03] = 'pNJREFUOI2l00tIlFEUB/D/uTN3xpmx0XGCApGU0FI30UMrJl9pSAvTNrWJoFZB0CoKWlT7CGlh0qYH1ioyw2iRiZEhIr3UwigfkFiZjY+Z8bvf/R6nxaSg1iI6y3PP/d0D51xiZvxPeP+UnKzeF3ICiLFlFoPIJfK8F9/N3ry3r8zVtbS6g0/7y067Wl90FtV6tm0AgJASIuCfIp//QtGz/lt/BYardjXbC4kzej4JMNsQwgDgZdcNEBH8kXXwZmZeKu0ZuLwGeFNT3qTjsw/UfBJCCJCU4+HNhbt1IqF1/Ge9o81mV+sNGZEw/NGc6m1dfT0rgBc7ioeN2YVSEEAgAAySvq7akfE6AOjZsz3fmpl5B8cJB6JZL2MDH2IAIACgt74iL7moShUDtj+jUxGZigmG1rWdWwt6Js+flVV9rye09LUaDCRSqqyvoS6yDMz9iOemLBsmEaxw1jknGDqoiKAAGKau7G+//xQATKDbJELKtOT06Fh0GVhkJA1mKDCMZLKkcXCk2wkFDy0hi9qsvFuU3649nhLFDIMZSvrVMiDzNn02QfPKZaS0PgUARwc/PnKDmY2KCIoBw7Iak6nUVcUMU4jJaEXV1DLQ1PFYWdJ3UwEwtFXTsqXgylzrdXF8aKRDRnJiphALBgOGy1AALOlrrb3W4q6Ywo0D1aHE2OiQa1kFRAQIMUFCPGeQAdc5wq4bYWZ4pBzM3hvbefLOPWvNIrXFyjdOfvv60LHt8nQ+PU6AQETwer3dxYWFhxuedM2vWCQvURhAtgMwBUO+Y9HwiaigesmcCxBr4MuMy51t0/Hb0CZ70nfnbOaFJUAC8APwOOnDJACBjGAARAwjZfx+MNOTbskBYNrM1prP9K/xCzYxU7setI4EAAAAAElFTkSuQmCC';
	this.images[04] = 'bNJREFUOI2l07trVEEUx/HvmTv3LguJKAhZizWgiCA+sImktrIWrBUb/xb/ChtbIb2NKIR0EVkiFrokYASXPPZ5Z+bOHIu7j0DcImRgimE4H87vDCOqymWWXXZx893Bphh5oqAa9dPBq/buhYCTsftQJW0BWMM34OGFgMFw4ueHsNLb2rvz7MRde4uKAe0qV56/fPyxXApIVS2m4/JJ352+GLrhfUiIFPcy6beA7hwIXzfW1FxdNek02kc7vwhhoVXeTCpf+rRSN62K0td5hPLzg3VktIf+aaoIfLn1WsdbRxT99Vp3hFQQYv7/GcThfos4aqIRATQr7hKkwky7qAIu5fh0PrEFSKMY0RzIERRQT/QyjxE8LuS4sAyYWEjT4aEgCpUHqWYzYOQyxj5bBmSQ9AxQF0FYAGVG6c0SYJyBngGmuedADPQHUIZz9TWQBys+zF5dsRZLjA2YRkipOB6KLd2i0FizAN5vTw6f3s471sj1lLTa/TnoiP/RZrWxhgLHvzvd7d73on3jEMFo1P2/O70Bb0BUFRGxgAFpUkcwDVABK0CE6Gft1XsMoKpBLvud/wG2FOh0UfPW7AAAAABJRU5ErkJggg%3D%3D';
	this.images[05] = 'm5JREFUOI2lU89LFVEYPXfe+NQa7Zk/UDOzFrbIRVKtwhbtWrSo1KBV7opoEf0FZS0Ew3i0bhNBVEtLFJEQjX7YI3wSWZZCz+fvnujcmXkzd+5pMWipbaIDl/vx3XvO/TjfdwVJ/A/MvyXdp8Iw9u87CfIIoE0I8zPczGjhabrb74rtFXjDdW0MZZcQ5kEWVIAwYKhlUOcXRczqLDqVebCFQHJzOYO1N5x+i16qnXr1LQPfoZ93qdfTzKev0hkopRysSf7J2QzsvtpjTm8xc++uM2CE8fE0R0ZGSZIhyVy6m07vLtovq1s3eMZGJVrmbut4ExInkjA0oZTCbOYHZqa/QSkFhiESTTeBxBlouXJHfmwEgEhg7Ul1sbbdlviBywAAKW34vh+5HDOhlIJtrwMACg9dAZ3gcDiZa9gUYMAK5lEiURcZ6XnwPA/19fUoryiH53kQwgABSFRBB3Fox639LaAKHO1CFYnoVa01PM9DZVUltCaSPT1IfRiDAFAUC6HdEAziclMg0ZFZ0b6YUt/7AACWZcH383AcB0ebm3GhvQ2psTH0v3qP2MIwtBOuQ5R92dLGpe7EteWu3bRnXjMkKaXk3FyW2ewspZQkyZ+zk1y5X82lLiu5o41LJBY7rZHs3Sq6Xwe4HX42xfl7jVy4VTyz1NNcssHbOomfzheuPh96poLgbLyhBbrmODQMFKxMwJ8agkD4Zm/DgXPomJjfMsqmEBaA0hAQANSji2WXGkuc1j1m0CAEjPUglpl2rRdtj52HQN6PRd6tKdLeECgCUAzADKNDCUBHOSEAugAIwIpFuwLgKtLb8Zn+Fb8Ad5mqYD63bFYAAAAASUVORK5CYII%3D';
	this.images[06] = 'VNJREFUOI2lk70vQ2EUh59zz5VqcSMMPgbSiYE/QDCTiMRmwWrzF5hIxComRjaLiIiYJBaJ2AwmRAxoJHRp09vb9xh6S31EG32mN2/O+eU8580rZkYjeA11A37lcHT7uNCk3qJU3f2GQVR0bmsq3bMDIGbG7vV9V5N6T4WSo5aSiJBQj8hZ99xg37MP8BoWg8gMDJAaM8c1vkgAlANeCqGrKfsTB7HvW1j8R3+ZikLNyb9T2ZQPkA2LUo9+dbPE5X588ZAvla6c2XA9AZ7IVVL1AeJnBJg+OU/lomjSGc3VxQJJYMWgF0BF1pO+rh5OjOS+BPzFzOVNZzbzdODMRj3YPJ0aW/r0MUNBFRIKSYUWhVaFNoVAIQASnf3p1Oje8f744ZkbmJ0PAM/MEC3ntAMdQCLei1+e/mOvVoIQyA0tr43cbW9c5DPPGYFsXQp/0fBvfAcwPnvXZ9Y60QAAAABJRU5ErkJggg%3D%3D';
	this.images[07] = 'blJREFUOI2lk7trFFEUh79zZ3bWlWyyIYZVK1MINuILEkFT+B/Yi6WQRlJbCJZWYiHYWqmdFpYBSbRIkSIEJUJAmw0uGaNrdibjzuMei5lZJmICYQ9cOHDv+c7vPK6oKqOYGSkacEtndfnbRYWZA7cCoiBGNufmz20dCnjzaq2tqhuZtQhg1SHO6vkLBTEmmJuneShgu7MznmUWAKuGuhtwvr2OEUURQMZ2llcXW42unzOjjfrs109DQPf7D1sSo6TB3evPuDzzAU2GIojTk0+zvhSleVn0/vSZxq2uXwKMiCAiDFKPE0mH5BcM0lpFbFLxY0eM0wJyQNAP/UGcdFDO/klqJvjtoE0Hm7gcYRaKMb5+97C3H0ZXo2ggQZhuTnv9L3HoYSPnqCPDHgAI3FRr1z9uXbnRru29CPveBanmk+rCCRgTHQAAK2Mt75r2bmv3ycSDmsQdq1oZnVzC6ixGdsUxC1OL/nbOPcYq9x63n2eZLkyNTze5/zkYAlyRCWASqBeqnKI/ZRWa5WPYXbp36pEf2pU7L3++zVT3S4ALeP8EShVQQKyq7olIzQFS1eRYJfzPRv6NfwF8K87EzjMmGQAAAABJRU5ErkJggg%3D%3D';
	this.images[08] = 'jdJREFUOI2lkktsTHEUxn/nf+/M6IjUq4JUyHgsBOl4NEKiRCRExcaCSEREIhZdaMOKVnVJJVZ0x9LCRnRjQS0Qj4QwoR4xiEZKlYiOeztz57PoDNPBQpzkLP7f+c53Xn+TxP+Yq3y83rBy26umdNffyNmm9MHs+hWHxoGSkMTzTY07Mw0L9WjxPD1ds/RKGS97/7qGzsdL5+vxkpT6m9LdutFjkjBJPNmyNpl7NzhSGAkA8OIeiam1vctuPWoGyKxLdwbDX9sLuVJ8QoLYpGRjw53MPZPE1eRES8ycchJnbQAUi7iYT3Ja7UUX9zPfh750jeZCzLly233ko+amt+9HrHKJVxfM6ZbUaoCKwk/4OM8jzAU45xBg0PcxEd+0+8mrAoBVX+FySaRUCQnMGYwlXxuuqdm8N/MiX+b/JgBwcX79bcTqKvhzcnrdjG13HxQqQVdF4kKq/nhY1KpQosqnDA99uFTNH9dBT6q+06T2nycukyoShPUeuPmymdkTfgmcWTQPy+ePIzoqk83sisHTonS4UgSj13x/R8uLN4EDiMySgdQRIMoeor6h2uT2luy7I6PG6e8VsUDaGkTRsp87aH2Wzcnz94UYoSDErrekl2888fB5EeBwdqAtj50KBaEg77xzu1Jz7wOYN9bU5AiiPbPqWic5W3V+8NPRkUJU8CABEEEEfNk/q+5YzDn/7MBgGzAq6atJwjfzgFhBChibvcYDv3LsCCTpWyke9yAqSNEf/8G/2A9gpCdJVtr5yQAAAABJRU5ErkJggg%3D%3D';
	this.images[09] = 'dBJREFUOI2lk79rU1EUxz/n3sQQbaipoBYTq+2idRBxUwyK6KCDi2Cj3RQ30W5C/wcHFxE3Fbu56aCbg5MIVlAHU3/RhtoE8qt57+W9d49DLJREg8EvXLh8z5cv33POvaKq/A/MoOLXk0fzX04cOThIkxhUDPzggcZuGtg7dILVG5fSbb9zrO0F+dLF0xNDG1Q+fy94YZRphxHNSu3C33QJgOcHJu1odts5Y23GJq1LprYQ+cG1lt9BncMGnevvzh//GQUhLoqNc65TX6s/O/txyevOwMjWWrXxFCEhIogxuNgRqYIIYbVxqN5YX1CnqCoKoEwBS7KxxoV9e3LW8NApp+R3PJHuratRFEHgvTpmZ74tLwJI7zt4NJmbd+g8Srqn3ciI3FseG5m7/eZTvEH2GQDc359bAR3voQMvM5q9tfjB20z2beHuVL7gqRv3VOk5KdNqXOnV9xn4zhUDwO9mnnPWXA7ACwDPabFXL6pKQsTGYHOZkeTVbGYtVprrqrN3fpRfAtzM7T6cMfIkITJditzE45XVsgUXqcZiu0bbFbJWJDWza8eZ143W21LbL1vIAsTQtMakizvHCi+q9VeVMKwL1IDaH4c4DAb+xn/BL7w93lvHioPxAAAAAElFTkSuQmCC';
	this.images[10] = 'dBJREFUOI2lkz1olEEQhp/ZXb/cGdGQQi1EUkRQsNLK4iRFbCIoIQjaSEARLPwpRLTQQiy0sDCFaBoRQSs1QjBCEMSgItyBjbkqoJ2Nkssl95fdHYvLFy/xh4Sbbl9mnp13dlZUlXbCtFUNuNbD5Pj0DufsMRE2WWtf5fp7CwDv38z0LvowpKomhDjWf3hPMa2R1MLzp/k+5+x48KFTVbHWkiTutHXmW63aeO19sIjgnCWEeHLw+P7Hy4BHD94aY+xMvd7oiSEiIqgqmWyHGpHFSqWWiAgKCJDJJo3g49bhs30lBzBXmt/mfezxPiAiy5bmSvMCJLRoqootm8Q5uxv4tARYKFdrjapAdi2DU1Wcsz9WzOD8qXtjwNE1AeDLxw+f9+aLo79fYbZUvkzkiAjy32IFMXIhXxxlRQcAg4euD8cYH4K02k5vBVWMMTdfTN64luqyehMHDl45p6oj/2jgzsTU7Uutwh8AgIHc1aEQwxMgSTVjzMWJqVt3V+eKquJELM2tNIDxqgu5fWcOJBs6XwrS1fCVE+8K95+JyEbbdBMB71WD2CaoC+gGOpZALkB5e/eunZlkc/br98K0hS1AADxQB34Cs3+1sJ5o+zf+AiRTw8t0epqTAAAAAElFTkSuQmCC';
	this.images[11] = 'bJJREFUOI2lkr9rFEEUxz9vZy65U0MCuStEaxFEjUH/hFRBuxMtDCLYhFgoBkFrsVBRSESLkGAhqIVgk0ptUliIqcRfjYVwYjSYvbud7G5291mcHN55e6A+GJhhPnzmy5snqsr/lM27KF9fPZChhxEKovJ2fXZ8pRcn3Ql23/tUaGysP4iTtJqkGahijEehYFeLxh79NjtW+533uo3+Wu2ua7pq2AhIw/BjGsUrUeBw9WDcueDxmdd9EoxeeTYSRMmPZCvBE1mOb09OAgycX76ZZXrBWI/igN3lX5top+jogW6GibrNL0Z1p0EvtWO65pCIQKiaFGzUtwfbTy2WsbYSLE29AyhNLV1FvMugCMy7+6fP9RV0yI7fmUO8GdEMFXkYPJo+2c3kCoaP3dinyBtQEBbqTy+e7cXlzgEu2ONJa7utuTGTh+UKDPpc4viJwqvay1tRHvfHHLTN378Om4Y/ZOr+wcqh6R1/LQCpkiYTkqUnjJgjuQ91HERGgREFr1je/75UGfuApr7/+UXTyvxeIAHqwFryq/kdv2BFBoFBwKawRWspUDKttCkQAWFPwb/UT4GKvvdpT9KAAAAAAElFTkSuQmCC';
	this.images[12] = 'lJJREFUOI2lk01IVUEUx39z597X85nPT15YIla2kD4gChQqEKNaKBVtalObWgRFe1sGRhDRB+4jaCNomyCQPhbtCqKkUHxlqZUSBup9n/fOnZkW7z1Dy0V0VsM5c37nf86ZEdZa/sfcvzlH0rN1NbH4USHYDbgWJgpKPTvRvmVu7V2xVsHwx+9XXMe5FhlTq60l0AZPOiSkDLW1t061b766LuDBxOx1IejPhgpd9u9sTLKQyTFXVDTE4wgYOtfReqaS41QOd8Y+dWdU1P81m2NZKRZDhXQEPS0peltT/PB9vhUKLIfq9L2xqfN/KBh4M/k8H0U92pQVCUjGPPY31TK95DPpF/BciQA2ut70zyC/7faBvdYFuPjybaJKys6i1ghAGUtnqp6+tmaEMYxOzZKRMdxQYYCCNm3GOluBzy5AoE1DNoqq7e/iPJqeJ5WIc7ytmTpP8qUQUOWUOs6qCCHEphWAHyk/0CYANlR6K2pNR0MSozXvl7IU3Bih1qWgBemIxZUhjhzp8vOR/pCPNPlI44eKxqoYO5LVvJtfIJ0rEuhSLB9p8lov5CM9tWoLwE1bghNaS1O8JMaTDrvqk1itqcSBwae9B9UqwIu+Q0MWhg0Qk5LxpQz30zPMa0tbTYLQWkwJ8Np13IF1X2L36KtBa/QlC2RChQU8KUm4EiHEcMuxrrMPobgK4AqRBOp06W/ktl+4fDi5Z99Jr7a2HSGcKJOZyabHn6Tv3ngMxCQYYCmy1q8AvPIGpAHHlioEgCwX0oAHJMrJGggia9UfLfyr/QLT5ij1s8EUwgAAAABJRU5ErkJggg%3D%3D';
	this.images[13] = 'alJREFUOI3Vk71uU1EMx38+5/gmUQZS5TIUUUQiMVTMLAxk43F4iDxKxVsU9rKgjqDQpahLEiLl46b385gh6VX3smDJgwfbP/9ti5nxFHNPyv4XBcLj4Ovl5bMsy+j3+3jvaccToalr7vMc7z3nb8+z0etxDSBmxrerq6CqX4Zp+m4wGCAiiAjOHQDNjBgjANvthsV8sdxsNu8/TCZ3ASBJkudmNrnf71FV0jRFVTEzRASAGCN/lkuyXUaM8ZWqvgHuHID3nhBCVFWKPOfm5her1QrnHCLCbrdjNpux3W4JIRBCwHtftxo8IIsI3V4XTZTft7cs5nOCKuv1mnQ4pNPpkOc5zrl2vHYLD4KVRYl3ntF4hJmRZTvG4xG9Xo+iKDAzHt9OOCZLjFGqukaTBHFCWZacvjgFoKoqokVCCOz3e5qmIcYoLcFwOMyccxK8BzMsGhg0dUNTN2CAHYT03uO9xzmXtwQvz86qzxcXn05OTj6qqtckkYMmyIEQMzPqqrKyqmJZFD+m0+nP79fXhzsIIt0G6kMf/JFMjg4tAxFojt4xs0L+/2f6CxgT0ZlQ5YgLAAAAAElFTkSuQmCC';
	this.images[14] = 'atJREFUOI2lkz1rVFEQhp+55+zdq0I+VBYszA/QQkQxMaaJIAixsRUkVjYqtlZ2lhLsxEIU1NKfYDAIGpQVUisqIpL1K7vr7t2795wzFpe9bERZcQcGDgzznHdeZkRVGSeisbr/BfBo41DlwcbC4n8DOnn7SJpvPblbn7v3p7odPD5tnZQ3zdNx0LQs7qzUNA92KnNfqERu+c6rBS4efXZhGCCqysrz2Vps4pcgu34TqC78jDPXmFCU2EwSmz33Lx17WkIsQB6y6W7+fSaoA2QIoIhEQBWAvu9StZXlW+uL7auzq1dKD7q5Dz1n6fuEvq8OZULmYjJnyZyl76u0eh2aaevyjbX5/aWCTmoJGkb5WWhSQ0r2dkesX0tAtyfeBfPXJhlMVezcpog9dXOpnpaAdmrei+pZEZlQtq2mhsBB5/w1LdxpRMaceHi+/q6Ej1rlpdtzh32e1iPhc7I7Of743PqHbepUFSsyCUxT2G0BA0QKfu+BqdrMmX3XN198W/m41nhtIAEy4IdTbQ4AFogHjYXaIj04VW2JSGKKDwLggb5TdSNHGBVjX+MvoZy++OVdoOUAAAAASUVORK5CYII%3D';
	this.images[15] = 'kNJREFUOI2lU01IlFEUPfd7X86k05BGm4gg3LhrE2q0iEqoyBZCBoGFSUGbqFWtpMzatGtjLScJW5iCLSTIFm0qo8X0vzACaSojcaZxmu/d9/PdFo7iaAnR3dzFuee8c8/lkYjgfypYC3yVzXa9zmbb15qhlQ5eTE52EdHZZDLZXS6X3wD4Ultb1651lBGR3uaWlkfL58OVisyavI93a62nvPcgQqMx5oP3HmEY2r86eDwxcZyILolI2Vq7SySGCEoAFBHWEwWoqVn3BKDNInJ+f1vbRJUDY/ijMXY7gLSIQEQuFIvzGQpIbUilzhHRFWbeQ8BMTTLxedUKc3Nz+TAM3wPUqpQaONrZeXOZ0777w8M7vPcdEMmWfpXMIhAAwGAm0+icn2LNrYYZQRCM/yHwcWYGMx901n0avJPZtCTgnJ121nYw8zutNay1O1eyrbXNWkdg5qfW2kOxj/NLAj2nz7jZ2R/PIh0loqiMQiF/8cHY2IFF8ujIyLGfhcIpHUWIoqh25vu35909PXFVBkqFHax5Cwg5rXmrjqKHt28NvBVByFo3GWNAAU1D0JRIJPcBGK06IwBc7u1NqVAdIaIhiQUgABWYAkIcx3tjJy/7rl0tVYW4FHV/f8k712CYvxLRYWtMZK3JUUDthnkm9r5hORkASC30jQDqASQ8oNKpVF2xVMp1nzxxwzlXuDt073p9Or0tXyzOKyAGwADyTqRAIoKQSFXyCHzFuAJCJzJPRKSAlAdc5UHBgohzIn7VZ/rX+g2TSkW30NvjeAAAAABJRU5ErkJggg%3D%3D';
	this.images[16] = 'j5JREFUOI2lkk9IVFEUxr9z73s+x5lyUsd0IWEZ/WGQDESqpSsXkRm1biFtIrRNJi3chS0kioIECaRFUJgtalMoBWEEbQIXiRGhUFSjOOOfN2/effdrMRalThAdOFy459wf93zfEZL4n3BKFcLJW7CJkXMAkoiqrntHJsOt+tTGi/xUugkAIu9umv7nYbs2f43Rl+MAkH99qOmvAH+isZ/51Vn/xcFxWD0XrS6Gdi0LuzI37b9sHqSfnfUnGkdKjmD93H6GOUBUpziJNkbuK4AH4CQSdmmmD9ZAnG3p39/IRhGXx+IDsLYfUPMQ9RS09QCqQdsOrW67dXKx/NhK+Acg+NCN/JsHl0C2gOqxOCoPhuchZR5EGdh8DKJv0ogPiU5CZEHHavoSXR+NkET2Xn0tw5WvAAHIujrOuOjyNMAYo8IUbHgCgPerR7mtybOLbx0AoHUXaJxRkC1QeALR0whtF3WUFdEZGlsJ5XYDtgGWpwD1Xdyy91tqsHAj1QUxgxBUQ9R9EDsEtplECtQD1T2Z4ZI2ZoZSgzTRGAuyl8brYSANLKCNUUUvC2onjb2TGap5VBLAUMUZaNhQv3Ni+8YZSDsD2UMTm2GoHzLQYEHFSwJSlycuxF2vo/Zw3dFK/9MuZVRcQo1yE7Sm+r+dibteRypd37lpDxyR7QCSUXGxfACJ3VVuxejp5FXPkcorz5b7ns/6GQA5AJ4GLIAlQ+Z+AtyiRdDrv1JR0a9lFM+ELtbsekYAAkOGm1z41/gByJURFkgTXg4AAAAASUVORK5CYII%3D';
	this.images[17] = 'gxJREFUOI2lUUtoE1EUPffNy0wzMYGmXZQKiRQMKS1WkFZE3FisYHUjKljBhWC1bmwFRUG6EETUha7cqHUh2CpEXPjHKkIpWIi4EAqKUD+0McVMMknmY2bmuWinSDGp6F1cuPe8dzjnXBJC4H+KVQOSo5mGpusz3f9EsDn1vXFuXpvSi8aJzlQ2WouAlltov/Ex8TVXfq6bdpwz5smc2Vxi79WAdHVuaN2dFQlCwxPTxk8nubQQAiCCInNEgvLl7JmuUzUtmAX9CJlGCaYBmAbIMh2yDMPOF5D/oZ1sOPtqV00FAKAO3G+zPDEpEd44k717MFtXCex7EHM9rycYVHaqdbw3e2G7s6hQQAiBm+kE3X63abU/swOjrbQ/1Tf+ualjfKYl5u/Dh++2q/33VH9eUjDyNkm2G7gVYI1P4pHOh9vWXioDwLWplvOE4NGQHO86uP7xp5ohXpyIdTNa9YIztUAkZQgkVTy92fHKqiJFcyG5uad/w6N0zQyGXyauuAKDDABooREYBDxwClkKD9ef3vLaqnqFc1s/DJVNZTBfVr5pugKtKEMrcWi6jFzJGsgbGev393+8go8de7qxTZu3j3uuOBSK8B0ju9PPqmbAicIAogAUANxdwAutfWv2wvMwPfZlTAIiAGwAOUeI4nKCgP950RoBYC5gAnAlQAXgAnAA2I4QlZUs/FX9Ar8/8pY/3d2CAAAAAElFTkSuQmCC';
	this.images[18] = 'mFJREFUOI2lkjloFHEUh783szPZyS4xMQceEPBo1MZCJQaj8UILFUELLVRQQRFBi6RLbBQLU0QsRKzEFKawEU9QQREVAirYKIIHRjExIaybneyc/2cRN6CJhfiqxzs+3vETVeV/LDNTMHgoNZJbuBlxlgE2mrzT8NOD7Lpk+M9a+XOC4HHzMWz7jMbFOohAMohUge0FqPZk2z6d+itg4sH80yLapeEoZOdAHGAmRhAbxLHBbUBw+ryNg/srPVbF8W81rNE47UrGvmHV76B6w2eqt3wn2/oKdbeRFFJMaQQThfv8O00HpgE0tU4ZvwTGIRkaoPz8MOWnh7DcmPzWm9iNnaQFg/FLaKTdxasiU4DCFSdrylGLCQymnOC19uO1XMKeu4vijb2Eb86T23QOlVWYiRBTjhdh55unAEJulimnOY1tNHHxn5zEf3QEZ+5yana/xH/ciyZjVC09MTlFkGIiaZgCmCAtaSihhoJGNk7zdqzcEgp9q7HyHu7ig8Qf7pOZvxINLTQSNKQ4Bag7Ou6byHptQgW7EW9FN96qDkxUi/G/kmlajqoHJsbEiomsIRPw8TchaSg9iHs9CUYp3TsObj1p4T3lgcskw+9Ji28R8cDOo4FcaOgsJtN0MHK2/hpYe0z4AzTF8mZjggJiOyAZQJFM9lk8SNu8iyNmRiUWzjT1piknEaGSmnwYWKL9de25/bR9jH9TYkakBqhNJ1fyu9fn29cucHfWV1uLQKwfoRl88SW63XF3/DZQZYMBColqsQJwgCrATicPGwJB5cgKRsAFvF/NKRAmqvG0Ff7VfgKm+iu8RKGUaAAAAABJRU5ErkJggg%3D%3D';
	this.images[19] = 'flJREFUOI2lkc1LlFEUxn/n3ju+8zqiOV/SorKVQrvRRboItF1Ei6BltIhoEURukoJAaNUmEloEtegPsCJaSBFWGwdSV4EUYWBIJI2O0yS97+jc02IMxK8Cn9XhHJ4f5zlHVJX9yOzLDbitjadjY81HOjt7xUhTZaXyYWBwcHEvgGyOMDM9ddm5xG2vmgMQIfLePygUeob+CZieen/BucTjIJkkn8shxlBeXqZareK9f1To6bm0K+Dl+HhTNp/7FibDTFd3F8bYxlCEL3NzlFfK1OLasb7+/tmtAAPQ2tbWXa/7THs6jaoSxxFxHFGrxWSyGVTBWntypw0cgPfeGO8xRvBeWVtbAwTnLCIGVOkI/OpOAAMQRdFHoFIqLWGtIQxDgiAgDENKpR+gyvUZ7djziMXJySvOufupVIpcPo+1hlJpCYmrPPv0i+F3qwTWj0b3Tl/bEQBQLBaHrTG3gBRAMmF8cW5lfuj516N1BGMtVv2rIJs5t3T3zM9tAIA3ExPZIAiOi0iQDs1Md6FvvvnUnYcJXb+oYlARDMy2iO9deHHj9zbAbuo4cfOqr0WjqgoiJFtaDy68HvkujY9zAGgHAiAB2I0Dy4bf12ExfXjgrGs5dF7XV99WPj8Zib02NnAilsZLzSajsEXrqtW/tRWxddX6f0fYTX8AG6LRvCV2YQ4AAAAASUVORK5CYII%3D';
	this.images[20] = 'YFJREFUOI3NUk0rRGEYPe+dOzP3YqGRokhuESslNUOUWMjGhj/ATkj+gQVlZWPpc2VP2SCriY2FpY0oMiGX8c7c9977flmYpplRSrPgqdOzeJ5zOs8H0VqjmjCqYv8LAfOnYueB2/z2Socj0O8tTmv6cjhCK3tI5RJb9jO9zAvGglCMCy5SgosopIIpw/soo9sqEt3ILw+6ZQ6ad+7MfCjXBZcTgos2yQUUF4AUgJSAUrDYq9sUPHXfWE4/gKMygWzWjzHfXwAXgCqQSqEkGCc9XJHa6cjFDDBadGwAgLfU5YF+HIPlAa8UOSBPgRyF8oKLDv4w0p67blicn6svEwAA+MHhF8lDMTP/FgHfg9CTentq4GRz+T7u9LmJREKvra5EiyOYhMSNodm0ak+9I2QZwrJncB9OjfOtq5hkzwowzF00gRCdSiYbbdvmlmVRAI9Eaw2TkDoC2NqwbEP5PgG4Amo1UFNwqQuQEgg7HCdGc/Ql8/T88e2Mv42/f+WqBT4BXRfKgqk88WgAAAAASUVORK5CYII%3D';
	this.images[21] = 'aFJREFUOI3NkrFrE3EUx7+/+13wEtK7IFQ7iMFBLjUZCrZDpFAXIeJgQYpbkf4B6uDq0kKntlAdFKFLOxXqZjt00EHcYqEOQUUaSShpc714ydm7Xnu/3+uQRGyQQslQH7zpvffhfb/vMSJCN6F0Nf1fANTTim8L41e8o+ItQG3cMc1Pfdprt7OHdZjIFjcf3AxC654k964kb5DI5wpjcPxo+euOvpC5XHv5bORH7cQGr/L31VDYM0L6o5K8pKQAksI2ExFVorAdsbeKRr+h21kAqycAdb8cDcT+E4JA05ZIK1sIAVztPRowAk83v92eQO4fEp6+y3xUGIbbhbYwomaqEZlPfL8xZn2+rqiJ/cbc/Is94K8r/HL5muUosByOqsOx53DUXF5yfb50INWHs7nC0PPHKz+vDeg13TCU6anJ2B8JnLEL6UfJDxfN+G8K5Y7wxHvPCta/LFc2hHtYBcDegPUBoOFs9pJh6FLTNA1AiRERVMbiAtAUI9oj674PIAAQAxDjAG8pIgBCAIfpVEqzbXu3Uq02Os945jj/V+4acAyJsa5CRP3STAAAAABJRU5ErkJggg%3D%3D';
	this.images[22] = 'Y1JREFUOI2lkr1qVFEQx39z9242RpMlKVIIYiRiUBtJIbG0sdAmKD6AwRewNYJY+RKxiBZp7BSCoGAeIOQF4gcoFiI3X/tx986cMxarcDfcDYsO/IvDmfP/mDni7vxPpcMuLqx/u4bIXaDj5i+/rpz7UdUnVQ7Ov/hyp6XxbbsIJAJnxtKDqXqyuLsy93kkB/vt3vPDroIADnleNG08fQw8HImg1erOUHLmwKHp2arepDKX6mtMKUMKfTUywTTxSWL2HTMwoxbsoz69vlEpdnyIE6tb83nwNw4LJYEg8KHZaCzvPbvRHepgdnVrrNcr3rnpZUyTUoSam946arfWT4yw1+4sR9V5VKlCNL0/8WjzYvnNwBbcdIkTfqYDhcgisFtJIKpt3Pv7H8IgiRwNjVAfn1qTEDMs0kf4g/5Zou/M3rz3fkD07xZSkbpDM716+0qYW3rgjckFaukkTiTovnSyndr2xpr9+pQJZOaeHydIgFMRQnTPL4kkB5AKMAP2EzyD00l/FLm5hwGCf63fDSXZz4KVTf4AAAAASUVORK5CYII%3D';
	this.images[23] = 'h1JREFUOI2lk81rE0EYxp+Z3Y3Zgv3AYpBW0SqCFoSiEkEEBem1+Bd4EUGhIphDvbR4EYXeAh485OLFVKpQ8KJoLUVEihWp0ohWJQgm1m6+N7vzsW8PaWIgeyh04GEY5n1+PO/wDiMi7GTx7RbOfL40lF4ZO74twHA6d/TEk/y+5jm1fOZayV9dK/urX1LLp6fba1l7C/GZP13ZsvfMU8EoZ0zYhjn5+8qB+8n3R3I6qMYAgDMbUWtwz9WTi05HgrX1yq1/pfposeTCKdYiTtW9x+5iUAflt7624WsbnqKMr/5WQ1soVtxjyvMArQCtUHddwMFe2xIpoSOB0BGIwE6Px7+KUAAT4hGUEpACkAKoRz+Nnz93KluIzbm+wV3fQM1jUxMvhidDAX3SXzSUyEBKQChEgvLLKM8mKnWTV+oGmqp5/M6NuZEYAJhNsz0xv98nvCPQwFYeSLIS6Y8JXDj4AAFxENj/tKAhAPkWQEjxkAgD7YkIAtlcHEtYwaHu15BBV8PMsBG1jEwrQffN572k6SIQMpXk4Mf62Z/9fP6pDHgEoO9SsdmlqQ+FFoC02gWpzU43AAh4si+7cPtbIuyWA0AlOZZnSr+CUoBsk1KA0rBIPg6HA8xo7D1W/+GYjF++TnbvCAyzB0Qa0tvgzq83bCE5GwA2AA1AAvABFBRRkRERTMYM3Rhr1RGRAQxsN2s8EAEItqQUkWY7/c6bDA4WlCkyPTgAAAAASUVORK5CYII%3D';
	this.images[24] = 'iRJREFUOI2lkjtoVFEQhr8595HdbEg2xmRFlKjYioWFhShCUFCIWNrYpRMCYqVoE4iNWChpDNiISALpfFRKtBGx0CZgIYqJGMQkurvZ3dznGYubvZiHhTjdOTPn4//nP6Kq/E+5210Gs1KW4oHTiHsIcNH0g0bzzwsn4sXNs7JZQfBq7yiON4YNejRaAhLEr4AUI9DbheNfrv0VsPZiz03Qqxr9QJMEd/c5VHeRfJ3EFAzi9wP+dHFo4cIWQPPpwEmMmdVgBURBfLqGf6IUWJ0axJQWwBqk0AdqRkpnv98HMG2SJtywzQYau2jooJGgcR0sqHXRyKCxj2000Nherz8SyZdYe9jTKa45qomCGFABG6JxA9JubFAD44EaUEWSaB9S3g98zlKw/g67FpbQXBAap2jSAhpo0EIdh3ZfJQVMJQfYiDqJhCAdOSAEu/oNNEKjEPVKmbJ2GedXbqF3ZKm+crd3DjiSDyQ+wftJkB7UutjQ+TO9JXELn3JAJtm5hepUdrBAka4zDxCvRPjxJRoug3jr2THRN7oYb0hh55XlaY3MjI0MGjvYtZTW6zu03tzDNmto7GVJROZtsjIwvu1HAqiOVybSlEtAtn21mGIZEIxhpvdw/0WG54INAFekGyinmaXm2KnuoWOD3vm+ojkoIqYa2Pl3i/Gzy09qjwHfAQtUE9V6G+ABHYCTZrYChVDAAVBIBTygc/1xCoSJarzFwr/WbyvDEgC2VBX/AAAAAElFTkSuQmCC';
	
	this.length = this.images.length;	
};

iql.Images.prototype = {
	get : function(index) {
		return this.prefix + this.images[index];
	},
};

iql.IMAGES = new iql.Images();

iql.Setting = function(title, url, image, isExternal) {
	GM_log('Create(title: ' + title + ', url: ' + url + ', img: ' + image + ', ext: ' + isExternal);
	this.title = title;
	this.url = url;
	this.image = image;
	this.isExternal = isExternal;
};

iql.Setting.prototype = {
	
	render : function(n) {
		return $('<a id="quicklink' + n + '" class="quicklink" ' + (this.isExternal ? 'target="blank" ' : '') + 'href="' + this.url + '">' +
				 '<img src="' + iql.IMAGES.get(this.image) + '" class="tight" title="' + this.title + '" /></a>');
	},
};

iql.Settings = function(server) {
	this.KEY = 'Settings.'+server;

	this.settings = {};
	this.lastIndex = 0;
	
	var cache = new Array();
	var json = GM_getValue(this.KEY);
	if (json) {
		cache = JSON.parse(json);
		this.lastIndex = cache.length;
	}
	
	for (var i = 0; i < cache.length; i++) {
		this.settings['' + i] = new iql.Setting(cache[i].title, cache[i].url, cache[i].image, cache[i].isExternal);
	}
	GM_log("After initialization: " + JSON.stringify(this.settings));
};

iql.Settings.prototype = {
		
	add : function(title, url, image, isExternal) {
		GM_log('add(title: ' + title + ', url: ' + url + ', img: ' + image + ', ext: ' + isExternal);
		var n = this.lastIndex++;
		this.settings['' + n] = new iql.Setting(title, url, image, isExternal);
		GM_log("After add: " + this.toString());
	},
	
	remove : function(index) {
		this.settings[index] = undefined;
		GM_log("After remove: " + this.toString());
	},
	
	toString : function() {
		return JSON.stringify(this.settings); 
	},
	
	write : function() {
		var cache = new Array();
		for (var i = 0; i < this.lastIndex; i++) {
			var set = this.settings['' + i]; 
			if (set != undefined) {
				cache.push(set);
			}
		}
		
		var json = JSON.stringify(cache);
		if (json) {
			GM_log("Writing: " + json);
			GM_setValue(this.KEY, json);
		}
		
		window.location.reload();
	},
	
	render : function(div) {
		for (var i = 0; i < this.lastIndex; i++) {
			var set = this.settings['' + i]; 
			if (set != undefined) {
				var lnk = set.render(i);
				if (lnk != undefined) {
					div.append(lnk);
				}
			}
		}
	},
	
	get : function(idx) {
		return this.settings[idx];
	},
	
	set : function(idx, title, url, image, isExternal) {
		if (this.settings[idx] != undefined) {
			GM_log('set(idx: ' + idx + ', title: ' + title + ', url: ' + url + ', img: ' + image + ', ext: ' + isExternal);
			this.settings[idx].title = title;
			this.settings[idx].url = url;
			this.settings[idx].image = image;
			this.settings[idx].isExternal = isExternal;
		} else {
			this.add(title, url, image, isExternal);
		}
	},
	
	length : function() {
		return this.lastIndex;
	},
	
};

iql.SettingWindow = function() {
	
	GM_addStyle(
		'#iqlSettingContainer { position:absolute; z-index:99999; top: 200px; left:50%; width:500px; }' +
		'#iqlSetting { display:none; position:relative; left: -250px; align:center; width: 350px; margin: 0 auto 0 auto; border:1px solid #612d04; background: #dbbe8c url(/skin/layout/bg_stone.jpg) repeat; }' +
		'#iqlSetting h3 { padding:10px 6px 0px 6px; margin:0; color:#612d04; font:bold 12px Arial, Helvetica, sans-serif; text-align:center; border-bottom:1px solid #f1d198; }' +
		'#iqlSetting table { width: 100%; margin:0; }' +
		'#iqlSetting .padded { padding: 10px 0px; }' +
		'#iqlSetting table td, #options table th { padding:4px 8px; }' +
		'#iqlSetting table th { text-align:right; font-weight:bold; padding-right:10px; }' +
		'#iqlSetting .goleft { width: 50%; margin:0; float:left; }' +
	'');
		
	$('body').append( $(
		'<div id="iqlSettingContainer"><div id="iqlSetting">' +
			'<h3>Ikariam Quick Links</h3>' +
			'<div><table cellpadding="0" cellspacing="0"><tbody>' +
				'<tr><th>Title</th><td colspan="3"><input id="iqlSetTitle" type="textfield" class="textfield" name="iqlSetTitle" size="28" /></td></tr>' +
				'<tr><th>URL</th><td colspan="3"><input id="iqlSetURL" type="textfield" class="textfield" name="iqlSetURL" size="28" /></td></tr>' +
				'<tr><th>Icon</th>' +
					'<td align="right"><a href="#" id="iqlSetPrevImg">&lt;</a></td>' +
			        '<td width="50" bgcolor="#7D0D0A"><img id="iqlSetImage" class="paddedx" src="' + iql.IMAGES[0] + '" border="0" /></td>' +
					'<td align="left"><a href="#" id="iqlSetNextImg">&gt;</a></td>' +
			    '</tr>' +
				'<tr><th>External</th><td colspan="3" align="left"><input id="iqlSetExt" type="checkbox" class="checkbox" name="iqlSetExt" /></td></tr>' +
				'<tr><th colspan="4"><div class="padded"><div class="goleft"><a href="#" id="iqlButtonCancel" class="button">Cancel</a></div><div class="goleft"><a href="#" id="iqlButtonOK" class="button">OK</a></div></div></th></tr>' +
				'<tr><th colspan="4">&nbsp;</th></tr>' +
			'</tbody></table></div>' +
		'</div></div>'
	) );
}

iql.SettingWindow.prototype = {
	
	edit : function(setting, callback) {
		$('#iqlSetTitle').val(setting.title);
		$('#iqlSetURL').val(setting.url);

		var imageIndex = setting.image;
		$('#iqlSetImage').attr('src', iql.IMAGES.get(imageIndex));
		
		if (setting.isExternal) {
			$('#iqlSetExt').attr('checked', 'true');
		} else {
			$('#iqlSetExt').removeAttr('checked');
		}

		$('#iqlSetNextImg').click(function() {
			imageIndex++;
			if (imageIndex > 24) {
				imageIndex = 0;
			}
			$('#iqlSetImage').attr('src', iql.IMAGES.get(imageIndex));
		});
		
		$('#iqlSetPrevImg').click(function() {
			imageIndex--;
			if (imageIndex < 0) {
				imageIndex = 24;
			}
			$('#iqlSetImage').attr('src', iql.IMAGES.get(imageIndex));
		});
		
		$('#iqlButtonCancel').click(function() { $('#iqlSetting').hide(); });
		
		$('#iqlButtonOK').click(function() {
			var isExt = $('#iqlSetExt').attr('checked');
			callback.call(this,
					$('#iqlSetTitle').val(),
					$('#iqlSetURL').val(),
					imageIndex,
					(isExt != undefined && isExt != false)
				);
			$('#iqlSetting').hide();
		});
		
		$('#iqlSetting').show();
	}
};

iql.Renderer = function(settings) {
	this.settings = settings;
	this.settingWindow = new iql.SettingWindow();
};

iql.Renderer.prototype = {
		
	render : function() {
		var div = $('<div id="iqlRenderer" class="goright" />');
		this.settings.render(div);
		return div;
	},
	
	index : function(id) {
		return parseInt(id.replace(/quicklink/, ""));
	},
	
	add : function() {
		var settings = this.settings;
		var idx = this.settings.lastIndex;
		var set = new iql.Setting("", "", 1, false);
		this.settingWindow.edit(set, function(t, u, i, e) {
			GM_log('before set(idx: ' + idx + ', title: ' + t + ', url: ' + u + ', img: ' + i + ', ext: ' + e);
			settings.set(idx, t, u, i, e);
			settings.write();
		});
	},

	remove : function(link) {
		if (this.settings.length() == 1) {
			alert("You cannot remove the last quicklink.\nEither add one more, or disable the script.");
		} else {
			this.settings.remove(this.index(link.id));
			this.settings.write();
		}
	},
	
	edit : function(link) {
		var idx = this.index(link.id);
		var settings = this.settings;
		var set = this.settings.get(idx);
		GM_log("Displaying window for " + JSON.stringify(set));
		this.settingWindow.edit(set, function(t, u, i, e) {
			GM_log('before set(idx: ' + idx + ', title: ' + t + ', url: ' + u + ', img: ' + i + ', ext: ' + e);
			settings.set(idx, t, u, i, e);
			settings.write();
		});
	},	
};

$( function() {
	GM_addStyle(
		'#iqlRenderer.goright { float:right; margin-right:20px; }' +
		'#iqlRenderer .quicklink { padding: 0 2px }' +
		'#iqlRenderer .tight { border: 0; }' +
	'');

	$('body').append($(
			'<div class="contextMenu" id="iqlContextMenu"><ul>' +
				'<li id="edit">Edit link...</li>' +
				'<li id="remove">Delete link</li>' +
				'<li id="new">Add link...</li>' +
			'</ul></div>')
		);

	var settings = new iql.Settings(top.location.host);
	if (settings.length() == 0) {
		settings.add('Right-click me!', '#', 12, false, false);
	}
	GM_log("Initialized: " + settings.toString());
	var renderer = new iql.Renderer(settings);
	$('#breadcrumbs').append(renderer.render());
	
	$('#iqlRenderer .quicklink').contextMenu('iqlContextMenu', {
		bindings: {
			'edit': function(t) {
				renderer.edit(t);
	        },
	        
	        'remove': function(t) {
				if (confirm('Are you sure you want to delete this link?')) {
					renderer.remove(t);
				}
	        },

	        'new': function(t) {
	        	renderer.add();
	        },

	    }

	});
});

// http://www.trendskitchens.co.nz/jquery/contextmenu/
(function($){var menu,shadow,trigger,content,hash,currentTarget;var defaults={menuStyle:{listStyle:'none',padding:'1px',margin:'0px',backgroundColor:'#fff',border:'1px solid #999',width:'100px'},itemStyle:{margin:'0px',color:'#000',display:'block',cursor:'default',padding:'3px',border:'1px solid #fff',backgroundColor:'transparent'},itemHoverStyle:{border:'1px solid #0a246a',backgroundColor:'#b6bdd2'},eventPosX:'pageX',eventPosY:'pageY',shadow:true,onContextMenu:null,onShowMenu:null};$.fn.contextMenu=function(id,options){if(!menu){menu=$('<div id="jqContextMenu"></div>').hide().css({position:'absolute',zIndex:'500'}).appendTo('body').bind('click',function(e){e.stopPropagation()})}if(!shadow){shadow=$('<div></div>').css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:499}).appendTo('body').hide()}hash=hash||[];hash.push({id:id,menuStyle:$.extend({},defaults.menuStyle,options.menuStyle||{}),itemStyle:$.extend({},defaults.itemStyle,options.itemStyle||{}),itemHoverStyle:$.extend({},defaults.itemHoverStyle,options.itemHoverStyle||{}),bindings:options.bindings||{},shadow:options.shadow||options.shadow===false?options.shadow:defaults.shadow,onContextMenu:options.onContextMenu||defaults.onContextMenu,onShowMenu:options.onShowMenu||defaults.onShowMenu,eventPosX:options.eventPosX||defaults.eventPosX,eventPosY:options.eventPosY||defaults.eventPosY});var index=hash.length-1;$(this).bind('contextmenu',function(e){var bShowContext=(!!hash[index].onContextMenu)?hash[index].onContextMenu(e):true;if(bShowContext)display(index,this,e,options);return false});return this};function display(index,trigger,e,options){var cur=hash[index];content=$('#'+cur.id).find('ul:first').clone(true);content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(function(){$(this).css(cur.itemHoverStyle)},function(){$(this).css(cur.itemStyle)}).find('img').css({verticalAlign:'middle',paddingRight:'2px'});menu.html(content);if(!!cur.onShowMenu)menu=cur.onShowMenu(e,menu);$.each(cur.bindings,function(id,func){$('#'+id,menu).bind('click',function(e){hide();func(trigger,currentTarget)})});menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();if(cur.shadow)shadow.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();$(document).one('click',hide)}function hide(){menu.hide();shadow.hide()}$.contextMenu={defaults:function(userDefaults){$.each(userDefaults,function(i,val){if(typeof val=='object'&&defaults[i]){$.extend(defaults[i],val)}else defaults[i]=val})}}})(jQuery);$(function(){$('div.contextMenu').hide()}); 