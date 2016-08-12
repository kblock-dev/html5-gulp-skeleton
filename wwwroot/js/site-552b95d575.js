$(document).ready(function(){
  //$('.main-content').append('<div><h2>jQuery is working correctly!</h2></div>');
  $('#jQueryTestButton').on('click', function(){
    var modal = $('.modal');
    var modalTitle = $('.modal .modal-title');
    var modalBody = $('.modal .modal-body');
    modal.modal({show: true});
    modalTitle.html('jQuery Test');
    modalBody.html('<p>jQuery loaded successfully!</p>');
  });

  $('nav a').on('click', function(){
    $('nav li.active').removeClass('active');
    $(this).parent().addClass('active');
  });
});
