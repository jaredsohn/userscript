// ==UserScript==
// @name       slinging.org Favicon
// @namespace  http://ivan.ivanych.net/
// @version    0.1
// @author     Ivan Boldyrev
// @licence    MIT
// @grant none
// @description Add favicon to slinging.org website
// @include     http://slinging.org/*
// @include     http://www.slinging.org/*
// ==/UserScript==

(function (){
    var icon = document.createElement("link");
    icon.setAttribute('type', 'image/png');
    icon.setAttribute('rel', 'shortcut icon');
    icon.setAttribute('href', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAbrwAAG68BXhqRHAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALHSURBVFiFxddPaFxVFMfxz30vlaY0NtFqKwhBaLE2i4IgolBBixu3Iv5ZCAqCoBUFcelCEBTahX8RRQgiinRX/NOCFYVId41WXCiCSiK2YBXbaEzSzHHx3tDnODPvZYaQCwceh98953vvuefOnRQRNnJkG5odI4NOTCntwC6MYh7zEbGw5kAR0diwG+/hAqKLzeAeZI1jriH5i1gpEy3jGF7C2/i2A+TdphBNkx+sBP8ae7toHsfFti5xPOMw9gwFgL2VlS/i+j7a6URk/7XVjFeHAXissvoTNdr72okTpzLezFjKirk3dpvTpAturnz/0E+YsV9B+l1wZyviXJ7SPziY8SBOdZlTO66pfO+s0bYgcSQizpW+X0qoya4zGpTgNZdK8DM29dHuL0vwW8ajOQ9n/JoROXcNegaqHRB4HnkPbcr5ouMQRs7MMIfwSvyuDLalOGCtzVwYZ247s1fwyShPl/o854GcmcSneVH7zcPeA08hRonTxApxhviG+Iz4gNjG35hqEm8QgAyHM+IWimkddoiL2zi+LgAVkEe20vqoC8AiMcESbl03gBLi3kmWV7pAvE6McR7XrhtARBhn5hVWOwGWiR1Fp/yhz5U9NACmRli6jvN3s/AC8TExT0wTWwuIk73atWqpDLjmkVK6DDdg3xZuGuXAX+xJpMVLsociYrpvoEF2oM/O3K64jtuX1hsDlwDjeAtnMYdDFDtWAzFbAfhyIAAknKgEatuzDQDer+hP1ul7/RpO4Y4u/if71rMYE5Xvn+rEvQC29/BfnlLa1CtYSinDvorrwzqAXts4gT/9vwRna7b/mYr2c4wMcwjvV1ytnRDvYKxDO4bnKvo5XN2oc2pWtFvx2j2q8uLFKk6X/q+wUPpbOIJdTVu38UWUUprEE7hN8by6qkx6Bj/ie7wcEbONArbjNgVYr7Hhf043HOBfTYjH2JvFNdMAAAAASUVORK5CYII=");
    this.document.getElementsByTagName("head")[0].appendChild(icon);
})();
