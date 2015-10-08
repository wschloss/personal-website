// Author: Walter Schlosser

// Shifts the current active slide to the slide with the passed id
// If no argument passed, shifts to next slide
function slideshift(id) {
  /* INSPIRED BY CODEACADEMY TUTORIAL */

  // Get the active slide and bullet
  var activeSlide = $(".slide.active");
  var activeBullet = $(".slide-buttons li.active");

  // Get the slide to shift to
  var nextSlide;
  var nextBullet;
  if (id === undefined) {
    // Get next in line
    nextSlide = activeSlide.next();
    nextBullet = activeBullet.next();
  } else {
    // Get the specified slide
    nextSlide = $(".slide#" + id);
    nextBullet = $("li[id=" + id + "]");
  }

  // Wrap around to beginning if needed
  if (!nextSlide.hasClass("slide")) {
    nextSlide = $(".slide").first();
    nextBullet = $(".slide-buttons li").first();
  }

  // Fade in/out appropriately, and switch the slide with the active class
  activeSlide.fadeOut(500).removeClass("active");
  nextSlide.fadeIn(500).addClass("active");

  activeBullet.removeClass("active");
  nextBullet.addClass("active");
}

$(document).ready( function() {

  /*
   * Fade in the name, tagline, and then first slide and slide buttons
   */
  var shiftIntervalID;
  $("div.name-box h1#name, div.name-box p#tagline").hide();
  $(".slide-buttons").hide();
  $("div.name-box h1#name").fadeIn(1500, function() { 
    $("div.name-box p#tagline").hide().fadeIn(1500, function() {
      $(".slide-buttons").fadeIn(500);
      $(".slide").first().fadeIn(500, function() {
        // Finally, schedule the slideshift function for every 5 seconds
        shiftIntervalID = setInterval(slideshift, 4000);
      }).addClass("active");
    });
  });


  /*
   * Add click selection functionality to the slide buttons
   */
  $(".slide-buttons li").click( function() {
    // Get the id of this button
    var id = $(this).attr("id");
    // shift to that slide, stop the auto shift
    slideshift(id);
    clearInterval(shiftIntervalID);
  });


  /*
   * Add click response to the header buttons
   */
  $(".header-button#github").click( function() {
    // open new window with my github profile
    window.open("https://github.com/wschloss", "_blank");
  });

  $(".header-button#resume").click( function() {
    // download my resume (open in new window if pdf viewer available)
    window.open("./schlosser_resume.pdf", "_blank");
  });


  /*
   * Contact button swaps out slides for the form
   */
  $(".header-button#contact").click( function() {
    // Fade out the slides
    $(".sliders").fadeOut(200, function() {
      // After faded out, fade in the form
      $(".contact-form-container").fadeIn(200);
    });
  });


  /*
   * Add dropdown text on button hover
   */
  $(".header-button").hover(
    function() {
      $(this).next().fadeIn(200);
    },
    function() {
      $(this).next().fadeOut(200);
    }
  );


  /*
   * Add emailing functionality to form submit with ajax call
   * (Thank you to stack overflow for this)
   */
  $("#contact-form-submit").click( function(event) {
    // don't do a normal submit
    event.preventDefault();
    // Get form data
    var data = 
      {
        name: $("input[name=name-value]").val(),
        email: $("input[name=email-value]").val(),
        message: $("textarea[name=message-value]").val()
      };
    // Alert for testing purposes
    alert(data.name + " " + data.email + " " + data.message);
    // Append response to the form
    $("#form-response").html("Your message was sent successfully").fadeIn(200);
  });

});

