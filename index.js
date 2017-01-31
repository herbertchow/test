var resText={
    4:'恭喜你<br>上上签，今天运气很棒喔！',
    1:'恭喜你<br>上签，今天运气不错！',
    2:'怎么说<br>中签，今天运气一般！',
    3:'很遗憾<br>下签，今天运气不佳！',
    0:'很遗憾<br>下下签，今天运气很糟糕喔！',
}

$("html").css("font-size",document.documentElement.clientHeight/document.documentElement.clientWidth<1.5 ? (document.documentElement.clientHeight/603*312.5+"%") : (document.documentElement.clientWidth/375*312.5+"%"));
window.onload = function(){
    var lastTime = 0;
    var x = y = z = lastX = lastY = lastZ = 0;
    var shakeSpeed = 800;

    if(window.DeviceMotionEvent){
        window.addEventListener('devicemotion', shake, false);
    }else{
        alert('本设备不支持摇一摇功能');
        return;
    }

    function shake(eventDate){
        //获取设备加速度信息
        var acceleration = eventDate.accelerationIncludingGravity;
        var nowTime = new Date().getTime();
        //如果这次摇的时间距离上次摇的时间有一定间隔 才执行
        if(nowTime - lastTime > 100){
            var diffTime = nowTime - lastTime;
            lastTime = nowTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
            if(speed > shakeSpeed){
                showResult();
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }
    }

    function rd(n,m){
        return Math.ceil(Math.random() * 4);
    }

    function showResult(){
        document.getElementById("result").className = 'result';
        document.getElementById("loading").className = 'loading loading-show';
        $('.fade').show();
        
        var num = rd();

        var textN = resText[num];
        console.log(textN)
        $('.con').html(textN)
        setTimeout(function(){
            document.getElementById("result").className = 'result result-show';
            document.getElementById("loading").className = 'loading';
            $('.fade').hide();
        }, 3*1000);

    }

    // $('.hand').on('click',function(){
    //     showResult();
    // });
};