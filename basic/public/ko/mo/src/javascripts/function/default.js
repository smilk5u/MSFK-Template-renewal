"use strict";
var winW;
var winH;
var winSc = $(window).scrollTop();
var $window = $(window),
    $header = $("header"),
    $footer = $("footer"),
    $container = $("#container");

$window.load(function () {
    var _this =  $(this);
    winW = _this.width();
    winH = _this.height();
    winSc = _this.scrollTop();
    $window.on("resize", function () {
        winW = _this.width();
        winH = _this.height();
    });
    _this.trigger("resize");
    $(window).scroll(function () {
        winSc = _this.scrollTop();
    });
    layout();
    main();
});