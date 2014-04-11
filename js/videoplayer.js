/*=
===
=== VIDEOPLAYER
===
=*/

$(document).ready(function() {
    
    /*  VARIABLES
        ---------  */
    var $video = $(".widget-video").find("video");
    var $playpause = $(".widget-video").find(".widget-video-play-pause");
    //var $seek = $(".widget-video").find(".widget-video-seek");
    var $mute = $(".widget-video").find(".widget-video-mute");
    var $fullscreen = $(".widget-video").find(".widget-video-fullscreen");
    // FIXME: The following icon variables can only be used at one place in the DOM, otherwise some will be destroyed!
    /*var $iconPlay = $("<i>", {
        class: "fa fa-play"
    });
    var $iconPause = $("<i>", {
        class: "fa fa-pause"
    });
    var $iconMute = $("<i>", {
        class: "fa fa-volume-off"
    });
    var $iconVolume = $("<i>", {
        class: "fa fa-volume-up"
    });*/
    
    /*  CONSTRUCTORS
        ------------  */
    $video.each(function() {
        // misc
        $(this)[0].removeAttribute("controls");
        //$(this)[0].("preload", "metadata");
        // play pause
        $(this)[0].addEventListener("ended", function() {
            $(this).closest(".widget-video").find(".widget-video-play-pause").html('<i class="fa fa-play"></i>');
        });
        // timeline
        $(this).closest(".widget-video").find(".widget-video-seek").slider({
            min: 0,
            max: $(this)[0].duration,
            step: 0.01,
            value: 0,
            range: "min",
            orientation: "horizontal",
            animate: "fast",
            slide: function(event, ui) {
                $(this).closest(".widget-video").find("video")[0].currentTime = ui.value;
            }
        });
        $(this)[0].addEventListener("timeupdate", function() {
            $(this).closest(".widget-video").find(".widget-video-currenttime").text(Math.round($(this)[0].currentTime));
            $(this).closest(".widget-video").find(".widget-video-seek").slider("value", $(this)[0].currentTime);
        });
        $(this)[0].addEventListener("loadedmetadata", function() {
            $(this).closest(".widget-video").find(".widget-video-endtime").text(Math.round($(this)[0].duration));
            var buffered = Math.round($(this).closest(".widget-video").find("video")[0].buffered.end(0));
            $(this).closest(".widget-video").find(".widget-video-loaded").text(buffered);
        });
        // loading
        $(this)[0].addEventListener("progress", function() {
            var buffered = Math.round($(this).closest(".widget-video").find("video")[0].buffered.end(0));
            $(this).closest(".widget-video").find(".widget-video-loaded").text(buffered);
        });
        // mute
        if($(this)[0].muted) {
            $(this).closest(".widget-video").find(".widget-video-mute").html('<i class="fa fa-volume-off"></i>');
        }
        else {
            $(this).closest(".widget-video").find(".widget-video-mute").html('<i class="fa fa-volume-up"></i>');
        }
        $(this)[0].addEventListener("volumechange", function() {
            if($(this)[0].muted) {
                $(this).closest(".widget-video").find(".widget-video-mute").html('<i class="fa fa-volume-off"></i>');
            }
            else {
                $(this).closest(".widget-video").find(".widget-video-mute").html('<i class="fa fa-volume-up"></i>');
            }
        });
        // volume
        $(this).closest(".widget-video").find(".widget-video-volume").slider({
            min: 0,
            max: 1,
            step: 0.01,
            value: 0.6,
            range: "min",
            orientation: "horizontal",
            animate: "fast",
            slide: function(event, ui) {
                $(this).closest(".widget-video").find("video")[0].volume = Math.pow(ui.value, 2);
            }
        });
    });
    
    /*  ACTIONS
        ------  */
    $mute.on("click", function() {
        if($(this).closest(".widget-video").find("video")[0].muted) {
            $(this).closest(".widget-video").find("video")[0].muted = false;
            $(this).html('<i class="fa fa-volume-up"></i>');
        }
        else {
            $(this).closest(".widget-video").find("video")[0].muted = true;
            $(this).html('<i class="fa fa-volume-off"></i>');
        }
    });
    
    $playpause.on("click", function() {
        if($(this).closest(".widget-video").find("video")[0].paused) {
            $(this).closest(".widget-video").find("video")[0].play();
            $(this).html('<i class="fa fa-pause"></i>');
        }
        else {
            $(this).closest(".widget-video").find("video")[0].pause();
            $(this).html('<i class="fa fa-play"></i>');
        }
    });
    
    $fullscreen.on("click", function() {
        if(!document.fullscreenElement || !document.mozFullScreenElement || !document.webkitFullscreenElement) {
            if ($(this).closest(".widget-video").find("video")[0].requestFullscreen) {
                $(this).closest(".widget-video").find("video")[0].requestFullscreen();
            } else if ($(this).closest(".widget-video").find("video")[0].mozRequestFullScreen) {
                $(this).closest(".widget-video").find("video")[0].mozRequestFullScreen();
            } else if ($(this).closest(".widget-video").find("video")[0].webkitRequestFullscreen) {
                $(this).closest(".widget-video").find("video")[0].webkitRequestFullscreen();
            }
        }
        else {
            if ($(this).closest(".widget-video").find("video")[0].exitFullscreen) {
                $(this).closest(".widget-video").find("video")[0].exitFullscreen();
            } else if ($(this).closest(".widget-video").find("video")[0].mozCancelFullScreen) {
                $(this).closest(".widget-video").find("video")[0].mozCancelFullScreen();
            } else if ($(this).closest(".widget-video").find("video")[0].webkitExitFullscreen) {
                $(this).closest(".widget-video").find("video")[0].webkitExitFullscreen();
            }
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

