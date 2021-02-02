// || Media Page JS for "LumberJack"

// || Curator carousel control buttons - Needs refactor. Produces display errors on fast clicking.




function getWidth() {
    console.log(getComputedStyle(document.getElementsByClassName("inner-frame")[0]).width);
    console.log(document.getElementById("curator-slider").style);
}





function curatorLeft() {
    document.getElementById("curator-slider").scrollBy(-310.5, 0);
}

function curatorRight() {
    document.getElementById("curator-slider").scrollBy(310.5, 0);
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