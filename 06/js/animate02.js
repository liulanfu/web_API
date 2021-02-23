function animate({
    el,
    target,
    step = 1,  //给个默认值
    interval = 10,   //给个默认值
    ease = false,
    callback = function () {
    }
}) {

    const forword = target - el.offsetLeft > 0 ? true : false;    //判断forword是大于零还是小于零,然后赋给相应的布尔值

    clearInterval(el.timer);

    el.timer = setInterval(() => {

        if (ease) {

            let Msteop = (target - el.offsetLeft) / step;     //缓动动画的步长

            if (el.offsetLeft == target) {

                clearInterval(el.timer); //若走的距离与目标值相等的时候清除定时器
                // if (callback) {
                //     callback();
                // }

                callback && callback();

                return;

            } else {

                Msteop = Msteop > 0 ? Math.ceil(Msteop) : Math.floor(Msteop);   //判断步长是大于零还是小于零,大于零就向上取值,小于零就向下取值

                el.style.left = el.offsetLeft + Msteop + 'px';

                return;

            }



        }
        if (forword) {

            if (el.offsetLeft >= target) {
                clearInterval(el.timer);
                // if (callback) {
                //     callback();
                // }
                callback && callback();
                return;
            }
            el.style.left = el.offsetLeft + step + 'px';

        } else {

            if (el.offsetLeft <= target) {
                clearInterval(el.timer);
                // if (callback) {
                //     callback();
                // }
                callback && callback();
                return;
            }

            el.style.left = el.offsetLeft - step + 'px';
        }
    }, interval);
}

