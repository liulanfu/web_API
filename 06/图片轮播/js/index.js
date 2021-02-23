window.addEventListener('load', function () {

    let box = document.querySelector('.box');
    let lt = document.querySelector('.lt');
    let gt = document.querySelector('.gt');
    let olli = document.querySelector('.olli');
    let ulimg = document.querySelector('.ulimg');

    box.addEventListener('mouseover', function () {
        lt.style.display = 'block';
        gt.style.display = 'block';
        clearInterval(time);
        time = null;   //清除定时器变量
    });
    box.addEventListener('mouseout', function () {
        lt.style.display = 'none';
        gt.style.display = 'none';
        time = setInterval(function () {
            //手动调用点击事件
            gt.click();
        }, 2000)
    });


    //鼠标点击小圆点
    let boxWidth = box.offsetWidth;  //获取box的宽度
    for (let i = 0; i < ulimg.children.length; i++) {
        let li = document.createElement('li');
        // li.setAttribute('index_of', i);  //给每个小圆点添加index_of属性    -------可加可不加，不加就用i;----------
        olli.appendChild(li);
        //给每个小圆点添加单击事件
        olli.children[i].addEventListener('click', function () {
            for (let x = 0; x < olli.children.length; x++) {
                olli.children[x].className = "";
            }
            this.className = "curent";

            // let index_of = this.getAttribute('index_of');  //获取当前小圆点的index_of属性值
            num = i;
            circle = i;
            animate(ulimg, -i * boxWidth);
        });
    }

    olli.children[0].className = 'curent';

    let first = ulimg.children[0].cloneNode(true);
    ulimg.appendChild(first);

    let num = 0;
    let circle = 0;
    let flag = true;    //flag 节流阀
    //右箭头
    gt.addEventListener('click', function () {
        if (flag) {
            flag = false;   //关闭节流阀
            if (num == ulimg.children.length - 1) {
                ulimg.style.left = 0;
                num = 0;
            }
            num++;
            animate(ulimg, -num * boxWidth, function () {
                flag = true; //开启节流阀
            });

            //让小圆点的颜色随图片滚动;
            circle++;

            // if (circle == olli.children.length) {        //判断当图片走到最后一张是小圆点颜色返回第一个
            //     circle = 0;
            // }
            circle = circle == olli.children.length ? 0 : circle;

            //调用排他思想
            paita()
        }
    });

    //左箭头
    lt.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ulimg.children.length - 1;
                ulimg.style.left = -(ulimg.children.length - 1) * boxWidth + 'px';
            }
            num--;
            animate(ulimg, -num * boxWidth, function () {
                flag = true;
            });

            //让小圆点的颜色随图片滚动;
            circle--;

            // if(circle<0){       
            //     circle=olli.children.length-1;    //olli.children.length-1==最后一个小圆点索引号
            // }
                                // console.log(ulimg.children.length);   6
                                // console.log(olli.children.length);   5
            circle = circle < 0 ? olli.children.length - 1 : circle;
            //调用排他思想
            paita()
        }

    });

    //排他思想方法
    function paita() {
        //排他思想去除其他小圆点的颜色
        for (let j = 0; j < olli.children.length; j++) {
            olli.children[j].className = '';
        }

        olli.children[circle].className = 'curent';

    }


    //自动播放图片
    let time = setInterval(function () {
        //手动调用点击事件
        gt.click();
    }, 2000);
})