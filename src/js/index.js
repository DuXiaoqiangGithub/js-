var btn = document.getElementsByClassName('btn')[0];
var box = document.getElementsByClassName('box')[0];
var flagbox = document.getElementsByClassName('flagbox')[0];
var score = document.getElementsByClassName('score')[0];
var alert = document.getElementsByClassName('alert')[0];
var close = document.getElementsByClassName('close')[0];
var check = document.getElementsByClassName('check');
var startGameBool = true;
var mineMap = [];
var mineNum,
    mineMark;



bindEvent();
function bindEvent() {
    btn.onclick = function () {
       if(startGameBool) {
        box.style.display = 'block';
        flagbox.style.display = 'block';
        init();
        startGameBool = false;
       }
    }
    box.oncontextmenu = function () {
        return false;
    }
    box.onmousedown = function (e) {
        var event = e.target;
        if(e.which == 1) {
            leftClick(event);
        }else if(e.which == 3) {
            rightClick(event);
        }
    }
    close.onclick = function () {
        alert.style.display = 'none';
        box.style.display = 'none';
        flagbox.style.display = 'none';
        box.innerHTML = '';
        startGameBool = true;
    }
}


function init() {
    mineNum = 10;
    mineMark = 10;
    score.innerHTML = mineMark;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('check');
            con.setAttribute('id', i + '-' + j);
            box.appendChild(con);
            mineMap.push({ mine: 0 });
        }
    }
    while (mineNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine === 0) {
            mineMap[mineIndex].mine = 1;
            check[mineIndex].classList.add('mine');
            mineNum--;
        }
    }

}

function leftClick (dom) {
    if(dom.classList.contains('flag')) {
        return;
    }
    var mine = document.getElementsByClassName('mine');
    if(dom && dom.classList.contains('mine')) {
        // console.log('gameOver');
        for (var i = 0; i < mine.length; i++) {
            mine[i].classList.add('show');
        }
        setTimeout(function() {
            alert.style.display = 'block';
            alert.style.backgroundImage = 'url("/Users/duxiaoqiang/Desktop/渡一项目/扫雷/src/img/gameOver.png")';
        }, 800)
    }else{
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && + posArr[0];
        var posY = posArr && + posArr[1];
        dom && dom.classList.add('num');
        for(var i = posX - 1; i <= posX + 1; i++){
            for(var j = posY - 1; j <= posY + 1; j++) {
                var mineArr = document.getElementById(i + '-' + j);
                if(mineArr && mineArr.classList.contains('mine')) {
                    n ++;
                }
            }
        }
        dom && (dom.innerHTML = n);
        if (n == 0){
            for(var i = posX - 1; i <= posX + 1; i++){
                for(var j = posY - 1; j <= posY + 1; j++) {
                var nearArr = document.getElementById(i + '-' + j);
                    if(nearArr && nearArr.length != 0) {
                        if(!nearArr.classList.contains('mark')) {
                            nearArr.classList.add('mark');
                            leftClick(nearArr);
                        }
                    }
                }
            } 
        }
    }
}



function rightClick (dom) {
    if(dom.classList.contains('num')) {
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains('mine') && dom.classList.contains('flag')){
        mineMark --;
    }
    if(dom.classList.contains('mine') && !dom.classList.contains('flag')){
        mineMark ++;
    }
    score.innerHTML = mineMark;
    if(mineMark == 0) {
        console.log(1);
        alert.style.display = 'block';
        alert.style.backgroundImage = 'url("/Users/duxiaoqiang/Desktop/扫雷/src/img/fighting.png")';
    }
}