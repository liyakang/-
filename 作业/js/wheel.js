/*处理dom鼠标滚轮事件的兼容性问题*/
~(function () {
    function addWheelEventListener(ele, handler) {
        if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
            ele.addEventListener('DOMMouseScroll', fn);
        } else {
            ele.onmousewheel = fn;
        }
        var isDown = null;

        function fn(e) {
            e = e || window.event;
            if (e.wheelDelta) {
                isDown = e.wheelDelta < 0;
            } else if (e.detail) {
                isDown = e.detail > 0;
            }
            if (typeof handler === 'function') {
                handler.call(ele, isDown, e);
            }
            e.preventDefault ? e.preventDefault() : returnValue = false;
        }
    }

    window.addWheelEventListener = addWheelEventListener;
})();