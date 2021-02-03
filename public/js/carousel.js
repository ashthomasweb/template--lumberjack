// || Media Page JS for "LumberJack"

{    
    let i = 0;
    
    function setPosition(input) {
        let viewWidth = getComputedStyle(document.getElementsByClassName("carousel--curator")[0]).width;

        if ( input === "left" ) {

            if ( i === 0 ) {
                // do nothing
            } else {
                i--;
            }

        } else if ( input === "right" ) {

            if ( viewWidth === "1000px" ) {

                if ( i === document.getElementsByClassName("crt-feed")[0].children.length - 3 ) {
                    // do nothing
                } else {
                    i++;
                }
                
            } else if ( viewWidth === "691px" ) {

                if ( i === document.getElementsByClassName("crt-feed")[0].children.length - 2 ) {
                    // do nothing
                } else {
                    i++;
                }

            } else {

                if ( i === document.getElementsByClassName("crt-feed")[0].children.length - 1 ) {
                    // do nothing
                } else {
                    i++;
                }

            }

        }

        return i;
    }
    
    function curatorLeft() {
        let pos = setPosition("left");    
        let slider = document.getElementById("curator-slider");
        let frame = document.getElementsByClassName("crt-feed")[0];
        slider.scrollTo(frame.children[pos].offsetLeft, 0);
    }
    
    function curatorRight() {
        let pos = setPosition("right");
        let slider = document.getElementById("curator-slider");
        let frame = document.getElementsByClassName("crt-feed")[0];
        slider.scrollTo(frame.children[pos].offsetLeft, 0);
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