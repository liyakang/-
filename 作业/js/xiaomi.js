~(function () {
    var search_box = document.getElementById('search_box');
    var input = utils.getElesByClass('input', search_box)[0];
    var lis_a = utils.getElesByClass('lia_a', search_box)[0];
    var down = utils.getElesByClass('down', search_box)[0];
    down.onclick = function (e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        if (e.target.nodeName == 'SPAN') {
            input.value = e.target.innerHTML;
            this.style.display = 'none';
        }
    };
    input.onfocus = function () {
        utils.css(lis_a, 'display', 'none');
        animate(down, {display: 'block', height: 360}, 300)
    };
    input.onblur = function () {
        utils.css(lis_a, 'display', 'block');
        animate(down, {display: 'none', height: 360}, 300)
    };
}());
~(function () {
    var banner = utils.getElesByClass('shuffling')[0];
    var figure = utils.getElesByClass('figure', banner)[0];
    var uls = utils.getElesByClass('focusList', banner)[0];
    var lis = uls.getElementsByTagName('li');
    var imgs = figure.getElementsByTagName('img');
    var left = utils.getElesByClass('you', banner)[0];
    var right = utils.getElesByClass('zuo', banner)[0];
    ~(function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'data.txt?_=' + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                window.data = utils.jsonParse(xhr.responseText)
            }
        };
        xhr.send(null)
    })();
    ~(function () {
        if (window.data) {
            var str = '';
            var str1 = '';
            for (var i = 0; i < data.length; i++) {
                str += '<div><img src="" salt="' + data[i].src + '"></div>';
                str1 += i == 0 ? '<li class="mei"></li>' : '<li></li>';
            }
        }
        figure.innerHTML = str;
        uls.innerHTML = str1;
    })();
    ~(function () {
        for (var i = 0; i < imgs.length; i++) {
            (function (i) {
                var curImg = imgs[i];
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('salt');
                tempImg.onload = function () {
                    curImg.src = this.src;
                    utils.css(curImg, 'display', 'block');
                    if (i == 0) {
                        utils.css(curImg.parentNode, 'zIndex', 1);
                        animate(curImg.parentNode, {opacity: 1}, 500)
                    }
                }
            })(i)
        }
    })();
    var step = 0;

    function autoMove() {
        step++;
        if (step == data.length) {
            step = 0
        }
        setImg()
    }

    var timer = window.setInterval(autoMove, 3000);

    function setImg() {
        for (var i = 0; i < imgs.length; i++) {
            var cur = imgs[i];
            if (i == step) {
                utils.css(cur.parentNode, 'zIndex', 1);
                animate(cur.parentNode, {opacity: 1}, 300, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        utils.css(siblings[i], 'zIndex', 0);
                    }
                })
            } else {
                utils.css(cur.parentNode, 'opacity', 0)
            }
        }
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = i == step ? 'mei' : ''
        }
    }

    banner.onmouseover = function () {
        window.clearInterval(timer);
    };
    banner.onmouseout = function () {
        timer = window.setInterval(autoMove, 2000);
    };
    ~(function () {
        left.onclick = autoMove;
    })();

    right.onclick = function () {
        step--;
        if (step == -1) {
            step = data.length - 1
        }
        setImg()
    };
    ~(function () {
        for (var i = 0; i < lis.length; i++) {
            (function (i) {
                lis[i].index = i;
                lis[i].onclick = function () {
                    step = this.index;
                    setImg()
                }
            })(i)
        }
    })();

}());
~(function () {
    var sku = utils.getElesByClass('sku')[0];
    var left2 = utils.getElesByClass('left2', sku)[0];
    var right3 = utils.getElesByClass('right3', sku)[0];
    var stuck2 = utils.getElesByClass('stuck2')[0];
    var stuck1 = utils.getElesByClass('stuck1')[0];

    function right() {
        animate(right3, {left: 0}, 300);
        animate(left2, {left: -1226}, 300, function () {
            utils.removeClass(stuck2, 'cc');
        });
        utils.addClass(stuck1, 'c');
    }

    function left() {
        animate(right3, {left: 1226}, 300);
        animate(left2, {left: 0}, 300, function () {
            utils.removeClass(stuck1, 'c');
        });
        utils.addClass(stuck2, 'cc');
    }

    utils.addClass(stuck2, 'cc');
    stuck1.onclick = left;
    stuck2.onclick = right;
}());
~(function () {
    for (var i = 0; i < 3; i++) {
        (function (i) {
            var dhz = utils.getElesByClass('dhz')[i];
            var xxk = utils.getElesByClass('xxk', dhz)[0];
            var ul = xxk.getElementsByTagName('ul')[0];
            var lis = ul.getElementsByTagName('li');
            var ols = dhz.getElementsByTagName('ol');
            for (var i = 0; i < lis.length; i++) {
                lis[i].zidingyishuxing = i;
                lis[i].onmouseover = function () {
                    for (var j = 0; j < lis.length; j++) {
                        lis[j].className = '';
                        ols[j].className = '';
                    }
                    this.className = 'selected';
                    ols[this.zidingyishuxing].className = 'selected';
                }
            }
        })(i);
    }
}());
~(function () {
    var perdue = document.getElementById('perdue');
    var uls = utils.children(perdue, 'ul');
    var item = uls.length;
    utils.css(perdue, {'width': item * 256})
}());
(function () {
    var button1 = utils.getElesByClass('button1')[0];
    var button2 = utils.getElesByClass('button2')[0];
    var Recommend = utils.getElesByClass('Recommend')[0];
    var bb = utils.getElesByClass('bb', Recommend)[0];
    var uls = Recommend.getElementsByTagName('ul');
    var min = 0;
    utils.addClass(button1, 'dd');

    var isTrue = true;
    if(isTrue){
        function fn1() {
            if (min == uls.length - 1) {
                utils.removeClass(button1, 'dd');
                isTrue = true;

                return
            }
            min++;
            isTrue=false;
            utils.addClass(button2, 'd');
            utils.addClass(button1, 'dd');
            animate(bb, {left: min * -1226}, 500,function () {
                isTrue=true
            });
        }

    }



    if(isTrue){
        function fn2() {
            if (min == 0) {
                utils.removeClass(button2, 'd');
                window.clearInterval(timers);
                console.log(3);
                return
            }

            min--;
            isTrue=false;
            utils.addClass(button1, 'dd');
            animate(bb, {left: min * -1226}, 500, function () {
                isTrue=true;
            });
        }
    }
    button1.onclick = fn1;
    button2.onclick = fn2;

    // var timer = window.setInterval(function () {
    //     fn1();
    //     console.log(123)
    // }, 2000);
}());