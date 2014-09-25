/* Sidebar Toggle */
var debugMode = false;
// Remove grippy thing to the left
chrome.storage.sync.get({hideGrippy: true, debugMode: false}, function(items)
{
    debugMode = items.debugMode;

    if (items.hideGrippy)
    {
        $('.listing-chooser').remove();
        $('div.content').css('margin-left', '0px');
    }
});

if (debugMode) console.log('RedditSidebarToggle: init');

// Init vars
var LBL_SHOW = '<<';
var LBL_HIDE = '>>';
var CLASS_SHOW = '_rst_show';
var CLASS_HIDE = '_rst_hide';

var sidebar = $('div.side');
var tabmenu = $('.tabmenu');
var initialWidth = sidebar.width();

// Appends tab
tabmenu.append('<li> <a href="javascript:void(0);" id="_rst_button"> </a> </li>');    
mainButton = $('#_rst_button');
if (debugMode) console.log('RedditSidebarToggle: button appended');

// Check if it is already hidden, sets initial tab state
if (localStorage['_rst_sidebarvisibility'] == 'hidden')
{
    sidebar.hide();
    setButtonToShow();
}
else
    setButtonToHide();

// Tab Click event
mainButton.unbind().click(function()
{
    if (debugMode) console.log('RedditSidebarToggle: button clicked');

    if (mainButton.hasClass(CLASS_SHOW))
        show();
    else
        hide();
        
    return false;
});

function hide()
{
    if (debugMode) console.log('RedditSidebarToggle: hiding sidebar');
    localStorage['_rst_sidebarvisibility'] = 'hidden';
    
    sidebar.animate({width:0}, 'fast', function()
    {
        $(this).hide();
        setButtonToShow();
    });
}

function show()
{
    if (debugMode) console.log('RedditSidebarToggle: showing sidebar');
    localStorage['_rst_sidebarvisibility'] = 'visible';
    sidebar.show().animate({width:initialWidth}, 'fast', setButtonToHide);
}

function setButtonToShow()
{
    mainButton.html(LBL_SHOW).removeClass(CLASS_HIDE).addClass(CLASS_SHOW);
}

function setButtonToHide()
{
    mainButton.html(LBL_HIDE).removeClass(CLASS_SHOW).addClass(CLASS_HIDE);
}
