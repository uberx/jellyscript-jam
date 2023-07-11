var token, userId;

// so we don't have to write this out everytime 
const twitch = window.Twitch.ext;

// onContext callback called when context of an extension is fired 
twitch.onContext((context) => {
  console.log(context);
});


// onAuthorized callback called each time JWT is fired
twitch.onAuthorized((auth) => {
  // save our credentials
  token = auth.token;  
  userId = auth.userId; 
});

$(function() {
  $('#form').submit(function(e) {
    e.preventDefault();
    options = [];
    $('input[type=checkbox]').each(function() {
      if (this.checked) {
        var option = $(this).val();
        options.push(option);
      }
    });
  });
});

function updateConfig() {
  twitch.configuration.set('broadcaster', '1', JSON.stringify(options));
}

twitch.configuration.onChanged(function() {
  // Checks if configuration is defined
  if (twitch.configuration.broadcaster) {
    try {
      // Parsing the array saved in broadcaster content
      var config = JSON.parse(twitch.configuration.broadcaster.content);
      
      // Checking the content is an object
      if (typeof config === 'object') {
        // Updating the value of the options array to be the content from config
        options = config;
        updateOptions();
      } else {
        console.log('Invalid config');
      }
    } catch (e) {
      console.log('Invalid config');
    }
  }
});