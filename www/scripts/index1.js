// Основные сведения о пустом шаблоне см. в следующей документации:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Для отладки кода при загрузке страницы в Ripple, а также на устройства или в эмуляторы Android запустите приложение, задайте точки останова, 
// , а затем запустите "window.location.reload()" в консоли JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    var appUrl = 'http://allearthsoft.com/tables/callcenter/';
    var myTimerOff;
    var myIFrame;
    var myMessege;
    var isOnline;



    function checkConnection() {
        return navigator.connection.type;
    }

    function onOffline() {
        // Handle the offline event
        putOffline();
    }

    function onOnline() {
        // Handle the online event
        clearTimeout(myTimerOff);
        if (myMessege) {
            myMessege.remove();
            myMessege = null;
        }
        putOnline();
    }

    function putOffline() {
        if (!isOnline) return;
        isOnline = false;

        clearTimeout(myTimerOff);
        myTimerOff = setTimeout(showOfflineMessage, 3000);
    }

    function putOnline() {
        if (isOnline) return;
        isOnline = true;

        clearTimeout(myTimerOff);
        addIFrame();
    }

    function createOfflineMessage() {
        myMessege = $('<h1>').text('Network not available.').appendTo('body');
    }

    function showOfflineMessage() {
        removeIFrame();
        createOfflineMessage();
    }

    function setIFrame() {
        var win_w = $(window).width();
        var win_h = $(window).height();

        myIFrame.attr("width", win_w).attr("height", win_h).attr('src', appUrl).attr('frameborder', 'no');
    }

    function addIFrame() {
        if (myIFrame) return;

        myIFrame = $('<iframe>').attr('id', 'myiframe').appendTo('body');
        setIFrame();
    }

    function removeIFrame() {
        if (!myIFrame) return;

        myIFrame.attr('src', appUrl + '#destroy');
        myIFrame.remove();
        myIFrame = null;
    }

    function changeIFrame() {
        if (!isOnline) return;
        setTimeout(addIFrame, 250);
        removeIFrame();
    }

    function onDeviceReady() {
        // Обработка событий приостановки и возобновления Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        if (checkConnection() !== "none") {
            putOnline();
        } else {
            createOfflineMessage();
        }

        document.addEventListener("offline", onOffline.bind(this), false);
        document.addEventListener("online", onOnline.bind(this), false);

        window.addEventListener("orientationchange", changeIFrame, true); 
        
        //// TODO: Платформа Cordova загружена. Выполните здесь инициализацию, которая требуется Cordova.
        console.log("device ready");
    };

    function onPause() {
        //// TODO: Это приложение приостановлено. Сохраните здесь состояние приложения.
        clearTimeout(myTimerOff);
        myTimerOff = setTimeout(removeIFrame, 1500);
    };

    function onResume() {
        // TODO: Это приложение активировано повторно. Восстановите здесь состояние приложения.
        clearTimeout(myTimerOff);
        if (myIFrame) setIFrame();
        if (isOnline) addIFrame();
    };
} )();