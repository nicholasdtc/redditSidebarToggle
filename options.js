// Saves options to chrome.storage
var cb_hidegrippy = document.getElementById('cb_hidegrippy');

function save_options() 
{
    console.log('saving');
    var hideGrippy = cb_hidegrippy.checked;
  
    chrome.storage.sync.set({hideGrippy: hideGrippy}, function() 
    {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() 
{
  chrome.storage.sync.get({hideGrippy: true}, function(items) 
  {
    cb_hidegrippy.checked = items.hideGrippy;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
cb_hidegrippy.addEventListener('click', save_options);