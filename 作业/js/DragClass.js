function Emitter() {

}
Emitter.prototype.on = function (type, fn) {

    if (!this[type]) {
        this[type] = [];
    }
    var a = this[type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            return
        }
    }
    a.push(fn);
    return this;
};
Emitter.prototype.off = function (type, fn) {
    var a = this[type];
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === fn) {
                a[i] = null;
                break;
            }
        }
    }
    return this;
};
Emitter.prototype.run = function (type, e) {
    var a = this[type];
    if (a && a.length) {
        for (var i = 0; i < a.length; i++) {
            if (typeof a[i] === 'function') {
                a[i].call(this, e)
            } else {
                a.splice(i, 1);
                i--;
            }
        }
    }
};


function Drag(element) {
    this.element = element;
    this.l = null;
    this.t = null;
    var that = this;
    this.DOWN = function (e) {
        that.down(e)
    };
    this.MOVE = function (e) {
        that.move(e)
    };
    this.UP = function (e) {
        that.up(e)
    };
    on(this.element, 'mousedown', this.DOWN)
}
Drag.prototype = new Emitter();
Drag.prototype.constructor = Drag;
Drag.prototype.down = function (e) {
    this.l = e.pageX - this.element.offsetLeft;
    this.t = e.pageY - this.element.offsetTop;
    if (this.element.setCapture) {
        this.element.setCapture();
        on(this.element, 'mousemove', this.MOVE);
        on(this.element, 'mousemup', this.UP);
    } else {
        on(document, 'mousemove', this.MOVE);
        on(document, 'mouseup', this.UP);
    }
    this.run('selfdragstart', e);
};
Drag.prototype.move = function (e) {
    var l = e.pageX - this.l;
    var t = e.pageY - this.t;
    var minL = 0, minT = 0;
    var maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.element.offsetWidth;
    var maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.element.offsetHeight;
    l = l < minL ? minL : l > maxL ? maxL : l;
    t = t < minT ? minT : t > maxT ? maxT : t;
    this.element.style.left = l + 'px';
    this.element.style.top = t + 'px';
    e.preventDefault();
    this.run('selfdraging', e)

};
Drag.prototype.up = function (e) {
    if (this.element.releaseCapture) {
        this.element.releaseCapture();
        off(this.element, 'mousemove', this.MOVE);
        off(this.element, 'mouseup', this.UP);
    } else {
        off(document, 'mousemove', this.MOVE);
        off(document, 'mouseup', this.UP);
    }
    this.run('selfdragend', e)
};