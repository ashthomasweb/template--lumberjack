// || Media Page JS for "LumberJack"

// || Carousel click and position helper

{
    let i = 0;
    
    function setPosition(input) {
        
        if (input === "left") {
            
            if (i === 0) {
                // do nothing
            } else {
                i--;
            }
            
        } else if (input === "right") {
            
            function viewRange() {
        
                let viewWidth = getComputedStyle(document.getElementsByClassName("carousel--curator")[0]).width;
                let viewNum = Number(viewWidth.replace("px", ""));
        
                if ( viewNum > 998 ) {
                    return "full";
                } else if ( viewNum < 692 && viewNum > 690 ) {
                    return "mid";
                } else {
                    return "small";
                }
        
            }
            
            if ( viewRange() === "full") {
               
                if (i === document.getElementsByClassName("crt-feed")[0].children.length - 3) {
                    // do nothing
                } else {
                    i++;
                }

            } else if ( viewRange() === "mid" ) {

                if (i === document.getElementsByClassName("crt-feed")[0].children.length - 2) {
                    // do nothing
                } else {
                    i++;
                }

            } else if ( viewRange() === "small" ) {

                if (i === document.getElementsByClassName("crt-feed")[0].children.length - 1) {
                    // do nothing
                } else {
                    i++;
                }

            } else {

            }

        }

        return i;
    }

    function curatorLeft() {
        let pos = setPosition("left");
        document.getElementById("curator-slider").scrollTo(document.getElementsByClassName("crt-feed")[0].children[pos].offsetLeft, 0);
    }

    function curatorRight() {
        let pos = setPosition("right");
        document.getElementById("curator-slider").scrollTo(document.getElementsByClassName("crt-feed")[0].children[pos].offsetLeft, 0);
    }

}

document.getElementById("curator-hover").addEventListener("mouseover", function () {
    document.getElementById("left-button").style.opacity = "1";
    document.getElementById("right-button").style.opacity = "1";
});

document.getElementById("curator-hover").addEventListener("mouseout", function () {
    document.getElementById("left-button").style.opacity = "0.2";
    document.getElementById("right-button").style.opacity = "0.2";
});


// || END of document 