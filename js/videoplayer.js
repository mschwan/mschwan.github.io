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
    //var isFullscreen = (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
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
    
    /*  FUNCTIONS
        ---------  */
    function enterFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    
    function exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    
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
            var buffered = $(this).closest(".widget-video").find("video")[0].buffered.end(0) / $(this).closest(".widget-video").find("video")[0].duration;
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
        if(!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)) {
            enterFullscreen($(this).closest(".widget-video")[0]);
            $(this).html('<i class="fa fa-compress"></i>');
            $(".widget-video-seek").css("bottom", "2.5em");
        } else {
            exitFullscreen();
            $(this).html('<i class="fa fa-expand"></i>');
            $(".widget-video-seek").css("bottom", "0.5em");
        }
    });
    
    $video.on("click", function() {
        if($(this)[0].paused) {
            $(this)[0].play();
            $(this).closest(".widget-video").find(".widget-video-controls").find(".widget-video-play-pause").html('<i class="fa fa-pause"></i>');
        } else {
            $(this)[0].pause();
            $(this).closest(".widget-video").find(".widget-video-controls").find(".widget-video-play-pause").html('<i class="fa fa-play"></i>');
        }
    });
    
    $video.on("dblclick", function() {
        if(!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)) {
            enterFullscreen($(this).closest(".widget-video")[0]);
            $(this).closest(".widget-video").find(".widget-video-fullscreen").html('<i class="fa fa-compress"></i>');
            $(".widget-video-seek").css("bottom", "2.5em");
        } else {
            exitFullscreen();
            $(this).closest(".widget-video").find(".widget-video-fullscreen").html('<i class="fa fa-expand"></i>');
            $(".widget-video-seek").css("bottom", "0.5em");
        }
    });
    
    var idleTimer;
    //var forceMouseHide = false;

    //$video.css("cursor", "none");

    $video.mousemove(function() {
        $video.css("cursor", "pointer");
        if(!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)) {
            $(this).closest(".widget-video").find(".widget-video-seek").css("bottom", "1em");
        } else {
            $(this).closest(".widget-video").find(".widget-video-seek").css("bottom", "3em");
        }
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function() {
            $("video").css("cursor", "none");
            if(!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)) {
                $(".widget-video-seek").css("bottom", "0.5em");
            } else {
                $(".widget-video-seek").css("bottom", "2.5em");
            }
        }, 1000);
    });
    
    $video.mouseout(function() {
        if(!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement)) {
            $(this).closest(".widget-video").find(".widget-video-seek").css("bottom", "0.5em");
        } else {
            $(this).closest(".widget-video").find(".widget-video-seek").css("bottom", "2.5em");
        }
    });
    
    /*$video.on("mousemove", function(event) {
        var pos
        while()
        if($(this).css("cursor") == "none") {
            $(this).css("cursor", "pointer");
        } else {
            $(this).css("cursor", "none");
        }
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

