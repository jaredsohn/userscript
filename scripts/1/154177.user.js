// ==UserScript==
// @name       Bukkit.fr Favicon
// @namespace  http://plugins.ungeek.fr/bukkit-favicon
// @version    0.1
// @description  Une favicon pour le site Bukkit.fr sous forme de seau d'eau.
// @match      http://www.bukkit.fr/*
// @match      http://bukkit.fr/*
// @copyright  2012+, PunKeel
// ==/UserScript==

function addIcon(){
    var newIcon = document.createElement("link");
    newIcon.type = "image/x-icon";
    newIcon.rel = "shortcut icon";
    newIcon.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA6rAAAOqwGO7MT8AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABfElEQVR42uyXsUvDQBSHv6u2guBgF5cuilDRwTpUXLJkc8zgZgcHHR38JzJrR8GAcXLp6KJdOnZoJ6FQnEoRkc5KbeOQHpjjktapOfS3BN49Hve+/PJyJ4IgYJ7KMGctqgEhhDaxXC5rURUKBW1+rVbTFlKJp49AXMdruxcA5HJLiQXz+VUAHAhmIZI+ArLz5Y3TSLz/WQp3PFxILPj6lQNge+c8WrfXk0REuglIV/dergH42LwBIDtZH49H4c4zySSe39YBGLaODJsDUr7vA1CpVCLx0dZtYkG1Y8uyAGg0GoYRUElIqURUZUv3SqRqqAdUFYvFcNJZDwCc7D9q866ewufxXpjX7Zr2N/wxswMA13Uj65dn7wC028mFu5PWpfubzaYw2wOdTifiBan2BMVgMPjVuzePwKy6ax0CcLBSNYOAUM9o6pnQcRzt1xDnASnP87TuN+dMqKperwNg23YkrnZu3L1gqgem3QviFDf5UucB8efvhv8b+B4AL+Z/BGuytOkAAAAASUVORK5CYII=";
    this.document.getElementsByTagName("head")[0].appendChild(newIcon);
}

addIcon();
