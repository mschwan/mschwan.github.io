/*=
===
=== VIDEOPLAYER
===
=*/

$(document).ready(function() {
    
    // testing
    var $video = $(".widget-video").find("video");
    var $playpause = $(".widget-video").find(".widget-video-play-pause");
    var $iconPlay = $("<i>", {
        class: "fa fa-play"
    });
    var $iconPause = $("<i>", {
        class: "fa fa-pause"
    });
    
    $video.each(function() {
        $(this)[0].removeAttribute("controls");
    })
    
    $playpause.on("click", function() {
        if($(this).closest(".widget-video-controls").siblings("video")[0].paused) {
            $(this).closest(".widget-video-controls").siblings("video")[0].play();
            $(this).html('<i class="fa fa-pause"></i>');
        }
        else {
            $(this).closest(".widget-video-controls").siblings("video")[0].pause();
            $(this).html('<i class="fa fa-play"></i>');
        }
    });
    
    $video.on("click", function() {
        if($(this)[0].paused) {
            $(this)[0].play();
            $(this).closest(".widget-video").find(".widget-video-controls").find(".widget-video-play-pause").html('<i class="fa fa-pause"></i>');
        }
        else {
            $(this)[0].pause();
            $(this).closest(".widget-video").find(".widget-video-controls").find(".widget-video-play-pause").html('<i class="fa fa-play"></i>');
        }
    });
    
    $video.on("dblclick", function() {
        if(!document.fullscreenElement || !document.mozFullScreenElement || !document.webkitFullscreenElement) {
            if ($(this)[0].requestFullscreen) {
                $(this)[0].requestFullscreen();
            } else if ($(this)[0].mozRequestFullScreen) {
                $(this)[0].mozRequestFullScreen();
            } else if ($(this)[0].webkitRequestFullscreen) {
                $(this)[0].webkitRequestFullscreen();
            }
        }
        else {
            if ($(this)[0].exitFullscreen) {
                $(this)[0].exitFullscreen();
            } else if ($(this)[0].mozCancelFullScreen) {
                $(this)[0].mozCancelFullScreen();
            } else if ($(this)[0].webkitExitFullscreen) {
                $(this)[0].webkitExitFullscreen();
            }
        }
    });
    /*.each(function(index, element) {
        $(element).css("color", "#28d");
        $(element).text("blablablub");
    });*/
    
/*
    // icons
    var $iconPlay = $("<i>", {
        class: "fa fa-play"
    });
    var $iconPause = $("<i>", {
        class: "fa fa-pause"
    });
    var $iconMaximise = $("<i>", {
        class: "fa fa-expand"
    });
    var $iconMinimise = $("<i>", {
        class: "fa fa-compress"
    });


    // control widgets
    var $video = $(".widget-video video");
    var $videoControls = $("<div>", {
        class: "widget-video-controls"
    });
    var $buttonPlayPause = $("<div>", {
        class: "widget-video-play-pause"
    });
    var $buttonFullscreen = $("<div>", {
        class: "widget-video-fullscreen"
    });


    // control widget creation on all videos
    $(".widget-video").each(function() {
        $video.removeAttribute("controls");
    })
    $(".widget-video").append($widgetVideoControls);

    $buttonPlayPause.append($iconPlay);
    $(".widget-video-controls").append($buttonPlayPause);

    $buttonFullscreen.append($iconMaximise);
    $(".widget-video-controls").append($buttonFullscreen);


    // control widget functions
    $(".widget-video-play-pause").on("click", function() {
        if ($("video").get(0).paused) {
            $("video").get(0).play();
            $buttonPlayPause.text("");
            $buttonPlayPause.append($iconPause);
        } else {
            $("video").get(0).pause();
            $buttonPlayPause.text("");
            $buttonPlayPause.append($iconPlay);
        }
    });

    $(".widget-video-fullscreen").on("click", function() {
        if ($("video").get(0).requestFullscreen) {
            $("video").get(0).requestFullscreen();
        } else if ($("video").get(0).mozRequestFullScreen) {
            $("video").get(0).mozRequestFullScreen();
        } else if ($("video").get(0).webkitRequestFullscreen) {
            $("video").get(0).webkitRequestFullscreen();
        }
    });
    */
});

