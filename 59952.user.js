// ==UserScript==
// @name           BasilMarket Tweak - Secret Basil surfing
// @namespace      http://www.basilmarket.com
// @description    Changes the BasilMarket title and icon
// @include        http://www.basilmarket.com/*
// ==/UserScript==

document.title = "Homework";

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');

icon.setAttribute('href', 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAEr0lEQVRIx62VW0hUaxiGn7VczrjG5TIddWqsKbOmjFAM7XyiLCqoyJu8CroISuigFF0lhFd1U0aHi6AQSgq7qCjTQmIyOhhoVE6QqYmmqTXqrBlnmsP690VUGzbu2rHfqx/+n+97eL/344c/VGJiWdmVK0LU1ra0DAwI8ad1/kAHD3q9QsDp05GIEGlp589Ho0KcOnX9elvbfweRf/Xg3LmWls5OIVT1zBkhhLBa3e6cHID+/s5O8PuDwUAAKiqGhgoL4eLF8+fv3Pl9EGmyizVrKis9HiE8HocjLw8kyecbHYU9ezZtcrvBZovHx8ehufnVq9FR6OgQwuEATYtELBaoqFDVR4/g+PFDh9atkybt8w8HnM6dO2/fFsLjmTt30SKA9+8HB2Hv3lWrXC5Q1VBoZAT8ftNUVejuNgxFAdMMBL58AcMIBgcH4cQJcLuhvPzkyadPJ3fkB5nDUVXV0iKEYWRlrVwJ0Wg8DrB//+zZgQBEIrHYwABMTGjanDlw5cqzZ2NjEI8rimlCPC5J39qYpmGAqgqhaaAofr/fD7W1S5d6vVBaumPH9u0/HZFqajyet2+FaGzs73c44NOncNhmg/b24eHhYQCf7+tX2LixsHD2bGhu/vDBMMA0JSkcBk0TwmoFWTZN04Txcb8/FAKrdWBgdBQaGnbt6u6GoqKlS9evh9RUXde0nwDKli1u96xZcPTou3eSBMXFPl9PDyQkxGJpaaCqmZm6Ds3Nvb0+H8Tjfr9hAMRi0SgYRmKiJEFSkixrGsDz57duQW9vfX1pKcRikUh2NtTV1dXV1f1rCHfvfvxYiClTVq9esQKczr6+ri7o6UlMTE8HWf5mcCg0MWEYoCiqmpAAKSmynJQE6ekvX968CffuHTmyahUEAooSCoHFYrFYLKAoiYlWK7jdc+fm5v504EcIGxv37XO5IBQaHPT7QZZzc3UdYjFJCgRgYiIcjkTANOPxaBRsNp9PUaCycubMri64e/fw4aIiePDgzZsnT8But9vtdtA0TdM0GB7+NtKRkc+ffb6foVS+HzZtWrzY5ZIkKCq6dEkIr3fr1rIyKCwcGHj9Gjo6UlOLiiAeDwY/foTa2h07AgHw+fr62togGrXZ1q4Fm01RNA2ampqamppAlmVZlsFmS05OSQEhhPj7Tky6n5pWVdXbK4Si5Oa6XKAo167dvw8HDpSUeL2QlSVJSUkQDEpSMAiynJxsscCUKTabrsPUqbqelQWmqShjY+B0qqqmga7PmrV8OeTm5uRkZEiSMhlAcbHXW18PHk9Dg6pCWdmCBY2NMD4+MpKfD3Z7Xp7TCboeDqenQ1pacnIwCKqq61YraFpqakYGVFd7PDNmQGtrR0c8DtHohw+XL8PY2Pi4YQgxqQPfZbEsXFhTI0R5+fLlXi/Y7U6nzQbZ2S5XcTFcuPDwoa7Dixe9vdEoQDjc3Q3bts2frygwbVpycn8/bNu2deuGDVBQUFBQUADTp2dnOxyS9EuA6urLl9vahDh27OzZGzdA12HhQsjPd7tDIcjLs9uHhqCkZMmSefNg3brNm5ctg8zMjAyn89f1f1s3b9bXX70qRHt7a+vLl//f9/sXiBwI5Cq0DswAAAAASUVORK5CYII=');

head.appendChild(icon);