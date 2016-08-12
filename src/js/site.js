$(document).ready(function(){
  $('.main-content').append('<div><h2>jQuery is working correctly!</h2></div>');

  $('nav a').on('click', function(){
    $('nav li.active').removeClass('active');
    $(this).parent().addClass('active');
  });
});
