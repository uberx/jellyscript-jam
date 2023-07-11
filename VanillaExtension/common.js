/* Will be adding code here soon */
function updateOptions() {
    // Loads elements of the array into optionA dropdown menu
    $('#selectA').empty();
    $.each(options, function(i, p) {
      $('#selectA').append($('<option></option>').val(p).html(p));
    });
    
    // Loads elements of the array into optionB dropdown menu
    $('#selectB').empty();
    $.each(options, function(i, p) {
      $('#selectB').append($('<option></option>').val(p).html(p));
    });
  }