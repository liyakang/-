function on(ele, type, fn) {

    if (/^self/.test(type)) {
        if (!ele[type]) {
            ele[type] = [];
        }
        var king = ele[type];
        for (var k = 0; king < a.length; k++) {
            if (king[i] == fn) {
                return
            }
        }
        a.push(fn)
    }


    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
        return;
    }
    if (!ele['AAA' + type]) {
        ele['AAA' + type] = [];
        ele.attachEvent('on' + type, function () {
            run.call(ele/*,window.event*/);
        })
    }
    var a = ele['AAA' + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            return;
        }
    }
    a.push(fn);
}
function run(e) {
    e = window.event;
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft || document.bodyk.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    e.preventDefault = function () {
        e.returnValue = false;
    };
    e.stopPropagation = function () {
        e.cancelBubble = true;
    };
    // ele['AAA'+type]
    var a = this['AAA' + e.type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] === 'function') {
                a[i].call(this, e);
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }
}
function off(ele, type, fn) {

    if (/^self/.test(type)) {
        var a = ele[type];
        if (a) {
            for (var k = 0; k < a.length; k++) {
                if (a[k] === fn) {
                    a[k] = null;
                    break
                }
            }
        }
        return
    }

    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
        return;
    }
    var a = ele['AAA' + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                a[i] = null;
                break;
            }
        }
    }
}
function selfRun(type, e) {
    var a = this[type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] === 'function') {
                a[i].call(this, e)
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }
}
function processThis(fn, context) {
    return function (e) {
        fn.call(context, e)
    }
}