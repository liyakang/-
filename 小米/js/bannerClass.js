function Banner(container,dataUrl,interval){

    this.container = container;
    this.dataUrl = dataUrl;
    this.interval = interval || 2000;
    this.figure = utils.getElesByClass('figure',this.container)[0];
    this.focusList = utils.getElesByClass('focusList',this.container)[0];
    this.zuo = utils.getElesByClass('zuo',this.container)[0];
    this.you = utils.getElesByClass('you',this.container)[0];
    this.imgs = this.figure.getElementsByTagName('img');
    this.lis = this.focusList.getElementsByTagName('li');
    this.timer = null;
    this.step = 0;
    this.data = null;
    this.init();

}
Banner.prototype = {
    constructor : Banner,
    getData : function (){
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get',this.dataUrl+'?_='+new Date().getTime(),false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState ==  4 && /^2\d{2}$/.test(xhr.status)){
                that.data = utils.jsonParse(xhr.responseText);

            }
        }
        xhr.send(null);
    },
    bindData : function (){
        if(this.data){
            var strImg = '';
            var strLi = '';
            for(var i=0; i<this.data.length; i++){
                strImg += '<div><img src="" realSrc="'+this.data[i].src+'"></div>';
                strLi += i === 0 ? '<li class="selected"></li>' :'<li></li>';
            }
            this.figure.innerHTML = strImg;
            this.focusList.innerHTML = strLi;
        }
    },
    imgLoad : function (){
        var that = this;
        for(var i=0; i<this.imgs.length; i++){
            ;(function (i){
                var curImg = that.imgs[i];
                var tempImg = new Image();
                tempImg.src = curImg.getAttribute('realSrc');
                tempImg.onload = function (){
                    curImg.src = this.src;
                    utils.css(curImg,'display','block');
                    if(i === 0 ){
                        utils.css(curImg.parentNode,'zIndex',1);
                        animate(curImg.parentNode,{opacity:1},500);
                    }
                }
            })(i);
        }
    },
    autoMove : function (){
        this.step++;
        if(this.step == this.data.length){
            this.step = 0;
        }
        this.setImg();
    },
    setImg : function (){
        for(var i=0; i<this.imgs.length; i++){
            var curImg = this.imgs[i];
            if(i === this.step){
                utils.css(curImg.parentNode,'zIndex',1);
                animate(curImg.parentNode,{opacity : 1},300,function (){
                    var siblings = utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        utils.css(siblings[i],'opacity',0);
                    }
                });
            }else{
                utils.css(curImg.parentNode,'zIndex',0);
            }
        }
        for(var i=0; i<this.lis.length; i++){
            this.lis[i].className = i === this.step ? 'selected' : '';
        }
    },

    buttonBindEvent : function (){
        var that = this;
        this.zuo.onclick = function (){
            that.step--;
            if(that.step == -1){
                that.step = that.data.length-1;
            }
            that.setImg();
        }
        this.you.onclick = function (){
            that.autoMove();
        };
    },
    init : function (){
        var that = this;
        this.getData();
        this.bindData();
        this.imgLoad();
        this.timer = window.setInterval(function (){
            that.autoMove();
        },this.interval);
        this.buttonBindEvent();

    }
};




