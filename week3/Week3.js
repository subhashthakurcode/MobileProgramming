$(document).ready(function() {

  function uniqueAnimate() {
    $(".box")
      // Move diagonally, enlarge, rotate, fade out, change color
      .animate(
        {
          left: "400px",
          top: "50px",
          width: "160px",
          height: "160px",
          opacity: 0.4
        },
        {
          duration: 1200,
          step: function(now, fx) {
            // Create rotation and color blend while animating
            let rotate = (now * 360) % 360;
            $(this).css("transform", `rotate(${rotate}deg) scale(1.2)`);
            $(this).css("background-color", `hsl(${rotate}, 80%, 60%)`);
          },
          easing: "swing",
          complete: function() {
            // Reverse direction and reset rotation
            $(this).animate(
              {
                left: "50px",
                top: "150px",
                width: "100px",
                height: "100px",
                opacity: 1
              },
              {
                duration: 1200,
                step: function(now, fx) {
                  let rotate = (now * 360) % 360;
                  $(this).css("transform", `rotate(-${rotate}deg) scale(1)`);
                  $(this).css("background-color", `hsl(${rotate}, 100%, 50%)`);
                },
                complete: uniqueAnimate // loop again
              }
            );
          }
        }
      );
  }

  uniqueAnimate(); // start animation

});
// toggle navbar when hamburger is clicked
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

