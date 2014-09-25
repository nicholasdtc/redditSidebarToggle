// Saves options to chrome.storage
var cb_hidegrippy = document.getElementById('cb_hidegrippy');
var cb_debugmode = document.getElementById('cb_debugmode');

function save_options() 
{
    chrome.storage.sync.set({ hideGrippy: cb_hidegrippy.checked, debugMode: cb_debugmode.checked}, function()
    {
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
  chrome.storage.sync.get({hideGrippy: true, debugMode:false}, function(items)
  {
      cb_hidegrippy.checked = items.hideGrippy;
      cb_debugmode.checked = items.debugMode;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
cb_hidegrippy.addEventListener('click', save_options);
cb_debugmode.addEventListener('click', save_options);
