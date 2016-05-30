// Основные сведения о пустом шаблоне см. в следующей документации:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Для отладки кода при загрузке страницы в Ripple, а также на устройства или в эмуляторы Android запустите приложение, задайте точки останова, 
// , а затем запустите "window.location.reload()" в консоли JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    var appUrl = 'http://allearthsoft.com/tables/callcenter/';
    var myTimerOff;

    function checkConnection() {
        console.log('connection - ', navigator.connection.type);
        return navigator.connection.type;
    }

    function onOffline() {
        // Handle the offline event
        console.log("Event onOffline");
        
        console.log($("#myiframe"));
        if ($("#myiframe").length) {
            clearTimeout(myTimerOff);
            myTimerOff = setTimeout(removeFrame, 3000);
        } else {
            removeFrame();
        }
    };

    function removeFrame() {
        if (!myIFrame) return;
        $("#connectOff").remove();
        if (checkConnection() === "none") {
            $('body').append('<h1 id="connectOff">Network not available.</h1>');
        }

        myIFrame.attr('src', appUrl + '#destroy');
        myIFrame.remove();
        myIFrame = null;
        //if ($("#myiframe").length === 0) {
        //    console.log("myiframe удален");
        //}
    };

    function onOnline() {
        // Handle the online event
        console.log("Event onOnline");
        clearTimeout(myTimerOff);
        $("#connectOff").remove();
        addFrame();
    };

    var myIFrame;

    function setIFrame(myIFrame) {
        var win_w = $(window).width();
        var win_h = $(window).height();

        myIFrame.attr("width", win_w).attr("height", win_h).attr('src', appUrl).attr('frameborder', 'no');
    }

    function addFrame() {
        if (myIFrame) return;
        //$("#myiframe").remove();
        if (checkConnection() !== "none") {
            $("#connectOff").remove();
        }
        myIFrame = $('iframe').attr('id', 'myiframe').appendTo('body');

        setIFrame(myIFrame);

        //$('body').append('<iframe id="myiframe"></iframe>');

        

        //$("#myiframe").css({ "width": win_w });
        //$("#myiframe").css({ "height": win_h });

        $('#myiframe').attr('src', appUrl);
        $('#myiframe').attr('frameborder', 'no');
        if ($("#myiframe").length !== 0) {
            console.log("myiframe добавлен");
        }
    };

    function changeFrameT() {
        if (checkConnection() !== "none") {        
            clearTimeout(myTimerOff);
            myTimerOff = setTimeout(changeFrame, 250);

            $("#myiframe").attr('src', appUrl + '#destroy');
            myIFrame.remove();
            if ($("#myiframe").length === 0) {
                console.log("myiframe удален");
            }
        }
    }

    function changeFrame() {
        $('body').append('<iframe id="myiframe"></iframe>');
        var win_w = $(window).width();
        var win_h = $(window).height();

        $("#myiframe").css({ "width": win_w });
        $("#myiframe").css({ "height": win_h });
        $("#myiframe").css({ "scrolling": 'no' });

        $('#myiframe').attr('src', appUrl);
        $('#myiframe').attr('frameborder', 'no');
        if ($("#myiframe").length !== 0) {
            console.log("myiframe изменен");
        }

        console.log(screen.orientation, 'win_w = ', win_w, 'win_h = ', win_h); // e.g. portrait
    }

    function onDeviceReady() {
        // Обработка событий приостановки и возобновления Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        document.addEventListener("offline", onOffline.bind(this), false);
        document.addEventListener("online", onOnline.bind(this), false);

        window.addEventListener("orientationchange", changeFrameT, true); 
        
        // TODO: Платформа Cordova загружена. Выполните здесь инициализацию, которая требуется Cordova.
        console.log("device ready");

        if (checkConnection() !== "none") {
            addFrame();
        }        
    };

    function onPause() {
        // TODO: Это приложение приостановлено. Сохраните здесь состояние приложения.
        console.log("App 'onPause'");
        removeFrame();
    };

    function onResume() {
        // TODO: Это приложение активировано повторно. Восстановите здесь состояние приложения.
        console.log("App 'onResume'");
        if (checkConnection() !== "none") {
            addFrame();
        }
    };
} )();