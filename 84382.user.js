// ==UserScript==
// @name           Google Calendar Dynamic Icon
// @description    Changes the number on the Google Calendar favicon to reflect the current date, as per http://remysharp.com/2010/08/24/dynamic-favicons
// @version        1.2
// @author         Ramenkage
// @namespace      http://userscripts.org/users/211311
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// ==/UserScript==

function updateFavicon() {
  var canvas = document.createElement('canvas'),
      ctx,
      img = document.createElement('img'),
      link = document.createElement('link'),
      today = new Date(),
      day = today.getDate() + '',
      head = document.getElementsByTagName('head')[0];
    
  if (canvas.getContext) {
    canvas.height = canvas.width = 16; // set the size
    ctx = canvas.getContext('2d');
    function afterLoad() {
      ctx.drawImage(img, 0, 0);
      ctx.font = 'bold 10px "helvetica","Arial",sans-serif';
      ctx.fillStyle = '#F0EEDD';
      if (day.length == 1) day = '0' + day;
      ctx.textAlign = 'center';
      ctx.fillText(day, 8, 13);
      link.setAttribute('type', 'image/png');
      link.setAttribute('rel', 'shortcut icon');
      link.setAttribute('href', canvas.toDataURL('image/png'));
      head.appendChild(link);
    }
    img.addEventListener("load", afterLoad, false);
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7UlEQVQ4jZ3TyU5TYRyG8W86pzfgzjvgKnoBbg+UtlhspS1lkBZsBcEB2HoLLFyZFAUVRKUOqAUroOIIKCjEIQ5REwwsHxc9tLUQIS7+qy/vs/glnxBCCM/gFqXr/419+id271esEx+wulYxHa/RrU/R8QLq6H1UYw4ZnEBUjk1qGe2NoRpz2H3fsLo/Yh1/h0kuYtoW0PFZbP95tDeGDIwh/VcQdZcoBbYftTeG1fMJK/0ek1rCtD9HN8+hmvKld3noHKJuBOFk3cDAJp7BLWqSQxxM57Eya5jON5j2F+jEPDo6jQrf5UDkAjXJIexEAVE77AYGNvGc3cA+9QP75BeszDpW51vMsZfolsfo2ENUZAoZmkQGxpG+UUTtxeLYySI8/RtVaCtltFgBFbmHCuWQwWvI+st/j50swj7zC7t3G20Vk1xEty6g449c8VvIhglkvYtWOXayCLvvO1a3i5ZcwrQ9QzfPopryqCO3kQ3Xkf6rZbQdgZ7PWOk1TGq5KJ6YR0WnUeE7yMM3kIExhG8E4QzvHrAy65hKtOgMKjyFDN1EBsYRvtGy+K6BrhVMxyt0yxNXfA+06iuKV6EF/4G2I1BCe1CFto+xk0XoxJwr7qL590DbEYjOYCcK/3XCyRZ/pAxN7h+t8oQQfwDQbBvNrEGGuAAAAABJRU5ErkJggg==';
  }
  
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  tomorrow.setMilliseconds(0);
  setTimeout(updateFavicon, tomorrow.getTime() - today.getTime());
}

updateFavicon();