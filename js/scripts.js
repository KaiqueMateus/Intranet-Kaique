$( document ).ready(function() {

  // Progress bar
  let containerA = document.getElementById("circleA");

  let circleA = new ProgressBar.Circle(containerA, {

    color: '#1F3C8E',
    strokeWidth: 12,
    duration: 2600,
    from: { color: '#EE781F'},
    to: { color: '#EE781F'},

    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);

      var value = Math.round(circle.value() * 5040);
      circle.setText(value);

    }
 
  });

  let containerB = document.getElementById("circleB");

  let circleB = new ProgressBar.Circle(containerB, {

    color: '#1F3C8E',
    strokeWidth: 12,
    duration: 2600,
    from: { color: '#EE781F'},
    to: { color: '#EE781F'},

    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);

      var value = Math.round(circle.value() * 60);
      circle.setText(value);

    }
 
  });

  let containerC = document.getElementById("circleC");

  let circleC = new ProgressBar.Circle(containerC, {

    color: '#1F3C8E',
    strokeWidth: 12,
    duration: 2600,
    from: { color: '#EE781F'},
    to: { color: '#EE781F'},
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);

      var value = Math.round(circle.value() * 60);
      circle.setText(value);

    }
 
  });

  let containerD = document.getElementById("circleD");

  let circleD = new ProgressBar.Circle(containerD, {
   color: '#1F3C8E',
    strokeWidth: 12,
    duration: 2600,
    from: { color: '#EE781F'},
    to: { color: '#EE781F'},

    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);

      var value = Math.round(circle.value() * 60);
      circle.setText(value);

    }
 
  });


//iniciando o loader 

let dataAreaoffset = $('#data-area').offset();
let stop = 0; 

$(window).scroll(function(e) {

  let scroll = $(window).scrollTop();

  if(scroll > (dataAreaoffset.top - 500) && stop == 0) {


    circleA.animate(1.0)
    circleB.animate(1.0)
    circleC.animate(1.0)
    circleD.animate(1.0)

    stop = 1;
  }

})

//parallax
setTimeout(function(){

  $('#data-area').parallax({imageSrc: 'img/Intra-2.png'});
  $('#apply-area').parallax({imageSrc: ''});

}, 250);

//filtro do portifolio

$('.filter-btn').on('click', function() {

  let type = $(this).attr('id');
  let boxes = $('.project-box');

  $('.main-btn').removeClass('active');
  $(this).addClass('active');

  if(type == 'alamo-btn') {
    eachBoxes('alamo', boxes);
  } else if(type == 'dia-btn') {
    eachBoxes('dia', boxes);
  } else if(type == 'seo-btn') {
    eachBoxes('seo', boxes);
  } else {
    eachBoxes('all', boxes);
  }

});

function eachBoxes(type, boxes) {

  if(type == 'all') {
    $(boxes).fadeIn();
  } else {
    $(boxes).each(function() {
      if(!$(this).hasClass(type)) {
        $(this).fadeOut('slow');
      } else {
        $(this).fadeIn();
      }
    });
  }
}

});

$('tab-panel').on('click', function (e) {
  e.preventDefault()
  $(this).tab('doc')
})